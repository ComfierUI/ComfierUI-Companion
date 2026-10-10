import "./rolldown-runtime-xtsTai4I.js";
import { Et as withCtx, F as createBaseVNode, G as defineComponent, H as createTextVNode, Kt as unref, L as createCommentVNode, Lt as ref, P as computed, Q as mergeModels, R as createElementBlock, St as watch, U as createVNode, Xt as normalizeStyle, Zt as toDisplayString, ft as renderSlot, lt as openBlock, yt as useModel } from "./vendor-vue-core-C1utdb0s.js";
import { P as useMouseInElement } from "./vendor-vueuse-BxKIIsKg.js";
import { Kc as resolveInputSourceNode, go as useNodeOutputStore, o as app, zc as getNodeByLocatorId } from "./layoutStore-CZsuzg91.js";
import { t as Button_default } from "./Button-j0oCzR82.js";
import { t as savedImageUrls } from "./savedImageUrls-D0kAiNeX.js";
//#region src/renderer/extensions/vueNodes/widgets/composables/useImageCompareImages.ts
var BEFORE_INPUT = "image_a";
var AFTER_INPUT = "image_b";
var BEFORE_OUTPUT = "a_images";
var AFTER_OUTPUT = "b_images";
var NO_IMAGES = [];
function useImageCompareImages(node) {
	const nodeOutputStore = useNodeOutputStore();
	function upstreamImages(inputName) {
		const target = node.value;
		if (!target) return NO_IMAGES;
		const slot = target.inputs.findIndex((input) => input.name === inputName);
		if (slot < 0) return NO_IMAGES;
		const source = resolveInputSourceNode(target, slot);
		if (!source) return NO_IMAGES;
		return nodeOutputStore.getNodeImageUrls(source) ?? NO_IMAGES;
	}
	function savedImages(outputKey) {
		const target = node.value;
		if (!target) return NO_IMAGES;
		return savedImageUrls(nodeOutputStore.getNodeOutputs(target)?.[outputKey]);
	}
	const sideImages = (inputName, outputKey) => computed(() => {
		const upstream = upstreamImages(inputName);
		return upstream.length ? upstream : savedImages(outputKey);
	});
	return {
		beforeImages: sideImages(BEFORE_INPUT, BEFORE_OUTPUT),
		afterImages: sideImages(AFTER_INPUT, AFTER_OUTPUT)
	};
}
//#endregion
//#region src/renderer/extensions/vueNodes/widgets/components/BatchNavigation.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1$1 = {
	key: 0,
	class: "flex items-center gap-1"
};
var _hoisted_2$1 = { class: "mr-1 text-muted-foreground" };
var _hoisted_3$1 = { "data-testid": "batch-counter" };
//#endregion
//#region src/renderer/extensions/vueNodes/widgets/components/BatchNavigation.vue
var BatchNavigation_default = /* @__PURE__ */ defineComponent({
	__name: "BatchNavigation",
	props: /*@__PURE__*/ mergeModels({ count: {} }, {
		"modelValue": { required: true },
		"modelModifiers": {}
	}),
	emits: ["update:modelValue"],
	setup(__props) {
		const index = useModel(__props, "modelValue");
		return (_ctx, _cache) => {
			return __props.count > 1 ? (openBlock(), createElementBlock("div", _hoisted_1$1, [
				createBaseVNode("span", _hoisted_2$1, [renderSlot(_ctx.$slots, "label")]),
				createVNode(Button_default, {
					variant: "muted-textonly",
					size: "icon-sm",
					disabled: index.value === 0,
					"data-testid": "batch-prev",
					onClick: _cache[0] || (_cache[0] = ($event) => index.value--)
				}, {
					default: withCtx(() => [..._cache[2] || (_cache[2] = [createBaseVNode("i", { class: "icon-[lucide--chevron-left]" }, null, -1)])]),
					_: 1
				}, 8, ["disabled"]),
				createBaseVNode("span", _hoisted_3$1, toDisplayString(_ctx.$t("batch.index", {
					current: index.value + 1,
					total: __props.count
				})), 1),
				createVNode(Button_default, {
					variant: "muted-textonly",
					size: "icon-sm",
					disabled: index.value === __props.count - 1,
					"data-testid": "batch-next",
					onClick: _cache[1] || (_cache[1] = ($event) => index.value++)
				}, {
					default: withCtx(() => [..._cache[3] || (_cache[3] = [createBaseVNode("i", { class: "icon-[lucide--chevron-right]" }, null, -1)])]),
					_: 1
				}, 8, ["disabled"])
			])) : createCommentVNode("", true);
		};
	}
});
//#endregion
//#region src/renderer/extensions/vueNodes/widgets/components/WidgetImageCompare.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1 = { class: "flex size-full min-h-32 flex-col overflow-hidden" };
var _hoisted_2 = {
	key: 0,
	class: "flex shrink-0 justify-between px-2 py-1 text-xs",
	"data-testid": "batch-nav"
};
var _hoisted_3 = { key: 0 };
var _hoisted_4 = ["src", "alt"];
var _hoisted_5 = ["src", "alt"];
var _hoisted_6 = {
	key: 2,
	class: "flex min-h-0 flex-1 items-center justify-center",
	"data-testid": "image-compare-empty"
};
//#endregion
//#region src/renderer/extensions/vueNodes/widgets/components/WidgetImageCompare.vue
var WidgetImageCompare_default = /* @__PURE__ */ defineComponent({
	__name: "WidgetImageCompare",
	props: {
		widget: {},
		nodeId: {}
	},
	setup(__props) {
		const { beforeImages, afterImages } = useImageCompareImages(computed(() => {
			const locatorId = __props.widget.nodeLocatorId;
			return locatorId && getNodeByLocatorId(app.rootGraph, locatorId) || app.canvas.graph?.getNodeById(__props.nodeId);
		}));
		const containerRef = ref(null);
		const sliderPosition = ref(50);
		const beforeIndex = ref(0);
		const afterIndex = ref(0);
		const { elementX, elementWidth, isOutside } = useMouseInElement(containerRef);
		watch([
			elementX,
			elementWidth,
			isOutside
		], ([x, width, outside]) => {
			if (!outside && width > 0) sliderPosition.value = Math.max(0, Math.min(100, x / width * 100));
		});
		const showBatchNav = computed(() => beforeImages.value.length > 1 || afterImages.value.length > 1);
		watch(beforeImages, (images) => {
			if (beforeIndex.value >= images.length) beforeIndex.value = 0;
		});
		watch(afterImages, (images) => {
			if (afterIndex.value >= images.length) afterIndex.value = 0;
		});
		const beforeImage = computed(() => beforeImages.value[beforeIndex.value] ?? "");
		const afterImage = computed(() => afterImages.value[afterIndex.value] ?? "");
		const hasCompareImages = computed(() => Boolean(beforeImage.value && afterImage.value));
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", _hoisted_1, [showBatchNav.value ? (openBlock(), createElementBlock("div", _hoisted_2, [
				createVNode(BatchNavigation_default, {
					modelValue: beforeIndex.value,
					"onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => beforeIndex.value = $event),
					count: unref(beforeImages).length,
					"data-testid": "before-batch"
				}, {
					label: withCtx(() => [createTextVNode(toDisplayString(_ctx.$t("imageCompare.batchLabelA")), 1)]),
					_: 1
				}, 8, ["modelValue", "count"]),
				unref(beforeImages).length <= 1 ? (openBlock(), createElementBlock("div", _hoisted_3)) : createCommentVNode("", true),
				createVNode(BatchNavigation_default, {
					modelValue: afterIndex.value,
					"onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => afterIndex.value = $event),
					count: unref(afterImages).length,
					"data-testid": "after-batch"
				}, {
					label: withCtx(() => [createTextVNode(toDisplayString(_ctx.$t("imageCompare.batchLabelB")), 1)]),
					_: 1
				}, 8, ["modelValue", "count"])
			])) : createCommentVNode("", true), beforeImage.value || afterImage.value ? (openBlock(), createElementBlock("div", {
				key: 1,
				ref_key: "containerRef",
				ref: containerRef,
				"data-testid": "image-compare-viewport",
				class: "relative min-h-0 flex-1 overflow-hidden rounded-lg bg-node-component-surface py-4"
			}, [
				afterImage.value ? (openBlock(), createElementBlock("img", {
					key: 0,
					src: afterImage.value,
					alt: _ctx.$t("imageCompare.afterAlt"),
					draggable: "false",
					class: "absolute inset-0 size-full object-contain"
				}, null, 8, _hoisted_4)) : createCommentVNode("", true),
				beforeImage.value ? (openBlock(), createElementBlock("img", {
					key: 1,
					src: beforeImage.value,
					alt: _ctx.$t("imageCompare.beforeAlt"),
					draggable: "false",
					class: "absolute inset-0 size-full object-contain",
					style: normalizeStyle(hasCompareImages.value ? { clipPath: `inset(0 ${100 - sliderPosition.value}% 0 0)` } : void 0)
				}, null, 12, _hoisted_5)) : createCommentVNode("", true),
				hasCompareImages.value ? (openBlock(), createElementBlock("div", {
					key: 2,
					class: "pointer-events-none absolute top-0 z-10 h-full w-6",
					style: normalizeStyle({ left: `${sliderPosition.value}%` }),
					role: "presentation"
				}, [..._cache[2] || (_cache[2] = [
					createBaseVNode("div", { class: "absolute top-0 h-[calc(50%-var(--spacing)*3)] w-0.25 bg-white/30 backdrop-blur-sm" }, null, -1),
					createBaseVNode("div", { class: "absolute top-1/2 size-6 -translate-1/2 rounded-full border-2 bg-white/30 shadow-lg backdrop-blur-sm" }, null, -1),
					createBaseVNode("div", { class: "absolute bottom-0 h-[calc(50%-var(--spacing)*3)] w-0.25 bg-white/30 backdrop-blur-sm" }, null, -1)
				])], 4)) : createCommentVNode("", true)
			], 512)) : (openBlock(), createElementBlock("div", _hoisted_6, toDisplayString(_ctx.$t("imageCompare.noImages")), 1))]);
		};
	}
});
//#endregion
export { WidgetImageCompare_default as default };
