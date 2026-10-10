import "./rolldown-runtime-xtsTai4I.js";
import { Et as withCtx, F as createBaseVNode, G as defineComponent, H as createTextVNode, I as createBlock, Jt as normalizeClass, Kt as unref, L as createCommentVNode, Lt as ref, O as Fragment, P as computed, R as createElementBlock, U as createVNode, Zt as toDisplayString, c as useRoute, lt as openBlock, ot as onMounted, t as RouterLink } from "./vendor-vue-core-C1utdb0s.js";
import { Sr as getTierCredits, or as useAuthActions } from "./layoutStore-CZsuzg91.js";
import { n as useTelemetry } from "./telemetry-IkzvF0TI.js";
import { s as remoteConfig } from "./remoteConfig-DwMQrLli.js";
import { r as useI18n } from "./vendor-i18n-BZvE7WBQ.js";
import { t as useFeatureFlags } from "./useFeatureFlags-DAoj_aDd.js";
import { r as useRegionGate, t as SignUpForm_default } from "./SignUpForm-D4VB-c6J.js";
import { t as Message_default } from "./Message-NRJmn_pf.js";
import { t as Skeleton_default } from "./Skeleton-gXY6B2Cf.js";
import { r as CLOUD_AUTH_LINK_BUTTON_CLASS, t as CLOUD_AUTH_FIELD_CLASS } from "./authClasses-B7gWibuZ.js";
import { i as CloudSocialAuthButtons_default, n as useSsoSignIn, t as useCloudAuthPage } from "./useCloudAuthPage-Cm-86BY_.js";
//#region src/platform/cloud/onboarding/composables/useFreeTierOnboarding.ts
function useFreeTierOnboarding() {
	const showEmailForm = ref(false);
	const freeTierCredits = computed(() => getTierCredits("free"));
	const isFreeTierEnabled = computed(() => remoteConfig.value.new_free_tier_subscriptions ?? false);
	function switchToEmailForm() {
		showEmailForm.value = true;
	}
	function switchToSocialLogin() {
		showEmailForm.value = false;
	}
	return {
		showEmailForm,
		freeTierCredits,
		isFreeTierEnabled,
		switchToEmailForm,
		switchToSocialLogin
	};
}
//#endregion
//#region src/platform/cloud/onboarding/CloudSignupView.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1 = { class: "flex w-full flex-col" };
var _hoisted_2 = { class: "mt-8 mb-0 text-2xl/snug font-light tracking-tighter text-primary-comfy-canvas sm:text-3xl/snug lg:text-4xl/snug xl:text-5xl/snug 2xl:text-6xl/snug" };
var _hoisted_3 = { class: "mt-8 mb-0 text-base/snug font-medium text-primary-comfy-canvas xl:text-lg/snug" };
var _hoisted_4 = { class: "mt-12 flex flex-col gap-4 xl:gap-6" };
var _hoisted_5 = {
	key: 1,
	"data-testid": "region-check-pending",
	class: "flex flex-col gap-6"
};
//#endregion
//#region src/platform/cloud/onboarding/CloudSignupView.vue
var CloudSignupView_default = /* @__PURE__ */ defineComponent({
	__name: "CloudSignupView",
	setup(__props) {
		const { t } = useI18n();
		const route = useRoute();
		const authActions = useAuthActions();
		const telemetry = useTelemetry();
		const { flags } = useFeatureFlags();
		const { trySso } = useSsoSignIn();
		const { status: regionStatus } = useRegionGate();
		const { isFreeTierEnabled } = useFreeTierOnboarding();
		const { authError, authMode, onAuthSuccess, isSecureContext, showGoogleSsoInAppBrowserNotice, switchToEmailForm, switchToSocialLogin, signInWithGoogle, signInWithGithub } = useCloudAuthPage({
			isNewUser: true,
			successSummary: "Sign up Completed",
			defaultRedirect: () => ({
				path: "/",
				query: route.query
			})
		});
		const signUpForm = ref(null);
		const signUpWithEmail = async (values, turnstileToken) => {
			authError.value = "";
			if (flags.ssoEnabled && await trySso(values.email)) return;
			if (await authActions.signUpWithEmail(values.email, values.password, turnstileToken)) await onAuthSuccess();
			else signUpForm.value?.resetTurnstile();
		};
		onMounted(() => {
			telemetry?.trackSignupOpened();
		});
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", _hoisted_1, [
				createBaseVNode("h1", _hoisted_2, toDisplayString(unref(t)("auth.signup.title")), 1),
				createBaseVNode("p", _hoisted_3, [createTextVNode(toDisplayString(unref(t)("auth.signup.alreadyHaveAccount")) + " ", 1), createVNode(unref(RouterLink), {
					to: {
						name: "cloud-login",
						query: unref(route).query
					},
					class: "text-brand-yellow no-underline transition-all duration-300 hover:underline"
				}, {
					default: withCtx(() => [createTextVNode(toDisplayString(unref(t)("auth.signup.signIn")), 1)]),
					_: 1
				}, 8, ["to"])]),
				!unref(isSecureContext) ? (openBlock(), createBlock(Message_default, {
					key: 0,
					severity: "warning",
					class: "mt-4 w-full"
				}, {
					default: withCtx(() => [createTextVNode(toDisplayString(unref(t)("auth.login.insecureContextWarning")), 1)]),
					_: 1
				})) : createCommentVNode("", true),
				createBaseVNode("div", _hoisted_4, [unref(authMode) !== "email" ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [createVNode(CloudSocialAuthButtons_default, {
					"google-label": unref(t)("auth.signup.signUpWithGoogle"),
					"github-label": unref(t)("auth.signup.signUpWithGithub"),
					"show-in-app-browser-notice": unref(showGoogleSsoInAppBrowserNotice),
					onGoogle: unref(signInWithGoogle),
					onGithub: unref(signInWithGithub)
				}, null, 8, [
					"google-label",
					"github-label",
					"show-in-app-browser-notice",
					"onGoogle",
					"onGithub"
				]), createBaseVNode("button", {
					type: "button",
					class: normalizeClass(unref(CLOUD_AUTH_LINK_BUTTON_CLASS)),
					onClick: _cache[0] || (_cache[0] = (...args) => unref(switchToEmailForm) && unref(switchToEmailForm)(...args))
				}, toDisplayString(unref(t)("auth.login.useEmailInstead")), 3)], 64)) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
					unref(isFreeTierEnabled) ? (openBlock(), createBlock(Message_default, {
						key: 0,
						severity: "warning",
						class: "w-full"
					}, {
						default: withCtx(() => [createTextVNode(toDisplayString(unref(t)("auth.signup.emailNotEligibleForFreeTier")), 1)]),
						_: 1
					})) : createCommentVNode("", true),
					unref(regionStatus) === "pending" ? (openBlock(), createElementBlock("div", _hoisted_5, [
						createVNode(Skeleton_default, { class: "h-10 w-full" }),
						createVNode(Skeleton_default, { class: "h-10 w-full" }),
						createVNode(Skeleton_default, { class: "h-10 w-full" })
					])) : unref(regionStatus) === "blocked" ? (openBlock(), createBlock(Message_default, {
						key: 2,
						severity: "warning",
						class: "w-full"
					}, {
						default: withCtx(() => [createTextVNode(toDisplayString(unref(t)("auth.signup.regionRestrictionChina")), 1)]),
						_: 1
					})) : (openBlock(), createBlock(SignUpForm_default, {
						key: 3,
						ref_key: "signUpForm",
						ref: signUpForm,
						"auth-error": unref(authError),
						"field-class": unref(CLOUD_AUTH_FIELD_CLASS),
						"submit-variant": "brand-solid",
						"submit-size": "brand",
						"submit-class": "mt-2 w-full",
						onSubmit: signUpWithEmail
					}, null, 8, ["auth-error", "field-class"])),
					createBaseVNode("button", {
						type: "button",
						class: normalizeClass(unref(CLOUD_AUTH_LINK_BUTTON_CLASS)),
						onClick: _cache[1] || (_cache[1] = (...args) => unref(switchToSocialLogin) && unref(switchToSocialLogin)(...args))
					}, toDisplayString(unref(t)("auth.login.backToSocialLogin")), 3)
				], 64))])
			]);
		};
	}
});
//#endregion
export { CloudSignupView_default as default };
