(function(){
  'use strict';
  const jobs=window.__comfierRuntime.scope('extensions');
  window.__comfierExtensionsPanel?.remove?.();
  const KEY='global-manager',ID='comfier-extensions-toggle',PANEL='comfier-extensions-panel';
  const SOURCE='.comfier-extensions-source',STYLE='comfier-extensions-panel-style';
  let stopped=false,observer=null,dialogStore=null,rightStore=null,originalShow=null,showWrapper=null;
  let unsubscribe=null,unsubscribeRight=null,button=null,source=null,pending=false,pendingTimer=0,cancelPending=false,lastOpen=false;
  const hiddenSources=new Map(),loraOrigins=new Map();
  const style=document.createElement('style');style.id=STYLE;style.textContent=`
.actionbar-container>.comfier-lora-vacated-slot:empty,.actionbar-container>.comfier-lora-vacated-empty{display:none!important}
${SOURCE}{display:none!important;visibility:hidden!important;pointer-events:none!important}
#${ID}{display:inline-flex!important;align-items:center!important;justify-content:center!important;flex:0 0 32px!important;width:32px!important;min-width:32px!important;max-width:32px!important;height:32px!important;min-height:32px!important;max-height:32px!important;padding:7px 0!important;margin:0!important;zoom:1!important;transform:none!important;touch-action:manipulation!important}
#${ID}::before{content:""!important;position:absolute!important;inset:-8px!important}\n#${ID} i{width:19px!important;height:19px!important;font-size:19px!important;color:var(--comfier-icon-color,var(--comfier-accent,#fff))!important}
#${ID}[aria-pressed="true"]{box-shadow:inset 0 0 0 1px var(--comfier-active-color,var(--comfier-accent,#fff))!important}
.comfier-extensions-mask{pointer-events:none!important;background:transparent!important;backdrop-filter:none!important;z-index:var(--cef-extensions-z,var(--comfier-z-side,500))!important}
.${PANEL}{position:fixed!important;left:var(--cef-right)!important;right:auto!important;top:var(--cef-right-top,var(--cef-top))!important;bottom:auto!important;width:var(--cef-width)!important;min-width:0!important;max-width:var(--cef-width)!important;height:var(--cef-right-height,var(--cef-height))!important;min-height:0!important;max-height:var(--cef-right-height,var(--cef-height))!important;margin:0!important;transform:none!important;translate:none!important;zoom:1!important;box-sizing:border-box!important;overflow:hidden!important;pointer-events:auto!important;z-index:var(--cef-extensions-z,var(--comfier-z-side,500))!important}
.${PANEL}>.p-dialog-header{display:none!important}
.${PANEL}>.p-dialog-content{display:flex!important;flex:1 1 0!important;width:100%!important;height:100%!important;min-width:0!important;min-height:0!important;max-height:100%!important;padding:0!important;overflow:auto!important;overscroll-behavior:contain!important}
.${PANEL} .manager-dialog{width:100%!important;height:100%!important;min-width:0!important;min-height:0!important;max-width:100%!important;max-height:100%!important;border-radius:0!important;overflow:auto!important;overscroll-behavior:contain!important}
`;
  (document.head||document.documentElement).appendChild(style);

  const pinia=window.__comfierUi.pinia;
  function entry(){return dialogStore?.dialogStack?.find(item=>item.key===KEY&&item.visible!==false)||null}
  function isOpen(){return!!entry()}
  function surface(){return document.querySelector('.'+PANEL)}
  function layout(){window.__comfierEarlyFloatingPanels?.refresh?.()}
  function clearPending(){pending=false;clearTimeout(pendingTimer);pendingTimer=0}
  function callHooks(hooks,...args){for(const hook of [hooks].flat())if(typeof hook==='function')hook(...args)}
  function panelProps(original={}){
    let instance=null;
    return {...original,
      // The native ManagerDialog and its callbacks remain Vue-owned. Only its
      // outer shell becomes nonmodal before mount, so no focus trap is installed.
      // Shared native panel hosts are rank-neutral; custom panels use the document host.
      renderer:'primevue',modal:false,blockScroll:false,dismissableMask:false,
      draggable:false,maximizable:false,maximized:false,showHeader:false,closable:true,
      autoZIndex:false,appendTo:document.body,class:[original.class,PANEL,'comfier-early-floating-panel','comfier-early-floating-right'],
      pt:{...original.pt,mask:{class:'comfier-extensions-mask'}},
      onVnodeBeforeMount(vnode){
        callHooks(original.onVnodeBeforeMount,vnode);
        instance=vnode.component?.proxy;
        // PrimeVue calls focus() unconditionally after its enter transition.
        // Suppress that shell method on this instance only; user input focus
        // and all nested native controls retain their normal behavior.
        if(instance&&typeof instance.focus==='function')instance.focus=()=>{};
      },
      onHide(...args){if(instance)instance.target=null;callHooks(original.onHide,...args);schedule()}
    };
  }
  function attachStores(){
    const stores=pinia()?._s,next=stores?.get('dialog');
    if(!next||typeof next.showDialog!=='function'||typeof next.closeDialog!=='function'){detachStores();return false;}
    if(next!==dialogStore){
      detachStores();dialogStore=next;originalShow=next.showDialog;
      showWrapper=function(options,...args){
        if(stopped||options?.key!==KEY)return originalShow.call(this,options,...args);
        if(cancelPending){cancelPending=false;clearPending();schedule();return undefined}
        const existing=entry(),props=panelProps(options.dialogComponentProps);
        if(existing)existing.dialogComponentProps=props;
        const result=originalShow.call(this,{...options,dialogComponentProps:props},...args);
        clearPending();
        window.__comfierLoraPanel?.closeIfOpen?.();window.__comfierLtxPanel?.closeIfOpen?.();
        if(rightStore?.isOpen)rightStore.closePanel();
        window.__comfierEarlyFloatingPanels?.activateRight?.();layout();schedule();return result;
      };
      next.showDialog=showWrapper;
      unsubscribe=next.$subscribe?.(()=>schedule(),{detached:true,flush:'sync'});
    }
    const right=stores.get('rightSidePanel');
    if(right!==rightStore){unsubscribeRight?.();rightStore=right||null;unsubscribeRight=right?.$subscribe?.(()=>{if(right.isOpen&&(isOpen()||pending))closeIfOpen();schedule()},{detached:true,flush:'sync'})}
    return true;
  }
  function detachStores(){
    unsubscribe?.();unsubscribeRight?.();unsubscribe=null;unsubscribeRight=null;
    if(dialogStore?.showDialog===showWrapper)dialogStore.showDialog=originalShow;
    dialogStore=null;rightStore=null;
  }
  const EXCLUDED='.side-bar-panel,.comfier-early-floating-panel,[data-testid="properties-panel"],[role="dialog"],.side-tool-bar-container,.comfier-unified-floating-rail';
  function controlLabel(el){return((el.getAttribute('aria-label')||'')+' '+(el.getAttribute('title')||'')).trim().toLowerCase()}
  function nativeButton(){
    if(source?.isConnected&&source.id!==ID&&!source.closest(EXCLUDED))return source;
    return Array.from(document.querySelectorAll('button')).find(el=>el.id!==ID&&!el.closest(EXCLUDED)&&
      (/^(manage extensions|extensions|manager)(\s|$)/.test(controlLabel(el))||!!el.querySelector('i[class*="extensions-block"],svg[class*="extensions-block"]')))||null;
  }
  function overviewButton(){
    const candidates=Array.from(document.querySelectorAll('button')).filter(el=>el.id!==ID&&!!el.closest('[data-testid="action-bar-card"],.actionbar-container')&&!el.closest(EXCLUDED));
    return candidates.find(el=>/toggle properties|workflow overview|toggle.*overview/.test(controlLabel(el)))||
      candidates.find(el=>!!el.querySelector('i[class*="panel-right"],i[class*="panel-left"],svg[class*="panel-right"],svg[class*="panel-left"]'))||null;
  }
  function hideSource(el){
    if(!hiddenSources.has(el))hiddenSources.set(el,['display','visibility','pointer-events'].map(name=>[name,el.style.getPropertyValue(name),el.style.getPropertyPriority(name)]));
    el.classList.add(SOURCE.slice(1));
    for(const [name,value] of [['display','none'],['visibility','hidden'],['pointer-events','none']]){
      if(el.style.getPropertyValue(name)!==value||el.style.getPropertyPriority(name)!=='important')el.style.setProperty(name,value,'important');
    }
  }
  function restoreSources(){
    hiddenSources.forEach((saved,el)=>{el.classList.remove(SOURCE.slice(1));saved.forEach(([name,value,priority])=>{if(value)el.style.setProperty(name,value,priority);else el.style.removeProperty(name)})});hiddenSources.clear();
  }
  function legacyCard(control,bar){
    let card=control;
    for(let parent=control.parentElement,depth=0;parent&&parent!==document.body&&depth<4;parent=parent.parentElement,depth++){
      if(parent===bar||parent.contains(bar)||parent.matches('[data-testid="top-menu-actionbars"],[data-testid="action-bar-card"],.actionbar-container'))break;
      if(Array.from(parent.querySelectorAll('button,input,select,textarea,[role="button"]')).some(el=>el!==control))break;
      card=parent;
    }
    return card;
  }
  function closeIfOpen(){
    const opened=isOpen();if(!opened&&!pending)return false;
    if(pending)cancelPending=true;clearPending();
    if(opened)dialogStore.closeDialog({key:KEY});
    schedule();layout();return true;
  }
  function toggle(){
    if(closeIfOpen())return;
    if(!attachStores())return;
    const trigger=nativeButton();if(!trigger)return;
    cancelPending=false;pending=true;
    // The original Vue click handler owns loading, availability and errors.
    trigger.click();
    if(pending)pendingTimer=setTimeout(()=>{clearPending();schedule()},10000);
    schedule();
  }
  function refreshLoraSlots(){
    loraOrigins.forEach(origin=>origin.slots.forEach(slot=>{
      slot.classList.add('comfier-lora-vacated-slot');
      slot.classList.toggle('comfier-lora-vacated-empty',!slot.children.length&&!slot.textContent.trim());
    }));
  }
  function positionLoraButton(bar){
    refreshLoraSlots();
    const lora=document.querySelector('button.lm-top-menu-button,button[aria-label^="Launch LoRA Manager"]');
    if(!lora||!button?.isConnected)return;
    const anchor=document.getElementById('comfier-downloads-action-slot')||button;
    if(lora.parentElement===bar&&lora.nextElementSibling===anchor)return;
    const parent=lora.parentElement;
    if(!loraOrigins.has(lora))loraOrigins.set(lora,{parent,next:lora.nextSibling,slots:new Set()});
    const origin=loraOrigins.get(lora);
    // A native rerender can wrap the same control again. Track the current
    // direct actionbar slot, not only the wrapper from the first relocation.
    if(parent!==bar&&parent?.parentElement===bar){
      origin.parent=parent;origin.next=lora.nextSibling;origin.slots.add(parent);
    }
    bar.insertBefore(lora,anchor);
    refreshLoraSlots();
  }
  function restoreLoraButtons(){
    loraOrigins.forEach((origin,lora)=>{
      origin.slots.forEach(slot=>slot.classList.remove('comfier-lora-vacated-slot','comfier-lora-vacated-empty'));
      if(!lora.isConnected||!origin.parent?.isConnected)return;
      origin.parent.insertBefore(lora,origin.next?.parentElement===origin.parent?origin.next:null);
    });loraOrigins.clear();
  }
  function syncButton(){
    const target=overviewButton(),nextSource=nativeButton();
    const bar=target?.closest('.actionbar-container')||(button?.parentElement?.isConnected?button.parentElement:null)||document.querySelector('[data-testid="action-bar-card"] .actionbar-container');
    if(!bar||!nextSource){restoreLoraButtons();button?.remove();restoreSources();return}
    if(!button){
      button=document.createElement('button');button.id=ID;button.type='button';
      button.className=target?.className||nextSource.className;button.setAttribute('aria-label','Manage extensions');button.title='Manage extensions';
      button.addEventListener('click',event=>{event.preventDefault();event.stopPropagation();toggle()});
    }
    if(source!==nextSource){
      source=nextSource;button.replaceChildren();
      const icon=source.querySelector('i,svg');
      if(icon)button.appendChild(icon.cloneNode(true));else{const icon=document.createElement('i');icon.className='icon-[comfy--extensions-blocks]';button.appendChild(icon)}
    }
    // Insert next to the overview's top-level actionbar slot, not inside its
    // conditional wrapper: Vue removes that wrapper while Overview is open.
    let slot=target;while(slot&&slot.parentElement!==bar)slot=slot.parentElement;
    if(slot){if(button.parentElement!==bar||button.nextElementSibling!==slot)bar.insertBefore(button,slot)}
    else if(button.parentElement!==bar)bar.appendChild(button);
    // Inline !important is required: the legacy sizer already set display:flex
    // inline. Its guard now skips this owned source, preventing it from returning.
    hideSource(legacyCard(source,bar));
    positionLoraButton(bar);
    button.style.setProperty('position','relative','important');
    button.style.setProperty('z-index','auto','important');
    const pressed=String(isOpen());if(button.getAttribute('aria-pressed')!==pressed){button.setAttribute('aria-pressed',pressed);button.setAttribute('aria-expanded',pressed)}
    button.disabled=!!source.disabled;
  }
  function clickCapture(event){
    const target=event.target?.closest?.('button');
    if(target&&target===overviewButton())closeIfOpen();
  }
  function reconcile(){
    if(stopped)return;
    if(attachStores())syncButton();
    const opened=isOpen();if(opened!==lastOpen){lastOpen=opened;layout()}
  }
  function schedule(){if(!stopped)jobs.frame('layout',reconcile)}
  observer=window.__comfierMutations.create(schedule);observer.observe(document.body,{childList:true,subtree:true});
  document.addEventListener('click',clickCapture,true);
  jobs.burst('startup',schedule,[0,80,250,700,1500,3000]);
  window.__comfierExtensionsPanel={isOpen,surface,closeIfOpen,refresh:schedule,
    setStack(value){const root=document.documentElement.style;if(value===null){if(root.getPropertyValue('--cef-extensions-z'))root.removeProperty('--cef-extensions-z');return}if(root.getPropertyValue('--cef-extensions-z')!==String(value))root.setProperty('--cef-extensions-z',String(value))},
    remove(){if(stopped)return;
      closeIfOpen();stopped=true;jobs.dispose();clearTimeout(pendingTimer);
      observer.disconnect();document.removeEventListener('click',clickCapture,true);detachStores();restoreLoraButtons();button?.remove();
      restoreSources();document.documentElement.style.removeProperty('--cef-extensions-z');style.remove();delete window.__comfierExtensionsPanel;
    }
  };
  schedule();
})();
