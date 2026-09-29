(function(){
  'use strict';
  if(window.__comfierLayoutSide)return;
  const KEY='Comfy.Sidebar.Location',ROOT='comfier-layout-right';
  const jobs=window.__comfierRuntime.scope('layout-side');
  let current='left',stopped=false,eventSource=null,store=null,unsubscribe=null;
  const side=()=>current;
  function rect(r){if(!r||current!=='right')return r;return {x:innerWidth-r.right,y:r.top,left:innerWidth-r.right,right:innerWidth-r.left,top:r.top,bottom:r.bottom,width:r.width,height:r.height}}
  function property(name,value){
    if(current!=='right')return[name,value];
    if(name==='left')name='right';else if(name==='right')name='left';
    if(name==='transform')value=value.replace('translateX(-50%)','translateX(50%)');
    if(name==='transform-origin')value=value.replace(/\bleft\b|\bright\b/g,s=>s==='left'?'right':'left');
    return[name,value];
  }
  const style=document.createElement('style');style.id='comfier-layout-side-style';
  style.textContent=`
html.${ROOT} .comfier-unified-floating-rail{left:auto!important;right:4px!important}
html.${ROOT}.comfier-early-floating-panels .comfier-early-floating-panel{left:auto!important}
html.${ROOT}.comfier-early-floating-panels .comfier-early-floating-left{left:auto!important;right:var(--cef-left)!important}
html.${ROOT}.comfier-early-floating-panels .comfier-early-floating-right,html.${ROOT} .comfier-extensions-panel{left:auto!important;right:var(--cef-right)!important}
html.${ROOT} #comfier-lora-manager-panel,html.${ROOT} #comfier-ltx-precision-panel{left:auto!important;right:var(--cef-lora-left,var(--cef-right))!important}
html.${ROOT}.comfier-early-floating-panels .comfier-early-floating-bottom,html.${ROOT} #comfier-downloads-bottom-panel{left:auto!important;right:var(--cef-bottom-left)!important}
html.${ROOT} [role="toolbar"][aria-label="Canvas Toolbar"].comfier-early-canvas-toolbar-centered{left:auto!important;right:50%!important}
html.${ROOT} :is(.actionbar-container,[role="toolbar"][aria-label="Canvas Toolbar"],[data-testid="view-mode-toggle"][role="group"]):not(.comfier-early-queue-dock *){flex-direction:row-reverse!important}
html.${ROOT} .actionbar-container:not(.comfier-early-queue-dock *)>div.flex.items-center,html.${ROOT} [data-testid="view-mode-toggle"][role="group"]>div{flex-direction:row-reverse!important}
html.${ROOT} #crystools-monitors-root.comfy-remote-crystools-adaptive{direction:ltr!important}
html.${ROOT} .help-center-popup.comfier-help-positioned,html.${ROOT} .comfier-main-menu-positioned{left:auto!important}
@media(max-width:520px) and (orientation:portrait){html.${ROOT} [data-testid="error-overlay"]{left:8px!important;right:auto!important;inset-inline-start:8px!important;inset-inline-end:auto!important}}
`;
  document.head.appendChild(style);
  function sync(){document.documentElement.classList.toggle(ROOT,current==='right');window.__comfierSidebarLocation=current}
  function actionSurface(){
    const excluded='[data-testid="properties-panel"],.comfier-early-floating-panel,.comfier-early-queue-dock';
    const cards=[...document.querySelectorAll('[data-testid="action-bar-card"]')].filter(el=>!el.closest(excluded)&&!el.querySelector('[data-testid="queue-button"]')&&(el.querySelector('button,.actionbar-container,[data-testid="action-bar-buttons"]')||el.matches('.actionbar-container')));
    if(cards.length)return cards.sort((a,b)=>a.getBoundingClientRect().top-b.getBoundingClientRect().top)[0];
    const container=[...document.querySelectorAll('.actionbar-container')].find(el=>!el.closest(excluded)&&!el.querySelector('[data-testid="queue-button"]'));
    return container?.closest('[data-testid="action-bar-card"]')||container?.parentElement||null;
  }
  function workflowInset(){
    let edge=rect(document.getElementById('graph-canvas-container')?.getBoundingClientRect())?.left||0;
    document.querySelectorAll('.side-tool-bar-container,.side-toolbar-container').forEach(el=>{const r=rect(el.getBoundingClientRect());if(r.width>=20&&r.width<220&&r.height>innerHeight*.35&&r.left<=edge+8)edge=Math.max(edge,r.right)});
    return Math.ceil(edge)+4;
  }
  const pinned=new Map();
  function restoreActions(){for(const [el,props] of pinned){for(const [key,old] of Object.entries(props)){if(old.value)el.style.setProperty(key,old.value,old.priority);else el.style.removeProperty(key)}}pinned.clear()}
  function pinActions(){
    // Companion has its fixed-view-map owner. The standalone action card is
    // normally native-positioned; only its mirrored coordinates are owned here.
    if(current!=='right'){restoreActions();return}
    if(window.__comfierNativeUiOwner==='companion'||window.__comfierFixedViewMap)return;
    const tabs=document.getElementById('topbar-workflow-tabs');
    const top=tabs?Math.max(...[tabs,...tabs.children].map(el=>el.getBoundingClientRect().bottom)):document.getElementById('graph-canvas-container')?.getBoundingClientRect().top||0;
    const z=Math.max(.3,Math.min(2,parseFloat(window.__comfierUiZoomValue)||1));
    [actionSurface()].filter(Boolean).forEach(el=>{
      const values={position:'fixed',left:workflowInset()/z+'px',right:'auto',top:(top+4)/z+'px',bottom:'auto','transform-origin':'top left'};
      if(!pinned.has(el)){const props={};for(const key of Object.keys(values))props[key]={value:el.style.getPropertyValue(key),priority:el.style.getPropertyPriority(key)};pinned.set(el,props)}
      for(const [key,value] of Object.entries(values)){if(el.style.getPropertyValue(key)!==value||el.style.getPropertyPriority(key)!=='important')el.style.setProperty(key,value,'important')}
    });
  }
  function refresh(){
    sync();pinActions();
    window.__comfierUnifiedSidebarTest?.refresh?.();window.__comfierEarlyFloatingPanels?.refresh?.();window.__comfierWorkflowFloatingTrigger?.refresh?.();window.__comfierFixedViewMap?.refresh?.();
    // Existing geometry owners already subscribe to viewport changes. This also
    // refreshes search/help/menus without adding a second layout observer.
    window.dispatchEvent(new Event('resize'));
  }
  function accept(value){
    if(value!=='left'&&value!=='right')return;
    if(current===value){sync();syncRows();return}current=value;sync();syncRows();
    window.dispatchEvent(new CustomEvent('comfier-layout-side-change',{detail:{side:current}}));
    refresh();jobs.burst('settle',refresh,[60,180,450]);
  }
  function read(){
    if(stopped)return;
    try{const modern=window.app?.extensionManager?.setting,legacy=window.app?.ui?.settings;
      const value=store?.get?.(KEY)??modern?.get?.(KEY)??legacy?.getSettingValue?.(KEY);
      accept(value);
    }catch(_){}
  }
  function changed(event){accept(event?.detail?.value);read()}
  function bind(){
    if(stopped)return;
    const nextSource=window.app?.ui?.settings;
    if(nextSource!==eventSource){eventSource?.removeEventListener?.(KEY+'.change',changed);eventSource=nextSource;eventSource?.addEventListener?.(KEY+'.change',changed)}
    const modern=window.app?.extensionManager?.setting;
    const next=window.__comfierUi?.pinia?.()?._s?.get('setting')||(modern?.$subscribe?modern:null);
    if(next!==store){unsubscribe?.();store=next;unsubscribe=store?.$subscribe?.(read,{detached:true,flush:'sync'})||null}
    read();
  }
  let writing=false;
  function syncRows(){document.querySelectorAll('.ui-native-side-row').forEach(row=>{const box=row.querySelector('input');box.checked=current==='right';box.disabled=writing;row.querySelector('span:last-child').textContent=writing?'Saving…':current==='right'?'On':'Off'})}
  async function setNativeSide(right){
    if(writing)return;writing=true;syncRows();
    try{const modern=window.app?.extensionManager?.setting,legacy=window.app?.ui?.settings,value=right?'right':'left';
      if(typeof legacy?.setSettingValueAsync==='function')await legacy.setSettingValueAsync(KEY,value);
      else if(typeof modern?.set==='function')await modern.set(KEY,value);
      else if(typeof store?.set==='function')await store.set(KEY,value);
      else throw Error('Native sidebar setting is not ready.');
      read();
    }catch(e){window.ComfyRemoteDownloads?.showDownloadError?.('Sidebar setting: '+e.message)}finally{writing=false;read();syncRows()}
  }
  function mountSideRow(root){const panel=root?.querySelector('.ui-zoom-panel');if(!panel||panel.querySelector('.ui-native-side-row'))return;
    const row=document.createElement('label');row.className='ui-native-side-row';const box=document.createElement('input');box.type='checkbox';box.setAttribute('aria-label','Right-side Sidebar');const label=document.createElement('span');label.textContent='Right-side Sidebar';const state=document.createElement('span');row.append(box,label,state);box.addEventListener('change',()=>setNativeSide(box.checked));panel.appendChild(row);syncRows();
  }
  const rowStyle=document.createElement('style');rowStyle.textContent='#comfier-ui-zoom-test .ui-native-side-row{display:flex;align-items:center;gap:8px;min-height:30px;font-size:12px;font-weight:600;width:100%}#comfier-ui-zoom-test .ui-native-side-row input{width:22px!important;height:22px!important;min-width:22px;accent-color:#fff!important;touch-action:manipulation}#comfier-ui-zoom-test .ui-native-side-row span:last-child{margin-left:auto;font-size:12px;font-weight:400;opacity:.78}';document.head.appendChild(rowStyle);
  const removeRow=window.__comfierSettingsRows?.register('native-sidebar-location',mountSideRow);
  window.__comfierLayoutSide={side,setNativeSide,rect,property,refresh,pinActions,actionSurface,workflowInset,read,remove(){if(stopped)return;stopped=true;removeRow?.();rowStyle.remove();document.querySelectorAll('.ui-native-side-row').forEach(el=>el.remove());restoreActions();jobs.dispose();unsubscribe?.();eventSource?.removeEventListener?.(KEY+'.change',changed);style.remove();document.documentElement.classList.remove(ROOT);delete window.__comfierLayoutSide;}};
  // The native preference is authoritative. Only explicit user input writes it; never restore the old
  // private opt-in value. Store subscription also catches asynchronous hydration.
  jobs.own(window.__comfierDocument.subscribe('layout-side-settings','settings',bind));
  jobs.own(window.__comfierDocument.subscribe('layout-side-app','app',bind));
  jobs.listen(window,'comfierui-session-reconnected',bind);
  bind();
})();
