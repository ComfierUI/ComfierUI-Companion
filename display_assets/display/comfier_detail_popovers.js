(function(){
  'use strict';
  window.__comfierDetailPopovers?.remove?.();
  const jobs=window.__comfierRuntime.scope('detail-popovers');
  const JOB='[data-testid="queue-job-details-popover"]';
  const WRAPPER='[data-reka-popper-content-wrapper],[data-radix-popper-content-wrapper]';
  const SETTINGS='[data-testid="settings-dialog"],.comfier-native-settings-panel';
  const ICON='.pi-info-circle';
  const cards=new Map(),icons=new Map();
  let stopped=false,active=null,tap=null,lastTouch=0,forwarding=false,lifecycle=null;
  const style=document.createElement('style');style.id='comfier-detail-popovers-style';
  style.textContent=`
html body .comfier-job-details-fixed{position:fixed!important;left:var(--comfier-detail-left)!important;top:var(--comfier-detail-top)!important;right:auto!important;bottom:auto!important;transform:none!important;translate:none!important;margin:0!important;zoom:var(--comfier-detail-zoom,1)!important;width:var(--comfier-detail-width)!important;min-width:0!important;max-width:var(--comfier-detail-width)!important;max-height:var(--comfier-detail-height)!important;z-index:710!important;box-sizing:border-box!important;}
html body [data-testid="queue-job-details-popover"]{width:100%!important;min-width:0!important;max-width:100%!important;max-height:var(--comfier-detail-height)!important;overflow:auto!important;overscroll-behavior:contain!important;box-sizing:border-box!important;animation:none!important;}
html body .comfier-job-details-fixed>[data-testid="queue-job-details-popover"]{zoom:1!important}
html body [data-testid="queue-job-details-popover"]>div{width:100%!important;min-width:0!important;max-width:100%!important;box-sizing:border-box!important}
html body #comfier-info-tooltip{position:fixed;box-sizing:border-box;margin:0;padding:10px 12px;border:1px solid var(--interface-stroke,#555);border-radius:8px;background:var(--comfy-menu-bg,#242427);color:var(--input-text,#fff);font:400 13px/1.4 sans-serif;white-space:pre-wrap;overflow-wrap:anywhere;overflow:auto;overscroll-behavior:contain;touch-action:pan-y;box-shadow:0 4px 16px #0006;z-index:710;pointer-events:auto}
html body :is([data-testid="settings-dialog"],.comfier-native-settings-panel) .pi-info-circle[data-comfier-info-trigger]{position:relative;padding:4px;margin:-4px;cursor:pointer;touch-action:manipulation}
`;
  document.head.appendChild(style);
  const tip=document.createElement('div');tip.id='comfier-info-tooltip';tip.setAttribute('role','tooltip');tip.setAttribute('data-comfier-info-tooltip','');tip.hidden=true;document.body.appendChild(tip);
  function set(el,key,value){if(el.style.getPropertyValue(key)!==value)el.style.setProperty(key,value,'important');}
  function viewport(){const v=window.visualViewport;return {left:v?.offsetLeft||0,top:v?.offsetTop||0,width:v?.width||innerWidth,height:v?.height||innerHeight};}
  function zoom(){return window.__comfierViewport?.scale()||Math.max(.3,Math.min(2,parseFloat(window.__comfierUiZoomValue)||1));}
  function bounds(){const v=viewport();return {left:v.left+8,top:v.top+8,right:v.left+v.width-8,bottom:v.top+v.height-8};}
  function visible(el){if(!el?.isConnected)return false;const s=getComputedStyle(el),r=el.getBoundingClientRect();return s.display!=='none'&&s.visibility!=='hidden'&&r.width>0&&r.height>0;}
  function placeCard(card){
    const shell=card.closest(WRAPPER)||card;
    if(!cards.has(card)){cards.set(card,shell);shell.classList.add('comfier-job-details-fixed');}
    const b=bounds(),z=zoom(),w=Math.max(1,Math.min(300,(b.right-b.left)/z)),h=Math.max(1,(b.bottom-b.top)/z);
    set(shell,'--comfier-detail-zoom',String(z));set(shell,'--comfier-detail-width',w+'px');set(shell,'--comfier-detail-height',h+'px');
    // Fixed, viewport-centered placement is independent of the hovered job row.
    set(shell,'--comfier-detail-left',((b.left+b.right-w*z)/2/z)+'px');
    const actualHeight=Math.min(card.getBoundingClientRect().height,h*z);
    set(shell,'--comfier-detail-top',((b.top+b.bottom-actualHeight)/2/z)+'px');
  }
  function releaseCard(card,shell){cards.delete(card);shell.classList.remove('comfier-job-details-fixed');for(const name of ['left','top','zoom','width','height'])shell.style.removeProperty('--comfier-detail-'+name);}
  function iconFrom(target){const icon=target?.closest?.(ICON);return icon?.closest?.(SETTINGS)?icon:null;}
  function content(icon){
    if(icon.$_ptooltipDisabled)return '';
    // Read PrimeVue's already-translated directive value, not setting labels or HTML.
    if(typeof icon.$_ptooltipValue==='string')return icon.$_ptooltipValue.trim();
    const id=icon.getAttribute('aria-describedby'),native=id&&document.getElementById(id);
    return native?.getAttribute('role')==='tooltip'?(native.textContent||'').trim():'';
  }
  function restoreAttribute(el,name,value){if(value===null)el.removeAttribute(name);else el.setAttribute(name,value);}
  function markIcon(icon){if(icons.has(icon)||!content(icon))return;icons.set(icon,{role:icon.getAttribute('role'),tabindex:icon.getAttribute('tabindex'),label:icon.getAttribute('aria-label')});icon.setAttribute('data-comfier-info-trigger','');icon.setAttribute('role','button');icon.setAttribute('tabindex','0');if(!icon.getAttribute('aria-label'))icon.setAttribute('aria-label','Setting information');}
  function hideNative(icon){if(icon.__comfierInfoOwned)return;forwarding=true;try{icon.dispatchEvent(new MouseEvent('mouseleave',{bubbles:false}));}finally{forwarding=false;}}
  function releaseIcon(icon){if(active?.icon===icon)closeTip();const saved=icons.get(icon);if(saved){restoreAttribute(icon,'role',saved.role);restoreAttribute(icon,'tabindex',saved.tabindex);restoreAttribute(icon,'aria-label',saved.label);icon.removeAttribute('data-comfier-info-trigger');icons.delete(icon)}}
  function bindInfo(icon,binding){const value=binding.value;icon.__comfierInfoOwned=true;icon.$_ptooltipValue=typeof value==='string'?value:typeof value?.value==='string'?value.value:'';icon.$_ptooltipDisabled=value?.disabled===true;if(!content(icon)){releaseIcon(icon);return}markIcon(icon);if(active?.icon===icon){tip.textContent=content(icon);positionTip()}}
  const infoDirective={beforeMount:bindInfo,updated:bindInfo,beforeUnmount(icon){releaseIcon(icon);delete icon.__comfierInfoOwned;delete icon.$_ptooltipValue;delete icon.$_ptooltipDisabled}};
  function positionTip(){
    if(!active)return;
    if(!visible(active.icon)){closeTip();return;}
    const b=bounds(),z=zoom(),r=active.icon.getBoundingClientRect();
    const w=Math.max(1,Math.min(360,(b.right-b.left)/z));
    set(tip,'zoom',String(z));set(tip,'width',w+'px');set(tip,'max-height',Math.max(1,(b.bottom-b.top)/z)+'px');
    const h=Math.min(tip.getBoundingClientRect().height,b.bottom-b.top);
    const left=Math.max(b.left,Math.min((r.left+r.right-w*z)/2,b.right-w*z));
    let top=r.bottom+8;if(top+h>b.bottom)top=r.top-h-8;
    top=Math.max(b.top,Math.min(top,b.bottom-h));
    set(tip,'left',left/z+'px');set(tip,'top',top/z+'px');
  }
  function closeTip(){if(!active)return false;const old=active;active=null;restoreAttribute(old.icon,'aria-describedby',old.described);tip.hidden=true;tip.textContent='';return true;}
  function showTip(icon,pinned){const text=content(icon);if(!text)return false;markIcon(icon);if(active?.icon!==icon){closeTip();active={icon,pinned,described:icon.getAttribute('aria-describedby')};}else active.pinned=pinned||active.pinned;
    hideNative(icon);tip.textContent=text;tip.hidden=false;icon.setAttribute('aria-describedby',tip.id);positionTip();return true;
  }
  function toggle(icon){if(active?.icon===icon&&active.pinned)return closeTip();return showTip(icon,true);}
  function scan(){if(stopped)return;cards.forEach((shell,card)=>{if(!card.isConnected||card.getAttribute('data-state')==='closed')releaseCard(card,shell);});
    document.querySelectorAll(JOB).forEach(card=>{if(card.getAttribute('data-state')!=='closed'&&visible(card))placeCard(card);});
    document.querySelectorAll(SETTINGS).forEach(root=>root.querySelectorAll(ICON).forEach(markIcon));
    icons.forEach((saved,icon)=>{if(!icon.isConnected)icons.delete(icon);});if(active)positionTip();
  }
  function schedule(){jobs.frame('place',scan);}
  jobs.listen(document,'mouseenter',event=>{if(forwarding)return;const icon=iconFrom(event.target);if(!icon||!content(icon))return;event.stopImmediatePropagation();if(Date.now()-lastTouch>800)showTip(icon,false);},true);
  jobs.listen(document,'mouseleave',event=>{if(forwarding)return;const icon=iconFrom(event.target);if(!icon||!content(icon))return;event.stopImmediatePropagation();if(active?.icon===icon&&!active.pinned&&!tip.contains(event.relatedTarget))closeTip();},true);
  jobs.listen(tip,'mouseleave',()=>{if(active&&!active.pinned)closeTip();});
  jobs.listen(document,'focusin',event=>{const icon=iconFrom(event.target);if(icon)showTip(icon,false);},true);
  jobs.listen(document,'focusout',event=>{if(active?.icon===event.target&&!active.pinned)closeTip();},true);
  jobs.listen(document,'pointerdown',event=>{const icon=iconFrom(event.target);if(active&&icon!==active.icon&&!tip.contains(event.target))closeTip();if(event.pointerType==='touch'||event.pointerType==='pen'){lastTouch=Date.now();tap=icon&&content(icon)?{icon,id:event.pointerId,x:event.clientX,y:event.clientY,moved:false}:null;}},true);
  jobs.listen(document,'pointermove',event=>{if(tap&&event.pointerId===tap.id&&Math.hypot(event.clientX-tap.x,event.clientY-tap.y)>8)tap.moved=true;},true);
  jobs.listen(document,'pointercancel',()=>{tap=null;},true);
  jobs.listen(document,'pointerup',event=>{if(!tap||event.pointerId!==tap.id)return;const t=tap;tap=null;lastTouch=Date.now();if(!t.moved&&iconFrom(event.target)===t.icon){event.preventDefault();event.stopImmediatePropagation();toggle(t.icon);}},true);
  jobs.listen(document,'click',event=>{const icon=iconFrom(event.target);if(!icon||!content(icon))return;event.preventDefault();event.stopImmediatePropagation();if(Date.now()-lastTouch>800)toggle(icon);},true);
  jobs.listen(document,'keydown',event=>{if(event.key==='Escape'&&closeTip()){event.preventDefault();event.stopImmediatePropagation();return;}const icon=iconFrom(event.target);if(icon&&content(icon)&&(event.key==='Enter'||event.key===' ')){event.preventDefault();event.stopImmediatePropagation();toggle(icon);}},true);
  jobs.listen(document,'scroll',event=>{if(active&&!tip.contains(event.target))closeTip();},true);
  jobs.listen(window,'resize',schedule,{passive:true});
  if(window.visualViewport){jobs.listen(window.visualViewport,'resize',schedule,{passive:true});jobs.listen(window.visualViewport,'scroll',schedule,{passive:true});}
  const observer=(window.__comfierMutations?.create||((fn)=>window.__comfierMutations.create(fn)))(records=>{
    if(records.some(r=>r.target===active?.icon||r.target?.closest?.(JOB)||(r.target?.matches?.(WRAPPER)&&r.target.querySelector(JOB))||[...r.addedNodes||[],...r.removedNodes||[]].some(n=>n.nodeType===1&&(n.matches?.(JOB+','+SETTINGS+','+ICON)||n.querySelector?.(JOB+','+SETTINGS+','+ICON)||(active&&n.contains(active.icon))))))schedule();
  });observer.observe(document.body,{subtree:true,childList:true,attributes:true,attributeFilter:['class','style','data-state','aria-hidden']});
  const unregister=window.__comfierBack?.register('info-tooltip',5,closeTip);
  jobs.frame('initial',scan);
  window.__comfierDetailPopovers={refresh:schedule,closeTooltip:closeTip,snapshot:()=>({scopedForms:lifecycle?.instances().length||0,icons:icons.size}),remove(){if(stopped)return;stopped=true;lifecycle?.remove();closeTip();jobs.dispose();observer.disconnect();unregister?.();cards.forEach((shell,card)=>releaseCard(card,shell));for(const icon of [...icons.keys()])releaseIcon(icon);tip.remove();style.remove();delete window.__comfierDetailPopovers;}};
  lifecycle=window.__comfierUi?.watchComponents?.(['FormItem'],c=>{
    let parent=c.parent;while(parent&&(parent.type?.__name||parent.type?.name)!=='SettingDialog')parent=parent.parent;
    const native=c.appContext?.directives?.tooltip,ui=window.__comfierUi;if(!parent||!native)return;
    return ui.renderPatch(c,tree=>ui.mapVNodes(tree,node=>{
      if(node.type!=='i'||!String(node.props?.class||'').split(/\s+/).includes('pi-info-circle')||!node.dirs?.some(binding=>binding.dir===native))return node;
      // Rekey existing icons once so Vue tears down their old native directive.
      // New icons bind only the owned directive, including translated updates.
      return ui.vnodePatch(node,{key:'comfier-info:'+String(node.key??''),dirs:node.dirs.map(binding=>binding.dir===native?{...binding,dir:infoDirective}:binding)});
    }));
  });
})();
