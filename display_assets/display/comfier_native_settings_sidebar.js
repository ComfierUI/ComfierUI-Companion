(function(){
  'use strict';
  window.__comfierNativeSettingsSidebar?.remove?.();

  const TAB_ID='comfier-native-settings';
  const STYLE_ID='comfier-native-settings-sidebar-style';
  const DIALOG='[data-testid="settings-dialog"]';
  const PANEL_CLASS='comfier-native-settings-panel';
  const SOURCE_CLASS='comfier-native-settings-source';
  let stopped=false,observer=null;

  const jobs=window.__comfierRuntime.scope('sidebar:'+TAB_ID);
  document.getElementById(STYLE_ID)?.remove();
  const style=document.createElement('style');
  style.id=STYLE_ID;
  style.textContent=`
html.comfier-settings-bootstrap ${DIALOG},html.comfier-settings-bootstrap [data-testid="dialog-overlay"]{display:none!important;visibility:hidden!important;opacity:0!important;pointer-events:none!important}
.${SOURCE_CLASS}{display:none!important;visibility:hidden!important;pointer-events:none!important}
.${PANEL_CLASS}{width:100%!important;height:100%!important;min-width:0!important;min-height:0!important;overflow:hidden!important}
.${PANEL_CLASS} ${DIALOG}{width:100%!important;max-width:none!important;height:100%!important;max-height:none!important;min-width:0!important;min-height:0!important;border-radius:0!important;overflow:hidden!important}
.${PANEL_CLASS} ${DIALOG}>.grid{width:100%!important;height:100%!important;min-width:0!important;min-height:0!important}
.${PANEL_CLASS} ${DIALOG} .scrollbar-custom,.${PANEL_CLASS} ${DIALOG} nav.overflow-y-auto{overscroll-behavior:contain!important}
.${PANEL_CLASS} ${DIALOG} button[aria-label="Close dialog"]{display:none!important;visibility:hidden!important;pointer-events:none!important}
`;
  (document.head||document.documentElement).appendChild(style);

  function visible(el){if(!el?.isConnected)return false;const r=el.getBoundingClientRect(),s=getComputedStyle(el);return r.width>1&&r.height>1&&s.display!=='none'&&s.visibility!=='hidden'}
  function label(el){return((el?.getAttribute?.('aria-label')||'')+' '+(el?.getAttribute?.('title')||'')).replace(/\s+/g,' ').trim()}
  function sourceButton(){return document.querySelector('.'+SOURCE_CLASS)||Array.from(document.querySelectorAll('.side-bar-button')).find(button=>/^Settings\b/i.test(label(button))&&!/App Settings|Comfy Settings/i.test(label(button)))||null}

  const native=window.__comfierUi.nativeTab({
    id:TAB_ID,name:'SettingDialog',dialog:DIALOG,bootstrapClass:'comfier-settings-bootstrap',
    trigger:()=>sourceButton(),
    tab:{icon:'icon-[lucide--settings]',title:'Comfy Settings',tooltip:'Comfy Settings',label:'Comfy Settings'},ready:schedule
  });
  const active=native.active;
  function tabButton(){return document.querySelector(`[data-testid="${TAB_ID}-tab-button"]`)||Array.from(document.querySelectorAll('.side-bar-button')).find(button=>/Comfy Settings/i.test(label(button)))||null}
  function orderButton(){
    const button=tabButton(),source=sourceButton();
    if(button&&source&&!source.classList.contains(SOURCE_CLASS))source.classList.add(SOURCE_CLASS);
    if(button)window.__comfierUnifiedSidebarTest?.refresh?.();
  }
  function panelTarget(){
    if(!active())return null;
    const dialog=Array.from(document.querySelectorAll(DIALOG)).find(visible)||null;let panel=dialog;
    for(let depth=0;panel&&panel!==document.body&&depth<12;depth++,panel=panel.parentElement){if(panel.matches?.('.side-bar-panel,.p-splitterpanel,[role="complementary"]'))return panel}
    return dialog;
  }
  function markPanel(){
    const target=panelTarget();let changed=false;
    document.querySelectorAll('.'+PANEL_CLASS).forEach(el=>{if(el!==target){el.classList.remove(PANEL_CLASS);changed=true}});
    if(target&&!target.classList.contains(PANEL_CLASS)){target.classList.add(PANEL_CLASS);changed=true}
    return changed;
  }
  function close(){const closed=native.close();if(closed)schedule();return closed}
  function reconcile(){if(stopped)return;if(!native.ensure())return;{orderButton();if(markPanel())window.__comfierEarlyFloatingPanels?.refresh?.()}}
  function schedule(){if(!stopped)jobs.frame('reconcile',reconcile)}

  observer=window.__comfierMutations.create(records=>{if(!native.registered()||window.__comfierUi.affected(records,DIALOG+',.side-bar-button,.side-bar-panel,.p-splitterpanel,[role="complementary"]'))schedule()});
  observer.observe(document.body,{subtree:true,childList:true,attributes:true,attributeFilter:['data-state','aria-expanded','aria-selected']});
  document.addEventListener('click',schedule,true);
  window.addEventListener('resize',schedule,{passive:true});window.addEventListener('orientationchange',schedule,{passive:true});
  jobs.burst('startup',schedule,[0,60,180,500,1200]);

  window.__comfierNativeSettingsSidebar={
    closeIfOpen:close,refresh:schedule,
    remove(){if(stopped)return;
      stopped=true;jobs.dispose();native.remove();observer?.disconnect();
      document.removeEventListener('click',schedule,true);window.removeEventListener('resize',schedule);window.removeEventListener('orientationchange',schedule);
      document.querySelectorAll('.'+PANEL_CLASS).forEach(el=>el.classList.remove(PANEL_CLASS));document.querySelectorAll('.'+SOURCE_CLASS).forEach(el=>el.classList.remove(SOURCE_CLASS));

      style.remove();delete window.__comfierNativeSettingsSidebar;
    }
  };
})();
