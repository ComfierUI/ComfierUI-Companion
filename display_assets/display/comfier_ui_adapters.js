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
    return{manager,store,get,refresh(){if(owner&&owner!==manager())detach();return get()},active:()=>store()?.activeSidebarTabId===id,
      ensure(spec){const api=manager();if(owner&&owner!==api)detach();if(!api?.registerSidebarTab)return false;if(!get()){api.registerSidebarTab({id,...spec});owner=api;ownedTab=get()}return!!get()},
      close(){const tab=store();if(tab?.activeSidebarTabId!==id)return false;if(typeof tab.toggleSidebarTab==='function')tab.toggleSidebarTab(id);else tab.activeSidebarTabId=null;return true},
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
  function nativeTab(options){
    const tab=sidebar(options.id),scope=runtime.scope('component:'+options.id);let component=null,app=null,opening=false,attempts=0,saved=null;
    function finish(){
      scope.cancel('poll');if(!opening)return;opening=false;
      const dialog=document.querySelector(options.dialog),surface=dialog?.closest?.('[role="dialog"]');(surface?.querySelector('button[aria-label="Close dialog"]')||dialog?.querySelector('button[aria-label="Close dialog"]'))?.click();
      document.documentElement.classList.remove(options.bootstrapClass);
      if(saved)for(const [name,old] of Object.entries(saved)){if(old.value)document.body.style.setProperty(name,old.value,old.priority);else document.body.style.removeProperty(name)}saved=null;
      if(bootstrapOwner===options.id)bootstrapOwner=null;
    }
    function register(){if(!component||!tab.ensure({...options.tab,type:'vue',component}))return false;finish();options.ready?.();return true}
    function poll(){if(!scope.alive)return;component=findComponent(options.name);if(register())return;if(++attempts<80)scope.later('poll',poll,25);else{finish();console.warn('COMFIER component discovery timed out: '+options.id)}}
    function ensure(){
      if(!scope.alive)return false;if(app!==vue()){finish();app=vue();component=null}
      if(tab.refresh())return true;component=component||findComponent(options.name);if(component)return register();
      if(opening)return false;if(bootstrapOwner&&bootstrapOwner!==options.id){scope.later('poll',ensure,25);return false}
      const trigger=options.trigger();if(!trigger?.isConnected)return false;
      bootstrapOwner=options.id;opening=true;attempts=0;saved={};for(const name of ['pointer-events','overflow'])saved[name]={value:document.body.style.getPropertyValue(name),priority:document.body.style.getPropertyPriority(name)};
      document.documentElement.classList.add(options.bootstrapClass);trigger.click();scope.later('poll',poll,0);return false;
    }
    return{ensure,registered:()=>!!tab.refresh(),active:tab.active,close:tab.close,remove(){finish();scope.dispose();tab.remove()}};
  }
  function visible(el){if(!el?.isConnected)return false;const r=runtime.measure(el,'rail'),s=getComputedStyle(el);return r.width>0&&r.height>0&&s.display!=='none'&&s.visibility!=='hidden'}
  const railLogical=r=>window.__comfierLayoutSide?.rect(r)||r;
  function railBounds(fallbackRight=180){
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
  window.__comfierUi={pinia,watchStore,sidebar,findComponent,nativeTab,railBounds,publishRail,affected,verticalDrag,blockScrollClick};
})();
