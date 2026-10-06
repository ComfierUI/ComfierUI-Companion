(function(){
'use strict';if(window.__comfierUiAuthority)return;
const selectors=Object.freeze({
 miniPanels:'#comfier-panel-controller-popups',
 apps:'#comfier-apps-panel',
 workflowPopup:'#comfier-owned-workflow-menu',
 appNavigation:'[data-comfier-admitted-app-navigation]',
 feed:'#comfier-owned-feed-panel',
 workflow:'[data-testid="view-mode-toggle"]',
 action:'[data-testid="action-bar-card"],.actionbar-container',
 canvasPopup:'#comfier-owned-canvas-zoom',
 canvas:'[role="toolbar"][aria-label="Canvas Toolbar"]',
 run:'.comfier-early-queue-dock,.actionbar:has([data-testid="queue-button"])',
 connectedRail:'#comfier-owned-connected-sidebar',
 floatingRail:'.comfier-unified-floating-rail[data-comfier-owned-rail]',
 rail:'nav.side-tool-bar-container,.comfier-unified-floating-rail'
});
const claims=new Map(),owned=new Map(),transient=new Map();let denied=0,panelGeometry=null;
const writers=new Set(['layout','panels','defaults','workflow-dock','layout-side','fixed-view-map','layout-editor','rail']);
function actionSurface(){
 if(owned.get('action')?.el.isConnected)return owned.get('action').el;
 const admitted=Array.from(document.querySelectorAll(selectors.action)).filter(el=>
  !el.closest('[data-testid="properties-panel"],.comfier-early-floating-panel,.comfier-early-queue-dock')&&
  !!el.querySelector('[data-testid="action-bar-buttons"],[data-testid="legacy-topbar-container"],#crystools-monitors-root')
 );
 const cards=admitted.filter(el=>el.matches('[data-testid="action-bar-card"]'));
 return (cards.length?cards:admitted).sort((a,b)=>a.getBoundingClientRect().top-b.getBoundingClientRect().top)[0]||null;
}
function surface(name){if(owned.get(name)?.el.isConnected)return owned.get(name).el;if(name==='action')return actionSurface();if(name==='workflow'){const dock=document.getElementById('comfier-workflow-actions-floating-dock');return dock?.querySelector(selectors.workflow)?dock:document.querySelector(selectors.workflow)}return selectors[name]?document.querySelector(selectors[name]):null}
function contains(root,el){return root===el||!!root?.contains(el)}
function admitted(el){return Object.keys(selectors).some(name=>contains(surface(name),el))}
function claim(el,owner){if(!el||owner!=='layout-editor')return false;claims.set(el,owner);return true}
function owner(el){for(let n=el;n;n=n.parentElement){if(claims.has(n))return claims.get(n)}return null}
function canWrite(el,writer,key){
 if(el?.hasAttribute?.('data-comfier-panel-wrapper')&&key==='z-index'&&writer!=='side-panels'){denied++;return false}
 if(el?.hasAttribute?.('data-comfier-side-panel')&&['position','left','right','top','bottom','width','min-width','max-width','height','min-height','max-height','z-index','transform','translate','zoom'].includes(key)&&writer!=='side-panels'){denied++;return false}
 if(panelGeometry===el&&key?.startsWith('--cef-')&&writer!=='panels'){denied++;return false}
 let popup=null;for(let n=el;n;n=n.parentElement){if(transient.has(n)){popup=transient.get(n);break}}
 const lease=owner(el),host=[...owned.values()].find(o=>contains(o.el,el));const ok=writer==='side-panels'&&(el?.hasAttribute?.('data-comfier-side-panel')||el?.hasAttribute?.('data-comfier-panel-wrapper'))?true:lease?lease===writer:popup?popup===writer:host?host.writer===writer:!admitted(el)||writers.has(writer);
 if(!ok)denied++;return ok;
}
function write(el,key,value,writer,priority='important'){
 if(!el||!canWrite(el,writer,key))return false;
 if(el.style.getPropertyValue(key)!==String(value)||el.style.getPropertyPriority(key)!==priority)el.style.setProperty(key,String(value),priority);
 return true;
}
window.__comfierUiAuthority={writePanel(el,key,value){return write(el,key,value,'side-panels')},minimums:Object.freeze({buttonHeight:26,squareWidth:26}),registerTransient(el,writer){if(!el||writer!=='owned-overlays')return false;transient.set(el,writer);return true},unregisterTransient(el,writer){if(transient.get(el)===writer)transient.delete(el)},registerPanelGeometry(el){if(el!==document.documentElement)return false;panelGeometry=el;return true},unregisterPanelGeometry(el){if(panelGeometry===el)panelGeometry=null},registerOwned(name,el,writer){if(!selectors[name]||!((['action','run','feed','appNavigation'].includes(name)&&writer==='actionbar-owner')||(['workflow','workflowPopup','apps'].includes(name)&&writer==='workflow-owner')||(['canvas','canvasPopup'].includes(name)&&writer==='canvas-owner')||(['floatingRail','connectedRail'].includes(name)&&writer==='edge-bar')||(name==='miniPanels'&&writer==='mini-panel-owner')))return false;owned.set(name,{el,writer});return true},unregisterOwned(name,el){if(owned.get(name)?.el===el)owned.delete(name)},selectors,surface,claim,owner,canWrite,write,release(ownerName){for(const [el,o]of claims)if(o===ownerName)claims.delete(el)},snapshot:()=>({admitted:Object.keys(selectors).filter(k=>surface(k)),claims:claims.size,transient:transient.size,denied})};
})();
