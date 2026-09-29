import { app } from "../../../scripts/app.js";
import { api } from "../../../scripts/api.js";

const ROUTE = "/comfierui/model-download";
const VERSION = "0.4.4";

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


async function prepareDisplayRuntime() {
  const module = await import("/comfierui/display-assets/comfierui_display_runtime.js?v=0.4.4");
  return module.prepare();
}

async function installDisplayBundle() {
  const module = await import("/comfierui/display-assets/comfierui_display_bundle.js?v=0.4.4");
  return module.install();
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
  setup() {
    installHostDownloadBridge();
  },
});
