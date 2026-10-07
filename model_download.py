"""Restricted, host-side model downloads for ComfyUI's Missing Models panel."""

import asyncio
import ipaddress
import logging
import os
import re
import socket
import signal
import sys
import time
import uuid
import tempfile
import json
import zipfile
import stat
from pathlib import PurePosixPath
from pathlib import Path
from urllib.parse import urljoin, urlparse, unquote, parse_qs

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
COMPANION_VERSION = "0.7.13"
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

ALLOWED_EXTENSIONS = {".safetensors", ".sft", ".ckpt", ".pth", ".pt", ".gguf", ".bin", ".onnx"}
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


def _safe_directory(value: object, root_index: object = 0, subdirectory: object = "") -> tuple[str, Path]:
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
    if isinstance(root_index, bool) or not isinstance(root_index, int) or not 0 <= root_index < len(roots):
        raise web.HTTPBadRequest(text="Unknown registered model root")
    if not isinstance(subdirectory, str) or "\\" in subdirectory or ":" in subdirectory or "\x00" in subdirectory:
        raise web.HTTPBadRequest(text="Unsafe model subfolder")
    relative = Path(subdirectory)
    if relative.is_absolute() or ".." in relative.parts:
        raise web.HTTPBadRequest(text="Unsafe model subfolder")
    root = Path(roots[root_index]).resolve()
    destination = (root / relative).resolve()
    if not destination.is_relative_to(root) or (subdirectory and not destination.is_dir()):
        raise web.HTTPBadRequest(text="Unknown or unsafe model subfolder")
    return directory, destination


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


def _model_folders():
    choices = []
    for directory in sorted(ALLOWED_DIRECTORIES):
        try:
            roots = folder_paths.get_folder_paths(directory)
        except Exception:
            continue
        for index, value in enumerate(roots):
            root = Path(value).resolve()
            suffix = "" if len(roots) == 1 else f" [root {index + 1}]"
            choices.append(dict(directory=directory, rootIndex=index, subdirectory="", label=directory + suffix, path=str(root)))
            if root.is_dir():
                for base, dirs, _ in os.walk(root, followlinks=False):
                    dirs[:] = sorted(d for d in dirs if (Path(base) / d).resolve().is_relative_to(root))
                    if len(Path(base).relative_to(root).parts) >= 32:
                        dirs[:] = []
                    for name in dirs:
                        sub = (Path(base) / name).relative_to(root).as_posix()
                        choices.append(dict(directory=directory, rootIndex=index, subdirectory=sub, label=directory + "/" + sub + suffix, path=str(root / sub)))
                        if len(choices) >= 4000:
                            return dict(folders=choices, truncated=True)
    return dict(folders=choices, truncated=False)


async def _list_model_folders(request):
    return web.json_response({**await asyncio.to_thread(_model_folders), "browserSessions": True, "extensionInstalls": True})


def _normalize_model_url(value):
    if not isinstance(value, str):
        raise web.HTTPBadRequest(text="Missing model URL")
    url = value.strip()
    parsed = urlparse(url)
    if parsed.hostname == "huggingface.co":
        url = url.replace("/blob/", "/resolve/", 1)
    if parsed.hostname in {"civitai.com", "civitai.red"} and re.fullmatch(r"/models/\d+(?:/[^/]*)?/?", parsed.path):
        version = parse_qs(parsed.query).get("modelVersionId", [None])[0]
        if version and version.isdigit():
            url = f"https://{parsed.hostname}/api/download/models/{version}"
        else:
            raise web.HTTPBadRequest(text="Use the Civitai download link or a model URL with modelVersionId")
    return _safe_initial_url(url)


async def _url_model_file(value, session_headers=None):
    url = _normalize_model_url(value)
    candidate = unquote(Path(urlparse(url).path).name)
    if Path(candidate).suffix.lower() in ALLOWED_EXTENSIONS:
        return url, _safe_filename(candidate)
    try:
        async with aiohttp.ClientSession(timeout=aiohttp.ClientTimeout(total=30, connect=10), headers={"User-Agent": f"ComfierUI-Companion/{COMPANION_VERSION}"}) as session:
            response = await _validated_download_response(session, url, session_headers) if session_headers else await _validated_download_response(session, url)
            try:
                disposition = response.content_disposition
                candidate = disposition.filename if disposition and disposition.filename else unquote(Path(urlparse(str(response.url)).path).name)
                name = _safe_filename(candidate)
            finally:
                response.release()
    except web.HTTPException:
        raise
    except Exception as error:
        raise web.HTTPBadRequest(text=str(error)) from error
    return url, name


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
    origin = urlparse(initial_url)
    original_headers = dict(request_headers or {})
    for _ in range(MAX_REDIRECTS + 2):
        parsed = urlparse(url)
        host = (parsed.hostname or "").lower()
        if parsed.scheme != "https" or not host or not await _host_is_public(host):
            raise RuntimeError("Download redirected to an unsafe address")
        headers = dict(original_headers)
        if (parsed.scheme, parsed.hostname, parsed.port) != (origin.scheme, origin.hostname, origin.port):
            headers.pop("Cookie", None)
            headers.pop("Authorization", None)
        response = await session.get(
            url, allow_redirects=False, headers=headers or None
        )
        if response.status in {301, 302, 303, 307, 308}:
            location = response.headers.get("Location")
            response.release()
            if not location:
                raise RuntimeError("Download redirect did not include a destination")
            url = urljoin(str(response.url), location)
            continue
        if response.status == 416 and "Range" in original_headers:
            response.release()
            original_headers.pop("Range", None)
            url = initial_url
            continue
        if response.status < 200 or response.status >= 300:
            detail = "Sign in again through the model browser." if response.status in {401, 403} else "" if original_headers.get("Cookie") else await response.text(errors="replace")
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
            range_headers = dict(record.get("_session_headers") or {})
            if existing_bytes: range_headers["Range"] = f"bytes={existing_bytes}-"
            range_headers = range_headers or None
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
                    response = await _validated_download_response(session, url, record.get("_session_headers"))
                    declared_size = response.content_length
            if not resumed:
                existing_bytes = 0
            if response.headers.get("Content-Type", "").split(";", 1)[0].strip().lower() in {"text/html", "application/json"}:
                response.release()
                raise RuntimeError("Provider returned a web page instead of a model. Sign in again through the model browser.")
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
            record.pop("_session_headers", None)
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
    LOG.info("Queued download %s: %s -> %s", task_id, urlparse(record["url"])._replace(query="", fragment="").geturl(), destination)


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


def _browser_session_headers(value: object, url: object) -> dict:
    if value is None:
        return {}
    if not isinstance(value, dict) or not isinstance(url, str):
        raise web.HTTPBadRequest(text="Invalid browser download session")
    host = (urlparse(url).hostname or "").lower()
    if host not in {"huggingface.co", "civitai.com", "civitai.red"}:
        raise web.HTTPBadRequest(text="Browser sessions are limited to model providers")
    result = {}
    for source, header, limit in [("cookie", "Cookie", 16384), ("userAgent", "User-Agent", 1024)]:
        text = value.get(source)
        if text is None or text == "":
            continue
        if not isinstance(text, str) or len(text) > limit or any(ord(c) < 32 or ord(c) == 127 for c in text):
            raise web.HTTPBadRequest(text="Invalid browser session header")
        result[header] = text
    return result


async def _model_download_info(request):
    if request.content_type != "application/json":
        raise web.HTTPUnsupportedMediaType(text="Use application/json")
    try:
        payload = await request.json()
    except Exception as error:
        raise web.HTTPBadRequest(text="Invalid JSON request") from error
    if not isinstance(payload, dict):
        raise web.HTTPBadRequest(text="Invalid download request")
    headers = _browser_session_headers(payload.get("browserSession"), payload.get("url"))
    try:
        try:
            url, name = await _url_model_file(payload.get("url"), headers)
        except web.HTTPBadRequest as error:
            if error.text != "Unsupported model file type":raise
            url,name = await _workflow_url_file(payload.get("url"), headers)
            return web.json_response({"url":url,"name":name,"kind":"workflows"})
    except web.HTTPException as error:
        # Avoid logging URLs, cookies, or provider response bodies.
        print(f"[ComfierUI] Filename lookup failed (HTTP {error.status}). Check provider access, login, and download URL.", flush=True)
        raise
    return web.json_response({"url": url, "name": name})


async def _start_download(request: web.Request) -> web.Response:
    if request.content_type != "application/json":
        raise web.HTTPUnsupportedMediaType(text="Use application/json")
    try:
        payload = await request.json()
    except Exception as error:
        raise web.HTTPBadRequest(text="Invalid JSON request") from error

    if not isinstance(payload, dict):
        raise web.HTTPBadRequest(text="Invalid download request")
    directory, root = _safe_directory(payload.get("directory"), payload.get("rootIndex", 0), payload.get("subdirectory", ""))
    session_headers = _browser_session_headers(payload.get("browserSession"), payload.get("url"))
    if payload.get("name") is None:
        url, name = await _url_model_file(payload.get("url"), session_headers) if session_headers else await _url_model_file(payload.get("url"))
    else:
        url = _normalize_model_url(payload.get("url"))
        name = _safe_filename(payload.get("name"))
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
    if session_headers: record["_session_headers"] = session_headers
    record["_root_index"] = payload.get("rootIndex", 0)
    record["_subdirectory"] = payload.get("subdirectory", "")
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
    records = sorted((r for r in _task_records.values() if _workflow_visible(request,r)), key=lambda item: item["created_at"])
    return web.json_response({"downloads": [_public_record(item) for item in records]})


async def _cancel_download(request: web.Request) -> web.Response:
    task_id = request.match_info["task_id"]
    record = _task_records.get(task_id)
    if record is None or not _workflow_visible(request,record):
        raise web.HTTPNotFound(text="Unknown download")
    task = _task_handles.get(task_id)
    if task is None or task.done() or record["status"] not in {"pending", "active"}:
        raise web.HTTPConflict(text="Download is not active")
    task.cancel()
    return web.json_response({"accepted": True, "task_id": task_id}, status=202)


async def _retry_download(request: web.Request) -> web.Response:
    task_id = request.match_info["task_id"]
    record = _task_records.get(task_id)
    if record is None or not _workflow_visible(request,record):
        raise web.HTTPNotFound(text="Unknown download")
    if record["status"] not in {"failed", "canceled"}:
        raise web.HTTPConflict(text="Only failed or canceled downloads can be retried")
    if record.get("kind")=="workflows":
        record.update(status="pending",error=None,finished_at=None)
        _launch_workflow(record)
        return web.json_response({"accepted":True,**_public_record(record)},status=202)
    if record.get("kind")=="custom_nodes":return await _retry_extension(record)
    directory, root = _safe_directory(record["directory"], record.get("_root_index", 0), record.get("_subdirectory", ""))
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
        if _workflow_visible(request,record) and record["status"] in {"completed", "canceled"}:
            if record["status"] == "canceled" and record.get("kind") not in {"custom_nodes","workflows"}:
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
        "android": ["model-downloads", "model-download-control", "model-browser-sessions", "extension-installs"],
        "browser": ["model-downloads", "extension-installs"],
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



def _extension_repository(value):
    if not isinstance(value,str):raise web.HTTPBadRequest(text="Missing repository URL")
    parsed=urlparse(value.strip())
    if parsed.scheme!='https' or parsed.hostname not in {'github.com','gitlab.com','codeberg.org','bitbucket.org'} or parsed.username or parsed.password or parsed.port not in {None,443}:
        raise web.HTTPBadRequest(text="Use a public HTTPS GitHub, GitLab, Codeberg or Bitbucket repository URL")
    parts=parsed.path.strip('/').split('/')
    if parts[0] in {'search','topics','explore','settings','login','collections','marketplace','orgs','users','sponsors'}:raise web.HTTPBadRequest(text='Open a repository URL, not a search or profile page')
    if len(parts)<2 or any(not re.fullmatch(r'[A-Za-z0-9_.-]+',p) or p in {'.','..'} for p in parts[:2]):raise web.HTTPBadRequest(text="Open a repository URL, not a search or profile page")
    if len(parts)>2 and (parsed.hostname!='github.com' or parts[2] not in {'tree','blob','issues','pulls','releases','discussions','wiki','actions'}):raise web.HTTPBadRequest(text="Use the repository root URL")
    name=parts[1].removesuffix('.git')
    return f'https://{parsed.hostname}/{parts[0]}/{name}.git',name


def _extension_destination(name):
    if not isinstance(name,str) or not re.fullmatch(r'[A-Za-z0-9_][A-Za-z0-9_.-]{0,127}',name) or name.endswith('.'):
        raise web.HTTPBadRequest(text="Use a plain repository folder name")
    roots=folder_paths.get_folder_paths('custom_nodes')
    if not roots:raise web.HTTPBadRequest(text="Host custom_nodes folder is unavailable")
    if name.split('.')[0].upper() in {'CON','PRN','AUX','NUL',*[f'COM{i}' for i in range(1,10)],*[f'LPT{i}' for i in range(1,10)]}:raise web.HTTPBadRequest(text='Reserved repository folder name')
    root=Path(roots[0]).resolve();destination=root/name
    if destination.resolve().parent!=root:raise web.HTTPBadRequest(text="Unsafe extension destination")
    return destination


async def _extension_info(request):
    try:payload=await request.json()
    except Exception as error:raise web.HTTPBadRequest(text='Invalid JSON request') from error
    if not isinstance(payload,dict):raise web.HTTPBadRequest(text='Invalid repository lookup')
    url,name=_extension_repository(payload.get('url'))
    destination=_extension_destination(name)
    return web.json_response({'url':url,'name':name,'destination':str(destination)})


async def _extension_command(record,args,cwd=None):
    env=dict(os.environ,GIT_TERMINAL_PROMPT='0',PYTHONUNBUFFERED='1')
    process_options={'creationflags':0x200} if os.name=='nt' else {'start_new_session':True}
    process=await asyncio.create_subprocess_exec(*args,**process_options,cwd=str(cwd) if cwd else None,env=env,stdout=asyncio.subprocess.PIPE,stderr=asyncio.subprocess.STDOUT)
    try:
        while True:
            line=await process.stdout.readline()
            if not line:break
            print('[ComfierUI extension] '+line.decode(errors='replace').rstrip(),flush=True)
        code=await process.wait()
        if code:raise RuntimeError(f'{record["stage"]} failed (exit {code}); see host console')
    except BaseException:
        if process.returncode is None:
            if os.name=='nt':
                killer=await asyncio.create_subprocess_exec('taskkill','/PID',str(process.pid),'/T','/F',stdout=asyncio.subprocess.DEVNULL,stderr=asyncio.subprocess.DEVNULL)
                await killer.wait()
            else:
                try:os.killpg(process.pid,signal.SIGTERM)
                except ProcessLookupError:pass
            try:await asyncio.wait_for(process.wait(),5)
            except asyncio.TimeoutError:
                if os.name=='nt':process.kill()
                else:
                    try:os.killpg(process.pid,signal.SIGKILL)
                    except ProcessLookupError:pass
                await process.wait()
        raise


async def _extension_run(record):
    destination=Path(record['_destination']);record.update(status='active',percent=None,restart_required=False)
    try:
        if not record.get('_clone_complete'):
            if destination.exists():raise RuntimeError('Repository folder already exists; no files were changed')
            record['stage']='clone';destination.parent.mkdir(parents=True,exist_ok=True);record['_clone_dir']=tempfile.mkdtemp(prefix='.comfier-clone-',dir=destination.parent)
            await _extension_command(record,['git','-c','credential.helper=','-c','protocol.file.allow=never','clone','--',record['url'],record['_clone_dir']])
            if destination.exists():raise RuntimeError('Repository folder already exists; no files were changed')
            Path(record['_clone_dir']).rename(destination)
            record['_clone_complete']=True
        requirements=destination/'requirements.txt'
        if requirements.exists():
            if requirements.is_symlink() or requirements.resolve().parent!=destination.resolve() or not requirements.is_file():raise RuntimeError('Unsafe requirements.txt')
            record['stage']='requirements'
            await _extension_command(record,[sys.executable,'-m','pip','install','-r','requirements.txt'],destination)
        record.update(status='completed',stage='completed',percent=100,restart_required=True,error=None)
    except asyncio.CancelledError:
        record.update(status='canceled',error='Canceled',restart_required=False)
    except Exception as error:
        print(f'[ComfierUI extension] {error}',flush=True)
        record.update(status='failed',error=str(error),restart_required=False)
    finally:
        if record.get('_clone_dir') and Path(record['_clone_dir']).exists():
            import shutil
            try:await asyncio.to_thread(shutil.rmtree,record['_clone_dir'])
            except OSError as error:print(f'[ComfierUI extension] Could not clean partial clone: {error}',flush=True)
        record['finished_at']=time.time();_active_targets.discard(destination);_task_handles.pop(record['task_id'],None)


def _launch_extension(record):
    destination=Path(record['_destination']);_active_targets.add(destination)
    task=asyncio.create_task(_extension_run(record));_tasks.add(task);_task_handles[record['task_id']]=task
    def finished(task):
        _tasks.discard(task);_active_targets.discard(destination);_task_handles.pop(record['task_id'],None)
        if task.cancelled():record.update(status='canceled',error='Canceled',restart_required=False,finished_at=time.time())
    task.add_done_callback(finished)


async def _install_extension(request):
    if request.content_type!='application/json':raise web.HTTPUnsupportedMediaType(text='Use application/json')
    try:payload=await request.json()
    except Exception as error:raise web.HTTPBadRequest(text='Invalid JSON request') from error
    if not isinstance(payload,dict):raise web.HTTPBadRequest(text='Invalid install request')
    url,name=_extension_repository(payload.get('url'));name=payload.get('name') or name;destination=_extension_destination(name)
    if destination.exists() or destination in _active_targets:raise web.HTTPConflict(text='Repository folder already exists or is installing')
    record=dict(task_id=uuid.uuid4().hex,filename=name,directory='custom_nodes',kind='custom_nodes',url=url,status='pending',stage='clone',percent=None,received_bytes=0,total_bytes=None,error=None,restart_required=False,created_at=time.time(),finished_at=None,_destination=str(destination))
    _task_records[record['task_id']]=record;_launch_extension(record)
    return web.json_response({'accepted':True,**_public_record(record)},status=202)


async def _retry_extension(record):
    destination=Path(record['_destination'])
    if destination in _active_targets:raise web.HTTPConflict(text='Extension is already installing')
    if destination.exists() and not record.get('_clone_complete'):raise web.HTTPConflict(text='Repository folder already exists')
    if record.get('_clone_complete') and (not destination.is_dir() or destination.is_symlink()):raise web.HTTPConflict(text='Cloned repository folder is unavailable')
    record.update(status='pending',error=None,finished_at=None,restart_required=False)
    _launch_extension(record)
    return web.json_response({'accepted':True,**_public_record(record)},status=202)



# Workflow archives never extract media, paths, or executable contents.
WORKFLOW_DOWNLOAD_LIMIT = 256 * 1024 * 1024
WORKFLOW_JSON_LIMIT = 16 * 1024 * 1024
WORKFLOW_TOTAL_LIMIT = 64 * 1024 * 1024

def _workflow_graph(data):
    if not isinstance(data, dict):
        return False
    nodes = data.get("nodes")
    if isinstance(nodes, list) and isinstance(data.get("links"), list):
        return all(isinstance(n, dict) and "id" in n and isinstance(n.get("type"), str) for n in nodes)
    # API-format workflows have numeric node keys, class_type and inputs.
    return bool(data) and all(str(k).isdigit() and isinstance(n, dict)
        and isinstance(n.get("class_type"), str) and isinstance(n.get("inputs"), dict)
        for k, n in data.items())


def _workflow_name(value):
    if not isinstance(value, str) or not value or len(value) > 180 or value != Path(value).name:
        raise web.HTTPBadRequest(text="Unsafe workflow filename")
    if any(c in value for c in '\\/:<>"|?*') or any(ord(c) < 32 for c in value) or value.endswith((' ', '.')):
        raise web.HTTPBadRequest(text="Unsafe workflow filename")
    if value.split('.')[0].upper() in {"CON","PRN","AUX","NUL",*[f"COM{i}" for i in range(1,10)],*[f"LPT{i}" for i in range(1,10)]}:
        raise web.HTTPBadRequest(text="Unsafe workflow filename")
    if Path(value).suffix.lower() not in {".json", ".zip"}:
        raise web.HTTPBadRequest(text="Use a .json workflow or .zip archive")
    return value


def _workflow_files(source, name):
    result = []
    total = 0
    def keep(filename, raw):
        nonlocal total
        if len(raw) > WORKFLOW_JSON_LIMIT:
            raise ValueError("Workflow JSON exceeds 16 MiB")
        total += len(raw)
        if total > WORKFLOW_TOTAL_LIMIT:
            raise ValueError("Workflow JSON contents exceed 64 MiB")
        try:
            graph = json.loads(raw.decode("utf-8-sig"), parse_constant=lambda value: (_ for _ in ()).throw(ValueError("Non-finite JSON value")))
        except (UnicodeError, ValueError):
            return
        if _workflow_graph(graph):
            result.append((_workflow_name(filename), json.dumps(graph, ensure_ascii=False, allow_nan=False).encode("utf-8")))
    if zipfile.is_zipfile(source):
        with zipfile.ZipFile(source) as archive:
            entries = archive.infolist()
            if len(entries) > 10000:
                raise ValueError("Archive contains too many entries")
            for entry in entries:
                path = PurePosixPath(entry.filename)
                mode = entry.external_attr >> 16
                if path.is_absolute() or '..' in path.parts or '\\' in entry.filename or ':' in entry.filename or stat.S_ISLNK(mode):
                    raise ValueError("Unsafe archive entry")
                if entry.is_dir() or path.suffix.lower() != '.json':
                    continue
                if entry.flag_bits & 1 or entry.file_size > WORKFLOW_JSON_LIMIT:
                    raise ValueError("Encrypted or oversized workflow JSON")
                if entry.file_size > max(1, entry.compress_size) * 1000:
                    raise ValueError("Workflow JSON expansion limit exceeded")
                with archive.open(entry) as stream:
                    raw = stream.read(WORKFLOW_JSON_LIMIT + 1)
                keep(path.name, raw)
    else:
        if Path(name).suffix.lower() != '.json':
            raise ValueError("Download is not a JSON workflow or ZIP archive")
        with open(source, 'rb') as stream:
            keep(name, stream.read(WORKFLOW_JSON_LIMIT + 1))
    if not result:
        raise ValueError("No valid workflow JSON files found")
    return result


def _workflow_user(request):
    return PromptServer.instance.user_manager.get_request_user_id(request)


def _workflow_root(request):
    path = PromptServer.instance.user_manager.get_request_user_filepath(request, "workflows")
    if path is None:
        raise web.HTTPBadRequest(text="Unknown workflow user")
    return Path(path).resolve()


def _workflow_folder(request, subdirectory=""):
    root = _workflow_root(request)
    if not isinstance(subdirectory, str) or '\\' in subdirectory or ':' in subdirectory or PurePosixPath(subdirectory).is_absolute() or '..' in PurePosixPath(subdirectory).parts:
        raise web.HTTPBadRequest(text="Unsafe workflow folder")
    folder = (root / subdirectory).resolve()
    if not folder.is_relative_to(root):
        raise web.HTTPBadRequest(text="Unsafe workflow folder")
    return root, folder


async def _list_workflow_folders(request):
    root = _workflow_root(request)
    choices = [{"label": "workflows", "directory": "workflows", "subdirectory": ""}]
    if root.exists():
        for directory, dirs, files in os.walk(root, followlinks=False):
            dirs[:] = sorted(d for d in dirs if not d.startswith('.') and not (Path(directory)/d).is_symlink())
            for d in dirs:
                relative = (Path(directory)/d).relative_to(root).as_posix()
                choices.append({"label": "workflows/"+relative, "directory": "workflows", "subdirectory": relative})
                if len(choices) >= 4000:
                    return web.json_response({"folders": choices, "truncated": True})
    return web.json_response({"folders": choices})


async def _workflow_url_file(value, headers=None, name=None):
    url = _normalize_model_url(value)
    if name:
        return url, _workflow_name(name)
    candidate = unquote(Path(urlparse(url).path).name)
    if Path(candidate).suffix.lower() in {'.json', '.zip'}:
        return url, _workflow_name(candidate)
    async with aiohttp.ClientSession(timeout=aiohttp.ClientTimeout(total=30, connect=10), headers={"User-Agent": f"ComfierUI-Companion/{COMPANION_VERSION}"}) as session:
        response = await _validated_download_response(session, url, headers)
        try:
            disposition = response.content_disposition
            candidate = disposition.filename if disposition and disposition.filename else unquote(Path(urlparse(str(response.url)).path).name)
            return url, _workflow_name(candidate)
        finally:
            response.release()


async def _workflow_payload(request):
    if request.content_type != "application/json":
        raise web.HTTPUnsupportedMediaType(text="Use application/json")
    try:
        payload = await request.json()
    except Exception as error:
        raise web.HTTPBadRequest(text="Invalid JSON request") from error
    if not isinstance(payload, dict):
        raise web.HTTPBadRequest(text="Invalid workflow request")
    return payload


async def _workflow_info(request):
    payload = await _workflow_payload(request)
    url, name = await _workflow_url_file(payload.get('url'), _browser_session_headers(payload.get('browserSession'),payload.get('url')))
    return web.json_response({"url":url,"name":name})


def _publish_workflows(files, destination, name):
    destination.mkdir(parents=True, exist_ok=True)
    published = []
    try:
        for filename, data in files:
            # A manual JSON filename renames only a single-workflow import.
            if len(files) == 1 and Path(name).suffix.lower() == '.json':
                filename = name
            stem = Path(filename).stem
            for index in range(10000):
                final = destination / (filename if index == 0 else f"{stem} ({index}).json")
                try:
                    with final.open('xb') as output:
                        published.append(final)
                        output.write(data)
                    break
                except FileExistsError:
                    continue
            else:
                raise ValueError("Too many workflows with the same filename")
        return published
    except BaseException:
        for path in published:
            path.unlink(missing_ok=True)
        raise


async def _workflow_run(record):
    record.update(status='active',stage='download',error=None)
    try:
        with tempfile.TemporaryDirectory(prefix='comfier-workflow-') as temp:
            source = Path(temp)/'download'
            headers = {"User-Agent": f"ComfierUI-Companion/{COMPANION_VERSION}", **record.get('_session_headers', {})}
            async with aiohttp.ClientSession(timeout=aiohttp.ClientTimeout(total=None, sock_read=60, connect=15)) as session:
                response = await _validated_download_response(session, record['url'], headers)
                try:
                    with source.open('wb') as output:
                        async for chunk in response.content.iter_chunked(CHUNK_BYTES):
                            record['received_bytes'] += len(chunk)
                            if record['received_bytes'] > WORKFLOW_DOWNLOAD_LIMIT:
                                raise ValueError('Workflow download exceeds 256 MiB')
                            await _write_chunk(output,chunk)
                finally:
                    response.release()
            record['stage']='extract'
            # Bounded inspection reads JSON members only; no extractall or input writes.
            files = _workflow_files(source,record['filename'])
            root=Path(record['_root'])
            destination=(root/record['_subdirectory']).resolve()
            if not destination.is_relative_to(root):
                raise ValueError('Unsafe workflow folder')
            published=_publish_workflows(files,destination,record['filename'])
            record['workflows']=[path.relative_to(root).as_posix() for path in published]
            record.update(status='completed',percent=100,stage='completed')
            print(f"[ComfierUI] Imported {len(published)} workflow(s); bundled media discarded.",flush=True)
    except asyncio.CancelledError:
        record.update(status='canceled',error=None)
    except Exception as error:
        record.update(status='failed',error=str(error))
        print(f"[ComfierUI] Workflow import failed: {error}",flush=True)
    finally:
        record['finished_at']=time.time()
        if record['status']=='completed':record.pop('_session_headers',None)


def _launch_workflow(record):
    record['received_bytes']=0
    task=asyncio.create_task(_workflow_run(record))
    _tasks.add(task);_task_handles[record['task_id']]=task
    def finished(task):
        _tasks.discard(task);_task_handles.pop(record['task_id'],None)
        if task.cancelled():record.update(status='canceled',finished_at=time.time())
    task.add_done_callback(finished)


async def _start_workflow(request):
    payload=await _workflow_payload(request)
    subdirectory=payload.get('subdirectory','')
    root,folder=_workflow_folder(request,subdirectory)
    headers=_browser_session_headers(payload.get('browserSession'),payload.get('url'))
    url,name=await _workflow_url_file(payload.get('url'),headers,payload.get('name'))
    record=dict(task_id=uuid.uuid4().hex,kind='workflows',filename=name,directory='workflows',url=url,status='pending',stage='download',percent=None,received_bytes=0,total_bytes=None,error=None,created_at=time.time(),finished_at=None,_user=_workflow_user(request),_root=str(root),_subdirectory=subdirectory,_session_headers=headers)
    _task_records[record['task_id']]=record
    _launch_workflow(record)
    return web.json_response({'accepted':True,**_public_record(record)},status=202)


def _workflow_visible(request,record):
    return record.get('kind') != 'workflows' or record.get('_user') == _workflow_user(request)


async def _workflow_data(request):
    record=_task_records.get(request.match_info['task_id'])
    if record is None or not _workflow_visible(request,record):raise web.HTTPNotFound(text='Unknown workflow import')
    filename=request.query.get('file')
    if filename not in record.get('workflows',[]):raise web.HTTPNotFound(text='Unknown workflow')
    root=_workflow_root(request);path=(root/filename).resolve()
    if not path.is_relative_to(root) or not path.is_file():raise web.HTTPNotFound(text='Workflow unavailable')
    return web.FileResponse(path)


def register_routes() -> None:
    global _registered
    if _registered:
        return
    PromptServer.instance.routes.get("/comfierui/workflow-folders")(_list_workflow_folders)
    PromptServer.instance.routes.post("/comfierui/workflow-download-info")(_workflow_info)
    PromptServer.instance.routes.post("/comfierui/workflow-download")(_start_workflow)
    PromptServer.instance.routes.get(TASKS_ROUTE + "/{task_id}/workflow")(_workflow_data)
    PromptServer.instance.routes.post("/comfierui/extension-info")(_extension_info)
    PromptServer.instance.routes.post("/comfierui/extension-install")(_install_extension)
    PromptServer.instance.routes.get("/comfierui/model-folders")(_list_model_folders)
    PromptServer.instance.routes.post("/comfierui/model-download-info")(_model_download_info)
    PromptServer.instance.routes.post(ROUTE)(_start_download)
    PromptServer.instance.routes.get(TASKS_ROUTE)(_list_downloads)
    PromptServer.instance.routes.delete(TASKS_ROUTE + "/completed")(_clear_completed)
    PromptServer.instance.routes.delete(TASKS_ROUTE + "/{task_id}")(_cancel_download)
    PromptServer.instance.routes.post(TASKS_ROUTE + "/{task_id}/retry")(_retry_download)
    PromptServer.instance.routes.get(INFO_ROUTE)(_companion_info)
    _registered = True
    LOG.info("Host model-download endpoint enabled at %s", ROUTE)
    LOG.info("Companion capability endpoint enabled at %s", INFO_ROUTE)
