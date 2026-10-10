import { app } from "../../../scripts/app.js";
import { api } from "../../../scripts/api.js";
const ROUTE="/comfierui/model-download";
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


app.registerExtension({
  name: "ComfierUI.CustomFrontend.Services",
  setup() {
    window.ComfierUICompanion = Object.freeze({version:"0.1.13-FrontendTest",displayMode:true,listThemes,downloadModelOnHost});
  }
});
