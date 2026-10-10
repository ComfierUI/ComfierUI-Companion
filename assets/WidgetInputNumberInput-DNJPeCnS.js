import "./rolldown-runtime-xtsTai4I.js";
import { Dt as withDirectives, Et as withCtx, F as createBaseVNode, G as defineComponent, I as createBlock, Jt as normalizeClass, Kt as unref, P as computed, Q as mergeModels, Xt as normalizeStyle, ft as renderSlot, lt as openBlock, mt as resolveDirective, yt as useModel } from "./vendor-vue-core-C1utdb0s.js";
import { r as useI18n } from "./vendor-i18n-BZvE7WBQ.js";
import { t as cn } from "./src-DI1bBfrb.js";
import { a as evaluateInput } from "./NumberFieldInput-CILJZ6M6.js";
import { a as useWidgetHeight } from "./widgetTypes-CisWqKm9.js";
import { t as ScrubableNumberInput_default } from "./ScrubableNumberInput-D-uu5ru4.js";
import { a as filterWidgetProps, n as INPUT_EXCLUDED_PROPS } from "./widgetPropFilter-RwwBg40l.js";
import { t as WidgetInputBaseClass } from "./layout-BZWBHixI.js";
import { t as WidgetLayoutField_default } from "./WidgetLayoutField-BUL5w3Gs.js";
//#region src/renderer/extensions/vueNodes/widgets/components/WidgetInputNumberInput.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1 = { class: "pointer-events-none absolute size-full overflow-clip rounded-md" };
//#endregion
//#region src/renderer/extensions/vueNodes/widgets/components/WidgetInputNumberInput.vue
var WidgetInputNumberInput_default = /* @__PURE__ */ defineComponent({
	__name: "WidgetInputNumberInput",
	props: /*@__PURE__*/ mergeModels({
		widget: {},
		rootClass: {}
	}, {
		"modelValue": { default: 0 },
		"modelModifiers": {}
	}),
	emits: ["update:modelValue"],
	setup(__props) {
		const { locale } = useI18n();
		const props = __props;
		function formatNumber(value, options) {
			return new Intl.NumberFormat(locale.value, options).format(value);
		}
		const decimalSeparator = computed(() => formatNumber(1.1).replace(/\p{Number}/gu, ""));
		const groupSeparator = computed(() => formatNumber(11111).replace(/\p{Number}/gu, ""));
		function unformatValue(value) {
			return value.replaceAll(groupSeparator.value, "").replaceAll(decimalSeparator.value, ".");
		}
		const modelValue = useModel(__props, "modelValue");
		const formattedValue = computed(() => {
			const value = modelValue.value;
			if (value === "" || !isFinite(value)) return `${value}`;
			const options = { useGrouping: useGrouping.value };
			if (precision.value !== void 0) {
				options.minimumFractionDigits = precision.value;
				options.maximumFractionDigits = precision.value;
			}
			return formatNumber(value, options);
		});
		function parseWidgetValue(raw) {
			return evaluateInput(unformatValue(raw));
		}
		const filteredProps = computed(() => {
			return filterWidgetProps(props.widget.options, INPUT_EXCLUDED_PROPS);
		});
		const isDisabled = computed(() => props.widget.options?.disabled ?? false);
		const precision = computed(() => {
			const p = props.widget.options?.precision;
			return typeof p === "number" && p >= 0 ? p : void 0;
		});
		const stepValue = computed(() => {
			if (props.widget.options?.step2 !== void 0) return props.widget.options.step2;
			const step = props.widget.options?.step;
			if (step !== void 0 && step > 10) return step / 10;
			if (precision.value !== void 0) {
				if (precision.value === 0) return 1;
				return Number((1 / Math.pow(10, precision.value)).toFixed(precision.value));
			}
			return 0;
		});
		const useGrouping = computed(() => {
			return props.widget.options?.useGrouping === true;
		});
		const buttonsDisabled = computed(() => {
			const currentValue = modelValue.value ?? 0;
			return !Number.isFinite(currentValue) || Math.abs(currentValue) > Number.MAX_SAFE_INTEGER;
		});
		const buttonTooltip = computed(() => {
			if (buttonsDisabled.value) return "Increment/decrement disabled: value exceeds JavaScript precision limit (±2^53)";
			return null;
		});
		const sliderWidth = computed(() => {
			const { max, min, step } = filteredProps.value;
			if (min === void 0 || max === void 0 || step === void 0 || (max - min) / step >= 100) return 0;
			return ((modelValue.value - min) / (max - min) * 100).toFixed(0);
		});
		const inputAriaAttrs = computed(() => ({
			"aria-valuenow": modelValue.value,
			"aria-valuemin": filteredProps.value.min,
			"aria-valuemax": filteredProps.value.max,
			role: "spinbutton",
			tabindex: 0
		}));
		return (_ctx, _cache) => {
			const _directive_tooltip = resolveDirective("tooltip");
			return openBlock(), createBlock(WidgetLayoutField_default, {
				widget: __props.widget,
				"root-class": props.rootClass
			}, {
				default: withCtx(() => [withDirectives((openBlock(), createBlock(ScrubableNumberInput_default, {
					modelValue: modelValue.value,
					"onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => modelValue.value = $event),
					"aria-label": __props.widget.name,
					min: filteredProps.value.min,
					max: filteredProps.value.max,
					step: stepValue.value,
					"display-value": formattedValue.value,
					disabled: isDisabled.value,
					"hide-buttons": buttonsDisabled.value,
					"parse-value": parseWidgetValue,
					"input-attrs": inputAriaAttrs.value,
					class: normalizeClass(unref(cn)(unref(WidgetInputBaseClass), "relative flex grow text-xs", unref(useWidgetHeight)()))
				}, {
					background: withCtx(() => [createBaseVNode("div", _hoisted_1, [createBaseVNode("div", {
						class: "size-full bg-primary-background/15",
						style: normalizeStyle({ width: `${sliderWidth.value}%` })
					}, null, 4)])]),
					default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
					_: 3
				}, 8, [
					"modelValue",
					"aria-label",
					"min",
					"max",
					"step",
					"display-value",
					"disabled",
					"hide-buttons",
					"input-attrs",
					"class"
				])), [[_directive_tooltip, buttonTooltip.value]])]),
				_: 3
			}, 8, ["widget", "root-class"]);
		};
	}
});
//#endregion
export { WidgetInputNumberInput_default as t };
