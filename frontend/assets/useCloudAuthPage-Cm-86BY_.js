import "./rolldown-runtime-xtsTai4I.js";
import { F as createBaseVNode, G as defineComponent, It as readonly, Jt as normalizeClass, Kt as unref, L as createCommentVNode, Lt as ref, O as Fragment, P as computed, Pt as onScopeDispose, R as createElementBlock, U as createVNode, Zt as toDisplayString, c as useRoute, l as useRouter, lt as openBlock } from "./vendor-vue-core-C1utdb0s.js";
import { x as useEventListener } from "./vendor-vueuse-BxKIIsKg.js";
import { tt as useAuthStore } from "./layoutStore-CZsuzg91.js";
import { t as useToastStore } from "./toastStore-CTfykAzG.js";
import { r as useI18n } from "./vendor-i18n-BZvE7WBQ.js";
import { t as useFeatureFlags } from "./useFeatureFlags-DAoj_aDd.js";
import { a as safeInternalPath, i as ssoStartUrl, n as discoverSso, t as SSO_ENTRY_OPEN_QUERY } from "./ssoEntryQuery-MCHmpE9w.js";
import { r as presentSsoRequired } from "./ssoRequired-BkQMvdnz.js";
import { t as cn } from "./src-DI1bBfrb.js";
import { n as buttonVariants } from "./Button-j0oCzR82.js";
import { n as isEmbeddedWebView, t as useSocialSignIn } from "./useSocialSignIn-4ach6N_x.js";
import { r as getOAuthRequestId, t as captureOAuthRequestId } from "./oauthState-DmjrcfWa.js";
import { t as useSessionCookie } from "./useSessionCookie-brPafxdw.js";
//#region packages/account-ui/src/auth/SocialAuthButtons.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1$1 = ["disabled"];
var _hoisted_2 = ["disabled"];
//#endregion
//#region packages/account-ui/src/auth/SocialAuthButtons.vue
var SocialAuthButtons_default = /* @__PURE__ */ defineComponent({
	__name: "SocialAuthButtons",
	props: {
		googleLabel: {},
		githubLabel: {},
		buttonClass: {},
		labelClass: {},
		disabled: {
			type: Boolean,
			default: false
		}
	},
	emits: ["google", "github"],
	setup(__props, { emit: __emit }) {
		/**
		* The two social sign-in buttons, shared so both hosts present the same
		* providers the same way. Purely presentational: labels are host-translated,
		* the look comes through `buttonClass` and `labelClass` (each host styles
		* with its own design system), and the click handling — popup, provisioning —
		* stays with the host via the emits.
		*/
		const emit = __emit;
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock(Fragment, null, [createBaseVNode("button", {
				type: "button",
				class: normalizeClass(__props.buttonClass),
				disabled: __props.disabled,
				onClick: _cache[0] || (_cache[0] = ($event) => emit("google"))
			}, [_cache[2] || (_cache[2] = createBaseVNode("svg", {
				"aria-hidden": "true",
				viewBox: "0 0 24 24",
				fill: "currentColor",
				class: "size-5 shrink-0"
			}, [createBaseVNode("path", { d: "M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" })], -1)), createBaseVNode("span", { class: normalizeClass(__props.labelClass) }, toDisplayString(__props.googleLabel), 3)], 10, _hoisted_1$1), createBaseVNode("button", {
				type: "button",
				class: normalizeClass(__props.buttonClass),
				disabled: __props.disabled,
				onClick: _cache[1] || (_cache[1] = ($event) => emit("github"))
			}, [_cache[3] || (_cache[3] = createBaseVNode("svg", {
				"aria-hidden": "true",
				viewBox: "0 0 24 24",
				fill: "currentColor",
				class: "size-5 shrink-0"
			}, [createBaseVNode("path", { d: "M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" })], -1)), createBaseVNode("span", { class: normalizeClass(__props.labelClass) }, toDisplayString(__props.githubLabel), 3)], 10, _hoisted_2)], 64);
		};
	}
});
//#endregion
//#region src/platform/cloud/onboarding/components/CloudSocialAuthButtons.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1 = {
	key: 0,
	class: "my-0 text-xs/5 text-primary-comfy-canvas/60",
	"data-testid": "google-sso-in-app-browser-notice"
};
//#endregion
//#region src/platform/cloud/onboarding/components/CloudSocialAuthButtons.vue
var CloudSocialAuthButtons_default = /* @__PURE__ */ defineComponent({
	__name: "CloudSocialAuthButtons",
	props: {
		googleLabel: {},
		githubLabel: {},
		showInAppBrowserNotice: {
			type: Boolean,
			default: false
		}
	},
	emits: ["google", "github"],
	setup(__props, { emit: __emit }) {
		const emit = __emit;
		const { t } = useI18n();
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock(Fragment, null, [createVNode(unref(SocialAuthButtons_default), {
				"google-label": __props.googleLabel,
				"github-label": __props.githubLabel,
				"button-class": unref(cn)(unref(buttonVariants)({
					variant: "brand-ghost",
					size: "brand"
				}), "w-full gap-3"),
				"label-class": "inline-block",
				onGoogle: _cache[0] || (_cache[0] = ($event) => emit("google")),
				onGithub: _cache[1] || (_cache[1] = ($event) => emit("github"))
			}, null, 8, [
				"google-label",
				"github-label",
				"button-class"
			]), __props.showInAppBrowserNotice ? (openBlock(), createElementBlock("p", _hoisted_1, toDisplayString(unref(t)("auth.login.googleSsoInAppBrowserNotice")), 1)) : createCommentVNode("", true)], 64);
		};
	}
});
//#endregion
//#region src/platform/cloud/onboarding/sso/ssoSignInState.ts
var isSsoBusy = (state) => state.phase === "checking" || state.phase === "redirecting";
function reduceSsoSignIn(state, event) {
	switch (event.type) {
		case "submitted": return isSsoBusy(state) ? state : { phase: "checking" };
		case "discovered":
			if (state.phase !== "checking") return state;
			return event.discovery.kind === "sso" ? { phase: "redirecting" } : { phase: event.discovery.kind };
		case "restored": return { phase: "idle" };
	}
}
//#endregion
//#region src/platform/cloud/onboarding/utils/previousFullPath.ts
var decodeQueryParam = (value) => {
	try {
		return decodeURIComponent(value);
	} catch {
		return null;
	}
};
var getSafePreviousFullPath = (query) => {
	const raw = query.previousFullPath;
	const value = Array.isArray(raw) ? raw[0] : raw;
	if (!value) return null;
	const decoded = decodeQueryParam(value);
	if (!decoded) return null;
	return safeInternalPath(decoded, window.location.origin, "") || null;
};
//#endregion
//#region src/platform/cloud/onboarding/composables/useSsoSignIn.ts
var SSO_DEFAULT_RETURN_TO = "/cloud/user-check";
/**
* Where SSO lands the person. A pending OAuth consent outranks
* previousFullPath, as it does after a Firebase sign-in. The callback sets the
* session cookie that the consent challenge is authenticated by, so it can land
* on the consent page directly.
*/
function resolveSsoReturnTo(route, router) {
	const oauthRequestId = captureOAuthRequestId(route.query) ?? getOAuthRequestId();
	if (oauthRequestId) return router.resolve({
		name: "cloud-oauth-consent",
		query: { oauth_request_id: oauthRequestId }
	}).href;
	return getSafePreviousFullPath(route.query) ?? SSO_DEFAULT_RETURN_TO;
}
/** SSO sign-in for the cloud auth pages, where ingest is same-origin. */
function useSsoSignIn() {
	const route = useRoute();
	const router = useRouter();
	const state = ref({ phase: "idle" });
	const dispatch = (event) => {
		state.value = reduceSsoSignIn(state.value, event);
	};
	const busy = computed(() => isSsoBusy(state.value));
	const disposal = new AbortController();
	onScopeDispose(() => disposal.abort());
	useEventListener(window, "pageshow", (event) => {
		if (event.persisted) dispatch({ type: "restored" });
	});
	/**
	* Sends an SSO email to its identity provider. True when SSO owns the
	* sign-in from here (a redirect, or a check already in flight); false means
	* the caller carries on with its own sign-in.
	*/
	async function trySso(email) {
		if (busy.value) return true;
		dispatch({ type: "submitted" });
		const discovery = await discoverSso(email, {
			fetchImpl: (input, init) => fetch(input, init),
			signal: disposal.signal
		});
		if (disposal.signal.aborted) return true;
		dispatch({
			type: "discovered",
			discovery
		});
		if (discovery.kind !== "sso") return false;
		window.location.assign(ssoStartUrl({
			email,
			returnTo: resolveSsoReturnTo(route, router),
			origin: window.location.origin
		}));
		return true;
	}
	return {
		state: readonly(state),
		busy,
		trySso
	};
}
//#endregion
//#region src/platform/cloud/oauth/useOAuthPostLoginRedirect.ts
/**
* Post-login OAuth resume. If the current login flow originated from an OAuth
* authorize request, establishes the Cloud session cookie and navigates to the
* consent route. Used by both `CloudLoginView` and `CloudSignupView`.
*/
function useOAuthPostLoginRedirect() {
	const router = useRouter();
	const sessionCookie = useSessionCookie();
	const { t } = useI18n();
	async function resumeOAuthIfNeeded(query) {
		captureOAuthRequestId(query);
		const oauthRequestId = getOAuthRequestId();
		if (!oauthRequestId) return { kind: "no-oauth" };
		try {
			await sessionCookie.createSessionOrThrow();
		} catch (error) {
			return {
				kind: "error",
				message: error instanceof Error ? error.message : t("oauth.consent.sessionError")
			};
		}
		await router.push({
			name: "cloud-oauth-consent",
			query: { oauth_request_id: oauthRequestId }
		});
		return { kind: "resumed" };
	}
	return { resumeOAuthIfNeeded };
}
//#endregion
//#region src/platform/cloud/onboarding/composables/usePostAuthRedirect.ts
/**
* Shared post-authentication redirect logic used by both CloudLoginView and
* CloudSignupView. Handles OAuth resume, previousFullPath redirect, and
* default redirect after successful sign-in or sign-up.
*/
function usePostAuthRedirect(options) {
	const { t } = useI18n();
	const router = useRouter();
	const route = useRoute();
	const toastStore = useToastStore();
	const { resumeOAuthIfNeeded } = useOAuthPostLoginRedirect();
	async function onAuthSuccess() {
		toastStore.add({
			severity: "success",
			summary: options.successSummary,
			life: 2e3
		});
		const oauthResume = await resumeOAuthIfNeeded(route.query);
		if (oauthResume.kind === "error") {
			options.authError.value = oauthResume.message;
			toastStore.add({
				severity: "error",
				summary: t("oauth.consent.sessionErrorToastSummary"),
				detail: oauthResume.message,
				life: 4e3
			});
			return;
		}
		if (oauthResume.kind === "resumed") return;
		const previousFullPath = getSafePreviousFullPath(route.query);
		if (previousFullPath) {
			await router.replace(previousFullPath);
			return;
		}
		await router.push(options.defaultRedirect());
	}
	return { onAuthSuccess };
}
//#endregion
//#region src/platform/cloud/onboarding/composables/useCloudAuthPage.ts
/**
* State shared by CloudLoginView and CloudSignupView. Sign-up passes
* `isNewUser` so the provider reports the right telemetry action; the two pages
* are otherwise identical.
*/
function useCloudAuthPage(options) {
	const route = useRoute();
	const router = useRouter();
	const { flags } = useFeatureFlags();
	const authError = ref("");
	const authMode = ref(flags.ssoEnabled && route.query.sso === SSO_ENTRY_OPEN_QUERY.sso ? "sso" : "social");
	const { onAuthSuccess: redirectAfterAuth } = usePostAuthRedirect({
		authError,
		successSummary: options.successSummary,
		defaultRedirect: options.defaultRedirect
	});
	/**
	* Firebase accepts an account an SSO organization holds; ingest refuses its
	* session. That account is signed out again and sent to SSO.
	*/
	async function onAuthSuccess() {
		if (flags.ssoEnabled && await useSessionCookie().sessionRequiresSso()) {
			const authStore = useAuthStore();
			presentSsoRequired({
				email: authStore.userEmail ?? void 0,
				returnTo: resolveSsoReturnTo(route, router)
			});
			await authStore.logout();
			return;
		}
		await redirectAfterAuth();
	}
	const social = useSocialSignIn({
		isNewUser: () => options.isNewUser,
		onSignedIn: onAuthSuccess
	});
	return {
		authError,
		authMode,
		onAuthSuccess,
		/** Snapshots, not refs: neither can change while the page is mounted. */
		isSecureContext: globalThis.isSecureContext,
		showGoogleSsoInAppBrowserNotice: isEmbeddedWebView(),
		switchToEmailForm: () => {
			authMode.value = "email";
		},
		switchToSsoForm: () => {
			authMode.value = "sso";
		},
		switchToSocialLogin: () => {
			authMode.value = "social";
		},
		signInWithGoogle: () => {
			authError.value = "";
			return social.signInWithGoogle();
		},
		signInWithGithub: () => {
			authError.value = "";
			return social.signInWithGithub();
		}
	};
}
//#endregion
export { CloudSocialAuthButtons_default as i, useSsoSignIn as n, isSsoBusy as r, useCloudAuthPage as t };
