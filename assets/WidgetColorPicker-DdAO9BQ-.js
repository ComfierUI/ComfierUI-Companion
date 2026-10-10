import "./rolldown-runtime-xtsTai4I.js";
import { Et as withCtx, G as defineComponent, I as createBlock, Kt as unref, Lt as ref, Q as mergeModels, St as watch, U as createVNode, lt as openBlock, yt as useModel } from "./vendor-vue-core-C1utdb0s.js";
import { c as isColorFormat, r as hexToInt, s as intToHex, v as toHexFromFormat } from "./colorUtil-BzdMMd-Y.js";
import { t as ColorPicker_default } from "./ColorPicker-D34wwQO7.js";
import { t as WidgetLayoutField_default } from "./WidgetLayoutField-BUL5w3Gs.js";
//#endregion
//#region src/renderer/extensions/vueNodes/widgets/components/WidgetColorPicker.vue
var WidgetColorPicker_default = /* @__PURE__ */ defineComponent({
	__name: "WidgetColorPicker",
	props: /*@__PURE__*/ mergeModels({ widget: {} }, {
		"modelValue": { required: true },
		"modelModifiers": {}
	}),
	emits: ["update:modelValue"],
	setup(__props) {
		const modelValue = useModel(__props, "modelValue");
		const format = __props.widget.options?.format === "int" || isColorFormat(__props.widget.options?.format) ? __props.widget.options.format : "hex";
		function toPickerValue(value) {
			if (format === "int") return typeof value === "number" ? intToHex(value) : "#000000";
			return toHexFromFormat(value || "#000000", format);
		}
		const localValue = ref(toPickerValue(modelValue.value));
		watch(modelValue, (newVal) => {
			localValue.value = toPickerValue(newVal);
		});
		function onUpdate(val) {
			localValue.value = val;
			modelValue.value = format === "int" ? hexToInt(val) : val;
		}
		return (_ctx, _cache) => {
			return openBlock(), createBlock(WidgetLayoutField_default, { widget: __props.widget }, {
				default: withCtx(() => [createVNode(ColorPicker_default, {
					modelValue: localValue.value,
					"onUpdate:modelValue": [_cache[0] || (_cache[0] = ($event) => localValue.value = $event), onUpdate],
					alpha: unref(format) !== "int"
				}, null, 8, ["modelValue", "alpha"])]),
				_: 1
			}, 8, ["widget"]);
		};
	}
});
//#endregion
export { WidgetColorPicker_default as default };
