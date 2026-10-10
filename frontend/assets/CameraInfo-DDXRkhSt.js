import "./rolldown-runtime-xtsTai4I.js";
import { Lt as clamp } from "./vendor-other-BPEcPQTD.js";
import { It as Vector2, K as Group, Lt as Vector3, M as CameraHelper, O as BoxGeometry, Ot as SphereGeometry, Pt as TorusGeometry, X as LineBasicMaterial, Z as LineSegments, bt as Quaternion, ct as MeshBasicMaterial, d as TransformControls, dt as MeshStandardMaterial, ft as Object3D, ht as Plane, mt as PerspectiveCamera, ot as Matrix4, pt as OrthographicCamera, st as Mesh, w as AxesHelper, xt as Raycaster, z as EdgesGeometry } from "./vendor-three-DQpYrwAh.js";
import { Dt as withDirectives, Et as withCtx, F as createBaseVNode, G as defineComponent, Ht as toRef, I as createBlock, Jt as normalizeClass, Kt as unref, L as createCommentVNode, Lt as ref, O as Fragment, P as computed, R as createElementBlock, St as watch, Vt as toRaw, Zt as toDisplayString, dt as renderList, lt as openBlock, mt as resolveDirective, ot as onMounted, st as onUnmounted, xt as useTemplateRef } from "./vendor-vue-core-C1utdb0s.js";
import { b as useElementSize } from "./vendor-vueuse-BxKIIsKg.js";
import { Tt as resolveNode } from "./layoutStore-CZsuzg91.js";
import { t as useToastStore } from "./toastStore-CTfykAzG.js";
import { r as useI18n } from "./vendor-i18n-BZvE7WBQ.js";
import { d as t } from "./i18n-C3J-ToPr.js";
import { t as cn } from "./src-DI1bBfrb.js";
import { a as renderInsetPreview, c as OrbitHandles, d as ViewportWidgetShell_default, i as fitCameraAspect, n as normalizeQuaternion, o as PointerInteraction, r as createViewport3d, s as pickHandleAtPointer, t as computeSubjectTransform, u as useViewportNodeWiring } from "./cameraTransform-a83Tjky1.js";
import { i as iconBtnClass, o as tip, t as actionClass } from "./menuBarStyles-Dl-y7eUi.js";
import { a as DEFAULT_CAMERA_INFO_STATE, i as pointToYawAngle, n as pointToDistance, r as pointToPitchAngle, t as MIN_DISTANCE } from "./orbitDragMath-BBRzJ8Sz.js";
//#region src/extensions/core/cameraInfo/CameraInfoOverlay.ts
var REFERENCE_CUBE_SIZE = 1;
var SUBJECT_CAMERA_NEAR = .1;
var SUBJECT_CAMERA_FAR = 1e3;
var ORTHO_FRUSTUM_HALF = 1;
var CameraInfoOverlay = class {
	scene = null;
	state;
	subjectPerspective;
	subjectOrthographic;
	subjectCamera;
	cameraHelper = null;
	referenceGroup;
	referenceCube;
	referenceCubeEdges;
	axesHelper;
	renderCamera = null;
	disposed = false;
	constructor(initialState = DEFAULT_CAMERA_INFO_STATE) {
		this.state = cloneState(initialState);
		this.subjectPerspective = new PerspectiveCamera(this.state.fov, 1, SUBJECT_CAMERA_NEAR, SUBJECT_CAMERA_FAR);
		this.subjectOrthographic = new OrthographicCamera(-1, ORTHO_FRUSTUM_HALF, ORTHO_FRUSTUM_HALF, -1, SUBJECT_CAMERA_NEAR, SUBJECT_CAMERA_FAR);
		this.subjectCamera = this.subjectCameraFor(this.state.cameraType);
		const cubeGeometry = new BoxGeometry(REFERENCE_CUBE_SIZE, REFERENCE_CUBE_SIZE, REFERENCE_CUBE_SIZE);
		this.referenceCube = new Mesh(cubeGeometry, new MeshStandardMaterial({
			color: 12106948,
			roughness: .55,
			metalness: .15
		}));
		this.referenceCube.position.set(0, REFERENCE_CUBE_SIZE / 2, 0);
		this.referenceCubeEdges = new LineSegments(new EdgesGeometry(cubeGeometry), new LineBasicMaterial({
			color: 1710618,
			transparent: true,
			opacity: .4
		}));
		this.referenceCube.add(this.referenceCubeEdges);
		this.axesHelper = new AxesHelper(REFERENCE_CUBE_SIZE * 1.25);
		this.referenceGroup = new Group();
		this.referenceGroup.name = "CameraInfoReference";
		this.referenceGroup.add(this.referenceCube);
		this.referenceGroup.add(this.axesHelper);
	}
	attach(scene) {
		this.scene = scene;
		scene.add(this.referenceGroup);
		scene.add(this.subjectPerspective);
		scene.add(this.subjectOrthographic);
		this.rebuildCameraHelper();
		this.applyStateToScene();
	}
	detach() {
		if (!this.scene) return;
		this.scene.remove(this.referenceGroup);
		this.scene.remove(this.subjectPerspective);
		this.scene.remove(this.subjectOrthographic);
		if (this.cameraHelper) this.scene.remove(this.cameraHelper);
		this.scene = null;
	}
	update(_delta) {
		this.cameraHelper?.update();
	}
	onActiveCameraChange(camera) {
		this.renderCamera = camera;
		this.refreshHelperVisibility();
	}
	dispose() {
		if (this.disposed) return;
		this.disposed = true;
		this.disposeCameraHelper();
		this.detach();
		this.referenceCube.geometry.dispose();
		this.referenceCube.material.dispose();
		this.referenceCubeEdges.geometry.dispose();
		this.referenceCubeEdges.material.dispose();
		this.axesHelper.dispose();
	}
	getSubjectCamera() {
		return this.subjectCamera;
	}
	setHelperVisible(visible) {
		if (this.cameraHelper) this.cameraHelper.visible = visible;
	}
	isHelperVisible() {
		return this.cameraHelper?.visible ?? false;
	}
	getState() {
		return cloneState(this.state);
	}
	applyState(next) {
		const cameraTypeChanged = next.cameraType !== this.state.cameraType;
		const modeChanged = next.mode !== this.state.mode;
		this.state = cloneState(next);
		if (cameraTypeChanged) {
			this.subjectCamera = this.subjectCameraFor(this.state.cameraType);
			this.rebuildCameraHelper();
		}
		this.applyStateToScene();
		if (modeChanged || cameraTypeChanged) this.refreshHelperVisibility();
	}
	applyStateToScene() {
		const { position, quaternion } = computeSubjectTransform(this.state);
		this.subjectCamera.position.copy(position);
		this.subjectCamera.quaternion.copy(quaternion);
		this.subjectCamera.updateMatrixWorld(true);
		if (this.subjectCamera instanceof PerspectiveCamera) {
			this.subjectCamera.fov = this.state.fov;
			this.subjectCamera.zoom = this.state.zoom;
			this.subjectCamera.updateProjectionMatrix();
		} else if (this.subjectCamera instanceof OrthographicCamera) {
			this.subjectCamera.zoom = this.state.zoom;
			this.subjectCamera.updateProjectionMatrix();
		}
		this.cameraHelper?.update();
	}
	subjectCameraFor(type) {
		return type === "perspective" ? this.subjectPerspective : this.subjectOrthographic;
	}
	rebuildCameraHelper() {
		this.disposeCameraHelper();
		if (!this.scene) return;
		this.cameraHelper = new CameraHelper(this.subjectCamera);
		this.scene.add(this.cameraHelper);
		this.refreshHelperVisibility();
	}
	disposeCameraHelper() {
		if (!this.cameraHelper) return;
		if (this.scene) this.scene.remove(this.cameraHelper);
		this.cameraHelper.geometry.dispose();
		const material = this.cameraHelper.material;
		if (Array.isArray(material)) material.forEach((m) => m.dispose());
		else material.dispose();
		this.cameraHelper = null;
	}
	refreshHelperVisibility() {
		if (!this.cameraHelper) return;
		this.cameraHelper.visible = this.renderCamera !== this.subjectCamera;
	}
};
function cloneState(state) {
	return {
		mode: state.mode,
		target: { ...state.target },
		roll: state.roll,
		fov: state.fov,
		zoom: state.zoom,
		cameraType: state.cameraType,
		orbit: { ...state.orbit },
		lookAt: { position: { ...state.lookAt.position } },
		quaternion: {
			position: { ...state.quaternion.position },
			quat: { ...state.quaternion.quat }
		}
	};
}
window.comfyAPI = window.comfyAPI || {};
window.comfyAPI.CameraInfoOverlay = window.comfyAPI.CameraInfoOverlay || {};
window.comfyAPI.CameraInfoOverlay.CameraInfoOverlay = CameraInfoOverlay;
//#endregion
//#region src/extensions/core/cameraInfo/handles/CameraHandle.ts
var CameraHandle = class {
	onDraggingChange;
	onChange;
	proxy;
	controls;
	helper;
	mode = "translate";
	suppressEcho = false;
	scene = null;
	disposed = false;
	constructor(camera, domElement, onDraggingChange, onChange) {
		this.onDraggingChange = onDraggingChange;
		this.onChange = onChange;
		this.proxy = new Object3D();
		this.proxy.name = "CameraInfoCameraProxy";
		this.controls = new TransformControls(camera, domElement);
		this.controls.setMode(this.mode);
		this.controls.setSize(.8);
		this.controls.setSpace(spaceFor(this.mode));
		this.controls.attach(this.proxy);
		this.helper = this.controls.getHelper();
		this.helper.name = "CameraInfoCameraHandle";
		this.helper.visible = false;
		this.controls.enabled = false;
		this.controls.addEventListener("dragging-changed", this.onDragging);
		this.controls.addEventListener("objectChange", this.onObjectChange);
	}
	attach(scene) {
		this.scene = scene;
		scene.add(this.proxy);
		scene.add(this.helper);
	}
	detach() {
		if (!this.scene) return;
		this.scene.remove(this.proxy);
		this.scene.remove(this.helper);
		this.scene = null;
	}
	setVisible(visible) {
		this.helper.visible = visible;
		this.controls.enabled = visible;
	}
	isVisible() {
		return this.helper.visible;
	}
	setMode(mode) {
		if (this.mode === mode) return;
		this.mode = mode;
		this.controls.setMode(mode);
		this.controls.setSpace(spaceFor(mode));
	}
	getMode() {
		return this.mode;
	}
	setSubject(position, quaternion) {
		const samePosition = this.proxy.position.x === position.x && this.proxy.position.y === position.y && this.proxy.position.z === position.z;
		const sameQuaternion = this.proxy.quaternion.x === quaternion.x && this.proxy.quaternion.y === quaternion.y && this.proxy.quaternion.z === quaternion.z && this.proxy.quaternion.w === quaternion.w;
		if (samePosition && sameQuaternion) return;
		this.suppressEcho = true;
		try {
			this.proxy.position.set(position.x, position.y, position.z);
			this.proxy.quaternion.set(quaternion.x, quaternion.y, quaternion.z, quaternion.w);
			this.proxy.updateMatrixWorld(true);
		} finally {
			this.suppressEcho = false;
		}
	}
	dispose() {
		if (this.disposed) return;
		this.disposed = true;
		this.controls.removeEventListener("dragging-changed", this.onDragging);
		this.controls.removeEventListener("objectChange", this.onObjectChange);
		this.controls.detach();
		this.detach();
		this.controls.dispose();
	}
	onDragging = (event) => {
		this.onDraggingChange(event.value === true);
	};
	onObjectChange = () => {
		if (this.suppressEcho) return;
		this.onChange({
			position: {
				x: this.proxy.position.x,
				y: this.proxy.position.y,
				z: this.proxy.position.z
			},
			quaternion: {
				x: this.proxy.quaternion.x,
				y: this.proxy.quaternion.y,
				z: this.proxy.quaternion.z,
				w: this.proxy.quaternion.w
			}
		}, this.mode);
	};
};
function spaceFor(mode) {
	return mode === "translate" ? "world" : "local";
}
window.comfyAPI = window.comfyAPI || {};
window.comfyAPI.CameraHandle = window.comfyAPI.CameraHandle || {};
window.comfyAPI.CameraHandle.CameraHandle = CameraHandle;
//#endregion
//#region src/extensions/core/cameraInfo/handles/rollDragMath.ts
var RAD2DEG$1 = 180 / Math.PI;
function rollBasis(target, cameraPos) {
	const backward = new Vector3(cameraPos.x - target.x, cameraPos.y - target.y, cameraPos.z - target.z);
	if (backward.lengthSq() < 1e-8) backward.set(0, 0, 1);
	else backward.normalize();
	const worldUp = new Vector3(0, 1, 0);
	const right = new Vector3().crossVectors(worldUp, backward);
	if (right.lengthSq() < 1e-8) right.set(1, 0, 0);
	else right.normalize();
	return {
		up: new Vector3().crossVectors(backward, right).normalize(),
		right,
		backward
	};
}
function pointToRollAngle(point, target, cameraPos) {
	const { up, right } = rollBasis(target, cameraPos);
	const rel = new Vector3(point.x - target.x, point.y - target.y, point.z - target.z);
	return Math.atan2(rel.dot(right), rel.dot(up)) * RAD2DEG$1;
}
window.comfyAPI = window.comfyAPI || {};
window.comfyAPI.rollDragMath = window.comfyAPI.rollDragMath || {};
window.comfyAPI.rollDragMath.rollBasis = rollBasis;
window.comfyAPI.rollDragMath.pointToRollAngle = pointToRollAngle;
//#endregion
//#region src/extensions/core/cameraInfo/handles/RollHandle.ts
var RING_RADIUS = .9;
var HANDLE_RADIUS = .08;
var GLOW_RADIUS = .12;
var TUBE_RADIUS = .025;
var ROLL_COLOR = 16746496;
var BASE_GLOW_OPACITY = .25;
var HOVER_GLOW_OPACITY = .6;
var HOVER_SCALE = 1.35;
var DEG2RAD$1 = Math.PI / 180;
function makeHandle() {
	const mesh = new Mesh(new SphereGeometry(HANDLE_RADIUS, 32, 32), new MeshStandardMaterial({
		color: ROLL_COLOR,
		emissive: ROLL_COLOR,
		emissiveIntensity: .7,
		roughness: .3,
		metalness: .2
	}));
	mesh.userData.handleType = "roll";
	return mesh;
}
var RollHandle = class {
	root = new Group();
	ring;
	handle;
	handleGlow;
	scene = null;
	disposed = false;
	constructor() {
		this.root.name = "CameraInfoRollHandle";
		this.ring = new Mesh(new TorusGeometry(RING_RADIUS, TUBE_RADIUS, 16, 80), new MeshBasicMaterial({
			color: ROLL_COLOR,
			transparent: true,
			opacity: .55
		}));
		this.root.add(this.ring);
		this.handle = makeHandle();
		this.handleGlow = new Mesh(new SphereGeometry(GLOW_RADIUS, 16, 16), new MeshBasicMaterial({
			color: ROLL_COLOR,
			transparent: true,
			opacity: BASE_GLOW_OPACITY,
			depthWrite: false,
			blending: 2
		}));
		this.handle.add(this.handleGlow);
		this.root.add(this.handle);
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
			this.ring.geometry,
			this.ring.material,
			this.handle.geometry,
			this.handle.material,
			this.handleGlow.geometry,
			this.handleGlow.material
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
		if (state.mode === "quaternion") {
			this.root.visible = false;
			return;
		}
		this.root.visible = true;
		const { position: cameraPos } = computeSubjectTransform(state);
		const { up, right, backward } = rollBasis(state.target, cameraPos);
		this.root.position.set(state.target.x, state.target.y, state.target.z);
		const orient = new Quaternion().setFromRotationMatrix(new Matrix4().makeBasis(right, up, backward));
		this.root.quaternion.copy(orient);
		const theta = state.roll * DEG2RAD$1;
		this.handle.position.set(RING_RADIUS * Math.sin(theta), RING_RADIUS * Math.cos(theta), 0);
	}
	pickableMeshes() {
		return [this.handle];
	}
	setHovered(hovered) {
		this.handle.scale.setScalar(hovered ? HOVER_SCALE : 1);
		this.handleGlow.material.opacity = hovered ? HOVER_GLOW_OPACITY : BASE_GLOW_OPACITY;
	}
	dragPlane(state) {
		const { position: cameraPos } = computeSubjectTransform(state);
		const { backward } = rollBasis(state.target, cameraPos);
		const tgt = new Vector3(state.target.x, state.target.y, state.target.z);
		return new Plane().setFromNormalAndCoplanarPoint(backward, tgt);
	}
};
window.comfyAPI = window.comfyAPI || {};
window.comfyAPI.RollHandle = window.comfyAPI.RollHandle || {};
window.comfyAPI.RollHandle.RollHandle = RollHandle;
//#endregion
//#region src/extensions/core/cameraInfo/handles/TargetHandle.ts
var TargetHandle = class {
	onDraggingChange;
	onChange;
	proxy;
	controls;
	helper;
	suppressEcho = false;
	scene = null;
	disposed = false;
	constructor(camera, domElement, onDraggingChange, onChange) {
		this.onDraggingChange = onDraggingChange;
		this.onChange = onChange;
		this.proxy = new Object3D();
		this.proxy.name = "CameraInfoTargetProxy";
		this.controls = new TransformControls(camera, domElement);
		this.controls.setMode("translate");
		this.controls.setSize(.8);
		this.controls.attach(this.proxy);
		this.helper = this.controls.getHelper();
		this.helper.name = "CameraInfoTargetHandle";
		this.helper.visible = false;
		this.controls.enabled = false;
		this.controls.addEventListener("dragging-changed", this.onDragging);
		this.controls.addEventListener("objectChange", this.onObjectChange);
	}
	attach(scene) {
		this.scene = scene;
		scene.add(this.proxy);
		scene.add(this.helper);
	}
	detach() {
		if (!this.scene) return;
		this.scene.remove(this.proxy);
		this.scene.remove(this.helper);
		this.scene = null;
	}
	setVisible(visible) {
		this.helper.visible = visible;
		this.controls.enabled = visible;
	}
	isVisible() {
		return this.helper.visible;
	}
	setTarget(target) {
		if (this.proxy.position.x === target.x && this.proxy.position.y === target.y && this.proxy.position.z === target.z) return;
		this.suppressEcho = true;
		try {
			this.proxy.position.set(target.x, target.y, target.z);
			this.proxy.updateMatrixWorld(true);
		} finally {
			this.suppressEcho = false;
		}
	}
	dispose() {
		if (this.disposed) return;
		this.disposed = true;
		this.controls.removeEventListener("dragging-changed", this.onDragging);
		this.controls.removeEventListener("objectChange", this.onObjectChange);
		this.controls.detach();
		this.detach();
		this.controls.dispose();
	}
	onDragging = (event) => {
		this.onDraggingChange(event.value === true);
	};
	onObjectChange = () => {
		if (this.suppressEcho) return;
		this.onChange({
			x: this.proxy.position.x,
			y: this.proxy.position.y,
			z: this.proxy.position.z
		});
	};
};
window.comfyAPI = window.comfyAPI || {};
window.comfyAPI.TargetHandle = window.comfyAPI.TargetHandle || {};
window.comfyAPI.TargetHandle.TargetHandle = TargetHandle;
//#endregion
//#region src/extensions/core/cameraInfo/lookThroughDragMath.ts
var DEG2RAD = Math.PI / 180;
var RAD2DEG = 180 / Math.PI;
var ELEVATION_LIMIT = 89 * DEG2RAD;
var DOLLY_EXP_SENSITIVITY = .0015;
var FREE_DOLLY_UNIT = .01;
var MIN_ZOOM = .05;
var MAX_ZOOM = 100;
function directionToSpherical(dir) {
	return {
		azimuth: Math.atan2(dir.x, dir.z),
		elevation: Math.asin(clamp(dir.y, -1, 1))
	};
}
function sphericalToDirection(azimuth, elevation) {
	const ce = Math.cos(elevation);
	return new Vector3(ce * Math.sin(azimuth), Math.sin(elevation), ce * Math.cos(azimuth));
}
function rotateOrbit(state, yawDelta, pitchDelta) {
	const yaw = state.orbit.yaw + yawDelta * RAD2DEG;
	const pitch = clamp(state.orbit.pitch + pitchDelta * RAD2DEG, -89, 89);
	return {
		nextState: {
			...state,
			orbit: {
				...state.orbit,
				yaw,
				pitch
			}
		},
		updates: [{
			fieldName: "mode.yaw",
			value: yaw
		}, {
			fieldName: "mode.pitch",
			value: pitch
		}]
	};
}
function rotateLookAt(state, yawDelta, pitchDelta) {
	const position = new Vector3(state.lookAt.position.x, state.lookAt.position.y, state.lookAt.position.z);
	const offset = new Vector3(state.target.x, state.target.y, state.target.z).clone().sub(position);
	const distance = offset.length();
	if (distance < 1e-6) return null;
	const { azimuth, elevation } = directionToSpherical(offset.clone().normalize());
	const dir = sphericalToDirection(azimuth + yawDelta, clamp(elevation + pitchDelta, -ELEVATION_LIMIT, ELEVATION_LIMIT));
	const nextTarget = {
		x: position.x + dir.x * distance,
		y: position.y + dir.y * distance,
		z: position.z + dir.z * distance
	};
	return {
		nextState: {
			...state,
			target: nextTarget
		},
		updates: [
			{
				fieldName: "target_x",
				value: nextTarget.x
			},
			{
				fieldName: "target_y",
				value: nextTarget.y
			},
			{
				fieldName: "target_z",
				value: nextTarget.z
			}
		]
	};
}
function rotateQuaternion(state, yawDelta, pitchDelta) {
	const q = normalizeQuaternion(new Quaternion(state.quaternion.quat.x, state.quaternion.quat.y, state.quaternion.quat.z, state.quaternion.quat.w));
	const yawQ = new Quaternion().setFromAxisAngle(new Vector3(0, 1, 0), yawDelta);
	const pitchQ = new Quaternion().setFromAxisAngle(new Vector3(1, 0, 0), pitchDelta);
	q.premultiply(yawQ).multiply(pitchQ).normalize();
	const quat = {
		x: q.x,
		y: q.y,
		z: q.z,
		w: q.w
	};
	return {
		nextState: {
			...state,
			quaternion: {
				...state.quaternion,
				quat
			}
		},
		updates: [
			{
				fieldName: "mode.quat_x",
				value: quat.x
			},
			{
				fieldName: "mode.quat_y",
				value: quat.y
			},
			{
				fieldName: "mode.quat_z",
				value: quat.z
			},
			{
				fieldName: "mode.quat_w",
				value: quat.w
			}
		]
	};
}
function rotateSubjectByDrag(state, yawDelta, pitchDelta) {
	switch (state.mode) {
		case "orbit": return rotateOrbit(state, yawDelta, pitchDelta);
		case "look_at": return rotateLookAt(state, yawDelta, pitchDelta);
		case "quaternion": return rotateQuaternion(state, yawDelta, pitchDelta);
	}
}
function dollyOrbit(state, deltaY) {
	const factor = Math.exp(deltaY * DOLLY_EXP_SENSITIVITY);
	const distance = clamp(state.orbit.distance * factor, MIN_DISTANCE, 100);
	return {
		nextState: {
			...state,
			orbit: {
				...state.orbit,
				distance
			}
		},
		updates: [{
			fieldName: "mode.distance",
			value: distance
		}]
	};
}
function dollyLookAt(state, deltaY) {
	const position = new Vector3(state.lookAt.position.x, state.lookAt.position.y, state.lookAt.position.z);
	const target = new Vector3(state.target.x, state.target.y, state.target.z);
	const offset = position.clone().sub(target);
	const distance = offset.length();
	if (distance < 1e-6) return null;
	const factor = Math.exp(deltaY * DOLLY_EXP_SENSITIVITY);
	const nextDistance = clamp(distance * factor, MIN_DISTANCE, 100);
	const next = target.clone().add(offset.multiplyScalar(nextDistance / distance));
	const nextPosition = {
		x: next.x,
		y: next.y,
		z: next.z
	};
	return {
		nextState: {
			...state,
			lookAt: { position: nextPosition }
		},
		updates: [
			{
				fieldName: "mode.position_x",
				value: nextPosition.x
			},
			{
				fieldName: "mode.position_y",
				value: nextPosition.y
			},
			{
				fieldName: "mode.position_z",
				value: nextPosition.z
			}
		]
	};
}
function dollyQuaternion(state, deltaY) {
	const q = normalizeQuaternion(new Quaternion(state.quaternion.quat.x, state.quaternion.quat.y, state.quaternion.quat.z, state.quaternion.quat.w));
	const forward = new Vector3(0, 0, -1).applyQuaternion(q);
	const step = -deltaY * FREE_DOLLY_UNIT;
	const p = state.quaternion.position;
	const nextPosition = {
		x: p.x + forward.x * step,
		y: p.y + forward.y * step,
		z: p.z + forward.z * step
	};
	return {
		nextState: {
			...state,
			quaternion: {
				...state.quaternion,
				position: nextPosition
			}
		},
		updates: [
			{
				fieldName: "mode.position_x",
				value: nextPosition.x
			},
			{
				fieldName: "mode.position_y",
				value: nextPosition.y
			},
			{
				fieldName: "mode.position_z",
				value: nextPosition.z
			}
		]
	};
}
function dollyZoom(state, deltaY) {
	const factor = Math.exp(deltaY * DOLLY_EXP_SENSITIVITY);
	const zoom = clamp(state.zoom / factor, MIN_ZOOM, MAX_ZOOM);
	return {
		nextState: {
			...state,
			zoom
		},
		updates: [{
			fieldName: "zoom",
			value: zoom
		}]
	};
}
function dollySubjectByWheel(state, deltaY) {
	if (state.cameraType === "orthographic") return dollyZoom(state, deltaY);
	switch (state.mode) {
		case "orbit": return dollyOrbit(state, deltaY);
		case "look_at": return dollyLookAt(state, deltaY);
		case "quaternion": return dollyQuaternion(state, deltaY);
	}
}
window.comfyAPI = window.comfyAPI || {};
window.comfyAPI.lookThroughDragMath = window.comfyAPI.lookThroughDragMath || {};
window.comfyAPI.lookThroughDragMath.rotateSubjectByDrag = rotateSubjectByDrag;
window.comfyAPI.lookThroughDragMath.dollySubjectByWheel = dollySubjectByWheel;
//#endregion
//#region src/extensions/core/cameraInfo/CameraInfoViewport.ts
var LOOK_THROUGH_SENSITIVITY = .005;
var DRAG_HANDLE_TYPES = {
	yaw: true,
	pitch: true,
	distance: true,
	roll: true
};
var isDragHandleType = (value) => Object.hasOwn(DRAG_HANDLE_TYPES, value);
var FIELD_NAME_FOR = {
	yaw: "mode.yaw",
	pitch: "mode.pitch",
	distance: "mode.distance"
};
var CameraInfoViewport = class {
	viewport;
	overlay;
	orbitHandles;
	rollHandle;
	targetHandle;
	cameraHandle;
	disposePreRender;
	disposePostRender;
	onHandleDrag;
	raycaster = new Raycaster();
	pointerNdc = new Vector2();
	dragPoint = new Vector3();
	input;
	gizmosOn = true;
	lookingThrough = false;
	transformGizmoMode = "none";
	constructor(container, initialState = DEFAULT_CAMERA_INFO_STATE, options) {
		this.onHandleDrag = options?.onHandleDrag;
		this.viewport = createViewport3d(container, options);
		this.viewport.viewHelperManager.visibleViewHelper(false);
		this.overlay = new CameraInfoOverlay(initialState);
		this.viewport.setOverlay(this.overlay);
		this.orbitHandles = new OrbitHandles();
		this.orbitHandles.attach(this.viewport.sceneManager.scene);
		this.orbitHandles.update(initialState);
		this.rollHandle = new RollHandle();
		this.rollHandle.attach(this.viewport.sceneManager.scene);
		this.rollHandle.update(initialState);
		this.targetHandle = new TargetHandle(this.viewport.cameraManager.activeCamera, this.viewport.domElement, (dragging) => {
			this.viewport.controlsManager.controls.enabled = !dragging;
		}, (target) => {
			const next = {
				...this.overlay.getState(),
				target
			};
			this.applyDerivedState(next);
			this.onHandleDrag?.("target_x", target.x);
			this.onHandleDrag?.("target_y", target.y);
			this.onHandleDrag?.("target_z", target.z);
		});
		this.targetHandle.attach(this.viewport.sceneManager.scene);
		this.targetHandle.setTarget(initialState.target);
		this.cameraHandle = new CameraHandle(this.viewport.cameraManager.activeCamera, this.viewport.domElement, (dragging) => {
			this.viewport.controlsManager.controls.enabled = !dragging;
		}, (transform, mode) => this.handleCameraDrag(transform, mode));
		this.cameraHandle.attach(this.viewport.sceneManager.scene);
		this.syncCameraHandleSubject(initialState);
		this.input = new PointerInteraction({
			canvas: this.canvas,
			pickHandle: (position) => this.pickHandle(position),
			dragHandle: (type, position) => this.dragHandle(type, position),
			hoverChanged: (type) => {
				this.orbitHandles.setHovered(type === "roll" ? null : type);
				this.rollHandle.setHovered(type === "roll");
				this.viewport.forceRender();
			},
			handleDragChanged: (dragging) => {
				this.viewport.controlsManager.controls.enabled = !dragging;
			},
			freeDragEnabled: () => this.lookingThrough,
			freeDrag: (dx, dy) => this.applyResult(rotateSubjectByDrag(this.overlay.getState(), -dx * LOOK_THROUGH_SENSITIVITY, -dy * LOOK_THROUGH_SENSITIVITY)),
			wheelEnabled: () => this.lookingThrough,
			wheel: (deltaY) => this.applyResult(dollySubjectByWheel(this.overlay.getState(), deltaY)),
			idleCursor: () => this.input.hoveredHandle ? "grab" : ""
		});
		this.input.attach();
		this.disposePreRender = this.viewport.addPreRenderCallback(() => {
			if (this.lookingThrough) this.fitSubjectAspect();
		});
		this.disposePostRender = this.viewport.addPostRenderCallback(() => {
			if (!this.lookingThrough) this.renderSubjectCameraPreview();
		});
	}
	applyState(state) {
		this.overlay.applyState(state);
		this.orbitHandles.update(state);
		this.rollHandle.update(state);
		this.targetHandle.setTarget(state.target);
		this.syncCameraHandleSubject(state);
		this.refreshGizmoVisibility();
		if (this.lookingThrough) this.viewport.setExternalActiveCamera(this.overlay.getSubjectCamera());
		this.viewport.forceRender();
	}
	setGizmosVisible(on) {
		if (this.gizmosOn === on) return;
		this.gizmosOn = on;
		this.refreshGizmoVisibility();
		this.viewport.forceRender();
	}
	setTransformGizmoMode(mode) {
		if (this.transformGizmoMode === mode) return;
		this.transformGizmoMode = mode;
		this.refreshGizmoVisibility();
		this.viewport.forceRender();
	}
	setLookThrough(on) {
		if (this.lookingThrough === on) return;
		this.lookingThrough = on;
		this.input.cancel();
		this.refreshGizmoVisibility();
		if (on) this.fitSubjectAspect();
		this.viewport.setExternalActiveCamera(on ? this.overlay.getSubjectCamera() : null);
		if (!on) this.viewport.viewHelperManager.visibleViewHelper(false);
	}
	remove() {
		this.input.detach();
		this.input.cancel();
		this.canvas.style.cursor = "";
		this.disposePreRender();
		this.disposePostRender();
		this.orbitHandles.dispose();
		this.rollHandle.dispose();
		this.targetHandle.dispose();
		this.cameraHandle.dispose();
		this.viewport.remove();
	}
	refreshGizmoVisibility() {
		if (this.lookingThrough) {
			this.orbitHandles.setVisible(false);
			this.rollHandle.setVisible(false);
			this.targetHandle.setVisible(false);
			this.cameraHandle.setVisible(false);
			return;
		}
		const mode = this.overlay.getState().mode;
		this.orbitHandles.setVisible(this.gizmosOn && mode === "orbit");
		this.rollHandle.setVisible(this.gizmosOn && rollApplies(mode));
		const wantTarget = this.gizmosOn && this.transformGizmoMode === "target" && targetApplies(mode);
		this.targetHandle.setVisible(wantTarget);
		const wantTranslate = this.gizmosOn && this.transformGizmoMode === "camera-translate" && cameraTranslateApplies(mode);
		const wantRotate = this.gizmosOn && this.transformGizmoMode === "camera-rotate" && cameraRotateApplies(mode);
		const wantCamera = wantTranslate || wantRotate;
		if (wantCamera) this.cameraHandle.setMode(wantRotate ? "rotate" : "translate");
		this.cameraHandle.setVisible(wantCamera);
	}
	syncCameraHandleSubject(state) {
		const { position, quaternion } = computeSubjectTransform(state);
		this.cameraHandle.setSubject({
			x: position.x,
			y: position.y,
			z: position.z
		}, {
			x: quaternion.x,
			y: quaternion.y,
			z: quaternion.z,
			w: quaternion.w
		});
	}
	applyDerivedState(next) {
		this.overlay.applyState(next);
		this.orbitHandles.update(next);
		this.rollHandle.update(next);
		this.targetHandle.setTarget(next.target);
		this.syncCameraHandleSubject(next);
		this.refreshGizmoVisibility();
		this.viewport.forceRender();
	}
	handleCameraDrag(transform, mode) {
		const next = nextStateForCameraDrag(this.overlay.getState(), transform, mode);
		this.applyDerivedState(next);
		if (mode === "translate") {
			this.onHandleDrag?.("mode.position_x", transform.position.x);
			this.onHandleDrag?.("mode.position_y", transform.position.y);
			this.onHandleDrag?.("mode.position_z", transform.position.z);
		} else {
			this.onHandleDrag?.("mode.quat_x", transform.quaternion.x);
			this.onHandleDrag?.("mode.quat_y", transform.quaternion.y);
			this.onHandleDrag?.("mode.quat_z", transform.quaternion.z);
			this.onHandleDrag?.("mode.quat_w", transform.quaternion.w);
		}
	}
	get canvas() {
		return this.viewport.domElement;
	}
	updatePointer({ clientX, clientY }) {
		const rect = this.canvas.getBoundingClientRect();
		this.pointerNdc.x = (clientX - rect.left) / rect.width * 2 - 1;
		this.pointerNdc.y = -((clientY - rect.top) / rect.height) * 2 + 1;
	}
	pickableTargetsFor(mode) {
		const targets = [];
		if (mode === "orbit") targets.push(...this.orbitHandles.pickableMeshes());
		if (rollApplies(mode)) targets.push(...this.rollHandle.pickableMeshes());
		return targets;
	}
	pickHandle(position) {
		if (!this.gizmosOn || this.lookingThrough) return null;
		const targets = this.pickableTargetsFor(this.overlay.getState().mode);
		if (targets.length === 0) return null;
		this.updatePointer(position);
		const picked = pickHandleAtPointer(this.raycaster, this.pointerNdc, this.viewport.cameraManager.activeCamera, targets, this.canvas);
		return picked !== null && isDragHandleType(picked) ? picked : null;
	}
	dragHandle(type, position) {
		this.updatePointer(position);
		this.raycaster.setFromCamera(this.pointerNdc, this.viewport.cameraManager.activeCamera);
		const state = this.overlay.getState();
		const plane = type === "roll" ? this.rollHandle.dragPlane(state) : this.orbitHandles.dragPlaneFor(type, state);
		if (!this.raycaster.ray.intersectPlane(plane, this.dragPoint)) return;
		const { fieldName, value, nextState } = computeNextState(type, state, this.dragPoint);
		this.applyState(nextState);
		this.onHandleDrag?.(fieldName, value);
	}
	applyResult(result) {
		if (!result) return;
		this.applyState(result.nextState);
		for (const update of result.updates) this.onHandleDrag?.(update.fieldName, update.value);
	}
	fitSubjectAspect() {
		const canvas = this.viewport.domElement;
		fitCameraAspect(this.overlay.getSubjectCamera(), canvas.width / canvas.height);
	}
	renderSubjectCameraPreview() {
		renderInsetPreview({
			renderer: this.viewport.renderer,
			view: this.viewport.rendererView,
			canvas: this.viewport.domElement,
			scene: this.viewport.sceneManager.scene,
			camera: this.overlay.getSubjectCamera(),
			hidden: [
				{
					isVisible: () => this.overlay.isHelperVisible(),
					setVisible: (visible) => this.overlay.setHelperVisible(visible)
				},
				this.orbitHandles,
				this.rollHandle,
				this.targetHandle,
				this.cameraHandle
			]
		});
	}
};
function computeNextState(type, state, point) {
	if (type === "roll") {
		const cameraPos = computeSubjectTransform(state).position;
		const value = pointToRollAngle({
			x: point.x,
			y: point.y,
			z: point.z
		}, state.target, {
			x: cameraPos.x,
			y: cameraPos.y,
			z: cameraPos.z
		});
		return {
			fieldName: "roll",
			value,
			nextState: {
				...state,
				roll: value
			}
		};
	}
	const fieldName = FIELD_NAME_FOR[type];
	if (type === "yaw") {
		const value = pointToYawAngle(point, state.target);
		return {
			fieldName,
			value,
			nextState: {
				...state,
				orbit: {
					...state.orbit,
					yaw: value
				}
			}
		};
	}
	if (type === "pitch") {
		const value = pointToPitchAngle(point, state.target, state.orbit.yaw);
		return {
			fieldName,
			value,
			nextState: {
				...state,
				orbit: {
					...state.orbit,
					pitch: value
				}
			}
		};
	}
	const value = pointToDistance(point, state.target, state.orbit.yaw, state.orbit.pitch);
	return {
		fieldName,
		value,
		nextState: {
			...state,
			orbit: {
				...state.orbit,
				distance: value
			}
		}
	};
}
function targetApplies(mode) {
	return mode === "orbit" || mode === "look_at";
}
function cameraTranslateApplies(mode) {
	return mode === "look_at" || mode === "quaternion";
}
function cameraRotateApplies(mode) {
	return mode === "quaternion";
}
function rollApplies(mode) {
	return mode === "orbit" || mode === "look_at";
}
function nextStateForCameraDrag(state, transform, mode) {
	const { position, quaternion } = transform;
	if (mode === "translate") {
		if (state.mode === "look_at") return {
			...state,
			lookAt: { position: { ...position } }
		};
		if (state.mode === "quaternion") return {
			...state,
			quaternion: {
				...state.quaternion,
				position: { ...position }
			}
		};
		return state;
	}
	if (state.mode === "quaternion") return {
		...state,
		quaternion: {
			...state.quaternion,
			quat: { ...quaternion }
		}
	};
	return state;
}
window.comfyAPI = window.comfyAPI || {};
window.comfyAPI.CameraInfoViewport = window.comfyAPI.CameraInfoViewport || {};
window.comfyAPI.CameraInfoViewport.CameraInfoViewport = CameraInfoViewport;
//#endregion
//#region src/extensions/core/cameraInfo/widgetBridge.ts
var VALID_MODES = [
	"orbit",
	"look_at",
	"quaternion"
];
var VALID_CAMERA_TYPES = ["perspective", "orthographic"];
function widgetByName(node, name) {
	return node.widgets?.find((w) => w.name === name);
}
function num(node, name, fallback) {
	const v = widgetByName(node, name)?.value;
	return typeof v === "number" && Number.isFinite(v) ? v : fallback;
}
function pickMode(node) {
	const v = widgetByName(node, "mode")?.value;
	return typeof v === "string" && VALID_MODES.includes(v) ? v : DEFAULT_CAMERA_INFO_STATE.mode;
}
function pickCameraType(node) {
	const v = widgetByName(node, "camera_type")?.value;
	return typeof v === "string" && VALID_CAMERA_TYPES.includes(v) ? v : DEFAULT_CAMERA_INFO_STATE.cameraType;
}
function readStateFromWidgets(node) {
	const d = DEFAULT_CAMERA_INFO_STATE;
	return {
		mode: pickMode(node),
		target: {
			x: num(node, "target_x", d.target.x),
			y: num(node, "target_y", d.target.y),
			z: num(node, "target_z", d.target.z)
		},
		roll: num(node, "roll", d.roll),
		fov: num(node, "fov", d.fov),
		zoom: num(node, "zoom", d.zoom),
		cameraType: pickCameraType(node),
		orbit: {
			yaw: num(node, "mode.yaw", d.orbit.yaw),
			pitch: num(node, "mode.pitch", d.orbit.pitch),
			distance: num(node, "mode.distance", d.orbit.distance)
		},
		lookAt: { position: {
			x: num(node, "mode.position_x", d.lookAt.position.x),
			y: num(node, "mode.position_y", d.lookAt.position.y),
			z: num(node, "mode.position_z", d.lookAt.position.z)
		} },
		quaternion: {
			position: {
				x: num(node, "mode.position_x", d.quaternion.position.x),
				y: num(node, "mode.position_y", d.quaternion.position.y),
				z: num(node, "mode.position_z", d.quaternion.position.z)
			},
			quat: {
				x: num(node, "mode.quat_x", d.quaternion.quat.x),
				y: num(node, "mode.quat_y", d.quaternion.quat.y),
				z: num(node, "mode.quat_z", d.quaternion.quat.z),
				w: num(node, "mode.quat_w", d.quaternion.quat.w)
			}
		}
	};
}
function writeWidgetValue(node, name, value) {
	const widget = widgetByName(node, name);
	if (!widget || widget.value === value) return;
	widget.value = value;
}
window.comfyAPI = window.comfyAPI || {};
window.comfyAPI.widgetBridge = window.comfyAPI.widgetBridge || {};
window.comfyAPI.widgetBridge.readStateFromWidgets = readStateFromWidgets;
window.comfyAPI.widgetBridge.writeWidgetValue = writeWidgetValue;
//#endregion
//#region src/composables/useCameraInfo.ts
var WIDGET_NAMES = [
	"mode",
	"camera_type",
	"target_x",
	"target_y",
	"target_z",
	"roll",
	"fov",
	"zoom",
	"mode.yaw",
	"mode.pitch",
	"mode.distance",
	"mode.position_x",
	"mode.position_y",
	"mode.position_z",
	"mode.quat_x",
	"mode.quat_y",
	"mode.quat_z",
	"mode.quat_w"
];
function useCameraInfo(nodeRef) {
	const node = toRef(nodeRef);
	const wiring = useViewportNodeWiring();
	let viewport = null;
	const cameraState = ref(DEFAULT_CAMERA_INFO_STATE);
	const mode = computed(() => cameraState.value.mode);
	const initialize = (container) => {
		const raw = toRaw(node.value);
		if (!raw) return;
		if (viewport) cleanup();
		try {
			const initialState = readStateFromWidgets(raw);
			cameraState.value = initialState;
			viewport = new CameraInfoViewport(container, initialState, { onHandleDrag: (fieldName, value) => {
				writeWidgetValue(raw, fieldName, value);
			} });
			wireWidgetsToOverlay(raw);
			wiring.wireNode(raw, { viewport: () => viewport?.viewport });
		} catch (error) {
			console.error("Failed to initialize CameraInfoViewport:", error);
			cleanup();
			useToastStore().addAlert(t("toastMessages.failedToInitializeCameraInfoViewer"));
		}
	};
	const cleanup = () => {
		wiring.unwire();
		viewport?.remove();
		viewport = null;
	};
	const handleMouseEnter = () => {
		viewport?.viewport.updateStatusMouseOnScene(true);
		viewport?.viewport.refreshViewport();
	};
	const handleMouseLeave = () => {
		viewport?.viewport.updateStatusMouseOnScene(false);
	};
	const setGizmosVisible = (on) => {
		viewport?.setGizmosVisible(on);
	};
	const setTransformGizmoMode = (gizmoMode) => {
		viewport?.setTransformGizmoMode(gizmoMode);
	};
	const setLookThrough = (on) => {
		viewport?.setLookThrough(on);
	};
	function wireWidgetsToOverlay(target) {
		wiring.wireWidgets(target, WIDGET_NAMES, (widget) => {
			if (widget.name === "mode") wireWidgetsToOverlay(target);
			if (!viewport) return;
			const state = readStateFromWidgets(target);
			cameraState.value = state;
			viewport.applyState(state);
		});
	}
	return {
		initialize,
		cleanup,
		handleMouseEnter,
		handleMouseLeave,
		setGizmosVisible,
		setTransformGizmoMode,
		setLookThrough,
		mode
	};
}
//#endregion
//#region src/components/cameraInfo/CameraInfo.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1 = [
	"disabled",
	"aria-pressed",
	"aria-label"
];
var _hoisted_2 = { key: 0 };
var _hoisted_3 = [
	"disabled",
	"aria-pressed",
	"aria-label",
	"onClick"
];
var _hoisted_4 = { key: 0 };
var _hoisted_5 = ["aria-pressed", "aria-label"];
var compactWidthThreshold = 480;
//#endregion
//#region src/components/cameraInfo/CameraInfo.vue
var CameraInfo_default = /* @__PURE__ */ defineComponent({
	__name: "CameraInfo",
	props: {
		widget: {},
		nodeId: {}
	},
	setup(__props) {
		function isComponentWidget(w) {
			return "node" in w && w.node !== void 0;
		}
		const node = ref(null);
		if (isComponentWidget(__props.widget)) node.value = __props.widget.node;
		else if (__props.nodeId) onMounted(() => {
			node.value = resolveNode(__props.nodeId) ?? null;
		});
		const { t } = useI18n();
		const shell = useTemplateRef("shell");
		const { width: toolbarWidth } = useElementSize(computed(() => shell.value?.toolbar ?? null));
		const compact = computed(() => toolbarWidth.value > 0 && toolbarWidth.value < compactWidthThreshold);
		const gizmosOn = ref(true);
		const lookingThrough = ref(false);
		const transformGizmoMode = ref("none");
		const { initialize, cleanup, handleMouseEnter, handleMouseLeave, setGizmosVisible, setTransformGizmoMode, setLookThrough, mode } = useCameraInfo(node);
		const gizmosLabel = computed(() => gizmosOn.value ? t("load3d.hideGizmos") : t("load3d.showGizmos"));
		const lookThroughLabel = computed(() => lookingThrough.value ? t("load3d.exitLookThrough") : t("load3d.lookThrough"));
		const transformGizmoOptions = computed(() => [
			{
				value: "none",
				labelKey: "load3d.transformGizmo.none",
				icon: "icon-[lucide--ban]",
				enabled: true
			},
			{
				value: "target",
				labelKey: "load3d.transformGizmo.target",
				icon: "icon-[lucide--target]",
				enabled: mode.value === "orbit" || mode.value === "look_at"
			},
			{
				value: "camera-translate",
				labelKey: "load3d.transformGizmo.cameraTranslate",
				icon: "icon-[lucide--move-3d]",
				enabled: mode.value === "look_at" || mode.value === "quaternion"
			},
			{
				value: "camera-rotate",
				labelKey: "load3d.transformGizmo.cameraRotate",
				icon: "icon-[lucide--rotate-3d]",
				enabled: mode.value === "quaternion"
			}
		]);
		const effectiveTransformGizmoMode = computed(() => transformGizmoOptions.value.some(({ value, enabled }) => value === transformGizmoMode.value && enabled) ? transformGizmoMode.value : "none");
		function toggleGizmos() {
			gizmosOn.value = !gizmosOn.value;
		}
		function toggleLookThrough() {
			lookingThrough.value = !lookingThrough.value;
		}
		function selectTransformGizmo(value) {
			transformGizmoMode.value = value;
		}
		watch(gizmosOn, (on) => setGizmosVisible(on));
		watch(effectiveTransformGizmoMode, (m) => setTransformGizmoMode(m));
		watch(lookingThrough, (on) => setLookThrough(on));
		onMounted(() => {
			const container = shell.value?.container;
			if (container) initialize(container);
		});
		onUnmounted(() => {
			cleanup();
		});
		return (_ctx, _cache) => {
			const _directive_tooltip = resolveDirective("tooltip");
			return openBlock(), createBlock(ViewportWidgetShell_default, {
				ref_key: "shell",
				ref: shell,
				"bottom-class": "justify-end",
				onMouseenter: unref(handleMouseEnter),
				onMouseleave: unref(handleMouseLeave)
			}, {
				top: withCtx(() => [
					withDirectives((openBlock(), createElementBlock("button", {
						type: "button",
						disabled: lookingThrough.value,
						class: normalizeClass(unref(cn)(unref(actionClass)(!lookingThrough.value && gizmosOn.value), lookingThrough.value && "cursor-not-allowed opacity-40")),
						"aria-pressed": !lookingThrough.value && gizmosOn.value,
						"aria-label": compact.value ? gizmosLabel.value : void 0,
						onClick: toggleGizmos
					}, [createBaseVNode("i", { class: normalizeClass(unref(cn)("size-4", gizmosOn.value ? "icon-[lucide--eye]" : "icon-[lucide--eye-off]")) }, null, 2), !compact.value ? (openBlock(), createElementBlock("span", _hoisted_2, toDisplayString(gizmosLabel.value), 1)) : createCommentVNode("", true)], 10, _hoisted_1)), [[
						_directive_tooltip,
						unref(tip)(gizmosLabel.value),
						void 0,
						{ bottom: true }
					]]),
					_cache[0] || (_cache[0] = createBaseVNode("div", { class: "mx-1 h-5 w-px shrink-0 bg-interface-menu-stroke" }, null, -1)),
					(openBlock(true), createElementBlock(Fragment, null, renderList(transformGizmoOptions.value, (option) => {
						return withDirectives((openBlock(), createElementBlock("button", {
							key: option.value,
							type: "button",
							disabled: lookingThrough.value || !option.enabled,
							"aria-pressed": !lookingThrough.value && effectiveTransformGizmoMode.value === option.value,
							"aria-label": compact.value ? _ctx.$t(option.labelKey) : void 0,
							class: normalizeClass(unref(cn)(unref(actionClass)(!lookingThrough.value && effectiveTransformGizmoMode.value === option.value), (lookingThrough.value || !option.enabled) && "cursor-not-allowed opacity-40")),
							onClick: ($event) => selectTransformGizmo(option.value)
						}, [createBaseVNode("i", { class: normalizeClass(unref(cn)("size-4", option.icon)) }, null, 2), !compact.value ? (openBlock(), createElementBlock("span", _hoisted_4, toDisplayString(_ctx.$t(option.labelKey)), 1)) : createCommentVNode("", true)], 10, _hoisted_3)), [[
							_directive_tooltip,
							unref(tip)(_ctx.$t(option.labelKey)),
							void 0,
							{ bottom: true }
						]]);
					}), 128))
				]),
				bottom: withCtx(() => [withDirectives((openBlock(), createElementBlock("button", {
					type: "button",
					class: normalizeClass(unref(cn)(unref(iconBtnClass), lookingThrough.value && "bg-button-active-surface")),
					"aria-pressed": lookingThrough.value,
					"aria-label": lookThroughLabel.value,
					onClick: toggleLookThrough
				}, [..._cache[1] || (_cache[1] = [createBaseVNode("i", { class: "icon-[lucide--video] size-4" }, null, -1)])], 10, _hoisted_5)), [[
					_directive_tooltip,
					unref(tip)(lookThroughLabel.value),
					void 0,
					{ top: true }
				]])]),
				_: 1
			}, 8, ["onMouseenter", "onMouseleave"]);
		};
	}
});
//#endregion
export { CameraInfo_default as t };
