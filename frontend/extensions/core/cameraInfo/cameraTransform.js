// Shim for extensions/core/cameraInfo/cameraTransform.ts
console.warn('[ComfyUI Notice] "extensions/core/cameraInfo/cameraTransform.js" is an internal module, not part of the public API. Future updates may break this import.');
export const normalizeQuaternion = window.comfyAPI.cameraTransform.normalizeQuaternion;
export const computeSubjectTransform = window.comfyAPI.cameraTransform.computeSubjectTransform;
