import "./rolldown-runtime-xtsTai4I.js";
import { Lr as useAssetsStore, ea as assetService, gi as getOutputAssetMetadata } from "./layoutStore-CZsuzg91.js";
import { i as api } from "./api-Bt-fGt5a.js";
import { t as useFeatureFlags } from "./useFeatureFlags-DAoj_aDd.js";
//#region src/platform/assets/utils/assetTypeUtil.ts
/**
* Extract asset type from an asset's tags array
* Falls back to a default type if tags are not present
*
* @param asset The asset to extract type from
* @param defaultType Default type to use if tags are empty (default: 'output')
* @returns The asset type ('input', 'output', 'temp', etc.)
*
* @example
* getAssetType(asset) // Returns 'output' or first tag
* getAssetType(asset, 'input') // Returns 'input' if no tags
*/
function getAssetType(asset, defaultType = "output") {
	return new URLSearchParams((asset.preview_url ?? "").split("?")[1] ?? "").get("type") || asset.tags[0] || defaultType;
}
//#endregion
//#region src/platform/assets/utils/assetUrlUtil.ts
/**
* Utilities for constructing asset URLs
*/
/**
* Get the download/view URL for an asset
* Constructs the proper URL with filename encoding, type, and subfolder parameters
*
* @param asset The asset to get URL for
* @param defaultType Default type if asset doesn't have tags (default: 'output')
* @returns Full URL for viewing/downloading the asset
*
* @example
* const url = getAssetUrl(asset)
* downloadFile(url, asset.name)
*/
function getAssetUrl(asset, defaultType = "output") {
	const assetType = getAssetType(asset, defaultType);
	const subfolder = getAssetSubfolder(asset);
	const params = new URLSearchParams();
	params.set("filename", asset.name);
	params.set("type", assetType);
	if (subfolder) params.set("subfolder", subfolder);
	return api.apiURL(`/view?${params}`);
}
/**
* Get the subfolder an asset lives in, relative to its type root
*
* Reads `preview_url` first and falls back to `user_metadata`, mirroring how
* {@link getAssetType} resolves the type.
*
* @param asset The asset to get the subfolder for
* @returns The subfolder, or an empty string when the asset is at the root
*/
function getAssetSubfolder(asset) {
	const previewSubfolder = new URLSearchParams((asset.preview_url ?? "").split("?")[1] ?? "").get("subfolder");
	if (previewSubfolder) return previewSubfolder;
	const { subfolder } = asset.user_metadata ?? {};
	return typeof subfolder === "string" ? subfolder : "";
}
/**
* Id of the assets-API asset holding this item's own file. A card grouped per
* job carries the job id as its `id` and keeps its own asset id in metadata.
*/
function getAssetContentId(asset) {
	return getOutputAssetMetadata(asset.user_metadata)?.assetId || asset.id;
}
/**
* URL of the asset's own file, for downloading or loading it whole.
*
* With the assets API enabled the file is served by id, so no path inference
* is needed and a preview that is only a thumbnail is never mistaken for the
* file. Otherwise the item came from the history API, whose `preview_url`
* already points at the file, with a `/view` URL as fallback.
*
* `disposition: 'inline'` asks the assets-API content endpoint to serve the
* file for in-page rendering (e.g. a `<video>` source) instead of its
* default `attachment` disposition, which browsers try to save rather than
* play. It has no effect on the history-backed fallback, whose `/view`
* endpoint has no such distinction.
*/
function getAssetFileUrl(asset, options) {
	if (useFeatureFlags().flags.assetsEnabled) {
		const query = options?.disposition ? `?disposition=${options.disposition}` : "";
		return api.apiURL(`/assets/${getAssetContentId(asset)}/content${query}`);
	}
	return asset.preview_url || getAssetUrl(asset);
}
//#endregion
//#region src/platform/assets/utils/assetPreviewUtil.ts
/**
* Whether the backend can serve asset preview/thumbnail data.
*/
function isAssetPreviewSupported() {
	return useFeatureFlags().flags.assetsEnabled;
}
async function fetchAssets(params) {
	const query = new URLSearchParams(params);
	const res = await api.fetchApi(`/assets?${query}`);
	if (!res.ok) return [];
	return (await res.json()).assets ?? [];
}
function resolvePreviewUrl(asset) {
	if (asset.preview_url) return api.apiURL(asset.preview_url);
	const contentId = asset.preview_id ?? getAssetContentId(asset);
	return api.apiURL(`/assets/${contentId}/content`);
}
/**
* Find an output asset record by content hash, falling back to name.
* On cloud, output filenames are content-hashed; use hash to match.
* On local, filenames are not hashed; use name_contains to match.
*/
async function findOutputAsset(name) {
	const hashMatch = (await fetchAssets({ hash: name })).find((a) => a.hash === name);
	if (hashMatch) return hashMatch;
	return (await fetchAssets({ name_contains: name })).find((a) => a.name === name);
}
async function findServerPreviewUrl(name) {
	try {
		const asset = await findOutputAsset(name);
		if (!asset?.preview_id) return null;
		return resolvePreviewUrl(asset);
	} catch {
		return null;
	}
}
async function persistThumbnail(name, blob) {
	try {
		const asset = await findOutputAsset(name);
		if (!asset || asset.preview_id) return;
		const previewFilename = `${asset.name}_preview.png`;
		const uploaded = await assetService.uploadAssetFromBase64({
			data: await blobToDataUrl(blob),
			name: previewFilename,
			tags: ["output"],
			user_metadata: { filename: previewFilename }
		});
		await assetService.updateAsset(asset.id, { preview_id: uploaded.id });
		await useAssetsStore().outputAssets.invalidate();
	} catch {}
}
function blobToDataUrl(blob) {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = () => resolve(reader.result);
		reader.onerror = reject;
		reader.readAsDataURL(blob);
	});
}
//#endregion
export { getAssetFileUrl as a, getAssetType as c, resolvePreviewUrl as i, isAssetPreviewSupported as n, getAssetSubfolder as o, persistThumbnail as r, getAssetUrl as s, findServerPreviewUrl as t };
