import json
from pathlib import Path
from unittest.mock import patch
from aiohttp import web
from test_gateway_port import GatewayPortTests, gateway

class BrowserStartTests(GatewayPortTests):
    async def asyncSetUp(self):
        await super().asyncSetUp()
        self.browser_patch = patch.object(gateway, '_BROWSER_FILE', Path(self.temp.name)/'browser_start.json')
        self.browser_patch.start()
    async def asyncTearDown(self):
        self.browser_patch.stop()
        await super().asyncTearDown()
    async def test_persistent_choice_and_invalid_input(self):
        base=f'http://127.0.0.1:{self.first}'
        async with self.client.get(base+'/comfierui/gateway/browser-start') as r:
            self.assertEqual((await r.json())['page'],'companion')
        async with self.client.post(base+'/api/comfierui/gateway/browser-start',json={'page':'comfy'}) as r:
            self.assertEqual(r.status,200)
            self.assertEqual((await r.json())['page'],'comfy')
        self.assertEqual(json.loads(gateway._BROWSER_FILE.read_text())['page'],'comfy')
        async with self.client.post(base+'/comfierui/gateway/browser-start',json={'page':'wrong'}) as r:
            self.assertEqual(r.status,400)
        self.assertEqual(gateway._browser_page(),'comfy')
