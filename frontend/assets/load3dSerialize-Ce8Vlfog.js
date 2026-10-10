import "./rolldown-runtime-xtsTai4I.js";
import { Vt as toRaw } from "./vendor-vue-core-C1utdb0s.js";
//#region src/extensions/core/load3d/load3dSerialize.ts
function snapshotLoad3dState(node, load3d) {
	const properties = toRaw(node.properties);
	const cameraConfig = properties["Camera Config"] || {
		cameraType: load3d.getCurrentCameraType(),
		fov: load3d.cameraManager.perspectiveCamera.fov
	};
	cameraConfig.state = load3d.getCameraState();
	properties["Camera Config"] = cameraConfig;
	load3d.stopRecording();
	const modelInfo = load3d.getModelInfo();
	const model_3d_info = modelInfo ? [modelInfo] : [];
	return {
		camera_info: cameraConfig.state ?? null,
		model_3d_info
	};
}
window.comfyAPI = window.comfyAPI || {};
window.comfyAPI.load3dSerialize = window.comfyAPI.load3dSerialize || {};
window.comfyAPI.load3dSerialize.snapshotLoad3dState = snapshotLoad3dState;
//#endregion
export { snapshotLoad3dState as t };
