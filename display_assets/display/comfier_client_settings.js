(function () {
  'use strict';
  if (window.__comfierClientSettings) { window.__comfierClientSettings.enforce(); return; }
  const KEY = 'Comfy.NodeSearchBoxImpl';
  const SIDEBAR_STYLE = 'Comfy.Sidebar.Style';
  const hiddenKeys = [KEY,SIDEBAR_STYLE,'Comfy.Sidebar.Location'];
  const exact = hiddenKeys.map(key=>'[data-setting-id="'+key+'"],[data-testid="'+key+'"],[id="'+key+'"]' ).join(',');
  const dialogs = '#comfy-settings-dialog,.comfy-settings-dialog,[data-testid="settings-dialog"],[role="dialog"],.p-dialog';
  const jobs=window.__comfierRuntime.scope('client-settings');let busy=false,stopped=false,rerun=false;
  function hide(root) {
    if (!root || root.nodeType !== 1) return;
    if (root.matches(exact)) root.style.setProperty('display','none','important');
    root.querySelectorAll(exact).forEach(el => el.style.setProperty('display','none','important'));
    // Compatibility fallback is confined to mounted dialog content, never all divs on the page.
    const scopes = root.matches(dialogs) || root.closest(dialogs) ? [root] : Array.from(root.querySelectorAll(dialogs));
    scopes.forEach(scope => {
      const candidates = [scope].concat(Array.from(scope.querySelectorAll('label,span,div,p')));
      candidates.forEach(el => {
        const text = (el.textContent || '').trim().toLowerCase();
        if (!['node search box implementation','beta: node search box implementation','beta - node search box implementation','sidebar style','sidebar location'].includes(text)) return;
        for (let row=el,depth=0; row && row!==document.body && depth<6; row=row.parentElement,depth++) {
          const control=row.querySelector('select,[role="combobox"],button,input'), rect=control&&row.getBoundingClientRect();
          if (rect && rect.height>20 && rect.height<180) { row.style.setProperty('display','none','important'); break; }
        }
      });
    });
  }
  // Device preferences use the native setting setters (including onChange),
  // but replace only the preference persistence API. Server configuration,
  // workflows and user-data APIs retain their native behavior.
  const PREFS_KEY='comfier.client.preferences.v1';
  const preferenceApis=new WeakMap(),preferenceStores=new WeakMap();
  let deviceValues=null;
  const copyPreference=value=>value===undefined?undefined:JSON.parse(JSON.stringify(value));
  try{const saved=JSON.parse(localStorage.getItem(PREFS_KEY)||'null');if(saved&&saved.schemaVersion===1&&saved.values&&typeof saved.values==='object'&&!Array.isArray(saved.values))deviceValues=saved.values}catch(_){}
  function persistPreferences(next){
    const values=copyPreference(next);
    // Fail closed when storage is unavailable: never fall through to host writes.
    localStorage.setItem(PREFS_KEY,JSON.stringify({schemaVersion:1,values}));deviceValues=values;
  }
  function preferenceSnapshot(nativeStore){
    const values=nativeStore?.settingValues||nativeStore?.values;
    if(values instanceof Map)return Object.fromEntries(values);
    return values&&typeof values==='object'&&!Array.isArray(values)?copyPreference(values):null;
  }
  function deviceApi(api,nativeStore){
    if(!api)return null;let state=preferenceApis.get(api);if(state)return state;
    const originalGet=api.getSettings,initial=preferenceSnapshot(nativeStore);
    state={restores:[],ready:null};preferenceApis.set(api,state);
    state.ready=Promise.resolve().then(async()=>{
      if(deviceValues===null){const baseline=initial||(typeof originalGet==='function'?await originalGet.call(api):{});if(deviceValues===null)persistPreferences(baseline||{})}
    });
    const response=()=>typeof Response==='function'?new Response('{}',{status:200,headers:{'Content-Type':'application/json'}}):undefined;
    for(const name of ['getSettings','getSetting','storeSetting','storeSettings','setSetting']){
      const original=api[name];if(typeof original!=='function')continue;
      const wrapper=async function(key,value){
        await state.ready;
        if(name==='getSettings')return copyPreference(deviceValues);
        if(name==='getSetting')return copyPreference(deviceValues[key]);
        const changes=name==='storeSettings'?key:{[key]:value};
        if(!changes||typeof changes!=='object'||Array.isArray(changes))throw Error('Invalid device preferences');
        const next={...deviceValues};for(const[id,settingValue]of Object.entries(changes)){if(settingValue===undefined)delete next[id];else next[id]=copyPreference(settingValue)}
        persistPreferences(next);return response();
      };
      try{api[name]=wrapper;if(api[name]!==wrapper)throw Error('Cannot isolate client preferences')}catch(error){state.restores.reverse().forEach(fn=>fn());preferenceApis.delete(api);throw error}state.restores.push(()=>{if(api[name]===wrapper)api[name]=original});
    }
    jobs.own(()=>{const guard=apiGuards.get(api);if(guard){guard.restores.reverse().forEach(fn=>fn());apiGuards.delete(api)}state.restores.reverse().forEach(fn=>fn());preferenceApis.delete(api)});
    return state;
  }
  async function hydratePreferences(api,nativeStore,s){
    const state=deviceApi(api,nativeStore);if(!state)return;
    await state.ready;if(!s||!nativeStore)return;
    let hydration=preferenceStores.get(nativeStore);if(hydration)return hydration;
    hydration=(async()=>{
      const saved=copyPreference(deviceValues),current=preferenceSnapshot(nativeStore)||{},values={...saved};
      // A setting introduced by an updated host starts at its native default,
      // rather than importing another device's value during reconnect.
      for(const key of Object.keys(current))if(!(key in saved))values[key]=nativeStore.settingsById?.[key]?.defaultValue;
      if(typeof s.setMany==='function')await s.setMany(values);
      else for(const[key,value]of Object.entries(values))if(get(s,key)!==value){if(typeof s.set==='function')await s.set(key,value);else await (s.setSettingValueAsync||s.setSettingValue).call(s,key,value)}
    })();preferenceStores.set(nativeStore,hydration);
    try{await hydration}catch(error){preferenceStores.delete(nativeStore);throw error}
  }
  // One persistence filter per API object, reference-counted across overlapping
  // policy writes. User preference writes go through device persistence below.
  const apiGuards=new WeakMap();
  function localOnly(api, keys) {
    if(!api||!['storeSetting','setSetting'].some(name=>typeof api[name]==='function'))throw Error('Client-only persistence guard is not ready');
    let guard=apiGuards.get(api);
    if(!guard){
      guard={keys:new Map(),restores:[]};apiGuards.set(api,guard);
      for(const name of ['storeSetting','storeSettings','setSetting']){
        const original=api[name];if(typeof original!=='function')continue;
        function wrapper(...args){
          const first=args[0];if(guard.keys.has(first))return Promise.resolve();
          if(name==='storeSettings'&&first&&typeof first==='object'&&!Array.isArray(first)){
            const filtered={...first};for(const key of guard.keys.keys())delete filtered[key];
            if(!Object.keys(filtered).length)return Promise.resolve();args[0]=filtered;
          }
          return original.apply(this,args);
        }
        try{api[name]=wrapper;if(api[name]!==wrapper)throw Error('Settings API is not writable');guard.restores.push(()=>{if(api[name]===wrapper)api[name]=original})}
        catch(error){guard.restores.reverse().forEach(fn=>fn());apiGuards.delete(api);throw error}
      }
    }
    for(const key of keys)guard.keys.set(key,(guard.keys.get(key)||0)+1);
    let released=false;return()=>{if(released)return;released=true;for(const key of keys){const count=guard.keys.get(key)-1;if(count)guard.keys.set(key,count);else guard.keys.delete(key)}if(!guard.keys.size){guard.restores.reverse().forEach(fn=>fn());apiGuards.delete(api)}};
  }
  let source=null,store=null,unsubscribe=null,unaction=null,observer=null,lastSignature=[];
  const definitions=new Map(),sessions=new Map(),sessionGroups=new WeakMap();
  function managedKeys(){return [...new Set([...hiddenKeys,...[...sessions.values()].filter(lease=>lease.hide&&!lease.released).map(lease=>lease.key)])]}
  function endpoint(){
    const modern=window.app?.extensionManager?.setting,legacy=window.app?.ui?.settings;
    if(typeof modern?.get==='function'&&typeof modern?.set==='function')return modern;
    if(typeof legacy?.getSettingValue==='function'&&(typeof legacy?.setSettingValueAsync==='function'||typeof legacy?.setSettingValue==='function'))return legacy;
    return null;
  }
  const get=(s,key)=>typeof s?.get==='function'?s.get(key):s?.getSettingValue?.(key);
  function setLocal(s,key,value,api=window.app?.api){
    let restore;try{restore=localOnly(api,[key])}catch(error){return Promise.reject(error)}
    try{const result=typeof s.set==='function'?s.set(key,value):(s.setSettingValueAsync||s.setSettingValue).call(s,key,value);return Promise.resolve(result).finally(restore)}catch(error){restore();return Promise.reject(error)}
  }
  function searchValue(){
    const options=store?.settingsById?.[KEY]?.options;
    const values=Array.isArray(options)?options.map(option=>typeof option==='object'?option.value:option):[];
    // The old 'litegraph' value selects V1 Vue search in the supplied frontend.
    // Preserve that UI; 'litegraph (legacy)' is a different, unsupported policy.
    return values.includes('v1 (legacy)')?'v1 (legacy)':values.includes('litegraph')?'litegraph':values.length?null:'litegraph';
  }
  function restoreDefinitions(){for(const [def,type]of definitions)if(def.type==='hidden')def.type=type;definitions.clear()}
  function applyDefinitions(){
    const liveDefinitions=new Set(managedKeys().map(key=>store?.settingsById?.[key]));
    for(const[def,type]of definitions)if(!liveDefinitions.has(def)){if(def.type==='hidden')def.type=type;definitions.delete(def)}
    for(const def of liveDefinitions)if(def&&def.type!=='hidden'){if(!definitions.has(def))definitions.set(def,def.type);def.type='hidden'}
  }
  function signature(){
    const result=[source,store];for(const key of managedKeys()){const def=store?.settingsById?.[key];result.push(def,def?.type)}
    result.push(searchValue(),get(source,KEY),get(source,'Comfy.Pointer.ClickBufferTime'));
    for(const lease of sessions.values())result.push(lease,get(lease.source,lease.key));return result;
  }
  function changed(){if(stopped)return;const next=signature();if(next.length===lastSignature.length&&next.every((value,i)=>Object.is(value,lastSignature[i])))return;lastSignature=next;jobs.frame('policy',enforce)}
  function fallback(enabled){
    if(!enabled){observer?.disconnect();observer=null;return}
    if(observer)return;
    // Only older frontends lacking reactive definitions use DOM compatibility.
    observer=(window.__comfierMutations?.create||((fn)=>window.__comfierMutations.create(fn)))(records=>{
      for(const record of records)for(const node of record.addedNodes||[]){
        if(node.nodeType===1)hide(node);
        else if(node.nodeType===3&&record.target.nodeType===1&&record.target.closest(dialogs))hide(record.target);
      }
    });observer.observe(document.documentElement,{childList:true,subtree:true});hide(document.body);
  }
  function bind(){
    const next=endpoint(),nextStore=window.__comfierUi?.pinia?.()?._s?.get('setting')||(next?.settingsById?next:null);
    deviceApi(window.app?.api,nextStore);
    if(source===next&&store===nextStore){fallback(!!source&&!store?.settingsById);return}
    unsubscribe?.();unaction?.();unsubscribe=null;unaction=null;restoreDefinitions();source=next;store=nextStore;lastSignature=[];
    if(typeof store?.$subscribe==='function')unsubscribe=store.$subscribe(changed,{detached:true});
    if(typeof store?.$onAction==='function')unaction=store.$onAction(({name,after})=>{if(['addSetting','load','set','setMany'].includes(name))after(()=>{if(stopped)return;if(name==='addSetting')applyDefinitions();changed()})},true);
    fallback(!!source&&!store?.settingsById);
  }
  async function enforce(){
    if(stopped)return;if(busy){rerun=true;return}busy=true;jobs.cancel('enforce');
    let retry=false;
    try{
      bind();if(!source)return;
      await hydratePreferences(window.app?.api,store,source);if(stopped)return;
      applyDefinitions();
      const overrides=[[KEY,searchValue()],['Comfy.Pointer.ClickBufferTime',150]];
      for(const [key,value]of overrides){
        if(value===null)continue;const current=get(source,key);
        const satisfied=key==='Comfy.Pointer.ClickBufferTime'?Number.isFinite(Number(current))&&Number(current)>=value:current===value;
        if(!satisfied)await setLocal(source,key,value);
        if(stopped)return;
        if(key===KEY)window.__comfierNodeSearchMode=value;else window.__comfierClickBufferMinimumApplied=Math.max(150,Number(get(source,key))||150);
      }
      for(const lease of sessions.values())if(!lease.released&&lease.source===source&&get(source,lease.key)!==lease.value)await setLocal(source,lease.key,lease.value,lease.api);
      lastSignature=signature();
    }catch(_){retry=true}
    finally{busy=false;if(rerun&&!stopped){rerun=false;jobs.frame('policy',enforce)}if(retry&&!stopped)jobs.later('enforce',enforce,5000)}
  }
  function acquire(owner,key,value,options={}){
    if(stopped)return null;
    bind();const existing=sessions.get(owner);if(existing&&existing.source===source&&existing.key===key&&existing.value===value)return existing;
    existing?.release();if(!source)return null;
    let groups=sessionGroups.get(source);if(!groups){groups=new Map();sessionGroups.set(source,groups)}
    let group=groups.get(key);if(group&&group.value!==value)return null;
    if(!group){group={previous:get(source,key),value,leases:new Set(),pending:Promise.resolve()};groups.set(key,group)}
    const lease={source,key,value,hide:!!options.hide,api:window.app?.api,released:false,settled:Promise.resolve(),ready:()=>!lease.released&&get(lease.source,key)===value,
      release(){if(lease.released)return lease.settled;lease.released=true;group.leases.delete(lease);if(sessions.get(owner)===lease)sessions.delete(owner);if(!stopped)applyDefinitions();lease.settled=group.pending.then(()=>{if(group.leases.size||groups.get(key)!==group)return;groups.delete(key);if(group.previous!==value&&get(lease.source,key)===value)return setLocal(lease.source,key,group.previous,lease.api)}).catch(error=>console.warn('COMFIER session setting restore',error));return lease.settled}};
    sessions.set(owner,lease);group.leases.add(lease);applyDefinitions();
    // Native setting.set updates its reactive value synchronously before await.
    lease.settled=(get(source,key)===value?Promise.resolve():setLocal(source,key,value,lease.api)).catch(error=>console.warn('COMFIER session setting',error));group.pending=Promise.all([group.pending,lease.settled]);return lease;
  }
  jobs.own(window.__comfierDocument.subscribe('client-settings','settings',()=>enforce()));
  jobs.listen(window,'comfierui-session-reconnected',enforce);
  window.__comfierClientSettings={enforce,acquire,snapshot:()=>({deviceLocal:!!preferenceApis.get(window.app?.api),metadata:!!store?.settingsById,hidden:definitions.size,fallback:!!observer,search:searchValue(),sessions:sessions.size}),remove(){stopped=true;jobs.dispose();observer?.disconnect();unsubscribe?.();unaction?.();restoreDefinitions();for(const lease of [...sessions.values()])lease.release();delete window.__comfierClientSettings;delete window.__comfierEnforceNodeSearchMode;delete window.__comfierInstallPointerClickBufferMinimum;delete window.__comfierEnforceFloatingSidebar}};
  window.__comfierEnforceNodeSearchMode=enforce;
  window.__comfierInstallPointerClickBufferMinimum=enforce;
  window.__comfierEnforceFloatingSidebar=enforce;
  enforce();
})();
