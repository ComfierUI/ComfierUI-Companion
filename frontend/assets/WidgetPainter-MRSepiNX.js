import "./rolldown-runtime-xtsTai4I.js";
import { Dt as withDirectives, E as withModifiers, Et as withCtx, F as createBaseVNode, G as defineComponent, H as createTextVNode, Jt as normalizeClass, Kt as unref, L as createCommentVNode, Lt as ref, O as Fragment, P as computed, Q as mergeModels, R as createElementBlock, St as watch, U as createVNode, Xt as normalizeStyle, Zt as toDisplayString, lt as openBlock, ot as onMounted, st as onUnmounted, w as vShow, xt as useTemplateRef, yt as useModel } from "./vendor-vue-core-C1utdb0s.js";
import { b as useElementSize } from "./vendor-vueuse-BxKIIsKg.js";
import { an as getEffectiveHardness, cn as setNodeWidgetValue, go as useNodeOutputStore, il as useWidgetValueStore, in as getEffectiveBrushSize, ll as widgetId, o as app, rn as StrokeProcessor } from "./layoutStore-CZsuzg91.js";
import { i as api } from "./api-Bt-fGt5a.js";
import { t as useToastStore } from "./toastStore-CTfykAzG.js";
import { r as useI18n } from "./vendor-i18n-BZvE7WBQ.js";
import { t as cn } from "./src-DI1bBfrb.js";
import { t as Button_default } from "./Button-j0oCzR82.js";
import { i as hexToRgb, v as toHexFromFormat } from "./colorUtil-BzdMMd-Y.js";
import { t as Slider_default } from "./Slider-eQb4a5yt.js";
//#region src/composables/painter/usePainter.ts
var PAINTER_TOOLS = {
	BRUSH: "brush",
	ERASER: "eraser"
};
function usePainter(nodeId, options) {
	const { canvasEl, cursorEl, modelValue } = options;
	const { t } = useI18n();
	const nodeOutputStore = useNodeOutputStore();
	const toastStore = useToastStore();
	const isDirty = ref(false);
	const cursorVisible = ref(false);
	const inputImageUrl = ref(null);
	const isImageInputConnected = ref(false);
	let isDrawing = false;
	let strokeProcessor = null;
	let lastPoint = null;
	let cachedRect = null;
	let mainCtx = null;
	let strokeCanvas = null;
	let strokeCtx = null;
	let baseCanvas = null;
	let baseCtx = null;
	let hasBaseSnapshot = false;
	let dirtyX0 = 0;
	let dirtyY0 = 0;
	let dirtyX1 = 0;
	let dirtyY1 = 0;
	let hasDirtyRect = false;
	let strokeBrush = null;
	const litegraphNode = computed(() => {
		if (!nodeId || !app.canvas.graph) return null;
		return app.canvas.graph.getNodeById(nodeId);
	});
	const widgetValueStore = useWidgetValueStore();
	function storedWidgetValue(name) {
		const node = litegraphNode.value;
		if (!node) return void 0;
		const graphId = node.graph?.rootGraph.id;
		return graphId ? widgetValueStore.getWidget(widgetId(graphId, node.id, name))?.value : void 0;
	}
	function writeWidgetValue(name, value) {
		const node = litegraphNode.value;
		const widget = node?.widgets?.find((w) => w.name === name);
		if (!node || !widget || widget.value === value) return;
		setNodeWidgetValue(node, name, value);
	}
	function numberWidgetProjection(name, fallback) {
		return computed({
			get: () => {
				const v = storedWidgetValue(name);
				return typeof v === "number" && v > 0 ? v : fallback;
			},
			set: (v) => writeWidgetValue(name, v)
		});
	}
	const canvasWidth = numberWidgetProjection("width", 512);
	const canvasHeight = numberWidgetProjection("height", 512);
	const backgroundColor = computed({
		get: () => {
			const v = storedWidgetValue("bg_color");
			return typeof v === "string" ? v : "#000000";
		},
		set: (v) => writeWidgetValue("bg_color", v)
	});
	const tool = ref(PAINTER_TOOLS.BRUSH);
	const brushSize = ref(20);
	const brushColor = ref("#ffffff");
	const brushOpacity = ref(1);
	const brushHardness = ref(1);
	function restoreSettingsFromProperties() {
		const node = litegraphNode.value;
		if (!node) return;
		const props = node.properties;
		if (props.painterTool != null) tool.value = props.painterTool;
		if (props.painterBrushSize != null) brushSize.value = props.painterBrushSize;
		if (props.painterBrushColor != null) brushColor.value = props.painterBrushColor;
		if (props.painterBrushOpacity != null) brushOpacity.value = props.painterBrushOpacity;
		if (props.painterBrushHardness != null) brushHardness.value = props.painterBrushHardness;
	}
	function saveSettingsToProperties() {
		const node = litegraphNode.value;
		if (!node) return;
		node.properties.painterTool = tool.value;
		node.properties.painterBrushSize = brushSize.value;
		node.properties.painterBrushColor = brushColor.value;
		node.properties.painterBrushOpacity = brushOpacity.value;
		node.properties.painterBrushHardness = brushHardness.value;
	}
	function updateInputImageUrl() {
		const node = litegraphNode.value;
		if (!node) {
			inputImageUrl.value = null;
			isImageInputConnected.value = false;
			return;
		}
		isImageInputConnected.value = node.isInputConnected(0);
		const inputNode = node.getInputNode(0);
		if (!inputNode) {
			inputImageUrl.value = null;
			return;
		}
		const urls = nodeOutputStore.getNodeImageUrls(inputNode);
		inputImageUrl.value = urls?.length ? urls[0] : null;
	}
	function activeHardness() {
		return tool.value === PAINTER_TOOLS.ERASER ? 1 : brushHardness.value;
	}
	const { width: canvasDisplayWidth } = useElementSize(canvasEl);
	const displayBrushSize = computed(() => {
		if (!canvasDisplayWidth.value || !canvasWidth.value) return brushSize.value;
		const radius = brushSize.value / 2;
		return getEffectiveBrushSize(radius, activeHardness()) * 2 * (canvasDisplayWidth.value / canvasWidth.value);
	});
	function getCtx() {
		if (!mainCtx && canvasEl.value) mainCtx = canvasEl.value.getContext("2d") ?? null;
		return mainCtx;
	}
	function cacheCanvasRect() {
		const el = canvasEl.value;
		if (el) cachedRect = el.getBoundingClientRect();
	}
	function getCanvasPoint(e) {
		const el = canvasEl.value;
		if (!el) return null;
		const rect = cachedRect ?? el.getBoundingClientRect();
		return {
			x: (e.clientX - rect.left) / rect.width * el.width,
			y: (e.clientY - rect.top) / rect.height * el.height
		};
	}
	function expandDirtyRect(cx, cy, r) {
		const x0 = cx - r;
		const y0 = cy - r;
		const x1 = cx + r;
		const y1 = cy + r;
		if (!hasDirtyRect) {
			dirtyX0 = x0;
			dirtyY0 = y0;
			dirtyX1 = x1;
			dirtyY1 = y1;
			hasDirtyRect = true;
		} else {
			if (x0 < dirtyX0) dirtyX0 = x0;
			if (y0 < dirtyY0) dirtyY0 = y0;
			if (x1 > dirtyX1) dirtyX1 = x1;
			if (y1 > dirtyY1) dirtyY1 = y1;
		}
	}
	function snapshotBrush() {
		const radius = brushSize.value / 2;
		const hardness = activeHardness();
		const effectiveRadius = getEffectiveBrushSize(radius, hardness);
		strokeBrush = {
			radius,
			effectiveRadius,
			effectiveHardness: getEffectiveHardness(radius, hardness, effectiveRadius),
			hardness,
			...hexToRgb(brushColor.value)
		};
	}
	function drawCircle(ctx, point) {
		const b = strokeBrush;
		expandDirtyRect(point.x, point.y, b.effectiveRadius);
		ctx.beginPath();
		ctx.arc(point.x, point.y, b.effectiveRadius, 0, Math.PI * 2);
		if (b.hardness < 1) {
			const gradient = ctx.createRadialGradient(point.x, point.y, 0, point.x, point.y, b.effectiveRadius);
			gradient.addColorStop(0, `rgba(${b.r}, ${b.g}, ${b.b}, 1)`);
			gradient.addColorStop(b.effectiveHardness, `rgba(${b.r}, ${b.g}, ${b.b}, 1)`);
			gradient.addColorStop(1, `rgba(${b.r}, ${b.g}, ${b.b}, 0)`);
			ctx.fillStyle = gradient;
		}
		ctx.fill();
	}
	function drawSegment(ctx, from, to) {
		const b = strokeBrush;
		if (b.hardness < 1) {
			const dx = to.x - from.x;
			const dy = to.y - from.y;
			const dist = Math.hypot(dx, dy);
			const step = Math.max(1, b.effectiveRadius / 2);
			if (dist > 0) {
				const steps = Math.ceil(dist / step);
				const dabPoint = {
					x: 0,
					y: 0
				};
				for (let i = 1; i <= steps; i++) {
					const t = i / steps;
					dabPoint.x = from.x + dx * t;
					dabPoint.y = from.y + dy * t;
					drawCircle(ctx, dabPoint);
				}
			}
		} else {
			expandDirtyRect(from.x, from.y, b.effectiveRadius);
			ctx.beginPath();
			ctx.moveTo(from.x, from.y);
			ctx.lineTo(to.x, to.y);
			ctx.stroke();
			drawCircle(ctx, to);
		}
	}
	function applyBrushStyle(ctx) {
		const b = strokeBrush;
		const color = `rgb(${b.r}, ${b.g}, ${b.b})`;
		ctx.globalCompositeOperation = "source-over";
		ctx.globalAlpha = 1;
		ctx.fillStyle = color;
		ctx.strokeStyle = color;
		ctx.lineWidth = b.effectiveRadius * 2;
		ctx.lineCap = "round";
		ctx.lineJoin = "round";
	}
	function ensureStrokeCanvas() {
		const el = canvasEl.value;
		if (!el) return null;
		if (!strokeCanvas || strokeCanvas.width !== el.width || strokeCanvas.height !== el.height) {
			strokeCanvas = document.createElement("canvas");
			strokeCanvas.width = el.width;
			strokeCanvas.height = el.height;
			strokeCtx = strokeCanvas.getContext("2d");
		}
		strokeCtx?.clearRect(0, 0, strokeCanvas.width, strokeCanvas.height);
		return strokeCtx;
	}
	function ensureBaseCanvas() {
		const el = canvasEl.value;
		if (!el) return null;
		if (!baseCanvas || baseCanvas.width !== el.width || baseCanvas.height !== el.height) {
			baseCanvas = document.createElement("canvas");
			baseCanvas.width = el.width;
			baseCanvas.height = el.height;
			baseCtx = baseCanvas.getContext("2d");
		}
		return baseCtx;
	}
	function compositeStrokeToMain(isPreview = false) {
		const el = canvasEl.value;
		const ctx = getCtx();
		if (!el || !ctx || !strokeCanvas) return;
		const useDirty = hasDirtyRect;
		const sx = Math.max(0, Math.floor(dirtyX0));
		const sy = Math.max(0, Math.floor(dirtyY0));
		const sr = Math.min(el.width, Math.ceil(dirtyX1));
		const sb = Math.min(el.height, Math.ceil(dirtyY1));
		const sw = sr - sx;
		const sh = sb - sy;
		hasDirtyRect = false;
		if (hasBaseSnapshot && baseCanvas) {
			if (useDirty && sw > 0 && sh > 0) {
				ctx.clearRect(sx, sy, sw, sh);
				ctx.drawImage(baseCanvas, sx, sy, sw, sh, sx, sy, sw, sh);
			} else {
				ctx.clearRect(0, 0, el.width, el.height);
				ctx.drawImage(baseCanvas, 0, 0);
			}
		}
		ctx.save();
		const isEraser = tool.value === PAINTER_TOOLS.ERASER;
		ctx.globalAlpha = isEraser ? 1 : brushOpacity.value;
		ctx.globalCompositeOperation = isEraser ? "destination-out" : "source-over";
		if (useDirty && sw > 0 && sh > 0) ctx.drawImage(strokeCanvas, sx, sy, sw, sh, sx, sy, sw, sh);
		else ctx.drawImage(strokeCanvas, 0, 0);
		ctx.restore();
		if (!isPreview) hasBaseSnapshot = false;
	}
	function startStroke(e) {
		const point = getCanvasPoint(e);
		if (!point) return;
		const el = canvasEl.value;
		if (!el) return;
		const bCtx = ensureBaseCanvas();
		if (bCtx) {
			bCtx.clearRect(0, 0, el.width, el.height);
			bCtx.drawImage(el, 0, 0);
			hasBaseSnapshot = true;
		}
		isDrawing = true;
		isDirty.value = true;
		snapshotBrush();
		strokeProcessor = new StrokeProcessor(Math.max(1, strokeBrush.radius / 2));
		strokeProcessor.addPoint(point);
		lastPoint = point;
		const ctx = ensureStrokeCanvas();
		if (!ctx) return;
		ctx.save();
		applyBrushStyle(ctx);
		drawCircle(ctx, point);
		ctx.restore();
		compositeStrokeToMain(true);
	}
	function continueStroke(e) {
		if (!isDrawing || !strokeProcessor || !strokeCtx) return;
		const point = getCanvasPoint(e);
		if (!point) return;
		const points = strokeProcessor.addPoint(point);
		if (points.length === 0 && lastPoint) points.push(point);
		if (points.length === 0) return;
		strokeCtx.save();
		applyBrushStyle(strokeCtx);
		let prev = lastPoint ?? points[0];
		for (const p of points) {
			drawSegment(strokeCtx, prev, p);
			prev = p;
		}
		lastPoint = prev;
		strokeCtx.restore();
		compositeStrokeToMain(true);
	}
	function endStroke() {
		if (!isDrawing || !strokeProcessor) return;
		const points = strokeProcessor.endStroke();
		if (strokeCtx && points.length > 0) {
			strokeCtx.save();
			applyBrushStyle(strokeCtx);
			let prev = lastPoint ?? points[0];
			for (const p of points) {
				drawSegment(strokeCtx, prev, p);
				prev = p;
			}
			strokeCtx.restore();
		}
		compositeStrokeToMain();
		isDrawing = false;
		strokeProcessor = null;
		strokeBrush = null;
		lastPoint = null;
	}
	function resizeCanvas() {
		const el = canvasEl.value;
		if (!el) return;
		let tmp = null;
		if (el.width > 0 && el.height > 0) {
			tmp = document.createElement("canvas");
			tmp.width = el.width;
			tmp.height = el.height;
			tmp.getContext("2d").drawImage(el, 0, 0);
		}
		el.width = canvasWidth.value;
		el.height = canvasHeight.value;
		mainCtx = null;
		if (tmp) getCtx()?.drawImage(tmp, 0, 0);
		strokeCanvas = null;
		strokeCtx = null;
		baseCanvas = null;
		baseCtx = null;
		hasBaseSnapshot = false;
	}
	function handleClear() {
		const el = canvasEl.value;
		const ctx = getCtx();
		if (!el || !ctx) return;
		ctx.clearRect(0, 0, el.width, el.height);
		isDirty.value = true;
		modelValue.value = "";
	}
	function updateCursorPos(e) {
		const el = cursorEl.value;
		if (!el) return;
		const size = displayBrushSize.value;
		el.style.transform = `translate(${e.offsetX - size / 2}px, ${e.offsetY - size / 2}px)`;
	}
	function handlePointerDown(e) {
		if (e.button !== 0) return;
		cacheCanvasRect();
		updateCursorPos(e);
		startStroke(e);
		try {
			e.target.setPointerCapture(e.pointerId);
		} catch {}
	}
	let pendingMoveEvent = null;
	let rafId = null;
	function flushPendingStroke() {
		if (pendingMoveEvent) {
			continueStroke(pendingMoveEvent);
			pendingMoveEvent = null;
		}
		rafId = null;
	}
	function handlePointerMove(e) {
		updateCursorPos(e);
		if (!isDrawing) return;
		pendingMoveEvent = e;
		if (!rafId) rafId = requestAnimationFrame(flushPendingStroke);
	}
	function handlePointerUp(e) {
		if (e.button !== 0) return;
		if (rafId) {
			cancelAnimationFrame(rafId);
			flushPendingStroke();
		}
		try {
			e.target.releasePointerCapture(e.pointerId);
		} catch {}
		endStroke();
	}
	function handlePointerLeave() {
		cursorVisible.value = false;
		if (rafId) {
			cancelAnimationFrame(rafId);
			flushPendingStroke();
		}
		endStroke();
	}
	function handlePointerEnter() {
		cursorVisible.value = true;
	}
	function handleInputImageLoad(e) {
		const img = e.target;
		canvasWidth.value = img.naturalWidth;
		canvasHeight.value = img.naturalHeight;
	}
	function parseMaskFilename(value) {
		const trimmed = value.trim();
		if (!trimmed) return null;
		const typeMatch = trimmed.match(/^(.+?) \[([^\]]+)\]$/);
		const pathPart = typeMatch ? typeMatch[1] : trimmed;
		const type = typeMatch ? typeMatch[2] : "input";
		const lastSlash = pathPart.lastIndexOf("/");
		const subfolder = lastSlash !== -1 ? pathPart.substring(0, lastSlash) : "";
		return {
			filename: lastSlash !== -1 ? pathPart.substring(lastSlash + 1) : pathPart,
			subfolder,
			type
		};
	}
	async function serializeValue() {
		const el = canvasEl.value;
		if (!el) return modelValue.value;
		if (!isDirty.value && modelValue.value) return modelValue.value;
		const blob = await new Promise((resolve) => el.toBlob(resolve, "image/png"));
		if (!blob) return modelValue.value;
		const name = `painter-${nodeId}-${Date.now()}.png`;
		const body = new FormData();
		body.append("image", blob, name);
		body.append("type", "input");
		let resp;
		try {
			resp = await api.fetchApi("/upload/image", {
				method: "POST",
				body
			});
		} catch (e) {
			const err = t("painter.uploadError", {
				status: 0,
				statusText: e instanceof Error ? e.message : String(e)
			});
			toastStore.addAlert(err);
			throw new Error(err, { cause: e });
		}
		if (resp.status !== 200) {
			const bodyText = await resp.text().catch(() => "");
			const err = t("painter.uploadError", {
				status: resp.status,
				statusText: bodyText || resp.statusText || "unknown error"
			});
			toastStore.addAlert(err);
			throw new Error(err);
		}
		let data;
		try {
			data = await resp.json();
		} catch (e) {
			const err = t("painter.uploadError", {
				status: resp.status,
				statusText: e instanceof Error ? e.message : String(e)
			});
			toastStore.addAlert(err);
			throw new Error(err, { cause: e });
		}
		if (!data.name) {
			const detail = `Painter upload succeeded (${resp.status}) but response is missing 'name'`;
			toastStore.addAlert(detail);
			throw new Error(detail);
		}
		const result = `${data.name} [input]`;
		modelValue.value = result;
		isDirty.value = false;
		return result;
	}
	function registerWidgetSerialization() {
		const node = litegraphNode.value;
		if (!node?.widgets) return;
		const targetWidget = node.widgets.find((w) => w.name === "mask");
		if (targetWidget) targetWidget.serializeValue = serializeValue;
	}
	function restoreCanvas() {
		const parsed = parseMaskFilename(modelValue.value);
		if (!parsed) return;
		const params = new URLSearchParams();
		params.set("filename", parsed.filename);
		if (parsed.subfolder) params.set("subfolder", parsed.subfolder);
		params.set("type", parsed.type);
		const url = api.apiURL("/view?" + params.toString());
		const img = new Image();
		img.crossOrigin = "anonymous";
		img.onload = () => {
			if (!canvasEl.value) return;
			canvasWidth.value = img.naturalWidth;
			canvasHeight.value = img.naturalHeight;
			mainCtx = null;
			getCtx()?.drawImage(img, 0, 0);
			isDirty.value = false;
		};
		img.onerror = () => {
			modelValue.value = "";
		};
		img.src = url;
	}
	watch(() => nodeOutputStore.nodeOutputs, updateInputImageUrl, { deep: true });
	watch(() => nodeOutputStore.nodePreviewImages, updateInputImageUrl, { deep: true });
	watch([canvasWidth, canvasHeight], resizeCanvas);
	watch([
		tool,
		brushSize,
		brushColor,
		brushOpacity,
		brushHardness
	], saveSettingsToProperties);
	function initialize() {
		resizeCanvas();
		registerWidgetSerialization();
		restoreSettingsFromProperties();
		updateInputImageUrl();
		restoreCanvas();
	}
	onMounted(initialize);
	onUnmounted(() => {
		if (rafId) {
			cancelAnimationFrame(rafId);
			rafId = null;
		}
	});
	return {
		tool,
		brushSize,
		brushColor,
		brushOpacity,
		brushHardness,
		backgroundColor,
		canvasWidth,
		canvasHeight,
		cursorVisible,
		displayBrushSize,
		inputImageUrl,
		isImageInputConnected,
		handlePointerDown,
		handlePointerMove,
		handlePointerUp,
		handlePointerEnter,
		handlePointerLeave,
		handleInputImageLoad,
		handleClear
	};
}
//#endregion
//#region src/components/painter/WidgetPainter.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1 = { class: "flex min-h-0 flex-1 items-center justify-center overflow-hidden rounded-lg bg-node-component-surface" };
var _hoisted_2 = ["src"];
var _hoisted_3 = {
	key: 0,
	class: "text-center text-xs text-muted-foreground",
	"data-testid": "painter-dimension-text"
};
var _hoisted_4 = { class: "flex w-28 items-center truncate text-sm text-muted-foreground" };
var _hoisted_5 = { class: "flex h-8 items-center gap-1 rounded-sm bg-component-node-widget-background p-1" };
var _hoisted_6 = { class: "flex w-28 items-center truncate text-sm text-muted-foreground" };
var _hoisted_7 = {
	class: "flex h-8 items-center gap-2 rounded-lg bg-component-node-widget-background pr-2 pl-3",
	"data-testid": "painter-size-row"
};
var _hoisted_8 = {
	class: "w-8 text-center text-xs text-muted-foreground",
	"data-testid": "painter-size-value"
};
var _hoisted_9 = { class: "flex w-28 items-center truncate text-sm text-muted-foreground" };
var _hoisted_10 = {
	class: "flex h-8 w-full items-center gap-2 rounded-lg bg-component-node-widget-background px-4",
	"data-testid": "painter-color-row"
};
var _hoisted_11 = ["value"];
var _hoisted_12 = { class: "min-w-[4ch] truncate text-xs" };
var _hoisted_13 = { class: "ml-auto flex items-center text-xs text-muted-foreground" };
var _hoisted_14 = ["value"];
var _hoisted_15 = { class: "flex w-28 items-center truncate text-sm text-muted-foreground" };
var _hoisted_16 = {
	class: "flex h-8 items-center gap-2 rounded-lg bg-component-node-widget-background pr-2 pl-3",
	"data-testid": "painter-hardness-row"
};
var _hoisted_17 = {
	class: "w-8 text-center text-xs text-muted-foreground",
	"data-testid": "painter-hardness-value"
};
var _hoisted_18 = { class: "flex w-28 items-center truncate text-sm text-muted-foreground" };
var _hoisted_19 = {
	class: "flex h-8 items-center gap-2 rounded-lg bg-component-node-widget-background pr-2 pl-3",
	"data-testid": "painter-width-row"
};
var _hoisted_20 = { class: "w-10 text-center text-xs text-muted-foreground" };
var _hoisted_21 = { class: "flex w-28 items-center truncate text-sm text-muted-foreground" };
var _hoisted_22 = {
	class: "flex h-8 items-center gap-2 rounded-lg bg-component-node-widget-background pr-2 pl-3",
	"data-testid": "painter-height-row"
};
var _hoisted_23 = { class: "w-10 text-center text-xs text-muted-foreground" };
var _hoisted_24 = { class: "flex w-28 items-center truncate text-sm text-muted-foreground" };
var _hoisted_25 = {
	class: "flex h-8 w-full items-center gap-2 rounded-lg bg-component-node-widget-background px-4",
	"data-testid": "painter-bg-color-row"
};
var _hoisted_26 = ["value"];
var _hoisted_27 = { class: "min-w-[4ch] truncate text-xs" };
//#endregion
//#region src/components/painter/WidgetPainter.vue
var WidgetPainter_default = /* @__PURE__ */ defineComponent({
	__name: "WidgetPainter",
	props: /*@__PURE__*/ mergeModels({ nodeId: {} }, {
		"modelValue": { default: "" },
		"modelModifiers": {}
	}),
	emits: ["update:modelValue"],
	setup(__props) {
		const modelValue = useModel(__props, "modelValue");
		const canvasEl = useTemplateRef("canvasEl");
		const cursorEl = useTemplateRef("cursorEl");
		const controlsEl = useTemplateRef("controlsEl");
		const { width: controlsWidth } = useElementSize(controlsEl);
		const compact = computed(() => controlsWidth.value > 0 && controlsWidth.value < 350);
		const { tool, brushSize, brushColor, brushOpacity, brushHardness, backgroundColor, canvasWidth, canvasHeight, cursorVisible, displayBrushSize, inputImageUrl, isImageInputConnected, handlePointerDown, handlePointerMove, handlePointerUp, handlePointerEnter, handlePointerLeave, handleInputImageLoad, handleClear } = usePainter(__props.nodeId, {
			canvasEl,
			cursorEl,
			modelValue
		});
		const canvasContainerStyle = computed(() => ({
			aspectRatio: `${canvasWidth.value} / ${canvasHeight.value}`,
			backgroundColor: isImageInputConnected.value ? void 0 : backgroundColor.value
		}));
		const cursorSizeStyle = computed(() => ({
			width: `${displayBrushSize.value}px`,
			height: `${displayBrushSize.value}px`
		}));
		const brushOpacityPercent = computed({
			get: () => Math.round(brushOpacity.value * 100),
			set: (val) => {
				brushOpacity.value = val / 100;
			}
		});
		const brushHardnessPercent = computed({
			get: () => Math.round(brushHardness.value * 100),
			set: (val) => {
				brushHardness.value = val / 100;
			}
		});
		const brushColorDisplay = computed({
			get: () => toHexFromFormat(brushColor.value, "hex"),
			set: (val) => {
				brushColor.value = toHexFromFormat(val, "hex");
			}
		});
		const backgroundColorDisplay = computed({
			get: () => toHexFromFormat(backgroundColor.value, "hex"),
			set: (val) => {
				backgroundColor.value = toHexFromFormat(val, "hex");
			}
		});
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", {
				class: "widget-expands flex size-full flex-col gap-1",
				onPointerdown: _cache[17] || (_cache[17] = withModifiers(() => {}, ["stop"])),
				onPointermove: _cache[18] || (_cache[18] = withModifiers(() => {}, ["stop"])),
				onPointerup: _cache[19] || (_cache[19] = withModifiers(() => {}, ["stop"]))
			}, [
				createBaseVNode("div", _hoisted_1, [createBaseVNode("div", {
					class: "relative max-h-full w-full",
					style: normalizeStyle(canvasContainerStyle.value),
					"data-testid": "painter-canvas-container"
				}, [
					unref(inputImageUrl) ? (openBlock(), createElementBlock("img", {
						key: 0,
						src: unref(inputImageUrl),
						class: "absolute inset-0 size-full",
						draggable: "false",
						onLoad: _cache[0] || (_cache[0] = (...args) => unref(handleInputImageLoad) && unref(handleInputImageLoad)(...args)),
						onDragstart: _cache[1] || (_cache[1] = withModifiers(() => {}, ["prevent"]))
					}, null, 40, _hoisted_2)) : createCommentVNode("", true),
					createBaseVNode("canvas", {
						ref_key: "canvasEl",
						ref: canvasEl,
						"data-testid": "painter-canvas",
						class: "absolute inset-0 size-full cursor-none touch-none",
						onPointerdown: _cache[2] || (_cache[2] = (...args) => unref(handlePointerDown) && unref(handlePointerDown)(...args)),
						onPointermove: _cache[3] || (_cache[3] = (...args) => unref(handlePointerMove) && unref(handlePointerMove)(...args)),
						onPointerup: _cache[4] || (_cache[4] = (...args) => unref(handlePointerUp) && unref(handlePointerUp)(...args)),
						onPointerenter: _cache[5] || (_cache[5] = (...args) => unref(handlePointerEnter) && unref(handlePointerEnter)(...args)),
						onPointerleave: _cache[6] || (_cache[6] = (...args) => unref(handlePointerLeave) && unref(handlePointerLeave)(...args))
					}, null, 544),
					withDirectives(createBaseVNode("div", {
						ref_key: "cursorEl",
						ref: cursorEl,
						class: "pointer-events-none absolute top-0 left-0 rounded-full border border-black/60 shadow-[0_0_0_1px_rgba(255,255,255,0.8)] will-change-transform",
						style: normalizeStyle(cursorSizeStyle.value),
						"data-testid": "painter-cursor"
					}, null, 4), [[vShow, unref(cursorVisible)]])
				], 4)]),
				unref(isImageInputConnected) ? (openBlock(), createElementBlock("div", _hoisted_3, toDisplayString(unref(canvasWidth)) + " x " + toDisplayString(unref(canvasHeight)), 1)) : createCommentVNode("", true),
				createBaseVNode("div", {
					ref_key: "controlsEl",
					ref: controlsEl,
					class: normalizeClass(unref(cn)("grid shrink-0 gap-1", compact.value ? "grid-cols-1" : "grid-cols-[auto_1fr]"))
				}, [
					createBaseVNode("div", _hoisted_4, toDisplayString(_ctx.$t("painter.tool")), 1),
					createBaseVNode("div", _hoisted_5, [createVNode(Button_default, {
						variant: "textonly",
						size: "unset",
						class: normalizeClass(unref(cn)("flex-1 self-stretch px-2 text-xs transition-colors", unref(tool) === unref(PAINTER_TOOLS).BRUSH ? "rounded-sm bg-component-node-widget-background-selected text-base-foreground" : "text-muted-foreground hover:text-base-foreground")),
						onClick: _cache[7] || (_cache[7] = ($event) => tool.value = unref(PAINTER_TOOLS).BRUSH)
					}, {
						default: withCtx(() => [createTextVNode(toDisplayString(_ctx.$t("painter.brush")), 1)]),
						_: 1
					}, 8, ["class"]), createVNode(Button_default, {
						variant: "textonly",
						size: "unset",
						class: normalizeClass(unref(cn)("flex-1 self-stretch px-2 text-xs transition-colors", unref(tool) === unref(PAINTER_TOOLS).ERASER ? "rounded-sm bg-component-node-widget-background-selected text-base-foreground" : "text-muted-foreground hover:text-base-foreground")),
						onClick: _cache[8] || (_cache[8] = ($event) => tool.value = unref(PAINTER_TOOLS).ERASER)
					}, {
						default: withCtx(() => [createTextVNode(toDisplayString(_ctx.$t("painter.eraser")), 1)]),
						_: 1
					}, 8, ["class"])]),
					createBaseVNode("div", _hoisted_6, toDisplayString(_ctx.$t("painter.size")), 1),
					createBaseVNode("div", _hoisted_7, [createVNode(Slider_default, {
						"model-value": [unref(brushSize)],
						min: 1,
						max: 200,
						step: 1,
						class: "flex-1",
						"onUpdate:modelValue": _cache[9] || (_cache[9] = (v) => v?.length && (brushSize.value = v[0]))
					}, null, 8, ["model-value"]), createBaseVNode("span", _hoisted_8, toDisplayString(unref(brushSize)), 1)]),
					unref(tool) === unref(PAINTER_TOOLS).BRUSH ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
						createBaseVNode("div", _hoisted_9, toDisplayString(_ctx.$t("painter.color")), 1),
						createBaseVNode("div", _hoisted_10, [
							createBaseVNode("input", {
								type: "color",
								value: brushColorDisplay.value,
								class: "h-4 w-8 cursor-pointer appearance-none overflow-hidden rounded-full border-none bg-transparent [&::-moz-color-swatch]:rounded-full [&::-moz-color-swatch]:border-none [&::-webkit-color-swatch]:rounded-full [&::-webkit-color-swatch]:border-none [&::-webkit-color-swatch-wrapper]:p-0",
								onInput: _cache[10] || (_cache[10] = (e) => brushColorDisplay.value = e.target.value)
							}, null, 40, _hoisted_11),
							createBaseVNode("span", _hoisted_12, toDisplayString(brushColorDisplay.value), 1),
							createBaseVNode("span", _hoisted_13, [createBaseVNode("input", {
								type: "number",
								value: brushOpacityPercent.value,
								min: "0",
								max: "100",
								step: "1",
								class: "w-7 appearance-none border-0 bg-transparent text-right text-xs text-muted-foreground outline-none [-moz-appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none",
								onClick: _cache[11] || (_cache[11] = withModifiers(() => {}, ["stop"])),
								onChange: _cache[12] || (_cache[12] = (e) => {
									const val = Math.min(100, Math.max(0, Number(e.target.value)));
									brushOpacityPercent.value = val;
									e.target.value = String(val);
								})
							}, null, 40, _hoisted_14), _cache[20] || (_cache[20] = createTextVNode("%", -1))])
						]),
						createBaseVNode("div", _hoisted_15, toDisplayString(_ctx.$t("painter.hardness")), 1),
						createBaseVNode("div", _hoisted_16, [createVNode(Slider_default, {
							"model-value": [brushHardnessPercent.value],
							min: 0,
							max: 100,
							step: 1,
							class: "flex-1",
							"onUpdate:modelValue": _cache[13] || (_cache[13] = (v) => v?.length && (brushHardnessPercent.value = v[0]))
						}, null, 8, ["model-value"]), createBaseVNode("span", _hoisted_17, toDisplayString(brushHardnessPercent.value) + "%", 1)])
					], 64)) : createCommentVNode("", true),
					!unref(isImageInputConnected) ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
						createBaseVNode("div", _hoisted_18, toDisplayString(_ctx.$t("painter.width")), 1),
						createBaseVNode("div", _hoisted_19, [createVNode(Slider_default, {
							"model-value": [unref(canvasWidth)],
							min: 64,
							max: 4096,
							step: 64,
							class: "flex-1",
							"onUpdate:modelValue": _cache[14] || (_cache[14] = (v) => v?.length && (canvasWidth.value = v[0]))
						}, null, 8, ["model-value"]), createBaseVNode("span", _hoisted_20, toDisplayString(unref(canvasWidth)), 1)]),
						createBaseVNode("div", _hoisted_21, toDisplayString(_ctx.$t("painter.height")), 1),
						createBaseVNode("div", _hoisted_22, [createVNode(Slider_default, {
							"model-value": [unref(canvasHeight)],
							min: 64,
							max: 4096,
							step: 64,
							class: "flex-1",
							"onUpdate:modelValue": _cache[15] || (_cache[15] = (v) => v?.length && (canvasHeight.value = v[0]))
						}, null, 8, ["model-value"]), createBaseVNode("span", _hoisted_23, toDisplayString(unref(canvasHeight)), 1)]),
						createBaseVNode("div", _hoisted_24, toDisplayString(_ctx.$t("painter.background")), 1),
						createBaseVNode("div", _hoisted_25, [createBaseVNode("input", {
							type: "color",
							value: backgroundColorDisplay.value,
							class: "h-4 w-8 cursor-pointer appearance-none overflow-hidden rounded-full border-none bg-transparent [&::-moz-color-swatch]:rounded-full [&::-moz-color-swatch]:border-none [&::-webkit-color-swatch]:rounded-full [&::-webkit-color-swatch]:border-none [&::-webkit-color-swatch-wrapper]:p-0",
							onInput: _cache[16] || (_cache[16] = (e) => backgroundColorDisplay.value = e.target.value)
						}, null, 40, _hoisted_26), createBaseVNode("span", _hoisted_27, toDisplayString(backgroundColorDisplay.value), 1)])
					], 64)) : createCommentVNode("", true),
					createVNode(Button_default, {
						variant: "secondary",
						size: "md",
						"data-testid": "painter-clear-button",
						class: normalizeClass(unref(cn)("gap-2 rounded-lg border border-component-node-border bg-component-node-background text-xs text-muted-foreground hover:text-base-foreground", !compact.value && "col-span-2")),
						onClick: unref(handleClear)
					}, {
						default: withCtx(() => [_cache[21] || (_cache[21] = createBaseVNode("i", { class: "icon-[lucide--undo-2]" }, null, -1)), createTextVNode(" " + toDisplayString(_ctx.$t("painter.clear")), 1)]),
						_: 1
					}, 8, ["class", "onClick"])
				], 2)
			], 32);
		};
	}
});
//#endregion
export { WidgetPainter_default as default };
