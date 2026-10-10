import { r as __name } from "./rolldown-runtime-xtsTai4I.js";
//#region \0vite/preload-helper.js
var scriptRel = /* @__PURE__ */ (function detectScriptRel() {
	const relList = typeof document !== "undefined" && document.createElement("link").relList;
	return relList && relList.supports && relList.supports("modulepreload") ? "modulepreload" : "preload";
})();
var assetsURL = function(dep, importerUrl) {
	return new URL(dep, importerUrl).href;
};
var seen = {};
var __vitePreload = function preload(baseModule, deps, importerUrl) {
	let promise = Promise.resolve();
	if (deps && deps.length > 0) {
		const links = document.getElementsByTagName("link");
		const cspNonceMeta = document.querySelector("meta[property=csp-nonce]");
		const cspNonce = cspNonceMeta?.nonce || cspNonceMeta?.getAttribute("nonce");
		function allSettled(promises) {
			return Promise.all(promises.map((p) => Promise.resolve(p).then((value) => ({
				status: "fulfilled",
				value
			}), (reason) => ({
				status: "rejected",
				reason
			}))));
		}
		function importMetaResolve(specifier) {
			if (import.meta.resolve) return import.meta.resolve(specifier);
			return new URL(
				specifier,
				/** #__KEEP__ */
				import.meta.url
			).href;
		}
		promise = allSettled(deps.map((dep) => {
			dep = assetsURL(dep, importerUrl);
			dep = importMetaResolve(dep);
			if (dep in seen) return;
			seen[dep] = true;
			const isCss = dep.endsWith(".css");
			for (let i = links.length - 1; i >= 0; i--) {
				const link = links[i];
				if (link.href === dep && (!isCss || link.rel === "stylesheet")) return;
			}
			const link = document.createElement("link");
			link.rel = isCss ? "stylesheet" : scriptRel;
			if (!isCss) link.as = "script";
			link.crossOrigin = "";
			link.href = dep;
			if (cspNonce) link.setAttribute("nonce", cspNonce);
			document.head.appendChild(link);
			if (isCss) return new Promise((res, rej) => {
				link.addEventListener("load", res);
				link.addEventListener("error", () => rej(/* @__PURE__ */ new Error(`Unable to preload CSS for ${dep}`)));
			});
		}));
	}
	function handlePreloadError(err) {
		const e = new Event("vite:preloadError", { cancelable: true });
		e.payload = err;
		window.dispatchEvent(e);
		if (!e.defaultPrevented) throw err;
	}
	return promise.then((res) => {
		for (const item of res || []) {
			if (item.status !== "rejected") continue;
			handlePreloadError(item.reason);
		}
		return baseModule().catch(handlePreloadError);
	});
};
//#endregion
//#region node_modules/.pnpm/@datadog+browser-core@6.33.0/node_modules/@datadog/browser-core/esm/tools/display.js
/**
* Keep references on console methods to avoid triggering patched behaviors
*
* NB: in some setup, console could already be patched by another SDK.
* In this case, some display messages can be sent by the other SDK
* but we should be safe from infinite loop nonetheless.
*/
var ConsoleApiName = {
	log: "log",
	debug: "debug",
	info: "info",
	warn: "warn",
	error: "error"
};
/**
* When building JS bundles, some users might use a plugin[1] or configuration[2] to remove
* "console.*" references. This causes some issue as we expect `console.*` to be defined.
* As a workaround, let's use a variable alias, so those expressions won't be taken into account by
* simple static analysis.
*
* [1]: https://babeljs.io/docs/babel-plugin-transform-remove-console/
* [2]: https://github.com/terser/terser#compress-options (look for drop_console)
*/
var globalConsole = console;
var originalConsoleMethods = {};
Object.keys(ConsoleApiName).forEach((name) => {
	originalConsoleMethods[name] = globalConsole[name];
});
var PREFIX = "Datadog Browser SDK:";
var display = {
	debug: originalConsoleMethods.debug.bind(globalConsole, PREFIX),
	log: originalConsoleMethods.log.bind(globalConsole, PREFIX),
	info: originalConsoleMethods.info.bind(globalConsole, PREFIX),
	warn: originalConsoleMethods.warn.bind(globalConsole, PREFIX),
	error: originalConsoleMethods.error.bind(globalConsole, PREFIX)
};
var DOCS_ORIGIN = "https://docs.datadoghq.com";
var DOCS_TROUBLESHOOTING = `${DOCS_ORIGIN}/real_user_monitoring/browser/troubleshooting`;
var MORE_DETAILS = "More details:";
//#endregion
//#region node_modules/.pnpm/@datadog+browser-core@6.33.0/node_modules/@datadog/browser-core/esm/tools/catchUserErrors.js
function catchUserErrors(fn, errorMsg) {
	return (...args) => {
		try {
			return fn(...args);
		} catch (err) {
			display.error(errorMsg, err);
		}
	};
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-core@6.33.0/node_modules/@datadog/browser-core/esm/tools/utils/numberUtils.js
/**
* Return true if the draw is successful
*
* @param threshold - Threshold between 0 and 100
*/
function performDraw(threshold) {
	return threshold !== 0 && Math.random() * 100 <= threshold;
}
function round(num, decimals) {
	return +num.toFixed(decimals);
}
function isPercentage(value) {
	return isNumber(value) && value >= 0 && value <= 100;
}
function isNumber(value) {
	return typeof value === "number";
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-core@6.33.0/node_modules/@datadog/browser-core/esm/tools/utils/objectUtils.js
function tryJsonParse(text) {
	try {
		return JSON.parse(text);
	} catch (_a) {}
}
function shallowClone(object) {
	return { ...object };
}
function objectHasValue(object, value) {
	return Object.keys(object).some((key) => object[key] === value);
}
function isEmptyObject(object) {
	return Object.keys(object).length === 0;
}
function mapValues(object, fn) {
	const newObject = {};
	for (const key of Object.keys(object)) newObject[key] = fn(object[key]);
	return newObject;
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-core@6.33.0/node_modules/@datadog/browser-core/esm/tools/globalObject.js
/**
* inspired by https://mathiasbynens.be/notes/globalthis
*/
function getGlobalObject() {
	if (typeof globalThis === "object") return globalThis;
	Object.defineProperty(Object.prototype, "_dd_temp_", {
		get() {
			return this;
		},
		configurable: true
	});
	let globalObject = _dd_temp_;
	delete Object.prototype._dd_temp_;
	if (typeof globalObject !== "object") {
		if (typeof self === "object") globalObject = self;
		else if (typeof window === "object") globalObject = window;
		else globalObject = {};
	}
	return globalObject;
}
/**
* Cached reference to the global object so it can be imported and re-used without
* re-evaluating the heavyweight fallback logic in `getGlobalObject()`.
*/
var globalObject = getGlobalObject();
var isWorkerEnvironment = "WorkerGlobalScope" in globalObject;
//#endregion
//#region node_modules/.pnpm/@datadog+browser-core@6.33.0/node_modules/@datadog/browser-core/esm/tools/getZoneJsOriginalValue.js
/**
* Gets the original value for a DOM API that was potentially patched by Zone.js.
*
* Zone.js[1] is a library that patches a bunch of JS and DOM APIs. It usually stores the original
* value of the patched functions/constructors/methods in a hidden property prefixed by
* __zone_symbol__.
*
* In multiple occasions, we observed that Zone.js is the culprit of important issues leading to
* browser resource exhaustion (memory leak, high CPU usage). This method is used as a workaround to
* use the original DOM API instead of the one patched by Zone.js.
*
* [1]: https://github.com/angular/angular/tree/main/packages/zone.js
*/
function getZoneJsOriginalValue(target, name) {
	const browserWindow = getGlobalObject();
	let original;
	if (browserWindow.Zone && typeof browserWindow.Zone.__symbol__ === "function") original = target[browserWindow.Zone.__symbol__(name)];
	if (!original) original = target[name];
	return original;
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-core@6.33.0/node_modules/@datadog/browser-core/esm/tools/monitor.js
var onMonitorErrorCollected;
var debugMode = false;
function startMonitorErrorCollection(newOnMonitorErrorCollected) {
	onMonitorErrorCollected = newOnMonitorErrorCollected;
}
function setDebugMode(newDebugMode) {
	debugMode = newDebugMode;
}
function monitor(fn) {
	return function(...args) {
		return callMonitored(fn, this, args);
	};
}
function callMonitored(fn, context, args) {
	try {
		return fn.apply(context, args);
	} catch (e) {
		monitorError(e);
	}
}
function monitorError(e) {
	displayIfDebugEnabled(e);
	if (onMonitorErrorCollected) try {
		onMonitorErrorCollected(e);
	} catch (e) {
		displayIfDebugEnabled(e);
	}
}
function displayIfDebugEnabled(...args) {
	if (debugMode) display.error("[MONITOR]", ...args);
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-core@6.33.0/node_modules/@datadog/browser-core/esm/tools/timer.js
function setTimeout(callback, delay) {
	return getZoneJsOriginalValue(getGlobalObject(), "setTimeout")(monitor(callback), delay);
}
function clearTimeout(timeoutId) {
	getZoneJsOriginalValue(getGlobalObject(), "clearTimeout")(timeoutId);
}
function setInterval(callback, delay) {
	return getZoneJsOriginalValue(getGlobalObject(), "setInterval")(monitor(callback), delay);
}
function clearInterval(timeoutId) {
	getZoneJsOriginalValue(getGlobalObject(), "clearInterval")(timeoutId);
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-core@6.33.0/node_modules/@datadog/browser-core/esm/tools/queueMicrotask.js
function queueMicrotask(callback) {
	const nativeImplementation = globalObject.queueMicrotask;
	if (typeof nativeImplementation === "function") nativeImplementation(monitor(callback));
	else Promise.resolve().then(monitor(callback));
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-core@6.33.0/node_modules/@datadog/browser-core/esm/tools/observable.js
var Observable = class {
	constructor(onFirstSubscribe) {
		this.onFirstSubscribe = onFirstSubscribe;
		this.observers = [];
	}
	subscribe(observer) {
		this.addObserver(observer);
		return { unsubscribe: () => this.removeObserver(observer) };
	}
	notify(data) {
		this.observers.forEach((observer) => observer(data));
	}
	addObserver(observer) {
		this.observers.push(observer);
		if (this.observers.length === 1 && this.onFirstSubscribe) this.onLastUnsubscribe = this.onFirstSubscribe(this) || void 0;
	}
	removeObserver(observer) {
		this.observers = this.observers.filter((other) => observer !== other);
		if (!this.observers.length && this.onLastUnsubscribe) this.onLastUnsubscribe();
	}
};
function mergeObservables(...observables) {
	return new Observable((globalObservable) => {
		const subscriptions = observables.map((observable) => observable.subscribe((data) => globalObservable.notify(data)));
		return () => subscriptions.forEach((subscription) => subscription.unsubscribe());
	});
}
var BufferedObservable = class extends Observable {
	constructor(maxBufferSize) {
		super();
		this.maxBufferSize = maxBufferSize;
		this.buffer = [];
	}
	notify(data) {
		this.buffer.push(data);
		if (this.buffer.length > this.maxBufferSize) this.buffer.shift();
		super.notify(data);
	}
	subscribe(observer) {
		let closed = false;
		const subscription = { unsubscribe: () => {
			closed = true;
			this.removeObserver(observer);
		} };
		queueMicrotask(() => {
			for (const data of this.buffer) {
				if (closed) return;
				observer(data);
			}
			if (!closed) this.addObserver(observer);
		});
		return subscription;
	}
	/**
	* Drop buffered data and don't buffer future data. This is to avoid leaking memory when it's not
	* needed anymore. This can be seen as a performance optimization, and things will work probably
	* even if this method isn't called, but still useful to clarify our intent and lowering our
	* memory impact.
	*/
	unbuffer() {
		queueMicrotask(() => {
			this.maxBufferSize = this.buffer.length = 0;
		});
	}
};
//#endregion
//#region node_modules/.pnpm/@datadog+browser-core@6.33.0/node_modules/@datadog/browser-core/esm/tools/utils/timeUtils.js
var ONE_SECOND = 1e3;
var ONE_MINUTE = 60 * ONE_SECOND;
var ONE_HOUR = 60 * ONE_MINUTE;
var ONE_YEAR = 365 * (24 * ONE_HOUR);
function relativeToClocks(relative) {
	return {
		relative,
		timeStamp: getCorrectedTimeStamp(relative)
	};
}
function timeStampToClocks(timeStamp) {
	return {
		relative: getRelativeTime(timeStamp),
		timeStamp
	};
}
function getCorrectedTimeStamp(relativeTime) {
	const correctedOrigin = dateNow() - performance.now();
	if (correctedOrigin > getNavigationStart()) return Math.round(addDuration(correctedOrigin, relativeTime));
	return getTimeStamp(relativeTime);
}
function currentDrift() {
	return Math.round(dateNow() - addDuration(getNavigationStart(), performance.now()));
}
function toServerDuration(duration) {
	if (!isNumber(duration)) return duration;
	return round(duration * 1e6, 0);
}
function dateNow() {
	return (/* @__PURE__ */ new Date()).getTime();
}
function timeStampNow() {
	return dateNow();
}
function relativeNow() {
	return performance.now();
}
function clocksNow() {
	return {
		relative: relativeNow(),
		timeStamp: timeStampNow()
	};
}
function clocksOrigin() {
	return {
		relative: 0,
		timeStamp: getNavigationStart()
	};
}
function elapsed(start, end) {
	return end - start;
}
function addDuration(a, b) {
	return a + b;
}
function getRelativeTime(timestamp) {
	return timestamp - getNavigationStart();
}
function getTimeStamp(relativeTime) {
	return Math.round(addDuration(getNavigationStart(), relativeTime));
}
function looksLikeRelativeTime(time) {
	return time < ONE_YEAR;
}
/**
* Navigation start slightly change on some rare cases
*/
var navigationStart;
/**
* Notes: this does not use `performance.timeOrigin` because:
* - It doesn't seem to reflect the actual time on which the navigation has started: it may be much farther in the past,
* at least in Firefox 71. (see: https://bugzilla.mozilla.org/show_bug.cgi?id=1429926)
* - It is not supported in Safari <15
*/
function getNavigationStart() {
	var _a;
	var _b;
	if (navigationStart === void 0) navigationStart = (_b = (_a = performance.timing) === null || _a === void 0 ? void 0 : _a.navigationStart) !== null && _b !== void 0 ? _b : performance.timeOrigin;
	return navigationStart;
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-core@6.33.0/node_modules/@datadog/browser-core/esm/tools/utils/functionUtils.js
function throttle(fn, wait, options) {
	const needLeadingExecution = options && options.leading !== void 0 ? options.leading : true;
	const needTrailingExecution = options && options.trailing !== void 0 ? options.trailing : true;
	let inWaitPeriod = false;
	let pendingExecutionWithParameters;
	let pendingTimeoutId;
	return {
		throttled: (...parameters) => {
			if (inWaitPeriod) {
				pendingExecutionWithParameters = parameters;
				return;
			}
			if (needLeadingExecution) fn(...parameters);
			else pendingExecutionWithParameters = parameters;
			inWaitPeriod = true;
			pendingTimeoutId = setTimeout(() => {
				if (needTrailingExecution && pendingExecutionWithParameters) fn(...pendingExecutionWithParameters);
				inWaitPeriod = false;
				pendingExecutionWithParameters = void 0;
			}, wait);
		},
		cancel: () => {
			clearTimeout(pendingTimeoutId);
			inWaitPeriod = false;
			pendingExecutionWithParameters = void 0;
		}
	};
}
function noop() {}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-core@6.33.0/node_modules/@datadog/browser-core/esm/tools/utils/stringUtils.js
/**
* UUID v4
* from https://gist.github.com/jed/982883
*/
function generateUUID(placeholder) {
	return placeholder ? (parseInt(placeholder, 10) ^ Math.random() * 16 >> parseInt(placeholder, 10) / 4).toString(16) : `10000000-1000-4000-8000-100000000000`.replace(/[018]/g, generateUUID);
}
var COMMA_SEPARATED_KEY_VALUE = /(\S+?)\s*=\s*(.+?)(?:;|$)/g;
/**
* Returns the value of the key with the given name
* If there are multiple values with the same key, returns the first one
*/
function findCommaSeparatedValue(rawString, name) {
	COMMA_SEPARATED_KEY_VALUE.lastIndex = 0;
	while (true) {
		const match = COMMA_SEPARATED_KEY_VALUE.exec(rawString);
		if (match) {
			if (match[1] === name) return match[2];
		} else break;
	}
}
/**
* Returns a map of all the values with the given key
* If there are multiple values with the same key, returns all the values
*/
function findAllCommaSeparatedValues(rawString) {
	const result = /* @__PURE__ */ new Map();
	COMMA_SEPARATED_KEY_VALUE.lastIndex = 0;
	while (true) {
		const match = COMMA_SEPARATED_KEY_VALUE.exec(rawString);
		if (match) {
			const key = match[1];
			const value = match[2];
			if (result.has(key)) result.get(key).push(value);
			else result.set(key, [value]);
		} else break;
	}
	return result;
}
/**
* Returns a map of the values with the given key
* ⚠️ If there are multiple values with the same key, returns the LAST one
*
* @deprecated use `findAllCommaSeparatedValues()` instead
*/
function findCommaSeparatedValues(rawString) {
	const result = /* @__PURE__ */ new Map();
	COMMA_SEPARATED_KEY_VALUE.lastIndex = 0;
	while (true) {
		const match = COMMA_SEPARATED_KEY_VALUE.exec(rawString);
		if (match) result.set(match[1], match[2]);
		else break;
	}
	return result;
}
function safeTruncate(candidate, length, suffix = "") {
	const lastChar = candidate.charCodeAt(length - 1);
	const correctedLength = lastChar >= 55296 && lastChar <= 56319 ? length + 1 : length;
	if (candidate.length <= correctedLength) return candidate;
	return `${candidate.slice(0, correctedLength)}${suffix}`;
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-core@6.33.0/node_modules/@datadog/browser-core/esm/tools/utils/browserDetection.js
function isChromium() {
	return detectBrowserCached() === 0;
}
function isSafari() {
	return detectBrowserCached() === 1;
}
var browserCache;
function detectBrowserCached() {
	return browserCache !== null && browserCache !== void 0 ? browserCache : browserCache = detectBrowser();
}
function detectBrowser(browserWindow = window) {
	var _a;
	const userAgent = browserWindow.navigator.userAgent;
	if (browserWindow.chrome || /HeadlessChrome/.test(userAgent)) return 0;
	if (((_a = browserWindow.navigator.vendor) === null || _a === void 0 ? void 0 : _a.indexOf("Apple")) === 0 || /safari/i.test(userAgent) && !/chrome|android/i.test(userAgent)) return 1;
	return 2;
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-core@6.33.0/node_modules/@datadog/browser-core/esm/tools/utils/urlPolyfill.js
function normalizeUrl(url) {
	return buildUrl(url, location.href).href;
}
function isValidUrl(url) {
	try {
		return !!buildUrl(url);
	} catch (_a) {
		return false;
	}
}
function getPathName(url) {
	const pathname = buildUrl(url).pathname;
	return pathname[0] === "/" ? pathname : `/${pathname}`;
}
function buildUrl(url, base) {
	const { URL } = getPristineWindow();
	try {
		return base !== void 0 ? new URL(url, base) : new URL(url);
	} catch (error) {
		throw new Error(`Failed to construct URL: ${String(error)}`);
	}
}
/**
* Get native URL constructor from a clean iframe
* This avoids polyfill issues by getting the native implementation from a fresh iframe context
* Falls back to the original URL constructor if iframe approach fails
*/
var getPristineGlobalObjectCache;
function getPristineWindow() {
	var _a;
	if (!getPristineGlobalObjectCache) {
		let iframe;
		let pristineWindow;
		try {
			iframe = document.createElement("iframe");
			iframe.style.display = "none";
			document.body.appendChild(iframe);
			pristineWindow = (_a = iframe.contentWindow) !== null && _a !== void 0 ? _a : globalObject;
		} catch (_b) {
			pristineWindow = globalObject;
		}
		getPristineGlobalObjectCache = { URL: pristineWindow.URL };
		iframe === null || iframe === void 0 || iframe.remove();
	}
	return getPristineGlobalObjectCache;
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-core@6.33.0/node_modules/@datadog/browser-core/esm/browser/cookie.js
function setCookie(name, value, expireDelay = 0, options) {
	const date = /* @__PURE__ */ new Date();
	date.setTime(date.getTime() + expireDelay);
	const expires = `expires=${date.toUTCString()}`;
	const sameSite = options && options.crossSite ? "none" : "strict";
	const domain = options && options.domain ? `;domain=${options.domain}` : "";
	const secure = options && options.secure ? ";secure" : "";
	const partitioned = options && options.partitioned ? ";partitioned" : "";
	document.cookie = `${name}=${value};${expires};path=/;samesite=${sameSite}${domain}${secure}${partitioned}`;
}
/**
* Returns the value of the cookie with the given name
* If there are multiple cookies with the same name, returns the first one
*/
function getCookie(name) {
	return findCommaSeparatedValue(document.cookie, name);
}
/**
* Returns all the values of the cookies with the given name
*/
function getCookies(name) {
	return findAllCommaSeparatedValues(document.cookie).get(name) || [];
}
var initCookieParsed;
/**
* Returns a cached value of the cookie. Use this during SDK initialization (and whenever possible)
* to avoid accessing document.cookie multiple times.
*
* ⚠️ If there are multiple cookies with the same name, returns the LAST one (unlike `getCookie()`)
*/
function getInitCookie(name) {
	if (!initCookieParsed) initCookieParsed = findCommaSeparatedValues(document.cookie);
	return initCookieParsed.get(name);
}
function deleteCookie(name, options) {
	setCookie(name, "", 0, options);
}
function areCookiesAuthorized(options) {
	if (document.cookie === void 0 || document.cookie === null) return false;
	try {
		const testCookieName = `dd_cookie_test_${generateUUID()}`;
		const testCookieValue = "test";
		setCookie(testCookieName, testCookieValue, ONE_MINUTE, options);
		const isCookieCorrectlySet = getCookie(testCookieName) === testCookieValue;
		deleteCookie(testCookieName, options);
		return isCookieCorrectlySet;
	} catch (error) {
		display.error(error);
		return false;
	}
}
/**
* No API to retrieve it, number of levels for subdomain and suffix are unknown
* strategy: find the minimal domain on which cookies are allowed to be set
* https://web.dev/same-site-same-origin/#site
*/
var getCurrentSiteCache;
function getCurrentSite(hostname = location.hostname, referrer = document.referrer) {
	if (getCurrentSiteCache === void 0) {
		const defaultHostName = getCookieDefaultHostName(hostname, referrer);
		if (defaultHostName) {
			const testCookieName = `dd_site_test_${generateUUID()}`;
			const testCookieValue = "test";
			const domainLevels = defaultHostName.split(".");
			let candidateDomain = domainLevels.pop();
			while (domainLevels.length && !getCookie(testCookieName)) {
				candidateDomain = `${domainLevels.pop()}.${candidateDomain}`;
				setCookie(testCookieName, testCookieValue, ONE_SECOND, { domain: candidateDomain });
			}
			deleteCookie(testCookieName, { domain: candidateDomain });
			getCurrentSiteCache = candidateDomain;
		}
	}
	return getCurrentSiteCache;
}
function getCookieDefaultHostName(hostname, referrer) {
	try {
		return hostname || buildUrl(referrer).hostname;
	} catch (_a) {}
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-core@6.33.0/node_modules/@datadog/browser-core/esm/domain/session/storeStrategies/sessionStoreStrategy.js
var SESSION_STORE_KEY = "_dd_s";
//#endregion
//#region node_modules/.pnpm/@datadog+browser-core@6.33.0/node_modules/@datadog/browser-core/esm/tools/utils/polyfills.js
function findLast(array, predicate) {
	for (let i = array.length - 1; i >= 0; i -= 1) {
		const item = array[i];
		if (predicate(item, i, array)) return item;
	}
}
function objectValues(object) {
	return Object.values(object);
}
function objectEntries(object) {
	return Object.entries(object);
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-core@6.33.0/node_modules/@datadog/browser-core/esm/domain/session/sessionConstants.js
var SESSION_TIME_OUT_DELAY = 4 * ONE_HOUR;
var SESSION_EXPIRATION_DELAY = 15 * ONE_MINUTE;
var SESSION_COOKIE_EXPIRATION_DELAY = ONE_YEAR;
/**
* @internal
*/
var SessionPersistence = {
	COOKIE: "cookie",
	MEMORY: "memory",
	LOCAL_STORAGE: "local-storage"
};
//#endregion
//#region node_modules/.pnpm/@datadog+browser-core@6.33.0/node_modules/@datadog/browser-core/esm/domain/session/sessionStateValidation.js
var SESSION_ENTRY_REGEXP = /^([a-zA-Z]+)=([a-z0-9-]+)$/;
function isValidSessionString(sessionString) {
	return !!sessionString && (sessionString.indexOf("&") !== -1 || SESSION_ENTRY_REGEXP.test(sessionString));
}
function getExpiredSessionState(previousSessionState, configuration) {
	const expiredSessionState = { isExpired: "1" };
	if (configuration.trackAnonymousUser && (previousSessionState === null || previousSessionState === void 0 ? void 0 : previousSessionState.anonymousId)) expiredSessionState.anonymousId = previousSessionState === null || previousSessionState === void 0 ? void 0 : previousSessionState.anonymousId;
	return expiredSessionState;
}
function isSessionInNotStartedState(session) {
	return isEmptyObject(session);
}
function isSessionStarted(session) {
	return !isSessionInNotStartedState(session);
}
function isSessionInExpiredState(session) {
	return session.isExpired !== void 0 || !isActiveSession(session);
}
function isActiveSession(sessionState) {
	return (sessionState.created === void 0 || dateNow() - Number(sessionState.created) < SESSION_TIME_OUT_DELAY) && (sessionState.expire === void 0 || dateNow() < Number(sessionState.expire));
}
function expandSessionState(session) {
	session.expire = String(dateNow() + SESSION_EXPIRATION_DELAY);
}
function toSessionString(session) {
	return objectEntries(session).map(([key, value]) => key === "anonymousId" ? `aid=${value}` : `${key}=${value}`).join("&");
}
function toSessionState(sessionString) {
	const session = {};
	if (isValidSessionString(sessionString)) sessionString.split("&").forEach((entry) => {
		const matches = SESSION_ENTRY_REGEXP.exec(entry);
		if (matches !== null) {
			const [, key, value] = matches;
			if (key === "aid") session.anonymousId = value;
			else session[key] = value;
		}
	});
	return session;
}
var OLD_RUM_COOKIE_NAME = "_dd_r";
var OLD_LOGS_COOKIE_NAME = "_dd_l";
var LOGS_SESSION_KEY = "logs";
/**
* This migration should remain in the codebase as long as older versions are available/live
* to allow older sdk versions to be upgraded to newer versions without compatibility issues.
*/
function tryOldCookiesMigration(cookieStoreStrategy) {
	if (!getInitCookie("_dd_s")) {
		const oldSessionId = getInitCookie("_dd");
		const oldRumType = getInitCookie(OLD_RUM_COOKIE_NAME);
		const oldLogsType = getInitCookie(OLD_LOGS_COOKIE_NAME);
		const session = {};
		if (oldSessionId) session.id = oldSessionId;
		if (oldLogsType && /^[01]$/.test(oldLogsType)) session[LOGS_SESSION_KEY] = oldLogsType;
		if (oldRumType && /^[012]$/.test(oldRumType)) session["rum"] = oldRumType;
		if (isSessionStarted(session)) {
			expandSessionState(session);
			cookieStoreStrategy.persistSession(session);
		}
	}
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-core@6.33.0/node_modules/@datadog/browser-core/esm/domain/session/storeStrategies/sessionInCookie.js
function selectCookieStrategy(initConfiguration) {
	const cookieOptions = buildCookieOptions(initConfiguration);
	return cookieOptions && areCookiesAuthorized(cookieOptions) ? {
		type: SessionPersistence.COOKIE,
		cookieOptions
	} : void 0;
}
function initCookieStrategy(configuration, cookieOptions) {
	const cookieStore = {
		/**
		* Lock strategy allows mitigating issues due to concurrent access to cookie.
		* This issue concerns only chromium browsers and enabling this on firefox increases cookie write failures.
		*/
		isLockEnabled: isChromium(),
		persistSession: (sessionState) => storeSessionCookie(cookieOptions, configuration, sessionState, SESSION_EXPIRATION_DELAY),
		retrieveSession: () => retrieveSessionCookie(cookieOptions, configuration),
		expireSession: (sessionState) => storeSessionCookie(cookieOptions, configuration, getExpiredSessionState(sessionState, configuration), SESSION_TIME_OUT_DELAY)
	};
	tryOldCookiesMigration(cookieStore);
	return cookieStore;
}
function storeSessionCookie(options, configuration, sessionState, defaultTimeout) {
	let sessionStateString = toSessionString(sessionState);
	if (configuration.betaEncodeCookieOptions) sessionStateString = toSessionString({
		...sessionState,
		...!isEmptyObject(sessionState) ? { c: encodeCookieOptions(options) } : {}
	});
	setCookie(SESSION_STORE_KEY, sessionStateString, configuration.trackAnonymousUser ? SESSION_COOKIE_EXPIRATION_DELAY : defaultTimeout, options);
}
/**
* Retrieve the session state from the cookie that was set with the same cookie options
* If there is no match, return the first cookie, because that's how `getCookie()` works
*/
function retrieveSessionCookie(cookieOptions, configuration) {
	if (configuration.betaEncodeCookieOptions) return retrieveSessionCookieFromEncodedCookie(cookieOptions);
	return toSessionState(getCookie(SESSION_STORE_KEY));
}
function buildCookieOptions(initConfiguration) {
	const cookieOptions = {};
	cookieOptions.secure = !!initConfiguration.useSecureSessionCookie || !!initConfiguration.usePartitionedCrossSiteSessionCookie;
	cookieOptions.crossSite = !!initConfiguration.usePartitionedCrossSiteSessionCookie;
	cookieOptions.partitioned = !!initConfiguration.usePartitionedCrossSiteSessionCookie;
	if (initConfiguration.trackSessionAcrossSubdomains) {
		const currentSite = getCurrentSite();
		if (!currentSite) return;
		cookieOptions.domain = currentSite;
	}
	return cookieOptions;
}
function encodeCookieOptions(cookieOptions) {
	const domainCount = cookieOptions.domain ? cookieOptions.domain.split(".").length - 1 : 0;
	let byte = 0;
	byte |= 0;
	byte |= domainCount << 1;
	byte |= cookieOptions.crossSite ? 1 : 0;
	return byte.toString(16);
}
/**
* Retrieve the session state from the cookie that was set with the same cookie options.
* If there is no match, fallback to the first cookie, (because that's how `getCookie()` works)
* and this allows to keep the current session id when we release this feature.
*/
function retrieveSessionCookieFromEncodedCookie(cookieOptions) {
	const cookies = getCookies(SESSION_STORE_KEY);
	const opts = encodeCookieOptions(cookieOptions);
	let sessionState;
	for (const cookie of cookies.reverse()) {
		sessionState = toSessionState(cookie);
		if (sessionState.c === opts) break;
	}
	sessionState === null || sessionState === void 0 || delete sessionState.c;
	return sessionState !== null && sessionState !== void 0 ? sessionState : {};
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-core@6.33.0/node_modules/@datadog/browser-core/esm/domain/session/storeStrategies/sessionInLocalStorage.js
var LOCAL_STORAGE_TEST_KEY = "_dd_test_";
function selectLocalStorageStrategy() {
	try {
		const id = generateUUID();
		const testKey = `${LOCAL_STORAGE_TEST_KEY}${id}`;
		localStorage.setItem(testKey, id);
		const retrievedId = localStorage.getItem(testKey);
		localStorage.removeItem(testKey);
		return id === retrievedId ? { type: SessionPersistence.LOCAL_STORAGE } : void 0;
	} catch (_a) {
		return;
	}
}
function initLocalStorageStrategy(configuration) {
	return {
		isLockEnabled: false,
		persistSession: persistInLocalStorage,
		retrieveSession: retrieveSessionFromLocalStorage,
		expireSession: (sessionState) => expireSessionFromLocalStorage(sessionState, configuration)
	};
}
function persistInLocalStorage(sessionState) {
	localStorage.setItem(SESSION_STORE_KEY, toSessionString(sessionState));
}
function retrieveSessionFromLocalStorage() {
	return toSessionState(localStorage.getItem(SESSION_STORE_KEY));
}
function expireSessionFromLocalStorage(previousSessionState, configuration) {
	persistInLocalStorage(getExpiredSessionState(previousSessionState, configuration));
}
var LOCK_EXPIRATION_DELAY = ONE_SECOND;
var LOCK_SEPARATOR = "--";
var bufferedOperations = [];
var ongoingOperations;
function processSessionStoreOperations(operations, sessionStoreStrategy, numberOfRetries = 0) {
	var _a;
	const { isLockEnabled, persistSession, expireSession } = sessionStoreStrategy;
	const persistWithLock = (session) => persistSession({
		...session,
		lock: currentLock
	});
	const retrieveStore = () => {
		const { lock, ...session } = sessionStoreStrategy.retrieveSession();
		return {
			session,
			lock: lock && !isLockExpired(lock) ? lock : void 0
		};
	};
	if (!ongoingOperations) ongoingOperations = operations;
	if (operations !== ongoingOperations) {
		bufferedOperations.push(operations);
		return;
	}
	if (isLockEnabled && numberOfRetries >= 100) {
		next(sessionStoreStrategy);
		return;
	}
	let currentLock;
	let currentStore = retrieveStore();
	if (isLockEnabled) {
		if (currentStore.lock) {
			retryLater(operations, sessionStoreStrategy, numberOfRetries);
			return;
		}
		currentLock = createLock();
		persistWithLock(currentStore.session);
		currentStore = retrieveStore();
		if (currentStore.lock !== currentLock) {
			retryLater(operations, sessionStoreStrategy, numberOfRetries);
			return;
		}
	}
	let processedSession = operations.process(currentStore.session);
	if (isLockEnabled) {
		currentStore = retrieveStore();
		if (currentStore.lock !== currentLock) {
			retryLater(operations, sessionStoreStrategy, numberOfRetries);
			return;
		}
	}
	if (processedSession) {
		if (isSessionInExpiredState(processedSession)) expireSession(processedSession);
		else {
			expandSessionState(processedSession);
			if (isLockEnabled) persistWithLock(processedSession);
			else persistSession(processedSession);
		}
	}
	if (isLockEnabled) {
		if (!(processedSession && isSessionInExpiredState(processedSession))) {
			currentStore = retrieveStore();
			if (currentStore.lock !== currentLock) {
				retryLater(operations, sessionStoreStrategy, numberOfRetries);
				return;
			}
			persistSession(currentStore.session);
			processedSession = currentStore.session;
		}
	}
	(_a = operations.after) === null || _a === void 0 || _a.call(operations, processedSession || currentStore.session);
	next(sessionStoreStrategy);
}
function retryLater(operations, sessionStore, currentNumberOfRetries) {
	setTimeout(() => {
		processSessionStoreOperations(operations, sessionStore, currentNumberOfRetries + 1);
	}, 10);
}
function next(sessionStore) {
	ongoingOperations = void 0;
	const nextOperations = bufferedOperations.shift();
	if (nextOperations) processSessionStoreOperations(nextOperations, sessionStore);
}
function createLock() {
	return generateUUID() + LOCK_SEPARATOR + timeStampNow();
}
function isLockExpired(lock) {
	const [, timeStamp] = lock.split(LOCK_SEPARATOR);
	return !timeStamp || elapsed(Number(timeStamp), timeStampNow()) > LOCK_EXPIRATION_DELAY;
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-core@6.33.0/node_modules/@datadog/browser-core/esm/domain/session/storeStrategies/sessionInMemory.js
/**
* Key used to store session state in the global object.
* This allows RUM and Logs SDKs to share the same session when using memory storage.
*/
var MEMORY_SESSION_STORE_KEY = "_DD_SESSION";
function selectMemorySessionStoreStrategy() {
	return { type: SessionPersistence.MEMORY };
}
function initMemorySessionStoreStrategy(configuration) {
	return {
		expireSession: (sessionState) => expireSessionFromMemory(sessionState, configuration),
		isLockEnabled: false,
		persistSession: persistInMemory,
		retrieveSession: retrieveFromMemory
	};
}
function retrieveFromMemory() {
	const globalObject = getGlobalObject();
	if (!globalObject["_DD_SESSION"]) globalObject[MEMORY_SESSION_STORE_KEY] = {};
	return shallowClone(globalObject[MEMORY_SESSION_STORE_KEY]);
}
function persistInMemory(state) {
	const globalObject = getGlobalObject();
	globalObject[MEMORY_SESSION_STORE_KEY] = shallowClone(state);
}
function expireSessionFromMemory(previousSessionState, configuration) {
	persistInMemory(getExpiredSessionState(previousSessionState, configuration));
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-core@6.33.0/node_modules/@datadog/browser-core/esm/domain/session/sessionStore.js
/**
* Every second, the storage will be polled to check for any change that can occur
* to the session state in another browser tab, or another window.
* This value has been determined from our previous cookie-only implementation.
*/
var STORAGE_POLL_DELAY = ONE_SECOND;
/**
* Selects the correct session store strategy type based on the configuration and storage
* availability. When an array is provided, tries each persistence type in order until one
* successfully initializes.
*/
function selectSessionStoreStrategyType(initConfiguration) {
	const { sessionPersistence } = initConfiguration;
	const persistenceList = normalizePersistenceList(sessionPersistence, initConfiguration);
	for (const persistence of persistenceList) {
		const strategyType = selectStrategyForPersistence(persistence, initConfiguration);
		if (strategyType !== void 0) return strategyType;
	}
}
function normalizePersistenceList(sessionPersistence, initConfiguration) {
	if (Array.isArray(sessionPersistence)) return sessionPersistence;
	if (sessionPersistence !== void 0) return [sessionPersistence];
	return initConfiguration.allowFallbackToLocalStorage ? [SessionPersistence.COOKIE, SessionPersistence.LOCAL_STORAGE] : [SessionPersistence.COOKIE];
}
function selectStrategyForPersistence(persistence, initConfiguration) {
	switch (persistence) {
		case SessionPersistence.COOKIE: return selectCookieStrategy(initConfiguration);
		case SessionPersistence.LOCAL_STORAGE: return selectLocalStorageStrategy();
		case SessionPersistence.MEMORY: return selectMemorySessionStoreStrategy();
		default:
			display.error(`Invalid session persistence '${String(persistence)}'`);
			return;
	}
}
function getSessionStoreStrategy(sessionStoreStrategyType, configuration) {
	return sessionStoreStrategyType.type === SessionPersistence.COOKIE ? initCookieStrategy(configuration, sessionStoreStrategyType.cookieOptions) : sessionStoreStrategyType.type === SessionPersistence.LOCAL_STORAGE ? initLocalStorageStrategy(configuration) : initMemorySessionStoreStrategy(configuration);
}
/**
* Different session concepts:
* - tracked, the session has an id and is updated along the user navigation
* - not tracked, the session does not have an id but it is updated along the user navigation
* - inactive, no session in store or session expired, waiting for a renew session
*/
function startSessionStore(sessionStoreStrategyType, configuration, productKey, computeTrackingType, sessionStoreStrategy = getSessionStoreStrategy(sessionStoreStrategyType, configuration)) {
	const renewObservable = new Observable();
	const expireObservable = new Observable();
	const sessionStateUpdateObservable = new Observable();
	const watchSessionTimeoutId = setInterval(watchSession, STORAGE_POLL_DELAY);
	let sessionCache;
	startSession();
	const { throttled: throttledExpandOrRenewSession, cancel: cancelExpandOrRenewSession } = throttle(() => {
		processSessionStoreOperations({
			process: (sessionState) => {
				if (isSessionInNotStartedState(sessionState)) return;
				const synchronizedSession = synchronizeSession(sessionState);
				expandOrRenewSessionState(synchronizedSession);
				return synchronizedSession;
			},
			after: (sessionState) => {
				if (isSessionStarted(sessionState) && !hasSessionInCache()) renewSessionInCache(sessionState);
				sessionCache = sessionState;
			}
		}, sessionStoreStrategy);
	}, STORAGE_POLL_DELAY);
	function expandSession() {
		processSessionStoreOperations({ process: (sessionState) => hasSessionInCache() ? synchronizeSession(sessionState) : void 0 }, sessionStoreStrategy);
	}
	/**
	* allows two behaviors:
	* - if the session is active, synchronize the session cache without updating the session store
	* - if the session is not active, clear the session store and expire the session cache
	*/
	function watchSession() {
		const sessionState = sessionStoreStrategy.retrieveSession();
		if (isSessionInExpiredState(sessionState)) processSessionStoreOperations({
			process: (sessionState) => isSessionInExpiredState(sessionState) ? getExpiredSessionState(sessionState, configuration) : void 0,
			after: synchronizeSession
		}, sessionStoreStrategy);
		else synchronizeSession(sessionState);
	}
	function synchronizeSession(sessionState) {
		if (isSessionInExpiredState(sessionState)) sessionState = getExpiredSessionState(sessionState, configuration);
		if (hasSessionInCache()) {
			if (isSessionInCacheOutdated(sessionState)) expireSessionInCache();
			else {
				sessionStateUpdateObservable.notify({
					previousState: sessionCache,
					newState: sessionState
				});
				sessionCache = sessionState;
			}
		}
		return sessionState;
	}
	function startSession() {
		processSessionStoreOperations({
			process: (sessionState) => {
				if (isSessionInNotStartedState(sessionState)) {
					sessionState.anonymousId = generateUUID();
					return getExpiredSessionState(sessionState, configuration);
				}
			},
			after: (sessionState) => {
				sessionCache = sessionState;
			}
		}, sessionStoreStrategy);
	}
	function expandOrRenewSessionState(sessionState) {
		if (isSessionInNotStartedState(sessionState)) return false;
		const trackingType = computeTrackingType(sessionState[productKey]);
		sessionState[productKey] = trackingType;
		delete sessionState.isExpired;
		if (trackingType !== "0" && !sessionState.id) {
			sessionState.id = generateUUID();
			sessionState.created = String(dateNow());
		}
		if (configuration.trackAnonymousUser && !sessionState.anonymousId) sessionState.anonymousId = generateUUID();
	}
	function hasSessionInCache() {
		return (sessionCache === null || sessionCache === void 0 ? void 0 : sessionCache[productKey]) !== void 0;
	}
	function isSessionInCacheOutdated(sessionState) {
		return sessionCache.id !== sessionState.id || sessionCache[productKey] !== sessionState[productKey];
	}
	function expireSessionInCache() {
		sessionCache = getExpiredSessionState(sessionCache, configuration);
		expireObservable.notify();
	}
	function renewSessionInCache(sessionState) {
		sessionCache = sessionState;
		renewObservable.notify();
	}
	function updateSessionState(partialSessionState) {
		processSessionStoreOperations({
			process: (sessionState) => ({
				...sessionState,
				...partialSessionState
			}),
			after: synchronizeSession
		}, sessionStoreStrategy);
	}
	return {
		expandOrRenewSession: throttledExpandOrRenewSession,
		expandSession,
		getSession: () => sessionCache,
		renewObservable,
		expireObservable,
		sessionStateUpdateObservable,
		restartSession: startSession,
		expire: (hasConsent) => {
			cancelExpandOrRenewSession();
			if (hasConsent === false && sessionCache) delete sessionCache.anonymousId;
			sessionStoreStrategy.expireSession(sessionCache);
			synchronizeSession(getExpiredSessionState(sessionCache, configuration));
		},
		stop: () => {
			clearInterval(watchSessionTimeoutId);
		},
		updateSessionState
	};
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-core@6.33.0/node_modules/@datadog/browser-core/esm/domain/trackingConsent.js
var TrackingConsent = {
	GRANTED: "granted",
	NOT_GRANTED: "not-granted"
};
function createTrackingConsentState(currentConsent) {
	const observable = new Observable();
	return {
		tryToInit(trackingConsent) {
			if (!currentConsent) currentConsent = trackingConsent;
		},
		update(trackingConsent) {
			currentConsent = trackingConsent;
			observable.notify();
		},
		isGranted() {
			return currentConsent === TrackingConsent.GRANTED;
		},
		observable
	};
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-core@6.33.0/node_modules/@datadog/browser-core/esm/tools/utils/typeUtils.js
/**
* Similar to `typeof`, but distinguish plain objects from `null` and arrays
*/
function getType(value) {
	if (value === null) return "null";
	if (Array.isArray(value)) return "array";
	return typeof value;
}
/**
* Checks whether a value can have properties. Use this when you have an unknown value and you want
* to access its properties as unknown. This is a friendly solution for dealing with unknown objects
* in TypeScript.
*
* This function is intended to be used on values that will be used as "plain objects", i.e. not
* Array, Date, RegExp or other class instances. But it's safe to use on any value.
*
* @example
* ```
* // Before:
* if (typeof value === 'object' && value !== null && 'property' in value && typeof value.property === 'string') {
*   // use value.property
* }
* // After:
* if (isIndexableObject(value) && typeof value.property === 'string') {
*   // use value.property
* }
* ```
*/
function isIndexableObject(value) {
	return getType(value) === "object";
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-core@6.33.0/node_modules/@datadog/browser-core/esm/tools/matchOption.js
function isMatchOption(item) {
	const itemType = getType(item);
	return itemType === "string" || itemType === "function" || item instanceof RegExp;
}
/**
* Returns true if value can be matched by at least one of the provided MatchOptions.
* When comparing strings, setting useStartsWith to true will compare the value with the start of
* the option, instead of requiring an exact match.
*/
function matchList(list, value, useStartsWith = false) {
	return list.some((item) => {
		try {
			if (typeof item === "function") return item(value);
			else if (item instanceof RegExp) {
				item.lastIndex = 0;
				return item.test(value);
			} else if (typeof item === "string") return useStartsWith ? value.startsWith(item) : item === value;
		} catch (e) {
			display.error(e);
		}
		return false;
	});
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-core@6.33.0/node_modules/@datadog/browser-core/esm/tools/mockable.js
/**
* Wraps a value to make it mockable in tests. In production builds, this is a no-op
* that returns the value as-is. In test builds, it checks if a mock replacement has
* been registered and returns that instead.
*
* @example
* // In source file:
* import { mockable } from '../tools/mockable'
* export function formatNavigationEntry(): string {
*   const navigationEntry = mockable(getNavigationEntry)()
*   ...
* }
*
* // In test file:
* import { replaceMockable } from '@datadog/browser-core/test'
* it('...', () => {
*   replaceMockable(getNavigationEntry, () => FAKE_NAVIGATION_ENTRY)
*   expect(formatNavigationEntry()).toEqual(...)
* })
*/
function mockable(value) {
	return value;
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-core@6.33.0/node_modules/@datadog/browser-core/esm/domain/extension/extensionUtils.js
var EXTENSION_PREFIXES = ["chrome-extension://", "moz-extension://"];
function containsExtensionUrl(str) {
	return EXTENSION_PREFIXES.some((prefix) => str.includes(prefix));
}
/**
* Utility function to detect if the SDK is being initialized in an unsupported browser extension environment.
*
* @param windowLocation - The current window location to check
* @param stack - The error stack to check for extension URLs
* @returns true if running in an unsupported browser extension environment
*/
function isUnsupportedExtensionEnvironment(windowLocation, stack = "") {
	if (containsExtensionUrl(windowLocation)) return false;
	return containsExtensionUrl(stack.split("\n").filter((line) => {
		const trimmedLine = line.trim();
		return trimmedLine.length && /^at\s+|@/.test(trimmedLine);
	})[1] || "");
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-core@6.33.0/node_modules/@datadog/browser-core/esm/domain/allowedTrackingOrigins.js
var ERROR_DOES_NOT_HAVE_ALLOWED_TRACKING_ORIGIN = "Running the Browser SDK in a Web extension content script is forbidden unless the `allowedTrackingOrigins` option is provided.";
var ERROR_NOT_ALLOWED_TRACKING_ORIGIN = "SDK initialized on a non-allowed domain.";
function isAllowedTrackingOrigins(configuration, errorStack) {
	const location = mockable(getGlobalObject().location);
	const windowOrigin = location ? location.origin : "";
	const allowedTrackingOrigins = configuration.allowedTrackingOrigins;
	if (!allowedTrackingOrigins) {
		if (isUnsupportedExtensionEnvironment(windowOrigin, errorStack)) {
			display.error(ERROR_DOES_NOT_HAVE_ALLOWED_TRACKING_ORIGIN);
			return false;
		}
		return true;
	}
	const isAllowed = matchList(allowedTrackingOrigins, windowOrigin);
	if (!isAllowed) display.error(ERROR_NOT_ALLOWED_TRACKING_ORIGIN);
	return isAllowed;
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-core@6.33.0/node_modules/@datadog/browser-core/esm/domain/intakeSites.js
var INTAKE_SITE_STAGING = "datad0g.com";
var INTAKE_SITE_US1 = "datadoghq.com";
var INTAKE_SITE_EU1 = "datadoghq.eu";
var INTAKE_SITE_US1_FED = "ddog-gov.com";
var INTAKE_SITE_US2_FED = "us2.ddog-gov.com";
var PCI_INTAKE_HOST_US1 = "pci.browser-intake-datadoghq.com";
var INTAKE_URL_PARAMETERS = [
	"ddsource",
	"dd-api-key",
	"dd-request-id"
];
//#endregion
//#region node_modules/.pnpm/@datadog+browser-core@6.33.0/node_modules/@datadog/browser-core/esm/domain/configuration/endpointBuilder.js
function createEndpointBuilder(initConfiguration, trackType, extraParameters) {
	const buildUrlWithParameters = createEndpointUrlWithParametersBuilder(initConfiguration, trackType);
	return {
		build(api, payload) {
			const parameters = buildEndpointParameters(initConfiguration, trackType, api, payload, extraParameters);
			return buildUrlWithParameters(parameters);
		},
		trackType
	};
}
/**
* Create a function used to build a full endpoint url from provided parameters. The goal of this
* function is to pre-compute some parts of the URL to avoid re-computing everything on every
* request, as only parameters are changing.
*/
function createEndpointUrlWithParametersBuilder(initConfiguration, trackType) {
	const path = `/api/v2/${trackType}`;
	const proxy = initConfiguration.proxy;
	if (typeof proxy === "string") {
		const normalizedProxyUrl = normalizeUrl(proxy);
		return (parameters) => `${normalizedProxyUrl}?ddforward=${encodeURIComponent(`${path}?${parameters}`)}`;
	}
	if (typeof proxy === "function") return (parameters) => proxy({
		path,
		parameters
	});
	const host = buildEndpointHost(trackType, initConfiguration);
	return (parameters) => `https://${host}${path}?${parameters}`;
}
function buildEndpointHost(trackType, initConfiguration) {
	const { site = INTAKE_SITE_US1, internalAnalyticsSubdomain } = initConfiguration;
	if (trackType === "logs" && initConfiguration.usePciIntake && site === "datadoghq.com") return PCI_INTAKE_HOST_US1;
	if (internalAnalyticsSubdomain && site === "datadoghq.com") return `${internalAnalyticsSubdomain}.${INTAKE_SITE_US1}`;
	if (site === "dd0g-gov.com") return `http-intake.logs.${site}`;
	const domainParts = site.split(".");
	const extension = domainParts.pop();
	return `browser-intake-${domainParts.join("-")}.${extension}`;
}
/**
* Build parameters to be used for an intake request. Parameters should be re-built for each
* request, as they change randomly.
*/
function buildEndpointParameters({ clientToken, internalAnalyticsSubdomain, source = "browser" }, trackType, api, { retry, encoding }, extraParameters = []) {
	const parameters = [
		`ddsource=${source}`,
		`dd-api-key=${clientToken}`,
		`dd-evp-origin-version=${encodeURIComponent("6.33.0")}`,
		"dd-evp-origin=browser",
		`dd-request-id=${generateUUID()}`
	].concat(extraParameters);
	if (encoding) parameters.push(`dd-evp-encoding=${encoding}`);
	if (trackType === "rum") {
		parameters.push(`batch_time=${timeStampNow()}`, `_dd.api=${api}`);
		if (retry) parameters.push(`_dd.retry_count=${retry.count}`, `_dd.retry_after=${retry.lastFailureStatus}`);
	}
	if (internalAnalyticsSubdomain) parameters.reverse();
	return parameters.join("&");
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-core@6.33.0/node_modules/@datadog/browser-core/esm/domain/configuration/transportConfiguration.js
function computeTransportConfiguration(initConfiguration) {
	const site = initConfiguration.site || "datadoghq.com";
	const source = validateSource(initConfiguration.source);
	const endpointBuilders = computeEndpointBuilders({
		...initConfiguration,
		site,
		source
	});
	return {
		replica: computeReplicaConfiguration({
			...initConfiguration,
			site,
			source
		}),
		site,
		source,
		...endpointBuilders
	};
}
function validateSource(source) {
	if (source === "flutter" || source === "unity") return source;
	return "browser";
}
function computeEndpointBuilders(initConfiguration) {
	return {
		logsEndpointBuilder: createEndpointBuilder(initConfiguration, "logs"),
		rumEndpointBuilder: createEndpointBuilder(initConfiguration, "rum"),
		profilingEndpointBuilder: createEndpointBuilder(initConfiguration, "profile"),
		sessionReplayEndpointBuilder: createEndpointBuilder(initConfiguration, "replay"),
		exposuresEndpointBuilder: createEndpointBuilder(initConfiguration, "exposures"),
		flagEvaluationEndpointBuilder: createEndpointBuilder(initConfiguration, "flagevaluation")
	};
}
function computeReplicaConfiguration(initConfiguration) {
	if (!initConfiguration.replica) return;
	const replicaConfiguration = {
		...initConfiguration,
		site: INTAKE_SITE_US1,
		clientToken: initConfiguration.replica.clientToken
	};
	return {
		logsEndpointBuilder: createEndpointBuilder(replicaConfiguration, "logs"),
		rumEndpointBuilder: createEndpointBuilder(replicaConfiguration, "rum", [`application.id=${initConfiguration.replica.applicationId}`])
	};
}
function isIntakeUrl(url) {
	return INTAKE_URL_PARAMETERS.every((param) => url.includes(param));
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-core@6.33.0/node_modules/@datadog/browser-core/esm/domain/configuration/configuration.js
/**
* Default privacy level for the browser SDK.
*
* [Replay Privacy Options](https://docs.datadoghq.com/real_user_monitoring/session_replay/browser/privacy_options) for further information.
*/
var DefaultPrivacyLevel = {
	ALLOW: "allow",
	MASK: "mask",
	MASK_USER_INPUT: "mask-user-input",
	MASK_UNLESS_ALLOWLISTED: "mask-unless-allowlisted"
};
/**
* Trace context injection option.
*
* See [Connect RUM and Traces](https://docs.datadoghq.com/real_user_monitoring/platform/connect_rum_and_traces/?tab=browserrum) for further information.
*/
var TraceContextInjection = {
	ALL: "all",
	SAMPLED: "sampled"
};
function isString(tag, tagName) {
	if (tag !== void 0 && tag !== null && typeof tag !== "string") {
		display.error(`${tagName} must be defined as a string`);
		return false;
	}
	return true;
}
function isDatadogSite(site) {
	if (site && typeof site === "string" && !/(datadog|ddog|datad0g|dd0g)/.test(site)) {
		display.error(`Site should be a valid Datadog site. ${MORE_DETAILS} ${DOCS_ORIGIN}/getting_started/site/.`);
		return false;
	}
	return true;
}
function isSampleRate(sampleRate, name) {
	if (sampleRate !== void 0 && !isPercentage(sampleRate)) {
		display.error(`${name} Sample Rate should be a number between 0 and 100`);
		return false;
	}
	return true;
}
function validateAndBuildConfiguration(initConfiguration, errorStack) {
	var _a;
	var _b;
	var _c;
	var _d;
	var _e;
	var _f;
	var _g;
	var _h;
	var _j;
	var _k;
	if (!initConfiguration || !initConfiguration.clientToken) {
		display.error("Client Token is not configured, we will not send any data.");
		return;
	}
	if (initConfiguration.allowedTrackingOrigins !== void 0 && !Array.isArray(initConfiguration.allowedTrackingOrigins)) {
		display.error("Allowed Tracking Origins must be an array");
		return;
	}
	if (!isDatadogSite(initConfiguration.site) || !isSampleRate(initConfiguration.sessionSampleRate, "Session") || !isSampleRate(initConfiguration.telemetrySampleRate, "Telemetry") || !isSampleRate(initConfiguration.telemetryConfigurationSampleRate, "Telemetry Configuration") || !isSampleRate(initConfiguration.telemetryUsageSampleRate, "Telemetry Usage") || !isString(initConfiguration.version, "Version") || !isString(initConfiguration.env, "Env") || !isString(initConfiguration.service, "Service") || !isAllowedTrackingOrigins(initConfiguration, errorStack !== null && errorStack !== void 0 ? errorStack : "")) return;
	if (initConfiguration.trackingConsent !== void 0 && !objectHasValue(TrackingConsent, initConfiguration.trackingConsent)) {
		display.error("Tracking Consent should be either \"granted\" or \"not-granted\"");
		return;
	}
	return {
		beforeSend: initConfiguration.beforeSend && catchUserErrors(initConfiguration.beforeSend, "beforeSend threw an error:"),
		sessionStoreStrategyType: isWorkerEnvironment ? void 0 : selectSessionStoreStrategyType(initConfiguration),
		sessionSampleRate: (_a = initConfiguration.sessionSampleRate) !== null && _a !== void 0 ? _a : 100,
		telemetrySampleRate: (_b = initConfiguration.telemetrySampleRate) !== null && _b !== void 0 ? _b : 20,
		telemetryConfigurationSampleRate: (_c = initConfiguration.telemetryConfigurationSampleRate) !== null && _c !== void 0 ? _c : 5,
		telemetryUsageSampleRate: (_d = initConfiguration.telemetryUsageSampleRate) !== null && _d !== void 0 ? _d : 5,
		service: (_e = initConfiguration.service) !== null && _e !== void 0 ? _e : void 0,
		env: (_f = initConfiguration.env) !== null && _f !== void 0 ? _f : void 0,
		version: (_g = initConfiguration.version) !== null && _g !== void 0 ? _g : void 0,
		datacenter: (_h = initConfiguration.datacenter) !== null && _h !== void 0 ? _h : void 0,
		silentMultipleInit: !!initConfiguration.silentMultipleInit,
		allowUntrustedEvents: !!initConfiguration.allowUntrustedEvents,
		trackingConsent: (_j = initConfiguration.trackingConsent) !== null && _j !== void 0 ? _j : TrackingConsent.GRANTED,
		trackAnonymousUser: (_k = initConfiguration.trackAnonymousUser) !== null && _k !== void 0 ? _k : true,
		storeContextsAcrossPages: !!initConfiguration.storeContextsAcrossPages,
		betaEncodeCookieOptions: !!initConfiguration.betaEncodeCookieOptions,
		/**
		* The source of the SDK, used for support plugins purposes.
		*/
		variant: initConfiguration.variant,
		sdkVersion: initConfiguration.sdkVersion,
		...computeTransportConfiguration(initConfiguration)
	};
}
function serializeConfiguration(initConfiguration) {
	return {
		session_sample_rate: initConfiguration.sessionSampleRate,
		telemetry_sample_rate: initConfiguration.telemetrySampleRate,
		telemetry_configuration_sample_rate: initConfiguration.telemetryConfigurationSampleRate,
		telemetry_usage_sample_rate: initConfiguration.telemetryUsageSampleRate,
		use_before_send: !!initConfiguration.beforeSend,
		use_partitioned_cross_site_session_cookie: initConfiguration.usePartitionedCrossSiteSessionCookie,
		use_secure_session_cookie: initConfiguration.useSecureSessionCookie,
		use_proxy: !!initConfiguration.proxy,
		silent_multiple_init: initConfiguration.silentMultipleInit,
		track_session_across_subdomains: initConfiguration.trackSessionAcrossSubdomains,
		track_anonymous_user: initConfiguration.trackAnonymousUser,
		session_persistence: Array.isArray(initConfiguration.sessionPersistence) ? initConfiguration.sessionPersistence[0] : initConfiguration.sessionPersistence,
		allow_fallback_to_local_storage: !!initConfiguration.allowFallbackToLocalStorage,
		store_contexts_across_pages: !!initConfiguration.storeContextsAcrossPages,
		allow_untrusted_events: !!initConfiguration.allowUntrustedEvents,
		tracking_consent: initConfiguration.trackingConsent,
		use_allowed_tracking_origins: Array.isArray(initConfiguration.allowedTrackingOrigins),
		beta_encode_cookie_options: initConfiguration.betaEncodeCookieOptions,
		source: initConfiguration.source,
		sdk_version: initConfiguration.sdkVersion,
		variant: initConfiguration.variant
	};
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-core@6.33.0/node_modules/@datadog/browser-core/esm/tools/experimentalFeatures.js
/**
* LIMITATION:
* For NPM setup, this feature flag singleton is shared between RUM and Logs product.
* This means that an experimental flag set on the RUM product will be set on the Logs product.
* So keep in mind that in certain configurations, your experimental feature flag may affect other products.
*
* FORMAT:
* All feature flags should be snake_cased
*/
var ExperimentalFeature;
(function(ExperimentalFeature) {
	ExperimentalFeature["TRACK_INTAKE_REQUESTS"] = "track_intake_requests";
	ExperimentalFeature["USE_TREE_WALKER_FOR_ACTION_NAME"] = "use_tree_walker_for_action_name";
	ExperimentalFeature["FEATURE_OPERATION_VITAL"] = "feature_operation_vital";
	ExperimentalFeature["START_STOP_ACTION"] = "start_stop_action";
	ExperimentalFeature["START_STOP_RESOURCE"] = "start_stop_resource";
	ExperimentalFeature["USE_CHANGE_RECORDS"] = "use_change_records";
	ExperimentalFeature["USE_INCREMENTAL_CHANGE_RECORDS"] = "use_incremental_change_records";
	ExperimentalFeature["TOO_MANY_REQUESTS_INVESTIGATION"] = "too_many_requests_investigation";
	ExperimentalFeature["TRACK_RESOURCE_HEADERS"] = "track_resource_headers";
})(ExperimentalFeature || (ExperimentalFeature = {}));
var enabledExperimentalFeatures = /* @__PURE__ */ new Set();
function initFeatureFlags(enableExperimentalFeatures) {
	if (Array.isArray(enableExperimentalFeatures)) addExperimentalFeatures(enableExperimentalFeatures.filter((flag) => objectHasValue(ExperimentalFeature, flag)));
}
function addExperimentalFeatures(enabledFeatures) {
	enabledFeatures.forEach((flag) => {
		enabledExperimentalFeatures.add(flag);
	});
}
function isExperimentalFeatureEnabled(featureName) {
	return enabledExperimentalFeatures.has(featureName);
}
function getExperimentalFeatures() {
	return enabledExperimentalFeatures;
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-core@6.33.0/node_modules/@datadog/browser-core/esm/tools/stackTrace/computeStackTrace.js
/**
* Cross-browser stack trace computation.
*
* Reference implementation: https://github.com/csnover/TraceKit/blob/04530298073c3823de72deb0b97e7b38ca7bcb59/tracekit.js
*/
var UNKNOWN_FUNCTION = "?";
function computeStackTrace(ex) {
	var _a;
	var _b;
	const stack = [];
	let stackProperty = tryToGetString(ex, "stack");
	const exString = String(ex);
	if (stackProperty && stackProperty.startsWith(exString)) stackProperty = stackProperty.slice(exString.length);
	if (stackProperty) stackProperty.split("\n").forEach((line) => {
		const stackFrame = parseChromeLine(line) || parseChromeAnonymousLine(line) || parseWinLine(line) || parseGeckoLine(line);
		if (stackFrame) {
			if (!stackFrame.func && stackFrame.line) stackFrame.func = UNKNOWN_FUNCTION;
			stack.push(stackFrame);
		}
	});
	if (stack.length > 0 && isWronglyReportingCustomErrors() && ex instanceof Error) {
		const constructors = [];
		let currentPrototype = ex;
		while ((currentPrototype = Object.getPrototypeOf(currentPrototype)) && isNonNativeClassPrototype(currentPrototype)) {
			const constructorName = ((_a = currentPrototype.constructor) === null || _a === void 0 ? void 0 : _a.name) || UNKNOWN_FUNCTION;
			constructors.push(constructorName);
		}
		for (let i = constructors.length - 1; i >= 0 && ((_b = stack[0]) === null || _b === void 0 ? void 0 : _b.func) === constructors[i]; i--) stack.shift();
	}
	return {
		message: tryToGetString(ex, "message"),
		name: tryToGetString(ex, "name"),
		stack
	};
}
var fileUrl = "((?:file|https?|blob|chrome-extension|electron|native|eval|webpack|snippet|<anonymous>|\\w+\\.|\\/).*?)";
var filePosition = "(?::(\\d+))";
var CHROME_LINE_RE = new RegExp(`^\\s*at (.*?) ?\\(${fileUrl}${filePosition}?${filePosition}?\\)?\\s*$`, "i");
var CHROME_EVAL_RE = new RegExp(`\\((\\S*)${filePosition}${filePosition}\\)`);
function parseChromeLine(line) {
	const parts = CHROME_LINE_RE.exec(line);
	if (!parts) return;
	const isNative = parts[2] && parts[2].indexOf("native") === 0;
	const isEval = parts[2] && parts[2].indexOf("eval") === 0;
	const submatch = CHROME_EVAL_RE.exec(parts[2]);
	if (isEval && submatch) {
		parts[2] = submatch[1];
		parts[3] = submatch[2];
		parts[4] = submatch[3];
	}
	return {
		args: isNative ? [parts[2]] : [],
		column: parts[4] ? +parts[4] : void 0,
		func: parts[1] || UNKNOWN_FUNCTION,
		line: parts[3] ? +parts[3] : void 0,
		url: !isNative ? parts[2] : void 0
	};
}
var CHROME_ANONYMOUS_FUNCTION_RE = new RegExp(`^\\s*at\\s*(?:(.*)?(?: @))?\\s*${fileUrl}${filePosition}?${filePosition}??\\s*$`, "i");
function parseChromeAnonymousLine(line) {
	const parts = CHROME_ANONYMOUS_FUNCTION_RE.exec(line);
	if (!parts) return;
	return {
		args: [],
		column: parts[4] ? +parts[4] : void 0,
		func: parts[1] || UNKNOWN_FUNCTION,
		line: parts[3] ? +parts[3] : void 0,
		url: parts[2]
	};
}
var WINJS_LINE_RE = /^\s*at (?:((?:\[object object\])?.+) )?\(?((?:file|ms-appx|https?|webpack|blob):.*?):(\d+)(?::(\d+))?\)?\s*$/i;
function parseWinLine(line) {
	const parts = WINJS_LINE_RE.exec(line);
	if (!parts) return;
	return {
		args: [],
		column: parts[4] ? +parts[4] : void 0,
		func: parts[1] || UNKNOWN_FUNCTION,
		line: +parts[3],
		url: parts[2]
	};
}
var GECKO_LINE_RE = /^\s*(.*?)(?:\((.*?)\))?(?:(?:(?:^|@)((?:file|https?|blob|chrome|webpack|resource|capacitor|\[native).*?|[^@]*bundle|\[wasm code\])(?::(\d+))?(?::(\d+))?)|@)\s*$/i;
var GECKO_EVAL_RE = /(\S+) line (\d+)(?: > eval line \d+)* > eval/i;
function parseGeckoLine(line) {
	const parts = GECKO_LINE_RE.exec(line);
	if (!parts) return;
	const isEval = parts[3] && parts[3].indexOf(" > eval") > -1;
	const submatch = GECKO_EVAL_RE.exec(parts[3]);
	if (isEval && submatch) {
		parts[3] = submatch[1];
		parts[4] = submatch[2];
		parts[5] = void 0;
	}
	return {
		args: parts[2] ? parts[2].split(",") : [],
		column: parts[5] ? +parts[5] : void 0,
		func: parts[1] || UNKNOWN_FUNCTION,
		line: parts[4] ? +parts[4] : void 0,
		url: parts[3]
	};
}
function tryToGetString(candidate, property) {
	return isIndexableObject(candidate) && typeof candidate[property] === "string" ? candidate[property] : void 0;
}
function computeStackTraceFromOnErrorMessage(messageObj, url, line, column) {
	if (url === void 0) return;
	const { name, message } = tryToParseMessage(messageObj);
	return {
		name,
		message,
		stack: [{
			url,
			column,
			line
		}]
	};
}
var ERROR_TYPES_RE = /^(?:[Uu]ncaught (?:exception: )?)?(?:((?:Eval|Internal|Range|Reference|Syntax|Type|URI|)Error): )?([\s\S]*)$/;
function tryToParseMessage(messageObj) {
	let name;
	let message;
	if ({}.toString.call(messageObj) === "[object String]") [, name, message] = ERROR_TYPES_RE.exec(messageObj);
	return {
		name,
		message
	};
}
function isNonNativeClassPrototype(prototype) {
	return String(prototype.constructor).startsWith("class ");
}
var isWronglyReportingCustomErrorsCache;
function isWronglyReportingCustomErrors() {
	if (isWronglyReportingCustomErrorsCache !== void 0) return isWronglyReportingCustomErrorsCache;
	class DatadogTestCustomError extends Error {
		constructor() {
			super();
			this.name = "Error";
		}
	}
	const [customError, nativeError] = [DatadogTestCustomError, Error].map((errConstructor) => new errConstructor());
	isWronglyReportingCustomErrorsCache = isNonNativeClassPrototype(Object.getPrototypeOf(customError)) && nativeError.stack !== customError.stack;
	return isWronglyReportingCustomErrorsCache;
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-core@6.33.0/node_modules/@datadog/browser-core/esm/tools/stackTrace/handlingStack.js
/**
* Creates a stacktrace without SDK internal frames.
* Constraints:
* - Has to be called at the utmost position of the call stack.
* - No monitored function should encapsulate it, that is why we need to use callMonitored inside it.
*/
function createHandlingStack(type) {
	/**
	* Skip the two internal frames:
	* - SDK API (console.error, ...)
	* - this function
	* in order to keep only the user calls
	*/
	const internalFramesToSkip = 2;
	const error = new Error(type);
	error.name = "HandlingStack";
	let formattedStack;
	callMonitored(() => {
		const stackTrace = computeStackTrace(error);
		stackTrace.stack = stackTrace.stack.slice(internalFramesToSkip);
		formattedStack = toStackTraceString(stackTrace);
	});
	return formattedStack;
}
function toStackTraceString(stack) {
	let result = formatErrorMessage(stack);
	stack.stack.forEach((frame) => {
		const func = frame.func === "?" ? "<anonymous>" : frame.func;
		const args = frame.args && frame.args.length > 0 ? `(${frame.args.join(", ")})` : "";
		const line = frame.line ? `:${frame.line}` : "";
		const column = frame.line && frame.column ? `:${frame.column}` : "";
		result += `\n  at ${func}${args} @ ${frame.url}${line}${column}`;
	});
	return result;
}
function formatErrorMessage(stack) {
	return `${stack.name || "Error"}: ${stack.message}`;
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-core@6.33.0/node_modules/@datadog/browser-core/esm/tools/instrumentMethod.js
/**
* Instruments a method on a object, calling the given callback before the original method is
* invoked. The callback receives an object with information about the method call.
*
* This function makes sure that we are "good citizens" regarding third party instrumentations: when
* removing the instrumentation, the original method is usually restored, but if a third party
* instrumentation was set after ours, we keep it in place and just replace our instrumentation with
* a noop.
*
* Note: it is generally better to instrument methods that are "owned" by the object instead of ones
* that are inherited from the prototype chain. Example:
* * do:    `instrumentMethod(Array.prototype, 'push', ...)`
* * don't: `instrumentMethod([], 'push', ...)`
*
* This method is also used to set event handler properties (ex: window.onerror = ...), as it has
* the same requirements as instrumenting a method:
* * if the event handler is already set by a third party, we need to call it and not just blindly
* override it.
* * if the event handler is set by a third party after us, we need to keep it in place when
* removing ours.
*
* @example
*
*  instrumentMethod(window, 'fetch', ({ target, parameters, onPostCall }) => {
*    console.log('Before calling fetch on', target, 'with parameters', parameters)
*
*    onPostCall((result) => {
*      console.log('After fetch calling on', target, 'with parameters', parameters, 'and result', result)
*    })
*  })
*/
function instrumentMethod(targetPrototype, method, onPreCall, { computeHandlingStack } = {}) {
	let original = targetPrototype[method];
	if (typeof original !== "function") {
		if (method in targetPrototype && typeof method === "string" && method.startsWith("on")) original = noop;
		else return { stop: noop };
	}
	let stopped = false;
	const instrumentation = function() {
		if (stopped) return original.apply(this, arguments);
		const parameters = Array.from(arguments);
		let postCallCallback;
		callMonitored(onPreCall, null, [{
			target: this,
			parameters,
			onPostCall: (callback) => {
				postCallCallback = callback;
			},
			handlingStack: computeHandlingStack ? createHandlingStack("instrumented method") : void 0
		}]);
		const result = original.apply(this, parameters);
		if (postCallCallback) callMonitored(postCallCallback, null, [result]);
		return result;
	};
	targetPrototype[method] = instrumentation;
	return { stop: () => {
		stopped = true;
		if (targetPrototype[method] === instrumentation) targetPrototype[method] = original;
	} };
}
function instrumentSetter(targetPrototype, property, after) {
	const originalDescriptor = Object.getOwnPropertyDescriptor(targetPrototype, property);
	if (!originalDescriptor || !originalDescriptor.set || !originalDescriptor.configurable) return { stop: noop };
	const stoppedInstrumentation = noop;
	let instrumentation = (target, value) => {
		setTimeout(() => {
			if (instrumentation !== stoppedInstrumentation) after(target, value);
		}, 0);
	};
	const instrumentationWrapper = function(value) {
		originalDescriptor.set.call(this, value);
		instrumentation(this, value);
	};
	Object.defineProperty(targetPrototype, property, { set: instrumentationWrapper });
	return { stop: () => {
		var _a;
		if (((_a = Object.getOwnPropertyDescriptor(targetPrototype, property)) === null || _a === void 0 ? void 0 : _a.set) === instrumentationWrapper) Object.defineProperty(targetPrototype, property, originalDescriptor);
		instrumentation = stoppedInstrumentation;
	} };
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-core@6.33.0/node_modules/@datadog/browser-core/esm/tools/utils/byteUtils.js
var ONE_KIBI_BYTE = 1024;
var ONE_MEBI_BYTE = 1024 * ONE_KIBI_BYTE;
var HAS_MULTI_BYTES_CHARACTERS = /[^\u0000-\u007F]/;
function computeBytesCount(candidate) {
	if (!HAS_MULTI_BYTES_CHARACTERS.test(candidate)) return candidate.length;
	if (window.TextEncoder !== void 0) return new TextEncoder().encode(candidate).length;
	return new Blob([candidate]).size;
}
function concatBuffers(buffers) {
	if (buffers.length === 1) return buffers[0];
	const length = buffers.reduce((total, buffer) => total + buffer.length, 0);
	const result = new Uint8Array(length);
	let offset = 0;
	for (const buffer of buffers) {
		result.set(buffer, offset);
		offset += buffer.length;
	}
	return result;
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-core@6.33.0/node_modules/@datadog/browser-core/esm/tools/serialisation/jsonStringify.js
/**
* Custom implementation of JSON.stringify that ignores some toJSON methods. We need to do that
* because some sites badly override toJSON on certain objects. Removing all toJSON methods from
* nested values would be too costly, so we just detach them from the root value, and native classes
* used to build JSON values (Array and Object).
*
* Note: this still assumes that JSON.stringify is correct.
*/
function jsonStringify(value, replacer, space) {
	if (typeof value !== "object" || value === null) return JSON.stringify(value);
	const restoreObjectPrototypeToJson = detachToJsonMethod(Object.prototype);
	const restoreArrayPrototypeToJson = detachToJsonMethod(Array.prototype);
	const restoreValuePrototypeToJson = detachToJsonMethod(Object.getPrototypeOf(value));
	const restoreValueToJson = detachToJsonMethod(value);
	try {
		return JSON.stringify(value, replacer, space);
	} catch (_a) {
		return "<error: unable to serialize object>";
	} finally {
		restoreObjectPrototypeToJson();
		restoreArrayPrototypeToJson();
		restoreValuePrototypeToJson();
		restoreValueToJson();
	}
}
function detachToJsonMethod(value) {
	const object = value;
	const objectToJson = object.toJSON;
	if (objectToJson) {
		delete object.toJSON;
		return () => {
			object.toJSON = objectToJson;
		};
	}
	return noop;
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-core@6.33.0/node_modules/@datadog/browser-core/esm/tools/serialisation/sanitize.js
var SANITIZE_DEFAULT_MAX_CHARACTER_COUNT = 220 * ONE_KIBI_BYTE;
var JSON_PATH_ROOT_ELEMENT = "$";
var KEY_DECORATION_LENGTH = 3;
function sanitize(source, maxCharacterCount = SANITIZE_DEFAULT_MAX_CHARACTER_COUNT) {
	const restoreObjectPrototypeToJson = detachToJsonMethod(Object.prototype);
	const restoreArrayPrototypeToJson = detachToJsonMethod(Array.prototype);
	const containerQueue = [];
	const visitedObjectsWithPath = /* @__PURE__ */ new WeakMap();
	const sanitizedData = sanitizeProcessor(source, JSON_PATH_ROOT_ELEMENT, void 0, containerQueue, visitedObjectsWithPath);
	const serializedSanitizedData = JSON.stringify(sanitizedData);
	let accumulatedCharacterCount = serializedSanitizedData ? serializedSanitizedData.length : 0;
	if (accumulatedCharacterCount > maxCharacterCount) {
		warnOverCharacterLimit(maxCharacterCount, "discarded", source);
		return;
	}
	while (containerQueue.length > 0 && accumulatedCharacterCount < maxCharacterCount) {
		const containerToProcess = containerQueue.shift();
		let separatorLength = 0;
		if (Array.isArray(containerToProcess.source)) for (let key = 0; key < containerToProcess.source.length; key++) {
			const targetData = sanitizeProcessor(containerToProcess.source[key], containerToProcess.path, key, containerQueue, visitedObjectsWithPath);
			if (targetData !== void 0) accumulatedCharacterCount += JSON.stringify(targetData).length;
			else accumulatedCharacterCount += 4;
			accumulatedCharacterCount += separatorLength;
			separatorLength = 1;
			if (accumulatedCharacterCount > maxCharacterCount) {
				warnOverCharacterLimit(maxCharacterCount, "truncated", source);
				break;
			}
			containerToProcess.target[key] = targetData;
		}
		else for (const key in containerToProcess.source) if (Object.prototype.hasOwnProperty.call(containerToProcess.source, key)) {
			const targetData = sanitizeProcessor(containerToProcess.source[key], containerToProcess.path, key, containerQueue, visitedObjectsWithPath);
			if (targetData !== void 0) {
				accumulatedCharacterCount += JSON.stringify(targetData).length + separatorLength + key.length + KEY_DECORATION_LENGTH;
				separatorLength = 1;
			}
			if (accumulatedCharacterCount > maxCharacterCount) {
				warnOverCharacterLimit(maxCharacterCount, "truncated", source);
				break;
			}
			containerToProcess.target[key] = targetData;
		}
	}
	restoreObjectPrototypeToJson();
	restoreArrayPrototypeToJson();
	return sanitizedData;
}
/**
* Internal function to factorize the process common to the
* initial call to sanitize, and iterations for Arrays and Objects
*
*/
function sanitizeProcessor(source, parentPath, key, queue, visitedObjectsWithPath) {
	const sourceToSanitize = tryToApplyToJSON(source);
	if (!sourceToSanitize || typeof sourceToSanitize !== "object") return sanitizePrimitivesAndFunctions(sourceToSanitize);
	const sanitizedSource = sanitizeObjects(sourceToSanitize);
	if (sanitizedSource !== "[Object]" && sanitizedSource !== "[Array]" && sanitizedSource !== "[Error]") return sanitizedSource;
	const sourceAsObject = source;
	if (visitedObjectsWithPath.has(sourceAsObject)) return `[Reference seen at ${visitedObjectsWithPath.get(sourceAsObject)}]`;
	const currentPath = key !== void 0 ? `${parentPath}.${key}` : parentPath;
	const target = Array.isArray(sourceToSanitize) ? [] : {};
	visitedObjectsWithPath.set(sourceAsObject, currentPath);
	queue.push({
		source: sourceToSanitize,
		target,
		path: currentPath
	});
	return target;
}
/**
* Handles sanitization of simple, non-object types
*
*/
function sanitizePrimitivesAndFunctions(value) {
	if (typeof value === "bigint") return `[BigInt] ${value.toString()}`;
	if (typeof value === "function") return `[Function] ${value.name || "unknown"}`;
	if (typeof value === "symbol") return `[Symbol] ${value.description || value.toString()}`;
	return value;
}
/**
* Handles sanitization of object types
*
* LIMITATIONS
* - If a class defines a toStringTag Symbol, it will fall in the catch-all method and prevent enumeration of properties.
* To avoid this, a toJSON method can be defined.
*/
function sanitizeObjects(value) {
	try {
		if (value instanceof Event) return sanitizeEvent(value);
		if (value instanceof RegExp) return `[RegExp] ${value.toString()}`;
		const match = Object.prototype.toString.call(value).match(/\[object (.*)\]/);
		if (match && match[1]) return `[${match[1]}]`;
	} catch (_a) {}
	return "[Unserializable]";
}
function sanitizeEvent(event) {
	return {
		type: event.type,
		isTrusted: event.isTrusted,
		currentTarget: event.currentTarget ? sanitizeObjects(event.currentTarget) : null,
		target: event.target ? sanitizeObjects(event.target) : null
	};
}
/**
* Checks if a toJSON function exists and tries to execute it
*
*/
function tryToApplyToJSON(value) {
	const object = value;
	if (object && typeof object.toJSON === "function") try {
		return object.toJSON();
	} catch (_a) {}
	return value;
}
/**
* Helper function to display the warning when the accumulated character count is over the limit
*/
function warnOverCharacterLimit(maxCharacterCount, changeType, source) {
	display.warn(`The data provided has been ${changeType} as it is over the limit of ${maxCharacterCount} characters:`, source);
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-core@6.33.0/node_modules/@datadog/browser-core/esm/domain/error/error.js
var NO_ERROR_STACK_PRESENT_MESSAGE = "No stack, consider using an instance of Error";
function computeErrorBase({ originalError, stackTrace, source, useFallbackStack = true, nonErrorPrefix }) {
	const isErrorInstance = isError(originalError);
	if (!stackTrace && isErrorInstance) stackTrace = computeStackTrace(originalError);
	return {
		source,
		type: stackTrace ? stackTrace.name : void 0,
		message: computeMessage(stackTrace, isErrorInstance, nonErrorPrefix, originalError),
		stack: stackTrace ? toStackTraceString(stackTrace) : useFallbackStack ? NO_ERROR_STACK_PRESENT_MESSAGE : void 0
	};
}
function computeRawError({ stackTrace, originalError, handlingStack, componentStack, startClocks, nonErrorPrefix, useFallbackStack = true, source, handling }) {
	return {
		startClocks,
		handling,
		handlingStack,
		componentStack,
		originalError,
		...computeErrorBase({
			originalError,
			stackTrace,
			source,
			useFallbackStack,
			nonErrorPrefix
		}),
		causes: isError(originalError) ? flattenErrorCauses(originalError, source) : void 0,
		fingerprint: tryToGetFingerprint(originalError),
		context: tryToGetErrorContext(originalError)
	};
}
function computeMessage(stackTrace, isErrorInstance, nonErrorPrefix, originalError) {
	return (stackTrace === null || stackTrace === void 0 ? void 0 : stackTrace.message) && (stackTrace === null || stackTrace === void 0 ? void 0 : stackTrace.name) ? stackTrace.message : !isErrorInstance ? nonErrorPrefix ? `${nonErrorPrefix} ${jsonStringify(sanitize(originalError))}` : jsonStringify(sanitize(originalError)) : "Empty message";
}
function tryToGetFingerprint(originalError) {
	return isError(originalError) && "dd_fingerprint" in originalError ? String(originalError.dd_fingerprint) : void 0;
}
function tryToGetErrorContext(originalError) {
	if (isIndexableObject(originalError)) return originalError.dd_context;
}
function isError(error) {
	return error instanceof Error || Object.prototype.toString.call(error) === "[object Error]";
}
function flattenErrorCauses(error, parentSource) {
	const causes = [];
	let currentCause = error.cause;
	while (currentCause !== void 0 && currentCause !== null && causes.length < 10) {
		const causeBase = computeErrorBase({
			originalError: currentCause,
			source: parentSource,
			useFallbackStack: false
		});
		causes.push(causeBase);
		currentCause = isError(currentCause) ? currentCause.cause : void 0;
	}
	return causes.length ? causes : void 0;
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-core@6.33.0/node_modules/@datadog/browser-core/esm/domain/error/error.types.js
var ErrorSource = {
	AGENT: "agent",
	CONSOLE: "console",
	CUSTOM: "custom",
	LOGGER: "logger",
	NETWORK: "network",
	SOURCE: "source",
	REPORT: "report"
};
//#endregion
//#region node_modules/.pnpm/@datadog+browser-core@6.33.0/node_modules/@datadog/browser-core/esm/domain/error/trackRuntimeError.js
function trackRuntimeError() {
	return new Observable((observer) => {
		const handleRuntimeError = (originalError, stackTrace) => {
			const rawError = computeRawError({
				stackTrace,
				originalError,
				startClocks: clocksNow(),
				nonErrorPrefix: "Uncaught",
				source: ErrorSource.SOURCE,
				handling: "unhandled"
			});
			observer.notify(rawError);
		};
		const { stop: stopInstrumentingOnError } = instrumentOnError(handleRuntimeError);
		const { stop: stopInstrumentingOnUnhandledRejection } = instrumentUnhandledRejection(handleRuntimeError);
		return () => {
			stopInstrumentingOnError();
			stopInstrumentingOnUnhandledRejection();
		};
	});
}
function instrumentOnError(callback) {
	return instrumentMethod(getGlobalObject(), "onerror", ({ parameters: [messageObj, url, line, column, errorObj] }) => {
		let stackTrace;
		if (!isError(errorObj)) stackTrace = computeStackTraceFromOnErrorMessage(messageObj, url, line, column);
		callback(errorObj !== null && errorObj !== void 0 ? errorObj : messageObj, stackTrace);
	});
}
function instrumentUnhandledRejection(callback) {
	return instrumentMethod(getGlobalObject(), "onunhandledrejection", ({ parameters: [e] }) => {
		callback(e.reason || "Empty reason");
	});
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-core@6.33.0/node_modules/@datadog/browser-core/esm/boot/init.js
function makePublicApi(stub) {
	const publicApi = {
		version: "6.33.0",
		onReady(callback) {
			callback();
		},
		...stub
	};
	Object.defineProperty(publicApi, "_setDebug", {
		get() {
			return setDebugMode;
		},
		enumerable: false
	});
	return publicApi;
}
function defineGlobal(global, name, api) {
	const existingGlobalVariable = global[name];
	if (existingGlobalVariable && !existingGlobalVariable.q && existingGlobalVariable.version) display.warn("SDK is loaded more than once. This is unsupported and might have unexpected behavior.");
	global[name] = api;
	if (existingGlobalVariable && existingGlobalVariable.q) existingGlobalVariable.q.forEach((fn) => catchUserErrors(fn, "onReady callback threw an error:")());
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-core@6.33.0/node_modules/@datadog/browser-core/esm/boot/displayAlreadyInitializedError.js
function displayAlreadyInitializedError(sdkName, initConfiguration) {
	if (!initConfiguration.silentMultipleInit) display.error(`${sdkName} is already initialized.`);
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-core@6.33.0/node_modules/@datadog/browser-core/esm/browser/addEventListener.js
/**
* Add an event listener to an event target object (Window, Element, mock object...).  This provides
* a few conveniences compared to using `element.addEventListener` directly:
*
* * supports IE11 by: using an option object only if needed and emulating the `once` option
*
* * wraps the listener with a `monitor` function
*
* * returns a `stop` function to remove the listener
*/
function addEventListener(configuration, eventTarget, eventName, listener, options) {
	return addEventListeners(configuration, eventTarget, [eventName], listener, options);
}
/**
* Add event listeners to an event target object (Window, Element, mock object...).  This provides
* a few conveniences compared to using `element.addEventListener` directly:
*
* * supports IE11 by: using an option object only if needed and emulating the `once` option
*
* * wraps the listener with a `monitor` function
*
* * returns a `stop` function to remove the listener
*
* * with `once: true`, the listener will be called at most once, even if different events are listened
*/
function addEventListeners(configuration, eventTarget, eventNames, listener, { once, capture, passive } = {}) {
	const listenerWithMonitor = monitor((event) => {
		if (!event.isTrusted && !event.__ddIsTrusted && !configuration.allowUntrustedEvents) return;
		if (once) stop();
		listener(event);
	});
	const options = passive ? {
		capture,
		passive
	} : capture;
	const listenerTarget = window.EventTarget && eventTarget instanceof EventTarget ? window.EventTarget.prototype : eventTarget;
	const add = getZoneJsOriginalValue(listenerTarget, "addEventListener");
	eventNames.forEach((eventName) => add.call(eventTarget, eventName, listenerWithMonitor, options));
	function stop() {
		const remove = getZoneJsOriginalValue(listenerTarget, "removeEventListener");
		eventNames.forEach((eventName) => remove.call(eventTarget, eventName, listenerWithMonitor, options));
	}
	return { stop };
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-core@6.33.0/node_modules/@datadog/browser-core/esm/domain/report/reportObservable.js
var RawReportType = {
	intervention: "intervention",
	deprecation: "deprecation",
	cspViolation: "csp_violation"
};
function initReportObservable(configuration, apis) {
	const observables = [];
	if (apis.includes(RawReportType.cspViolation)) observables.push(createCspViolationReportObservable(configuration));
	const reportTypes = apis.filter((api) => api !== RawReportType.cspViolation);
	if (reportTypes.length) observables.push(createReportObservable(reportTypes));
	return mergeObservables(...observables);
}
function createReportObservable(reportTypes) {
	return new Observable((observable) => {
		if (!window.ReportingObserver) return;
		const handleReports = monitor((reports, _) => reports.forEach((report) => observable.notify(buildRawReportErrorFromReport(report))));
		const observer = new window.ReportingObserver(handleReports, {
			types: reportTypes,
			buffered: true
		});
		observer.observe();
		return () => {
			observer.disconnect();
		};
	});
}
function createCspViolationReportObservable(configuration) {
	return new Observable((observable) => {
		const { stop } = addEventListener(configuration, document, "securitypolicyviolation", (event) => {
			observable.notify(buildRawReportErrorFromCspViolation(event));
		});
		return stop;
	});
}
function buildRawReportErrorFromReport(report) {
	const { type, body } = report;
	return buildRawReportError({
		type: body.id,
		message: `${type}: ${body.message}`,
		originalError: report,
		stack: buildStack(body.id, body.message, body.sourceFile, body.lineNumber, body.columnNumber)
	});
}
function buildRawReportErrorFromCspViolation(event) {
	const message = `'${event.blockedURI}' blocked by '${event.effectiveDirective}' directive`;
	return buildRawReportError({
		type: event.effectiveDirective,
		message: `${RawReportType.cspViolation}: ${message}`,
		originalError: event,
		csp: { disposition: event.disposition },
		stack: buildStack(event.effectiveDirective, event.originalPolicy ? `${message} of the policy "${safeTruncate(event.originalPolicy, 100, "...")}"` : "no policy", event.sourceFile, event.lineNumber, event.columnNumber)
	});
}
function buildRawReportError(partial) {
	return {
		startClocks: clocksNow(),
		source: ErrorSource.REPORT,
		handling: "unhandled",
		...partial
	};
}
function buildStack(name, message, sourceFile, lineNumber, columnNumber) {
	return sourceFile ? toStackTraceString({
		name,
		message,
		stack: [{
			func: "?",
			url: sourceFile,
			line: lineNumber !== null && lineNumber !== void 0 ? lineNumber : void 0,
			column: columnNumber !== null && columnNumber !== void 0 ? columnNumber : void 0
		}]
	}) : void 0;
}
function buildTags(configuration) {
	const { env, service, version, datacenter, sdkVersion, variant } = configuration;
	const tags = [buildTag("sdk_version", sdkVersion !== null && sdkVersion !== void 0 ? sdkVersion : "6.33.0")];
	if (env) tags.push(buildTag("env", env));
	if (service) tags.push(buildTag("service", service));
	if (version) tags.push(buildTag("version", version));
	if (datacenter) tags.push(buildTag("datacenter", datacenter));
	if (variant) tags.push(buildTag("variant", variant));
	return tags;
}
function buildTag(key, rawValue) {
	const tag = rawValue ? `${key}:${rawValue}` : key;
	if (tag.length > 200 || hasForbiddenCharacters(tag)) display.warn(`Tag ${tag} doesn't meet tag requirements and will be sanitized. ${MORE_DETAILS} ${DOCS_ORIGIN}/getting_started/tagging/#defining-tags`);
	return sanitizeTag(tag);
}
function sanitizeTag(tag) {
	return tag.replace(/,/g, "_");
}
function hasForbiddenCharacters(rawValue) {
	if (!supportUnicodePropertyEscapes()) return false;
	return (/* @__PURE__ */ new RegExp("[^\\p{Ll}\\p{Lo}0-9_:./-]", "u")).test(rawValue);
}
function supportUnicodePropertyEscapes() {
	try {
		return true;
	} catch (_a) {
		return false;
	}
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-core@6.33.0/node_modules/@datadog/browser-core/esm/tools/sendToExtension.js
function sendToExtension(type, payload) {
	const callback = globalObject.__ddBrowserSdkExtensionCallback;
	if (callback) callback({
		type,
		payload
	});
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-core@6.33.0/node_modules/@datadog/browser-core/esm/tools/mergeInto.js
/**
* Iterate over source and affect its sub values into destination, recursively.
* If the source and destination can't be merged, return source.
*/
function mergeInto(destination, source, circularReferenceChecker = createCircularReferenceChecker()) {
	if (source === void 0) return destination;
	if (typeof source !== "object" || source === null) return source;
	else if (source instanceof Date) return new Date(source.getTime());
	else if (source instanceof RegExp) {
		const flags = source.flags || [
			source.global ? "g" : "",
			source.ignoreCase ? "i" : "",
			source.multiline ? "m" : "",
			source.sticky ? "y" : "",
			source.unicode ? "u" : ""
		].join("");
		return new RegExp(source.source, flags);
	}
	if (circularReferenceChecker.hasAlreadyBeenSeen(source)) return;
	else if (Array.isArray(source)) {
		const merged = Array.isArray(destination) ? destination : [];
		for (let i = 0; i < source.length; ++i) merged[i] = mergeInto(merged[i], source[i], circularReferenceChecker);
		return merged;
	}
	const merged = getType(destination) === "object" ? destination : {};
	for (const key in source) if (Object.prototype.hasOwnProperty.call(source, key)) merged[key] = mergeInto(merged[key], source[key], circularReferenceChecker);
	return merged;
}
/**
* A simplistic implementation of a deep clone algorithm.
* Caveats:
* - It doesn't maintain prototype chains - don't use with instances of custom classes.
* - It doesn't handle Map and Set
*/
function deepClone(value) {
	return mergeInto(void 0, value);
}
function combine(...sources) {
	let destination;
	for (const source of sources) {
		if (source === void 0 || source === null) continue;
		destination = mergeInto(destination, source);
	}
	return destination;
}
function createCircularReferenceChecker() {
	if (typeof WeakSet !== "undefined") {
		const set = /* @__PURE__ */ new WeakSet();
		return { hasAlreadyBeenSeen(value) {
			const has = set.has(value);
			if (!has) set.add(value);
			return has;
		} };
	}
	const array = [];
	return { hasAlreadyBeenSeen(value) {
		const has = array.indexOf(value) >= 0;
		if (!has) array.push(value);
		return has;
	} };
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-core@6.33.0/node_modules/@datadog/browser-core/esm/domain/connectivity/connectivity.js
function getConnectivity() {
	var _a;
	const navigator = globalObject.navigator;
	return {
		status: navigator.onLine ? "connected" : "not_connected",
		interfaces: navigator.connection && navigator.connection.type ? [navigator.connection.type] : void 0,
		effective_type: (_a = navigator.connection) === null || _a === void 0 ? void 0 : _a.effectiveType
	};
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-core@6.33.0/node_modules/@datadog/browser-core/esm/browser/fetch.js
/**
* Make a fetch request using the native implementation, bypassing Zone.js patching.
* This prevents unnecessary Angular change detection cycles.
*
* @param input - The resource to fetch (URL or Request object)
* @param init - Optional fetch options
* @returns A Promise that resolves to the Response
*/
function fetch(input, init) {
	return getZoneJsOriginalValue(getGlobalObject(), "fetch")(input, init);
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-core@6.33.0/node_modules/@datadog/browser-core/esm/tools/utils/responseUtils.js
function isServerError(status) {
	return status >= 500;
}
function tryToClone(response) {
	try {
		return response.clone();
	} catch (_a) {
		return;
	}
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-core@6.33.0/node_modules/@datadog/browser-core/esm/transport/sendWithRetryStrategy.js
var MAX_ONGOING_BYTES_COUNT = 80 * ONE_KIBI_BYTE;
var MAX_QUEUE_BYTES_COUNT = 20 * ONE_MEBI_BYTE;
var MAX_BACKOFF_TIME = ONE_MINUTE;
var INITIAL_BACKOFF_TIME = ONE_SECOND;
function sendWithRetryStrategy(payload, state, sendStrategy, trackType, reportError, requestObservable) {
	if (state.transportStatus === 0 && state.queuedPayloads.size() === 0 && state.bandwidthMonitor.canHandle(payload)) send(payload, state, sendStrategy, requestObservable, {
		onSuccess: () => retryQueuedPayloads(0, state, sendStrategy, trackType, reportError, requestObservable),
		onFailure: () => {
			if (!state.queuedPayloads.enqueue(payload)) requestObservable.notify({
				type: "queue-full",
				bandwidth: state.bandwidthMonitor.stats(),
				payload
			});
			scheduleRetry(state, sendStrategy, trackType, reportError, requestObservable);
		}
	});
	else if (!state.queuedPayloads.enqueue(payload)) requestObservable.notify({
		type: "queue-full",
		bandwidth: state.bandwidthMonitor.stats(),
		payload
	});
}
function scheduleRetry(state, sendStrategy, trackType, reportError, requestObservable) {
	if (state.transportStatus !== 2) return;
	setTimeout(() => {
		send(state.queuedPayloads.first(), state, sendStrategy, requestObservable, {
			onSuccess: () => {
				state.queuedPayloads.dequeue();
				state.currentBackoffTime = INITIAL_BACKOFF_TIME;
				retryQueuedPayloads(1, state, sendStrategy, trackType, reportError, requestObservable);
			},
			onFailure: () => {
				state.currentBackoffTime = Math.min(MAX_BACKOFF_TIME, state.currentBackoffTime * 2);
				scheduleRetry(state, sendStrategy, trackType, reportError, requestObservable);
			}
		});
	}, state.currentBackoffTime);
}
function send(payload, state, sendStrategy, requestObservable, { onSuccess, onFailure }) {
	state.bandwidthMonitor.add(payload);
	sendStrategy(payload, (response) => {
		state.bandwidthMonitor.remove(payload);
		if (!shouldRetryRequest(response)) {
			state.transportStatus = 0;
			requestObservable.notify({
				type: "success",
				bandwidth: state.bandwidthMonitor.stats(),
				payload
			});
			onSuccess();
		} else {
			state.transportStatus = state.bandwidthMonitor.ongoingRequestCount > 0 ? 1 : 2;
			payload.retry = {
				count: payload.retry ? payload.retry.count + 1 : 1,
				lastFailureStatus: response.status
			};
			requestObservable.notify({
				type: "failure",
				bandwidth: state.bandwidthMonitor.stats(),
				payload
			});
			onFailure();
		}
	});
}
function retryQueuedPayloads(reason, state, sendStrategy, trackType, reportError, requestObservable) {
	if (reason === 0 && state.queuedPayloads.isFull() && !state.queueFullReported) {
		reportError({
			message: `Reached max ${trackType} events size queued for upload: ${MAX_QUEUE_BYTES_COUNT / ONE_MEBI_BYTE}MiB`,
			source: ErrorSource.AGENT,
			startClocks: clocksNow()
		});
		state.queueFullReported = true;
	}
	const previousQueue = state.queuedPayloads;
	state.queuedPayloads = newPayloadQueue();
	while (previousQueue.size() > 0) sendWithRetryStrategy(previousQueue.dequeue(), state, sendStrategy, trackType, reportError, requestObservable);
}
function shouldRetryRequest(response) {
	return response.type !== "opaque" && (response.status === 0 && !navigator.onLine || response.status === 408 || response.status === 429 || isServerError(response.status));
}
function newRetryState() {
	return {
		transportStatus: 0,
		currentBackoffTime: INITIAL_BACKOFF_TIME,
		bandwidthMonitor: newBandwidthMonitor(),
		queuedPayloads: newPayloadQueue(),
		queueFullReported: false
	};
}
function newPayloadQueue() {
	const queue = [];
	return {
		bytesCount: 0,
		enqueue(payload) {
			if (this.isFull()) return false;
			queue.push(payload);
			this.bytesCount += payload.bytesCount;
			return true;
		},
		first() {
			return queue[0];
		},
		dequeue() {
			const payload = queue.shift();
			if (payload) this.bytesCount -= payload.bytesCount;
			return payload;
		},
		size() {
			return queue.length;
		},
		isFull() {
			return this.bytesCount >= MAX_QUEUE_BYTES_COUNT;
		}
	};
}
function newBandwidthMonitor() {
	return {
		ongoingRequestCount: 0,
		ongoingByteCount: 0,
		canHandle(payload) {
			return this.ongoingRequestCount === 0 || this.ongoingByteCount + payload.bytesCount <= MAX_ONGOING_BYTES_COUNT && this.ongoingRequestCount < 32;
		},
		add(payload) {
			this.ongoingRequestCount += 1;
			this.ongoingByteCount += payload.bytesCount;
		},
		remove(payload) {
			this.ongoingRequestCount -= 1;
			this.ongoingByteCount -= payload.bytesCount;
		},
		stats() {
			return {
				ongoingByteCount: this.ongoingByteCount,
				ongoingRequestCount: this.ongoingRequestCount
			};
		}
	};
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-core@6.33.0/node_modules/@datadog/browser-core/esm/transport/httpRequest.js
/**
* beacon payload max queue size implementation is 64kb
* ensure that we leave room for logs, rum and potential other users
*/
var RECOMMENDED_REQUEST_BYTES_LIMIT = 16 * ONE_KIBI_BYTE;
function createHttpRequest(endpointBuilders, reportError, bytesLimit = RECOMMENDED_REQUEST_BYTES_LIMIT) {
	const observable = new Observable();
	const retryState = newRetryState();
	return {
		observable,
		send: (payload) => {
			for (const endpointBuilder of endpointBuilders) sendWithRetryStrategy(payload, retryState, (payload, onResponse) => {
				fetchStrategy(endpointBuilder, payload, onResponse);
			}, endpointBuilder.trackType, reportError, observable);
		},
		/**
		* Since fetch keepalive behaves like regular fetch on Firefox,
		* keep using sendBeaconStrategy on exit
		*/
		sendOnExit: (payload) => {
			for (const endpointBuilder of endpointBuilders) sendBeaconStrategy(endpointBuilder, bytesLimit, payload);
		}
	};
}
function sendBeaconStrategy(endpointBuilder, bytesLimit, payload) {
	if (!!navigator.sendBeacon && payload.bytesCount < bytesLimit) try {
		const beaconUrl = endpointBuilder.build("beacon", payload);
		if (navigator.sendBeacon(beaconUrl, payload.data)) return;
	} catch (e) {
		reportBeaconError(e);
	}
	fetchStrategy(endpointBuilder, payload);
}
var hasReportedBeaconError = false;
function reportBeaconError(e) {
	if (!hasReportedBeaconError) {
		hasReportedBeaconError = true;
		monitorError(e);
	}
}
function fetchStrategy(endpointBuilder, payload, onResponse) {
	fetch(endpointBuilder.build("fetch", payload), {
		method: "POST",
		body: payload.data,
		mode: "cors"
	}).then(monitor((response) => onResponse === null || onResponse === void 0 ? void 0 : onResponse({
		status: response.status,
		type: response.type
	}))).catch(monitor(() => onResponse === null || onResponse === void 0 ? void 0 : onResponse({ status: 0 })));
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-core@6.33.0/node_modules/@datadog/browser-core/esm/transport/eventBridge.js
function getEventBridge() {
	const eventBridgeGlobal = getEventBridgeGlobal();
	if (!eventBridgeGlobal) return;
	return {
		getCapabilities() {
			var _a;
			return JSON.parse(((_a = eventBridgeGlobal.getCapabilities) === null || _a === void 0 ? void 0 : _a.call(eventBridgeGlobal)) || "[]");
		},
		getPrivacyLevel() {
			var _a;
			return (_a = eventBridgeGlobal.getPrivacyLevel) === null || _a === void 0 ? void 0 : _a.call(eventBridgeGlobal);
		},
		getAllowedWebViewHosts() {
			return JSON.parse(eventBridgeGlobal.getAllowedWebViewHosts());
		},
		send(eventType, event, viewId) {
			const view = viewId ? { id: viewId } : void 0;
			eventBridgeGlobal.send(JSON.stringify({
				eventType,
				event,
				view
			}));
		}
	};
}
function bridgeSupports(capability) {
	const bridge = getEventBridge();
	return !!bridge && bridge.getCapabilities().includes(capability);
}
function canUseEventBridge(currentHost) {
	var _a;
	if (currentHost === void 0) currentHost = (_a = getGlobalObject().location) === null || _a === void 0 ? void 0 : _a.hostname;
	const bridge = getEventBridge();
	return !!bridge && bridge.getAllowedWebViewHosts().some((allowedHost) => currentHost === allowedHost || currentHost.endsWith(`.${allowedHost}`));
}
function getEventBridgeGlobal() {
	return getGlobalObject().DatadogEventBridge;
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-core@6.33.0/node_modules/@datadog/browser-core/esm/browser/pageMayExitObservable.js
var PageExitReason = {
	HIDDEN: "visibility_hidden",
	UNLOADING: "before_unload",
	PAGEHIDE: "page_hide",
	FROZEN: "page_frozen"
};
function createPageMayExitObservable(configuration) {
	return new Observable((observable) => {
		if (isWorkerEnvironment) return;
		const { stop: stopListeners } = addEventListeners(configuration, window, ["visibilitychange", "freeze"], (event) => {
			if (event.type === "visibilitychange" && document.visibilityState === "hidden")
 /**
			* Only event that guarantee to fire on mobile devices when the page transitions to background state
			* (e.g. when user switches to a different application, goes to homescreen, etc), or is being unloaded.
			*/
			observable.notify({ reason: PageExitReason.HIDDEN });
			else if (event.type === "freeze")
 /**
			* After transitioning in background a tab can be freezed to preserve resources. (cf: https://developer.chrome.com/blog/page-lifecycle-api)
			* Allow to collect events happening between hidden and frozen state.
			*/
			observable.notify({ reason: PageExitReason.FROZEN });
		}, { capture: true });
		const stopBeforeUnloadListener = addEventListener(configuration, window, "beforeunload", () => {
			observable.notify({ reason: PageExitReason.UNLOADING });
		}).stop;
		return () => {
			stopListeners();
			stopBeforeUnloadListener();
		};
	});
}
function isPageExitReason(reason) {
	return objectValues(PageExitReason).includes(reason);
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-core@6.33.0/node_modules/@datadog/browser-core/esm/transport/batch.js
var MESSAGE_BYTES_LIMIT = 256 * ONE_KIBI_BYTE;
function createBatch({ encoder, request, flushController }) {
	let upsertBuffer = {};
	const flushSubscription = flushController.flushObservable.subscribe((event) => flush(event));
	function push(serializedMessage, estimatedMessageBytesCount, key) {
		flushController.notifyBeforeAddMessage(estimatedMessageBytesCount);
		if (key !== void 0) {
			upsertBuffer[key] = serializedMessage;
			flushController.notifyAfterAddMessage();
		} else encoder.write(encoder.isEmpty ? serializedMessage : `\n${serializedMessage}`, (realMessageBytesCount) => {
			flushController.notifyAfterAddMessage(realMessageBytesCount - estimatedMessageBytesCount);
		});
	}
	function hasMessageFor(key) {
		return key !== void 0 && upsertBuffer[key] !== void 0;
	}
	function remove(key) {
		const removedMessage = upsertBuffer[key];
		delete upsertBuffer[key];
		const messageBytesCount = encoder.estimateEncodedBytesCount(removedMessage);
		flushController.notifyAfterRemoveMessage(messageBytesCount);
	}
	function addOrUpdate(message, key) {
		const serializedMessage = jsonStringify(message);
		const estimatedMessageBytesCount = encoder.estimateEncodedBytesCount(serializedMessage);
		if (estimatedMessageBytesCount >= MESSAGE_BYTES_LIMIT) {
			display.warn(`Discarded a message whose size was bigger than the maximum allowed size ${MESSAGE_BYTES_LIMIT / ONE_KIBI_BYTE}KiB. ${MORE_DETAILS} ${DOCS_TROUBLESHOOTING}/#technical-limitations`);
			return;
		}
		if (hasMessageFor(key)) remove(key);
		push(serializedMessage, estimatedMessageBytesCount, key);
	}
	function flush(event) {
		const upsertMessages = objectValues(upsertBuffer).join("\n");
		upsertBuffer = {};
		const pageMightExit = isPageExitReason(event.reason);
		const send = pageMightExit ? request.sendOnExit : request.send;
		if (pageMightExit && encoder.isAsync) {
			const encoderResult = encoder.finishSync();
			if (encoderResult.outputBytesCount) send(formatPayloadFromEncoder(encoderResult));
			const pendingMessages = [encoderResult.pendingData, upsertMessages].filter(Boolean).join("\n");
			if (pendingMessages) send({
				data: pendingMessages,
				bytesCount: computeBytesCount(pendingMessages)
			});
		} else {
			if (upsertMessages) encoder.write(encoder.isEmpty ? upsertMessages : `\n${upsertMessages}`);
			encoder.finish((encoderResult) => {
				send(formatPayloadFromEncoder(encoderResult));
			});
		}
	}
	return {
		flushController,
		add: addOrUpdate,
		upsert: addOrUpdate,
		stop: flushSubscription.unsubscribe
	};
}
function formatPayloadFromEncoder(encoderResult) {
	let data;
	if (typeof encoderResult.output === "string") data = encoderResult.output;
	else data = new Blob([encoderResult.output], { type: "text/plain" });
	return {
		data,
		bytesCount: encoderResult.outputBytesCount,
		encoding: encoderResult.encoding
	};
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-core@6.33.0/node_modules/@datadog/browser-core/esm/transport/flushController.js
/**
* flush automatically, aim to be lower than ALB connection timeout
* to maximize connection reuse.
*/
var FLUSH_DURATION_LIMIT = 30 * ONE_SECOND;
/**
* When using the SDK in a Worker Environment, we limit the batch size to 1 to ensure it can be sent
* in a single event.
*/
var MESSAGES_LIMIT = isWorkerEnvironment ? 1 : 50;
/**
* Returns a "flush controller", responsible of notifying when flushing a pool of pending data needs
* to happen. The implementation is designed to support both synchronous and asynchronous usages,
* but relies on invariants described in each method documentation to keep a coherent state.
*/
function createFlushController({ pageMayExitObservable, sessionExpireObservable }) {
	let forcedFlushReason;
	const preparePageExitFlushObservable = new Observable();
	const pageMayExitSubscription = pageMayExitObservable.subscribe((event) => {
		forcedFlushReason = event.reason;
		try {
			preparePageExitFlushObservable.notify(event.reason);
		} finally {
			forcedFlushReason = void 0;
		}
		flush(event.reason);
	});
	const sessionExpireSubscription = sessionExpireObservable.subscribe(() => flush("session_expire"));
	const flushObservable = new Observable(() => () => {
		pageMayExitSubscription.unsubscribe();
		sessionExpireSubscription.unsubscribe();
	});
	let currentBytesCount = 0;
	let currentMessagesCount = 0;
	function flush(flushReason) {
		if (currentMessagesCount === 0) return;
		const messagesCount = currentMessagesCount;
		const bytesCount = currentBytesCount;
		currentMessagesCount = 0;
		currentBytesCount = 0;
		cancelDurationLimitTimeout();
		flushObservable.notify({
			reason: flushReason,
			messagesCount,
			bytesCount
		});
	}
	let durationLimitTimeoutId;
	function scheduleDurationLimitTimeout() {
		if (durationLimitTimeoutId === void 0) durationLimitTimeoutId = setTimeout(() => {
			flush("duration_limit");
		}, FLUSH_DURATION_LIMIT);
	}
	function cancelDurationLimitTimeout() {
		clearTimeout(durationLimitTimeoutId);
		durationLimitTimeoutId = void 0;
	}
	return {
		flushObservable,
		preparePageExitFlushObservable,
		get messagesCount() {
			return currentMessagesCount;
		},
		/**
		* Notifies that a message will be added to a pool of pending messages waiting to be flushed.
		*
		* This function needs to be called synchronously, right before adding the message, so no flush
		* event can happen after `notifyBeforeAddMessage` and before adding the message.
		*
		* @param estimatedMessageBytesCount - an estimation of the message bytes count once it is
		* actually added.
		*/
		notifyBeforeAddMessage(estimatedMessageBytesCount) {
			if (currentBytesCount + estimatedMessageBytesCount >= RECOMMENDED_REQUEST_BYTES_LIMIT) flush(forcedFlushReason !== null && forcedFlushReason !== void 0 ? forcedFlushReason : "bytes_limit");
			currentMessagesCount += 1;
			currentBytesCount += estimatedMessageBytesCount;
			scheduleDurationLimitTimeout();
		},
		/**
		* Notifies that a message *was* added to a pool of pending messages waiting to be flushed.
		*
		* This function can be called asynchronously after the message was added, but in this case it
		* should not be called if a flush event occurred in between.
		*
		* @param messageBytesCountDiff - the difference between the estimated message bytes count and
		* its actual bytes count once added to the pool.
		*/
		notifyAfterAddMessage(messageBytesCountDiff = 0) {
			currentBytesCount += messageBytesCountDiff;
			if (currentMessagesCount >= MESSAGES_LIMIT) flush(forcedFlushReason !== null && forcedFlushReason !== void 0 ? forcedFlushReason : "messages_limit");
			else if (currentBytesCount >= RECOMMENDED_REQUEST_BYTES_LIMIT) flush(forcedFlushReason !== null && forcedFlushReason !== void 0 ? forcedFlushReason : "bytes_limit");
		},
		/**
		* Notifies that a message was removed from a pool of pending messages waiting to be flushed.
		*
		* This function needs to be called synchronously, right after removing the message, so no flush
		* event can happen after removing the message and before `notifyAfterRemoveMessage`.
		*
		* @param messageBytesCount - the message bytes count that was added to the pool. Should
		* correspond to the sum of bytes counts passed to `notifyBeforeAddMessage` and
		* `notifyAfterAddMessage`.
		*/
		notifyAfterRemoveMessage(messageBytesCount) {
			currentBytesCount -= messageBytesCount;
			currentMessagesCount -= 1;
			if (currentMessagesCount === 0) cancelDurationLimitTimeout();
		}
	};
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-core@6.33.0/node_modules/@datadog/browser-core/esm/tools/encoder.js
function createIdentityEncoder() {
	let output = "";
	let outputBytesCount = 0;
	return {
		isAsync: false,
		get isEmpty() {
			return !output;
		},
		write(data, callback) {
			const additionalEncodedBytesCount = computeBytesCount(data);
			outputBytesCount += additionalEncodedBytesCount;
			output += data;
			if (callback) callback(additionalEncodedBytesCount);
		},
		finish(callback) {
			callback(this.finishSync());
		},
		finishSync() {
			const result = {
				output,
				outputBytesCount,
				rawBytesCount: outputBytesCount,
				pendingData: ""
			};
			output = "";
			outputBytesCount = 0;
			return result;
		},
		estimateEncodedBytesCount(data) {
			return data.length;
		}
	};
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-core@6.33.0/node_modules/@datadog/browser-core/esm/tools/abstractHooks.js
var DISCARDED = "DISCARDED";
var SKIPPED = "SKIPPED";
function abstractHooks() {
	const callbacks = {};
	return {
		register(hookName, callback) {
			if (!callbacks[hookName]) callbacks[hookName] = [];
			callbacks[hookName].push(callback);
			return { unregister: () => {
				callbacks[hookName] = callbacks[hookName].filter((cb) => cb !== callback);
			} };
		},
		triggerHook(hookName, param) {
			const hookCallbacks = callbacks[hookName] || [];
			const results = [];
			for (const callback of hookCallbacks) {
				const result = callback(param);
				if (result === "DISCARDED") return DISCARDED;
				if (result === "SKIPPED") continue;
				results.push(result);
			}
			return combine(...results);
		}
	};
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-core@6.33.0/node_modules/@datadog/browser-core/esm/domain/telemetry/rawTelemetryEvent.types.js
var TelemetryType = {
	LOG: "log",
	CONFIGURATION: "configuration",
	USAGE: "usage"
};
//#endregion
//#region node_modules/.pnpm/@datadog+browser-core@6.33.0/node_modules/@datadog/browser-core/esm/domain/telemetry/telemetry.js
var ALLOWED_FRAME_URLS = [
	"https://www.datadoghq-browser-agent.com",
	"https://www.datad0g-browser-agent.com",
	"https://d3uc069fcn7uxw.cloudfront.net",
	"https://d20xtzwzcl0ceb.cloudfront.net",
	"http://localhost",
	"<anonymous>"
];
var METRIC_SAMPLE_RATE = 1;
var TELEMETRY_EXCLUDED_SITES = [INTAKE_SITE_US1_FED, INTAKE_SITE_US2_FED];
var MAX_TELEMETRY_EVENTS_PER_PAGE = 15;
var telemetryObservable;
function getTelemetryObservable() {
	if (!telemetryObservable) telemetryObservable = new BufferedObservable(100);
	return telemetryObservable;
}
function startTelemetry(telemetryService, configuration, hooks) {
	const observable = new Observable();
	const { enabled, metricsEnabled } = startTelemetryCollection(telemetryService, configuration, hooks, observable);
	const { stop } = startTelemetryTransport(configuration, observable);
	return {
		stop,
		enabled,
		metricsEnabled
	};
}
function startTelemetryCollection(telemetryService, configuration, hooks, observable, metricSampleRate = METRIC_SAMPLE_RATE, maxTelemetryEventsPerPage = MAX_TELEMETRY_EVENTS_PER_PAGE) {
	const alreadySentEventsByKind = {};
	const telemetryEnabled = !TELEMETRY_EXCLUDED_SITES.includes(configuration.site) && performDraw(configuration.telemetrySampleRate);
	const telemetryEnabledPerType = {
		[TelemetryType.LOG]: telemetryEnabled,
		[TelemetryType.CONFIGURATION]: telemetryEnabled && performDraw(configuration.telemetryConfigurationSampleRate),
		[TelemetryType.USAGE]: telemetryEnabled && performDraw(configuration.telemetryUsageSampleRate),
		metric: telemetryEnabled && performDraw(metricSampleRate)
	};
	const runtimeEnvInfo = getRuntimeEnvInfo();
	const telemetryObservable = getTelemetryObservable();
	telemetryObservable.subscribe(({ rawEvent, metricName }) => {
		if (metricName && !telemetryEnabledPerType["metric"] || !telemetryEnabledPerType[rawEvent.type]) return;
		const kind = metricName || rawEvent.status || rawEvent.type;
		let alreadySentEvents = alreadySentEventsByKind[kind];
		if (!alreadySentEvents) alreadySentEvents = alreadySentEventsByKind[kind] = /* @__PURE__ */ new Set();
		if (alreadySentEvents.size >= maxTelemetryEventsPerPage) return;
		const stringifiedEvent = jsonStringify(rawEvent);
		if (alreadySentEvents.has(stringifiedEvent)) return;
		const defaultTelemetryEventAttributes = hooks.triggerHook(1, { startTime: clocksNow().relative });
		if (defaultTelemetryEventAttributes === "DISCARDED") return;
		const event = toTelemetryEvent(defaultTelemetryEventAttributes, telemetryService, rawEvent, runtimeEnvInfo);
		observable.notify(event);
		sendToExtension("telemetry", event);
		alreadySentEvents.add(stringifiedEvent);
	});
	telemetryObservable.unbuffer();
	startMonitorErrorCollection(addTelemetryError);
	return {
		enabled: telemetryEnabled,
		metricsEnabled: telemetryEnabledPerType["metric"]
	};
	function toTelemetryEvent(defaultTelemetryEventAttributes, telemetryService, rawEvent, runtimeEnvInfo) {
		return combine({
			type: "telemetry",
			date: clocksNow().timeStamp,
			service: telemetryService,
			version: "6.33.0",
			source: "browser",
			_dd: { format_version: 2 },
			telemetry: combine(rawEvent, {
				runtime_env: runtimeEnvInfo,
				connectivity: getConnectivity(),
				sdk_setup: "npm"
			}),
			ddtags: buildTags(configuration).join(","),
			experimental_features: Array.from(getExperimentalFeatures())
		}, defaultTelemetryEventAttributes);
	}
}
function startTelemetryTransport(configuration, telemetryObservable) {
	const cleanupTasks = [];
	if (canUseEventBridge()) {
		const bridge = getEventBridge();
		const telemetrySubscription = telemetryObservable.subscribe((event) => bridge.send("internal_telemetry", event));
		cleanupTasks.push(telemetrySubscription.unsubscribe);
	} else {
		const endpoints = [configuration.rumEndpointBuilder];
		if (configuration.replica && isTelemetryReplicationAllowed(configuration)) endpoints.push(configuration.replica.rumEndpointBuilder);
		const telemetryBatch = createBatch({
			encoder: createIdentityEncoder(),
			request: createHttpRequest(endpoints, noop),
			flushController: createFlushController({
				pageMayExitObservable: createPageMayExitObservable(configuration),
				sessionExpireObservable: new Observable()
			})
		});
		cleanupTasks.push(telemetryBatch.stop);
		const telemetrySubscription = telemetryObservable.subscribe(telemetryBatch.add);
		cleanupTasks.push(telemetrySubscription.unsubscribe);
	}
	return { stop: () => cleanupTasks.forEach((task) => task()) };
}
function getRuntimeEnvInfo() {
	var _a;
	return {
		is_local_file: ((_a = globalObject.location) === null || _a === void 0 ? void 0 : _a.protocol) === "file:",
		is_worker: isWorkerEnvironment
	};
}
/**
* Avoid mixing telemetry events from different data centers
* but keep replicating staging events for reliability
*/
function isTelemetryReplicationAllowed(configuration) {
	return configuration.site === INTAKE_SITE_STAGING;
}
function addTelemetryDebug(message, context) {
	displayIfDebugEnabled(ConsoleApiName.debug, message, context);
	getTelemetryObservable().notify({ rawEvent: {
		type: TelemetryType.LOG,
		message,
		status: "debug",
		...context
	} });
}
function addTelemetryError(e, context) {
	getTelemetryObservable().notify({ rawEvent: {
		type: TelemetryType.LOG,
		status: "error",
		...formatError(e),
		...context
	} });
}
function addTelemetryConfiguration(configuration) {
	getTelemetryObservable().notify({ rawEvent: {
		type: TelemetryType.CONFIGURATION,
		configuration
	} });
}
function addTelemetryMetrics(metricName, context) {
	getTelemetryObservable().notify({
		rawEvent: {
			type: TelemetryType.LOG,
			message: metricName,
			status: "debug",
			...context
		},
		metricName
	});
}
function addTelemetryUsage(usage) {
	getTelemetryObservable().notify({ rawEvent: {
		type: TelemetryType.USAGE,
		usage
	} });
}
function formatError(e) {
	if (isError(e)) {
		const stackTrace = computeStackTrace(e);
		return {
			error: {
				kind: stackTrace.name,
				stack: toStackTraceString(scrubCustomerFrames(stackTrace))
			},
			message: stackTrace.message
		};
	}
	return {
		error: { stack: NO_ERROR_STACK_PRESENT_MESSAGE },
		message: `Uncaught ${jsonStringify(e)}`
	};
}
function scrubCustomerFrames(stackTrace) {
	stackTrace.stack = stackTrace.stack.filter((frame) => !frame.url || ALLOWED_FRAME_URLS.some((allowedFrameUrl) => frame.url.startsWith(allowedFrameUrl)));
	return stackTrace;
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-core@6.33.0/node_modules/@datadog/browser-core/esm/tools/utils/arrayUtils.js
function removeItem(array, item) {
	const index = array.indexOf(item);
	if (index >= 0) array.splice(index, 1);
}
function isNonEmptyArray(value) {
	return Array.isArray(value) && value.length > 0;
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-core@6.33.0/node_modules/@datadog/browser-core/esm/tools/valueHistory.js
var END_OF_TIMES = Infinity;
var CLEAR_OLD_VALUES_INTERVAL = ONE_MINUTE;
var cleanupHistoriesInterval;
var cleanupTasks = /* @__PURE__ */ new Set();
function cleanupHistories() {
	cleanupTasks.forEach((task) => task());
}
function createValueHistory({ expireDelay, maxEntries }) {
	let entries = [];
	if (!cleanupHistoriesInterval) cleanupHistoriesInterval = setInterval(() => cleanupHistories(), CLEAR_OLD_VALUES_INTERVAL);
	const clearExpiredValues = () => {
		const oldTimeThreshold = relativeNow() - expireDelay;
		while (entries.length > 0 && entries[entries.length - 1].endTime < oldTimeThreshold) entries.pop();
	};
	cleanupTasks.add(clearExpiredValues);
	/**
	* Add a value to the history associated with a start time. Returns a reference to this newly
	* added entry that can be removed or closed.
	*/
	function add(value, startTime) {
		const entry = {
			value,
			startTime,
			endTime: END_OF_TIMES,
			remove: () => {
				removeItem(entries, entry);
			},
			close: (endTime) => {
				entry.endTime = endTime;
			}
		};
		if (maxEntries && entries.length >= maxEntries) entries.pop();
		entries.unshift(entry);
		return entry;
	}
	/**
	* Return the latest value that was active during `startTime`, or the currently active value
	* if no `startTime` is provided. This method assumes that entries are not overlapping.
	*
	* If `option.returnInactive` is true, returns the value at `startTime` (active or not).
	*/
	function find(startTime = END_OF_TIMES, options = { returnInactive: false }) {
		for (const entry of entries) if (entry.startTime <= startTime) {
			if (options.returnInactive || startTime <= entry.endTime) return entry.value;
			break;
		}
	}
	/**
	* Helper function to close the currently active value, if any. This method assumes that entries
	* are not overlapping.
	*/
	function closeActive(endTime) {
		const latestEntry = entries[0];
		if (latestEntry && latestEntry.endTime === END_OF_TIMES) latestEntry.close(endTime);
	}
	/**
	* Return all values with an active period overlapping with the duration,
	* or all values that were active during `startTime` if no duration is provided,
	* or all currently active values if no `startTime` is provided.
	*/
	function findAll(startTime = END_OF_TIMES, duration = 0) {
		const endTime = addDuration(startTime, duration);
		return entries.filter((entry) => entry.startTime <= endTime && startTime <= entry.endTime).map((entry) => entry.value);
	}
	/**
	* Return all the entries whose start time is equal to the given startTime.
	*/
	function getEntries(startTime) {
		return entries.filter((entry) => entry.startTime === startTime);
	}
	/**
	* Remove all entries from this collection.
	*/
	function reset() {
		entries = [];
	}
	/**
	* Stop internal garbage collection of past entries.
	*/
	function stop() {
		cleanupTasks.delete(clearExpiredValues);
		if (cleanupTasks.size === 0 && cleanupHistoriesInterval) {
			clearInterval(cleanupHistoriesInterval);
			cleanupHistoriesInterval = void 0;
		}
	}
	return {
		add,
		find,
		closeActive,
		findAll,
		getEntries,
		reset,
		stop
	};
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-core@6.33.0/node_modules/@datadog/browser-core/esm/domain/synthetics/syntheticsWorkerValues.js
var cookieNamePrefix = "datadog-synthetics-";
var SYNTHETICS_TEST_ID_COOKIE_NAME = `${cookieNamePrefix}public-id`;
var SYNTHETICS_RESULT_ID_COOKIE_NAME = `${cookieNamePrefix}result-id`;
var SYNTHETICS_INJECTS_RUM_COOKIE_NAME = `${cookieNamePrefix}injects-rum`;
var SYNTHETICS_CONTEXT_COOKIE_NAME = `${cookieNamePrefix}rum-context`;
function willSyntheticsInjectRum() {
	if (isWorkerEnvironment) return false;
	return Boolean(globalObject._DATADOG_SYNTHETICS_INJECTS_RUM || getInitCookie(SYNTHETICS_INJECTS_RUM_COOKIE_NAME));
}
function getSyntheticsContext() {
	const raw = getRawSyntheticsContext();
	return isValidSyntheticsContext(raw) ? raw : void 0;
}
function isSyntheticsTest() {
	return Boolean(getSyntheticsContext());
}
function getRawSyntheticsContext() {
	const rawGlobal = globalObject._DATADOG_SYNTHETICS_RUM_CONTEXT;
	if (rawGlobal) return rawGlobal;
	const rawCookie = getInitCookie(SYNTHETICS_CONTEXT_COOKIE_NAME);
	if (rawCookie) return tryJsonParse(decodeURIComponent(rawCookie));
	return {
		test_id: window._DATADOG_SYNTHETICS_PUBLIC_ID || getInitCookie(SYNTHETICS_TEST_ID_COOKIE_NAME),
		result_id: window._DATADOG_SYNTHETICS_RESULT_ID || getInitCookie(SYNTHETICS_RESULT_ID_COOKIE_NAME)
	};
}
function isValidSyntheticsContext(value) {
	return typeof value === "object" && value !== null && typeof value.test_id === "string" && typeof value.result_id === "string";
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-core@6.33.0/node_modules/@datadog/browser-core/esm/domain/session/sessionManager.js
var VISIBILITY_CHECK_DELAY = ONE_MINUTE;
var SESSION_CONTEXT_TIMEOUT_DELAY = SESSION_TIME_OUT_DELAY;
var stopCallbacks = [];
function startSessionManager(configuration, productKey, computeTrackingType, trackingConsentState) {
	const renewObservable = new Observable();
	const expireObservable = new Observable();
	const sessionStore = startSessionStore(configuration.sessionStoreStrategyType, configuration, productKey, computeTrackingType);
	stopCallbacks.push(() => sessionStore.stop());
	const sessionContextHistory = createValueHistory({ expireDelay: SESSION_CONTEXT_TIMEOUT_DELAY });
	stopCallbacks.push(() => sessionContextHistory.stop());
	sessionStore.renewObservable.subscribe(() => {
		sessionContextHistory.add(buildSessionContext(), relativeNow());
		renewObservable.notify();
	});
	sessionStore.expireObservable.subscribe(() => {
		expireObservable.notify();
		sessionContextHistory.closeActive(relativeNow());
	});
	sessionStore.expandOrRenewSession();
	sessionContextHistory.add(buildSessionContext(), clocksOrigin().relative);
	trackingConsentState.observable.subscribe(() => {
		if (trackingConsentState.isGranted()) sessionStore.expandOrRenewSession();
		else sessionStore.expire(false);
	});
	trackActivity(configuration, () => {
		if (trackingConsentState.isGranted()) sessionStore.expandOrRenewSession();
	});
	trackVisibility(configuration, () => sessionStore.expandSession());
	trackResume(configuration, () => sessionStore.restartSession());
	function buildSessionContext() {
		const session = sessionStore.getSession();
		if (!session) {
			reportUnexpectedSessionState(configuration).catch(() => void 0);
			return {
				id: "invalid",
				trackingType: "0",
				isReplayForced: false,
				anonymousId: void 0
			};
		}
		return {
			id: session.id,
			trackingType: session[productKey],
			isReplayForced: !!session.forcedReplay,
			anonymousId: session.anonymousId
		};
	}
	return {
		findSession: (startTime, options) => sessionContextHistory.find(startTime, options),
		renewObservable,
		expireObservable,
		sessionStateUpdateObservable: sessionStore.sessionStateUpdateObservable,
		expire: sessionStore.expire,
		updateSessionState: sessionStore.updateSessionState
	};
}
function trackActivity(configuration, expandOrRenewSession) {
	const { stop } = addEventListeners(configuration, window, [
		"click",
		"touchstart",
		"keydown",
		"scroll"
	], expandOrRenewSession, {
		capture: true,
		passive: true
	});
	stopCallbacks.push(stop);
}
function trackVisibility(configuration, expandSession) {
	const expandSessionWhenVisible = () => {
		if (document.visibilityState === "visible") expandSession();
	};
	const { stop } = addEventListener(configuration, document, "visibilitychange", expandSessionWhenVisible);
	stopCallbacks.push(stop);
	const visibilityCheckInterval = setInterval(expandSessionWhenVisible, VISIBILITY_CHECK_DELAY);
	stopCallbacks.push(() => {
		clearInterval(visibilityCheckInterval);
	});
}
function trackResume(configuration, cb) {
	const { stop } = addEventListener(configuration, window, "resume", cb, { capture: true });
	stopCallbacks.push(stop);
}
async function reportUnexpectedSessionState(configuration) {
	const sessionStoreStrategyType = configuration.sessionStoreStrategyType;
	if (!sessionStoreStrategyType) return;
	let rawSession;
	let cookieContext;
	if (sessionStoreStrategyType.type === SessionPersistence.COOKIE) {
		rawSession = retrieveSessionCookie(sessionStoreStrategyType.cookieOptions, configuration);
		cookieContext = {
			cookie: await getSessionCookies(),
			currentDomain: `${window.location.protocol}//${window.location.hostname}`
		};
	} else rawSession = retrieveSessionFromLocalStorage();
	addTelemetryDebug("Unexpected session state", {
		sessionStoreStrategyType: sessionStoreStrategyType.type,
		session: rawSession,
		isSyntheticsTest: isSyntheticsTest(),
		createdTimestamp: rawSession === null || rawSession === void 0 ? void 0 : rawSession.created,
		expireTimestamp: rawSession === null || rawSession === void 0 ? void 0 : rawSession.expire,
		...cookieContext
	});
}
async function getSessionCookies() {
	let sessionCookies;
	if ("cookieStore" in window) sessionCookies = await window.cookieStore.getAll(SESSION_STORE_KEY);
	else sessionCookies = document.cookie.split(/\s*;\s*/).filter((cookie) => cookie.startsWith(SESSION_STORE_KEY));
	return {
		count: sessionCookies.length,
		domain: getCurrentSite() || "undefined",
		...sessionCookies
	};
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-core@6.33.0/node_modules/@datadog/browser-core/esm/tools/abstractLifeCycle.js
var AbstractLifeCycle = class {
	constructor() {
		this.callbacks = {};
	}
	notify(eventType, data) {
		const eventCallbacks = this.callbacks[eventType];
		if (eventCallbacks) eventCallbacks.forEach((callback) => callback(data));
	}
	subscribe(eventType, callback) {
		if (!this.callbacks[eventType]) this.callbacks[eventType] = [];
		this.callbacks[eventType].push(callback);
		return { unsubscribe: () => {
			this.callbacks[eventType] = this.callbacks[eventType].filter((other) => callback !== other);
		} };
	}
};
//#endregion
//#region node_modules/.pnpm/@datadog+browser-core@6.33.0/node_modules/@datadog/browser-core/esm/domain/eventRateLimiter/createEventRateLimiter.js
var EVENT_RATE_LIMIT = 3e3;
function createEventRateLimiter(eventType, onLimitReached, limit = EVENT_RATE_LIMIT) {
	let eventCount = 0;
	let allowNextEvent = false;
	return { isLimitReached() {
		if (eventCount === 0) setTimeout(() => {
			eventCount = 0;
		}, ONE_MINUTE);
		eventCount += 1;
		if (eventCount <= limit || allowNextEvent) {
			allowNextEvent = false;
			return false;
		}
		if (eventCount === limit + 1) {
			allowNextEvent = true;
			try {
				onLimitReached({
					message: `Reached max number of ${eventType}s by minute: ${limit}`,
					source: ErrorSource.AGENT,
					startClocks: clocksNow()
				});
			} finally {
				allowNextEvent = false;
			}
		}
		return true;
	} };
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-core@6.33.0/node_modules/@datadog/browser-core/esm/browser/runOnReadyState.js
function runOnReadyState(configuration, expectedReadyState, callback) {
	if (document.readyState === expectedReadyState || document.readyState === "complete") {
		callback();
		return { stop: noop };
	}
	return addEventListener(configuration, window, expectedReadyState === "complete" ? "load" : "DOMContentLoaded", callback, { once: true });
}
function asyncRunOnReadyState(configuration, expectedReadyState) {
	return new Promise((resolve) => {
		runOnReadyState(configuration, expectedReadyState, resolve);
	});
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-core@6.33.0/node_modules/@datadog/browser-core/esm/browser/xhrObservable.js
var xhrObservable;
var xhrContexts = /* @__PURE__ */ new WeakMap();
function initXhrObservable(configuration) {
	if (!xhrObservable) xhrObservable = createXhrObservable(configuration);
	return xhrObservable;
}
function createXhrObservable(configuration) {
	return new Observable((observable) => {
		const { stop: stopInstrumentingStart } = instrumentMethod(XMLHttpRequest.prototype, "open", openXhr);
		const { stop: stopInstrumentingSend } = instrumentMethod(XMLHttpRequest.prototype, "send", (call) => {
			sendXhr(call, configuration, observable);
		}, { computeHandlingStack: true });
		const { stop: stopInstrumentingAbort } = instrumentMethod(XMLHttpRequest.prototype, "abort", abortXhr);
		return () => {
			stopInstrumentingStart();
			stopInstrumentingSend();
			stopInstrumentingAbort();
		};
	});
}
function openXhr({ target: xhr, parameters: [method, url] }) {
	xhrContexts.set(xhr, {
		state: "open",
		method: String(method).toUpperCase(),
		url: normalizeUrl(String(url))
	});
}
function sendXhr({ target: xhr, parameters: [body], handlingStack }, configuration, observable) {
	const context = xhrContexts.get(xhr);
	if (!context) return;
	const startContext = context;
	startContext.state = "start";
	startContext.startClocks = clocksNow();
	startContext.isAborted = false;
	startContext.xhr = xhr;
	startContext.handlingStack = handlingStack;
	startContext.requestBody = body;
	let hasBeenReported = false;
	const { stop: stopInstrumentingOnReadyStateChange } = instrumentMethod(xhr, "onreadystatechange", () => {
		if (xhr.readyState === XMLHttpRequest.DONE) onEnd();
	});
	const onEnd = () => {
		unsubscribeLoadEndListener();
		stopInstrumentingOnReadyStateChange();
		if (hasBeenReported) return;
		hasBeenReported = true;
		const completeContext = context;
		completeContext.state = "complete";
		completeContext.duration = elapsed(startContext.startClocks.timeStamp, timeStampNow());
		completeContext.status = xhr.status;
		if (typeof xhr.response === "string") completeContext.responseBody = xhr.response;
		observable.notify(shallowClone(completeContext));
	};
	const { stop: unsubscribeLoadEndListener } = addEventListener(configuration, xhr, "loadend", onEnd);
	observable.notify(startContext);
}
function abortXhr({ target: xhr }) {
	const context = xhrContexts.get(xhr);
	if (context) context.isAborted = true;
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-core@6.33.0/node_modules/@datadog/browser-core/esm/tools/readBytesFromStream.js
/**
* Read bytes from a ReadableStream until the end of the stream.
* Returns the bytes if collectStreamBody is true, otherwise returns undefined.
*/
async function readBytesFromStream(stream, options) {
	const reader = stream.getReader();
	const chunks = [];
	while (true) {
		const result = await reader.read();
		if (result.done) break;
		if (options.collectStreamBody) chunks.push(result.value);
	}
	reader.cancel().catch(noop);
	return options.collectStreamBody ? concatBuffers(chunks) : void 0;
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-core@6.33.0/node_modules/@datadog/browser-core/esm/browser/fetchObservable.js
var fetchObservable;
var responseBodyActionGetters = [];
function initFetchObservable({ responseBodyAction } = {}) {
	if (responseBodyAction) responseBodyActionGetters.push(responseBodyAction);
	if (!fetchObservable) fetchObservable = createFetchObservable();
	return fetchObservable;
}
function createFetchObservable() {
	return new Observable((observable) => {
		if (!globalObject.fetch) return;
		const { stop } = instrumentMethod(globalObject, "fetch", (call) => beforeSend(call, observable), { computeHandlingStack: true });
		return stop;
	});
}
function beforeSend({ parameters, onPostCall, handlingStack }, observable) {
	var _a;
	var _b;
	const [input, init] = parameters;
	let methodFromParams = init && init.method;
	if (methodFromParams === void 0 && input instanceof Request) methodFromParams = input.method;
	const method = methodFromParams !== void 0 ? String(methodFromParams).toUpperCase() : "GET";
	const url = input instanceof Request ? input.url : normalizeUrl(String(input));
	const context = {
		state: "start",
		init,
		input,
		method,
		startClocks: clocksNow(),
		url,
		handlingStack,
		isAbortedOnStart: input instanceof Request && ((_a = input.signal) === null || _a === void 0 ? void 0 : _a.aborted) || ((_b = init === null || init === void 0 ? void 0 : init.signal) === null || _b === void 0 ? void 0 : _b.aborted) || false
	};
	observable.notify(context);
	parameters[0] = context.input;
	parameters[1] = context.init;
	onPostCall((responsePromise) => {
		afterSend(observable, responsePromise, context).catch(monitorError);
	});
}
async function afterSend(observable, responsePromise, startContext) {
	var _a;
	var _b;
	const context = startContext;
	context.state = "resolve";
	let response;
	try {
		response = await responsePromise;
	} catch (error) {
		context.status = 0;
		context.isAborted = ((_b = (_a = context.init) === null || _a === void 0 ? void 0 : _a.signal) === null || _b === void 0 ? void 0 : _b.aborted) || error instanceof DOMException && error.code === DOMException.ABORT_ERR;
		context.error = error;
		observable.notify(context);
		return;
	}
	context.response = response;
	context.status = response.status;
	context.responseType = response.type;
	context.isAborted = false;
	const responseBodyCondition = responseBodyActionGetters.reduce((action, getter) => Math.max(action, getter(context)), 0);
	if (responseBodyCondition !== 0) {
		const clonedResponse = tryToClone(response);
		if (clonedResponse && clonedResponse.body) try {
			const bytes = await readBytesFromStream(clonedResponse.body, { collectStreamBody: responseBodyCondition === 2 });
			context.responseBody = bytes && new TextDecoder().decode(bytes);
		} catch (_c) {}
	}
	observable.notify(context);
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-core@6.33.0/node_modules/@datadog/browser-core/esm/tools/requestIdleCallback.js
/**
* 'requestIdleCallback' with a shim.
*/
function requestIdleCallback(callback, opts) {
	if (window.requestIdleCallback && window.cancelIdleCallback) {
		const id = window.requestIdleCallback(monitor(callback), opts);
		return () => window.cancelIdleCallback(id);
	}
	return requestIdleCallbackShim(callback);
}
function requestIdleCallbackShim(callback) {
	const start = dateNow();
	const timeoutId = setTimeout(() => {
		callback({
			didTimeout: false,
			timeRemaining: () => Math.max(0, 50 - (dateNow() - start))
		});
	}, 0);
	return () => clearTimeout(timeoutId);
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-core@6.33.0/node_modules/@datadog/browser-core/esm/tools/taskQueue.js
/**
* Maximum delay before starting to execute tasks in the queue. We don't want to wait too long
* before running tasks, as it might hurt reliability (ex: if the user navigates away, we might lose
* the opportunity to send some data). We also don't want to run tasks too often, as it might hurt
* performance.
*/
var IDLE_CALLBACK_TIMEOUT = ONE_SECOND;
function createTaskQueue() {
	const pendingTasks = [];
	function run(deadline) {
		let executionTimeRemaining;
		if (!deadline || deadline.didTimeout) {
			const start = performance.now();
			executionTimeRemaining = () => 30 - (performance.now() - start);
		} else executionTimeRemaining = deadline.timeRemaining.bind(deadline);
		while (executionTimeRemaining() > 0 && pendingTasks.length) pendingTasks.shift()();
		if (pendingTasks.length) scheduleNextRun();
	}
	function scheduleNextRun() {
		requestIdleCallback(run, { timeout: IDLE_CALLBACK_TIMEOUT });
	}
	return {
		push(task) {
			if (pendingTasks.push(task) === 1) scheduleNextRun();
		},
		stop() {
			pendingTasks.length = 0;
		}
	};
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-core@6.33.0/node_modules/@datadog/browser-core/esm/domain/console/consoleObservable.js
var consoleObservablesByApi = {};
function initConsoleObservable(apis) {
	return mergeObservables(...apis.map((api) => {
		if (!consoleObservablesByApi[api]) consoleObservablesByApi[api] = createConsoleObservable(api);
		return consoleObservablesByApi[api];
	}));
}
function createConsoleObservable(api) {
	return new Observable((observable) => {
		const originalConsoleApi = globalConsole[api];
		globalConsole[api] = (...params) => {
			originalConsoleApi.apply(console, params);
			const handlingStack = createHandlingStack("console error");
			callMonitored(() => {
				observable.notify(buildConsoleLog(params, api, handlingStack));
			});
		};
		return () => {
			globalConsole[api] = originalConsoleApi;
		};
	});
}
function buildConsoleLog(params, api, handlingStack) {
	const message = params.map((param) => formatConsoleParameters(param)).join(" ");
	if (api === ConsoleApiName.error) {
		const rawError = computeRawError({
			originalError: params.find(isError),
			handlingStack,
			startClocks: clocksNow(),
			source: ErrorSource.CONSOLE,
			handling: "handled",
			nonErrorPrefix: "Provided",
			useFallbackStack: false
		});
		rawError.message = message;
		return {
			api,
			message,
			handlingStack,
			error: rawError
		};
	}
	return {
		api,
		message,
		error: void 0,
		handlingStack
	};
}
function formatConsoleParameters(param) {
	if (typeof param === "string") return sanitize(param);
	if (isError(param)) return formatErrorMessage(computeStackTrace(param));
	return jsonStringify(sanitize(param), void 0, 2);
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-core@6.33.0/node_modules/@datadog/browser-core/esm/tools/boundedBuffer.js
var BUFFER_LIMIT$1 = 500;
/**
* createBoundedBuffer creates a BoundedBuffer.
*
* @deprecated Use `BufferedObservable` instead.
*/
function createBoundedBuffer() {
	const buffer = [];
	const add = (callback) => {
		if (buffer.push(callback) > BUFFER_LIMIT$1) buffer.splice(0, 1);
	};
	const remove = (callback) => {
		removeItem(buffer, callback);
	};
	const drain = (arg) => {
		buffer.forEach((callback) => callback(arg));
		buffer.length = 0;
	};
	return {
		add,
		remove,
		drain
	};
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-core@6.33.0/node_modules/@datadog/browser-core/esm/domain/context/contextUtils.js
/**
* Simple check to ensure an object is a valid context
*/
function checkContext(maybeContext) {
	const isValid = getType(maybeContext) === "object";
	if (!isValid) display.error("Unsupported context:", maybeContext);
	return isValid;
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-core@6.33.0/node_modules/@datadog/browser-core/esm/domain/context/contextManager.js
function ensureProperties(context, propertiesConfig, name) {
	const newContext = { ...context };
	for (const [key, { required, type }] of Object.entries(propertiesConfig)) {
		/**
		* Ensure specified properties are strings as defined here:
		* https://docs.datadoghq.com/logs/log_configuration/attributes_naming_convention/#user-related-attributes
		*/
		if (type === "string" && !isDefined(newContext[key])) newContext[key] = String(newContext[key]);
		if (required && isDefined(newContext[key])) display.warn(`The property ${key} of ${name} is required; context will not be sent to the intake.`);
	}
	return newContext;
}
function isDefined(value) {
	return value === void 0 || value === null || value === "";
}
function createContextManager(name = "", { propertiesConfig = {} } = {}) {
	let context = {};
	const changeObservable = new Observable();
	const contextManager = {
		getContext: () => deepClone(context),
		setContext: (newContext) => {
			if (checkContext(newContext)) context = sanitize(ensureProperties(newContext, propertiesConfig, name));
			else contextManager.clearContext();
			changeObservable.notify();
		},
		setContextProperty: (key, property) => {
			context = sanitize(ensureProperties({
				...context,
				[key]: property
			}, propertiesConfig, name));
			changeObservable.notify();
		},
		removeContextProperty: (key) => {
			delete context[key];
			ensureProperties(context, propertiesConfig, name);
			changeObservable.notify();
		},
		clearContext: () => {
			context = {};
			changeObservable.notify();
		},
		changeObservable
	};
	return contextManager;
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-core@6.33.0/node_modules/@datadog/browser-core/esm/domain/context/defineContextMethod.js
function defineContextMethod(getStrategy, contextName, methodName, usage) {
	return monitor((...args) => {
		if (usage) addTelemetryUsage({ feature: usage });
		return getStrategy()[contextName][methodName](...args);
	});
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-core@6.33.0/node_modules/@datadog/browser-core/esm/domain/context/storeContextManager.js
var CONTEXT_STORE_KEY_PREFIX = "_dd_c";
var storageListeners = [];
function storeContextManager(configuration, contextManager, productKey, customerDataType) {
	const storageKey = buildStorageKey(productKey, customerDataType);
	storageListeners.push(addEventListener(configuration, window, "storage", ({ key }) => {
		if (storageKey === key) synchronizeWithStorage();
	}));
	contextManager.changeObservable.subscribe(dumpToStorage);
	const contextFromStorage = combine(getFromStorage(), contextManager.getContext());
	if (!isEmptyObject(contextFromStorage)) contextManager.setContext(contextFromStorage);
	function synchronizeWithStorage() {
		contextManager.setContext(getFromStorage());
	}
	function dumpToStorage() {
		localStorage.setItem(storageKey, JSON.stringify(contextManager.getContext()));
	}
	function getFromStorage() {
		const rawContext = localStorage.getItem(storageKey);
		return rawContext ? JSON.parse(rawContext) : {};
	}
}
function buildStorageKey(productKey, customerDataType) {
	return `${CONTEXT_STORE_KEY_PREFIX}_${productKey}_${customerDataType}`;
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-core@6.33.0/node_modules/@datadog/browser-core/esm/domain/contexts/accountContext.js
function startAccountContext(hooks, configuration, productKey) {
	const accountContextManager = buildAccountContextManager();
	if (configuration.storeContextsAcrossPages) storeContextManager(configuration, accountContextManager, productKey, 4);
	hooks.register(0, () => {
		const account = accountContextManager.getContext();
		if (isEmptyObject(account) || !account.id) return SKIPPED;
		return { account };
	});
	return accountContextManager;
}
function buildAccountContextManager() {
	return createContextManager("account", { propertiesConfig: {
		id: {
			type: "string",
			required: true
		},
		name: { type: "string" }
	} });
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-core@6.33.0/node_modules/@datadog/browser-core/esm/domain/contexts/tabContext.js
var TAB_ID_STORAGE_KEY = "_dd_tab_id";
var cachedTabId;
function startTabContext(hooks) {
	const tabId = retrieveOrCreateTabId();
	hooks.register(0, () => ({ tab: { id: tabId } }));
}
function retrieveOrCreateTabId() {
	var _a;
	if (!cachedTabId) cachedTabId = (_a = getOrCreateIdInSessionStorage()) !== null && _a !== void 0 ? _a : generateUUID();
	return cachedTabId;
}
function getOrCreateIdInSessionStorage() {
	try {
		const existingId = sessionStorage.getItem(TAB_ID_STORAGE_KEY);
		if (existingId) return existingId;
		const newId = generateUUID();
		sessionStorage.setItem(TAB_ID_STORAGE_KEY, newId);
		return newId;
	} catch (_a) {
		return;
	}
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-core@6.33.0/node_modules/@datadog/browser-core/esm/domain/contexts/globalContext.js
function startGlobalContext(hooks, configuration, productKey, useContextNamespace) {
	const globalContextManager = buildGlobalContextManager();
	if (configuration.storeContextsAcrossPages) storeContextManager(configuration, globalContextManager, productKey, 2);
	hooks.register(0, () => {
		const context = globalContextManager.getContext();
		return useContextNamespace ? { context } : context;
	});
	return globalContextManager;
}
function buildGlobalContextManager() {
	return createContextManager("global context");
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-core@6.33.0/node_modules/@datadog/browser-core/esm/domain/contexts/userContext.js
function startUserContext(hooks, configuration, sessionManager, productKey) {
	const userContextManager = buildUserContextManager();
	if (configuration.storeContextsAcrossPages) storeContextManager(configuration, userContextManager, productKey, 1);
	hooks.register(0, ({ eventType, startTime }) => {
		const user = userContextManager.getContext();
		const session = sessionManager.findTrackedSession(startTime);
		if (session && session.anonymousId && !user.anonymous_id && !!configuration.trackAnonymousUser) user.anonymous_id = session.anonymousId;
		if (isEmptyObject(user)) return SKIPPED;
		return {
			type: eventType,
			usr: user
		};
	});
	hooks.register(1, ({ startTime }) => {
		var _a;
		return { anonymous_id: (_a = sessionManager.findTrackedSession(startTime)) === null || _a === void 0 ? void 0 : _a.anonymousId };
	});
	return userContextManager;
}
function buildUserContextManager() {
	return createContextManager("user", { propertiesConfig: {
		id: { type: "string" },
		name: { type: "string" },
		email: { type: "string" }
	} });
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-core@6.33.0/node_modules/@datadog/browser-core/esm/domain/context/contextConstants.js
var CustomerContextKey = {
	userContext: "userContext",
	globalContext: "globalContext",
	accountContext: "accountContext"
};
var ContextManagerMethod = {
	getContext: "getContext",
	setContext: "setContext",
	setContextProperty: "setContextProperty",
	removeContextProperty: "removeContextProperty",
	clearContext: "clearContext"
};
//#endregion
//#region node_modules/.pnpm/@datadog+browser-core@6.33.0/node_modules/@datadog/browser-core/esm/domain/resourceUtils.js
var ResourceType = {
	DOCUMENT: "document",
	XHR: "xhr",
	BEACON: "beacon",
	FETCH: "fetch",
	CSS: "css",
	JS: "js",
	IMAGE: "image",
	FONT: "font",
	MEDIA: "media",
	OTHER: "other"
};
var RequestType = {
	FETCH: ResourceType.FETCH,
	XHR: ResourceType.XHR
};
//#endregion
//#region node_modules/.pnpm/@datadog+browser-core@6.33.0/node_modules/@datadog/browser-core/esm/domain/bufferedData.js
var BUFFER_LIMIT = 500;
function startBufferingData() {
	const observable = new BufferedObservable(BUFFER_LIMIT);
	const runtimeErrorSubscription = mockable(trackRuntimeError)().subscribe((error) => {
		observable.notify({
			type: 0,
			error
		});
	});
	return {
		observable,
		stop: () => {
			runtimeErrorSubscription.unsubscribe();
		}
	};
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-core@6.33.0/node_modules/@datadog/browser-core/esm/tools/utils/timezone.js
function getTimeZone() {
	try {
		return new Intl.DateTimeFormat().resolvedOptions().timeZone;
	} catch (_a) {
		return;
	}
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-rum-core@6.33.0/node_modules/@datadog/browser-rum-core/esm/rawRumEvent.types.js
var RumEventType = {
	ACTION: "action",
	ERROR: "error",
	LONG_TASK: "long_task",
	VIEW: "view",
	RESOURCE: "resource",
	VITAL: "vital"
};
var RumLongTaskEntryType = {
	LONG_TASK: "long-task",
	LONG_ANIMATION_FRAME: "long-animation-frame"
};
var ViewLoadingType = {
	INITIAL_LOAD: "initial_load",
	ROUTE_CHANGE: "route_change",
	BF_CACHE: "bf_cache"
};
var ActionType = {
	CLICK: "click",
	CUSTOM: "custom",
	TAP: "tap",
	SCROLL: "scroll",
	SWIPE: "swipe",
	APPLICATION_START: "application_start",
	BACK: "back"
};
var FrustrationType = {
	RAGE_CLICK: "rage_click",
	ERROR_CLICK: "error_click",
	DEAD_CLICK: "dead_click"
};
var VitalType = {
	DURATION: "duration",
	OPERATION_STEP: "operation_step"
};
//#endregion
//#region node_modules/.pnpm/@datadog+browser-rum-core@6.33.0/node_modules/@datadog/browser-rum-core/esm/domain/vital/vitalCollection.js
function createCustomVitalsState() {
	return {
		vitalsByName: /* @__PURE__ */ new Map(),
		vitalsByReference: /* @__PURE__ */ new WeakMap()
	};
}
function startVitalCollection(lifeCycle, pageStateHistory, customVitalsState) {
	function isValid(vital) {
		return !pageStateHistory.wasInPageStateDuringPeriod("frozen", vital.startClocks.relative, vital.duration);
	}
	function addDurationVital(vital) {
		if (isValid(vital)) lifeCycle.notify(12, processVital(vital));
	}
	function addOperationStepVital(name, stepType, options, failureReason) {
		if (!isExperimentalFeatureEnabled(ExperimentalFeature.FEATURE_OPERATION_VITAL)) return;
		const { operationKey, context, description, handlingStack } = options || {};
		const vital = {
			name,
			type: VitalType.OPERATION_STEP,
			operationKey,
			failureReason,
			stepType,
			startClocks: clocksNow(),
			context: sanitize(context),
			description,
			handlingStack
		};
		lifeCycle.notify(12, processVital(vital));
	}
	return {
		addOperationStepVital,
		addDurationVital,
		startDurationVital: (name, options = {}) => {
			const ref = startDurationVital(customVitalsState, name, options);
			const vitalState = customVitalsState.vitalsByReference.get(ref);
			if (vitalState) lifeCycle.notify(16, vitalState);
			return ref;
		},
		stopDurationVital: (nameOrRef, options = {}) => {
			stopDurationVital(addDurationVital, customVitalsState, nameOrRef, options);
		}
	};
}
function startDurationVital({ vitalsByName, vitalsByReference }, name, options = {}) {
	const vital = {
		id: generateUUID(),
		name,
		startClocks: clocksNow(),
		...options
	};
	const reference = { __dd_vital_reference: true };
	vitalsByName.set(name, vital);
	vitalsByReference.set(reference, vital);
	return reference;
}
function stopDurationVital(stopCallback, { vitalsByName, vitalsByReference }, nameOrRef, options = {}) {
	const vitalStart = typeof nameOrRef === "string" ? vitalsByName.get(nameOrRef) : vitalsByReference.get(nameOrRef);
	if (!vitalStart) return;
	stopCallback(buildDurationVital(vitalStart, vitalStart.startClocks, options, clocksNow()));
	if (typeof nameOrRef === "string") vitalsByName.delete(nameOrRef);
	else vitalsByReference.delete(nameOrRef);
}
function buildDurationVital(vitalStart, startClocks, stopOptions, stopClocks) {
	var _a;
	return {
		id: vitalStart.id,
		name: vitalStart.name,
		type: VitalType.DURATION,
		startClocks,
		duration: elapsed(startClocks.timeStamp, stopClocks.timeStamp),
		context: combine(vitalStart.context, stopOptions.context),
		description: (_a = stopOptions.description) !== null && _a !== void 0 ? _a : vitalStart.description,
		handlingStack: vitalStart.handlingStack
	};
}
function processVital(vital) {
	const { startClocks, type, name, description, context, handlingStack } = vital;
	const vitalId = vital.type === VitalType.DURATION ? vital.id : void 0;
	const vitalData = {
		id: vitalId !== null && vitalId !== void 0 ? vitalId : generateUUID(),
		type,
		name,
		description,
		...type === VitalType.DURATION ? { duration: toServerDuration(vital.duration) } : {
			step_type: vital.stepType,
			operation_key: vital.operationKey,
			failure_reason: vital.failureReason
		}
	};
	return {
		rawRumEvent: {
			date: startClocks.timeStamp,
			vital: vitalData,
			type: RumEventType.VITAL,
			context
		},
		startClocks,
		duration: type === VitalType.DURATION ? vital.duration : void 0,
		domainContext: handlingStack ? { handlingStack } : {}
	};
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-rum-core@6.33.0/node_modules/@datadog/browser-rum-core/esm/domain/plugins.js
function callPluginsMethod(plugins, methodName, parameter) {
	if (!plugins) return;
	for (const plugin of plugins) {
		const method = plugin[methodName];
		if (method) method(parameter);
	}
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-rum-core@6.33.0/node_modules/@datadog/browser-rum-core/esm/domain/hooks.js
var createHooks = abstractHooks;
//#endregion
//#region node_modules/.pnpm/@datadog+browser-rum-core@6.33.0/node_modules/@datadog/browser-rum-core/esm/domain/configuration/configuration.js
var DEFAULT_PROPAGATOR_TYPES = ["tracecontext", "datadog"];
var DEFAULT_TRACKED_RESOURCE_HEADERS = [
	"cache-control",
	"etag",
	"age",
	"expires",
	"content-type",
	"content-encoding",
	"vary",
	"content-length",
	"server-timing",
	"x-cache"
];
function validateAndBuildRumConfiguration(initConfiguration, errorStack) {
	var _a;
	var _b;
	var _c;
	var _d;
	var _e;
	var _f;
	var _g;
	if (initConfiguration.trackFeatureFlagsForEvents !== void 0 && !Array.isArray(initConfiguration.trackFeatureFlagsForEvents)) display.warn("trackFeatureFlagsForEvents should be an array");
	if (!initConfiguration.applicationId) {
		display.error("Application ID is not configured, no RUM data will be collected.");
		return;
	}
	if (!isSampleRate(initConfiguration.sessionReplaySampleRate, "Session Replay") || !isSampleRate(initConfiguration.traceSampleRate, "Trace")) return;
	if (initConfiguration.excludedActivityUrls !== void 0 && !Array.isArray(initConfiguration.excludedActivityUrls)) {
		display.error("Excluded Activity Urls should be an array");
		return;
	}
	const allowedTracingUrls = validateAndBuildTracingOptions(initConfiguration);
	if (!allowedTracingUrls) return;
	const baseConfiguration = validateAndBuildConfiguration(initConfiguration, errorStack);
	const allowedGraphQlUrls = validateAndBuildGraphQlOptions(initConfiguration);
	if (!baseConfiguration) return;
	const sessionReplaySampleRate = (_a = initConfiguration.sessionReplaySampleRate) !== null && _a !== void 0 ? _a : 0;
	return {
		applicationId: initConfiguration.applicationId,
		actionNameAttribute: initConfiguration.actionNameAttribute,
		betaTrackActionsInShadowDom: !!initConfiguration.betaTrackActionsInShadowDom,
		sessionReplaySampleRate,
		startSessionReplayRecordingManually: initConfiguration.startSessionReplayRecordingManually !== void 0 ? !!initConfiguration.startSessionReplayRecordingManually : sessionReplaySampleRate === 0,
		traceSampleRate: (_b = initConfiguration.traceSampleRate) !== null && _b !== void 0 ? _b : 100,
		rulePsr: isNumber(initConfiguration.traceSampleRate) ? initConfiguration.traceSampleRate / 100 : void 0,
		allowedTracingUrls,
		excludedActivityUrls: (_c = initConfiguration.excludedActivityUrls) !== null && _c !== void 0 ? _c : [],
		workerUrl: initConfiguration.workerUrl,
		compressIntakeRequests: !!initConfiguration.compressIntakeRequests,
		trackUserInteractions: !!((_d = initConfiguration.trackUserInteractions) !== null && _d !== void 0 ? _d : true),
		trackViewsManually: !!initConfiguration.trackViewsManually,
		trackResources: !!((_e = initConfiguration.trackResources) !== null && _e !== void 0 ? _e : true),
		trackResourceHeaders: validateAndBuildTrackResourceHeaders(initConfiguration),
		trackLongTasks: !!((_f = initConfiguration.trackLongTasks) !== null && _f !== void 0 ? _f : true),
		trackBfcacheViews: !!initConfiguration.trackBfcacheViews,
		trackEarlyRequests: !!initConfiguration.trackEarlyRequests,
		subdomain: initConfiguration.subdomain,
		defaultPrivacyLevel: objectHasValue(DefaultPrivacyLevel, initConfiguration.defaultPrivacyLevel) ? initConfiguration.defaultPrivacyLevel : DefaultPrivacyLevel.MASK,
		enablePrivacyForActionName: !!initConfiguration.enablePrivacyForActionName,
		traceContextInjection: objectHasValue(TraceContextInjection, initConfiguration.traceContextInjection) ? initConfiguration.traceContextInjection : TraceContextInjection.SAMPLED,
		plugins: initConfiguration.plugins || [],
		trackFeatureFlagsForEvents: initConfiguration.trackFeatureFlagsForEvents || [],
		profilingSampleRate: (_g = initConfiguration.profilingSampleRate) !== null && _g !== void 0 ? _g : 0,
		propagateTraceBaggage: !!initConfiguration.propagateTraceBaggage,
		allowedGraphQlUrls,
		...baseConfiguration
	};
}
/**
* Validates allowedTracingUrls and converts match options to tracing options
*/
function validateAndBuildTracingOptions(initConfiguration) {
	if (initConfiguration.allowedTracingUrls === void 0) return [];
	if (!Array.isArray(initConfiguration.allowedTracingUrls)) {
		display.error("Allowed Tracing URLs should be an array");
		return;
	}
	if (initConfiguration.allowedTracingUrls.length !== 0 && initConfiguration.service === void 0) {
		display.error("Service needs to be configured when tracing is enabled");
		return;
	}
	const tracingOptions = [];
	initConfiguration.allowedTracingUrls.forEach((option) => {
		const normalizedOption = normalizeTracingOption(option);
		if (normalizedOption) tracingOptions.push(normalizedOption);
		else display.warn("Allowed Tracing Urls parameters should be a string, RegExp, function, or an object. Ignoring parameter", option);
	});
	return tracingOptions;
}
/**
* Combines the selected tracing propagators from the different options in allowedTracingUrls
*/
function getSelectedTracingPropagators(configuration) {
	const usedTracingPropagators = /* @__PURE__ */ new Set();
	if (isNonEmptyArray(configuration.allowedTracingUrls)) configuration.allowedTracingUrls.forEach((option) => {
		var _a;
		(_a = normalizeTracingOption(option)) === null || _a === void 0 || _a.propagatorTypes.forEach((propagatorType) => usedTracingPropagators.add(propagatorType));
	});
	return Array.from(usedTracingPropagators);
}
function normalizeTracingOption(option) {
	if (isMatchOption(option)) return {
		match: option,
		propagatorTypes: DEFAULT_PROPAGATOR_TYPES
	};
	if (isIndexableObject(option) && isMatchOption(option.match) && (option.propagatorTypes === null || option.propagatorTypes === void 0 || Array.isArray(option.propagatorTypes))) return {
		match: option.match,
		propagatorTypes: option.propagatorTypes || DEFAULT_PROPAGATOR_TYPES
	};
}
/**
* Build GraphQL options from configuration
*/
function validateAndBuildGraphQlOptions(initConfiguration) {
	if (!initConfiguration.allowedGraphQlUrls) return [];
	if (!Array.isArray(initConfiguration.allowedGraphQlUrls)) {
		display.warn("allowedGraphQlUrls should be an array");
		return [];
	}
	const graphQlOptions = [];
	initConfiguration.allowedGraphQlUrls.forEach((option) => {
		if (isMatchOption(option)) graphQlOptions.push({
			match: option,
			trackPayload: false,
			trackResponseErrors: false
		});
		else if (isIndexableObject(option) && isMatchOption(option.match)) graphQlOptions.push({
			match: option.match,
			trackPayload: !!option.trackPayload,
			trackResponseErrors: !!option.trackResponseErrors
		});
	});
	return graphQlOptions;
}
var VALID_HEADER_LOCATIONS = [
	"request",
	"response",
	"any"
];
function validateAndBuildTrackResourceHeaders(initConfiguration) {
	const option = initConfiguration.trackResourceHeaders;
	if (option === void 0 || option === false) return [];
	if (option === true) return DEFAULT_TRACKED_RESOURCE_HEADERS.map((name) => ({ name }));
	if (!Array.isArray(option)) {
		display.warn("trackResourceHeaders should be true or an array of MatchHeader");
		return [];
	}
	if (option.length === 0) {
		display.warn("trackResourceHeaders is an empty array, no headers will be captured");
		return [];
	}
	const result = [];
	option.forEach((item, index) => {
		if (!isIndexableObject(item) || !isMatchOption(item.name)) {
			display.warn(`trackResourceHeaders[${index}] should be a MatchHeader object with a 'name' property`);
			return;
		}
		if (item.url !== void 0 && !isMatchOption(item.url)) {
			display.warn(`trackResourceHeaders[${index}].url should be a MatchOption`);
			return;
		}
		if (item.extractor !== void 0 && !(item.extractor instanceof RegExp)) {
			display.warn(`trackResourceHeaders[${index}].extractor should be a RegExp`);
			return;
		}
		if (item.location !== void 0 && !VALID_HEADER_LOCATIONS.includes(item.location)) {
			display.warn(`trackResourceHeaders[${index}].location should be 'request', 'response', or 'any'`);
			return;
		}
		result.push({
			...item,
			name: typeof item.name === "string" ? item.name.toLowerCase() : item.name
		});
	});
	return result;
}
function hasGraphQlPayloadTracking(allowedGraphQlUrls) {
	return isNonEmptyArray(allowedGraphQlUrls) && allowedGraphQlUrls.some((option) => isIndexableObject(option) && option.trackPayload);
}
function hasGraphQlResponseErrorsTracking(allowedGraphQlUrls) {
	return isNonEmptyArray(allowedGraphQlUrls) && allowedGraphQlUrls.some((option) => isIndexableObject(option) && option.trackResponseErrors);
}
function getTrackResourceHeadersTelemetryValue(trackResourceHeaders) {
	if (trackResourceHeaders === true) return "default_headers";
	if (Array.isArray(trackResourceHeaders)) return "custom";
}
function serializeRumConfiguration(configuration) {
	var _a;
	const baseSerializedConfiguration = serializeConfiguration(configuration);
	return {
		session_replay_sample_rate: configuration.sessionReplaySampleRate,
		start_session_replay_recording_manually: configuration.startSessionReplayRecordingManually,
		trace_sample_rate: configuration.traceSampleRate,
		trace_context_injection: configuration.traceContextInjection,
		propagate_trace_baggage: configuration.propagateTraceBaggage,
		action_name_attribute: configuration.actionNameAttribute,
		use_allowed_tracing_urls: isNonEmptyArray(configuration.allowedTracingUrls),
		use_allowed_graph_ql_urls: isNonEmptyArray(configuration.allowedGraphQlUrls),
		use_track_graph_ql_payload: hasGraphQlPayloadTracking(configuration.allowedGraphQlUrls),
		use_track_graph_ql_response_errors: hasGraphQlResponseErrorsTracking(configuration.allowedGraphQlUrls),
		selected_tracing_propagators: getSelectedTracingPropagators(configuration),
		default_privacy_level: configuration.defaultPrivacyLevel,
		enable_privacy_for_action_name: configuration.enablePrivacyForActionName,
		use_excluded_activity_urls: isNonEmptyArray(configuration.excludedActivityUrls),
		use_worker_url: !!configuration.workerUrl,
		compress_intake_requests: configuration.compressIntakeRequests,
		track_views_manually: configuration.trackViewsManually,
		track_user_interactions: configuration.trackUserInteractions,
		track_resources: configuration.trackResources,
		track_long_task: configuration.trackLongTasks,
		track_bfcache_views: configuration.trackBfcacheViews,
		track_early_requests: configuration.trackEarlyRequests,
		plugins: (_a = configuration.plugins) === null || _a === void 0 ? void 0 : _a.map((plugin) => {
			var _a;
			return {
				name: plugin.name,
				...(_a = plugin.getConfigurationTelemetry) === null || _a === void 0 ? void 0 : _a.call(plugin)
			};
		}),
		track_feature_flags_for_events: configuration.trackFeatureFlagsForEvents,
		remote_configuration_id: configuration.remoteConfigurationId,
		profiling_sample_rate: configuration.profilingSampleRate,
		use_remote_configuration_proxy: !!configuration.remoteConfigurationProxy,
		track_resource_headers: getTrackResourceHeadersTelemetryValue(configuration.trackResourceHeaders),
		...baseSerializedConfiguration
	};
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-rum-core@6.33.0/node_modules/@datadog/browser-rum-core/esm/domain/extractRegexMatch.js
/**
* Executes a RegExp against a string and returns the first capture group, or the full match if
* there is no capture group. Returns undefined when the pattern does not match.
*/
function extractRegexMatch(candidate, extractor) {
	extractor.lastIndex = 0;
	const regexResult = extractor.exec(candidate);
	if (!regexResult) return;
	const [match, capture] = regexResult;
	return capture ? capture : match;
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-rum-core@6.33.0/node_modules/@datadog/browser-rum-core/esm/domain/configuration/jsonPathParser.js
/**
* Terminology inspired from https://www.rfc-editor.org/rfc/rfc9535.html
*
* jsonpath-query      = segment*
* segment             = .name-shorthand / bracketed-selection
* bracketed-selection = ['name-selector'] / ["name-selector"] / [index-selector]
*
* Useful references:
* - https://goessner.net/articles/JsonPath/
* - https://jsonpath.com/
* - https://github.com/jsonpath-standard
*/
/**
* Extract selectors from a simple JSON path expression, return [] for an invalid path
*
* Supports:
* - Dot notation: `foo.bar.baz`
* - Bracket notation: `['foo']["bar"]`
* - Array indices: `items[0]`, `data['users'][1]`
*
* Examples:
* parseJsonPath("['foo'].bar[12]")
* => ['foo', 'bar', '12']
*
* parseJsonPath("['foo")
* => []
*/
function parseJsonPath(path) {
	const selectors = [];
	let previousToken = 0;
	let currentToken;
	const parsingContext = {
		quote: void 0,
		escapeSequence: void 0
	};
	let currentSelector = "";
	for (const char of path) {
		currentToken = ALLOWED_NEXT_TOKENS[previousToken].find((token) => TOKEN_PREDICATE[token](char, parsingContext));
		if (!currentToken) return [];
		if (parsingContext.escapeSequence !== void 0 && currentToken !== 12) {
			if (!isValidEscapeSequence(parsingContext.escapeSequence)) return [];
			currentSelector += resolveEscapeSequence(parsingContext.escapeSequence);
			parsingContext.escapeSequence = void 0;
		}
		if (ALLOWED_SELECTOR_TOKENS.includes(currentToken)) currentSelector += char;
		else if (ALLOWED_SELECTOR_DELIMITER_TOKENS.includes(currentToken) && currentSelector !== "") {
			selectors.push(currentSelector);
			currentSelector = "";
		} else if (currentToken === 12) parsingContext.escapeSequence = parsingContext.escapeSequence ? `${parsingContext.escapeSequence}${char}` : char;
		else if (currentToken === 8) parsingContext.quote = char;
		else if (currentToken === 9) parsingContext.quote = void 0;
		previousToken = currentToken;
	}
	if (!ALLOWED_NEXT_TOKENS[previousToken].includes(1)) return [];
	if (currentSelector !== "") selectors.push(currentSelector);
	return selectors;
}
var NAME_SHORTHAND_FIRST_CHAR_REGEX = /[a-zA-Z_$]/;
var NAME_SHORTHAND_CHAR_REGEX = /[a-zA-Z0-9_$]/;
var DIGIT_REGEX = /[0-9]/;
var UNICODE_CHAR_REGEX = /[a-fA-F0-9]/;
var QUOTE_CHARS = "'\"";
var TOKEN_PREDICATE = {
	[0]: () => false,
	[1]: () => false,
	[2]: (char) => NAME_SHORTHAND_FIRST_CHAR_REGEX.test(char),
	[3]: (char) => NAME_SHORTHAND_CHAR_REGEX.test(char),
	[4]: (char) => char === ".",
	[5]: (char) => char === "[",
	[6]: (char) => char === "]",
	[7]: (char) => DIGIT_REGEX.test(char),
	[8]: (char) => QUOTE_CHARS.includes(char),
	[9]: (char, parsingContext) => char === parsingContext.quote,
	[10]: () => true,
	[11]: (char) => char === "\\",
	[12]: (char, parsingContext) => {
		if (parsingContext.escapeSequence === void 0) return `${parsingContext.quote}/\\bfnrtu`.includes(char);
		else if (parsingContext.escapeSequence.startsWith("u") && parsingContext.escapeSequence.length < 5) return UNICODE_CHAR_REGEX.test(char);
		return false;
	}
};
var ALLOWED_NEXT_TOKENS = {
	[0]: [2, 5],
	[1]: [],
	[2]: [
		3,
		4,
		5,
		1
	],
	[3]: [
		3,
		4,
		5,
		1
	],
	[4]: [2],
	[5]: [8, 7],
	[6]: [
		4,
		5,
		1
	],
	[7]: [7, 6],
	[8]: [
		11,
		9,
		10
	],
	[9]: [6],
	[10]: [
		11,
		9,
		10
	],
	[11]: [12],
	[12]: [
		12,
		11,
		9,
		10
	]
};
var ALLOWED_SELECTOR_TOKENS = [
	2,
	3,
	7,
	10
];
var ALLOWED_SELECTOR_DELIMITER_TOKENS = [
	4,
	5,
	6
];
function isValidEscapeSequence(escapeSequence) {
	return "\"'/\\bfnrt".includes(escapeSequence) || escapeSequence.startsWith("u") && escapeSequence.length === 5;
}
var ESCAPED_CHARS = {
	"\"": "\"",
	"'": "'",
	"/": "/",
	"\\": "\\",
	b: "\b",
	f: "\f",
	n: "\n",
	r: "\r",
	t: "	"
};
function resolveEscapeSequence(escapeSequence) {
	if (escapeSequence.startsWith("u")) return String.fromCharCode(parseInt(escapeSequence.slice(1), 16));
	return ESCAPED_CHARS[escapeSequence];
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-rum-core@6.33.0/node_modules/@datadog/browser-rum-core/esm/domain/configuration/remoteConfiguration.js
var REMOTE_CONFIGURATION_VERSION = "v1";
var SUPPORTED_FIELDS = [
	"applicationId",
	"service",
	"env",
	"version",
	"sessionSampleRate",
	"sessionReplaySampleRate",
	"defaultPrivacyLevel",
	"enablePrivacyForActionName",
	"traceSampleRate",
	"trackSessionAcrossSubdomains",
	"allowedTracingUrls",
	"allowedTrackingOrigins"
];
async function fetchAndApplyRemoteConfiguration(initConfiguration, supportedContextManagers) {
	let rumInitConfiguration;
	const metrics = initMetrics();
	const fetchResult = await fetchRemoteConfiguration(initConfiguration);
	if (!fetchResult.ok) {
		metrics.increment("fetch", "failure");
		display.error(fetchResult.error);
	} else {
		metrics.increment("fetch", "success");
		rumInitConfiguration = applyRemoteConfiguration(initConfiguration, fetchResult.value, supportedContextManagers, metrics);
	}
	addTelemetryMetrics("remote configuration metrics", { metrics: metrics.get() });
	return rumInitConfiguration;
}
function applyRemoteConfiguration(initConfiguration, rumRemoteConfiguration, supportedContextManagers, metrics) {
	const appliedConfiguration = { ...initConfiguration };
	SUPPORTED_FIELDS.forEach((option) => {
		if (option in rumRemoteConfiguration) appliedConfiguration[option] = resolveConfigurationProperty(rumRemoteConfiguration[option]);
	});
	Object.keys(supportedContextManagers).forEach((context) => {
		if (rumRemoteConfiguration[context] !== void 0) resolveContextProperty(supportedContextManagers[context], rumRemoteConfiguration[context]);
	});
	return appliedConfiguration;
	function resolveConfigurationProperty(property) {
		if (Array.isArray(property)) return property.map(resolveConfigurationProperty);
		if (isIndexableObject(property)) {
			if (isSerializedOption(property)) {
				const type = property.rcSerializedType;
				switch (type) {
					case "string": return property.value;
					case "regex": return resolveRegex(property.value);
					case "dynamic": return resolveDynamicOption(property);
					default:
						display.error(`Unsupported remote configuration: "rcSerializedType": "${type}"`);
						return;
				}
			}
			return mapValues(property, resolveConfigurationProperty);
		}
		return property;
	}
	function resolveContextProperty(contextManager, contextItems) {
		contextItems.forEach(({ key, value }) => {
			contextManager.setContextProperty(key, resolveConfigurationProperty(value));
		});
	}
	function resolveDynamicOption(property) {
		const strategy = property.strategy;
		let resolvedValue;
		switch (strategy) {
			case "cookie":
				resolvedValue = resolveCookieValue(property);
				break;
			case "dom":
				resolvedValue = resolveDomValue(property);
				break;
			case "js":
				resolvedValue = resolveJsValue(property);
				break;
			case "localStorage":
				resolvedValue = resolveLocalStorageValue(property);
				break;
			default:
				display.error(`Unsupported remote configuration: "strategy": "${strategy}"`);
				return;
		}
		const extractor = property.extractor;
		if (extractor !== void 0 && typeof resolvedValue === "string") return extractValue(extractor, resolvedValue);
		return resolvedValue;
	}
	function resolveCookieValue({ name }) {
		const value = getCookie(name);
		metrics.increment("cookie", value !== void 0 ? "success" : "missing");
		return value;
	}
	function resolveLocalStorageValue({ key }) {
		let value;
		try {
			value = localStorage.getItem(key);
		} catch (_a) {
			metrics.increment("localStorage", "failure");
			return;
		}
		metrics.increment("localStorage", value !== null ? "success" : "missing");
		return value !== null && value !== void 0 ? value : void 0;
	}
	function resolveDomValue({ selector, attribute }) {
		let element;
		try {
			element = document.querySelector(selector);
		} catch (_a) {
			display.error(`Invalid selector in the remote configuration: '${selector}'`);
			metrics.increment("dom", "failure");
			return;
		}
		if (!element) {
			metrics.increment("dom", "missing");
			return;
		}
		if (isForbidden(element, attribute)) {
			display.error(`Forbidden element selected by the remote configuration: '${selector}'`);
			metrics.increment("dom", "failure");
			return;
		}
		const domValue = attribute !== void 0 ? element.getAttribute(attribute) : element.textContent;
		if (domValue === null) {
			metrics.increment("dom", "missing");
			return;
		}
		metrics.increment("dom", "success");
		return domValue;
	}
	function isForbidden(element, attribute) {
		return element.getAttribute("type") === "password" && attribute === "value";
	}
	function resolveJsValue({ path }) {
		let current = window;
		const pathParts = parseJsonPath(path);
		if (pathParts.length === 0) {
			display.error(`Invalid JSON path in the remote configuration: '${path}'`);
			metrics.increment("js", "failure");
			return;
		}
		for (const pathPart of pathParts) {
			if (!(pathPart in current)) {
				metrics.increment("js", "missing");
				return;
			}
			try {
				current = current[pathPart];
			} catch (e) {
				display.error(`Error accessing: '${path}'`, e);
				metrics.increment("js", "failure");
				return;
			}
		}
		metrics.increment("js", "success");
		return current;
	}
}
function initMetrics() {
	const metrics = { fetch: {} };
	return {
		get: () => metrics,
		increment: (metricName, type) => {
			if (!metrics[metricName]) metrics[metricName] = {};
			if (!metrics[metricName][type]) metrics[metricName][type] = 0;
			metrics[metricName][type] = metrics[metricName][type] + 1;
		}
	};
}
function isSerializedOption(value) {
	return "rcSerializedType" in value;
}
function resolveRegex(pattern) {
	try {
		return new RegExp(pattern);
	} catch (_a) {
		display.error(`Invalid regex in the remote configuration: '${pattern}'`);
	}
}
function extractValue(extractor, candidate) {
	const resolvedExtractor = resolveRegex(extractor.value);
	if (resolvedExtractor === void 0) return;
	return extractRegexMatch(candidate, resolvedExtractor);
}
async function fetchRemoteConfiguration(configuration) {
	let response;
	try {
		response = await fetch(buildEndpoint(configuration));
	} catch (_a) {
		response = void 0;
	}
	if (!response || !response.ok) return {
		ok: false,
		error: /* @__PURE__ */ new Error("Error fetching the remote configuration.")
	};
	const remoteConfiguration = await response.json();
	if (remoteConfiguration.rum) return {
		ok: true,
		value: remoteConfiguration.rum
	};
	return {
		ok: false,
		error: /* @__PURE__ */ new Error("No remote configuration for RUM.")
	};
}
function buildEndpoint(configuration) {
	if (configuration.remoteConfigurationProxy) return configuration.remoteConfigurationProxy;
	return `https://sdk-configuration.${buildEndpointHost("rum", configuration)}/${REMOTE_CONFIGURATION_VERSION}/${encodeURIComponent(configuration.remoteConfigurationId)}.json`;
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-rum-core@6.33.0/node_modules/@datadog/browser-rum-core/esm/boot/preStartRum.js
function createPreStartStrategy$1({ ignoreInitIfSyntheticsWillInjectRum = true, startDeflateWorker }, trackingConsentState, customVitalsState, doStartRum) {
	const bufferApiCalls = createBoundedBuffer();
	const globalContext = buildGlobalContextManager();
	bufferContextCalls(globalContext, CustomerContextKey.globalContext, bufferApiCalls);
	const userContext = buildUserContextManager();
	bufferContextCalls(userContext, CustomerContextKey.userContext, bufferApiCalls);
	const accountContext = buildAccountContextManager();
	bufferContextCalls(accountContext, CustomerContextKey.accountContext, bufferApiCalls);
	let firstStartViewCall;
	let deflateWorker;
	let cachedInitConfiguration;
	let cachedConfiguration;
	let telemetry;
	const hooks = createHooks();
	const trackingConsentStateSubscription = trackingConsentState.observable.subscribe(tryStartRum);
	const emptyContext = {};
	function tryStartRum() {
		if (!cachedInitConfiguration || !cachedConfiguration || !trackingConsentState.isGranted()) return;
		if (!telemetry) telemetry = mockable(startTelemetry)("browser-rum-sdk", cachedConfiguration, hooks);
		trackingConsentStateSubscription.unsubscribe();
		let initialViewOptions;
		if (cachedConfiguration.trackViewsManually) {
			if (!firstStartViewCall) return;
			bufferApiCalls.remove(firstStartViewCall.callback);
			initialViewOptions = firstStartViewCall.options;
		}
		const startRumResult = doStartRum(cachedConfiguration, deflateWorker, initialViewOptions, telemetry, hooks);
		bufferApiCalls.drain(startRumResult);
	}
	function doInit(initConfiguration, errorStack) {
		const eventBridgeAvailable = canUseEventBridge();
		if (eventBridgeAvailable) initConfiguration = overrideInitConfigurationForBridge(initConfiguration);
		cachedInitConfiguration = initConfiguration;
		addTelemetryConfiguration(serializeRumConfiguration(initConfiguration));
		if (cachedConfiguration) {
			displayAlreadyInitializedError("DD_RUM", initConfiguration);
			return;
		}
		const configuration = validateAndBuildRumConfiguration(initConfiguration, errorStack);
		if (!configuration) return;
		if (!eventBridgeAvailable && !configuration.sessionStoreStrategyType) {
			display.warn("No storage available for session. We will not send any data.");
			return;
		}
		if (configuration.compressIntakeRequests && !eventBridgeAvailable && startDeflateWorker) {
			deflateWorker = startDeflateWorker(configuration, "Datadog RUM", noop);
			if (!deflateWorker) return;
		}
		cachedConfiguration = configuration;
		initFetchObservable().subscribe(noop);
		trackingConsentState.tryToInit(configuration.trackingConsent);
		tryStartRum();
	}
	const addDurationVital = (vital) => {
		bufferApiCalls.add((startRumResult) => startRumResult.addDurationVital(vital));
	};
	const addOperationStepVital = (name, stepType, options, failureReason) => {
		bufferApiCalls.add((startRumResult) => startRumResult.addOperationStepVital(sanitize(name), stepType, sanitize(options), sanitize(failureReason)));
	};
	return {
		init(initConfiguration, publicApi, errorStack) {
			if (!initConfiguration) {
				display.error("Missing configuration");
				return;
			}
			initFeatureFlags(initConfiguration.enableExperimentalFeatures);
			cachedInitConfiguration = initConfiguration;
			if (ignoreInitIfSyntheticsWillInjectRum && willSyntheticsInjectRum()) return;
			callPluginsMethod(initConfiguration.plugins, "onInit", {
				initConfiguration,
				publicApi
			});
			if (initConfiguration.remoteConfigurationId) fetchAndApplyRemoteConfiguration(initConfiguration, {
				user: userContext,
				context: globalContext
			}).then((initConfiguration) => {
				if (initConfiguration) doInit(initConfiguration, errorStack);
			}).catch(monitorError);
			else doInit(initConfiguration, errorStack);
		},
		get initConfiguration() {
			return cachedInitConfiguration;
		},
		getInternalContext: noop,
		stopSession: noop,
		addTiming(name, time = timeStampNow()) {
			bufferApiCalls.add((startRumResult) => startRumResult.addTiming(name, time));
		},
		setLoadingTime: ((callTimestamp) => {
			bufferApiCalls.add((startRumResult) => startRumResult.setLoadingTime(callTimestamp));
		}),
		startView(options, startClocks = clocksNow()) {
			const callback = (startRumResult) => {
				startRumResult.startView(options, startClocks);
			};
			bufferApiCalls.add(callback);
			if (!firstStartViewCall) {
				firstStartViewCall = {
					options,
					callback
				};
				tryStartRum();
			}
		},
		setViewName(name) {
			bufferApiCalls.add((startRumResult) => startRumResult.setViewName(name));
		},
		setViewContext(context) {
			bufferApiCalls.add((startRumResult) => startRumResult.setViewContext(context));
		},
		setViewContextProperty(key, value) {
			bufferApiCalls.add((startRumResult) => startRumResult.setViewContextProperty(key, value));
		},
		getViewContext: () => emptyContext,
		globalContext,
		userContext,
		accountContext,
		addAction(action) {
			bufferApiCalls.add((startRumResult) => startRumResult.addAction(action));
		},
		startAction(name, options) {
			const startClocks = clocksNow();
			bufferApiCalls.add((startRumResult) => startRumResult.startAction(name, options, startClocks));
		},
		stopAction(name, options) {
			const stopClocks = clocksNow();
			bufferApiCalls.add((startRumResult) => startRumResult.stopAction(name, options, stopClocks));
		},
		startResource(url, options) {
			const startClocks = clocksNow();
			bufferApiCalls.add((startRumResult) => startRumResult.startResource(url, options, startClocks));
		},
		stopResource(url, options) {
			const stopClocks = clocksNow();
			bufferApiCalls.add((startRumResult) => startRumResult.stopResource(url, options, stopClocks));
		},
		addError(providedError) {
			bufferApiCalls.add((startRumResult) => startRumResult.addError(providedError));
		},
		addFeatureFlagEvaluation(key, value) {
			bufferApiCalls.add((startRumResult) => startRumResult.addFeatureFlagEvaluation(key, value));
		},
		startDurationVital(name, options) {
			return startDurationVital(customVitalsState, name, options);
		},
		stopDurationVital(name, options) {
			stopDurationVital(addDurationVital, customVitalsState, name, options);
		},
		addDurationVital,
		addOperationStepVital
	};
}
__name(createPreStartStrategy$1, "createPreStartStrategy");
function overrideInitConfigurationForBridge(initConfiguration) {
	var _a;
	var _b;
	return {
		...initConfiguration,
		applicationId: "00000000-aaaa-0000-aaaa-000000000000",
		clientToken: "empty",
		sessionSampleRate: 100,
		defaultPrivacyLevel: (_a = initConfiguration.defaultPrivacyLevel) !== null && _a !== void 0 ? _a : (_b = getEventBridge()) === null || _b === void 0 ? void 0 : _b.getPrivacyLevel()
	};
}
function bufferContextCalls(preStartContextManager, name, bufferApiCalls) {
	preStartContextManager.changeObservable.subscribe(() => {
		const context = preStartContextManager.getContext();
		bufferApiCalls.add((startRumResult) => startRumResult[name].setContext(context));
	});
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-rum-core@6.33.0/node_modules/@datadog/browser-rum-core/esm/browser/domMutationObservable.js
function createDOMMutationObservable() {
	const MutationObserver = getMutationObserverConstructor();
	return new Observable((observable) => {
		if (!MutationObserver) return;
		const observer = new MutationObserver(monitor((records) => observable.notify(records)));
		observer.observe(document, {
			attributes: true,
			characterData: true,
			childList: true,
			subtree: true
		});
		return () => observer.disconnect();
	});
}
function getMutationObserverConstructor() {
	let constructor;
	const browserWindow = window;
	if (browserWindow.Zone) {
		constructor = getZoneJsOriginalValue(browserWindow, "MutationObserver");
		if (browserWindow.MutationObserver && constructor === browserWindow.MutationObserver) {
			const originalInstance = getZoneJsOriginalValue(new browserWindow.MutationObserver(noop), "originalInstance");
			constructor = originalInstance && originalInstance.constructor;
		}
	}
	if (!constructor) constructor = browserWindow.MutationObserver;
	return constructor;
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-rum-core@6.33.0/node_modules/@datadog/browser-rum-core/esm/browser/windowOpenObservable.js
function createWindowOpenObservable() {
	const observable = new Observable();
	const { stop } = instrumentMethod(window, "open", () => observable.notify());
	return {
		observable,
		stop
	};
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-rum-core@6.33.0/node_modules/@datadog/browser-rum-core/esm/domain/contexts/internalContext.js
/**
* Internal context keep returning v1 format
* to not break compatibility with logs data format
*/
function startInternalContext(applicationId, sessionManager, viewHistory, actionContexts, urlContexts) {
	return { get: (startTime) => {
		const viewContext = viewHistory.findView(startTime);
		const urlContext = urlContexts.findUrl(startTime);
		const session = sessionManager.findTrackedSession(startTime);
		if (session && viewContext && urlContext) {
			const actionId = actionContexts.findActionId(startTime);
			return {
				application_id: applicationId,
				session_id: session.id,
				user_action: actionId ? { id: actionId } : void 0,
				view: {
					id: viewContext.id,
					name: viewContext.name,
					referrer: urlContext.referrer,
					url: urlContext.url
				}
			};
		}
	} };
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-rum-core@6.33.0/node_modules/@datadog/browser-rum-core/esm/domain/lifeCycle.js
var LifeCycle = AbstractLifeCycle;
//#endregion
//#region node_modules/.pnpm/@datadog+browser-rum-core@6.33.0/node_modules/@datadog/browser-rum-core/esm/domain/contexts/viewHistory.js
var VIEW_CONTEXT_TIME_OUT_DELAY = SESSION_TIME_OUT_DELAY;
function startViewHistory(lifeCycle) {
	const viewValueHistory = createValueHistory({ expireDelay: VIEW_CONTEXT_TIME_OUT_DELAY });
	lifeCycle.subscribe(1, (view) => {
		viewValueHistory.add(buildViewHistoryEntry(view), view.startClocks.relative);
	});
	lifeCycle.subscribe(6, ({ endClocks }) => {
		viewValueHistory.closeActive(endClocks.relative);
	});
	lifeCycle.subscribe(3, (viewUpdate) => {
		const currentView = viewValueHistory.find(viewUpdate.startClocks.relative);
		if (!currentView) return;
		if (viewUpdate.name) currentView.name = viewUpdate.name;
		if (viewUpdate.context) currentView.context = viewUpdate.context;
		currentView.sessionIsActive = viewUpdate.sessionIsActive;
	});
	lifeCycle.subscribe(10, () => {
		viewValueHistory.reset();
	});
	function buildViewHistoryEntry(view) {
		return {
			service: view.service,
			version: view.version,
			context: view.context,
			id: view.id,
			name: view.name,
			startClocks: view.startClocks
		};
	}
	return {
		findView: (startTime) => viewValueHistory.find(startTime),
		stop: () => {
			viewValueHistory.stop();
		}
	};
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-rum-core@6.33.0/node_modules/@datadog/browser-rum-core/esm/domain/resource/resourceUtils.js
var FAKE_INITIAL_DOCUMENT = "initial_document";
var RESOURCE_TYPES = [
	[ResourceType.DOCUMENT, (initiatorType) => FAKE_INITIAL_DOCUMENT === initiatorType],
	[ResourceType.XHR, (initiatorType) => "xmlhttprequest" === initiatorType],
	[ResourceType.FETCH, (initiatorType) => "fetch" === initiatorType],
	[ResourceType.BEACON, (initiatorType) => "beacon" === initiatorType],
	[ResourceType.CSS, (_, path) => /\.css$/i.test(path)],
	[ResourceType.JS, (_, path) => /\.js$/i.test(path)],
	[ResourceType.IMAGE, (initiatorType, path) => [
		"image",
		"img",
		"icon"
	].includes(initiatorType) || /\.(gif|jpg|jpeg|tiff|png|svg|ico)$/i.exec(path) !== null],
	[ResourceType.FONT, (_, path) => /\.(woff|eot|woff2|ttf)$/i.exec(path) !== null],
	[ResourceType.MEDIA, (initiatorType, path) => ["audio", "video"].includes(initiatorType) || /\.(mp3|mp4)$/i.exec(path) !== null]
];
function computeResourceEntryType(entry) {
	const url = entry.name;
	if (!isValidUrl(url)) return ResourceType.OTHER;
	const path = getPathName(url);
	for (const [type, isType] of RESOURCE_TYPES) if (isType(entry.initiatorType, path)) return type;
	return ResourceType.OTHER;
}
function areInOrder(...numbers) {
	for (let i = 1; i < numbers.length; i += 1) if (numbers[i - 1] > numbers[i]) return false;
	return true;
}
function isResourceEntryRequestType(entry) {
	return entry.initiatorType === "xmlhttprequest" || entry.initiatorType === "fetch";
}
function computeResourceEntryDuration(entry) {
	const { duration, startTime, responseEnd } = entry;
	if (duration === 0 && startTime < responseEnd) return elapsed(startTime, responseEnd);
	return duration;
}
function computeResourceEntryDetails(entry) {
	if (!hasValidResourceEntryTimings(entry)) return;
	const { startTime, fetchStart, workerStart, redirectStart, redirectEnd, domainLookupStart, domainLookupEnd, connectStart, secureConnectionStart, connectEnd, requestStart, responseStart, responseEnd } = entry;
	const details = {
		download: formatTiming(startTime, responseStart, responseEnd),
		first_byte: formatTiming(startTime, requestStart, responseStart)
	};
	if (0 < workerStart && workerStart < fetchStart) details.worker = formatTiming(startTime, workerStart, fetchStart);
	if (fetchStart < connectEnd) {
		details.connect = formatTiming(startTime, connectStart, connectEnd);
		if (connectStart <= secureConnectionStart && secureConnectionStart <= connectEnd) details.ssl = formatTiming(startTime, secureConnectionStart, connectEnd);
	}
	if (fetchStart < domainLookupEnd) details.dns = formatTiming(startTime, domainLookupStart, domainLookupEnd);
	if (startTime < redirectEnd) details.redirect = formatTiming(startTime, redirectStart, redirectEnd);
	return details;
}
/**
* Entries with negative duration are unexpected and should be dismissed. The intake will ignore RUM
* Resource events with negative durations anyway.
* Since Chromium 128, more entries have unexpected negative durations, see
* https://issues.chromium.org/issues/363031537
*/
function hasValidResourceEntryDuration(entry) {
	return entry.duration >= 0;
}
function hasValidResourceEntryTimings(entry) {
	const areCommonTimingsInOrder = areInOrder(entry.startTime, entry.fetchStart, entry.domainLookupStart, entry.domainLookupEnd, entry.connectStart, entry.connectEnd, entry.requestStart, entry.responseStart, entry.responseEnd);
	const areRedirectionTimingsInOrder = hasRedirection(entry) ? areInOrder(entry.startTime, entry.redirectStart, entry.redirectEnd, entry.fetchStart) : true;
	return areCommonTimingsInOrder && areRedirectionTimingsInOrder;
}
function hasRedirection(entry) {
	return entry.redirectEnd > entry.startTime;
}
function formatTiming(origin, start, end) {
	if (origin <= start && start <= end) return {
		duration: toServerDuration(elapsed(start, end)),
		start: toServerDuration(elapsed(origin, start))
	};
}
/**
* The 'nextHopProtocol' is an empty string for cross-origin resources without CORS headers,
* meaning the protocol is unknown, and we shouldn't report it.
* https://developer.mozilla.org/en-US/docs/Web/API/PerformanceResourceTiming/nextHopProtocol#cross-origin_resources
*/
function computeResourceEntryProtocol(entry) {
	return entry.nextHopProtocol === "" ? void 0 : entry.nextHopProtocol;
}
/**
* Handles the 'deliveryType' property to distinguish between supported values ('cache', 'navigational-prefetch'),
* undefined (unsupported in some browsers), and other cases ('other' for unknown or unrecognized values).
* see: https://developer.mozilla.org/en-US/docs/Web/API/PerformanceResourceTiming/deliveryType
*/
function computeResourceEntryDeliveryType(entry) {
	return entry.deliveryType === "" ? "other" : entry.deliveryType;
}
function computeResourceEntrySize(entry) {
	if (entry.startTime < entry.responseStart) {
		const { encodedBodySize, decodedBodySize, transferSize } = entry;
		return {
			size: decodedBodySize,
			encoded_body_size: encodedBodySize,
			decoded_body_size: decodedBodySize,
			transfer_size: transferSize
		};
	}
	return {
		size: void 0,
		encoded_body_size: void 0,
		decoded_body_size: void 0,
		transfer_size: void 0
	};
}
function isAllowedRequestUrl(url) {
	return url && (!isIntakeUrl(url) || isExperimentalFeatureEnabled(ExperimentalFeature.TRACK_INTAKE_REQUESTS));
}
var DATA_URL_REGEX = /data:(.+)?(;base64)?,/g;
var MAX_RESOURCE_VALUE_CHAR_LENGTH = 24e3;
function sanitizeIfLongDataUrl(url, lengthLimit = MAX_RESOURCE_VALUE_CHAR_LENGTH) {
	if (url.length <= lengthLimit || !url.startsWith("data:")) return url;
	const dataUrlMatchArray = url.substring(0, 100).match(DATA_URL_REGEX);
	if (!dataUrlMatchArray) return url;
	return `${dataUrlMatchArray[0]}[...]`;
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-rum-core@6.33.0/node_modules/@datadog/browser-rum-core/esm/domain/sampler/sampler.js
var sampleDecisionCache = /* @__PURE__ */ new Map();
function isSampled(sessionId, sampleRate) {
	if (sampleRate === 100) return true;
	if (sampleRate === 0) return false;
	const cachedDecision = sampleDecisionCache.get(sampleRate);
	if (cachedDecision && sessionId === cachedDecision.sessionId) return cachedDecision.decision;
	let decision;
	if (window.BigInt) decision = sampleUsingKnuthFactor(BigInt(`0x${sessionId.split("-")[4]}`), sampleRate);
	else decision = performDraw(sampleRate);
	sampleDecisionCache.set(sampleRate, {
		sessionId,
		decision
	});
	return decision;
}
/**
* Perform sampling using the Knuth factor method. This method offer consistent sampling result
* based on the provided identifier.
*
* @param identifier - The identifier to use for sampling.
* @param sampleRate - The sample rate in percentage between 0 and 100.
*/
function sampleUsingKnuthFactor(identifier, sampleRate) {
	const knuthFactor = BigInt("1111111111111111111");
	const twoPow64 = BigInt("0x10000000000000000");
	const hash = identifier * knuthFactor % twoPow64;
	return Number(hash) <= sampleRate / 100 * Number(twoPow64);
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-rum-core@6.33.0/node_modules/@datadog/browser-rum-core/esm/domain/tracing/identifier.js
function createTraceIdentifier() {
	return createIdentifier(64);
}
function createSpanIdentifier() {
	return createIdentifier(63);
}
function createIdentifier(bits) {
	const buffer = crypto.getRandomValues(/* @__PURE__ */ new Uint32Array(2));
	if (bits === 63) buffer[buffer.length - 1] >>>= 1;
	return { toString(radix = 10) {
		let high = buffer[1];
		let low = buffer[0];
		let str = "";
		do {
			const mod = high % radix * 4294967296 + low;
			high = Math.floor(high / radix);
			low = Math.floor(mod / radix);
			str = (mod % radix).toString(radix) + str;
		} while (high || low);
		return str;
	} };
}
function toPaddedHexadecimalString(id) {
	return id.toString(16).padStart(16, "0");
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-rum-core@6.33.0/node_modules/@datadog/browser-rum-core/esm/domain/tracing/tracer.js
/**
* Clear tracing information to avoid incomplete traces. Ideally, we should do it when the
* request did not reach the server, but the browser does not expose this. So, we clear tracing
* information if the request ended with status 0 without being aborted by the application.
*
* Reasoning:
*
* * Applications are usually aborting requests after a bit of time, for example when the user is
* typing (autocompletion) or navigating away (in a SPA). With a performant device and good
* network conditions, the request is likely to reach the server before being canceled.
*
* * Requests aborted otherwise (ex: lack of internet, CORS issue, blocked by a privacy extension)
* are likely to finish quickly and without reaching the server.
*
* Of course, it might not be the case every time, but it should limit having incomplete traces a
* bit.
* */
function clearTracingIfNeeded(context) {
	if (context.status === 0 && !context.isAborted) {
		context.traceId = void 0;
		context.spanId = void 0;
		context.traceSampled = void 0;
	}
}
function startTracer(configuration, sessionManager, userContext, accountContext) {
	return {
		clearTracingIfNeeded,
		traceFetch: (context) => injectHeadersIfTracingAllowed(configuration, context, sessionManager, userContext, accountContext, (tracingHeaders) => {
			var _a;
			if (context.input instanceof Request && !((_a = context.init) === null || _a === void 0 ? void 0 : _a.headers)) {
				context.input = new Request(context.input);
				Object.keys(tracingHeaders).forEach((key) => {
					context.input.headers.append(key, tracingHeaders[key]);
				});
			} else {
				context.init = shallowClone(context.init);
				const headers = [];
				if (context.init.headers instanceof Headers) context.init.headers.forEach((value, key) => {
					headers.push([key, value]);
				});
				else if (Array.isArray(context.init.headers)) context.init.headers.forEach((header) => {
					headers.push(header);
				});
				else if (context.init.headers) Object.keys(context.init.headers).forEach((key) => {
					headers.push([key, context.init.headers[key]]);
				});
				context.init.headers = headers.concat(objectEntries(tracingHeaders));
			}
		}),
		traceXhr: (context, xhr) => injectHeadersIfTracingAllowed(configuration, context, sessionManager, userContext, accountContext, (tracingHeaders) => {
			Object.keys(tracingHeaders).forEach((name) => {
				xhr.setRequestHeader(name, tracingHeaders[name]);
			});
		})
	};
}
function injectHeadersIfTracingAllowed(configuration, context, sessionManager, userContext, accountContext, inject) {
	const session = sessionManager.findTrackedSession();
	if (!session) return;
	const tracingOption = configuration.allowedTracingUrls.find((tracingOption) => matchList([tracingOption.match], context.url, true));
	if (!tracingOption) return;
	const traceSampled = isSampled(session.id, configuration.traceSampleRate);
	if (!(traceSampled || configuration.traceContextInjection === TraceContextInjection.ALL)) return;
	context.traceSampled = traceSampled;
	context.traceId = createTraceIdentifier();
	context.spanId = createSpanIdentifier();
	inject(makeTracingHeaders(context.traceId, context.spanId, context.traceSampled, session.id, tracingOption.propagatorTypes, userContext, accountContext, configuration));
}
/**
* When trace is not sampled, set priority to '0' instead of not adding the tracing headers
* to prepare the implementation for sampling delegation.
*/
function makeTracingHeaders(traceId, spanId, traceSampled, sessionId, propagatorTypes, userContext, accountContext, configuration) {
	const tracingHeaders = {};
	propagatorTypes.forEach((propagatorType) => {
		switch (propagatorType) {
			case "datadog":
				Object.assign(tracingHeaders, {
					"x-datadog-origin": "rum",
					"x-datadog-parent-id": spanId.toString(),
					"x-datadog-sampling-priority": traceSampled ? "1" : "0",
					"x-datadog-trace-id": traceId.toString()
				});
				break;
			case "tracecontext":
				Object.assign(tracingHeaders, {
					traceparent: `00-0000000000000000${toPaddedHexadecimalString(traceId)}-${toPaddedHexadecimalString(spanId)}-0${traceSampled ? "1" : "0"}`,
					tracestate: `dd=s:${traceSampled ? "1" : "0"};o:rum`
				});
				break;
			case "b3":
				Object.assign(tracingHeaders, { b3: `${toPaddedHexadecimalString(traceId)}-${toPaddedHexadecimalString(spanId)}-${traceSampled ? "1" : "0"}` });
				break;
			case "b3multi": Object.assign(tracingHeaders, {
				"X-B3-TraceId": toPaddedHexadecimalString(traceId),
				"X-B3-SpanId": toPaddedHexadecimalString(spanId),
				"X-B3-Sampled": traceSampled ? "1" : "0"
			});
		}
	});
	if (configuration.propagateTraceBaggage) {
		const baggageItems = { "session.id": sessionId };
		const userId = userContext.getContext().id;
		if (typeof userId === "string") baggageItems["user.id"] = userId;
		const accountId = accountContext.getContext().id;
		if (typeof accountId === "string") baggageItems["account.id"] = accountId;
		const baggageHeader = Object.entries(baggageItems).map(([key, value]) => `${key}=${encodeURIComponent(value)}`).join(",");
		if (baggageHeader) tracingHeaders["baggage"] = baggageHeader;
	}
	return tracingHeaders;
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-rum-core@6.33.0/node_modules/@datadog/browser-rum-core/esm/domain/resource/graphql.js
/**
* arbitrary value, byte precision not needed
*/
var GRAPHQL_PAYLOAD_LIMIT = 32 * ONE_KIBI_BYTE;
function extractGraphQlMetadata(request, graphQlConfig) {
	const metadata = extractGraphQlRequestMetadata(request, graphQlConfig.trackPayload);
	if (!metadata) return;
	if (graphQlConfig.trackResponseErrors && request.responseBody) {
		const responseErrors = parseGraphQlResponse(request.responseBody);
		if (responseErrors) {
			metadata.error_count = responseErrors.length;
			metadata.errors = responseErrors;
		}
	}
	return metadata;
}
function parseGraphQlResponse(responseText) {
	const response = tryJsonParse(responseText);
	if (!response || typeof response !== "object") return;
	const responseObj = response;
	if (!isNonEmptyArray(responseObj.errors)) return;
	return responseObj.errors.map((error) => {
		var _a;
		return {
			message: error.message,
			path: error.path,
			locations: error.locations,
			code: (_a = error.extensions) === null || _a === void 0 ? void 0 : _a.code
		};
	});
}
function findGraphQlConfiguration(url, configuration) {
	return configuration.allowedGraphQlUrls.find((graphQlOption) => matchList([graphQlOption.match], url));
}
function extractGraphQlRequestMetadata(request, trackPayload = false) {
	let rawMetadata;
	if (request.method === "POST") rawMetadata = extractFromBody(request.requestBody);
	else if (request.method === "GET") rawMetadata = extractFromUrlQueryParams(request.url);
	if (!rawMetadata) return;
	return sanitizeGraphQlMetadata(rawMetadata, trackPayload);
}
function extractFromBody(requestBody) {
	if (!requestBody || typeof requestBody !== "string") return;
	const graphqlBody = tryJsonParse(requestBody);
	if (!graphqlBody) return;
	return {
		query: graphqlBody.query,
		operationName: graphqlBody.operationName,
		variables: graphqlBody.variables ? JSON.stringify(graphqlBody.variables) : void 0
	};
}
function extractFromUrlQueryParams(url) {
	const searchParams = buildUrl(url).searchParams;
	const variablesParam = searchParams.get("variables");
	const variables = variablesParam && tryJsonParse(variablesParam) !== void 0 ? variablesParam : void 0;
	return {
		query: searchParams.get("query") || void 0,
		operationName: searchParams.get("operationName") || void 0,
		variables
	};
}
function sanitizeGraphQlMetadata(rawMetadata, trackPayload) {
	let operationType;
	let payload;
	let variables;
	if (rawMetadata.query) {
		const trimmedQuery = rawMetadata.query.trim();
		operationType = getOperationType(trimmedQuery);
		if (trackPayload) payload = safeTruncate(trimmedQuery, GRAPHQL_PAYLOAD_LIMIT, "...");
	}
	if (rawMetadata.variables) variables = rawMetadata.variables;
	return {
		operationType,
		operationName: rawMetadata.operationName,
		variables,
		payload
	};
}
function getOperationType(query) {
	var _a;
	return (_a = query.match(/^\s*(query|mutation|subscription)\b/i)) === null || _a === void 0 ? void 0 : _a[1];
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-rum-core@6.33.0/node_modules/@datadog/browser-rum-core/esm/domain/requestCollection.js
var nextRequestIndex = 1;
function startRequestCollection(lifeCycle, configuration, sessionManager, userContext, accountContext) {
	const tracer = startTracer(configuration, sessionManager, userContext, accountContext);
	trackXhr(lifeCycle, configuration, tracer);
	trackFetch(lifeCycle, configuration, tracer);
}
function trackXhr(lifeCycle, configuration, tracer) {
	const subscription = initXhrObservable(configuration).subscribe((rawContext) => {
		const context = rawContext;
		if (!isAllowedRequestUrl(context.url)) return;
		switch (context.state) {
			case "start":
				tracer.traceXhr(context, context.xhr);
				context.requestIndex = getNextRequestIndex();
				lifeCycle.notify(7, {
					requestIndex: context.requestIndex,
					url: context.url
				});
				break;
			case "complete":
				tracer.clearTracingIfNeeded(context);
				lifeCycle.notify(8, {
					...context,
					type: RequestType.XHR,
					isAbortedOnStart: false
				});
		}
	});
	return { stop: () => subscription.unsubscribe() };
}
function trackFetch(lifeCycle, configuration, tracer) {
	const subscription = initFetchObservable({ responseBodyAction: (context) => {
		var _a;
		if ((_a = findGraphQlConfiguration(context.url, configuration)) === null || _a === void 0 ? void 0 : _a.trackResponseErrors) return 2;
		return 1;
	} }).subscribe((rawContext) => {
		var _a;
		const context = rawContext;
		if (!isAllowedRequestUrl(context.url)) return;
		switch (context.state) {
			case "start":
				tracer.traceFetch(context);
				context.requestIndex = getNextRequestIndex();
				lifeCycle.notify(7, {
					requestIndex: context.requestIndex,
					url: context.url
				});
				break;
			case "resolve":
				tracer.clearTracingIfNeeded(context);
				lifeCycle.notify(8, {
					...context,
					duration: elapsed(context.startClocks.timeStamp, timeStampNow()),
					type: RequestType.FETCH,
					requestBody: (_a = context.init) === null || _a === void 0 ? void 0 : _a.body
				});
		}
	});
	return { stop: () => subscription.unsubscribe() };
}
function getNextRequestIndex() {
	const result = nextRequestIndex;
	nextRequestIndex += 1;
	return result;
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-rum-core@6.33.0/node_modules/@datadog/browser-rum-core/esm/domain/discardNegativeDuration.js
function discardNegativeDuration(duration) {
	return isNumber(duration) && duration < 0 ? void 0 : duration;
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-rum-core@6.33.0/node_modules/@datadog/browser-rum-core/esm/browser/htmlDomUtils.js
function isTextNode(node) {
	return node.nodeType === Node.TEXT_NODE;
}
function isCommentNode(node) {
	return node.nodeType === Node.COMMENT_NODE;
}
function isElementNode(node) {
	return node.nodeType === Node.ELEMENT_NODE;
}
function isNodeShadowHost(node) {
	return isElementNode(node) && Boolean(node.shadowRoot);
}
function isNodeShadowRoot(node) {
	const shadowRoot = node;
	return !!shadowRoot.host && shadowRoot.nodeType === Node.DOCUMENT_FRAGMENT_NODE && isElementNode(shadowRoot.host);
}
function hasChildNodes(node) {
	return node.childNodes.length > 0 || isNodeShadowHost(node);
}
function forEachChildNodes(node, callback) {
	let child = node.firstChild;
	while (child) {
		callback(child);
		child = child.nextSibling;
	}
	if (isNodeShadowHost(node)) callback(node.shadowRoot);
}
/**
* Return `host` in case if the current node is a shadow root otherwise will return the `parentNode`
*/
function getParentNode(node) {
	return isNodeShadowRoot(node) ? node.host : node.parentNode;
}
/**
* Return the parent element, crossing shadow DOM boundaries.
* If the element is a direct child of a shadow root, returns the shadow host.
*/
function getParentElement(element) {
	if (element.parentElement) return element.parentElement;
	const parentNode = element.parentNode;
	if (parentNode && isNodeShadowRoot(parentNode)) return parentNode.host;
	return null;
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-rum-core@6.33.0/node_modules/@datadog/browser-rum-core/esm/browser/firstInputPolyfill.js
/**
* first-input timing entry polyfill based on
* https://github.com/GoogleChrome/web-vitals/blob/master/src/lib/polyfills/firstInputPolyfill.ts
*/
function retrieveFirstInputTiming(configuration, callback) {
	const startTimeStamp = dateNow();
	let timingSent = false;
	const { stop: removeEventListeners } = addEventListeners(configuration, window, [
		"click",
		"mousedown",
		"keydown",
		"touchstart",
		"pointerdown"
	], (evt) => {
		if (!evt.cancelable) return;
		const timing = {
			entryType: "first-input",
			processingStart: relativeNow(),
			processingEnd: relativeNow(),
			startTime: evt.timeStamp,
			duration: 0,
			name: "",
			cancelable: false,
			target: null,
			interactionId: 0,
			toJSON: () => ({})
		};
		if (evt.type === "pointerdown") sendTimingIfPointerIsNotCancelled(configuration, timing);
		else sendTiming(timing);
	}, {
		passive: true,
		capture: true
	});
	return { stop: removeEventListeners };
	/**
	* Pointer events are a special case, because they can trigger main or compositor thread behavior.
	* We differentiate these cases based on whether or not we see a pointercancel event, which are
	* fired when we scroll. If we're scrolling we don't need to report input delay since FID excludes
	* scrolling and pinch/zooming.
	*/
	function sendTimingIfPointerIsNotCancelled(configuration, timing) {
		addEventListeners(configuration, window, ["pointerup", "pointercancel"], (event) => {
			if (event.type === "pointerup") sendTiming(timing);
		}, { once: true });
	}
	function sendTiming(timing) {
		if (!timingSent) {
			timingSent = true;
			removeEventListeners();
			const delay = timing.processingStart - timing.startTime;
			if (delay >= 0 && delay < dateNow() - startTimeStamp) callback(timing);
		}
	}
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-rum-core@6.33.0/node_modules/@datadog/browser-rum-core/esm/browser/performanceObservable.js
var RumPerformanceEntryType;
(function(RumPerformanceEntryType) {
	RumPerformanceEntryType["EVENT"] = "event";
	RumPerformanceEntryType["FIRST_INPUT"] = "first-input";
	RumPerformanceEntryType["LARGEST_CONTENTFUL_PAINT"] = "largest-contentful-paint";
	RumPerformanceEntryType["LAYOUT_SHIFT"] = "layout-shift";
	RumPerformanceEntryType["LONG_TASK"] = "longtask";
	RumPerformanceEntryType["LONG_ANIMATION_FRAME"] = "long-animation-frame";
	RumPerformanceEntryType["NAVIGATION"] = "navigation";
	RumPerformanceEntryType["PAINT"] = "paint";
	RumPerformanceEntryType["RESOURCE"] = "resource";
	RumPerformanceEntryType["VISIBILITY_STATE"] = "visibility-state";
})(RumPerformanceEntryType || (RumPerformanceEntryType = {}));
function createPerformanceObservable(configuration, options) {
	return new Observable((observable) => {
		if (!window.PerformanceObserver) return;
		const handlePerformanceEntries = (entries) => {
			const rumPerformanceEntries = filterRumPerformanceEntries(entries);
			if (rumPerformanceEntries.length > 0) observable.notify(rumPerformanceEntries);
		};
		let timeoutId;
		let isObserverInitializing = true;
		const observer = new PerformanceObserver(monitor((entries) => {
			if (isObserverInitializing) timeoutId = setTimeout(() => handlePerformanceEntries(entries.getEntries()));
			else handlePerformanceEntries(entries.getEntries());
		}));
		try {
			observer.observe(options);
		} catch (_a) {
			if ([
				RumPerformanceEntryType.RESOURCE,
				RumPerformanceEntryType.NAVIGATION,
				RumPerformanceEntryType.LONG_TASK,
				RumPerformanceEntryType.PAINT
			].includes(options.type)) {
				if (options.buffered) timeoutId = setTimeout(() => handlePerformanceEntries(performance.getEntriesByType(options.type)));
				try {
					observer.observe({ entryTypes: [options.type] });
				} catch (_b) {
					return;
				}
			}
		}
		isObserverInitializing = false;
		manageResourceTimingBufferFull(configuration);
		let stopFirstInputTiming;
		if (!supportPerformanceTimingEvent(RumPerformanceEntryType.FIRST_INPUT) && options.type === RumPerformanceEntryType.FIRST_INPUT) ({stop: stopFirstInputTiming} = retrieveFirstInputTiming(configuration, (timing) => {
			handlePerformanceEntries([timing]);
		}));
		return () => {
			observer.disconnect();
			if (stopFirstInputTiming) stopFirstInputTiming();
			clearTimeout(timeoutId);
		};
	});
}
var resourceTimingBufferFullListener;
function manageResourceTimingBufferFull(configuration) {
	if (!resourceTimingBufferFullListener && supportPerformanceObject() && "addEventListener" in performance) resourceTimingBufferFullListener = addEventListener(configuration, performance, "resourcetimingbufferfull", () => {
		performance.clearResourceTimings();
	});
}
function supportPerformanceObject() {
	return window.performance !== void 0 && "getEntries" in performance;
}
function supportPerformanceTimingEvent(entryType) {
	return window.PerformanceObserver && PerformanceObserver.supportedEntryTypes !== void 0 && PerformanceObserver.supportedEntryTypes.includes(entryType);
}
function filterRumPerformanceEntries(entries) {
	return entries.filter((entry) => !isForbiddenResource(entry));
}
function isForbiddenResource(entry) {
	return entry.entryType === RumPerformanceEntryType.RESOURCE && (!isAllowedRequestUrl(entry.name) || !hasValidResourceEntryDuration(entry));
}
/**
* Wait for the page activity end
*
* Detection lifecycle:
* ```
*                        Wait page activity end
*              .-------------------'--------------------.
*              v                                        v
*     [Wait for a page activity ]          [Wait for a maximum duration]
*     [timeout: VALIDATION_DELAY]          [  timeout: maxDuration     ]
*          /                  \                           |
*         v                    v                          |
*  [No page activity]   [Page activity]                   |
*         |                   |,----------------------.   |
*         v                   v                       |   |
*     (Discard)     [Wait for a page activity]        |   |
*                   [   timeout: END_DELAY   ]        |   |
*                       /                \            |   |
*                      v                  v           |   |
*             [No page activity]    [Page activity]   |   |
*                      |                 |            |   |
*                      |                 '------------'   |
*                      '-----------. ,--------------------'
*                                   v
*                                 (End)
* ```
*
* Note: by assuming that maxDuration is greater than VALIDATION_DELAY, we are sure that if the
* process is still alive after maxDuration, it has been validated.
*/
function waitPageActivityEnd(lifeCycle, domMutationObservable, windowOpenObservable, configuration, pageActivityEndCallback, maxDuration) {
	const pageActivityObservable = mockable(createPageActivityObservable)(lifeCycle, domMutationObservable, windowOpenObservable, configuration);
	let pageActivityEndTimeoutId;
	let hasCompleted = false;
	const validationTimeoutId = setTimeout(monitor(() => complete({ hadActivity: false })), 100);
	const maxDurationTimeoutId = maxDuration !== void 0 ? setTimeout(monitor(() => complete({
		hadActivity: true,
		end: timeStampNow()
	})), maxDuration) : void 0;
	const pageActivitySubscription = pageActivityObservable.subscribe(({ isBusy }) => {
		clearTimeout(validationTimeoutId);
		clearTimeout(pageActivityEndTimeoutId);
		const lastChangeTime = timeStampNow();
		if (!isBusy) pageActivityEndTimeoutId = setTimeout(monitor(() => complete({
			hadActivity: true,
			end: lastChangeTime
		})), 100);
	});
	const stop = () => {
		hasCompleted = true;
		clearTimeout(validationTimeoutId);
		clearTimeout(pageActivityEndTimeoutId);
		clearTimeout(maxDurationTimeoutId);
		pageActivitySubscription.unsubscribe();
	};
	function complete(event) {
		if (hasCompleted) return;
		stop();
		pageActivityEndCallback(event);
	}
	return { stop };
}
function createPageActivityObservable(lifeCycle, domMutationObservable, windowOpenObservable, configuration) {
	return new Observable((observable) => {
		const subscriptions = [];
		let firstRequestIndex;
		let pendingRequestsCount = 0;
		subscriptions.push(domMutationObservable.subscribe((mutations) => {
			if (!mutations.every(isExcludedMutation)) notifyPageActivity();
		}), windowOpenObservable.subscribe(notifyPageActivity), createPerformanceObservable(configuration, { type: RumPerformanceEntryType.RESOURCE }).subscribe((entries) => {
			if (entries.some((entry) => !isExcludedUrl(configuration, entry.name))) notifyPageActivity();
		}), lifeCycle.subscribe(7, (startEvent) => {
			if (isExcludedUrl(configuration, startEvent.url)) return;
			if (firstRequestIndex === void 0) firstRequestIndex = startEvent.requestIndex;
			pendingRequestsCount += 1;
			notifyPageActivity();
		}), lifeCycle.subscribe(8, (request) => {
			if (isExcludedUrl(configuration, request.url) || firstRequestIndex === void 0 || request.requestIndex < firstRequestIndex) return;
			pendingRequestsCount -= 1;
			notifyPageActivity();
		}));
		return () => {
			subscriptions.forEach((s) => s.unsubscribe());
		};
		function notifyPageActivity() {
			observable.notify({ isBusy: pendingRequestsCount > 0 });
		}
	});
}
function isExcludedUrl(configuration, requestUrl) {
	return matchList(configuration.excludedActivityUrls, requestUrl);
}
function isExcludedMutation(mutation) {
	const targetElement = mutation.type === "characterData" ? mutation.target.parentElement : mutation.target;
	return Boolean(targetElement && isElementNode(targetElement) && targetElement.matches(`[data-dd-excluded-activity-mutations], [data-dd-excluded-activity-mutations] *`));
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-rum-core@6.33.0/node_modules/@datadog/browser-rum-core/esm/domain/action/actionNameConstants.js
/**
* Get the action name from the attribute 'data-dd-action-name' on the element or any of its parent.
* It can also be retrieved from a user defined attribute.
*/
var DEFAULT_PROGRAMMATIC_ACTION_NAME_ATTRIBUTE = "data-dd-action-name";
var ACTION_NAME_PLACEHOLDER = "Masked Element";
//#endregion
//#region node_modules/.pnpm/@datadog+browser-rum-core@6.33.0/node_modules/@datadog/browser-rum-core/esm/domain/getSelectorFromElement.js
/**
* Marker used to indicate shadow DOM boundaries in selectors.
* Named after the deprecated Shadow DOM v0 '::shadow' pseudo-element which served the same
* purpose of marking entry into a shadow root.
* Note: This is NOT a valid CSS selector, it's an internal marker that requires custom
* parsing logic.
*/
var SHADOW_DOM_MARKER = "::shadow ";
/**
* Stable attributes are attributes that are commonly used to identify parts of a UI (ex:
* component). Those attribute values should not be generated randomly (hardcoded most of the time)
* and stay the same across deploys. They are not necessarily unique across the document.
*/
var STABLE_ATTRIBUTES = [
	DEFAULT_PROGRAMMATIC_ACTION_NAME_ATTRIBUTE,
	"data-testid",
	"data-test",
	"data-qa",
	"data-cy",
	"data-test-id",
	"data-qa-id",
	"data-testing",
	"data-component",
	"data-element",
	"data-source-file"
];
var GLOBALLY_UNIQUE_SELECTOR_GETTERS = [getStableAttributeSelector, getIDSelector];
var UNIQUE_AMONG_CHILDREN_SELECTOR_GETTERS = [
	getStableAttributeSelector,
	getClassSelector,
	getTagNameSelector
];
function getSelectorFromElement(targetElement, actionNameAttribute) {
	if (!targetElement.isConnected) return;
	const subtrees = getAllSubtreeTargets(targetElement);
	const selectorParts = [];
	for (const { rootNode, target } of subtrees) {
		const selector = getSelectorFromElementWithinSubtree(target, rootNode, actionNameAttribute);
		if (!selector) return;
		selectorParts.push(selector);
	}
	return selectorParts.join(SHADOW_DOM_MARKER);
}
/**
* Returns all (rootNode, target) pairs from the document down to the element.
*/
function getAllSubtreeTargets(element) {
	const result = [];
	let currentTarget = element;
	while (currentTarget) {
		const rootNode = currentTarget.getRootNode();
		result.push({
			rootNode,
			target: currentTarget
		});
		if (isNodeShadowRoot(rootNode)) currentTarget = rootNode.host;
		else break;
	}
	return result.reverse();
}
/**
* Computes a CSS selector for an element within a specific subtree (document or shadow root).
*/
function getSelectorFromElementWithinSubtree(targetElement, rootNode, actionNameAttribute) {
	let currentSelector;
	let currentElement = targetElement;
	while (currentElement && currentElement.nodeName !== "HTML") {
		const globallyUniqueSelector = findSelector(currentElement, rootNode, GLOBALLY_UNIQUE_SELECTOR_GETTERS, isSelectorUniqueWithinRoot, actionNameAttribute, currentSelector);
		if (globallyUniqueSelector) return combineSelector(globallyUniqueSelector, currentSelector);
		currentSelector = combineSelector(findSelector(currentElement, rootNode, UNIQUE_AMONG_CHILDREN_SELECTOR_GETTERS, isSelectorUniqueAmongSiblings, actionNameAttribute, currentSelector) || getPositionSelector(currentElement), currentSelector);
		currentElement = currentElement.parentElement;
	}
	return currentSelector;
}
function isGeneratedValue(value) {
	return /[0-9]/.test(value);
}
function getIDSelector(element) {
	if (element.id && !isGeneratedValue(element.id)) return `#${CSS.escape(element.id)}`;
}
function getClassSelector(element) {
	if (element.tagName === "BODY") return;
	const classList = element.classList;
	for (let i = 0; i < classList.length; i += 1) {
		const className = classList[i];
		if (isGeneratedValue(className)) continue;
		return `${CSS.escape(element.tagName)}.${CSS.escape(className)}`;
	}
}
function getTagNameSelector(element) {
	return CSS.escape(element.tagName);
}
function getStableAttributeSelector(element, actionNameAttribute) {
	if (actionNameAttribute) {
		const selector = getAttributeSelector(actionNameAttribute);
		if (selector) return selector;
	}
	for (const attributeName of STABLE_ATTRIBUTES) {
		const selector = getAttributeSelector(attributeName);
		if (selector) return selector;
	}
	function getAttributeSelector(attributeName) {
		if (element.hasAttribute(attributeName)) return `${CSS.escape(element.tagName)}${getAttributeValueSelector(attributeName, element.getAttribute(attributeName))}`;
	}
}
function getAttributeValueSelector(attributeName, attributeValue) {
	return `[${attributeName}="${CSS.escape(attributeValue)}"]`;
}
function getPositionSelector(element) {
	const nthOfType = getNthOfTypeSelector(element);
	return `${CSS.escape(element.tagName)}:nth-of-type(${nthOfType})`;
}
function getNthOfTypeSelector(element) {
	let sibling = element.parentNode.firstElementChild;
	let nthOfType = 1;
	while (sibling && sibling !== element) {
		if (sibling.tagName === element.tagName) nthOfType += 1;
		sibling = sibling.nextElementSibling;
	}
	return nthOfType;
}
function findSelector(element, rootNode, selectorGetters, predicate, actionNameAttribute, childSelector) {
	for (const selectorGetter of selectorGetters) {
		const elementSelector = selectorGetter(element, actionNameAttribute);
		if (!elementSelector) continue;
		if (predicate(element, rootNode, elementSelector, childSelector)) return elementSelector;
	}
}
/**
* Check whether the selector is unique within the root node (document or shadow root).
*/
function isSelectorUniqueWithinRoot(_element, rootNode, elementSelector, childSelector) {
	return rootNode.querySelectorAll(combineSelector(elementSelector, childSelector)).length === 1;
}
/**
* Check whether the selector is unique among the element siblings. In other words, it returns true
* if "ELEMENT_PARENT > CHILD_SELECTOR" returns a single element.
*
* @param currentElement - the element being considered while iterating over the target
* element ancestors.
* @param _rootNode - the root node (document or shadow root) - unused but required for predicate signature.
* @param currentElementSelector - a selector that matches the current element. That
* selector is not a composed selector (i.e. it might be a single tag name, class name...).
* @param childSelector - child selector is a selector that targets a descendant
* of the current element. When undefined, the current element is the target element.
*
* # Scope selector usage
*
* When composed together, the final selector will be joined with `>` operators to make sure we
* target direct descendants at each level. In this function, we'll use `querySelector` to check if
* a selector matches descendants of the current element. But by default, the query selector match
* elements at any level. Example:
*
* ```html
* <main>
*   <div>
*     <span></span>
*   </div>
*   <marquee>
*     <div>
*       <span></span>
*     </div>
*   </marquee>
* </main>
* ```
*
* `sibling.querySelector('DIV > SPAN')` will match both span elements, so we would consider the
* selector to be not unique, even if it is unique when we'll compose it with the parent with a `>`
* operator (`MAIN > DIV > SPAN`).
*
* To avoid this, we can use the `:scope` selector to make sure the selector starts from the current
* sibling (i.e. `sibling.querySelector('DIV:scope > SPAN')` will only match the first span).
*
* [1]: https://developer.mozilla.org/fr/docs/Web/CSS/:scope
*
* # Performance considerations
*
* We compute selectors in performance-critical operations (ex: during a click), so we need to make
* sure the function is as fast as possible. We observed that naively using `querySelectorAll` to
* check if the selector matches more than 1 element is quite expensive, so we want to avoid it.
*
* Because we are iterating the DOM upward and we use that function at every level, we know the
* child selector is already unique among the current element children, so we don't need to check
* for the current element subtree.
*
* Instead, we can focus on the current element siblings. If we find a single element matching the
* selector within a sibling, we know that it's not unique. This allows us to use `querySelector`
* (or `matches`, when the current element is the target element) instead of `querySelectorAll`.
*/
function isSelectorUniqueAmongSiblings(currentElement, _rootNode, currentElementSelector, childSelector) {
	let isSiblingMatching;
	if (childSelector === void 0) isSiblingMatching = (sibling) => sibling.matches(currentElementSelector);
	else {
		const scopedSelector = combineSelector(`${currentElementSelector}:scope`, childSelector);
		isSiblingMatching = (sibling) => sibling.querySelector(scopedSelector) !== null;
	}
	let sibling = currentElement.previousElementSibling;
	while (sibling) {
		if (isSiblingMatching(sibling)) return false;
		sibling = sibling.previousElementSibling;
	}
	sibling = currentElement.nextElementSibling;
	while (sibling) {
		if (isSiblingMatching(sibling)) return false;
		sibling = sibling.nextElementSibling;
	}
	return true;
}
function combineSelector(parent, child) {
	return child ? `${parent}>${child}` : parent;
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-rum-core@6.33.0/node_modules/@datadog/browser-rum-core/esm/domain/privacyConstants.js
var NodePrivacyLevel = {
	IGNORE: "ignore",
	HIDDEN: "hidden",
	ALLOW: DefaultPrivacyLevel.ALLOW,
	MASK: DefaultPrivacyLevel.MASK,
	MASK_USER_INPUT: DefaultPrivacyLevel.MASK_USER_INPUT,
	MASK_UNLESS_ALLOWLISTED: DefaultPrivacyLevel.MASK_UNLESS_ALLOWLISTED
};
var PRIVACY_ATTR_NAME = "data-dd-privacy";
var PRIVACY_ATTR_VALUE_HIDDEN = "hidden";
var PRIVACY_CLASS_PREFIX = "dd-privacy-";
var CENSORED_IMG_MARK = "data:image/gif;base64,R0lGODlhAQABAIAAAMLCwgAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==";
var FORM_PRIVATE_TAG_NAMES = {
	INPUT: true,
	OUTPUT: true,
	TEXTAREA: true,
	SELECT: true,
	OPTION: true,
	DATALIST: true,
	OPTGROUP: true
};
function getPrivacySelector(privacyLevel) {
	return `[${PRIVACY_ATTR_NAME}="${privacyLevel}"], .${PRIVACY_CLASS_PREFIX}${privacyLevel}`;
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-rum-core@6.33.0/node_modules/@datadog/browser-rum-core/esm/domain/privacy.js
/**
* Get node privacy level by iterating over its ancestors. When the direct parent privacy level is
* know, it is best to use something like:
*
* derivePrivacyLevelGivenParent(getNodeSelfPrivacyLevel(node), parentNodePrivacyLevel)
*/
function getNodePrivacyLevel(node, defaultPrivacyLevel, cache) {
	if (cache && cache.has(node)) return cache.get(node);
	const parentNode = getParentNode(node);
	const parentNodePrivacyLevel = parentNode ? getNodePrivacyLevel(parentNode, defaultPrivacyLevel, cache) : defaultPrivacyLevel;
	const nodePrivacyLevel = reducePrivacyLevel(getNodeSelfPrivacyLevel(node), parentNodePrivacyLevel);
	if (cache) cache.set(node, nodePrivacyLevel);
	return nodePrivacyLevel;
}
/**
* Reduces the next privacy level based on self + parent privacy levels
*/
function reducePrivacyLevel(childPrivacyLevel, parentNodePrivacyLevel) {
	switch (parentNodePrivacyLevel) {
		case NodePrivacyLevel.HIDDEN:
		case NodePrivacyLevel.IGNORE: return parentNodePrivacyLevel;
	}
	switch (childPrivacyLevel) {
		case NodePrivacyLevel.ALLOW:
		case NodePrivacyLevel.MASK:
		case NodePrivacyLevel.MASK_USER_INPUT:
		case NodePrivacyLevel.MASK_UNLESS_ALLOWLISTED:
		case NodePrivacyLevel.HIDDEN:
		case NodePrivacyLevel.IGNORE: return childPrivacyLevel;
		default: return parentNodePrivacyLevel;
	}
}
/**
* Determines the node's own privacy level without checking for ancestors.
*/
function getNodeSelfPrivacyLevel(node) {
	if (!isElementNode(node)) return;
	if (node.tagName === "BASE") return NodePrivacyLevel.ALLOW;
	if (node.tagName === "INPUT") {
		const inputElement = node;
		if (inputElement.type === "password" || inputElement.type === "email" || inputElement.type === "tel") return NodePrivacyLevel.MASK;
		if (inputElement.type === "hidden") return NodePrivacyLevel.MASK;
		const autocomplete = inputElement.getAttribute("autocomplete");
		if (autocomplete && (autocomplete.startsWith("cc-") || autocomplete.endsWith("-password"))) return NodePrivacyLevel.MASK;
	}
	if (node.matches(getPrivacySelector(NodePrivacyLevel.HIDDEN))) return NodePrivacyLevel.HIDDEN;
	if (node.matches(getPrivacySelector(NodePrivacyLevel.MASK))) return NodePrivacyLevel.MASK;
	if (node.matches(getPrivacySelector(NodePrivacyLevel.MASK_UNLESS_ALLOWLISTED))) return NodePrivacyLevel.MASK_UNLESS_ALLOWLISTED;
	if (node.matches(getPrivacySelector(NodePrivacyLevel.MASK_USER_INPUT))) return NodePrivacyLevel.MASK_USER_INPUT;
	if (node.matches(getPrivacySelector(NodePrivacyLevel.ALLOW))) return NodePrivacyLevel.ALLOW;
	if (shouldIgnoreElement(node)) return NodePrivacyLevel.IGNORE;
}
/**
* Helper aiming to unify `mask` and `mask-user-input` privacy levels:
*
* In the `mask` case, it is trivial: we should mask the element.
*
* In the `mask-user-input` case, we should mask the element only if it is a "form" element or the
* direct parent is a form element for text nodes).
*
* Other `shouldMaskNode` cases are edge cases that should not matter too much (ex: should we mask a
* node if it is ignored or hidden? it doesn't matter since it won't be serialized).
*/
function shouldMaskNode(node, privacyLevel) {
	switch (privacyLevel) {
		case NodePrivacyLevel.MASK:
		case NodePrivacyLevel.HIDDEN:
		case NodePrivacyLevel.IGNORE: return true;
		case NodePrivacyLevel.MASK_UNLESS_ALLOWLISTED:
			if (isTextNode(node)) return isFormElement(node.parentNode) ? true : !isAllowlisted(node.textContent || "");
			return isFormElement(node);
		case NodePrivacyLevel.MASK_USER_INPUT: return isTextNode(node) ? isFormElement(node.parentNode) : isFormElement(node);
		default: return false;
	}
}
function shouldMaskAttribute(tagName, attributeName, attributeValue, nodePrivacyLevel, configuration) {
	if (nodePrivacyLevel !== NodePrivacyLevel.MASK && nodePrivacyLevel !== NodePrivacyLevel.MASK_UNLESS_ALLOWLISTED) return false;
	if (attributeName === "data-dd-privacy" || STABLE_ATTRIBUTES.includes(attributeName) || attributeName === configuration.actionNameAttribute) return false;
	switch (attributeName) {
		case "title":
		case "alt":
		case "placeholder":
		case "aria-label":
		case "name": return true;
	}
	if (tagName === "A" && attributeName === "href") return true;
	if (tagName === "IFRAME" && attributeName === "srcdoc") return true;
	if (attributeValue && attributeName.startsWith("data-")) return true;
	if ((tagName === "IMG" || tagName === "SOURCE") && (attributeName === "src" || attributeName === "srcset")) return true;
	return false;
}
function isFormElement(node) {
	if (!node || node.nodeType !== node.ELEMENT_NODE) return false;
	const element = node;
	if (element.tagName === "INPUT") switch (element.type) {
		case "button":
		case "color":
		case "reset":
		case "submit": return false;
	}
	return !!FORM_PRIVATE_TAG_NAMES[element.tagName];
}
/**
* Text censoring non-destructively maintains whitespace characters in order to preserve text shape
* during replay.
*/
function censorText(text) {
	return text.replace(/\S/g, "x");
}
function getTextContent(textNode, parentNodePrivacyLevel) {
	var _a;
	const parentTagName = (_a = textNode.parentElement) === null || _a === void 0 ? void 0 : _a.tagName;
	let textContent = textNode.textContent || "";
	if (parentTagName === "HEAD" && !textContent.trim()) return;
	const nodePrivacyLevel = parentNodePrivacyLevel;
	if (parentTagName === "SCRIPT") textContent = "***";
	else if (nodePrivacyLevel === NodePrivacyLevel.HIDDEN) textContent = "***";
	else if (shouldMaskNode(textNode, nodePrivacyLevel)) {
		if (parentTagName === "DATALIST" || parentTagName === "SELECT" || parentTagName === "OPTGROUP") {
			if (!textContent.trim()) return;
		} else if (parentTagName === "OPTION") textContent = "***";
		else textContent = censorText(textContent);
	}
	return textContent;
}
/**
* TODO: Preserve CSS element order, and record the presence of the tag, just don't render
* We don't need this logic on the recorder side.
* For security related meta's, customer can mask themmanually given they
* are easy to identify in the HEAD tag.
*/
function shouldIgnoreElement(element) {
	if (element.nodeName === "SCRIPT") return true;
	if (element.nodeName === "LINK") {
		const relAttribute = getLowerCaseAttribute("rel");
		return /preload|prefetch/i.test(relAttribute) && getLowerCaseAttribute("as") === "script" || relAttribute === "shortcut icon" || relAttribute === "icon";
	}
	if (element.nodeName === "META") {
		const nameAttribute = getLowerCaseAttribute("name");
		const relAttribute = getLowerCaseAttribute("rel");
		const propertyAttribute = getLowerCaseAttribute("property");
		return /^msapplication-tile(image|color)$/.test(nameAttribute) || nameAttribute === "application-name" || relAttribute === "icon" || relAttribute === "apple-touch-icon" || relAttribute === "shortcut icon" || nameAttribute === "keywords" || nameAttribute === "description" || /^(og|twitter|fb):/.test(propertyAttribute) || /^(og|twitter):/.test(nameAttribute) || nameAttribute === "pinterest" || nameAttribute === "robots" || nameAttribute === "googlebot" || nameAttribute === "bingbot" || element.hasAttribute("http-equiv") || nameAttribute === "author" || nameAttribute === "generator" || nameAttribute === "framework" || nameAttribute === "publisher" || nameAttribute === "progid" || /^article:/.test(propertyAttribute) || /^product:/.test(propertyAttribute) || nameAttribute === "google-site-verification" || nameAttribute === "yandex-verification" || nameAttribute === "csrf-token" || nameAttribute === "p:domain_verify" || nameAttribute === "verify-v1" || nameAttribute === "verification" || nameAttribute === "shopify-checkout-api-token";
	}
	function getLowerCaseAttribute(name) {
		return (element.getAttribute(name) || "").toLowerCase();
	}
	return false;
}
function isAllowlisted(text) {
	var _a;
	if (!text || !text.trim()) return true;
	return ((_a = window.$DD_ALLOW) === null || _a === void 0 ? void 0 : _a.has(text.toLocaleLowerCase())) || false;
}
function maskDisallowedTextContent(text, fixedMask) {
	if (isAllowlisted(text)) return text;
	return fixedMask || censorText(text);
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-rum-core@6.33.0/node_modules/@datadog/browser-rum-core/esm/domain/trackEventCounts.js
function trackEventCounts({ lifeCycle, isChildEvent, onChange: callback = noop }) {
	const eventCounts = {
		errorCount: 0,
		longTaskCount: 0,
		resourceCount: 0,
		actionCount: 0,
		frustrationCount: 0
	};
	const subscription = lifeCycle.subscribe(13, (event) => {
		var _a;
		if (event.type === "view" || event.type === "vital" || !isChildEvent(event)) return;
		switch (event.type) {
			case RumEventType.ERROR:
				eventCounts.errorCount += 1;
				callback();
				break;
			case RumEventType.ACTION:
				eventCounts.actionCount += 1;
				if (event.action.frustration) eventCounts.frustrationCount += event.action.frustration.type.length;
				callback();
				break;
			case RumEventType.LONG_TASK:
				eventCounts.longTaskCount += 1;
				callback();
				break;
			case RumEventType.RESOURCE: if (!((_a = event._dd) === null || _a === void 0 ? void 0 : _a.discarded)) {
				eventCounts.resourceCount += 1;
				callback();
			}
		}
	});
	return {
		stop: () => {
			subscription.unsubscribe();
		},
		eventCounts
	};
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-rum-core@6.33.0/node_modules/@datadog/browser-rum-core/esm/domain/eventTracker.js
var EVENT_CONTEXT_TIME_OUT_DELAY = 5 * ONE_MINUTE;
function startEventTracker(lifeCycle) {
	const history = createValueHistory({ expireDelay: EVENT_CONTEXT_TIME_OUT_DELAY });
	const keyedEvents = /* @__PURE__ */ new Map();
	function cleanUpEvent(event) {
		var _a;
		keyedEvents.delete(event.key);
		(_a = event.eventCounts) === null || _a === void 0 || _a.stop();
	}
	function discardAll() {
		keyedEvents.forEach((event) => {
			cleanUpEvent(event);
		});
		history.reset();
	}
	const sessionRenewalSubscription = lifeCycle.subscribe(10, discardAll);
	function start(key, startClocks, data, options) {
		const id = generateUUID();
		const historyEntry = history.add(id, startClocks.relative);
		const existing = keyedEvents.get(key);
		if (existing) cleanUpEvent(existing);
		const trackedEventData = {
			id,
			key,
			startClocks,
			data,
			historyEntry,
			eventCounts: (options === null || options === void 0 ? void 0 : options.isChildEvent) ? trackEventCounts({
				lifeCycle,
				isChildEvent: options.isChildEvent(id)
			}) : void 0
		};
		keyedEvents.set(key, trackedEventData);
		return trackedEventData;
	}
	function stop(key, stopClocks, extraData) {
		var _a;
		const event = keyedEvents.get(key);
		if (!event) return;
		const finalData = extraData ? combine(event.data, extraData) : event.data;
		event.historyEntry.close(stopClocks.relative);
		const duration = elapsed(event.startClocks.timeStamp, stopClocks.timeStamp);
		const counts = (_a = event.eventCounts) === null || _a === void 0 ? void 0 : _a.eventCounts;
		cleanUpEvent(event);
		return {
			...finalData,
			id: event.id,
			startClocks: event.startClocks,
			duration,
			counts
		};
	}
	function discard(key) {
		var _a;
		const event = keyedEvents.get(key);
		if (!event) return;
		const counts = (_a = event.eventCounts) === null || _a === void 0 ? void 0 : _a.eventCounts;
		cleanUpEvent(event);
		event.historyEntry.remove();
		return {
			...event.data,
			id: event.id,
			startClocks: event.startClocks,
			counts
		};
	}
	function findId(startTime) {
		return history.findAll(startTime);
	}
	function getCounts(key) {
		var _a;
		var _b;
		return (_b = (_a = keyedEvents.get(key)) === null || _a === void 0 ? void 0 : _a.eventCounts) === null || _b === void 0 ? void 0 : _b.eventCounts;
	}
	function stopTracker() {
		sessionRenewalSubscription.unsubscribe();
		discardAll();
		history.stop();
	}
	return {
		start,
		stop,
		discard,
		getCounts,
		findId,
		stopAll: stopTracker
	};
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-rum-core@6.33.0/node_modules/@datadog/browser-rum-core/esm/domain/getComposedPathSelector.js
var FILTERED_TAGNAMES = ["HTML", "BODY"];
/**
* arbitrary value, we want to truncate the selector if it exceeds the limit
*/
var CHARACTER_LIMIT = 2 * ONE_KIBI_BYTE;
/**
* Safe attributes that can be collected without PII concerns.
* These are commonly used for testing, accessibility, and UI identification.
*/
var SAFE_ATTRIBUTES = STABLE_ATTRIBUTES.concat([
	"role",
	"type",
	"disabled",
	"readonly",
	"tabindex",
	"draggable",
	"target",
	"rel",
	"download",
	"method",
	"action",
	"enctype",
	"autocomplete"
]);
/**
* Extracts a selector string from a MouseEvent composedPath.
*
* This function:
* 1. Filters out non-Element items (Document, Window, ShadowRoot)
* 2. Extracts a selector string from each element
* 3. Truncates the selector string if it exceeds the character limit
* 4. Returns the selector string
*
* @param composedPath - The composedPath from a MouseEvent
* @returns A selector string
*/
function getComposedPathSelector(composedPath, actionNameAttribute) {
	const elements = composedPath.filter((el) => el instanceof Element && !FILTERED_TAGNAMES.includes(el.tagName));
	if (elements.length === 0) return "";
	const allowedAttributes = actionNameAttribute ? [actionNameAttribute].concat(SAFE_ATTRIBUTES) : SAFE_ATTRIBUTES;
	let result = "";
	for (const element of elements) {
		const part = getSelectorStringFromElement(element, allowedAttributes);
		result += part;
		if (result.length >= CHARACTER_LIMIT) return safeTruncate(result, CHARACTER_LIMIT);
	}
	return result;
}
/**
* Extracts a selector string from an element.
*/
function getSelectorStringFromElement(element, allowedAttributes) {
	const tagName = getTagNameSelector(element);
	const id = getIDSelector(element);
	const classes = getElementClassesString(element);
	const attributes = extractSafeAttributesString(element, allowedAttributes);
	const positionData = computePositionDataString(element);
	return `${tagName}${id || ""}${attributes}${classes}${positionData};`;
}
function getElementClassesString(element) {
	return Array.from(element.classList).filter((c) => !isGeneratedValue(c)).sort().map((c) => `.${CSS.escape(c)}`).join("");
}
/**
* Computes the nthChild and nthOfType positions for an element.
*
* @param element - The element to compute the position data for
* @returns A string of the form ":nth-child(1):nth-of-type(1)"
*/
function computePositionDataString(element) {
	const siblings = Array.from(element.parentNode.children);
	if (siblings.length <= 1) return "";
	const sameTypeSiblings = siblings.filter((sibling) => sibling.tagName === element.tagName);
	const nthChild = siblings.indexOf(element);
	const nthOfType = getNthOfTypeSelector(element);
	return `:nth-child(${nthChild + 1})${sameTypeSiblings.length > 1 ? `:nth-of-type(${nthOfType})` : ""}`;
}
/**
* Extracts only the safe (allowlisted) attributes from an element.
* The attributes are sorted alphabetically by name.
*/
function extractSafeAttributesString(element, allowedAttributes) {
	const result = [];
	const attributes = Array.from(element.attributes);
	for (const attribute of attributes) if (allowedAttributes.includes(attribute.name)) result.push(getAttributeValueSelector(attribute.name, attribute.value));
	return result.sort().join("");
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-rum-core@6.33.0/node_modules/@datadog/browser-rum-core/esm/domain/action/clickChain.js
var MAX_DURATION_BETWEEN_CLICKS = ONE_SECOND;
function createClickChain(firstClick, onFinalize) {
	const bufferedClicks = [];
	let status = 0;
	let maxDurationBetweenClicksTimeoutId;
	appendClick(firstClick);
	function appendClick(click) {
		click.stopObservable.subscribe(tryFinalize);
		bufferedClicks.push(click);
		clearTimeout(maxDurationBetweenClicksTimeoutId);
		maxDurationBetweenClicksTimeoutId = setTimeout(dontAcceptMoreClick, MAX_DURATION_BETWEEN_CLICKS);
	}
	function tryFinalize() {
		if (status === 1 && bufferedClicks.every((click) => click.isStopped())) {
			status = 2;
			onFinalize(bufferedClicks);
		}
	}
	function dontAcceptMoreClick() {
		clearTimeout(maxDurationBetweenClicksTimeoutId);
		if (status === 0) {
			status = 1;
			tryFinalize();
		}
	}
	return {
		tryAppend: (click) => {
			if (status !== 0) return false;
			if (bufferedClicks.length > 0 && !areEventsSimilar(bufferedClicks[bufferedClicks.length - 1].event, click.event)) {
				dontAcceptMoreClick();
				return false;
			}
			appendClick(click);
			return true;
		},
		stop: () => {
			dontAcceptMoreClick();
		}
	};
}
/**
* Checks whether two events are similar by comparing their target, position and timestamp
*/
function areEventsSimilar(first, second) {
	return first.target === second.target && mouseEventDistance(first, second) <= 100 && first.timeStamp - second.timeStamp <= MAX_DURATION_BETWEEN_CLICKS;
}
function mouseEventDistance(origin, other) {
	return Math.sqrt(Math.pow(origin.clientX - other.clientX, 2) + Math.pow(origin.clientY - other.clientY, 2));
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-rum-core@6.33.0/node_modules/@datadog/browser-rum-core/esm/domain/action/getActionNameFromElement.js
function getActionNameFromElement(element, rumConfiguration, nodePrivacyLevel = NodePrivacyLevel.ALLOW) {
	const nodePrivacyLevelCache = /* @__PURE__ */ new Map();
	const { actionNameAttribute: userProgrammaticAttribute } = rumConfiguration;
	const defaultActionName = getActionNameFromElementProgrammatically(element, "data-dd-action-name") || userProgrammaticAttribute && getActionNameFromElementProgrammatically(element, userProgrammaticAttribute);
	if (defaultActionName) return {
		name: defaultActionName,
		nameSource: "custom_attribute"
	};
	else if (nodePrivacyLevel === NodePrivacyLevel.MASK) return {
		name: ACTION_NAME_PLACEHOLDER,
		nameSource: "mask_placeholder"
	};
	return getActionNameFromElementForStrategies(element, priorityStrategies, rumConfiguration, nodePrivacyLevelCache) || getActionNameFromElementForStrategies(element, fallbackStrategies, rumConfiguration, nodePrivacyLevelCache) || {
		name: "",
		nameSource: "blank"
	};
}
function getActionNameFromElementProgrammatically(targetElement, programmaticAttribute) {
	const elementWithAttribute = closestShadowAware(targetElement, `[${programmaticAttribute}]`);
	if (!elementWithAttribute) return;
	return truncate(normalizeWhitespace(elementWithAttribute.getAttribute(programmaticAttribute).trim()));
}
function closestShadowAware(element, selector) {
	let current = element;
	while (current) {
		if (current.matches(selector)) return current;
		current = getParentElement(current);
	}
	return null;
}
var priorityStrategies = [
	(element, rumConfiguration, nodePrivacyLevelCache) => {
		if ("labels" in element && element.labels && element.labels.length > 0) return getActionNameFromTextualContent(element.labels[0], rumConfiguration, nodePrivacyLevelCache);
	},
	(element) => {
		if (element.nodeName === "INPUT") {
			const input = element;
			const type = input.getAttribute("type");
			if (type === "button" || type === "submit" || type === "reset") return {
				name: input.value,
				nameSource: "text_content"
			};
		}
	},
	(element, rumConfiguration, nodePrivacyLevelCache) => {
		if (element.nodeName === "BUTTON" || element.nodeName === "LABEL" || element.getAttribute("role") === "button") return getActionNameFromTextualContent(element, rumConfiguration, nodePrivacyLevelCache);
	},
	(element, rumConfiguration, nodePrivacyLevelCache) => getActionNameFromStandardAttribute(element, "aria-label", rumConfiguration, nodePrivacyLevelCache),
	(element, rumConfiguration, nodePrivacyLevelCache) => {
		const labelledByAttribute = element.getAttribute("aria-labelledby");
		if (labelledByAttribute) return {
			name: labelledByAttribute.split(/\s+/).map((id) => getElementById(element, id)).filter((label) => Boolean(label)).map((element) => getTextualContent(element, rumConfiguration, nodePrivacyLevelCache)).join(" "),
			nameSource: "text_content"
		};
	},
	(element, rumConfiguration, nodePrivacyLevelCache) => getActionNameFromStandardAttribute(element, "alt", rumConfiguration, nodePrivacyLevelCache),
	(element, rumConfiguration, nodePrivacyLevelCache) => getActionNameFromStandardAttribute(element, "name", rumConfiguration, nodePrivacyLevelCache),
	(element, rumConfiguration, nodePrivacyLevelCache) => getActionNameFromStandardAttribute(element, "title", rumConfiguration, nodePrivacyLevelCache),
	(element, rumConfiguration, nodePrivacyLevelCache) => getActionNameFromStandardAttribute(element, "placeholder", rumConfiguration, nodePrivacyLevelCache),
	(element, rumConfiguration, nodePrivacyLevelCache) => {
		if ("options" in element && element.options.length > 0) return getActionNameFromTextualContent(element.options[0], rumConfiguration, nodePrivacyLevelCache);
	}
];
var fallbackStrategies = [(element, rumConfiguration, nodePrivacyLevelCache) => getActionNameFromTextualContent(element, rumConfiguration, nodePrivacyLevelCache)];
/**
* Iterates over the target element and its parent, using the strategies list to get an action name.
* Each strategies are applied on each element, stopping as soon as a non-empty value is returned.
*/
var MAX_PARENTS_TO_CONSIDER = 10;
function getActionNameFromElementForStrategies(targetElement, strategies, rumConfiguration, nodePrivacyLevelCache) {
	let element = targetElement;
	let recursionCounter = 0;
	while (recursionCounter <= MAX_PARENTS_TO_CONSIDER && element && element.nodeName !== "BODY" && element.nodeName !== "HTML" && element.nodeName !== "HEAD") {
		for (const strategy of strategies) {
			const actionName = strategy(element, rumConfiguration, nodePrivacyLevelCache);
			if (actionName) {
				const { name, nameSource } = actionName;
				const trimmedName = name && name.trim();
				if (trimmedName) return {
					name: truncate(normalizeWhitespace(trimmedName)),
					nameSource
				};
			}
		}
		if (element.nodeName === "FORM") break;
		element = getParentElement(element);
		recursionCounter += 1;
	}
}
function normalizeWhitespace(s) {
	return s.replace(/\s+/g, " ");
}
function truncate(s) {
	return s.length > 100 ? `${safeTruncate(s, 100)} [...]` : s;
}
function getElementById(refElement, id) {
	const rootNode = refElement.getRootNode();
	if (rootNode instanceof ShadowRoot) {
		const shadowElement = rootNode.getElementById(id);
		if (shadowElement) return shadowElement;
	}
	return refElement.ownerDocument ? refElement.ownerDocument.getElementById(id) : null;
}
function getActionNameFromStandardAttribute(element, attribute, rumConfiguration, nodePrivacyLevelCache) {
	const { enablePrivacyForActionName, defaultPrivacyLevel } = rumConfiguration;
	let attributeValue = element.getAttribute(attribute);
	if (attributeValue && enablePrivacyForActionName) {
		const nodePrivacyLevel = getNodePrivacyLevel(element, defaultPrivacyLevel, nodePrivacyLevelCache);
		if (shouldMaskAttribute(element.tagName, attribute, attributeValue, nodePrivacyLevel, rumConfiguration)) attributeValue = maskDisallowedTextContent(attributeValue, ACTION_NAME_PLACEHOLDER);
	} else if (!attributeValue) attributeValue = "";
	return {
		name: attributeValue,
		nameSource: "standard_attribute"
	};
}
function getActionNameFromTextualContent(element, rumConfiguration, nodePrivacyLevelCache) {
	return {
		name: getTextualContent(element, rumConfiguration, nodePrivacyLevelCache) || "",
		nameSource: "text_content"
	};
}
function getTextualContent(element, rumConfiguration, nodePrivacyLevelCache) {
	if (element.isContentEditable) return;
	const { enablePrivacyForActionName, actionNameAttribute: userProgrammaticAttribute, defaultPrivacyLevel } = rumConfiguration;
	if (isExperimentalFeatureEnabled(ExperimentalFeature.USE_TREE_WALKER_FOR_ACTION_NAME)) return getTextualContentWithTreeWalker(element, userProgrammaticAttribute, enablePrivacyForActionName, defaultPrivacyLevel, nodePrivacyLevelCache);
	if ("innerText" in element) {
		let text = element.innerText;
		const removeTextFromElements = (query) => {
			const list = element.querySelectorAll(query);
			for (let index = 0; index < list.length; index += 1) {
				const element = list[index];
				if ("innerText" in element) {
					const textToReplace = element.innerText;
					if (textToReplace && textToReplace.trim().length > 0) text = text.replace(textToReplace, "");
				}
			}
		};
		removeTextFromElements(`[${DEFAULT_PROGRAMMATIC_ACTION_NAME_ATTRIBUTE}]`);
		if (userProgrammaticAttribute) removeTextFromElements(`[${userProgrammaticAttribute}]`);
		if (enablePrivacyForActionName) removeTextFromElements(`${getPrivacySelector(NodePrivacyLevel.HIDDEN)}, ${getPrivacySelector(NodePrivacyLevel.MASK)}`);
		return text;
	}
	return element.textContent;
}
function getTextualContentWithTreeWalker(element, userProgrammaticAttribute, privacyEnabledActionName, defaultPrivacyLevel, nodePrivacyLevelCache) {
	const walker = document.createTreeWalker(element, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT, rejectInvisibleOrMaskedElementsFilter);
	let text = "";
	while (walker.nextNode()) {
		const node = walker.currentNode;
		if (isElementNode(node)) {
			if (node.nodeName === "BR" || node.nodeName === "P" || [
				"block",
				"flex",
				"grid",
				"list-item",
				"table",
				"table-caption"
			].includes(getComputedStyle(node).display)) text += " ";
			continue;
		}
		text += node.textContent || "";
	}
	return text.replace(/\s+/g, " ").trim();
	function rejectInvisibleOrMaskedElementsFilter(node) {
		const nodeSelfPrivacyLevel = getNodePrivacyLevel(node, defaultPrivacyLevel, nodePrivacyLevelCache);
		if (privacyEnabledActionName && nodeSelfPrivacyLevel && shouldMaskNode(node, nodeSelfPrivacyLevel)) return NodeFilter.FILTER_REJECT;
		if (isElementNode(node)) {
			if (node.hasAttribute("data-dd-action-name") || userProgrammaticAttribute && node.hasAttribute(userProgrammaticAttribute)) return NodeFilter.FILTER_REJECT;
			const style = getComputedStyle(node);
			if (style.visibility !== "visible" || style.display === "none" || style.contentVisibility && style.contentVisibility !== "visible") return NodeFilter.FILTER_REJECT;
		}
		return NodeFilter.FILTER_ACCEPT;
	}
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-rum-core@6.33.0/node_modules/@datadog/browser-rum-core/esm/domain/action/listenActionEvents.js
function listenActionEvents(configuration, { onPointerDown, onPointerUp }) {
	let selectionEmptyAtPointerDown;
	let userActivity = {
		selection: false,
		input: false,
		scroll: false
	};
	let clickContext;
	const listeners = [
		addEventListener(configuration, window, "pointerdown", (event) => {
			if (isValidPointerEvent(event)) {
				selectionEmptyAtPointerDown = isSelectionEmpty();
				userActivity = {
					selection: false,
					input: false,
					scroll: false
				};
				clickContext = onPointerDown(event);
			}
		}, { capture: true }),
		addEventListener(configuration, window, "selectionchange", () => {
			if (!selectionEmptyAtPointerDown || !isSelectionEmpty()) userActivity.selection = true;
		}, { capture: true }),
		addEventListener(configuration, window, "scroll", () => {
			userActivity.scroll = true;
		}, {
			capture: true,
			passive: true
		}),
		addEventListener(configuration, window, "pointerup", (event) => {
			if (isValidPointerEvent(event) && clickContext) {
				const localUserActivity = userActivity;
				onPointerUp(clickContext, event, () => localUserActivity);
				clickContext = void 0;
			}
		}, { capture: true }),
		addEventListener(configuration, window, "input", () => {
			userActivity.input = true;
		}, { capture: true })
	];
	return { stop: () => {
		listeners.forEach((listener) => listener.stop());
	} };
}
function isSelectionEmpty() {
	const selection = window.getSelection();
	return !selection || selection.isCollapsed;
}
function isValidPointerEvent(event) {
	return event.target instanceof Element && event.isPrimary !== false;
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-rum-core@6.33.0/node_modules/@datadog/browser-rum-core/esm/domain/action/computeFrustration.js
var MIN_CLICKS_PER_SECOND_TO_CONSIDER_RAGE = 3;
function computeFrustration(clicks, rageClick) {
	if (isRage(clicks)) {
		rageClick.addFrustration(FrustrationType.RAGE_CLICK);
		if (clicks.some(isDead)) rageClick.addFrustration(FrustrationType.DEAD_CLICK);
		if (rageClick.hasError) rageClick.addFrustration(FrustrationType.ERROR_CLICK);
		return { isRage: true };
	}
	const hasSelectionChanged = clicks.some((click) => click.getUserActivity().selection);
	clicks.forEach((click) => {
		if (click.hasError) click.addFrustration(FrustrationType.ERROR_CLICK);
		if (isDead(click) && !hasSelectionChanged) click.addFrustration(FrustrationType.DEAD_CLICK);
	});
	return { isRage: false };
}
function isRage(clicks) {
	if (clicks.some((click) => click.getUserActivity().selection || click.getUserActivity().scroll)) return false;
	for (let i = 0; i < clicks.length - 2; i += 1) if (clicks[i + MIN_CLICKS_PER_SECOND_TO_CONSIDER_RAGE - 1].event.timeStamp - clicks[i].event.timeStamp <= 1e3) return true;
	return false;
}
var DEAD_CLICK_EXCLUDE_SELECTOR = "input:not([type=\"checkbox\"]):not([type=\"radio\"]):not([type=\"button\"]):not([type=\"submit\"]):not([type=\"reset\"]):not([type=\"range\"]),textarea,select,[contenteditable],[contenteditable] *,canvas,a[href],a[href] *";
function isDead(click) {
	if (click.hasPageActivity || click.getUserActivity().input || click.getUserActivity().scroll) return false;
	let target = click.event.target;
	if (target.tagName === "LABEL" && target.hasAttribute("for")) target = document.getElementById(target.getAttribute("for"));
	return !target || !target.matches(DEAD_CLICK_EXCLUDE_SELECTOR);
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-rum-core@6.33.0/node_modules/@datadog/browser-rum-core/esm/domain/action/interactionSelectorCache.js
var CLICK_ACTION_MAX_DURATION = 10 * ONE_SECOND;
var interactionSelectorCache = /* @__PURE__ */ new Map();
function getInteractionSelector(relativeTimestamp) {
	const selector = interactionSelectorCache.get(relativeTimestamp);
	interactionSelectorCache.delete(relativeTimestamp);
	return selector;
}
function updateInteractionSelector(relativeTimestamp, selector) {
	interactionSelectorCache.set(relativeTimestamp, selector);
	interactionSelectorCache.forEach((_, relativeTimestamp) => {
		if (elapsed(relativeTimestamp, relativeNow()) > CLICK_ACTION_MAX_DURATION) interactionSelectorCache.delete(relativeTimestamp);
	});
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-rum-core@6.33.0/node_modules/@datadog/browser-rum-core/esm/domain/action/isActionChildEvent.js
function isActionChildEvent(id) {
	return (event) => event.action !== void 0 && event.action.id !== void 0 && event.action.id.includes(id);
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-rum-core@6.33.0/node_modules/@datadog/browser-rum-core/esm/domain/action/trackClickActions.js
function trackClickActions(lifeCycle, domMutationObservable, windowOpenObservable, configuration) {
	const actionTracker = startEventTracker(lifeCycle);
	const stopObservable = new Observable();
	let currentClickChain;
	lifeCycle.subscribe(5, stopClickChain);
	lifeCycle.subscribe(11, stopClickChain);
	const { stop: stopActionEventsListener } = listenActionEvents(configuration, {
		onPointerDown: (pointerDownEvent) => processPointerDown(configuration, lifeCycle, domMutationObservable, pointerDownEvent, windowOpenObservable),
		onPointerUp: ({ clickActionBase, hadActivityOnPointerDown }, startEvent, getUserActivity) => {
			startClickAction(configuration, lifeCycle, domMutationObservable, windowOpenObservable, actionTracker, stopObservable, appendClickToClickChain, clickActionBase, startEvent, getUserActivity, hadActivityOnPointerDown);
		}
	});
	return {
		stop: () => {
			stopClickChain();
			stopObservable.notify();
			stopActionEventsListener();
			actionTracker.stopAll();
		},
		findActionId: actionTracker.findId
	};
	function appendClickToClickChain(click) {
		if (!currentClickChain || !currentClickChain.tryAppend(click)) {
			const rageClick = click.clone();
			currentClickChain = createClickChain(click, (clicks) => {
				finalizeClicks(clicks, rageClick);
				currentClickChain = void 0;
			});
		}
	}
	function stopClickChain() {
		if (currentClickChain) currentClickChain.stop();
	}
}
function processPointerDown(configuration, lifeCycle, domMutationObservable, pointerDownEvent, windowOpenObservable) {
	const targetForPrivacy = configuration.betaTrackActionsInShadowDom ? getEventTarget$1(pointerDownEvent) : pointerDownEvent.target;
	let nodePrivacyLevel;
	if (configuration.enablePrivacyForActionName) nodePrivacyLevel = getNodePrivacyLevel(targetForPrivacy, configuration.defaultPrivacyLevel);
	else nodePrivacyLevel = NodePrivacyLevel.ALLOW;
	if (nodePrivacyLevel === NodePrivacyLevel.HIDDEN) return;
	const clickActionBase = computeClickActionBase(pointerDownEvent, nodePrivacyLevel, configuration);
	let hadActivityOnPointerDown = false;
	waitPageActivityEnd(lifeCycle, domMutationObservable, windowOpenObservable, configuration, (pageActivityEndEvent) => {
		hadActivityOnPointerDown = pageActivityEndEvent.hadActivity;
	}, 100);
	return {
		clickActionBase,
		hadActivityOnPointerDown: () => hadActivityOnPointerDown
	};
}
function startClickAction(configuration, lifeCycle, domMutationObservable, windowOpenObservable, actionTracker, stopObservable, appendClickToClickChain, clickActionBase, startEvent, getUserActivity, hadActivityOnPointerDown) {
	var _a;
	const click = newClick(lifeCycle, actionTracker, getUserActivity, clickActionBase, startEvent);
	appendClickToClickChain(click);
	const selector = (_a = clickActionBase === null || clickActionBase === void 0 ? void 0 : clickActionBase.target) === null || _a === void 0 ? void 0 : _a.selector;
	if (selector) updateInteractionSelector(startEvent.timeStamp, selector);
	const { stop: stopWaitPageActivityEnd } = waitPageActivityEnd(lifeCycle, domMutationObservable, windowOpenObservable, configuration, (pageActivityEndEvent) => {
		if (pageActivityEndEvent.hadActivity && pageActivityEndEvent.end < click.startClocks.timeStamp) click.discard();
		else if (pageActivityEndEvent.hadActivity) click.stop(pageActivityEndEvent.end);
		else if (hadActivityOnPointerDown()) click.stop(click.startClocks.timeStamp);
		else click.stop();
	}, CLICK_ACTION_MAX_DURATION);
	const viewEndedSubscription = lifeCycle.subscribe(5, ({ endClocks }) => {
		click.stop(endClocks.timeStamp);
	});
	const pageMayExitSubscription = lifeCycle.subscribe(11, () => {
		click.stop(timeStampNow());
	});
	const stopSubscription = stopObservable.subscribe(() => {
		click.stop();
	});
	click.stopObservable.subscribe(() => {
		pageMayExitSubscription.unsubscribe();
		viewEndedSubscription.unsubscribe();
		stopWaitPageActivityEnd();
		stopSubscription.unsubscribe();
	});
}
function computeClickActionBase(event, nodePrivacyLevel, configuration) {
	const target = configuration.betaTrackActionsInShadowDom ? getEventTarget$1(event) : event.target;
	const rect = target.getBoundingClientRect();
	const selector = getSelectorFromElement(target, configuration.actionNameAttribute);
	const composedPathSelector = getComposedPathSelector(event.composedPath(), configuration.actionNameAttribute);
	if (selector) updateInteractionSelector(event.timeStamp, selector);
	const { name, nameSource } = getActionNameFromElement(target, configuration, nodePrivacyLevel);
	return {
		type: ActionType.CLICK,
		target: {
			width: Math.round(rect.width),
			height: Math.round(rect.height),
			selector,
			composedPathSelector: composedPathSelector || void 0
		},
		position: {
			x: Math.round(event.clientX - rect.left),
			y: Math.round(event.clientY - rect.top)
		},
		name,
		nameSource
	};
}
function getEventTarget$1(event) {
	if (event.composed && isNodeShadowHost(event.target) && typeof event.composedPath === "function") {
		const composedPath = event.composedPath();
		if (composedPath.length > 0 && composedPath[0] instanceof Element) return composedPath[0];
	}
	return event.target;
}
__name(getEventTarget$1, "getEventTarget");
function newClick(lifeCycle, actionTracker, getUserActivity, clickActionBase, startEvent) {
	const clickKey = generateUUID();
	const startClocks = relativeToClocks(startEvent.timeStamp);
	const startedClickAction = actionTracker.start(clickKey, startClocks, clickActionBase, { isChildEvent: isActionChildEvent });
	lifeCycle.notify(15, startedClickAction);
	let status = 0;
	let actionTrackerFinishedEvent;
	const frustrationTypes = [];
	const stopObservable = new Observable();
	function stop(activityEndTime) {
		if (status !== 0) return;
		status = 1;
		actionTrackerFinishedEvent = activityEndTime ? actionTracker.stop(clickKey, timeStampToClocks(activityEndTime)) : actionTracker.discard(clickKey);
		stopObservable.notify();
	}
	return {
		event: startEvent,
		stop,
		stopObservable,
		get hasError() {
			var _a;
			const currentCounts = (_a = actionTrackerFinishedEvent === null || actionTrackerFinishedEvent === void 0 ? void 0 : actionTrackerFinishedEvent.counts) !== null && _a !== void 0 ? _a : actionTracker.getCounts(clickKey);
			return currentCounts ? currentCounts.errorCount > 0 : false;
		},
		get hasPageActivity() {
			return actionTrackerFinishedEvent && "duration" in actionTrackerFinishedEvent;
		},
		getUserActivity,
		addFrustration: (frustrationType) => {
			frustrationTypes.push(frustrationType);
		},
		get startClocks() {
			return startClocks;
		},
		isStopped: () => status === 1 || status === 2,
		clone: () => newClick(lifeCycle, actionTracker, getUserActivity, clickActionBase, startEvent),
		validate: (domEvents) => {
			stop();
			if (status !== 1) return;
			if (!actionTrackerFinishedEvent) return;
			const clickAction = {
				frustrationTypes,
				events: domEvents !== null && domEvents !== void 0 ? domEvents : [startEvent],
				event: startEvent,
				...actionTrackerFinishedEvent,
				counts: actionTrackerFinishedEvent.counts
			};
			lifeCycle.notify(0, clickAction);
			status = 2;
		},
		discard: () => {
			stop();
			status = 2;
		}
	};
}
function finalizeClicks(clicks, rageClick) {
	const { isRage } = computeFrustration(clicks, rageClick);
	if (isRage) {
		clicks.forEach((click) => click.discard());
		rageClick.stop(timeStampNow());
		rageClick.validate(clicks.map((click) => click.event));
	} else {
		rageClick.discard();
		clicks.forEach((click) => click.validate());
	}
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-rum-core@6.33.0/node_modules/@datadog/browser-rum-core/esm/domain/action/trackManualActions.js
function trackManualActions(lifeCycle, onManualActionCompleted) {
	const actionTracker = startEventTracker(lifeCycle);
	function startManualAction(name, options = {}, startClocks = clocksNow()) {
		var _a;
		const lookupKey = (_a = options.actionKey) !== null && _a !== void 0 ? _a : name;
		const startedManualAction = actionTracker.start(lookupKey, startClocks, {
			name,
			...options
		}, { isChildEvent: isActionChildEvent });
		lifeCycle.notify(15, startedManualAction);
	}
	function stopManualAction(name, options = {}, stopClocks = clocksNow()) {
		var _a;
		const lookupKey = (_a = options.actionKey) !== null && _a !== void 0 ? _a : name;
		const stopped = actionTracker.stop(lookupKey, stopClocks, options);
		if (!stopped) return;
		const frustrationTypes = [];
		if (stopped.counts && stopped.counts.errorCount > 0) frustrationTypes.push(FrustrationType.ERROR_CLICK);
		onManualActionCompleted({
			...stopped,
			type: stopped.type || ActionType.CUSTOM,
			frustrationTypes
		});
	}
	function addInstantAction(action) {
		onManualActionCompleted({
			id: generateUUID(),
			frustrationTypes: [],
			...action
		});
	}
	return {
		addAction: addInstantAction,
		startAction: startManualAction,
		stopAction: stopManualAction,
		findActionId: actionTracker.findId,
		stop: actionTracker.stopAll
	};
}
function startActionCollection(lifeCycle, hooks, domMutationObservable, windowOpenObservable, configuration) {
	const { unsubscribe: unsubscribeAutoAction } = lifeCycle.subscribe(0, (action) => {
		lifeCycle.notify(12, processAction(action));
	});
	const stopClickActions = noop;
	let clickActions;
	if (configuration.trackUserInteractions) clickActions = trackClickActions(lifeCycle, domMutationObservable, windowOpenObservable, configuration);
	const manualActions = trackManualActions(lifeCycle, (action) => {
		lifeCycle.notify(12, processAction(action));
	});
	const actionContexts = { findActionId: (startTime) => {
		var _a;
		const manualActionId = manualActions.findActionId(startTime);
		const clickActionId = (_a = clickActions === null || clickActions === void 0 ? void 0 : clickActions.findActionId(startTime)) !== null && _a !== void 0 ? _a : [];
		return manualActionId.concat(clickActionId);
	} };
	hooks.register(0, ({ startTime, eventType }) => {
		if (eventType !== RumEventType.ERROR && eventType !== RumEventType.RESOURCE && eventType !== RumEventType.LONG_TASK) return SKIPPED;
		const correctedStartTime = eventType === RumEventType.LONG_TASK ? addDuration(startTime, 1) : startTime;
		const actionId = actionContexts.findActionId(correctedStartTime);
		if (!actionId.length) return SKIPPED;
		return {
			type: eventType,
			action: { id: actionId }
		};
	});
	hooks.register(1, ({ startTime }) => ({ action: { id: actionContexts.findActionId(startTime) } }));
	return {
		addAction: manualActions.addAction,
		startAction: manualActions.startAction,
		stopAction: manualActions.stopAction,
		actionContexts,
		stop: () => {
			unsubscribeAutoAction();
			stopClickActions();
			manualActions.stop();
			clickActions === null || clickActions === void 0 || clickActions.stop();
		}
	};
}
function processAction(action) {
	var _a;
	var _b;
	var _c;
	var _d;
	const isAuto = isAutoAction(action);
	const loadingTime = discardNegativeDuration(toServerDuration(action.duration));
	return {
		rawRumEvent: {
			type: RumEventType.ACTION,
			date: action.startClocks.timeStamp,
			action: {
				id: action.id,
				target: { name: action.name },
				type: action.type,
				...loadingTime !== void 0 && { loading_time: loadingTime },
				...action.counts && {
					error: { count: action.counts.errorCount },
					long_task: { count: action.counts.longTaskCount },
					resource: { count: action.counts.resourceCount }
				},
				frustration: { type: action.frustrationTypes }
			},
			...isAuto ? { _dd: { action: {
				target: {
					selector: ((_a = action.target) === null || _a === void 0 ? void 0 : _a.selector) || void 0,
					width: ((_b = action.target) === null || _b === void 0 ? void 0 : _b.width) || void 0,
					height: ((_c = action.target) === null || _c === void 0 ? void 0 : _c.height) || void 0,
					composed_path_selector: (_d = action.target) === null || _d === void 0 ? void 0 : _d.composedPathSelector
				},
				position: action.position,
				name_source: action.nameSource
			} } } : { context: action.context }
		},
		duration: action.duration,
		startClocks: action.startClocks,
		domainContext: isAuto ? { events: action.events } : { handlingStack: action.handlingStack }
	};
}
function isAutoAction(action) {
	return "events" in action;
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-rum-core@6.33.0/node_modules/@datadog/browser-rum-core/esm/domain/error/trackConsoleError.js
function trackConsoleError(errorObservable) {
	const subscription = initConsoleObservable([ConsoleApiName.error]).subscribe((consoleLog) => errorObservable.notify(consoleLog.error));
	return { stop: () => {
		subscription.unsubscribe();
	} };
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-rum-core@6.33.0/node_modules/@datadog/browser-rum-core/esm/domain/error/trackReportError.js
function trackReportError(configuration, errorObservable) {
	const subscription = initReportObservable(configuration, [RawReportType.cspViolation, RawReportType.intervention]).subscribe((rawError) => errorObservable.notify(rawError));
	return { stop: () => {
		subscription.unsubscribe();
	} };
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-rum-core@6.33.0/node_modules/@datadog/browser-rum-core/esm/domain/error/errorCollection.js
function startErrorCollection(lifeCycle, configuration, bufferedDataObservable) {
	const errorObservable = new Observable();
	bufferedDataObservable.subscribe((bufferedData) => {
		if (bufferedData.type === 0) errorObservable.notify(bufferedData.error);
	});
	trackConsoleError(errorObservable);
	trackReportError(configuration, errorObservable);
	errorObservable.subscribe((error) => lifeCycle.notify(14, { error }));
	return doStartErrorCollection(lifeCycle);
}
function doStartErrorCollection(lifeCycle) {
	lifeCycle.subscribe(14, ({ error }) => {
		lifeCycle.notify(12, processError(error));
	});
	return { addError: ({ error, handlingStack, componentStack, startClocks, context }) => {
		const rawError = computeRawError({
			originalError: error,
			handlingStack,
			componentStack,
			startClocks,
			nonErrorPrefix: "Provided",
			source: ErrorSource.CUSTOM,
			handling: "handled"
		});
		rawError.context = combine(rawError.context, context);
		lifeCycle.notify(14, { error: rawError });
	} };
}
function processError(error) {
	const rawRumEvent = {
		date: error.startClocks.timeStamp,
		error: {
			id: generateUUID(),
			message: error.message,
			source: error.source,
			stack: error.stack,
			handling_stack: error.handlingStack,
			component_stack: error.componentStack,
			type: error.type,
			handling: error.handling,
			causes: error.causes,
			source_type: "browser",
			fingerprint: error.fingerprint,
			csp: error.csp
		},
		type: RumEventType.ERROR,
		context: error.context
	};
	const domainContext = {
		error: error.originalError,
		handlingStack: error.handlingStack
	};
	return {
		rawRumEvent,
		startClocks: error.startClocks,
		domainContext
	};
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-rum-core@6.33.0/node_modules/@datadog/browser-rum-core/esm/domain/resource/matchRequestResourceEntry.js
var alreadyMatchedEntries = /* @__PURE__ */ new WeakSet();
/**
* Look for corresponding timing in resource timing buffer
*
* Observations:
* - Timing (start, end) are nested inside the request (start, end)
* - Some timing can be not exactly nested, being off by < 1 ms
*
* Strategy:
* - from valid nested entries (with 1 ms error margin)
* - filter out timing that were already matched to a request
* - then, if a single timing match, return the timing
* - otherwise we can't decide, return undefined
*/
function matchRequestResourceEntry(request) {
	if (!performance || !("getEntriesByName" in performance)) return;
	const sameNameEntries = performance.getEntriesByName(request.url, "resource");
	if (!sameNameEntries.length || !("toJSON" in sameNameEntries[0])) return;
	const candidates = sameNameEntries.filter((entry) => !alreadyMatchedEntries.has(entry)).filter((entry) => hasValidResourceEntryDuration(entry) && hasValidResourceEntryTimings(entry)).filter((entry) => isBetween(entry, request.startClocks.relative, endTime({
		startTime: request.startClocks.relative,
		duration: request.duration
	})));
	if (candidates.length === 1) {
		alreadyMatchedEntries.add(candidates[0]);
		return candidates[0].toJSON();
	}
}
function endTime(timing) {
	return addDuration(timing.startTime, timing.duration);
}
function isBetween(timing, start, end) {
	const errorMargin = 1;
	return timing.startTime >= start - errorMargin && endTime(timing) <= addDuration(end, errorMargin);
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-rum-core@6.33.0/node_modules/@datadog/browser-rum-core/esm/domain/tracing/getDocumentTraceId.js
var INITIAL_DOCUMENT_OUTDATED_TRACE_ID_THRESHOLD = 2 * ONE_MINUTE;
function getDocumentTraceId(document) {
	const data = getDocumentTraceDataFromMeta(document) || getDocumentTraceDataFromComment(document);
	if (!data || data.traceTime <= dateNow() - INITIAL_DOCUMENT_OUTDATED_TRACE_ID_THRESHOLD) return;
	return data.traceId;
}
function getDocumentTraceDataFromMeta(document) {
	const traceIdMeta = document.querySelector("meta[name=dd-trace-id]");
	const traceTimeMeta = document.querySelector("meta[name=dd-trace-time]");
	return createDocumentTraceData(traceIdMeta && traceIdMeta.content, traceTimeMeta && traceTimeMeta.content);
}
function getDocumentTraceDataFromComment(document) {
	const comment = findTraceComment(document);
	if (!comment) return;
	return createDocumentTraceData(findCommaSeparatedValue(comment, "trace-id"), findCommaSeparatedValue(comment, "trace-time"));
}
function createDocumentTraceData(traceId, rawTraceTime) {
	const traceTime = rawTraceTime && Number(rawTraceTime);
	if (!traceId || !traceTime) return;
	return {
		traceId,
		traceTime
	};
}
function findTraceComment(document) {
	for (let i = 0; i < document.childNodes.length; i += 1) {
		const comment = getTraceCommentFromNode(document.childNodes[i]);
		if (comment) return comment;
	}
	if (document.body) for (let i = document.body.childNodes.length - 1; i >= 0; i -= 1) {
		const node = document.body.childNodes[i];
		const comment = getTraceCommentFromNode(node);
		if (comment) return comment;
		if (!isTextNode(node)) break;
	}
}
function getTraceCommentFromNode(node) {
	if (node && isCommentNode(node)) {
		const match = /^\s*DATADOG;(.*?)\s*$/.exec(node.data);
		if (match) return match[1];
	}
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-rum-core@6.33.0/node_modules/@datadog/browser-rum-core/esm/browser/performanceUtils.js
function getNavigationEntry() {
	if (supportPerformanceTimingEvent(RumPerformanceEntryType.NAVIGATION)) {
		const navigationEntry = performance.getEntriesByType(RumPerformanceEntryType.NAVIGATION)[0];
		if (navigationEntry) return navigationEntry;
	}
	const timings = computeTimingsFromDeprecatedPerformanceTiming();
	const entry = {
		entryType: RumPerformanceEntryType.NAVIGATION,
		initiatorType: "navigation",
		name: window.location.href,
		startTime: 0,
		duration: timings.loadEventEnd,
		decodedBodySize: 0,
		encodedBodySize: 0,
		transferSize: 0,
		workerStart: 0,
		toJSON: () => ({
			...entry,
			toJSON: void 0
		}),
		...timings
	};
	return entry;
}
function computeTimingsFromDeprecatedPerformanceTiming() {
	const result = {};
	const timing = performance.timing;
	for (const key in timing) if (isNumber(timing[key])) {
		const numberKey = key;
		const timingElement = timing[numberKey];
		result[numberKey] = timingElement === 0 ? 0 : getRelativeTime(timingElement);
	}
	return result;
}
function sanitizeFirstByte(entry) {
	return entry.responseStart >= 0 && entry.responseStart <= relativeNow() ? entry.responseStart : void 0;
}
function getResourceEntries() {
	if (supportPerformanceTimingEvent(RumPerformanceEntryType.RESOURCE)) return performance.getEntriesByType(RumPerformanceEntryType.RESOURCE);
}
/**
* Find the most relevant resource entry for an LCP element.
*
* Resource entries persist for the entire page lifetime and can include multiple requests
* for the same URL (preloads, cache-busting reloads, SPA route changes, etc.).
* This function returns the most recent matching entry that started before the LCP time,
* which is most likely the one that triggered the LCP paint.
*/
function findLcpResourceEntry(resourceUrl, lcpStartTime) {
	const entries = getResourceEntries();
	if (!entries) return;
	return findLast(entries, (entry) => entry.name === resourceUrl && entry.startTime <= lcpStartTime);
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-rum-core@6.33.0/node_modules/@datadog/browser-rum-core/esm/domain/resource/retrieveInitialDocumentResourceTiming.js
function retrieveInitialDocumentResourceTiming(configuration, callback) {
	runOnReadyState(configuration, "interactive", () => {
		const navigationEntry = mockable(getNavigationEntry)();
		const entry = Object.assign(navigationEntry.toJSON(), {
			entryType: RumPerformanceEntryType.RESOURCE,
			initiatorType: FAKE_INITIAL_DOCUMENT,
			duration: navigationEntry.responseEnd,
			traceId: getDocumentTraceId(document),
			toJSON: () => ({
				...entry,
				toJSON: void 0
			})
		});
		callback(entry);
	});
}
function createRequestRegistry(lifeCycle) {
	const requests = /* @__PURE__ */ new Set();
	let tooManyRequestsReported = false;
	const subscription = lifeCycle.subscribe(8, (request) => {
		requests.add(request);
		if (requests.size > 1e3) {
			const oldestRequest = requests.values().next().value;
			if (!tooManyRequestsReported) {
				tooManyRequestsReported = true;
				let debugContext;
				if (isExperimentalFeatureEnabled(ExperimentalFeature.TOO_MANY_REQUESTS_INVESTIGATION)) {
					let abortedCount = 0;
					let abortedOnStartCount = 0;
					let xhrCount = 0;
					let withoutMatchingEntryCount = 0;
					for (const r of requests) {
						if (r.isAborted) abortedCount++;
						if (r.isAbortedOnStart) abortedOnStartCount++;
						if (r.type === RequestType.XHR) xhrCount++;
						if (!performance.getEntriesByName(r.url, "resource").some((e) => e.startTime >= r.startClocks.relative)) withoutMatchingEntryCount++;
					}
					const oldestRequestAge = timeStampNow() - oldestRequest.startClocks.timeStamp;
					debugContext = {
						abortedCount,
						abortedOnStartCount,
						xhrCount,
						fetchCount: requests.size - xhrCount,
						oldestRequestAge,
						oldestRequestEndAge: oldestRequestAge - oldestRequest.duration,
						withoutMatchingEntryCount
					};
				}
				addTelemetryDebug("Too many requests", debugContext);
			}
			requests.delete(oldestRequest);
		}
	});
	return {
		getMatchingRequest(entry) {
			let minTimeDifference = Infinity;
			let closestRequest;
			for (const request of requests) {
				const timeDifference = entry.startTime - request.startClocks.relative;
				if (0 <= timeDifference && timeDifference < minTimeDifference && request.url === entry.name) {
					minTimeDifference = Math.abs(timeDifference);
					closestRequest = request;
				}
			}
			if (closestRequest) requests.delete(closestRequest);
			return closestRequest;
		},
		stop() {
			subscription.unsubscribe();
		}
	};
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-rum-core@6.33.0/node_modules/@datadog/browser-rum-core/esm/domain/resource/trackManualResources.js
function trackManualResources(lifeCycle, resourceTracker) {
	function startManualResource(url, options = {}, startClocks = clocksNow()) {
		var _a;
		const lookupKey = (_a = options.resourceKey) !== null && _a !== void 0 ? _a : url;
		resourceTracker.start(lookupKey, startClocks, {
			url,
			...options
		});
	}
	function stopManualResource(url, options = {}, stopClocks = clocksNow()) {
		var _a;
		const lookupKey = (_a = options.resourceKey) !== null && _a !== void 0 ? _a : url;
		const stopped = resourceTracker.stop(lookupKey, stopClocks, {
			context: options.context,
			type: options.type
		});
		if (!stopped) return;
		const duration = elapsed(stopped.startClocks.relative, stopClocks.relative);
		const rawRumEvent = {
			date: stopped.startClocks.timeStamp,
			type: RumEventType.RESOURCE,
			resource: {
				id: stopped.id,
				type: stopped.type || ResourceType.OTHER,
				url: sanitizeIfLongDataUrl(stopped.url),
				duration: toServerDuration(duration),
				method: stopped.method,
				status_code: options.statusCode,
				size: options.size
			},
			_dd: {},
			context: stopped.context
		};
		lifeCycle.notify(12, {
			rawRumEvent,
			startClocks: stopped.startClocks,
			duration,
			domainContext: { isManual: true }
		});
	}
	return {
		startResource: startManualResource,
		stopResource: stopManualResource
	};
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-rum-core@6.33.0/node_modules/@datadog/browser-rum-core/esm/domain/resource/resourceCollection.js
function startResourceCollection(lifeCycle, configuration, pageStateHistory) {
	const taskQueue = mockable(createTaskQueue)();
	let requestRegistry;
	const isEarlyRequestCollectionEnabled = configuration.trackEarlyRequests;
	if (isEarlyRequestCollectionEnabled) requestRegistry = createRequestRegistry(lifeCycle);
	else lifeCycle.subscribe(8, (request) => {
		handleResource(() => processRequest(request, configuration, pageStateHistory));
	});
	const performanceResourceSubscription = createPerformanceObservable(configuration, {
		type: RumPerformanceEntryType.RESOURCE,
		buffered: true
	}).subscribe((entries) => {
		for (const entry of entries) if (isEarlyRequestCollectionEnabled || !isResourceEntryRequestType(entry)) handleResource(() => processResourceEntry(entry, configuration, pageStateHistory, requestRegistry));
	});
	mockable(retrieveInitialDocumentResourceTiming)(configuration, (timing) => {
		handleResource(() => processResourceEntry(timing, configuration, pageStateHistory, requestRegistry));
	});
	function handleResource(computeRawEvent) {
		taskQueue.push(() => {
			const rawEvent = computeRawEvent();
			if (rawEvent) lifeCycle.notify(12, rawEvent);
		});
	}
	const resourceTracker = startEventTracker(lifeCycle);
	const manualResources = trackManualResources(lifeCycle, resourceTracker);
	return {
		startResource: manualResources.startResource,
		stopResource: manualResources.stopResource,
		stop: () => {
			taskQueue.stop();
			performanceResourceSubscription.unsubscribe();
			resourceTracker.stopAll();
		}
	};
}
function processRequest(request, configuration, pageStateHistory) {
	return assembleResource(matchRequestResourceEntry(request), request, pageStateHistory, configuration);
}
function processResourceEntry(entry, configuration, pageStateHistory, requestRegistry) {
	return assembleResource(entry, isResourceEntryRequestType(entry) && requestRegistry ? requestRegistry.getMatchingRequest(entry) : void 0, pageStateHistory, configuration);
}
function assembleResource(entry, request, pageStateHistory, configuration) {
	if (!entry && !request) return;
	const tracingInfo = request ? computeRequestTracingInfo(request, configuration) : computeResourceEntryTracingInfo(entry, configuration);
	if (!configuration.trackResources && !tracingInfo) return;
	const startClocks = entry ? relativeToClocks(entry.startTime) : request.startClocks;
	const duration = entry ? computeResourceEntryDuration(entry) : computeRequestDuration(pageStateHistory, startClocks, request.duration);
	const networkHeaders = isExperimentalFeatureEnabled(ExperimentalFeature.TRACK_RESOURCE_HEADERS) ? computeNetworkHeaders(request, configuration) : void 0;
	const graphql = request && computeGraphQlMetaData(request, configuration);
	const contentTypeFromPerformanceEntry = entry && computeContentTypeFromPerformanceEntry(entry);
	return {
		startClocks,
		duration,
		rawRumEvent: combine({
			date: startClocks.timeStamp,
			resource: {
				id: generateUUID(),
				duration: toServerDuration(duration),
				type: request ? request.type === RequestType.XHR ? ResourceType.XHR : ResourceType.FETCH : computeResourceEntryType(entry),
				method: request ? request.method : void 0,
				status_code: request ? request.status : discardZeroStatus(entry.responseStatus),
				url: request ? sanitizeIfLongDataUrl(request.url) : entry.name,
				protocol: entry && computeResourceEntryProtocol(entry),
				delivery_type: entry && computeResourceEntryDeliveryType(entry),
				graphql
			},
			type: RumEventType.RESOURCE,
			_dd: { discarded: !configuration.trackResources }
		}, tracingInfo, entry && computeResourceEntryMetrics(entry), contentTypeFromPerformanceEntry, networkHeaders),
		domainContext: getResourceDomainContext(entry, request)
	};
}
function computeGraphQlMetaData(request, configuration) {
	const graphQlConfig = findGraphQlConfiguration(request.url, configuration);
	if (!graphQlConfig) return;
	return extractGraphQlMetadata(request, graphQlConfig);
}
function computeContentTypeFromPerformanceEntry(entry) {
	const contentType = entry.contentType;
	if (contentType) return { resource: { response: { headers: { "content-type": contentType } } } };
}
function getResourceDomainContext(entry, request) {
	if (request) {
		const baseDomainContext = {
			performanceEntry: entry,
			isAborted: request.isAborted,
			handlingStack: request.handlingStack
		};
		if (request.type === RequestType.XHR) return {
			xhr: request.xhr,
			...baseDomainContext
		};
		return {
			requestInput: request.input,
			requestInit: request.init,
			response: request.response,
			error: request.error,
			...baseDomainContext
		};
	}
	return { performanceEntry: entry };
}
function computeResourceEntryMetrics(entry) {
	const { renderBlockingStatus } = entry;
	return { resource: {
		render_blocking_status: renderBlockingStatus,
		...computeResourceEntrySize(entry),
		...computeResourceEntryDetails(entry)
	} };
}
function computeRequestTracingInfo(request, configuration) {
	if (!(request.traceSampled && request.traceId && request.spanId)) return;
	return { _dd: {
		span_id: request.spanId.toString(),
		trace_id: request.traceId.toString(),
		rule_psr: configuration.rulePsr
	} };
}
function computeResourceEntryTracingInfo(entry, configuration) {
	if (!entry.traceId) return;
	return { _dd: {
		trace_id: entry.traceId,
		span_id: createSpanIdentifier().toString(),
		rule_psr: configuration.rulePsr
	} };
}
function computeRequestDuration(pageStateHistory, startClocks, duration) {
	return !pageStateHistory.wasInPageStateDuringPeriod("frozen", startClocks.relative, duration) ? duration : void 0;
}
/**
* The status is 0 for cross-origin resources without CORS headers, so the status is meaningless, and we shouldn't report it
* https://developer.mozilla.org/en-US/docs/Web/API/PerformanceResourceTiming/responseStatus#cross-origin_response_status_codes
*/
function discardZeroStatus(statusCode) {
	return statusCode === 0 ? void 0 : statusCode;
}
function computeNetworkHeaders(request, configuration) {
	const matchers = configuration.trackResourceHeaders;
	if (matchers.length === 0 || !request) return;
	const urlMatchers = matchers.filter((m) => m.url !== void 0 ? matchList([m.url], request.url, true) : true);
	if (urlMatchers.length === 0) return;
	const responseMatchers = urlMatchers.filter((m) => m.location === void 0 || m.location === "any" || m.location === "response");
	const requestMatchers = urlMatchers.filter((m) => m.location === void 0 || m.location === "any" || m.location === "request");
	const responseHeaders = responseMatchers.length > 0 ? getResponseHeaders(request, responseMatchers) : void 0;
	const requestHeaders = requestMatchers.length > 0 ? getRequestHeaders(request, requestMatchers) : void 0;
	if (!responseHeaders && !requestHeaders) return;
	return { resource: {
		request: requestHeaders ? { headers: requestHeaders } : void 0,
		response: responseHeaders ? { headers: responseHeaders } : void 0
	} };
}
function getResponseHeaders(request, matchers) {
	if (request.type === RequestType.FETCH && request.response) return filterHeaders(request.response.headers, matchers);
	if (request.type === RequestType.XHR && request.xhr) {
		const rawXhrHeaders = request.xhr.getAllResponseHeaders();
		if (rawXhrHeaders) try {
			return filterHeaders(new Headers(parseRawXhrHeaders(rawXhrHeaders)), matchers);
		} catch (_a) {}
	}
}
function getRequestHeaders(request, matchers) {
	var _a;
	if (request.type !== RequestType.FETCH) return;
	let headers;
	if ((_a = request.init) === null || _a === void 0 ? void 0 : _a.headers) headers = new Headers(request.init.headers);
	else if (request.input instanceof Request) headers = request.input.headers;
	return headers ? filterHeaders(headers, matchers) : void 0;
}
var FORBIDDEN_HEADER_PATTERN = /(token|cookie|secret|authorization|(api|secret|access|app).?key|(client|connecting|real).?ip|forwarded)/;
var MAX_HEADER_COUNT = 100;
var MAX_HEADER_VALUE_LENGTH = 128;
function filterHeaders(headers, matchers) {
	const result = {};
	let collectedHeaderCount = 0;
	let totalHeaderCount = 0;
	let hasReachedMaxHeaderCount = false;
	headers.forEach((value, name) => {
		totalHeaderCount++;
		if (collectedHeaderCount >= MAX_HEADER_COUNT) {
			if (!hasReachedMaxHeaderCount) {
				display.warn(`Maximum number of headers (${MAX_HEADER_COUNT}) has been reached. Further headers are dropped.`);
				hasReachedMaxHeaderCount = true;
			}
			return;
		}
		const lowerName = name.toLowerCase();
		if (FORBIDDEN_HEADER_PATTERN.test(lowerName)) return;
		const matchHeader = matchers.find((m) => matchList([m.name], lowerName));
		if (!matchHeader) return;
		const { extractor } = matchHeader;
		const capturedValue = extractor ? extractRegexMatch(value, extractor) : value;
		if (capturedValue === void 0) return;
		if (capturedValue.length > MAX_HEADER_VALUE_LENGTH) {
			display.warn(`Header "${lowerName}" value was truncated from ${capturedValue.length} to ${MAX_HEADER_VALUE_LENGTH} characters.`);
			addTelemetryDebug("Resource header value was truncated", {
				header_name: lowerName,
				original_length: capturedValue.length,
				limit: MAX_HEADER_VALUE_LENGTH
			});
		}
		result[lowerName] = safeTruncate(capturedValue, MAX_HEADER_VALUE_LENGTH);
		collectedHeaderCount++;
	});
	if (hasReachedMaxHeaderCount) addTelemetryDebug("Maximum number of resource headers reached", {
		collectedHeaderCount,
		totalHeaderCount
	});
	return collectedHeaderCount > 0 ? result : void 0;
}
function parseRawXhrHeaders(rawXhrheaders) {
	const pairs = [];
	const lines = rawXhrheaders.trim().split(/\r\n/);
	for (const line of lines) {
		const colonIndex = line.indexOf(":");
		if (colonIndex > 0) pairs.push([line.substring(0, colonIndex).trim(), line.substring(colonIndex + 1).trim()]);
	}
	return pairs;
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-rum-core@6.33.0/node_modules/@datadog/browser-rum-core/esm/domain/view/trackViewEventCounts.js
function trackViewEventCounts(lifeCycle, viewId, onChange) {
	const { stop, eventCounts } = trackEventCounts({
		lifeCycle,
		isChildEvent: (event) => event.view.id === viewId,
		onChange
	});
	return {
		stop,
		eventCounts
	};
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-rum-core@6.33.0/node_modules/@datadog/browser-rum-core/esm/domain/view/viewMetrics/trackFirstContentfulPaint.js
var FCP_MAXIMUM_DELAY = 10 * ONE_MINUTE;
function trackFirstContentfulPaint(configuration, firstHidden, callback) {
	return { stop: createPerformanceObservable(configuration, {
		type: RumPerformanceEntryType.PAINT,
		buffered: true
	}).subscribe((entries) => {
		const fcpEntry = entries.find((entry) => entry.name === "first-contentful-paint" && entry.startTime < firstHidden.timeStamp && entry.startTime < FCP_MAXIMUM_DELAY);
		if (fcpEntry) callback(fcpEntry.startTime);
	}).unsubscribe };
}
/**
* Measure the First Contentful Paint after a BFCache restoration.
* The DOM is restored synchronously, so we approximate the FCP with the first frame
* rendered just after the pageshow event, using two nested requestAnimationFrame calls.
*/
function trackRestoredFirstContentfulPaint(viewStartRelative, callback) {
	requestAnimationFrame(() => {
		requestAnimationFrame(() => {
			callback(elapsed(viewStartRelative, relativeNow()));
		});
	});
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-rum-core@6.33.0/node_modules/@datadog/browser-rum-core/esm/domain/view/viewMetrics/trackFirstInput.js
/**
* Track the first input occurring during the initial View to return:
* - First Input Delay
* - First Input Time
* Callback is called at most one time.
* Documentation: https://web.dev/fid/
* Reference implementation: https://github.com/GoogleChrome/web-vitals/blob/master/src/getFID.ts
*/
function trackFirstInput(configuration, firstHidden, callback) {
	const performanceFirstInputSubscription = createPerformanceObservable(configuration, {
		type: RumPerformanceEntryType.FIRST_INPUT,
		buffered: true
	}).subscribe((entries) => {
		const firstInputEntry = entries.find((entry) => entry.startTime < firstHidden.timeStamp);
		if (firstInputEntry) {
			const firstInputDelay = elapsed(firstInputEntry.startTime, firstInputEntry.processingStart);
			let firstInputTargetSelector;
			if (firstInputEntry.target && isElementNode(firstInputEntry.target)) firstInputTargetSelector = getSelectorFromElement(firstInputEntry.target, configuration.actionNameAttribute);
			callback({
				delay: firstInputDelay >= 0 ? firstInputDelay : 0,
				time: firstInputEntry.startTime,
				targetSelector: firstInputTargetSelector
			});
		}
	});
	return { stop: () => {
		performanceFirstInputSubscription.unsubscribe();
	} };
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-rum-core@6.33.0/node_modules/@datadog/browser-rum-core/esm/domain/view/viewMetrics/trackNavigationTimings.js
function trackNavigationTimings(configuration, callback) {
	return waitAfterLoadEvent(configuration, () => {
		const entry = mockable(getNavigationEntry)();
		if (!isIncompleteNavigation(entry)) callback(processNavigationEntry(entry));
	});
}
function processNavigationEntry(entry) {
	return {
		domComplete: entry.domComplete,
		domContentLoaded: entry.domContentLoadedEventEnd,
		domInteractive: entry.domInteractive,
		loadEvent: entry.loadEventEnd,
		firstByte: sanitizeFirstByte(entry)
	};
}
function isIncompleteNavigation(entry) {
	return entry.loadEventEnd <= 0;
}
function waitAfterLoadEvent(configuration, callback) {
	let timeoutId;
	const { stop: stopOnReadyState } = runOnReadyState(configuration, "complete", () => {
		timeoutId = setTimeout(() => callback());
	});
	return { stop: () => {
		stopOnReadyState();
		clearTimeout(timeoutId);
	} };
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-rum-core@6.33.0/node_modules/@datadog/browser-rum-core/esm/domain/view/viewMetrics/trackLargestContentfulPaint.js
var LCP_MAXIMUM_DELAY = 10 * ONE_MINUTE;
/**
* Track the largest contentful paint (LCP) occurring during the initial View.  This can yield
* multiple values, only the most recent one should be used.
* Documentation: https://web.dev/lcp/
* Reference implementation: https://github.com/GoogleChrome/web-vitals/blob/master/src/onLCP.ts
*/
function trackLargestContentfulPaint(configuration, firstHidden, eventTarget, callback) {
	let firstInteractionTimestamp = Infinity;
	const { stop: stopEventListener } = addEventListeners(configuration, eventTarget, ["pointerdown", "keydown"], (event) => {
		firstInteractionTimestamp = event.timeStamp;
	}, {
		capture: true,
		once: true
	});
	let biggestLcpSize = 0;
	const performanceLcpSubscription = createPerformanceObservable(configuration, {
		type: RumPerformanceEntryType.LARGEST_CONTENTFUL_PAINT,
		buffered: true
	}).subscribe((entries) => {
		const lcpEntry = findLast(entries, (entry) => entry.entryType === RumPerformanceEntryType.LARGEST_CONTENTFUL_PAINT && entry.startTime < firstInteractionTimestamp && entry.startTime < firstHidden.timeStamp && entry.startTime < LCP_MAXIMUM_DELAY && entry.size > biggestLcpSize);
		if (lcpEntry) {
			let lcpTargetSelector;
			if (lcpEntry.element) lcpTargetSelector = getSelectorFromElement(lcpEntry.element, configuration.actionNameAttribute);
			const resourceUrl = computeLcpEntryUrl(lcpEntry);
			const lcpValue = lcpEntry.startTime;
			const subParts = computeLcpSubParts(resourceUrl, lcpValue);
			callback({
				value: lcpValue,
				targetSelector: lcpTargetSelector,
				resourceUrl,
				subParts
			});
			biggestLcpSize = lcpEntry.size;
		}
	});
	return { stop: () => {
		stopEventListener();
		performanceLcpSubscription.unsubscribe();
	} };
}
function computeLcpEntryUrl(entry) {
	return entry.url === "" ? void 0 : entry.url;
}
/**
* Compute the LCP sub-parts breakdown (loadDelay, loadTime, renderDelay).
* Returns undefined if navigation timing data or TTFB is unavailable.
*/
function computeLcpSubParts(resourceUrl, lcpValue) {
	const firstByte = sanitizeFirstByte(getNavigationEntry());
	if (firstByte === void 0) return;
	const lcpResourceEntry = resourceUrl ? findLcpResourceEntry(resourceUrl, lcpValue) : void 0;
	const lcpRequestStart = lcpResourceEntry ? Math.max(firstByte, lcpResourceEntry.requestStart || lcpResourceEntry.startTime) : firstByte;
	const lcpResponseEnd = Math.min(lcpValue, Math.max(lcpRequestStart, (lcpResourceEntry === null || lcpResourceEntry === void 0 ? void 0 : lcpResourceEntry.responseEnd) || 0));
	return {
		loadDelay: lcpRequestStart - firstByte,
		loadTime: lcpResponseEnd - lcpRequestStart,
		renderDelay: lcpValue - lcpResponseEnd
	};
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-rum-core@6.33.0/node_modules/@datadog/browser-rum-core/esm/domain/view/viewMetrics/trackFirstHidden.js
function trackFirstHidden(configuration, viewStart, eventTarget = window) {
	if (document.visibilityState === "hidden") return {
		timeStamp: 0,
		stop: noop
	};
	if (supportPerformanceTimingEvent(RumPerformanceEntryType.VISIBILITY_STATE)) {
		const firstHiddenEntry = performance.getEntriesByType(RumPerformanceEntryType.VISIBILITY_STATE).filter((entry) => entry.name === "hidden").find((entry) => entry.startTime >= viewStart.relative);
		if (firstHiddenEntry) return {
			timeStamp: firstHiddenEntry.startTime,
			stop: noop
		};
	}
	let timeStamp = Infinity;
	const { stop } = addEventListeners(configuration, eventTarget, ["pagehide", "visibilitychange"], (event) => {
		if (event.type === "pagehide" || document.visibilityState === "hidden") {
			timeStamp = event.timeStamp;
			stop();
		}
	}, { capture: true });
	return {
		get timeStamp() {
			return timeStamp;
		},
		stop
	};
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-rum-core@6.33.0/node_modules/@datadog/browser-rum-core/esm/domain/view/viewMetrics/trackInitialViewMetrics.js
function trackInitialViewMetrics(configuration, viewStart, setLoadEvent, scheduleViewUpdate) {
	const initialViewMetrics = {};
	const { stop: stopNavigationTracking } = trackNavigationTimings(configuration, (navigationTimings) => {
		setLoadEvent(navigationTimings.loadEvent);
		initialViewMetrics.navigationTimings = navigationTimings;
		scheduleViewUpdate();
	});
	const firstHidden = trackFirstHidden(configuration, viewStart);
	const { stop: stopFCPTracking } = trackFirstContentfulPaint(configuration, firstHidden, (firstContentfulPaint) => {
		initialViewMetrics.firstContentfulPaint = firstContentfulPaint;
		scheduleViewUpdate();
	});
	const { stop: stopLCPTracking } = trackLargestContentfulPaint(configuration, firstHidden, window, (largestContentfulPaint) => {
		initialViewMetrics.largestContentfulPaint = largestContentfulPaint;
		scheduleViewUpdate();
	});
	const { stop: stopFIDTracking } = trackFirstInput(configuration, firstHidden, (firstInput) => {
		initialViewMetrics.firstInput = firstInput;
		scheduleViewUpdate();
	});
	function stop() {
		stopNavigationTracking();
		stopFCPTracking();
		stopLCPTracking();
		stopFIDTracking();
		firstHidden.stop();
	}
	return {
		stop,
		initialViewMetrics
	};
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-rum-core@6.33.0/node_modules/@datadog/browser-rum-core/esm/domain/view/viewMetrics/getClsAttributionImpactedArea.js
/**
* Calculates the area of a rectangle given its width and height
*/
var calculateArea = (width, height) => width * height;
/**
* Calculates the intersection area between two rectangles
*/
var calculateIntersectionArea = (rect1, rect2) => {
	const left = Math.max(rect1.left, rect2.left);
	const top = Math.max(rect1.top, rect2.top);
	const right = Math.min(rect1.right, rect2.right);
	const bottom = Math.min(rect1.bottom, rect2.bottom);
	if (left >= right || top >= bottom) return 0;
	return calculateArea(right - left, bottom - top);
};
/**
* Calculates the total impacted area of a layout shift source
* This is the sum of the previous and current areas minus their intersection
*/
var getClsAttributionImpactedArea = (source) => {
	const previousArea = calculateArea(source.previousRect.width, source.previousRect.height);
	const currentArea = calculateArea(source.currentRect.width, source.currentRect.height);
	const intersectionArea = calculateIntersectionArea(source.previousRect, source.currentRect);
	return previousArea + currentArea - intersectionArea;
};
//#endregion
//#region node_modules/.pnpm/@datadog+browser-rum-core@6.33.0/node_modules/@datadog/browser-rum-core/esm/domain/view/viewMetrics/trackCumulativeLayoutShift.js
/**
* Track the cumulative layout shifts (CLS).
* Layout shifts are grouped into session windows.
* The minimum gap between session windows is 1 second.
* The maximum duration of a session window is 5 second.
* The session window layout shift value is the sum of layout shifts inside it.
* The CLS value is the max of session windows values.
*
* This yields a new value whenever the CLS value is updated (a higher session window value is computed).
*
* See isLayoutShiftSupported to check for browser support.
*
* Documentation:
* https://web.dev/cls/
* https://web.dev/evolving-cls/
* Reference implementation: https://github.com/GoogleChrome/web-vitals/blob/master/src/getCLS.ts
*/
function trackCumulativeLayoutShift(configuration, viewStart, callback) {
	if (!isLayoutShiftSupported()) return { stop: noop };
	let maxClsValue = 0;
	let biggestShift;
	callback({ value: 0 });
	const slidingWindow = slidingSessionWindow();
	const performanceSubscription = createPerformanceObservable(configuration, {
		type: RumPerformanceEntryType.LAYOUT_SHIFT,
		buffered: true
	}).subscribe((entries) => {
		var _a;
		for (const entry of entries) {
			if (entry.hadRecentInput || entry.startTime < viewStart) continue;
			const { cumulatedValue, isMaxValue } = slidingWindow.update(entry);
			if (isMaxValue) {
				const attribution = getTopImpactedElement(entry.sources);
				biggestShift = {
					target: (attribution === null || attribution === void 0 ? void 0 : attribution.node) ? new WeakRef(attribution.node) : void 0,
					time: elapsed(viewStart, entry.startTime),
					previousRect: attribution === null || attribution === void 0 ? void 0 : attribution.previousRect,
					currentRect: attribution === null || attribution === void 0 ? void 0 : attribution.currentRect,
					devicePixelRatio: window.devicePixelRatio
				};
			}
			if (cumulatedValue > maxClsValue) {
				maxClsValue = cumulatedValue;
				const target = (_a = biggestShift === null || biggestShift === void 0 ? void 0 : biggestShift.target) === null || _a === void 0 ? void 0 : _a.deref();
				callback({
					value: round(maxClsValue, 4),
					targetSelector: target && getSelectorFromElement(target, configuration.actionNameAttribute),
					time: biggestShift === null || biggestShift === void 0 ? void 0 : biggestShift.time,
					previousRect: (biggestShift === null || biggestShift === void 0 ? void 0 : biggestShift.previousRect) ? asRumRect(biggestShift.previousRect) : void 0,
					currentRect: (biggestShift === null || biggestShift === void 0 ? void 0 : biggestShift.currentRect) ? asRumRect(biggestShift.currentRect) : void 0,
					devicePixelRatio: biggestShift === null || biggestShift === void 0 ? void 0 : biggestShift.devicePixelRatio
				});
			}
		}
	});
	return { stop: () => {
		performanceSubscription.unsubscribe();
	} };
}
function getTopImpactedElement(sources) {
	let topImpactedSource;
	for (const source of sources) if (source.node && isElementNode(source.node)) {
		const currentImpactedArea = getClsAttributionImpactedArea(source);
		if (!topImpactedSource || getClsAttributionImpactedArea(topImpactedSource) < currentImpactedArea) topImpactedSource = source;
	}
	return topImpactedSource;
}
function asRumRect({ x, y, width, height }) {
	return {
		x,
		y,
		width,
		height
	};
}
var MAX_WINDOW_DURATION = 5 * ONE_SECOND;
var MAX_UPDATE_GAP = ONE_SECOND;
function slidingSessionWindow() {
	let cumulatedValue = 0;
	let startTime;
	let endTime;
	let maxValue = 0;
	return { update: (entry) => {
		const shouldCreateNewWindow = startTime === void 0 || entry.startTime - endTime >= MAX_UPDATE_GAP || entry.startTime - startTime >= MAX_WINDOW_DURATION;
		let isMaxValue;
		if (shouldCreateNewWindow) {
			startTime = endTime = entry.startTime;
			maxValue = cumulatedValue = entry.value;
			isMaxValue = true;
		} else {
			cumulatedValue += entry.value;
			endTime = entry.startTime;
			isMaxValue = entry.value > maxValue;
			if (isMaxValue) maxValue = entry.value;
		}
		return {
			cumulatedValue,
			isMaxValue
		};
	} };
}
/**
* Check whether `layout-shift` is supported by the browser.
*/
function isLayoutShiftSupported() {
	return supportPerformanceTimingEvent(RumPerformanceEntryType.LAYOUT_SHIFT) && "WeakRef" in window;
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-rum-core@6.33.0/node_modules/@datadog/browser-rum-core/esm/domain/view/viewMetrics/interactionCountPolyfill.js
/**
* performance.interactionCount polyfill
*
* The interactionCount is an integer which counts the total number of distinct user interactions,
* for which there was a unique interactionId.
*
* The interactionCount polyfill is an estimate based on a convention specific to Chrome. Cf: https://github.com/GoogleChrome/web-vitals/pull/213
* This is currently not an issue as the polyfill is only used for INP which is currently only supported on Chrome.
* Hopefully when/if other browsers will support INP, they will also implement performance.interactionCount at the same time, so we won't need that polyfill.
*
* Reference implementation: https://github.com/GoogleChrome/web-vitals/blob/main/src/lib/polyfills/interactionCountPolyfill.ts
*/
var observer;
var interactionCountEstimate = 0;
var minKnownInteractionId = Infinity;
var maxKnownInteractionId = 0;
function initInteractionCountPolyfill() {
	if ("interactionCount" in performance || observer) return;
	observer = new window.PerformanceObserver(monitor((entries) => {
		entries.getEntries().forEach((e) => {
			const entry = e;
			if (entry.interactionId) {
				minKnownInteractionId = Math.min(minKnownInteractionId, entry.interactionId);
				maxKnownInteractionId = Math.max(maxKnownInteractionId, entry.interactionId);
				interactionCountEstimate = (maxKnownInteractionId - minKnownInteractionId) / 7 + 1;
			}
		});
	}));
	observer.observe({
		type: "event",
		buffered: true,
		durationThreshold: 0
	});
}
/**
* Returns the `interactionCount` value using the native API (if available)
* or the polyfill estimate in this module.
*/
var getInteractionCount = () => observer ? interactionCountEstimate : window.performance.interactionCount || 0;
//#endregion
//#region node_modules/.pnpm/@datadog+browser-rum-core@6.33.0/node_modules/@datadog/browser-rum-core/esm/domain/view/viewMetrics/trackInteractionToNextPaint.js
var MAX_INTERACTION_ENTRIES = 10;
var MAX_INP_VALUE = 1 * ONE_MINUTE;
var RENDER_TIME_GROUPING_THRESHOLD = 8;
/**
* Track the interaction to next paint (INP).
* To avoid outliers, return the p98 worst interaction of the view.
* Documentation: https://web.dev/inp/
* Reference implementation: https://github.com/GoogleChrome/web-vitals/blob/main/src/onINP.ts
*/
function trackInteractionToNextPaint(configuration, viewStart, viewLoadingType) {
	if (!isInteractionToNextPaintSupported()) return {
		getInteractionToNextPaint: () => void 0,
		setViewEnd: noop,
		stop: noop
	};
	let viewEnd = Infinity;
	let currentInp;
	const { getViewInteractionCount, stopViewInteractionCount } = trackViewInteractionCount(viewLoadingType);
	const longestInteractions = trackLongestInteractions(getViewInteractionCount);
	const subPartsTracker = createSubPartsTracker(longestInteractions);
	const firstInputSubscription = createPerformanceObservable(configuration, {
		type: RumPerformanceEntryType.FIRST_INPUT,
		buffered: true
	}).subscribe(handleEntries);
	const eventSubscription = createPerformanceObservable(configuration, {
		type: RumPerformanceEntryType.EVENT,
		durationThreshold: 40,
		buffered: true
	}).subscribe(handleEntries);
	function handleEntries(entries) {
		for (const entry of entries) if (entry.interactionId && entry.startTime >= viewStart && entry.startTime <= viewEnd) {
			longestInteractions.process(entry);
			subPartsTracker.process(entry);
		}
		subPartsTracker.pruneUntracked();
		const candidate = longestInteractions.estimateP98Interaction();
		if (candidate) updateCurrentInp(candidate);
	}
	function updateCurrentInp(candidate) {
		const newStartTime = elapsed(viewStart, candidate.startTime);
		if (!currentInp || candidate.duration !== currentInp.duration || newStartTime !== currentInp.startTime) {
			let targetSelector = getInteractionSelector(candidate.startTime);
			if (!targetSelector && candidate.target && isElementNode(candidate.target)) targetSelector = getSelectorFromElement(candidate.target, configuration.actionNameAttribute);
			currentInp = {
				duration: candidate.duration,
				startTime: newStartTime,
				targetSelector
			};
		}
		currentInp.subParts = subPartsTracker.computeSubParts(candidate, sanitizeInpValue(currentInp.duration));
	}
	return {
		getInteractionToNextPaint: () => {
			if (currentInp) return {
				value: sanitizeInpValue(currentInp.duration),
				targetSelector: currentInp.targetSelector,
				time: currentInp.startTime,
				subParts: currentInp.subParts
			};
			else if (getViewInteractionCount()) return { value: 0 };
		},
		setViewEnd: (viewEndTime) => {
			viewEnd = viewEndTime;
			stopViewInteractionCount();
		},
		stop: () => {
			eventSubscription.unsubscribe();
			firstInputSubscription.unsubscribe();
			subPartsTracker.stop();
		}
	};
}
/**
* Maintains a bounded list of the slowest interactions seen so far, used to estimate the p98
* interaction duration without keeping every entry in memory.
*/
function trackLongestInteractions(getViewInteractionCount) {
	const longestInteractions = [];
	function sortAndTrimLongestInteractions() {
		longestInteractions.sort((a, b) => b.duration - a.duration).splice(MAX_INTERACTION_ENTRIES);
	}
	return {
		/**
		* Process the performance entry:
		* - if its duration is long enough, add the performance entry to the list of worst interactions
		* - if an entry with the same interaction id exists and its duration is lower than the new one, then replace it in the list of worst interactions
		*/
		process(entry) {
			const interactionIndex = longestInteractions.findIndex((interaction) => entry.interactionId === interaction.interactionId);
			const minLongestInteraction = longestInteractions[longestInteractions.length - 1];
			if (interactionIndex !== -1) {
				if (entry.duration > longestInteractions[interactionIndex].duration) {
					longestInteractions[interactionIndex] = entry;
					sortAndTrimLongestInteractions();
				}
			} else if (longestInteractions.length < MAX_INTERACTION_ENTRIES || entry.duration > minLongestInteraction.duration) {
				longestInteractions.push(entry);
				sortAndTrimLongestInteractions();
			}
		},
		/**
		* Compute the p98 longest interaction.
		* For better performance the computation is based on 10 longest interactions and the interaction count of the current view.
		*/
		estimateP98Interaction() {
			const interactionIndex = Math.min(longestInteractions.length - 1, Math.floor(getViewInteractionCount() / 50));
			return longestInteractions[interactionIndex];
		},
		isTracked(interactionId) {
			return longestInteractions.some((i) => i.interactionId === interactionId);
		}
	};
}
/**
* Tracks the number of interactions that occurred during the current view. Freezes the count
* when the view ends so that the p98 estimate remains stable after `setViewEnd` is called.
*/
function trackViewInteractionCount(viewLoadingType) {
	initInteractionCountPolyfill();
	const previousInteractionCount = viewLoadingType === ViewLoadingType.INITIAL_LOAD ? 0 : getInteractionCount();
	let state = { stopped: false };
	function computeViewInteractionCount() {
		return getInteractionCount() - previousInteractionCount;
	}
	return {
		getViewInteractionCount: () => {
			if (state.stopped) return state.interactionCount;
			return computeViewInteractionCount();
		},
		stopViewInteractionCount: () => {
			state = {
				stopped: true,
				interactionCount: computeViewInteractionCount()
			};
		}
	};
}
/**
* Groups performance entries by interaction and render time to compute INP subparts
* (input delay, processing duration, presentation delay). Entries sharing the same
* interactionId, or whose render time falls within the 8 ms Event Timing rounding window,
* are merged into a single group so that subparts always sum to the reported INP duration.
*/
function createSubPartsTracker(longestInteractions) {
	const groupsByInteractionId = /* @__PURE__ */ new Map();
	function updateGroupWithEntry(group, entry) {
		group.startTime = Math.min(entry.startTime, group.startTime);
		group.processingStart = Math.min(entry.processingStart, group.processingStart);
		group.processingEnd = Math.max(entry.processingEnd, group.processingEnd);
	}
	return {
		process(entry) {
			if (entry.interactionId === void 0 || !entry.processingStart || !entry.processingEnd) return;
			const renderTime = entry.startTime + entry.duration;
			const existingGroup = groupsByInteractionId.get(entry.interactionId);
			if (existingGroup) {
				updateGroupWithEntry(existingGroup, entry);
				return;
			}
			for (const [, group] of groupsByInteractionId.entries()) if (Math.abs(renderTime - group.referenceRenderTime) <= RENDER_TIME_GROUPING_THRESHOLD) {
				updateGroupWithEntry(group, entry);
				groupsByInteractionId.set(entry.interactionId, group);
				return;
			}
			groupsByInteractionId.set(entry.interactionId, {
				startTime: entry.startTime,
				processingStart: entry.processingStart,
				processingEnd: entry.processingEnd,
				referenceRenderTime: renderTime
			});
		},
		pruneUntracked() {
			for (const [interactionId] of groupsByInteractionId) if (!longestInteractions.isTracked(interactionId)) groupsByInteractionId.delete(interactionId);
		},
		computeSubParts(entry, inpDuration) {
			if (!entry.processingStart || !entry.processingEnd || entry.interactionId === void 0) return;
			const group = groupsByInteractionId.get(entry.interactionId);
			if (!group) return;
			const nextPaintTime = Math.max(group.startTime + inpDuration, group.processingStart);
			const processingEnd = Math.min(group.processingEnd, nextPaintTime);
			return {
				inputDelay: elapsed(group.startTime, group.processingStart),
				processingDuration: elapsed(group.processingStart, processingEnd),
				presentationDelay: elapsed(processingEnd, nextPaintTime)
			};
		},
		stop() {
			groupsByInteractionId.clear();
		}
	};
}
function isInteractionToNextPaintSupported() {
	return supportPerformanceTimingEvent(RumPerformanceEntryType.EVENT) && window.PerformanceEventTiming && "interactionId" in PerformanceEventTiming.prototype;
}
function sanitizeInpValue(inpValue) {
	return Math.min(inpValue, MAX_INP_VALUE);
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-rum-core@6.33.0/node_modules/@datadog/browser-rum-core/esm/domain/view/viewMetrics/trackLoadingTime.js
/**
* For non-initial views (such as route changes or BFCache restores), the regular load event does not fire
* In these cases, trackLoadingTime can only emit a loadingTime  if waitPageActivityEnd detects some post-restore activity.
* If nothing happens after the view starts,no candidate is recorded and loadingTime stays undefined.
*/
function trackLoadingTime(lifeCycle, domMutationObservable, windowOpenObservable, configuration, loadType, viewStart, callback) {
	let isWaitingForLoadEvent = loadType === ViewLoadingType.INITIAL_LOAD;
	let isWaitingForActivityLoadingTime = true;
	const loadingTimeCandidates = [];
	const firstHidden = trackFirstHidden(configuration, viewStart);
	function invokeCallbackIfAllCandidatesAreReceived() {
		if (!isWaitingForActivityLoadingTime && !isWaitingForLoadEvent && loadingTimeCandidates.length > 0) {
			const loadingTime = Math.max(...loadingTimeCandidates);
			if (loadingTime < firstHidden.timeStamp - viewStart.relative) callback(loadingTime);
		}
	}
	const { stop } = waitPageActivityEnd(lifeCycle, domMutationObservable, windowOpenObservable, configuration, (event) => {
		if (isWaitingForActivityLoadingTime) {
			isWaitingForActivityLoadingTime = false;
			if (event.hadActivity) loadingTimeCandidates.push(elapsed(viewStart.timeStamp, event.end));
			invokeCallbackIfAllCandidatesAreReceived();
		}
	});
	return {
		stop: () => {
			stop();
			firstHidden.stop();
		},
		setLoadEvent: (loadEvent) => {
			if (isWaitingForLoadEvent) {
				isWaitingForLoadEvent = false;
				loadingTimeCandidates.push(loadEvent);
				invokeCallbackIfAllCandidatesAreReceived();
			}
		}
	};
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-rum-core@6.33.0/node_modules/@datadog/browser-rum-core/esm/browser/scroll.js
function getScrollX() {
	let scrollX;
	const visual = window.visualViewport;
	if (visual) scrollX = visual.pageLeft - visual.offsetLeft;
	else if (window.scrollX !== void 0) scrollX = window.scrollX;
	else scrollX = window.pageXOffset || 0;
	return Math.round(scrollX);
}
function getScrollY() {
	let scrollY;
	const visual = window.visualViewport;
	if (visual) scrollY = visual.pageTop - visual.offsetTop;
	else if (window.scrollY !== void 0) scrollY = window.scrollY;
	else scrollY = window.pageYOffset || 0;
	return Math.round(scrollY);
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-rum-core@6.33.0/node_modules/@datadog/browser-rum-core/esm/browser/viewportObservable.js
var viewportObservable;
function initViewportObservable(configuration) {
	if (!viewportObservable) viewportObservable = createViewportObservable(configuration);
	return viewportObservable;
}
function createViewportObservable(configuration) {
	return new Observable((observable) => {
		const { throttled: updateDimension } = throttle(() => {
			observable.notify(getViewportDimension());
		}, 200);
		return addEventListener(configuration, window, "resize", updateDimension, {
			capture: true,
			passive: true
		}).stop;
	});
}
function getViewportDimension() {
	const visual = window.visualViewport;
	if (visual) return {
		width: Number(visual.width * visual.scale),
		height: Number(visual.height * visual.scale)
	};
	return {
		width: Number(window.innerWidth || 0),
		height: Number(window.innerHeight || 0)
	};
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-rum-core@6.33.0/node_modules/@datadog/browser-rum-core/esm/domain/view/viewMetrics/trackScrollMetrics.js
/** Arbitrary scroll throttle duration */
var THROTTLE_SCROLL_DURATION = ONE_SECOND;
function trackScrollMetrics(configuration, viewStart, callback, scrollValues = createScrollValuesObservable(configuration)) {
	let maxScrollDepth = 0;
	let maxScrollHeight = 0;
	let maxScrollHeightTime = 0;
	const subscription = scrollValues.subscribe(({ scrollDepth, scrollTop, scrollHeight }) => {
		let shouldUpdate = false;
		if (scrollDepth > maxScrollDepth) {
			maxScrollDepth = scrollDepth;
			shouldUpdate = true;
		}
		if (scrollHeight > maxScrollHeight) {
			maxScrollHeight = scrollHeight;
			const now = relativeNow();
			maxScrollHeightTime = elapsed(viewStart.relative, now);
			shouldUpdate = true;
		}
		if (shouldUpdate) callback({
			maxDepth: Math.min(maxScrollDepth, maxScrollHeight),
			maxDepthScrollTop: scrollTop,
			maxScrollHeight,
			maxScrollHeightTime
		});
	});
	return { stop: () => subscription.unsubscribe() };
}
function computeScrollValues() {
	const scrollTop = getScrollY();
	const { height } = getViewportDimension();
	return {
		scrollHeight: Math.round((document.scrollingElement || document.documentElement).scrollHeight),
		scrollDepth: Math.round(height + scrollTop),
		scrollTop
	};
}
function createScrollValuesObservable(configuration, throttleDuration = THROTTLE_SCROLL_DURATION) {
	return new Observable((observable) => {
		function notify() {
			observable.notify(computeScrollValues());
		}
		if (window.ResizeObserver) {
			const throttledNotify = throttle(notify, throttleDuration, {
				leading: false,
				trailing: true
			});
			const observerTarget = document.scrollingElement || document.documentElement;
			const resizeObserver = new ResizeObserver(monitor(throttledNotify.throttled));
			if (observerTarget) resizeObserver.observe(observerTarget);
			const eventListener = addEventListener(configuration, window, "scroll", throttledNotify.throttled, { passive: true });
			return () => {
				throttledNotify.cancel();
				resizeObserver.disconnect();
				eventListener.stop();
			};
		}
	});
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-rum-core@6.33.0/node_modules/@datadog/browser-rum-core/esm/domain/view/viewMetrics/trackCommonViewMetrics.js
function trackCommonViewMetrics(lifeCycle, domMutationObservable, windowOpenObservable, configuration, scheduleViewUpdate, loadingType, viewStart) {
	const commonViewMetrics = {};
	let hasManualLoadingTime = false;
	let viewEnded = false;
	const { stop: stopLoadingTimeTracking, setLoadEvent } = trackLoadingTime(lifeCycle, domMutationObservable, windowOpenObservable, configuration, loadingType, viewStart, (newLoadingTime) => {
		if (!hasManualLoadingTime) {
			commonViewMetrics.loadingTime = newLoadingTime;
			scheduleViewUpdate();
		}
	});
	const { stop: stopScrollMetricsTracking } = trackScrollMetrics(configuration, viewStart, (newScrollMetrics) => {
		commonViewMetrics.scroll = newScrollMetrics;
	});
	const { stop: stopCLSTracking } = trackCumulativeLayoutShift(configuration, viewStart.relative, (cumulativeLayoutShift) => {
		commonViewMetrics.cumulativeLayoutShift = cumulativeLayoutShift;
		scheduleViewUpdate();
	});
	const { stop: stopINPTracking, getInteractionToNextPaint, setViewEnd: setINPViewEnd } = trackInteractionToNextPaint(configuration, viewStart.relative, loadingType);
	return {
		stop: () => {
			stopLoadingTimeTracking();
			stopCLSTracking();
			stopScrollMetricsTracking();
		},
		stopINPTracking,
		setLoadEvent,
		setViewEnd: (viewEndTime) => {
			viewEnded = true;
			setINPViewEnd(viewEndTime);
		},
		getCommonViewMetrics: () => {
			commonViewMetrics.interactionToNextPaint = getInteractionToNextPaint();
			return commonViewMetrics;
		},
		setLoadingTime: (callTimestamp) => {
			if (viewEnded) return;
			const loadingTime = elapsed(viewStart.timeStamp, callTimestamp !== null && callTimestamp !== void 0 ? callTimestamp : timeStampNow());
			if (!hasManualLoadingTime) stopLoadingTimeTracking();
			hasManualLoadingTime = true;
			commonViewMetrics.loadingTime = loadingTime;
			scheduleViewUpdate();
		}
	};
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-rum-core@6.33.0/node_modules/@datadog/browser-rum-core/esm/domain/view/bfCacheSupport.js
function onBFCacheRestore(configuration, callback) {
	const { stop } = addEventListener(configuration, window, "pageshow", (event) => {
		if (event.persisted) callback(event);
	}, { capture: true });
	return stop;
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-rum-core@6.33.0/node_modules/@datadog/browser-rum-core/esm/domain/view/viewMetrics/trackBfcacheMetrics.js
/**
* BFCache keeps a full in-memory snapshot of the DOM. When the page is restored, nothing needs to be fetched, so the whole
* viewport repaints in a single frame. Consequently, LCP almost always equals FCP.
* (See: https://github.com/GoogleChrome/web-vitals/pull/87)
*/
function trackBfcacheMetrics(viewStart, metrics, scheduleViewUpdate) {
	trackRestoredFirstContentfulPaint(viewStart.relative, (paintTime) => {
		metrics.firstContentfulPaint = paintTime;
		metrics.largestContentfulPaint = { value: paintTime };
		scheduleViewUpdate();
	});
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-rum-core@6.33.0/node_modules/@datadog/browser-rum-core/esm/domain/view/trackViews.js
var THROTTLE_VIEW_UPDATE_PERIOD = 3e3;
var SESSION_KEEP_ALIVE_INTERVAL = 5 * ONE_MINUTE;
var KEEP_TRACKING_AFTER_VIEW_DELAY = 5 * ONE_MINUTE;
function trackViews(lifeCycle, domMutationObservable, windowOpenObservable, configuration, locationChangeObservable, areViewsTrackedAutomatically, initialViewOptions) {
	const activeViews = /* @__PURE__ */ new Set();
	let currentView = startNewView(ViewLoadingType.INITIAL_LOAD, clocksOrigin(), initialViewOptions);
	let stopOnBFCacheRestore;
	startViewLifeCycle();
	let locationChangeSubscription;
	if (areViewsTrackedAutomatically) {
		locationChangeSubscription = renewViewOnLocationChange(locationChangeObservable);
		if (configuration.trackBfcacheViews) stopOnBFCacheRestore = onBFCacheRestore(configuration, (pageshowEvent) => {
			currentView.end();
			const startClocks = relativeToClocks(pageshowEvent.timeStamp);
			currentView = startNewView(ViewLoadingType.BF_CACHE, startClocks, void 0);
		});
	}
	function startNewView(loadingType, startClocks, viewOptions) {
		const newlyCreatedView = newView(lifeCycle, domMutationObservable, windowOpenObservable, configuration, loadingType, startClocks, viewOptions);
		activeViews.add(newlyCreatedView);
		newlyCreatedView.stopObservable.subscribe(() => {
			activeViews.delete(newlyCreatedView);
		});
		return newlyCreatedView;
	}
	function startViewLifeCycle() {
		lifeCycle.subscribe(10, () => {
			currentView = startNewView(ViewLoadingType.ROUTE_CHANGE, void 0, {
				name: currentView.name,
				service: currentView.service,
				version: currentView.version,
				context: currentView.contextManager.getContext()
			});
		});
		lifeCycle.subscribe(9, () => {
			currentView.end({ sessionIsActive: false });
		});
	}
	function renewViewOnLocationChange(locationChangeObservable) {
		return locationChangeObservable.subscribe(({ oldLocation, newLocation }) => {
			if (areDifferentLocation(oldLocation, newLocation)) {
				currentView.end();
				currentView = startNewView(ViewLoadingType.ROUTE_CHANGE);
			}
		});
	}
	return {
		addTiming: (name, time = timeStampNow()) => {
			currentView.addTiming(name, time);
		},
		setLoadingTime: (callTimestamp) => currentView.setLoadingTime(callTimestamp),
		startView: (options, startClocks) => {
			currentView.end({ endClocks: startClocks });
			currentView = startNewView(ViewLoadingType.ROUTE_CHANGE, startClocks, options);
		},
		setViewContext: (context) => {
			currentView.contextManager.setContext(context);
		},
		setViewContextProperty: (key, value) => {
			currentView.contextManager.setContextProperty(key, value);
		},
		setViewName: (name) => {
			currentView.setViewName(name);
		},
		getViewContext: () => currentView.contextManager.getContext(),
		stop: () => {
			if (locationChangeSubscription) locationChangeSubscription.unsubscribe();
			if (stopOnBFCacheRestore) stopOnBFCacheRestore();
			currentView.end();
			activeViews.forEach((view) => view.stop());
		}
	};
}
function newView(lifeCycle, domMutationObservable, windowOpenObservable, configuration, loadingType, startClocks = clocksNow(), viewOptions) {
	const id = generateUUID();
	const stopObservable = new Observable();
	const customTimings = {};
	let documentVersion = 0;
	let endClocks;
	const location = shallowClone(mockable(window.location));
	const contextManager = createContextManager();
	let sessionIsActive = true;
	let name = viewOptions === null || viewOptions === void 0 ? void 0 : viewOptions.name;
	const service = (viewOptions === null || viewOptions === void 0 ? void 0 : viewOptions.service) || configuration.service;
	const version = (viewOptions === null || viewOptions === void 0 ? void 0 : viewOptions.version) || configuration.version;
	const context = viewOptions === null || viewOptions === void 0 ? void 0 : viewOptions.context;
	const handlingStack = viewOptions === null || viewOptions === void 0 ? void 0 : viewOptions.handlingStack;
	if (context) contextManager.setContext(context);
	const viewCreatedEvent = {
		id,
		name,
		startClocks,
		service,
		version,
		context,
		url: viewOptions === null || viewOptions === void 0 ? void 0 : viewOptions.url
	};
	lifeCycle.notify(1, viewCreatedEvent);
	lifeCycle.notify(2, viewCreatedEvent);
	const { throttled, cancel: cancelScheduleViewUpdate } = throttle(triggerViewUpdate, THROTTLE_VIEW_UPDATE_PERIOD, { leading: false });
	const { setLoadEvent, setViewEnd, stop: stopCommonViewMetricsTracking, stopINPTracking, getCommonViewMetrics, setLoadingTime } = trackCommonViewMetrics(lifeCycle, domMutationObservable, windowOpenObservable, configuration, scheduleViewUpdate, loadingType, startClocks);
	const { stop: stopInitialViewMetricsTracking, initialViewMetrics } = loadingType === ViewLoadingType.INITIAL_LOAD ? trackInitialViewMetrics(configuration, startClocks, setLoadEvent, scheduleViewUpdate) : {
		stop: noop,
		initialViewMetrics: {}
	};
	if (loadingType === ViewLoadingType.BF_CACHE) trackBfcacheMetrics(startClocks, initialViewMetrics, scheduleViewUpdate);
	const { stop: stopEventCountsTracking, eventCounts } = trackViewEventCounts(lifeCycle, id, scheduleViewUpdate);
	const keepAliveIntervalId = setInterval(triggerViewUpdate, SESSION_KEEP_ALIVE_INTERVAL);
	const pageMayExitSubscription = lifeCycle.subscribe(11, (pageMayExitEvent) => {
		if (pageMayExitEvent.reason === PageExitReason.UNLOADING) triggerViewUpdate();
	});
	triggerViewUpdate();
	contextManager.changeObservable.subscribe(scheduleViewUpdate);
	function triggerBeforeViewUpdate() {
		lifeCycle.notify(3, {
			id,
			name,
			context: contextManager.getContext(),
			startClocks,
			sessionIsActive
		});
	}
	function scheduleViewUpdate() {
		triggerBeforeViewUpdate();
		throttled();
	}
	function triggerViewUpdate() {
		cancelScheduleViewUpdate();
		triggerBeforeViewUpdate();
		documentVersion += 1;
		const currentEnd = endClocks === void 0 ? timeStampNow() : endClocks.timeStamp;
		lifeCycle.notify(4, {
			customTimings,
			documentVersion,
			id,
			name,
			service,
			version,
			context: contextManager.getContext(),
			loadingType,
			location,
			handlingStack,
			startClocks,
			commonViewMetrics: getCommonViewMetrics(),
			initialViewMetrics,
			duration: elapsed(startClocks.timeStamp, currentEnd),
			isActive: endClocks === void 0,
			sessionIsActive,
			eventCounts
		});
	}
	return {
		get name() {
			return name;
		},
		service,
		version,
		contextManager,
		stopObservable,
		end(options = {}) {
			var _a;
			var _b;
			if (endClocks) return;
			endClocks = (_a = options.endClocks) !== null && _a !== void 0 ? _a : clocksNow();
			sessionIsActive = (_b = options.sessionIsActive) !== null && _b !== void 0 ? _b : true;
			lifeCycle.notify(5, { endClocks });
			lifeCycle.notify(6, { endClocks });
			clearInterval(keepAliveIntervalId);
			setViewEnd(endClocks.relative);
			stopCommonViewMetricsTracking();
			pageMayExitSubscription.unsubscribe();
			triggerViewUpdate();
			setTimeout(() => {
				this.stop();
			}, KEEP_TRACKING_AFTER_VIEW_DELAY);
		},
		stop() {
			stopInitialViewMetricsTracking();
			stopEventCountsTracking();
			stopINPTracking();
			stopObservable.notify();
		},
		addTiming(name, time) {
			if (endClocks) return;
			const relativeTime = looksLikeRelativeTime(time) ? time : elapsed(startClocks.timeStamp, time);
			customTimings[sanitizeTiming(name)] = relativeTime;
			scheduleViewUpdate();
		},
		setLoadingTime,
		setViewName(updatedName) {
			name = updatedName;
			triggerViewUpdate();
		}
	};
}
/**
* Timing name is used as facet path that must contain only letters, digits, or the characters - _ . @ $
*/
function sanitizeTiming(name) {
	const sanitized = name.replace(/[^a-zA-Z0-9-_.@$]/g, "_");
	if (sanitized !== name) display.warn(`Invalid timing name: ${name}, sanitized to: ${sanitized}`);
	return sanitized;
}
function areDifferentLocation(currentLocation, otherLocation) {
	return currentLocation.pathname !== otherLocation.pathname || !isHashAnAnchor(otherLocation.hash) && getPathFromHash(otherLocation.hash) !== getPathFromHash(currentLocation.hash);
}
function isHashAnAnchor(hash) {
	const correspondingId = hash.substring(1);
	return correspondingId !== "" && !!document.getElementById(correspondingId);
}
function getPathFromHash(hash) {
	const index = hash.indexOf("?");
	return index < 0 ? hash : hash.slice(0, index);
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-rum-core@6.33.0/node_modules/@datadog/browser-rum-core/esm/domain/view/viewCollection.js
function startViewCollection(lifeCycle, hooks, configuration, domMutationObservable, pageOpenObservable, locationChangeObservable, recorderApi, viewHistory, initialViewOptions) {
	lifeCycle.subscribe(4, (view) => lifeCycle.notify(12, processViewUpdate(view, configuration, recorderApi)));
	hooks.register(0, ({ startTime, eventType }) => {
		const view = viewHistory.findView(startTime);
		if (!view) return DISCARDED;
		return {
			type: eventType,
			service: view.service,
			version: view.version,
			context: view.context,
			view: {
				id: view.id,
				name: view.name
			}
		};
	});
	hooks.register(1, ({ startTime }) => {
		var _a;
		return { view: { id: (_a = viewHistory.findView(startTime)) === null || _a === void 0 ? void 0 : _a.id } };
	});
	return trackViews(lifeCycle, domMutationObservable, pageOpenObservable, configuration, locationChangeObservable, !configuration.trackViewsManually, initialViewOptions);
}
function processViewUpdate(view, configuration, recorderApi) {
	var _a;
	var _b;
	var _c;
	var _d;
	var _e;
	var _f;
	var _g;
	var _h;
	var _j;
	var _k;
	var _l;
	var _m;
	var _o;
	var _p;
	var _q;
	var _r;
	var _s;
	var _t;
	const replayStats = recorderApi.getReplayStats(view.id);
	const clsDevicePixelRatio = (_b = (_a = view.commonViewMetrics) === null || _a === void 0 ? void 0 : _a.cumulativeLayoutShift) === null || _b === void 0 ? void 0 : _b.devicePixelRatio;
	const viewEvent = {
		_dd: {
			document_version: view.documentVersion,
			replay_stats: replayStats,
			cls: clsDevicePixelRatio ? { device_pixel_ratio: clsDevicePixelRatio } : void 0,
			configuration: { start_session_replay_recording_manually: configuration.startSessionReplayRecordingManually }
		},
		date: view.startClocks.timeStamp,
		type: RumEventType.VIEW,
		view: {
			action: { count: view.eventCounts.actionCount },
			frustration: { count: view.eventCounts.frustrationCount },
			cumulative_layout_shift: (_c = view.commonViewMetrics.cumulativeLayoutShift) === null || _c === void 0 ? void 0 : _c.value,
			cumulative_layout_shift_time: toServerDuration((_d = view.commonViewMetrics.cumulativeLayoutShift) === null || _d === void 0 ? void 0 : _d.time),
			cumulative_layout_shift_target_selector: (_e = view.commonViewMetrics.cumulativeLayoutShift) === null || _e === void 0 ? void 0 : _e.targetSelector,
			first_byte: toServerDuration((_f = view.initialViewMetrics.navigationTimings) === null || _f === void 0 ? void 0 : _f.firstByte),
			dom_complete: toServerDuration((_g = view.initialViewMetrics.navigationTimings) === null || _g === void 0 ? void 0 : _g.domComplete),
			dom_content_loaded: toServerDuration((_h = view.initialViewMetrics.navigationTimings) === null || _h === void 0 ? void 0 : _h.domContentLoaded),
			dom_interactive: toServerDuration((_j = view.initialViewMetrics.navigationTimings) === null || _j === void 0 ? void 0 : _j.domInteractive),
			error: { count: view.eventCounts.errorCount },
			first_contentful_paint: toServerDuration(view.initialViewMetrics.firstContentfulPaint),
			first_input_delay: toServerDuration((_k = view.initialViewMetrics.firstInput) === null || _k === void 0 ? void 0 : _k.delay),
			first_input_time: toServerDuration((_l = view.initialViewMetrics.firstInput) === null || _l === void 0 ? void 0 : _l.time),
			first_input_target_selector: (_m = view.initialViewMetrics.firstInput) === null || _m === void 0 ? void 0 : _m.targetSelector,
			interaction_to_next_paint: toServerDuration((_o = view.commonViewMetrics.interactionToNextPaint) === null || _o === void 0 ? void 0 : _o.value),
			interaction_to_next_paint_time: toServerDuration((_p = view.commonViewMetrics.interactionToNextPaint) === null || _p === void 0 ? void 0 : _p.time),
			interaction_to_next_paint_target_selector: (_q = view.commonViewMetrics.interactionToNextPaint) === null || _q === void 0 ? void 0 : _q.targetSelector,
			is_active: view.isActive,
			name: view.name,
			largest_contentful_paint: toServerDuration((_r = view.initialViewMetrics.largestContentfulPaint) === null || _r === void 0 ? void 0 : _r.value),
			largest_contentful_paint_target_selector: (_s = view.initialViewMetrics.largestContentfulPaint) === null || _s === void 0 ? void 0 : _s.targetSelector,
			load_event: toServerDuration((_t = view.initialViewMetrics.navigationTimings) === null || _t === void 0 ? void 0 : _t.loadEvent),
			loading_time: discardNegativeDuration(toServerDuration(view.commonViewMetrics.loadingTime)),
			loading_type: view.loadingType,
			long_task: { count: view.eventCounts.longTaskCount },
			performance: computeViewPerformanceData(view.commonViewMetrics, view.initialViewMetrics),
			resource: { count: view.eventCounts.resourceCount },
			time_spent: toServerDuration(view.duration)
		},
		display: view.commonViewMetrics.scroll ? { scroll: {
			max_depth: view.commonViewMetrics.scroll.maxDepth,
			max_depth_scroll_top: view.commonViewMetrics.scroll.maxDepthScrollTop,
			max_scroll_height: view.commonViewMetrics.scroll.maxScrollHeight,
			max_scroll_height_time: toServerDuration(view.commonViewMetrics.scroll.maxScrollHeightTime)
		} } : void 0,
		privacy: { replay_level: configuration.defaultPrivacyLevel },
		device: {
			locale: navigator.language,
			locales: navigator.languages,
			time_zone: getTimeZone()
		}
	};
	if (!isEmptyObject(view.customTimings)) viewEvent.view.custom_timings = mapValues(view.customTimings, toServerDuration);
	return {
		rawRumEvent: viewEvent,
		startClocks: view.startClocks,
		duration: view.duration,
		domainContext: {
			location: view.location,
			handlingStack: view.handlingStack
		}
	};
}
function computeViewPerformanceData({ cumulativeLayoutShift, interactionToNextPaint }, { firstContentfulPaint, firstInput, largestContentfulPaint }) {
	return {
		cls: cumulativeLayoutShift && {
			score: cumulativeLayoutShift.value,
			timestamp: toServerDuration(cumulativeLayoutShift.time),
			target_selector: cumulativeLayoutShift.targetSelector,
			previous_rect: cumulativeLayoutShift.previousRect,
			current_rect: cumulativeLayoutShift.currentRect
		},
		fcp: firstContentfulPaint && { timestamp: toServerDuration(firstContentfulPaint) },
		fid: firstInput && {
			duration: toServerDuration(firstInput.delay),
			timestamp: toServerDuration(firstInput.time),
			target_selector: firstInput.targetSelector
		},
		inp: interactionToNextPaint && {
			duration: toServerDuration(interactionToNextPaint.value),
			timestamp: toServerDuration(interactionToNextPaint.time),
			target_selector: interactionToNextPaint.targetSelector,
			sub_parts: interactionToNextPaint.subParts ? {
				input_delay: toServerDuration(interactionToNextPaint.subParts.inputDelay),
				processing_duration: toServerDuration(interactionToNextPaint.subParts.processingDuration),
				presentation_delay: toServerDuration(interactionToNextPaint.subParts.presentationDelay)
			} : void 0
		},
		lcp: largestContentfulPaint && {
			timestamp: toServerDuration(largestContentfulPaint.value),
			target_selector: largestContentfulPaint.targetSelector,
			resource_url: largestContentfulPaint.resourceUrl,
			sub_parts: largestContentfulPaint.subParts ? {
				load_delay: toServerDuration(largestContentfulPaint.subParts.loadDelay),
				load_time: toServerDuration(largestContentfulPaint.subParts.loadTime),
				render_delay: toServerDuration(largestContentfulPaint.subParts.renderDelay)
			} : void 0
		}
	};
}
function startRumSessionManager(configuration, lifeCycle, trackingConsentState) {
	const sessionManager = startSessionManager(configuration, "rum", (rawTrackingType) => computeTrackingType(configuration, rawTrackingType), trackingConsentState);
	sessionManager.expireObservable.subscribe(() => {
		lifeCycle.notify(9);
	});
	sessionManager.renewObservable.subscribe(() => {
		lifeCycle.notify(10);
	});
	sessionManager.sessionStateUpdateObservable.subscribe(({ previousState, newState }) => {
		if (!previousState.forcedReplay && newState.forcedReplay) {
			const sessionEntity = sessionManager.findSession();
			if (sessionEntity) sessionEntity.isReplayForced = true;
		}
	});
	return {
		findTrackedSession: (startTime) => {
			const session = sessionManager.findSession(startTime);
			if (!session || session.trackingType === "0") return;
			return {
				id: session.id,
				sessionReplay: session.trackingType === "1" ? 1 : session.isReplayForced ? 2 : 0,
				anonymousId: session.anonymousId
			};
		},
		expire: sessionManager.expire,
		expireObservable: sessionManager.expireObservable,
		setForcedReplay: () => sessionManager.updateSessionState({ forcedReplay: "1" })
	};
}
/**
* Start a tracked replay session stub
*/
function startRumSessionManagerStub() {
	const session = {
		id: "00000000-aaaa-0000-aaaa-000000000000",
		sessionReplay: bridgeSupports("records") ? 1 : 0
	};
	return {
		findTrackedSession: () => session,
		expire: noop,
		expireObservable: new Observable(),
		setForcedReplay: noop
	};
}
function computeTrackingType(configuration, rawTrackingType) {
	if (hasValidRumSession(rawTrackingType)) return rawTrackingType;
	if (!performDraw(configuration.sessionSampleRate)) return "0";
	if (!performDraw(configuration.sessionReplaySampleRate)) return "2";
	return "1";
}
function hasValidRumSession(trackingType) {
	return trackingType === "0" || trackingType === "1" || trackingType === "2";
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-rum-core@6.33.0/node_modules/@datadog/browser-rum-core/esm/transport/startRumBatch.js
function startRumBatch(configuration, lifeCycle, reportError, pageMayExitObservable, sessionExpireObservable, createEncoder) {
	const endpoints = [configuration.rumEndpointBuilder];
	if (configuration.replica) endpoints.push(configuration.replica.rumEndpointBuilder);
	const batch = createBatch({
		encoder: createEncoder(2),
		request: createHttpRequest(endpoints, reportError),
		flushController: createFlushController({
			pageMayExitObservable,
			sessionExpireObservable
		})
	});
	lifeCycle.subscribe(13, (serverRumEvent) => {
		if (serverRumEvent.type === RumEventType.VIEW) batch.upsert(serverRumEvent, serverRumEvent.view.id);
		else batch.add(serverRumEvent);
	});
	return batch;
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-rum-core@6.33.0/node_modules/@datadog/browser-rum-core/esm/transport/startRumEventBridge.js
function startRumEventBridge(lifeCycle) {
	const bridge = getEventBridge();
	lifeCycle.subscribe(13, (serverRumEvent) => {
		bridge.send("rum", serverRumEvent);
	});
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-rum-core@6.33.0/node_modules/@datadog/browser-rum-core/esm/domain/contexts/urlContexts.js
/**
* We want to attach to an event:
* - the url corresponding to its start
* - the referrer corresponding to the previous view url (or document referrer for initial view)
*/
var URL_CONTEXT_TIME_OUT_DELAY = SESSION_TIME_OUT_DELAY;
function startUrlContexts(lifeCycle, hooks, locationChangeObservable) {
	const urlContextHistory = createValueHistory({ expireDelay: URL_CONTEXT_TIME_OUT_DELAY });
	let previousViewUrl;
	lifeCycle.subscribe(1, ({ startClocks, url }) => {
		const locationHref = mockable(location).href;
		const viewUrl = url !== void 0 ? buildUrl(url, locationHref).href : locationHref;
		urlContextHistory.add(buildUrlContext({
			url: viewUrl,
			referrer: !previousViewUrl ? document.referrer : previousViewUrl
		}), startClocks.relative);
		previousViewUrl = viewUrl;
	});
	lifeCycle.subscribe(6, ({ endClocks }) => {
		urlContextHistory.closeActive(endClocks.relative);
	});
	const locationChangeSubscription = locationChangeObservable.subscribe(({ newLocation }) => {
		const current = urlContextHistory.find();
		if (current) {
			const changeTime = relativeNow();
			urlContextHistory.closeActive(changeTime);
			urlContextHistory.add(buildUrlContext({
				url: newLocation.href,
				referrer: current.referrer
			}), changeTime);
		}
	});
	function buildUrlContext({ url, referrer }) {
		return {
			url,
			referrer
		};
	}
	hooks.register(0, ({ startTime, eventType }) => {
		const urlContext = urlContextHistory.find(startTime);
		if (!urlContext) return DISCARDED;
		return {
			type: eventType,
			view: {
				url: urlContext.url,
				referrer: urlContext.referrer
			}
		};
	});
	return {
		findUrl: (startTime) => urlContextHistory.find(startTime),
		stop: () => {
			locationChangeSubscription.unsubscribe();
			urlContextHistory.stop();
		}
	};
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-rum-core@6.33.0/node_modules/@datadog/browser-rum-core/esm/browser/locationChangeObservable.js
function createLocationChangeObservable(configuration) {
	let currentLocation = shallowClone(location);
	return new Observable((observable) => {
		const { stop: stopHistoryTracking } = trackHistory(configuration, onLocationChange);
		const { stop: stopHashTracking } = trackHash(configuration, onLocationChange);
		function onLocationChange() {
			if (currentLocation.href === location.href) return;
			const newLocation = shallowClone(location);
			observable.notify({
				newLocation,
				oldLocation: currentLocation
			});
			currentLocation = newLocation;
		}
		return () => {
			stopHistoryTracking();
			stopHashTracking();
		};
	});
}
function trackHistory(configuration, onHistoryChange) {
	const { stop: stopInstrumentingPushState } = instrumentMethod(getHistoryInstrumentationTarget("pushState"), "pushState", ({ onPostCall }) => {
		onPostCall(onHistoryChange);
	});
	const { stop: stopInstrumentingReplaceState } = instrumentMethod(getHistoryInstrumentationTarget("replaceState"), "replaceState", ({ onPostCall }) => {
		onPostCall(onHistoryChange);
	});
	const { stop: removeListener } = addEventListener(configuration, window, "popstate", onHistoryChange);
	return { stop: () => {
		stopInstrumentingPushState();
		stopInstrumentingReplaceState();
		removeListener();
	} };
}
function trackHash(configuration, onHashChange) {
	return addEventListener(configuration, window, "hashchange", onHashChange);
}
function getHistoryInstrumentationTarget(methodName) {
	return Object.prototype.hasOwnProperty.call(history, methodName) ? history : History.prototype;
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-rum-core@6.33.0/node_modules/@datadog/browser-rum-core/esm/domain/contexts/featureFlagContext.js
var FEATURE_FLAG_CONTEXT_TIME_OUT_DELAY = SESSION_TIME_OUT_DELAY;
/**
* Start feature flag contexts
*
* Feature flag contexts follow the life of views.
* A new context is added when a view is created and ended when the view is ended
*
* Note: we choose not to add a new context at each evaluation to save memory
*/
function startFeatureFlagContexts(lifeCycle, hooks, configuration) {
	const featureFlagContexts = createValueHistory({ expireDelay: FEATURE_FLAG_CONTEXT_TIME_OUT_DELAY });
	lifeCycle.subscribe(1, ({ startClocks }) => {
		featureFlagContexts.add({}, startClocks.relative);
	});
	lifeCycle.subscribe(6, ({ endClocks }) => {
		featureFlagContexts.closeActive(endClocks.relative);
	});
	hooks.register(0, ({ startTime, eventType }) => {
		if (!configuration.trackFeatureFlagsForEvents.concat([RumEventType.VIEW, RumEventType.ERROR]).includes(eventType)) return SKIPPED;
		const featureFlagContext = featureFlagContexts.find(startTime);
		if (!featureFlagContext || isEmptyObject(featureFlagContext)) return SKIPPED;
		return {
			type: eventType,
			feature_flags: featureFlagContext
		};
	});
	return { addFeatureFlagEvaluation: (key, value) => {
		const currentContext = featureFlagContexts.find();
		if (currentContext) currentContext[key] = value;
	} };
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-rum-core@6.33.0/node_modules/@datadog/browser-rum-core/esm/domain/startCustomerDataTelemetry.js
var MEASURES_PERIOD_DURATION = 10 * ONE_SECOND;
var currentPeriodMeasures;
var batchHasRumEvent;
function startCustomerDataTelemetry(telemetry, lifeCycle, batchFlushObservable) {
	if (!telemetry.metricsEnabled) return;
	initCurrentPeriodMeasures();
	batchHasRumEvent = false;
	lifeCycle.subscribe(13, () => {
		batchHasRumEvent = true;
	});
	batchFlushObservable.subscribe(({ bytesCount, messagesCount }) => {
		if (!batchHasRumEvent) return;
		batchHasRumEvent = false;
		currentPeriodMeasures.batchCount += 1;
		updateMeasure(currentPeriodMeasures.batchBytesCount, bytesCount);
		updateMeasure(currentPeriodMeasures.batchMessagesCount, messagesCount);
	});
	setInterval(sendCurrentPeriodMeasures, MEASURES_PERIOD_DURATION);
}
function sendCurrentPeriodMeasures() {
	if (currentPeriodMeasures.batchCount === 0) return;
	addTelemetryMetrics("Customer data measures", currentPeriodMeasures);
	initCurrentPeriodMeasures();
}
function createMeasure() {
	return {
		min: Infinity,
		max: 0,
		sum: 0
	};
}
function updateMeasure(measure, value) {
	measure.sum += value;
	measure.min = Math.min(measure.min, value);
	measure.max = Math.max(measure.max, value);
}
function initCurrentPeriodMeasures() {
	currentPeriodMeasures = {
		batchCount: 0,
		batchBytesCount: createMeasure(),
		batchMessagesCount: createMeasure()
	};
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-rum-core@6.33.0/node_modules/@datadog/browser-rum-core/esm/domain/contexts/pageStateHistory.js
var MAX_PAGE_STATE_ENTRIES = 4e3;
var PAGE_STATE_CONTEXT_TIME_OUT_DELAY = SESSION_TIME_OUT_DELAY;
function startPageStateHistory(hooks, configuration, maxPageStateEntriesSelectable = 500) {
	const pageStateEntryHistory = createValueHistory({
		expireDelay: PAGE_STATE_CONTEXT_TIME_OUT_DELAY,
		maxEntries: MAX_PAGE_STATE_ENTRIES
	});
	let currentPageState;
	if (supportPerformanceTimingEvent(RumPerformanceEntryType.VISIBILITY_STATE)) performance.getEntriesByType(RumPerformanceEntryType.VISIBILITY_STATE).forEach((entry) => {
		addPageState(entry.name === "hidden" ? "hidden" : "active", entry.startTime);
	});
	addPageState(getPageState(), relativeNow());
	const { stop: stopEventListeners } = addEventListeners(configuration, window, [
		"pageshow",
		"focus",
		"blur",
		"visibilitychange",
		"resume",
		"freeze",
		"pagehide"
	], (event) => {
		addPageState(computePageState(event), event.timeStamp);
	}, { capture: true });
	function addPageState(nextPageState, startTime = relativeNow()) {
		if (nextPageState === currentPageState) return;
		currentPageState = nextPageState;
		pageStateEntryHistory.closeActive(startTime);
		pageStateEntryHistory.add({
			state: currentPageState,
			startTime
		}, startTime);
	}
	function wasInPageStateDuringPeriod(state, startTime, duration) {
		return pageStateEntryHistory.findAll(startTime, duration).some((pageState) => pageState.state === state);
	}
	hooks.register(0, ({ startTime, duration = 0, eventType }) => {
		if (eventType === RumEventType.VIEW) return {
			type: eventType,
			_dd: { page_states: processPageStates(pageStateEntryHistory.findAll(startTime, duration), startTime, maxPageStateEntriesSelectable) }
		};
		if (eventType === RumEventType.ACTION || eventType === RumEventType.ERROR) return {
			type: eventType,
			view: { in_foreground: wasInPageStateDuringPeriod("active", startTime, 0) }
		};
		return SKIPPED;
	});
	return {
		wasInPageStateDuringPeriod,
		addPageState,
		stop: () => {
			stopEventListeners();
			pageStateEntryHistory.stop();
		}
	};
}
function processPageStates(pageStateEntries, eventStartTime, maxPageStateEntriesSelectable) {
	if (pageStateEntries.length === 0) return;
	return pageStateEntries.slice(-maxPageStateEntriesSelectable).reverse().map(({ state, startTime }) => ({
		state,
		start: toServerDuration(elapsed(eventStartTime, startTime))
	}));
}
function computePageState(event) {
	if (event.type === "freeze") return "frozen";
	else if (event.type === "pagehide") return event.persisted ? "frozen" : "terminated";
	return getPageState();
}
function getPageState() {
	if (document.visibilityState === "hidden") return "hidden";
	if (document.hasFocus()) return "active";
	return "passive";
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-rum-core@6.33.0/node_modules/@datadog/browser-rum-core/esm/domain/contexts/displayContext.js
function startDisplayContext(hooks, configuration) {
	let viewport;
	const animationFrameId = requestAnimationFrame(monitor(() => {
		viewport = getViewportDimension();
	}));
	const unsubscribeViewport = initViewportObservable(configuration).subscribe((viewportDimension) => {
		viewport = viewportDimension;
	}).unsubscribe;
	hooks.register(0, ({ eventType }) => ({
		type: eventType,
		display: viewport ? { viewport } : void 0
	}));
	return { stop: () => {
		unsubscribeViewport();
		if (animationFrameId) cancelAnimationFrame(animationFrameId);
	} };
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-rum-core@6.33.0/node_modules/@datadog/browser-rum-core/esm/browser/cookieObservable.js
function createCookieObservable(configuration, cookieName) {
	const detectCookieChangeStrategy = window.cookieStore ? listenToCookieStoreChange(configuration) : watchCookieFallback;
	return new Observable((observable) => detectCookieChangeStrategy(cookieName, (event) => observable.notify(event)));
}
function listenToCookieStoreChange(configuration) {
	return (cookieName, callback) => {
		return addEventListener(configuration, window.cookieStore, "change", (event) => {
			const changeEvent = event.changed.find((event) => event.name === cookieName) || event.deleted.find((event) => event.name === cookieName);
			if (changeEvent) callback(changeEvent.value);
		}).stop;
	};
}
var WATCH_COOKIE_INTERVAL_DELAY = ONE_SECOND;
function watchCookieFallback(cookieName, callback) {
	let previousCookieValue = findCommaSeparatedValue(document.cookie, cookieName);
	const watchCookieIntervalId = setInterval(() => {
		const cookieValue = findCommaSeparatedValue(document.cookie, cookieName);
		if (cookieValue !== previousCookieValue) {
			previousCookieValue = cookieValue;
			callback(cookieValue);
		}
	}, WATCH_COOKIE_INTERVAL_DELAY);
	return () => {
		clearInterval(watchCookieIntervalId);
	};
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-rum-core@6.33.0/node_modules/@datadog/browser-rum-core/esm/domain/contexts/ciVisibilityContext.js
var CI_VISIBILITY_TEST_ID_COOKIE_NAME = "datadog-ci-visibility-test-execution-id";
function startCiVisibilityContext(configuration, hooks, cookieObservable = createCookieObservable(configuration, CI_VISIBILITY_TEST_ID_COOKIE_NAME)) {
	var _a;
	let testExecutionId = getInitCookie("datadog-ci-visibility-test-execution-id") || ((_a = window.Cypress) === null || _a === void 0 ? void 0 : _a.env("traceId"));
	const cookieObservableSubscription = cookieObservable.subscribe((value) => {
		testExecutionId = value;
	});
	hooks.register(0, ({ eventType }) => {
		if (typeof testExecutionId !== "string") return SKIPPED;
		return {
			type: eventType,
			session: { type: "ci_test" },
			ci_test: { test_execution_id: testExecutionId }
		};
	});
	return { stop: () => {
		cookieObservableSubscription.unsubscribe();
	} };
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-rum-core@6.33.0/node_modules/@datadog/browser-rum-core/esm/domain/longTask/longTaskCollection.js
function startLongTaskCollection(lifeCycle, configuration) {
	const subscription = createPerformanceObservable(configuration, {
		type: supportPerformanceTimingEvent(RumPerformanceEntryType.LONG_ANIMATION_FRAME) ? RumPerformanceEntryType.LONG_ANIMATION_FRAME : RumPerformanceEntryType.LONG_TASK,
		buffered: true
	}).subscribe((entries) => {
		for (const entry of entries) {
			if (!configuration.trackLongTasks) break;
			const startClocks = relativeToClocks(entry.startTime);
			const rawRumEvent = processEntry(entry, startClocks);
			lifeCycle.notify(12, {
				rawRumEvent,
				startClocks,
				duration: entry.duration,
				domainContext: { performanceEntry: entry }
			});
		}
	});
	return { stop: () => subscription.unsubscribe() };
}
function processEntry(entry, startClocks) {
	const id = generateUUID();
	const duration = toServerDuration(entry.duration);
	const baseEvent = {
		date: startClocks.timeStamp,
		type: RumEventType.LONG_TASK,
		_dd: { discarded: false }
	};
	if (entry.entryType === RumPerformanceEntryType.LONG_TASK) return {
		...baseEvent,
		long_task: {
			id,
			entry_type: RumLongTaskEntryType.LONG_TASK,
			duration
		}
	};
	return {
		...baseEvent,
		long_task: {
			id,
			entry_type: RumLongTaskEntryType.LONG_ANIMATION_FRAME,
			duration,
			blocking_duration: toServerDuration(entry.blockingDuration),
			first_ui_event_timestamp: toServerDuration(entry.firstUIEventTimestamp),
			render_start: toServerDuration(entry.renderStart),
			style_and_layout_start: toServerDuration(entry.styleAndLayoutStart),
			start_time: toServerDuration(entry.startTime),
			scripts: entry.scripts.map((script) => ({
				duration: toServerDuration(script.duration),
				pause_duration: toServerDuration(script.pauseDuration),
				forced_style_and_layout_duration: toServerDuration(script.forcedStyleAndLayoutDuration),
				start_time: toServerDuration(script.startTime),
				execution_start: toServerDuration(script.executionStart),
				source_url: script.sourceURL,
				source_function_name: script.sourceFunctionName,
				source_char_position: script.sourceCharPosition,
				invoker: script.invoker,
				invoker_type: script.invokerType,
				window_attribution: script.windowAttribution
			}))
		}
	};
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-rum-core@6.33.0/node_modules/@datadog/browser-rum-core/esm/domain/contexts/syntheticsContext.js
function startSyntheticsContext(hooks) {
	hooks.register(0, ({ eventType }) => {
		if (!isSyntheticsTest()) return SKIPPED;
		return {
			type: eventType,
			session: { type: "synthetics" },
			synthetics: {
				...getSyntheticsContext(),
				injected: willSyntheticsInjectRum()
			}
		};
	});
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-rum-core@6.33.0/node_modules/@datadog/browser-rum-core/esm/domain/limitModification.js
/**
* Allows declaring and enforcing modifications to specific fields of an object.
* Only supports modifying properties of an object (even if nested in an array).
* Does not support array manipulation (adding/removing items).
*
* Modifications of the object are sanitized only if the field was actually changed by the modifier function (i.e., value is different).
* This ensures consistent SDK behavior regardless of whether limitModification is called.
* Only string fields are handled this way, object fields are sanitized regardless of whether the modifier function was called or not.
*/
function limitModification(object, modifiableFieldPaths, modifier) {
	const clone = deepClone(object);
	const result = modifier(clone);
	objectEntries(modifiableFieldPaths).forEach(([fieldPath, fieldType]) => setValueAtPath(object, clone, fieldPath.split(/\.|(?=\[\])/), fieldType));
	return result;
}
function setValueAtPath(object, clone, pathSegments, fieldType) {
	const [field, ...restPathSegments] = pathSegments;
	if (field === "[]") {
		if (Array.isArray(object) && Array.isArray(clone)) object.forEach((item, i) => setValueAtPath(item, clone[i], restPathSegments, fieldType));
		return;
	}
	if (!isValidObject(object) || !isValidObject(clone)) return;
	if (restPathSegments.length > 0) return setValueAtPath(object[field], clone[field], restPathSegments, fieldType);
	setNestedValue(object, field, clone[field], fieldType);
}
function setNestedValue(object, field, value, fieldType) {
	if (object[field] === value) return;
	const newType = getType(value);
	if (newType === fieldType) object[field] = sanitize(value);
	else if (fieldType === "object" && (newType === "undefined" || newType === "null")) object[field] = {};
}
function isValidObject(object) {
	return getType(object) === "object";
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-rum-core@6.33.0/node_modules/@datadog/browser-rum-core/esm/domain/assembly.js
var VIEW_MODIFIABLE_FIELD_PATHS = {
	"view.name": "string",
	"view.url": "string",
	"view.referrer": "string"
};
var USER_CUSTOMIZABLE_FIELD_PATHS = { context: "object" };
var ROOT_MODIFIABLE_FIELD_PATHS = {
	service: "string",
	version: "string"
};
var modifiableFieldPathsByEvent;
function startRumAssembly(configuration, lifeCycle, hooks, reportError, eventRateLimit) {
	modifiableFieldPathsByEvent = {
		[RumEventType.VIEW]: {
			"view.performance.lcp.resource_url": "string",
			...USER_CUSTOMIZABLE_FIELD_PATHS,
			...VIEW_MODIFIABLE_FIELD_PATHS,
			...ROOT_MODIFIABLE_FIELD_PATHS
		},
		[RumEventType.ERROR]: {
			"error.message": "string",
			"error.stack": "string",
			"error.handling_stack": "string",
			"error.resource.url": "string",
			"error.fingerprint": "string",
			...USER_CUSTOMIZABLE_FIELD_PATHS,
			...VIEW_MODIFIABLE_FIELD_PATHS,
			...ROOT_MODIFIABLE_FIELD_PATHS
		},
		[RumEventType.RESOURCE]: {
			"resource.url": "string",
			"resource.graphql.variables": "string",
			"resource.request.headers": "object",
			"resource.response.headers": "object",
			...USER_CUSTOMIZABLE_FIELD_PATHS,
			...VIEW_MODIFIABLE_FIELD_PATHS,
			...ROOT_MODIFIABLE_FIELD_PATHS
		},
		[RumEventType.ACTION]: {
			"action.target.name": "string",
			...USER_CUSTOMIZABLE_FIELD_PATHS,
			...VIEW_MODIFIABLE_FIELD_PATHS,
			...ROOT_MODIFIABLE_FIELD_PATHS
		},
		[RumEventType.LONG_TASK]: {
			"long_task.scripts[].source_url": "string",
			"long_task.scripts[].invoker": "string",
			...USER_CUSTOMIZABLE_FIELD_PATHS,
			...VIEW_MODIFIABLE_FIELD_PATHS,
			...ROOT_MODIFIABLE_FIELD_PATHS
		},
		[RumEventType.VITAL]: {
			...USER_CUSTOMIZABLE_FIELD_PATHS,
			...VIEW_MODIFIABLE_FIELD_PATHS,
			...ROOT_MODIFIABLE_FIELD_PATHS
		}
	};
	const eventRateLimiters = {
		[RumEventType.ERROR]: createEventRateLimiter(RumEventType.ERROR, reportError, eventRateLimit),
		[RumEventType.ACTION]: createEventRateLimiter(RumEventType.ACTION, reportError, eventRateLimit),
		[RumEventType.VITAL]: createEventRateLimiter(RumEventType.VITAL, reportError, eventRateLimit)
	};
	lifeCycle.subscribe(12, ({ startClocks, duration, rawRumEvent, domainContext }) => {
		const defaultRumEventAttributes = hooks.triggerHook(0, {
			eventType: rawRumEvent.type,
			rawRumEvent,
			domainContext,
			startTime: startClocks.relative,
			duration
		});
		if (defaultRumEventAttributes === "DISCARDED") return;
		const serverRumEvent = combine(defaultRumEventAttributes, rawRumEvent, { ddtags: buildTags(configuration).join(",") });
		if (shouldSend(serverRumEvent, configuration.beforeSend, domainContext, eventRateLimiters)) {
			if (isEmptyObject(serverRumEvent.context)) delete serverRumEvent.context;
			lifeCycle.notify(13, serverRumEvent);
		}
	});
}
function shouldSend(event, beforeSend, domainContext, eventRateLimiters) {
	var _a;
	if (beforeSend) {
		const result = limitModification(event, modifiableFieldPathsByEvent[event.type], (event) => beforeSend(event, domainContext));
		if (result === false && event.type !== RumEventType.VIEW) return false;
		if (result === false) display.warn("Can't dismiss view events using beforeSend!");
	}
	return !((_a = eventRateLimiters[event.type]) === null || _a === void 0 ? void 0 : _a.isLimitReached());
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-rum-core@6.33.0/node_modules/@datadog/browser-rum-core/esm/domain/contexts/sessionContext.js
function startSessionContext(hooks, sessionManager, recorderApi, viewHistory) {
	hooks.register(0, ({ eventType, startTime }) => {
		const session = sessionManager.findTrackedSession(startTime);
		const view = viewHistory.findView(startTime);
		if (!session || !view) return DISCARDED;
		let hasReplay;
		let sampledForReplay;
		let isActive;
		if (eventType === RumEventType.VIEW) {
			hasReplay = recorderApi.getReplayStats(view.id) ? true : void 0;
			sampledForReplay = session.sessionReplay === 1;
			isActive = view.sessionIsActive ? void 0 : false;
		} else hasReplay = recorderApi.isRecording() ? true : void 0;
		return {
			type: eventType,
			session: {
				id: session.id,
				type: "user",
				has_replay: hasReplay,
				sampled_for_replay: sampledForReplay,
				is_active: isActive
			}
		};
	});
	hooks.register(1, ({ startTime }) => {
		const session = sessionManager.findTrackedSession(startTime);
		if (!session) return SKIPPED;
		return { session: { id: session.id } };
	});
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-rum-core@6.33.0/node_modules/@datadog/browser-rum-core/esm/domain/contexts/connectivityContext.js
function startConnectivityContext(hooks) {
	hooks.register(0, ({ eventType }) => ({
		type: eventType,
		connectivity: getConnectivity()
	}));
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-rum-core@6.33.0/node_modules/@datadog/browser-rum-core/esm/domain/contexts/defaultContext.js
function startDefaultContext(hooks, configuration, sdkName) {
	hooks.register(0, ({ eventType }) => {
		const source = configuration.source;
		return {
			type: eventType,
			_dd: {
				format_version: 2,
				drift: currentDrift(),
				configuration: {
					session_sample_rate: round(configuration.sessionSampleRate, 3),
					session_replay_sample_rate: round(configuration.sessionReplaySampleRate, 3),
					profiling_sample_rate: round(configuration.profilingSampleRate, 3),
					trace_sample_rate: round(configuration.traceSampleRate, 3),
					beta_encode_cookie_options: configuration.betaEncodeCookieOptions
				},
				browser_sdk_version: canUseEventBridge() ? "6.33.0" : void 0,
				sdk_name: sdkName
			},
			application: { id: configuration.applicationId },
			date: timeStampNow(),
			source
		};
	});
	hooks.register(1, () => ({ application: { id: configuration.applicationId } }));
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-rum-core@6.33.0/node_modules/@datadog/browser-rum-core/esm/domain/contexts/trackingConsentContext.js
function startTrackingConsentContext(hooks, trackingConsentState) {
	hooks.register(1, () => {
		if (!trackingConsentState.isGranted()) return DISCARDED;
		return SKIPPED;
	});
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-rum-core@6.33.0/node_modules/@datadog/browser-rum-core/esm/domain/event/eventCollection.js
var allowedEventTypes = [
	RumEventType.ACTION,
	RumEventType.ERROR,
	RumEventType.LONG_TASK,
	RumEventType.RESOURCE,
	RumEventType.VITAL
];
function startEventCollection(lifeCycle) {
	return { addEvent: (startTime, event, domainContext, duration) => {
		if (!allowedEventTypes.includes(event.type)) return;
		lifeCycle.notify(12, {
			startClocks: relativeToClocks(startTime),
			rawRumEvent: event,
			domainContext,
			duration
		});
	} };
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-rum-core@6.33.0/node_modules/@datadog/browser-rum-core/esm/domain/view/viewMetrics/startInitialViewMetricsTelemetry.js
function startInitialViewMetricsTelemetry(lifeCycle, telemetry) {
	if (!telemetry.metricsEnabled) return { stop: noop };
	const { unsubscribe } = lifeCycle.subscribe(4, ({ initialViewMetrics }) => {
		if (!initialViewMetrics.largestContentfulPaint || !initialViewMetrics.navigationTimings) return;
		addTelemetryMetrics("Initial view metrics", { metrics: createCoreInitialViewMetrics(initialViewMetrics.largestContentfulPaint, initialViewMetrics.navigationTimings) });
		unsubscribe();
	});
	return { stop: unsubscribe };
}
function createCoreInitialViewMetrics(lcp, navigation) {
	return {
		lcp: { value: lcp.value },
		navigation: {
			domComplete: navigation.domComplete,
			domContentLoaded: navigation.domContentLoaded,
			domInteractive: navigation.domInteractive,
			firstByte: navigation.firstByte,
			loadEvent: navigation.loadEvent
		}
	};
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-rum-core@6.33.0/node_modules/@datadog/browser-rum-core/esm/domain/contexts/sourceCodeContext.js
function startSourceCodeContext(hooks) {
	const browserWindow = window;
	const contextByFile = /* @__PURE__ */ new Map();
	function buildContextByFile() {
		if (!browserWindow.DD_SOURCE_CODE_CONTEXT) return;
		objectEntries(browserWindow.DD_SOURCE_CODE_CONTEXT).forEach(([stack, context]) => {
			const firstFrame = computeStackTrace({ stack }).stack[0];
			if (!firstFrame.url) {
				addTelemetryError("Source code context: missing frame url", { stack });
				return;
			}
			if (!contextByFile.has(firstFrame.url)) contextByFile.set(firstFrame.url, context);
		});
		browserWindow.DD_SOURCE_CODE_CONTEXT = {};
	}
	buildContextByFile();
	hooks.register(0, ({ domainContext, rawRumEvent }) => {
		buildContextByFile();
		if (contextByFile.size === 0) return SKIPPED;
		const url = getSourceUrl(domainContext, rawRumEvent);
		const context = url && contextByFile.get(url);
		if (!context) return SKIPPED;
		return {
			type: rawRumEvent.type,
			service: context.service,
			version: context.version
		};
	});
}
function getSourceUrl(domainContext, rawRumEvent) {
	var _a;
	var _b;
	if (rawRumEvent.type === "long_task" && rawRumEvent.long_task.entry_type === "long-animation-frame") return (_a = rawRumEvent.long_task.scripts[0]) === null || _a === void 0 ? void 0 : _a.source_url;
	let stack;
	if ("handlingStack" in domainContext) stack = domainContext.handlingStack;
	if (rawRumEvent.type === "error" && rawRumEvent.error.stack) stack = rawRumEvent.error.stack;
	return (_b = computeStackTrace({ stack }).stack[0]) === null || _b === void 0 ? void 0 : _b.url;
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-rum-core@6.33.0/node_modules/@datadog/browser-rum-core/esm/boot/startRum.js
function startRum(configuration, recorderApi, profilerApi, initialViewOptions, createEncoder, trackingConsentState, customVitalsState, bufferedDataObservable, telemetry, hooks, sdkName) {
	const cleanupTasks = [];
	const lifeCycle = new LifeCycle();
	lifeCycle.subscribe(13, (event) => sendToExtension("rum", event));
	const reportError = (error) => {
		lifeCycle.notify(14, { error });
		addTelemetryDebug("Error reported to customer", { "error.message": error.message });
	};
	const pageMayExitObservable = createPageMayExitObservable(configuration);
	const session = !canUseEventBridge() ? startRumSessionManager(configuration, lifeCycle, trackingConsentState) : startRumSessionManagerStub();
	if (!canUseEventBridge()) {
		const batch = startRumBatch(configuration, lifeCycle, reportError, pageMayExitObservable, session.expireObservable, createEncoder);
		const preparePageExitSubscription = batch.flushController.preparePageExitFlushObservable.subscribe((reason) => {
			lifeCycle.notify(11, { reason });
		});
		cleanupTasks.push(() => preparePageExitSubscription.unsubscribe());
		cleanupTasks.push(() => batch.stop());
		startCustomerDataTelemetry(telemetry, lifeCycle, batch.flushController.flushObservable);
	} else {
		startRumEventBridge(lifeCycle);
		const pageMayExitSubscription = pageMayExitObservable.subscribe((event) => {
			lifeCycle.notify(11, event);
		});
		cleanupTasks.push(() => pageMayExitSubscription.unsubscribe());
	}
	startTrackingConsentContext(hooks, trackingConsentState);
	const { stop: stopInitialViewMetricsTelemetry } = startInitialViewMetricsTelemetry(lifeCycle, telemetry);
	cleanupTasks.push(stopInitialViewMetricsTelemetry);
	const { stop: stopRumEventCollection, ...startRumEventCollectionResult } = startRumEventCollection(lifeCycle, hooks, configuration, session, recorderApi, initialViewOptions, customVitalsState, bufferedDataObservable, sdkName, reportError);
	cleanupTasks.push(stopRumEventCollection);
	bufferedDataObservable.unbuffer();
	cleanupTasks.push(() => profilerApi.stop());
	return {
		...startRumEventCollectionResult,
		lifeCycle,
		session,
		stopSession: () => session.expire(),
		telemetry,
		stop: () => {
			cleanupTasks.forEach((task) => task());
		},
		hooks
	};
}
function startRumEventCollection(lifeCycle, hooks, configuration, session, recorderApi, initialViewOptions, customVitalsState, bufferedDataObservable, sdkName, reportError) {
	const cleanupTasks = [];
	const domMutationObservable = createDOMMutationObservable();
	const locationChangeObservable = createLocationChangeObservable(configuration);
	const { observable: windowOpenObservable, stop: stopWindowOpen } = createWindowOpenObservable();
	cleanupTasks.push(stopWindowOpen);
	startDefaultContext(hooks, configuration, sdkName);
	const pageStateHistory = startPageStateHistory(hooks, configuration);
	cleanupTasks.push(() => pageStateHistory.stop());
	const viewHistory = startViewHistory(lifeCycle);
	cleanupTasks.push(() => viewHistory.stop());
	const urlContexts = startUrlContexts(lifeCycle, hooks, locationChangeObservable);
	cleanupTasks.push(() => urlContexts.stop());
	const featureFlagContexts = startFeatureFlagContexts(lifeCycle, hooks, configuration);
	startSessionContext(hooks, session, recorderApi, viewHistory);
	startConnectivityContext(hooks);
	startTabContext(hooks);
	const globalContext = startGlobalContext(hooks, configuration, "rum", true);
	const userContext = startUserContext(hooks, configuration, session, "rum");
	const accountContext = startAccountContext(hooks, configuration, "rum");
	const actionCollection = startActionCollection(lifeCycle, hooks, domMutationObservable, windowOpenObservable, configuration);
	cleanupTasks.push(actionCollection.stop);
	const eventCollection = startEventCollection(lifeCycle);
	const displayContext = startDisplayContext(hooks, configuration);
	cleanupTasks.push(displayContext.stop);
	const ciVisibilityContext = startCiVisibilityContext(configuration, hooks);
	cleanupTasks.push(ciVisibilityContext.stop);
	startSyntheticsContext(hooks);
	startRumAssembly(configuration, lifeCycle, hooks, reportError);
	const { addTiming, setLoadingTime, startView, setViewName, setViewContext, setViewContextProperty, getViewContext, stop: stopViewCollection } = startViewCollection(lifeCycle, hooks, configuration, domMutationObservable, windowOpenObservable, locationChangeObservable, recorderApi, viewHistory, initialViewOptions);
	startSourceCodeContext(hooks);
	cleanupTasks.push(stopViewCollection);
	const resourceCollection = startResourceCollection(lifeCycle, configuration, pageStateHistory);
	cleanupTasks.push(resourceCollection.stop);
	const { stop: stopLongTaskCollection } = startLongTaskCollection(lifeCycle, configuration);
	cleanupTasks.push(stopLongTaskCollection);
	const { addError } = startErrorCollection(lifeCycle, configuration, bufferedDataObservable);
	startRequestCollection(lifeCycle, configuration, session, userContext, accountContext);
	const vitalCollection = startVitalCollection(lifeCycle, pageStateHistory, customVitalsState);
	const internalContext = startInternalContext(configuration.applicationId, session, viewHistory, actionCollection.actionContexts, urlContexts);
	return {
		addAction: actionCollection.addAction,
		startAction: actionCollection.startAction,
		stopAction: actionCollection.stopAction,
		startResource: resourceCollection.startResource,
		stopResource: resourceCollection.stopResource,
		addEvent: eventCollection.addEvent,
		addError,
		addTiming,
		setLoadingTime,
		addFeatureFlagEvaluation: featureFlagContexts.addFeatureFlagEvaluation,
		startView,
		setViewContext,
		setViewContextProperty,
		getViewContext,
		setViewName,
		viewHistory,
		getInternalContext: internalContext.get,
		startDurationVital: vitalCollection.startDurationVital,
		stopDurationVital: vitalCollection.stopDurationVital,
		addDurationVital: vitalCollection.addDurationVital,
		addOperationStepVital: vitalCollection.addOperationStepVital,
		globalContext,
		userContext,
		accountContext,
		stop: () => cleanupTasks.forEach((task) => task())
	};
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-rum-core@6.33.0/node_modules/@datadog/browser-rum-core/esm/boot/rumPublicApi.js
function makeRumPublicApi(recorderApi, profilerApi, options = {}) {
	const trackingConsentState = createTrackingConsentState();
	const customVitalsState = createCustomVitalsState();
	const bufferedDataObservable = startBufferingData().observable;
	let strategy = createPreStartStrategy$1(options, trackingConsentState, customVitalsState, (configuration, deflateWorker, initialViewOptions, telemetry, hooks) => {
		const createEncoder = deflateWorker && options.createDeflateEncoder ? (streamId) => options.createDeflateEncoder(configuration, deflateWorker, streamId) : createIdentityEncoder;
		const startRumResult = mockable(startRum)(configuration, recorderApi, profilerApi, initialViewOptions, createEncoder, trackingConsentState, customVitalsState, bufferedDataObservable, telemetry, hooks, options.sdkName);
		recorderApi.onRumStart(startRumResult.lifeCycle, configuration, startRumResult.session, startRumResult.viewHistory, deflateWorker, startRumResult.telemetry);
		profilerApi.onRumStart(startRumResult.lifeCycle, startRumResult.hooks, configuration, startRumResult.session, startRumResult.viewHistory, createEncoder);
		strategy = createPostStartStrategy$1(strategy, startRumResult);
		callPluginsMethod(configuration.plugins, "onRumStart", {
			strategy,
			addEvent: startRumResult.addEvent,
			addError: startRumResult.addError
		});
		return startRumResult;
	});
	const getStrategy = () => strategy;
	const startView = (options) => {
		const handlingStack = createHandlingStack("view");
		callMonitored(() => {
			const sanitizedOptions = typeof options === "object" ? options : { name: options };
			strategy.startView({
				...sanitizedOptions,
				handlingStack
			});
			addTelemetryUsage({ feature: "start-view" });
		});
	};
	const rumPublicApi = makePublicApi({
		init: (initConfiguration) => {
			const errorStack = (/* @__PURE__ */ new Error()).stack;
			callMonitored(() => strategy.init(initConfiguration, rumPublicApi, errorStack));
		},
		setTrackingConsent: monitor((trackingConsent) => {
			trackingConsentState.update(trackingConsent);
			addTelemetryUsage({
				feature: "set-tracking-consent",
				tracking_consent: trackingConsent
			});
		}),
		setViewName: monitor((name) => {
			strategy.setViewName(name);
			addTelemetryUsage({ feature: "set-view-name" });
		}),
		setViewContext: monitor((context) => {
			strategy.setViewContext(context);
			addTelemetryUsage({ feature: "set-view-context" });
		}),
		setViewContextProperty: monitor((key, value) => {
			strategy.setViewContextProperty(key, value);
			addTelemetryUsage({ feature: "set-view-context-property" });
		}),
		getViewContext: monitor(() => {
			addTelemetryUsage({ feature: "set-view-context-property" });
			return strategy.getViewContext();
		}),
		getInternalContext: monitor((startTime) => strategy.getInternalContext(startTime)),
		getInitConfiguration: monitor(() => deepClone(strategy.initConfiguration)),
		addAction: (name, context) => {
			const handlingStack = createHandlingStack("action");
			callMonitored(() => {
				strategy.addAction({
					name: sanitize(name),
					context: sanitize(context),
					startClocks: clocksNow(),
					type: ActionType.CUSTOM,
					handlingStack
				});
				addTelemetryUsage({ feature: "add-action" });
			});
		},
		startAction: monitor((name, options) => {
			if (strategy.initConfiguration && !isExperimentalFeatureEnabled(ExperimentalFeature.START_STOP_ACTION)) return;
			strategy.startAction(sanitize(name), {
				type: sanitize(options && options.type),
				context: sanitize(options && options.context),
				actionKey: options && options.actionKey
			});
		}),
		stopAction: monitor((name, options) => {
			if (strategy.initConfiguration && !isExperimentalFeatureEnabled(ExperimentalFeature.START_STOP_ACTION)) return;
			strategy.stopAction(sanitize(name), {
				type: sanitize(options && options.type),
				context: sanitize(options && options.context),
				actionKey: options && options.actionKey
			});
		}),
		startResource: monitor((url, options) => {
			if (strategy.initConfiguration && !isExperimentalFeatureEnabled(ExperimentalFeature.START_STOP_RESOURCE)) return;
			strategy.startResource(sanitize(url), {
				type: sanitize(options && options.type),
				method: sanitize(options && options.method),
				context: sanitize(options && options.context),
				resourceKey: options && options.resourceKey
			});
		}),
		stopResource: monitor((url, options) => {
			if (strategy.initConfiguration && !isExperimentalFeatureEnabled(ExperimentalFeature.START_STOP_RESOURCE)) return;
			strategy.stopResource(sanitize(url), {
				type: sanitize(options && options.type),
				statusCode: options && options.statusCode,
				size: options && options.size,
				context: sanitize(options && options.context),
				resourceKey: options && options.resourceKey
			});
		}),
		addError: (error, context) => {
			const handlingStack = createHandlingStack("error");
			callMonitored(() => {
				strategy.addError({
					error,
					handlingStack,
					context: sanitize(context),
					startClocks: clocksNow()
				});
				addTelemetryUsage({ feature: "add-error" });
			});
		},
		addTiming: monitor((name, time) => {
			strategy.addTiming(sanitize(name), time);
		}),
		setViewLoadingTime: monitor(() => {
			const callTimestamp = timeStampNow();
			strategy.setLoadingTime(callTimestamp);
			addTelemetryUsage({ feature: "addViewLoadingTime" });
		}),
		setGlobalContext: defineContextMethod(getStrategy, CustomerContextKey.globalContext, ContextManagerMethod.setContext, "set-global-context"),
		getGlobalContext: defineContextMethod(getStrategy, CustomerContextKey.globalContext, ContextManagerMethod.getContext, "get-global-context"),
		setGlobalContextProperty: defineContextMethod(getStrategy, CustomerContextKey.globalContext, ContextManagerMethod.setContextProperty, "set-global-context-property"),
		removeGlobalContextProperty: defineContextMethod(getStrategy, CustomerContextKey.globalContext, ContextManagerMethod.removeContextProperty, "remove-global-context-property"),
		clearGlobalContext: defineContextMethod(getStrategy, CustomerContextKey.globalContext, ContextManagerMethod.clearContext, "clear-global-context"),
		setUser: defineContextMethod(getStrategy, CustomerContextKey.userContext, ContextManagerMethod.setContext, "set-user"),
		getUser: defineContextMethod(getStrategy, CustomerContextKey.userContext, ContextManagerMethod.getContext, "get-user"),
		setUserProperty: defineContextMethod(getStrategy, CustomerContextKey.userContext, ContextManagerMethod.setContextProperty, "set-user-property"),
		removeUserProperty: defineContextMethod(getStrategy, CustomerContextKey.userContext, ContextManagerMethod.removeContextProperty, "remove-user-property"),
		clearUser: defineContextMethod(getStrategy, CustomerContextKey.userContext, ContextManagerMethod.clearContext, "clear-user"),
		setAccount: defineContextMethod(getStrategy, CustomerContextKey.accountContext, ContextManagerMethod.setContext, "set-account"),
		getAccount: defineContextMethod(getStrategy, CustomerContextKey.accountContext, ContextManagerMethod.getContext, "get-account"),
		setAccountProperty: defineContextMethod(getStrategy, CustomerContextKey.accountContext, ContextManagerMethod.setContextProperty, "set-account-property"),
		removeAccountProperty: defineContextMethod(getStrategy, CustomerContextKey.accountContext, ContextManagerMethod.removeContextProperty, "remove-account-property"),
		clearAccount: defineContextMethod(getStrategy, CustomerContextKey.accountContext, ContextManagerMethod.clearContext, "clear-account"),
		startView,
		stopSession: monitor(() => {
			strategy.stopSession();
			addTelemetryUsage({ feature: "stop-session" });
		}),
		addFeatureFlagEvaluation: monitor((key, value) => {
			strategy.addFeatureFlagEvaluation(sanitize(key), sanitize(value));
			addTelemetryUsage({ feature: "add-feature-flag-evaluation" });
		}),
		getSessionReplayLink: monitor(() => recorderApi.getSessionReplayLink()),
		startSessionReplayRecording: monitor((options) => {
			recorderApi.start(options);
			addTelemetryUsage({
				feature: "start-session-replay-recording",
				force: options && options.force
			});
		}),
		stopSessionReplayRecording: monitor(() => recorderApi.stop()),
		addDurationVital: (name, options) => {
			const handlingStack = createHandlingStack("vital");
			callMonitored(() => {
				addTelemetryUsage({ feature: "add-duration-vital" });
				strategy.addDurationVital({
					id: generateUUID(),
					name: sanitize(name),
					type: VitalType.DURATION,
					startClocks: timeStampToClocks(options.startTime),
					duration: options.duration,
					context: sanitize(options && options.context),
					description: sanitize(options && options.description),
					handlingStack
				});
			});
		},
		startDurationVital: (name, options) => {
			const handlingStack = createHandlingStack("vital");
			return callMonitored(() => {
				addTelemetryUsage({ feature: "start-duration-vital" });
				return strategy.startDurationVital(sanitize(name), {
					context: sanitize(options && options.context),
					description: sanitize(options && options.description),
					handlingStack
				});
			});
		},
		stopDurationVital: monitor((nameOrRef, options) => {
			addTelemetryUsage({ feature: "stop-duration-vital" });
			strategy.stopDurationVital(typeof nameOrRef === "string" ? sanitize(nameOrRef) : nameOrRef, {
				context: sanitize(options && options.context),
				description: sanitize(options && options.description)
			});
		}),
		startFeatureOperation: (name, options) => {
			const handlingStack = createHandlingStack("vital");
			callMonitored(() => {
				addTelemetryUsage({
					feature: "add-operation-step-vital",
					action_type: "start"
				});
				strategy.addOperationStepVital(name, "start", {
					...options,
					handlingStack
				});
			});
		},
		succeedFeatureOperation: monitor((name, options) => {
			addTelemetryUsage({
				feature: "add-operation-step-vital",
				action_type: "succeed"
			});
			strategy.addOperationStepVital(name, "end", options);
		}),
		failFeatureOperation: monitor((name, failureReason, options) => {
			addTelemetryUsage({
				feature: "add-operation-step-vital",
				action_type: "fail"
			});
			strategy.addOperationStepVital(name, "end", options, failureReason);
		})
	});
	return rumPublicApi;
}
function createPostStartStrategy$1(preStartStrategy, startRumResult) {
	return {
		init: (initConfiguration) => {
			displayAlreadyInitializedError("DD_RUM", initConfiguration);
		},
		initConfiguration: preStartStrategy.initConfiguration,
		...startRumResult
	};
}
__name(createPostStartStrategy$1, "createPostStartStrategy");
//#endregion
//#region node_modules/.pnpm/@datadog+browser-rum-core@6.33.0/node_modules/@datadog/browser-rum-core/esm/domain/getSessionReplayUrl.js
function getSessionReplayUrl(configuration, { session, viewContext, errorType }) {
	const sessionId = session ? session.id : "no-session-id";
	const parameters = [];
	if (errorType !== void 0) parameters.push(`error-type=${errorType}`);
	if (viewContext) {
		parameters.push(`seed=${viewContext.id}`);
		parameters.push(`from=${viewContext.startClocks.timeStamp}`);
	}
	return `${getDatadogSiteUrl(configuration)}${`/rum/replay/sessions/${sessionId}`}?${parameters.join("&")}`;
}
function getDatadogSiteUrl(rumConfiguration) {
	const site = rumConfiguration.site;
	const subdomain = rumConfiguration.subdomain || getSiteDefaultSubdomain(rumConfiguration);
	return `https://${subdomain ? `${subdomain}.` : ""}${site}`;
}
function getSiteDefaultSubdomain(configuration) {
	switch (configuration.site) {
		case INTAKE_SITE_US1:
		case INTAKE_SITE_EU1: return "app";
		case INTAKE_SITE_STAGING: return "dd";
		default: return;
	}
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-rum-core@6.33.0/node_modules/@datadog/browser-rum-core/esm/transport/formDataTransport.js
function createFormDataTransport(configuration, lifeCycle, createEncoder, streamId) {
	const reportError = (error) => {
		lifeCycle.notify(14, { error });
		addTelemetryDebug("Error reported to customer", { "error.message": error.message });
	};
	const httpRequest = createHttpRequest([configuration.profilingEndpointBuilder], reportError);
	const encoder = createEncoder(streamId);
	return { async send({ event, ...attachments }) {
		const formData = new FormData();
		const serializedEvent = jsonStringify(event);
		if (!serializedEvent) throw new Error("Failed to serialize event");
		formData.append("event", new Blob([serializedEvent], { type: "application/json" }), "event.json");
		let bytesCount = serializedEvent.length;
		for (const [key, value] of objectEntries(attachments)) {
			const serializedValue = jsonStringify(value);
			if (!serializedValue) throw new Error("Failed to serialize attachment");
			const result = await encode(encoder, serializedValue);
			bytesCount += result.outputBytesCount;
			formData.append(key, new Blob([result.output]), key);
		}
		httpRequest.send({
			data: formData,
			bytesCount
		});
	} };
}
function encode(encoder, data) {
	return new Promise((resolve) => {
		encoder.write(data);
		encoder.finish((encoderResult) => {
			resolve(encoderResult);
		});
	});
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-rum@6.33.0_@datadog+browser-logs@6.33.0/node_modules/@datadog/browser-rum/esm/types/sessionReplayConstants.js
var RecordType = {
	FullSnapshot: 2,
	IncrementalSnapshot: 3,
	Meta: 4,
	Focus: 6,
	ViewEnd: 7,
	VisualViewport: 8,
	FrustrationRecord: 9,
	Change: 12
};
var NodeType = {
	Document: 0,
	DocumentType: 1,
	Element: 2,
	Text: 3,
	CDATA: 4,
	DocumentFragment: 11
};
var ChangeType = {
	AddString: 0,
	AddNode: 1,
	RemoveNode: 2,
	Attribute: 3,
	Text: 4,
	Size: 5,
	ScrollPosition: 6,
	AddStyleSheet: 7,
	AttachedStyleSheets: 8,
	MediaPlaybackState: 9,
	VisualViewport: 10
};
var IncrementalSource = {
	Mutation: 0,
	MouseMove: 1,
	MouseInteraction: 2,
	Scroll: 3,
	ViewportResize: 4,
	Input: 5,
	TouchMove: 6,
	MediaInteraction: 7,
	StyleSheetRule: 8
};
var MouseInteractionType = {
	MouseUp: 0,
	MouseDown: 1,
	Click: 2,
	ContextMenu: 3,
	DblClick: 4,
	Focus: 5,
	Blur: 6,
	TouchStart: 7,
	TouchEnd: 9
};
var MediaInteractionType = {
	Play: 0,
	Pause: 1
};
var SnapshotFormat = {
	V1: 0,
	Change: 1
};
//#endregion
//#region node_modules/.pnpm/@datadog+browser-rum@6.33.0_@datadog+browser-logs@6.33.0/node_modules/@datadog/browser-rum/esm/domain/record/itemIds.js
function createEventIds() {
	return createWeakIdMap(1);
}
function createNodeIds() {
	return createWeakIdMap(0);
}
function createStringIds() {
	return createIdMap(0);
}
function createStyleSheetIds() {
	return createWeakIdMap(0);
}
function createIdMap(firstId) {
	return createItemIds(() => /* @__PURE__ */ new Map(), firstId);
}
function createWeakIdMap(firstId) {
	return createItemIds(() => /* @__PURE__ */ new WeakMap(), firstId);
}
function createItemIds(createMap, firstId) {
	let map = createMap();
	let nextId = firstId;
	const get = (object) => map.get(object);
	return {
		clear() {
			if (nextId === firstId) return;
			map = createMap();
			nextId = firstId;
		},
		delete(object) {
			map.delete(object);
		},
		get,
		getOrInsert(object) {
			let id = get(object);
			if (id === void 0) {
				id = nextId++;
				map.set(object, id);
			}
			return id;
		},
		get nextId() {
			return nextId;
		},
		get size() {
			return nextId - firstId;
		}
	};
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-rum@6.33.0_@datadog+browser-logs@6.33.0/node_modules/@datadog/browser-rum/esm/domain/record/serialization/experimentalFeatures.js
function isFullSnapshotChangeRecordsEnabled() {
	return isExperimentalFeatureEnabled(ExperimentalFeature.USE_CHANGE_RECORDS) || isExperimentalFeatureEnabled(ExperimentalFeature.USE_INCREMENTAL_CHANGE_RECORDS);
}
function isIncrementalSnapshotChangeRecordsEnabled() {
	return isExperimentalFeatureEnabled(ExperimentalFeature.USE_INCREMENTAL_CHANGE_RECORDS);
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-rum@6.33.0_@datadog+browser-logs@6.33.0/node_modules/@datadog/browser-rum/esm/domain/record/serialization/insertionCursor.js
/** Returns an InsertionCursor which starts positioned at the root of the document. */
function createRootInsertionCursor(nodeIds) {
	return createInsertionCursor(void 0, void 0, nodeIds);
}
/**
* Returns an InsertionCursor which starts positioned in the child list of the given
* parent node. If a next sibling is provided, the cursor points to the position
* immediately before the next sibling; otherwise, the cursor points to the end of the
* child list.
*/
function createChildInsertionCursor(parentId, nextSiblingId, nodeIds) {
	return createInsertionCursor(parentId, nextSiblingId, nodeIds);
}
function createInsertionCursor(parentId, nextSiblingId, nodeIds) {
	let cursor = {
		container: void 0,
		parentId,
		previousSiblingId: void 0,
		nextSiblingId
	};
	const computeInsertionPoint = (nodeId) => {
		if (cursor.previousSiblingId === nodeId - 1) return 0;
		if (cursor.nextSiblingId !== void 0) return cursor.nextSiblingId - nodeId;
		if (cursor.parentId !== void 0) return nodeId - cursor.parentId;
		return null;
	};
	return {
		advance(node) {
			const nodeId = nodeIds.getOrInsert(node);
			const insertionPoint = computeInsertionPoint(nodeId);
			cursor.previousSiblingId = nodeId;
			return {
				nodeId,
				insertionPoint
			};
		},
		ascend() {
			if (cursor.container) cursor = cursor.container;
		},
		descend() {
			if (cursor.previousSiblingId !== void 0) cursor = {
				container: cursor,
				parentId: cursor.previousSiblingId,
				previousSiblingId: void 0,
				nextSiblingId: void 0
			};
		}
	};
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-rum@6.33.0_@datadog+browser-logs@6.33.0/node_modules/@datadog/browser-rum/esm/domain/record/serialization/serializationUtils.js
/**
* Get the element "value" to be serialized as an attribute or an input update record. It respects
* the input privacy mode of the element.
* PERFROMANCE OPTIMIZATION: Assumes that privacy level `HIDDEN` is never encountered because of earlier checks.
*/
function getElementInputValue(element, nodePrivacyLevel) {
	const tagName = element.tagName;
	const value = element.value;
	if (shouldMaskNode(element, nodePrivacyLevel)) {
		const type = element.type;
		if (tagName === "INPUT" && (type === "button" || type === "submit" || type === "reset")) return value;
		else if (!value || tagName === "OPTION") return;
		return "***";
	}
	if (tagName === "OPTION" || tagName === "SELECT") return element.value;
	if (tagName !== "INPUT" && tagName !== "TEXTAREA") return;
	return value;
}
var URL_IN_CSS_REF = /url\((?:(')([^']*)'|(")([^"]*)"|([^)]*))\)/gm;
var ABSOLUTE_URL = /^[A-Za-z]+:|^\/\//;
var DATA_URI = /^["']?data:.*,/i;
function switchToAbsoluteUrl(cssText, cssHref) {
	return cssText.replace(URL_IN_CSS_REF, (matchingSubstring, singleQuote, urlWrappedInSingleQuotes, doubleQuote, urlWrappedInDoubleQuotes, urlNotWrappedInQuotes) => {
		const url = urlWrappedInSingleQuotes || urlWrappedInDoubleQuotes || urlNotWrappedInQuotes;
		if (!cssHref || !url || ABSOLUTE_URL.test(url) || DATA_URI.test(url)) return matchingSubstring;
		const quote = singleQuote || doubleQuote || "";
		return `url(${quote}${makeUrlAbsolute(url, cssHref)}${quote})`;
	});
}
function makeUrlAbsolute(url, baseUrl) {
	try {
		return buildUrl(url, baseUrl).href;
	} catch (_a) {
		return url;
	}
}
var TAG_NAME_REGEX = /[^a-z1-6-_]/;
function getValidTagName(tagName) {
	const processedTagName = tagName.toLowerCase().trim();
	if (TAG_NAME_REGEX.test(processedTagName)) return "div";
	return processedTagName;
}
/**
* Returns the tag name of the given element, normalized to ensure a consistent lowercase
* representation regardless of whether the element is HTML, XHTML, or SVG.
*/
function normalizedTagName(element) {
	return element.tagName.toLowerCase();
}
function censoredImageForSize(width, height) {
	return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='${width}' height='${height}' style='background-color:silver'%3E%3C/svg%3E`;
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-rum@6.33.0_@datadog+browser-logs@6.33.0/node_modules/@datadog/browser-rum/esm/domain/record/serialization/serializeStyleSheets.js
function serializeStyleSheets(cssStyleSheets, transaction) {
	if (cssStyleSheets === void 0 || cssStyleSheets.length === 0) return;
	const serializeStylesheet = (cssStyleSheet) => {
		const rules = cssStyleSheet.cssRules || cssStyleSheet.rules;
		const cssRules = Array.from(rules, (cssRule) => cssRule.cssText);
		transaction.addMetric("cssText", cssRules.reduce((totalLength, rule) => totalLength + rule.length, 0));
		return {
			cssRules,
			disabled: cssStyleSheet.disabled || void 0,
			media: cssStyleSheet.media.length > 0 ? Array.from(cssStyleSheet.media) : void 0
		};
	};
	const styleSheets = [];
	for (let index = 0; index < cssStyleSheets.length; index++) styleSheets.push(serializeStylesheet(cssStyleSheets[index]));
	return styleSheets;
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-rum@6.33.0_@datadog+browser-logs@6.33.0/node_modules/@datadog/browser-rum/esm/domain/record/serialization/serializeAttribute.js
var MAX_ATTRIBUTE_VALUE_CHAR_LENGTH = 1e6;
function serializeAttribute(element, nodePrivacyLevel, attributeName, configuration) {
	if (nodePrivacyLevel === NodePrivacyLevel.HIDDEN) return null;
	const attributeValue = element.getAttribute(attributeName);
	const tagName = element.tagName;
	if (shouldMaskAttribute(tagName, attributeName, attributeValue, nodePrivacyLevel, configuration)) {
		if (tagName === "IMG") {
			const image = element;
			if (image.naturalWidth > 0) return censoredImageForSize(image.naturalWidth, image.naturalHeight);
			const { width, height } = element.getBoundingClientRect();
			if (width > 0 || height > 0) return censoredImageForSize(width, height);
			return CENSORED_IMG_MARK;
		}
		if (tagName === "SOURCE") return CENSORED_IMG_MARK;
		return "***";
	}
	if (!attributeValue) return attributeValue;
	return sanitizeIfLongDataUrl(attributeValue, MAX_ATTRIBUTE_VALUE_CHAR_LENGTH);
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-rum@6.33.0_@datadog+browser-logs@6.33.0/node_modules/@datadog/browser-rum/esm/domain/record/serialization/serializeAttributes.js
function serializeAttributes(element, nodePrivacyLevel, transaction) {
	return {
		...serializeDOMAttributes(element, nodePrivacyLevel, transaction),
		...serializeVirtualAttributes(element, nodePrivacyLevel, transaction)
	};
}
function serializeDOMAttributes(element, nodePrivacyLevel, transaction) {
	if (nodePrivacyLevel === NodePrivacyLevel.HIDDEN) return {};
	const attrs = {};
	const tagName = normalizedTagName(element);
	for (let i = 0; i < element.attributes.length; i += 1) {
		const attributeName = element.attributes.item(i).name;
		const attributeValue = serializeAttribute(element, nodePrivacyLevel, attributeName, transaction.scope.configuration);
		if (attributeValue !== null) attrs[attributeName] = attributeValue;
	}
	if (element.value && (tagName === "textarea" || tagName === "select" || tagName === "option" || tagName === "input")) {
		const formValue = getElementInputValue(element, nodePrivacyLevel);
		if (formValue !== void 0) attrs.value = formValue;
	}
	/**
	* <Option> can be selected, which occurs if its `value` matches ancestor `<Select>.value`
	*/
	if (tagName === "option") {
		const optionElement = element;
		if (optionElement.selected && !shouldMaskNode(optionElement, nodePrivacyLevel)) attrs.selected = "";
		else delete attrs.selected;
	}
	/**
	* Forms: input[type=checkbox,radio]
	* The `checked` property for <input> is a little bit special:
	* 1. el.checked is a setter that returns if truthy.
	* 2. getAttribute returns the string value
	* getAttribute('checked') does not sync with `Element.checked`, so use JS property
	* NOTE: `checked` property exists on `HTMLInputElement`. For serializer assumptions, we check for type=radio|check.
	*/
	const inputElement = element;
	if (tagName === "input" && (inputElement.type === "radio" || inputElement.type === "checkbox")) {
		if (inputElement.checked && !shouldMaskNode(inputElement, nodePrivacyLevel)) attrs.checked = "";
		else delete attrs.checked;
	}
	return attrs;
}
function serializeVirtualAttributes(element, nodePrivacyLevel, transaction) {
	if (nodePrivacyLevel === NodePrivacyLevel.HIDDEN) return {};
	const attrs = {};
	const doc = element.ownerDocument;
	const tagName = normalizedTagName(element);
	if (tagName === "link") {
		const stylesheet = Array.from(doc.styleSheets).find((s) => s.href === element.href);
		const cssText = getCssRulesString(stylesheet);
		if (cssText && stylesheet) {
			transaction.addMetric("cssText", cssText.length);
			attrs._cssText = cssText;
		}
	}
	if (tagName === "style" && element.sheet) {
		const cssText = getCssRulesString(element.sheet);
		if (cssText) {
			transaction.addMetric("cssText", cssText.length);
			attrs._cssText = cssText;
		}
	}
	/**
	* Serialize the media playback state
	*/
	if (tagName === "audio" || tagName === "video") attrs.rr_mediaState = element.paused ? "paused" : "played";
	/**
	* Serialize the scroll state for each element only for full snapshot
	*/
	let scrollTop;
	let scrollLeft;
	switch (transaction.kind) {
		case 0:
			scrollTop = Math.round(element.scrollTop);
			scrollLeft = Math.round(element.scrollLeft);
			if (scrollTop || scrollLeft) transaction.scope.elementsScrollPositions.set(element, {
				scrollTop,
				scrollLeft
			});
			break;
		case 1: if (transaction.scope.elementsScrollPositions.has(element)) ({scrollTop, scrollLeft} = transaction.scope.elementsScrollPositions.get(element));
	}
	if (scrollLeft) attrs.rr_scrollLeft = scrollLeft;
	if (scrollTop) attrs.rr_scrollTop = scrollTop;
	return attrs;
}
function getCssRulesString(cssStyleSheet) {
	if (!cssStyleSheet) return null;
	let rules;
	try {
		rules = cssStyleSheet.rules || cssStyleSheet.cssRules;
	} catch (_a) {}
	if (!rules) return null;
	return switchToAbsoluteUrl(Array.from(rules, isSafari() ? getCssRuleStringForSafari : getCssRuleString).join(""), cssStyleSheet.href);
}
function getCssRuleStringForSafari(rule) {
	if (isCSSStyleRule(rule) && rule.selectorText.includes(":")) return rule.cssText.replace(/(\[[\w-]+[^\\])(:[^\]]+\])/g, "$1\\$2");
	return getCssRuleString(rule);
}
function getCssRuleString(rule) {
	return isCSSImportRule(rule) && getCssRulesString(rule.styleSheet) || rule.cssText;
}
function isCSSImportRule(rule) {
	return "styleSheet" in rule;
}
function isCSSStyleRule(rule) {
	return "selectorText" in rule;
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-rum@6.33.0_@datadog+browser-logs@6.33.0/node_modules/@datadog/browser-rum/esm/domain/record/serialization/serializeNode.js
function serializeNode(node, parentNodePrivacyLevel, transaction) {
	switch (node.nodeType) {
		case node.DOCUMENT_NODE: return serializeDocumentNode(node, parentNodePrivacyLevel, transaction);
		case node.DOCUMENT_FRAGMENT_NODE: return serializeDocumentFragmentNode(node, parentNodePrivacyLevel, transaction);
		case node.DOCUMENT_TYPE_NODE: return serializeDocumentTypeNode(node, transaction);
		case node.ELEMENT_NODE: return serializeElementNode(node, parentNodePrivacyLevel, transaction);
		case node.TEXT_NODE: return serializeTextNode(node, parentNodePrivacyLevel, transaction);
		case node.CDATA_SECTION_NODE: return serializeCDataNode(node, transaction);
		default: return null;
	}
}
function serializeChildNodes(node, parentNodePrivacyLevel, transaction) {
	const result = [];
	forEachChildNodes(node, (childNode) => {
		const serializedChildNode = serializeNode(childNode, parentNodePrivacyLevel, transaction);
		if (serializedChildNode) result.push(serializedChildNode);
	});
	return result;
}
function serializeDocumentNode(document, parentNodePrivacyLevel, transaction) {
	return {
		type: NodeType.Document,
		id: transaction.assignId(document),
		childNodes: serializeChildNodes(document, parentNodePrivacyLevel, transaction),
		adoptedStyleSheets: serializeStyleSheets(document.adoptedStyleSheets, transaction)
	};
}
function serializeDocumentFragmentNode(element, parentNodePrivacyLevel, transaction) {
	const isShadowRoot = isNodeShadowRoot(element);
	if (isShadowRoot) transaction.scope.shadowRootsController.addShadowRoot(element, transaction.scope);
	return {
		type: NodeType.DocumentFragment,
		id: transaction.assignId(element),
		childNodes: serializeChildNodes(element, parentNodePrivacyLevel, transaction),
		isShadowRoot,
		adoptedStyleSheets: isShadowRoot ? serializeStyleSheets(element.adoptedStyleSheets, transaction) : void 0
	};
}
function serializeDocumentTypeNode(documentType, transaction) {
	return {
		type: NodeType.DocumentType,
		id: transaction.assignId(documentType),
		name: documentType.name,
		publicId: documentType.publicId,
		systemId: documentType.systemId
	};
}
/**
* Serializing Element nodes involves capturing:
* 1. HTML ATTRIBUTES:
* 2. JS STATE:
* - scroll offsets
* - Form fields (input value, checkbox checked, option selection, range)
* - Canvas state,
* - Media (video/audio) play mode + currentTime
* - iframe contents
* - webcomponents
* 3. CUSTOM PROPERTIES:
* - height+width for when `hidden` to cover the element
* 4. EXCLUDED INTERACTION STATE:
* - focus (possible, but not worth perf impact)
* - hover (tracked only via mouse activity)
* - fullscreen mode
*/
function serializeElementNode(element, parentNodePrivacyLevel, transaction) {
	const tagName = getValidTagName(element.tagName);
	const isSVG = isSVGElement$1(element) || void 0;
	const nodePrivacyLevel = reducePrivacyLevel(getNodeSelfPrivacyLevel(element), parentNodePrivacyLevel);
	if (nodePrivacyLevel === NodePrivacyLevel.HIDDEN) {
		const { width, height } = element.getBoundingClientRect();
		return {
			type: NodeType.Element,
			id: transaction.assignId(element),
			tagName,
			attributes: {
				rr_width: `${width}px`,
				rr_height: `${height}px`,
				[PRIVACY_ATTR_NAME]: PRIVACY_ATTR_VALUE_HIDDEN
			},
			childNodes: [],
			isSVG
		};
	}
	if (nodePrivacyLevel === NodePrivacyLevel.IGNORE) return null;
	const id = transaction.assignId(element);
	const attributes = serializeAttributes(element, nodePrivacyLevel, transaction);
	let childNodes = [];
	if (hasChildNodes(element) && tagName !== "style") childNodes = serializeChildNodes(element, nodePrivacyLevel, transaction);
	return {
		type: NodeType.Element,
		id,
		tagName,
		attributes,
		childNodes,
		isSVG
	};
}
function isSVGElement$1(el) {
	return el.tagName === "svg" || el instanceof SVGElement;
}
__name(isSVGElement$1, "isSVGElement");
/**
* Text Nodes are dependant on Element nodes
* Privacy levels are set on elements so we check the parentElement of a text node
* for privacy level.
*/
function serializeTextNode(textNode, parentNodePrivacyLevel, transaction) {
	const textContent = getTextContent(textNode, parentNodePrivacyLevel);
	if (textContent === void 0) return null;
	return {
		type: NodeType.Text,
		id: transaction.assignId(textNode),
		textContent
	};
}
function serializeCDataNode(node, transaction) {
	return {
		type: NodeType.CDATA,
		id: transaction.assignId(node),
		textContent: ""
	};
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-rum@6.33.0_@datadog+browser-logs@6.33.0/node_modules/@datadog/browser-rum/esm/domain/record/serialization/serializationStats.js
function createSerializationStats() {
	return {
		cssText: {
			count: 0,
			max: 0,
			sum: 0
		},
		serializationDuration: {
			count: 0,
			max: 0,
			sum: 0
		}
	};
}
function updateSerializationStats(stats, metric, value) {
	stats[metric].count += 1;
	stats[metric].max = Math.max(stats[metric].max, value);
	stats[metric].sum += value;
}
function aggregateSerializationStats(aggregateStats, stats) {
	for (const metric of ["cssText", "serializationDuration"]) {
		aggregateStats[metric].count += stats[metric].count;
		aggregateStats[metric].max = Math.max(aggregateStats[metric].max, stats[metric].max);
		aggregateStats[metric].sum += stats[metric].sum;
	}
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-rum@6.33.0_@datadog+browser-logs@6.33.0/node_modules/@datadog/browser-rum/esm/domain/record/serialization/changeEncoder.js
function createChangeEncoder(stringIds) {
	let pendingChanges = {};
	const convertStringsToStringReferences = (array) => {
		for (let index = 0, length = array.length; index < length; index++) {
			const item = array[index];
			if (typeof item === "string") {
				const previousSize = stringIds.size;
				array[index] = stringIds.getOrInsert(item);
				if (stringIds.size > previousSize) add(ChangeType.AddString, item);
			} else if (Array.isArray(item)) convertStringsToStringReferences(item);
		}
	};
	const add = (type, data) => {
		if (!(type in pendingChanges)) pendingChanges[type] = [type];
		if (type !== ChangeType.AddString && Array.isArray(data)) convertStringsToStringReferences(data);
		pendingChanges[type].push(data);
	};
	const flush = () => {
		const changes = [];
		[
			ChangeType.AddString,
			ChangeType.AddNode,
			ChangeType.RemoveNode,
			ChangeType.Attribute,
			ChangeType.Text,
			ChangeType.Size,
			ChangeType.ScrollPosition,
			ChangeType.AddStyleSheet,
			ChangeType.AttachedStyleSheets,
			ChangeType.MediaPlaybackState,
			ChangeType.VisualViewport
		].forEach((changeType) => {
			const change = pendingChanges[changeType];
			if (change) changes.push(change);
		});
		pendingChanges = {};
		return changes;
	};
	return {
		add,
		flush
	};
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-rum@6.33.0_@datadog+browser-logs@6.33.0/node_modules/@datadog/browser-rum/esm/domain/record/serialization/serializationTransaction.js
/**
* Perform serialization within a transaction. At the end of the transaction, the
* generated records and statistics will be emitted.
*/
function serializeInTransaction(kind, emitRecord, emitStats, scope, serialize) {
	const records = [];
	const stats = createSerializationStats();
	const transaction = {
		add(record) {
			records.push(record);
		},
		addMetric(metric, value) {
			updateSerializationStats(stats, metric, value);
		},
		assignId(node) {
			const id = scope.nodeIds.getOrInsert(node);
			if (transaction.serializedNodeIds) transaction.serializedNodeIds.add(id);
			return id;
		},
		kind,
		scope
	};
	const start = timeStampNow();
	serialize(transaction);
	updateSerializationStats(stats, "serializationDuration", elapsed(start, timeStampNow()));
	for (const record of records) emitRecord(record);
	emitStats(stats);
}
function serializeChangesInTransaction(kind, emitRecord, emitStats, scope, timestamp, serialize) {
	const encoder = createChangeEncoder(scope.stringIds);
	const stats = createSerializationStats();
	const transaction = {
		addMetric(metric, value) {
			updateSerializationStats(stats, metric, value);
		},
		addNode(...change) {
			encoder.add(ChangeType.AddNode, change);
		},
		addStyleSheet(rules, mediaList, disabled) {
			if (disabled) encoder.add(ChangeType.AddStyleSheet, [
				rules,
				mediaList || [],
				disabled
			]);
			else if (mediaList) encoder.add(ChangeType.AddStyleSheet, [rules, mediaList]);
			else encoder.add(ChangeType.AddStyleSheet, [rules]);
		},
		attachStyleSheets(nodeId, sheetIds) {
			const change = [nodeId];
			for (const sheetId of sheetIds) change.push(sheetId);
			encoder.add(ChangeType.AttachedStyleSheets, change);
		},
		removeNode(nodeId) {
			encoder.add(ChangeType.RemoveNode, nodeId);
		},
		setAttributes(change) {
			encoder.add(ChangeType.Attribute, change);
		},
		setMediaPlaybackState(nodeId, state) {
			encoder.add(ChangeType.MediaPlaybackState, [nodeId, state]);
		},
		setScrollPosition(nodeId, x, y) {
			encoder.add(ChangeType.ScrollPosition, [
				nodeId,
				x,
				y
			]);
		},
		setSize(nodeId, width, height) {
			encoder.add(ChangeType.Size, [
				nodeId,
				width,
				height
			]);
		},
		setText(nodeId, content) {
			encoder.add(ChangeType.Text, [nodeId, content]);
		},
		kind,
		scope
	};
	const start = timeStampNow();
	serialize(transaction);
	updateSerializationStats(stats, "serializationDuration", elapsed(start, timeStampNow()));
	const changes = encoder.flush();
	if (changes.length > 0) {
		if (kind === 0 || kind === 1) emitRecord({
			data: changes,
			format: SnapshotFormat.Change,
			type: RecordType.FullSnapshot,
			timestamp
		});
		else emitRecord({
			data: changes,
			type: RecordType.Change,
			timestamp
		});
	}
	emitStats(stats);
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-rum@6.33.0_@datadog+browser-logs@6.33.0/node_modules/@datadog/browser-rum/esm/domain/record/serialization/serializeFullSnapshot.js
function serializeFullSnapshot(timestamp, kind, document, emitRecord, emitStats, scope) {
	serializeInTransaction(kind, emitRecord, emitStats, scope, (transaction) => {
		const defaultPrivacyLevel = transaction.scope.configuration.defaultPrivacyLevel;
		const record = {
			data: {
				node: serializeNode(document, defaultPrivacyLevel, transaction),
				initialOffset: {
					left: getScrollX(),
					top: getScrollY()
				}
			},
			format: SnapshotFormat.V1,
			type: RecordType.FullSnapshot,
			timestamp
		};
		transaction.add(record);
		scope.serializeObservable.notify({
			type: "full",
			kind,
			target: document,
			timestamp,
			v1: record
		});
	});
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-rum@6.33.0_@datadog+browser-logs@6.33.0/node_modules/@datadog/browser-rum/esm/domain/record/serialization/serializeNodeAsChange.js
function serializeNodeAsChange(cursor, node, parentPrivacyLevel, transaction) {
	var _a;
	if (((_a = node.parentNode) === null || _a === void 0 ? void 0 : _a.nodeName) === "STYLE") return;
	if (parentPrivacyLevel === NodePrivacyLevel.HIDDEN || parentPrivacyLevel === NodePrivacyLevel.IGNORE) return;
	let privacyLevel;
	const selfPrivacyLevel = getNodeSelfPrivacyLevel(node);
	if (selfPrivacyLevel) privacyLevel = reducePrivacyLevel(selfPrivacyLevel, parentPrivacyLevel);
	else privacyLevel = parentPrivacyLevel;
	if (privacyLevel === NodePrivacyLevel.HIDDEN) {
		serializeHiddenNodePlaceholder(cursor, node, transaction);
		return;
	}
	if (privacyLevel === NodePrivacyLevel.IGNORE) return;
	switch (node.nodeType) {
		case node.CDATA_SECTION_NODE:
			serializeCDataNodeAsChange(cursor, node, transaction);
			break;
		case node.DOCUMENT_NODE:
			serializeDocumentNodeAsChange(cursor, node, transaction);
			break;
		case node.DOCUMENT_FRAGMENT_NODE:
			serializeDocumentFragmentNodeAsChange(cursor, node, transaction);
			break;
		case node.DOCUMENT_TYPE_NODE:
			serializeDocumentTypeNodeAsChange(cursor, node, transaction);
			break;
		case node.ELEMENT_NODE:
			serializeElementNodeAsChange(cursor, node, privacyLevel, transaction);
			break;
		case node.TEXT_NODE:
			serializeTextNodeAsChange(cursor, node, privacyLevel, transaction);
			break;
		default: return;
	}
	switch (node.nodeType) {
		case node.CDATA_SECTION_NODE:
		case node.DOCUMENT_TYPE_NODE:
		case node.TEXT_NODE: return;
	}
	cursor.descend();
	forEachChildNodes(node, (childNode) => {
		serializeNodeAsChange(cursor, childNode, privacyLevel, transaction);
	});
	cursor.ascend();
}
function serializeDocumentNodeAsChange(cursor, document, transaction) {
	const { nodeId, insertionPoint } = cursor.advance(document);
	transaction.addNode(insertionPoint, "#document");
	transaction.setScrollPosition(nodeId, getScrollX(), getScrollY());
	serializeStyleSheetsAsChange(document.adoptedStyleSheets, nodeId, transaction);
}
function serializeDocumentFragmentNodeAsChange(cursor, documentFragment, transaction) {
	const { nodeId, insertionPoint } = cursor.advance(documentFragment);
	if (!isNodeShadowRoot(documentFragment)) {
		transaction.addNode(insertionPoint, "#document-fragment");
		return;
	}
	transaction.addNode(insertionPoint, "#shadow-root");
	transaction.scope.shadowRootsController.addShadowRoot(documentFragment, transaction.scope);
	serializeStyleSheetsAsChange(documentFragment.adoptedStyleSheets, nodeId, transaction);
}
function serializeDocumentTypeNodeAsChange(cursor, documentType, transaction) {
	const { insertionPoint } = cursor.advance(documentType);
	transaction.addNode(insertionPoint, "#doctype", documentType.name, documentType.publicId, documentType.systemId);
}
function serializeElementNodeAsChange(cursor, element, privacyLevel, transaction) {
	const { nodeId, insertionPoint } = cursor.advance(element);
	const domAttributes = Object.entries(serializeDOMAttributes(element, privacyLevel, transaction));
	transaction.addNode(insertionPoint, encodedElementName(element), ...domAttributes);
	const { _cssText: cssText, rr_mediaState: mediaState, rr_scrollLeft: scrollLeft, rr_scrollTop: scrollTop } = serializeVirtualAttributes(element, privacyLevel, transaction);
	const linkOrStyle = element;
	if (cssText !== void 0 && linkOrStyle.sheet) {
		const sheetId = transaction.scope.styleSheetIds.getOrInsert(linkOrStyle.sheet);
		transaction.addStyleSheet(cssText);
		transaction.attachStyleSheets(nodeId, [sheetId]);
	}
	if (mediaState === "played") transaction.setMediaPlaybackState(nodeId, MediaInteractionType.Play);
	else if (mediaState === "paused") transaction.setMediaPlaybackState(nodeId, MediaInteractionType.Pause);
	if (scrollLeft !== void 0 || scrollTop !== void 0) transaction.setScrollPosition(nodeId, scrollLeft || 0, scrollTop || 0);
}
function serializeTextNodeAsChange(cursor, textNode, privacyLevel, transaction) {
	const textContent = getTextContent(textNode, privacyLevel);
	if (textContent === void 0) return;
	const { insertionPoint } = cursor.advance(textNode);
	transaction.addNode(insertionPoint, "#text", textContent);
}
function serializeCDataNodeAsChange(cursor, cdataNode, transaction) {
	const { insertionPoint } = cursor.advance(cdataNode);
	transaction.addNode(insertionPoint, "#cdata-section");
}
function serializeHiddenNodePlaceholder(cursor, node, transaction) {
	if (!isElementNode(node)) return;
	const { nodeId, insertionPoint } = cursor.advance(node);
	transaction.addNode(insertionPoint, encodedElementName(node), [PRIVACY_ATTR_NAME, PRIVACY_ATTR_VALUE_HIDDEN]);
	const { width, height } = node.getBoundingClientRect();
	transaction.setSize(nodeId, width, height);
}
function serializeStyleSheetsAsChange(sheets, nodeId, transaction) {
	if (!sheets || sheets.length === 0) return;
	transaction.attachStyleSheets(nodeId, sheets.map((sheet) => serializeStyleSheetAsChange(sheet, transaction)));
}
function serializeStyleSheetAsChange(sheet, transaction) {
	const rules = Array.from(sheet.cssRules || sheet.rules, (rule) => rule.cssText);
	const mediaList = sheet.media.length > 0 ? Array.from(sheet.media) : void 0;
	transaction.addMetric("cssText", rules.reduce((totalLength, rule) => totalLength + rule.length, 0));
	transaction.addStyleSheet(rules, mediaList, sheet.disabled);
	return transaction.scope.styleSheetIds.getOrInsert(sheet);
}
function encodedElementName(element) {
	const nodeName = element.nodeName;
	if (isSVGElement(element)) return `svg>${nodeName}`;
	return nodeName;
}
function isSVGElement(element) {
	return element.namespaceURI === "http://www.w3.org/2000/svg";
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-rum@6.33.0_@datadog+browser-logs@6.33.0/node_modules/@datadog/browser-rum/esm/domain/record/serialization/serializeFullSnapshotAsChange.js
function serializeFullSnapshotAsChange(timestamp, kind, document, emitRecord, emitStats, scope) {
	scope.resetIds();
	serializeChangesInTransaction(kind, emitRecord, emitStats, scope, timestamp, (transaction) => {
		serializeNodeAsChange(createRootInsertionCursor(scope.nodeIds), document, scope.configuration.defaultPrivacyLevel, transaction);
	});
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-rum@6.33.0_@datadog+browser-logs@6.33.0/node_modules/@datadog/browser-rum/esm/domain/record/assembly.js
function assembleIncrementalSnapshot(source, data, timestamp = timeStampNow()) {
	return {
		data: {
			source,
			...data
		},
		type: RecordType.IncrementalSnapshot,
		timestamp
	};
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-rum@6.33.0_@datadog+browser-logs@6.33.0/node_modules/@datadog/browser-rum/esm/domain/record/serialization/serializeMutations.js
function serializeMutations(timestamp, mutations, emitRecord, emitStats, scope) {
	serializeInTransaction(2, emitRecord, emitStats, scope, (transaction) => processMutations$1(timestamp, mutations, transaction));
}
function processMutations$1(timestamp, mutations, transaction) {
	const nodePrivacyLevelCache = /* @__PURE__ */ new Map();
	mutations.filter((mutation) => mutation.type === "childList").forEach((mutation) => {
		mutation.removedNodes.forEach((removedNode) => {
			traverseRemovedShadowDom(removedNode, transaction.scope.shadowRootsController.removeShadowRoot);
		});
	});
	const filteredMutations = mutations.filter((mutation) => mutation.target.isConnected && idsAreAssignedForNodeAndAncestors(mutation.target, transaction.scope.nodeIds) && getNodePrivacyLevel(mutation.target, transaction.scope.configuration.defaultPrivacyLevel, nodePrivacyLevelCache) !== NodePrivacyLevel.HIDDEN);
	const { adds, removes, hasBeenSerialized } = processChildListMutations(filteredMutations.filter((mutation) => mutation.type === "childList"), nodePrivacyLevelCache, transaction);
	const texts = processCharacterDataMutations$1(filteredMutations.filter((mutation) => mutation.type === "characterData" && !hasBeenSerialized(mutation.target)), nodePrivacyLevelCache, transaction);
	const attributes = processAttributesMutations(filteredMutations.filter((mutation) => mutation.type === "attributes" && !hasBeenSerialized(mutation.target)), nodePrivacyLevelCache, transaction);
	if (!texts.length && !attributes.length && !removes.length && !adds.length) return;
	const record = assembleIncrementalSnapshot(IncrementalSource.Mutation, {
		adds,
		removes,
		texts,
		attributes
	}, timestamp);
	transaction.add(record);
	transaction.scope.serializeObservable.notify({
		type: "incremental",
		target: mutations,
		timestamp,
		v1: record
	});
}
__name(processMutations$1, "processMutations");
function processChildListMutations(mutations, nodePrivacyLevelCache, transaction) {
	const addedAndMovedNodes = /* @__PURE__ */ new Set();
	const removedNodes = /* @__PURE__ */ new Map();
	for (const mutation of mutations) {
		mutation.addedNodes.forEach((node) => {
			addedAndMovedNodes.add(node);
		});
		mutation.removedNodes.forEach((node) => {
			if (!addedAndMovedNodes.has(node)) removedNodes.set(node, mutation.target);
			addedAndMovedNodes.delete(node);
		});
	}
	const sortedAddedAndMovedNodes = Array.from(addedAndMovedNodes);
	sortAddedAndMovedNodes(sortedAddedAndMovedNodes);
	transaction.serializedNodeIds = /* @__PURE__ */ new Set();
	const addedNodeMutations = [];
	for (const node of sortedAddedAndMovedNodes) {
		if (hasBeenSerialized(node)) continue;
		const parentNodePrivacyLevel = getNodePrivacyLevel(node.parentNode, transaction.scope.configuration.defaultPrivacyLevel, nodePrivacyLevelCache);
		if (parentNodePrivacyLevel === NodePrivacyLevel.HIDDEN || parentNodePrivacyLevel === NodePrivacyLevel.IGNORE) continue;
		const serializedNode = serializeNode(node, parentNodePrivacyLevel, transaction);
		if (!serializedNode) continue;
		const parentNode = getParentNode(node);
		addedNodeMutations.push({
			nextId: getNextSibling(node),
			parentId: transaction.scope.nodeIds.get(parentNode),
			node: serializedNode
		});
	}
	const removedNodeMutations = [];
	removedNodes.forEach((parent, node) => {
		const parentId = transaction.scope.nodeIds.get(parent);
		const id = transaction.scope.nodeIds.get(node);
		if (parentId !== void 0 && id !== void 0) removedNodeMutations.push({
			parentId,
			id
		});
	});
	return {
		adds: addedNodeMutations,
		removes: removedNodeMutations,
		hasBeenSerialized
	};
	function hasBeenSerialized(node) {
		var _a;
		const id = transaction.scope.nodeIds.get(node);
		return id !== void 0 && ((_a = transaction.serializedNodeIds) === null || _a === void 0 ? void 0 : _a.has(id));
	}
	function getNextSibling(node) {
		let nextSibling = node.nextSibling;
		while (nextSibling) {
			const id = transaction.scope.nodeIds.get(nextSibling);
			if (id !== void 0) return id;
			nextSibling = nextSibling.nextSibling;
		}
		return null;
	}
}
function processCharacterDataMutations$1(mutations, nodePrivacyLevelCache, transaction) {
	var _a;
	const textMutations = [];
	const handledNodes = /* @__PURE__ */ new Set();
	const filteredMutations = mutations.filter((mutation) => {
		if (handledNodes.has(mutation.target)) return false;
		handledNodes.add(mutation.target);
		return true;
	});
	for (const mutation of filteredMutations) {
		if (mutation.target.textContent === mutation.oldValue) continue;
		const id = transaction.scope.nodeIds.get(mutation.target);
		if (id === void 0) continue;
		const parentNodePrivacyLevel = getNodePrivacyLevel(getParentNode(mutation.target), transaction.scope.configuration.defaultPrivacyLevel, nodePrivacyLevelCache);
		if (parentNodePrivacyLevel === NodePrivacyLevel.HIDDEN || parentNodePrivacyLevel === NodePrivacyLevel.IGNORE) continue;
		textMutations.push({
			id,
			value: (_a = getTextContent(mutation.target, parentNodePrivacyLevel)) !== null && _a !== void 0 ? _a : null
		});
	}
	return textMutations;
}
__name(processCharacterDataMutations$1, "processCharacterDataMutations");
function processAttributesMutations(mutations, nodePrivacyLevelCache, transaction) {
	const attributeMutations = [];
	const handledElements = /* @__PURE__ */ new Map();
	const filteredMutations = mutations.filter((mutation) => {
		const handledAttributes = handledElements.get(mutation.target);
		if (handledAttributes && handledAttributes.has(mutation.attributeName)) return false;
		if (!handledAttributes) handledElements.set(mutation.target, /* @__PURE__ */ new Set([mutation.attributeName]));
		else handledAttributes.add(mutation.attributeName);
		return true;
	});
	const emittedMutations = /* @__PURE__ */ new Map();
	for (const mutation of filteredMutations) {
		if (mutation.target.getAttribute(mutation.attributeName) === mutation.oldValue) continue;
		const id = transaction.scope.nodeIds.get(mutation.target);
		if (id === void 0) continue;
		const privacyLevel = getNodePrivacyLevel(mutation.target, transaction.scope.configuration.defaultPrivacyLevel, nodePrivacyLevelCache);
		const attributeValue = serializeAttribute(mutation.target, privacyLevel, mutation.attributeName, transaction.scope.configuration);
		let transformedValue;
		if (mutation.attributeName === "value") {
			const inputValue = getElementInputValue(mutation.target, privacyLevel);
			if (inputValue === void 0) continue;
			transformedValue = inputValue;
		} else if (typeof attributeValue === "string") transformedValue = attributeValue;
		else transformedValue = null;
		let emittedMutation = emittedMutations.get(mutation.target);
		if (!emittedMutation) {
			emittedMutation = {
				id,
				attributes: {}
			};
			attributeMutations.push(emittedMutation);
			emittedMutations.set(mutation.target, emittedMutation);
		}
		emittedMutation.attributes[mutation.attributeName] = transformedValue;
	}
	return attributeMutations;
}
function sortAddedAndMovedNodes(nodes) {
	nodes.sort((a, b) => {
		const position = a.compareDocumentPosition(b);
		if (position & Node.DOCUMENT_POSITION_CONTAINED_BY) return -1;
		else if (position & Node.DOCUMENT_POSITION_CONTAINS) return 1;
		else if (position & Node.DOCUMENT_POSITION_FOLLOWING) return 1;
		else if (position & Node.DOCUMENT_POSITION_PRECEDING) return -1;
		return 0;
	});
}
function traverseRemovedShadowDom(removedNode, shadowDomRemovedCallback) {
	if (isNodeShadowHost(removedNode)) shadowDomRemovedCallback(removedNode.shadowRoot);
	forEachChildNodes(removedNode, (childNode) => traverseRemovedShadowDom(childNode, shadowDomRemovedCallback));
}
function idsAreAssignedForNodeAndAncestors(node, nodeIds) {
	let current = node;
	while (current) {
		if (nodeIds.get(current) === void 0 && !isNodeShadowRoot(current)) return false;
		current = getParentNode(current);
	}
	return true;
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-rum@6.33.0_@datadog+browser-logs@6.33.0/node_modules/@datadog/browser-rum/esm/domain/record/serialization/serializeMutationsAsChange.js
function serializeMutationsAsChange(timestamp, mutations, emitRecord, emitStats, scope) {
	serializeChangesInTransaction(2, emitRecord, emitStats, scope, timestamp, (transaction) => processMutations(mutations, transaction));
}
function processMutations(mutations, transaction) {
	const addedNodes = /* @__PURE__ */ new Set();
	const attributeMutations = /* @__PURE__ */ new Map();
	const characterDataMutations = /* @__PURE__ */ new Map();
	const removedNodes = /* @__PURE__ */ new Set();
	for (const mutation of mutations) switch (mutation.type) {
		case "attributes": {
			const node = mutation.target;
			let attributes = attributeMutations.get(node);
			if (!attributes) {
				attributes = /* @__PURE__ */ new Map();
				attributeMutations.set(node, attributes);
			}
			const attributeName = mutation.attributeName;
			if (!attributes.has(attributeName)) attributes.set(attributeName, mutation.oldValue);
			break;
		}
		case "characterData":
			if (!characterDataMutations.has(mutation.target)) characterDataMutations.set(mutation.target, mutation.oldValue);
			break;
		case "childList":
			for (let index = 0; index < mutation.addedNodes.length; index++) addedNodes.add(mutation.addedNodes[index]);
			for (let index = 0; index < mutation.removedNodes.length; index++) removedNodes.add(mutation.removedNodes[index]);
	}
	const firstNewNodeId = transaction.scope.nodeIds.nextId;
	const nodePrivacyLevelCache = /* @__PURE__ */ new Map();
	processRemovedNodes(removedNodes, transaction);
	processAddedNodes(addedNodes, nodePrivacyLevelCache, transaction);
	processCharacterDataMutations(characterDataMutations, firstNewNodeId, nodePrivacyLevelCache, transaction);
	processAttributeMutations(attributeMutations, firstNewNodeId, nodePrivacyLevelCache, transaction);
}
function processRemovedNodes(nodes, transaction) {
	const nodeIds = transaction.scope.nodeIds;
	for (const node of nodes) {
		const nodeId = nodeIds.get(node);
		if (nodeId === void 0) continue;
		forNodeAndDescendants(node, (node) => {
			if (isNodeShadowHost(node)) transaction.scope.shadowRootsController.removeShadowRoot(node.shadowRoot);
			nodeIds.delete(node);
		});
		transaction.removeNode(nodeId);
	}
}
function processAddedNodes(nodes, nodePrivacyLevelCache, transaction) {
	const nodeIds = transaction.scope.nodeIds;
	for (const node of nodes) {
		if (!node.isConnected) continue;
		if (nodeIds.get(node) !== void 0) continue;
		const parentNode = getParentNode(node);
		if (!parentNode) continue;
		const parentId = nodeIds.get(parentNode);
		if (parentId === void 0) continue;
		const parentNodePrivacyLevel = getNodePrivacyLevel(parentNode, transaction.scope.configuration.defaultPrivacyLevel, nodePrivacyLevelCache);
		serializeNodeAsChange(createChildInsertionCursor(parentId, getNextSiblingId(node, nodeIds), nodeIds), node, parentNodePrivacyLevel, transaction);
	}
}
function processCharacterDataMutations(mutations, firstNewNodeId, nodePrivacyLevelCache, transaction) {
	var _a;
	const nodeIds = transaction.scope.nodeIds;
	for (const [node, oldValue] of mutations) {
		if (node.textContent === oldValue) continue;
		if (!node.isConnected) continue;
		const nodeId = nodeIds.get(node);
		if (nodeId === void 0) continue;
		if (nodeId >= firstNewNodeId) continue;
		const parentNode = getParentNode(node);
		if (!parentNode) continue;
		const parentNodePrivacyLevel = getNodePrivacyLevel(parentNode, transaction.scope.configuration.defaultPrivacyLevel, nodePrivacyLevelCache);
		if (parentNodePrivacyLevel === NodePrivacyLevel.HIDDEN || parentNodePrivacyLevel === NodePrivacyLevel.IGNORE) continue;
		const content = (_a = getTextContent(node, parentNodePrivacyLevel)) !== null && _a !== void 0 ? _a : "";
		transaction.setText(nodeId, content);
	}
}
function processAttributeMutations(mutations, firstNewNodeId, nodePrivacyLevelCache, transaction) {
	const nodeIds = transaction.scope.nodeIds;
	for (const [node, attributeNames] of mutations) {
		if (!node.isConnected) continue;
		const nodeId = nodeIds.get(node);
		if (nodeId === void 0) continue;
		if (nodeId >= firstNewNodeId) continue;
		const privacyLevel = getNodePrivacyLevel(node, transaction.scope.configuration.defaultPrivacyLevel, nodePrivacyLevelCache);
		if (privacyLevel === NodePrivacyLevel.HIDDEN || privacyLevel === NodePrivacyLevel.IGNORE) continue;
		const change = [nodeId];
		for (const [attributeName, oldValue] of attributeNames) {
			if (node.getAttribute(attributeName) === oldValue) continue;
			if (attributeName === "value") {
				const attributeValue = getElementInputValue(node, privacyLevel);
				if (attributeValue !== void 0) change.push([attributeName, attributeValue]);
				continue;
			}
			const attributeValue = serializeAttribute(node, privacyLevel, attributeName, transaction.scope.configuration);
			if (attributeValue === null) change.push([attributeName]);
			else change.push([attributeName, attributeValue]);
		}
		if (change.length > 1) transaction.setAttributes(change);
	}
}
function getNextSiblingId(node, nodeIds) {
	let nextSibling = node.nextSibling;
	while (nextSibling) {
		const id = nodeIds.get(nextSibling);
		if (id !== void 0) return id;
		nextSibling = nextSibling.nextSibling;
	}
}
function forNodeAndDescendants(node, action) {
	action(node);
	forEachChildNodes(node, (childNode) => forNodeAndDescendants(childNode, action));
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-rum@6.33.0_@datadog+browser-logs@6.33.0/node_modules/@datadog/browser-rum/esm/domain/record/viewports.js
/**
* Browsers have not standardized various dimension properties. Mobile devices typically report
* dimensions in reference to the visual viewport, while desktop uses the layout viewport. For example,
* Mobile Chrome will change innerWidth when a pinch zoom takes place, while Chrome Desktop (mac) will not.
*
* With the new Viewport API, we now calculate and normalize dimension properties to the layout viewport.
* If the VisualViewport API is not supported by a browser, it isn't reasonably possible to detect or normalize
* which viewport is being measured. Therefore these exported functions will fallback to assuming that the layout
* viewport is being measured by the browser
*/
var TOLERANCE = 25;
/**
* Use the Visual Viewport API's properties to measure scrollX/Y in reference to the layout viewport
* in order to determine if window.scrollX/Y is measuring the layout or visual viewport.
* This finding corresponds to which viewport mouseEvent.clientX/Y and window.innerWidth/Height measures.
*/
function isVisualViewportFactoredIn(visualViewport) {
	return Math.abs(visualViewport.pageTop - visualViewport.offsetTop - window.scrollY) > TOLERANCE || Math.abs(visualViewport.pageLeft - visualViewport.offsetLeft - window.scrollX) > TOLERANCE;
}
var convertMouseEventToLayoutCoordinates = (clientX, clientY) => {
	const visualViewport = window.visualViewport;
	const normalized = {
		layoutViewportX: clientX,
		layoutViewportY: clientY,
		visualViewportX: clientX,
		visualViewportY: clientY
	};
	if (!visualViewport) return normalized;
	else if (isVisualViewportFactoredIn(visualViewport)) {
		normalized.layoutViewportX = Math.round(clientX + visualViewport.offsetLeft);
		normalized.layoutViewportY = Math.round(clientY + visualViewport.offsetTop);
	} else {
		normalized.visualViewportX = Math.round(clientX - visualViewport.offsetLeft);
		normalized.visualViewportY = Math.round(clientY - visualViewport.offsetTop);
	}
	return normalized;
};
var getVisualViewport = (visualViewport) => ({
	scale: visualViewport.scale,
	offsetLeft: visualViewport.offsetLeft,
	offsetTop: visualViewport.offsetTop,
	pageLeft: visualViewport.pageLeft,
	pageTop: visualViewport.pageTop,
	height: visualViewport.height,
	width: visualViewport.width
});
//#endregion
//#region node_modules/.pnpm/@datadog+browser-rum@6.33.0_@datadog+browser-logs@6.33.0/node_modules/@datadog/browser-rum/esm/domain/record/startFullSnapshots.js
function startFullSnapshots(lifeCycle, emitRecord, emitStats, flushMutations, scope, serialize = defaultSerializeFullSnapshotCallback()) {
	takeFullSnapshot(timeStampNow(), 0, emitRecord, emitStats, scope, serialize);
	const { unsubscribe } = lifeCycle.subscribe(2, (view) => {
		flushMutations();
		takeFullSnapshot(view.startClocks.timeStamp, 1, emitRecord, emitStats, scope, serialize);
	});
	return { stop: unsubscribe };
}
function takeFullSnapshot(timestamp, kind, emitRecord, emitStats, scope, serialize = defaultSerializeFullSnapshotCallback()) {
	const { width, height } = getViewportDimension();
	emitRecord({
		data: {
			height,
			href: window.location.href,
			width
		},
		type: RecordType.Meta,
		timestamp
	});
	emitRecord({
		data: { has_focus: document.hasFocus() },
		type: RecordType.Focus,
		timestamp
	});
	serialize(timestamp, kind, document, emitRecord, emitStats, scope);
	if (window.visualViewport) emitRecord({
		data: getVisualViewport(window.visualViewport),
		type: RecordType.VisualViewport,
		timestamp
	});
}
function defaultSerializeFullSnapshotCallback() {
	return isFullSnapshotChangeRecordsEnabled() ? serializeFullSnapshotAsChange : serializeFullSnapshot;
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-rum@6.33.0_@datadog+browser-logs@6.33.0/node_modules/@datadog/browser-rum/esm/domain/record/recordingScope.js
function createRecordingScope(configuration, elementsScrollPositions, shadowRootsController) {
	const eventIds = createEventIds();
	const nodeIds = createNodeIds();
	const stringIds = createStringIds();
	const styleSheetIds = createStyleSheetIds();
	const scope = {
		resetIds() {
			scope.eventIds.clear();
			scope.nodeIds.clear();
			scope.stringIds.clear();
			scope.styleSheetIds.clear();
		},
		configuration,
		elementsScrollPositions,
		eventIds,
		nodeIds,
		serializeObservable: new Observable(),
		shadowRootsController,
		stringIds,
		styleSheetIds
	};
	return scope;
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-rum@6.33.0_@datadog+browser-logs@6.33.0/node_modules/@datadog/browser-rum/esm/domain/record/elementsScrollPositions.js
function createElementsScrollPositions() {
	const scrollPositionsByElement = /* @__PURE__ */ new WeakMap();
	return {
		set(element, scrollPositions) {
			if (element === document && !document.scrollingElement) return;
			scrollPositionsByElement.set(element === document ? document.scrollingElement : element, scrollPositions);
		},
		get(element) {
			return scrollPositionsByElement.get(element);
		},
		has(element) {
			return scrollPositionsByElement.has(element);
		}
	};
}
var statsPerView;
function getSegmentsCount(viewId) {
	return getOrCreateReplayStats(viewId).segments_count;
}
function addSegment(viewId) {
	getOrCreateReplayStats(viewId).segments_count += 1;
}
function addRecord(viewId) {
	getOrCreateReplayStats(viewId).records_count += 1;
}
function addWroteData(viewId, additionalBytesCount) {
	getOrCreateReplayStats(viewId).segments_total_raw_size += additionalBytesCount;
}
function getReplayStats(viewId) {
	return statsPerView === null || statsPerView === void 0 ? void 0 : statsPerView.get(viewId);
}
function getOrCreateReplayStats(viewId) {
	if (!statsPerView) statsPerView = /* @__PURE__ */ new Map();
	let replayStats;
	if (statsPerView.has(viewId)) replayStats = statsPerView.get(viewId);
	else {
		replayStats = {
			records_count: 0,
			segments_count: 0,
			segments_total_raw_size: 0
		};
		statsPerView.set(viewId, replayStats);
		if (statsPerView.size > 1e3) deleteOldestStats();
	}
	return replayStats;
}
function deleteOldestStats() {
	if (!statsPerView) return;
	const toDelete = statsPerView.keys().next().value;
	if (toDelete) statsPerView.delete(toDelete);
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-rum@6.33.0_@datadog+browser-logs@6.33.0/node_modules/@datadog/browser-rum/esm/domain/record/eventsUtils.js
function isTouchEvent(event) {
	return Boolean(event.changedTouches);
}
function getEventTarget(event) {
	if (event.composed === true && isNodeShadowHost(event.target)) return event.composedPath()[0];
	return event.target;
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-rum@6.33.0_@datadog+browser-logs@6.33.0/node_modules/@datadog/browser-rum/esm/domain/record/trackers/trackMove.js
var MOUSE_MOVE_OBSERVER_THRESHOLD = 50;
function trackMove(emitRecord, scope) {
	const { throttled: updatePosition, cancel: cancelThrottle } = throttle((event) => {
		const target = getEventTarget(event);
		const id = scope.nodeIds.get(target);
		if (id === void 0) return;
		const coordinates = tryToComputeCoordinates(event);
		if (!coordinates) return;
		const position = {
			id,
			timeOffset: 0,
			x: coordinates.x,
			y: coordinates.y
		};
		emitRecord(assembleIncrementalSnapshot(isTouchEvent(event) ? IncrementalSource.TouchMove : IncrementalSource.MouseMove, { positions: [position] }));
	}, MOUSE_MOVE_OBSERVER_THRESHOLD, { trailing: false });
	const { stop: removeListener } = addEventListeners(scope.configuration, document, ["mousemove", "touchmove"], updatePosition, {
		capture: true,
		passive: true
	});
	return { stop: () => {
		removeListener();
		cancelThrottle();
	} };
}
function tryToComputeCoordinates(event) {
	let { clientX: x, clientY: y } = isTouchEvent(event) ? event.changedTouches[0] : event;
	if (window.visualViewport) {
		const { visualViewportX, visualViewportY } = convertMouseEventToLayoutCoordinates(x, y);
		x = visualViewportX;
		y = visualViewportY;
	}
	if (!Number.isFinite(x) || !Number.isFinite(y)) return;
	return {
		x,
		y
	};
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-rum@6.33.0_@datadog+browser-logs@6.33.0/node_modules/@datadog/browser-rum/esm/domain/record/trackers/trackMouseInteraction.js
var eventTypeToMouseInteraction = {
	["pointerup"]: MouseInteractionType.MouseUp,
	["mousedown"]: MouseInteractionType.MouseDown,
	["click"]: MouseInteractionType.Click,
	["contextmenu"]: MouseInteractionType.ContextMenu,
	["dblclick"]: MouseInteractionType.DblClick,
	["focus"]: MouseInteractionType.Focus,
	["blur"]: MouseInteractionType.Blur,
	["touchstart"]: MouseInteractionType.TouchStart,
	["touchend"]: MouseInteractionType.TouchEnd
};
function trackMouseInteraction(emitRecord, scope) {
	const handler = (event) => {
		const target = getEventTarget(event);
		const id = scope.nodeIds.get(target);
		if (id === void 0 || getNodePrivacyLevel(target, scope.configuration.defaultPrivacyLevel) === NodePrivacyLevel.HIDDEN) return;
		const type = eventTypeToMouseInteraction[event.type];
		let interaction;
		if (type !== MouseInteractionType.Blur && type !== MouseInteractionType.Focus) {
			const coordinates = tryToComputeCoordinates(event);
			if (!coordinates) return;
			interaction = {
				id,
				type,
				x: coordinates.x,
				y: coordinates.y
			};
		} else interaction = {
			id,
			type
		};
		emitRecord({
			id: scope.eventIds.getOrInsert(event),
			...assembleIncrementalSnapshot(IncrementalSource.MouseInteraction, interaction)
		});
	};
	return addEventListeners(scope.configuration, document, Object.keys(eventTypeToMouseInteraction), handler, {
		capture: true,
		passive: true
	});
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-rum@6.33.0_@datadog+browser-logs@6.33.0/node_modules/@datadog/browser-rum/esm/domain/record/trackers/trackScroll.js
var SCROLL_OBSERVER_THRESHOLD = 100;
function trackScroll(target, emitRecord, scope) {
	const { throttled: updatePosition, cancel: cancelThrottle } = throttle((event) => {
		const target = getEventTarget(event);
		if (!target) return;
		const id = scope.nodeIds.get(target);
		if (id === void 0 || getNodePrivacyLevel(target, scope.configuration.defaultPrivacyLevel) === NodePrivacyLevel.HIDDEN) return;
		const scrollPositions = target === document ? {
			scrollTop: getScrollY(),
			scrollLeft: getScrollX()
		} : {
			scrollTop: Math.round(target.scrollTop),
			scrollLeft: Math.round(target.scrollLeft)
		};
		scope.elementsScrollPositions.set(target, scrollPositions);
		emitRecord(assembleIncrementalSnapshot(IncrementalSource.Scroll, {
			id,
			x: scrollPositions.scrollLeft,
			y: scrollPositions.scrollTop
		}));
	}, SCROLL_OBSERVER_THRESHOLD);
	const { stop: removeListener } = addEventListener(scope.configuration, target, "scroll", updatePosition, {
		capture: true,
		passive: true
	});
	return { stop: () => {
		removeListener();
		cancelThrottle();
	} };
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-rum@6.33.0_@datadog+browser-logs@6.33.0/node_modules/@datadog/browser-rum/esm/domain/record/trackers/trackViewportResize.js
var VISUAL_VIEWPORT_OBSERVER_THRESHOLD = 200;
function trackViewportResize(emitRecord, scope) {
	const viewportResizeSubscription = initViewportObservable(scope.configuration).subscribe((data) => {
		emitRecord(assembleIncrementalSnapshot(IncrementalSource.ViewportResize, data));
	});
	return { stop: () => {
		viewportResizeSubscription.unsubscribe();
	} };
}
function trackVisualViewportResize(emitRecord, scope) {
	const visualViewport = window.visualViewport;
	if (!visualViewport) return { stop: noop };
	const { throttled: updateDimension, cancel: cancelThrottle } = throttle(() => {
		emitRecord({
			data: getVisualViewport(visualViewport),
			type: RecordType.VisualViewport,
			timestamp: timeStampNow()
		});
	}, VISUAL_VIEWPORT_OBSERVER_THRESHOLD, { trailing: false });
	const { stop: removeListener } = addEventListeners(scope.configuration, visualViewport, ["resize", "scroll"], updateDimension, {
		capture: true,
		passive: true
	});
	return { stop: () => {
		removeListener();
		cancelThrottle();
	} };
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-rum@6.33.0_@datadog+browser-logs@6.33.0/node_modules/@datadog/browser-rum/esm/domain/record/trackers/trackMediaInteraction.js
function trackMediaInteraction(emitRecord, scope) {
	return addEventListeners(scope.configuration, document, ["play", "pause"], (event) => {
		const target = getEventTarget(event);
		if (!target) return;
		const id = scope.nodeIds.get(target);
		if (id === void 0 || getNodePrivacyLevel(target, scope.configuration.defaultPrivacyLevel) === NodePrivacyLevel.HIDDEN) return;
		emitRecord(assembleIncrementalSnapshot(IncrementalSource.MediaInteraction, {
			id,
			type: event.type === "play" ? MediaInteractionType.Play : MediaInteractionType.Pause
		}));
	}, {
		capture: true,
		passive: true
	});
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-rum@6.33.0_@datadog+browser-logs@6.33.0/node_modules/@datadog/browser-rum/esm/domain/record/trackers/trackStyleSheet.js
function trackStyleSheet(emitRecord, scope) {
	function checkStyleSheetAndCallback(styleSheet, callback) {
		if (!styleSheet || !styleSheet.ownerNode) return;
		const id = scope.nodeIds.get(styleSheet.ownerNode);
		if (id === void 0) return;
		callback(id);
	}
	const instrumentationStoppers = [instrumentMethod(CSSStyleSheet.prototype, "insertRule", ({ target: styleSheet, parameters: [rule, index] }) => {
		checkStyleSheetAndCallback(styleSheet, (id) => emitRecord(assembleIncrementalSnapshot(IncrementalSource.StyleSheetRule, {
			id,
			adds: [{
				rule,
				index
			}]
		})));
	}), instrumentMethod(CSSStyleSheet.prototype, "deleteRule", ({ target: styleSheet, parameters: [index] }) => {
		checkStyleSheetAndCallback(styleSheet, (id) => emitRecord(assembleIncrementalSnapshot(IncrementalSource.StyleSheetRule, {
			id,
			removes: [{ index }]
		})));
	})];
	if (typeof CSSGroupingRule !== "undefined") instrumentGroupingCSSRuleClass(CSSGroupingRule);
	else {
		instrumentGroupingCSSRuleClass(CSSMediaRule);
		instrumentGroupingCSSRuleClass(CSSSupportsRule);
	}
	function instrumentGroupingCSSRuleClass(cls) {
		instrumentationStoppers.push(instrumentMethod(cls.prototype, "insertRule", ({ target: styleSheet, parameters: [rule, index] }) => {
			checkStyleSheetAndCallback(styleSheet.parentStyleSheet, (id) => {
				const path = getPathToNestedCSSRule(styleSheet);
				if (path) {
					path.push(index || 0);
					emitRecord(assembleIncrementalSnapshot(IncrementalSource.StyleSheetRule, {
						id,
						adds: [{
							rule,
							index: path
						}]
					}));
				}
			});
		}), instrumentMethod(cls.prototype, "deleteRule", ({ target: styleSheet, parameters: [index] }) => {
			checkStyleSheetAndCallback(styleSheet.parentStyleSheet, (id) => {
				const path = getPathToNestedCSSRule(styleSheet);
				if (path) {
					path.push(index);
					emitRecord(assembleIncrementalSnapshot(IncrementalSource.StyleSheetRule, {
						id,
						removes: [{ index: path }]
					}));
				}
			});
		}));
	}
	return { stop: () => {
		instrumentationStoppers.forEach((stopper) => stopper.stop());
	} };
}
function getPathToNestedCSSRule(rule) {
	const path = [];
	let currentRule = rule;
	while (currentRule.parentRule) {
		const index = Array.from(currentRule.parentRule.cssRules).indexOf(currentRule);
		path.unshift(index);
		currentRule = currentRule.parentRule;
	}
	if (!currentRule.parentStyleSheet) return;
	const index = Array.from(currentRule.parentStyleSheet.cssRules).indexOf(currentRule);
	path.unshift(index);
	return path;
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-rum@6.33.0_@datadog+browser-logs@6.33.0/node_modules/@datadog/browser-rum/esm/domain/record/trackers/trackFocus.js
function trackFocus(emitRecord, scope) {
	return addEventListeners(scope.configuration, window, ["focus", "blur"], () => {
		emitRecord({
			data: { has_focus: document.hasFocus() },
			type: RecordType.Focus,
			timestamp: timeStampNow()
		});
	});
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-rum@6.33.0_@datadog+browser-logs@6.33.0/node_modules/@datadog/browser-rum/esm/domain/record/trackers/trackViewEnd.js
function trackViewEnd(lifeCycle, emitRecord, flushMutations) {
	const viewEndSubscription = lifeCycle.subscribe(5, () => {
		flushMutations();
		emitRecord({
			timestamp: timeStampNow(),
			type: RecordType.ViewEnd
		});
	});
	return { stop: () => {
		viewEndSubscription.unsubscribe();
	} };
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-rum@6.33.0_@datadog+browser-logs@6.33.0/node_modules/@datadog/browser-rum/esm/domain/record/trackers/trackInput.js
function trackInput(target, emitRecord, scope) {
	const defaultPrivacyLevel = scope.configuration.defaultPrivacyLevel;
	const lastInputStateMap = /* @__PURE__ */ new WeakMap();
	const isShadowRoot = target !== document;
	const { stop: stopEventListeners } = addEventListeners(scope.configuration, target, isShadowRoot ? ["change"] : ["input", "change"], (event) => {
		const target = getEventTarget(event);
		if (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement || target instanceof HTMLSelectElement) onElementChange(target);
	}, {
		capture: true,
		passive: true
	});
	let stopPropertySetterInstrumentation;
	if (!isShadowRoot) {
		const instrumentationStoppers = [
			instrumentSetter(HTMLInputElement.prototype, "value", onElementChange),
			instrumentSetter(HTMLInputElement.prototype, "checked", onElementChange),
			instrumentSetter(HTMLSelectElement.prototype, "value", onElementChange),
			instrumentSetter(HTMLTextAreaElement.prototype, "value", onElementChange),
			instrumentSetter(HTMLSelectElement.prototype, "selectedIndex", onElementChange)
		];
		stopPropertySetterInstrumentation = () => {
			instrumentationStoppers.forEach((stopper) => stopper.stop());
		};
	} else stopPropertySetterInstrumentation = noop;
	return { stop: () => {
		stopPropertySetterInstrumentation();
		stopEventListeners();
	} };
	function onElementChange(target) {
		const nodePrivacyLevel = getNodePrivacyLevel(target, defaultPrivacyLevel);
		if (nodePrivacyLevel === NodePrivacyLevel.HIDDEN) return;
		const type = target.type;
		let inputState;
		if (type === "radio" || type === "checkbox") {
			if (shouldMaskNode(target, nodePrivacyLevel)) return;
			inputState = { isChecked: target.checked };
		} else {
			const value = getElementInputValue(target, nodePrivacyLevel);
			if (value === void 0) return;
			inputState = { text: value };
		}
		createRecordIfStateChanged(target, inputState);
		const name = target.name;
		if (type === "radio" && name && target.checked) document.querySelectorAll(`input[type="radio"][name="${CSS.escape(name)}"]`).forEach((el) => {
			if (el !== target) createRecordIfStateChanged(el, { isChecked: false });
		});
	}
	/**
	* There can be multiple changes on the same node within the same batched mutation observation.
	*/
	function createRecordIfStateChanged(target, inputState) {
		const id = scope.nodeIds.get(target);
		if (id === void 0) return;
		const lastInputState = lastInputStateMap.get(target);
		if (!lastInputState || lastInputState.text !== inputState.text || lastInputState.isChecked !== inputState.isChecked) {
			lastInputStateMap.set(target, inputState);
			emitRecord(assembleIncrementalSnapshot(IncrementalSource.Input, {
				id,
				...inputState
			}));
		}
	}
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-rum@6.33.0_@datadog+browser-logs@6.33.0/node_modules/@datadog/browser-rum/esm/domain/record/mutationBatch.js
/**
* Maximum duration to wait before processing mutations. If the browser is idle, mutations will be
* processed more quickly. If the browser is busy executing small tasks (ex: rendering frames), the
* mutations will wait MUTATION_PROCESS_MAX_DELAY milliseconds before being processed. If the
* browser is busy executing a longer task, mutations will be processed after this task.
*/
var MUTATION_PROCESS_MAX_DELAY = 100;
function createMutationBatch(processMutationBatch) {
	let cancelScheduledFlush = noop;
	let pendingMutations = [];
	function flush() {
		cancelScheduledFlush();
		processMutationBatch(pendingMutations);
		pendingMutations = [];
	}
	const { throttled: throttledFlush, cancel: cancelThrottle } = throttle(flush, 16, { leading: false });
	return {
		addMutations: (mutations) => {
			if (pendingMutations.length === 0) cancelScheduledFlush = requestIdleCallback(throttledFlush, { timeout: MUTATION_PROCESS_MAX_DELAY });
			pendingMutations.push(...mutations);
		},
		flush,
		stop: () => {
			cancelScheduledFlush();
			cancelThrottle();
		}
	};
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-rum@6.33.0_@datadog+browser-logs@6.33.0/node_modules/@datadog/browser-rum/esm/domain/record/trackers/trackMutation.js
/**
* Buffers and aggregate mutations generated by a MutationObserver into MutationPayload
*/
function trackMutation(target, emitRecord, emitStats, scope, serialize = defaultSerializeMutationsCallback()) {
	const MutationObserver = getMutationObserverConstructor();
	if (!MutationObserver) return {
		stop: noop,
		flush: noop
	};
	const mutationBatch = createMutationBatch((mutations) => {
		serialize(timeStampNow(), mutations.concat(observer.takeRecords()), emitRecord, emitStats, scope);
	});
	const observer = new MutationObserver(monitor(mutationBatch.addMutations));
	observer.observe(target, {
		attributeOldValue: true,
		attributes: true,
		characterData: true,
		characterDataOldValue: true,
		childList: true,
		subtree: true
	});
	return {
		stop: () => {
			observer.disconnect();
			mutationBatch.stop();
		},
		flush: () => {
			mutationBatch.flush();
		}
	};
}
function defaultSerializeMutationsCallback() {
	return isIncrementalSnapshotChangeRecordsEnabled() ? serializeMutationsAsChange : serializeMutations;
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-rum@6.33.0_@datadog+browser-logs@6.33.0/node_modules/@datadog/browser-rum/esm/domain/record/shadowRootsController.js
var initShadowRootsController = (emitRecord, emitStats) => {
	const controllerByShadowRoot = /* @__PURE__ */ new Map();
	return {
		addShadowRoot: (shadowRoot, scope) => {
			if (controllerByShadowRoot.has(shadowRoot)) return;
			const mutationTracker = trackMutation(shadowRoot, emitRecord, emitStats, scope);
			const inputTracker = trackInput(shadowRoot, emitRecord, scope);
			const scrollTracker = trackScroll(shadowRoot, emitRecord, scope);
			controllerByShadowRoot.set(shadowRoot, {
				flush: () => mutationTracker.flush(),
				stop: () => {
					mutationTracker.stop();
					inputTracker.stop();
					scrollTracker.stop();
				}
			});
		},
		removeShadowRoot: (shadowRoot) => {
			const entry = controllerByShadowRoot.get(shadowRoot);
			if (!entry) return;
			entry.stop();
			controllerByShadowRoot.delete(shadowRoot);
		},
		stop: () => {
			controllerByShadowRoot.forEach(({ stop }) => stop());
		},
		flush: () => {
			controllerByShadowRoot.forEach(({ flush }) => flush());
		}
	};
};
//#endregion
//#region node_modules/.pnpm/@datadog+browser-rum@6.33.0_@datadog+browser-logs@6.33.0/node_modules/@datadog/browser-rum/esm/domain/record/record.js
function record(options) {
	const { emitRecord, emitStats, configuration, lifeCycle } = options;
	if (!emitRecord || !emitStats) throw new Error("emit functions are required");
	const processRecord = (record) => {
		emitRecord(record);
		sendToExtension("record", { record });
		addRecord(options.viewHistory.findView().id);
	};
	const shadowRootsController = initShadowRootsController(processRecord, emitStats);
	const scope = createRecordingScope(configuration, createElementsScrollPositions(), shadowRootsController);
	const { stop: stopFullSnapshots } = startFullSnapshots(lifeCycle, processRecord, emitStats, flushMutations, scope);
	function flushMutations() {
		shadowRootsController.flush();
		mutationTracker.flush();
	}
	const mutationTracker = trackMutation(document, processRecord, emitStats, scope);
	const trackers = [
		mutationTracker,
		trackMove(processRecord, scope),
		trackMouseInteraction(processRecord, scope),
		trackScroll(document, processRecord, scope),
		trackViewportResize(processRecord, scope),
		trackInput(document, processRecord, scope),
		trackMediaInteraction(processRecord, scope),
		trackStyleSheet(processRecord, scope),
		trackFocus(processRecord, scope),
		trackVisualViewportResize(processRecord, scope),
		trackViewEnd(lifeCycle, processRecord, flushMutations)
	];
	return {
		stop: () => {
			shadowRootsController.stop();
			trackers.forEach((tracker) => tracker.stop());
			stopFullSnapshots();
		},
		flushMutations,
		shadowRootsController
	};
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-rum@6.33.0_@datadog+browser-logs@6.33.0/node_modules/@datadog/browser-rum/esm/domain/segmentCollection/buildReplayPayload.js
function buildReplayPayload(data, metadata, stats, rawSegmentBytesCount) {
	const formData = new FormData();
	formData.append("segment", new Blob([data], { type: "application/octet-stream" }), `${metadata.session.id}-${metadata.start}`);
	const metadataAndSegmentSizes = {
		raw_segment_size: rawSegmentBytesCount,
		compressed_segment_size: data.byteLength,
		...metadata
	};
	const serializedMetadataAndSegmentSizes = JSON.stringify(metadataAndSegmentSizes);
	formData.append("event", new Blob([serializedMetadataAndSegmentSizes], { type: "application/json" }));
	return {
		data: formData,
		bytesCount: data.byteLength,
		cssText: stats.cssText,
		isFullSnapshot: metadata.index_in_view === 0,
		rawSize: rawSegmentBytesCount,
		recordCount: metadata.records_count,
		serializationDuration: stats.serializationDuration
	};
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-rum@6.33.0_@datadog+browser-logs@6.33.0/node_modules/@datadog/browser-rum/esm/domain/segmentCollection/segment.js
function createSegment({ context, creationReason, encoder }) {
	let encodedBytesCount = 0;
	const viewId = context.view.id;
	const metadata = {
		start: Infinity,
		end: -Infinity,
		creation_reason: creationReason,
		records_count: 0,
		has_full_snapshot: false,
		index_in_view: getSegmentsCount(viewId),
		source: "browser",
		...context
	};
	const serializationStats = createSerializationStats();
	addSegment(viewId);
	function addRecord(record, callback) {
		metadata.start = Math.min(metadata.start, record.timestamp);
		metadata.end = Math.max(metadata.end, record.timestamp);
		metadata.records_count += 1;
		metadata.has_full_snapshot || (metadata.has_full_snapshot = record.type === RecordType.FullSnapshot || record.type === RecordType.Change && metadata.index_in_view === 0);
		const prefix = encoder.isEmpty ? "{\"records\":[" : ",";
		encoder.write(prefix + JSON.stringify(record), (additionalEncodedBytesCount) => {
			encodedBytesCount += additionalEncodedBytesCount;
			callback(encodedBytesCount);
		});
	}
	function addStats(stats) {
		aggregateSerializationStats(serializationStats, stats);
	}
	function flush(callback) {
		if (encoder.isEmpty) throw new Error("Empty segment flushed");
		encoder.write(`],${JSON.stringify(metadata).slice(1)}\n`);
		encoder.finish((encoderResult) => {
			addWroteData(metadata.view.id, encoderResult.rawBytesCount);
			callback(metadata, serializationStats, encoderResult);
		});
	}
	return {
		addRecord,
		addStats,
		flush
	};
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-rum@6.33.0_@datadog+browser-logs@6.33.0/node_modules/@datadog/browser-rum/esm/domain/segmentCollection/segmentCollection.js
var SEGMENT_DURATION_LIMIT = 5 * ONE_SECOND;
/**
* beacon payload max queue size implementation is 64kb
* ensure that we leave room for logs, rum and potential other users
*/
var SEGMENT_BYTES_LIMIT = 6e4;
function startSegmentCollection(lifeCycle, configuration, sessionManager, viewHistory, httpRequest, encoder) {
	return doStartSegmentCollection(lifeCycle, () => computeSegmentContext(configuration.applicationId, sessionManager, viewHistory), httpRequest, encoder);
}
function doStartSegmentCollection(lifeCycle, getSegmentContext, httpRequest, encoder) {
	let state = {
		status: 0,
		nextSegmentCreationReason: "init"
	};
	const { unsubscribe: unsubscribeViewCreated } = lifeCycle.subscribe(2, () => {
		flushSegment("view_change");
	});
	const { unsubscribe: unsubscribePageMayExit } = lifeCycle.subscribe(11, (pageMayExitEvent) => {
		flushSegment(pageMayExitEvent.reason);
	});
	function flushSegment(flushReason) {
		if (state.status === 1) {
			state.segment.flush((metadata, stats, encoderResult) => {
				const payload = buildReplayPayload(encoderResult.output, metadata, stats, encoderResult.rawBytesCount);
				if (isPageExitReason(flushReason)) httpRequest.sendOnExit(payload);
				else httpRequest.send(payload);
			});
			clearTimeout(state.expirationTimeoutId);
		}
		if (flushReason !== "stop") state = {
			status: 0,
			nextSegmentCreationReason: flushReason
		};
		else state = { status: 2 };
	}
	return {
		addRecord: (record) => {
			if (state.status === 2) return;
			if (state.status === 0) {
				const context = getSegmentContext();
				if (!context) return;
				state = {
					status: 1,
					segment: createSegment({
						encoder,
						context,
						creationReason: state.nextSegmentCreationReason
					}),
					expirationTimeoutId: setTimeout(() => {
						flushSegment("segment_duration_limit");
					}, SEGMENT_DURATION_LIMIT)
				};
			}
			state.segment.addRecord(record, (encodedBytesCount) => {
				if (encodedBytesCount > SEGMENT_BYTES_LIMIT) flushSegment("segment_bytes_limit");
			});
		},
		addStats: (stats) => {
			if (state.status === 1) state.segment.addStats(stats);
		},
		stop: () => {
			flushSegment("stop");
			unsubscribeViewCreated();
			unsubscribePageMayExit();
		}
	};
}
function computeSegmentContext(applicationId, sessionManager, viewHistory) {
	const session = sessionManager.findTrackedSession();
	const viewContext = viewHistory.findView();
	if (!session || !viewContext) return;
	return {
		application: { id: applicationId },
		session: { id: session.id },
		view: { id: viewContext.id }
	};
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-rum@6.33.0_@datadog+browser-logs@6.33.0/node_modules/@datadog/browser-rum/esm/domain/segmentCollection/startSegmentTelemetry.js
function startSegmentTelemetry(telemetry, requestObservable) {
	if (!telemetry.metricsEnabled) return { stop: noop };
	const { unsubscribe } = requestObservable.subscribe((requestEvent) => {
		if (requestEvent.type === "failure" || requestEvent.type === "queue-full" || requestEvent.type === "success" && requestEvent.payload.isFullSnapshot) addTelemetryMetrics("Segment network request metrics", { metrics: createSegmentMetrics(requestEvent.type, requestEvent.bandwidth, requestEvent.payload) });
	});
	return { stop: unsubscribe };
}
function createSegmentMetrics(result, bandwidthStats, payload) {
	return {
		cssText: {
			count: payload.cssText.count,
			max: payload.cssText.max,
			sum: payload.cssText.sum
		},
		encoding: {
			fullSnapshot: isFullSnapshotChangeRecordsEnabled() ? "change" : "v1",
			incrementalSnapshot: isIncrementalSnapshotChangeRecordsEnabled() ? "change" : "v1"
		},
		isFullSnapshot: payload.isFullSnapshot,
		ongoingRequests: {
			count: bandwidthStats.ongoingRequestCount,
			totalSize: bandwidthStats.ongoingByteCount
		},
		recordCount: payload.recordCount,
		result,
		serializationDuration: {
			count: payload.serializationDuration.count,
			max: payload.serializationDuration.max,
			sum: payload.serializationDuration.sum
		},
		size: {
			compressed: payload.bytesCount,
			raw: payload.rawSize
		}
	};
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-rum@6.33.0_@datadog+browser-logs@6.33.0/node_modules/@datadog/browser-rum/esm/domain/startRecordBridge.js
function startRecordBridge(viewHistory) {
	const bridge = getEventBridge();
	return { addRecord: (record) => {
		const view = viewHistory.findView();
		bridge.send("record", record, view.id);
	} };
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-rum@6.33.0_@datadog+browser-logs@6.33.0/node_modules/@datadog/browser-rum/esm/boot/startRecording.js
function startRecording(lifeCycle, configuration, sessionManager, viewHistory, encoder, telemetry, httpRequest) {
	const cleanupTasks = [];
	const reportError = (error) => {
		lifeCycle.notify(14, { error });
		addTelemetryDebug("Error reported to customer", { "error.message": error.message });
	};
	const replayRequest = httpRequest || createHttpRequest([configuration.sessionReplayEndpointBuilder], reportError, SEGMENT_BYTES_LIMIT);
	let addRecord;
	let addStats;
	if (!canUseEventBridge()) {
		const segmentCollection = startSegmentCollection(lifeCycle, configuration, sessionManager, viewHistory, replayRequest, encoder);
		addRecord = segmentCollection.addRecord;
		addStats = segmentCollection.addStats;
		cleanupTasks.push(segmentCollection.stop);
		const segmentTelemetry = startSegmentTelemetry(telemetry, replayRequest.observable);
		cleanupTasks.push(segmentTelemetry.stop);
	} else {
		({addRecord} = startRecordBridge(viewHistory));
		addStats = noop;
	}
	const { stop: stopRecording } = record({
		emitRecord: addRecord,
		emitStats: addStats,
		configuration,
		lifeCycle,
		viewHistory
	});
	cleanupTasks.push(stopRecording);
	return { stop: () => {
		cleanupTasks.forEach((task) => task());
	} };
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-rum@6.33.0_@datadog+browser-logs@6.33.0/node_modules/@datadog/browser-rum/esm/domain/profiling/utils/getNumberOfSamples.js
/**
* Counts number of samples when the thread was not idle (stackId is defined)
*
* @param samples - Array of collected samples
* @returns Number of samples
*/
function getNumberOfSamples(samples) {
	let numberOfSamples = 0;
	for (const sample of samples) if (sample.stackId !== void 0) numberOfSamples++;
	return numberOfSamples;
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-rum@6.33.0_@datadog+browser-logs@6.33.0/node_modules/@datadog/browser-rum/esm/domain/profiling/utils/getDefaultViewName.js
var PATH_MIXED_ALPHANUMERICS = /\/(?![vV]\d{1,2}\/)([^/\d?]*\d+[^/?]*)/g;
function getDefaultViewName(viewPathUrl) {
	if (!viewPathUrl) return "/";
	return viewPathUrl.replace(PATH_MIXED_ALPHANUMERICS, "/?");
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-rum@6.33.0_@datadog+browser-logs@6.33.0/node_modules/@datadog/browser-rum/esm/domain/profiling/utils/getCustomOrDefaultViewName.js
var getCustomOrDefaultViewName = (customViewName, viewPathUrl) => customViewName || getDefaultViewName(viewPathUrl);
//#endregion
//#region node_modules/.pnpm/@datadog+browser-rum@6.33.0_@datadog+browser-logs@6.33.0/node_modules/@datadog/browser-rum/esm/domain/profiling/transport/buildProfileEventAttributes.js
/**
* Builds attributes for the Profile Event.
*
* @param profilerTrace - Profiler trace
* @param applicationId - application id.
* @param sessionId - session id.
* @returns Additional attributes.
*/
function buildProfileEventAttributes(profilerTrace, applicationId, sessionId) {
	var _a;
	var _b;
	const { ids, names } = extractViewIdsAndNames(profilerTrace.views);
	const longTaskIds = profilerTrace.longTasks.map((longTask) => longTask.id).filter((id) => id !== void 0);
	const actionIds = (_b = (_a = profilerTrace.actions) === null || _a === void 0 ? void 0 : _a.map((longTask) => longTask.id).filter((id) => id !== void 0)) !== null && _b !== void 0 ? _b : [];
	const { ids: vitalIds, labels: vitalLabels } = extractVitalIdsAndLabels(profilerTrace.vitals);
	const attributes = { application: { id: applicationId } };
	if (sessionId) attributes.session = { id: sessionId };
	if (ids.length) attributes.view = {
		id: ids,
		name: names
	};
	if (longTaskIds.length) attributes.long_task = { id: longTaskIds };
	if (actionIds.length) attributes.action = {
		id: actionIds,
		label: []
	};
	if (vitalIds.length) attributes.vital = {
		id: vitalIds,
		label: vitalLabels
	};
	return attributes;
}
function extractViewIdsAndNames(views) {
	const result = {
		ids: [],
		names: []
	};
	for (const view of views) {
		result.ids.push(view.viewId);
		if (view.viewName) result.names.push(view.viewName);
	}
	result.names = Array.from(new Set(result.names));
	return result;
}
function extractVitalIdsAndLabels(vitals) {
	const result = {
		ids: [],
		labels: []
	};
	if (!vitals) return result;
	for (const vital of vitals) {
		result.ids.push(vital.id);
		result.labels.push(vital.label);
	}
	result.labels = Array.from(new Set(result.labels));
	return result;
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-rum@6.33.0_@datadog+browser-logs@6.33.0/node_modules/@datadog/browser-rum/esm/domain/profiling/transport/assembly.js
function assembleProfilingPayload(profilerTrace, configuration, sessionId) {
	return {
		event: buildProfileEvent(profilerTrace, configuration, sessionId),
		"wall-time.json": profilerTrace
	};
}
function buildProfileEvent(profilerTrace, configuration, sessionId) {
	const tags = buildTags(configuration);
	const profileAttributes = buildProfileEventAttributes(profilerTrace, configuration.applicationId, sessionId);
	const profileEventTags = buildProfileEventTags(tags);
	return {
		...profileAttributes,
		attachments: ["wall-time.json"],
		start: new Date(profilerTrace.startClocks.timeStamp).toISOString(),
		end: new Date(profilerTrace.endClocks.timeStamp).toISOString(),
		family: "chrome",
		runtime: "chrome",
		format: "json",
		version: 4,
		tags_profiler: profileEventTags.join(","),
		_dd: { clock_drift: currentDrift() }
	};
}
/**
* Builds tags for the Profile Event.
*
* @param tags - RUM tags
* @returns Combined tags for the Profile Event.
*/
function buildProfileEventTags(tags) {
	return tags.concat([
		"language:javascript",
		"runtime:chrome",
		"family:chrome",
		"host:browser"
	]);
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-rum@6.33.0_@datadog+browser-logs@6.33.0/node_modules/@datadog/browser-rum/esm/domain/profiling/longTaskHistory.js
var LONG_TASK_ID_HISTORY_EXPIRE_DELAY = SESSION_TIME_OUT_DELAY;
function createLongTaskHistory(lifeCycle) {
	const history = createValueHistory({ expireDelay: LONG_TASK_ID_HISTORY_EXPIRE_DELAY });
	lifeCycle.subscribe(12, ({ rawRumEvent, startClocks, duration }) => {
		if (rawRumEvent.type === "long_task") history.add({
			id: rawRumEvent.long_task.id,
			startClocks,
			duration,
			entryType: rawRumEvent.long_task.entry_type === RumLongTaskEntryType.LONG_TASK ? RumPerformanceEntryType.LONG_TASK : RumPerformanceEntryType.LONG_ANIMATION_FRAME
		}, startClocks.relative).close(addDuration(startClocks.relative, duration));
	});
	return history;
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-rum@6.33.0_@datadog+browser-logs@6.33.0/node_modules/@datadog/browser-rum/esm/domain/profiling/actionHistory.js
var ACTION_ID_HISTORY_TIME_OUT_DELAY = SESSION_TIME_OUT_DELAY;
function createActionHistory(lifeCycle) {
	const history = createValueHistory({ expireDelay: ACTION_ID_HISTORY_TIME_OUT_DELAY });
	lifeCycle.subscribe(15, (actionStart) => {
		history.add({
			id: actionStart.id,
			label: "",
			startClocks: actionStart.startClocks,
			duration: void 0
		}, actionStart.startClocks.relative);
	});
	lifeCycle.subscribe(12, ({ rawRumEvent, startClocks, duration }) => {
		if (rawRumEvent.type === "action") {
			const historyEntry = history.getEntries(startClocks.relative).find((entry) => entry.value.id === rawRumEvent.action.id);
			const durationForEntry = duration !== null && duration !== void 0 ? duration : 0;
			if (historyEntry) {
				historyEntry.value.duration = durationForEntry;
				historyEntry.close(addDuration(startClocks.relative, durationForEntry));
			} else history.add({
				id: rawRumEvent.action.id,
				label: "",
				startClocks,
				duration
			}, startClocks.relative).close(addDuration(startClocks.relative, durationForEntry));
		}
	});
	return history;
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-rum@6.33.0_@datadog+browser-logs@6.33.0/node_modules/@datadog/browser-rum/esm/domain/profiling/vitalHistory.js
var VITAL_ID_HISTORY_TIME_OUT_DELAY = SESSION_TIME_OUT_DELAY;
function createVitalHistory(lifeCycle) {
	const history = createValueHistory({ expireDelay: VITAL_ID_HISTORY_TIME_OUT_DELAY });
	lifeCycle.subscribe(16, (vitalStart) => {
		history.add({
			id: vitalStart.id,
			startClocks: vitalStart.startClocks,
			duration: void 0,
			label: vitalStart.name
		}, vitalStart.startClocks.relative);
	});
	lifeCycle.subscribe(12, ({ rawRumEvent, startClocks, duration }) => {
		if (rawRumEvent.type === "vital") {
			const historyEntry = history.getEntries(startClocks.relative).find((entry) => entry.value.id === rawRumEvent.vital.id);
			if (historyEntry) {
				historyEntry.value.duration = duration;
				historyEntry.close(addDuration(startClocks.relative, duration));
			} else history.add({
				id: rawRumEvent.vital.id,
				startClocks,
				duration,
				label: rawRumEvent.vital.name
			}, startClocks.relative).close(addDuration(startClocks.relative, duration));
		}
	});
	return history;
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-rum@6.33.0_@datadog+browser-logs@6.33.0/node_modules/@datadog/browser-rum/esm/domain/profiling/profiler.js
var DEFAULT_RUM_PROFILER_CONFIGURATION = {
	sampleIntervalMs: 10,
	collectIntervalMs: 6e4,
	minProfileDurationMs: 5e3,
	minNumberOfSamples: 50
};
function createRumProfiler(configuration, lifeCycle, session, profilingContextManager, createEncoder, viewHistory, profilerConfiguration = DEFAULT_RUM_PROFILER_CONFIGURATION) {
	const transport = createFormDataTransport(configuration, lifeCycle, createEncoder, 6);
	let lastViewEntry;
	const globalCleanupTasks = [];
	const longTaskHistory = mockable(createLongTaskHistory)(lifeCycle);
	const actionHistory = mockable(createActionHistory)(lifeCycle);
	const vitalHistory = mockable(createVitalHistory)(lifeCycle);
	let instance = {
		state: "stopped",
		stateReason: "initializing"
	};
	lifeCycle.subscribe(9, () => {
		stopProfiling("session-expired");
	});
	lifeCycle.subscribe(10, () => {
		if (instance.state === "stopped" && instance.stateReason === "session-expired") start();
	});
	function start() {
		if (instance.state === "running") return;
		const viewEntry = viewHistory.findView();
		lastViewEntry = viewEntry ? {
			startClocks: viewEntry.startClocks,
			viewId: viewEntry.id,
			viewName: getCustomOrDefaultViewName(viewEntry.name, document.location.pathname)
		} : void 0;
		globalCleanupTasks.push(addEventListener(configuration, window, "visibilitychange", handleVisibilityChange).stop, addEventListener(configuration, window, "beforeunload", handleBeforeUnload).stop);
		startNextProfilerInstance();
	}
	function stop() {
		stopProfiling("stopped-by-user");
	}
	function stopProfiling(reason) {
		stopProfilerInstance(reason);
		globalCleanupTasks.forEach((task) => task());
		globalCleanupTasks.length = 0;
		profilingContextManager.set({
			status: "stopped",
			error_reason: void 0
		});
	}
	/**
	* Whenever a new Profiler instance is started, we need to add event listeners to surroundings (RUM Events, Long Tasks, etc) to enrich the Profiler data.
	* If the instance is already running, we can keep the same event listeners.
	*/
	function addEventListeners(existingInstance) {
		if (existingInstance.state === "running") return { cleanupTasks: existingInstance.cleanupTasks };
		const cleanupTasks = [];
		const viewUpdatedSubscription = lifeCycle.subscribe(2, (view) => {
			const viewEntry = {
				viewId: view.id,
				viewName: getCustomOrDefaultViewName(view.name, document.location.pathname),
				startClocks: view.startClocks
			};
			collectViewEntry(viewEntry);
			lastViewEntry = viewEntry;
		});
		cleanupTasks.push(viewUpdatedSubscription.unsubscribe);
		return { cleanupTasks };
	}
	function startNextProfilerInstance() {
		const globalThisProfiler = getGlobalObject().Profiler;
		if (!globalThisProfiler) {
			profilingContextManager.set({
				status: "error",
				error_reason: "not-supported-by-browser"
			});
			throw new Error("RUM Profiler is not supported in this browser.");
		}
		if (instance.state === "running") collectProfilerInstance(instance);
		const { cleanupTasks } = addEventListeners(instance);
		let profiler;
		try {
			profiler = new globalThisProfiler({
				sampleInterval: profilerConfiguration.sampleIntervalMs,
				maxBufferSize: Math.round(profilerConfiguration.collectIntervalMs * 1.5 / profilerConfiguration.sampleIntervalMs)
			});
		} catch (e) {
			if (e instanceof Error && e.message.includes("disabled by Document Policy")) {
				display.warn("[DD_RUM] Profiler startup failed. Ensure your server includes the `Document-Policy: js-profiling` response header when serving HTML pages.", e);
				profilingContextManager.set({
					status: "error",
					error_reason: "missing-document-policy-header"
				});
			} else profilingContextManager.set({
				status: "error",
				error_reason: "unexpected-exception"
			});
			return;
		}
		profilingContextManager.set({
			status: "running",
			error_reason: void 0
		});
		instance = {
			state: "running",
			startClocks: clocksNow(),
			profiler,
			timeoutId: setTimeout(startNextProfilerInstance, profilerConfiguration.collectIntervalMs),
			views: [],
			cleanupTasks,
			longTasks: []
		};
		collectViewEntry(lastViewEntry);
		profiler.addEventListener("samplebufferfull", handleSampleBufferFull);
	}
	function collectProfilerInstance(runningInstance) {
		clearTimeout(runningInstance.timeoutId);
		runningInstance.profiler.removeEventListener("samplebufferfull", handleSampleBufferFull);
		const { startClocks, views } = runningInstance;
		runningInstance.profiler.stop().then((trace) => {
			const endClocks = clocksNow();
			const duration = elapsed(startClocks.relative, endClocks.relative);
			const longTasks = longTaskHistory.findAll(startClocks.relative, duration);
			const actions = actionHistory.findAll(startClocks.relative, duration);
			const vitals = vitalHistory.findAll(startClocks.relative, duration);
			const isBelowDurationThreshold = duration < profilerConfiguration.minProfileDurationMs;
			const isBelowSampleThreshold = getNumberOfSamples(trace.samples) < profilerConfiguration.minNumberOfSamples;
			if (longTasks.length === 0 && (isBelowDurationThreshold || isBelowSampleThreshold)) return;
			handleProfilerTrace(Object.assign(trace, {
				startClocks,
				endClocks,
				clocksOrigin: clocksOrigin(),
				longTasks,
				actions,
				vitals,
				views,
				sampleInterval: profilerConfiguration.sampleIntervalMs
			}));
		}).catch(monitorError);
	}
	function stopProfilerInstance(stateReason) {
		if (instance.state !== "running") {
			if (instance.state === "paused" || instance.state === "stopped" && stateReason === "stopped-by-user") instance = {
				state: "stopped",
				stateReason
			};
			return;
		}
		const runningInstance = instance;
		instance = {
			state: "stopped",
			stateReason
		};
		runningInstance.cleanupTasks.forEach((cleanupTask) => cleanupTask());
		collectProfilerInstance(runningInstance);
	}
	function pauseProfilerInstance() {
		if (instance.state !== "running") return;
		const runningInstance = instance;
		instance = { state: "paused" };
		runningInstance.cleanupTasks.forEach((cleanupTask) => cleanupTask());
		collectProfilerInstance(runningInstance);
	}
	function collectViewEntry(viewEntry) {
		if (instance.state !== "running" || !viewEntry) return;
		instance.views.push(viewEntry);
	}
	function handleProfilerTrace(trace) {
		var _a;
		const payload = assembleProfilingPayload(trace, configuration, (_a = session.findTrackedSession()) === null || _a === void 0 ? void 0 : _a.id);
		transport.send(payload);
	}
	function handleSampleBufferFull() {
		startNextProfilerInstance();
	}
	function handleVisibilityChange() {
		if (document.visibilityState === "hidden" && instance.state === "running") pauseProfilerInstance();
		else if (document.visibilityState === "visible" && instance.state === "paused") startNextProfilerInstance();
	}
	function handleBeforeUnload() {
		startNextProfilerInstance();
	}
	function isStopped() {
		return instance.state === "stopped";
	}
	function isRunning() {
		return instance.state === "running";
	}
	function isPaused() {
		return instance.state === "paused";
	}
	return {
		start,
		stop,
		isStopped,
		isRunning,
		isPaused
	};
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-rum@6.33.0_@datadog+browser-logs@6.33.0/node_modules/@datadog/browser-rum/esm/domain/deflate/deflateEncoder.js
function createDeflateEncoder(configuration, worker, streamId) {
	let rawBytesCount = 0;
	let compressedData = [];
	let compressedDataTrailer;
	let isEmpty = true;
	let nextWriteActionId = 0;
	const pendingWriteActions = [];
	const { stop: removeMessageListener } = addEventListener(configuration, worker, "message", ({ data: workerResponse }) => {
		if (workerResponse.type !== "wrote" || workerResponse.streamId !== streamId) return;
		const nextPendingAction = pendingWriteActions[0];
		if (nextPendingAction) {
			if (nextPendingAction.id === workerResponse.id) {
				pendingWriteActions.shift();
				rawBytesCount += workerResponse.additionalBytesCount;
				compressedData.push(workerResponse.result);
				compressedDataTrailer = workerResponse.trailer;
				if (nextPendingAction.writeCallback) nextPendingAction.writeCallback(workerResponse.result.byteLength);
				else if (nextPendingAction.finishCallback) nextPendingAction.finishCallback();
			} else if (nextPendingAction.id < workerResponse.id) removeMessageListener();
		}
	});
	function consumeResult() {
		const output = compressedData.length === 0 ? /* @__PURE__ */ new Uint8Array(0) : concatBuffers(compressedData.concat(compressedDataTrailer));
		const result = {
			rawBytesCount,
			output,
			outputBytesCount: output.byteLength,
			encoding: "deflate"
		};
		rawBytesCount = 0;
		compressedData = [];
		return result;
	}
	function sendResetIfNeeded() {
		if (!isEmpty) {
			worker.postMessage({
				action: "reset",
				streamId
			});
			isEmpty = true;
		}
	}
	return {
		isAsync: true,
		get isEmpty() {
			return isEmpty;
		},
		write(data, callback) {
			worker.postMessage({
				action: "write",
				id: nextWriteActionId,
				data,
				streamId
			});
			pendingWriteActions.push({
				id: nextWriteActionId,
				writeCallback: callback,
				data
			});
			isEmpty = false;
			nextWriteActionId += 1;
		},
		finish(callback) {
			sendResetIfNeeded();
			if (!pendingWriteActions.length) callback(consumeResult());
			else {
				pendingWriteActions.forEach((pendingWriteAction) => {
					delete pendingWriteAction.writeCallback;
				});
				pendingWriteActions[pendingWriteActions.length - 1].finishCallback = () => callback(consumeResult());
			}
		},
		finishSync() {
			sendResetIfNeeded();
			const pendingData = pendingWriteActions.map((pendingWriteAction) => pendingWriteAction.data).join("");
			pendingWriteActions.length = 0;
			return {
				...consumeResult(),
				pendingData
			};
		},
		estimateEncodedBytesCount(data) {
			return data.length / 8;
		},
		stop() {
			removeMessageListener();
		}
	};
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-rum@6.33.0_@datadog+browser-logs@6.33.0/node_modules/@datadog/browser-rum/esm/domain/scriptLoadingError.js
function reportScriptLoadingError({ configuredUrl, error, source, scriptType }) {
	display.error(`${source} failed to start: an error occurred while initializing the ${scriptType}:`, error);
	if (error instanceof Event || error instanceof Error && isMessageCspRelated(error.message)) {
		let baseMessage;
		if (configuredUrl) baseMessage = `Please make sure the ${scriptType} URL ${configuredUrl} is correct and CSP is correctly configured.`;
		else baseMessage = "Please make sure CSP is correctly configured.";
		display.error(`${baseMessage} See documentation at ${DOCS_ORIGIN}/integrations/content_security_policy_logs/#use-csp-with-real-user-monitoring-and-session-replay`);
	} else if (scriptType === "worker") addTelemetryError(error);
}
function isMessageCspRelated(message) {
	return message.includes("Content Security Policy") || message.includes("requires 'TrustedScriptURL'");
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-rum@6.33.0_@datadog+browser-logs@6.33.0/node_modules/@datadog/browser-rum/esm/domain/deflate/deflateWorker.js
var INITIALIZATION_TIME_OUT_DELAY = 30 * ONE_SECOND;
function createDeflateWorker(configuration) {
	return new Worker(configuration.workerUrl || URL.createObjectURL(new Blob(["(()=>{function t(t){if(1===t.length)return t[0];const e=t.reduce((t,e)=>t+e.length,0),a=new Uint8Array(e);let n=0;for(const e of t)a.set(e,n),n+=e.length;return a}function e(t){for(var e=t.length;--e>=0;)t[e]=0}var a=new Uint8Array([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0]),n=new Uint8Array([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13]),r=new Uint8Array([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,7]),i=new Uint8Array([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),s=Array(576);e(s);var h=Array(60);e(h);var l=Array(512);e(l);var _=Array(256);e(_);var o=Array(29);e(o);var d,u,f,c=Array(30);function p(t,e,a,n,r){this.static_tree=t,this.extra_bits=e,this.extra_base=a,this.elems=n,this.max_length=r,this.has_stree=t&&t.length}function g(t,e){this.dyn_tree=t,this.max_code=0,this.stat_desc=e}e(c);var v=function(t){return t<256?l[t]:l[256+(t>>>7)]},w=function(t,e){t.pending_buf[t.pending++]=255&e,t.pending_buf[t.pending++]=e>>>8&255},m=function(t,e,a){t.bi_valid>16-a?(t.bi_buf|=e<<t.bi_valid&65535,w(t,t.bi_buf),t.bi_buf=e>>16-t.bi_valid,t.bi_valid+=a-16):(t.bi_buf|=e<<t.bi_valid&65535,t.bi_valid+=a)},b=function(t,e,a){m(t,a[2*e],a[2*e+1])},y=function(t,e){var a=0;do{a|=1&t,t>>>=1,a<<=1}while(--e>0);return a>>>1},z=function(t,e,a){var n,r,i=Array(16),s=0;for(n=1;n<=15;n++)i[n]=s=s+a[n-1]<<1;for(r=0;r<=e;r++){var h=t[2*r+1];0!==h&&(t[2*r]=y(i[h]++,h))}},k=function(t){var e;for(e=0;e<286;e++)t.dyn_ltree[2*e]=0;for(e=0;e<30;e++)t.dyn_dtree[2*e]=0;for(e=0;e<19;e++)t.bl_tree[2*e]=0;t.dyn_ltree[512]=1,t.opt_len=t.static_len=0,t.last_lit=t.matches=0},x=function(t){t.bi_valid>8?w(t,t.bi_buf):t.bi_valid>0&&(t.pending_buf[t.pending++]=t.bi_buf),t.bi_buf=0,t.bi_valid=0},A=function(t,e,a,n){var r=2*e,i=2*a;return t[r]<t[i]||t[r]===t[i]&&n[e]<=n[a]},U=function(t,e,a){for(var n=t.heap[a],r=a<<1;r<=t.heap_len&&(r<t.heap_len&&A(e,t.heap[r+1],t.heap[r],t.depth)&&r++,!A(e,n,t.heap[r],t.depth));)t.heap[a]=t.heap[r],a=r,r<<=1;t.heap[a]=n},B=function(t,e,r){var i,s,h,l,d=0;if(0!==t.last_lit)do{i=t.pending_buf[t.d_buf+2*d]<<8|t.pending_buf[t.d_buf+2*d+1],s=t.pending_buf[t.l_buf+d],d++,0===i?b(t,s,e):(h=_[s],b(t,h+256+1,e),0!==(l=a[h])&&(s-=o[h],m(t,s,l)),i--,h=v(i),b(t,h,r),0!==(l=n[h])&&(i-=c[h],m(t,i,l)))}while(d<t.last_lit);b(t,256,e)},I=function(t,e){var a,n,r,i=e.dyn_tree,s=e.stat_desc.static_tree,h=e.stat_desc.has_stree,l=e.stat_desc.elems,_=-1;for(t.heap_len=0,t.heap_max=573,a=0;a<l;a++)0!==i[2*a]?(t.heap[++t.heap_len]=_=a,t.depth[a]=0):i[2*a+1]=0;for(;t.heap_len<2;)i[2*(r=t.heap[++t.heap_len]=_<2?++_:0)]=1,t.depth[r]=0,t.opt_len--,h&&(t.static_len-=s[2*r+1]);for(e.max_code=_,a=t.heap_len>>1;a>=1;a--)U(t,i,a);r=l;do{a=t.heap[1],t.heap[1]=t.heap[t.heap_len--],U(t,i,1),n=t.heap[1],t.heap[--t.heap_max]=a,t.heap[--t.heap_max]=n,i[2*r]=i[2*a]+i[2*n],t.depth[r]=(t.depth[a]>=t.depth[n]?t.depth[a]:t.depth[n])+1,i[2*a+1]=i[2*n+1]=r,t.heap[1]=r++,U(t,i,1)}while(t.heap_len>=2);t.heap[--t.heap_max]=t.heap[1],function(t,e){var a,n,r,i,s,h,l=e.dyn_tree,_=e.max_code,o=e.stat_desc.static_tree,d=e.stat_desc.has_stree,u=e.stat_desc.extra_bits,f=e.stat_desc.extra_base,c=e.stat_desc.max_length,p=0;for(i=0;i<=15;i++)t.bl_count[i]=0;for(l[2*t.heap[t.heap_max]+1]=0,a=t.heap_max+1;a<573;a++)(i=l[2*l[2*(n=t.heap[a])+1]+1]+1)>c&&(i=c,p++),l[2*n+1]=i,n>_||(t.bl_count[i]++,s=0,n>=f&&(s=u[n-f]),h=l[2*n],t.opt_len+=h*(i+s),d&&(t.static_len+=h*(o[2*n+1]+s)));if(0!==p){do{for(i=c-1;0===t.bl_count[i];)i--;t.bl_count[i]--,t.bl_count[i+1]+=2,t.bl_count[c]--,p-=2}while(p>0);for(i=c;0!==i;i--)for(n=t.bl_count[i];0!==n;)(r=t.heap[--a])>_||(l[2*r+1]!==i&&(t.opt_len+=(i-l[2*r+1])*l[2*r],l[2*r+1]=i),n--)}}(t,e),z(i,_,t.bl_count)},E=function(t,e,a){var n,r,i=-1,s=e[1],h=0,l=7,_=4;for(0===s&&(l=138,_=3),e[2*(a+1)+1]=65535,n=0;n<=a;n++)r=s,s=e[2*(n+1)+1],++h<l&&r===s||(h<_?t.bl_tree[2*r]+=h:0!==r?(r!==i&&t.bl_tree[2*r]++,t.bl_tree[32]++):h<=10?t.bl_tree[34]++:t.bl_tree[36]++,h=0,i=r,0===s?(l=138,_=3):r===s?(l=6,_=3):(l=7,_=4))},C=function(t,e,a){var n,r,i=-1,s=e[1],h=0,l=7,_=4;for(0===s&&(l=138,_=3),n=0;n<=a;n++)if(r=s,s=e[2*(n+1)+1],!(++h<l&&r===s)){if(h<_)do{b(t,r,t.bl_tree)}while(0!==--h);else 0!==r?(r!==i&&(b(t,r,t.bl_tree),h--),b(t,16,t.bl_tree),m(t,h-3,2)):h<=10?(b(t,17,t.bl_tree),m(t,h-3,3)):(b(t,18,t.bl_tree),m(t,h-11,7));h=0,i=r,0===s?(l=138,_=3):r===s?(l=6,_=3):(l=7,_=4)}},D=!1,M=function(t,e,a,n){m(t,0+(n?1:0),3),function(t,e,a){x(t),w(t,a),w(t,~a),t.pending_buf.set(t.window.subarray(e,e+a),t.pending),t.pending+=a}(t,e,a)},j=M,L=function(t,e,a,n){for(var r=65535&t,i=t>>>16&65535,s=0;0!==a;){a-=s=a>2e3?2e3:a;do{i=i+(r=r+e[n++]|0)|0}while(--s);r%=65521,i%=65521}return r|i<<16},S=new Uint32Array(function(){for(var t,e=[],a=0;a<256;a++){t=a;for(var n=0;n<8;n++)t=1&t?3988292384^t>>>1:t>>>1;e[a]=t}return e}()),T=function(t,e,a,n){var r=S,i=n+a;t^=-1;for(var s=n;s<i;s++)t=t>>>8^r[255&(t^e[s])];return-1^t},O={2:\"need dictionary\",1:\"stream end\",0:\"\",\"-1\":\"file error\",\"-2\":\"stream error\",\"-3\":\"data error\",\"-4\":\"insufficient memory\",\"-5\":\"buffer error\",\"-6\":\"incompatible version\"},q=j,F=function(t,e,a){return t.pending_buf[t.d_buf+2*t.last_lit]=e>>>8&255,t.pending_buf[t.d_buf+2*t.last_lit+1]=255&e,t.pending_buf[t.l_buf+t.last_lit]=255&a,t.last_lit++,0===e?t.dyn_ltree[2*a]++:(t.matches++,e--,t.dyn_ltree[2*(_[a]+256+1)]++,t.dyn_dtree[2*v(e)]++),t.last_lit===t.lit_bufsize-1},G=-2,H=258,J=262,K=103,N=113,P=666,Q=function(t,e){return t.msg=O[e],e},R=function(t){return(t<<1)-(t>4?9:0)},V=function(t){for(var e=t.length;--e>=0;)t[e]=0},W=function(t,e,a){return(e<<t.hash_shift^a)&t.hash_mask},X=function(t){var e=t.state,a=e.pending;a>t.avail_out&&(a=t.avail_out),0!==a&&(t.output.set(e.pending_buf.subarray(e.pending_out,e.pending_out+a),t.next_out),t.next_out+=a,e.pending_out+=a,t.total_out+=a,t.avail_out-=a,e.pending-=a,0===e.pending&&(e.pending_out=0))},Y=function(t,e){(function(t,e,a,n){var r,l,_=0;t.level>0?(2===t.strm.data_type&&(t.strm.data_type=function(t){var e,a=4093624447;for(e=0;e<=31;e++,a>>>=1)if(1&a&&0!==t.dyn_ltree[2*e])return 0;if(0!==t.dyn_ltree[18]||0!==t.dyn_ltree[20]||0!==t.dyn_ltree[26])return 1;for(e=32;e<256;e++)if(0!==t.dyn_ltree[2*e])return 1;return 0}(t)),I(t,t.l_desc),I(t,t.d_desc),_=function(t){var e;for(E(t,t.dyn_ltree,t.l_desc.max_code),E(t,t.dyn_dtree,t.d_desc.max_code),I(t,t.bl_desc),e=18;e>=3&&0===t.bl_tree[2*i[e]+1];e--);return t.opt_len+=3*(e+1)+5+5+4,e}(t),r=t.opt_len+3+7>>>3,(l=t.static_len+3+7>>>3)<=r&&(r=l)):r=l=a+5,a+4<=r&&-1!==e?M(t,e,a,n):4===t.strategy||l===r?(m(t,2+(n?1:0),3),B(t,s,h)):(m(t,4+(n?1:0),3),function(t,e,a,n){var r;for(m(t,e-257,5),m(t,a-1,5),m(t,n-4,4),r=0;r<n;r++)m(t,t.bl_tree[2*i[r]+1],3);C(t,t.dyn_ltree,e-1),C(t,t.dyn_dtree,a-1)}(t,t.l_desc.max_code+1,t.d_desc.max_code+1,_+1),B(t,t.dyn_ltree,t.dyn_dtree)),k(t),n&&x(t)})(t,t.block_start>=0?t.block_start:-1,t.strstart-t.block_start,e),t.block_start=t.strstart,X(t.strm)},Z=function(t,e){t.pending_buf[t.pending++]=e},$=function(t,e){t.pending_buf[t.pending++]=e>>>8&255,t.pending_buf[t.pending++]=255&e},tt=function(t,e,a,n){var r=t.avail_in;return r>n&&(r=n),0===r?0:(t.avail_in-=r,e.set(t.input.subarray(t.next_in,t.next_in+r),a),1===t.state.wrap?t.adler=L(t.adler,e,r,a):2===t.state.wrap&&(t.adler=T(t.adler,e,r,a)),t.next_in+=r,t.total_in+=r,r)},et=function(t,e){var a,n,r=t.max_chain_length,i=t.strstart,s=t.prev_length,h=t.nice_match,l=t.strstart>t.w_size-J?t.strstart-(t.w_size-J):0,_=t.window,o=t.w_mask,d=t.prev,u=t.strstart+H,f=_[i+s-1],c=_[i+s];t.prev_length>=t.good_match&&(r>>=2),h>t.lookahead&&(h=t.lookahead);do{if(_[(a=e)+s]===c&&_[a+s-1]===f&&_[a]===_[i]&&_[++a]===_[i+1]){i+=2,a++;do{}while(_[++i]===_[++a]&&_[++i]===_[++a]&&_[++i]===_[++a]&&_[++i]===_[++a]&&_[++i]===_[++a]&&_[++i]===_[++a]&&_[++i]===_[++a]&&_[++i]===_[++a]&&i<u);if(n=H-(u-i),i=u-H,n>s){if(t.match_start=e,s=n,n>=h)break;f=_[i+s-1],c=_[i+s]}}}while((e=d[e&o])>l&&0!==--r);return s<=t.lookahead?s:t.lookahead},at=function(t){var e,a,n,r,i,s=t.w_size;do{if(r=t.window_size-t.lookahead-t.strstart,t.strstart>=s+(s-J)){t.window.set(t.window.subarray(s,s+s),0),t.match_start-=s,t.strstart-=s,t.block_start-=s,e=a=t.hash_size;do{n=t.head[--e],t.head[e]=n>=s?n-s:0}while(--a);e=a=s;do{n=t.prev[--e],t.prev[e]=n>=s?n-s:0}while(--a);r+=s}if(0===t.strm.avail_in)break;if(a=tt(t.strm,t.window,t.strstart+t.lookahead,r),t.lookahead+=a,t.lookahead+t.insert>=3)for(i=t.strstart-t.insert,t.ins_h=t.window[i],t.ins_h=W(t,t.ins_h,t.window[i+1]);t.insert&&(t.ins_h=W(t,t.ins_h,t.window[i+3-1]),t.prev[i&t.w_mask]=t.head[t.ins_h],t.head[t.ins_h]=i,i++,t.insert--,!(t.lookahead+t.insert<3)););}while(t.lookahead<J&&0!==t.strm.avail_in)},nt=function(t,e){for(var a,n;;){if(t.lookahead<J){if(at(t),t.lookahead<J&&0===e)return 1;if(0===t.lookahead)break}if(a=0,t.lookahead>=3&&(t.ins_h=W(t,t.ins_h,t.window[t.strstart+3-1]),a=t.prev[t.strstart&t.w_mask]=t.head[t.ins_h],t.head[t.ins_h]=t.strstart),0!==a&&t.strstart-a<=t.w_size-J&&(t.match_length=et(t,a)),t.match_length>=3)if(n=F(t,t.strstart-t.match_start,t.match_length-3),t.lookahead-=t.match_length,t.match_length<=t.max_lazy_match&&t.lookahead>=3){t.match_length--;do{t.strstart++,t.ins_h=W(t,t.ins_h,t.window[t.strstart+3-1]),a=t.prev[t.strstart&t.w_mask]=t.head[t.ins_h],t.head[t.ins_h]=t.strstart}while(0!==--t.match_length);t.strstart++}else t.strstart+=t.match_length,t.match_length=0,t.ins_h=t.window[t.strstart],t.ins_h=W(t,t.ins_h,t.window[t.strstart+1]);else n=F(t,0,t.window[t.strstart]),t.lookahead--,t.strstart++;if(n&&(Y(t,!1),0===t.strm.avail_out))return 1}return t.insert=t.strstart<2?t.strstart:2,4===e?(Y(t,!0),0===t.strm.avail_out?3:4):t.last_lit&&(Y(t,!1),0===t.strm.avail_out)?1:2},rt=function(t,e){for(var a,n,r;;){if(t.lookahead<J){if(at(t),t.lookahead<J&&0===e)return 1;if(0===t.lookahead)break}if(a=0,t.lookahead>=3&&(t.ins_h=W(t,t.ins_h,t.window[t.strstart+3-1]),a=t.prev[t.strstart&t.w_mask]=t.head[t.ins_h],t.head[t.ins_h]=t.strstart),t.prev_length=t.match_length,t.prev_match=t.match_start,t.match_length=2,0!==a&&t.prev_length<t.max_lazy_match&&t.strstart-a<=t.w_size-J&&(t.match_length=et(t,a),t.match_length<=5&&(1===t.strategy||3===t.match_length&&t.strstart-t.match_start>4096)&&(t.match_length=2)),t.prev_length>=3&&t.match_length<=t.prev_length){r=t.strstart+t.lookahead-3,n=F(t,t.strstart-1-t.prev_match,t.prev_length-3),t.lookahead-=t.prev_length-1,t.prev_length-=2;do{++t.strstart<=r&&(t.ins_h=W(t,t.ins_h,t.window[t.strstart+3-1]),a=t.prev[t.strstart&t.w_mask]=t.head[t.ins_h],t.head[t.ins_h]=t.strstart)}while(0!==--t.prev_length);if(t.match_available=0,t.match_length=2,t.strstart++,n&&(Y(t,!1),0===t.strm.avail_out))return 1}else if(t.match_available){if((n=F(t,0,t.window[t.strstart-1]))&&Y(t,!1),t.strstart++,t.lookahead--,0===t.strm.avail_out)return 1}else t.match_available=1,t.strstart++,t.lookahead--}return t.match_available&&(n=F(t,0,t.window[t.strstart-1]),t.match_available=0),t.insert=t.strstart<2?t.strstart:2,4===e?(Y(t,!0),0===t.strm.avail_out?3:4):t.last_lit&&(Y(t,!1),0===t.strm.avail_out)?1:2};function it(t,e,a,n,r){this.good_length=t,this.max_lazy=e,this.nice_length=a,this.max_chain=n,this.func=r}var st=[new it(0,0,0,0,function(t,e){var a=65535;for(a>t.pending_buf_size-5&&(a=t.pending_buf_size-5);;){if(t.lookahead<=1){if(at(t),0===t.lookahead&&0===e)return 1;if(0===t.lookahead)break}t.strstart+=t.lookahead,t.lookahead=0;var n=t.block_start+a;if((0===t.strstart||t.strstart>=n)&&(t.lookahead=t.strstart-n,t.strstart=n,Y(t,!1),0===t.strm.avail_out))return 1;if(t.strstart-t.block_start>=t.w_size-J&&(Y(t,!1),0===t.strm.avail_out))return 1}return t.insert=0,4===e?(Y(t,!0),0===t.strm.avail_out?3:4):(t.strstart>t.block_start&&(Y(t,!1),t.strm.avail_out),1)}),new it(4,4,8,4,nt),new it(4,5,16,8,nt),new it(4,6,32,32,nt),new it(4,4,16,16,rt),new it(8,16,32,32,rt),new it(8,16,128,128,rt),new it(8,32,128,256,rt),new it(32,128,258,1024,rt),new it(32,258,258,4096,rt)];function ht(){this.strm=null,this.status=0,this.pending_buf=null,this.pending_buf_size=0,this.pending_out=0,this.pending=0,this.wrap=0,this.gzhead=null,this.gzindex=0,this.method=8,this.last_flush=-1,this.w_size=0,this.w_bits=0,this.w_mask=0,this.window=null,this.window_size=0,this.prev=null,this.head=null,this.ins_h=0,this.hash_size=0,this.hash_bits=0,this.hash_mask=0,this.hash_shift=0,this.block_start=0,this.match_length=0,this.prev_match=0,this.match_available=0,this.strstart=0,this.match_start=0,this.lookahead=0,this.prev_length=0,this.max_chain_length=0,this.max_lazy_match=0,this.level=0,this.strategy=0,this.good_match=0,this.nice_match=0,this.dyn_ltree=new Uint16Array(1146),this.dyn_dtree=new Uint16Array(122),this.bl_tree=new Uint16Array(78),V(this.dyn_ltree),V(this.dyn_dtree),V(this.bl_tree),this.l_desc=null,this.d_desc=null,this.bl_desc=null,this.bl_count=new Uint16Array(16),this.heap=new Uint16Array(573),V(this.heap),this.heap_len=0,this.heap_max=0,this.depth=new Uint16Array(573),V(this.depth),this.l_buf=0,this.lit_bufsize=0,this.last_lit=0,this.d_buf=0,this.opt_len=0,this.static_len=0,this.matches=0,this.insert=0,this.bi_buf=0,this.bi_valid=0}for(var lt=function(t){var e,i=function(t){if(!t||!t.state)return Q(t,G);t.total_in=t.total_out=0,t.data_type=2;var e=t.state;return e.pending=0,e.pending_out=0,e.wrap<0&&(e.wrap=-e.wrap),e.status=e.wrap?42:N,t.adler=2===e.wrap?0:1,e.last_flush=0,function(t){D||(function(){var t,e,i,g,v,w=Array(16);for(i=0,g=0;g<28;g++)for(o[g]=i,t=0;t<1<<a[g];t++)_[i++]=g;for(_[i-1]=g,v=0,g=0;g<16;g++)for(c[g]=v,t=0;t<1<<n[g];t++)l[v++]=g;for(v>>=7;g<30;g++)for(c[g]=v<<7,t=0;t<1<<n[g]-7;t++)l[256+v++]=g;for(e=0;e<=15;e++)w[e]=0;for(t=0;t<=143;)s[2*t+1]=8,t++,w[8]++;for(;t<=255;)s[2*t+1]=9,t++,w[9]++;for(;t<=279;)s[2*t+1]=7,t++,w[7]++;for(;t<=287;)s[2*t+1]=8,t++,w[8]++;for(z(s,287,w),t=0;t<30;t++)h[2*t+1]=5,h[2*t]=y(t,5);d=new p(s,a,257,286,15),u=new p(h,n,0,30,15),f=new p([],r,0,19,7)}(),D=!0),t.l_desc=new g(t.dyn_ltree,d),t.d_desc=new g(t.dyn_dtree,u),t.bl_desc=new g(t.bl_tree,f),t.bi_buf=0,t.bi_valid=0,k(t)}(e),0}(t);return 0===i&&((e=t.state).window_size=2*e.w_size,V(e.head),e.max_lazy_match=st[e.level].max_lazy,e.good_match=st[e.level].good_length,e.nice_match=st[e.level].nice_length,e.max_chain_length=st[e.level].max_chain,e.strstart=0,e.block_start=0,e.lookahead=0,e.insert=0,e.match_length=e.prev_length=2,e.match_available=0,e.ins_h=0),i},_t=function(t,e){var a,n;if(!t||!t.state||e>5||e<0)return t?Q(t,G):G;var r=t.state;if(!t.output||!t.input&&0!==t.avail_in||r.status===P&&4!==e)return Q(t,0===t.avail_out?-5:G);r.strm=t;var i=r.last_flush;if(r.last_flush=e,42===r.status)if(2===r.wrap)t.adler=0,Z(r,31),Z(r,139),Z(r,8),r.gzhead?(Z(r,(r.gzhead.text?1:0)+(r.gzhead.hcrc?2:0)+(r.gzhead.extra?4:0)+(r.gzhead.name?8:0)+(r.gzhead.comment?16:0)),Z(r,255&r.gzhead.time),Z(r,r.gzhead.time>>8&255),Z(r,r.gzhead.time>>16&255),Z(r,r.gzhead.time>>24&255),Z(r,9===r.level?2:r.strategy>=2||r.level<2?4:0),Z(r,255&r.gzhead.os),r.gzhead.extra&&r.gzhead.extra.length&&(Z(r,255&r.gzhead.extra.length),Z(r,r.gzhead.extra.length>>8&255)),r.gzhead.hcrc&&(t.adler=T(t.adler,r.pending_buf,r.pending,0)),r.gzindex=0,r.status=69):(Z(r,0),Z(r,0),Z(r,0),Z(r,0),Z(r,0),Z(r,9===r.level?2:r.strategy>=2||r.level<2?4:0),Z(r,3),r.status=N);else{var h=8+(r.w_bits-8<<4)<<8;h|=(r.strategy>=2||r.level<2?0:r.level<6?1:6===r.level?2:3)<<6,0!==r.strstart&&(h|=32),h+=31-h%31,r.status=N,$(r,h),0!==r.strstart&&($(r,t.adler>>>16),$(r,65535&t.adler)),t.adler=1}if(69===r.status)if(r.gzhead.extra){for(a=r.pending;r.gzindex<(65535&r.gzhead.extra.length)&&(r.pending!==r.pending_buf_size||(r.gzhead.hcrc&&r.pending>a&&(t.adler=T(t.adler,r.pending_buf,r.pending-a,a)),X(t),a=r.pending,r.pending!==r.pending_buf_size));)Z(r,255&r.gzhead.extra[r.gzindex]),r.gzindex++;r.gzhead.hcrc&&r.pending>a&&(t.adler=T(t.adler,r.pending_buf,r.pending-a,a)),r.gzindex===r.gzhead.extra.length&&(r.gzindex=0,r.status=73)}else r.status=73;if(73===r.status)if(r.gzhead.name){a=r.pending;do{if(r.pending===r.pending_buf_size&&(r.gzhead.hcrc&&r.pending>a&&(t.adler=T(t.adler,r.pending_buf,r.pending-a,a)),X(t),a=r.pending,r.pending===r.pending_buf_size)){n=1;break}n=r.gzindex<r.gzhead.name.length?255&r.gzhead.name.charCodeAt(r.gzindex++):0,Z(r,n)}while(0!==n);r.gzhead.hcrc&&r.pending>a&&(t.adler=T(t.adler,r.pending_buf,r.pending-a,a)),0===n&&(r.gzindex=0,r.status=91)}else r.status=91;if(91===r.status)if(r.gzhead.comment){a=r.pending;do{if(r.pending===r.pending_buf_size&&(r.gzhead.hcrc&&r.pending>a&&(t.adler=T(t.adler,r.pending_buf,r.pending-a,a)),X(t),a=r.pending,r.pending===r.pending_buf_size)){n=1;break}n=r.gzindex<r.gzhead.comment.length?255&r.gzhead.comment.charCodeAt(r.gzindex++):0,Z(r,n)}while(0!==n);r.gzhead.hcrc&&r.pending>a&&(t.adler=T(t.adler,r.pending_buf,r.pending-a,a)),0===n&&(r.status=K)}else r.status=K;if(r.status===K&&(r.gzhead.hcrc?(r.pending+2>r.pending_buf_size&&X(t),r.pending+2<=r.pending_buf_size&&(Z(r,255&t.adler),Z(r,t.adler>>8&255),t.adler=0,r.status=N)):r.status=N),0!==r.pending){if(X(t),0===t.avail_out)return r.last_flush=-1,0}else if(0===t.avail_in&&R(e)<=R(i)&&4!==e)return Q(t,-5);if(r.status===P&&0!==t.avail_in)return Q(t,-5);if(0!==t.avail_in||0!==r.lookahead||0!==e&&r.status!==P){var l=2===r.strategy?function(t,e){for(var a;;){if(0===t.lookahead&&(at(t),0===t.lookahead)){if(0===e)return 1;break}if(t.match_length=0,a=F(t,0,t.window[t.strstart]),t.lookahead--,t.strstart++,a&&(Y(t,!1),0===t.strm.avail_out))return 1}return t.insert=0,4===e?(Y(t,!0),0===t.strm.avail_out?3:4):t.last_lit&&(Y(t,!1),0===t.strm.avail_out)?1:2}(r,e):3===r.strategy?function(t,e){for(var a,n,r,i,s=t.window;;){if(t.lookahead<=H){if(at(t),t.lookahead<=H&&0===e)return 1;if(0===t.lookahead)break}if(t.match_length=0,t.lookahead>=3&&t.strstart>0&&(n=s[r=t.strstart-1])===s[++r]&&n===s[++r]&&n===s[++r]){i=t.strstart+H;do{}while(n===s[++r]&&n===s[++r]&&n===s[++r]&&n===s[++r]&&n===s[++r]&&n===s[++r]&&n===s[++r]&&n===s[++r]&&r<i);t.match_length=H-(i-r),t.match_length>t.lookahead&&(t.match_length=t.lookahead)}if(t.match_length>=3?(a=F(t,1,t.match_length-3),t.lookahead-=t.match_length,t.strstart+=t.match_length,t.match_length=0):(a=F(t,0,t.window[t.strstart]),t.lookahead--,t.strstart++),a&&(Y(t,!1),0===t.strm.avail_out))return 1}return t.insert=0,4===e?(Y(t,!0),0===t.strm.avail_out?3:4):t.last_lit&&(Y(t,!1),0===t.strm.avail_out)?1:2}(r,e):st[r.level].func(r,e);if(3!==l&&4!==l||(r.status=P),1===l||3===l)return 0===t.avail_out&&(r.last_flush=-1),0;if(2===l&&(1===e?function(t){m(t,2,3),b(t,256,s),function(t){16===t.bi_valid?(w(t,t.bi_buf),t.bi_buf=0,t.bi_valid=0):t.bi_valid>=8&&(t.pending_buf[t.pending++]=255&t.bi_buf,t.bi_buf>>=8,t.bi_valid-=8)}(t)}(r):5!==e&&(q(r,0,0,!1),3===e&&(V(r.head),0===r.lookahead&&(r.strstart=0,r.block_start=0,r.insert=0))),X(t),0===t.avail_out))return r.last_flush=-1,0}return 4!==e?0:r.wrap<=0?1:(2===r.wrap?(Z(r,255&t.adler),Z(r,t.adler>>8&255),Z(r,t.adler>>16&255),Z(r,t.adler>>24&255),Z(r,255&t.total_in),Z(r,t.total_in>>8&255),Z(r,t.total_in>>16&255),Z(r,t.total_in>>24&255)):($(r,t.adler>>>16),$(r,65535&t.adler)),X(t),r.wrap>0&&(r.wrap=-r.wrap),0!==r.pending?0:1)},ot=function(t){if(!t||!t.state)return G;var e=t.state.status;return 42!==e&&69!==e&&73!==e&&91!==e&&e!==K&&e!==N&&e!==P?Q(t,G):(t.state=null,e===N?Q(t,-3):0)},dt=new Uint8Array(256),ut=0;ut<256;ut++)dt[ut]=ut>=252?6:ut>=248?5:ut>=240?4:ut>=224?3:ut>=192?2:1;dt[254]=dt[254]=1;var ft=function(){this.input=null,this.next_in=0,this.avail_in=0,this.total_in=0,this.output=null,this.next_out=0,this.avail_out=0,this.total_out=0,this.msg=\"\",this.state=null,this.data_type=2,this.adler=0},ct=Object.prototype.toString;function pt(){this.options={level:-1,method:8,chunkSize:16384,windowBits:15,memLevel:8,strategy:0};var t=this.options;t.raw&&t.windowBits>0?t.windowBits=-t.windowBits:t.gzip&&t.windowBits>0&&t.windowBits<16&&(t.windowBits+=16),this.err=0,this.msg=\"\",this.ended=!1,this.chunks=[],this.strm=new ft,this.strm.avail_out=0;var e,a,n=function(t,e,a,n,r,i){if(!t)return G;var s=1;if(-1===e&&(e=6),n<0?(s=0,n=-n):n>15&&(s=2,n-=16),r<1||r>9||8!==a||n<8||n>15||e<0||e>9||i<0||i>4)return Q(t,G);8===n&&(n=9);var h=new ht;return t.state=h,h.strm=t,h.wrap=s,h.gzhead=null,h.w_bits=n,h.w_size=1<<h.w_bits,h.w_mask=h.w_size-1,h.hash_bits=r+7,h.hash_size=1<<h.hash_bits,h.hash_mask=h.hash_size-1,h.hash_shift=~~((h.hash_bits+3-1)/3),h.window=new Uint8Array(2*h.w_size),h.head=new Uint16Array(h.hash_size),h.prev=new Uint16Array(h.w_size),h.lit_bufsize=1<<r+6,h.pending_buf_size=4*h.lit_bufsize,h.pending_buf=new Uint8Array(h.pending_buf_size),h.d_buf=1*h.lit_bufsize,h.l_buf=3*h.lit_bufsize,h.level=e,h.strategy=i,h.method=a,lt(t)}(this.strm,t.level,t.method,t.windowBits,t.memLevel,t.strategy);if(0!==n)throw Error(O[n]);if(t.header&&(e=this.strm,a=t.header,e&&e.state&&(2!==e.state.wrap||(e.state.gzhead=a))),t.dictionary){var r;if(r=\"[object ArrayBuffer]\"===ct.call(t.dictionary)?new Uint8Array(t.dictionary):t.dictionary,0!==(n=function(t,e){var a=e.length;if(!t||!t.state)return G;var n=t.state,r=n.wrap;if(2===r||1===r&&42!==n.status||n.lookahead)return G;if(1===r&&(t.adler=L(t.adler,e,a,0)),n.wrap=0,a>=n.w_size){0===r&&(V(n.head),n.strstart=0,n.block_start=0,n.insert=0);var i=new Uint8Array(n.w_size);i.set(e.subarray(a-n.w_size,a),0),e=i,a=n.w_size}var s=t.avail_in,h=t.next_in,l=t.input;for(t.avail_in=a,t.next_in=0,t.input=e,at(n);n.lookahead>=3;){var _=n.strstart,o=n.lookahead-2;do{n.ins_h=W(n,n.ins_h,n.window[_+3-1]),n.prev[_&n.w_mask]=n.head[n.ins_h],n.head[n.ins_h]=_,_++}while(--o);n.strstart=_,n.lookahead=2,at(n)}return n.strstart+=n.lookahead,n.block_start=n.strstart,n.insert=n.lookahead,n.lookahead=0,n.match_length=n.prev_length=2,n.match_available=0,t.next_in=h,t.input=l,t.avail_in=s,n.wrap=r,0}(this.strm,r)))throw Error(O[n]);this._dict_set=!0}}function gt(t,e,a){try{t.postMessage({type:\"errored\",error:e,streamId:a})}catch(n){t.postMessage({type:\"errored\",error:e+\"\",streamId:a})}}function vt(t){const e=t.strm.adler;return new Uint8Array([3,0,e>>>24&255,e>>>16&255,e>>>8&255,255&e])}pt.prototype.push=function(t,e){var a,n,r=this.strm,i=this.options.chunkSize;if(this.ended)return!1;for(n=e===~~e?e:!0===e?4:0,\"[object ArrayBuffer]\"===ct.call(t)?r.input=new Uint8Array(t):r.input=t,r.next_in=0,r.avail_in=r.input.length;;)if(0===r.avail_out&&(r.output=new Uint8Array(i),r.next_out=0,r.avail_out=i),(2===n||3===n)&&r.avail_out<=6)this.onData(r.output.subarray(0,r.next_out)),r.avail_out=0;else{if(1===(a=_t(r,n)))return r.next_out>0&&this.onData(r.output.subarray(0,r.next_out)),a=ot(this.strm),this.onEnd(a),this.ended=!0,0===a;if(0!==r.avail_out){if(n>0&&r.next_out>0)this.onData(r.output.subarray(0,r.next_out)),r.avail_out=0;else if(0===r.avail_in)break}else this.onData(r.output)}return!0},pt.prototype.onData=function(t){this.chunks.push(t)},pt.prototype.onEnd=function(t){0===t&&(this.result=function(t){for(var e=0,a=0,n=t.length;a<n;a++)e+=t[a].length;for(var r=new Uint8Array(e),i=0,s=0,h=t.length;i<h;i++){var l=t[i];r.set(l,s),s+=l.length}return r}(this.chunks)),this.chunks=[],this.err=t,this.msg=this.strm.msg},function(e=self){try{const a=new Map;e.addEventListener(\"message\",n=>{try{const r=function(e,a){switch(a.action){case\"init\":return{type:\"initialized\",version:\"6.33.0\"};case\"write\":{let n=e.get(a.streamId);n||(n=new pt,e.set(a.streamId,n));const r=n.chunks.length,i=function(t){if(\"function\"==typeof TextEncoder&&TextEncoder.prototype.encode)return(new TextEncoder).encode(t);let e,a,n,r,i,s=t.length,h=0;for(r=0;r<s;r++)a=t.charCodeAt(r),55296==(64512&a)&&r+1<s&&(n=t.charCodeAt(r+1),56320==(64512&n)&&(a=65536+(a-55296<<10)+(n-56320),r++)),h+=a<128?1:a<2048?2:a<65536?3:4;for(e=new Uint8Array(h),i=0,r=0;i<h;r++)a=t.charCodeAt(r),55296==(64512&a)&&r+1<s&&(n=t.charCodeAt(r+1),56320==(64512&n)&&(a=65536+(a-55296<<10)+(n-56320),r++)),a<128?e[i++]=a:a<2048?(e[i++]=192|a>>>6,e[i++]=128|63&a):a<65536?(e[i++]=224|a>>>12,e[i++]=128|a>>>6&63,e[i++]=128|63&a):(e[i++]=240|a>>>18,e[i++]=128|a>>>12&63,e[i++]=128|a>>>6&63,e[i++]=128|63&a);return e}(a.data);return n.push(i,2),{type:\"wrote\",id:a.id,streamId:a.streamId,result:t(n.chunks.slice(r)),trailer:vt(n),additionalBytesCount:i.length}}case\"reset\":e.delete(a.streamId)}}(a,n.data);r&&e.postMessage(r)}catch(t){gt(e,t,n.data&&\"streamId\"in n.data?n.data.streamId:void 0)}})}catch(t){gt(e,t)}}()})();"])));
}
var state = { status: 0 };
function startDeflateWorker(configuration, source, onInitializationFailure) {
	if (state.status === 0) doStartDeflateWorker(configuration, source);
	switch (state.status) {
		case 1:
			state.initializationFailureCallbacks.push(onInitializationFailure);
			return state.worker;
		case 3: return state.worker;
	}
}
function getDeflateWorkerStatus() {
	return state.status;
}
/**
* Starts the deflate worker and handle messages and errors
*
* The spec allow browsers to handle worker errors differently:
* - Chromium throws an exception
* - Firefox fires an error event
*
* more details: https://bugzilla.mozilla.org/show_bug.cgi?id=1736865#c2
*/
function doStartDeflateWorker(configuration, source) {
	try {
		const worker = mockable(createDeflateWorker)(configuration);
		const { stop: removeErrorListener } = addEventListener(configuration, worker, "error", (error) => {
			onError(configuration, source, error);
		});
		const { stop: removeMessageListener } = addEventListener(configuration, worker, "message", ({ data }) => {
			if (data.type === "errored") onError(configuration, source, data.error, data.streamId);
			else if (data.type === "initialized") onInitialized(data.version);
		});
		worker.postMessage({ action: "init" });
		setTimeout(() => onTimeout(source), INITIALIZATION_TIME_OUT_DELAY);
		const stop = () => {
			removeErrorListener();
			removeMessageListener();
		};
		state = {
			status: 1,
			worker,
			stop,
			initializationFailureCallbacks: []
		};
	} catch (error) {
		onError(configuration, source, error);
	}
}
function onTimeout(source) {
	if (state.status === 1) {
		display.error(`${source} failed to start: a timeout occurred while initializing the Worker`);
		state.initializationFailureCallbacks.forEach((callback) => callback());
		state = { status: 2 };
	}
}
function onInitialized(version) {
	if (state.status === 1) state = {
		status: 3,
		worker: state.worker,
		stop: state.stop,
		version
	};
}
function onError(configuration, source, error, streamId) {
	if (state.status === 1 || state.status === 0) {
		reportScriptLoadingError({
			configuredUrl: configuration.workerUrl,
			error,
			source,
			scriptType: "worker"
		});
		if (state.status === 1) state.initializationFailureCallbacks.forEach((callback) => callback());
		state = { status: 2 };
	} else addTelemetryError(error, {
		worker_version: state.status === 3 && state.version,
		stream_id: streamId
	});
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-rum@6.33.0_@datadog+browser-logs@6.33.0/node_modules/@datadog/browser-rum/esm/boot/isBrowserSupported.js
/**
* Test for Browser features used while recording
*/
function isBrowserSupported() {
	return typeof Array.from === "function" && typeof CSSSupportsRule === "function" && typeof URL.createObjectURL === "function" && "forEach" in NodeList.prototype;
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-rum@6.33.0_@datadog+browser-logs@6.33.0/node_modules/@datadog/browser-rum/esm/domain/getSessionReplayLink.js
function getSessionReplayLink(configuration, sessionManager, viewHistory, isRecordingStarted) {
	const session = sessionManager.findTrackedSession();
	const errorType = getErrorType(session, isRecordingStarted);
	return getSessionReplayUrl(configuration, {
		viewContext: viewHistory.findView(),
		errorType,
		session
	});
}
function getErrorType(session, isRecordingStarted) {
	if (!isBrowserSupported()) return "browser-not-supported";
	if (!session) return "rum-not-tracked";
	if (session.sessionReplay === 0) return "incorrect-session-plan";
	if (!isRecordingStarted) return "replay-not-started";
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-rum@6.33.0_@datadog+browser-logs@6.33.0/node_modules/@datadog/browser-rum/esm/domain/startRecorderInitTelemetry.js
function startRecorderInitTelemetry(telemetry, observable) {
	if (!telemetry.metricsEnabled) return { stop: noop };
	let startContext;
	let documentReadyDuration;
	let recorderSettledDuration;
	const { unsubscribe } = observable.subscribe((event) => {
		switch (event.type) {
			case "start":
				startContext = {
					forced: event.forced,
					timestamp: timeStampNow()
				};
				documentReadyDuration = void 0;
				recorderSettledDuration = void 0;
				break;
			case "document-ready":
				if (startContext) documentReadyDuration = elapsed(startContext.timestamp, timeStampNow());
				break;
			case "recorder-settled":
				if (startContext) recorderSettledDuration = elapsed(startContext.timestamp, timeStampNow());
				break;
			case "aborted":
			case "deflate-encoder-load-failed":
			case "recorder-load-failed":
			case "succeeded":
				unsubscribe();
				if (startContext) addTelemetryMetrics("Recorder init metrics", { metrics: createRecorderInitMetrics(startContext.forced, recorderSettledDuration, elapsed(startContext.timestamp, timeStampNow()), event.type, documentReadyDuration) });
		}
	});
	return { stop: unsubscribe };
}
function createRecorderInitMetrics(forced, loadRecorderModuleDuration, recorderInitDuration, result, waitForDocReadyDuration) {
	return {
		forced,
		loadRecorderModuleDuration,
		recorderInitDuration,
		result,
		waitForDocReadyDuration
	};
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-rum@6.33.0_@datadog+browser-logs@6.33.0/node_modules/@datadog/browser-rum/esm/boot/lazyLoadRecorder.js
async function lazyLoadRecorder() {
	try {
		return await mockable(importRecorder)();
	} catch (error) {
		reportScriptLoadingError({
			error,
			source: "Recorder",
			scriptType: "module"
		});
	}
}
async function importRecorder() {
	return (await __vitePreload(() => import(
		/* webpackChunkName: "recorder" */
		"./startRecording-Dd0QRvga.js"
), [], import.meta.url)).startRecording;
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-rum@6.33.0_@datadog+browser-logs@6.33.0/node_modules/@datadog/browser-rum/esm/boot/postStartStrategy.js
function createPostStartStrategy(configuration, lifeCycle, sessionManager, viewHistory, getOrCreateDeflateEncoder, telemetry) {
	let status = 0;
	let stopRecording;
	lifeCycle.subscribe(9, () => {
		if (status === 2 || status === 3) {
			stop();
			status = 1;
		}
	});
	lifeCycle.subscribe(10, () => {
		if (status === 1) start();
	});
	const observable = new Observable();
	startRecorderInitTelemetry(telemetry, observable);
	const doStart = async (forced) => {
		observable.notify({
			type: "start",
			forced
		});
		const [startRecordingImpl] = await Promise.all([notifyWhenSettled(observable, { type: "recorder-settled" }, lazyLoadRecorder()), notifyWhenSettled(observable, { type: "document-ready" }, asyncRunOnReadyState(configuration, "interactive"))]);
		if (status !== 2) {
			observable.notify({ type: "aborted" });
			return;
		}
		if (!startRecordingImpl) {
			status = 0;
			observable.notify({ type: "recorder-load-failed" });
			return;
		}
		const deflateEncoder = getOrCreateDeflateEncoder();
		if (!deflateEncoder) {
			status = 0;
			observable.notify({ type: "deflate-encoder-load-failed" });
			return;
		}
		({stop: stopRecording} = startRecordingImpl(lifeCycle, configuration, sessionManager, viewHistory, deflateEncoder, telemetry));
		status = 3;
		observable.notify({ type: "succeeded" });
	};
	function start(options) {
		const session = sessionManager.findTrackedSession();
		if (canStartRecording(session, options)) {
			status = 1;
			return;
		}
		if (isRecordingInProgress(status)) return;
		status = 2;
		const forced = shouldForceReplay(session, options) || false;
		doStart(forced).catch(monitorError);
		if (forced) sessionManager.setForcedReplay();
	}
	function stop() {
		if (status === 3) stopRecording === null || stopRecording === void 0 || stopRecording();
		status = 0;
	}
	return {
		start,
		stop,
		getSessionReplayLink() {
			return getSessionReplayLink(configuration, sessionManager, viewHistory, status !== 0);
		},
		isRecording: () => status === 3
	};
}
function canStartRecording(session, options) {
	return !session || session.sessionReplay === 0 && (!options || !options.force);
}
function isRecordingInProgress(status) {
	return status === 2 || status === 3;
}
function shouldForceReplay(session, options) {
	return options && options.force && session.sessionReplay === 0;
}
async function notifyWhenSettled(observable, event, promise) {
	try {
		return await promise;
	} finally {
		observable.notify(event);
	}
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-rum@6.33.0_@datadog+browser-logs@6.33.0/node_modules/@datadog/browser-rum/esm/boot/preStartStrategy.js
function createPreStartStrategy() {
	let status = 0;
	return {
		strategy: {
			start() {
				status = 1;
			},
			stop() {
				status = 2;
			},
			isRecording: () => false,
			getSessionReplayLink: noop
		},
		shouldStartImmediately(configuration) {
			return status === 1 || status === 0 && !configuration.startSessionReplayRecordingManually;
		}
	};
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-rum@6.33.0_@datadog+browser-logs@6.33.0/node_modules/@datadog/browser-rum/esm/boot/recorderApi.js
function makeRecorderApi() {
	if (canUseEventBridge() && !bridgeSupports("records") || !isBrowserSupported()) return {
		start: noop,
		stop: noop,
		getReplayStats: () => void 0,
		onRumStart: noop,
		isRecording: () => false,
		getSessionReplayLink: () => void 0
	};
	let { strategy, shouldStartImmediately } = createPreStartStrategy();
	return {
		start: (options) => strategy.start(options),
		stop: () => strategy.stop(),
		getSessionReplayLink: () => strategy.getSessionReplayLink(),
		onRumStart,
		isRecording: () => getDeflateWorkerStatus() === 3 && strategy.isRecording(),
		getReplayStats: (viewId) => getDeflateWorkerStatus() === 3 ? getReplayStats(viewId) : void 0
	};
	function onRumStart(lifeCycle, configuration, sessionManager, viewHistory, worker, telemetry) {
		let cachedDeflateEncoder;
		function getOrCreateDeflateEncoder() {
			if (!cachedDeflateEncoder) {
				worker !== null && worker !== void 0 || (worker = startDeflateWorker(configuration, "Datadog Session Replay", () => strategy.stop()));
				if (worker) cachedDeflateEncoder = createDeflateEncoder(configuration, worker, 1);
			}
			return cachedDeflateEncoder;
		}
		strategy = createPostStartStrategy(configuration, lifeCycle, sessionManager, viewHistory, getOrCreateDeflateEncoder, telemetry);
		if (shouldStartImmediately(configuration)) strategy.start();
	}
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-rum@6.33.0_@datadog+browser-logs@6.33.0/node_modules/@datadog/browser-rum/esm/domain/profiling/profilingSupported.js
function isProfilingSupported() {
	return getGlobalObject().Profiler !== void 0;
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-rum@6.33.0_@datadog+browser-logs@6.33.0/node_modules/@datadog/browser-rum/esm/domain/profiling/profilingContext.js
function startProfilingContext(hooks) {
	let currentContext = { status: "starting" };
	hooks.register(0, ({ eventType }) => {
		if (eventType !== RumEventType.VIEW && eventType !== RumEventType.LONG_TASK && eventType !== RumEventType.ACTION && eventType !== RumEventType.VITAL) return SKIPPED;
		return {
			type: eventType,
			_dd: { profiling: currentContext }
		};
	});
	return {
		get: () => currentContext,
		set: (newContext) => {
			currentContext = newContext;
		}
	};
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-rum@6.33.0_@datadog+browser-logs@6.33.0/node_modules/@datadog/browser-rum/esm/boot/lazyLoadProfiler.js
async function lazyLoadProfiler() {
	try {
		return await mockable(importProfiler)();
	} catch (error) {
		reportScriptLoadingError({
			error,
			source: "Profiler",
			scriptType: "module"
		});
	}
}
async function importProfiler() {
	return (await __vitePreload(() => import(
		/* webpackChunkName: "profiler" */
		"./profiler-CGvoPett.js"
), [], import.meta.url)).createRumProfiler;
}
//#endregion
//#region node_modules/.pnpm/@datadog+browser-rum@6.33.0_@datadog+browser-logs@6.33.0/node_modules/@datadog/browser-rum/esm/boot/profilerApi.js
function makeProfilerApi() {
	let profiler;
	function onRumStart(lifeCycle, hooks, configuration, sessionManager, viewHistory, createEncoder) {
		const session = sessionManager.findTrackedSession();
		if (!session) return;
		if (!isSampled(session.id, configuration.profilingSampleRate)) return;
		const profilingContextManager = startProfilingContext(hooks);
		if (!isProfilingSupported()) {
			profilingContextManager.set({
				status: "error",
				error_reason: "not-supported-by-browser"
			});
			return;
		}
		lazyLoadProfiler().then((createRumProfiler) => {
			if (!createRumProfiler) {
				profilingContextManager.set({
					status: "error",
					error_reason: "failed-to-lazy-load"
				});
				return;
			}
			profiler = createRumProfiler(configuration, lifeCycle, sessionManager, profilingContextManager, createEncoder, viewHistory, void 0);
			profiler.start();
		}).catch(monitorError);
	}
	return {
		onRumStart,
		stop: () => {
			profiler === null || profiler === void 0 || profiler.stop();
		}
	};
}
/**
* The global RUM instance. Use this to call RUM methods.
*
* @category Main
* @see {@link DatadogRum}
* @see [RUM Browser Monitoring Setup](https://docs.datadoghq.com/real_user_monitoring/browser/)
*/
var datadogRum = makeRumPublicApi(makeRecorderApi(), makeProfilerApi(), {
	startDeflateWorker,
	createDeflateEncoder,
	sdkName: "rum"
});
defineGlobal(getGlobalObject(), "DD_RUM", datadogRum);
//#endregion
export { __vitePreload as a, startRecording as i, DEFAULT_RUM_PROFILER_CONFIGURATION as n, createRumProfiler as r, datadogRum as t };
