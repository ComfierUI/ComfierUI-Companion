import { app } from "../../../scripts/app.js";
import { api } from "../../../scripts/api.js";

const ROUTE = "/comfierui/model-download";
const VERSION = "0.3.1";

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

  return true;
}

function installHostDownloadBridge() {
  const api = { version: VERSION, downloadModelOnHost };
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
