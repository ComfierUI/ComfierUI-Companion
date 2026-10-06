import asyncio,importlib.util,sys,types,unittest,time
from pathlib import Path
from aiohttp import web
from aiohttp.test_utils import TestServer,make_mocked_request
ROOT=Path(__file__).resolve().parents[1]
sys.modules.setdefault('server',types.SimpleNamespace(PromptServer=types.SimpleNamespace(instance=None)))
package=types.ModuleType('performance_fixture');package.__path__=[str(ROOT)];sys.modules[package.__name__]=package
def load(name):
 spec=importlib.util.spec_from_file_location('performance_fixture.'+name,ROOT/(name+'.py'));m=importlib.util.module_from_spec(spec);sys.modules[spec.name]=m;spec.loader.exec_module(m);return m
G=load('companion_gateway')
class Performance(unittest.IsolatedAsyncioTestCase):
 async def asyncTearDown(self):
  await G._cleanup_sessions(None);G.invalidate_data_cache()
 async def test_completed_model_invalidates_inventory_only(self):
  sys.modules.setdefault('folder_paths',types.SimpleNamespace())
  D=load('model_download')
  G._store_cache('/models',G._CacheEntry(b'[]','json',time.monotonic(),120))
  G._store_cache('/object_info',G._CacheEntry(b'{}','json',time.monotonic(),120))
  D._invalidate_model_inventory()
  self.assertNotIn('/models',G._data_cache);self.assertIn('/object_info',G._data_cache)
 async def test_bounds_and_expiry(self):
  old=(G.DATA_CACHE_MAX_BYTES,G.DATA_CACHE_MAX_ENTRIES)
  try:
   G.DATA_CACHE_MAX_BYTES=10;G.DATA_CACHE_MAX_ENTRIES=2
   G._store_cache('expired',G._CacheEntry(b'123','json',time.monotonic()-10,1))
   G._store_cache('a',G._CacheEntry(b'12345','json',time.monotonic(),20))
   G._store_cache('b',G._CacheEntry(b'67890','json',time.monotonic(),20))
   G._store_cache('c',G._CacheEntry(b'abcde','json',time.monotonic(),20))
   self.assertEqual(list(G._data_cache),['b','c']);self.assertLessEqual(sum(len(x.body) for x in G._data_cache.values()),10)
   self.assertEqual(len(G._data_cache_stripes),64)
  finally:G.DATA_CACHE_MAX_BYTES,G.DATA_CACHE_MAX_ENTRIES=old
 async def test_http_coalescing_alias_session_and_no_store(self):
  hits=0
  async def upstream(request):
   nonlocal hits;hits+=1;await asyncio.sleep(.01)
   return web.json_response({'hits':hits},headers={'Cache-Control':'no-store'} if request.query.get('private') else {})
  app=web.Application();app.router.add_get('/object_info',upstream);server=TestServer(app);await server.start_server()
  try:
   from yarl import URL
   target=URL(str(server.make_url('/object_info')))
   requests=[make_mocked_request('GET','/object_info'),make_mocked_request('GET','/api/object_info')]
   responses=await asyncio.gather(*(G._fetch_cacheable(r,target,{},120) for r in requests))
   self.assertEqual(hits,1);self.assertEqual(responses[0].body,responses[1].body)
   async with G._session(True) as one:
    async with G._session(True) as two:self.assertIs(one,two)
   req=make_mocked_request('GET','/object_info?private=1');target=target.with_query(private='1')
   await G._fetch_cacheable(req,target,{},120);await G._fetch_cacheable(req,target,{},120)
   self.assertEqual(hits,3)
  finally:await server.close()
 async def test_download_worker_cancel_drains_before_close(self):
  sys.modules.setdefault('folder_paths',types.SimpleNamespace())
  D=load('model_download');events=[]
  class Output:
   def write(self,chunk):time.sleep(.04);events.append(chunk)
  task=asyncio.create_task(D._write_chunk(Output(),b'bounded'));await asyncio.sleep(.01);task.cancel()
  with self.assertRaises(asyncio.CancelledError):await task
  self.assertEqual(events,[b'bounded'])
if __name__=='__main__':unittest.main()

class Persistence(unittest.IsolatedAsyncioTestCase):
 async def test_diagnostic_worker_writes_and_keeps_backups(self):
  import tempfile
  D=load('diagnostics_host')
  with tempfile.TemporaryDirectory() as temp:
   D.ROOT=Path(temp);D.SCRIPTS=D.ROOT/'scripts';D.BACKUPS=D.ROOT/'backups';D.MANIFEST=D.ROOT/'scripts.json';D.ACTIVE=D.ROOT/'active.js';D._ensure()
   (D.BACKUPS/'user.js').write_text('keep')
   class Request:
    async def json(self):return {'action':'save_named','name':'sample','code':'window.test=1;'}
   response=await D._action(Request());self.assertEqual(response.status,200)
   self.assertEqual((D.SCRIPTS/'sample.js').read_text(),'window.test=1;');self.assertEqual((D.BACKUPS/'user.js').read_text(),'keep')
 async def test_terminal_retention_keeps_active_progress(self):
  N=load('notification_status');N._state_for('active')['step_value']=3
  for i in range(300):N._observe_event('execution_success',{'prompt_id':str(i)})
  N._state_for('active');self.assertEqual(N._states['active']['step_value'],3)
  self.assertLessEqual(sum(bool(s.get('terminal')) for s in N._states.values()),256)
