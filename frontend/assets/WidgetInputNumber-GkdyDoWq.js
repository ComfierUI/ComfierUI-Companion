import "./rolldown-runtime-xtsTai4I.js";
import { $ as mergeProps, Et as withCtx, F as createBaseVNode, G as defineComponent, I as createBlock, Jt as normalizeClass, Kt as unref, Lt as ref, P as computed, Q as mergeModels, U as createVNode, Wt as toValue, Xt as normalizeStyle, ht as resolveDynamicComponent, lt as openBlock, yt as useModel } from "./vendor-vue-core-C1utdb0s.js";
import { A as SliderRoot_default, D as SliderTrack_default, O as SliderThumb_default } from "./vendor-reka-ui-tdehH9A1.js";
import { t as cn } from "./src-DI1bBfrb.js";
import { n as NumberField_default, t as NumberFieldInput_default } from "./NumberFieldInput-CILJZ6M6.js";
import { a as useWidgetHeight } from "./widgetTypes-CisWqKm9.js";
import { t as Slider_default } from "./Slider-eQb4a5yt.js";
import { a as filterWidgetProps, i as STANDARD_EXCLUDED_PROPS } from "./widgetPropFilter-RwwBg40l.js";
import { t as WidgetInputBaseClass } from "./layout-BZWBHixI.js";
import { t as WidgetLayoutField_default } from "./WidgetLayoutField-BUL5w3Gs.js";
import { t as WidgetInputNumberInput_default } from "./WidgetInputNumberInput-DNJPeCnS.js";
import { t as WidgetWithControl_default } from "./WidgetWithControl-CY9DWnWx.js";
//#region src/components/gradientslider/gradients.ts
function stopsToGradient(stops) {
	if (!stops.length) return "transparent";
	return `linear-gradient(to right, ${stops.map(({ offset, color: [r, g, b] }) => `rgb(${r},${g},${b}) ${offset * 100}%`).join(", ")})`;
}
function interpolateStops(stops, t) {
	if (!stops.length) return "transparent";
	const clamped = Math.max(0, Math.min(1, t));
	if (clamped <= stops[0].offset) {
		const [r, g, b] = stops[0].color;
		return `rgb(${r},${g},${b})`;
	}
	for (let i = 0; i < stops.length - 1; i++) {
		const { offset: o1, color: [r1, g1, b1] } = stops[i];
		const { offset: o2, color: [r2, g2, b2] } = stops[i + 1];
		if (clamped >= o1 && clamped <= o2) {
			const f = o2 === o1 ? 0 : (clamped - o1) / (o2 - o1);
			return `rgb(${Math.round(r1 + (r2 - r1) * f)},${Math.round(g1 + (g2 - g1) * f)},${Math.round(b1 + (b2 - b1) * f)})`;
		}
	}
	const [r, g, b] = stops[stops.length - 1].color;
	return `rgb(${r},${g},${b})`;
}
//#endregion
//#region src/components/gradientslider/GradientSlider.vue
var GradientSlider_default = /* @__PURE__ */ defineComponent({
	__name: "GradientSlider",
	props: /*@__PURE__*/ mergeModels({
		stops: {},
		min: { default: 0 },
		max: { default: 100 },
		step: { default: 1 },
		disabled: {
			type: Boolean,
			default: false
		},
		ariaLabel: {}
	}, {
		"modelValue": { required: true },
		"modelModifiers": {}
	}),
	emits: ["update:modelValue"],
	setup(__props) {
		const modelValue = useModel(__props, "modelValue");
		const sliderValue = computed({
			get: () => [modelValue.value],
			set: (v) => {
				if (v.length) modelValue.value = v[0];
			}
		});
		const gradient = computed(() => stopsToGradient(__props.stops));
		const thumbColor = computed(() => {
			const t = __props.max === __props.min ? 0 : (modelValue.value - __props.min) / (__props.max - __props.min);
			return interpolateStops(__props.stops, t);
		});
		const pressed = ref(false);
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(SliderRoot_default), {
				modelValue: sliderValue.value,
				"onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => sliderValue.value = $event),
				min: __props.min,
				max: __props.max,
				step: __props.step,
				disabled: __props.disabled,
				class: normalizeClass(unref(cn)("relative flex w-full touch-none items-center select-none", "data-disabled:opacity-50")),
				style: { "--reka-slider-thumb-transform": "translate(-50%, -50%)" },
				onSlideStart: _cache[1] || (_cache[1] = ($event) => pressed.value = true),
				onSlideMove: _cache[2] || (_cache[2] = ($event) => pressed.value = true),
				onSlideEnd: _cache[3] || (_cache[3] = ($event) => pressed.value = false)
			}, {
				default: withCtx(() => [createVNode(unref(SliderTrack_default), {
					class: normalizeClass(unref(cn)("relative h-2.5 w-full grow cursor-pointer overflow-visible rounded-full", "before:absolute before:-inset-2 before:block before:bg-transparent")),
					style: normalizeStyle({ background: gradient.value })
				}, {
					default: withCtx(() => [createVNode(unref(SliderThumb_default), {
						class: normalizeClass(unref(cn)("top-1/2 block size-4 shrink-0 cursor-grab rounded-full shadow-md ring-1 ring-black/25", "transition-[color,box-shadow,background-color]", "before:absolute before:-inset-1.5 before:block before:rounded-full before:bg-transparent", "hover:ring-2 hover:ring-black/40 focus-visible:ring-2 focus-visible:ring-black/40 focus-visible:outline-hidden", "disabled:pointer-events-none disabled:opacity-50", { "cursor-grabbing": pressed.value })),
						style: normalizeStyle({ backgroundColor: thumbColor.value }),
						"aria-label": __props.ariaLabel
					}, null, 8, [
						"class",
						"style",
						"aria-label"
					])]),
					_: 1
				}, 8, ["class", "style"])]),
				_: 1
			}, 8, [
				"modelValue",
				"min",
				"max",
				"step",
				"disabled",
				"class"
			]);
		};
	}
});
//#endregion
//#region src/renderer/extensions/vueNodes/widgets/composables/useNumberStepCalculation.ts
/**
* Shared composable for calculating step values in number input widgets
* Handles both explicit step2 values and precision-derived steps
*/
function useNumberStepCalculation(options, precisionArg, returnUndefinedForDefault = false) {
	return computed(() => {
		const precision = toValue(precisionArg);
		if (options?.step2 !== void 0) return options.step2;
		const step = options?.step;
		if (step !== void 0 && step > 10) return step / 10;
		if (precision === void 0) return returnUndefinedForDefault ? void 0 : 0;
		if (precision === 0) return 1;
		const calculatedStep = 1 / Math.pow(10, precision);
		return returnUndefinedForDefault ? calculatedStep : Number(calculatedStep.toFixed(precision));
	});
}
//#endregion
//#region src/renderer/extensions/vueNodes/widgets/components/WidgetInputNumberGradientSlider.vue
var WidgetInputNumberGradientSlider_default = /* @__PURE__ */ defineComponent({
	__name: "WidgetInputNumberGradientSlider",
	props: /*@__PURE__*/ mergeModels({ widget: {} }, {
		"modelValue": { default: 0 },
		"modelModifiers": {}
	}),
	emits: ["update:modelValue"],
	setup(__props) {
		const DEFAULT_GRADIENT_STOPS = [{
			offset: 0,
			color: [
				0,
				0,
				0
			]
		}, {
			offset: 1,
			color: [
				255,
				255,
				255
			]
		}];
		const modelValue = useModel(__props, "modelValue");
		const gradientStops = computed(() => {
			const stops = __props.widget.options?.gradient_stops;
			if (stops && stops.length >= 2) return stops;
			return DEFAULT_GRADIENT_STOPS;
		});
		const precision = computed(() => {
			const p = __props.widget.options?.precision;
			return typeof p === "number" && p >= 0 ? p : void 0;
		});
		const stepValue = useNumberStepCalculation(__props.widget.options, precision, true);
		return (_ctx, _cache) => {
			return openBlock(), createBlock(WidgetLayoutField_default, { widget: __props.widget }, {
				default: withCtx(() => [createBaseVNode("div", { class: normalizeClass(unref(cn)(unref(WidgetInputBaseClass), "flex items-center gap-2 pr-2 pl-3", unref(useWidgetHeight)())) }, [createVNode(GradientSlider_default, {
					modelValue: modelValue.value,
					"onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => modelValue.value = $event),
					stops: gradientStops.value,
					min: __props.widget.options?.min ?? 0,
					max: __props.widget.options?.max ?? 100,
					step: unref(stepValue),
					disabled: __props.widget.options?.disabled,
					"aria-label": __props.widget.name,
					class: "min-w-0 flex-1"
				}, null, 8, [
					"modelValue",
					"stops",
					"min",
					"max",
					"step",
					"disabled",
					"aria-label"
				]), createVNode(NumberField_default, {
					modelValue: modelValue.value,
					"onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => modelValue.value = $event),
					step: unref(stepValue),
					min: __props.widget.options?.min,
					max: __props.widget.options?.max,
					disabled: __props.widget.options?.disabled,
					"format-options": {
						minimumFractionDigits: precision.value,
						maximumFractionDigits: precision.value
					},
					class: "h-auto w-16 shrink-0 bg-transparent hover:bg-transparent"
				}, {
					default: withCtx(() => [createVNode(NumberFieldInput_default, {
						"aria-label": __props.widget.name,
						class: "text-xs"
					}, null, 8, ["aria-label"])]),
					_: 1
				}, 8, [
					"modelValue",
					"step",
					"min",
					"max",
					"disabled",
					"format-options"
				])], 2)]),
				_: 1
			}, 8, ["widget"]);
		};
	}
});
//#endregion
//#region src/renderer/extensions/vueNodes/widgets/components/WidgetInputNumberSlider.vue
var WidgetInputNumberSlider_default = /* @__PURE__ */ defineComponent({
	__name: "WidgetInputNumberSlider",
	props: /*@__PURE__*/ mergeModels({ widget: {} }, {
		"modelValue": { default: 0 },
		"modelModifiers": {}
	}),
	emits: ["update:modelValue"],
	setup(__props) {
		const modelValue = useModel(__props, "modelValue");
		const updateLocalValue = (newValue) => {
			if (newValue?.length) modelValue.value = newValue[0];
		};
		const filteredProps = computed(() => filterWidgetProps(__props.widget.options, STANDARD_EXCLUDED_PROPS));
		const p = __props.widget.options?.precision;
		const precision = typeof p === "number" && p >= 0 ? p : void 0;
		const stepValue = useNumberStepCalculation(__props.widget.options, precision, true);
		return (_ctx, _cache) => {
			return openBlock(), createBlock(WidgetLayoutField_default, { widget: __props.widget }, {
				default: withCtx(() => [createBaseVNode("div", { class: normalizeClass(unref(cn)(unref(WidgetInputBaseClass), "flex items-center gap-2 pr-2 pl-3 not-disabled:hover:bg-component-node-widget-background-hovered", unref(useWidgetHeight)())) }, [createVNode(Slider_default, mergeProps({ "model-value": [modelValue.value] }, filteredProps.value, {
					class: "grow text-xs",
					step: unref(stepValue),
					"aria-label": __props.widget.name,
					"onUpdate:modelValue": updateLocalValue
				}), null, 16, [
					"model-value",
					"step",
					"aria-label"
				]), createVNode(NumberField_default, {
					modelValue: modelValue.value,
					"onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => modelValue.value = $event),
					step: unref(stepValue),
					min: __props.widget.options?.min,
					max: __props.widget.options?.max,
					disabled: __props.widget.options?.disabled,
					"format-options": {
						minimumFractionDigits: unref(precision),
						maximumFractionDigits: unref(precision)
					},
					class: "h-auto w-16 shrink-0 bg-transparent hover:bg-transparent"
				}, {
					default: withCtx(() => [createVNode(NumberFieldInput_default, {
						"aria-label": __props.widget.name,
						class: "text-xs"
					}, null, 8, ["aria-label"])]),
					_: 1
				}, 8, [
					"modelValue",
					"step",
					"min",
					"max",
					"disabled",
					"format-options"
				])], 2)]),
				_: 1
			}, 8, ["widget"]);
		};
	}
});
//#endregion
//#region src/renderer/extensions/vueNodes/widgets/components/WidgetInputNumber.vue
var WidgetInputNumber_default = /* @__PURE__ */ defineComponent({
	__name: "WidgetInputNumber",
	props: /*@__PURE__*/ mergeModels({ widget: {} }, {
		"modelValue": { default: 0 },
		"modelModifiers": {}
	}),
	emits: ["update:modelValue"],
	setup(__props) {
		const props = __props;
		const modelValue = useModel(__props, "modelValue");
		const controlWidget = computed(() => props.widget.controlWidget ? props.widget : null);
		const widgetComponent = computed(() => {
			switch (props.widget.type) {
				case "gradientslider": return WidgetInputNumberGradientSlider_default;
				case "slider": return WidgetInputNumberSlider_default;
				default: return WidgetInputNumberInput_default;
			}
		});
		return (_ctx, _cache) => {
			return controlWidget.value ? (openBlock(), createBlock(WidgetWithControl_default, {
				key: 0,
				modelValue: modelValue.value,
				"onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => modelValue.value = $event),
				widget: controlWidget.value,
				component: widgetComponent.value
			}, null, 8, [
				"modelValue",
				"widget",
				"component"
			])) : (openBlock(), createBlock(resolveDynamicComponent(widgetComponent.value), mergeProps({
				key: 1,
				modelValue: modelValue.value,
				"onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => modelValue.value = $event),
				widget: __props.widget
			}, _ctx.$attrs), null, 16, ["modelValue", "widget"]));
		};
	}
});
//#endregion
export { WidgetInputNumber_default as default };
