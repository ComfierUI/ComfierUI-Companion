(function(){
  'use strict';
  if(window.__comfierEarlyFloatingPanels?.remove)window.__comfierEarlyFloatingPanels.remove();

  function logical(r){return window.__comfierLayoutSide?.rect(r)||r}
  var STYLE='comfier-early-floating-panels-style';
  var ROOT='comfier-early-floating-panels';
  var SPLIT='comfier-early-panel-splitter';
  var PANEL='comfier-early-floating-panel';
  var LEFT='comfier-early-floating-left';
  var RIGHT='comfier-early-floating-right';
  var CENTER='comfier-early-floating-center';
  var GUTTER='comfier-early-floating-gutter';
  var BOTTOM_SPLIT='comfier-early-bottom-panel-splitter';
  var BOTTOM='comfier-early-floating-bottom';
  var BOTTOM_GUTTER='comfier-early-floating-bottom-gutter';
  var HOST='comfier-early-floating-overflow';
  var PANEL_LAYER='comfier-early-panel-layer';
  var SIDE_LAYER='comfier-early-side-panel-layer';
  var BOTTOM_LAYER='comfier-early-bottom-panel-layer';
  var ACTION_SOURCE='comfier-early-properties-source';
  var ACTION_PROXY='comfier-early-properties-proxy';
  var ACTION_DOCK='comfier-early-properties-dock';
  var ACTION_SHIFT='comfier-early-properties-reserved';
  var ACTION_INTERNAL='comfier-early-properties-internal-suppressed';
  var QUEUE_DOCK='comfier-early-queue-dock';
  var QUEUE_PANEL='comfier-early-queue-panel';
  var QUEUE_STALE='comfier-early-queue-stale';
  var QUEUE_HOME='comfier-early-queue-home-vacated';
  var CANVAS_CENTER='comfier-early-canvas-toolbar-centered';
  document.getElementById(STYLE)?.remove();
  var style=document.createElement('style');style.id=STYLE;
  style.textContent=
    'html.'+ROOT+' .'+HOST+'{overflow:visible!important;overflow-x:visible!important;overflow-y:visible!important;clip:auto!important;clip-path:none!important;contain:none!important}'+
    'html.'+ROOT+' .'+PANEL_LAYER+'{z-index:auto!important;isolation:auto!important}'+
    'html.'+ROOT+' .'+BOTTOM_LAYER+'{z-index:auto!important;isolation:auto!important}'+
    'html.'+ROOT+' .'+SIDE_LAYER+'{z-index:auto!important;isolation:auto!important}'+
    'html.'+ROOT+' .'+SPLIT+'{overflow:visible!important}'+
    'html.'+ROOT+' .'+CENTER+'{flex:1 1 100%!important;flex-basis:100%!important;min-width:0!important;max-width:none!important;width:100%!important}'+
    'html.'+ROOT+' .'+GUTTER+'{display:none!important;visibility:hidden!important;pointer-events:none!important;width:0!important;min-width:0!important;max-width:0!important;flex:0 0 0!important}'+
    'html.'+ROOT+' .'+PANEL+'{position:fixed!important;top:var(--cef-top)!important;bottom:auto!important;right:auto!important;width:var(--cef-width)!important;min-width:0!important;max-width:var(--cef-width)!important;height:var(--cef-height)!important;min-height:0!important;max-height:var(--cef-height)!important;flex:0 0 var(--cef-width)!important;flex-basis:var(--cef-width)!important;box-sizing:border-box!important;overflow:auto!important;overscroll-behavior:contain!important;touch-action:pan-x pan-y!important;border:1px solid var(--interface-stroke,var(--border-color,#3b4554))!important;border-radius:10px!important;background:var(--comfy-menu-bg,#171717)!important;z-index:var(--comfier-z-side,500)!important;pointer-events:auto!important}'+
    'html.'+ROOT+' .'+LEFT+'{left:var(--cef-left)!important;top:var(--cef-left-top,var(--cef-top))!important;height:var(--cef-left-height,var(--cef-height))!important;max-height:var(--cef-left-height,var(--cef-height))!important}'+
    'html.'+ROOT+' .'+RIGHT+'{left:var(--cef-right)!important;top:var(--cef-right-top,var(--cef-top))!important;height:var(--cef-right-height,var(--cef-height))!important;max-height:var(--cef-right-height,var(--cef-height))!important}'+
    'html.'+ROOT+' .'+BOTTOM_SPLIT+'{overflow:visible!important}'+
    'html.'+ROOT+' .'+BOTTOM_SPLIT+'>.graph-canvas-panel{display:flex!important;flex:1 1 100%!important;flex-basis:100%!important;min-height:0!important;height:100%!important;max-height:none!important;overflow:visible!important}'+
    'html.'+ROOT+' .'+BOTTOM_GUTTER+'{display:none!important;visibility:hidden!important;pointer-events:none!important;height:0!important;min-height:0!important;max-height:0!important;flex:0 0 0!important;transform:none!important}'+
    'html.'+ROOT+' .'+BOTTOM+'{position:fixed!important;left:var(--cef-bottom-left)!important;right:auto!important;top:auto!important;bottom:var(--cef-bottom-inset,4px)!important;width:var(--cef-bottom-width)!important;min-width:0!important;max-width:var(--cef-bottom-width)!important;height:var(--cef-bottom-height)!important;min-height:0!important;max-height:var(--cef-bottom-height)!important;flex:0 0 var(--cef-bottom-height)!important;flex-basis:var(--cef-bottom-height)!important;box-sizing:border-box!important;overflow:hidden!important;overscroll-behavior:contain!important;touch-action:pan-x pan-y!important;border:1px solid var(--interface-stroke,var(--border-color,#3b4554))!important;border-radius:10px!important;background:var(--comfy-menu-bg,#171717)!important;z-index:var(--comfier-z-bottom,400)!important;pointer-events:auto!important}'+
    'html.'+ROOT+' .'+BOTTOM+' .p-tablist{position:relative!important;min-height:44px!important;cursor:ns-resize!important;touch-action:none!important;user-select:none!important}'+
    'html.'+ROOT+' .'+BOTTOM+' .p-tablist::before{content:""!important;position:absolute!important;inset:-6px 0!important;z-index:-1!important}'+
    'html.'+ROOT+' .'+BOTTOM+'>.flex.h-full.flex-col,html.'+ROOT+' .'+BOTTOM+' .h-0.grow,html.'+ROOT+' .'+BOTTOM+' [data-testid="terminal-root"]{min-width:0!important;min-height:0!important;max-width:100%!important}'+
    'html.'+ROOT+' .'+BOTTOM+' .h-0.grow{overflow:hidden!important}'+
    'html.'+ROOT+' .'+BOTTOM+' [data-testid="terminal-root"]{overflow:auto!important;overscroll-behavior:contain!important;touch-action:pan-x pan-y!important}'+
    'html.'+ROOT+' .'+BOTTOM+' [data-testid="terminal-root"] .p-terminal{min-width:100%!important;min-height:100%!important;overflow:auto!important}'+
    '[data-testid="properties-panel"] button[aria-label="Toggle properties panel"]{display:flex!important;visibility:visible!important;pointer-events:auto!important;box-sizing:border-box!important;width:32px!important;min-width:32px!important;max-width:32px!important;height:32px!important;min-height:32px!important;max-height:32px!important;flex:0 0 32px!important;transform:none!important;scale:1!important;zoom:1!important;margin:initial!important;padding:initial!important;border:initial!important;overflow:visible!important}'+
    '[data-testid="properties-panel"] button[aria-label="Toggle properties panel"] svg,[data-testid="properties-panel"] button[aria-label="Toggle properties panel"] i{width:18px!important;height:18px!important;flex:0 0 18px!important}'+
    '[data-testid="properties-panel"] section.pt-1>div.flex.items-center.justify-between>div.flex.gap-2:has(>button[aria-label="Toggle properties panel"]){display:flex!important;visibility:visible!important;pointer-events:auto!important;width:auto!important;height:auto!important;min-width:0!important;max-width:none!important;min-height:0!important;max-height:none!important;gap:.5rem!important;overflow:visible!important}'+
    '.'+ACTION_INTERNAL+'{display:none!important;visibility:hidden!important;pointer-events:none!important;width:0!important;min-width:0!important;max-width:0!important;height:0!important;min-height:0!important;max-height:0!important;margin:0!important;padding:0!important;border:0!important;overflow:hidden!important}'+
    '.'+ACTION_SOURCE+'{display:none!important;visibility:hidden!important;pointer-events:none!important}'+
    '.'+ACTION_DOCK+'{position:fixed!important;display:flex!important;align-items:center!important;justify-content:center!important;box-sizing:border-box!important;margin:0!important;z-index:var(--comfier-z-workspace,200)!important;visibility:visible!important;pointer-events:auto!important}'+
    '.'+ACTION_PROXY+'{position:relative!important;inset:auto!important;margin:0!important;flex:0 0 auto!important;z-index:auto!important;visibility:visible!important;pointer-events:auto!important;touch-action:manipulation!important}'+
    '.'+ACTION_PROXY+'::before{content:""!important;position:absolute!important;inset:-8px!important}'+
    '.'+ACTION_SHIFT+'{position:fixed!important;left:auto!important;bottom:auto!important;margin:0!important;box-sizing:border-box!important;overflow:visible!important}'+
    '.'+QUEUE_DOCK+'{position:fixed!important;display:flex!important;align-items:center!important;width:max-content!important;height:auto!important;min-width:0!important;min-height:0!important;max-width:calc(100vw - 8px)!important;box-sizing:border-box!important;overflow:visible!important;pointer-events:auto!important;touch-action:manipulation!important;z-index:var(--comfier-z-workspace,200)!important}'+
    '.'+QUEUE_DOCK+' .comfy-remote-fixed-queue{position:static!important;inset:auto!important;display:block!important;width:max-content!important;height:auto!important;min-width:0!important;min-height:0!important;max-width:none!important;max-height:none!important;margin:0!important;padding:0!important;border:0!important;border-radius:0!important;background:transparent!important;box-shadow:none!important;transform:none!important;zoom:1!important;visibility:visible!important;pointer-events:auto!important}'+
    '.'+QUEUE_DOCK+' .'+QUEUE_PANEL+' .drag-handle{display:none!important;visibility:hidden!important;pointer-events:none!important}'+
    '.'+QUEUE_STALE+'{display:none!important;visibility:hidden!important;pointer-events:none!important}'+
    // A remounted duplicate Run panel stays Vue-owned. Collapse its dedicated
    // actionbar slot as well; it otherwise contributes an extra flex gap.
    // The condition stops matching immediately if any non-stale child appears.
    '.actionbar-container>div.flex.h-full.items-center:has(>.'+QUEUE_STALE+'):not(:has(>:not(.'+QUEUE_STALE+'))){display:none!important}'+
    '.'+QUEUE_HOME+'{display:none!important;visibility:hidden!important;width:0!important;min-width:0!important;max-width:0!important;height:0!important;min-height:0!important;max-height:0!important;flex:0 0 0!important;margin:0!important;padding:0!important;border:0!important;gap:0!important;overflow:hidden!important;pointer-events:none!important}'+
    '[role="toolbar"][aria-label="Canvas Toolbar"].'+CANVAS_CENTER+'{position:fixed!important;left:50%!important;right:auto!important}'+
    '@media (max-width:520px) and (orientation:portrait){[data-testid="error-overlay"]{position:fixed!important;left:auto!important;right:8px!important;inset-inline-start:auto!important;inset-inline-end:8px!important;transform:none!important;width:min(26rem,calc(100vw - 72px))!important;min-width:0!important;max-width:none!important;box-sizing:border-box!important;z-index:var(--comfier-z-popup,700)!important}}'+
    '.actionbar:has([data-testid="queue-button"]):not(.'+QUEUE_PANEL+'){visibility:hidden!important}'+
    /* TB20 normalizes only vertical control geometry.  These are the native
       ComfyUI ownership/ARIA boundaries; no orientation, ordering, wrapping,
       positioning, or established container is replaced. */
    '[data-testid="action-bar-card"],[data-testid="top-menu-actionbars"]>div:has(>button[aria-label="Manage extensions"]),[data-testid="view-mode-toggle"][role="group"][aria-label="Workflow actions"],[role="toolbar"][aria-label="Canvas Toolbar"],.'+QUEUE_DOCK+'{height:50px!important;min-height:50px!important;max-height:50px!important;padding-top:8px!important;padding-bottom:8px!important;box-sizing:border-box!important;transform-origin:top right}'+
    '[data-testid="action-bar-card"]>.actionbar-container{height:32px!important;min-height:32px!important;max-height:32px!important;box-sizing:border-box!important}'+
    '[data-testid="action-bar-card"]>.actionbar-container>*{max-height:32px!important;box-sizing:border-box!important}'+
    '[data-testid="action-bar-card"]>.actionbar-container button:not(.batch-count button),[data-testid="action-bar-card"]>.actionbar-container input,[data-testid="top-menu-actionbars"]>div:has(>button[aria-label="Manage extensions"])>button,[data-testid="view-mode-toggle"][role="group"][aria-label="Workflow actions"] button,[role="toolbar"][aria-label="Canvas Toolbar"] button,.'+QUEUE_DOCK+' .'+QUEUE_PANEL+' button:not(.batch-count button),.'+QUEUE_DOCK+' .'+QUEUE_PANEL+' input{height:32px!important;min-height:32px!important;max-height:32px!important;padding-top:7px!important;padding-bottom:7px!important;box-sizing:border-box!important}'+
    '[data-testid="view-mode-toggle"][role="group"][aria-label="Workflow actions"]>div,[role="toolbar"][aria-label="Canvas Toolbar"]>*{max-height:32px!important;box-sizing:border-box!important}'+
    '.'+QUEUE_DOCK+' .'+QUEUE_PANEL+',.'+QUEUE_DOCK+' .'+QUEUE_PANEL+' .queue-button-group{height:32px!important;min-height:32px!important;max-height:32px!important;box-sizing:border-box!important}'+
    '.'+QUEUE_DOCK+' .'+QUEUE_PANEL+' .batch-count,.'+QUEUE_DOCK+' .'+QUEUE_PANEL+' .batch-count>div{width:32px!important;min-width:32px!important;max-width:32px!important;flex:0 0 32px!important;height:32px!important;min-height:32px!important;max-height:32px!important}'+
    '.'+QUEUE_DOCK+' .'+QUEUE_PANEL+' .batch-count>div>div:has(>button[aria-label="Increment"]){display:none!important;width:0!important;min-width:0!important;max-width:0!important;flex:0 0 0!important;margin:0!important;padding:0!important;overflow:hidden!important;pointer-events:none!important}'+
    '.'+QUEUE_DOCK+' .'+QUEUE_PANEL+' .batch-count input[aria-label="Batch Count"]{width:32px!important;min-width:32px!important;max-width:32px!important;flex:0 0 32px!important;padding-left:0!important;padding-right:0!important;border-radius:8px 0 0 8px!important;position:relative!important;z-index:1!important}'+
    '.'+QUEUE_DOCK+' .'+QUEUE_PANEL+' [data-testid="queue-mode-menu-trigger"]{width:32px!important;min-width:32px!important;max-width:32px!important;flex:0 0 32px!important}'+
    'html.'+ROOT+' .'+PANEL+' .sidebar-content-container,html.'+ROOT+' .'+PANEL+'>div{min-width:0!important;max-width:100%!important;min-height:0!important;max-height:100%!important;overflow:auto!important;overscroll-behavior:contain!important;touch-action:pan-x pan-y!important}';
  style.textContent+=
    'html.'+ROOT+' .'+LEFT+' .sidebar-content-container{touch-action:none!important;overscroll-behavior:contain!important}';
  (document.head||document.documentElement).appendChild(style);

  var stopped=false,observer=null,lastSide=null,leftOwner=null,actionProxy=null,actionDock=null,actionSource=null,actionSurface=null,queueDock=null,queuePanel=null,queueHome=null,centeredCanvasMenu=null,canvasMenuInline=null;
  var bottomPanel=null,bottomHandle=null,bottomDrag=null,bottomHeight=null,bottomWasOpen=false;
  var scrollPanel=null,scrollTarget=null,scrollDrag=null,scrollMovedUntil=0;
  var staleQueues=new Set();
  var originalInsert=Node.prototype.insertBefore;
  var jobs=window.__comfierRuntime.scope('panels'),geometryActive=false;
  var decorated=new Set(),hosts=new Set(),panelLayers=new Set();
  function visible(el){if(!el||!el.isConnected)return false;var s=getComputedStyle(el),r=logical(el.getBoundingClientRect());return s.display!=='none'&&s.visibility!=='hidden'&&r.width>1&&r.height>1}
  function findLeftScrollTarget(panel){
    if(!panel)return null;
    if(panel.classList.contains('comfier-templates-native-panel')){var templateTarget=Array.from(panel.querySelectorAll('.scrollbar-custom')).filter(function(el){return visible(el)&&el.clientHeight>20&&el.scrollHeight>el.clientHeight+2}).sort(function(a,b){return(b.scrollHeight-b.clientHeight)-(a.scrollHeight-a.clientHeight)})[0];if(templateTarget)return templateTarget}
    var exact=panel.querySelector('.sidebar-content-container');
    if(exact&&exact.scrollHeight>exact.clientHeight+2)return exact;
    return Array.from(panel.querySelectorAll('*')).filter(function(el){return visible(el)&&el.clientHeight>20&&el.scrollHeight>el.clientHeight+2}).sort(function(a,b){return(b.scrollHeight-b.clientHeight)-(a.scrollHeight-a.clientHeight)})[0]||null;
  }
  function unbindLeftScroll(){
    if(scrollPanel){scrollPanel.removeEventListener('pointerdown',leftScrollDown,true);scrollPanel.removeEventListener('pointermove',leftScrollMove,true);scrollPanel.removeEventListener('pointerup',leftScrollEnd,true);scrollPanel.removeEventListener('pointercancel',leftScrollEnd,true);scrollPanel.removeEventListener('click',blockLeftScrollClick,true)}
    scrollPanel=null;scrollTarget=null;scrollDrag=null;
  }
  function unbindBottomResize(){
    if(bottomHandle){bottomHandle.removeEventListener('pointerdown',bottomResizeDown,true);bottomHandle.removeEventListener('pointermove',bottomResizeMove,true);bottomHandle.removeEventListener('pointerup',bottomResizeEnd,true);bottomHandle.removeEventListener('pointercancel',bottomResizeEnd,true)}
    bottomPanel=null;bottomHandle=null;bottomDrag=null;
  }
  function bindBottomResize(panel){
    var handle=panel?.querySelector?.('.p-tablist');if(panel===bottomPanel&&handle===bottomHandle)return;unbindBottomResize();bottomPanel=panel;bottomHandle=handle;if(!bottomHandle)return;
    bottomHandle.addEventListener('pointerdown',bottomResizeDown,true);bottomHandle.addEventListener('pointermove',bottomResizeMove,{capture:true,passive:false});bottomHandle.addEventListener('pointerup',bottomResizeEnd,true);bottomHandle.addEventListener('pointercancel',bottomResizeEnd,true);
  }
  function bottomResizeDown(event){if(event.target?.closest?.('button,input,a,[role="button"]')||event.isPrimary===false||event.pointerType==='mouse'&&event.button!==0)return;bottomDrag={id:event.pointerId,y:event.clientY,height:bottomHeight||bottomPanel?.getBoundingClientRect?.().height||Math.floor(innerHeight/3),active:false}}
  function bottomResizeMove(event){
    if(!bottomDrag||event.pointerId!==bottomDrag.id)return;var dy=event.clientY-bottomDrag.y;
    if(!bottomDrag.active){if(Math.abs(dy)<5)return;bottomDrag.active=true;try{bottomHandle.setPointerCapture(event.pointerId)}catch(_){}}
    var minimum=Math.max(80,parseFloat(bottomPanel?.dataset?.comfierBottomMinHeight)||120),inset=parseFloat(document.documentElement.style.getPropertyValue('--cef-bottom-inset'))||4,max=Math.max(minimum,innerHeight-inset-48);bottomHeight=Math.max(minimum,Math.min(max,Math.round(bottomDrag.height-dy)));document.documentElement.style.setProperty('--cef-bottom-height',bottomHeight+'px');
    if(event.cancelable)event.preventDefault();event.stopPropagation();
  }
  function bottomResizeEnd(event){if(!bottomDrag||event.pointerId!==bottomDrag.id)return;if(bottomDrag.active){if(event.cancelable)event.preventDefault();event.stopPropagation();try{bottomHandle.releasePointerCapture(event.pointerId)}catch(_){}}bottomDrag=null}
  function bindLeftScroll(panel){
    var target=findLeftScrollTarget(panel);if(panel===scrollPanel&&target===scrollTarget)return;unbindLeftScroll();scrollPanel=panel;scrollTarget=target;if(!scrollPanel||!scrollTarget)return;
    scrollPanel.addEventListener('pointerdown',leftScrollDown,true);scrollPanel.addEventListener('pointermove',leftScrollMove,{capture:true,passive:false});scrollPanel.addEventListener('pointerup',leftScrollEnd,true);scrollPanel.addEventListener('pointercancel',leftScrollEnd,true);scrollPanel.addEventListener('click',blockLeftScrollClick,true);
  }
  function leftScrollDown(event){if(!scrollTarget||event.isPrimary===false||event.pointerType==='mouse')return;scrollDrag={id:event.pointerId,x:event.clientX,y:event.clientY,top:scrollTarget.scrollTop,active:false}}
  function leftScrollMove(event){
    if(!scrollDrag||event.pointerId!==scrollDrag.id||!scrollTarget)return;var dx=event.clientX-scrollDrag.x,dy=event.clientY-scrollDrag.y;
    if(!scrollDrag.active){if(!window.__comfierUi.verticalDrag(dx,dy,7))return;scrollDrag.active=true;try{scrollPanel.setPointerCapture(event.pointerId)}catch(_){}}
    if(event.cancelable)event.preventDefault();event.stopPropagation();var speed=scrollPanel.classList.contains('comfier-templates-native-panel')?2:1;scrollTarget.scrollTop=scrollDrag.top-dy*speed;
  }
  function leftScrollEnd(event){if(!scrollDrag||event.pointerId!==scrollDrag.id)return;if(scrollDrag.active){scrollMovedUntil=performance.now()+350;if(event.cancelable)event.preventDefault();event.stopPropagation();try{scrollPanel.releasePointerCapture(event.pointerId)}catch(_){}}scrollDrag=null}
  function blockLeftScrollClick(event){window.__comfierUi.blockScrollClick(event,scrollMovedUntil)}
  function outerDisplay(){return Math.min(screen.width,screen.height)<=520}
  function outerPortrait(){return outerDisplay()&&innerHeight>innerWidth}
  function outerLandscape(){return outerDisplay()&&innerWidth>innerHeight}
  /* Every normalized parent has a 1.0 base and follows the active nested App
     Settings scaler without TB18's old per-toolbar reduction factors. */
  function liveUiZoom(){var v=parseFloat(window.__comfierUiZoomValue)||1;return Math.max(.3,Math.min(2,v))}
  function liveTopZoom(){return liveUiZoom()}
  function railButtons(){return Array.from(document.querySelectorAll('.side-bar-button')).filter(function(button){if(!visible(button))return false;var r=logical(button.getBoundingClientRect());return r.left<40&&r.right<140})}
  function railRect(){return logical(window.__comfierUi.railBounds(140))}
  function railContains(button){var unified=document.querySelector('.comfier-unified-floating-rail');return!!(unified?.contains(button)||railButtons().includes(button))}
  function connectedSidebarRight(){
    var canvas=document.getElementById('graph-canvas-container'),cr=logical(canvas?.getBoundingClientRect())||{left:0},edge=cr.left;
    Array.from(document.querySelectorAll('.side-toolbar-container,.side-tool-bar-container')).forEach(function(rail){
      if(!visible(rail)||rail.classList.contains('floating-sidebar')||rail.classList.contains('comfier-unified-floating-rail'))return;
      var r=logical(rail.getBoundingClientRect());if(r.left<=cr.left+8&&r.width>=20&&r.width<220&&r.height>innerHeight*.35)edge=Math.max(edge,r.right);
    });
    return edge;
  }
  function propertiesButtons(){return Array.from(document.querySelectorAll('button[aria-label="Toggle properties panel"]')).filter(function(button){return!button.classList.contains(ACTION_PROXY)})}
  function suppressPanelPropertiesButtons(){Array.from(document.querySelectorAll('[data-testid="properties-panel"] button[aria-label="Toggle properties panel"]')).forEach(function(button){button.classList.remove(ACTION_INTERNAL)})}
  function findActionSource(){
    var candidates=propertiesButtons().filter(function(button){return button.isConnected&&!button.closest('[data-testid="properties-panel"],.'+RIGHT)&&!!button.closest('[data-testid="action-bar-card"],.actionbar-container')});
    if(actionSource?.isConnected&&!actionSource.closest('.'+PANEL)&&!candidates.includes(actionSource))candidates.push(actionSource);
    return candidates.sort(function(a,b){var ar=logical(a.getBoundingClientRect()),br=logical(b.getBoundingClientRect());return ar.top-br.top||br.right-ar.right})[0]||null;
  }
  function currentPropertiesTarget(){return findActionSource()||propertiesButtons().find(function(button){return button.isConnected&&button.closest('.'+RIGHT)})||actionSource}
  function liveActionSurface(source){var nativeSurface=window.__comfierLayoutSide?.actionSurface?.();if(nativeSurface)return nativeSurface;var cards=Array.from(document.querySelectorAll('[data-testid="action-bar-card"]')).filter(function(card){return card.querySelector('.actionbar-container')&&!card.querySelector('[data-testid="queue-button"]')&&!card.closest('[data-testid="properties-panel"]')});if(cards.length)return cards.sort(function(a,b){var ar=logical(a.getBoundingClientRect()),br=logical(b.getBoundingClientRect());return ar.top-br.top||br.right-ar.right})[0];var card=source?.closest?.('[data-testid="action-bar-card"]');if(card&&!card.querySelector('[data-testid="queue-button"]'))return card;var container=source?.closest?.('.actionbar-container')||Array.from(document.querySelectorAll('.actionbar-container')).find(function(el){return!el.querySelector('[data-testid="queue-button"]')&&!el.closest('[data-testid="properties-panel"]')});return container?.parentElement||container||null}
  function syncActionButton(){
    window.__comfierLayoutSide?.pinActions?.();
    var source=findActionSource();
    if(source&&source!==actionSource){if(actionSource?.isConnected)actionSource.classList.remove(ACTION_SOURCE);actionSource=source;actionSurface=liveActionSurface(actionSource)}
    if(actionSource){actionSource.classList.remove(ACTION_SOURCE,ACTION_INTERNAL)}
    if(actionDock){actionDock.remove();actionDock=null}actionProxy=null;
    if(!actionSurface?.isConnected)actionSurface=liveActionSurface(actionSource);
    /* Preserve TB11's action-bar scaler only.  The native card keeps the
       Properties control; no proxy, surface shift, or bottom-bar geometry is involved. */
    // Leave the native action-bar card/container to its own custom flex rules.
    // Floating-panel takeover does not need to rewrite its layout.
    var topZoom=liveTopZoom();
    var card=actionSource?.closest?.('[data-testid="action-bar-card"]'),extensions=document.querySelector('[data-testid="top-menu-actionbars"]>div:has(>button[aria-label="Manage extensions"])'),workflow=document.querySelector('[data-testid="view-mode-toggle"][role="group"][aria-label="Workflow actions"]');
    [card,extensions,workflow].forEach(function(parent){if(parent)important(parent,'zoom',String(topZoom))});
  }
  function queueCandidates(){return Array.from(document.querySelectorAll('[data-testid="queue-button"]')).map(function(button){return button.closest('.actionbar')}).filter(function(panel,index,all){return panel&&all.indexOf(panel)===index})}
  function findQueuePanel(){if(queuePanel?.isConnected)return queuePanel;return queueCandidates().find(function(panel){return!panel.classList.contains(QUEUE_STALE)})||null}
  function suppressStaleQueues(){queueCandidates().forEach(function(panel){if(panel===queuePanel){panel.classList.remove(QUEUE_STALE);staleQueues.delete(panel)}else{panel.classList.add(QUEUE_STALE);staleQueues.add(panel)}})}
  function important(el,name,value){if(window.__comfierLayoutSide){[name,value]=window.__comfierLayoutSide.property(name,value)}window.__comfierRuntime.writeStyle(el,name,value,'panels')}
  function rootStyle(root,name,value){if(root.style.getPropertyValue(name)===value)return;root.style.setProperty(name,value)}
  function addClass(el,...names){if(!el)return;names.forEach(function(name){if(name&&!el.classList.contains(name))el.classList.add(name)})}
  // Graph Canvas Menu only. These are the 1.1.4-Dev rules, scoped to the
  // supplied graph-canvas-panel parent so no other toolbar can be affected.
  function graphCanvasMenu(){return document.querySelector('.graph-canvas-panel > div.pointer-events-auto > span[role="toolbar"][aria-label="Canvas Toolbar"]')||document.querySelector('[role="toolbar"][aria-label="Canvas Toolbar"]')}
  function restoreCanvasMenu(){
    var menu=centeredCanvasMenu||graphCanvasMenu();if(!menu)return;
    menu.classList.remove(CANVAS_CENTER);
    var zoom=liveUiZoom();
    important(menu,'left',((Math.ceil(connectedSidebarRight())+4)/zoom)+'px');important(menu,'right','auto');important(menu,'bottom',(4/zoom)+'px');important(menu,'zoom',String(zoom));important(menu,'transform','none');important(menu,'transform-origin','');important(menu,'top','auto');
    centeredCanvasMenu=null;canvasMenuInline=null;
  }
  function centerCanvasMenu(queueBottom){
    var menu=graphCanvasMenu();if(!menu)return;
    centeredCanvasMenu=menu;
    // Outer portrait retains its established geometry and uses the same 1.0-base scaler.
    var outerScale=liveUiZoom();menu.classList.add(CANVAS_CENTER);important(menu,'position','fixed');important(menu,'left','var(--comfy-remote-outer-canvas-left)');important(menu,'right','auto');important(menu,'zoom','1');important(menu,'transform','translateX(-50%) scale('+outerScale+')');important(menu,'transform-origin','bottom center');important(menu,'top','auto');important(menu,'bottom',Math.round(queueBottom+4)+'px');
  }
  function queueShellReference(){return document.querySelector('[role="toolbar"][aria-label="Canvas Toolbar"]')||document.querySelector('[data-testid="action-bar-card"]')}
  function shellQueue(panel){
    var ref=queueShellReference(),cs=ref?getComputedStyle(ref):null;
    important(queueDock,'background-color','var(--comfier-container-paint,'+(cs?.backgroundColor&&cs.backgroundColor!=='rgba(0, 0, 0, 0)'?cs.backgroundColor:'rgb(23, 23, 23)')+')');
    important(queueDock,'border',cs?.border&&cs.border!=='0px none rgb(0, 0, 0)'?cs.border:'1px solid rgb(59, 69, 84)');
    important(queueDock,'border-color','var(--comfier-container-frame,var(--interface-stroke,#3b4554))');
    important(queueDock,'border-radius',cs?.borderRadius&&cs.borderRadius!=='0px'?cs.borderRadius:'17px');
    important(queueDock,'box-shadow','var(--shadow-inset-highlight,inset 0 0 0 0 transparent),var(--interface-floating-panel-shadow,'+(cs?.boxShadow&&cs.boxShadow!=='none'?cs.boxShadow:'rgba(0, 0, 0, 0.34) 0px 3px 12px')+')');
    important(queueDock,'padding','8px');important(queueDock,'height','50px');important(queueDock,'min-height','50px');important(queueDock,'max-height','50px');important(queueDock,'box-sizing','border-box');important(queueDock,'overflow','visible');
    important(panel,'position','static');important(panel,'left','auto');important(panel,'right','auto');important(panel,'top','auto');important(panel,'bottom','auto');important(panel,'width','max-content');important(panel,'height','auto');important(panel,'min-width','0');important(panel,'min-height','0');important(panel,'max-width','none');important(panel,'max-height','none');important(panel,'margin','0');important(panel,'padding','0');important(panel,'border','0');important(panel,'border-radius','0');important(panel,'background','transparent');important(panel,'box-shadow','none');important(panel,'transform','none');important(panel,'zoom','1');important(panel,'visibility','visible');
  }
  function syncQueuePanel(){
    var panel=findQueuePanel();if(!panel)return;
    if(panel!==queuePanel){
      queuePanel=panel;queueHome=panel.parentElement;queueHome?.classList.add(QUEUE_HOME);
    }
    if(!queueDock){queueDock=document.createElement('div');queueDock.className=QUEUE_DOCK;document.body.appendChild(queueDock)}
    var zoom=liveUiZoom(),portraitCenter=outerPortrait();important(queueDock,'zoom',String(zoom));if(queuePanel.parentElement!==queueDock)queueDock.appendChild(queuePanel);queuePanel.classList.add(QUEUE_PANEL);shellQueue(queuePanel);
    suppressStaleQueues();
    if(outerLandscape()&&window.__comfierLayoutSide?.side()==='right'&&window.__comfierFixedViewMap){window.__comfierFixedViewMap.refresh();return}
    important(queueDock,'left',portraitCenter?((innerWidth/2)/zoom)+'px':'auto');important(queueDock,'right',portraitCenter?'auto':(4/zoom)+'px');important(queueDock,'top','auto');important(queueDock,'bottom',(4/zoom)+'px');important(queueDock,'transform',portraitCenter?'translateX(-50%)':'none');important(queueDock,'transform-origin',portraitCenter?'bottom center':'bottom right');important(queueDock,'visibility','visible');
    if(portraitCenter){var qr=logical(queueDock.getBoundingClientRect());centerCanvasMenu(innerHeight-qr.top)}else restoreCanvasMenu();
  }
  function layoutRect(element){if(!element?.isConnected)return null;var rect=logical(element.getBoundingClientRect());return rect.width>0&&rect.height>0?rect:null}
  function workflowDockBottom(){var rect=layoutRect(document.getElementById('comfier-workflow-actions-floating-dock'));return rect?rect.bottom:0}
  function graphToolbarTop(){var toolbar=document.querySelector('[role="toolbar"][aria-label="Canvas Toolbar"]')||document.querySelector('[data-testid="canvas-menu"]'),rect=layoutRect(toolbar);return rect?rect.top:0}
  function upperActionBottom(){
    var surface=actionSurface?.isConnected?actionSurface:liveActionSurface(findActionSource()),rect=layoutRect(surface);
    if(rect)return rect.bottom;
    var tabs=document.getElementById('topbar-workflow-tabs')||document.querySelector('[data-testid="topbar-workflow-tabs"]'),tabRect=layoutRect(tabs);
    return tabRect?tabRect.bottom:0;
  }
  function sidePanelVerticalBounds(){
    var commonTop=outerLandscape()?4:Math.max(4,Math.ceil(workflowDockBottom()||upperActionBottom())+4);
    var toolbarTop=graphToolbarTop(),queueRect=layoutRect(queueDock),queueTop=queueRect?queueRect.top:0;
    // After the bottom-control side swap, each side panel owns the anchor on its side:
    // left panel stops above Graph Canvas Toolbar; right panel stops above Run/Queue.
    // Outer/phone portrait keeps its established shared Run/Queue bottom anchor.
    var leftAnchor,rightAnchor;
    if(outerPortrait()){
      leftAnchor=rightAnchor=queueTop||innerHeight;
    }else{
      leftAnchor=toolbarTop||queueTop||innerHeight;
      rightAnchor=queueTop||toolbarTop||innerHeight;
    }
    var leftBottom=Math.min(innerHeight-4,Math.max(commonTop+120,Math.floor(leftAnchor-4)));
    var rightBottom=Math.min(innerHeight-4,Math.max(commonTop+120,Math.floor(rightAnchor-4)));
    return{leftTop:commonTop,rightTop:commonTop,leftBottom:leftBottom,rightBottom:rightBottom};
  }
  function isPrimary(split){if(!split?.matches?.('.p-splitter.p-splitter-horizontal'))return false;var kids=Array.from(split.children);return kids.some(function(el){return el.classList.contains('side-bar-panel')})&&kids.some(function(el){return el.classList.contains('p-splitterpanel-nested')})}
  function findPrimary(root){if(isPrimary(root))return root;if(!root?.querySelectorAll)return null;return Array.from(root.querySelectorAll('.p-splitter.p-splitter-horizontal')).find(isPrimary)||null}
  function activePrimary(){return Array.from(document.querySelectorAll('.p-splitter.p-splitter-horizontal')).find(isPrimary)||null}
  function parts(split){
    var kids=Array.from(split.children),left=kids.find(function(el){return el.classList.contains('side-bar-panel')})||null;
    var center=kids.find(function(el){return el.classList.contains('p-splitterpanel-nested')})||null;
    var right=kids.find(function(el){return el!==left&&el!==center&&el.classList.contains('p-splitterpanel')})||null;
    return{split:split,kids:kids,left:left,center:center,right:right,gutters:kids.filter(function(el){return el.classList.contains('p-splitter-gutter')})};
  }
  function isBottomSplit(split){if(!split?.matches?.('.p-splitter.p-splitter-vertical'))return false;var kids=Array.from(split.children);return kids.some(function(el){return el.classList.contains('graph-canvas-panel')})&&kids.some(function(el){return el.classList.contains('bottom-panel')})}
  function bottomParts(split){var kids=Array.from(split?.children||[]);return{split:split,graph:kids.find(function(el){return el.classList.contains('graph-canvas-panel')})||null,panel:kids.find(function(el){return el.classList.contains('bottom-panel')})||null,gutters:kids.filter(function(el){return el.classList.contains('p-splitter-gutter')})}}
  function findBottomSplit(root){if(isBottomSplit(root))return root;if(!root?.querySelectorAll)return null;return Array.from(root.querySelectorAll('.p-splitter.p-splitter-vertical')).find(isBottomSplit)||null}
  function activeBottomSplit(){return Array.from(document.querySelectorAll('.p-splitter.p-splitter-vertical')).find(isBottomSplit)||null}
  function decorateBottom(split){if(!split)return;var b=bottomParts(split);addClass(split,BOTTOM_SPLIT);decorated.add(split);if(b.panel){addClass(b.panel,BOTTOM);decorated.add(b.panel);markHosts(b.panel,BOTTOM_LAYER)}b.gutters.forEach(function(g){addClass(g,BOTTOM_GUTTER);decorated.add(g)})}
  function markHosts(el,layerRole){
    var layer=el?.closest?.('div.pointer-events-none.absolute.top-0.left-0.flex.size-full');
    for(var p=el?.parentElement;p&&p!==document.body;p=p.parentElement){
      addClass(p,HOST);hosts.add(p);
      if(!layer){var s=getComputedStyle(p),r=logical(p.getBoundingClientRect());if((s.position==='absolute'||s.position==='fixed')&&r.width>=innerWidth*.9&&r.height>=innerHeight*.8)layer=p}
    }
    if(layer){addClass(layer,PANEL_LAYER,layerRole);panelLayers.add(layer)}
  }
  function decorate(split){
    if(!split)return;var p=parts(split);addClass(split,SPLIT);decorated.add(split);
    if(p.center){addClass(p.center,CENTER);decorated.add(p.center)}
    if(p.left){addClass(p.left,PANEL,LEFT);decorated.add(p.left);markHosts(p.left,SIDE_LAYER)}
    if(p.right){addClass(p.right,PANEL,RIGHT);decorated.add(p.right);markHosts(p.right,SIDE_LAYER)}
    p.gutters.forEach(function(g){addClass(g,GUTTER);decorated.add(g)});
    decorateBottom(findBottomSplit(p.center));
  }
  function extensionsOpen(){return!!window.__comfierExtensionsPanel?.isOpen?.()}
  function loraOpen(){return!!window.__comfierLoraPanel?.isOpen?.()}
  function precisionOpen(){return!!window.__comfierLtxPanel?.isOpen?.()}
  function customRightOpen(){return precisionOpen()||loraOpen()||extensionsOpen()}
  function customRightController(){return precisionOpen()?window.__comfierLtxPanel:loraOpen()?window.__comfierLoraPanel:extensionsOpen()?window.__comfierExtensionsPanel:null}
  function rightSurface(p){return customRightController()?.surface?.()||p?.right}
  function setRightStack(p,value){const custom=customRightController();if(custom)custom.setStack(value);else important(p?.right,'z-index',String(value))}
  function syncOuterPortraitPanelStack(p){
    if(!p)return;
    if(!outerPortrait()){
      p.left?.style.removeProperty('z-index');p.right?.style.removeProperty('z-index');
      window.__comfierExtensionsPanel?.setStack?.(null);window.__comfierLoraPanel?.setStack?.(null);
      return;
    }
    // Bounded sibling ranks: opening panels never consumes another layer band.
    var top=lastSide==='left'?'left':'right';
    important(p.left,'z-index',top==='left'?'502':'501');
    setRightStack(p,top==='right'?'502':'501');
  }
  function portraitAnchors(){
    var root=document.documentElement,scale=liveUiZoom(),center=innerWidth/2;
    var values={'--comfy-remote-outer-workspace-center':center+'px','--comfy-remote-outer-run-left':center/(.75*scale)+'px','--comfy-remote-outer-canvas-left':center+'px'};
    Object.keys(values).forEach(function(name){if(outerPortrait())window.__comfierRuntime.writeStyle(root,name,values[name],'panels','');else root.style.removeProperty(name)});
  }
  function apply(reason){
    if(stopped)return false;
    var rr=railRect(),split=activePrimary();geometryActive=!!(rr&&split);if(!geometryActive){document.documentElement.classList.remove(ROOT);return false}portraitAnchors();
    decorate(split);var bottomSplit=activeBottomSplit();decorateBottom(bottomSplit);suppressPanelPropertiesButtons();var p=parts(split),bp=bottomParts(bottomSplit),customBottom=document.getElementById('comfier-downloads-bottom-panel'),bottomSurface=visible(customBottom)?customBottom:bp.panel,bottomOpen=visible(bottomSurface),leftOpen=visible(p.left),rightOpen=customRightOpen()||visible(p.right),count=(leftOpen?1:0)+(rightOpen?1:0);syncOuterPortraitPanelStack(p);bindLeftScroll(leftOpen?p.left:null);bindBottomResize(bottomOpen?bottomSurface:null);
    var panelPad=4,start=Math.ceil(rr.right)+panelPad,edgePad=panelPad,available=Math.max(120,Math.floor(innerWidth-start-edgePad));
    // Outer portrait keeps both floating panels, but does not use the
    // two-panel half-width split calculation.
    var splitCount=outerPortrait()?1:count,panelMax=600;
    var preferred=Math.min(panelMax,outerLandscape()?Math.floor(innerWidth*2/3):Math.floor(rr.height),available);
    // Preserve each panel's natural cap. Only divide the canvas evenly when
    // two capped panels would actually overlap; outer portrait keeps stacking.
    var overlap=splitCount===2&&preferred*2+panelPad>available;
    var cap=overlap?Math.floor((available-panelPad)/2):available;
    var width=Math.max(120,Math.min(preferred,cap));
    var root=document.documentElement;
    rootStyle(root,'--cef-width',width+'px');
    rootStyle(root,'--cef-left',start+'px');rootStyle(root,'--cef-right',Math.max(start,Math.floor(innerWidth-edgePad-width))+'px');
    if(loraOpen()||precisionOpen()){
      var loraLeft=start,loraWidth=available;
      if(leftOpen&&!outerPortrait()){loraLeft=start+width+panelPad;loraWidth=Math.max(120,Math.floor(innerWidth-edgePad-loraLeft))}
      rootStyle(root,'--cef-lora-left',loraLeft+'px');rootStyle(root,'--cef-lora-width',loraWidth+'px');
      rootStyle(root,'--cef-lora-content-width',(outerPortrait()?Math.max(1024,loraWidth):loraWidth)+'px');
    }else{'--cef-lora-left --cef-lora-width --cef-lora-content-width'.split(' ').forEach(function(name){root.style.removeProperty?.(name)})}
    addClass(root,ROOT);syncActionButton();syncQueuePanel();
    var vertical=sidePanelVerticalBounds(),leftHeight=Math.max(120,vertical.leftBottom-vertical.leftTop),rightHeight=Math.max(120,vertical.rightBottom-vertical.rightTop);
    rootStyle(root,'--cef-top',vertical.leftTop+'px');rootStyle(root,'--cef-height',leftHeight+'px');
    rootStyle(root,'--cef-left-top',vertical.leftTop+'px');rootStyle(root,'--cef-left-height',leftHeight+'px');
    rootStyle(root,'--cef-right-top',vertical.rightTop+'px');rootStyle(root,'--cef-right-height',rightHeight+'px');
    // Logs is an independent fixed overlay. Its horizontal canvas bounds must
    // never come from the nested graph splitter that changes with side panels.
    var graphRect=logical(document.getElementById('graph-canvas-container')?.getBoundingClientRect?.()||bp.graph?.getBoundingClientRect?.());
    if(bottomOpen&&!bottomWasOpen){var minimum=Math.max(80,parseFloat(bottomSurface?.dataset?.comfierBottomMinHeight)||120),preferred=parseFloat(bottomSurface?.dataset?.comfierBottomPreferredHeight)||Math.floor(innerHeight/3);bottomHeight=Math.max(minimum,Math.min(Math.max(minimum,innerHeight-48),preferred))}if(!bottomOpen)bottomHeight=null;bottomWasOpen=bottomOpen;
    var queueRect=queueDock&&visible(queueDock)?logical(queueDock.getBoundingClientRect()):null,bottomInset=queueRect?Math.max(4,Math.ceil(innerHeight-queueRect.top)+4):4;rootStyle(root,'--cef-bottom-inset',bottomInset+'px');
    if(graphRect){var bottomLeft=Math.max(Math.ceil(graphRect.left)+edgePad,start),bottomRight=Math.min(Math.floor(graphRect.right)-edgePad,innerWidth-edgePad),bottomWidth=Math.max(120,bottomRight-bottomLeft);rootStyle(root,'--cef-bottom-left',bottomLeft+'px');rootStyle(root,'--cef-bottom-width',bottomWidth+'px');rootStyle(root,'--cef-bottom-height',(bottomHeight||Math.max(120,Math.floor(innerHeight/3)))+'px')}
    // Diagnostic logging intentionally suppressed for Test Build 46.1.
    return true;
  }
  function schedule(reason){if(!stopped)jobs.frame('layout',function(){apply(reason)})}
  function scheduleBurst(reason){jobs.burst('settle',function(){schedule(reason)},[0,16,60,140,320])}
  var insertWrapper=function(node,reference){if(stopped)return originalInsert.apply(this,arguments);
    var split=node&&node.nodeType===1?findPrimary(node):null,bottom=node&&node.nodeType===1?findBottomSplit(node):null;if(split)decorate(split);if(bottom)decorateBottom(bottom);
    var result=originalInsert.apply(this,arguments);if(split||bottom)schedule('vue-insert');return result;
  };Node.prototype.insertBefore=insertWrapper;
  function label(button){return((button?.getAttribute?.('aria-label')||'')+' '+(button?.getAttribute?.('title')||'')+' '+(button?.textContent||'')).replace(/\s+/g,' ').trim().toLowerCase()}
  function raiseLastTriggered(side){
    var split=activePrimary(),panel=side==='right'?(split?rightSurface(parts(split)):null):document.querySelector('.'+LEFT);if(!panel||!visible(panel))return;
    if(outerPortrait()){lastSide=side;syncOuterPortraitPanelStack(parts(activePrimary()));return}
    lastSide=side;syncOuterPortraitPanelStack(parts(split));
  }
  function clickCapture(event){
    var button=event.target?.closest?.('button,[role="button"]');if(!button)return;var name=label(button);
    if(name.includes('toggle properties panel')||button.id==='comfier-extensions-toggle'||button.matches?.('button.lm-top-menu-button,button[aria-label^="Launch LoRA Manager"]')){lastSide='right';jobs.burst('stack',function(){raiseLastTriggered('right')},[0,32,100,220])}
    else if(railContains(button)&&button.classList.contains('side-bar-button')&&!button.matches('.comfy-help-center-btn')&&!name.includes('bottom panel')&&!name.includes('logs')){leftOwner=button;lastSide='left';jobs.burst('stack',function(){raiseLastTriggered('left')},[0,32,100,220])}
    jobs.burst('settle',function(){schedule('control')},[0,32,90,180]);
  }
  function selectedLeft(){return Array.from(document.querySelectorAll('.side-bar-button-selected')).find(function(b){var n=label(b);return railContains(b)&&!b.matches('.comfy-help-center-btn')&&!n.includes('bottom panel')&&!n.includes('logs')})||null}
  function closeActiveLeft(){
    // The jobs counter can change the active tab without a rail click.
    // Read current state; replaying leftOwner can reopen Settings or Nodes.
    var store=window.app?.extensionManager?.sidebarTab;
    if(store&&'activeSidebarTabId' in store){
      var id=store.activeSidebarTabId;if(!id)return false;
      if(typeof store.toggleSidebarTab==='function')store.toggleSidebarTab(id);else store.activeSidebarTabId=null;
      leftOwner=null;return true;
    }
    var button=selectedLeft();if(!button)return false;button.click();leftOwner=null;return true;
  }
  function closeManaged(){
    apply();var split=activePrimary();if(!split)return false;var p=parts(split),lo=visible(p.left),ro=customRightOpen()||visible(p.right);if(!lo&&!ro)return false;
    var side=lastSide&&((lastSide==='left'&&lo)||(lastSide==='right'&&ro))?lastSide:(ro?'right':'left');
    if(side==='right'&&customRightOpen()){const custom=customRightController();custom.closeIfOpen();lastSide=lo?'left':null;schedule(loraOpen()?'back-lora':'back-extensions');return true}
    if(side==='left'){if(!closeActiveLeft())return false}else{var button=currentPropertiesTarget();if(!button)return false;button.click()}lastSide=side==='right'&&lo?'left':side==='left'&&ro?'right':null;schedule('back-'+side);return true;
  }
  observer=window.__comfierMutations.create(function(records){
    var relevant=false;records.forEach(function(r){if(r.type==='attributes'&&(r.target===queuePanel||r.target?.matches?.('.side-bar-panel,.p-splitterpanel,.bottom-panel,.graph-canvas-panel')))relevant=true;Array.from(r.addedNodes||[]).forEach(function(n){if(n.nodeType!==1)return;if(findPrimary(n)){decorate(findPrimary(n));relevant=true}if(findBottomSplit(n)){decorateBottom(findBottomSplit(n));relevant=true}if(n.matches?.('[data-testid="queue-button"],.actionbar')||n.querySelector?.('[data-testid="queue-button"]'))relevant=true})});if(relevant)schedule('mutation');
  });
  observer.observe(document.documentElement,{subtree:true,childList:true,attributes:true,attributeFilter:['class','style']});
  function scaleInput(event){if(event.target?.matches?.('input[type="range"]'))scheduleBurst('ui-scale-input')}
  function viewportChange(){scheduleBurst('viewport-change')}
  function visibilityChange(){if(!document.hidden)scheduleBurst('focus-return')}
  document.addEventListener('click',clickCapture,true);document.addEventListener('input',scaleInput,true);document.addEventListener('change',scaleInput,true);document.addEventListener('visibilitychange',visibilityChange);window.addEventListener('resize',viewportChange,{passive:true});window.addEventListener('orientationchange',viewportChange,{passive:true});window.addEventListener('pageshow',viewportChange,{passive:true});window.addEventListener('focus',viewportChange,{passive:true});window.visualViewport?.addEventListener('resize',viewportChange,{passive:true});
  var existing=activePrimary();if(existing)decorate(existing);decorateBottom(activeBottomSplit());jobs.burst('startup',function(){schedule('startup')},[0,80,240,700,1200,2000]);jobs.burst('settle-watch',function(){if(!document.hidden)schedule('settle-watch')},[500,1000,1500,2000,2500,3000,3500,4000,4500,5000]);
  window.__comfierEarlyFloatingPanels={ownsGeometry:function(){return geometryActive},activateRight:function(){lastSide='right';jobs.burst('stack',function(){raiseLastTriggered('right')},[0,32,100,220]);scheduleBurst('right-open')},refresh:function(){scheduleBurst('manual')},close:closeManaged,remove:function(){if(stopped)return;stopped=true;geometryActive=false;jobs.dispose();observer?.disconnect();unbindLeftScroll();unbindBottomResize();document.removeEventListener('click',clickCapture,true);document.removeEventListener('input',scaleInput,true);document.removeEventListener('change',scaleInput,true);document.removeEventListener('visibilitychange',visibilityChange);window.removeEventListener('resize',viewportChange);window.removeEventListener('orientationchange',viewportChange);window.removeEventListener('pageshow',viewportChange);window.removeEventListener('focus',viewportChange);window.visualViewport?.removeEventListener('resize',viewportChange);if(Node.prototype.insertBefore===insertWrapper)Node.prototype.insertBefore=originalInsert;document.documentElement.classList.remove(ROOT);['--cef-properties-reserve','--cef-lora-left','--cef-lora-width','--cef-lora-content-width','--cef-left-top','--cef-left-height','--cef-right-top','--cef-right-height','--cef-bottom-left','--cef-bottom-width','--cef-bottom-height','--cef-bottom-inset'].forEach(function(name){document.documentElement.style.removeProperty(name)});restoreCanvasMenu();document.querySelectorAll('.'+ACTION_INTERNAL).forEach(function(button){button.classList.remove(ACTION_INTERNAL)});actionSource?.classList.remove(ACTION_SOURCE);actionSurface?.classList.remove(ACTION_SHIFT);actionDock?.remove();staleQueues.forEach(function(panel){panel.classList.remove(QUEUE_STALE)});staleQueues.clear();queuePanel?.classList.remove(QUEUE_PANEL);queueHome?.classList.remove(QUEUE_HOME);if(queuePanel?.isConnected&&queueHome?.isConnected)queueHome.appendChild(queuePanel);queueDock?.remove();decorated.forEach(function(el){el.classList.remove(SPLIT,PANEL,LEFT,RIGHT,CENTER,GUTTER,BOTTOM_SPLIT,BOTTOM,BOTTOM_GUTTER)});hosts.forEach(function(el){el.classList.remove(HOST)});panelLayers.forEach(function(el){el.classList.remove(PANEL_LAYER,SIDE_LAYER,BOTTOM_LAYER)});panelLayers.clear();style.remove();delete window.__comfierEarlyFloatingPanels}};
  return 'Early floating-panel takeover installed. Open a left panel, Properties, then both; Back should close the most recently opened panel.';
})();
