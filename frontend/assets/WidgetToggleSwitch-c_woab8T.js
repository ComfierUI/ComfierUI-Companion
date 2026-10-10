import "./rolldown-runtime-xtsTai4I.js";
import { Et as withCtx, G as defineComponent, H as createTextVNode, I as createBlock, Jt as normalizeClass, Kt as unref, P as computed, Q as mergeModels, R as createElementBlock, U as createVNode, Zt as toDisplayString, lt as openBlock, yt as useModel } from "./vendor-vue-core-C1utdb0s.js";
import { r as useI18n } from "./vendor-i18n-BZvE7WBQ.js";
import { t as cn } from "./src-DI1bBfrb.js";
import { i as useHideLayoutField } from "./widgetTypes-CisWqKm9.js";
import { t as Switch_default } from "./Switch-BAw3-YcG.js";
import { n as ToggleGroup_default, t as ToggleGroupItem_default } from "./ToggleGroupItem-Da4A26JJ.js";
import "./toggle-group-B0brfUuj.js";
import { t as WidgetInputBaseClass } from "./layout-BZWBHixI.js";
import { t as WidgetLayoutField_default } from "./WidgetLayoutField-BUL5w3Gs.js";
//#endregion
//#region src/renderer/extensions/vueNodes/widgets/components/WidgetToggleSwitch.vue
var WidgetToggleSwitch_default = /* @__PURE__ */ defineComponent({
	__name: "WidgetToggleSwitch",
	props: /*@__PURE__*/ mergeModels({ widget: {} }, {
		"modelValue": { type: Boolean },
		"modelModifiers": {}
	}),
	emits: ["update:modelValue"],
	setup(__props) {
		const modelValue = useModel(__props, "modelValue");
		const hideLayoutField = useHideLayoutField();
		const { t } = useI18n();
		const hasLabels = computed(() => {
			return __props.widget.options?.on != null || __props.widget.options?.off != null;
		});
		function handleOptionChange(value) {
			if (value) modelValue.value = value === "on";
		}
		return (_ctx, _cache) => {
			return openBlock(), createBlock(WidgetLayoutField_default, {
				widget: __props.widget,
				"no-border": !hasLabels.value
			}, {
				default: withCtx(({ borderStyle }) => [hasLabels.value ? (openBlock(), createBlock(unref(ToggleGroup_default), {
					key: 0,
					type: "single",
					"model-value": modelValue.value ? "on" : "off",
					disabled: Boolean(__props.widget.options?.read_only),
					class: normalizeClass(unref(cn)(unref(WidgetInputBaseClass), "flex w-full min-w-0 items-center justify-center gap-1 p-1")),
					"onUpdate:modelValue": _cache[0] || (_cache[0] = (v) => handleOptionChange(v))
				}, {
					default: withCtx(() => [createVNode(unref(ToggleGroupItem_default), {
						value: "off",
						size: "sm",
						class: "flex-1 truncate"
					}, {
						default: withCtx(() => [createTextVNode(toDisplayString(__props.widget.options?.off ?? unref(t)("widgets.boolean.false")), 1)]),
						_: 1
					}), createVNode(unref(ToggleGroupItem_default), {
						value: "on",
						size: "sm",
						class: "flex-1 truncate"
					}, {
						default: withCtx(() => [createTextVNode(toDisplayString(__props.widget.options?.on ?? unref(t)("widgets.boolean.true")), 1)]),
						_: 1
					})]),
					_: 1
				}, 8, [
					"model-value",
					"disabled",
					"class"
				])) : (openBlock(), createElementBlock("div", {
					key: 1,
					class: normalizeClass(unref(cn)("-m-1 flex w-fit items-center gap-2 rounded-full p-1", unref(hideLayoutField) || "ml-auto", borderStyle))
				}, [createVNode(Switch_default, {
					modelValue: modelValue.value,
					"onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => modelValue.value = $event),
					disabled: Boolean(__props.widget.options?.disabled),
					readonly: Boolean(__props.widget.options?.read_only),
					"aria-label": __props.widget.label || __props.widget.name
				}, null, 8, [
					"modelValue",
					"disabled",
					"readonly",
					"aria-label"
				])], 2))]),
				_: 1
			}, 8, ["widget", "no-border"]);
		};
	}
});
//#endregion
export { WidgetToggleSwitch_default as default };
