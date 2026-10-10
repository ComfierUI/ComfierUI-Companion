import "./rolldown-runtime-xtsTai4I.js";
import { $ as mergeProps, Et as withCtx, G as defineComponent, I as createBlock, Kt as unref, L as createCommentVNode, Lt as ref, U as createVNode, ft as renderSlot, lt as openBlock } from "./vendor-vue-core-C1utdb0s.js";
import { Ct as PopoverArrow_default, Tt as PopoverRoot_default, bt as PopoverPortal_default, xt as PopoverContent_default, yt as PopoverTrigger_default } from "./vendor-reka-ui-tdehH9A1.js";
import { t as cn } from "./src-DI1bBfrb.js";
import { n as useModalLiftedZIndex, r as useOverlayBack } from "./useModalLiftedZIndex-BuehUvPe.js";
//#endregion
//#region src/components/ui/Popover.vue
var Popover_default = /* @__PURE__ */ defineComponent({
	inheritAttrs: false,
	__name: "Popover",
	props: {
		to: {},
		showArrow: {
			type: Boolean,
			default: true
		}
	},
	setup(__props) {
		const open = ref(false);
		const contentStyle = useModalLiftedZIndex(open);
		useOverlayBack(open);
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(PopoverRoot_default), {
				open: open.value,
				"onUpdate:open": _cache[0] || (_cache[0] = ($event) => open.value = $event)
			}, {
				default: withCtx(({ close }) => [createVNode(unref(PopoverTrigger_default), { "as-child": "" }, {
					default: withCtx(() => [renderSlot(_ctx.$slots, "button")]),
					_: 3
				}), createVNode(unref(PopoverPortal_default), { to: __props.to }, {
					default: withCtx(() => [createVNode(unref(PopoverContent_default), mergeProps({
						side: "bottom",
						"side-offset": 5,
						"collision-padding": 10
					}, _ctx.$attrs, {
						style: unref(contentStyle),
						class: unref(cn)("z-1700 rounded-lg border border-border-subtle bg-base-background p-2 shadow-sm", _ctx.$attrs.class, "will-change-[transform,opacity] data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95")
					}), {
						default: withCtx(() => [renderSlot(_ctx.$slots, "default", { close }), __props.showArrow ? (openBlock(), createBlock(unref(PopoverArrow_default), {
							key: 0,
							class: "fill-base-background stroke-border-subtle"
						})) : createCommentVNode("", true)]),
						_: 2
					}, 1040, ["style", "class"])]),
					_: 2
				}, 1032, ["to"])]),
				_: 3
			}, 8, ["open"]);
		};
	}
});
//#endregion
export { Popover_default as t };
