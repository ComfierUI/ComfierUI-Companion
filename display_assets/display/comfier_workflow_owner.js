(function(){
'use strict';if(window.__comfierWorkflowOwner)return;
window.__comfierWorkflowFloatingTrigger?.remove?.();
const jobs=window.__comfierRuntime.scope('workflow-owner'),sources=new Map(),buttons=new Map(),retired=new Map();let mode='graph',stopped=false,menu=null,menuRole=null,switching=false,appsOpen=false;let appsPanel=null,appsBody=null,appsView='apps',browserVNode=null;const appsModeButtons=new Map();const admitted=new Map(),sidebarSlots=new Map();let guardedSettings=null,originalSettingSet=null,settingWrapper=null,builderNotice=null;
const dock=document.createElement('div');dock.id='comfier-workflow-actions-floating-dock';dock.setAttribute('data-comfier-owned-workflow','');
const group=document.createElement('div');group.setAttribute('data-testid','view-mode-toggle');group.setAttribute('role','group');group.setAttribute('aria-label','Workflow actions');group.setAttribute('data-comfier-owned-workflow-group','');dock.append(group);
const style=document.createElement('style');style.id='comfier-workflow-owner-style';style.textContent=`
html body .side-bar-button[data-testid="apps-tab-button"]{display:none!important;visibility:hidden!important;pointer-events:none!important}
html body [data-testid="view-mode-toggle"]:not([data-comfier-owned-workflow-group]){display:none!important;visibility:hidden!important;pointer-events:none!important}
html body #comfier-workflow-actions-floating-dock[data-comfier-owned-workflow]{position:fixed;display:flex;z-index:var(--comfier-z-workspace,200);pointer-events:auto;overflow:visible;width:max-content;height:max-content;margin:0;padding:0}
html body [data-comfier-owned-workflow-group]{display:flex;gap:4px;align-items:center;box-sizing:border-box;height:50px;padding:8px;border:1px solid var(--comfier-container-frame,var(--interface-stroke,#3b4554));border-radius:10px;background:var(--comfier-container-paint,var(--comfy-menu-bg,#171717));position:relative;margin:0;transform:none}
html body [data-comfier-owned-workflow-group]>button{display:flex;align-items:center;justify-content:center;width:auto;height:auto;min-height:${window.__comfierUiAuthority.minimums.buttonHeight}px;min-width:${window.__comfierUiAuthority.minimums.squareWidth}px;box-sizing:border-box;padding:0;margin:0;border:1px solid var(--comfier-button-frame,var(--interface-stroke,#3b4554));border-radius:7px;background:var(--comfier-button-bg,var(--comfy-input-bg,#242427));color:var(--comfier-icon-color,var(--comfier-accent,#fff));touch-action:manipulation;pointer-events:auto}
html body [data-comfier-owned-workflow-group]>button :is(svg,i){width:20px;height:20px;pointer-events:none}
html body button[data-comfier-workflow-control]{--ufu-state-frame:var(--comfier-button-frame,var(--interface-stroke,#fff))!important;background:var(--comfier-button-bg,var(--comfy-input-bg,#242427))!important;border-color:var(--comfier-button-frame,var(--interface-stroke,#fff))!important;box-shadow:inset 0 0 0 1px var(--comfier-button-frame,var(--color-base-foreground,var(--fg-color,#fff)))!important}
#comfier-apps-panel{display:none!important;position:fixed!important;left:var(--cef-right)!important;right:auto!important;top:var(--cef-right-top,var(--cef-top))!important;width:var(--cef-width)!important;height:var(--cef-right-height,var(--cef-height))!important;z-index:var(--comfier-apps-z,var(--comfier-z-side,500))!important;border:1px solid var(--interface-stroke,#3b4554);border-radius:10px;background:var(--comfy-menu-bg,#171717);overflow:hidden;pointer-events:auto;box-sizing:border-box}
html.comfier-layout-right #comfier-apps-panel{left:auto!important;right:var(--cef-right)!important}
#comfier-apps-panel[data-open]{display:flex!important;flex-direction:column}
#comfier-apps-panel>[data-comfier-apps-modes]{display:flex;justify-content:center;gap:8px;padding:8px 6px 0;flex:none}
#comfier-apps-panel .comfier-apps-mode-button{display:flex;align-items:center;justify-content:center;width:auto;min-width:102px;height:auto;min-height:${window.__comfierUiAuthority.minimums.buttonHeight}px;padding:0;margin:0;box-sizing:border-box;border:1px solid var(--comfier-button-frame,var(--interface-stroke,#3b4554));border-radius:7px;background:var(--comfier-button-paint,var(--comfy-input-bg,#242427));color:var(--comfier-icon-color,var(--comfier-accent,#fff));touch-action:manipulation}
#comfier-apps-panel .comfier-apps-mode-button svg{display:block;width:102px;height:32px;flex:none}
#comfier-apps-panel .comfier-apps-mode-button svg text{fill:currentColor!important;stroke:none!important;font-family:Arial,sans-serif;font-size:22px;font-weight:700}
#comfier-apps-content>[data-comfier-apps-name="AppsSidebarTab"]{height:100%!important;min-height:240px!important}
#comfier-apps-panel>header{display:flex;align-items:center;gap:8px;padding:6px;flex:none;color:var(--comfier-ui-font,#fff)}
#comfier-apps-panel>header>span{flex:1;text-align:center}
#comfier-apps-content{position:relative;flex:1;min-height:0;min-width:0;overflow-x:scroll;overflow-y:scroll;overscroll-behavior:contain;touch-action:pan-x pan-y;isolation:isolate;contain:layout}
html.comfier-apps-owned #graph-canvas-container{display:block!important;visibility:visible!important}
html.comfier-apps-owned .comfyui-body>[data-testid="linear-mobile"],html.comfier-apps-owned .comfyui-body>div:has([data-testid="linear-workspace-column"]){visibility:hidden!important;pointer-events:none!important}
html.comfier-apps-owned [data-comfier-apps-native]:not([data-comfier-apps-admitted]){visibility:hidden!important;pointer-events:none!important}
#comfier-apps-content>[data-comfier-apps-admitted]{position:relative!important;inset:auto!important;transform:none!important;translate:none!important;width:100%!important;max-width:100%!important;min-width:0!important;z-index:auto!important}
#comfier-apps-content>[data-comfier-apps-name="MobileDisplay"],#comfier-apps-content>[data-comfier-apps-name="LinearView"]{min-height:100%!important;height:auto!important;overflow:visible!important}
#comfier-apps-content [data-testid="linear-mobile"]{position:relative!important;width:100%!important;height:100%!important}
#comfier-apps-content [data-testid="linear-mobile"] [role="tabpanel"]{left:0!important;width:100%!important;max-width:100%!important;translate:none!important}
#comfier-apps-content [data-testid="linear-mobile"] [role="tabpanel"][aria-hidden="true"]{display:none!important}
#comfier-apps-content [data-testid="linear-mobile"] div[style*="translate"]{translate:none!important;transition:none!important}
#comfier-apps-content [role="tablist"]{position:relative!important;inset:auto!important;width:100%!important;height:auto!important;zoom:1!important;transform:none!important}
#comfier-apps-content .workflow-tabs-container{display:none!important}
#comfier-apps-content nav.side-tool-bar-container{display:none!important}
#comfier-apps-panel[data-comfier-apps-view="outerPortrait"] #comfier-apps-content>[data-comfier-apps-admitted]{width:max(100%,640px)!important;min-width:640px!important;max-width:none!important}
#comfier-apps-panel[data-comfier-apps-view="outerPortrait"] #comfier-apps-content>[data-comfier-apps-name="BuilderToolbar"]{width:max-content!important;min-width:100%!important;justify-content:flex-start!important}
#comfier-apps-panel[data-comfier-apps-view="outerPortrait"] [data-testid="linear-mobile"]{min-width:640px!important;min-height:100%!important;height:100%!important}
#comfier-apps-panel[data-comfier-apps-view="outerPortrait"] [data-testid="linear-mobile"]>.contain-content{contain:none!important;overflow:visible!important;flex:1;min-height:0}
#comfier-apps-panel[data-comfier-apps-view="outerPortrait"] [data-testid="linear-mobile"] [role="tabpanel"]{overflow-x:auto!important;overflow-y:auto!important;contain:none!important;touch-action:pan-x pan-y!important}

#comfier-apps-content [data-comfier-apps-name="BuilderToolbar"],#comfier-apps-content [data-comfier-apps-name="BuilderMenu"],#comfier-apps-content :is(label,h1,h2,h3){text-align:center!important}
#comfier-apps-content [data-comfier-apps-name="BuilderToolbar"]{display:flex!important;justify-content:center!important}
#comfier-apps-content [data-comfier-apps-name="BuilderToolbar"] button{justify-content:center!important}
#comfier-apps-content [data-comfier-apps-name="BuilderToolbar"] button>div{align-items:center!important;text-align:center!important}
#comfier-apps-content [role="tablist"]{justify-content:center!important}
#comfier-apps-content [role="tab"]{justify-content:center!important;text-align:center!important}
#comfier-owned-workflow-menu{position:fixed!important;zoom:1!important;transform:none!important;margin:0!important;right:auto!important;bottom:auto!important;box-sizing:border-box;display:flex;flex-direction:column;min-width:210px;max-height:240px;overflow:auto;gap:4px;padding:8px;z-index:var(--comfier-z-popup,700);background:var(--comfy-menu-bg,#171717);border:1px solid var(--interface-stroke,#3b4554);border-radius:8px}
#comfier-owned-workflow-menu button{font:inherit;color:var(--comfier-ui-font,#fff);background:var(--comfy-input-bg,#242427);border:0;padding:8px;text-align:left;min-height:${window.__comfierUiAuthority.minimums.buttonHeight}px}

html body [data-comfier-owned-workflow-group],html body [data-comfier-owned-workflow-group] *{animation:none!important;transition:none!important}
html.comfier-layout-right body [data-comfier-owned-workflow-group]{flex-direction:row-reverse}
`;
document.head.append(style);document.body.append(dock);window.__comfierUiAuthority.registerOwned('workflow',dock,'workflow-owner');
for(const [role,label,icon]of [['apps','App Mode','icon-[lucide--panels-top-left]'],['graph','Graph Mode','icon-[comfy--workflow]']]){
 const b=document.createElement('button');b.type='button';b.setAttribute('data-comfier-workflow-control',role);b.setAttribute('aria-label',label);b.title=label;b.setAttribute('aria-pressed',String(role==='graph'));const i=document.createElement('i');i.className=icon;b.append(i);b.addEventListener('click',event=>{event.preventDefault();event.stopPropagation();select(role).catch(e=>{console.warn('COMFIER workflow mode: '+e.message);window.ComfyRemoteDownloads?.showDownloadError?.(e.message)})});buttons.set(role,b);group.append(b);
}
const toggleCommands=['Comfy.ToggleLinear','Comfy.ToggleAppMode','Toggle App Mode'];
const menuActions=[['Rename','Comfy.RenameWorkflow'],['Duplicate','Comfy.DuplicateWorkflow'],['Save','Comfy.SaveWorkflow'],['Save as','Comfy.SaveWorkflowAs'],['Export','Comfy.ExportWorkflow'],['Export API','Comfy.ExportWorkflowAPI'],['Clear workflow','Comfy.ClearWorkflow']];
function stores(){return window.__comfierUi?.pinia?.()?._s}
function closeMenu(){if(!menu)return false;window.__comfierUiAuthority.unregisterOwned('workflowPopup',menu);menu.remove();menu=null;menuRole=null;for(const b of buttons.values())b.setAttribute('aria-expanded','false');return true}
function openMenu(role){
 if(menu){closeMenu();return}
 menu=document.createElement('div');menu.id='comfier-owned-workflow-menu';menu.setAttribute('role','menu');menu.setAttribute('aria-label','Workflow actions');
 for(const[label,id]of menuActions){if(!window.__comfierActionbarOwner?.findCommand([id]))continue;const item=document.createElement('button');item.type='button';item.textContent=label;item.setAttribute('role','menuitem');item.addEventListener('click',event=>{event.stopPropagation();closeMenu();window.__comfierActionbarOwner.executeCommand([id]).catch(e=>console.warn('COMFIER workflow action: '+e.message))});menu.append(item)}
 const change=document.createElement('button');change.type='button';change.textContent=role==='apps'?'Close Apps panel':'Open Apps panel';change.setAttribute('role','menuitem');change.addEventListener('click',event=>{event.stopPropagation();closeMenu();select(role==='apps'?'graph':'apps')});menu.append(change);
 document.body.append(menu);menuRole=role;window.__comfierUiAuthority.registerOwned('workflowPopup',menu,'workflow-owner');placeMenu();buttons.get(role).setAttribute('aria-expanded','true');
}

function placeMenu(){
 if(!menu||!menuRole)return;
 const r=buttons.get(menuRole).getBoundingClientRect(),w=Math.min(innerWidth-8,Math.max(210,menu.getBoundingClientRect().width)),h=Math.min(innerHeight-8,Math.max(32,menu.getBoundingClientRect().height));
 let left=r.left,top=r.bottom+4;
 if(r.left>innerWidth/2&&r.left-w-4>=4){left=r.left-w-4;top=r.top}else if(r.right+w+4<=innerWidth&&r.top>innerHeight*.25){left=r.right+4;top=r.top}
 if(top+h>innerHeight-4)top=r.top-h-4;
 left=Math.max(4,Math.min(left,innerWidth-w-4));top=Math.max(4,Math.min(top,innerHeight-h-4));
 for(const[k,v]of Object.entries({left:left+'px',top:top+'px','max-width':(innerWidth-8)+'px','max-height':(innerHeight-8)+'px'}))window.__comfierRuntime.writeStyle(menu,k,v,'workflow-owner');
}
function pressed(b){return b?.getAttribute('aria-pressed')==='true'||b?.getAttribute('data-state')==='on'||b?.getAttribute('data-state')==='checked'||b?.getAttribute('data-p-highlight')==='true'||b?.classList.contains('p-togglebutton-checked')}
function current(){return appsOpen?'apps':'graph'}
function componentSurfaces(){
 const app=document.getElementById('vue-app')?.__vue_app__,start=app?._instance?.subTree||document.getElementById('vue-app')?._vnode;
 const stack=[start],seen=new Set(),found=[];
 function roots(n){if(n?.el?.nodeType===1)return[n.el];if(n?.component?.subTree)return roots(n.component.subTree);return Array.isArray(n?.children)?n.children.flatMap(roots):[]}
 while(stack.length){const n=stack.pop();if(!n||typeof n!=='object'||seen.has(n))continue;seen.add(n);const c=n.component,name=c?.type?.__name||c?.type?.name;
  if(['AppsSidebarTab','AppBuilder','LinearView','MobileDisplay','BuilderToolbar','BuilderMenu','BuilderFooterToolbar'].includes(name)){
   for(const el of roots(c.subTree))found.push([name,el]);
  }
  if(c?.subTree)stack.push(c.subTree);if(n.suspense?.activeBranch)stack.push(n.suspense.activeBranch);if(Array.isArray(n.children))stack.push(...n.children);
 }return found.filter(([name,el])=>!found.some(([other,parent])=>parent!==el&&parent.contains(el)));
}
// Retain the native graph rail through the scoped side-toolbar slot. App Mode
// may still render its real content/builder; it no longer tears down this rail.
function retainGraphSidebar(){
 const root=document.getElementById('vue-app'),stack=[root?.__vue_app__?._instance?.subTree||root?._vnode],seen=new Set();
 while(stack.length){const n=stack.pop();if(!n||typeof n!=='object'||seen.has(n))continue;seen.add(n);const c=n.component;
  if(c?.slots?.['side-toolbar']){
   let parent=c.parent;while(parent&&(parent.type?.__name||parent.type?.name)!=='GraphCanvas')parent=parent.parent;
   if(parent){let saved=sidebarSlots.get(c);const original=window.__comfierSidePanels?.unwrapSlot(c.slots['side-toolbar'])||c.slots['side-toolbar'];
    if(!saved){const content=original();if(Array.isArray(content)&&content.some(v=>(v.type?.__name||v.type?.name)==='SideToolbar')){
     saved={original,content,slot:null};saved.slot=(...args)=>{if(!appsOpen)return saved.original(...args);const content=[...saved.content];const browser=appsView==='apps'?appsBrowserVNode(c,saved.content):null;if(browser)content.push(browser);return content};sidebarSlots.set(c,saved);c.slots['side-toolbar']=window.__comfierSidePanels?.wrapSlot(c,saved.slot)||saved.slot;
    }}else if(original!==saved.slot){saved.original=original;c.slots['side-toolbar']=window.__comfierSidePanels?.wrapSlot(c,saved.slot)||saved.slot;c.update?.()}
   }
  }
  if(c?.subTree)stack.push(c.subTree);if(n.suspense?.activeBranch)stack.push(n.suspense.activeBranch);if(Array.isArray(n.children))stack.push(...n.children);
 }
}
function appsBrowserVNode(component,content){
 if(browserVNode?.component?.isUnmounted)browserVNode=null;if(browserVNode)return browserVNode;
 const manager=window.app?.extensionManager,source=manager?.getSidebarTabs?.()||manager?.sidebarTab?.sidebarTabs||[];
 const tabs=Array.isArray(source)?source:source instanceof Map?[...source.values()]:Object.values(source);
 const type=tabs.find(tab=>tab?.id==='apps')?.component,template=content.find(v=>(v.type?.__name||v.type?.name)==='SideToolbar');
 if(!type||!template)return null;
 browserVNode={...template,type,key:'comfier-apps-browser',props:null,ref:null,children:null,component:null,el:null,anchor:null,target:null,targetAnchor:null,suspense:null,ssContent:null,ssFallback:null,shapeFlag:4,patchFlag:0,dynamicProps:null,dynamicChildren:null,appContext:component.appContext||template.appContext};
 return browserVNode;
}
function updateAppsSlots(){retainGraphSidebar();for(const[c,saved]of sidebarSlots)if(!c.isUnmounted&&(window.__comfierSidePanels?.unwrapSlot(c.slots?.['side-toolbar'])||c.slots?.['side-toolbar'])===saved.slot)c.update?.()}
function modeIcon(button,label){const svg=document.createElementNS('http://www.w3.org/2000/svg','svg'),text=document.createElementNS('http://www.w3.org/2000/svg','text');svg.setAttribute('viewBox','0 0 102 32');svg.setAttribute('aria-hidden','true');svg.setAttribute('focusable','false');text.setAttribute('x','51');text.setAttribute('y','16');text.setAttribute('text-anchor','middle');text.setAttribute('dominant-baseline','central');text.textContent=label;svg.append(text);button.append(svg)}
function syncAppsModes(){const title=document.getElementById('comfier-apps-label'),label=appsView==='builder'?'App builder':'Apps';if(title&&title.textContent!==label)title.textContent=label;for(const[view,button]of appsModeButtons){const value=String(appsView===view);if(button.getAttribute('aria-pressed')!==value)button.setAttribute('aria-pressed',value)}if(appsPanel?.getAttribute('data-apps-mode')!==appsView)appsPanel?.setAttribute('data-apps-mode',appsView)}
function selectAppsView(view){
 if(!appsOpen||!['apps','builder'].includes(view)||appsView===view)return;
 const store=stores()?.get('appMode');if(view==='builder'&&typeof store?.enterBuilder!=='function')throw Error('App builder is not ready.');
 restoreApps();appsView=view;browserVNode=null;
 if(view==='builder'){guardBuilderSettings();store.enterBuilder()}else{store?.exitBuilder?.();const canvas=stores()?.get('canvas');if(canvas)canvas.linearMode=false}
 updateAppsSlots();syncAppsModes();window.__comfierUnifiedSidebarTest?.refresh?.();schedule();jobs.burst('apps-view-mount',schedule,[0,25,80,250]);
}
function releaseGraphSidebar(){for(const[c,old]of sidebarSlots){if((window.__comfierSidePanels?.unwrapSlot(c.slots?.['side-toolbar'])||c.slots?.['side-toolbar'])===old.slot)c.slots['side-toolbar']=window.__comfierSidePanels?.wrapSlot(c,old.original)||old.original;if(!c.isUnmounted)c.update?.()}sidebarSlots.clear()}
function ensureAppsPanel(){
 if(appsPanel)return;
 appsPanel=document.createElement('section');appsPanel.id='comfier-apps-panel';appsPanel.setAttribute('aria-label','Apps');window.__comfierUiAuthority.registerOwned('apps',appsPanel,'workflow-owner');
 const modes=document.createElement('div');modes.setAttribute('data-comfier-apps-modes','');modes.setAttribute('role','group');modes.setAttribute('aria-label','Apps panel modes');
 for(const[view,label]of [['apps','Apps'],['builder','Builder']]){const button=document.createElement('button');button.type='button';button.className='comfier-apps-mode-button';button.setAttribute('class','comfier-apps-mode-button');button.setAttribute('aria-label',label);modeIcon(button,label);button.addEventListener('click',()=>selectAppsView(view));appsModeButtons.set(view,button);modes.append(button)}
 const header=document.createElement('header'),title=document.createElement('span'),close=document.createElement('button');title.id='comfier-apps-label';title.textContent='Apps';close.type='button';close.textContent='×';close.setAttribute('aria-label','Close Apps');close.addEventListener('click',closeApps);header.append(title,close);
 appsBody=document.createElement('div');appsBody.id='comfier-apps-content';const status=document.createElement('p');status.id='comfier-apps-status';status.textContent='Apps browser is loading.';appsBody.append(status);appsPanel.append(modes,header,appsBody);document.body.append(appsPanel);syncAppsModes();
}
function admitApps(){
 if(!appsOpen)return;
 const nativeMode=stores()?.get('workflow')?.activeWorkflow?.activeMode;if(appsView==='builder'&&nativeMode==='graph'){selectAppsView('apps');return}
 for(const[el]of admitted)if(!el.isConnected)admitted.delete(el);
 for(const[name,el]of componentSurfaces()){
  if(appsView==='apps'?!(['AppsSidebarTab'].includes(name)||nativeMode==='app'&&['LinearView','MobileDisplay'].includes(name)):name==='AppsSidebarTab')continue;
  if(!admitted.has(el)){admitted.set(el,{parent:el.parentNode,next:el.nextSibling});window.__comfierEarlyFloatingPanels?.releaseContent?.(el);el.setAttribute('data-comfier-apps-native','');el.setAttribute('data-comfier-apps-admitted','');el.setAttribute('data-comfier-apps-name',name);appsBody.append(el)}
 }
 const status=document.getElementById('comfier-apps-status');if(status)status.hidden=appsView!=='apps'||[...admitted.keys()].some(el=>el.getAttribute('data-comfier-apps-name')==='AppsSidebarTab');
}
function restoreApps(){for(const[el,old]of admitted){el.removeAttribute('data-comfier-apps-admitted');el.removeAttribute('data-comfier-apps-native');el.removeAttribute('data-comfier-apps-name');if(el.isConnected&&old.parent?.isConnected)old.parent.insertBefore(el,old.next?.parentNode===old.parent?old.next:null)}admitted.clear()}
function guardBuilderSettings(){
 builderNotice=window.__comfierClientSettings?.acquire('apps-builder-notice','Comfy.AppBuilder.VueNodeSwitchDismissed',true)||null;
 const setting=stores()?.get('setting');if(!setting||typeof setting.set!=='function'||guardedSettings===setting)return;
 if(guardedSettings?.set===settingWrapper)guardedSettings.set=originalSettingSet;
 const original=setting.set;originalSettingSet=original;guardedSettings=setting;settingWrapper=function(id,value,...rest){if(appsOpen&&id==='Comfy.VueNodes.Enabled'&&value===true)return Promise.resolve();return original.call(this,id,value,...rest)};setting.set=settingWrapper;
}
function closeApps(){
 if(!appsOpen)return false;appsOpen=false;restoreApps();appsPanel?.removeAttribute('data-open');
 const s=stores()?.get('appMode');s?.exitBuilder?.();if(guardedSettings?.set===settingWrapper)guardedSettings.set=originalSettingSet;guardedSettings=null;originalSettingSet=null;settingWrapper=null;builderNotice?.release();builderNotice=null;const canvas=stores()?.get('canvas');if(canvas)canvas.linearMode=false;releaseGraphSidebar();browserVNode=null;
 document.documentElement.classList.remove('comfier-apps-owned');document.documentElement.style.removeProperty('--comfier-apps-z');syncState();window.__comfierEarlyFloatingPanels?.refresh?.();return true;
}
function toggleApps(){if(window.__comfierSidePanels&&!window.__comfierSidePanels.operating('apps'))return window.__comfierSidePanels.toggle('apps',buttons.get('apps'),toggleApps);
 if(appsOpen){closeApps();return}
 const canvas=stores()?.get('canvas');if(!canvas)throw Error('Apps content service is not ready.');
 if(!window.__comfierSidePanels){window.__comfierFeedPanel?.closeIfOpen?.();window.__comfierExtensionsPanel?.closeIfOpen?.();window.__comfierLoraPanel?.closeIfOpen?.();window.__comfierLtxPanel?.closeIfOpen?.();}if(!window.__comfierSidePanels)stores()?.get('rightSidePanel')?.closePanel?.();
 ensureAppsPanel();retainGraphSidebar();appsView='apps';appsOpen=true;guardBuilderSettings();appsPanel.setAttribute('data-open','');document.documentElement.classList.add('comfier-apps-owned');
 // Admit the real Apps content and its builder. Native mode is a content
 // service here; graph visibility and every Apps surface belong to this owner.
 canvas.linearMode=false;updateAppsSlots();syncAppsModes();syncState();window.__comfierEarlyFloatingPanels?.activateRight?.();window.__comfierEarlyFloatingPanels?.refresh?.();jobs.burst('apps-mount',schedule,[0,25,80,250]);schedule();
}
async function select(role){closeMenu();if(role==='apps'){toggleApps();return}openMenu('graph')}
function catalog(){
 // Retire only the duplicate launcher. Keep the registered native Apps
 // component available to the right-panel browser.
 for(const button of document.querySelectorAll('.side-bar-button[data-testid="apps-tab-button"]'))if(!retired.has(button)){retired.set(button,{inert:button.inert,aria:button.getAttribute('aria-hidden')});button.inert=true;button.setAttribute('aria-hidden','true')}

 for(const native of document.querySelectorAll('[data-testid="view-mode-toggle"]')){
  if(native===group||native.closest('[data-comfier-owned-workflow]'))continue;
  const candidates=[...native.querySelectorAll('button')].filter(b=>b.closest('[data-testid="view-mode-toggle"]')===native);
  candidates.slice(0,2).forEach((source,index)=>{
   const iconText=source.querySelector('i')?.className||source.querySelector('i')?.getAttribute('class')||'',label=(source.getAttribute('aria-label')||source.getAttribute('title')||'').toLowerCase();const role=/panels-top-left/.test(iconText)||/app/.test(label)?'apps':/workflow/.test(iconText)||/graph/.test(label)?'graph':index===0?'apps':'graph',b=buttons.get(role);sources.set(role,source);
   // Keep the editor's original item token, even when the new button has a
   // more descriptive accessible label. Only visual metadata is copied.
   const icon=source.querySelector('i,svg'),token=source.getAttribute('data-testid')||source.getAttribute('aria-label')||source.getAttribute('title')||source.querySelector('i')?.className||source.textContent?.trim()||source.tagName+'-'+index;
   b.setAttribute('data-comfier-layout-token',token);if(icon&&b.dataset.icon!==icon.outerHTML){b.dataset.icon=icon.outerHTML;b.replaceChildren(icon.cloneNode(true))}
  });
  if(!retired.has(native)){retired.set(native,{inert:native.inert,aria:native.getAttribute('aria-hidden')});native.inert=true;native.setAttribute('aria-hidden','true')}
 }
}
function syncState(){mode=current();const ready=!!stores()?.get('canvas');for(const[role,b]of buttons){b.disabled=role==='apps'&&!ready;b.setAttribute('aria-pressed',String(mode===role));b.setAttribute('aria-haspopup',role==='graph'?'menu':'dialog');if(role==='apps')b.setAttribute('aria-expanded',String(appsOpen))}}
const logical=r=>window.__comfierLayoutSide?.rect(r)||r;
function visible(el){if(!el?.isConnected)return false;const r=logical(el.getBoundingClientRect()),s=getComputedStyle(el);return r.width>0&&r.height>0&&s.display!=='none'&&s.visibility!=='hidden'}
function layout(){
 if(window.__comfierLayoutEditor?.active())return;
 const z=window.__comfierViewport?.scale()||Math.max(.3,Math.min(2,parseFloat(window.__comfierUiZoomValue)||1));window.__comfierRuntime.writeStyle(group,'zoom',String(z),'workflow-owner');
 const canvas=logical((document.getElementById('graph-canvas-container')||document.querySelector('.graph-canvas-panel'))?.getBoundingClientRect()||{left:0,top:0});let edge=canvas.left,top=canvas.top;
 for(const rail of document.querySelectorAll('.side-toolbar-container,.side-tool-bar-container')){if(!visible(rail)||rail.classList.contains('floating-sidebar')||rail.classList.contains('comfier-unified-floating-rail'))continue;const r=logical(rail.getBoundingClientRect());if(r.left<=canvas.left+8&&r.width>=20&&r.width<220&&r.height>innerHeight*.35)edge=Math.max(edge,r.right)}
 const splits=[...document.querySelectorAll('#graph-canvas-container .p-splitter.p-splitter-horizontal')].filter(el=>{const r=logical(el.getBoundingClientRect());return visible(el)&&r.width>innerWidth*.5&&r.height>innerHeight*.35}).sort((a,b)=>a.getBoundingClientRect().top-b.getBoundingClientRect().top);
 const tabs=document.getElementById('topbar-workflow-tabs');if(splits.length)top=splits[0].getBoundingClientRect().top;else if(tabs)top=Math.max(top,...[tabs,...tabs.children].map(el=>el.getBoundingClientRect().bottom));
 for(const[key,value]of Object.entries({left:Math.round(edge+4)+'px',right:'auto',top:Math.round(top+4)+'px'})){const pair=window.__comfierLayoutSide?.property(key,value)||[key,value];window.__comfierRuntime.writeStyle(dock,pair[0],pair[1],'workflow-owner')}
}
let appModeBinding=null,canvasBinding=null,rightBinding=null;
function refresh(){if(stopped)return;if(appsPanel){const view=window.__comfierViewport?.mode()||(Math.min(screen.width,screen.height)<=520?'outer':'inner')+(innerHeight>=innerWidth?'Portrait':'Landscape');if(appsPanel.getAttribute('data-comfier-apps-view')!==view)appsPanel.setAttribute('data-comfier-apps-view',view)}if(appsOpen){retainGraphSidebar();guardBuilderSettings();const appMode=stores()?.get('appMode');if(!builderNotice?.ready()&&appMode?.showVueNodeSwitchPopup)appMode.showVueNodeSwitchPopup=false}catalog();admitApps();syncState();layout();placeMenu();if(!rightBinding){const store=stores()?.get('rightSidePanel');if(store?.$subscribe)rightBinding=store.$subscribe(schedule,{detached:true})}if(!appModeBinding){const store=stores()?.get('appMode');if(store?.$subscribe)appModeBinding=store.$subscribe(schedule,{detached:true})}if(!canvasBinding){const store=stores()?.get('canvas');if(store?.$subscribe)canvasBinding=store.$subscribe(schedule,{detached:true})}}

function schedule(){jobs.frame('layout',refresh)}
jobs.observe(document.body,{subtree:true,childList:true,attributes:true,attributeFilter:['aria-pressed','data-state','class']},records=>{if(records.some(r=>!(r.target.nodeType===1?r.target:r.target.parentElement)?.closest?.('[data-comfier-owned-workflow]')))schedule()});
for(const event of ['resize','orientationchange','pageshow','comfier-layout-editor-change','comfier-layout-side-change'])jobs.listen(window,event,schedule);
jobs.listen(document,'click',event=>{if(menu&&!menu.contains(event.target)&&!group.contains(event.target))closeMenu()});
jobs.listen(document,'keydown',event=>{if(event.key==='Escape'){if(!closeMenu())closeApps()}});const back=window.__comfierBack?.register?.('workflow-actions-menu',45,closeMenu);
const appsBack=window.__comfierBack?.register?.('apps-panel',135,()=>!window.__comfierSidePanels&&closeApps());
window.__comfierAppsPanel={isOpen:()=>appsOpen,surface:()=>appsPanel,closeIfOpen:closeApps,toggle:toggleApps,selectMode:selectAppsView,mode:()=>appsView,modeControl:view=>appsModeButtons.get(view),setStack(value){if(value===null)document.documentElement.style.removeProperty('--comfier-apps-z');else document.documentElement.style.setProperty('--comfier-apps-z',String(value))}};
window.__comfierWorkflowOwner={dock,group,control:role=>buttons.get(role),refresh:schedule,snapshot:()=>({mode:current(),ready:!!stores()?.get('canvas'),appsSurfaces:admitted.size,sidebarSlots:sidebarSlots.size,appsView,browserMounted:!!browserVNode,nativeHosts:retired.size}),remove(){if(stopped)return;stopped=true;jobs.dispose();closeMenu();back?.();appsBack?.();appModeBinding?.();canvasBinding?.();rightBinding?.();closeApps();window.__comfierUiAuthority.unregisterOwned('apps',appsPanel);appsPanel?.remove();document.documentElement.style.removeProperty('--comfier-apps-z');delete window.__comfierAppsPanel;for(const[el,old]of retired){el.inert=old.inert;if(old.aria===null)el.removeAttribute('aria-hidden');else el.setAttribute('aria-hidden',old.aria)}window.__comfierUiAuthority.unregisterOwned('workflow',dock);dock.remove();style.remove();delete window.__comfierWorkflowOwner;delete window.__comfierWorkflowFloatingTrigger}};
window.__comfierWorkflowFloatingTrigger={refresh:schedule};jobs.burst('startup',schedule,[0,80,300,1000,2500]);refresh();
})();
