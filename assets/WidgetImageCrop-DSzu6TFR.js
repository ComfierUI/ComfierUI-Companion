import "./rolldown-runtime-xtsTai4I.js";
import { Dt as withDirectives, E as withModifiers, Et as withCtx, F as createBaseVNode, G as defineComponent, H as createTextVNode, I as createBlock, Jt as normalizeClass, Kt as unref, L as createCommentVNode, Mt as isRef, O as Fragment, P as computed, Q as mergeModels, R as createElementBlock, U as createVNode, Xt as normalizeStyle, Zt as toDisplayString, dt as renderList, lt as openBlock, w as vShow, xt as useTemplateRef, yt as useModel } from "./vendor-vue-core-C1utdb0s.js";
import { t as cn } from "./src-DI1bBfrb.js";
import { t as Button_default } from "./Button-j0oCzR82.js";
import { a as Select_default, i as SelectContent_default, n as SelectTrigger_default, r as SelectItem_default, t as SelectValue_default } from "./SelectValue-BYMnIcxq.js";
import { t as WidgetBoundingBox_default } from "./WidgetBoundingBox-DJK_vV6D.js";
import { r as useUpstreamValue, t as boundsExtractor } from "./useUpstreamValue-8u8bRmGL.js";
import { n as useImageCrop, t as ASPECT_RATIOS } from "./useImageCrop-m6o0bL9k.js";
//#region src/components/imagecrop/WidgetImageCrop.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1 = {
	key: 0,
	class: "flex size-full flex-col items-center justify-center text-center",
	"data-testid": "crop-empty-state"
};
var _hoisted_2 = { class: "text-sm" };
var _hoisted_3 = ["src", "alt"];
var _hoisted_4 = {
	key: 0,
	"aria-live": "polite",
	class: "absolute inset-0 z-10 flex size-full items-center justify-center bg-node-component-surface/90"
};
var _hoisted_5 = { class: "text-sm" };
var _hoisted_6 = ["data-testid", "onPointerdown"];
var _hoisted_7 = {
	key: 0,
	class: "flex shrink-0 items-center gap-2"
};
var _hoisted_8 = { class: "text-xs text-muted-foreground" };
//#endregion
//#region src/components/imagecrop/WidgetImageCrop.vue
var WidgetImageCrop_default = /* @__PURE__ */ defineComponent({
	__name: "WidgetImageCrop",
	props: /*@__PURE__*/ mergeModels({
		widget: {},
		nodeId: {}
	}, {
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
		const isDisabled = computed(() => !!__props.widget.options?.disabled);
		const upstreamValue = useUpstreamValue(() => __props.widget.linkedUpstream, boundsExtractor());
		const effectiveBounds = computed({
			get: () => isDisabled.value && upstreamValue.value ? upstreamValue.value : modelValue.value,
			set: (v) => {
				if (!isDisabled.value) modelValue.value = v;
			}
		});
		const imageEl = useTemplateRef("imageEl");
		const containerEl = useTemplateRef("containerEl");
		const ratioKeys = Object.keys(ASPECT_RATIOS);
		const { imageUrl, isLoading, selectedRatio, isLockEnabled, cropBoxStyle, resizeHandles, handleImageLoad, handleImageError, handleDragStart, handleDragMove, handleDragEnd, handleResizeStart, handleResizeMove, handleResizeEnd } = useImageCrop(__props.nodeId, {
			imageEl,
			containerEl,
			modelValue: effectiveBounds
		});
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", {
				class: "widget-expands relative flex size-full flex-col gap-1",
				onPointerdown: _cache[11] || (_cache[11] = withModifiers(() => {}, ["stop"])),
				onPointermove: _cache[12] || (_cache[12] = withModifiers(() => {}, ["stop"])),
				onPointerup: _cache[13] || (_cache[13] = withModifiers(() => {}, ["stop"]))
			}, [
				createBaseVNode("div", {
					ref_key: "containerEl",
					ref: containerEl,
					class: "relative min-h-0 flex-1 overflow-hidden rounded-[5px] bg-node-component-surface"
				}, [!unref(imageUrl) ? (openBlock(), createElementBlock("div", _hoisted_1, [_cache[14] || (_cache[14] = createBaseVNode("i", {
					class: "mb-2 icon-[lucide--image] size-12",
					"data-testid": "crop-empty-icon"
				}, null, -1)), createBaseVNode("p", _hoisted_2, toDisplayString(_ctx.$t("imageCrop.noInputImage")), 1)])) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
					createBaseVNode("img", {
						ref_key: "imageEl",
						ref: imageEl,
						src: unref(imageUrl),
						alt: _ctx.$t("imageCrop.cropPreviewAlt"),
						draggable: "false",
						class: "block size-full object-contain select-none",
						onLoad: _cache[0] || (_cache[0] = (...args) => unref(handleImageLoad) && unref(handleImageLoad)(...args)),
						onError: _cache[1] || (_cache[1] = (...args) => unref(handleImageError) && unref(handleImageError)(...args)),
						onDragstart: _cache[2] || (_cache[2] = withModifiers(() => {}, ["prevent"]))
					}, null, 40, _hoisted_3),
					unref(isLoading) ? (openBlock(), createElementBlock("div", _hoisted_4, [createBaseVNode("span", _hoisted_5, toDisplayString(_ctx.$t("imageCrop.loading")), 1)])) : createCommentVNode("", true),
					!unref(isLoading) ? (openBlock(), createElementBlock("div", {
						key: 1,
						class: normalizeClass(unref(cn)("absolute box-content cursor-move border border-white shadow-[0_0_0_9999px_rgba(0,0,0,0.5)]", isDisabled.value && "pointer-events-none opacity-60")),
						style: normalizeStyle(unref(cropBoxStyle)),
						"data-testid": "crop-overlay",
						onPointerdown: _cache[3] || (_cache[3] = (...args) => unref(handleDragStart) && unref(handleDragStart)(...args)),
						onPointermove: _cache[4] || (_cache[4] = (...args) => unref(handleDragMove) && unref(handleDragMove)(...args)),
						onPointerup: _cache[5] || (_cache[5] = (...args) => unref(handleDragEnd) && unref(handleDragEnd)(...args))
					}, null, 38)) : createCommentVNode("", true),
					(openBlock(true), createElementBlock(Fragment, null, renderList(unref(resizeHandles), (handle) => {
						return withDirectives((openBlock(), createElementBlock("div", {
							key: handle.direction,
							"data-testid": `crop-resize-${handle.direction}`,
							class: normalizeClass(unref(cn)("absolute", handle.class, isDisabled.value && "pointer-events-none opacity-60")),
							style: normalizeStyle(handle.style),
							onPointerdown: (e) => unref(handleResizeStart)(e, handle.direction),
							onPointermove: _cache[6] || (_cache[6] = (...args) => unref(handleResizeMove) && unref(handleResizeMove)(...args)),
							onPointerup: _cache[7] || (_cache[7] = (...args) => unref(handleResizeEnd) && unref(handleResizeEnd)(...args))
						}, null, 46, _hoisted_6)), [[vShow, !unref(isLoading)]]);
					}), 128))
				], 64))], 512),
				!isDisabled.value ? (openBlock(), createElementBlock("div", _hoisted_7, [
					createBaseVNode("label", _hoisted_8, toDisplayString(_ctx.$t("imageCrop.ratio")), 1),
					createVNode(Select_default, {
						modelValue: unref(selectedRatio),
						"onUpdate:modelValue": _cache[8] || (_cache[8] = ($event) => isRef(selectedRatio) ? selectedRatio.value = $event : null)
					}, {
						default: withCtx(() => [createVNode(SelectTrigger_default, { class: "h-7 w-24 text-xs" }, {
							default: withCtx(() => [createVNode(SelectValue_default)]),
							_: 1
						}), createVNode(SelectContent_default, null, {
							default: withCtx(() => [(openBlock(true), createElementBlock(Fragment, null, renderList(unref(ratioKeys), (key) => {
								return openBlock(), createBlock(SelectItem_default, {
									key,
									value: key
								}, {
									default: withCtx(() => [createTextVNode(toDisplayString(key === "custom" ? _ctx.$t("imageCrop.custom") : key), 1)]),
									_: 2
								}, 1032, ["value"]);
							}), 128))]),
							_: 1
						})]),
						_: 1
					}, 8, ["modelValue"]),
					createVNode(Button_default, {
						size: "icon",
						variant: unref(isLockEnabled) ? "primary" : "secondary",
						class: "size-7",
						"aria-label": unref(isLockEnabled) ? _ctx.$t("imageCrop.unlockRatio") : _ctx.$t("imageCrop.lockRatio"),
						onClick: _cache[9] || (_cache[9] = ($event) => isLockEnabled.value = !unref(isLockEnabled))
					}, {
						default: withCtx(() => [createBaseVNode("i", { class: normalizeClass(unref(isLockEnabled) ? "icon-[lucide--lock] size-3.5" : "icon-[lucide--lock-open] size-3.5") }, null, 2)]),
						_: 1
					}, 8, ["variant", "aria-label"])
				])) : createCommentVNode("", true),
				createVNode(WidgetBoundingBox_default, {
					modelValue: effectiveBounds.value,
					"onUpdate:modelValue": _cache[10] || (_cache[10] = ($event) => effectiveBounds.value = $event),
					disabled: isDisabled.value,
					class: "shrink-0"
				}, null, 8, ["modelValue", "disabled"])
			], 32);
		};
	}
});
//#endregion
export { WidgetImageCrop_default as default };
