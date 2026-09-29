"""Read-only JSON themes dropped into the extension's themes directory."""
import asyncio
import json
import logging
import math
import re
from pathlib import Path
from aiohttp import web
from server import PromptServer

ROOT = Path(__file__).resolve().parent / 'themes'
MAX_BYTES = 256 * 1024
MAX_TOTAL_BYTES = 4 * 1024 * 1024
_registered = False


def list_profiles():
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
            profiles.append({'schemaVersion': 1, 'name': name[:80], 'colors': colors, 'transparency': alpha})
        except (OSError, ValueError, UnicodeError) as error:
            logging.getLogger('ComfierUI-Companion').warning('Skipping theme %s: %s', path.name, error)
    return profiles


async def themes(request):
    profiles = await asyncio.to_thread(list_profiles)
    return web.json_response({'profiles': profiles}, headers={'Cache-Control': 'no-store'})


def register_theme_routes():
    global _registered
    if _registered:
        return
    PromptServer.instance.routes.get('/comfierui/themes')(themes)
    _registered = True
