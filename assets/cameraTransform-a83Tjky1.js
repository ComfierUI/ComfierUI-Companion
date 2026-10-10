import "./rolldown-runtime-xtsTai4I.js";
import { A as BufferGeometry, Ft as TubeGeometry, H as Float32BufferAttribute, It as Vector2, K as Group, Lt as Vector3, Ot as SphereGeometry, P as CatmullRomCurve3, Pt as TorusGeometry, X as LineBasicMaterial, Y as Line, bt as Quaternion, ct as MeshBasicMaterial, dt as MeshStandardMaterial, ht as Plane, mt as PerspectiveCamera, ot as Matrix4, pt as OrthographicCamera, st as Mesh } from "./vendor-three-DQpYrwAh.js";
import { E as withModifiers, F as createBaseVNode, G as defineComponent, Jt as normalizeClass, Kt as unref, L as createCommentVNode, Lt as ref, R as createElementBlock, ft as renderSlot, lt as openBlock } from "./vendor-vue-core-C1utdb0s.js";
import { Mo as useChainCallback } from "./layoutStore-CZsuzg91.js";
import { t as cn } from "./src-DI1bBfrb.js";
import { a as SceneManager, d as ControlsManager, f as CameraManager, i as ViewHelperManager, l as LightingManager, p as RendererView, t as Viewport3d, u as EventManager } from "./Viewport3d-1i6ZJT8U.js";
//#region src/components/load3d/ViewportWidgetShell.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1 = { class: "pointer-events-none absolute inset-x-0 top-0" };
var _hoisted_2 = {
	key: 0,
	class: "pointer-events-none absolute inset-x-0 bottom-0"
};
//#endregion
//#region src/components/load3d/ViewportWidgetShell.vue
var ViewportWidgetShell_default = /* @__PURE__ */ defineComponent({
	__name: "ViewportWidgetShell",
	props: { bottomClass: {} },
	emits: ["mouseenter", "mouseleave"],
	setup(__props, { expose: __expose, emit: __emit }) {
		const emit = __emit;
		const container = ref(null);
		const toolbar = ref(null);
		function focusContainer() {
			container.value?.focus();
		}
		__expose({
			container,
			toolbar
		});
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", {
				class: "relative size-full min-h-[300px]",
				onPointerdown: _cache[5] || (_cache[5] = withModifiers(() => {}, ["stop"])),
				onMousedown: _cache[6] || (_cache[6] = withModifiers(() => {}, ["stop"]))
			}, [
				createBaseVNode("div", {
					ref_key: "container",
					ref: container,
					class: "relative size-full",
					"data-capture-wheel": "true",
					tabindex: "-1",
					onPointerdown: withModifiers(focusContainer, ["stop"]),
					onContextmenu: _cache[0] || (_cache[0] = withModifiers(() => {}, ["stop", "prevent"])),
					onMouseenter: _cache[1] || (_cache[1] = ($event) => emit("mouseenter")),
					onMouseleave: _cache[2] || (_cache[2] = ($event) => emit("mouseleave"))
				}, null, 544),
				createBaseVNode("div", _hoisted_1, [createBaseVNode("div", {
					ref_key: "toolbar",
					ref: toolbar,
					class: "pointer-events-auto flex h-10 items-center gap-1 bg-interface-menu-surface px-2",
					onWheel: _cache[3] || (_cache[3] = withModifiers(() => {}, ["stop"]))
				}, [renderSlot(_ctx.$slots, "top")], 544)]),
				_ctx.$slots.bottom ? (openBlock(), createElementBlock("div", _hoisted_2, [createBaseVNode("div", {
					class: normalizeClass(unref(cn)("pointer-events-auto flex h-10 items-center gap-1 bg-interface-menu-surface px-2", __props.bottomClass)),
					onWheel: _cache[4] || (_cache[4] = withModifiers(() => {}, ["stop"]))
				}, [renderSlot(_ctx.$slots, "bottom")], 34)])) : createCommentVNode("", true)
			], 32);
		};
	}
});
//#endregion
//#region src/composables/useViewportNodeWiring.ts
function useViewportNodeWiring() {
	const wrappedWidgets = [];
	const wrappedSet = /* @__PURE__ */ new WeakSet();
	let wiredNode = null;
	let originalOnMouseEnter;
	let originalOnMouseLeave;
	let originalOnConnectionsChange;
	function wireWidgets(node, names, onChange) {
		for (const name of names) {
			const widget = node.widgets?.find((w) => w.name === name);
			if (!widget || wrappedSet.has(widget)) continue;
			wrappedSet.add(widget);
			const original = widget.callback;
			wrappedWidgets.push({
				widget,
				original
			});
			widget.callback = (value, ...rest) => {
				original?.call(widget, value, ...rest);
				onChange(widget);
			};
		}
	}
	function wireNode(node, hooks) {
		unwireNode();
		wiredNode = node;
		originalOnMouseEnter = node.onMouseEnter;
		originalOnMouseLeave = node.onMouseLeave;
		originalOnConnectionsChange = node.onConnectionsChange;
		node.onMouseEnter = useChainCallback(node.onMouseEnter, () => {
			const viewport = hooks.viewport();
			viewport?.updateStatusMouseOnNode(true);
			viewport?.refreshViewport();
		});
		node.onMouseLeave = useChainCallback(node.onMouseLeave, () => {
			hooks.viewport()?.updateStatusMouseOnNode(false);
		});
		if (hooks.onConnectionsChange) node.onConnectionsChange = useChainCallback(node.onConnectionsChange, hooks.onConnectionsChange);
	}
	function unwireNode() {
		if (!wiredNode) return;
		wiredNode.onMouseEnter = originalOnMouseEnter;
		wiredNode.onMouseLeave = originalOnMouseLeave;
		wiredNode.onConnectionsChange = originalOnConnectionsChange;
		wiredNode = null;
	}
	function unwire() {
		for (const { widget, original } of wrappedWidgets) {
			widget.callback = original;
			wrappedSet.delete(widget);
		}
		wrappedWidgets.length = 0;
		unwireNode();
	}
	return {
		wireWidgets,
		wireNode,
		unwire
	};
}
//#endregion
//#region src/extensions/core/cameraInfo/handles/OrbitHandles.ts
var RING_RADIUS = 1.5;
var HANDLE_RADIUS = .08;
var GLOW_RADIUS = .12;
var TUBE_RADIUS = .025;
var ARC_PITCH_LIMIT = 85;
var ARC_SEGMENTS = 32;
var YAW_COLOR = 54527;
var PITCH_COLOR = 16738047;
var DISTANCE_COLOR = 16763904;
var BASE_GLOW_OPACITY = .25;
var HOVER_GLOW_OPACITY = .6;
var HOVER_SCALE = 1.35;
var ORBIT_HANDLE_TYPES = {
	yaw: true,
	pitch: true,
	distance: true
};
var isOrbitHandleType = (value) => Object.hasOwn(ORBIT_HANDLE_TYPES, value);
var DEG2RAD$1 = Math.PI / 180;
function buildArcCurve({ min, max }) {
	const points = [];
	for (let deg = min; deg <= max; deg += 5) {
		const r = deg * DEG2RAD$1;
		points.push(new Vector3(0, RING_RADIUS * Math.sin(r), RING_RADIUS * Math.cos(r)));
	}
	return new CatmullRomCurve3(points);
}
function makeHandle(color, type) {
	const mesh = new Mesh(new SphereGeometry(HANDLE_RADIUS, 32, 32), new MeshStandardMaterial({
		color,
		emissive: color,
		emissiveIntensity: .7,
		roughness: .3,
		metalness: .2
	}));
	mesh.userData.handleType = type;
	return mesh;
}
function makeGlow(color) {
	return new Mesh(new SphereGeometry(GLOW_RADIUS, 16, 16), new MeshBasicMaterial({
		color,
		transparent: true,
		opacity: BASE_GLOW_OPACITY,
		depthWrite: false,
		blending: 2
	}));
}
var OrbitHandles = class {
	root = new Group();
	yawGroup = new Group();
	yawRing;
	pitchArc;
	distanceLine;
	distanceLineGeometry;
	yawHandle;
	pitchHandle;
	distanceHandle;
	yawHandleGlow;
	pitchHandleGlow;
	distanceHandleGlow;
	yawRingRadius;
	yawRingHeight;
	scene = null;
	disposed = false;
	constructor({ pitchLimits = {
		min: -85,
		max: ARC_PITCH_LIMIT
	}, yawRingLatitude = 0 } = {}) {
		this.root.name = "CameraInfoOrbitHandles";
		this.root.add(this.yawGroup);
		const latitude = yawRingLatitude * DEG2RAD$1;
		this.yawRingRadius = RING_RADIUS * Math.cos(latitude);
		this.yawRingHeight = RING_RADIUS * Math.sin(latitude);
		this.yawRing = new Mesh(new TorusGeometry(this.yawRingRadius, TUBE_RADIUS, 16, 96), new MeshBasicMaterial({
			color: YAW_COLOR,
			transparent: true,
			opacity: .55
		}));
		this.yawRing.rotation.x = Math.PI / 2;
		this.yawRing.position.y = this.yawRingHeight;
		this.root.add(this.yawRing);
		this.pitchArc = new Mesh(new TubeGeometry(buildArcCurve(pitchLimits), ARC_SEGMENTS, TUBE_RADIUS, 8, false), new MeshBasicMaterial({
			color: PITCH_COLOR,
			transparent: true,
			opacity: .55
		}));
		this.yawGroup.add(this.pitchArc);
		this.distanceLineGeometry = new BufferGeometry();
		this.distanceLineGeometry.setAttribute("position", new Float32BufferAttribute([
			0,
			0,
			0,
			0,
			0,
			1
		], 3));
		this.distanceLine = new Line(this.distanceLineGeometry, new LineBasicMaterial({
			color: DISTANCE_COLOR,
			transparent: true,
			opacity: .55
		}));
		this.yawGroup.add(this.distanceLine);
		this.yawHandle = makeHandle(YAW_COLOR, "yaw");
		this.yawHandleGlow = makeGlow(YAW_COLOR);
		this.yawHandle.add(this.yawHandleGlow);
		this.root.add(this.yawHandle);
		this.pitchHandle = makeHandle(PITCH_COLOR, "pitch");
		this.pitchHandleGlow = makeGlow(PITCH_COLOR);
		this.pitchHandle.add(this.pitchHandleGlow);
		this.yawGroup.add(this.pitchHandle);
		this.distanceHandle = makeHandle(DISTANCE_COLOR, "distance");
		this.distanceHandleGlow = makeGlow(DISTANCE_COLOR);
		this.distanceHandle.add(this.distanceHandleGlow);
		this.yawGroup.add(this.distanceHandle);
	}
	attach(scene) {
		this.scene = scene;
		scene.add(this.root);
	}
	detach() {
		if (!this.scene) return;
		this.scene.remove(this.root);
		this.scene = null;
	}
	dispose() {
		if (this.disposed) return;
		this.disposed = true;
		this.detach();
		const disposables = [
			this.yawRing.geometry,
			this.yawRing.material,
			this.pitchArc.geometry,
			this.pitchArc.material,
			this.distanceLineGeometry,
			this.distanceLine.material,
			this.yawHandle.geometry,
			this.yawHandle.material,
			this.pitchHandle.geometry,
			this.pitchHandle.material,
			this.distanceHandle.geometry,
			this.distanceHandle.material,
			this.yawHandleGlow.geometry,
			this.yawHandleGlow.material,
			this.pitchHandleGlow.geometry,
			this.pitchHandleGlow.material,
			this.distanceHandleGlow.geometry,
			this.distanceHandleGlow.material
		];
		for (const d of disposables) d.dispose();
	}
	setVisible(visible) {
		this.root.visible = visible;
	}
	isVisible() {
		return this.root.visible;
	}
	update(state) {
		const visible = state.mode === "orbit";
		this.root.visible = visible;
		if (!visible) return;
		this.root.position.set(state.target.x, state.target.y, state.target.z);
		const yawRad = state.orbit.yaw * DEG2RAD$1;
		const pitchRad = state.orbit.pitch * DEG2RAD$1;
		const cosP = Math.cos(pitchRad);
		const sinP = Math.sin(pitchRad);
		this.yawGroup.rotation.y = yawRad;
		this.yawHandle.position.set(this.yawRingRadius * Math.sin(yawRad), this.yawRingHeight, this.yawRingRadius * Math.cos(yawRad));
		this.pitchHandle.position.set(0, RING_RADIUS * sinP, RING_RADIUS * cosP);
		const endY = state.orbit.distance * sinP;
		const endZ = state.orbit.distance * cosP;
		this.distanceHandle.position.set(0, endY, endZ);
		const positions = this.distanceLineGeometry.attributes.position;
		positions.setXYZ(1, 0, endY, endZ);
		positions.needsUpdate = true;
	}
	pickableMeshes() {
		return [
			this.yawHandle,
			this.pitchHandle,
			this.distanceHandle
		];
	}
	setHovered(type) {
		const entries = [
			[
				this.yawHandle,
				this.yawHandleGlow,
				"yaw"
			],
			[
				this.pitchHandle,
				this.pitchHandleGlow,
				"pitch"
			],
			[
				this.distanceHandle,
				this.distanceHandleGlow,
				"distance"
			]
		];
		for (const [handle, glow, handleType] of entries) {
			const active = handleType === type;
			handle.scale.setScalar(active ? HOVER_SCALE : 1);
			glow.material.opacity = active ? HOVER_GLOW_OPACITY : BASE_GLOW_OPACITY;
		}
	}
	dragPlaneFor(type, state) {
		if (type === "yaw") return new Plane(new Vector3(0, 1, 0), -(state.target.y + this.yawRingHeight));
		const yawRad = state.orbit.yaw * DEG2RAD$1;
		const normal = new Vector3(-Math.cos(yawRad), 0, Math.sin(yawRad)).normalize();
		const targetVec = vec(state.target);
		return new Plane().setFromNormalAndCoplanarPoint(normal, targetVec);
	}
};
var vec = (v) => new Vector3(v.x, v.y, v.z);
window.comfyAPI = window.comfyAPI || {};
window.comfyAPI.OrbitHandles = window.comfyAPI.OrbitHandles || {};
window.comfyAPI.OrbitHandles.isOrbitHandleType = isOrbitHandleType;
window.comfyAPI.OrbitHandles.OrbitHandles = OrbitHandles;
//#endregion
//#region src/extensions/core/cameraInfo/handles/handlePicking.ts
var PICK_PIXEL_RADIUS = 14;
function readHandleType(object) {
	const { handleType } = object.userData;
	return typeof handleType === "string" ? handleType : null;
}
function toScreenPx(ndcX, ndcY, canvas) {
	return new Vector2((ndcX + 1) * .5 * canvas.clientWidth, (1 - (ndcY + 1) * .5) * canvas.clientHeight);
}
function pickHandleAtPointer(raycaster, pointerNdc, camera, targets, canvas) {
	if (targets.length === 0) return null;
	raycaster.setFromCamera(pointerNdc, camera);
	const hits = raycaster.intersectObjects(targets, false);
	if (hits.length > 0) return readHandleType(hits[0].object);
	const pointerPx = toScreenPx(pointerNdc.x, pointerNdc.y, canvas);
	const world = new Vector3();
	let best = null;
	let bestDistance = PICK_PIXEL_RADIUS;
	for (const target of targets) {
		target.getWorldPosition(world);
		if (world.clone().applyMatrix4(camera.matrixWorldInverse).z >= 0) continue;
		const ndc = world.project(camera);
		const distance = toScreenPx(ndc.x, ndc.y, canvas).distanceTo(pointerPx);
		if (distance < bestDistance) {
			bestDistance = distance;
			best = readHandleType(target);
		}
	}
	return best;
}
window.comfyAPI = window.comfyAPI || {};
window.comfyAPI.handlePicking = window.comfyAPI.handlePicking || {};
window.comfyAPI.handlePicking.pickHandleAtPointer = pickHandleAtPointer;
//#endregion
//#region src/extensions/core/cameraInfo/handles/pointerInteraction.ts
var PointerInteraction = class {
	host;
	handleDrag = null;
	freeDrag = null;
	hovered = null;
	pendingRotation = null;
	pendingDolly = null;
	pendingDragPointer = null;
	pendingHoverPointer = null;
	inputFrame = null;
	constructor(host) {
		this.host = host;
	}
	get hoveredHandle() {
		return this.hovered;
	}
	attach() {
		const canvas = this.host.canvas;
		canvas.addEventListener("pointerdown", this.onPointerDown);
		canvas.addEventListener("pointermove", this.onPointerMove);
		canvas.addEventListener("pointerup", this.onPointerUp);
		canvas.addEventListener("pointercancel", this.onPointerUp);
		canvas.addEventListener("pointerleave", this.onPointerLeave);
		canvas.addEventListener("wheel", this.onWheel, { passive: false });
	}
	detach() {
		const canvas = this.host.canvas;
		canvas.removeEventListener("pointerdown", this.onPointerDown);
		canvas.removeEventListener("pointermove", this.onPointerMove);
		canvas.removeEventListener("pointerup", this.onPointerUp);
		canvas.removeEventListener("pointercancel", this.onPointerUp);
		canvas.removeEventListener("pointerleave", this.onPointerLeave);
		canvas.removeEventListener("wheel", this.onWheel);
	}
	cancel() {
		this.cancelInputFrame();
		const wasDraggingHandle = this.handleDrag !== null;
		this.handleDrag = null;
		this.freeDrag = null;
		if (wasDraggingHandle) this.host.handleDragChanged(false);
		this.setHovered(null);
		this.host.canvas.style.cursor = this.host.idleCursor();
	}
	setHovered(type) {
		if (this.hovered === type) return;
		this.hovered = type;
		this.host.hoverChanged(type);
		this.host.canvas.style.cursor = this.host.idleCursor();
	}
	onPointerDown = (event) => {
		if (event.button !== 0) return;
		const type = this.host.pickHandle(event);
		if (type) {
			this.pendingHoverPointer = null;
			this.setHovered(type);
			this.handleDrag = {
				type,
				pointerId: event.pointerId
			};
			this.host.handleDragChanged(true);
		} else if (this.host.freeDragEnabled()) this.freeDrag = {
			pointerId: event.pointerId,
			lastX: event.clientX,
			lastY: event.clientY
		};
		else return;
		this.host.canvas.setPointerCapture(event.pointerId);
		this.host.canvas.style.cursor = "grabbing";
		event.stopPropagation();
	};
	onPointerMove = (event) => {
		if (this.freeDrag) {
			if (event.pointerId !== this.freeDrag.pointerId) return;
			const dx = event.clientX - this.freeDrag.lastX;
			const dy = event.clientY - this.freeDrag.lastY;
			this.freeDrag.lastX = event.clientX;
			this.freeDrag.lastY = event.clientY;
			this.pendingRotation = {
				dx: (this.pendingRotation?.dx ?? 0) + dx,
				dy: (this.pendingRotation?.dy ?? 0) + dy
			};
			this.scheduleInputFrame();
			return;
		}
		if (!this.handleDrag) {
			this.pendingHoverPointer = {
				clientX: event.clientX,
				clientY: event.clientY
			};
			this.scheduleInputFrame();
			return;
		}
		if (event.pointerId !== this.handleDrag.pointerId) return;
		this.pendingDragPointer = {
			clientX: event.clientX,
			clientY: event.clientY
		};
		this.scheduleInputFrame();
	};
	onPointerUp = (event) => {
		const active = this.freeDrag ?? this.handleDrag;
		if (!active || event.pointerId !== active.pointerId) return;
		this.flushInput();
		this.cancelInputFrame();
		if (this.host.canvas.hasPointerCapture(event.pointerId)) this.host.canvas.releasePointerCapture(event.pointerId);
		const wasDraggingHandle = this.handleDrag !== null;
		this.freeDrag = null;
		this.handleDrag = null;
		if (wasDraggingHandle) this.host.handleDragChanged(false);
		this.host.canvas.style.cursor = this.host.idleCursor();
	};
	onPointerLeave = () => {
		if (this.handleDrag || this.freeDrag) return;
		this.pendingHoverPointer = null;
		this.setHovered(null);
	};
	onWheel = (event) => {
		if (!this.host.wheelEnabled()) return;
		event.preventDefault();
		event.stopPropagation();
		this.pendingDolly = (this.pendingDolly ?? 0) + event.deltaY;
		this.scheduleInputFrame();
	};
	scheduleInputFrame() {
		if (this.inputFrame !== null) return;
		this.inputFrame = requestAnimationFrame(() => {
			this.inputFrame = null;
			this.flushInput();
		});
	}
	flushInput() {
		const rotation = this.pendingRotation;
		const dolly = this.pendingDolly;
		const dragPointer = this.pendingDragPointer;
		const hoverPointer = this.pendingHoverPointer;
		this.pendingRotation = null;
		this.pendingDolly = null;
		this.pendingDragPointer = null;
		this.pendingHoverPointer = null;
		if (dragPointer && this.handleDrag) this.host.dragHandle(this.handleDrag.type, dragPointer);
		else if (hoverPointer && !this.handleDrag) this.setHovered(this.host.pickHandle(hoverPointer));
		if (rotation) this.host.freeDrag(rotation.dx, rotation.dy);
		if (dolly !== null) this.host.wheel(dolly);
	}
	cancelInputFrame() {
		if (this.inputFrame !== null) {
			cancelAnimationFrame(this.inputFrame);
			this.inputFrame = null;
		}
		this.pendingRotation = null;
		this.pendingDolly = null;
		this.pendingDragPointer = null;
		this.pendingHoverPointer = null;
	}
};
window.comfyAPI = window.comfyAPI || {};
window.comfyAPI.pointerInteraction = window.comfyAPI.pointerInteraction || {};
window.comfyAPI.pointerInteraction.PointerInteraction = PointerInteraction;
var PREVIEW_PADDING = 8;
var PREVIEW_BORDER_COLOR = 2763306;
var PREVIEW_BACKGROUND_COLOR = 657930;
var DEFAULT_LAYOUT = {
	width: 200,
	height: 150,
	marginRight: PREVIEW_PADDING,
	marginBottom: PREVIEW_PADDING
};
function fitCameraAspect(camera, aspect) {
	if (!Number.isFinite(aspect) || aspect <= 0) return;
	if (camera instanceof PerspectiveCamera) {
		if (Math.abs(camera.aspect - aspect) < 1e-4) return;
		camera.aspect = aspect;
		camera.updateProjectionMatrix();
		return;
	}
	if (camera instanceof OrthographicCamera) {
		const half = (camera.top - camera.bottom) / 2 || 1;
		const left = -half * aspect;
		const right = half * aspect;
		if (Math.abs(camera.left - left) < 1e-4 && Math.abs(camera.right - right) < 1e-4) return;
		camera.left = left;
		camera.right = right;
		camera.updateProjectionMatrix();
	}
}
function withPreviewAspect(camera, aspect, render) {
	if (camera instanceof PerspectiveCamera) {
		const saved = camera.aspect;
		camera.aspect = aspect;
		camera.updateProjectionMatrix();
		render();
		camera.aspect = saved;
		camera.updateProjectionMatrix();
		return;
	}
	if (camera instanceof OrthographicCamera) {
		const { left, right, top, bottom } = camera;
		const half = (top - bottom) / 2 || 1;
		camera.left = -half * aspect;
		camera.right = half * aspect;
		camera.top = half;
		camera.bottom = -half;
		camera.updateProjectionMatrix();
		render();
		Object.assign(camera, {
			left,
			right,
			top,
			bottom
		});
		camera.updateProjectionMatrix();
		return;
	}
	render();
}
function fitsCanvas({ width, height, marginRight, marginBottom }, canvas) {
	return width > 0 && height > 0 && canvas.width >= width + marginRight * 2 && canvas.height >= height + marginBottom + PREVIEW_PADDING;
}
function renderInsetPreview({ renderer, view, canvas, scene, camera, hidden, layout = DEFAULT_LAYOUT, borderColor = PREVIEW_BORDER_COLOR, backgroundColor = PREVIEW_BACKGROUND_COLOR }) {
	if (!fitsCanvas(layout, canvas)) return;
	const { width, height, marginRight, marginBottom } = layout;
	const restore = hidden.filter((item) => item.isVisible()).map((item) => () => item.setVisible(true));
	for (const item of hidden) item.setVisible(false);
	const x = canvas.width - width - marginRight;
	const y = marginBottom;
	withPreviewAspect(camera, width / height, () => {
		view.setViewport(x - 1, y - 1, width + 2, height + 2);
		view.setScissor(x - 1, y - 1, width + 2, height + 2);
		view.setScissorTest(true);
		renderer.setClearColor(borderColor);
		renderer.clear();
		view.setViewport(x, y, width, height);
		view.setScissor(x, y, width, height);
		renderer.setClearColor(backgroundColor);
		renderer.clear();
		renderer.render(scene, camera);
	});
	for (const restoreItem of restore) restoreItem();
}
window.comfyAPI = window.comfyAPI || {};
window.comfyAPI.subjectCameraPreview = window.comfyAPI.subjectCameraPreview || {};
window.comfyAPI.subjectCameraPreview.PREVIEW_WIDTH = 200;
window.comfyAPI.subjectCameraPreview.PREVIEW_HEIGHT = 150;
window.comfyAPI.subjectCameraPreview.fitCameraAspect = fitCameraAspect;
window.comfyAPI.subjectCameraPreview.renderInsetPreview = renderInsetPreview;
//#endregion
//#region src/extensions/core/load3d/createViewport3d.ts
function buildViewport3dDeps(container) {
	const view = new RendererView(container);
	const renderer = view.renderer;
	const eventManager = new EventManager();
	const cameraManager = new CameraManager(renderer, eventManager);
	const controlsManager = new ControlsManager(container, cameraManager.activeCamera);
	cameraManager.setControls(controlsManager.controls);
	const getActiveCamera = () => cameraManager.activeCamera;
	const getControls = () => controlsManager.controls;
	const sceneManager = new SceneManager(view, getActiveCamera, getControls, eventManager);
	return {
		view,
		eventManager,
		sceneManager,
		cameraManager,
		controlsManager,
		lightingManager: new LightingManager(sceneManager.scene, eventManager),
		viewHelperManager: new ViewHelperManager(renderer, getActiveCamera, getControls, () => cameraManager.getCameraState(), eventManager)
	};
}
function createViewport3d(container, options) {
	const viewport = new Viewport3d(container, buildViewport3dDeps(container), options);
	viewport.start();
	return viewport;
}
window.comfyAPI = window.comfyAPI || {};
window.comfyAPI.createViewport3d = window.comfyAPI.createViewport3d || {};
window.comfyAPI.createViewport3d.createViewport3d = createViewport3d;
//#endregion
//#region src/extensions/core/cameraInfo/cameraTransform.ts
var DEG2RAD = Math.PI / 180;
function orbitPosition(target, yawDeg, pitchDeg, distance) {
	const y = yawDeg * DEG2RAD;
	const p = pitchDeg * DEG2RAD;
	const cp = Math.cos(p);
	return new Vector3(target.x + distance * cp * Math.sin(y), target.y + distance * Math.sin(p), target.z + distance * cp * Math.cos(y));
}
function lookAtQuaternion(position, target, rollDeg) {
	const targetVec = new Vector3(target.x, target.y, target.z);
	const m = new Matrix4().lookAt(position, targetVec, new Vector3(0, 1, 0));
	const q = new Quaternion().setFromRotationMatrix(m);
	if (rollDeg !== 0) {
		const rollQ = new Quaternion().setFromAxisAngle(new Vector3(0, 0, 1), rollDeg * DEG2RAD);
		q.multiply(rollQ);
	}
	return q;
}
function normalizeQuaternion(q) {
	if (q.lengthSq() === 0) q.set(0, 0, 0, 1);
	else q.normalize();
	return q;
}
function computeSubjectTransform(state) {
	if (state.mode === "quaternion") {
		const p = state.quaternion.position;
		const q = state.quaternion.quat;
		const quaternion = normalizeQuaternion(new Quaternion(q.x, q.y, q.z, q.w));
		return {
			position: new Vector3(p.x, p.y, p.z),
			quaternion
		};
	}
	const position = state.mode === "orbit" ? orbitPosition(state.target, state.orbit.yaw, state.orbit.pitch, state.orbit.distance) : new Vector3(state.lookAt.position.x, state.lookAt.position.y, state.lookAt.position.z);
	return {
		position,
		quaternion: lookAtQuaternion(position, state.target, state.roll)
	};
}
window.comfyAPI = window.comfyAPI || {};
window.comfyAPI.cameraTransform = window.comfyAPI.cameraTransform || {};
window.comfyAPI.cameraTransform.normalizeQuaternion = normalizeQuaternion;
window.comfyAPI.cameraTransform.computeSubjectTransform = computeSubjectTransform;
//#endregion
export { renderInsetPreview as a, OrbitHandles as c, ViewportWidgetShell_default as d, fitCameraAspect as i, isOrbitHandleType as l, normalizeQuaternion as n, PointerInteraction as o, createViewport3d as r, pickHandleAtPointer as s, computeSubjectTransform as t, useViewportNodeWiring as u };
