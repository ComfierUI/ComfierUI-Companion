(()=>{
'use strict';if(window.__comfierConnectedSidebar)return;
const jobs=window.__comfierRuntime.scope('connected-sidebar'),ID='comfier-owned-connected-sidebar';
let host=null,native=null,home=null,layoutBox=null,layoutGroup=null,rows=null,stopped=false;const copies=new Map();
const mode=()=>window.__comfierViewport?.mode();
const MODE_KEY='comfier.sidebar-mode.v1';let preference=localStorage.getItem(MODE_KEY)||'responsive',lastNative,unsubscribe=null,eventSource=null;
function enabled(){return preference==='connected'||preference!=='floating'&&mode()==='outerLandscape'}
function nativeStyle(){const modern=window.app?.extensionManager?.setting,legacy=window.app?.ui?.settings;return window.__comfierUi?.pinia?.()?._s?.get('setting')?.get?.('Comfy.Sidebar.Style')??modern?.get?.('Comfy.Sidebar.Style')??legacy?.getSettingValue?.('Comfy.Sidebar.Style')}
function selectMode(value){if(!['connected','floating'].includes(value))return;preference=value;localStorage.setItem(MODE_KEY,value);window.dispatchEvent(new Event('comfier-sidebar-mode-change'));window.__comfierUnifiedSidebarTest?.refresh?.();window.__comfierRequestLayout?.();refresh();window.__comfierLayoutEditor?.refresh?.()}
function bindMode(){const store=window.__comfierUi?.pinia?.()?._s?.get('setting');if(!unsubscribe&&store?.$subscribe)unsubscribe=store.$subscribe(()=>{const value=nativeStyle();if(lastNative!==undefined&&value!==lastNative)selectMode(value);lastNative=value},{detached:true,flush:'sync'});const source=window.app?.ui?.settings;if(source!==eventSource){eventSource?.removeEventListener?.('Comfy.Sidebar.Style.change',onMode);eventSource=source;eventSource?.addEventListener?.('Comfy.Sidebar.Style.change',onMode)}if(lastNative===undefined)lastNative=nativeStyle()}
function onMode(event){selectMode(event?.detail?.value??nativeStyle())}
jobs.listen(document,'change',event=>{const row=event.target?.closest?.('[data-setting-id="Comfy.Sidebar.Style"],[id="Comfy.Sidebar.Style"],.setting-item,.settings-row');if(row&&(row.getAttribute('data-setting-id')==='Comfy.Sidebar.Style'||/sidebar style/i.test(row.textContent||'')))jobs.later('mode-setting',()=>selectMode(nativeStyle()),60)},true);
function canvasBounds(){const tabs=document.querySelector('#topbar-workflow-tabs,[data-testid="topbar-workflow-tabs"]'),top=tabs?Math.max(tabs.getBoundingClientRect().bottom,...[...tabs.children].map(el=>el.getBoundingClientRect().bottom)):document.querySelector('#graph-canvas-container')?.getBoundingClientRect().top||0;return{left:0,right:innerWidth,top:Math.ceil(top),bottom:innerHeight}}

const style=document.createElement('style');style.id=ID+'-style';style.textContent=`
html body #${ID}{position:fixed;display:flex;flex-direction:column;align-items:stretch;box-sizing:border-box;overflow:auto;overscroll-behavior:contain;touch-action:pan-y;pointer-events:auto;z-index:var(--comfier-z-sidebar,250);border:1px solid var(--comfier-button-frame,var(--interface-stroke,#3b4554));border-radius:6px;background:var(--comfy-menu-bg,#171717);padding:8px}
/* Native Vue controls are action sources only; owned copies receive input/layout. */
html:root body #${ID} [data-comfier-sidebar-source]{display:none!important;pointer-events:none!important}
html:root body #${ID}>.sidebar-item-group{display:block!important;position:relative;overflow:auto;overscroll-behavior:contain;box-sizing:border-box;scrollbar-width:none}
html:root body #${ID} .side-bar-button-content,html:root body #${ID} .sidebar-icon-wrapper{display:flex;align-items:center;justify-content:center;gap:0}
html:root body #${ID} .side-bar-button-label{display:none!important}
html:root body #${ID} .side-bar-button{touch-action:manipulation}
html:root body #${ID} button.comfier-edge-menu{display:flex;align-items:center;justify-content:center;background:transparent;color:var(--comfier-icon-color,#fff);padding:0;border:0;cursor:pointer}
html:root body #${ID} button.comfier-edge-menu:active{background:color-mix(in srgb,var(--comfier-icon-color,#fff) 14%,transparent)}
html:root body #${ID} .side-bar-button :is(i,svg){pointer-events:none;margin:0;flex-shrink:0}
`;
document.head.append(style);
function candidates(){return [...document.querySelectorAll('nav.side-tool-bar-container')].filter(el=>el!==native&&!el.closest('#'+ID)&&!el.closest('.sidebar-content-container,.comfier-early-floating-panel,#comfier-apps-panel')&&el.querySelectorAll('.side-bar-button').length>=2).sort((a,b)=>b.querySelectorAll('.side-bar-button').length-a.querySelectorAll('.side-bar-button').length)}
function invoke(source,event){
 const key=Reflect.ownKeys(source).find(k=>String(k)==='Symbol(_vei)'),invokers=source[key]||source._vei,handler=invokers?.onClick?.value;
 if(handler){for(const fn of Array.isArray(handler)?handler:[handler])if(typeof fn==='function')fn(event)}else source.click();
}
function syncCopies(){
 const sources=[...native.querySelectorAll('.comfy-menu-button-wrapper,.side-bar-button')].filter(el=>!el.matches('button.templates-tab-button,.comfier-native-settings-source')&&!/^Settings\b/i.test([el.getAttribute('aria-label'),el.getAttribute('title')].filter(Boolean).join(' ').trim())&&!el.closest('[data-comfier-native-menu-source]'));
 // EdgeBar may have marked the retained C source before takeover.
 const logo=native.querySelector('.comfy-menu-button-wrapper');if(logo&&!sources.includes(logo))sources.unshift(logo);
 for(const source of sources){let record=copies.get(source);const isC=source.matches('.comfy-menu-button-wrapper');
  if(!record){const button=document.createElement('button');button.type='button';button.className=isC?'comfier-edge-menu side-bar-button':source.className;button.setAttribute('data-comfier-sidebar-copy','');
   const content=isC?source.querySelector('svg'):source; if(isC){if(content)button.append(content.cloneNode(true))}else for(const child of [...source.childNodes])button.append(child.cloneNode(true));
   for(const attribute of [...(source.attributes||[])])if(attribute.name.startsWith('data-v-'))button.setAttribute(attribute.name,attribute.value);
   for(const key of ['aria-label','data-testid']){const value=source.getAttribute(key);if(value!==null)button.setAttribute(key,value)}
   if(isC)button.setAttribute('aria-label','Comfy menu');const originalId=source.id;if(originalId){button.id=originalId;source.removeAttribute('id')}
   record={button,originalId};copies.set(source,record);rows.append(button);
   button.addEventListener('click',event=>{if(button.disabled||event.defaultPrevented)return;if(isC)window.__comfierMiniPanels?.toggleC(button);else if(button.matches('.comfy-help-center-btn,[data-testid="help-center-button"]'))window.__comfierMiniPanels?.toggleHelp(button);else invoke(source,event);jobs.burst('selection',refresh,[0,60,180])});
  }
  const button=record.button;button.disabled=!!source.disabled;
  if(button.hasAttribute('data-comfier-panel-launcher')){window.__comfierSidePanels?.refresh();continue}
  for(const name of ['side-bar-button-selected','comfy-remote-multiselect-toggle'])button.classList.toggle(name,source.classList.contains(name));
  for(const key of ['aria-pressed','aria-expanded']){const value=source.getAttribute(key);if(value===null){if(button.hasAttribute(key))button.removeAttribute(key)}else if(button.getAttribute(key)!==value)button.setAttribute(key,value)}
  const badges=source.querySelectorAll('.sidebar-icon-wrapper span'),owned=button.querySelectorAll('.sidebar-icon-wrapper span');badges.forEach((badge,i)=>{if(owned[i]&&owned[i].textContent!==badge.textContent)owned[i].textContent=badge.textContent});
 }
 for(const [source,record]of copies)if(!native.contains(source)||!sources.includes(source)){record.button.remove();copies.delete(source)}
}
function release(){
 if(!host)return;
 window.__comfierEdgeBar?.detach();
 for(const [source,record]of copies)if(record.originalId)source.id=record.originalId;copies.clear();native?.removeAttribute('data-comfier-sidebar-source');
 if(native?.isConnected&&home?.parent?.isConnected){if(home.next?.parentElement===home.parent)home.parent.insertBefore(native,home.next);else home.parent.append(native)}
 host.remove();host=null;native=null;home=null;layoutBox=null;layoutGroup=null;rows=null;document.documentElement.removeAttribute('data-comfier-connected-owned');
}
function refresh(){
 if(stopped)return;bindMode();
 if(!enabled()){release();return}
 if(native&&(!native.isConnected||!home?.parent?.isConnected))release();
 if(!host){const source=candidates()[0];if(!source)return;host=document.createElement('nav');host.id=ID;host.setAttribute('aria-label','Comfier sidebar');host.setAttribute('data-comfier-connected-sidebar','');host.setAttribute('data-comfier-edge-flow','vertical');home={parent:source.parentElement,next:source.nextSibling};native=source;document.body.append(host);rows=document.createElement('div');rows.className='sidebar-item-group comfier-unified-floating-rail';host.append(rows);native.setAttribute('data-comfier-sidebar-source','');host.append(native);syncCopies();window.__comfierEdgeBar?.attachConnected(host);document.documentElement.setAttribute('data-comfier-connected-owned','');document.documentElement.classList.remove('comfier-connected-landscape');}
 syncCopies();window.__comfierEdgeBar?.layout();
 // A frame-safe fallback while editor discovery catches up; its lease wins.
 if(!window.__comfierLayoutEditor?.owns?.(host)){
  const bounds=canvasBounds(),top=bounds.top,width=48,height=Math.max(32,bounds.bottom-top),left=window.__comfierLayoutSide?.side()==='right'?bounds.right-width:bounds.left;
  for(const [key,value]of Object.entries({left:left+'px',right:'auto',top:top+'px',bottom:'auto',width:width+'px',height:height+'px','max-height':height+'px',zoom:'1'}))window.__comfierUiAuthority.write(host,key,value,'edge-bar');
 }
}
function setLayout(box,group){layoutBox=box?{...box}:null;layoutGroup=group?{...group}:null;host?.setAttribute('data-comfier-edge-flow',group?.flow||'vertical')}
function bounds(){if(!host)return null;if(layoutBox)return{...layoutBox};if(window.__comfierLayoutEditor?.owns?.(host))return null;const r=host.getBoundingClientRect();return r.width>0&&r.height>0?r:null}
function anchor(trigger){const id=trigger?.dataset?.ufuControl,snapshot=window.__comfierLayoutEditor?.snapshot?.();if(id){const group=snapshot?.groups?.find(g=>g.items.includes(id));if(group){const shell=[...document.querySelectorAll('.ufu-shell')].find(el=>el.dataset.container===group.id);if(shell){shell.setAttribute('data-comfier-edge-flow',group.flow);return shell}}}return host}
window.__comfierConnectedSidebar={refresh,release,enabled,canvasBounds,rows:()=>rows,root:()=>host,bounds,anchor,setLayout,snapshot:()=>({active:!!host,adopted:!!native,buttons:copies.size,box:layoutBox,group:layoutGroup?.id}),remove(){stopped=true;release();unsubscribe?.();eventSource?.removeEventListener?.('Comfy.Sidebar.Style.change',onMode);jobs.dispose();style.remove();delete window.__comfierConnectedSidebar}};
})();
