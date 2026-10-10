import "./rolldown-runtime-xtsTai4I.js";
import { E as withModifiers, Et as withCtx, F as createBaseVNode, G as defineComponent, I as createBlock, Jt as normalizeClass, Kt as unref, L as createCommentVNode, P as computed, Q as mergeModels, R as createElementBlock, U as createVNode, lt as openBlock, yt as useModel } from "./vendor-vue-core-C1utdb0s.js";
import { Dt as useCanvasStore, Tt as resolveNode, go as useNodeOutputStore, il as useWidgetValueStore, jt as useWorkflowStore, ll as widgetId, rl as stripGraphPrefix } from "./layoutStore-CZsuzg91.js";
import { i as api } from "./api-Bt-fGt5a.js";
import { t as useToastStore } from "./toastStore-CTfykAzG.js";
import { r as useI18n } from "./vendor-i18n-BZvE7WBQ.js";
import { t as cn } from "./src-DI1bBfrb.js";
import { t as Button_default } from "./Button-j0oCzR82.js";
import { r as useCopyToClipboard } from "./systemStatsStore-3gc4cifl.js";
import { n as SanitizedHtml_default, t as renderMarkdownToHtml } from "./markdownRendererUtil-6g3t5X63.js";
import { n as downloadFile } from "./downloadUtil-Bysc7OZ_.js";
import { t as Textarea_default } from "./Textarea-r-a2mhot.js";
import { t as WidgetInputBaseClass } from "./layout-BZWBHixI.js";
//#region src/renderer/extensions/vueNodes/widgets/components/WidgetTextPreview.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1 = { class: "widget-text-preview group relative w-full" };
var _hoisted_2 = { class: "invisible absolute top-1.5 right-1.5 z-10 flex gap-1 group-focus-within:visible group-hover:visible" };
var MODE_WIDGET_NAME = "preview_mode";
//#endregion
//#region src/renderer/extensions/vueNodes/widgets/components/WidgetTextPreview.vue
var WidgetTextPreview_default = /* @__PURE__ */ defineComponent({
	__name: "WidgetTextPreview",
	props: /*@__PURE__*/ mergeModels({
		widget: {},
		nodeId: {}
	}, {
		"modelValue": { default: "" },
		"modelModifiers": {}
	}),
	emits: ["update:modelValue"],
	setup(__props) {
		const modelValue = useModel(__props, "modelValue");
		const { t } = useI18n();
		const { copyToClipboard } = useCopyToClipboard();
		const canvasStore = useCanvasStore();
		const widgetValueStore = useWidgetValueStore();
		const nodeOutputStore = useNodeOutputStore();
		const { nodeToNodeLocatorId } = useWorkflowStore();
		const localNodeId = computed(() => __props.nodeId === void 0 ? null : stripGraphPrefix(__props.nodeId));
		const showMarkdown = computed(() => {
			const graphId = canvasStore.canvas?.graph?.rootGraph.id;
			if (!graphId || localNodeId.value === null) return false;
			return widgetValueStore.getWidget(widgetId(graphId, localNodeId.value, MODE_WIDGET_NAME))?.value === true;
		});
		const renderedMarkdown = computed(() => showMarkdown.value ? renderMarkdownToHtml(modelValue.value || "") : "");
		const savedFile = computed(() => {
			if (__props.nodeId === void 0) return void 0;
			const node = resolveNode(__props.nodeId);
			if (!node) return void 0;
			return nodeOutputStore.nodeOutputs[nodeToNodeLocatorId(node)]?.files?.[0];
		});
		const downloadUrl = computed(() => {
			const file = savedFile.value;
			if (!file?.filename) return void 0;
			const params = new URLSearchParams({
				filename: file.filename,
				subfolder: file.subfolder ?? "",
				type: file.type ?? "output"
			});
			return api.apiURL(`/view?${params}`);
		});
		function handleCopy() {
			copyToClipboard(modelValue.value);
		}
		function handleDownload() {
			if (!downloadUrl.value) return;
			try {
				downloadFile(downloadUrl.value, savedFile.value?.filename);
			} catch {
				useToastStore().add({
					severity: "error",
					summary: t("g.error"),
					detail: t("g.failedToDownloadFile")
				});
			}
		}
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", _hoisted_1, [createBaseVNode("div", _hoisted_2, [createVNode(Button_default, {
				variant: "textonly",
				size: "icon",
				class: "hover:bg-base-foreground/10",
				title: _ctx.$t("g.copyToClipboard"),
				"aria-label": _ctx.$t("g.copyToClipboard"),
				onClick: handleCopy,
				onPointerdownCapture: _cache[0] || (_cache[0] = withModifiers(() => {}, ["stop"]))
			}, {
				default: withCtx(() => [..._cache[5] || (_cache[5] = [createBaseVNode("i", { class: "icon-[lucide--copy] size-4 text-component-node-foreground" }, null, -1)])]),
				_: 1
			}, 8, ["title", "aria-label"]), downloadUrl.value ? (openBlock(), createBlock(Button_default, {
				key: 0,
				variant: "textonly",
				size: "icon",
				class: "hover:bg-base-foreground/10",
				title: _ctx.$t("g.download"),
				"aria-label": _ctx.$t("g.download"),
				onClick: handleDownload,
				onPointerdownCapture: _cache[1] || (_cache[1] = withModifiers(() => {}, ["stop"]))
			}, {
				default: withCtx(() => [..._cache[6] || (_cache[6] = [createBaseVNode("i", { class: "icon-[lucide--download] size-4 text-component-node-foreground" }, null, -1)])]),
				_: 1
			}, 8, ["title", "aria-label"])) : createCommentVNode("", true)]), showMarkdown.value ? (openBlock(), createBlock(SanitizedHtml_default, {
				key: 0,
				class: "comfy-markdown-content size-full min-h-[60px] overflow-y-auto rounded-lg text-sm",
				"data-capture-wheel": "true",
				role: "textarea",
				"aria-label": __props.widget.name,
				"aria-readonly": "true",
				html: renderedMarkdown.value
			}, null, 8, ["aria-label", "html"])) : (openBlock(), createBlock(Textarea_default, {
				key: 1,
				"model-value": modelValue.value,
				readonly: "",
				"aria-label": __props.widget.name,
				class: normalizeClass(unref(cn)(unref(WidgetInputBaseClass), "size-full resize-none text-(length:--comfy-textarea-font-size) leading-normal", "overflow-y-auto")),
				"data-capture-wheel": "true",
				onPointerdownCapture: _cache[2] || (_cache[2] = withModifiers(() => {}, ["stop"])),
				onPointermoveCapture: _cache[3] || (_cache[3] = withModifiers(() => {}, ["stop"])),
				onPointerupCapture: _cache[4] || (_cache[4] = withModifiers(() => {}, ["stop"]))
			}, null, 8, [
				"model-value",
				"aria-label",
				"class"
			]))]);
		};
	}
});
//#endregion
export { WidgetTextPreview_default as t };
