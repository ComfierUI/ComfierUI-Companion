(function () {
  'use strict';
  // A session is one full ComfyUI document load. Workflow tabs, rotation and
  // foreground/resume do not restart it; reconnect/reload starts a new session.
  if (window.__comfierMediaSession) return;
  const storageKey='comfierMediaEnvironmentV1';
  const state={status:'checking',changed:null,backend:null,frontend:null,assetChanged:null};
  window.__comfierMediaSession={snapshot:()=>Object.assign({},state)};
  let previous=null;
  try { previous=JSON.parse(localStorage.getItem(storageKey)||'null'); } catch (_) {}
  const assets=[...document.querySelectorAll('script[src],link[rel="modulepreload"][href]')].map(el=>{
    try { const url=new URL(el.getAttribute('src')||el.getAttribute('href'),document.baseURI);return url.origin===location.origin?url.pathname:''; }catch(_){return '';}
  }).filter(Boolean).sort();
  const assetKey=JSON.stringify([...new Set(assets)]);
  async function checkOnce() {
    const requests=window.__comfierDocument.requests();
    try {
      const response=await requests.request('/system_stats',{cache:'no-store',credentials:'same-origin'},5000);
      if(!response.ok)throw Error('unavailable');const data=await response.json();
      // Optional fields: older backends may omit either version. Asset identity
      // remains a fallback; a missing field never disables video repair.
      const system=data&&data.system;
      state.backend=typeof system?.comfyui_version==='string'?system.comfyui_version:null;
      state.frontend=typeof system?.comfyui_frontend_version==='string'?system.comfyui_frontend_version:null;
      state.status=state.backend||state.frontend?'checked':'assets-only';
    }catch(_){state.status='assets-only';}
    finally{requests.remove();}
    state.assetChanged=previous&&assets.length&&previous.assets?previous.assets!==assetKey:null;
    const backendChanged=!!(previous?.backend&&state.backend&&previous.backend!==state.backend);
    const frontendChanged=!!(previous?.frontend&&state.frontend&&previous.frontend!==state.frontend);
    state.changed=previous?backendChanged||frontendChanged||state.assetChanged===true:null;
    try { localStorage.setItem(storageKey,JSON.stringify({
      backend:state.backend||previous?.backend||null,
      frontend:state.frontend||previous?.frontend||null,
      assets:assets.length?assetKey:previous?.assets||null
    })); } catch (_) {}
    // A backend/frontend replacement can change preview encoding without
    // remounting an already-open gallery. Clear stale repair attempts and
    // reuse its bounded native-event recovery path for the new environment.
    if(state.changed===true)window.__comfierGalleryVideoRepair?.revalidate?.('environment-change');
    console.log('MEDIA-SESSION '+JSON.stringify(state));
  }
  checkOnce();
})();
