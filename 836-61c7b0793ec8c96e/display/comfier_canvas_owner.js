(function(){
'use strict';if(window.__comfierCanvasOwner)return;
const runtime=window.__comfierRuntime,jobs=runtime.scope('canvas-owner'),authority=window.__comfierUiAuthority;
const toolbar=document.createElement('div');toolbar.id='comfier-owned-canvas-toolbar';toolbar.setAttribute('role','toolbar');toolbar.setAttribute('aria-label','Canvas Toolbar');toolbar.setAttribute('data-comfier-owned-canvas','');
const controls=new Map(),retired=new Map(),subscriptions=new Map();let stopped=false,popup=null,percentInput=null,repeat=null,zoomLabel=null;
let prevention=null,fallbackObserver=null;
const specs=[['mode','Canvas Mode','Canvas_Mode',null,'icon-[lucide--mouse-pointer-2]'],['fit','Fit View','Fit_View____','Comfy.Canvas.FitView','icon-[lucide--focus]'],['zoom','Zoom Controls','zoom-controls-button',null,null],['minimap','Toggle Minimap','toggle-minimap-button','Comfy.Canvas.ToggleMinimap','icon-[lucide--map]'],['links','Toggle Link Visibility','toggle-link-visibility-button','Comfy.Canvas.ToggleLinkVisibility','icon-[lucide--route-off]']];
const style=document.createElement('style');style.id='comfier-canvas-owner-style';style.textContent=`
html body [role="toolbar"][aria-label="Canvas Toolbar"]:not([data-comfier-owned-canvas]){display:none!important;visibility:hidden!important;pointer-events:none!important}
html body [data-comfier-canvas-retired]{display:none!important;visibility:hidden!important;pointer-events:none!important}
html body #comfier-owned-canvas-toolbar{position:fixed;display:flex;align-items:center;gap:4px;width:max-content;max-width:calc(100vw - 8px);height:50px;padding:8px;box-sizing:border-box;margin:0;border:1px solid var(--comfier-container-frame,var(--interface-stroke,#3b4554));border-radius:10px;background:var(--comfier-container-paint,var(--comfy-menu-bg,#171717));overflow:visible;pointer-events:auto;z-index:var(--comfier-z-workspace,200)}
html body #comfier-owned-canvas-toolbar>button{display:flex;align-items:center;justify-content:center;gap:4px;flex:none;width:auto;height:auto;min-height:${window.__comfierUiAuthority.minimums.buttonHeight}px;min-width:${window.__comfierUiAuthority.minimums.squareWidth}px;box-sizing:border-box;padding:0;margin:0;font:inherit;border:1px solid var(--comfier-button-frame,var(--interface-stroke,#fff));border-radius:7px;background:var(--comfier-button-bg,var(--comfy-input-bg,#242427));color:var(--comfier-icon-color,var(--fg-color,#fff));touch-action:manipulation}
html body #comfier-owned-canvas-toolbar>button:disabled{opacity:.45}
html body #comfier-owned-canvas-toolbar [data-comfier-canvas-control="zoom"]{width:auto;min-width:60px;font-size:12px}
html body #comfier-owned-canvas-toolbar button :is(i,svg){width:20px;height:20px;pointer-events:none}
html body button[data-comfier-canvas-control]{--ufu-state-frame:var(--comfier-button-frame,var(--interface-stroke,#fff))!important;background:var(--comfier-button-bg,var(--comfy-input-bg,#242427))!important;border-color:var(--comfier-button-frame,var(--interface-stroke,#fff))!important}
html body #comfier-owned-canvas-toolbar,html body #comfier-owned-canvas-toolbar *{animation:none!important;transition:none!important}
#comfier-owned-canvas-zoom{position:fixed;display:flex;flex-direction:column;gap:4px;padding:8px;box-sizing:border-box;width:220px;max-width:calc(100vw - 8px);max-height:calc(100dvh - 8px);overflow:auto;border:1px solid var(--interface-stroke,#3b4554);border-radius:8px;background:var(--comfy-menu-bg,#171717);color:var(--comfier-ui-font,#fff);z-index:var(--comfier-z-popup,700);pointer-events:auto}
#comfier-owned-canvas-zoom button{display:flex;align-items:center;justify-content:space-between;gap:8px;min-height:${window.__comfierUiAuthority.minimums.buttonHeight}px;padding:6px 8px;border:0;border-radius:5px;background:var(--comfy-input-bg,#242427);color:inherit;font:inherit;touch-action:manipulation}
#comfier-owned-canvas-zoom label{display:flex;align-items:center;gap:6px;padding:4px}
#comfier-owned-canvas-zoom input{width:100%;min-width:0;min-height:${window.__comfierUiAuthority.minimums.buttonHeight}px;color:inherit;background:var(--comfy-input-bg,#242427);border:1px solid var(--interface-stroke,#3b4554);border-radius:5px;text-align:center;font:inherit}
#comfier-owned-canvas-zoom small{font-size:10px;opacity:.8}
`;
document.head.append(style);document.body.append(toolbar);authority.registerOwned('canvas',toolbar,'canvas-owner');
function stores(){return window.__comfierUi?.pinia?.()?._s}
function canvas(){return stores()?.get('canvas')?.canvas||window.app?.canvas||null}
function hasCommand(id){return !!window.__comfierActionbarOwner?.findCommand?.([id])}
async function execute(id){try{await window.__comfierActionbarOwner.executeCommand([id])}catch(e){console.warn('COMFIER canvas: '+e.message);window.ComfyRemoteDownloads?.showDownloadError?.(e.message)}finally{schedule()}}
function icon(button,cls){if(button.dataset.icon===cls)return;const i=document.createElement('i');i.className=cls;i.setAttribute('aria-hidden','true');button.replaceChildren(i);button.dataset.icon=cls}
for(const[key,label,token,cmd,cls]of specs){const b=document.createElement('button');b.type='button';b.setAttribute('aria-label',label);b.title=label;b.setAttribute('data-comfier-canvas-control',key);b.setAttribute('data-comfier-layout-token',token);if(key==='zoom'){b.setAttribute('data-testid','zoom-controls-button');b.setAttribute('aria-haspopup','dialog');b.setAttribute('aria-expanded','false');zoomLabel=document.createElement('span');const chevron=document.createElement('i');chevron.className='icon-[lucide--chevron-down]';chevron.setAttribute('aria-hidden','true');b.append(zoomLabel,chevron)}else if(key==='minimap'||key==='links')b.setAttribute('data-testid',token);if(cls)icon(b,cls);b.addEventListener('click',event=>{event.preventDefault();event.stopPropagation();if(key==='mode')execute(canvas()?.read_only?'Comfy.Canvas.Unlock':'Comfy.Canvas.Lock');else if(key==='zoom')toggleZoom();else execute(cmd)});toolbar.append(b);controls.set(key,b)}
function retireNative(){for(const el of document.querySelectorAll('[role="toolbar"][aria-label="Canvas Toolbar"]')){if(el===toolbar||el.hasAttribute('data-comfier-owned-canvas')||retired.has(el))continue;retired.set(el,{inert:el.inert,aria:el.getAttribute('aria-hidden')});el.inert=true;el.setAttribute('aria-hidden','true');el.setAttribute('data-comfier-canvas-retired','')}}
function restoreRetired(){for(const[el,old]of retired){el.inert=old.inert;el.removeAttribute('data-comfier-canvas-retired');if(old.aria===null)el.removeAttribute('aria-hidden');else el.setAttribute('aria-hidden',old.aria)}retired.clear()}
function fallback(enabled){if(!enabled){fallbackObserver?.disconnect();fallbackObserver=null;return}if(fallbackObserver)return;fallbackObserver=jobs.observe(document.body,{subtree:true,childList:true,attributes:true,attributeFilter:['class','aria-pressed']},records=>{if(records.some(r=>!(r.target.nodeType===1?r.target:r.target.parentElement)?.closest?.('#comfier-owned-canvas-toolbar,#comfier-owned-canvas-zoom')))schedule()})}
function releasePrevention(){const old=prevention;prevention=null;if(!old)return;old.releaseScale?.();old.restoreMethods?.();old.lease.release()}
function preventNative(){
 const store=stores()?.get('canvas'),setting=stores()?.get('setting'),c=canvas(),ds=c?.ds,ui=window.__comfierUi;
 const supported=toolbar.isConnected&&setting?.settingsById?.['Comfy.Graph.CanvasMenu']&&ds&&typeof store?.initScaleSync==='function'&&typeof store?.cleanupScaleSync==='function'&&typeof store?.setAppZoomFromPercentage==='function'&&ui?.renderReady?.()&&['storeSetting','setSetting'].some(key=>typeof window.app?.api?.[key]==='function')&&['Comfy.Canvas.Lock','Comfy.Canvas.Unlock','Comfy.Canvas.FitView','Comfy.Canvas.ZoomIn','Comfy.Canvas.ZoomOut','Comfy.Canvas.ToggleMinimap','Comfy.Canvas.ToggleLinkVisibility'].every(hasCommand);
 if(!supported){releasePrevention();return false}
 if(prevention&&(prevention.store!==store||prevention.canvas!==c||prevention.ds!==ds||prevention.setting!==setting))releasePrevention();
 if(!prevention){
  const lease=window.__comfierClientSettings?.acquire('canvas-owner','Comfy.Graph.CanvasMenu',false,{hide:true});if(!lease)return false;
  const state=prevention={store,setting,canvas:c,ds,lease,active:false};
  lease.settled.then(()=>{
   if(stopped||prevention!==state)return;
   const waiting=ui.afterRender(()=>{
    if(stopped||prevention!==state)return;
    if(!lease.ready()||canvas()!==c||c.ds!==ds){releasePrevention();schedule();return}
    // GraphCanvasMenu's beforeUnmount has now restored its predecessor.
    // Capture an immutable predecessor; never call native init twice.
    const previous=ds.onChanged;let active=true;
    function scale(){const pct=Math.round(Number(ds.scale)*100);if(Number.isFinite(pct)&&store.appScalePercentage!==pct)store.appScalePercentage=pct}
    const changed=function(...args){if(active)scale();return typeof previous==='function'?previous.apply(this,args):undefined};ds.onChanged=changed;
    state.releaseScale=()=>{active=false;if(ds.onChanged===changed)ds.onChanged=previous};
    const methods=['initScaleSync','cleanupScaleSync'].map(key=>{const base=store[key],guard=()=>{};store[key]=guard;return()=>{if(store[key]===guard)store[key]=base}});
    state.restoreMethods=()=>methods.reverse().forEach(fn=>fn());state.active=true;scale();fallback(false);restoreRetired();schedule();
   });if(!waiting){releasePrevention();schedule()}
  });
 }
 return !!prevention?.active;
}
function attribute(el,key,value){value=String(value);if(el.getAttribute(key)!==value)el.setAttribute(key,value)}
function syncState(){
 const c=canvas(),hand=!!c?.read_only,setting=stores()?.get('setting'),mode=controls.get('mode'),zoom=controls.get('zoom');
 mode.disabled=!c||!hasCommand(hand?'Comfy.Canvas.Unlock':'Comfy.Canvas.Lock');attribute(mode,'aria-pressed',hand);attribute(mode,'aria-label','Canvas Mode: '+(hand?'Hand':'Select'));mode.title=hand?'Hand mode — switch to Select':'Select mode — switch to Hand';icon(mode,hand?'icon-[lucide--hand]':'icon-[lucide--mouse-pointer-2]');
 const scale=Number(c?.ds?.scale),pct=Number.isFinite(scale)&&scale>0?Math.round(scale*100):Number(stores()?.get('canvas')?.appScalePercentage)||100;
 if(zoom.dataset.percent!==String(pct)){zoomLabel.textContent=pct+'%';zoom.dataset.percent=String(pct)}zoom.disabled=!c||typeof stores()?.get('canvas')?.setAppZoomFromPercentage!=='function';
 for(const[key,,,id]of specs)if(id)controls.get(key).disabled=!c||!hasCommand(id);
 attribute(controls.get('minimap'),'aria-pressed',!!setting?.get?.('Comfy.Minimap.Visible'));
 const linkMode=setting?.get?.('Comfy.LinkRenderMode'),hiddenCode=window.LiteGraph?.HIDDEN_LINK??-1,linksHidden=linkMode!==undefined&&linkMode===hiddenCode,links=controls.get('links');attribute(links,'aria-pressed',linksHidden);attribute(links,'aria-label',linksHidden?'Show Links':'Hide Links');links.title=linksHidden?'Show Links':'Hide Links';
 if(percentInput&&document.activeElement!==percentInput)percentInput.value=String(pct);
}
function hint(id){try{return stores()?.get('command')?.formatKeySequence?.(window.__comfierActionbarOwner.findCommand([id]))||''}catch(_){return''}}
function stopRepeat(){repeat=null;jobs.cancel('zoom-repeat')}
function startRepeat(id){stopRepeat();repeat=id;execute(id);function tick(){if(repeat!==id)return;execute(id);jobs.later('zoom-repeat',tick,100)}jobs.later('zoom-repeat',tick,400)}
function closeZoom(){stopRepeat();if(!popup)return false;authority.unregisterOwned('canvasPopup',popup);popup.remove();popup=null;percentInput=null;controls.get('zoom').setAttribute('aria-expanded','false');return true}
function toggleZoom(){if(closeZoom())return;popup=document.createElement('div');popup.id='comfier-owned-canvas-zoom';popup.setAttribute('role','dialog');popup.setAttribute('aria-label','Canvas zoom');
 for(const[label,id,repeats]of [['Zoom In','Comfy.Canvas.ZoomIn',true],['Zoom Out','Comfy.Canvas.ZoomOut',true],['Zoom to Fit','Comfy.Canvas.FitView',false]]){const b=document.createElement('button');b.type='button';const text=document.createElement('span'),small=document.createElement('small');text.textContent=label;small.textContent=hint(id);b.append(text,small);b.disabled=!hasCommand(id);if(repeats){b.addEventListener('pointerdown',event=>{if(event.button&&event.button!==0)return;event.preventDefault();b.setPointerCapture?.(event.pointerId);startRepeat(id)});for(const e of ['pointerup','pointercancel','lostpointercapture'])b.addEventListener(e,stopRepeat);b.addEventListener('click',event=>{event.stopPropagation();if(event.detail>0)return;execute(id)})}else b.addEventListener('click',event=>{event.stopPropagation();execute(id)});popup.append(b)}
 const label=document.createElement('label');label.textContent='Zoom';percentInput=document.createElement('input');percentInput.type='number';percentInput.min='1';percentInput.max='1000';percentInput.step='1';percentInput.inputMode='numeric';percentInput.setAttribute('aria-label','Canvas zoom percentage');const suffix=document.createElement('span');suffix.textContent='%';label.append(percentInput,suffix);popup.append(label);
 function apply(){const value=Number(percentInput?.value);if(!Number.isFinite(value)||value<1||value>1000)return;stores()?.get('canvas')?.setAppZoomFromPercentage?.(value);schedule()}
 percentInput.addEventListener('change',apply);percentInput.addEventListener('keydown',event=>{if(event.key==='Enter'){event.preventDefault();apply()}});
 document.body.append(popup);authority.registerOwned('canvasPopup',popup,'canvas-owner');controls.get('zoom').setAttribute('aria-expanded','true');syncState();placePopup();
}
function placePopup(){if(!popup)return;const r=controls.get('zoom').getBoundingClientRect(),p=popup.getBoundingClientRect(),w=Math.min(innerWidth-8,p.width||220),h=p.height||180;let left=r.left,top=r.top-h-4;if(top<4)top=r.bottom+4;left=Math.max(4,Math.min(left,innerWidth-w-4));top=Math.max(4,Math.min(top,innerHeight-h-4));for(const[k,v]of Object.entries({left:left+'px',top:top+'px','max-height':Math.max(32,innerHeight-top-4)+'px'}))runtime.writeStyle(popup,k,v,'canvas-owner')}
function layout(){if(window.__comfierLayoutEditor?.active?.())return;const z=window.__comfierViewport?.scale()||Math.max(.3,Math.min(2,Number(window.__comfierUiZoomValue)||1)),portrait=window.__comfierViewport?window.__comfierViewport.mode()==='outerPortrait':innerHeight>=innerWidth&&innerWidth<=520,run=window.__comfierActionbarOwner?.run;let left=4,bottom=4;
 if(portrait){left=innerWidth/2;const r=run?.getBoundingClientRect();if(r)bottom=Math.max(4,innerHeight-r.top+4)}else{const rail=window.__comfierUi?.railBounds?.(220);if(rail&&rail.width>0&&!document.querySelector('.comfier-unified-floating-rail')){const r=window.__comfierLayoutSide?.rect?.(rail)||rail;left=Math.max(4,r.right+4)}}
 for(const[k,v]of Object.entries({position:'fixed',zoom:String(z),left:left/z+'px',right:'auto',top:'auto',bottom:bottom/z+'px',transform:portrait?'translateX(-50%)':'none','transform-origin':'bottom left',visibility:'visible'})){const pair=portrait?[k,v]:window.__comfierLayoutSide?.property?.(k,v)||[k,v];runtime.writeStyle(toolbar,pair[0],pair[1],'canvas-owner')}
}
function bindStores(){for(const name of ['canvas','setting','command']){const s=stores()?.get(name);if(subscriptions.get(name)?.store===s)continue;if(!s){subscriptions.get(name)?.off?.();subscriptions.delete(name);continue;}subscriptions.get(name)?.off?.();subscriptions.set(name,{store:s,off:s.$subscribe?.(schedule,{detached:true})})}}
function refresh(){if(stopped)return;bindStores();const proactive=preventNative();fallback(!proactive);if(!proactive)retireNative();syncState();layout();placePopup()}
function schedule(){jobs.frame('refresh',refresh)}
for(const e of ['resize','orientationchange','pageshow','comfier-layout-editor-change','comfier-layout-side-change'])jobs.listen(window,e,schedule);
jobs.listen(document,'pointerdown',event=>{if(popup&&!popup.contains(event.target)&&!controls.get('zoom').contains(event.target))closeZoom()},true);
jobs.listen(document,'keydown',event=>{if(event.key==='Escape')closeZoom()});jobs.listen(document,'scroll',placePopup,true);jobs.listen(window,'blur',stopRepeat);jobs.listen(document,'pointerup',stopRepeat,true);jobs.listen(document,'pointercancel',stopRepeat,true);jobs.listen(document,'visibilitychange',()=>{if(document.hidden)stopRepeat()});
const back=window.__comfierBack?.register?.('canvas-zoom-popup',45,closeZoom);
if(window.__comfierDocument?.subscribe)jobs.own(window.__comfierDocument.subscribe('canvas-owner-canvas','canvas',schedule));
runtime.addOverlay?.('canvas-toolbar-state',()=>{if(!stopped)syncState()});
window.__comfierCanvasOwner={toolbar,control:key=>controls.get(key),refresh:schedule,layout,closePopup:closeZoom,snapshot:()=>({nativeHosts:retired.size,proactive:!!prevention?.active,fallback:!!fallbackObserver,hand:!!canvas()?.read_only,zoom:controls.get('zoom').dataset.percent,unavailable:[...controls].filter(([,b])=>b.disabled).map(([k])=>k)}),remove(){if(stopped)return;stopped=true;releasePrevention();fallback(false);restoreRetired();closeZoom();jobs.dispose();back?.();runtime.removeOverlay?.('canvas-toolbar-state');for(const s of subscriptions.values())s.off?.();for(const[el,old]of retired){el.inert=old.inert;el.removeAttribute('data-comfier-canvas-retired');if(old.aria===null)el.removeAttribute('aria-hidden');else el.setAttribute('aria-hidden',old.aria)}authority.unregisterOwned('canvas',toolbar);toolbar.remove();style.remove();delete window.__comfierCanvasOwner}};
jobs.burst('startup',schedule,[0,80,300,1000]);refresh();
})();
