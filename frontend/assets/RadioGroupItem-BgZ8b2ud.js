import "./rolldown-runtime-xtsTai4I.js";
import { $ as mergeProps, Et as withCtx, G as defineComponent, I as createBlock, Kt as unref, U as createVNode, ft as renderSlot, lt as openBlock } from "./vendor-vue-core-C1utdb0s.js";
import { $ as reactiveOmit } from "./vendor-vueuse-BxKIIsKg.js";
import { G as RadioGroupItem_default$1, K as RadioGroupRoot_default, W as RadioGroupIndicator_default, vn as useForwardPropsEmits } from "./vendor-reka-ui-tdehH9A1.js";
import { t as cn } from "./src-DI1bBfrb.js";
//#endregion
//#region src/components/ui/radio-group/RadioGroup.vue
var RadioGroup_default = /* @__PURE__ */ defineComponent({
	__name: "RadioGroup",
	props: {
		modelValue: {},
		defaultValue: {},
		disabled: { type: Boolean },
		orientation: {},
		dir: {},
		loop: { type: Boolean },
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
			return openBlock(), createBlock(unref(RadioGroupRoot_default), mergeProps(unref(forwarded), {
				"data-slot": "radio-group",
				class: unref(cn)("flex gap-2", props.class)
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16, ["class"]);
		};
	}
});
//#endregion
//#region src/components/ui/radio-group/RadioGroupItem.vue
var RadioGroupItem_default = /* @__PURE__ */ defineComponent({
	__name: "RadioGroupItem",
	props: {
		id: {},
		value: {},
		disabled: { type: Boolean },
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
	emits: ["select"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const forwarded = useForwardPropsEmits(reactiveOmit(props, "class"), emits);
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(RadioGroupItem_default$1), mergeProps(unref(forwarded), {
				"data-slot": "radio-group-item",
				class: unref(cn)("inline-flex size-4 shrink-0 cursor-pointer items-center justify-center rounded-full border border-border-default bg-transparent outline-none focus-visible:ring-1 focus-visible:ring-border-default disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:border-primary-background", props.class)
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", {}, () => [createVNode(unref(RadioGroupIndicator_default), { class: "size-2 rounded-full bg-primary-background" })])]),
				_: 3
			}, 16, ["class"]);
		};
	}
});
//#endregion
export { RadioGroup_default as n, RadioGroupItem_default as t };
