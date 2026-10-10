import "./rolldown-runtime-xtsTai4I.js";
import { $ as mergeProps, Et as withCtx, F as createBaseVNode, G as defineComponent, I as createBlock, Jt as normalizeClass, Kt as unref, U as createVNode, Yt as normalizeProps, ft as renderSlot, lt as openBlock, q as guardReactiveProps } from "./vendor-vue-core-C1utdb0s.js";
import { $ as reactiveOmit } from "./vendor-vueuse-BxKIIsKg.js";
import { $t as CheckboxRoot_default, Qt as CheckboxIndicator_default, vn as useForwardPropsEmits } from "./vendor-reka-ui-tdehH9A1.js";
import { t as cn } from "./src-DI1bBfrb.js";
//#endregion
//#region src/components/ui/checkbox/Checkbox.vue
var Checkbox_default = /* @__PURE__ */ defineComponent({
	__name: "Checkbox",
	props: {
		defaultValue: { type: [Boolean, String] },
		modelValue: { type: [
			Boolean,
			String,
			null
		] },
		disabled: { type: Boolean },
		value: {},
		id: {},
		asChild: { type: Boolean },
		as: {},
		name: {},
		required: { type: Boolean },
		class: { type: [
			Boolean,
			null,
			String,
			Object,
			Array
		] }
	},
	emits: ["update:modelValue"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const forwarded = useForwardPropsEmits(reactiveOmit(props, "class"), emits);
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(CheckboxRoot_default), mergeProps(unref(forwarded), {
				"data-slot": "checkbox",
				class: unref(cn)("inline-flex size-4 shrink-0 cursor-pointer items-center justify-center rounded-sm border border-border-default bg-transparent text-base-background transition-colors outline-none focus-visible:ring-1 focus-visible:ring-border-default disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:border-primary-background data-[state=checked]:bg-primary-background data-[state=indeterminate]:border-primary-background data-[state=indeterminate]:bg-primary-background", props.class)
			}), {
				default: withCtx((slotProps) => [createVNode(unref(CheckboxIndicator_default), { class: "flex items-center justify-center" }, {
					default: withCtx(() => [renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(slotProps)), () => [createBaseVNode("i", { class: normalizeClass(unref(cn)("size-3", slotProps.state === "indeterminate" ? "icon-[lucide--minus]" : "icon-[lucide--check]")) }, null, 2)])]),
					_: 2
				}, 1024)]),
				_: 3
			}, 16, ["class"]);
		};
	}
});
//#endregion
export { Checkbox_default as t };
