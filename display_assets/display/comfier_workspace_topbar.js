(function(){
  'use strict';
  if(window.__comfierWorkspaceTopbar)return;
  const jobs=window.__comfierRuntime.scope('workspace-topbar');
  let host=null,position=null;
  const style=document.createElement('style');style.id='comfier-workspace-topbar-style';
  style.textContent='html body .comfier-workspace-topbar{z-index:var(--comfier-z-workspace,200)!important;isolation:isolate!important}';
  (document.head||document.documentElement).appendChild(style);
  function restore(){if(!host)return;host.classList.remove('comfier-workspace-topbar');if(position){if(position.value)host.style.setProperty('position',position.value,position.priority);else host.style.removeProperty('position')}host=null;position=null}
  function refresh(){
    const tabs=document.getElementById('topbar-workflow-tabs')||document.querySelector('[data-testid="topbar-workflow-tabs"]');
    if(!tabs?.isConnected){restore();return}
    const tr=tabs.getBoundingClientRect();if(tr.height<1)return;
    // Rank the complete native topbar strip, including its painted background
    // and neighboring controls, not just the tabs which already remained visible.
    let next=tabs;
    for(let p=tabs.parentElement;p&&p!==document.body;p=p.parentElement){
      if(p.querySelector('#graph-canvas,.graph-canvas-panel,.side-bar-panel'))break;
      const r=p.getBoundingClientRect();
      if(r.height>Math.max(96,tr.height*2)||r.height<tr.height)break;
      if(r.width>=innerWidth*.7&&r.top<=tr.top+1&&r.bottom>=tr.bottom-1)next=p;
    }
    if(next!==host){restore();host=next;host.classList.add('comfier-workspace-topbar');if(getComputedStyle(host).position==='static'){position={value:host.style.getPropertyValue('position'),priority:host.style.getPropertyPriority('position')};host.style.setProperty('position','relative','important')}}
  }
  function schedule(){jobs.frame('layout',refresh)}
  jobs.observe(document.body,{subtree:true,childList:true},schedule);
  jobs.listen(window,'resize',schedule,{passive:true});jobs.listen(window,'orientationchange',schedule,{passive:true});
  jobs.burst('startup',schedule,[0,80,300]);
  window.__comfierWorkspaceTopbar={refresh:schedule,remove(){jobs.dispose();restore();style.remove();delete window.__comfierWorkspaceTopbar}};
})();
