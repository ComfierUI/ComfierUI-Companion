(function(){
'use strict';if(window.__comfierMediaGrid)return;
const runtime=window.__comfierRuntime,jobs=runtime.scope('media-grid'),owned=new Map(),modes=new Map();
let surfaces=new Set(),proactive=false,lifecycle=null,discovery=null;
// Watch mounted asset grids for mode/layout changes. Widget text and styles
// elsewhere in the document do not require another traversal of the Vue tree.
const surfaceObserver=window.__comfierMutations.create(records=>{if(runtime.relevant(records))refresh()});
jobs.own(()=>surfaceObserver.disconnect());
jobs.own(()=>{for(const off of modes.values())off();modes.clear()});
function watch(next){
 if(next.size===surfaces.size&&[...next].every(el=>surfaces.has(el)))return;
 surfaceObserver.disconnect();surfaces=next;
 for(const el of surfaces)surfaceObserver.observe(el,{subtree:true,childList:true,attributes:true,attributeFilter:['class','style']});
}
const name=c=>c?.type?.__name||c?.type?.name;
function restore(c){const old=owned.get(c);if(!old)return;if(c.props.maxColumns===1)c.props.maxColumns=old.maxColumns;old.el?.removeAttribute('data-comfier-media-grid');owned.delete(c)}
function scan(){
 if(lifecycle?.ready()&&proactive)return;
 const root=document.getElementById('vue-app'),start=root?.__vue_app__?._instance?.subTree||root?._vnode,stack=[start],seen=new Set(),next=new Set(),owners=new Set();
 while(stack.length){const n=stack.pop();if(!n||typeof n!=='object'||seen.has(n))continue;seen.add(n);const c=n.component;
  if(name(c)==='VirtualGrid'){
   let owner=c.parent;while(owner&&name(owner)!=='AssetsSidebarGridView'&&name(owner)!=='AssetsSidebarListView')owner=owner.parent;
   if(owner){
    owners.add(owner);for(const el of [owner.subTree?.el,c.subTree?.el])if(el?.nodeType===1&&el.isConnected)next.add(el);
    if(!modes.has(owner)&&typeof owner.proxy?.$watch==='function')modes.set(owner,owner.proxy.$watch(()=>owner.props?.gridMode,refresh,{flush:'post'}));
   }
   if(name(owner)==='AssetsSidebarGridView'&&owner.props?.gridMode==='grid'){
    const el=c.subTree?.el;if(el?.nodeType===1&&c.props){if(!owned.has(c))owned.set(c,{maxColumns:c.props.maxColumns,el});else if(owned.get(c).el!==el){owned.get(c).el?.removeAttribute('data-comfier-media-grid');owned.get(c).el=el}if(c.props.maxColumns!==1)c.props.maxColumns=1;if(!el.hasAttribute('data-comfier-media-grid'))el.setAttribute('data-comfier-media-grid','')}
   }else restore(c);
  }
  if(c?.subTree)stack.push(c.subTree);if(n.suspense?.activeBranch)stack.push(n.suspense.activeBranch);if(Array.isArray(n.children))stack.push(...n.children);
 }
 for(const[c,old]of owned)if(c.isUnmounted||!old.el?.isConnected)restore(c);
 for(const[owner,off]of modes)if(owner.isUnmounted||!owners.has(owner)){off();modes.delete(owner)}
 watch(next);
}
function refresh(){jobs.frame('grid',scan)}
discovery=jobs.observe(document.body,{subtree:true,childList:true},records=>{
 if(records.some(r=>runtime.relevant([r])&&[...r.addedNodes,...r.removedNodes].some(n=>n.nodeType===1&&!['STYLE','SCRIPT'].includes(n.tagName))))refresh();
});
for(const e of ['resize','orientationchange','comfier-layout-editor-change'])jobs.listen(window,e,refresh);
lifecycle=window.__comfierUi?.watchComponents?.(['AssetsSidebarGridView'],c=>{
 proactive=true;discovery?.disconnect();surfaceObserver.disconnect();surfaces.clear();for(const off of modes.values())off();modes.clear();for(const child of [...owned.keys()])restore(child);
 const ui=window.__comfierUi;return ui.renderPatch(c,tree=>ui.mapVNodes(tree,node=>{
  if((node.type?.__name||node.type?.name)!=='VirtualGrid'||c.props.gridMode!=='grid')return node;
  return ui.vnodePatch(node,{props:{...node.props,maxColumns:1,'data-comfier-media-grid':''}});
 }));
});
window.__comfierMediaGrid={refresh,snapshot:()=>({grids:proactive?lifecycle.instances().length:owned.size,modeWatches:modes.size,proactive}),remove(){jobs.dispose();lifecycle?.remove();surfaces.clear();for(const c of owned.keys())restore(c);delete window.__comfierMediaGrid}};refresh();
})();
