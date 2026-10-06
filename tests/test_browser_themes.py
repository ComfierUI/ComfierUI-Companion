import asyncio
import importlib.util
import json
import sys
import tempfile
import types
import unittest
from pathlib import Path
from aiohttp import web
from aiohttp.test_utils import TestClient, TestServer
sys.modules.setdefault('server', types.SimpleNamespace(PromptServer=None))
spec = importlib.util.spec_from_file_location('host_themes', Path(__file__).resolve().parents[1] / 'theme_profiles.py')
themes = importlib.util.module_from_spec(spec)
spec.loader.exec_module(themes)

class HostThemes(unittest.IsolatedAsyncioTestCase):
    async def asyncSetUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.original = themes.ROOT
        themes.ROOT = Path(self.temp.name)
        app = web.Application()
        app.router.add_get('/comfierui/themes', themes.themes)
        app.router.add_post('/comfierui/themes', themes.mutate_theme)
        self.client = TestClient(TestServer(app))
        await self.client.start_server()

    async def asyncTearDown(self):
        await self.client.close()
        themes.ROOT = self.original
        self.temp.cleanup()

    async def write(self, value, status=200, headers=None):
        response = await self.client.post('/comfierui/themes', json=value, headers=headers or {'X-Comfier-Theme-Store': '1'})
        self.assertEqual(response.status, status, await response.text())
        return await response.json() if status == 200 else None

    async def test_save_reload_rename_delete_and_external_conflict(self):
        profile = {'schemaVersion': 1, 'name': 'Test', 'colors': {'icons': '#123456'}, 'transparency': {'icons': 20}, 'layout': {'schemaVersion': 1, 'views': {}}, 'appearance': {}, 'dimensions': {'button': {'height': 32}}}
        saved = (await self.write({'id': 'new-theme', 'expected': None, 'profile': profile}))['profile']
        self.assertEqual(themes.list_profiles(), [profile])
        host = await (await self.client.get('/comfierui/themes?store=host')).json()
        self.assertEqual(host['profiles'], [saved])
        renamed = dict(saved, name='Renamed')
        saved2 = (await self.write({'id': saved['id'], 'expected': saved, 'profile': renamed}))['profile']
        self.assertEqual(saved2['id'], saved['id'])
        await self.write({'id': saved['id'], 'expected': saved, 'profile': renamed}, 409)
        await self.write({'id': saved2['id'], 'expected': saved2, 'delete': True})
        self.assertEqual(themes.list_profiles(), [])
        self.assertEqual(list(themes.ROOT.iterdir()), [])

    async def test_existing_files_can_be_edited_and_other_files_preserved(self):
        profile = {'schemaVersion': 1, 'name': 'Dropped', 'colors': {}, 'transparency': {}}
        path = themes.ROOT / 'my hand-written theme.json'
        path.write_text(json.dumps(profile))
        (themes.ROOT / 'README.md').write_text('preserve')
        existing = themes.list_profiles(True)[0]
        await self.write({'id': existing['id'], 'expected': existing, 'profile': dict(profile, name='Edited')})
        self.assertEqual(json.loads(path.read_text())['name'], 'Edited')
        self.assertEqual((themes.ROOT / 'README.md').read_text(), 'preserve')

    async def test_invalid_input_and_cross_site_writes_rejected(self):
        profile = {'schemaVersion': 1, 'name': 'Test', 'colors': {}, 'transparency': {}}
        value = {'id': 'new', 'expected': None, 'profile': profile}
        await self.write(value, 403, {'X-Comfier-Theme-Store': '1', 'Sec-Fetch-Site': 'cross-site'})
        await self.write(value, 403, {'Other': '1'})
        await self.write(dict(value, id='../escape'), 400)
        await self.write(dict(value, profile=dict(profile, colors={'icons': 'bad'})), 400)
        await self.write(dict(value, profile=dict(profile, transparency={'icons': True})), 400)
        (themes.ROOT / 'comfier-new.json').symlink_to(themes.ROOT / 'outside')
        await self.write(value, 400)
