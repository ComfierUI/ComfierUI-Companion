import "./rolldown-runtime-xtsTai4I.js";
import { D as createPolygonEdgesGeometry, E as polygonMeshFromTriangles, zt as delay } from "./vendor-other-BPEcPQTD.js";
import { Ct as Scene, Et as SkinnedMesh, F as Color, G as GridHelper, It as Vector2, Lt as Vector3, Mt as TextureLoader, Nt as Timer, R as DirectionalLight, Rt as Vector4, S as AmbientLight, St as SRGBColorSpace, X as LineBasicMaterial, Z as LineSegments, bt as Quaternion, ct as MeshBasicMaterial, f as ViewHelper, g as FXAAShader, gt as PlaneGeometry, h as OrbitControls, jt as Texture, mt as PerspectiveCamera, nt as Material, p as SparkRenderer, pt as OrthographicCamera, q as HalfFloatType, st as Mesh, ut as MeshNormalMaterial, wt as ShaderMaterial, x as WebGLRenderer, zt as WebGLRenderTarget } from "./vendor-three-DQpYrwAh.js";
import { E as denormalize, O as normalize, f as Load3dUtils } from "./layoutStore-CZsuzg91.js";
import { t as exceedsClickThreshold } from "./useClickDragGuard-C9dEHod_.js";
//#region src/renderer/three/highPrecisionOutput.ts
var FXAA_SAMPLE = "return texture( tex2D, uv );";
var resolveVertexShader = `
  uniform vec2 uvScale;
  varying vec2 vUv;

  void main() {
    vUv = uv * uvScale;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;
function createRegionFxaaFragmentShader() {
	return FXAAShader.fragmentShader.replace("uniform vec2 resolution;", "uniform vec2 resolution;\nuniform vec2 uvScale;").replace(FXAA_SAMPLE, "return texture( tex2D, clamp( uv, 0.5 * resolution, uvScale - 0.5 * resolution ) );");
}
function createHighPrecisionTarget(width = 1, height = 1) {
	const target = new WebGLRenderTarget(width, height, {
		type: HalfFloatType,
		depthBuffer: true
	});
	return Object.assign(target, { isXRRenderTarget: true });
}
function ensureTargetSize(target, width, height) {
	if (target.width >= width && target.height >= height) return;
	target.setSize(Math.max(target.width, width), Math.max(target.height, height));
}
function createFxaaResolve() {
	const material = new ShaderMaterial({
		uniforms: {
			tDiffuse: { value: null },
			resolution: { value: new Vector2() },
			uvScale: { value: new Vector2(1, 1) }
		},
		vertexShader: resolveVertexShader,
		fragmentShader: createRegionFxaaFragmentShader(),
		blending: 0,
		depthTest: false,
		depthWrite: false
	});
	const geometry = new PlaneGeometry(2, 2);
	const quad = new Mesh(geometry, material);
	quad.frustumCulled = false;
	const scene = new Scene();
	scene.add(quad);
	const camera = new OrthographicCamera(-1, 1, 1, -1, 0, 1);
	return {
		render(renderer, source, width, height) {
			material.uniforms.tDiffuse.value = source.texture;
			material.uniforms.resolution.value.set(1 / source.width, 1 / source.height);
			material.uniforms.uvScale.value.set(width / source.width, height / source.height);
			renderer.setRenderTarget(null);
			renderer.setScissorTest(false);
			renderer.setViewport(0, 0, width, height);
			renderer.render(scene, camera);
		},
		dispose() {
			geometry.dispose();
			material.dispose();
		}
	};
}
//#endregion
//#region src/renderer/three/sharedWebGLRenderer.ts
function createRendererViewState() {
	return {
		toneMapping: 0,
		toneMappingExposure: 1,
		outputColorSpace: SRGBColorSpace,
		clearColor: new Color(0),
		clearAlpha: 0
	};
}
function applyRendererViewState(renderer, state) {
	renderer.toneMapping = state.toneMapping;
	renderer.toneMappingExposure = state.toneMappingExposure;
	renderer.outputColorSpace = state.outputColorSpace;
	renderer.setClearColor(state.clearColor, state.clearAlpha);
}
var sharedRenderer = null;
var viewCount = 0;
var sharedHighPrecisionTarget = null;
var sharedFxaaResolve = null;
function createSharedRenderer() {
	const renderer = new WebGLRenderer({
		alpha: true,
		antialias: true
	});
	renderer.setPixelRatio(1);
	renderer.setSize(300, 300);
	renderer.autoClear = false;
	renderer.outputColorSpace = SRGBColorSpace;
	return renderer;
}
function acquireSharedRenderer() {
	sharedRenderer ??= createSharedRenderer();
	viewCount++;
	const renderer = sharedRenderer;
	let released = false;
	return {
		renderer,
		release() {
			if (released) return;
			released = true;
			viewCount--;
			if (viewCount > 0 || sharedRenderer !== renderer) return;
			sharedRenderer = null;
			sharedHighPrecisionTarget?.dispose();
			sharedHighPrecisionTarget = null;
			sharedFxaaResolve?.dispose();
			sharedFxaaResolve = null;
			renderer.forceContextLoss();
			renderer.domElement.dispatchEvent(new Event("webglcontextlost", {
				bubbles: true,
				cancelable: true
			}));
			renderer.dispose();
		}
	};
}
function ensureRendererSize(renderer, width, height) {
	const size = renderer.getSize(new Vector2());
	if (size.width >= width && size.height >= height) return;
	renderer.setSize(Math.max(size.width, width), Math.max(size.height, height));
}
function ensureSharedHighPrecisionTarget(width, height) {
	sharedHighPrecisionTarget ??= createHighPrecisionTarget();
	ensureTargetSize(sharedHighPrecisionTarget, width, height);
	return sharedHighPrecisionTarget;
}
function resolveHighPrecisionTarget(renderer, source, width, height) {
	sharedFxaaResolve ??= createFxaaResolve();
	sharedFxaaResolve.render(renderer, source, width, height);
}
//#endregion
//#region src/renderer/three/RendererView.ts
var RendererView = class {
	renderer;
	canvas;
	state = createRendererViewState();
	width = 1;
	height = 1;
	context;
	handle;
	resizeObserver = null;
	outputTarget = null;
	outputWidth = 1;
	outputHeight = 1;
	constructor(container) {
		this.canvas = document.createElement("canvas");
		this.canvas.classList.add("absolute", "inset-0", "h-full", "w-full", "outline-none");
		const context = this.canvas.getContext("2d");
		if (!context) throw new Error("Failed to create 2D context for 3D view");
		this.context = context;
		this.handle = acquireSharedRenderer();
		this.renderer = this.handle.renderer;
		container.appendChild(this.canvas);
	}
	setSize(width, height) {
		this.width = Math.max(1, Math.round(width));
		this.height = Math.max(1, Math.round(height));
		if (this.canvas.width !== this.width) this.canvas.width = this.width;
		if (this.canvas.height !== this.height) this.canvas.height = this.height;
		ensureRendererSize(this.renderer, this.width, this.height);
	}
	beginRender(highPrecision = false) {
		ensureRendererSize(this.renderer, this.width, this.height);
		applyRendererViewState(this.renderer, this.state);
		this.bindOutput(highPrecision ? ensureSharedHighPrecisionTarget(this.width, this.height) : null, this.width, this.height);
	}
	bindOutput(target, width, height) {
		this.outputTarget = target;
		this.outputWidth = width;
		this.outputHeight = height;
		if (target) target.texture.colorSpace = this.state.outputColorSpace;
		this.renderer.setRenderTarget(target);
		this.setViewport(0, 0, width, height);
		this.setScissor(0, 0, width, height);
		this.setScissorTest(false);
	}
	resolveOutput() {
		if (!this.outputTarget) return;
		resolveHighPrecisionTarget(this.renderer, this.outputTarget, this.outputWidth, this.outputHeight);
		this.outputTarget = null;
	}
	setViewport(x, y, width, height) {
		this.renderer.setViewport(x, y, width, height);
		this.outputTarget?.viewport.set(x, y, width, height);
	}
	getViewport(target) {
		return this.renderer.getViewport(target);
	}
	setScissor(x, y, width, height) {
		this.renderer.setScissor(x, y, width, height);
		this.outputTarget?.scissor.set(x, y, width, height);
	}
	setScissorTest(enabled) {
		this.renderer.setScissorTest(enabled);
		if (this.outputTarget) this.outputTarget.scissorTest = enabled;
	}
	blit() {
		this.resolveOutput();
		const source = this.renderer.domElement;
		this.context.globalCompositeOperation = "copy";
		this.context.drawImage(source, 0, source.height - this.height, this.width, this.height, 0, 0, this.width, this.height);
	}
	observeResize(target, onResize) {
		if (typeof ResizeObserver === "undefined") return;
		this.resizeObserver?.disconnect();
		this.resizeObserver = new ResizeObserver(() => onResize());
		this.resizeObserver.observe(target);
	}
	dispose() {
		this.resizeObserver?.disconnect();
		this.resizeObserver = null;
		this.canvas.remove();
		this.handle.release();
	}
};
//#endregion
//#region src/extensions/core/load3d/CameraManager.ts
function resolveIncomingCustomUp(state) {
	if (state.useCustomUp === void 0) return null;
	const storedUp = state.customUp ? new Vector3(state.customUp.x, state.customUp.y, state.customUp.z) : null;
	if (storedUp && storedUp.lengthSq() > 0) return storedUp;
	if (!state.useCustomUp || !state.quaternion) return null;
	const q = new Quaternion(state.quaternion.x, state.quaternion.y, state.quaternion.z, state.quaternion.w);
	if (q.lengthSq() === 0) q.identity();
	return new Vector3(0, 1, 0).applyQuaternion(q);
}
var CameraManager = class {
	perspectiveCamera;
	orthographicCamera;
	activeCamera;
	eventManager;
	controls = null;
	customUp = null;
	usingCustomUp = false;
	DEFAULT_DISTANCE = 10;
	DEFAULT_LOOK_AT = 0;
	DEFAULT_CAMERA = {
		near: .01,
		far: 1e4
	};
	DEFAULT_PERSPECTIVE_CAMERA = {
		fov: 35,
		aspect: 1
	};
	DEFAULT_FRUSTUM_SIZE = 10;
	DEFAULT_ORTHOGRAPHIC_CAMERA = {
		left: -this.DEFAULT_FRUSTUM_SIZE / 2,
		right: this.DEFAULT_FRUSTUM_SIZE / 2,
		top: this.DEFAULT_FRUSTUM_SIZE / 2,
		bottom: -this.DEFAULT_FRUSTUM_SIZE / 2
	};
	constructor(_renderer, eventManager) {
		this.eventManager = eventManager;
		this.perspectiveCamera = new PerspectiveCamera(this.DEFAULT_PERSPECTIVE_CAMERA.fov, this.DEFAULT_PERSPECTIVE_CAMERA.aspect, this.DEFAULT_CAMERA.near, this.DEFAULT_CAMERA.far);
		this.orthographicCamera = new OrthographicCamera(this.DEFAULT_ORTHOGRAPHIC_CAMERA.left, this.DEFAULT_ORTHOGRAPHIC_CAMERA.right, this.DEFAULT_ORTHOGRAPHIC_CAMERA.top, this.DEFAULT_ORTHOGRAPHIC_CAMERA.bottom, this.DEFAULT_CAMERA.near, this.DEFAULT_CAMERA.far);
		this.reset();
		this.activeCamera = this.perspectiveCamera;
	}
	init() {}
	dispose() {}
	setControls(controls) {
		this.controls = controls;
		controls.addEventListener("end", () => {
			this.eventManager.emitEvent("cameraChanged", this.getCameraState());
		});
	}
	getCurrentCameraType() {
		return this.activeCamera === this.perspectiveCamera ? "perspective" : "orthographic";
	}
	toggleCamera(cameraType) {
		const oldCamera = this.activeCamera;
		const position = oldCamera.position.clone();
		const rotation = oldCamera.rotation.clone();
		const up = oldCamera.up.clone();
		const target = this.controls?.target.clone() || new Vector3();
		const oldZoom = oldCamera instanceof OrthographicCamera ? oldCamera.zoom : oldCamera.zoom;
		if (!cameraType) this.activeCamera = oldCamera === this.perspectiveCamera ? this.orthographicCamera : this.perspectiveCamera;
		else {
			this.activeCamera = cameraType === "perspective" ? this.perspectiveCamera : this.orthographicCamera;
			if (oldCamera === this.activeCamera) return;
		}
		this.activeCamera.position.copy(position);
		this.activeCamera.rotation.copy(rotation);
		this.activeCamera.up.copy(up);
		if (this.activeCamera instanceof OrthographicCamera) {
			this.activeCamera.zoom = oldZoom;
			this.activeCamera.updateProjectionMatrix();
		} else if (this.activeCamera instanceof PerspectiveCamera) {
			this.activeCamera.zoom = oldZoom;
			this.activeCamera.updateProjectionMatrix();
		}
		if (this.controls) {
			this.controls.object = this.activeCamera;
			this.controls.target.copy(target);
			this.controls.update();
		}
		this.eventManager.emitEvent("cameraTypeChange", cameraType);
	}
	setFOV(fov) {
		if (this.activeCamera === this.perspectiveCamera) {
			this.perspectiveCamera.fov = fov;
			this.perspectiveCamera.updateProjectionMatrix();
		}
		this.eventManager.emitEvent("fovChange", fov);
	}
	getCameraState() {
		const { x, y, z, w } = this.activeCamera.quaternion;
		const activeCamera = this.activeCamera;
		return {
			position: this.activeCamera.position.clone(),
			target: this.controls?.target.clone() || new Vector3(),
			zoom: this.activeCamera instanceof OrthographicCamera ? this.activeCamera.zoom : this.activeCamera.zoom,
			cameraType: this.getCurrentCameraType(),
			quaternion: {
				x,
				y,
				z,
				w
			},
			...this.customUp !== null && {
				useCustomUp: this.usingCustomUp,
				customUp: {
					x: this.customUp.x,
					y: this.customUp.y,
					z: this.customUp.z
				}
			},
			fov: this.perspectiveCamera.fov,
			aspect: this.perspectiveCamera.aspect,
			near: activeCamera.near,
			far: activeCamera.far,
			frustum: {
				left: this.orthographicCamera.left,
				right: this.orthographicCamera.right,
				top: this.orthographicCamera.top,
				bottom: this.orthographicCamera.bottom
			}
		};
	}
	setCameraState(state) {
		if (state.cameraType !== this.getCurrentCameraType()) this.toggleCamera(state.cameraType);
		this.activeCamera.position.copy(state.position);
		this.controls?.target.copy(state.target);
		if (state.fov !== void 0 && this.activeCamera instanceof PerspectiveCamera) this.activeCamera.fov = state.fov;
		if (this.activeCamera instanceof OrthographicCamera) {
			this.activeCamera.zoom = state.zoom;
			this.activeCamera.updateProjectionMatrix();
		} else if (this.activeCamera instanceof PerspectiveCamera) {
			this.activeCamera.zoom = state.zoom;
			this.activeCamera.updateProjectionMatrix();
		}
		const incomingUp = resolveIncomingCustomUp(state);
		if (incomingUp) {
			this.customUp = incomingUp;
			this.usingCustomUp = state.useCustomUp === true;
			this.activeCamera.up.copy(this.usingCustomUp ? incomingUp : new Vector3(0, 1, 0));
			this.eventManager.emitEvent("cameraUpStateChange", {
				hasCustomUp: true,
				usingCustomUp: this.usingCustomUp
			});
		} else if (this.customUp !== null) {
			this.customUp = null;
			this.usingCustomUp = false;
			this.activeCamera.up.set(0, 1, 0);
			this.eventManager.emitEvent("cameraUpStateChange", {
				hasCustomUp: false,
				usingCustomUp: false
			});
		}
		this.controls?.update();
	}
	setUseCustomUp(use) {
		if (use && !this.customUp) return;
		if (use === this.usingCustomUp) return;
		const target = use && this.customUp ? this.customUp : new Vector3(0, 1, 0);
		this.activeCamera.up.copy(target);
		this.usingCustomUp = use;
		this.controls?.update();
		this.eventManager.emitEvent("cameraUpStateChange", {
			hasCustomUp: this.customUp !== null,
			usingCustomUp: this.usingCustomUp
		});
	}
	handleResize(width, height) {
		const aspect = width / height;
		this.updateAspectRatio(aspect);
	}
	updateAspectRatio(aspect) {
		if (this.activeCamera === this.perspectiveCamera) {
			this.perspectiveCamera.aspect = aspect;
			this.perspectiveCamera.updateProjectionMatrix();
		} else {
			const frustumSize = 10;
			this.orthographicCamera.left = -10 * aspect / 2;
			this.orthographicCamera.right = frustumSize * aspect / 2;
			this.orthographicCamera.top = frustumSize / 2;
			this.orthographicCamera.bottom = -5;
			this.orthographicCamera.updateProjectionMatrix();
		}
	}
	setupForModel(size, center = new Vector3(0, size.y / 2, 0)) {
		const maxDim = Math.max(size.x, size.y, size.z);
		const distance = Math.max(size.x, size.z) * 2;
		const height = center.y + maxDim;
		this.perspectiveCamera.position.set(center.x + distance, height, center.z + distance);
		this.orthographicCamera.position.set(center.x + distance, height, center.z + distance);
		if (this.activeCamera === this.perspectiveCamera) {
			this.perspectiveCamera.lookAt(center);
			this.perspectiveCamera.updateProjectionMatrix();
		} else {
			const frustumSize = maxDim * 2;
			const aspect = this.perspectiveCamera.aspect;
			this.orthographicCamera.left = -frustumSize * aspect / 2;
			this.orthographicCamera.right = frustumSize * aspect / 2;
			this.orthographicCamera.top = frustumSize / 2;
			this.orthographicCamera.bottom = -frustumSize / 2;
			this.orthographicCamera.lookAt(center);
			this.orthographicCamera.updateProjectionMatrix();
		}
		this.controls?.target.copy(center);
		this.controls?.update();
	}
	reset() {
		this.perspectiveCamera.position.set(this.DEFAULT_DISTANCE, this.DEFAULT_DISTANCE, this.DEFAULT_DISTANCE);
		this.orthographicCamera.position.set(this.DEFAULT_DISTANCE, this.DEFAULT_DISTANCE, this.DEFAULT_DISTANCE);
		this.perspectiveCamera.lookAt(this.DEFAULT_LOOK_AT, this.DEFAULT_LOOK_AT, this.DEFAULT_LOOK_AT);
		this.orthographicCamera.lookAt(this.DEFAULT_LOOK_AT, this.DEFAULT_LOOK_AT, this.DEFAULT_LOOK_AT);
		this.perspectiveCamera.updateProjectionMatrix();
		this.orthographicCamera.updateProjectionMatrix();
	}
};
window.comfyAPI = window.comfyAPI || {};
window.comfyAPI.CameraManager = window.comfyAPI.CameraManager || {};
window.comfyAPI.CameraManager.CameraManager = CameraManager;
//#endregion
//#region src/extensions/core/load3d/ControlsManager.ts
var ControlsManager = class {
	controls;
	constructor(interactionElement, camera) {
		this.controls = new OrbitControls(camera, interactionElement);
		this.controls.enableDamping = true;
	}
	init() {}
	dispose() {
		this.controls.dispose();
	}
	handleResize() {}
	update() {
		this.controls.update();
	}
	updateCamera(camera) {
		const position = this.controls.object.position.clone();
		const target = this.controls.target.clone();
		this.controls.object = camera;
		this.controls.target = target;
		camera.position.copy(position);
		this.controls.update();
	}
	detach() {
		this.controls.enabled = false;
	}
	attach() {
		this.controls.enabled = true;
	}
	reset() {
		this.controls.target.set(0, 0, 0);
		this.controls.update();
	}
};
window.comfyAPI = window.comfyAPI || {};
window.comfyAPI.ControlsManager = window.comfyAPI.ControlsManager || {};
window.comfyAPI.ControlsManager.ControlsManager = ControlsManager;
//#endregion
//#region src/extensions/core/load3d/EventManager.ts
var EventManager = class {
	listeners = {};
	addEventListener(event, callback) {
		(this.listeners[event] ??= []).push(callback);
	}
	removeEventListener(event, callback) {
		this.listeners[event] = this.listeners[event]?.filter((cb) => cb !== callback);
	}
	emitEvent(event, data) {
		this.listeners[event]?.forEach((callback) => callback(data));
	}
};
window.comfyAPI = window.comfyAPI || {};
window.comfyAPI.EventManager = window.comfyAPI.EventManager || {};
window.comfyAPI.EventManager.EventManager = EventManager;
//#endregion
//#region src/extensions/core/load3d/LightingManager.ts
var LightingManager = class {
	lights = [];
	currentIntensity = 3;
	scene;
	eventManager;
	lightMultipliers = /* @__PURE__ */ new Map();
	constructor(scene, eventManager) {
		this.scene = scene;
		this.eventManager = eventManager;
	}
	init() {
		this.setupLights();
	}
	dispose() {
		this.lights.forEach((light) => {
			this.scene.remove(light);
		});
		this.lights = [];
		this.lightMultipliers.clear();
	}
	setupLights() {
		const addLight = (light, multiplier) => {
			this.scene.add(light);
			this.lights.push(light);
			this.lightMultipliers.set(light, multiplier);
		};
		addLight(new AmbientLight(16777215, .5), .5);
		const mainLight = new DirectionalLight(16777215, .8);
		mainLight.position.set(0, 10, 10);
		addLight(mainLight, .8);
		const backLight = new DirectionalLight(16777215, .5);
		backLight.position.set(0, 10, -10);
		addLight(backLight, .5);
		const leftFillLight = new DirectionalLight(16777215, .3);
		leftFillLight.position.set(-10, 0, 0);
		addLight(leftFillLight, .3);
		const rightFillLight = new DirectionalLight(16777215, .3);
		rightFillLight.position.set(10, 0, 0);
		addLight(rightFillLight, .3);
		const bottomLight = new DirectionalLight(16777215, .2);
		bottomLight.position.set(0, -10, 0);
		addLight(bottomLight, .2);
	}
	setLightIntensity(intensity) {
		this.currentIntensity = intensity;
		this.lights.forEach((light) => {
			light.intensity = intensity * (this.lightMultipliers.get(light) ?? 1);
		});
		this.eventManager.emitEvent("lightIntensityChange", intensity);
	}
	setHDRIMode(hdriActive) {
		this.lights.forEach((light) => {
			light.visible = !hdriActive;
		});
	}
	reset() {}
};
window.comfyAPI = window.comfyAPI || {};
window.comfyAPI.LightingManager = window.comfyAPI.LightingManager || {};
window.comfyAPI.LightingManager.LightingManager = LightingManager;
//#endregion
//#region src/extensions/core/load3d/quadWireframe/faceSizesRegistry.ts
var faceSizesByGeometry = /* @__PURE__ */ new WeakMap();
function registerFaceSizes(geometry, faceSizes) {
	faceSizesByGeometry.set(geometry, faceSizes);
}
function faceSizesFor(geometry) {
	return faceSizesByGeometry.get(geometry);
}
window.comfyAPI = window.comfyAPI || {};
window.comfyAPI.faceSizesRegistry = window.comfyAPI.faceSizesRegistry || {};
window.comfyAPI.faceSizesRegistry.registerFaceSizes = registerFaceSizes;
window.comfyAPI.faceSizesRegistry.faceSizesFor = faceSizesFor;
//#endregion
//#region src/extensions/core/load3d/quadWireframe/QuadWireframeManager.ts
var QuadWireframeOverlay = class extends LineSegments {};
var MAX_TRIANGLE_OUTLINE = 3e5;
function isDeforming(mesh) {
	const hasMorphs = Object.keys(mesh.geometry.morphAttributes).length > 0;
	return mesh instanceof SkinnedMesh || hasMorphs;
}
function triangleCount(geometry) {
	const corners = geometry.index?.count ?? geometry.getAttribute("position").count;
	return Math.floor(corners / 3);
}
var QuadWireframeManager = class {
	overlays = /* @__PURE__ */ new Map();
	cache = /* @__PURE__ */ new Map();
	material = new LineBasicMaterial({ color: 16777215 });
	show(model) {
		this.hide();
		const quads = [];
		const triangles = [];
		let triangleTotal = 0;
		model.traverse((child) => {
			if (!(child instanceof Mesh) || isDeforming(child)) return;
			if (faceSizesFor(child.geometry)) quads.push(child);
			else {
				triangles.push(child);
				triangleTotal += triangleCount(child.geometry);
			}
		});
		const outlined = triangleTotal > 3e5 ? quads : [...quads, ...triangles];
		for (const child of outlined) {
			const overlay = new QuadWireframeOverlay(this.edgesFor(child.geometry), this.material);
			overlay.renderOrder = 1;
			child.add(overlay);
			this.overlays.set(child, overlay);
		}
		return outlined;
	}
	hide() {
		for (const [mesh, overlay] of this.overlays) mesh.remove(overlay);
		this.overlays.clear();
	}
	clear() {
		this.hide();
		for (const edges of this.cache.values()) edges.dispose();
		this.cache.clear();
	}
	dispose() {
		this.clear();
		this.material.dispose();
	}
	edgesFor(geometry) {
		let edges = this.cache.get(geometry);
		if (!edges) {
			edges = createPolygonEdgesGeometry(polygonMeshFromTriangles(geometry, faceSizesFor(geometry)));
			this.cache.set(geometry, edges);
		}
		return edges;
	}
};
window.comfyAPI = window.comfyAPI || {};
window.comfyAPI.QuadWireframeManager = window.comfyAPI.QuadWireframeManager || {};
window.comfyAPI.QuadWireframeManager.QuadWireframeOverlay = QuadWireframeOverlay;
window.comfyAPI.QuadWireframeManager.MAX_TRIANGLE_OUTLINE = MAX_TRIANGLE_OUTLINE;
window.comfyAPI.QuadWireframeManager.QuadWireframeManager = QuadWireframeManager;
//#endregion
//#region src/extensions/core/load3d/SceneManager.ts
var SPLAT_SORT_TIMEOUT_MS = 5e3;
var SPLAT_SORT_POLL_MS = 16;
var SceneManager = class {
	scene;
	gridHelper;
	sparkRenderer;
	nextSparkDirtyPromise = null;
	nextSparkDirtyResolve = null;
	awaitNextSparkDirty() {
		if (this.nextSparkDirtyPromise) return this.nextSparkDirtyPromise;
		this.nextSparkDirtyPromise = new Promise((resolve) => {
			this.nextSparkDirtyResolve = resolve;
		});
		return this.nextSparkDirtyPromise;
	}
	async whenSplatsSorted(camera) {
		const spark = this.sparkRenderer;
		await spark.update({
			scene: this.scene,
			camera
		});
		const deadline = performance.now() + SPLAT_SORT_TIMEOUT_MS;
		while ((spark.sorting || spark.sortDirty) && performance.now() < deadline) await delay(SPLAT_SORT_POLL_MS);
	}
	hasSplats() {
		return this.sparkRenderer.activeSplats > 0;
	}
	backgroundScene;
	backgroundCamera;
	backgroundMesh = null;
	backgroundTexture = null;
	backgroundRenderMode = "tiled";
	backgroundColorMaterial = null;
	currentBackgroundType = "color";
	currentBackgroundColor = "#282828";
	eventManager;
	renderer;
	view;
	getActiveCamera;
	constructor(view, getActiveCamera, _getControls, eventManager) {
		this.view = view;
		this.renderer = view.renderer;
		this.eventManager = eventManager;
		this.scene = new Scene();
		this.scene.name = "MainScene";
		this.getActiveCamera = getActiveCamera;
		this.sparkRenderer = new SparkRenderer({
			renderer: view.renderer,
			onDirty: () => {
				const resolve = this.nextSparkDirtyResolve;
				this.nextSparkDirtyResolve = null;
				this.nextSparkDirtyPromise = null;
				resolve?.();
			}
		});
		this.scene.add(this.sparkRenderer);
		this.gridHelper = new GridHelper(20, 20);
		this.gridHelper.position.set(0, 0, 0);
		this.scene.add(this.gridHelper);
		this.backgroundScene = new Scene();
		this.backgroundScene.name = "BackgroundScene";
		this.backgroundCamera = new OrthographicCamera(-1, 1, 1, -1, -1, 1);
		this.initBackgroundScene();
	}
	initBackgroundScene() {
		const planeGeometry = new PlaneGeometry(2, 2);
		this.backgroundColorMaterial = new MeshBasicMaterial({
			color: new Color(this.currentBackgroundColor),
			transparent: false,
			depthWrite: false,
			depthTest: false,
			side: 2
		});
		this.backgroundMesh = new Mesh(planeGeometry, this.backgroundColorMaterial);
		this.backgroundMesh.position.set(0, 0, 0);
		this.backgroundScene.add(this.backgroundMesh);
		this.view.state.clearColor.set(0);
		this.view.state.clearAlpha = 0;
	}
	init() {}
	dispose() {
		if (this.backgroundTexture) this.backgroundTexture.dispose();
		if (this.backgroundColorMaterial) this.backgroundColorMaterial.dispose();
		if (this.backgroundMesh) {
			this.backgroundMesh.geometry.dispose();
			if (this.backgroundMesh.material instanceof Material) this.backgroundMesh.material.dispose();
		}
		if (this.scene.background) this.scene.background = null;
		this.backgroundScene.clear();
		this.scene.clear();
	}
	toggleGrid(showGrid) {
		this.gridHelper.visible = showGrid;
		this.eventManager.emitEvent("showGridChange", showGrid);
	}
	setBackgroundColor(color) {
		this.currentBackgroundColor = color;
		this.currentBackgroundType = "color";
		if (this.scene.background instanceof Texture) this.scene.background = null;
		if (this.backgroundRenderMode === "panorama") {
			this.backgroundRenderMode = "tiled";
			this.eventManager.emitEvent("backgroundRenderModeChange", "tiled");
		}
		if (!this.backgroundMesh || !this.backgroundColorMaterial) this.initBackgroundScene();
		this.backgroundColorMaterial.color.set(color);
		this.backgroundColorMaterial.map = null;
		this.backgroundColorMaterial.transparent = false;
		this.backgroundColorMaterial.needsUpdate = true;
		if (this.backgroundMesh) this.backgroundMesh.material = this.backgroundColorMaterial;
		if (this.backgroundTexture) {
			this.backgroundTexture.dispose();
			this.backgroundTexture = null;
		}
		this.eventManager.emitEvent("backgroundColorChange", color);
	}
	async setBackgroundImage(uploadPath) {
		if (uploadPath === "") {
			this.setBackgroundColor(this.currentBackgroundColor);
			return;
		}
		this.eventManager.emitEvent("backgroundImageLoadingStart", null);
		let type = "input";
		let pathParts = Load3dUtils.splitFilePath(uploadPath);
		const subfolder = pathParts[0];
		const filename = pathParts[1];
		if (subfolder === "temp") {
			type = "temp";
			pathParts = ["", filename];
		} else if (subfolder === "output") {
			type = "output";
			pathParts = ["", filename];
		}
		let imageUrl = Load3dUtils.getResourceURL(...pathParts, type);
		if (!imageUrl.startsWith("/api")) imageUrl = "/api" + imageUrl;
		try {
			const textureLoader = new TextureLoader();
			const texture = await new Promise((resolve, reject) => {
				textureLoader.load(imageUrl, resolve, void 0, reject);
			});
			if (this.backgroundTexture) this.backgroundTexture.dispose();
			texture.colorSpace = SRGBColorSpace;
			this.backgroundTexture = texture;
			this.currentBackgroundType = "image";
			if (this.backgroundRenderMode === "panorama") {
				texture.mapping = 303;
				this.scene.background = texture;
			} else {
				if (!this.backgroundMesh) this.initBackgroundScene();
				const imageMaterial = new MeshBasicMaterial({
					map: texture,
					transparent: true,
					depthWrite: false,
					depthTest: false,
					side: 2
				});
				if (this.backgroundMesh) {
					if (this.backgroundMesh.material !== this.backgroundColorMaterial && this.backgroundMesh.material instanceof Material) this.backgroundMesh.material.dispose();
					this.backgroundMesh.material = imageMaterial;
					this.backgroundMesh.position.set(0, 0, 0);
				}
				this.updateBackgroundSize(this.backgroundTexture, this.backgroundMesh, this.view.canvas.clientWidth, this.view.canvas.clientHeight);
			}
			this.eventManager.emitEvent("backgroundImageChange", uploadPath);
			this.eventManager.emitEvent("backgroundImageLoadingEnd", null);
		} catch (error) {
			this.eventManager.emitEvent("backgroundImageLoadingEnd", null);
			console.error("Error loading background image:", error);
			this.setBackgroundColor(this.currentBackgroundColor);
		}
	}
	removeBackgroundImage() {
		this.setBackgroundColor(this.currentBackgroundColor);
		this.eventManager.emitEvent("backgroundImageLoadingEnd", null);
	}
	setBackgroundRenderMode(mode) {
		if (this.backgroundRenderMode === mode) return;
		this.backgroundRenderMode = mode;
		if (this.currentBackgroundType === "image" && this.backgroundTexture) try {
			if (mode === "panorama") {
				this.backgroundTexture.mapping = 303;
				this.scene.background = this.backgroundTexture;
			} else {
				this.scene.background = null;
				if (this.backgroundMesh && this.backgroundMesh.material instanceof MeshBasicMaterial) {
					this.backgroundMesh.material.map = this.backgroundTexture;
					this.backgroundMesh.material.needsUpdate = true;
				}
			}
		} catch (error) {
			console.error("Error set background render mode:", error);
		}
		this.eventManager.emitEvent("backgroundRenderModeChange", mode);
	}
	updateBackgroundSize(backgroundTexture, backgroundMesh, targetWidth, targetHeight) {
		if (!backgroundTexture || !backgroundMesh) return;
		const material = backgroundMesh.material;
		if (!material.map) return;
		const image = backgroundTexture.image;
		const imageAspect = image.width / image.height;
		const targetAspect = targetWidth / targetHeight;
		if (imageAspect > targetAspect) backgroundMesh.scale.set(imageAspect / targetAspect, 1, 1);
		else backgroundMesh.scale.set(1, targetAspect / imageAspect, 1);
		material.needsUpdate = true;
	}
	handleResize(width, height) {
		if (this.backgroundTexture && this.backgroundMesh && this.currentBackgroundType === "image") this.updateBackgroundSize(this.backgroundTexture, this.backgroundMesh, width, height);
	}
	renderBackground() {
		if ((this.backgroundRenderMode === "tiled" || this.currentBackgroundType === "color") && this.backgroundMesh) {
			const currentToneMapping = this.renderer.toneMapping;
			const currentExposure = this.renderer.toneMappingExposure;
			this.renderer.toneMapping = 0;
			this.renderer.render(this.backgroundScene, this.backgroundCamera);
			this.renderer.toneMapping = currentToneMapping;
			this.renderer.toneMappingExposure = currentExposure;
		}
	}
	getCurrentBackgroundInfo() {
		return {
			type: this.currentBackgroundType,
			value: this.currentBackgroundType === "color" ? this.currentBackgroundColor : ""
		};
	}
	async captureScene(width, height) {
		this.view.beginRender();
		const originalSize = new Vector2();
		this.renderer.getSize(originalSize);
		const originalPixelRatio = this.renderer.getPixelRatio();
		const originalClearColor = this.renderer.getClearColor(new Color());
		const originalClearAlpha = this.renderer.getClearAlpha();
		const originalOutputColorSpace = this.renderer.outputColorSpace;
		const activeCamera = this.getActiveCamera();
		const savedCameraParams = activeCamera instanceof PerspectiveCamera ? {
			type: "perspective",
			aspect: activeCamera.aspect
		} : {
			type: "orthographic",
			left: activeCamera.left,
			right: activeCamera.right,
			top: activeCamera.top,
			bottom: activeCamera.bottom
		};
		const originalMaterials = /* @__PURE__ */ new Map();
		const tempMaterials = [];
		const hiddenOverlays = [];
		const gridVisible = this.gridHelper.visible;
		const captureTarget = this.hasSplats() ? createHighPrecisionTarget(width, height) : null;
		const capturePass = (draw) => {
			this.view.bindOutput(captureTarget, width, height);
			draw();
			this.view.resolveOutput();
			return this.renderer.domElement.toDataURL("image/png");
		};
		try {
			this.renderer.setPixelRatio(1);
			this.renderer.setSize(width, height);
			if (activeCamera instanceof PerspectiveCamera) {
				activeCamera.aspect = width / height;
				activeCamera.updateProjectionMatrix();
			} else {
				const orthographicCamera = activeCamera;
				const frustumSize = 10;
				const aspect = width / height;
				orthographicCamera.left = -10 * aspect / 2;
				orthographicCamera.right = frustumSize * aspect / 2;
				orthographicCamera.top = frustumSize / 2;
				orthographicCamera.bottom = -5;
				orthographicCamera.updateProjectionMatrix();
			}
			if (this.backgroundTexture && this.backgroundMesh && this.currentBackgroundType === "image") this.updateBackgroundSize(this.backgroundTexture, this.backgroundMesh, width, height);
			const sceneData = capturePass(() => {
				this.renderer.clear();
				this.renderBackground();
				this.renderer.render(this.scene, activeCamera);
			});
			this.renderer.setClearColor(0, 0);
			const maskData = capturePass(() => {
				this.renderer.clear();
				this.renderer.render(this.scene, activeCamera);
			});
			this.scene.traverse((child) => {
				if (child instanceof Mesh) {
					originalMaterials.set(child, child.material);
					const tempMaterial = new MeshNormalMaterial({
						flatShading: false,
						side: 2,
						normalScale: new Vector2(1, 1)
					});
					tempMaterials.push(tempMaterial);
					child.material = tempMaterial;
				} else if (child instanceof QuadWireframeOverlay && child.visible) {
					hiddenOverlays.push(child);
					child.visible = false;
				}
			});
			this.gridHelper.visible = false;
			this.renderer.setClearColor(0, 1);
			const normalData = capturePass(() => {
				this.renderer.clear();
				this.renderer.render(this.scene, activeCamera);
			});
			this.renderer.setClearColor(16777215, 1);
			this.renderer.clear();
			return {
				scene: sceneData,
				mask: maskData,
				normal: normalData
			};
		} finally {
			this.view.bindOutput(null, width, height);
			captureTarget?.dispose();
			this.scene.traverse((child) => {
				if (child instanceof Mesh) {
					const originalMaterial = originalMaterials.get(child);
					if (originalMaterial) child.material = originalMaterial;
				}
			});
			for (const mat of tempMaterials) mat.dispose();
			for (const overlay of hiddenOverlays) overlay.visible = true;
			this.gridHelper.visible = gridVisible;
			if (savedCameraParams.type === "perspective") {
				const persp = activeCamera;
				persp.aspect = savedCameraParams.aspect;
				persp.updateProjectionMatrix();
			} else {
				const ortho = activeCamera;
				ortho.left = savedCameraParams.left;
				ortho.right = savedCameraParams.right;
				ortho.top = savedCameraParams.top;
				ortho.bottom = savedCameraParams.bottom;
				ortho.updateProjectionMatrix();
			}
			this.renderer.setClearColor(originalClearColor, originalClearAlpha);
			this.renderer.setPixelRatio(originalPixelRatio);
			this.renderer.setSize(originalSize.x, originalSize.y);
			this.renderer.outputColorSpace = originalOutputColorSpace;
			this.handleResize(this.view.canvas.clientWidth, this.view.canvas.clientHeight);
		}
	}
	reset() {}
};
window.comfyAPI = window.comfyAPI || {};
window.comfyAPI.SceneManager = window.comfyAPI.SceneManager || {};
window.comfyAPI.SceneManager.SceneManager = SceneManager;
//#endregion
//#region src/extensions/core/load3d/ViewHelperManager.ts
var ViewHelperManager = class {
	viewHelper = null;
	viewHelperContainer = null;
	getActiveCamera;
	getControls;
	getCameraState;
	eventManager;
	helperCamera = new OrthographicCamera(-2, 2, 2, -2, 0, 4);
	savedViewport = new Vector4();
	constructor(_renderer, getActiveCamera, getControls, getCameraState, eventManager) {
		this.getActiveCamera = getActiveCamera;
		this.getControls = getControls;
		this.getCameraState = getCameraState;
		this.eventManager = eventManager;
		this.helperCamera.position.set(0, 0, 2);
	}
	init() {}
	render(view, size) {
		const helper = this.viewHelper;
		if (!helper) return;
		helper.quaternion.copy(this.getActiveCamera().quaternion).invert();
		helper.updateMatrixWorld();
		view.renderer.clearDepth();
		const { x, y, z, w } = view.getViewport(this.savedViewport);
		view.setViewport(0, 0, size, size);
		view.renderer.render(helper, this.helperCamera);
		view.setViewport(x, y, z, w);
	}
	dispose() {
		this.viewHelper?.dispose();
		this.viewHelperContainer?.remove();
	}
	createViewHelper(container) {
		const helperContainer = document.createElement("div");
		helperContainer.style.position = "absolute";
		helperContainer.style.bottom = "0";
		helperContainer.style.left = "0";
		helperContainer.style.width = "128px";
		helperContainer.style.height = "128px";
		helperContainer.addEventListener("pointerup", (event) => {
			event.stopPropagation();
			this.viewHelper?.handleClick(event);
		});
		helperContainer.addEventListener("pointerdown", (event) => {
			event.stopPropagation();
		});
		container.appendChild(helperContainer);
		this.viewHelperContainer = helperContainer;
		this.viewHelper = this.buildViewHelper(helperContainer);
	}
	update(delta) {
		const helper = this.viewHelper;
		if (!helper) return;
		const { animating } = helper;
		if (!animating) return;
		helper.update(delta);
		if (!helper.animating) this.eventManager.emitEvent("cameraChanged", this.getCameraState());
	}
	handleResize() {}
	visibleViewHelper(visible) {
		if (this.viewHelper) this.viewHelper.visible = visible;
		if (this.viewHelperContainer) this.viewHelperContainer.style.display = visible ? "block" : "none";
	}
	recreateViewHelper() {
		if (!this.viewHelperContainer) return;
		this.viewHelper?.dispose();
		this.viewHelper = this.buildViewHelper(this.viewHelperContainer);
	}
	buildViewHelper(container) {
		const helper = new ViewHelper(this.getActiveCamera(), container);
		helper.center = this.getControls().target;
		return helper;
	}
	reset() {}
};
window.comfyAPI = window.comfyAPI || {};
window.comfyAPI.ViewHelperManager = window.comfyAPI.ViewHelperManager || {};
window.comfyAPI.ViewHelperManager.ViewHelperManager = ViewHelperManager;
//#endregion
//#region src/extensions/core/load3d/load3dContextMenuGuard.ts
function attachContextMenuGuard(target, onMenu, { isDisabled = () => false, dragThreshold = 5 } = {}) {
	const abort = new AbortController();
	const { signal } = abort;
	let start = {
		x: 0,
		y: 0
	};
	let moved = false;
	target.addEventListener("mousedown", (e) => {
		if (e.button === 2) {
			start = {
				x: e.clientX,
				y: e.clientY
			};
			moved = false;
		}
	}, { signal });
	target.addEventListener("mousemove", (e) => {
		if (e.buttons === 2 && exceedsClickThreshold(start, {
			x: e.clientX,
			y: e.clientY
		}, dragThreshold)) moved = true;
	}, { signal });
	target.addEventListener("contextmenu", (e) => {
		if (isDisabled()) return;
		const wasDragging = moved || exceedsClickThreshold(start, {
			x: e.clientX,
			y: e.clientY
		}, dragThreshold);
		moved = false;
		if (wasDragging) return;
		e.preventDefault();
		e.stopPropagation();
		onMenu(e);
	}, { signal });
	return () => abort.abort();
}
window.comfyAPI = window.comfyAPI || {};
window.comfyAPI.load3dContextMenuGuard = window.comfyAPI.load3dContextMenuGuard || {};
window.comfyAPI.load3dContextMenuGuard.attachContextMenuGuard = attachContextMenuGuard;
//#endregion
//#region src/extensions/core/load3d/load3dRenderLoop.ts
function startRenderLoop({ tick, isActive }) {
	let frameId = null;
	const loop = () => {
		frameId = requestAnimationFrame(loop);
		if (!isActive()) return;
		tick();
	};
	loop();
	return { stop() {
		if (frameId !== null) {
			cancelAnimationFrame(frameId);
			frameId = null;
		}
	} };
}
window.comfyAPI = window.comfyAPI || {};
window.comfyAPI.load3dRenderLoop = window.comfyAPI.load3dRenderLoop || {};
window.comfyAPI.load3dRenderLoop.startRenderLoop = startRenderLoop;
//#endregion
//#region src/extensions/core/load3d/load3dViewport.ts
function computeLetterboxedViewport(container, targetAspectRatio) {
	if (container.width / container.height > targetAspectRatio) {
		const height = container.height;
		const width = height * targetAspectRatio;
		return {
			offsetX: (container.width - width) / 2,
			offsetY: 0,
			width,
			height
		};
	}
	const width = container.width;
	const height = width / targetAspectRatio;
	return {
		offsetX: 0,
		offsetY: (container.height - height) / 2,
		width,
		height
	};
}
function clientPointToLetterboxNdc(normalizedX, normalizedY, container, targetAspectRatio) {
	const toNdc = (localX, localY) => ({
		x: denormalize(localX, -1, 1),
		y: -denormalize(localY, -1, 1),
		inside: localX >= 0 && localX <= 1 && localY >= 0 && localY <= 1
	});
	if (targetAspectRatio === null) return toNdc(normalizedX, normalizedY);
	const { offsetX, offsetY, width, height } = computeLetterboxedViewport(container, targetAspectRatio);
	if (width <= 0 || height <= 0) return null;
	return toNdc(normalize(normalizedX * container.width, offsetX, offsetX + width), normalize(normalizedY * container.height, offsetY, offsetY + height));
}
function computeLetterboxBars(container, viewport) {
	if (viewport.offsetX >= 1) return [{
		x: 0,
		y: 0,
		width: viewport.offsetX,
		height: container.height
	}, {
		x: viewport.offsetX + viewport.width,
		y: 0,
		width: container.width - viewport.offsetX - viewport.width,
		height: container.height
	}];
	if (viewport.offsetY >= 1) return [{
		x: 0,
		y: 0,
		width: container.width,
		height: viewport.offsetY
	}, {
		x: 0,
		y: viewport.offsetY + viewport.height,
		width: container.width,
		height: container.height - viewport.offsetY - viewport.height
	}];
	return [];
}
function isLoad3dActive(flags) {
	return flags.mouseOnNode || flags.mouseOnScene || flags.mouseOnViewer || flags.recording || !flags.initialRenderDone || flags.animationPlaying;
}
window.comfyAPI = window.comfyAPI || {};
window.comfyAPI.load3dViewport = window.comfyAPI.load3dViewport || {};
window.comfyAPI.load3dViewport.computeLetterboxedViewport = computeLetterboxedViewport;
window.comfyAPI.load3dViewport.clientPointToLetterboxNdc = clientPointToLetterboxNdc;
window.comfyAPI.load3dViewport.computeLetterboxBars = computeLetterboxBars;
window.comfyAPI.load3dViewport.isLoad3dActive = isLoad3dActive;
//#endregion
//#region src/extensions/core/load3d/Viewport3d.ts
var LETTERBOX_CLEAR_COLOR = 657930;
var LETTERBOX_DIM_OPACITY = .5;
function supportsViewOffset(camera) {
	return camera instanceof PerspectiveCamera || camera instanceof OrthographicCamera;
}
function createLetterboxDimmer() {
	const geometry = new PlaneGeometry(2, 2);
	const material = new MeshBasicMaterial({
		color: 0,
		transparent: true,
		opacity: LETTERBOX_DIM_OPACITY,
		depthTest: false,
		depthWrite: false
	});
	const scene = new Scene();
	scene.add(new Mesh(geometry, material));
	return {
		scene,
		camera: new OrthographicCamera(-1, 1, 1, -1, -1, 1),
		geometry,
		material
	};
}
var VIEW_HELPER_SIZE = 128;
var Viewport3d = class {
	view;
	timer;
	renderLoop = null;
	onContextMenuCallback;
	getDimensionsCallback;
	eventManager;
	sceneManager;
	cameraManager;
	controlsManager;
	lightingManager;
	viewHelperManager;
	STATUS_MOUSE_ON_NODE;
	STATUS_MOUSE_ON_SCENE;
	STATUS_MOUSE_ON_VIEWER;
	INITIAL_RENDER_DONE = false;
	targetWidth = 0;
	targetHeight = 0;
	targetAspectRatio = 1;
	isViewerMode = false;
	disposeContextMenuGuard = null;
	getZoomScaleCallback;
	externalActiveCamera = null;
	overlay = null;
	initialRenderTimer = null;
	viewPixelScale = 1;
	letterboxDimmer = null;
	constructor(container, deps, options = {}) {
		this.view = deps.view;
		this.timer = new Timer();
		this.isViewerMode = options.isViewerMode || false;
		this.onContextMenuCallback = options.onContextMenu;
		this.getDimensionsCallback = options.getDimensions;
		this.getZoomScaleCallback = options.getZoomScale;
		if (options.width !== void 0 && options.height !== void 0) this.applyTargetSize(options.width, options.height);
		this.eventManager = deps.eventManager;
		this.sceneManager = deps.sceneManager;
		this.cameraManager = deps.cameraManager;
		this.controlsManager = deps.controlsManager;
		this.lightingManager = deps.lightingManager;
		this.viewHelperManager = deps.viewHelperManager;
		this.sceneManager.init();
		this.cameraManager.init();
		this.controlsManager.init();
		this.lightingManager.init();
		this.viewHelperManager.createViewHelper(container);
		this.viewHelperManager.init();
		this.STATUS_MOUSE_ON_NODE = false;
		this.STATUS_MOUSE_ON_SCENE = false;
		this.STATUS_MOUSE_ON_VIEWER = false;
		this.initContextMenu();
		this.view.observeResize(container, () => this.handleResize());
	}
	get renderer() {
		return this.view.renderer;
	}
	get rendererView() {
		return this.view;
	}
	get domElement() {
		return this.view.canvas;
	}
	start() {
		if (this.hasStarted) return;
		this.hasStarted = true;
		this.handleResize();
		this.startAnimation();
		this.initialRenderTimer = setTimeout(() => {
			this.initialRenderTimer = null;
			this.forceRender();
		}, 100);
	}
	hasStarted = false;
	applyTargetSize(width, height) {
		if (!Number.isFinite(width) || !Number.isFinite(height)) return;
		if (width <= 0 || height <= 0) return;
		this.targetWidth = width;
		this.targetHeight = height;
		this.targetAspectRatio = width / height;
	}
	initContextMenu() {
		this.disposeContextMenuGuard = attachContextMenuGuard(this.view.canvas, (event) => this.onContextMenuCallback?.(event), { isDisabled: () => this.isViewerMode });
	}
	getEventManager() {
		return this.eventManager;
	}
	getSceneManager() {
		return this.sceneManager;
	}
	getCameraManager() {
		return this.cameraManager;
	}
	getControlsManager() {
		return this.controlsManager;
	}
	getLightingManager() {
		return this.lightingManager;
	}
	getViewHelperManager() {
		return this.viewHelperManager;
	}
	getTargetSize() {
		return {
			width: this.targetWidth,
			height: this.targetHeight
		};
	}
	shouldMaintainAspectRatio() {
		return this.isViewerMode || this.targetWidth > 0 && this.targetHeight > 0;
	}
	forceRender() {
		const delta = this.timer.update().getDelta();
		this.tickPerFrame(delta);
		this.renderView();
		this.INITIAL_RENDER_DONE = true;
	}
	renderView() {
		this.renderer.state.reset();
		this.view.beginRender(this.sceneManager.hasSplats());
		this.runPreRenderCallbacks();
		this.renderMainScene();
		this.runPostRenderCallbacks();
		this.view.setScissorTest(false);
		this.viewHelperManager.render(this.view, VIEW_HELPER_SIZE * this.viewPixelScale);
		this.view.blit();
	}
	preRenderCallbacks = [];
	postRenderCallbacks = [];
	addPreRenderCallback(cb) {
		const registered = () => cb();
		this.preRenderCallbacks.push(registered);
		return () => {
			const i = this.preRenderCallbacks.indexOf(registered);
			if (i >= 0) this.preRenderCallbacks.splice(i, 1);
		};
	}
	addPostRenderCallback(cb) {
		const registered = () => cb();
		this.postRenderCallbacks.push(registered);
		return () => {
			const i = this.postRenderCallbacks.indexOf(registered);
			if (i >= 0) this.postRenderCallbacks.splice(i, 1);
		};
	}
	runPreRenderCallbacks() {
		for (const cb of Array.from(this.preRenderCallbacks)) cb();
	}
	runPostRenderCallbacks() {
		for (const cb of Array.from(this.postRenderCallbacks)) cb();
	}
	tickPerFrame(delta) {
		this.overlay?.update?.(delta);
		this.viewHelperManager.update(delta);
		this.controlsManager.update();
	}
	getRenderCamera() {
		return this.externalActiveCamera ?? this.cameraManager.activeCamera;
	}
	setExternalActiveCamera(camera) {
		if (this.externalActiveCamera === camera) return;
		this.externalActiveCamera = camera;
		if (camera) {
			this.controlsManager.detach();
			this.viewHelperManager.visibleViewHelper(false);
		} else {
			this.controlsManager.attach();
			this.viewHelperManager.visibleViewHelper(true);
		}
		this.overlay?.onActiveCameraChange?.(this.getRenderCamera());
		this.forceRender();
	}
	setOverlay(overlay) {
		if (this.overlay === overlay) return;
		if (this.overlay) {
			this.overlay.detach();
			this.overlay.dispose();
		}
		this.overlay = overlay;
		overlay.attach(this.sceneManager.scene);
		overlay.onActiveCameraChange?.(this.getRenderCamera());
		this.forceRender();
	}
	removeOverlay() {
		if (!this.overlay) return;
		this.overlay.detach();
		this.overlay.dispose();
		this.overlay = null;
		this.forceRender();
	}
	getOverlay() {
		return this.overlay;
	}
	renderMainScene() {
		const viewWidth = this.view.width;
		const viewHeight = this.view.height;
		if (this.getDimensionsCallback) {
			const dims = this.getDimensionsCallback();
			if (dims) this.applyTargetSize(dims.width, dims.height);
		}
		this.view.setViewport(0, 0, viewWidth, viewHeight);
		this.view.setScissor(0, 0, viewWidth, viewHeight);
		this.view.setScissorTest(true);
		if (!this.shouldMaintainAspectRatio()) {
			this.renderer.setClearColor(this.view.state.clearColor, this.view.state.clearAlpha);
			this.renderer.clear();
			this.sceneManager.renderBackground();
			this.renderer.render(this.sceneManager.scene, this.getRenderCamera());
			return;
		}
		const container = {
			width: viewWidth,
			height: viewHeight
		};
		const viewport = computeLetterboxedViewport(container, this.targetAspectRatio);
		this.renderer.setClearColor(LETTERBOX_CLEAR_COLOR);
		this.renderer.clear();
		this.cameraManager.updateAspectRatio(viewport.width / viewport.height);
		const camera = this.getRenderCamera();
		if (!supportsViewOffset(camera)) {
			this.view.setViewport(viewport.offsetX, viewport.offsetY, viewport.width, viewport.height);
			this.view.setScissor(viewport.offsetX, viewport.offsetY, viewport.width, viewport.height);
			this.sceneManager.renderBackground();
			this.renderer.render(this.sceneManager.scene, camera);
			return;
		}
		camera.setViewOffset(viewport.width, viewport.height, -viewport.offsetX, -viewport.offsetY, viewWidth, viewHeight);
		this.renderLetterboxedBackground(viewport);
		this.renderer.render(this.sceneManager.scene, camera);
		camera.clearViewOffset();
		this.dimLetterboxBars(computeLetterboxBars(container, viewport));
	}
	renderLetterboxedBackground(viewport) {
		if (this.sceneManager.getCurrentBackgroundInfo().type !== "image") {
			this.sceneManager.renderBackground();
			return;
		}
		this.view.setViewport(viewport.offsetX, viewport.offsetY, viewport.width, viewport.height);
		this.view.setScissor(viewport.offsetX, viewport.offsetY, viewport.width, viewport.height);
		this.sceneManager.renderBackground();
		this.view.setViewport(0, 0, this.view.width, this.view.height);
		this.view.setScissor(0, 0, this.view.width, this.view.height);
	}
	dimLetterboxBars(bars) {
		if (bars.length === 0) return;
		const dimmer = this.letterboxDimmer ??= createLetterboxDimmer();
		for (const bar of bars) {
			this.view.setViewport(bar.x, bar.y, bar.width, bar.height);
			this.view.setScissor(bar.x, bar.y, bar.width, bar.height);
			this.renderer.render(dimmer.scene, dimmer.camera);
		}
	}
	clientPointToNdc(clientX, clientY) {
		const rect = this.domElement.getBoundingClientRect();
		if (rect.width <= 0 || rect.height <= 0) return null;
		return clientPointToLetterboxNdc(normalize(clientX, rect.left, rect.right), normalize(clientY, rect.top, rect.bottom), {
			width: rect.width,
			height: rect.height
		}, this.shouldMaintainAspectRatio() ? this.targetAspectRatio : null);
	}
	startAnimation() {
		this.renderLoop = startRenderLoop({
			tick: () => {
				const delta = this.timer.update().getDelta();
				this.tickPerFrame(delta);
				this.renderView();
			},
			isActive: () => this.isActive()
		});
	}
	updateStatusMouseOnNode(onNode) {
		this.STATUS_MOUSE_ON_NODE = onNode;
	}
	updateStatusMouseOnScene(onScene) {
		this.STATUS_MOUSE_ON_SCENE = onScene;
	}
	updateStatusMouseOnViewer(onViewer) {
		this.STATUS_MOUSE_ON_VIEWER = onViewer;
	}
	isActive() {
		return isLoad3dActive({
			mouseOnNode: this.STATUS_MOUSE_ON_NODE,
			mouseOnScene: this.STATUS_MOUSE_ON_SCENE,
			mouseOnViewer: this.STATUS_MOUSE_ON_VIEWER,
			recording: false,
			initialRenderDone: this.INITIAL_RENDER_DONE,
			animationPlaying: false
		});
	}
	toggleCamera(cameraType) {
		this.cameraManager.toggleCamera(cameraType);
		this.controlsManager.updateCamera(this.cameraManager.activeCamera);
		this.onActiveCameraChanged();
		this.viewHelperManager.recreateViewHelper();
		if (!this.externalActiveCamera) this.overlay?.onActiveCameraChange?.(this.cameraManager.activeCamera);
		this.handleResize();
	}
	onActiveCameraChanged() {}
	getCurrentCameraType() {
		return this.cameraManager.getCurrentCameraType();
	}
	setCameraState(state) {
		this.cameraManager.setCameraState(state);
		this.forceRender();
	}
	getCameraState() {
		return this.cameraManager.getCameraState();
	}
	setUseCustomUp(use) {
		this.cameraManager.setUseCustomUp(use);
		this.forceRender();
	}
	setTargetSize(width, height) {
		this.applyTargetSize(width, height);
		this.handleResize();
	}
	addEventListener(event, callback) {
		this.eventManager.addEventListener(event, callback);
	}
	removeEventListener(event, callback) {
		this.eventManager.removeEventListener(event, callback);
	}
	refreshViewport() {
		this.handleResize();
	}
	handleResize() {
		const parentElement = this.view.canvas.parentElement;
		if (!parentElement) {
			console.warn("Parent element not found");
			return;
		}
		const containerWidth = parentElement.clientWidth;
		const containerHeight = parentElement.clientHeight;
		const zoomScale = this.getZoomScaleCallback?.() ?? 1;
		this.viewPixelScale = Math.min(zoomScale, 3);
		if (this.getDimensionsCallback) {
			const dims = this.getDimensionsCallback();
			if (dims) this.applyTargetSize(dims.width, dims.height);
		}
		this.view.setSize(containerWidth * this.viewPixelScale, containerHeight * this.viewPixelScale);
		if (this.shouldMaintainAspectRatio()) {
			const { width, height } = computeLetterboxedViewport({
				width: containerWidth,
				height: containerHeight
			}, this.targetAspectRatio);
			this.cameraManager.handleResize(width, height);
			this.sceneManager.handleResize(width, height);
		} else {
			this.cameraManager.handleResize(containerWidth, containerHeight);
			this.sceneManager.handleResize(containerWidth, containerHeight);
		}
		this.forceRender();
	}
	remove() {
		if (this.initialRenderTimer) {
			clearTimeout(this.initialRenderTimer);
			this.initialRenderTimer = null;
		}
		this.disposeContextMenuGuard?.();
		this.disposeContextMenuGuard = null;
		this.renderLoop?.stop();
		this.renderLoop = null;
		this.disposeManagers();
		this.view.dispose();
	}
	disposeManagers() {
		if (this.overlay) {
			this.overlay.detach();
			this.overlay.dispose();
			this.overlay = null;
		}
		if (this.letterboxDimmer) {
			this.letterboxDimmer.geometry.dispose();
			this.letterboxDimmer.material.dispose();
			this.letterboxDimmer = null;
		}
		this.sceneManager.dispose();
		this.cameraManager.dispose();
		this.controlsManager.dispose();
		this.lightingManager.dispose();
		this.viewHelperManager.dispose();
	}
};
window.comfyAPI = window.comfyAPI || {};
window.comfyAPI.Viewport3d = window.comfyAPI.Viewport3d || {};
window.comfyAPI.Viewport3d.Viewport3d = Viewport3d;
//#endregion
export { SceneManager as a, registerFaceSizes as c, ControlsManager as d, CameraManager as f, ViewHelperManager as i, LightingManager as l, computeLetterboxedViewport as n, QuadWireframeManager as o, RendererView as p, isLoad3dActive as r, QuadWireframeOverlay as s, Viewport3d as t, EventManager as u };
