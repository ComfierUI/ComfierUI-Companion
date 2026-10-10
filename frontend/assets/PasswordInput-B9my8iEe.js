import "./rolldown-runtime-xtsTai4I.js";
import { $ as mergeProps, Et as withCtx, F as createBaseVNode, G as defineComponent, I as createBlock, Jt as normalizeClass, Lt as ref, Q as mergeModels, U as createVNode, lt as openBlock, yt as useModel } from "./vendor-vue-core-C1utdb0s.js";
import { i as InputGroup_default, n as InputGroupButton_default, r as InputGroupAddon_default, t as InputGroupInput_default } from "./InputGroupInput-BndLl3Nb.js";
//#endregion
//#region src/components/ui/input/PasswordInput.vue
var PasswordInput_default = /* @__PURE__ */ defineComponent({
	inheritAttrs: false,
	__name: "PasswordInput",
	props: /*@__PURE__*/ mergeModels({
		class: { type: [
			Boolean,
			null,
			String,
			Object,
			Array
		] },
		disabled: {
			type: Boolean,
			default: false
		}
	}, {
		"modelValue": {},
		"modelModifiers": {}
	}),
	emits: ["update:modelValue"],
	setup(__props) {
		const modelValue = useModel(__props, "modelValue");
		const visible = ref(false);
		return (_ctx, _cache) => {
			return openBlock(), createBlock(InputGroup_default, { class: normalizeClass(__props.class) }, {
				default: withCtx(() => [createVNode(InputGroupInput_default, mergeProps({
					modelValue: modelValue.value,
					"onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => modelValue.value = $event)
				}, _ctx.$attrs, {
					type: visible.value ? "text" : "password",
					disabled: __props.disabled
				}), null, 16, [
					"modelValue",
					"type",
					"disabled"
				]), createVNode(InputGroupAddon_default, { align: "inline-end" }, {
					default: withCtx(() => [createVNode(InputGroupButton_default, {
						size: "icon-sm",
						disabled: __props.disabled,
						"aria-label": _ctx.$t(visible.value ? "auth.hidePassword" : "auth.showPassword"),
						"aria-pressed": visible.value,
						onClick: _cache[1] || (_cache[1] = ($event) => visible.value = !visible.value)
					}, {
						default: withCtx(() => [createBaseVNode("i", { class: normalizeClass([visible.value ? "icon-[lucide--eye-off]" : "icon-[lucide--eye]", "size-4"]) }, null, 2)]),
						_: 1
					}, 8, [
						"disabled",
						"aria-label",
						"aria-pressed"
					])]),
					_: 1
				})]),
				_: 1
			}, 8, ["class"]);
		};
	}
});
//#endregion
export { PasswordInput_default as t };
