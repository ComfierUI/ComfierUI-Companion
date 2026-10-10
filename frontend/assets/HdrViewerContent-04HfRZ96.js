import "./rolldown-runtime-xtsTai4I.js";
import { $ as LinearSRGBColorSpace, Ct as Scene, It as Vector2, L as DataUtils, Q as LinearFilter, U as FloatType, W as GLSL3, at as Matrix3, gt as PlaneGeometry, it as MathUtils, l as RGBELoader, pt as OrthographicCamera, st as Mesh, u as EXRLoader, wt as ShaderMaterial, x as WebGLRenderer, xt as Raycaster } from "./vendor-three-DQpYrwAh.js";
import { Bt as shallowRef, C as vModelText, Dt as withDirectives, Et as withCtx, F as createBaseVNode, G as defineComponent, H as createTextVNode, Jt as normalizeClass, Kt as unref, L as createCommentVNode, Lt as ref, O as Fragment, P as computed, R as createElementBlock, S as vModelSelect, St as watch, U as createVNode, Zt as toDisplayString, b as vModelCheckbox, dt as renderList, lt as openBlock, ot as onMounted, st as onUnmounted, xt as useTemplateRef } from "./vendor-vue-core-C1utdb0s.js";
import { r as useI18n } from "./vendor-i18n-BZvE7WBQ.js";
import { t as Button_default } from "./Button-j0oCzR82.js";
import { n as downloadFile } from "./downloadUtil-Bysc7OZ_.js";
import { t as histogramToPath } from "./histogramUtil-nwm_kqcs.js";
import { r as toFullResolutionUrl, t as getImageFilenameFromUrl } from "./hdrFormatUtil-CnRXb_Cj.js";
//#region src/renderer/hdr/colorGamut.ts
var D65 = [.3127, .329];
var CHROMATICITIES = {
	sRGB: {
		red: [.64, .33],
		green: [.3, .6],
		blue: [.15, .06],
		white: D65
	},
	"Rec.2020": {
		red: [.708, .292],
		green: [.17, .797],
		blue: [.131, .046],
		white: D65
	}
};
var GAMUT_NAMES = Object.keys(CHROMATICITIES);
var IDENTITY = [
	1,
	0,
	0,
	0,
	1,
	0,
	0,
	0,
	1
];
function rgbToXyz(c) {
	const [rx, ry] = c.red;
	const [gx, gy] = c.green;
	const [bx, by] = c.blue;
	const [wx, wy] = c.white;
	const xWhite = wx / wy;
	const zWhite = (1 - wx - wy) / wy;
	const d = rx * (by - gy) + bx * (gy - ry) + gx * (ry - by);
	const srN = xWhite * (by - gy) - gx * (by - 1 + by * (xWhite + zWhite)) + bx * (gy - 1 + gy * (xWhite + zWhite));
	const sgN = xWhite * (ry - by) + rx * (by - 1 + by * (xWhite + zWhite)) - bx * (ry - 1 + ry * (xWhite + zWhite));
	const sbN = xWhite * (gy - ry) - rx * (gy - 1 + gy * (xWhite + zWhite)) + gx * (ry - 1 + ry * (xWhite + zWhite));
	const sr = srN / d;
	const sg = sgN / d;
	const sb = sbN / d;
	return [
		sr * rx,
		sg * gx,
		sb * bx,
		sr * ry,
		sg * gy,
		sb * by,
		sr * (1 - rx - ry),
		sg * (1 - gx - gy),
		sb * (1 - bx - by)
	];
}
function multiply(a, b) {
	const result = Array.from({ length: 9 }, () => 0);
	for (let row = 0; row < 3; row++) for (let col = 0; col < 3; col++) {
		let sum = 0;
		for (let k = 0; k < 3; k++) sum += a[row * 3 + k] * b[k * 3 + col];
		result[row * 3 + col] = sum;
	}
	return result;
}
function invert(m) {
	const [a, b, c, d, e, f, g, h, i] = m;
	const det = a * (e * i - f * h) - b * (d * i - f * g) + c * (d * h - e * g);
	if (det === 0) return IDENTITY;
	const invDet = 1 / det;
	return [
		(e * i - f * h) * invDet,
		(c * h - b * i) * invDet,
		(b * f - c * e) * invDet,
		(f * g - d * i) * invDet,
		(a * i - c * g) * invDet,
		(c * d - a * f) * invDet,
		(d * h - e * g) * invDet,
		(b * g - a * h) * invDet,
		(a * e - b * d) * invDet
	];
}
var XYZ_TO_SRGB = invert(rgbToXyz(CHROMATICITIES.sRGB));
function gamutToSrgbMatrix(gamut) {
	if (gamut === "sRGB") return IDENTITY;
	return multiply(XYZ_TO_SRGB, rgbToXyz(CHROMATICITIES[gamut]));
}
function matchesGamut(c, gamut) {
	const ref = CHROMATICITIES[gamut];
	const tol = .01;
	return Math.abs(c.redX - ref.red[0]) < tol && Math.abs(c.redY - ref.red[1]) < tol && Math.abs(c.greenX - ref.green[0]) < tol && Math.abs(c.greenY - ref.green[1]) < tol && Math.abs(c.blueX - ref.blue[0]) < tol && Math.abs(c.blueY - ref.blue[1]) < tol && Math.abs(c.whiteX - ref.white[0]) < tol && Math.abs(c.whiteY - ref.white[1]) < tol;
}
function detectGamutFromChromaticities(c) {
	if (!c) return "sRGB";
	return GAMUT_NAMES.find((name) => matchesGamut(c, name)) ?? "sRGB";
}
//#endregion
//#region src/renderer/hdr/hdrViewerShader.ts
var HDR_VIEWER_VERTEX_SHADER = `
out vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;
var HDR_VIEWER_FRAGMENT_SHADER = `
in vec2 vUv;
out vec4 frag_color;

uniform sampler2D uImage;
uniform mat3 uGamutToSRGB;
uniform float uGain;
uniform int uChannel;
uniform bool uDither;
uniform bool uClipWarnings;
uniform vec2 uClipRange;
uniform bool uCheckerboard;
uniform float uCheckerSize;

const float CHECK_DARK_LINEAR = 0.1329;
const float CHECK_LIGHT_LINEAR = 0.3185;

float linearToS(float a) {
  float s = sign(a);
  a = abs(a);
  return s * (a < 0.0031308 ? 12.92 * a : 1.055 * pow(a, 1.0 / 2.4) - 0.055);
}

vec3 linearToSRGB(vec3 c) {
  return vec3(linearToS(c.r), linearToS(c.g), linearToS(c.b));
}

float ign(vec2 p) {
  return fract(52.9829189 * fract(0.06711056 * p.x + 0.00583715 * p.y));
}

float tent(float r) {
  float rp = sqrt(2.0 * r);
  float rn = sqrt(2.0 * r + 1.0) - 1.0;
  return (r < 0.0) ? 0.5 * rn : 0.5 * rp;
}

void main() {
  vec4 texel = texture(uImage, vUv);
  vec3 mapped = uGamutToSRGB * texel.rgb;

  vec3 selected;
  if (uChannel == 1) selected = vec3(mapped.r);
  else if (uChannel == 2) selected = vec3(mapped.g);
  else if (uChannel == 3) selected = vec3(mapped.b);
  else if (uChannel == 4) selected = vec3(texel.a);
  else if (uChannel == 5)
    selected = vec3(dot(mapped, vec3(0.2126, 0.7152, 0.0722)));
  else selected = mapped;

  vec3 exposed = selected * uGain;

  vec3 composited = exposed;
  if (uCheckerboard && uChannel == 0) {
    vec2 cell = floor(gl_FragCoord.xy / uCheckerSize);
    float check = mod(cell.x + cell.y, 2.0) == 0.0
      ? CHECK_DARK_LINEAR
      : CHECK_LIGHT_LINEAR;
    composited += (1.0 - clamp(texel.a, 0.0, 1.0)) * vec3(check);
  }

  vec3 display = linearToSRGB(composited);

  if (uDither) {
    float r = ign(gl_FragCoord.xy) - 0.5;
    display += vec3(tent(r) / 255.0);
  }

  display = clamp(display, 0.0, 1.0);

  if (uClipWarnings) {
    float zebra1 =
      mod(floor((gl_FragCoord.x + gl_FragCoord.y) / 8.0), 2.0) == 0.0 ? 0.0 : 1.0;
    float zebra2 =
      mod(floor((gl_FragCoord.x - gl_FragCoord.y) / 8.0), 2.0) == 0.0 ? 0.0 : 1.0;
    bvec3 over = greaterThan(exposed, vec3(uClipRange.y));
    bvec3 under = lessThan(exposed, vec3(uClipRange.x));
    display = mix(display, vec3(zebra1), vec3(over));
    display = mix(display, vec3(zebra2), vec3(under));
  }

  frag_color = vec4(display, 1.0);
}
`;
//#endregion
//#region src/renderer/hdr/hdrStats.ts
function computeImageStats(read, length, channels) {
	let min = Infinity;
	let max = -Infinity;
	let sum = 0;
	let sumSq = 0;
	let count = 0;
	let nanCount = 0;
	let infCount = 0;
	for (let i = 0; i < length; i++) {
		const value = read(i);
		if (Number.isNaN(value)) {
			nanCount++;
			continue;
		}
		if (!Number.isFinite(value)) {
			infCount++;
			continue;
		}
		if (channels === 4 && i % channels === 3) continue;
		if (value < min) min = value;
		if (value > max) max = value;
		sum += value;
		sumSq += value * value;
		count++;
	}
	if (count === 0) return {
		min: 0,
		max: 0,
		mean: 0,
		stdDev: 0,
		nanCount,
		infCount
	};
	const mean = sum / count;
	const variance = Math.max(0, sumSq / count - mean * mean);
	return {
		min,
		max,
		mean,
		stdDev: Math.sqrt(variance),
		nanCount,
		infCount
	};
}
function computeChannelHistograms(read, length, channels, bins = 256) {
	const last = bins - 1;
	const r = new Uint32Array(bins);
	const g = new Uint32Array(bins);
	const b = new Uint32Array(bins);
	const luminance = new Uint32Array(bins);
	const a = channels === 4 ? new Uint32Array(bins) : null;
	const accumulate = (target, value) => {
		if (Number.isNaN(value)) return;
		const bin = Math.floor(Math.max(0, value) * bins);
		target[bin > last ? last : bin]++;
	};
	for (let i = 0; i + channels - 1 < length; i += channels) {
		const rv = read(i);
		const gv = channels >= 3 ? read(i + 1) : rv;
		const bv = channels >= 3 ? read(i + 2) : rv;
		accumulate(r, rv);
		accumulate(g, gv);
		accumulate(b, bv);
		if (a) accumulate(a, read(i + 3));
		accumulate(luminance, channels >= 3 ? .2126 * rv + .7152 * gv + .0722 * bv : rv);
	}
	return {
		r,
		g,
		b,
		a,
		luminance
	};
}
//#endregion
//#region src/renderer/three/WebGLViewport.ts
var WebGLViewport = class {
	renderer;
	resizeObserver = null;
	constructor(renderer) {
		this.renderer = renderer;
	}
	observeResize(target, onResize) {
		if (typeof ResizeObserver === "undefined") return;
		this.resizeObserver?.disconnect();
		this.resizeObserver = new ResizeObserver(() => onResize());
		this.resizeObserver.observe(target);
	}
	disposeRenderer() {
		this.resizeObserver?.disconnect();
		this.resizeObserver = null;
		this.renderer.forceContextLoss();
		this.renderer.domElement.dispatchEvent(new Event("webglcontextlost", {
			bubbles: true,
			cancelable: true
		}));
		this.renderer.dispose();
		this.renderer.domElement.remove();
	}
};
//#endregion
//#region src/composables/useHdrViewer.ts
var MIN_ZOOM = .05;
var MAX_ZOOM = 64;
var CHECKER_CSS_PX = 8;
var CHANNEL_MODES = [
	"rgb",
	"r",
	"g",
	"b",
	"a",
	"luminance"
];
var CHANNEL_INDEX = {
	rgb: 0,
	r: 1,
	g: 2,
	b: 3,
	a: 4,
	luminance: 5
};
function createLoader(url) {
	if (getImageFilenameFromUrl(url)?.toLowerCase().endsWith(".hdr")) return new RGBELoader();
	const loader = new EXRLoader();
	loader.setDataType(FloatType);
	return loader;
}
function makeReader(data, type) {
	if (type === 1016) return (index) => DataUtils.fromHalfFloat(data[index]);
	return (index) => data[index];
}
function loadHdrTexture(url) {
	return new Promise((resolve, reject) => {
		createLoader(url).load(url, (texture, texData) => {
			const chromaticities = texData.header?.chromaticities;
			resolve({
				texture,
				gamut: detectGamutFromChromaticities(chromaticities)
			});
		}, void 0, reject);
	});
}
function useHdrViewer() {
	const exposureStops = ref(0);
	const dither = ref(true);
	const clipWarnings = ref(false);
	const checkerboard = ref(true);
	const gamut = ref("sRGB");
	const channel = ref("rgb");
	const loading = ref(true);
	const error = ref(null);
	const dimensions = ref(null);
	const stats = ref(null);
	const histograms = shallowRef(null);
	const pixel = ref(null);
	const histogram = computed(() => {
		const channelHistograms = histograms.value;
		if (!channelHistograms) return null;
		switch (channel.value) {
			case "r": return channelHistograms.r;
			case "g": return channelHistograms.g;
			case "b": return channelHistograms.b;
			case "a": return channelHistograms.a;
			default: return channelHistograms.luminance;
		}
	});
	const containerRef = shallowRef(null);
	let renderer = null;
	let viewport = null;
	let scene = null;
	let camera = null;
	let material = null;
	let mesh = null;
	let texture = null;
	let imageAspect = 1;
	let frameRequested = false;
	let readSample = null;
	let imageWidth = 0;
	let imageHeight = 0;
	let imageChannels = 4;
	const raycaster = new Raycaster();
	const pointerNdc = new Vector2();
	function requestRender() {
		if (!renderer || frameRequested) return;
		frameRequested = true;
		requestAnimationFrame(() => {
			frameRequested = false;
			if (renderer && scene && camera) renderer.render(scene, camera);
		});
	}
	function containerSize() {
		const el = containerRef.value;
		return {
			width: el?.clientWidth || 1,
			height: el?.clientHeight || 1
		};
	}
	function updateProjection() {
		if (!camera) return;
		const { width, height } = containerSize();
		const halfH = .5;
		const halfW = .5 * width / height;
		camera.left = -halfW;
		camera.right = halfW;
		camera.top = halfH;
		camera.bottom = -.5;
		camera.updateProjectionMatrix();
	}
	function fitView() {
		if (!camera) return;
		const { width, height } = containerSize();
		const containerAspect = width / height;
		camera.zoom = Math.min(1, containerAspect / imageAspect);
		camera.position.set(0, 0, 1);
		camera.updateProjectionMatrix();
		requestRender();
	}
	function applyUniforms() {
		if (!material) return;
		material.uniforms.uGain.value = Math.pow(2, exposureStops.value);
		material.uniforms.uDither.value = dither.value;
		material.uniforms.uClipWarnings.value = clipWarnings.value;
		material.uniforms.uCheckerboard.value = checkerboard.value;
		material.uniforms.uChannel.value = CHANNEL_INDEX[channel.value];
		const m = gamutToSrgbMatrix(gamut.value);
		material.uniforms.uGamutToSRGB.value.set(m[0], m[1], m[2], m[3], m[4], m[5], m[6], m[7], m[8]);
		requestRender();
	}
	function buildScene() {
		renderer = new WebGLRenderer({
			antialias: false,
			alpha: false
		});
		viewport = new WebGLViewport(renderer);
		renderer.outputColorSpace = LinearSRGBColorSpace;
		renderer.setPixelRatio(window.devicePixelRatio);
		renderer.setClearColor(657930, 1);
		scene = new Scene();
		camera = new OrthographicCamera(-1, 1, 1, -1, .1, 10);
		camera.position.set(0, 0, 1);
		material = new ShaderMaterial({
			glslVersion: GLSL3,
			vertexShader: HDR_VIEWER_VERTEX_SHADER,
			fragmentShader: HDR_VIEWER_FRAGMENT_SHADER,
			uniforms: {
				uImage: { value: null },
				uGamutToSRGB: { value: new Matrix3() },
				uGain: { value: 1 },
				uChannel: { value: 0 },
				uDither: { value: true },
				uClipWarnings: { value: false },
				uClipRange: { value: new Vector2(0, 1) },
				uCheckerboard: { value: true },
				uCheckerSize: { value: CHECKER_CSS_PX * renderer.getPixelRatio() }
			}
		});
		mesh = new Mesh(new PlaneGeometry(1, 1), material);
		scene.add(mesh);
	}
	function resize() {
		if (!renderer) return;
		const { width, height } = containerSize();
		renderer.setSize(width, height, false);
		updateProjection();
		requestRender();
	}
	function setTexture(loaded) {
		if (!material || !mesh) return;
		loaded.colorSpace = LinearSRGBColorSpace;
		loaded.minFilter = LinearFilter;
		loaded.magFilter = LinearFilter;
		loaded.needsUpdate = true;
		const { width, height, data } = loaded.image;
		texture = loaded;
		imageAspect = width / height;
		mesh.scale.set(imageAspect, 1, 1);
		material.uniforms.uImage.value = loaded;
		dimensions.value = `${width} x ${height}`;
		if (!data) return;
		imageWidth = width;
		imageHeight = height;
		imageChannels = data.length / (width * height);
		readSample = makeReader(data, loaded.type);
		stats.value = computeImageStats(readSample, data.length, imageChannels);
		histograms.value = computeChannelHistograms(readSample, data.length, imageChannels);
	}
	async function mount(container, url) {
		containerRef.value = container;
		loading.value = true;
		error.value = null;
		try {
			buildScene();
			container.appendChild(renderer.domElement);
			renderer.domElement.classList.add("block", "size-full");
			resize();
			applyUniforms();
			attachInteractions(renderer.domElement);
			viewport.observeResize(container, resize);
			const { texture: loaded, gamut: detectedGamut } = await loadHdrTexture(url);
			if (!material || !mesh) {
				loaded.dispose();
				return;
			}
			gamut.value = detectedGamut;
			setTexture(loaded);
			applyUniforms();
			fitView();
		} catch (e) {
			error.value = e instanceof Error ? e.message : String(e);
			dispose();
		} finally {
			loading.value = false;
		}
	}
	function normalizeExposure() {
		const max = stats.value?.max ?? 0;
		exposureStops.value = max > 0 ? -Math.log2(max) : 0;
	}
	function attachInteractions(canvas) {
		canvas.addEventListener("wheel", onWheel, { passive: false });
		canvas.addEventListener("pointerdown", onPointerDown);
		canvas.addEventListener("pointermove", onHoverMove);
		canvas.addEventListener("pointerleave", onHoverLeave);
	}
	function onWheel(event) {
		if (!camera) return;
		event.preventDefault();
		const factor = Math.exp(-event.deltaY * .001);
		const nextZoom = MathUtils.clamp(camera.zoom * factor, MIN_ZOOM, MAX_ZOOM);
		camera.zoom = nextZoom;
		camera.updateProjectionMatrix();
		requestRender();
	}
	let dragStart = null;
	function onPointerDown(event) {
		if (!camera) return;
		dragStart = {
			x: event.clientX,
			y: event.clientY,
			camX: camera.position.x,
			camY: camera.position.y
		};
		window.addEventListener("pointermove", onPointerMove);
		window.addEventListener("pointerup", onPointerUp);
	}
	function onPointerMove(event) {
		if (!camera || !dragStart) return;
		const { height } = containerSize();
		const worldPerPixel = 1 / (height * camera.zoom);
		camera.position.x = dragStart.camX - (event.clientX - dragStart.x) * worldPerPixel;
		camera.position.y = dragStart.camY + (event.clientY - dragStart.y) * worldPerPixel;
		requestRender();
	}
	function onPointerUp() {
		dragStart = null;
		window.removeEventListener("pointermove", onPointerMove);
		window.removeEventListener("pointerup", onPointerUp);
	}
	function onHoverMove(event) {
		if (!camera || !mesh || !renderer || dragStart || !readSample) return;
		const rect = renderer.domElement.getBoundingClientRect();
		pointerNdc.x = (event.clientX - rect.left) / rect.width * 2 - 1;
		pointerNdc.y = -((event.clientY - rect.top) / rect.height * 2 - 1);
		raycaster.setFromCamera(pointerNdc, camera);
		const hit = raycaster.intersectObject(mesh).at(0);
		if (!hit?.uv) {
			pixel.value = null;
			return;
		}
		const col = MathUtils.clamp(Math.floor(hit.uv.x * imageWidth), 0, imageWidth - 1);
		const row = MathUtils.clamp(Math.floor(hit.uv.y * imageHeight), 0, imageHeight - 1);
		const base = (row * imageWidth + col) * imageChannels;
		pixel.value = {
			x: col,
			y: imageHeight - 1 - row,
			r: readSample(base),
			g: readSample(base + 1),
			b: readSample(base + 2),
			a: imageChannels === 4 ? readSample(base + 3) : null
		};
	}
	function onHoverLeave() {
		pixel.value = null;
	}
	function dispose() {
		window.removeEventListener("pointermove", onPointerMove);
		window.removeEventListener("pointerup", onPointerUp);
		if (renderer) {
			renderer.domElement.removeEventListener("wheel", onWheel);
			renderer.domElement.removeEventListener("pointerdown", onPointerDown);
			renderer.domElement.removeEventListener("pointermove", onHoverMove);
			renderer.domElement.removeEventListener("pointerleave", onHoverLeave);
		}
		viewport?.disposeRenderer();
		texture?.dispose();
		material?.dispose();
		mesh?.geometry.dispose();
		renderer = null;
		viewport = null;
		scene = null;
		camera = null;
		material = null;
		mesh = null;
		texture = null;
		readSample = null;
	}
	watch([
		exposureStops,
		dither,
		clipWarnings,
		checkerboard,
		gamut,
		channel
	], applyUniforms);
	onUnmounted(dispose);
	return {
		exposureStops,
		dither,
		clipWarnings,
		checkerboard,
		gamut,
		channel,
		loading,
		error,
		dimensions,
		stats,
		histogram,
		pixel,
		mount,
		dispose,
		fitView,
		normalizeExposure
	};
}
//#endregion
//#region src/components/hdr/HdrViewerContent.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1 = { class: "flex size-full bg-base-background" };
var _hoisted_2 = { class: "relative flex-1" };
var _hoisted_3 = {
	key: 0,
	class: "absolute inset-0 flex items-center justify-center text-base-foreground"
};
var _hoisted_4 = {
	key: 1,
	role: "alert",
	class: "absolute inset-0 flex flex-col items-center justify-center gap-2 text-base-foreground"
};
var _hoisted_5 = { class: "text-sm" };
var _hoisted_6 = {
	key: 2,
	class: "absolute top-2 left-2 rounded-sm bg-base-background/80 px-2 py-1 font-mono text-xs text-base-foreground",
	"data-testid": "hdr-pixel-readout"
};
var _hoisted_7 = {
	class: "flex w-72 flex-col",
	"data-testid": "hdr-viewer-sidebar"
};
var _hoisted_8 = { class: "flex-1 overflow-y-auto p-4" };
var _hoisted_9 = { class: "space-y-2" };
var _hoisted_10 = { class: "space-y-4 p-2" };
var _hoisted_11 = { class: "flex flex-col gap-2" };
var _hoisted_12 = ["aria-label"];
var _hoisted_13 = { class: "space-y-4 p-2" };
var _hoisted_14 = { class: "flex flex-col gap-2" };
var _hoisted_15 = ["aria-label"];
var _hoisted_16 = ["value"];
var _hoisted_17 = { class: "flex flex-col gap-2" };
var _hoisted_18 = ["aria-label"];
var _hoisted_19 = ["value"];
var _hoisted_20 = { class: "space-y-4 p-2" };
var _hoisted_21 = { class: "flex items-center gap-2" };
var _hoisted_22 = {
	for: "hdr-dither",
	class: "cursor-pointer"
};
var _hoisted_23 = { class: "flex items-center gap-2" };
var _hoisted_24 = {
	for: "hdr-clip",
	class: "cursor-pointer"
};
var _hoisted_25 = { class: "flex items-center gap-2" };
var _hoisted_26 = {
	for: "hdr-checkerboard",
	class: "cursor-pointer"
};
var _hoisted_27 = {
	key: 0,
	class: "space-y-2 p-2"
};
var _hoisted_28 = {
	viewBox: "0 0 1 1",
	preserveAspectRatio: "none",
	class: "aspect-3/2 w-full rounded-sm bg-secondary-background"
};
var _hoisted_29 = ["d"];
var _hoisted_30 = {
	key: 1,
	class: "space-y-1 p-2 text-xs tabular-nums"
};
var _hoisted_31 = {
	key: 0,
	class: "flex justify-between"
};
var _hoisted_32 = { class: "flex justify-between" };
var _hoisted_33 = { class: "flex justify-between" };
var _hoisted_34 = { class: "flex justify-between" };
var _hoisted_35 = { class: "flex justify-between" };
var _hoisted_36 = {
	key: 1,
	class: "flex justify-between text-error"
};
var _hoisted_37 = {
	key: 2,
	class: "flex justify-between text-error"
};
var _hoisted_38 = { class: "p-4" };
var _hoisted_39 = { class: "flex gap-2" };
//#endregion
//#region src/components/hdr/HdrViewerContent.vue
var HdrViewerContent_default = /* @__PURE__ */ defineComponent({
	__name: "HdrViewerContent",
	props: { imageUrl: {} },
	setup(__props) {
		const { t } = useI18n();
		const viewer = useHdrViewer();
		const gamutNames = GAMUT_NAMES;
		const channelModes = CHANNEL_MODES;
		const containerRef = useTemplateRef("containerRef");
		const exposureLabel = computed(() => {
			const value = viewer.exposureStops.value;
			return `${value > 0 ? "+" : ""}${value.toFixed(1)}`;
		});
		const histogramPath = computed(() => viewer.histogram.value ? histogramToPath(viewer.histogram.value) : "");
		const histogramColorClass = computed(() => {
			switch (viewer.channel.value) {
				case "r": return "text-red-500";
				case "g": return "text-green-500";
				case "b": return "text-blue-500";
				default: return "text-base-foreground";
			}
		});
		const channelLabels = computed(() => ({
			rgb: t("hdrViewer.channels.rgb"),
			r: t("hdrViewer.channels.r"),
			g: t("hdrViewer.channels.g"),
			b: t("hdrViewer.channels.b"),
			a: t("hdrViewer.channels.a"),
			luminance: t("hdrViewer.channels.luminance")
		}));
		function formatNum(value) {
			if (!Number.isFinite(value)) return String(value);
			return Math.abs(value) >= 1e3 || value !== 0 && Math.abs(value) < .001 ? value.toExponential(3) : value.toFixed(4);
		}
		function handleDownload() {
			downloadFile(toFullResolutionUrl(__props.imageUrl));
		}
		onMounted(() => {
			if (containerRef.value) viewer.mount(containerRef.value, __props.imageUrl);
		});
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", _hoisted_1, [createBaseVNode("div", _hoisted_2, [
				createBaseVNode("div", {
					ref_key: "containerRef",
					ref: containerRef,
					class: "absolute size-full",
					"data-testid": "hdr-viewer-canvas"
				}, null, 512),
				unref(viewer).loading.value ? (openBlock(), createElementBlock("div", _hoisted_3, toDisplayString(_ctx.$t("g.loading")) + "... ", 1)) : unref(viewer).error.value ? (openBlock(), createElementBlock("div", _hoisted_4, [_cache[6] || (_cache[6] = createBaseVNode("i", { class: "icon-[lucide--image-off] size-12" }, null, -1)), createBaseVNode("p", _hoisted_5, toDisplayString(_ctx.$t("hdrViewer.failedToLoad")), 1)])) : createCommentVNode("", true),
				unref(viewer).pixel.value ? (openBlock(), createElementBlock("div", _hoisted_6, [createBaseVNode("div", null, toDisplayString(unref(viewer).pixel.value.x) + ", " + toDisplayString(unref(viewer).pixel.value.y), 1), createBaseVNode("div", null, [createTextVNode(toDisplayString(formatNum(unref(viewer).pixel.value.r)) + " " + toDisplayString(formatNum(unref(viewer).pixel.value.g)) + " " + toDisplayString(formatNum(unref(viewer).pixel.value.b)) + " ", 1), unref(viewer).pixel.value.a !== null ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [createTextVNode(toDisplayString(formatNum(unref(viewer).pixel.value.a)), 1)], 64)) : createCommentVNode("", true)])])) : createCommentVNode("", true)
			]), createBaseVNode("div", _hoisted_7, [createBaseVNode("div", _hoisted_8, [createBaseVNode("div", _hoisted_9, [
				createBaseVNode("div", _hoisted_10, [createBaseVNode("div", _hoisted_11, [createBaseVNode("label", null, toDisplayString(_ctx.$t("hdrViewer.exposure")) + ": " + toDisplayString(exposureLabel.value), 1), withDirectives(createBaseVNode("input", {
					"onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => unref(viewer).exposureStops.value = $event),
					type: "range",
					min: "-10",
					max: "10",
					step: "0.1",
					class: "w-full",
					"aria-label": _ctx.$t("hdrViewer.exposure")
				}, null, 8, _hoisted_12), [[
					vModelText,
					unref(viewer).exposureStops.value,
					void 0,
					{ number: true }
				]])]), createVNode(Button_default, {
					variant: "secondary",
					class: "w-full",
					onClick: unref(viewer).normalizeExposure
				}, {
					default: withCtx(() => [createTextVNode(toDisplayString(_ctx.$t("hdrViewer.normalizeExposure")), 1)]),
					_: 1
				}, 8, ["onClick"])]),
				createBaseVNode("div", _hoisted_13, [createBaseVNode("div", _hoisted_14, [createBaseVNode("label", null, toDisplayString(_ctx.$t("hdrViewer.channel")), 1), withDirectives(createBaseVNode("select", {
					"onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => unref(viewer).channel.value = $event),
					class: "w-full rounded-sm bg-secondary-background px-2 py-1",
					"aria-label": _ctx.$t("hdrViewer.channel")
				}, [(openBlock(true), createElementBlock(Fragment, null, renderList(unref(channelModes), (mode) => {
					return openBlock(), createElementBlock("option", {
						key: mode,
						value: mode
					}, toDisplayString(channelLabels.value[mode]), 9, _hoisted_16);
				}), 128))], 8, _hoisted_15), [[vModelSelect, unref(viewer).channel.value]])]), createBaseVNode("div", _hoisted_17, [createBaseVNode("label", null, toDisplayString(_ctx.$t("hdrViewer.sourceGamut")), 1), withDirectives(createBaseVNode("select", {
					"onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => unref(viewer).gamut.value = $event),
					class: "w-full rounded-sm bg-secondary-background px-2 py-1",
					"aria-label": _ctx.$t("hdrViewer.sourceGamut")
				}, [(openBlock(true), createElementBlock(Fragment, null, renderList(unref(gamutNames), (name) => {
					return openBlock(), createElementBlock("option", {
						key: name,
						value: name
					}, toDisplayString(name), 9, _hoisted_19);
				}), 128))], 8, _hoisted_18), [[vModelSelect, unref(viewer).gamut.value]])])]),
				createBaseVNode("div", _hoisted_20, [
					createBaseVNode("div", _hoisted_21, [withDirectives(createBaseVNode("input", {
						id: "hdr-dither",
						"onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => unref(viewer).dither.value = $event),
						type: "checkbox",
						class: "size-4 cursor-pointer accent-node-component-surface-highlight"
					}, null, 512), [[vModelCheckbox, unref(viewer).dither.value]]), createBaseVNode("label", _hoisted_22, toDisplayString(_ctx.$t("hdrViewer.dither")), 1)]),
					createBaseVNode("div", _hoisted_23, [withDirectives(createBaseVNode("input", {
						id: "hdr-clip",
						"onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => unref(viewer).clipWarnings.value = $event),
						type: "checkbox",
						class: "size-4 cursor-pointer accent-node-component-surface-highlight"
					}, null, 512), [[vModelCheckbox, unref(viewer).clipWarnings.value]]), createBaseVNode("label", _hoisted_24, toDisplayString(_ctx.$t("hdrViewer.clipWarnings")), 1)]),
					createBaseVNode("div", _hoisted_25, [withDirectives(createBaseVNode("input", {
						id: "hdr-checkerboard",
						"onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => unref(viewer).checkerboard.value = $event),
						type: "checkbox",
						class: "size-4 cursor-pointer accent-node-component-surface-highlight"
					}, null, 512), [[vModelCheckbox, unref(viewer).checkerboard.value]]), createBaseVNode("label", _hoisted_26, toDisplayString(_ctx.$t("hdrViewer.checkerboard")), 1)])
				]),
				histogramPath.value ? (openBlock(), createElementBlock("div", _hoisted_27, [createBaseVNode("label", null, toDisplayString(_ctx.$t("hdrViewer.histogram")), 1), (openBlock(), createElementBlock("svg", _hoisted_28, [createBaseVNode("path", {
					d: histogramPath.value,
					class: normalizeClass(histogramColorClass.value),
					fill: "currentColor",
					"fill-opacity": "0.5",
					stroke: "none"
				}, null, 10, _hoisted_29)]))])) : createCommentVNode("", true),
				unref(viewer).stats.value ? (openBlock(), createElementBlock("div", _hoisted_30, [
					unref(viewer).dimensions.value ? (openBlock(), createElementBlock("div", _hoisted_31, [createBaseVNode("span", null, toDisplayString(_ctx.$t("hdrViewer.resolution")), 1), createBaseVNode("span", null, toDisplayString(unref(viewer).dimensions.value), 1)])) : createCommentVNode("", true),
					createBaseVNode("div", _hoisted_32, [createBaseVNode("span", null, toDisplayString(_ctx.$t("hdrViewer.min")), 1), createBaseVNode("span", null, toDisplayString(formatNum(unref(viewer).stats.value.min)), 1)]),
					createBaseVNode("div", _hoisted_33, [createBaseVNode("span", null, toDisplayString(_ctx.$t("hdrViewer.max")), 1), createBaseVNode("span", null, toDisplayString(formatNum(unref(viewer).stats.value.max)), 1)]),
					createBaseVNode("div", _hoisted_34, [createBaseVNode("span", null, toDisplayString(_ctx.$t("hdrViewer.mean")), 1), createBaseVNode("span", null, toDisplayString(formatNum(unref(viewer).stats.value.mean)), 1)]),
					createBaseVNode("div", _hoisted_35, [createBaseVNode("span", null, toDisplayString(_ctx.$t("hdrViewer.stdDev")), 1), createBaseVNode("span", null, toDisplayString(formatNum(unref(viewer).stats.value.stdDev)), 1)]),
					unref(viewer).stats.value.nanCount ? (openBlock(), createElementBlock("div", _hoisted_36, [createBaseVNode("span", null, toDisplayString(_ctx.$t("hdrViewer.nan")), 1), createBaseVNode("span", null, toDisplayString(unref(viewer).stats.value.nanCount), 1)])) : createCommentVNode("", true),
					unref(viewer).stats.value.infCount ? (openBlock(), createElementBlock("div", _hoisted_37, [createBaseVNode("span", null, toDisplayString(_ctx.$t("hdrViewer.inf")), 1), createBaseVNode("span", null, toDisplayString(unref(viewer).stats.value.infCount), 1)])) : createCommentVNode("", true)
				])) : createCommentVNode("", true)
			])]), createBaseVNode("div", _hoisted_38, [createBaseVNode("div", _hoisted_39, [createVNode(Button_default, {
				variant: "secondary",
				class: "flex-1",
				onClick: unref(viewer).fitView
			}, {
				default: withCtx(() => [createTextVNode(toDisplayString(_ctx.$t("hdrViewer.fitView")), 1)]),
				_: 1
			}, 8, ["onClick"]), createVNode(Button_default, {
				variant: "secondary",
				class: "flex-1",
				onClick: handleDownload
			}, {
				default: withCtx(() => [createTextVNode(toDisplayString(_ctx.$t("g.downloadImage")), 1)]),
				_: 1
			})])])])]);
		};
	}
});
//#endregion
export { HdrViewerContent_default as default };
