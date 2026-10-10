import "./rolldown-runtime-xtsTai4I.js";
import { P as computed } from "./vendor-vue-core-C1utdb0s.js";
import { n as i18n } from "./i18n-C3J-ToPr.js";
import "./envUtil-2Z8ainL3.js";
//#region src/composables/useExternalLink.ts
/**
* Composable for building docs.comfy.org URLs with automatic locale and platform detection
*
* @example
* ```ts
* const { buildDocsUrl } = useExternalLink()
*
* // Simple usage
* const changelogUrl = buildDocsUrl('/changelog', { includeLocale: true })
* // => 'https://docs.comfy.org/zh/changelog' (if Chinese)
*
* // With platform detection
* const desktopUrl = buildDocsUrl('/installation/desktop', {
*   includeLocale: true,
*   platform: true
* })
* // => 'https://docs.comfy.org/zh/installation/desktop/macos' (if Chinese + macOS)
* ```
*/
function useExternalLink() {
	const locale = computed(() => i18n.global.locale.value);
	const isChinese = computed(() => {
		return locale.value === "zh" || locale.value === "zh-TW";
	});
	const platform = computed(() => {
		return null;
	});
	/**
	* Build a docs.comfy.org URL with optional locale and platform
	*
	* @param path - The path after the domain (e.g., '/installation/desktop')
	* @param options - Options for building the URL
	* @param options.includeLocale - Whether to include locale prefix (default: false)
	* @param options.platform - Whether to include platform suffix (default: false)
	* @returns The complete docs URL
	*
	* @example
	* ```ts
	* buildDocsUrl('/changelog') // => 'https://docs.comfy.org/changelog'
	* buildDocsUrl('/changelog', { includeLocale: true }) // => 'https://docs.comfy.org/zh/changelog' (if Chinese)
	* buildDocsUrl('/installation/desktop', { includeLocale: true, platform: true })
	* // => 'https://docs.comfy.org/zh/installation/desktop/macos' (if Chinese + macOS)
	* ```
	*/
	const buildDocsUrl = (path, options = {}) => {
		const { includeLocale = false, platform: includePlatform = false } = options;
		let url = "https://docs.comfy.org";
		if (includeLocale && isChinese.value) url += "/zh";
		const normalizedPath = path.startsWith("/") ? path : `/${path}`;
		url += normalizedPath;
		if (includePlatform && platform.value) {
			url = url.endsWith("/") ? url : `${url}/`;
			url += platform.value;
		}
		return url;
	};
	return {
		buildDocsUrl,
		staticUrls: {
			discord: "https://discord.com/invite/comfyorg",
			github: "https://github.com/Comfy-Org/ComfyUI",
			githubIssues: "https://github.com/Comfy-Org/ComfyUI/issues",
			githubFrontend: "https://github.com/Comfy-Org/ComfyUI_frontend",
			githubElectron: "https://github.com/Comfy-Org/electron",
			forum: "https://forum.comfy.org/",
			comfyOrg: "https://comfy.org/",
			status: "https://status.comfy.org/"
		},
		docsPaths: { partnerNodesPricing: "/tutorials/partner-nodes/pricing" }
	};
}
//#endregion
export { useExternalLink as t };
