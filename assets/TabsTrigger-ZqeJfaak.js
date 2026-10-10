import "./rolldown-runtime-xtsTai4I.js";
import { U as cva } from "./vendor-other-BPEcPQTD.js";
import { $ as mergeProps, Et as withCtx, G as defineComponent, I as createBlock, Kt as unref, ft as renderSlot, lt as openBlock } from "./vendor-vue-core-C1utdb0s.js";
import { $ as reactiveOmit } from "./vendor-vueuse-BxKIIsKg.js";
import { b as TabsContent_default$1, v as TabsTrigger_default$1, vn as useForwardPropsEmits, x as TabsRoot_default, y as TabsList_default$1, yn as useForwardProps } from "./vendor-reka-ui-tdehH9A1.js";
import { t as cn } from "./src-DI1bBfrb.js";
//#endregion
//#region src/components/ui/tabs/Tabs.vue
var Tabs_default = /* @__PURE__ */ defineComponent({
	__name: "Tabs",
	props: {
		defaultValue: {},
		orientation: {},
		dir: {},
		activationMode: {},
		modelValue: {},
		unmountOnHide: { type: Boolean },
		asChild: { type: Boolean },
		as: {},
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
			return openBlock(), createBlock(unref(TabsRoot_default), mergeProps(unref(forwarded), {
				"data-slot": "tabs",
				class: unref(cn)("flex flex-col gap-2", props.class)
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16, ["class"]);
		};
	}
});
//#endregion
//#region src/components/ui/tabs/TabsContent.vue
var TabsContent_default = /* @__PURE__ */ defineComponent({
	__name: "TabsContent",
	props: {
		value: {},
		forceMount: { type: Boolean },
		asChild: { type: Boolean },
		as: {},
		class: { type: [
			Boolean,
			null,
			String,
			Object,
			Array
		] }
	},
	setup(__props) {
		const props = __props;
		const forwarded = useForwardProps(reactiveOmit(props, "class"));
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(TabsContent_default$1), mergeProps(unref(forwarded), {
				"data-slot": "tabs-content",
				class: unref(cn)("flex-1 outline-none", props.class)
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16, ["class"]);
		};
	}
});
//#endregion
//#region src/components/ui/tabs/tabs.variants.ts
var tabsListVariants = cva({
	base: "inline-flex items-center gap-2",
	variants: { variant: {
		default: "",
		bordered: "gap-1 border-b border-border-default",
		panel: "border-b border-solid border-border-default bg-transparent py-2",
		flush: "gap-0"
	} },
	defaultVariants: { variant: "default" }
});
var tabsTriggerVariants = cva({
	base: "inline-flex h-8 shrink-0 cursor-pointer items-center justify-center gap-2 rounded-lg border-none bg-transparent px-2.5 text-sm whitespace-nowrap text-muted-foreground transition-all duration-200 outline-none focus-visible:ring-1 focus-visible:ring-border-default disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-secondary-background data-[state=active]:text-base-foreground data-[state=inactive]:hover:bg-secondary-background/50",
	variants: { variant: {
		default: "",
		panel: "m-1 mx-2 p-3 font-inter",
		flush: "h-auto rounded-none px-4 py-2 font-medium data-[state=active]:bg-transparent"
	} },
	defaultVariants: { variant: "default" }
});
//#endregion
//#region src/components/ui/tabs/TabsList.vue
var TabsList_default = /* @__PURE__ */ defineComponent({
	__name: "TabsList",
	props: {
		loop: { type: Boolean },
		asChild: { type: Boolean },
		as: {},
		class: { type: [
			Boolean,
			null,
			String,
			Object,
			Array
		] },
		variant: {}
	},
	setup(__props) {
		const props = __props;
		const forwarded = useForwardProps(reactiveOmit(props, "class", "variant"));
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(TabsList_default$1), mergeProps(unref(forwarded), {
				"data-slot": "tabs-list",
				class: unref(cn)(unref(tabsListVariants)({ variant: props.variant }), props.class)
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16, ["class"]);
		};
	}
});
//#endregion
//#region src/components/ui/tabs/TabsTrigger.vue
var TabsTrigger_default = /* @__PURE__ */ defineComponent({
	__name: "TabsTrigger",
	props: {
		value: {},
		disabled: { type: Boolean },
		asChild: { type: Boolean },
		as: {},
		class: { type: [
			Boolean,
			null,
			String,
			Object,
			Array
		] },
		variant: {}
	},
	setup(__props) {
		const props = __props;
		const forwarded = useForwardProps(reactiveOmit(props, "class", "variant"));
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(TabsTrigger_default$1), mergeProps(unref(forwarded), {
				"data-slot": "tabs-trigger",
				class: unref(cn)(unref(tabsTriggerVariants)({ variant: props.variant }), props.class)
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16, ["class"]);
		};
	}
});
//#endregion
export { Tabs_default as i, TabsList_default as n, TabsContent_default as r, TabsTrigger_default as t };
