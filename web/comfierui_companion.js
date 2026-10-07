import { app } from "../../../scripts/app.js";
import { api } from "../../../scripts/api.js";

const ROUTE = "/comfierui/model-download";
const VERSION = "0.7.13";
import { prepareDesktop, installDesktopClose } from "./comfierui_desktop.js";
import { installBrowserThemes } from "./comfierui_browser_themes.js";

async function listThemes() {
  const response=await api.fetchApi('/comfierui/themes',{cache:'no-store'});
  if(!response.ok)throw new Error('Unable to load Companion themes (HTTP '+response.status+').');
  const data=await response.json();return data.profiles;
}

async function downloadModelOnHost(url, name, directory) {
  const response = await api.fetchApi(ROUTE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url, name, directory }),
  });

  if (!response.ok) {
    const message = (await response.text()) || `HTTP ${response.status}`;
    throw new Error(`ComfierUI host download was rejected: ${message}`);
  }

  const result = await response.json();
  window.dispatchEvent(new CustomEvent("comfierui-download-accepted", { detail: result }));
  if (typeof window.__comfierPollDownloads === "function") {
    window.__comfierPollDownloads();
  }
  return true;
}


let uiRevision,revisionRequest;
async function activeRevision(){
  if(window.__comfierUiBundleSync)await window.__comfierUiBundleSync;
  if(!revisionRequest)revisionRequest=(async()=>{const r=await api.fetchApi('/comfierui/ui-bundle',{cache:'no-store'});if(!r.ok)throw Error('UI bundle status unavailable');const s=await r.json();uiRevision=s.active;return uiRevision})();
  return revisionRequest;
}
async function recoverUiBundle(error){
  const guard='comfier.ui.bundle.rollback';
  if(uiRevision&&sessionStorage.getItem(guard)!==uiRevision.revision){
    const r=await api.fetchApi('/comfierui/ui-bundle',{cache:'no-store'}),s=await r.json();
    if(s.previous&&s.active.revision===uiRevision.revision){
      const rolled=await api.fetchApi('/comfierui/ui-bundle',{method:'POST',headers:{'Content-Type':'application/json','X-Comfier-UI-Token':s.token},body:JSON.stringify({rollback:uiRevision.revision})});
      if(rolled.ok){sessionStorage.setItem(guard,uiRevision.revision);location.reload();return new Promise(()=>{});}
    }
  }
  throw error;
}
async function prepareDisplayRuntime() {
  try{const revision=await activeRevision();const module=await import('/comfierui/display-assets/revisions/'+revision.revision+'/comfierui_display_runtime.js');return await module.prepare();}catch(error){return recoverUiBundle(error);}
}
async function installDisplayBundle(browser = false) {
  try{const revision=await activeRevision();const module=await import(browser ? '/comfierui/browser-assets/comfierui_display_bundle.js?revision='+revision.revision : '/comfierui/display-assets/revisions/'+revision.revision+'/comfierui_display_bundle.js');const result=await module.install();window.__comfierActiveUiBundle=revision;return result;}catch(error){return recoverUiBundle(error);}
}

function installHostDownloadBridge() {
  const api = { version: VERSION, listThemes, downloadModelOnHost, prepareDisplayRuntime, installDisplayBundle, displayMode: true };
  window.ComfierUICompanion = Object.freeze(api);

  const existing = window.__comfyDesktop2 || {};
  if (typeof existing.downloadModel === "function") return;

  existing.downloadModel = downloadModelOnHost;
  existing.isRemote = () => false;
  window.__comfyDesktop2 = existing;
}

app.registerExtension({
  name: "ComfierUI.HostModelDownloads",
  async setup() {
    installHostDownloadBridge();
    if (!document.querySelector('meta[name="comfierui-gateway"]') || window.__comfierNativeUiOwner || window.ComfyRemoteDownloads) return;
    window.app = app;
    window.__comfierNativeUiOwner = 'companion';
    try {
      const desktop = prepareDesktop();
      if (desktop) await installBrowserThemes();
      await prepareDisplayRuntime();
      await installDisplayBundle(desktop);
      window.__comfierBrowserThemesReady?.();
      if (!desktop) window.__comfierThemeStudio?.syncProfiles().catch(console.error);
      if (desktop) installDesktopClose();
    } catch (error) {
      console.error('ComfierUI browser startup failed', error);
      const message = document.createElement('p');
      message.setAttribute('role', 'alert');
      message.textContent = 'ComfierUI could not start: ' + error.message + '. Reload to retry.';
      document.body.appendChild(message);
    }
  },
});
