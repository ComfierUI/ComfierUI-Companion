import "./rolldown-runtime-xtsTai4I.js";
import { v as Field } from "./vendor-other-BPEcPQTD.js";
import { $ as mergeProps, Et as withCtx, F as createBaseVNode, G as defineComponent, H as createTextVNode, I as createBlock, Jt as normalizeClass, Kt as unref, L as createCommentVNode, O as Fragment, P as computed, R as createElementBlock, U as createVNode, Zt as toDisplayString, lt as openBlock, xt as useTemplateRef } from "./vendor-vue-core-C1utdb0s.js";
import { C as useFocusWithin } from "./vendor-vueuse-BxKIIsKg.js";
import { r as useI18n } from "./vendor-i18n-BZvE7WBQ.js";
import { n as FieldError_default, r as Field_default, t as FieldLabel_default } from "./FieldLabel-4kD4Yi7G.js";
import { a as passwordRuleChecks } from "./signInSchema-COhVh-MP.js";
import { t as PasswordInput_default } from "./PasswordInput-B9my8iEe.js";
//#endregion
//#region packages/account-ui/src/auth/PasswordRules.vue
var PasswordRules_default = /* @__PURE__ */ defineComponent({
	__name: "PasswordRules",
	props: {
		password: {},
		copy: {},
		rootClass: {},
		listClass: {},
		unmetClass: {}
	},
	setup(__props) {
		/**
		* The password rule list both hosts show while a new password is typed:
		* every rule, the unmet ones marked. Unstyled: copy is host-translated and
		* the look comes through the class props; when to show the list (dirty +
		* focused) stays with the host.
		*/
		const checks = computed(() => passwordRuleChecks(__props.password));
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", { class: normalizeClass(__props.rootClass) }, [createTextVNode(toDisplayString(__props.copy.requirements) + ": ", 1), createBaseVNode("ul", { class: normalizeClass(__props.listClass) }, [
				createBaseVNode("li", { class: normalizeClass(checks.value.length ? void 0 : __props.unmetClass) }, toDisplayString(__props.copy.length), 3),
				createBaseVNode("li", { class: normalizeClass(checks.value.uppercase ? void 0 : __props.unmetClass) }, toDisplayString(__props.copy.uppercase), 3),
				createBaseVNode("li", { class: normalizeClass(checks.value.lowercase ? void 0 : __props.unmetClass) }, toDisplayString(__props.copy.lowercase), 3),
				createBaseVNode("li", { class: normalizeClass(checks.value.number ? void 0 : __props.unmetClass) }, toDisplayString(__props.copy.number), 3),
				createBaseVNode("li", { class: normalizeClass(checks.value.special ? void 0 : __props.unmetClass) }, toDisplayString(__props.copy.special), 3)
			], 2)], 2);
		};
	}
});
//#endregion
//#region src/components/dialog/content/signin/PasswordFields.vue
var PasswordFields_default = /* @__PURE__ */ defineComponent({
	__name: "PasswordFields",
	props: { fieldClass: { type: [
		Boolean,
		null,
		String,
		Object,
		Array
	] } },
	setup(__props) {
		const { t } = useI18n();
		const passwordField = useTemplateRef("passwordField");
		const { focused: isPasswordFocused } = useFocusWithin(passwordField);
		const passwordRulesCopy = computed(() => ({
			requirements: t("validation.password.requirements"),
			length: t("validation.password.minLength"),
			uppercase: t("validation.password.uppercase"),
			lowercase: t("validation.password.lowercase"),
			number: t("validation.password.number"),
			special: t("validation.password.special")
		}));
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock(Fragment, null, [createVNode(unref(Field), { name: "password" }, {
				default: withCtx(({ componentField, errors, meta, value }) => [createVNode(Field_default, {
					ref_key: "passwordField",
					ref: passwordField,
					"data-invalid": !!errors.length
				}, {
					default: withCtx(() => [
						createVNode(FieldLabel_default, { for: "comfy-org-sign-up-password" }, {
							default: withCtx(() => [createTextVNode(toDisplayString(unref(t)("auth.signup.passwordLabel")), 1)]),
							_: 1
						}),
						createVNode(PasswordInput_default, mergeProps(componentField, {
							id: "comfy-org-sign-up-password",
							autocomplete: "new-password",
							placeholder: unref(t)("auth.signup.passwordPlaceholder"),
							class: __props.fieldClass,
							"aria-invalid": !!errors.length
						}), null, 16, [
							"placeholder",
							"class",
							"aria-invalid"
						]),
						meta.dirty && unref(isPasswordFocused) ? (openBlock(), createBlock(unref(PasswordRules_default), {
							key: 0,
							password: value ?? "",
							copy: passwordRulesCopy.value,
							"root-class": "text-sm",
							"list-class": "mt-1 space-y-1",
							"unmet-class": "text-destructive-background"
						}, null, 8, ["password", "copy"])) : createCommentVNode("", true),
						errors.length && !unref(isPasswordFocused) ? (openBlock(), createBlock(FieldError_default, {
							key: 1,
							errors
						}, null, 8, ["errors"])) : createCommentVNode("", true)
					]),
					_: 2
				}, 1032, ["data-invalid"])]),
				_: 1
			}), createVNode(unref(Field), { name: "confirmPassword" }, {
				default: withCtx(({ componentField, errors }) => [createVNode(Field_default, { "data-invalid": !!errors.length }, {
					default: withCtx(() => [
						createVNode(FieldLabel_default, { for: "comfy-org-sign-up-confirm-password" }, {
							default: withCtx(() => [createTextVNode(toDisplayString(unref(t)("auth.login.confirmPasswordLabel")), 1)]),
							_: 1
						}),
						createVNode(PasswordInput_default, mergeProps(componentField, {
							id: "comfy-org-sign-up-confirm-password",
							autocomplete: "new-password",
							placeholder: unref(t)("auth.login.confirmPasswordPlaceholder"),
							class: __props.fieldClass,
							"aria-invalid": !!errors.length
						}), null, 16, [
							"placeholder",
							"class",
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
			})], 64);
		};
	}
});
//#endregion
export { PasswordFields_default as t };
