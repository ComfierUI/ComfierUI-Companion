// Shim for extensions/core/cameraInfo/subjectCameraPreview.ts
console.warn('[ComfyUI Notice] "extensions/core/cameraInfo/subjectCameraPreview.js" is an internal module, not part of the public API. Future updates may break this import.');
export const PREVIEW_WIDTH = window.comfyAPI.subjectCameraPreview.PREVIEW_WIDTH;
export const PREVIEW_HEIGHT = window.comfyAPI.subjectCameraPreview.PREVIEW_HEIGHT;
export const fitCameraAspect = window.comfyAPI.subjectCameraPreview.fitCameraAspect;
export const renderInsetPreview = window.comfyAPI.subjectCameraPreview.renderInsetPreview;
