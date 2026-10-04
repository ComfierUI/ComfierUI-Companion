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
.${HIDDEN}{display:none!important;visibility:hidden!important;pointer-events:none!important}
/* Rank the existing native rail in both outer views, matching the
   pre-audit rail without changing any other surface. */
html body nav.side-tool-bar-container:has(.side-bar-button){
  z-index:1001!important;visibility:visible!important;opacity:1!important;pointer-events:auto!important
}
`;
  document.head.appendChild(style);

  let stopped=false,applying=false,state=null,observer=null,cornerShift=null;
  const movedOrigins=new Map();
  const jobs=window.__comfierRuntime.scope('rail');
  const unpublish=window.__comfierUi.publishRail(()=>window.__comfierConnectedSidebar?.root?.()||state?.top);
  const visible=el=>{
    if(!el?.isConnected)return false;
    const r=el.getBoundingClientRect(),s=getComputedStyle(el);
    return r.width>0&&r.height>0&&s.display!=='none'&&s.visibility!=='hidden';
  };
  const outerLandscape=()=>window.__comfierViewport?window.__comfierViewport.mode()==='outerLandscape':Math.min(screen.width,screen.height)<=520&&innerWidth>innerHeight;
  const railBox=el=>{
    if(!visible(el))return false;
    const r=logical(el.getBoundingClientRect());
    return r.left<32&&r.width>=20&&r.width<180&&r.height>=40&&r.right<220;
  };
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
  // Floating assembly retains native action nodes; connected assembly uses its owned host.
  function ownFloating(top){return window.__comfierEdgeBar?.attach(top)||false;}
  function writeFloating(top,name,value,priority='important'){
    const authority=window.__comfierUiAuthority;
    if(!authority?.canWrite(top,'rail'))return false;
    if(value===null)top.style.removeProperty(name);
    else authority.write(top,name,value,'rail',priority);
    return true;
  }
  function saveTopStyle(top){
    const values={};
    ['position','left','right','top','bottom','height','min-height','max-height','transform'].forEach(name=>values[name]={value:top.style.getPropertyValue(name),priority:top.style.getPropertyPriority(name)});
    return values;
  }
  function restoreTop(top,values){
    if(!top||!values)return;
    window.__comfierEdgeBar?.detach();
    Object.entries(values).forEach(([name,saved])=>writeFloating(top,name,saved.value||null,saved.priority));
    window.__comfierUiAuthority?.unregisterOwned('floatingRail',top);
    top.removeAttribute('data-comfier-owned-rail');top.classList.remove(ACTIVE);
  }
  function restore(){
    if(!state){
      document.querySelectorAll('.'+ACTIVE).forEach(group=>group.classList.remove(ACTIVE));
      document.querySelectorAll('.'+HIDDEN).forEach(group=>group.classList.remove(HIDDEN));
      return;
    }
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
    if(element?.isConnected&&window.__comfierUiAuthority?.canWrite(element,'rail')){if(value)window.__comfierUiAuthority.write(element,'translate',value,'rail',priority);else element.style.removeProperty('translate')}
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
    if(!window.__comfierUiAuthority?.canWrite(target,'rail'))return;
    cornerShift={element:target,value:target.style.getPropertyValue('translate'),priority:target.style.getPropertyPriority('translate')};
    window.__comfierUiAuthority.write(target,'translate',shift+'px 0','rail');
  }
  function positionExtras(){positionCornerMenu()}
  
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
    if(!ownFloating(top)){applying=false;return false}
    top.classList.add(ACTIVE);top.classList.remove(HIDDEN);
    groups.forEach(source=>{
      if(source===top)return;
      state.sources.add(source);source.classList.add(HIDDEN);
      [...source.children].filter(item=>item.nodeType===1).forEach(item=>{
        if(!movedOrigins.has(item))movedOrigins.set(item,{parent:source,nextSibling:item.nextSibling});
        top.appendChild(item);
      });
    });
    window.__comfierEdgeBar?.layout();positionExtras();applying=false;
    return true;
  }
  function apply(){
    if(stopped||applying)return;
    if(window.__comfierConnectedSidebar?.enabled?.()??outerLandscape()){restore();window.__comfierConnectedSidebar?.refresh();canonicalTail();window.__comfierLayoutEditor?.refresh();return;}
    window.__comfierConnectedSidebar?.release();
    
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
  observer=window.__comfierMutations.create(records=>{
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
  jobs.listen(window,'comfier-sidebar-mode-change',resized);
  document.addEventListener('change',settingChange,true);
  document.addEventListener('click',captureRailButton,true);

  window.__comfierUnifiedSidebarTest={
    refresh:schedule,
    snapshot(){return{active:!!state,owned:!!state?.top?.hasAttribute('data-comfier-owned-rail'),topButtons:state?.top?.querySelectorAll('.side-bar-button').length||0,movedItems:movedOrigins.size,outerLandscape:outerLandscape()};},
    remove(){if(stopped)return;
      stopped=true;
      observer?.disconnect();
      window.removeEventListener('comfier-layout-side-change',resized);
      window.removeEventListener('resize',resized);
      document.removeEventListener('change',settingChange,true);
      document.removeEventListener('click',captureRailButton,true);
      
      unpublish();jobs.dispose();
      restore();
      style.remove();
      delete window.__comfierUnifiedSidebarTest;
      console.log('UNIFIED-SIDEBAR removed');
    }
  };
  schedule();
  return 'Floating unified sidebar enabled. Lower rail items move into the upper rail; connected rails use the Comfier host and Layout Editor.';
})();
