import "./rolldown-runtime-xtsTai4I.js";
import { $ as mergeProps, Et as withCtx, G as defineComponent, I as createBlock, Jt as normalizeClass, Kt as unref, Lt as ref, O as Fragment, R as createElementBlock, U as createVNode, dt as renderList, lt as openBlock } from "./vendor-vue-core-C1utdb0s.js";
import { $ as reactiveOmit } from "./vendor-vueuse-BxKIIsKg.js";
import { A as SliderRoot_default, D as SliderTrack_default, O as SliderThumb_default, k as SliderRange_default, vn as useForwardPropsEmits } from "./vendor-reka-ui-tdehH9A1.js";
import { t as cn } from "./src-DI1bBfrb.js";
//#endregion
//#region src/components/ui/slider/Slider.vue
var Slider_default = /* @__PURE__ */ defineComponent({
	__name: "Slider",
	props: {
		defaultValue: {},
		modelValue: {},
		disabled: { type: Boolean },
		orientation: {},
		dir: {},
		inverted: { type: Boolean },
		min: {},
		max: {},
		step: {},
		minStepsBetweenThumbs: {},
		thumbAlignment: {},
		asChild: { type: Boolean },
		as: {},
		name: {},
		required: { type: Boolean },
		class: { type: [
			Boolean,
			null,
			String,
			Object,
			Array
		] },
		rangeClass: { type: [
			Boolean,
			null,
			String,
			Object,
			Array
		] },
		thumbClass: { type: [
			Boolean,
			null,
			String,
			Object,
			Array
		] }
	},
	emits: ["update:modelValue", "valueCommit"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const pressed = ref(false);
		const setPressed = (val) => {
			pressed.value = val;
		};
		const emits = __emit;
		const delegatedProps = reactiveOmit(props, "class", "rangeClass", "thumbClass");
		const forwarded = useForwardPropsEmits(delegatedProps, emits);
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(SliderRoot_default), mergeProps({
				"data-slot": "slider",
				class: unref(cn)("relative flex w-full touch-none items-center select-none data-disabled:opacity-50", "data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col", props.class)
			}, unref(forwarded), {
				onSlideStart: _cache[0] || (_cache[0] = () => setPressed(true)),
				onSlideMove: _cache[1] || (_cache[1] = () => setPressed(true)),
				onSlideEnd: _cache[2] || (_cache[2] = () => setPressed(false))
			}), {
				default: withCtx(({ modelValue }) => [createVNode(unref(SliderTrack_default), {
					"data-slot": "slider-track",
					class: normalizeClass(unref(cn)("relative grow overflow-hidden rounded-full bg-muted-foreground/20", "cursor-pointer overflow-visible", `before:absolute before:-inset-2 before:block before:bg-transparent`, "data-[orientation=horizontal]:h-0.5 data-[orientation=horizontal]:w-full", "data-[orientation=vertical]:h-full data-[orientation=vertical]:w-0.5"))
				}, {
					default: withCtx(() => [createVNode(unref(SliderRange_default), {
						"data-slot": "slider-range",
						class: normalizeClass(unref(cn)("absolute bg-muted-foreground data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full", props.rangeClass))
					}, null, 8, ["class"])]),
					_: 1
				}, 8, ["class"]), (openBlock(true), createElementBlock(Fragment, null, renderList(modelValue, (_, key) => {
					return openBlock(), createBlock(unref(SliderThumb_default), {
						key,
						"data-slot": "slider-thumb",
						class: normalizeClass(unref(cn)("block size-3.5 shrink-0 rounded-full bg-muted-foreground shadow-sm ring-base-foreground transition-[color,box-shadow]", "cursor-grab", "before:absolute before:-inset-1 before:block before:rounded-full before:bg-transparent", "hover:ring-2 focus-visible:ring-2 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50", { "cursor-grabbing": pressed.value }, props.thumbClass))
					}, null, 8, ["class"]);
				}), 128))]),
				_: 1
			}, 16, ["class"]);
		};
	}
});
//#endregion
export { Slider_default as t };
