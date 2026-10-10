const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./commands-BKM2JMiB.js","./commands-BcZ6fU3-.js","./main-BdtsW4JZ.js","./main-BfqkkuXX.js","./nodeDefs-BzVHDY46.js","./nodeDefs-CFOSmIZi.js","./settings-txGPNuyF.js","./settings-B3DInspu.js"])))=>i.map(i=>d[i]);
import "./rolldown-runtime-xtsTai4I.js";
import { a as __vitePreload } from "./vendor-datadog-DudeEV66.js";
import { n as createI18n } from "./vendor-i18n-BZvE7WBQ.js";
import { T as normalizeI18nKey } from "./formatUtil-DuxXRy1z.js";
import { Jt as commands_default } from "./commands-BcZ6fU3-.js";
import { Pt as main_default } from "./main-BfqkkuXX.js";
import { J_ as nodeDefs_default } from "./nodeDefs-CFOSmIZi.js";
import { tn as settings_default } from "./settings-B3DInspu.js";
//#region src/locales/localeConfig.ts
var localeFiles = /* #__PURE__ */ Object.assign({
	"./ar/commands.json": () => __vitePreload(() => import("./commands-CVvByAfp.js"), [], import.meta.url),
	"./ar/main.json": () => __vitePreload(() => import("./main-C9UV3gQZ.js"), [], import.meta.url),
	"./ar/nodeDefs.json": () => __vitePreload(() => import("./nodeDefs-BtmxLAJz.js"), [], import.meta.url),
	"./ar/settings.json": () => __vitePreload(() => import("./settings-Dbz-bBUX.js"), [], import.meta.url),
	"./de/commands.json": () => __vitePreload(() => import("./commands-DjDU0hFL.js"), [], import.meta.url),
	"./de/main.json": () => __vitePreload(() => import("./main-h6u6oTmj.js"), [], import.meta.url),
	"./de/nodeDefs.json": () => __vitePreload(() => import("./nodeDefs-6jm0uB8T.js"), [], import.meta.url),
	"./de/settings.json": () => __vitePreload(() => import("./settings-D_3hr43g.js"), [], import.meta.url),
	"./en/commands.json": () => __vitePreload(() => import("./commands-BKM2JMiB.js"), __vite__mapDeps([0,1]), import.meta.url),
	"./en/main.json": () => __vitePreload(() => import("./main-BdtsW4JZ.js"), __vite__mapDeps([2,3]), import.meta.url),
	"./en/nodeDefs.json": () => __vitePreload(() => import("./nodeDefs-BzVHDY46.js"), __vite__mapDeps([4,5]), import.meta.url),
	"./en/settings.json": () => __vitePreload(() => import("./settings-txGPNuyF.js"), __vite__mapDeps([6,7]), import.meta.url),
	"./es/commands.json": () => __vitePreload(() => import("./commands-DXe5jfCD.js"), [], import.meta.url),
	"./es/main.json": () => __vitePreload(() => import("./main-CjCGKjyu.js"), [], import.meta.url),
	"./es/nodeDefs.json": () => __vitePreload(() => import("./nodeDefs-0qMo2502.js"), [], import.meta.url),
	"./es/settings.json": () => __vitePreload(() => import("./settings-ainOvW6z.js"), [], import.meta.url),
	"./fa/commands.json": () => __vitePreload(() => import("./commands-t8l_54tX.js"), [], import.meta.url),
	"./fa/main.json": () => __vitePreload(() => import("./main-UCrlgmg2.js"), [], import.meta.url),
	"./fa/nodeDefs.json": () => __vitePreload(() => import("./nodeDefs-BuMbcoV1.js"), [], import.meta.url),
	"./fa/settings.json": () => __vitePreload(() => import("./settings-Dq0pP__j.js"), [], import.meta.url),
	"./fr/commands.json": () => __vitePreload(() => import("./commands-DWfnRxrG.js"), [], import.meta.url),
	"./fr/main.json": () => __vitePreload(() => import("./main-BfCDSHoY.js"), [], import.meta.url),
	"./fr/nodeDefs.json": () => __vitePreload(() => import("./nodeDefs-V4hgLFSv.js"), [], import.meta.url),
	"./fr/settings.json": () => __vitePreload(() => import("./settings-u7OB8UNl.js"), [], import.meta.url),
	"./he/commands.json": () => __vitePreload(() => import("./commands-Bkf6EL0J.js"), [], import.meta.url),
	"./he/main.json": () => __vitePreload(() => import("./main-BzeyZgf4.js"), [], import.meta.url),
	"./he/nodeDefs.json": () => __vitePreload(() => import("./nodeDefs-BlHN1kXc.js"), [], import.meta.url),
	"./he/settings.json": () => __vitePreload(() => import("./settings-DyBVNnrE.js"), [], import.meta.url),
	"./it/commands.json": () => __vitePreload(() => import("./commands-y31RvZ1Z.js"), [], import.meta.url),
	"./it/main.json": () => __vitePreload(() => import("./main-ClO2683Y.js"), [], import.meta.url),
	"./it/nodeDefs.json": () => __vitePreload(() => import("./nodeDefs-zzvWEE3i.js"), [], import.meta.url),
	"./it/settings.json": () => __vitePreload(() => import("./settings-JgK5XUa2.js"), [], import.meta.url),
	"./ja/commands.json": () => __vitePreload(() => import("./commands-zafpQ36L.js"), [], import.meta.url),
	"./ja/main.json": () => __vitePreload(() => import("./main-pE_2Aa4O.js"), [], import.meta.url),
	"./ja/nodeDefs.json": () => __vitePreload(() => import("./nodeDefs-CINJ2MZ2.js"), [], import.meta.url),
	"./ja/settings.json": () => __vitePreload(() => import("./settings-0FPOtj4C.js"), [], import.meta.url),
	"./ko/commands.json": () => __vitePreload(() => import("./commands-CB_YextC.js"), [], import.meta.url),
	"./ko/main.json": () => __vitePreload(() => import("./main-Bcd4xfi6.js"), [], import.meta.url),
	"./ko/nodeDefs.json": () => __vitePreload(() => import("./nodeDefs-OTZDsWdC.js"), [], import.meta.url),
	"./ko/settings.json": () => __vitePreload(() => import("./settings-C1xJuKQy.js"), [], import.meta.url),
	"./pt-BR/commands.json": () => __vitePreload(() => import("./commands-BFcm8MXR.js"), [], import.meta.url),
	"./pt-BR/main.json": () => __vitePreload(() => import("./main-gXTS8b8J.js"), [], import.meta.url),
	"./pt-BR/nodeDefs.json": () => __vitePreload(() => import("./nodeDefs-g_cu2SLK.js"), [], import.meta.url),
	"./pt-BR/settings.json": () => __vitePreload(() => import("./settings-CoSYp8zX.js"), [], import.meta.url),
	"./ru/commands.json": () => __vitePreload(() => import("./commands-8avx_NhK.js"), [], import.meta.url),
	"./ru/main.json": () => __vitePreload(() => import("./main-CF9zmRnS.js"), [], import.meta.url),
	"./ru/nodeDefs.json": () => __vitePreload(() => import("./nodeDefs-a7BbPIQf.js"), [], import.meta.url),
	"./ru/settings.json": () => __vitePreload(() => import("./settings-Dei94DCk.js"), [], import.meta.url),
	"./tr/commands.json": () => __vitePreload(() => import("./commands-BYM7MMGA.js"), [], import.meta.url),
	"./tr/main.json": () => __vitePreload(() => import("./main-BwcJqX4x.js"), [], import.meta.url),
	"./tr/nodeDefs.json": () => __vitePreload(() => import("./nodeDefs-Do4Vuijb.js"), [], import.meta.url),
	"./tr/settings.json": () => __vitePreload(() => import("./settings-C69vjPar.js"), [], import.meta.url),
	"./zh/commands.json": () => __vitePreload(() => import("./commands-DQJCxSvZ.js"), [], import.meta.url),
	"./zh/main.json": () => __vitePreload(() => import("./main-D5jolqI-.js"), [], import.meta.url),
	"./zh/nodeDefs.json": () => __vitePreload(() => import("./nodeDefs-De5CjRnc.js"), [], import.meta.url),
	"./zh/settings.json": () => __vitePreload(() => import("./settings-oj4R-OiR.js"), [], import.meta.url),
	"./zh-TW/commands.json": () => __vitePreload(() => import("./commands-CymZTaCq.js"), [], import.meta.url),
	"./zh-TW/main.json": () => __vitePreload(() => import("./main-DHEt4PeF.js"), [], import.meta.url),
	"./zh-TW/nodeDefs.json": () => __vitePreload(() => import("./nodeDefs-CKMyu8cr.js"), [], import.meta.url),
	"./zh-TW/settings.json": () => __vitePreload(() => import("./settings-BX0B4OgA.js"), [], import.meta.url)
});
function loadersFor(locale) {
	return {
		main: localeFiles[`./${locale}/main.json`],
		nodeDefs: localeFiles[`./${locale}/nodeDefs.json`],
		commands: localeFiles[`./${locale}/commands.json`],
		settings: localeFiles[`./${locale}/settings.json`]
	};
}
var localeDefinitions = {
	en: {
		text: "English",
		loaders: null
	},
	zh: {
		text: "中文",
		loaders: loadersFor("zh")
	},
	"zh-TW": {
		text: "繁體中文",
		loaders: loadersFor("zh-TW")
	},
	ru: {
		text: "Русский",
		loaders: loadersFor("ru")
	},
	ja: {
		text: "日本語",
		loaders: loadersFor("ja")
	},
	ko: {
		text: "한국어",
		loaders: loadersFor("ko")
	},
	fr: {
		text: "Français",
		loaders: loadersFor("fr")
	},
	es: {
		text: "Español",
		loaders: loadersFor("es")
	},
	ar: {
		text: "عربي",
		loaders: loadersFor("ar")
	},
	tr: {
		text: "Türkçe",
		loaders: loadersFor("tr")
	},
	"pt-BR": {
		text: "Português (BR)",
		loaders: loadersFor("pt-BR")
	},
	fa: {
		text: "فارسی",
		loaders: loadersFor("fa")
	},
	he: {
		text: "עברית",
		loaders: loadersFor("he")
	},
	it: {
		text: "Italiano",
		loaders: loadersFor("it")
	}
};
var SUPPORTED_LOCALES = Object.keys(localeDefinitions);
var SUPPORTED_LOCALE_OPTIONS = SUPPORTED_LOCALES.map((value) => ({
	value,
	text: localeDefinitions[value].text
}));
var supportedLocaleByLower = new Map(SUPPORTED_LOCALES.map((locale) => [locale.toLowerCase(), locale]));
function matchSingle(candidate) {
	const normalized = candidate.toLowerCase();
	return supportedLocaleByLower.get(normalized) ?? supportedLocaleByLower.get(normalized.split("-")[0]);
}
function resolveSupportedLocale(input) {
	const candidates = Array.isArray(input) ? input : input ? [input] : [];
	for (const candidate of candidates) {
		if (!candidate) continue;
		const matched = matchSingle(candidate);
		if (matched) return matched;
	}
	return "en";
}
function getDefaultLocale() {
	return resolveSupportedLocale(navigator.languages);
}
//#endregion
//#region src/i18n.ts
function buildLocale(main, nodes, commands, settings) {
	return {
		...main,
		nodeDefs: nodes,
		commands,
		settings
	};
}
var loadedLocales = /* @__PURE__ */ new Set(["en"]);
var loadingLocales = /* @__PURE__ */ new Map();
var customNodesI18nData = {};
/**
* Dynamically load a shipped locale's bundles (nodeDefs, commands, settings).
* Callers must pre-resolve untrusted input via `resolveSupportedLocale` or
* `setActiveLocale`, which is the boundary helper for arbitrary input.
*/
async function loadLocale(locale) {
	if (loadedLocales.has(locale)) return;
	const existingLoad = loadingLocales.get(locale);
	if (existingLoad) {
		await existingLoad;
		return;
	}
	const loaders = localeDefinitions[locale].loaders;
	if (!loaders) return;
	const loadPromise = (async () => {
		try {
			const [main, nodes, commands, settings] = await Promise.all([
				loaders.main(),
				loaders.nodeDefs(),
				loaders.commands(),
				loaders.settings()
			]);
			const messages = buildLocale(main.default, nodes.default, commands.default, settings.default);
			i18n.global.setLocaleMessage(locale, messages);
			loadedLocales.add(locale);
			if (customNodesI18nData[locale]) i18n.global.mergeLocaleMessage(locale, customNodesI18nData[locale]);
		} catch (error) {
			console.error(`Failed to load locale "${locale}":`, error);
			throw error;
		} finally {
			loadingLocales.delete(locale);
		}
	})();
	loadingLocales.set(locale, loadPromise);
	await loadPromise;
}
/**
* Boundary helper for arbitrary locale input (settings, browser preferences):
* resolves to a shipped tag, loads it, and updates the active locale.
*
* Returns the resolved tag so callers can detect a clamp (e.g. a stale stored
* `Comfy.Locale` from an older build) and self-heal persisted state.
*/
async function setActiveLocale(input) {
	const resolved = resolveSupportedLocale(input);
	if (typeof input === "string" && input && input !== resolved) console.warn(`Locale "${input}" not shipped; using "${resolved}"`);
	await loadLocale(resolved);
	i18n.global.locale.value = resolved;
	return resolved;
}
/**
* Stores the data for later use when locales are lazily loaded,
* and immediately merges data for already-loaded locales.
*/
function mergeCustomNodesI18n(i18nData) {
	for (const key of Object.keys(customNodesI18nData)) delete customNodesI18nData[key];
	Object.assign(customNodesI18nData, i18nData);
	for (const [locale, message] of Object.entries(i18nData)) if (loadedLocales.has(locale)) i18n.global.mergeLocaleMessage(locale, message);
}
/**
* Raw `/object_info` text, kept out of the vue-i18n message tree so English
* never reaches the message compiler. Rebuilt on every fetch, so a def that
* stops sending a field stops resolving to the previous value.
*/
var backendNodeText = /* @__PURE__ */ new Map();
function setBackendNodeText(defs) {
	backendNodeText.clear();
	for (const def of defs) {
		if (typeof def.name !== "string") continue;
		const entry = {};
		if (typeof def.display_name === "string" && def.display_name) entry.display_name = def.display_name;
		if (typeof def.description === "string" && def.description) entry.description = def.description;
		if (entry.display_name ?? entry.description) backendNodeText.set(def.name, entry);
	}
}
function customNodesProvide(nodeName, path) {
	const data = customNodesI18nData[i18n.global.locale.value];
	if (typeof data !== "object" || data === null) return false;
	const nodeDefs = data["nodeDefs"];
	if (typeof nodeDefs !== "object" || nodeDefs === null) return false;
	for (const candidate of nodeDefKeyCandidates(nodeName)) {
		let cursor = nodeDefs;
		for (const segment of `${candidate}.${path}`.split(".")) {
			if (typeof cursor !== "object" || cursor === null) {
				cursor = void 0;
				break;
			}
			cursor = cursor[segment];
		}
		if (typeof cursor === "string") return true;
	}
	return false;
}
/**
* Generated locales key dotted node ids flat (`my_node`). Locales written by
* hand before that convention nest them (`my.node`), which vue-i18n resolves by
* path traversal, so both are tried.
*/
function nodeDefKeyCandidates(nodeName) {
	const normalized = normalizeI18nKey(nodeName);
	return normalized === nodeName ? [normalized] : [normalized, nodeName];
}
function translateNodeDefText(nodeName, path, fallback, read) {
	for (const candidate of nodeDefKeyCandidates(nodeName)) {
		const key = `nodeDefs.${candidate}.${path}`;
		if (te(key)) return read(key, fallback);
	}
	return fallback;
}
/**
* Resolves node text in priority order.
*
* `en`: custom-node `/api/i18n` translations, then the live backend value, then
* the bundled snapshot. English is the source language, so a backend value is
* data rather than a translation and is returned without being compiled.
*
* Other locales: translations stay authoritative, falling back to the live
* backend value rather than the stale English snapshot.
*/
function resolveNodeDefPath(nodeName, path, backend, fallback, read) {
	if (customNodesProvide(nodeName, path)) return translateNodeDefText(nodeName, path, fallback, read);
	if (i18n.global.locale.value === "en" && backend !== void 0) return backend;
	return translateNodeDefText(nodeName, path, fallback, read);
}
function resolveNodeDefText(field, nodeName, backendValue) {
	const backend = backendValue ?? backendNodeText.get(nodeName)?.[field];
	return resolveNodeDefPath(nodeName, field, backend, backend ?? (field === "display_name" ? nodeName : ""), st);
}
/**
* `name` is escaped by `scripts/nodeDefLocaleSerializer.ts` and has to be
* compiled back; `tooltip` is stored verbatim and must never reach the message
* compiler, or a literal `{'@'}` would render to the user.
*/
function slotMessageReader(field) {
	return field === "tooltip" ? stRaw : st;
}
function resolveNodeDefSlotText(field, nodeName, slot, backendValue, fallbackValue = "") {
	return resolveNodeDefPath(nodeName, `${typeof slot === "string" ? `inputs.${normalizeI18nKey(slot)}` : `outputs.${slot}`}.${field}`, backendValue, backendValue ?? fallbackValue, slotMessageReader(field));
}
var messages = { en: buildLocale(main_default, nodeDefs_default, commands_default, settings_default) };
var i18n = createI18n({
	legacy: false,
	locale: getDefaultLocale(),
	fallbackLocale: "en",
	escapeParameter: true,
	messages,
	missingWarn: /^(?!settings\.Comfy_Locale\.options\.).+/,
	fallbackWarn: /^(?!settings\.Comfy_Locale\.options\.).+/
});
/** Convenience shorthand: i18n.global */
var t = i18n.global.t;
var te = (key, locale) => i18n.global.te(key, locale ?? i18n.global.locale.value);
var d = i18n.global.d;
var tm = i18n.global.tm;
function rawTranslationOrFallback(key, fallbackMessage) {
	const message = tm(key);
	return typeof message === "string" ? message : fallbackMessage;
}
/**
* Safe translation function that returns the fallback message if the key is not found.
* Invalid message syntax falls back to the raw locale message instead of crashing.
*
* @param key - The key to translate.
* @param fallbackMessage - The fallback message to use if the key is not found.
*/
function st(key, fallbackMessage) {
	if (!te(key)) return fallbackMessage;
	try {
		return t(key);
	} catch (error) {
		if (!(error instanceof SyntaxError)) throw error;
		return rawTranslationOrFallback(key, fallbackMessage);
	}
}
/**
* Safe raw translation function for strings that may contain i18n syntax.
*
* @param key - The key for the raw locale message.
* @param fallbackMessage - The fallback message to use if the key is not found
* or the locale message is not a string.
*/
function stRaw(key, fallbackMessage) {
	if (!te(key)) return fallbackMessage;
	return rawTranslationOrFallback(key, fallbackMessage);
}
//#endregion
export { resolveNodeDefSlotText as a, setBackendNodeText as c, t as d, te as f, resolveSupportedLocale as h, mergeCustomNodesI18n as i, st as l, getDefaultLocale as m, i18n as n, resolveNodeDefText as o, SUPPORTED_LOCALE_OPTIONS as p, loadLocale as r, setActiveLocale as s, d as t, stRaw as u };
