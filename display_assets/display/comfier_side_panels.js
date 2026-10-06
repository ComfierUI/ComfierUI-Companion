/* UFU65: one routing authority, two physical side lanes, independent native tab mounts. */
(()=>{
'use strict';
if(window.__comfierSidePanels)return;
const admittedHosts=new WeakMap(),wrappers=new Map();
const jobs=window.__comfierRuntime.scope('side-panels'),providers=new Map(),lanes={left:null,right:null},slots=new Map(),nativeMounts=new Map(),restores=[];
let sequence=0,executing=null,lastTrigger=null,stopped=false,sidebarStore=null,rightStore=null,teleportType=null;
const mode=()=>window.__comfierViewport?.mode()||((Math.min(screen.width,screen.height)<=520?'outer':'inner')+(innerHeight>=innerWidth?'Portrait':'Landscape'));
function visible(el){if(!el?.isConnected||el.hidden||el.hasAttribute('data-ufu-hidden'))return false;const r=el.getBoundingClientRect(),s=getComputedStyle(el);return r.width>0&&r.height>0&&s.display!=='none'&&s.visibility!=='hidden'&&s.visibility!=='collapse'}
function entry(id){return Object.values(lanes).find(e=>e?.id===id)||null}
function sideFor(trigger){const r=trigger?.getBoundingClientRect?.(),x=r?(r.left+r.right)/2:innerWidth/2;if(x<innerWidth/2-16)return 'left';if(x>innerWidth/2+16)return 'right';if(!lanes.left)return 'left';if(!lanes.right)return 'right';return lanes.left.order>lanes.right.order?'left':'right'}
function register(id,provider){providers.set(id,provider);return()=>{if(entry(id))close(id);providers.delete(id)}}
function operating(id){return executing===id}
function invoke(id,fn){const old=executing;executing=id;try{return fn?.()}finally{executing=old}}
function releaseWrapper(id){for(const [el,state]of wrappers)if(state.id===id){el.removeAttribute('data-comfier-panel-wrapper');if(state.value)el.style.setProperty('z-index',state.value,state.priority);else el.style.removeProperty('z-index');wrappers.delete(el)}}
function rankWrapper(el,id,z){const mask=el.closest?.('.p-dialog-mask,.p-overlay-mask');for(const [old,state]of wrappers)if(state.id===id&&old!==mask){old.removeAttribute('data-comfier-panel-wrapper');if(state.value)old.style.setProperty('z-index',state.value,state.priority);else old.style.removeProperty('z-index');wrappers.delete(old)}if(!mask||mask===el)return;let state=wrappers.get(mask);if(!state){state={id,value:mask.style.getPropertyValue('z-index'),priority:mask.style.getPropertyPriority('z-index')};wrappers.set(mask,state)}state.id=id;mask.setAttribute('data-comfier-panel-wrapper',id);put(mask,'z-index',String(z))}
function close(id){const e=entry(id);if(!e)return false;const surface=providers.get(id)?.surface?.();lanes[e.side]=null;try{invoke(id,()=>providers.get(id)?.close?.())}finally{surface?.removeAttribute('data-comfier-side-panel');surface?.removeAttribute('data-comfier-panel-key');releaseWrapper(id);paint();refresh()}return true}
function singlePortrait(){if(mode()!=='outerPortrait')return;const open=Object.values(lanes).filter(Boolean).sort((a,b)=>b.order-a.order);for(const e of open.slice(1))close(e.id)}
function open(id,trigger,action){if(operating(id))return action?.();const p=providers.get(id);if(!p)return action?.();if(entry(id))return true;const side=sideFor(trigger||lastTrigger);if(mode()==='outerPortrait')for(const e of Object.values(lanes))if(e)close(e.id);if(lanes[side])close(lanes[side].id);const e={id,side,order:++sequence,trigger:trigger||lastTrigger,opened:Date.now(),live:false};lanes[side]=e;try{const result=invoke(id,action||p.open);if(result===false){lanes[side]=null;paint();return false}if(result?.then)result.catch(error=>{if(entry(id)===e)close(id);console.error('Panel open failed',error)});paint();refresh();jobs.burst('mount',refresh,[0,32,100,250,750]);return result??true}catch(error){lanes[side]=null;paint();throw error}}
function toggle(id,trigger,action){if(operating(id))return action?.();if(entry(id))return close(id);return open(id,trigger,action)}
function overlayOpen(){return [...document.querySelectorAll('.p-select-overlay,.p-popover,[role="listbox"],[role="menu"],.lm-lora-context-menu')].some(visible)}
function back(){if(overlayOpen())return false;const e=Object.values(lanes).filter(Boolean).sort((a,b)=>b.order-a.order)[0];return e?close(e.id):false}
function put(el,key,value){if(el&&(el.style.getPropertyValue(key)!==String(value)||el.style.getPropertyPriority(key)!=='important'))window.__comfierUiAuthority?.writePanel?window.__comfierUiAuthority.writePanel(el,key,String(value)):el.style.setProperty(key,String(value),'important')}
function controls(){return (window.__comfierLayoutEditor?.snapshot?.().controls||[]).filter(c=>c.available!==false).map(c=>document.querySelector('[data-ufu-control="'+c.id.replace(/"/g,'\\"')+'"]')).filter(visible)}
function bounds(panelWidth=0){
 const landscape=mode()==='outerLandscape';let left=4,right=innerWidth-4,top=4,bottom=innerHeight-4;
 const snapshot=window.__comfierLayoutEditor?.snapshot?.(),boxes=snapshot?.boxes||[];
 if(landscape){
  // LOCKED: Phone landscape always uses viewport top/bottom +4px. Only occupied left/right Edge tracks reserve space; top/bottom lanes and topbar are overlaid. See AGENTS.md.
  for(const b of boxes.filter(b=>(b.track||1)===1)){if(b.edge==='left')left=Math.max(left,b.right+4);else if(b.edge==='right')right=Math.min(right,b.left-4)}
  if(!boxes.some(b=>b.edge==='left'||b.edge==='right')){
   const p=window.__comfierLayoutEditor?.physicalSpace?.();
   if(p){left=Math.max(left,p.left);right=Math.min(right,p.right)}
  }

 }else{
  const p=window.__comfierLayoutEditor?.panelSpace?.(panelWidth);
  if(p){const mirrored=window.__comfierLayoutSide?.side()==='right';left=mirrored?innerWidth-p.right:p.left;right=mirrored?innerWidth-p.left:p.right;top=p.top;bottom=p.bottom;return{left,right,top,bottom,leftTop:mirrored?(p.rightTop??top):(p.leftTop??top),rightTop:mirrored?(p.leftTop??top):(p.rightTop??top),leftBottom:mirrored?(p.rightBottom??bottom):(p.leftBottom??bottom),rightBottom:mirrored?(p.leftBottom??bottom):(p.rightBottom??bottom)}}
  else{const tabs=document.querySelector('#topbar-workflow-tabs,[data-testid="topbar-workflow-tabs"]');if(tabs)top=Math.max(top,tabs.getBoundingClientRect().bottom+4);const rail=window.__comfierConnectedSidebar?.root?.()||window.__comfierEdgeBar?.root?.();if(visible(rail)){const r=rail.getBoundingClientRect();if(r.left<innerWidth/2)left=Math.max(left,r.right+4);else right=Math.min(right,r.left-4)}}
 }
 return{left,right,top,bottom,leftTop:top,rightTop:top,leftBottom:bottom,rightBottom:bottom};
}
function geometry(){const b=bounds(),count=Object.values(lanes).filter(Boolean).length,portrait=mode()==='outerPortrait',available=Math.max(0,b.right-b.left),cap=count===2&&!portrait?Math.max(0,(available-4)/2):available,width=Math.min(mode()==='outerLandscape'?available*2/3:600,cap),height=Math.max(0,b.bottom-b.top);return{...bounds(width),width,height,portrait,count}}
function runningAppGeometry(){const b=bounds();return{...b,width:Math.max(0,b.right-b.left),height:Math.max(0,b.bottom-b.top),portrait:mode()==='outerPortrait',leftTop:b.top,rightTop:b.top,leftBottom:b.bottom,rightBottom:b.bottom}}
function paint(){
 const normal=geometry();for(const e of Object.values(lanes)){if(!e)continue;const p=providers.get(e.id),el=p?.surface?.();if(!el?.isConnected)continue;const g=e.id==='apps'&&window.__comfierAppsPanel?.contentMode?.()==='running'?runningAppGeometry():normal;
 if(admittedHosts.get(el)!==el.parentElement){window.__comfierEarlyFloatingPanels?.admitSideSurface?.(el);admittedHosts.set(el,el.parentElement)}
 if(el.classList.contains('comfier-native-side-host'))put(el,'display','block');
 el.setAttribute('data-comfier-side-panel',e.side);el.setAttribute('data-comfier-panel-key',e.id);el.setAttribute('role','complementary');
 const top=e.side==='left'?g.leftTop:g.rightTop,bottom=e.side==='left'?g.leftBottom:g.rightBottom,height=Math.max(0,bottom-top),x=e.side==='left'?g.left:g.right-g.width,z=500+(g.portrait&&e.order===Math.max(...Object.values(lanes).filter(Boolean).map(x=>x.order))?2:1);
 rankWrapper(el,e.id,z);
 // Portrait Nodes content may rerender while its popovers toggle. Keep overflow
 // inside the routed host; its geometry continues to come only from bounds().
 if(mode()==='outerPortrait'&&el.matches('[data-comfier-native-host="node-library"],[data-comfier-native-host="nodes"]')){put(el,'overflow','auto');put(el,'overflow-x','hidden')}
 for(const[k,v]of Object.entries({position:'fixed',left:x+'px',right:'auto',top:top+'px',bottom:'auto',width:g.width+'px','min-width':'0','max-width':g.width+'px',height:height+'px','min-height':'0','max-height':height+'px','z-index':String(z),transform:'none',translate:'none',zoom:'1','pointer-events':'auto','box-sizing':'border-box','--cef-lora-content-width':g.width+'px'}))put(el,k,v);
 }
 for(const [id,p]of providers){const opened=!!entry(id);const buttons=p.buttons?.()||[];for(const button of buttons){if(!button)continue;button.setAttribute('data-comfier-panel-launcher',id);const pressed=String(opened);if(button.getAttribute('aria-pressed')!==pressed)button.setAttribute('aria-pressed',pressed);if(button.getAttribute('aria-expanded')!==pressed)button.setAttribute('aria-expanded',pressed);button.classList.toggle('comfier-panel-active',opened);if(button.classList.contains('side-bar-button'))button.classList.toggle('side-bar-button-selected',opened)} }
}
function tabs(){const source=window.app?.extensionManager?.getSidebarTabs?.()||window.app?.extensionManager?.sidebarTab?.sidebarTabs||[];return Array.isArray(source)?source:source instanceof Map?[...source.values()]:Array.isArray(source?.value)?source.value:Object.values(source)}
function tabButtons(id){return [...document.querySelectorAll('[data-testid="'+id+'-tab-button"]')]}
function blankVNode(template,type,key,props,children,shapeFlag){return {...template,type,key,props:{...(props||{}),key},children,ref:null,component:null,el:null,anchor:null,target:null,targetAnchor:null,targetStart:null,suspense:null,ssContent:null,ssFallback:null,shapeFlag,patchFlag:0,dynamicProps:null,dynamicChildren:null}}
function unwrapSlot(fn){return fn?.__comfierBaseSlot||fn}
function findTeleportType(){if(teleportType)return teleportType;const root=document.getElementById('vue-app'),stack=[root?.__vue_app__?._instance?.subTree||root?._vnode],seen=new Set();while(stack.length){const n=stack.pop();if(!n||typeof n!=='object'||seen.has(n))continue;seen.add(n);if(n.type?.__isTeleport&&typeof n.type.process==='function'){teleportType=n.type;return teleportType}if(n.component?.subTree)stack.push(n.component.subTree);if(Array.isArray(n.children))stack.push(...n.children);if(n.suspense?.activeBranch)stack.push(n.suspense.activeBranch)}return null}
function wrapSlot(c,base){base=unwrapSlot(base);let record=slots.get(c);if(record?.base===base)return record.wrapper;record={base,wrapper:null};record.wrapper=(...args)=>{const content=base(...args),out=Array.isArray(content)?[...content]:[content];const template=out.find(n=>(n?.type?.__name||n?.type?.name)==='SideToolbar')||out.find(n=>n?.__v_isVNode);if(!template)return content;
 for(const [id,m]of nativeMounts){if(!m.started||m.tab.type!=='vue'||!m.tab.component)continue;if(!m.vnode||m.vnode.component?.isUnmounted){m.vnode=blankVNode(template,m.tab.component,'comfier-native-content:'+id,m.tab.__comfierContentProps,null,4);m.vnode.appContext=c.appContext||template.appContext}
 const active=entry('sidebar:'+id),shell=blankVNode(template,'section','comfier-native-shell:'+id,{id:m.domId,class:m.className,'data-comfier-native-host':id,style:{display:active?'block':'none'},role:'complementary','aria-label':m.tab.title||m.tab.label||id},[m.vnode],17);
 // Use Vue's own Teleport implementation discovered from the running app.
 // Vue retains component ownership and moves the shell, rather than us moving its DOM.
 out.push(m.portal?blankVNode(template,m.portal,'comfier-native-portal:'+id,{to:document.body},[shell],80):shell)}
 return out};record.wrapper.__comfierBaseSlot=base;slots.set(c,record);return record.wrapper}
function mountNativeSlots(){const root=document.getElementById('vue-app'),stack=[root?.__vue_app__?._instance?.subTree||root?._vnode],seen=new Set();let found=false;
 while(stack.length){const n=stack.pop();if(!n||typeof n!=='object'||seen.has(n))continue;seen.add(n);const c=n.component;if(c?.slots?.['side-toolbar']){let parent=c.parent;while(parent&&(parent.type?.__name||parent.type?.name)!=='GraphCanvas')parent=parent.parent;if(parent){const next=wrapSlot(c,c.slots['side-toolbar']);if(c.slots['side-toolbar']!==next){c.slots['side-toolbar']=next;c.update?.()}found=true}}
 if(c?.subTree)stack.push(c.subTree);if(Array.isArray(n.children))stack.push(...n.children);if(n.suspense?.activeBranch)stack.push(n.suspense.activeBranch)}return found}
function updateSlots(){mountNativeSlots();for(const[c,r]of slots)if(!c.isUnmounted&&unwrapSlot(c.slots?.['side-toolbar'])===r.base)c.update?.()}
function registerNative(tab){if(tab.id==='apps')return;const id='sidebar:'+tab.id;if(providers.has(id))return;if(!tab.component&&typeof tab.render!=='function')return;
 const m={tab,domId:'comfier-native-host-'+tab.id,className:'comfier-native-side-host comfier-early-floating-panel '+(tab.id==='comfier-native-settings'?'comfier-native-settings-panel':tab.id==='comfier-templates'?'comfier-templates-native-panel':'')};nativeMounts.set(tab.id,m);
 register(id,{buttons:()=>tabButtons(tab.id),surface:()=>document.getElementById(m.domId),isOpen:()=>!!entry(id),open(){
 if(tab.type==='vue'){if(!m.started)m.portal=findTeleportType();m.started=true;if(!mountNativeSlots()){console.warn('Native side-panel slot is not ready: '+tab.id);return false}tab.__comfierOpen?.();updateSlots()}
 else{let host=document.getElementById(m.domId);if(!host){host=document.createElement('section');host.id=m.domId;host.className=m.className;host.setAttribute('data-comfier-native-host',tab.id);document.body.append(host);m.host=host}host.hidden=false;put(host,'display','block');const result=tab.render(host);if(result?.then)result.catch(error=>{if(entry(id))close(id);console.error(error)})}
 return true},close(){tab.__comfierClose?.();if(m.host){tab.destroy?.();m.host.hidden=true;}if(tab.id==='comfier-app-settings')window.__comfierThemeStudio?.close?.();const el=document.getElementById(m.domId);el?.removeAttribute('data-comfier-side-panel');if(el)put(el,'display','none');updateSlots()}});
}
function hookStore(store,name,fn){const original=store[name];if(typeof original!=='function')return;const wrapper=function(...args){return fn.call(this,original,args)};store[name]=wrapper;restores.push(()=>{if(store[name]===wrapper)store[name]=original})}
function bindings(){
 for(const tab of tabs())registerNative(tab);
 const sidebar=window.app?.extensionManager?.sidebarTab;if(sidebar&&sidebar!==sidebarStore){sidebarStore=sidebar;hookStore(sidebar,'toggleSidebarTab',function(original,args){const id='sidebar:'+args[0];if(providers.has(id))return toggle(id,tabButtons(args[0]).find(visible)||lastTrigger);return original.apply(this,args)})}
 const right=window.__comfierUi?.pinia?.()?._s?.get('rightSidePanel');if(right&&right!==rightStore){rightStore=right;
 register('properties',{isOpen:()=>!!right.isOpen,surface:()=>[...document.querySelectorAll('[data-testid="properties-panel"]')].map(el=>el.closest('.p-splitterpanel')||el).find(el=>el.isConnected),buttons:()=>[window.__comfierActionbarOwner?.control('overview')].filter(Boolean),close:()=>right.closePanel?.()});
 for(const name of ['togglePanel','openPanel'])hookStore(right,name,function(original,args){if(operating('properties'))return original.apply(this,args);if(name==='openPanel'&&entry('properties'))return invoke('properties',()=>original.apply(this,args));return (name==='togglePanel'?toggle:open)('properties',lastTrigger,()=>original.apply(this,args))});
 hookStore(right,'closePanel',function(original,args){if(entry('properties')&&!operating('properties'))return close('properties');return original.apply(this,args)});
 }
 const custom=[['feed','__comfierFeedPanel',()=>[window.__comfierActionbarOwner?.control('feed')]],['apps','__comfierAppsPanel',()=>[window.__comfierWorkflowOwner?.control?.('apps')||document.querySelector('[data-comfier-workflow-control="apps"]')]],['lora','__comfierLoraPanel',()=>[window.__comfierActionbarOwner?.control('lora')]],['extensions','__comfierExtensionsPanel',()=>[document.getElementById('comfier-extensions-toggle')]],['ltx','__comfierLtxPanel',()=>[]]];
 for(const[id,key,buttons]of custom){const api=window[key];if(!api||providers.get(id)?.api===api)continue;register(id,{api,isOpen:api.isOpen,surface:api.surface,close:api.closeIfOpen,buttons});}
}
function reconcile(){if(stopped)return;singlePortrait();bindings();const legacyTab=sidebarStore?.activeSidebarTabId,nativeId=legacyTab==='apps'?'apps':'sidebar:'+legacyTab;if(legacyTab&&providers.has(nativeId)){sidebarStore.activeSidebarTabId=null;const provider=providers.get(nativeId);if(!entry(nativeId))jobs.later('native-migrate:'+nativeId,()=>{if(!entry(nativeId))open(nativeId,provider.buttons?.().find(visible),provider.open||(()=>window.__comfierAppsPanel?.toggle?.()))},0)}
 for(const[id,provider]of providers)if(provider.api?.isOpen?.()&&!entry(id))open(id,provider.buttons?.().find(visible),()=>true);if(rightStore?.isOpen&&!entry('properties'))open('properties',providers.get('properties')?.buttons?.().find(visible),()=>true);
 for(const e of Object.values(lanes)){if(!e)continue;const p=providers.get(e.id);if(p?.isOpen?.())e.live=true;if(p?.isOpen&&!p.isOpen()&&(e.live||Date.now()-e.opened>10000)){lanes[e.side]=null;releaseWrapper(e.id);const el=p.surface?.();el?.removeAttribute('data-comfier-side-panel');el?.removeAttribute('data-comfier-panel-key')}}paint()}
function refresh(){if(!stopped)jobs.frame('paint',reconcile)}
const style=document.createElement('style');style.id='comfier-unified-side-panel-style';style.textContent=`
html body rgthree-progress-bar{z-index:200!important}
.comfier-native-side-host{border:1px solid var(--comfier-panel-frame,var(--interface-stroke,#3b4554));border-radius:10px;background:var(--comfy-menu-bg,#171717);overflow:auto;overscroll-behavior:contain;touch-action:pan-x pan-y}
.comfier-native-side-host>*{min-width:0;max-width:100%;min-height:0;height:100%}
html body [data-comfier-native-host] :is(.sidebar-content-container,.scrollbar-custom){touch-action:pan-y!important;overscroll-behavior:contain!important}
html body [data-comfier-panel-launcher].comfier-panel-active{background-color:color-mix(in srgb,var(--comfier-active-color,var(--color-base-foreground,var(--fg-color,#fff))) 33%,transparent)!important;box-shadow:none!important}
html body .ui-native-side-row{display:none!important}
`;document.head.append(style);
jobs.listen(document,'pointerdown',event=>{const button=event.target?.closest?.('button,[role="button"]');if(button&&!button.closest('[data-comfier-side-panel]'))lastTrigger=button},true);
jobs.listen(document,'click',event=>{if(window.__comfierLayoutEditor?.consumeScrollClick?.(event)){event.preventDefault();event.stopImmediatePropagation();return}const button=event.target?.closest?.('button,[role="button"]');if(button&&!button.closest('[data-comfier-side-panel]')){lastTrigger=button;const id=button.getAttribute('data-comfier-panel-launcher');if(id&&entry(id)&&!button.disabled&&!event.defaultPrevented){event.preventDefault();event.stopImmediatePropagation();close(id);return}}if(event.target?.closest?.('[data-comfier-panel-launcher],[data-comfier-side-panel],[data-comfier-native-host],.side-bar-button,.side-bar-panel,#comfier-apps-panel,#comfier-owned-feed-panel'))jobs.burst('interaction',refresh,[0,40,160])},true);
for(const event of ['resize','orientationchange','comfier-layout-editor-change','comfier-apps-surface-change'])jobs.listen(window,event,refresh,{passive:true});
jobs.observe(document.body,{subtree:true,childList:true},records=>{if(records.some(r=>[...r.addedNodes,...r.removedNodes].some(n=>n.nodeType===1)))refresh()});
jobs.own(window.__comfierBack?.register('unified-side-panels',145,back)||(()=>{}));
window.__comfierSidePanels={register,open,toggle,close,back,operating,isOpen:id=>!!entry(id),side:id=>entry(id)?.side,sideFor,bounds,geometry,refresh,paint,wrapSlot,unwrapSlot,canMountNative:mountNativeSlots,trigger:()=>lastTrigger,snapshot:()=>({mode:mode(),lanes:{left:lanes.left&&{id:lanes.left.id,order:lanes.left.order},right:lanes.right&&{id:lanes.right.id,order:lanes.right.order}},native:[...nativeMounts.keys()],hosts:[...nativeMounts].map(([id,m])=>({id,portal:!!m.portal,parent:document.getElementById(m.domId)?.parentElement?.tagName||null})),geometry:geometry()}),remove(){for(const e of Object.values(lanes))if(e)close(e.id);stopped=true;jobs.dispose();for(const restore of restores.reverse())restore();for(const[c,r]of slots)if(c.slots?.['side-toolbar']===r.wrapper){c.slots['side-toolbar']=r.base;c.update?.()}for(const m of nativeMounts.values()){if(m.host)m.host.remove()}document.querySelectorAll('[data-comfier-panel-launcher]').forEach(b=>{b.classList.remove('comfier-panel-active');b.removeAttribute('data-comfier-panel-launcher')});style.remove();delete window.__comfierSidePanels}};
bindings();jobs.burst('startup',refresh,[0,60,180,500,1500,3000]);
})();
