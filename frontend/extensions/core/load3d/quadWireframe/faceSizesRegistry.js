// Shim for extensions/core/load3d/quadWireframe/faceSizesRegistry.ts
console.warn('[ComfyUI Notice] "extensions/core/load3d/quadWireframe/faceSizesRegistry.js" is an internal module, not part of the public API. Future updates may break this import.');
export const registerFaceSizes = window.comfyAPI.faceSizesRegistry.registerFaceSizes;
export const faceSizesFor = window.comfyAPI.faceSizesRegistry.faceSizesFor;
