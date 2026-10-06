import types,unittest,sys,importlib.util,tempfile,json
from pathlib import Path
from unittest.mock import AsyncMock,patch
from aiohttp import web
from aiohttp.test_utils import TestClient,TestServer
sys.modules.setdefault('server',types.SimpleNamespace(PromptServer=types.SimpleNamespace(instance=None)))
sys.modules.setdefault('folder_paths',types.SimpleNamespace())
spec=importlib.util.spec_from_file_location('browser_session_fixture',Path(__file__).resolve().parents[1]/'model_download.py')
D=importlib.util.module_from_spec(spec);spec.loader.exec_module(D)
def response(status,url,headers=None):return types.SimpleNamespace(status=status,url=url,headers=headers or {},release=lambda:None,text=AsyncMock(return_value='must not echo cookies'))
class BrowserSessions(unittest.IsolatedAsyncioTestCase):
 def test_session_scope_and_private_records(self):
  headers=D._browser_session_headers({'cookie':'session=fixture','userAgent':'Fixture browser'},'https://civitai.red/api/download/models/1')
  self.assertEqual(headers['Cookie'],'session=fixture')
  for value,url in [({'cookie':'bad\r\nInjected: yes'},'https://civitai.com/api/download/models/1'),({'cookie':'session=x'},'https://github.com/r/releases/download/v/m.pt'),({'cookie':['bad']},'https://huggingface.co/o/r/resolve/main/m.pt')]:
   with self.assertRaises(web.HTTPBadRequest):D._browser_session_headers(value,url)
  self.assertNotIn('_session_headers',D._public_record({'task_id':'test','_session_headers':headers,'url':'private'}))
 async def test_queue_keeps_session_private(self):
  with tempfile.TemporaryDirectory() as temp, patch.object(D.folder_paths,'get_folder_paths',create=True,return_value=[temp]),patch.object(D,'_launch_task'):
   app=web.Application();app.router.add_post('/download',D._start_download);app.router.add_get('/downloads',D._list_downloads)
   async with TestClient(TestServer(app)) as client:
    r=await client.post('/download',json={'url':'https://civitai.red/api/download/models/1','name':'picked.safetensors','directory':'loras','browserSession':{'cookie':'session=fixture','userAgent':'Fixture browser'}})
    self.assertEqual(r.status,202);public=await r.json();record=D._task_records[public['task_id']]
    self.assertEqual(record['_session_headers']['Cookie'],'session=fixture');self.assertNotIn('session=fixture',json.dumps(public));self.assertNotIn('session=fixture',await (await client.get('/downloads')).text())
    D._task_records.pop(public['task_id'])
 async def test_redirect_drops_credentials_retains_range(self):
  initial='https://civitai.red/api/download/models/1';cdn='https://cdn.example/model.safetensors'
  session=types.SimpleNamespace(get=AsyncMock(side_effect=[response(302,initial,{'Location':cdn}),response(200,cdn)]))
  with patch.object(D,'_host_is_public',new=AsyncMock(return_value=True)):
   await D._validated_download_response(session,initial,{'Cookie':'session=fixture','Authorization':'Bearer fixture','Range':'bytes=100-'})
  first,second=session.get.call_args_list
  self.assertIn('Cookie',first.kwargs['headers']);self.assertNotIn('Cookie',second.kwargs['headers']);self.assertNotIn('Authorization',second.kwargs['headers']);self.assertEqual(second.kwargs['headers']['Range'],'bytes=100-')
 async def test_416_restarts_without_range_and_keeps_session(self):
  url='https://huggingface.co/o/r/resolve/main/m.pt';session=types.SimpleNamespace(get=AsyncMock(side_effect=[response(416,url),response(200,url)]))
  with patch.object(D,'_host_is_public',new=AsyncMock(return_value=True)):
   await D._validated_download_response(session,url,{'Cookie':'session=fixture','Range':'bytes=100-'})
  headers=session.get.call_args_list[1].kwargs['headers'];self.assertNotIn('Range',headers);self.assertEqual(headers['Cookie'],'session=fixture')
 async def test_preflight_uses_browser_session(self):
  result=types.SimpleNamespace(content_disposition=types.SimpleNamespace(filename='m.safetensors'),url='https://cdn.example/m',release=lambda:None)
  with patch.object(D,'_validated_download_response',new=AsyncMock(return_value=result)) as preflight:
   _,name=await D._url_model_file('https://civitai.com/api/download/models/1',{'Cookie':'session=fixture'})
   self.assertEqual(name,'m.safetensors');self.assertEqual(preflight.call_args.args[2]['Cookie'],'session=fixture')
 async def test_auth_errors_do_not_echo_provider_body(self):
  url='https://civitai.com/api/download/models/1';r=response(401,url);session=types.SimpleNamespace(get=AsyncMock(return_value=r))
  with patch.object(D,'_host_is_public',new=AsyncMock(return_value=True)):
   with self.assertRaisesRegex(RuntimeError,'Sign in again'):await D._validated_download_response(session,url,{'Cookie':'session=fixture'})
  r.text.assert_not_awaited()
if __name__=='__main__':unittest.main()
