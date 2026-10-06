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
.${PANEL_CLASS}{width:100%!important;height:100%!important;min-width:0!important;min-height:0!important;box-sizing:border-box!important;overflow:hidden!important;padding:8px!important;overscroll-behavior:contain!important;touch-action:pan-y!important}
.${PANEL_CLASS}>#${SETTINGS_ROOT_ID}{position:static!important;inset:auto!important;display:block!important;width:100%!important;height:100%!important;margin:0!important;transform:none!important;pointer-events:auto!important;font-family:inherit!important}
.${PANEL_CLASS} .ui-zoom-panel{position:static!important;inset:auto!important;display:flex!important;flex-direction:column!important;gap:8px!important;height:100%!important;visibility:visible!important;opacity:1!important;transform:none!important;width:100%!important;max-width:none!important;max-height:none!important;min-width:0!important;box-sizing:border-box!important;overflow-y:auto!important;overflow-x:hidden!important;box-shadow:none!important;border:0!important;border-radius:0!important;background:transparent!important;padding:4px!important;white-space:normal!important;pointer-events:auto!important}
.${PANEL_CLASS} .ui-zoom-panel[data-comfier-browser-settings="true"]>:not(.comfier-app-settings-heading):not(.comfier-browser-start-row):not(.comfier-companion-port-row):not(.ui-diagnostics-row):not(.ufu-launch){display:none!important}
.${PANEL_CLASS} .ui-zoom-range{min-width:0!important;max-width:100%!important}
.${PANEL_CLASS} .ui-zoom-reset{max-width:100%!important}
.${PANEL_CLASS} :is(.ui-auto-reconnect-row,.ui-node-move-row,.ui-generation-notifications-row,.ui-accent-row,.ui-font-row,.ui-theme-launch-row,.comfier-theme-studio,.ui-disconnect,.ui-hard-refresh,.ui-app-version,.ui-companion-version){grid-column:1/-1!important;width:100%!important;max-width:none!important;box-sizing:border-box!important}
.${PANEL_CLASS} :is(.ui-disconnect,.ui-hard-refresh){justify-self:stretch!important}
.${PANEL_CLASS} .ui-zoom-panel>*{flex-shrink:0!important}
.${PANEL_CLASS} .comfier-app-settings-heading{order:0!important;width:100%!important;margin:0!important;padding:8px 0!important;text-align:center!important;font-size:2em!important;font-weight:600!important;line-height:1.25!important;box-sizing:border-box!important}
.${PANEL_CLASS} .ui-auto-reconnect-row{order:1!important}
.${PANEL_CLASS} .ui-generation-notifications-row{order:2!important}
.${PANEL_CLASS} .ui-diagnostics-row{order:3!important}
.${PANEL_CLASS} :is(.ui-auto-reconnect-row,.ui-generation-notifications-row,.ui-diagnostics-row){display:grid!important;grid-template-columns:22px minmax(0,1fr) max-content!important;align-items:center!important;gap:12px!important;width:100%!important;max-width:none!important;min-height:36px!important;margin:0!important;padding:0!important;font:inherit!important;text-align:left!important;box-sizing:border-box!important}
.${PANEL_CLASS} :is(.ui-auto-reconnect-row,.ui-generation-notifications-row,.ui-diagnostics-row)>input{grid-column:1!important;width:22px!important;height:22px!important;min-width:22px!important;margin:0!important;justify-self:start!important}
.${PANEL_CLASS} :is(.ui-auto-reconnect-row,.ui-generation-notifications-row,.ui-diagnostics-row)>span{margin:0!important;font:inherit!important}
.${PANEL_CLASS} :is(.ui-auto-reconnect-state,.ui-generation-notifications-state,.ui-diagnostics-state){justify-self:end!important;font-weight:400!important}
.${PANEL_CLASS} .ufu-launch{order:100!important;margin-top:auto!important}
.${PANEL_CLASS} .ui-hard-refresh{order:101!important;margin-top:0!important}
.${PANEL_CLASS} .ui-disconnect{order:102!important;margin-top:0!important}
.${PANEL_CLASS} :is(.ufu-launch,.ui-hard-refresh,.ui-disconnect){display:flex!important;align-items:center!important;justify-content:center!important;width:100%!important;max-width:none!important;height:48px!important;min-height:48px!important;max-height:48px!important;padding:0 12px!important;box-sizing:border-box!important;font-family:inherit!important;font-size:12px!important;font-weight:600!important;line-height:1.25!important;text-align:center!important;border:1px solid var(--interface-stroke,#3b4554)!important;border-radius:8px!important;background:var(--secondary-background,#242427)!important;color:inherit!important;cursor:pointer;touch-action:manipulation}
.${PANEL_CLASS} .ui-app-version{order:103!important}
.${PANEL_CLASS} .ui-companion-version{order:104!important}
#comfier-multiselect-toggle{display:flex!important;flex-direction:column!important;align-items:center!important;justify-content:center!important;gap:2px!important}
#comfier-multiselect-toggle .comfier-multiselect-label{display:block!important;font:inherit!important;font-size:7px!important;font-weight:700!important;line-height:1!important;letter-spacing:.35px!important;color:currentColor!important;pointer-events:none!important}
#comfier-multiselect-toggle input{width:15px!important;height:15px!important;min-width:15px!important;min-height:15px!important;margin:0!important;pointer-events:none!important;accent-color:var(--comfier-accent)}
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
  function portControls(panel){
    if(panel.querySelector('.comfier-companion-port-row'))return;
    const row=document.createElement('div');row.className='comfier-companion-port-row';row.style.cssText='order:4;width:100%;display:flex;flex-wrap:wrap;align-items:center;gap:8px;box-sizing:border-box';
    const label=document.createElement('label');label.textContent='Companion Port';label.style.cssText='font:inherit!important;display:block;flex:1;min-width:0;margin:0;text-align:left';const input=document.createElement('input');input.type='number';input.inputMode='numeric';input.min=1024;input.max=65535;input.step=1;input.placeholder='8147';input.setAttribute('aria-label','Companion Port');input.style.cssText='width:50px;max-width:100%;box-sizing:border-box;margin-left:auto';label.htmlFor='comfier-companion-port-input';input.id=label.htmlFor;
    const apply=document.createElement('button');apply.type='button';apply.textContent='Apply';row.append(label,input,apply);panel.appendChild(row);
    const notify=message=>window.alert(message);
    let reserved=[8188],gatewayPort=null;
    async function request(options){const api=window.app?.api;if(typeof api?.fetchApi!=='function')throw Error('Connection is not ready');const response=await api.fetchApi('/comfierui/gateway/port',options);if(!response.ok)throw Error(response.status===404?'Port changes require Companion 0.4.29.':await response.text()||'Could not change the port');return response.json()}
    request().then(config=>{if(stopped||!row.isConnected)return;input.value=config.port;gatewayPort=config.port;input.placeholder=String(config.port);window.ComfierApp?.rememberCompanionPort?.(config.port);reserved=config.reserved||reserved}).catch(()=>{});
    apply.onclick=async()=>{
      const port=input.value.trim()===''?(gatewayPort??8147):Number(input.value);
      if(port===8188){notify("8188 is unavailable due to being ComfyUI's default port.");return}
      if(!Number.isInteger(port)||port<1024||port>65535||reserved.includes(port)){notify('Choose a port from 1024–65535, excluding ComfyUI’s port.');return}
      if(gatewayPort===null){notify('Wait for Companion port information.');return}
      if(location.protocol!=='http:'||Number(location.port||80)!==gatewayPort){notify('Change gateway ports using a direct HTTP Companion connection.');return}
      // Verify storage can be read before changing the server's listening port.
      let storage;try{storage=JSON.stringify(Object.fromEntries(Object.keys(localStorage).map(key=>[key,localStorage.getItem(key)])))}catch(_){notify('Could not preserve this device’s settings; port unchanged.');return}
      apply.disabled=true;input.disabled=true;
      try{const result=await request({method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({port})});typeof window.ComfierApp?.reconnectCompanionPort==='function'?window.ComfierApp.reconnectCompanionPort(result.port,storage):location.assign(location.protocol+'//'+location.hostname+':'+result.port+location.pathname)}catch(error){notify(error.message)}finally{apply.disabled=false;input.disabled=false}
    };
  }
  function browserSettings(panel){
    const browser=!window.__comfierAndroidClient&&!window.__COMFIER_CLOUD_MODE;
    panel.dataset.comfierBrowserSettings=String(browser);if(!browser){panel.querySelector('.comfier-browser-start-row')?.remove();return}
    if(panel.querySelector('.comfier-browser-start-row'))return;
    const row=document.createElement('label');row.className='comfier-browser-start-row';row.style.cssText='display:flex;align-items:center;justify-content:space-between;gap:8px;order:3';const text=document.createElement('span');text.textContent='Browser start page';const select=document.createElement('select');select.setAttribute('aria-label','Browser start page');for(const [value,title]of [['companion','ComfierUI'],['comfy','Default ComfyUI']]){const option=document.createElement('option');option.value=value;option.textContent=title;select.append(option)}select.disabled=true;row.append(text,select);panel.append(row);
    async function request(options){const response=await window.app.api.fetchApi('/comfierui/gateway/browser-start',options);if(!response.ok)throw Error(await response.text()||'Could not save browser start page');return response.json()}
    let saved='companion';request().then(config=>{saved=config.page;select.value=saved;select.disabled=false}).catch(error=>{select.title=error.message});select.onchange=async()=>{select.disabled=true;try{const result=await request({method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({page:select.value})});saved=result.page;select.value=saved}catch(error){select.value=saved;window.alert(error.message)}finally{select.disabled=false}};
  }
  function heading(){
    const panel=settingsRoot?.querySelector('.ui-zoom-panel');if(!panel)return;
    portControls(panel);browserSettings(panel);
    panel.querySelectorAll('.ui-companion-display-row').forEach(el=>el.remove());
    if(!panel.querySelector('.comfier-app-settings-heading')){const title=document.createElement('h2');title.className='comfier-app-settings-heading';title.textContent='ComfierUI Settings';panel.prepend(title)}
  }
  function captureSettings(){
    if(settingsRoot){heading();return true;}
    const root=document.getElementById(SETTINGS_ROOT_ID);if(!root)return false;
    settingsRoot=root;settingsRoot.classList.add('comfier-app-settings-content');settingsRoot.style.cssText='';heading();return true;
  }
  function mount(container){
    activeContainer=container;container.classList.add(PANEL_CLASS);
    if(captureSettings()&&settingsRoot.parentElement!==container)container.appendChild(settingsRoot);
    window.__cmMove?.refreshSettings?.();
  }
  function park(){
    // A late destroy from the legacy singleton must not steal the independently hosted settings.
    if(window.__comfierSidePanels?.isOpen('sidebar:'+TAB_ID)&&activeContainer?.hasAttribute?.('data-comfier-native-host'))return;
    window.__comfierThemeStudio?.close?.();
    if(activeContainer)activeContainer.classList.remove(PANEL_CLASS);activeContainer=null;
    if(settingsRoot&&settingsRoot.parentElement!==parking)parking.appendChild(settingsRoot);
  }
  function register(){registered=tab.ensure({icon:'icon-[lucide--ellipsis]',title:'ComfierUI Settings',tooltip:'ComfierUI Settings',label:'ComfierUI Settings',type:'custom',render:mount,destroy:park});if(registered)window.__comfierUnifiedSidebarTest?.refresh?.();return registered}
  function open(){
    if(!register())return false;
    if(!tab.active()){const store=tab.store();if(typeof store?.toggleSidebarTab==='function')store.toggleSidebarTab(TAB_ID);else if(store)store.activeSidebarTabId=TAB_ID;}
    if(tab.active())window.__comfierEarlyFloatingPanels?.activateLeft?.();schedule();return tab.active();
  }
  function closeIfOpen(){return tab.close()}
  function reconcile(){if(stopped)return;installMulti();captureSettings();if(window.__comfierSidePanels?.isOpen('sidebar:'+TAB_ID)){const host=document.getElementById('comfier-native-host-'+TAB_ID);if(host&&(activeContainer!==host||settingsRoot?.parentElement!==host||!host.classList.contains(PANEL_CLASS)))mount(host)}if(!registered||!tab.refresh())register();if(activeContainer&&settingsRoot&&settingsRoot.parentElement!==activeContainer)activeContainer.appendChild(settingsRoot)}
  function schedule(){if(!stopped)jobs.frame('reconcile',reconcile)}
  observer=window.__comfierMutations.create(records=>{if(!settingsRoot||!tab.refresh()||window.__comfierUi.affected(records,'#'+SETTINGS_ROOT_ID+',.side-bar-button,.side-bar-panel'))schedule()});observer.observe(document.body,{childList:true,subtree:true});
  document.addEventListener('click',schedule,true);window.addEventListener('resize',schedule,{passive:true});window.addEventListener('orientationchange',schedule,{passive:true});
  jobs.burst('startup',schedule,[0,50,150,400,1000]);

  window.__comfierSidebarBootstrap={
    open,close:closeIfOpen,closeIfOpen,refresh:schedule,
    remove(){if(stopped)return;stopped=true;jobs.dispose();if(multiTarget&&multiHandler)multiTarget.removeEventListener('click',multiHandler,true);observer?.disconnect();document.removeEventListener('click',schedule,true);window.removeEventListener('resize',schedule);window.removeEventListener('orientationchange',schedule);tab.remove();park();if(!settingsRoot)parking?.remove();style.remove();delete window.__comfierSidebarBootstrap;}
  };
})();
