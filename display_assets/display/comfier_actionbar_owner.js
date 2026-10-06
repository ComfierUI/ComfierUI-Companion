(function(){
'use strict';
if(window.__comfierActionbarOwner)return;
const runtime=window.__comfierRuntime,jobs=runtime.scope('actionbar-owner');
const meterCells=new Map(),feedImages=new Set(),nativeMeterHomes=new Map();
const controls=new Map(),catalog=new Map(),retired=new Map(),subscriptions=new Map();
const nativeGraceMs=3000;
let runLifecycle=null,resolvedRunLifecycle=null,lastRunReady=false;
let resourceTimer=0,resourceAbort=null,resourceInFlight=false,resourceEpoch=0,resourceFailures=0,resourceEndpoint='unknown',resourceWake=false,settingsRegistered=false;
let feedPanel=null,feedRoot=null,feedOpen=false,feedPreview=null,appNav=null,appNavStyle=null;
let receivedStatus=false,lastTelemetryAt=0,telemetrySamples=0,api=null,apiLoading=false,popup=null,queueRemaining=0,busy=false,mode='normal',stopped=false,catalogDirty=true;
const own='[data-comfier-owned-actionbar]',sourceSelector='[data-testid="action-bar-card"],.actionbar-container,.actionbar:has([data-testid="queue-button"]),[data-testid="linear-run-button"]';
const norm=s=>String(s||'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
const specs=[
 {key:'unload',label:'Unload Models',match:/^unload models$/,icon:'icon-[lucide--vacuum]'},
 {key:'unload-cache',label:'Unload Models and Execution Cache',match:/^unload models and execution cache$/,icon:'icon-[lucide--vacuum]'},
 {key:'feed',label:'Show Image Feed',match:/^(show|hide) image feed/,icon:'icon-[lucide--image]'},
 {key:'lora',label:'Launch LoRA Manager',match:/^launch lora manager/,icon:'icon-[lucide--square]'},
 {key:'overview',label:'Toggle properties panel',match:/^(toggle properties panel|workflow overview|toggle workflow overview)$/,icon:'icon-[lucide--panel-right]'}
];
function element(tag,attrs={}){const el=document.createElement(tag);for(const[k,v]of Object.entries(attrs))el.setAttribute(k,v);return el}
const action=element('section',{id:'comfier-owned-actionbar','data-testid':'action-bar-card','data-comfier-owned-actionbar':'action','aria-label':'Actionbar'});
const row=element('div',{class:'actionbar-container'}),buttons=element('div',{'data-testid':'action-bar-buttons',class:'comfier-owned-actions'});
const monitors=element('div',{'aria-label':'Host resource monitors',id:'comfier-owned-monitors','data-comfier-owned-widget':'monitors'});
row.append(buttons,monitors);action.append(row);
const run=element('section',{id:'comfier-owned-runbar',class:'comfier-early-queue-dock','data-comfier-owned-actionbar':'run','aria-label':'Run bar'});
const runRow=element('div',{class:'actionbar comfier-early-queue-panel queue-button-group'});run.append(runRow);
const count=element('input',{type:'number',min:'1',max:'9999',step:'1','aria-label':'Batch count',class:'comfier-owned-batch'});count.setAttribute('data-comfier-square-control','');count.value='1';
runRow.append(count);
function createButton(key,label,testid,handler){
 const b=element('button',{type:'button','aria-label':label,class:'comfier-owned-button'});if(testid)b.setAttribute('data-testid',testid);if(!['run','history'].includes(key))b.setAttribute('data-comfier-square-control','');
 b.addEventListener('click',event=>{event.preventDefault();event.stopPropagation();if(!b.disabled)Promise.resolve().then(()=>handler(b,event)).catch(report)});
 controls.set(key,b);return b;
}
function runIcon(button,kind){
 const paths={up:'m6 15 6-6 6 6',down:'m6 9 6 6 6-6',x:'M18 6 6 18M6 6l12 12'};
 const svg=document.createElementNS('http://www.w3.org/2000/svg','svg'),path=document.createElementNS('http://www.w3.org/2000/svg','path');
 for(const[k,v]of Object.entries({class:'comfier-owned-run-icon',viewBox:'0 0 24 24','aria-hidden':'true',focusable:'false'}))svg.setAttribute(k,v);
 path.setAttribute('d',paths[kind]);svg.append(path);button.replaceChildren(svg);
}
const runButton=createButton('run','Run','queue-button',()=>queue(mode));runButton.setAttribute('data-variant','primary');runButton.textContent='';runButton.classList.add('comfier-owned-run');
const options=createButton('options','Run options','queue-mode-menu-trigger',()=>openOptions());runIcon(options,'down');
const interrupt=createButton('interrupt','Interrupt',null,()=>backend('/interrupt'));runIcon(interrupt,'x');
const history=createButton('history','View Job History',null,()=>openHistory());history.classList.add('comfier-owned-active');history.textContent='0 active';
runRow.append(runButton,options,interrupt,history);
count.addEventListener('change',()=>{count.value=String(batch());const s=queueSettings();if(s&&'batchCount'in s)s.batchCount=batch()});

const style=element('style',{id:'comfier-actionbar-owner-style'});style.textContent=`
[data-testid="linear-run-button"],[data-comfier-actionbar-retired],html body button.lm-top-menu-button:not([data-comfier-action="lora"]),html body button[aria-label^="Launch LoRA Manager"]:not([data-comfier-action="lora"]){display:none!important;visibility:hidden!important;pointer-events:none!important}
html body [data-comfier-owned-actionbar]{display:flex;position:fixed;align-items:center;gap:8px;box-sizing:border-box;width:max-content;max-width:calc(100vw - 8px);margin:0;padding:8px;border:1px solid var(--comfier-container-frame,var(--interface-stroke,#3b4554));border-radius:10px;background:var(--comfier-container-paint,var(--comfy-menu-bg,#171717));z-index:var(--comfier-z-workspace,200);overflow:visible;pointer-events:auto}
html body [data-comfier-owned-actionbar] .actionbar-container,html body [data-comfier-owned-actionbar] .comfier-owned-actions,html body [data-comfier-owned-actionbar] .queue-button-group{display:flex;align-items:center;gap:4px;flex-wrap:nowrap;position:static;margin:0;padding:0;border:0;background:transparent;transform:none;zoom:1}
html body #comfier-owned-actionbar .comfier-owned-actions>*{order:0!important}
html body [data-comfier-owned-actionbar] .actionbar-container{gap:8px;flex-wrap:wrap;justify-content:flex-end}
html body [data-comfier-owned-actionbar] .comfier-owned-button,html body [data-comfier-owned-actionbar] .comfier-owned-batch{display:inline-flex;align-items:center;justify-content:center;box-sizing:border-box;width:auto;min-width:${window.__comfierUiAuthority.minimums.squareWidth}px;height:auto;min-height:${window.__comfierUiAuthority.minimums.buttonHeight}px;padding:0;margin:0;border:1px solid var(--comfier-button-frame,var(--interface-stroke,#3b4554));border-radius:7px;background:var(--comfier-button-paint,var(--comfy-input-bg,#242427));color:var(--comfier-icon-color,var(--comfier-accent,#fff));font:inherit;touch-action:manipulation;flex:none;pointer-events:auto}
html body [data-comfier-owned-actionbar] .comfier-owned-button *,html body [data-comfier-owned-actionbar] .comfier-owned-button::before,html body [data-comfier-owned-actionbar] .comfier-owned-button::after{pointer-events:none}
html body [data-comfier-owned-actionbar] .comfier-owned-button i,html body [data-comfier-owned-actionbar] .comfier-owned-button svg{width:20px;height:20px;flex:none}
html body [data-comfier-owned-actionbar] .comfier-owned-button .comfier-owned-run-icon{display:block;width:20px;height:20px;flex:none;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}
html body [data-comfier-owned-actionbar] .comfier-owned-run{width:auto;min-width:102px;font-size:22px;font-weight:700}
html body [data-comfier-owned-actionbar] .comfier-owned-active{width:auto;min-width:80px;padding:0 8px;color:var(--comfier-ui-font,#fff)}
html body [data-comfier-owned-actionbar] [data-comfier-square-control]{width:var(--comfier-control-width,32px);height:var(--comfier-control-height,32px)}
html body [data-comfier-owned-actionbar] .comfier-owned-batch{text-align:center;color:var(--comfier-ui-font,#fff);appearance:textfield}
html body [data-comfier-owned-actionbar] .comfier-owned-batch::-webkit-inner-spin-button{display:none}
html body [data-comfier-owned-actionbar] .comfier-owned-button:disabled{opacity:.45}
html body [data-comfier-owned-actionbar],html body [data-comfier-owned-actionbar] *{animation:none!important;transition:none!important}
html.comfier-layout-right body #comfier-owned-actionbar .comfier-owned-actions{flex-direction:row-reverse}
html.comfier-early-floating-panels body [data-testid="properties-panel"] button[aria-label="Toggle properties panel"]{display:none!important;visibility:hidden!important;pointer-events:none!important}
#comfier-owned-feed-panel{position:fixed;display:none;left:var(--cef-right,4px);top:var(--cef-right-top,var(--cef-top,80px));width:var(--cef-width,min(560px,calc(100vw - 8px)));height:var(--cef-right-height,var(--cef-height,calc(100dvh - 180px)));z-index:var(--comfier-feed-z,var(--comfier-z-side,500));background:var(--comfy-menu-bg,#171717);border:1px solid var(--interface-stroke,#3b4554);border-radius:8px;overflow:auto;pointer-events:auto}
html.comfier-layout-right #comfier-owned-feed-panel{left:auto;right:var(--cef-left,4px)}
#comfier-owned-feed-panel[data-open]{display:flex!important;flex-direction:column}
#comfier-owned-feed-panel>.comfier-owned-feed-content{position:relative!important;visibility:visible!important;opacity:1!important;pointer-events:auto!important;transform:none!important;inset:auto!important;width:100%!important;max-width:100%!important;height:auto!important;max-height:100%!important;margin:0!important;flex:1;min-height:0;display:grid!important}
#comfier-owned-monitors{display:flex;align-items:center;gap:4px;pointer-events:none}
#comfier-owned-feed-panel header>span{flex:1;text-align:center}
#comfier-owned-feed-panel header>button[aria-label="Clear Image Feed"]{margin-left:auto}
#comfier-owned-feed-panel header{display:flex;align-items:center;justify-content:space-between;gap:8px;padding:8px;color:var(--comfier-ui-font,#fff)}
#comfier-owned-feed-panel header button{min-width:${window.__comfierUiAuthority.minimums.squareWidth}px;min-height:${window.__comfierUiAuthority.minimums.buttonHeight}px;color:inherit;background:var(--comfy-input-bg,#242427);border:1px solid var(--interface-stroke,#3b4554);border-radius:6px}
#comfier-owned-feed-panel .comfier-feed-images{display:grid;grid-template-columns:minmax(0,1fr);gap:6px;padding:8px;overflow:auto}
#comfier-owned-feed-panel .comfier-feed-images img{width:100%;max-height:180px;object-fit:contain;cursor:pointer}
#comfier-owned-feed-preview{position:fixed;inset:8px;display:flex;align-items:center;justify-content:center;background:#111e;z-index:var(--comfier-z-modal,900);padding:8px}
#comfier-owned-feed-preview img{max-width:100%;max-height:100%;object-fit:contain}
#comfier-owned-monitors{visibility:visible;opacity:1;min-height:30px}

#comfier-owned-monitors .crystools-monitor{position:relative;flex:none;background:var(--comfy-input-bg,#242427)}
#comfier-owned-monitors .crystools-content{display:block!important;position:relative!important;isolation:isolate;width:60px;height:30px;overflow:hidden}
#comfier-owned-monitors .crystools-slider{display:block!important;position:absolute!important;left:0!important;top:0!important;height:100%!important;min-height:1px;opacity:1!important;visibility:visible!important;width:var(--comfier-meter-fill,0%)!important;background:var(--comfier-meter-color)!important;z-index:0}
#comfier-owned-monitors .crystools-text{position:absolute;left:3px;bottom:2px;z-index:1;font-size:10px}
#comfier-owned-monitors .crystools-label{position:relative;text-align:right;font-size:11px;padding-right:2px;color:var(--comfier-ui-font,#fff)}
#comfier-owned-run-options{position:fixed;display:flex;flex-direction:column;padding:8px;gap:4px;z-index:var(--comfier-z-popup,700);border:1px solid var(--interface-stroke,#3b4554);border-radius:8px;background:var(--comfy-menu-bg,#171717);color:var(--comfier-ui-font,#fff);max-width:calc(100vw - 8px)}
#comfier-owned-run-options button{padding:8px 12px;border:0;border-radius:4px;background:var(--comfy-input-bg,#242427);color:inherit;font:inherit;min-height:${window.__comfierUiAuthority.minimums.buttonHeight}px;touch-action:manipulation}
html body #comfier-owned-runbar [data-comfier-running="true"]::before{-webkit-mask-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 52 20'%3E%3Cpath d='M18 2h16v16H18z'/%3E%3C/svg%3E")!important;mask-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 52 20'%3E%3Cpath d='M18 2h16v16H18z'/%3E%3C/svg%3E")!important}

`;
document.head.append(style);document.body.append(action,run);initMeters();
// Controls exist independently of extension chrome mounting or remounting.
for(const spec of specs){const b=createButton(spec.key,spec.label,null,(b,event)=>invoke(spec.key,event));b.setAttribute('data-comfier-action',spec.key);copyIcon(null,b,spec.icon);buttons.append(b)}
window.__comfierUiAuthority?.registerOwned?.('action',action,'actionbar-owner');
window.__comfierUiAuthority?.registerOwned?.('run',run,'actionbar-owner');
function stores(){return window.__comfierUi?.pinia?.()?._s}
function queueSettings(){return stores()?.get('queueSettingsStore')||stores()?.get('queueSettings')||[...(stores()?.values()||[])].find(s=>'batchCount'in s&&'queueMode'in s)}
function queuePolicy(){const store=queueSettings();if(!store)return null;if(['disabled','change','instant-idle','instant-running'].includes(store.mode))return{store,key:'mode',modern:true};if(['disabled','instant','change'].includes(store.queueMode))return{store,key:'queueMode',modern:false};return null}
function chooseMode(value){mode=value;const policy=queuePolicy();if(policy)policy.store[policy.key]=value==='instant'?(policy.modern?'instant-idle':'instant'):value==='change'?'change':'disabled';syncState()}
function commandStore(){return stores()?.get('command')||window.app?.extensionManager?.command}
function definitions(){const s=commandStore(),raw=s?.commands||s?.commandsById||s?.commandMap||s?.registeredCommands;return raw instanceof Map?[...raw].map(([id,c])=>typeof c==='function'?{id,function:c}:{id,...c}):Array.isArray(raw)?raw:Object.entries(raw||{}).map(([id,c])=>typeof c==='function'?{id,function:c}:{id,...c})}
function findCommand(names){const s=commandStore();for(const id of names){const c=s?.getCommand?.(id);if(c)return c}const allowed=new Set(names.map(norm));return definitions().find(c=>allowed.has(norm(c.id))||allowed.has(norm(c.label))||allowed.has(norm(c.name)))}
async function command(names,options){const c=findCommand(names),s=commandStore();if(!c)throw Error('Action is not available: '+names[0]);if(typeof s?.execute==='function')return options?s.execute(c.id,options):s.execute(c.id);if(typeof c.function==='function')return c.function(options?.metadata);throw Error('Action has no functional adapter: '+names[0])}
function report(error){console.warn('COMFIER actionbar: '+error.message);window.ComfyRemoteDownloads?.showDownloadError?.(error.message)}
function bindApi(next){if(!next||next===api)return;for(const[name,fn]of [['status',status],['comfier.resources',monitorData],['executed',feedData],['reconnected',reconnectResources]])api?.removeEventListener?.(name,fn);api=next;reconnectResources();for(const[name,fn]of [['status',status],['comfier.resources',monitorData],['executed',feedData],['reconnected',reconnectResources]])api.addEventListener?.(name,fn)}
function loadApi(){
 const live=window.app?.api;if(live){bindApi(live);return}if(api||apiLoading)return;apiLoading=true;
 import(new URL('scripts/api.js',new URL('./',location.href)).href).then(m=>{bindApi(window.app?.api||m.api);schedule()}).catch(error=>{apiLoading=false;console.warn('COMFIER actionbar API unavailable: '+error.message)});
}
async function backend(path,body){loadApi();if(!api?.fetchApi)throw Error('Backend connection is not ready.');const response=await api.fetchApi(path,{method:'POST',headers:{'Content-Type':'application/json'},...(body===undefined?{}:{body:JSON.stringify(body)})});if(response?.ok===false)throw Error('Backend action failed ('+response.status+').');return response}
function batch(){return Math.max(1,Math.min(9999,Math.trunc(Number(count.value)||1)))}
async function queue(selected){
 const policy=queuePolicy();if(policy?.modern&&policy.store.mode==='instant-running'){policy.store.mode='instant-idle';syncState();return}
 if(busy)return;busy=true;syncState();
 try{if(policy){policy.store.batchCount=batch();if(policy.modern&&selected==='instant')policy.store.mode='instant-running'}if(selected==='selected')await command(['Comfy.QueueSelectedOutputNodes','Queue Selected Output Nodes']);else{const id=selected==='front'?'Comfy.QueuePromptFront':'Comfy.QueuePrompt';if(findCommand([id]))await command([id],{metadata:{subscribe_to_run:false,trigger_source:'button'}});else{if(typeof window.app?.queuePrompt!=='function')throw Error('Workflow is not ready.');await window.app.queuePrompt(selected==='front'?-1:0,batch())}}}
 catch(error){if(policy?.modern&&policy.store.mode==='instant-running')policy.store.mode='instant-idle';throw error}
 finally{busy=false;syncState()}
}
function status(event){const remaining=event?.detail?.exec_info?.queue_remaining;if(remaining!=null&&Number.isFinite(Number(remaining))){receivedStatus=true;queueRemaining=Number(remaining)};syncState()}
function openHistory(){
 const sidebar=window.app?.extensionManager?.sidebarTab||stores()?.get('sidebarTab'),setting=stores()?.get('setting')||window.app?.extensionManager?.setting;
 const v2=setting?.get?.('Comfy.Queue.QPOV2');
 if(v2===true&&typeof sidebar?.toggleSidebarTab==='function')return sidebar.toggleSidebarTab('job-history');
 if(v2===false){if(findCommand(['Comfy.Queue.ToggleOverlay']))return command(['Comfy.Queue.ToggleOverlay']);const queueUI=stores()?.get('queueUIStore');if(typeof queueUI?.toggleOverlay==='function')return queueUI.toggleOverlay()}
 if(typeof sidebar?.toggleSidebarTab==='function')return sidebar.toggleSidebarTab('queue');return command(['Comfy.Queue','Comfy.ToggleQueue','Job History','View Job History']);
}
function closeOptions(){popup?.remove();popup=null;options.setAttribute('aria-expanded','false')}
function openOptions(){
 if(popup){closeOptions();return}popup=element('div',{id:'comfier-owned-run-options',role:'menu','aria-label':'Run options'});options.setAttribute('aria-expanded','true');
 const modes=[['normal','Run'],['front','Run at front'],['selected','Run selected outputs']];if(queuePolicy())modes.push(['instant','Run continuously'],['change','Run on change']);
 for(const[value,label]of modes){
  const b=element('button',{type:'button',role:'menuitemradio','aria-checked':String(mode===value)});b.textContent=label;b.disabled=value==='selected'&&!findCommand(['Comfy.QueueSelectedOutputNodes','Queue Selected Output Nodes']);b.addEventListener('click',e=>{e.stopPropagation();chooseMode(value);closeOptions()});popup.append(b);
 }
 document.body.append(popup);const r=options.getBoundingClientRect();popup.style.left=Math.max(4,Math.min(r.left,innerWidth-popup.getBoundingClientRect().width-4))+'px';popup.style.top=Math.max(4,r.top-popup.getBoundingClientRect().height-4)+'px';
}
function restoreNative(el,old){el.removeAttribute('data-comfier-actionbar-retired');el.inert=old.inert;if(old.aria===null)el.removeAttribute('aria-hidden');else el.setAttribute('aria-hidden',old.aria)}
function homeRef(node){return node&&typeof WeakRef==='function'?new WeakRef(node):node}
function homeNode(ref){return ref&&typeof ref.deref==='function'?ref.deref():ref}
function pruneNative(){
 const now=typeof performance!=='undefined'?performance.now():Date.now();let next=Infinity;
 function expired(el,state,key='detachedAt'){
  if(el?.isConnected){delete state[key];return false}
  if(state[key]===undefined)state[key]=now;
  const remaining=nativeGraceMs-(now-state[key]);if(remaining<=0)return true;
  next=Math.min(next,remaining);return false;
 }
 for(const[el,old]of retired)if(expired(el,old)){restoreNative(el,old);retired.delete(el)}
 for(const[key,el]of catalog)if(!el.isConnected&&!retired.has(el))catalog.delete(key);
 for(const[el,home]of nativeMeterHomes){
  if(expired(el,home)){nativeMeterHomes.delete(el);continue}
  // A live adopted meter must not keep its obsolete native parent tree alive.
  // Weak homes still allow restoration when the extension retains that parent.
  const parent=homeNode(home.parent);
  if(parent&&typeof home.parent?.deref!=='function'&&expired(parent,home,'homeDetachedAt')){home.parent=null;home.next=null}
  const sibling=homeNode(home.next);
  if(sibling&&typeof home.next?.deref!=='function'&&expired(sibling,home,'nextDetachedAt'))home.next=null;
 }
 if(next<Infinity)jobs.later('native-disposal',pruneNative,Math.max(1,next));else jobs.cancel('native-disposal');
}
function retire(el){if(!el||el.closest(own)||retired.has(el))return;retired.set(el,{inert:el.inert,aria:el.getAttribute('aria-hidden')});el.setAttribute('data-comfier-actionbar-retired','');el.inert=true;el.setAttribute('aria-hidden','true')}
function retireControl(el){if(retired.has(el))return;retired.set(el,{inert:el.inert,aria:el.getAttribute('aria-hidden')});el.setAttribute('data-comfier-actionbar-retired','');el.inert=true;el.setAttribute('aria-hidden','true')}
function nativeButtonLabel(b){return b.getAttribute('aria-label')||b.getAttribute('title')||b.textContent?.trim()||''}
function copyIcon(source,b,fallback){const icon=source?.querySelector('i,svg');const signature=icon?.outerHTML||fallback;if(b.dataset.icon===signature)return;b.dataset.icon=signature;b.replaceChildren();if(icon)b.append(icon.cloneNode(true));else{const i=element('i',{class:fallback,'aria-hidden':'true'});b.append(i)}}
function invoke(key,event){
 if(key==='unload'||key==='unload-cache')return backend('/free',{unload_models:true,free_memory:key==='unload-cache'});
 if(key==='lora')return window.__comfierLoraPanel?.toggle?.();
 if(key==='overview'){if(!window.__comfierSidePanels)closeFeedPanel();if(!window.__comfierSidePanels){window.__comfierAppsPanel?.closeIfOpen?.();window.__comfierExtensionsPanel?.closeIfOpen?.();window.__comfierLoraPanel?.closeIfOpen?.();window.__comfierLtxPanel?.closeIfOpen?.();}const s=stores()?.get('rightSidePanel');if(typeof s?.togglePanel==='function')return s.togglePanel();return command(['Comfy.ToggleRightSidePanel','Toggle properties panel','Workflow overview'])}
 if(key==='feed')return toggleFeed(event);
}
function captureRunState(root){
 if(!root.querySelector('[data-testid="queue-button"]'))return;
 const field=root.querySelector('input[type="number"],input[role="spinbutton"],.batch-count input');
 if(field&&!count.dataset.catalogued){count.dataset.catalogued='true';count.value=field.value||'1';for(const name of ['data-testid','aria-label','title'])if(field.hasAttribute(name))count.setAttribute(name,field.getAttribute(name))}
 for(const source of root.querySelectorAll('button')){
  const label=nativeButtonLabel(source);if(/^(increment|increase|decrement|decrease)(.*count)?$/i.test(label)){const up=/increment|increase/i.test(label),key=up?'count-up':'count-down';if(!controls.has(key)){const stepper=createButton(key,label,source.getAttribute('data-testid'),()=>{count.value=String(Math.max(1,Math.min(9999,batch()+(up?1:-1))));const s=queueSettings();if(s&&'batchCount'in s)s.batchCount=batch()});runIcon(stepper,up?'up':'down');runRow.insertBefore(stepper,runButton)}}
  const b=/interrupt|cancel execution/i.test(label)?interrupt:/history|queue overlay|\d+\s+active/i.test(label+' '+source.textContent)?history:null;
  if(!b||b.dataset.catalogued)continue;b.dataset.catalogued='true';for(const name of ['data-testid','aria-label','title'])if(source.hasAttribute(name))b.setAttribute(name,source.getAttribute(name));
 }
 const text=root.textContent||'',match=text.match(/(\d+)\s+active/i);if(match&&!receivedStatus)queueRemaining=Number(match[1]);
}
function catalogNative(){
 for(const root of document.querySelectorAll(sourceSelector)){
  if(root.closest(own)||root.closest('[data-testid="properties-panel"],.side-bar-panel,[role="dialog"]'))continue;
  captureRunState(root);
  retire(root);
 }
 // Extensions also insert into our compatible actionbar-container. Admit
 // metadata once, never the extension's new button instance or handlers.
 const ours=new Set(controls.values());
 for(const source of document.querySelectorAll('button')){
  if(ours.has(source))continue;
  const label=nativeButtonLabel(source),spec=specs.find(s=>s.match.test(norm(label)));if(!spec)continue;
  catalog.set(spec.key,source);copyIcon(source,controls.get(spec.key),spec.icon);retireControl(source);
 }
 const nativeMeters=document.getElementById('crystools-monitors-root');if(nativeMeters&&nativeMeters.parentElement!==row){if(!nativeMeterHomes.has(nativeMeters))nativeMeterHomes.set(nativeMeters,{parent:homeRef(nativeMeters.parentElement),next:homeRef(nativeMeters.nextSibling)});row.append(nativeMeters);}
 for(const nativeFeed of document.querySelectorAll('.pysssss-image-feed'))retireControl(nativeFeed);
}
function setting(key,fallback){const s=window.app?.extensionManager?.setting;const value=s?.get?.(key);return value===undefined||value===null?fallback:value}
function initMeters(){
 for(const[key,label,color]of [['cpu','CPU','#238f25'],['ram','RAM','#238f25'],['gpu','GPU','#126cb5'],['vram','VRAM','#126cb5'],['temp','GPU °C','#53a900']]){
  const cell=element('div',{class:'crystools-monitor','data-comfier-meter':key});const text=element('div',{class:'crystools-text'});text.textContent=label;
  const content=element('div',{class:'crystools-content'}),fill=element('div',{class:'crystools-slider'}),value=element('div',{class:'crystools-label'});value.textContent='—';fill.style.setProperty('--comfier-meter-color',color);fill.style.setProperty('background-color',color);content.append(fill,value);cell.append(text,content);monitors.append(cell);meterCells.set(key,{cell,content,fill,value,defaultColor:color,lastValue:null});
 }sizeMeters();
}
function text(el,value){if(el.textContent!==value)el.textContent=value}
function css(el,key,value){if(el.style.getPropertyValue(key)!==value||el.style.getPropertyPriority(key)!=='')el.style.setProperty(key,value)}
function disabled(el,value){if(el.disabled!==value)el.disabled=value}
function sizeMeters(){const chosen=window.__comfierLayoutEditor?.resourceVisibility?.();for(const m of meterCells.values()){css(m.content,'width',Math.max(40,Math.min(200,Number(setting('Comfier.Resources.Width',60))||60))+'px');css(m.content,'height',Math.max(20,Math.min(100,Number(setting('Comfier.Resources.Height',30))||30))+'px')}for(const key of meterCells.keys()){const cell=meterCells.get(key).cell,hidden=(chosen?.[key]??setting('Comfier.Resources.Show.'+key,true))===false;if(cell.hidden!==hidden)cell.hidden=hidden}for(const[key,m]of meterCells)paintMeterColor(key,m);syncResourceWork()}
function paintMeterColor(key,m){const model=window.__comfierUiEditorModel,appearance=window.__comfierLayoutEditor?.resourceAppearance?.(),palette=model?.monitorPalette(appearance,key),color=palette?.[model.monitorLevel(m.lastValue??0)]||m.defaultColor;css(m.fill,'--comfier-meter-color',color);css(m.fill,'background-color',color)}
function paintMeter(key,n){const m=meterCells.get(key);if(!m)return;m.lastValue=n;paintMeterColor(key,m);text(m.value,Math.floor(n)+(key==='temp'?'°':'%'));const width=Math.max(0,Math.min(100,n))+'%';css(m.fill,'width',width);css(m.fill,'--comfier-meter-fill',width);if(m.cell.title!==m.value.textContent)m.cell.title=m.value.textContent}
function monitorData(event){const data=event?.detail;if(!data)return;lastTelemetryAt=Date.now();telemetrySamples++;const gpu=data.gpus?.[0]||{};for(const[key,number]of Object.entries({cpu:data.cpu_utilization,ram:data.ram_used_percent,gpu:gpu.gpu_utilization,vram:gpu.vram_used_percent,temp:gpu.gpu_temperature})){const m=meterCells.get(key),n=Number(number);if(!m)continue;if(number==null||!Number.isFinite(n)||n<0){m.lastValue=null;paintMeterColor(key,m);text(m.value,'—');css(m.fill,'--comfier-meter-fill','0%');if(m.cell.title!=='Unavailable')m.cell.title='Unavailable';continue}paintMeter(key,n)}}
function visibleResources(){return !document.hidden&&monitors.isConnected&&getComputedStyle(monitors).display!=='none'&&getComputedStyle(monitors).visibility!=='hidden'&&[...meterCells.values()].some(m=>!m.cell.hidden)}
function syncResourceWork(delay){
 const visible=visibleResources();
 if(!visible){clearTimeout(resourceTimer);resourceTimer=0;resourceWake=false;if(resourceAbort&&!resourceAbort.signal.aborted){resourceEpoch++;resourceAbort.abort()}return}
 if(stopped||resourceEndpoint==='unsupported'||resourceTimer||resourceInFlight)return;
 resourceTimer=setTimeout(pollResources,delay??(resourceEndpoint==='unknown'?1000:Math.min(30000,2000*2**resourceFailures)));
}
function reconnectResources(){
 if(stopped)return;clearTimeout(resourceTimer);resourceTimer=0;resourceEpoch++;resourceFailures=0;resourceEndpoint='unknown';resourceWake=true;resourceAbort?.abort();
 if(!resourceInFlight){resourceWake=false;syncResourceWork(0)}
}
async function pollResources(){
 resourceTimer=0;if(stopped||resourceInFlight||!visibleResources()||resourceEndpoint==='unsupported')return;
 resourceInFlight=true;const epoch=resourceEpoch,controller=new AbortController();resourceAbort=controller;const timeout=setTimeout(()=>controller.abort(),5000);
 try{
  const response=await fetch('/comfierui/resources',{cache:'no-store',signal:controller.signal});
  if(stopped||epoch!==resourceEpoch)return;
  if(response.status===404||response.status===405){resourceEndpoint='unsupported';resourceFailures=0;monitorData({detail:{}});return}
  if(!response.ok)throw Error('Resource monitor unavailable');const data=await response.json();if(stopped||epoch!==resourceEpoch)return;
  resourceEndpoint='available';resourceFailures=0;const index=Math.max(0,Number(setting('Comfier.Resources.Gpu',0))||0);monitorData({detail:{...data,gpus:[data.gpus?.find(g=>g.index===index)||{}]}});
 }catch(_){if(!stopped&&epoch===resourceEpoch){resourceEndpoint='failed';resourceFailures=Math.min(4,resourceFailures+1);monitorData({detail:{}})}}
 finally{clearTimeout(timeout);if(resourceAbort===controller)resourceAbort=null;resourceInFlight=false;if(resourceWake){resourceWake=false;syncResourceWork(0)}else syncResourceWork()}
}

function resourceSettings(){const settings=window.app?.ui?.settings;if(settingsRegistered||!settings?.addSetting)return;settingsRegistered=true;
 for(const[key,label]of [['cpu','CPU'],['ram','RAM'],['gpu','GPU'],['vram','VRAM'],['temp','GPU temperature']])settings.addSetting({id:'Comfier.Resources.Show.'+key,name:'Comfier host monitors: '+label,type:'boolean',defaultValue:true,onChange:()=>{sizeMeters();window.__comfierLayoutEditor?.refresh()}});
 for(const[key,label,value,min,max]of [['Width','Meter width',60,40,200],['Height','Meter height',30,20,100],['Gpu','GPU index',0,0,31]])settings.addSetting({id:'Comfier.Resources.'+key,name:'Comfier host monitors: '+label,type:'number',defaultValue:value,attrs:{min,max,step:1},onChange:()=>{sizeMeters();window.__comfierLayoutEditor?.refresh()}});
}
jobs.listen(document,'visibilitychange',()=>{if(document.hidden)syncResourceWork();else reconnectResources()});
jobs.listen(window,'comfierui-session-reconnected',reconnectResources);
jobs.own(()=>{clearTimeout(resourceTimer);resourceTimer=0;resourceEpoch++;resourceAbort?.abort()});
function ensureFeed(){
 if(feedPanel)return;
 feedPanel=element('section',{id:'comfier-owned-feed-panel','aria-label':'Image Feed'});feedRoot=element('div',{class:'comfier-owned-feed-content'});const header=element('header'),title=element('span'),clear=element('button',{type:'button','aria-label':'Clear Image Feed'});title.textContent='Image Feed';clear.textContent='Clear';clear.addEventListener('click',()=>{feedRoot.replaceChildren();feedImages.clear()});header.append(title,clear);feedRoot.classList.add('comfier-feed-images');feedPanel.append(header,feedRoot);document.body.append(feedPanel);window.__comfierUiAuthority.registerOwned('feed',feedPanel,'actionbar-owner');
 for(const output of Object.values(window.app?.nodeOutputs||{}))feedData({detail:{output}});
}
function feedData(event){const images=event?.detail?.output?.images;if(!Array.isArray(images))return;ensureFeed();for(const record of images){if(!record?.filename)continue;const href=new URL('view',location.href);href.searchParams.set('filename',record.filename);href.searchParams.set('type',record.type||'output');href.searchParams.set('subfolder',record.subfolder||'');if(feedImages.has(href.href))continue;feedImages.add(href.href);const img=element('img',{src:href.href,alt:record.filename,loading:'lazy'});img.addEventListener('click',()=>{feedPreview?.remove();feedPreview=element('div',{id:'comfier-owned-feed-preview',role:'dialog','aria-label':'Image preview'});const large=element('img',{src:href.href,alt:record.filename});feedPreview.append(large);feedPreview.addEventListener('click',()=>{feedPreview.remove();feedPreview=null});document.body.append(feedPreview)});feedRoot.insertBefore(img,feedRoot.firstChild);while(feedRoot.children.length>200){const old=feedRoot.children[feedRoot.children.length-1];feedImages.delete(old.getAttribute('src'));old.remove()}}}
function toggleFeed(){if(window.__comfierSidePanels&&!window.__comfierSidePanels.operating('feed'))return window.__comfierSidePanels.toggle('feed',controls.get('feed'),toggleFeed);ensureFeed();if(feedOpen){closeFeedPanel();return}
 if(!window.__comfierSidePanels){window.__comfierAppsPanel?.closeIfOpen?.();window.__comfierExtensionsPanel?.closeIfOpen?.();window.__comfierLoraPanel?.closeIfOpen?.();window.__comfierLtxPanel?.closeIfOpen?.();}if(!window.__comfierSidePanels)stores()?.get('rightSidePanel')?.closePanel?.();
 feedOpen=true;feedPanel.setAttribute('data-open','');controls.get('feed')?.setAttribute('aria-pressed','true');window.__comfierEarlyFloatingPanels?.activateRight?.();window.__comfierEarlyFloatingPanels?.refresh?.();
}
function closeFeedPanel(){const wasOpen=feedOpen||!!feedPreview;feedPreview?.remove();feedPreview=null;if(feedOpen)closeFeed();return wasOpen}
window.__comfierFeedPanel={isOpen:()=>feedOpen,surface:()=>feedPanel,closePreview(){if(!feedPreview)return false;feedPreview.remove();feedPreview=null;return true},closeIfOpen:closeFeedPanel,setStack(value){const s=document.documentElement.style;if(value===null)s.removeProperty('--comfier-feed-z');else if(s.getPropertyValue('--comfier-feed-z')!==String(value))s.setProperty('--comfier-feed-z',String(value))}};
function closeFeed(){if(feedPreview){feedPreview.remove();feedPreview=null;return true}if(!feedOpen)return false;feedOpen=false;feedPanel?.removeAttribute('data-open');controls.get('feed')?.setAttribute('aria-pressed','false');document.documentElement.style.removeProperty('--comfier-feed-z');window.__comfierEarlyFloatingPanels?.refresh?.();return true}
function adoptCustom(){
 const extensions=document.getElementById('comfier-extensions-toggle'),downloads=document.getElementById('comfier-downloads-action-slot');
 for(const el of [downloads,extensions])if(el&&el.parentElement!==buttons)buttons.insertBefore(el,controls.get('overview')||null);
}
function syncState(){
 const policy=queuePolicy(),running=policy?.modern&&policy.store.mode==='instant-running';
 disabled(runButton,!running&&(busy||typeof window.app?.queuePrompt!=='function'&&!findCommand(['Comfy.QueuePrompt'])));
 const s=queueSettings(),auto=policy?.store[policy.key];if(['instant','instant-idle','instant-running'].includes(auto))mode='instant';else if(auto==='change')mode='change';else if(['instant','change'].includes(mode))mode='normal';if(s&&Number(s.batchCount)>0&&document.activeElement!==count&&count.value!==String(s.batchCount))count.value=String(s.batchCount);
 // Only the glyph changes; the original button and mask dimensions stay fixed.
 for(const[key,value]of Object.entries({'aria-label':running?'Stop continuous run':'Run',title:running?'Stop continuous run':'Run','data-comfier-running':String(!!running)}))if(runButton.getAttribute(key)!==value)runButton.setAttribute(key,value);
 text(history,queueRemaining+' active');
 for(const spec of specs){const b=controls.get(spec.key);if(!b)continue;
  disabled(b,spec.key==='lora'?!window.__comfierLoraPanel:spec.key==='unload'||spec.key==='unload-cache'?!api:spec.key==='overview'?!stores()?.get('rightSidePanel')&&!findCommand(['Comfy.ToggleRightSidePanel','Toggle properties panel','Workflow overview']):false);
 }
}
function put(el,k,v){runtime.writeStyle(el,k,v,'actionbar-owner')}
function releaseAppNavigation(){if(!appNav)return;window.__comfierUiAuthority.unregisterOwned('appNavigation',appNav);appNav.removeAttribute('data-comfier-admitted-app-navigation');if(appNavStyle===null)appNav.removeAttribute('style');else appNav.setAttribute('style',appNavStyle);appNav=null;appNavStyle=null}
function appNavigation(){
 const mobile=document.querySelector('[data-testid="linear-mobile"]');if(!mobile||window.__comfierAppsPanel?.isOpen?.()){releaseAppNavigation();return;}
 const nav=mobile.querySelector('[role="tablist"]');if(!nav)return;
 if(nav!==appNav){releaseAppNavigation();appNav=nav;appNavStyle=nav.getAttribute('style');nav.setAttribute('data-comfier-admitted-app-navigation','');window.__comfierUiAuthority.registerOwned('appNavigation',nav,'actionbar-owner')}const rr=run.getBoundingClientRect(),clearance=Math.max(4,innerHeight-rr.top+8);
 for(const[k,v]of Object.entries({position:'fixed',left:'0px',right:'0px',bottom:clearance+'px',height:'64px',padding:'4px',transform:'none',zoom:'1','z-index':'190'}))runtime.writeStyle(nav,k,v,'actionbar-owner');
}
function defaultLayout(){
 if(window.__comfierLayoutEditor?.active())return;
 const z=window.__comfierViewport?.scale()||Math.max(.3,Math.min(2,parseFloat(window.__comfierUiZoomValue)||1)),right=window.__comfierLayoutSide?.side()==='right',portrait=window.__comfierViewport?window.__comfierViewport.mode()==='outerPortrait':innerWidth<=520&&innerHeight>innerWidth;
 const tabs=document.getElementById('topbar-workflow-tabs')||document.querySelector('[data-testid="topbar-workflow-tabs"]'),top=tabs?Math.max(...[tabs,...tabs.children].map(e=>e.getBoundingClientRect().bottom)):document.getElementById('graph-canvas-container')?.getBoundingClientRect().top||0;
 const inset=window.__comfierLayoutSide?.workflowInset?.()||4;
 for(const el of [action,run]){put(el,'zoom',String(z));put(el,'visibility','visible');put(el,'position','fixed');put(el,'top','auto');put(el,'bottom','auto');put(el,'transform','none')}
 put(action,'top',(top+4)/z+'px');put(action,'left',right?inset/z+'px':'auto');put(action,'right',right?'auto':4/z+'px');put(action,'max-width',(innerWidth-8)/z+'px');
 put(run,'bottom',4/z+'px');put(run,'left',portrait?innerWidth/2/z+'px':right?inset/z+'px':'auto');put(run,'right',portrait||right?'auto':4/z+'px');put(run,'transform',portrait?'translateX(-50%)':'none');
}
function bindStores(){const live=stores();for(const[name,entry]of subscriptions)if(live?.get(name)!==entry.store){entry.off?.();subscriptions.delete(name)}for(const[name,s]of live||[]){if(!['queueSettingsStore','queueSettings','queue','queuePendingTaskCount','execution','command','rightSidePanel'].includes(name))continue;if(subscriptions.get(name)?.store===s)continue;subscriptions.get(name)?.off?.();subscriptions.set(name,{store:s,off:s.$subscribe?.(()=>{if(name==='rightSidePanel'&&s.isOpen)closeFeedPanel();syncState();schedule(false)},{detached:true,flush:'sync'})})}}

// Preserve ComfyActionbar's extension/progress/queue-context hosts. Only the
// resolved local queue child has the same execution contract as our Run bar.
function nativeRunReady(){return !!(run.isConnected&&queuePolicy()?.modern&&findCommand(['Comfy.QueuePrompt'])&&findCommand(['Comfy.QueuePromptFront'])&&findCommand(['Comfy.QueueSelectedOutputNodes']))}
function refreshNativeRun(){const ready=nativeRunReady();runLifecycle?.ready();resolvedRunLifecycle?.ready();if(ready===lastRunReady)return;lastRunReady=ready;for(const c of runLifecycle?.instances()||[])c.update?.()}
function installNativeRun(){const ui=window.__comfierUi;if(!ui?.watchComponents)return;
 runLifecycle=ui.watchComponents(['ComfyActionbar'],c=>ui.renderPatch(c,tree=>!nativeRunReady()?tree:ui.mapVNodes(tree,node=>{
  const type=node.type?.__asyncResolved||node.type;
  return (type?.__name||type?.name)==='ComfyQueueButton'&&!node.props?.paymentRecoveryLock?ui.commentVNode(node):node;
 })));
 resolvedRunLifecycle=ui.watchComponents(['ComfyQueueButton'],c=>{let parent=c.parent;while(parent&&(parent.type?.__name||parent.type?.name)!=='ComfyActionbar')parent=parent.parent;if(parent)ui.afterRender(()=>{if(stopped||parent.isUnmounted)return;catalogNative();parent.update?.()})});
}
function refresh(){if(stopped)return;refreshNativeRun();if(!window.__comfierSidePanels&&stores()?.get('rightSidePanel')?.isOpen)closeFeedPanel();loadApi();resourceSettings();if(catalogDirty){catalogDirty=false;catalogNative()}pruneNative();adoptCustom();bindStores();sizeMeters();syncState();defaultLayout();appNavigation()}
function schedule(discover=true){if(discover!==false)catalogDirty=true;jobs.frame('layout',refresh)}
const discoverySelector=sourceSelector+',#crystools-monitors-root,.pysssss-image-feed,[data-testid="linear-mobile"],#comfier-extensions-toggle,#comfier-downloads-action-slot';
function nativeCandidate(el){
 if(!el||el.nodeType!==1)return false;
 if(el.matches(discoverySelector)&&(!el.closest(own)||el.id==='crystools-monitors-root'||el.id==='comfier-extensions-toggle'||el.id==='comfier-downloads-action-slot'))return true;
 return el.matches('button')&&![...controls.values()].includes(el)&&specs.some(s=>s.match.test(norm(nativeButtonLabel(el))));
}
jobs.observe(document.body,{childList:true,subtree:true,characterData:true,attributes:true,attributeFilter:['aria-label','title','class']},records=>{
 if(records.some(r=>{
  if(!runtime.relevant([r]))return false;
  const target=r.target.nodeType===1?r.target:r.target.parentElement,container=target?.closest(discoverySelector);
  if(nativeCandidate(target)||container&&!container.closest(own))return true;
  if(r.type==='childList'&&[...r.removedNodes].some(n=>n.nodeType===1&&(
   [...retired.keys(),...nativeMeterHomes.keys()].some(el=>el===n||n.contains(el))||
   [...nativeMeterHomes.values()].some(home=>[homeNode(home.parent),homeNode(home.next)].some(el=>el&&(el===n||n.contains(el))) )
  )))return true;
  return r.type==='childList'&&[...r.addedNodes,...r.removedNodes].some(n=>n.nodeType===1&&(nativeCandidate(n)||[...n.querySelectorAll(discoverySelector+',button')].some(nativeCandidate)));
 }))schedule();
});
for(const name of ['resize','orientationchange','comfier-layout-editor-change','comfier-layout-side-change','comfierui-session-reconnected'])jobs.listen(window,name,()=>schedule(name==='comfierui-session-reconnected'));
jobs.listen(document,'click',e=>{if(popup&&!popup.contains(e.target)&&!options.contains(e.target))closeOptions()});
jobs.listen(document,'keydown',e=>{if(e.key==='Escape')closeOptions()});
const feedPreviewBack=window.__comfierBack?.register?.('image-feed-preview',140,()=>{if(!feedPreview)return false;feedPreview.remove();feedPreview=null;return true});
const feedBack=window.__comfierBack?.register?.('actionbar-image-feed',55,()=>!window.__comfierSidePanels&&closeFeed());
const back=window.__comfierBack?.register?.('actionbar-options',15,()=>{if(!popup)return false;closeOptions();return true});
window.__comfierActionbarOwner={action,run,updateMeters:sizeMeters,launcherHome:buttons,control:key=>controls.get(key),refresh:schedule,layout:defaultLayout,findCommand,executeCommand:command,snapshot:()=>({meters:meterCells.size,telemetrySamples,liveApi:api===window.app?.api,feedImages:feedImages.size,controls:[...controls.keys()],catalog:[...catalog.keys()],remaining:queueRemaining,mode,nativeHosts:retired.size,nativeMeterHomes:nativeMeterHomes.size,resourceEndpoint,resourceFailures,resourceTimer:!!resourceTimer,resourceInFlight,unavailable:[...controls].filter(([,b])=>b.disabled).map(([k])=>k)}),remove(){if(stopped)return;stopped=true;resolvedRunLifecycle?.remove();runLifecycle?.remove();jobs.dispose();releaseAppNavigation();back?.();feedBack?.();feedPreviewBack?.();closeFeedPanel();delete window.__comfierFeedPanel;if(feedPanel)window.__comfierUiAuthority.unregisterOwned('feed',feedPanel);feedPanel?.remove();closeOptions();api?.removeEventListener?.('status',status);api?.removeEventListener?.('comfier.resources',monitorData);api?.removeEventListener?.('executed',feedData);api?.removeEventListener?.('reconnected',reconnectResources);for(const s of subscriptions.values())s.off?.();for(const[el,old]of retired)restoreNative(el,old);retired.clear();catalog.clear();window.__comfierUiAuthority?.unregisterOwned?.('action',action);window.__comfierUiAuthority?.unregisterOwned?.('run',run);for(const [el,home]of nativeMeterHomes){const parent=homeNode(home.parent),next=homeNode(home.next);if(el.isConnected&&parent?.isConnected)parent.insertBefore(el,next?.parentElement===parent?next:null)}nativeMeterHomes.clear();action.remove();run.remove();style.remove();delete window.__comfierActionbarOwner}};
if(window.__comfierDocument?.subscribe)jobs.own(window.__comfierDocument.subscribe('actionbar-owner-app','app',schedule));
jobs.burst('startup',schedule,[0,100,400,1000,2500]);refresh();installNativeRun();
})();
