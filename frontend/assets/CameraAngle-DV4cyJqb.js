import "./rolldown-runtime-xtsTai4I.js";
import { I as CylinderGeometry, It as Vector2, K as Group, Lt as Vector3, Mt as TextureLoader, N as CanvasTexture, O as BoxGeometry, Ot as SphereGeometry, St as SRGBColorSpace, X as LineBasicMaterial, Z as LineSegments, ct as MeshBasicMaterial, dt as MeshStandardMaterial, mt as PerspectiveCamera, st as Mesh, xt as Raycaster, z as EdgesGeometry } from "./vendor-three-DQpYrwAh.js";
import { Dt as withDirectives, Et as withCtx, F as createBaseVNode, G as defineComponent, H as createTextVNode, Ht as toRef, I as createBlock, Jt as normalizeClass, Kt as unref, L as createCommentVNode, Lt as ref, O as Fragment, P as computed, R as createElementBlock, St as watch, U as createVNode, Vt as toRaw, Zt as toDisplayString, dt as renderList, lt as openBlock, mt as resolveDirective, ot as onMounted, st as onUnmounted, xt as useTemplateRef } from "./vendor-vue-core-C1utdb0s.js";
import { b as useElementSize } from "./vendor-vueuse-BxKIIsKg.js";
import { Dt as useCanvasStore, go as useNodeOutputStore, o as app, zc as getNodeByLocatorId } from "./layoutStore-CZsuzg91.js";
import { t as useToastStore } from "./toastStore-CTfykAzG.js";
import { r as useI18n } from "./vendor-i18n-BZvE7WBQ.js";
import { d as t } from "./i18n-C3J-ToPr.js";
import { t as cn } from "./src-DI1bBfrb.js";
import { a as Select_default, i as SelectContent_default, n as SelectTrigger_default, r as SelectItem_default, t as SelectValue_default } from "./SelectValue-BYMnIcxq.js";
import { a as renderInsetPreview, c as OrbitHandles, d as ViewportWidgetShell_default, i as fitCameraAspect, l as isOrbitHandleType, o as PointerInteraction, r as createViewport3d, s as pickHandleAtPointer, t as computeSubjectTransform, u as useViewportNodeWiring } from "./cameraTransform-a83Tjky1.js";
import { o as tip, t as actionClass } from "./menuBarStyles-Dl-y7eUi.js";
import { C as CAMERA_ANGLE_WIDGET_NAMES, D as SUBJECT_CENTER, E as ORBIT_SPHERE_RADIUS, T as DEFAULT_SUBJECT_FACE_LABELS, _ as stateFromHandleDrag, a as writeViewMode, b as verticalTerm, c as VERTICAL_TERMS, d as distanceTerm, f as dollyByWheel, g as roundState, h as rotateByDrag, i as writeStateToWidgets, l as clampState, m as overviewDistance, n as readStateFromWidgets, o as DISTANCE_TERMS, p as horizontalTerm, r as readViewMode, s as HORIZONTAL_TERMS, u as describeCameraAngle, v as toHandleOrbitState, w as DEFAULT_CAMERA_ANGLE_STATE, x as CAMERA_ANGLE_LIMITS, y as toOrbitCameraInfoState } from "./widgetBridge-CMvdkhjP.js";
//#region src/extensions/core/cameraAngle/SubjectBox.ts
var SUBJECT_CAMERA_NEAR = .1;
var SUBJECT_CAMERA_FAR = 100;
var FRONT_COLOR = 14212066;
var FACE_COLOR = "#2a2d36";
var FACE_GRID_COLOR = "#3d4150";
var FACE_TEXT_COLOR = "#aeb4c2";
var EDGE_COLOR = 1710618;
var FACE_TEXTURE_SIZE = 256;
var FACE_GRID_CELL = 32;
var FACE_FONT = "bold 40px sans-serif";
var loadTextureWithThree = (url) => new TextureLoader().setCrossOrigin("anonymous").loadAsync(url);
function makeFaceTexture(label) {
	const canvas = document.createElement("canvas");
	canvas.width = FACE_TEXTURE_SIZE;
	canvas.height = FACE_TEXTURE_SIZE;
	const ctx = canvas.getContext("2d");
	if (!ctx) return null;
	ctx.fillStyle = FACE_COLOR;
	ctx.fillRect(0, 0, FACE_TEXTURE_SIZE, FACE_TEXTURE_SIZE);
	ctx.strokeStyle = FACE_GRID_COLOR;
	ctx.lineWidth = 1;
	for (let i = 0; i <= FACE_TEXTURE_SIZE; i += FACE_GRID_CELL) {
		ctx.beginPath();
		ctx.moveTo(i, 0);
		ctx.lineTo(i, FACE_TEXTURE_SIZE);
		ctx.moveTo(0, i);
		ctx.lineTo(FACE_TEXTURE_SIZE, i);
		ctx.stroke();
	}
	ctx.fillStyle = FACE_TEXT_COLOR;
	ctx.font = FACE_FONT;
	ctx.textAlign = "center";
	ctx.textBaseline = "middle";
	ctx.fillText(label, FACE_TEXTURE_SIZE / 2, FACE_TEXTURE_SIZE / 2);
	const texture = new CanvasTexture(canvas);
	texture.colorSpace = SRGBColorSpace;
	return texture;
}
function makeFaceMaterial(label) {
	const texture = makeFaceTexture(label);
	return new MeshBasicMaterial(texture ? { map: texture } : { color: FACE_COLOR });
}
function centerCropToSquare(texture) {
	const aspect = textureAspect(texture);
	const repeatX = aspect > 1 ? 1 / aspect : 1;
	const repeatY = aspect < 1 ? aspect : 1;
	texture.repeat.set(repeatX, repeatY);
	texture.offset.set((1 - repeatX) / 2, (1 - repeatY) / 2);
}
function textureAspect(texture) {
	const image = texture.image;
	const width = image?.width ?? 0;
	const height = image?.height ?? 0;
	return width > 0 && height > 0 ? width / height : 1;
}
var SubjectBox = class {
	scene = null;
	state;
	loadTexture;
	group = new Group();
	box;
	edges;
	frontMaterial;
	faceMaterials;
	imageTexture = null;
	loadToken = 0;
	aspect = 1;
	subjectCamera;
	disposed = false;
	constructor(initialState = DEFAULT_CAMERA_ANGLE_STATE, options = {}) {
		this.state = clampState(initialState);
		this.loadTexture = options.loadTexture ?? loadTextureWithThree;
		const labels = options.faceLabels ?? DEFAULT_SUBJECT_FACE_LABELS;
		this.group.name = "CameraAngleSubject";
		this.group.position.set(SUBJECT_CENTER.x, SUBJECT_CENTER.y, SUBJECT_CENTER.z);
		this.frontMaterial = new MeshBasicMaterial({ color: FRONT_COLOR });
		this.faceMaterials = [
			makeFaceMaterial(labels.right),
			makeFaceMaterial(labels.left),
			makeFaceMaterial(labels.top),
			makeFaceMaterial(labels.bottom),
			this.frontMaterial,
			makeFaceMaterial(labels.back)
		];
		const geometry = this.buildGeometry();
		this.box = new Mesh(geometry, this.faceMaterials);
		this.edges = new LineSegments(new EdgesGeometry(geometry), new LineBasicMaterial({
			color: EDGE_COLOR,
			transparent: true,
			opacity: .6
		}));
		this.group.add(this.box);
		this.group.add(this.edges);
		this.subjectCamera = new PerspectiveCamera(35, 1, SUBJECT_CAMERA_NEAR, SUBJECT_CAMERA_FAR);
		this.subjectCamera.name = "CameraAngleSubjectCamera";
		this.placeSubjectCamera();
	}
	attach(scene) {
		this.scene = scene;
		scene.add(this.group);
		scene.add(this.subjectCamera);
	}
	detach() {
		if (!this.scene) return;
		this.scene.remove(this.group);
		this.scene.remove(this.subjectCamera);
		this.scene = null;
	}
	dispose() {
		if (this.disposed) return;
		this.disposed = true;
		this.loadToken++;
		this.detach();
		this.box.geometry.dispose();
		this.edges.geometry.dispose();
		this.edges.material.dispose();
		this.applyTexture(null);
		for (const material of new Set(this.faceMaterials)) {
			material.map?.dispose();
			material.dispose();
		}
	}
	getSubjectCamera() {
		return this.subjectCamera;
	}
	getState() {
		return { ...this.state };
	}
	getAspect() {
		return this.aspect;
	}
	hasImage() {
		return this.imageTexture !== null;
	}
	applyState(next) {
		this.state = clampState(next);
		this.placeSubjectCamera();
	}
	async setImage(url) {
		const token = ++this.loadToken;
		if (!url) {
			this.applyTexture(null);
			return true;
		}
		let texture;
		try {
			texture = await this.loadTexture(url);
		} catch {
			return false;
		}
		if (token !== this.loadToken || this.disposed) {
			texture.dispose();
			return false;
		}
		texture.colorSpace = SRGBColorSpace;
		centerCropToSquare(texture);
		this.applyTexture(texture);
		return true;
	}
	applyTexture(texture) {
		this.imageTexture?.dispose();
		this.imageTexture = texture;
		this.aspect = texture ? textureAspect(texture) : 1;
		this.frontMaterial.map = texture;
		this.frontMaterial.color.set(texture ? 16777215 : FRONT_COLOR);
		this.frontMaterial.needsUpdate = true;
	}
	buildGeometry() {
		return new BoxGeometry(1, 1, 1);
	}
	placeSubjectCamera() {
		const cameraState = toOrbitCameraInfoState(this.state);
		const { position, quaternion } = computeSubjectTransform(cameraState);
		this.subjectCamera.position.copy(position);
		this.subjectCamera.quaternion.copy(quaternion);
		this.subjectCamera.zoom = cameraState.zoom;
		this.subjectCamera.updateProjectionMatrix();
		this.subjectCamera.updateMatrixWorld(true);
	}
};
window.comfyAPI = window.comfyAPI || {};
window.comfyAPI.SubjectBox = window.comfyAPI.SubjectBox || {};
window.comfyAPI.SubjectBox.SubjectBox = SubjectBox;
//#endregion
//#region src/extensions/core/cameraAngle/orbitGizmos.ts
var SPHERE_COLOR = 9081766;
var SPHERE_OPACITY = .14;
var MARKER_COLOR = 16763904;
var MARKER_BODY = {
	width: .22,
	height: .14,
	depth: .12
};
var MARKER_LENS = {
	radius: .06,
	length: .08
};
var OrbitSphere = class {
	mesh;
	scene = null;
	constructor() {
		this.mesh = new Mesh(new SphereGeometry(ORBIT_SPHERE_RADIUS, 12, 8), new MeshBasicMaterial({
			color: SPHERE_COLOR,
			wireframe: true,
			transparent: true,
			opacity: SPHERE_OPACITY,
			depthWrite: false
		}));
		this.mesh.name = "CameraAngleOrbitSphere";
		this.mesh.position.set(SUBJECT_CENTER.x, SUBJECT_CENTER.y, SUBJECT_CENTER.z);
	}
	attach(scene) {
		this.scene = scene;
		scene.add(this.mesh);
	}
	setVisible(visible) {
		this.mesh.visible = visible;
	}
	isVisible() {
		return this.mesh.visible;
	}
	dispose() {
		this.scene?.remove(this.mesh);
		this.scene = null;
		this.mesh.geometry.dispose();
		this.mesh.material.dispose();
	}
};
var CameraMarker = class {
	group = new Group();
	body;
	lens;
	scene = null;
	constructor() {
		this.group.name = "CameraAngleCameraMarker";
		const material = new MeshStandardMaterial({
			color: MARKER_COLOR,
			emissive: MARKER_COLOR,
			emissiveIntensity: .45,
			roughness: .4,
			metalness: .2
		});
		this.body = new Mesh(new BoxGeometry(MARKER_BODY.width, MARKER_BODY.height, MARKER_BODY.depth), material);
		this.lens = new Mesh(new CylinderGeometry(MARKER_LENS.radius, MARKER_LENS.radius * .8, MARKER_LENS.length, 16), material);
		this.lens.rotation.x = Math.PI / 2;
		this.lens.position.z = -(MARKER_BODY.depth + MARKER_LENS.length) / 2;
		this.group.add(this.body);
		this.group.add(this.lens);
	}
	attach(scene) {
		this.scene = scene;
		scene.add(this.group);
	}
	update(state) {
		const { position, quaternion } = computeSubjectTransform(toHandleOrbitState(state));
		this.group.position.copy(position);
		this.group.quaternion.copy(quaternion);
	}
	setVisible(visible) {
		this.group.visible = visible;
	}
	isVisible() {
		return this.group.visible;
	}
	dispose() {
		this.scene?.remove(this.group);
		this.scene = null;
		this.body.geometry.dispose();
		this.lens.geometry.dispose();
		this.body.material.dispose();
	}
};
window.comfyAPI = window.comfyAPI || {};
window.comfyAPI.orbitGizmos = window.comfyAPI.orbitGizmos || {};
window.comfyAPI.orbitGizmos.OrbitSphere = OrbitSphere;
window.comfyAPI.orbitGizmos.CameraMarker = CameraMarker;
//#endregion
//#region src/extensions/core/cameraAngle/CameraAngleViewport.ts
var OVERVIEW_DIRECTION = new Vector3(2.4, 1.4, 4.2).normalize();
var DEFAULT_OVERVIEW_FOV = 35;
var PREVIEW_SIZE_CSS = 150;
var PREVIEW_MAX_FRACTION = .35;
var PREVIEW_MARGIN_CSS = 8;
var PREVIEW_BORDER_COLOR = 9081766;
var DEFAULT_PREVIEW_BACKGROUND = 2631720;
var CameraAngleViewport = class {
	viewport;
	subject;
	orbitHandles;
	orbitSphere;
	cameraMarker;
	state;
	viewMode = "camera";
	onStateChange;
	disposePreRender;
	disposePostRender;
	raycaster = new Raycaster();
	pointerNdc = new Vector2();
	dragPoint = new Vector3();
	input;
	overviewAspect = null;
	previewVisible = false;
	removed = false;
	constructor(container, initialState = DEFAULT_CAMERA_ANGLE_STATE, options) {
		this.state = clampState(initialState);
		this.onStateChange = options?.onStateChange;
		this.viewport = createViewport3d(container, options);
		this.viewport.viewHelperManager.visibleViewHelper(false);
		this.viewport.sceneManager.toggleGrid(false);
		this.viewport.controlsManager.controls.enabled = false;
		this.fitOverviewCamera();
		this.subject = new SubjectBox(this.state, {
			loadTexture: options?.loadTexture,
			faceLabels: options?.faceLabels
		});
		this.viewport.setOverlay(this.subject);
		const scene = this.viewport.sceneManager.scene;
		this.orbitSphere = new OrbitSphere();
		this.orbitSphere.attach(scene);
		this.cameraMarker = new CameraMarker();
		this.cameraMarker.attach(scene);
		this.orbitHandles = new OrbitHandles({
			pitchLimits: CAMERA_ANGLE_LIMITS.vertical,
			yawRingLatitude: -40
		});
		this.orbitHandles.attach(scene);
		this.syncGizmos();
		this.input = new PointerInteraction({
			canvas: this.canvas,
			pickHandle: (position) => this.pickHandle(position),
			dragHandle: (type, position) => this.dragHandle(type, position),
			hoverChanged: (type) => {
				this.orbitHandles.setHovered(type);
				this.viewport.forceRender();
			},
			handleDragChanged: () => {},
			freeDragEnabled: () => this.viewMode === "object",
			freeDrag: (dx, dy) => this.commit(rotateByDrag(this.state, dx, dy)),
			wheelEnabled: () => true,
			wheel: (deltaY) => this.commit(dollyByWheel(this.state, deltaY)),
			idleCursor: () => this.viewMode === "object" || this.input.hoveredHandle ? "grab" : ""
		});
		this.input.attach();
		this.disposePreRender = this.viewport.addPreRenderCallback(() => {
			this.fitOverviewCamera();
			if (this.viewMode === "object") this.fitSubjectAspect();
		});
		this.disposePostRender = this.viewport.addPostRenderCallback(() => {
			if (this.viewMode === "camera" && this.previewVisible) this.renderSubjectPreview();
		});
	}
	getState() {
		return { ...this.state };
	}
	getViewMode() {
		return this.viewMode;
	}
	applyState(next) {
		this.state = clampState(next);
		this.subject.applyState(this.state);
		this.syncGizmos();
		this.viewport.forceRender();
	}
	setViewMode(mode) {
		if (this.viewMode === mode) return;
		this.viewMode = mode;
		this.input.cancel();
		const lookingThrough = mode === "object";
		this.syncGizmos();
		if (lookingThrough) this.fitSubjectAspect();
		this.viewport.setExternalActiveCamera(lookingThrough ? this.subject.getSubjectCamera() : null);
		this.viewport.controlsManager.controls.enabled = false;
		if (!lookingThrough) this.viewport.viewHelperManager.visibleViewHelper(false);
		this.viewport.forceRender();
	}
	setPreviewVisible(visible) {
		if (this.previewVisible === visible) return;
		this.previewVisible = visible;
		this.viewport.forceRender();
	}
	isPreviewVisible() {
		return this.previewVisible;
	}
	async setImage(url) {
		if (await this.subject.setImage(url) && !this.removed) this.viewport.forceRender();
	}
	remove() {
		if (this.removed) return;
		this.removed = true;
		this.input.detach();
		this.input.cancel();
		this.canvas.style.cursor = "";
		this.disposePreRender();
		this.disposePostRender();
		this.orbitHandles.dispose();
		this.orbitSphere.dispose();
		this.cameraMarker.dispose();
		this.viewport.remove();
	}
	get canvas() {
		return this.viewport.domElement;
	}
	syncGizmos() {
		const visible = this.viewMode === "camera";
		this.orbitHandles.update(toHandleOrbitState(this.state));
		this.orbitHandles.setVisible(visible);
		this.cameraMarker.update(this.state);
		this.cameraMarker.setVisible(visible);
		this.orbitSphere.setVisible(visible);
	}
	commit(next) {
		this.applyState(next);
		this.onStateChange?.(this.getState());
	}
	updatePointer({ clientX, clientY }) {
		const rect = this.canvas.getBoundingClientRect();
		this.pointerNdc.x = (clientX - rect.left) / rect.width * 2 - 1;
		this.pointerNdc.y = -((clientY - rect.top) / rect.height) * 2 + 1;
	}
	pickHandle(position) {
		if (this.viewMode !== "camera") return null;
		this.updatePointer(position);
		const picked = pickHandleAtPointer(this.raycaster, this.pointerNdc, this.viewport.cameraManager.activeCamera, this.orbitHandles.pickableMeshes(), this.canvas);
		return picked !== null && isOrbitHandleType(picked) ? picked : null;
	}
	dragHandle(type, position) {
		this.updatePointer(position);
		this.raycaster.setFromCamera(this.pointerNdc, this.viewport.cameraManager.activeCamera);
		const plane = this.orbitHandles.dragPlaneFor(type, toHandleOrbitState(this.state));
		if (!this.raycaster.ray.intersectPlane(plane, this.dragPoint)) return;
		this.commit(stateFromHandleDrag(type, this.state, this.dragPoint));
	}
	fitOverviewCamera() {
		const aspect = this.canvas.width / this.canvas.height;
		if (!Number.isFinite(aspect) || aspect <= 0) return;
		if (aspect === this.overviewAspect) return;
		this.overviewAspect = aspect;
		const camera = this.viewport.cameraManager.activeCamera;
		const fov = camera instanceof PerspectiveCamera ? camera.fov : DEFAULT_OVERVIEW_FOV;
		const target = new Vector3(SUBJECT_CENTER.x, SUBJECT_CENTER.y, SUBJECT_CENTER.z);
		const position = OVERVIEW_DIRECTION.clone().multiplyScalar(overviewDistance(aspect, fov)).add(target);
		this.viewport.setCameraState({
			position,
			target,
			zoom: 1,
			cameraType: "perspective"
		});
	}
	fitSubjectAspect() {
		fitCameraAspect(this.subject.getSubjectCamera(), this.canvas.width / this.canvas.height);
	}
	renderSubjectPreview() {
		const canvas = this.canvas;
		const pixelScale = canvas.clientHeight ? canvas.height / canvas.clientHeight : 1;
		const side = Math.floor(Math.min(PREVIEW_SIZE_CSS * pixelScale, Math.min(canvas.width, canvas.height) * PREVIEW_MAX_FRACTION));
		const background = this.viewport.sceneManager.getCurrentBackgroundInfo();
		renderInsetPreview({
			renderer: this.viewport.renderer,
			view: this.viewport.rendererView,
			canvas,
			scene: this.viewport.sceneManager.scene,
			camera: this.subject.getSubjectCamera(),
			hidden: [
				this.orbitHandles,
				this.orbitSphere,
				this.cameraMarker
			],
			layout: {
				width: side,
				height: side,
				marginRight: PREVIEW_MARGIN_CSS * pixelScale,
				marginBottom: 56 * pixelScale
			},
			borderColor: PREVIEW_BORDER_COLOR,
			backgroundColor: background.type === "color" ? background.value : DEFAULT_PREVIEW_BACKGROUND
		});
	}
};
window.comfyAPI = window.comfyAPI || {};
window.comfyAPI.CameraAngleViewport = window.comfyAPI.CameraAngleViewport || {};
window.comfyAPI.CameraAngleViewport.CameraAngleViewport = CameraAngleViewport;
//#endregion
//#region src/composables/useCameraAngle.ts
var IMAGE_INPUT_NAME = "image";
var WIDGET_NAMES = Object.values(CAMERA_ANGLE_WIDGET_NAMES);
function useCameraAngle(nodeRef, options = {}) {
	const node = toRef(nodeRef);
	const nodeOutputStore = useNodeOutputStore();
	const wiring = useViewportNodeWiring();
	let viewport = null;
	let lastImageUrl = null;
	const state = ref(DEFAULT_CAMERA_ANGLE_STATE);
	const viewMode = ref("camera");
	const previewVisible = ref(false);
	const prompt = computed(() => describeCameraAngle(state.value));
	const rawNode = () => toRaw(node.value);
	const initialize = (container) => {
		const raw = rawNode();
		if (!raw) return;
		if (viewport) cleanup();
		try {
			const target = raw;
			state.value = readStateFromWidgets(target);
			viewMode.value = readViewMode(target);
			viewport = new CameraAngleViewport(container, state.value, {
				faceLabels: options.faceLabels?.(),
				onStateChange: (next) => {
					state.value = roundState(next);
					writeStateToWidgets(target, next);
				}
			});
			viewport.setViewMode(viewMode.value);
			viewport.setPreviewVisible(previewVisible.value);
			wiring.wireWidgets(target, WIDGET_NAMES, () => {
				if (!viewport) return;
				state.value = readStateFromWidgets(target);
				viewport.applyState(state.value);
			});
			wiring.wireNode(raw, {
				viewport: () => viewport?.viewport,
				onConnectionsChange: syncSubjectImage
			});
			syncSubjectImage();
		} catch (error) {
			console.error("Failed to initialize CameraAngleViewport:", error);
			cleanup();
			useToastStore().addAlert(t("toastMessages.failedToInitializeCameraAngleViewer"));
		}
	};
	const cleanup = () => {
		wiring.unwire();
		viewport?.remove();
		viewport = null;
		lastImageUrl = null;
	};
	const handleMouseEnter = () => {
		viewport?.viewport.updateStatusMouseOnScene(true);
		viewport?.viewport.refreshViewport();
	};
	const handleMouseLeave = () => {
		viewport?.viewport.updateStatusMouseOnScene(false);
	};
	const setViewMode = (mode) => {
		viewMode.value = mode;
		const raw = rawNode();
		if (raw) writeViewMode(raw, mode);
		viewport?.setViewMode(mode);
	};
	const setPreviewVisible = (visible) => {
		previewVisible.value = visible;
		viewport?.setPreviewVisible(visible);
	};
	const setField = (field, value) => {
		const next = clampState({
			...state.value,
			[field]: value
		});
		state.value = next;
		const raw = rawNode();
		if (raw) writeStateToWidgets(raw, next);
		viewport?.applyState(next);
	};
	function subjectImageUrl(target) {
		const slot = target.findInputSlot(IMAGE_INPUT_NAME);
		const inputNode = slot >= 0 ? target.getInputNode(slot) : null;
		if (!inputNode) return null;
		return nodeOutputStore.getNodeImageUrls(inputNode)?.[0] ?? null;
	}
	function syncSubjectImage() {
		const raw = rawNode();
		if (!raw || !viewport) return;
		const url = subjectImageUrl(raw);
		if (url === lastImageUrl) return;
		lastImageUrl = url;
		viewport.setImage(url);
	}
	watch(() => nodeOutputStore.nodeOutputs, syncSubjectImage, { deep: true });
	watch(() => nodeOutputStore.nodePreviewImages, syncSubjectImage, { deep: true });
	return {
		initialize,
		cleanup,
		handleMouseEnter,
		handleMouseLeave,
		setViewMode,
		setPreviewVisible,
		setField,
		state,
		viewMode,
		previewVisible,
		prompt
	};
}
//#endregion
//#region src/components/cameraAngle/CameraAngle.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1 = [
	"aria-pressed",
	"aria-label",
	"onClick"
];
var _hoisted_2 = { key: 0 };
var _hoisted_3 = [
	"disabled",
	"aria-pressed",
	"aria-label"
];
var _hoisted_4 = { key: 0 };
var _hoisted_5 = ["title"];
var compactWidthThreshold = 420;
//#endregion
//#region src/components/cameraAngle/CameraAngle.vue
var CameraAngle_default = /* @__PURE__ */ defineComponent({
	__name: "CameraAngle",
	props: { widget: {} },
	setup(__props) {
		const node = ref(null);
		const { t } = useI18n();
		const shell = useTemplateRef("shell");
		const { width: toolbarWidth } = useElementSize(computed(() => shell.value?.toolbar ?? null));
		const compact = computed(() => toolbarWidth.value > 0 && toolbarWidth.value < compactWidthThreshold);
		const { initialize, cleanup, handleMouseEnter, handleMouseLeave, setViewMode, setPreviewVisible, setField, state, viewMode, previewVisible, prompt } = useCameraAngle(node, { faceLabels: () => ({
			back: t("cameraAngle.faces.back"),
			left: t("cameraAngle.faces.left"),
			right: t("cameraAngle.faces.right"),
			top: t("cameraAngle.faces.top"),
			bottom: t("cameraAngle.faces.bottom")
		}) });
		const previewLabel = computed(() => previewVisible.value ? t("cameraAngle.hidePreview") : t("cameraAngle.showPreview"));
		const viewModeOptions = computed(() => [{
			value: "camera",
			label: t("cameraAngle.cameraView"),
			tooltip: t("cameraAngle.cameraViewTooltip"),
			icon: "icon-[lucide--video]"
		}, {
			value: "object",
			label: t("cameraAngle.objectView"),
			tooltip: t("cameraAngle.objectViewTooltip"),
			icon: "icon-[lucide--box]"
		}]);
		const presetGroups = computed(() => [
			{
				field: "horizontal",
				label: t("cameraAngle.horizontalLabel"),
				terms: HORIZONTAL_TERMS,
				current: horizontalTerm(state.value.horizontal).key
			},
			{
				field: "vertical",
				label: t("cameraAngle.verticalLabel"),
				terms: VERTICAL_TERMS,
				current: verticalTerm(state.value.vertical).key
			},
			{
				field: "zoom",
				label: t("cameraAngle.zoomLabel"),
				terms: DISTANCE_TERMS,
				current: distanceTerm(state.value.zoom).key
			}
		]);
		const openPreset = ref(null);
		function setPresetOpen(field, open) {
			if (open) openPreset.value = field;
			else if (openPreset.value === field) openPreset.value = null;
		}
		function selectPreset(field, key) {
			const term = presetGroups.value.find((g) => g.field === field)?.terms.find((candidate) => candidate.key === key);
			if (term) setField(field, term.preset);
		}
		const canvasStore = useCanvasStore();
		function resolveOwnerNode() {
			const locatorId = __props.widget.nodeLocatorId;
			const graph = app.rootGraphOrUndefined;
			return locatorId && graph ? getNodeByLocatorId(graph, locatorId) : null;
		}
		onMounted(() => {
			watch(() => canvasStore.rootGraphId, () => {
				const container = shell.value?.container;
				if (node.value || !container) return;
				node.value = resolveOwnerNode();
				if (node.value) initialize(container);
			}, { immediate: true });
		});
		onUnmounted(() => {
			cleanup();
		});
		return (_ctx, _cache) => {
			const _directive_tooltip = resolveDirective("tooltip");
			return openBlock(), createBlock(ViewportWidgetShell_default, {
				ref_key: "shell",
				ref: shell,
				"bottom-class": "h-12",
				onMouseenter: unref(handleMouseEnter),
				onMouseleave: unref(handleMouseLeave),
				onPointerdownCapture: _cache[1] || (_cache[1] = ($event) => openPreset.value = null)
			}, {
				top: withCtx(() => [
					(openBlock(true), createElementBlock(Fragment, null, renderList(viewModeOptions.value, (option) => {
						return withDirectives((openBlock(), createElementBlock("button", {
							key: option.value,
							type: "button",
							class: normalizeClass(unref(actionClass)(unref(viewMode) === option.value)),
							"aria-pressed": unref(viewMode) === option.value,
							"aria-label": option.label,
							onClick: ($event) => unref(setViewMode)(option.value)
						}, [createBaseVNode("i", { class: normalizeClass(unref(cn)("size-4", option.icon)) }, null, 2), !compact.value ? (openBlock(), createElementBlock("span", _hoisted_2, toDisplayString(option.label), 1)) : createCommentVNode("", true)], 10, _hoisted_1)), [[
							_directive_tooltip,
							unref(tip)(option.tooltip),
							void 0,
							{ bottom: true }
						]]);
					}), 128)),
					_cache[3] || (_cache[3] = createBaseVNode("div", { class: "mx-1 h-5 w-px shrink-0 bg-interface-menu-stroke" }, null, -1)),
					withDirectives((openBlock(), createElementBlock("button", {
						type: "button",
						disabled: unref(viewMode) === "object",
						class: normalizeClass(unref(cn)(unref(actionClass)(unref(viewMode) === "camera" && unref(previewVisible)), unref(viewMode) === "object" && "cursor-not-allowed opacity-40")),
						"aria-pressed": unref(viewMode) === "camera" && unref(previewVisible),
						"aria-label": previewLabel.value,
						onClick: _cache[0] || (_cache[0] = ($event) => unref(setPreviewVisible)(!unref(previewVisible)))
					}, [_cache[2] || (_cache[2] = createBaseVNode("i", { class: "icon-[lucide--picture-in-picture-2] size-4" }, null, -1)), !compact.value ? (openBlock(), createElementBlock("span", _hoisted_4, toDisplayString(_ctx.$t("cameraAngle.preview")), 1)) : createCommentVNode("", true)], 10, _hoisted_3)), [[
						_directive_tooltip,
						unref(tip)(previewLabel.value),
						void 0,
						{ bottom: true }
					]]),
					createBaseVNode("span", {
						class: "ml-auto min-w-0 truncate text-xs text-muted-foreground",
						title: unref(prompt),
						"data-testid": "camera-angle-prompt"
					}, toDisplayString(unref(prompt)), 9, _hoisted_5)
				]),
				bottom: withCtx(() => [(openBlock(true), createElementBlock(Fragment, null, renderList(presetGroups.value, (group) => {
					return openBlock(), createBlock(Select_default, {
						key: group.field,
						"model-value": group.current,
						open: openPreset.value === group.field,
						"onUpdate:modelValue": (key) => selectPreset(group.field, key),
						"onUpdate:open": (open) => setPresetOpen(group.field, open)
					}, {
						default: withCtx(() => [createVNode(SelectTrigger_default, {
							size: "md",
							class: "min-w-0 flex-1",
							"aria-label": group.label
						}, {
							default: withCtx(() => [createVNode(SelectValue_default)]),
							_: 1
						}, 8, ["aria-label"]), createVNode(SelectContent_default, null, {
							default: withCtx(() => [(openBlock(true), createElementBlock(Fragment, null, renderList(group.terms, (term) => {
								return openBlock(), createBlock(SelectItem_default, {
									key: term.key,
									value: term.key
								}, {
									default: withCtx(() => [createTextVNode(toDisplayString(_ctx.$t(`cameraAngle.${group.field}.${term.key}`)), 1)]),
									_: 2
								}, 1032, ["value"]);
							}), 128))]),
							_: 2
						}, 1024)]),
						_: 2
					}, 1032, [
						"model-value",
						"open",
						"onUpdate:modelValue",
						"onUpdate:open"
					]);
				}), 128))]),
				_: 1
			}, 8, ["onMouseenter", "onMouseleave"]);
		};
	}
});
//#endregion
export { CameraAngle_default as default };
