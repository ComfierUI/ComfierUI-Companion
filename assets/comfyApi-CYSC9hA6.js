import "./rolldown-runtime-xtsTai4I.js";
import { a as configValueOrDefault, s as remoteConfig } from "./remoteConfig-DwMQrLli.js";
//#region src/config/comfyApi.ts
var STAGING_API_BASE_URL = "https://stagingapi.comfy.org";
var STAGING_CLOUD_BASE_URL = "https://testcloud.comfy.org";
var STAGING_PLATFORM_BASE_URL = "https://stagingplatform.comfy.org";
var BUILD_TIME_API_BASE_URL = STAGING_API_BASE_URL;
var BUILD_TIME_CLOUD_BASE_URL = STAGING_CLOUD_BASE_URL;
var BUILD_TIME_PLATFORM_BASE_URL = STAGING_PLATFORM_BASE_URL;
function resolveBaseUrl(key, defaultValue) {
	const value = configValueOrDefault(remoteConfig.value, key, defaultValue);
	try {
		const url = new URL(value);
		if (url.protocol !== "https:" || !url.hostname) return defaultValue;
		return url.href.replace(/\/$/, "");
	} catch {
		return defaultValue;
	}
}
function getComfyApiBaseUrl() {
	return resolveBaseUrl("comfy_api_base_url", BUILD_TIME_API_BASE_URL);
}
function getComfyCloudBaseUrl() {
	return resolveBaseUrl("comfy_cloud_base_url", BUILD_TIME_CLOUD_BASE_URL);
}
function getComfyPlatformBaseUrl() {
	return resolveBaseUrl("comfy_platform_base_url", BUILD_TIME_PLATFORM_BASE_URL);
}
//#endregion
export { getComfyCloudBaseUrl as n, getComfyPlatformBaseUrl as r, getComfyApiBaseUrl as t };
