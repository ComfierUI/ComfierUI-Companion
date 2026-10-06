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
    PromptServer.instance.routes.get("/comfierui/browser-assets/{name}")(_browser_asset)
    register_ui_updates()
    _registered = True

async def _browser_asset(request):
    revision = request.query.get('revision', '')
    root = asset_root(revision).resolve()
    name = request.match_info['name']
    if name == 'comfier_download_monitor.js':
        source = (ROOT.parent / 'browser_assets' / name).read_text()
    elif name == 'comfier_layout_editor.js':
        source = (root / 'display' / name).read_text()
        source = source.replace('c?.available!==false&&c.el.isConnected', 'c?.available!==false&&c?.el?.isConnected')
        source = source.replace('Menu ▾', 'Menu')
        source = source.replace('toolbarMenu.appendChild(copyOptions);', 'toolbarMenu.appendChild(copyOptions);if(window.__comfierDesktopBrowser){reuse.remove();copyOptions.remove()}')
        source = source.replace('press={pointer:e.pointerId,target:', 'press={pointer:e.pointerId,pointerType:e.pointerType,target:')
        source = source.replace("jobs.cancel('editor-hold');press.scrolling=true;", "jobs.cancel('editor-hold');if(press.pointerType==='mouse'){if(press.id&&picked.has(press.id)&&selectionKind==='button')beginMove();else beginContainerMove();return}press.scrolling=true;")

    elif name == 'comfierui_display_bundle.js':
        source = (root / name).read_text()
        source = source.replace('./display/comfier_layout_editor.js', '/comfierui/browser-assets/comfier_layout_editor.js?revision=' + revision)
        source = source.replace("  await load('./display/comfier_actionbar_owner.js');", "  await load('./display/comfier_actionbar_owner.js');\n  await load('/comfierui/browser-assets/comfier_download_monitor.js?revision=" + revision + "');")
        source = source.replace('./display/', '/comfierui/display-assets/revisions/' + revision + '/display/')
    else:
        raise web.HTTPNotFound()
    return web.Response(text=source, content_type='application/javascript', headers={'Cache-Control': 'no-store'})
