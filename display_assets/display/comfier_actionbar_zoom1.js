(function(){
  'use strict';
  window.__forceActionbarContainerZoom1?.stop?.();
  const runtime=window.__comfierRuntime,jobs=runtime.scope('actionbar');
  const selector='[data-testid="action-bar-card"] .actionbar-container',crystools='#crystools-monitors-root';
  const put=(el,name,value)=>runtime.writeStyle(el,name,value,'actionbar');
  function fixZoom(){if(!jobs.alive)return;document.querySelectorAll(selector).forEach(el=>put(el,'zoom','1'))}
  function clear(el,props){if(el)props.forEach(name=>{if(el.style.getPropertyValue(name))el.style.removeProperty(name)})}
  function fix(){
    if(!jobs.alive)return;fixZoom();
    document.querySelectorAll(crystools).forEach(root=>{
      const legacy=root.closest('[data-testid="legacy-topbar-container"]'),container=root.closest('.actionbar-container'),card=container?.parentElement;if(!legacy||!container||!card)return;
      const empty=!root.querySelector('* > *:not(:empty)'),portrait=innerWidth<=520&&innerHeight>innerWidth;
      // Clear the old wide-view sizes on the portrait transition, in this owner.
      if(portrait){clear(card,['height','min-height','max-height','overflow']);clear(container,['display','flex-wrap','height','min-height','max-height','align-items','align-content','overflow','max-width','box-sizing']);clear(legacy,['display','height','min-height','max-height','align-items','align-self','overflow']);clear(root,['align-self'])}
      if(legacy.dataset.comfierCrystoolsEmpty==='true'&&!empty){delete legacy.dataset.comfierCrystoolsEmpty;clear(legacy,['display','width','min-width','max-width','flex','padding','margin','gap'])}
      if(!portrait){
        for(const [name,value] of Object.entries({display:'flex','flex-wrap':'wrap',height:'auto','min-height':'0','max-height':'none','align-content':'center','align-items':'center',overflow:'visible','max-width':'100%','box-sizing':'border-box'}))put(container,name,value);
        for(const [name,value] of Object.entries({display:'flex',height:'auto','min-height':'0','max-height':'none','align-items':'center','align-self':'center',overflow:'visible'}))if(!empty||name!=='display')put(legacy,name,value);
        for(const [name,value] of Object.entries({height:'auto','min-height':'32px','max-height':'none',overflow:'visible'}))put(card,name,value);put(root,'align-self','center');
      }
      if(empty){legacy.dataset.comfierCrystoolsEmpty='true';for(const [name,value] of Object.entries({display:'none',width:'0','min-width':'0','max-width':'0',flex:'0 0 0',padding:'0',margin:'0',gap:'0'}))put(legacy,name,value)}
    });
  }
  function schedule(){jobs.frame('layout',fix)}
  jobs.observe(document.body,{subtree:true,childList:true},records=>{if(window.__comfierUi.affected(records,selector+','+crystools))schedule()});
  jobs.observe(document.body,{subtree:true,childList:true,attributes:true,attributeFilter:['style','class']},records=>{if(window.__comfierUi.affected(records,selector))jobs.frame('zoom',fixZoom)});
  jobs.listen(window,'resize',schedule,{passive:true});jobs.listen(window,'orientationchange',schedule,{passive:true});
  const controller={fix,stop(){jobs.dispose();if(window.__forceActionbarContainerZoom1===controller)delete window.__forceActionbarContainerZoom1}};
  window.__forceActionbarContainerZoom1=controller;fix();
})();
