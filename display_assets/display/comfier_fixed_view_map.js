(function(){
  'use strict';
  window.__comfierFixedViewMap?.remove?.();
  function logical(r){return window.__comfierLayoutSide?.rect(r)||r}
  const jobs=window.__comfierRuntime.scope('fixed-view-map');
  let stopped=false,lastFamily='',observer=null;
  const tracked=new WeakMap();
  function outerDisplay(){return Math.min(screen.width,screen.height)<=520}
  function family(){if(outerDisplay())return innerHeight>innerWidth?'outer-portrait':'outer-landscape';return 'inner-tablet'}
  function visible(el){if(!el?.isConnected)return false;const r=logical(el.getBoundingClientRect()),s=getComputedStyle(el);return r.width>0&&r.height>0&&s.display!=='none'&&s.visibility!=='hidden'}
  function csspx(value,zoom=1){return (value/Math.max(.01,zoom))+'px'}
  function zoom(){const v=parseFloat(window.__comfierUiZoomValue)||1;return Math.max(.3,Math.min(2,v))}
  function set(el,name,value,priority='important'){if(window.__comfierLayoutSide){[name,value]=window.__comfierLayoutSide.property(name,value)}if(!el)return false;if(el.style.getPropertyValue(name)===value&&el.style.getPropertyPriority(name)===priority)return false;el.style.setProperty(name,value,priority);return true}
  function ensureVisible(el){if(!el)return false;let changed=false;if(el.hidden){el.hidden=false;changed=true}changed=set(el,'display','flex')||changed;changed=set(el,'visibility','visible')||changed;changed=set(el,'opacity','1')||changed;changed=set(el,'pointer-events','auto')||changed;return changed}
  function remember(el,key,value){if(!el)return false;let map=tracked.get(el);if(!map){map={};tracked.set(el,map)}if(map[key]===value)return false;map[key]=value;return true}
  function rail(){return document.querySelector('.comfier-unified-floating-rail')}
  function connectedRailRight(){
    const canvas=document.getElementById('graph-canvas-container'),cr=logical(canvas?.getBoundingClientRect())||{left:0};let edge=cr.left;
    document.querySelectorAll('.side-toolbar-container,.side-tool-bar-container').forEach(el=>{if(!visible(el))return;const r=logical(el.getBoundingClientRect());if(r.left<=cr.left+8&&r.width>=20&&r.width<220&&r.height>innerHeight*.35)edge=Math.max(edge,r.right)});return Math.ceil(edge);
  }
  function workflowDock(){return document.getElementById('comfier-workflow-actions-floating-dock')}
  function canvasToolbar(){return document.querySelector('.graph-canvas-panel > div.pointer-events-auto > span[role="toolbar"][aria-label="Canvas Toolbar"]')||document.querySelector('[role="toolbar"][aria-label="Canvas Toolbar"]')}
  function runDock(){return document.querySelector('.comfier-early-queue-dock')}
  function actionSurface(){return window.__comfierLayoutSide?.actionSurface?.()||null}
  function workspaceTop(){
    const tabs=document.getElementById('topbar-workflow-tabs')||document.querySelector('[data-testid="topbar-workflow-tabs"]');
    if(tabs){const rs=[tabs,...tabs.children].map(el=>logical(el.getBoundingClientRect()));const b=Math.max(...rs.map(r=>r.bottom));if(isFinite(b))return Math.ceil(b)}
    return Math.ceil(document.getElementById('graph-canvas-container')?.getBoundingClientRect().top||0);
  }
  function bottomNavTop(){
    // On outer views the native bottom navigation occupies the bottom edge. Use the
    // tallest visible bottom-edge bar as the anchor; fall back to the viewport edge.
    let top=innerHeight;
    document.querySelectorAll('nav,[role="navigation"],.bottom-nav,.bottom-navigation').forEach(el=>{if(!visible(el))return;const r=logical(el.getBoundingClientRect());if(r.bottom>=innerHeight-2&&r.top>innerHeight*.55&&r.height<180)top=Math.min(top,r.top)});
    return top;
  }
  function pinInnerTablet(){
    const z=zoom(),top=workspaceTop(),wf=workflowDock(),ct=canvasToolbar(),run=runDock(),act=actionSurface(),r=rail();
    if(r){set(r,'left','4px');set(r,'right','auto')}
    if(wf){set(wf,'position','fixed');set(wf,'left','4px');set(wf,'right','auto');set(wf,'top',(top+4)+'px');set(wf,'bottom','auto')}
    if(act){set(act,'position','fixed');set(act,'left','auto');set(act,'right',csspx(4,z));set(act,'top',csspx(top+4,z));set(act,'bottom','auto')}
    if(ct){ensureVisible(ct);ct.classList.remove('comfier-early-canvas-toolbar-centered');set(ct,'position','fixed');set(ct,'left',csspx(4,z));set(ct,'right','auto');set(ct,'bottom',csspx(4,z));set(ct,'top','auto');set(ct,'transform','none');set(ct,'transform-origin','bottom left');set(ct,'zoom',String(z))}
    if(run){set(run,'left','auto');set(run,'right',csspx(4,z));set(run,'bottom',csspx(4,z));set(run,'top','auto');set(run,'transform','none');set(run,'transform-origin','bottom right');set(run,'zoom',String(z))}
  }
  function pinOuterLandscape(){
    const z=zoom(),top=workspaceTop(),edge=connectedRailRight(),wf=workflowDock(),ct=canvasToolbar(),run=runDock(),act=actionSurface();
    if(wf){set(wf,'position','fixed');set(wf,'left',(edge+4)+'px');set(wf,'right','auto');set(wf,'top',(top+4)+'px');set(wf,'bottom','auto')}
    if(act){set(act,'position','fixed');set(act,'left','auto');set(act,'right',csspx(window.__comfierLayoutSide?.side()==='right'?edge+4:4,z));set(act,'top',csspx(top+4,z));set(act,'bottom','auto')}
    if(window.__comfierLayoutSide?.side()==='right'&&run&&ct){const bottom=Math.max(4,innerHeight-bottomNavTop()+4);ensureVisible(ct);for(const el of [ct,run]){set(el,'position','fixed');set(el,'left',csspx(innerWidth/2,z));set(el,'right','auto');set(el,'top','auto');set(el,'transform','translateX(-50%)');set(el,'transform-origin','bottom center');set(el,'zoom',String(z))}set(ct,'bottom',csspx(bottom,z));set(run,'bottom',csspx(innerHeight-ct.getBoundingClientRect().top+4,z));return}
    if(run){const navTop=bottomNavTop(),bottom=Math.max(4,innerHeight-navTop+4);set(run,'left',csspx(innerWidth/2,z));set(run,'right','auto');set(run,'bottom',csspx(bottom,z));set(run,'top','auto');set(run,'transform','translateX(-50%)');set(run,'transform-origin','bottom center');set(run,'zoom',String(z));const rr=logical(run.getBoundingClientRect());if(ct){ensureVisible(ct);set(ct,'position','fixed');set(ct,'left',csspx(innerWidth/2,z));set(ct,'right','auto');set(ct,'bottom',csspx(Math.max(bottom,innerHeight-rr.top+4),z));set(ct,'top','auto');set(ct,'transform','translateX(-50%)');set(ct,'transform-origin','bottom center');set(ct,'zoom',String(z))}}
  }
  function pinOuterPortrait(){
    const z=zoom(),top=workspaceTop(),wf=workflowDock(),ct=canvasToolbar(),run=runDock(),act=actionSurface(),r=rail();
    if(r){set(r,'left','4px');set(r,'right','auto')}
    if(wf){set(wf,'position','fixed');set(wf,'left','4px');set(wf,'right','auto');set(wf,'top',(top+4)+'px');set(wf,'bottom','auto')}
    if(act){set(act,'position','fixed');set(act,'left','auto');set(act,'right',csspx(4,z));set(act,'top',csspx(top+4,z));set(act,'bottom','auto')}
    if(run){set(run,'left',csspx(innerWidth/2,z));set(run,'right','auto');set(run,'bottom',csspx(4,z));set(run,'top','auto');set(run,'transform','translateX(-50%)');set(run,'transform-origin','bottom center');set(run,'zoom',String(z));const rr=logical(run.getBoundingClientRect());if(ct){ensureVisible(ct);ct.classList.add('comfier-early-canvas-toolbar-centered');set(ct,'position','fixed');set(ct,'left',csspx(innerWidth/2,z));set(ct,'right','auto');set(ct,'bottom',csspx(innerHeight-rr.top+4,z));set(ct,'top','auto');set(ct,'transform','translateX(-50%)');set(ct,'transform-origin','bottom center');set(ct,'zoom',String(z))}}
  }
  function apply(reason){if(stopped)return;const f=family();lastFamily=f;if(f==='outer-portrait')pinOuterPortrait();else if(f==='outer-landscape')pinOuterLandscape();else pinInnerTablet()}
  function schedule(reason){if(!stopped)jobs.frame('layout',()=>apply(reason))}
  observer=window.__comfierMutations.create(records=>{
    // Only wake when one of the five anchors is created/replaced or its own style/class drifts.
    let hit=false;for(const r of records){const t=r.target;if(r.type==='attributes'&&(t===rail()||t===workflowDock()||t===canvasToolbar()||t===runDock()||t===actionSurface())){hit=true;break}for(const n of r.addedNodes||[]){if(n.nodeType!==1)continue;if(n.matches?.('.comfier-unified-floating-rail,#comfier-workflow-actions-floating-dock,.comfier-early-queue-dock,[role="toolbar"][aria-label="Canvas Toolbar"],[data-testid="action-bar-card"],.actionbar-container')||n.querySelector?.('.comfier-unified-floating-rail,#comfier-workflow-actions-floating-dock,.comfier-early-queue-dock,[role="toolbar"][aria-label="Canvas Toolbar"],[data-testid="action-bar-card"],.actionbar-container')){hit=true;break}}if(hit)break}if(hit)schedule('anchor-drift')
  });
  observer.observe(document.body,{subtree:true,childList:true,attributes:true,attributeFilter:['style','class']});
  jobs.listen(window,'resize',()=>schedule('view-change'),{passive:true});jobs.listen(window,'orientationchange',()=>schedule('view-change'),{passive:true});window.visualViewport&&jobs.listen(window.visualViewport,'resize',()=>schedule('view-change'),{passive:true});
  jobs.burst('startup',()=>schedule('startup'),[0,80,240,700]);
  window.__comfierFixedViewMap={family,refresh:schedule,remove(){if(stopped)return;stopped=true;observer.disconnect();jobs.dispose();delete window.__comfierFixedViewMap}};
})();
