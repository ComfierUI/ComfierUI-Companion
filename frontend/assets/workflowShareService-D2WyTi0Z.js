import "./rolldown-runtime-xtsTai4I.js";
import { Xt as partition, a as dropTargetForElements, i as draggable } from "./vendor-other-BPEcPQTD.js";
import { Dt as withDirectives, Et as withCtx, F as createBaseVNode, G as defineComponent, H as createTextVNode, I as createBlock, Jt as normalizeClass, Kt as unref, L as createCommentVNode, Lt as ref, O as Fragment, P as computed, R as createElementBlock, St as watch, U as createVNode, Wt as toValue, Zt as toDisplayString, dt as renderList, lt as openBlock, mt as resolveDirective, ot as onMounted, rt as onBeforeUnmount } from "./vendor-vue-core-C1utdb0s.js";
import { Lr as useAssetsStore, o as app, xi as buildTooltipConfig } from "./layoutStore-CZsuzg91.js";
import { i as api } from "./api-Bt-fGt5a.js";
import { C as unknownType, _ as objectType, b as stringType, c as booleanType, f as enumType, s as arrayType, v as preprocessType, y as recordType } from "./vendor-zod-TMj9Wsdv.js";
import { F as zHubProfile, M as zGetHubWorkflowResponse, i as zAssetInfo } from "./zod.gen-C09SPgBJ.js";
import { hn as CollapsibleRoot_default, mn as CollapsibleContent_default, pn as CollapsibleTrigger_default } from "./vendor-reka-ui-tdehH9A1.js";
import { t as cn } from "./src-DI1bBfrb.js";
import { t as Button_default } from "./Button-j0oCzR82.js";
import { t as useImageQuiet } from "./useImageQuiet-Ded8W_Zd.js";
import { t as Skeleton_default } from "./Skeleton-gXY6B2Cf.js";
//#region src/platform/workflow/sharing/schemas/shareSchemas.ts
var zComfyHubProfile = zHubProfile.pick({
	username: true,
	description: true
}).extend({
	name: zHubProfile.shape.display_name,
	coverImageUrl: stringType().nullish(),
	profilePictureUrl: zHubProfile.shape.avatar_url.nullish()
});
var zPublishRecordResponse = objectType({
	workflow_id: stringType(),
	share_id: stringType().nullable(),
	listed: booleanType(),
	publish_time: stringType().nullable(),
	assets: arrayType(zAssetInfo).optional()
});
/**
* Strips path separators and control characters from a workflow name to prevent
* path traversal when the name is later used as part of a file path.
*/
function sanitizeWorkflowName(name) {
	return name.replaceAll(/[/\\:]/g, "_").slice(0, 200).trim();
}
var zSharedWorkflowResponse = objectType({
	share_id: stringType(),
	workflow_id: stringType(),
	name: stringType().transform(sanitizeWorkflowName),
	listed: booleanType(),
	publish_time: stringType().nullable(),
	workflow_json: recordType(stringType(), unknownType()),
	assets: arrayType(zAssetInfo)
});
var zHubProfileResponse = preprocessType((data) => {
	if (!data || typeof data !== "object") return data;
	const d = data;
	return {
		username: d.username,
		name: d.name ?? d.display_name,
		description: d.description,
		coverImageUrl: d.coverImageUrl ?? d.cover_image_url,
		profilePictureUrl: d.profilePictureUrl ?? d.profile_picture_url ?? d.avatar_url
	};
}, zComfyHubProfile);
var zHubAssetUploadUrlResponse = objectType({
	upload_url: stringType(),
	public_url: stringType(),
	token: stringType()
}).transform((response) => ({
	uploadUrl: response.upload_url,
	publicUrl: response.public_url,
	token: response.token
}));
var zHubWorkflowPublishResponse = objectType({
	share_id: stringType(),
	workflow_id: stringType(),
	thumbnail_type: enumType([
		"image",
		"video",
		"image_comparison"
	]).optional()
});
var zHubLabelInfo = objectType({
	name: stringType(),
	display_name: stringType(),
	type: enumType([
		"tag",
		"model",
		"custom_node"
	])
});
var zHubLabelListResponse = objectType({ labels: arrayType(zHubLabelInfo) });
//#endregion
//#region src/composables/usePragmaticDragAndDrop.ts
function usePragmaticDroppable(dropTargetElement, options) {
	let cleanup = () => {};
	onMounted(() => {
		const element = toValue(dropTargetElement);
		if (!element) return;
		cleanup = dropTargetForElements({
			element,
			...options
		});
	});
	onBeforeUnmount(() => {
		cleanup();
	});
}
function usePragmaticDraggable(draggableElement, options) {
	let cleanup = () => {};
	onMounted(() => {
		const element = toValue(draggableElement);
		if (!element) return;
		cleanup = draggable({
			element,
			...options
		});
	});
	onBeforeUnmount(() => {
		cleanup();
	});
}
//#endregion
//#region src/platform/workflow/sharing/components/ShareAssetThumbnail.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1$1 = { class: "relative flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-md bg-muted" };
var _hoisted_2$1 = ["src", "alt"];
var _hoisted_3$1 = {
	key: 2,
	class: "icon-[lucide--image] size-4 text-muted-foreground"
};
//#endregion
//#region src/platform/workflow/sharing/components/ShareAssetThumbnail.vue
var ShareAssetThumbnail_default = /* @__PURE__ */ defineComponent({
	__name: "ShareAssetThumbnail",
	props: {
		name: {},
		previewUrl: {}
	},
	emits: ["thumbnailError"],
	setup(__props) {
		const normalizedPreviewUrl = computed(() => {
			if (typeof __props.previewUrl !== "string" || __props.previewUrl.length === 0) return null;
			try {
				const url = new URL(__props.previewUrl, window.location.origin);
				if (!url.origin.includes("googleapis") && url.searchParams.has("filename") && !url.searchParams.has("res")) url.searchParams.set("res", "256");
				return url.toString();
			} catch {
				return __props.previewUrl;
			}
		});
		const imageOptions = computed(() => ({ src: normalizedPreviewUrl.value ?? "" }));
		const { isReady, isLoading, error } = useImageQuiet(imageOptions);
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", _hoisted_1$1, [
				normalizedPreviewUrl.value && unref(isLoading) ? (openBlock(), createBlock(Skeleton_default, {
					key: 0,
					class: "absolute inset-0"
				})) : createCommentVNode("", true),
				normalizedPreviewUrl.value && !unref(error) ? (openBlock(), createElementBlock("img", {
					key: 1,
					src: normalizedPreviewUrl.value,
					alt: __props.name,
					class: normalizeClass(unref(cn)("size-full object-cover transition-opacity duration-200", unref(isReady) ? "opacity-100" : "opacity-0")),
					onError: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("thumbnailError", {
						name: __props.name,
						previewUrl: normalizedPreviewUrl.value
					}))
				}, null, 42, _hoisted_2$1)) : createCommentVNode("", true),
				!normalizedPreviewUrl.value || unref(error) ? (openBlock(), createElementBlock("i", _hoisted_3$1)) : createCommentVNode("", true)
			]);
		};
	}
});
//#endregion
//#region src/platform/workflow/sharing/composables/useAssetSections.ts
function useAssetSections(items) {
	const sections = computed(() => {
		const [models, media] = partition(items(), (a) => a.model);
		return [{
			id: "media",
			labelKey: "shareWorkflow.mediaLabel",
			items: media
		}, {
			id: "models",
			labelKey: "shareWorkflow.modelsLabel",
			items: models
		}].filter((s) => s.items.length > 0);
	});
	const expandedSectionId = ref(null);
	function getDefaultExpandedSection(availableSections) {
		if (availableSections.length === 0) return null;
		return availableSections.find((s) => s.id === "media")?.id ?? availableSections[0].id;
	}
	watch(sections, (availableSections) => {
		if (availableSections.some((s) => s.id === expandedSectionId.value)) return;
		expandedSectionId.value = getDefaultExpandedSection(availableSections);
	}, { immediate: true });
	function onSectionOpenChange(sectionId, open) {
		if (open) {
			expandedSectionId.value = sectionId;
			return;
		}
		if (expandedSectionId.value === sectionId) expandedSectionId.value = null;
	}
	return {
		sections,
		expandedSectionId,
		onSectionOpenChange
	};
}
//#endregion
//#region src/platform/workflow/sharing/components/AssetSectionList.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1 = { class: "flex flex-col gap-1" };
var _hoisted_2 = { class: "max-h-25 overflow-y-auto px-6 pt-0.5 pb-1" };
var _hoisted_3 = { class: "truncate text-xs text-base-foreground" };
var _hoisted_4 = {
	key: 0,
	class: "ml-auto shrink-0 text-xs text-muted-foreground"
};
//#endregion
//#region src/platform/workflow/sharing/components/AssetSectionList.vue
var AssetSectionList_default = /* @__PURE__ */ defineComponent({
	__name: "AssetSectionList",
	props: { items: {} },
	setup(__props) {
		const { sections, expandedSectionId, onSectionOpenChange } = useAssetSections(() => __props.items);
		function onThumbnailError(name, previewUrl) {
			console.warn("[share][assets][thumbnail-error]", {
				name,
				previewUrl: previewUrl ?? null
			});
		}
		return (_ctx, _cache) => {
			const _directive_tooltip = resolveDirective("tooltip");
			return openBlock(), createElementBlock("div", _hoisted_1, [(openBlock(true), createElementBlock(Fragment, null, renderList(unref(sections), (section) => {
				return openBlock(), createBlock(unref(CollapsibleRoot_default), {
					key: section.id,
					class: "overflow-hidden rounded-sm",
					open: unref(expandedSectionId) === section.id,
					"onUpdate:open": ($event) => unref(onSectionOpenChange)(section.id, $event)
				}, {
					default: withCtx(() => [createVNode(unref(CollapsibleTrigger_default), { "as-child": "" }, {
						default: withCtx(() => [createVNode(Button_default, {
							"data-testid": `section-header-${section.id}`,
							"aria-expanded": unref(expandedSectionId) === section.id,
							"aria-controls": `section-content-${section.id}`,
							variant: "secondary",
							class: "w-full justify-between px-6 py-1"
						}, {
							default: withCtx(() => [createBaseVNode("span", null, toDisplayString(_ctx.$t(section.labelKey, section.items.length)), 1), createBaseVNode("i", { class: normalizeClass(unref(cn)("icon-[lucide--chevron-right] size-4 text-muted-foreground transition-transform", unref(expandedSectionId) === section.id && "rotate-90")) }, null, 2)]),
							_: 2
						}, 1032, [
							"data-testid",
							"aria-expanded",
							"aria-controls"
						])]),
						_: 2
					}, 1024), createVNode(unref(CollapsibleContent_default), {
						id: `section-content-${section.id}`,
						"data-testid": `section-content-${section.id}`,
						class: "overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down"
					}, {
						default: withCtx(() => [createBaseVNode("ul", _hoisted_2, [(openBlock(true), createElementBlock(Fragment, null, renderList(section.items, (item) => {
							return openBlock(), createElementBlock("li", {
								key: item.id,
								class: "flex items-center gap-2 rounded-sm py-1"
							}, [
								createVNode(ShareAssetThumbnail_default, {
									name: item.name,
									"preview-url": item.preview_url,
									onThumbnailError: _cache[0] || (_cache[0] = ($event) => onThumbnailError($event.name, $event.previewUrl))
								}, null, 8, ["name", "preview-url"]),
								withDirectives((openBlock(), createElementBlock("span", _hoisted_3, [createTextVNode(toDisplayString(item.name), 1)])), [[_directive_tooltip, unref(buildTooltipConfig)(item.name)]]),
								item.in_library ? (openBlock(), createElementBlock("span", _hoisted_4, toDisplayString(_ctx.$t("shareWorkflow.inLibrary")), 1)) : createCommentVNode("", true)
							]);
						}), 128))])]),
						_: 2
					}, 1032, ["id", "data-testid"])]),
					_: 2
				}, 1032, ["open", "onUpdate:open"]);
			}), 128))]);
		};
	}
});
//#endregion
//#region src/platform/workflow/sharing/services/workflowShareService.ts
var SharedWorkflowLoadError = class extends Error {
	status;
	constructor(status, message) {
		super(message ?? `Failed to load shared workflow: ${status ?? "unknown"}`);
		this.name = "SharedWorkflowLoadError";
		this.status = status;
	}
	get isRetryable() {
		if (this.status === null) return true;
		return this.status >= 500 || this.status === 408 || this.status === 429;
	}
};
function mapApiThumbnailType(value) {
	if (!value) return void 0;
	if (value === "image_comparison") return "imageComparison";
	return value;
}
function extractPrefill(fields) {
	const name = fields.name;
	const description = fields.description;
	const tags = fields.tags?.map((tag) => tag.display_name);
	const models = fields.models?.map((model) => model.name);
	const customNodes = fields.custom_nodes?.map((node) => node.name);
	const thumbnailType = mapApiThumbnailType(fields.thumbnail_type);
	const thumbnailUrl = fields.thumbnail_url;
	const thumbnailComparisonUrl = fields.thumbnail_comparison_url;
	const sampleImageUrls = fields.sample_image_urls;
	const tutorialUrl = fields.tutorial_url;
	const metadata = fields.metadata && Object.keys(fields.metadata).length > 0 ? fields.metadata : void 0;
	if (!name && !description && !tags?.length && !models?.length && !customNodes?.length && !thumbnailType && !thumbnailUrl && !thumbnailComparisonUrl && !sampleImageUrls?.length && !tutorialUrl && !metadata) return null;
	return {
		name,
		description,
		tags,
		models,
		customNodes,
		thumbnailType,
		thumbnailUrl,
		thumbnailComparisonUrl,
		sampleImageUrls,
		tutorialUrl,
		metadata
	};
}
function decodeHubWorkflowPrefill(payload) {
	const result = zGetHubWorkflowResponse.safeParse(payload);
	if (!result.success) return null;
	return extractPrefill(result.data);
}
function decodePublishRecord(payload) {
	const result = zPublishRecordResponse.safeParse(payload);
	if (!result.success) return null;
	const r = result.data;
	return {
		workflowId: r.workflow_id,
		shareId: r.share_id ?? void 0,
		listed: r.listed,
		publishedAt: parsePublishedAt(r.publish_time),
		shareUrl: r.share_id ? normalizeShareUrl(r.share_id) : void 0,
		prefill: null
	};
}
function parsePublishedAt(value) {
	if (!value) return null;
	const parsed = new Date(value);
	return Number.isNaN(parsed.getTime()) ? null : parsed;
}
function normalizeShareUrl(shareId) {
	const queryString = `share=${encodeURIComponent(shareId)}`;
	if (typeof window === "undefined" || !window.location.origin) return `/?${queryString}`;
	const normalizedUrl = new URL(window.location.href);
	normalizedUrl.search = queryString;
	normalizedUrl.hash = "";
	return normalizedUrl.toString();
}
function decodeSharedWorkflowPayload(payload) {
	const result = zSharedWorkflowResponse.safeParse(payload);
	if (!result.success) return null;
	const r = result.data;
	return {
		shareId: r.share_id,
		workflowId: r.workflow_id,
		name: r.name,
		listed: r.listed,
		publishedAt: r.publish_time ? parsePublishedAt(r.publish_time) : null,
		workflowJson: r.workflow_json,
		assets: r.assets
	};
}
var UNPUBLISHED = {
	isPublished: false,
	shareId: null,
	shareUrl: null,
	publishedAt: null,
	prefill: null
};
function useWorkflowShareService() {
	async function fetchHubWorkflowPrefill(shareId) {
		const response = await api.fetchApi(`/hub/workflows/${encodeURIComponent(shareId)}`);
		if (!response.ok) throw new Error(`Failed to fetch hub workflow details: ${response.status}`);
		return decodeHubWorkflowPrefill(await response.json());
	}
	async function publishWorkflow(workflowPath, shareableAssets) {
		const assetIds = shareableAssets.map((a) => a.id);
		const response = await api.fetchApi(`/userdata/${encodeURIComponent(workflowPath)}/publish`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ asset_ids: assetIds })
		});
		if (!response.ok) throw new Error(`Failed to publish workflow: ${response.status}`);
		const record = decodePublishRecord(await response.json());
		if (!record?.shareId || !record.publishedAt) throw new Error("Failed to publish workflow: invalid response");
		return {
			shareId: record.shareId,
			shareUrl: normalizeShareUrl(record.shareId),
			publishedAt: record.publishedAt
		};
	}
	async function getPublishStatus(workflowPath) {
		const response = await api.fetchApi(`/userdata/${encodeURIComponent(workflowPath)}/publish`);
		if (!response.ok) {
			if (response.status === 404) return UNPUBLISHED;
			throw new Error(`Failed to fetch publish status: ${response.status} ${response.statusText}`);
		}
		const record = decodePublishRecord(await response.json());
		if (!record || !record.shareId || !record.publishedAt) return UNPUBLISHED;
		let prefill = record.prefill;
		if (shouldFetchPrefill(record.listed, prefill)) try {
			prefill = await fetchHubWorkflowPrefill(record.shareId);
		} catch {
			prefill = null;
		}
		return {
			isPublished: true,
			shareId: record.shareId,
			shareUrl: normalizeShareUrl(record.shareId),
			publishedAt: record.publishedAt,
			prefill
		};
	}
	async function getShareableAssets(includingPublic = false) {
		if (!app.isGraphReady) return [];
		const graph = app.rootGraph;
		const { output } = await app.graphToPrompt(graph);
		const { assets } = await api.getShareableAssets(output);
		return includingPublic ? assets : assets.filter((asset) => !asset.public);
	}
	async function getSharedWorkflow(shareId) {
		let response;
		try {
			response = await api.fetchApi(`/workflows/published/${encodeURIComponent(shareId)}`);
		} catch {
			throw new SharedWorkflowLoadError(null, "Failed to load shared workflow: network error");
		}
		if (!response.ok) throw new SharedWorkflowLoadError(response.status);
		const workflow = decodeSharedWorkflowPayload(await response.json());
		if (!workflow) throw new Error("Failed to load shared workflow: invalid response");
		return workflow;
	}
	async function importPublishedAssets(assetIds, shareId) {
		const body = {
			published_asset_ids: assetIds,
			...shareId ? { share_id: shareId } : {}
		};
		const response = await api.fetchApi("/assets/import", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(body)
		});
		if (!response.ok) throw new Error(`Failed to import assets: ${response.status}`);
		await useAssetsStore().inputAssets.invalidate();
	}
	return {
		publishWorkflow,
		getPublishStatus,
		getShareableAssets,
		getSharedWorkflow,
		importPublishedAssets
	};
}
function shouldFetchPrefill(listed, prefill) {
	return listed && !prefill;
}
//#endregion
export { zHubAssetUploadUrlResponse as a, zHubWorkflowPublishResponse as c, usePragmaticDroppable as i, AssetSectionList_default as n, zHubLabelListResponse as o, usePragmaticDraggable as r, zHubProfileResponse as s, useWorkflowShareService as t };
