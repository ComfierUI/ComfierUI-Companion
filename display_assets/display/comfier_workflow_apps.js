/* ComfierUI 0.91: transient, curated workflow view. Never prunes the graph. */
(function(){
'use strict';
if(window.__comfierWorkflowApps)return;
const KEY='comfier.workflow.openMode.v1',choices=['ask','app','graph'];
let stopped=false,active=null,requestId=0,insideLoad=0,dialogClose=null,previewUrl=null,apiBound=null;
const patches=[],listeners=[];
const jobs=window.__comfierRuntime.scope('workflow-apps');
const getApp=()=>window.app||window.comfyAPI?.app?.app;
const getApi=()=>getApp()?.api||window.comfyAPI?.api?.api;
const preference=()=>{try{const v=typeof window.ComfierApp?.getWorkflowOpenMode==='function'?window.ComfierApp.getWorkflowOpenMode():localStorage.getItem(KEY);return choices.includes(v)?v:'ask'}catch(_){return'ask'}};
function setPreference(value){if(!choices.includes(value))throw Error('Invalid workflow opening preference');if(typeof window.ComfierApp?.setWorkflowOpenMode==='function'){if(!window.ComfierApp.setWorkflowOpenMode(value))throw Error('Could not save preference')}else localStorage.setItem(KEY,value);const select=document.querySelector('.comfier-workflow-mode-row select');if(select)select.value=value;}
function kind(control){
 const n=String(control.name||'').toLowerCase(),t=String(control.nodeType||'').toLowerCase();
 const hints=(control.targets||[]).map(v=>String(v).toLowerCase());
 if(control.connected||control.readOnly||control.disabled||/note|markdown/.test(t))return null;
 if(/^(seed|noise_seed|random_seed)$/.test(n)||n==='control_after_generate'||n==='seed_mode')return'seed';
 if(/^(?:(?:image_|video_|target_|output_)?(?:width|height)|megapixels|megapixel|resolution|image_size|aspect_ratio)$/.test(n))return'resolution';
 if(/prompt/.test(n)&&!/strength|weight|style|filename|path/.test(n))return'prompt';
 if(/^(text|text_g|text_l|positive|negative)$/.test(n)&&/textencode|text_encode|prompt|conditioning|textinput|text_input/.test(t))return'prompt';
 if(/^(image\d*|video|audio|file|filename|image_path|video_path|audio_path|reference_image|start_image|end_image)$/.test(n)&&!/save|output|preview/.test(t))return'file';
 if(/primitive|reroute/.test(t)&&/^(value|text|number)$/.test(n)){
  if(hints.some(h=>/(^|\.)((noise_|random_)?seed)$/.test(h)))return'seed';
  if(hints.some(h=>/(^|\.)(?:(?:image_|video_|target_|output_)?(?:width|height)|megapixels|resolution|aspect_ratio)$/.test(h)))return'resolution';
  if(hints.some(h=>/(^|\.)(image\d*|video|audio|file|reference_image|start_image|end_image)$/.test(h)))return'file';
  if(hints.some(h=>/prompt|textencode\.text|text_encode\.text|conditioning\.(positive|negative)/.test(h)))return'prompt';
 }
 return null;
}
function curate(controls,outputs){return{schemaVersion:1,controls:controls.flatMap(c=>{const k=kind(c);return k?[{key:c.key,kind:k}]:[]}),outputs:outputs.map(o=>o.key),processor:'client'}}
function graphNodes(g){return g?._nodes||g?.nodes||[]}
function snapshot(){
 const app=getApp(),root=app?.rootGraph||app?.graph,controls=[],outputs=[],bindings=new Map(),outputBindings=new Map();
 const visited=new Set(),widgetsSeen=new Set();
 const linkAt=(g,id)=>g?.getLink?.(id)||g?.links?.get?.(id)||g?.links?.[id];
 // A subgraph input wire is an editable host widget unless a real upstream
 // connection supplies its value. Follow nested boundaries to that host.
 function editableInput(node,slot,g,context,depth=0){
  if(slot?.link==null)return{connected:false};
  if(depth>32||!context)return{connected:true};
  const link=linkAt(g,slot.link);if(!link||String(link.origin_id)!==String(g.inputNode?.id))return{connected:true};
  const input=g.inputs?.[link.origin_slot],owner=context.node;
  const hostSlot=(owner.inputs||[]).find(i=>input&&(i._subgraphSlot===input||i._subgraphSlot?.id===input.id))||owner.inputs?.[link.origin_slot];
  if(!hostSlot)return{connected:true};
  const upstream=editableInput(owner,hostSlot,context.graph,context.parent,depth+1);if(upstream.connected)return upstream;
  if(upstream.widget)return upstream;
  const widget=(owner.widgets||[]).find(w=>w.name===(hostSlot.widget?.name||hostSlot.name))||owner.getWidgetFromSlot?.(hostSlot)||hostSlot._widget;
  return widget?{connected:false,node:owner,widget,graph:context.graph}:{connected:true};
 }
 function targets(node,g,depth=0,seen=new Set()){
  if(depth>16||seen.has(node))return[];seen.add(node);const found=[];
  function destination(link,graph,level){if(!link||level>16)return;const next=graph.getNodeById?.(link.target_id);if(!next)return;const slot=next.inputs?.[link.target_slot];if(!slot)return;
   if(next.subgraph){const input=slot._subgraphSlot||next.subgraph.inputs?.[link.target_slot];for(const id of input?.linkIds||[])destination(linkAt(next.subgraph,id),next.subgraph,level+1);return}
   found.push(next.type+'.'+(slot.widget?.name||slot.name));if(/primitive|reroute/i.test(next.type||''))found.push(...targets(next,graph,level+1,seen));
  }
  for(const out of node.outputs||[])for(const id of out.links||[])destination(linkAt(g,id),g,depth);return found;
 }
 function walk(g,path,context){
  if(!g||visited.has(g))return;visited.add(g);
  for(const node of graphNodes(g)){
   if(node.mode===2||node.mode===4)continue;
   const nodePath=path.concat(String(node.id)),type=String(node.type||node.constructor?.type||'');
   if(node.subgraph){walk(node.subgraph,nodePath,{node,graph:g,parent:context});continue}
   const info=node.constructor?.nodeData||node.constructor?.comfyClass||{};
   if(info.output_node||node.constructor?.nodeData?.output_node||/^(Save|Preview)(Image|Video|Audio|Animated|3D)|VideoCombine|SaveGLB|SaveMesh/i.test(type)){
    const key=JSON.stringify(nodePath);outputs.push({key,nodeId:String(node.id),nodeType:type});outputBindings.set(key,node);
   }
   for(const [index,widget]of (node.widgets||[]).entries()){
    if(!widget)continue;
    const slot=(node.inputs||[]).find(i=>i.widget?.name===widget.name||i.name===widget.name);
    const exposed=editableInput(node,slot,g,context),bound=exposed.widget||widget;
    if(widgetsSeen.has(bound))continue;widgetsSeen.add(bound);
    const key=JSON.stringify(nodePath.concat([String(index),String(widget.name)]));
    const c={key,nodeId:String(node.id),nodeType:type,name:widget.name,widgetType:bound.type,connected:exposed.connected,readOnly:!!bound.options?.read_only,disabled:!!bound.disabled,targets:targets(node,g)};
    if(['button','hidden','converted-widget'].includes(bound.type))continue;
    controls.push(c);bindings.set(key,{node:exposed.node||node,widget:bound,graph:exposed.graph||g,sourceNode:node,control:c});
   }
  }
  visited.delete(g);
 }
 walk(root,[]);return{root,controls,outputs,bindings,outputBindings};
}
function el(tag,text){const e=document.createElement(tag);if(text!==undefined)e.textContent=text;return e}
function button(text,fn){const b=el('button',text);b.type='button';b.addEventListener('click',fn);return b}
const style=el('style');style.id='comfier-workflow-app-style';style.textContent=`
html.comfier-lite-active #graph-canvas,html.comfier-lite-active [data-testid=transform-pane]{visibility:hidden!important;pointer-events:none!important}
.comfier-lite-form{display:flex;flex-direction:column;gap:14px;padding:12px;box-sizing:border-box;color:var(--comfier-ui-font,#fff);font:inherit;min-width:0}
html.comfier-lite-active #comfier-apps-content{overflow:hidden!important;display:flex;flex-direction:column}
html.comfier-lite-active .comfier-lite-form{height:100%;width:100%;min-height:0;flex:1;overflow:hidden}
.comfier-lite-fields{display:flex;flex-direction:column;gap:14px;flex:1;min-height:0;overflow:auto;overscroll-behavior:contain;touch-action:pan-y}
.comfier-lite-fields>*{flex-shrink:0}
.comfier-lite-footer{flex:none;display:flex;width:100%;min-width:0}
.comfier-lite-footer>.comfier-lite-generate{width:100%}
html:root body #comfier-apps-panel[data-comfier-apps-view="outerPortrait"] .comfier-lite-form textarea{min-height:350px!important}
.comfier-lite-form fieldset{display:flex;flex-direction:column;gap:10px;min-width:0;margin:0;padding:12px;border:1px solid var(--interface-stroke,#555);border-radius:8px}
.comfier-lite-form label{display:flex;flex-direction:column;gap:6px;min-width:0;text-align:left!important}
.comfier-lite-form :is(input,select,textarea,button),#comfier-workflow-choice button{font:inherit;box-sizing:border-box;min-height:40px;border:1px solid #aaa;border-radius:6px;padding:8px;background:#fff;color:#111;max-width:100%}
html:root body #comfier-apps-panel#comfier-apps-panel .comfier-lite-form button:is(.comfier-lite-generate,.comfier-lite-canvas){font-family:system-ui,sans-serif!important;font-size:25px!important;line-height:1.3!important;text-align:center!important;justify-content:center!important}
html:root body #comfier-apps-panel#comfier-apps-panel .comfier-lite-resolution-title{text-align:center!important;width:100%}
.comfier-lite-resolution{display:flex;flex-direction:column;gap:8px;min-width:0}
.comfier-lite-resolution-row{display:flex;align-items:center;justify-content:center;gap:4px;width:100%;min-width:0}
html:root body #comfier-apps-panel#comfier-apps-panel .comfier-lite-resolution-row input{width:calc(4ch + 18px)!important;min-width:0!important;flex:0 1 calc(4ch + 18px)!important;padding-inline:8px!important;font-family:monospace!important;text-align:center!important;appearance:textfield}
.comfier-lite-resolution-row input::-webkit-inner-spin-button,.comfier-lite-resolution-row input::-webkit-outer-spin-button{-webkit-appearance:none;margin:0}
.comfier-lite-form textarea{min-height:245px!important;resize:vertical;width:100%}
.comfier-lite-form img,.comfier-lite-form video{width:100%;height:auto;object-fit:contain;max-height:420px}.comfier-lite-form audio{width:100%}
.comfier-lite-form pre{white-space:pre-wrap;overflow-wrap:anywhere;margin:0}.comfier-lite-form [role=status]{font-size:12px;overflow-wrap:anywhere}.comfier-lite-form .comfier-lite-output{display:flex;flex-direction:column;gap:8px}
#comfier-workflow-choice{border:1px solid #777;border-radius:12px;padding:20px;background:var(--comfy-menu-bg,#171717);color:var(--comfier-ui-font,#fff);width:min(380px,calc(100vw - 32px));max-height:calc(100vh - 32px);overflow:auto;font:inherit}
#comfier-workflow-choice::backdrop{background:#0009}#comfier-workflow-choice .choices{display:flex;flex-direction:column;gap:12px}#comfier-workflow-choice label{display:flex;align-items:center;gap:8px;margin:16px 0}
`;
document.head.append(style);
function choose(){
 if(preference()!=='ask')return Promise.resolve(preference());
 dialogClose?.(null);
 return new Promise(resolve=>{
  const d=el('dialog');d.id='comfier-workflow-choice';d.setAttribute('aria-labelledby','comfier-workflow-choice-title');
  const title=el('h2','Open workflow as');title.id='comfier-workflow-choice-title';d.append(title,el('p','App Mode shows the essentials. Full Canvas shows every node.'));
  const row=el('label'),remember=el('input');remember.type='checkbox';row.append(remember,el('span','Remember my choice'));d.append(row);
  const options=el('div');options.className='choices';let done=false;
  const back=window.__comfierBack?.register?.('workflow-open-choice',250,()=>{finish(null);return true});
  function finish(value){if(done)return;done=true;back?.();d.close();d.remove();if(dialogClose===finish)dialogClose=null;if(value&&remember.checked){try{setPreference(value)}catch(_){}}resolve(value)}
  dialogClose=finish;options.append(button('App Mode',()=>finish('app')),button('Full Canvas',()=>finish('graph')),button('Cancel',()=>finish(null)));d.append(options);
  d.addEventListener('cancel',e=>{e.preventDefault();finish(null)});d.addEventListener('keydown',e=>e.stopPropagation());document.body.append(d);d.showModal();
 });
}
function markChanged(binding,value,event){
 const {widget,node,graph}=binding,old=widget.value;widget.value=value;
 widget.callback?.call(widget,value,getApp()?.canvas,node,undefined,event);
 node.onWidgetChanged?.(widget.name,value,old,widget);graph?.change?.();node.setDirtyCanvas?.(true,true);
}
async function values(widget){const v=widget.options?.values;return await(typeof v==='function'?v.call(widget):v)||[]}
function friendly(binding){const c=binding.control,display=binding.sourceNode||binding.node;let name=String(c.name).replace(/_/g,' ');if(kind(c)==='prompt')name=(c.targets||[]).some(t=>/\.negative$/i.test(t))||/negative/i.test(display.title||'')?'Negative prompt':'Prompt';if(/^(seed|noise_seed|random_seed)$/.test(c.name))name='Seed';if(c.name==='control_after_generate')name='Seed mode';return name+' · '+(display.title||c.nodeType)}
async function field(binding,category,form,status,valid){
 const {widget}=binding,label=el('label'),caption=el('span',friendly(binding));label.append(caption);
 let input;
 const opts=await values(widget);if(!valid())return;
 if(category==='prompt'){input=el('textarea');input.value=String(widget.value??'')}
 else if(Array.isArray(opts)&&opts.length){input=el('select');for(const option of opts){const o=el('option',String(option));o.value=String(option);input.append(o)}if(!opts.map(String).includes(String(widget.value))){const o=el('option',String(widget.value??''));o.value=String(widget.value??'');input.append(o)}input.value=String(widget.value??'')}
 else{input=el('input');const numeric=typeof widget.value==='number';input.type=numeric?'number':'text';input.value=String(widget.value??'');if(numeric){input.step=Number.isFinite(widget.options?.step2)?String(widget.options.step2):Number.isFinite(widget.options?.step)?String(widget.options.step/10):Number.isInteger(widget.value)?'1':'any';if(Number.isFinite(widget.options?.min))input.min=widget.options.min;if(Number.isFinite(widget.options?.max))input.max=Math.min(widget.options.max,Number.MAX_SAFE_INTEGER)}}
 input.dataset.controlKey=binding.control.key;input.setAttribute('aria-label',friendly(binding));
 const update=event=>{const numeric=typeof widget.value==='number',v=numeric?Number(input.value):input.value;if(numeric&&(input.value===''||!Number.isFinite(v)||!input.checkValidity())){status.textContent='Enter a valid '+widget.name;return}try{markChanged(binding,v,event);status.textContent=''}catch(e){status.textContent=e.message}};
 input.addEventListener(category==='prompt'?'input':'change',update);label.append(input);
 if(category==='seed'&&typeof widget.value==='number')label.append(button('New seed',()=>{const max=Math.min(widget.options?.max??Number.MAX_SAFE_INTEGER,Number.MAX_SAFE_INTEGER),min=Math.max(0,widget.options?.min??0);const random=new Uint32Array(2);crypto.getRandomValues(random);const value=Math.floor(min+((random[0]*2097152+(random[1]>>>11))/9007199254740992)*(max-min));input.value=String(value);update(new Event('change'))}));
 if(category==='file'){
  const upload=el('input');upload.type='file';const hint=(binding.control.name+' '+binding.control.nodeType).toLowerCase();upload.accept=/audio/.test(hint)?'audio/*':/video/.test(hint)?'video/*':'image/*,video/*,audio/*';upload.setAttribute('aria-label','Upload '+friendly(binding));
  upload.addEventListener('change',async()=>{const file=upload.files?.[0];if(!file)return;upload.disabled=true;status.textContent='Uploading '+file.name+'…';try{const data=new FormData();data.append('image',file);data.append('type','input');const response=await getApi().fetchApi('/upload/image',{method:'POST',body:data});if(!response.ok)throw Error('Upload failed ('+response.status+')');const result=await response.json();if(!valid())return;const name=(result.subfolder?result.subfolder+'/':'')+result.name;if(Array.isArray(widget.options?.values)&&!widget.options.values.includes(name))widget.options.values.push(name);if(input.tagName==='SELECT'&&![...input.options].some(o=>o.value===name)){const o=el('option',name);o.value=name;input.append(o)}input.value=name;update(new Event('change'));status.textContent='Uploaded '+file.name}catch(e){if(valid())status.textContent=e.message}finally{upload.disabled=false}});label.append(upload);
 }
 form.append(label);
}
function clearMedia(){if(previewUrl){URL.revokeObjectURL(previewUrl);previewUrl=null}}
function fullCanvas(){document.documentElement.classList.remove('comfier-lite-active');active=null;clearMedia();window.__comfierAppsPanel?.closeIfOpen?.();const stores=window.__comfierUi?.pinia?.()?._s;stores?.get('appMode')?.exitBuilder?.();const canvas=stores?.get('canvas');if(canvas)canvas.linearMode=false;}
async function openCurrent(){
 const seq=++requestId,s=snapshot();
 if(!s.controls.length&&!s.outputs.length){fullCanvas();return false}
 let plan=curate(s.controls,s.outputs);
 const capability=window.__comfierDocument?.companion?.snapshot?.().info?.capabilities||window.__comfierDetectedCompanion?.capabilities||[];
 if(capability.includes('workflow-app-curation')){
  const abort=new AbortController(),timeout=setTimeout(()=>abort.abort(),4000);
  try{const response=await getApi().fetchApi('/comfierui/workflow/curate',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({schemaVersion:1,controls:s.controls,outputs:s.outputs}),signal:abort.signal});if(response.ok){const host=await response.json();if(host.schemaVersion===1&&Array.isArray(host.controls)&&Array.isArray(host.outputs))plan=host}}
  catch(_){/* identical client curation covers older/offline hosts */}finally{clearTimeout(timeout)}
 }
 if(stopped||seq!==requestId)return false;
 if(!plan.controls.length&&!plan.outputs.length){fullCanvas();return false}
 clearMedia();const state={...s,plan,seq,media:[],seedInputs:[]};active=state;
 window.__comfierTemplatesSidebar?.closeIfOpen?.();
 const owner=window.__comfierAppsPanel;if(!owner?.openLite){active=null;return false}
 owner.openLite(container=>render(state,container));return true;
}
function pairResolution(group,state){
 const labels=[...group.querySelectorAll(':scope > label')],done=new Set();
 for(const label of labels){if(done.has(label))continue;const input=label.querySelector('[data-control-key]'),binding=state.bindings.get(input?.dataset.controlKey);if(!binding||binding.control.name!=='width')continue;
 const other=labels.find(candidate=>{const c=state.bindings.get(candidate.querySelector('[data-control-key]')?.dataset.controlKey);return c&&c.control.name==='height'&&c.node===binding.node&&c.sourceNode===binding.sourceNode});if(!other)continue;
 const height=other.querySelector('[data-control-key]'),block=el('div'),heading=el('div',(binding.sourceNode||binding.node).title||binding.control.nodeType),row=el('div');block.className='comfier-lite-resolution';heading.className='comfier-lite-resolution-title';row.className='comfier-lite-resolution-row';label.replaceWith(block);other.remove();row.append(el('span','Width'),input,el('span','X'),height,el('span','Height'));block.append(heading,row);done.add(label);done.add(other);
 }
}
async function render(state,container){
 document.documentElement.classList.add('comfier-lite-active');state.media=[];clearMedia();const form=el('section');form.className='comfier-lite-form';form.dataset.processor=state.plan.processor||'client';const fields=el('div');fields.className='comfier-lite-fields';const footer=el('footer');footer.className='comfier-lite-footer';form.append(fields,footer);const status=el('p');status.setAttribute('role','status');const canvasButton=button('Full Canvas',fullCanvas);canvasButton.className='comfier-lite-canvas';fields.append(canvasButton,status);container.append(form);
 const valid=()=>active===state&&form.isConnected;
 for(const [k,title]of [['resolution','Resolution'],['prompt','Prompts'],['file','Input files']]){
  const picks=state.plan.controls.filter(c=>c.kind===k&&state.bindings.has(c.key));if(!picks.length)continue;
  const group=el('fieldset');group.append(el('legend',title));fields.append(group);
  for(const pick of picks){try{await field(state.bindings.get(pick.key),k,group,status,valid)}catch(e){status.textContent='Some controls need Full Canvas: '+e.message}if(!valid())return}
  if(k==='resolution')pairResolution(group,state);
 }
 const run=button('Generate',async()=>{run.disabled=true;status.textContent='Queuing…';try{const action=window.__comfierActionbarOwner;if(action?.findCommand?.(['Comfy.QueuePrompt']))await action.executeCommand(['Comfy.QueuePrompt'],{metadata:{subscribe_to_run:false,trigger_source:'button'}});else await getApp().queuePrompt(0,1);if(valid()){status.textContent='Queued';refreshSeeds(state,form)}}catch(e){if(valid())status.textContent=e.message}finally{run.disabled=false}});run.className='comfier-lite-generate';footer.append(run);
 const progress=el('p','Ready');progress.setAttribute('role','status');const preview=el('img');preview.alt='Generation in progress';preview.hidden=true;const output=el('div');output.className='comfier-lite-output';fields.append(el('h3','Live preview'),progress,preview,el('h3','Output'),output);
 state.form=form;state.progress=progress;state.preview=preview;state.output=output;
 restoreOutput(state);bindApi();
}
function refreshSeeds(state,form){for(const control of state.plan.controls.filter(c=>c.kind==='seed')){const binding=state.bindings.get(control.key);const input=[...form.querySelectorAll('[data-control-key]')].find(i=>i.dataset.controlKey===control.key);if(binding&&input)input.value=String(binding.widget.value??'')}}
function mediaUrl(file){if(!file||typeof file.filename!=='string')return null;const q=new URLSearchParams({filename:file.filename,type:file.type||'output',subfolder:file.subfolder||''});return(getApi()?.apiURL?.('/view')||'/view')+'?'+q}
function showOutput(state,result){
 if(active!==state||!state.output)return;
 for(const [category,files]of Object.entries(result||{})){
  if(!Array.isArray(files))continue;
  for(const file of files){if(typeof file==='string'||typeof file==='number'){const key=category+':'+String(file);if(!state.media.includes(key)){state.media.push(key);state.output.append(el('pre',String(file)))}continue}const url=mediaUrl(file);if(!url||state.media.includes(url))continue;state.media.push(url);const ext=file.filename.split('.').pop().toLowerCase();let view;if(/^(mp4|webm|mov|mkv|gif)$/.test(ext)&&ext!=='gif'){view=el('video');view.controls=true}else if(/^(mp3|wav|flac|ogg|m4a|aac)$/.test(ext)){view=el('audio');view.controls=true}else if(/^(png|jpg|jpeg|webp|gif|avif|bmp)$/.test(ext)){view=el('img');view.alt=file.filename}if(view){view.src=url;state.output.append(view)}const link=el('a',file.filename);link.href=url;link.target='_blank';link.rel='noopener';state.output.append(link)}
 }
}
function restoreOutput(state){for(const key of state.plan.outputs){const node=state.outputBindings.get(key),out=getApp()?.nodeOutputs?.[node?.id];if(out)showOutput(state,out)}}
function bindApi(){
 const api=getApi();if(!api?.addEventListener||apiBound===api)return;
 for(const [a,name,fn]of listeners)a.removeEventListener(name,fn);listeners.length=0;apiBound=api;
 const bind=(name,fn)=>{api.addEventListener(name,fn);listeners.push([api,name,fn])};
 bind('execution_start',()=>{if(active?.output){active.media=[];active.output.replaceChildren();active.preview.hidden=true;clearMedia();active.progress.textContent='Generating…';refreshSeeds(active,active.form)}});
 bind('progress',e=>{if(active?.progress){const d=e.detail||{};active.progress.textContent=d.max?'Generating '+Math.round(d.value/d.max*100)+'%':'Generating…'}});
 bind('b_preview',e=>{if(active?.preview&&e.detail instanceof Blob){clearMedia();previewUrl=URL.createObjectURL(e.detail);active.preview.src=previewUrl;active.preview.hidden=false}});
 bind('executed',e=>{if(!active)return;const d=e.detail||{};if(!d.node||[...active.outputBindings.values()].some(n=>String(n.id)===String(d.node)||String(d.node).endsWith(':'+n.id)))showOutput(active,d.output)});
 bind('executing',e=>{if(active?.progress&&e.detail===null){active.progress.textContent='Finished';refreshSeeds(active,active.form)}});
 bind('execution_error',e=>{if(active?.progress)active.progress.textContent=e.detail?.exception_message||'Generation failed'});
}
function install(){
 const app=getApp();if(!app)return;
 for(const name of ['loadGraphData','loadApiJson']){
  if(typeof app[name]!=='function'||patches.some(p=>p.object===app&&p.name===name))continue;
  const original=app[name];
  const wrapper=async function(...args){
   if(insideLoad)return original.apply(this,args);
   const id=++requestId,choice=await choose();if(!choice||id!==requestId||stopped)return false;
   fullCanvas();insideLoad++;
   let result;try{result=await original.apply(this,args)}finally{insideLoad--}
   if(id!==requestId||stopped)return result;
   if(result===false)return false;
   if(choice==='app'){if(!await openCurrent())notice('This workflow needs Full Canvas; no supported App Mode controls or outputs were found.')}else fullCanvas();return result;
  };
  app[name]=wrapper;patches.push({object:app,name,original,wrapper});
 }
 bindApi();
}
function notice(message){console.warn('ComfierUI App Mode: '+message);window.ComfyRemoteDownloads?.showDownloadError?.(message);const p=el('div',message);p.setAttribute('role','status');p.style.cssText='position:fixed;left:16px;bottom:16px;max-width:calc(100vw - 32px);padding:12px;background:#222;color:white;z-index:10000';document.body.append(p);setTimeout(()=>p.remove(),6000)}
function settings(){const panel=document.querySelector('#comfier-ui-zoom-test .ui-zoom-panel');if(!panel||panel.querySelector('.comfier-workflow-mode-row'))return;const row=el('label');row.className='comfier-workflow-mode-row';row.style.cssText='order:5;width:100%;display:flex;flex-direction:column;gap:8px';const select=el('select');select.setAttribute('aria-label','Open workflows as');for(const [value,text]of [['ask','Ask every time'],['app','App Mode'],['graph','Full Canvas']]){const option=el('option',text);option.value=value;select.append(option)}select.value=preference();select.addEventListener('change',()=>{try{setPreference(select.value)}catch(_){select.value=preference();notice('Could not save the workflow opening preference')}});row.append(el('span','Open workflows as'),select);panel.append(row)}
const intercept=e=>{const trigger=window.__comfierWorkflowOwner?.control?.('apps');if(trigger&&trigger.contains(e.target)&&graphNodes(getApp()?.rootGraph||getApp()?.graph).length){e.preventDefault();e.stopImmediatePropagation();if(active&&window.__comfierAppsPanel?.isOpen())fullCanvas();else openCurrent().catch(error=>notice(error.message))}};
jobs.listen(document,'click',intercept,true);
jobs.listen(window,'comfier-app-view-closed',()=>{document.documentElement.classList.remove('comfier-lite-active');active=null;clearMedia()});
jobs.observe(document.body,{subtree:true,childList:true},()=>jobs.frame('settings',settings));
jobs.burst('install',()=>{install();settings()},[0,80,300,1000,2500,5000]);
const unsubscribeReady=window.__comfierDocument?.subscribe?.('workflow-apps-runtime','app',install);
const unsubscribeSettings=window.__comfierDocument?.subscribe?.('workflow-apps-settings','settingsHost',settings);
const unsubscribeCompanion=window.__comfierDocument?.companion?.subscribe?.('workflow-apps',state=>{window.__comfierDetectedCompanion=state.info;install()});
window.__comfierWorkflowApps={openCurrent,fullCanvas,curate,kind,snapshot,preference,setPreference,install,remove(){stopped=true;++requestId;dialogClose?.(null);fullCanvas();jobs.dispose();unsubscribeCompanion?.();unsubscribeReady?.();unsubscribeSettings?.();for(const p of patches)if(p.object[p.name]===p.wrapper)p.object[p.name]=p.original;for(const[a,n,f]of listeners)a.removeEventListener(n,f);style.remove();document.querySelector('.comfier-workflow-mode-row')?.remove();delete window.__comfierWorkflowApps}};
install();settings();
})();
