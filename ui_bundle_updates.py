"""Client-supplied shared UI bundles. Backend and user data are never replaced.

Uses the Companion gateway's trusted-LAN model. Browser writes require a same-
origin, session-bound token. SHA256 checks integrity, not publisher identity.
"""
import asyncio
import base64
import hashlib
import io
import json
import os
import re
import secrets
import shutil
import tempfile
import zipfile
from pathlib import Path
from aiohttp import web
from server import PromptServer

ROOT = Path(__file__).resolve().parent
STORE = ROOT / 'ui_updates'
PROTOCOL = 1
MAX_ARCHIVE = 2 * 1024 * 1024
MAX_EXPANDED = 8 * 1024 * 1024
_lock = asyncio.Lock()
_tokens = {}
_registered = False
PRIVATE = {'comfier_device_authority.js', 'comfier_device_input_compat.js',
           'comfier_touch_multi_select.js',
           'comfier_node_resize_handles.js', 'comfier_multi_select_move_handle.js',
           'comfier_tap_to_link.js', 'comfier_prompt_popup.js', 'comfier_test_console.js', 'comfier_companion_ui_sync.js', 'comfier_blob_download.js', 'comfier_ui_bundle_check.js', 'comfier_retirement.js'}
BOOTSTRAPS = {'comfierui_display_runtime.js', 'comfierui_display_bundle.js'}
INLINE = {'inline_autoReconnectControl.js', 'inline_generationNotificationsControl.js', 'inline_companionVersionControl.js'}

def allowed(name):
    if name in BOOTSTRAPS:
        return True
    return bool(re.fullmatch(r'display/(?:comfier_[a-z0-9_]+|inline_[A-Za-z0-9_]+)\.js', name)) and Path(name).name not in PRIVATE and (not Path(name).name.startswith('inline_') or Path(name).name in INLINE)

_builtin_signature = None
_builtin_data = None

def builtin():
    global _builtin_signature, _builtin_data
    path = ROOT / 'display_assets' / 'bundle_manifest.json'
    stat = path.stat()
    signature = (str(path), stat.st_mtime_ns, stat.st_size)
    if signature != _builtin_signature:
        _builtin_data = path.read_text()
        _builtin_signature = signature
    return json.loads(_builtin_data)

async def _disk_call(fn, *args):
    task = asyncio.create_task(asyncio.to_thread(fn, *args))
    try:
        return await asyncio.shield(task)
    except asyncio.CancelledError:
        await task
        raise

def _install_files(manifest, files, data):
    STORE.mkdir(exist_ok=True)
    stage = Path(tempfile.mkdtemp(prefix='.stage-',dir=STORE))
    try:
        for name, content in files.items():
            path = stage / name
            path.parent.mkdir(parents=True,exist_ok=True)
            path.write_bytes(content)
        (stage / 'bundle_manifest.json').write_text(json.dumps(manifest))
        final = STORE / manifest['revision']
        if final.exists(): shutil.rmtree(stage)
        else: os.replace(stage,final)
        write_state({'active':manifest,'previous':data['active'],'rejected':data.get('rejected',[])})
    finally:
        if stage.exists(): shutil.rmtree(stage)


def state():
    try:
        data = json.loads((STORE / 'state.json').read_text())
        if not re.fullmatch(r'[0-9]+-[0-9a-f]{16}', data['active']['revision']):
            raise ValueError('Invalid revision')
        if data['active']['revision'] != builtin()['revision'] and not (STORE / data['active']['revision'] / 'bundle_manifest.json').is_file():
            raise ValueError('Missing bundle')
        packaged = builtin()
        if packaged['versionCode'] > data['active']['versionCode']:
            return {'active':packaged,'previous':data['active'],'rejected':data.get('rejected',[])}
        return data
    except (OSError, ValueError, KeyError, TypeError):
        return {'active': builtin(), 'previous': None}

def write_state(data):
    STORE.mkdir(exist_ok=True)
    fd, name = tempfile.mkstemp(dir=STORE, prefix='.state-')
    try:
        with os.fdopen(fd, 'w') as f:
            json.dump(data, f)
            f.flush()
            os.fsync(f.fileno())
        os.replace(name, STORE / 'state.json')
    finally:
        if os.path.exists(name): os.unlink(name)

def asset_root(revision):
    # Revision URLs are immutable, so sessions cannot mix old and new modules.
    if revision == builtin()['revision']:
        return ROOT / 'display_assets'
    if not re.fullmatch(r'[0-9]+-[0-9a-f]{16}', revision):
        raise web.HTTPNotFound()
    path = STORE / revision
    if not (path / 'bundle_manifest.json').is_file():
        raise web.HTTPNotFound()
    return path

def verify_archive(payload):
    manifest = payload.get('manifest')
    if not isinstance(manifest, dict) or manifest.get('protocol') != PROTOCOL or manifest.get('backendApi') != 1:
        raise ValueError('Backend update required for this UI bundle')
    code = manifest.get('versionCode')
    if type(code) is not int or not 1 <= code < 2147483647:
        raise ValueError('Invalid build number')
    hashes = manifest.get('files')
    if not isinstance(hashes, dict) or not 2 <= len(hashes) <= 100 or not BOOTSTRAPS.issubset(hashes):
        raise ValueError('Invalid bundle manifest')
    if any(not allowed(name) or not isinstance(digest,str) or not re.fullmatch(r'[0-9a-f]{64}',digest) for name,digest in hashes.items()):
        raise ValueError('Only shared UI assets can be updated')
    digest = hashlib.sha256(json.dumps(hashes,sort_keys=True,separators=(',',':')).encode()).hexdigest()
    if manifest.get('revision') != f'{code}-{digest[:16]}':
        raise ValueError('Invalid bundle revision')
    encoded = payload.get('archive', '')
    if not isinstance(encoded,str) or len(encoded) > MAX_ARCHIVE * 4 // 3 + 4:
        raise ValueError('UI archive too large')
    raw = base64.b64decode(encoded, validate=True)
    if len(raw) > MAX_ARCHIVE:
        raise ValueError('UI archive too large')
    with zipfile.ZipFile(io.BytesIO(raw)) as archive:
        entries = archive.infolist()
        if len(entries) != len(hashes) or {e.filename for e in entries} != set(hashes):
            raise ValueError('Unexpected or duplicate archive files')
        if sum(e.file_size for e in entries) > MAX_EXPANDED:
            raise ValueError('Expanded UI bundle too large')
        files = {}
        for entry in entries:
            content = archive.read(entry)
            if hashlib.sha256(content).hexdigest() != hashes[entry.filename]:
                raise ValueError('UI asset hash mismatch')
            content.decode('utf-8')
            files[entry.filename] = content
    return manifest, files

def check_origin(request):
    # Custom header + origin-bound nonce excludes cross-site browser writes.
    expected = f'{request.scheme}://{request.host}'
    origin = request.headers.get('Origin', expected)
    if origin != expected or request.headers.get('Sec-Fetch-Site') not in (None,'same-origin','none'):
        raise web.HTTPForbidden(text='Same-origin update required')
    return expected

async def status(request):
    origin = check_origin(request)
    import time
    now = time.monotonic()
    for token, (_, expires) in list(_tokens.items()):
        if expires < now: _tokens.pop(token,None)
    token = secrets.token_urlsafe(32)
    if len(_tokens) >= 128: _tokens.pop(next(iter(_tokens)))
    _tokens[token] = (origin, now + 120)
    data = await _disk_call(state)
    return web.json_response({'protocol':PROTOCOL,'backendApi':1,'active':data['active'], 'previous':data['previous'],'rejected':data.get('rejected',[]),'token':token},headers={'Cache-Control':'no-store'})

async def update(request):
    origin = check_origin(request)
    token = request.headers.get('X-Comfier-UI-Token','')
    import time
    grant = _tokens.pop(token,None)
    if not grant or grant[0] != origin or grant[1] < time.monotonic():
        raise web.HTTPForbidden(text='Expired UI update token')
    request._client_max_size = 3 * 1024 * 1024
    try:
        payload = await request.json()
        if not isinstance(payload,dict): raise ValueError('Invalid UI update request')
        async with _lock:
            data = await _disk_call(state)
            if payload.get('rollback'):
                if payload['rollback'] != data['active']['revision'] or not data['previous']:
                    raise web.HTTPConflict(text='Revision no longer active or no rollback available')
                await _disk_call(write_state, {'active':data['previous'],'previous':None,'rejected':list(set(data.get('rejected',[])+[payload['rollback']]))})
                return web.json_response({'active':data['previous'],'rolledBack':True})
            manifest, files = await _disk_call(verify_archive, payload)
            if manifest['revision'] in data.get('rejected',[]):
                raise web.HTTPConflict(text='This UI revision was rolled back')
            if manifest['versionCode'] < data['active']['versionCode']:
                return web.json_response({'active':data['active'],'updated':False,'reason':'newer-host'})
            if manifest['versionCode'] == data['active']['versionCode']:
                if manifest['revision'] != data['active']['revision']:
                    raise web.HTTPConflict(text='This build number already identifies a different bundle')
                return web.json_response({'active':data['active'],'updated':False})
            await _disk_call(_install_files, manifest, files, data)
            return web.json_response({'active':manifest,'updated':True})
    except (ValueError, TypeError, KeyError, zipfile.BadZipFile, UnicodeError) as error:
        raise web.HTTPBadRequest(text=str(error)) from error

def register_ui_updates():
    global _registered
    if _registered: return
    PromptServer.instance.routes.get('/comfierui/ui-bundle')(status)
    PromptServer.instance.routes.post('/comfierui/ui-bundle')(update)
    _registered = True
