import "./rolldown-runtime-xtsTai4I.js";
import { $ as mergeProps, Et as withCtx, G as defineComponent, I as createBlock, Kt as unref, Mt as isRef, ft as renderSlot, lt as openBlock } from "./vendor-vue-core-C1utdb0s.js";
import { q as useVModel } from "./vendor-vueuse-BxKIIsKg.js";
import { Tt as PopoverRoot_default, vn as useForwardPropsEmits } from "./vendor-reka-ui-tdehH9A1.js";
import { r as useOverlayBack } from "./useModalLiftedZIndex-BuehUvPe.js";
//#endregion
//#region src/components/ui/popover/Popover.vue
var Popover_default = /* @__PURE__ */ defineComponent({
	__name: "Popover",
	props: {
		defaultOpen: { type: Boolean },
		open: { type: Boolean },
		modal: { type: Boolean }
	},
	emits: ["update:open"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const open = useVModel(props, "open", emits, {
			passive: true,
			defaultValue: props.defaultOpen ?? false
		});
		useOverlayBack(open);
		const forwarded = useForwardPropsEmits(props, emits);
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(PopoverRoot_default), mergeProps(unref(forwarded), {
				open: unref(open),
				"onUpdate:open": _cache[0] || (_cache[0] = ($event) => isRef(open) ? open.value = $event : null)
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16, ["open"]);
		};
	}
});
//#endregion
export { Popover_default as t };
