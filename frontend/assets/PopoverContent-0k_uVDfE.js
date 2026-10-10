import "./rolldown-runtime-xtsTai4I.js";
import { $ as mergeProps, Et as withCtx, G as defineComponent, I as createBlock, Kt as unref, P as computed, U as createVNode, ft as renderSlot, lt as openBlock, z as createPropsRestProxy } from "./vendor-vue-core-C1utdb0s.js";
import { Et as injectPopoverRootContext, bt as PopoverPortal_default, vn as useForwardPropsEmits, xt as PopoverContent_default$1 } from "./vendor-reka-ui-tdehH9A1.js";
import { t as cn } from "./src-DI1bBfrb.js";
import { n as useModalLiftedZIndex } from "./useModalLiftedZIndex-BuehUvPe.js";
//#endregion
//#region src/components/ui/popover/PopoverContent.vue
var PopoverContent_default = /* @__PURE__ */ defineComponent({
	inheritAttrs: false,
	__name: "PopoverContent",
	props: {
		forceMount: { type: Boolean },
		side: {},
		sideOffset: { default: 4 },
		sideFlip: { type: Boolean },
		align: { default: "center" },
		alignOffset: {},
		alignFlip: { type: Boolean },
		avoidCollisions: { type: Boolean },
		collisionBoundary: {},
		collisionPadding: {},
		arrowPadding: {},
		sticky: {},
		hideWhenDetached: { type: Boolean },
		positionStrategy: {},
		updatePositionStrategy: {},
		disableUpdateOnLayoutShift: { type: Boolean },
		prioritizePosition: { type: Boolean },
		reference: {},
		asChild: { type: Boolean },
		as: {},
		disableOutsidePointerEvents: { type: Boolean },
		class: { type: [
			Boolean,
			null,
			String,
			Object,
			Array
		] }
	},
	emits: [
		"escapeKeyDown",
		"pointerDownOutside",
		"focusOutside",
		"interactOutside",
		"openAutoFocus",
		"closeAutoFocus"
	],
	setup(__props, { emit: __emit }) {
		const restProps = createPropsRestProxy(__props, [
			"align",
			"sideOffset",
			"class"
		]);
		const emits = __emit;
		const delegatedProps = computed(() => ({
			align: __props.align,
			sideOffset: __props.sideOffset,
			...restProps
		}));
		const forwarded = useForwardPropsEmits(delegatedProps, emits);
		const rootContext = injectPopoverRootContext();
		const contentStyle = useModalLiftedZIndex(rootContext.open);
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(PopoverPortal_default), null, {
				default: withCtx(() => [createVNode(unref(PopoverContent_default$1), mergeProps({
					...unref(forwarded),
					..._ctx.$attrs
				}, {
					style: unref(contentStyle),
					class: unref(cn)("z-1700 w-72 rounded-md border bg-base-background p-4 text-base-foreground shadow-md outline-none", "data-[state=closed]:animate-out data-[state=open]:animate-in", "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95", "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2", "data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2", __props.class)
				}), {
					default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
					_: 3
				}, 16, ["style", "class"])]),
				_: 3
			});
		};
	}
});
//#endregion
export { PopoverContent_default as t };
