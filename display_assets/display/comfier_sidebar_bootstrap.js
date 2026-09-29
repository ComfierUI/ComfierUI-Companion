(function(){
  'use strict';
  window.__comfierSidebarBootstrap?.remove?.();

  const TAB_ID='comfier-app-settings';
  const jobs=window.__comfierRuntime.scope('sidebar:'+TAB_ID),tab=window.__comfierUi.sidebar(TAB_ID);
  const SETTINGS_ROOT_ID='comfier-ui-zoom-test';
  const STYLE_ID='comfier-app-settings-sidebar-style';
  const PANEL_CLASS='comfier-app-settings-native-panel';
  let stopped=false,observer=null,multiTarget=null,multiHandler=null,settingsRoot=null,activeContainer=null,registered=false;

  document.getElementById('comfier-app-settings-button')?.remove();
  const legacyPanel=document.getElementById('comfier-app-settings-panel');
  const legacyRoot=legacyPanel?.querySelector?.('#'+SETTINGS_ROOT_ID)||null;
  if(legacyRoot)settingsRoot=legacyRoot;
  legacyPanel?.remove();

  let parking=document.getElementById('comfier-app-settings-parking');
  if(!parking){parking=document.createElement('div');parking.id='comfier-app-settings-parking';parking.hidden=true;document.body.appendChild(parking)}

  document.getElementById(STYLE_ID)?.remove();
  const style=document.createElement('style');style.id=STYLE_ID;style.textContent=`
[data-testid="${TAB_ID}-tab-button"]{color:var(--comfier-icon-color,var(--color-muted-foreground,var(--muted-foreground,#8a8a8a)))!important}
.${PANEL_CLASS}{width:100%!important;height:100%!important;min-width:0!important;min-height:0!important;box-sizing:border-box!important;overflow-y:auto!important;overflow-x:hidden!important;padding:8px!important;overscroll-behavior:contain!important;touch-action:pan-y!important}
.${PANEL_CLASS}>#${SETTINGS_ROOT_ID}{position:static!important;inset:auto!important;display:block!important;width:100%!important;height:auto!important;margin:0!important;transform:none!important;pointer-events:auto!important;font-family:inherit!important}
.${PANEL_CLASS} .ui-zoom-panel{position:static!important;inset:auto!important;display:grid!important;grid-template-columns:max-content minmax(0,1fr) max-content!important;visibility:visible!important;opacity:1!important;transform:none!important;width:100%!important;max-width:none!important;max-height:none!important;min-width:0!important;box-sizing:border-box!important;overflow:visible!important;box-shadow:none!important;border:0!important;border-radius:0!important;background:transparent!important;padding:4px!important;white-space:normal!important;pointer-events:auto!important}
.${PANEL_CLASS} .ui-zoom-range{min-width:0!important;max-width:100%!important}
.${PANEL_CLASS} .ui-zoom-reset{max-width:100%!important}
.${PANEL_CLASS} :is(.ui-auto-reconnect-row,.ui-node-move-row,.ui-generation-notifications-row,.ui-diagnostics-row,.ui-accent-row,.ui-font-row,.ui-theme-launch-row,.comfier-theme-studio,.ui-disconnect,.ui-hard-refresh,.ui-app-version,.ui-companion-version){grid-column:1/-1!important;width:100%!important;max-width:none!important;box-sizing:border-box!important}
.${PANEL_CLASS} :is(.ui-disconnect,.ui-hard-refresh){justify-self:stretch!important}
#comfier-multiselect-toggle{display:flex!important;flex-direction:column!important;align-items:center!important;justify-content:center!important;gap:2px!important}
#comfier-multiselect-toggle .comfier-multiselect-label{display:block!important;font:inherit!important;font-size:7px!important;font-weight:700!important;line-height:1!important;letter-spacing:.35px!important;color:currentColor!important;pointer-events:none!important}
#comfier-multiselect-toggle input{width:22px!important;height:22px!important;min-width:22px!important;min-height:22px!important;margin:0!important;pointer-events:none!important;accent-color:var(--comfier-accent)}
`;(document.head||document.documentElement).appendChild(style);

  function label(el){return((el?.getAttribute?.('aria-label')||'')+' '+(el?.getAttribute?.('title')||'')+' '+(el?.textContent||'')).replace(/\s+/g,' ').trim().toLowerCase()}
  function visible(el){if(!el?.isConnected)return false;const r=el.getBoundingClientRect(),s=getComputedStyle(el);return r.width>0&&r.height>0&&s.display!=='none'&&s.visibility!=='hidden'}
  function dismissMultiTooltip(target){
    try{target?.blur?.()}catch(_){}target?.removeAttribute?.('aria-describedby');
    ['pointerleave','mouseleave'].forEach(type=>{try{const EventType=type==='pointerleave'&&window.PointerEvent?PointerEvent:MouseEvent;target?.dispatchEvent?.(new EventType(type,{bubbles:true}))}catch(_){}});
    document.querySelectorAll('.p-tooltip,[role="tooltip"],[data-pc-name="tooltip"]').forEach(tooltip=>{if(visible(tooltip))tooltip.remove()});
  }
  function installMulti(){
    let target=document.getElementById('comfier-multiselect-toggle');
    if(!target)target=[...document.querySelectorAll('.side-bar-button,button,[role="button"]')].find(el=>{const name=label(el);return name.includes('keyboard')&&name.includes('shortcut')});
    if(!target)return false;
    target.id='comfier-multiselect-toggle';target.classList.add('comfy-remote-multiselect-toggle');target.setAttribute('aria-label','Node Multiselect');target.removeAttribute('title');target.removeAttribute('data-tooltip');target.removeAttribute('aria-describedby');
    let box=target.querySelector('input[type="checkbox"]');
    if(!box){target.innerHTML='';const name=document.createElement('span');name.className='comfier-multiselect-label';name.textContent='MULTI';target.appendChild(name);box=document.createElement('input');box.type='checkbox';box.tabIndex=-1;target.appendChild(box)}
    if(multiTarget!==target){if(multiTarget&&multiHandler)multiTarget.removeEventListener('click',multiHandler,true);multiTarget=target;multiHandler=event=>{event.preventDefault();event.stopImmediatePropagation();window.__comfierMultiSelectCtrl=!window.__comfierMultiSelectCtrl;box.checked=!!window.__comfierMultiSelectCtrl;jobs.burst('tooltip',()=>dismissMultiTooltip(target),[0,32,120])};target.addEventListener('click',multiHandler,true)}
    box.checked=!!window.__comfierMultiSelectCtrl;return true;
  }
  function captureSettings(){
    if(settingsRoot)return true;
    const root=document.getElementById(SETTINGS_ROOT_ID);if(!root)return false;
    settingsRoot=root;settingsRoot.classList.add('comfier-app-settings-content');settingsRoot.style.cssText='';return true;
  }
  function mount(container){
    activeContainer=container;container.classList.add(PANEL_CLASS);
    if(captureSettings()&&settingsRoot.parentElement!==container)container.appendChild(settingsRoot);
    window.__comfierDiagnosticSuite?.refreshSettingsToggles?.();window.__cmMove?.refreshSettings?.();
  }
  function park(){
    window.__comfierThemeStudio?.close?.();
    if(activeContainer)activeContainer.classList.remove(PANEL_CLASS);activeContainer=null;
    if(settingsRoot&&settingsRoot.parentElement!==parking)parking.appendChild(settingsRoot);
  }
  function register(){registered=tab.ensure({icon:'icon-[lucide--ellipsis]',title:'App Settings',tooltip:'App Settings',label:'App Settings',type:'custom',render:mount,destroy:park});if(registered)window.__comfierUnifiedSidebarTest?.refresh?.();return registered}
  function closeIfOpen(){return tab.close()}
  function reconcile(){if(stopped)return;installMulti();captureSettings();if(!registered||!tab.refresh())register();if(activeContainer&&settingsRoot&&settingsRoot.parentElement!==activeContainer)activeContainer.appendChild(settingsRoot)}
  function schedule(){if(!stopped)jobs.frame('reconcile',reconcile)}
  observer=window.__comfierMutations.create(records=>{if(!settingsRoot||!tab.refresh()||window.__comfierUi.affected(records,'#'+SETTINGS_ROOT_ID+',.side-bar-button,.side-bar-panel'))schedule()});observer.observe(document.body,{childList:true,subtree:true});
  document.addEventListener('click',schedule,true);window.addEventListener('resize',schedule,{passive:true});window.addEventListener('orientationchange',schedule,{passive:true});
  jobs.burst('startup',schedule,[0,50,150,400,1000]);

  window.__comfierSidebarBootstrap={
    close:closeIfOpen,closeIfOpen,refresh:schedule,
    remove(){if(stopped)return;stopped=true;jobs.dispose();if(multiTarget&&multiHandler)multiTarget.removeEventListener('click',multiHandler,true);observer?.disconnect();document.removeEventListener('click',schedule,true);window.removeEventListener('resize',schedule);window.removeEventListener('orientationchange',schedule);tab.remove();park();if(!settingsRoot)parking?.remove();style.remove();delete window.__comfierSidebarBootstrap;}
  };
})();
