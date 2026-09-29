(function(){
  'use strict';
  window.__comfierOwnedOverlayLayers?.remove?.();
  const jobs=window.__comfierRuntime.scope('owned-overlays');
  const L=window.__comfierLayers;
  const OWNER='.comfier-early-floating-panel,.comfier-early-floating-bottom,[data-testid="queue-progress-overlay"],#comfier-ui-zoom-test,#comfier-prompt-popup,#comfier-diagnostics-root';
  const WRAPPER='[data-reka-popper-content-wrapper],[data-radix-popper-content-wrapper]';
  const MENUS='.p-menu,.p-tieredmenu,.p-contextmenu,.p-tieredmenu-submenu,.p-contextmenu-submenu,.litecontextmenu,.lm-lora-context-menu';
  const SELECTS='.p-select-overlay,.p-dropdown-panel,.p-multiselect-overlay,.p-treeselect-overlay,.p-cascadeselect-overlay,.p-autocomplete-overlay,.p-datepicker,.p-colorpicker-panel,[data-testid="widget-select-default-overlay"]';
  const NOTIFICATIONS='[data-testid="error-overlay"],.p-toast';
  const POPUPS='[role="dialog"][aria-modal="true"][data-mask],.p-dialog-mask,.p-drawer-mask,.p-confirmdialog,.p-toast,.p-overlaypanel,.p-popover,[data-testid="error-overlay"],.graphdialog,.litegraph.dialog';
  const SURFACES=[WRAPPER,MENUS,SELECTS,POPUPS,'.p-overlaypanel,.p-popover,.p-tooltip,[role="tooltip"]'].join(',');
  const active=new Map();
  let stopped=false,session=0,lastTrigger=null,pending=null;
  const style=document.createElement('style');style.id='comfier-owned-overlay-layers-style';
  style.textContent=`
html body .comfier-owned-overlay-surface{z-index:var(--comfier-overlay-z,650)!important;pointer-events:auto!important}
html body .comfier-owned-overlay-surface:is(.p-tooltip,[role="tooltip"]){pointer-events:none!important}
html body .comfier-scrollable-menu{max-height:var(--comfier-menu-height,calc(100dvh - 8px))!important;overflow:auto!important;overscroll-behavior:contain!important;max-width:calc(100vw - 8px)!important;box-sizing:border-box!important}
html body .comfier-overlay-portaled{position:fixed!important;left:var(--comfier-overlay-left)!important;top:var(--comfier-overlay-top)!important;right:auto!important;bottom:auto!important;transform:none!important;translate:none!important;margin:0!important}
`;
  (document.head||document.documentElement).appendChild(style);
  function visible(el){if(!el?.isConnected)return false;const r=el.getBoundingClientRect(),s=getComputedStyle(el);return r.width>1&&r.height>1&&s.display!=='none'&&s.visibility!=='hidden'&&s.opacity!=='0'}
  function canonical(el){return el?.closest?.(WRAPPER)||el?.closest?.(SURFACES)||null}
  function candidates(){return [...new Set(Array.from(document.querySelectorAll(SURFACES)).map(canonical).filter(Boolean))]}
  function controlled(trigger){return ['aria-controls','aria-owns'].flatMap(key=>(trigger?.getAttribute?.(key)||'').split(/\s+/)).filter(Boolean).map(id=>canonical(document.getElementById(id))).filter(Boolean)}
  function set(el,key,value){if(el.style.getPropertyValue(key)!==value)el.style.setProperty(key,value)}
  function isPanel(el){return el.matches?.('.comfier-extensions-mask,.comfier-early-floating-panel,.comfier-early-floating-bottom,.node-search-box-dialog-mask')||el.querySelector?.('.comfier-extensions-panel,.comfier-native-settings-panel')}
  function tooltip(el){return el.matches?.('.p-tooltip,[role="tooltip"]')}
  function menu(el){return el.matches?.(MENUS)||!!el.querySelector?.('[role="menu"]')}
  function popup(el){return el.matches?.(POPUPS)&&!menu(el)&&!isPanel(el)}
  function rootOwner(trigger){return trigger?.closest?.(OWNER)||active.get(canonical(trigger))?.owner||null}
  function parentSurface(trigger){return canonical(trigger)}
  function layer(el,owner,trigger){
    if(el.matches?.(NOTIFICATIONS))return 700;
    const parent=active.get(parentSurface(trigger)),ownerRank=L?.rank(owner)||0;
    if(tooltip(el))return Math.min(919,Math.max(ownerRank,parent?.rank||0,L?.rank(trigger)||200)+1);
    if(owner?.closest?.('#comfier-diagnostics-root')||owner?.id==='comfier-diagnostics-root')return 912+(parent?1:0);
    if(owner?.closest?.('#comfier-prompt-popup')||owner?.id==='comfier-prompt-popup')return Math.min(849,Math.max(801,parent?.rank+1||0));
    if(trigger?.closest?.('[data-testid="queue-mode-menu-trigger"]')&&!parent)return 220;
    if(popup(el))return 700;
    if(parent)return Math.min(749,Math.max(650,parent.rank+1));
    return menu(el)&&!owner?600:650;
  }
  function blocked(el){for(let p=el.parentElement;p&&p!==document.body;p=p.parentElement){const s=getComputedStyle(p);if((s.zIndex&&s.zIndex!=='auto')||(s.transform&&s.transform!=='none')||s.isolation==='isolate'||Number(s.opacity)<1||/(hidden|clip|auto|scroll)/.test((s.overflow||'')+(s.overflowX||'')+(s.overflowY||'')))return true}return false}
  function portal(el,state){
    // Only the popup moves, never its owner/ancestors. Keep native handlers and
    // node identity. Existing body portals are untouched; hidden inline menus
    // return to their original parent so framework reuse keeps its expected DOM.
    // Vue owns notification parentage; moving conditional children can orphan them.
    if(el.matches?.(NOTIFICATIONS)||el.closest?.(NOTIFICATIONS))return;
    if(el.parentElement===document.body||!blocked(el))return;
    const rect=el.getBoundingClientRect();state.home=el.parentElement;state.next=el.nextSibling;
    set(el,'--comfier-overlay-left',rect.left+'px');set(el,'--comfier-overlay-top',rect.top+'px');
    el.classList.add('comfier-overlay-portaled');document.body.appendChild(el);
  }
  function position(el,state){
    if(!menu(el)&&!el.matches?.(SELECTS))return;
    const r=el.getBoundingClientRect(),tr=state.trigger?.isConnected?state.trigger.getBoundingClientRect():null;
    const nested=!!state.parent&&menu(el),rail=document.querySelector('.comfier-unified-floating-rail');
    let left=r.left,top=r.top,anchored=false;
    if(nested&&tr){left=tr.right+4;top=tr.top;if(left+r.width>innerWidth-4)left=tr.left-r.width-4}
    else if(menu(el)&&state.trigger?.closest?.('.comfier-unified-floating-rail,.comfy-menu-button-wrapper')&&rail){const rr=rail.getBoundingClientRect();left=rr.right+4;top=rr.top;anchored=true}
    else if(state.home&&tr&&!menu(el)){left=tr.left;top=tr.bottom+4}
    left=Math.max(4,Math.min(left,Math.max(4,innerWidth-r.width-4)));
    top=Math.max(4,Math.min(top,innerHeight-44));
    if(nested||state.home||anchored){if(!el.classList.contains('comfier-overlay-portaled'))el.classList.add('comfier-overlay-portaled');set(el,'--comfier-overlay-left',left+'px');set(el,'--comfier-overlay-top',top+'px')}
    if(!el.classList.contains('comfier-scrollable-menu'))el.classList.add('comfier-scrollable-menu');set(el,'--comfier-menu-height',Math.max(40,innerHeight-top-4)+'px');
  }
  function searchResultsOwned(el){
    // Node-search shell owns this inline list's parentage, geometry and scroll.
    // Include a popper wrapper around it, but leave unrelated dropdowns managed.
    const results=el?.matches?.('.p-autocomplete-overlay')?el:el?.querySelector?.('.p-autocomplete-overlay');
    return !!results?.closest?.('.comfy-vue-node-search-box')?.closest?.('.node-search-box-dialog-mask');
  }
  function own(el,owner,trigger){
    if(searchResultsOwned(el))return;
    // These two surfaces have a scoped viewport/touch owner.
    const details='[data-testid="queue-job-details-popover"],[data-comfier-info-tooltip]';
    if(el?.matches?.(details)||el?.querySelector?.(details))return;
    if(!el||isPanel(el))return;
    if(active.has(el)){position(el,active.get(el));return}
    // Do not assign a second independent rank to children of a dialog mask.
    if(el.parentElement?.closest?.('.p-dialog-mask,.p-toast')&&!el.matches?.(SELECTS+','+MENUS+','+WRAPPER))return;
    const state={owner,trigger,parent:parentSurface(trigger),rank:layer(el,owner,trigger),home:null,next:null};
    active.set(el,state);el.classList.add('comfier-owned-overlay-surface');set(el,'--comfier-overlay-z',String(state.rank));
    portal(el,state);position(el,state);
  }
  function release(el){const s=active.get(el);if(!s)return;active.delete(el);
    if(el.isConnected&&s.home?.isConnected)s.home.insertBefore(el,s.next?.parentNode===s.home?s.next:null);
    el.classList.remove('comfier-owned-overlay-surface','comfier-overlay-portaled','comfier-scrollable-menu');
    ['--comfier-overlay-z','--comfier-overlay-left','--comfier-overlay-top','--comfier-menu-height'].forEach(key=>el.style.removeProperty(key));
  }
  function scan(){
    if(stopped)return;
    active.forEach((s,el)=>{if(!visible(el)||(s.owner&&!s.owner.isConnected))release(el)});
    const exact=new Set(controlled(pending?.trigger));
    candidates().filter(visible).forEach(el=>{
      if(active.has(el))return;
      const related=pending&&(exact.has(el)||!pending.baseline.has(el));
      const trigger=related?pending.trigger:tooltip(el)?lastTrigger:null;
      own(el,related?pending.owner:rootOwner(trigger)||el.closest?.(OWNER),trigger);
    });
  }
  function eventTrigger(event){const selector='button,[role="button"],[role="menuitem"],[role="option"],[role="combobox"],[aria-haspopup],.litemenu-entry';return(event.composedPath?.()||[]).find(el=>el?.nodeType===1&&el.matches?.(selector))||event.target?.closest?.(selector)||null}
  function activate(event){const trigger=eventTrigger(event);if(!trigger)return;lastTrigger=trigger;
    const token=++session;pending={trigger,owner:rootOwner(trigger),baseline:new WeakSet(candidates().filter(visible))};
    jobs.burst('mark',()=>{if(token===session)scan()},[0,40,120,300,700]);
    jobs.later('session',()=>{if(token===session)pending=null},900);
  }
  function affected(node){return node?.nodeType===1&&(node.matches?.(SURFACES)||node.querySelector?.(SURFACES))}
  const observer=window.__comfierMutations.create(records=>{if(records.some(record=>affected(record.target)||Array.from(record.addedNodes||[]).some(affected)||Array.from(record.removedNodes||[]).some(affected)))jobs.frame('scan',scan)});observer.observe(document.body,{subtree:true,childList:true,attributes:true,attributeFilter:['class','style','data-state','aria-hidden']});
  document.addEventListener('pointerdown',activate,true);
  jobs.listen(document,'pointerover',activate,true);
  jobs.listen(document,'keydown',event=>{if(event.key==='Enter'||event.key===' '||event.key==='ArrowRight'||event.key==='ArrowDown')activate(event)},true);
  jobs.listen(window,'resize',()=>{scan();active.forEach((s,el)=>position(el,s))},{passive:true});
  jobs.listen(document,'scroll',()=>active.forEach((s,el)=>{if(s.home||s.parent)position(el,s)}),true);
  jobs.frame('scan',scan);
  window.__comfierOwnedOverlayLayers={refresh:scan,remove(){if(stopped)return;stopped=true;jobs.dispose();observer.disconnect();document.removeEventListener('pointerdown',activate,true);Array.from(active.keys()).forEach(release);style.remove();delete window.__comfierOwnedOverlayLayers}};
})();
