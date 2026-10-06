(() => {
  'use strict';
  if(window.__comfierNodeAppearance)return;
  const key='comfierAppearance';
  const sockets=[['socketModel','Model'],['socketClip','CLIP'],['socketVae','VAE'],['socketLatent','Latent'],['socketMask','Mask'],['socketConditioning','Positive / negative conditioning'],['socketHidden','Hidden sockets'],['socketOther','Other sockets']];
  const roles=[['nodeBg','Background'],['nodeLabel','Header'],...sockets];
  function socketRole(slot){
    if(slot?.hidden===true||slot?.isHidden===true)return 'socketHidden';
    const type=String(slot?.type??'').trim().toUpperCase();
    return ({MODEL:'socketModel',CLIP:'socketClip',VAE:'socketVae',LATENT:'socketLatent',MASK:'socketMask',CONDITIONING:'socketConditioning',HIDDEN:'socketHidden'})[type]||'socketOther';
  }
  const valid=value=>typeof value==='string'&&/^#[0-9a-f]{6}([0-9a-f]{2})?$/i.test(value);
  const overrides=node=>Object.fromEntries(roles.map(([id])=>[id,node?.properties?.[key]?.colors?.[id]]).filter(([,v])=>valid(v)));
  const color=(node,id)=>overrides(node)[id]||window.__comfierThemeStudio?.getAssignedColor?.(id)||null;
  let dialog=null;
  function close(){if(!dialog)return false;dialog.close();dialog.remove();dialog=null;return true}
  function save(node,colors){
    const graph=node.graph;
    graph?.beforeChange?.();
    node.properties||={};
    if(Object.keys(colors).length)node.properties[key]={version:1,colors:{...colors}};
    else delete node.properties[key];
    graph?.afterChange?.();node.setDirtyCanvas?.(true,true);window.app?.canvas?.setDirty?.(true,true);
  }
  function open(node){
    close();const studio=window.__comfierThemeStudio;if(!studio?.createPicker)return false;
    const draft=overrides(node),d=document.createElement('dialog');dialog=d;d.className='comfier-node-appearance';d.setAttribute('aria-label','Node appearance');d.setAttribute('role','dialog');
    if(!document.getElementById('comfier-node-dialog-style')){const style=document.createElement('style');style.id='comfier-node-dialog-style';style.textContent=".comfier-node-appearance{box-sizing:border-box;background:#111!important;color:#fff!important;border:1px solid #fff!important;border-radius:12px;width:min(390px,calc(100vw - 32px));max-height:calc(100dvh - 32px);overflow-y:auto;padding:18px;font:14px/1.45 Arial,sans-serif}\n.comfier-node-appearance::backdrop{background:#0008}\n.comfier-node-appearance h3{margin:0 0 14px;color:#fff;font-size:19px;line-height:1.35}\n.comfier-node-appearance p{margin:0 0 16px;color:#fff}\n.comfier-node-appearance select,.comfier-node-appearance button,.comfier-node-appearance input[type=text]{box-sizing:border-box;background:#fff!important;color:#000!important;border:1px solid #ccc!important;border-radius:5px;font:inherit;min-height:34px;padding:7px 10px}\n.comfier-node-appearance select{width:100%;margin-bottom:16px}\n.comfier-node-appearance .theme-picker{display:flex;flex-direction:column;gap:16px;margin-bottom:18px}\n.comfier-node-appearance .theme-wheel{display:block;width:min(220px,100%);height:auto;aspect-ratio:1;align-self:center;touch-action:none}\n.comfier-node-appearance .theme-picker label{display:grid;grid-template-columns:98px minmax(0,1fr);gap:10px;align-items:center;color:#fff}\n.comfier-node-appearance input[type=range]{width:100%;min-width:0;margin:0;accent-color:#fff}\n.comfier-node-appearance input[type=text]{width:100%;min-width:0}\n.comfier-node-appearance .node-color-actions,.comfier-node-appearance .node-dialog-footer{display:grid;grid-template-columns:1fr 1fr;gap:10px}\n.comfier-node-appearance .node-color-actions button:last-child{grid-column:1/-1}\n.comfier-node-appearance [role=status]{margin:16px 0;min-height:20px}\n.comfier-node-appearance button:focus-visible,.comfier-node-appearance select:focus-visible,.comfier-node-appearance input:focus-visible{outline:2px solid #fff;outline-offset:3px}\n";document.head.appendChild(style)}
    const title=document.createElement('h3');title.textContent='Node appearance — '+(node.title||node.type||'Node');d.appendChild(title);
    const note=document.createElement('p');note.textContent='Unset colors follow the global theme. Overrides are saved with this workflow.';d.appendChild(note);
    const select=document.createElement('select');select.setAttribute('aria-label','Node appearance target');for(const [id,label]of roles){const o=document.createElement('option');o.value=id;o.textContent=label;select.appendChild(o)}d.appendChild(select);
    const host=document.createElement('div');d.appendChild(host);let picker;
    const status=document.createElement('p');status.setAttribute('role','status');
    function render(){host.replaceChildren();picker=studio.createPicker(draft[select.value]||studio.getAssignedColor?.(select.value)||'#aaaaaa');host.appendChild(picker.element);status.textContent=draft[select.value]?'Individual override':'Following global theme'}
    select.onchange=render;
    const actions=document.createElement('div');actions.className='node-color-actions';d.appendChild(actions);let buttons=actions;
    function button(label,fn){const b=document.createElement('button');b.type='button';b.textContent=label;b.onclick=fn;buttons.appendChild(b);return b}
    button('Set color',()=>{draft[select.value]=picker.value();render()});
    button('Use global color',()=>{delete draft[select.value];render()});
    button('Reset all to global',()=>{for(const id of Object.keys(draft))delete draft[id];render()});
    d.appendChild(status);const footer=document.createElement('div');footer.className='node-dialog-footer';d.appendChild(footer);buttons=footer;button('Save',()=>{save(node,draft);close()});button('Cancel',close);
    d.addEventListener('cancel',e=>{e.preventDefault();close()});document.body.appendChild(d);d.showModal();render();return true;
  }
  function install(canvas){
    if(!canvas)return;
    if(typeof canvas.getNodeMenuOptions==='function'&&!canvas.getNodeMenuOptions.__comfierNodeAppearance){
      const original=canvas.getNodeMenuOptions;
      const wrapped=function(node,...rest){const options=original.call(this,node,...rest)||[];return [...options,null,{content:'ComfierUI node appearance',callback:()=>open(node)}]};wrapped.__comfierNodeAppearance=true;canvas.getNodeMenuOptions=wrapped;
    }
    if(typeof canvas.drawNode==='function'&&!canvas.drawNode.__comfierNodeAppearance){
      const original=canvas.drawNode;
      const wrapped=function(node,...rest){
        const restored=[];
        try{
          for(const list of ['inputs','outputs']){
            for(const slot of node?.[list]||[]){const value=color(node,socketRole(slot));if(!value)continue;for(const property of ['color_on','color_off']){
              restored.push([slot,property,Object.getOwnPropertyDescriptor(slot,property)]);slot[property]=value;
            }}
          }
          return original.call(this,node,...rest);
        }finally{for(const [slot,property,descriptor]of restored.reverse()){if(descriptor)Object.defineProperty(slot,property,descriptor);else delete slot[property]}}
      };wrapped.__comfierNodeAppearance=true;canvas.drawNode=wrapped;
    }
  }
  window.__comfierNodeAppearance={color,overrides,socketRole,open,close,save,install};
  // Discovery can finish after the initial theme refreshes. Bind once the actual
  // canvas exists; no editor interaction is needed to activate the node menu.
  const readyCanvas=()=>{const canvas=window.app?.canvas;if(!canvas||typeof canvas.getNodeMenuOptions!=='function')return false;install(canvas);window.__comfierAccentTheme?.setCanvasText?.();return true};
  if(!readyCanvas()){let attempts=0;const timer=setInterval(()=>{if(readyCanvas()||++attempts>=240)clearInterval(timer)},250)}
})();

(() => {
  'use strict';
  if (window.__comfierAccentTheme) { window.__comfierAccentTheme.refresh(); return; }
  const DEFAULT = '#ffffff';
  const UI_FONT_DEFAULT = '#000000';
  const roots = ['comfier-ui-zoom-test'];
  const normalize = value => {
    const hex=String(value || '').trim().replace(/^#/, '');
    return /^[0-9a-f]{6}$/i.test(hex) ? '#'+hex.toLowerCase() : null;
  };
  let current=DEFAULT;
  let currentUiFont=UI_FONT_DEFAULT;
  let outlineTimers=[];
  let uiFontTimers=[];
  const outlineBindings=new WeakMap();
  const nativeOutlineStyles=new Map();
  const canvasTextBindings=new WeakMap();
  const CANVAS_TEXT_KEYS=['NODE_TEXT_COLOR','NODE_TEXT_HIGHLIGHT_COLOR',
    'NODE_TITLE_COLOR','NODE_SELECTED_TITLE_COLOR','WIDGET_TEXT_COLOR',
    'WIDGET_SECONDARY_TEXT_COLOR','WIDGET_DISABLED_TEXT_COLOR'];
  function bindCanvasText(instance,key,value){
    if(!instance||typeof instance!=='object'||!(key in instance))return;
    let bindings=canvasTextBindings.get(instance);
    if(!bindings){bindings=new Map();canvasTextBindings.set(instance,bindings)}
    let binding=bindings.get(key);
    if(!binding){
      let native=instance[key],themed=null;
      try {
        Object.defineProperty(instance,key,{
          configurable:true,enumerable:true,
          get(){return themed==null||(key==='clear_background_color'&&native==='transparent')?native:themed},
          set(next){native=next}
        });
        binding={set(next){themed=next}};
      } catch (_) {binding={set(next){instance[key]=next==null?native:next}}}
      bindings.set(key,binding);
    }
    binding.set(value);
  }
  function applyCanvasText(){
    if(!window.__comfierThemeManifest)return;
    const studio=window.__comfierThemeStudio;
    const color=studio?.isAssigned?.('promptText')?studio.getAssignedColor('promptText'):null;
    const instances=[globalThis.__COMFY_LITEGRAPH_INSTANCE__,globalThis.LiteGraph];
    instances.forEach(instance=>CANVAS_TEXT_KEYS.forEach(key=>bindCanvasText(instance,key,color)));
    bindCanvasText(window.app?.canvas,'node_title_color',color);
    const chosen=key=>studio?.isAssigned?.(key)?studio.getAssignedColor(key):null;
    instances.forEach(instance=>{
      bindCanvasText(instance,'NODE_DEFAULT_BGCOLOR',chosen('nodeBg'));
      bindCanvasText(instance,'NODE_DEFAULT_COLOR',chosen('nodeLabel'));
    });
    // A configured background image retains its native transparent canvas.
    const canvas=window.app?.canvas;
    bindCanvasText(canvas,'clear_background_color',chosen('canvasBg'));
    window.__comfierNodeAppearance?.install(canvas);
    if(canvas&&typeof canvas.drawNodeShape==='function'&&!canvas.drawNodeShape.__comfierThemeSurface){
      const original=canvas.drawNodeShape;
      const wrapped=function(node,ctx,size,header,body,...rest){
        const studio=window.__comfierThemeStudio,label=window.__comfierNodeAppearance?.color(node,'nodeLabel')||studio?.getAssignedColor?.('nodeLabel'),bg=window.__comfierNodeAppearance?.color(node,'nodeBg')||studio?.getAssignedColor?.('nodeBg');
        if(label)header=label;
        if(bg&&node?.mode!==4){
          const alpha=typeof body==='string'?body.match(/rgba\([^,]+,[^,]+,[^,]+,\s*([\d.]+)\)/)?.[1]:null;
          body=alpha?('rgba('+[1,3,5].map(i=>parseInt(bg.slice(i,i+2),16)).join(',')+','+(Number(alpha)*(bg.length===9?parseInt(bg.slice(7,9),16)/255:1))+')'):bg;
        }
        return original.call(this,node,ctx,size,header,body,...rest);
      };wrapped.__comfierThemeSurface=true;canvas.drawNodeShape=wrapped;
    }

  }

  try { current=normalize(window.ComfierApp?.getAccentTheme?.()) || DEFAULT; } catch (_) {}
  try { currentUiFont=normalize(window.ComfierApp?.getUiFontColor?.()) || UI_FONT_DEFAULT; } catch (_) {}
  function bindClassicOutline(instance,value) {
    if(!instance||typeof instance!=='object')return;
    let binding=outlineBindings.get(instance);
    if(!binding){
      let native=instance.NODE_BOX_OUTLINE_COLOR, themed=value;
      try {
        Object.defineProperty(instance,'NODE_BOX_OUTLINE_COLOR',{
          configurable:true,enumerable:true,
          get(){return themed==null?native:themed},
          set(next){native=next}
        });
        binding={set(next){themed=next}};
      } catch (_) { binding={set(next){instance.NODE_BOX_OUTLINE_COLOR=next==null?native:next}}; }
      outlineBindings.set(instance,binding);
    }
    binding.set(value);
  }
  function applyNodeOutline(value) {
    if(window.__comfierThemeManifest)value=window.__comfierThemeStudio?.isAssigned?.('icons')?window.__comfierThemeStudio.getState().icons:null;
    const style=document.documentElement.style;
    for(const key of ['--node-component-outline','--color-node-component-outline']){
      const saved=nativeOutlineStyles.get(key),present=style.getPropertyValue(key);
      if(value==null){if(saved&&present===saved.applied){if(saved.value)style.setProperty(key,saved.value,saved.priority);else style.removeProperty(key)}nativeOutlineStyles.delete(key)}
      else{if(!saved||present!==saved.applied)nativeOutlineStyles.set(key,{value:present,priority:style.getPropertyPriority(key),applied:value});else saved.applied=value;style.setProperty(key,value)}
    }
    const instances=[globalThis.__COMFY_LITEGRAPH_INSTANCE__,globalThis.LiteGraph];
    instances.forEach(instance=>bindClassicOutline(instance,value));
    applyCanvasText();
    try { window.app?.canvas?.setDirty?.(true,true); } catch (_) {}
  }
  function scheduleCanvasText(){applyCanvasText();try{window.app?.canvas?.setDirty?.(true,true)}catch(_){}}
  function scheduleNodeOutline(value) {
    outlineTimers.forEach(clearTimeout);
    outlineTimers=[0,100,500,1500,3500].map(delay=>setTimeout(()=>applyNodeOutline(value),delay));
  }
  function paint(value) {
    if(window.__comfierThemeManifest){document.documentElement.style.setProperty('--comfier-accent','var(--color-base-foreground,var(--fg-color,#fff))');scheduleNodeOutline(null);return}
    const rgb=[1,3,5].map(i=>parseInt(value.slice(i,i+2),16));
    const linear=rgb.map(v=>{v/=255;return v<=.04045?v/12.92:Math.pow((v+.055)/1.055,2.4);});
    const text=.2126*linear[0]+.7152*linear[1]+.0722*linear[2]>.179?'#000000':'#ffffff';
    const dark='#'+rgb.map(v=>Math.round(v*.4).toString(16).padStart(2,'0')).join('');
    const style=document.documentElement.style;
    style.setProperty('--comfier-accent',value);
    style.setProperty('--comfier-accent-text',text);
    style.setProperty('--comfier-accent-drag',dark);
    scheduleNodeOutline(value);
    current=value;
    document.querySelectorAll('.ui-accent-hex').forEach(input=>{input.value=value.slice(1);input.setCustomValidity('');});
  }
  function set(value) {
    const hex=normalize(value);if(!hex)return false;
    try { if(window.ComfierApp?.setAccentTheme && !window.ComfierApp.setAccentTheme(hex))return false; }
    catch (_) { return false; }
    paint(hex);return true;
  }
  function paintUiFont(value) {
    if(window.__comfierThemeManifest){const studio=window.__comfierThemeStudio;if(!studio?.isAssigned?.('uiText')){document.documentElement.style.removeProperty('--comfier-ui-font');return}value=studio.getAssignedColor('uiText');}
    const style=document.documentElement.style;
    style.setProperty('--comfier-ui-font',value);
    /* UI copy is scoped by the selectors below. Do not replace Comfy's global
       input tokens: prompt editors may require the opposite contrast. */
    currentUiFont=value;
    document.querySelectorAll('.ui-font-hex').forEach(input=>{input.value=value.slice(1);input.setCustomValidity('');});
  }
  function scheduleUiFont(value) {
    uiFontTimers.forEach(clearTimeout);
    uiFontTimers=[0,100,500,1500,3500].map(delay=>setTimeout(()=>paintUiFont(value),delay));
  }
  function setUiFont(value) {
    const hex=normalize(value);if(!hex)return false;
    try { if(window.ComfierApp?.setUiFontColor && !window.ComfierApp.setUiFontColor(hex))return false; }
    catch (_) { return false; }
    paintUiFont(hex);return true;
  }
  // Reusable class families from the supplied UI samples. Build hashes and
  // per-instance ids are deliberately omitted so late-mounted content matches.
  const themedIconClasses=[
    'icon-[lucide--panel-right]','pi-times','icon-[lucide--chevron-down]',
    'icon-[comfy--extensions-blocks]','icon-[lucide--list-filter]',
    'icon-[lucide--settings-2]','icon-[lucide--refresh-cw]',
    'icon-[lucide--cloud-download]','pi-bookmark',
    'icon-[lucide--sliders-horizontal]','icon-[lucide--app-window]',
    'icon-[comfy--workflow]','icon-[lucide--panel-left]',
    'icon-[lucide--search]','icon-[lucide--user]','pi-plus',
    'icon-[lucide--more-vertical]','icon-[lucide--panel-left-close]',
    'icon-[lucide--arrow-up-down]','icon-[lucide--plus]',
    'icon-[lucide--keyboard]','icon-[lucide--folder]',
    'icon-[lucide--settings]','icon-[lucide--workflow]',
    'icon-[lucide--palette]','icon-[lucide--box]',
    'icon-[lucide--pen-tool]','icon-[lucide--puzzle]',
    'icon-[lucide--info]','icon-[lucide--plug]',
    'pi-pencil','pi-copy','pi-save','pi-download','pi-trash',
    'pi-arrow-left','pi-arrow-right','pi-arrows-h',
    'icon-[lucide--list-tree]','icon-[lucide--rotate-ccw]',
    'icon-[lucide--locate]','icon-[lucide--x]','icon-[lucide--chevron-up]',
    'icon-[lucide--more-horizontal]','icon-[lucide--table-of-contents]',
    'icon-[lucide--grid-3x3]','icon-[lucide--layout-grid]','icon-[lucide--check]'
  ];
  const menuIconClasses=['pi-github','pi-info-circle','pi-discord','pi-comments',
    'pi-question','icon-[comfy--template]','icon-[comfy--extensions-blocks]'];
  const uiTextScopes=[
    '#comfier-ui-zoom-test','.comfier-app-settings-native-panel',
    '.sidebar-content-container','.comfy-vue-side-bar-container',
    '.comfier-early-floating-panel','.comfier-native-settings-panel',
    '.comfier-templates-native-panel','.comfier-extensions-panel',
    '[data-testid="properties-panel"]','[data-testid="settings-dialog"]',
    '.p-menu','.p-tieredmenu','.p-contextmenu','[role="menu"]','[role="listbox"]',
    '[data-reka-popper-content-wrapper]','.actionbar-container',
    '.comfier-early-queue-dock','#crystools-monitors-root',
    '#topbar-workflow-tabs','[data-testid="topbar-workflow-tabs"]',
    '[data-testid="view-mode-toggle"]','.node-search-box-dialog-mask',
    '[data-testid="queue-progress-overlay"]','.p-tree','.litecontextmenu'
  ];
  const uiTextClasses=[
    'span:not([class])','span[class=""]','span.truncate','span.flex-1',
    'span.text-sm','span.text-2xs','span[class~="@max-[30rem]/filters:sr-only"]',
    'span.leaf-count-badge','button[role="tab"]',
    'button:has(>i[class~="icon-[lucide--plus]"])',
    'input[type="text"][role="combobox"]',
    'div.text-muted-foreground>p',
    'button.h-8.rounded-lg.p-2.text-xs:is(.text-secondary-foreground,.text-muted-foreground)',
    'span.text-text-secondary',
    'h3.text-xs.font-medium.tracking-wide.text-muted-foreground.uppercase',
    'h3.text-xs.font-bold.text-text-secondary.uppercase',
    'div.px-6.py-2.text-xs.text-muted-background',
    'p.text-muted-foreground.text-sm.text-center.whitespace-pre-line'
  ];
  // Dedicated targets: retain explicit entries even when an older text family
  // also matches. Anchor labels to their component rather than all spans.
  const individualTextTargets=[
    'button.bg-transparent.text-muted-foreground.h-6.rounded-sm.px-2.py-1.gap-2.text-sm:has(>i[class~="icon-[lucide--settings]"])',
    'input[inputmode="decimal"]:has(+div.absolute.inset-0.z-10.cursor-ew-resize.touch-pan-y)',
    '[data-testid="job-history-sidebar"] span.text-xs.text-base-foreground:has(+button i[class~="icon-[lucide--list-x]"])',
    '.option-container span:has(>span.truncate.text-2xs)>span.truncate.text-2xs',
    'button[data-testid="zoom-controls-button"]>span>span',
    '[data-reka-menu-content][role="menu"]>[data-reka-collection-item][role="menuitem"]>span.flex-1',
    '.comfier-extensions-panel div.flex.items-center.justify-center.gap-1.px-2.py-1.text-xs.font-medium.text-muted',
    '.comfier-extensions-panel p.my-0.mb-1.line-clamp-3.min-h-12.flex-1.overflow-hidden[class~="text-xs/4"].font-medium.wrap-break-word.text-muted',
    'div.absolute.inset-0.z-10.cursor-ew-resize.touch-pan-y',
    'input[type="text"][aria-label="filename_prefix"][data-pc-name="inputtext"]',
    'span.min-w-0.flex-1.truncate.text-sm.text-base-foreground',
    'p.m-0.line-clamp-3.min-w-0.flex-1[class~="text-sm/snug"].wrap-break-word.whitespace-pre-wrap.text-muted-foreground',
    'span[data-slot="slider-thumb"][role="slider"]'
  ];
  const searchText=':is('+uiTextScopes.join(',')+') input[type="text"][role="combobox"]';
  // Consolidated compatibility paint, before the current role overrides.
  const compatibility=document.createElement('style');compatibility.id='comfier-theme-compatibility';compatibility.textContent=`.side-tool-bar-container .side-bar-button svg,
.side-tool-bar-container .side-bar-button i,
.side-tool-bar-container .side-bar-button .side-bar-button-icon,
.comfier-unified-floating-rail .side-bar-button svg,
.comfier-unified-floating-rail .side-bar-button i,
.comfier-unified-floating-rail .side-bar-button .side-bar-button-icon{
  color:var(--comfier-icon-color,var(--color-base-foreground,var(--fg-color,#fff)))!important
}
.comfy-menu-button-wrapper .comfyui-logo,
.comfy-menu-button-wrapper i[class*="lucide--chevron-down"]{
  color:var(--comfier-icon-color,var(--color-base-foreground,var(--fg-color,#fff)))!important
}
#comfier-workflow-actions-floating-dock i[class*="comfy--workflow"],
button[aria-label="Manage extensions"] i[class*="comfy--extensions-blocks"],
i[class*="comfy--extensions-block"],
button[aria-label="Toggle properties panel"] i[class*="lucide--panel-right"],
[role="toolbar"][aria-label="Canvas Toolbar"] i[class*="lucide--focus"],
[role="toolbar"][aria-label="Canvas Toolbar"] i[class*="lucide--route-off"],
[role="toolbar"][aria-label="Canvas Toolbar"] i[class*="lucide--map"],
[role="toolbar"][aria-label="Canvas Toolbar"] i[class*="lucide--mouse-pointer-2"],
[role="toolbar"][aria-label="Canvas Toolbar"] i[class*="lucide--chevron-down"],
[role="toolbar"][aria-label="Canvas Toolbar"] i[class*="lucide--hand"],
[role="menu"] i[class~="icon-[lucide--mouse-pointer-2]"],
[role="menu"] i[class~="icon-[lucide--hand]"]{
  color:var(--comfier-icon-color,var(--color-base-foreground,var(--fg-color,#fff)))!important
}
i.mdi.mdi-vacuum-outline::before{
  color:var(--comfier-icon-color,var(--color-base-foreground,var(--fg-color,#fff)))!important
}
#topbar-workflow-tabs .p-togglebutton.p-togglebutton-checked,
[data-testid="topbar-workflow-tabs"] .p-togglebutton.p-togglebutton-checked,
#topbar-workflow-tabs .p-togglebutton.p-togglebutton-checked > .p-togglebutton-content,
[data-testid="topbar-workflow-tabs"] .p-togglebutton.p-togglebutton-checked > .p-togglebutton-content{
  border-bottom-color:var(--comfier-active-color,var(--color-base-foreground,var(--fg-color,#fff)))!important
}
#topbar-workflow-tabs .p-togglebutton.p-togglebutton-checked::before,
#topbar-workflow-tabs .p-togglebutton.p-togglebutton-checked::after,
[data-testid="topbar-workflow-tabs"] .p-togglebutton.p-togglebutton-checked::before,
[data-testid="topbar-workflow-tabs"] .p-togglebutton.p-togglebutton-checked::after{
  background-color:var(--comfier-active-color,var(--color-base-foreground,var(--fg-color,#fff)))!important;
  border-color:var(--comfier-active-color,var(--color-base-foreground,var(--fg-color,#fff)))!important
}
i[class*="lucide--panels-top-left"]{
  color:var(--comfier-icon-color,var(--color-base-foreground,var(--fg-color,#fff)))!important
}
[data-testid="workflow-dirty-indicator"]{
  color:var(--comfier-icon-color,var(--color-base-foreground,var(--fg-color,#fff)))!important
}
.comfier-node-search-shell i.pi.pi-filter,
.node-search-box-dialog-mask i.pi.pi-filter{
  color:var(--comfier-icon-color,var(--color-base-foreground,var(--fg-color,#fff)))!important
}
[data-testid="queue-button"][data-variant="primary"]{
  width:102px!important;min-width:102px!important;max-width:102px!important;
  height:32px!important;min-height:32px!important;max-height:32px!important;
  box-sizing:border-box!important;
  border:0!important;
  border-radius:0!important;
  background-color:var(--comfier-control-background,var(--comfier-button-bg,transparent))!important;
  color:transparent!important;
  font-size:0!important;line-height:0!important;gap:0!important;
  justify-content:center!important;
  box-shadow:none!important
}
[data-testid="queue-button"][data-variant="primary"]>*{
  display:none!important
}
[data-testid="queue-button"][data-variant="primary"]::before{
  content:""!important;display:block!important;
  width:52px!important;min-width:52px!important;max-width:52px!important;
  height:20px!important;min-height:20px!important;max-height:20px!important;
  flex:0 0 52px!important;position:static!important;margin:0!important;inset:auto!important;transform:none!important;
  background-color:var(--comfier-icon-color,var(--color-base-foreground,var(--fg-color,#fff)))!important;
  -webkit-mask:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='20 0 52 20'%3E%3Cpath fill='black' d='M22 2h9c4 0 6 2 6 5 0 2.4-1.3 4.1-3.7 4.7L38 18h-5l-4.2-6H26v6h-4V2zm4 3v4h5c1.3 0 2-.7 2-2s-.7-2-2-2h-5zm13-3h4v10c0 2 1 3 3 3s3-1 3-3V2h4v10c0 4.5-2.5 6.5-7 6.5S39 16.5 39 12V2zm16 0h4l7 10V2h4v16h-4L59 8v10h-4V2z'/%3E%3C/svg%3E") center/52px 20px no-repeat!important;
  mask:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='20 0 52 20'%3E%3Cpath fill='black' d='M22 2h9c4 0 6 2 6 5 0 2.4-1.3 4.1-3.7 4.7L38 18h-5l-4.2-6H26v6h-4V2zm4 3v4h5c1.3 0 2-.7 2-2s-.7-2-2-2h-5zm13-3h4v10c0 2 1 3 3 3s3-1 3-3V2h4v10c0 4.5-2.5 6.5-7 6.5S39 16.5 39 12V2zm16 0h4l7 10V2h4v16h-4L59 8v10h-4V2z'/%3E%3C/svg%3E") center/52px 20px no-repeat!important
}
button[aria-label^="Launch LoRA Manager"] :is(svg,i,img,[class*="icon"]),
button.lm-top-menu-button :is(svg,i,img,[class*="icon"]){
  display:none!important
}
button[aria-label^="Launch LoRA Manager"]::before,
button.lm-top-menu-button::before{
  content:""!important;
  display:block!important;
  width:16px!important;min-width:16px!important;max-width:16px!important;
  height:16px!important;min-height:16px!important;max-height:16px!important;
  flex:0 0 16px!important;
  background-color:var(--comfier-icon-color,var(--color-base-foreground,var(--fg-color,#fff)))!important;
  -webkit-mask:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath fill='black' fill-rule='evenodd' d='M1 1h14v14H1V1zm4 3h2.5v5.5H12V12H5V4z'/%3E%3C/svg%3E") center/16px 16px no-repeat!important;
  mask:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath fill='black' fill-rule='evenodd' d='M1 1h14v14H1V1zm4 3h2.5v5.5H12V12H5V4z'/%3E%3C/svg%3E") center/16px 16px no-repeat!important
}
[data-testid="comfier-app-settings-tab-button"]{color:var(--comfier-icon-color,var(--color-muted-foreground,var(--muted-foreground,#8a8a8a)))!important}
#comfier-multiselect-toggle .comfier-multiselect-label{color:var(--comfier-icon-color,var(--color-muted-foreground,var(--muted-foreground,#8a8a8a)))!important}
#comfier-multiselect-toggle input[type="checkbox"]{
  appearance:none!important;-webkit-appearance:none!important;
  display:grid!important;place-items:center!important;
  box-sizing:border-box!important;
  border:2px solid var(--comfier-icon-color,var(--color-muted-foreground,var(--muted-foreground,#8a8a8a)))!important;
  border-radius:4px!important;
  background:transparent!important;
  box-shadow:none!important;
  accent-color:var(--comfier-icon-color,var(--color-muted-foreground,var(--muted-foreground,#8a8a8a)))!important
}
#comfier-multiselect-toggle input[type="checkbox"]::after{
  content:""!important;display:block!important;
  width:5px!important;height:10px!important;
  border:solid var(--comfier-icon-text,var(--comfier-accent-text,#000))!important;
  border-width:0 2px 2px 0!important;
  transform:translateY(-1px) rotate(45deg) scale(0)!important;
  transform-origin:center!important
}
#comfier-multiselect-toggle input[type="checkbox"]:checked{
  border-color:var(--comfier-icon-color,var(--color-base-foreground,var(--fg-color,#fff)))!important;
  background:var(--comfier-icon-color,var(--color-base-foreground,var(--fg-color,#fff)))!important
}
#comfier-multiselect-toggle input[type="checkbox"]:checked::after{
  transform:translateY(-1px) rotate(45deg) scale(1)!important
}

#comfier-ui-zoom-test .ui-zoom-reset{border-color:var(--comfier-accent)!important;background:var(--comfier-accent)!important;color:var(--comfier-accent-text)!important;font-weight:700!important}
#comfier-ui-zoom-test input[type="range"],#comfier-ui-zoom-test input[type="checkbox"],#comfier-multiselect-toggle input[type="checkbox"]{accent-color:var(--comfier-accent)!important}`;if(window.__comfierThemeManifest)compatibility.textContent=window.__comfierThemeManifest.nativeLegacyCss(compatibility.textContent);document.head.appendChild(compatibility);
  const style=document.createElement('style');style.id='comfier-accent-theme-style';
  style.textContent=`
.ui-accent-row{display:flex;flex-wrap:nowrap;align-items:center;gap:4px;min-width:0;grid-column:1/-1!important}
.ui-accent-row>label{flex:0 0 auto;font-size:12px;font-weight:600;white-space:nowrap}
.ui-accent-entry{flex:0 0 auto;display:flex;align-items:center;gap:3px}
.ui-accent-hex{box-sizing:content-box;width:6ch;min-width:6ch;max-width:6ch;padding:5px 4px;border:1px solid var(--comfier-accent);border-radius:5px;background:var(--comfy-input-bg,#222);color:var(--input-text,#fff);font:14px monospace;touch-action:manipulation}
.ui-accent-row>button{flex:0 0 auto;min-width:0}
.ui-accent-row>button[data-accent="set"]{margin-left:auto;display:grid;place-items:center}
.ui-accent-row>button[data-accent="set"]>span,.ui-accent-row>button[data-accent="set"]::after{grid-area:1/1}
.ui-accent-row>button[data-accent="set"]::after{content:"Reset";visibility:hidden}
html body :is(.sidebar-icon-badge,.comfier-active-counter){background-color:var(--comfier-ui-font,var(--color-primary-background,#168ed0))!important;color:var(--comfier-icon-color,var(--color-base-foreground,#fff))!important;-webkit-text-fill-color:var(--comfier-icon-color,var(--color-base-foreground,#fff))!important}
.ui-font-row{display:flex;flex-wrap:nowrap;align-items:center;gap:4px;min-width:0;grid-column:1/-1!important}
.ui-font-row>label{flex:0 0 auto;font-size:12px;font-weight:600;white-space:nowrap}
.ui-font-entry{flex:0 0 auto;display:flex;align-items:center;gap:3px}
.ui-font-hex{box-sizing:content-box;width:6ch;min-width:6ch;max-width:6ch;padding:5px 4px;border:1px solid var(--comfier-accent);border-radius:5px;background:var(--comfy-input-bg,#222);color:var(--input-text,#fff);font:14px monospace;touch-action:manipulation}
.ui-font-row>button{flex:0 0 auto;min-width:0}
.ui-font-row>button[data-ui-font="set"]{margin-left:auto;display:grid;place-items:center}
.ui-font-row>button[data-ui-font="set"]>span,.ui-font-row>button[data-ui-font="set"]::after{grid-area:1/1}
.ui-font-row>button[data-ui-font="set"]::after{content:"Reset";visibility:hidden}
`;
  style.textContent+=`
/* UI Font Color: text groups only, without changing typography or surfaces. */
html body :is(#comfier-ui-zoom-test,.comfier-app-settings-native-panel) .ui-zoom-panel,
html body :is(#comfier-ui-zoom-test,.comfier-app-settings-native-panel) :is(.ui-accent-hex,.ui-font-hex){
  color:var(--comfier-ui-font,#ffffff)!important
}
html body .comfier-app-settings-native-panel .ui-zoom-panel :is(label,span,div,button,input[type="text"]){
  color:var(--comfier-ui-font,#ffffff)!important
}
/* The original cleanup stylesheet assigns button foregrounds through the
   ID-qualified .ui-zoom-reset rule. Retain that button styling, but give the
   user-selected font color a strictly more specific owner in both the
   original host and its relocated native-panel form. */
html body #comfier-ui-zoom-test .ui-zoom-panel :is(.ui-zoom-reset,.ui-zoom-reset>span),
html body #comfier-ui-zoom-test.comfier-app-settings-native-panel .ui-zoom-panel :is(.ui-zoom-reset,.ui-zoom-reset>span),
html body .comfier-app-settings-native-panel .ui-zoom-panel :is(.ui-zoom-reset,.ui-zoom-reset>span){
  color:var(--comfier-ui-font,#ffffff)!important
}
html body :is(${uiTextScopes.join(',')}) :is(${uiTextClasses.join(',')}),
html body .litemenu-entry,
html body span.workflow-label,
html body input[aria-label="Batch Count"],
html body div.overlay[part~="overlay"]{
  color:var(--comfier-ui-font,#ffffff)!important
}
/* Individually requested text, including native node editor fields. */
${individualTextTargets.map(selector=>'html body '+selector).join(',\n')}{
  color:var(--comfier-ui-font,#ffffff)!important
}
/* Exposed shadow-DOM overlay text: color only, never its surface. */
html body ::part(overlay){
  color:var(--comfier-ui-font,#ffffff)!important
}
html body ${searchText}::placeholder{
  color:var(--comfier-ui-font,#ffffff)!important
}
/* This state glyph is not workflow-tab copy. Keep its exact selector after
   UI-font rules so Accent Theme owns only the dirty dot; Comfy continues to
   own the separate hover-only close control and its visibility. */
html body :is(#topbar-workflow-tabs,[data-testid="topbar-workflow-tabs"])
[data-testid="workflow-dirty-indicator"]{
  color:var(--comfier-icon-color,var(--color-base-foreground,var(--fg-color,#fff)))!important;
  -webkit-text-fill-color:var(--comfier-icon-color,var(--color-base-foreground,var(--fg-color,#fff)))!important;
  background-color:var(--comfier-icon-color,var(--color-base-foreground,var(--fg-color,#fff)))!important
}
/* Accent wins on the explicitly listed icon families, including icons that
   appeared in the supplied Fonts section. SVG strokes inherit currentColor. */
html body :is(${themedIconClasses.map(name=>'i[class~="'+name+'"]').join(',')}),
html body :is(${menuIconClasses.map(name=>'span.p-menubar-item-icon[class~="'+name+'"]').join(',')}),
html body svg.p-tree-node-toggle-icon,
html body span.p-tree-node-icon:is(.pi-folder,.pi-file),
html body [data-testid="queue-mode-menu-trigger"]>svg{
  color:var(--comfier-icon-color,var(--color-base-foreground,var(--fg-color,#fff)))!important
}
/* Checked settings switches: color only the track and contrast-safe thumb.
   Unchecked colors, disabled opacity, and movement remain native. */
html body :is([data-testid="settings-dialog"],.comfier-native-settings-panel) button[role="switch"][aria-checked="true"]>span,
html body button[role="switch"][aria-checked="true"]:is([aria-label="Enable or disable pack"],[aria-label="Snap nodes to grid"],[aria-label="Nodes 2.0"],[aria-label="Show connected links"])>span,
html body button[id="Comfy.NodeBadge.ShowApiPricing"][role="switch"][aria-checked="true"]>span{
  background-color:var(--comfier-active-color,var(--color-base-foreground,var(--fg-color,#fff)))!important
}
html body :is([data-testid="settings-dialog"],.comfier-native-settings-panel) button[role="switch"][aria-checked="true"]>span>span,
html body button[role="switch"][aria-checked="true"]:is([aria-label="Enable or disable pack"],[aria-label="Snap nodes to grid"],[aria-label="Nodes 2.0"],[aria-label="Show connected links"])>span>span,
html body button[id="Comfy.NodeBadge.ShowApiPricing"][role="switch"][aria-checked="true"]>span>span{
  background-color:var(--comfier-active-text,var(--comfier-accent-text,#000000))!important
}
`;
  style.textContent+=`
html body span[data-slot="slider-range"].bg-node-component-surface-highlight,
html body span[data-slot="slider-thumb"][role="slider"].bg-node-component-surface-highlight{
  background-color:var(--comfier-active-color,var(--color-base-foreground,var(--fg-color,#fff)))!important
}
html body span[data-slot="slider-thumb"][role="slider"].ring-node-component-surface-selected{
  --tw-ring-color:var(--comfier-active-color,var(--color-base-foreground,var(--fg-color,#fff)))!important
}
`;
  // Native Comfy palette owns these surfaces; app accent still owns glyphs.
  const comfyButtonSurfaces=[
    '#comfier-extensions-toggle',
    'button.lm-top-menu-button',
    'button[aria-label="Toggle properties panel"]',
    'button[data-testid="queue-button"][data-variant="primary"]',
    'button[data-testid="queue-overlay-toggle"]'
  ];
  style.textContent+=`
html body [data-testid="view-mode-toggle"][role="group"]{
  background-color:var(--comfy-menu-bg,var(--color-base-background,#171717))!important
}
html body [data-testid="view-mode-toggle"][role="group"] button.bg-transparent{
  background-color:var(--comfier-control-background,var(--comfier-button-bg,transparent))!important
}
html body [data-testid="view-mode-toggle"][role="group"] button.bg-secondary-background,
${comfyButtonSurfaces.map(selector=>'html body '+selector).join(',\n')},
html body span.flex.size-full.rounded-full.bg-secondary-background:has(>i[class~="icon-[lucide--user]"]){
  background-color:var(--comfier-control-background,var(--comfier-button-bg,var(--color-secondary-background,var(--secondary-background,var(--comfy-input-bg,#242427)))))!important
}
html body [data-testid="view-mode-toggle"][role="group"] button:hover,
html body [data-testid="view-mode-toggle"][role="group"][data-state="open"] button[aria-haspopup="menu"],
${comfyButtonSurfaces.map(selector=>'html body '+selector+':hover').join(',\n')}{
  background-color:var(--comfier-control-background,var(--comfier-button-bg,var(--color-secondary-background-hover,var(--secondary-background-hover,var(--color-secondary-background,var(--comfy-input-bg,#242427))))))!important
}
html body [role="toolbar"][aria-label="Canvas Toolbar"] .bg-interface-panel-selected-surface,
html body [role="toolbar"][aria-label="Canvas Toolbar"] [class~="not-active:bg-interface-panel-selected-surface!"]{
  background-color:var(--comfier-control-background,var(--comfier-button-bg,var(--color-secondary-background,var(--secondary-background,var(--comfy-input-bg,#242427)))))!important
}
html body [role="toolbar"][aria-label="Canvas Toolbar"] button:hover,
html body [role="toolbar"][aria-label="Canvas Toolbar"] button:hover .bg-interface-panel-selected-surface{
  background-color:var(--comfier-control-background,var(--comfier-button-bg,var(--color-secondary-background-hover,var(--secondary-background-hover,var(--color-secondary-background,var(--comfy-input-bg,#242427))))))!important
}
html body .group:hover span.flex.size-full.rounded-full.bg-secondary-background:has(>i[class~="icon-[lucide--user]"]){
  background-color:var(--comfier-control-background,var(--comfier-button-bg,transparent))!important
}
/* Active controls outside the floating sidebar use the same restrained accent
   ring as Extensions Manager. Switches and destructive controls retain their
   dedicated semantic state colors. */
html body :is(
  button:not([role="switch"]):not([data-variant="destructive"])[aria-pressed="true"],
  button:not([role="switch"]):not([data-variant="destructive"])[aria-selected="true"],
  button:not([role="switch"]):not([data-variant="destructive"])[aria-expanded="true"],
  button:not([role="switch"]):not([data-variant="destructive"])[data-state="active"],
  button:not([role="switch"]):not([data-variant="destructive"])[data-state="checked"],
  .side-bar-button-selected,
  [data-testid="view-mode-toggle"][role="group"] button.bg-secondary-background,
  [role="toolbar"][aria-label="Canvas Toolbar"] .bg-interface-panel-selected-surface,
  [role="toolbar"][aria-label="Canvas Toolbar"] [class~="not-active:bg-interface-panel-selected-surface!"]
){
  background-color:var(--comfier-control-background,var(--comfier-button-bg,var(--color-secondary-background,var(--secondary-background,var(--comfy-input-bg,#242427)))))!important;
  box-shadow:inset 0 0 0 1px var(--comfier-active-color,var(--color-base-foreground,var(--fg-color,#fff)))!important
}
/* The floating sidebar intentionally retains the stronger 33% accent fill. */
html body :is(
  .side-tool-bar-container .side-bar-button-selected,
  .comfier-unified-floating-rail .side-bar-button-selected,
  .side-tool-bar-container button[aria-pressed="true"],
  .comfier-unified-floating-rail button[aria-pressed="true"]
){
  background-color:color-mix(in srgb,var(--comfier-active-color,var(--color-base-foreground,var(--fg-color,#fff))) 33%,transparent)!important;
  box-shadow:none!important
}
/* Selected workflow documents use only themed foregrounds and their existing
   accent bottom line: never the general active fill or outline. */
html body :is(
  #topbar-workflow-tabs .p-togglebutton.p-togglebutton-checked,
  #topbar-workflow-tabs .p-togglebutton.p-togglebutton-checked > .p-togglebutton-content,
  [data-testid="topbar-workflow-tabs"] .p-togglebutton.p-togglebutton-checked,
  [data-testid="topbar-workflow-tabs"] .p-togglebutton.p-togglebutton-checked > .p-togglebutton-content
){
  background-color:transparent!important;
  box-shadow:none!important
}
/* Surgically assigned permanent wireframe/background treatments. */
/* Upper-left workflow-mode controls: remove button fills only. */
html body :is(
  #comfier-workflow-actions-floating-dock button,
  [data-testid="view-mode-toggle"][role="group"][aria-label="Workflow actions"] button
){
  background-color:transparent!important
}
/* Upper-right action controls: transparent surfaces with a permanent ring. */
html body :is(
  [data-testid="action-bar-card"]>.actionbar-container button:not([data-variant="destructive"]),
  [data-testid="top-menu-actionbars"]>div:has(>button[aria-label="Manage extensions"])>button:not([data-variant="destructive"]),
  #comfier-extensions-toggle,
  button.lm-top-menu-button,
  button[aria-label="Toggle properties panel"]
){
  background-color:var(--comfier-control-background,var(--comfier-button-bg,transparent))!important;
  box-shadow:inset 0 0 0 1px var(--comfier-button-frame,var(--color-base-foreground,var(--fg-color,#fff)))!important
}
/* Lower-left queue dock: transparent surfaces with persistent wireframes. */
html body .comfier-early-queue-dock .comfier-early-queue-panel :is(
  button,
  input
){
  background-color:var(--comfier-control-background,var(--comfier-button-bg,transparent))!important;
  box-shadow:inset 0 0 0 1px var(--comfier-button-frame,var(--color-base-foreground,var(--fg-color,#fff)))!important
}
/* Interrupt changes between secondary/disabled and destructive/active. Its
   native X remains centered while both states share the requested 2px ring. */
html body .comfier-early-queue-dock .comfier-early-queue-panel
button:has(>i[class*="lucide--x"]){
  background-color:var(--comfier-control-background,var(--comfier-button-bg,transparent))!important;
  box-shadow:inset 0 0 0 2px var(--comfier-button-frame,var(--color-base-foreground,var(--fg-color,#fff)))!important;
  pointer-events:auto!important;
  touch-action:manipulation!important;
  position:relative!important;
  z-index:2!important
}
html body .comfier-early-queue-dock .comfier-early-queue-panel
button:has(>i[class*="lucide--x"])>i{
  color:var(--comfier-icon-color,var(--color-base-foreground,var(--fg-color,#fff)))!important
}
html body .comfier-early-queue-dock .comfier-early-queue-panel
button:has(>i[class*="lucide--x"]):not(:disabled):active{
  background-color:color-mix(in srgb,var(--comfier-active-color,var(--color-base-foreground,var(--fg-color,#fff))) 28%,transparent)!important;
  transform:scale(.94)!important
}
/* Lower-right Canvas Toolbar: pointer has no fill; route-off is permanently
   wireframed while keeping its native surface. */
html body [role="toolbar"][aria-label="Canvas Toolbar"]
button:has(i[class*="lucide--mouse-pointer-2"]){
  background-color:var(--comfier-control-background,var(--comfier-button-bg,transparent))!important
}
/* Canvas Toolbar glyphs can be icon-font pseudo-elements, Iconify masks, or
   inline SVG. Color every representation without clearing masked backgrounds. */
html body [role="toolbar"][aria-label="Canvas Toolbar"] button :is(
  i,
  svg,
  [class*="icon-"],
  .p-icon
){
  color:var(--comfier-icon-color,var(--color-base-foreground,var(--fg-color,#fff)))!important
}
html body [role="toolbar"][aria-label="Canvas Toolbar"] button svg
[stroke]:not([stroke="none"]){
  stroke:var(--comfier-icon-color,var(--color-base-foreground,var(--fg-color,#fff)))!important
}
html body [role="toolbar"][aria-label="Canvas Toolbar"] button svg
[fill]:not([fill="none"]){
  fill:var(--comfier-icon-color,var(--color-base-foreground,var(--fg-color,#fff)))!important
}
html body [role="toolbar"][aria-label="Canvas Toolbar"]
button:has(i[class*="lucide--route-off"]){
  box-shadow:inset 0 0 0 1px var(--comfier-button-frame,var(--color-base-foreground,var(--fg-color,#fff)))!important
}
/* Canvas Mode's icon tile and Iconify glyph are separate layers. Clear only
   the tile so the masked pointer/hand remains painted in both native states. */
html body [role="toolbar"][aria-label="Canvas Toolbar"]
button:has(i[class*="lucide--mouse-pointer-2"],i[class*="lucide--hand"])
>div>div:has(>i[class*="lucide--mouse-pointer-2"],>i[class*="lucide--hand"]){
  background-color:transparent!important
}
/* Comfy paints the RUN cluster and batch wrapper independently of each child. */
html body .comfier-early-queue-dock .comfier-early-queue-panel :is(
  .queue-button-group,
  .batch-count>div
){
  background-color:transparent!important
}
`;
  if(window.__comfierThemeManifest)style.textContent=window.__comfierThemeManifest.nativeLegacyCss(style.textContent);
  document.head.appendChild(style);
  function limitHexInput(input) {
    input.maxLength=6;
    input.addEventListener('input',()=>{
      if(input.value.length>6)input.value=input.value.slice(0,6);
      input.setCustomValidity('');
    });
  }
  function mount() {
    roots.forEach(id=>{
      const panel=document.getElementById(id)?.querySelector('.ui-zoom-panel');
      if(!panel)return;
      if(!panel.querySelector('.ui-accent-row')){
        const row=document.createElement('div');row.className='ui-accent-row';
        row.innerHTML=`<label for="${id}-accent-hex">Accent Theme</label><span class="ui-accent-entry"><span aria-hidden="true">#</span><input id="${id}-accent-hex" class="ui-accent-hex" type="text" maxlength="6" size="6" pattern="[0-9a-fA-F]{6}" autocomplete="off" autocapitalize="none" spellcheck="false" aria-label="Accent Theme six-digit hex code"></span><button type="button" class="ui-zoom-reset" data-accent="set"><span>Set</span></button><button type="button" class="ui-zoom-reset" data-accent="reset">Reset</button>`;
        const input=row.querySelector('input');input.value=current.slice(1);
        function submit(){if(!normalize(input.value)){input.setCustomValidity('Enter exactly six hex digits (0–9, A–F).');input.reportValidity();return;}if(!set(input.value)){input.setCustomValidity('Could not save the accent. Please try again.');input.reportValidity();}}
        limitHexInput(input);
        input.addEventListener('paste',e=>{const value=normalize(e.clipboardData?.getData('text'));if(value){e.preventDefault();input.value=value.slice(1);input.setCustomValidity('');}});
        input.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();submit();}});
        row.querySelector('[data-accent="set"]').addEventListener('click',submit);
        row.querySelector('[data-accent="reset"]').addEventListener('click',()=>{input.value=DEFAULT.slice(1);submit();});
        panel.appendChild(row);
      }
      if(!panel.querySelector('.ui-font-row')){
        const row=document.createElement('div');row.className='ui-font-row';
        row.innerHTML=`<label for="${id}-ui-font-hex">UI Font Color</label><span class="ui-font-entry"><span aria-hidden="true">#</span><input id="${id}-ui-font-hex" class="ui-font-hex" type="text" maxlength="6" size="6" pattern="[0-9a-fA-F]{6}" autocomplete="off" autocapitalize="none" spellcheck="false" aria-label="UI Font Color six-digit hex code"></span><button type="button" class="ui-zoom-reset" data-ui-font="set"><span>Set</span></button><button type="button" class="ui-zoom-reset" data-ui-font="reset">Reset</button>`;
        const input=row.querySelector('input');input.value=currentUiFont.slice(1);
        function submit(){if(!normalize(input.value)){input.setCustomValidity('Enter exactly six hex digits (0–9, A–F).');input.reportValidity();return;}if(!setUiFont(input.value)){input.setCustomValidity('Could not save the UI font color. Please try again.');input.reportValidity();}}
        limitHexInput(input);
        input.addEventListener('paste',e=>{const value=normalize(e.clipboardData?.getData('text'));if(value){e.preventDefault();input.value=value.slice(1);input.setCustomValidity('');}});
        input.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();submit();}});
        row.querySelector('[data-ui-font="set"]').addEventListener('click',submit);
        row.querySelector('[data-ui-font="reset"]').addEventListener('click',()=>{input.value=UI_FONT_DEFAULT.slice(1);submit();});
        panel.appendChild(row);
      }
    });
  }
  function refresh() {
    let accent=current,font=currentUiFont;
    try { accent=normalize(window.ComfierApp?.getAccentTheme?.()) || accent; } catch (_) {}
    try { font=normalize(window.ComfierApp?.getUiFontColor?.()) || font; } catch (_) {}
    paint(accent);scheduleUiFont(font);mount();
  }
  window.__comfierAccentTheme={mount,refresh,set,setActive:scheduleNodeOutline,setCanvasText:scheduleCanvasText,get:()=>current,setUiFont,getUiFont:()=>currentUiFont};
  window.__comfierSettingsRows?.register('theme',mount);
  refresh();
})();
