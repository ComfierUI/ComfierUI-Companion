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
function promptHint(value){const h=String(value).toLowerCase();return /(?:textencode|text_encode|textinput|text_input)[^.]*\.(?:text|text_g|text_l|prompt|positive|negative)$/.test(h)||/\.(?:user_prompt|user_message|input_text|positive|negative|prompt)$/.test(h)||/(?:llm|ollama|anthropic|claude|gemini|qwen|llama|openai|promptenhanc)[^.]*\.(?:text|message|input)$/.test(h)}
function promptRole(c){const role=v=>/negative|(^|[^a-z])neg([^a-z]|$)/.test(v)?'negative':/positive|(^|[^a-z])pos([^a-z]|$)/.test(v)?'positive':null;const own=role([c.name,c.widgetName].filter(Boolean).join(' ').toLowerCase());if(own)return own;const hints=(c.targets||[]).map(v=>String(v).toLowerCase());if(hints.some(h=>/\.(negative|negative_prompt)$/.test(h)))return'negative';if(hints.some(h=>/\.(positive|positive_prompt)$/.test(h)))return'positive';return role(String(c.sourceTitle||'').toLowerCase())||role(String(c.title||'').toLowerCase())||'positive'}
function kind(control){
 const n=String(control.name||'').toLowerCase(),t=String(control.nodeType||'').toLowerCase();
 const hints=(control.targets||[]).map(v=>String(v).toLowerCase());
 if(control.connected||control.readOnly||control.disabled||/note|markdown/.test(t))return null;
 if(control.multiline)return'prompt';
 if(/^(seed|noise_seed|random_seed)$/.test(n)||n==='control_after_generate'||n==='seed_mode')return'seed';
 if(/^(?:(?:image_|video_|target_|output_)?(?:width|height)|megapixels|megapixel|resolution|image_size|aspect_ratio)$/.test(n))return'resolution';
 if(/prompt/.test(n)&&!/strength|weight|style|filename|path/.test(n))return'prompt';
 if(/^(text|text_g|text_l|positive|negative)$/.test(n)&&/textencode|text_encode|prompt|conditioning|textinput|text_input/.test(t))return'prompt';
 if(/^(image\d*|video|audio|file|filename|image_path|video_path|audio_path|reference_image|start_image|end_image)$/.test(n)&&!/save|output|preview/.test(t))return'file';
 if(control.textInput&&hints.some(promptHint))return'prompt';
 if(control.textInput&&/^(text|string|value|user_message|input_text)$/.test(n)&&/llm|ollama|anthropic|claude|gemini|qwen|llama|openai|promptenhanc|textinput|text_input/.test(t))return'prompt';
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
 const app=getApp(),root=app?.rootGraph||app?.graph,controls=[],outputs=[],nodes=[],bindings=new Map(),outputBindings=new Map();
 const visited=new Set(),widgetsSeen=new Set(),contexts=new Map();
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
   if(next===graph.outputNode){const ctx=contexts.get(graph);if(ctx){const output=graph.outputs?.[link.target_slot],hostOutput=ctx.node.outputs?.find(o=>output&&(o._subgraphSlot===output||o._subgraphSlot?.id===output.id))||ctx.node.outputs?.[link.target_slot];for(const id of hostOutput?.links||[])destination(linkAt(ctx.graph,id),ctx.graph,level+1)}return}
   if(next.subgraph){const input=slot._subgraphSlot||next.subgraph.inputs?.[link.target_slot];for(const id of input?.linkIds||[])destination(linkAt(next.subgraph,id),next.subgraph,level+1);return}
   found.push(next.type+'.'+(slot.widget?.name||slot.name));if(/primitive|reroute/i.test(next.type||''))found.push(...targets(next,graph,level+1,seen));
  }
  for(const out of node.outputs||[])for(const id of out.links||[])destination(linkAt(g,id),g,depth);return found;
 }
 function walk(g,path,context){
  if(!g||visited.has(g))return;visited.add(g);if(context)contexts.set(g,context);
  for(const node of graphNodes(g)){
   const nodePath=path.concat(String(node.id)),type=String(node.type||node.constructor?.type||'');
   const nodeKey=JSON.stringify(nodePath);nodes.push({key:nodeKey,title:(context?String(context.node.title||context.node.type)+' / ':'')+String(node.title||type||'Node')+' · '+node.id});
   if(node.mode===2||node.mode===4)continue;
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
    const multiline=!!(bound.options?.multiline||widget.options?.multiline||bound.inputEl?.tagName==='TEXTAREA'||info.input?.required?.[widget.name]?.[1]?.multiline||info.input?.optional?.[widget.name]?.[1]?.multiline);
    const c={key,nodeKey,multiline,nodeId:String(node.id),nodeType:type,name:widget.name,widgetName:bound.name,title:(exposed.node||node).title||node.title||'',sourceTitle:node.title||'',textInput:typeof bound.value==='string'&&!Array.isArray(bound.options?.values),widgetType:bound.type,connected:exposed.connected,readOnly:!!bound.options?.read_only,disabled:!!bound.disabled,targets:targets(node,g)};
    if(['button','hidden'].includes(bound.type)||bound.type==='converted-widget'&&!exposed.widget)continue;
    controls.push(c);bindings.set(key,{node:exposed.node||node,widget:bound,graph:exposed.graph||g,sourceNode:node,control:c});
   }
  }
  visited.delete(g);
 }
 walk(root,[]);return{root,controls,outputs,nodes,bindings,outputBindings};
}
function el(tag,text){const e=document.createElement(tag);if(text!==undefined)e.textContent=text;return e}
function button(text,fn){const b=el('button',text);b.type='button';b.addEventListener('click',fn);return b}
const style=el('style');style.id='comfier-workflow-app-style';style.textContent=`
html.comfier-lite-active #graph-canvas,html.comfier-lite-active [data-testid=transform-pane]{visibility:hidden!important;pointer-events:none!important}
.comfier-lite-form{display:flex;flex-direction:column;gap:14px;padding:12px;box-sizing:border-box;color:var(--comfier-ui-font,#fff);font:inherit;min-width:0}
html.comfier-lite-active #comfier-apps-content{overflow:hidden!important;display:flex;flex-direction:column}
html.comfier-lite-active .comfier-lite-form{height:100%;width:100%;min-height:0;flex:1;overflow:hidden}
.comfier-lite-fields{display:flex;flex-direction:column;gap:14px;flex:1;min-height:0;overflow:auto;overscroll-behavior:contain;touch-action:pan-y}
.comfier-lite-output[hidden],.comfier-lite-preview[hidden]{display:none!important}
.comfier-lite-fields>*{flex-shrink:0}
.comfier-lite-footer{flex:none;display:flex;width:100%;min-width:0}
.comfier-lite-footer>.comfier-lite-generate{width:100%}

.comfier-lite-form fieldset{display:flex;flex-direction:column;gap:10px;min-width:0;margin:0;padding:12px;border:1px solid var(--interface-stroke,#555);border-radius:8px}
.comfier-lite-form label{display:flex;flex-direction:column;gap:6px;min-width:0;text-align:left!important}
.comfier-lite-form :is(input,select,textarea,button),#comfier-workflow-choice button{font:inherit;box-sizing:border-box;min-height:40px;border:1px solid #aaa;border-radius:6px;padding:8px;background:#fff;color:#111;max-width:100%}
html:root body #comfier-apps-panel#comfier-apps-panel .comfier-lite-form button:is(.comfier-lite-generate,.comfier-lite-canvas){font-family:system-ui,sans-serif!important;font-size:25px!important;line-height:1.3!important;text-align:center!important;justify-content:center!important}
html:root body #comfier-apps-panel#comfier-apps-panel .comfier-lite-resolution-title{text-align:center!important;width:100%}
.comfier-lite-resolution{display:flex;flex-direction:column;gap:8px;min-width:0}
.comfier-lite-resolution-row{display:flex;align-items:center;justify-content:center;gap:4px;width:100%;min-width:0}
html:root body #comfier-apps-panel#comfier-apps-panel .comfier-lite-resolution-row input{width:calc(4ch + 18px)!important;min-width:0!important;flex:0 1 calc(4ch + 18px)!important;padding-inline:8px!important;font-family:monospace!important;text-align:center!important;appearance:textfield}
.comfier-lite-resolution-row input::-webkit-inner-spin-button,.comfier-lite-resolution-row input::-webkit-outer-spin-button{-webkit-appearance:none;margin:0}
.comfier-lite-form textarea{min-height:36px!important;height:auto;resize:vertical;width:100%;overflow-y:hidden;line-height:1.3!important}
.comfier-lite-form img,.comfier-lite-form video{width:100%;height:auto;object-fit:contain;max-height:420px}.comfier-lite-form audio{width:100%}
.comfier-lite-form pre{white-space:pre-wrap;overflow-wrap:anywhere;margin:0}.comfier-lite-form [role=status]{font-size:12px;overflow-wrap:anywhere}.comfier-lite-form .comfier-lite-output{display:flex;flex-direction:column;gap:8px}
#comfier-workflow-choice{border:1px solid #777;border-radius:12px;padding:20px;background:var(--comfy-menu-bg,#171717);color:var(--comfier-ui-font,#fff);width:min(380px,calc(100vw - 32px));max-height:calc(100vh - 32px);overflow:auto;font:inherit}

html body .comfier-lite-form[hidden]{display:none!important}
.comfier-lite-control-groups{display:flex;flex-direction:column;gap:14px}
html body #comfier-apps-panel :is(.comfier-lite-form,.comfier-lite-manager){background:var(--comfier-panel-bg,var(--comfy-menu-bg,#171717));color:var(--comfier-ui-font,#fff);font:500 14px system-ui,sans-serif}
html body #comfier-apps-panel .comfier-lite-form :is(input:not([type=file]),textarea,select){background:var(--comfier-panel-bg,var(--comfy-menu-bg,#171717))!important;color:var(--comfier-ui-font,#fff)!important;-webkit-text-fill-color:var(--comfier-ui-font,#fff)!important;border-color:var(--comfier-panel-frame,#aaa)!important}
html body #comfier-apps-panel :is(.comfier-lite-form,.comfier-lite-manager) :is(label,legend,span,p,h3,strong){color:var(--comfier-ui-font,#fff)!important;-webkit-text-fill-color:var(--comfier-ui-font,#fff)!important}
html body #comfier-apps-panel .comfier-lite-manage{width:100%;min-height:48px;font:500 20px system-ui,sans-serif!important;text-align:center!important;justify-content:center!important}
.comfier-lite-manager{display:flex;flex-direction:column;height:100%;min-height:0;padding:12px;gap:12px;box-sizing:border-box;width:100%}
.comfier-lite-manager header{display:flex;align-items:center;justify-content:space-between;gap:8px;flex:none}.comfier-lite-manager header strong{font-size:18px}
.comfier-lite-manager button{font:500 14px system-ui,sans-serif;min-height:40px;border:1px solid #aaa;border-radius:6px;padding:8px;background:white;color:#111;box-sizing:border-box}
.comfier-lite-node-list{flex:1;min-height:0;overflow:auto;overscroll-behavior:contain;touch-action:pan-y;display:flex;flex-direction:column;gap:8px}.comfier-lite-node-list>*{flex-shrink:0}
.comfier-lite-node-row{display:flex;align-items:center;gap:8px;min-width:0;padding:4px;border-radius:6px;border:1px solid var(--comfier-panel-frame,#555);min-height:44px;box-sizing:border-box}
.comfier-lite-node-label{flex:1;min-width:0;overflow-wrap:anywhere;text-align:left!important}.comfier-lite-node-action,.comfier-lite-drag-handle{flex:none;min-width:40px}.comfier-lite-drag-handle{touch-action:none;cursor:grab}.comfier-lite-node-row.dragging{opacity:.55}.comfier-lite-node-row.drop-before{border-top:3px solid var(--comfier-ui-font,#fff)}.comfier-lite-node-row.drop-after{border-bottom:3px solid var(--comfier-ui-font,#fff)}
.comfier-lite-selected-group{display:flex;flex-direction:column;gap:6px}.comfier-lite-node-row.group-heading{font-weight:600}.comfier-lite-node-row.available-field{margin-left:16px}.comfier-lite-node-action:disabled{opacity:.4}


html:root body #comfier-apps-panel#comfier-apps-panel :is(.comfier-lite-form,.comfier-lite-manager) button{font-family:system-ui,sans-serif!important;font-size:20px!important;font-weight:500!important;line-height:1.3!important;text-align:center!important;justify-content:center!important;background:transparent!important;background-image:none!important;color:var(--comfier-ui-font,#fff)!important;-webkit-text-fill-color:var(--comfier-ui-font,#fff)!important;border:1px solid var(--comfier-button-frame,#aaa)!important;border-radius:6px!important;box-shadow:none!important}
html:root body #comfier-apps-panel#comfier-apps-panel .comfier-lite-form button:is(.comfier-lite-generate,.comfier-lite-canvas){font-size:25px!important}
html:root body #comfier-apps-panel#comfier-apps-panel :is(.comfier-lite-form,.comfier-lite-manager) button :is(span,i,svg){color:inherit!important;-webkit-text-fill-color:inherit!important}

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
function friendly(binding){const c=binding.control,display=binding.sourceNode||binding.node;let name=String(c.name).replace(/_/g,' ');if(kind(c)==='prompt'&&(!c.multiline||/^(text|text_g|text_l|positive|negative|prompt|user_prompt)$/.test(c.name)))name=promptRole(c)==='negative'?'Negative prompt':'Prompt';if(/^(seed|noise_seed|random_seed)$/.test(c.name))name='Seed';if(c.name==='control_after_generate')name='Seed mode';return name+' · '+(display.title||c.nodeType)}
function fitPrompt(input,baseline){if(!input.isConnected)return;const c=getComputedStyle(input),line=parseFloat(c.lineHeight)||18,padding=parseFloat(c.paddingTop)+parseFloat(c.paddingBottom),border=parseFloat(c.borderTopWidth)+parseFloat(c.borderBottomWidth);const minimum=line+padding+border;input.style.minHeight=minimum+'px';if(input.dataset.manualHeight){const chosen=Number(input.dataset.manualHeight);input.style.height='0px';const content=input.scrollHeight+border;input.style.height=Math.max(chosen,content)+'px'}else{input.style.height='0px';input.style.height=Math.max(baseline*line+padding+border,input.scrollHeight+border)+'px'}input.dataset.fitHeight=input.getBoundingClientRect().height}
function autoPrompt(input,role){const baseline=role==='positive'?5:1;input.rows=baseline;input.dataset.promptRole=role;const fit=()=>fitPrompt(input,baseline);input.addEventListener('input',fit);input.addEventListener('pointerup',()=>{if(Math.abs(input.getBoundingClientRect().height-Number(input.dataset.fitHeight||0))>2){input.dataset.manualHeight=input.getBoundingClientRect().height;input.dataset.fitHeight=input.dataset.manualHeight}});const observer=new ResizeObserver(()=>{const width=input.getBoundingClientRect().width;if(input.dataset.fitWidth!==String(width)){input.dataset.fitWidth=String(width);fit()}});observer.observe(input);active?.promptObservers?.push(observer);requestAnimationFrame(fit)}
async function field(binding,category,form,status,valid){
 const {widget}=binding,label=el('label'),caption=el('span',friendly(binding));label.append(caption);
 let input;
 const opts=await values(widget);if(!valid())return;
 if(category==='prompt'){input=el('textarea');input.value=String(widget.value??'')}
 else if(Array.isArray(opts)&&opts.length){input=el('select');for(const option of opts){const o=el('option',String(option));o.value=String(option);input.append(o)}if(!opts.map(String).includes(String(widget.value))){const o=el('option',String(widget.value??''));o.value=String(widget.value??'');input.append(o)}input.value=String(widget.value??'')}
 else if(typeof widget.value==='boolean'){input=el('input');input.type='checkbox';input.checked=widget.value}
 else{input=el('input');const numeric=typeof widget.value==='number';input.type=numeric?'number':'text';input.value=String(widget.value??'');if(numeric){input.step=Number.isFinite(widget.options?.step2)?String(widget.options.step2):Number.isFinite(widget.options?.step)?String(widget.options.step/10):Number.isInteger(widget.value)?'1':'any';if(Number.isFinite(widget.options?.min))input.min=widget.options.min;if(Number.isFinite(widget.options?.max))input.max=Math.min(widget.options.max,Number.MAX_SAFE_INTEGER)}}
 input.dataset.controlKey=binding.control.key;input.setAttribute('aria-label',friendly(binding));
 const update=event=>{const numeric=typeof widget.value==='number',v=typeof widget.value==='boolean'?(input.type==='checkbox'?input.checked:input.value==='true'):numeric?Number(input.value):input.value;if(numeric&&(input.value===''||!Number.isFinite(v)||!input.checkValidity())){status.textContent='Enter a valid '+widget.name;return}try{markChanged(binding,v,event);status.textContent=''}catch(e){status.textContent=e.message}};
 input.addEventListener(category==='prompt'?'input':'change',update);label.append(input);
 if(category==='seed'&&typeof widget.value==='number')label.append(button('New seed',()=>{const max=Math.min(widget.options?.max??Number.MAX_SAFE_INTEGER,Number.MAX_SAFE_INTEGER),min=Math.max(0,widget.options?.min??0);const random=new Uint32Array(2);crypto.getRandomValues(random);const value=Math.floor(min+((random[0]*2097152+(random[1]>>>11))/9007199254740992)*(max-min));input.value=String(value);update(new Event('change'))}));
 if(category==='file'){
  const upload=el('input');upload.type='file';const hint=(binding.control.name+' '+binding.control.nodeType).toLowerCase();upload.accept=/audio/.test(hint)?'audio/*':/video/.test(hint)?'video/*':'image/*,video/*,audio/*';upload.setAttribute('aria-label','Upload '+friendly(binding));
  upload.addEventListener('change',async()=>{const file=upload.files?.[0];if(!file)return;upload.disabled=true;status.textContent='Uploading '+file.name+'…';try{const data=new FormData();data.append('image',file);data.append('type','input');const response=await getApi().fetchApi('/upload/image',{method:'POST',body:data});if(!response.ok)throw Error('Upload failed ('+response.status+')');const result=await response.json();if(!valid())return;const name=(result.subfolder?result.subfolder+'/':'')+result.name;if(Array.isArray(widget.options?.values)&&!widget.options.values.includes(name))widget.options.values.push(name);if(input.tagName==='SELECT'&&![...input.options].some(o=>o.value===name)){const o=el('option',name);o.value=name;input.append(o)}input.value=name;update(new Event('change'));status.textContent='Uploaded '+file.name}catch(e){if(valid())status.textContent=e.message}finally{upload.disabled=false}});label.append(upload);
 }
 form.append(label);if(category==='prompt')autoPrompt(input,promptRole(binding.control));
}
function clearPromptObservers(){for(const observer of active?.promptObservers||[])observer.disconnect();if(active)active.promptObservers=[]}
function clearMedia(){if(previewUrl){URL.revokeObjectURL(previewUrl);previewUrl=null}}
function fullCanvas(){closeManager(active,false);document.documentElement.classList.remove('comfier-lite-active');clearPromptObservers();active=null;clearMedia();window.__comfierAppsPanel?.closeIfOpen?.();const stores=window.__comfierUi?.pinia?.()?._s;stores?.get('appMode')?.exitBuilder?.();const canvas=stores?.get('canvas');if(canvas)canvas.linearMode=false;}
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
 for(const c of s.controls)if(c.multiline&&editable(c)&&!plan.controls.some(p=>p.key===c.key))plan.controls.push({key:c.key,kind:'prompt'});
 if(stopped||seq!==requestId)return false;
 // Keep the manual manager available even when automatic curation finds no inputs.
 closeManager(active,false);clearPromptObservers();clearMedia();const state={...s,plan,seq,media:[],seedInputs:[],promptObservers:[]};state.groups=initialGroups(state);active=state;
 window.__comfierTemplatesSidebar?.closeIfOpen?.();
 const owner=window.__comfierAppsPanel;if(!owner?.openLite){active=null;return false}
 owner.openLite(container=>render(state,container));return true;
}
const GROUP_TITLES={resolution:'Resolution',prompt:'Prompts',file:'Input files',other:'Additional inputs'};
function editable(c){return !c.connected&&!c.readOnly&&!c.disabled&&!/note|markdown/i.test(c.nodeType)}
function manualKind(c){return kind(c)||(c.multiline?'prompt':'other')}
function initialGroups(state){
 const saved=state.root.extra?.comfierAppMode;
 const seen=new Set();
 if(saved?.schemaVersion===1&&Array.isArray(saved.groups)){const groups=saved.groups.map(g=>({id:String(g.id),title:String(g.title||'Inputs'),controls:(Array.isArray(g.controls)?g.controls:[]).filter(key=>state.bindings.has(key)&&editable(state.bindings.get(key).control)&&!seen.has(key)&&seen.add(key)).map(key=>({key,kind:manualKind(state.bindings.get(key).control)}))}));
 const known=new Set(saved.knownControls||state.controls.map(c=>c.key));for(const c of state.controls)if(c.multiline&&editable(c)&&!known.has(c.key)&&!seen.has(c.key)){let group=groups.find(g=>g.id==='prompt');if(!group){group={id:'prompt',title:GROUP_TITLES.prompt,controls:[]};groups.push(group)}group.controls.push({key:c.key,kind:'prompt'})}return groups;}
 return ['resolution','prompt','file','other'].map(id=>({id,title:GROUP_TITLES[id],controls:state.plan.controls.filter(p=>state.bindings.has(p.key)&&p.kind!=='seed'&&(p.kind in GROUP_TITLES?p.kind:'other')===id).sort((a,b)=>id==='prompt'?Number(promptRole(state.bindings.get(a.key).control)==='negative')-Number(promptRole(state.bindings.get(b.key).control)==='negative'):0)}));
}
function saveGroups(state){state.root.extra=state.root.extra||{};state.root.extra.comfierAppMode={schemaVersion:1,knownControls:state.controls.map(c=>c.key),groups:state.groups.map(g=>({id:g.id,title:g.title,controls:g.controls.map(p=>p.key)}))};state.root.change?.();}
async function renderControls(state){
 const host=state.controlsHost;if(!host)return;const epoch=state.fieldEpoch=(state.fieldEpoch||0)+1;clearPromptObservers();host.replaceChildren();
 const valid=()=>active===state&&state.form.isConnected&&epoch===state.fieldEpoch;
 for(const g of state.groups){if(!g.controls.length)continue;const group=el('fieldset');group.dataset.groupId=g.id;group.append(el('legend',g.title));host.append(group);
  for(const pick of g.controls){if(!valid())return;const binding=state.bindings.get(pick.key);if(!binding)continue;try{await field(binding,pick.kind,group,state.status,valid)}catch(e){state.status.textContent='Some controls need Full Canvas: '+e.message}}
  // Keep adjacent width/height controls paired without overriding the user's field ordering.
  if(g.id==='resolution')pairResolution(group,state);
 }
}
function closeManager(state=active,returnToForm=true){if(!state?.manager)return false;state.dragCleanup?.();state.managerBack?.();state.managerBack=null;state.manager.remove();state.manager=null;state.form.hidden=false;if(returnToForm)renderControls(state);return true}
function openManager(state){
 if(active!==state||state.manager)return;
 const fresh=snapshot();state.controls=fresh.controls;state.nodes=fresh.nodes;state.bindings=fresh.bindings;
 for(const group of state.groups)group.controls=group.controls.filter(p=>state.bindings.has(p.key)&&editable(state.bindings.get(p.key).control));
 const panel=el('section');panel.className='comfier-lite-manager';panel.setAttribute('aria-label','Manage Selected Nodes');
 const header=el('header');header.append(el('strong','Manage Selected Nodes'),button('Back',()=>closeManager(state)));const list=el('div');list.className='comfier-lite-node-list';panel.append(header,list);state.form.hidden=true;state.form.parentElement.append(panel);state.manager=panel;
 state.managerBack=window.__comfierBack?.register('app-mode-manage-nodes',110,()=>closeManager(state));
 function update(){saveGroups(state);draw()}
 function add(picks){let group=state.groups.find(g=>g.id==='other');if(!group){group={id:'other',title:GROUP_TITLES.other,controls:[]};state.groups.push(group)}const selected=new Set(state.groups.flatMap(g=>g.controls.map(p=>p.key)));for(const c of picks)if(editable(c)&&!selected.has(c.key)){group.controls.push({key:c.key,kind:manualKind(c)});selected.add(c.key)}update()}
 function row(label,action,sign,description){const r=el('div');r.className='comfier-lite-node-row';const text=el('span',label);text.className='comfier-lite-node-label';const b=button(sign,action);b.className='comfier-lite-node-action';b.setAttribute('aria-label',description);r.append(text,b);return r}
 function handle(row,group,key){const b=button('☰',()=>{});b.className='comfier-lite-drag-handle';b.setAttribute('aria-label','Reorder '+(key?friendly(state.bindings.get(key)):group.title));b.setAttribute('aria-description','Drag to reorder, or use the up and down arrow keys.');row.prepend(b);
  b.addEventListener('keydown',e=>{if(!['ArrowUp','ArrowDown'].includes(e.key))return;e.preventDefault();const array=key?group.controls:state.groups,index=array.findIndex(p=>key?p.key===key:p===group),next=index+(e.key==='ArrowUp'?-1:1);if(next<0||next>=array.length)return;[array[index],array[next]]=[array[next],array[index]];update()});
  b.addEventListener('pointerdown',e=>{
   if(e.button!==0)return;e.preventDefault();e.stopPropagation();b.setPointerCapture(e.pointerId);let target=null,after=false,scrollFrame=0,lastPoint=null;row.classList.add('dragging');
   function move(event){lastPoint={clientX:event.clientX,clientY:event.clientY};
    panel.querySelectorAll('.drop-before,.drop-after').forEach(r=>r.classList.remove('drop-before','drop-after'));
    const found=document.elementFromPoint(event.clientX,event.clientY)?.closest(key?'[data-selected-key],[data-selected-group]':'[data-selected-group]');target=found&&list.contains(found)&&found!==row?found:null;if(target){const r=target.getBoundingClientRect();after=event.clientY>(r.top+r.height/2);target.classList.add(after?'drop-after':'drop-before')}
   }
   function scroll(){if(lastPoint){const rect=list.getBoundingClientRect();if(lastPoint.clientY<rect.top+45){list.scrollTop-=10;move(lastPoint)}else if(lastPoint.clientY>rect.bottom-45){list.scrollTop+=10;move(lastPoint)}}scrollFrame=requestAnimationFrame(scroll)}
   scrollFrame=requestAnimationFrame(scroll);
   function cleanup(){cancelAnimationFrame(scrollFrame);row.classList.remove('dragging');panel.querySelectorAll('.drop-before,.drop-after').forEach(r=>r.classList.remove('drop-before','drop-after'));b.removeEventListener('pointermove',move);b.removeEventListener('pointerup',finish);b.removeEventListener('pointercancel',cancel);if(b.hasPointerCapture(e.pointerId))b.releasePointerCapture(e.pointerId);state.dragCleanup=null}
   function cancel(){cleanup()}
   function finish(){const destination=target;cleanup();if(!destination)return;
    if(key){const from=group.controls.findIndex(p=>p.key===key);if(from<0)return;const dest=state.groups.find(g=>g.id===(destination.dataset.selectedGroup||destination.closest('[data-group-block]')?.dataset.groupBlock));if(!dest)return;const pick=group.controls.splice(from,1)[0],at=destination.dataset.selectedKey?dest.controls.findIndex(p=>p.key===destination.dataset.selectedKey)+(after?1:0):(after?dest.controls.length:0);dest.controls.splice(Math.max(0,at),0,pick)}
    else{const dest=state.groups.find(g=>g.id===destination.dataset.selectedGroup);if(!dest||dest===group)return;state.groups.splice(state.groups.indexOf(group),1);state.groups.splice(state.groups.indexOf(dest)+(after?1:0),0,group)}update();
   }
   state.dragCleanup=cleanup;b.addEventListener('pointermove',move);b.addEventListener('pointerup',finish);b.addEventListener('pointercancel',cancel);
  });
 }
 function draw(){list.replaceChildren();list.append(el('h3','Displayed fields'));const selected=new Set(state.groups.flatMap(g=>g.controls.map(p=>p.key)));
  for(const group of state.groups){const block=el('section');block.className='comfier-lite-selected-group';block.dataset.groupBlock=group.id;const title=row(group.title,()=>{group.controls=[];update()},'−','Hide '+group.title+' group');title.dataset.selectedGroup=group.id;title.classList.add('group-heading');handle(title,group);block.append(title);
   for(const pick of group.controls){const binding=state.bindings.get(pick.key);if(!binding)continue;const r=row(friendly(binding),()=>{group.controls=group.controls.filter(p=>p.key!==pick.key);update()},'−','Hide '+friendly(binding));r.dataset.selectedKey=pick.key;handle(r,group,pick.key);block.append(r)}list.append(block)
  }
  list.append(el('h3','Workflow nodes'));const nodes=[...state.nodes].sort((a,b)=>a.title.localeCompare(b.title,undefined,{sensitivity:'base'})||a.key.localeCompare(b.key));
  for(const node of nodes){const controls=state.controls.filter(c=>c.nodeKey===node.key),available=controls.filter(c=>editable(c)&&!selected.has(c.key));const heading=row(node.title,()=>add(available),'+','Show inputs from '+node.title);heading.classList.add('group-heading');heading.querySelector('button').disabled=!available.length;list.append(heading);
   for(const c of controls.filter(c=>!selected.has(c.key))){const r=row(String(c.name).replace(/_/g,' '),()=>add([c]),'+','Show '+c.name+' · '+node.title);r.classList.add('available-field');const b=r.querySelector('button');b.disabled=!editable(c);if(!editable(c))r.querySelector('span').textContent+=' (connected or unavailable)';list.append(r)}
  }
 }
 draw();
}

function pairResolution(group,state){
 const labels=[...group.querySelectorAll(':scope > label')],done=new Set();
 for(const label of labels){if(done.has(label))continue;const input=label.querySelector('[data-control-key]'),binding=state.bindings.get(input?.dataset.controlKey);if(!binding||binding.control.name!=='width')continue;
 const other=labels[labels.indexOf(label)+1],c=other&&state.bindings.get(other.querySelector('[data-control-key]')?.dataset.controlKey);if(!c||c.control.name!=='height'||c.node!==binding.node||c.sourceNode!==binding.sourceNode)continue;
 const height=other.querySelector('[data-control-key]'),block=el('div'),heading=el('div',(binding.sourceNode||binding.node).title||binding.control.nodeType),row=el('div');block.className='comfier-lite-resolution';heading.className='comfier-lite-resolution-title';row.className='comfier-lite-resolution-row';label.replaceWith(block);other.remove();row.append(el('span','Width'),input,el('span','X'),height,el('span','Height'));block.append(heading,row);done.add(label);done.add(other);
 }
}
async function render(state,container){
 closeManager(state,false);
 document.documentElement.classList.add('comfier-lite-active');state.media=[];clearMedia();const form=el('section');form.className='comfier-lite-form';form.dataset.processor=state.plan.processor||'client';const fields=el('div');fields.className='comfier-lite-fields';const footer=el('footer');footer.className='comfier-lite-footer';form.append(fields,footer);const status=el('p');status.setAttribute('role','status');const canvasButton=button('Full Canvas',fullCanvas);canvasButton.className='comfier-lite-canvas';fields.append(canvasButton,status);container.append(form);
 const valid=()=>active===state&&form.isConnected;
 const controlsHost=el('div');controlsHost.className='comfier-lite-control-groups';fields.append(controlsHost);state.controlsHost=controlsHost;state.form=form;state.status=status;await renderControls(state);if(!valid())return;
 const run=button('Generate',async()=>{run.disabled=true;status.textContent='Queuing…';try{const action=window.__comfierActionbarOwner;if(action?.findCommand?.(['Comfy.QueuePrompt']))await action.executeCommand(['Comfy.QueuePrompt'],{metadata:{subscribe_to_run:false,trigger_source:'button'}});else await getApp().queuePrompt(0,1);if(valid()){status.textContent='Queued';refreshSeeds(state,form)}}catch(e){if(valid())status.textContent=e.message}finally{run.disabled=false}});run.className='comfier-lite-generate';footer.append(run);
 const progress=el('p','Ready');progress.setAttribute('role','status');const preview=el('img');preview.alt='Generation in progress';preview.hidden=true;const output=el('div');output.className='comfier-lite-output';output.hidden=true;const previewGroup=el('section');previewGroup.className='comfier-lite-preview';previewGroup.hidden=true;previewGroup.append(el('h3','Live preview'),progress,preview);fields.prepend(output);const manage=button('Manage Selected Nodes',()=>openManager(state));manage.className='comfier-lite-manage';fields.append(manage,previewGroup);
 state.form=form;state.progress=progress;state.preview=preview;state.previewGroup=previewGroup;state.output=output;
 restoreOutput(state);bindApi();
}
function refreshSeeds(state,form){for(const control of state.groups.flatMap(g=>g.controls).filter(c=>c.kind==='seed')){const binding=state.bindings.get(control.key);const input=[...form.querySelectorAll('[data-control-key]')].find(i=>i.dataset.controlKey===control.key);if(binding&&input)input.value=String(binding.widget.value??'')}}
function mediaUrl(file){if(!file||typeof file.filename!=='string')return null;const q=new URLSearchParams({filename:file.filename,type:file.type||'output',subfolder:file.subfolder||''});return(getApi()?.apiURL?.('/view')||'/view')+'?'+q}
function showOutput(state,result){
 if(active!==state||!state.output)return;
 for(const [category,files]of Object.entries(result||{})){
  if(!Array.isArray(files))continue;
  for(const file of files){if(typeof file==='string'||typeof file==='number'){const key=category+':'+String(file);if(!state.media.includes(key)){state.media.push(key);state.output.append(el('pre',String(file)))}continue}const url=mediaUrl(file);if(!url||state.media.includes(url))continue;state.media.push(url);const ext=file.filename.split('.').pop().toLowerCase();let view;if(/^(mp4|webm|mov|mkv|gif)$/.test(ext)&&ext!=='gif'){view=el('video');view.controls=true}else if(/^(mp3|wav|flac|ogg|m4a|aac)$/.test(ext)){view=el('audio');view.controls=true}else if(/^(png|jpg|jpeg|webp|gif|avif|bmp)$/.test(ext)){view=el('img');view.alt=file.filename}if(view){view.src=url;state.output.append(view)}const link=el('a',file.filename);link.href=url;link.target='_blank';link.rel='noopener';state.output.append(link)}
 }
 state.output.hidden=!state.output.childElementCount;
}
function restoreOutput(state){for(const key of state.plan.outputs){const node=state.outputBindings.get(key),out=getApp()?.nodeOutputs?.[node?.id];if(out)showOutput(state,out)}}
function bindApi(){
 const api=getApi();if(!api?.addEventListener||apiBound===api)return;
 for(const [a,name,fn]of listeners)a.removeEventListener(name,fn);listeners.length=0;apiBound=api;
 const bind=(name,fn)=>{api.addEventListener(name,fn);listeners.push([api,name,fn])};
 bind('execution_start',()=>{if(active?.output){active.media=[];active.output.replaceChildren();active.output.hidden=true;active.preview.hidden=true;active.previewGroup.hidden=true;clearMedia();active.progress.textContent='Generating…';refreshSeeds(active,active.form)}});
 bind('progress',e=>{if(active?.progress){const d=e.detail||{};active.progress.textContent=d.max?'Generating '+Math.round(d.value/d.max*100)+'%':'Generating…'}});
 bind('b_preview',e=>{if(active?.preview&&e.detail instanceof Blob){clearMedia();previewUrl=URL.createObjectURL(e.detail);active.preview.src=previewUrl;active.preview.hidden=false;active.previewGroup.hidden=false}});
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
// Install with the shared workflow UI rather than relying on gateway setup order.
jobs.listen(window,'contextmenu',event=>{
 if(window.ComfyRemoteDownloads||/Android|iPhone|iPad|iPod/i.test(navigator.userAgent))return;
 const path=event.composedPath();
 if(path.some(element=>element?.matches?.('input,textarea,select,[contenteditable="true"]')))return;
 // Windows may target the newly opened menu on mouse-up when it is shifted upward to fit the lower viewport.
 if(path.some(element=>element?.matches?.('.litecontextmenu,.p-contextmenu'))){event.preventDefault();return;}
 const canvas=getApp()?.canvas?.canvas;
 if(path.some(element=>element===canvas||element?.matches?.('#graph-canvas,#graph-canvas-container,canvas.lgraphcanvas,[data-testid="graph-canvas"],[data-testid="transform-pane"]')))event.preventDefault();
},true);

jobs.listen(window,'comfier-app-view-closed',()=>{closeManager(active,false);clearPromptObservers();document.documentElement.classList.remove('comfier-lite-active');active=null;clearMedia()});
jobs.observe(document.body,{subtree:true,childList:true},()=>jobs.frame('settings',settings));
jobs.burst('install',()=>{install();settings()},[0,80,300,1000,2500,5000]);
const unsubscribeReady=window.__comfierDocument?.subscribe?.('workflow-apps-runtime','app',install);
const unsubscribeSettings=window.__comfierDocument?.subscribe?.('workflow-apps-settings','settingsHost',settings);
const unsubscribeCompanion=window.__comfierDocument?.companion?.subscribe?.('workflow-apps',state=>{window.__comfierDetectedCompanion=state.info;install()});
window.__comfierWorkflowApps={openCurrent,fullCanvas,curate,kind,snapshot,preference,setPreference,install,remove(){stopped=true;++requestId;dialogClose?.(null);fullCanvas();jobs.dispose();unsubscribeCompanion?.();unsubscribeReady?.();unsubscribeSettings?.();for(const p of patches)if(p.object[p.name]===p.wrapper)p.object[p.name]=p.original;for(const[a,n,f]of listeners)a.removeEventListener(n,f);style.remove();document.querySelector('.comfier-workflow-mode-row')?.remove();delete window.__comfierWorkflowApps}};
install();settings();
})();
