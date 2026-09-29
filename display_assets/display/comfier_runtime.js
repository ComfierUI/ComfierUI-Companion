(function () {
  'use strict';
  if (window.__comfierRuntime) return;
  const NativeMutationObserver=window.MutationObserver;
  // Companion display mode uses one document-wide native observer and fans
  // coalesced mutation batches out to the proven visual shapers.  This keeps
  // the existing behavior while avoiding dozens of independent whole-DOM
  // observers waking the WebView for the same change.
  if(!window.__comfierMutations&&NativeMutationObserver){
    const subscriptions=new Set(),pending=[];
    let frame=0,nativeCallbacks=0,flushes=0,deliveries=0,recordCount=0;
    function inside(target,node,subtree){
      if(!target||!node)return false;
      if(target===node)return true;
      return !!(subtree&&target.contains&&target.contains(node));
    }
    function accepts(sub,record){
      const o=sub.options||{};
      if(!inside(sub.target,record.target,!!o.subtree))return false;
      if(record.type==='childList')return !!o.childList;
      if(record.type==='attributes'){
        if(!o.attributes)return false;
        return !o.attributeFilter||o.attributeFilter.includes(record.attributeName);
      }
      if(record.type==='characterData')return !!o.characterData;
      return false;
    }
    function flush(){
      frame=0;if(!pending.length)return;flushes++;
      const records=pending.splice(0);recordCount+=records.length;
      for(const sub of Array.from(subscriptions)){
        if(!sub.active||!sub.target||sub.delivery==='immediate')continue;
        const filtered=records.filter(record=>accepts(sub,record));
        if(!filtered.length)continue;deliveries++;
        try{sub.callback(filtered,sub.api)}catch(error){console.warn('COMFIER shared mutation subscriber',error)}
      }
    }
    function schedule(){if(frame)return;frame=requestAnimationFrame(flush)}
    const native=new NativeMutationObserver(records=>{
      nativeCallbacks++;
      // Critical ownership subscribers can reconcile in the observer microtask,
      // before the browser gets a chance to paint a transient stock/dual-rail state.
      for(const sub of Array.from(subscriptions)){
        if(!sub.active||!sub.target||sub.delivery!=='immediate')continue;
        const filtered=records.filter(record=>accepts(sub,record));
        if(!filtered.length)continue;deliveries++;
        try{sub.callback(filtered,sub.api)}catch(error){console.warn('COMFIER immediate mutation subscriber',error)}
      }
      pending.push(...records);schedule();
    });
    native.observe(document.documentElement,{subtree:true,childList:true,attributes:true,characterData:true});
    function create(callback,delivery='frame'){
      const sub={callback,target:null,options:null,active:false,api:null,delivery:delivery==='immediate'?'immediate':'frame'};
      const api={
        observe(target,options){sub.target=target;sub.options=options||{};if(!sub.active){sub.active=true;subscriptions.add(sub)}},
        disconnect(){sub.active=false;subscriptions.delete(sub);sub.target=null;sub.options=null},
        takeRecords(){return []}
      };
      sub.api=api;return api;
    }
    window.__comfierMutations=Object.freeze({
      create,
      snapshot(){return{nativeObservers:1,subscriptions:subscriptions.size,nativeCallbacks,flushes,deliveries,records:recordCount,pending:pending.length}},
      flush
    });
  }
  const jobs = new Map(), overlays = new Map(), stats = Object.create(null);
  const frameJobs = new Map(), scopes = new Map();
  let uiFrame = 0, measurements = null;
  let overlayFrame = 0, boundCanvas = null, viewportKey = '';
  const ignored = '#comfier-node-resize-handles,#cm-move,#comfier-tap-link-marker,' +
    '#comfier-diagnostics-root,#comfier-diagnostics-highlight,[data-comfier-theme-probe],' +
    '.dom-widget,.lm-loras-container,.pr-wrapper';
  function element(node) { return node && (node.nodeType === 1 ? node : node.parentElement); }
  function ignoredNode(node) { const el = element(node); return !!(el && el.closest && el.closest(ignored)); }
  function relevant(records) {
    return records.some(record => {
      if (ignoredNode(record.target)) return false;
      if (record.type !== 'childList') return true;
      const changed = Array.from(record.addedNodes).concat(Array.from(record.removedNodes));
      return !changed.length || changed.some(node => !ignoredNode(node));
    });
  }
  function count(name) { stats[name] = (stats[name] || 0) + 1; }
  function cancel(name) { const old=jobs.get(name);if(old)clearTimeout(old);jobs.delete(name);frameJobs.delete(name);if(!frameJobs.size&&uiFrame){cancelAnimationFrame(uiFrame);uiFrame=0} }
  function requestFrame() {
    if(uiFrame||document.hidden||!frameJobs.size)return;
    uiFrame=requestAnimationFrame(()=>{
      uiFrame=0;if(document.hidden)return;
      const pending=Array.from(frameJobs);frameJobs.clear();measurements=new WeakMap();
      try{for(const [name,fn] of pending){count(name);try{fn()}catch(error){console.warn('COMFIER job '+name,error)}}}finally{measurements=null}
    });
  }
  function frame(name,fn){frameJobs.set(name,fn);requestFrame()}
  function measure(el,name='layout'){
    if(!el)return null;if(measurements?.has(el))return measurements.get(el);
    count(name+'.reads');const rect=el.getBoundingClientRect();measurements?.set(el,rect);return rect;
  }
  function writeStyle(el,name,value,owner='layout',priority='important'){
    if(!el||el.style.getPropertyValue(name)===value&&el.style.getPropertyPriority(name)===priority)return;
    el.style.setProperty(name,value,priority);count(owner+'.writes');measurements?.delete(el);
  }
  function scope(owner){
    scopes.get(owner)?.dispose();let alive=true;const cleanup=[],keys=new Set();
    const key=name=>owner+':'+name;
    const api={
      get alive(){return alive},
      cancel(name){cancel(key(name));keys.delete(key(name))},
      frame(name,fn){if(!alive)return;const id=key(name);keys.add(id);frame(id,()=>{keys.delete(id);if(alive)fn()})},
      later(name,fn,delay=0){if(!alive)return;const id=key(name);cancel(id);keys.add(id);jobs.set(id,setTimeout(()=>{jobs.delete(id);keys.delete(id);if(alive){count(id);fn()}},delay))},
      burst(name,fn,delays){if(!alive)return;for(const id of Array.from(keys))if(id.startsWith(key(name)+':')){cancel(id);keys.delete(id)}delays.forEach((delay,index)=>api.later(name+':'+index,fn,delay))},
      own(fn){if(alive)cleanup.push(fn);else fn();return fn},
      listen(target,type,fn,options){if(!target)return;const handler=(...args)=>{if(alive)fn(...args)};target.addEventListener(type,handler,options);api.own(()=>target.removeEventListener(type,handler,options));return handler},
      observe(target,options,fn){const observer=(window.__comfierMutations?.create||((cb)=>new NativeMutationObserver(cb)))(records=>{if(alive)fn(records)});observer.observe(target,options);api.own(()=>observer.disconnect());return observer},
      dispose(){if(!alive)return;alive=false;keys.forEach(cancel);keys.clear();cleanup.splice(0).reverse().forEach(fn=>{try{fn()}catch(_){}});if(scopes.get(owner)===api)scopes.delete(owner)}
    };scopes.set(owner,api);return api;
  }
  function schedule(name, fn, delay) {
    const old = jobs.get(name);
    if (old) clearTimeout(old);
    jobs.set(name, setTimeout(() => {
      jobs.delete(name);
      if (document.hidden) return;
      count(name);
      fn();
    }, delay == null ? 80 : delay));
  }
  function requestOverlays() {
    if (overlayFrame || document.hidden || !overlays.size) return;
    overlayFrame = requestAnimationFrame(() => {
      overlayFrame = 0;
      const c = window.app && window.app.canvas;
      let rect = null;
      const geometry = () => rect || (rect = c && c.canvas && c.canvas.getBoundingClientRect());
      overlays.forEach(fn => { try { fn(geometry); } catch (_) {} });
      count('overlayUpdates');
    });
  }
  function wrap(object, name, after) {
    if (!object || typeof object[name] !== 'function') return;
    const original = object[name];
    if (original.__comfierRuntimeHook) return;
    function wrapped() { const result = original.apply(this, arguments); after(this, arguments); return result; }
    wrapped.__comfierRuntimeHook = true;
    object[name] = wrapped;
  }
  function bindCanvas() {
    const c = window.app && window.app.canvas;
    if (!c) return;
    if (boundCanvas !== c) { boundCanvas = c; viewportKey = ''; requestOverlays(); }
    ['selectNode','selectNodes','deselectNode','deselectAll','setDirty'].forEach(name => wrap(c, name, requestOverlays));
    // draw() can run continuously even when it decides not to paint. Only wake
    // overlays for dirty draws or an actual viewport change, not every draw call.
    if (typeof c.draw === 'function' && !c.draw.__comfierRuntimeHook) {
      const original = c.draw;
      function draw() {
        const ds = this.ds || {}, offset = ds.offset || [], key = [ds.scale, offset[0], offset[1]].join(',');
        const changed = key !== viewportKey || this.dirty_canvas || this.dirty_bgcanvas || arguments[0] || arguments[1];
        viewportKey = key;
        const result = original.apply(this, arguments);
        if (changed) requestOverlays();
        return result;
      }
      draw.__comfierRuntimeHook = true;
      c.draw = draw;
    }
  }
  // Dropdowns commit outside the graph canvas. Invalidate after their native
  // handlers/microtasks, independently of layout observers or a later canvas tap.
  const dropdownJobs=scope('dropdown-redraw');
  function dropdownCommit(event) {
    if(event.type==='keydown'&&!['Enter',' ','ArrowUp','ArrowDown','Home','End'].includes(event.key))return;
    const target=element(event.target);if(!target)return;
    const selector=event.type==='change'?'select':
      '.litemenu-entry,[role="option"],[role="menuitem"],[role="menuitemradio"],[role="menuitemcheckbox"],select,[role="combobox"]';
    const control=target.closest?.(selector);
    if(!control||control.disabled||control.getAttribute?.('aria-disabled')==='true'||control.classList?.contains('disabled'))return;
    const canvas=window.app?.canvas;if(!canvas)return;
    dropdownJobs.later('commit',()=>dropdownJobs.frame('paint',()=>{
      if(window.app?.canvas!==canvas)return;
      if(typeof canvas.setDirty==='function')canvas.setDirty(true,false);
      else canvas.dirty_canvas=true;
      count('dropdownRedraws');
    }),0);
  }
  ['pointerdown','pointerup','click','keydown','change'].forEach(type=>
    dropdownJobs.listen(window,type,dropdownCommit,{capture:true,passive:true}));
  function input(event) {
    const c = window.app && window.app.canvas, target = element(event.target);
    if (!c || !target) return;
    const path = event.composedPath ? event.composedPath() : [];
    if (target === c.canvas || target === c.overlayCanvas || path.includes(c.canvas) ||
        path.includes(c.overlayCanvas) || target.closest('#cm-move,#comfier-node-resize-handles')) {
      bindCanvas(); requestOverlays();
    }
  }
  ['pointerdown','pointermove','pointerup','pointercancel','wheel'].forEach(type =>
    window.addEventListener(type, input, { capture:true, passive:true }));
  window.addEventListener('keyup', requestOverlays, true);
  window.addEventListener('resize', requestOverlays, { passive:true });
  if (window.visualViewport) {
    visualViewport.addEventListener('resize', requestOverlays, { passive:true });
    visualViewport.addEventListener('scroll', requestOverlays, { passive:true });
  }
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      if (overlayFrame) cancelAnimationFrame(overlayFrame);
      overlayFrame = 0;
      if(uiFrame)cancelAnimationFrame(uiFrame);uiFrame=0;
    } else { bindCanvas(); requestOverlays(); requestFrame(); }
  });
  window.__comfierRuntime = {
    relevant, schedule, cancel, frame, scope, measure, writeStyle, count, bindCanvas, requestOverlays,
    addOverlay(name, fn) { overlays.set(name, fn); bindCanvas(); requestOverlays(); },
    removeOverlay(name) { overlays.delete(name); },
    snapshot() { return { counters:Object.assign({}, stats), pending:Array.from(jobs.keys()), frames:Array.from(frameJobs.keys()), scopes:Array.from(scopes.keys()), back:window.__comfierBack?.snapshot(), overlays:Array.from(overlays.keys()) }; }
  };
  bindCanvas();
})();

(function(){
  'use strict';
  if(window.__comfierDocument)return;
  const runtime=window.__comfierRuntime,jobs=runtime.scope('document'),watchers=new Map(),endpoints=new Map();
  let stopped=false,probeCount=0,api=null;
  const readers={
    app:()=>window.app||null,
    api:()=>window.app?.api||null,
    settings:()=>window.app?.extensionManager?.setting||window.app?.ui?.settings||null,
    canvas:()=>{const c=window.app?.canvas,el=c&&(c.canvas||c.bgcanvas);return el?.width>0&&el.height>0?c:null},
    layout:()=>{const c=document.querySelector('#graph-canvas,canvas.lgraphcanvas,#graph-canvas-container canvas'),host=document.getElementById('graph-canvas-container'),r=c?.getBoundingClientRect();return host&&r?.width>100&&r.height>100?c:null},
    sidebar:()=>window.app?.extensionManager?.sidebarTab||null,
    settingsHost:()=>document.getElementById('comfier-ui-zoom-test')?.querySelector('.ui-zoom-panel')||null
  };
  function probe(){
    if(stopped||document.hidden)return;
    const currentApi=readers.api();if(currentApi!==api){api?.removeEventListener?.('reconnected',reconnect);api=currentApi;api?.addEventListener?.('reconnected',reconnect)}
    for(const entry of Array.from(watchers.values())){let value;try{value=readers[entry.capability]()}catch(_){value=null}if(value!==entry.last){entry.last=value;try{entry.fn(value)}catch(error){console.warn('COMFIER readiness '+entry.capability,error)}}}
    if(watchers.size)jobs.later('probe',probe,++probeCount<40?100:1000);
  }
  function subscribe(name,capability,fn){if(!readers[capability])throw Error('Unknown capability '+capability);const entry={capability,fn,last:undefined};watchers.set(name,entry);probe();return()=>{if(watchers.get(name)===entry)watchers.delete(name);if(!watchers.size)jobs.cancel('probe')}}
  function reconnect(){probeCount=0;probe();companion.refresh();window.dispatchEvent?.(new Event('comfierui-session-reconnected'));}
  jobs.listen(document,'visibilitychange',()=>{if(document.hidden){jobs.cancel('probe');jobs.cancel('companion');capabilityRequests.abort()}else reconnect()});
  jobs.listen(window,'pageshow',reconnect);
  jobs.listen(window,'resize',()=>jobs.frame('layout-ready',probe),{passive:true});
  // Each owner controls cancellation. Timeout covers headers AND response body.
  function requests(){
    const pending=new Set();let generation=0,removed=false;
    function abort(){generation++;for(const item of pending)item.cancel();pending.clear()}
    async function request(url,options={},timeout=10000){
      if(removed)throw Error('Request owner removed');const token=generation,controller=new AbortController();let timer,rejectCancel;
      const canceled=new Promise((_,reject)=>{rejectCancel=reject});
      const item={cancel(){controller.abort();rejectCancel(Error('Request canceled'))}};pending.add(item);
      const expired=new Promise((_,reject)=>{timer=setTimeout(()=>{controller.abort();reject(Error('Request timed out'))},timeout)});
      try{return await Promise.race([(async()=>{const response=await fetch(url,{...options,signal:controller.signal});const body=await response.text();if(removed||token!==generation)throw Error('Stale response');return{ok:response.ok,status:response.status,text:async()=>body,json:async()=>JSON.parse(body)}})(),expired,canceled])}
      finally{clearTimeout(timer);pending.delete(item)}
    }
    return{request,abort,remove(){removed=true;abort()},get size(){return pending.size}};
  }
  const capabilityRequests=requests(),subscribers=new Map();let checking=false,checkAgain=false,capability={status:'unknown',info:null};
  function publish(status,info=null){if(stopped)return;endpoints.set('companion',status);capability={status,info};for(const fn of subscribers.values())try{fn({...capability})}catch(error){console.warn('COMFIER companion subscriber',error)}}
  async function detect(){
    if(stopped||document.hidden||!subscribers.size)return;if(checking){checkAgain=true;return}checking=true;
    try{const response=await capabilityRequests.request('/comfierui/capabilities',{cache:'no-store',credentials:'same-origin'},3000);
      if(response.status===404||response.status===405){publish('unsupported');return}if(!response.ok)throw Error('unavailable');
      const info=await response.json();if(stopped||document.hidden)return;if(info?.installed!==true){publish('unsupported');return}if(typeof info.version!=='string'||!/^\d+\.\d+\.\d+(?:[-+][0-9A-Za-z.-]+)?$/.test(info.version.trim()))throw Error('Invalid Companion version');publish('available',info);
    }catch(_){if(!stopped&&!document.hidden)publish('unavailable')}finally{checking=false;if(!stopped&&subscribers.size){jobs.later('companion',detect,checkAgain?0:capability.status==='unavailable'?5000:60000);checkAgain=false}}
  }
  const companion={snapshot:()=>({...capability}),refresh:detect,subscribe(name,fn){subscribers.set(name,fn);fn({...capability});if(!checking)detect();return()=>{if(subscribers.get(name)===fn)subscribers.delete(name);if(!subscribers.size)jobs.cancel('companion')}}};
  window.__comfierDocument={subscribe,refresh:probe,requests,companion,reportEndpoint(name,status){endpoints.set(name,status)},snapshot:()=>({endpoints:Object.fromEntries(endpoints),watchers:Array.from(watchers.keys())}),remove(){if(stopped)return;stopped=true;jobs.dispose();capabilityRequests.remove();api?.removeEventListener?.('reconnected',reconnect);watchers.clear();subscribers.clear();delete window.__comfierDocument}};
})();

(function(){
  'use strict';if(window.__comfierSettingsRows)return;
  const entries=new Map();let host=null,unwatch=null;
  const order={'.ui-native-side-row':9,'.ui-companion-display-row':5,'.ui-node-move-row':6,'.ui-auto-reconnect-row':7,'.ui-generation-notifications-row':8,'.ui-diagnostics-row':10,'.ui-theme-launch-row':11,'.ui-accent-row':12,'.ui-font-row':13,'.ui-disconnect':14,'.ui-hard-refresh':15,'.ui-app-version':16,'.ui-companion-version':17};
  function ensure(){
    if(!document.getElementById('comfier-settings-rows-style')){const style=document.createElement('style');style.id='comfier-settings-rows-style';style.textContent=Object.entries(order).map(([selector,row])=>'#comfier-ui-zoom-test .ui-zoom-panel>'+selector+'{grid-column:1/-1!important;grid-row:'+row+'!important;min-width:0;box-sizing:border-box}').join('\n');document.head.appendChild(style)}
    if(!unwatch)unwatch=window.__comfierDocument.subscribe('settings-rows','settingsHost',next=>{host=next;if(host)for(const entry of entries.values())entry.mount(host.closest('#comfier-ui-zoom-test'))});
  }
  window.__comfierSettingsRows={register(name,mount){const entry={mount};entries.set(name,entry);const was=host;ensure();if(host&&host===was)mount(host.closest('#comfier-ui-zoom-test'));return()=>{if(entries.get(name)===entry)entries.delete(name);if(!entries.size){unwatch?.();unwatch=null;host=null}}},refresh(){window.__comfierDocument.refresh()},order};
})();

// Document layer contract. Values are bounded bands, never activation counters.
(function(){
  'use strict';
  if(window.__comfierLayers)return;
  const ranks=Object.freeze({handles:10,move:11,marker:12,sidebar:100,workspace:200,runMenu:220,bottom:400,side:500,menu:600,submenu:650,popup:700,prompt:800,diagnosticHighlight:900,diagnostics:910});
  const style=document.createElement('style');style.id='comfier-layer-contract';
  style.textContent=':root{'+Object.entries(ranks).map(([key,value])=>'--comfier-z-'+key.replace(/[A-Z]/g,c=>'-'+c.toLowerCase())+':'+value).join(';')+'}'+`
html body [data-testid="action-bar-card"],html body [data-testid="canvas-menu"],html body [role="toolbar"][aria-label="Canvas Toolbar"],html body [data-testid="view-mode-toggle"],html body .comfier-early-queue-dock,html body .comfier-workflow-floating-dock{z-index:var(--comfier-z-workspace)!important}
html body nav.side-tool-bar-container{z-index:var(--comfier-z-sidebar)!important}
/* Shared layout containers must not rank every descendant as one panel. */
html body .comfier-early-panel-layer,html body .comfier-early-side-panel-layer,html body .comfier-early-bottom-panel-layer{z-index:auto!important;isolation:auto!important}
html body .node-search-box-dialog-mask{z-index:var(--comfier-z-side)!important}
html body .comfier-early-floating-bottom{z-index:var(--comfier-z-bottom)!important}
html body #comfier-prompt-popup{z-index:var(--comfier-z-prompt)!important}
html body #comfier-diagnostics-highlight{z-index:var(--comfier-z-diagnostic-highlight)!important}
html body #comfier-diagnostics-root{z-index:var(--comfier-z-diagnostics)!important}
`;
  (document.head||document.documentElement).appendChild(style);
  function rank(el){let result=0;for(let p=el;p&&p!==document.documentElement;p=p.parentElement){const n=parseFloat(getComputedStyle(p).zIndex);if(Number.isFinite(n))result=Math.max(result,n)}return result}
  function context(el){const list=[];for(let p=el;p&&p!==document.documentElement;p=p.parentElement){const s=getComputedStyle(p);if((s.zIndex&&s.zIndex!=='auto')||(s.transform&&s.transform!=='none')||s.isolation==='isolate'||Number(s.opacity)<1)list.unshift(p)}return list}
  function compare(a,b){if(a===b)return 0;const ac=context(a),bc=context(b);let i=0;while(i<ac.length&&i<bc.length&&ac[i]===bc[i])i++;const az=parseFloat(getComputedStyle(ac[i]||a).zIndex)||0,bz=parseFloat(getComputedStyle(bc[i]||b).zIndex)||0;if(az!==bz)return az-bz;return a.compareDocumentPosition?.(b)&4?-1:1}
  window.__comfierLayers={ranks,rank,compare,context};
})();
