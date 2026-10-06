(function(){
  'use strict';
  if(window.__comfierBack)return;
  const handlers=new Map();let last=null,dispatching=false;
  function register(name,priority,run){const entry={name,priority,run};handlers.set(name,entry);return()=>{if(handlers.get(name)===entry)handlers.delete(name)}}
  function dispatch(minimum=0){
    if(dispatching)return false;dispatching=true;last=null;
    try{for(const entry of Array.from(handlers.values()).sort((a,b)=>a.priority-b.priority||a.name.localeCompare(b.name))){if(entry.priority<minimum)continue;if(entry.run()){last=entry.name;window.__comfierRuntime?.count('back.'+last);return true}}return false}finally{dispatching=false}
  }
  const localUi=window.__comfierNativeUiOwner!=='companion';
  function visible(el){if(!el?.isConnected)return false;const r=el.getBoundingClientRect(),s=getComputedStyle(el);return r.width>1&&r.height>20&&s.display!=='none'&&s.visibility!=='hidden'&&Number(s.opacity||1)>.01}
  const label=el=>((el?.getAttribute?.('aria-label')||'')+' '+(el?.getAttribute?.('title')||'')+' '+(el?.textContent||'')).replace(/\s+/g,' ').trim().toLowerCase();
  const isLogsButton=el=>{const name=label(el);return name.includes('toggle bottom panel')||name==='logs'||name.includes('open logs')};
  function closeLogs(){
    const panel=Array.from(document.querySelectorAll('div.p-splitterpanel.bottom-panel,.bottom-panel,.comfier-early-floating-bottom')).find(el=>el.id!=='comfier-downloads-bottom-panel'&&visible(el));if(!panel)return false;
    const remembered=window.__comfyRemoteV0712LogsButton,button=remembered?.isConnected&&isLogsButton(remembered)?remembered:Array.from(document.querySelectorAll('.side-bar-button,button,[role="button"]')).reverse().find(isLogsButton);
    if(!button)return false;button.click();window.__comfierRequestLayout?.();return true;
  }
  // Downloads and Logs are alternate contents of one bottom space. Close
  // Downloads before the native Logs toggle runs, so one tap opens Logs.
  if(localUi)document.addEventListener('click',function(event){
    const button=event.target?.closest?.('button,[role="button"]');
    if(button&&isLogsButton(button))window.__comfierDownloads?.closeIfOpen?.();
  },true);
  // Native priority is unchanged. Lazy lookup keeps late-installed features usable.
  if(localUi)register('node-search',20,()=>window.__comfierNodeSearchShell?.handleBack?.());
  register('node-appearance',15,()=>window.__comfierNodeAppearance?.close?.());
  register('prompt',30,()=>window.__comfierPromptPopup?.isOpen?.()&&window.__comfierPromptPopup?.close?.());
  register('tap-link',40,()=>window.__comfierTapLink?.handleBack?.());
  if(localUi)register('owned-panel-preview',48,()=>window.__comfierFeedPanel?.closePreview?.());
  if(localUi)register('owned-side-panel-stack',49,()=>!window.__comfierSidePanels&&window.__comfierEarlyFloatingPanels?.closeOwnedStack?.());
  if(localUi)register('owned-panel-page-preview',105,()=>window.__comfierFeedPanel?.closePreview?.());
  if(localUi)register('owned-side-panel-page-stack',110,()=>!window.__comfierSidePanels&&window.__comfierEarlyFloatingPanels?.closeOwnedStack?.());
  if(localUi)register('media',50,()=>window.__comfierMediaAssetsBack?.handleBack?.());
  if(localUi)register('app-settings',60,()=>!window.__comfierSidePanels&&window.__comfierSidebarBootstrap?.closeIfOpen?.());
  if(localUi)register('comfy-settings',120,()=>!window.__comfierSidePanels&&window.__comfierNativeSettingsSidebar?.closeIfOpen?.());
  if(localUi)register('templates',130,()=>!window.__comfierSidePanels&&window.__comfierTemplatesSidebar?.closeIfOpen?.());
  if(localUi)register('floating-panels',140,()=>!window.__comfierSidePanels&&window.__comfierEarlyFloatingPanels?.close?.());
  if(localUi)register('downloads',150,()=>window.__comfierDownloads?.closeIfOpen?.());
  if(localUi)register('logs',160,closeLogs);
  const page=()=>dispatch(100);
  window.__comfierBack={register,dispatch,...(localUi?{closeLogs}:{}),snapshot:()=>({last,order:Array.from(handlers.values()).sort((a,b)=>a.priority-b.priority).map(entry=>entry.name)})};
  window.__comfyRemoteV075HandleBack=page;
})();
