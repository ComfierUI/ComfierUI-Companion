import "./rolldown-runtime-xtsTai4I.js";
import { c as DownloadStatus } from "./vendor-other-BPEcPQTD.js";
import { Lt as ref, P as computed, d as defineStore } from "./vendor-vue-core-C1utdb0s.js";
import { qt as useSidebarTabStore } from "./layoutStore-CZsuzg91.js";
import { n as reportError } from "./reportError-LG-zfbNw.js";
import { r as downloadUrlToHfRepoUrl, v as isCivitaiModelUrl } from "./formatUtil-DuxXRy1z.js";
import "./envUtil-2Z8ainL3.js";
/** Electron downloads store handler */
var useElectronDownloadStore = defineStore("downloads", () => {
	const downloads = ref([]);
	const DownloadManager = void 0;
	const progressListeners = /* @__PURE__ */ new Set();
	const findByUrl = (url) => downloads.value.find((download) => url === download.url);
	async function initialize() {}
	function subscribeToDownloadProgress(listener) {
		progressListeners.add(listener);
		return () => progressListeners.delete(listener);
	}
	initialize();
	const start = ({ url, savePath, filename }) => DownloadManager.startDownload(url, savePath, filename);
	const pause = (url) => DownloadManager.pauseDownload(url);
	const resume = (url) => DownloadManager.resumeDownload(url);
	const cancel = (url) => DownloadManager.cancelDownload(url);
	return {
		downloads,
		start,
		pause,
		resume,
		cancel,
		findByUrl,
		initialize,
		subscribeToDownloadProgress,
		inProgressDownloads: computed(() => downloads.value.filter(({ status }) => status !== DownloadStatus.COMPLETED))
	};
});
//#endregion
//#region src/platform/missingModel/missingModelDownload.ts
var ALLOWED_SOURCES = [
	"https://civitai.com/",
	"https://civitai.red/",
	"https://huggingface.co/"
];
var ALLOWED_SUFFIXES = [
	".safetensors",
	".sft",
	".ckpt",
	".pth",
	".pt"
];
var WHITE_LISTED_URLS = /* @__PURE__ */ new Set([
	"https://huggingface.co/stabilityai/stable-zero123/resolve/main/stable_zero123.ckpt",
	"https://huggingface.co/TencentARC/T2I-Adapter/resolve/main/models/t2iadapter_depth_sd14v1.pth?download=true",
	"https://github.com/xinntao/Real-ESRGAN/releases/download/v0.1.0/RealESRGAN_x4plus.pth",
	"http://localhost:8188/api/devtools/fake_model.safetensors"
]);
function isModelUrlAllowlisted(url) {
	return WHITE_LISTED_URLS.has(url) || ALLOWED_SOURCES.some((source) => url.startsWith(source));
}
var MODEL_LIBRARY_TAB_ID = "model-library";
function openUrlInNewTab(url, downloadAs) {
	try {
		const protocol = new URL(url).protocol;
		if (protocol !== "https:" && protocol !== "http:") {
			console.warn("[missingModelDownload] Blocked unsupported URL scheme");
			return;
		}
	} catch {
		console.warn("[missingModelDownload] Blocked malformed download URL");
		return;
	}
	const link = document.createElement("a");
	link.href = url;
	if (downloadAs) link.download = downloadAs;
	link.target = "_blank";
	link.rel = "noopener noreferrer";
	link.click();
}
function openGatedRepoPage(url) {
	if (!isTrustedHuggingFaceUrl(url)) return;
	openUrlInNewTab(url);
}
function hasHuggingFaceHost(url) {
	try {
		return new URL(url).hostname.toLowerCase() === "huggingface.co";
	} catch {
		return false;
	}
}
function isTrustedHuggingFaceUrl(url) {
	try {
		return new URL(url).origin === "https://huggingface.co";
	} catch {
		return false;
	}
}
/**
* Converts a model download URL to a browsable page URL.
* - HuggingFace: `/resolve/` → `/blob/` (file page with model info)
* - Civitai: strips `/api/download` or `/api/v1` prefix (model page)
*/
function toBrowsableUrl(url) {
	if (isCivitaiModelUrl(url)) return url.replace("/api/download/", "/").replace("/api/v1/", "/");
	if (hasHuggingFaceHost(url)) return url.replace("/resolve/", "/blob/");
	return url;
}
function isModelDownloadable(model) {
	if (!isModelUrlAllowlisted(model.url)) return false;
	if (WHITE_LISTED_URLS.has(model.url)) return true;
	if (!ALLOWED_SUFFIXES.some((suffix) => model.name.endsWith(suffix))) return false;
	return true;
}
function modelDownloadRoute() {
	const companion = window.ComfierUICompanion;
	if (companion?.downloadModelOnHost && !location.pathname.startsWith("/__comfier_cloud__/")) return {
		host: "companion",
		download: companion.downloadModelOnHost.bind(companion)
	};
	const bridge = window.__comfyDesktop2;
	const isRemote = bridge?.isRemote?.() ?? window.__comfyDesktop2Remote ?? false;
	if (bridge?.downloadModel && !isRemote) return {
		host: "desktop2",
		download: bridge.downloadModel.bind(bridge)
	};
	return { host: "browser" };
}
/**
* Only the Electron path needs a resolved `savePath`: the desktop2 bridge takes
* the logical directory name and decides where to write, and a browser opens
* the URL instead.
*/
function modelDownloadNeedsFolderPaths() {
	return modelDownloadRoute().host === "electron";
}
function dispatchModelDownload(model, paths, { revealLegacyDownload = true } = {}) {
	if (!isModelDownloadable(model)) return {
		status: "not-dispatched",
		reason: "not-downloadable"
	};
	const route = modelDownloadRoute();
	if (route.host === "desktop2" || route.host === "companion") try {
		return {
			status: "host-requested",
			host: route.host,
			hostResult: Promise.resolve(route.download(model.url, model.name, model.directory))
		};
	} catch (error) {
		return {
			status: "dispatch-failed",
			host: route.host,
			error
		};
	}
	if (route.host === "browser") {
		openUrlInNewTab(model.url, model.name);
		return { status: "browser-requested" };
	}
	const savePath = paths[model.directory]?.[0];
	if (!savePath) return {
		status: "not-dispatched",
		reason: "missing-directory-path"
	};
	if (revealLegacyDownload) useSidebarTabStore().activeSidebarTabId = MODEL_LIBRARY_TAB_ID;
	try {
		return {
			status: "host-requested",
			host: "electron",
			hostResult: Promise.resolve(useElectronDownloadStore().start({
				url: model.url,
				savePath,
				filename: model.name
			}))
		};
	} catch (error) {
		return {
			status: "dispatch-failed",
			host: "electron",
			error
		};
	}
}
function downloadModel(model, paths) {
	const outcome = dispatchModelDownload(model, paths);
	if (outcome.status === "dispatch-failed") {
		reportError(outcome.error, {
			surface: "platform",
			errorType: "error_starting_model_download",
			tags: { host: outcome.host }
		});
		return;
	}
	if (outcome.status !== "host-requested") return;
	outcome.hostResult.catch((error) => {
		reportError(error, {
			surface: "platform",
			errorType: "error_starting_model_download",
			tags: { host: outcome.host }
		});
	});
}
var metadataCache = /* @__PURE__ */ new Map();
var inflight = /* @__PURE__ */ new Map();
async function fetchCivitaiMetadata(url, signal) {
	try {
		const pathname = new URL(url).pathname;
		const versionIdMatch = pathname.match(/^\/api\/download\/models\/(\d+)$/) ?? pathname.match(/^\/api\/v1\/models-versions\/(\d+)$/);
		if (!versionIdMatch) return {
			metadata: {
				fileSize: null,
				gatedRepoUrl: null
			},
			resolution: "failed",
			cacheable: false
		};
		const [, modelVersionId] = versionIdMatch;
		const apiUrl = `https://civitai.com/api/v1/model-versions/${modelVersionId}`;
		const res = signal ? await fetch(apiUrl, { signal }) : await fetch(apiUrl);
		if (!res.ok) return {
			metadata: {
				fileSize: null,
				gatedRepoUrl: null
			},
			resolution: "failed",
			cacheable: false
		};
		const matchingFile = (await res.json()).files.find((file) => {
			const downloadUrl = file.downloadUrl;
			return typeof downloadUrl === "string" && downloadUrl.length > 0 && downloadUrl.startsWith(url);
		});
		return {
			metadata: {
				fileSize: matchingFile?.sizeKB ? matchingFile.sizeKB * 1024 : null,
				gatedRepoUrl: null
			},
			resolution: "resolved",
			cacheable: true
		};
	} catch {
		return {
			metadata: {
				fileSize: null,
				gatedRepoUrl: null
			},
			resolution: "failed",
			cacheable: false
		};
	}
}
var GATED_STATUS_CODES = /* @__PURE__ */ new Set([
	401,
	403,
	451
]);
var HUGGING_FACE_GATED_ERROR_CODE = "GatedRepo";
function failedMetadataResult() {
	return {
		metadata: {
			fileSize: null,
			gatedRepoUrl: null
		},
		resolution: "failed",
		cacheable: false
	};
}
function getGatedRepoUrl(url, response) {
	if (!isTrustedHuggingFaceUrl(url)) return null;
	if (!GATED_STATUS_CODES.has(response.status)) return null;
	if (response.headers.get("x-error-code") !== HUGGING_FACE_GATED_ERROR_CODE) return null;
	return downloadUrlToHfRepoUrl(url);
}
function getResolvedHeadMetadata(response) {
	const contentLength = response.headers.get("content-length");
	const parsedSize = contentLength ? parseInt(contentLength, 10) : null;
	return {
		metadata: {
			fileSize: parsedSize !== null && !Number.isNaN(parsedSize) ? parsedSize : null,
			gatedRepoUrl: null
		},
		resolution: "resolved",
		cacheable: true
	};
}
function getFailedHeadMetadata(url, response) {
	const gatedRepoUrl = getGatedRepoUrl(url, response);
	if (!gatedRepoUrl) return failedMetadataResult();
	return {
		metadata: {
			fileSize: null,
			gatedRepoUrl
		},
		resolution: "resolved",
		cacheable: true
	};
}
async function fetchHeadMetadata(url, signal) {
	try {
		const response = await fetch(url, {
			method: "HEAD",
			...signal && { signal }
		});
		return response.ok ? getResolvedHeadMetadata(response) : getFailedHeadMetadata(url, response);
	} catch {
		return failedMetadataResult();
	}
}
async function fetchMetadataResult(url, signal) {
	const result = isCivitaiModelUrl(url) ? await fetchCivitaiMetadata(url, signal) : await fetchHeadMetadata(url, signal);
	const outcome = {
		metadata: result.metadata,
		resolution: result.resolution
	};
	if (result.cacheable) metadataCache.set(url, outcome);
	return outcome;
}
async function fetchModelMetadataWithStatus(url, { signal } = {}) {
	if (!isModelUrlAllowlisted(url)) return {
		metadata: {
			fileSize: null,
			gatedRepoUrl: null
		},
		resolution: "resolved"
	};
	const cached = metadataCache.get(url);
	if (cached !== void 0) return cached;
	if (signal) return fetchMetadataResult(url, signal);
	const existing = inflight.get(url);
	if (existing) return existing;
	const promise = fetchMetadataResult(url);
	inflight.set(url, promise);
	try {
		return await promise;
	} finally {
		inflight.delete(url);
	}
}
async function fetchModelMetadata(url) {
	return (await fetchModelMetadataWithStatus(url)).metadata;
}
//#endregion
//#region src/platform/missingModel/missingModelMetadata.ts
async function fetchAndStoreModelMetadata(url, store, signal) {
	const metadata = await fetchModelMetadata(url);
	if (!signal?.aborted && metadata.fileSize !== null) store.setFileSize(url, metadata.fileSize);
	if (!signal?.aborted && metadata.gatedRepoUrl) store.setGatedRepoUrl(url, metadata.gatedRepoUrl);
}
//#endregion
export { isModelDownloadable as a, openGatedRepoPage as c, fetchModelMetadataWithStatus as i, toBrowsableUrl as l, dispatchModelDownload as n, isTrustedHuggingFaceUrl as o, downloadModel as r, modelDownloadNeedsFolderPaths as s, fetchAndStoreModelMetadata as t, useElectronDownloadStore as u };
