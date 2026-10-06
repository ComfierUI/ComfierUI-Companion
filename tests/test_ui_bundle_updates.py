import base64
import copy
import hashlib
import importlib.util
import io
import json
from pathlib import Path
import sys
import tempfile
import types
import unittest
import zipfile
from aiohttp import web
from aiohttp.test_utils import TestClient, TestServer

SOURCE = Path(__file__).resolve().parents[1]
package = types.ModuleType('ui_update_fixture')
package.__path__ = [str(SOURCE)]
sys.modules[package.__name__] = package
sys.modules.setdefault('server',types.SimpleNamespace(PromptServer=types.SimpleNamespace(instance=None)))
spec=importlib.util.spec_from_file_location('ui_update_fixture.ui_bundle_updates',SOURCE/'ui_bundle_updates.py')
updates=importlib.util.module_from_spec(spec);sys.modules[spec.name]=updates;spec.loader.exec_module(updates)
spec=importlib.util.spec_from_file_location('ui_update_fixture.display_bundle',SOURCE/'display_bundle.py')
bundle=importlib.util.module_from_spec(spec);sys.modules[spec.name]=bundle;spec.loader.exec_module(bundle)

def payload_for(code,files=None):
    files=files or {str(p.relative_to(SOURCE/'display_assets')):p.read_bytes() for p in (SOURCE/'display_assets').rglob('*.js')}
    hashes={name:hashlib.sha256(data).hexdigest() for name,data in files.items()}
    digest=hashlib.sha256(json.dumps(hashes,sort_keys=True,separators=(',',':')).encode()).hexdigest()
    manifest={'protocol':1,'backendApi':1,'versionCode':code,'revision':f'{code}-{digest[:16]}','files':hashes}
    raw=io.BytesIO()
    with zipfile.ZipFile(raw,'w',zipfile.ZIP_DEFLATED) as archive:
        for name,data in files.items():archive.writestr(name,data)
    return {'manifest':manifest,'archive':base64.b64encode(raw.getvalue()).decode()}

class BundleUpdates(unittest.IsolatedAsyncioTestCase):
    async def asyncSetUp(self):
        self.temp=tempfile.TemporaryDirectory();self.original=(updates.ROOT,updates.STORE,bundle.ROOT)
        root=Path(self.temp.name);(root/'display_assets').mkdir();self.baseline=payload_for(757)['manifest']
        (root/'display_assets/bundle_manifest.json').write_text(json.dumps(self.baseline))
        (root/'display_assets/comfierui_display_bundle.js').write_text('baseline')
        updates.ROOT=root;updates.STORE=root/'ui_updates';updates._lock=__import__('asyncio').Lock();updates._tokens.clear();bundle.ROOT=root/'display_assets'
        app=web.Application();app.router.add_get('/comfierui/ui-bundle',updates.status);app.router.add_post('/comfierui/ui-bundle',updates.update);app.router.add_get('/comfierui/display-assets/{path:.*}',bundle._asset)
        self.client=TestClient(TestServer(app));await self.client.start_server()
    async def asyncTearDown(self):
        await self.client.close();updates.ROOT,updates.STORE,bundle.ROOT=self.original;self.temp.cleanup()
    async def apply(self,payload,headers=None):
        r=await self.client.get('/comfierui/ui-bundle');status=await r.json()
        return await self.client.post('/comfierui/ui-bundle',json=payload,headers=headers or {'X-Comfier-UI-Token':status['token']})
    async def test_atomic_update_immutable_assets_and_restart(self):
        payload=payload_for(758);r=await self.apply(payload);self.assertEqual(r.status,200);data=await r.json();self.assertTrue(data['updated']);rev=data['active']['revision']
        self.assertEqual(updates.state()['active']['versionCode'],758);self.assertEqual(updates.state()['previous']['versionCode'],757)
        r=await self.client.get('/comfierui/display-assets/revisions/'+rev+'/comfierui_display_bundle.js');self.assertEqual(r.status,200);self.assertIn('0.4.27',await r.text())
        r=await self.client.get('/comfierui/display-assets/revisions/'+self.baseline['revision']+'/comfierui_display_bundle.js');self.assertEqual(await r.text(),'baseline')
        self.assertEqual((bundle.ROOT/'comfierui_display_bundle.js').read_text(),'baseline')
        self.assertEqual(json.loads((updates.STORE/'state.json').read_text())['active']['revision'],rev)
    async def test_no_downgrade_idempotence_conflict(self):
        self.assertEqual((await self.apply(payload_for(758))).status,200)
        old=await self.apply(payload_for(757));self.assertFalse((await old.json())['updated']);self.assertEqual(updates.state()['active']['versionCode'],758)
        repeat=await self.apply(payload_for(758));self.assertFalse((await repeat.json())['updated'])
        conflict=payload_for(758,{'comfierui_display_bundle.js':b'changed','comfierui_display_runtime.js':b'changed'})
        self.assertEqual((await self.apply(conflict)).status,409)
    async def test_rollback_quarantines_bad_revision(self):
        new=payload_for(758);await self.apply(new);r=await self.apply({'rollback':new['manifest']['revision']});self.assertEqual(r.status,200)
        self.assertEqual(updates.state()['active']['versionCode'],757);self.assertEqual((await self.apply(new)).status,409)
        self.assertEqual((await self.apply(payload_for(759))).status,200)
    async def test_rejects_private_paths_hashes_and_protocol(self):
        for name in ['../model_download.py','display/comfier_device_authority.js','display/inline_private.js']:
            payload=payload_for(758,{'comfierui_display_bundle.js':b'a','comfierui_display_runtime.js':b'b',name:b'bad'})
            self.assertEqual((await self.apply(payload)).status,400)
        payload=payload_for(758);payload['manifest']['backendApi']=2;self.assertEqual((await self.apply(payload)).status,400)
        payload=payload_for(758);payload['archive']=payload_for(758,{'comfierui_display_bundle.js':b'a','comfierui_display_runtime.js':b'b'})['archive'];self.assertEqual((await self.apply(payload)).status,400)
        self.assertEqual(updates.state()['active']['versionCode'],757);self.assertFalse(updates.STORE.exists())
    async def test_origin_token_and_revision_paths(self):
        self.assertEqual((await self.apply(payload_for(758),{'X-Comfier-UI-Token':'wrong'})).status,403)
        self.assertEqual((await self.client.get('/comfierui/ui-bundle',headers={'Origin':'https://other.test'})).status,403)
        self.assertEqual((await self.client.get('/comfierui/display-assets/revisions/invalid/comfierui_display_bundle.js')).status,404)
    async def test_duplicates_and_partial_archive(self):
        payload=payload_for(758);payload['archive']=base64.b64encode(b'PK incomplete').decode();self.assertEqual((await self.apply(payload)).status,400)
        self.assertEqual(updates.state()['active']['versionCode'],757)

if __name__=='__main__':unittest.main()
