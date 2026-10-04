(function(){
  'use strict';
  if(window.__comfierUi)return;
  const runtime=window.__comfierRuntime;
  let bootstrapOwner=null,railProvider=null;
  const vue=()=>document.getElementById('vue-app')?.__vue_app__;
  function pinia(){
    const app=vue(),direct=app?.config?.globalProperties?.$pinia;if(direct?._s)return direct;
    for(const key of Reflect.ownKeys(app?._context?.provides||{})){const candidate=app._context.provides[key];if(candidate?._s?.get)return candidate}return null;
  }
  function watchStore(name,changed){
    let current=null,unsubscribe=null,stopped=false;
    return{get value(){return current},refresh(){
      if(stopped)return null;const next=pinia()?._s?.get(name)||null;
      if(next!==current){unsubscribe?.();current=next;unsubscribe=next?.$subscribe?.(()=>{if(!stopped&&current===next)changed(current)},{detached:true,flush:'sync'})||null;changed(current)}return current;
    },remove(){stopped=true;unsubscribe?.();unsubscribe=null;current=null}};
  }
  function sidebar(id){
    let owner=null,ownedTab=null;
    const manager=()=>window.app?.extensionManager||null,store=()=>manager()?.sidebarTab||null;
    const tabs=()=>{const source=manager()?.getSidebarTabs?.()||store()?.sidebarTabs||[];return normalize(source)};
    const get=()=>tabs().find(tab=>tab?.id===id)||null;
    function detach(){if(owner&&ownedTab){try{const source=owner.getSidebarTabs?.()||owner.sidebarTab?.sidebarTabs;if(!source||source===ownedTab||normalize(source).some(tab=>tab===ownedTab))owner.unregisterSidebarTab?.(id)}catch(_){}}owner=null;ownedTab=null}
    function normalize(source){return Array.isArray(source)?source:Array.isArray(source?.value)?source.value:source instanceof Map?Array.from(source.values()):Object.values(source||{})}
    return{manager,store,get,refresh(){if(owner&&owner!==manager())detach();return get()},active:()=>window.__comfierSidePanels?window.__comfierSidePanels.isOpen('sidebar:'+id):store()?.activeSidebarTabId===id,
      ensure(spec){const api=manager();if(owner&&owner!==api)detach();if(!api?.registerSidebarTab)return false;if(!get()){api.registerSidebarTab({id,...spec});owner=api;ownedTab=get()}return!!get()},
      close(){const tab=store();if(window.__comfierSidePanels?.isOpen('sidebar:'+id))return window.__comfierSidePanels.close('sidebar:'+id);if(tab?.activeSidebarTabId!==id)return false;if(typeof tab.toggleSidebarTab==='function')tab.toggleSidebarTab(id);else tab.activeSidebarTabId=null;return true},
      remove:detach};
  }
  function findComponent(name){
    const root=document.getElementById('vue-app'),app=vue(),instance=app?._instance,start=instance?.subTree||instance?.vnode||root?._vnode;if(!start)return null;
    const seen=new WeakSet(),stack=[start];while(stack.length){const node=stack.pop();if(!node||typeof node!=='object'||seen.has(node))continue;seen.add(node);
      const current=node.component,type=current?.type||node.type;if((type?.name||type?.__name||type?.displayName||'')===name)return type;
      if(current?.subTree)stack.push(current.subTree);if(node.suspense?.activeBranch)stack.push(node.suspense.activeBranch);if(node.suspense?.pendingBranch)stack.push(node.suspense.pendingBranch);
      const children=node.children;if(Array.isArray(children))stack.push(...children);else if(children&&typeof children==='object')for(const child of Object.values(children))Array.isArray(child)?stack.push(...child):stack.push(child);
    }return null;
  }
  // One initial traversal, then Vue creation hooks for named components. These
  // hooks run after setup has supplied instance.render and before first render.
  const componentClients=new Set();let componentApp=null,componentMixin=null,componentScans=0;
  const componentName=c=>c?.type?.__name||c?.type?.name||'';
  function admitComponent(client,c){
    if(!c||c.isUnmounted||!client.names.has(componentName(c))||client.instances.has(c))return;
    const release=client.install(c)||(()=>{}),unmount=()=>{client.instances.delete(c);release(false)};
    client.instances.set(c,{release,unmount});(c.bum||(c.bum=[])).push(unmount);
  }
  function walkComponents(start,visit){const stack=[start],seen=new Set();while(stack.length){const n=stack.pop();if(!n||typeof n!=='object'||seen.has(n))continue;seen.add(n);if(n.component){visit(n.component);stack.push(n.component.subTree)}if(Array.isArray(n.children))stack.push(...n.children);if(n.suspense){stack.push(n.suspense.activeBranch,n.suspense.pendingBranch)}}}
  function detachComponents(client){for(const[c,state]of client.instances){if(c.bum)c.bum=c.bum.filter(fn=>fn!==state.unmount);state.release(true)}client.instances.clear()}
  function connectComponents(){
    const next=vue();if(!next?.mixin||!next._context)return false;if(next===componentApp)return true;
    for(const client of componentClients)detachComponents(client);
    if(componentApp&&componentMixin){const mixins=componentApp._context.mixins,index=mixins.indexOf(componentMixin);if(index>=0)mixins.splice(index,1);componentApp._context.optionsCache=new WeakMap()}
    componentApp=next;componentMixin={beforeCreate(){const c=this.$;for(const client of componentClients)admitComponent(client,c)}};next.mixin(componentMixin);next._context.optionsCache=new WeakMap();
    componentScans++;walkComponents(next._instance?.subTree||document.getElementById('vue-app')?._vnode,c=>{for(const client of componentClients)admitComponent(client,c)});return true;
  }
  function watchComponents(names,install){
    const client={names:new Set(names),install,instances:new Map()};componentClients.add(client);const before=componentApp,ready=connectComponents();
    if(ready&&before===componentApp){componentScans++;walkComponents(componentApp._instance?.subTree||document.getElementById('vue-app')?._vnode,c=>admitComponent(client,c))}
    return{ready:()=>connectComponents(),instances:()=>[...client.instances.keys()],snapshot:()=>({ready:!!componentApp,instances:client.instances.size,scans:componentScans}),remove(){componentClients.delete(client);detachComponents(client);if(!componentClients.size&&componentApp){const mixins=componentApp._context.mixins,index=mixins.indexOf(componentMixin);if(index>=0)mixins.splice(index,1);componentApp._context.optionsCache=new WeakMap();componentApp=null;componentMixin=null}}};
  }
  function renderPatch(c,transform){
    const original=c.render;if(typeof original!=='function')return null;let active=true;
    const wrapper=function(...args){const result=original.apply(this,args);return active?transform(result,c):result};c.render=wrapper;
    if(c.isMounted)c.update?.();
    return(update=true)=>{active=false;if(c.render===wrapper){c.render=original;if(update&&!c.isUnmounted)c.update?.()}};
  }
  function vnodePatch(vnode,props){return{...vnode,...props,patchFlag:-2,dynamicProps:null,dynamicChildren:null}}
  function mapVNodes(value,visit){
    if(Array.isArray(value)){let changed=false;const next=value.map(n=>{const v=mapVNodes(n,visit);if(v!==n)changed=true;return v});return changed?next:value}
    if(!value?.__v_isVNode)return value;const direct=visit(value);if(direct!==value)return direct;
    let children=value.children,content=value.ssContent,fallback=value.ssFallback;
    if(Array.isArray(children))children=mapVNodes(children,visit);
    else if(children&&typeof children==='object'){
      const slots={...children};let changed=false;
      for(const[key,fn]of Object.entries(children))if(typeof fn==='function'){const wrapped=(...args)=>mapVNodes(fn(...args),visit);Object.assign(wrapped,fn);slots[key]=wrapped;changed=true}
      if(changed){slots._=2;children=slots}
    }
    if(content)content=mapVNodes(content,visit);if(fallback)fallback=mapVNodes(fallback,visit);
    return children!==value.children||content!==value.ssContent||fallback!==value.ssFallback?vnodePatch(value,{children,ssContent:content,ssFallback:fallback}):value;
  }
  function commentVNode(vnode){return vnodePatch(vnode,{type:Symbol.for('v-cmt'),key:'comfier-retired:'+String(vnode.key??''),props:null,children:'',ref:null,shapeFlag:0,component:null,el:null,anchor:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null})}
  function afterRender(callback){const proxy=(vue()?._instance||document.getElementById('vue-app')?._vnode?.component)?.proxy;if(typeof proxy?.$nextTick!=='function')return false;proxy.$nextTick(callback);return true}
  function renderReady(){return typeof (vue()?._instance||document.getElementById('vue-app')?._vnode?.component)?.proxy?.$nextTick==='function'}
  function nativeTab(options){
    const tab=sidebar(options.id),scope=runtime.scope('component:'+options.id);let component=null,app=null,opening=false,attempts=0,saved=null,contentProps=null,onClose=null,closeNotified=true,capturedStore=null;
    function notifyClose(){
      if(closeNotified)return;closeNotified=true;
      // The bootstrap did not add a native dialog. Its hide callback must not
      // close a later, genuinely opened dialog with the same key.
      const store=capturedStore,base=store?.closeDialog;
      if(typeof base!=='function'){onClose?.();return}
      const guard=function(request,...rest){if(request?.key===options.dialogKey)return;return base.call(this,request,...rest)};
      store.closeDialog=guard;try{onClose?.()}finally{if(store.closeDialog===guard)store.closeDialog=base}
    }
    function capture(trigger){
      const store=pinia()?._s?.get('dialog');
      if(!options.dialogKey||!window.__comfierSidePanels?.canMountNative?.()||typeof store?.showDialog!=='function'||typeof store?.closeDialog!=='function'||typeof store?.isDialogOpen!=='function'||store.isDialogOpen(options.dialogKey))return null;
      const base=store.showDialog;let request=null;
      const wrapper=function(value,...rest){const type=value?.component;if(!request&&value?.key===options.dialogKey&&((type?.__name||type?.name)===options.name||type?.__asyncLoader)){request=value;return}return base.call(this,value,...rest)};
      store.showDialog=wrapper;if(store.showDialog!==wrapper)return null;
      try{trigger.click()}finally{if(store.showDialog===wrapper)store.showDialog=base}
      if(!request)return false;
      component=request.component;capturedStore=store;onClose=request.props?.onClose;contentProps={...request.props,onClose:()=>{if(!tab.close())notifyClose()}};return true;
    }
    function finish(){
      scope.cancel('poll');if(!opening)return;opening=false;
      const dialog=document.querySelector(options.dialog),surface=dialog?.closest?.('[role="dialog"]');(surface?.querySelector('button[aria-label="Close dialog"]')||dialog?.querySelector('button[aria-label="Close dialog"]'))?.click();
      document.documentElement.classList.remove(options.bootstrapClass);
      if(saved)for(const [name,old] of Object.entries(saved)){if(old.value)document.body.style.setProperty(name,old.value,old.priority);else document.body.style.removeProperty(name)}saved=null;
      if(bootstrapOwner===options.id)bootstrapOwner=null;
    }
    function register(){if(!component||!tab.ensure({...options.tab,type:'vue',component,...(contentProps?{__comfierContentProps:contentProps,__comfierOpen:()=>{closeNotified=false},__comfierClose:notifyClose}:{})}))return false;finish();options.ready?.();return true}
    function poll(){if(!scope.alive)return;component=findComponent(options.name);if(register())return;if(++attempts<80)scope.later('poll',poll,25);else{finish();console.warn('COMFIER component discovery timed out: '+options.id)}}
    function ensure(){
      if(!scope.alive)return false;if(app!==vue()){finish();app=vue();component=null;contentProps=null;onClose=null;capturedStore=null;closeNotified=true}
      if(tab.refresh())return true;component=component||findComponent(options.name);if(component)return register();
      if(opening)return false;if(bootstrapOwner&&bootstrapOwner!==options.id){scope.later('poll',ensure,25);return false}
      const trigger=options.trigger();if(!trigger?.isConnected)return false;
      const result=capture(trigger);if(result===true)return register();
      bootstrapOwner=options.id;opening=true;attempts=0;saved={};for(const name of ['pointer-events','overflow'])saved[name]={value:document.body.style.getPropertyValue(name),priority:document.body.style.getPropertyPriority(name)};
      document.documentElement.classList.add(options.bootstrapClass);if(result===null)trigger.click();scope.later('poll',poll,0);return false;
    }
    return{ensure,registered:()=>!!tab.refresh(),active:tab.active,close:tab.close,remove(){finish();scope.dispose();tab.remove()}};
  }
  function visible(el){if(!el?.isConnected)return false;const r=runtime.measure(el,'rail'),s=getComputedStyle(el);return r.width>0&&r.height>0&&s.display!=='none'&&s.visibility!=='hidden'}
  const railLogical=r=>window.__comfierLayoutSide?.rect(r)||r;
  function railBounds(fallbackRight=180){
    if(window.__comfierConnectedSidebar?.root?.())return window.__comfierConnectedSidebar.bounds()||{left:0,right:0,top:0,bottom:innerHeight,width:0,height:innerHeight};
    // Connected outer-landscape rails can be wider than the floating group.
    // Use the published native rail before an inner button group.
    if(window.__comfierViewport?window.__comfierViewport.mode()==='outerLandscape':Math.min(screen.width,screen.height)<=520&&innerWidth>innerHeight){const rail=railProvider?.();if(visible(rail))return runtime.measure(rail,'rail')}
    const anchor=document.querySelector('[data-testid="comfier-app-settings-tab-button"]')||document.getElementById('comfier-multiselect-toggle'),candidates=[];
    for(let el=anchor?.parentElement,depth=0;el&&el!==document.body&&depth<12;el=el.parentElement,depth++){
      if(!visible(el))continue;const r=runtime.measure(el,'rail');if(railLogical(r).left<40&&railLogical(r).right<180&&r.width>=20&&r.width<180&&r.height>100&&el.querySelectorAll('.side-bar-button').length>=3)candidates.push(r);
    }
    if(candidates.length)return candidates.sort((a,b)=>b.height-a.height)[0];
    const published=railProvider?.();if(visible(published))return runtime.measure(published,'rail');
    const unified=document.querySelector('.comfier-unified-floating-rail');if(visible(unified))return runtime.measure(unified,'rail');
    const boxes=Array.from(document.querySelectorAll('.side-bar-button')).filter(visible).map(el=>runtime.measure(el,'rail')).filter(r=>railLogical(r).left<40&&railLogical(r).right<fallbackRight);
    if(!boxes.length)return null;const left=Math.min(...boxes.map(r=>r.left)),top=Math.min(...boxes.map(r=>r.top)),right=Math.max(...boxes.map(r=>r.right)),bottom=Math.max(...boxes.map(r=>r.bottom));return{left,top,right,bottom,width:right-left,height:bottom-top};
  }
  function publishRail(provider){railProvider=provider;return()=>{if(railProvider===provider)railProvider=null}}
  function affected(records,selector){return records.some(record=>{const target=record.target?.nodeType===1?record.target:record.target?.parentElement;if(target?.closest?.(selector))return true;return Array.from(record.addedNodes||[]).concat(Array.from(record.removedNodes||[])).some(node=>node.nodeType===1&&(node.matches?.(selector)||node.querySelector?.(selector)))})}
  const verticalDrag=(dx,dy,threshold)=>Math.abs(dy)>=threshold&&Math.abs(dy)>Math.abs(dx);
  function blockScrollClick(event,until){if(performance.now()>=until)return;event.preventDefault();event.stopImmediatePropagation()}
  window.__comfierUi={pinia,watchStore,sidebar,findComponent,nativeTab,railBounds,publishRail,affected,verticalDrag,blockScrollClick,watchComponents,renderPatch,mapVNodes,vnodePatch,commentVNode,afterRender,renderReady};
})();
