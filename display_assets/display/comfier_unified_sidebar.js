(function(){
  'use strict';
  window.__comfierUnifiedSidebarTest?.remove?.();

  const logical=r=>window.__comfierLayoutSide?.rect(r)||r;
  const isRight=()=>window.__comfierLayoutSide?.side()==='right';
  const STYLE_ID='comfier-unified-sidebar-test-style';
  const ACTIVE='comfier-unified-floating-rail';
  const HIDDEN='comfier-unified-rail-source-hidden';
  const style=document.createElement('style');
  style.id=STYLE_ID;
  style.textContent=`
.${ACTIVE}{
  position:fixed!important;left:4px!important;right:auto!important;
  top:50%!important;bottom:auto!important;
  height:min(1000px,max(240px,calc(100dvh - 200px)))!important;
  min-height:0!important;max-height:1000px!important;
  margin-top:0!important;box-sizing:border-box!important;
  transform:translateY(-50%)!important;z-index:var(--comfier-z-sidebar,100)!important
}
nav.side-tool-bar-container:has(.${ACTIVE}){
  --sidebar-width:50px!important;
  max-width:50px!important;
  overflow:visible!important;transition:none!important
}
nav.side-tool-bar-container:has(.${ACTIVE})>div{overflow:visible!important}
.${ACTIVE}{overflow:visible!important;align-items:center!important;justify-content:stretch!important}
.${ACTIVE}>*{flex:1 1 0!important;min-height:0!important;max-height:none!important;margin-block:0!important}
.${ACTIVE} .side-bar-button{
  width:50px!important;min-width:50px!important;max-width:50px!important;
  height:auto!important;min-height:0!important;max-height:none!important;
  flex:1 1 0!important;zoom:1!important;scale:1!important;
  transform:none!important;transition-property:color,background-color,border-color!important
}
.${HIDDEN}{display:none!important;visibility:hidden!important;pointer-events:none!important}
.${ACTIVE}~.sidebar-item-group,.sidebar-item-group:has(~.${ACTIVE}){display:none!important;visibility:hidden!important;pointer-events:none!important}
`;
  document.head.appendChild(style);

  let stopped=false,applying=false,state=null,observer=null,cornerShift=null;
  const movedOrigins=new Map();
  let scrollRail=null,scrollSaved=null,scrollDrag=null,scrollMovedUntil=0;
  const scrollProperties=['max-height','min-height','overflow-y','overflow-x','overscroll-behavior','touch-action','scrollbar-width','-webkit-overflow-scrolling'];
  const jobs=window.__comfierRuntime.scope('rail');
  const unpublish=window.__comfierUi.publishRail(()=>outerLandscape()?scrollRail:state?.top);
  const visible=el=>{
    if(!el?.isConnected)return false;
    const r=el.getBoundingClientRect(),s=getComputedStyle(el);
    return r.width>0&&r.height>0&&s.display!=='none'&&s.visibility!=='hidden';
  };
  const outerLandscape=()=>Math.min(screen.width,screen.height)<=520&&innerWidth>innerHeight;
  const railBox=el=>{
    if(!visible(el))return false;
    const r=logical(el.getBoundingClientRect());
    return r.left<32&&r.width>=20&&r.width<180&&r.height>=40&&r.right<220;
  };
  function connectedRailCandidates(){
    const buttons=[...document.querySelectorAll('.side-bar-button')].filter(button=>{if(!visible(button))return false;const r=logical(button.getBoundingClientRect());return r.left<160&&r.right>-1});
    const found=new Map();
    buttons.forEach(button=>{
      for(let element=button.parentElement;element&&element!==document.body;element=element.parentElement){
        const rect=logical(element.getBoundingClientRect());
        if(!visible(element)||rect.left>=80||rect.right<=0||rect.width<20||rect.width>220||rect.height<60)continue;
        if(!found.has(element))found.set(element,new Set());found.get(element).add(button);
      }
    });
    return [...found].map(([element,set])=>{const rect=logical(element.getBoundingClientRect()),name=element.id||String(element.className||element.tagName),preferred=/side-tool-bar-container|side-toolbar-container|comfier-unified-floating-rail/.test(name);return{element,buttonCount:set.size,score:set.size*1000+(preferred?500:0)-rect.width-Math.abs(rect.left)}}).sort((a,b)=>b.score-a.score);
  }
  function findConnectedScrollRail(){const list=connectedRailCandidates();return list.length&&list[0].buttonCount>=2?list[0].element:null}
  function saveScrollStyles(element){const values={};scrollProperties.forEach(name=>values[name]={value:element.style.getPropertyValue(name),priority:element.style.getPropertyPriority(name)});return values}
  function restoreScrollStyles(element,values){if(!element||!values)return;scrollProperties.forEach(name=>{const old=values[name];if(old.value)element.style.setProperty(name,old.value,old.priority);else element.style.removeProperty(name)})}
  function unbindConnectedScroll(){
    if(scrollRail){scrollRail.removeEventListener('pointerdown',connectedScrollDown,true);scrollRail.removeEventListener('pointermove',connectedScrollMove,true);scrollRail.removeEventListener('pointerup',connectedScrollEnd,true);scrollRail.removeEventListener('pointercancel',connectedScrollEnd,true);scrollRail.removeEventListener('click',blockConnectedScrollClick,true);restoreScrollStyles(scrollRail,scrollSaved)}
    scrollRail=null;scrollSaved=null;scrollDrag=null;
  }
  function styleConnectedScrollRail(element){
    const top=Math.max(4,element.getBoundingClientRect().top),limit=Math.max(80,innerHeight-top-4)+'px';
    element.style.setProperty('max-height',limit,'important');element.style.setProperty('min-height','0','important');element.style.setProperty('overflow-y','auto','important');element.style.setProperty('overflow-x','hidden','important');element.style.setProperty('overscroll-behavior','contain','important');element.style.setProperty('touch-action','none','important');element.style.setProperty('scrollbar-width','none','important');element.style.setProperty('-webkit-overflow-scrolling','touch','important');
  }
  function bindConnectedScroll(){
    const next=findConnectedScrollRail();
    if(next!==scrollRail){unbindConnectedScroll();scrollRail=next;if(scrollRail){scrollSaved=saveScrollStyles(scrollRail);scrollRail.addEventListener('pointerdown',connectedScrollDown,true);scrollRail.addEventListener('pointermove',connectedScrollMove,{capture:true,passive:false});scrollRail.addEventListener('pointerup',connectedScrollEnd,true);scrollRail.addEventListener('pointercancel',connectedScrollEnd,true);scrollRail.addEventListener('click',blockConnectedScrollClick,true)}}
    if(scrollRail)styleConnectedScrollRail(scrollRail);
  }
  function connectedScrollDown(event){if(!scrollRail||event.isPrimary===false||event.pointerType==='mouse')return;scrollDrag={id:event.pointerId,x:event.clientX,y:event.clientY,top:scrollRail.scrollTop,active:false}}
  function connectedScrollMove(event){
    if(!scrollDrag||event.pointerId!==scrollDrag.id||!scrollRail)return;const dx=event.clientX-scrollDrag.x,dy=event.clientY-scrollDrag.y;
    if(!scrollDrag.active){if(!window.__comfierUi.verticalDrag(dx,dy,7))return;scrollDrag.active=true;try{scrollRail.setPointerCapture(event.pointerId)}catch(_){}}
    if(event.cancelable)event.preventDefault();event.stopPropagation();scrollRail.scrollTop=scrollDrag.top-dy;
  }
  function connectedScrollEnd(event){if(!scrollDrag||event.pointerId!==scrollDrag.id)return;if(scrollDrag.active){scrollMovedUntil=performance.now()+350;if(event.cancelable)event.preventDefault();event.stopPropagation();try{scrollRail.releasePointerCapture(event.pointerId)}catch(_){}}scrollDrag=null}
  function blockConnectedScrollClick(event){window.__comfierUi.blockScrollClick(event,scrollMovedUntil)}
  function findLiveNav(){
    return [...document.querySelectorAll('nav.side-tool-bar-container')].map(nav=>{
      const rect=logical(nav.getBoundingClientRect());return{nav,rect,count:nav.querySelectorAll('.side-bar-button').length};
    }).filter(entry=>entry.count>=2&&entry.rect.left<80&&entry.rect.right<220)
      .sort((a,b)=>b.count-a.count)[0]?.nav||null;
  }
  function liveGroups(nav){
    if(!nav)return[];
    return [...nav.querySelectorAll('.sidebar-item-group')]
      .filter(group=>group.closest('nav.side-tool-bar-container')===nav)
      .sort((a,b)=>a.getBoundingClientRect().top-b.getBoundingClientRect().top);
  }
  function saveTopStyle(top){
    const values={};
    ['position','left','right','top','bottom','height','min-height','max-height','transform'].forEach(name=>values[name]={value:top.style.getPropertyValue(name),priority:top.style.getPropertyPriority(name)});
    return values;
  }
  function restoreTop(top,values){
    if(!top||!values)return;
    Object.entries(values).forEach(([name,saved])=>{if(saved.value)top.style.setProperty(name,saved.value,saved.priority);else top.style.removeProperty(name)});
    top.classList.remove(ACTIVE);
  }
  function restore(){
    if(!state)return;
    applying=true;
    restoreCorner();

    [...movedOrigins].reverse().forEach(([item,origin])=>{
      if(!item?.isConnected||!origin.parent?.isConnected)return;
      if(origin.nextSibling?.parentElement===origin.parent)origin.parent.insertBefore(item,origin.nextSibling);
      else origin.parent.appendChild(item);
    });
    movedOrigins.clear();
    restoreTop(state.top,state.topStyle);
    state.sources.forEach(source=>source?.classList.remove(HIDDEN));
    document.querySelectorAll('.'+ACTIVE).forEach(group=>group.classList.remove(ACTIVE));
    document.querySelectorAll('.'+HIDDEN).forEach(group=>group.classList.remove(HIDDEN));
    state=null;
    applying=false;
  }
  function restoreCorner(){
    if(!cornerShift)return;
    const {element,value,priority}=cornerShift;
    if(element?.isConnected){if(value)element.style.setProperty('translate',value,priority);else element.style.removeProperty('translate')}
    cornerShift=null;
  }
  function positionCornerMenu(){
    if(!state?.top?.isConnected)return;
    // Only the actual Comfy menu may be nudged out of the rail's way.
    // A startup panel header can overlap the rail transiently; the old global
    // button scan mistook it for the menu and cached its translate until resize.
    const menuSelector='.comfy-menu-button-wrapper';
    const panelSelector='.side-bar-panel,.sidebar-content-container,.comfy-vue-side-bar-container,.comfier-early-floating-panel,#comfier-app-settings-panel';
    if(cornerShift?.element?.isConnected){
      if(cornerShift.element.matches(menuSelector)&&!cornerShift.element.closest(panelSelector))return;
      restoreCorner();
    }
    cornerShift=null;
    const rail=state.top.getBoundingClientRect();
    const target=[...document.querySelectorAll(menuSelector)].filter(menu=>{
      if(!visible(menu)||state.top.contains(menu)||menu.closest(panelSelector))return false;
      const r=menu.getBoundingClientRect();
      return r.top<Math.min(280,innerHeight*.3)&&r.bottom>rail.top&&r.top<rail.bottom&&r.right>rail.left&&r.left<rail.right;
    }).sort((a,b)=>a.getBoundingClientRect().left-b.getBoundingClientRect().left)[0];
    if(!target)return;
    const r=target.getBoundingClientRect(),shift=isRight()?Math.floor(rail.left-8-r.right):Math.ceil(rail.right+8-r.left);
    if(isRight()?shift>=0:shift<=0)return;
    cornerShift={element:target,value:target.style.getPropertyValue('translate'),priority:target.style.getPropertyPriority('translate')};
    target.style.setProperty('translate',shift+'px 0','important');
  }
  function positionExtras(){positionCornerMenu()}
  function graphCanvasBounds(){
    const container=document.getElementById('graph-canvas-container'),containerRect=container?.getBoundingClientRect();
    const tabs=document.getElementById('topbar-workflow-tabs')||document.querySelector('[data-testid="topbar-workflow-tabs"]');
    const tabRects=tabs?[tabs,...tabs.children].map(element=>element.getBoundingClientRect()):[];
    const tabBottom=tabRects.length?Math.max(...tabRects.map(rect=>rect.bottom)):0;
    const top=Math.max(0,tabBottom||containerRect?.top||0),bottom=Math.min(innerHeight,containerRect?.bottom||innerHeight);
    return bottom>top?{top,bottom,height:bottom-top}:{top:0,bottom:innerHeight,height:innerHeight};
  }
  function setStyleIfChanged(el,name,value,priority='important'){
    if(!el)return;
    if(el.style.getPropertyValue(name)===value&&el.style.getPropertyPriority(name)===priority)return;
    el.style.setProperty(name,value,priority);
  }
  function center(top){
    if(!top)return;
    const canvas=graphCanvasBounds(),railHeight=Math.min(1000,Math.max(240,canvas.height-200)),railTop=canvas.top+(canvas.height-railHeight)/2;
    setStyleIfChanged(top,'position','fixed');
    setStyleIfChanged(top,'left',isRight()?'auto':'4px');
    setStyleIfChanged(top,'right',isRight()?'4px':'auto');
    setStyleIfChanged(top,'top',railTop+'px');
    setStyleIfChanged(top,'bottom','auto');
    setStyleIfChanged(top,'height',railHeight+'px');
    setStyleIfChanged(top,'min-height','0');
    setStyleIfChanged(top,'max-height','1000px');
    setStyleIfChanged(top,'transform','none');
  }
  function reconcileLiveRail(){
    const nav=findLiveNav(),groups=liveGroups(nav);
    if(groups.length<2)return false;
    const top=groups.find(group=>group.classList.contains(ACTIVE))||groups[0];
    if(!state||state.top!==top){
      const sources=state?.sources||new Set();
      if(state){restoreCorner();restoreTop(state.top,state.topStyle)}
      state={top,topStyle:saveTopStyle(top),sources};
    }
    applying=true;
    if(!top.classList.contains(ACTIVE))top.classList.add(ACTIVE);if(top.classList.contains(HIDDEN))top.classList.remove(HIDDEN);
    groups.forEach(source=>{
      if(source===top)return;
      state.sources.add(source);if(!source.classList.contains(HIDDEN))source.classList.add(HIDDEN);
      [...source.children].filter(item=>item.nodeType===1).forEach(item=>{
        if(!movedOrigins.has(item))movedOrigins.set(item,{parent:source,nextSibling:item.nextSibling});
        top.appendChild(item);
      });
    });
    center(top);positionExtras();applying=false;
    return true;
  }
  function apply(){
    if(stopped||applying)return;
    if(outerLandscape()){restore();canonicalTail();bindConnectedScroll();return;}
    unbindConnectedScroll();
    if(cornerShift&&!cornerShift.element.isConnected)cornerShift=null;
    reconcileLiveRail();canonicalTail();
  }
  function schedule(){if(!stopped&&!applying)jobs.frame('layout',apply)}
  function resized(){restoreCorner();schedule()}
  function settingChange(event){
    const target=event.target;
    if(!target?.closest)return;
    const row=target.closest('label,[data-setting-id],[role="group"],.setting-item,.settings-row')||target.parentElement;
    const description=((target.getAttribute?.('aria-label')||'')+' '+(row?.textContent||'')).replace(/\s+/g,' ').toLowerCase();
    if(!(/floating.*side.?bar|side.?bar.*floating/.test(description)))return;
    restore();
    jobs.burst('settings',schedule,[0,120,320]);
  }
  function buttonLabel(el){return((el?.getAttribute?.('aria-label')||'')+' '+(el?.getAttribute?.('title')||'')+' '+(el?.getAttribute?.('data-testid')||'')+' '+(el?.textContent||'')).replace(/\s+/g,' ').trim().toLowerCase()}
  function canonicalTail(){
    const buttons=[...document.querySelectorAll('.side-bar-button')];
    const find=predicate=>buttons.find(button=>predicate(buttonLabel(button),button))||null;
    const desired=[
      document.querySelector('[data-testid="comfier-templates-tab-button"]')||find(name=>name==='templates'),
      document.getElementById('comfier-multiselect-toggle'),
      document.querySelector('[data-testid="comfier-app-settings-tab-button"]')||find(name=>name.includes('app settings')),
      document.querySelector('[data-testid="comfier-native-settings-tab-button"]')||find(name=>name.includes('comfy settings')),
      find(name=>name.includes('toggle bottom panel')||name==='logs'||name.includes('open logs')||name.includes('terminal')||name.includes('console')),
      document.querySelector('button.comfy-help-center-btn')||find(name=>name==='help'||name.includes('help center'))
    ].filter(Boolean);
    const multi=document.getElementById('comfier-multiselect-toggle'),parent=multi?.parentElement;
    if(!parent||desired.length<2)return false;
    const tail=[...parent.children].slice(-desired.length);
    if(desired.every((control,index)=>control.parentElement===parent&&tail[index]===control))return false;
    applying=true;try{desired.forEach(control=>parent.appendChild(control))}finally{applying=false}
    return true;
  }
  function captureRailButton(event){
    const button=event.target?.closest?.('.side-bar-button,button,[role="button"]');
    if(!button)return;
    if(button.matches?.('.side-bar-button'))jobs.burst('settle',schedule,[0,40,100,220,450,900]);
  }
  observer=new MutationObserver(records=>{
    if(applying)return;
    if(records.some(record=>record.target===document.documentElement&&record.type==='attributes')){schedule();return;}
    if(records.some(record=>record.type==='attributes'&&record.attributeName==='class')){schedule();return;}
    if(records.some(record=>[...record.addedNodes,...record.removedNodes].some(node=>
      node.nodeType===1&&(node.matches?.('.side-bar-button')||node.querySelector?.('.side-bar-button')))))schedule();
  });
  observer.observe(document.body,{childList:true,subtree:true,attributes:true,attributeFilter:['class']});
  observer.observe(document.documentElement,{attributes:true,attributeFilter:['style']});
  window.addEventListener('comfier-layout-side-change',resized);
  window.addEventListener('resize',resized,{passive:true});
  document.addEventListener('change',settingChange,true);
  document.addEventListener('click',captureRailButton,true);

  window.__comfierUnifiedSidebarTest={
    refresh:schedule,
    snapshot(){return{active:!!state,topButtons:state?.top?.querySelectorAll('.side-bar-button').length||0,movedItems:movedOrigins.size,outerLandscape:outerLandscape()};},
    remove(){if(stopped)return;
      stopped=true;
      observer?.disconnect();
      window.removeEventListener('comfier-layout-side-change',resized);
      window.removeEventListener('resize',resized);
      document.removeEventListener('change',settingChange,true);
      document.removeEventListener('click',captureRailButton,true);
      unbindConnectedScroll();
      unpublish();jobs.dispose();
      restore();
      style.remove();
      delete window.__comfierUnifiedSidebarTest;
      console.log('UNIFIED-SIDEBAR removed');
    }
  };
  schedule();
  return 'Floating unified sidebar enabled. Lower rail items move into the upper rail; restored outer-landscape rails use viewport-clamped touch scrolling.';
})();
