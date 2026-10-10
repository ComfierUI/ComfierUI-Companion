import "./rolldown-runtime-xtsTai4I.js";
//#region src/utils/hdrFormatUtil.ts
var HDR_EXTENSIONS = [".exr", ".hdr"];
function isHdrImageFilename(filename) {
	if (!filename) return false;
	const lower = filename.toLowerCase();
	return HDR_EXTENSIONS.some((ext) => lower.endsWith(ext));
}
function getImageFilenameFromUrl(url) {
	if (!url) return void 0;
	try {
		const parsed = new URL(url, window.location.origin);
		return parsed.searchParams.get("filename") ?? parsed.pathname.split("/").pop() ?? void 0;
	} catch {
		return url.split("/").pop();
	}
}
function isHdrImageUrl(url) {
	if (!url) return false;
	return isHdrImageFilename(getImageFilenameFromUrl(url));
}
function toFullResolutionUrl(url) {
	try {
		const parsed = new URL(url, window.location.origin);
		parsed.searchParams.delete("preview");
		return url.startsWith("http") ? parsed.toString() : `${parsed.pathname}${parsed.search}`;
	} catch {
		return url;
	}
}
//#endregion
export { isHdrImageUrl as n, toFullResolutionUrl as r, getImageFilenameFromUrl as t };
