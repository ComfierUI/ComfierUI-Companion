import "./rolldown-runtime-xtsTai4I.js";
import { _ as toTypedSchema, v as Field, y as useForm } from "./vendor-other-BPEcPQTD.js";
import { $ as mergeProps, E as withModifiers, Et as withCtx, F as createBaseVNode, G as defineComponent, H as createTextVNode, I as createBlock, Jt as normalizeClass, Kt as unref, L as createCommentVNode, Lt as ref, O as Fragment, P as computed, R as createElementBlock, U as createVNode, Zt as toDisplayString, c as useRoute, lt as openBlock, pt as resolveComponent, t as RouterLink } from "./vendor-vue-core-C1utdb0s.js";
import { _u as readSsoHint, or as useAuthActions, tt as useAuthStore } from "./layoutStore-CZsuzg91.js";
import { s as remoteConfig } from "./remoteConfig-DwMQrLli.js";
import { r as useI18n } from "./vendor-i18n-BZvE7WBQ.js";
import { t as useFeatureFlags } from "./useFeatureFlags-DAoj_aDd.js";
import { r as readSsoError } from "./ssoEntryQuery-MCHmpE9w.js";
import { t as Button_default } from "./Button-j0oCzR82.js";
import { t as Input_default } from "./Input-Cx8jjgHK.js";
import { t as Message_default } from "./Message-NRJmn_pf.js";
import { n as FieldError_default, r as Field_default, t as FieldLabel_default } from "./FieldLabel-4kD4Yi7G.js";
import { n as signInSchema } from "./signInSchema-COhVh-MP.js";
import { t as PasswordInput_default } from "./PasswordInput-B9my8iEe.js";
import { n as CLOUD_AUTH_LABEL_CLASS, r as CLOUD_AUTH_LINK_BUTTON_CLASS, t as CLOUD_AUTH_FIELD_CLASS } from "./authClasses-B7gWibuZ.js";
import { i as CloudSocialAuthButtons_default, n as useSsoSignIn, r as isSsoBusy, t as useCloudAuthPage } from "./useCloudAuthPage-Cm-86BY_.js";
//#region src/platform/cloud/onboarding/components/CloudSignInForm.vue?vue&type=script&setup=true&lang.ts
var emailInputId$1 = "cloud-sign-in-email";
//#endregion
//#region src/platform/cloud/onboarding/components/CloudSignInForm.vue
var CloudSignInForm_default = /* @__PURE__ */ defineComponent({
	__name: "CloudSignInForm",
	props: {
		authError: {},
		busy: {
			type: Boolean,
			default: false
		}
	},
	emits: ["submit"],
	setup(__props, { emit: __emit }) {
		const authStore = useAuthStore();
		const loading = computed(() => authStore.loading);
		const { t } = useI18n();
		const emit = __emit;
		const { handleSubmit, meta } = useForm({
			validationSchema: toTypedSchema(signInSchema),
			initialValues: {
				email: "",
				password: ""
			}
		});
		const onSubmit = handleSubmit((values) => emit("submit", values));
		return (_ctx, _cache) => {
			const _component_router_link = resolveComponent("router-link");
			return openBlock(), createElementBlock("form", {
				class: "flex flex-col gap-6",
				onSubmit: _cache[0] || (_cache[0] = withModifiers((...args) => unref(onSubmit) && unref(onSubmit)(...args), ["prevent"]))
			}, [
				createVNode(unref(Field), { name: "email" }, {
					default: withCtx(({ componentField, errors }) => [createVNode(Field_default, { "data-invalid": !!errors.length }, {
						default: withCtx(() => [
							createVNode(FieldLabel_default, {
								for: emailInputId$1,
								class: normalizeClass(unref(CLOUD_AUTH_LABEL_CLASS))
							}, {
								default: withCtx(() => [createTextVNode(toDisplayString(unref(t)("auth.login.emailLabel")), 1)]),
								_: 1
							}, 8, ["class"]),
							createVNode(Input_default, mergeProps(componentField, {
								id: emailInputId$1,
								autocomplete: "email",
								class: unref(CLOUD_AUTH_FIELD_CLASS),
								type: "text",
								placeholder: unref(t)("auth.login.emailPlaceholder"),
								"aria-invalid": !!errors.length
							}), null, 16, [
								"class",
								"placeholder",
								"aria-invalid"
							]),
							errors.length ? (openBlock(), createBlock(FieldError_default, {
								key: 0,
								errors
							}, null, 8, ["errors"])) : createCommentVNode("", true)
						]),
						_: 2
					}, 1032, ["data-invalid"])]),
					_: 1
				}),
				createVNode(unref(Field), { name: "password" }, {
					default: withCtx(({ componentField, errors }) => [createVNode(Field_default, { "data-invalid": !!errors.length }, {
						default: withCtx(() => [
							createVNode(FieldLabel_default, {
								for: "cloud-sign-in-password",
								class: normalizeClass(unref(CLOUD_AUTH_LABEL_CLASS))
							}, {
								default: withCtx(() => [createTextVNode(toDisplayString(unref(t)("auth.login.passwordLabel")), 1)]),
								_: 1
							}, 8, ["class"]),
							createVNode(PasswordInput_default, mergeProps(componentField, {
								id: "cloud-sign-in-password",
								autocomplete: "current-password",
								placeholder: unref(t)("auth.login.passwordPlaceholder"),
								class: unref(CLOUD_AUTH_FIELD_CLASS),
								"aria-invalid": !!errors.length
							}), null, 16, [
								"placeholder",
								"class",
								"aria-invalid"
							]),
							errors.length ? (openBlock(), createBlock(FieldError_default, {
								key: 0,
								errors
							}, null, 8, ["errors"])) : createCommentVNode("", true),
							createVNode(_component_router_link, {
								to: { name: "cloud-forgot-password" },
								class: "mt-1 self-start text-sm text-primary-comfy-canvas/70 underline"
							}, {
								default: withCtx(() => [createTextVNode(toDisplayString(unref(t)("auth.login.forgotPassword")), 1)]),
								_: 1
							})
						]),
						_: 2
					}, 1032, ["data-invalid"])]),
					_: 1
				}),
				__props.authError ? (openBlock(), createBlock(Message_default, {
					key: 0,
					severity: "error"
				}, {
					default: withCtx(() => [createTextVNode(toDisplayString(__props.authError), 1)]),
					_: 1
				})) : createCommentVNode("", true),
				createVNode(Button_default, {
					type: "submit",
					variant: "brand-solid",
					size: "brand",
					class: "mt-2 w-full",
					loading: loading.value || __props.busy,
					disabled: !unref(meta).valid
				}, {
					default: withCtx(() => [createTextVNode(toDisplayString(unref(t)("auth.login.loginButton")), 1)]),
					_: 1
				}, 8, ["loading", "disabled"])
			], 32);
		};
	}
});
//#endregion
//#region src/platform/cloud/onboarding/components/CloudSsoSignIn.vue?vue&type=script&setup=true&lang.ts
var emailInputId = "cloud-sso-email";
//#endregion
//#region src/platform/cloud/onboarding/components/CloudSsoSignIn.vue
var CloudSsoSignIn_default = /* @__PURE__ */ defineComponent({
	__name: "CloudSsoSignIn",
	props: { state: {} },
	emits: ["submit"],
	setup(__props, { emit: __emit }) {
		const FEEDBACK = {
			"not-sso": {
				key: "auth.sso.notSso",
				severity: "info"
			},
			"invalid-email": {
				key: "auth.sso.invalidEmail",
				severity: "error"
			},
			unavailable: {
				key: "auth.sso.unavailable",
				severity: "error"
			}
		};
		const emit = __emit;
		const { t } = useI18n();
		const busy = computed(() => isSsoBusy(__props.state));
		const email = ref(readSsoHint()?.email ?? "");
		const feedback = computed(() => FEEDBACK[__props.state.phase]);
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("form", {
				class: "flex flex-col gap-4",
				novalidate: "",
				onSubmit: _cache[1] || (_cache[1] = withModifiers(($event) => emit("submit", email.value), ["prevent"]))
			}, [
				createBaseVNode("label", {
					for: emailInputId,
					class: normalizeClass(unref(CLOUD_AUTH_LABEL_CLASS))
				}, toDisplayString(unref(t)("auth.sso.emailLabel")), 3),
				createVNode(Input_default, {
					id: emailInputId,
					modelValue: email.value,
					"onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => email.value = $event),
					type: "email",
					autocomplete: "email",
					placeholder: unref(t)("auth.sso.emailPlaceholder"),
					class: normalizeClass(unref(CLOUD_AUTH_FIELD_CLASS))
				}, null, 8, [
					"modelValue",
					"placeholder",
					"class"
				]),
				feedback.value ? (openBlock(), createBlock(Message_default, {
					key: 0,
					severity: feedback.value.severity
				}, {
					default: withCtx(() => [createTextVNode(toDisplayString(unref(t)(feedback.value.key)), 1)]),
					_: 1
				}, 8, ["severity"])) : createCommentVNode("", true),
				createVNode(Button_default, {
					type: "submit",
					variant: "brand-solid",
					size: "brand",
					class: "w-full",
					loading: busy.value,
					disabled: !email.value.trim()
				}, {
					default: withCtx(() => [createTextVNode(toDisplayString(unref(t)("auth.sso.submit")), 1)]),
					_: 1
				}, 8, ["loading", "disabled"])
			], 32);
		};
	}
});
//#endregion
//#region src/platform/cloud/onboarding/sso/ssoErrorMessages.ts
var SSO_ERROR_MESSAGE_KEY = {
	SSO_UNAVAILABLE: "auth.sso.errors.unavailable",
	SSO_LINK_CHECK_FAILED: "auth.sso.errors.unavailable",
	SSO_CONFIRM_EXPIRED: "auth.sso.errors.expired",
	SSO_EMAIL_DOMAIN_NOT_ALLOWED: "auth.sso.errors.emailDomainNotAllowed",
	SSO_INVALID_STATE: "auth.sso.errors.expired",
	SSO_NOT_CONFIGURED: "auth.sso.errors.notConfigured",
	SSO_ORG_DISABLED: "auth.sso.errors.orgDisabled",
	SSO_ORG_NOT_ATTACHED: "auth.sso.errors.orgNotAttached",
	SSO_ORG_MISMATCH: "auth.sso.errors.orgMismatch",
	SSO_USER_SUSPENDED: "auth.sso.errors.suspended",
	SSO_ACCOUNT_DELETED: "auth.sso.errors.accountDeleted",
	SSO_ACCOUNT_CONFLICT: "auth.sso.errors.accountConflict",
	SSO_IDP_ERROR: "auth.sso.errors.idpError",
	RATE_LIMITED: "auth.sso.errors.rateLimited",
	SSO_EXCHANGE_FAILED: "auth.sso.errors.failed",
	SSO_SIGN_IN_FAILED: "auth.sso.errors.failed",
	SESSION_CREATION_FAILED: "auth.sso.errors.failed",
	INTERNAL_ERROR: "auth.sso.errors.failed"
};
//#endregion
//#region src/platform/cloud/onboarding/CloudLoginView.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1 = { class: "flex w-full flex-col" };
var _hoisted_2 = { class: "mt-8 mb-0 text-2xl/snug font-light tracking-tighter text-primary-comfy-canvas sm:text-3xl/snug lg:text-4xl/snug xl:text-5xl/snug 2xl:text-6xl/snug" };
var _hoisted_3 = { class: "mt-8 mb-0 text-base/snug font-medium text-primary-comfy-canvas xl:text-lg/snug" };
var _hoisted_4 = { key: 0 };
var _hoisted_5 = { class: "mt-12 flex flex-col gap-4 xl:gap-6" };
//#endregion
//#region src/platform/cloud/onboarding/CloudLoginView.vue
var CloudLoginView_default = /* @__PURE__ */ defineComponent({
	__name: "CloudLoginView",
	setup(__props) {
		const { t } = useI18n();
		const route = useRoute();
		const authActions = useAuthActions();
		const { flags } = useFeatureFlags();
		const { state: ssoState, busy: ssoBusy, trySso } = useSsoSignIn();
		const freeRunsSuffix = computed(() => {
			const offer = remoteConfig.value.free_tier_offer;
			if (!offer) return null;
			const key = offer.requires_google_sign_in ? "auth.login.freeRunsSuffixGoogle" : "auth.login.freeRunsSuffix";
			return t(key, { count: offer.job_allowance });
		});
		const { authError, authMode, onAuthSuccess, isSecureContext, showGoogleSsoInAppBrowserNotice, switchToEmailForm, switchToSsoForm, switchToSocialLogin, signInWithGoogle, signInWithGithub } = useCloudAuthPage({
			successSummary: "Login Completed",
			defaultRedirect: () => ({ name: "cloud-user-check" })
		});
		const ssoErrorKey = computed(() => {
			if (!flags.ssoEnabled) return void 0;
			const code = readSsoError(route.query.sso_error);
			return code && SSO_ERROR_MESSAGE_KEY[code];
		});
		const signInWithEmail = async (values) => {
			authError.value = "";
			if (flags.ssoEnabled && await trySso(values.email)) return;
			if (await authActions.signInWithEmail(values.email, values.password)) await onAuthSuccess();
		};
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", _hoisted_1, [
				createBaseVNode("h1", _hoisted_2, toDisplayString(unref(t)("auth.login.title")), 1),
				createBaseVNode("p", _hoisted_3, [
					createTextVNode(toDisplayString(unref(t)("auth.login.cloudNewUser")) + " ", 1),
					createVNode(unref(RouterLink), {
						to: {
							name: "cloud-signup",
							query: unref(route).query
						},
						class: "text-brand-yellow no-underline transition-all duration-300 hover:underline"
					}, {
						default: withCtx(() => [createTextVNode(toDisplayString(unref(t)("auth.login.cloudSignUp")), 1)]),
						_: 1
					}, 8, ["to"]),
					freeRunsSuffix.value ? (openBlock(), createElementBlock("span", _hoisted_4, toDisplayString(" " + freeRunsSuffix.value), 1)) : createCommentVNode("", true)
				]),
				!unref(isSecureContext) ? (openBlock(), createBlock(Message_default, {
					key: 0,
					severity: "warning",
					class: "mt-4 w-full"
				}, {
					default: withCtx(() => [createTextVNode(toDisplayString(unref(t)("auth.login.insecureContextWarning")), 1)]),
					_: 1
				})) : createCommentVNode("", true),
				ssoErrorKey.value ? (openBlock(), createBlock(Message_default, {
					key: 1,
					severity: "error",
					class: "mt-4 w-full"
				}, {
					default: withCtx(() => [createTextVNode(toDisplayString(unref(t)(ssoErrorKey.value)), 1)]),
					_: 1
				})) : createCommentVNode("", true),
				createBaseVNode("div", _hoisted_5, [unref(authMode) !== "email" ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
					createVNode(CloudSocialAuthButtons_default, {
						"google-label": unref(t)("auth.login.loginWithGoogle"),
						"github-label": unref(t)("auth.login.loginWithGithub"),
						"show-in-app-browser-notice": unref(showGoogleSsoInAppBrowserNotice),
						onGoogle: unref(signInWithGoogle),
						onGithub: unref(signInWithGithub)
					}, null, 8, [
						"google-label",
						"github-label",
						"show-in-app-browser-notice",
						"onGoogle",
						"onGithub"
					]),
					unref(flags).ssoEnabled ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [unref(authMode) === "sso" ? (openBlock(), createBlock(CloudSsoSignIn_default, {
						key: 0,
						state: unref(ssoState),
						onSubmit: unref(trySso)
					}, null, 8, ["state", "onSubmit"])) : (openBlock(), createBlock(Button_default, {
						key: 1,
						type: "button",
						variant: "brand-ghost",
						size: "brand",
						class: "w-full gap-3",
						onClick: unref(switchToSsoForm)
					}, {
						default: withCtx(() => [_cache[2] || (_cache[2] = createBaseVNode("i", {
							class: "icon-[lucide--building-2] size-5",
							"aria-hidden": "true"
						}, null, -1)), createTextVNode(" " + toDisplayString(unref(t)("auth.sso.continueWithSso")), 1)]),
						_: 1
					}, 8, ["onClick"]))], 64)) : createCommentVNode("", true),
					createBaseVNode("button", {
						type: "button",
						class: normalizeClass(unref(CLOUD_AUTH_LINK_BUTTON_CLASS)),
						onClick: _cache[0] || (_cache[0] = (...args) => unref(switchToEmailForm) && unref(switchToEmailForm)(...args))
					}, toDisplayString(unref(t)("auth.login.useEmailInstead")), 3)
				], 64)) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [createVNode(CloudSignInForm_default, {
					"auth-error": unref(authError),
					busy: unref(ssoBusy),
					onSubmit: signInWithEmail
				}, null, 8, ["auth-error", "busy"]), createBaseVNode("button", {
					type: "button",
					class: normalizeClass(unref(CLOUD_AUTH_LINK_BUTTON_CLASS)),
					onClick: _cache[1] || (_cache[1] = (...args) => unref(switchToSocialLogin) && unref(switchToSocialLogin)(...args))
				}, toDisplayString(unref(t)("auth.login.backToSocialLogin")), 3)], 64))])
			]);
		};
	}
});
//#endregion
export { CloudLoginView_default as default };
