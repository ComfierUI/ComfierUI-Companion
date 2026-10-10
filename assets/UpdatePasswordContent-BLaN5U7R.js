import "./rolldown-runtime-xtsTai4I.js";
import { _ as toTypedSchema, y as useForm } from "./vendor-other-BPEcPQTD.js";
import { E as withModifiers, Et as withCtx, G as defineComponent, H as createTextVNode, Kt as unref, Lt as ref, R as createElementBlock, U as createVNode, Zt as toDisplayString, lt as openBlock } from "./vendor-vue-core-C1utdb0s.js";
import { or as useAuthActions } from "./layoutStore-CZsuzg91.js";
import { t as Button_default } from "./Button-j0oCzR82.js";
import { i as updatePasswordSchema } from "./signInSchema-COhVh-MP.js";
import { t as PasswordFields_default } from "./PasswordFields-ZEHNFiy2.js";
//#endregion
//#region src/components/dialog/content/UpdatePasswordContent.vue
var UpdatePasswordContent_default = /* @__PURE__ */ defineComponent({
	__name: "UpdatePasswordContent",
	props: { onSuccess: { type: Function } },
	setup(__props) {
		const authActions = useAuthActions();
		const loading = ref(false);
		const { handleSubmit } = useForm({
			validationSchema: toTypedSchema(updatePasswordSchema),
			initialValues: {
				password: "",
				confirmPassword: ""
			}
		});
		const onSubmit = handleSubmit(async ({ password }) => {
			loading.value = true;
			try {
				await authActions.updatePassword(password);
				__props.onSuccess();
			} finally {
				loading.value = false;
			}
		});
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("form", {
				"data-testid": "update-password-dialog",
				class: "flex w-96 flex-col gap-6",
				onSubmit: _cache[0] || (_cache[0] = withModifiers((...args) => unref(onSubmit) && unref(onSubmit)(...args), ["prevent"]))
			}, [createVNode(PasswordFields_default), createVNode(Button_default, {
				type: "submit",
				class: "mt-4 h-10 font-medium",
				loading: loading.value
			}, {
				default: withCtx(() => [createTextVNode(toDisplayString(_ctx.$t("userSettings.updatePassword")), 1)]),
				_: 1
			}, 8, ["loading"])], 32);
		};
	}
});
//#endregion
export { UpdatePasswordContent_default as default };
