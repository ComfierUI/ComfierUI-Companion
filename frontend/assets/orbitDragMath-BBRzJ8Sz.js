import "./rolldown-runtime-xtsTai4I.js";
import { Lt as clamp } from "./vendor-other-BPEcPQTD.js";
//#region src/extensions/core/cameraInfo/types.ts
var DEFAULT_CAMERA_INFO_STATE = {
	mode: "orbit",
	target: {
		x: 0,
		y: 0,
		z: 0
	},
	roll: 0,
	fov: 35,
	zoom: 1,
	cameraType: "perspective",
	orbit: {
		yaw: 35,
		pitch: 30,
		distance: 4
	},
	lookAt: { position: {
		x: 4,
		y: 4,
		z: 4
	} },
	quaternion: {
		position: {
			x: 4,
			y: 4,
			z: 4
		},
		quat: {
			x: 0,
			y: 0,
			z: 0,
			w: 1
		}
	}
};
window.comfyAPI = window.comfyAPI || {};
window.comfyAPI.types = window.comfyAPI.types || {};
window.comfyAPI.types.DEFAULT_CAMERA_INFO_STATE = DEFAULT_CAMERA_INFO_STATE;
//#endregion
//#region src/extensions/core/cameraInfo/handles/orbitDragMath.ts
var RAD2DEG = 180 / Math.PI;
var DEG2RAD = Math.PI / 180;
var MIN_DISTANCE = .5;
function pointToYawAngle(point, target) {
	return Math.atan2(point.x - target.x, point.z - target.z) * RAD2DEG;
}
function pointToPitchAngle(point, target, yawDeg) {
	const y = yawDeg * DEG2RAD;
	const dx = point.x - target.x;
	const dy = point.y - target.y;
	const dz = point.z - target.z;
	const horizontal = dx * Math.sin(y) + dz * Math.cos(y);
	const raw = Math.atan2(dy, horizontal) * RAD2DEG;
	return clamp(raw, -89, 89);
}
function pointToDistance(point, target, yawDeg, pitchDeg) {
	const y = yawDeg * DEG2RAD;
	const p = pitchDeg * DEG2RAD;
	const dirX = Math.cos(p) * Math.sin(y);
	const dirY = Math.sin(p);
	const dirZ = Math.cos(p) * Math.cos(y);
	const dx = point.x - target.x;
	const dy = point.y - target.y;
	const dz = point.z - target.z;
	const projection = dx * dirX + dy * dirY + dz * dirZ;
	return clamp(projection, MIN_DISTANCE, 100);
}
window.comfyAPI = window.comfyAPI || {};
window.comfyAPI.orbitDragMath = window.comfyAPI.orbitDragMath || {};
window.comfyAPI.orbitDragMath.MIN_DISTANCE = MIN_DISTANCE;
window.comfyAPI.orbitDragMath.MAX_DISTANCE = 100;
window.comfyAPI.orbitDragMath.MIN_PITCH = -89;
window.comfyAPI.orbitDragMath.MAX_PITCH = 89;
window.comfyAPI.orbitDragMath.pointToYawAngle = pointToYawAngle;
window.comfyAPI.orbitDragMath.pointToPitchAngle = pointToPitchAngle;
window.comfyAPI.orbitDragMath.pointToDistance = pointToDistance;
//#endregion
export { DEFAULT_CAMERA_INFO_STATE as a, pointToYawAngle as i, pointToDistance as n, pointToPitchAngle as r, MIN_DISTANCE as t };
