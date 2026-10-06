(function(){
  'use strict';
  window.__comfierTemplatesSidebar?.remove?.();
  const TAB_ID='comfier-templates',STYLE_ID='comfier-templates-sidebar-style';
  const DIALOG='[role="dialog"][aria-labelledby="global-workflow-template-selector"]',NATIVE_BUTTON='button.templates-tab-button',PANEL_CLASS='comfier-templates-native-panel';
  let stopped=false,observer=null;
  const jobs=window.__comfierRuntime.scope('sidebar:'+TAB_ID);
  document.getElementById(STYLE_ID)?.remove();
  const style=document.createElement('style');style.id=STYLE_ID;style.textContent=`
html.comfier-templates-bootstrap ${DIALOG},html.comfier-templates-bootstrap [data-testid="dialog-overlay"]{display:none!important;visibility:hidden!important;opacity:0!important;pointer-events:none!important}
${NATIVE_BUTTON}{display:none!important}
.${PANEL_CLASS}{min-width:0!important;min-height:0!important;overflow:hidden!important}
.${PANEL_CLASS},.${PANEL_CLASS} *{touch-action:none!important}
.${PANEL_CLASS} .scrollbar-custom{overscroll-behavior:contain!important}
html body .${PANEL_CLASS}[data-comfier-templates-native-scroll],html body .${PANEL_CLASS}[data-comfier-templates-native-scroll] *{touch-action:pan-y!important}
html.comfier-early-floating-panels body .${PANEL_CLASS}[data-comfier-templates-native-scroll] :is(.sidebar-content-container,.scrollbar-custom){touch-action:pan-y!important;overscroll-behavior:contain!important}
.${PANEL_CLASS} button[aria-label="Close dialog"]{display:none!important;visibility:hidden!important;pointer-events:none!important}
.${PANEL_CLASS} .relative.overflow-hidden.rounded-2xl{width:100%!important;max-width:none!important;height:100%!important;max-height:none!important;min-width:0!important;min-height:0!important;border-radius:0!important}
.${PANEL_CLASS} .grid.size-full{width:100%!important;height:100%!important;min-width:0!important;min-height:0!important}`;(document.head||document.documentElement).appendChild(style);
  function visible(el){if(!el?.isConnected)return false;const r=el.getBoundingClientRect(),s=getComputedStyle(el);return r.width>1&&r.height>1&&s.display!=='none'&&s.visibility!=='hidden'}
  const native=window.__comfierUi.nativeTab({
    id:TAB_ID,name:'WorkflowTemplateSelectorDialog',dialogKey:'global-workflow-template-selector',dialog:DIALOG,bootstrapClass:'comfier-templates-bootstrap',
    trigger:()=>document.querySelector(NATIVE_BUTTON),
    tab:{icon:'icon-[lucide--layout-template]',title:'Templates',tooltip:'Templates',label:'Templates'},ready:schedule
  });
  const active=native.active;
  function tabButton(){return document.querySelector(`[data-testid="${TAB_ID}-tab-button"],button[aria-label="Templates"]:not(.templates-tab-button)`)||null}
  function orderButton(){if(tabButton())window.__comfierUnifiedSidebarTest?.refresh?.()}
  function panelTarget(){
    if(!active())return null;
    const heading=Array.from(document.querySelectorAll('h1,h2,h3,[role="heading"]')).find(el=>visible(el)&&/^templates$/i.test((el.textContent||'').trim()));let panel=heading;
    for(let depth=0;panel&&panel!==document.body&&depth<10;depth++,panel=panel.parentElement){if(panel.matches?.('.side-bar-panel,.p-splitterpanel,[role="complementary"]'))return panel}return heading?.closest?.('.relative.overflow-hidden.rounded-2xl')||null
  }
  function markPanel(){
    const target=panelTarget();let changed=false;
    const nativeScroll=!!window.__COMFIER_CLOUD_MODE||(window.__comfierViewport?window.__comfierViewport.mode()==='outerPortrait':Math.min(screen.width,screen.height)<=520&&innerHeight>innerWidth);
    document.querySelectorAll('[data-comfier-templates-native-scroll]').forEach(el=>{if(el!==target||!nativeScroll){el.removeAttribute('data-comfier-templates-native-scroll');changed=true}});
    if(target&&nativeScroll&&!target.hasAttribute('data-comfier-templates-native-scroll')){target.setAttribute('data-comfier-templates-native-scroll','');changed=true}document.querySelectorAll('.'+PANEL_CLASS).forEach(el=>{if(el!==target){el.classList.remove(PANEL_CLASS);changed=true}});if(target&&!target.classList.contains(PANEL_CLASS)){target.classList.add(PANEL_CLASS);changed=true}return changed
  }
  function close(){const closed=native.close();if(closed)schedule();return closed}
  function reconcile(){if(stopped)return;if(!native.ensure())return;{orderButton();if(markPanel())window.__comfierEarlyFloatingPanels?.refresh?.()}}function schedule(){if(!stopped)jobs.frame('reconcile',reconcile)}
  function interaction(event){const button=event.target?.closest?.('button,[role="button"]');if(!native.registered()||button&&(button===tabButton()||button===document.querySelector(NATIVE_BUTTON))||event.target?.closest?.('.'+PANEL_CLASS))schedule()}
  observer=window.__comfierMutations.create(records=>{if(!native.registered()||window.__comfierUi.affected(records,DIALOG+',.side-bar-button,.side-bar-panel,.p-splitterpanel,[role="complementary"]'))schedule()});observer.observe(document.body,{subtree:true,childList:true,attributes:true,attributeFilter:['data-state','aria-expanded','aria-selected']});document.addEventListener('click',interaction,true);window.addEventListener('resize',schedule,{passive:true});window.addEventListener('orientationchange',schedule,{passive:true});jobs.burst('startup',schedule,[0,60,180,500,1200]);
  window.__comfierTemplatesSidebar={closeIfOpen:close,refresh:schedule,remove(){if(stopped)return;stopped=true;jobs.dispose();native.remove();observer?.disconnect();document.removeEventListener('click',interaction,true);window.removeEventListener('resize',schedule);window.removeEventListener('orientationchange',schedule);document.querySelectorAll('[data-comfier-templates-native-scroll]').forEach(el=>el.removeAttribute('data-comfier-templates-native-scroll'));document.querySelectorAll('.'+PANEL_CLASS).forEach(el=>el.classList.remove(PANEL_CLASS));style.remove();delete window.__comfierTemplatesSidebar}};
})();
