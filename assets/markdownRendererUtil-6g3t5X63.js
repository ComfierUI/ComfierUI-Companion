import "./rolldown-runtime-xtsTai4I.js";
import { $ as mergeProps, G as defineComponent, P as computed, R as createElementBlock, lt as openBlock } from "./vendor-vue-core-C1utdb0s.js";
import { n as marked, r as purify, t as _Renderer } from "./vendor-markdown-CtxqRwKg.js";
//#region src/components/common/SanitizedHtml.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1 = ["innerHTML"];
var _hoisted_2 = ["innerHTML"];
//#endregion
//#region src/components/common/SanitizedHtml.vue
var SanitizedHtml_default = /* @__PURE__ */ defineComponent({
	inheritAttrs: false,
	__name: "SanitizedHtml",
	props: {
		html: {},
		as: { default: "div" }
	},
	setup(__props) {
		const purifier = purify(window);
		const sanitizedHtml = computed(() => purifier.sanitize(__props.html, {
			ADD_TAGS: ["video", "source"],
			ADD_ATTR: [
				"controls",
				"autoplay",
				"loop",
				"muted",
				"preload",
				"poster",
				"target",
				"rel"
			],
			FORBID_TAGS: [
				"form",
				"input",
				"button"
			],
			FORBID_ATTR: ["style"]
		}));
		return (_ctx, _cache) => {
			return __props.as === "span" ? (openBlock(), createElementBlock("span", mergeProps({ key: 0 }, _ctx.$attrs, { innerHTML: sanitizedHtml.value }), null, 16, _hoisted_1)) : (openBlock(), createElementBlock("div", mergeProps({ key: 1 }, _ctx.$attrs, { innerHTML: sanitizedHtml.value }), null, 16, _hoisted_2));
		};
	}
});
//#endregion
//#region src/utils/markdownRendererUtil.ts
var ALLOWED_TAGS = ["video", "source"];
var ALLOWED_ATTRS = [
	"controls",
	"autoplay",
	"loop",
	"muted",
	"preload",
	"poster"
];
function escapeHtml(value) {
	return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}
var MEDIA_SRC_REGEX = /(<(?:img|source|video)[^>]*\ssrc=['"])(?!(?:[/#?]|[a-z][a-z0-9+.-]*:))([^'"\s>]+)(['"])/gi;
var NON_REBASEABLE_HREF = /^(?:[/#?]|[a-z][a-z0-9+.-]*:)/i;
var COMFY_ORG_HOST = /(?:^|\.)comfy\.org$/;
function resolveMarkdownUrl(href, baseUrl) {
	if (!baseUrl) return href;
	if (!NON_REBASEABLE_HREF.test(href)) return `${baseUrl}/${href}`;
	try {
		const url = new URL(href);
		if (COMFY_ORG_HOST.test(url.hostname) && url.pathname.startsWith("/api/")) return `${baseUrl}${url.pathname.slice(4)}${url.search}${url.hash}`;
	} catch {
		return href;
	}
	return href;
}
function createMarkdownRenderer(baseUrl) {
	const normalizedBase = baseUrl ? baseUrl.replace(/\/+$/, "") : "";
	const renderer = new _Renderer();
	renderer.image = ({ href, title, text }) => {
		const src = resolveMarkdownUrl(href, normalizedBase);
		const titleAttr = title ? ` title="${escapeHtml(title)}"` : "";
		return `<img src="${escapeHtml(src)}" alt="${escapeHtml(text)}"${titleAttr} />`;
	};
	renderer.link = ({ href, title, tokens, text }) => {
		const target = resolveMarkdownUrl(href, normalizedBase);
		const linkText = text === href ? escapeHtml(target) : tokens ? renderer.parser.parseInline(tokens) : escapeHtml(text);
		const titleAttr = title ? ` title="${escapeHtml(title)}"` : "";
		return `<a href="${escapeHtml(target)}" ${titleAttr} target="_blank" rel="noopener noreferrer">${linkText}</a>`;
	};
	return renderer;
}
function renderMarkdownToHtml(markdown, baseUrl) {
	if (!markdown) return "";
	let html = marked.parse(markdown, {
		renderer: createMarkdownRenderer(baseUrl),
		gfm: true
	});
	if (baseUrl) html = html.replace(MEDIA_SRC_REGEX, `$1${baseUrl.replace(/\/+$/, "")}/$2$3`);
	return purify.sanitize(html, {
		ADD_TAGS: ALLOWED_TAGS,
		ADD_ATTR: [
			...ALLOWED_ATTRS,
			"target",
			"rel"
		]
	});
}
//#endregion
export { SanitizedHtml_default as n, renderMarkdownToHtml as t };
