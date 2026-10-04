"""Explicitly served Companion UI bundle for the Android display-mode proof client."""

from pathlib import Path
from aiohttp import web
from server import PromptServer
from .ui_bundle_updates import asset_root, register_ui_updates

ROOT = (Path(__file__).resolve().parent / "display_assets").resolve()
_registered = False

async def _asset(request: web.Request) -> web.StreamResponse:
    rel = request.match_info.get("path", "")
    root = ROOT
    if rel.startswith('revisions/'):
        parts = rel.split('/',2)
        if len(parts) != 3: raise web.HTTPNotFound()
        root = asset_root(parts[1]).resolve()
        rel = parts[2]
    candidate = (root / rel).resolve()
    try:
        candidate.relative_to(root)
    except ValueError as error:
        raise web.HTTPForbidden(text="Invalid display asset path") from error
    if not candidate.is_file() or candidate.suffix != ".js":
        raise web.HTTPNotFound(text="Display asset not found")
    return web.FileResponse(candidate, headers={"Cache-Control": "public, max-age=31536000, immutable" if request.match_info.get("path", "").startswith("revisions/") else "no-store"})

def register_display_bundle() -> None:
    global _registered
    if _registered:
        return
    PromptServer.instance.routes.get("/comfierui/display-assets/{path:.*}")(_asset)
    register_ui_updates()
    _registered = True
