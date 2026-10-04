(function(){
  'use strict';
  const jobs=window.__comfierRuntime.scope('lora');
  window.__comfierLoraPanel?.remove?.();
  const PANEL_ID='comfier-lora-manager-panel',FRAME_ID='comfier-lora-manager-frame',STYLE_ID='comfier-lora-panel-style';
  const BUTTON='button.lm-top-menu-button,button[aria-label^="Launch LoRA Manager"]';
  let stopped=false,panel=null,frame=null,button=null,rightStore=null,observer=null,stack=null;
  const style=document.createElement('style');style.id=STYLE_ID;style.textContent=`
#${PANEL_ID}{display:none!important;position:fixed!important;left:var(--cef-lora-left,var(--cef-right))!important;right:auto!important;top:var(--cef-right-top,var(--cef-top))!important;bottom:auto!important;width:var(--cef-lora-width,var(--cef-width))!important;min-width:0!important;max-width:var(--cef-lora-width,var(--cef-width))!important;height:var(--cef-right-height,var(--cef-height))!important;min-height:0!important;max-height:var(--cef-right-height,var(--cef-height))!important;margin:0!important;padding:0!important;transform:none!important;translate:none!important;zoom:1!important;box-sizing:border-box!important;overflow:hidden!important;border:1px solid var(--interface-stroke,var(--border-color,#3b4554))!important;border-radius:10px!important;background:var(--comfy-menu-bg,#171717)!important;pointer-events:auto!important;z-index:var(--comfier-lora-z,var(--comfier-z-side,500))!important}
#${PANEL_ID}.open{display:flex!important;flex-direction:column!important}
#${PANEL_ID}>header{display:flex!important;align-items:center!important;justify-content:space-between!important;flex:0 0 36px!important;height:36px!important;box-sizing:border-box!important;padding:4px 6px 4px 10px!important;border-bottom:1px solid var(--interface-stroke,var(--border-color,#3b4554))!important;background:var(--comfy-menu-bg,#171717)!important;color:var(--comfier-ui-font,var(--fg-color,#fff))!important;font:600 13px/1 system-ui,sans-serif!important}
#${PANEL_ID}>header>button{display:grid!important;place-items:center!important;width:28px!important;height:28px!important;min-width:28px!important;padding:0!important;border:0!important;border-radius:6px!important;background:var(--color-secondary-background,var(--comfy-input-bg,#242427))!important;color:var(--comfier-icon-color,var(--comfier-accent,#fff))!important;font-size:20px!important;line-height:1!important;touch-action:manipulation!important}
#comfier-lora-manager-scroll{display:block!important;flex:1 1 0!important;width:100%!important;min-width:0!important;min-height:0!important;overflow-x:auto!important;overflow-y:hidden!important;overscroll-behavior:contain!important;touch-action:pan-x pan-y!important;-webkit-overflow-scrolling:touch!important}
#${FRAME_ID}{display:block!important;width:var(--cef-lora-content-width,100%)!important;min-width:var(--cef-lora-content-width,100%)!important;max-width:none!important;height:100%!important;min-height:100%!important;border:0!important;background:var(--comfy-menu-bg,#171717)!important}
`;(document.head||document.documentElement).appendChild(style);
  const rightBinding=window.__comfierUi.watchStore('rightSidePanel',store=>{rightStore=store;if(!window.__comfierSidePanels&&store?.isOpen&&isOpen())closeIfOpen()});
  function attachStore(){rightStore=rightBinding.refresh()}
  function ensurePanel(){if(panel?.isConnected)return panel;panel=document.createElement('section');panel.id=PANEL_ID;panel.className='comfier-early-floating-panel comfier-early-floating-right';panel.setAttribute('aria-label','LoRA Manager');const header=document.createElement('header'),title=document.createElement('span'),close=document.createElement('button');title.textContent='LoRA Manager';close.type='button';close.setAttribute('aria-label','Close LoRA Manager');close.textContent='×';close.addEventListener('click',closeIfOpen);header.append(title,close);const scroll=document.createElement('div');scroll.id='comfier-lora-manager-scroll';frame=document.createElement('iframe');frame.id=FRAME_ID;frame.title='LoRA Manager';frame.setAttribute('allow','clipboard-read; clipboard-write');scroll.appendChild(frame);panel.append(header,scroll);document.body.appendChild(panel);return panel}
  function isOpen(){return!!panel?.classList.contains('open')}
  function surface(){return panel}
  function layout(){window.__comfierEarlyFloatingPanels?.refresh?.()}
  function open(){if(window.__comfierSidePanels&&!window.__comfierSidePanels.operating('lora'))return window.__comfierSidePanels.open('lora',button,open);if(!window.__comfierSidePanels){window.__comfierFeedPanel?.closeIfOpen?.();window.__comfierAppsPanel?.closeIfOpen?.();window.__comfierLtxPanel?.closeIfOpen?.();}attachStore();ensurePanel();if(!window.__comfierSidePanels){window.__comfierExtensionsPanel?.closeIfOpen?.();}if(!window.__comfierSidePanels&&rightStore?.isOpen)rightStore.closePanel();if(!frame.src)frame.src=new URL('/loras',location.href).href;panel.classList.add('open');button?.setAttribute('aria-pressed','true');button?.setAttribute('aria-expanded','true');window.__comfierEarlyFloatingPanels?.activateRight?.();layout();return true}
  function closeIfOpen(){if(!isOpen())return false;panel.classList.remove('open');button?.setAttribute('aria-pressed','false');button?.setAttribute('aria-expanded','false');layout();return true}
  function toggle(){if(window.__comfierSidePanels&&!window.__comfierSidePanels.operating('lora'))return window.__comfierSidePanels.toggle('lora',button,toggle);return isOpen()?closeIfOpen():open()}
  function loraTooltipText(value){return/launch\s+lora\s+manager/i.test(String(value||''))}
  function suppressTooltips(root=document){
    const candidates=[];
    if(root?.nodeType===1&&root.matches?.('.p-tooltip,[role="tooltip"],[data-pc-name="tooltip"]'))candidates.push(root);
    root?.querySelectorAll?.('.p-tooltip,[role="tooltip"],[data-pc-name="tooltip"]').forEach(el=>candidates.push(el));
    candidates.forEach(el=>{if(loraTooltipText(el.textContent))el.remove()});
  }
  function prepareButton(target){
    if(!target)return;
    target.removeAttribute('title');target.removeAttribute('data-pd-tooltip');
    target.setAttribute('aria-haspopup','dialog');target.setAttribute('aria-controls',PANEL_ID);
    target.setAttribute('aria-pressed',String(isOpen()));target.setAttribute('aria-expanded',String(isOpen()));
  }
  function bind(){if(stopped)return;attachStore();suppressTooltips();const next=window.__comfierActionbarOwner?.control('lora')||Array.from(document.querySelectorAll(BUTTON)).find(el=>!el.closest('#'+PANEL_ID));if(next!==button)button=next||null;prepareButton(button)}
  function schedule(){if(!stopped)jobs.frame('layout',bind)}
  function capture(event){const target=event.target?.closest?.(BUTTON);if(!target||event.shiftKey)return;event.preventDefault();event.stopImmediatePropagation();button=target;toggle()}
  function blockHover(event){if(!event.target?.closest?.(BUTTON))return;event.stopImmediatePropagation();suppressTooltips()}
  document.addEventListener('click',capture,true);
  ['pointerover','pointerenter','mouseover','mouseenter'].forEach(type=>document.addEventListener(type,blockHover,true));
  observer=window.__comfierMutations.create(records=>{records.forEach(record=>record.addedNodes.forEach(suppressTooltips));schedule()});observer.observe(document.body,{subtree:true,childList:true});jobs.burst('startup',schedule,[0,80,250,700,1500]);
  window.__comfierLoraPanel={isOpen,surface,open,closeIfOpen,toggle,setStack(value){stack=value;const root=document.documentElement.style;if(value===null){root.removeProperty('--comfier-lora-z');return}root.setProperty('--comfier-lora-z',String(value))},remove(){if(stopped)return;stopped=true;jobs.dispose();observer.disconnect();document.removeEventListener('click',capture,true);['pointerover','pointerenter','mouseover','mouseenter'].forEach(type=>document.removeEventListener(type,blockHover,true));rightBinding.remove();panel?.remove();style.remove();document.documentElement.style.removeProperty('--comfier-lora-z');delete window.__comfierLoraPanel}};
  schedule();
})();
