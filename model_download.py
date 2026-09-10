"""Restricted, host-side model downloads for ComfyUI's Missing Models panel."""

import asyncio
import ipaddress
import logging
import os
import socket
import sys
import tempfile
import time
import uuid
from pathlib import Path
from urllib.parse import urljoin, urlparse

import aiohttp
from aiohttp import web

import folder_paths
from server import PromptServer


LOG = logging.getLogger("ComfierUI-Companion")
ROUTE = "/comfierui/model-download"
INFO_ROUTE = "/comfierui/capabilities"
COMPANION_VERSION = "0.1.3"
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
    session: aiohttp.ClientSession, initial_url: str
) -> aiohttp.ClientResponse:
    url = initial_url
    for _ in range(MAX_REDIRECTS + 1):
        parsed = urlparse(url)
        host = (parsed.hostname or "").lower()
        if parsed.scheme != "https" or not host or not await _host_is_public(host):
            raise RuntimeError("Download redirected to an unsafe address")
        response = await session.get(url, allow_redirects=False)
        if response.status in {301, 302, 303, 307, 308}:
            location = response.headers.get("Location")
            response.release()
            if not location:
                raise RuntimeError("Download redirect did not include a destination")
            url = urljoin(str(response.url), location)
            continue
        if response.status < 200 or response.status >= 300:
            detail = await response.text(errors="replace")
            response.release()
            raise RuntimeError(f"Provider returned HTTP {response.status}: {detail[:160]}")
        return response
    raise RuntimeError("Too many download redirects")


async def _download(url: str, destination: Path, task_id: str) -> None:
    destination.parent.mkdir(parents=True, exist_ok=True)
    temp_path: Path | None = None
    try:
        timeout = aiohttp.ClientTimeout(total=None, connect=30, sock_read=180)
        headers = {"User-Agent": f"ComfierUI-Companion/{COMPANION_VERSION}"}
        async with aiohttp.ClientSession(timeout=timeout, headers=headers) as session:
            response = await _validated_download_response(session, url)
            declared_size = response.content_length
            if declared_size is not None and declared_size > MAX_FILE_BYTES:
                response.release()
                raise RuntimeError("Model exceeds the 128 GiB safety limit")

            handle, temp_name = tempfile.mkstemp(
                prefix=f".{destination.name}.", suffix=".part", dir=str(destination.parent)
            )
            os.close(handle)
            temp_path = Path(temp_name)
            received = 0
            started_at = time.monotonic()
            last_progress_at = started_at
            _report_progress(
                _progress_text(destination.name, received, declared_size),
                len(_active_targets) == 1,
            )
            with temp_path.open("wb") as output:
                async for chunk in response.content.iter_chunked(CHUNK_BYTES):
                    received += len(chunk)
                    if received > MAX_FILE_BYTES:
                        raise RuntimeError("Model exceeds the 128 GiB safety limit")
                    output.write(chunk)
                    now = time.monotonic()
                    if now - last_progress_at >= PROGRESS_INTERVAL_SECONDS:
                        elapsed = max(now - started_at, 0.001)
                        _report_progress(
                            _progress_text(
                                destination.name,
                                received,
                                declared_size,
                                received / elapsed,
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
                    received / elapsed,
                ),
                len(_active_targets) == 1,
            )
            _end_live_progress()
            if destination.exists():
                raise RuntimeError("A model with this filename already exists")
            os.replace(temp_path, destination)
            temp_path = None
            LOG.info("Download %s completed: %s", task_id, destination)
    except Exception:
        _end_live_progress()
        LOG.exception("Download %s failed for %s", task_id, destination)
    finally:
        if temp_path is not None:
            try:
                temp_path.unlink(missing_ok=True)
            except OSError:
                LOG.warning("Could not remove partial download %s", temp_path)
        _active_targets.discard(destination)


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

    task_id = uuid.uuid4().hex
    _active_targets.add(destination)
    task = asyncio.create_task(_download(url, destination, task_id))
    _tasks.add(task)
    task.add_done_callback(_tasks.discard)
    if len(_active_targets) > 1:
        _end_live_progress()
    LOG.info("Queued download %s: %s -> %s", task_id, url, destination)
    return web.json_response(
        {"accepted": True, "task_id": task_id, "filename": name, "directory": directory},
        status=202,
    )


async def _companion_info(_request: web.Request) -> web.Response:
    return web.json_response(
        {
            "installed": True,
            "version": COMPANION_VERSION,
            "capabilities": ["model-downloads", "version-reporting"],
        }
    )


def register_routes() -> None:
    global _registered
    if _registered:
        return
    PromptServer.instance.routes.post(ROUTE)(_start_download)
    PromptServer.instance.routes.get(INFO_ROUTE)(_companion_info)
    _registered = True
    LOG.info("Host model-download endpoint enabled at %s", ROUTE)
    LOG.info("Companion capability endpoint enabled at %s", INFO_ROUTE)
