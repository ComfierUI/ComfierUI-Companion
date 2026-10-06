"""Fresh-install and existing-overlay parity for the 0.89.20 UI catch-up."""
import asyncio
import base64
import hashlib
import importlib.util
import io
import json
from pathlib import Path
import shutil
import sys
import tempfile
import types
import unittest
import zipfile

from aiohttp import web
from aiohttp.test_utils import TestClient, TestServer

SOURCE = Path(__file__).resolve().parents[1]
MANIFEST = json.loads((SOURCE / 'display_assets/bundle_manifest.json').read_text())
REVISION = MANIFEST['revision']
BUILD = MANIFEST['versionCode']
package = types.ModuleType('bundled_parity_fixture')
package.__path__ = [str(SOURCE)]
sys.modules[package.__name__] = package
sys.modules.setdefault('server', types.SimpleNamespace(PromptServer=types.SimpleNamespace(instance=None)))

def load(name):
    spec = importlib.util.spec_from_file_location(package.__name__ + '.' + name, SOURCE / (name + '.py'))
    module = importlib.util.module_from_spec(spec)
    sys.modules[spec.name] = module
    spec.loader.exec_module(module)
    return module

updates, bundle = load('ui_bundle_updates'), load('display_bundle')

def payload(code=None):
    code = BUILD if code is None else code
    manifest = json.loads((SOURCE / 'display_assets/bundle_manifest.json').read_text())
    manifest['versionCode'] = code
    digest = hashlib.sha256(json.dumps(manifest['files'], sort_keys=True, separators=(',', ':')).encode()).hexdigest()
    manifest['revision'] = f'{code}-{digest[:16]}'
    data = io.BytesIO()
    with zipfile.ZipFile(data, 'w', zipfile.ZIP_DEFLATED) as archive:
        for name in manifest['files']:
            archive.writestr(name, (SOURCE / 'display_assets' / name).read_bytes())
    return {'manifest': manifest, 'archive': base64.b64encode(data.getvalue()).decode()}

class BundledParity(unittest.IsolatedAsyncioTestCase):
    async def asyncSetUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.original = updates.ROOT, updates.STORE, bundle.ROOT
        self.root = Path(self.temp.name)
        shutil.copytree(SOURCE / 'display_assets', self.root / 'display_assets')
        updates.ROOT, updates.STORE = self.root, self.root / 'ui_updates'
        bundle.ROOT = self.root / 'display_assets'
        updates._lock = asyncio.Lock()
        updates._tokens.clear()
        app = web.Application()
        app.router.add_get('/comfierui/ui-bundle', updates.status)
        app.router.add_post('/comfierui/ui-bundle', updates.update)
        app.router.add_get('/comfierui/display-assets/{path:.*}', bundle._asset)
        self.client = TestClient(TestServer(app))
        await self.client.start_server()

    async def asyncTearDown(self):
        await self.client.close()
        updates.ROOT, updates.STORE, bundle.ROOT = self.original
        self.temp.cleanup()

    async def status(self):
        response = await self.client.get('/comfierui/ui-bundle')
        self.assertEqual(response.status, 200)
        return await response.json()

    async def apply(self, value):
        state = await self.status()
        response = await self.client.post('/comfierui/ui-bundle', json=value,
            headers={'X-Comfier-UI-Token': state['token']})
        self.assertEqual(response.status, 200, await response.text())
        return await response.json()

    def cache(self, value):
        manifest, files = updates.verify_archive(value)
        updates._install_files(manifest, files, {'active': updates.builtin()})
        return updates.STORE / manifest['revision']

    async def test_browser_bundle_loads_downloads_before_editor(self):
        request = types.SimpleNamespace(query={'revision': REVISION}, match_info={'name': 'comfierui_display_bundle.js'})
        response = await bundle._browser_asset(request)
        source = response.text
        download = source.index("await load('/comfierui/browser-assets/comfier_download_monitor.js")
        editor = source.index("await load('/comfierui/browser-assets/comfier_layout_editor.js")
        self.assertLess(download, editor)
        self.assertIn('/comfierui/display-assets/revisions/' + REVISION + '/display/comfier_actionbar_owner.js', source)
        self.assertNotIn("await load('./display/", source)
        self.assertEqual(response.headers['Cache-Control'], 'no-store')

    async def test_desktop_editor_menu_arrow_and_copy_entry(self):
        request = types.SimpleNamespace(query={'revision': REVISION}, match_info={'name': 'comfier_layout_editor.js'})
        source = (await bundle._browser_asset(request)).text
        self.assertIn("button(statusBar,'Menu',", source)
        self.assertNotIn('Menu ▾', source)
        self.assertIn('if(window.__comfierDesktopBrowser){reuse.remove();copyOptions.remove()}', source)

    async def test_fresh_install_serves_exact_bundle_without_upload(self):
        state = await self.status()
        self.assertEqual(state['active']['revision'], REVISION)
        self.assertEqual(state['active']['clientVersion'], MANIFEST['clientVersion'])
        self.assertEqual(len(state['active']['files']), len(MANIFEST['files']))
        self.assertFalse(updates.STORE.exists())
        for name, digest in state['active']['files'].items():
            response = await self.client.get('/comfierui/display-assets/revisions/' + REVISION + '/' + name)
            self.assertEqual(response.status, 200, name)
            self.assertEqual(hashlib.sha256(await response.read()).hexdigest(), digest, name)
            self.assertIn('immutable', response.headers['Cache-Control'])
        result = await self.apply(payload())
        self.assertFalse(result['updated'])
        self.assertEqual(result['active'], state['active'])
        self.assertFalse(updates.STORE.exists())

    async def test_same_app_overlay_is_idempotent_and_user_data_survives(self):
        cached = self.cache(payload())
        protected = [self.root / 'diagnostics/backups/user.js', self.root / 'themes/user.json', cached / 'keep.txt']
        for path in protected:
            path.parent.mkdir(parents=True, exist_ok=True)
            path.write_text('user data')
        self.assertEqual((await self.status())['active']['revision'], REVISION)
        self.assertEqual(updates.asset_root(REVISION), bundle.ROOT)
        self.assertFalse((await self.apply(payload()))['updated'])
        for path in protected:
            self.assertEqual(path.read_text(), 'user data')

    async def test_older_overlay_yields_to_packaged_ui_without_deleting_history(self):
        old = payload(BUILD - 1)
        cached = self.cache(old)
        state = await self.status()
        self.assertEqual(state['active']['revision'], REVISION)
        self.assertEqual(state['previous']['revision'], old['manifest']['revision'])
        self.assertTrue(cached.is_dir())
        self.assertEqual(updates.asset_root(old['manifest']['revision']), cached)
        self.assertFalse((await self.apply(old))['updated'])

    async def test_newer_app_overlay_remains_supported_and_survives_restart(self):
        newer = payload(BUILD + 1)
        result = await self.apply(newer)
        self.assertTrue(result['updated'])
        updates._builtin_signature = None
        updates._builtin_data = None
        state = await self.status()
        self.assertEqual(state['active']['revision'], newer['manifest']['revision'])
        self.assertEqual(state['previous']['revision'], REVISION)
        self.assertFalse((await self.apply(payload()))['updated'])

if __name__ == '__main__':
    unittest.main()
