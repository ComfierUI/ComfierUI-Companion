import unittest,sys,types,tempfile,zipfile,json,io,importlib.util
from pathlib import Path
from unittest.mock import patch
from aiohttp import web
from aiohttp.test_utils import TestClient,TestServer
sys.modules.setdefault('server',types.SimpleNamespace(PromptServer=types.SimpleNamespace(instance=None)))
sys.modules.setdefault('folder_paths',types.SimpleNamespace())
spec=importlib.util.spec_from_file_location('workflow_fixture',Path(__file__).resolve().parents[1]/'model_download.py');D=importlib.util.module_from_spec(spec);spec.loader.exec_module(D)
GRAPH={'nodes':[{'id':1,'type':'KSampler'}],'links':[]}
class Workflows(unittest.IsolatedAsyncioTestCase):
 def archive(self,path,files):
  with zipfile.ZipFile(path,'w') as z:
   for name,value in files.items():z.writestr(name,value)
 def test_nested_json_only_and_graph_filter(self):
  with tempfile.TemporaryDirectory() as temp:
   p=Path(temp)/'a.zip';self.archive(p,{'nested/graph.json':json.dumps(GRAPH),'image.png':b'media','other/settings.json':'{"foo":1}','nested/another.json':json.dumps({'1':{'class_type':'LoadImage','inputs':{}}})})
   found=D._workflow_files(p,'a.zip');self.assertEqual([n for n,d in found],['graph.json','another.json']);self.assertEqual(list(Path(temp).iterdir()),[p])
 def test_unsafe_paths_and_symlink(self):
  for name in ['../graph.json','/graph.json','a\\graph.json','C:/graph.json']:
   with tempfile.TemporaryDirectory() as temp:
    p=Path(temp)/'a.zip';self.archive(p,{name:json.dumps(GRAPH)})
    with self.assertRaises(ValueError):D._workflow_files(p,'a.zip')
  with tempfile.TemporaryDirectory() as temp:
   p=Path(temp)/'a.zip';info=zipfile.ZipInfo('graph.json');info.external_attr=(0o120777<<16)
   with zipfile.ZipFile(p,'w') as z:z.writestr(info,'target')
   with self.assertRaises(ValueError):D._workflow_files(p,'a.zip')
 def test_non_workflow_and_size_limits(self):
  with tempfile.TemporaryDirectory() as temp:
   p=Path(temp)/'x.json';p.write_text('{"metadata":true}')
   with self.assertRaisesRegex(ValueError,'No valid'):D._workflow_files(p,'x.json')
   p.write_text(json.dumps(GRAPH))
   with patch.object(D,'WORKFLOW_JSON_LIMIT',2):
    with self.assertRaises(ValueError):D._workflow_files(p,'x.json')
 def test_collision_and_manual_name(self):
  with tempfile.TemporaryDirectory() as temp:
   root=Path(temp);(root/'graph.json').write_text('keep')
   files=[('graph.json',b'a'),('graph.json',b'b')];saved=D._publish_workflows(files,root,'x.zip')
   self.assertEqual([p.name for p in saved],['graph (1).json','graph (2).json']);self.assertEqual((root/'graph.json').read_text(),'keep')
   saved=D._publish_workflows([('original.json',b'c')],root,'renamed.json');self.assertEqual(saved[0].name,'renamed.json')
 def test_windows_names_and_graph_detection(self):
  for n in ['../x.json','CON.json','a:b.json','x.png']:
   with self.assertRaises(web.HTTPBadRequest):D._workflow_name(n)
  self.assertFalse(D._workflow_graph({'nodes':[{'id':1}],'links':[]}));self.assertTrue(D._workflow_graph(GRAPH))
 async def test_active_user_folders_and_isolation(self):
  with tempfile.TemporaryDirectory() as temp:
   base=Path(temp)
   class Users:
    def get_request_user_id(self,r):return r.headers.get('comfy-user','default')
    def get_request_user_filepath(self,r,file):return str(base/self.get_request_user_id(r)/file)
   server=types.SimpleNamespace(user_manager=Users())
   with patch.object(D.PromptServer,'instance',server):
    root=base/'alice/workflows';(root/'nested').mkdir(parents=True);(root/'nested/x.json').write_text(json.dumps(GRAPH));(root/'bad').symlink_to(base,target_is_directory=True)
    D._task_records.clear();D._task_records['w']=dict(task_id='w',kind='workflows',_user='alice',created_at=1,status='completed',workflows=['nested/x.json'])
    app=web.Application();app.router.add_get('/folders',D._list_workflow_folders);app.router.add_get('/tasks',D._list_downloads);app.router.add_get('/tasks/{task_id}/workflow',D._workflow_data)
    async with TestClient(TestServer(app)) as client:
     response=await client.get('/folders',headers={'comfy-user':'alice'});data=await response.json();self.assertEqual([f['subdirectory'] for f in data['folders']],['','nested'])
     response=await client.get('/tasks',headers={'comfy-user':'bob'});self.assertEqual((await response.json())['downloads'],[])
     response=await client.get('/tasks/w/workflow?file=nested/x.json',headers={'comfy-user':'bob'});self.assertEqual(response.status,404)
     response=await client.get('/tasks/w/workflow?file=nested/x.json',headers={'comfy-user':'alice'});self.assertEqual(await response.json(),GRAPH)
     request=types.SimpleNamespace(headers={'comfy-user':'alice'})
     with self.assertRaises(web.HTTPBadRequest):D._workflow_folder(request,'../input')
     with self.assertRaises(web.HTTPBadRequest):D._workflow_folder(request,'bad')
 async def test_download_import_and_failure_keep_inputs_clean(self):
  from unittest.mock import AsyncMock
  import asyncio
  class Content:
   def __init__(self,raw):self.raw=raw
   async def iter_chunked(self,size):
    for i in range(0,len(self.raw),size):yield self.raw[i:i+size]
  with tempfile.TemporaryDirectory() as temp:
   base=Path(temp);inputs=base/'input';inputs.mkdir();(inputs/'keep.png').write_bytes(b'original')
   stream=io.BytesIO()
   with zipfile.ZipFile(stream,'w') as z:
    z.writestr('nested/workflow.json',json.dumps(GRAPH));z.writestr('preview.png',b'preview');z.writestr('settings.json','{"setting":true}')
   response=types.SimpleNamespace(content=Content(stream.getvalue()),release=lambda:None)
   record=dict(task_id='run',url='https://civitai.red/api/download/models/1',filename='bundle.zip',status='pending',received_bytes=0,_root=str(base/'workflows'),_subdirectory='saved')
   record['_session_headers']={'Cookie':'fixture'}
   with patch.object(D,'_validated_download_response',new=AsyncMock(return_value=response)):
    await D._workflow_run(record)
   self.assertNotIn('_session_headers',record)
   self.assertEqual(record['status'],'completed');self.assertEqual(record['workflows'],['saved/workflow.json']);self.assertEqual(list(inputs.iterdir()),[inputs/'keep.png']);self.assertEqual((inputs/'keep.png').read_bytes(),b'original')
   self.assertEqual([p.name for p in (base/'workflows/saved').iterdir()],['workflow.json'])
   response.content=Content(b'not a zip');record['received_bytes']=0
   with patch.object(D,'_validated_download_response',new=AsyncMock(return_value=response)):await D._workflow_run(record)
   self.assertEqual(record['status'],'failed');self.assertEqual([p.name for p in (base/'workflows/saved').iterdir()],['workflow.json'])
   record['received_bytes']=0
   with patch.object(D,'_validated_download_response',new=AsyncMock(side_effect=asyncio.CancelledError)):await D._workflow_run(record)
   self.assertEqual(record['status'],'canceled')
 async def test_browser_metadata_discovers_workflow_without_relaxing_model_install(self):
  from unittest.mock import AsyncMock
  app=web.Application();app.router.add_post('/info',D._model_download_info)
  with patch.object(D,'_url_model_file',new=AsyncMock(side_effect=web.HTTPBadRequest(text='Unsupported model file type'))),patch.object(D,'_workflow_url_file',new=AsyncMock(return_value=('https://civitai.red/api/download/models/1','bundle.zip'))):
   async with TestClient(TestServer(app)) as client:
    response=await client.post('/info',json={'url':'https://civitai.red/api/download/models/1'})
    self.assertEqual(response.status,200);self.assertEqual((await response.json())['kind'],'workflows')
  with self.assertRaises(web.HTTPBadRequest):D._safe_filename('workflow.json')
