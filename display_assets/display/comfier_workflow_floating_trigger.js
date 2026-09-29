(function(){
  'use strict';
  const jobs=window.__comfierRuntime.scope('workflow-dock');
  if(window.__comfierWorkflowFloatingTrigger?.remove)window.__comfierWorkflowFloatingTrigger.remove();

  function logical(r){return window.__comfierLayoutSide?.rect(r)||r}
  var DOCK_ID='comfier-workflow-actions-floating-dock';
  var stopped=false,trigger=null,marker=null,home=null,observer=null;
  var dock=document.createElement('div');
  dock.id=DOCK_ID;
  dock.style.cssText='position:fixed;left:4px;top:4px;right:auto;bottom:auto;margin:0;padding:0;width:max-content;height:max-content;z-index:var(--comfier-z-workspace,200);pointer-events:none;overflow:visible';
  document.body.appendChild(dock);

  function visible(el){if(!el||!el.isConnected)return false;var r=logical(el.getBoundingClientRect()),s=getComputedStyle(el);return r.width>0&&r.height>0&&s.display!=='none'&&s.visibility!=='hidden'}
  function canvasRect(){var canvas=document.getElementById('graph-canvas-container')||document.querySelector('.graph-canvas-panel');return canvas?logical(canvas.getBoundingClientRect()):{left:0,top:0}}
  function connectedSidebarRight(canvas){
    var edge=0;
    document.querySelectorAll('.side-toolbar-container,.side-tool-bar-container').forEach(function(rail){
      if(!visible(rail)||rail.classList.contains('floating-sidebar')||rail.classList.contains('comfier-unified-floating-rail'))return;
      var r=logical(rail.getBoundingClientRect()),connected=r.left<=canvas.left+8&&r.width>=20&&r.width<220&&r.height>innerHeight*.35;
      if(connected)edge=Math.max(edge,r.right);
    });
    return edge;
  }
  function canvasWorkspaceTop(canvas){
    var splitters=Array.from(document.querySelectorAll('#graph-canvas-container .p-splitter.p-splitter-horizontal')).filter(function(el){var r=logical(el.getBoundingClientRect());return visible(el)&&r.width>innerWidth*.5&&r.height>innerHeight*.35}).sort(function(a,b){return logical(a.getBoundingClientRect()).top-logical(b.getBoundingClientRect()).top});
    if(splitters.length)return splitters[0].getBoundingClientRect().top;
    var tabs=document.getElementById('topbar-workflow-tabs');
    if(tabs){var boxes=[tabs].concat(Array.from(tabs.children)).map(function(el){return logical(el.getBoundingClientRect())}),bottom=Math.max.apply(null,boxes.map(function(r){return r.bottom}));if(isFinite(bottom)&&bottom>canvas.top)return bottom}
    return canvas.top;
  }
  function findTrigger(){return document.querySelector('[data-testid="view-mode-toggle"][aria-haspopup="menu"]')}
  function important(el,name,value){if(window.__comfierLayoutSide){[name,value]=window.__comfierLayoutSide.property(name,value)}el.style.setProperty(name,value,'important')}
  function apply(){
    if(stopped)return;
    var found=findTrigger();if(!found)return;
    if(found!==trigger){
      if(trigger&&trigger.parentNode===dock&&marker&&marker.parentNode){marker.parentNode.insertBefore(trigger,marker);marker.remove()}
      trigger=found;home=trigger.parentNode;marker=document.createComment('comfier-workflow-actions-home');home.insertBefore(marker,trigger);dock.appendChild(trigger);
      important(trigger,'pointer-events','auto');important(trigger,'position','relative');important(trigger,'left','auto');important(trigger,'right','auto');important(trigger,'top','auto');important(trigger,'bottom','auto');important(trigger,'margin','0');important(trigger,'transform','none');important(trigger,'visibility','visible');
    }else if(trigger.parentNode!==dock)dock.appendChild(trigger);
    var canvas=canvasRect(),connectedEdge=connectedSidebarRight(canvas),left=Math.round(Math.max(canvas.left,connectedEdge)+4),top=Math.round(canvasWorkspaceTop(canvas)+4);
    important(dock,'left',left+'px');important(dock,'right','auto');important(dock,'top',top+'px');
  }
  function schedule(){if(!stopped)jobs.frame('layout',apply)}
  function burst(){jobs.burst('settle',schedule,[0,40,100,220,450,900])}
  observer=window.__comfierMutations.create(function(records){if(records.some(function(record){return Array.from(record.addedNodes).concat(Array.from(record.removedNodes)).some(function(node){return node.nodeType===1&&(node.matches&&node.matches('[data-testid="view-mode-toggle"]')||node.querySelector&&node.querySelector('[data-testid="view-mode-toggle"]'))})}))burst()});
  observer.observe(document.body,{childList:true,subtree:true});
  window.addEventListener('resize',burst,{passive:true});window.addEventListener('orientationchange',burst,{passive:true});window.addEventListener('pageshow',burst,{passive:true});if(window.visualViewport)window.visualViewport.addEventListener('resize',burst,{passive:true});
  window.__comfierWorkflowFloatingTrigger={refresh:burst,remove:function(){if(stopped)return;stopped=true;jobs.dispose();if(observer)observer.disconnect();window.removeEventListener('resize',burst);window.removeEventListener('orientationchange',burst);window.removeEventListener('pageshow',burst);if(window.visualViewport)window.visualViewport.removeEventListener('resize',burst);if(trigger&&trigger.parentNode===dock){if(marker&&marker.parentNode)marker.parentNode.insertBefore(trigger,marker);else if(home&&home.isConnected)home.appendChild(trigger)}if(marker)marker.remove();dock.remove();delete window.__comfierWorkflowFloatingTrigger}};
  burst();
})();
