import importlib.util
from pathlib import Path
import sys
import types
import unittest
from aiohttp import web
from aiohttp.test_utils import TestClient, TestServer

sys.modules.setdefault('server', types.SimpleNamespace(PromptServer=types.SimpleNamespace(instance=None)))
spec=importlib.util.spec_from_file_location('workflow_apps_fixture',Path(__file__).resolve().parents[1]/'workflow_apps.py')
module=importlib.util.module_from_spec(spec);spec.loader.exec_module(module)

class WorkflowApps(unittest.IsolatedAsyncioTestCase):
    def test_llm_user_text_inputs(self):
        for typ,name,targets in [('StringInput','value',['LLMEnhancer.text']),('Anything','value',['CLIPTextEncode.text']),('Qwen','input_text',[])]:
            c=dict(key='user',nodeType=typ,name=name,targets=targets,textInput=True)
            self.assertEqual(module.curate(dict(schemaVersion=1,controls=[c],outputs=[]))['controls'][0]['kind'],'prompt')

    def test_arbitrary_multiline_inputs(self):
        base=dict(key='script',nodeType='CustomScript',name='script',multiline=True)
        self.assertEqual(module.curate(dict(schemaVersion=1,controls=[base],outputs=[]))['controls'],[{'key':'script','kind':'prompt'}])
        for flag in ('connected','readOnly','disabled'):
            self.assertEqual(module.curate(dict(schemaVersion=1,controls=[dict(base,**{flag:True})],outputs=[]))['controls'],[])

    async def test_host_plan_and_validation(self):
        app=web.Application();app.router.add_post('/comfierui/workflow/curate',module._curate)
        async with TestClient(TestServer(app)) as client:
            controls=[]
            for i,(name,typ,targets,connected) in enumerate([
                ('text','CLIPTextEncode',[],False),('seed','KSampler',[],False),
                ('control_after_generate','KSampler',[],False),('width','EmptyLatentImage',[],False),
                ('megapixels','ImageScaleToTotalPixels',[],False),('audio','LoadAudio',[],False),
                ('video','LoadVideo',[],False),('image','LoadImage',[],False),
                ('steps','KSampler',[],False),('cfg','KSampler',[],False),
                ('scheduler','KSampler',[],False),('filename_prefix','SaveImage',[],False),
                ('value','PrimitiveNode',['KSampler.seed'],False),
                ('value','PrimitiveNode',['KSampler.cfg'],False),('text','CLIPTextEncode',[],True),
            ]):controls.append(dict(key=str(i),name=name,nodeType=typ,targets=targets,connected=connected))
            payload=dict(schemaVersion=1,controls=controls,outputs=[dict(key='5')])
            response=await client.post('/comfierui/workflow/curate',json=payload)
            self.assertEqual(response.status,200);plan=await response.json()
            self.assertEqual([c['key'] for c in plan['controls']],['0','1','2','3','4','5','6','7','12'])
            self.assertEqual(plan['outputs'],['5']);self.assertEqual(plan['processor'],'companion')
            self.assertEqual(payload['controls'],controls)
            response=await client.post('/comfierui/workflow/curate',json={'schemaVersion':2})
            self.assertEqual(response.status,400)
            response=await client.post('/comfierui/workflow/curate',json={'schemaVersion':1,'controls':[{'key':'x','targets':3}],'outputs':[]})
            self.assertEqual(response.status,400)

if __name__=='__main__':unittest.main()
