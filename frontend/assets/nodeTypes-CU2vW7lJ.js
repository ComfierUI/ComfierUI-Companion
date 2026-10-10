import "./rolldown-runtime-xtsTai4I.js";
//#region src/extensions/core/load3d/nodeTypes.ts
/**
* Canonical lists of node types backed by the Load3D viewer infrastructure.
* Adding a new node type that uses the viewer = one line change here.
*/
var LOAD3D_RESULT_VIEWER_NODES = /* @__PURE__ */ new Set([
	"Preview3D",
	"PreviewGaussianSplat",
	"PreviewPointCloud",
	"Save3DAdvanced",
	"SaveGaussianSplat",
	"SavePointCloud"
]);
var LOAD3D_ALL_NODES = /* @__PURE__ */ new Set([
	...LOAD3D_RESULT_VIEWER_NODES,
	"Load3D",
	"Load3DAdvanced",
	"SaveGLB"
]);
var isLoad3dResultViewerNode = (nodeType) => LOAD3D_RESULT_VIEWER_NODES.has(nodeType);
var isLoad3dNode = (nodeType) => LOAD3D_ALL_NODES.has(nodeType);
var CAMERA_TOOL_NODES = /* @__PURE__ */ new Set(["CreateCameraInfo", "CameraAngle"]);
var isThreeJsNode = (nodeType) => isLoad3dNode(nodeType) || CAMERA_TOOL_NODES.has(nodeType);
window.comfyAPI = window.comfyAPI || {};
window.comfyAPI.nodeTypes = window.comfyAPI.nodeTypes || {};
window.comfyAPI.nodeTypes.isLoad3dResultViewerNode = isLoad3dResultViewerNode;
window.comfyAPI.nodeTypes.isLoad3dNode = isLoad3dNode;
window.comfyAPI.nodeTypes.isThreeJsNode = isThreeJsNode;
//#endregion
export { isLoad3dResultViewerNode as n, isThreeJsNode as r, isLoad3dNode as t };
