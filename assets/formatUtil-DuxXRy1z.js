import "./rolldown-runtime-xtsTai4I.js";
//#region packages/shared-frontend-utils/src/formatUtil.ts
var JSON_SUFFIX = "json";
var APP_JSON_SUFFIX = `app.${JSON_SUFFIX}`;
var JSON_EXT = `.${JSON_SUFFIX}`;
var APP_JSON_EXT = `.${APP_JSON_SUFFIX}`;
function appendJsonExt(path) {
	if (!path.toLowerCase().endsWith(JSON_EXT)) path += JSON_EXT;
	return path;
}
function getWorkflowSuffix(suffix) {
	return suffix === APP_JSON_SUFFIX ? APP_JSON_SUFFIX : JSON_SUFFIX;
}
function appendWorkflowJsonExt(path, isApp) {
	return ensureWorkflowSuffix(path, isApp ? APP_JSON_SUFFIX : JSON_SUFFIX);
}
function ensureWorkflowSuffix(name, suffix) {
	const lower = name.toLowerCase();
	if (lower.endsWith(APP_JSON_EXT)) name = name.slice(0, -APP_JSON_EXT.length);
	else if (lower.endsWith(JSON_EXT)) name = name.slice(0, -JSON_EXT.length);
	return name + "." + suffix;
}
function highlightQuery(text, query) {
	if (!query) return [{
		text,
		highlighted: false
	}];
	const pattern = Array.from(query).map((ch) => ch.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("[ ]?");
	const regex = new RegExp(pattern, "gi");
	const parts = [];
	let lastIndex = 0;
	for (const match of text.matchAll(regex)) {
		if (match.index > lastIndex) parts.push({
			text: text.slice(lastIndex, match.index),
			highlighted: false
		});
		parts.push({
			text: match[0],
			highlighted: true
		});
		lastIndex = match.index + match[0].length;
	}
	if (lastIndex < text.length || parts.length === 0) parts.push({
		text: text.slice(lastIndex),
		highlighted: false
	});
	return parts;
}
function formatNumberWithSuffix(num, { precision = 1, roundToInt = false } = {}) {
	const suffixes = [
		"",
		"k",
		"m",
		"b",
		"t"
	];
	const absNum = Math.abs(num);
	if (absNum < 1e3) return roundToInt ? Math.round(num).toString() : num.toFixed(precision);
	const exp = Math.min(Math.floor(Math.log10(absNum) / 3), suffixes.length - 1);
	return `${(num / Math.pow(1e3, exp)).toFixed(precision)}${suffixes[exp]}`;
}
function formatSize(value) {
	if (value === null || value === void 0) return "-";
	const bytes = value;
	if (bytes === 0) return "0 B";
	const k = 1024;
	const sizes = [
		"B",
		"KB",
		"MB",
		"GB"
	];
	const i = Math.floor(Math.log(bytes) / Math.log(k));
	return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}
/**
* Formats a commit hash by truncating long (40-char) hashes to 7 chars.
* Returns the original string if not a valid full commit hash.
*/
function formatCommitHash(value) {
	if (/^[a-f0-9]{40}$/i.test(value)) return value.slice(0, 7);
	return value;
}
/**
* Returns various filename components.
* Recognises compound extensions like `.app.json`.
* Example:
* - fullFilename: 'file.txt'       → { filename: 'file',  suffix: 'txt' }
* - fullFilename: 'file.app.json'  → { filename: 'file',  suffix: 'app.json' }
*/
function getFilenameDetails(fullFilename) {
	if (fullFilename.toLowerCase().endsWith(APP_JSON_EXT) && fullFilename.length > APP_JSON_EXT.length) return {
		filename: fullFilename.slice(0, -APP_JSON_EXT.length),
		suffix: APP_JSON_SUFFIX
	};
	const dotIndex = fullFilename.lastIndexOf(".");
	if (dotIndex <= 0) return {
		filename: fullFilename,
		suffix: null
	};
	return {
		filename: fullFilename.slice(0, dotIndex),
		suffix: fullFilename.slice(dotIndex + 1)
	};
}
/**
* Returns various path components.
* Example:
* - path: 'dir/file.txt'
* - directory: 'dir'
* - fullFilename: 'file.txt'
* - filename: 'file'
* - suffix: 'txt'
*/
function getPathDetails(path) {
	const directory = path.split("/").slice(0, -1).join("/");
	const fullFilename = path.split("/").pop() ?? path;
	return {
		directory,
		fullFilename,
		...getFilenameDetails(fullFilename)
	};
}
/**
* Normalizes a string to be used as an i18n key.
* Replaces dots with underscores.
*/
function normalizeI18nKey(key) {
	return typeof key === "string" ? key.replace(/\./g, "_") : "";
}
/**
* Takes a dynamic prompt in the format {opt1|opt2|{optA|optB}|} and randomly replaces groups. Supports C style comments.
* @param input The dynamic prompt to process
* @returns
*/
function processDynamicPrompt(input) {
	function stripComments(str) {
		return str.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, "");
	}
	let i = 0;
	let result = "";
	input = stripComments(input);
	const handleEscape = () => {
		return "\\" + input[i++];
	};
	function parseChoiceBlock() {
		const options = [];
		let choice = "";
		let depth = 0;
		while (i < input.length) {
			const char = input[i++];
			if (char === "\\") {
				choice += handleEscape();
				continue;
			} else if (char === "{") depth++;
			else if (char === "}") {
				if (!depth) break;
				depth--;
			} else if (char === "|") {
				if (!depth) {
					options.push(choice);
					choice = "";
					continue;
				}
			}
			choice += char;
		}
		options.push(choice);
		const chosenOption = options[Math.floor(Math.random() * options.length)];
		return processDynamicPrompt(chosenOption);
	}
	while (i < input.length) {
		const char = input[i++];
		if (char === "\\") result += handleEscape();
		else if (char === "{") result += parseChoiceBlock();
		else result += char;
	}
	return result.replace(/\\([{}|])/g, "$1");
}
function isValidUrl(url) {
	try {
		new URL(url);
		return true;
	} catch {
		return false;
	}
}
function normalizeFilePathSeparators(filepath) {
	return filepath.replace(/[\\/]+/g, "/");
}
/**
* Parses a filepath into its filename and subfolder components.
*
* @example
* parseFilePath('folder/file.txt')    // → { filename: 'file.txt', subfolder: 'folder' }
* parseFilePath('/folder/file.txt')   // → { filename: 'file.txt', subfolder: 'folder' }
* parseFilePath('file.txt')           // → { filename: 'file.txt', subfolder: '' }
* parseFilePath('folder//file.txt')   // → { filename: 'file.txt', subfolder: 'folder' }
*
* @param filepath The filepath to parse
* @returns Object containing filename and subfolder
*/
function parseFilePath(filepath) {
	if (!filepath.trim()) return {
		filename: "",
		subfolder: ""
	};
	const normalizedPath = normalizeFilePathSeparators(filepath).replace(/^\//, "").replace(/\/$/, "");
	const lastSlashIndex = normalizedPath.lastIndexOf("/");
	if (lastSlashIndex === -1) return {
		filename: normalizedPath,
		subfolder: ""
	};
	return {
		filename: normalizedPath.slice(lastSlashIndex + 1),
		subfolder: normalizedPath.slice(0, lastSlashIndex)
	};
}
var parts = {
	d: (d) => d.getDate(),
	M: (d) => d.getMonth() + 1,
	h: (d) => d.getHours(),
	m: (d) => d.getMinutes(),
	s: (d) => d.getSeconds()
};
var format = Object.keys(parts).map((k) => k + k + "?").join("|") + "|yyy?y?";
function formatDate(text, date) {
	return text.replace(new RegExp(format, "g"), (text) => {
		if (text === "yy") return (date.getFullYear() + "").substring(2);
		if (text === "yyyy") return date.getFullYear().toString();
		if (text[0] in parts) return (parts[text[0]](date) + "").padStart(text.length, "0");
		return text;
	});
}
/**
* Generate a cache key from parameters
* Sorts the parameters to ensure consistent keys regardless of parameter order
*/
var paramsToCacheKey = (params) => {
	if (typeof params === "string") return params;
	if (typeof params === "object" && params !== null) return Object.keys(params).sort((a, b) => a.localeCompare(b)).map((key) => `${key}:${params[key]}`).join("&");
	return String(params);
};
var UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
/** Accepts canonical UUIDs of any version or variant for legacy compatibility. */
var isValidUuid = (value) => typeof value === "string" && UUID_PATTERN.test(value);
/**
* Generates a RFC4122 compliant UUID v4 using the native crypto API when available
* @returns A properly formatted UUID string
*/
var generateUUID = () => {
	if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") return crypto.randomUUID();
	return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
		const r = Math.random() * 16 | 0;
		return (c === "x" ? r : r & 3 | 8).toString(16);
	});
};
var isCivitaiHost = (hostname) => hostname === "civitai.com" || hostname.endsWith(".civitai.com") || hostname === "civitai.red" || hostname.endsWith(".civitai.red");
/**
* Checks if a URL belongs to any Civitai domain (civitai.com or civitai.red).
* Use this for source-name detection; use `isCivitaiModelUrl` when the URL
* must also match a specific model API path format.
*/
var isCivitaiUrl = (url) => {
	if (!isValidUrl(url)) return false;
	return isCivitaiHost(new URL(url).hostname.toLowerCase());
};
/**
* Checks if a URL is a Civitai model URL
* @example
* isCivitaiModelUrl('https://civitai.com/api/download/models/1234567890') // true
* isCivitaiModelUrl('https://civitai.com/api/v1/models/1234567890') // true
* isCivitaiModelUrl('https://civitai.com/api/v1/models-versions/15342') // true
* isCivitaiModelUrl('https://example.com/model.safetensors') // false
*/
var isCivitaiModelUrl = (url) => {
	if (!isValidUrl(url)) return false;
	const urlObj = new URL(url);
	if (!isCivitaiHost(urlObj.hostname.toLowerCase())) return false;
	const pathname = urlObj.pathname;
	return /^\/api\/download\/models\/(\d+)$/.test(pathname) || /^\/api\/v1\/models\/(\d+)$/.test(pathname) || /^\/api\/v1\/models-versions\/(\d+)$/.test(pathname);
};
/**
* Converts a Hugging Face download URL to a repository page URL
* @param url The download URL to convert
* @returns The repository page URL or the Hugging Face root if conversion fails
* @example
* downloadUrlToHfRepoUrl(
*  'https://huggingface.co/bfl/FLUX.1/resolve/main/flux1-canny-dev.safetensors?download=true'
* ) // https://huggingface.co/bfl/FLUX.1
*/
var downloadUrlToHfRepoUrl = (url) => {
	try {
		const pathname = new URL(url).pathname;
		return `https://huggingface.co/${/^(.*?)(?:\/resolve\/|\/blob\/|$)/.exec(pathname)?.[1]?.replace(/^\//, "") || ""}`;
	} catch {
		return "https://huggingface.co/";
	}
};
/**
* Converts a USD amount to microdollars (1/1,000,000 of a dollar).
* This conversion is commonly used in financial systems to avoid floating-point precision issues
* by representing monetary values as integers.
*
* @param usd - The amount in US dollars to convert
* @returns The amount in microdollars (multiplied by 1,000,000)
* @example
* usdToMicros(1.23) // returns 1230000
*/
function usdToMicros(usd) {
	return Math.round(usd * 1e6);
}
/**
* Converts URLs in a string to HTML links.
* @param text - The string to convert
* @returns The string with URLs converted to HTML links
* @example
* linkifyHtml('Visit https://example.com for more info') // returns 'Visit <a href="https://example.com" target="_blank" rel="noopener noreferrer" class="text-primary-400 hover:underline">https://example.com</a> for more info'
*/
function linkifyHtml(text) {
	if (!text) return "";
	return text.replace(/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%?=~_|])|(\bwww\.[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%?=~_|])/gi, (_match, p1, _p2, p3) => {
		const url = p1 || p3;
		return `<a href="${p3 ? `http://${url}` : url}" target="_blank" rel="noopener noreferrer" class="text-primary-400 hover:underline">${url}</a>`;
	});
}
/**
* Converts newline characters to HTML <br> tags.
* @param text - The string to convert
* @returns The string with newline characters converted to <br> tags
* @example
* nl2br('Hello\nWorld') // returns 'Hello<br />World'
*/
function nl2br(text) {
	if (!text) return "";
	return text.replace(/\n/g, "<br />");
}
/**
* Converts a version string to an anchor-safe format by replacing dots with dashes.
* @param version The version string (e.g., "1.0.0", "2.1.3-beta.1")
* @returns The anchor-safe version string (e.g., "v1-0-0", "v2-1-3-beta-1")
* @example
* formatVersionAnchor("1.0.0") // returns "v1-0-0"
* formatVersionAnchor("2.1.3-beta.1") // returns "v2-1-3-beta-1"
*/
function formatVersionAnchor(version) {
	return `v${version.replace(/\./g, "-")}`;
}
/**
* Converts a string to a valid locale type with 'en' as default
* @param locale - The locale string to validate and convert
* @returns A valid SupportedLocale type, defaults to 'en' if invalid
* @example
* stringToLocale('fr') // returns 'fr'
* stringToLocale('invalid') // returns 'en'
* stringToLocale('') // returns 'en'
*/
function stringToLocale(locale) {
	return [
		"en",
		"es",
		"fr",
		"ja",
		"ko",
		"ru",
		"zh"
	].includes(locale) ? locale : "en";
}
function formatDuration(milliseconds) {
	if (!milliseconds || milliseconds < 0) return "0s";
	const totalSeconds = Math.floor(milliseconds / 1e3);
	const hours = Math.floor(totalSeconds / 3600);
	const minutes = Math.floor(totalSeconds % 3600 / 60);
	const remainingSeconds = Math.floor(totalSeconds % 60);
	const parts = [];
	if (hours > 0) parts.push(`${hours}h`);
	if (minutes > 0) parts.push(`${minutes}m`);
	if (remainingSeconds > 0 || parts.length === 0) parts.push(`${remainingSeconds}s`);
	return parts.join(" ");
}
var IMAGE_EXTENSIONS = [
	"png",
	"jpg",
	"jpeg",
	"gif",
	"webp",
	"bmp",
	"avif",
	"tif",
	"tiff",
	"svg"
];
var VIDEO_EXTENSIONS = [
	"mp4",
	"m4v",
	"webm",
	"mov",
	"avi",
	"mkv"
];
var AUDIO_EXTENSIONS = [
	"mp3",
	"wav",
	"ogg",
	"flac",
	"opus",
	"m4a"
];
var THREE_D_EXTENSIONS = [
	"obj",
	"fbx",
	"gltf",
	"glb",
	"stl",
	"usdz",
	"ply",
	"spz",
	"splat",
	"ksplat"
];
var TEXT_EXTENSIONS = [
	"txt",
	"md",
	"markdown",
	"json",
	"csv",
	"yaml",
	"yml",
	"xml",
	"log"
];
/**
* Truncates a filename while preserving the extension
* @param filename The filename to truncate
* @param maxLength Maximum length for the filename without extension
* @returns Truncated filename with extension preserved
*/
function truncateFilename(filename, maxLength = 20) {
	if (!filename || filename.length <= maxLength) return filename;
	const lastDotIndex = filename.lastIndexOf(".");
	const nameWithoutExt = lastDotIndex > -1 ? filename.substring(0, lastDotIndex) : filename;
	const extension = lastDotIndex > -1 ? filename.substring(lastDotIndex) : "";
	if (nameWithoutExt.length <= maxLength) return filename;
	const halfLength = Math.floor((maxLength - 3) / 2);
	return `${nameWithoutExt.substring(0, halfLength)}...${nameWithoutExt.substring(nameWithoutExt.length - halfLength)}${extension}`;
}
/**
* Determines the media type from a filename's extension (singular form)
* @param filename The filename to analyze
* @returns The media type: 'image', 'video', 'audio', '3D', 'text', or 'other'
*/
function getMediaTypeFromFilename(filename) {
	if (!filename) return "other";
	const ext = filename.split(".").pop()?.toLowerCase();
	if (!ext) return "other";
	if (IMAGE_EXTENSIONS.includes(ext)) return "image";
	if (VIDEO_EXTENSIONS.includes(ext)) return "video";
	if (AUDIO_EXTENSIONS.includes(ext)) return "audio";
	if (THREE_D_EXTENSIONS.includes(ext)) return "3D";
	if (TEXT_EXTENSIONS.includes(ext)) return "text";
	return "other";
}
function isPreviewableMediaType(mediaType) {
	return mediaType !== "other";
}
function formatTime(seconds) {
	if (isNaN(seconds) || seconds === 0) return "0:00";
	return `${Math.floor(seconds / 60)}:${Math.floor(seconds % 60).toString().padStart(2, "0")}`;
}
//#endregion
export { truncateFilename as A, linkifyHtml as C, parseFilePath as D, paramsToCacheKey as E, processDynamicPrompt as O, isValidUuid as S, normalizeI18nKey as T, highlightQuery as _, formatCommitHash as a, isPreviewableMediaType as b, formatNumberWithSuffix as c, formatVersionAnchor as d, generateUUID as f, getWorkflowSuffix as g, getPathDetails as h, ensureWorkflowSuffix as i, usdToMicros as j, stringToLocale as k, formatSize as l, getMediaTypeFromFilename as m, appendWorkflowJsonExt as n, formatDate as o, getFilenameDetails as p, downloadUrlToHfRepoUrl as r, formatDuration as s, appendJsonExt as t, formatTime as u, isCivitaiModelUrl as v, nl2br as w, isValidUrl as x, isCivitaiUrl as y };
