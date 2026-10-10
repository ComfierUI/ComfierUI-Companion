import "./rolldown-runtime-xtsTai4I.js";
import { _ as toTypedSchema, b as useIsFieldValid, v as Field, y as useForm } from "./vendor-other-BPEcPQTD.js";
import { $ as mergeProps, E as withModifiers, Et as withCtx, F as createBaseVNode, G as defineComponent, H as createTextVNode, I as createBlock, Jt as normalizeClass, Kt as unref, L as createCommentVNode, Lt as ref, O as Fragment, P as computed, R as createElementBlock, U as createVNode, Zt as toDisplayString, lt as openBlock, st as onUnmounted } from "./vendor-vue-core-C1utdb0s.js";
import { st as useThrottleFn } from "./vendor-vueuse-BxKIIsKg.js";
import { Q as useApiKeyAuthStore, or as useAuthActions, tt as useAuthStore } from "./layoutStore-CZsuzg91.js";
import { a as configValueOrDefault, s as remoteConfig } from "./remoteConfig-DwMQrLli.js";
import { t as useToastStore } from "./toastStore-CTfykAzG.js";
import { a as requestDesktopHostSignIn, r as isDesktopHostSessionActive } from "./desktopHostSession-IrokPizE.js";
import { r as useI18n } from "./vendor-i18n-BZvE7WBQ.js";
import { r as getComfyPlatformBaseUrl } from "./comfyApi-CYSC9hA6.js";
import { t as cn } from "./src-DI1bBfrb.js";
import { t as Button_default } from "./Button-j0oCzR82.js";
import { f as useToast } from "./vendor-primevue-C3d0HJ53.js";
import { t as Input_default } from "./Input-Cx8jjgHK.js";
import { n as FieldGroup_default, r as useRegionGate, t as SignUpForm_default } from "./SignUpForm-D4VB-c6J.js";
import { n as isEmbeddedWebView, t as useSocialSignIn } from "./useSocialSignIn-4ach6N_x.js";
import { t as Message_default } from "./Message-NRJmn_pf.js";
import { t as Skeleton_default } from "./Skeleton-gXY6B2Cf.js";
import { n as FieldError_default, r as Field_default, t as FieldLabel_default } from "./FieldLabel-4kD4Yi7G.js";
import { t as FieldDescription_default } from "./FieldDescription-B1neEBHX.js";
import { n as signInSchema, t as apiKeySchema } from "./signInSchema-COhVh-MP.js";
import { t as PasswordInput_default } from "./PasswordInput-B9my8iEe.js";
import { t as Spinner_default } from "./Spinner-B79hMIoc.js";
//#region ../../../../../../assets/images/comfy-logo-mono.svg
var comfy_logo_mono_default = "" + new URL("images/comfy-logo-mono.svg", import.meta.url).href;
//#endregion
//#region src/utils/hostWhitelist.ts
/**
* Whitelisting helper for enabling SSO on safe, local-only hosts.
*
* Built-ins (always allowed):
*   • 'localhost' and any subdomain of '.localhost' (e.g., app.localhost)
*   • IPv4 loopback 127.0.0.0/8 (e.g., 127.0.0.1, 127.1.2.3)
*   • IPv6 loopback ::1 (supports compressed/expanded textual forms)
*
* No environment variables are used. To add more exact hostnames,
* edit HOST_WHITELIST below.
*/
var HOST_WHITELIST = ["localhost"];
/** Normalize for comparison: lowercase, strip port/brackets, trim trailing dot. */
function normalizeHost(input) {
	let h = (input || "").trim().toLowerCase();
	h = h.replace(/\.$/, "");
	const mBracket = h.match(/^\[([^\]]+)\]:(\d+)$/);
	if (mBracket) h = mBracket[1];
	else {
		const mPort = h.match(/^([^:]+):(\d+)$/);
		if (mPort) h = mPort[1];
	}
	h = h.replace(/^\[|\]$/g, "");
	return h;
}
/** Public check used by the UI. */
function isHostWhitelisted(rawHost) {
	const host = normalizeHost(rawHost);
	if (isLocalhostLabel(host)) return true;
	if (isIPv4Loopback(host)) return true;
	if (isIPv6Loopback(host)) return true;
	if (isComfyOrgHost(host)) return true;
	return HOST_WHITELIST.map(normalizeHost).includes(host);
}
function isLocalhostLabel(h) {
	return h === "localhost" || h.endsWith(".localhost");
}
var IPV4_OCTET = "(?:25[0-5]|2[0-4]\\d|1\\d\\d|0?\\d?\\d)";
var V4_LOOPBACK_RE = new RegExp("^127\\." + IPV4_OCTET + "\\." + IPV4_OCTET + "\\." + IPV4_OCTET + "$");
function isIPv4Loopback(h) {
	return V4_LOOPBACK_RE.test(h);
}
var V6_FULL_LOOPBACK_RE = /^(?:0{1,4}:){7}0{0,3}1$/i;
var V6_COMPRESSED_LOOPBACK_RE = /^((?:0{1,4}(?::0{1,4}){0,6})?)::((?:0{1,4}:){0,6})0{0,3}1$/i;
function isIPv6Loopback(h) {
	if (V6_FULL_LOOPBACK_RE.test(h)) return true;
	const m = h.match(V6_COMPRESSED_LOOPBACK_RE);
	if (!m) return false;
	return (m[1] ? m[1].match(/0{1,4}:/gi)?.length ?? 0 : 0) + (m[2] ? m[2].match(/0{1,4}:/gi)?.length ?? 0 : 0) <= 6;
}
var COMFY_ORG_HOST = /\.comfy\.org$/;
function isComfyOrgHost(h) {
	return COMFY_ORG_HOST.test(h);
}
//#endregion
//#region src/components/dialog/content/signin/ApiKeyForm.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1$2 = { class: "flex flex-col gap-6" };
var _hoisted_2$1 = { class: "mb-8 flex flex-col gap-4" };
var _hoisted_3$1 = { class: "my-0 text-2xl/normal font-medium" };
var _hoisted_4$1 = { class: "my-0 text-base text-muted-foreground" };
var _hoisted_5$1 = {
	href: "https://docs.comfy.org/interface/user#logging-in-with-an-api-key",
	target: "_blank",
	class: "underline underline-offset-4 hover:text-base-foreground"
};
var _hoisted_6$1 = ["href"];
var _hoisted_7$1 = {
	href: "https://docs.comfy.org/tutorials/partner-nodes/overview#log-in-with-comfyui-account-api-key-on-non-whitelisted-websites",
	target: "_blank"
};
var _hoisted_8$1 = { class: "mt-4 flex items-center justify-between" };
//#endregion
//#region src/components/dialog/content/signin/ApiKeyForm.vue
var ApiKeyForm_default = /* @__PURE__ */ defineComponent({
	__name: "ApiKeyForm",
	emits: ["back", "success"],
	setup(__props, { emit: __emit }) {
		const authStore = useAuthStore();
		const apiKeyStore = useApiKeyAuthStore();
		const loading = computed(() => authStore.loading);
		const comfyPlatformBaseUrl = computed(() => configValueOrDefault(remoteConfig.value, "comfy_platform_base_url", getComfyPlatformBaseUrl()));
		const { t } = useI18n();
		const emit = __emit;
		const { handleSubmit } = useForm({
			validationSchema: toTypedSchema(apiKeySchema),
			initialValues: { apiKey: "" }
		});
		const onSubmit = handleSubmit(async ({ apiKey }) => {
			await apiKeyStore.storeApiKey(apiKey);
			emit("success");
		});
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", _hoisted_1$2, [createBaseVNode("div", _hoisted_2$1, [createBaseVNode("h1", _hoisted_3$1, toDisplayString(unref(t)("auth.apiKey.title")), 1), createBaseVNode("p", _hoisted_4$1, [createTextVNode(toDisplayString(unref(t)("auth.apiKey.description")) + " ", 1), createBaseVNode("a", _hoisted_5$1, toDisplayString(unref(t)("g.learnMore")), 1)])]), createBaseVNode("form", {
				class: "flex flex-col gap-6",
				onSubmit: _cache[1] || (_cache[1] = withModifiers((...args) => unref(onSubmit) && unref(onSubmit)(...args), ["prevent"]))
			}, [createVNode(unref(Field), { name: "apiKey" }, {
				default: withCtx(({ componentField, errors }) => [createVNode(Field_default, { "data-invalid": !!errors.length }, {
					default: withCtx(() => [
						createVNode(FieldLabel_default, { for: "comfy-org-api-key" }, {
							default: withCtx(() => [createTextVNode(toDisplayString(unref(t)("auth.apiKey.label")), 1)]),
							_: 1
						}),
						createVNode(Input_default, mergeProps(componentField, {
							id: "comfy-org-api-key",
							autocomplete: "off",
							type: "password",
							placeholder: unref(t)("auth.apiKey.placeholder"),
							"aria-invalid": !!errors.length
						}), null, 16, ["placeholder", "aria-invalid"]),
						createVNode(FieldDescription_default, null, {
							default: withCtx(() => [
								createTextVNode(toDisplayString(unref(t)("auth.apiKey.helpText")) + " ", 1),
								createBaseVNode("a", {
									href: `${comfyPlatformBaseUrl.value}/login`,
									target: "_blank"
								}, toDisplayString(unref(t)("auth.apiKey.generateKey")), 9, _hoisted_6$1),
								_cache[2] || (_cache[2] = createBaseVNode("span", { class: "mx-1" }, "•", -1)),
								createBaseVNode("a", _hoisted_7$1, toDisplayString(unref(t)("auth.apiKey.whitelistInfo")), 1)
							]),
							_: 1
						}),
						errors.length ? (openBlock(), createBlock(FieldError_default, {
							key: 0,
							errors
						}, null, 8, ["errors"])) : createCommentVNode("", true)
					]),
					_: 2
				}, 1032, ["data-invalid"])]),
				_: 1
			}), createBaseVNode("div", _hoisted_8$1, [createVNode(Button_default, {
				type: "button",
				variant: "textonly",
				onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("back"))
			}, {
				default: withCtx(() => [createTextVNode(toDisplayString(unref(t)("g.back")), 1)]),
				_: 1
			}), createVNode(Button_default, {
				type: "submit",
				variant: "primary",
				loading: loading.value,
				disabled: loading.value
			}, {
				default: withCtx(() => [createTextVNode(toDisplayString(unref(t)("g.save")), 1)]),
				_: 1
			}, 8, ["loading", "disabled"])])], 32)]);
		};
	}
});
//#endregion
//#region src/components/dialog/content/signin/SignInForm.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1$1 = { class: "flex items-center justify-between" };
var emailInputId = "comfy-org-sign-in-email";
//#endregion
//#region src/components/dialog/content/signin/SignInForm.vue
var SignInForm_default = /* @__PURE__ */ defineComponent({
	__name: "SignInForm",
	emits: ["submit"],
	setup(__props, { emit: __emit }) {
		const authStore = useAuthStore();
		const authActions = useAuthActions();
		const loading = computed(() => authStore.loading);
		const toast = useToast();
		const { t } = useI18n();
		const emit = __emit;
		const { handleSubmit, meta, values } = useForm({
			validationSchema: toTypedSchema(signInSchema),
			initialValues: {
				email: "",
				password: ""
			}
		});
		const isEmailValid = useIsFieldValid("email");
		const canResetPassword = computed(() => !!values.email && isEmailValid.value);
		const onSubmit = useThrottleFn(handleSubmit((formValues) => emit("submit", formValues)), 1500);
		async function handleForgotPassword() {
			const email = values.email;
			if (!email || !isEmailValid.value) {
				toast.add({
					severity: "warn",
					summary: t("auth.login.emailPlaceholder"),
					life: 5e3
				});
				document.getElementById(emailInputId)?.focus();
				return;
			}
			await authActions.sendPasswordReset(email);
		}
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("form", {
				class: "flex flex-col gap-10",
				onSubmit: _cache[0] || (_cache[0] = withModifiers((...args) => unref(onSubmit) && unref(onSubmit)(...args), ["prevent"]))
			}, [createVNode(FieldGroup_default, null, {
				default: withCtx(() => [createVNode(unref(Field), { name: "email" }, {
					default: withCtx(({ componentField, errors }) => [createVNode(Field_default, { "data-invalid": !!errors.length }, {
						default: withCtx(() => [
							createVNode(FieldLabel_default, { for: emailInputId }, {
								default: withCtx(() => [createTextVNode(toDisplayString(unref(t)("auth.login.emailLabel")), 1)]),
								_: 1
							}),
							createVNode(Input_default, mergeProps(componentField, {
								id: emailInputId,
								autocomplete: "email",
								type: "text",
								placeholder: unref(t)("auth.login.emailPlaceholder"),
								"aria-invalid": !!errors.length
							}), null, 16, ["placeholder", "aria-invalid"]),
							errors.length ? (openBlock(), createBlock(FieldError_default, {
								key: 0,
								errors
							}, null, 8, ["errors"])) : createCommentVNode("", true)
						]),
						_: 2
					}, 1032, ["data-invalid"])]),
					_: 1
				}), createVNode(unref(Field), { name: "password" }, {
					default: withCtx(({ componentField, errors }) => [createVNode(Field_default, { "data-invalid": !!errors.length }, {
						default: withCtx(() => [
							createBaseVNode("div", _hoisted_1$1, [createVNode(FieldLabel_default, { for: "comfy-org-sign-in-password" }, {
								default: withCtx(() => [createTextVNode(toDisplayString(unref(t)("auth.login.passwordLabel")), 1)]),
								_: 1
							}), createVNode(Button_default, {
								type: "button",
								variant: "link",
								size: "unset",
								class: normalizeClass(unref(cn)("p-0 select-none", !canResetPassword.value && "cursor-not-allowed opacity-50")),
								onClick: handleForgotPassword
							}, {
								default: withCtx(() => [createTextVNode(toDisplayString(unref(t)("auth.login.forgotPassword")), 1)]),
								_: 1
							}, 8, ["class"])]),
							createVNode(PasswordInput_default, mergeProps(componentField, {
								id: "comfy-org-sign-in-password",
								autocomplete: "current-password",
								placeholder: unref(t)("auth.login.passwordPlaceholder"),
								"aria-invalid": !!errors.length
							}), null, 16, ["placeholder", "aria-invalid"]),
							errors.length ? (openBlock(), createBlock(FieldError_default, {
								key: 0,
								errors
							}, null, 8, ["errors"])) : createCommentVNode("", true)
						]),
						_: 2
					}, 1032, ["data-invalid"])]),
					_: 1
				})]),
				_: 1
			}), loading.value ? (openBlock(), createBlock(Spinner_default, {
				key: 0,
				class: "mx-auto size-8"
			})) : (openBlock(), createBlock(Button_default, {
				key: 1,
				type: "submit",
				class: "h-10 font-medium",
				disabled: !unref(meta).valid
			}, {
				default: withCtx(() => [createTextVNode(toDisplayString(unref(t)("auth.login.loginButton")), 1)]),
				_: 1
			}, 8, ["disabled"]))], 32);
		};
	}
});
//#endregion
//#region src/components/dialog/content/SignInContent.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1 = { class: "w-96 overflow-x-hidden p-2" };
var _hoisted_2 = { class: "mb-8 flex flex-col gap-4" };
var _hoisted_3 = { class: "my-0 text-2xl/normal font-medium" };
var _hoisted_4 = { class: "my-0 text-base" };
var _hoisted_5 = { class: "text-muted" };
var _hoisted_6 = {
	key: 0,
	"data-testid": "region-check-pending",
	class: "flex flex-col gap-6"
};
var _hoisted_7 = { class: "my-8 flex items-center gap-3" };
var _hoisted_8 = { class: "shrink-0 text-muted" };
var _hoisted_9 = { class: "flex flex-col gap-6" };
var _hoisted_10 = {
	key: 0,
	class: "my-0 text-xs text-muted",
	"data-testid": "google-sso-in-app-browser-notice"
};
var _hoisted_11 = ["alt"];
var _hoisted_12 = { class: "text-center text-muted" };
var _hoisted_13 = ["href"];
var _hoisted_14 = { class: "mt-8 text-xs text-muted" };
var _hoisted_15 = {
	href: "https://comfy.org/terms-of-service/",
	target: "_blank",
	class: "cursor-pointer text-blue-500"
};
var _hoisted_16 = {
	href: "https://comfy.org/privacy-policy/",
	target: "_blank",
	class: "cursor-pointer text-blue-500"
};
//#endregion
//#region src/components/dialog/content/SignInContent.vue
var SignInContent_default = /* @__PURE__ */ defineComponent({
	__name: "SignInContent",
	props: { onSuccess: { type: Function } },
	setup(__props) {
		const { t } = useI18n();
		const authActions = useAuthActions();
		const isSecureContext = window.isSecureContext;
		const isSignIn = ref(true);
		const showApiKeyForm = ref(false);
		const ssoAllowed = isHostWhitelisted(normalizeHost(window.location.hostname));
		const showGoogleSsoInAppBrowserNotice = isEmbeddedWebView();
		const desktopHostSso = isDesktopHostSessionActive();
		const signInWithDesktopHost = async () => {
			const toastStore = useToastStore();
			toastStore.add({
				severity: "info",
				summary: t("auth.desktopHost.continueInBrowser"),
				life: 6e3
			});
			if (await requestDesktopHostSignIn()) {
				__props.onSuccess();
				return;
			}
			toastStore.add({
				severity: "error",
				summary: t("auth.desktopHost.signInFailed"),
				life: 6e3
			});
		};
		const comfyPlatformBaseUrl = computed(() => configValueOrDefault(remoteConfig.value, "comfy_platform_base_url", getComfyPlatformBaseUrl()));
		const toggleState = () => {
			isSignIn.value = !isSignIn.value;
			showApiKeyForm.value = false;
		};
		const { signInWithGoogle, signInWithGithub } = useSocialSignIn({
			isNewUser: () => !isSignIn.value,
			onSignedIn: __props.onSuccess
		});
		const signInWithEmail = async (values) => {
			if (await authActions.signInWithEmail(values.email, values.password)) __props.onSuccess();
		};
		const signUpForm = ref(null);
		const signUpWithEmail = async (values, turnstileToken) => {
			if (await authActions.signUpWithEmail(values.email, values.password, turnstileToken)) __props.onSuccess();
			else signUpForm.value?.resetTurnstile();
		};
		const { status: regionStatus } = useRegionGate();
		onUnmounted(() => {
			authActions.accessError.value = false;
		});
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", _hoisted_1, [showApiKeyForm.value ? (openBlock(), createBlock(ApiKeyForm_default, {
				key: 0,
				onBack: _cache[0] || (_cache[0] = ($event) => showApiKeyForm.value = false),
				onSuccess: __props.onSuccess
			}, null, 8, ["onSuccess"])) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
				createBaseVNode("div", _hoisted_2, [createBaseVNode("h1", _hoisted_3, toDisplayString(isSignIn.value ? unref(t)("auth.login.title") : unref(t)("auth.signup.title")), 1), createBaseVNode("p", _hoisted_4, [createBaseVNode("span", _hoisted_5, toDisplayString(isSignIn.value ? unref(t)("auth.login.newUser") : unref(t)("auth.signup.alreadyHaveAccount")), 1), createBaseVNode("span", {
					class: "ml-1 cursor-pointer text-blue-500",
					onClick: toggleState
				}, toDisplayString(isSignIn.value ? unref(t)("auth.login.signUp") : unref(t)("auth.signup.signIn")), 1)])]),
				!unref(isSecureContext) ? (openBlock(), createBlock(Message_default, {
					key: 0,
					severity: "warning",
					class: "mb-4"
				}, {
					default: withCtx(() => [createTextVNode(toDisplayString(unref(t)("auth.login.insecureContextWarning")), 1)]),
					_: 1
				})) : createCommentVNode("", true),
				isSignIn.value ? (openBlock(), createBlock(SignInForm_default, {
					key: 1,
					onSubmit: signInWithEmail
				})) : (openBlock(), createElementBlock(Fragment, { key: 2 }, [unref(regionStatus) === "pending" ? (openBlock(), createElementBlock("div", _hoisted_6, [
					createVNode(Skeleton_default, { class: "h-10 w-full" }),
					createVNode(Skeleton_default, { class: "h-10 w-full" }),
					createVNode(Skeleton_default, { class: "h-10 w-full" })
				])) : unref(regionStatus) === "blocked" ? (openBlock(), createBlock(Message_default, {
					key: 1,
					severity: "warning",
					class: "mb-4"
				}, {
					default: withCtx(() => [createTextVNode(toDisplayString(unref(t)("auth.signup.regionRestrictionChina")), 1)]),
					_: 1
				})) : (openBlock(), createBlock(SignUpForm_default, {
					key: 2,
					ref_key: "signUpForm",
					ref: signUpForm,
					onSubmit: signUpWithEmail
				}, null, 512))], 64)),
				createBaseVNode("div", _hoisted_7, [
					_cache[3] || (_cache[3] = createBaseVNode("div", { class: "grow border-t border-interface-stroke" }, null, -1)),
					createBaseVNode("span", _hoisted_8, toDisplayString(unref(t)("auth.login.orContinueWith")), 1),
					_cache[4] || (_cache[4] = createBaseVNode("div", { class: "grow border-t border-interface-stroke" }, null, -1))
				]),
				createBaseVNode("div", _hoisted_9, [
					unref(desktopHostSso) ? (openBlock(), createBlock(Button_default, {
						key: 0,
						type: "button",
						class: "h-10",
						variant: "secondary",
						"data-testid": "desktop-host-sso",
						onClick: signInWithDesktopHost
					}, {
						default: withCtx(() => [_cache[5] || (_cache[5] = createBaseVNode("i", {
							class: "mr-2 icon-[lucide--building-2] size-5",
							"aria-hidden": "true"
						}, null, -1)), createTextVNode(" " + toDisplayString(unref(t)("auth.sso.continueWithSso")), 1)]),
						_: 1
					})) : createCommentVNode("", true),
					unref(ssoAllowed) ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
						createVNode(Button_default, {
							type: "button",
							class: "h-10",
							variant: "secondary",
							onClick: unref(signInWithGoogle)
						}, {
							default: withCtx(() => [_cache[6] || (_cache[6] = createBaseVNode("i", { class: "pi pi-google mr-2" }, null, -1)), createTextVNode(" " + toDisplayString(isSignIn.value ? unref(t)("auth.login.loginWithGoogle") : unref(t)("auth.signup.signUpWithGoogle")), 1)]),
							_: 1
						}, 8, ["onClick"]),
						createVNode(Button_default, {
							type: "button",
							class: "h-10",
							variant: "secondary",
							onClick: unref(signInWithGithub)
						}, {
							default: withCtx(() => [_cache[7] || (_cache[7] = createBaseVNode("i", { class: "pi pi-github mr-2" }, null, -1)), createTextVNode(" " + toDisplayString(isSignIn.value ? unref(t)("auth.login.loginWithGithub") : unref(t)("auth.signup.signUpWithGithub")), 1)]),
							_: 1
						}, 8, ["onClick"]),
						unref(showGoogleSsoInAppBrowserNotice) ? (openBlock(), createElementBlock("p", _hoisted_10, toDisplayString(unref(t)("auth.login.googleSsoInAppBrowserNotice")), 1)) : createCommentVNode("", true)
					], 64)) : createCommentVNode("", true),
					!unref(false) ? (openBlock(), createElementBlock(Fragment, { key: 2 }, [createVNode(Button_default, {
						type: "button",
						class: "h-10",
						variant: "secondary",
						onClick: _cache[1] || (_cache[1] = ($event) => showApiKeyForm.value = true)
					}, {
						default: withCtx(() => [createBaseVNode("img", {
							src: comfy_logo_mono_default,
							class: "mr-2 size-5",
							alt: _ctx.$t("g.comfy")
						}, null, 8, _hoisted_11), createTextVNode(" " + toDisplayString(unref(t)("auth.login.useApiKey")), 1)]),
						_: 1
					}), createBaseVNode("small", _hoisted_12, [createTextVNode(toDisplayString(unref(t)("auth.apiKey.helpText")) + " ", 1), createBaseVNode("a", {
						href: `${comfyPlatformBaseUrl.value}/login`,
						target: "_blank",
						class: "cursor-pointer text-blue-500"
					}, toDisplayString(unref(t)("auth.apiKey.generateKey")), 9, _hoisted_13)])], 64)) : createCommentVNode("", true),
					createVNode(Message_default, {
						visible: unref(authActions).accessError.value,
						"onUpdate:visible": _cache[2] || (_cache[2] = ($event) => unref(authActions).accessError.value = $event),
						severity: "info",
						closable: ""
					}, {
						icon: withCtx(() => [..._cache[8] || (_cache[8] = [createBaseVNode("i", { class: "pi pi-info-circle" }, null, -1)])]),
						default: withCtx(() => [createTextVNode(" " + toDisplayString(unref(t)("toastMessages.useApiKeyTip")), 1)]),
						_: 1
					}, 8, ["visible"])
				]),
				createBaseVNode("p", _hoisted_14, [
					createTextVNode(toDisplayString(unref(t)("auth.login.termsText")) + " ", 1),
					createBaseVNode("a", _hoisted_15, toDisplayString(unref(t)("auth.login.termsLink")), 1),
					createTextVNode(" " + toDisplayString(unref(t)("auth.login.andText")) + " ", 1),
					createBaseVNode("a", _hoisted_16, toDisplayString(unref(t)("auth.login.privacyLink")), 1),
					createTextVNode(". " + toDisplayString(unref(t)("auth.login.questionsContactPrefix")) + " ", 1),
					_cache[9] || (_cache[9] = createBaseVNode("a", {
						href: "mailto:hello@comfy.org",
						class: "cursor-pointer text-blue-500"
					}, " hello@comfy.org", -1)),
					_cache[10] || (_cache[10] = createTextVNode(". ", -1))
				])
			], 64))]);
		};
	}
});
//#endregion
export { SignInContent_default as default };
