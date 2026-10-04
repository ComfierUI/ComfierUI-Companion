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
html.${ROOT} .comfier-unified-floating-rail:not([data-comfier-owned-rail]){left:auto!important;right:4px!important}
html.${ROOT}.comfier-early-floating-panels .comfier-early-floating-panel{left:auto!important}
html.${ROOT}.comfier-early-floating-panels .comfier-early-floating-left{left:auto!important;right:var(--cef-left)!important}
html.${ROOT}.comfier-early-floating-panels .comfier-early-floating-right,html.${ROOT} .comfier-extensions-panel{left:auto!important;right:var(--cef-right)!important}
html.${ROOT} #comfier-lora-manager-panel,html.${ROOT} #comfier-ltx-precision-panel{left:auto!important;right:var(--cef-lora-left,var(--cef-right))!important}
html.${ROOT}.comfier-early-floating-panels .comfier-early-floating-bottom,html.${ROOT} #comfier-downloads-bottom-panel{left:auto!important;right:var(--cef-bottom-left)!important}
@media(max-width:520px) and (orientation:portrait){html.${ROOT} [data-testid="error-overlay"]{left:8px!important;right:auto!important;inset-inline-start:8px!important;inset-inline-end:auto!important}}
`;
  document.head.appendChild(style);
  function sync(){document.documentElement.classList.toggle(ROOT,current==='right');window.__comfierSidebarLocation=current}
  function actionSurface(){return window.__comfierUiAuthority?.surface('action')||null}
  function workflowInset(){
    let edge=rect(document.getElementById('graph-canvas-container')?.getBoundingClientRect())?.left||0;
    document.querySelectorAll('.side-tool-bar-container,.side-toolbar-container').forEach(el=>{const r=rect(el.getBoundingClientRect());if(r.width>=20&&r.width<220&&r.height>innerHeight*.35&&r.left<=edge+8)edge=Math.max(edge,r.right)});
    return Math.ceil(edge)+4;
  }
  
  function pinActions(){if(!window.__comfierOwnedChromePending)window.__comfierActionbarOwner?.layout();}
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
  window.__comfierLayoutSide={side,setNativeSide,rect,property,refresh,pinActions,actionSurface,workflowInset,read,remove(){if(stopped)return;stopped=true;removeRow?.();rowStyle.remove();document.querySelectorAll('.ui-native-side-row').forEach(el=>el.remove());jobs.dispose();unsubscribe?.();eventSource?.removeEventListener?.(KEY+'.change',changed);style.remove();document.documentElement.classList.remove(ROOT);delete window.__comfierLayoutSide;}};
  // The native preference is authoritative. Only explicit user input writes it; never restore the old
  // private opt-in value. Store subscription also catches asynchronous hydration.
  jobs.own(window.__comfierDocument.subscribe('layout-side-settings','settings',bind));
  jobs.own(window.__comfierDocument.subscribe('layout-side-app','app',bind));
  jobs.listen(window,'comfierui-session-reconnected',bind);
  bind();
})();
