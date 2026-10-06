(()=>{
'use strict';if(window.__comfierEdgeBar)return;
const MIN_BUTTON=window.__comfierUiAuthority?.minimums?.buttonHeight||32,PADDING=8,MIN_BAR=MIN_BUTTON+PADDING*2;
const jobs=window.__comfierRuntime.scope('edge-bar'),KEY='comfier.edge-bar.v1';let root=null,preview=null,editor=false,hit=null,gesture=null,stopped=false,saved={};const originals=new Map();let layoutBox=null;let nativeMenu=null,menuButton=null,rootKind='floatingRail';
try{const value=JSON.parse(localStorage.getItem(KEY)||'{}');if(value&&typeof value==='object'&&!Array.isArray(value))saved=value}catch(_){}
const mode=()=>window.__comfierViewport?.mode()||'innerPortrait';
const connected=()=>window.__comfierConnectedSidebar?.enabled?.()??mode()==='outerLandscape';
const side=()=>preview||window.__comfierLayoutSide?.side()||'left';
function bounds(){const tabs=document.querySelector('#topbar-workflow-tabs,[data-testid="topbar-workflow-tabs"]');const top=tabs?Math.max(...[tabs,...tabs.children].map(e=>e.getBoundingClientRect().bottom)):0;return{top:top+4,bottom:innerHeight-4,height:Math.max(32,innerHeight-top-8)}}
function write(el,k,v){if(!originals.has(el))originals.set(el,new Map());const props=originals.get(el);if(!props.has(k))props.set(k,[el.style.getPropertyValue(k),el.style.getPropertyPriority(k)]);window.__comfierUiAuthority?.write(el,k,v,'edge-bar')}
const style=document.createElement('style');style.id='comfier-edge-bar-style';style.textContent=`
html:root body [data-comfier-retired-settings-source]{display:none!important;visibility:hidden!important;pointer-events:none!important}
nav.side-tool-bar-container:has([data-comfier-edge-bar]){overflow:visible!important;transition:none!important}
nav.side-tool-bar-container:has([data-comfier-edge-bar])>div{overflow:visible!important}
[data-comfier-edge-bar]{box-sizing:border-box!important;display:flex!important;flex-direction:column!important;padding:0 8px!important;margin:0!important;gap:0!important;overflow:visible!important;align-items:stretch!important;justify-content:stretch!important;z-index:var(--comfier-z-sidebar,250)!important}
[data-comfier-edge-bar]>*{flex:1 1 0!important;min-height:${MIN_BUTTON}px!important;max-height:none!important;margin:0!important;width:100%!important;min-width:${MIN_BUTTON}px!important;max-width:none!important;box-sizing:border-box!important;align-items:stretch!important;justify-content:center!important}
[data-comfier-edge-bar] .side-bar-button{width:100%!important;min-width:${MIN_BUTTON}px!important;max-width:none!important;height:100%!important;min-height:${MIN_BUTTON}px!important;max-height:none!important;flex:1 1 auto!important;align-items:center!important;justify-content:center!important;box-sizing:border-box!important;zoom:1!important;scale:1!important;transform:none!important;transition-property:color,background-color,border-color!important}
[data-comfier-edge-bar] .comfy-menu-button-wrapper>button{width:100%!important;height:100%!important;min-width:${MIN_BUTTON}px!important;min-height:${MIN_BUTTON}px!important;display:flex!important;align-items:center!important;justify-content:center!important}
[data-comfier-edge-bar] [data-testid="comfier-app-settings-tab-button"]{display:flex!important;align-items:center!important;justify-content:center!important}
[data-comfier-edge-bar] [data-testid="comfier-app-settings-tab-button"] :is(svg,i){margin-block:0!important;align-self:center!important}
[data-comfier-edge-bar]>:is(div,span):empty,[data-comfier-edge-bar]>[data-comfier-native-menu-source],[data-comfier-edge-bar] button.templates-tab-button{display:none!important}
[data-comfier-edge-bar]>*{padding-block:0!important;justify-content:center!important;gap:0!important}
[data-comfier-edge-bar]>button.comfier-edge-menu{display:flex!important;align-items:center!important;justify-content:center!important;background:transparent!important;color:var(--comfier-icon-color,#fff)!important;padding:0!important}
[data-comfier-edge-bar]>button.comfier-edge-menu{pointer-events:auto!important;touch-action:manipulation!important;cursor:pointer;border-radius:var(--radius-lg,8px);outline-offset:2px}
[data-comfier-edge-bar]>button.comfier-edge-menu:active{background:color-mix(in srgb,var(--comfier-icon-color,#fff) 14%,transparent)!important}
.comfier-edge-menu svg{width:var(--comfier-edge-menu-icon-width,16px)!important;height:var(--comfier-edge-menu-icon-height,16px)!important;display:block;flex:0 0 auto;margin:0!important;transform:none!important;fill:currentColor;pointer-events:none}
[data-comfier-edge-bar] .comfy-menu-button-wrapper>div{display:flex!important;align-items:stretch!important;flex:1 1 auto!important;height:100%!important;min-height:${MIN_BUTTON}px!important}
[data-comfier-edge-bar] .side-bar-button{border:1px solid var(--comfier-button-frame,var(--interface-stroke,#fff))!important;border-radius:6px!important;padding:0!important;background:transparent;color:var(--comfier-icon-color,#fff)}
[data-comfier-edge-bar] .side-bar-button-content,[data-comfier-edge-bar] .sidebar-icon-wrapper{display:flex;align-items:center;justify-content:center;gap:0}
[data-comfier-edge-bar] .side-bar-button-label{display:none!important}
.ufu-edge-hit{position:fixed;z-index:1003;background:transparent;border:1px dashed var(--comfier-icon-color,#fff);border-radius:8px;touch-action:none;cursor:move;padding:0}.ufu-edge-resize{position:absolute;right:0;bottom:0;width:28px;height:28px;background:transparent;border:0;color:var(--comfier-icon-color,#fff);touch-action:none;padding:0}.ufu-edge-resize svg{width:100%;height:100%;stroke:currentColor;fill:none;stroke-width:2}
`;document.head.appendChild(style);
function restoreMenu(){menuButton?.remove();menuButton=null;nativeMenu?.removeAttribute('data-comfier-native-menu-source');nativeMenu=null}
function menuRoot(){return rootKind==='connectedRail'?root?.querySelector('.sidebar-item-group'):root}
function menuWrapper(){
 const source=[...(menuRoot()?.children||[])].find(e=>e.matches?.('.comfy-menu-button-wrapper')||e.querySelector?.('.comfy-menu-button-wrapper'));
 return source?.matches?.('.comfy-menu-button-wrapper')?source:source?.querySelector('.comfy-menu-button-wrapper');
}
function nativeMenuClick(e){
 e.preventDefault();e.stopImmediatePropagation();
 if(!window.__comfierMiniPanels){console.warn('COMFIER C menu: owned mini-panel controller is still loading');return}
 window.__comfierMiniPanels.toggleC(e.currentTarget);
}
function syncMenuIcon(){
 if(!menuButton)return;
 const peers=[...(root?.querySelectorAll?.('.side-bar-button svg,.side-bar-button i')||[])];
 const peer=peers.find(el=>!menuButton.contains(el)&&el.getBoundingClientRect().width>0&&el.getBoundingClientRect().height>0);
 if(!peer)return;
 const css=getComputedStyle(peer);
 for(const [axis,key]of [['width','--comfier-edge-menu-icon-width'],['height','--comfier-edge-menu-icon-height']]){
  const value=parseFloat(css[axis]);if(value>0&&Number.isFinite(value)&&menuButton.style.getPropertyValue(key)!==value+'px')menuButton.style.setProperty(key,value+'px');
 }
}
function obsoleteSettings(button){return button?.classList?.contains('comfier-native-settings-source')||/^Settings\b/i.test([button?.getAttribute?.('aria-label'),button?.getAttribute?.('title')].filter(Boolean).join(' ').trim())}
function reconcileRows(){
 const container=menuRoot();if(!container)return;for(const button of container.querySelectorAll('.side-bar-button'))if(obsoleteSettings(button))button.setAttribute('data-comfier-retired-settings-source','');const source=[...container.children].find(e=>e.matches?.('.comfy-menu-button-wrapper')||e.querySelector?.('.comfy-menu-button-wrapper'));
 if(source!==nativeMenu){restoreMenu();if(source){
  nativeMenu=source;source.setAttribute('data-comfier-native-menu-source','');
  menuButton=document.createElement('button');menuButton.type='button';
  menuButton.className='comfier-edge-menu side-bar-button';menuButton.setAttribute('aria-label','Comfy menu');
  const logo=menuWrapper()?.querySelector('svg');
  if(logo?.cloneNode){const icon=logo.cloneNode(true);icon.setAttribute('class','comfier-edge-menu-icon');icon.setAttribute('aria-hidden','true');icon.setAttribute('focusable','false');menuButton.appendChild(icon)}
  else menuButton.innerHTML='<svg viewBox="0 3 18 18" aria-hidden="true"><path d="M17 3H9L6 8H3L1 16H5L4 21H13L16 16H9L11 8H16Z"/></svg>';
  menuButton.addEventListener('click',nativeMenuClick,true);container.insertBefore(menuButton,source);
 }}
 syncMenuIcon();
}
function geometry(){const b=bounds(),m=mode(),cfg=saved[m]||{};const count=[...(menuRoot()?.children||[])].filter(e=>!e.hasAttribute('data-comfier-native-menu-source')&&!e.hasAttribute('data-comfier-retired-settings-source')&&!obsoleteSettings(e)&&!e.matches?.('button.templates-tab-button')).length||1;const width=Math.min(Math.max(MIN_BAR,Number(cfg.width)||80),Math.max(MIN_BAR,innerWidth/3));const height=Math.min(b.height,Math.max(Math.min(b.height,count*MIN_BUTTON+Math.max(0,count-1)*4+16),Number(cfg.height)||b.height*.8));const left=side()==='right'?innerWidth-width-4:4,top=b.top+(b.height-height)/2;return{left,top,width,height,right:left+width,bottom:top+height}}
function overlay(b){if(!editor||!root||!b){hit?.remove();hit=null;return}if(!hit){hit=document.createElement('div');hit.className='ufu-edge-hit';hit.setAttribute('role','button');hit.setAttribute('aria-label','Move edge bar');hit.addEventListener('pointerdown',e=>start(e,false));const resize=document.createElement('button');resize.className='ufu-edge-resize';resize.setAttribute('aria-label','Resize edge bar');resize.innerHTML='<svg viewBox="0 0 28 28"><path d="M8 23H23V8M14 23L23 14"/></svg>';resize.addEventListener('pointerdown',e=>start(e,true));hit.appendChild(resize);document.body.appendChild(hit)}Object.assign(hit.style,{left:b.left+'px',top:b.top+'px',width:b.width+'px',height:b.height+'px'})}
function layout(){if(root)reconcileRows();if(stopped||!root?.isConnected||rootKind==='connectedRail'){overlay(null);return}if(window.__comfierLayoutEditor?.owns?.(root)){overlay(null);return}const b=geometry();write(root,'padding','8px');write(root,'gap','4px');for(const button of root.querySelectorAll('.side-bar-button')){if(obsoleteSettings(button))continue;write(button,'border-radius','6px');write(button,'border-width','1px');write(button,'border-style','solid');write(button,'border-color','var(--comfier-button-frame,var(--interface-stroke,#fff))')}for(const[k,v]of Object.entries({position:'fixed',left:b.left+'px',right:'auto',top:b.top+'px',bottom:'auto',width:b.width+'px','min-width':MIN_BAR+'px','max-width':'none',height:b.height+'px','min-height':'0','max-height':'none',transform:'none',zoom:'1'}))write(root,k,v);overlay(b)}
function attach(el){if(root!==el||rootKind!=='floatingRail'){detach();root=el;rootKind='floatingRail'}if(!root||connected())return false;window.__comfierUiAuthority?.registerOwned(rootKind,root,'edge-bar');root.setAttribute('data-comfier-owned-rail','');root.setAttribute('data-comfier-edge-bar','');layout();return true}
function attachConnected(el){if(root!==el||rootKind!=='connectedRail'){detach();root=el;rootKind='connectedRail'}if(!root)return false;window.__comfierUiAuthority?.registerOwned(rootKind,root,'edge-bar');root.setAttribute('data-comfier-owned-rail','');root.setAttribute('data-comfier-edge-bar','');layout();return true}
function detach(){restoreMenu();hit?.remove();hit=null;gesture=null;preview=null;if(root){for(const[el,props]of originals)for(const[k,[v,p]]of props){if(v)el.style.setProperty(k,v,p);else el.style.removeProperty(k)}originals.clear();root.removeAttribute('data-comfier-edge-bar');window.__comfierUiAuthority?.unregisterOwned(rootKind,root)}root=null;layoutBox=null}
function start(e,resizing){if(!editor||connected()||e.isPrimary===false)return;e.preventDefault();e.stopImmediatePropagation();gesture={id:e.pointerId,target:e.currentTarget,x:e.clientX,y:e.clientY,resizing,b:geometry(),previous:saved[mode()]?{...saved[mode()]}:null,mode:mode()};gesture.target.setPointerCapture?.(e.pointerId)}
function move(e){if(!gesture||gesture.id!==e.pointerId)return;e.preventDefault();e.stopImmediatePropagation();if(mode()!==gesture.mode){end({...e,type:'pointercancel'});return}if(gesture.resizing){const dx=(e.clientX-gesture.x)*(side()==='right'?-1:1),dy=(e.clientY-gesture.y)*2;saved[mode()]={width:Math.max(MIN_BAR,gesture.b.width+dx),height:Math.max(MIN_BUTTON,gesture.b.height+dy)}}else{const lane=Math.min(innerWidth/3,geometry().width+28);preview=e.clientX<=lane?'left':e.clientX>=innerWidth-lane?'right':null;}layout();window.__comfierLayoutEditor?.refresh()}
async function end(e){if(!gesture||gesture.id!==e.pointerId)return;e.preventDefault?.();e.stopImmediatePropagation?.();const g=gesture;gesture=null;try{g.target.releasePointerCapture?.(e.pointerId)}catch(_){}if(e.type==='pointercancel'){if(g.previous)saved[g.mode]=g.previous;else delete saved[g.mode];preview=null;layout();window.__comfierLayoutEditor?.refresh();return}const next=preview;preview=null;if(g.resizing)localStorage.setItem(KEY,JSON.stringify(saved));else if(next&&next!==window.__comfierLayoutSide?.side())await window.__comfierLayoutSide?.setNativeSide(next==='right');layout();window.__comfierLayoutEditor?.refresh()}
jobs.listen(document,'pointermove',move,{capture:true,passive:false});jobs.listen(document,'pointerup',end,{capture:true,passive:false});jobs.listen(document,'pointercancel',end,{capture:true,passive:false});jobs.listen(window,'resize',()=>{if(gesture)end({pointerId:gesture.id,type:'pointercancel'});layout()});jobs.listen(window,'comfier-layout-side-change',layout);
window.__comfierEdgeBar={attach,attachConnected,detach,layout,root:()=>rootKind==='floatingRail'?root:null,setLayout:box=>{layoutBox=box?{...box}:null},rect:()=>rootKind==='connectedRail'?window.__comfierConnectedSidebar?.bounds?.():root?.isConnected&&!connected()?(layoutBox||geometry()):null,edit(value){editor=!!value;if(!editor&&gesture)end({pointerId:gesture.id,type:'pointercancel'});layout()},snapshot:()=>({side:side(),mode:mode(),editing:editor,rect:root?geometry():null}),remove(){stopped=true;detach();jobs.dispose();style.remove();delete window.__comfierEdgeBar}};
})();
