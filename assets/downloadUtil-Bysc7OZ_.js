import "./rolldown-runtime-xtsTai4I.js";
import "./toastStore-CTfykAzG.js";
import "./i18n-C3J-ToPr.js";
//#region src/base/common/downloadUtil.ts
/**
* Utility functions for downloading files
*/
var DEFAULT_DOWNLOAD_FILENAME = "download.png";
/**
* Trigger a download by creating a temporary anchor element
* @param href - The URL or blob URL to download
* @param filename - The filename to suggest to the browser
*/
function triggerLinkDownload(href, filename) {
	const link = document.createElement("a");
	link.href = href;
	link.download = filename;
	link.style.display = "none";
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
}
/**
* Download a file from a URL by creating a temporary anchor element
* @param url - The URL of the file to download (must be a valid URL string)
* @param filename - Optional filename override (will use URL filename or default if not provided)
* @throws {Error} If the URL is invalid or empty
*/
function downloadFile(url, filename) {
	if (!url || typeof url !== "string" || url.trim().length === 0) throw new Error("Invalid URL provided for download");
	triggerLinkDownload(url, filename || extractFilenameFromUrl(url) || DEFAULT_DOWNLOAD_FILENAME);
}
/**
* Download a Blob by creating a temporary object URL and anchor element
* @param filename - The filename to suggest to the browser
* @param blob - The Blob to download
*/
function downloadBlob(filename, blob) {
	const url = URL.createObjectURL(blob);
	triggerLinkDownload(url, filename);
	queueMicrotask(() => URL.revokeObjectURL(url));
}
/**
* Extract filename from a URL's query parameters
* @param url - The URL to extract filename from
* @returns The extracted filename or null if not found
*/
var extractFilenameFromUrl = (url) => {
	try {
		return new URL(url, window.location.origin).searchParams.get("filename");
	} catch {
		return null;
	}
};
/**
* Extract filename from Content-Disposition header
* Handles both simple format: attachment; filename="name.png"
* And RFC 5987 format: attachment; filename="fallback.png"; filename*=UTF-8''encoded%20name.png
* @param header - The Content-Disposition header value
* @returns The extracted filename or null if not found
*/
function extractFilenameFromContentDisposition(header) {
	if (!header) return null;
	const extendedMatch = header.match(/filename\*=UTF-8''([^;]+)/i);
	if (extendedMatch?.[1]) try {
		return decodeURIComponent(extendedMatch[1]);
	} catch {}
	const quotedMatch = header.match(/filename="([^"]+)"/i);
	if (quotedMatch?.[1]) return quotedMatch[1];
	const unquotedMatch = header.match(/filename=([^;\s]+)/i);
	if (unquotedMatch?.[1]) return unquotedMatch[1];
	return null;
}
/**
* Fetch a URL and return its body as a Blob.
* Shared by download and open-in-new-tab cloud paths.
*/
async function fetchAsBlob(url, fetchFile = fetch) {
	const response = await fetchFile(url);
	if (!response.ok) throw new Error(`Failed to fetch ${url}: ${response.status}`);
	return response;
}
async function downloadFileAsBlob(url, { filename, fetch: fetchFile = fetch, preferResponseFilename = true } = {}) {
	const fallbackFilename = filename || extractFilenameFromUrl(url) || DEFAULT_DOWNLOAD_FILENAME;
	const response = await fetchAsBlob(url, fetchFile);
	const headerFilename = extractFilenameFromContentDisposition(response.headers.get("Content-Disposition"));
	const blob = await response.blob();
	downloadBlob(preferResponseFilename ? headerFilename ?? fallbackFilename : fallbackFilename, blob);
}
async function openFileInNewTab(url) {
	window.open(url, "_blank");
}
//#endregion
export { openFileInNewTab as i, downloadFile as n, downloadFileAsBlob as r, downloadBlob as t };
