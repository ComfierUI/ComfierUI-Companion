(() => {
  'use strict';
  if(window.__comfierGutterGrips)return;
  const style=document.createElement('style');
  style.id='comfier-gutter-grips';
  const attr='data-comfier-pull-direction',owned=new Map(),observed=new Set();
  let frame=0,stopped=false;
  const selector='#graph-canvas-container :is(.p-splitter-gutter[role="separator"],.splitter-overlay-bottom > .p-splitter-gutter)';
  // Two 2px bars, with a 10px clear gap. Bottom grip is rotated.
  const placements=new WeakMap();
  style.textContent=`
${selector}[${attr}]{position:relative!important;overflow:visible!important;z-index:10!important;}
${selector}[${attr}]::after{
 content:""!important;display:block!important;position:absolute!important;
 top:50%!important;left:calc(50% + 9px)!important;transform:translate(-50%,-50%)!important;
 width:30px!important;height:80px!important;min-width:30px!important;min-height:80px!important;
 max-width:30px!important;max-height:80px!important;
 margin:0!important;padding:0!important;border:0!important;box-sizing:border-box!important;
 background-color:transparent!important;background-image:linear-gradient(var(--comfier-icon-color,var(--comfier-accent)),var(--comfier-icon-color,var(--comfier-accent))),linear-gradient(var(--comfier-icon-color,var(--comfier-accent)),var(--comfier-icon-color,var(--comfier-accent)))!important;
 background-repeat:no-repeat!important;background-position:8px center,20px center!important;background-size:2px 70px!important;
 opacity:1!important;visibility:visible!important;pointer-events:auto!important;touch-action:none!important;
 user-select:none!important;-webkit-user-select:none!important;cursor:ew-resize!important;z-index:1!important;
 filter:drop-shadow(0 1px 2px #000)!important;
}
${selector}[${attr}="left"]::after{left:calc(50% - 9px)!important;}
${selector}[${attr}="up"]::after{
 left:50%!important;top:calc(50% - 9px)!important;
 width:80px!important;height:30px!important;min-width:80px!important;min-height:30px!important;
 max-width:80px!important;max-height:30px!important;
 background-position:center 8px,center 20px!important;background-size:70px 2px!important;cursor:ns-resize!important;
}
`;
  document.head.appendChild(style);
  function schedule(){if(!stopped&&!frame)frame=requestAnimationFrame(refresh);}
  const resize=window.ResizeObserver?new ResizeObserver(schedule):null;
  function refresh(){
    frame=0;if(stopped)return;
    const wanted=new Set();
    document.querySelectorAll(selector).forEach(gutter=>{
      const parent=gutter.parentElement;
      const vertical=parent?.classList.contains('p-splitter-vertical');
      if(!vertical&&!parent?.classList.contains('p-splitter-horizontal'))return;
      wanted.add(parent);
      const rect=gutter.getBoundingClientRect();
      // Mark hidden bottom gutters too; CSS follows native visibility.
      if((!rect.width||!rect.height)&&!vertical)return;
      let direction='up';
      if(!vertical){
        const dividers=[...parent.children].filter(el=>el.matches('.p-splitter-gutter[role="separator"]'));
        const index=dividers.indexOf(gutter);
        if(dividers.length>1)direction=index===dividers.length-1?'left':'right';
        else{
          // Single-divider layouts: place the handle toward the workspace.
          const bounds=parent.getBoundingClientRect();
          direction=rect.left+rect.width/2>bounds.left+bounds.width/2?'left':'right';
        }
      }
      // Keep the attachment side stable throughout dragging.
      if(placements.has(gutter))direction=placements.get(gutter);else placements.set(gutter,direction);
      if(!owned.has(gutter))owned.set(gutter,gutter.getAttribute(attr));
      if(gutter.getAttribute(attr)!==direction)gutter.setAttribute(attr,direction);
      // Panel size changes include native divider drags; no animation loop.
      [...parent.children].filter(el=>el.classList.contains('p-splitterpanel')).forEach(el=>wanted.add(el));
    });
    for(const el of observed)if(!wanted.has(el)){resize?.unobserve(el);observed.delete(el);}
    for(const el of wanted)if(!observed.has(el)){resize?.observe(el);observed.add(el);}
    for(const [el,prior] of owned)if(!el.isConnected){if(prior===null)el.removeAttribute(attr);else el.setAttribute(attr,prior);owned.delete(el);}
  }
  const observer=window.__comfierMutations.create(records=>{
    if(records.some(r=>[...r.addedNodes,...r.removedNodes].some(n=>n.nodeType===1&&(n.matches?.('.p-splitter,.p-splitterpanel,.p-splitter-gutter')||n.querySelector?.('.p-splitter,.p-splitter-gutter')))))schedule();
  });
  observer.observe(document.body,{childList:true,subtree:true});
  window.addEventListener('resize',schedule,{passive:true});
  refresh();
  window.__comfierGutterGrips={remove(){stopped=true;cancelAnimationFrame(frame);observer.disconnect();resize?.disconnect();window.removeEventListener('resize',schedule);style.remove();for(const [el,prior] of owned){if(prior===null)el.removeAttribute(attr);else el.setAttribute(attr,prior);}owned.clear();delete window.__comfierGutterGrips;}};
  // Constrain active drags by testing the grip rectangles for overlap.
  // Native handlers still perform every allowed resize; no panel sizes are set here.
  const sideSelector='#graph-canvas-container .p-splitter-horizontal > .p-splitter-gutter';
  const rendered=el=>{if(!el?.isConnected)return false;const r=el.getBoundingClientRect(),cs=getComputedStyle(el);return r.width>0&&r.height>0&&cs.display!=='none'&&cs.visibility!=='hidden';};
  function box(el){
    const r=el.getBoundingClientRect();
    const scaleX=el.offsetWidth?r.width/el.offsetWidth:1;
    const scaleY=el.offsetHeight?r.height/el.offsetHeight:1;
    // These are the existing pseudo-element's 30 x 80 touch bounds.
    const x=r.left+r.width/2+(el.getAttribute(attr)==='left'?-9:9)*scaleX;
    const y=r.top+r.height/2;
    return {left:x-15*scaleX,right:x+15*scaleX,top:y-40*scaleY,bottom:y+40*scaleY};
  }
  function collides(a,b,dx){
    if(a.top>=b.bottom||a.bottom<=b.top)return false;
    if(a.right<=b.left)return dx>0&&a.right+dx>b.left;
    if(a.left>=b.right)return dx<0&&a.left+dx<b.right;
    // If a native layout already overlaps, allow movement apart.
    return dx*((b.left+b.right)-(a.left+a.right))>0;
  }
  let gesture=null;
  function down(event){
    const gutter=event.target?.closest?.(sideSelector);
    if(!gutter||!rendered(gutter)||!gutter.hasAttribute(attr))return;
    const point=event.touches?.[0]||event;
    if(!Number.isFinite(point.clientX))return;
    gesture={gutter,last:{pointermove:point.clientX,mousemove:point.clientX,touchmove:point.clientX}};
  }
  function move(event){
    if(!gesture||!rendered(gesture.gutter))return;
    if(event.touches&&event.touches.length!==1)return;
    const point=event.touches?.[0]||event,x=point.clientX;
    if(!Number.isFinite(x))return;
    const delta=x-gesture.last[event.type],own=box(gesture.gutter);
    const blocked=[...document.querySelectorAll(sideSelector)].some(el=>
      el!==gesture.gutter&&rendered(el)&&el.hasAttribute(attr)&&collides(own,box(el),delta));
    if(blocked){
      if(event.cancelable)event.preventDefault();
      event.stopImmediatePropagation();
      return;
    }
    gesture.last[event.type]=x;
  }
  function end(){gesture=null;}
  const startTypes=['pointerdown','mousedown','touchstart'],moveTypes=['pointermove','mousemove','touchmove'],endTypes=['pointerup','mouseup','touchend','pointercancel','touchcancel','blur'];
  startTypes.forEach(type=>window.addEventListener(type,down,{capture:true,passive:true}));
  moveTypes.forEach(type=>window.addEventListener(type,move,{capture:true,passive:false}));
  endTypes.forEach(type=>window.addEventListener(type,end,true));
  const removeGrips=window.__comfierGutterGrips.remove;
  window.__comfierGutterGrips.remove=()=>{
    startTypes.forEach(type=>window.removeEventListener(type,down,true));
    moveTypes.forEach(type=>window.removeEventListener(type,move,true));
    endTypes.forEach(type=>window.removeEventListener(type,end,true));
    gesture=null;removeGrips();
  };
})();
