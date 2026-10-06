/* Shared internal menu controls. Panel placement belongs to the panel controllers. */
(function(){
'use strict';
if(window.__comfierPanelPolish)return;
const roots=':is(.comfier-download-url-body,.comfier-repository-choice,#comfier-apps-panel,#comfier-workflow-choice,#comfier-ui-zoom-test,.comfier-app-settings-native-panel,.ufu-inspector,.ufu-confirm,.comfier-theme-editor,.comfier-theme-profiles,.comfier-mini-panel,.ufu-editor-status,.ufu-toolbar-menu,#comfier-owned-run-options,#comfier-owned-canvas-zoom,#comfier-owned-feed-preview)';
const controls=':is(button:not(.theme-recent):not(.theme-back),select,textarea,input:not([type=checkbox]):not([type=radio]):not([type=range]):not([type=color]):not([type=hidden]))';
const cloudHeaders=window.__COMFIER_CLOUD_MODE?`
html:root body .comfy-vue-side-bar-container .p-toolbar{display:flex!important;flex-direction:row!important;flex-wrap:nowrap!important;align-items:center!important;justify-content:space-between!important;gap:8px!important}
html:root body .comfy-vue-side-bar-container .p-toolbar-start{display:flex!important;flex-direction:row!important;align-items:center!important;flex:1 1 auto!important;min-width:0!important;text-align:left!important}
html:root body .comfy-vue-side-bar-container .p-toolbar-start>span{min-width:0!important;text-align:left!important;white-space:nowrap!important}
html:root body .comfy-vue-side-bar-container .p-toolbar-end{display:flex!important;flex:0 0 auto!important;align-items:center!important;margin-left:auto!important}
`:'';
const style=document.createElement('style');style.id='comfier-panel-polish-style';style.textContent=cloudHeaders+`
html:root body ${roots}{font-family:system-ui,sans-serif!important;font-size:14px!important;line-height:1.4;color:#fff!important;--comfier-ui-font:#fff!important}
html:root body ${roots} ${controls}{box-sizing:border-box!important;font-family:system-ui,sans-serif!important;font-size:14px!important;line-height:1.3!important;font-weight:500!important;min-height:40px;border:1px solid #aaa!important;border-radius:6px!important;padding:8px!important;background:#fff!important;color:#111!important;-webkit-text-fill-color:#111!important;color-scheme:light;text-align:left}
html:root body ${roots} button:not(.theme-recent):not(.theme-back){text-align:center;cursor:pointer}
html:root body ${roots} button:not(.theme-recent):not(.theme-back) :is(span,i,svg){color:#111!important;-webkit-text-fill-color:#111!important}
html:root body ${roots} :is(label,legend){font-size:14px!important;font-weight:500;text-align:left!important;color:#fff!important;-webkit-text-fill-color:#fff!important}
html:root body ${roots} :is(input,textarea)::placeholder{color:#666!important;-webkit-text-fill-color:#666!important;opacity:1}
html:root body ${roots} ${controls}:focus-visible{outline:2px solid #9dce70!important;outline-offset:2px}
html:root body ${roots} button:disabled{cursor:default;opacity:.5}
html:root body ${roots} :is(h2,h3){font-family:system-ui,sans-serif!important;font-size:18px!important;font-weight:600!important;line-height:1.3!important}
html:root body .comfier-download-url-body.comfier-download-url-body button{text-align:center!important;justify-content:center!important}
html:root body #comfier-download-url-panel#comfier-download-url-panel .comfier-download-url-submit{font-size:25px!important;text-align:center!important}
html:root body #comfier-apps-panel>header{position:relative;justify-content:center!important;min-height:36px}
html:root body #comfier-apps-label{display:block;width:100%;text-align:center;font-size:20px!important;font-weight:600;line-height:1.3;padding-inline:40px;box-sizing:border-box}
html:root body #comfier-apps-panel>header>button{position:absolute;right:0;min-height:32px;width:32px;padding:4px!important;font-size:16px!important}
html:root body #comfier-apps-panel>header>button[hidden]{display:none!important}
html:root body .comfier-lite-form :is(input,textarea,select){width:100%}
html:root body .comfier-lite-form fieldset{border-color:#666}
html:root body .comfier-lite-form :is(h3,legend){color:#fff!important;-webkit-text-fill-color:#fff!important}
html:root body :is(.comfier-workflow-mode-row,.comfier-companion-port-row){align-items:center!important}
html:root body .comfier-workflow-mode-row select{min-width:0;flex:1}
html:root body :is(#comfier-ui-zoom-test,.comfier-app-settings-native-panel) :is(.ufu-launch,.ui-hard-refresh,.ui-disconnect){font-size:14px!important}
html:root body :is(#comfier-ui-zoom-test,.comfier-app-settings-native-panel) .comfier-companion-port-row>p{font-size:12px!important;line-height:1.3!important}
html:root body :is(#comfier-ui-zoom-test,.comfier-app-settings-native-panel) :is(.ui-comfy-version,.ui-app-version,.ui-companion-version){display:block!important;width:100%!important;grid-column:1/-1!important;font:600 11px/1.3 system-ui,sans-serif!important;text-align:center!important;color:#fff!important;-webkit-text-fill-color:#fff!important;overflow-wrap:anywhere;opacity:.82;padding-top:1px}
html:root body :is(#comfier-ui-zoom-test,.comfier-app-settings-native-panel) .ui-hard-refresh{grid-row:12!important}
html:root body :is(#comfier-ui-zoom-test,.comfier-app-settings-native-panel) .ui-disconnect{grid-row:13!important}
html:root body :is(#comfier-ui-zoom-test,.comfier-app-settings-native-panel) .ui-comfy-version{order:103!important;grid-row:14!important}
html:root body :is(#comfier-ui-zoom-test,.comfier-app-settings-native-panel) .ui-app-version{order:104!important;grid-row:15!important}
html:root body :is(#comfier-ui-zoom-test,.comfier-app-settings-native-panel) .ui-companion-version{order:105!important;grid-row:16!important}
html:root body ${roots}${roots}:is(.ufu-inspector,.ufu-confirm) :is(button,select,input){min-height:36px;font-size:13px!important;padding:6px!important}
html:root body ${roots}${roots} :is(.theme-tabs,.theme-profile-extra,.theme-roles) button{min-height:36px;font-size:12px!important;padding:6px!important}
html:root body ${roots}${roots} .theme-roles button{text-align:left!important}
html:root body ${roots}${roots}:is(.ufu-editor-status,.ufu-toolbar-menu,#comfier-owned-run-options,#comfier-owned-canvas-zoom) button{min-height:32px;font-size:13px!important;padding:6px!important}
html:root body #comfier-lora-manager-panel>header{color:#fff!important;font:600 14px/1.3 system-ui,sans-serif!important}
html:root body #comfier-lora-manager-panel>header>button{background:#fff!important;color:#111!important;border:1px solid #aaa!important;border-radius:6px!important}
html:root body ${roots}${roots}.comfier-mini-panel :is(button,a){min-height:32px;font:500 13px/1.3 system-ui,sans-serif!important;text-align:left!important;padding:7px 10px!important}
html:root body ${roots}${roots}.comfier-mini-panel button{background:transparent!important;color:#fff!important;-webkit-text-fill-color:#fff!important;border-color:transparent!important}
html:root body ${roots}${roots}.comfier-mini-panel button :is(span,i,svg){color:#fff!important;-webkit-text-fill-color:#fff!important}
html:root body ${roots}${roots}.comfier-mini-panel :is(button,a):hover{background:#ffffff20!important}
html:root body ${roots}${roots}.comfier-mini-panel header button{min-height:32px;width:32px;padding:4px!important;text-align:center}
html:root body #comfier-ltx-precision-panel :is(.comfier-ltx-precision-controls,.comfier-ltx-frame-controls){color:#fff!important;font-family:system-ui,sans-serif!important}
html:root body #comfier-ltx-precision-panel :is(.comfier-ltx-precision-controls,.comfier-ltx-frame-controls) :is(button,input){font:500 13px/1.3 system-ui,sans-serif!important;background:#fff!important;color:#111!important;-webkit-text-fill-color:#111!important;border:1px solid #aaa!important;border-radius:6px!important}
html:root body #comfier-ltx-precision-panel .comfier-ltx-edge.active{outline:2px solid #9dce70;outline-offset:-2px}

/* 0.91.5: settings rows and aligned dimension fields, without panel-bound changes. */
html:root body ${roots}${roots} :is(.ui-auto-reconnect-row,.ui-generation-notifications-row,.ui-diagnostics-row){display:grid!important;grid-template-columns:minmax(0,1fr) 22px!important;align-items:center!important;text-align:left!important}
html:root body ${roots}${roots} :is(.ui-auto-reconnect-row,.ui-generation-notifications-row,.ui-diagnostics-row)>input[type=checkbox]{grid-column:2!important;grid-row:1!important;justify-self:end!important;margin:0!important}
html:root body ${roots}${roots} :is(.ui-auto-reconnect-row,.ui-generation-notifications-row,.ui-diagnostics-row)>span:first-of-type{grid-column:1!important;grid-row:1!important;justify-self:start!important;text-align:left!important}
html:root body ${roots}${roots} :is(.ui-auto-reconnect-state,.ui-generation-notifications-state,.ui-diagnostics-state){display:none!important}
html:root body ${roots}${roots} .comfier-workflow-mode-row{display:flex!important;flex-direction:row!important;justify-content:space-between!important;align-items:center!important;gap:8px!important}
html:root body ${roots}${roots} .comfier-workflow-mode-row>span{flex:1;min-width:0;text-align:left!important}
html:root body ${roots}${roots} .comfier-workflow-mode-row>select{flex:0 1 auto!important;max-width:58%;margin-left:auto!important}
html:root body ${roots}${roots}:is(.ufu-inspector,.ufu-confirm) label:has(>input[type=number]):has(>button){display:grid!important;grid-template-columns:minmax(0,1fr) 7ch 56px!important;column-gap:4px!important;align-items:center!important;text-align:left!important}
html:root body ${roots}${roots}:is(.ufu-inspector,.ufu-confirm) label:has(>input[type=number]):has(>button)>input{grid-column:2!important;grid-row:1!important;width:100%!important;min-width:0!important;margin:0!important}
html:root body ${roots}${roots}:is(.ufu-inspector,.ufu-confirm) label:has(>input[type=number]):has(>button)>button{grid-column:3!important;grid-row:1!important;width:56px!important;min-width:0!important;margin:0!important}
html:root body ${roots}${roots}:is(#comfier-ui-zoom-test,.comfier-app-settings-native-panel,.ufu-inspector,.ufu-confirm,.ufu-editor-status,.ufu-toolbar-menu,.comfier-theme-editor,.comfier-theme-profiles) button:not(.theme-recent){text-align:center!important;justify-content:center!important}

/* Phone UI Editor only: landscape uses horizontal space; portrait keeps one column. */
html:root body .ufu-inspector[data-editor-view^="outer"] .ufu-inspector-body>footer{margin-top:0!important;flex:none!important}
html:root body .ufu-inspector[data-editor-view^="outer"] .ufu-inspector-body>footer>button{width:100%!important}
html:root body .ufu-inspector[data-editor-view="outerLandscape"] [data-inspector-tab="dimensions"]:not([hidden]){display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:10px 20px!important;position:relative;align-content:start;align-items:center}
html:root body .ufu-inspector[data-editor-view="outerLandscape"] [data-inspector-tab="dimensions"]::after{content:"";position:absolute;top:0;bottom:0;left:50%;width:1px;background:#666;pointer-events:none}
html:root body .ufu-inspector[data-editor-view="outerLandscape"] [data-inspector-tab="colors"]:not([hidden]){display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:10px 20px!important;position:relative;align-items:start}
html:root body .ufu-inspector[data-editor-view="outerLandscape"] [data-inspector-tab="colors"]::after{content:"";position:absolute;top:0;bottom:0;left:50%;width:1px;background:#666;pointer-events:none}
html:root body .ufu-inspector[data-editor-view="outerLandscape"] [data-inspector-tab="colors"]>.theme-picker{grid-column:1/-1;display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px 20px;align-items:center;justify-items:stretch}
html:root body .ufu-inspector[data-editor-view="outerLandscape"] .theme-picker>.theme-wheel{grid-column:1;grid-row:1/4;width:min(132px,100%)!important;height:auto!important;justify-self:center;align-self:start}
html:root body .ufu-inspector[data-editor-view="outerLandscape"] .theme-picker>label{grid-column:2;width:100%!important;min-width:0;box-sizing:border-box}
html:root body .ufu-inspector[data-editor-view="outerLandscape"] .theme-picker input[type=text]{min-width:0;width:100%}
html:root body .ufu-inspector[data-editor-view="outerLandscape"] [data-inspector-tab="colors"]>.ufu-buttons{grid-column:2;min-width:0;justify-content:flex-start}
html:root body .ufu-inspector[data-editor-view="outerLandscape"] [data-inspector-tab="dimensions"]>*{min-width:0}

html:root body ${roots}${roots} :is(.comfier-browser-start-row,.comfier-civitai-start-row){display:flex!important;flex-direction:row!important;justify-content:space-between!important;align-items:center!important;width:100%!important;text-align:left!important}
html:root body ${roots}${roots} :is(.comfier-browser-start-row,.comfier-civitai-start-row)>span{margin-right:auto!important;text-align:left!important}
html:root body ${roots}${roots} :is(.comfier-browser-start-row,.comfier-civitai-start-row)>select{margin-left:auto!important;flex:0 1 auto;max-width:60%}
html:root body ${roots}${roots} .comfier-companion-port-row>input{width:calc(5ch + 30px)!important;min-width:calc(5ch + 30px)!important;font-family:monospace!important}
html:root body ${roots}${roots} .ui-zoom-panel[data-comfier-browser-settings="true"]>:not(.comfier-app-settings-heading):not(.comfier-browser-start-row):not(.comfier-civitai-start-row):not(.comfier-companion-port-row):not(.ui-diagnostics-row):not(.ufu-launch){display:none!important}
/* Nine compact theme swatches per row; hex and color action pairs. */
html:root body .theme-active-colors{display:flex!important;flex-wrap:wrap!important;justify-content:center!important;gap:2px!important;width:min(304px,100%)!important;max-width:100%!important;justify-self:center;align-self:center!important;margin-inline:auto!important}
html:root body ${roots}${roots} .theme-active-colors>button.theme-active-color{width:calc((100% - 16px)/9)!important;flex:0 0 calc((100% - 16px)/9)!important;min-width:0!important;height:auto!important;min-height:0!important;max-height:none!important;aspect-ratio:1;box-sizing:border-box!important}
html:root body ${roots}${roots} .theme-picker>label:has(.picker-hex){justify-content:space-between!important;text-align:left!important}
html:root body ${roots}${roots} .theme-picker .picker-hex{width:6ch!important;min-width:6ch!important;max-width:6ch!important;flex:0 0 6ch!important;box-sizing:content-box!important;font-family:monospace!important;margin-left:auto!important}
html:root body .ufu-inspector[data-editor-view="outerLandscape"] .theme-picker>.ufu-color-actions{grid-column:2;grid-row:4;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;align-self:start;min-width:0}
html:root body ${roots}${roots} .ufu-color-actions{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;width:100%;box-sizing:border-box}
html:root body ${roots}${roots} .ufu-color-actions>span{display:flex;align-items:center;gap:4px;min-width:0}
html:root body ${roots}${roots} .ufu-color-actions>span>button:first-child{flex:1;min-width:0;padding-inline:4px!important}
html:root body ${roots}${roots} .ufu-color-actions>span>button:last-child{flex:0 0 56px;width:56px;min-width:0;padding-inline:0!important}
html:root body ${roots}${roots} .ufu-color-actions>span:nth-child(2){justify-self:end;width:100%}
`;
document.head.append(style);
let stopped=false,api=null,value=window.__COMFIER_CLOUD_MODE?'Comfy Cloud':'Loading…',generation=0;
function render(root){
 const panel=root?.querySelector?.('.ui-zoom-panel');if(!panel)return;
 let row=panel.querySelector('.ui-comfy-version');if(!row){row=document.createElement('div');row.className='ui-comfy-version';panel.append(row)}
 row.textContent='ComfyUI Version: '+value;
 // Keep DOM reading order aligned with the visible footer, including late native rows.
 const anchor=panel.querySelector('.ui-app-version')||panel.querySelector('.ui-companion-version');
 if(anchor&&row.nextElementSibling!==anchor)panel.insertBefore(row,anchor);
 else if(!anchor){const disconnect=panel.querySelector('.ui-disconnect');if(disconnect&&disconnect.nextElementSibling!==row)disconnect.after(row)}
}
function paint(){document.querySelectorAll('#comfier-ui-zoom-test').forEach(render)}
async function refresh(){
 if(stopped)return;const current=api,token=++generation;
 if(window.__COMFIER_CLOUD_MODE){value='Comfy Cloud';paint();return}
 if(!current){value='Loading…';paint();return}
 value='Loading…';paint();
 try{const stats=typeof current.getSystemStats==='function'?await current.getSystemStats():await (await current.fetchApi('/system_stats')).json();
  if(stopped||token!==generation||current!==api)return;
  value=String(stats?.system?.comfyui_version||'Unavailable');
 }catch(_){if(stopped||token!==generation||current!==api)return;value='Unavailable'}
 paint();
}
function bind(next){next=next||window.comfyAPI?.api?.api||null;if(next===api)return;api?.removeEventListener?.('reconnected',refresh);api=next;api?.addEventListener?.('reconnected',refresh);refresh()}
const removeRows=window.__comfierSettingsRows?.register('panel-polish',render);
const removeApi=window.__comfierDocument?.subscribe('panel-polish-api','api',bind);
if(!removeApi)bind(window.app?.api);paint();
window.__comfierPanelPolish={refresh,remove(){stopped=true;++generation;api?.removeEventListener?.('reconnected',refresh);removeRows?.();removeApi?.();style.remove();document.querySelectorAll('.ui-comfy-version').forEach(row=>row.remove());delete window.__comfierPanelPolish}};
})();
