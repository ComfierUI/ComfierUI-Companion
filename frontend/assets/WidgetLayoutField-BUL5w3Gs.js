import "./rolldown-runtime-xtsTai4I.js";
import { E as withModifiers, F as createBaseVNode, G as defineComponent, H as createTextVNode, Jt as normalizeClass, Kt as unref, L as createCommentVNode, O as Fragment, P as computed, R as createElementBlock, Zt as toDisplayString, ft as renderSlot, lt as openBlock } from "./vendor-vue-core-C1utdb0s.js";
import { t as cn } from "./src-DI1bBfrb.js";
import { i as useHideLayoutField } from "./widgetTypes-CisWqKm9.js";
//#region src/renderer/extensions/vueNodes/widgets/components/layout/WidgetLayoutField.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1 = {
	key: 0,
	"data-testid": "widget-layout-field-label",
	class: "content-center-safe truncate"
};
var _hoisted_2 = { class: "relative min-w-0 flex-1" };
//#endregion
//#region src/renderer/extensions/vueNodes/widgets/components/layout/WidgetLayoutField.vue
var WidgetLayoutField_default = /* @__PURE__ */ defineComponent({
	__name: "WidgetLayoutField",
	props: {
		widget: {},
		rootClass: {},
		noBorder: { type: Boolean }
	},
	setup(__props) {
		const hideLayoutField = useHideLayoutField();
		const borderStyle = computed(() => cn("focus-within:ring focus-within:ring-component-node-widget-background-highlighted", __props.widget.borderStyle));
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", { class: normalizeClass(unref(cn)("grid min-w-0 grid-cols-subgrid justify-between gap-2 text-node-component-slot-text", __props.rootClass)) }, [!unref(hideLayoutField) ? (openBlock(), createElementBlock("div", _hoisted_1, [__props.widget.name ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [createTextVNode(toDisplayString(__props.widget.displayLabel ?? (__props.widget.label || __props.widget.name)), 1)], 64)) : createCommentVNode("", true)])) : createCommentVNode("", true), createBaseVNode("div", _hoisted_2, [createBaseVNode("div", {
				class: normalizeClass(unref(cn)("min-w-0 cursor-default rounded-md transition-all", !__props.noBorder && borderStyle.value)),
				onPointerdown: _cache[0] || (_cache[0] = withModifiers(() => {}, ["stop"])),
				onPointermove: _cache[1] || (_cache[1] = withModifiers(() => {}, ["stop"])),
				onPointerup: _cache[2] || (_cache[2] = withModifiers(() => {}, ["stop"]))
			}, [renderSlot(_ctx.$slots, "default", { borderStyle: borderStyle.value })], 34)])], 2);
		};
	}
});
//#endregion
export { WidgetLayoutField_default as t };
