import "./rolldown-runtime-xtsTai4I.js";
import { Ft as reactive } from "./vendor-vue-core-C1utdb0s.js";
import { Cn as emptyCompositorWidgetValue, Zc as isSubgraph, cn as setNodeWidgetValue, gl as createNodeLocatorId, sn as getNodeWidgetValue, wn as isCompositorWidgetValue } from "./layoutStore-CZsuzg91.js";
//#region src/renderer/extensions/compositor/composables/compositorWidgets.ts
var COMPOSITOR_WIDGET = "compositor";
function setCompositorWidgetValue(node, value) {
	setNodeWidgetValue(node, COMPOSITOR_WIDGET, value);
}
function getCompositorWidgetValue(node) {
	const value = getNodeWidgetValue(node, COMPOSITOR_WIDGET);
	return isCompositorWidgetValue(value) ? value : null;
}
function resetCompositorStateWidgets(node) {
	setCompositorWidgetValue(node, emptyCompositorWidgetValue());
}
//#endregion
//#region src/renderer/extensions/compositor/composables/useCompositorLayers.ts
var cacheByNode = reactive(/* @__PURE__ */ new Map());
var previewOverrideByNode = reactive(/* @__PURE__ */ new Map());
function cacheKey(node) {
	return createNodeLocatorId(isSubgraph(node.graph) ? node.graph.id : null, node.id);
}
function setCompositorLayers(node, refs, inputsFingerprint, bboxes, canvas) {
	cacheByNode.set(cacheKey(node), {
		layers: refs,
		...inputsFingerprint ? { inputsFingerprint } : {},
		...bboxes ? { bboxes } : {},
		...canvas ? { canvas } : {}
	});
}
function getCompositorLayers(node) {
	return cacheByNode.get(cacheKey(node))?.layers;
}
function getCompositorInputsFingerprint(node) {
	return cacheByNode.get(cacheKey(node))?.inputsFingerprint;
}
function getCompositorBBoxes(node) {
	return cacheByNode.get(cacheKey(node))?.bboxes;
}
function getCompositorCanvas(node) {
	return cacheByNode.get(cacheKey(node))?.canvas;
}
function clearCompositorLayers(node) {
	cacheByNode.delete(cacheKey(node));
	clearCompositorPreviewOverride(node);
}
function revokeIfObjectUrl(url) {
	if (url?.startsWith("blob:")) URL.revokeObjectURL(url);
}
function setCompositorPreviewOverride(node, url) {
	const key = cacheKey(node);
	revokeIfObjectUrl(previewOverrideByNode.get(key));
	previewOverrideByNode.set(key, url);
}
function getCompositorPreviewOverride(node) {
	return previewOverrideByNode.get(cacheKey(node));
}
function clearCompositorPreviewOverride(node) {
	const key = cacheKey(node);
	revokeIfObjectUrl(previewOverrideByNode.get(key));
	previewOverrideByNode.delete(key);
}
function hasCompositorLayers(node) {
	return (cacheByNode.get(cacheKey(node))?.layers.length ?? 0) > 0;
}
//#endregion
export { getCompositorInputsFingerprint as a, hasCompositorLayers as c, getCompositorWidgetValue as d, resetCompositorStateWidgets as f, getCompositorCanvas as i, setCompositorLayers as l, clearCompositorPreviewOverride as n, getCompositorLayers as o, setCompositorWidgetValue as p, getCompositorBBoxes as r, getCompositorPreviewOverride as s, clearCompositorLayers as t, setCompositorPreviewOverride as u };
