import "./rolldown-runtime-xtsTai4I.js";
import { T as useImage } from "./vendor-vueuse-BxKIIsKg.js";
import { y as isCivitaiUrl } from "./formatUtil-DuxXRy1z.js";
//#region src/platform/assets/utils/assetMetadataUtils.ts
var MODELS_TAG = "models";
var MISSING_TAG = "missing";
/**
* Type-safe utilities for extracting metadata from assets.
* These utilities check user_metadata first, then metadata, then fallback.
*/
/**
* Helper to get a string property from user_metadata or metadata
*/
function getStringProperty(asset, key) {
	const userValue = asset.user_metadata?.[key];
	if (typeof userValue === "string") return userValue;
	const metaValue = asset.metadata?.[key];
	if (typeof metaValue === "string") return metaValue;
}
/**
* Safely extracts string description from asset metadata
* Checks user_metadata first, then metadata, then returns null
* @param asset - The asset to extract description from
* @returns The description string or null if not present/not a string
*/
function getAssetDescription(asset) {
	return getStringProperty(asset, "description") ?? null;
}
/**
* Extracts base models as an array from asset metadata
* Checks user_metadata first, then metadata, then returns empty array
* @param asset - The asset to extract base models from
* @returns Array of base model strings
*/
function getAssetBaseModels(asset) {
	const baseModel = asset.user_metadata?.base_model ?? asset.metadata?.base_model;
	if (Array.isArray(baseModel)) return baseModel.filter((m) => typeof m === "string");
	if (typeof baseModel === "string" && baseModel) return [baseModel];
	return [];
}
/**
* Gets the display name for an asset
* Checks user_metadata.name, then metadata.name, then display_name, then asset.name
* @param asset - The asset to get display name from
* @returns The display name
*/
function getAssetDisplayName(asset) {
	return getStringProperty(asset, "name") || asset.display_name || asset.name;
}
/**
* Constructs source URL from asset's source_arn
* @param asset - The asset to extract source URL from
* @returns The source URL or null if not present/parseable
*/
function getAssetSourceUrl(asset) {
	if (typeof asset.metadata?.repo_url === "string") return asset.metadata.repo_url;
	const sourceArn = asset.metadata?.source_arn ?? asset.user_metadata?.source_arn;
	if (typeof sourceArn !== "string") return null;
	const civitaiMatch = sourceArn.match(/^civitai:model:(\d+):version:(\d+)(?::file:\d+)?$/);
	if (civitaiMatch) {
		const [, modelId, versionId] = civitaiMatch;
		return `https://civitai.com/models/${modelId}?modelVersionId=${versionId}`;
	}
	return null;
}
/**
* Extracts trigger phrases from asset metadata
* Checks user_metadata first, then metadata, then returns empty array
* @param asset - The asset to extract trigger phrases from
* @returns Array of trigger phrases
*/
function getAssetTriggerPhrases(asset) {
	const phrases = asset.user_metadata?.trained_words ?? asset.metadata?.trained_words;
	if (Array.isArray(phrases)) return phrases.filter((p) => typeof p === "string");
	if (typeof phrases === "string") return [phrases];
	return [];
}
/**
* Extracts additional tags from asset user_metadata
* @param asset - The asset to extract tags from
* @returns Array of user-defined tags
*/
function getAssetAdditionalTags(asset) {
	const tags = asset.user_metadata?.additional_tags;
	if (Array.isArray(tags)) return tags.filter((t) => typeof t === "string");
	return [];
}
/**
* Determines the source name from a URL
* @param url - The source URL
* @returns Human-readable source name
*/
function getSourceName(url) {
	if (isCivitaiUrl(url)) return "Civitai";
	try {
		const hostname = new URL(url).hostname.toLowerCase();
		if (hostname === "huggingface.co" || hostname.endsWith(".huggingface.co")) return "Hugging Face";
	} catch {}
	return "Source";
}
/** Prefix for the namespaced tag that carries a model's folder category, e.g. `model_type:checkpoints`. */
var MODEL_TYPE_TAG_PREFIX = "model_type:";
/**
* Extracts the model type from asset tags as a bare (non-namespaced) value.
* Never returns a raw `model_type:*` literal: this value feeds edit widgets
* whose save path writes tags back verbatim, so a namespaced tag leaking
* through here would round-trip the prefixed literal into the tag set.
* @param asset - The asset to extract model type from
* @returns The model type string or null if not present
*/
function getAssetModelType(asset) {
	return asset.tags.find((tag) => tag && tag !== MODELS_TAG && !tag.startsWith("model_type:")) ?? null;
}
/**
* Builds the namespaced subtype tag the backend stores in `model_type:` mode.
* The argument is a discovery folder_name (e.g. `checkpoints`,
* `ultralytics_bbox`); the backend keeps the bare directory-path twin in sync.
* An already-namespaced input is returned unchanged rather than silently
* double-prefixed.
*/
function toModelTypeTag(folderName) {
	if (folderName.startsWith("model_type:")) return folderName;
	return `${MODEL_TYPE_TAG_PREFIX}${folderName}`;
}
/** Strips the `model_type:` prefix off each namespaced tag, dropping non-`model_type:` tags. */
function getModelTypeTagValues(asset) {
	return asset.tags.filter((tag) => tag.startsWith(MODEL_TYPE_TAG_PREFIX)).map((tag) => tag.slice(11)).filter((tag) => tag.length > 0);
}
function isModelTypeCovered(asset) {
	return getModelTypeTagValues(asset).length > 0;
}
/**
* The asset's primary `model_type:` membership: the lexicographically-first of
* its stripped `model_type:` values, or `undefined` for an uncovered asset.
* Sorting makes the choice deterministic because the backend does not guarantee
* the order of an asset's `model_type:` tags. This is the single membership a
* re-type replaces and the value the edit dropdown / browser title reflect.
*/
function getPrimaryModelType(asset) {
	return [...getModelTypeTagValues(asset)].sort()[0];
}
/**
* Resolves the folder_name shown as the asset's current model type in the edit
* dropdown. In `modelTypeMode` the primary `model_type:` value is authoritative
* (covered assets); an uncovered asset with no `model_type:` tag falls back to
* its bare subtype tag, mirroring the read-side grouping. Outside the mode this
* is the legacy first-non-`models` tag.
*/
function getEditableModelType(asset, modelTypeMode) {
	if (modelTypeMode) {
		const primary = getPrimaryModelType(asset);
		if (primary !== void 0) return primary;
	}
	return getAssetModelType(asset);
}
/**
* Computes the tag set for re-typing a model asset to `newFolderName`. In
* `modelTypeMode` only the primary `model_type:` membership is replaced: a
* covered asset drops `model_type:<primary>` and its bare directory-path twin,
* leaving any sibling `model_type:` memberships of a multi-type asset intact;
* an uncovered asset drops its bare current type. The new
* `model_type:<folder_name>` is then added (deduped if it already exists as a
* sibling). Outside the mode it swaps the legacy bare subtype tag, preserving
* the pre-namespace behavior.
*/
function buildModelTypeTagUpdate(asset, newFolderName, modelTypeMode) {
	if (!modelTypeMode) {
		const currentType = getAssetModelType(asset);
		return asset.tags.filter((tag) => tag !== currentType).concat(newFolderName);
	}
	const primary = getPrimaryModelType(asset);
	const currentBareType = getAssetModelType(asset);
	const tagsToRemove = primary !== void 0 ? /* @__PURE__ */ new Set([toModelTypeTag(primary), primary]) : new Set(currentBareType ? [currentBareType] : []);
	const newTag = toModelTypeTag(newFolderName);
	const retained = asset.tags.filter((tag) => !tagsToRemove.has(tag));
	return retained.includes(newTag) ? retained : retained.concat(newTag);
}
/**
* Save gate for a model-type change: returns the tag set to persist, or null
* when the change must not be written (the type is read-only, or unchanged).
* Keeps tag-set semantics in buildModelTypeTagUpdate; this only decides whether
* to save.
*/
function resolveModelTypeTagUpdate(asset, newFolderName, isEditable, modelTypeMode) {
	if (!isEditable) return null;
	if (getEditableModelType(asset, modelTypeMode) === newFolderName) return null;
	return buildModelTypeTagUpdate(asset, newFolderName, modelTypeMode);
}
/** Legacy grouping: each non-`models` tag's top-level path segment. */
function getBareTagCategories(asset) {
	return asset.tags.filter((tag) => tag !== MODELS_TAG && tag.length > 0).map((tag) => tag.split("/")[0]);
}
/**
* Resolves the category keys a model asset is grouped under.
*
* `modelTypeMode` reflects whether the backend declares the `model_type:` tag
* scheme (the `supports_model_type_tags` capability). When true, an asset's
* `model_type:*` values are authoritative; an asset with no `model_type:` tag
* still routes by its bare tags. When false (the default) categories come from
* the legacy bare-tag top-level grouping and `model_type:` is ignored.
*/
function getAssetCategories(asset, modelTypeMode) {
	if (modelTypeMode) {
		const modelTypes = getModelTypeTagValues(asset);
		if (modelTypes.length > 0) return modelTypes;
		return getBareTagCategories(asset).filter((category) => !category.startsWith(MODEL_TYPE_TAG_PREFIX));
	}
	return getBareTagCategories(asset);
}
/**
* Resolves the primary tag a browser surface titles itself after. In
* `modelTypeMode` a covered asset uses its primary `model_type:*` value — the
* key it groups under — while an uncovered asset keeps the legacy selection
* (first non-`models` tag, verbatim, hierarchical paths intact). Outside the
* mode this is exactly the legacy selection.
*/
function getPrimaryCategoryTag(asset, modelTypeMode) {
	if (modelTypeMode) {
		const primary = getPrimaryModelType(asset);
		if (primary !== void 0) return primary;
		return asset.tags.find((tag) => tag !== MODELS_TAG && !tag.startsWith("model_type:"));
	}
	return asset.tags.find((tag) => tag !== MODELS_TAG);
}
/** Number of `parent/child` segments in a tag, used to pick the most specific. */
function pathDepth(tag) {
	return tag.split("/").length;
}
/** Removes the `model_type:` namespace prefix from a tag when present. */
function stripModelTypePrefix(tag) {
	return tag.startsWith("model_type:") ? tag.slice(11) : tag;
}
/**
* Resolves the labels shown as an asset card's type badges.
*
* In `modelTypeMode` a covered asset badges every `model_type:*` value — the
* same keys it groups under (`getAssetCategories`) — so a shared-root asset
* tagged with several categories carries each of them; whichever category
* view the card appears in is represented on the card. Uncovered assets (and
* legacy mode) keep the original single selection: first non-`models` tag,
* with bare hierarchical tags showing the segment after the first `/`.
*/
function getAssetTypeBadges(asset, modelTypeMode) {
	if (modelTypeMode) {
		const modelTypes = getModelTypeTagValues(asset);
		if (modelTypes.length > 0) return modelTypes;
	}
	const typeTag = asset.tags.find((tag) => tag !== MODELS_TAG && !(modelTypeMode && tag.startsWith("model_type:")));
	if (!typeTag) return [];
	return [typeTag.includes("/") ? typeTag.slice(typeTag.indexOf("/") + 1) : typeTag];
}
/**
* Ordered node-category candidates for an asset, most specific first.
*
* Callers resolve a node provider by trying each candidate in order and taking
* the first that maps to a provider. The full (possibly hierarchical) value is
* kept so `modelToNodeStore`'s `parent/child` fallback still works.
*
* In `modelTypeMode` (backend declares `supports_model_type_tags`) candidates
* come in two tiers. Tier 1: the stripped `model_type:*` values plus bare tags
* *related* to one of them (equal to it, or extending it as a `parent/child`
* path), ordered by descending depth — so a resolvable `LLM/Qwen-VL/...` twin
* wins over a flat `model_type:LLM`, while ties keep `model_type:*` values
* ahead of bare tags. Tier 2: unrelated bare tags (e.g. a user-added
* `foo/bar`), tried only when nothing authoritative resolves — they can no
* longer pre-empt a resolvable `model_type:*` value however deep they are.
* An uncovered asset (no `model_type:` tag) routes by all its bare tags,
* deepest first. Outside `modelTypeMode` the legacy first-non-reserved tag is
* used verbatim.
*/
function getAssetNodeCategoryCandidates(asset, modelTypeMode) {
	if (!modelTypeMode) {
		const legacy = asset.tags.find((tag) => tag !== MODELS_TAG && tag !== MISSING_TAG);
		return legacy ? [legacy] : [];
	}
	const bareTags = asset.tags.filter((tag) => tag !== MODELS_TAG && tag !== MISSING_TAG && !tag.startsWith("model_type:"));
	const byDepthDesc = (a, b) => pathDepth(b) - pathDepth(a);
	const modelTypes = getModelTypeTagValues(asset);
	if (modelTypes.length === 0) return [...bareTags].sort(byDepthDesc);
	const isRelated = (tag) => modelTypes.some((type) => tag === type || tag.startsWith(`${type}/`));
	return [...[.../* @__PURE__ */ new Set([...modelTypes, ...bareTags.filter(isRelated)])].sort(byDepthDesc), ...bareTags.filter((tag) => !isRelated(tag)).sort(byDepthDesc)];
}
/**
* Extracts user description from asset user_metadata
* @param asset - The asset to extract user description from
* @returns The user description string or empty string if not present
*/
function getAssetUserDescription(asset) {
	return typeof asset.user_metadata?.user_description === "string" ? asset.user_metadata.user_description : "";
}
/**
* Gets the filename for an asset with fallback chain
* Checks user_metadata.filename first, then metadata.filename, then asset.name.
* Use this for serialized/identifier contexts (workflow widget values,
* filename schema validation, missing-model matching) where we need the
* canonical filename and MUST NOT substitute a display-only string.
*/
function getAssetFilename(asset) {
	return getStringProperty(asset, "filename") ?? asset.name;
}
/**
* Resolves the filename that addresses an asset's *bytes* in storage — use
* this to build the path a backend resolves to a real file (the
* `createAnnotatedPath` input behind `/view` requests and widget values),
* never to show the user. Cloud is content-addressed, so it returns the
* content hash (`hash`); OSS is filesystem-backed, so it returns `name`.
*
* For a human-readable label use {@link getAssetDisplayFilename}; for a
* serialized identifier (matching, validation) use {@link getAssetFilename}.
*
* TODO(BE-933/934): collapse to `asset.file_path ?? asset.name`.
*/
function getAssetStoredFilename(asset) {
	return asset.name;
}
/**
* Human-readable filename for UI labels.
* Fallback: user_metadata.filename → metadata.filename → display_name → asset.name.
* For serialized identifiers use {@link getAssetFilename}.
*/
function getAssetDisplayFilename(asset) {
	return getStringProperty(asset, "filename") ?? asset.display_name ?? asset.name;
}
/**
* Gets the title to render on an asset browser card / delete confirmation.
* Prefers a user-curated name (user_metadata.name / metadata.name) when it
* actually differs from asset.name, so a user-renamed model keeps its
* display name. Falls through to {@link getAssetDisplayFilename} when the
* curated name is absent or equal to asset.name (hash-keyed asset case).
*/
function getAssetCardTitle(asset) {
	const curatedName = getStringProperty(asset, "name");
	if (curatedName && curatedName !== asset.name) return curatedName;
	return getAssetDisplayFilename(asset);
}
/**
* Type guard: a pixel dimension is a finite positive integer. `metadata` is
* typed as `Record<string, unknown>`, so `typeof === 'number'` alone admits
* NaN, Infinity, 0, negatives, and fractional values.
*/
function isValidDimension(value) {
	return typeof value === "number" && Number.isInteger(value) && value > 0;
}
/**
* Returns the original image dimensions from `asset.metadata.{width,height}`
* when both pass shape validation, otherwise `undefined`. Callers should fall
* back to the locally-computed `<img>.naturalWidth/Height`, which is correct
* on runtimes that serve the original file but reports preview size on
* runtimes that serve a downscaled preview.
*/
function getAssetMetadataDimensions(asset) {
	const w = asset?.metadata?.width;
	const h = asset?.metadata?.height;
	if (isValidDimension(w) && isValidDimension(h)) return {
		width: w,
		height: h
	};
}
/**
* Resolves the image dimensions an asset card should display.
*
* Prefers the server-provided original dimensions from
* {@link getAssetMetadataDimensions}. Only when those are absent does it fall
* back to `renderedNaturalSize` — the natural size of the `<img>` the card
* actually rendered — and only when that rendered image was the original file.
*
* A distinct `thumbnail_url` (one that differs from `preview_url`) means the
* card rendered a downscaled preview, so `renderedNaturalSize` reflects the
* preview's dimensions rather than the asset's. In that case this returns
* `undefined` so the card shows no label rather than a wrong resolution.
* On OSS, `thumbnail_url` and `preview_url` are the same URL (full-res),
* so the guard correctly passes through `renderedNaturalSize`.
*/
function resolveDisplayImageDimensions(asset, renderedNaturalSize) {
	const fromMetadata = getAssetMetadataDimensions(asset);
	if (fromMetadata) return fromMetadata;
	if (asset?.thumbnail_url && asset.thumbnail_url !== asset.preview_url) return void 0;
	return renderedNaturalSize;
}
/**
* Returns the filename component the cloud `/api/view` endpoint resolves
* for this asset — `hash` when present (cloud assets are hash-keyed
* in storage), otherwise `asset.name`. Use this when constructing widget
* values or media URLs that must round-trip through the view endpoint.
*/
function getAssetUrlFilename(asset) {
	return asset.hash ?? asset.name;
}
//#endregion
//#region src/composables/useImageQuiet.ts
/**
* `useImage()` that handles load failures quietly.
*
* `useImage()` already surfaces failures via its returned `error` ref (callers
* render a fallback). By default vueuse ALSO forwards the error to
* `globalThis.reportError`, which our error monitoring (Datadog RUM) captures as
* an unhandled error for every broken image — 404'd thumbnails, expired share
* links, in-app browsers that re-fetch in a loop. Broken images are expected,
* not bugs, so handle the failure here instead of letting it surface globally.
* The returned `error` ref behaviour is unchanged.
*
* `asyncStateOptions` is forwarded to `useImage`, so callers can still tune the
* other `useAsyncState` fields; only `onError` is fixed to the quiet default.
*/
function useImageQuiet(options, asyncStateOptions) {
	return useImage(options, {
		...asyncStateOptions,
		onError: () => {}
	});
}
//#endregion
export { stripModelTypePrefix as C, resolveModelTypeTagUpdate as S, getEditableModelType as _, getAssetCategories as a, isModelTypeCovered as b, getAssetDisplayName as c, getAssetSourceUrl as d, getAssetStoredFilename as f, getAssetUserDescription as g, getAssetUrlFilename as h, getAssetCardTitle as i, getAssetFilename as l, getAssetTypeBadges as m, getAssetAdditionalTags as n, getAssetDescription as o, getAssetTriggerPhrases as p, getAssetBaseModels as r, getAssetDisplayFilename as s, useImageQuiet as t, getAssetNodeCategoryCandidates as u, getPrimaryCategoryTag as v, toModelTypeTag as w, resolveDisplayImageDimensions as x, getSourceName as y };
