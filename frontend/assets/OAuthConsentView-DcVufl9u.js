import "./rolldown-runtime-xtsTai4I.js";
import { Dt as withDirectives, Et as withCtx, F as createBaseVNode, G as defineComponent, H as createTextVNode, I as createBlock, Jt as normalizeClass, Kt as unref, L as createCommentVNode, Lt as ref, O as Fragment, P as computed, R as createElementBlock, U as createVNode, V as createStaticVNode, Zt as toDisplayString, c as useRoute, dt as renderList, lt as openBlock, ot as onMounted, w as vShow } from "./vendor-vue-core-C1utdb0s.js";
import { E as zErrorResponse } from "./zod.gen-C09SPgBJ.js";
import { r as useI18n } from "./vendor-i18n-BZvE7WBQ.js";
import { G as RadioGroupItem_default, K as RadioGroupRoot_default } from "./vendor-reka-ui-tdehH9A1.js";
import { t as cn } from "./src-DI1bBfrb.js";
import { t as Button_default } from "./Button-j0oCzR82.js";
import { n as clearOAuthRequestId, r as getOAuthRequestId } from "./oauthState-DmjrcfWa.js";
import { t as WorkspaceProfilePic_default } from "./WorkspaceProfilePic-C1aA3F8q.js";
//#region src/platform/cloud/oauth/oauthApi.ts
var EXECUTABLE_SCHEMES = /* @__PURE__ */ new Set([
	"javascript:",
	"data:",
	"blob:",
	"vbscript:",
	"about:"
]);
var OAuthApiError = class extends Error {
	status;
	code;
	constructor(message, status, code) {
		super(message);
		this.status = status;
		this.code = code;
		this.name = "OAuthApiError";
	}
};
async function readApiError(response) {
	const body = await response.json().catch(() => null);
	const parsed = zErrorResponse.partial().safeParse(body).data;
	return new OAuthApiError(parsed?.message ?? response.statusText, response.status, parsed?.code);
}
function assertChallenge(value) {
	if (typeof value !== "object" || value === null) throw new Error("OAuth consent challenge is invalid");
	const challenge = value;
	if (typeof challenge.oauth_request_id !== "string" || typeof challenge.csrf_token !== "string" || typeof challenge.client_display_name !== "string" || !Array.isArray(challenge.scopes) || !challenge.scopes.every((scope) => typeof scope === "string") || !Array.isArray(challenge.workspaces) || !challenge.workspaces.every(isValidWorkspace)) throw new Error("OAuth consent challenge is invalid");
}
function isValidWorkspace(value) {
	if (typeof value !== "object" || value === null) return false;
	const workspace = value;
	return typeof workspace.id === "string" && typeof workspace.name === "string" && (workspace.type === "personal" || workspace.type === "team") && (workspace.role === "owner" || workspace.role === "member");
}
async function fetchOAuthConsentChallenge(oauthRequestId) {
	const response = await fetch(`/oauth/authorize?oauth_request_id=${encodeURIComponent(oauthRequestId)}`, {
		method: "GET",
		credentials: "include"
	});
	if (!response.ok) throw await readApiError(response);
	const challenge = await response.json();
	assertChallenge(challenge);
	return challenge;
}
async function submitOAuthConsentDecision({ oauthRequestId, csrfToken, decision, workspaceId, expectedRedirectUri }) {
	const response = await fetch("/oauth/authorize", {
		method: "POST",
		credentials: "include",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			oauth_request_id: oauthRequestId,
			csrf_token: csrfToken,
			decision,
			workspace_id: workspaceId
		})
	});
	if (!response.ok) throw await readApiError(response);
	const redirectUrl = (await response.json())?.redirect_url;
	if (typeof redirectUrl !== "string") throw new Error("OAuth consent response did not include redirect_url");
	const parseTarget = () => {
		try {
			return new URL(redirectUrl, globalThis.location.origin);
		} catch (err) {
			throw new Error("OAuth consent redirect_url is not a valid URL", { cause: err });
		}
	};
	const target = parseTarget();
	if (EXECUTABLE_SCHEMES.has(target.protocol)) throw new Error("OAuth consent redirect_url has an unsafe scheme");
	if (expectedRedirectUri) {
		const parseExpected = () => {
			try {
				return new URL(expectedRedirectUri);
			} catch (err) {
				throw new Error("OAuth consent challenge redirect_uri is not a valid URL", { cause: err });
			}
		};
		const expected = parseExpected();
		if (!(target.protocol === expected.protocol && target.host === expected.host && target.pathname === expected.pathname)) throw new Error("OAuth consent redirect_url does not match the registered redirect_uri");
	} else if (target.protocol !== "http:" && target.protocol !== "https:") throw new Error("OAuth consent redirect_url has an unsafe scheme");
	globalThis.location.href = target.href;
}
//#endregion
//#region src/platform/cloud/oauth/OAuthConsentView.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1 = { class: "mx-auto flex min-h-screen max-w-lg flex-col justify-center p-6" };
var _hoisted_2 = {
	key: 0,
	class: "flex flex-col gap-8"
};
var _hoisted_3 = { class: "flex flex-col items-center gap-4 text-center" };
var _hoisted_4 = { class: "flex flex-col items-center gap-2" };
var _hoisted_5 = { class: "m-0 text-2xl/tight font-semibold text-base-foreground" };
var _hoisted_6 = { class: "m-0 text-sm text-muted" };
var _hoisted_7 = { class: "flex flex-col gap-2" };
var _hoisted_8 = { class: "m-0 text-sm font-medium" };
var _hoisted_9 = {
	key: 0,
	class: "rounded-lg bg-ink-400 p-3 text-sm text-muted"
};
var _hoisted_10 = { class: "flex min-w-0 flex-1 flex-col" };
var _hoisted_11 = { class: "truncate text-sm text-base-foreground" };
var _hoisted_12 = { class: "text-xs text-muted-foreground" };
var _hoisted_13 = {
	key: 0,
	class: "icon-[lucide--check] size-4 shrink-0 text-base-foreground",
	"aria-hidden": "true"
};
var _hoisted_14 = { class: "flex flex-col gap-3" };
var _hoisted_15 = { class: "m-0 text-sm font-medium" };
var _hoisted_16 = { class: "flex flex-col gap-1.5 rounded-lg bg-ink-400 p-3" };
var _hoisted_17 = { class: "text-xs text-muted" };
var _hoisted_18 = { class: "m-0 flex scrollbar-custom max-h-72 list-none flex-col gap-1.5 overflow-y-auto p-0" };
var _hoisted_19 = { class: "text-sm" };
var _hoisted_20 = {
	key: 0,
	class: "flex flex-col gap-1.5 rounded-lg bg-ink-400 p-3"
};
var _hoisted_21 = { class: "text-xs text-muted" };
var _hoisted_22 = ["title"];
var _hoisted_23 = { class: "flex flex-col gap-2" };
var _hoisted_24 = {
	key: 1,
	role: "alert",
	class: "m-0 rounded-md border border-solid border-destructive-background bg-destructive-background/10 p-3 text-center text-sm text-destructive-background"
};
var _hoisted_25 = {
	key: 2,
	class: "m-0 text-center text-sm text-muted"
};
//#endregion
//#region src/platform/cloud/oauth/OAuthConsentView.vue
var OAuthConsentView_default = /* @__PURE__ */ defineComponent({
	__name: "OAuthConsentView",
	props: { initialChallenge: {} },
	setup(__props) {
		const { t, te } = useI18n();
		const route = useRoute();
		function getDefaultWorkspaceId(source) {
			return source?.workspaces.length === 1 ? source.workspaces[0].id : void 0;
		}
		const challenge = ref(__props.initialChallenge ?? null);
		const selectedWorkspaceId = ref(getDefaultWorkspaceId(__props.initialChallenge));
		const errorMessage = ref("");
		const submitting = ref(null);
		const isSubmitting = computed(() => submitting.value !== null);
		const resourceName = computed(() => challenge.value?.resource_display_name ?? t("oauth.consent.resourceFallback"));
		const selectedWorkspaceIsValid = computed(() => Boolean(selectedWorkspaceId.value && challenge.value?.workspaces.some((workspace) => workspace.id === selectedWorkspaceId.value)));
		function scopeLabel(scope) {
			const key = `oauth.scopes.${scope}.label`;
			return te(key) ? t(key) : scope;
		}
		function workspaceSecondaryLabel(workspace) {
			if (workspace.type === "personal") return t("oauth.workspace.personal");
			return workspace.role === "owner" ? t("oauth.workspace.owner") : t("oauth.workspace.member");
		}
		function requestIdFromRoute() {
			return typeof route.query.oauth_request_id === "string" ? route.query.oauth_request_id : getOAuthRequestId();
		}
		async function loadChallenge() {
			const oauthRequestId = requestIdFromRoute();
			if (!oauthRequestId) {
				errorMessage.value = t("oauth.consent.missingRequest");
				return;
			}
			try {
				const next = await fetchOAuthConsentChallenge(oauthRequestId);
				challenge.value = next;
				selectedWorkspaceId.value = getDefaultWorkspaceId(next);
			} catch (error) {
				errorMessage.value = messageForError(error);
			}
		}
		function messageForError(error) {
			if (error instanceof OAuthApiError) {
				if (error.status === 400) return t("oauth.consent.errorExpired");
				if (error.status === 401) return t("oauth.consent.sessionError");
				if (error.status === 403) return forbiddenMessage(error.code);
				if (error.status === 404) return t("oauth.consent.errorUnavailable");
			}
			return t("oauth.consent.genericError");
		}
		function forbiddenMessage(code) {
			return code === "origin_not_allowed" || code === "cross_site_request" ? t("oauth.consent.errorOriginRefused") : t("oauth.consent.errorScopeBroadening");
		}
		async function submit(decision) {
			if (!challenge.value) return;
			if (decision === "allow" && !selectedWorkspaceIsValid.value) return;
			const workspaceId = selectedWorkspaceId.value ?? challenge.value.workspaces[0]?.id;
			if (!workspaceId) {
				errorMessage.value = t("oauth.consent.genericError");
				return;
			}
			errorMessage.value = "";
			submitting.value = decision;
			try {
				await submitOAuthConsentDecision({
					oauthRequestId: challenge.value.oauth_request_id,
					csrfToken: challenge.value.csrf_token,
					decision,
					workspaceId,
					expectedRedirectUri: challenge.value.redirect_uri
				});
				clearOAuthRequestId();
			} catch (error) {
				errorMessage.value = messageForError(error);
			} finally {
				submitting.value = null;
			}
		}
		onMounted(() => {
			if (!__props.initialChallenge) loadChallenge();
		});
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("main", _hoisted_1, [challenge.value ? (openBlock(), createElementBlock("section", _hoisted_2, [
				createBaseVNode("header", _hoisted_3, [_cache[3] || (_cache[3] = createStaticVNode("<div class=\"flex items-center gap-4\"><div class=\"flex size-14 items-center justify-center rounded-2xl bg-white\"><i class=\"icon-[lucide--app-window] size-8 text-black\" aria-hidden=\"true\" data-testid=\"client-icon\"></i></div><i class=\"icon-[lucide--arrow-left-right] size-6 text-muted\" aria-hidden=\"true\"></i><div class=\"flex size-14 items-center justify-center rounded-2xl bg-plum-600\"><i class=\"icon-[comfy--comfy-c] size-8 text-white\" aria-hidden=\"true\"></i></div></div>", 1)), createBaseVNode("div", _hoisted_4, [createBaseVNode("h1", _hoisted_5, toDisplayString(unref(t)("oauth.consent.title", { client: challenge.value.client_display_name })), 1), createBaseVNode("p", _hoisted_6, toDisplayString(unref(t)("oauth.consent.subtitle", { resource: resourceName.value })), 1)])]),
				createBaseVNode("section", _hoisted_7, [createBaseVNode("p", _hoisted_8, toDisplayString(unref(t)("oauth.consent.workspaceLabel")), 1), challenge.value.workspaces.length === 0 ? (openBlock(), createElementBlock("div", _hoisted_9, toDisplayString(unref(t)("oauth.consent.noWorkspaces")), 1)) : (openBlock(), createBlock(unref(RadioGroupRoot_default), {
					key: 1,
					modelValue: selectedWorkspaceId.value,
					"onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => selectedWorkspaceId.value = $event),
					"aria-label": unref(t)("oauth.consent.workspaceLabel"),
					class: "m-0 flex scrollbar-custom max-h-72 list-none flex-col divide-y divide-white/10 overflow-hidden overflow-y-auto rounded-lg bg-ink-400 p-0"
				}, {
					default: withCtx(() => [(openBlock(true), createElementBlock(Fragment, null, renderList(challenge.value.workspaces, (workspace) => {
						return openBlock(), createBlock(unref(RadioGroupItem_default), {
							key: workspace.id,
							value: workspace.id,
							class: normalizeClass(unref(cn)("flex w-full cursor-pointer items-center gap-3 border-none bg-transparent p-3 text-left transition-colors", "hover:bg-ink-300", "focus-visible:ring-1 focus-visible:ring-border-default focus-visible:outline-none focus-visible:ring-inset", selectedWorkspaceId.value === workspace.id && "bg-ink-200"))
						}, {
							default: withCtx(() => [
								createVNode(WorkspaceProfilePic_default, {
									class: "size-8 shrink-0 text-sm",
									"workspace-name": workspace.name
								}, null, 8, ["workspace-name"]),
								createBaseVNode("div", _hoisted_10, [createBaseVNode("span", _hoisted_11, toDisplayString(workspace.name), 1), createBaseVNode("span", _hoisted_12, toDisplayString(workspaceSecondaryLabel(workspace)), 1)]),
								selectedWorkspaceId.value === workspace.id ? (openBlock(), createElementBlock("i", _hoisted_13)) : createCommentVNode("", true)
							]),
							_: 2
						}, 1032, ["value", "class"]);
					}), 128))]),
					_: 1
				}, 8, ["modelValue", "aria-label"]))]),
				createBaseVNode("section", _hoisted_14, [
					createBaseVNode("p", _hoisted_15, toDisplayString(unref(t)("oauth.consent.detailsHeader")), 1),
					createBaseVNode("div", _hoisted_16, [createBaseVNode("span", _hoisted_17, toDisplayString(unref(t)("oauth.consent.permissionsHeader")), 1), createBaseVNode("ul", _hoisted_18, [(openBlock(true), createElementBlock(Fragment, null, renderList(challenge.value.scopes, (scope) => {
						return openBlock(), createElementBlock("li", {
							key: scope,
							class: "flex items-center gap-2"
						}, [_cache[4] || (_cache[4] = createBaseVNode("i", {
							class: "icon-[lucide--check] size-4 shrink-0 text-brand-yellow",
							"aria-hidden": "true"
						}, null, -1)), createBaseVNode("span", _hoisted_19, toDisplayString(scopeLabel(scope)), 1)]);
					}), 128))])]),
					challenge.value.redirect_uri ? (openBlock(), createElementBlock("div", _hoisted_20, [createBaseVNode("span", _hoisted_21, toDisplayString(unref(t)("oauth.consent.redirectNotice")), 1), createBaseVNode("code", {
						class: "m-0 block truncate rounded-md bg-ink-200 px-3 py-2 font-mono text-xs text-base-foreground",
						title: challenge.value.redirect_uri
					}, toDisplayString(challenge.value.redirect_uri), 9, _hoisted_22)])) : createCommentVNode("", true)
				]),
				withDirectives(createBaseVNode("p", {
					role: "alert",
					class: "m-0 rounded-md border border-solid border-destructive-background bg-destructive-background/10 p-3 text-sm text-destructive-background"
				}, toDisplayString(errorMessage.value), 513), [[vShow, errorMessage.value]]),
				createBaseVNode("footer", _hoisted_23, [createVNode(Button_default, {
					variant: "secondary",
					size: "lg",
					class: "w-full bg-ink-500 hover:bg-ink-400",
					loading: submitting.value === "allow",
					disabled: isSubmitting.value || !selectedWorkspaceIsValid.value,
					onClick: _cache[1] || (_cache[1] = ($event) => submit("allow"))
				}, {
					default: withCtx(() => [createTextVNode(toDisplayString(unref(t)("oauth.consent.allow")), 1)]),
					_: 1
				}, 8, ["loading", "disabled"]), createVNode(Button_default, {
					variant: "secondary",
					size: "lg",
					class: "w-full bg-ink-600 hover:bg-ink-400",
					loading: submitting.value === "deny",
					disabled: isSubmitting.value,
					onClick: _cache[2] || (_cache[2] = ($event) => submit("deny"))
				}, {
					default: withCtx(() => [createTextVNode(toDisplayString(unref(t)("oauth.consent.deny")), 1)]),
					_: 1
				}, 8, ["loading", "disabled"])])
			])) : errorMessage.value ? (openBlock(), createElementBlock("p", _hoisted_24, toDisplayString(errorMessage.value), 1)) : (openBlock(), createElementBlock("p", _hoisted_25, toDisplayString(unref(t)("oauth.consent.loading")), 1))]);
		};
	}
});
//#endregion
export { OAuthConsentView_default as default };
