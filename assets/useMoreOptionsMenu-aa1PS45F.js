import "./rolldown-runtime-xtsTai4I.js";
import { Et as withCtx, F as createBaseVNode, G as defineComponent, H as createTextVNode, Lt as ref, O as Fragment, P as computed, R as createElementBlock, St as watch, U as createVNode, Zt as toDisplayString, d as defineStore, dt as renderList, lt as openBlock, p as storeToRefs } from "./vendor-vue-core-C1utdb0s.js";
import { ot as useIntervalFn } from "./vendor-vueuse-BxKIIsKg.js";
import { $t as getExtraOptionsForWidget, Dt as useCanvasStore, El as RenderShape, Ja as useSelectedLiteGraphItems, Lo as useColorPaletteStore, Mi as taskService, Ot as useTitleEditorStore, Pa as useNodeDefStore, Sl as LGraphEventMode, St as isSelectOnly, Ta as getGridThumbnailUrl, Zr as useCommandStore, bt as isLGraphNode, cs as LiteGraph, dn as filterUnavailableCoreMediaMenuActions, ds as LGraphCanvas, ea as assetService, fs as alignNodes, go as useNodeOutputStore, hc as isColorable, i as useSettingStore, ji as TaskNotFoundError, jt as useWorkflowStore, ka as useSubgraphOperations, ms as SubgraphNode, nt as useDialogService, o as app, oa as useRightSidePanelStore, ps as distributeNodes, vs as LGraphGroup, vt as isImageNode, xt as isLoad3dNode, yo as isInputPreviewOutput, ys as LGraphNode, yt as isLGraphGroup } from "./layoutStore-CZsuzg91.js";
import { i as api } from "./api-Bt-fGt5a.js";
import { n as reportError } from "./reportError-LG-zfbNw.js";
import { t as useToastStore } from "./toastStore-CTfykAzG.js";
import { r as useI18n } from "./vendor-i18n-BZvE7WBQ.js";
import { d as t } from "./i18n-C3J-ToPr.js";
import { t as useFeatureFlags } from "./useFeatureFlags-DAoj_aDd.js";
import { t as useDialogStore } from "./dialogStore-B0GYyals.js";
import { t as Button_default } from "./Button-j0oCzR82.js";
import { r as purify } from "./vendor-markdown-CtxqRwKg.js";
import { t as adjustColor } from "./colorUtil-BzdMMd-Y.js";
import { i as openFileInNewTab, n as downloadFile, r as downloadFileAsBlob } from "./downloadUtil-Bysc7OZ_.js";
import { t as Checkbox_default } from "./Checkbox-CimVrKfM.js";
//#region src/platform/assets/components/NodeOutputsExportDialog.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1 = { class: "flex w-105 max-w-full flex-col border-t border-border-default" };
var _hoisted_2 = { class: "flex cursor-pointer items-center justify-between gap-4 px-4 py-3 text-sm" };
var _hoisted_3 = { class: "m-0 flex max-h-[50vh] list-none flex-col gap-2 overflow-y-auto px-4 py-1" };
var _hoisted_4 = { class: "flex cursor-pointer items-center gap-3" };
var _hoisted_5 = ["src", "onError"];
var _hoisted_6 = {
	key: 1,
	"data-testid": "output-thumbnail-placeholder",
	class: "flex size-10 shrink-0 items-center justify-center rounded-sm bg-secondary-background"
};
var _hoisted_7 = { class: "min-w-0 flex-1 truncate text-sm" };
var _hoisted_8 = { class: "flex justify-end gap-2 p-4" };
//#endregion
//#region src/platform/assets/components/NodeOutputsExportDialog.vue
var NodeOutputsExportDialog_default = /* @__PURE__ */ defineComponent({
	__name: "NodeOutputsExportDialog",
	props: {
		items: {},
		onExport: { type: Function },
		onCancel: { type: Function }
	},
	setup(__props) {
		const selected = ref(__props.items.map(() => true));
		const failedThumbnails = ref(/* @__PURE__ */ new Set());
		const selectedIndices = computed(() => __props.items.flatMap((_, index) => selected.value[index] ? [index] : []));
		const allSelected = computed(() => selectedIndices.value.length === __props.items.length);
		function selectAll(value) {
			selected.value = __props.items.map(() => value === true);
		}
		function selectItem(index, value) {
			selected.value = selected.value.map((current, i) => i === index ? value === true : current);
		}
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", _hoisted_1, [
				createBaseVNode("label", _hoisted_2, [createTextVNode(toDisplayString(_ctx.$t("nodeOutputsExport.downloadAll")) + " ", 1), createVNode(Checkbox_default, {
					class: "bg-transparent",
					"model-value": allSelected.value,
					"onUpdate:modelValue": selectAll
				}, null, 8, ["model-value"])]),
				createBaseVNode("ul", _hoisted_3, [(openBlock(true), createElementBlock(Fragment, null, renderList(__props.items, (item, index) => {
					return openBlock(), createElementBlock("li", { key: index }, [createBaseVNode("label", _hoisted_4, [
						!failedThumbnails.value.has(index) ? (openBlock(), createElementBlock("img", {
							key: 0,
							"data-testid": "output-thumbnail",
							src: item.thumbnailUrl,
							alt: "",
							class: "size-10 shrink-0 rounded-sm bg-secondary-background object-cover",
							onError: ($event) => failedThumbnails.value.add(index)
						}, null, 40, _hoisted_5)) : (openBlock(), createElementBlock("div", _hoisted_6, [..._cache[1] || (_cache[1] = [createBaseVNode("i", {
							"aria-hidden": "true",
							class: "icon-[lucide--image] size-4 text-text-secondary"
						}, null, -1)])])),
						createBaseVNode("span", _hoisted_7, toDisplayString(item.name), 1),
						createVNode(Checkbox_default, {
							class: "bg-transparent",
							"model-value": selected.value[index],
							"onUpdate:modelValue": (value) => selectItem(index, value)
						}, null, 8, ["model-value", "onUpdate:modelValue"])
					])]);
				}), 128))]),
				createBaseVNode("div", _hoisted_8, [createVNode(Button_default, {
					variant: "muted-textonly",
					onClick: __props.onCancel
				}, {
					default: withCtx(() => [createTextVNode(toDisplayString(_ctx.$t("g.cancel")), 1)]),
					_: 1
				}, 8, ["onClick"]), createVNode(Button_default, {
					variant: "inverted",
					disabled: selectedIndices.value.length === 0,
					onClick: _cache[0] || (_cache[0] = ($event) => __props.onExport(selectedIndices.value))
				}, {
					default: withCtx(() => [createTextVNode(toDisplayString(_ctx.$t("nodeOutputsExport.download", { count: selectedIndices.value.length })), 1)]),
					_: 1
				}, 8, ["disabled"])])
			]);
		};
	}
});
//#endregion
//#region src/platform/assets/composables/useAssetDownload.ts
function useAssetDownload() {
	const { t } = useI18n();
	const toast = useToastStore();
	async function downloadFiles(files) {
		const pending = files.map((file) => {
			try {
				if (file.mode === "direct") {
					downloadFile(file.url, file.filename);
					return Promise.resolve();
				}
				return downloadFileAsBlob(file.url, {
					filename: file.filename,
					fetch: file.fetch,
					preferResponseFilename: file.preferResponseFilename
				});
			} catch (error) {
				return Promise.reject(error);
			}
		});
		const failures = (await Promise.allSettled(pending)).flatMap((result, index) => result.status === "rejected" ? [{
			cause: result.reason,
			filename: files[index].filename
		}] : []);
		const successCount = files.length - failures.length;
		if (successCount > 0) toast.add({
			severity: "success",
			summary: t("g.success"),
			detail: t("mediaAsset.selection.downloadsStarted", successCount),
			life: 2e3
		});
		if (failures.length > 0) {
			for (const failure of failures) reportError(failure.cause, {
				surface: "assets",
				errorType: "error_downloading_asset",
				context: { filename: failure.filename }
			});
			toast.add({
				severity: "error",
				summary: t("g.error"),
				detail: t("progressToast.downloadsFailed", failures.length)
			});
		}
	}
	return { downloadFiles };
}
//#endregion
//#region src/stores/assetExportStore.ts
var STALE_THRESHOLD_MS = 1e4;
var POLL_INTERVAL_MS = 1e4;
var MAX_TASK_NOT_FOUND_ATTEMPTS = 2;
/**
* `DELETE /tasks/{id}` is task-type agnostic, so an export can be cancelled
* server-side even though this store offers no cancel control. Treating
* `cancelled` as finished is what lets such an export leave `activeExports`,
* stop being polled, and be cleared by `clearFinishedExports`.
*/
var finishedExportStatuses = /* @__PURE__ */ new Set([
	"completed",
	"failed",
	"cancelled"
]);
var wireExportStatuses = /* @__PURE__ */ new Set([
	"created",
	"running",
	...finishedExportStatuses
]);
function stringValue(value, fallback) {
	return typeof value === "string" ? value : fallback;
}
function numberValue(value, fallback) {
	return typeof value === "number" ? value : fallback;
}
function shouldIgnoreExportUpdate(existing, data) {
	const ignoresCompleted = existing?.status === "completed" && !(data.status === "completed" && !existing.exportName && data.export_name !== void 0);
	const ignoresFailed = existing?.status === "failed" && existing.downloadTriggered;
	const ignoresCancelled = existing?.status === "cancelled" && data.status !== "completed";
	return ignoresCompleted || ignoresFailed || ignoresCancelled;
}
function settleUnknownExportStatus(existing, data) {
	if (wireExportStatuses.has(data.status)) return false;
	if (existing) {
		existing.status = "failed";
		existing.error = data.error || `Unknown task status: ${data.status}`;
		existing.lastUpdate = Date.now();
	}
	return true;
}
function resolveExportDownloadUrl(url) {
	const trimmedUrl = url.trim();
	if (!trimmedUrl || trimmedUrl.startsWith("//") || trimmedUrl.startsWith("\\") || trimmedUrl.startsWith("/\\")) return {
		ok: false,
		error: t("exportToast.unsupportedDownloadUrl")
	};
	const resolvedUrl = trimmedUrl.startsWith("/") ? api.apiURL(trimmedUrl) : trimmedUrl;
	let parsedUrl;
	try {
		parsedUrl = new URL(resolvedUrl, document.baseURI);
	} catch {
		return {
			ok: false,
			error: t("exportToast.unsupportedDownloadUrl")
		};
	}
	if (parsedUrl.protocol !== "http:" && parsedUrl.protocol !== "https:") return {
		ok: false,
		error: t("exportToast.unsupportedDownloadUrl")
	};
	return {
		ok: true,
		value: parsedUrl
	};
}
var useAssetExportStore = defineStore("assetExport", () => {
	const exports = ref(/* @__PURE__ */ new Map());
	const pollingTaskIds = /* @__PURE__ */ new Set();
	const taskNotFoundAttempts = /* @__PURE__ */ new Map();
	const exportList = computed(() => Array.from(exports.value.values()));
	const activeExports = computed(() => exportList.value.filter((e) => e.status === "created" || e.status === "running"));
	const finishedExports = computed(() => exportList.value.filter((e) => finishedExportStatuses.has(e.status)));
	const hasActiveExports = computed(() => activeExports.value.length > 0);
	const hasExports = computed(() => exports.value.size > 0);
	function trackExport(taskId) {
		if (exports.value.has(taskId)) return;
		exports.value.set(taskId, {
			taskId,
			exportName: "",
			assetsTotal: 0,
			assetsAttempted: 0,
			assetsFailed: 0,
			bytesTotal: 0,
			bytesProcessed: 0,
			progress: 0,
			status: "created",
			lastUpdate: Date.now(),
			downloadTriggered: false
		});
	}
	async function triggerDownload(exp, force = false) {
		if (!force && (exp.downloadTriggered || !exp.exportName)) return;
		exp.downloadTriggered = true;
		try {
			exp.downloadError = void 0;
			const { url } = await assetService.getExportDownloadUrl(exp.exportName);
			const resolvedUrl = resolveExportDownloadUrl(url);
			if (!resolvedUrl.ok) {
				exp.downloadError = resolvedUrl.error;
				exp.downloadTriggered = false;
				useToastStore().add({
					severity: "error",
					summary: t("exportToast.downloadFailed", { name: exp.exportName }),
					detail: resolvedUrl.error
				});
				return;
			}
			const link = document.createElement("a");
			link.href = resolvedUrl.value.href;
			link.download = exp.exportName;
			link.style.display = "none";
			link.target = "_blank";
			link.rel = "noopener noreferrer";
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
		} catch (error) {
			const message = error instanceof Error ? error.message : String(error);
			exp.downloadError = message;
			exp.downloadTriggered = false;
			useToastStore().add({
				severity: "error",
				summary: t("exportToast.downloadFailed", { name: exp.exportName }),
				detail: message
			});
		}
	}
	function handleAssetExport(data) {
		const existing = exports.value.get(data.task_id);
		if (shouldIgnoreExportUpdate(existing, data)) return;
		if (settleUnknownExportStatus(existing, data)) return;
		const exp = {
			taskId: data.task_id,
			exportName: data.export_name ?? existing?.exportName ?? "",
			assetsTotal: data.assets_total,
			assetsAttempted: data.assets_attempted,
			assetsFailed: data.assets_failed,
			bytesTotal: data.bytes_total,
			bytesProcessed: data.bytes_processed,
			progress: data.progress,
			status: data.status,
			error: data.error,
			lastUpdate: Date.now(),
			downloadTriggered: existing?.downloadTriggered ?? false
		};
		exports.value.set(data.task_id, exp);
		if (data.status === "completed") triggerDownload(exp);
	}
	async function pollStaleExports() {
		const now = Date.now();
		const staleExports = activeExports.value.filter((e) => now - e.lastUpdate >= STALE_THRESHOLD_MS);
		if (staleExports.length === 0) return;
		function handleMissingExportTask(exp) {
			const attempts = (taskNotFoundAttempts.get(exp.taskId) ?? 0) + 1;
			taskNotFoundAttempts.set(exp.taskId, attempts);
			if (attempts < MAX_TASK_NOT_FOUND_ATTEMPTS) {
				exp.lastUpdate = Date.now();
				return;
			}
			taskNotFoundAttempts.delete(exp.taskId);
			handleAssetExport({
				task_id: exp.taskId,
				export_name: exp.exportName,
				assets_total: exp.assetsTotal,
				assets_attempted: exp.assetsAttempted,
				assets_failed: exp.assetsFailed,
				bytes_total: exp.bytesTotal,
				bytes_processed: exp.bytesProcessed,
				progress: exp.progress,
				status: "failed",
				error: t("progressToast.taskUnavailable")
			});
		}
		function applyFinishedExport(exp, result) {
			const task = result.value;
			if (!finishedExportStatuses.has(task.status)) return;
			const taskResult = task.result ?? {};
			handleAssetExport({
				task_id: exp.taskId,
				export_name: stringValue(taskResult.export_name, exp.exportName),
				assets_total: numberValue(taskResult.assets_total, exp.assetsTotal),
				assets_attempted: numberValue(taskResult.assets_attempted, exp.assetsAttempted),
				assets_failed: numberValue(taskResult.assets_failed, exp.assetsFailed),
				bytes_total: exp.bytesTotal,
				bytes_processed: exp.bytesTotal,
				progress: task.status === "completed" ? 1 : exp.progress,
				status: task.status,
				error: task.error_message ?? stringValue(taskResult.error, "")
			});
		}
		async function pollSingleExport(exp) {
			if (pollingTaskIds.has(exp.taskId)) return;
			pollingTaskIds.add(exp.taskId);
			try {
				const result = await taskService.getTask(exp.taskId);
				if (exports.value.get(exp.taskId) !== exp) return;
				if (!result.ok) {
					if (result.error instanceof TaskNotFoundError) handleMissingExportTask(exp);
					else taskNotFoundAttempts.delete(exp.taskId);
					return;
				}
				taskNotFoundAttempts.delete(exp.taskId);
				applyFinishedExport(exp, result);
			} finally {
				pollingTaskIds.delete(exp.taskId);
			}
		}
		await Promise.all(staleExports.map(pollSingleExport));
	}
	const { pause, resume } = useIntervalFn(() => void pollStaleExports(), POLL_INTERVAL_MS, { immediate: false });
	watch(hasActiveExports, (hasActive) => {
		if (hasActive) resume();
		else pause();
	}, { immediate: true });
	api.addEventListener("asset_export", (e) => handleAssetExport(e.detail));
	function clearFinishedExports() {
		for (const exp of finishedExports.value) {
			taskNotFoundAttempts.delete(exp.taskId);
			exports.value.delete(exp.taskId);
		}
	}
	return {
		activeExports,
		finishedExports,
		hasActiveExports,
		hasExports,
		exportList,
		trackExport,
		triggerDownload,
		clearFinishedExports
	};
});
//#endregion
//#region src/platform/assets/composables/useAssetZipExport.ts
function useAssetZipExport() {
	const { t } = useI18n();
	const toast = useToastStore();
	async function startZipExport(request, fileCount) {
		try {
			const { task_id } = await assetService.createAssetExport(request);
			useAssetExportStore().trackExport(task_id);
			toast.add({
				severity: "info",
				summary: t("exportToast.exportStarted"),
				detail: t("mediaAsset.selection.exportStarted", { count: fileCount }, fileCount),
				life: 3e3
			});
		} catch (error) {
			reportError(error, {
				errorType: "error_exporting_assets",
				surface: "assets",
				context: { count: fileCount }
			});
			toast.add({
				severity: "error",
				summary: t("g.error"),
				detail: t("exportToast.exportFailedSingle")
			});
		}
	}
	return { startZipExport };
}
//#endregion
//#region src/platform/assets/utils/outputExportUtil.ts
function isDownloadableOutput(item) {
	return !!item?.filename;
}
function buildOutputsExportRequest(outputs) {
	const assetIds = outputs.map((output) => output.id);
	if (assetIds.length === 0 || !assetIds.every((id) => !!id)) return;
	return {
		asset_ids: assetIds,
		naming_strategy: "preserve"
	};
}
function outputFileUrl({ filename, subfolder, type }) {
	const params = new URLSearchParams({
		filename,
		subfolder: subfolder ?? "",
		type: type ?? "output"
	});
	return api.apiURL(`/view?${params}`);
}
//#endregion
//#region src/platform/assets/composables/useNodeOutputsExport.ts
var EXPORT_DIALOG_KEY = "node-outputs-export";
function useNodeOutputsExport() {
	const { t } = useI18n();
	const { flags } = useFeatureFlags();
	const nodeOutputStore = useNodeOutputStore();
	const dialogService = useDialogService();
	const dialogStore = useDialogStore();
	const { downloadFiles } = useAssetDownload();
	const { startZipExport } = useAssetZipExport();
	function getDownloadableOutputs(node) {
		return (nodeOutputStore.getNodeOutputs(node)?.images ?? []).filter(isDownloadableOutput);
	}
	function hasMultipleOutputs(node) {
		return getDownloadableOutputs(node).length > 1;
	}
	function closeExportDialog() {
		dialogStore.closeDialog({ key: EXPORT_DIALOG_KEY });
	}
	function showOutputsExportDialog(node) {
		const outputs = getDownloadableOutputs(node);
		if (outputs.length === 0) return;
		dialogService.showSmallLayoutDialog({
			key: EXPORT_DIALOG_KEY,
			title: t("nodeOutputsExport.title"),
			component: NodeOutputsExportDialog_default,
			props: {
				items: outputs.map((output) => ({
					name: output.filename,
					thumbnailUrl: getGridThumbnailUrl(outputFileUrl(output))
				})),
				onCancel: closeExportDialog,
				onExport: (selectedIndices) => {
					closeExportDialog();
					exportOutputs(selectedIndices.map((index) => outputs[index]));
				}
			},
			dialogComponentProps: { headerClass: "px-4 py-3" }
		});
	}
	async function exportOutputs(outputs) {
		const request = outputs.length > 1 && flags.assetsEnabled ? buildOutputsExportRequest(outputs) : void 0;
		if (request) {
			await startZipExport(request, outputs.length);
			return;
		}
		await downloadFiles(outputs.map((output) => ({
			mode: "direct",
			url: outputFileUrl(output),
			filename: output.filename
		})));
	}
	return {
		hasMultipleOutputs,
		showOutputsExportDialog
	};
}
//#endregion
//#region src/renderer/extensions/vueNodes/utils/linkedCoreMediaUtils.ts
var LINKED_CORE_MEDIA_LOADERS = {
	LoadAudio: {
		selectorName: "audio",
		showsInputPreview: false
	},
	LoadImage: {
		selectorName: "image",
		showsInputPreview: true
	},
	LoadImageMask: {
		selectorName: "image",
		showsInputPreview: true
	},
	LoadImageOutput: {
		selectorName: "image",
		showsInputPreview: true
	},
	LoadVideo: {
		selectorName: "file",
		showsInputPreview: true
	}
};
function isLinkedCoreMediaLoaderClass(value) {
	return Object.hasOwn(LINKED_CORE_MEDIA_LOADERS, value);
}
function getCoreMediaLoaderClass(node) {
	const nodeData = node.constructor.nodeData;
	const nodeClass = node.constructor.comfyClass;
	if (!nodeData || !("isCoreNode" in nodeData) || nodeData.isCoreNode !== true || !isLinkedCoreMediaLoaderClass(nodeClass)) return void 0;
	return nodeClass;
}
function isMediaLoaderSelectorLinked(node, nodeClass) {
	const { selectorName } = LINKED_CORE_MEDIA_LOADERS[nodeClass];
	const selectorSlotIndex = node.inputs.findIndex((input) => input.widget?.name === selectorName || input.name === selectorName);
	return selectorSlotIndex >= 0 && node.isInputConnected(selectorSlotIndex);
}
function getLinkedCoreMediaLoaderClass(node) {
	const nodeClass = getCoreMediaLoaderClass(node);
	if (!nodeClass || !isMediaLoaderSelectorLinked(node, nodeClass)) return void 0;
	return nodeClass;
}
function shouldHideLinkedCoreMediaInputActions(node) {
	const nodeClass = getLinkedCoreMediaLoaderClass(node);
	return nodeClass !== void 0 && LINKED_CORE_MEDIA_LOADERS[nodeClass].showsInputPreview;
}
function shouldHideLinkedCoreMediaInputPreview(node, output) {
	return shouldHideLinkedCoreMediaInputActions(node) && isInputPreviewOutput(output);
}
function shouldHideLinkedCoreLoadAudioPlayer(node) {
	return getLinkedCoreMediaLoaderClass(node) === "LoadAudio";
}
//#endregion
//#region src/composables/graph/contextMenuConverter.ts
/**
* Hard blacklist - items that should NEVER be included
*/
var HARD_BLACKLIST = /* @__PURE__ */ new Set([
	"Properties",
	"Colors",
	"Shapes",
	"Title",
	"Mode",
	"Properties Panel",
	"Copy (Clipspace)",
	"Bypass",
	"Remove Bypass"
]);
/**
* Callbacks of built-in LiteGraph node menu items that are superseded by
* the Vue node menu (Minimize Node / Expand Node) or have no working
* Vue-side equivalent. Matched by callback identity so that extensions
* providing their own items with the same labels are not affected.
*/
var SUPPRESSED_LITEGRAPH_CALLBACKS = /* @__PURE__ */ new Set([LGraphCanvas.onMenuResizeNode, LGraphCanvas.onMenuNodeCollapse]);
/**
* Core menu items - items that should appear in the main menu, not under Extensions
* Includes both LiteGraph base menu items and ComfyUI built-in functionality
*/
var CORE_MENU_ITEMS = /* @__PURE__ */ new Set([
	"Rename",
	"Copy",
	"Duplicate",
	"Clone",
	"Run Branch",
	"Pin",
	"Unpin",
	"Bypass",
	"Remove Bypass",
	"Mute",
	"Convert to Subgraph",
	"Frame selection",
	"Frame Nodes",
	"Minimize Node",
	"Expand Node",
	"Node Info",
	"Title",
	"Properties Panel",
	"Adjust Size",
	"Color",
	"Colors",
	"Shape",
	"Shapes",
	"Mode",
	"Open Image",
	"Copy Image",
	"Paste Image",
	"Save Image",
	"Open in Mask Editor",
	"Edit Subgraph Widgets",
	"Unpack Subgraph",
	"Copy (Clipspace)",
	"Paste (Clipspace)",
	"Align Selected To",
	"Distribute Nodes",
	"Delete",
	"Remove",
	"Show Advanced",
	"Hide Advanced"
]);
/**
* Normalize menu item label for duplicate detection
* Handles variations like Colors/Color, Shapes/Shape, Pin/Unpin, Remove/Delete
*/
function normalizeLabel(label) {
	return label.toLowerCase().replace(/^un/, "").trim();
}
/**
* Check if a similar menu item already exists in the results
* Returns true if an item with the same normalized label exists
*/
function isDuplicateItem(label, existingItems) {
	const normalizedLabel = normalizeLabel(label);
	const equivalents = {
		color: ["color", "colors"],
		shape: ["shape", "shapes"],
		pin: ["pin", "unpin"],
		delete: ["remove", "delete"],
		duplicate: ["clone", "duplicate"],
		frame: ["frame selection", "frame nodes"]
	};
	return existingItems.some((item) => {
		if (!item.label) return false;
		const existingNormalized = normalizeLabel(item.label);
		if (existingNormalized === normalizedLabel) return true;
		for (const values of Object.values(equivalents)) if (values.includes(normalizedLabel) && values.includes(existingNormalized)) return true;
		return false;
	});
}
/**
* Check if a menu item is a core menu item (not an extension)
* Core items include LiteGraph base items and ComfyUI built-in functionality
*/
function isCoreMenuItem(label) {
	return CORE_MENU_ITEMS.has(label);
}
/**
* Filter out duplicate menu items based on label
* Gives precedence to Vue hardcoded options over LiteGraph options
*/
function removeDuplicateMenuOptions(options) {
	const itemsByLabel = /* @__PURE__ */ new Map();
	const itemsWithoutLabel = [];
	for (const opt of options) {
		if (opt.type === "divider" || opt.type === "category") {
			itemsWithoutLabel.push(opt);
			continue;
		}
		if (!opt.label) {
			itemsWithoutLabel.push(opt);
			continue;
		}
		if (!itemsByLabel.has(opt.label)) itemsByLabel.set(opt.label, []);
		itemsByLabel.get(opt.label).push(opt);
	}
	const result = [];
	const seenLabels = /* @__PURE__ */ new Set();
	for (const opt of options) {
		if (opt.type === "divider" || opt.type === "category" || !opt.label) {
			if (itemsWithoutLabel.includes(opt)) {
				result.push(opt);
				const idx = itemsWithoutLabel.indexOf(opt);
				itemsWithoutLabel.splice(idx, 1);
			}
			continue;
		}
		if (seenLabels.has(opt.label)) continue;
		seenLabels.add(opt.label);
		const duplicates = itemsByLabel.get(opt.label);
		if (duplicates.length === 1) {
			result.push(duplicates[0]);
			continue;
		}
		const vueItem = duplicates.find((item) => item.source === "vue");
		if (vueItem) result.push(vueItem);
		else result.push(duplicates[0]);
	}
	return result;
}
/**
* Order groups for menu items - defines the display order of sections
*/
var MENU_ORDER = [
	"Open Image",
	"Open in Mask Editor",
	"Copy Image",
	"Paste Image",
	"Save Image",
	"Rename",
	"Copy",
	"Duplicate",
	"Run Branch",
	"Pin",
	"Unpin",
	"Bypass",
	"Remove Bypass",
	"Mute",
	"Convert to Subgraph",
	"Frame selection",
	"Frame Nodes",
	"Minimize Node",
	"Expand Node",
	"Clone",
	"Node Info",
	"Color",
	"Copy (Clipspace)",
	"Paste (Clipspace)"
];
/**
* Get the order index for a menu item (lower = earlier in menu)
*/
function getMenuItemOrder(label) {
	const index = MENU_ORDER.indexOf(label);
	return index === -1 ? 999 : index;
}
/**
* Build structured menu with core items first, then extensions under a labeled section
* Ensures Delete always appears at the bottom
*/
function buildStructuredMenu(options) {
	const deduplicated = removeDuplicateMenuOptions(options);
	const coreItemsMap = /* @__PURE__ */ new Map();
	const extensionItems = [];
	let deleteItem;
	for (const option of deduplicated) {
		if (option.type === "divider") continue;
		if (option.type === "category") continue;
		if ((option.label === "Delete" || option.label === "Remove") && !option.hasSubmenu) {
			deleteItem = option;
			continue;
		}
		if (option.label && isCoreMenuItem(option.label)) coreItemsMap.set(option.label, option);
		else extensionItems.push(option);
	}
	const orderedCoreItems = [];
	const coreLabels = Array.from(coreItemsMap.keys());
	coreLabels.sort((a, b) => getMenuItemOrder(a) - getMenuItemOrder(b));
	const getSectionNumber = (index) => {
		if (index <= 4) return 0;
		if (index <= 7) return 1;
		if (index <= 13) return 2;
		if (index <= 19) return 3;
		if (index <= 21) return 4;
		return 5;
	};
	let lastSection = -1;
	for (const label of coreLabels) {
		const item = coreItemsMap.get(label);
		const currentSection = getSectionNumber(getMenuItemOrder(label));
		if (lastSection !== -1 && currentSection !== lastSection) orderedCoreItems.push({ type: "divider" });
		orderedCoreItems.push(item);
		lastSection = currentSection;
	}
	const result = [];
	result.push(...orderedCoreItems);
	if (extensionItems.length > 0) {
		result.push({ type: "divider" });
		result.push({
			label: "Extensions",
			type: "category",
			disabled: true
		});
		result.push(...extensionItems);
	}
	if (deleteItem) {
		result.push({ type: "divider" });
		result.push(deleteItem);
	}
	return result;
}
/**
* Convert LiteGraph IContextMenuValue items to Vue MenuOption format
* Used to bridge LiteGraph context menus into Vue node menus
* @param items - The LiteGraph menu items to convert
* @param node - The node context (optional)
* @param applyStructuring - Whether to apply menu structuring (core/extensions separation). Defaults to true.
*/
function convertContextMenuToOptions(items, node, applyStructuring = true) {
	const result = [];
	for (const item of items) {
		if (item === null) {
			result.push({ type: "divider" });
			continue;
		}
		if (!item.content) continue;
		if (HARD_BLACKLIST.has(item.content)) continue;
		if (item.callback && SUPPRESSED_LITEGRAPH_CALLBACKS.has(item.callback)) continue;
		if (isDuplicateItem(item.content, result)) continue;
		const option = {
			label: item.content,
			source: "litegraph"
		};
		if (item.disabled) option.disabled = true;
		if (item.has_submenu) {
			if (item.submenu?.options) {
				option.hasSubmenu = true;
				option.submenu = convertSubmenuToOptions(item.submenu.options);
			} else if (item.callback && !item.disabled) {
				option.hasSubmenu = true;
				const capturedSubmenu = captureDynamicSubmenu(item, node);
				if (capturedSubmenu) option.submenu = capturedSubmenu;
				else console.warn("[ContextMenuConverter] Failed to capture submenu for:", item.content);
			}
		} else if (item.callback && !item.disabled) option.action = () => {
			try {
				item.callback?.call(item, item.value, {}, void 0, void 0, node);
			} catch (error) {
				console.error("Error executing context menu callback:", error);
			}
		};
		result.push(option);
	}
	if (applyStructuring) return buildStructuredMenu(result);
	return result;
}
/**
* Capture submenu items from a dynamic submenu callback
* Intercepts ContextMenu constructor to extract items without creating HTML menu
*/
function captureDynamicSubmenu(item, node) {
	let capturedItems;
	let capturedOptions;
	const OriginalContextMenu = LiteGraph.ContextMenu;
	try {
		LiteGraph.ContextMenu = function(items, options) {
			capturedItems = items;
			capturedOptions = options;
			return {
				close: () => {},
				root: document.createElement("div")
			};
		};
		try {
			const mockEvent = new MouseEvent("click", {
				bubbles: true,
				cancelable: true,
				clientX: 0,
				clientY: 0
			});
			const mockMenu = {
				close: () => {},
				root: document.createElement("div")
			};
			item.callback?.call(item, item.value, {}, mockEvent, mockMenu, node);
		} catch (error) {
			console.warn("[ContextMenuConverter] Error executing callback for:", item.content, error);
		}
	} finally {
		LiteGraph.ContextMenu = OriginalContextMenu;
	}
	if (capturedItems) return convertSubmenuToOptions(capturedItems, capturedOptions);
	console.warn("[ContextMenuConverter] No items captured for:", item.content);
}
/**
* Convert LiteGraph submenu items to Vue SubMenuOption format
*/
function convertSubmenuToOptions(items, options) {
	const result = [];
	for (const item of items) {
		if (item === null) continue;
		if (typeof item === "string") {
			const subOption = {
				label: item,
				action: () => {
					try {
						if (options?.callback) options.callback.call(null, item, options, void 0, void 0, options.extra);
					} catch (error) {
						console.error("Error executing string item callback:", error);
					}
				}
			};
			result.push(subOption);
			continue;
		}
		if (!item.content) continue;
		const subOption = {
			label: stripHtmlTags(item.content),
			action: () => {
				try {
					item.callback?.call(item, item.value, {}, void 0, void 0, item);
				} catch (error) {
					console.error("Error executing submenu callback:", error);
				}
			}
		};
		if (item.disabled) subOption.disabled = true;
		result.push(subOption);
	}
	return result;
}
/**
* Strip HTML tags from content string safely
* LiteGraph menu items often include HTML for styling
*/
function stripHtmlTags(html) {
	return purify.sanitize(html, { ALLOWED_TAGS: [] }).trim() || html.replace(/<[^>]*>/g, "").trim() || html;
}
//#endregion
//#region src/composables/graph/useCanvasRefresh.ts
/**
* Composable for refreshing nodes in the graph
* */
function useCanvasRefresh() {
	const canvasStore = useCanvasStore();
	const workflowStore = useWorkflowStore();
	const refreshCanvas = () => {
		canvasStore.canvas?.emitBeforeChange();
		canvasStore.canvas?.setDirty(true, true);
		canvasStore.canvas?.graph?.afterChange();
		canvasStore.canvas?.emitAfterChange();
		workflowStore.activeWorkflow?.changeTracker.captureCanvasState();
	};
	return { refreshCanvas };
}
//#endregion
//#region src/composables/graph/useNodeCustomization.ts
/**
* Composable for handling node color and shape customization
*/
function useNodeCustomization() {
	const { t } = useI18n();
	const canvasStore = useCanvasStore();
	const colorPaletteStore = useColorPaletteStore();
	const canvasRefresh = useCanvasRefresh();
	const isLightTheme = computed(() => colorPaletteStore.completedActivePalette.light_theme);
	const toLightThemeColor = (color) => adjustColor(color, { lightness: .5 });
	const NO_COLOR_OPTION = {
		name: "noColor",
		localizedName: t("color.noColor"),
		value: {
			dark: LiteGraph.NODE_DEFAULT_BGCOLOR,
			light: toLightThemeColor(LiteGraph.NODE_DEFAULT_BGCOLOR)
		}
	};
	const colorOptions = [NO_COLOR_OPTION, ...Object.entries(LGraphCanvas.node_colors).map(([name, color]) => ({
		name,
		localizedName: t(`color.${name}`),
		value: {
			dark: color.bgcolor,
			light: toLightThemeColor(color.bgcolor)
		}
	}))];
	const shapeOptions = [
		{
			name: "default",
			localizedName: t("shape.default"),
			value: RenderShape.ROUND
		},
		{
			name: "box",
			localizedName: t("shape.box"),
			value: RenderShape.BOX
		},
		{
			name: "card",
			localizedName: t("shape.CARD"),
			value: RenderShape.CARD
		}
	];
	const applyColor = (colorOption) => {
		const colorName = colorOption?.name ?? NO_COLOR_OPTION.name;
		const canvasColorOption = colorName === NO_COLOR_OPTION.name ? null : LGraphCanvas.node_colors[colorName];
		for (const item of canvasStore.selectedItems) if (isColorable(item)) item.setColorOption(canvasColorOption);
		canvasRefresh.refreshCanvas();
	};
	const applyShape = (shapeOption) => {
		const selectedNodes = Array.from(canvasStore.selectedItems).filter((item) => item instanceof LGraphNode);
		if (selectedNodes.length === 0) return;
		selectedNodes.forEach((node) => {
			node.shape = shapeOption.value;
		});
		canvasRefresh.refreshCanvas();
	};
	const getCurrentColor = () => {
		const selectedItems = Array.from(canvasStore.selectedItems);
		if (selectedItems.length === 0) return null;
		const firstColorableItem = selectedItems.find((item) => isColorable(item));
		if (!firstColorableItem || !isColorable(firstColorableItem)) return null;
		const currentBgColor = firstColorableItem.getColorOption()?.bgcolor ?? null;
		return colorOptions.find((option) => option.value.dark === currentBgColor || option.value.light === currentBgColor) ?? NO_COLOR_OPTION;
	};
	const getCurrentShape = () => {
		const selectedNodes = Array.from(canvasStore.selectedItems).filter((item) => item instanceof LGraphNode);
		if (selectedNodes.length === 0) return null;
		const currentShape = selectedNodes[0].shape ?? RenderShape.ROUND;
		return shapeOptions.find((option) => option.value === currentShape) ?? shapeOptions[0];
	};
	return {
		colorOptions,
		shapeOptions,
		applyColor,
		applyShape,
		getCurrentColor,
		getCurrentShape,
		isLightTheme
	};
}
//#endregion
//#region src/composables/graph/useGroupMenuOptions.ts
/**
* Composable for group-related menu operations
*/
function useGroupMenuOptions() {
	const { t } = useI18n();
	const canvasStore = useCanvasStore();
	const workflowStore = useWorkflowStore();
	const settingStore = useSettingStore();
	const canvasRefresh = useCanvasRefresh();
	const { shapeOptions, colorOptions, applyColor, isLightTheme } = useNodeCustomization();
	const getFitGroupToNodesOption = (groupContext) => ({
		label: "Fit Group To Nodes",
		icon: "icon-[lucide--move-diagonal-2]",
		action: () => {
			try {
				groupContext.recomputeInsideNodes();
			} catch (e) {
				console.warn("Failed to recompute nodes in group:", e);
				return;
			}
			const padding = settingStore.get("Comfy.GroupSelectedNodes.Padding");
			groupContext.resizeTo(groupContext.children, padding);
			groupContext.graph?.change();
			canvasStore.canvas?.setDirty(true, true);
			workflowStore.activeWorkflow?.changeTracker.captureCanvasState();
		}
	});
	const getGroupShapeOptions = (groupContext, bump) => ({
		label: t("contextMenu.Shape"),
		icon: "icon-[lucide--box]",
		hasSubmenu: true,
		submenu: shapeOptions.map((shape) => ({
			label: shape.localizedName,
			action: () => {
				groupContext.nodes.forEach((node) => node.shape = shape.value);
				canvasRefresh.refreshCanvas();
				bump();
			}
		}))
	});
	const getGroupColorOptions = (_groupContext, bump) => ({
		label: t("contextMenu.Color"),
		icon: "icon-[lucide--palette]",
		hasSubmenu: true,
		isColorPicker: true,
		submenu: colorOptions.map((colorOption) => ({
			label: colorOption.localizedName,
			color: isLightTheme.value ? colorOption.value.light : colorOption.value.dark,
			action: () => {
				applyColor(colorOption.name === "noColor" ? null : colorOption);
				bump();
			}
		}))
	});
	const getGroupModeOptions = (groupContext, bump) => {
		const options = [];
		try {
			groupContext.recomputeInsideNodes();
		} catch (e) {
			console.warn("Failed to recompute nodes in group for mode options:", e);
			return options;
		}
		const groupNodes = groupContext.nodes;
		if (!groupNodes.length) return options;
		let allSame = true;
		for (let i = 1; i < groupNodes.length; i++) if (groupNodes[i].mode !== groupNodes[0].mode) {
			allSame = false;
			break;
		}
		const createModeAction = (label, mode) => ({
			label: t(`selectionToolbox.${label}`),
			icon: mode === LGraphEventMode.BYPASS ? "icon-[lucide--ban]" : mode === LGraphEventMode.NEVER ? "icon-[lucide--zap-off]" : "icon-[lucide--play]",
			action: () => {
				groupNodes.forEach((n) => {
					n.mode = mode;
				});
				canvasStore.canvas?.setDirty(true, true);
				groupContext.graph?.change();
				workflowStore.activeWorkflow?.changeTracker.captureCanvasState();
				bump();
			}
		});
		if (allSame) switch (groupNodes[0].mode) {
			case LGraphEventMode.ALWAYS:
				options.push(createModeAction("Set Group Nodes to Never", LGraphEventMode.NEVER));
				options.push(createModeAction("Bypass Group Nodes", LGraphEventMode.BYPASS));
				break;
			case LGraphEventMode.NEVER:
				options.push(createModeAction("Set Group Nodes to Always", LGraphEventMode.ALWAYS));
				options.push(createModeAction("Bypass Group Nodes", LGraphEventMode.BYPASS));
				break;
			case LGraphEventMode.BYPASS:
				options.push(createModeAction("Set Group Nodes to Always", LGraphEventMode.ALWAYS));
				options.push(createModeAction("Set Group Nodes to Never", LGraphEventMode.NEVER));
				break;
			default:
				options.push(createModeAction("Set Group Nodes to Always", LGraphEventMode.ALWAYS));
				options.push(createModeAction("Set Group Nodes to Never", LGraphEventMode.NEVER));
				options.push(createModeAction("Bypass Group Nodes", LGraphEventMode.BYPASS));
		}
		else {
			options.push(createModeAction("Set Group Nodes to Always", LGraphEventMode.ALWAYS));
			options.push(createModeAction("Set Group Nodes to Never", LGraphEventMode.NEVER));
			options.push(createModeAction("Bypass Group Nodes", LGraphEventMode.BYPASS));
		}
		return options;
	};
	return {
		getFitGroupToNodesOption,
		getGroupShapeOptions,
		getGroupColorOptions,
		getGroupModeOptions
	};
}
//#endregion
//#region src/composables/graph/useImageMenuOptions.ts
var DEFAULT_IMAGE_MENU_AVAILABILITY = {
	input: true,
	preview: true
};
function canPasteImage(node) {
	return typeof node?.pasteFiles === "function";
}
async function pasteClipboardImageToNode(node) {
	try {
		const clipboardItems = await navigator.clipboard.read();
		for (const item of clipboardItems) {
			const imageType = item.types.find((type) => type.startsWith("image/"));
			if (!imageType) continue;
			const blob = await item.getType(imageType);
			const ext = imageType.split("/")[1] ?? "png";
			const file = new File([blob], `pasted-image.${ext}`, { type: imageType });
			node.pasteFile?.(file);
			node.pasteFiles?.([file]);
			return;
		}
	} catch (error) {
		console.error("Failed to paste image from clipboard:", error);
	}
}
/**
* Composable for image-related menu operations
*/
function useImageMenuOptions() {
	const { t } = useI18n();
	const { hasMultipleOutputs, showOutputsExportDialog } = useNodeOutputsExport();
	const openMaskEditor = () => {
		useCommandStore().execute("Comfy.MaskEditor.OpenMaskEditor");
	};
	const openImage = (node) => {
		const images = node.imgs;
		if (!images?.length) return;
		const img = images.at(node.imageIndex ?? 0);
		if (!img) return;
		const url = new URL(img.src);
		url.searchParams.delete("preview");
		openFileInNewTab(url.toString());
	};
	const copyImage = async (node) => {
		const images = node.imgs;
		if (!images?.length) return;
		const img = images.at(node.imageIndex ?? 0);
		if (!img) return;
		const canvas = document.createElement("canvas");
		const ctx = canvas.getContext("2d");
		if (!ctx) return;
		canvas.width = img.naturalWidth;
		canvas.height = img.naturalHeight;
		ctx.drawImage(img, 0, 0);
		try {
			const blob = await new Promise((resolve) => {
				canvas.toBlob(resolve, "image/png");
			});
			if (!blob) {
				console.warn("Failed to create image blob");
				return;
			}
			await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
		} catch (error) {
			console.error("Failed to copy image to clipboard:", error);
		}
	};
	const saveImage = (node) => {
		const images = node.imgs;
		if (!images?.length) return;
		const img = images.at(node.imageIndex ?? 0);
		if (!img) return;
		try {
			const url = new URL(img.src);
			url.searchParams.delete("preview");
			downloadFile(url.toString());
		} catch (error) {
			console.error("Failed to save image:", error);
		}
	};
	const getImageMenuOptions = (node, availability = DEFAULT_IMAGE_MENU_AVAILABILITY) => {
		const hasImages = !!node.imgs?.length;
		const canPaste = canPasteImage(node);
		const canExportOutputs = availability.preview && hasMultipleOutputs(node);
		if ((!hasImages || !availability.preview) && (!canPaste || !availability.input) && !canExportOutputs) return [];
		const options = [];
		if (hasImages && availability.preview) options.push({
			label: t("contextMenu.Open Image"),
			icon: "icon-[lucide--external-link]",
			action: () => openImage(node)
		}, {
			label: t("contextMenu.Open in Mask Editor"),
			icon: "icon-[comfy--mask]",
			action: () => openMaskEditor()
		}, {
			label: t("contextMenu.Copy Image"),
			icon: "icon-[lucide--copy]",
			action: () => copyImage(node)
		});
		if (canPaste && availability.input) options.push({
			label: t("contextMenu.Paste Image"),
			icon: "icon-[lucide--clipboard-paste]",
			action: () => pasteClipboardImageToNode(node)
		});
		if (hasImages && availability.preview) options.push({
			label: t("contextMenu.Save Image"),
			icon: "icon-[lucide--download]",
			action: () => saveImage(node)
		});
		if (canExportOutputs) options.push({
			label: t("contextMenu.Download Images"),
			icon: "icon-[lucide--folder-down]",
			action: () => showOutputsExportDialog(node)
		});
		return options;
	};
	return { getImageMenuOptions };
}
//#endregion
//#region src/utils/nodeFilterUtil.ts
/**
* Checks if a node is an output node.
* Output nodes are nodes that have the output_node flag set in their nodeData.
*
* @param node - The node to check
* @returns True if the node is an output node, false otherwise
*/
var isOutputNode = (node) => node.constructor.nodeData?.output_node;
/**
* Filters nodes to find only output nodes.
* Output nodes are nodes that have the output_node flag set in their nodeData.
*
* @param nodes - Array of nodes to filter
* @returns Array of output nodes only
*/
var filterOutputNodes = (nodes) => nodes.filter(isOutputNode);
//#endregion
//#region src/composables/graph/useSelectedNodeActions.ts
/**
* Composable for handling node information and utility operations
*/
function useSelectedNodeActions() {
	const { getSelectedNodes, toggleSelectedNodesMode } = useSelectedLiteGraphItems();
	const commandStore = useCommandStore();
	const workflowStore = useWorkflowStore();
	const adjustNodeSize = () => {
		getSelectedNodes().forEach((node) => {
			const optimalSize = node.computeSize();
			node.setSize([optimalSize[0], optimalSize[1]]);
		});
		app.canvas.setDirty(true, true);
		workflowStore.activeWorkflow?.changeTracker.captureCanvasState();
	};
	const toggleNodeCollapse = () => {
		getSelectedNodes().forEach((node) => {
			node.collapse();
		});
		app.canvas.setDirty(true, true);
		workflowStore.activeWorkflow?.changeTracker.captureCanvasState();
	};
	const toggleNodePin = () => {
		getSelectedNodes().forEach((node) => {
			node.pin(!node.pinned);
		});
		app.canvas.setDirty(true, true);
		workflowStore.activeWorkflow?.changeTracker.captureCanvasState();
	};
	const toggleNodeBypass = () => {
		toggleSelectedNodesMode(LGraphEventMode.BYPASS);
		app.canvas.setDirty(true, true);
	};
	const runBranch = async () => {
		if (filterOutputNodes(getSelectedNodes()).length === 0) return;
		await commandStore.execute("Comfy.QueueSelectedOutputNodes");
	};
	return {
		adjustNodeSize,
		toggleNodeCollapse,
		toggleNodePin,
		toggleNodeBypass,
		runBranch
	};
}
//#endregion
//#region src/composables/graph/useNodeMenuOptions.ts
/**
* Composable for node-related menu operations
*/
function useNodeMenuOptions() {
	const { t } = useI18n();
	const { shapeOptions, applyShape, applyColor, colorOptions, isLightTheme } = useNodeCustomization();
	const { adjustNodeSize, toggleNodeCollapse, toggleNodePin, toggleNodeBypass, runBranch } = useSelectedNodeActions();
	const { areAllSelectedNodesInMode } = useSelectedLiteGraphItems();
	const shapeSubmenu = computed(() => shapeOptions.map((shape) => ({
		label: shape.localizedName,
		action: () => applyShape(shape)
	})));
	const colorSubmenu = computed(() => {
		return colorOptions.map((colorOption) => ({
			label: colorOption.localizedName,
			color: isLightTheme.value ? colorOption.value.light : colorOption.value.dark,
			action: () => applyColor(colorOption.name === "noColor" ? null : colorOption)
		}));
	});
	const getAdjustSizeOption = () => ({
		label: t("contextMenu.Adjust Size"),
		icon: "icon-[lucide--move-diagonal-2]",
		action: adjustNodeSize
	});
	const getNodeVisualOptions = (states, bump) => [
		{
			label: states.collapsed ? t("contextMenu.Expand Node") : t("contextMenu.Minimize Node"),
			icon: states.collapsed ? "icon-[lucide--maximize-2]" : "icon-[lucide--minimize-2]",
			action: () => {
				toggleNodeCollapse();
				bump();
			}
		},
		{
			label: t("contextMenu.Shape"),
			icon: "icon-[lucide--box]",
			hasSubmenu: true,
			submenu: shapeSubmenu.value,
			isShapePicker: true,
			action: () => {}
		},
		{
			label: t("contextMenu.Color"),
			icon: "icon-[lucide--palette]",
			hasSubmenu: true,
			submenu: colorSubmenu.value,
			isColorPicker: true,
			action: () => {}
		}
	];
	const getPinOption = (states, bump) => ({
		label: states.pinned ? t("contextMenu.Unpin") : t("contextMenu.Pin"),
		icon: states.pinned ? "icon-[lucide--pin-off]" : "icon-[lucide--pin]",
		action: () => {
			toggleNodePin();
			bump();
		}
	});
	const getBypassOption = (bump) => ({
		label: areAllSelectedNodesInMode(LGraphEventMode.BYPASS) ? t("contextMenu.Remove Bypass") : t("contextMenu.Bypass"),
		icon: "icon-[lucide--redo-dot]",
		shortcut: "Ctrl+B",
		action: () => {
			toggleNodeBypass();
			bump();
		}
	});
	const getRunBranchOption = () => ({
		label: t("contextMenu.Run Branch"),
		icon: "icon-[lucide--play]",
		action: runBranch
	});
	const getNodeInfoOption = (openNodeInfo) => ({
		label: t("contextMenu.Node Info"),
		icon: "icon-[lucide--info]",
		action: openNodeInfo
	});
	return {
		getNodeInfoOption,
		getAdjustSizeOption,
		getNodeVisualOptions,
		getPinOption,
		getBypassOption,
		getRunBranchOption,
		colorSubmenu
	};
}
//#endregion
//#region src/composables/graph/useSelectionState.ts
/**
* Centralized computed selection state + shared helper actions to avoid duplication
* between selection toolbox, context menus, and other UI affordances.
*/
function useSelectionState() {
	const canvasStore = useCanvasStore();
	const nodeDefStore = useNodeDefStore();
	const settingStore = useSettingStore();
	const rightSidePanelStore = useRightSidePanelStore();
	const { selectedItems } = storeToRefs(canvasStore);
	const selectedNodes = computed(() => {
		return selectedItems.value.filter((i) => isLGraphNode(i));
	});
	const nodeDef = computed(() => {
		if (selectedNodes.value.length !== 1) return null;
		return nodeDefStore.fromLGraphNode(selectedNodes.value[0]);
	});
	const hasAnySelection = computed(() => selectedItems.value.length > 0);
	const hasSingleSelection = computed(() => selectedItems.value.length === 1);
	const hasMultipleSelection = computed(() => selectedItems.value.length > 1);
	const hasGroupedNodesSelection = computed(() => selectedItems.value.some((item) => isLGraphGroup(item) && [...item.children].some(isLGraphNode)));
	const isSingleNode = computed(() => hasSingleSelection.value && isLGraphNode(selectedItems.value[0]));
	const isSingleSubgraph = computed(() => {
		const predicate = selectedNodes.value.at(0)?.isSubgraphNode;
		return isSingleNode.value && (predicate?.() ?? false);
	});
	const isSingleImageNode = computed(() => isSingleNode.value && isImageNode(selectedItems.value[0]));
	const hasSubgraphs = computed(() => selectedItems.value.some((i) => i instanceof SubgraphNode));
	const hasAny3DNodeSelected = computed(() => {
		const enable3DViewer = settingStore.get("Comfy.Load3D.3DViewerEnable");
		return selectedNodes.value.length === 1 && selectedNodes.value.some(isLoad3dNode) && enable3DViewer;
	});
	const hasImageNode = computed(() => isSingleImageNode.value);
	const hasOutputNodesSelected = computed(() => filterOutputNodes(selectedNodes.value).length > 0);
	const computeSelectionStatesFromNodes = (nodes) => {
		if (!nodes.length) return {
			collapsed: false,
			pinned: false
		};
		return {
			collapsed: nodes.some((n) => n.flags.collapsed),
			pinned: nodes.some((n) => n.pinned)
		};
	};
	const selectedNodesStates = computed(() => computeSelectionStatesFromNodes(selectedNodes.value));
	const computeSelectionFlags = () => computeSelectionStatesFromNodes(selectedNodes.value);
	const canOpenNodeInfo = computed(() => Boolean(nodeDef.value) && settingStore.get("Comfy.UseNewMenu") !== "Disabled");
	const openNodeInfo = () => {
		if (!canOpenNodeInfo.value) return false;
		rightSidePanelStore.openPanel("info");
		return true;
	};
	return {
		selectedItems,
		selectedNodes,
		nodeDef,
		canOpenNodeInfo,
		openNodeInfo,
		hasAny3DNodeSelected,
		hasAnySelection,
		hasGroupedNodesSelection,
		hasSingleSelection,
		hasMultipleSelection,
		isSingleNode,
		isSingleSubgraph,
		isSingleImageNode,
		hasSubgraphs,
		hasImageNode,
		hasOutputNodesSelected,
		selectedNodesStates,
		computeSelectionFlags
	};
}
//#endregion
//#region src/composables/graph/useFrameNodes.ts
/**
* Composable encapsulating logic for framing currently selected nodes into a group.
*/
function useFrameNodes() {
	const settingStore = useSettingStore();
	const titleEditorStore = useTitleEditorStore();
	const { hasMultipleSelection } = useSelectionState();
	const canFrame = computed(() => hasMultipleSelection.value);
	const frameNodes = () => {
		const { canvas } = app;
		if (!canvas.selectedItems.size) return;
		const group = new LGraphGroup();
		const padding = settingStore.get("Comfy.GroupSelectedNodes.Padding");
		group.resizeTo(canvas.selectedItems, padding);
		canvas.graph?.add(group);
		titleEditorStore.titleEditorTarget = group;
	};
	return {
		frameNodes,
		canFrame
	};
}
//#endregion
//#region src/composables/graph/useNodeArrangement.ts
/**
* Composable for handling node alignment and distribution
*/
function useNodeArrangement() {
	const { t } = useI18n();
	const canvasStore = useCanvasStore();
	const canvasRefresh = useCanvasRefresh();
	const alignOptions = [
		{
			name: "top",
			localizedName: t("contextMenu.Top"),
			value: "top",
			icon: "icon-[lucide--align-start-vertical]"
		},
		{
			name: "bottom",
			localizedName: t("contextMenu.Bottom"),
			value: "bottom",
			icon: "icon-[lucide--align-end-vertical]"
		},
		{
			name: "left",
			localizedName: t("contextMenu.Left"),
			value: "left",
			icon: "icon-[lucide--align-start-horizontal]"
		},
		{
			name: "right",
			localizedName: t("contextMenu.Right"),
			value: "right",
			icon: "icon-[lucide--align-end-horizontal]"
		}
	];
	const distributeOptions = [{
		name: "horizontal",
		localizedName: t("contextMenu.Horizontal"),
		value: true,
		icon: "icon-[lucide--align-center-horizontal]"
	}, {
		name: "vertical",
		localizedName: t("contextMenu.Vertical"),
		value: false,
		icon: "icon-[lucide--align-center-vertical]"
	}];
	const applyAlign = (alignOption, alignTo) => {
		const selectedNodes = Array.from(canvasStore.selectedItems).filter((item) => isLGraphNode(item));
		if (selectedNodes.length === 0) return;
		const newPositions = alignNodes(selectedNodes, alignOption.value, alignTo);
		canvasStore.canvas?.applyNodePositions(newPositions);
		canvasRefresh.refreshCanvas();
	};
	const applyDistribute = (distributeOption) => {
		const selectedNodes = Array.from(canvasStore.selectedItems).filter((item) => isLGraphNode(item));
		if (selectedNodes.length < 2) return;
		const newPositions = distributeNodes(selectedNodes, distributeOption.value);
		canvasStore.canvas?.applyNodePositions(newPositions);
		canvasRefresh.refreshCanvas();
	};
	return {
		alignOptions,
		distributeOptions,
		applyAlign,
		applyDistribute
	};
}
//#endregion
//#region src/composables/graph/useSelectionOperations.ts
/**
* Composable for handling basic selection operations like copy, paste, duplicate, delete, rename
*/
function useSelectionOperations() {
	const canvasStore = useCanvasStore();
	const toastStore = useToastStore();
	const dialogService = useDialogService();
	const titleEditorStore = useTitleEditorStore();
	const workflowStore = useWorkflowStore();
	const copySelection = () => {
		const canvas = app.canvas;
		if (canvas.selectedItems.size === 0) {
			toastStore.add({
				severity: "warn",
				summary: t("g.nothingToCopy"),
				detail: t("g.selectItemsToCopy"),
				life: 3e3
			});
			return;
		}
		canvas.copyToClipboard();
		toastStore.add({
			severity: "success",
			summary: t("g.copied"),
			detail: t("g.itemsCopiedToClipboard"),
			life: 2e3
		});
	};
	const pasteSelection = () => {
		app.canvas.pasteFromClipboard({ connectInputs: false });
		workflowStore.activeWorkflow?.changeTracker.captureCanvasState();
	};
	const duplicateSelection = () => {
		const canvas = app.canvas;
		if (canvas.selectedItems.size === 0) {
			toastStore.add({
				severity: "warn",
				summary: t("g.nothingToDuplicate"),
				detail: t("g.selectItemsToDuplicate"),
				life: 3e3
			});
			return;
		}
		canvas.copyToClipboard();
		canvas.deselectAll();
		canvas.pasteFromClipboard({ connectInputs: false });
		workflowStore.activeWorkflow?.changeTracker.captureCanvasState();
	};
	const deleteSelection = () => {
		const canvas = app.canvas;
		if (isSelectOnly(canvas)) return;
		if (canvas.selectedItems.size === 0) {
			toastStore.add({
				severity: "warn",
				summary: t("g.nothingToDelete"),
				detail: t("g.selectItemsToDelete"),
				life: 3e3
			});
			return;
		}
		canvas.deleteSelected();
		canvas.setDirty(true, true);
		workflowStore.activeWorkflow?.changeTracker.captureCanvasState();
	};
	const renameSelection = async () => {
		const selectedItems = Array.from(canvasStore.selectedItems);
		if (selectedItems.length === 1) {
			const item = selectedItems[0];
			if (item instanceof LGraphNode) {
				titleEditorStore.titleEditorTarget = item;
				return;
			}
			const currentTitle = "title" in item ? item.title : "";
			const newTitle = await dialogService.prompt({
				title: t("g.rename"),
				message: t("g.enterNewName"),
				defaultValue: currentTitle
			});
			if (newTitle && newTitle !== currentTitle) {
				if ("title" in item) {
					const titledItem = item;
					titledItem.title = newTitle;
					app.canvas.setDirty(true, true);
					workflowStore.activeWorkflow?.changeTracker.captureCanvasState();
				}
			}
			return;
		}
		if (selectedItems.length > 1) {
			const baseTitle = await dialogService.prompt({
				title: t("g.batchRename"),
				message: t("g.enterBaseName"),
				defaultValue: "Item"
			});
			if (baseTitle) {
				selectedItems.forEach((item, index) => {
					if ("title" in item) {
						const titledItem = item;
						titledItem.title = `${baseTitle} ${index + 1}`;
					}
				});
				app.canvas.setDirty(true, true);
				workflowStore.activeWorkflow?.changeTracker.captureCanvasState();
			}
			return;
		}
		toastStore.add({
			severity: "warn",
			summary: t("g.nothingToRename"),
			detail: t("g.selectItemsToRename"),
			life: 3e3
		});
	};
	return {
		copySelection,
		pasteSelection,
		duplicateSelection,
		deleteSelection,
		renameSelection
	};
}
//#endregion
//#region src/composables/graph/useSelectionMenuOptions.ts
/**
* Composable for selection-related menu operations
*/
function useSelectionMenuOptions() {
	const { t } = useI18n();
	const { copySelection, duplicateSelection, deleteSelection, renameSelection } = useSelectionOperations();
	const { alignOptions, distributeOptions, applyAlign, applyDistribute } = useNodeArrangement();
	const { convertToSubgraph, unpackSubgraph, addSubgraphToLibrary } = useSubgraphOperations();
	const { frameNodes } = useFrameNodes();
	const getBasicSelectionOptions = () => [
		{
			label: t("contextMenu.Rename"),
			action: renameSelection
		},
		{
			label: t("contextMenu.Copy"),
			shortcut: "Ctrl+C",
			action: copySelection
		},
		{
			label: t("contextMenu.Duplicate"),
			shortcut: "Ctrl+D",
			action: duplicateSelection
		}
	];
	const getSubgraphOptions = ({ hasSubgraphs, hasMultipleSelection }) => {
		const convertOption = {
			label: t("contextMenu.Convert to Subgraph"),
			icon: "icon-[lucide--shrink]",
			action: convertToSubgraph,
			badge: BadgeVariant.NEW
		};
		const options = [];
		if (!hasSubgraphs || hasMultipleSelection) options.push(convertOption);
		if (hasSubgraphs) {
			if (!hasMultipleSelection) options.push({
				label: t("contextMenu.Add Subgraph to Library"),
				icon: "icon-[lucide--folder-plus]",
				action: addSubgraphToLibrary
			});
			options.push({
				label: t("contextMenu.Unpack Subgraph"),
				icon: "icon-[lucide--expand]",
				action: unpackSubgraph
			});
		}
		return options;
	};
	const getMultipleNodesOptions = () => [{
		label: t("g.frameNodes"),
		icon: "icon-[lucide--frame]",
		action: frameNodes
	}];
	const getAlignmentOptions = (alignTo) => [{
		label: t("contextMenu.Align Selected To"),
		icon: "icon-[lucide--align-start-horizontal]",
		hasSubmenu: true,
		submenu: alignOptions.map((align) => ({
			label: align.localizedName,
			icon: align.icon,
			action: () => applyAlign(align, alignTo)
		})),
		action: () => {}
	}, {
		label: t("contextMenu.Distribute Nodes"),
		icon: "icon-[lucide--align-center-horizontal]",
		hasSubmenu: true,
		submenu: distributeOptions.map((distribute) => ({
			label: distribute.localizedName,
			icon: distribute.icon,
			action: () => applyDistribute(distribute)
		})),
		action: () => {}
	}];
	const getDeleteOption = (disabled) => ({
		label: t("contextMenu.Delete"),
		icon: "icon-[lucide--trash-2]",
		shortcut: "Delete",
		disabled,
		action: deleteSelection
	});
	return {
		getBasicSelectionOptions,
		getSubgraphOptions,
		getMultipleNodesOptions,
		getDeleteOption,
		getAlignmentOptions
	};
}
//#endregion
//#region src/composables/graph/useMoreOptionsMenu.ts
var BadgeVariant = /* @__PURE__ */ function(BadgeVariant) {
	BadgeVariant["NEW"] = "new";
	return BadgeVariant;
}({});
var nodeOptionsInstance = null;
var invocationContext = ref();
/**
* Toggle the node options popover
* @param event - The trigger event
*/
function toggleNodeOptions(event) {
	invocationContext.value = void 0;
	if (nodeOptionsInstance?.toggle) nodeOptionsInstance.toggle(event);
}
/**
* Show the node options popover (always shows, doesn't toggle)
* Use this for contextmenu events where we always want to show at the new position
* @param event - The trigger event (must be MouseEvent for position)
*/
function showNodeOptions(event, context) {
	invocationContext.value = context;
	if (nodeOptionsInstance?.show) nodeOptionsInstance.show(event);
}
/**
* Check if the node options menu is currently open
*/
function isNodeOptionsOpen() {
	return nodeOptionsInstance?.isOpen.value ?? false;
}
/**
* Register the NodeOptions component instance
* @param instance - The NodeOptions component instance
*/
function registerNodeOptionsInstance(instance) {
	nodeOptionsInstance = instance;
}
/**
* Mark menu options as coming from Vue hardcoded menu
*/
function markAsVueOptions(options) {
	return options.map((opt) => {
		if (opt.type === "divider" || opt.type === "category") return opt;
		return {
			...opt,
			source: "vue"
		};
	});
}
/**
* Composable for managing the More Options menu configuration
* Refactored to use smaller, focused composables for better maintainability
*/
function useMoreOptionsMenu() {
	const { selectedItems, selectedNodes, canOpenNodeInfo, openNodeInfo, hasSubgraphs: hasSubgraphsComputed, hasImageNode, hasOutputNodesSelected, hasMultipleSelection, isSingleNode, computeSelectionFlags } = useSelectionState();
	const canvasStore = useCanvasStore();
	const nodeOutputStore = useNodeOutputStore();
	const { getImageMenuOptions } = useImageMenuOptions();
	const { hasMultipleOutputs } = useNodeOutputsExport();
	const { getNodeInfoOption, getNodeVisualOptions, getPinOption, getBypassOption, getRunBranchOption } = useNodeMenuOptions();
	const { getFitGroupToNodesOption, getGroupColorOptions, getGroupModeOptions } = useGroupMenuOptions();
	const { getBasicSelectionOptions, getMultipleNodesOptions, getSubgraphOptions, getAlignmentOptions, getDeleteOption } = useSelectionMenuOptions();
	const hasSubgraphs = hasSubgraphsComputed;
	const hasMultipleNodes = hasMultipleSelection;
	const optionsVersion = ref(0);
	const bump = () => {
		optionsVersion.value++;
	};
	const menuOptions = computed(() => {
		optionsVersion.value;
		const states = computeSelectionFlags();
		const selectedGroups = selectedItems.value.filter(isLGraphGroup);
		const groupContext = selectedGroups.length === 1 && selectedNodes.value.length === 0 ? selectedGroups[0] : null;
		const hasSubgraphsSelected = hasSubgraphs.value;
		const litegraphOptions = [];
		const node = (invocationContext.value === void 0 ? void 0 : canvasStore.currentGraph?.getNodeById(invocationContext.value.nodeId)) ?? selectedNodes.value.at(0);
		const hideLinkedInputActions = node ? shouldHideLinkedCoreMediaInputActions(node) : false;
		const hideLinkedInputPreview = node ? shouldHideLinkedCoreMediaInputPreview(node, nodeOutputStore.getNodeOutputs(node)) : false;
		const unavailableCoreMediaActionKinds = /* @__PURE__ */ new Set();
		if (hideLinkedInputActions) unavailableCoreMediaActionKinds.add("input");
		if (hideLinkedInputPreview) unavailableCoreMediaActionKinds.add("preview");
		if (selectedNodes.value.length === 1 && node && !groupContext && canvasStore.canvas) try {
			const rawItems = canvasStore.canvas.getNodeMenuOptions(node);
			litegraphOptions.push(...convertContextMenuToOptions(filterUnavailableCoreMediaMenuActions(rawItems, unavailableCoreMediaActionKinds), node, false));
		} catch (error) {
			console.error("Error getting LiteGraph menu items:", error);
		}
		const options = [];
		const basicOps = getBasicSelectionOptions();
		options.push(...basicOps);
		options.push({ type: "divider" });
		if (hasOutputNodesSelected.value) {
			const runBranch = getRunBranchOption();
			options.push(runBranch);
		}
		if (!groupContext) {
			const pin = getPinOption(states, bump);
			const bypass = getBypassOption(bump);
			options.push(pin);
			options.push(bypass);
		}
		if (groupContext) {
			const groupModes = getGroupModeOptions(groupContext, bump);
			options.push(...groupModes);
		}
		options.push({ type: "divider" });
		options.push(...getSubgraphOptions({
			hasSubgraphs: hasSubgraphsSelected,
			hasMultipleSelection: hasMultipleNodes.value
		}));
		if (hasMultipleNodes.value) {
			options.push(...getMultipleNodesOptions());
			options.push(...getAlignmentOptions(node));
		}
		if (groupContext) options.push(getFitGroupToNodesOption(groupContext));
		else {
			const visualOptions = getNodeVisualOptions(states, bump);
			if (visualOptions.length > 0) options.push(visualOptions[0]);
		}
		options.push({ type: "divider" });
		if (canOpenNodeInfo.value) options.push(getNodeInfoOption(openNodeInfo));
		if (groupContext) options.push(getGroupColorOptions(groupContext, bump));
		else {
			const visualOptions = getNodeVisualOptions(states, bump);
			if (visualOptions.length > 1) options.push(visualOptions[1]);
			if (visualOptions.length > 2) options.push(visualOptions[2]);
		}
		options.push({ type: "divider" });
		if (hasImageNode.value && selectedNodes.value.length > 0 || isSingleNode.value && hasMultipleOutputs(selectedNodes.value[0])) {
			options.push(...getImageMenuOptions(selectedNodes.value[0], {
				input: !hideLinkedInputActions,
				preview: !hideLinkedInputPreview
			}));
			options.push({ type: "divider" });
		}
		const widgetName = invocationContext.value?.widgetName;
		const widget = node?.widgets?.find((w) => w.name === widgetName);
		if (node && widget) {
			const widgetOptions = convertContextMenuToOptions(getExtraOptionsForWidget(node, widget));
			if (widgetOptions.length > 0) {
				options.push(...widgetOptions);
				options.push({ type: "divider" });
			}
		}
		options.push(getDeleteOption(selectedNodes.value.some((node) => node.removable === false || node.block_delete)));
		const markedVueOptions = markAsVueOptions(options);
		if (litegraphOptions.length > 0) return buildStructuredMenu([...litegraphOptions, ...markedVueOptions]);
		return buildStructuredMenu(markedVueOptions);
	});
	return {
		menuOptions,
		menuOptionsWithSubmenu: computed(() => menuOptions.value.filter((option) => option.hasSubmenu && option.submenu)),
		bump,
		hasSubgraphs,
		registerNodeOptionsInstance
	};
}
//#endregion
export { useMoreOptionsMenu as a, filterOutputNodes as c, shouldHideLinkedCoreLoadAudioPlayer as d, shouldHideLinkedCoreMediaInputPreview as f, useAssetDownload as g, useAssetExportStore as h, toggleNodeOptions as i, isOutputNode as l, useAssetZipExport as m, registerNodeOptionsInstance as n, useFrameNodes as o, useNodeOutputsExport as p, showNodeOptions as r, useSelectionState as s, isNodeOptionsOpen as t, useNodeCustomization as u };
