"""Explicitly served Companion UI bundle for the Android display-mode proof client."""

from pathlib import Path
from aiohttp import web
from server import PromptServer

ROOT = (Path(__file__).resolve().parent / "display_assets").resolve()
_registered = False

async def _asset(request: web.Request) -> web.StreamResponse:
    rel = request.match_info.get("path", "")
    candidate = (ROOT / rel).resolve()
    try:
        candidate.relative_to(ROOT)
    except ValueError as error:
        raise web.HTTPForbidden(text="Invalid display asset path") from error
    if not candidate.is_file() or candidate.suffix != ".js":
        raise web.HTTPNotFound(text="Display asset not found")
    return web.FileResponse(candidate, headers={"Cache-Control": "no-store"})

def register_display_bundle() -> None:
    global _registered
    if _registered:
        return
    PromptServer.instance.routes.get("/comfierui/display-assets/{path:.*}")(_asset)
    _registered = True
