(function(){
  'use strict';
  const jobs=window.__comfierRuntime.scope('rail-proxy');
  window.__comfierSidebarProxyTabs?.remove?.();

  const STYLE_ID='comfier-sidebar-native-tabs-style';
  let stopped=false,observer=null,applying=false,lifecycle=null,proactive=false,lastConnected=null;

  document.getElementById(STYLE_ID)?.remove();
  const style=document.createElement('style');
  style.id=STYLE_ID;
  style.textContent=`
nav.side-tool-bar-container.floating-sidebar{
  border-right:0!important;
  box-shadow:none!important
}
html.comfier-connected-landscape nav.side-tool-bar-container.connected-sidebar{display:flex!important;visibility:visible!important;opacity:1!important;pointer-events:auto!important;transform:none!important}
html.comfier-connected-landscape nav.side-tool-bar-container.connected-sidebar .sidebar-item-group{display:flex!important;visibility:visible!important;pointer-events:auto!important}
`;
  (document.head||document.documentElement).appendChild(style);

  function outerLandscape(){if(window.__comfierViewport)return window.__comfierViewport.mode()==='outerLandscape';return Math.min(screen.width,screen.height)<=520&&innerWidth>innerHeight}
  function relevantRail(rail){if(rail?.closest?.('[data-comfier-connected-sidebar]'))return false;return!!(rail?.matches?.('.side-tool-bar-container')&&rail.querySelector('.side-bar-button'))}
  function enforce(){
    if(stopped||applying)return;applying=true;
    try{
      // Keep the native rail in the same two modes as the 0.88.0 layout.
      // The viewport transition can leave the portrait floating marker behind.
      let changed=false;const toggle=(el,name,on)=>{if(el.classList.contains(name)!==!!on){el.classList.toggle(name,on);changed=true}};
      toggle(document.documentElement,'comfier-connected-landscape',(window.__comfierConnectedSidebar?.enabled?.()??outerLandscape())&&!window.__comfierConnectedSidebar?.root?.());
      if(lifecycle?.ready()&&proactive){const connected=window.__comfierConnectedSidebar?.enabled?.()??outerLandscape();if(lastConnected!==connected){lastConnected=connected;for(const c of lifecycle.instances())c.update?.();changed=true}if(changed)window.__comfierEarlyFloatingPanels?.refresh?.();return}
      document.querySelectorAll('.side-tool-bar-container').forEach(rail=>{
        if(!relevantRail(rail))return;
        const connected=window.__comfierConnectedSidebar?.enabled?.()??outerLandscape();
        toggle(rail,'floating-sidebar',!connected);
        toggle(rail,'connected-sidebar',connected);
      });
      if(changed)window.__comfierEarlyFloatingPanels?.refresh?.();
    }finally{applying=false}
  }
  function schedule(){if(!stopped)jobs.frame('layout',enforce)}

  observer=window.__comfierMutations.create(records=>{
    if(applying)return;
    if(window.__comfierUi.affected(records,'.side-tool-bar-container,.side-toolbar-container,.side-bar-button'))schedule();
  });
  observer.observe(document.body,{subtree:true,childList:true,attributes:true,attributeFilter:['class']});
  lifecycle=window.__comfierUi?.watchComponents?.(['SideToolbar'],c=>{
    proactive=true;observer.disconnect();const ui=window.__comfierUi;
    return ui.renderPatch(c,node=>{if(node?.type!=='nav')return node;const connected=window.__comfierConnectedSidebar?.enabled?.()??outerLandscape(),classes=String(node.props?.class||'').split(/\s+/).filter(v=>v&&v!=='floating-sidebar'&&v!=='connected-sidebar');classes.push(connected?'connected-sidebar':'floating-sidebar');return ui.vnodePatch(node,{props:{...node.props,class:classes.join(' ')}})});
  });
  window.addEventListener('resize',schedule,{passive:true});
  window.addEventListener('orientationchange',schedule,{passive:true});
  jobs.listen(window,'comfier-sidebar-mode-change',schedule);
  jobs.burst('startup',schedule,[0,50,150,400,900]);

  window.__comfierSidebarProxyTabs={
    refresh:schedule,
    remove(){if(stopped)return;
      stopped=true;jobs.dispose();observer?.disconnect();lifecycle?.remove();
      window.removeEventListener('resize',schedule);window.removeEventListener('orientationchange',schedule);
      document.documentElement.classList.remove('comfier-connected-landscape');
      style.remove();delete window.__comfierSidebarProxyTabs;
    }
  };
})();
