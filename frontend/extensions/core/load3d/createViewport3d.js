// Shim for extensions/core/load3d/createViewport3d.ts
console.warn('[ComfyUI Notice] "extensions/core/load3d/createViewport3d.js" is an internal module, not part of the public API. Future updates may break this import.');
export const createViewport3d = window.comfyAPI.createViewport3d.createViewport3d;
