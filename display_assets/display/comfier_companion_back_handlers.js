(function(){
  'use strict';
  const back=window.__comfierBack;if(!back||window.__comfierCompanionBackHandlers)return;window.__comfierCompanionBackHandlers=true;
  const visible=el=>{if(!el?.isConnected)return false;const r=el.getBoundingClientRect(),s=getComputedStyle(el);return r.width>1&&r.height>20&&s.display!=='none'&&s.visibility!=='hidden'&&Number(s.opacity||1)>.01};
  const label=el=>((el?.getAttribute?.('aria-label')||'')+' '+(el?.getAttribute?.('title')||'')+' '+(el?.textContent||'')).replace(/\s+/g,' ').trim().toLowerCase();
  const isLogsButton=el=>{const name=label(el);return name.includes('toggle bottom panel')||name==='logs'||name.includes('open logs')};
  function closeLogs(){const panel=Array.from(document.querySelectorAll('div.p-splitterpanel.bottom-panel,.bottom-panel,.comfier-early-floating-bottom')).find(el=>el.id!=='comfier-downloads-bottom-panel'&&visible(el));if(!panel)return false;const remembered=window.__comfyRemoteV0712LogsButton,button=remembered?.isConnected&&isLogsButton(remembered)?remembered:Array.from(document.querySelectorAll('.side-bar-button,button,[role="button"]')).reverse().find(isLogsButton);if(!button)return false;button.click();return true;}
  document.addEventListener('click',function(event){const button=event.target?.closest?.('button,[role="button"]');if(button&&isLogsButton(button))window.__comfierDownloads?.closeIfOpen?.();},true);
  back.register('node-search',20,()=>window.__comfierNodeSearchShell?.handleBack?.()||false);
  back.register('media',50,()=>window.__comfierMediaAssetsBack?.handleBack?.()||false);
  back.register('app-settings',60,()=>window.__comfierSidebarBootstrap?.closeIfOpen?.()||false);
  back.register('comfy-settings',120,()=>window.__comfierNativeSettingsSidebar?.closeIfOpen?.()||false);
  back.register('templates',130,()=>window.__comfierTemplatesSidebar?.closeIfOpen?.()||false);
  back.register('floating-panels',140,()=>window.__comfierEarlyFloatingPanels?.close?.()||false);
  back.register('downloads',150,()=>window.__comfierDownloads?.closeIfOpen?.()||false);
  back.register('logs',160,closeLogs);
})();
