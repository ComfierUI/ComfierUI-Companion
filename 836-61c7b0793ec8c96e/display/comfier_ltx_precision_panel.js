(function(){
  'use strict';
  if(window.__comfierLtxPanel)return;
  const jobs=window.__comfierRuntime.scope('ltx-panel');
  const ID='comfier-ltx-precision-panel';let current=null;
  const style=document.createElement('style');style.id=ID+'-style';style.textContent=`
.comfier-ltx-precision-button{min-height:36px;padding:6px 12px;margin:4px;border:1px solid var(--interface-stroke,#3b4554);border-radius:8px;background:var(--comfy-menu-bg,#171717);color:var(--input-text,var(--fg-color,#fff));touch-action:manipulation}
#${ID}{position:fixed!important;display:flex!important;flex-direction:column!important;left:var(--cef-lora-left,var(--cef-right,64px))!important;top:var(--cef-right-top,var(--cef-top,4px))!important;right:auto!important;bottom:auto!important;width:var(--cef-lora-width,var(--cef-width,calc(100vw - 68px)))!important;max-width:none!important;height:var(--cef-right-height,var(--cef-height,calc(100dvh - 8px)))!important;max-height:none!important;overflow:hidden!important;box-sizing:border-box!important;background:var(--comfy-menu-bg,#171717)!important;border:1px solid var(--interface-stroke,#3b4554)!important;border-radius:10px!important;pointer-events:auto!important;z-index:var(--comfier-ltx-panel-z,500)!important;container-type:inline-size}
#${ID} .comfier-ltx-precision-controls,#${ID} .comfier-ltx-frame-controls{position:relative!important;flex:0 0 auto!important;width:100%!important;box-sizing:border-box!important;margin:0!important;padding:4px!important;gap:4px!important;color:var(--input-text,var(--fg-color,#fff));font:600 13px system-ui,sans-serif}
#${ID} .comfier-ltx-precision-controls{display:grid!important;grid-template-columns:minmax(0,1fr) auto!important;align-items:center!important}
#${ID} .comfier-ltx-title{grid-column:1;min-width:0}
#${ID} .comfier-ltx-close{grid-column:2;grid-row:1;min-width:56px}
#${ID} button,#${ID} .comfier-ltx-frame-input{box-sizing:border-box;min-width:0;height:36px;padding:0 3px;border:1px solid var(--interface-stroke,#3b4554);border-radius:7px;background:var(--comfy-input-bg,#242427);color:inherit;font:600 13px system-ui,sans-serif;touch-action:manipulation}
#${ID} .comfier-ltx-main-tools{grid-column:1/-1;display:grid;grid-template-columns:minmax(0,1fr) auto minmax(0,1fr);gap:4px;align-items:center}
#${ID} .comfier-ltx-wide-frame-field{display:flex;align-items:center;justify-content:center;gap:4px;min-width:0}
#${ID} .comfier-ltx-wide-frame-field span{font-size:11px;line-height:1.15;text-align:center}
#${ID} .comfier-ltx-wide-frame-field input{width:48px;flex:0 0 48px;text-align:center}
#${ID} .comfier-ltx-zoom-group{display:flex;align-items:center;justify-content:center;gap:4px}
#${ID} .comfier-ltx-zoom-group button{width:32px;flex:0 0 32px}
#${ID} .comfier-ltx-precision-level{width:40px;text-align:center}
#${ID} .comfier-ltx-frame-controls{display:grid!important;grid-template-columns:repeat(10,minmax(0,1fr))!important}
#${ID} .comfier-ltx-frame-controls>button{width:100%;height:36px}
#${ID} .comfier-ltx-frame-status,#${ID} .comfier-ltx-frame-controls>.comfier-ltx-frame-input{display:none}
#${ID} .comfier-ltx-edge.active{background:var(--p-primary-color,var(--primary-background,#20dff3));color:#fff}
#${ID} button:disabled,#${ID} input:disabled{opacity:.38}
#${ID} .comfier-ltx-panel-scroll{position:relative!important;flex:1 1 0!important;min-width:0!important;min-height:0!important;width:100%!important;overflow:auto!important;overscroll-behavior:contain!important;touch-action:pan-x pan-y!important}
#${ID} .pr-wrapper.comfier-ltx-precision-wrapper{position:relative!important;left:auto!important;top:auto!important;transform:none!important;width:2140px!important;max-width:none!important;height:auto!important;zoom:var(--comfier-ltx-precision-zoom,.75)!important;transform-origin:top left!important;pointer-events:auto!important}
#${ID} .pr-wrapper .comfier-ltx-precision-button{display:none!important}
@container (max-width:560px){
#${ID} .comfier-ltx-wide-frame-field{flex-direction:column;gap:2px}
#${ID} .comfier-ltx-frame-controls{grid-template-columns:repeat(6,minmax(0,1fr))!important}
#${ID} .comfier-ltx-edge[data-edge=start]{grid-column:1;grid-row:1}
#${ID} [data-delta="-1"]{grid-column:2;grid-row:1}
#${ID} [data-delta="-5"]{grid-column:3;grid-row:1}
#${ID} [data-delta="5"]{grid-column:4;grid-row:1}
#${ID} [data-delta="1"]{grid-column:5;grid-row:1}
#${ID} .comfier-ltx-edge[data-edge=end]{grid-column:6;grid-row:1}
#${ID} [data-delta="-10"]{grid-column:2;grid-row:2}
#${ID} [data-delta="-20"]{grid-column:3;grid-row:2}
#${ID} [data-delta="20"]{grid-column:4;grid-row:2}
#${ID} [data-delta="10"]{grid-column:5;grid-row:2}
#${ID} .comfier-ltx-frame-controls>.comfier-ltx-frame-input{display:block;width:100%;text-align:center}
#${ID} .comfier-ltx-frame-controls>.comfier-ltx-start-input{grid-column:1;grid-row:2}
#${ID} .comfier-ltx-frame-controls>.comfier-ltx-end-input{grid-column:6;grid-row:2}
#${ID} .comfier-ltx-wide-frame-field{visibility:hidden}
#${ID} .comfier-ltx-main-tools{display:flex;justify-content:center;grid-column:1/-1;grid-row:2}
#${ID} .comfier-ltx-wide-frame-field{display:none}
#${ID} .comfier-ltx-title{font-size:13px}
}
`;(document.head||document.documentElement).appendChild(style);
  function isOpen(){return!!current?.panel?.isConnected}
  function closeIfOpen(){return isOpen()?!!window.__comfierCloseLtxPrecision?.():false}
  function mount(state){if(window.__comfierSidePanels&&!window.__comfierSidePanels.operating('ltx'))return window.__comfierSidePanels.open('ltx',window.__comfierSidePanels.trigger(),()=>mount(state));
    if(!window.__comfierSidePanels){window.__comfierFeedPanel?.closeIfOpen?.();window.__comfierAppsPanel?.closeIfOpen?.();}
    if(!window.__comfierSidePanels){window.__comfierLoraPanel?.closeIfOpen?.();window.__comfierExtensionsPanel?.closeIfOpen?.();}
    const store=binding?.refresh?.();if(!window.__comfierSidePanels&&store?.isOpen)store.closePanel?.();
    const panel=document.createElement('section');panel.id=ID;panel.className='comfier-early-floating-panel comfier-early-floating-right';panel.setAttribute('aria-label','LTX Director Precision');
    const scroll=document.createElement('div');scroll.className='comfier-ltx-panel-scroll';
    state.precisionHome={parent:state.wrapper.parentElement,next:state.wrapper.nextSibling,host:state.host};
    state.panel=panel;state.host=scroll;current=state;
    panel.append(state.controls,state.frameControls,scroll);scroll.appendChild(state.wrapper);document.body.appendChild(panel);
    state.wrapper.classList.add('comfier-ltx-precision-wrapper');
    const close=state.controls.querySelector('.comfier-ltx-close');close.textContent='Close';close.setAttribute('aria-label','Close LTX Director Precision');
    window.__comfierEarlyFloatingPanels?.activateRight?.();window.__comfierEarlyFloatingPanels?.refresh?.();
    jobs.frame('paint',()=>{if(current===state)state.editor?.render?.()});
    return true;
  }
  function release(state){if(!state?.panel)return;
    const home=state.precisionHome;
    if(home?.parent?.isConnected)home.parent.insertBefore(state.wrapper,home.next?.parentNode===home.parent?home.next:null);
    state.wrapper.classList.remove('comfier-ltx-precision-wrapper');state.wrapper.style.removeProperty('--comfier-ltx-precision-zoom');
    state.panel.remove();state.host=home?.host||state.host;state.panel=null;state.precisionHome=null;
    if(current===state)current=null;
    document.documentElement.style.removeProperty('--comfier-ltx-panel-z');
    window.__comfierEarlyFloatingPanels?.refresh?.();if(home?.parent?.isConnected){try{state.editor?.render?.()}catch(_){}}
  }
  const binding=window.__comfierUi?.watchStore?.('rightSidePanel',store=>{if(!window.__comfierSidePanels&&store?.isOpen)closeIfOpen()});
  jobs.own(()=>binding?.remove());
  jobs.observe(document.body,{childList:true,subtree:true},()=>{if(current&&!current.precisionHome?.parent?.isConnected)closeIfOpen()});
  window.__comfierLtxPanel={mount,release,isOpen,closeIfOpen,surface:()=>current?.panel||null,setStack(value){if(value===null)document.documentElement.style.removeProperty('--comfier-ltx-panel-z');else document.documentElement.style.setProperty('--comfier-ltx-panel-z',String(value))},remove(){closeIfOpen();jobs.dispose();style.remove();delete window.__comfierLtxPanel}};
})();
