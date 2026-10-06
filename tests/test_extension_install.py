import unittest,types,sys,importlib.util,tempfile,asyncio
from pathlib import Path
from unittest.mock import patch,AsyncMock
from aiohttp import web
from aiohttp.test_utils import TestClient,TestServer
sys.modules.setdefault('server',types.SimpleNamespace(PromptServer=types.SimpleNamespace(instance=None)))
sys.modules.setdefault('folder_paths',types.SimpleNamespace())
spec=importlib.util.spec_from_file_location('extension_fixture',Path(__file__).resolve().parents[1]/'model_download.py');D=importlib.util.module_from_spec(spec);spec.loader.exec_module(D)
class Extensions(unittest.IsolatedAsyncioTestCase):
 def record(self,temp):return dict(task_id='extension-test',filename='repo',kind='custom_nodes',url='https://github.com/owner/repo.git',status='pending',stage='clone',_destination=str(Path(temp)/'repo'))
 def test_repository_validation(self):
  self.assertEqual(D._extension_repository('https://github.com/owner/repo/tree/main?x=1'),('https://github.com/owner/repo.git','repo'))
  for url in ['http://github.com/o/r','https://localhost/o/r','https://u:p@github.com/o/r','https://github.com/o','https://github.com/o/../r','https://github.com/o/r/archive/main.zip']:
   with self.assertRaises(web.HTTPBadRequest):D._extension_repository(url)
 async def test_clone_then_active_python_and_restart(self):
  with tempfile.TemporaryDirectory() as temp:
   calls=[];record=self.record(temp)
   async def run(record,args,cwd=None):
    calls.append((args,cwd))
    if args[0]=='git':(Path(args[-1])/'requirements.txt').write_text('fixture-package')
   with patch.object(D,'_extension_command',side_effect=run):await D._extension_run(record)
   self.assertEqual(calls[0][0][:6],['git','-c','credential.helper=','-c','protocol.file.allow=never','clone'])
   self.assertEqual(calls[1][0],[sys.executable,'-m','pip','install','-r','requirements.txt']);self.assertEqual(calls[1][1],Path(temp)/'repo')
   self.assertEqual(record['status'],'completed');self.assertTrue(record['restart_required'])
 async def test_no_requirements_and_clone_failure_cleanup(self):
  with tempfile.TemporaryDirectory() as temp:
   record=self.record(temp)
   with patch.object(D,'_extension_command',new=AsyncMock()):await D._extension_run(record)
   self.assertTrue(record['restart_required'])
  with tempfile.TemporaryDirectory() as temp:
   record=self.record(temp)
   with patch.object(D,'_extension_command',new=AsyncMock(side_effect=RuntimeError('git missing'))):await D._extension_run(record)
   self.assertEqual(record['status'],'failed');self.assertFalse(record['restart_required']);self.assertEqual(list(Path(temp).iterdir()),[])
 async def test_pip_failure_retains_clone_and_retry_does_not_clone(self):
  with tempfile.TemporaryDirectory() as temp:
   record=self.record(temp);calls=[]
   async def run(record,args,cwd=None):
    calls.append(args)
    if args[0]=='git':(Path(args[-1])/'requirements.txt').write_text('fixture')
    else:raise RuntimeError('missing build tool')
   with patch.object(D,'_extension_command',side_effect=run):await D._extension_run(record)
   self.assertEqual(record['status'],'failed');self.assertFalse(record['restart_required']);self.assertTrue((Path(temp)/'repo').is_dir())
   with patch.object(D,'_extension_command',new=AsyncMock()) as run:await D._extension_run(record)
   self.assertEqual(run.await_count,1);self.assertEqual(run.call_args.args[1][0],sys.executable)
 async def test_existing_folder_and_cancel(self):
  with tempfile.TemporaryDirectory() as temp:
   (Path(temp)/'repo').mkdir();(Path(temp)/'repo/keep').write_text('keep');record=self.record(temp)
   with patch.object(D,'_extension_command',new=AsyncMock()) as run:await D._extension_run(record)
   run.assert_not_awaited();self.assertEqual((Path(temp)/'repo/keep').read_text(),'keep')
  with tempfile.TemporaryDirectory() as temp:
   record=self.record(temp)
   with patch.object(D,'_extension_command',new=AsyncMock(side_effect=asyncio.CancelledError)):await D._extension_run(record)
   self.assertEqual(record['status'],'canceled');self.assertEqual(list(Path(temp).iterdir()),[])
 async def test_endpoint_queue_and_duplicate(self):
  with tempfile.TemporaryDirectory() as temp,patch.object(D.folder_paths,'get_folder_paths',create=True,return_value=[temp]),patch.object(D,'_launch_extension'):
   app=web.Application();app.router.add_post('/install',D._install_extension)
   async with TestClient(TestServer(app)) as client:
    r=await client.post('/install',json={'url':'https://github.com/owner/repo'});self.assertEqual(r.status,202);p=await r.json();self.assertEqual(p['kind'],'custom_nodes');self.assertNotIn('_destination',p)
    (Path(temp)/'repo').mkdir();r=await client.post('/install',json={'url':'https://github.com/owner/repo'});self.assertEqual(r.status,409)

 async def test_subprocess_arguments_and_failure(self):
  process=types.SimpleNamespace(stdout=types.SimpleNamespace(readline=AsyncMock(side_effect=[b'compiler missing\n',b''])),wait=AsyncMock(return_value=1),returncode=1)
  with patch.object(D.asyncio,'create_subprocess_exec',new=AsyncMock(return_value=process)) as spawn:
   with self.assertRaisesRegex(RuntimeError,'requirements failed'):
    await D._extension_command({'stage':'requirements'},[sys.executable,'-m','pip','install','-r','requirements.txt'],Path('/fixture/repo'))
   self.assertEqual(spawn.call_args.args,(sys.executable,'-m','pip','install','-r','requirements.txt'));self.assertEqual(spawn.call_args.kwargs['cwd'],'/fixture/repo');self.assertNotIn('shell',spawn.call_args.kwargs)
 async def test_cancel_before_worker_starts(self):
  with tempfile.TemporaryDirectory() as temp:
   record=self.record(temp);D._launch_extension(record);task=D._task_handles[record['task_id']];task.cancel()
   try:await task
   except asyncio.CancelledError:pass
   await asyncio.sleep(0)
   self.assertEqual(record['status'],'canceled');self.assertNotIn(Path(temp)/'repo',D._active_targets)
