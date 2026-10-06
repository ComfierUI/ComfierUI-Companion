import importlib.util,sys,types,tempfile,json,unittest
from pathlib import Path
from unittest.mock import patch,AsyncMock
from aiohttp import web
from aiohttp.test_utils import TestClient,TestServer
sys.modules.setdefault('server',types.SimpleNamespace(PromptServer=types.SimpleNamespace(instance=None)))
sys.modules.setdefault('folder_paths',types.SimpleNamespace())
spec=importlib.util.spec_from_file_location('url_download_fixture',Path(__file__).resolve().parents[1]/'model_download.py')
D=importlib.util.module_from_spec(spec);spec.loader.exec_module(D)
class UrlDownloads(unittest.IsolatedAsyncioTestCase):
 def setUp(self):
  self.temp=tempfile.TemporaryDirectory();self.root=Path(self.temp.name)/'models';self.root.mkdir();(self.root/'nested'/'deeper').mkdir(parents=True)
  self.patch=patch.object(D.folder_paths,'get_folder_paths',create=True,side_effect=lambda kind:[str(self.root)] if kind=='loras' else []);self.patch.start()
 def tearDown(self):self.patch.stop();self.temp.cleanup()
 async def test_folders_and_safe_subfolder(self):
  folders=D._model_folders()['folders'];self.assertEqual([f['subdirectory'] for f in folders],['','nested','nested/deeper'])
  self.assertEqual(D._safe_directory('loras',0,'nested/deeper')[1],self.root/'nested'/'deeper')
  for sub in ['../escape','/tmp','nested/../../escape','missing','C:\\bad','nested\\bad']:
   with self.assertRaises(web.HTTPBadRequest):D._safe_directory('loras',0,sub)
  with self.assertRaises(web.HTTPBadRequest):D._safe_directory('loras',True,'')
  outside=Path(self.temp.name)/'outside';outside.mkdir();(self.root/'escape').symlink_to(outside,target_is_directory=True)
  self.assertNotIn('escape',[f['subdirectory'] for f in D._model_folders()['folders']])
  with self.assertRaises(web.HTTPBadRequest):D._safe_directory('loras',0,'escape')
 async def test_url_normalization(self):
  url,name=await D._url_model_file('https://huggingface.co/org/model/blob/main/my%20model.gguf');self.assertIn('/resolve/',url);self.assertEqual(name,'my model.gguf')
  for value in ['file:///tmp/model.pt','https://localhost/model.pt','https://example.com/model.pt']:
   with self.assertRaises(web.HTTPBadRequest):await D._url_model_file(value)
 async def test_queue_in_selected_root_and_subfolder(self):
  app=web.Application();app.router.add_get('/comfierui/model-folders',D._list_model_folders);app.router.add_post('/comfierui/model-download',D._start_download)
  captured=[]
  def start(url,name,directory,destination):
   captured.append((url,name,directory,destination));return {'task_id':'fixture','filename':name,'directory':directory,'status':'pending','created_at':0,'url':url,'_destination':str(destination)}
  with patch.object(D,'_start_task',side_effect=start):
   async with TestClient(TestServer(app)) as client:
    self.assertEqual((await client.get('/comfierui/model-folders')).status,200)
    response=await client.post('/comfierui/model-download',json={'url':'https://huggingface.co/o/r/resolve/main/model.safetensors','directory':'loras','rootIndex':0,'subdirectory':'nested/deeper'})
    self.assertEqual(response.status,202);self.assertTrue((await response.json())['accepted']);self.assertEqual(captured[0][3],self.root/'nested/deeper/model.safetensors')
    response=await client.post('/comfierui/model-download',json={'url':'https://huggingface.co/o/r/resolve/main/model.pt','directory':'loras','subdirectory':'../escape'});self.assertEqual(response.status,400)
 async def test_retry_keeps_selected_subfolder(self):
  with patch.object(D,"_launch_task") as launch:
   record=D._start_task("https://huggingface.co/o/r/resolve/main/m.pt","m.pt","loras",self.root/"nested/m.pt")
   record.update(status="failed",_root_index=0,_subdirectory="nested")
   request=types.SimpleNamespace(match_info={"task_id":record["task_id"]})
   response=await D._retry_download(request)
   self.assertEqual(response.status,202)
   self.assertEqual(launch.call_args.args[1],self.root/"nested/m.pt")
   D._task_records.pop(record["task_id"])
 async def test_provider_filename_headers(self):
  response=types.SimpleNamespace(content_disposition=types.SimpleNamespace(filename='civitai-model.safetensors'),url='https://cdn.example/file',release=lambda:None)
  with patch.object(D,'_validated_download_response',new=AsyncMock(return_value=response)):
   url,name=await D._url_model_file('https://civitai.com/models/123?modelVersionId=456');self.assertEqual(url,'https://civitai.com/api/download/models/456');self.assertEqual(name,'civitai-model.safetensors')
if __name__=='__main__':unittest.main()
