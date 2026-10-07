(() => {
  'use strict';
  if(window.__comfierThemeManifest)return;
  const roles=[
    ['buttonBg','Button Backgrounds','--comfier-button-bg','#242427'],
    ['buttonFrame','Button Frames','--comfier-button-frame','#ffffff'],
    ['icons','Icons','--comfier-icon-color','#ffffff'],
    ['canvasBg','Canvas','--comfier-canvas-bg','#222222'],
    ['nodeBg','Node Backgrounds','--comfier-node-bg','#353535'],
    ['nodeLabel','Node Labels','--comfier-node-label','#333333'],
    ['socketModel','Model Sockets','--comfier-socketModel','#aaaaaa'],
    ['socketClip','CLIP Sockets','--comfier-socketClip','#aaaaaa'],
    ['socketVae','VAE Sockets','--comfier-socketVae','#aaaaaa'],
    ['socketLatent','Latent Sockets','--comfier-socketLatent','#aaaaaa'],
    ['socketMask','Mask Sockets','--comfier-socketMask','#aaaaaa'],
    ['socketConditioning','Positive / Negative Sockets','--comfier-socketConditioning','#aaaaaa'],
    ['socketHidden','Hidden Sockets','--comfier-socketHidden','#aaaaaa'],
    ['socketOther','Other Sockets','--comfier-socketOther','#aaaaaa'],
    ['containerBg','Container Backgrounds','--comfier-container-bg','#242427'],
    ['containerFrame','Container Frames','--comfier-container-frame','#3b4554'],
    ['active','Active State','--comfier-active-color','#ffffff'],
    ['panelBg','Panel Backgrounds','--comfier-panel-bg','#171717'],
    ['panelFrame','Panel Frames','--comfier-panel-frame','#3b4554'],
    ['progress','Progress','--comfier-progress-fill','#ffffff'],
    ['uiText','UI Font','--comfier-ui-font','#ffffff'],
    ['promptText','Canvas Font','--comfier-prompt-text','#dddddd'],
    ['success','Success','--comfier-success-color','#22c55e'],
    ['error','Errors','--comfier-error-color','#ef4444']
  ].map(([id,label,variable,defaultColor])=>({id,label,variable,defaultColor}));
  const nativeSwatches={icons:'var(--color-base-foreground,var(--fg-color,#fff))',buttonFrame:'var(--interface-stroke,var(--border-color,#4e4e4e))',buttonBg:'var(--color-secondary-background,#303030)',panelBg:'var(--comfy-menu-bg,#171718)',panelFrame:'var(--interface-stroke,var(--border-color,#4e4e4e))',containerBg:'var(--color-interface-panel-surface,var(--comfy-menu-bg,#171718))',containerFrame:'var(--interface-stroke,var(--border-color,#4e4e4e))',uiText:'var(--color-base-foreground,var(--fg-color,#fff))',promptText:'var(--input-text,#ddd)',active:'var(--color-primary-background,#0b8ce9)',progress:'var(--color-interface-panel-job-progress-primary,#0b8ce9)',error:'var(--color-destructive-background,#e00)',success:'var(--color-success-background,#22c55e)'};
  Object.assign(nativeSwatches,{canvasBg:'#222222',nodeBg:'var(--component-node-background,#353535)',nodeLabel:'var(--node-component-header-surface,#333333)'});
  Object.assign(nativeSwatches,{socketModel:'var(--color-datatype-MODEL,#aaaaaa)',socketClip:'var(--color-datatype-CLIP,#aaaaaa)',socketVae:'var(--color-datatype-VAE,#aaaaaa)',socketLatent:'var(--color-datatype-LATENT,#aaaaaa)',socketMask:'var(--color-datatype-MASK,#aaaaaa)',socketConditioning:'var(--color-datatype-CONDITIONING,#aaaaaa)',socketHidden:'var(--color-datatype-HIDDEN,#aaaaaa)',socketOther:'var(--color-datatype-OTHER,#aaaaaa)'});
  const groups=[];
  const add=(id,selectors,bindings,source,extra={})=>groups.push({id,selectors,bindings,source,status:'live',...extra});
  const binding=(role,property,value)=>({role,property,value});
  const paint=(role,property='color',fallback='#fff')=>{const value=`var(${roles.find(r=>r.id===role).variable},${fallback})`;return binding(role,property,role==='buttonBg'?`var(--comfier-control-background,${value})`:value)};
  add('active-counter-background',['.sidebar-icon-badge','.comfier-active-counter'],[paint('uiText','background-color')],'Job History and Downloads badges');
  add('active-counter-text',['.sidebar-icon-badge','.comfier-active-counter'],[paint('icons'),paint('icons','-webkit-text-fill-color')],'Job History and Downloads badge numbers');
  add('canvas-background',['#graph-canvas-container'],[paint('canvasBg','background-color')],'LiteGraph clear_background_color; canvas host');
  add('node-body',['[data-testid="node-inner-wrapper"]'],[paint('nodeBg','--component-node-background')],'Vue node body');
  add('node-label',['[data-testid="node-inner-wrapper"]'],[paint('nodeLabel','background-color')],'Vue node header surface');
  const nativeAlpha=(role,base)=>`rgb(from ${base} var(--comfier-${role==='panelBg'?'panel':'container'}-bg-rgb) / calc(alpha * var(--comfier-${role}-opacity,1)))`;
  const surface=(id,selectors,family,base,source)=>add(id,selectors,[
    binding(family+'Bg','background-color',`var(--comfier-${id}-paint,${base})`),
    paint(family+'Frame','border-color','var(--interface-stroke,#3b4554)'),
    binding(family+'Frame','--shadow-inset-highlight',`inset 0 0 0 1px var(--comfier-${family}-frame,var(--interface-stroke,#3b4554))`)
  ],source,{alphaSource:base,paintVariable:'--comfier-'+id+'-paint',paintExpression:nativeAlpha(family+'Bg',base)});
  surface('panel-app-mode',['#comfier-apps-panel','.comfier-lite-form','.comfier-lite-manager'],'panel','var(--comfy-menu-bg,#171717)','comfier_workflow_apps.js');
  const rootPanel='.comfier-early-floating-panel:not(:has(.comfier-app-settings-native-panel))';
  const canvasBar='[role="toolbar"][aria-label="Canvas Toolbar"]';
  surface('container-actionbar',['[data-testid="action-bar-card"]'],'container','var(--color-interface-panel-surface,var(--comfy-menu-bg,#171717))','src/components/TopMenuSection.vue');
  surface('container-sidebar-rail',['.comfier-unified-floating-rail','.side-tool-bar-container .sidebar-item-group','.side-tool-bar-container .floating-panel'],'container','var(--color-interface-panel-surface,var(--comfy-menu-bg,#171717))','src/components/sidebar/SideToolbar.vue; comfier_unified_sidebar.js');
  surface('container-workflow-menu',['[data-testid="view-mode-toggle"][role="group"]'],'container','var(--comfy-menu-bg,#171717)','src/components/common/WorkflowActionsDropdown.vue; comfier_accent_theme.js');
  add('container-workflow-dock-frame',['#comfier-workflow-actions-floating-dock'],[
    binding('containerFrame','outline','1px solid var(--comfier-container-frame)'),
    binding('containerFrame','border-radius','8px')
  ],'comfier_workflow_floating_trigger.js');
  add('container-workflow-inner-frame-released',
    ['#comfier-workflow-actions-floating-dock > [data-testid="view-mode-toggle"][role="group"]'],[
      binding('containerFrame','border-color','transparent'),
      binding('containerFrame','box-shadow','none')
    ],'src/components/common/WorkflowActionsDropdown.vue; comfier_workflow_floating_trigger.js');
  surface('container-canvas-toolbar',[canvasBar],'container','var(--color-interface-panel-surface,var(--comfy-menu-bg,#171717))','src/components/graph/GraphCanvasMenu.vue');
  surface('container-run-dock',['.comfier-early-queue-dock'],'container','var(--color-interface-panel-surface,var(--comfy-menu-bg,#171717))','comfier_early_floating_panels.js');
  surface('panel-sidebar-shell',[rootPanel],'panel','var(--comfy-menu-bg,#171717)','comfier_early_floating_panels.js');
  surface('panel-bottom-shell',['.comfier-early-floating-bottom'],'panel','var(--comfy-menu-bg,#171717)','comfier_early_floating_panels.js');
  surface('panel-lora-shell',['#comfier-lora-manager-panel'],'panel','var(--comfy-menu-bg,#171717)','comfier_lora_panel.js');
  surface('panel-precision-shell',['#comfier-ltx-precision-panel'],'panel','var(--comfy-menu-bg,#171717)','comfier_ltx_precision_panel.js');
  surface('panel-downloads-shell',['#comfier-downloads-bottom-panel'],'panel','var(--comfy-menu-bg,#171718)','comfier_download_monitor.js');
  surface('panel-prompt-editor',['#comfier-prompt-popup'],'panel','#171717','comfier_prompt_popup.js');
  surface('panel-node-properties',['#node-panel.litegraph.dialog.settings'],'panel','var(--comfy-menu-bg,#171717)','comfier_ui_cleanup.js; src/lib/litegraph/public/css/litegraph.css');
  surface('panel-dialogs',['.p-dialog:not(.comfier-extensions-panel)'],'panel','var(--comfy-menu-bg,#171717)','src/components/dialog; comfier_owned_overlay_layers.js');
  surface('panel-menus',['.comfier-mini-panel','.p-menu','.p-tieredmenu','.p-contextmenu','.litecontextmenu','[data-reka-menu-content]','[role="listbox"]'],'panel','var(--comfy-menu-bg,#171717)','src/components/common/DropdownMenu.vue; comfier_transient_menus.js');
  surface('panel-queue-progress',['[data-testid="queue-progress-overlay"]'],'panel','var(--color-interface-panel-surface,var(--comfy-menu-bg,#171717))','src/components/queue/QueueProgressOverlay.vue');
  add('panel-native-content-tokens',[rootPanel,'.comfier-early-floating-bottom','#comfier-ltx-precision-panel','.p-dialog:not(:has(#comfier-ui-zoom-test))'],[
    binding('panelBg','--color-base-background','var(--comfier-panel-paint,var(--comfy-menu-bg,#171717))'),
    binding('panelBg','--color-interface-panel-surface','var(--comfier-panel-paint,var(--comfy-menu-bg,#171717))'),
    paint('panelFrame','--color-interface-stroke','var(--interface-stroke,#3b4554)'),
    paint('uiText','--color-base-foreground','#000'),paint('uiText','--color-muted-foreground','#000')
  ],'src/components/sidebar/tabs/SidebarTabTemplate.vue; packages/design-system/src/css/style.css');
  add('panel-downloads-inner',['#comfier-downloads-bottom-panel .p-tablist','#comfier-downloads-bottom-panel .comfier-downloads-list','#comfier-downloads-bottom-panel .comfier-download-row'],[
    binding('panelBg','background-color','transparent'),paint('uiText'),paint('panelFrame','border-color','#3b4554')
  ],'comfier_download_monitor.js');
  add('panel-lora-header',['#comfier-lora-manager-panel>header'],[binding('panelBg','background-color','transparent'),paint('panelFrame','border-color','#3b4554')],'comfier_lora_panel.js');
  add('panel-extensions-interior',['.comfier-extensions-panel>.p-dialog-content','.comfier-extensions-panel .manager-dialog'],[binding('panelBg','background-color','transparent')],'comfier_extensions_panel.js; src/workbench/extensions/manager/components/ManagerDialog.vue');
  const icons=['.side-bar-button :is(svg,i,.side-bar-button-icon)',`${canvasBar} button :is(svg,i,.p-icon)`,'[data-testid="action-bar-card"] button :is(svg,i)','[data-testid="view-mode-toggle"] i','.comfy-menu-button-wrapper .comfyui-logo'];
  add('icons-navigation',icons,[paint('icons')],'src/components/sidebar/SidebarIcon.vue; src/components/graph/GraphCanvasMenu.vue; comfier_accent_theme.js');
  add('icons-node-resize',['#comfier-node-resize-handles button:not(.dragging)','.comfier-side-resize:not(.dragging)'],[paint('icons')],'comfier_node_resize_handles.js');
  add('icons-node-move',['#cm-move .cm-move-button:not(.dragging)'],[paint('icons')],'comfier_multi_select_move_handle.js');
  add('icons-memory-tools',['i.mdi.mdi-vacuum-outline::before'],[paint('icons')],'comfier_accent_theme.js; user-confirmed memory tool DOM');
  add('icons-multi-label',['#comfier-multiselect-toggle .comfier-multiselect-label'],[paint('icons')],'comfier_sidebar_bootstrap.js');
  add('icons-multi-box',['#comfier-multiselect-toggle input[type="checkbox"]'],[paint('icons','border-color'),paint('icons','accent-color')],'comfier_accent_theme.js');
  add('icons-multi-checked',['#comfier-multiselect-toggle input[type="checkbox"]:checked'],[paint('icons','background-color'),paint('icons','border-color')],'comfier_accent_theme.js');
  add('icons-multi-checkmark',['#comfier-multiselect-toggle input[type="checkbox"]::after'],[binding('icons','border-color','var(--comfier-icon-text,#000)')],'comfier_accent_theme.js');
  add('icons-dirty-indicator',['[data-testid="workflow-dirty-indicator"]'],[paint('icons','background-color')],'src/components/topbar/WorkflowTabs.vue; comfier_accent_theme.js');
  add('buttons-panel-controls',['.comfier-early-floating-panel button:not([role="switch"]):not(.side-bar-button)','.comfier-early-floating-bottom button','#comfier-lora-manager-panel>header>button','#comfier-ltx-precision-panel button'],[
    paint('buttonFrame','border-color'),paint('buttonBg','background-color','var(--color-secondary-background,#242427)')
  ],'comfier_lora_panel.js; comfier_ltx_precision_panel.js; src/components/sidebar/tabs');
  add('buttons-workflow-dropdown-frame',['[data-testid="view-mode-toggle"][role="group"] button.bg-secondary-background','[data-testid="view-mode-toggle"][role="group"] button[aria-expanded="true"]','[data-testid="view-mode-toggle"][aria-haspopup="menu"]','#comfier-workflow-actions-floating-dock button'],[binding('buttonFrame','box-shadow','inset 0 0 0 1px var(--comfier-button-frame)')],'src/components/common/WorkflowActionsDropdown.vue');
  add('buttons-toolbar-backgrounds',[`${canvasBar} button`,'[data-testid="action-bar-card"] button','.comfier-early-queue-panel button','[data-testid="view-mode-toggle"] button'],[
    paint('buttonBg','background-color','transparent')
  ],'comfier_accent_theme.js');
  add('buttons-downloads',['#comfier-downloads-bottom-panel button'],[paint('buttonFrame','border-color'),paint('buttonBg','background-color','transparent')],'comfier_download_monitor.js');
  add('progress-downloads',['#comfier-downloads-bottom-panel progress'],[paint('progress','accent-color')],'comfier_download_monitor.js');
  add('progress-downloads-webkit',['#comfier-downloads-bottom-panel progress::-webkit-progress-value'],[paint('progress','background-color')],'comfier_download_monitor.js');
  add('progress-downloads-gecko',['#comfier-downloads-bottom-panel progress::-moz-progress-bar'],[paint('progress','background-color')],'comfier_download_monitor.js');
  add('progress-native-fill',['.p-progressbar-value','[data-testid="queue-inline-progress"]>.bg-interface-panel-job-progress-primary','[data-slot="progress-indicator"]'],[paint('progress','background-color')],'src/components/queue/QueueInlineProgress.vue; PrimeVue ProgressBar');
  add('progress-native-secondary',['[data-testid="queue-inline-progress-node-fill"]'],[binding('progress','background-color','color-mix(in srgb,var(--comfier-progress-fill,#fff) 55%,transparent)')],'src/components/queue/QueueInlineProgress.vue');
  add('text-prompt-editors',['#comfier-prompt-popup .comfier-prompt-popup-editor','textarea.comfy-multiline-input','textarea[hideonzoom="true"][data-capture-wheel="true"]','textarea[data-capture-wheel="true"]'],[paint('promptText'),paint('promptText','-webkit-text-fill-color')],'comfier_prompt_popup.js; src/renderer/extensions/vueNodes/widgets/utils/multilineTextarea.ts; src/renderer/extensions/vueNodes/widgets/components/WidgetTextarea.vue');
  for(const kind of ['error','success']){
    add('status-'+kind+'-message',[`.p-toast-message-${kind}`,`.p-message-${kind}`,`[data-severity="${kind}"]`],[paint(kind,'border-color'),paint(kind,'color')],'src/components/toast/GlobalToast.vue; PrimeVue Toast/Message');
    add('status-'+kind+'-text',[kind==='error'?'.text-destructive-background':'.text-success-background'],[paint(kind)],'packages/design-system/src/css/style.css');
  }
  add('status-error-overlay',['[data-testid="error-overlay"]'],[paint('error','border-color')],'src/components/rightSidePanel/errors; comfier_owned_overlay_layers.js');
  add('status-destructive-buttons',['button[data-variant="destructive"]:not(.comfier-early-queue-panel button)'],[paint('error','background-color'),binding('error','color','var(--comfier-error-text,#fff)')],'packages/design-system; src/components/actionbar');
  add('active-precision-edge',['#comfier-ltx-precision-panel .comfier-ltx-edge.active'],[paint('active','background-color'),binding('active','color','var(--comfier-active-text,#000)')],'comfier_ltx_precision_panel.js');
  add('active-control-surface',[
    'button:not([role="switch"]):not([data-variant="destructive"]):is([aria-pressed="true"],[aria-selected="true"],[aria-expanded="true"],[data-state="active"],[data-state="checked"])',
    '.side-bar-button-selected'
  ],[binding('active','--comfier-control-background','color-mix(in srgb,var(--comfier-active-color,#fff) 28%,transparent)')],'comfier_accent_theme.js');
  add('active-rail-surface',['.comfier-unified-floating-rail .side-bar-button-selected','.side-tool-bar-container .side-bar-button-selected'],[
    binding('active','--comfier-control-background','color-mix(in srgb,var(--comfier-active-color,#fff) 33%,transparent)'),
    binding('active','background-color','var(--comfier-control-background)')
  ],'comfier_accent_theme.js; src/components/sidebar/SidebarIcon.vue');
  const inventory=[
    ['panel-assets','panelBg,panelFrame,uiText','src/components/sidebar/tabs/AssetsSidebarTab.vue'],
    ['panel-assets-batch','panelBg,panelFrame,uiText','src/components/queue/job/JobAssetsList.vue'],
    ['panel-history','panelBg,panelFrame,uiText','src/components/sidebar/tabs/JobHistorySidebarTab.vue'],
    ['panel-workflows','panelBg,panelFrame,uiText','src/components/sidebar/tabs/WorkflowsSidebarTab.vue'],
    ['panel-models','panelBg,panelFrame,uiText','src/components/sidebar/tabs/ModelLibrarySidebarTab.vue'],
    ['panel-nodes','panelBg,panelFrame,uiText','src/components/sidebar/tabs/NodeLibrarySidebarTab.vue'],
    ['panel-templates','panelBg,panelFrame,uiText','comfier_templates_sidebar.js'],
    ['panel-comfy-settings','panelBg,panelFrame,uiText','comfier_native_settings_sidebar.js'],
    ['panel-properties','panelBg,panelFrame,uiText','src/components/rightSidePanel; comfier_early_floating_panels.js'],
    ['panel-logs','panelBg,panelFrame,uiText','comfier_early_floating_panels.js'],
    ['buttons-run-batch-options','buttonFrame,buttonBg','comfier_accent_theme.js; src/components/actionbar/ComfyRunButton/ComfyQueueButton.vue'],
    ['buttons-interrupt','buttonFrame,buttonBg','comfier_accent_theme.js'],
    ['icons-run-lora-masks','icons','comfier_accent_theme.js'],
    ['icons-common-families','icons','comfier_accent_theme.js:themedIconClasses/menuIconClasses'],
    ['icons-canvas-svg','icons','comfier_accent_theme.js'],
    ['active-sidebar','active','comfier_accent_theme.js'],
    ['active-workflow-tab','active','comfier_accent_theme.js; src/components/topbar/WorkflowTabs.vue'],
    ['active-switches','active','comfier_accent_theme.js'],
    ['active-slider','active','comfier_accent_theme.js'],
    ['icons-node-selection','icons','comfier_accent_theme.js:applyNodeOutline'],
    ['icons-node-handles','icons','comfier_node_resize_handles.js; comfier_multi_select_move_handle.js'],
    ['icons-panel-grips','icons','comfier_gutter_grips.js'],
    ['text-ui-scopes','uiText','comfier_accent_theme.js:uiTextScopes/uiTextClasses/individualTextTargets'],
    ['text-search-fields','uiText','comfier_accent_theme.js:searchText']
  ];
  inventory.forEach(([id,categories,source])=>groups.push({id,categories:categories.split(','),source,status:'owner-rules',owner:'comfier_accent_theme.js or named feature',selectors:[],bindings:[]}));
  [
    ['fixed-app-settings','Fixed black translucent shell, white labels/buttons, black button text; swatches retain assigned colors.','comfier_sidebar_bootstrap.js; comfier_theme_studio.js','fixed'],
    ['boundary-lora-document','Host frame is themed. Embedded LoRA page has separate document/CSS ownership.','comfier_lora_panel.js','external-document'],
    ['boundary-gallery-media','Images, videos, posters and fullscreen media remain unmodified.','src/components/sidebar/tabs/AssetsSidebarTab.vue','native'],
    ['boundary-crystools-metrics','Container belongs to container colors; individual CPU/RAM/GPU/VRAM/temp meter scales retain source semantics.','crystools-monitors-root','native'],
    ['boundary-canvas-node-body','Node bodies, sockets, wires, group colors and widget fills belong to the Comfy palette/canvas renderer; selected outlines and LiteGraph text are separately mapped.','src/lib/litegraph; src/renderer/extensions/vueNodes','native'],
    ['boundary-native-android','Connection screens, system keyboard, notifications and Android dialogs are outside the web document.','MainActivity.java; PromptNotificationService.java','native'],
    ['boundary-third-party','Unknown extension CSS, shadow DOM and child documents require explicit adapters; never recolor every div/SVG/image globally.','extension ecosystem','unmapped']
  ].forEach(([id,note,source,status])=>groups.push({id,note,source,status,selectors:[],bindings:[]}));
  const exclusion=':not(:where(.comfier-theme-profiles,.comfier-theme-profiles *,.comfier-theme-editor,.comfier-theme-editor *,.ufu-editor-status,.ufu-editor-status *,.ufu-inspector,.ufu-inspector *,.ufu-confirm,.ufu-confirm *,#comfier-ui-zoom-test,#comfier-ui-zoom-test *,.comfier-app-settings-native-panel,.comfier-app-settings-native-panel *))';
  const optionalRoles=roles.map(r=>r.id);
  const refinementDefaults=`
html:root body :is([data-testid="comfier-app-settings-tab-button"],#comfier-multiselect-toggle){color:var(--comfier-icon-color,var(--color-muted-foreground,var(--muted-foreground,#8a8a8a)))!important}
html:root body #comfier-multiselect-toggle .comfier-multiselect-label{color:var(--comfier-icon-color,var(--color-muted-foreground,var(--muted-foreground,#8a8a8a)))!important}
html:root body #comfier-multiselect-toggle input[type="checkbox"]{border-color:var(--comfier-icon-color,var(--color-muted-foreground,var(--muted-foreground,#8a8a8a)))!important}
html:root body #comfier-multiselect-toggle input[type="checkbox"]:checked{background-color:var(--comfier-icon-color,var(--color-muted-foreground,var(--muted-foreground,#8a8a8a)))!important}
html:root body :is([data-testid="view-mode-toggle"][role="group"] button.bg-secondary-background,[data-testid="view-mode-toggle"][role="group"] button[aria-expanded="true"],[data-testid="view-mode-toggle"][aria-haspopup="menu"],#comfier-workflow-actions-floating-dock button,[role="toolbar"][aria-label="Canvas Toolbar"] .bg-interface-panel-selected-surface){box-shadow:inset 0 0 0 1px var(--comfier-button-frame,var(--color-base-foreground,var(--fg-color,#fff)))!important}
`;
  function compile(){return refinementDefaults+groups.filter(g=>g.bindings.length).map(g=>g.bindings.map(b=>{
    const gate=optionalRoles.includes(b.role)?`[data-comfier-theme-${b.role.toLowerCase()}]`:'';
    const selectors=g.selectors.map(s=>{const i=s.indexOf('::');return 'html:root'+gate+' body '+(i<0?s+exclusion:s.slice(0,i)+exclusion+s.slice(i))});
    return `/* ${g.id}: ${b.role} */\n${selectors.join(',\n')}{${b.property}:${b.value}!important}`;
  }).join('\n')).join('\n')}

  function nativeLegacyCss(css){
    return css.replace(/([^{}]+)\{([^{}]*)\}/g,(all,selector,body)=>{
      if(selector.trim().startsWith('@'))return all;
      const kept=[],gated=[];
      for(const declaration of body.split(';')){
        const colon=declaration.indexOf(':');if(colon<0){kept.push(declaration);continue}
        const property=declaration.slice(0,colon).trim(),value=declaration.slice(colon+1);
        const role=roles.find(r=>value.includes(r.variable));
        if(role&&!['box-shadow','border','border-top','border-bottom','outline'].includes(property)&&!(selector.includes('::before')&&value.includes('--comfier-icon-color'))){
          const pseudo=selector.trim().match(/(::[a-z-]+)$/i);const tail=pseudo?pseudo[1]:'';const target=tail?selector.trim().slice(0,-tail.length):selector.trim();
          gated.push(`:root[data-comfier-theme-${role.id.toLowerCase()}] :is(${target})${tail}{${declaration};}`);
        }else kept.push(declaration);
      }
      return `${selector}{${kept.join(';')}}${gated.join('')}`;
    });
  }
  window.__comfierThemeManifest={schemaVersion:1,upstreamRevision:'ca35810a393789af3389b4e4681ea98bba677e49',roles,groups,optionalRoles,nativeSwatches,compile,nativeLegacyCss};
})();
