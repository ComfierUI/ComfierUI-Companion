"""Read-only JSON themes dropped into the extension's themes directory."""
import asyncio
import json
import logging
import math
import hashlib
import os
import tempfile
import threading
import re
from pathlib import Path
from aiohttp import web
from server import PromptServer

ROOT = Path(__file__).resolve().parent / 'themes'
MAX_BYTES = 256 * 1024
MAX_TOTAL_BYTES = 4 * 1024 * 1024
_registered = False


def list_profiles(include_ids=False):
    profiles = []
    total = 0
    root = ROOT.resolve()
    if not root.is_dir():
        return profiles
    for path in sorted(root.iterdir(), key=lambda p: p.name.casefold()):
        if path.suffix.lower() != '.json' or path.is_symlink() or not path.is_file():
            continue
        try:
            path.resolve().relative_to(root)
            with path.open('rb') as stream:
                raw = stream.read(MAX_BYTES + 1)
            if len(raw) > MAX_BYTES:
                raise ValueError('maximum theme size is 256 KB')
            data = json.loads(raw.decode('utf-8-sig'))
            if not isinstance(data, dict) or type(data.get('schemaVersion')) is not int or data['schemaVersion'] != 1:
                raise ValueError('unsupported schemaVersion')
            colors = data.get('colors')
            alpha = data.get('transparency', {})
            if not isinstance(colors, dict) or not isinstance(alpha, dict):
                raise ValueError('colors and transparency must be objects')
            if any(not isinstance(v, str) or not re.fullmatch(r'#?[0-9a-fA-F]{6}', v) for v in colors.values()):
                raise ValueError('invalid color')
            if any(type(v) not in (int, float) or not math.isfinite(v) or not 0 <= v <= 100 for v in alpha.values()):
                raise ValueError('invalid transparency')
            name = data.get('name')
            name = (name.strip() if isinstance(name, str) else '') or path.stem
            if total + len(raw) > MAX_TOTAL_BYTES or len(profiles) >= 256:
                break
            total += len(raw)
            profile = {'schemaVersion': 1, 'name': name[:80], 'colors': colors, 'transparency': alpha}
            if isinstance(data.get('layout'), dict):
                profile['layout'] = data['layout']
            for field in ('appearance', 'dimensions'):
                if field in data:
                    if not isinstance(data[field], dict):
                        raise ValueError(f'{field} must be an object')
                    profile[field] = data[field]
            if include_ids:
                profile['id'] = hashlib.sha256(path.name.encode()).hexdigest()
            profiles.append(profile)
        except (OSError, ValueError, UnicodeError) as error:
            logging.getLogger('ComfierUI-Companion').warning('Skipping theme %s: %s', path.name, error)
    return profiles


async def themes(request):
    profiles = await asyncio.to_thread(list_profiles, request.query.get('store') == 'host')
    return web.json_response({'profiles': profiles}, headers={'Cache-Control': 'no-store'})


def register_theme_routes():
    global _registered
    if _registered:
        return
    PromptServer.instance.routes.get('/comfierui/themes')(themes)
    PromptServer.instance.routes.post('/comfierui/themes')(mutate_theme)
    _registered = True


_store_lock = threading.Lock()

def validate_profile(data):
    if not isinstance(data, dict) or type(data.get('schemaVersion')) is not int or data['schemaVersion'] != 1:
        raise ValueError('Unsupported theme schema')
    if not isinstance(data.get('name'), str) or not data['name'].strip() or len(data['name']) > 80:
        raise ValueError('Theme name must contain 1–80 characters')
    colors, alpha = data.get('colors'), data.get('transparency', {})
    if not isinstance(colors, dict) or not isinstance(alpha, dict):
        raise ValueError('Invalid colors or transparency')
    if any(not isinstance(v, str) or not re.fullmatch(r'#?[0-9a-fA-F]{6}', v) for v in colors.values()):
        raise ValueError('Invalid color')
    if any(type(v) not in (int, float) or not math.isfinite(v) or not 0 <= v <= 100 for v in alpha.values()):
        raise ValueError('Invalid transparency')
    profile = {'schemaVersion': 1, 'name': data['name'].strip(), 'colors': colors, 'transparency': alpha}
    for field in ('layout', 'appearance', 'dimensions'):
        if field in data:
            if not isinstance(data[field], dict):
                raise ValueError(f'{field} must be an object')
            profile[field] = data[field]
    raw = json.dumps(profile, ensure_ascii=False, allow_nan=False, indent=2).encode('utf-8')
    if len(raw) > MAX_BYTES:
        raise ValueError('Maximum theme size is 256 KB')
    return profile, raw


def save_operation(value):
    with _store_lock:
        root = ROOT.resolve()
        root.mkdir(parents=True, exist_ok=True)
        identity = value.get('id')
        if not isinstance(identity, str) or not re.fullmatch(r'[a-zA-Z0-9-]{1,100}', identity):
            raise ValueError('Invalid theme identity')
        paths = {hashlib.sha256(p.name.encode()).hexdigest(): p for p in root.iterdir()
                 if p.suffix.lower() == '.json' and p.is_file() and not p.is_symlink()}
        path = paths.get(identity, root / ('comfier-' + identity + '.json'))
        if path.is_symlink():
            raise ValueError('Theme path is a symbolic link')
        current = next((p for p in list_profiles(True) if p['id'] == identity), None)
        expected = value.get('expected')
        if (path.exists() and current is None) or current != expected:
            raise web.HTTPConflict(text='Theme changed on host. Reload before editing it.')
        if value.get('delete') is True:
            if current is None:
                raise ValueError('Theme does not exist')
            path.unlink()
            return
        profile, raw = validate_profile(value.get('profile'))
        profiles = list_profiles(True)
        if any(p['id'] != identity and p['name'].casefold() == profile['name'].casefold() for p in profiles):
            raise ValueError('That theme name is already saved')
        files = [p for p in root.iterdir() if p.is_file() and not p.is_symlink() and p.suffix.lower() == '.json']
        if (not path.exists() and len(files) >= 256) or sum(p.stat().st_size for p in files if p != path) + len(raw) > MAX_TOTAL_BYTES:
            raise ValueError('Theme folder storage limit reached')
        # Stable IDs are derived from filenames, including newly generated ones.
        handle, temporary = tempfile.mkstemp(prefix='.theme-', dir=root)
        try:
            with os.fdopen(handle, 'wb') as stream:
                stream.write(raw)
                stream.flush()
                os.fsync(stream.fileno())
            os.replace(temporary, path)
        finally:
            if os.path.exists(temporary):
                os.unlink(temporary)
        return dict(profile, id=hashlib.sha256(path.name.encode()).hexdigest())


async def mutate_theme(request):
    expected_origin = f'{request.scheme}://{request.host}'
    if (request.headers.get('X-Comfier-Theme-Store') != '1'
            or request.headers.get('Origin', expected_origin) != expected_origin
            or request.headers.get('Sec-Fetch-Site') not in (None, 'same-origin', 'none')):
        raise web.HTTPForbidden(text='Same-origin theme write required')
    chunks = bytearray()
    async for chunk in request.content.iter_chunked(16384):
        chunks.extend(chunk)
        if len(chunks) > 2 * MAX_BYTES + 16384:
            raise web.HTTPRequestEntityTooLarge(max_size=2 * MAX_BYTES + 16384, actual_size=len(chunks))
    raw = bytes(chunks)
    try:
        value = json.loads(raw)
        if not isinstance(value, dict):
            raise ValueError('Expected a theme operation')
        profile = await asyncio.to_thread(save_operation, value)
    except (ValueError, UnicodeError) as error:
        raise web.HTTPBadRequest(text=str(error)) from error
    return web.json_response({'profile': profile}, headers={'Cache-Control': 'no-store'})
