import "./rolldown-runtime-xtsTai4I.js";
import { E as withModifiers, Et as withCtx, F as createBaseVNode, G as defineComponent, H as createTextVNode, I as createBlock, Jt as normalizeClass, Kt as unref, L as createCommentVNode, Lt as ref, R as createElementBlock, U as createVNode, Zt as toDisplayString, l as useRouter, lt as openBlock, st as onUnmounted } from "./vendor-vue-core-C1utdb0s.js";
import { or as useAuthActions } from "./layoutStore-CZsuzg91.js";
import { r as useI18n } from "./vendor-i18n-BZvE7WBQ.js";
import { t as Button_default } from "./Button-j0oCzR82.js";
import { t as Input_default } from "./Input-Cx8jjgHK.js";
import { t as Message_default } from "./Message-NRJmn_pf.js";
import { n as FieldError_default, r as Field_default, t as FieldLabel_default } from "./FieldLabel-4kD4Yi7G.js";
import { n as CLOUD_AUTH_LABEL_CLASS, r as CLOUD_AUTH_LINK_BUTTON_CLASS, t as CLOUD_AUTH_FIELD_CLASS } from "./authClasses-B7gWibuZ.js";
//#region src/platform/cloud/onboarding/CloudForgotPasswordView.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1 = { class: "flex w-full flex-col" };
var _hoisted_2 = { class: "mt-8 mb-0 text-2xl/snug font-light tracking-tighter text-primary-comfy-canvas sm:text-3xl/snug lg:text-4xl/snug xl:text-5xl/snug 2xl:text-6xl/snug" };
var _hoisted_3 = { class: "mt-12 mb-0 text-base/snug font-medium text-primary-comfy-canvas xl:text-lg/snug" };
var _hoisted_4 = { class: "mt-5 mb-8 text-sm text-primary-comfy-canvas/70" };
//#endregion
//#region src/platform/cloud/onboarding/CloudForgotPasswordView.vue
var CloudForgotPasswordView_default = /* @__PURE__ */ defineComponent({
	__name: "CloudForgotPasswordView",
	setup(__props) {
		const { t } = useI18n();
		const router = useRouter();
		const authActions = useAuthActions();
		const email = ref("");
		const loading = ref(false);
		const errorMessage = ref("");
		const successMessage = ref("");
		let redirectTimer;
		const navigateToLogin = () => {
			router.push({ name: "cloud-login" });
		};
		const handleSubmit = async () => {
			if (!email.value) {
				errorMessage.value = t("cloudForgotPassword_emailRequired");
				return;
			}
			loading.value = true;
			errorMessage.value = "";
			successMessage.value = "";
			const sent = await authActions.sendPasswordReset(email.value);
			loading.value = false;
			if (!sent) {
				errorMessage.value = t("cloudForgotPassword_passwordResetError");
				return;
			}
			successMessage.value = t("cloudForgotPassword_passwordResetSent");
			redirectTimer = setTimeout(navigateToLogin, 3e3);
		};
		onUnmounted(() => clearTimeout(redirectTimer));
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", _hoisted_1, [
				createBaseVNode("h1", _hoisted_2, toDisplayString(unref(t)("cloudForgotPassword_title")), 1),
				createBaseVNode("p", _hoisted_3, toDisplayString(unref(t)("cloudForgotPassword_instructions")), 1),
				createBaseVNode("form", {
					class: "mt-16 flex flex-col gap-4 xl:gap-6",
					onSubmit: withModifiers(handleSubmit, ["prevent"])
				}, [
					createVNode(Field_default, { "data-invalid": !!errorMessage.value }, {
						default: withCtx(() => [
							createVNode(FieldLabel_default, {
								for: "reset-email",
								class: normalizeClass(unref(CLOUD_AUTH_LABEL_CLASS))
							}, {
								default: withCtx(() => [createTextVNode(toDisplayString(unref(t)("cloudForgotPassword_emailLabel")), 1)]),
								_: 1
							}, 8, ["class"]),
							createVNode(Input_default, {
								id: "reset-email",
								modelValue: email.value,
								"onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => email.value = $event),
								type: "email",
								placeholder: unref(t)("cloudForgotPassword_emailPlaceholder"),
								class: normalizeClass(unref(CLOUD_AUTH_FIELD_CLASS)),
								"aria-invalid": !!errorMessage.value,
								autocomplete: "email",
								required: ""
							}, null, 8, [
								"modelValue",
								"placeholder",
								"class",
								"aria-invalid"
							]),
							errorMessage.value ? (openBlock(), createBlock(FieldError_default, { key: 0 }, {
								default: withCtx(() => [createTextVNode(toDisplayString(errorMessage.value), 1)]),
								_: 1
							})) : createCommentVNode("", true)
						]),
						_: 1
					}, 8, ["data-invalid"]),
					successMessage.value ? (openBlock(), createBlock(Message_default, {
						key: 0,
						severity: "success"
					}, {
						default: withCtx(() => [createTextVNode(toDisplayString(successMessage.value), 1)]),
						_: 1
					})) : createCommentVNode("", true),
					createVNode(Button_default, {
						type: "submit",
						variant: "brand-solid",
						size: "brand",
						class: "mt-2 w-full",
						loading: loading.value,
						disabled: !email.value || loading.value
					}, {
						default: withCtx(() => [createTextVNode(toDisplayString(unref(t)("cloudForgotPassword_sendResetLink")), 1)]),
						_: 1
					}, 8, ["loading", "disabled"]),
					createBaseVNode("button", {
						type: "button",
						class: normalizeClass(unref(CLOUD_AUTH_LINK_BUTTON_CLASS)),
						onClick: navigateToLogin
					}, toDisplayString(unref(t)("cloudForgotPassword_backToLogin")), 3)
				], 32),
				createBaseVNode("p", _hoisted_4, toDisplayString(unref(t)("cloudForgotPassword_didntReceiveEmail")), 1)
			]);
		};
	}
});
//#endregion
export { CloudForgotPasswordView_default as default };
