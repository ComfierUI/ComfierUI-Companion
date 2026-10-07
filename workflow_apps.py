"""Stateless host pre-processor for transient ComfierUI App Mode controls.

Resolved widget descriptors come from the client after ComfyUI has instantiated
custom nodes/subgraphs. Values, uploaded bytes, and prompts are never transmitted
to this endpoint. It returns a presentation plan, never writes workflow files or
modifies the executable graph. The client has matching offline/cloud rules.
"""
import re
from aiohttp import web
from server import PromptServer

_registered = False


def control_kind(control):
    name = str(control.get('name', '')).lower()
    node_type = str(control.get('nodeType', '')).lower()
    hints = [str(v).lower() for v in control.get('targets', [])]
    if (control.get('connected') or control.get('readOnly') or control.get('disabled')
            or re.search(r'note|markdown', node_type)):
        return None
    if control.get('multiline'):
        return 'prompt'
    if re.fullmatch(r'(seed|noise_seed|random_seed)', name) or name in ('control_after_generate', 'seed_mode'):
        return 'seed'
    if re.fullmatch(r'(?:(?:image_|video_|target_|output_)?(?:width|height)|megapixels|megapixel|resolution|image_size|aspect_ratio)', name):
        return 'resolution'
    if 'prompt' in name and not re.search(r'strength|weight|style|filename|path', name):
        return 'prompt'
    if (name in ('text', 'text_g', 'text_l', 'positive', 'negative') and
            re.search(r'textencode|text_encode|prompt|conditioning|textinput|text_input', node_type)):
        return 'prompt'
    if (re.fullmatch(r'(image\d*|video|audio|file|filename|image_path|video_path|audio_path|reference_image|start_image|end_image)', name)
            and not re.search(r'save|output|preview', node_type)):
        return 'file'
    if control.get('textInput') and any(
        re.search(r'(?:textencode|text_encode|textinput|text_input)[^.]*\.(?:text|text_g|text_l|prompt|positive|negative)$|\.(?:user_prompt|user_message|input_text|positive|negative|prompt)$|(?:llm|ollama|anthropic|claude|gemini|qwen|llama|openai|promptenhanc)[^.]*\.(?:text|message|input)$', h)
        for h in hints):
        return 'prompt'
    if (control.get('textInput') and name in ('text', 'string', 'value', 'user_message', 'input_text') and
            re.search(r'llm|ollama|anthropic|claude|gemini|qwen|llama|openai|promptenhanc|textinput|text_input', node_type)):
        return 'prompt'
    if re.search(r'primitive|reroute', node_type) and name in ('value', 'text', 'number'):
        if any(re.search(r'(^|\.)((noise_|random_)?seed)$', h) for h in hints):
            return 'seed'
        if any(re.search(r'(^|\.)(?:(?:image_|video_|target_|output_)?(?:width|height)|megapixels|resolution|aspect_ratio)$', h) for h in hints):
            return 'resolution'
        if any(re.search(r'(^|\.)(image\d*|video|audio|file|reference_image|start_image|end_image)$', h) for h in hints):
            return 'file'
        if any(re.search(r'prompt|textencode\.text|text_encode\.text|conditioning\.(positive|negative)', h) for h in hints):
            return 'prompt'
    return None


def curate(payload):
    if not isinstance(payload, dict) or payload.get('schemaVersion') != 1:
        raise ValueError('Unsupported curation schema')
    controls, outputs = payload.get('controls'), payload.get('outputs')
    if not isinstance(controls, list) or not isinstance(outputs, list):
        raise ValueError('Resolved controls and outputs are required')
    if len(controls) > 20000 or len(outputs) > 2000:
        raise ValueError('Workflow descriptor limit exceeded')
    picks, keys = [], set()
    for c in controls:
        if not isinstance(c, dict) or not isinstance(c.get('key'), str) or not isinstance(c.get('targets', []), list):
            raise ValueError('Invalid control descriptor')
        if len(c['key']) > 4096 or len(c.get('targets', [])) > 4096:
            raise ValueError('Control descriptor limit exceeded')
        kind = control_kind(c)
        if kind and c['key'] not in keys:
            keys.add(c['key'])
            picks.append({'key': c['key'], 'kind': kind})
    selected_outputs = []
    for o in outputs:
        if not isinstance(o, dict) or not isinstance(o.get('key'), str):
            raise ValueError('Invalid output descriptor')
        if o['key'] not in selected_outputs:
            selected_outputs.append(o['key'])
    return {'schemaVersion': 1, 'controls': picks, 'outputs': selected_outputs, 'processor': 'companion'}


async def _curate(request):
    try:
        return web.json_response(curate(await request.json()))
    except (ValueError, TypeError, KeyError) as exc:
        return web.json_response({'error': str(exc)}, status=400)


def register_workflow_app_routes():
    global _registered
    if _registered:
        return
    PromptServer.instance.routes.post('/comfierui/workflow/curate')(_curate)
    _registered = True
