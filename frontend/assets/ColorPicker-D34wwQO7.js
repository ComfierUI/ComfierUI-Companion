import "./rolldown-runtime-xtsTai4I.js";
import { Lt as clamp } from "./vendor-other-BPEcPQTD.js";
import { C as vModelText, Dt as withDirectives, Et as withCtx, F as createBaseVNode, Ft as reactive, G as defineComponent, H as createTextVNode, I as createBlock, Jt as normalizeClass, Kt as unref, L as createCommentVNode, Lt as ref, O as Fragment, P as computed, Q as mergeModels, R as createElementBlock, St as watch, T as withKeys, U as createVNode, Xt as normalizeStyle, Zt as toDisplayString, dt as renderList, ft as renderSlot, lt as openBlock, yt as useModel } from "./vendor-vue-core-C1utdb0s.js";
import { r as useI18n } from "./vendor-i18n-BZvE7WBQ.js";
import { Tt as PopoverRoot_default, bt as PopoverPortal_default, xt as PopoverContent_default, yt as PopoverTrigger_default } from "./vendor-reka-ui-tdehH9A1.js";
import { t as cn } from "./src-DI1bBfrb.js";
import { n as useModalLiftedZIndex } from "./useModalLiftedZIndex-BuehUvPe.js";
import { a as hsbToRgb, d as normalizeHex, g as rgbToHsv, m as rgbToHex, n as hexToHsva, o as hsvaToHex } from "./colorUtil-BzdMMd-Y.js";
import { a as Select_default, i as SelectContent_default, n as SelectTrigger_default, r as SelectItem_default, t as SelectValue_default } from "./SelectValue-BYMnIcxq.js";
//#region src/components/ui/color-picker/ColorPickerSaturationValue.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1$3 = ["aria-label", "aria-valuetext"];
//#endregion
//#region src/components/ui/color-picker/ColorPickerSaturationValue.vue
var ColorPickerSaturationValue_default = /* @__PURE__ */ defineComponent({
	__name: "ColorPickerSaturationValue",
	props: /*@__PURE__*/ mergeModels({ hue: {} }, {
		"saturation": { required: true },
		"saturationModifiers": {},
		"value": { required: true },
		"valueModifiers": {}
	}),
	emits: ["update:saturation", "update:value"],
	setup(__props) {
		const { t } = useI18n();
		const saturation = useModel(__props, "saturation");
		const value = useModel(__props, "value");
		const containerRef = ref(null);
		const hueBackground = computed(() => `hsl(${__props.hue}, 100%, 50%)`);
		const handleStyle = computed(() => ({
			left: `${saturation.value}%`,
			top: `${100 - value.value}%`
		}));
		function updateFromPointer(e) {
			const el = containerRef.value;
			if (!el) return;
			const rect = el.getBoundingClientRect();
			const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
			const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));
			saturation.value = Math.round(x * 100);
			value.value = Math.round((1 - y) * 100);
		}
		function handlePointerDown(e) {
			e.currentTarget.setPointerCapture(e.pointerId);
			updateFromPointer(e);
		}
		function handlePointerMove(e) {
			if (!e.currentTarget.hasPointerCapture(e.pointerId)) return;
			updateFromPointer(e);
		}
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", {
				ref_key: "containerRef",
				ref: containerRef,
				role: "slider",
				"aria-label": unref(t)("color.saturationBrightness"),
				"aria-valuetext": `${saturation.value}%, ${value.value}%`,
				class: "relative aspect-square w-full cursor-crosshair rounded-sm",
				style: normalizeStyle({
					backgroundColor: hueBackground.value,
					touchAction: "none"
				}),
				onPointerdown: handlePointerDown,
				onPointermove: handlePointerMove
			}, [
				_cache[0] || (_cache[0] = createBaseVNode("div", { class: "absolute inset-0 rounded-sm bg-linear-to-r from-white to-transparent" }, null, -1)),
				_cache[1] || (_cache[1] = createBaseVNode("div", { class: "absolute inset-0 rounded-sm bg-linear-to-b from-transparent to-black" }, null, -1)),
				createBaseVNode("div", {
					class: "pointer-events-none absolute size-3.5 -translate-1/2 rounded-full border-2 border-white shadow-[0_0_2px_rgba(0,0,0,0.6)]",
					style: normalizeStyle(handleStyle.value)
				}, null, 4)
			], 44, _hoisted_1$3);
		};
	}
});
//#endregion
//#region src/components/ui/color-picker/ColorPickerSlider.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1$2 = [
	"aria-label",
	"aria-valuemax",
	"aria-valuenow"
];
//#endregion
//#region src/components/ui/color-picker/ColorPickerSlider.vue
var ColorPickerSlider_default = /* @__PURE__ */ defineComponent({
	__name: "ColorPickerSlider",
	props: /*@__PURE__*/ mergeModels({
		type: {},
		hue: { default: 0 },
		saturation: { default: 100 },
		brightness: { default: 100 }
	}, {
		"modelValue": { required: true },
		"modelModifiers": {}
	}),
	emits: ["update:modelValue"],
	setup(__props) {
		const { t } = useI18n();
		const modelValue = useModel(__props, "modelValue");
		const max = computed(() => __props.type === "hue" ? 360 : 100);
		const fraction = computed(() => modelValue.value / max.value);
		const trackBackground = computed(() => {
			if (__props.type === "hue") return "linear-gradient(to right, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%)";
			const rgb = hsbToRgb({
				h: __props.hue,
				s: __props.saturation,
				b: __props.brightness
			});
			return `linear-gradient(to right, transparent, ${rgbToHex(rgb)})`;
		});
		const containerStyle = computed(() => {
			if (__props.type === "alpha") return {
				backgroundImage: "repeating-conic-gradient(#808080 0% 25%, transparent 0% 50%)",
				backgroundSize: "8px 8px",
				touchAction: "none"
			};
			return {
				background: trackBackground.value,
				touchAction: "none"
			};
		});
		function updateFromPointer(e) {
			const rect = e.currentTarget.getBoundingClientRect();
			const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
			modelValue.value = Math.round(x * max.value);
		}
		function handlePointerDown(e) {
			e.currentTarget.setPointerCapture(e.pointerId);
			updateFromPointer(e);
		}
		function handlePointerMove(e) {
			if (!e.currentTarget.hasPointerCapture(e.pointerId)) return;
			updateFromPointer(e);
		}
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", {
				role: "slider",
				"aria-label": __props.type === "hue" ? unref(t)("color.hue") : unref(t)("color.alpha"),
				"aria-valuemin": 0,
				"aria-valuemax": max.value,
				"aria-valuenow": modelValue.value,
				class: "relative flex h-4 cursor-pointer items-center rounded-full p-px",
				style: normalizeStyle(containerStyle.value),
				onPointerdown: handlePointerDown,
				onPointermove: handlePointerMove
			}, [__props.type === "alpha" ? (openBlock(), createElementBlock("div", {
				key: 0,
				class: "absolute inset-0 rounded-full",
				style: normalizeStyle({ background: trackBackground.value })
			}, null, 4)) : createCommentVNode("", true), createBaseVNode("div", {
				class: "pointer-events-none absolute aspect-square h-full -translate-x-1/2 rounded-full border-2 border-white shadow-[0_0_2px_rgba(0,0,0,0.6)]",
				style: normalizeStyle({ left: `${fraction.value * 100}%` })
			}, null, 4)], 44, _hoisted_1$2);
		};
	}
});
//#endregion
//#region src/components/ui/color-picker/useColorPicker.ts
var rgbChannels = [
	{
		key: "r",
		label: "color.red"
	},
	{
		key: "g",
		label: "color.green"
	},
	{
		key: "b",
		label: "color.blue"
	}
];
function useDraftField(source, apply) {
	const draft = ref(source());
	const isEditing = ref(false);
	watch(source, (value) => {
		if (!isEditing.value) draft.value = value;
	});
	return reactive({
		draft,
		beginEdit: () => {
			isEditing.value = true;
		},
		commit: () => apply(draft.value),
		reset: () => {
			isEditing.value = false;
			draft.value = source();
		}
	});
}
function useColorPicker(hsva) {
	const rgb = computed(() => hsbToRgb({
		h: hsva.value.h,
		s: hsva.value.s,
		b: hsva.value.v
	}));
	const hexString = computed(() => rgbToHex(rgb.value).toLowerCase());
	return {
		hex: useDraftField(() => hexString.value, (draft) => {
			const normalized = normalizeHex(draft);
			if (!normalized) return;
			const next = hexToHsva(normalized);
			hsva.value = {
				...hsva.value,
				h: next.h,
				s: next.s,
				v: next.v
			};
		}),
		rgb: useDraftField(() => ({ ...rgb.value }), ({ r, g, b }) => {
			if (![
				r,
				g,
				b
			].every(Number.isFinite)) return;
			const hsv = rgbToHsv({
				r: clamp(Math.round(r), 0, 255),
				g: clamp(Math.round(g), 0, 255),
				b: clamp(Math.round(b), 0, 255)
			});
			hsva.value = {
				...hsva.value,
				h: hsv.h,
				s: hsv.s,
				v: hsv.v
			};
		}),
		alpha: useDraftField(() => hsva.value.a, (draft) => {
			if (!Number.isFinite(draft)) return;
			hsva.value = {
				...hsva.value,
				a: clamp(Math.round(draft), 0, 100)
			};
		})
	};
}
//#endregion
//#region src/components/ui/color-picker/ColorPickerPanel.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1$1 = { class: "flex w-[211px] flex-col gap-2 rounded-lg border border-border-subtle bg-base-background p-2 shadow-md" };
var _hoisted_2$1 = { class: "flex items-center gap-1" };
var _hoisted_3$1 = { class: "flex h-6 min-w-0 flex-1 items-center gap-1 rounded-sm bg-secondary-background px-1 text-xs text-muted-foreground" };
var _hoisted_4$1 = ["aria-label"];
var _hoisted_5$1 = ["onUpdate:modelValue", "aria-label"];
var _hoisted_6$1 = {
	key: 2,
	class: "flex shrink-0 items-center border-l border-border-subtle pl-1"
};
var _hoisted_7$1 = ["aria-label"];
//#endregion
//#region src/components/ui/color-picker/ColorPickerPanel.vue
var ColorPickerPanel_default = /* @__PURE__ */ defineComponent({
	__name: "ColorPickerPanel",
	props: /*@__PURE__*/ mergeModels({ alpha: {
		type: Boolean,
		default: true
	} }, {
		"hsva": { required: true },
		"hsvaModifiers": {},
		"displayMode": { required: true },
		"displayModeModifiers": {}
	}),
	emits: ["update:hsva", "update:displayMode"],
	setup(__props) {
		const hsva = useModel(__props, "hsva");
		const displayMode = useModel(__props, "displayMode");
		const { t } = useI18n();
		const { hex, rgb, alpha: alphaField } = useColorPicker(hsva);
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", _hoisted_1$1, [
				createVNode(ColorPickerSaturationValue_default, {
					saturation: hsva.value.s,
					"onUpdate:saturation": _cache[0] || (_cache[0] = ($event) => hsva.value.s = $event),
					value: hsva.value.v,
					"onUpdate:value": _cache[1] || (_cache[1] = ($event) => hsva.value.v = $event),
					hue: hsva.value.h
				}, null, 8, [
					"saturation",
					"value",
					"hue"
				]),
				createVNode(ColorPickerSlider_default, {
					modelValue: hsva.value.h,
					"onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => hsva.value.h = $event),
					type: "hue"
				}, null, 8, ["modelValue"]),
				__props.alpha ? (openBlock(), createBlock(ColorPickerSlider_default, {
					key: 0,
					modelValue: hsva.value.a,
					"onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => hsva.value.a = $event),
					type: "alpha",
					hue: hsva.value.h,
					saturation: hsva.value.s,
					brightness: hsva.value.v
				}, null, 8, [
					"modelValue",
					"hue",
					"saturation",
					"brightness"
				])) : createCommentVNode("", true),
				createBaseVNode("div", _hoisted_2$1, [createVNode(Select_default, {
					modelValue: displayMode.value,
					"onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => displayMode.value = $event)
				}, {
					default: withCtx(() => [createVNode(SelectTrigger_default, { class: "h-6 w-[58px] shrink-0 gap-0.5 overflow-clip rounded-sm border-0 px-1.5 py-0 text-xs [&>span]:overflow-visible" }, {
						default: withCtx(() => [createVNode(SelectValue_default)]),
						_: 1
					}), createVNode(SelectContent_default, { class: "min-w-16 p-1" }, {
						default: withCtx(() => [createVNode(SelectItem_default, {
							value: "hex",
							class: "px-2 py-1 text-xs"
						}, {
							default: withCtx(() => [createTextVNode(toDisplayString(unref(t)("color.hex")), 1)]),
							_: 1
						}), createVNode(SelectItem_default, {
							value: "rgba",
							class: "px-2 py-1 text-xs"
						}, {
							default: withCtx(() => [createTextVNode(toDisplayString(unref(t)("color.rgba")), 1)]),
							_: 1
						})]),
						_: 1
					})]),
					_: 1
				}, 8, ["modelValue"]), createBaseVNode("div", _hoisted_3$1, [displayMode.value === "hex" ? withDirectives((openBlock(), createElementBlock("input", {
					key: 0,
					"onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => unref(hex).draft = $event),
					type: "text",
					spellcheck: "false",
					"aria-label": unref(t)("color.hex"),
					class: "min-w-0 flex-1 appearance-none border-none bg-transparent p-0 text-center outline-none",
					onFocus: _cache[6] || (_cache[6] = (...args) => unref(hex).beginEdit && unref(hex).beginEdit(...args)),
					onInput: _cache[7] || (_cache[7] = (...args) => unref(hex).commit && unref(hex).commit(...args)),
					onKeydown: _cache[8] || (_cache[8] = withKeys((...args) => unref(hex).commit && unref(hex).commit(...args), ["enter"])),
					onBlur: _cache[9] || (_cache[9] = (...args) => unref(hex).reset && unref(hex).reset(...args))
				}, null, 40, _hoisted_4$1)), [[vModelText, unref(hex).draft]]) : (openBlock(true), createElementBlock(Fragment, { key: 1 }, renderList(unref(rgbChannels), (channel) => {
					return withDirectives((openBlock(), createElementBlock("input", {
						key: channel.key,
						"onUpdate:modelValue": ($event) => unref(rgb).draft[channel.key] = $event,
						type: "number",
						min: 0,
						max: 255,
						"aria-label": unref(t)(channel.label),
						class: "min-w-0 flex-1 appearance-none border-none bg-transparent p-0 text-center outline-none [&::-webkit-inner-spin-button]:appearance-none",
						onFocus: _cache[10] || (_cache[10] = (...args) => unref(rgb).beginEdit && unref(rgb).beginEdit(...args)),
						onInput: _cache[11] || (_cache[11] = (...args) => unref(rgb).commit && unref(rgb).commit(...args)),
						onKeydown: _cache[12] || (_cache[12] = withKeys((...args) => unref(rgb).commit && unref(rgb).commit(...args), ["enter"])),
						onBlur: _cache[13] || (_cache[13] = (...args) => unref(rgb).reset && unref(rgb).reset(...args))
					}, null, 40, _hoisted_5$1)), [[
						vModelText,
						unref(rgb).draft[channel.key],
						void 0,
						{ number: true }
					]]);
				}), 128)), __props.alpha ? (openBlock(), createElementBlock("div", _hoisted_6$1, [withDirectives(createBaseVNode("input", {
					"onUpdate:modelValue": _cache[14] || (_cache[14] = ($event) => unref(alphaField).draft = $event),
					type: "number",
					min: 0,
					max: 100,
					"aria-label": unref(t)("color.alpha"),
					class: "w-6 min-w-0 appearance-none border-none bg-transparent p-0 text-right outline-none [&::-webkit-inner-spin-button]:appearance-none",
					onFocus: _cache[15] || (_cache[15] = (...args) => unref(alphaField).beginEdit && unref(alphaField).beginEdit(...args)),
					onInput: _cache[16] || (_cache[16] = (...args) => unref(alphaField).commit && unref(alphaField).commit(...args)),
					onKeydown: _cache[17] || (_cache[17] = withKeys((...args) => unref(alphaField).commit && unref(alphaField).commit(...args), ["enter"])),
					onBlur: _cache[18] || (_cache[18] = (...args) => unref(alphaField).reset && unref(alphaField).reset(...args))
				}, null, 40, _hoisted_7$1), [[
					vModelText,
					unref(alphaField).draft,
					void 0,
					{ number: true }
				]]), _cache[19] || (_cache[19] = createBaseVNode("span", null, "%", -1))])) : createCommentVNode("", true)])])
			]);
		};
	}
});
//#endregion
//#region src/components/ui/color-picker/ColorPicker.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1 = ["disabled"];
var _hoisted_2 = { class: "flex size-8 shrink-0 items-center justify-center" };
var _hoisted_3 = { class: "relative size-4 overflow-hidden rounded-sm" };
var _hoisted_4 = { class: "flex flex-1 items-center justify-between pl-1 text-xs text-base-foreground" };
var _hoisted_5 = { key: 0 };
var _hoisted_6 = {
	key: 1,
	class: "flex gap-2"
};
var _hoisted_7 = { key: 2 };
//#endregion
//#region src/components/ui/color-picker/ColorPicker.vue
var ColorPicker_default = /* @__PURE__ */ defineComponent({
	__name: "ColorPicker",
	props: /*@__PURE__*/ mergeModels({
		class: {},
		disabled: { type: Boolean },
		alpha: {
			type: Boolean,
			default: true
		}
	}, {
		"modelValue": { default: "#000000" },
		"modelModifiers": {}
	}),
	emits: ["update:modelValue"],
	setup(__props) {
		const modelValue = useModel(__props, "modelValue");
		function readHsva(hex) {
			const next = hexToHsva(hex || "#000000");
			if (!__props.alpha) next.a = 100;
			return next;
		}
		const hsva = ref(readHsva(modelValue.value));
		const displayMode = ref("hex");
		watch(modelValue, (newVal) => {
			if (newVal !== hsvaToHex(hsva.value)) hsva.value = readHsva(newVal);
		});
		watch(hsva, (newHsva) => {
			const hex = hsvaToHex(newHsva);
			if (hex !== modelValue.value) modelValue.value = hex;
		}, { deep: true });
		const baseRgb = computed(() => hsbToRgb({
			h: hsva.value.h,
			s: hsva.value.s,
			b: hsva.value.v
		}));
		const previewColor = computed(() => {
			const hex = rgbToHex(baseRgb.value);
			const a = hsva.value.a / 100;
			if (a < 1) return `${hex}${Math.round(a * 255).toString(16).padStart(2, "0")}`;
			return hex;
		});
		const displayHex = computed(() => rgbToHex(baseRgb.value).toLowerCase());
		const isOpen = ref(false);
		const contentStyle = useModalLiftedZIndex(isOpen);
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(PopoverRoot_default), {
				open: isOpen.value,
				"onUpdate:open": _cache[2] || (_cache[2] = ($event) => isOpen.value = $event)
			}, {
				default: withCtx(() => [createVNode(unref(PopoverTrigger_default), { "as-child": "" }, {
					default: withCtx(() => [renderSlot(_ctx.$slots, "trigger", {}, () => [createBaseVNode("button", {
						type: "button",
						disabled: _ctx.$props.disabled,
						class: normalizeClass(unref(cn)("flex h-8 w-full items-center overflow-clip rounded-lg border border-transparent bg-secondary-background pr-2 outline-none hover:bg-tertiary-background disabled:cursor-not-allowed disabled:opacity-50", isOpen.value && "border-border-default", _ctx.$props.class))
					}, [createBaseVNode("div", _hoisted_2, [createBaseVNode("div", _hoisted_3, [_cache[3] || (_cache[3] = createBaseVNode("div", {
						class: "absolute inset-0",
						style: {
							backgroundImage: "repeating-conic-gradient(#808080 0% 25%, transparent 0% 50%)",
							backgroundSize: "4px 4px"
						}
					}, null, -1)), createBaseVNode("div", {
						class: "absolute inset-0",
						style: normalizeStyle({ backgroundColor: previewColor.value })
					}, null, 4)])]), createBaseVNode("div", _hoisted_4, [displayMode.value === "hex" ? (openBlock(), createElementBlock("span", _hoisted_5, toDisplayString(displayHex.value), 1)) : (openBlock(), createElementBlock("div", _hoisted_6, [
						createBaseVNode("span", null, toDisplayString(baseRgb.value.r), 1),
						createBaseVNode("span", null, toDisplayString(baseRgb.value.g), 1),
						createBaseVNode("span", null, toDisplayString(baseRgb.value.b), 1)
					])), __props.alpha ? (openBlock(), createElementBlock("span", _hoisted_7, toDisplayString(hsva.value.a) + "%", 1)) : createCommentVNode("", true)])], 10, _hoisted_1)])]),
					_: 3
				}), createVNode(unref(PopoverPortal_default), null, {
					default: withCtx(() => [createVNode(unref(PopoverContent_default), {
						side: "bottom",
						align: "start",
						"side-offset": 7,
						"collision-padding": 10,
						class: "z-1700",
						style: normalizeStyle(unref(contentStyle))
					}, {
						default: withCtx(() => [createVNode(ColorPickerPanel_default, {
							hsva: hsva.value,
							"onUpdate:hsva": _cache[0] || (_cache[0] = ($event) => hsva.value = $event),
							"display-mode": displayMode.value,
							"onUpdate:displayMode": _cache[1] || (_cache[1] = ($event) => displayMode.value = $event),
							alpha: __props.alpha
						}, null, 8, [
							"hsva",
							"display-mode",
							"alpha"
						])]),
						_: 1
					}, 8, ["style"])]),
					_: 1
				})]),
				_: 3
			}, 8, ["open"]);
		};
	}
});
//#endregion
export { ColorPicker_default as t };
