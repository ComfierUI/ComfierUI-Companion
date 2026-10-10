import "./rolldown-runtime-xtsTai4I.js";
import { U as cva } from "./vendor-other-BPEcPQTD.js";
import { Et as withCtx, G as defineComponent, I as createBlock, Jt as normalizeClass, Kt as unref, L as createCommentVNode, O as Fragment, R as createElementBlock, ft as renderSlot, lt as openBlock } from "./vendor-vue-core-C1utdb0s.js";
import { gn as Primitive } from "./vendor-reka-ui-tdehH9A1.js";
import { t as cn } from "./src-DI1bBfrb.js";
//#region packages/design-system/src/button.variants.ts
var buttonVariants = cva({
	base: "relative inline-flex cursor-pointer touch-manipulation appearance-none items-center justify-center gap-2 rounded-md border-none font-inter text-sm font-medium whitespace-nowrap transition-colors focus-visible:ring-1 focus-visible:ring-border-default focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([width]):not([height])]:size-4",
	variants: {
		variant: {
			secondary: "bg-secondary-background text-base-foreground hover:bg-secondary-background-hover",
			primary: "bg-primary-background text-base-foreground hover:bg-primary-background-hover",
			inverted: "bg-base-foreground text-base-background hover:bg-base-foreground/80",
			destructive: "bg-destructive-background text-base-foreground hover:bg-destructive-background-hover",
			textonly: "bg-transparent text-base-foreground hover:bg-secondary-background-hover",
			"muted-textonly": "bg-transparent text-muted-foreground hover:bg-secondary-background-hover",
			"destructive-textonly": "bg-transparent text-destructive-background hover:bg-destructive-background/10",
			outline: "border border-solid border-border-default bg-transparent text-base-foreground hover:bg-secondary-background-hover",
			link: "bg-transparent text-muted-foreground hover:text-base-foreground",
			"overlay-white": "bg-white text-gray-600 hover:bg-white/90",
			base: "bg-base-background text-base-foreground hover:bg-secondary-background-hover",
			tertiary: "bg-tertiary-background text-base-foreground hover:bg-tertiary-background-hover",
			subscribe: "border-transparent bg-credit text-charcoal-800 hover:opacity-80",
			"brand-ghost": "bg-transparency-white-t8 text-primary-warm-white hover:bg-transparency-white-t20 focus-visible:ring-2 focus-visible:ring-brand-yellow",
			"brand-solid": "bg-brand-yellow text-primary-comfy-ink hover:bg-brand-yellow/90 focus-visible:ring-2 focus-visible:ring-primary-warm-white",
			"brand-ghost-accent": "bg-transparency-white-t8 text-primary-warm-white hover:bg-brand-yellow hover:text-primary-comfy-ink focus-visible:ring-2 focus-visible:ring-brand-yellow"
		},
		size: {
			sm: "h-6 rounded-sm px-2 py-1 text-xs",
			md: "h-8 rounded-lg p-2 text-xs",
			lg: "h-10 rounded-lg px-4 py-2 text-sm",
			"icon-sm": "size-5 p-0",
			icon: "size-8 rounded-lg",
			"icon-lg": "size-10 rounded-lg",
			link: "gap-1 px-0 py-2 text-sm/5 font-normal hover:underline",
			brand: "h-12 rounded-2xl px-5 font-formula text-sm font-semibold tracking-[0.7px] uppercase lg:h-13 xl:h-14 2xl:h-16",
			"brand-icon": "size-10 rounded-2xl xl:size-12",
			unset: ""
		}
	},
	defaultVariants: {
		variant: "secondary",
		size: "md"
	}
});
//#endregion
//#region src/components/ui/button/Button.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1 = {
	key: 0,
	class: "pi pi-spin pi-spinner",
	"aria-hidden": "true"
};
var _hoisted_2 = {
	key: 1,
	class: "sr-only"
};
var _hoisted_3 = {
	key: 3,
	"aria-hidden": "true",
	class: "pointer-events-none absolute -top-1 -right-1 size-2 rounded-full bg-base-foreground"
};
//#endregion
//#region src/components/ui/button/Button.vue
var Button_default = /* @__PURE__ */ defineComponent({
	__name: "Button",
	props: {
		variant: {},
		size: {},
		class: {
			type: [
				Boolean,
				null,
				String,
				Object,
				Array
			],
			default: ""
		},
		icon: {},
		indicator: { type: Boolean },
		loading: {
			type: Boolean,
			default: false
		},
		disabled: {
			type: Boolean,
			default: false
		},
		asChild: { type: Boolean },
		as: { default: "button" }
	},
	setup(__props) {
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), {
				as: __props.as,
				"as-child": __props.asChild,
				disabled: __props.disabled || __props.loading,
				"aria-busy": __props.loading || void 0,
				"data-variant": __props.variant,
				class: normalizeClass(unref(cn)(unref(buttonVariants)({
					variant: __props.variant,
					size: __props.size
				}), __props.class))
			}, {
				default: withCtx(() => [
					__props.loading ? (openBlock(), createElementBlock("i", _hoisted_1)) : createCommentVNode("", true),
					__props.loading ? (openBlock(), createElementBlock("span", _hoisted_2, [renderSlot(_ctx.$slots, "default")])) : (openBlock(), createElementBlock(Fragment, { key: 2 }, [__props.icon ? (openBlock(), createElementBlock("i", {
						key: 0,
						class: normalizeClass(unref(cn)(__props.icon, "size-4 shrink-0")),
						"aria-hidden": "true"
					}, null, 2)) : createCommentVNode("", true), renderSlot(_ctx.$slots, "default")], 64)),
					__props.indicator ? (openBlock(), createElementBlock("span", _hoisted_3)) : createCommentVNode("", true)
				]),
				_: 3
			}, 8, [
				"as",
				"as-child",
				"disabled",
				"aria-busy",
				"data-variant",
				"class"
			]);
		};
	}
});
//#endregion
export { buttonVariants as n, Button_default as t };
