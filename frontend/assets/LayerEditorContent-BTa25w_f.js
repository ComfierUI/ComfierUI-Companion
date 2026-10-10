import "./rolldown-runtime-xtsTai4I.js";
import { Vt as debounce } from "./vendor-other-BPEcPQTD.js";
import { E as withModifiers, Et as withCtx, F as createBaseVNode, G as defineComponent, H as createTextVNode, I as createBlock, Jt as normalizeClass, Kt as unref, L as createCommentVNode, Lt as ref, O as Fragment, P as computed, R as createElementBlock, St as watch, T as withKeys, U as createVNode, Xt as normalizeStyle, Zt as toDisplayString, dt as renderList, et as nextTick, j as Teleport, lt as openBlock, ot as onMounted, st as onUnmounted } from "./vendor-vue-core-C1utdb0s.js";
import { B as useResizeObserver, x as useEventListener } from "./vendor-vueuse-BxKIIsKg.js";
import { Ri as menuButtonClass, go as useNodeOutputStore, jt as useWorkflowStore, zi as menuContentClass } from "./layoutStore-CZsuzg91.js";
import { t as useToastStore } from "./toastStore-CTfykAzG.js";
import { r as useI18n } from "./vendor-i18n-BZvE7WBQ.js";
import { yt as PopoverTrigger_default } from "./vendor-reka-ui-tdehH9A1.js";
import { t as cn } from "./src-DI1bBfrb.js";
import { t as Button_default } from "./Button-j0oCzR82.js";
import { n as useModalLiftedZIndex } from "./useModalLiftedZIndex-BuehUvPe.js";
import { t as Input_default } from "./Input-Cx8jjgHK.js";
import { a as Select_default, i as SelectContent_default, n as SelectTrigger_default, r as SelectItem_default, t as SelectValue_default } from "./SelectValue-BYMnIcxq.js";
import { t as ColorPicker_default } from "./ColorPicker-D34wwQO7.js";
import { t as Popover_default } from "./Popover-CvXi6yxa.js";
import { t as PopoverContent_default } from "./PopoverContent-0k_uVDfE.js";
import { n as ToggleGroup_default, t as ToggleGroupItem_default } from "./ToggleGroupItem-Da4A26JJ.js";
import { a as getCompositorInputsFingerprint, p as setCompositorWidgetValue, u as setCompositorPreviewOverride } from "./useCompositorLayers-DOjMhGtA.js";
import { a as Dirty, c as useLayerEditorExport, d as LAYER_MODES, i as useLayerEditorSession, l as loadCompositorSession, n as DEFAULT_BACKGROUND_COLOR, r as isTextEditingTarget, t as CANVAS_SIZE_MAX, u as extractLayerState } from "./useLayerEditorSession-K0QHcdu3.js";
//#region src/renderer/extensions/layerEditor/components/LayerEditorCanvas.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1$5 = {
	key: 0,
	class: "absolute inset-0 flex items-center justify-center",
	"data-testid": "layer-editor-gl-unavailable"
};
var _hoisted_2$5 = { class: "rounded-md bg-base-background px-4 py-2 text-sm text-destructive-background" };
//#endregion
//#region src/renderer/extensions/layerEditor/components/LayerEditorCanvas.vue
var LayerEditorCanvas_default = /* @__PURE__ */ defineComponent({
	__name: "LayerEditorCanvas",
	props: { session: {} },
	setup(__props) {
		const { t } = useI18n();
		const viewportRef = ref(null);
		const containerRef = ref(null);
		const mainRef = ref(null);
		const overlayRef = ref(null);
		const { viewportCursor } = __props.session;
		const checkerboardStyle = {
			backgroundImage: "conic-gradient(#6a6a6a 25%, #4c4c4c 0 50%, #6a6a6a 0 75%, #4c4c4c 0)",
			backgroundSize: "8px 8px",
			boxShadow: "0 0 0 1px rgb(0 0 0 / 0.9), 0 4px 16px rgb(0 0 0 / 0.55)"
		};
		let firstLayout = true;
		useResizeObserver(viewportRef, (entries) => {
			const rect = entries[0]?.contentRect;
			if (!rect.width || !rect.height) return;
			if (firstLayout) {
				firstLayout = false;
				__props.session.fitView();
				return;
			}
			__props.session.panZoom.invalidate();
			__props.session.requestRender();
		});
		onMounted(() => {
			if (!viewportRef.value || !containerRef.value || !mainRef.value || !overlayRef.value) return;
			__props.session.setElements({
				viewport: viewportRef.value,
				container: containerRef.value,
				main: mainRef.value,
				overlay: overlayRef.value
			});
		});
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", {
				ref_key: "viewportRef",
				ref: viewportRef,
				tabindex: "0",
				"data-testid": "layer-editor-viewport",
				class: "relative min-h-0 min-w-0 flex-1 touch-none overflow-hidden bg-base-background outline-none focus-visible:ring-1 focus-visible:ring-border-default",
				style: normalizeStyle({ cursor: unref(viewportCursor) }),
				onPointerdown: _cache[0] || (_cache[0] = (...args) => __props.session.onPointerDown && __props.session.onPointerDown(...args)),
				onPointermove: _cache[1] || (_cache[1] = (...args) => __props.session.onPointerMove && __props.session.onPointerMove(...args)),
				onPointerup: _cache[2] || (_cache[2] = (...args) => __props.session.onPointerUp && __props.session.onPointerUp(...args)),
				onPointerleave: _cache[3] || (_cache[3] = (...args) => __props.session.onPointerLeave && __props.session.onPointerLeave(...args)),
				onWheel: _cache[4] || (_cache[4] = withModifiers((...args) => __props.session.onWheel && __props.session.onWheel(...args), ["prevent"])),
				onKeydown: _cache[5] || (_cache[5] = (...args) => __props.session.onKeyDown && __props.session.onKeyDown(...args)),
				onKeyup: _cache[6] || (_cache[6] = (...args) => __props.session.onKeyUp && __props.session.onKeyUp(...args)),
				onContextmenu: _cache[7] || (_cache[7] = withModifiers(() => {}, ["prevent"]))
			}, [
				createBaseVNode("div", {
					ref_key: "containerRef",
					ref: containerRef,
					class: "pointer-events-none absolute top-0 left-0",
					style: checkerboardStyle
				}, [createBaseVNode("canvas", {
					ref_key: "mainRef",
					ref: mainRef,
					"data-testid": "layer-editor-main-canvas",
					class: "absolute top-0 left-0 block size-full"
				}, null, 512)], 512),
				createBaseVNode("canvas", {
					ref_key: "overlayRef",
					ref: overlayRef,
					class: "pointer-events-none absolute inset-0 size-full"
				}, null, 512),
				!__props.session.glOk.value ? (openBlock(), createElementBlock("div", _hoisted_1$5, [createBaseVNode("span", _hoisted_2$5, toDisplayString(unref(t)("layerEditor.webglUnavailable")), 1)])) : createCommentVNode("", true)
			], 36);
		};
	}
});
//#endregion
//#region src/renderer/extensions/layerEditor/components/LayerEditorToolbar.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1$4 = { class: "absolute top-4 left-1/2 z-10 flex -translate-x-1/2 items-center gap-1 rounded-full border border-border-default bg-base-background p-1 shadow-lg" };
var _hoisted_2$4 = ["title", "aria-label"];
var _hoisted_3$3 = { class: "min-w-8 text-center" };
var _hoisted_4$2 = ["onClick"];
var _hoisted_5$2 = [
	"disabled",
	"title",
	"aria-label"
];
var _hoisted_6$2 = [
	"disabled",
	"title",
	"aria-label"
];
var _hoisted_7$2 = [
	"disabled",
	"title",
	"aria-label"
];
//#endregion
//#region src/renderer/extensions/layerEditor/components/LayerEditorToolbar.vue
var LayerEditorToolbar_default = /* @__PURE__ */ defineComponent({
	__name: "LayerEditorToolbar",
	props: { session: {} },
	setup(__props) {
		const { t } = useI18n();
		const { pointerMode, canUndo, canRedo, zoomRatio } = __props.session;
		const { exporting, exportPsd } = useLayerEditorExport(__props.session);
		const zoomOpen = ref(false);
		const zoomContentStyle = useModalLiftedZIndex(zoomOpen);
		const zoomItems = [
			{
				label: "25%",
				ratio: .25
			},
			{
				label: "50%",
				ratio: .5
			},
			{
				label: "100%",
				ratio: 1
			},
			{
				label: "200%",
				ratio: 2
			}
		];
		function onPointerModeChange(value) {
			if (value === "pointer" || value === "hand") __props.session.setPointerMode(value);
		}
		function applyZoom(ratio) {
			if (ratio == null) __props.session.fitView();
			else __props.session.setZoom(ratio);
			zoomOpen.value = false;
		}
		function onExportPsd() {
			exportPsd();
		}
		const zoomPercent = computed(() => `${Math.round(zoomRatio.value * 100)}%`);
		function toolButtonClass(active) {
			return cn("flex size-8 cursor-pointer items-center justify-center rounded-full border-0 bg-transparent text-base-foreground transition-colors", "hover:bg-secondary-background-hover disabled:cursor-default disabled:opacity-40", active && "bg-secondary-background-selected");
		}
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", _hoisted_1$4, [
				createVNode(ToggleGroup_default, {
					type: "single",
					"model-value": unref(pointerMode),
					"onUpdate:modelValue": onPointerModeChange
				}, {
					default: withCtx(() => [createVNode(ToggleGroupItem_default, {
						value: "pointer",
						class: "size-8 flex-none rounded-full p-0",
						title: unref(t)("layerEditor.selectTool"),
						"aria-label": unref(t)("layerEditor.selectTool")
					}, {
						default: withCtx(() => [..._cache[4] || (_cache[4] = [createBaseVNode("i", { class: "icon-[lucide--mouse-pointer-2] size-4" }, null, -1)])]),
						_: 1
					}, 8, ["title", "aria-label"]), createVNode(ToggleGroupItem_default, {
						value: "hand",
						class: "size-8 flex-none rounded-full p-0",
						title: unref(t)("layerEditor.handTool"),
						"aria-label": unref(t)("layerEditor.handTool")
					}, {
						default: withCtx(() => [..._cache[5] || (_cache[5] = [createBaseVNode("i", { class: "icon-[lucide--hand] size-4" }, null, -1)])]),
						_: 1
					}, 8, ["title", "aria-label"])]),
					_: 1
				}, 8, ["model-value"]),
				createVNode(Popover_default, {
					open: zoomOpen.value,
					"onUpdate:open": _cache[1] || (_cache[1] = ($event) => zoomOpen.value = $event)
				}, {
					default: withCtx(() => [createVNode(unref(PopoverTrigger_default), { "as-child": "" }, {
						default: withCtx(() => [createBaseVNode("button", {
							class: normalizeClass(unref(cn)("flex h-8 cursor-pointer items-center gap-1 rounded-full border-0 bg-transparent px-2 text-xs text-base-foreground transition-colors", "hover:bg-secondary-background-hover")),
							title: unref(t)("layerEditor.zoom"),
							"aria-label": unref(t)("layerEditor.zoom")
						}, [createBaseVNode("span", _hoisted_3$3, toDisplayString(zoomPercent.value), 1), _cache[6] || (_cache[6] = createBaseVNode("i", { class: "icon-[lucide--chevron-down] size-3" }, null, -1))], 10, _hoisted_2$4)]),
						_: 1
					}), createVNode(PopoverContent_default, {
						"side-offset": 8,
						class: normalizeClass(unref(cn)(unref(menuContentClass), "z-1700 flex w-auto min-w-20 flex-col")),
						style: normalizeStyle(unref(zoomContentStyle))
					}, {
						default: withCtx(() => [(openBlock(), createElementBlock(Fragment, null, renderList(zoomItems, (item) => {
							return createBaseVNode("button", {
								key: item.label,
								class: normalizeClass(unref(menuButtonClass)),
								onClick: ($event) => applyZoom(item.ratio)
							}, toDisplayString(item.label), 11, _hoisted_4$2);
						}), 64)), createBaseVNode("button", {
							class: normalizeClass(unref(menuButtonClass)),
							onClick: _cache[0] || (_cache[0] = ($event) => applyZoom(null))
						}, toDisplayString(unref(t)("layerEditor.fitView")), 3)]),
						_: 1
					}, 8, ["class", "style"])]),
					_: 1
				}, 8, ["open"]),
				createBaseVNode("button", {
					class: normalizeClass(toolButtonClass(false)),
					disabled: !unref(canUndo),
					title: unref(t)("layerEditor.undo"),
					"aria-label": unref(t)("layerEditor.undo"),
					onClick: _cache[2] || (_cache[2] = ($event) => __props.session.undo())
				}, [..._cache[7] || (_cache[7] = [createBaseVNode("i", { class: "icon-[lucide--undo-2] size-4" }, null, -1)])], 10, _hoisted_5$2),
				createBaseVNode("button", {
					class: normalizeClass(toolButtonClass(false)),
					disabled: !unref(canRedo),
					title: unref(t)("layerEditor.redo"),
					"aria-label": unref(t)("layerEditor.redo"),
					onClick: _cache[3] || (_cache[3] = ($event) => __props.session.redo())
				}, [..._cache[8] || (_cache[8] = [createBaseVNode("i", { class: "icon-[lucide--redo-2] size-4" }, null, -1)])], 10, _hoisted_6$2),
				createBaseVNode("button", {
					class: normalizeClass(toolButtonClass(false)),
					disabled: unref(exporting) || !__props.session.glOk.value,
					title: unref(t)("layerEditor.exportPsd"),
					"aria-label": unref(t)("layerEditor.exportPsd"),
					onClick: onExportPsd
				}, [..._cache[9] || (_cache[9] = [createBaseVNode("i", { class: "icon-[lucide--file-down] size-4" }, null, -1)])], 10, _hoisted_7$2)
			]);
		};
	}
});
//#endregion
//#region src/renderer/extensions/layerEditor/composables/layerPanelDnd.ts
function dropPositionFor(ratio) {
	return ratio < .5 ? "above" : "below";
}
/**
* Target index in root.children for a panel drag-drop.
* @param bottomUpIds ids ordered z=0 (bottom) first - the inverse of the
*   panel's display order, so visually "above" means a higher index.
* @param offset reserved bottom slots (1 when a background fill is pinned).
*/
function reorderDropIndex(bottomUpIds, targetId, pos, offset) {
	const index = bottomUpIds.indexOf(targetId);
	if (index === -1) return null;
	return offset + (pos === "above" ? index + 1 : index);
}
//#endregion
//#region src/renderer/extensions/layerEditor/components/LayerPanel.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1$3 = { class: "flex w-52 min-w-52 flex-col border-r border-border-default bg-base-background" };
var _hoisted_2$3 = { class: "flex items-center px-3 py-2" };
var _hoisted_3$2 = { class: "text-xs font-semibold text-base-foreground" };
var _hoisted_4$1 = [
	"draggable",
	"onClick",
	"onDragstart",
	"onDragover",
	"onDrop"
];
var _hoisted_5$1 = [
	"title",
	"aria-label",
	"onClick"
];
var _hoisted_6$1 = { class: "flex min-w-0 flex-1 flex-col" };
var _hoisted_7$1 = [
	"value",
	"onBlur",
	"onKeydown"
];
var _hoisted_8$1 = ["title", "onDblclick"];
var _hoisted_9$1 = { class: "truncate text-xs text-muted-foreground" };
var _hoisted_10$1 = ["title", "aria-label"];
var _hoisted_11$1 = { class: "flex min-w-0 flex-1 flex-col" };
var _hoisted_12$1 = { class: "truncate text-xs text-base-foreground" };
var _hoisted_13$1 = { class: "truncate text-xs text-muted-foreground" };
var _hoisted_14$1 = { class: "flex items-center justify-end gap-1 border-t border-border-default p-1" };
var _hoisted_15$1 = [
	"disabled",
	"title",
	"aria-label"
];
var _hoisted_16$1 = [
	"disabled",
	"title",
	"aria-label"
];
var footerButtonClass = "flex size-7 cursor-pointer items-center justify-center rounded-md border-0 bg-transparent text-base-foreground transition-colors hover:bg-secondary-background-hover disabled:cursor-default disabled:opacity-40";
//#endregion
//#region src/renderer/extensions/layerEditor/components/LayerPanel.vue
var LayerPanel_default = /* @__PURE__ */ defineComponent({
	__name: "LayerPanel",
	props: { session: {} },
	setup(__props) {
		const { t } = useI18n();
		const { imageLayers, backgroundLayer, activeNode, activeNodeId, selectedNodeIds, canvasSize } = __props.session;
		const { version } = __props.session;
		const renamingId = ref(null);
		const rows = computed(() => [...imageLayers.value].reverse());
		const backgroundColor = computed(() => {
			const fill = backgroundLayer.value?.fill;
			return fill?.type === "solid" ? fill.color : DEFAULT_BACKGROUND_COLOR;
		});
		const backgroundSubtitle = computed(() => `${canvasSize.value.w}×${canvasSize.value.h}`);
		const canMoveActive = computed(() => activeNode.value !== null && activeNode.value.kind !== "fill");
		function layerSubtitle(node) {
			return `${node.mode.blend.charAt(0).toUpperCase()} ${Math.round(node.opacity * 100)}%`;
		}
		function isRowSelected(id) {
			return selectedNodeIds.value.includes(id) || activeNodeId.value === id;
		}
		function rowClass(selected, extra) {
			return cn("group relative flex cursor-pointer items-center gap-2 border-border-default px-2 py-1.5 select-none", "hover:bg-secondary-background-hover", selected && "bg-secondary-background-selected", extra);
		}
		function eyeButtonClass(visible) {
			return cn("flex size-6 shrink-0 cursor-pointer items-center justify-center rounded-sm border-0 bg-transparent text-base-foreground hover:bg-secondary-background-hover", visible && "opacity-0 group-hover:opacity-100");
		}
		function eyeIconClass(visible) {
			return cn("size-4", visible ? "icon-[lucide--eye]" : "icon-[lucide--eye-off] opacity-50");
		}
		const dragId = ref(null);
		const dropHint = ref(null);
		function endDrag() {
			dragId.value = null;
			dropHint.value = null;
		}
		function dropHintClass(id) {
			const hint = dropHint.value;
			if (hint?.id !== id) return "";
			return hint.pos === "above" ? "before:absolute before:inset-x-0 before:top-0 before:h-0.5 before:bg-base-foreground before:content-['']" : "after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:bg-base-foreground after:content-['']";
		}
		function onRowDragStart(id, e) {
			dragId.value = id;
			if (e.dataTransfer) {
				e.dataTransfer.effectAllowed = "move";
				e.dataTransfer.setData("text/plain", "");
			}
		}
		function onRowDragOver(id, e) {
			if (!dragId.value || dragId.value === id) return;
			e.preventDefault();
			if (e.dataTransfer) e.dataTransfer.dropEffect = "move";
			const rect = e.currentTarget.getBoundingClientRect();
			const pos = dropPositionFor(rect.height > 0 ? (e.clientY - rect.top) / rect.height : .5);
			if (dropHint.value?.id !== id || dropHint.value.pos !== pos) dropHint.value = {
				id,
				pos
			};
		}
		function onRowDrop(id, e) {
			const dragged = dragId.value;
			const hint = dropHint.value;
			if (!dragged || hint?.id !== id) {
				endDrag();
				return;
			}
			e.preventDefault();
			const toIndex = reorderDropIndex(imageLayers.value.map((n) => n.id), id, hint.pos, backgroundLayer.value ? 1 : 0);
			if (toIndex !== null) __props.session.moveLayerTo(dragged, toIndex);
			endDrag();
		}
		function onListDragLeave(e) {
			if (!e.currentTarget.contains(e.relatedTarget)) dropHint.value = null;
		}
		function onRowClick(id, e) {
			if (e.ctrlKey || e.metaKey || e.shiftKey) {
				const current = selectedNodeIds.value;
				__props.session.setSelectedNodes(current.includes(id) ? current.filter((sid) => sid !== id) : [...current, id]);
				return;
			}
			__props.session.setActiveNode(id);
		}
		function commitRename(id, e) {
			if (renamingId.value !== id) return;
			renamingId.value = null;
			__props.session.renameLayer(id, e.target.value);
		}
		function focusInput(el) {
			if (el instanceof HTMLInputElement) el.focus();
		}
		function moveActive(dir) {
			const id = activeNodeId.value;
			if (id) __props.session.moveLayer(id, dir);
		}
		function computeFit(boxW, boxH, mediaW, mediaH) {
			if (!boxW || !boxH || !mediaW || !mediaH) return {
				scale: 1,
				offX: 0,
				offY: 0
			};
			const scale = Math.min(boxW / mediaW, boxH / mediaH);
			return {
				scale,
				offX: (boxW - mediaW * scale) / 2,
				offY: (boxH - mediaH * scale) / 2
			};
		}
		const thumbEls = /* @__PURE__ */ new Map();
		function drawThumb(el, node) {
			const ctx = el.getContext("2d");
			if (!ctx) return;
			ctx.clearRect(0, 0, el.width, el.height);
			if (node.kind !== "raster") return;
			const entry = __props.session.content.get(node.contentId);
			if (!entry) return;
			const fit = computeFit(el.width, el.height, entry.width, entry.height);
			ctx.drawImage(entry.canvas, fit.offX, fit.offY, entry.width * fit.scale, entry.height * fit.scale);
		}
		function registerThumb(id, el) {
			if (el instanceof HTMLCanvasElement) {
				thumbEls.set(id, el);
				const node = imageLayers.value.find((n) => n.id === id);
				if (node) drawThumb(el, node);
			} else thumbEls.delete(id);
		}
		watch(version, () => {
			for (const node of imageLayers.value) {
				const el = thumbEls.get(node.id);
				if (el) drawThumb(el, node);
			}
		}, { flush: "post" });
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", _hoisted_1$3, [
				createBaseVNode("div", _hoisted_2$3, [createBaseVNode("span", _hoisted_3$2, toDisplayString(unref(t)("layerEditor.layers")), 1)]),
				createBaseVNode("div", {
					class: "min-h-0 flex-1 overflow-y-auto",
					onDragleave: onListDragLeave
				}, [(openBlock(true), createElementBlock(Fragment, null, renderList(rows.value, (node) => {
					return openBlock(), createElementBlock("div", {
						key: node.id,
						class: normalizeClass(unref(cn)(rowClass(isRowSelected(node.id)), dropHintClass(node.id))),
						"data-testid": "layer-panel-row",
						draggable: renamingId.value !== node.id,
						onClick: ($event) => onRowClick(node.id, $event),
						onDragstart: ($event) => onRowDragStart(node.id, $event),
						onDragover: ($event) => onRowDragOver(node.id, $event),
						onDrop: ($event) => onRowDrop(node.id, $event),
						onDragend: endDrag
					}, [
						createBaseVNode("button", {
							class: normalizeClass(eyeButtonClass(node.visible)),
							title: unref(t)("layerEditor.toggleVisibility"),
							"aria-label": unref(t)("layerEditor.toggleVisibility"),
							onClick: withModifiers(($event) => __props.session.toggleVisible(node.id), ["stop"])
						}, [createBaseVNode("i", { class: normalizeClass(eyeIconClass(node.visible)) }, null, 2)], 10, _hoisted_5$1),
						createBaseVNode("canvas", {
							ref_for: true,
							ref: (el) => registerThumb(node.id, el),
							width: "32",
							height: "32",
							class: "size-8 shrink-0 rounded-sm border border-border-default bg-base-background"
						}, null, 512),
						createBaseVNode("div", _hoisted_6$1, [renamingId.value === node.id ? (openBlock(), createElementBlock("input", {
							key: 0,
							ref_for: true,
							ref: focusInput,
							class: "min-w-0 rounded-sm border border-border-default bg-base-background px-1 text-xs text-base-foreground select-text",
							value: node.name,
							onBlur: ($event) => commitRename(node.id, $event),
							onKeydown: [withKeys(($event) => commitRename(node.id, $event), ["enter"]), _cache[0] || (_cache[0] = withKeys(($event) => renamingId.value = null, ["escape"]))],
							onClick: _cache[1] || (_cache[1] = withModifiers(() => {}, ["stop"]))
						}, null, 40, _hoisted_7$1)) : (openBlock(), createElementBlock("span", {
							key: 1,
							class: "truncate text-xs text-base-foreground",
							title: node.name,
							onDblclick: ($event) => renamingId.value = node.id
						}, toDisplayString(node.name), 41, _hoisted_8$1)), createBaseVNode("span", _hoisted_9$1, toDisplayString(layerSubtitle(node)), 1)])
					], 42, _hoisted_4$1);
				}), 128))], 32),
				unref(backgroundLayer) ? (openBlock(), createElementBlock("div", {
					key: 0,
					class: normalizeClass(rowClass(isRowSelected(unref(backgroundLayer).id), "border-t")),
					"data-testid": "layer-panel-background-row",
					onClick: _cache[3] || (_cache[3] = ($event) => __props.session.selectBackground())
				}, [
					createBaseVNode("button", {
						class: normalizeClass(eyeButtonClass(unref(backgroundLayer).visible)),
						title: unref(t)("layerEditor.toggleVisibility"),
						"aria-label": unref(t)("layerEditor.toggleVisibility"),
						onClick: _cache[2] || (_cache[2] = withModifiers(($event) => __props.session.setBackgroundVisible(!unref(backgroundLayer).visible), ["stop"]))
					}, [createBaseVNode("i", { class: normalizeClass(eyeIconClass(unref(backgroundLayer).visible)) }, null, 2)], 10, _hoisted_10$1),
					createBaseVNode("div", {
						class: "size-8 shrink-0 rounded-sm border border-border-default",
						style: normalizeStyle({ backgroundColor: backgroundColor.value }),
						"data-testid": "layer-panel-background-swatch"
					}, null, 4),
					createBaseVNode("div", _hoisted_11$1, [createBaseVNode("span", _hoisted_12$1, toDisplayString(unref(t)("layerEditor.background")), 1), createBaseVNode("span", _hoisted_13$1, toDisplayString(backgroundSubtitle.value), 1)])
				], 2)) : createCommentVNode("", true),
				createBaseVNode("div", _hoisted_14$1, [createBaseVNode("button", {
					class: normalizeClass(footerButtonClass),
					disabled: !canMoveActive.value,
					title: unref(t)("layerEditor.moveUp"),
					"aria-label": unref(t)("layerEditor.moveUp"),
					onClick: _cache[4] || (_cache[4] = ($event) => moveActive(1))
				}, [..._cache[6] || (_cache[6] = [createBaseVNode("i", { class: "icon-[lucide--chevron-up] size-4" }, null, -1)])], 8, _hoisted_15$1), createBaseVNode("button", {
					class: normalizeClass(footerButtonClass),
					disabled: !canMoveActive.value,
					title: unref(t)("layerEditor.moveDown"),
					"aria-label": unref(t)("layerEditor.moveDown"),
					onClick: _cache[5] || (_cache[5] = ($event) => moveActive(-1))
				}, [..._cache[7] || (_cache[7] = [createBaseVNode("i", { class: "icon-[lucide--chevron-down] size-4" }, null, -1)])], 8, _hoisted_16$1)])
			]);
		};
	}
});
//#endregion
//#region src/renderer/extensions/layerEditor/components/PropertyNumberField.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1$2 = { class: "flex min-w-0 flex-1 items-center gap-1 rounded-md border border-border-default bg-secondary-background px-1.5 py-1" };
var _hoisted_2$2 = { class: "shrink-0 text-xs text-muted-foreground" };
//#endregion
//#region src/renderer/extensions/layerEditor/components/PropertyNumberField.vue
var PropertyNumberField_default = /* @__PURE__ */ defineComponent({
	__name: "PropertyNumberField",
	props: {
		label: {},
		value: {},
		min: {},
		max: {},
		step: { default: 1 }
	},
	emits: ["commit"],
	setup(__props, { emit: __emit }) {
		const emit = __emit;
		const draft = ref(__props.value);
		watch(() => __props.value, (next) => {
			draft.value = next;
		});
		function onChange() {
			const raw = draft.value;
			const next = typeof raw === "string" && raw.trim() === "" ? NaN : Number(raw);
			if (Number.isFinite(next)) {
				const low = __props.min ?? -Infinity;
				const high = __props.max ?? Infinity;
				emit("commit", Math.min(high, Math.max(low, next)));
			}
			nextTick(() => {
				draft.value = __props.value;
			});
		}
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("label", _hoisted_1$2, [createBaseVNode("span", _hoisted_2$2, toDisplayString(__props.label), 1), createVNode(Input_default, {
				modelValue: draft.value,
				"onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => draft.value = $event),
				type: "number",
				min: __props.min,
				max: __props.max,
				step: __props.step,
				class: "h-auto [appearance:textfield] rounded-none bg-transparent p-0 text-xs focus-visible:ring-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none",
				onChange
			}, null, 8, [
				"modelValue",
				"min",
				"max",
				"step"
			])]);
		};
	}
});
//#endregion
//#region src/renderer/extensions/layerEditor/components/LayerPropertiesPanel.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1$1 = {
	class: "flex w-56 min-w-56 flex-col overflow-y-auto border-l border-border-default bg-base-background",
	"data-testid": "layer-properties-panel"
};
var _hoisted_2$1 = { class: "flex items-center gap-2 border-b border-border-default px-3 py-2" };
var _hoisted_3$1 = { class: "truncate text-xs font-semibold text-base-foreground" };
var _hoisted_4 = { class: "flex gap-2" };
var _hoisted_5 = { class: "flex gap-2" };
var _hoisted_6 = { class: "flex gap-1" };
var _hoisted_7 = [
	"title",
	"aria-label",
	"onClick"
];
var _hoisted_8 = { class: "flex gap-2" };
var _hoisted_9 = { class: "flex min-w-0 flex-1 flex-col gap-2" };
var _hoisted_10 = { class: "flex flex-col gap-2" };
var _hoisted_11 = { class: "flex gap-1" };
var _hoisted_12 = ["title", "aria-label"];
var _hoisted_13 = ["title", "aria-label"];
var _hoisted_14 = { class: "flex gap-2" };
var _hoisted_15 = { class: "flex min-w-0 flex-1 flex-col gap-2" };
var _hoisted_16 = { class: "flex min-w-0 flex-1 flex-col gap-2" };
var _hoisted_17 = { class: "flex gap-2" };
var _hoisted_18 = { "data-testid": "background-color-swatch" };
var sectionClass = "flex flex-col gap-2 border-b border-border-default p-3";
var sectionLabelClass = "text-xs text-muted-foreground";
var iconButtonClass = "flex size-7 cursor-pointer items-center justify-center rounded-md border-0 bg-transparent text-base-foreground transition-colors hover:bg-secondary-background-hover";
//#endregion
//#region src/renderer/extensions/layerEditor/components/LayerPropertiesPanel.vue
var LayerPropertiesPanel_default = /* @__PURE__ */ defineComponent({
	__name: "LayerPropertiesPanel",
	props: { session: {} },
	setup(__props) {
		const { t } = useI18n();
		const { activeNode, activeNodeId, selectedContext, canvasSize, backgroundLayer } = __props.session;
		const isLayerContext = computed(() => selectedContext.value === "layer" && activeNode.value !== null);
		const BLEND_KEYS = {
			normal: "normal",
			multiply: "multiply",
			screen: "screen",
			overlay: "overlay",
			darken: "darken",
			lighten: "lighten",
			"color-dodge": "colorDodge",
			"color-burn": "colorBurn",
			"hard-light": "hardLight",
			"soft-light": "softLight",
			difference: "difference",
			exclusion: "exclusion",
			"linear-dodge": "linearDodge",
			"linear-burn": "linearBurn",
			"vivid-light": "vividLight",
			"pin-light": "pinLight",
			"linear-light": "linearLight",
			"hard-mix": "hardMix",
			subtract: "subtract",
			divide: "divide",
			"grain-extract": "grainExtract",
			"grain-merge": "grainMerge",
			hue: "hue",
			saturation: "saturation",
			color: "color",
			luminosity: "luminosity"
		};
		const blendOptions = computed(() => Object.keys(LAYER_MODES).map((mode) => ({
			label: t(`layerEditor.blend.${BLEND_KEYS[mode]}`),
			value: mode
		})));
		const alignItems = computed(() => [
			{
				op: "left",
				icon: "icon-[lucide--align-start-vertical]",
				label: t("layerEditor.alignLeft")
			},
			{
				op: "centerH",
				icon: "icon-[lucide--align-center-vertical]",
				label: t("layerEditor.alignCenterHorizontal")
			},
			{
				op: "right",
				icon: "icon-[lucide--align-end-vertical]",
				label: t("layerEditor.alignRight")
			},
			{
				op: "top",
				icon: "icon-[lucide--align-start-horizontal]",
				label: t("layerEditor.alignTop")
			},
			{
				op: "centerV",
				icon: "icon-[lucide--align-center-horizontal]",
				label: t("layerEditor.alignCenterVertical")
			},
			{
				op: "bottom",
				icon: "icon-[lucide--align-end-horizontal]",
				label: t("layerEditor.alignBottom")
			}
		]);
		const rotationDeg = computed(() => Math.round((activeNode.value?.transform.rotation ?? 0) * 180 / Math.PI));
		const opacityPercent = computed(() => Math.round((activeNode.value?.opacity ?? 1) * 100));
		function round(v) {
			return Math.round(v);
		}
		function onPosition(x, y) {
			const id = activeNodeId.value;
			if (id) __props.session.setLayerPosition(id, x, y);
		}
		function onDimensions(w, h) {
			const id = activeNodeId.value;
			if (id) __props.session.setLayerDimensions(id, w, h);
		}
		function onRotation(deg) {
			const id = activeNodeId.value;
			if (id) __props.session.setLayerRotationDeg(id, deg);
		}
		function onAlign(op) {
			const id = activeNodeId.value;
			if (id) __props.session.alignLayer(id, op);
		}
		function onFlip(axis) {
			const id = activeNodeId.value;
			if (id) __props.session.flipLayer(id, axis);
		}
		function onOpacity(percent) {
			const id = activeNodeId.value;
			if (id) __props.session.setOpacity(id, percent / 100);
		}
		function isBlendFn(value) {
			return typeof value === "string" && Object.hasOwn(LAYER_MODES, value);
		}
		function onBlendChange(value) {
			const id = activeNodeId.value;
			if (id && isBlendFn(value)) __props.session.setBlendMode(id, value);
		}
		const backgroundColor = computed(() => {
			const fill = backgroundLayer.value?.fill;
			return fill?.type === "solid" ? fill.color : DEFAULT_BACKGROUND_COLOR;
		});
		const backgroundColorModel = computed({
			get: () => {
				const percent = Math.round((backgroundLayer.value?.opacity ?? 1) * 100);
				if (percent >= 100) return backgroundColor.value;
				const alphaHex = Math.round(percent / 100 * 255).toString(16).padStart(2, "0");
				return `${backgroundColor.value}${alphaHex}`;
			},
			set: (hex) => {
				__props.session.setBackgroundColor(hex.slice(0, 7));
				__props.session.setBackgroundOpacity(hex.length === 9 ? parseInt(hex.slice(7, 9), 16) / 255 : 1);
			}
		});
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", _hoisted_1$1, [createBaseVNode("div", _hoisted_2$1, [createBaseVNode("i", { class: normalizeClass(unref(cn)("size-4 shrink-0", isLayerContext.value ? "icon-[lucide--image]" : "icon-[lucide--grid-2x2]")) }, null, 2), createBaseVNode("span", _hoisted_3$1, toDisplayString(isLayerContext.value ? unref(activeNode)?.name : unref(t)("layerEditor.background")), 1)]), isLayerContext.value && unref(activeNode) ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
				createBaseVNode("div", { class: normalizeClass(sectionClass) }, [createBaseVNode("span", { class: normalizeClass(sectionLabelClass) }, toDisplayString(unref(t)("layerEditor.position")), 1), createBaseVNode("div", _hoisted_4, [createVNode(PropertyNumberField_default, {
					label: "X",
					value: round(unref(activeNode).transform.x),
					onCommit: _cache[0] || (_cache[0] = ($event) => onPosition($event, void 0))
				}, null, 8, ["value"]), createVNode(PropertyNumberField_default, {
					label: "Y",
					value: round(unref(activeNode).transform.y),
					onCommit: _cache[1] || (_cache[1] = ($event) => onPosition(void 0, $event))
				}, null, 8, ["value"])])]),
				createBaseVNode("div", { class: normalizeClass(sectionClass) }, [createBaseVNode("span", { class: normalizeClass(sectionLabelClass) }, toDisplayString(unref(t)("layerEditor.dimensions")), 1), createBaseVNode("div", _hoisted_5, [createVNode(PropertyNumberField_default, {
					label: "W",
					value: round(unref(activeNode).transform.w),
					min: 1,
					onCommit: _cache[2] || (_cache[2] = ($event) => onDimensions($event, void 0))
				}, null, 8, ["value"]), createVNode(PropertyNumberField_default, {
					label: "H",
					value: round(unref(activeNode).transform.h),
					min: 1,
					onCommit: _cache[3] || (_cache[3] = ($event) => onDimensions(void 0, $event))
				}, null, 8, ["value"])])]),
				createBaseVNode("div", { class: normalizeClass(sectionClass) }, [createBaseVNode("span", { class: normalizeClass(sectionLabelClass) }, toDisplayString(unref(t)("layerEditor.alignment")), 1), createBaseVNode("div", _hoisted_6, [(openBlock(true), createElementBlock(Fragment, null, renderList(alignItems.value, (item) => {
					return openBlock(), createElementBlock("button", {
						key: item.op,
						class: normalizeClass(iconButtonClass),
						title: item.label,
						"aria-label": item.label,
						onClick: ($event) => onAlign(item.op)
					}, [createBaseVNode("i", { class: normalizeClass(unref(cn)("size-4", item.icon)) }, null, 2)], 8, _hoisted_7);
				}), 128))])]),
				createBaseVNode("div", { class: normalizeClass(sectionClass) }, [createBaseVNode("div", _hoisted_8, [createBaseVNode("div", _hoisted_9, [createBaseVNode("span", { class: normalizeClass(sectionLabelClass) }, toDisplayString(unref(t)("layerEditor.rotation")), 1), createVNode(PropertyNumberField_default, {
					label: "°",
					value: rotationDeg.value,
					onCommit: onRotation
				}, null, 8, ["value"])]), createBaseVNode("div", _hoisted_10, [createBaseVNode("span", { class: normalizeClass(sectionLabelClass) }, toDisplayString(unref(t)("layerEditor.flip")), 1), createBaseVNode("div", _hoisted_11, [createBaseVNode("button", {
					class: normalizeClass(iconButtonClass),
					title: unref(t)("layerEditor.flipHorizontal"),
					"aria-label": unref(t)("layerEditor.flipHorizontal"),
					onClick: _cache[4] || (_cache[4] = ($event) => onFlip("h"))
				}, [..._cache[9] || (_cache[9] = [createBaseVNode("i", { class: "icon-[lucide--flip-horizontal-2] size-4" }, null, -1)])], 8, _hoisted_12), createBaseVNode("button", {
					class: normalizeClass(iconButtonClass),
					title: unref(t)("layerEditor.flipVertical"),
					"aria-label": unref(t)("layerEditor.flipVertical"),
					onClick: _cache[5] || (_cache[5] = ($event) => onFlip("v"))
				}, [..._cache[10] || (_cache[10] = [createBaseVNode("i", { class: "icon-[lucide--flip-vertical-2] size-4" }, null, -1)])], 8, _hoisted_13)])])])]),
				createBaseVNode("div", { class: normalizeClass(sectionClass) }, [createBaseVNode("div", _hoisted_14, [createBaseVNode("div", _hoisted_15, [createBaseVNode("span", { class: normalizeClass(sectionLabelClass) }, toDisplayString(unref(t)("layerEditor.opacity")), 1), createVNode(PropertyNumberField_default, {
					label: "%",
					value: opacityPercent.value,
					min: 0,
					max: 100,
					onCommit: onOpacity
				}, null, 8, ["value"])]), createBaseVNode("div", _hoisted_16, [createBaseVNode("span", { class: normalizeClass(sectionLabelClass) }, toDisplayString(unref(t)("layerEditor.blendMode")), 1), createVNode(Select_default, {
					"model-value": unref(activeNode).mode.blend,
					"onUpdate:modelValue": onBlendChange
				}, {
					default: withCtx(() => [createVNode(SelectTrigger_default, {
						size: "md",
						class: "h-7 min-w-0 px-2 text-xs",
						"aria-label": unref(t)("layerEditor.blendMode")
					}, {
						default: withCtx(() => [createVNode(SelectValue_default)]),
						_: 1
					}, 8, ["aria-label"]), createVNode(SelectContent_default, null, {
						default: withCtx(() => [(openBlock(true), createElementBlock(Fragment, null, renderList(blendOptions.value, (option) => {
							return openBlock(), createBlock(SelectItem_default, {
								key: option.value,
								value: option.value,
								class: "py-1.5 text-xs"
							}, {
								default: withCtx(() => [createTextVNode(toDisplayString(option.label), 1)]),
								_: 2
							}, 1032, ["value"]);
						}), 128))]),
						_: 1
					})]),
					_: 1
				}, 8, ["model-value"])])])])
			], 64)) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [createBaseVNode("div", { class: normalizeClass(sectionClass) }, [createBaseVNode("span", { class: normalizeClass(sectionLabelClass) }, toDisplayString(unref(t)("layerEditor.dimensions")), 1), createBaseVNode("div", _hoisted_17, [createVNode(PropertyNumberField_default, {
				label: "W",
				value: unref(canvasSize).w,
				min: unref(64),
				max: unref(CANVAS_SIZE_MAX),
				onCommit: _cache[6] || (_cache[6] = ($event) => __props.session.setCanvasSize($event, unref(canvasSize).h))
			}, null, 8, [
				"value",
				"min",
				"max"
			]), createVNode(PropertyNumberField_default, {
				label: "H",
				value: unref(canvasSize).h,
				min: unref(64),
				max: unref(CANVAS_SIZE_MAX),
				onCommit: _cache[7] || (_cache[7] = ($event) => __props.session.setCanvasSize(unref(canvasSize).w, $event))
			}, null, 8, [
				"value",
				"min",
				"max"
			])])]), unref(backgroundLayer) ? (openBlock(), createElementBlock("div", {
				key: 0,
				class: normalizeClass(sectionClass)
			}, [createBaseVNode("span", { class: normalizeClass(sectionLabelClass) }, toDisplayString(unref(t)("layerEditor.fill")), 1), createBaseVNode("div", _hoisted_18, [createVNode(ColorPicker_default, {
				modelValue: backgroundColorModel.value,
				"onUpdate:modelValue": _cache[8] || (_cache[8] = ($event) => backgroundColorModel.value = $event),
				class: "h-7"
			}, null, 8, ["modelValue"])])])) : createCommentVNode("", true)], 64))]);
		};
	}
});
//#endregion
//#region src/renderer/extensions/compositor/composables/compositorSave.ts
function saveCompositorLayerState(session, node) {
	try {
		const layerState = extractLayerState(session.canvasSize.value, session.layers.value, session.layerFlips, getCompositorInputsFingerprint(node), session.inputLayerIds());
		if (!layerState.inputs) {
			console.warn("[Compositor] no inputs fingerprint; layer state would be unrestorable");
			return false;
		}
		setCompositorWidgetValue(node, layerState);
		return true;
	} catch (err) {
		console.error("[Compositor] Saving layer state failed:", err);
		return false;
	}
}
async function saveCompositorPreview(session, node) {
	try {
		session.editor.render();
		const blob = await session.compositor.toBlob();
		setCompositorPreviewOverride(node, URL.createObjectURL(blob));
	} catch (err) {
		console.error("[Compositor] Preview render failed:", err);
	}
}
//#endregion
//#region src/renderer/extensions/compositor/composables/useCompositorAutoSave.ts
var AUTO_SAVE_DEBOUNCE_MS = 300;
function useCompositorAutoSave(session, node) {
	const save = debounce(() => {
		saveCompositorLayerState(session, node);
	}, AUTO_SAVE_DEBOUNCE_MS);
	const unsubscribe = session.editor.history.onChange((mask) => {
		if ((mask & ~Dirty.SELECTION) !== 0) save();
	});
	function stop() {
		unsubscribe();
		save.cancel();
	}
	return { stop };
}
//#endregion
//#region src/renderer/extensions/layerEditor/components/LayerEditorContent.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1 = { class: "flex min-h-0 flex-1 flex-col" };
var _hoisted_2 = { class: "flex min-h-0 flex-1" };
var _hoisted_3 = { class: "relative flex min-h-0 min-w-0 flex-1" };
//#endregion
//#region src/renderer/extensions/layerEditor/components/LayerEditorContent.vue
var LayerEditorContent_default = /* @__PURE__ */ defineComponent({
	__name: "LayerEditorContent",
	props: {
		node: {},
		mode: { default: "images" }
	},
	setup(__props) {
		const { t } = useI18n();
		const session = useLayerEditorSession();
		const changeTracker = __props.mode === "compositor" ? useWorkflowStore().activeWorkflow?.changeTracker : void 0;
		let autoSave = null;
		let closed = false;
		function layerName(url, index) {
			try {
				const filename = new URL(url, window.location.origin).searchParams.get("filename");
				if (filename) return filename.replace(/\.[^.]+$/, "");
			} catch {}
			return t("layerEditor.layerN", { n: index + 1 });
		}
		useEventListener(document, "keydown", (e) => {
			if (e.defaultPrevented || isTextEditingTarget(e.target)) return;
			if (!(e.ctrlKey || e.metaKey)) return;
			if (e.code === "KeyZ") {
				e.preventDefault();
				if (e.shiftKey) session.redo();
				else session.undo();
			} else if (e.code === "KeyY") {
				e.preventDefault();
				session.redo();
			}
		});
		function onRestore() {
			session.editor.cancelFloating();
			while (session.editor.history.canUndo()) session.undo();
		}
		async function loadCompositorLayers() {
			return loadCompositorSession(session, __props.node, (i) => t("layerEditor.layerN", { n: i + 1 }));
		}
		function sessionHasEdits() {
			return Boolean(session.editor.floating()) || session.editor.history.canUndo() || session.editor.history.canRedo();
		}
		function finalizeCompositorSession() {
			try {
				autoSave?.stop();
				if (autoSave && sessionHasEdits()) {
					session.editor.anchorFloating();
					if (saveCompositorLayerState(session, __props.node)) {
						saveCompositorPreview(session, __props.node);
						__props.node.graph?.setDirtyCanvas(true);
					} else useToastStore().add({
						severity: "error",
						summary: t("g.error"),
						detail: t("compositor.saveFailed")
					});
				} else if (sessionHasEdits()) useToastStore().add({
					severity: "error",
					summary: t("g.error"),
					detail: t("compositor.saveFailed")
				});
			} finally {
				changeTracker?.afterChange();
			}
		}
		onMounted(() => {
			if (__props.mode === "compositor") {
				changeTracker?.beforeChange();
				loadCompositorLayers().then((failed) => {
					if (closed) return;
					if (failed > 0) {
						useToastStore().add({
							severity: "warn",
							summary: t("layerEditor.title"),
							detail: t("layerEditor.layersFailedToLoad", { count: failed })
						});
						return;
					}
					autoSave = useCompositorAutoSave(session, __props.node);
				}).catch((err) => {
					console.error("[Compositor] Loading layers failed:", err);
					if (closed) return;
					useToastStore().add({
						severity: "error",
						summary: t("g.error"),
						detail: t("layerEditor.loadFailed")
					});
				});
				return;
			}
			const urls = useNodeOutputStore().getNodeImageUrls(__props.node) ?? [];
			const names = urls.map((url, i) => layerName(url, i));
			session.loadImages(urls, names).then((failed) => {
				if (closed || failed === 0) return;
				useToastStore().add({
					severity: "warn",
					summary: t("layerEditor.title"),
					detail: t("layerEditor.layersFailedToLoad", { count: failed })
				});
			}).catch((err) => console.error("[LayerEditor] Loading images failed:", err));
		});
		onUnmounted(() => {
			closed = true;
			if (__props.mode === "compositor") finalizeCompositorSession();
			session.dispose();
		});
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", _hoisted_1, [(openBlock(), createBlock(Teleport, {
				defer: "",
				to: "#layer-editor-header-actions"
			}, [__props.mode === "compositor" ? (openBlock(), createBlock(Button_default, {
				key: 0,
				variant: "secondary",
				size: "md",
				disabled: !unref(session).canUndo.value,
				onClick: onRestore
			}, {
				default: withCtx(() => [_cache[0] || (_cache[0] = createBaseVNode("i", { class: "icon-[lucide--rotate-ccw] size-4" }, null, -1)), createTextVNode(" " + toDisplayString(unref(t)("g.restore")), 1)]),
				_: 1
			}, 8, ["disabled"])) : createCommentVNode("", true)])), createBaseVNode("div", _hoisted_2, [
				createVNode(LayerPanel_default, { session: unref(session) }, null, 8, ["session"]),
				createBaseVNode("div", _hoisted_3, [createVNode(LayerEditorCanvas_default, { session: unref(session) }, null, 8, ["session"]), createVNode(LayerEditorToolbar_default, { session: unref(session) }, null, 8, ["session"])]),
				createVNode(LayerPropertiesPanel_default, { session: unref(session) }, null, 8, ["session"])
			])]);
		};
	}
});
//#endregion
export { LayerEditorContent_default as default };
