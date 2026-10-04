(function(){
  'use strict';
  window.__comfierOwnedOverlayLayers?.remove?.();
  const jobs=window.__comfierRuntime.scope('owned-overlays');
  const L=window.__comfierLayers;
  const OWNER='[data-comfier-side-panel],[data-comfier-native-host],#comfier-apps-panel,#comfier-owned-feed-panel,.comfier-early-floating-panel,.comfier-early-floating-bottom,[data-testid="queue-progress-overlay"],#comfier-ui-zoom-test,#comfier-prompt-popup';
  const HELP='.help-center-popup.small-sidebar';
  const WRAPPER='[data-reka-popper-content-wrapper],[data-radix-popper-content-wrapper]';
  const MENUS='.p-menu,.p-tieredmenu,.p-contextmenu,.p-tieredmenu-submenu,.p-contextmenu-submenu,.litecontextmenu,.lm-lora-context-menu';
  const SELECTS='.p-select-overlay,.p-dropdown-panel,.p-multiselect-overlay,.p-treeselect-overlay,.p-cascadeselect-overlay,.p-autocomplete-overlay,.p-datepicker,.p-colorpicker-panel,[data-testid="widget-select-default-overlay"]';
  const NOTIFICATIONS='[data-testid="error-overlay"],.p-toast';
  const POPUPS='[role="dialog"][aria-modal="true"][data-mask],.p-dialog-mask,.p-drawer-mask,.p-confirmdialog,.p-toast,.p-overlaypanel,.p-popover,[data-testid="error-overlay"],.graphdialog,.litegraph.dialog';
  const SURFACES=[HELP,WRAPPER,MENUS,SELECTS,POPUPS,'.p-overlaypanel,.p-popover,.p-tooltip,[role="tooltip"]'].join(',');
  const active=new Map(),dismissed=new WeakSet();
  let stopped=false,scanning=false,session=0,lastTrigger=null,pending=null,visibleSurfaces=new WeakSet();
  const style=document.createElement('style');style.id='comfier-owned-overlay-layers-style';
  style.textContent=`
html body .comfier-owned-overlay-surface{z-index:var(--comfier-overlay-z,650)!important;pointer-events:auto!important}
html body .comfier-owned-overlay-surface:is(.p-tooltip,[role="tooltip"]){pointer-events:none!important}
html body .comfier-scrollable-menu{max-height:var(--comfier-menu-height,calc(100dvh - 8px))!important;overflow:auto!important;overscroll-behavior:contain!important;max-width:var(--comfier-menu-width,calc(100vw - 8px))!important;box-sizing:border-box!important}
html body .comfier-overlay-portaled{position:fixed!important;left:var(--comfier-overlay-left)!important;top:var(--comfier-overlay-top)!important;right:auto!important;bottom:auto!important;transform:none!important;translate:none!important;margin:0!important}
html body .comfier-rail-menu{animation:none!important;transition:none!important}
`;
  (document.head||document.documentElement).appendChild(style);
  function visible(el){if(!el?.isConnected)return false;const r=el.getBoundingClientRect(),s=getComputedStyle(el);return r.width>1&&r.height>1&&s.display!=='none'&&s.visibility!=='hidden'&&(s.opacity!=='0'||menu(el))}
  function canonical(el){return el?.closest?.(WRAPPER)||el?.closest?.(SURFACES)||null}
  function candidates(){return [...new Set(Array.from(document.querySelectorAll(SURFACES)).map(canonical).filter(Boolean))]}
  function controlled(trigger){return ['aria-controls','aria-owns'].flatMap(key=>(trigger?.getAttribute?.(key)||'').split(/\s+/)).filter(Boolean).map(id=>canonical(document.getElementById(id))).filter(Boolean)}
  function set(el,key,value){const authority=window.__comfierUiAuthority;if(authority)return authority.write(el,key,value,'owned-overlays',key==='max-width'?'important':'');if(el.style.getPropertyValue(key)!==value)el.style.setProperty(key,value)}
  function isPanel(el){return el.matches?.('[data-comfier-side-panel],[data-comfier-panel-wrapper],.comfier-extensions-mask,.comfier-early-floating-panel,.comfier-early-floating-bottom,.node-search-box-dialog-mask')||el.querySelector?.('.comfier-extensions-panel,.comfier-native-settings-panel')}
  function tooltip(el){return el.matches?.('.p-tooltip,[role="tooltip"]')}
  function workflowMenu(el){const text=(el?.textContent||'').replace(/\s+/g,' ').trim().toLowerCase();return el?.matches?.(WRAPPER)&&['duplicate','save as','export','clear workflow','delete workflow'].every(word=>text.includes(word))}
  function help(el){return el.matches?.(HELP)||!!el.querySelector?.(HELP)}
  function menu(el){return el.matches?.(MENUS)||!!el.querySelector?.('[role="menu"]')||workflowMenu(el)||help(el)}
  function sidebar(){const rail=document.querySelector('.comfier-unified-floating-rail');if(visible(rail))return rail;return Array.from(document.querySelectorAll('nav.side-tool-bar-container')).filter(visible).sort((a,b)=>b.querySelectorAll('.side-bar-button').length-a.querySelectorAll('.side-bar-button').length||a.getBoundingClientRect().left-b.getBoundingClientRect().left)[0]||null}
  function popup(el){return el.matches?.(POPUPS)&&!menu(el)&&!isPanel(el)}
  function rootOwner(trigger){return trigger?.closest?.(OWNER)||active.get(canonical(trigger))?.owner||null}
  function parentSurface(trigger){return canonical(trigger)}
  function layer(el,owner,trigger){
    if(el.matches?.(NOTIFICATIONS))return 700;
    const parent=active.get(parentSurface(trigger)),ownerRank=L?.rank(owner)||0;
    if(tooltip(el))return Math.min(919,Math.max(ownerRank,parent?.rank||0,L?.rank(trigger)||200)+1);
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
  function nodeOwner(owner){return owner?.matches?.('[data-comfier-native-host="node-library"],[data-comfier-native-host="nodes"]')?owner:null}
  function nodePopup(el,state){return !!nodeOwner(state?.owner)&&!state.parent&&!tooltip(el)&&el.matches?.(MENUS+','+SELECTS+',.p-popover,.p-overlaypanel,'+WRAPPER)}
  function closeNodePeers(trigger,owner){
    if(!nodeOwner(owner))return;
    for(const[el,state]of [...active]){
      if(state.owner!==owner||state.trigger===trigger||!nodePopup(el,state)||!visible(el)||el.contains(trigger))continue;
      // Restore inline DOM before asking Vue to hide it; never leave an orphan portal.
      if(!state.trigger?.isConnected)continue;
      dismissed.add(el);release(el);state.trigger.click();
    }
  }
  function position(el,state){
    const inNodes=nodePopup(el,state);
    if(!menu(el)&&!el.matches?.(SELECTS)&&!inNodes)return;
    const r=el.getBoundingClientRect(),tr=state.trigger?.isConnected?state.trigger.getBoundingClientRect():null;
    const nested=!!state.parent&&menu(el),rail=sidebar();
    let left=r.left,top=r.top,anchored=false;
    if(nested&&tr){left=tr.right+4;top=tr.top;if(left+r.width>innerWidth-4)left=tr.left-r.width-4}
    else if(rail&&(workflowMenu(el)||help(el)||el.querySelector?.('ul.p-tieredmenu-root-list')||menu(el)&&state.trigger?.closest?.('.comfier-unified-floating-rail,nav.side-tool-bar-container,.comfy-menu-button-wrapper'))){const rr=rail.getBoundingClientRect();left=window.__comfierLayoutSide?.side()==='right'?rr.left-r.width-4:rr.right+4;top=rr.top;anchored=true}
    else if(state.home&&tr&&!menu(el)){left=tr.left;top=tr.bottom+4}
    const ownerRect=inNodes?state.owner.getBoundingClientRect():null;
    const area=ownerRect?{left:Math.max(4,ownerRect.left+4),right:Math.min(innerWidth-4,ownerRect.right-4),top:Math.max(4,ownerRect.top+4),bottom:Math.min(innerHeight-4,ownerRect.bottom-4)}:{left:4,right:innerWidth-4,top:4,bottom:innerHeight-4};
    if(inNodes&&tr){left=tr.right-r.width;top=tr.bottom+4}
    left=Math.max(area.left,Math.min(left,Math.max(area.left,area.right-r.width)));
    top=Math.max(area.top,Math.min(top,Math.max(area.top,area.bottom-40)));
    if(anchored&&!el.classList.contains('comfier-rail-menu'))el.classList.add('comfier-rail-menu');
    if(inNodes||nested||state.home||anchored||Math.abs(left-r.left)>.25||Math.abs(top-r.top)>.25){if(!el.classList.contains('comfier-overlay-portaled'))el.classList.add('comfier-overlay-portaled');set(el,'--comfier-overlay-left',left+'px');set(el,'--comfier-overlay-top',top+'px')}
    set(el,'--comfier-menu-width',Math.max(0,area.right-left)+'px');
    if(!el.classList.contains('comfier-scrollable-menu'))el.classList.add('comfier-scrollable-menu');set(el,'--comfier-menu-height',Math.max(0,area.bottom-top)+'px');
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
    active.set(el,state);window.__comfierUiAuthority?.registerTransient(el,'owned-overlays');el.classList.add('comfier-owned-overlay-surface');set(el,'--comfier-overlay-z',String(state.rank));
    portal(el,state);position(el,state);
  }
  function release(el){const s=active.get(el);if(!s)return;active.delete(el);
    if(el.isConnected&&s.home?.isConnected)s.home.insertBefore(el,s.next?.parentNode===s.home?s.next:null);
    el.classList.remove('comfier-owned-overlay-surface','comfier-overlay-portaled','comfier-scrollable-menu','comfier-rail-menu');
    ['--comfier-overlay-z','--comfier-overlay-left','--comfier-overlay-top','--comfier-menu-height','--comfier-menu-width'].forEach(key=>el.style.removeProperty(key));window.__comfierUiAuthority?.unregisterTransient(el,'owned-overlays');
  }
  function scan(){
    if(stopped||scanning)return;
    scanning=true;
    try{
    if(pending&&performance.now()>pending.expires)pending=null;
    active.forEach((s,el)=>{if(nodePopup(el,s)&&visible(el)&&!visible(s.owner)&&s.trigger?.isConnected){dismissed.add(el);release(el);s.trigger.click();return}if(!visible(el)||(s.owner&&!s.owner.isConnected))release(el)});
    for(const el of candidates())if(!visible(el))dismissed.delete(el);
    const exact=new Set(controlled(pending?.trigger));
    const shown=candidates().filter(visible);
    shown.forEach(el=>{
      if(dismissed.has(el))return;
      if(active.has(el)){position(el,active.get(el));return}
      const related=pending&&(exact.has(el)||!pending.baseline.has(el));
      const trigger=related?pending.trigger:tooltip(el)?lastTrigger:null;
      own(el,related?pending.owner:rootOwner(trigger)||el.closest?.(OWNER),trigger);
    });
    visibleSurfaces=new WeakSet(shown);
    }finally{scanning=false}
  }
  function eventTrigger(event){const selector='button,[role="button"],[role="menuitem"],[role="option"],[role="combobox"],[aria-haspopup],.litemenu-entry';return(event.composedPath?.()||[]).find(el=>el?.nodeType===1&&el.matches?.(selector))||event.target?.closest?.(selector)||null}
  function activationKind(event,trigger){
    if(event.type==='pointerover')return event.pointerType==='touch'?null:trigger.matches('[data-p-tooltip],[data-tooltip],[title],[aria-describedby],[aria-haspopup="menu"],.litemenu-entry')?'hover':null;
    return trigger.hasAttribute('aria-haspopup')&&trigger.getAttribute('aria-haspopup')!=='false'||trigger.matches('[aria-controls],[role="combobox"],.litemenu-entry,.lm-top-menu-button,.comfy-help-center-btn,[data-testid="help-center-button"],[data-comfier-popup-launcher]')?'launcher':'fallback';
  }
  function activate(event){const trigger=eventTrigger(event);if(!trigger)return;const kind=activationKind(event,trigger);if(!kind)return;lastTrigger=trigger;
    const owner=rootOwner(trigger);
    if(event.type==='pointerdown'||event.type==='keydown')closeNodePeers(trigger,owner);
    for(const el of controlled(trigger))dismissed.delete(el);
    // Unknown extension buttons retain ownership through actual DOM changes,
    // without starting a speculative scan burst for every ordinary control.
    const token=++session;pending={trigger,owner,baseline:kind==='fallback'?visibleSurfaces:new WeakSet(candidates().filter(visible)),expires:performance.now()+900};
    if(kind==='fallback')return;
    jobs.burst('mark',()=>{if(token===session)scan()},[0,40,120,300,700]);
    jobs.later('session',()=>{if(token===session)pending=null},900);
  }
  function affected(node){return node?.nodeType===1&&(node.matches?.(SURFACES)||node.querySelector?.(SURFACES))}
  const observer=window.__comfierMutations.create(records=>{if(records.some(record=>affected(record.target)||Array.from(record.addedNodes||[]).some(affected)||Array.from(record.removedNodes||[]).some(affected)))scan()});observer.observe(document.body,{subtree:true,childList:true,attributes:true,attributeFilter:['class','style','data-state','aria-hidden']});
  document.addEventListener('pointerdown',activate,true);
  jobs.listen(document,'pointerover',activate,true);
  jobs.listen(document,'keydown',event=>{if(event.key==='Enter'||event.key===' '||event.key==='ArrowRight'||event.key==='ArrowDown')activate(event)},true);
  jobs.listen(window,'resize',()=>{scan();active.forEach((s,el)=>position(el,s))},{passive:true});
  jobs.listen(document,'scroll',()=>active.forEach((s,el)=>{if(s.home||s.parent)position(el,s)}),true);
  jobs.frame('scan',scan);
  window.__comfierOwnedOverlayLayers={owns(el){return active.has(canonical(el))},refresh:scan,remove(){if(stopped)return;stopped=true;jobs.dispose();observer.disconnect();document.removeEventListener('pointerdown',activate,true);Array.from(active.keys()).forEach(release);style.remove();delete window.__comfierOwnedOverlayLayers}};
})();
