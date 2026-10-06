(() => {
  'use strict';
  if(window.__comfierEditorGuard)return;
  let last={at:-Infinity,target:null},epoch=0,tabUntil=-Infinity;
  const grants=new WeakMap(),pending=new WeakMap();
  const now=()=>performance.now();
  function editable(el){
    if(!el||el.disabled||el.readOnly)return false;
    if(el.isContentEditable||el.tagName==='TEXTAREA')return true;
    return el.tagName==='INPUT'&&!['button','checkbox','color','file','hidden','image','radio','range','reset','submit'].includes((el.type||'text').toLowerCase());
  }
  function multiline(el){return editable(el)&&(el.tagName==='TEXTAREA'||el.isContentEditable||(el.tagName==='INPUT'&&Number(el.getAttribute('rows'))>1));}
  const guardedSelector='[data-testid="properties-panel"],[data-comfier-side-panel],[data-comfier-native-host],.comfier-native-side-host,.comfier-early-floating-panel,.comfier-early-floating-bottom,#comfier-apps-panel,#comfier-owned-feed-panel,.node-search-box-dialog-mask,.comfier-native-settings-panel,.comfier-extensions-panel,.side-bar-panel,[role="listbox"],[role="menu"],.litecontextmenu,.graphdialog.litesearchbox,.p-menu,.p-contextmenu,.p-tieredmenu,.p-select-overlay,.p-dropdown-panel,.p-autocomplete-overlay,.p-multiselect-overlay,.p-treeselect-overlay';
  function guardedHost(el){return el?.closest?.(guardedSelector)||null;}
  function direct(el){return now()-last.at<900&&!!last.target&&(el===last.target||el.contains?.(last.target)||last.target.contains?.(el));}
  function owner(el){
    if(!multiline(el)||el.closest?.('#comfier-prompt-popup,#comfier-ui-zoom-test,#node-panel,.graphdialog'))return null;
    try{
      const canvas=window.app?.canvas||window.LGraphCanvas?.active_canvas,graph=canvas?.graph||window.app?.graph;
      if(!graph)return null;
      for(const node of graph._nodes||[])for(const widget of node.widgets||[]){
        for(const key of ['inputEl','element']){
          let host;try{host=widget[key];}catch(_){continue;}
          if(host===el||host?.contains?.(el))return {node,widget};
        }
      }
    }catch(_){}
    return null;
  }
  function allowTransfer(source,target){
    if(!editable(target)||!source?.isConnected||!direct(source))return false;
    grants.set(target,now()+900);return true;
  }
  function allowed(el){return direct(el)||(grants.get(el)||0)>now()||tabUntil>now();}
  function pointer(e){if(!e.isTrusted||e.isPrimary===false)return;last={at:now(),target:e.target};epoch++;}
  function focus(e){
    const el=e.target;
    if(!editable(el)||!guardedHost(el)||allowed(el)||pending.has(el))return;
    const capturedEpoch=epoch;
    const timer=setTimeout(()=>{
      pending.delete(el);
      // A stale focus rejection must never affect a newer focus/gesture.
      if(capturedEpoch!==epoch||!el.isConnected||document.activeElement!==el||allowed(el)||!guardedHost(el))return;
      el.blur();
      // Never hide another editor's keyboard or fight a native refocus.
      if(editable(document.activeElement))return;
      try{window.ComfyRemoteKeyboard?.hideKeyboard?.();}catch(_){}
    },0);
    pending.set(el,timer);
  }
  // Stop framework autofocus before WebView can request the IME. The wrapper
  // changes only editable fields within our guarded panels/menus.
  const focusPrototype=window.HTMLElement?.prototype,nativeFocus=focusPrototype?.focus;
  if(typeof nativeFocus==='function')focusPrototype.focus=function(...args){
    if(editable(this)&&guardedHost(this)&&document.activeElement!==this&&!allowed(this))return;
    return nativeFocus.apply(this,args);
  };
  document.addEventListener('keydown',e=>{if(e.isTrusted&&e.key==='Tab')tabUntil=now()+300;},true);
  document.addEventListener('pointerdown',pointer,true);
  document.addEventListener('focusin',focus,true);
  window.__comfierEditorGuard={editable,multiline,owner,guardedHost,allowTransfer};
})();
