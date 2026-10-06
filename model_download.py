"""Restricted, host-side model downloads for ComfyUI's Missing Models panel."""

import asyncio
import ipaddress
import logging
import os
import re
import socket
import sys
import time
import uuid
from pathlib import Path
from urllib.parse import urljoin, urlparse

import aiohttp
from aiohttp import web

import folder_paths
from server import PromptServer


def _invalidate_model_inventory():
    from .companion_gateway import invalidate_data_cache
    invalidate_data_cache("/models")


async def _write_chunk(output, chunk):
    # Backpressure: one bounded chunk per file, and drain in-flight disk work before close/cancel.
    task = asyncio.create_task(asyncio.to_thread(output.write, chunk))
    try:
        await asyncio.shield(task)
    except asyncio.CancelledError:
        await task
        raise


LOG = logging.getLogger("ComfierUI-Companion")
ROUTE = "/comfierui/model-download"
TASKS_ROUTE = "/comfierui/model-downloads"
INFO_ROUTE = "/comfierui/capabilities"
COMPANION_VERSION = "0.5.2"
MAX_REDIRECTS = 8
MAX_FILE_BYTES = 128 * 1024 * 1024 * 1024
CHUNK_BYTES = 1024 * 1024
PROGRESS_INTERVAL_SECONDS = 2.0
PROGRESS_BAR_WIDTH = 20

ALLOWED_DIRECTORIES = {
    "audio_encoders",
    "checkpoints",
    "clip",
    "clip_vision",
    "controlnet",
    "diffusers",
    "diffusion_models",
    "embeddings",
    "gligen",
    "hypernetworks",
    "loras",
    "photomaker",
    "style_models",
    "text_encoders",
    "unet",
    "upscale_models",
    "vae",
    "vae_approx",
}

ALLOWED_EXTENSIONS = {".safetensors", ".sft", ".ckpt", ".pth", ".pt"}
INITIAL_HOSTS = {"huggingface.co", "civitai.com", "civitai.red", "github.com"}

_active_targets: set[Path] = set()
_tasks: set[asyncio.Task] = set()
_task_records: dict[str, dict] = {}
_task_handles: dict[str, asyncio.Task] = {}
_registered = False
_live_progress_active = False


def _format_bytes(value: int) -> str:
    size = float(value)
    for unit in ("B", "KiB", "MiB", "GiB", "TiB"):
        if size < 1024 or unit == "TiB":
            return f"{size:.0f} {unit}" if unit in {"B", "KiB"} else f"{size:.2f} {unit}"
        size /= 1024
    return f"{size:.2f} TiB"


def _format_rate(bytes_per_second: float | None) -> str:
    if bytes_per_second is None:
        return "-- B/s"
    return f"{_format_bytes(max(0, int(bytes_per_second)))}/s"


def _progress_text(
    filename: str,
    received: int,
    total: int | None,
    bytes_per_second: float | None = None,
) -> str:
    if total and total > 0:
        fraction = min(1.0, received / total)
        filled = min(PROGRESS_BAR_WIDTH, int(fraction * PROGRESS_BAR_WIDTH))
        bar = "#" * filled + "-" * (PROGRESS_BAR_WIDTH - filled)
        return (
            f"[ComfierUI] {filename} [{bar}] {fraction * 100:5.1f}% "
            f"({_format_bytes(received)} / {_format_bytes(total)} • "
            f"{_format_rate(bytes_per_second)})"
        )
    return (
        f"[ComfierUI] {filename} [{_format_bytes(received)} downloaded / "
        f"total unknown • {_format_rate(bytes_per_second)}]"
    )


def _end_live_progress() -> None:
    global _live_progress_active
    if _live_progress_active:
        sys.stdout.write("\n")
        sys.stdout.flush()
        _live_progress_active = False


def _report_progress(message: str, single_download: bool) -> None:
    """Rewrite one console row for one download; log rows for concurrent files."""
    global _live_progress_active
    if single_download:
        sys.stdout.write(f"\r\x1b[2K{message}")
        sys.stdout.flush()
        _live_progress_active = True
    else:
        _end_live_progress()
        LOG.info(message)


def _safe_filename(value: object) -> str:
    if not isinstance(value, str):
        raise web.HTTPBadRequest(text="Missing model filename")
    name = value.strip()
    if not name or name != os.path.basename(name) or any(c in name for c in ("/", "\\", ":")):
        raise web.HTTPBadRequest(text="Unsafe model filename")
    if Path(name).suffix.lower() not in ALLOWED_EXTENSIONS:
        raise web.HTTPBadRequest(text="Unsupported model file type")
    return name


def _safe_directory(value: object) -> tuple[str, Path]:
    if not isinstance(value, str):
        raise web.HTTPBadRequest(text="Missing model directory")
    directory = value.strip()
    if directory not in ALLOWED_DIRECTORIES:
        raise web.HTTPBadRequest(text="Unsupported model directory")
    try:
        roots = folder_paths.get_folder_paths(directory)
    except Exception as error:
        raise web.HTTPBadRequest(text="Unknown ComfyUI model directory") from error
    if not roots:
        raise web.HTTPBadRequest(text="No writable path exists for this model directory")
    root = Path(roots[0]).resolve()
    return directory, root


def _safe_initial_url(value: object) -> str:
    if not isinstance(value, str):
        raise web.HTTPBadRequest(text="Missing model URL")
    url = value.strip()
    parsed = urlparse(url)
    host = (parsed.hostname or "").lower()
    if parsed.scheme != "https" or host not in INITIAL_HOSTS:
        raise web.HTTPBadRequest(text="Unsupported model download host")
    if host == "huggingface.co" and "/resolve/" not in parsed.path:
        raise web.HTTPBadRequest(text="Unsupported Hugging Face download URL")
    if host in {"civitai.com", "civitai.red"} and not (
        parsed.path.startswith("/api/download/") or parsed.path.startswith("/api/v1/")
    ):
        raise web.HTTPBadRequest(text="Unsupported Civitai download URL")
    if host == "github.com" and "/releases/download/" not in parsed.path:
        raise web.HTTPBadRequest(text="Unsupported GitHub download URL")
    return url


async def _host_is_public(host: str) -> bool:
    loop = asyncio.get_running_loop()
    try:
        records = await loop.getaddrinfo(host, 443, type=socket.SOCK_STREAM)
    except socket.gaierror:
        return False
    if not records:
        return False
    for record in records:
        address = ipaddress.ip_address(record[4][0])
        if not address.is_global:
            return False
    return True


async def _validated_download_response(
    session: aiohttp.ClientSession,
    initial_url: str,
    request_headers: dict[str, str] | None = None,
) -> aiohttp.ClientResponse:
    url = initial_url
    for _ in range(MAX_REDIRECTS + 2):
        parsed = urlparse(url)
        host = (parsed.hostname or "").lower()
        if parsed.scheme != "https" or not host or not await _host_is_public(host):
            raise RuntimeError("Download redirected to an unsafe address")
        response = await session.get(
            url, allow_redirects=False, headers=request_headers
        )
        if response.status in {301, 302, 303, 307, 308}:
            location = response.headers.get("Location")
            response.release()
            if not location:
                raise RuntimeError("Download redirect did not include a destination")
            url = urljoin(str(response.url), location)
            continue
        if response.status == 416 and request_headers:
            response.release()
            request_headers = None
            url = initial_url
            continue
        if response.status < 200 or response.status >= 300:
            detail = await response.text(errors="replace")
            response.release()
            raise RuntimeError(f"Provider returned HTTP {response.status}: {detail[:160]}")
        return response
    raise RuntimeError("Too many download redirects")


async def _download(url: str, destination: Path, task_id: str) -> None:
    destination.parent.mkdir(parents=True, exist_ok=True)
    partial_path = destination.with_name(f".{destination.name}.comfierui.part")
    try:
        timeout = aiohttp.ClientTimeout(total=None, connect=30, sock_read=180)
        headers = {"User-Agent": f"ComfierUI-Companion/{COMPANION_VERSION}"}
        async with aiohttp.ClientSession(timeout=timeout, headers=headers) as session:
            record = _task_records[task_id]
            existing_bytes = partial_path.stat().st_size if partial_path.exists() else 0
            range_headers = {"Range": f"bytes={existing_bytes}-"} if existing_bytes else None
            response = await _validated_download_response(session, url, range_headers)
            resumed = False
            declared_size = response.content_length
            if existing_bytes and response.status == 206:
                content_range = response.headers.get("Content-Range", "")
                match = re.fullmatch(r"bytes (\d+)-(\d+)/(\d+|\*)", content_range)
                if match and int(match.group(1)) == existing_bytes:
                    resumed = True
                    if match.group(3) != "*":
                        declared_size = int(match.group(3))
                    elif response.content_length is not None:
                        declared_size = existing_bytes + response.content_length
                else:
                    response.release()
                    response = await _validated_download_response(session, url)
                    declared_size = response.content_length
            if not resumed:
                existing_bytes = 0
            record["total_bytes"] = declared_size
            if declared_size is not None and declared_size > MAX_FILE_BYTES:
                response.release()
                raise RuntimeError("Model exceeds the 128 GiB safety limit")

            received = existing_bytes
            record["received_bytes"] = received
            record["percent"] = (
                min(100.0, received * 100.0 / declared_size)
                if declared_size else None
            )
            record["status"] = "active"
            started_at = time.monotonic()
            last_progress_at = started_at
            _report_progress(
                _progress_text(destination.name, received, declared_size),
                len(_active_targets) == 1,
            )
            with partial_path.open("ab" if resumed else "wb") as output:
                async for chunk in response.content.iter_chunked(CHUNK_BYTES):
                    received += len(chunk)
                    record["received_bytes"] = received
                    record["percent"] = (
                        min(100.0, received * 100.0 / declared_size)
                        if declared_size else None
                    )
                    if received > MAX_FILE_BYTES:
                        raise RuntimeError("Model exceeds the 128 GiB safety limit")
                    await _write_chunk(output, chunk)
                    now = time.monotonic()
                    if now - last_progress_at >= PROGRESS_INTERVAL_SECONDS:
                        elapsed = max(now - started_at, 0.001)
                        _report_progress(
                            _progress_text(
                                destination.name,
                                received,
                                declared_size,
                                (received - existing_bytes) / elapsed,
                            ),
                            len(_active_targets) == 1,
                        )
                        last_progress_at = now
            response.release()
            elapsed = max(time.monotonic() - started_at, 0.001)
            _report_progress(
                _progress_text(
                    destination.name,
                    received,
                    declared_size or received,
                    (received - existing_bytes) / elapsed,
                ),
                len(_active_targets) == 1,
            )
            _end_live_progress()
            if destination.exists():
                raise RuntimeError("A model with this filename already exists")
            os.replace(partial_path, destination)
            _invalidate_model_inventory()
            record["status"] = "completed"
            record["percent"] = 100.0
            record["received_bytes"] = received
            record["finished_at"] = time.time()
            LOG.info("Download %s completed: %s", task_id, destination)
    except asyncio.CancelledError:
        record = _task_records.get(task_id)
        if record is not None:
            record["status"] = "canceled"
            record["error"] = "Canceled"
            record["finished_at"] = time.time()
        _end_live_progress()
        LOG.info("Download %s canceled for %s", task_id, destination)
    except Exception as error:
        record = _task_records.get(task_id)
        if record is not None:
            record["status"] = "failed"
            record["error"] = str(error)[:240] or error.__class__.__name__
            record["finished_at"] = time.time()
        _end_live_progress()
        LOG.exception("Download %s failed for %s", task_id, destination)
    finally:
        _active_targets.discard(destination)
        _task_handles.pop(task_id, None)


def _launch_task(record: dict, destination: Path) -> None:
    task_id = record["task_id"]
    _active_targets.add(destination)
    task = asyncio.create_task(_download(record["url"], destination, task_id))
    _tasks.add(task)
    _task_handles[task_id] = task
    task.add_done_callback(_tasks.discard)
    if len(_active_targets) > 1:
        _end_live_progress()
    LOG.info("Queued download %s: %s -> %s", task_id, record["url"], destination)


def _start_task(url: str, name: str, directory: str, destination: Path) -> dict:
    task_id = uuid.uuid4().hex
    record = {
        "task_id": task_id,
        "filename": name,
        "directory": directory,
        "url": url,
        "status": "pending",
        "percent": 0.0,
        "received_bytes": 0,
        "total_bytes": None,
        "error": None,
        "created_at": time.time(),
        "finished_at": None,
        "_destination": str(destination),
        "_partial_path": str(destination.with_name(f".{destination.name}.comfierui.part")),
    }
    _task_records[task_id] = record
    _launch_task(record, destination)
    return record


async def _start_download(request: web.Request) -> web.Response:
    if request.content_type != "application/json":
        raise web.HTTPUnsupportedMediaType(text="Use application/json")
    try:
        payload = await request.json()
    except Exception as error:
        raise web.HTTPBadRequest(text="Invalid JSON request") from error

    url = _safe_initial_url(payload.get("url"))
    name = _safe_filename(payload.get("name"))
    directory, root = _safe_directory(payload.get("directory"))
    destination = (root / name).resolve()
    if destination.parent != root:
        raise web.HTTPBadRequest(text="Unsafe model destination")
    if destination.exists():
        raise web.HTTPConflict(text="A model with this filename already exists")
    if destination in _active_targets:
        raise web.HTTPConflict(text="This model is already downloading")
    for existing in _task_records.values():
        if (existing.get("_destination") == str(destination)
                and existing.get("status") in {"pending", "active", "failed", "canceled"}):
            raise web.HTTPConflict(text="This download already exists; use Retry or Clear")

    record = _start_task(url, name, directory, destination)
    return web.json_response(
        {"accepted": True, **_public_record(record)},
        status=202,
    )


def _public_record(record: dict) -> dict:
    return {
        key: value for key, value in record.items()
        if key != "url" and not key.startswith("_")
    }


async def _list_downloads(request: web.Request) -> web.Response:
    records = sorted(_task_records.values(), key=lambda item: item["created_at"])
    return web.json_response({"downloads": [_public_record(item) for item in records]})


async def _cancel_download(request: web.Request) -> web.Response:
    task_id = request.match_info["task_id"]
    record = _task_records.get(task_id)
    if record is None:
        raise web.HTTPNotFound(text="Unknown download")
    task = _task_handles.get(task_id)
    if task is None or task.done() or record["status"] not in {"pending", "active"}:
        raise web.HTTPConflict(text="Download is not active")
    task.cancel()
    return web.json_response({"accepted": True, "task_id": task_id}, status=202)


async def _retry_download(request: web.Request) -> web.Response:
    task_id = request.match_info["task_id"]
    record = _task_records.get(task_id)
    if record is None:
        raise web.HTTPNotFound(text="Unknown download")
    if record["status"] not in {"failed", "canceled"}:
        raise web.HTTPConflict(text="Only failed or canceled downloads can be retried")
    directory, root = _safe_directory(record["directory"])
    destination = (root / record["filename"]).resolve()
    if destination.exists():
        raise web.HTTPConflict(text="A model with this filename already exists")
    if destination in _active_targets:
        raise web.HTTPConflict(text="This model is already downloading")
    record.update({
        "directory": directory,
        "status": "pending",
        "error": None,
        "finished_at": None,
        "_destination": str(destination),
        "_partial_path": str(destination.with_name(f".{destination.name}.comfierui.part")),
    })
    partial_path = Path(record["_partial_path"])
    received = partial_path.stat().st_size if partial_path.exists() else 0
    record["received_bytes"] = received
    total = record.get("total_bytes")
    record["percent"] = min(100.0, received * 100.0 / total) if total else None
    _launch_task(record, destination)
    return web.json_response({"accepted": True, **_public_record(record)}, status=202)


async def _clear_completed(request: web.Request) -> web.Response:
    removed = []
    for task_id, record in list(_task_records.items()):
        if record["status"] in {"completed", "canceled"}:
            if record["status"] == "canceled":
                partial_path = Path(record.get("_partial_path", ""))
                try:
                    if partial_path.name:
                        partial_path.unlink(missing_ok=True)
                except OSError as error:
                    LOG.exception("Could not remove canceled partial %s", partial_path)
                    raise web.HTTPInternalServerError(
                        text="Could not remove the canceled partial download"
                    ) from error
            removed.append(task_id)
            _task_records.pop(task_id, None)
    return web.json_response({"removed": removed})


def _client_environment(request: web.Request) -> tuple[str, str]:
    """Recognize supported ComfierUI clients."""
    explicit = (request.headers.get("X-ComfierUI-Client") or
                request.query.get("client") or "").strip().lower()
    if explicit in {"comfierui", "comfierui-android", "android"}:
        return "android", "explicit"
    user_agent = request.headers.get("User-Agent", "").lower()
    if "android" in user_agent:
        return "android", "user-agent"
    if user_agent:
        return "browser", "user-agent"
    return "unknown", "fallback"


async def _companion_info(request: web.Request) -> web.Response:
    environment, recognition = _client_environment(request)
    common = ["version-reporting", "lan-gateway", "ui-display-bundle", "host-resources", "workflow-app-curation"]
    platform_capabilities = {
        "android": ["model-downloads", "model-download-control"],
        "browser": ["model-downloads"],
        "unknown": [],
    }
    return web.json_response(
        {
            "installed": True,
            "version": COMPANION_VERSION,
            "client": {
                "environment": environment,
                "recognition": recognition,
            },
            "capabilities": common + platform_capabilities[environment],
        }
    )


def register_routes() -> None:
    global _registered
    if _registered:
        return
    PromptServer.instance.routes.post(ROUTE)(_start_download)
    PromptServer.instance.routes.get(TASKS_ROUTE)(_list_downloads)
    PromptServer.instance.routes.delete(TASKS_ROUTE + "/completed")(_clear_completed)
    PromptServer.instance.routes.delete(TASKS_ROUTE + "/{task_id}")(_cancel_download)
    PromptServer.instance.routes.post(TASKS_ROUTE + "/{task_id}/retry")(_retry_download)
    PromptServer.instance.routes.get(INFO_ROUTE)(_companion_info)
    _registered = True
    LOG.info("Host model-download endpoint enabled at %s", ROUTE)
    LOG.info("Companion capability endpoint enabled at %s", INFO_ROUTE)
