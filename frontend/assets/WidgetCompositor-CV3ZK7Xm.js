import "./rolldown-runtime-xtsTai4I.js";
import { E as withModifiers, Et as withCtx, F as createBaseVNode, G as defineComponent, H as createTextVNode, Jt as normalizeClass, Kt as unref, L as createCommentVNode, Lt as ref, P as computed, R as createElementBlock, St as watch, U as createVNode, Zt as toDisplayString, lt as openBlock } from "./vendor-vue-core-C1utdb0s.js";
import { co as LayerEditorDialogContent, go as useNodeOutputStore, lo as LayerEditorDialogHeader, o as app, so as LAYER_EDITOR_DIALOG_KEY, uo as layerEditorDialogProps } from "./layoutStore-CZsuzg91.js";
import { t as useToastStore } from "./toastStore-CTfykAzG.js";
import { r as useI18n } from "./vendor-i18n-BZvE7WBQ.js";
import { t as useDialogStore } from "./dialogStore-B0GYyals.js";
import { t as Button_default } from "./Button-j0oCzR82.js";
import { t as downloadBlob } from "./downloadUtil-Bysc7OZ_.js";
import { a as getCompositorInputsFingerprint, c as hasCompositorLayers, s as getCompositorPreviewOverride } from "./useCompositorLayers-DOjMhGtA.js";
import { i as useLayerEditorSession, l as loadCompositorSession, o as buildSessionPsdBlob, s as psdExportFilename } from "./useLayerEditorSession-K0QHcdu3.js";
//#region src/renderer/extensions/compositor/composables/useCompositorEditor.ts
function useCompositorEditor() {
	const { t } = useI18n();
	const openCompositorEditor = (node) => {
		if (!hasCompositorLayers(node) || !getCompositorInputsFingerprint(node)?.length) {
			useToastStore().add({
				severity: "info",
				summary: t("layerEditor.title"),
				detail: t("compositor.runWorkflowFirst")
			});
			return;
		}
		useDialogStore().showDialog({
			key: LAYER_EDITOR_DIALOG_KEY,
			headerComponent: LayerEditorDialogHeader,
			component: LayerEditorDialogContent,
			props: {
				node,
				mode: "compositor"
			},
			dialogComponentProps: layerEditorDialogProps
		});
	};
	return { openCompositorEditor };
}
//#endregion
//#region src/renderer/extensions/compositor/composables/useCompositorPsdDownload.ts
function useCompositorPsdDownload(createSession = () => useLayerEditorSession()) {
	const { t } = useI18n();
	const toastStore = useToastStore();
	const exporting = ref(false);
	async function downloadPsd(node) {
		if (exporting.value) return;
		exporting.value = true;
		let session = null;
		try {
			session = createSession();
			if (!session.glOk.value) {
				console.error("[Compositor] WebGL compositor unavailable");
				toastStore.add({
					severity: "error",
					summary: t("g.error"),
					detail: t("layerEditor.webglUnavailable")
				});
				return;
			}
			const failed = await loadCompositorSession(session, node, (i) => t("layerEditor.layerN", { n: i + 1 }));
			if (failed > 0) {
				console.error(`[Compositor] ${failed} layer(s) failed to load`);
				toastStore.add({
					severity: "error",
					summary: t("g.error"),
					detail: t("layerEditor.exportPsdFailed")
				});
				return;
			}
			const blob = await buildSessionPsdBlob(session);
			downloadBlob(psdExportFilename(/* @__PURE__ */ new Date()), blob);
		} catch (err) {
			console.warn("[Compositor] PSD export failed", err);
			toastStore.add({
				severity: "error",
				summary: t("g.error"),
				detail: session && !session.glOk.value ? t("layerEditor.webglUnavailable") : t("layerEditor.exportPsdFailed")
			});
		} finally {
			session?.dispose();
			exporting.value = false;
		}
	}
	return {
		exporting,
		downloadPsd
	};
}
//#endregion
//#region src/renderer/extensions/compositor/components/WidgetCompositor.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1 = ["src"];
var _hoisted_2 = {
	key: 1,
	class: "text-xs text-muted-foreground",
	"data-testid": "compositor-empty"
};
var _hoisted_3 = {
	key: 2,
	class: "invisible absolute top-2 right-2 group-focus-within/preview:visible group-hover/preview:visible"
};
var _hoisted_4 = [
	"disabled",
	"title",
	"aria-label"
];
var _hoisted_5 = {
	key: 0,
	class: "text-center text-xs text-muted-foreground",
	"data-testid": "compositor-dimensions"
};
var actionButtonClass = "flex h-8 min-h-8 cursor-pointer items-center justify-center rounded-lg border-0 bg-base-foreground p-2 text-base-background shadow-interface transition-colors duration-200 hover:bg-base-foreground/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-base-foreground focus-visible:ring-offset-2 disabled:cursor-default disabled:opacity-50";
//#endregion
//#region src/renderer/extensions/compositor/components/WidgetCompositor.vue
var WidgetCompositor_default = /* @__PURE__ */ defineComponent({
	__name: "WidgetCompositor",
	props: { nodeId: {} },
	setup(__props) {
		const { t } = useI18n();
		const nodeOutputStore = useNodeOutputStore();
		const { openCompositorEditor } = useCompositorEditor();
		const { exporting, downloadPsd } = useCompositorPsdDownload();
		const naturalSize = ref(null);
		const outputUrl = ref(null);
		const litegraphNode = computed(() => {
			if (!__props.nodeId || !app.canvas.graph) return null;
			return app.canvas.graph.getNodeById(__props.nodeId) ?? null;
		});
		function updateOutputUrl() {
			const node = litegraphNode.value;
			outputUrl.value = node ? nodeOutputStore.getNodeImageUrls(node)?.[0] ?? null : null;
		}
		watch(() => nodeOutputStore.nodeOutputs, updateOutputUrl, {
			deep: true,
			immediate: true
		});
		watch(() => nodeOutputStore.nodePreviewImages, updateOutputUrl, { deep: true });
		const previewUrl = computed(() => {
			const node = litegraphNode.value;
			return (node ? getCompositorPreviewOverride(node) : void 0) ?? outputUrl.value;
		});
		watch(previewUrl, () => {
			naturalSize.value = null;
		});
		const dimensionsLabel = computed(() => naturalSize.value ? `${naturalSize.value.w} × ${naturalSize.value.h}` : null);
		const canOpen = computed(() => {
			const node = litegraphNode.value;
			return !!node && hasCompositorLayers(node);
		});
		function onPreviewLoad(event) {
			const img = event.target;
			naturalSize.value = {
				w: img.naturalWidth,
				h: img.naturalHeight
			};
		}
		function openEditor() {
			const node = litegraphNode.value;
			if (node) openCompositorEditor(node);
		}
		function onDownloadPsd() {
			const node = litegraphNode.value;
			if (node) downloadPsd(node);
		}
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", {
				class: "widget-expands flex size-full flex-col gap-1",
				onPointerdown: _cache[1] || (_cache[1] = withModifiers(() => {}, ["stop"]))
			}, [
				createBaseVNode("div", {
					class: "group/preview relative flex min-h-0 flex-1 items-center justify-center overflow-hidden rounded-lg bg-node-component-surface",
					"data-testid": "compositor-preview-area",
					onDblclick: withModifiers(openEditor, ["stop"])
				}, [previewUrl.value ? (openBlock(), createElementBlock("img", {
					key: 0,
					src: previewUrl.value,
					class: "max-h-full max-w-full object-contain",
					draggable: "false",
					"data-testid": "compositor-preview",
					onLoad: onPreviewLoad,
					onDragstart: _cache[0] || (_cache[0] = withModifiers(() => {}, ["prevent"]))
				}, null, 40, _hoisted_1)) : (openBlock(), createElementBlock("span", _hoisted_2, toDisplayString(unref(t)("compositor.empty")), 1)), canOpen.value ? (openBlock(), createElementBlock("div", _hoisted_3, [createBaseVNode("button", {
					class: normalizeClass(actionButtonClass),
					disabled: unref(exporting),
					title: unref(t)("compositor.downloadPsd"),
					"aria-label": unref(t)("compositor.downloadPsd"),
					"data-testid": "compositor-download-psd",
					onClick: onDownloadPsd
				}, [..._cache[2] || (_cache[2] = [createBaseVNode("i", { class: "icon-[lucide--download] size-4" }, null, -1)])], 8, _hoisted_4)])) : createCommentVNode("", true)], 32),
				dimensionsLabel.value ? (openBlock(), createElementBlock("div", _hoisted_5, toDisplayString(dimensionsLabel.value), 1)) : createCommentVNode("", true),
				createVNode(Button_default, {
					variant: "secondary",
					size: "md",
					class: "w-full gap-2",
					disabled: !canOpen.value,
					title: canOpen.value ? void 0 : unref(t)("compositor.runWorkflowFirst"),
					"data-testid": "compositor-open-button",
					onClick: openEditor
				}, {
					default: withCtx(() => [_cache[3] || (_cache[3] = createBaseVNode("i", { class: "icon-[lucide--layers] size-4" }, null, -1)), createTextVNode(" " + toDisplayString(unref(t)("compositor.open")), 1)]),
					_: 1
				}, 8, ["disabled", "title"])
			], 32);
		};
	}
});
//#endregion
export { WidgetCompositor_default as default };
