import asyncio
import importlib.util
import os
from pathlib import Path
import sys
import types
import unittest
from unittest.mock import patch, AsyncMock
from aiohttp import web
from aiohttp.test_utils import TestServer

root = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location('desktop_startup_fixture', root / 'desktop_startup.py')
m = importlib.util.module_from_spec(spec)
spec.loader.exec_module(m)


class DesktopStartup(unittest.IsolatedAsyncioTestCase):
    def test_existing_launch_request_and_disable_flags(self):
        args = types.SimpleNamespace(auto_launch=True, disable_auto_launch=False, port=8188, listen='127.0.0.1')
        with patch.dict(os.environ, {'COMFIERUI_DESKTOP_AUTOLAUNCH': '1'}):
            self.assertTrue(m.arm_auto_launch(args))
            self.assertFalse(args.auto_launch)
            self.assertFalse(m.arm_auto_launch(args))
        self.assertEqual((args.port, args.listen), (8188, '127.0.0.1'))
        for auto, disabled in [(False, False), (True, True), (False, True)]:
            args = types.SimpleNamespace(auto_launch=auto, disable_auto_launch=disabled)
            self.assertFalse(m.arm_auto_launch(args))
            self.assertEqual(args.auto_launch, auto)
        args = types.SimpleNamespace(auto_launch=True, disable_auto_launch=False)
        with patch.dict(os.environ, {'COMFIERUI_DESKTOP_AUTOLAUNCH': '0'}):
            self.assertFalse(m.arm_auto_launch(args))
            self.assertTrue(args.auto_launch)

    async def test_waits_for_ready_and_launches_configured_gateway_once(self):
        opened=[]
        with patch.object(m, 'ready', AsyncMock(side_effect=[False, False, True])), patch.object(m.webbrowser, 'open', side_effect=lambda url: opened.append(url) or True):
            self.assertTrue(await m.launch_when_ready(lambda: 'http://127.0.0.1:9123', interval=0, timeout=1))
        self.assertEqual(opened, ['http://127.0.0.1:9123/'])

    async def test_failed_gateway_falls_back_to_backend_and_timeout_stays_quiet(self):
        with patch.object(m, 'ready', AsyncMock(return_value=True)), patch.object(m.webbrowser, 'open', return_value=True) as opened:
            await m.launch_when_ready(lambda: 'http://127.0.0.1:8188', timeout=1)
            opened.assert_called_once_with('http://127.0.0.1:8188/')
        with patch.object(m, 'ready', AsyncMock(return_value=False)), patch.object(m.webbrowser, 'open') as opened:
            self.assertFalse(await m.launch_when_ready(lambda:'http://127.0.0.1:8147', timeout=0.01, interval=0))
            opened.assert_not_called()

    async def test_readiness_rechecks_current_port(self):
        target=['http://127.0.0.1:8147']
        async def ready(url):
            target[0]='http://127.0.0.1:9001'
            return True
        with patch.object(m,'ready',ready), patch.object(m.webbrowser,'open',return_value=True) as opened:
            await m.launch_when_ready(lambda:target[0],timeout=1)
            opened.assert_called_once_with('http://127.0.0.1:9001/')

    async def test_actual_http_ready_success_error_and_redirect(self):
        app=web.Application()
        status=[503]
        async def handler(request):return web.Response(status=status[0])
        app.router.add_get('/system_stats',handler)
        server=TestServer(app);await server.start_server()
        try:
            url=str(server.make_url('/')).rstrip('/')
            self.assertFalse(await m.ready(url));status[0]=200;self.assertTrue(await m.ready(url));status[0]=302;self.assertFalse(await m.ready(url))
        finally:await server.close()

if __name__=='__main__':unittest.main()
