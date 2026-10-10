import "./rolldown-runtime-xtsTai4I.js";
import { $ as mergeProps, Et as withCtx, G as defineComponent, H as createTextVNode, Jt as normalizeClass, L as createCommentVNode, P as computed, R as createElementBlock, U as createVNode, Zt as toDisplayString, lt as openBlock } from "./vendor-vue-core-C1utdb0s.js";
import { t as Button_default } from "./Button-j0oCzR82.js";
import { a as filterWidgetProps, t as BADGE_EXCLUDED_PROPS } from "./widgetPropFilter-RwwBg40l.js";
//#region src/renderer/extensions/vueNodes/widgets/components/WidgetButton.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1 = { class: "flex flex-col gap-1" };
//#endregion
//#region src/renderer/extensions/vueNodes/widgets/components/WidgetButton.vue
var WidgetButton_default = /* @__PURE__ */ defineComponent({
	__name: "WidgetButton",
	props: { widget: {} },
	setup(__props) {
		const props = __props;
		const BUTTON_EXCLUDED_PROPS = [...BADGE_EXCLUDED_PROPS, "iconClass"];
		const filteredProps = computed(() => filterWidgetProps(props.widget.options, BUTTON_EXCLUDED_PROPS));
		const handleClick = () => {
			props.widget.callback?.(void 0);
		};
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", _hoisted_1, [createVNode(Button_default, mergeProps({
				class: "w-full border-0 bg-component-node-widget-background p-2 text-base-foreground",
				"aria-label": __props.widget.label,
				size: "sm",
				variant: "textonly"
			}, filteredProps.value, { onClick: handleClick }), {
				default: withCtx(() => [createTextVNode(toDisplayString(__props.widget.label ?? __props.widget.name) + " ", 1), __props.widget.options?.iconClass ? (openBlock(), createElementBlock("i", {
					key: 0,
					class: normalizeClass(__props.widget.options.iconClass)
				}, null, 2)) : createCommentVNode("", true)]),
				_: 1
			}, 16, ["aria-label"])]);
		};
	}
});
//#endregion
export { WidgetButton_default as default };
