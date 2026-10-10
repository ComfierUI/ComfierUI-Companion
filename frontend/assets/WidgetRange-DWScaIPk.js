import "./rolldown-runtime-xtsTai4I.js";
import { Lt as clamp } from "./vendor-other-BPEcPQTD.js";
import { E as withModifiers, F as createBaseVNode, G as defineComponent, Ht as toRef, I as createBlock, Jt as normalizeClass, Kt as unref, L as createCommentVNode, O as Fragment, P as computed, Q as mergeModels, R as createElementBlock, St as watch, U as createVNode, Xt as normalizeStyle, dt as renderList, lt as openBlock, vt as useId, xt as useTemplateRef, yt as useModel } from "./vendor-vue-core-C1utdb0s.js";
import { O as normalize, go as useNodeOutputStore } from "./layoutStore-CZsuzg91.js";
import { t as cn } from "./src-DI1bBfrb.js";
import { t as ScrubableNumberInput_default } from "./ScrubableNumberInput-D-uu5ru4.js";
import { n as singleValueExtractor, r as useUpstreamValue } from "./useUpstreamValue-8u8bRmGL.js";
import { t as histogramToPath } from "./histogramUtil-nwm_kqcs.js";
import { t as useRangeEditor } from "./useRangeEditor-CWDD5mNu.js";
//#region src/components/range/rangeUtils.ts
function positionToGamma(position) {
	const clamped = clamp(position, .001, .999);
	return -Math.log2(clamped);
}
function gammaToPosition(gamma) {
	return Math.pow(2, -gamma);
}
function isRangeValue(value) {
	if (typeof value !== "object" || value === null || Array.isArray(value)) return false;
	const v = value;
	const hasFiniteBounds = Number.isFinite(v.min) && Number.isFinite(v.max);
	const hasValidMidpoint = v.midpoint === void 0 || Number.isFinite(v.midpoint);
	return hasFiniteBounds && hasValidMidpoint;
}
//#endregion
//#region src/components/range/RangeEditor.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1 = { key: 0 };
var _hoisted_2 = ["id"];
var _hoisted_3 = ["offset", "stop-color"];
var _hoisted_4 = ["fill"];
var _hoisted_5 = ["d"];
var _hoisted_6 = ["x", "width"];
var _hoisted_7 = ["width"];
var _hoisted_8 = ["x", "width"];
//#endregion
//#region src/components/range/RangeEditor.vue
var RangeEditor_default = /* @__PURE__ */ defineComponent({
	__name: "RangeEditor",
	props: /*@__PURE__*/ mergeModels({
		display: { default: "plain" },
		gradientStops: {},
		showMidpoint: {
			type: Boolean,
			default: false
		},
		midpointScale: { default: "linear" },
		histogram: {},
		disabled: {
			type: Boolean,
			default: false
		},
		valueMin: { default: 0 },
		valueMax: { default: 1 }
	}, {
		"modelValue": { required: true },
		"modelModifiers": {}
	}),
	emits: ["update:modelValue"],
	setup(__props) {
		const modelValue = useModel(__props, "modelValue");
		const trackRef = useTemplateRef("trackRef");
		const gradientId = useId();
		const { handleTrackPointerDown, startDrag } = useRangeEditor({
			trackRef,
			modelValue,
			valueMin: toRef(() => __props.valueMin),
			valueMax: toRef(() => __props.valueMax),
			showMidpoint: toRef(() => __props.showMidpoint)
		});
		function onTrackPointerDown(e) {
			if (!__props.disabled) handleTrackPointerDown(e);
		}
		const isIntegerRange = computed(() => __props.valueMax - __props.valueMin >= 2);
		const step = computed(() => isIntegerRange.value ? 1 : .01);
		function formatValue(v) {
			return isIntegerRange.value ? Math.round(v).toString() : v.toFixed(2);
		}
		const minNorm = computed(() => normalize(modelValue.value.min, __props.valueMin, __props.valueMax));
		const maxNorm = computed(() => normalize(modelValue.value.max, __props.valueMin, __props.valueMax));
		const computedStops = computed(() => __props.gradientStops ?? [{
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
		}]);
		const midpointPercent = computed(() => {
			const { min, max, midpoint } = modelValue.value;
			if (midpoint === void 0) return 0;
			const midAbs = min + midpoint * (max - min);
			return normalize(midAbs, __props.valueMin, __props.valueMax) * 100;
		});
		const minValue = computed({
			get: () => modelValue.value.min,
			set: (min) => {
				modelValue.value = {
					...modelValue.value,
					min: Math.min(clamp(min, __props.valueMin, __props.valueMax), modelValue.value.max)
				};
			}
		});
		const maxValue = computed({
			get: () => modelValue.value.max,
			set: (max) => {
				modelValue.value = {
					...modelValue.value,
					max: Math.max(clamp(max, __props.valueMin, __props.valueMax), modelValue.value.min)
				};
			}
		});
		const midpointValue = computed({
			get: () => {
				const pos = modelValue.value.midpoint ?? .5;
				return __props.midpointScale === "gamma" ? positionToGamma(pos) : pos;
			},
			set: (val) => {
				const position = __props.midpointScale === "gamma" ? clamp(gammaToPosition(val), 0, 1) : clamp(val, 0, 1);
				modelValue.value = {
					...modelValue.value,
					midpoint: position
				};
			}
		});
		const histogramPath = computed(() => __props.histogram ? histogramToPath(__props.histogram) : "");
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", null, [createBaseVNode("div", {
				ref_key: "trackRef",
				ref: trackRef,
				class: "relative select-none",
				onPointerdown: withModifiers(onTrackPointerDown, ["stop"]),
				onContextmenu: _cache[3] || (_cache[3] = withModifiers(() => {}, ["prevent", "stop"]))
			}, [(openBlock(), createElementBlock("svg", {
				viewBox: "0 0 1 1",
				preserveAspectRatio: "none",
				class: normalizeClass(unref(cn)("block w-full rounded-sm bg-node-component-surface", __props.display === "histogram" ? "aspect-3/2" : "h-8"))
			}, [
				__props.display === "gradient" ? (openBlock(), createElementBlock("defs", _hoisted_1, [createBaseVNode("linearGradient", {
					id: unref(gradientId),
					"data-testid": "gradient-def",
					x1: "0",
					y1: "0",
					x2: "1",
					y2: "0"
				}, [(openBlock(true), createElementBlock(Fragment, null, renderList(computedStops.value, (stop, i) => {
					return openBlock(), createElementBlock("stop", {
						key: i,
						offset: stop.offset,
						"stop-color": `rgb(${stop.color[0]},${stop.color[1]},${stop.color[2]})`
					}, null, 8, _hoisted_3);
				}), 128))], 8, _hoisted_2)])) : createCommentVNode("", true),
				__props.display === "gradient" ? (openBlock(), createElementBlock("rect", {
					key: 1,
					"data-testid": "gradient-bg",
					x: "0",
					y: "0",
					width: "1",
					height: "1",
					fill: `url(#${unref(gradientId)})`
				}, null, 8, _hoisted_4)) : createCommentVNode("", true),
				__props.display === "histogram" && histogramPath.value ? (openBlock(), createElementBlock("path", {
					key: 2,
					"data-testid": "histogram-path",
					d: histogramPath.value,
					fill: "currentColor",
					"fill-opacity": "0.3"
				}, null, 8, _hoisted_5)) : createCommentVNode("", true),
				__props.display === "plain" ? (openBlock(), createElementBlock("rect", {
					key: 3,
					"data-testid": "range-highlight",
					x: minNorm.value,
					y: "0",
					width: Math.max(0, maxNorm.value - minNorm.value),
					height: "1",
					fill: "white",
					"fill-opacity": "0.15"
				}, null, 8, _hoisted_6)) : createCommentVNode("", true),
				__props.display === "histogram" ? (openBlock(), createElementBlock(Fragment, { key: 4 }, [minNorm.value > 0 ? (openBlock(), createElementBlock("rect", {
					key: 0,
					"data-testid": "range-dim-left",
					x: "0",
					y: "0",
					width: minNorm.value,
					height: "1",
					fill: "black",
					"fill-opacity": "0.5"
				}, null, 8, _hoisted_7)) : createCommentVNode("", true), maxNorm.value < 1 ? (openBlock(), createElementBlock("rect", {
					key: 1,
					"data-testid": "range-dim-right",
					x: maxNorm.value,
					y: "0",
					width: 1 - maxNorm.value,
					height: "1",
					fill: "black",
					"fill-opacity": "0.5"
				}, null, 8, _hoisted_8)) : createCommentVNode("", true)], 64)) : createCommentVNode("", true)
			], 2)), !__props.disabled ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
				createBaseVNode("div", {
					"data-testid": "handle-min",
					class: "absolute -translate-x-1/2 cursor-grab",
					style: normalizeStyle({
						left: `${minNorm.value * 100}%`,
						bottom: "-10px"
					}),
					onPointerdown: _cache[0] || (_cache[0] = withModifiers(($event) => unref(startDrag)("min", $event), ["stop"]))
				}, [..._cache[8] || (_cache[8] = [createBaseVNode("svg", {
					width: "12",
					height: "10",
					viewBox: "0 0 12 10"
				}, [createBaseVNode("polygon", {
					points: "6,0 0,10 12,10",
					fill: "#333",
					stroke: "#aaa",
					"stroke-width": "0.5"
				})], -1)])], 36),
				__props.showMidpoint && modelValue.value.midpoint !== void 0 ? (openBlock(), createElementBlock("div", {
					key: 0,
					"data-testid": "handle-midpoint",
					class: "absolute -translate-x-1/2 cursor-grab",
					style: normalizeStyle({
						left: `${midpointPercent.value}%`,
						bottom: "-10px"
					}),
					onPointerdown: _cache[1] || (_cache[1] = withModifiers(($event) => unref(startDrag)("midpoint", $event), ["stop"]))
				}, [..._cache[9] || (_cache[9] = [createBaseVNode("svg", {
					width: "12",
					height: "10",
					viewBox: "0 0 12 10"
				}, [createBaseVNode("polygon", {
					points: "6,0 0,10 12,10",
					fill: "#888",
					stroke: "#ccc",
					"stroke-width": "0.5"
				})], -1)])], 36)) : createCommentVNode("", true),
				createBaseVNode("div", {
					"data-testid": "handle-max",
					class: "absolute -translate-x-1/2 cursor-grab",
					style: normalizeStyle({
						left: `${maxNorm.value * 100}%`,
						bottom: "-10px"
					}),
					onPointerdown: _cache[2] || (_cache[2] = withModifiers(($event) => unref(startDrag)("max", $event), ["stop"]))
				}, [..._cache[10] || (_cache[10] = [createBaseVNode("svg", {
					width: "12",
					height: "10",
					viewBox: "0 0 12 10"
				}, [createBaseVNode("polygon", {
					points: "6,0 0,10 12,10",
					fill: "white",
					stroke: "#555",
					"stroke-width": "0.5"
				})], -1)])], 36)
			], 64)) : createCommentVNode("", true)], 544), !__props.disabled ? (openBlock(), createElementBlock("div", {
				key: 0,
				class: "mt-3 flex items-center justify-between",
				onPointerdown: _cache[7] || (_cache[7] = withModifiers(() => {}, ["stop"]))
			}, [
				createVNode(ScrubableNumberInput_default, {
					modelValue: minValue.value,
					"onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => minValue.value = $event),
					"display-value": formatValue(minValue.value),
					min: __props.valueMin,
					max: __props.valueMax,
					step: step.value,
					"hide-buttons": "",
					class: "w-16"
				}, null, 8, [
					"modelValue",
					"display-value",
					"min",
					"max",
					"step"
				]),
				__props.showMidpoint && modelValue.value.midpoint !== void 0 ? (openBlock(), createBlock(ScrubableNumberInput_default, {
					key: 0,
					modelValue: midpointValue.value,
					"onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => midpointValue.value = $event),
					"display-value": midpointValue.value.toFixed(2),
					min: __props.midpointScale === "gamma" ? .01 : 0,
					max: __props.midpointScale === "gamma" ? 9.99 : 1,
					step: .01,
					"hide-buttons": "",
					class: "w-16"
				}, null, 8, [
					"modelValue",
					"display-value",
					"min",
					"max"
				])) : createCommentVNode("", true),
				createVNode(ScrubableNumberInput_default, {
					modelValue: maxValue.value,
					"onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => maxValue.value = $event),
					"display-value": formatValue(maxValue.value),
					min: __props.valueMin,
					max: __props.valueMax,
					step: step.value,
					"hide-buttons": "",
					class: "w-16"
				}, null, 8, [
					"modelValue",
					"display-value",
					"min",
					"max",
					"step"
				])
			], 32)) : createCommentVNode("", true)]);
		};
	}
});
//#endregion
//#region src/components/range/WidgetRange.vue
var WidgetRange_default = /* @__PURE__ */ defineComponent({
	__name: "WidgetRange",
	props: /*@__PURE__*/ mergeModels({ widget: {} }, {
		"modelValue": { default: () => ({
			min: 0,
			max: 1
		}) },
		"modelModifiers": {}
	}),
	emits: ["update:modelValue"],
	setup(__props) {
		const modelValue = useModel(__props, "modelValue");
		const isDisabled = computed(() => !!__props.widget.options?.disabled);
		const nodeOutputStore = useNodeOutputStore();
		const histogram = computed(() => {
			const locatorId = __props.widget.nodeLocatorId;
			if (!locatorId) return null;
			const output = nodeOutputStore.nodeOutputs[locatorId];
			const key = `histogram_${__props.widget.name}`;
			const data = output?.[key];
			if (!Array.isArray(data) || data.length === 0) return null;
			return new Uint32Array(data);
		});
		const upstreamValue = useUpstreamValue(() => __props.widget.linkedUpstream, singleValueExtractor(isRangeValue));
		watch(upstreamValue, (upstream) => {
			if (isDisabled.value && upstream) modelValue.value = upstream;
		});
		const effectiveValue = computed(() => isDisabled.value && upstreamValue.value ? upstreamValue.value : modelValue.value);
		function onValueChange(value) {
			modelValue.value = value;
		}
		return (_ctx, _cache) => {
			return openBlock(), createBlock(RangeEditor_default, {
				"model-value": effectiveValue.value,
				display: __props.widget?.options?.display,
				"gradient-stops": __props.widget?.options?.gradient_stops,
				"show-midpoint": __props.widget?.options?.show_midpoint,
				"midpoint-scale": __props.widget?.options?.midpoint_scale,
				histogram: histogram.value,
				disabled: isDisabled.value,
				"value-min": __props.widget?.options?.value_min,
				"value-max": __props.widget?.options?.value_max,
				"onUpdate:modelValue": onValueChange
			}, null, 8, [
				"model-value",
				"display",
				"gradient-stops",
				"show-midpoint",
				"midpoint-scale",
				"histogram",
				"disabled",
				"value-min",
				"value-max"
			]);
		};
	}
});
//#endregion
export { WidgetRange_default as default };
