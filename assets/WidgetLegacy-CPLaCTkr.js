import "./rolldown-runtime-xtsTai4I.js";
import { E as withModifiers, F as createBaseVNode, G as defineComponent, Lt as ref, R as createElementBlock, St as watch, Xt as normalizeStyle, lt as openBlock, ot as onMounted, rt as onBeforeUnmount } from "./vendor-vue-core-C1utdb0s.js";
import { B as useResizeObserver, dt as whenever } from "./vendor-vueuse-BxKIIsKg.js";
import { As as CanvasPointer, Dt as useCanvasStore, Lo as useColorPaletteStore, Mo as useChainCallback } from "./layoutStore-CZsuzg91.js";
//#region src/renderer/extensions/vueNodes/utils/eventUtils.ts
function augmentToCanvasPointerEvent(e, node, canvas) {
	canvas.adjustMouseEvent(e);
	canvas.graph_mouse[0] = e.offsetX + node.pos[0];
	canvas.graph_mouse[1] = e.offsetY + node.pos[1];
}
//#endregion
//#region src/renderer/extensions/vueNodes/widgets/utils/resolvePromotedWidget.ts
function resolveWidgetFromHostNode(hostNode, widgetName) {
	if (!hostNode) return void 0;
	const widget = hostNode.widgets?.find((entry) => entry.name === widgetName);
	if (!widget) return void 0;
	return {
		node: hostNode,
		widget
	};
}
//#endregion
//#region src/renderer/extensions/vueNodes/widgets/components/WidgetLegacy.vue?vue&type=script&setup=true&lang.ts
var scaleFactor = 2;
//#endregion
//#region src/renderer/extensions/vueNodes/widgets/components/WidgetLegacy.vue
var WidgetLegacy_default = /* @__PURE__ */ defineComponent({
	__name: "WidgetLegacy",
	props: {
		widget: {},
		nodeId: {}
	},
	setup(__props) {
		const props = __props;
		const canvasEl = ref();
		const containerHeight = ref(20);
		const canvasStore = useCanvasStore();
		const canvas = canvasStore.canvas;
		let node;
		let widgetInstance;
		let pointer;
		function findLegacyWidget() {
			return resolveWidgetFromHostNode(canvas.graph?.getNodeById(props.nodeId) ?? void 0, props.widget.name);
		}
		function bindWidget() {
			if (widgetInstance) widgetInstance.triggerDraw = () => {};
			const resolved = findLegacyWidget();
			if (!resolved) {
				widgetInstance = void 0;
				node = void 0;
				return;
			}
			node = resolved.node;
			widgetInstance = resolved.widget;
			if (!widgetInstance.triggerDraw) widgetInstance.callback = useChainCallback(widgetInstance.callback, function() {
				this.triggerDraw?.();
			});
			widgetInstance.triggerDraw = draw;
			draw();
		}
		onMounted(() => {
			canvasEl.value.width *= scaleFactor;
			bindWidget();
			if (!widgetInstance) return;
			useResizeObserver(canvasEl, draw);
			watch(() => useColorPaletteStore().activePaletteId, draw);
			pointer = new CanvasPointer(canvasEl.value);
		});
		onBeforeUnmount(() => {
			if (widgetInstance) widgetInstance.triggerDraw = () => {};
		});
		whenever(() => !canvasStore.linearMode, bindWidget);
		watch(() => canvasStore.currentGraph, bindWidget);
		function draw() {
			if (!widgetInstance || !node) return;
			const width = canvasEl.value.getBoundingClientRect().width || canvasEl.value.parentElement.clientWidth;
			let height = 20;
			if (widgetInstance.computedHeight) height = widgetInstance.computedHeight;
			else if (widgetInstance.computeLayoutSize) height = widgetInstance.computeLayoutSize(node).minHeight;
			else if (widgetInstance.computeSize) height = widgetInstance.computeSize(width)[1];
			containerHeight.value = height;
			node.canvasHeight = height;
			widgetInstance.y = 0;
			widgetInstance.width = width;
			canvasEl.value.height = (height + 2) * scaleFactor;
			canvasEl.value.width = width * scaleFactor;
			const ctx = canvasEl.value?.getContext("2d");
			if (!ctx) return;
			ctx.scale(scaleFactor, scaleFactor);
			widgetInstance.draw?.(ctx, node, width, 1, height);
		}
		function handleDown(e) {
			if (!node || !widgetInstance || !pointer) return;
			augmentToCanvasPointerEvent(e, node, canvas);
			pointer.down(e);
			if (widgetInstance.mouse) pointer.onDrag = (e) => widgetInstance.mouse?.(e, [e.offsetX, e.offsetY], node);
			canvas.processWidgetClick(e, node, widgetInstance, pointer);
		}
		function handleUp(e) {
			if (!pointer || !node) return;
			augmentToCanvasPointerEvent(e, node, canvas);
			e.click_time = e.timeStamp - (pointer.eDown?.timeStamp ?? 0);
			pointer.up(e);
		}
		function handleMove(e) {
			if (!pointer || !node) return;
			augmentToCanvasPointerEvent(e, node, canvas);
			pointer.move(e);
		}
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", {
				class: "relative -mx-3 w-full min-w-0",
				style: normalizeStyle({ minHeight: `${containerHeight.value}px` })
			}, [createBaseVNode("canvas", {
				ref_key: "canvasEl",
				ref: canvasEl,
				class: "absolute w-full cursor-crosshair",
				onPointerdown: withModifiers(handleDown, ["stop"]),
				onPointerup: withModifiers(handleUp, ["stop"]),
				onPointermove: withModifiers(handleMove, ["stop"])
			}, null, 544)], 4);
		};
	}
});
//#endregion
export { resolveWidgetFromHostNode as n, augmentToCanvasPointerEvent as r, WidgetLegacy_default as t };
