const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./src-B40ysKj8.js","./vendor-other-BPEcPQTD.js","./rolldown-runtime-xtsTai4I.js","./vendor-three-DQpYrwAh.js","./vendor-vue-core-C1utdb0s.js","./vendor-zod-TMj9Wsdv.js","./vendor-tiptap-BT_4t92m.js","./vendor-other-DODGPXtn.css"])))=>i.map(i=>d[i]);
import "./rolldown-runtime-xtsTai4I.js";
import { a as __vitePreload } from "./vendor-datadog-DudeEV66.js";
import { Lt as clamp, zt as delay } from "./vendor-other-BPEcPQTD.js";
import { E as withModifiers, Et as withCtx, F as createBaseVNode, G as defineComponent, H as createTextVNode, Ht as toRef, I as createBlock, Jt as normalizeClass, Kt as unref, L as createCommentVNode, Lt as ref, Mt as isRef, O as Fragment, P as computed, Pt as onScopeDispose, Q as mergeModels, R as createElementBlock, St as watch, U as createVNode, Xt as normalizeStyle, Zt as toDisplayString, dt as renderList, lt as openBlock, ot as onMounted, vt as useId, xt as useTemplateRef, yt as useModel } from "./vendor-vue-core-C1utdb0s.js";
import { x as useEventListener } from "./vendor-vueuse-BxKIIsKg.js";
import { Da as appendCloudResParam, E as denormalize, Ea as parseImageWidgetValue, Mo as useChainCallback, go as useNodeOutputStore, il as useWidgetValueStore, jt as useWorkflowStore, ll as widgetId, o as app, zc as getNodeByLocatorId } from "./layoutStore-CZsuzg91.js";
import { i as api } from "./api-Bt-fGt5a.js";
import { _ as objectType, g as numberType } from "./vendor-zod-TMj9Wsdv.js";
import { r as useI18n } from "./vendor-i18n-BZvE7WBQ.js";
import { t as cn } from "./src-DI1bBfrb.js";
import { t as Button_default } from "./Button-j0oCzR82.js";
import { a as Select_default, i as SelectContent_default, n as SelectTrigger_default, r as SelectItem_default, t as SelectValue_default } from "./SelectValue-BYMnIcxq.js";
import { t as Loader_default } from "./Loader-CwKhrtFX.js";
import { t as WidgetBoundingBox_default } from "./WidgetBoundingBox-DJK_vV6D.js";
import { t as Skeleton_default } from "./Skeleton-gXY6B2Cf.js";
import { t as ASPECT_RATIOS } from "./useImageCrop-m6o0bL9k.js";
import { t as Slider_default } from "./Slider-eQb4a5yt.js";
import { t as useRangeEditor } from "./useRangeEditor-CWDD5mNu.js";
import { t as WidgetInputNumberInput_default } from "./WidgetInputNumberInput-DNJPeCnS.js";
import { t as useRetryableMediaSrc } from "./useRetryableMediaSrc-CJ3qVUbY.js";
function useCropBoxEditor(bounds, options) {
	const { rootEl, sourceWidth, sourceHeight, isDisabled, lockedRatio } = options;
	let cleanupDrag = null;
	function freeResize(mode, start, dx, dy) {
		const maxW = sourceWidth.value;
		const maxH = sourceHeight.value;
		let x1 = start.x;
		let y1 = start.y;
		let x2 = start.x + start.width;
		let y2 = start.y + start.height;
		if (mode.includes("w")) x1 = clamp(Math.round(x1 + dx), 0, x2 - 16);
		if (mode.includes("e")) x2 = clamp(Math.round(x2 + dx), x1 + 16, maxW);
		if (mode.includes("n")) y1 = clamp(Math.round(y1 + dy), 0, y2 - 16);
		if (mode.includes("s")) y2 = clamp(Math.round(y2 + dy), y1 + 16, maxH);
		return {
			x: x1,
			y: y1,
			width: x2 - x1,
			height: y2 - y1
		};
	}
	function lockedWidthFor(mode, start, free, ratio) {
		const widthFromHeight = free.height * ratio;
		if (mode === "n" || mode === "s") return widthFromHeight;
		if (mode === "e" || mode === "w") return free.width;
		return Math.abs(free.width - start.width) >= Math.abs(widthFromHeight - start.width) ? free.width : widthFromHeight;
	}
	function ratioResize(mode, start, dx, dy, ratio) {
		const maxW = sourceWidth.value;
		const maxH = sourceHeight.value;
		let width = lockedWidthFor(mode, start, freeResize(mode, start, dx, dy), ratio);
		let height = width / ratio;
		const anchorRight = start.x + start.width;
		const anchorBottom = start.y + start.height;
		const centerX = start.x + start.width / 2;
		const centerY = start.y + start.height / 2;
		const hasW = mode.includes("w");
		const hasE = mode.includes("e");
		const hasN = mode.includes("n");
		const hasS = mode.includes("s");
		const availWidth = hasW ? anchorRight : hasE ? maxW - start.x : 2 * Math.min(centerX, maxW - centerX);
		const availHeight = hasN ? anchorBottom : hasS ? maxH - start.y : 2 * Math.min(centerY, maxH - centerY);
		const minWidth = Math.max(16, 16 * ratio);
		const scale = Math.min(1, availWidth / width, availHeight / height);
		width = Math.max(width * scale, minWidth);
		height = width / ratio;
		width = Math.round(width);
		height = Math.round(height);
		const x = hasW ? anchorRight - width : hasE ? start.x : Math.round(centerX - width / 2);
		const y = hasN ? anchorBottom - height : hasS ? start.y : Math.round(centerY - height / 2);
		return {
			x: clamp(x, 0, Math.max(maxW - width, 0)),
			y: clamp(y, 0, Math.max(maxH - height, 0)),
			width,
			height
		};
	}
	function applyDrag(mode, start, dx, dy) {
		const maxW = sourceWidth.value;
		const maxH = sourceHeight.value;
		if (mode === "move") return {
			x: clamp(Math.round(start.x + dx), 0, Math.max(maxW - start.width, 0)),
			y: clamp(Math.round(start.y + dy), 0, Math.max(maxH - start.height, 0)),
			width: start.width,
			height: start.height
		};
		const ratio = lockedRatio?.value;
		return ratio != null ? ratioResize(mode, start, dx, dy, ratio) : freeResize(mode, start, dx, dy);
	}
	function startDrag(mode, event) {
		if (isDisabled() || event.button !== 0) return;
		const root = rootEl.value;
		const target = event.currentTarget;
		if (!root || !(target instanceof HTMLElement)) return;
		if (sourceWidth.value <= 0 || sourceHeight.value <= 0) return;
		cleanupDrag?.();
		const rect = root.getBoundingClientRect();
		if (rect.width <= 0 || rect.height <= 0) return;
		const scaleX = sourceWidth.value / rect.width;
		const scaleY = sourceHeight.value / rect.height;
		const start = { ...bounds.value };
		const startX = event.clientX;
		const startY = event.clientY;
		target.setPointerCapture(event.pointerId);
		const onMove = (moveEvent) => {
			const dx = (moveEvent.clientX - startX) * scaleX;
			const dy = (moveEvent.clientY - startY) * scaleY;
			bounds.value = applyDrag(mode, start, dx, dy);
		};
		const endDrag = () => {
			target.removeEventListener("pointermove", onMove);
			target.removeEventListener("pointerup", endDrag);
			target.removeEventListener("lostpointercapture", endDrag);
			cleanupDrag = null;
		};
		cleanupDrag = endDrag;
		target.addEventListener("pointermove", onMove);
		target.addEventListener("pointerup", endDrag);
		target.addEventListener("lostpointercapture", endDrag);
	}
	onScopeDispose(() => {
		cleanupDrag?.();
	});
	return { startDrag };
}
//#endregion
//#region src/components/videoEdit/VideoCropOverlay.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1$3 = ["aria-label"];
var _hoisted_2$2 = ["data-testid", "onPointerdown"];
var _hoisted_3$2 = ["data-testid", "onPointerdown"];
//#endregion
//#region src/components/videoEdit/VideoCropOverlay.vue
var VideoCropOverlay_default = /* @__PURE__ */ defineComponent({
	__name: "VideoCropOverlay",
	props: /*@__PURE__*/ mergeModels({
		sourceWidth: {},
		sourceHeight: {},
		lockedRatio: { default: null },
		disabled: {
			type: Boolean,
			default: false
		}
	}, {
		"modelValue": { required: true },
		"modelModifiers": {}
	}),
	emits: ["update:modelValue"],
	setup(__props) {
		const CORNER_HANDLES = [
			{
				dir: "nw",
				cursor: "cursor-nwse-resize"
			},
			{
				dir: "ne",
				cursor: "cursor-nesw-resize"
			},
			{
				dir: "se",
				cursor: "cursor-nwse-resize"
			},
			{
				dir: "sw",
				cursor: "cursor-nesw-resize"
			}
		];
		const EDGE_HANDLES = [
			{
				dir: "n",
				cursor: "cursor-ns-resize",
				strip: "h-2 -translate-y-1/2"
			},
			{
				dir: "e",
				cursor: "cursor-ew-resize",
				strip: "w-2 -translate-x-1/2"
			},
			{
				dir: "s",
				cursor: "cursor-ns-resize",
				strip: "h-2 -translate-y-1/2"
			},
			{
				dir: "w",
				cursor: "cursor-ew-resize",
				strip: "w-2 -translate-x-1/2"
			}
		];
		const bounds = useModel(__props, "modelValue");
		const rootEl = useTemplateRef("rootEl");
		const { startDrag } = useCropBoxEditor(bounds, {
			rootEl,
			sourceWidth: toRef(() => __props.sourceWidth),
			sourceHeight: toRef(() => __props.sourceHeight),
			isDisabled: () => __props.disabled,
			lockedRatio: toRef(() => __props.lockedRatio)
		});
		function pct(value, total) {
			return total > 0 ? `${value / total * 100}%` : "0%";
		}
		const cropBoxStyle = computed(() => ({
			left: pct(bounds.value.x, __props.sourceWidth),
			top: pct(bounds.value.y, __props.sourceHeight),
			width: pct(bounds.value.width, __props.sourceWidth),
			height: pct(bounds.value.height, __props.sourceHeight)
		}));
		function handleStyle(dir) {
			const { x, y, width, height } = bounds.value;
			const cx = dir.includes("w") ? x : dir.includes("e") ? x + width : x + width / 2;
			const cy = dir.includes("n") ? y : dir.includes("s") ? y + height : y + height / 2;
			return {
				left: pct(cx, __props.sourceWidth),
				top: pct(cy, __props.sourceHeight)
			};
		}
		const edgeHandles = computed(() => __props.lockedRatio != null ? [] : EDGE_HANDLES);
		function edgeStyle(dir) {
			const { x, y, width, height } = bounds.value;
			if (dir === "n" || dir === "s") return {
				left: pct(x, __props.sourceWidth),
				top: pct(dir === "n" ? y : y + height, __props.sourceHeight),
				width: pct(width, __props.sourceWidth)
			};
			return {
				left: pct(dir === "w" ? x : x + width, __props.sourceWidth),
				top: pct(y, __props.sourceHeight),
				height: pct(height, __props.sourceHeight)
			};
		}
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", {
				ref_key: "rootEl",
				ref: rootEl,
				class: "pointer-events-none absolute inset-0",
				"data-testid": "video-crop-overlay"
			}, [
				createBaseVNode("div", {
					class: normalizeClass(unref(cn)("pointer-events-auto absolute -m-0.5 box-content cursor-move border-2 border-white shadow-[0_0_0_9999px_rgba(0,0,0,0.5)]", __props.disabled && "pointer-events-none opacity-60")),
					style: normalizeStyle(cropBoxStyle.value),
					"data-testid": "crop-box",
					"aria-label": _ctx.$t("videoEdit.adjustCrop"),
					onPointerdown: _cache[0] || (_cache[0] = withModifiers(($event) => unref(startDrag)("move", $event), ["stop"]))
				}, null, 46, _hoisted_1$3),
				(openBlock(true), createElementBlock(Fragment, null, renderList(edgeHandles.value, (handle) => {
					return openBlock(), createElementBlock("div", {
						key: handle.dir,
						class: normalizeClass(unref(cn)("pointer-events-auto absolute", handle.strip, handle.cursor, __props.disabled && "pointer-events-none")),
						style: normalizeStyle(edgeStyle(handle.dir)),
						"data-testid": `crop-handle-${handle.dir}`,
						onPointerdown: withModifiers(($event) => unref(startDrag)(handle.dir, $event), ["stop"])
					}, null, 46, _hoisted_2$2);
				}), 128)),
				(openBlock(), createElementBlock(Fragment, null, renderList(CORNER_HANDLES, (handle) => {
					return createBaseVNode("div", {
						key: handle.dir,
						class: normalizeClass(unref(cn)("pointer-events-auto absolute size-2.5 -translate-1/2 rounded-sm bg-white/80", handle.cursor, __props.disabled && "pointer-events-none opacity-60")),
						style: normalizeStyle(handleStyle(handle.dir)),
						"data-testid": `crop-handle-${handle.dir}`,
						onPointerdown: withModifiers(($event) => unref(startDrag)(handle.dir, $event), ["stop"])
					}, null, 46, _hoisted_3$2);
				}), 64))
			], 512);
		};
	}
});
//#endregion
//#region src/composables/video/useTimelineScrub.ts
function useTimelineScrub(playheadFrame, options) {
	const { trackRef, frameMax, scrubMin, scrubMax, contentInsetX, isDisabled, onScrub } = options;
	const isScrubDragging = ref(false);
	let cleanupScrubDrag = null;
	function pointerToFrame(event) {
		const el = trackRef.value;
		if (!el) return playheadFrame.value;
		const rect = el.getBoundingClientRect();
		const contentWidth = Math.max(rect.width - 2 * contentInsetX, 1);
		const normalized = clamp((event.clientX - rect.left - contentInsetX) / contentWidth, 0, 1);
		return Math.round(denormalize(normalized, 0, frameMax.value));
	}
	function scrubToFrame(frame, force = false) {
		const clamped = clamp(frame, scrubMin.value, scrubMax.value);
		if (!force && clamped === playheadFrame.value) return;
		playheadFrame.value = clamped;
		onScrub(clamped);
	}
	function updateScrubFromPointer(event) {
		scrubToFrame(pointerToFrame(event));
	}
	function startScrubDrag(event) {
		if (isDisabled() || event.button !== 0) return;
		const el = trackRef.value;
		if (!el) return;
		cleanupScrubDrag?.();
		isScrubDragging.value = true;
		scrubToFrame(pointerToFrame(event), true);
		try {
			el.setPointerCapture(event.pointerId);
		} catch {}
		const onMove = (moveEvent) => {
			updateScrubFromPointer(moveEvent);
		};
		const endDrag = () => {
			isScrubDragging.value = false;
			el.removeEventListener("pointermove", onMove);
			el.removeEventListener("pointerup", endDrag);
			el.removeEventListener("lostpointercapture", endDrag);
			cleanupScrubDrag = null;
		};
		cleanupScrubDrag = endDrag;
		el.addEventListener("pointermove", onMove);
		el.addEventListener("pointerup", endDrag);
		el.addEventListener("lostpointercapture", endDrag);
	}
	onScopeDispose(() => {
		isScrubDragging.value = false;
		cleanupScrubDrag?.();
	});
	return {
		isScrubDragging,
		startScrubDrag,
		scrubToFrame
	};
}
//#endregion
//#region src/components/videoEdit/VideoFilmstripTrim.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1$2 = [
	"tabindex",
	"aria-valuemin",
	"aria-valuemax",
	"aria-valuenow",
	"aria-label"
];
var _hoisted_2$1 = {
	key: 0,
	role: "status",
	class: "sr-only"
};
var _hoisted_3$1 = { class: "rounded-lg bg-interface-menu-surface px-2.5 py-1 text-sm font-semibold text-base-foreground tabular-nums" };
var _hoisted_4$1 = { class: "rounded-lg bg-interface-menu-surface px-2.5 py-1 text-sm font-semibold text-base-foreground tabular-nums" };
var _hoisted_5$1 = ["aria-label"];
var _hoisted_6$1 = { class: "flex min-w-0 flex-1 flex-col" };
var _hoisted_7$1 = ["aria-label"];
var HANDLE_WIDTH_PX = 16;
var FILMSTRIP_TRACK_HEIGHT_PX = 48;
var DEFAULT_TILE_ASPECT_RATIO = 16 / 9;
//#endregion
//#region src/components/videoEdit/VideoFilmstripTrim.vue
var VideoFilmstripTrim_default = /* @__PURE__ */ defineComponent({
	__name: "VideoFilmstripTrim",
	props: /*@__PURE__*/ mergeModels({
		totalFrames: {},
		thumbnail: {},
		tileAspectRatio: { default: () => DEFAULT_TILE_ASPECT_RATIO },
		disabled: {
			type: Boolean,
			default: false
		},
		loading: {
			type: Boolean,
			default: false
		}
	}, {
		"startFrame": { required: true },
		"startFrameModifiers": {},
		"endFrame": { required: true },
		"endFrameModifiers": {},
		"playheadFrame": { required: true },
		"playheadFrameModifiers": {}
	}),
	emits: /*@__PURE__*/ mergeModels(["scrub"], [
		"update:startFrame",
		"update:endFrame",
		"update:playheadFrame"
	]),
	setup(__props, { emit: __emit }) {
		const TRACK_CONTENT_SPAN = `(100% - 32px)`;
		function timelineInsetLeftStyle(normalized) {
			return { left: `calc(${normalized} * ${TRACK_CONTENT_SPAN} + ${HANDLE_WIDTH_PX}px)` };
		}
		const startFrame = useModel(__props, "startFrame");
		const endFrame = useModel(__props, "endFrame");
		const playheadFrame = useModel(__props, "playheadFrame");
		const emit = __emit;
		const { t } = useI18n();
		const trackRef = useTemplateRef("trackRef");
		const frameMax = computed(() => Math.max(__props.totalFrames - 1, 0));
		const rangeValue = computed({
			get: () => ({
				min: startFrame.value,
				max: endFrame.value
			}),
			set: (value) => {
				startFrame.value = Math.round(value.min);
				endFrame.value = Math.round(value.max);
			}
		});
		const contentInsetX = computed(() => HANDLE_WIDTH_PX);
		const { startDrag, activeHandle } = useRangeEditor({
			trackRef,
			modelValue: rangeValue,
			valueMin: toRef(() => 0),
			valueMax: frameMax,
			showMidpoint: toRef(() => false),
			contentInsetX,
			handleCenterOffsetX: toRef(() => HANDLE_WIDTH_PX / 2)
		});
		const scrubMinFrame = computed(() => startFrame.value);
		const scrubMaxFrame = computed(() => endFrame.value);
		const { isScrubDragging, startScrubDrag, scrubToFrame } = useTimelineScrub(playheadFrame, {
			trackRef,
			frameMax,
			scrubMin: scrubMinFrame,
			scrubMax: scrubMaxFrame,
			contentInsetX: HANDLE_WIDTH_PX,
			isDisabled: () => __props.disabled || __props.totalFrames <= 1,
			onScrub: (frame) => emit("scrub", frame)
		});
		function handleTrackKeydown(event) {
			if (__props.disabled || __props.totalFrames <= 1) return;
			const target = {
				ArrowLeft: playheadFrame.value - 1,
				ArrowDown: playheadFrame.value - 1,
				ArrowRight: playheadFrame.value + 1,
				ArrowUp: playheadFrame.value + 1,
				Home: scrubMinFrame.value,
				End: scrubMaxFrame.value
			}[event.key];
			if (target === void 0) return;
			event.preventDefault();
			scrubToFrame(target);
		}
		const isFilmstripLoading = computed(() => __props.loading && !__props.thumbnail);
		const tileWidthPx = computed(() => {
			const aspect = Number.isFinite(__props.tileAspectRatio) && __props.tileAspectRatio > 0 ? __props.tileAspectRatio : DEFAULT_TILE_ASPECT_RATIO;
			return Math.max(Math.round(FILMSTRIP_TRACK_HEIGHT_PX * aspect), 1);
		});
		const trimSelectionBarClass = computed(() => isFilmstripLoading.value ? "bg-component-node-widget-background" : "bg-video-trim-selection-background");
		const startNorm = computed(() => frameMax.value <= 0 ? 0 : startFrame.value / frameMax.value);
		const endNorm = computed(() => frameMax.value <= 0 ? 1 : endFrame.value / frameMax.value);
		const playheadNorm = computed(() => frameMax.value <= 0 ? 0 : playheadFrame.value / frameMax.value);
		const playheadStyle = computed(() => timelineInsetLeftStyle(playheadNorm.value));
		const leftDimStyle = computed(() => ({ width: `calc(${startNorm.value} * ${TRACK_CONTENT_SPAN})` }));
		const rightDimStyle = computed(() => ({ width: `calc(${1 - endNorm.value} * ${TRACK_CONTENT_SPAN})` }));
		const selectionStyle = computed(() => ({
			left: `calc(${startNorm.value} * ${TRACK_CONTENT_SPAN})`,
			width: `calc((${endNorm.value} - ${startNorm.value}) * ${TRACK_CONTENT_SPAN} + 32px)`
		}));
		const activeHandleFrame = computed(() => {
			if (activeHandle.value === "min") return startFrame.value;
			if (activeHandle.value === "max") return endFrame.value;
			return 0;
		});
		const activeHandleTooltipStyle = computed(() => {
			return timelineInsetLeftStyle(activeHandle.value === "min" ? startNorm.value : endNorm.value);
		});
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", {
				class: "flex h-16 w-full items-stretch",
				onPointerdown: _cache[5] || (_cache[5] = withModifiers(() => {}, ["stop"]))
			}, [createBaseVNode("div", {
				ref_key: "trackRef",
				ref: trackRef,
				"data-testid": "trim-track",
				class: normalizeClass(unref(cn)("relative min-w-0 flex-1 rounded-lg bg-component-node-widget-background", __props.disabled || __props.totalFrames <= 1 ? "cursor-default" : unref(isScrubDragging) ? "cursor-grabbing" : "cursor-grab")),
				role: "slider",
				tabindex: __props.disabled || __props.totalFrames <= 1 ? -1 : 0,
				"aria-valuemin": scrubMinFrame.value,
				"aria-valuemax": scrubMaxFrame.value,
				"aria-valuenow": playheadFrame.value,
				"aria-label": unref(t)("videoEdit.seekVideo"),
				onPointerdown: _cache[3] || (_cache[3] = withModifiers((...args) => unref(startScrubDrag) && unref(startScrubDrag)(...args), ["stop"])),
				onKeydown: handleTrackKeydown,
				onContextmenu: _cache[4] || (_cache[4] = withModifiers(() => {}, ["prevent", "stop"]))
			}, [
				isFilmstripLoading.value ? (openBlock(), createElementBlock("span", _hoisted_2$1, toDisplayString(unref(t)("videoEdit.loadingFilmstrip")), 1)) : createCommentVNode("", true),
				unref(isScrubDragging) ? (openBlock(), createElementBlock("div", {
					key: 1,
					"data-testid": "scrub-tooltip",
					class: "pointer-events-none absolute bottom-full z-30 mb-1 flex -translate-x-1/2 flex-col items-center",
					style: normalizeStyle(playheadStyle.value)
				}, [createBaseVNode("span", _hoisted_3$1, toDisplayString(playheadFrame.value), 1), _cache[6] || (_cache[6] = createBaseVNode("span", { class: "size-0 border-x-[5px] border-t-[5px] border-x-transparent border-t-interface-menu-surface" }, null, -1))], 4)) : createCommentVNode("", true),
				unref(activeHandle) === "min" || unref(activeHandle) === "max" ? (openBlock(), createElementBlock("div", {
					key: 2,
					"data-testid": "trim-handle-tooltip",
					class: "pointer-events-none absolute bottom-full z-10 mb-1 flex -translate-x-1/2 flex-col items-center",
					style: normalizeStyle(activeHandleTooltipStyle.value)
				}, [createBaseVNode("span", _hoisted_4$1, toDisplayString(activeHandleFrame.value), 1), _cache[7] || (_cache[7] = createBaseVNode("span", { class: "size-0 border-x-[5px] border-t-[5px] border-x-transparent border-t-interface-menu-surface" }, null, -1))], 4)) : createCommentVNode("", true),
				createBaseVNode("div", {
					"data-testid": "filmstrip-track",
					class: "pointer-events-none absolute top-2 flex h-12 items-stretch overflow-hidden",
					style: normalizeStyle({
						left: `${HANDLE_WIDTH_PX}px`,
						right: `${HANDLE_WIDTH_PX}px`
					}),
					"aria-hidden": "true"
				}, [__props.thumbnail ? (openBlock(), createElementBlock("div", {
					key: 0,
					"data-testid": "filmstrip-tile",
					class: "size-full",
					style: normalizeStyle({
						backgroundImage: `url(${__props.thumbnail})`,
						backgroundRepeat: "repeat-x",
						backgroundSize: `${tileWidthPx.value}px 100%`,
						backgroundPosition: "left center"
					})
				}, null, 4)) : isFilmstripLoading.value ? (openBlock(), createBlock(Skeleton_default, {
					key: 1,
					"data-testid": "filmstrip-skeleton",
					class: "size-full rounded-none"
				})) : createCommentVNode("", true)], 4),
				startNorm.value > 0 ? (openBlock(), createElementBlock("div", {
					key: 3,
					class: "pointer-events-none absolute inset-y-0 left-0 bg-black/50",
					style: normalizeStyle(leftDimStyle.value)
				}, null, 4)) : createCommentVNode("", true),
				endNorm.value < 1 ? (openBlock(), createElementBlock("div", {
					key: 4,
					class: "pointer-events-none absolute inset-y-0 right-0 bg-black/50",
					style: normalizeStyle(rightDimStyle.value)
				}, null, 4)) : createCommentVNode("", true),
				createBaseVNode("div", {
					class: "pointer-events-none absolute inset-y-0 flex",
					style: normalizeStyle(selectionStyle.value)
				}, [
					!__props.disabled && __props.totalFrames > 1 ? (openBlock(), createElementBlock("button", {
						key: 0,
						type: "button",
						"data-testid": "handle-start",
						class: normalizeClass(unref(cn)("pointer-events-auto flex shrink-0 cursor-ew-resize", "items-center justify-center bg-video-trim-selection-background", "rounded-l-lg border-none p-0")),
						style: normalizeStyle({ width: `${HANDLE_WIDTH_PX}px` }),
						"aria-label": unref(t)("videoEdit.adjustStartFrame"),
						onPointerdown: _cache[0] || (_cache[0] = withModifiers(($event) => unref(startDrag)("min", $event), ["stop"]))
					}, [..._cache[8] || (_cache[8] = [createBaseVNode("span", { class: "h-4 w-px rounded-full bg-secondary-background" }, null, -1)])], 46, _hoisted_5$1)) : createCommentVNode("", true),
					createBaseVNode("div", _hoisted_6$1, [
						createBaseVNode("div", { class: normalizeClass(unref(cn)("h-2 shrink-0", trimSelectionBarClass.value)) }, null, 2),
						_cache[9] || (_cache[9] = createBaseVNode("div", { class: "h-12 shrink-0" }, null, -1)),
						createBaseVNode("div", { class: normalizeClass(unref(cn)("h-2 shrink-0", trimSelectionBarClass.value)) }, null, 2)
					]),
					!__props.disabled && __props.totalFrames > 1 ? (openBlock(), createElementBlock("button", {
						key: 1,
						type: "button",
						"data-testid": "handle-end",
						class: normalizeClass(unref(cn)("pointer-events-auto flex shrink-0 cursor-ew-resize", "items-center justify-center bg-video-trim-selection-background", "rounded-r-lg border-none p-0")),
						style: normalizeStyle({ width: `${HANDLE_WIDTH_PX}px` }),
						"aria-label": unref(t)("videoEdit.adjustEndFrame"),
						onPointerdown: _cache[1] || (_cache[1] = withModifiers(($event) => unref(startDrag)("max", $event), ["stop"]))
					}, [..._cache[10] || (_cache[10] = [createBaseVNode("span", { class: "h-4 w-px rounded-full bg-secondary-background" }, null, -1)])], 46, _hoisted_7$1)) : createCommentVNode("", true)
				], 4),
				createBaseVNode("div", {
					"data-testid": "playhead",
					class: normalizeClass(unref(cn)("absolute top-2 z-20 flex h-12 w-3 -translate-x-1/2 touch-none items-stretch justify-center", unref(isScrubDragging) ? "cursor-grabbing" : "cursor-grab")),
					style: normalizeStyle(playheadStyle.value),
					onPointerdown: _cache[2] || (_cache[2] = withModifiers((...args) => unref(startScrubDrag) && unref(startScrubDrag)(...args), ["stop"]))
				}, [..._cache[11] || (_cache[11] = [createBaseVNode("div", { class: "pointer-events-none w-0.5 rounded-full bg-video-trim-playhead-background" }, null, -1)])], 38)
			], 42, _hoisted_1$2)], 32);
		};
	}
});
//#endregion
//#region src/composables/video/useCropRatioLock.ts
function useCropRatioLock(bounds, options) {
	const { sourceWidth, sourceHeight } = options;
	const lockedRatio = ref(null);
	const ratioKeys = Object.keys(ASPECT_RATIOS);
	const canLockRatio = computed(() => isPositiveFinite(sourceWidth.value) && isPositiveFinite(sourceHeight.value) && isPositiveFinite(bounds.value.width) && isPositiveFinite(bounds.value.height));
	function applyLockedRatio() {
		const ratio = lockedRatio.value;
		if (ratio == null) return;
		const sourceW = sourceWidth.value;
		const sourceH = sourceHeight.value;
		let { x, y } = bounds.value;
		let width = bounds.value.width;
		let height = width / ratio;
		const scale = Math.min(1, Math.max(sourceW - x, 0) / width, Math.max(sourceH - y, 0) / height);
		width = Math.max(width * scale, 16, 16 * ratio);
		height = width / ratio;
		x = clamp(x, 0, Math.max(sourceW - width, 0));
		y = clamp(y, 0, Math.max(sourceH - height, 0));
		bounds.value = {
			x: Math.round(x),
			y: Math.round(y),
			width: Math.round(Math.min(width, sourceW)),
			height: Math.round(Math.min(height, sourceH))
		};
	}
	return {
		lockedRatio,
		ratioKeys,
		selectedRatio: computed({
			get: () => {
				if (lockedRatio.value == null) return "custom";
				const entry = Object.entries(ASPECT_RATIOS).find(([, value]) => value === lockedRatio.value);
				return entry ? entry[0] : "custom";
			},
			set: (key) => {
				if (key === "custom") {
					lockedRatio.value = null;
					return;
				}
				if (!canLockRatio.value) return;
				lockedRatio.value = ASPECT_RATIOS[key] ?? null;
				applyLockedRatio();
			}
		}),
		isLockEnabled: computed({
			get: () => lockedRatio.value != null,
			set: (locked) => {
				if (locked && lockedRatio.value == null) {
					if (!canLockRatio.value) return;
					lockedRatio.value = bounds.value.width / bounds.value.height;
				}
				if (!locked) lockedRatio.value = null;
			}
		}),
		canLockRatio
	};
}
function isPositiveFinite(value) {
	return Number.isFinite(value) && value > 0;
}
//#endregion
//#region src/composables/video/useTrimPlayback.ts
var SEEK_EVENT_TIMEOUT_MS$1 = 5e3;
function useTrimPlayback(options) {
	const { videoRef, frameMax, startFrame, endFrame, playheadFrame, frameToTime, timeToFrame } = options;
	const isPlaying = ref(false);
	const isSeeking = ref(false);
	let activeSeekId = 0;
	function clampSeekTime(video, time) {
		if (!Number.isFinite(video.duration) || video.duration <= 0) return Math.max(time, 0);
		return clamp(time, 0, Math.max(video.duration - .001, 0));
	}
	function waitForVideoSeek(video) {
		return new Promise((resolve) => {
			const finish = () => {
				clearTimeout(timer);
				video.removeEventListener("seeked", finish);
				video.removeEventListener("error", finish);
				resolve();
			};
			const timer = setTimeout(finish, SEEK_EVENT_TIMEOUT_MS$1);
			video.addEventListener("seeked", finish, { once: true });
			video.addEventListener("error", finish, { once: true });
		});
	}
	async function seekPreviewToFrame(frame) {
		const video = videoRef.value;
		if (!video || !Number.isFinite(frame)) return;
		const clamped = clamp(frame, 0, frameMax.value);
		const mappedTime = frameToTime(clamped);
		if (!Number.isFinite(mappedTime)) return;
		playheadFrame.value = clamped;
		const targetTime = clampSeekTime(video, mappedTime);
		if (Math.abs(video.currentTime - targetTime) <= 1e-4) return;
		const seekId = ++activeSeekId;
		isSeeking.value = true;
		video.currentTime = targetTime;
		await waitForVideoSeek(video);
		if (seekId === activeSeekId) isSeeking.value = false;
	}
	async function handlePlaybackChange(playing) {
		const video = videoRef.value;
		if (!video) return;
		if (playing) {
			await seekPreviewToFrame(playheadFrame.value >= endFrame.value ? startFrame.value : clamp(playheadFrame.value, startFrame.value, endFrame.value));
			if (!isPlaying.value) return;
			try {
				await video.play();
			} catch {
				isPlaying.value = false;
			}
		} else video.pause();
	}
	function resolvePlayheadTrimCollision() {
		const start = startFrame.value;
		const end = endFrame.value;
		const previous = playheadFrame.value;
		if (previous < start) playheadFrame.value = start;
		else if (previous > end) playheadFrame.value = end;
		if (playheadFrame.value !== previous) seekPreviewToFrame(playheadFrame.value);
	}
	function handleScrub(frame) {
		isPlaying.value = false;
		seekPreviewToFrame(frame);
	}
	function handleTimeUpdate() {
		const video = videoRef.value;
		if (!video || !isPlaying.value || isSeeking.value) return;
		const frame = timeToFrame(video.currentTime);
		playheadFrame.value = clamp(frame, startFrame.value, endFrame.value);
		if (frameMax.value > 0 && frame >= endFrame.value) {
			isPlaying.value = false;
			seekPreviewToFrame(endFrame.value);
		}
	}
	watch(isPlaying, (playing) => {
		handlePlaybackChange(playing);
	});
	watch([startFrame, endFrame], resolvePlayheadTrimCollision);
	return {
		isPlaying,
		seekPreviewToFrame,
		handleScrub,
		handleTimeUpdate
	};
}
//#endregion
//#region src/composables/video/useVideoEditFormats.ts
function useVideoEditFormats() {
	const { t } = useI18n();
	function formatDuration(seconds) {
		if (!seconds) return t("videoEdit.durationZero");
		return t("videoEdit.durationSeconds", { count: Math.round(seconds * 10) / 10 });
	}
	function formatFileSize(bytes) {
		if (bytes == null) return t("videoEdit.fileSizeUnknown");
		if (bytes < 1024) return t("videoEdit.fileSizeBytes", { count: bytes });
		if (bytes < 1048576) return t("videoEdit.fileSizeKilobytes", { count: Math.round(bytes / 1024) });
		return t("videoEdit.fileSizeMegabytes", { count: Number((bytes / 1048576).toFixed(1)) });
	}
	function formatTimecode(seconds) {
		const totalSeconds = Number.isFinite(seconds) ? Math.max(0, Math.round(seconds)) : 0;
		return `${Math.floor(totalSeconds / 60)}:${String(totalSeconds % 60).padStart(2, "0")}`;
	}
	return {
		formatDuration,
		formatFileSize,
		formatTimecode
	};
}
//#endregion
//#region src/utils/videoMetadataUtil.ts
var zVideoMetadata = objectType({
	fps: numberType().positive().finite().nullable(),
	duration: numberType().nonnegative().finite().nullable(),
	width: numberType().int().positive(),
	height: numberType().int().positive(),
	size: numberType().nonnegative().finite().nullable()
});
var STANDARD_FRAME_RATES = [
	24e3 / 1001,
	24,
	25,
	3e4 / 1001,
	30,
	48,
	50,
	6e4 / 1001,
	60,
	120
];
var FRAME_RATE_SNAP_TOLERANCE = .01;
var PACKET_STATS_SAMPLE_SIZE = 100;
function snapToStandardFrameRate(fps) {
	return STANDARD_FRAME_RATES.find((candidate) => Math.abs(fps - candidate) <= FRAME_RATE_SNAP_TOLERANCE) ?? fps;
}
function isTrustedOrigin(url) {
	if (url.origin === window.location.origin) return true;
	try {
		const apiBase = new URL(api.apiURL(""), window.location.origin);
		return url.origin === apiBase.origin;
	} catch {
		return false;
	}
}
function parseProbeableViewUrl(videoUrl) {
	let url;
	try {
		url = new URL(videoUrl, window.location.origin);
	} catch {
		return;
	}
	if (url.protocol !== "http:" && url.protocol !== "https:") return void 0;
	if (!isTrustedOrigin(url)) return void 0;
	if (!url.pathname.endsWith("/view")) return void 0;
	if (url.searchParams.get("filename") === null) return void 0;
	return url;
}
var mediabunnyModulePromise;
function importMediabunny() {
	return __vitePreload(() => import("./src-B40ysKj8.js"), __vite__mapDeps([0,1,2,3,4,5,6,7]), import.meta.url);
}
function loadMediabunny() {
	mediabunnyModulePromise ??= importMediabunny().catch((error) => {
		mediabunnyModulePromise = void 0;
		throw error;
	});
	return mediabunnyModulePromise;
}
var METADATA_CACHE_LIMIT = 64;
var metadataCache = /* @__PURE__ */ new Map();
var inflightProbes = /* @__PURE__ */ new Map();
function viewCacheKey(url) {
	const params = url.searchParams;
	return JSON.stringify([
		url.origin,
		url.pathname,
		params.get("filename") ?? "",
		params.get("subfolder") ?? "",
		params.get("type") ?? ""
	]);
}
function raceWithAbort(promise, signal) {
	if (!signal) return promise;
	if (signal.aborted) return Promise.resolve(void 0);
	return new Promise((resolve) => {
		const onAbort = () => resolve(void 0);
		signal.addEventListener("abort", onAbort, { once: true });
		promise.then((value) => resolve(value)).catch(() => resolve(void 0)).finally(() => signal.removeEventListener("abort", onAbort));
	});
}
function rememberMetadata(key, metadata) {
	metadataCache.delete(key);
	metadataCache.set(key, metadata);
	if (metadataCache.size > METADATA_CACHE_LIMIT) {
		const oldest = metadataCache.keys().next().value;
		if (oldest !== void 0) metadataCache.delete(oldest);
	}
}
async function extractVideoMetadata(source, signal) {
	if (signal?.aborted) return void 0;
	try {
		const { ALL_FORMATS, Input } = await loadMediabunny();
		const input = new Input({
			source,
			formats: ALL_FORMATS
		});
		const disposeOnAbort = () => {
			input.dispose();
		};
		signal?.addEventListener("abort", disposeOnAbort, { once: true });
		try {
			const videoTrack = await input.getPrimaryVideoTrack();
			if (!videoTrack) return void 0;
			const [duration, packetStats, size, width, height] = await Promise.all([
				input.computeDuration(),
				videoTrack.computePacketStats(PACKET_STATS_SAMPLE_SIZE),
				source.getSizeOrNull(),
				videoTrack.getDisplayWidth(),
				videoTrack.getDisplayHeight()
			]);
			const fps = packetStats.averagePacketRate;
			const parsed = zVideoMetadata.safeParse({
				fps: Number.isFinite(fps) && fps > 0 ? snapToStandardFrameRate(fps) : null,
				duration: Number.isFinite(duration) && duration >= 0 ? duration : null,
				width,
				height,
				size
			});
			return parsed.success ? parsed.data : void 0;
		} finally {
			signal?.removeEventListener("abort", disposeOnAbort);
			input.dispose();
		}
	} catch {
		return;
	}
}
async function probeVideoUrl(videoUrl) {
	try {
		const { UrlSource } = await loadMediabunny();
		return await extractVideoMetadata(new UrlSource(videoUrl, { getRetryDelay: () => null }));
	} catch {
		return;
	}
}
async function fetchVideoMetadata(videoUrl, signal) {
	const url = parseProbeableViewUrl(videoUrl);
	if (!url) return void 0;
	if (signal?.aborted) return void 0;
	const key = viewCacheKey(url);
	const cached = metadataCache.get(key);
	if (cached) {
		rememberMetadata(key, cached);
		return cached;
	}
	let probe = inflightProbes.get(key);
	if (!probe) {
		probe = probeVideoUrl(videoUrl).then((result) => {
			if (result) rememberMetadata(key, result);
			return result;
		}).finally(() => inflightProbes.delete(key));
		inflightProbes.set(key, probe);
	}
	const result = await raceWithAbort(probe, signal);
	if (signal?.aborted) return void 0;
	return result;
}
var METADATA_EVENT_TIMEOUT_MS = 15e3;
var SEEK_EVENT_TIMEOUT_MS = 5e3;
var FRAME_DECODE_TIMEOUT_MS = 5e3;
var FRAME_DECODE_RETRY_INTERVAL_MS = 250;
var EventTimeoutError = class extends Error {};
var LoadAbortedError = class extends Error {};
function waitForEvent(target, eventName, timeoutMs, signal) {
	return new Promise((resolve, reject) => {
		if (signal?.aborted) {
			reject(new LoadAbortedError(`Aborted waiting for ${eventName}`));
			return;
		}
		const onSuccess = (event) => {
			cleanup();
			resolve(event);
		};
		const onError = () => {
			cleanup();
			reject(/* @__PURE__ */ new Error(`Failed to load ${eventName}`));
		};
		const onAbort = () => {
			cleanup();
			reject(new LoadAbortedError(`Aborted waiting for ${eventName}`));
		};
		const timer = setTimeout(() => {
			cleanup();
			reject(new EventTimeoutError(`Timed out waiting for ${eventName}`));
		}, timeoutMs);
		const cleanup = () => {
			clearTimeout(timer);
			target.removeEventListener(eventName, onSuccess);
			target.removeEventListener("error", onError);
			signal?.removeEventListener("abort", onAbort);
		};
		target.addEventListener(eventName, onSuccess, { once: true });
		target.addEventListener("error", onError, { once: true });
		signal?.addEventListener("abort", onAbort, { once: true });
	});
}
function blobToDataUrl(blob) {
	return new Promise((resolve) => {
		const reader = new FileReader();
		reader.onloadend = () => resolve(typeof reader.result === "string" ? reader.result : "");
		reader.onerror = () => resolve("");
		reader.readAsDataURL(blob);
	});
}
function canvasToJpegDataUrl(canvas) {
	return new Promise((resolve) => {
		canvas.toBlob((blob) => resolve(blob ? blobToDataUrl(blob) : ""), "image/jpeg", .7);
	});
}
async function captureFrameViaBitmap(video, width, height) {
	const bitmap = await createImageBitmap(video, {
		resizeWidth: width,
		resizeHeight: height,
		resizeQuality: "high"
	});
	const offscreen = new OffscreenCanvas(bitmap.width, bitmap.height);
	const offscreenContext = offscreen.getContext("2d");
	if (!offscreenContext) {
		bitmap.close();
		return "";
	}
	offscreenContext.drawImage(bitmap, 0, 0);
	bitmap.close();
	return blobToDataUrl(await offscreen.convertToBlob({
		type: "image/jpeg",
		quality: .7
	}));
}
function captureFrame(video, canvas, context) {
	const sourceWidth = video.videoWidth;
	const sourceHeight = video.videoHeight;
	if (sourceWidth <= 0 || sourceHeight <= 0) return Promise.resolve("");
	const scale = Math.min(96 / sourceHeight, 384 / sourceWidth, 1);
	const width = Math.max(Math.round(sourceWidth * scale), 1);
	const height = Math.max(Math.round(sourceHeight * scale), 1);
	if (typeof createImageBitmap === "function" && typeof OffscreenCanvas === "function") return captureFrameViaBitmap(video, width, height).catch(() => "");
	canvas.width = width;
	canvas.height = height;
	context.drawImage(video, 0, 0, width, height);
	return canvasToJpegDataUrl(canvas);
}
async function recoverUnknownDuration(video, signal) {
	video.currentTime = Number.MAX_SAFE_INTEGER;
	try {
		await waitForEvent(video, "seeked", SEEK_EVENT_TIMEOUT_MS, signal);
	} catch (waitError) {
		if (!(waitError instanceof EventTimeoutError)) throw waitError;
	}
	return Number.isFinite(video.duration) ? video.duration : 0;
}
function representativeFrameTime(duration) {
	return Number.isFinite(duration) && duration > 0 ? Math.min(1, duration * .1) : 0;
}
async function waitForDecodableFrame(video, canvas, context, signal) {
	const deadlineMs = Date.now() + FRAME_DECODE_TIMEOUT_MS;
	while (Date.now() < deadlineMs) {
		try {
			await delay(FRAME_DECODE_RETRY_INTERVAL_MS, { signal });
		} catch {
			throw new LoadAbortedError("Aborted waiting for a decodable frame");
		}
		const frame = await captureFrame(video, canvas, context);
		if (frame) return frame;
	}
	return "";
}
async function captureRepresentativeFrame(video, canvas, context, duration, signal) {
	const target = representativeFrameTime(duration);
	if (video.readyState < 2 || Math.abs(video.currentTime - target) > .001) {
		video.currentTime = target;
		try {
			await waitForEvent(video, "seeked", SEEK_EVENT_TIMEOUT_MS, signal);
		} catch (waitError) {
			if (!(waitError instanceof EventTimeoutError)) throw waitError;
		}
	}
	return await captureFrame(video, canvas, context) || waitForDecodableFrame(video, canvas, context, signal);
}
function useVideoFilmstrip(videoUrl, options = {}) {
	const thumbnail = ref("");
	const duration = ref(0);
	const totalFrames = ref(0);
	const width = ref(0);
	const height = ref(0);
	const fps = ref(options.fps ?? 20);
	const fileSize = ref();
	const loading = ref(false);
	const error = ref(null);
	let activeLoadId = 0;
	let activeAbort;
	function isLoadStale(loadId, url) {
		return loadId !== activeLoadId || videoUrl.value !== url;
	}
	function cancelActiveLoad() {
		activeLoadId++;
		activeAbort?.abort();
		activeAbort = void 0;
	}
	function resetVideoState() {
		thumbnail.value = "";
		duration.value = 0;
		totalFrames.value = 0;
		width.value = 0;
		height.value = 0;
		fps.value = options.fps ?? 20;
		fileSize.value = void 0;
	}
	async function loadVideo(url) {
		activeAbort?.abort();
		const abortController = new AbortController();
		activeAbort = abortController;
		const signal = abortController.signal;
		const loadId = ++activeLoadId;
		loading.value = true;
		error.value = null;
		thumbnail.value = "";
		const video = document.createElement("video");
		video.preload = "metadata";
		video.muted = true;
		video.playsInline = true;
		video.crossOrigin = "anonymous";
		const canvas = document.createElement("canvas");
		const context = canvas.getContext("2d");
		if (!context) {
			loading.value = false;
			error.value = "canvas-unavailable";
			resetVideoState();
			if (activeAbort === abortController) activeAbort = void 0;
			return;
		}
		try {
			video.src = url;
			await waitForEvent(video, "loadedmetadata", METADATA_EVENT_TIMEOUT_MS, signal);
			if (isLoadStale(loadId, url)) return;
			const videoDuration = Number.isFinite(video.duration) ? video.duration : await recoverUnknownDuration(video, signal);
			if (isLoadStale(loadId, url)) return;
			duration.value = videoDuration;
			width.value = video.videoWidth;
			height.value = video.videoHeight;
			const metadata = await fetchVideoMetadata(url, signal);
			if (isLoadStale(loadId, url)) return;
			const effectiveDuration = metadata?.duration ?? videoDuration;
			duration.value = effectiveDuration;
			width.value = metadata?.width ?? video.videoWidth;
			height.value = metadata?.height ?? video.videoHeight;
			fps.value = metadata?.fps ?? options.fps ?? 20;
			fileSize.value = metadata?.size ?? void 0;
			totalFrames.value = Math.max(Math.round(effectiveDuration * fps.value), 1);
			const capturedThumbnail = await captureRepresentativeFrame(video, canvas, context, effectiveDuration, signal);
			if (isLoadStale(loadId, url)) return;
			thumbnail.value = capturedThumbnail;
		} catch (loadError) {
			if (loadError instanceof LoadAbortedError) return;
			if (isLoadStale(loadId, url)) return;
			error.value = "load-failed";
			resetVideoState();
		} finally {
			if (loadId === activeLoadId) loading.value = false;
			if (activeAbort === abortController) activeAbort = void 0;
			video.removeAttribute("src");
			video.load();
		}
	}
	watch(videoUrl, (url) => {
		if (!url) {
			cancelActiveLoad();
			loading.value = false;
			error.value = null;
			resetVideoState();
			return;
		}
		loadVideo(url);
	}, { immediate: true });
	onScopeDispose(cancelActiveLoad);
	return {
		thumbnail,
		duration,
		totalFrames,
		width,
		height,
		fps,
		fileSize,
		loading,
		error
	};
}
//#endregion
//#region src/utils/videoFrameUtil.ts
function isUsableFps(fps) {
	return fps !== void 0 && Number.isFinite(fps) && fps > 0;
}
function frameToTime(frame, duration, totalFrames, fallbackFps) {
	if (duration > 0 && totalFrames > 0) return frame / totalFrames * duration;
	return isUsableFps(fallbackFps) ? frame / fallbackFps : 0;
}
function timeToFrame(time, duration, totalFrames, fallbackFps) {
	if (duration > 0 && totalFrames > 0) return Math.round(time / duration * totalFrames);
	return isUsableFps(fallbackFps) ? Math.round(time * fallbackFps) : 0;
}
function roundSeconds(seconds) {
	return Math.round(seconds * 1e3) / 1e3;
}
//#endregion
//#region src/components/videoEdit/VideoEditPanel.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1$1 = {
	key: 0,
	"data-testid": "video-edit-empty",
	class: "flex min-h-24 flex-col items-center justify-center gap-1 rounded-lg border border-dashed border-node-stroke bg-node-component-surface p-4 text-center"
};
var _hoisted_2 = { class: "m-0 text-sm text-muted-foreground" };
var _hoisted_3 = [
	"src",
	"muted",
	"controls"
];
var _hoisted_4 = ["aria-label"];
var _hoisted_5 = { class: "text-sm text-muted-foreground" };
var _hoisted_6 = {
	key: 2,
	class: "absolute inset-0 flex flex-col items-center justify-center gap-1 bg-node-component-surface",
	"data-testid": "video-preview-error",
	role: "alert"
};
var _hoisted_7 = { class: "m-0 text-sm text-muted-foreground" };
var _hoisted_8 = {
	key: 2,
	"data-testid": "video-playback-controls",
	class: "flex h-8 items-center gap-2 px-1"
};
var _hoisted_9 = ["disabled", "aria-label"];
var _hoisted_10 = {
	"data-testid": "playback-timecode",
	class: "shrink-0 text-component-node-foreground-secondary tabular-nums"
};
var _hoisted_11 = ["aria-label"];
var _hoisted_12 = ["aria-label"];
var _hoisted_13 = {
	key: 3,
	class: "grid grid-cols-[minmax(80px,min-content)_minmax(125px,1fr)] gap-1"
};
var _hoisted_14 = {
	key: 3,
	class: "col-span-full flex items-center gap-2"
};
var _hoisted_15 = ["for"];
var _hoisted_16 = { class: "col-span-full mt-2 grid grid-cols-subgrid gap-y-0.5 border-t border-node-stroke py-2" };
var _hoisted_17 = { class: "truncate text-node-component-slot-text" };
var _hoisted_18 = { class: "text-right text-component-node-foreground" };
//#endregion
//#region src/components/videoEdit/VideoEditPanel.vue
var VideoEditPanel_default = /* @__PURE__ */ defineComponent({
	__name: "VideoEditPanel",
	props: /*@__PURE__*/ mergeModels({
		features: {},
		videoUrl: {},
		hasSource: {
			type: Boolean,
			default: false
		},
		thumbnail: {},
		totalFrames: {},
		duration: {},
		fps: {},
		fileSize: {},
		width: {},
		height: {},
		loading: {
			type: Boolean,
			default: false
		},
		error: { default: null }
	}, {
		"startFrame": { default: 0 },
		"startFrameModifiers": {},
		"endFrame": { default: 0 },
		"endFrameModifiers": {},
		"playheadFrame": { default: 0 },
		"playheadFrameModifiers": {},
		"cropBounds": { default: () => ({
			x: 0,
			y: 0,
			width: 0,
			height: 0
		}) },
		"cropBoundsModifiers": {}
	}),
	emits: /*@__PURE__*/ mergeModels(["retry", "loadError"], [
		"update:startFrame",
		"update:endFrame",
		"update:playheadFrame",
		"update:cropBounds"
	]),
	setup(__props, { emit: __emit }) {
		const emit = __emit;
		const startFrame = useModel(__props, "startFrame");
		const endFrame = useModel(__props, "endFrame");
		const playheadFrame = useModel(__props, "playheadFrame");
		const cropBounds = useModel(__props, "cropBounds");
		const { t } = useI18n();
		const { formatDuration, formatFileSize, formatTimecode } = useVideoEditFormats();
		const videoRef = useTemplateRef("videoRef");
		const videoIntrinsicSize = ref(null);
		const isMuted = ref(false);
		const isFullscreen = ref(false);
		const hasTrim = computed(() => __props.features.includes("trim"));
		const ratioSelectId = useId();
		const hasCrop = computed(() => __props.features.includes("crop"));
		const effectiveTotalFrames = computed(() => Math.max(__props.totalFrames, 1));
		const frameMax = computed(() => Math.max(__props.totalFrames - 1, 0));
		const toTime = (frame) => frameToTime(frame, __props.duration, __props.totalFrames, __props.fps || 20);
		const toFrame = (time) => timeToFrame(time, __props.duration, __props.totalFrames, __props.fps || 20);
		const { isPlaying, seekPreviewToFrame, handleScrub, handleTimeUpdate } = useTrimPlayback({
			videoRef,
			frameMax,
			startFrame,
			endFrame,
			playheadFrame,
			frameToTime: toTime,
			timeToFrame: toFrame
		});
		useEventListener(document, "fullscreenchange", () => {
			const video = videoRef.value;
			const active = document.fullscreenElement != null && document.fullscreenElement === video;
			isFullscreen.value = active;
			if (!active && video) isPlaying.value = !video.paused;
		});
		function enterFullscreen() {
			const video = videoRef.value;
			if (!video) return;
			video.requestFullscreen().catch(() => {});
		}
		function handleVideoTimeUpdate() {
			if (isFullscreen.value) return;
			handleTimeUpdate();
		}
		const { lockedRatio, ratioKeys, selectedRatio, isLockEnabled, canLockRatio } = useCropRatioLock(cropBounds, {
			sourceWidth: toRef(() => __props.width),
			sourceHeight: toRef(() => __props.height)
		});
		const startFrameWidget = computed(() => ({
			name: "start_frame",
			label: t("videoEdit.startFrame"),
			type: "number",
			value: startFrame.value,
			options: {
				min: 0,
				max: Math.max(endFrame.value - 1, 0),
				step: 1,
				step2: 1,
				precision: 0,
				disabled: !__props.hasSource || __props.loading
			}
		}));
		const endFrameWidget = computed(() => ({
			name: "end_frame",
			label: t("videoEdit.endFrame"),
			type: "number",
			value: endFrame.value,
			options: {
				min: Math.min(startFrame.value + 1, effectiveTotalFrames.value - 1),
				max: Math.max(effectiveTotalFrames.value - 1, 0),
				step: 1,
				step2: 1,
				precision: 0,
				disabled: !__props.hasSource || __props.loading
			}
		}));
		const videoAspectRatioStyle = computed(() => {
			const intrinsic = videoIntrinsicSize.value;
			const aspectWidth = __props.width || intrinsic?.width;
			const aspectHeight = __props.height || intrinsic?.height;
			if (aspectWidth && aspectHeight) return { aspectRatio: `${aspectWidth} / ${aspectHeight}` };
			return { aspectRatio: "16 / 9" };
		});
		const timecodeLabel = computed(() => t("videoEdit.timecode", {
			current: formatTimecode(toTime(playheadFrame.value)),
			total: formatTimecode(__props.duration)
		}));
		function handleSliderSeek(value) {
			const frame = value?.[0];
			if (typeof frame !== "number") return;
			const minFrame = hasTrim.value ? startFrame.value : 0;
			const maxFrame = hasTrim.value ? endFrame.value : frameMax.value;
			handleScrub(clamp(frame, minFrame, maxFrame));
		}
		const selectedDurationSeconds = computed(() => Math.max(toTime(endFrame.value + 1) - toTime(startFrame.value), 0));
		const selectedFrameCount = computed(() => Math.max(endFrame.value - startFrame.value + 1, 0));
		const dimensionsValue = computed(() => {
			const intrinsic = videoIntrinsicSize.value;
			const displayWidth = __props.width || intrinsic?.width;
			const displayHeight = __props.height || intrinsic?.height;
			if (!displayWidth || !displayHeight) return "—";
			return t("videoEdit.resolution", {
				width: displayWidth,
				height: displayHeight
			});
		});
		const metadataRows = computed(() => [
			{
				label: t("videoEdit.dimensions"),
				value: dimensionsValue.value
			},
			{
				label: t("videoEdit.duration"),
				value: hasTrim.value ? t("videoEdit.selectedOfTotal", {
					selected: formatDuration(selectedDurationSeconds.value),
					total: formatDuration(__props.duration)
				}) : formatDuration(__props.duration)
			},
			{
				label: t("videoEdit.frameRate"),
				value: __props.fps > 0 ? t("videoEdit.frameRateValue", { count: Math.round(__props.fps * 100) / 100 }) : "—"
			},
			{
				label: t("videoEdit.frames"),
				value: hasTrim.value ? t("videoEdit.selectedOfTotal", {
					selected: selectedFrameCount.value,
					total: effectiveTotalFrames.value
				}) : String(effectiveTotalFrames.value)
			},
			{
				label: t("videoEdit.fileSize"),
				value: formatFileSize(__props.fileSize)
			}
		]);
		watch(toRef(() => __props.videoUrl), () => {
			playheadFrame.value = hasTrim.value ? startFrame.value : 0;
			isPlaying.value = false;
			videoIntrinsicSize.value = null;
		});
		function handleVideoMetadata() {
			const video = videoRef.value;
			if (video?.videoWidth && video.videoHeight) videoIntrinsicSize.value = {
				width: video.videoWidth,
				height: video.videoHeight
			};
			if (hasTrim.value) seekPreviewToFrame(playheadFrame.value);
		}
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", {
				class: "flex flex-col gap-2",
				onPointerdown: _cache[14] || (_cache[14] = withModifiers(() => {}, ["stop"]))
			}, [
				!__props.hasSource ? (openBlock(), createElementBlock("div", _hoisted_1$1, [_cache[15] || (_cache[15] = createBaseVNode("i", { class: "icon-[lucide--film] size-6 text-muted-foreground" }, null, -1)), createBaseVNode("p", _hoisted_2, toDisplayString(unref(t)("videoEdit.noVideoSource")), 1)])) : (openBlock(), createElementBlock("div", {
					key: 1,
					"data-testid": "video-preview-container",
					class: normalizeClass(unref(cn)("overflow-hidden rounded-lg bg-node-component-surface", hasCrop.value && "p-1.5"))
				}, [createBaseVNode("div", {
					class: "relative w-full",
					style: normalizeStyle(videoAspectRatioStyle.value)
				}, [
					createBaseVNode("video", {
						ref_key: "videoRef",
						ref: videoRef,
						"data-testid": "video-preview",
						src: __props.videoUrl,
						muted: isMuted.value,
						controls: isFullscreen.value,
						class: "block size-full object-contain",
						preload: "metadata",
						crossorigin: "anonymous",
						playsinline: "",
						onLoadedmetadata: handleVideoMetadata,
						onTimeupdate: handleVideoTimeUpdate,
						onEnded: _cache[0] || (_cache[0] = ($event) => isPlaying.value = false),
						onError: _cache[1] || (_cache[1] = ($event) => emit("loadError"))
					}, null, 40, _hoisted_3),
					hasCrop.value && !__props.loading && __props.width > 0 && __props.height > 0 ? (openBlock(), createBlock(VideoCropOverlay_default, {
						key: 0,
						modelValue: cropBounds.value,
						"onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => cropBounds.value = $event),
						"source-width": __props.width,
						"source-height": __props.height,
						"locked-ratio": unref(lockedRatio)
					}, null, 8, [
						"modelValue",
						"source-width",
						"source-height",
						"locked-ratio"
					])) : createCommentVNode("", true),
					__props.loading ? (openBlock(), createElementBlock("div", {
						key: 1,
						class: "absolute inset-0 flex flex-col items-center justify-center gap-0 bg-node-component-surface",
						"data-testid": "video-preview-loading",
						"aria-busy": true,
						"aria-label": unref(t)("videoEdit.loadingVideo")
					}, [createVNode(Loader_default, {
						size: "md",
						variant: "loader-circle"
					}), createBaseVNode("p", _hoisted_5, toDisplayString(unref(t)("videoEdit.loadingVideo")), 1)], 8, _hoisted_4)) : __props.error ? (openBlock(), createElementBlock("div", _hoisted_6, [
						_cache[16] || (_cache[16] = createBaseVNode("i", { class: "icon-[lucide--video-off] size-6 text-muted-foreground" }, null, -1)),
						createBaseVNode("p", _hoisted_7, toDisplayString(__props.error === "canvas-unavailable" ? unref(t)("videoEdit.canvasUnavailable") : unref(t)("videoEdit.loadFailed")), 1),
						createBaseVNode("button", {
							type: "button",
							"data-testid": "video-preview-retry",
							class: "mt-1 cursor-pointer rounded-md border-none bg-component-node-widget-background px-3 py-1 text-sm text-base-foreground hover:bg-component-node-widget-background-hovered",
							onClick: _cache[3] || (_cache[3] = ($event) => emit("retry"))
						}, toDisplayString(unref(t)("videoEdit.retry")), 1)
					])) : createCommentVNode("", true)
				], 4)], 2)),
				__props.hasSource && __props.error !== "load-failed" ? (openBlock(), createElementBlock("div", _hoisted_8, [
					createBaseVNode("button", {
						type: "button",
						"data-testid": "playback-toggle",
						class: normalizeClass(unref(cn)("flex size-6 shrink-0 items-center justify-center rounded-md border-none bg-transparent text-component-node-foreground", __props.loading ? "cursor-default opacity-50" : "cursor-pointer hover:bg-component-node-widget-background-hovered")),
						disabled: __props.loading,
						"aria-label": unref(isPlaying) ? unref(t)("videoEdit.pause") : unref(t)("videoEdit.play"),
						onClick: _cache[4] || (_cache[4] = ($event) => isPlaying.value = !unref(isPlaying))
					}, [createBaseVNode("i", { class: normalizeClass(unref(cn)(unref(isPlaying) ? "icon-[lucide--pause]" : "icon-[lucide--play]", "size-4")) }, null, 2)], 10, _hoisted_9),
					createBaseVNode("span", _hoisted_10, toDisplayString(timecodeLabel.value), 1),
					createVNode(Slider_default, {
						class: "min-w-0 flex-1",
						"model-value": [playheadFrame.value],
						min: 0,
						max: Math.max(frameMax.value, 1),
						step: 1,
						disabled: __props.loading || frameMax.value <= 0,
						"aria-label": unref(t)("videoEdit.seekVideo"),
						"onUpdate:modelValue": handleSliderSeek
					}, null, 8, [
						"model-value",
						"max",
						"disabled",
						"aria-label"
					]),
					createBaseVNode("button", {
						type: "button",
						"data-testid": "playback-fullscreen",
						class: "flex size-6 shrink-0 cursor-pointer items-center justify-center rounded-md border-none bg-transparent text-component-node-foreground-secondary hover:bg-component-node-widget-background-hovered",
						"aria-label": unref(t)("videoEdit.fullscreen"),
						onClick: enterFullscreen
					}, [..._cache[17] || (_cache[17] = [createBaseVNode("i", { class: "icon-[lucide--maximize] size-4" }, null, -1)])], 8, _hoisted_11),
					createBaseVNode("button", {
						type: "button",
						"data-testid": "playback-mute",
						class: "flex size-6 shrink-0 cursor-pointer items-center justify-center rounded-md border-none bg-transparent text-component-node-foreground-secondary hover:bg-component-node-widget-background-hovered",
						"aria-label": isMuted.value ? unref(t)("videoEdit.unmute") : unref(t)("videoEdit.mute"),
						onClick: _cache[5] || (_cache[5] = ($event) => isMuted.value = !isMuted.value)
					}, [createBaseVNode("i", { class: normalizeClass(unref(cn)(isMuted.value ? "icon-[lucide--volume-x]" : "icon-[lucide--volume-2]", "size-4")) }, null, 2)], 8, _hoisted_12)
				])) : createCommentVNode("", true),
				__props.hasSource && __props.error !== "load-failed" ? (openBlock(), createElementBlock("div", _hoisted_13, [
					hasTrim.value ? (openBlock(), createBlock(VideoFilmstripTrim_default, {
						key: 0,
						"start-frame": startFrame.value,
						"onUpdate:startFrame": _cache[6] || (_cache[6] = ($event) => startFrame.value = $event),
						"end-frame": endFrame.value,
						"onUpdate:endFrame": _cache[7] || (_cache[7] = ($event) => endFrame.value = $event),
						"playhead-frame": playheadFrame.value,
						"onUpdate:playheadFrame": _cache[8] || (_cache[8] = ($event) => playheadFrame.value = $event),
						class: "col-span-full",
						"total-frames": effectiveTotalFrames.value,
						thumbnail: __props.thumbnail,
						"tile-aspect-ratio": __props.width > 0 && __props.height > 0 ? __props.width / __props.height : void 0,
						loading: __props.loading,
						onScrub: unref(handleScrub)
					}, null, 8, [
						"start-frame",
						"end-frame",
						"playhead-frame",
						"total-frames",
						"thumbnail",
						"tile-aspect-ratio",
						"loading",
						"onScrub"
					])) : createCommentVNode("", true),
					hasTrim.value ? (openBlock(), createBlock(WidgetInputNumberInput_default, {
						key: 1,
						modelValue: startFrame.value,
						"onUpdate:modelValue": _cache[9] || (_cache[9] = ($event) => startFrame.value = $event),
						"root-class": "col-span-full grid grid-cols-subgrid items-center",
						widget: startFrameWidget.value
					}, null, 8, ["modelValue", "widget"])) : createCommentVNode("", true),
					hasTrim.value ? (openBlock(), createBlock(WidgetInputNumberInput_default, {
						key: 2,
						modelValue: endFrame.value,
						"onUpdate:modelValue": _cache[10] || (_cache[10] = ($event) => endFrame.value = $event),
						"root-class": "col-span-full grid grid-cols-subgrid items-center",
						widget: endFrameWidget.value
					}, null, 8, ["modelValue", "widget"])) : createCommentVNode("", true),
					hasCrop.value ? (openBlock(), createElementBlock("div", _hoisted_14, [
						createBaseVNode("label", {
							for: unref(ratioSelectId),
							class: "text-xs text-muted-foreground"
						}, toDisplayString(unref(t)("imageCrop.ratio")), 9, _hoisted_15),
						createVNode(Select_default, {
							modelValue: unref(selectedRatio),
							"onUpdate:modelValue": _cache[11] || (_cache[11] = ($event) => isRef(selectedRatio) ? selectedRatio.value = $event : null),
							disabled: !unref(canLockRatio)
						}, {
							default: withCtx(() => [createVNode(SelectTrigger_default, {
								id: unref(ratioSelectId),
								class: "h-7 w-24 text-xs"
							}, {
								default: withCtx(() => [createVNode(SelectValue_default)]),
								_: 1
							}, 8, ["id"]), createVNode(SelectContent_default, null, {
								default: withCtx(() => [(openBlock(true), createElementBlock(Fragment, null, renderList(unref(ratioKeys), (key) => {
									return openBlock(), createBlock(SelectItem_default, {
										key,
										value: key
									}, {
										default: withCtx(() => [createTextVNode(toDisplayString(key === "custom" ? unref(t)("imageCrop.custom") : key), 1)]),
										_: 2
									}, 1032, ["value"]);
								}), 128))]),
								_: 1
							})]),
							_: 1
						}, 8, ["modelValue", "disabled"]),
						createVNode(Button_default, {
							size: "icon",
							variant: unref(isLockEnabled) ? "primary" : "secondary",
							class: "size-7",
							disabled: !unref(canLockRatio),
							"aria-label": unref(isLockEnabled) ? unref(t)("imageCrop.unlockRatio") : unref(t)("imageCrop.lockRatio"),
							onClick: _cache[12] || (_cache[12] = ($event) => isLockEnabled.value = !unref(isLockEnabled))
						}, {
							default: withCtx(() => [createBaseVNode("i", { class: normalizeClass(unref(isLockEnabled) ? "icon-[lucide--lock] size-3.5" : "icon-[lucide--lock-open] size-3.5") }, null, 2)]),
							_: 1
						}, 8, [
							"variant",
							"disabled",
							"aria-label"
						])
					])) : createCommentVNode("", true),
					hasCrop.value ? (openBlock(), createBlock(WidgetBoundingBox_default, {
						key: 4,
						modelValue: cropBounds.value,
						"onUpdate:modelValue": _cache[13] || (_cache[13] = ($event) => cropBounds.value = $event),
						class: "col-span-full",
						disabled: __props.loading || __props.width <= 0
					}, null, 8, ["modelValue", "disabled"])) : createCommentVNode("", true),
					createBaseVNode("div", _hoisted_16, [(openBlock(true), createElementBlock(Fragment, null, renderList(metadataRows.value, (row) => {
						return openBlock(), createElementBlock("div", {
							key: row.label,
							class: "col-span-full grid grid-cols-subgrid py-0.5"
						}, [createBaseVNode("span", _hoisted_17, toDisplayString(row.label), 1), createBaseVNode("span", _hoisted_18, toDisplayString(row.value), 1)]);
					}), 128))])
				])) : createCommentVNode("", true)
			], 32);
		};
	}
});
//#endregion
//#region src/composables/video/useVideoEditModel.ts
function finiteOrZero(value) {
	return typeof value === "number" && Number.isFinite(value) ? value : 0;
}
function sanitizeTrim(trim) {
	if (!trim) return void 0;
	const startTime = Math.max(finiteOrZero(trim.start_time), 0);
	const trimDuration = Math.max(finiteOrZero(trim.duration), 0);
	return trim.start_time === startTime && trim.duration === trimDuration ? trim : {
		start_time: startTime,
		duration: trimDuration
	};
}
function sanitizeCrop(crop) {
	if (!crop) return void 0;
	if ([
		crop.x,
		crop.y,
		crop.width,
		crop.height
	].every(Number.isFinite) && crop.x >= 0 && crop.y >= 0 && crop.width > 0 && crop.height > 0) return crop;
	return crop.x === 0 && crop.y === 0 && crop.width === 0 && crop.height === 0 ? crop : {
		x: 0,
		y: 0,
		width: 0,
		height: 0
	};
}
function useVideoEditModel(modelValue, options) {
	const { duration, totalFrames, fps, width, height } = options;
	const frameMax = computed(() => Math.max(totalFrames.value - 1, 0));
	const toTime = (frame) => frameToTime(frame, duration.value, totalFrames.value, fps.value);
	const toFrame = (time) => timeToFrame(time, duration.value, totalFrames.value, fps.value);
	watch(modelValue, (value) => {
		const trim = sanitizeTrim(value.trim);
		const crop = sanitizeCrop(value.crop);
		if (trim !== value.trim || crop !== value.crop) modelValue.value = {
			...value,
			...trim && { trim },
			...crop && { crop }
		};
	}, { immediate: true });
	const trimSection = computed(() => sanitizeTrim(modelValue.value.trim) ?? {
		start_time: 0,
		duration: 0
	});
	const trimsToVideoEnd = computed(() => trimSection.value.duration === 0);
	const endTimeSeconds = computed(() => trimsToVideoEnd.value ? duration.value : trimSection.value.start_time + trimSection.value.duration);
	function setTrim(trim) {
		modelValue.value = {
			...modelValue.value,
			trim
		};
	}
	const currentEndFrame = () => trimsToVideoEnd.value ? frameMax.value : clamp(toFrame(endTimeSeconds.value) - 1, 0, frameMax.value);
	return {
		startFrame: computed({
			get: () => clamp(toFrame(trimSection.value.start_time), 0, frameMax.value),
			set: (frame) => {
				const maxStart = Math.max(currentEndFrame() - 1, 0);
				const startTime = roundSeconds(toTime(clamp(frame, 0, maxStart)));
				setTrim({
					start_time: startTime,
					duration: trimsToVideoEnd.value ? 0 : roundSeconds(Math.max(endTimeSeconds.value - startTime, 0))
				});
			}
		}),
		endFrame: computed({
			get: () => currentEndFrame(),
			set: (frame) => {
				const minEnd = clamp(toFrame(trimSection.value.start_time) + 1, 0, frameMax.value);
				const clamped = clamp(frame, minEnd, frameMax.value);
				setTrim({
					start_time: trimSection.value.start_time,
					duration: clamped >= frameMax.value ? 0 : roundSeconds(Math.max(toTime(clamped + 1) - trimSection.value.start_time, 0))
				});
			}
		}),
		cropBounds: computed({
			get: () => {
				const crop = sanitizeCrop(modelValue.value.crop);
				if (!crop || crop.width <= 0 || crop.height <= 0) return {
					x: 0,
					y: 0,
					width: width.value,
					height: height.value
				};
				if (width.value > 0 && height.value > 0) {
					const x = Math.min(crop.x, width.value - 1);
					const y = Math.min(crop.y, height.value - 1);
					return {
						x,
						y,
						width: Math.min(crop.width, width.value - x),
						height: Math.min(crop.height, height.value - y)
					};
				}
				return { ...crop };
			},
			set: (next) => {
				if (next.x <= 0 && next.y <= 0 && next.width >= width.value && next.height >= height.value) {
					modelValue.value = {
						...modelValue.value,
						crop: {
							x: 0,
							y: 0,
							width: 0,
							height: 0
						}
					};
					return;
				}
				const x = clamp(Math.round(next.x), 0, width.value);
				const y = clamp(Math.round(next.y), 0, height.value);
				modelValue.value = {
					...modelValue.value,
					crop: {
						x,
						y,
						width: clamp(Math.round(next.width), 0, width.value - x),
						height: clamp(Math.round(next.height), 0, height.value - y)
					}
				};
			}
		})
	};
}
//#endregion
//#region src/composables/video/useVideoSourceUrl.ts
var REMOTE_WIDGET_PLACEHOLDER = "Loading...";
function resolveFileWidgetVideoUrl(rawValue) {
	if (typeof rawValue !== "string" || !rawValue || rawValue === REMOTE_WIDGET_PLACEHOLDER) return;
	const { filename, subfolder, type } = parseImageWidgetValue(rawValue);
	if (!filename) return void 0;
	const params = new URLSearchParams({
		filename,
		subfolder,
		type
	});
	appendCloudResParam(params, filename);
	return api.apiURL(`/view?${params}${app.getPreviewFormatParam()}`);
}
function useVideoSourceUrl(node, inputName = "video") {
	const nodeOutputStore = useNodeOutputStore();
	const widgetValueStore = useWidgetValueStore();
	const { nodeToNodeLocatorId } = useWorkflowStore();
	const resolvedUrl = ref();
	function resolveSourceNode() {
		const current = node.value;
		if (!current) return void 0;
		const slot = current.inputs.findIndex((input) => input.name === inputName);
		if (slot < 0) return current;
		let upstream = current.getInputNode(slot);
		let link = current.getInputLink(slot);
		const visited = /* @__PURE__ */ new Set();
		while (upstream?.isSubgraphNode()) {
			if (!link || visited.has(upstream)) return void 0;
			visited.add(upstream);
			const resolved = upstream.resolveSubgraphOutputLink(link.origin_slot);
			if (!resolved) return void 0;
			upstream = resolved.outputNode ?? null;
			link = resolved.link;
		}
		return upstream ?? void 0;
	}
	function sourceFileWidgetValue(source) {
		const graphId = source.graph?.rootGraph.id;
		return (graphId ? widgetValueStore.getWidget(widgetId(graphId, source.id, "file"))?.value : void 0) ?? source.widgets?.find((widget) => widget.name === "file")?.value;
	}
	function stripRandParam(url) {
		const [base, query] = url.split("?");
		if (!query) return url;
		const params = new URLSearchParams(query);
		params.delete("rand");
		return `${base}?${params}`;
	}
	function resolveVideoUrl() {
		const source = resolveSourceNode();
		if (!source) return void 0;
		const rawOutputUrl = nodeOutputStore.getNodeImageUrls(source)?.[0];
		const outputUrl = rawOutputUrl && stripRandParam(rawOutputUrl);
		const fileUrl = resolveFileWidgetVideoUrl(sourceFileWidgetValue(source));
		return source === node.value ? fileUrl ?? outputUrl : outputUrl ?? fileUrl;
	}
	function updateVideoUrl(reExecuted = false) {
		const next = resolveVideoUrl();
		if (next !== void 0 && next === resolvedUrl.value) {
			if (reExecuted) retry();
			return;
		}
		resolvedUrl.value = next;
	}
	const connectionVersion = ref(0);
	let scopeDisposed = false;
	let listeningNode;
	let installedCallback;
	let previousCallback;
	function detachConnectionListener() {
		if (listeningNode && listeningNode.onConnectionsChange === installedCallback) listeningNode.onConnectionsChange = previousCallback;
		listeningNode = void 0;
		installedCallback = void 0;
		previousCallback = void 0;
	}
	function attachConnectionListener() {
		const current = node.value;
		if (!current || current === listeningNode) return;
		detachConnectionListener();
		previousCallback = current.onConnectionsChange;
		installedCallback = useChainCallback(previousCallback, () => {
			if (!scopeDisposed) connectionVersion.value++;
		});
		current.onConnectionsChange = installedCallback;
		listeningNode = current;
	}
	onScopeDispose(() => {
		scopeDisposed = true;
		detachConnectionListener();
	});
	watch(node, attachConnectionListener);
	watch(() => {
		connectionVersion.value;
		const source = resolveSourceNode();
		if (!source) return [];
		const locatorId = nodeToNodeLocatorId(source);
		return [
			nodeOutputStore.nodeOutputs[locatorId],
			nodeOutputStore.nodePreviewImages[locatorId],
			sourceFileWidgetValue(source)
		];
	}, (newDeps, oldDeps) => {
		const outputs = newDeps[0];
		updateVideoUrl(outputs !== void 0 && outputs !== oldDeps[0]);
	});
	onMounted(() => {
		attachConnectionListener();
		updateVideoUrl();
	});
	const { src: videoUrl, status, onError, retry } = useRetryableMediaSrc(resolvedUrl);
	return {
		videoUrl,
		status,
		onError,
		retry
	};
}
//#endregion
//#region src/components/videoEdit/WidgetVideoEdit.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1 = ["data-widget-name"];
//#endregion
//#region src/components/videoEdit/WidgetVideoEdit.vue
var WidgetVideoEdit_default = /* @__PURE__ */ defineComponent({
	__name: "WidgetVideoEdit",
	props: /*@__PURE__*/ mergeModels({
		widget: {},
		nodeId: {}
	}, {
		"modelValue": { default: () => ({}) },
		"modelModifiers": {}
	}),
	emits: ["update:modelValue"],
	setup(__props) {
		const modelValue = useModel(__props, "modelValue");
		const features = computed(() => __props.widget.options?.features ?? ["trim", "crop"]);
		const { videoUrl, status, onError, retry } = useVideoSourceUrl(computed(() => {
			const locatorId = __props.widget.nodeLocatorId;
			return locatorId && getNodeByLocatorId(app.rootGraph, locatorId) || app.canvas.graph?.getNodeById(__props.nodeId);
		}));
		const { thumbnail, duration, totalFrames, width, height, fps, fileSize, loading: filmstripLoading, error: filmstripError } = useVideoFilmstrip(videoUrl);
		watch(filmstripError, (error) => {
			if (error === "load-failed") onError();
		});
		const hasSource = computed(() => status.value !== "idle");
		const loading = computed(() => status.value !== "failed" && (filmstripLoading.value || status.value === "retrying"));
		const error = computed(() => {
			if (filmstripError.value === "canvas-unavailable") return "canvas-unavailable";
			return status.value === "failed" ? "load-failed" : null;
		});
		const { startFrame, endFrame, cropBounds } = useVideoEditModel(modelValue, {
			duration,
			totalFrames,
			fps,
			width,
			height
		});
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", {
				class: "w-full",
				"data-widget-name": __props.widget.name
			}, [createVNode(VideoEditPanel_default, {
				"start-frame": unref(startFrame),
				"onUpdate:startFrame": _cache[0] || (_cache[0] = ($event) => isRef(startFrame) ? startFrame.value = $event : null),
				"end-frame": unref(endFrame),
				"onUpdate:endFrame": _cache[1] || (_cache[1] = ($event) => isRef(endFrame) ? endFrame.value = $event : null),
				"crop-bounds": unref(cropBounds),
				"onUpdate:cropBounds": _cache[2] || (_cache[2] = ($event) => isRef(cropBounds) ? cropBounds.value = $event : null),
				features: features.value,
				"video-url": unref(videoUrl),
				thumbnail: unref(thumbnail),
				"total-frames": unref(totalFrames),
				duration: unref(duration),
				fps: unref(fps),
				"file-size": unref(fileSize),
				width: unref(width),
				height: unref(height),
				"has-source": hasSource.value,
				loading: loading.value,
				error: error.value,
				onLoadError: unref(onError),
				onRetry: unref(retry)
			}, null, 8, [
				"start-frame",
				"end-frame",
				"crop-bounds",
				"features",
				"video-url",
				"thumbnail",
				"total-frames",
				"duration",
				"fps",
				"file-size",
				"width",
				"height",
				"has-source",
				"loading",
				"error",
				"onLoadError",
				"onRetry"
			])], 8, _hoisted_1);
		};
	}
});
//#endregion
export { WidgetVideoEdit_default as default };
