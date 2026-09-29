(function(){
  'use strict';
  const jobs=window.__comfierRuntime.scope('rail-proxy');
  window.__comfierSidebarProxyTabs?.remove?.();

  const STYLE_ID='comfier-sidebar-native-tabs-style';
  let stopped=false,observer=null,applying=false;

  document.getElementById(STYLE_ID)?.remove();
  const style=document.createElement('style');
  style.id=STYLE_ID;
  style.textContent=`
nav.side-tool-bar-container.floating-sidebar{
  border-right:0!important;
  box-shadow:none!important
}
`;
  (document.head||document.documentElement).appendChild(style);

  function outerLandscape(){return Math.min(screen.width,screen.height)<=520&&innerWidth>innerHeight}
  function relevantRail(rail){return!!(rail?.matches?.('.side-tool-bar-container')&&rail.querySelector('.side-bar-button[data-testid$="-tab-button"]'))}
  function enforce(){
    if(stopped||applying)return;applying=true;
    try{
      if(!outerLandscape())document.querySelectorAll('.side-tool-bar-container').forEach(rail=>{
        if(!relevantRail(rail))return;
        if(rail.classList.contains('connected-sidebar'))rail.classList.remove('connected-sidebar');
        if(!rail.classList.contains('floating-sidebar'))rail.classList.add('floating-sidebar');
      });
      window.__comfierEarlyFloatingPanels?.refresh?.();
    }finally{applying=false}
  }
  function schedule(){if(!stopped)jobs.frame('layout',enforce)}

  observer=window.__comfierMutations.create(records=>{
    if(applying)return;
    if(window.__comfierUi.affected(records,'.side-tool-bar-container,.side-toolbar-container,.side-bar-button'))schedule();
  },'immediate');
  observer.observe(document.body,{subtree:true,childList:true,attributes:true,attributeFilter:['class']});
  window.addEventListener('resize',schedule,{passive:true});
  window.addEventListener('orientationchange',schedule,{passive:true});
  jobs.burst('startup',schedule,[0,50,150,400,900]);

  window.__comfierSidebarProxyTabs={
    refresh:schedule,
    remove(){if(stopped)return;
      stopped=true;jobs.dispose();observer?.disconnect();
      window.removeEventListener('resize',schedule);window.removeEventListener('orientationchange',schedule);
      style.remove();delete window.__comfierSidebarProxyTabs;
    }
  };
})();
