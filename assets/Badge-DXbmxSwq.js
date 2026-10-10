import "./rolldown-runtime-xtsTai4I.js";
import { U as cva } from "./vendor-other-BPEcPQTD.js";
import { Et as withCtx, F as createBaseVNode, G as defineComponent, I as createBlock, Jt as normalizeClass, Kt as unref, L as createCommentVNode, R as createElementBlock, ft as renderSlot, lt as openBlock } from "./vendor-vue-core-C1utdb0s.js";
import { t as cn } from "./src-DI1bBfrb.js";
import { t as Button_default } from "./Button-j0oCzR82.js";
//#region src/components/ui/badge/badge.variants.ts
var badgeVariants = cva({
	base: "inline-flex shrink-0 items-center justify-center gap-1 font-medium whitespace-nowrap",
	variants: {
		variant: {
			tag: "rounded-md px-2 py-1 text-sm font-bold",
			chip: "min-h-7 rounded-full px-2 py-1 text-sm",
			badge: "min-h-5 min-w-5 rounded-full px-1.5 text-xs",
			compact: "h-5 rounded-full px-2 py-0.5 text-xs normal-case",
			dot: "size-2 rounded-full p-0"
		},
		severity: {
			primary: "bg-primary-background/10 text-base-foreground",
			secondary: "bg-secondary-background text-base-foreground",
			danger: "bg-destructive-background text-base-foreground",
			info: "bg-primary-background/20 text-base-foreground",
			success: "bg-success-background/15 text-base-foreground",
			warning: "bg-warning-background text-warning-on-background"
		}
	},
	defaultVariants: {
		variant: "tag",
		severity: "secondary"
	}
});
//#endregion
//#region src/components/ui/badge/Badge.vue
var Badge_default = /* @__PURE__ */ defineComponent({
	__name: "Badge",
	props: {
		variant: {},
		severity: {},
		removable: {
			type: Boolean,
			default: false
		},
		removeLabel: {},
		class: {
			type: [
				Boolean,
				null,
				String,
				Object,
				Array
			],
			default: ""
		}
	},
	emits: ["remove"],
	setup(__props, { emit: __emit }) {
		const emit = __emit;
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("span", { class: normalizeClass(unref(cn)(unref(badgeVariants)({
				variant: __props.variant,
				severity: __props.severity
			}), __props.class)) }, [
				renderSlot(_ctx.$slots, "icon"),
				renderSlot(_ctx.$slots, "default"),
				__props.removable ? (openBlock(), createBlock(Button_default, {
					key: 0,
					type: "button",
					variant: "textonly",
					size: "icon-sm",
					class: "-mr-1 rounded-full text-current",
					"aria-label": __props.removeLabel ?? _ctx.$t("g.remove"),
					onClick: _cache[0] || (_cache[0] = ($event) => emit("remove", $event))
				}, {
					default: withCtx(() => [..._cache[1] || (_cache[1] = [createBaseVNode("i", {
						class: "icon-[lucide--x] size-3",
						"aria-hidden": "true"
					}, null, -1)])]),
					_: 1
				}, 8, ["aria-label"])) : createCommentVNode("", true)
			], 2);
		};
	}
});
//#endregion
export { Badge_default as t };
