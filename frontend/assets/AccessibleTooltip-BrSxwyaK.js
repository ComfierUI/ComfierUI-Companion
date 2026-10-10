import "./rolldown-runtime-xtsTai4I.js";
import { E as withModifiers, Et as withCtx, F as createBaseVNode, G as defineComponent, H as createTextVNode, I as createBlock, Jt as normalizeClass, Kt as unref, Lt as ref, P as computed, U as createVNode, Xt as normalizeStyle, Zt as toDisplayString, ft as renderSlot, lt as openBlock } from "./vendor-vue-core-C1utdb0s.js";
import { a as TooltipTrigger_default, c as TooltipRoot_default, l as TooltipProvider_default, o as TooltipPortal_default, s as TooltipContent_default, u as TooltipArrow_default } from "./vendor-reka-ui-tdehH9A1.js";
import { t as cn } from "./src-DI1bBfrb.js";
import { n as useModalLiftedZIndex } from "./useModalLiftedZIndex-BuehUvPe.js";
//#region src/components/ui/tooltip/AccessibleTooltip.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1 = ["aria-label", "data-testid"];
//#endregion
//#region src/components/ui/tooltip/AccessibleTooltip.vue
var AccessibleTooltip_default = /* @__PURE__ */ defineComponent({
	__name: "AccessibleTooltip",
	props: {
		label: {},
		testId: {},
		triggerClass: {},
		contentClass: {},
		ringClass: { default: "focus-visible:ring-base-foreground" },
		side: { default: "top" },
		sideOffset: { default: 6 },
		delayDuration: { default: 300 },
		disabled: {
			type: Boolean,
			default: false
		},
		skipDelayDuration: { default: 300 },
		disableHoverableContent: {
			type: Boolean,
			default: false
		},
		disableClosingTrigger: {
			type: Boolean,
			default: true
		},
		align: { default: "center" },
		collisionPadding: { default: 0 }
	},
	setup(__props) {
		const open = ref(false);
		const contentStyle = useModalLiftedZIndex(open);
		const labelText = computed(() => Array.isArray(__props.label) ? __props.label.join(", ") : __props.label);
		const contentClass = computed(() => cn("z-1700 max-w-48 rounded-md bg-charcoal-300 px-3 py-2", "text-xs text-white shadow-interface will-change-[transform,opacity]", "data-[state=closed]:animate-out data-[state=open]:animate-in", "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95", __props.contentClass));
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(TooltipProvider_default), {
				"delay-duration": __props.delayDuration,
				"skip-delay-duration": __props.skipDelayDuration,
				"disable-hoverable-content": __props.disableHoverableContent
			}, {
				default: withCtx(() => [createVNode(unref(TooltipRoot_default), {
					open: open.value,
					"onUpdate:open": _cache[1] || (_cache[1] = ($event) => open.value = $event),
					disabled: __props.disabled,
					"disable-closing-trigger": __props.disableClosingTrigger
				}, {
					default: withCtx(() => [createVNode(unref(TooltipTrigger_default), { "as-child": "" }, {
						default: withCtx(() => [renderSlot(_ctx.$slots, "trigger", {}, () => [createBaseVNode("button", {
							type: "button",
							"aria-label": labelText.value,
							"data-testid": __props.testId,
							class: normalizeClass(unref(cn)("cursor-pointer border-none bg-transparent p-0 focus-visible:ring-1 focus-visible:outline-none", __props.ringClass, __props.triggerClass)),
							onClick: _cache[0] || (_cache[0] = withModifiers(($event) => open.value = true, ["stop"]))
						}, [renderSlot(_ctx.$slots, "default")], 10, _hoisted_1)])]),
						_: 3
					}), createVNode(unref(TooltipPortal_default), null, {
						default: withCtx(() => [createVNode(unref(TooltipContent_default), {
							side: __props.side,
							"side-offset": __props.sideOffset,
							align: __props.align,
							"collision-padding": __props.collisionPadding,
							"aria-hidden": _ctx.$slots.trigger ? void 0 : true,
							"aria-label": _ctx.$slots.trigger ? void 0 : " ",
							"data-testid": "disclosure-tooltip",
							style: normalizeStyle(unref(contentStyle)),
							class: normalizeClass(contentClass.value)
						}, {
							default: withCtx(() => [renderSlot(_ctx.$slots, "content", {}, () => [createTextVNode(toDisplayString(labelText.value), 1)]), createVNode(unref(TooltipArrow_default), {
								width: 10,
								height: 5,
								class: "fill-charcoal-300"
							})]),
							_: 3
						}, 8, [
							"side",
							"side-offset",
							"align",
							"collision-padding",
							"aria-hidden",
							"aria-label",
							"style",
							"class"
						])]),
						_: 3
					})]),
					_: 3
				}, 8, [
					"open",
					"disabled",
					"disable-closing-trigger"
				])]),
				_: 3
			}, 8, [
				"delay-duration",
				"skip-delay-duration",
				"disable-hoverable-content"
			]);
		};
	}
});
//#endregion
export { AccessibleTooltip_default as t };
