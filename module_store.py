"""Versioned, immutable Companion upgrade modules; never an app UI fallback."""
import asyncio
import hashlib
import io
import json
import os
import re
import secrets
import shutil
import stat
import time
import zipfile
from pathlib import Path
from aiohttp import web

EXTENSION_ROOT = Path(__file__).resolve().parent
PROTOCOL = 1
MAX_ARCHIVE = 64 * 1024 * 1024
MAX_EXPANDED = 256 * 1024 * 1024
KINDS = {'companion-core', 'hosted-frontend'}
REQUIRED_CORE = {'companion_gateway.py', 'custom_frontend.py', 'desktop_startup.py',
                 'resource_monitor.py', 'diagnostics_host.py', 'theme_profiles.py',
                 'workflow_apps.py', 'notification_status.py', 'model_download.py'}

class ModuleError(ValueError):
    pass

class ModuleStore:
    def __init__(self, root):
        self.root = Path(root).resolve()
        self.storage = self.root / '.comfier-upgrades'
        self.plans = {}
        self.validated = set()
        self.lock = asyncio.Lock()
        self.builtin = json.loads((self.root / 'module_versions.json').read_text())['modules']
        self.running = self.installed()

    def _record(self, kind):
        path = self.storage / 'active.json'
        if not path.exists():
            return None
        try:
            value = json.loads(path.read_text()).get(kind)
            if value is None:
                return None
            key = (kind, value['versionCode'], value['sha256'])
            directory = self.storage / kind / str(value['versionCode'])
            if key not in self.validated:
                self._validate_directory(directory, kind, value['versionCode'])
                self.validated.add(key)
            return value
        except (OSError, ValueError, KeyError, TypeError) as error:
            raise ModuleError('Installed upgrade module is invalid; reinstall Companion') from error

    def installed(self):
        result = dict(self.builtin)
        for kind in KINDS:
            value = self._record(kind)
            if value and value['versionCode'] > result.get(kind, {}).get('versionCode', 0):
                result[kind] = value
        return result

    def active_root(self, kind):
        value = self._record(kind)
        if value and value['versionCode'] > self.builtin.get(kind, {}).get('versionCode', 0):
            return self.storage / kind / str(value['versionCode']) / 'payload'
        return self.root / 'frontend' if kind == 'hosted-frontend' else self.root

    @staticmethod
    def descriptor(value):
        if not isinstance(value, dict) or value.get('id') not in KINDS:
            raise ModuleError('Unknown module')
        version = value.get('versionCode')
        size = value.get('bytes')
        checksum = value.get('sha256')
        if type(version) is not int or version < 1 or type(size) is not int or not 0 < size <= MAX_ARCHIVE:
            raise ModuleError('Invalid module version or size')
        if not isinstance(checksum, str) or len(checksum) != 64 or any(c not in '0123456789abcdef' for c in checksum):
            raise ModuleError('Invalid module checksum')
        requires = value.get('requires', {})
        if not isinstance(requires, dict) or any(k not in KINDS or type(v) is not int or v < 1 for k, v in requires.items()):
            raise ModuleError('Invalid module dependencies')
        return {'id': value['id'], 'versionCode': version, 'bytes': size, 'sha256': checksum, 'requires': requires}

    def plan(self, catalog):
        if not isinstance(catalog, dict) or type(catalog.get('protocol')) is not int or catalog.get('protocol') != PROTOCOL or not isinstance(catalog.get('modules'), list) or len(catalog['modules']) > 100:
            raise ModuleError('Unsupported module catalog')
        installed = self.installed()
        newest = {}
        seen = {}
        for item in catalog['modules']:
            value = self.descriptor(item)
            key = (value['id'], value['versionCode'])
            if key in seen and seen[key] != value['sha256']:
                raise ModuleError('Conflicting module version')
            seen[key] = value['sha256']
            current = installed.get(value['id'], {})
            if value['versionCode'] == current.get('versionCode') and value['sha256'] != current.get('sha256'):
                raise ModuleError('An installed module version has different contents')
            if value['versionCode'] > current.get('versionCode', 0) and value['versionCode'] > newest.get(value['id'], {}).get('versionCode', 0):
                newest[value['id']] = value
        target = {k: v['versionCode'] for k, v in installed.items()}
        target.update({k: v['versionCode'] for k, v in newest.items()})
        for value in newest.values():
            if any(target.get(k, 0) < v for k, v in value['requires'].items()):
                raise ModuleError('A required upgrade module is missing')
        ordered = sorted(newest.values(), key=lambda v: v['id'])
        if not ordered:
            return {'protocol': PROTOCOL, 'token': '', 'selected': [], 'staged': {}}
        now = time.monotonic()
        self.plans = {k: v for k, v in self.plans.items() if v['expires'] > now}
        if len(self.plans) >= 32:
            raise ModuleError('Too many pending upgrade plans')
        token = secrets.token_urlsafe(32)
        self.plans[token] = {'expires': now + 900, 'selected': ordered, 'staged': {}}
        return {'protocol': PROTOCOL, 'token': token, 'selected': ordered, 'staged': {}}

    def _validate_directory(self, directory, kind, version):
        manifest = json.loads((directory / 'module.json').read_text())
        if manifest.get('id') != kind or type(manifest.get('versionCode')) is not int or manifest.get('versionCode') != version or type(manifest.get('protocol')) is not int or manifest.get('protocol') != PROTOCOL:
            raise ModuleError('Module identity mismatch')
        files = manifest.get('files')
        if not isinstance(files, dict) or not files or len(files) > 20000:
            raise ModuleError('Invalid module inventory')
        total = 0
        for name, digest in files.items():
            if not isinstance(name, str) or name.startswith('/') or '\\' in name or any(p in {'', '.', '..'} for p in name.split('/')):
                raise ModuleError('Invalid module file path')
            path = directory / 'payload' / name
            if path.is_symlink() or not path.resolve().is_relative_to((directory / 'payload').resolve()):
                raise ModuleError('Module file escapes payload')
            total += path.stat().st_size
            if total > MAX_EXPANDED or hashlib.sha256(path.read_bytes()).hexdigest() != digest:
                raise ModuleError('Module file checksum mismatch')
        actual = {p.relative_to(directory / 'payload').as_posix() for p in (directory / 'payload').rglob('*') if p.is_file()}
        if actual != set(files):
            raise ModuleError('Module contains unlisted files')
        if kind == 'companion-core':
            if not REQUIRED_CORE.issubset(files) or any('/' in n or not n.endswith('.py') or n in {'__init__.py', 'module_store.py'} for n in files):
                raise ModuleError('Core update must be complete and retain the stable loader')
            for name in files:
                try:
                    compile((directory / 'payload' / name).read_text(), name, 'exec')
                except SyntaxError as error:
                    raise ModuleError('Core module contains invalid Python') from error
        else:
            from .custom_frontend import CustomFrontend
            frontend = directory / 'payload'
            version = json.loads((frontend / 'comfier-build.json').read_text()).get('frontendVersion')
            if not isinstance(version, str) or not re.fullmatch(r'[0-9]+\.[0-9]+\.[0-9]+', version):
                raise ModuleError('Invalid frontend version')
            CustomFrontend(frontend, version).load()
        return manifest

    def install(self, token, body, frontend_activate=None):
        plan = self.plans.get(token)
        if not plan or plan['expires'] <= time.monotonic() or not plan['selected']:
            raise ModuleError('Upgrade plan is expired or complete')
        value = plan['selected'][0]
        if len(body) != value['bytes'] or hashlib.sha256(body).hexdigest() != value['sha256']:
            raise ModuleError('Upgrade archive checksum mismatch')
        current = self.installed().get(value['id'], {})
        if value['versionCode'] <= current.get('versionCode', 0):
            if value['versionCode'] != current.get('versionCode') or value['sha256'] != current.get('sha256'):
                raise ModuleError('Upgrade would overwrite a newer module')
        parent = self.storage / value['id']; parent.mkdir(parents=True, exist_ok=True)
        staging = parent / ('staging-' + secrets.token_hex(8)); staging.mkdir()
        destination = parent / str(value['versionCode'])
        try:
            with zipfile.ZipFile(io.BytesIO(body)) as archive:
                names = set(); expanded = 0
                for entry in archive.infolist():
                    name = entry.filename
                    if entry.is_dir() or name in names or '\\' in name or name.startswith('/') or any(p in {'', '.', '..'} for p in name.split('/')) or (name != 'module.json' and not name.startswith('payload/')) or stat.S_ISLNK(entry.external_attr >> 16):
                        raise ModuleError('Invalid upgrade archive path')
                    names.add(name); expanded += entry.file_size
                    if expanded > MAX_EXPANDED or len(names) > 20001:
                        raise ModuleError('Upgrade archive exceeds limits')
                    target = staging / name; target.parent.mkdir(parents=True, exist_ok=True); target.write_bytes(archive.read(entry))
            manifest = self._validate_directory(staging, value['id'], value['versionCode'])
            if manifest.get('requires', {}) != value['requires']:
                raise ModuleError('Module dependencies differ from negotiated plan')
            # An abandoned validated directory is safe to reuse after a process interruption.
            if destination.exists():
                self._validate_directory(destination, value['id'], value['versionCode'])
                if (destination / 'module.json').read_bytes() != (staging / 'module.json').read_bytes():
                    raise ModuleError('Version directory already contains another module')
            else:
                os.replace(staging, destination)
            plan['staged'][value['id']] = value
            plan['selected'].pop(0)
            committed = not plan['selected']
            if committed:
                active_path = self.storage / 'active.json'
                active = json.loads(active_path.read_text()) if active_path.exists() else {}
                current = self.installed()
                for kind, record in plan['staged'].items():
                    existing = current.get(kind, {})
                    if existing.get('versionCode', 0) > record['versionCode']:
                        raise ModuleError('Another client installed a newer module; negotiate again')
                    if existing.get('versionCode') == record['versionCode'] and existing.get('sha256') != record['sha256']:
                        raise ModuleError('Another client installed conflicting module contents')
                    active[kind] = record
                resulting = {k: v['versionCode'] for k, v in {**self.builtin, **active}.items()}
                if any(resulting.get(k, 0) < n for record in active.values() for k, n in record.get('requires', {}).items()):
                    raise ModuleError('Module transaction lacks a required dependency')
                temporary = self.storage / ('active-' + secrets.token_hex(8) + '.tmp')
                temporary.write_text(json.dumps(active, sort_keys=True) + '\n'); os.replace(temporary, active_path)
            return {'installed': committed, 'staged': True, 'id': value['id'], 'versionCode': value['versionCode'], 'restartRequired': committed and self.installed() != self.running}

        finally:
            shutil.rmtree(staging, ignore_errors=True)

STORE = None

def module_store():
    global STORE
    if STORE is None:
        STORE = ModuleStore(EXTENSION_ROOT)
    return STORE

def activate_core(package_path):
    os.environ['COMFIER_EXTENSION_ROOT'] = str(EXTENSION_ROOT)
    store = module_store()
    active = store.active_root('companion-core')
    if active != EXTENSION_ROOT:
        package_path.insert(0, str(active))


def register_module_routes(application, frontend_status, frontend_activate):
    store = module_store()
    async def status(request):
        return web.json_response({'protocol': PROTOCOL, 'companionRequired': True, 'installed': store.installed(), 'running': store.running, 'frontend': frontend_status()}, headers={'Cache-Control': 'no-store'})
    async def plan(request):
        if request.headers.get('X-Comfier-Module-Protocol') != '1':
            raise web.HTTPForbidden(text='Use the native module protocol')
        try:
            return web.json_response(store.plan(await request.json()), headers={'Cache-Control': 'no-store'})
        except (ModuleError, ValueError, TypeError) as error:
            raise web.HTTPConflict(text=str(error))
    async def install(request):
        if request.headers.get('X-Comfier-Module-Protocol') != '1' or request.content_type != 'application/zip':
            raise web.HTTPForbidden(text='Use the native module protocol')
        body = bytearray()
        async for block in request.content.iter_chunked(65536):
            body.extend(block)
            if len(body) > MAX_ARCHIVE:
                raise web.HTTPRequestEntityTooLarge(max_size=MAX_ARCHIVE, actual_size=len(body))
        try:
            async with store.lock:
                result = await asyncio.to_thread(store.install, request.headers.get('X-Comfier-Module-Plan'), bytes(body), frontend_activate)
            return web.json_response(result)
        except (ModuleError, OSError, ValueError, KeyError, zipfile.BadZipFile) as error:
            raise web.HTTPConflict(text=str(error))
    application.router.add_get('/comfierui/modules/status', status)
    application.router.add_post('/comfierui/modules/plan', plan)
    application.router.add_post('/comfierui/modules/install', install)
