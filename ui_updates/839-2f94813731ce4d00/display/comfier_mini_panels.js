(function(){
'use strict';
window.__comfierMiniPanels?.remove?.();
const runtime=window.__comfierRuntime,jobs=runtime.scope('mini-panels'),authority=window.__comfierUiAuthority;
const stack=[],undo=[];let stopped=false,sequence=0,canvasDepth=0,currentCanvas=null;
const ROOT='#comfier-panel-controller-popups';
const host=window.__comfierEarlyFloatingPanels?.miniPanelHost?.();
if(!host){console.warn('COMFIER mini panels: panel controller host unavailable');return}
authority.registerOwned('miniPanels',host,'mini-panel-owner');
const style=document.createElement('style');style.id='comfier-mini-panels-style';style.textContent=`
html body #comfier-panel-controller-popups{display:contents;position:static;pointer-events:none;z-index:auto;isolation:auto;transform:none;overflow:visible}
html body .comfier-mini-panel{position:fixed;display:flex;flex-direction:column;width:max-content;min-width:180px;max-width:calc(100vw - 8px);height:auto!important;min-height:0!important;max-height:var(--comfier-mini-height,calc(100dvh - 8px))!important;margin:0;padding:6px;box-sizing:border-box;overflow-x:hidden!important;overflow-y:auto!important;overscroll-behavior:contain;pointer-events:auto;transform:none;animation:none!important;transition:none!important;border:1px solid var(--comfier-panel-frame,var(--interface-stroke,#3b4554));border-radius:8px;background:var(--comfier-panel-menus-paint,var(--comfy-menu-bg,#171717));color:var(--comfier-ui-font,var(--fg-color,#fff));box-shadow:0 5px 18px #0005;font:inherit;touch-action:pan-y}
html body .comfier-mini-panel button,html body .comfier-mini-panel a{display:flex;align-items:center;gap:8px;width:100%;min-height:32px;padding:7px 10px;margin:0;flex:none;border:0;border-radius:5px;background:transparent;color:inherit;font:inherit;text-align:left;text-decoration:none;white-space:normal;overflow-wrap:anywhere;touch-action:manipulation;cursor:pointer;box-sizing:border-box}
html body .comfier-mini-panel :is(button,a):is(:hover,:focus-visible,:active){background:color-mix(in srgb,var(--comfier-icon-color,#fff) 14%,transparent)}
html body .comfier-mini-panel button:disabled{opacity:.45;cursor:default}
html body .comfier-mini-panel .comfier-mini-icon{width:16px;height:16px;flex:none;color:var(--comfier-icon-color,#fff)}
html body .comfier-mini-panel small{margin-left:auto;opacity:.7;font-size:11px;white-space:nowrap}
html body .comfier-mini-panel hr{width:100%;flex:none;border:0;border-top:1px solid var(--comfier-panel-frame,var(--interface-stroke,#3b4554));margin:4px 0}
html body .comfier-mini-panel header{display:flex;align-items:center;gap:8px;flex:none;padding:4px 8px;font-weight:600}
html body .comfier-mini-panel header button{width:32px;padding:4px;justify-content:center;margin-left:auto}
html body .comfier-mini-panel p{margin:6px 10px;max-width:260px}
/* Exact native surfaces retired for these four replacements only. */
html.comfier-mini-panels-owned body :is(.comfy-command-menu,.help-center-popup,.help-center-backdrop){display:none!important;visibility:hidden!important;pointer-events:none!important}
`;
document.head.append(style);document.documentElement.classList.add('comfier-mini-panels-owned');
const unref=value=>value&&typeof value==='object'&&'value'in value?value.value:value;
const stores=()=>window.__comfierUi?.pinia?.()?._s;
const cstore=()=>stores()?.get('command');
const translate=(key,fallback)=>{try{const t=document.getElementById('vue-app')?.__vue_app__?.config?.globalProperties?.$t;const value=t?.(key);return value&&value!==key?value:fallback}catch(_){return fallback}};
const error=e=>{console.error('COMFIER mini panel action failed',e);window.ComfyRemoteDownloads?.showDownloadError?.(String(e?.message||e))};
function execute(id){if(!cstore()?.getCommand?.(id))throw Error('Command unavailable: '+id);return cstore().execute(id)}
function visible(el){if(!el?.isConnected)return false;const s=getComputedStyle(el),r=el.getBoundingClientRect();return s.display!=='none'&&s.visibility!=='hidden'&&r.width>1&&r.height>1}
function viewport(){const v=window.visualViewport;return{left:v?.offsetLeft||0,top:v?.offsetTop||0,right:(v?.offsetLeft||0)+(v?.width||innerWidth),bottom:(v?.offsetTop||0)+(v?.height||innerHeight)}}
function rail(trigger){const connected=window.__comfierConnectedSidebar?.anchor?.(trigger);if(visible(connected))return connected;const owned=trigger?.closest?.('.comfier-unified-floating-rail,nav.side-tool-bar-container');if(visible(owned))return owned;return [...document.querySelectorAll('.comfier-unified-floating-rail,nav.side-tool-bar-container')].find(visible)||null}
function rect(el){const r=el.getBoundingClientRect();return{left:r.left,right:r.right,top:r.top,bottom:r.bottom,width:r.width,height:r.height}}
function laneBounds(v,obstacles,pad=4){
 // All occupied lanes contribute their inward edge, including split rows/columns.
 const b={left:v.left+pad,top:v.top+pad,right:v.right-pad,bottom:v.bottom-pad};
 for(const o of obstacles){if(o.edge==='left')b.left=Math.max(b.left,o.right+pad);if(o.edge==='right')b.right=Math.min(b.right,o.left-pad);if(o.edge==='top')b.top=Math.max(b.top,o.bottom+pad);if(o.edge==='bottom')b.bottom=Math.min(b.bottom,o.top-pad)}
 // Degenerate profiles get a scrollable viewport fallback rather than offscreen UI.
 if(b.right-b.left<32){b.left=v.left+pad;b.right=v.right-pad}if(b.bottom-b.top<32){b.top=v.top+pad;b.bottom=v.bottom-pad}return b;
}
function laneObstacles(){
 const result=[],r=rail();if(r){const box=rect(r);const flow=r.dataset.comfierEdgeFlow||getComputedStyle(r).flexDirection;const horizontal=flow==='horizontal'||flow==='row'||flow==='row-reverse';result.push({...box,edge:horizontal?(box.top+box.height/2<innerHeight/2?'top':'bottom'):(box.left+box.width/2<innerWidth/2?'left':'right')})}
 const snapshot=window.__comfierLayoutEditor?.snapshot?.();
 if(snapshot?.boxes?.length){for(const box of snapshot.boxes){const group=snapshot.groups.find(g=>g.id===box.id);const edge=box.edge||group?.edge;if(edge)result.push({...box,edge:edge==='side'?(window.__comfierLayoutSide?.side()==='right'?'right':'left'):edge})}}
 for(const [selector,edge]of [['[data-testid="view-mode-toggle"]','top'],['#comfier-owned-canvas-toolbar','right'],['[data-comfier-owned-actionbar],.comfier-early-queue-dock','bottom'],['#crystools-monitors-root','top']])for(const el of document.querySelectorAll(selector)){if(!visible(el))continue;const box=rect(el);let side=edge;if(selector==='#comfier-owned-canvas-toolbar')side=box.width>box.height?'bottom':box.left+box.width/2<innerWidth/2?'left':'right';result.push({...box,edge:side})}
 return result;
}
function placement(bounds,size,spawn){return{left:Math.max(bounds.left,Math.min(spawn.left,bounds.right-size.width)),top:Math.max(bounds.top,Math.min(spawn.top,bounds.bottom-size.height))}}
function railSpawn(r,t,size,horizontal,side){
 const nearStart=horizontal?Math.abs(t.left+t.width/2-r.left)<=Math.abs(r.right-t.left-t.width/2):Math.abs(t.top+t.height/2-r.top)<=Math.abs(r.bottom-t.top-t.height/2);
 if(horizontal){let top=r.top+r.height/2<(viewport().top+viewport().bottom)/2?r.bottom+4:r.top-size.height-4;return{left:nearStart?r.left:r.right-size.width,top}}
 return{left:side==='right'?r.left-size.width-4:r.right+4,top:nearStart?r.top:r.bottom-size.height};
}
function place(panel){
 if(!panel?.root?.isConnected)return;
 const el=panel.root,z=Math.max(.3,Math.min(2,Number(window.__comfierViewport?.scale?.()||window.__comfierUiZoomValue)||1)),v=viewport();
 const obstacles=laneObstacles(),b=panel.kind==='canvas'?laneBounds(v,obstacles):laneBounds(v,obstacles.filter(o=>o.edge==='top'||o.edge==='bottom'));
 if(panel.parentMenu){const source=rail(panel.trigger);if(source){const r=rect(source);if(r.width<r.height){if(r.left+r.width/2<innerWidth/2)b.left=Math.max(b.left,r.right+4);else b.right=Math.min(b.right,r.left-4)}}}
 el.style.zoom=String(z);el.style.maxWidth=Math.max(32,b.right-b.left)/z+'px';el.style.minWidth=Math.min(180,Math.max(32,b.right-b.left)/z)+'px';el.style.maxHeight=Math.max(32,b.bottom-b.top)/z+'px';el.style.setProperty('--comfier-mini-height',el.style.maxHeight);
 let measured=rect(el),spawn={left:panel.point?.x??b.left,top:panel.point?.y??b.top};
 if(panel.parentMenu?.root?.isConnected){const p=rect(panel.parentMenu.root),t=panel.trigger?rect(panel.trigger):p;spawn={left:p.right+4,top:t.top};if(spawn.left+measured.width>b.right)spawn.left=p.left-measured.width-4}
 else if(panel.kind==='rail'){const source=rail(panel.trigger);if(source&&panel.trigger?.isConnected){const r=rect(source),t=rect(panel.trigger),flow=source.dataset.comfierEdgeFlow||getComputedStyle(source).flexDirection,horizontal=['horizontal','row','row-reverse'].includes(flow);spawn=railSpawn(r,t,measured,horizontal,r.left+r.width/2<innerWidth/2?'left':'right')}}
 const p=placement(b,measured,spawn);el.style.left=p.left/z+'px';el.style.top=p.top/z+'px';el.style.visibility='visible';
}
function closeOne(panel,focus=true){
 if(!panel||panel.closed)return false;panel.closed=true;panel.controller?.abort();panel.current_submenu&&closeOne(panel.current_submenu,false);
 const index=stack.indexOf(panel);if(index>=0)stack.splice(index,1);panel.root.remove();
 if(panel.parentMenu){panel.parentMenu.current_submenu=null;panel.parentMenu.lock=false;panel.trigger?.setAttribute('aria-expanded','false')}
 else panel.trigger?.setAttribute?.('aria-expanded','false');
 if(focus&&panel.trigger?.isConnected)panel.trigger.focus?.({preventScroll:true});return true;
}
function closeAll(){let closed=false;while(stack.length)closed=closeOne(stack[stack.length-1],false)||closed;return closed}
function dismiss(){return closeOne(stack[stack.length-1])}
function root(title,kind,trigger,parent,point,target={}){
 const el=document.createElement('div');el.className='comfier-mini-panel';el.id='comfier-mini-panel-'+(++sequence);el.setAttribute('role','menu');el.setAttribute('aria-label',title);el.setAttribute('data-comfier-mini-panel',kind);el.style.visibility='hidden';
 const panel=Object.assign(target,{root:el,kind,trigger,parentMenu:parent||null,point,closed:false,current_submenu:null,lock:false});
 el.style.zIndex=String(Math.min(749,600+(parent?stack.filter(p=>p.kind===kind).length*50:0)));
 if(title){const h=document.createElement('header'),text=document.createElement('span'),close=document.createElement('button');text.textContent=title;close.type='button';close.textContent='×';close.setAttribute('aria-label','Close '+title);close.addEventListener('click',()=>closeOne(panel));h.append(text,close);el.append(h)}
 host.append(el);stack.push(panel);if(parent){parent.current_submenu=panel;parent.lock=true}trigger?.setAttribute?.('aria-expanded','true');return panel;
}
function finish(panel){place(panel);const first=[...panel.root.querySelectorAll('[role^="menuitem"]')].find(el=>!el.disabled&&el.getAttribute('aria-disabled')!=='true')||panel.root.querySelector('button');first?.focus?.({preventScroll:true});return panel}
function separator(panel){const el=document.createElement('hr');el.setAttribute('role','separator');panel.root.append(el)}
function text(value){return typeof value==='function'?String(value()):String(value??'')}
function row(panel,label,item={}){
 const el=document.createElement(item.url?'a':'button');if(el.tagName==='BUTTON')el.type='button';el.setAttribute('role','menuitem');
 if(item.url){el.href=item.url;el.target='_blank';el.rel='noopener noreferrer'}
 const cls=typeof item.class==='function'?item.class():item.class||item.className;if(typeof cls==='string'&&cls)el.className=cls;
 if(typeof item.icon==='string'&&item.icon){const icon=document.createElement('i');icon.className='comfier-mini-icon '+item.icon;icon.setAttribute('aria-hidden','true');el.append(icon)}
 const span=document.createElement('span');span.textContent=text(label);el.append(span);if(item.tooltip)el.title=text(item.tooltip);
 const disabled=!!unref(typeof item.disabled==='function'?item.disabled():item.disabled);if(disabled){el.setAttribute('aria-disabled','true');if(el.tagName==='BUTTON')el.disabled=true;else{el.removeAttribute('href');el.tabIndex=-1}}
 panel.root.append(el);return el;
}
function nativeModel(){
 const source=document.querySelector('.comfy-menu-button-wrapper');let instance=source?.__vueParentComponent;
 while(instance && (instance.type?.__name||instance.type?.name)!=='ComfyMenuButton')instance=instance.parent;
 instance=instance||componentInstance('ComfyMenuButton');
 const seen=new WeakSet(),nodes=[instance?.subTree];
 while(nodes.length){const vnode=nodes.pop();if(!vnode||typeof vnode!=='object'||seen.has(vnode))continue;seen.add(vnode);if(vnode.props?.popup&&Array.isArray(vnode.props.model))return vnode.props.model;if(vnode.component?.subTree)nodes.push(vnode.component.subTree);if(Array.isArray(vnode.children))nodes.push(...vnode.children)}
 // Wait for the full live model rather than silently dropping the native
 // theme/settings/manager additions from the plain core menu registry.
 return null;
}
function renderModel(panel,items){
 for(const item of items||[]){if(!item||unref(typeof item.visible==='function'?item.visible():item.visible)===false)continue;if(item.separator){separator(panel);continue}
 const source=item.originalOption;if(item.heading||source?.type==='category'){const h=document.createElement('h3');h.textContent=text(item.label);h.style.margin='6px 10px';h.style.fontSize='inherit';panel.root.append(h);continue}const childItems=item.items||(source?.hasSubmenu&&source.submenu?source.submenu.map(option=>({label:option.label,icon:option.icon,disabled:option.disabled,command:option.action,originalOption:option})):null);
 const b=row(panel,item.label,item),active=item.comfyCommand?.active;
 if(active){(panel.activeChecks||=[]).push({button:b,active});b.setAttribute('role','menuitemcheckbox');b.setAttribute('aria-checked',!!active());const check=document.createElement('small');check.textContent=active()?'✓':'';b.append(check)}
 const zoomId=item.comfyCommand?.id,zoom=['Comfy.Canvas.ZoomIn','Comfy.Canvas.ZoomOut'].includes(zoomId);
 if(zoom){b.addEventListener('pointerdown',event=>{if(event.button&&event.button!==0)return;event.preventDefault();const key='zoom-'+panel.root.id;let held=true;const stop=()=>{held=false;jobs.cancel(key);document.removeEventListener('pointerup',stop,true);document.removeEventListener('pointercancel',stop,true)};document.addEventListener('pointerup',stop,true);document.addEventListener('pointercancel',stop,true);jobs.own(stop);function tick(){if(!held||panel.closed||stopped){stop();return}Promise.resolve().then(()=>execute(zoomId)).catch(error);jobs.later(key,tick,50)}tick()})}
 const nodesToggle=item.key==='nodes-2.0-toggle';if(nodesToggle){b.setAttribute('role','menuitemcheckbox');b.setAttribute('aria-checked',!!stores()?.get('setting')?.get?.('Comfy.VueNodes.Enabled'))}
 if(childItems){b.setAttribute('aria-haspopup','menu');b.setAttribute('aria-expanded','false');const arrow=document.createElement('small');arrow.textContent='›';b.append(arrow)}
 else if(item.shortcut){const hint=document.createElement('small');hint.textContent=item.shortcut;b.append(hint)}
 else if(item.comfyCommand?.keybinding){const hint=document.createElement('small');hint.textContent=cstore()?.formatKeySequence?.(item.comfyCommand)||'';b.append(hint)}
 b.addEventListener('click',async event=>{if(b.disabled||b.getAttribute('aria-disabled')==='true')return;event.stopPropagation();
  if(childItems){panel.current_submenu&&closeOne(panel.current_submenu,false);const child=root(text(item.label),panel.kind,b,panel,panel.point);renderModel(child,childItems);finish(child);return}
  try{if(zoom){if(!event.detail)await execute(zoomId);return}if(nodesToggle){const s=stores()?.get('setting');await s.set('Comfy.VueNodes.Enabled',!s.get('Comfy.VueNodes.Enabled'));b.setAttribute('aria-checked',!!s.get('Comfy.VueNodes.Enabled'));return}
   const result=item.command?.({item,originalEvent:event});
   if(active){if(result?.then)await result;for(const state of panel.activeChecks||[]){state.button.setAttribute('aria-checked',!!state.active());state.button.querySelector('small').textContent=state.active()?'✓':''}return}
   let ancestor=panel;while(ancestor.parentMenu)ancestor=ancestor.parentMenu;closeOne(ancestor,false);if(result?.then)await result;
  }catch(e){error(e)}
 });
 }
}
function toggleC(trigger){const existing=stack.find(p=>p.name==='C');if(existing){closeAll();return true}closeAll();const panel=root('Comfy menu','rail',trigger);panel.name='C';const model=nativeModel();if(model?.length)renderModel(panel,model);else{const p=document.createElement('p');p.textContent='Menu commands are still loading. Close and reopen this menu.';panel.root.append(p)}finish(panel);return true}
let helpersPromise;
async function helpers(){return helpersPromise ||= (async()=>{
 const urls=performance.getEntriesByType?.('resource')?.map(e=>e.name)||[];
 async function module(prefix){const url=urls.find(u=>{const asset=new URL(u,location.href);return asset.origin===new URL(location.href).origin&&asset.pathname.includes('/assets/')&&asset.pathname.split('/').pop()?.startsWith(prefix)});return url?import(url):null}
 const [external,manager]=await Promise.all([module('useExternalLink-'),module('useConflictDetection-')]);
 // These exports are verified against the user's uploaded frontend. Module URLs
 // come from the current page, never a pinned asset hash or another frontend.
 return{external:external?.t?.(),manager:manager?.a?.(),service:manager?.r};
 })().catch(e=>{helpersPromise=null;throw e})}
async function helpModel(){
 const h=await helpers(),locale=stores()?.get('setting')?.get?.('Comfy.Locale'),docs=h.external?.buildDocsUrl||((path)=>'https://docs.comfy.org'+(['zh','zh-TW'].includes(locale)?'/zh':'')+path),urls=h.external?.staticUrls||{discord:'https://discord.com/invite/comfyorg',github:'https://github.com/Comfy-Org/ComfyUI'};
 const items=[
  {label:translate('helpCenter.feedback','Feedback'),icon:'icon-[lucide--clipboard-pen]',command:()=>execute('Comfy.ContactSupport')},
  {label:translate('helpCenter.help','Help'),icon:'icon-[lucide--message-circle-question]',command:()=>execute('Comfy.ContactSupport')},
  {label:translate('helpCenter.docs','Documentation'),icon:'icon-[lucide--book-open]',url:docs('/',{includeLocale:true})},
  {label:'Discord',icon:'pi pi-discord',url:urls.discord},
  {label:translate('helpCenter.github','GitHub'),icon:'icon-[lucide--github]',url:urls.github},
  {label:translate('helpCenter.managerExtension','Manager'),icon:'icon-[lucide--puzzle]',command:()=>h.manager?.openManager?h.manager.openManager({initialTab:'all',showToastOnLegacyError:false}):execute('Comfy.Manager.CustomNodesManager.ShowCustomNodesMenu')}
 ];
 if(unref(h.manager?.isNewManagerUI))items.push({label:translate('helpCenter.updateComfyUI','Update ComfyUI'),icon:'icon-[lucide--download]',command:async()=>{const service=h.service?.();if(!service)throw Error('ComfyUI update service unavailable');const result=await service.updateComfyUI({is_stable:true});if(result===null||unref(service.error))throw Error(unref(service.error)||'ComfyUI update failed');await service.rebootComfyUI()}});
 const release=stores()?.get('release'),show=stores()?.get('setting')?.get?.('Comfy.Notification.ShowVersionUpdates');
 if(show){if(!release?.releases?.length)await release?.fetchReleases?.();items.push({separator:true},{heading:true,label:translate('helpCenter.whatsNew','What’s new')});for(const item of release?.recentReleases||[]){const slug='v'+String(item.version).replace(/\./g,'-');items.push({label:'Version '+item.version,shortcut:item.published_at?new Date(item.published_at).toLocaleDateString():undefined,url:docs('/changelog',{includeLocale:true})+'#'+slug,command:()=>release.handleShowChangelog(item.version)})}if(!release?.recentReleases?.length)items.push({label:release?.isLoading?'Loading releases…':'No recent releases',disabled:true})}
 return items;
}
async function toggleHelp(trigger){if(stack.some(p=>p.name==='Help')){closeAll();return}closeAll();const panel=root(translate('help.helpCenterMenu','Help'),'rail',trigger);panel.name='Help';const loading=document.createElement('p');loading.textContent='Loading…';panel.root.append(loading);finish(panel);
 try{const model=await helpModel();if(panel.closed||stopped)return;loading.remove();renderModel(panel,model);place(panel)}catch(e){if(!panel.closed){loading.textContent=String(e?.message||e);place(panel)}error(e)}
}
// Compatible renderer for LiteGraph's live background/node/slot menu options.
// Native processContextMenu still chooses actions; its constructor never runs
// for these surfaces, so it cannot create a popup or write native coordinates.
class OwnedContextMenu{
 constructor(values,options={}){
  if(!options.parentMenu)closeAll();const parent=options.parentMenu instanceof OwnedContextMenu?options.parentMenu:null;
  if(parent?.current_submenu)closeOne(parent.current_submenu,false);
  const point={x:options.event?.clientX??options.left??0,y:options.event?.clientY??options.top??0};
  root(options.title||'Canvas menu','canvas',options.event?.currentTarget?.closest?.('[role="menuitem"]')||options.event?.target?.closest?.('[role="menuitem"]'),parent,point,this);
  this.options=options;this.canvas=currentCanvas||parent?.canvas;this.controller=new AbortController();
  for(const value of values||[]){const name=typeof value==='string'?value:value?.content??value?.title??String(value??'');this.addItem(name,value,options)}finish(this);
 }
 containsNode(node,seen=new Set()){if(seen.has(this))return false;seen.add(this);return this.root.contains(node)||!!this.current_submenu?.containsNode(node,seen)}
 addItem(label,value,options=this.options){
  if(value===null){separator(this);return null}
  // Render extension HTML as text, avoiding arbitrary markup injection.
  if(/<[a-z][\s\S]*>/i.test(String(label))){const t=document.createElement('template');t.innerHTML=String(label);label=t.content.textContent||''}
  const button=row(this,translate('contextMenu.'+String(value?.title??label),value?.title??label),typeof value==='object'?value:{});button.classList.add('comfier-context-entry');button.value=value;button.dataset.value=String(value);button.onclick_callback=typeof value==='function'?value:undefined;
  const children=!!(value?.submenu||value?.has_submenu);if(children){button.setAttribute('aria-haspopup','menu');button.setAttribute('aria-expanded','false');const arrow=document.createElement('small');arrow.textContent='›';button.append(arrow)}
  const activate=event=>{if(button.disabled||this.closed)return;event.stopPropagation();this.current_submenu&&closeOne(this.current_submenu,false);let keep=false;
   canvasDepth++;const old=currentCanvas;currentCanvas=this.canvas||old;
   try{if(options.callback?.call(button,value,options,event,this,options.node)===true)keep=true;
    if(typeof value==='object'){if(value.callback&&!options.ignore_item_callbacks&&value.disabled!==true&&value.callback.call(button,value,options,event,this,options.extra)===true)keep=true;
     if(value.submenu){if(!value.submenu.options)throw Error('ContextMenu submenu needs options');new OwnedContextMenu(value.submenu.options,{callback:value.submenu.callback,event,parentMenu:this,ignore_item_callbacks:value.submenu.ignore_item_callbacks,title:value.submenu.title,extra:value.submenu.extra,autoopen:options.autoopen});keep=true}}
    if(!keep&&!this.lock)this.close(event);
   }catch(e){error(e)}finally{currentCanvas=old;canvasDepth--}
  };
  button.addEventListener('click',activate);if(options.autoopen&&value?.has_submenu)button.addEventListener('pointerenter',event=>{if(event.pointerType==='mouse')activate(event)});
  place(this);return button;
 }
 close(event,ignoreParent=false){this.controller.abort();const parent=this.parentMenu;closeOne(this,false);if(parent&&!ignoreParent&&event===undefined)parent.close();}
 getTopMenu(){return this.parentMenu?this.parentMenu.getTopMenu():this}
 getFirstEvent(){return this.parentMenu?this.parentMenu.getFirstEvent():this.options.event}
 static trigger(el,type,detail){const event=new CustomEvent(type,{bubbles:true,cancelable:true,detail});el.dispatchEvent(event);return event}
 static isCursorOverElement(event,el){const r=el.getBoundingClientRect();return event.clientX>r.left&&event.clientX<r.right&&event.clientY>r.top&&event.clientY<r.bottom}
}
const patched=new WeakMap(),vuePatched=new WeakSet();let litegraphPatched=null;
function componentInstance(name){
 const app=document.getElementById('vue-app')?.__vue_app__,seen=new WeakSet(),nodes=[app?._instance?.subTree||document.getElementById('vue-app')?._vnode];
 while(nodes.length){const vnode=nodes.pop();if(!vnode||typeof vnode!=='object'||seen.has(vnode))continue;seen.add(vnode);const instance=vnode.component;if((instance?.type?.__name||instance?.type?.name)===name)return instance;if(instance?.subTree)nodes.push(instance.subTree);if(Array.isArray(vnode.children))nodes.push(...vnode.children);if(vnode.suspense?.activeBranch)nodes.push(vnode.suspense.activeBranch)}return null;
}
function bindVueNodeMenu(){
 // Nodes 2.0 uses a mounted PrimeVue ref rather than LiteGraph's constructor.
 // Block at that ref's show() boundary, before PrimeVue creates its portal.
 const instance=componentInstance('NodeContextMenu'),menu=instance?.refs?.contextMenu;if(!menu||vuePatched.has(menu)||typeof menu.show!=='function')return;
 const original=menu.show;
 function ownedShow(event){
  if(stopped)return original.call(menu,event);
  const open=instance.exposed?.isOpen;if(open&&typeof open==='object'&&'value'in open)open.value=false;
  closeAll();const panel=root('Node menu','canvas',null,null,{x:event.clientX,y:event.clientY});panel.name='Node';
  queueMicrotask(()=>{if(panel.closed||stopped)return;const model=menu.$props?.model||menu.model||instance.subTree?.children?.find?.(node=>Array.isArray(node.props?.model))?.props.model;renderModel(panel,model||[]);finish(panel)});
 }
 menu.show=ownedShow;vuePatched.add(menu);undo.push(()=>{if(menu.show===ownedShow)menu.show=original});
}
function bindCanvas(){
 bindVueNodeMenu();
 const canvas=window.app?.canvas||stores()?.get('canvas')?.canvas,lg=window.LiteGraph||window.comfyAPI?.litegraph?.LiteGraph;
 if(canvas&&typeof canvas.processContextMenu==='function'&&patched.get(canvas)!==canvas.processContextMenu){
  const original=canvas.processContextMenu;
  function wrapped(...args){if(stopped)return Reflect.apply(original,this,args);canvasDepth++;const old=currentCanvas;currentCanvas=this;try{return Reflect.apply(original,this,args)}finally{currentCanvas=old;canvasDepth--}}
  canvas.processContextMenu=wrapped;patched.set(canvas,wrapped);undo.push(()=>{if(canvas.processContextMenu===wrapped)canvas.processContextMenu=original});
 }
 if(!lg?.ContextMenu||litegraphPatched?.lg===lg&&litegraphPatched.proxy===lg.ContextMenu)return;
 const original=lg.ContextMenu,proxy=new Proxy(original,{construct(target,args,newTarget){return !stopped&&(canvasDepth||args[1]?.parentMenu instanceof OwnedContextMenu)?new OwnedContextMenu(...args):Reflect.construct(target,args,newTarget)}});
 lg.ContextMenu=proxy;litegraphPatched={lg,proxy};undo.push(()=>{if(lg.ContextMenu===proxy)lg.ContextMenu=original});
}
function launcher(target){const direct=target?.closest?.('button.comfier-edge-menu,.comfy-menu-button-wrapper,[data-testid="help-center-button"],.comfy-help-center-btn');if(direct)return direct;const button=target?.closest?.('.side-bar-button,button,[role="button"]');if(!button||!rail(button)?.contains(button))return null;const names=[button.getAttribute('aria-label'),button.getAttribute('title'),button.getAttribute('data-testid')].filter(Boolean).map(s=>s.trim().toLowerCase());return names.some(name=>/^(help|help center|help-center-button)$/.test(name))||button.querySelector('[class*="circle-help"],[class*="help-circle"],[class*="question-circle"]')?button:null}
// This owned launcher does not use native or browser tooltip presentation.
const helpTooltipHomes=new Map();
function retireHelpTooltip(button){
 if(!button)return;
 if(!helpTooltipHomes.has(button))helpTooltipHomes.set(button,{disabled:button.$_ptooltipDisabled,title:button.getAttribute('title')});
 button.$_ptooltipDisabled=true;button.removeAttribute('title');
 const ids=new Set([button.$_ptooltipId,button.$_ptooltipIdAttr,...(button.getAttribute('aria-describedby')||'').split(/\s+/)]);
 for(const id of ids){if(!id)continue;const popup=document.getElementById(id);if(popup?.matches?.('.p-tooltip,[role="tooltip"]')){popup.remove();const remaining=(button.getAttribute('aria-describedby')||'').split(/\s+/).filter(x=>x&&x!==id);if(remaining.length)button.setAttribute('aria-describedby',remaining.join(' '));else button.removeAttribute('aria-describedby')}}
 button.$_ptooltipId=null;
}
function retireHelpEvent(event){const button=launcher(event.target);if(button&&!button.matches('button.comfier-edge-menu,.comfy-menu-button-wrapper'))retireHelpTooltip(button)}
for(const name of ['pointerdown','pointerover','mouseover','mouseenter','focus'])jobs.listen(window,name,retireHelpEvent,true);
for(const button of document.querySelectorAll('[data-testid="help-center-button"],.comfy-help-center-btn'))retireHelpTooltip(button);
undo.push(()=>{for(const [button,home]of helpTooltipHomes){if(button.$_ptooltipDisabled===true){if(home.disabled===undefined)delete button.$_ptooltipDisabled;else button.$_ptooltipDisabled=home.disabled}if(home.title!==null&&!button.hasAttribute?.('title'))button.setAttribute('title',home.title)}helpTooltipHomes.clear()});
function capture(event){const trigger=launcher(event.target);if(!trigger||trigger.closest(ROOT))return;
 if(window.__comfierLayoutEditor?.snapshot?.().editing)return;
 event.preventDefault();event.stopImmediatePropagation();
 if(trigger.matches('button.comfier-edge-menu,.comfy-menu-button-wrapper'))toggleC(trigger);else{retireHelpTooltip(trigger);toggleHelp(trigger);}
}
jobs.listen(document,'click',capture,true);
jobs.listen(document,'pointerdown',event=>{bindCanvas();if(stack.length&&!host.contains(event.target)&&!launcher(event.target))closeAll()},true);
jobs.listen(document,'keydown',event=>{
 bindCanvas();if(!stack.length)return;
 if(event.key==='Escape'){event.preventDefault();event.stopImmediatePropagation();dismiss();return}
 const panel=stack[stack.length-1];if(!panel.root.contains(event.target))return;const buttons=[...panel.root.querySelectorAll('[role^="menuitem"]')].filter(el=>!el.disabled&&el.getAttribute('aria-disabled')!=='true');let i=buttons.indexOf(document.activeElement);
 if(['ArrowDown','ArrowUp','Home','End'].includes(event.key)){event.preventDefault();event.stopImmediatePropagation();if(i<0&&event.key==='ArrowUp')i=0;i=event.key==='Home'?0:event.key==='End'?buttons.length-1:(i+(event.key==='ArrowDown'?1:-1)+buttons.length)%buttons.length;buttons[i]?.focus()}
 if(event.key==='ArrowRight'&&event.target.getAttribute?.('aria-haspopup')==='menu'){event.preventDefault();event.stopImmediatePropagation();event.target.click()}
 if(event.key==='ArrowLeft'&&panel.parentMenu){event.preventDefault();event.stopImmediatePropagation();dismiss()}
},true);
function refresh(){stack.forEach(place);bindCanvas()}
for(const e of ['resize','orientationchange','comfier-layout-side-change','comfier-layout-editor-change'])jobs.listen(window,e,refresh);
jobs.listen(document,'scroll',()=>stack.forEach(place),true);if(window.visualViewport){jobs.listen(window.visualViewport,'resize',refresh);jobs.listen(window.visualViewport,'scroll',refresh)}
// Both native Back and the page's minimum=100 chain must close menus first.
function back(){const top=stack[stack.length-1];if(!top)return false;const above=[...document.querySelectorAll('[role="dialog"],.p-dialog-mask,.p-popover,.p-menu,.p-tieredmenu,.p-contextmenu,.p-select-overlay,.litecontextmenu,[data-reka-popper-content-wrapper],[data-radix-popper-content-wrapper],#comfier-owned-feed-preview,#comfier-owned-canvas-zoom,#comfier-owned-run-options')].some(el=>!host.contains(el)&&visible(el)&&window.__comfierLayers?.compare?.(el,top.root)>0);return above?false:dismiss()}
jobs.own(window.__comfierBack.register('mini-panels',19,back));jobs.own(window.__comfierBack.register('mini-panels-page',101,back));
if(window.__comfierDocument?.subscribe)jobs.own(window.__comfierDocument.subscribe('mini-panels-canvas','canvas',bindCanvas));
jobs.burst('startup',bindCanvas,[0,80,300,1000]);bindCanvas();
window.__comfierMiniPanels={toggleC,toggleHelp,close:closeAll,closeTop:dismiss,refresh,geometry:{laneBounds,placement,railSpawn},nativeModel,OwnedContextMenu,snapshot:()=>({open:stack.map(p=>({name:p.name||p.options?.title||'Canvas menu',kind:p.kind,rect:rect(p.root)}))}),remove(){if(stopped)return;stopped=true;closeAll();jobs.dispose();undo.reverse().forEach(fn=>fn());authority.unregisterOwned('miniPanels',host);document.documentElement.classList.remove('comfier-mini-panels-owned');style.remove();delete window.__comfierMiniPanels}};
})();
