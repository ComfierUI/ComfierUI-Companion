import "./rolldown-runtime-xtsTai4I.js";
import { Lt as clamp } from "./vendor-other-BPEcPQTD.js";
import { a as DEFAULT_CAMERA_INFO_STATE, i as pointToYawAngle, n as pointToDistance, r as pointToPitchAngle } from "./orbitDragMath-BBRzJ8Sz.js";
//#region src/extensions/core/cameraAngle/types.ts
var CAMERA_ANGLE_VIEW_MODES = ["camera", "object"];
var CAMERA_ANGLE_WIDGET_NAMES = {
	horizontal: "horizontal_angle",
	vertical: "vertical_angle",
	zoom: "zoom"
};
var CAMERA_ANGLE_VIEW_WIDGET_NAME = "view";
var CAMERA_ANGLE_LIMITS = {
	horizontal: {
		min: 0,
		max: 360
	},
	vertical: {
		min: -30,
		max: 60
	},
	zoom: {
		min: 0,
		max: 10
	}
};
var DEFAULT_CAMERA_ANGLE_STATE = {
	horizontal: 0,
	vertical: 0,
	zoom: 5
};
var SUBJECT_CENTER = {
	x: 0,
	y: 0,
	z: 0
};
var MAX_LENS_ZOOM = 1.875;
var ORBIT_SPHERE_RADIUS = 1.5;
var MIN_DISPLAY_DISTANCE = .8;
var MAX_DISPLAY_DISTANCE = 1.1;
var DEFAULT_SUBJECT_FACE_LABELS = {
	back: "BACK",
	left: "LEFT",
	right: "RIGHT",
	top: "TOP",
	bottom: "BOTTOM"
};
window.comfyAPI = window.comfyAPI || {};
window.comfyAPI.types = window.comfyAPI.types || {};
window.comfyAPI.types.CAMERA_ANGLE_VIEW_MODES = CAMERA_ANGLE_VIEW_MODES;
window.comfyAPI.types.CAMERA_ANGLE_WIDGET_NAMES = CAMERA_ANGLE_WIDGET_NAMES;
window.comfyAPI.types.CAMERA_ANGLE_VIEW_WIDGET_NAME = CAMERA_ANGLE_VIEW_WIDGET_NAME;
window.comfyAPI.types.CAMERA_ANGLE_LIMITS = CAMERA_ANGLE_LIMITS;
window.comfyAPI.types.DEFAULT_CAMERA_ANGLE_STATE = DEFAULT_CAMERA_ANGLE_STATE;
window.comfyAPI.types.SUBJECT_CENTER = SUBJECT_CENTER;
window.comfyAPI.types.SUBJECT_HEIGHT = 1;
window.comfyAPI.types.CAMERA_ANGLE_FOV = 35;
window.comfyAPI.types.SUBJECT_DISTANCE = 6;
window.comfyAPI.types.MIN_LENS_ZOOM = 1;
window.comfyAPI.types.MAX_LENS_ZOOM = MAX_LENS_ZOOM;
window.comfyAPI.types.ORBIT_SPHERE_RADIUS = ORBIT_SPHERE_RADIUS;
window.comfyAPI.types.MIN_DISPLAY_DISTANCE = MIN_DISPLAY_DISTANCE;
window.comfyAPI.types.MAX_DISPLAY_DISTANCE = MAX_DISPLAY_DISTANCE;
window.comfyAPI.types.YAW_RING_LATITUDE = -40;
window.comfyAPI.types.DEFAULT_SUBJECT_FACE_LABELS = DEFAULT_SUBJECT_FACE_LABELS;
//#endregion
//#region src/extensions/core/cameraAngle/cameraAngleMath.ts
var DRAG_DEGREES_PER_PIXEL = .5;
var WHEEL_ZOOM_PER_PIXEL = .01;
var ZOOM_DECIMALS = 1;
var HORIZONTAL_TERMS = [
	{
		key: "front",
		prompt: "front view",
		preset: 0
	},
	{
		key: "frontRight",
		prompt: "front-right quarter view",
		preset: 45
	},
	{
		key: "right",
		prompt: "right side view",
		preset: 90
	},
	{
		key: "backRight",
		prompt: "back-right quarter view",
		preset: 135
	},
	{
		key: "back",
		prompt: "back view",
		preset: 180
	},
	{
		key: "backLeft",
		prompt: "back-left quarter view",
		preset: 225
	},
	{
		key: "left",
		prompt: "left side view",
		preset: 270
	},
	{
		key: "frontLeft",
		prompt: "front-left quarter view",
		preset: 315
	}
];
var VERTICAL_TERMS = [
	{
		key: "lowAngle",
		prompt: "low-angle shot",
		preset: -20
	},
	{
		key: "eyeLevel",
		prompt: "eye-level shot",
		preset: 0
	},
	{
		key: "elevated",
		prompt: "elevated shot",
		preset: 30
	},
	{
		key: "highAngle",
		prompt: "high-angle shot",
		preset: 55
	}
];
var VERTICAL_UPPER_BOUNDS = [
	-15,
	15,
	45
];
var DISTANCE_TERMS = [
	{
		key: "wide",
		prompt: "wide shot",
		preset: 1
	},
	{
		key: "medium",
		prompt: "medium shot",
		preset: 5
	},
	{
		key: "closeUp",
		prompt: "close-up",
		preset: 8
	}
];
var DISTANCE_UPPER_BOUNDS = [2, 6];
function normalizeHorizontal(degrees) {
	return (degrees % 360 + 360) % 360;
}
function clampState(state) {
	return {
		horizontal: clamp(state.horizontal, CAMERA_ANGLE_LIMITS.horizontal.min, CAMERA_ANGLE_LIMITS.horizontal.max),
		vertical: clamp(state.vertical, CAMERA_ANGLE_LIMITS.vertical.min, CAMERA_ANGLE_LIMITS.vertical.max),
		zoom: clamp(state.zoom, CAMERA_ANGLE_LIMITS.zoom.min, CAMERA_ANGLE_LIMITS.zoom.max)
	};
}
function roundState(state) {
	const zoomScale = 10 ** ZOOM_DECIMALS;
	return clampState({
		horizontal: Math.round(state.horizontal),
		vertical: Math.round(state.vertical),
		zoom: Math.round(state.zoom * zoomScale) / zoomScale
	});
}
function bucket(value, upperBounds, terms) {
	const index = upperBounds.findIndex((upper) => value < upper);
	return terms[index === -1 ? terms.length - 1 : index];
}
function horizontalTerm(degrees) {
	return HORIZONTAL_TERMS[Math.floor((normalizeHorizontal(degrees) + 22.5) / 45) % HORIZONTAL_TERMS.length];
}
function verticalTerm(degrees) {
	return bucket(degrees, VERTICAL_UPPER_BOUNDS, VERTICAL_TERMS);
}
function distanceTerm(zoom) {
	return bucket(zoom, DISTANCE_UPPER_BOUNDS, DISTANCE_TERMS);
}
function describeCameraAngle(state) {
	return [
		horizontalTerm(state.horizontal).prompt,
		verticalTerm(state.vertical).prompt,
		distanceTerm(state.zoom).prompt
	].join(" ");
}
function zoomToRange(zoom, near, far) {
	return far - (far - near) * zoom / CAMERA_ANGLE_LIMITS.zoom.max;
}
function rangeToZoom(distance, near, far) {
	return (far - distance) * CAMERA_ANGLE_LIMITS.zoom.max / (far - near);
}
function zoomToLensZoom(zoom) {
	return 1 + (MAX_LENS_ZOOM - 1) * zoom / CAMERA_ANGLE_LIMITS.zoom.max;
}
function zoomToDisplayDistance(zoom) {
	return zoomToRange(zoom, MIN_DISPLAY_DISTANCE, MAX_DISPLAY_DISTANCE);
}
function displayDistanceToZoom(distance) {
	return rangeToZoom(distance, MIN_DISPLAY_DISTANCE, MAX_DISPLAY_DISTANCE);
}
function orbitState(state, distance, zoom = DEFAULT_CAMERA_INFO_STATE.zoom) {
	return {
		...DEFAULT_CAMERA_INFO_STATE,
		mode: "orbit",
		target: { ...SUBJECT_CENTER },
		fov: 35,
		zoom,
		orbit: {
			yaw: state.horizontal,
			pitch: state.vertical,
			distance
		}
	};
}
function toOrbitCameraInfoState(state) {
	return orbitState(state, 6, zoomToLensZoom(state.zoom));
}
function toHandleOrbitState(state) {
	return orbitState(state, zoomToDisplayDistance(state.zoom));
}
var OVERVIEW_FIT_MARGIN = 1.2;
function overviewDistance(aspect, fovDegrees) {
	const halfFov = fovDegrees / 2 * (Math.PI / 180);
	const shortSide = Math.min(1, aspect);
	return ORBIT_SPHERE_RADIUS * OVERVIEW_FIT_MARGIN / (Math.tan(halfFov) * shortSide);
}
function rotateByDrag(state, dx, dy) {
	return clampState({
		...state,
		horizontal: normalizeHorizontal(state.horizontal - dx * DRAG_DEGREES_PER_PIXEL),
		vertical: state.vertical + dy * DRAG_DEGREES_PER_PIXEL
	});
}
function dollyByWheel(state, deltaY) {
	return clampState({
		...state,
		zoom: state.zoom - deltaY * WHEEL_ZOOM_PER_PIXEL
	});
}
function stateFromHandleDrag(type, state, point) {
	if (type === "yaw") return clampState({
		...state,
		horizontal: normalizeHorizontal(pointToYawAngle(point, SUBJECT_CENTER))
	});
	if (type === "pitch") return clampState({
		...state,
		vertical: pointToPitchAngle(point, SUBJECT_CENTER, state.horizontal)
	});
	return clampState({
		...state,
		zoom: displayDistanceToZoom(pointToDistance(point, SUBJECT_CENTER, state.horizontal, state.vertical))
	});
}
window.comfyAPI = window.comfyAPI || {};
window.comfyAPI.cameraAngleMath = window.comfyAPI.cameraAngleMath || {};
window.comfyAPI.cameraAngleMath.HORIZONTAL_TERMS = HORIZONTAL_TERMS;
window.comfyAPI.cameraAngleMath.VERTICAL_TERMS = VERTICAL_TERMS;
window.comfyAPI.cameraAngleMath.DISTANCE_TERMS = DISTANCE_TERMS;
window.comfyAPI.cameraAngleMath.normalizeHorizontal = normalizeHorizontal;
window.comfyAPI.cameraAngleMath.clampState = clampState;
window.comfyAPI.cameraAngleMath.roundState = roundState;
window.comfyAPI.cameraAngleMath.horizontalTerm = horizontalTerm;
window.comfyAPI.cameraAngleMath.verticalTerm = verticalTerm;
window.comfyAPI.cameraAngleMath.distanceTerm = distanceTerm;
window.comfyAPI.cameraAngleMath.describeCameraAngle = describeCameraAngle;
window.comfyAPI.cameraAngleMath.zoomToLensZoom = zoomToLensZoom;
window.comfyAPI.cameraAngleMath.zoomToDisplayDistance = zoomToDisplayDistance;
window.comfyAPI.cameraAngleMath.displayDistanceToZoom = displayDistanceToZoom;
window.comfyAPI.cameraAngleMath.toOrbitCameraInfoState = toOrbitCameraInfoState;
window.comfyAPI.cameraAngleMath.toHandleOrbitState = toHandleOrbitState;
window.comfyAPI.cameraAngleMath.overviewDistance = overviewDistance;
window.comfyAPI.cameraAngleMath.rotateByDrag = rotateByDrag;
window.comfyAPI.cameraAngleMath.dollyByWheel = dollyByWheel;
window.comfyAPI.cameraAngleMath.stateFromHandleDrag = stateFromHandleDrag;
//#endregion
//#region src/extensions/core/cameraAngle/widgetBridge.ts
var FIELDS = Object.keys(CAMERA_ANGLE_WIDGET_NAMES);
function widgetByName(node, name) {
	return node.widgets?.find((w) => w.name === name);
}
function numberOr(value, fallback) {
	return typeof value === "number" && Number.isFinite(value) ? value : fallback;
}
function readStateFromWidgets(node) {
	const state = { ...DEFAULT_CAMERA_ANGLE_STATE };
	for (const field of FIELDS) state[field] = numberOr(widgetByName(node, CAMERA_ANGLE_WIDGET_NAMES[field])?.value, DEFAULT_CAMERA_ANGLE_STATE[field]);
	return clampState(state);
}
function writeStateToWidgets(node, state) {
	const rounded = roundState(state);
	for (const field of FIELDS) {
		const widget = widgetByName(node, CAMERA_ANGLE_WIDGET_NAMES[field]);
		if (!widget || widget.value === rounded[field]) continue;
		widget.value = rounded[field];
	}
}
function isViewMode(value) {
	return typeof value === "string" && CAMERA_ANGLE_VIEW_MODES.includes(value);
}
function readViewMode(node) {
	const value = widgetByName(node, CAMERA_ANGLE_VIEW_WIDGET_NAME)?.value;
	return isViewMode(value) ? value : "camera";
}
function writeViewMode(node, mode) {
	const widget = widgetByName(node, CAMERA_ANGLE_VIEW_WIDGET_NAME);
	if (widget && widget.value !== mode) widget.value = mode;
}
window.comfyAPI = window.comfyAPI || {};
window.comfyAPI.widgetBridge = window.comfyAPI.widgetBridge || {};
window.comfyAPI.widgetBridge.readStateFromWidgets = readStateFromWidgets;
window.comfyAPI.widgetBridge.writeStateToWidgets = writeStateToWidgets;
window.comfyAPI.widgetBridge.isViewMode = isViewMode;
window.comfyAPI.widgetBridge.readViewMode = readViewMode;
window.comfyAPI.widgetBridge.writeViewMode = writeViewMode;
//#endregion
export { CAMERA_ANGLE_WIDGET_NAMES as C, SUBJECT_CENTER as D, ORBIT_SPHERE_RADIUS as E, CAMERA_ANGLE_VIEW_WIDGET_NAME as S, DEFAULT_SUBJECT_FACE_LABELS as T, stateFromHandleDrag as _, writeViewMode as a, verticalTerm as b, VERTICAL_TERMS as c, distanceTerm as d, dollyByWheel as f, roundState as g, rotateByDrag as h, writeStateToWidgets as i, clampState as l, overviewDistance as m, readStateFromWidgets as n, DISTANCE_TERMS as o, horizontalTerm as p, readViewMode as r, HORIZONTAL_TERMS as s, isViewMode as t, describeCameraAngle as u, toHandleOrbitState as v, DEFAULT_CAMERA_ANGLE_STATE as w, CAMERA_ANGLE_LIMITS as x, toOrbitCameraInfoState as y };
