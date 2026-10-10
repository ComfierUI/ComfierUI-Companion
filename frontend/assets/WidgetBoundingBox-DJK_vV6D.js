import "./rolldown-runtime-xtsTai4I.js";
import { F as createBaseVNode, G as defineComponent, P as computed, Q as mergeModels, R as createElementBlock, U as createVNode, Zt as toDisplayString, lt as openBlock, yt as useModel } from "./vendor-vue-core-C1utdb0s.js";
import { t as ScrubableNumberInput_default } from "./ScrubableNumberInput-D-uu5ru4.js";
//#region src/components/boundingbox/WidgetBoundingBox.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1 = {
	class: "grid grid-cols-[auto_1fr] gap-x-2 gap-y-1",
	"data-testid": "bounding-box"
};
var _hoisted_2 = { class: "content-center text-xs text-node-component-slot-text" };
var _hoisted_3 = { class: "content-center text-xs text-node-component-slot-text" };
var _hoisted_4 = { class: "content-center text-xs text-node-component-slot-text" };
var _hoisted_5 = { class: "content-center text-xs text-node-component-slot-text" };
//#endregion
//#region src/components/boundingbox/WidgetBoundingBox.vue
var WidgetBoundingBox_default = /* @__PURE__ */ defineComponent({
	__name: "WidgetBoundingBox",
	props: /*@__PURE__*/ mergeModels({ disabled: {
		type: Boolean,
		default: false
	} }, {
		"modelValue": { default: () => ({
			x: 0,
			y: 0,
			width: 512,
			height: 512
		}) },
		"modelModifiers": {}
	}),
	emits: ["update:modelValue"],
	setup(__props) {
		const modelValue = useModel(__props, "modelValue");
		const x = computed({
			get: () => modelValue.value.x,
			set: (x) => {
				modelValue.value = {
					...modelValue.value,
					x
				};
			}
		});
		const y = computed({
			get: () => modelValue.value.y,
			set: (y) => {
				modelValue.value = {
					...modelValue.value,
					y
				};
			}
		});
		const width = computed({
			get: () => modelValue.value.width,
			set: (width) => {
				modelValue.value = {
					...modelValue.value,
					width
				};
			}
		});
		const height = computed({
			get: () => modelValue.value.height,
			set: (height) => {
				modelValue.value = {
					...modelValue.value,
					height
				};
			}
		});
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", _hoisted_1, [
				createBaseVNode("label", _hoisted_2, toDisplayString(_ctx.$t("boundingBox.x")), 1),
				createVNode(ScrubableNumberInput_default, {
					modelValue: x.value,
					"onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => x.value = $event),
					min: 0,
					step: 1,
					disabled: __props.disabled,
					"data-testid": "bounding-box-x"
				}, null, 8, ["modelValue", "disabled"]),
				createBaseVNode("label", _hoisted_3, toDisplayString(_ctx.$t("boundingBox.y")), 1),
				createVNode(ScrubableNumberInput_default, {
					modelValue: y.value,
					"onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => y.value = $event),
					min: 0,
					step: 1,
					disabled: __props.disabled,
					"data-testid": "bounding-box-y"
				}, null, 8, ["modelValue", "disabled"]),
				createBaseVNode("label", _hoisted_4, toDisplayString(_ctx.$t("boundingBox.width")), 1),
				createVNode(ScrubableNumberInput_default, {
					modelValue: width.value,
					"onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => width.value = $event),
					min: 1,
					step: 1,
					disabled: __props.disabled,
					"data-testid": "bounding-box-width"
				}, null, 8, ["modelValue", "disabled"]),
				createBaseVNode("label", _hoisted_5, toDisplayString(_ctx.$t("boundingBox.height")), 1),
				createVNode(ScrubableNumberInput_default, {
					modelValue: height.value,
					"onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => height.value = $event),
					min: 1,
					step: 1,
					disabled: __props.disabled,
					"data-testid": "bounding-box-height"
				}, null, 8, ["modelValue", "disabled"])
			]);
		};
	}
});
//#endregion
export { WidgetBoundingBox_default as t };
