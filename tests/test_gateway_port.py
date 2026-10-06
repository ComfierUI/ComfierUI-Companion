import asyncio, importlib.util, json, socket, sys, tempfile, types, unittest
from pathlib import Path
from unittest.mock import patch
import aiohttp
from aiohttp import web

source = Path(__file__).resolve().parents[1]
server = types.ModuleType('server'); server.PromptServer = type('PromptServer', (), {})
sys.modules.setdefault('server', server)
spec = importlib.util.spec_from_file_location('gateway_port_fixture', source/'companion_gateway.py')
gateway = importlib.util.module_from_spec(spec);sys.modules[spec.name] = gateway;spec.loader.exec_module(gateway)

def free_port():
    with socket.socket() as sock:
        sock.bind(('127.0.0.1',0));return sock.getsockname()[1]

class GatewayPortTests(unittest.IsolatedAsyncioTestCase):
    async def asyncSetUp(self):
        self.temp = tempfile.TemporaryDirectory();gateway._PORT_FILE=Path(self.temp.name)/'gateway_port.json';gateway._port_lock=asyncio.Lock();self.first=free_port();gateway._save_port(self.first)
        self.mock=patch.object(gateway,'_prewarm_data_cache',new=self.noop);self.mock.start();await gateway._start_gateway();self.client=aiohttp.ClientSession()
    async def noop(self): pass
    async def asyncTearDown(self):
        await self.client.close();await gateway._runner.cleanup();gateway._runner=None;gateway._site=None;self.mock.stop();self.temp.cleanup()
    async def test_rebind_and_preserve_old_on_conflict(self):
        base=f'http://127.0.0.1:{self.first}'
        async with self.client.get(base+'/comfierui/gateway/port') as r:self.assertEqual((await r.json())['port'],self.first)
        for port in [8188,1023,65536,True,1234.5,'9000']:
            async with self.client.post(base+'/api/comfierui/gateway/port',json={'port':port}) as r:self.assertEqual(r.status,400)
        with socket.socket() as occupied:
            occupied.bind(('0.0.0.0',0));occupied.listen();port=occupied.getsockname()[1]
            async with self.client.post(base+'/comfierui/gateway/port',json={'port':port}) as r:self.assertEqual(r.status,409)
            self.assertEqual(gateway.GATEWAY_PORT,self.first)
        target=free_port()
        with patch.object(gateway,'_save_port',side_effect=OSError('readonly')):
            async with self.client.post(base+'/comfierui/gateway/port',json={'port':target}) as r:self.assertEqual(r.status,500)
        self.assertEqual(gateway.GATEWAY_PORT,self.first)
        async with self.client.post(base+'/comfierui/gateway/port',json={'port':target}) as r:self.assertEqual(r.status,200);self.assertEqual((await r.json())['port'],target)
        self.assertEqual(gateway._read_port(),target)
        async with self.client.get(f'http://127.0.0.1:{target}/comfierui/gateway/port') as r:self.assertEqual(r.status,200)
        async with self.client.get(base+'/comfierui/gateway/port') as r:self.assertEqual(r.status,200)
        await asyncio.sleep(5.1)
        async with aiohttp.ClientSession() as fresh:
            with self.assertRaises(aiohttp.ClientError):await fresh.get(base+'/comfierui/gateway/port')
        await gateway._runner.cleanup();await gateway._start_gateway()
        async with self.client.get(f'http://127.0.0.1:{target}/comfierui/gateway/port') as r:self.assertEqual((await r.json())['port'],target)

if __name__=='__main__':unittest.main()
