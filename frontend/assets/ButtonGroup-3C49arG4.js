import "./rolldown-runtime-xtsTai4I.js";
import { $ as mergeProps, Et as withCtx, F as createBaseVNode, G as defineComponent, I as createBlock, Jt as normalizeClass, Kt as unref, R as createElementBlock, ft as renderSlot, lt as openBlock, z as createPropsRestProxy } from "./vendor-vue-core-C1utdb0s.js";
import { Nl as useComfierPanelStore, t as useComfierLayoutStore } from "./layoutStore-CZsuzg91.js";
import { gn as Primitive, yn as useForwardProps } from "./vendor-reka-ui-tdehH9A1.js";
import { t as cn } from "./src-DI1bBfrb.js";
//#region src/comfier/layoutControl.ts
var cleanup = /* @__PURE__ */ new WeakMap();
var vLayoutControl = {
	mounted(el, { value }) {
		useComfierLayoutStore().register(value, el);
		const launch = () => useComfierPanelStore().launchFrom(el.getBoundingClientRect());
		el.addEventListener("click", launch, { capture: true });
		cleanup.set(el, () => el.removeEventListener("click", launch, { capture: true }));
	},
	updated(el, { value, oldValue }) {
		if (oldValue && oldValue !== value) useComfierLayoutStore().unregister(oldValue, el);
		useComfierLayoutStore().register(value, el);
	},
	unmounted(el, { value }) {
		cleanup.get(el)?.();
		cleanup.delete(el);
		useComfierLayoutStore().unregister(value, el);
	}
};
//#endregion
//#region src/components/actionbar/TinyChevronIcon.vue
var TinyChevronIcon_default = /* @__PURE__ */ defineComponent({
	__name: "TinyChevronIcon",
	props: { rotateUp: {
		type: Boolean,
		default: false
	} },
	setup(__props) {
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("svg", {
				class: normalizeClass(["h-[5px] min-h-[5px] w-[8px] min-w-[8px]", { "rotate-180": __props.rotateUp }]),
				xmlns: "http://www.w3.org/2000/svg",
				width: "8",
				height: "5",
				viewBox: "0 0 8 5",
				fill: "none",
				"aria-hidden": "true"
			}, [..._cache[0] || (_cache[0] = [createBaseVNode("path", {
				d: "M0.650391 0.649902L3.65039 3.6499L6.65039 0.649902",
				stroke: "currentColor",
				"stroke-width": "1.3",
				"stroke-linecap": "round",
				"stroke-linejoin": "round"
			}, null, -1)])], 2);
		};
	}
});
//#endregion
//#region src/components/ui/button-group/ButtonGroup.vue
var ButtonGroup_default = /* @__PURE__ */ defineComponent({
	__name: "ButtonGroup",
	props: {
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
		asChild: { type: Boolean },
		as: { default: "div" }
	},
	setup(__props) {
		const restProps = createPropsRestProxy(__props, ["as", "class"]);
		const forwardedProps = useForwardProps(restProps);
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), mergeProps(unref(forwardedProps), {
				as: __props.as,
				class: unref(cn)("inline-flex items-stretch overflow-hidden rounded-md", __props.class)
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16, ["as", "class"]);
		};
	}
});
//#endregion
export { TinyChevronIcon_default as n, vLayoutControl as r, ButtonGroup_default as t };
