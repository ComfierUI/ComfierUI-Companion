// Shim for extensions/core/cameraInfo/widgetBridge.ts
console.warn('[ComfyUI Notice] "extensions/core/cameraInfo/widgetBridge.js" is an internal module, not part of the public API. Future updates may break this import.');
export const readStateFromWidgets = window.comfyAPI.widgetBridge.readStateFromWidgets;
export const writeWidgetValue = window.comfyAPI.widgetBridge.writeWidgetValue;
