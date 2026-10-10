const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./api-DFyhvH4z.js","./api-Bt-fGt5a.js","./rolldown-runtime-xtsTai4I.js","./vendor-datadog-DudeEV66.js","./vendor-other-BPEcPQTD.js","./vendor-three-DQpYrwAh.js","./vendor-vue-core-C1utdb0s.js","./vendor-zod-TMj9Wsdv.js","./vendor-tiptap-BT_4t92m.js","./requestAuth-YeU5GIXc.js","./vendor-vueuse-BxKIIsKg.js","./telemetry-IkzvF0TI.js","./zod.gen-C09SPgBJ.js","./vendor-axios-QnwcNXlY.js","./vendor-sentry-zSXGkMPN.js","./reportError-LG-zfbNw.js","./hostTelemetryEnabled-BZ3GL1Cu.js","./remoteConfig-DwMQrLli.js","./vendor-firebase-B37L--zT.js","./toastStore-CTfykAzG.js","./vendor-other-DODGPXtn.css"])))=>i.map(i=>d[i]);
import "./rolldown-runtime-xtsTai4I.js";
import { a as __vitePreload } from "./vendor-datadog-DudeEV66.js";
import { c as remoteConfigErrorStatus, d as sessionAgentGrant, f as sessionAgentGrantValidUntil, i as cachedV1PaymentRecovery, l as remoteConfigRevision, n as cachedBillingControlEnabled, r as cachedLegacyBillingMigrationEnabled, s as remoteConfig, t as authenticatedRemoteConfigState, u as remoteConfigState } from "./remoteConfig-DwMQrLli.js";
//#endregion
//#region src/platform/remoteConfig/refreshRemoteConfig.ts
var FEATURES_FETCH_TIMEOUT_MS = 5e3;
var AGENT_GRANT_FALLBACK_MS = 9e5;
var refreshGeneration = 0;
var authenticatedLoadingGeneration;
var agentGrantExpiryTimer;
var activeRefreshControllers = /* @__PURE__ */ new Set();
function clearSessionAgentGrant() {
	clearTimeout(agentGrantExpiryTimer);
	agentGrantExpiryTimer = void 0;
	sessionAgentGrant.value = void 0;
	sessionAgentGrantValidUntil.value = void 0;
}
function cacheSessionAgentGrant(granted) {
	clearTimeout(agentGrantExpiryTimer);
	sessionAgentGrant.value = granted;
	const validUntil = Date.now() + AGENT_GRANT_FALLBACK_MS;
	sessionAgentGrantValidUntil.value = validUntil;
	agentGrantExpiryTimer = setTimeout(() => {
		if (sessionAgentGrantValidUntil.value !== validUntil) return;
		clearSessionAgentGrant();
	}, AGENT_GRANT_FALLBACK_MS);
}
function invalidateRemoteConfig() {
	refreshGeneration++;
	authenticatedLoadingGeneration = void 0;
	for (const controller of activeRefreshControllers) controller.abort();
	activeRefreshControllers.clear();
	const { comfy_api_base_url, comfy_cloud_base_url, comfy_platform_base_url } = remoteConfig.value;
	const retainedConfig = {
		...comfy_api_base_url && { comfy_api_base_url },
		...comfy_cloud_base_url && { comfy_cloud_base_url },
		...comfy_platform_base_url && { comfy_platform_base_url }
	};
	window.__CONFIG__ = retainedConfig;
	remoteConfig.value = retainedConfig;
	remoteConfigErrorStatus.value = null;
	remoteConfigState.value = "unloaded";
	authenticatedRemoteConfigState.value = "unloaded";
	cachedLegacyBillingMigrationEnabled.value = void 0;
	clearSessionAgentGrant();
}
async function fetchRemoteConfig(useAuth, signal) {
	const { api } = await __vitePreload(async () => {
		const { api } = await import("./api-DFyhvH4z.js");
		return { api };
	}, __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]), import.meta.url);
	if (!useAuth) return {
		response: await fetch(api.apiURL("/features"), {
			cache: "no-store",
			signal
		}),
		authenticated: false
	};
	let authenticated = false;
	return {
		response: await api.fetchApi("/features", {
			cache: "no-store",
			signal,
			onAuthHeader: (attached) => {
				authenticated = attached;
			}
		}),
		authenticated
	};
}
function commitRemoteConfigSuccess(config, useAuth) {
	window.__CONFIG__ = config;
	remoteConfig.value = config;
	remoteConfigErrorStatus.value = null;
	remoteConfigState.value = useAuth ? "authenticated" : "anonymous";
	if (useAuth) {
		authenticatedRemoteConfigState.value = "authenticated";
		authenticatedLoadingGeneration = void 0;
		cachedBillingControlEnabled.value = Boolean(config.billing_control_enabled);
		cachedLegacyBillingMigrationEnabled.value = Boolean(config.legacy_billing_migration_enabled);
		cachedV1PaymentRecovery.value = Boolean(config.v1_payment_recovery);
		cacheSessionAgentGrant(config["agent-in-app-experience"] === true);
	} else {
		authenticatedRemoteConfigState.value = "unloaded";
		authenticatedLoadingGeneration = void 0;
		clearSessionAgentGrant();
	}
	remoteConfigRevision.value++;
}
/**
* The anonymous document answers `unified_web_session` false for a cookie-only
* caller; only a credentialed read that names its client is authoritative.
*/
async function readCredentialedWebSessionFlag(config, generation) {}
function commitRemoteConfigFailure(response, useAuth) {
	console.warn("Failed to load remote config:", response.statusText);
	if (response.status === 401 || response.status === 403) {
		if (useAuth) {
			remoteConfigErrorStatus.value = response.status;
			window.__CONFIG__ = {};
			remoteConfig.value = {};
			clearSessionAgentGrant();
		} else remoteConfigErrorStatus.value = null;
	} else remoteConfigErrorStatus.value = null;
	if (useAuth) cachedLegacyBillingMigrationEnabled.value = void 0;
	if (useAuth) {
		authenticatedRemoteConfigState.value = "error";
		authenticatedLoadingGeneration = void 0;
	}
	remoteConfigState.value = "error";
	remoteConfigRevision.value++;
}
function commitRemoteConfigException(error, useAuth) {
	console.error("Failed to fetch remote config:", error);
	remoteConfigErrorStatus.value = null;
	if (useAuth) cachedLegacyBillingMigrationEnabled.value = void 0;
	if (useAuth) {
		authenticatedRemoteConfigState.value = "error";
		authenticatedLoadingGeneration = void 0;
	}
	remoteConfigState.value = "error";
	remoteConfigRevision.value++;
}
/**
* Loads remote configuration from the backend /features endpoint
* and updates the reactive remoteConfig ref.
*
* Sets remoteConfigState to:
* - 'anonymous' when loaded without auth
* - 'authenticated' when loaded with auth
* - 'error' when load fails
*/
async function refreshRemoteConfig(options = {}) {
	const { useAuth = true, signal } = options;
	const generation = ++refreshGeneration;
	const previousAuthenticatedState = authenticatedRemoteConfigState.value;
	if (useAuth && previousAuthenticatedState !== "authenticated") {
		authenticatedRemoteConfigState.value = "loading";
		authenticatedLoadingGeneration = generation;
	}
	const controller = new AbortController();
	activeRefreshControllers.add(controller);
	const abort = () => controller.abort();
	signal?.addEventListener("abort", abort, { once: true });
	if (signal?.aborted) abort();
	const timeoutId = setTimeout(() => controller.abort(), FEATURES_FETCH_TIMEOUT_MS);
	try {
		const { response, authenticated } = await fetchRemoteConfig(useAuth, controller.signal);
		if (generation !== refreshGeneration) return;
		if (signal?.aborted) return;
		if (response.ok) {
			const config = await response.json();
			if (generation !== refreshGeneration) return;
			if (signal?.aborted) return;
			if (useAuth && !authenticated) {
				authenticatedRemoteConfigState.value = "error";
				authenticatedLoadingGeneration = void 0;
				remoteConfigErrorStatus.value = null;
				remoteConfigState.value = "error";
				console.warn("Rejected authenticated remote config response without credentials");
				remoteConfigRevision.value++;
				return;
			}
			commitRemoteConfigSuccess(config, useAuth);
			if (!useAuth) await readCredentialedWebSessionFlag(config, generation);
			return;
		}
		commitRemoteConfigFailure(response, useAuth);
	} catch (error) {
		if (generation !== refreshGeneration) return;
		if (signal?.aborted) return;
		commitRemoteConfigException(error, useAuth);
	} finally {
		if (authenticatedLoadingGeneration === generation) {
			authenticatedRemoteConfigState.value = previousAuthenticatedState;
			authenticatedLoadingGeneration = void 0;
		}
		clearTimeout(timeoutId);
		signal?.removeEventListener("abort", abort);
		activeRefreshControllers.delete(controller);
	}
}
//#endregion
export { refreshRemoteConfig as n, invalidateRemoteConfig as t };
