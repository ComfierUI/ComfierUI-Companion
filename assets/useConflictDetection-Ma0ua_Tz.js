const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./i18n-C9YFFZqs.js","./i18n-C3J-ToPr.js","./rolldown-runtime-xtsTai4I.js","./vendor-datadog-DudeEV66.js","./vendor-i18n-BZvE7WBQ.js","./vendor-vue-core-C1utdb0s.js","./formatUtil-DuxXRy1z.js","./commands-BcZ6fU3-.js","./main-BfqkkuXX.js","./nodeDefs-CFOSmIZi.js","./settings-B3DInspu.js"])))=>i.map(i=>d[i]);
import { a as __toESM } from "./rolldown-runtime-xtsTai4I.js";
import { a as __vitePreload } from "./vendor-datadog-DudeEV66.js";
import { $ as mapKeys, B as require_quick_lru, G as require_semver, J as isEmpty, Y as pickBy, at as uniqBy, ct as isNil, ht as groupBy, l as v4, ut as partition, yt as find } from "./vendor-other-BPEcPQTD.js";
import { G as defineComponent, It as readonly, Jt as normalizeClass, K as getCurrentInstance, Kt as unref, Lt as ref, P as computed, R as createElementBlock, St as watch, d as defineStore, ft as renderSlot, lt as openBlock, p as storeToRefs, st as onUnmounted } from "./vendor-vue-core-C1utdb0s.js";
import { U as useStorage, Z as get, dt as whenever, it as until, p as useAsyncState, x as useEventListener } from "./vendor-vueuse-BxKIIsKg.js";
import { Hl as useCloudWebSessionStore, Jc as isAbortError, Ml as useSettingsDialog, Nl as useComfierPanelStore, Q as useApiKeyAuthStore, Vl as readsSignedInWebSession, Zr as useCommandStore, cu as PRESERVED_QUERY_NAMESPACES, i as useSettingStore, jt as useWorkflowStore, lu as capturePreservedQuery, o as app, ti as bootstrapTracer, tt as useAuthStore } from "./layoutStore-CZsuzg91.js";
import { i as api } from "./api-Bt-fGt5a.js";
import { r as axios } from "./vendor-axios-QnwcNXlY.js";
import { n as reportError } from "./reportError-LG-zfbNw.js";
import { t as useToastStore } from "./toastStore-CTfykAzG.js";
import { d as t } from "./i18n-C3J-ToPr.js";
import { E as paramsToCacheKey } from "./formatUtil-DuxXRy1z.js";
import { t as useFeatureFlags } from "./useFeatureFlags-DAoj_aDd.js";
import { t as cn } from "./src-DI1bBfrb.js";
import { t as useSystemStatsStore } from "./systemStatsStore-3gc4cifl.js";
import { t as useUserStore } from "./userStore-DBaUQ6bl.js";
//#region src/platform/auth/session/cloudIdentityBoot.ts
var DIFFERENT_LOGIN_SIGN_OUT_TIMEOUT_MS = 5e3;
var boots = /* @__PURE__ */ new WeakMap();
/** With SSO on, a signed-in session outranks a stored key; the key stays the fallback. */
async function storedApiKeyIsTheLogin() {
	if (useApiKeyAuthStore().getApiKey() === null) return false;
	const { flags } = useFeatureFlags();
	if (!flags.ssoEnabled || !flags.unifiedWebSessionEnabled) return true;
	return !await readsSignedInWebSession();
}
async function bootOnce() {
	const auth = useAuthStore();
	if (auth.currentUser === null && await storedApiKeyIsTheLogin()) return;
	const webSession = useCloudWebSessionStore();
	if (!webSession.start()) return;
	await webSession.whenReady();
	const sessionId = webSession.signedInUser?.id;
	if (sessionId && auth.currentUser && auth.currentUser.uid !== sessionId) await until(() => auth.currentUser === null).toBe(true, { timeout: DIFFERENT_LOGIN_SIGN_OUT_TIMEOUT_MS });
}
/** Starts the web session once Firebase has restored, so it sees the remembered login. */
function bootCloudIdentity() {
	const webSession = useCloudWebSessionStore();
	const boot = boots.get(webSession) ?? bootOnce();
	boots.set(webSession, boot);
	return boot;
}
async function cloudSignIn() {
	const auth = useAuthStore();
	const hasTokenLogin = async () => await auth.getAuthHeader() !== null;
	await bootCloudIdentity();
	const webSession = useCloudWebSessionStore();
	await webSession.whenSessionCreated();
	if (!webSession.isActive()) return await hasTokenLogin() ? "signed_in" : "signed_out";
	const { state } = webSession;
	if (state.phase === "signed_in") return "signed_in";
	if (state.phase === "signed_out" && state.outcome === "revoked") return "signed_out";
	if (await hasTokenLogin()) return "signed_in";
	return state.phase === "retry_wait" ? "pending" : "signed_out";
}
//#endregion
//#region src/platform/workflow/sharing/utils/shareAuthAttribution.ts
var SHARE_QUERY_KEY = "share";
var MAX_SHARE_ID_LENGTH = 128;
var SHARE_ID_PATTERN = /^[a-zA-Z0-9][a-zA-Z0-9_.-]*$/;
function isValidShareId(shareId) {
	return shareId.length <= MAX_SHARE_ID_LENGTH && SHARE_ID_PATTERN.test(shareId);
}
function preserveLoggedOutShareAuthAttribution(query, isLoggedIn) {
	if (isLoggedIn) return;
	const shareId = query[SHARE_QUERY_KEY];
	if (typeof shareId !== "string" || !isValidShareId(shareId)) return;
	capturePreservedQuery(PRESERVED_QUERY_NAMESPACES.SHARE_AUTH, { [SHARE_QUERY_KEY]: shareId }, [SHARE_QUERY_KEY]);
}
//#endregion
//#region src/stores/bootstrapStore.ts
/**
* Backends that vendor no custom-node locale files do not implement
* `/api/i18n`, so a 404 means "no custom-node translations", not a failure.
*/
async function fetchCustomNodesI18n() {
	try {
		return await api.getCustomNodesI18n();
	} catch (error) {
		if (axios.isAxiosError(error) && error.response?.status === 404) return;
		throw error;
	}
}
var useBootstrapStore = defineStore("bootstrap", () => {
	const settingStore = useSettingStore();
	const workflowStore = useWorkflowStore();
	const { isReady: isI18nReady, error: i18nError, execute: loadI18n } = useAsyncState(async () => {
		const { mergeCustomNodesI18n } = await __vitePreload(async () => {
			const { mergeCustomNodesI18n } = await import("./i18n-C9YFFZqs.js");
			return { mergeCustomNodesI18n };
		}, __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10]), import.meta.url);
		const i18nData = await fetchCustomNodesI18n();
		if (i18nData) mergeCustomNodesI18n(i18nData);
	}, void 0, { immediate: false });
	let storesLoaded = false;
	function loadAuthenticatedStores() {
		if (storesLoaded) return [];
		storesLoaded = true;
		return [bootstrapTracer.settle("bootstrap/settings", () => settingStore.load()), bootstrapTracer.settle("bootstrap/workflows", () => workflowStore.loadWorkflows())];
	}
	async function startStoreBootstrap() {
		loadI18n();
		const userStore = useUserStore();
		await bootstrapTracer.settle("auth-gate/user-store", () => userStore.initialize());
		const { needsLogin } = storeToRefs(userStore);
		await bootstrapTracer.settle("auth-gate/needs-login", () => until(needsLogin).toBe(false));
		const storeLoads = loadAuthenticatedStores();
		Promise.allSettled(storeLoads).then(() => {
			bootstrapTracer.milestone("stores-ready");
		});
	}
	return {
		isI18nReady,
		i18nError,
		startStoreBootstrap
	};
});
//#endregion
//#region src/components/ui/dialog/DialogFooter.vue
var DialogFooter_default = /* @__PURE__ */ defineComponent({
	__name: "DialogFooter",
	props: { class: {
		type: [
			Boolean,
			null,
			String,
			Object,
			Array
		],
		default: ""
	} },
	setup(__props) {
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", { class: normalizeClass(unref(cn)("flex shrink-0 items-center justify-end gap-2 px-4 pt-2 pb-4", __props.class)) }, [renderSlot(_ctx.$slots, "default")], 2);
		};
	}
});
//#endregion
//#region src/config.ts
var import_semver = require_semver();
var import_quick_lru = /* @__PURE__ */ __toESM(require_quick_lru(), 1);
var config_default = {
	app_title: "ComfyUI",
	app_version: void 0
};
//#endregion
//#region src/services/comfyRegistryService.ts
var registryApiClient = axios.create({
	baseURL: "https://api.comfy.org",
	headers: { "Content-Type": "application/json" },
	paramsSerializer: { indexes: null }
});
/**
* Service for interacting with the Comfy Registry API
*/
var useComfyRegistryService = () => {
	const isLoading = ref(false);
	const error = ref(null);
	const handleApiError = (err, context, routeSpecificErrors) => {
		if (!axios.isAxiosError(err)) return err instanceof Error ? `${context}: ${err.message}` : `${context}: Unknown error occurred`;
		const axiosError = err;
		if (axiosError.response) {
			const { status, data } = axiosError.response;
			if (routeSpecificErrors && routeSpecificErrors[status]) return routeSpecificErrors[status];
			switch (status) {
				case 400: return `Bad request: ${data.message || "Invalid input"}`;
				case 401: return "Unauthorized: Authentication required";
				case 403: return `Forbidden: ${data.message || "Access denied"}`;
				case 404: return `Not found: ${data.message || "Resource not found"}`;
				case 409: return `Conflict: ${data.message || "Resource conflict"}`;
				case 500: return `Server error: ${data.message || "Internal server error"}`;
				default: return `${context}: ${data.message || axiosError.message}`;
			}
		}
		return `${context}: ${axiosError.message}`;
	};
	/**
	* Execute an API request with error and loading state handling
	* @param apiCall - Function that returns a promise with the API call
	* @param errorContext - Context description for error messages
	* @param routeSpecificErrors - Optional map of status codes to custom error messages
	* @returns Promise with the API response data or null if the request failed
	*/
	const executeApiRequest = async (apiCall, errorContext, routeSpecificErrors) => {
		isLoading.value = true;
		error.value = null;
		try {
			return (await apiCall()).data;
		} catch (err) {
			if (isAbortError(err)) return null;
			error.value = handleApiError(err, errorContext, routeSpecificErrors);
			return null;
		} finally {
			isLoading.value = false;
		}
	};
	/**
	* Get the Comfy Node definitions in a specific version of a node pack
	* @param packId - The ID of the node pack
	* @param versionId - The version of the node pack
	* @returns The node definitions or null if not found or an error occurred
	*/
	const getNodeDefs = async (params, signal) => {
		const { packId, version: versionId, ...queryParams } = params;
		if (!packId || !versionId) return null;
		const endpoint = `/nodes/${packId}/versions/${versionId}/comfy-nodes`;
		return executeApiRequest(() => registryApiClient.get(endpoint, {
			params: queryParams,
			signal
		}), "Failed to get node definitions", {
			403: "This pack has been banned and its definition is not available",
			404: "The requested node, version, or comfy node does not exist"
		});
	};
	/**
	* Get a paginated list of packs matching specific criteria.
	* Search packs using `search` param. Search individual nodes using `comfy_node_search` param.
	*/
	const search = async (params, signal) => {
		const endpoint = "/nodes/search";
		return executeApiRequest(() => registryApiClient.get(endpoint, {
			params,
			signal
		}), "Failed to perform search");
	};
	/**
	* Get publisher information
	*/
	const getPublisherById = async (publisherId, signal) => {
		const endpoint = `/publishers/${publisherId}`;
		const errorContext = "Failed to get publisher";
		const routeSpecificErrors = { 404: `Publisher not found: The publisher with ID ${publisherId} does not exist` };
		return executeApiRequest(() => registryApiClient.get(endpoint, { signal }), errorContext, routeSpecificErrors);
	};
	/**
	* List all packs associated with a specific publisher
	*/
	const listPacksForPublisher = async (publisherId, includeBanned, signal) => {
		const params = includeBanned ? { include_banned: true } : void 0;
		const endpoint = `/publishers/${publisherId}/nodes`;
		const errorContext = "Failed to list packs for publisher";
		const routeSpecificErrors = {
			400: "Bad request: Invalid input data",
			404: `Publisher not found: The publisher with ID ${publisherId} does not exist`
		};
		return executeApiRequest(() => registryApiClient.get(endpoint, {
			params,
			signal
		}), errorContext, routeSpecificErrors);
	};
	/**
	* Add a review for a pack
	*/
	const postPackReview = async (packId, star, signal) => {
		const endpoint = `/nodes/${packId}/reviews`;
		const params = { star };
		const errorContext = "Failed to add review";
		const routeSpecificErrors = {
			400: "Bad request: Invalid review",
			404: `Pack not found: Pack with ID ${packId} does not exist`
		};
		return executeApiRequest(() => registryApiClient.post(endpoint, null, {
			params,
			signal
		}), errorContext, routeSpecificErrors);
	};
	/**
	* Get a paginated list of all packs on the registry
	*/
	const listAllPacks = async (params, signal) => {
		const endpoint = "/nodes";
		return executeApiRequest(() => registryApiClient.get(endpoint, {
			params,
			signal
		}), "Failed to list packs");
	};
	/**
	* Get a list of all pack versions
	*/
	const getPackVersions = async (packId, params, signal) => {
		const endpoint = `/nodes/${packId}/versions`;
		const errorContext = "Failed to get pack versions";
		const routeSpecificErrors = {
			403: "This pack has been banned and its versions are not available",
			404: `Pack not found: Pack with ID ${packId} does not exist`
		};
		return executeApiRequest(() => registryApiClient.get(endpoint, {
			params,
			signal
		}), errorContext, routeSpecificErrors);
	};
	/**
	* Get a specific pack by ID and version
	*/
	const getPackByVersion = async (packId, versionId, signal) => {
		const endpoint = `/nodes/${packId}/versions/${versionId}`;
		const errorContext = "Failed to get pack version";
		const routeSpecificErrors = {
			403: "This pack has been banned and its versions are not available",
			404: `Pack not found: Pack with ID ${packId} does not exist`
		};
		return executeApiRequest(() => registryApiClient.get(endpoint, { signal }), errorContext, routeSpecificErrors);
	};
	/**
	* Get a specific pack by ID
	*/
	const getPackById = async (packId, signal) => {
		const endpoint = `/nodes/${packId}`;
		const errorContext = "Failed to get pack";
		const routeSpecificErrors = { 404: `Pack not found: The pack with ID ${packId} does not exist` };
		return executeApiRequest(() => registryApiClient.get(endpoint, { signal }), errorContext, routeSpecificErrors);
	};
	/**
	* Get the node pack that contains a specific ComfyUI node by its name.
	* This method queries the registry to find which pack provides the given node.
	*
	* When multiple packs contain a node with the same name, the API returns the best match based on:
	* 1. Preemption match - If the node name matches any in the pack's preempted_comfy_node_names array
	* 2. Search ranking - Lower search_ranking values are preferred
	* 3. Total installs - Higher installation counts are preferred as a tiebreaker
	*
	* @param nodeName - The name of the ComfyUI node (e.g., 'KSampler', 'CLIPTextEncode')
	* @param signal - Optional AbortSignal for request cancellation
	* @returns The node pack containing the specified node, or null if not found or on error
	*
	* @example
	* ```typescript
	* const pack = await inferPackFromNodeName('KSampler')
	* if (pack) {
	*   console.log(`Node found in pack: ${pack.name}`)
	* }
	* ```
	*/
	const inferPackFromNodeName = async (nodeName, signal) => {
		if (!nodeName || nodeName === "undefined") return null;
		const endpoint = `/comfy-nodes/${nodeName}/node`;
		const errorContext = "Failed to infer pack from comfy node name";
		const routeSpecificErrors = { 404: `Comfy node not found: The node with name ${nodeName} does not exist in the registry` };
		return executeApiRequest(() => registryApiClient.get(endpoint, { signal }), errorContext, routeSpecificErrors);
	};
	/**
	* Get multiple pack versions in a single bulk request.
	* This is more efficient than making individual requests for each pack version.
	*
	* @param nodeVersions - Array of node ID and version pairs to retrieve
	* @param signal - Optional AbortSignal for request cancellation
	* @returns Bulk response containing the requested node versions or null on error
	*
	* @example
	* ```typescript
	* const versions = await getBulkNodeVersions([
	*   { node_id: 'ComfyUI-Manager', version: '1.0.0' },
	*   { node_id: 'ComfyUI-Impact-Pack', version: '2.0.0' }
	* ])
	* if (versions) {
	*   versions.node_versions.forEach(result => {
	*     if (result.status === 'success' && result.node_version) {
	*       console.log(`Retrieved ${result.identifier.node_id}@${result.identifier.version}`)
	*     }
	*   })
	* }
	* ```
	*/
	const getBulkNodeVersions = async (nodeVersions, signal) => {
		const endpoint = "/bulk/nodes/versions";
		const errorContext = "Failed to get bulk node versions";
		const routeSpecificErrors = { 400: "Bad request: Invalid node version identifiers provided" };
		const requestBody = { node_versions: nodeVersions };
		return executeApiRequest(() => registryApiClient.post(endpoint, requestBody, { signal }), errorContext, routeSpecificErrors);
	};
	return {
		isLoading,
		error,
		listAllPacks,
		search,
		getPackById,
		getPackVersions,
		getPackByVersion,
		getPublisherById,
		listPacksForPublisher,
		getNodeDefs,
		postPackReview,
		inferPackFromNodeName,
		getBulkNodeVersions
	};
};
//#endregion
//#region src/composables/useCachedRequest.ts
var DEFAULT_MAX_SIZE = 50;
/**
* Composable that wraps a function with memoization, request deduplication, and abort handling.
*/
function useCachedRequest(requestFunction, options = {}) {
	const { maxSize = DEFAULT_MAX_SIZE, cacheKeyFn = paramsToCacheKey } = options;
	const cache = new import_quick_lru.default({ maxSize });
	const pendingRequests = /* @__PURE__ */ new Map();
	const abortControllers = /* @__PURE__ */ new Map();
	const executeAndCacheCall = async (params, cacheKey) => {
		try {
			const controller = new AbortController();
			abortControllers.set(cacheKey, controller);
			const responsePromise = requestFunction(params, controller.signal);
			pendingRequests.set(cacheKey, responsePromise);
			const result = await responsePromise;
			cache.set(cacheKey, result);
			return result;
		} catch {
			cache.set(cacheKey, null);
			return null;
		} finally {
			pendingRequests.delete(cacheKey);
			abortControllers.delete(cacheKey);
		}
	};
	const handlePendingRequest = async (pendingRequest) => {
		try {
			return await pendingRequest;
		} catch (err) {
			console.error("Error in pending request:", err);
			return null;
		}
	};
	const abortAllRequests = () => {
		for (const controller of abortControllers.values()) controller.abort();
	};
	/**
	* Cancel and clear any pending requests
	*/
	const cancel = () => {
		abortAllRequests();
		abortControllers.clear();
		pendingRequests.clear();
	};
	/**
	* Cached version of the request function
	*/
	const call = async (params) => {
		const cacheKey = cacheKeyFn(params);
		const cachedResult = cache.get(cacheKey);
		if (cachedResult !== void 0) return cachedResult;
		const pendingRequest = pendingRequests.get(cacheKey);
		if (pendingRequest) return handlePendingRequest(pendingRequest);
		return executeAndCacheCall(params, cacheKey);
	};
	return {
		call,
		cancel,
		clear: () => cache.clear()
	};
}
//#endregion
//#region src/stores/comfyRegistryStore.ts
var PACK_LIST_CACHE_SIZE = 20;
var PACK_BY_ID_CACHE_SIZE = 64;
var isNodePack = (pack) => {
	return pack !== void 0 && "id" in pack;
};
/**
* Store for managing remote custom nodes
*/
var useComfyRegistryStore = defineStore("comfyRegistry", () => {
	const registryService = useComfyRegistryService();
	let getPacksByIdController = null;
	const getPacksByIdCache = new import_quick_lru.default({ maxSize: PACK_BY_ID_CACHE_SIZE });
	/**
	* Get a list of all node packs from the registry
	*/
	const listAllPacks = useCachedRequest(registryService.listAllPacks, { maxSize: PACK_LIST_CACHE_SIZE });
	/**
	* Get a pack by its ID from the registry
	*/
	const getPackById = useCachedRequest(async (params) => {
		if (!params) return null;
		return registryService.getPackById(params);
	}, { maxSize: PACK_BY_ID_CACHE_SIZE });
	/**
	* Get a list of packs by their IDs from the registry
	*/
	const getPacksByIds = async (ids) => {
		const [cachedPacksIds, uncachedPacksIds] = partition(ids, (id) => getPacksByIdCache.has(id));
		const resolvedPacks = cachedPacksIds.map((id) => getPacksByIdCache.get(id)).filter(isNodePack);
		if (uncachedPacksIds.length) {
			getPacksByIdController = new AbortController();
			const { nodes = [] } = await registryService.listAllPacks({ node_id: uncachedPacksIds.filter((id) => id !== void 0) }, getPacksByIdController.signal) ?? {};
			nodes.forEach((pack) => {
				if (pack.id) {
					getPacksByIdCache.set(pack.id, pack);
					resolvedPacks.push(pack);
				}
			});
		}
		return resolvedPacks;
	};
	/**
	* Get the node definitions for a pack
	*/
	const getNodeDefs = useCachedRequest(registryService.getNodeDefs, { maxSize: PACK_BY_ID_CACHE_SIZE });
	/**
	* Search for packs by pack name or node names
	*/
	const search = useCachedRequest(registryService.search, { maxSize: PACK_LIST_CACHE_SIZE });
	/**
	* Get the node pack that contains a specific ComfyUI node by its name.
	* Results are cached to avoid redundant API calls.
	*
	* @see {@link useComfyRegistryService.inferPackFromNodeName} for details on the ranking algorithm
	*/
	const inferPackFromNodeName = useCachedRequest(registryService.inferPackFromNodeName, { maxSize: PACK_BY_ID_CACHE_SIZE });
	/**
	* Clear all cached data
	*/
	const clearCache = () => {
		getNodeDefs.clear();
		listAllPacks.clear();
		getPackById.clear();
		inferPackFromNodeName.clear();
	};
	/**
	* Cancel all any in-flight requests.
	*/
	const cancelRequests = () => {
		getNodeDefs.cancel();
		listAllPacks.cancel();
		getPackById.cancel();
		inferPackFromNodeName.cancel();
		getPacksByIdController?.abort();
	};
	return {
		listAllPacks,
		getPackById,
		getPacksByIds: {
			call: getPacksByIds,
			cancel: () => getPacksByIdController?.abort()
		},
		getNodeDefs,
		search,
		inferPackFromNodeName,
		clearCache,
		cancelRequests,
		isLoading: registryService.isLoading,
		error: registryService.error
	};
});
//#endregion
//#region src/workbench/extensions/manager/composables/nodePack/useNodePacks.ts
/**
* Handles fetching node packs from the registry given a list of node pack IDs
*/
var useNodePacks = (packsIds, options = {}) => {
	const { immediate = false } = options;
	const { getPacksByIds } = useComfyRegistryStore();
	const fetchPacks = () => getPacksByIds.call(get(packsIds).filter(Boolean));
	const { isReady, isLoading, error, execute, state: nodePacks } = useAsyncState(fetchPacks, [], { immediate });
	const cleanup = () => {
		getPacksByIds.cancel();
		isReady.value = false;
		isLoading.value = false;
	};
	return {
		error,
		isLoading,
		isReady,
		nodePacks,
		startFetch: execute,
		cleanup
	};
};
//#endregion
//#region src/composables/useServerLogs.ts
var LOGS_MESSAGE_TYPE = "logs";
var MANAGER_WS_TASK_DONE_NAME$1 = "cm-task-completed";
var MANAGER_WS_TASK_STARTED_NAME$1 = "cm-task-started";
var useServerLogs = (options = {}) => {
	const { ui_id, immediate = false, messageFilter = (msg) => Boolean(msg.trim()) } = options;
	const logs = ref([]);
	const isTaskStarted = ref(!ui_id);
	let stopLogs = null;
	let stopTaskDone = null;
	let stopTaskStarted = null;
	const isValidLogEvent = (event) => event.type === LOGS_MESSAGE_TYPE && event.detail.entries.length > 0;
	const parseLogMessage = (event) => event.detail.entries.map((e) => e.m).filter(messageFilter);
	const handleLogMessage = (event) => {
		if (!isTaskStarted.value) return;
		if (isValidLogEvent(event)) {
			const messages = parseLogMessage(event);
			if (messages.length > 0) logs.value.push(...messages);
		}
	};
	const handleTaskStarted = (event) => {
		if (ui_id && event.detail.ui_id === ui_id) isTaskStarted.value = true;
	};
	const handleTaskDone = (event) => {
		if (ui_id && event.detail.ui_id === ui_id) isTaskStarted.value = false;
	};
	const start = async () => {
		await api.subscribeLogs(true);
		stopLogs = useEventListener(api, LOGS_MESSAGE_TYPE, handleLogMessage);
		if (ui_id) {
			stopTaskStarted = useEventListener(api, MANAGER_WS_TASK_STARTED_NAME$1, handleTaskStarted);
			stopTaskDone = useEventListener(api, MANAGER_WS_TASK_DONE_NAME$1, handleTaskDone);
		}
	};
	const stopListening = async () => {
		stopLogs?.();
		stopTaskStarted?.();
		stopTaskDone?.();
		stopLogs = null;
		stopTaskStarted = null;
		stopTaskDone = null;
		await api.subscribeLogs(false);
	};
	if (immediate) start();
	onUnmounted(async () => {
		await stopListening();
		logs.value = [];
	});
	return {
		logs,
		startListening: start,
		stopListening
	};
};
//#endregion
//#region src/utils/packUtils.ts
/**
* Normalizes a pack ID by removing the version suffix.
*
* ComfyUI-Manager returns pack IDs in different formats:
* - Enabled packs: "packname" (without version)
* - Disabled packs: "packname@1_0_3" (with version suffix)
* - Latest versions from registry: "packname" (without version)
*
* Since the pack object itself contains the version info (ver field),
* we normalize all pack IDs to just the base name for consistent access.
* This ensures we can always find a pack by its base name (nodePack.id)
* regardless of its enabled/disabled state.
*
* @param packId - The pack ID that may contain a version suffix
* @returns The normalized pack ID without version suffix
*/
function normalizePackId(packId) {
	return packId.split("@")[0];
}
/**
* Normalizes all keys in a pack record by removing version suffixes.
* This is used when receiving pack data from the server to ensure
* consistent key format across the application.
*
* @param packs - Record of packs with potentially versioned keys
* @returns Record with normalized keys
*/
function normalizePackKeys(packs) {
	return mapKeys(packs, (_value, key) => normalizePackId(key));
}
//#endregion
//#region src/workbench/extensions/manager/composables/useManagerQueue.ts
var MANAGER_WS_TASK_DONE_NAME = "cm-task-completed";
var MANAGER_WS_TASK_STARTED_NAME = "cm-task-started";
var useManagerQueue = (taskHistory, taskQueue, installedPacks) => {
	const toastStore = useToastStore();
	const maxHistoryItems = ref(64);
	const isLoading = ref(false);
	const isProcessing = ref(false);
	const currentQueueLength = computed(() => taskQueue.value.running_queue.length + taskQueue.value.pending_queue.length);
	/**
	* Update the processing state based on the current queue length.
	* If the queue is empty, or all tasks in the queue are associated
	* with different clients, then this client is not processing any tasks.
	*/
	const updateProcessingState = () => {
		isProcessing.value = currentQueueLength.value > 0;
	};
	const allTasksDone = computed(() => currentQueueLength.value === 0);
	const historyCount = computed(() => Object.keys(taskHistory.value).length);
	/**
	* Check if a task is associated with this client.
	* Task can be from running queue, pending queue, or history.
	* @param task - The task to check
	* @returns True if the task belongs to this client
	*/
	const isTaskFromThisClient = (task) => task.client_id === app.api.clientId;
	/**
	* Check if a history task is associated with this client.
	* @param task - The history task to check
	* @returns True if the task belongs to this client
	*/
	const isHistoryTaskFromThisClient = (task) => task.client_id === app.api.clientId;
	/**
	* Filter queue tasks by client id.
	* Ensures that only tasks associated with this client are processed and
	* added to client state.
	* @param tasks - Array of queue tasks to filter
	* @returns Filtered array containing only tasks from this client
	*/
	const filterQueueByClientId = (tasks) => tasks.filter(isTaskFromThisClient);
	/**
	* Filter history tasks by client id using pickBy for optimal performance.
	* Returns a new object containing only tasks associated with this client.
	* @param history - The history object to filter
	* @returns Filtered history object containing only tasks from this client
	*/
	const filterHistoryByClientId = (history) => pickBy(history, isHistoryTaskFromThisClient);
	/**
	* Update task queue and history state with filtered data from server.
	* Ensures only tasks from this client are stored in local state.
	* @param state - The task state message from the server
	*/
	const updateTaskState = (state) => {
		taskQueue.value.running_queue = filterQueueByClientId(state.running_queue);
		taskQueue.value.pending_queue = filterQueueByClientId(state.pending_queue);
		taskHistory.value = filterHistoryByClientId(state.history);
		installedPacks.value = normalizePackKeys(state.installed_packs);
		updateProcessingState();
	};
	const cleanupTaskDoneListener = useEventListener(app.api, MANAGER_WS_TASK_DONE_NAME, (event) => {
		if (event.type === MANAGER_WS_TASK_DONE_NAME) {
			const { ui_id: taskId, state, status, result } = event.detail;
			const wasCompleted = Object.hasOwn(taskHistory.value, taskId);
			const completedTask = state.history[taskId];
			updateTaskState(state);
			if (Object.hasOwn(state.history, taskId) && (status ?? completedTask.status)?.status_str === "error" && isHistoryTaskFromThisClient(completedTask) && !wasCompleted) toastStore.add({
				severity: "error",
				summary: t("g.error"),
				detail: result
			});
		}
	});
	const cleanupTaskStartedListener = useEventListener(app.api, MANAGER_WS_TASK_STARTED_NAME, (event) => {
		if (event.type === MANAGER_WS_TASK_STARTED_NAME) updateTaskState(event.detail.state);
	});
	/**
	* Cleanup function to remove event listeners and reset state
	*/
	const cleanup = () => {
		cleanupTaskDoneListener();
		cleanupTaskStartedListener();
		isProcessing.value = false;
		isLoading.value = false;
	};
	return {
		isLoading,
		isProcessing,
		maxHistoryItems,
		allTasksDone,
		historyCount,
		currentQueueLength,
		updateTaskState,
		cleanup
	};
};
//#endregion
//#region src/workbench/extensions/manager/composables/useManagerDialog.ts
function useManagerDialog() {
	const panels = useComfierPanelStore();
	function hide() {
		panels.remove("comfier-extensions");
	}
	function show(initialTab, initialPackId) {
		panels.managerTab = initialTab;
		panels.managerPackId = initialPackId;
		panels.select("comfier-extensions", panels.preferredSide);
	}
	return {
		show,
		hide
	};
}
//#endregion
//#region src/workbench/extensions/manager/composables/useManagerState.ts
var ManagerUIState = /* @__PURE__ */ function(ManagerUIState) {
	ManagerUIState["DISABLED"] = "disabled";
	ManagerUIState["LEGACY_UI"] = "legacy";
	ManagerUIState["NEW_UI"] = "new";
	ManagerUIState["INCOMPATIBLE"] = "incompatible";
	return ManagerUIState;
}({});
/**
* Module-level flag to ensure the INCOMPATIBLE upgrade toast fires exactly
* once per app session, even when useManagerState() is invoked from many
* components. Without this, every consumer would register its own watcher
* and stack duplicate toasts on the first transition.
*/
var incompatibleToastShown = false;
var showIncompatibleToast = () => {
	if (incompatibleToastShown) return;
	incompatibleToastShown = true;
	useToastStore().add({
		severity: "warn",
		summary: t("manager.incompatibleVersion.title"),
		detail: t("manager.incompatibleVersion.message"),
		life: 15e3
	});
};
function useManagerState() {
	const systemStatsStore = useSystemStatsStore();
	const { systemStats, isInitialized: systemInitialized } = storeToRefs(systemStatsStore);
	const managerDialog = useManagerDialog();
	/**
	* The current manager UI state.
	* Computed once and cached until dependencies change (which they don't during runtime).
	* This follows Vue's conventions and provides better performance through caching.
	*/
	const managerUIState = readonly(computed(() => {
		if (!systemInitialized.value) return "disabled";
		const clientSupportsV4 = api.getClientFeatureFlags().supports_manager_v4_ui === true;
		const serverSupportsV4 = api.getServerFeature("extension.manager.supports_v4");
		const supportsCsrfPost = api.getServerFeature("extension.manager.supports_csrf_post");
		if (!systemStats.value?.system.argv.includes("--enable-manager")) return "disabled";
		if (systemStats.value?.system.argv.includes("--enable-manager-legacy-ui")) return "legacy";
		if (serverSupportsV4 === true && supportsCsrfPost !== true) return "incompatible";
		if (clientSupportsV4 && serverSupportsV4 === true) return "new";
		if (serverSupportsV4 === true && !clientSupportsV4) return "legacy";
		if (serverSupportsV4 === false) return "legacy";
		if (serverSupportsV4 === void 0) return "new";
		return "disabled";
	}));
	/**
	* Check if manager is enabled (not DISABLED and not INCOMPATIBLE)
	* INCOMPATIBLE is treated as "not installed" from a UX perspective —
	* the user must upgrade the Manager backend before the UI becomes usable.
	*/
	const isManagerEnabled = readonly(computed(() => {
		return managerUIState.value !== "disabled" && managerUIState.value !== "incompatible";
	}));
	/**
	* Check if manager UI is in NEW_UI mode
	*/
	const isNewManagerUI = readonly(computed(() => {
		return managerUIState.value === "new";
	}));
	/**
	* Check if manager UI is in LEGACY_UI mode
	*/
	const isLegacyManagerUI = readonly(computed(() => {
		return managerUIState.value === "legacy";
	}));
	/**
	* Check if the installed Manager backend is too old to use safely
	* (lacks the CSRF-hardened POST endpoints introduced in Manager 4.2.1).
	*/
	const isIncompatibleManager = readonly(computed(() => {
		return managerUIState.value === "incompatible";
	}));
	/**
	* Check if install button should be shown (only in NEW_UI mode)
	*/
	const shouldShowInstallButton = readonly(computed(() => {
		return isNewManagerUI.value;
	}));
	/**
	* Check if manager buttons should be shown.
	* Hidden when DISABLED (flag missing) or INCOMPATIBLE (backend too old).
	*/
	const shouldShowManagerButtons = readonly(computed(() => {
		return isManagerEnabled.value;
	}));
	/**
	* The top bar Extensions button also opens the cloud custom nodes survey,
	* so it stays visible on cloud where the manager itself is disabled.
	*/
	const shouldShowExtensionsButton = readonly(computed(() => shouldShowManagerButtons.value));
	watch(managerUIState, (state) => {
		if (state === "incompatible") showIncompatibleToast();
	}, { immediate: true });
	/**
	* Opens the manager UI based on current state
	* Centralizes the logic for opening manager across the app
	* @param options - Optional configuration for opening the manager
	* @param options.initialTab - Initial tab to show (for NEW_UI mode)
	* @param options.legacyCommand - Legacy command to execute (for LEGACY_UI mode)
	* @param options.showToastOnLegacyError - Whether to show toast on legacy command failure
	* @param options.isLegacyOnly - If true, shows error in NEW_UI mode instead of opening manager
	*/
	const openManager = async (options) => {
		const state = managerUIState.value;
		const settingsDialog = useSettingsDialog();
		const commandStore = useCommandStore();
		switch (state) {
			case "disabled":
				settingsDialog.show("extension");
				break;
			case "incompatible":
				incompatibleToastShown = false;
				showIncompatibleToast();
				break;
			case "legacy": {
				const command = options?.legacyCommand || "Comfy.Manager.Menu.ToggleVisibility";
				try {
					await commandStore.execute(command);
				} catch {
					if (options?.showToastOnLegacyError !== false) useToastStore().add({
						severity: "error",
						summary: t("g.error"),
						detail: t("manager.legacyMenuNotAvailable")
					});
					if (options?.showToastOnLegacyError === false) settingsDialog.show("extension");
				}
				break;
			}
			case "new": if (options?.isLegacyOnly) useToastStore().add({
				severity: "error",
				summary: t("g.error"),
				detail: t("manager.legacyMenuNotAvailable")
			});
			else managerDialog.show(options?.initialTab, options?.initialPackId);
		}
	};
	return {
		managerUIState,
		isManagerEnabled,
		isNewManagerUI,
		isLegacyManagerUI,
		isIncompatibleManager,
		shouldShowInstallButton,
		shouldShowManagerButtons,
		shouldShowExtensionsButton,
		openManager
	};
}
//#endregion
//#region src/workbench/extensions/manager/services/comfyManagerService.ts
var GENERIC_SECURITY_ERR_MSG = "Forbidden: A security error has occurred. Please check the terminal logs";
var managerApiClient = axios.create({
	baseURL: api.apiURL("/v2/"),
	headers: { "Content-Type": "application/json" }
});
/**
* Service for interacting with the ComfyUI Manager API
* Provides methods for managing packs, ComfyUI-Manager queue operations, and system functions
* Note: This service should only be used when Manager state is NEW_UI
*/
var useComfyManagerService = () => {
	const isLoading = ref(false);
	const error = ref(null);
	const isManagerServiceAvailable = () => {
		return useManagerState().isNewManagerUI.value;
	};
	const handleRequestError = (err, context, routeSpecificErrors) => {
		if (isAbortError(err)) return;
		let message;
		if (!axios.isAxiosError(err)) message = `${context} failed: ${err instanceof Error ? err.message : String(err)}`;
		else {
			const axiosError = err;
			const status = axiosError.response?.status;
			if (status && routeSpecificErrors?.[status]) message = routeSpecificErrors[status];
			else if (status === 404) message = "Could not connect to ComfyUI-Manager";
			else message = axiosError.response?.data.message ?? `${context} failed with status ${status}`;
		}
		error.value = message;
	};
	const executeRequest = async (requestCall, options) => {
		const { errorContext, routeSpecificErrors } = options;
		if (!isManagerServiceAvailable()) {
			error.value = "Manager service is not available in current mode";
			return null;
		}
		isLoading.value = true;
		error.value = null;
		try {
			return (await requestCall()).data;
		} catch (err) {
			handleRequestError(err, errorContext, routeSpecificErrors);
			return null;
		} finally {
			isLoading.value = false;
		}
	};
	const startQueue = async (signal) => {
		return executeRequest(() => managerApiClient.post("manager/queue/start", null, { signal }), {
			errorContext: "Starting ComfyUI-Manager job queue",
			routeSpecificErrors: { 403: GENERIC_SECURITY_ERR_MSG }
		});
	};
	const getQueueStatus = async (client_id, signal) => {
		return executeRequest(() => managerApiClient.get("manager/queue/status", {
			params: client_id ? { client_id } : void 0,
			signal
		}), { errorContext: "Getting ComfyUI-Manager queue status" });
	};
	const listInstalledPacks = async (signal) => {
		return executeRequest(() => managerApiClient.get("customnode/installed", { signal }), { errorContext: "Fetching installed packs" });
	};
	const getImportFailInfo = async (signal) => {
		return executeRequest(() => managerApiClient.get("customnode/import_fail_info", { signal }), { errorContext: "Fetching import failure information" });
	};
	const getImportFailInfoBulk = async (params = {}, signal) => {
		const errorContext = "Fetching bulk import failure information";
		if (!params.cnr_ids?.length && !params.urls?.length) return {};
		return executeRequest(() => managerApiClient.post("customnode/import_fail_info_bulk", params, { signal }), { errorContext });
	};
	const queueTask = async (kind, params, ui_id, signal) => {
		const task = {
			kind,
			params,
			ui_id: ui_id || v4(),
			client_id: api.clientId ?? api.initialClientId ?? "unknown"
		};
		const errorContext = `Queueing ${task.kind} task`;
		return executeRequest(() => managerApiClient.post("manager/queue/task", task, { signal }), {
			errorContext,
			routeSpecificErrors: {
				403: GENERIC_SECURITY_ERR_MSG,
				404: `Not Found: Task could not be queued`
			}
		});
	};
	const installPack = async (params, ui_id, signal) => {
		return queueTask("install", params, ui_id, signal);
	};
	const uninstallPack = async (params, ui_id, signal) => {
		return queueTask("uninstall", params, ui_id, signal);
	};
	const disablePack = async (params, ui_id, signal) => {
		return queueTask("disable", params, ui_id, signal);
	};
	const enablePack = async (params, ui_id, signal) => {
		return queueTask("enable", params, ui_id, signal);
	};
	const updatePack = async (params, ui_id, signal) => {
		return queueTask("update", params, ui_id, signal);
	};
	const updateAllPacks = async (params = {}, ui_id, signal) => {
		const errorContext = "Updating all packs";
		const routeSpecificErrors = {
			403: "Forbidden: To use this action, a security_level of `middle or below` is required",
			401: "Unauthorized: ComfyUI-Manager job queue is busy"
		};
		const queryParams = {
			mode: params.mode,
			client_id: api.clientId ?? api.initialClientId ?? "unknown",
			ui_id: ui_id || v4()
		};
		return executeRequest(() => managerApiClient.post("manager/queue/update_all", null, {
			params: queryParams,
			signal
		}), {
			errorContext,
			routeSpecificErrors
		});
	};
	const updateComfyUI = async (params = { is_stable: true }, ui_id, signal) => {
		const errorContext = "Updating ComfyUI";
		const routeSpecificErrors = {
			400: "Bad Request: Missing required parameters",
			403: "Forbidden: To use this action, a security_level of `middle or below` is required"
		};
		const queryParams = {
			client_id: api.clientId ?? api.initialClientId ?? "unknown",
			ui_id: ui_id || v4(),
			...params
		};
		return executeRequest(() => managerApiClient.post("manager/queue/update_comfyui", null, {
			params: queryParams,
			signal
		}), {
			errorContext,
			routeSpecificErrors
		});
	};
	const rebootComfyUI = async (signal) => {
		return executeRequest(() => managerApiClient.post("manager/reboot", null, { signal }), {
			errorContext: "Rebooting ComfyUI",
			routeSpecificErrors: { 403: "Forbidden: Rebooting ComfyUI requires security_level of middle or below" }
		});
	};
	const isLegacyManagerUI = async (signal) => {
		return executeRequest(() => managerApiClient.get("manager/is_legacy_manager_ui", { signal }), { errorContext: "Checking if user set Manager to use the legacy UI" });
	};
	const getTaskHistory = async (options = {}, signal) => {
		return executeRequest(() => managerApiClient.get("manager/queue/history", {
			params: options,
			signal
		}), { errorContext: "Getting ComfyUI-Manager task history" });
	};
	return {
		isLoading,
		error,
		startQueue,
		getQueueStatus,
		getTaskHistory,
		listInstalledPacks,
		getImportFailInfo,
		getImportFailInfoBulk,
		installPack,
		uninstallPack,
		enablePack,
		disablePack,
		updatePack,
		updateAllPacks,
		updateComfyUI,
		rebootComfyUI,
		isLegacyManagerUI
	};
};
//#endregion
//#region src/workbench/extensions/manager/utils/nodePackVersionUtil.ts
var versionStatusFilters = {
	active: ["NodeVersionStatusActive"],
	installable: [
		"NodeVersionStatusActive",
		"NodeVersionStatusFlagged",
		"NodeVersionStatusPending"
	]
};
function getLatestVersion(versions, statuses) {
	const candidates = versions.filter((version) => version.status && statuses.includes(version.status));
	const latest = (0, import_semver.maxSatisfying)(candidates.map((version) => version.version ?? ""), "*", { includePrerelease: true });
	return candidates.find((version) => version.version === latest);
}
//#endregion
//#region src/workbench/extensions/manager/stores/comfyManagerStore.ts
function isTaskForRequest(taskId, requestId) {
	return taskId === requestId || taskId.startsWith(`${requestId}_`);
}
/**
* Store for state of installed node packs
*/
var useComfyManagerStore = defineStore("comfyManager", () => {
	const managerService = useComfyManagerService();
	const toastStore = useToastStore();
	const installedPacks = ref({});
	const enabledPacksIds = ref(/* @__PURE__ */ new Set());
	const disabledPacksIds = ref(/* @__PURE__ */ new Set());
	const installedPacksIds = ref(/* @__PURE__ */ new Set());
	const installingPacksIds = ref(/* @__PURE__ */ new Set());
	const updatingPacksIds = ref(/* @__PURE__ */ new Set());
	const isStale = ref(true);
	const taskLogs = ref([]);
	const succeededTasksLogs = ref([]);
	const failedTasksLogs = ref([]);
	const serverTaskHistory = ref({});
	const requestFailures = ref({});
	const taskHistory = computed(() => ({
		...requestFailures.value,
		...serverTaskHistory.value
	}));
	const queueError = ref(null);
	const succeededTasksIds = ref([]);
	const failedTasksIds = ref([]);
	const taskQueue = ref({
		history: {},
		running_queue: [],
		pending_queue: [],
		installed_packs: {}
	});
	const taskIdToPackId = ref(/* @__PURE__ */ new Map());
	const managerQueue = useManagerQueue(serverTaskHistory, taskQueue, installedPacks);
	const pendingRequests = ref(/* @__PURE__ */ new Map());
	let queueStartRequest = 0;
	const isProcessingTasks = computed(() => managerQueue.isProcessing.value || pendingRequests.value.size > 0 || updatingPacksIds.value.size > 0);
	useEventListener(app.api, ["cm-task-started", "cm-task-completed"], (event) => {
		const { ui_id: taskId, state } = event.detail;
		const observedIds = [
			...state.running_queue.map((task) => task.ui_id),
			...state.pending_queue.map((task) => task.ui_id),
			...Object.keys(state.history)
		];
		for (const id of observedIds) delete requestFailures.value[id];
		for (const [requestId, requestState] of pendingRequests.value) if (requestState === "confirmed" || observedIds.some((id) => isTaskForRequest(id, requestId))) pendingRequests.value.delete(requestId);
		if (event.type === "cm-task-completed") {
			const packId = taskIdToPackId.value.get(taskId);
			if (packId) installingPacksIds.value.delete(packId);
			taskIdToPackId.value.delete(taskId);
		}
		if (managerQueue.currentQueueLength.value > 0 || !isProcessingTasks.value) queueError.value = null;
	});
	const setStale = () => {
		isStale.value = true;
	};
	function isTaskFailed(requestId) {
		return failedTasksIds.value.some((id) => isTaskForRequest(id, requestId));
	}
	function isTaskInProgress(requestId) {
		return pendingRequests.value.has(requestId) || [...taskQueue.value.running_queue, ...taskQueue.value.pending_queue].some((task) => isTaskForRequest(task.ui_id, requestId));
	}
	const partitionTaskLogs = () => {
		const successTaskLogs = [];
		const failTaskLogs = [];
		for (const log of taskLogs.value) if (isTaskFailed(log.taskId)) failTaskLogs.push(log);
		else successTaskLogs.push(log);
		succeededTasksLogs.value = successTaskLogs;
		failedTasksLogs.value = failTaskLogs;
	};
	const partitionTasks = () => {
		const successTasksIds = [];
		const failTasksIds = [];
		for (const task of Object.values(taskHistory.value)) if (task.status?.status_str === "success") successTasksIds.push(task.ui_id);
		else failTasksIds.push(task.ui_id);
		succeededTasksIds.value = successTasksIds;
		failedTasksIds.value = failTasksIds;
	};
	whenever(taskHistory, () => {
		partitionTasks();
		partitionTaskLogs();
	}, { deep: true });
	const getPackId = (pack) => pack.cnr_id || pack.aux_id;
	const isInstalledPackId = (packName) => !!packName && installedPacksIds.value.has(packName);
	const isEnabledPackId = (packName) => !!packName && isInstalledPackId(packName) && enabledPacksIds.value.has(packName);
	const isInstallingPackId = (packName) => !!packName && (installingPacksIds.value.has(packName) || updatingPacksIds.value.has(packName));
	const packsToIdSet = (packs) => packs.reduce((acc, pack) => {
		const id = pack.cnr_id || pack.aux_id;
		if (id) acc.add(id);
		return acc;
	}, /* @__PURE__ */ new Set());
	/**
	* A pack is disabled if there is a disabled entry and no corresponding
	* enabled entry. If `packname@1.0.2` is disabled, but `packname@1.0.3` is
	* enabled, then `packname` is considered enabled.
	*
	* @example
	* installedPacks = {
	*   "packname@1_0_2": { enabled: false, cnr_id: "packname" },
	*   "packname": { enabled: true, cnr_id: "packname" }
	* }
	* isDisabled("packname") // false
	*
	* installedPacks = {
	*   "packname@1_0_2": { enabled: false, cnr_id: "packname" },
	* }
	* isDisabled("packname") // true
	*/
	const updateDisabledIds = (packs) => {
		const enabledIds = /* @__PURE__ */ new Set();
		const disabledIds = /* @__PURE__ */ new Set();
		for (const pack of packs) {
			const id = getPackId(pack);
			if (!id) continue;
			const { enabled } = pack;
			if (enabled) enabledIds.add(id);
			else disabledIds.add(id);
			if (enabledIds.has(id) && disabledIds.has(id)) disabledIds.delete(id);
		}
		enabledPacksIds.value = enabledIds;
		disabledPacksIds.value = disabledIds;
	};
	const updateInstalledIds = (packs) => {
		installedPacksIds.value = packsToIdSet(packs);
	};
	const onPacksChanged = () => {
		const packs = Object.values(installedPacks.value);
		updateDisabledIds(packs);
		updateInstalledIds(packs);
	};
	watch(installedPacks, onPacksChanged, { deep: true });
	const refreshInstalledList = async () => {
		const packs = await managerService.listInstalledPacks();
		if (packs) installedPacks.value = normalizePackKeys(packs);
		isStale.value = false;
	};
	whenever(isStale, refreshInstalledList, { immediate: true });
	async function confirmQueuedRequests() {
		const queuedRequests = [...pendingRequests.value].filter(([, state]) => state !== "submitting").map(([id]) => id);
		if (!queuedRequests.length) return true;
		const runningQueue = taskQueue.value.running_queue;
		const requestId = queueStartRequest;
		const status = await managerService.getQueueStatus(api.clientId ?? api.initialClientId ?? "unknown");
		if (requestId !== queueStartRequest) return true;
		if (status === null) return false;
		const hasNewQueueState = taskQueue.value.running_queue !== runningQueue;
		for (const id of queuedRequests) if (status.total_count > 0 && !hasNewQueueState) pendingRequests.value.set(id, "confirmed");
		else pendingRequests.value.delete(id);
		return true;
	}
	async function startQueue() {
		const requestId = ++queueStartRequest;
		queueError.value = null;
		const result = await managerService.startQueue();
		if (requestId !== queueStartRequest) return;
		if (result !== null && await confirmQueuedRequests()) return;
		if (requestId === queueStartRequest && isProcessingTasks.value) {
			queueError.value = managerService.error.value ?? t("g.unknownError");
			toastStore.add({
				severity: "error",
				summary: t("g.error"),
				detail: queueError.value
			});
		}
	}
	const enqueueTaskWithLogs = async (task, taskName) => {
		const taskId = v4();
		const { logs } = useServerLogs({
			ui_id: taskId,
			immediate: true
		});
		pendingRequests.value.set(taskId, "submitting");
		taskLogs.value.push({
			taskName,
			taskId,
			logs: logs.value
		});
		partitionTaskLogs();
		if (await task(taskId) === null) {
			const packId = taskIdToPackId.value.get(taskId);
			if (packId) installingPacksIds.value.delete(packId);
			taskIdToPackId.value.delete(taskId);
			pendingRequests.value.delete(taskId);
			const message = managerService.error.value ?? t("g.unknownError");
			toastStore.add({
				severity: "error",
				summary: t("g.error"),
				detail: message
			});
			requestFailures.value[taskId] = {
				ui_id: taskId,
				client_id: api.clientId || "unknown",
				kind: "error",
				result: "failed",
				status: {
					status_str: "error",
					completed: false,
					messages: [message]
				},
				timestamp: (/* @__PURE__ */ new Date()).toISOString()
			};
			return;
		}
		if (pendingRequests.value.has(taskId)) pendingRequests.value.set(taskId, "queued");
		await startQueue();
	};
	const installPack = useCachedRequest(async (params, signal) => {
		if (!params.id || installingPacksIds.value.has(params.id)) return;
		let actionDescription = t("g.installing");
		if (installedPacksIds.value.has(params.id)) {
			const installedPack = installedPacks.value[params.id];
			if (installedPack.ver !== params.selected_version) actionDescription = t("manager.changingVersion", {
				from: installedPack.ver,
				to: params.selected_version
			});
			else actionDescription = t("g.enabling");
		}
		installingPacksIds.value.add(params.id);
		const task = (taskId) => {
			taskIdToPackId.value.set(taskId, params.id);
			return managerService.installPack(params, taskId, signal);
		};
		await enqueueTaskWithLogs(task, `${actionDescription} ${params.id}`);
	}, { maxSize: 1 });
	async function switchPack(pack, policy) {
		const registry = useComfyRegistryService();
		const summary = pack.name ?? pack.id;
		const versions = await registry.getPackVersions(pack.id, { statuses: versionStatusFilters[policy] });
		if (!isEnabledPackId(pack.id)) return;
		if (versions === null) {
			toastStore.add({
				severity: "error",
				summary,
				detail: registry.error.value ?? t("manager.errorConnecting")
			});
			return;
		}
		const version = versions[0]?.version;
		if (!version) {
			toastStore.add({
				severity: "warn",
				summary,
				detail: t("manager.noUpdateVersion")
			});
			return;
		}
		if (version === getInstalledPackVersion(pack.id)) {
			toastStore.add({
				severity: "info",
				summary,
				detail: t("manager.updateVersionInstalled", { version })
			});
			return;
		}
		await installPack.call({
			id: pack.id,
			version,
			selected_version: version,
			repository: pack.repository ?? "",
			channel: "default",
			mode: "cache"
		});
	}
	async function updatePacks(packs, policy = "active") {
		const packsToUpdate = packs.filter((pack) => isEnabledPackId(pack.id) && !isInstallingPackId(pack.id));
		if (!packsToUpdate.length) return;
		for (const pack of packsToUpdate) updatingPacksIds.value.add(pack.id);
		try {
			for (const pack of packsToUpdate) await switchPack(pack, policy);
		} catch (error) {
			reportError(error, {
				surface: "platform",
				errorType: "failure_updating_node_packs"
			});
			toastStore.add({
				severity: "error",
				summary: t("manager.update"),
				detail: t("manager.updateFailed")
			});
		} finally {
			for (const pack of packsToUpdate) updatingPacksIds.value.delete(pack.id);
			installPack.clear();
		}
	}
	const uninstallPack = async (params, signal) => {
		installPack.clear();
		installPack.cancel();
		installingPacksIds.value.add(params.id);
		const uninstallParams = {
			node_name: params.id,
			is_unknown: false
		};
		const task = (taskId) => {
			taskIdToPackId.value.set(taskId, params.id);
			return managerService.uninstallPack(uninstallParams, taskId, signal);
		};
		await enqueueTaskWithLogs(task, t("manager.uninstalling", { id: params.id }));
	};
	const updatePack = useCachedRequest(async (params, signal) => {
		updateAllPacks.cancel();
		const updateParams = {
			node_name: params.id,
			node_ver: params.version
		};
		const task = (taskId) => managerService.updatePack(updateParams, taskId, signal);
		await enqueueTaskWithLogs(task, t("g.updating", { id: params.id }));
	}, { maxSize: 1 });
	const updateAllPacks = useCachedRequest(async (params, signal) => {
		const task = (taskId) => managerService.updateAllPacks(params, taskId, signal);
		await enqueueTaskWithLogs(task, t("manager.updatingAllPacks"));
	}, { maxSize: 1 });
	const disablePack = async (params, signal) => {
		const disableParams = {
			node_name: params.id,
			is_unknown: false
		};
		const task = (taskId) => managerService.disablePack(disableParams, taskId, signal);
		await enqueueTaskWithLogs(task, t("g.disabling", { id: params.id }));
	};
	const enablePack = async (params, signal) => {
		const enableParams = { cnr_id: params.id };
		const task = (taskId) => managerService.enablePack(enableParams, taskId, signal);
		await enqueueTaskWithLogs(task, t("g.enabling", { id: params.id }));
	};
	const getInstalledPackVersion = (packId) => {
		if (!Object.hasOwn(installedPacks.value, packId)) return;
		return installedPacks.value[packId].ver;
	};
	const clearLogs = () => {
		taskLogs.value = [];
	};
	const resetTaskState = () => {
		queueError.value = null;
		taskLogs.value = [];
		serverTaskHistory.value = {};
		requestFailures.value = {};
		succeededTasksIds.value = [];
		failedTasksIds.value = [];
		succeededTasksLogs.value = [];
		failedTasksLogs.value = [];
		installingPacksIds.value.clear();
		updatingPacksIds.value.clear();
		taskIdToPackId.value.clear();
		pendingRequests.value.clear();
		queueStartRequest++;
		managerQueue.isProcessing.value = false;
		taskQueue.value = {
			history: {},
			running_queue: [],
			pending_queue: [],
			installed_packs: {}
		};
	};
	return {
		isLoading: managerService.isLoading,
		error: managerService.error,
		taskLogs,
		clearLogs,
		resetTaskState,
		setStale,
		installedPacks,
		installedPacksIds,
		isPackInstalled: isInstalledPackId,
		isPackEnabled: isEnabledPackId,
		isPackInstalling: isInstallingPackId,
		getInstalledPackVersion,
		refreshInstalledList,
		taskHistory,
		taskQueue,
		queueError,
		startQueue,
		isProcessingTasks,
		succeededTasksIds,
		failedTasksIds,
		isTaskFailed,
		isTaskInProgress,
		succeededTasksLogs,
		failedTasksLogs,
		managerQueue,
		installPack,
		uninstallPack,
		updatePack,
		updatePacks,
		updateAllPacks,
		disablePack,
		enablePack
	};
});
//#endregion
//#region src/workbench/extensions/manager/composables/nodePack/useInstalledPacks.ts
var useInstalledPacks = (options = {}) => {
	const comfyManagerStore = useComfyManagerStore();
	const isInitializing = ref(false);
	const lastFetchedIds = ref("");
	const installedPackIds = computed(() => Array.from(comfyManagerStore.installedPacksIds));
	const { startFetch, cleanup, error, isLoading, nodePacks, isReady } = useNodePacks(installedPackIds, options);
	const filterInstalledPack = (packs) => packs.filter((pack) => comfyManagerStore.isPackInstalled(pack.id));
	const startFetchInstalled = async () => {
		if (isInitializing.value) return;
		isInitializing.value = true;
		try {
			if (comfyManagerStore.installedPacksIds.size === 0) await comfyManagerStore.refreshInstalledList();
			await startFetch();
		} finally {
			isInitializing.value = false;
		}
	};
	whenever(installedPackIds, async (newIds) => {
		const newIdsStr = newIds.sort().join(",");
		if (newIdsStr !== lastFetchedIds.value && !isInitializing.value) {
			lastFetchedIds.value = newIdsStr;
			await startFetch();
		}
	});
	onUnmounted(() => {
		cleanup();
	});
	return {
		error,
		isLoading,
		isReady,
		installedPacks: nodePacks,
		installedPacksWithVersions: computed(() => {
			const result = [];
			for (const pack of Object.values(comfyManagerStore.installedPacks)) {
				const id = pack.cnr_id || pack.aux_id;
				if (id) result.push({
					id,
					version: pack.ver
				});
			}
			return result;
		}),
		startFetchInstalled,
		filterInstalledPack
	};
};
//#endregion
//#region src/workbench/extensions/manager/stores/conflictDetectionStore.ts
var useConflictDetectionStore = defineStore("conflictDetection", () => {
	const conflictedPackages = ref([]);
	const isDetecting = ref(false);
	const lastDetectionTime = ref(null);
	const hasConflicts = computed(() => conflictedPackages.value.some((pkg) => pkg.has_conflict));
	const getConflictsForPackageByID = computed(() => (packageId) => conflictedPackages.value.find((pkg) => pkg.package_id === packageId));
	const bannedPackages = computed(() => conflictedPackages.value.filter((pkg) => pkg.conflicts.some((conflict) => conflict.type === "banned")));
	const securityPendingPackages = computed(() => conflictedPackages.value.filter((pkg) => pkg.conflicts.some((conflict) => conflict.type === "pending")));
	function setConflictedPackages(packages) {
		conflictedPackages.value = [...packages];
	}
	function clearConflicts() {
		conflictedPackages.value = [];
	}
	function setDetecting(detecting) {
		isDetecting.value = detecting;
	}
	function setLastDetectionTime(time) {
		lastDetectionTime.value = time;
	}
	return {
		conflictedPackages,
		isDetecting,
		lastDetectionTime,
		hasConflicts,
		getConflictsForPackageByID,
		bannedPackages,
		securityPendingPackages,
		setConflictedPackages,
		clearConflicts,
		setDetecting,
		setLastDetectionTime
	};
});
//#endregion
//#region src/workbench/extensions/manager/composables/useConflictAcknowledgment.ts
/**
* LocalStorage keys for conflict acknowledgment tracking
*/
var STORAGE_KEYS = {
	CONFLICT_MODAL_DISMISSED: "Comfy.ConflictModalDismissed",
	CONFLICT_RED_DOT_DISMISSED: "Comfy.ConflictRedDotDismissed",
	CONFLICT_WARNING_BANNER_DISMISSED: "Comfy.ConflictWarningBannerDismissed"
};
var modalDismissed = useStorage(STORAGE_KEYS.CONFLICT_MODAL_DISMISSED, false);
var redDotDismissed = useStorage(STORAGE_KEYS.CONFLICT_RED_DOT_DISMISSED, false);
var warningBannerDismissed = useStorage(STORAGE_KEYS.CONFLICT_WARNING_BANNER_DISMISSED, false);
/**
* Composable for managing conflict acknowledgment state in localStorage
*
* This handles:
* - Tracking whether conflict modal has been dismissed
* - Tracking whether red dot notification has been cleared
* - Managing per-package conflict acknowledgments
* - Detecting ComfyUI version changes to reset acknowledgment state
*/
function useConflictAcknowledgment() {
	const conflictDetectionStore = useConflictDetectionStore();
	const state = computed(() => ({
		modal_dismissed: modalDismissed.value,
		red_dot_dismissed: redDotDismissed.value,
		warning_banner_dismissed: warningBannerDismissed.value
	}));
	/**
	* Mark red dot notification as dismissed
	*/
	function dismissRedDotNotification() {
		redDotDismissed.value = true;
	}
	/**
	* Mark manager warning banner as dismissed
	*/
	function dismissWarningBanner() {
		warningBannerDismissed.value = true;
		redDotDismissed.value = true;
	}
	/**
	* Mark conflicts as seen (unified function for help center and manager)
	*/
	function markConflictsAsSeen() {
		redDotDismissed.value = true;
		modalDismissed.value = true;
		warningBannerDismissed.value = true;
	}
	const hasConflicts = computed(() => conflictDetectionStore.hasConflicts);
	return {
		acknowledgmentState: state,
		shouldShowConflictModal: computed(() => !modalDismissed.value),
		shouldShowRedDot: computed(() => {
			if (!hasConflicts.value) return false;
			if (redDotDismissed.value) return false;
			return true;
		}),
		shouldShowManagerBanner: computed(() => {
			return hasConflicts.value && !warningBannerDismissed.value;
		}),
		dismissRedDotNotification,
		dismissWarningBanner,
		markConflictsAsSeen
	};
}
//#endregion
//#region src/workbench/extensions/manager/utils/systemCompatibility.ts
/**
* Maps system OS string to Registry OS format
* @param systemOS Raw OS string from system stats ('darwin', 'win32', 'linux', etc)
* @returns Registry OS or undefined if unknown
*/
function getRegistryOS(systemOS) {
	if (!systemOS) return void 0;
	const lower = systemOS.toLowerCase();
	if (lower.includes("darwin") || lower.includes("mac")) return "macOS";
	if (lower.includes("win")) return "Windows";
	if (lower.includes("linux")) return "Linux";
}
/**
* Maps device type to Registry accelerator format
* @param deviceType Raw device type from system stats ('cuda', 'mps', 'rocm', 'cpu', etc)
* @returns Registry accelerator
*/
function getRegistryAccelerator(deviceType) {
	if (!deviceType) return "CPU";
	const lower = deviceType.toLowerCase();
	if (lower === "cuda") return "CUDA";
	if (lower === "mps") return "Metal";
	if (lower === "rocm") return "ROCm";
	return "CPU";
}
/**
* Checks OS compatibility
* @param supported Supported OS list from Registry (null/undefined = all OS supported)
* @param current Current system OS
* @returns ConflictDetail if incompatible, null if compatible
*/
function checkOSCompatibility(supported, current) {
	if (isNil(supported) || isEmpty(supported)) return null;
	const currentOS = getRegistryOS(current);
	if (!currentOS) return {
		type: "os",
		current_value: "Unknown",
		required_value: supported.join(", ")
	};
	if (!supported.includes(currentOS)) return {
		type: "os",
		current_value: currentOS,
		required_value: supported.join(", ")
	};
	return null;
}
/**
* Checks accelerator compatibility
* @param supported Supported accelerators from Registry (null/undefined = all accelerators supported)
* @param current Current device type
* @returns ConflictDetail if incompatible, null if compatible
*/
function checkAcceleratorCompatibility(supported, current) {
	if (isNil(supported) || isEmpty(supported)) return null;
	const currentAcc = getRegistryAccelerator(current);
	if (!supported.includes(currentAcc)) return {
		type: "accelerator",
		current_value: currentAcc,
		required_value: supported.join(", ")
	};
	return null;
}
/**
* Normalizes OS values from Registry API
* Handles edge cases like "OS Independent"
* @returns undefined if all OS supported, otherwise filtered valid OS list
*/
function normalizeOSList(osValues) {
	if (isNil(osValues) || isEmpty(osValues)) return void 0;
	if (osValues.some((os) => os.toLowerCase() === "os independent")) return;
	const validOS = [];
	osValues.forEach((os) => {
		if (os === "Windows" || os === "macOS" || os === "Linux") {
			if (!validOS.includes(os)) validOS.push(os);
		}
	});
	return validOS.length > 0 ? validOS : void 0;
}
//#endregion
//#region src/workbench/extensions/manager/utils/versionUtil.ts
/**
* Cleans a version string by removing common prefixes and normalizing format
* @param version Raw version string (e.g., "v1.2.3", "1.2.3-alpha")
* @returns Cleaned version string or original if cleaning fails
*/
function cleanVersion(version) {
	return (0, import_semver.clean)(version) || version;
}
/**
* Checks version compatibility and returns conflict details.
* Supports all semver ranges including >=, <=, >, <, ~, ^ operators.
* @param type Conflict type (e.g., 'comfyui_version', 'frontend_version')
* @param currentVersion Current version string
* @param supportedVersion Required version range string
* @returns ConflictDetail object if incompatible, null if compatible
*/
function checkVersionCompatibility(type, currentVersion, supportedVersion) {
	if (isNil(currentVersion) || isEmpty(currentVersion)) return null;
	if (isNil(supportedVersion) || isEmpty(supportedVersion.trim())) return null;
	const cleanCurrent = cleanVersion(currentVersion);
	let isCompatible;
	try {
		isCompatible = (0, import_semver.satisfies)(cleanCurrent, supportedVersion);
	} catch {
		return {
			type,
			current_value: currentVersion,
			required_value: supportedVersion
		};
	}
	if (isCompatible) return null;
	return {
		type,
		current_value: currentVersion,
		required_value: supportedVersion
	};
}
/**
* get frontend version from config.
* @returns frontend version string or undefined
*/
function getFrontendVersion() {
	return config_default.app_version || void 0;
}
//#endregion
//#region src/workbench/extensions/manager/utils/conflictUtils.ts
/**
* Checks for banned package status conflicts.
*/
function createBannedConflict(isBanned) {
	if (isBanned === true) return {
		type: "banned",
		current_value: "installed",
		required_value: "not_banned"
	};
	return null;
}
/**
* Checks for pending package status conflicts.
*/
function createPendingConflict(isPending) {
	if (isPending === true) return {
		type: "pending",
		current_value: "installed",
		required_value: "not_pending"
	};
	return null;
}
/**
* Single source of truth for mapping a Node/NodeVersion status string to
* banned/pending booleans. NodeStatusBanned is a Node-only value; NodeVersion
* has no pending-equivalent Node status, so isPending only checks the
* NodeVersion enum.
*/
function deriveStatusFlags(status) {
	return {
		isBanned: status === "NodeStatusBanned" || status === "NodeVersionStatusBanned",
		isPending: status === "NodeVersionStatusPending"
	};
}
/**
* Runs the six compatibility leaf checks and collects the conflicts that fire.
*
* Canonical order = comfyui_version → frontend_version → OS → accelerator →
* banned → pending; every consumer filters conflicts by `.type`, so the order
* is cosmetic only.
*/
function evaluateCompatibility(input, env) {
	const conflicts = [];
	const versionConflict = checkVersionCompatibility("comfyui_version", env.comfyui_version, input.supported_comfyui_version);
	if (versionConflict) conflicts.push(versionConflict);
	const frontendConflict = checkVersionCompatibility("frontend_version", env.frontend_version, input.supported_comfyui_frontend_version);
	if (frontendConflict) conflicts.push(frontendConflict);
	const osConflict = checkOSCompatibility(input.supported_os, env.os);
	if (osConflict) conflicts.push(osConflict);
	const acceleratorConflict = checkAcceleratorCompatibility(input.supported_accelerators, env.accelerator);
	if (acceleratorConflict) conflicts.push(acceleratorConflict);
	const bannedConflict = createBannedConflict(input.isBanned);
	if (bannedConflict) conflicts.push(bannedConflict);
	const pendingConflict = createPendingConflict(input.isPending);
	if (pendingConflict) conflicts.push(pendingConflict);
	return conflicts;
}
/**
* Groups and deduplicates conflicts by normalized package name.
* Consolidates multiple conflict sources (registry checks, import failures, disabled packages with version suffix)
* into a single UI entry per package.
*
* Example:
* - Input: [{name: "pack@1_0_3", conflicts: [...]}, {name: "pack", conflicts: [...]}]
* - Output: [{name: "pack", conflicts: [...combined unique conflicts...]}]
*
* @param conflicts Array of conflict detection results (may have duplicate packages with version suffixes)
* @returns Array of deduplicated conflict results grouped by normalized package name
*/
function consolidateConflictsByPackage(conflicts) {
	const grouped = groupBy(conflicts, (conflict) => normalizePackId(conflict.package_name));
	return Object.entries(grouped).map(([packageName, packageConflicts]) => {
		const allConflicts = packageConflicts.flatMap((pc) => pc.conflicts);
		const uniqueConflicts = uniqBy(allConflicts, (conflict) => `${conflict.type}|${conflict.current_value}|${conflict.required_value}`);
		return {
			...packageConflicts[0],
			package_name: packageName,
			conflicts: uniqueConflicts,
			has_conflict: uniqueConflicts.length > 0,
			is_compatible: uniqueConflicts.length === 0
		};
	});
}
//#endregion
//#region src/workbench/extensions/manager/composables/useConflictDetection.ts
/**
* Composable for conflict detection system.
* Error-resilient and asynchronous to avoid affecting other components.
*/
function useConflictDetection() {
	const managerStore = useComfyManagerStore();
	const { startFetchInstalled, installedPacks, installedPacksWithVersions, isReady: installedPacksReady } = useInstalledPacks();
	const isDetecting = ref(false);
	const lastDetectionTime = ref(null);
	const detectionError = ref(null);
	const systemEnvironment = ref(null);
	const detectionResults = ref([]);
	const storedMergedConflicts = ref([]);
	const abortController = ref(null);
	const acknowledgment = useConflictAcknowledgment();
	const conflictStore = useConflictDetectionStore();
	const hasConflicts = computed(() => conflictStore.hasConflicts);
	const conflictedPackages = computed(() => {
		return conflictStore.conflictedPackages;
	});
	const bannedPackages = computed(() => conflictStore.bannedPackages);
	const securityPendingPackages = computed(() => conflictStore.securityPendingPackages);
	/**
	* Collects current system environment information.
	* Continues with default values even if errors occur.
	* @returns Promise that resolves to system environment information
	*/
	async function collectSystemEnvironment() {
		try {
			const systemStatsStore = useSystemStatsStore();
			const { systemStats } = systemStatsStore;
			await until(() => systemStatsStore.isInitialized).toBe(true);
			const frontendVersion = getFrontendVersion();
			const environment = {
				comfyui_version: systemStats?.system.comfyui_version ?? "",
				frontend_version: frontendVersion,
				os: systemStats?.system.os ?? "",
				accelerator: systemStats?.devices[0]?.type ?? ""
			};
			systemEnvironment.value = environment;
			return environment;
		} catch {
			const fallbackEnvironment = {
				comfyui_version: void 0,
				frontend_version: void 0,
				os: void 0,
				accelerator: void 0
			};
			systemEnvironment.value = fallbackEnvironment;
			return fallbackEnvironment;
		}
	}
	/**
	* Fetches requirement information for installed packages using Registry Store.
	*
	* This function combines local installation data with Registry API compatibility metadata
	* using the established store layer pattern with caching and batch requests.
	*
	* Process
	* 1. Get locally installed packages
	* 2. Batch fetch Registry data using store layer
	* 3. Combine local + Registry data
	* 4. Extract compatibility requirements
	*
	* @returns Promise that resolves to array of node pack requirements
	*/
	async function buildNodeRequirements() {
		try {
			await startFetchInstalled();
			if (!installedPacksReady.value || installedPacks.value.length === 0) {
				console.warn("[ConflictDetection] No installed packages available from useInstalledPacks");
				return [];
			}
			const registryService = useComfyRegistryService();
			abortController.value = new AbortController();
			const versionDataMap = /* @__PURE__ */ new Map();
			const nodeVersions = installedPacksWithVersions.value.map((pack) => ({
				node_id: pack.id,
				version: pack.version
			}));
			if (nodeVersions.length > 0) try {
				const bulkResponse = await registryService.getBulkNodeVersions(nodeVersions, abortController.value.signal);
				if (bulkResponse && bulkResponse.node_versions.length > 0) bulkResponse.node_versions.forEach((result) => {
					if (result.status === "success" && result.node_version) versionDataMap.set(result.identifier.node_id, result.node_version);
					else if (result.status === "error") console.warn(`[ConflictDetection] Failed to fetch version data for ${result.identifier.node_id}@${result.identifier.version}:`, result.error_message);
				});
			} catch (error) {
				console.warn("[ConflictDetection] Failed to fetch bulk version data:", error);
			}
			const requirements = [];
			for (const installedPackVersion of installedPacksWithVersions.value) {
				const versionData = versionDataMap.get(installedPackVersion.id);
				const isEnabled = managerStore.isPackEnabled(installedPackVersion.id);
				const packInfo = find(installedPacks.value, { id: installedPackVersion.id });
				if (versionData) {
					const { isBanned, isPending } = deriveStatusFlags(versionData.status);
					const requirement = {
						id: installedPackVersion.id,
						name: packInfo?.name || installedPackVersion.id,
						installed_version: installedPackVersion.version,
						is_enabled: isEnabled,
						supported_comfyui_version: versionData.supported_comfyui_version,
						supported_comfyui_frontend_version: versionData.supported_comfyui_frontend_version,
						supported_os: normalizeOSList(versionData.supported_os),
						supported_accelerators: versionData.supported_accelerators,
						version_status: versionData.status,
						is_banned: isBanned,
						is_pending: isPending
					};
					requirements.push(requirement);
				} else {
					console.warn(`[ConflictDetection] No Registry data found for ${installedPackVersion.id}, using fallback`);
					const fallbackRequirement = {
						id: installedPackVersion.id,
						name: packInfo?.name || installedPackVersion.id,
						installed_version: installedPackVersion.version,
						is_enabled: isEnabled,
						is_banned: false,
						is_pending: false
					};
					requirements.push(fallbackRequirement);
				}
			}
			return requirements;
		} catch (error) {
			console.warn("[ConflictDetection] Failed to fetch package requirements:", error);
			return [];
		}
	}
	/**
	* Detects conflicts for an individual package using Registry API data.
	*
	* @param packageReq Package requirements from Registry
	* @param sysEnv Current system environment
	* @returns Conflict detection result for the package
	*/
	function analyzePackageConflicts(packageReq, systemEnvInfo) {
		const conflicts = evaluateCompatibility({
			supported_os: packageReq.supported_os,
			supported_accelerators: packageReq.supported_accelerators,
			supported_comfyui_version: packageReq.supported_comfyui_version,
			supported_comfyui_frontend_version: packageReq.supported_comfyui_frontend_version,
			isBanned: packageReq.is_banned,
			isPending: packageReq.is_pending
		}, systemEnvInfo);
		const hasConflict = conflicts.length > 0;
		return {
			package_id: packageReq.id ?? "",
			package_name: packageReq.name ?? "",
			has_conflict: hasConflict,
			conflicts,
			is_compatible: !hasConflict
		};
	}
	/**
	* Fetches Python import failure information from ComfyUI Manager.
	* Gets installed packages and checks each one for import failures using bulk API.
	* @returns Promise that resolves to import failure data
	*/
	async function fetchImportFailInfo() {
		try {
			const comfyManagerService = useComfyManagerService();
			if (installedPacksWithVersions.value.length === 0) {
				console.warn("[ConflictDetection] No installed packages available for import failure check");
				return {};
			}
			const packageIds = installedPacksWithVersions.value.map((pack) => pack.id);
			const bulkResult = await comfyManagerService.getImportFailInfoBulk({ cnr_ids: packageIds }, abortController.value?.signal);
			if (bulkResult) {
				const importFailures = {};
				Object.entries(bulkResult).forEach(([packageId, failInfo]) => {
					if (failInfo !== null) importFailures[packageId] = failInfo;
				});
				return importFailures;
			}
			return {};
		} catch (error) {
			console.warn("[ConflictDetection] Failed to fetch import failure information:", error);
			return {};
		}
	}
	/**
	* Detects runtime conflicts from Python import failures.
	* @param importFailInfo Import failure data from Manager API
	* @returns Array of conflict detection results for failed imports
	*/
	function detectImportFailConflicts(importFailInfo) {
		const results = [];
		if (typeof importFailInfo !== "object") return results;
		for (const [packageId, failureInfo] of Object.entries(importFailInfo)) {
			if (!failureInfo || typeof failureInfo !== "object") continue;
			const errorMsg = failureInfo.error || "Unknown import error";
			const fullErrorInfo = failureInfo.traceback || errorMsg;
			results.push({
				package_id: packageId,
				package_name: packageId,
				has_conflict: true,
				conflicts: [{
					type: "import_failed",
					current_value: errorMsg,
					required_value: fullErrorInfo
				}],
				is_compatible: false
			});
			console.warn(`[ConflictDetection] Python import failure detected for ${packageId}:`, errorMsg);
		}
		return results;
	}
	/**
	* Performs complete conflict detection.
	* @returns Promise that resolves to conflict detection response
	*/
	async function runFullConflictAnalysis() {
		if (isDetecting.value) return {
			success: false,
			error_message: "Already detecting conflicts",
			results: detectionResults.value
		};
		isDetecting.value = true;
		detectionError.value = null;
		try {
			const systemEnvInfo = await collectSystemEnvironment();
			const conflictDetectionTasks = (await buildNodeRequirements()).map(async (packageReq) => {
				try {
					return analyzePackageConflicts(packageReq, systemEnvInfo);
				} catch (error) {
					console.warn(`[ConflictDetection] Failed to detect conflicts for package ${packageReq.name}:`, error);
					return null;
				}
			});
			const packageResults = (await Promise.allSettled(conflictDetectionTasks)).map((result) => result.status === "fulfilled" ? result.value : null).filter((result) => result !== null);
			const importFailResults = detectImportFailConflicts(await fetchImportFailInfo());
			const allResults = [...packageResults, ...importFailResults];
			detectionResults.value = allResults;
			lastDetectionTime.value = (/* @__PURE__ */ new Date()).toISOString();
			if (allResults.some((result) => result.has_conflict)) {
				const mergedConflicts = consolidateConflictsByPackage(allResults.filter((result) => result.has_conflict));
				conflictStore.setConflictedPackages(mergedConflicts);
				detectionResults.value = [...mergedConflicts];
				storedMergedConflicts.value = [...mergedConflicts];
				return {
					success: true,
					results: mergedConflicts,
					detected_system_environment: systemEnvInfo
				};
			} else {
				conflictStore.clearConflicts();
				detectionResults.value = [];
			}
			return {
				success: true,
				results: allResults,
				detected_system_environment: systemEnvInfo
			};
		} catch (error) {
			console.error("[ConflictDetection] Error during conflict detection:", error);
			detectionError.value = error instanceof Error ? error.message : String(error);
			return {
				success: false,
				error_message: detectionError.value,
				results: []
			};
		} finally {
			isDetecting.value = false;
			if (abortController.value) abortController.value = null;
		}
	}
	/**
	* Error-resilient initialization (called on app mount).
	* Async function that doesn't block UI setup.
	* Ensures proper order: system_stats -> manager state -> installed -> versions bulk -> import_fail_info_bulk
	*/
	async function initializeConflictDetection() {
		try {
			const systemStatsStore = useSystemStatsStore();
			await until(() => systemStatsStore.isInitialized).toBe(true);
			if (!useManagerState().isNewManagerUI.value) return;
			await runFullConflictAnalysis();
		} catch (error) {
			console.warn("[ConflictDetection] Error during initialization (ignored):", error);
		}
	}
	function cancelRequests() {
		if (abortController.value) {
			abortController.value.abort();
			abortController.value = null;
		}
	}
	if (getCurrentInstance()) onUnmounted(() => {
		cancelRequests();
	});
	/**
	* Check if conflicts should trigger modal display after "What's New" dismissal
	*/
	async function shouldShowConflictModalAfterUpdate() {
		if (detectionResults.value.length === 0) await runFullConflictAnalysis();
		const hasActualConflicts = hasConflicts.value;
		const canShowModal = acknowledgment.shouldShowConflictModal.value;
		return hasActualConflicts && canShowModal;
	}
	/**
	* Check compatibility for a node.
	* Used by components like PackVersionSelectorPopover.
	*/
	function checkNodeCompatibility(node) {
		const { isBanned, isPending } = deriveStatusFlags(node.status);
		const conflicts = evaluateCompatibility({
			supported_os: normalizeOSList(node.supported_os),
			supported_accelerators: node.supported_accelerators,
			supported_comfyui_version: node.supported_comfyui_version,
			supported_comfyui_frontend_version: node.supported_comfyui_frontend_version,
			isBanned,
			isPending
		}, {
			comfyui_version: systemEnvironment.value?.comfyui_version,
			frontend_version: getFrontendVersion(),
			os: systemEnvironment.value?.os,
			accelerator: systemEnvironment.value?.accelerator
		});
		return {
			hasConflict: conflicts.length > 0,
			conflicts
		};
	}
	return {
		isDetecting: readonly(isDetecting),
		lastDetectionTime: readonly(lastDetectionTime),
		detectionError: readonly(detectionError),
		systemEnvironment: readonly(systemEnvironment),
		detectionResults: readonly(detectionResults),
		hasConflicts,
		conflictedPackages,
		bannedPackages,
		securityPendingPackages,
		runFullConflictAnalysis,
		collectSystemEnvironment,
		initializeConflictDetection,
		cancelRequests,
		shouldShowConflictModalAfterUpdate,
		checkNodeCompatibility
	};
}
//#endregion
export { useBootstrapStore as _, useComfyManagerStore as a, cloudSignIn as b, useComfyManagerService as c, normalizePackId as d, useNodePacks as f, DialogFooter_default as g, config_default as h, useInstalledPacks as i, ManagerUIState as l, useComfyRegistryService as m, useConflictAcknowledgment as n, getLatestVersion as o, useComfyRegistryStore as p, useConflictDetectionStore as r, versionStatusFilters as s, useConflictDetection as t, useManagerState as u, isValidShareId as v, preserveLoggedOutShareAuthAttribution as y };
