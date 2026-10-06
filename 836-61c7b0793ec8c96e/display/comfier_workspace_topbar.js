(function(){
  'use strict';
  window.__comfierWorkspaceTopbar?.remove?.();
  const runtime=window.__comfierRuntime,jobs=runtime.scope('workspace-topbar');
  let host=null,tabs=null,position=null;const progressRoots=new Map(),sized=new Set();
  const sources='#topbar-workflow-tabs,[data-testid="topbar-workflow-tabs"],rgthree-progress-bar';
  const sizes=typeof ResizeObserver==='function'?new ResizeObserver(()=>schedule()):null;
  jobs.own(()=>{sizes?.disconnect();sized.clear()});
  function watchSizes(){
    const next=new Set([tabs,host,...progressRoots.keys()].filter(el=>el?.isConnected));
    if(next.size===sized.size&&[...next].every(el=>sized.has(el)))return;
    sizes?.disconnect();sized.clear();for(const el of next){sized.add(el);sizes?.observe(el)}
  }
  const style=document.createElement('style');style.id='comfier-workspace-topbar-style';
  style.textContent='html body rgthree-progress-bar,html body .comfier-progress-chrome{z-index:200!important} html body .comfier-workspace-topbar{z-index:var(--comfier-z-workspace,200)!important;isolation:isolate!important}';
  (document.head||document.documentElement).appendChild(style);
  function restore(){if(!host)return;host.classList.remove('comfier-workspace-topbar');if(position){if(position.value)host.style.setProperty('position',position.value,position.priority);else host.style.removeProperty('position')}host=null;position=null}
  function progressChrome(){
    const live=new Set();
    for(const bar of document.querySelectorAll('rgthree-progress-bar')){
      let root=bar;const br=bar.getBoundingClientRect();
      for(let parent=bar.parentElement;parent&&parent!==document.body;parent=parent.parentElement){
        if(parent.querySelector('#graph-canvas,.graph-canvas-panel,[data-comfier-side-panel],.comfier-native-side-host'))break;
        const r=parent.getBoundingClientRect();if(r.height>Math.max(64,br.height*3)||r.height<br.height||r.width<br.width)break;root=parent;
      }
      for(const el of new Set([bar,root])){live.add(el);if(!progressRoots.has(el))progressRoots.set(el,{value:el.style.getPropertyValue('z-index'),priority:el.style.getPropertyPriority('z-index')});if(!el.classList.contains('comfier-progress-chrome'))el.classList.add('comfier-progress-chrome');if(el.style.getPropertyValue('z-index')!=='200'||el.style.getPropertyPriority('z-index')!=='important')el.style.setProperty('z-index','200','important')}
    }
    for(const [el,old]of progressRoots)if(!live.has(el)){el.classList.remove('comfier-progress-chrome');if(old.value)el.style.setProperty('z-index',old.value,old.priority);else el.style.removeProperty('z-index');progressRoots.delete(el)}
  }
  function refresh(){
    progressChrome();
    tabs=document.getElementById('topbar-workflow-tabs')||document.querySelector('[data-testid="topbar-workflow-tabs"]');
    if(!tabs?.isConnected){restore();watchSizes();return}
    const tr=tabs.getBoundingClientRect();if(tr.height<1){watchSizes();return}
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
    watchSizes();
  }
  function schedule(){jobs.frame('layout',refresh)}
  jobs.observe(document.body,{subtree:true,childList:true,attributes:true,attributeFilter:['style','class']},records=>{
    const roots=[tabs,host,...progressRoots.keys()].filter(el=>el?.isConnected);
    if(records.some(r=>{
      if(!runtime.relevant([r]))return false;
      const el=r.target.nodeType===1?r.target:r.target.parentElement;
      if(roots.some(root=>root===el||root.contains(el)||el?.contains(root)))return true;
      return r.type==='childList'&&[...r.addedNodes,...r.removedNodes].some(n=>n.nodeType===1&&(n.matches(sources)||n.querySelector(sources)));
    }))schedule();
  });
  jobs.listen(window,'resize',schedule,{passive:true});jobs.listen(window,'orientationchange',schedule,{passive:true});
  jobs.burst('startup',schedule,[0,80,300]);
  window.__comfierWorkspaceTopbar={refresh:schedule,remove(){jobs.dispose();restore();for(const [el,old]of progressRoots){el.classList.remove('comfier-progress-chrome');if(old.value)el.style.setProperty('z-index',old.value,old.priority);else el.style.removeProperty('z-index')}progressRoots.clear();style.remove();delete window.__comfierWorkspaceTopbar}};
})();
