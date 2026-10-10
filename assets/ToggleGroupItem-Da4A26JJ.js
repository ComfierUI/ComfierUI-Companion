import "./rolldown-runtime-xtsTai4I.js";
import { U as cva } from "./vendor-other-BPEcPQTD.js";
import { $ as mergeProps, Et as withCtx, G as defineComponent, Ht as toRef, I as createBlock, Kt as unref, Lt as ref, P as computed, X as inject, ft as renderSlot, lt as openBlock, ut as provide, z as createPropsRestProxy } from "./vendor-vue-core-C1utdb0s.js";
import { d as ToggleGroupItem_default$1, f as ToggleGroupRoot_default, yn as useForwardProps } from "./vendor-reka-ui-tdehH9A1.js";
import { t as cn } from "./src-DI1bBfrb.js";
//#region src/components/ui/toggle-group/toggleGroup.variants.ts
var toggleGroupVariantKey = Symbol("toggleGroupVariant");
var toggleGroupVariants = cva({
	base: "flex items-center justify-center gap-1",
	variants: { variant: {
		default: "bg-transparent",
		outline: "bg-transparent"
	} },
	defaultVariants: { variant: "default" }
});
var toggleGroupItemVariants = cva({
	base: [
		"inline-flex items-center justify-center rounded-sm",
		"cursor-pointer appearance-none border-none",
		"text-center font-normal",
		"transition-all duration-150 ease-in-out",
		"focus-visible:ring-1 focus-visible:ring-border-default focus-visible:outline-none",
		"disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
		"data-[state=on]:bg-secondary-background data-[state=on]:text-base-foreground"
	],
	variants: {
		variant: {
			default: "bg-transparent text-muted-foreground hover:bg-secondary-background/50",
			outline: "border border-border-default bg-transparent text-muted-foreground hover:bg-secondary-background"
		},
		size: {
			default: "h-7 px-3 text-sm",
			sm: "h-6 px-5 py-[5px] text-xs",
			lg: "h-9 px-4 text-sm"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
//#endregion
//#region src/components/ui/toggle-group/ToggleGroup.vue
var ToggleGroup_default = /* @__PURE__ */ defineComponent({
	__name: "ToggleGroup",
	props: {
		class: { type: [
			Boolean,
			null,
			String,
			Object,
			Array
		] },
		variant: { default: "default" },
		allowEmpty: {
			type: Boolean,
			default: true
		},
		rovingFocus: { type: Boolean },
		disabled: { type: Boolean },
		orientation: {},
		dir: {},
		loop: { type: Boolean },
		asChild: { type: Boolean },
		as: {},
		name: {},
		required: { type: Boolean },
		type: {},
		modelValue: {},
		defaultValue: {}
	},
	emits: ["update:modelValue"],
	setup(__props, { emit: __emit }) {
		const restProps = createPropsRestProxy(__props, [
			"class",
			"variant",
			"allowEmpty"
		]);
		const emits = __emit;
		const forwarded = useForwardProps(restProps);
		function updateModelValue(value) {
			if (!__props.allowEmpty && restProps.type === "single" && value == null) return;
			emits("update:modelValue", value);
		}
		provide(toggleGroupVariantKey, toRef(() => __props.variant));
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(ToggleGroupRoot_default), mergeProps(unref(forwarded), {
				class: unref(cn)(unref(toggleGroupVariants)({ variant: __props.variant }), __props.class),
				"onUpdate:modelValue": updateModelValue
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16, ["class"]);
		};
	}
});
//#endregion
//#region src/components/ui/toggle-group/ToggleGroupItem.vue
var ToggleGroupItem_default = /* @__PURE__ */ defineComponent({
	__name: "ToggleGroupItem",
	props: {
		class: { type: [
			Boolean,
			null,
			String,
			Object,
			Array
		] },
		variant: {},
		size: { default: "default" },
		value: {},
		disabled: { type: Boolean },
		asChild: { type: Boolean },
		as: {}
	},
	setup(__props) {
		const restProps = createPropsRestProxy(__props, [
			"class",
			"variant",
			"size"
		]);
		const contextVariant = inject(toggleGroupVariantKey, ref("default"));
		const forwardedProps = useForwardProps(restProps);
		const resolvedVariant = computed(() => __props.variant ?? contextVariant.value ?? "default");
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(ToggleGroupItem_default$1), mergeProps(unref(forwardedProps), { class: unref(cn)(unref(toggleGroupItemVariants)({
				variant: resolvedVariant.value,
				size: __props.size
			}), "min-w-0 flex-none", __props.class) }), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16, ["class"]);
		};
	}
});
//#endregion
export { ToggleGroup_default as n, ToggleGroupItem_default as t };
