(function(){
  'use strict';
  // This proof-of-ownership row ships only in the host bundle, never in the APK.
  const id='comfier-companion-display-status-style';
  function mount(root){
    if(!window.__comfierCompanionDisplayMode?.ready)return;
    const panel=root?.querySelector('.ui-zoom-panel');
    if(!panel||panel.querySelector('.ui-companion-display-row'))return;
    const row=document.createElement('label');
    row.className='ui-companion-display-row';
    row.setAttribute('aria-label','Companion Display Mode: Active');
    const box=document.createElement('input');
    box.type='checkbox';box.checked=true;box.tabIndex=-1;
    box.className='ui-companion-display-box';
    box.setAttribute('aria-label','Companion Display Mode active');
    box.setAttribute('aria-disabled','true');
    // Cancel native checkbox/label activation without disabled-control dimming.
    row.addEventListener('click',event=>event.preventDefault());
    box.addEventListener('keydown',event=>{if(event.key===' '||event.key==='Enter')event.preventDefault();});
    box.addEventListener('change',()=>{box.checked=true;});
    const label=document.createElement('span');label.textContent='Companion Display Mode';
    const state=document.createElement('span');state.className='ui-companion-display-state';state.textContent='Active';
    row.append(box,label,state);panel.appendChild(row);
  }
  function activate(){
    if(!window.__comfierCompanionDisplayMode?.ready||window.__comfierDisplayModeStatus)return;
    if(!document.getElementById(id)){
      const style=document.createElement('style');style.id=id;
      style.textContent=`
#comfier-ui-zoom-test .ui-zoom-panel>.ui-companion-display-row{display:flex;align-items:center;gap:8px;min-height:30px;font-size:12px;font-weight:600;grid-column:1/-1!important;width:100%!important;max-width:none!important;box-sizing:border-box;cursor:default}
#comfier-ui-zoom-test .ui-companion-display-box{width:22px!important;height:22px!important;min-width:22px;accent-color:#fff!important;cursor:default;touch-action:manipulation}
#comfier-ui-zoom-test .ui-companion-display-state{margin-left:auto;font-size:12px;font-weight:400;opacity:.78}
`;
      document.head.appendChild(style);
    }
    const unregister=window.__comfierSettingsRows.register('companion-display-status',mount);
    window.__comfierDisplayModeStatus={remove(){unregister();document.querySelectorAll('.ui-companion-display-row').forEach(el=>el.remove());document.getElementById(id)?.remove();delete window.__comfierDisplayModeStatus;}};
  }
  window.addEventListener('comfierui-companion-display-ready',activate,{once:true});
  activate();
})();
