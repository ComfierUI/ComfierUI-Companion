import "./rolldown-runtime-xtsTai4I.js";
import { Et as withCtx, F as createBaseVNode, G as defineComponent, H as createTextVNode, I as createBlock, L as createCommentVNode, Lt as ref, P as computed, R as createElementBlock, St as watch, U as createVNode, Zt as toDisplayString, ft as renderSlot, lt as openBlock, ot as onMounted, p as storeToRefs, pt as resolveComponent, st as onUnmounted, xt as useTemplateRef } from "./vendor-vue-core-C1utdb0s.js";
import { S as useFavicon, it as until } from "./vendor-vueuse-BxKIIsKg.js";
import { Q as useApiKeyAuthStore, Wl as useTeamWorkspaceStore, or as useAuthActions, tr as useBillingCapabilities, tt as useAuthStore } from "./layoutStore-CZsuzg91.js";
import "./api-Bt-fGt5a.js";
import "./reportError-LG-zfbNw.js";
import "./remoteConfig-DwMQrLli.js";
import "./useFeatureFlags-DAoj_aDd.js";
import "./refreshRemoteConfig-D9UzqP0h.js";
import { t as Button_default } from "./Button-j0oCzR82.js";
//#region src/platform/workspace/auth/WorkspaceAuthGate.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1$1 = { class: "flex max-w-md flex-col items-center gap-4 text-center" };
var _hoisted_2 = { class: "m-0 text-lg font-semibold text-base-foreground" };
var _hoisted_3 = { class: "mt-2 mb-0 text-muted-foreground" };
var _hoisted_4 = { class: "flex max-w-md flex-col items-center gap-4 text-center" };
var _hoisted_5 = { class: "m-0 text-lg font-semibold text-base-foreground" };
var _hoisted_6 = { class: "mt-2 mb-0 text-muted-foreground" };
var FIREBASE_INIT_TIMEOUT_MS = 16e3;
//#endregion
//#region src/platform/workspace/auth/WorkspaceAuthGate.vue
var WorkspaceAuthGate_default = /* @__PURE__ */ defineComponent({
	__name: "WorkspaceAuthGate",
	setup(__props) {
		/**
		* WorkspaceAuthGate - Cloud workspace auth checkpoint.
		*
		* This gate ensures proper initialization order for workspace-scoped auth:
		* 1. Wait for Firebase auth to resolve
		* 2. Load authenticated remote configuration
		* 3. Initialize the workspace token and store before rendering
		*
		* This prevents race conditions where API calls use Firebase tokens
		* instead of workspace tokens.
		*
		* The splash loader in index.html (z-9999) covers the screen during this
		* phase, so no separate loading indicator is needed here.
		*/
		const initializationState = ref("ready");
		const initializationRetryable = ref(true);
		const errorPanel = useTemplateRef("errorPanel");
		useBillingCapabilities();
		let initializationGeneration = 0;
		let initializationController = null;
		let backgroundInitialization = null;
		let backgroundInitializationUserId;
		function cancelInitialization() {
			initializationGeneration++;
			initializationController?.abort();
			initializationController = null;
			backgroundInitialization = null;
			backgroundInitializationUserId = void 0;
		}
		async function initialize() {
			initializeWorkspacesInBackground();
		}
		async function retryInitialization() {
			initializationState.value = "retrying";
			await initialize();
		}
		async function handleSignOut() {
			cancelInitialization();
			await useAuthActions().logout();
		}
		async function initializeWorkspaceMode() {
			const workspaceStore = useTeamWorkspaceStore();
			if (workspaceStore.initState === "uninitialized" || workspaceStore.initState === "error") await workspaceStore.initialize();
			if (workspaceStore.initState !== "ready" || !workspaceStore.activeWorkspaceId) throw new Error("Failed to initialize workspace context");
		}
		function localSessionIdentity() {
			const { currentUser } = storeToRefs(useAuthStore());
			if (currentUser.value?.uid) return currentUser.value.uid;
			const apiKeyStore = useApiKeyAuthStore();
			return apiKeyStore.isAuthenticated ? apiKeyStore.getApiKey() : null;
		}
		function initializeWorkspacesInBackground() {
			const { isInitialized } = storeToRefs(useAuthStore());
			const sessionId = localSessionIdentity();
			if (backgroundInitialization && backgroundInitializationUserId === sessionId) return backgroundInitialization;
			cancelInitialization();
			const generation = initializationGeneration;
			backgroundInitializationUserId = sessionId;
			const operation = (async () => {
				if (!isInitialized.value) await until(isInitialized).toBe(true, {
					timeout: FIREBASE_INIT_TIMEOUT_MS,
					throwOnTimeout: true
				});
				if (sessionId === null || generation !== initializationGeneration || localSessionIdentity() !== sessionId) return;
				await initializeWorkspaceMode();
			})().catch((error) => {
				if (generation === initializationGeneration) console.warn("[WorkspaceAuthGate] Background workspace initialization failed:", error);
			});
			backgroundInitialization = operation;
			operation.finally(() => {
				if (backgroundInitialization === operation) {
					backgroundInitialization = null;
					backgroundInitializationUserId = void 0;
				}
			});
			return operation;
		}
		onMounted(() => {
			initialize();
		});
		{
			const sessionIdentity = computed(() => localSessionIdentity());
			watch(sessionIdentity, (identity, previousIdentity) => {
				if (previousIdentity !== null && identity !== previousIdentity) useTeamWorkspaceStore().resetForIdentityChange();
				if (identity) initializeWorkspacesInBackground();
				else cancelInitialization();
			});
		}
		onUnmounted(cancelInitialization);
		return (_ctx, _cache) => {
			return initializationState.value === "ready" ? renderSlot(_ctx.$slots, "default", {}, void 0, void 0, 0) : initializationState.value === "no_workspace" ? (openBlock(), createElementBlock("div", {
				key: 1,
				ref_key: "errorPanel",
				ref: errorPanel,
				class: "flex size-full items-center justify-center bg-base-background p-8",
				role: "alert",
				tabindex: "-1"
			}, [createBaseVNode("div", _hoisted_1$1, [
				_cache[0] || (_cache[0] = createBaseVNode("i", {
					"aria-hidden": "true",
					class: "icon-[lucide--users] size-8 text-muted-foreground"
				}, null, -1)),
				createBaseVNode("div", null, [createBaseVNode("h1", _hoisted_2, toDisplayString(_ctx.$t("workspaceAuth.noWorkspaceAccess.title")), 1), createBaseVNode("p", _hoisted_3, toDisplayString(_ctx.$t("workspaceAuth.noWorkspaceAccess.detail")), 1)]),
				createVNode(Button_default, {
					variant: "secondary",
					onClick: handleSignOut
				}, {
					default: withCtx(() => [createTextVNode(toDisplayString(_ctx.$t("auth.signOut.signOut")), 1)]),
					_: 1
				})
			])], 512)) : initializationState.value !== "initializing" ? (openBlock(), createElementBlock("div", {
				key: 2,
				ref_key: "errorPanel",
				ref: errorPanel,
				class: "flex size-full items-center justify-center bg-base-background p-8",
				role: "alert",
				tabindex: "-1"
			}, [createBaseVNode("div", _hoisted_4, [
				_cache[1] || (_cache[1] = createBaseVNode("i", {
					"aria-hidden": "true",
					class: "icon-[lucide--triangle-alert] size-8 text-error"
				}, null, -1)),
				createBaseVNode("div", null, [createBaseVNode("h1", _hoisted_5, toDisplayString(_ctx.$t("workspaceAuth.initializationFailed")), 1), createBaseVNode("p", _hoisted_6, toDisplayString(_ctx.$t(initializationRetryable.value ? "workspaceAuth.initializationFailedDetail" : "workspaceAuth.initializationFailedSignOutDetail")), 1)]),
				initializationRetryable.value ? (openBlock(), createBlock(Button_default, {
					key: 0,
					"aria-busy": initializationState.value === "retrying",
					disabled: initializationState.value === "retrying",
					onClick: retryInitialization
				}, {
					default: withCtx(() => [createTextVNode(toDisplayString(_ctx.$t("workspaceAuth.retry")), 1)]),
					_: 1
				}, 8, ["aria-busy", "disabled"])) : createCommentVNode("", true),
				createVNode(Button_default, {
					variant: "secondary",
					onClick: handleSignOut
				}, {
					default: withCtx(() => [createTextVNode(toDisplayString(_ctx.$t("auth.signOut.signOut")), 1)]),
					_: 1
				})
			])], 512)) : createCommentVNode("", true);
		};
	}
});
//#endregion
//#region src/views/layouts/LayoutDefault.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1 = { class: "relative size-full overflow-hidden" };
//#endregion
//#region src/views/layouts/LayoutDefault.vue
var LayoutDefault_default = /* @__PURE__ */ defineComponent({
	__name: "LayoutDefault",
	setup(__props) {
		useFavicon("/assets/favicon.ico");
		return (_ctx, _cache) => {
			const _component_router_view = resolveComponent("router-view");
			return openBlock(), createBlock(WorkspaceAuthGate_default, null, {
				default: withCtx(() => [createBaseVNode("main", _hoisted_1, [createVNode(_component_router_view)])]),
				_: 1
			});
		};
	}
});
//#endregion
export { LayoutDefault_default as t };
