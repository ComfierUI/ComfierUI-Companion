const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./dist-Bp3Fn1Wt.js","./vendor-ag-psd-iN-PK2Jv.js","./rolldown-runtime-xtsTai4I.js"])))=>i.map(i=>d[i]);
import { a as __toESM, r as __name } from "./rolldown-runtime-xtsTai4I.js";
import { a as __vitePreload } from "./vendor-datadog-DudeEV66.js";
import { Lt as clamp$1 } from "./vendor-other-BPEcPQTD.js";
import { Ft as reactive, Lt as ref, P as computed } from "./vendor-vue-core-C1utdb0s.js";
import { o as app } from "./layoutStore-CZsuzg91.js";
import { i as api } from "./api-Bt-fGt5a.js";
import { t as useToastStore } from "./toastStore-CTfykAzG.js";
import { r as useI18n } from "./vendor-i18n-BZvE7WBQ.js";
import { t as downloadBlob } from "./downloadUtil-Bysc7OZ_.js";
import { a as getCompositorInputsFingerprint, d as getCompositorWidgetValue, i as getCompositorCanvas, o as getCompositorLayers, r as getCompositorBBoxes } from "./useCompositorLayers-DOjMhGtA.js";
//#region src/renderer/extensions/layerEditor/engine/mode.ts
function def(blend, blendSpace, composite) {
	return {
		blend,
		defaultBlendSpace: blendSpace,
		defaultCompositeSpace: "linear",
		defaultComposite: composite
	};
}
var LAYER_MODES = {
	normal: def("normal", "linear", "union"),
	multiply: def("multiply", "linear", "clip-to-backdrop"),
	screen: def("screen", "perceptual", "clip-to-backdrop"),
	overlay: def("overlay", "perceptual", "clip-to-backdrop"),
	darken: def("darken", "linear", "clip-to-backdrop"),
	lighten: def("lighten", "linear", "clip-to-backdrop"),
	"color-dodge": def("color-dodge", "perceptual", "clip-to-backdrop"),
	"color-burn": def("color-burn", "perceptual", "clip-to-backdrop"),
	"hard-light": def("hard-light", "perceptual", "clip-to-backdrop"),
	"soft-light": def("soft-light", "perceptual", "clip-to-backdrop"),
	difference: def("difference", "perceptual", "clip-to-backdrop"),
	exclusion: def("exclusion", "perceptual", "clip-to-backdrop"),
	"linear-dodge": def("linear-dodge", "linear", "clip-to-backdrop"),
	"linear-burn": def("linear-burn", "perceptual", "clip-to-backdrop"),
	"vivid-light": def("vivid-light", "perceptual", "clip-to-backdrop"),
	"pin-light": def("pin-light", "perceptual", "clip-to-backdrop"),
	"linear-light": def("linear-light", "perceptual", "clip-to-backdrop"),
	"hard-mix": def("hard-mix", "perceptual", "clip-to-backdrop"),
	subtract: def("subtract", "linear", "clip-to-backdrop"),
	divide: def("divide", "linear", "clip-to-backdrop"),
	"grain-extract": def("grain-extract", "perceptual", "clip-to-backdrop"),
	"grain-merge": def("grain-merge", "perceptual", "clip-to-backdrop"),
	hue: def("hue", "perceptual", "clip-to-backdrop"),
	saturation: def("saturation", "perceptual", "clip-to-backdrop"),
	color: def("color", "perceptual", "clip-to-backdrop"),
	luminosity: def("luminosity", "linear", "clip-to-backdrop")
};
function defaultMode(blend = "normal") {
	return {
		blend,
		blendSpace: "auto",
		compositeSpace: "auto",
		composite: LAYER_MODES[blend].defaultComposite,
		legacy: false
	};
}
function resolveMode(mode, opts) {
	const def = LAYER_MODES[mode.blend];
	if (mode.legacy) return {
		blend: mode.blend,
		blendSpace: "perceptual",
		compositeSpace: "perceptual",
		composite: mode.composite,
		legacy: true
	};
	return {
		blend: opts?.groupPassThrough ? "normal" : mode.blend,
		blendSpace: mode.blendSpace === "auto" ? def.defaultBlendSpace : mode.blendSpace,
		compositeSpace: mode.compositeSpace === "auto" ? def.defaultCompositeSpace : mode.compositeSpace,
		composite: mode.composite,
		legacy: false
	};
}
//#endregion
//#region src/renderer/extensions/compositor/composables/compositorLayerState.ts
var HEX_COLOR_RE$1 = /^#[0-9a-fA-F]{6}$/;
var DEFAULT_BACKGROUND_ENTRY = {
	color: "#ffffff",
	opacity: 1,
	visible: false
};
var LAYER_STATE_VERSION = 1;
function isFiniteNumber(value) {
	return typeof value === "number" && Number.isFinite(value);
}
function isBlendFn(value) {
	return typeof value === "string" && Object.hasOwn(LAYER_MODES, value);
}
function parseTransform(value) {
	if (typeof value !== "object" || value === null) return null;
	const { x, y, w, h, rotation } = value;
	if (!isFiniteNumber(x) || !isFiniteNumber(y) || !isFiniteNumber(w) || !isFiniteNumber(h) || !isFiniteNumber(rotation)) return null;
	return {
		x,
		y,
		w,
		h,
		rotation
	};
}
function parseFlip(value) {
	if (value === void 0) return false;
	return typeof value === "boolean" ? value : null;
}
function parseEntry(value) {
	if (typeof value !== "object" || value === null) return null;
	const { name, visible, opacity, blend, transform, flipH, flipV } = value;
	const parsedTransform = parseTransform(transform);
	const parsedFlipH = parseFlip(flipH);
	const parsedFlipV = parseFlip(flipV);
	if (typeof name !== "string" || typeof visible !== "boolean" || !isFiniteNumber(opacity) || !isBlendFn(blend) || !parsedTransform || parsedFlipH === null || parsedFlipV === null) return null;
	return {
		name,
		visible,
		opacity,
		blend,
		transform: parsedTransform,
		flipH: parsedFlipH,
		flipV: parsedFlipV
	};
}
function backgroundEntry(node) {
	return {
		color: node.fill.type === "solid" ? node.fill.color : DEFAULT_BACKGROUND_ENTRY.color,
		opacity: node.opacity,
		visible: node.visible
	};
}
function extractLayerState(canvas, layers, layerFlips, inputs, inputOrder) {
	const background = layers.find((node) => node.kind === "fill");
	const imageNodes = layers.filter((node) => node.kind !== "fill");
	const orderIds = inputOrder ?? imageNodes.map((node) => node.id);
	const inputIndex = new Map(orderIds.map((id, index) => [id, index]));
	const entries = orderIds.map(() => null);
	const order = [];
	for (const node of imageNodes) {
		const index = inputIndex.get(node.id);
		if (index === void 0) continue;
		const flips = layerFlips(node.id);
		entries[index] = {
			name: node.name,
			visible: node.visible,
			opacity: node.opacity,
			blend: node.mode.blend,
			transform: { ...node.transform },
			flipH: flips.h,
			flipV: flips.v
		};
		order.push(index);
	}
	const identityOrder = order.length === entries.length && order.every((value, index) => value === index);
	return {
		version: LAYER_STATE_VERSION,
		canvas: {
			w: canvas.w,
			h: canvas.h
		},
		...inputs ? { inputs } : {},
		...background ? { background: backgroundEntry(background) } : {},
		...identityOrder ? {} : { order },
		layers: entries
	};
}
function parseCanvasSize(value) {
	if (typeof value !== "object" || value === null) return void 0;
	const { w, h } = value;
	return isFiniteNumber(w) && isFiniteNumber(h) ? {
		w,
		h
	} : void 0;
}
function parseBackground(value) {
	if (typeof value !== "object" || value === null) return void 0;
	const { color, opacity, visible } = value;
	return {
		color: typeof color === "string" && HEX_COLOR_RE$1.test(color) ? color : DEFAULT_BACKGROUND_ENTRY.color,
		opacity: isFiniteNumber(opacity) ? Math.max(0, Math.min(1, opacity)) : DEFAULT_BACKGROUND_ENTRY.opacity,
		visible: typeof visible === "boolean" ? visible : DEFAULT_BACKGROUND_ENTRY.visible
	};
}
function parseOrder(value, layerCount) {
	if (!Array.isArray(value) || value.length !== layerCount || layerCount === 0) return void 0;
	const items = value;
	if (!items.every((item) => typeof item === "number" && Number.isInteger(item) && item >= 0 && item < layerCount)) return void 0;
	return new Set(items).size === layerCount ? [...items] : void 0;
}
function parseInputs(value) {
	if (!Array.isArray(value)) return void 0;
	const items = value;
	return items.every((item) => typeof item === "string") ? [...items] : void 0;
}
function parseJson(json) {
	try {
		return JSON.parse(json);
	} catch {
		return null;
	}
}
function parseLayerState(value) {
	const raw = typeof value === "string" ? parseJson(value) : value;
	if (typeof raw !== "object" || raw === null) return null;
	if (Object.keys(raw).length === 0) return null;
	const { version, canvas, layers, inputs, background, order } = raw;
	if (version !== void 0 && version !== LAYER_STATE_VERSION) return null;
	const canvasSize = parseCanvasSize(canvas);
	const parsedInputs = parseInputs(inputs);
	const parsedBackground = parseBackground(background);
	const parsedLayers = Array.isArray(layers) ? layers.map(parseEntry) : [];
	const parsedOrder = parseOrder(order, parsedLayers.length);
	return {
		version: LAYER_STATE_VERSION,
		...canvasSize ? { canvas: canvasSize } : {},
		...parsedInputs ? { inputs: parsedInputs } : {},
		...parsedBackground ? { background: parsedBackground } : {},
		...parsedOrder ? { order: parsedOrder } : {},
		layers: parsedLayers
	};
}
function layerStateInputsMatch(saved, current) {
	if (!saved || !current) return false;
	return saved.length === current.length && saved.every((value, index) => value === current[index]);
}
function bboxLayerState(bboxes, canvas) {
	if (!bboxes?.some((bbox) => bbox !== null)) return null;
	const canvasSize = parseCanvasSize(canvas);
	return {
		...canvasSize ? { canvas: canvasSize } : {},
		layers: bboxes.map((bbox) => bbox ? {
			...typeof bbox.name === "string" && bbox.name ? { name: bbox.name } : {},
			...typeof bbox.visible === "boolean" ? { visible: bbox.visible } : {},
			...isFiniteNumber(bbox.opacity) ? { opacity: bbox.opacity } : {},
			...isBlendFn(bbox.blend) ? { blend: bbox.blend } : {},
			...bbox.flipH === true ? { flipH: true } : {},
			...bbox.flipV === true ? { flipV: true } : {},
			transform: {
				x: bbox.x,
				y: bbox.y,
				w: bbox.width,
				h: bbox.height,
				rotation: isFiniteNumber(bbox.rotation) ? bbox.rotation : 0
			}
		} : null)
	};
}
function resolveInitialLayerState(savedState, currentInputs, bboxes, canvas) {
	if (savedState && layerStateInputsMatch(savedState.inputs, currentInputs)) return savedState;
	return bboxLayerState(bboxes, canvas);
}
function applyLayerState(state, layers, ops) {
	if (state.canvas) ops.setCanvasSize(state.canvas.w, state.canvas.h);
	const background = state.background ?? DEFAULT_BACKGROUND_ENTRY;
	ops.setBackgroundColor(background.color);
	ops.setBackgroundOpacity(background.opacity);
	ops.setBackgroundVisible(background.visible);
	if (state.layers.length !== layers.length) return;
	const count = layers.length;
	for (let i = 0; i < count; i++) {
		const entry = state.layers[i];
		if (!entry) continue;
		const { id, visible } = layers[i];
		if (entry.name !== void 0) ops.renameLayer(id, entry.name);
		if (entry.visible !== void 0 && visible !== entry.visible) ops.toggleVisible(id);
		if (entry.opacity !== void 0) ops.setOpacity(id, entry.opacity);
		if (entry.blend !== void 0) ops.setBlendMode(id, entry.blend);
		if (entry.flipH) ops.flipLayer(id, "h");
		if (entry.flipV) ops.flipLayer(id, "v");
		if (entry.transform) {
			ops.setLayerPosition(id, entry.transform.x, entry.transform.y);
			ops.setLayerDimensions(id, entry.transform.w, entry.transform.h);
			ops.setLayerRotationDeg(id, entry.transform.rotation * 180 / Math.PI);
		}
	}
	if (state.order) {
		const ids = state.order.map((index) => layers.at(index)?.id).filter((id) => id !== void 0);
		if (ids.length > 0) ops.setLayerOrder(ids);
	}
}
//#endregion
//#region src/renderer/extensions/compositor/composables/compositorPaths.ts
function imageRefViewQuery(ref) {
	const params = new URLSearchParams({ filename: ref.filename });
	if (ref.subfolder) params.set("subfolder", ref.subfolder);
	params.set("type", ref.type);
	return params.toString();
}
//#endregion
//#region src/renderer/extensions/compositor/composables/compositorSession.ts
async function loadCompositorSession(session, node, fallbackLayerName) {
	const refs = getCompositorLayers(node) ?? [];
	const rand = app.getRandParam();
	const urls = refs.map((fileRef) => api.apiURL(`/view?${imageRefViewQuery(fileRef)}${rand}`));
	const names = refs.map((fileRef, i) => fileRef.filename.replace(/\.[^.]+$/, "") || fallbackLayerName(i));
	const failed = await session.loadImages(urls, names);
	const canvas = getCompositorCanvas(node);
	const initialState = resolveInitialLayerState(parseLayerState(getCompositorWidgetValue(node)), getCompositorInputsFingerprint(node), getCompositorBBoxes(node), canvas);
	if (initialState) {
		applyLayerState(initialState, session.imageLayers.value, session);
		session.editor.history.clear();
		session.fitView();
	} else if (canvas) {
		session.setCanvasSize(canvas.w, canvas.h);
		session.editor.history.clear();
		session.fitView();
	}
	return failed;
}
//#endregion
//#region src/renderer/extensions/layerEditor/engine/nodeKind.ts
var registry$1 = /* @__PURE__ */ new Map();
function registerNodeKind(kind) {
	registry$1.set(kind.kind, kind);
}
function getNodeKind(kind) {
	const k = registry$1.get(kind);
	if (!k) throw new Error(`Unknown node kind: ${kind}`);
	return k;
}
function hasNodeKind(kind) {
	return registry$1.has(kind);
}
//#endregion
//#region src/renderer/extensions/layerEditor/engine/render/place.ts
var mipChains = /* @__PURE__ */ new WeakMap();
function halve(src) {
	const w = Math.max(1, Math.floor(src.width / 2));
	const h = Math.max(1, Math.floor(src.height / 2));
	const c = document.createElement("canvas");
	c.width = w;
	c.height = h;
	const g = c.getContext("2d");
	if (!g) return null;
	g.imageSmoothingEnabled = true;
	g.imageSmoothingQuality = "high";
	g.drawImage(src, 0, 0, w, h);
	return c;
}
function mipForScale(bitmap, scale) {
	if (scale >= .5 || bitmap.width <= 1 || bitmap.height <= 1) return bitmap;
	let levels = mipChains.get(bitmap);
	if (!levels) {
		levels = [];
		mipChains.set(bitmap, levels);
	}
	let level = 0;
	let remaining = scale;
	while (remaining < .5) {
		const prev = level === 0 ? bitmap : levels[level - 1];
		if (prev.width <= 1 || prev.height <= 1) break;
		if (!levels[level]) {
			const next = halve(prev);
			if (!next) break;
			levels[level] = next;
		}
		remaining *= 2;
		level += 1;
	}
	return level === 0 ? bitmap : levels[level - 1];
}
function placeBitmap(bitmap, transform, docWidth, docHeight, scratch, clipRect, noMip = false) {
	const canvas = scratch ?? document.createElement("canvas");
	const clip = clipRect && scratch && canvas.width === docWidth && canvas.height === docHeight ? clipRect : null;
	if (canvas.width !== docWidth) canvas.width = docWidth;
	if (canvas.height !== docHeight) canvas.height = docHeight;
	const ctx = canvas.getContext("2d");
	if (!ctx) return null;
	const scale = Math.max(transform.w / Math.max(1, bitmap.width), transform.h / Math.max(1, bitmap.height));
	const src = noMip ? bitmap : mipForScale(bitmap, scale);
	ctx.save();
	if (clip) {
		ctx.beginPath();
		ctx.rect(clip.x, clip.y, clip.w, clip.h);
		ctx.clip();
		ctx.clearRect(clip.x, clip.y, clip.w, clip.h);
	} else ctx.clearRect(0, 0, docWidth, docHeight);
	ctx.imageSmoothingEnabled = true;
	ctx.imageSmoothingQuality = "high";
	ctx.translate(transform.x + transform.w / 2, transform.y + transform.h / 2);
	ctx.rotate(transform.rotation);
	ctx.drawImage(src, -transform.w / 2, -transform.h / 2, transform.w, transform.h);
	ctx.restore();
	return canvas;
}
//#endregion
//#region src/renderer/extensions/layerEditor/psdMapping.ts
var PSD_BLEND_MODES = {
	normal: "normal",
	multiply: "multiply",
	screen: "screen",
	overlay: "overlay",
	darken: "darken",
	lighten: "lighten",
	"color-dodge": "color dodge",
	"color-burn": "color burn",
	"hard-light": "hard light",
	"soft-light": "soft light",
	difference: "difference",
	exclusion: "exclusion",
	"linear-dodge": "linear dodge",
	"linear-burn": "linear burn",
	"vivid-light": "vivid light",
	"pin-light": "pin light",
	"linear-light": "linear light",
	"hard-mix": "hard mix",
	subtract: "subtract",
	divide: "divide",
	"grain-extract": "normal",
	"grain-merge": "normal",
	hue: "hue",
	saturation: "saturation",
	color: "color",
	luminosity: "luminosity"
};
function hexToPsdColor(hex) {
	const raw = hex.replace("#", "");
	const full = raw.length === 3 ? raw.split("").map((c) => c + c).join("") : raw.padEnd(6, "0");
	return {
		r: parseInt(full.slice(0, 2), 16) || 0,
		g: parseInt(full.slice(2, 4), 16) || 0,
		b: parseInt(full.slice(4, 6), 16) || 0
	};
}
var clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
function toColorStops(stops) {
	return stops.map((s) => ({
		color: hexToPsdColor(s.color),
		location: clamp(s.offset, 0, 1),
		midpoint: .5
	}));
}
function toOpacityStops(stops) {
	return stops.map((s) => ({
		opacity: s.alpha === void 0 ? 1 : clamp(s.alpha, 0, 1),
		location: clamp(s.offset, 0, 1),
		midpoint: .5
	}));
}
function fillToVectorContent(spec) {
	if (spec.type === "solid") return {
		type: "color",
		color: hexToPsdColor(spec.color)
	};
	const base = {
		name: "Gradient",
		type: "solid",
		smoothness: 1,
		colorStops: toColorStops(spec.stops),
		opacityStops: toOpacityStops(spec.stops)
	};
	if (spec.type === "linear") {
		const angle = (-spec.angle % 360 + 360) % 360;
		return {
			...base,
			style: "linear",
			angle: angle > 180 ? angle - 360 : angle,
			scale: 100
		};
	}
	return {
		...base,
		style: "radial",
		angle: 0,
		scale: clamp(spec.radius * 100, 1, 400),
		offset: {
			x: clamp(spec.cx - .5, -1, 1),
			y: clamp(spec.cy - .5, -1, 1)
		}
	};
}
//#endregion
//#region src/renderer/extensions/layerEditor/psdExport.ts
var clamp01$1 = /* @__PURE__ */ __name((v) => Math.max(0, Math.min(1, v)), "clamp01");
function makeGuid() {
	if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") return crypto.randomUUID();
	let out = "";
	for (let i = 0; i < 36; i++) if (i === 8 || i === 13 || i === 18 || i === 23) out += "-";
	else out += Math.floor(Math.random() * 16).toString(16);
	return out;
}
function transformCorners(t) {
	const cx = t.x + t.w / 2;
	const cy = t.y + t.h / 2;
	const cos = Math.cos(t.rotation);
	const sin = Math.sin(t.rotation);
	const pt = (dx, dy) => [cx + dx * cos - dy * sin, cy + dx * sin + dy * cos];
	const hw = t.w / 2;
	const hh = t.h / 2;
	return [
		...pt(-hw, -hh),
		...pt(hw, -hh),
		...pt(hw, hh),
		...pt(-hw, hh)
	];
}
function maskData(node, deps) {
	if (!node.mask) return void 0;
	const placed = deps.maskCanvas(node);
	if (!placed) return void 0;
	return {
		canvas: placed.canvas,
		left: placed.left,
		top: placed.top,
		right: placed.left + placed.canvas.width,
		bottom: placed.top + placed.canvas.height,
		defaultColor: 0,
		disabled: !node.mask.enabled
	};
}
async function applyPlacedLayer(layer, node, deps, linkedFiles) {
	if (!deps.contentCanvas || !deps.canvasPng) return;
	const source = deps.contentCanvas(node.contentId);
	if (!source) return;
	let data;
	try {
		data = await deps.canvasPng(source);
	} catch {
		return;
	}
	const id = makeGuid();
	const corners = transformCorners(node.transform);
	linkedFiles.push({
		id,
		name: `${node.name || "layer"}.png`,
		type: "png ",
		data
	});
	layer.placedLayer = {
		id,
		placed: makeGuid(),
		type: "raster",
		transform: corners,
		nonAffineTransform: corners,
		width: source.width,
		height: source.height
	};
}
async function buildLayer(node, deps, linkedFiles) {
	const layer = {
		name: node.name,
		hidden: !node.visible,
		opacity: clamp01$1(node.opacity),
		blendMode: PSD_BLEND_MODES[node.mode.blend] ?? "normal",
		mask: maskData(node, deps)
	};
	if (node.kind === "group") {
		const g = node;
		if (g.passThrough) layer.blendMode = "pass through";
		layer.opened = true;
		layer.children = [];
		for (const child of g.children) layer.children.push(await buildLayer(child, deps, linkedFiles));
		return layer;
	}
	const placed = deps.rasterizeLeaf(node);
	if (placed) {
		layer.canvas = placed.canvas;
		layer.left = placed.left;
		layer.top = placed.top;
		layer.right = placed.left + placed.canvas.width;
		layer.bottom = placed.top + placed.canvas.height;
	}
	switch (node.kind) {
		case "fill":
			layer.vectorFill = fillToVectorContent(node.fill);
			break;
		case "raster": await applyPlacedLayer(layer, node, deps, linkedFiles);
	}
	return layer;
}
function leafPlacedBounds(t, doc) {
	if (!(t.w > 0 && t.h > 0)) return {
		x: 0,
		y: 0,
		w: doc.width,
		h: doc.height
	};
	const corners = transformCorners(t);
	const xs = [
		corners[0],
		corners[2],
		corners[4],
		corners[6]
	];
	const ys = [
		corners[1],
		corners[3],
		corners[5],
		corners[7]
	];
	const x = Math.floor(Math.min(...xs));
	const y = Math.floor(Math.min(...ys));
	return {
		x,
		y,
		w: Math.max(1, Math.ceil(Math.max(...xs)) - x),
		h: Math.max(1, Math.ceil(Math.max(...ys)) - y)
	};
}
function rasterizeLeafPlaced(node, doc, content) {
	const bounds = leafPlacedBounds(node.transform, doc);
	const captured = [];
	const ctx = {
		compositor: null,
		content,
		renderChild: () => null,
		placed: (_key, _stamp, bitmap, tf, linear) => {
			const canvas = placeBitmap(bitmap, {
				...tf,
				x: tf.x - bounds.x,
				y: tf.y - bounds.y
			}, bounds.w, bounds.h);
			if (canvas) captured.push(canvas);
			return canvas ? {
				source: canvas,
				rect: bounds,
				linear: !!linear
			} : null;
		},
		region: {
			x: 0,
			y: 0,
			w: bounds.w,
			h: bounds.h
		},
		devicePixelRatio: 1
	};
	try {
		getNodeKind(node.kind).renderNode(node, ctx);
	} catch {
		return null;
	}
	const canvas = captured.at(-1);
	return canvas ? {
		canvas,
		left: bounds.x,
		top: bounds.y
	} : null;
}
function maskToPlacedCanvas(node, doc, content) {
	const m = node.mask;
	if (!m) return null;
	const entry = content.get(m.contentId);
	if (!entry) return null;
	const bounds = leafPlacedBounds(node.transform, doc);
	const c = document.createElement("canvas");
	c.width = bounds.w;
	c.height = bounds.h;
	const ctx = c.getContext("2d");
	if (!ctx) return null;
	ctx.fillStyle = "#000000";
	ctx.fillRect(0, 0, bounds.w, bounds.h);
	const tf = node.transform.w > 0 && node.transform.h > 0 ? node.transform : {
		x: 0,
		y: 0,
		w: doc.width,
		h: doc.height,
		rotation: 0
	};
	ctx.translate(tf.x - bounds.x + tf.w / 2, tf.y - bounds.y + tf.h / 2);
	ctx.rotate(tf.rotation);
	ctx.drawImage(entry.canvas, -tf.w / 2, -tf.h / 2, tf.w, tf.h);
	return {
		canvas: c,
		left: bounds.x,
		top: bounds.y
	};
}
async function canvasPngBytes(canvas) {
	const blob = await new Promise((res, rej) => canvas.toBlob((b) => b ? res(b) : rej(/* @__PURE__ */ new Error("toBlob null")), "image/png"));
	return new Uint8Array(await blob.arrayBuffer());
}
async function buildPsdFromEditor(host, content, opts) {
	const doc = host.document();
	host.render();
	return buildPsd(doc, {
		rasterizeLeaf: (n) => rasterizeLeafPlaced(n, doc, content),
		maskCanvas: (n) => maskToPlacedCanvas(n, doc, content),
		composite: () => host.readbackCanvas(),
		contentCanvas: (id) => content.get(id)?.canvas ?? null,
		canvasPng: canvasPngBytes,
		guides: opts?.guides
	});
}
async function buildPsd(doc, deps) {
	const linkedFiles = [];
	const children = [];
	for (const node of doc.root.children) children.push(await buildLayer(node, deps, linkedFiles));
	const psd = {
		width: doc.width,
		height: doc.height,
		canvas: deps.composite(),
		children
	};
	if (linkedFiles.length) psd.linkedFiles = linkedFiles;
	if (deps.guides && (deps.guides.horizontal.length || deps.guides.vertical.length)) psd.imageResources = { gridAndGuidesInformation: { guides: [...deps.guides.horizontal.map((location) => ({
		location,
		direction: "horizontal"
	})), ...deps.guides.vertical.map((location) => ({
		location,
		direction: "vertical"
	}))] } };
	return psd;
}
//#endregion
//#region src/renderer/extensions/layerEditor/composables/useLayerEditorExport.ts
var PSD_MIME = "image/vnd.adobe.photoshop";
function exportTimestamp(d) {
	const pad = (n) => String(n).padStart(2, "0");
	return `${`${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}`}-${`${pad(d.getHours())}${pad(d.getMinutes())}${pad(d.getSeconds())}`}`;
}
function psdExportFilename(d) {
	return `comfyui-layers-${exportTimestamp(d)}.psd`;
}
function readbackCanvas(session) {
	const img = session.compositor.readback();
	const canvas = document.createElement("canvas");
	canvas.width = img.width;
	canvas.height = img.height;
	const ctx = canvas.getContext("2d");
	if (!ctx) throw new Error("2d context unavailable");
	ctx.putImageData(img, 0, 0);
	return canvas;
}
async function buildSessionPsdBlob(session) {
	const { editor, content } = session;
	if (editor.floating()) editor.anchorFloating();
	const guides = editor.guides();
	const psd = await buildPsdFromEditor({
		document: () => editor.document(),
		render: () => editor.render(),
		readbackCanvas: () => readbackCanvas(session)
	}, content, { guides: {
		horizontal: guides.filter((g) => g.axis === "y").map((g) => g.pos),
		vertical: guides.filter((g) => g.axis === "x").map((g) => g.pos)
	} });
	const { writePsd } = await __vitePreload(async () => {
		const { writePsd } = await import("./dist-Bp3Fn1Wt.js").then((m) => /* @__PURE__ */ __toESM(m.default, 1));
		return { writePsd };
	}, __vite__mapDeps([0,1,2]), import.meta.url);
	return new Blob([writePsd(psd)], { type: PSD_MIME });
}
function useLayerEditorExport(session) {
	const { t } = useI18n();
	const toastStore = useToastStore();
	const exporting = ref(false);
	async function exportPsd() {
		if (!session.glOk.value || exporting.value) return;
		exporting.value = true;
		try {
			const blob = await buildSessionPsdBlob(session);
			downloadBlob(psdExportFilename(/* @__PURE__ */ new Date()), blob);
		} catch (err) {
			console.warn("[LayerEditor] PSD export failed", err);
			toastStore.add({
				severity: "error",
				summary: t("g.error"),
				detail: t("layerEditor.exportPsdFailed")
			});
		} finally {
			exporting.value = false;
			session.requestRender();
		}
	}
	return {
		exporting,
		exportPsd
	};
}
//#endregion
//#region src/renderer/extensions/layerEditor/engine/history.ts
var Dirty = {
	DRAWABLE: 1,
	STRUCTURE: 2,
	SELECTION: 4,
	META: 8,
	CHANNEL: 16
};
var CommandGroup = class {
	label;
	children = [];
	constructor(label) {
		this.label = label;
	}
	get dirtyMask() {
		return this.children.reduce((m, c) => m | c.dirtyMask, 0);
	}
	apply(dir) {
		const order = dir === "redo" ? this.children : [...this.children].reverse();
		for (const c of order) c.apply(dir);
	}
	sizeBytes() {
		return this.children.reduce((n, c) => n + c.sizeBytes(), 0);
	}
	contentRefs() {
		return this.children.flatMap((c) => c.contentRefs?.() ?? []);
	}
	get empty() {
		return this.children.length === 0;
	}
};
var History = class {
	undoStack = [];
	redoStack = [];
	groupStack = [];
	dirtyCount = 0;
	cleanReachable = true;
	mergeBarrier = null;
	byteBudget;
	minSteps;
	listeners = /* @__PURE__ */ new Set();
	undoBytes = 0;
	sizes = /* @__PURE__ */ new WeakMap();
	constructor(opts = {}) {
		this.byteBudget = opts.byteBudget ?? 268435456;
		this.minSteps = opts.minSteps ?? 8;
	}
	onChange(fn) {
		this.listeners.add(fn);
		return () => this.listeners.delete(fn);
	}
	emit(mask) {
		for (const l of this.listeners) l(mask);
	}
	beginGroup(label) {
		this.groupStack.push(new CommandGroup(label));
	}
	endGroup() {
		const group = this.groupStack.pop();
		if (!group) return;
		if (group.empty) return;
		this.commit(group);
	}
	push(cmd) {
		if (this.groupStack.length > 0) {
			this.groupStack[this.groupStack.length - 1].children.push(cmd);
			return;
		}
		const top = this.undoStack.at(-1);
		if (top && top !== this.mergeBarrier && this.redoStack.length === 0 && cmd.tryMerge?.(top)) {
			this.undoBytes += top.sizeBytes() - (this.sizes.get(top) ?? 0);
			this.sizes.set(top, top.sizeBytes());
			this.emit(cmd.dirtyMask);
			return;
		}
		this.commit(cmd);
	}
	commit(cmd) {
		this.undoStack.push(cmd);
		this.sizes.set(cmd, cmd.sizeBytes());
		this.undoBytes += this.sizes.get(cmd) ?? 0;
		if (this.redoStack.length > 0 && this.dirtyCount < 0) this.cleanReachable = false;
		this.redoStack = [];
		this.bumpDirty();
		this.evict();
		this.emit(cmd.dirtyMask);
	}
	undo() {
		const cmd = this.undoStack.pop();
		if (!cmd) return;
		cmd.apply("undo");
		this.undoBytes -= this.sizes.get(cmd) ?? 0;
		this.redoStack.push(cmd);
		this.dirtyCount -= 1;
		this.emit(cmd.dirtyMask);
	}
	redo() {
		const cmd = this.redoStack.pop();
		if (!cmd) return;
		cmd.apply("redo");
		this.undoStack.push(cmd);
		this.undoBytes += this.sizes.get(cmd) ?? 0;
		this.dirtyCount += 1;
		this.emit(cmd.dirtyMask);
	}
	canUndo() {
		return this.undoStack.length > 0;
	}
	clear() {
		this.undoStack = [];
		this.redoStack = [];
		this.groupStack = [];
		this.dirtyCount = 0;
		this.undoBytes = 0;
		this.cleanReachable = true;
		this.mergeBarrier = null;
		this.emit(-1);
	}
	canRedo() {
		return this.redoStack.length > 0;
	}
	contentRefs() {
		const refs = /* @__PURE__ */ new Set();
		for (const stack of [
			this.undoStack,
			this.redoStack,
			this.groupStack
		]) for (const cmd of stack) for (const id of cmd.contentRefs?.() ?? []) refs.add(id);
		return refs;
	}
	dirty() {
		return !this.cleanReachable || this.dirtyCount !== 0;
	}
	markSaved() {
		this.dirtyCount = 0;
		this.cleanReachable = true;
		this.mergeBarrier = this.undoStack[this.undoStack.length - 1] ?? null;
	}
	bumpDirty() {
		this.dirtyCount += 1;
	}
	evict() {
		while (this.undoStack.length > this.minSteps && this.undoBytes > this.byteBudget) {
			const dropped = this.undoStack.shift();
			if (!dropped) break;
			if (dropped === this.mergeBarrier) this.mergeBarrier = null;
			this.undoBytes -= this.sizes.get(dropped) ?? 0;
			this.cleanReachable = false;
		}
	}
	labels() {
		return {
			undo: this.undoStack.map((c) => c.label),
			redo: this.redoStack.map((c) => c.label)
		};
	}
};
//#endregion
//#region src/renderer/extensions/layerEditor/engine/commands/bakeContent.ts
function snapshotRaster(node) {
	return {
		contentId: node.contentId,
		url: node.url,
		naturalWidth: node.naturalWidth,
		naturalHeight: node.naturalHeight,
		transform: { ...node.transform },
		mask: node.mask ? { ...node.mask } : void 0
	};
}
var BakeRasterCommand = class {
	label;
	node;
	before;
	after;
	store;
	dirtyMask = Dirty.DRAWABLE;
	constructor(label, node, before, after, store) {
		this.label = label;
		this.node = node;
		this.before = before;
		this.after = after;
		this.store = store;
	}
	apply(dir) {
		const s = dir === "undo" ? this.before : this.after;
		this.node.contentId = s.contentId;
		this.node.url = s.url;
		this.node.naturalWidth = s.naturalWidth;
		this.node.naturalHeight = s.naturalHeight;
		this.node.transform = { ...s.transform };
		this.node.mask = s.mask ? { ...s.mask } : void 0;
	}
	sizeBytes() {
		let n = 0;
		const ids = [this.before.contentId, this.after.contentId];
		if (this.before.mask) ids.push(this.before.mask.contentId);
		if (this.after.mask) ids.push(this.after.mask.contentId);
		for (const id of ids) {
			const e = this.store.get(id);
			if (e) n += e.width * e.height * 4;
		}
		return n;
	}
	contentRefs() {
		const refs = [this.before.contentId, this.after.contentId];
		if (this.before.mask) refs.push(this.before.mask.contentId);
		if (this.after.mask) refs.push(this.after.mask.contentId);
		return refs.filter(Boolean);
	}
};
//#endregion
//#region src/renderer/extensions/layerEditor/engine/commands/prop.ts
var PropCommand = class PropCommand {
	label;
	dirtyMask;
	set;
	before;
	after;
	mergeKey;
	constructor(label, dirtyMask, _get, set, before, after, mergeKey) {
		this.label = label;
		this.dirtyMask = dirtyMask;
		this.set = set;
		this.before = before;
		this.after = after;
		this.mergeKey = mergeKey;
	}
	apply(dir) {
		this.set(dir === "undo" ? this.before : this.after);
	}
	sizeBytes() {
		return 64;
	}
	tryMerge(prev) {
		if (this.mergeKey !== void 0 && prev instanceof PropCommand && prev.mergeKey === this.mergeKey) {
			prev.after = this.after;
			return true;
		}
		return false;
	}
};
//#endregion
//#region src/renderer/extensions/layerEditor/engine/commands/setTransform.ts
var SetTransformCommand = class {
	label;
	slot;
	before;
	after;
	dirtyMask = Dirty.META;
	constructor(label, slot, before, after) {
		this.label = label;
		this.slot = slot;
		this.before = before;
		this.after = after;
	}
	apply(dir) {
		this.slot.transform = dir === "undo" ? this.before : this.after;
	}
	sizeBytes() {
		return 80;
	}
};
//#endregion
//#region src/renderer/extensions/layerEditor/engine/compositor/modeCodes.ts
var BLEND_CODE = {
	normal: 0,
	multiply: 1,
	screen: 2,
	overlay: 3,
	darken: 4,
	lighten: 5,
	"color-dodge": 6,
	"color-burn": 7,
	"hard-light": 8,
	"soft-light": 9,
	difference: 10,
	exclusion: 11,
	"linear-dodge": 12,
	"linear-burn": 13,
	"vivid-light": 14,
	"pin-light": 15,
	hue: 16,
	saturation: 17,
	color: 18,
	luminosity: 19,
	"linear-light": 20,
	"hard-mix": 21,
	subtract: 22,
	divide: 23,
	"grain-extract": 24,
	"grain-merge": 25
};
var COMPOSITE_CODE = {
	union: 0,
	"clip-to-backdrop": 1,
	"clip-to-layer": 2,
	intersection: 3
};
var SPACE_CODE = {
	linear: 0,
	perceptual: 1,
	lab: 2
};
function modeUniforms(mode) {
	return {
		blend: BLEND_CODE[mode.blend],
		composite: COMPOSITE_CODE[mode.composite],
		blendSpace: SPACE_CODE[mode.blendSpace],
		compositeSpace: SPACE_CODE[mode.compositeSpace],
		legacy: mode.legacy
	};
}
//#endregion
//#region src/renderer/extensions/layerEditor/engine/compositor/shaders/layerBlend.frag?raw
var layerBlend_default = "#version 300 es\n\nprecision highp float;\n\nuniform sampler2D u_backdrop;\nuniform sampler2D u_layer;\nuniform sampler2D u_mask;\nuniform bool  u_hasMask;\nuniform bool  u_srgbLayer;\nuniform float u_opacity;\nuniform int   u_blend;\nuniform int   u_composite;\nuniform int   u_blendSpace;\nuniform int   u_compositeSpace;\n\nin vec2 v_texCoord;\nout vec4 fragColor;\n\nconst float EPS = 1e-6;\n\nfloat srgbToLinear(float c) {\n  return c <= 0.04045 ? c / 12.92 : pow((c + 0.055) / 1.055, 2.4);\n}\nfloat linearToSrgb(float c) {\n  return c <= 0.0031308 ? 12.92 * c : 1.055 * pow(c, 1.0 / 2.4) - 0.055;\n}\nvec3 srgbToLinear(vec3 c) { return vec3(srgbToLinear(c.r), srgbToLinear(c.g), srgbToLinear(c.b)); }\nvec3 linearToSrgb(vec3 c) { return vec3(linearToSrgb(c.r), linearToSrgb(c.g), linearToSrgb(c.b)); }\n\nvec3 toSpace(vec3 c, int space)   { return space == 0 ? c : linearToSrgb(c); }\nvec3 fromSpace(vec3 c, int space) { return space == 0 ? c : srgbToLinear(c); }\n\nfloat luminance(vec3 c) { return dot(c, vec3(0.22248840, 0.71690369, 0.06060791)); }\n\nfloat blendChannel(int mode, float i, float l) {\n  if (mode == 1)  return i * l;\n  if (mode == 2)  return 1.0 - (1.0 - i) * (1.0 - l);\n  if (mode == 3)  return i < 0.5 ? 2.0*i*l : 1.0 - 2.0*(1.0-l)*(1.0-i);\n  if (mode == 4)  return min(i, l);\n  if (mode == 5)  return max(i, l);\n  if (mode == 6)  return i <= 0.0 ? 0.0\n                       : 1.0 - l <= EPS ? 1.0\n                       : min(i / (1.0 - l), 1.0);\n  if (mode == 7)  return i >= 1.0 ? 1.0\n                       : l <= EPS ? 0.0\n                       : 1.0 - min((1.0 - i) / l, 1.0);\n  if (mode == 8)  return l > 0.5 ? min(1.0 - (1.0-i)*(1.0-(l-0.5)*2.0), 1.0)\n                                 : min(i*(l*2.0), 1.0);\n  if (mode == 9) {\n    float m = i * l;\n    float s = 1.0 - (1.0 - i) * (1.0 - l);\n    return (1.0 - i) * m + i * s;\n  }\n  if (mode == 10) return abs(i - l);\n  if (mode == 11) return 0.5 - 2.0*(i-0.5)*(l-0.5);\n  if (mode == 12) return i + l;\n  if (mode == 13) return i + l - 1.0;\n  if (mode == 14) return l <= 0.5\n                       ? (i >= 1.0 ? 1.0\n                          : 2.0 * l <= EPS ? 0.0\n                          : max(1.0 - (1.0 - i) / (2.0 * l), 0.0))\n                       : (i <= 0.0 ? 0.0\n                          : 2.0 * (1.0 - l) <= EPS ? 1.0\n                          : min(i / (2.0 * (1.0 - l)), 1.0));\n  if (mode == 15) return l > 0.5 ? max(i, 2.0*(l-0.5)) : min(i, 2.0*l);\n  if (mode == 20) return i + 2.0*l - 1.0;\n  if (mode == 21) return i + l < 1.0 ? 0.0 : 1.0;\n  if (mode == 22) return max(i - l, 0.0);\n  if (mode == 23) return clamp(i / max(l, EPS), 0.0, 1.0);\n  if (mode == 24) return i - l + 0.5;\n  if (mode == 25) return i + l - 0.5;\n  return l;\n}\n\nvec3 blendHue(vec3 i, vec3 l) {\n  float sMin = min(min(l.r, l.g), l.b), sMax = max(max(l.r, l.g), l.b);\n  float sDelta = sMax - sMin;\n  if (sDelta <= EPS) return i;\n  float dMin = min(min(i.r, i.g), i.b), dMax = max(max(i.r, i.g), i.b);\n  float dDelta = dMax - dMin;\n  float dS = dMax != 0.0 ? dDelta / dMax : 0.0;\n  float ratio = (dS * dMax) / sDelta;\n  float offset = dMax - sMax * ratio;\n  return l * ratio + offset;\n}\nvec3 blendSaturation(vec3 i, vec3 l) {\n  float dMin = min(min(i.r, i.g), i.b), dMax = max(max(i.r, i.g), i.b);\n  float dDelta = dMax - dMin;\n  if (dDelta <= EPS) return vec3(dMax);\n  float sMin = min(min(l.r, l.g), l.b), sMax = max(max(l.r, l.g), l.b);\n  float sDelta = sMax - sMin;\n  float sS = sMax != 0.0 ? sDelta / sMax : 0.0;\n  float ratio = (sS * dMax) / dDelta;\n  float offset = (1.0 - ratio) * dMax;\n  return i * ratio + offset;\n}\nvec3 blendColor(vec3 i, vec3 l) {\n  float dMin = min(min(i.r, i.g), i.b), dMax = max(max(i.r, i.g), i.b);\n  float dL = (dMin + dMax) * 0.5;\n  float sMin = min(min(l.r, l.g), l.b), sMax = max(max(l.r, l.g), l.b);\n  float sL = (sMin + sMax) * 0.5;\n  if (abs(sL) <= EPS || abs(1.0 - sL) <= EPS) return vec3(dL);\n  bool dHigh = dL > 0.5, sHigh = sL > 0.5;\n  dL = min(dL, 1.0 - dL);\n  sL = min(sL, 1.0 - sL);\n  float ratio = dL / sL;\n  float offset = 0.0;\n  if (dHigh) offset += 1.0 - 2.0 * dL;\n  if (sHigh) offset += 2.0 * dL - ratio;\n  return l * ratio + offset;\n}\nvec3 blendLuminosity(vec3 i, vec3 l) {\n  float li = luminance(i);\n  if (li <= EPS) return vec3(luminance(l));\n  return i * (luminance(l) / li);\n}\n\nvec3 blendPixel(int mode, vec3 i, vec3 l) {\n  if (mode == 16) return blendHue(i, l);\n  if (mode == 17) return blendSaturation(i, l);\n  if (mode == 18) return blendColor(i, l);\n  if (mode == 19) return blendLuminosity(i, l);\n  return vec3(blendChannel(mode, i.r, l.r), blendChannel(mode, i.g, l.g), blendChannel(mode, i.b, l.b));\n}\n\nvec4 composite(int mode, vec4 bg, vec4 layer, vec3 comp, float cov) {\n  float inA = bg.a;\n  float layerA = layer.a * cov;\n  if (mode == 1) {\n    if (inA == 0.0 || layerA == 0.0) return vec4(bg.rgb, inA);\n    return vec4(comp * layerA + bg.rgb * (1.0 - layerA), inA);\n  }\n  if (mode == 2) {\n    if (layerA == 0.0) return vec4(bg.rgb, layerA);\n    if (inA == 0.0)    return vec4(layer.rgb, layerA);\n    return vec4(comp * inA + layer.rgb * (1.0 - inA), layerA);\n  }\n  if (mode == 3) {\n    float newA = inA * layer.a * cov;\n    return newA == 0.0 ? vec4(bg.rgb, 0.0) : vec4(comp, newA);\n  }\n\n  float newA = layerA + (1.0 - layerA) * inA;\n  if (layerA == 0.0 || newA == 0.0) return vec4(bg.rgb, newA);\n  if (inA == 0.0)                   return vec4(layer.rgb, newA);\n  float ratio = layerA / newA;\n  vec3 outRgb = ratio * (inA * (comp - layer.rgb) + layer.rgb - bg.rgb) + bg.rgb;\n  return vec4(outRgb, newA);\n}\n\nvoid main() {\n  vec4 bg = texture(u_backdrop, v_texCoord);\n  vec4 layer = texture(u_layer, v_texCoord);\n  if (u_srgbLayer) layer.rgb = srgbToLinear(layer.rgb);\n\n  float cov = u_opacity;\n  if (u_hasMask) cov *= texture(u_mask, v_texCoord).r;\n\n  vec3 comp = fromSpace(blendPixel(u_blend, toSpace(bg.rgb, u_blendSpace), toSpace(layer.rgb, u_blendSpace)), u_blendSpace);\n\n  vec4 outc;\n  if (u_compositeSpace == 0) {\n    outc = composite(u_composite, bg, layer, comp, cov);\n  } else {\n    vec4 bgC = vec4(toSpace(bg.rgb, u_compositeSpace), bg.a);\n    vec4 lyC = vec4(toSpace(layer.rgb, u_compositeSpace), layer.a);\n    vec4 r = composite(u_composite, bgC, lyC, toSpace(comp, u_compositeSpace), cov);\n    outc = vec4(fromSpace(r.rgb, u_compositeSpace), r.a);\n  }\n\n  fragColor = outc;\n}\n";
//#endregion
//#region src/renderer/extensions/layerEditor/engine/compositor/webglCompositor.ts
var VERT = `#version 300 es
out vec2 v_texCoord;
void main() {
  vec2 v[3] = vec2[](vec2(-1.0,-1.0), vec2(3.0,-1.0), vec2(-1.0,3.0));
  v_texCoord = v[gl_VertexID] * 0.5 + 0.5;
  gl_Position = vec4(v[gl_VertexID], 0.0, 1.0);
}`;
var PRESENT_FRAG = `#version 300 es
precision highp float;
uniform sampler2D u_tex;
in vec2 v_texCoord;
out vec4 fragColor;
float lin2srgb(float c){ c = clamp(c, 0.0, 1.0); return c <= 0.0031308 ? 12.92*c : 1.055*pow(c,1.0/2.4)-0.055; }
void main(){
  vec4 c = texture(u_tex, v_texCoord);
  fragColor = vec4(lin2srgb(c.r), lin2srgb(c.g), lin2srgb(c.b), clamp(c.a, 0.0, 1.0));
}`;
var COPY_FRAG = `#version 300 es
precision highp float;
uniform sampler2D u_tex;
in vec2 v_texCoord;
out vec4 fragColor;
void main(){ fragColor = texture(u_tex, v_texCoord); }`;
var ADJUST_FRAG = `#version 300 es
precision highp float;
uniform sampler2D u_backdrop;
uniform sampler2D u_mask;
uniform sampler2D u_lut;
uniform bool u_hasMask;
uniform float u_opacity;
uniform int u_op;
uniform vec4 u_p0;
uniform vec4 u_p1;
uniform vec4 u_p2;
in vec2 v_texCoord;
out vec4 fragColor;

float s2l(float c){ return c <= 0.04045 ? c / 12.92 : pow((c + 0.055) / 1.055, 2.4); }
float l2s(float c){ c = clamp(c, 0.0, 1.0); return c <= 0.0031308 ? 12.92*c : 1.055*pow(c,1.0/2.4)-0.055; }
vec3 s2l(vec3 c){ return vec3(s2l(c.r), s2l(c.g), s2l(c.b)); }
vec3 l2s(vec3 c){ return vec3(l2s(c.r), l2s(c.g), l2s(c.b)); }

float bc(float v, float b, float c){
  float hb = b * 0.5;
  float o = hb < 0.0 ? v * (1.0 + hb) : v + (1.0 - v) * hb;
  return (o - 0.5) * tan((c + 1.0) * 0.78539816) + 0.5;
}

vec3 rgb2hsl(vec3 c){
  float mx = max(max(c.r, c.g), c.b);
  float mn = min(min(c.r, c.g), c.b);
  float l = (mx + mn) * 0.5;
  if (mx == mn) return vec3(0.0, 0.0, l);
  float d = mx - mn;
  float s = l > 0.5 ? d / (2.0 - mx - mn) : d / (mx + mn);
  float h;
  if (mx == c.r) h = (c.g - c.b) / d + (c.g < c.b ? 6.0 : 0.0);
  else if (mx == c.g) h = (c.b - c.r) / d + 2.0;
  else h = (c.r - c.g) / d + 4.0;
  return vec3(h / 6.0, s, l);
}

float hue2rgb(float p, float q, float t){
  float x = t;
  if (x < 0.0) x += 1.0;
  if (x > 1.0) x -= 1.0;
  if (x < 1.0/6.0) return p + (q - p) * 6.0 * x;
  if (x < 0.5) return q;
  if (x < 2.0/3.0) return p + (q - p) * (2.0/3.0 - x) * 6.0;
  return p;
}

vec3 hsl2rgb(vec3 hsl){
  if (hsl.y == 0.0) return vec3(hsl.z);
  float q = hsl.z < 0.5 ? hsl.z * (1.0 + hsl.y) : hsl.z + hsl.y - hsl.z * hsl.y;
  float p = 2.0 * hsl.z - q;
  return vec3(hue2rgb(p, q, hsl.x + 1.0/3.0), hue2rgb(p, q, hsl.x), hue2rgb(p, q, hsl.x - 1.0/3.0));
}

float lev(float v){
  float t = clamp((v - u_p0.x) / max(u_p0.y - u_p0.x, 1e-4), 0.0, 1.0);
  return u_p0.w + pow(t, 1.0 / max(u_p0.z, 1e-4)) * (u_p1.x - u_p0.w);
}

float balComp(float v, float l, float s, float m, float h){
  const float a = 4.0;
  const float b = 0.333;
  const float sc = 0.7;
  float sw = s * clamp((b - l) * a + 0.5, 0.0, 1.0) * sc;
  float mw = m * clamp((l - b) * a + 0.5, 0.0, 1.0) * clamp((1.0 - l - b) * a + 0.5, 0.0, 1.0) * sc;
  float hw = h * clamp((l + b - 1.0) * a + 0.5, 0.0, 1.0) * sc;
  return clamp(v + sw + mw + hw, 0.0, 1.0);
}

float hfun(float n, float h, float s, float l){
  float a = s * min(l, 1.0 - l);
  float k = mod(n + h / 30.0, 12.0);
  return clamp(l - a * max(min(min(k - 3.0, 9.0 - k), 1.0), -1.0), 0.0, 1.0);
}

vec3 preservel(vec3 c, float l){
  float mx = max(c.r, max(c.g, c.b));
  float mn = min(c.r, min(c.g, c.b));
  float h;
  if (c.r == c.g && c.g == c.b) h = 0.0;
  else if (mx == c.r) h = 60.0 * ((c.g - c.b) / (mx - mn));
  else if (mx == c.g) h = 60.0 * (2.0 + (c.b - c.r) / (mx - mn));
  else h = 60.0 * (4.0 + (c.r - c.g) / (mx - mn));
  if (h < 0.0) h += 360.0;
  float lOut = (mx + mn) * 0.5;
  float denom = 1.0 - abs(2.0 * lOut - 1.0);
  float s = denom <= 1e-6 ? 0.0 : (mx - mn) / denom;
  return vec3(hfun(0.0, h, s, l), hfun(8.0, h, s, l), hfun(4.0, h, s, l));
}

float lutAt(float v, int ch){
  float x = (floor(clamp(v, 0.0, 1.0) * 255.0 + 0.5) + 0.5) / 256.0;
  vec4 s = texture(u_lut, vec2(x, 0.5));
  return ch == 0 ? s.r : ch == 1 ? s.g : s.b;
}

void main(){
  vec4 bg = texture(u_backdrop, v_texCoord);
  vec3 adjusted;
  if (u_op == 0) {
    adjusted = vec3(bc(bg.r, u_p0.x, u_p0.y), bc(bg.g, u_p0.x, u_p0.y), bc(bg.b, u_p0.x, u_p0.y));
  } else if (u_op == 5) {
    adjusted = clamp((bg.rgb - vec3(u_p0.x)) * u_p0.y, 0.0, 1.0);
  } else {
    vec3 g = l2s(clamp(bg.rgb, 0.0, 1.0));
    vec3 o;
    if (u_op == 1) {
      vec3 hsl = rgb2hsl(g);
      hsl.x = fract(hsl.x + u_p0.x + 1.0);
      hsl.y = clamp(hsl.y * (1.0 + u_p0.y), 0.0, 1.0);
      hsl.z = clamp(u_p0.z > 0.0 ? hsl.z + u_p0.z * (1.0 - hsl.z) : hsl.z + u_p0.z * hsl.z, 0.0, 1.0);
      o = hsl2rgb(hsl);
    } else if (u_op == 2) {
      o = vec3(1.0) - g;
    } else if (u_op == 3) {
      o = vec3(lev(g.r), lev(g.g), lev(g.b));
    } else if (u_op == 4) {
      o = mix(g, g * u_p0.xyz, u_p0.w);
    } else if (u_op == 6) {
      float l = (max(g.r, max(g.g, g.b)) + min(g.r, min(g.g, g.b))) * 0.5;
      o = vec3(
        balComp(g.r, l, u_p0.x, u_p0.w, u_p1.z),
        balComp(g.g, l, u_p0.y, u_p1.x, u_p1.w),
        balComp(g.b, l, u_p0.z, u_p1.y, u_p2.x));
      o = preservel(o, l);
    } else if (u_op == 7) {
      float n = max(u_p0.x, 2.0) - 1.0;
      o = floor(g * n + 0.5) / n;
    } else if (u_op == 8) {
      float y = dot(g, vec3(0.2126, 0.7152, 0.0722));
      o = vec3(y >= u_p0.x ? 1.0 : 0.0);
    } else if (u_op == 9) {
      float sat = max(g.r, max(g.g, g.b)) - min(g.r, min(g.g, g.b));
      float luma = g.g * 0.715158 + g.r * 0.212656 + g.b * 0.072186;
      float s = u_p0.x > 0.0 ? 1.0 : -1.0;
      float k = 1.0 + u_p0.x * (1.0 + s * sat);
      o = clamp(vec3(luma) + (g - vec3(luma)) * k, 0.0, 1.0);
    } else {
      o = vec3(lutAt(g.r, 0), lutAt(g.g, 1), lutAt(g.b, 2));
    }
    adjusted = s2l(clamp(o, 0.0, 1.0));
  }
  float t = u_opacity * (u_hasMask ? texture(u_mask, v_texCoord).r : 1.0);
  fragColor = vec4(mix(bg.rgb, adjusted, t), bg.a);
}`;
function compile(gl, type, src) {
	const sh = gl.createShader(type);
	gl.shaderSource(sh, src);
	gl.compileShader(sh);
	if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
		const log = gl.getShaderInfoLog(sh) ?? "compile failed";
		gl.deleteShader(sh);
		throw new Error(log);
	}
	return sh;
}
function link(gl, vs, fs) {
	const p = gl.createProgram();
	gl.attachShader(p, vs);
	gl.attachShader(p, fs);
	gl.linkProgram(p);
	if (!gl.getProgramParameter(p, gl.LINK_STATUS)) {
		const log = gl.getProgramInfoLog(p) ?? "link failed";
		gl.deleteProgram(p);
		throw new Error(log);
	}
	return p;
}
function createWebGLCompositor() {
	let canvas = null;
	let gl = null;
	let blendProg = null;
	let presentProg = null;
	let copyProg = null;
	let adjustProg = null;
	let ping = null;
	let pong = null;
	let result = null;
	let resultValid = false;
	let scratch2d = null;
	let lastSweepGen = 0;
	let fallback = null;
	let lutTex = null;
	let width = 0;
	let height = 0;
	let nextHandle = 1;
	let generation = 0;
	let contextLost = false;
	let disposed = false;
	let lastRecover = -Infinity;
	let onRestored;
	const targets = /* @__PURE__ */ new Map();
	const texCache = /* @__PURE__ */ new Map();
	let uniformCache = /* @__PURE__ */ new WeakMap();
	function loc(prog, name) {
		let m = uniformCache.get(prog);
		if (!m) {
			m = /* @__PURE__ */ new Map();
			uniformCache.set(prog, m);
		}
		if (!m.has(name)) m.set(name, gl.getUniformLocation(prog, name));
		return m.get(name);
	}
	function makeTarget(w, h) {
		const g = gl;
		const tex = g.createTexture();
		g.bindTexture(g.TEXTURE_2D, tex);
		g.texImage2D(g.TEXTURE_2D, 0, g.RGBA16F, w, h, 0, g.RGBA, g.HALF_FLOAT, null);
		g.texParameteri(g.TEXTURE_2D, g.TEXTURE_MIN_FILTER, g.LINEAR);
		g.texParameteri(g.TEXTURE_2D, g.TEXTURE_MAG_FILTER, g.LINEAR);
		g.texParameteri(g.TEXTURE_2D, g.TEXTURE_WRAP_S, g.CLAMP_TO_EDGE);
		g.texParameteri(g.TEXTURE_2D, g.TEXTURE_WRAP_T, g.CLAMP_TO_EDGE);
		const fbo = g.createFramebuffer();
		g.bindFramebuffer(g.FRAMEBUFFER, fbo);
		g.framebufferTexture2D(g.FRAMEBUFFER, g.COLOR_ATTACHMENT0, g.TEXTURE_2D, tex, 0);
		const complete = g.checkFramebufferStatus(g.FRAMEBUFFER) === g.FRAMEBUFFER_COMPLETE;
		g.bindFramebuffer(g.FRAMEBUFFER, null);
		if (!complete) {
			g.deleteFramebuffer(fbo);
			g.deleteTexture(tex);
			return null;
		}
		return {
			fbo,
			tex,
			width: w,
			height: h
		};
	}
	function freeTargetObj(t) {
		gl?.deleteFramebuffer(t.fbo);
		gl?.deleteTexture(t.tex);
	}
	function drawFullscreen() {
		gl.drawArrays(gl.TRIANGLES, 0, 3);
	}
	function resolveTexture(nt, temps) {
		if (nt.source instanceof WebGLTexture) return nt.source;
		if (nt.key) {
			const hit = texCache.get(nt.key);
			if (hit) {
				hit.gen = generation;
				if (nt.version === void 0 || hit.version === nt.version) return hit.tex;
				if (hit.version === nt.version - 1 && nt.dirtyRects && partialUploadAll(hit.tex, nt.source, nt.dirtyRects)) {
					hit.version = nt.version;
					return hit.tex;
				}
				uploadInto(hit.tex, nt.source);
				hit.version = nt.version;
				return hit.tex;
			}
			const tex = uploadSource(nt.source);
			texCache.set(nt.key, {
				tex,
				gen: generation,
				version: nt.version
			});
			return tex;
		}
		const tex = uploadSource(nt.source);
		temps.push(tex);
		return tex;
	}
	function partialUploadAll(tex, src, rects) {
		let area = 0;
		for (const r of rects) area += Math.max(0, r.w) * Math.max(0, r.h);
		if (area > src.width * src.height / 2) return false;
		for (const r of rects) if (!partialUpload(tex, src, r)) return false;
		return true;
	}
	function partialUpload(tex, src, rect) {
		const g = gl;
		const x = Math.max(0, Math.floor(rect.x));
		const y = Math.max(0, Math.floor(rect.y));
		const w = Math.min(src.width, Math.ceil(rect.x + rect.w)) - x;
		const h = Math.min(src.height, Math.ceil(rect.y + rect.h)) - y;
		if (w <= 0 || h <= 0) return true;
		if (!scratch2d) scratch2d = document.createElement("canvas");
		scratch2d.width = w;
		scratch2d.height = h;
		const sctx = scratch2d.getContext("2d");
		if (!sctx) return false;
		sctx.clearRect(0, 0, w, h);
		sctx.drawImage(src, x, y, w, h, 0, 0, w, h);
		g.bindTexture(g.TEXTURE_2D, tex);
		g.pixelStorei(g.UNPACK_FLIP_Y_WEBGL, true);
		g.texSubImage2D(g.TEXTURE_2D, 0, x, src.height - (y + h), g.RGBA, g.UNSIGNED_BYTE, scratch2d);
		g.pixelStorei(g.UNPACK_FLIP_Y_WEBGL, false);
		return true;
	}
	function uploadInto(tex, src) {
		const g = gl;
		g.bindTexture(g.TEXTURE_2D, tex);
		g.pixelStorei(g.UNPACK_FLIP_Y_WEBGL, true);
		g.texImage2D(g.TEXTURE_2D, 0, g.RGBA, g.RGBA, g.UNSIGNED_BYTE, src);
		g.pixelStorei(g.UNPACK_FLIP_Y_WEBGL, false);
	}
	function sweepTexCache() {
		if (generation - lastSweepGen < 8) return;
		lastSweepGen = generation;
		for (const [key, entry] of texCache) if (entry.gen < generation - 3) {
			gl?.deleteTexture(entry.tex);
			texCache.delete(key);
		}
	}
	function uploadSource(src) {
		const g = gl;
		const tex = g.createTexture();
		g.bindTexture(g.TEXTURE_2D, tex);
		g.pixelStorei(g.UNPACK_FLIP_Y_WEBGL, true);
		g.texImage2D(g.TEXTURE_2D, 0, g.RGBA, g.RGBA, g.UNSIGNED_BYTE, src);
		g.pixelStorei(g.UNPACK_FLIP_Y_WEBGL, false);
		g.texParameteri(g.TEXTURE_2D, g.TEXTURE_MIN_FILTER, g.LINEAR);
		g.texParameteri(g.TEXTURE_2D, g.TEXTURE_MAG_FILTER, g.LINEAR);
		g.texParameteri(g.TEXTURE_2D, g.TEXTURE_WRAP_S, g.CLAMP_TO_EDGE);
		g.texParameteri(g.TEXTURE_2D, g.TEXTURE_WRAP_T, g.CLAMP_TO_EDGE);
		return tex;
	}
	function getFallback() {
		if (!fallback) {
			const g = gl;
			fallback = g.createTexture();
			g.bindTexture(g.TEXTURE_2D, fallback);
			g.texImage2D(g.TEXTURE_2D, 0, g.RGBA, 1, 1, 0, g.RGBA, g.UNSIGNED_BYTE, new Uint8Array([
				0,
				0,
				0,
				0
			]));
		}
		return fallback;
	}
	function getLutTex(lut) {
		if (!lut) return getFallback();
		const g = gl;
		if (!lutTex) {
			lutTex = g.createTexture();
			g.bindTexture(g.TEXTURE_2D, lutTex);
			g.texParameteri(g.TEXTURE_2D, g.TEXTURE_MIN_FILTER, g.NEAREST);
			g.texParameteri(g.TEXTURE_2D, g.TEXTURE_MAG_FILTER, g.NEAREST);
			g.texParameteri(g.TEXTURE_2D, g.TEXTURE_WRAP_S, g.CLAMP_TO_EDGE);
			g.texParameteri(g.TEXTURE_2D, g.TEXTURE_WRAP_T, g.CLAMP_TO_EDGE);
		} else g.bindTexture(g.TEXTURE_2D, lutTex);
		g.texImage2D(g.TEXTURE_2D, 0, g.RGBA, 256, 1, 0, g.RGBA, g.UNSIGNED_BYTE, lut);
		return lutTex;
	}
	function clearTarget(t) {
		const g = gl;
		g.bindFramebuffer(g.FRAMEBUFFER, t.fbo);
		g.viewport(0, 0, t.width, t.height);
		g.clearColor(0, 0, 0, 0);
		g.clear(g.COLOR_BUFFER_BIT);
	}
	function dropContextState() {
		targets.clear();
		texCache.clear();
		uniformCache = /* @__PURE__ */ new WeakMap();
		ping = pong = result = null;
		resultValid = false;
		fallback = null;
		lutTex = null;
		blendProg = presentProg = copyProg = adjustProg = null;
		gl = null;
		canvas = null;
	}
	function setupContext() {
		try {
			const c = typeof OffscreenCanvas !== "undefined" ? new OffscreenCanvas(width, height) : document.createElement("canvas");
			if (!(c instanceof OffscreenCanvas)) {
				c.width = width;
				c.height = height;
			}
			const attributes = {
				alpha: true,
				premultipliedAlpha: false,
				preserveDrawingBuffer: true
			};
			const ctx = c instanceof OffscreenCanvas ? c.getContext("webgl2", attributes) : c.getContext("webgl2", attributes);
			if (!ctx) return false;
			if (!ctx.getExtension("EXT_color_buffer_float")) return false;
			canvas = c;
			gl = ctx;
			contextLost = false;
			c.addEventListener("webglcontextlost", (e) => {
				e.preventDefault();
				if (canvas !== c) return;
				contextLost = true;
				if (disposed) return;
				console.warn("[LayerEditor] WebGL context lost — recreating");
				queueMicrotask(() => {
					if (recover()) onRestored?.();
				});
			});
			const vs = compile(gl, gl.VERTEX_SHADER, VERT);
			blendProg = link(gl, vs, compile(gl, gl.FRAGMENT_SHADER, layerBlend_default));
			presentProg = link(gl, vs, compile(gl, gl.FRAGMENT_SHADER, PRESENT_FRAG));
			copyProg = link(gl, vs, compile(gl, gl.FRAGMENT_SHADER, COPY_FRAG));
			adjustProg = link(gl, vs, compile(gl, gl.FRAGMENT_SHADER, ADJUST_FRAG));
			ping = makeTarget(width, height);
			pong = makeTarget(width, height);
			return !!ping && !!pong;
		} catch {
			dropContextState();
			return false;
		}
	}
	function recover() {
		if (disposed) return false;
		const now = typeof performance !== "undefined" ? performance.now() : 0;
		if (now - lastRecover < 1e3) return false;
		lastRecover = now;
		dropContextState();
		return setupContext();
	}
	function ensureHealthy() {
		if (disposed) return false;
		if (gl && !contextLost && !gl.isContextLost()) return true;
		contextLost = true;
		if (!recover()) return false;
		if (onRestored) queueMicrotask(onRestored);
		return true;
	}
	return {
		init(opts) {
			if (gl) {
				if (!gl.isContextLost()) gl.getExtension("WEBGL_lose_context")?.loseContext();
				dropContextState();
			}
			width = opts.width;
			height = opts.height;
			onRestored = opts.onContextRestored;
			disposed = false;
			if (setupContext()) return true;
			dropContextState();
			return false;
		},
		beginFrame() {
			generation += 1;
		},
		resize(w, h) {
			if (w === width && h === height) return;
			width = w;
			height = h;
			if (!ensureHealthy() || !gl) return;
			if (canvas) {
				canvas.width = w;
				canvas.height = h;
			}
			if (ping) freeTargetObj(ping);
			if (pong) freeTargetObj(pong);
			if (result) freeTargetObj(result);
			ping = makeTarget(w, h);
			pong = makeTarget(w, h);
			result = null;
			resultValid = false;
		},
		composite(inputs, target, region) {
			if (!ensureHealthy()) return;
			if (!gl || !blendProg || !ping || !pong) return;
			const g = gl;
			g.disable(g.SCISSOR_TEST);
			let clip = null;
			if (!target && region && resultValid && result) {
				const x = Math.max(0, Math.floor(region.x));
				const y = Math.max(0, Math.floor(region.y));
				const w = Math.min(width, Math.ceil(region.x + region.w)) - x;
				const h = Math.min(height, Math.ceil(region.y + region.h)) - y;
				if (w <= 0 || h <= 0) return;
				if (w < width || h < height) clip = {
					x,
					y,
					w,
					h
				};
			}
			if (clip) {
				g.enable(g.SCISSOR_TEST);
				g.scissor(clip.x, height - (clip.y + clip.h), clip.w, clip.h);
			}
			let read = ping;
			let write = pong;
			clearTarget(read);
			const temps = [];
			for (const input of inputs) {
				clearTarget(write);
				g.bindFramebuffer(g.FRAMEBUFFER, write.fbo);
				g.viewport(0, 0, write.width, write.height);
				if ("adjust" in input) {
					if (!adjustProg) continue;
					g.useProgram(adjustProg);
					g.activeTexture(g.TEXTURE0);
					g.bindTexture(g.TEXTURE_2D, read.tex);
					g.uniform1i(loc(adjustProg, "u_backdrop"), 0);
					g.activeTexture(g.TEXTURE2);
					g.bindTexture(g.TEXTURE_2D, input.mask ? resolveTexture(input.mask, temps) : getFallback());
					g.uniform1i(loc(adjustProg, "u_mask"), 2);
					g.uniform1i(loc(adjustProg, "u_hasMask"), input.mask ? 1 : 0);
					g.uniform1f(loc(adjustProg, "u_opacity"), input.opacity);
					g.uniform1i(loc(adjustProg, "u_op"), input.adjust.op);
					const p = input.adjust.params;
					g.uniform4f(loc(adjustProg, "u_p0"), p[0] ?? 0, p[1] ?? 0, p[2] ?? 0, p[3] ?? 0);
					g.uniform4f(loc(adjustProg, "u_p1"), p[4] ?? 0, p[5] ?? 0, p[6] ?? 0, p[7] ?? 0);
					g.uniform4f(loc(adjustProg, "u_p2"), p[8] ?? 0, p[9] ?? 0, p[10] ?? 0, p[11] ?? 0);
					g.activeTexture(g.TEXTURE1);
					g.bindTexture(g.TEXTURE_2D, getLutTex(input.adjust.lut));
					g.uniform1i(loc(adjustProg, "u_lut"), 1);
				} else {
					g.useProgram(blendProg);
					g.activeTexture(g.TEXTURE0);
					g.bindTexture(g.TEXTURE_2D, read.tex);
					g.uniform1i(loc(blendProg, "u_backdrop"), 0);
					g.activeTexture(g.TEXTURE1);
					g.bindTexture(g.TEXTURE_2D, resolveTexture(input.texture, temps));
					g.uniform1i(loc(blendProg, "u_layer"), 1);
					g.activeTexture(g.TEXTURE2);
					g.bindTexture(g.TEXTURE_2D, input.mask ? resolveTexture(input.mask, temps) : getFallback());
					g.uniform1i(loc(blendProg, "u_mask"), 2);
					g.uniform1i(loc(blendProg, "u_hasMask"), input.mask ? 1 : 0);
					g.uniform1i(loc(blendProg, "u_srgbLayer"), input.texture.linear ? 0 : 1);
					g.uniform1f(loc(blendProg, "u_opacity"), input.opacity);
					const u = modeUniforms(input.mode);
					g.uniform1i(loc(blendProg, "u_blend"), u.blend);
					g.uniform1i(loc(blendProg, "u_composite"), u.composite);
					g.uniform1i(loc(blendProg, "u_blendSpace"), u.blendSpace);
					g.uniform1i(loc(blendProg, "u_compositeSpace"), u.compositeSpace);
				}
				drawFullscreen();
				const tmp = read;
				read = write;
				write = tmp;
			}
			for (const tex of temps) g.deleteTexture(tex);
			sweepTexCache();
			if (target) {
				const dst = targets.get(target.id);
				if (dst) blit(read, dst);
				return;
			}
			if (!result || result.width !== width || result.height !== height) {
				if (result) freeTargetObj(result);
				result = makeTarget(width, height);
				resultValid = false;
			}
			if (result) {
				blit(read, result);
				resultValid = true;
			}
			if (clip) g.disable(g.SCISSOR_TEST);
		},
		allocTarget(w, h) {
			const id = nextHandle++;
			if (gl) {
				const target = makeTarget(w, h);
				if (target) targets.set(id, target);
			}
			return {
				id,
				width: w,
				height: h
			};
		},
		freeTarget(handle) {
			const t = targets.get(handle.id);
			if (t) {
				freeTargetObj(t);
				targets.delete(handle.id);
			}
		},
		targetTexture(handle) {
			return targets.get(handle.id)?.tex ?? null;
		},
		upload(source) {
			return uploadSource(source);
		},
		readback(region) {
			const empty = () => new ImageData(Math.max(1, width), Math.max(1, height));
			if (!ensureHealthy() || !gl || !ping) return empty();
			const g = gl;
			let clip = null;
			if (region) {
				const x = Math.max(0, Math.floor(region.x));
				const y = Math.max(0, Math.floor(region.y));
				const w = Math.min(width, Math.ceil(region.x + region.w)) - x;
				const h = Math.min(height, Math.ceil(region.y + region.h)) - y;
				if (w <= 0 || h <= 0) return new ImageData(1, 1);
				if (w < width || h < height) clip = {
					x,
					y,
					w,
					h
				};
			}
			presentToDefault(result ?? ping, clip);
			g.bindFramebuffer(g.FRAMEBUFFER, null);
			if (clip) {
				const px = new Uint8ClampedArray(clip.w * clip.h * 4);
				g.readPixels(clip.x, height - (clip.y + clip.h), clip.w, clip.h, g.RGBA, g.UNSIGNED_BYTE, px);
				flipRows(px, clip.w, clip.h);
				return new ImageData(px, clip.w, clip.h);
			}
			const px = new Uint8ClampedArray(width * height * 4);
			g.readPixels(0, 0, width, height, g.RGBA, g.UNSIGNED_BYTE, px);
			flipRows(px, width, height);
			return new ImageData(px, width, height);
		},
		async toBlob() {
			const data = this.readback();
			const c = document.createElement("canvas");
			c.width = data.width;
			c.height = data.height;
			c.getContext("2d").putImageData(data, 0, 0);
			return await new Promise((res, rej) => c.toBlob((b) => b ? res(b) : rej(/* @__PURE__ */ new Error("toBlob failed")), "image/png"));
		},
		getCanvas() {
			return canvas;
		},
		dispose() {
			disposed = true;
			if (!gl) return;
			if (ping) freeTargetObj(ping);
			if (pong) freeTargetObj(pong);
			if (result) freeTargetObj(result);
			for (const t of targets.values()) freeTargetObj(t);
			targets.clear();
			for (const entry of texCache.values()) gl.deleteTexture(entry.tex);
			texCache.clear();
			if (fallback) gl.deleteTexture(fallback);
			if (lutTex) gl.deleteTexture(lutTex);
			if (blendProg) gl.deleteProgram(blendProg);
			if (presentProg) gl.deleteProgram(presentProg);
			if (copyProg) gl.deleteProgram(copyProg);
			if (adjustProg) gl.deleteProgram(adjustProg);
			gl.getExtension("WEBGL_lose_context")?.loseContext();
			gl = null;
			ping = pong = result = null;
			lutTex = null;
			fallback = blendProg = presentProg = copyProg = adjustProg = null;
		}
	};
	function presentToDefault(src, clip) {
		const g = gl;
		g.disable(g.SCISSOR_TEST);
		if (clip) {
			g.enable(g.SCISSOR_TEST);
			g.scissor(clip.x, height - (clip.y + clip.h), clip.w, clip.h);
		}
		g.useProgram(presentProg);
		g.bindFramebuffer(g.FRAMEBUFFER, null);
		g.viewport(0, 0, width, height);
		g.clearColor(0, 0, 0, 0);
		g.clear(g.COLOR_BUFFER_BIT);
		g.activeTexture(g.TEXTURE0);
		g.bindTexture(g.TEXTURE_2D, src.tex);
		g.uniform1i(loc(presentProg, "u_tex"), 0);
		drawFullscreen();
		if (clip) g.disable(g.SCISSOR_TEST);
	}
	function blit(src, dst) {
		const g = gl;
		g.useProgram(copyProg);
		g.bindFramebuffer(g.FRAMEBUFFER, dst.fbo);
		g.viewport(0, 0, dst.width, dst.height);
		g.activeTexture(g.TEXTURE0);
		g.bindTexture(g.TEXTURE_2D, src.tex);
		g.uniform1i(loc(copyProg, "u_tex"), 0);
		drawFullscreen();
	}
}
function flipRows(px, w, h) {
	const row = w * 4;
	const tmp = new Uint8ClampedArray(row);
	for (let y = 0; y < h >> 1; y++) {
		const top = y * row;
		const bot = (h - 1 - y) * row;
		tmp.set(px.subarray(top, top + row));
		px.copyWithin(top, bot, bot + row);
		px.set(tmp, bot);
	}
}
//#endregion
//#region src/renderer/extensions/layerEditor/engine/document.ts
function walk(root, fn, depth = 0) {
	for (const child of root.children) if (fn(child, root, depth) !== false && child.kind === "group") walk(child, fn, depth + 1);
}
function findNode(root, id) {
	let found = null;
	walk(root, (node, parent, _d) => {
		if (found) return false;
		if (node.id === id) {
			found = {
				node,
				parent,
				index: parent.children.indexOf(node)
			};
			return false;
		}
	});
	return found;
}
function filterTopmost(root, ids) {
	const want = new Set(ids);
	const out = [];
	walk(root, (node) => {
		if (want.has(node.id)) {
			out.push(node.id);
			return false;
		}
	});
	return out;
}
function flattenTree(root) {
	const out = [];
	walk(root, (n) => {
		out.push(n);
	});
	return out;
}
//#endregion
//#region src/renderer/extensions/layerEditor/engine/commands/structure.ts
function nodeContentRefs(node) {
	if (!hasNodeKind(node.kind)) return [];
	return getNodeKind(node.kind).contentIds(node);
}
function insert(parent, node, index) {
	parent.children.splice(Math.max(0, Math.min(index, parent.children.length)), 0, node);
}
function remove(parent, node) {
	const i = parent.children.indexOf(node);
	if (i >= 0) parent.children.splice(i, 1);
}
var AddNodeCommand = class {
	label;
	parent;
	node;
	index;
	dirtyMask = Dirty.STRUCTURE;
	constructor(label, parent, node, index) {
		this.label = label;
		this.parent = parent;
		this.node = node;
		this.index = index;
	}
	apply(dir) {
		if (dir === "redo") insert(this.parent, this.node, this.index);
		else remove(this.parent, this.node);
	}
	sizeBytes() {
		return 128;
	}
	contentRefs() {
		return nodeContentRefs(this.node);
	}
};
var ReorderCommand = class {
	label;
	node;
	fromParent;
	fromIndex;
	toParent;
	toIndex;
	dirtyMask = Dirty.STRUCTURE;
	constructor(label, node, fromParent, fromIndex, toParent, toIndex) {
		this.label = label;
		this.node = node;
		this.fromParent = fromParent;
		this.fromIndex = fromIndex;
		this.toParent = toParent;
		this.toIndex = toIndex;
	}
	apply(dir) {
		if (dir === "redo") {
			remove(this.fromParent, this.node);
			insert(this.toParent, this.node, this.toIndex);
		} else {
			remove(this.toParent, this.node);
			insert(this.fromParent, this.node, this.fromIndex);
		}
	}
	sizeBytes() {
		return 128;
	}
};
//#endregion
//#region src/renderer/extensions/layerEditor/engine/id.ts
var counter = 0;
function generateId(prefix) {
	counter += 1;
	return `${prefix}-${Date.now().toString(36)}-${counter.toString(36)}`;
}
//#endregion
//#region src/renderer/extensions/layerEditor/engine/impl/contentStore.ts
var DefaultContentStore = class {
	entries = /* @__PURE__ */ new Map();
	register(canvas, opts) {
		const id = opts?.id ?? generateId("content");
		this.entries.set(id, {
			id,
			canvas,
			width: canvas.width,
			height: canvas.height,
			uploadedUrl: opts?.uploadedUrl ?? null
		});
		return id;
	}
	get(id) {
		return this.entries.get(id);
	}
	has(id) {
		return this.entries.has(id);
	}
	dirtyIds() {
		const out = [];
		for (const e of this.entries.values()) if (e.uploadedUrl === null) out.push(e.id);
		return out;
	}
	markUploaded(id, url) {
		const e = this.entries.get(id);
		if (e) e.uploadedUrl = url;
	}
	collectGarbage(liveIds) {
		for (const id of Array.from(this.entries.keys())) if (!liveIds.has(id)) this.entries.delete(id);
	}
	totalBytes() {
		let n = 0;
		for (const e of this.entries.values()) n += e.width * e.height * 4;
		return n;
	}
};
//#endregion
//#region src/renderer/extensions/layerEditor/engine/render/bake.ts
function placedBounds(t) {
	const cx = t.x + t.w / 2;
	const cy = t.y + t.h / 2;
	const cos = Math.cos(t.rotation);
	const sin = Math.sin(t.rotation);
	const hw = t.w / 2;
	const hh = t.h / 2;
	let minX = Infinity;
	let minY = Infinity;
	let maxX = -Infinity;
	let maxY = -Infinity;
	for (const [dx, dy] of [
		[-hw, -hh],
		[hw, -hh],
		[hw, hh],
		[-hw, hh]
	]) {
		const px = cx + dx * cos - dy * sin;
		const py = cy + dx * sin + dy * cos;
		minX = Math.min(minX, px);
		minY = Math.min(minY, py);
		maxX = Math.max(maxX, px);
		maxY = Math.max(maxY, py);
	}
	const x = Math.floor(minX);
	const y = Math.floor(minY);
	return {
		x,
		y,
		w: Math.max(1, Math.ceil(maxX) - x),
		h: Math.max(1, Math.ceil(maxY) - y)
	};
}
function isIdentityPlacement(t, naturalW, naturalH) {
	return t.rotation === 0 && Math.round(t.w) === naturalW && Math.round(t.h) === naturalH;
}
function drawPlacedInto(ctx, bitmap, t, originX, originY) {
	ctx.save();
	try {
		ctx.translate(t.x + t.w / 2 - originX, t.y + t.h / 2 - originY);
		ctx.rotate(t.rotation);
		ctx.drawImage(bitmap, -t.w / 2, -t.h / 2, t.w, t.h);
	} finally {
		ctx.restore();
	}
}
function bakePlaced(bitmap, t) {
	const bounds = placedBounds(t);
	const canvas = document.createElement("canvas");
	canvas.width = bounds.w;
	canvas.height = bounds.h;
	const ctx = canvas.getContext("2d");
	if (!ctx) return null;
	ctx.imageSmoothingEnabled = true;
	ctx.imageSmoothingQuality = "high";
	drawPlacedInto(ctx, bitmap, t, bounds.x, bounds.y);
	return {
		canvas,
		bounds
	};
}
function bakeMaskInto(maskBitmap, oldTransform, bounds, fill) {
	const canvas = document.createElement("canvas");
	canvas.width = bounds.w;
	canvas.height = bounds.h;
	const ctx = canvas.getContext("2d");
	if (!ctx) return null;
	ctx.fillStyle = fill === "white" ? "#ffffff" : "#000000";
	ctx.fillRect(0, 0, bounds.w, bounds.h);
	ctx.imageSmoothingEnabled = true;
	ctx.imageSmoothingQuality = "high";
	drawPlacedInto(ctx, maskBitmap, oldTransform, bounds.x, bounds.y);
	return canvas;
}
//#endregion
//#region src/renderer/extensions/layerEditor/engine/render/renderStack.ts
function transformStamp(t) {
	return `${t.x},${t.y},${t.w},${t.h},${t.rotation}`;
}
function makePlaced(deps, region, used) {
	return (cacheKey, contentStamp, bitmap, transform, linear = false) => {
		const stamp = `${contentStamp}|${transformStamp(transform)}|${region.w}x${region.h}`;
		const cache = deps.placedCache;
		if (!cache) {
			const canvas = placeBitmap(bitmap, transform, region.w, region.h);
			return canvas ? {
				source: canvas,
				rect: region,
				linear,
				key: stamp
			} : null;
		}
		used.add(cacheKey);
		const entry = cache.get(cacheKey);
		if (entry && entry.stamp === stamp) return {
			source: entry.canvas,
			rect: region,
			linear,
			key: stamp
		};
		const canvas = placeBitmap(bitmap, transform, region.w, region.h, entry?.canvas);
		if (!canvas) return null;
		cache.set(cacheKey, {
			stamp,
			canvas
		});
		return {
			source: canvas,
			rect: region,
			linear,
			key: stamp
		};
	};
}
function renderMaskTexture(node, region, deps, placed, used) {
	const m = node.mask;
	if (!m || !m.enabled) return void 0;
	const tf = node.transform.w > 0 && node.transform.h > 0 ? node.transform : {
		x: 0,
		y: 0,
		w: region.w,
		h: region.h,
		rotation: 0
	};
	const override = deps.overrides?.get(`mask:${node.id}`);
	if (override) return renderPreviewTexture(`preview:mask:${node.id}`, override, tf, region, deps, used, true) ?? void 0;
	const bitmap = deps.content.get(m.contentId)?.canvas;
	if (!bitmap) return void 0;
	return placed(`mask:${node.id}`, m.contentId, bitmap, tf, true) ?? void 0;
}
function renderLeafTexture(node, ctx, deps, used) {
	const override = deps.overrides?.get(`content:${node.id}`);
	if (override) {
		const texture = renderPreviewTexture(`preview:content:${node.id}`, override, node.transform, ctx.region, deps, used, false);
		if (texture) return texture;
	}
	return getNodeKind(node.kind).renderNode(node, ctx);
}
function renderPreviewTexture(cacheKey, override, transform, region, deps, used, linear) {
	const cache = deps.placedCache;
	if (!cache) {
		const canvas = placeBitmap(override.canvas, transform, region.w, region.h, void 0, null, true);
		return canvas ? {
			source: canvas,
			rect: region,
			linear
		} : null;
	}
	used.add(cacheKey);
	const meta = `${transformStamp(transform)}|${region.w}x${region.h}`;
	const stamp = `v${override.version}|${meta}`;
	const entry = cache.get(cacheKey);
	if (entry && entry.stamp === stamp) return {
		source: entry.canvas,
		rect: region,
		linear,
		key: cacheKey,
		version: override.version
	};
	const prevVersion = entry ? Number(/^v(\d+)\|/.exec(entry.stamp)?.at(1) ?? NaN) : NaN;
	const partial = entry && entry.stamp.endsWith(`|${meta}`) && prevVersion === override.version - 1 ? override.rects ?? null : null;
	let canvas;
	if (partial && entry) {
		canvas = entry.canvas;
		for (const r of partial) {
			canvas = placeBitmap(override.canvas, transform, region.w, region.h, canvas, r, true);
			if (!canvas) break;
		}
	} else canvas = placeBitmap(override.canvas, transform, region.w, region.h, entry?.canvas, null, true);
	if (!canvas) return null;
	cache.set(cacheKey, {
		stamp,
		canvas
	});
	return {
		source: canvas,
		rect: region,
		linear,
		key: cacheKey,
		version: override.version,
		dirtyRects: partial ?? void 0
	};
}
function buildInputs(group, doc, deps, used) {
	const region = {
		x: 0,
		y: 0,
		w: doc.width,
		h: doc.height
	};
	const inputs = [];
	const cleanups = [];
	const placed = makePlaced(deps, region, used);
	const ctx = {
		compositor: deps.compositor,
		content: deps.content,
		renderChild: () => null,
		placed,
		region,
		devicePixelRatio: deps.devicePixelRatio ?? 1
	};
	try {
		for (const node of group.children) {
			if (!node.visible || node.opacity <= 0) continue;
			if (node.kind === "group") {
				const g = node;
				const sub = buildInputs(g, doc, deps, used);
				if (g.passThrough) {
					inputs.push(...sub.inputs);
					cleanups.push(sub.cleanup);
					continue;
				}
				let handle;
				try {
					handle = deps.compositor.allocTarget(doc.width, doc.height);
				} catch (err) {
					sub.cleanup();
					throw err;
				}
				try {
					deps.compositor.composite(sub.inputs, handle);
				} catch (err) {
					deps.compositor.freeTarget(handle);
					sub.cleanup();
					throw err;
				}
				sub.cleanup();
				cleanups.push(() => deps.compositor.freeTarget(handle));
				const groupTexture = deps.compositor.targetTexture(handle);
				if (groupTexture) inputs.push({
					texture: {
						source: groupTexture,
						rect: region,
						linear: true
					},
					opacity: node.opacity,
					mode: resolveMode(node.mode),
					mask: renderMaskTexture(node, region, deps, placed, used)
				});
				continue;
			}
			const texture = renderLeafTexture(node, ctx, deps, used);
			if (!texture) continue;
			inputs.push({
				texture,
				opacity: node.opacity,
				mode: resolveMode(node.mode),
				mask: renderMaskTexture(node, region, deps, placed, used)
			});
		}
	} catch (err) {
		cleanups.forEach((fn) => fn());
		throw err;
	}
	return {
		inputs,
		cleanup: () => cleanups.forEach((fn) => fn())
	};
}
function renderDocument(doc, deps, extra, region) {
	deps.compositor.beginFrame?.();
	const used = /* @__PURE__ */ new Set();
	const { inputs, cleanup } = buildInputs(doc.root, doc, deps, used);
	try {
		deps.compositor.composite(extra?.length ? [...inputs, ...extra] : inputs, null, region ?? void 0);
	} finally {
		cleanup();
	}
	if (deps.placedCache) {
		for (const key of Array.from(deps.placedCache.keys())) if (!used.has(key)) deps.placedCache.delete(key);
	}
}
//#endregion
//#region src/renderer/extensions/layerEditor/engine/tool.ts
function defaultControl() {
	return {
		active: false,
		pausedDepth: 0,
		abortMask: 0,
		cursor: "default",
		wantsClick: true,
		wantsDoubleClick: false,
		motionMode: "compressed"
	};
}
var registry = /* @__PURE__ */ new Map();
function registerTool(def) {
	registry.set(def.id, def);
}
function getTool(id) {
	const def = registry.get(id);
	if (!def) throw new Error(`Unknown tool: ${id}`);
	return def;
}
//#endregion
//#region src/renderer/extensions/layerEditor/engine/tools/transformMath.ts
var ROTATE_OFFSET = 24;
var SIGN = {
	nw: {
		x: -1,
		y: -1
	},
	n: {
		x: 0,
		y: -1
	},
	ne: {
		x: 1,
		y: -1
	},
	e: {
		x: 1,
		y: 0
	},
	se: {
		x: 1,
		y: 1
	},
	s: {
		x: 0,
		y: 1
	},
	sw: {
		x: -1,
		y: 1
	},
	w: {
		x: -1,
		y: 0
	},
	rotate: {
		x: 0,
		y: -1
	}
};
var OPP = {
	nw: "se",
	n: "s",
	ne: "sw",
	e: "w",
	se: "nw",
	s: "n",
	sw: "ne",
	w: "e",
	rotate: "rotate"
};
function rot(p, a) {
	const c = Math.cos(a);
	const s = Math.sin(a);
	return {
		x: p.x * c - p.y * s,
		y: p.x * s + p.y * c
	};
}
function center(t) {
	return {
		x: t.x + t.w / 2,
		y: t.y + t.h / 2
	};
}
function axes(t) {
	const c = Math.cos(t.rotation);
	const s = Math.sin(t.rotation);
	return {
		ex: {
			x: c,
			y: s
		},
		ey: {
			x: -s,
			y: c
		}
	};
}
function handlePos(t, h) {
	const cen = center(t);
	const p = rot(h === "rotate" ? {
		x: 0,
		y: -t.h / 2 - ROTATE_OFFSET
	} : {
		x: SIGN[h].x * t.w / 2,
		y: SIGN[h].y * t.h / 2
	}, t.rotation);
	return {
		x: cen.x + p.x,
		y: cen.y + p.y
	};
}
function toLocalFrame(t, pt) {
	const cen = center(t);
	return rot({
		x: pt.x - cen.x,
		y: pt.y - cen.y
	}, -t.rotation);
}
function hitHandle(t, pt, tol) {
	for (const h of [
		"rotate",
		"nw",
		"ne",
		"se",
		"sw",
		"n",
		"e",
		"s",
		"w"
	]) {
		const hp = handlePos(t, h);
		if (Math.hypot(pt.x - hp.x, pt.y - hp.y) <= tol) return h;
	}
	return null;
}
function insideBox(t, pt) {
	const l = toLocalFrame(t, pt);
	return Math.abs(l.x) <= t.w / 2 && Math.abs(l.y) <= t.h / 2;
}
function applyMove(t, dx, dy) {
	return {
		...t,
		x: t.x + dx,
		y: t.y + dy
	};
}
function applyResize(t, h, pt, minSize = 1, keepAspect = false) {
	if (h === "rotate") return t;
	const anchor = handlePos(t, OPP[h]);
	const { ex, ey } = axes(t);
	const dir = SIGN[h];
	const controlsX = dir.x !== 0;
	const controlsY = dir.y !== 0;
	const d = {
		x: pt.x - anchor.x,
		y: pt.y - anchor.y
	};
	const projX = d.x * ex.x + d.y * ex.y;
	const projY = d.x * ey.x + d.y * ey.y;
	const oc = center(t);
	const ocRel = {
		x: (oc.x - anchor.x) * ex.x + (oc.y - anchor.y) * ex.y,
		y: (oc.x - anchor.x) * ey.x + (oc.y - anchor.y) * ey.y
	};
	if (keepAspect && t.w > 0 && t.h > 0) {
		let s;
		if (controlsX && controlsY) {
			const vx = dir.x * t.w;
			const vy = dir.y * t.h;
			s = (projX * vx + projY * vy) / (vx * vx + vy * vy);
		} else if (controlsX) s = dir.x * projX / t.w;
		else s = dir.y * projY / t.h;
		s = Math.max(s, minSize / t.w, minSize / t.h);
		const relX = ocRel.x * s;
		const relY = ocRel.y * s;
		const newW = t.w * s;
		const newH = t.h * s;
		const nc = {
			x: anchor.x + ex.x * relX + ey.x * relY,
			y: anchor.y + ex.y * relX + ey.y * relY
		};
		return {
			x: nc.x - newW / 2,
			y: nc.y - newH / 2,
			w: newW,
			h: newH,
			rotation: t.rotation
		};
	}
	const newW = controlsX ? Math.max(minSize, Math.abs(projX)) : t.w;
	const newH = controlsY ? Math.max(minSize, Math.abs(projY)) : t.h;
	const relX = controlsX ? dir.x * newW / 2 : ocRel.x;
	const relY = controlsY ? dir.y * newH / 2 : ocRel.y;
	const nc = {
		x: anchor.x + ex.x * relX + ey.x * relY,
		y: anchor.y + ex.y * relX + ey.y * relY
	};
	return {
		x: nc.x - newW / 2,
		y: nc.y - newH / 2,
		w: newW,
		h: newH,
		rotation: t.rotation
	};
}
function angleTo(t, pt) {
	const c = center(t);
	return Math.atan2(pt.y - c.y, pt.x - c.x);
}
function applyRotate(t, baseRotation, grabAngle, pt, snap = 0) {
	let rotation = baseRotation + (angleTo(t, pt) - grabAngle);
	if (snap > 0) rotation = Math.round(rotation / snap) * snap;
	return {
		...t,
		rotation
	};
}
function unionBounds(boxes) {
	let minX = Infinity;
	let minY = Infinity;
	let maxX = -Infinity;
	let maxY = -Infinity;
	const corners = [
		"nw",
		"ne",
		"se",
		"sw"
	];
	for (const b of boxes) for (const h of corners) {
		const p = handlePos(b, h);
		minX = Math.min(minX, p.x);
		minY = Math.min(minY, p.y);
		maxX = Math.max(maxX, p.x);
		maxY = Math.max(maxY, p.y);
	}
	return {
		x: minX,
		y: minY,
		w: maxX - minX,
		h: maxY - minY,
		rotation: 0
	};
}
function scaleAround(t, anchor, scale) {
	const c = center(t);
	const nc = {
		x: anchor.x + (c.x - anchor.x) * scale,
		y: anchor.y + (c.y - anchor.y) * scale
	};
	const w = t.w * scale;
	const h = t.h * scale;
	return {
		x: nc.x - w / 2,
		y: nc.y - h / 2,
		w,
		h,
		rotation: t.rotation
	};
}
function rotateAround(t, pivot, theta) {
	const c = center(t);
	const cos = Math.cos(theta);
	const sin = Math.sin(theta);
	const dx = c.x - pivot.x;
	const dy = c.y - pivot.y;
	const nc = {
		x: pivot.x + dx * cos - dy * sin,
		y: pivot.y + dx * sin + dy * cos
	};
	return {
		x: nc.x - t.w / 2,
		y: nc.y - t.h / 2,
		w: t.w,
		h: t.h,
		rotation: t.rotation + theta
	};
}
function groupResize(gizmo, handle, pt, minSize = 1) {
	const next = applyResize(gizmo, handle, pt, minSize, true);
	return {
		gizmo: next,
		anchor: handlePos(gizmo, OPP[handle]),
		scale: gizmo.w > 0 ? next.w / gizmo.w : 1
	};
}
function alignedTo(rotation, frameRotation, eps = 1e-6) {
	const k = (rotation - frameRotation) / (Math.PI / 2);
	return Math.abs(k - Math.round(k)) < eps;
}
function groupScale(gizmo, handle, pt, minSize = 1) {
	const next = applyResize(gizmo, handle, pt, minSize, false);
	return {
		gizmo: next,
		anchor: handlePos(gizmo, OPP[handle]),
		sx: gizmo.w > 0 ? next.w / gizmo.w : 1,
		sy: gizmo.h > 0 ? next.h / gizmo.h : 1
	};
}
function scaleAroundFrame(t, anchor, frameRotation, sx, sy) {
	const c = center(t);
	const cos = Math.cos(frameRotation);
	const sin = Math.sin(frameRotation);
	const dx = c.x - anchor.x;
	const dy = c.y - anchor.y;
	const fx = (dx * cos + dy * sin) * sx;
	const fy = (-dx * sin + dy * cos) * sy;
	const nc = {
		x: anchor.x + fx * cos - fy * sin,
		y: anchor.y + fx * sin + fy * cos
	};
	const swap = Math.round((t.rotation - frameRotation) / (Math.PI / 2)) % 2 !== 0;
	const w = t.w * (swap ? sy : sx);
	const h = t.h * (swap ? sx : sy);
	return {
		x: nc.x - w / 2,
		y: nc.y - h / 2,
		w,
		h,
		rotation: t.rotation
	};
}
//#endregion
//#region src/renderer/extensions/layerEditor/engine/tools/overlayBox.ts
var HANDLES = [
	"nw",
	"n",
	"ne",
	"e",
	"se",
	"s",
	"sw",
	"w"
];
function addTransformBox(overlay, t, handles = true) {
	overlay.add({
		type: "polyline",
		points: [
			"nw",
			"ne",
			"se",
			"sw"
		].map((h) => handlePos(t, h)),
		closed: true
	});
	if (!handles) return;
	overlay.add({
		type: "line",
		a: handlePos(t, "n"),
		b: handlePos(t, "rotate")
	});
	for (const h of HANDLES) overlay.add({
		type: "handle",
		pos: handlePos(t, h),
		shape: "square",
		id: h
	});
	overlay.add({
		type: "handle",
		pos: handlePos(t, "rotate"),
		shape: "circle",
		id: "rotate"
	});
}
//#endregion
//#region src/renderer/extensions/layerEditor/engine/snapping.ts
function clampNum(v, lo, hi) {
	return Math.max(lo, Math.min(hi, v));
}
function buildSnapTargets(otherRects, bounds, extras) {
	const bw = bounds?.w ?? 1;
	const bh = bounds?.h ?? 1;
	const xs = [
		0,
		bw / 2,
		bw
	];
	const ys = [
		0,
		bh / 2,
		bh
	];
	for (const r of otherRects) {
		xs.push(r.x, r.x + r.w / 2, r.x + r.w);
		ys.push(r.y, r.y + r.h / 2, r.y + r.h);
	}
	if (extras?.gridX && extras.gridX > 0) for (let v = 0; v <= bw + 1e-9; v += extras.gridX) xs.push(v);
	if (extras?.gridY && extras.gridY > 0) for (let v = 0; v <= bh + 1e-9; v += extras.gridY) ys.push(v);
	for (const g of extras?.guideXs ?? []) xs.push(g);
	for (const g of extras?.guideYs ?? []) ys.push(g);
	return {
		xs,
		ys
	};
}
function overlaps(a0, a1, b0, b1) {
	return a0 < b1 && a1 > b0;
}
function eqCandidatesAxis(rect, others, axis) {
	const p = (r) => axis === "x" ? r.x : r.y;
	const s = (r) => axis === "x" ? r.w : r.h;
	const c0 = (r) => axis === "x" ? r.y : r.x;
	const c1 = (r) => axis === "x" ? r.y + r.h : r.x + r.w;
	const cross = axis === "x" ? rect.y + rect.h / 2 : rect.x + rect.w / 2;
	const near = others.filter((o) => overlaps(c0(o), c1(o), c0(rect), c1(rect)));
	const lefts = near.filter((o) => p(o) + s(o) <= p(rect) + s(rect) / 2).sort((a, b) => p(b) + s(b) - (p(a) + s(a)));
	const rights = near.filter((o) => p(o) >= p(rect) + s(rect) / 2).sort((a, b) => p(a) - p(b));
	const out = [];
	const L = lefts.at(0);
	const R = rights.at(0);
	if (L && R) {
		const free = p(R) - (p(L) + s(L)) - s(rect);
		if (free >= 0) {
			const pos = p(L) + s(L) + free / 2;
			out.push({
				pos,
				guide: {
					axis,
					pos,
					kind: "gap",
					cross,
					spans: [[p(L) + s(L), pos], [pos + s(rect), p(R)]]
				}
			});
		}
	}
	if (lefts.length >= 2) {
		const L1 = lefts[0];
		const L2 = lefts[1];
		const gap = p(L1) - (p(L2) + s(L2));
		if (gap >= 0) {
			const pos = p(L1) + s(L1) + gap;
			out.push({
				pos,
				guide: {
					axis,
					pos,
					kind: "gap",
					cross,
					spans: [[p(L2) + s(L2), p(L1)], [p(L1) + s(L1), pos]]
				}
			});
		}
	}
	if (rights.length >= 2) {
		const R1 = rights[0];
		const R2 = rights[1];
		const gap = p(R2) - (p(R1) + s(R1));
		if (gap >= 0) {
			const pos = p(R1) - gap - s(rect);
			out.push({
				pos,
				guide: {
					axis,
					pos,
					kind: "gap",
					cross,
					spans: [[pos + s(rect), p(R1)], [p(R1) + s(R1), p(R2)]]
				}
			});
		}
	}
	return out;
}
function nearestTarget(val, targets, thr) {
	let best = null;
	let bd = thr;
	for (const t of targets) {
		const dd = Math.abs(val - t);
		if (dd < bd) {
			bd = dd;
			best = t;
		}
	}
	return best;
}
function applySnap(mode, rect, targets, opts) {
	let { x, y, w, h } = rect;
	const guides = [];
	const { thrX, thrY, minWH } = opts;
	const bw = opts.boundsW ?? 1;
	const bh = opts.boundsH ?? 1;
	const clamp = opts.clamp !== false;
	if (mode === "move") {
		let bestDX = null;
		let guideX = null;
		for (const v of [
			x,
			x + w / 2,
			x + w
		]) {
			const t = nearestTarget(v, targets.xs, thrX);
			if (t != null) {
				const dd = t - v;
				if (bestDX === null || Math.abs(dd) < Math.abs(bestDX)) {
					bestDX = dd;
					guideX = {
						axis: "x",
						pos: t,
						kind: "edge"
					};
				}
			}
		}
		let bestDY = null;
		let guideY = null;
		for (const v of [
			y,
			y + h / 2,
			y + h
		]) {
			const t = nearestTarget(v, targets.ys, thrY);
			if (t != null) {
				const dd = t - v;
				if (bestDY === null || Math.abs(dd) < Math.abs(bestDY)) {
					bestDY = dd;
					guideY = {
						axis: "y",
						pos: t,
						kind: "edge"
					};
				}
			}
		}
		if (opts.eqRects?.length) {
			for (const c of eqCandidatesAxis(rect, opts.eqRects, "x")) {
				const dd = c.pos - x;
				if (Math.abs(dd) < thrX && (bestDX === null || Math.abs(dd) < Math.abs(bestDX))) {
					bestDX = dd;
					guideX = c.guide;
				}
			}
			for (const c of eqCandidatesAxis(rect, opts.eqRects, "y")) {
				const dd = c.pos - y;
				if (Math.abs(dd) < thrY && (bestDY === null || Math.abs(dd) < Math.abs(bestDY))) {
					bestDY = dd;
					guideY = c.guide;
				}
			}
		}
		if (bestDX !== null && guideX) {
			x += bestDX;
			guides.push(guideX);
		}
		if (bestDY !== null && guideY) {
			y += bestDY;
			guides.push(guideY);
		}
	} else {
		if (mode.includes("e")) {
			const t = nearestTarget(x + w, targets.xs, thrX);
			if (t != null) {
				w = t - x;
				guides.push({
					axis: "x",
					pos: t
				});
			}
		}
		if (mode.includes("w")) {
			const t = nearestTarget(x, targets.xs, thrX);
			if (t != null) {
				const rt = x + w;
				x = t;
				w = rt - x;
				guides.push({
					axis: "x",
					pos: t
				});
			}
		}
		if (mode.includes("s")) {
			const t = nearestTarget(y + h, targets.ys, thrY);
			if (t != null) {
				h = t - y;
				guides.push({
					axis: "y",
					pos: t
				});
			}
		}
		if (mode.includes("n")) {
			const t = nearestTarget(y, targets.ys, thrY);
			if (t != null) {
				const bt = y + h;
				y = t;
				h = bt - y;
				guides.push({
					axis: "y",
					pos: t
				});
			}
		}
		w = Math.max(minWH, w);
		h = Math.max(minWH, h);
	}
	if (clamp) {
		x = clampNum(x, 0, Math.max(0, bw - w));
		y = clampNum(y, 0, Math.max(0, bh - h));
	}
	return {
		rect: {
			x,
			y,
			w,
			h
		},
		guides
	};
}
//#endregion
//#region src/renderer/extensions/layerEditor/engine/tools/transformTool.ts
var TRANSFORMABLE_KINDS = /* @__PURE__ */ new Set([
	"raster",
	"text",
	"vector"
]);
function sameTransform$1(a, b) {
	return a.x === b.x && a.y === b.y && a.w === b.w && a.h === b.h && a.rotation === b.rotation;
}
__name(sameTransform$1, "sameTransform");
function sameIds(a, b) {
	return a.length === b.length && a.every((x, i) => x === b[i]);
}
function canTransformNode(node) {
	return !!node && TRANSFORMABLE_KINDS.has(node.kind) && !node.locks.position;
}
function computeGizmo(targets) {
	return targets.length === 1 ? { ...targets[0].transform } : unionBounds(targets.map((n) => n.transform));
}
var TransformTool = class {
	id;
	ctx;
	control;
	session = null;
	drag = { mode: "idle" };
	snapGuides = [];
	constructor(id, ctx) {
		this.id = id;
		this.ctx = ctx;
		this.control = {
			...defaultControl(),
			cursor: "default",
			abortMask: Dirty.STRUCTURE
		};
	}
	tol() {
		return 8 / Math.max(.001, this.ctx.zoom());
	}
	snapContext(excludeIds) {
		const doc = this.ctx.document();
		const rects = flattenTree(doc.root).filter((n) => n.visible && TRANSFORMABLE_KINDS.has(n.kind) && !excludeIds.has(n.id)).map((n) => unionBounds([n.transform]));
		const grid = this.ctx.snapGrid();
		const guides = doc.guides ?? [];
		return {
			targets: buildSnapTargets(rects, {
				w: doc.width,
				h: doc.height
			}, {
				gridX: grid > 0 ? grid : void 0,
				gridY: grid > 0 ? grid : void 0,
				guideXs: guides.filter((g) => g.axis === "x").map((g) => g.pos),
				guideYs: guides.filter((g) => g.axis === "y").map((g) => g.pos)
			}),
			rects
		};
	}
	snapMove(gizmo, excludeIds) {
		const doc = this.ctx.document();
		const aabb = unionBounds([gizmo]);
		const thr = this.tol();
		const { targets, rects } = this.snapContext(excludeIds);
		const res = applySnap("move", aabb, targets, {
			thrX: thr,
			thrY: thr,
			minWH: 1,
			boundsW: doc.width,
			boundsH: doc.height,
			clamp: false,
			eqRects: rects
		});
		this.snapGuides = res.guides;
		return {
			dx: res.rect.x - aabb.x,
			dy: res.rect.y - aabb.y
		};
	}
	snapResize(next, handle, excludeIds) {
		if (handle === "rotate" || Math.abs(next.rotation) > 1e-6) return next;
		const doc = this.ctx.document();
		const thr = this.tol();
		const res = applySnap(handle, unionBounds([next]), this.snapContext(excludeIds).targets, {
			thrX: thr,
			thrY: thr,
			minWH: 1,
			boundsW: doc.width,
			boundsH: doc.height,
			clamp: false
		});
		this.snapGuides = res.guides;
		return {
			...next,
			x: res.rect.x,
			y: res.rect.y,
			w: res.rect.w,
			h: res.rect.h
		};
	}
	eligibleTargets() {
		const root = this.ctx.document().root;
		return filterTopmost(root, this.ctx.selectedNodeIds()).map((id) => findNode(root, id)?.node ?? null).filter((n) => canTransformNode(n));
	}
	sessionNodes() {
		if (!this.session) return [];
		const root = this.ctx.document().root;
		return this.session.ids.map((id) => findNode(root, id)?.node ?? null).filter((n) => !!n);
	}
	ensureSession() {
		const targets = this.eligibleTargets();
		if (!targets.length) {
			if (this.session) this.apply();
			return null;
		}
		const ids = targets.map((n) => n.id);
		if (this.session && !sameIds(this.session.ids, ids)) this.apply();
		if (!this.session) {
			const before = /* @__PURE__ */ new Map();
			for (const n of targets) before.set(n.id, { ...n.transform });
			this.session = {
				ids,
				before,
				gizmo: computeGizmo(targets)
			};
		}
		return targets;
	}
	onActivate() {
		this.ensureSession();
	}
	onDeactivate() {
		if (this.isDirty()) this.apply();
		else this.session = null;
	}
	onButtonPress(_e, pt) {
		const targets = this.ensureSession();
		const s = this.session;
		if (!targets || !s) return;
		const bases = /* @__PURE__ */ new Map();
		for (const n of this.sessionNodes()) bases.set(n.id, { ...n.transform });
		const gizmoBase = { ...s.gizmo };
		const h = hitHandle(s.gizmo, pt, this.tol());
		if (h === "rotate") {
			this.drag = {
				mode: "rotate",
				gizmoBase,
				grab: angleTo(s.gizmo, pt),
				bases
			};
			return;
		}
		if (h) {
			this.drag = {
				mode: "resize",
				handle: h,
				gizmoBase,
				bases
			};
			return;
		}
		if (insideBox(s.gizmo, pt)) {
			this.drag = {
				mode: "move",
				start: pt,
				gizmoBase,
				bases
			};
			return;
		}
		this.apply();
	}
	setTransform(id, t) {
		const node = findNode(this.ctx.document().root, id)?.node;
		if (node) node.transform = t;
	}
	onMotion(e, pt) {
		const s = this.session;
		const d = this.drag;
		if (!s || d.mode === "idle") return;
		const single = d.bases.size === 1;
		this.snapGuides = [];
		if (d.mode === "move") {
			let dx = pt.x - d.start.x;
			let dy = pt.y - d.start.y;
			if (!e.altKey) {
				const adj = this.snapMove(applyMove(d.gizmoBase, dx, dy), new Set(d.bases.keys()));
				dx += adj.dx;
				dy += adj.dy;
			}
			s.gizmo = applyMove(d.gizmoBase, dx, dy);
			for (const [id, base] of d.bases) this.setTransform(id, applyMove(base, dx, dy));
		} else if (d.mode === "resize") {
			if (single) {
				let next = applyResize(d.gizmoBase, d.handle, pt, 1, e.shiftKey);
				if (!e.altKey && !e.shiftKey) next = this.snapResize(next, d.handle, new Set(d.bases.keys()));
				s.gizmo = next;
				for (const [id] of d.bases) this.setTransform(id, next);
			} else {
				const frame = d.gizmoBase.rotation;
				if (!e.shiftKey && [...d.bases.values()].every((b) => alignedTo(b.rotation, frame))) {
					const { gizmo, anchor, sx, sy } = groupScale(d.gizmoBase, d.handle, pt, 1);
					s.gizmo = gizmo;
					for (const [id, base] of d.bases) this.setTransform(id, scaleAroundFrame(base, anchor, frame, sx, sy));
				} else {
					const { gizmo, anchor, scale } = groupResize(d.gizmoBase, d.handle, pt, 1);
					s.gizmo = gizmo;
					for (const [id, base] of d.bases) this.setTransform(id, scaleAround(base, anchor, scale));
				}
			}
		} else {
			const next = applyRotate(d.gizmoBase, d.gizmoBase.rotation, d.grab, pt, e.shiftKey ? Math.PI / 12 : 0);
			const theta = next.rotation - d.gizmoBase.rotation;
			const pivot = center(d.gizmoBase);
			s.gizmo = next;
			for (const [id, base] of d.bases) this.setTransform(id, rotateAround(base, pivot, theta));
		}
		this.ctx.requestRender();
	}
	onButtonRelease() {
		this.drag = { mode: "idle" };
		this.snapGuides = [];
		this.ctx.requestRender();
	}
	onHover() {
		this.ensureSession();
	}
	cursorFor(pt) {
		const gizmo = this.currentGizmo();
		if (!gizmo) return "default";
		if (hitHandle(gizmo, pt, this.tol())) return "pointer";
		if (insideBox(gizmo, pt)) return "move";
		return "default";
	}
	currentGizmo() {
		if (this.session) return this.session.gizmo;
		const targets = this.eligibleTargets();
		return targets.length ? computeGizmo(targets) : null;
	}
	drawOverlay(overlay) {
		const targets = this.session ? this.sessionNodes() : this.eligibleTargets();
		if (!targets.length) return;
		const gizmo = this.session?.gizmo ?? computeGizmo(targets);
		if (targets.length > 1) for (const n of targets) {
			const b = n.transform;
			if (b.w > 0 && b.h > 0) addTransformBox(overlay, b, false);
		}
		addTransformBox(overlay, gizmo, true);
		const doc = this.ctx.document();
		const tick = 4 / Math.max(.001, this.ctx.zoom());
		for (const g of this.snapGuides) {
			if (g.kind === "gap" && g.spans && g.cross != null) {
				for (const [a, b] of g.spans) if (g.axis === "x") {
					overlay.add({
						type: "line",
						a: {
							x: a,
							y: g.cross
						},
						b: {
							x: b,
							y: g.cross
						}
					});
					overlay.add({
						type: "line",
						a: {
							x: a,
							y: g.cross - tick
						},
						b: {
							x: a,
							y: g.cross + tick
						}
					});
					overlay.add({
						type: "line",
						a: {
							x: b,
							y: g.cross - tick
						},
						b: {
							x: b,
							y: g.cross + tick
						}
					});
				} else {
					overlay.add({
						type: "line",
						a: {
							x: g.cross,
							y: a
						},
						b: {
							x: g.cross,
							y: b
						}
					});
					overlay.add({
						type: "line",
						a: {
							x: g.cross - tick,
							y: a
						},
						b: {
							x: g.cross + tick,
							y: a
						}
					});
					overlay.add({
						type: "line",
						a: {
							x: g.cross - tick,
							y: b
						},
						b: {
							x: g.cross + tick,
							y: b
						}
					});
				}
				continue;
			}
			if (g.axis === "x") overlay.add({
				type: "line",
				a: {
					x: g.pos,
					y: 0
				},
				b: {
					x: g.pos,
					y: doc.height
				}
			});
			else overlay.add({
				type: "line",
				a: {
					x: 0,
					y: g.pos
				},
				b: {
					x: doc.width,
					y: g.pos
				}
			});
		}
	}
	isDirty() {
		const s = this.session;
		if (!s) return false;
		for (const [id, before] of s.before) {
			const node = findNode(this.ctx.document().root, id)?.node;
			if (node && !sameTransform$1(before, node.transform)) return true;
		}
		return false;
	}
	buildCommands(s) {
		const cmds = [];
		for (const [id, before] of s.before) {
			const node = findNode(this.ctx.document().root, id)?.node;
			if (!node || sameTransform$1(before, node.transform)) continue;
			cmds.push(new SetTransformCommand("transform", node, before, { ...node.transform }));
			const extra = getNodeKind(node.kind).onTransformCommitted?.(node, before, { content: this.ctx.content }) ?? null;
			if (extra) cmds.push(extra);
		}
		return cmds;
	}
	apply() {
		const s = this.session;
		this.session = null;
		this.drag = { mode: "idle" };
		this.snapGuides = [];
		if (!s) return false;
		const cmds = this.buildCommands(s);
		if (!cmds.length) return false;
		if (cmds.length === 1) this.ctx.history.push(cmds[0]);
		else {
			const group = new CommandGroup("transform");
			group.children.push(...cmds);
			this.ctx.history.push(group);
		}
		this.ctx.requestRender();
		return true;
	}
	cancel() {
		const s = this.session;
		this.session = null;
		this.drag = { mode: "idle" };
		this.snapGuides = [];
		if (!s) return false;
		let changed = false;
		for (const [id, before] of s.before) {
			const node = findNode(this.ctx.document().root, id)?.node;
			if (node && !sameTransform$1(before, node.transform)) {
				node.transform = { ...before };
				changed = true;
			}
		}
		if (changed) this.ctx.requestRender();
		return changed;
	}
};
function isTransformTool(tool) {
	return !!tool && tool.id === "transform";
}
function makeTransformToolDef() {
	return {
		id: "transform",
		create: (ctx) => new TransformTool("transform", ctx)
	};
}
//#endregion
//#region src/renderer/extensions/layerEditor/engine/commands/selection.ts
function snapshotSelection(doc) {
	const channel = doc.channels.find((ch) => ch.role === "selection") ?? null;
	return {
		channel: channel ? {
			...channel,
			bounds: channel.bounds ? { ...channel.bounds } : void 0
		} : null,
		selectionId: channel ? channel.id : void 0
	};
}
function applySelectionSnapshot(doc, s) {
	doc.channels = doc.channels.filter((ch) => ch.role !== "selection");
	if (s.channel) doc.channels.push({ ...s.channel });
	doc.selectionId = s.channel ? s.selectionId : void 0;
}
var SetSelectionCommand = class {
	label;
	doc;
	before;
	after;
	store;
	dirtyMask = Dirty.SELECTION;
	constructor(label, doc, before, after, store) {
		this.label = label;
		this.doc = doc;
		this.before = before;
		this.after = after;
		this.store = store;
	}
	apply(dir) {
		applySelectionSnapshot(this.doc, dir === "undo" ? this.before : this.after);
	}
	sizeBytes() {
		let n = 0;
		for (const s of [this.before, this.after]) {
			const e = s.channel ? this.store.get(s.channel.contentId) : null;
			if (e) n += e.width * e.height * 4;
		}
		return n;
	}
	contentRefs() {
		const refs = [];
		if (this.before.channel) refs.push(this.before.channel.contentId);
		if (this.after.channel) refs.push(this.after.channel.contentId);
		return refs;
	}
};
//#endregion
//#region src/renderer/extensions/layerEditor/engine/editor/selectionOps.ts
function fullSelectionCanvas(docW, docH) {
	const c = document.createElement("canvas");
	c.width = docW;
	c.height = docH;
	const g = c.getContext("2d");
	if (!g) return null;
	g.fillStyle = "#ffffff";
	g.fillRect(0, 0, docW, docH);
	return c;
}
//#endregion
//#region src/renderer/extensions/layerEditor/engine/editor/selectionMath.ts
function emptyMask(width, height) {
	return {
		data: new Float32Array(width * height),
		width,
		height
	};
}
function maskFromCanvas(canvas) {
	const g = canvas.getContext("2d");
	if (!g) return null;
	const img = g.getImageData(0, 0, canvas.width, canvas.height);
	const mask = emptyMask(canvas.width, canvas.height);
	for (let p = 0; p < mask.data.length; p++) mask.data[p] = img.data[p * 4] / 255;
	return mask;
}
function maskToCanvas(mask) {
	const c = document.createElement("canvas");
	c.width = mask.width;
	c.height = mask.height;
	const g = c.getContext("2d");
	if (!g) return null;
	const img = g.createImageData(mask.width, mask.height);
	for (let p = 0; p < mask.data.length; p++) {
		const v = Math.round(Math.max(0, Math.min(1, mask.data[p])) * 255);
		img.data[p * 4] = img.data[p * 4 + 1] = img.data[p * 4 + 2] = v;
		img.data[p * 4 + 3] = 255;
	}
	g.putImageData(img, 0, 0);
	return c;
}
function combineMasks(base, addOn, op) {
	const out = emptyMask(base.width, base.height);
	const a = base.data;
	const b = addOn.data;
	const d = out.data;
	switch (op) {
		case "replace":
			d.set(b);
			break;
		case "add":
			for (let p = 0; p < d.length; p++) d[p] = Math.min(a[p] + b[p], 1);
			break;
		case "subtract":
			for (let p = 0; p < d.length; p++) d[p] = Math.max(a[p] - b[p], 0);
			break;
		case "intersect": for (let p = 0; p < d.length; p++) d[p] = Math.min(a[p], b[p]);
	}
	return out;
}
function maskBounds(mask) {
	let minX = mask.width;
	let minY = mask.height;
	let maxX = -1;
	let maxY = -1;
	for (let y = 0; y < mask.height; y++) {
		const row = y * mask.width;
		for (let x = 0; x < mask.width; x++) if (mask.data[row + x] > 0) {
			if (x < minX) minX = x;
			if (x > maxX) maxX = x;
			if (y < minY) minY = y;
			if (y > maxY) maxY = y;
		}
	}
	if (maxX < 0) return null;
	return {
		x: minX,
		y: minY,
		w: maxX - minX + 1,
		h: maxY - minY + 1
	};
}
function maskBoundary(mask, threshold = .5) {
	const w = mask.width;
	const h = mask.height;
	const inside = (x, y) => x >= 0 && y >= 0 && x < w && y < h && mask.data[y * w + x] >= threshold;
	const edges = /* @__PURE__ */ new Map();
	const key = (x, y) => y * (w + 1) + x;
	const addEdge = (sx, sy, ex, ey) => {
		const k = key(sx, sy);
		const list = edges.get(k);
		if (list) list.push({
			ex,
			ey
		});
		else edges.set(k, [{
			ex,
			ey
		}]);
	};
	for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
		if (!inside(x, y)) continue;
		if (!inside(x, y - 1)) addEdge(x, y, x + 1, y);
		if (!inside(x, y + 1)) addEdge(x + 1, y + 1, x, y + 1);
		if (!inside(x - 1, y)) addEdge(x, y + 1, x, y);
		if (!inside(x + 1, y)) addEdge(x + 1, y, x + 1, y + 1);
	}
	const loops = [];
	while (edges.size) {
		const firstKey = edges.keys().next().value;
		const first = edges.get(firstKey);
		const start = {
			x: firstKey % (w + 1),
			y: Math.floor(firstKey / (w + 1))
		};
		let cur = first.shift();
		if (!first.length) edges.delete(firstKey);
		const pts = [start, {
			x: cur.ex,
			y: cur.ey
		}];
		while (cur.ex !== start.x || cur.ey !== start.y) {
			const k = key(cur.ex, cur.ey);
			const list = edges.get(k);
			if (!list || !list.length) break;
			cur = list.shift();
			if (!list.length) edges.delete(k);
			pts.push({
				x: cur.ex,
				y: cur.ey
			});
		}
		const last = pts[pts.length - 1];
		if (pts.length > 1 && last.x === pts[0].x && last.y === pts[0].y) pts.pop();
		if (pts.length > 2) {
			const compact = [];
			for (let i = 0; i < pts.length; i++) {
				const prev = pts[(i - 1 + pts.length) % pts.length];
				const next = pts[(i + 1) % pts.length];
				const p = pts[i];
				if (!(prev.x === p.x && p.x === next.x || prev.y === p.y && p.y === next.y)) compact.push(p);
			}
			if (compact.length >= 3) loops.push(compact);
		}
	}
	return loops;
}
//#endregion
//#region src/renderer/extensions/layerEditor/engine/editor/overlayList.ts
var OverlayList = class {
	onRedraw;
	items = [];
	paused = 0;
	constructor(onRedraw = () => {}) {
		this.onRedraw = onRedraw;
	}
	clear() {
		this.items = [];
	}
	add(item) {
		this.items.push(item);
	}
	pause() {
		this.paused += 1;
	}
	resume() {
		if (this.paused > 0) this.paused -= 1;
		if (this.paused === 0) this.onRedraw();
	}
	hitHandle(pt, screenTolerance) {
		let best = null;
		let bestD = screenTolerance;
		for (const item of this.items) {
			if (item.type !== "handle" || !item.id) continue;
			const d = Math.hypot(pt.x - item.pos.x, pt.y - item.pos.y);
			if (d <= bestD) {
				bestD = d;
				best = item.id;
			}
		}
		return best;
	}
};
//#endregion
//#region src/renderer/extensions/layerEditor/engine/editor/editor.ts
function emptyDocument(width, height) {
	return {
		version: 2,
		width,
		height,
		root: {
			kind: "group",
			id: "root",
			name: "root",
			visible: true,
			opacity: 1,
			mode: defaultMode("normal"),
			transform: {
				x: 0,
				y: 0,
				w: width,
				h: height,
				rotation: 0
			},
			locks: {
				content: false,
				position: false,
				visibility: false
			},
			children: [],
			passThrough: false
		},
		channels: []
	};
}
function createEditor(opts) {
	const compositor = opts.compositor;
	const content = opts.content ?? new DefaultContentStore();
	const history = new History();
	const notify = opts.onChange ?? (() => {});
	const overlay = new OverlayList(() => notify());
	const doc = emptyDocument(1024, 1024);
	let toolId = "select";
	let tool = null;
	let selectedIds = [];
	let zoomLevel = 1;
	const snapGridSize = 0;
	const placedCache = /* @__PURE__ */ new Map();
	let presentFull = true;
	let presentRect = null;
	let floating = null;
	let floatSession = { mode: "idle" };
	function floatingInputs() {
		if (!floating) return [];
		const entry = content.get(floating.contentId);
		if (!entry) return [];
		const canvas = placeBitmap(entry.canvas, floating.transform, doc.width, doc.height);
		if (!canvas) return [];
		return [{
			texture: {
				source: canvas,
				rect: {
					x: 0,
					y: 0,
					w: doc.width,
					h: doc.height
				},
				linear: false
			},
			opacity: 1,
			mode: resolveMode(defaultMode("normal"))
		}];
	}
	function render(region) {
		renderDocument(doc, {
			content,
			compositor,
			devicePixelRatio: 1,
			placedCache
		}, floatingInputs(), region);
	}
	function selectionChannel() {
		if (!doc.selectionId) return null;
		return doc.channels.find((ch) => ch.id === doc.selectionId && ch.role === "selection") ?? null;
	}
	let selOutlineCache = null;
	function selectionOutlines(sel) {
		if (selOutlineCache?.key === sel.contentId) return selOutlineCache.outlines;
		const entry = content.get(sel.contentId);
		const mask = entry ? maskFromCanvas(entry.canvas) : null;
		const outlines = mask ? maskBoundary(mask) : [];
		selOutlineCache = {
			key: sel.contentId,
			outlines
		};
		return outlines;
	}
	function buildOverlay() {
		overlay.clear();
		for (const g of doc.guides ?? []) if (g.axis === "x") overlay.add({
			type: "line",
			a: {
				x: g.pos,
				y: 0
			},
			b: {
				x: g.pos,
				y: doc.height
			}
		});
		else overlay.add({
			type: "line",
			a: {
				x: 0,
				y: g.pos
			},
			b: {
				x: doc.width,
				y: g.pos
			}
		});
		const sel = selectionChannel();
		if (sel?.bounds) {
			const outlines = selectionOutlines(sel);
			if (outlines.length) for (const points of outlines) overlay.add({
				type: "polyline",
				points,
				closed: true,
				ants: true
			});
			else overlay.add({
				type: "rect",
				rect: sel.bounds,
				ants: true
			});
		}
		if (floating) {
			addTransformBox(overlay, floating.transform);
			return;
		}
		tool?.drawOverlay(overlay);
	}
	function refresh() {
		presentFull = true;
		presentRect = null;
		render();
		buildOverlay();
		notify();
	}
	function liveSelectedIds() {
		return selectedIds.filter((id) => findNode(doc.root, id));
	}
	function activeNodeIdOf() {
		for (let i = selectedIds.length - 1; i >= 0; i--) if (findNode(doc.root, selectedIds[i])) return selectedIds[i];
		return null;
	}
	function setSelected(ids) {
		const seen = /* @__PURE__ */ new Set();
		const next = [];
		for (const id of ids) {
			if (seen.has(id) || !findNode(doc.root, id)) continue;
			seen.add(id);
			next.push(id);
		}
		if (next.length === selectedIds.length && next.every((id, i) => id === selectedIds[i])) return;
		selectedIds = next;
		buildOverlay();
		notify();
	}
	function setActive(id) {
		setSelected(id ? [id] : []);
	}
	function collectGarbage() {
		const live = /* @__PURE__ */ new Set();
		for (const id of getNodeKind(doc.root.kind).contentIds(doc.root)) live.add(id);
		for (const ch of doc.channels) live.add(ch.contentId);
		for (const id of history.contentRefs()) live.add(id);
		if (floating) live.add(floating.contentId);
		content.collectGarbage(live);
	}
	history.onChange(collectGarbage);
	const ctx = {
		document: () => doc,
		history,
		compositor,
		content,
		overlay,
		activeNodeId: activeNodeIdOf,
		setActiveNode: setActive,
		selectedNodeIds: liveSelectedIds,
		setSelectedNodes: setSelected,
		selection: {
			combineShape: (label, mask, op) => {
				combineSelectionMask(label, mask, op);
			},
			currentMask: currentSelectionMask,
			none: () => {
				commitSelection("Select None", null, null);
			}
		},
		floatSelection: () => false,
		compositePixels: () => {
			render();
			const img = compositor.readback();
			if (img.width !== doc.width || img.height !== doc.height) return null;
			return img;
		},
		zoom: () => zoomLevel,
		snapGrid: () => snapGridSize,
		requestRender: refresh
	};
	function makeTool() {
		tool?.onDeactivate?.();
		tool = getTool(toolId).create(ctx);
		tool.onActivate?.();
	}
	makeTool();
	function activeLocation() {
		const id = activeNodeIdOf();
		if (!id) return null;
		return findNode(doc.root, id);
	}
	function activeRaster() {
		const loc = activeLocation();
		return loc && loc.node.kind === "raster" ? loc.node : null;
	}
	function currentSelectionMask() {
		const sel = selectionChannel();
		if (!sel) return null;
		const entry = content.get(sel.contentId);
		if (!entry) return null;
		return maskFromCanvas(entry.canvas);
	}
	function combineSelectionMask(label, shapeMask, op) {
		let result = shapeMask;
		if (op !== "replace") result = combineMasks(currentSelectionMask() ?? emptyMask(doc.width, doc.height), shapeMask, op);
		const bounds = maskBounds(result);
		if (!bounds) return commitSelection(label, null, null);
		const canvas = maskToCanvas(result);
		if (!canvas) return false;
		return commitSelection(label, canvas, bounds);
	}
	function commitSelection(label, canvas, bounds) {
		const before = snapshotSelection(doc);
		doc.channels = doc.channels.filter((ch) => ch.role !== "selection");
		if (canvas && bounds) {
			const channel = {
				id: generateId("sel"),
				role: "selection",
				contentId: content.register(canvas),
				enabled: true,
				bounds
			};
			doc.channels.push(channel);
			doc.selectionId = channel.id;
		} else {
			doc.selectionId = void 0;
			if (!before.channel) return false;
		}
		history.push(new SetSelectionCommand(label, doc, before, snapshotSelection(doc), content));
		refresh();
		return true;
	}
	function addNodeInternal(node, index, parent) {
		const into = parent ?? doc.root;
		const at = index ?? into.children.length;
		into.children.splice(at, 0, node);
		history.push(new AddNodeCommand(`Add ${node.name}`, into, node, at));
		selectedIds = [node.id];
		refresh();
	}
	function anchorInto(node, item, floatCanvas) {
		const targetEntry = content.get(node.contentId);
		if (!targetEntry) return false;
		const fb = placedBounds(item.transform);
		const tb = placedBounds(node.transform);
		const ux = Math.min(tb.x, fb.x);
		const uy = Math.min(tb.y, fb.y);
		const uw = Math.max(tb.x + tb.w, fb.x + fb.w) - ux;
		const uh = Math.max(tb.y + tb.h, fb.y + fb.h) - uy;
		if (uw > 16384 || uh > 16384) return false;
		const oldTransform = { ...node.transform };
		const canvas = document.createElement("canvas");
		canvas.width = uw;
		canvas.height = uh;
		const ctx = canvas.getContext("2d");
		if (!ctx) return false;
		ctx.imageSmoothingEnabled = true;
		ctx.imageSmoothingQuality = "high";
		drawPlacedInto(ctx, targetEntry.canvas, node.transform, ux, uy);
		drawPlacedInto(ctx, floatCanvas, item.transform, ux, uy);
		const before = snapshotRaster(node);
		node.contentId = content.register(canvas);
		node.url = void 0;
		node.naturalWidth = uw;
		node.naturalHeight = uh;
		node.transform = {
			x: ux,
			y: uy,
			w: uw,
			h: uh,
			rotation: 0
		};
		if (node.mask) {
			const maskEntry = content.get(node.mask.contentId);
			const bakedMask = maskEntry ? bakeMaskInto(maskEntry.canvas, oldTransform, {
				x: ux,
				y: uy,
				w: uw,
				h: uh
			}, "white") : null;
			if (bakedMask) node.mask = {
				...node.mask,
				contentId: content.register(bakedMask),
				url: void 0
			};
		}
		history.push(new BakeRasterCommand("Anchor", node, before, snapshotRaster(node), content));
		return true;
	}
	function anchorAsNewLayer(item, entry) {
		const kind = getNodeKind("raster");
		if (isIdentityPlacement(item.transform, entry.width, entry.height)) {
			addNodeInternal(kind.create({
				name: item.name ?? "Layer",
				contentId: item.contentId,
				url: entry.uploadedUrl ?? void 0,
				naturalWidth: entry.width,
				naturalHeight: entry.height,
				transform: { ...item.transform }
			}));
			return;
		}
		const baked = bakePlaced(entry.canvas, item.transform);
		if (!baked) {
			addNodeInternal(kind.create({
				name: item.name ?? "Layer",
				contentId: item.contentId,
				url: entry.uploadedUrl ?? void 0,
				naturalWidth: entry.width,
				naturalHeight: entry.height,
				transform: { ...item.transform }
			}));
			return;
		}
		const cid = content.register(baked.canvas);
		addNodeInternal(kind.create({
			name: item.name ?? "Layer",
			contentId: cid,
			naturalWidth: baked.bounds.w,
			naturalHeight: baked.bounds.h,
			transform: {
				x: baked.bounds.x,
				y: baked.bounds.y,
				w: baked.bounds.w,
				h: baked.bounds.h,
				rotation: 0
			}
		}));
	}
	function anchorFloatingImpl(target) {
		if (!floating) return;
		const item = floating;
		const entry = content.get(item.contentId);
		if (!entry) {
			floating = null;
			floatSession = { mode: "idle" };
			refresh();
			return;
		}
		if ((target ?? (activeRaster() ? "active" : "new")) === "active") {
			const node = activeRaster();
			if (node && !node.locks.content && anchorInto(node, item, entry.canvas)) {
				floating = null;
				floatSession = { mode: "idle" };
				refresh();
				return;
			}
		}
		floating = null;
		floatSession = { mode: "idle" };
		anchorAsNewLayer(item, entry);
	}
	function floatingPress(pt) {
		if (!floating) return;
		const t = floating.transform;
		const h = hitHandle(t, pt, 8 / Math.max(.001, zoomLevel));
		if (h === "rotate") {
			floatSession = {
				mode: "rotate",
				before: { ...t },
				grab: angleTo(t, pt)
			};
			return;
		}
		if (h) {
			floatSession = {
				mode: "resize",
				handle: h,
				before: { ...t }
			};
			return;
		}
		if (insideBox(t, pt)) {
			floatSession = {
				mode: "move",
				start: pt,
				before: { ...t }
			};
			return;
		}
		anchorFloatingImpl();
	}
	function floatingMotion(e, pt) {
		if (!floating || floatSession.mode === "idle") return;
		const s = floatSession;
		if (s.mode === "move") floating.transform = applyMove(s.before, pt.x - s.start.x, pt.y - s.start.y);
		else if (s.mode === "resize") floating.transform = applyResize(s.before, s.handle, pt, 1, e.shiftKey);
		else floating.transform = applyRotate(s.before, s.before.rotation, s.grab, pt, e.shiftKey ? Math.PI / 12 : 0);
		refresh();
	}
	return {
		history,
		content,
		overlay,
		document: () => doc,
		setTool(id) {
			toolId = id;
			makeTool();
			buildOverlay();
			notify();
		},
		activeToolId: () => toolId,
		transformApply: () => isTransformTool(tool) ? tool.apply() : false,
		activeNodeId: activeNodeIdOf,
		setActiveNode: setActive,
		selectedNodeIds: liveSelectedIds,
		setSelectedNodes: setSelected,
		pointerDown(e, pt) {
			if (floating) {
				floatingPress(pt);
				return;
			}
			tool?.onButtonPress(e, pt);
		},
		pointerMove(e, pt) {
			if (floating) {
				floatingMotion(e, pt);
				return;
			}
			tool?.onMotion(e, pt);
		},
		pointerUp(e, pt) {
			if (floating) {
				floatSession = { mode: "idle" };
				return;
			}
			tool?.onButtonRelease(e, pt);
		},
		cursorAt(pt) {
			if (floating) return "default";
			return tool?.cursorFor(pt) ?? "default";
		},
		addNode(node, index, parentId) {
			const found = parentId && parentId !== doc.root.id ? findNode(doc.root, parentId)?.node : void 0;
			addNodeInternal(node, index, found?.kind === "group" ? found : void 0);
		},
		moveNode(id, dir) {
			const loc = findNode(doc.root, id);
			if (!loc) return false;
			const { parent, node, index } = loc;
			const siblingIndex = index + dir;
			const sib = siblingIndex < 0 ? void 0 : parent.children.at(siblingIndex);
			let toParent;
			let toIndex;
			if (sib && sib.kind === "group") {
				toParent = sib;
				toIndex = dir === 1 ? 0 : toParent.children.length;
			} else if (sib) {
				toParent = parent;
				toIndex = index + dir;
			} else if (parent !== doc.root) {
				const ploc = findNode(doc.root, parent.id);
				if (!ploc) return false;
				toParent = ploc.parent;
				toIndex = dir === 1 ? ploc.index + 1 : ploc.index;
			} else return false;
			parent.children.splice(index, 1);
			const to = Math.max(0, Math.min(toIndex, toParent.children.length));
			toParent.children.splice(to, 0, node);
			history.push(new ReorderCommand("Reorder", node, parent, index, toParent, to));
			refresh();
			return true;
		},
		moveNodeTo(id, parentId, toIndex) {
			const loc = findNode(doc.root, id);
			if (!loc) return false;
			const target = parentId && parentId !== doc.root.id ? findNode(doc.root, parentId)?.node : doc.root;
			if (!target || target.kind !== "group") return false;
			const toParent = target;
			if (loc.node.kind === "group") {
				if (toParent.id === loc.node.id) return false;
				if (findNode(loc.node, toParent.id)) return false;
			}
			let to = Math.max(0, Math.min(toIndex, toParent.children.length));
			loc.parent.children.splice(loc.index, 1);
			if (toParent === loc.parent && loc.index < to) to -= 1;
			to = Math.max(0, Math.min(to, toParent.children.length));
			if (toParent === loc.parent && to === loc.index) {
				loc.parent.children.splice(loc.index, 0, loc.node);
				return false;
			}
			toParent.children.splice(to, 0, loc.node);
			history.push(new ReorderCommand("Reorder", loc.node, loc.parent, loc.index, toParent, to));
			refresh();
			return true;
		},
		setZoom(z) {
			zoomLevel = z;
		},
		guides: () => (doc.guides ?? []).map((g) => ({ ...g })),
		render,
		takePresentDamage() {
			const dmg = {
				full: presentFull,
				rect: presentRect
			};
			presentFull = false;
			presentRect = null;
			return dmg;
		},
		buildOverlay,
		invalidate: refresh,
		undo() {
			history.undo();
			refresh();
		},
		redo() {
			history.redo();
			refresh();
		},
		selectionBounds() {
			return selectionChannel()?.bounds ?? null;
		},
		selectAll() {
			const rect = {
				x: 0,
				y: 0,
				w: doc.width,
				h: doc.height
			};
			return commitSelection("Select All", fullSelectionCanvas(doc.width, doc.height), rect);
		},
		selectNone() {
			return commitSelection("Select None", null, null);
		},
		floating: () => floating,
		startFloating(contentId, width, height, name) {
			if (floating) anchorFloatingImpl();
			const sel = selectionChannel();
			const target = sel?.bounds ?? {
				x: 0,
				y: 0,
				w: doc.width,
				h: doc.height
			};
			if (sel) commitSelection("Select None", null, null);
			const x = Math.round(target.x + (target.w - width) / 2);
			const y = Math.round(target.y + (target.h - height) / 2);
			floating = {
				contentId,
				name,
				transform: {
					x: width <= doc.width ? Math.max(0, Math.min(x, doc.width - width)) : x,
					y: height <= doc.height ? Math.max(0, Math.min(y, doc.height - height)) : y,
					w: width,
					h: height,
					rotation: 0
				}
			};
			floatSession = { mode: "idle" };
			refresh();
		},
		anchorFloating(target) {
			anchorFloatingImpl(target);
		},
		cancelFloating() {
			if (!floating) return;
			floating = null;
			floatSession = { mode: "idle" };
			collectGarbage();
			refresh();
		}
	};
}
function defaultAlphaSampler(canvas, x, y) {
	let ctx;
	try {
		ctx = canvas.getContext("2d", { willReadFrequently: true });
	} catch {
		ctx = null;
	}
	if (!ctx) return 1;
	try {
		const px = Math.max(0, Math.min(canvas.width - 1, Math.floor(x)));
		const py = Math.max(0, Math.min(canvas.height - 1, Math.floor(y)));
		return (ctx.getImageData(px, py, 1, 1).data.at(3) ?? 255) / 255;
	} catch {
		return 1;
	}
}
function rasterAlphaAt(node, pt, content, sample) {
	const t = node.transform;
	if (t.w <= 0 || t.h <= 0) return 0;
	const local = toLocalFrame(t, pt);
	if (Math.abs(local.x) > t.w / 2 || Math.abs(local.y) > t.h / 2) return 0;
	const canvas = content.get(node.contentId)?.canvas;
	if (!canvas || canvas.width <= 0 || canvas.height <= 0) return 1;
	return sample(canvas, (local.x + t.w / 2) / t.w * canvas.width, (local.y + t.h / 2) / t.h * canvas.height);
}
function boxAlphaAt(node, pt) {
	const t = node.transform;
	if (t.w <= 0 || t.h <= 0) return 0;
	const local = toLocalFrame(t, pt);
	return Math.abs(local.x) <= t.w / 2 && Math.abs(local.y) <= t.h / 2 ? 1 : 0;
}
function layerOpacityAt(node, pt, content, sample = defaultAlphaSampler) {
	if (!node.visible || node.opacity <= 0) return 0;
	switch (node.kind) {
		case "group": {
			let best = 0;
			for (const child of node.children) {
				best = Math.max(best, layerOpacityAt(child, pt, content, sample));
				if (best >= 1) break;
			}
			return best * node.opacity;
		}
		case "raster": return rasterAlphaAt(node, pt, content, sample);
		default: return boxAlphaAt(node, pt);
	}
}
function pickLayerAt(layers, pt, content, sample = defaultAlphaSampler) {
	for (let i = layers.length - 1; i >= 0; i--) {
		const node = layers[i];
		if (layerOpacityAt(node, pt, content, sample) > .25) return node;
	}
	return null;
}
//#endregion
//#region src/renderer/extensions/layerEditor/engine/fill.ts
var clamp01 = (v) => Math.max(0, Math.min(1, v));
var num = (v, d) => typeof v === "number" && isFinite(v) ? v : d;
function defaultFillSpec() {
	return {
		type: "solid",
		color: "#808080"
	};
}
function defaultGradientStops() {
	return [{
		offset: 0,
		color: "#000000"
	}, {
		offset: 1,
		color: "#ffffff"
	}];
}
function normalizeStops(raw) {
	const arr = Array.isArray(raw) ? raw : [];
	const stops = [];
	for (const s of arr) {
		const r = s ?? {};
		if (typeof r.color !== "string") continue;
		stops.push({
			offset: clamp01(num(r.offset, 0)),
			color: r.color,
			alpha: r.alpha === void 0 ? void 0 : clamp01(num(r.alpha, 1))
		});
	}
	stops.sort((a, b) => a.offset - b.offset);
	return stops.length >= 2 ? stops : defaultGradientStops();
}
function normalizeFillSpec(raw) {
	const r = raw ?? {};
	if (r.type === "linear") return {
		type: "linear",
		angle: num(r.angle, 0) % 360,
		stops: normalizeStops(r.stops)
	};
	if (r.type === "radial") return {
		type: "radial",
		cx: clamp01(num(r.cx, .5)),
		cy: clamp01(num(r.cy, .5)),
		radius: Math.max(.01, Math.min(4, num(r.radius, 1))),
		stops: normalizeStops(r.stops)
	};
	return {
		type: "solid",
		color: typeof r.color === "string" ? r.color : "#808080"
	};
}
function fillSpecStamp(spec) {
	return JSON.stringify(spec);
}
function linearEndpoints(angle, w, h) {
	const a = angle * Math.PI / 180;
	const dx = Math.cos(a);
	const dy = Math.sin(a);
	const half = (Math.abs(w * dx) + Math.abs(h * dy)) / 2;
	const cx = w / 2;
	const cy = h / 2;
	return {
		from: {
			x: cx - dx * half,
			y: cy - dy * half
		},
		to: {
			x: cx + dx * half,
			y: cy + dy * half
		}
	};
}
function stopColor(stop) {
	if (stop.alpha === void 0 || stop.alpha >= 1) return stop.color;
	const hex = stop.color.replace("#", "");
	const full = hex.length === 3 ? hex.split("").map((c) => c + c).join("") : hex;
	return `rgba(${parseInt(full.slice(0, 2), 16)},${parseInt(full.slice(2, 4), 16)},${parseInt(full.slice(4, 6), 16)},${stop.alpha})`;
}
function paintFillInto(g, spec, w, h) {
	if (spec.type === "solid") {
		g.fillStyle = spec.color;
		g.fillRect(0, 0, w, h);
		return;
	}
	let gradient;
	if (spec.type === "linear") {
		const { from, to } = linearEndpoints(spec.angle, w, h);
		gradient = g.createLinearGradient(from.x, from.y, to.x, to.y);
	} else {
		const cx = spec.cx * w;
		const cy = spec.cy * h;
		const r = Math.max(.001, spec.radius * (Math.hypot(w, h) / 2));
		gradient = g.createRadialGradient(cx, cy, 0, cx, cy, r);
	}
	for (const stop of spec.stops) gradient.addColorStop(stop.offset, stopColor(stop));
	g.fillStyle = gradient;
	g.fillRect(0, 0, w, h);
}
function renderFillBitmap(spec, w, h) {
	const canvas = document.createElement("canvas");
	canvas.width = Math.max(1, w);
	canvas.height = Math.max(1, h);
	const g = canvas.getContext("2d");
	if (!g) return null;
	paintFillInto(g, spec, canvas.width, canvas.height);
	return canvas;
}
//#endregion
//#region src/renderer/extensions/layerEditor/engine/kinds/fill.ts
var bitmapCache = /* @__PURE__ */ new Map();
function fillBitmap(node, w, h) {
	const stamp = `${fillSpecStamp(node.fill)}|${w}x${h}`;
	const hit = bitmapCache.get(node.id);
	if (hit && hit.stamp === stamp) return hit.canvas;
	if (bitmapCache.size > 64) {
		const first = bitmapCache.keys().next().value;
		if (first !== void 0) bitmapCache.delete(first);
	}
	const canvas = renderFillBitmap(node.fill, w, h);
	bitmapCache.set(node.id, {
		stamp,
		canvas
	});
	return canvas;
}
var fillKind = {
	kind: "fill",
	create(init = {}) {
		return {
			kind: "fill",
			id: init.id ?? generateId("fill"),
			name: init.name ?? "Fill",
			visible: init.visible ?? true,
			opacity: init.opacity ?? 1,
			mode: init.mode ?? defaultMode("normal"),
			transform: {
				x: 0,
				y: 0,
				w: 0,
				h: 0,
				rotation: 0
			},
			locks: init.locks ?? {
				content: false,
				position: false,
				visibility: false
			},
			fill: init.fill ? normalizeFillSpec(init.fill) : defaultFillSpec(),
			mask: init.mask
		};
	},
	contentIds(node) {
		return node.mask ? [node.mask.contentId].filter(Boolean) : [];
	},
	renderNode(node, ctx) {
		const bitmap = fillBitmap(node, ctx.region.w, ctx.region.h);
		if (!bitmap) return null;
		return ctx.placed(`content:${node.id}`, fillSpecStamp(node.fill), bitmap, {
			x: 0,
			y: 0,
			w: ctx.region.w,
			h: ctx.region.h,
			rotation: 0
		});
	},
	bbox() {
		return {
			x: 0,
			y: 0,
			w: 0,
			h: 0
		};
	},
	hitTest() {
		return false;
	}
};
//#endregion
//#region src/renderer/extensions/layerEditor/engine/kinds/group.ts
function fullTransform() {
	return {
		x: 0,
		y: 0,
		w: 0,
		h: 0,
		rotation: 0
	};
}
var groupKind = {
	kind: "group",
	create(init = {}) {
		return {
			kind: "group",
			id: init.id ?? generateId("group"),
			name: init.name ?? "Group",
			visible: init.visible ?? true,
			opacity: init.opacity ?? 1,
			mode: init.mode ?? defaultMode("normal"),
			transform: init.transform ?? fullTransform(),
			locks: init.locks ?? {
				content: false,
				position: false,
				visibility: false
			},
			children: init.children ?? [],
			passThrough: init.passThrough ?? false,
			mask: init.mask
		};
	},
	contentIds(node) {
		const ids = [];
		if (node.mask) ids.push(node.mask.contentId);
		for (const c of node.children) ids.push(...getNodeKind(c.kind).contentIds(c));
		return ids.filter(Boolean);
	},
	renderNode() {
		return null;
	},
	bbox(node) {
		if (node.children.length === 0) return {
			x: 0,
			y: 0,
			w: 0,
			h: 0
		};
		let minX = Infinity;
		let minY = Infinity;
		let maxX = -Infinity;
		let maxY = -Infinity;
		for (const c of node.children) {
			const b = getNodeKind(c.kind).bbox(c);
			minX = Math.min(minX, b.x);
			minY = Math.min(minY, b.y);
			maxX = Math.max(maxX, b.x + b.w);
			maxY = Math.max(maxY, b.y + b.h);
		}
		return {
			x: minX,
			y: minY,
			w: maxX - minX,
			h: maxY - minY
		};
	}
};
//#endregion
//#region src/renderer/extensions/layerEditor/engine/kinds/raster.ts
function defaultTransform(w, h) {
	return {
		x: 0,
		y: 0,
		w,
		h,
		rotation: 0
	};
}
var rasterKind = {
	kind: "raster",
	create(init = {}) {
		const nw = init.naturalWidth ?? 512;
		const nh = init.naturalHeight ?? 512;
		return {
			kind: "raster",
			id: init.id ?? generateId("layer"),
			name: init.name ?? "Layer",
			visible: init.visible ?? true,
			opacity: init.opacity ?? 1,
			mode: init.mode ?? defaultMode("normal"),
			transform: init.transform ?? defaultTransform(nw, nh),
			locks: init.locks ?? {
				content: false,
				position: false,
				visibility: false
			},
			contentId: init.contentId ?? "",
			url: init.url,
			naturalWidth: nw,
			naturalHeight: nh,
			lockAlpha: init.lockAlpha ?? false,
			mask: init.mask
		};
	},
	contentIds(node) {
		const ids = [node.contentId];
		if (node.mask) ids.push(node.mask.contentId);
		return ids.filter(Boolean);
	},
	renderNode(node, ctx) {
		const entry = ctx.content.get(node.contentId);
		if (!entry) return null;
		return ctx.placed(`content:${node.id}`, node.contentId, entry.canvas, node.transform);
	},
	bbox(node) {
		return {
			x: node.transform.x,
			y: node.transform.y,
			w: node.transform.w,
			h: node.transform.h
		};
	},
	hitTest(node, pt) {
		const b = this.bbox(node);
		return pt.x >= b.x && pt.x <= b.x + b.w && pt.y >= b.y && pt.y <= b.y + b.h;
	}
};
//#endregion
//#region src/renderer/extensions/layerEditor/engine/kinds/index.ts
var registered$1 = false;
function registerBuiltinKinds() {
	if (registered$1) return;
	registered$1 = true;
	registerNodeKind(rasterKind);
	registerNodeKind(groupKind);
	registerNodeKind(fillKind);
}
//#endregion
//#region src/renderer/extensions/layerEditor/engine/render/outsideCanvasPreview.ts
var CLIPPED_LAYER_PREVIEW_OPACITY = .4;
function extendsOutsideCanvas(transform, canvas) {
	const bounds = placedBounds(transform);
	return bounds.x < 0 || bounds.y < 0 || bounds.x + bounds.w > canvas.w || bounds.y + bounds.h > canvas.h;
}
function drawOutsideCanvasPreview(ctx, canvas, layers) {
	const clippedLayers = layers.filter((layer) => layer.opacity > 0 && extendsOutsideCanvas(layer.transform, canvas));
	if (!clippedLayers.length) return;
	try {
		for (const layer of clippedLayers) {
			ctx.save();
			try {
				ctx.globalAlpha = CLIPPED_LAYER_PREVIEW_OPACITY * clamp$1(layer.opacity, 0, 1);
				drawPlacedInto(ctx, layer.bitmap, layer.transform, 0, 0);
			} finally {
				ctx.restore();
			}
		}
	} finally {
		ctx.clearRect(0, 0, canvas.w, canvas.h);
	}
}
//#endregion
//#region src/renderer/extensions/layerEditor/engine/tools/selectTool.ts
function nodeBounds(node) {
	if (node.kind !== "group") return node.transform;
	const b = getNodeKind("group").bbox(node);
	return {
		x: b.x,
		y: b.y,
		w: b.w,
		h: b.h,
		rotation: 0
	};
}
function moveLeaves(node) {
	if (node.locks.position) return [];
	if (node.kind !== "group") return [node];
	return node.children.flatMap((c) => moveLeaves(c));
}
var SelectTool = class {
	id;
	ctx;
	control;
	session = { mode: "idle" };
	constructor(id, ctx) {
		this.id = id;
		this.ctx = ctx;
		this.control = {
			...defaultControl(),
			cursor: "default",
			abortMask: Dirty.STRUCTURE
		};
	}
	selectedNodes() {
		const root = this.ctx.document().root;
		return filterTopmost(root, this.ctx.selectedNodeIds()).map((id) => findNode(root, id)?.node).filter((n) => !!n);
	}
	startMove(nodes, pt) {
		const targets = nodes.flatMap((n) => moveLeaves(n)).map((node) => ({
			node,
			before: { ...node.transform }
		}));
		this.session = targets.length ? {
			mode: "move",
			start: pt,
			targets
		} : { mode: "idle" };
	}
	onButtonPress(e, pt) {
		if (e.shiftKey || e.ctrlKey || e.metaKey) {
			const picked = this.pick(pt);
			if (picked) {
				const sel = this.ctx.selectedNodeIds();
				const at = sel.indexOf(picked.id);
				if (at >= 0) sel.splice(at, 1);
				else sel.push(picked.id);
				this.ctx.setSelectedNodes(sel);
			}
			this.session = { mode: "idle" };
			return;
		}
		const selMask = this.ctx.selection.currentMask();
		if (selMask) {
			const mx = Math.floor(pt.x);
			const my = Math.floor(pt.y);
			if (mx >= 0 && my >= 0 && mx < selMask.width && my < selMask.height && selMask.data[my * selMask.width + mx] >= .5 && this.ctx.floatSelection()) {
				this.session = { mode: "idle" };
				return;
			}
		}
		const selected = this.selectedNodes();
		if (selected.some((n) => layerOpacityAt(n, pt, this.ctx.content) > .25)) {
			this.startMove(selected, pt);
			return;
		}
		const picked = this.pick(pt);
		if (picked) {
			this.ctx.setActiveNode(picked.id);
			this.startMove([picked], pt);
		} else {
			this.ctx.setActiveNode(null);
			this.session = { mode: "idle" };
		}
	}
	onMotion(_e, pt) {
		const s = this.session;
		if (s.mode !== "move") return;
		for (const t of s.targets) t.node.transform = applyMove(t.before, pt.x - s.start.x, pt.y - s.start.y);
		this.ctx.requestRender();
	}
	commitTransform(node, before) {
		const after = { ...node.transform };
		if (before.x === after.x && before.y === after.y) return [];
		const cmds = [new SetTransformCommand("move", node, before, after)];
		const extra = getNodeKind(node.kind).onTransformCommitted?.(node, before, { content: this.ctx.content }) ?? null;
		if (extra) cmds.push(extra);
		return cmds;
	}
	onButtonRelease() {
		const s = this.session;
		if (s.mode === "move") {
			const cmds = s.targets.flatMap((t) => this.commitTransform(t.node, t.before));
			if (cmds.length === 1) {
				this.ctx.history.push(cmds[0]);
				this.ctx.requestRender();
			} else if (cmds.length > 1) {
				const group = new CommandGroup("move");
				group.children.push(...cmds);
				this.ctx.history.push(group);
				this.ctx.requestRender();
			}
		}
		this.session = { mode: "idle" };
	}
	onHover() {}
	cursorFor(pt) {
		for (const n of this.selectedNodes()) if (layerOpacityAt(n, pt, this.ctx.content) > .25) return n.locks.position ? "not-allowed" : "move";
		return "default";
	}
	drawOverlay(overlay) {
		for (const n of this.selectedNodes()) {
			const box = nodeBounds(n);
			if (box.w <= 0 || box.h <= 0) continue;
			addTransformBox(overlay, box, false);
		}
	}
	pick(pt) {
		return pickLayerAt(this.ctx.document().root.children, pt, this.ctx.content);
	}
};
function makeSelectToolDef() {
	return {
		id: "select",
		create: (ctx) => new SelectTool("select", ctx)
	};
}
//#endregion
//#region src/renderer/extensions/layerEditor/engine/tools/index.ts
var registered = false;
function registerBuiltinTools() {
	if (registered) return;
	registered = true;
	registerTool(makeSelectToolDef());
	registerTool(makeTransformToolDef());
}
//#endregion
//#region src/renderer/extensions/layerEditor/panZoom.ts
function createPanZoom(getEls) {
	let zoomRatio = 1;
	let panX = 0;
	let panY = 0;
	let artW = 1024;
	let artH = 1024;
	const listeners = /* @__PURE__ */ new Set();
	function invalidate() {
		const els = getEls();
		if (!els) return;
		Object.assign(els.container.style, {
			width: `${artW * zoomRatio}px`,
			height: `${artH * zoomRatio}px`,
			left: `${panX}px`,
			top: `${panY}px`
		});
		for (const fn of listeners) fn();
	}
	function fit(w, h) {
		artW = w;
		artH = h;
		const els = getEls();
		if (!els) return;
		const availW = els.viewport.clientWidth;
		const availH = els.viewport.clientHeight;
		if (availW <= 0 || availH <= 0) return;
		const zoom = Math.min(availW / artW, availH / artH, 1) * .9;
		zoomRatio = Math.max(.01, zoom);
		panX = (availW - artW * zoomRatio) / 2;
		panY = (availH - artH * zoomRatio) / 2;
		invalidate();
	}
	function setArtboardSize(w, h) {
		if (w === artW && h === artH) return;
		artW = w;
		artH = h;
		invalidate();
	}
	function panBy(dx, dy) {
		panX += dx;
		panY += dy;
		invalidate();
	}
	function setZoom(ratio) {
		const els = getEls();
		if (!els) return;
		const newZoom = Math.max(.05, Math.min(20, ratio));
		if (newZoom === zoomRatio) return;
		const cx = els.viewport.clientWidth / 2;
		const cy = els.viewport.clientHeight / 2;
		const scale = newZoom / zoomRatio;
		panX = cx - (cx - panX) * scale;
		panY = cy - (cy - panY) * scale;
		zoomRatio = newZoom;
		invalidate();
	}
	function handleWheel(e) {
		if (!getEls()) return;
		const oldZoom = zoomRatio;
		const factor = e.deltaY < 0 ? 1.1 : 1 / 1.1;
		const newZoom = Math.max(.05, Math.min(20, oldZoom * factor));
		zoomRatio = newZoom;
		const mouseX = e.offsetX - panX;
		const mouseY = e.offsetY - panY;
		const scale = newZoom / oldZoom;
		panX += mouseX - mouseX * scale;
		panY += mouseY - mouseY * scale;
		invalidate();
	}
	function screenToArtboard(clientX, clientY) {
		const els = getEls();
		if (!els) return {
			x: 0,
			y: 0
		};
		const rect = els.container.getBoundingClientRect();
		if (rect.width <= 0 || rect.height <= 0) return {
			x: 0,
			y: 0
		};
		return {
			x: (clientX - rect.left) / rect.width * artW,
			y: (clientY - rect.top) / rect.height * artH
		};
	}
	return {
		zoom: () => zoomRatio,
		setZoom,
		invalidate,
		fit,
		setArtboardSize,
		panBy,
		handleWheel,
		screenToArtboard,
		onChange(fn) {
			listeners.add(fn);
			return () => listeners.delete(fn);
		}
	};
}
var CANVAS_SIZE_MAX = 8192;
var DEFAULT_BACKGROUND_COLOR = "#ffffff";
var HEX_COLOR_RE = /^#[0-9a-fA-F]{6}$/;
function loadImageElement(url) {
	return new Promise((resolve, reject) => {
		const img = new Image();
		img.crossOrigin = "anonymous";
		img.onload = () => resolve(img);
		img.onerror = () => reject(/* @__PURE__ */ new Error(`failed to load image: ${url}`));
		img.src = url;
	});
}
async function defaultLoadImage(url) {
	const img = await loadImageElement(url);
	const canvas = document.createElement("canvas");
	canvas.width = img.naturalWidth || img.width;
	canvas.height = img.naturalHeight || img.height;
	canvas.getContext("2d")?.drawImage(img, 0, 0);
	return canvas;
}
function isTextEditingTarget(target) {
	const el = target;
	const tag = el?.tagName;
	return tag === "INPUT" || tag === "TEXTAREA" || Boolean(el?.isContentEditable);
}
function sameTransform(a, b) {
	return a.x === b.x && a.y === b.y && a.w === b.w && a.h === b.h && a.rotation === b.rotation;
}
function visualBounds(t) {
	return t.rotation === 0 ? {
		x: t.x,
		y: t.y,
		w: t.w,
		h: t.h
	} : placedBounds(t);
}
function flipCanvasAxis(src, axis) {
	const canvas = document.createElement("canvas");
	canvas.width = src.width;
	canvas.height = src.height;
	const ctx = canvas.getContext("2d");
	if (!ctx) return null;
	if (axis === "h") {
		ctx.translate(src.width, 0);
		ctx.scale(-1, 1);
	} else {
		ctx.translate(0, src.height);
		ctx.scale(1, -1);
	}
	ctx.drawImage(src, 0, 0);
	return canvas;
}
function useLayerEditorSession(opts = {}) {
	registerBuiltinKinds();
	registerBuiltinTools();
	const loadImage = opts.loadImage ?? defaultLoadImage;
	const version = ref(0);
	const activeNodeId = ref(null);
	const glOk = ref(true);
	const zoomRatio = ref(1);
	const spaceDown = ref(false);
	const hoverCursor = ref("default");
	const pointerMode = ref("pointer");
	const panning = ref(false);
	const flipParity = reactive(/* @__PURE__ */ new Map());
	const inputOrderIds = [];
	const compositor = (opts.createCompositor ?? createWebGLCompositor)();
	let onContextRestored = null;
	glOk.value = compositor.init({
		width: 1024,
		height: 1024,
		onContextRestored: () => onContextRestored?.()
	});
	const editor = createEditor({
		compositor,
		onChange
	});
	onContextRestored = () => editor.invalidate();
	const content = editor.content;
	let mainCanvas = null;
	let overlayCanvas = null;
	let viewportEl = null;
	let containerEl = null;
	const panZoom = createPanZoom(() => viewportEl && containerEl ? {
		viewport: viewportEl,
		container: containerEl
	} : null);
	panZoom.onChange(() => {
		zoomRatio.value = panZoom.zoom();
	});
	const layers = computed(() => {
		version.value;
		return [...editor.document().root.children];
	});
	const backgroundLayer = computed(() => {
		const first = layers.value[0];
		return first.kind === "fill" ? { ...first } : null;
	});
	const imageLayers = computed(() => layers.value.filter((n) => n.kind !== "fill"));
	const activeNode = computed(() => {
		version.value;
		const node = activeNodeId.value ? engineNode(activeNodeId.value) : null;
		return node ? { ...node } : null;
	});
	const selectedNodeIds = computed(() => {
		version.value;
		return editor.selectedNodeIds();
	});
	const canUndo = computed(() => version.value >= 0 && editor.history.canUndo());
	const canRedo = computed(() => version.value >= 0 && editor.history.canRedo());
	const selectedContext = computed(() => {
		version.value;
		const node = activeNodeId.value ? engineNode(activeNodeId.value) : null;
		return node && node.kind !== "fill" ? "layer" : "background";
	});
	const canvasSize = computed(() => {
		version.value;
		const doc = editor.document();
		return {
			w: doc.width,
			h: doc.height
		};
	});
	function engineNode(id) {
		return findNode(editor.document().root, id)?.node ?? null;
	}
	function backgroundNode() {
		const first = editor.document().root.children[0];
		return first.kind === "fill" ? first : null;
	}
	function onChange() {
		version.value += 1;
		activeNodeId.value = editor.activeNodeId();
		requestRender();
	}
	function present() {
		if (!mainCanvas) return;
		const { width, height } = editor.document();
		const resized = mainCanvas.width !== width || mainCanvas.height !== height;
		if (resized) {
			mainCanvas.width = width;
			mainCanvas.height = height;
		}
		const ctx = mainCanvas.getContext("2d");
		if (!ctx) return;
		if (!glOk.value) {
			ctx.clearRect(0, 0, width, height);
			return;
		}
		editor.setZoom(Math.max(.01, panZoom.zoom()));
		const dmg = editor.takePresentDamage();
		if (!dmg.full && !dmg.rect && !resized) return;
		if (dmg.rect && !dmg.full && !resized) {
			const img = compositor.readback(dmg.rect);
			ctx.putImageData(img, Math.max(0, Math.floor(dmg.rect.x)), Math.max(0, Math.floor(dmg.rect.y)));
			return;
		}
		ctx.clearRect(0, 0, width, height);
		editor.render();
		ctx.putImageData(compositor.readback(), 0, 0);
	}
	function drawItem(ctx, item, hs) {
		switch (item.type) {
			case "handle":
				ctx.beginPath();
				if (item.shape === "circle") ctx.arc(item.pos.x, item.pos.y, hs, 0, Math.PI * 2);
				else ctx.rect(item.pos.x - hs, item.pos.y - hs, hs * 2, hs * 2);
				ctx.fill();
				ctx.stroke();
				break;
			case "line":
				ctx.beginPath();
				ctx.moveTo(item.a.x, item.a.y);
				ctx.lineTo(item.b.x, item.b.y);
				ctx.stroke();
				break;
			case "polyline":
				ctx.beginPath();
				item.points.forEach((p, i) => i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y));
				if (item.closed) ctx.closePath();
				if (item.ants) {
					ctx.save();
					ctx.strokeStyle = "#000000";
					ctx.stroke();
					ctx.strokeStyle = "#ffffff";
					ctx.setLineDash([hs, hs]);
					ctx.stroke();
					ctx.restore();
				} else ctx.stroke();
				break;
			case "arc":
				ctx.beginPath();
				ctx.arc(item.center.x, item.center.y, item.radius, 0, Math.PI * 2);
				ctx.stroke();
				break;
			case "rect":
				if (item.ants) {
					ctx.save();
					ctx.strokeStyle = "#000000";
					ctx.strokeRect(item.rect.x, item.rect.y, item.rect.w, item.rect.h);
					ctx.strokeStyle = "#ffffff";
					ctx.setLineDash([hs, hs]);
					ctx.strokeRect(item.rect.x, item.rect.y, item.rect.w, item.rect.h);
					ctx.restore();
				} else ctx.strokeRect(item.rect.x, item.rect.y, item.rect.w, item.rect.h);
				break;
			case "preview": ctx.drawImage(item.canvas, item.rect.x, item.rect.y, item.rect.w, item.rect.h);
		}
	}
	function selectedOutsideCanvasPreviewLayers() {
		const selectedIds = new Set(editor.selectedNodeIds());
		const previewLayers = [];
		for (const node of editor.document().root.children) {
			if (!selectedIds.has(node.id) || node.kind !== "raster" || !node.visible) continue;
			const bitmap = content.get(node.contentId)?.canvas;
			if (bitmap) previewLayers.push({
				bitmap,
				opacity: node.opacity,
				transform: node.transform
			});
		}
		return previewLayers;
	}
	function drawOverlayCanvas() {
		if (!overlayCanvas || !viewportEl || !containerEl) return;
		const dpr = window.devicePixelRatio || 1;
		const bw = Math.max(1, Math.round(viewportEl.clientWidth * dpr));
		const bh = Math.max(1, Math.round(viewportEl.clientHeight * dpr));
		if (overlayCanvas.width !== bw) overlayCanvas.width = bw;
		if (overlayCanvas.height !== bh) overlayCanvas.height = bh;
		editor.buildOverlay();
		const ctx = overlayCanvas.getContext("2d");
		if (!ctx) return;
		ctx.setTransform(1, 0, 0, 1, 0, 0);
		ctx.clearRect(0, 0, bw, bh);
		const z = Math.max(.01, panZoom.zoom());
		ctx.setTransform(z * dpr, 0, 0, z * dpr, containerEl.offsetLeft * dpr, containerEl.offsetTop * dpr);
		const { width, height } = editor.document();
		drawOutsideCanvasPreview(ctx, {
			w: width,
			h: height
		}, selectedOutsideCanvasPreviewLayers());
		ctx.lineWidth = 1 / z;
		ctx.strokeStyle = "#3b82f6";
		ctx.fillStyle = "#ffffff";
		const hs = 4 / z;
		for (const item of editor.overlay.items) drawItem(ctx, item, hs);
	}
	let disposed = false;
	let rafId = null;
	function requestRender() {
		if (disposed) return;
		if (rafId == null) rafId = requestAnimationFrame(() => {
			rafId = null;
			present();
			drawOverlayCanvas();
		});
	}
	let overlayRafId = null;
	function requestOverlayRender() {
		if (disposed || rafId != null || overlayRafId != null) return;
		overlayRafId = requestAnimationFrame(() => {
			overlayRafId = null;
			drawOverlayCanvas();
		});
	}
	editor.setTool("transform");
	function setElements(els) {
		viewportEl = els.viewport;
		containerEl = els.container;
		mainCanvas = els.main;
		overlayCanvas = els.overlay;
		fitView();
	}
	function fitView() {
		panZoom.fit(editor.document().width, editor.document().height);
		requestRender();
	}
	function setZoom(ratio) {
		panZoom.setZoom(ratio);
		requestRender();
	}
	function addBackgroundLayer() {
		editor.addNode(fillKind.create({
			name: "Background",
			fill: {
				type: "solid",
				color: DEFAULT_BACKGROUND_COLOR
			},
			opacity: 1,
			visible: false,
			locks: {
				content: true,
				position: true,
				visibility: false
			}
		}), 0);
	}
	async function loadImages(urls, names) {
		flipParity.clear();
		inputOrderIds.length = 0;
		let failed = 0;
		let docWidth = 0;
		let docHeight = 0;
		for (const [i, url] of urls.entries()) {
			let canvas;
			try {
				canvas = await loadImage(url);
			} catch (err) {
				console.warn("[LayerEditor] failed to load image", url, err);
				failed += 1;
				continue;
			}
			if (disposed) return failed;
			docWidth = Math.max(docWidth, canvas.width);
			docHeight = Math.max(docHeight, canvas.height);
			const contentId = content.register(canvas, { uploadedUrl: url });
			const layer = rasterKind.create({
				name: names[i],
				contentId,
				url,
				naturalWidth: canvas.width,
				naturalHeight: canvas.height,
				transform: {
					x: 0,
					y: 0,
					w: canvas.width,
					h: canvas.height,
					rotation: 0
				}
			});
			editor.addNode(layer);
			inputOrderIds.push(layer.id);
		}
		if (docWidth > 0 && docHeight > 0) {
			const width = Math.min(docWidth, CANVAS_SIZE_MAX);
			const height = Math.min(docHeight, CANVAS_SIZE_MAX);
			const doc = editor.document();
			doc.width = width;
			doc.height = height;
			if (glOk.value) compositor.resize(width, height);
		}
		editor.history.clear();
		fitView();
		requestRender();
		return failed;
	}
	function editProp(label, dirty, get, set, value, mergeKey) {
		const before = get();
		if (before === value) return;
		set(value);
		editor.history.push(new PropCommand(label, dirty, get, set, before, value, mergeKey));
		editor.invalidate();
	}
	function selectionTargets(id) {
		const sel = editor.selectedNodeIds();
		return sel.length > 1 && sel.includes(id) ? sel : [id];
	}
	function batch(label, ids, apply) {
		if (ids.length > 1) editor.history.beginGroup(label);
		for (const tid of ids) apply(tid);
		if (ids.length > 1) editor.history.endGroup();
	}
	function setOpacity(id, v) {
		batch("Opacity", selectionTargets(id), (tid) => {
			const n = engineNode(tid);
			if (!n) return;
			editProp("Opacity", Dirty.META, () => n.opacity, (x) => n.opacity = x, clamp$1(v, 0, 1), `opacity:${tid}`);
		});
	}
	function setBlendMode(id, v) {
		batch("Blend", selectionTargets(id), (tid) => {
			const n = engineNode(tid);
			if (!n) return;
			editProp("Blend", Dirty.DRAWABLE, () => n.mode, (m) => n.mode = m, defaultMode(Object.hasOwn(LAYER_MODES, v) ? v : "normal"), `blend:${tid}`);
		});
	}
	function toggleVisible(id) {
		const n = engineNode(id);
		if (!n) return;
		editProp("Visibility", Dirty.META, () => n.visible, (x) => n.visible = x, !n.visible);
	}
	function renameLayer(id, name) {
		const n = engineNode(id);
		if (!n) return;
		editProp("Rename", Dirty.META, () => n.name, (x) => n.name = x, name.trim() || n.name);
	}
	function inputLayerIds() {
		return [...inputOrderIds];
	}
	function setLayerOrder(ids) {
		const offset = backgroundLayer.value ? 1 : 0;
		ids.forEach((id, index) => {
			editor.moveNodeTo(id, void 0, offset + index);
		});
	}
	function moveLayerTo(id, toIndex) {
		const bg = backgroundLayer.value;
		if (bg && (id === bg.id || toIndex < 1)) return;
		editor.moveNodeTo(id, void 0, toIndex);
	}
	function moveLayer(id, dir) {
		const bg = backgroundLayer.value;
		if (bg) {
			if (id === bg.id) return;
			const index = editor.document().root.children.findIndex((n) => n.id === id);
			if (dir === -1 && index !== -1 && index <= 1) return;
		}
		editor.moveNode(id, dir);
	}
	function setActiveNode(id) {
		editor.setActiveNode(id);
	}
	function setSelectedNodes(ids) {
		editor.setSelectedNodes(ids);
	}
	function selectBackground() {
		const bg = backgroundLayer.value;
		editor.setSelectedNodes(bg ? [bg.id] : []);
	}
	function setBackgroundColor(hex) {
		const bg = backgroundNode();
		if (!bg || !HEX_COLOR_RE.test(hex)) return;
		const color = hex.toLowerCase();
		if (bg.fill.type === "solid" && bg.fill.color === color) return;
		editProp("Background Color", Dirty.DRAWABLE, () => bg.fill, (v) => bg.fill = v, {
			type: "solid",
			color
		}, `bg-color:${bg.id}`);
	}
	function setBackgroundOpacity(v) {
		const bg = backgroundNode();
		if (!bg) return;
		editProp("Background Opacity", Dirty.META, () => bg.opacity, (x) => bg.opacity = x, clamp$1(v, 0, 1), `bg-opacity:${bg.id}`);
	}
	function setBackgroundVisible(visible) {
		const bg = backgroundNode();
		if (!bg) return;
		editProp("Background Visibility", Dirty.META, () => bg.visible, (x) => bg.visible = x, visible);
	}
	function setPointerMode(mode) {
		pointerMode.value = mode;
	}
	function shiftLayers(nodes, dx, dy) {
		if (dx === 0 && dy === 0) return;
		for (const n of nodes) {
			if (n.kind === "fill") continue;
			n.transform = {
				...n.transform,
				x: n.transform.x + dx,
				y: n.transform.y + dy
			};
			if (n.kind === "group") shiftLayers(n.children, dx, dy);
		}
	}
	function setCanvasSize(w, h) {
		const doc = editor.document();
		const width = clamp$1(Math.round(w), 64, CANVAS_SIZE_MAX);
		const height = clamp$1(Math.round(h), 64, CANVAS_SIZE_MAX);
		const before = {
			w: doc.width,
			h: doc.height
		};
		if (before.w === width && before.h === height) return;
		const apply = (v) => {
			const dx = Math.trunc((v.w - doc.width) / 2);
			const dy = Math.trunc((v.h - doc.height) / 2);
			doc.width = v.w;
			doc.height = v.h;
			if (glOk.value) compositor.resize(v.w, v.h);
			shiftLayers(doc.root.children, dx, dy);
			panZoom.setArtboardSize(v.w, v.h);
			panZoom.panBy(-dx * panZoom.zoom(), -dy * panZoom.zoom());
		};
		apply({
			w: width,
			h: height
		});
		editor.history.push(new PropCommand("Canvas Size", Dirty.STRUCTURE, () => ({
			w: doc.width,
			h: doc.height
		}), apply, before, {
			w: width,
			h: height
		}));
		editor.invalidate();
	}
	function pushLayerTransform(label, id, patch) {
		const n = engineNode(id);
		if (!n || n.locks.position) return;
		const before = { ...n.transform };
		const after = {
			...before,
			...patch
		};
		if (sameTransform(before, after)) return;
		n.transform = after;
		editor.history.push(new SetTransformCommand(label, n, before, after));
		editor.invalidate();
	}
	function setLayerPosition(id, x, y) {
		const patch = {};
		if (x !== void 0 && Number.isFinite(x)) patch.x = x;
		if (y !== void 0 && Number.isFinite(y)) patch.y = y;
		pushLayerTransform("Position", id, patch);
	}
	function setLayerDimensions(id, w, h) {
		const patch = {};
		if (w !== void 0 && Number.isFinite(w)) patch.w = Math.max(1, w);
		if (h !== void 0 && Number.isFinite(h)) patch.h = Math.max(1, h);
		pushLayerTransform("Dimensions", id, patch);
	}
	function setLayerRotationDeg(id, deg) {
		if (!Number.isFinite(deg)) return;
		pushLayerTransform("Rotation", id, { rotation: deg * Math.PI / 180 });
	}
	function alignLayer(id, op) {
		const doc = editor.document();
		batch("Align", selectionTargets(id), (tid) => {
			const n = engineNode(tid);
			if (!n || n.locks.position) return;
			const b = visualBounds(n.transform);
			switch (op) {
				case "left":
					pushLayerTransform("Align", tid, { x: n.transform.x - b.x });
					break;
				case "centerH":
					pushLayerTransform("Align", tid, { x: n.transform.x + ((doc.width - b.w) / 2 - b.x) });
					break;
				case "right":
					pushLayerTransform("Align", tid, { x: n.transform.x + (doc.width - b.w - b.x) });
					break;
				case "top":
					pushLayerTransform("Align", tid, { y: n.transform.y - b.y });
					break;
				case "centerV":
					pushLayerTransform("Align", tid, { y: n.transform.y + ((doc.height - b.h) / 2 - b.y) });
					break;
				case "bottom": pushLayerTransform("Align", tid, { y: n.transform.y + (doc.height - b.h - b.y) });
			}
		});
	}
	function flipLayer(id, axis) {
		const n = engineNode(id);
		if (!n || n.kind !== "raster" || n.locks.content) return;
		const entry = content.get(n.contentId);
		if (!entry) return;
		const flipped = flipCanvasAxis(entry.canvas, axis);
		if (!flipped) return;
		const before = snapshotRaster(n);
		n.contentId = content.register(flipped);
		n.url = void 0;
		if (n.mask) {
			const maskEntry = content.get(n.mask.contentId);
			const flippedMask = maskEntry ? flipCanvasAxis(maskEntry.canvas, axis) : null;
			if (flippedMask) n.mask = {
				...n.mask,
				contentId: content.register(flippedMask),
				url: void 0
			};
		}
		const parityBefore = layerFlips(id);
		const parityAfter = axis === "h" ? {
			...parityBefore,
			h: !parityBefore.h
		} : {
			...parityBefore,
			v: !parityBefore.v
		};
		const setParity = (p) => {
			flipParity.set(id, p);
		};
		setParity(parityAfter);
		editor.history.beginGroup("Flip Layer");
		editor.history.push(new BakeRasterCommand("Flip Layer", n, before, snapshotRaster(n), content));
		editor.history.push(new PropCommand("Flip Layer", Dirty.META, () => layerFlips(id), setParity, parityBefore, parityAfter));
		editor.history.endGroup();
		editor.invalidate();
	}
	function layerFlips(id) {
		return flipParity.get(id) ?? {
			h: false,
			v: false
		};
	}
	function undo() {
		editor.undo();
	}
	function redo() {
		editor.redo();
	}
	function artboardPt(e) {
		return panZoom.screenToArtboard(e.clientX, e.clientY);
	}
	let panLast = {
		x: 0,
		y: 0
	};
	let toolActive = false;
	let pendingMoves = [];
	let moveRaf = null;
	function capturePointer(zone, e) {
		try {
			zone.setPointerCapture(e.pointerId);
		} catch {}
	}
	function selectedTransformTargets() {
		const root = editor.document().root;
		return filterTopmost(root, editor.selectedNodeIds()).map((id) => findNode(root, id)?.node ?? null).filter((n) => canTransformNode(n));
	}
	function selectionGizmo() {
		const targets = selectedTransformTargets();
		if (!targets.length) return null;
		return targets.length === 1 ? { ...targets[0].transform } : unionBounds(targets.map((n) => n.transform));
	}
	function resolvePointerTarget(e, pt) {
		if (editor.floating()) return true;
		const additive = e.shiftKey || e.ctrlKey || e.metaKey;
		if (!additive) {
			const gizmo = selectionGizmo();
			const tol = 8 / Math.max(.001, panZoom.zoom());
			if (gizmo && hitHandle(gizmo, pt, tol)) return true;
		}
		const picked = pickLayerAt(editor.document().root.children, pt, content, opts.alphaSampler);
		if (!picked) {
			if (!additive) editor.setSelectedNodes([]);
			return false;
		}
		const sel = editor.selectedNodeIds();
		if (additive) editor.setSelectedNodes(sel.includes(picked.id) ? sel.filter((sid) => sid !== picked.id) : [...sel, picked.id]);
		else if (!sel.includes(picked.id)) editor.setSelectedNodes([picked.id]);
		return true;
	}
	function onPointerDown(e) {
		const zone = viewportEl;
		if (!zone) return;
		zone.focus();
		pendingMoves = [];
		if (e.button === 1 || e.button === 2 || e.button === 0 && (spaceDown.value || pointerMode.value === "hand")) {
			panning.value = true;
			panLast = {
				x: e.offsetX,
				y: e.offsetY
			};
			capturePointer(zone, e);
			return;
		}
		if (e.button !== 0) return;
		if (!resolvePointerTarget(e, artboardPt(e))) return;
		editor.pointerDown(e, artboardPt(e));
		toolActive = true;
		capturePointer(zone, e);
	}
	function flushMove() {
		moveRaf = null;
		const events = pendingMoves;
		pendingMoves = [];
		const e = events.at(-1);
		if (!e) return;
		if (panning.value) {
			panZoom.panBy(e.offsetX - panLast.x, e.offsetY - panLast.y);
			panLast = {
				x: e.offsetX,
				y: e.offsetY
			};
			requestOverlayRender();
			return;
		}
		if (toolActive) editor.pointerMove(e, artboardPt(e));
		else hoverCursor.value = editor.cursorAt(artboardPt(e));
	}
	function onPointerMove(e) {
		pendingMoves.push(e);
		if (moveRaf == null) moveRaf = requestAnimationFrame(flushMove);
	}
	function endToolGesture(e) {
		editor.pointerUp(e, artboardPt(e));
		editor.transformApply();
		toolActive = false;
	}
	function onPointerUp(e) {
		if (moveRaf != null) {
			cancelAnimationFrame(moveRaf);
			flushMove();
		}
		if (panning.value) panning.value = false;
		else if (toolActive) endToolGesture(e);
		try {
			viewportEl?.releasePointerCapture(e.pointerId);
		} catch {}
	}
	function onPointerLeave(e) {
		if (toolActive) endToolGesture(e);
	}
	function onWheel(e) {
		panZoom.handleWheel(e);
		requestRender();
	}
	const viewportCursor = computed(() => {
		if (panning.value) return "grabbing";
		if (spaceDown.value || pointerMode.value === "hand") return "grab";
		return hoverCursor.value;
	});
	function onKeyDown(e) {
		if (isTextEditingTarget(e.target)) return;
		const ctrl = e.ctrlKey || e.metaKey;
		if (editor.floating()) {
			if (e.key === "Enter") {
				e.preventDefault();
				editor.anchorFloating();
				return;
			}
		}
		if (e.key === "Enter") {
			e.preventDefault();
			editor.transformApply();
			return;
		}
		if (e.code === "Space") {
			spaceDown.value = true;
			e.preventDefault();
			return;
		}
		if (ctrl && e.code === "KeyZ") {
			e.preventDefault();
			if (e.shiftKey) redo();
			else undo();
			return;
		}
		if (ctrl && e.code === "KeyY") {
			e.preventDefault();
			redo();
			return;
		}
		if (ctrl && e.code === "KeyA") {
			e.preventDefault();
			editor.selectAll();
			return;
		}
		if (ctrl && e.code === "KeyD") {
			e.preventDefault();
			editor.selectNone();
		}
	}
	function onKeyUp(e) {
		if (e.code === "Space") spaceDown.value = false;
	}
	function dispose() {
		disposed = true;
		if (rafId != null) cancelAnimationFrame(rafId);
		if (overlayRafId != null) cancelAnimationFrame(overlayRafId);
		if (moveRaf != null) cancelAnimationFrame(moveRaf);
		rafId = null;
		overlayRafId = null;
		moveRaf = null;
		compositor.dispose();
	}
	addBackgroundLayer();
	editor.history.clear();
	return {
		editor,
		content,
		compositor,
		panZoom,
		version,
		glOk,
		zoomRatio,
		layers,
		backgroundLayer,
		imageLayers,
		activeNodeId,
		activeNode,
		selectedNodeIds,
		selectedContext,
		canvasSize,
		canUndo,
		canRedo,
		pointerMode,
		viewportCursor,
		setElements,
		fitView,
		setZoom,
		requestRender,
		loadImages,
		setOpacity,
		setBlendMode,
		toggleVisible,
		renameLayer,
		moveLayer,
		moveLayerTo,
		setLayerOrder,
		inputLayerIds,
		setActiveNode,
		setSelectedNodes,
		selectBackground,
		setBackgroundColor,
		setBackgroundOpacity,
		setBackgroundVisible,
		setPointerMode,
		setCanvasSize,
		setLayerPosition,
		setLayerDimensions,
		setLayerRotationDeg,
		alignLayer,
		flipLayer,
		layerFlips,
		undo,
		redo,
		onPointerDown,
		onPointerMove,
		onPointerUp,
		onPointerLeave,
		onWheel,
		onKeyDown,
		onKeyUp,
		dispose
	};
}
//#endregion
export { Dirty as a, useLayerEditorExport as c, LAYER_MODES as d, useLayerEditorSession as i, loadCompositorSession as l, DEFAULT_BACKGROUND_COLOR as n, buildSessionPsdBlob as o, isTextEditingTarget as r, psdExportFilename as s, CANVAS_SIZE_MAX as t, extractLayerState as u };
