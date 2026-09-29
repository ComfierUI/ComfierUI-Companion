(function () {
  'use strict';
  if (window.__comfierClientSettings) { window.__comfierClientSettings.enforce(); return; }
  const KEY = 'Comfy.NodeSearchBoxImpl';
  const SIDEBAR_STYLE = 'Comfy.Sidebar.Style';
  const hiddenKeys = [KEY,SIDEBAR_STYLE];
  const exact = hiddenKeys.map(key=>'[data-setting-id="'+key+'"],[data-testid="'+key+'"],[id="'+key+'"]' ).join(',');
  const dialogs = '#comfy-settings-dialog,.comfy-settings-dialog,[data-testid="settings-dialog"],[role="dialog"],.p-dialog';
  const jobs=window.__comfierRuntime.scope('client-settings');let busy=false,stopped=false;
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
        if (!['node search box implementation','beta: node search box implementation','beta - node search box implementation','sidebar style'].includes(text)) return;
        for (let row=el,depth=0; row && row!==document.body && depth<6; row=row.parentElement,depth++) {
          const control=row.querySelector('select,[role="combobox"],button,input'), rect=control&&row.getBoundingClientRect();
          if (rect && rect.height>20 && rect.height<180) { row.style.setProperty('display','none','important'); break; }
        }
      });
    });
  }
  function localOnly(api, keys) {
    const blocked=new Set(Array.isArray(keys)?keys:[keys]);
    const restore=[];
    if (api) ['storeSetting','storeSettings','setSetting'].forEach(name => {
      const original=api[name];
      if (typeof original!=='function') return;
      function wrapper() {
        const first=arguments[0];
        if (blocked.has(first)) return Promise.resolve();
        if (name==='storeSettings' && first && typeof first==='object' && !Array.isArray(first) && Array.from(blocked).some(key=>Object.prototype.hasOwnProperty.call(first,key))) {
          const filtered=Object.assign({},first);blocked.forEach(key=>delete filtered[key]);
          if (!Object.keys(filtered).length) return Promise.resolve();
          const args=Array.from(arguments);args[0]=filtered;return original.apply(this,args);
        }
        return original.apply(this,arguments);
      }
      try { api[name]=wrapper;restore.push(() => { if(api[name]===wrapper)api[name]=original; }); } catch (_) {}
    });
    return () => restore.reverse().forEach(fn=>fn());
  }
  async function enforce() {
    if (busy||stopped) return;
    jobs.cancel('enforce');busy=true;
    let retry=false;
    try {
      const app=window.app, modern=app&&app.extensionManager&&app.extensionManager.setting, legacy=app&&app.ui&&app.ui.settings;
      let get,set;
      if (modern && typeof modern.get==='function' && typeof modern.set==='function') { get=k=>modern.get(k);set=(k,v)=>modern.set(k,v); }
      else if (legacy && typeof legacy.getSettingValue==='function' && typeof legacy.setSettingValue==='function') { get=k=>legacy.getSettingValue(k);set=(k,v)=>legacy.setSettingValue(k,v); }
      else { return; }
      const overrides=[[KEY,'litegraph'],['Comfy.Pointer.ClickBufferTime',150],[SIDEBAR_STYLE,'floating']];
      for (const [key,value] of overrides) {
        const current=get(key), satisfied=key==='Comfy.Pointer.ClickBufferTime'?(Number.isFinite(Number(current))&&Number(current)>=value):current===value;
        if (!satisfied) {
          const restore=localOnly(app.api,overrides.map(entry=>entry[0]));
          try { await set(key,value); } finally { restore(); }
        }
        if (key===KEY) window.__comfierNodeSearchMode='litegraph';
        else if(key==='Comfy.Pointer.ClickBufferTime') window.__comfierClickBufferMinimumApplied=Math.max(150,Number(get(key))||150);
        else if(key===SIDEBAR_STYLE) window.__comfierSidebarStyle='floating';
      }

    } catch (_) { retry=true; }
    finally {
      busy=false;
      if(retry&&!stopped)jobs.later('enforce',enforce,5000);
    }
  }
  const observer=window.__comfierMutations.create(records=>{
    for (const record of records) {
      for (const node of record.addedNodes) {
        if (node.nodeType===1) { hide(node);if(node.matches?.(dialogs)||node.querySelector?.(dialogs))enforce(); }
        else if (node.nodeType===3 && record.target.nodeType===1 && record.target.closest(dialogs)) { hide(record.target);enforce(); }
      }
    }
  });
  observer.observe(document.documentElement,{childList:true,subtree:true});
  hide(document.body);
  jobs.own(window.__comfierDocument.subscribe('client-settings','settings',value=>{if(value)enforce()}));
  window.__comfierClientSettings={enforce,remove(){stopped=true;jobs.dispose();observer.disconnect();delete window.__comfierClientSettings;delete window.__comfierEnforceNodeSearchMode;delete window.__comfierInstallPointerClickBufferMinimum;delete window.__comfierEnforceFloatingSidebar;}};
  window.__comfierEnforceNodeSearchMode=enforce;
  window.__comfierInstallPointerClickBufferMinimum=enforce;
  window.__comfierEnforceFloatingSidebar=enforce;
  enforce();
})();
