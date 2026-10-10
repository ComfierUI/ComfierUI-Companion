import { r as __name } from "./rolldown-runtime-xtsTai4I.js";
//#region node_modules/.pnpm/@sentry+core@10.65.0/node_modules/@sentry/core/build/esm/debug-build.js
var DEBUG_BUILD$3 = typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__;
//#endregion
//#region node_modules/.pnpm/@sentry+core@10.65.0/node_modules/@sentry/core/build/esm/utils/worldwide.js
var GLOBAL_OBJ = globalThis;
//#endregion
//#region node_modules/.pnpm/@sentry+core@10.65.0/node_modules/@sentry/core/build/esm/utils/version.js
var SDK_VERSION = "10.65.0";
//#endregion
//#region node_modules/.pnpm/@sentry+core@10.65.0/node_modules/@sentry/core/build/esm/carrier.js
function getMainCarrier() {
	getSentryCarrier(GLOBAL_OBJ);
	return GLOBAL_OBJ;
}
function getSentryCarrier(carrier) {
	const __SENTRY__ = carrier.__SENTRY__ = carrier.__SENTRY__ || {};
	__SENTRY__.version = __SENTRY__.version || "10.65.0";
	return __SENTRY__[SDK_VERSION] = __SENTRY__["10.65.0"] || {};
}
function getGlobalSingleton(name, creator, obj = GLOBAL_OBJ) {
	const __SENTRY__ = obj.__SENTRY__ = obj.__SENTRY__ || {};
	const carrier = __SENTRY__[SDK_VERSION] = __SENTRY__["10.65.0"] || {};
	return carrier[name] || (carrier[name] = creator());
}
//#endregion
//#region node_modules/.pnpm/@sentry+core@10.65.0/node_modules/@sentry/core/build/esm/utils/debug-logger.js
var CONSOLE_LEVELS = [
	"debug",
	"info",
	"warn",
	"error",
	"log",
	"assert",
	"trace"
];
var PREFIX = "Sentry Logger ";
var originalConsoleMethods = {};
function consoleSandbox(callback) {
	if (!("console" in GLOBAL_OBJ)) return callback();
	const console = GLOBAL_OBJ.console;
	const wrappedFuncs = {};
	const wrappedLevels = Object.keys(originalConsoleMethods);
	wrappedLevels.forEach((level) => {
		const originalConsoleMethod = originalConsoleMethods[level];
		wrappedFuncs[level] = console[level];
		console[level] = originalConsoleMethod;
	});
	try {
		return callback();
	} finally {
		wrappedLevels.forEach((level) => {
			console[level] = wrappedFuncs[level];
		});
	}
}
function enable() {
	_getLoggerSettings().enabled = true;
}
function disable() {
	_getLoggerSettings().enabled = false;
}
function isEnabled$1() {
	return _getLoggerSettings().enabled;
}
__name(isEnabled$1, "isEnabled");
function log(...args) {
	_maybeLog("log", ...args);
}
function warn(...args) {
	_maybeLog("warn", ...args);
}
function error(...args) {
	_maybeLog("error", ...args);
}
function _maybeLog(level, ...args) {
	if (!DEBUG_BUILD$3) return;
	if (isEnabled$1()) consoleSandbox(() => {
		GLOBAL_OBJ.console[level](`${PREFIX}[${level}]:`, ...args);
	});
}
function _getLoggerSettings() {
	if (!DEBUG_BUILD$3) return { enabled: false };
	return getGlobalSingleton("loggerSettings", () => ({ enabled: false }));
}
var debug = {
	/** Enable logging. */
	enable,
	/** Disable logging. */
	disable,
	/** Check if logging is enabled. */
	isEnabled: isEnabled$1,
	/** Log a message. */
	log,
	/** Log a warning. */
	warn,
	/** Log an error. */
	error
};
//#endregion
//#region node_modules/.pnpm/@sentry+core@10.65.0/node_modules/@sentry/core/build/esm/utils/stacktrace.js
var STACKTRACE_FRAME_LIMIT = 50;
var WEBPACK_ERROR_REGEXP = /\(error: (.*)\)/;
var STRIP_FRAME_REGEXP = /captureMessage|captureException/;
function createStackParser(...parsers) {
	const sortedParsers = parsers.sort((a, b) => a[0] - b[0]).map((p) => p[1]);
	return (stack, skipFirstLines = 0, framesToPop = 0) => {
		const frames = [];
		const lines = stack.split("\n");
		for (let i = skipFirstLines; i < lines.length; i++) {
			let line = lines[i];
			if (line.length > 1024) line = line.slice(0, 1024);
			const cleanedLine = WEBPACK_ERROR_REGEXP.test(line) ? line.replace(WEBPACK_ERROR_REGEXP, "$1") : line;
			if (cleanedLine.includes("Error: ")) continue;
			for (const parser of sortedParsers) {
				const frame = parser(cleanedLine);
				if (frame) {
					frames.push(frame);
					break;
				}
			}
			if (frames.length >= STACKTRACE_FRAME_LIMIT + framesToPop) break;
		}
		return stripSentryFramesAndReverse(frames.slice(framesToPop));
	};
}
function stackParserFromStackParserOptions(stackParser) {
	if (Array.isArray(stackParser)) return createStackParser(...stackParser);
	return stackParser;
}
function stripSentryFramesAndReverse(stack) {
	if (!stack.length) return [];
	const localStack = Array.from(stack);
	if (/sentryWrapped/.test(getLastStackFrame(localStack).function || "")) localStack.pop();
	localStack.reverse();
	if (STRIP_FRAME_REGEXP.test(getLastStackFrame(localStack).function || "")) {
		localStack.pop();
		if (STRIP_FRAME_REGEXP.test(getLastStackFrame(localStack).function || "")) localStack.pop();
	}
	return localStack.slice(0, STACKTRACE_FRAME_LIMIT).map((frame) => ({
		...frame,
		filename: frame.filename || getLastStackFrame(localStack).filename,
		function: frame.function || "?"
	}));
}
function getLastStackFrame(arr) {
	return arr[arr.length - 1] || {};
}
var defaultFunctionName = "<anonymous>";
function getFunctionName(fn) {
	try {
		if (!fn || typeof fn !== "function") return defaultFunctionName;
		return fn.name || defaultFunctionName;
	} catch {
		return defaultFunctionName;
	}
}
function getFramesFromEvent(event) {
	const exception = event.exception;
	if (exception) {
		const frames = [];
		try {
			exception.values.forEach((value) => {
				if (value.stacktrace.frames) frames.push(...value.stacktrace.frames);
			});
			return frames;
		} catch {
			return;
		}
	}
}
//#endregion
//#region node_modules/.pnpm/@sentry+core@10.65.0/node_modules/@sentry/core/build/esm/instrument/handlers.js
var handlers = {};
var instrumented = {};
function addHandler(type, handler) {
	handlers[type] = handlers[type] || [];
	handlers[type].push(handler);
	return () => {
		const typeHandlers = handlers[type];
		if (typeHandlers) {
			const index = typeHandlers.indexOf(handler);
			if (index !== -1) typeHandlers.splice(index, 1);
		}
	};
}
function maybeInstrument(type, instrumentFn) {
	if (!instrumented[type]) {
		instrumented[type] = true;
		try {
			instrumentFn();
		} catch (e) {
			DEBUG_BUILD$3 && debug.error(`Error while instrumenting ${type}`, e);
		}
	}
}
function triggerHandlers(type, data) {
	const typeHandlers = type && handlers[type];
	if (!typeHandlers) return;
	for (const handler of typeHandlers) try {
		handler(data);
	} catch (e) {
		DEBUG_BUILD$3 && debug.error(`Error while triggering instrumentation handler.
Type: ${type}
Name: ${getFunctionName(handler)}
Error:`, e);
	}
}
//#endregion
//#region node_modules/.pnpm/@sentry+core@10.65.0/node_modules/@sentry/core/build/esm/instrument/globalError.js
var _oldOnErrorHandler = null;
function addGlobalErrorInstrumentationHandler(handler) {
	const type = "error";
	addHandler(type, handler);
	maybeInstrument(type, instrumentError);
}
function instrumentError() {
	_oldOnErrorHandler = GLOBAL_OBJ.onerror;
	GLOBAL_OBJ.onerror = function(msg, url, line, column, error) {
		triggerHandlers("error", {
			column,
			error,
			line,
			msg,
			url
		});
		if (_oldOnErrorHandler) return _oldOnErrorHandler.apply(this, arguments);
		return false;
	};
	GLOBAL_OBJ.onerror.__SENTRY_INSTRUMENTED__ = true;
}
//#endregion
//#region node_modules/.pnpm/@sentry+core@10.65.0/node_modules/@sentry/core/build/esm/instrument/globalUnhandledRejection.js
var _oldOnUnhandledRejectionHandler = null;
function addGlobalUnhandledRejectionInstrumentationHandler(handler) {
	const type = "unhandledrejection";
	addHandler(type, handler);
	maybeInstrument(type, instrumentUnhandledRejection);
}
function instrumentUnhandledRejection() {
	_oldOnUnhandledRejectionHandler = GLOBAL_OBJ.onunhandledrejection;
	GLOBAL_OBJ.onunhandledrejection = function(e) {
		triggerHandlers("unhandledrejection", e);
		if (_oldOnUnhandledRejectionHandler) return _oldOnUnhandledRejectionHandler.apply(this, arguments);
		return true;
	};
	GLOBAL_OBJ.onunhandledrejection.__SENTRY_INSTRUMENTED__ = true;
}
//#endregion
//#region node_modules/.pnpm/@sentry+core@10.65.0/node_modules/@sentry/core/build/esm/utils/is.js
var objectToString = Object.prototype.toString;
function isError(wat) {
	switch (objectToString.call(wat)) {
		case "[object Error]":
		case "[object Exception]":
		case "[object DOMException]":
		case "[object WebAssembly.Exception]": return true;
		default: return isInstanceOf(wat, Error);
	}
}
function isBuiltin(wat, className) {
	return objectToString.call(wat) === `[object ${className}]`;
}
function isErrorEvent$1(wat) {
	return isBuiltin(wat, "ErrorEvent");
}
__name(isErrorEvent$1, "isErrorEvent");
function isDOMError(wat) {
	return isBuiltin(wat, "DOMError");
}
function isDOMException(wat) {
	return isBuiltin(wat, "DOMException");
}
function isString(wat) {
	return isBuiltin(wat, "String");
}
function isParameterizedString(wat) {
	return typeof wat === "object" && wat !== null && "__sentry_template_string__" in wat && "__sentry_template_values__" in wat;
}
function isPrimitive(wat) {
	return wat === null || isParameterizedString(wat) || typeof wat !== "object" && typeof wat !== "function";
}
function isPlainObject(wat) {
	return isBuiltin(wat, "Object");
}
function isObjectLike(wat) {
	return typeof wat === "object" && wat !== null;
}
function isEvent(wat) {
	return typeof Event !== "undefined" && isInstanceOf(wat, Event);
}
function isRegExp(wat) {
	return isBuiltin(wat, "RegExp");
}
function isThenable(wat) {
	return Boolean(wat?.then && typeof wat.then === "function");
}
function isInstanceOf(wat, base) {
	try {
		return wat instanceof base;
	} catch {
		return false;
	}
}
function isRequest(request) {
	return typeof Request !== "undefined" && isInstanceOf(request, Request);
}
//#endregion
//#region node_modules/.pnpm/@sentry+core@10.65.0/node_modules/@sentry/core/build/esm/utils/object.js
function fill(source, name, replacementFactory) {
	if (!(name in source)) return;
	const original = source[name];
	if (typeof original !== "function") return;
	const wrapped = replacementFactory(original);
	if (typeof wrapped === "function") markFunctionWrapped(wrapped, original);
	try {
		source[name] = wrapped;
	} catch {
		DEBUG_BUILD$3 && debug.log(`Failed to replace method "${name}" in object`, source);
	}
}
function addNonEnumerableProperty(obj, name, value) {
	try {
		Object.defineProperty(obj, name, {
			value,
			writable: true,
			configurable: true
		});
	} catch {
		DEBUG_BUILD$3 && debug.log(`Failed to add non-enumerable property "${String(name)}" to object`, obj);
	}
}
function markFunctionWrapped(wrapped, original) {
	try {
		wrapped.prototype = original.prototype = original.prototype || {};
		addNonEnumerableProperty(wrapped, "__sentry_original__", original);
	} catch {}
}
function getOriginalFunction(func) {
	return func.__sentry_original__;
}
function convertToPlainObject(value) {
	if (isError(value)) return {
		message: value.message,
		name: value.name,
		stack: value.stack,
		...getOwnProperties(value)
	};
	if (isEvent(value)) {
		const { type, target, currentTarget, detail } = value;
		return {
			type,
			target,
			currentTarget,
			...detail ? { detail } : {},
			...getOwnProperties(value)
		};
	}
	return value;
}
function getOwnProperties(obj) {
	if (isObjectLike(obj)) return Object.fromEntries(Object.entries(obj));
	return {};
}
function extractExceptionKeysForMessage(exception) {
	const keys = Object.keys(convertToPlainObject(exception));
	keys.sort();
	return !keys[0] ? "[object has no keys]" : keys.join(", ");
}
//#endregion
//#region node_modules/.pnpm/@sentry+core@10.65.0/node_modules/@sentry/core/build/esm/utils/randomSafeContext.js
var RESOLVED_RUNNER;
function withRandomSafeContext(cb) {
	if (RESOLVED_RUNNER !== void 0) return RESOLVED_RUNNER ? RESOLVED_RUNNER(cb) : cb();
	const sym = /* @__PURE__ */ Symbol.for("__SENTRY_SAFE_RANDOM_ID_WRAPPER__");
	const globalWithSymbol = GLOBAL_OBJ;
	if (sym in globalWithSymbol && typeof globalWithSymbol[sym] === "function") {
		RESOLVED_RUNNER = globalWithSymbol[sym];
		return RESOLVED_RUNNER(cb);
	}
	RESOLVED_RUNNER = null;
	return cb();
}
function safeMathRandom() {
	return withRandomSafeContext(() => Math.random());
}
function safeDateNow() {
	return withRandomSafeContext(() => Date.now());
}
//#endregion
//#region node_modules/.pnpm/@sentry+core@10.65.0/node_modules/@sentry/core/build/esm/utils/normalizationHints.js
var SENTRY_SKIP_NORMALIZATION = /* @__PURE__ */ Symbol.for("sentry.skipNormalization");
var SENTRY_OVERRIDE_NORMALIZATION_DEPTH = /* @__PURE__ */ Symbol.for("sentry.overrideNormalizationDepth");
function hasSkipNormalizationHint(value) {
	return Boolean(value[SENTRY_SKIP_NORMALIZATION]);
}
function getNormalizationDepthOverrideHint(value) {
	const v = value[SENTRY_OVERRIDE_NORMALIZATION_DEPTH];
	return typeof v === "number" ? v : void 0;
}
//#endregion
//#region node_modules/.pnpm/@sentry+core@10.65.0/node_modules/@sentry/core/build/esm/utils/normalize.js
var stringifier;
function setNormalizeStringifier(newStringifier) {
	stringifier = newStringifier;
}
function normalize(input, depth = 100, maxProperties = Infinity) {
	try {
		return visit("", input, depth, maxProperties);
	} catch (err) {
		return { ERROR: `**non-serializable** (${err})` };
	}
}
function normalizeToSize(object, depth = 3, maxSize = 102400) {
	const normalized = normalize(object, depth);
	if (jsonSize(normalized) > maxSize) return normalizeToSize(object, depth - 1, maxSize);
	return normalized;
}
function visit(key, value, depth = Infinity, maxProperties = Infinity, memo = memoBuilder()) {
	const [memoize, unmemoize] = memo;
	if (value == null || ["boolean", "string"].includes(typeof value) || typeof value === "number" && Number.isFinite(value)) return value;
	const stringified = stringifyValue(key, value);
	if (!stringified.startsWith("[object ")) return stringified;
	if (hasSkipNormalizationHint(value)) return value;
	const overrideDepth = getNormalizationDepthOverrideHint(value);
	const remainingDepth = overrideDepth !== void 0 ? overrideDepth : depth;
	if (remainingDepth === 0) return stringified.replace("object ", "");
	if (memoize(value)) return "[Circular ~]";
	const valueWithToJSON = value;
	if (valueWithToJSON && typeof valueWithToJSON.toJSON === "function") try {
		return visit("", valueWithToJSON.toJSON(), remainingDepth - 1, maxProperties, memo);
	} catch {}
	const normalized = Array.isArray(value) ? [] : {};
	let numAdded = 0;
	const visitable = convertToPlainObject(value);
	for (const visitKey in visitable) {
		if (!Object.prototype.hasOwnProperty.call(visitable, visitKey)) continue;
		if (numAdded >= maxProperties) {
			normalized[visitKey] = "[MaxProperties ~]";
			break;
		}
		const visitValue = visitable[visitKey];
		normalized[visitKey] = visit(visitKey, visitValue, remainingDepth - 1, maxProperties, memo);
		numAdded++;
	}
	unmemoize(value);
	return normalized;
}
function stringifyValue(key, value) {
	try {
		if (stringifier) {
			const stringified = stringifier(value);
			if (stringified) return stringified;
		}
		if (typeof global !== "undefined" && value === global) return "[Global]";
		if (typeof value === "number" && !Number.isFinite(value)) return `[${value}]`;
		if (typeof value === "function") return `[Function: ${getFunctionName(value)}]`;
		if (typeof value === "symbol") return `[${String(value)}]`;
		if (typeof value === "bigint") return `[BigInt: ${String(value)}]`;
		return `[object ${getConstructorName$1(value)}]`;
	} catch (err) {
		return `**non-serializable** (${err})`;
	}
}
function getConstructorName$1(value) {
	const prototype = Object.getPrototypeOf(value);
	return prototype?.constructor ? prototype.constructor.name : "null prototype";
}
__name(getConstructorName$1, "getConstructorName");
function utf8Length(value) {
	return ~-encodeURI(value).split(/%..|./).length;
}
function jsonSize(value) {
	return utf8Length(JSON.stringify(value));
}
function memoBuilder() {
	const inner = /* @__PURE__ */ new WeakSet();
	function memoize(obj) {
		if (inner.has(obj)) return true;
		inner.add(obj);
		return false;
	}
	function unmemoize(obj) {
		inner.delete(obj);
	}
	return [memoize, unmemoize];
}
//#endregion
//#region node_modules/.pnpm/@sentry+core@10.65.0/node_modules/@sentry/core/build/esm/utils/string.js
function truncate(str, max = 0) {
	if (typeof str !== "string" || max === 0) return str;
	return str.length <= max ? str : `${str.slice(0, max)}...`;
}
function safeJoin(input, delimiter) {
	if (!Array.isArray(input)) return "";
	const output = [];
	for (let i = 0; i < input.length; i++) {
		const value = input[i];
		if (isPrimitive(value)) output.push(String(value));
		else if (value instanceof Error) output.push(value.message ? `${value.name}: ${value.message}` : value.name);
		else output.push(stringifyValue(void 0, value));
	}
	return output.join(delimiter);
}
function isMatchingPattern(value, pattern, requireExactStringMatch = false) {
	if (!isString(value)) return false;
	if (isRegExp(pattern)) return pattern.test(value);
	if (isString(pattern)) return requireExactStringMatch ? value === pattern : value.includes(pattern);
	if (typeof pattern === "function") return pattern(value);
	return false;
}
function stringMatchesSomePattern(testString, patterns = [], requireExactStringMatch = false) {
	for (const pattern of patterns) if (isMatchingPattern(testString, pattern, requireExactStringMatch)) return true;
	return false;
}
//#endregion
//#region node_modules/.pnpm/@sentry+core@10.65.0/node_modules/@sentry/core/build/esm/utils/misc.js
function getCrypto() {
	const gbl = GLOBAL_OBJ;
	return gbl.crypto || gbl.msCrypto;
}
var emptyUuid;
function getRandomByte() {
	return safeMathRandom() * 16;
}
function uuid4(crypto = getCrypto()) {
	try {
		if (crypto?.randomUUID) return withRandomSafeContext(() => crypto.randomUUID()).replace(/-/g, "");
	} catch {}
	if (!emptyUuid) emptyUuid = "10000000100040008000100000000000";
	return emptyUuid.replace(/[018]/g, (c) => (c ^ (getRandomByte() & 15) >> c / 4).toString(16));
}
function getFirstException(event) {
	return event.exception?.values?.[0];
}
function getEventDescription(event) {
	const { message, event_id: eventId } = event;
	if (message) return message;
	const firstException = getFirstException(event);
	if (firstException) {
		if (firstException.type && firstException.value) return `${firstException.type}: ${firstException.value}`;
		return firstException.type || firstException.value || eventId || "<unknown>";
	}
	return eventId || "<unknown>";
}
function addExceptionTypeValue(event, value, type) {
	const exception = event.exception = event.exception || {};
	const values = exception.values = exception.values || [];
	const firstException = values[0] = values[0] || {};
	if (!firstException.value) firstException.value = value || "";
	if (!firstException.type) firstException.type = type || "Error";
}
function addExceptionMechanism(event, newMechanism) {
	const firstException = getFirstException(event);
	if (!firstException) return;
	const defaultMechanism = {
		type: "generic",
		handled: true
	};
	const currentMechanism = firstException.mechanism;
	firstException.mechanism = {
		...defaultMechanism,
		...currentMechanism,
		...newMechanism
	};
	if (newMechanism && "data" in newMechanism) {
		const mergedData = {
			...currentMechanism?.data,
			...newMechanism.data
		};
		firstException.mechanism.data = mergedData;
	}
}
function checkOrSetAlreadyCaught(exception) {
	if (isAlreadyCaptured(exception)) return true;
	try {
		addNonEnumerableProperty(exception, "__sentry_captured__", true);
	} catch {}
	return false;
}
function isAlreadyCaptured(exception) {
	try {
		return exception.__sentry_captured__;
	} catch {}
}
//#endregion
//#region node_modules/.pnpm/@sentry+core@10.65.0/node_modules/@sentry/core/build/esm/utils/time.js
var ONE_SECOND_IN_MS = 1e3;
function dateTimestampInSeconds() {
	return safeDateNow() / ONE_SECOND_IN_MS;
}
function createUnixTimestampInSecondsFunc() {
	const { performance } = GLOBAL_OBJ;
	if (!performance?.now || !performance.timeOrigin) return dateTimestampInSeconds;
	const timeOrigin = performance.timeOrigin;
	return () => {
		return (timeOrigin + withRandomSafeContext(() => performance.now())) / ONE_SECOND_IN_MS;
	};
}
var _cachedTimestampInSeconds;
function timestampInSeconds() {
	return (_cachedTimestampInSeconds ?? (_cachedTimestampInSeconds = createUnixTimestampInSecondsFunc()))();
}
//#endregion
//#region node_modules/.pnpm/@sentry+core@10.65.0/node_modules/@sentry/core/build/esm/session.js
function makeSession(context) {
	const startingTime = timestampInSeconds();
	const session = {
		sid: uuid4(),
		init: true,
		timestamp: startingTime,
		started: startingTime,
		duration: 0,
		status: "ok",
		errors: 0,
		ignoreDuration: false,
		toJSON: () => sessionToJSON(session)
	};
	if (context) updateSession(session, context);
	return session;
}
function updateSession(session, context = {}) {
	if (context.user) {
		if (!session.ipAddress && context.user.ip_address) session.ipAddress = context.user.ip_address;
		if (!session.did && !context.did) session.did = context.user.id || context.user.email || context.user.username;
	}
	session.timestamp = context.timestamp || timestampInSeconds();
	if (context.abnormal_mechanism) session.abnormal_mechanism = context.abnormal_mechanism;
	if (context.ignoreDuration) session.ignoreDuration = context.ignoreDuration;
	if (context.sid) session.sid = context.sid.length === 32 ? context.sid : uuid4();
	if (context.init !== void 0) session.init = context.init;
	if (!session.did && context.did) session.did = `${context.did}`;
	if (typeof context.started === "number") session.started = context.started;
	if (session.ignoreDuration) session.duration = void 0;
	else if (typeof context.duration === "number") session.duration = context.duration;
	else {
		const duration = session.timestamp - session.started;
		session.duration = duration >= 0 ? duration : 0;
	}
	if (context.release) session.release = context.release;
	if (context.environment) session.environment = context.environment;
	if (!session.ipAddress && context.ipAddress) session.ipAddress = context.ipAddress;
	if (!session.userAgent && context.userAgent) session.userAgent = context.userAgent;
	if (typeof context.errors === "number") session.errors = context.errors;
	if (context.status) session.status = context.status;
}
function closeSession(session, status) {
	let context = {};
	if (status) context = { status };
	else if (session.status === "ok") context = { status: "exited" };
	updateSession(session, context);
}
function sessionToJSON(session) {
	return {
		sid: `${session.sid}`,
		init: session.init,
		started: (/* @__PURE__ */ new Date(session.started * 1e3)).toISOString(),
		timestamp: (/* @__PURE__ */ new Date(session.timestamp * 1e3)).toISOString(),
		status: session.status,
		errors: session.errors,
		did: typeof session.did === "number" || typeof session.did === "string" ? `${session.did}` : void 0,
		duration: session.duration,
		abnormal_mechanism: session.abnormal_mechanism,
		attrs: {
			release: session.release,
			environment: session.environment,
			ip_address: session.ipAddress,
			user_agent: session.userAgent
		}
	};
}
//#endregion
//#region node_modules/.pnpm/@sentry+core@10.65.0/node_modules/@sentry/core/build/esm/utils/merge.js
function merge(initialObj, mergeObj, levels = 2) {
	if (!mergeObj || typeof mergeObj !== "object" || levels <= 0) return mergeObj;
	if (initialObj && Object.keys(mergeObj).length === 0) return initialObj;
	const output = { ...initialObj };
	for (const key in mergeObj) if (Object.prototype.hasOwnProperty.call(mergeObj, key)) output[key] = merge(output[key], mergeObj[key], levels - 1);
	return output;
}
//#endregion
//#region node_modules/.pnpm/@sentry+core@10.65.0/node_modules/@sentry/core/build/esm/utils/propagationContext.js
function generateTraceId() {
	return uuid4();
}
function generateSpanId() {
	return uuid4().substring(16);
}
//#endregion
//#region node_modules/.pnpm/@sentry+core@10.65.0/node_modules/@sentry/core/build/esm/utils/weakRef.js
function makeWeakRef(value) {
	try {
		const WeakRefImpl = GLOBAL_OBJ.WeakRef;
		if (typeof WeakRefImpl === "function") return new WeakRefImpl(value);
	} catch {}
	return value;
}
function derefWeakRef(ref) {
	if (!ref) return;
	if (typeof ref === "object" && "deref" in ref && typeof ref.deref === "function") try {
		return ref.deref();
	} catch {
		return;
	}
	return ref;
}
//#endregion
//#region node_modules/.pnpm/@sentry+core@10.65.0/node_modules/@sentry/core/build/esm/utils/spanOnScope.js
var SCOPE_SPAN_FIELD = "_sentrySpan";
function _setSpanForScope(scope, span) {
	if (span) addNonEnumerableProperty(scope, SCOPE_SPAN_FIELD, makeWeakRef(span));
	else delete scope[SCOPE_SPAN_FIELD];
}
function _getSpanForScope(scope) {
	return derefWeakRef(scope[SCOPE_SPAN_FIELD]);
}
//#endregion
//#region node_modules/.pnpm/@sentry+core@10.65.0/node_modules/@sentry/core/build/esm/scope.js
var DEFAULT_MAX_BREADCRUMBS = 100;
var Scope = class Scope {
	constructor() {
		this._notifyingListeners = false;
		this._scopeListeners = [];
		this._eventProcessors = [];
		this._breadcrumbs = [];
		this._attachments = [];
		this._user = {};
		this._tags = {};
		this._attributes = {};
		this._extra = {};
		this._contexts = {};
		this._sdkProcessingMetadata = {};
		this._propagationContext = {
			traceId: generateTraceId(),
			sampleRand: safeMathRandom()
		};
	}
	/**
	* Clone all data from this scope into a new scope.
	*/
	clone() {
		const newScope = new Scope();
		newScope._breadcrumbs = [...this._breadcrumbs];
		newScope._tags = { ...this._tags };
		newScope._attributes = { ...this._attributes };
		newScope._extra = { ...this._extra };
		newScope._contexts = { ...this._contexts };
		if (this._contexts.flags) newScope._contexts.flags = { values: [...this._contexts.flags.values] };
		newScope._user = this._user;
		newScope._level = this._level;
		newScope._session = this._session;
		newScope._transactionName = this._transactionName;
		newScope._fingerprint = this._fingerprint;
		newScope._eventProcessors = [...this._eventProcessors];
		newScope._attachments = [...this._attachments];
		newScope._sdkProcessingMetadata = { ...this._sdkProcessingMetadata };
		newScope._propagationContext = { ...this._propagationContext };
		newScope._client = this._client;
		newScope._lastEventId = this._lastEventId;
		newScope._conversationId = this._conversationId;
		_setSpanForScope(newScope, _getSpanForScope(this));
		return newScope;
	}
	/**
	* Update the client assigned to this scope.
	* Note that not every scope will have a client assigned - isolation scopes & the global scope will generally not have a client,
	* as well as manually created scopes.
	*/
	setClient(client) {
		this._client = client;
	}
	/**
	* Set the ID of the last captured error event.
	* This is generally only captured on the isolation scope.
	*/
	setLastEventId(lastEventId) {
		this._lastEventId = lastEventId;
	}
	/**
	* Get the client assigned to this scope.
	*/
	getClient() {
		return this._client;
	}
	/**
	* Get the ID of the last captured error event.
	* This is generally only available on the isolation scope.
	*/
	lastEventId() {
		return this._lastEventId;
	}
	/**
	* @inheritDoc
	*/
	addScopeListener(callback) {
		this._scopeListeners.push(callback);
	}
	/**
	* Add an event processor that will be called before an event is sent.
	*/
	addEventProcessor(callback) {
		this._eventProcessors.push(callback);
		return this;
	}
	/**
	* Set the user for this scope.
	* Set to `null` to unset the user.
	*/
	setUser(user) {
		this._user = user || {
			email: void 0,
			id: void 0,
			ip_address: void 0,
			username: void 0
		};
		if (this._session) updateSession(this._session, { user });
		this._notifyScopeListeners();
		return this;
	}
	/**
	* Get the user from this scope.
	*/
	getUser() {
		return this._user;
	}
	/**
	* Set the conversation ID for this scope.
	* Set to `null` to unset the conversation ID.
	*/
	setConversationId(conversationId) {
		this._conversationId = conversationId || void 0;
		this._notifyScopeListeners();
		return this;
	}
	/**
	* Set an object that will be merged into existing tags on the scope,
	* and will be sent as tags data with the event.
	*/
	setTags(tags) {
		this._tags = {
			...this._tags,
			...tags
		};
		this._notifyScopeListeners();
		return this;
	}
	/**
	* Set a single tag that will be sent as tags data with the event.
	*/
	setTag(key, value) {
		return this.setTags({ [key]: value });
	}
	/**
	* Sets attributes onto the scope.
	*
	* These attributes are applied to logs, metrics and streamed spans.
	*
	* Supported attribute value types are `string`, `number`, `boolean`, `string[]`, `number[]` and `boolean[]`.
	*
	* @param newAttributes - The attributes to set on the scope, as key-value pairs.
	*
	* @example
	* ```typescript
	* scope.setAttributes({
	*   is_admin: true,
	*   payment_selection: 'credit_card',
	*   render_duration: 150,
	* });
	* ```
	*/
	setAttributes(newAttributes) {
		this._attributes = {
			...this._attributes,
			...newAttributes
		};
		this._notifyScopeListeners();
		return this;
	}
	/**
	* Sets an attribute onto the scope.
	*
	* These attributes are applied to logs, metrics and streamed spans.
	*
	* Supported attribute value types are `string`, `number`, `boolean`, `string[]`, `number[]` and `boolean[]`.
	*
	* @param key - The attribute key.
	* @param value - The attribute value.
	*
	* @example
	* ```typescript
	* scope.setAttribute('is_admin', true);
	* scope.setAttribute('render_duration', 150);
	* ```
	*/
	setAttribute(key, value) {
		return this.setAttributes({ [key]: value });
	}
	/**
	* Removes the attribute with the given key from the scope.
	*
	* @param key - The attribute key.
	*
	* @example
	* ```typescript
	* scope.removeAttribute('is_admin');
	* ```
	*/
	removeAttribute(key) {
		if (key in this._attributes) {
			delete this._attributes[key];
			this._notifyScopeListeners();
		}
		return this;
	}
	/**
	* Set an object that will be merged into existing extra on the scope,
	* and will be sent as extra data with the event.
	*/
	setExtras(extras) {
		this._extra = {
			...this._extra,
			...extras
		};
		this._notifyScopeListeners();
		return this;
	}
	/**
	* Set a single key:value extra entry that will be sent as extra data with the event.
	*/
	setExtra(key, extra) {
		this._extra = {
			...this._extra,
			[key]: extra
		};
		this._notifyScopeListeners();
		return this;
	}
	/**
	* Sets the fingerprint on the scope to send with the events.
	* @param {string[]} fingerprint Fingerprint to group events in Sentry.
	*/
	setFingerprint(fingerprint) {
		this._fingerprint = fingerprint;
		this._notifyScopeListeners();
		return this;
	}
	/**
	* Sets the level on the scope for future events.
	*/
	setLevel(level) {
		this._level = level;
		this._notifyScopeListeners();
		return this;
	}
	/**
	* Sets the transaction name on the scope so that the name of e.g. taken server route or
	* the page location is attached to future events.
	*
	* IMPORTANT: Calling this function does NOT change the name of the currently active
	* root span. If you want to change the name of the active root span, use
	* `Sentry.updateSpanName(rootSpan, 'new name')` instead.
	*
	* By default, the SDK updates the scope's transaction name automatically on sensible
	* occasions, such as a page navigation or when handling a new request on the server.
	*/
	setTransactionName(name) {
		this._transactionName = name;
		this._notifyScopeListeners();
		return this;
	}
	/**
	* Sets context data with the given name.
	* Data passed as context will be normalized. You can also pass `null` to unset the context.
	* Note that context data will not be merged - calling `setContext` will overwrite an existing context with the same key.
	*/
	setContext(key, context) {
		if (context === null) delete this._contexts[key];
		else this._contexts[key] = context;
		this._notifyScopeListeners();
		return this;
	}
	/**
	* Set the session for the scope.
	*/
	setSession(session) {
		if (!session) delete this._session;
		else this._session = session;
		this._notifyScopeListeners();
		return this;
	}
	/**
	* Get the session from the scope.
	*/
	getSession() {
		return this._session;
	}
	/**
	* Updates the scope with provided data. Can work in three variations:
	* - plain object containing updatable attributes
	* - Scope instance that'll extract the attributes from
	* - callback function that'll receive the current scope as an argument and allow for modifications
	*/
	update(captureContext) {
		if (!captureContext) return this;
		const scopeToMerge = typeof captureContext === "function" ? captureContext(this) : captureContext;
		const { tags, attributes, extra, user, contexts, level, fingerprint = [], propagationContext, conversationId } = (scopeToMerge instanceof Scope ? scopeToMerge.getScopeData() : isPlainObject(scopeToMerge) ? captureContext : void 0) || {};
		this._tags = {
			...this._tags,
			...tags
		};
		this._attributes = {
			...this._attributes,
			...attributes
		};
		this._extra = {
			...this._extra,
			...extra
		};
		this._contexts = {
			...this._contexts,
			...contexts
		};
		if (user && Object.keys(user).length) this._user = user;
		if (level) this._level = level;
		if (fingerprint.length) this._fingerprint = fingerprint;
		if (propagationContext) this._propagationContext = propagationContext;
		if (conversationId) this._conversationId = conversationId;
		return this;
	}
	/**
	* Clears the current scope and resets its properties.
	* Note: The client will not be cleared.
	*/
	clear() {
		this._breadcrumbs = [];
		this._tags = {};
		this._attributes = {};
		this._extra = {};
		this._user = {};
		this._contexts = {};
		this._level = void 0;
		this._transactionName = void 0;
		this._fingerprint = void 0;
		this._session = void 0;
		this._conversationId = void 0;
		_setSpanForScope(this, void 0);
		this._attachments = [];
		this.setPropagationContext({
			traceId: generateTraceId(),
			sampleRand: safeMathRandom()
		});
		this._notifyScopeListeners();
		return this;
	}
	/**
	* Adds a breadcrumb to the scope.
	* By default, the last 100 breadcrumbs are kept.
	*/
	addBreadcrumb(breadcrumb, maxBreadcrumbs) {
		const maxCrumbs = typeof maxBreadcrumbs === "number" ? maxBreadcrumbs : DEFAULT_MAX_BREADCRUMBS;
		if (maxCrumbs <= 0) return this;
		const mergedBreadcrumb = {
			timestamp: dateTimestampInSeconds(),
			...breadcrumb,
			message: breadcrumb.message ? truncate(breadcrumb.message, 2048) : breadcrumb.message
		};
		this._breadcrumbs.push(mergedBreadcrumb);
		if (this._breadcrumbs.length > maxCrumbs) {
			this._breadcrumbs = this._breadcrumbs.slice(-maxCrumbs);
			this._client?.recordDroppedEvent("buffer_overflow", "log_item");
		}
		this._notifyScopeListeners();
		return this;
	}
	/**
	* Get the last breadcrumb of the scope.
	*/
	getLastBreadcrumb() {
		return this._breadcrumbs[this._breadcrumbs.length - 1];
	}
	/**
	* Clear all breadcrumbs from the scope.
	*/
	clearBreadcrumbs() {
		this._breadcrumbs = [];
		this._notifyScopeListeners();
		return this;
	}
	/**
	* Add an attachment to the scope.
	*/
	addAttachment(attachment) {
		this._attachments.push(attachment);
		return this;
	}
	/**
	* Clear all attachments from the scope.
	*/
	clearAttachments() {
		this._attachments = [];
		return this;
	}
	/**
	* Get the data of this scope, which should be applied to an event during processing.
	*/
	getScopeData() {
		return {
			breadcrumbs: this._breadcrumbs,
			attachments: this._attachments,
			contexts: this._contexts,
			tags: this._tags,
			attributes: this._attributes,
			extra: this._extra,
			user: this._user,
			level: this._level,
			fingerprint: this._fingerprint || [],
			eventProcessors: this._eventProcessors,
			propagationContext: this._propagationContext,
			sdkProcessingMetadata: this._sdkProcessingMetadata,
			transactionName: this._transactionName,
			span: _getSpanForScope(this),
			conversationId: this._conversationId
		};
	}
	/**
	* Add data which will be accessible during event processing but won't get sent to Sentry.
	*/
	setSDKProcessingMetadata(newData) {
		this._sdkProcessingMetadata = merge(this._sdkProcessingMetadata, newData, 2);
		return this;
	}
	/**
	* Add propagation context to the scope, used for distributed tracing
	*/
	setPropagationContext(context) {
		this._propagationContext = context;
		return this;
	}
	/**
	* Get propagation context from the scope, used for distributed tracing
	*/
	getPropagationContext() {
		return this._propagationContext;
	}
	/**
	* Capture an exception for this scope.
	*
	* @returns {string} The id of the captured Sentry event.
	*/
	captureException(exception, hint) {
		const eventId = hint?.event_id || uuid4();
		if (!this._client) {
			DEBUG_BUILD$3 && debug.warn("No client configured on scope - will not capture exception!");
			return eventId;
		}
		const syntheticException = /* @__PURE__ */ new Error("Sentry syntheticException");
		this._client.captureException(exception, {
			originalException: exception,
			syntheticException,
			...hint,
			event_id: eventId
		}, this);
		return eventId;
	}
	/**
	* Capture a message for this scope.
	*
	* @returns {string} The id of the captured message.
	*/
	captureMessage(message, level, hint) {
		const eventId = hint?.event_id || uuid4();
		if (!this._client) {
			DEBUG_BUILD$3 && debug.warn("No client configured on scope - will not capture message!");
			return eventId;
		}
		const syntheticException = hint?.syntheticException ?? new Error(message);
		this._client.captureMessage(message, level, {
			originalException: message,
			syntheticException,
			...hint,
			event_id: eventId
		}, this);
		return eventId;
	}
	/**
	* Capture a Sentry event for this scope.
	*
	* @returns {string} The id of the captured event.
	*/
	captureEvent(event, hint) {
		const eventId = event.event_id || hint?.event_id || uuid4();
		if (!this._client) {
			DEBUG_BUILD$3 && debug.warn("No client configured on scope - will not capture event!");
			return eventId;
		}
		this._client.captureEvent(event, {
			...hint,
			event_id: eventId
		}, this);
		return eventId;
	}
	/**
	* This will be called on every set call.
	*/
	_notifyScopeListeners() {
		if (!this._notifyingListeners) {
			this._notifyingListeners = true;
			this._scopeListeners.forEach((callback) => {
				callback(this);
			});
			this._notifyingListeners = false;
		}
	}
};
//#endregion
//#region node_modules/.pnpm/@sentry+core@10.65.0/node_modules/@sentry/core/build/esm/defaultScopes.js
function getDefaultCurrentScope() {
	return getGlobalSingleton("defaultCurrentScope", () => new Scope());
}
function getDefaultIsolationScope() {
	return getGlobalSingleton("defaultIsolationScope", () => new Scope());
}
//#endregion
//#region node_modules/.pnpm/@sentry+core@10.65.0/node_modules/@sentry/core/build/esm/utils/chain-and-copy-promiselike.js
var isActualPromise = (p) => p instanceof Promise && !p[kChainedCopy];
var kChainedCopy = /* @__PURE__ */ Symbol("chained PromiseLike");
var chainAndCopyPromiseLike = (original, onSuccess, onError) => {
	const chained = original.then((value) => {
		onSuccess(value);
		return value;
	}, (err) => {
		onError(err);
		throw err;
	});
	return isActualPromise(chained) && isActualPromise(original) ? chained : copyProps(original, chained);
};
var copyProps = (original, chained) => {
	if (!chained) return original;
	let mutated = false;
	for (const key in original) {
		if (key in chained) continue;
		mutated = true;
		const value = original[key];
		if (typeof value === "function") Object.defineProperty(chained, key, {
			value: (...args) => value.apply(original, args),
			enumerable: true,
			configurable: true,
			writable: true
		});
		else chained[key] = value;
	}
	if (mutated) Object.assign(chained, { [kChainedCopy]: true });
	return chained;
};
//#endregion
//#region node_modules/.pnpm/@sentry+core@10.65.0/node_modules/@sentry/core/build/esm/asyncContext/stackStrategy.js
var AsyncContextStack = class {
	constructor(scope, isolationScope) {
		let assignedScope;
		if (!scope) assignedScope = new Scope();
		else assignedScope = scope;
		let assignedIsolationScope;
		if (!isolationScope) assignedIsolationScope = new Scope();
		else assignedIsolationScope = isolationScope;
		this._stack = [{ scope: assignedScope }];
		this._isolationScope = assignedIsolationScope;
	}
	/**
	* Fork a scope for the stack.
	*/
	withScope(callback) {
		const scope = this._pushScope();
		let maybePromiseResult;
		try {
			maybePromiseResult = callback(scope);
		} catch (e) {
			this._popScope();
			throw e;
		}
		if (isThenable(maybePromiseResult)) return chainAndCopyPromiseLike(maybePromiseResult, () => this._popScope(), () => this._popScope());
		this._popScope();
		return maybePromiseResult;
	}
	/**
	* Get the client of the stack.
	*/
	getClient() {
		return this.getStackTop().client;
	}
	/**
	* Returns the scope of the top stack.
	*/
	getScope() {
		return this.getStackTop().scope;
	}
	/**
	* Get the isolation scope for the stack.
	*/
	getIsolationScope() {
		return this._isolationScope;
	}
	/**
	* Returns the topmost scope layer in the order domain > local > process.
	*/
	getStackTop() {
		return this._stack[this._stack.length - 1];
	}
	/**
	* Push a scope to the stack.
	*/
	_pushScope() {
		const scope = this.getScope().clone();
		this._stack.push({
			client: this.getClient(),
			scope
		});
		return scope;
	}
	/**
	* Pop a scope from the stack.
	*/
	_popScope() {
		if (this._stack.length <= 1) return false;
		return !!this._stack.pop();
	}
};
function getAsyncContextStack() {
	const sentry = getSentryCarrier(getMainCarrier());
	return sentry.stack = sentry.stack || new AsyncContextStack(getDefaultCurrentScope(), getDefaultIsolationScope());
}
function withScope$1(callback) {
	return getAsyncContextStack().withScope(callback);
}
__name(withScope$1, "withScope");
function withSetScope(scope, callback) {
	const stack = getAsyncContextStack();
	return stack.withScope(() => {
		stack.getStackTop().scope = scope;
		return callback(scope);
	});
}
function withIsolationScope(callback) {
	return getAsyncContextStack().withScope(() => {
		return callback(getAsyncContextStack().getIsolationScope());
	});
}
function getStackAsyncContextStrategy() {
	return {
		withIsolationScope,
		withScope: withScope$1,
		withSetScope,
		withSetIsolationScope: (_isolationScope, callback) => {
			return withIsolationScope(callback);
		},
		getCurrentScope: () => getAsyncContextStack().getScope(),
		getIsolationScope: () => getAsyncContextStack().getIsolationScope()
	};
}
//#endregion
//#region node_modules/.pnpm/@sentry+core@10.65.0/node_modules/@sentry/core/build/esm/asyncContext/index.js
function getAsyncContextStrategy(carrier) {
	const sentry = getSentryCarrier(carrier);
	if (sentry.acs) return sentry.acs;
	return getStackAsyncContextStrategy();
}
//#endregion
//#region node_modules/.pnpm/@sentry+core@10.65.0/node_modules/@sentry/core/build/esm/attributes.js
function isAttributeObject(maybeObj) {
	return typeof maybeObj === "object" && maybeObj != null && !Array.isArray(maybeObj) && Object.keys(maybeObj).includes("value");
}
function attributeValueToTypedAttributeValue(rawValue, useFallback) {
	const { value, unit } = isAttributeObject(rawValue) ? rawValue : {
		value: rawValue,
		unit: void 0
	};
	const attributeValue = getTypedAttributeValue(value);
	const checkedUnit = unit && typeof unit === "string" ? { unit } : {};
	if (attributeValue) return {
		...attributeValue,
		...checkedUnit
	};
	if (!useFallback || useFallback === "skip-undefined" && value === void 0) return;
	let stringValue = "";
	try {
		stringValue = JSON.stringify(value) ?? "";
	} catch {}
	return {
		value: stringValue,
		type: "string",
		...checkedUnit
	};
}
function serializeAttributes(attributes, fallback = false) {
	const serializedAttributes = {};
	for (const [key, value] of Object.entries(attributes ?? {})) {
		const typedValue = attributeValueToTypedAttributeValue(value, fallback);
		if (typedValue) serializedAttributes[key] = typedValue;
	}
	return serializedAttributes;
}
function getTypedAttributeValue(value) {
	if (Array.isArray(value)) return {
		value,
		type: "array"
	};
	const primitiveType = typeof value === "string" ? "string" : typeof value === "boolean" ? "boolean" : typeof value === "number" && !Number.isNaN(value) ? Number.isInteger(value) ? "integer" : "double" : null;
	if (primitiveType) return {
		value,
		type: primitiveType
	};
}
function getCurrentScope() {
	return getAsyncContextStrategy(getMainCarrier()).getCurrentScope();
}
function getIsolationScope() {
	return getAsyncContextStrategy(getMainCarrier()).getIsolationScope();
}
function getGlobalScope() {
	return getGlobalSingleton("globalScope", () => new Scope());
}
function withScope(...rest) {
	const acs = getAsyncContextStrategy(getMainCarrier());
	if (rest.length === 2) {
		const [scope, callback] = rest;
		if (!scope) return acs.withScope(callback);
		return acs.withSetScope(scope, callback);
	}
	return acs.withScope(rest[0]);
}
function getClient() {
	return getCurrentScope().getClient();
}
function getTraceContextFromScope(scope) {
	const { traceId, parentSpanId, propagationSpanId } = scope.getPropagationContext();
	const traceContext = {
		trace_id: traceId,
		span_id: propagationSpanId || generateSpanId()
	};
	if (parentSpanId) traceContext.parent_span_id = parentSpanId;
	return traceContext;
}
//#endregion
//#region node_modules/.pnpm/@sentry+core@10.65.0/node_modules/@sentry/core/build/esm/semanticAttributes.js
var SEMANTIC_ATTRIBUTE_SENTRY_SOURCE = "sentry.source";
var SEMANTIC_ATTRIBUTE_SENTRY_SAMPLE_RATE = "sentry.sample_rate";
var SEMANTIC_ATTRIBUTE_SENTRY_OP = "sentry.op";
var SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN = "sentry.origin";
var SEMANTIC_ATTRIBUTE_SENTRY_MEASUREMENT_UNIT = "sentry.measurement_unit";
var SEMANTIC_ATTRIBUTE_SENTRY_MEASUREMENT_VALUE = "sentry.measurement_value";
var SEMANTIC_ATTRIBUTE_SENTRY_CUSTOM_SPAN_NAME = "sentry.custom_span_name";
var SEMANTIC_ATTRIBUTE_PROFILE_ID = "sentry.profile_id";
var SEMANTIC_ATTRIBUTE_EXCLUSIVE_TIME = "sentry.exclusive_time";
var GEN_AI_CONVERSATION_ID_ATTRIBUTE = "gen_ai.conversation.id";
//#endregion
//#region node_modules/.pnpm/@sentry+core@10.65.0/node_modules/@sentry/core/build/esm/tracing/utils.js
var SCOPE_ON_START_SPAN_FIELD = "_sentryScope";
var ISOLATION_SCOPE_ON_START_SPAN_FIELD = "_sentryIsolationScope";
var OTEL_SOURCE_INFERENCE_SPAN_FIELD = /* @__PURE__ */ Symbol.for("sentry.otelSourceInference");
var OTEL_SOURCE_EXPLICITLY_SET_SPAN_FIELD = /* @__PURE__ */ Symbol.for("sentry.otelSourceExplicitlySet");
var TRACER_PROVIDER_SPAN_FIELD = /* @__PURE__ */ Symbol.for("sentry.tracerProviderSpan");
function setCapturedScopesOnSpan(span, scope, isolationScope) {
	if (span) {
		addNonEnumerableProperty(span, ISOLATION_SCOPE_ON_START_SPAN_FIELD, makeWeakRef(isolationScope));
		addNonEnumerableProperty(span, SCOPE_ON_START_SPAN_FIELD, scope);
	}
}
function getCapturedScopesOnSpan(span) {
	const spanWithScopes = span;
	return {
		scope: spanWithScopes[SCOPE_ON_START_SPAN_FIELD],
		isolationScope: derefWeakRef(spanWithScopes[ISOLATION_SCOPE_ON_START_SPAN_FIELD])
	};
}
function spanShouldInferOtelSource(span) {
	return span[OTEL_SOURCE_INFERENCE_SPAN_FIELD] === true;
}
function markSpanSourceAsExplicit(span) {
	addNonEnumerableProperty(span, OTEL_SOURCE_EXPLICITLY_SET_SPAN_FIELD, true);
}
function spanIsTracerProviderSpan(span) {
	return span[TRACER_PROVIDER_SPAN_FIELD] === true;
}
function baggageHeaderToDynamicSamplingContext(baggageHeader) {
	const baggageObject = parseBaggageHeader(baggageHeader);
	if (!baggageObject) return;
	const dynamicSamplingContext = Object.entries(baggageObject).reduce((acc, [key, value]) => {
		if (key.startsWith("sentry-")) {
			const nonPrefixedKey = key.slice(7);
			acc[nonPrefixedKey] = value;
		}
		return acc;
	}, {});
	if (Object.keys(dynamicSamplingContext).length > 0) return dynamicSamplingContext;
	else return;
}
function parseBaggageHeader(baggageHeader) {
	if (!baggageHeader || !isString(baggageHeader) && !Array.isArray(baggageHeader)) return;
	if (Array.isArray(baggageHeader)) return baggageHeader.reduce((acc, curr) => {
		const currBaggageObject = baggageHeaderToObject(curr);
		Object.entries(currBaggageObject).forEach(([key, value]) => {
			acc[key] = value;
		});
		return acc;
	}, {});
	return baggageHeaderToObject(baggageHeader);
}
function baggageHeaderToObject(baggageHeader) {
	return baggageHeader.split(",").map((baggageEntry) => {
		const eqIdx = baggageEntry.indexOf("=");
		if (eqIdx === -1) return [];
		return [baggageEntry.slice(0, eqIdx), baggageEntry.slice(eqIdx + 1)].map((keyOrValue) => {
			try {
				return decodeURIComponent(keyOrValue.trim());
			} catch {
				return;
			}
		});
	}).reduce((acc, [key, value]) => {
		if (key && value) acc[key] = value;
		return acc;
	}, {});
}
//#endregion
//#region node_modules/.pnpm/@sentry+core@10.65.0/node_modules/@sentry/core/build/esm/utils/dsn.js
var ORG_ID_REGEX = /^o(\d+)\./;
var DSN_REGEX = /^(?:(\w+):)\/\/(?:(\w+)(?::(\w+)?)?@)((?:\[[:.%\w]+\]|[\w.-]+))(?::(\d+))?\/(.+)/;
function isValidProtocol(protocol) {
	return protocol === "http" || protocol === "https";
}
function dsnToString(dsn, withPassword = false) {
	const { host, path, pass, port, projectId, protocol, publicKey } = dsn;
	return `${protocol}://${publicKey}${withPassword && pass ? `:${pass}` : ""}@${host}${port ? `:${port}` : ""}/${path ? `${path}/` : path}${projectId}`;
}
function dsnFromString(str) {
	const match = DSN_REGEX.exec(str);
	if (!match) {
		consoleSandbox(() => {
			console.error(`Invalid Sentry Dsn: ${str}`);
		});
		return;
	}
	const [protocol, publicKey, pass = "", host = "", port = "", lastPath = ""] = match.slice(1);
	let path = "";
	let projectId = lastPath;
	const split = projectId.split("/");
	if (split.length > 1) {
		path = split.slice(0, -1).join("/");
		projectId = split.pop();
	}
	if (projectId) {
		const projectMatch = projectId.match(/^\d+/);
		if (projectMatch) projectId = projectMatch[0];
	}
	return dsnFromComponents({
		host,
		pass,
		path,
		projectId,
		port,
		protocol,
		publicKey
	});
}
function dsnFromComponents(components) {
	return {
		protocol: components.protocol,
		publicKey: components.publicKey || "",
		pass: components.pass || "",
		host: components.host,
		port: components.port || "",
		path: components.path || "",
		projectId: components.projectId
	};
}
function validateDsn(dsn) {
	if (!DEBUG_BUILD$3) return true;
	const { port, projectId, protocol } = dsn;
	if ([
		"protocol",
		"publicKey",
		"host",
		"projectId"
	].find((component) => {
		if (!dsn[component]) {
			debug.error(`Invalid Sentry Dsn: ${component} missing`);
			return true;
		}
		return false;
	})) return false;
	if (!projectId.match(/^\d+$/)) {
		debug.error(`Invalid Sentry Dsn: Invalid projectId ${projectId}`);
		return false;
	}
	if (!isValidProtocol(protocol)) {
		debug.error(`Invalid Sentry Dsn: Invalid protocol ${protocol}`);
		return false;
	}
	if (port && isNaN(parseInt(port, 10))) {
		debug.error(`Invalid Sentry Dsn: Invalid port ${port}`);
		return false;
	}
	return true;
}
function extractOrgIdFromDsnHost(host) {
	return host.match(ORG_ID_REGEX)?.[1];
}
function extractOrgIdFromClient(client) {
	const options = client.getOptions();
	const { host } = client.getDsn() || {};
	let org_id;
	if (options.orgId) org_id = String(options.orgId);
	else if (host) org_id = extractOrgIdFromDsnHost(host);
	return org_id;
}
function makeDsn(from) {
	const components = typeof from === "string" ? dsnFromString(from) : dsnFromComponents(from);
	if (!components || !validateDsn(components)) return;
	return components;
}
//#endregion
//#region node_modules/.pnpm/@sentry+core@10.65.0/node_modules/@sentry/core/build/esm/utils/parseSampleRate.js
function parseSampleRate(sampleRate) {
	if (typeof sampleRate === "boolean") return Number(sampleRate);
	const rate = typeof sampleRate === "string" ? parseFloat(sampleRate) : sampleRate;
	if (typeof rate !== "number" || isNaN(rate) || rate < 0 || rate > 1) return;
	return rate;
}
var hasShownSpanDropWarning = false;
function spanToTransactionTraceContext(span) {
	const { spanId: span_id, traceId: trace_id } = span.spanContext();
	const { data, op, parent_span_id, status, origin, links } = spanToJSON(span);
	return {
		parent_span_id,
		span_id,
		trace_id,
		data,
		op,
		status,
		origin,
		links
	};
}
function spanToTraceContext(span) {
	const { spanId, traceId: trace_id, isRemote } = span.spanContext();
	const parent_span_id = isRemote ? spanId : spanToJSON(span).parent_span_id;
	const scope = getCapturedScopesOnSpan(span).scope;
	return {
		parent_span_id,
		span_id: isRemote ? scope?.getPropagationContext().propagationSpanId || generateSpanId() : spanId,
		trace_id
	};
}
function convertSpanLinksForEnvelope(links) {
	if (links && links.length > 0) return links.map(({ context: { spanId, traceId, traceFlags, ...restContext }, attributes }) => ({
		span_id: spanId,
		trace_id: traceId,
		sampled: traceFlags === 1,
		attributes,
		...restContext
	}));
	else return;
}
function getStreamedSpanLinks(links) {
	if (links?.length) return links.map(({ context: { spanId, traceId, traceFlags }, attributes }) => ({
		span_id: spanId,
		trace_id: traceId,
		sampled: traceFlags === 1,
		attributes
	}));
	else return;
}
function spanTimeInputToSeconds(input) {
	if (typeof input === "number") return ensureTimestampInSeconds(input);
	if (Array.isArray(input)) return input[0] + input[1] / 1e9;
	if (input instanceof Date) return ensureTimestampInSeconds(input.getTime());
	return timestampInSeconds();
}
function ensureTimestampInSeconds(timestamp) {
	return timestamp > 9999999999 ? timestamp / 1e3 : timestamp;
}
function spanToJSON(span) {
	if (spanIsSentrySpan(span)) return span.getSpanJSON();
	const { spanId: span_id, traceId: trace_id } = span.spanContext();
	if (spanIsOpenTelemetrySdkTraceBaseSpan(span)) {
		const { attributes, startTime, name, endTime, status, links } = span;
		return {
			span_id,
			trace_id,
			data: attributes,
			description: name,
			parent_span_id: getOtelParentSpanId(span),
			start_timestamp: spanTimeInputToSeconds(startTime),
			timestamp: spanTimeInputToSeconds(endTime) || void 0,
			status: getStatusMessage(status),
			op: attributes[SEMANTIC_ATTRIBUTE_SENTRY_OP],
			origin: attributes[SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN],
			links: convertSpanLinksForEnvelope(links)
		};
	}
	return {
		span_id,
		trace_id,
		start_timestamp: 0,
		data: {}
	};
}
function getOtelParentSpanId(span) {
	return "parentSpanId" in span ? span.parentSpanId : "parentSpanContext" in span ? span.parentSpanContext?.spanId : void 0;
}
function streamedSpanJsonToSerializedSpan(spanJson) {
	return {
		...spanJson,
		attributes: serializeAttributes(spanJson.attributes),
		links: spanJson.links?.map((link) => ({
			...link,
			attributes: serializeAttributes(link.attributes)
		}))
	};
}
function spanIsOpenTelemetrySdkTraceBaseSpan(span) {
	const castSpan = span;
	return !!castSpan.attributes && !!castSpan.startTime && !!castSpan.name && !!castSpan.endTime && !!castSpan.status;
}
function spanIsSentrySpan(span) {
	return typeof span.getSpanJSON === "function";
}
function spanIsSampled(span) {
	const { traceFlags } = span.spanContext();
	return traceFlags === 1;
}
function getStatusMessage(status) {
	if (!status || status.code === 0) return;
	if (status.code === 1) return "ok";
	return status.message || "internal_error";
}
function getSimpleStatus(status) {
	return !status || status.code === 1 || status.code === 0 || status.message === "cancelled" ? "ok" : "error";
}
function addStatusMessageAttribute(attributes, status) {
	const statusMessage = getSimpleStatus(status) === "error" ? status?.message : void 0;
	return {
		...statusMessage && { ["sentry.status.message"]: statusMessage },
		...attributes
	};
}
var CHILD_SPANS_FIELD = "_sentryChildSpans";
var ROOT_SPAN_FIELD = "_sentryRootSpan";
function addChildSpanToSpan(span, childSpan) {
	addNonEnumerableProperty(childSpan, ROOT_SPAN_FIELD, span[ROOT_SPAN_FIELD] || span);
	if (span[CHILD_SPANS_FIELD]) span[CHILD_SPANS_FIELD].add(childSpan);
	else addNonEnumerableProperty(span, CHILD_SPANS_FIELD, /* @__PURE__ */ new Set([childSpan]));
}
function getSpanDescendants(span) {
	const resultSet = /* @__PURE__ */ new Set();
	function addSpanChildren(span2) {
		if (resultSet.has(span2)) return;
		else if (spanIsSampled(span2)) {
			resultSet.add(span2);
			const childSpans = span2[CHILD_SPANS_FIELD] ? Array.from(span2[CHILD_SPANS_FIELD]) : [];
			for (const childSpan of childSpans) addSpanChildren(childSpan);
		}
	}
	addSpanChildren(span);
	return Array.from(resultSet);
}
var getRootSpan = INTERNAL_getSegmentSpan;
function INTERNAL_getSegmentSpan(span) {
	return span[ROOT_SPAN_FIELD] || span;
}
function getActiveSpan() {
	const acs = getAsyncContextStrategy(getMainCarrier());
	if (acs.getActiveSpan) return acs.getActiveSpan();
	return _getSpanForScope(getCurrentScope());
}
function showSpanDropWarning() {
	if (!hasShownSpanDropWarning) {
		consoleSandbox(() => {
			console.warn("[Sentry] Returning null from `beforeSendSpan` is disallowed. To drop certain spans, configure the respective integrations directly or use `ignoreSpans`.");
		});
		hasShownSpanDropWarning = true;
	}
}
//#endregion
//#region node_modules/.pnpm/@sentry+core@10.65.0/node_modules/@sentry/core/build/esm/utils/hasSpansEnabled.js
function hasSpansEnabled(maybeOptions) {
	if (typeof __SENTRY_TRACING__ === "boolean" && !__SENTRY_TRACING__) return false;
	const options = maybeOptions || getClient()?.getOptions();
	return !!options && (options.tracesSampleRate != null || !!options.tracesSampler);
}
//#endregion
//#region node_modules/.pnpm/@sentry+core@10.65.0/node_modules/@sentry/core/build/esm/utils/should-ignore-span.js
function logIgnoredSpan(droppedSpan) {
	debug.log(`Ignoring span ${droppedSpan.op} - ${droppedSpan.description} because it matches \`ignoreSpans\`.`);
}
function shouldIgnoreSpan(span, ignoreSpans) {
	if (!ignoreSpans?.length) return false;
	for (const pattern of ignoreSpans) {
		if (isStringOrRegExp(pattern)) {
			if (span.description && isMatchingPattern(span.description, pattern)) {
				DEBUG_BUILD$3 && logIgnoredSpan(span);
				return true;
			}
			continue;
		}
		const hasAttributes = !!pattern.attributes && Object.keys(pattern.attributes).length > 0;
		if (!pattern.name && !pattern.op && !hasAttributes) continue;
		const nameMatches = pattern.name ? span.description && isMatchingPattern(span.description, pattern.name) : true;
		const opMatches = pattern.op ? span.op && isMatchingPattern(span.op, pattern.op) : true;
		const attrsMatch = pattern.attributes ? Object.entries(pattern.attributes).every(([key, valuePattern]) => _matchesAttributeValue(span.attributes?.[key], valuePattern)) : true;
		if (nameMatches && opMatches && attrsMatch) {
			DEBUG_BUILD$3 && logIgnoredSpan(span);
			return true;
		}
	}
	return false;
}
function _matchesAttributeValue(actual, pat) {
	if (typeof actual === "string" && (typeof pat === "string" || pat instanceof RegExp)) return isMatchingPattern(actual, pat);
	if (Array.isArray(actual) && Array.isArray(pat)) return actual.length === pat.length && actual.every((v, i) => v === pat[i]);
	return actual === pat;
}
function reparentChildSpans(spans, dropSpan) {
	const droppedSpanParentId = dropSpan.parent_span_id;
	const droppedSpanId = dropSpan.span_id;
	if (!droppedSpanParentId) return;
	for (const span of spans) if (span.parent_span_id === droppedSpanId) span.parent_span_id = droppedSpanParentId;
}
function isStringOrRegExp(value) {
	return typeof value === "string" || value instanceof RegExp;
}
//#endregion
//#region node_modules/.pnpm/@sentry+core@10.65.0/node_modules/@sentry/core/build/esm/tracing/sentryNonRecordingSpan.js
var NON_RECORDING_SPAN_FIELD = /* @__PURE__ */ Symbol.for("sentry.nonRecordingSpan");
var SentryNonRecordingSpan = class {
	constructor(spanContext = {}) {
		this._traceId = spanContext.traceId || generateTraceId();
		this._spanId = spanContext.spanId || generateSpanId();
		this.dropReason = spanContext.dropReason;
		addNonEnumerableProperty(this, NON_RECORDING_SPAN_FIELD, true);
	}
	/** @inheritdoc */
	spanContext() {
		return {
			spanId: this._spanId,
			traceId: this._traceId,
			traceFlags: 0
		};
	}
	/** @inheritdoc */
	end(_timestamp) {}
	/** @inheritdoc */
	setAttribute(_key, _value) {
		return this;
	}
	/** @inheritdoc */
	setAttributes(_values) {
		return this;
	}
	/** @inheritdoc */
	setStatus(_status) {
		return this;
	}
	/** @inheritdoc */
	updateName(_name) {
		return this;
	}
	/** @inheritdoc */
	isRecording() {
		return false;
	}
	/** @inheritdoc */
	addEvent(_name, _attributesOrStartTime, _startTime) {
		return this;
	}
	/** @inheritDoc */
	addLink(_link) {
		return this;
	}
	/** @inheritDoc */
	addLinks(_links) {
		return this;
	}
	/**
	* This should generally not be used,
	* but we need it for being compliant with the OTEL Span interface.
	*
	* @hidden
	* @internal
	*/
	recordException(_exception, _time) {}
};
function spanIsNonRecordingSpan(span) {
	return !!span && span[NON_RECORDING_SPAN_FIELD] === true;
}
//#endregion
//#region node_modules/.pnpm/@sentry+core@10.65.0/node_modules/@sentry/core/build/esm/constants.js
var DEFAULT_ENVIRONMENT = "production";
//#endregion
//#region node_modules/.pnpm/@sentry+core@10.65.0/node_modules/@sentry/core/build/esm/tracing/dynamicSamplingContext.js
var FROZEN_DSC_FIELD = "_frozenDsc";
function freezeDscOnSpan(span, dsc) {
	addNonEnumerableProperty(span, FROZEN_DSC_FIELD, dsc);
}
function getDynamicSamplingContextFromClient(trace_id, client) {
	const options = client.getOptions();
	const { publicKey: public_key } = client.getDsn() || {};
	const dsc = {
		environment: options.environment || "production",
		release: options.release,
		public_key,
		trace_id,
		org_id: extractOrgIdFromClient(client)
	};
	client.emit("createDsc", dsc);
	return dsc;
}
function getDynamicSamplingContextFromScope(client, scope) {
	const propagationContext = scope.getPropagationContext();
	return propagationContext.dsc || getDynamicSamplingContextFromClient(propagationContext.traceId, client);
}
function getDynamicSamplingContextFromSpan(span) {
	const client = getClient();
	if (!client) return {};
	const rootSpan = getRootSpan(span);
	const rootSpanJson = spanToJSON(rootSpan);
	const rootSpanAttributes = rootSpanJson.data;
	const traceState = rootSpan.spanContext().traceState;
	const rootSpanSampleRate = traceState?.get("sentry.sample_rate") ?? rootSpanAttributes["sentry.sample_rate"] ?? rootSpanAttributes["sentry.previous_trace_sample_rate"];
	function applyLocalSampleRateToDsc(dsc2) {
		if (typeof rootSpanSampleRate === "number" || typeof rootSpanSampleRate === "string") dsc2.sample_rate = `${rootSpanSampleRate}`;
		return dsc2;
	}
	const frozenDsc = rootSpan[FROZEN_DSC_FIELD];
	if (frozenDsc) return applyLocalSampleRateToDsc(frozenDsc);
	if (spanIsNonRecordingSpan(rootSpan) && !hasSpansEnabled(client.getOptions())) {
		const capturedScope = getCapturedScopesOnSpan(rootSpan).scope;
		if (capturedScope) return applyLocalSampleRateToDsc({ ...getDynamicSamplingContextFromScope(client, capturedScope) });
	}
	const traceStateDsc = traceState?.get("sentry.dsc");
	const dscOnTraceState = traceStateDsc && baggageHeaderToDynamicSamplingContext(traceStateDsc);
	if (dscOnTraceState) return applyLocalSampleRateToDsc(dscOnTraceState);
	const dsc = getDynamicSamplingContextFromClient(span.spanContext().traceId, client);
	const source = rootSpanAttributes["sentry.source"] ?? rootSpanAttributes["sentry.span.source"];
	const name = rootSpanJson.description;
	if (source !== "url" && name) dsc.transaction = name;
	if (hasSpansEnabled()) {
		dsc.sampled = String(spanIsSampled(rootSpan));
		dsc.sample_rand = traceState?.get("sentry.sample_rand") ?? getCapturedScopesOnSpan(rootSpan).scope?.getPropagationContext().sampleRand.toString();
	}
	applyLocalSampleRateToDsc(dsc);
	client.emit("createDsc", dsc, rootSpan);
	return dsc;
}
//#endregion
//#region node_modules/.pnpm/@sentry+core@10.65.0/node_modules/@sentry/core/build/esm/tracing/spans/beforeSendSpan.js
function isStreamedBeforeSendSpanCallback(callback) {
	return !!callback && typeof callback === "function" && "_streamed" in callback && !!callback._streamed;
}
//#endregion
//#region node_modules/.pnpm/@sentry+core@10.65.0/node_modules/@sentry/core/build/esm/utils/envelope.js
function createEnvelope(headers, items = []) {
	return [headers, items];
}
function addItemToEnvelope(envelope, newItem) {
	const [headers, items] = envelope;
	return [headers, [...items, newItem]];
}
function forEachEnvelopeItem(envelope, callback) {
	const envelopeItems = envelope[1];
	for (const envelopeItem of envelopeItems) {
		const envelopeItemType = envelopeItem[0].type;
		if (callback(envelopeItem, envelopeItemType)) return true;
	}
	return false;
}
function envelopeContainsItemType(envelope, types) {
	return forEachEnvelopeItem(envelope, (_, type) => types.includes(type));
}
function encodeUTF8(input) {
	const carrier = getSentryCarrier(GLOBAL_OBJ);
	return carrier.encodePolyfill ? carrier.encodePolyfill(input) : new TextEncoder().encode(input);
}
function serializeEnvelope(envelope) {
	const [envHeaders, items] = envelope;
	let parts = JSON.stringify(envHeaders);
	function append(next) {
		if (typeof parts === "string") parts = typeof next === "string" ? parts + next : [encodeUTF8(parts), next];
		else parts.push(typeof next === "string" ? encodeUTF8(next) : next);
	}
	for (const item of items) {
		const [itemHeaders, payload] = item;
		append(`
${JSON.stringify(itemHeaders)}
`);
		if (typeof payload === "string" || payload instanceof Uint8Array) append(payload);
		else {
			let stringifiedPayload;
			try {
				stringifiedPayload = JSON.stringify(payload);
			} catch {
				stringifiedPayload = JSON.stringify(normalize(payload));
			}
			append(stringifiedPayload);
		}
	}
	return typeof parts === "string" ? parts : concatBuffers(parts);
}
function concatBuffers(buffers) {
	const totalLength = buffers.reduce((acc, buf) => acc + buf.length, 0);
	const merged = new Uint8Array(totalLength);
	let offset = 0;
	for (const buffer of buffers) {
		merged.set(buffer, offset);
		offset += buffer.length;
	}
	return merged;
}
function createSpanEnvelopeItem(spanJson) {
	return [{ type: "span" }, spanJson];
}
function createAttachmentEnvelopeItem(attachment) {
	const buffer = typeof attachment.data === "string" ? encodeUTF8(attachment.data) : attachment.data;
	return [{
		type: "attachment",
		length: buffer.length,
		filename: attachment.filename,
		content_type: attachment.contentType,
		attachment_type: attachment.attachmentType
	}, buffer];
}
var DATA_CATEGORY_OVERRIDES = {
	sessions: "session",
	event: "error",
	client_report: "internal",
	user_report: "default",
	profile_chunk: "profile",
	replay_event: "replay",
	replay_recording: "replay",
	check_in: "monitor",
	raw_security: "security",
	log: "log_item",
	trace_metric: "metric"
};
function _isOverriddenType(type) {
	return type in DATA_CATEGORY_OVERRIDES;
}
function envelopeItemTypeToDataCategory(type) {
	return _isOverriddenType(type) ? DATA_CATEGORY_OVERRIDES[type] : type;
}
function getSdkMetadataForEnvelopeHeader(metadataOrEvent) {
	if (!metadataOrEvent?.sdk) return;
	const { name, version } = metadataOrEvent.sdk;
	return {
		name,
		version
	};
}
function createEventEnvelopeHeaders(event, sdkInfo, tunnel, dsn) {
	const dynamicSamplingContext = event.sdkProcessingMetadata?.dynamicSamplingContext;
	return {
		event_id: event.event_id,
		sent_at: new Date(safeDateNow()).toISOString(),
		...sdkInfo && { sdk: sdkInfo },
		...!!tunnel && dsn && { dsn: dsnToString(dsn) },
		...dynamicSamplingContext && { trace: dynamicSamplingContext }
	};
}
//#endregion
//#region node_modules/.pnpm/@sentry+core@10.65.0/node_modules/@sentry/core/build/esm/envelope.js
function _enhanceEventWithSdkInfo(event, newSdkInfo) {
	if (!newSdkInfo) return event;
	const eventSdkInfo = event.sdk || {};
	event.sdk = {
		...eventSdkInfo,
		name: eventSdkInfo.name || newSdkInfo.name,
		version: eventSdkInfo.version || newSdkInfo.version,
		integrations: [...event.sdk?.integrations || [], ...newSdkInfo.integrations || []],
		packages: [...event.sdk?.packages || [], ...newSdkInfo.packages || []],
		settings: event.sdk?.settings || newSdkInfo.settings ? {
			...event.sdk?.settings,
			...newSdkInfo.settings
		} : void 0
	};
	return event;
}
function createSessionEnvelope(session, dsn, metadata, tunnel) {
	const sdkInfo = getSdkMetadataForEnvelopeHeader(metadata);
	return createEnvelope({
		sent_at: new Date(safeDateNow()).toISOString(),
		...sdkInfo && { sdk: sdkInfo },
		...!!tunnel && dsn && { dsn: dsnToString(dsn) }
	}, ["aggregates" in session ? [{ type: "sessions" }, session] : [{ type: "session" }, session.toJSON()]]);
}
function createEventEnvelope(event, dsn, metadata, tunnel) {
	const sdkInfo = getSdkMetadataForEnvelopeHeader(metadata);
	const eventType = event.type && event.type !== "replay_event" ? event.type : "event";
	_enhanceEventWithSdkInfo(event, metadata?.sdk);
	const envelopeHeaders = createEventEnvelopeHeaders(event, sdkInfo, tunnel, dsn);
	delete event.sdkProcessingMetadata;
	return createEnvelope(envelopeHeaders, [[{ type: eventType }, event]]);
}
function createSpanEnvelope(spans, client) {
	function dscHasRequiredProps(dsc2) {
		return !!dsc2.trace_id && !!dsc2.public_key;
	}
	const dsc = getDynamicSamplingContextFromSpan(spans[0]);
	const dsn = client?.getDsn();
	const tunnel = client?.getOptions().tunnel;
	const headers = {
		sent_at: new Date(safeDateNow()).toISOString(),
		...dscHasRequiredProps(dsc) && { trace: dsc },
		...!!tunnel && dsn && { dsn: dsnToString(dsn) }
	};
	const { beforeSendSpan, ignoreSpans } = client?.getOptions() || {};
	const filteredSpans = ignoreSpans?.length ? spans.filter((span) => {
		const json = spanToJSON(span);
		return !shouldIgnoreSpan({
			description: json.description,
			op: json.op,
			attributes: json.data
		}, ignoreSpans);
	}) : spans;
	const droppedSpans = spans.length - filteredSpans.length;
	if (droppedSpans) client?.recordDroppedEvent("before_send", "span", droppedSpans);
	const convertToSpanJSON = beforeSendSpan ? (span) => {
		const spanJson = spanToJSON(span);
		const processedSpan = !isStreamedBeforeSendSpanCallback(beforeSendSpan) ? beforeSendSpan(spanJson) : spanJson;
		if (!processedSpan) {
			showSpanDropWarning();
			return spanJson;
		}
		return processedSpan;
	} : spanToJSON;
	const items = [];
	for (const span of filteredSpans) {
		const spanJson = convertToSpanJSON(span);
		if (spanJson) items.push(createSpanEnvelopeItem(spanJson));
	}
	return createEnvelope(headers, items);
}
//#endregion
//#region node_modules/.pnpm/@sentry+core@10.65.0/node_modules/@sentry/core/build/esm/tracing/logSpans.js
function logSpanStart(span) {
	if (!DEBUG_BUILD$3) return;
	const { description = "< unknown name >", op = "< unknown op >", parent_span_id: parentSpanId } = spanToJSON(span);
	const { spanId } = span.spanContext();
	const sampled = spanIsSampled(span);
	const rootSpan = getRootSpan(span);
	const isRootSpan = rootSpan === span;
	const header = `[Tracing] Starting ${sampled ? "sampled" : "unsampled"} ${isRootSpan ? "root " : ""}span`;
	const infoParts = [
		`op: ${op}`,
		`name: ${description}`,
		`ID: ${spanId}`
	];
	if (parentSpanId) infoParts.push(`parent ID: ${parentSpanId}`);
	if (!isRootSpan) {
		const { op: op2, description: description2 } = spanToJSON(rootSpan);
		infoParts.push(`root ID: ${rootSpan.spanContext().spanId}`);
		if (op2) infoParts.push(`root op: ${op2}`);
		if (description2) infoParts.push(`root description: ${description2}`);
	}
	debug.log(`${header}
  ${infoParts.join("\n  ")}`);
}
function logSpanEnd(span) {
	if (!DEBUG_BUILD$3) return;
	const { description = "< unknown name >", op = "< unknown op >" } = spanToJSON(span);
	const { spanId } = span.spanContext();
	const msg = `[Tracing] Finishing "${op}" ${getRootSpan(span) === span ? "root " : ""}span "${description}" with ID ${spanId}`;
	debug.log(msg);
}
//#endregion
//#region node_modules/.pnpm/@sentry+core@10.65.0/node_modules/@sentry/core/build/esm/tracing/measurement.js
function timedEventsToMeasurements(events) {
	if (!events || events.length === 0) return;
	const measurements = {};
	events.forEach((event) => {
		const attributes = event.attributes || {};
		const unit = attributes[SEMANTIC_ATTRIBUTE_SENTRY_MEASUREMENT_UNIT];
		const value = attributes[SEMANTIC_ATTRIBUTE_SENTRY_MEASUREMENT_VALUE];
		if (typeof unit === "string" && typeof value === "number") measurements[event.name] = {
			value,
			unit
		};
	});
	return measurements;
}
//#endregion
//#region node_modules/.pnpm/@sentry+core@10.65.0/node_modules/@sentry/core/build/esm/tracing/segmentSpanCaptureStrategy.js
function getSegmentSpanCaptureStrategy() {
	return getSentryCarrier(getMainCarrier()).segmentSpanCaptureStrategy;
}
//#endregion
//#region node_modules/.pnpm/@sentry+core@10.65.0/node_modules/@sentry/core/build/esm/tracing/spans/hasSpanStreamingEnabled.js
function hasSpanStreamingEnabled(client) {
	return client.getOptions().traceLifecycle === "stream";
}
//#endregion
//#region node_modules/.pnpm/@sentry+core@10.65.0/node_modules/@sentry/core/build/esm/tracing/sentrySpan.js
var MAX_SPAN_COUNT = 1e3;
var SentrySpan = class {
	/**
	* You should never call the constructor manually, always use `Sentry.startSpan()`
	* or other span methods.
	* @internal
	* @hideconstructor
	* @hidden
	*/
	constructor(spanContext = {}) {
		this._traceId = spanContext.traceId || generateTraceId();
		this._spanId = spanContext.spanId || generateSpanId();
		this._startTime = spanContext.startTimestamp || timestampInSeconds();
		this._links = spanContext.links;
		this._attributes = {};
		this.setAttributes({
			[SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: "manual",
			[SEMANTIC_ATTRIBUTE_SENTRY_OP]: spanContext.op,
			...spanContext.attributes
		});
		this._name = spanContext.name;
		if (spanContext.parentSpanId) this._parentSpanId = spanContext.parentSpanId;
		if ("sampled" in spanContext) this._sampled = spanContext.sampled;
		if (spanContext.endTimestamp) this._endTime = spanContext.endTimestamp;
		this._events = [];
		this._isStandaloneSpan = spanContext.isStandalone;
		if (this._endTime) this._onSpanEnded();
	}
	/** @inheritDoc */
	addLink(link) {
		if (this._frozen) return this;
		if (this._links) this._links.push(link);
		else this._links = [link];
		return this;
	}
	/** @inheritDoc */
	addLinks(links) {
		if (this._frozen) return this;
		if (this._links) this._links.push(...links);
		else this._links = links;
		return this;
	}
	/**
	* This should generally not be used,
	* but it is needed for being compliant with the OTEL Span interface.
	*
	* @hidden
	* @internal
	*/
	recordException(_exception, _time) {}
	/** @inheritdoc */
	spanContext() {
		const { _spanId: spanId, _traceId: traceId, _sampled: sampled } = this;
		return {
			spanId,
			traceId,
			traceFlags: sampled ? 1 : 0
		};
	}
	/** @inheritdoc */
	setAttribute(key, value) {
		if (this._frozen) return this;
		if (value === void 0) delete this._attributes[key];
		else this._attributes[key] = value;
		if (key === "sentry.source" && value !== void 0 && spanShouldInferOtelSource(this)) markSpanSourceAsExplicit(this);
		return this;
	}
	/** @inheritdoc */
	setAttributes(attributes) {
		Object.keys(attributes).forEach((key) => this.setAttribute(key, attributes[key]));
		return this;
	}
	/**
	* This should generally not be used,
	* but we need it for browser tracing where we want to adjust the start time afterwards.
	* USE THIS WITH CAUTION!
	*
	* @hidden
	* @internal
	*/
	updateStartTime(timeInput) {
		if (this._frozen) return;
		this._startTime = spanTimeInputToSeconds(timeInput);
	}
	/**
	* @inheritDoc
	*/
	setStatus(value) {
		if (this._frozen) return this;
		this._status = value;
		return this;
	}
	/**
	* @inheritDoc
	*/
	updateName(name) {
		if (this._frozen) return this;
		this._name = name;
		if (!spanShouldInferOtelSource(this)) this.setAttribute(SEMANTIC_ATTRIBUTE_SENTRY_SOURCE, "custom");
		return this;
	}
	/** @inheritdoc */
	end(endTimestamp) {
		if (this._endTime) {
			this._frozen = spanIsTracerProviderSpan(this);
			return;
		}
		this._endTime = spanTimeInputToSeconds(endTimestamp);
		logSpanEnd(this);
		this._onSpanEnded();
		this._frozen = spanIsTracerProviderSpan(this);
	}
	/**
	* Get JSON representation of this span.
	*
	* @hidden
	* @internal This method is purely for internal purposes and should not be used outside
	* of SDK code. If you need to get a JSON representation of a span,
	* use `spanToJSON(span)` instead.
	*/
	getSpanJSON() {
		return {
			data: this._attributes,
			description: this._name,
			op: this._attributes[SEMANTIC_ATTRIBUTE_SENTRY_OP],
			parent_span_id: this._parentSpanId,
			span_id: this._spanId,
			start_timestamp: this._startTime,
			status: getStatusMessage(this._status),
			timestamp: this._endTime,
			trace_id: this._traceId,
			origin: this._attributes[SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN],
			profile_id: this._attributes[SEMANTIC_ATTRIBUTE_PROFILE_ID],
			exclusive_time: this._attributes[SEMANTIC_ATTRIBUTE_EXCLUSIVE_TIME],
			measurements: timedEventsToMeasurements(this._events),
			is_segment: this._isStandaloneSpan && getRootSpan(this) === this || void 0,
			segment_id: this._isStandaloneSpan ? getRootSpan(this).spanContext().spanId : void 0,
			links: convertSpanLinksForEnvelope(this._links)
		};
	}
	/**
	* Get {@link StreamedSpanJSON} representation of this span.
	*
	* @hidden
	* @internal This method is purely for internal purposes and should not be used outside
	* of SDK code. If you need to get a JSON representation of a span,
	* use `spanToStreamedSpanJSON(span)` instead.
	*/
	getStreamedSpanJSON() {
		return {
			name: this._name ?? "",
			span_id: this._spanId,
			trace_id: this._traceId,
			parent_span_id: this._parentSpanId,
			start_timestamp: this._startTime,
			end_timestamp: this._endTime ?? this._startTime,
			is_segment: this._isStandaloneSpan || this === getRootSpan(this),
			status: getSimpleStatus(this._status),
			attributes: addStatusMessageAttribute(this._attributes, this._status),
			links: getStreamedSpanLinks(this._links)
		};
	}
	/** @inheritdoc */
	isRecording() {
		return !this._endTime && !!this._sampled;
	}
	/**
	* @inheritdoc
	*/
	addEvent(name, attributesOrStartTime, startTime) {
		if (this._frozen) return this;
		DEBUG_BUILD$3 && debug.log("[Tracing] Adding an event to span:", name);
		const time = isSpanTimeInput(attributesOrStartTime) ? attributesOrStartTime : startTime || timestampInSeconds();
		const attributes = isSpanTimeInput(attributesOrStartTime) ? {} : attributesOrStartTime || {};
		const event = {
			name,
			time: spanTimeInputToSeconds(time),
			attributes
		};
		this._events.push(event);
		return this;
	}
	/**
	* This method should generally not be used,
	* but for now we need a way to publicly check if the `_isStandaloneSpan` flag is set.
	* USE THIS WITH CAUTION!
	* @internal
	* @hidden
	* @experimental
	*/
	isStandaloneSpan() {
		return !!this._isStandaloneSpan;
	}
	/** Emit `spanEnd` when the span is ended. */
	_onSpanEnded() {
		const client = getClient();
		if (client) {
			client.emit("spanEnd", this);
			if (!this._isStandaloneSpan) client.emit("afterSpanEnd", this);
		}
		const rootSpan = getRootSpan(this);
		const isSegmentSpan = this._isStandaloneSpan || this === rootSpan;
		if (this._isStandaloneSpan) {
			if (this._sampled) sendSpanEnvelope(createSpanEnvelope([this], client));
			else {
				DEBUG_BUILD$3 && debug.log("[Tracing] Discarding standalone span because its trace was not chosen to be sampled.");
				if (client) client.recordDroppedEvent("sample_rate", "span");
			}
			return;
		}
		if (!isSegmentSpan) {
			const strategy2 = getSegmentSpanCaptureStrategy();
			if (strategy2) {
				const scope2 = getCapturedScopesOnSpan(this).scope || getCurrentScope();
				strategy2.onChildSpanEnded(this, rootSpan, (options) => this._convertSpanToTransaction(options), scope2);
			}
			return;
		}
		if (client && hasSpanStreamingEnabled(client)) {
			client.emit("afterSegmentSpanEnd", this);
			return;
		}
		const scope = getCapturedScopesOnSpan(this).scope || getCurrentScope();
		const strategy = getSegmentSpanCaptureStrategy();
		if (strategy) strategy.onSegmentSpanEnded((options) => this._convertSpanToTransaction(options), scope);
		else {
			const transactionEvent = this._convertSpanToTransaction();
			if (transactionEvent) scope.captureEvent(transactionEvent);
		}
	}
	/**
	* Finish the transaction & prepare the event to send to Sentry.
	*/
	_convertSpanToTransaction(options = {}) {
		if (!isFullFinishedSpan(spanToJSON(this))) return;
		if (!this._name) {
			DEBUG_BUILD$3 && debug.warn("Transaction has no name, falling back to `<unlabeled transaction>`.");
			this._name = "<unlabeled transaction>";
		}
		const { scope: capturedSpanScope, isolationScope: capturedSpanIsolationScope } = getCapturedScopesOnSpan(this);
		const normalizedRequest = capturedSpanScope?.getScopeData().sdkProcessingMetadata?.normalizedRequest;
		if (this._sampled !== true) return;
		options.onSpanCaptured?.(this);
		const spans = [];
		for (const descendant of getSpanDescendants(this)) {
			if (descendant === this || isStandaloneSpan(descendant) || options.isSpanAlreadyCaptured?.(descendant)) continue;
			const spanJSON = spanToJSON(descendant);
			if (!isFullFinishedSpan(spanJSON)) continue;
			options.onSpanCaptured?.(descendant);
			spans.push(spanJSON);
		}
		const source = this._attributes[SEMANTIC_ATTRIBUTE_SENTRY_SOURCE];
		delete this._attributes[SEMANTIC_ATTRIBUTE_SENTRY_CUSTOM_SPAN_NAME];
		let hasGenAiSpans = false;
		spans.forEach((span) => {
			delete span.data[SEMANTIC_ATTRIBUTE_SENTRY_CUSTOM_SPAN_NAME];
			if (span.op?.startsWith("gen_ai.")) hasGenAiSpans = true;
		});
		const transaction = {
			contexts: { trace: spanToTransactionTraceContext(this) },
			spans: spans.length > MAX_SPAN_COUNT ? spans.sort((a, b) => a.start_timestamp - b.start_timestamp).slice(0, MAX_SPAN_COUNT) : spans,
			start_timestamp: this._startTime,
			timestamp: this._endTime,
			transaction: this._name,
			type: "transaction",
			sdkProcessingMetadata: {
				capturedSpanScope,
				capturedSpanIsolationScope,
				dynamicSamplingContext: getDynamicSamplingContextFromSpan(this),
				hasGenAiSpans
			},
			request: normalizedRequest,
			...source && { transaction_info: { source } }
		};
		const measurements = timedEventsToMeasurements(this._events);
		if (measurements && Object.keys(measurements).length) {
			DEBUG_BUILD$3 && debug.log("[Measurements] Adding measurements to transaction event", JSON.stringify(measurements, void 0, 2));
			transaction.measurements = measurements;
		}
		return transaction;
	}
};
function isSpanTimeInput(value) {
	return value && typeof value === "number" || value instanceof Date || Array.isArray(value);
}
function isFullFinishedSpan(input) {
	return !!input.start_timestamp && !!input.timestamp && !!input.span_id && !!input.trace_id;
}
function isStandaloneSpan(span) {
	return span instanceof SentrySpan && span.isStandaloneSpan();
}
function sendSpanEnvelope(envelope) {
	const client = getClient();
	if (!client) return;
	const spanItems = envelope[1];
	if (!spanItems || spanItems.length === 0) {
		client.recordDroppedEvent("before_send", "span");
		return;
	}
	client.sendEnvelope(envelope);
}
//#endregion
//#region node_modules/.pnpm/@sentry+core@10.65.0/node_modules/@sentry/core/build/esm/tracing/sampling.js
function sampleSpan(options, samplingContext, sampleRand) {
	if (!hasSpansEnabled(options)) return [false];
	let localSampleRateWasApplied = void 0;
	let sampleRate;
	if (typeof options.tracesSampler === "function") {
		sampleRate = options.tracesSampler({
			...samplingContext,
			inheritOrSampleWith: (fallbackSampleRate) => {
				if (typeof samplingContext.parentSampleRate === "number") return samplingContext.parentSampleRate;
				if (typeof samplingContext.parentSampled === "boolean") return Number(samplingContext.parentSampled);
				return fallbackSampleRate;
			}
		});
		localSampleRateWasApplied = true;
	} else if (samplingContext.parentSampled !== void 0) sampleRate = samplingContext.parentSampled;
	else if (typeof options.tracesSampleRate !== "undefined") {
		sampleRate = options.tracesSampleRate;
		localSampleRateWasApplied = true;
	}
	const parsedSampleRate = parseSampleRate(sampleRate);
	if (parsedSampleRate === void 0) {
		DEBUG_BUILD$3 && debug.warn(`[Tracing] Discarding root span because of invalid sample rate. Sample rate must be a boolean or a number between 0 and 1. Got ${JSON.stringify(sampleRate)} of type ${JSON.stringify(typeof sampleRate)}.`);
		return [false];
	}
	if (!parsedSampleRate) {
		DEBUG_BUILD$3 && debug.log(`[Tracing] Discarding transaction because ${typeof options.tracesSampler === "function" ? "tracesSampler returned 0 or false" : "a negative sampling decision was inherited or tracesSampleRate is set to 0"}`);
		return [
			false,
			parsedSampleRate,
			localSampleRateWasApplied
		];
	}
	const shouldSample = sampleRand < parsedSampleRate;
	if (!shouldSample) DEBUG_BUILD$3 && debug.log(`[Tracing] Discarding transaction because it's not included in the random sample (sampling rate = ${Number(sampleRate)})`);
	return [
		shouldSample,
		parsedSampleRate,
		localSampleRateWasApplied
	];
}
//#endregion
//#region node_modules/.pnpm/@sentry+core@10.65.0/node_modules/@sentry/core/build/esm/tracing/trace.js
var SUPPRESS_TRACING_KEY = "__SENTRY_SUPPRESS_TRACING__";
function startInactiveSpan(options) {
	const acs = getAcs();
	if (acs.startInactiveSpan) return acs.startInactiveSpan(options);
	return _startInactiveSpanImpl(options);
}
function _startInactiveSpanImpl(options) {
	const spanArguments = parseSentrySpanArguments(options);
	const { forceTransaction, parentSpan: customParentSpan } = options;
	return (options.scope ? (callback) => withScope(options.scope, callback) : customParentSpan !== void 0 ? (callback) => withActiveSpan(customParentSpan, callback) : (callback) => callback())(() => {
		const scope = getCurrentScope();
		const parentSpan = getParentSpan(scope, customParentSpan);
		const client = getClient();
		if (options.onlyIfParent && !parentSpan) return startMissingRequiredParentSpan(scope, client);
		return createChildOrRootSpan({
			parentSpan,
			spanArguments,
			forceTransaction,
			scope
		});
	});
}
function withActiveSpan(span, callback) {
	const acs = getAcs();
	if (acs.withActiveSpan) return acs.withActiveSpan(span, callback);
	return withScope((scope) => {
		_setSpanForScope(scope, span || void 0);
		return callback(scope);
	});
}
function isTracingSuppressed(scope = getCurrentScope()) {
	const acs = getAcs();
	if (acs.isTracingSuppressed) return acs.isTracingSuppressed(scope);
	return scope.getScopeData().sdkProcessingMetadata[SUPPRESS_TRACING_KEY] === true;
}
function startMissingRequiredParentSpan(scope, client) {
	client?.recordDroppedEvent("no_parent_span", "span");
	const span = new SentryNonRecordingSpan({ traceId: scope.getPropagationContext().traceId });
	setCapturedScopesOnSpan(span, scope, getIsolationScope());
	return span;
}
function createChildOrRootSpan({ parentSpan, spanArguments, forceTransaction, scope }) {
	const isolationScope = getIsolationScope();
	if (!hasSpansEnabled()) {
		const scopePropagationContext = {
			...isolationScope.getPropagationContext(),
			...scope.getPropagationContext()
		};
		const span2 = new SentryNonRecordingSpan({ traceId: parentSpan ? parentSpan.spanContext().traceId : scopePropagationContext.traceId });
		if (parentSpan && !forceTransaction) addChildSpanToSpan(parentSpan, span2);
		setCapturedScopesOnSpan(span2, scope, isolationScope);
		return span2;
	}
	const client = getClient();
	if (_shouldIgnoreStreamedSpan(client, spanArguments)) {
		if (!isTracingSuppressed(scope)) client?.recordDroppedEvent("ignored", "span");
		const ignoredSpan = new SentryNonRecordingSpan({
			dropReason: "ignored",
			traceId: parentSpan?.spanContext().traceId ?? scope.getPropagationContext().traceId
		});
		setCapturedScopesOnSpan(ignoredSpan, scope, isolationScope);
		return ignoredSpan;
	}
	let span;
	if (parentSpan && !forceTransaction) {
		span = _startChildSpan(parentSpan, scope, spanArguments, isolationScope);
		addChildSpanToSpan(parentSpan, span);
	} else if (parentSpan) {
		const dsc = getDynamicSamplingContextFromSpan(parentSpan);
		const { traceId, spanId: parentSpanId } = parentSpan.spanContext();
		const parentSampled = spanIsSampled(parentSpan);
		span = _startRootSpan({
			traceId,
			parentSpanId,
			...spanArguments
		}, scope, isolationScope, parentSampled);
		freezeDscOnSpan(span, dsc);
	} else {
		const { traceId, dsc, parentSpanId, sampled: parentSampled } = {
			...isolationScope.getPropagationContext(),
			...scope.getPropagationContext()
		};
		span = _startRootSpan({
			traceId,
			parentSpanId,
			...spanArguments
		}, scope, isolationScope, parentSampled);
		if (dsc) freezeDscOnSpan(span, dsc);
	}
	logSpanStart(span);
	return span;
}
function parseSentrySpanArguments(options) {
	const initialCtx = {
		isStandalone: (options.experimental || {}).standalone,
		...options
	};
	if (options.startTime) {
		const ctx = { ...initialCtx };
		ctx.startTimestamp = spanTimeInputToSeconds(options.startTime);
		delete ctx.startTime;
		return ctx;
	}
	return initialCtx;
}
function getAcs() {
	return getAsyncContextStrategy(getMainCarrier());
}
function _startRootSpan(spanArguments, scope, isolationScope, parentSampled) {
	const client = getClient();
	const options = client?.getOptions() || {};
	const { name = "" } = spanArguments;
	const mutableSpanSamplingData = {
		spanAttributes: { ...spanArguments.attributes },
		spanName: name,
		parentSampled
	};
	client?.emit("beforeSampling", mutableSpanSamplingData, { decision: false });
	const finalParentSampled = mutableSpanSamplingData.parentSampled ?? parentSampled;
	const finalAttributes = mutableSpanSamplingData.spanAttributes;
	const currentPropagationContext = scope.getPropagationContext();
	const _isTracingSuppressed = isTracingSuppressed(scope);
	const [sampled, sampleRate, localSampleRateWasApplied] = _isTracingSuppressed ? [false] : sampleSpan(options, {
		name,
		parentSampled: finalParentSampled,
		attributes: finalAttributes,
		normalizedRequest: isolationScope.getScopeData().sdkProcessingMetadata.normalizedRequest,
		parentSampleRate: parseSampleRate(currentPropagationContext.dsc?.sample_rate)
	}, currentPropagationContext.sampleRand);
	const rootSpan = new SentrySpan({
		...spanArguments,
		attributes: {
			[SEMANTIC_ATTRIBUTE_SENTRY_SOURCE]: "custom",
			[SEMANTIC_ATTRIBUTE_SENTRY_SAMPLE_RATE]: sampleRate !== void 0 && localSampleRateWasApplied ? sampleRate : void 0,
			...finalAttributes
		},
		sampled
	});
	if (!sampled && client && !_isTracingSuppressed) {
		DEBUG_BUILD$3 && debug.log("[Tracing] Discarding root span because its trace was not chosen to be sampled.");
		client.recordDroppedEvent("sample_rate", hasSpanStreamingEnabled(client) ? "span" : "transaction");
	}
	setCapturedScopesOnSpan(rootSpan, scope, isolationScope);
	if (client) client.emit("spanStart", rootSpan);
	return rootSpan;
}
function _startChildSpan(parentSpan, scope, spanArguments, isolationScope) {
	const { spanId, traceId } = parentSpan.spanContext();
	const _isTracingSuppressed = isTracingSuppressed(scope);
	const sampled = _isTracingSuppressed ? false : spanIsSampled(parentSpan);
	const childSpan = sampled ? new SentrySpan({
		...spanArguments,
		parentSpanId: spanId,
		traceId,
		sampled
	}) : new SentryNonRecordingSpan({ traceId });
	addChildSpanToSpan(parentSpan, childSpan);
	setCapturedScopesOnSpan(childSpan, scope, isolationScope);
	const client = getClient();
	if (!client) return childSpan;
	if (hasSpanStreamingEnabled(client) && spanIsNonRecordingSpan(childSpan)) {
		if (spanIsNonRecordingSpan(parentSpan) && parentSpan.dropReason) {
			childSpan.dropReason = parentSpan.dropReason;
			client.recordDroppedEvent(parentSpan.dropReason, "span");
		} else if (!_isTracingSuppressed) {
			childSpan.dropReason = "sample_rate";
			client.recordDroppedEvent("sample_rate", "span");
		}
	}
	client.emit("spanStart", childSpan);
	if (spanArguments.endTimestamp) {
		client.emit("spanEnd", childSpan);
		client.emit("afterSpanEnd", childSpan);
	}
	return childSpan;
}
function getParentSpan(scope, customParentSpan) {
	if (customParentSpan) return customParentSpan;
	if (customParentSpan === null) return;
	const span = _getSpanForScope(scope);
	if (!span) return;
	const client = getClient();
	if ((client ? client.getOptions() : {}).parentSpanIsAlwaysRootSpan) return getRootSpan(span);
	return span;
}
function _shouldIgnoreStreamedSpan(client, spanArguments) {
	const ignoreSpans = client?.getOptions().ignoreSpans;
	if (!client || !hasSpanStreamingEnabled(client) || !ignoreSpans?.length) return false;
	return shouldIgnoreSpan({
		description: spanArguments.name || "",
		op: spanArguments.attributes?.["sentry.op"] || spanArguments.op,
		attributes: spanArguments.attributes
	}, ignoreSpans);
}
//#endregion
//#region node_modules/.pnpm/@sentry+core@10.65.0/node_modules/@sentry/core/build/esm/utils/scopeData.js
function applyScopeDataToEvent(event, data) {
	const { fingerprint, span, breadcrumbs, sdkProcessingMetadata } = data;
	applyDataToEvent(event, data);
	if (span) applySpanToEvent(event, span);
	applyFingerprintToEvent(event, fingerprint);
	applyBreadcrumbsToEvent(event, breadcrumbs);
	applySdkMetadataToEvent(event, sdkProcessingMetadata);
}
function mergeScopeData(data, mergeData) {
	const { extra, tags, attributes, user, contexts, level, sdkProcessingMetadata, breadcrumbs, fingerprint, eventProcessors, attachments, propagationContext, transactionName, span } = mergeData;
	mergeAndOverwriteScopeData(data, "extra", extra);
	mergeAndOverwriteScopeData(data, "tags", tags);
	mergeAndOverwriteScopeData(data, "attributes", attributes);
	mergeAndOverwriteScopeData(data, "user", user);
	mergeAndOverwriteScopeData(data, "contexts", contexts);
	data.sdkProcessingMetadata = merge(data.sdkProcessingMetadata, sdkProcessingMetadata, 2);
	if (level) data.level = level;
	if (transactionName) data.transactionName = transactionName;
	if (span) data.span = span;
	if (breadcrumbs.length) data.breadcrumbs = [...data.breadcrumbs, ...breadcrumbs];
	if (fingerprint.length) data.fingerprint = [...data.fingerprint, ...fingerprint];
	if (eventProcessors.length) data.eventProcessors = [...data.eventProcessors, ...eventProcessors];
	if (attachments.length) data.attachments = [...data.attachments, ...attachments];
	data.propagationContext = {
		...data.propagationContext,
		...propagationContext
	};
}
function mergeAndOverwriteScopeData(data, prop, mergeVal) {
	data[prop] = merge(data[prop], mergeVal, 1);
}
function getCombinedScopeData(isolationScope, currentScope) {
	const scopeData = getGlobalScope().getScopeData();
	isolationScope && mergeScopeData(scopeData, isolationScope.getScopeData());
	currentScope && mergeScopeData(scopeData, currentScope.getScopeData());
	return scopeData;
}
function applyDataToEvent(event, data) {
	const { extra, tags, user, contexts, level, transactionName } = data;
	if (Object.keys(extra).length) event.extra = {
		...extra,
		...event.extra
	};
	if (Object.keys(tags).length) event.tags = {
		...tags,
		...event.tags
	};
	if (Object.keys(user).length) event.user = {
		...user,
		...event.user
	};
	if (Object.keys(contexts).length) event.contexts = {
		...contexts,
		...event.contexts
	};
	if (level) event.level = level;
	if (transactionName && event.type !== "transaction") event.transaction = transactionName;
}
function applyBreadcrumbsToEvent(event, breadcrumbs) {
	const mergedBreadcrumbs = [...event.breadcrumbs || [], ...breadcrumbs];
	event.breadcrumbs = mergedBreadcrumbs.length ? mergedBreadcrumbs : void 0;
}
function applySdkMetadataToEvent(event, sdkProcessingMetadata) {
	event.sdkProcessingMetadata = {
		...event.sdkProcessingMetadata,
		...sdkProcessingMetadata
	};
}
function applySpanToEvent(event, span) {
	event.contexts = {
		trace: spanToTraceContext(span),
		...event.contexts
	};
	event.sdkProcessingMetadata = {
		dynamicSamplingContext: getDynamicSamplingContextFromSpan(span),
		...event.sdkProcessingMetadata
	};
	const transactionName = spanToJSON(getRootSpan(span)).description;
	if (transactionName && !event.transaction && event.type === "transaction") event.transaction = transactionName;
}
function applyFingerprintToEvent(event, fingerprint) {
	event.fingerprint = event.fingerprint ? Array.isArray(event.fingerprint) ? event.fingerprint : [event.fingerprint] : [];
	if (fingerprint) event.fingerprint = event.fingerprint.concat(fingerprint);
	if (!event.fingerprint.length) delete event.fingerprint;
}
//#endregion
//#region node_modules/.pnpm/@sentry+core@10.65.0/node_modules/@sentry/core/build/esm/tracing/spans/captureSpan.js
function safeSetSpanJSONAttributes(spanJSON, newAttributes) {
	const originalAttributes = spanJSON.attributes ?? (spanJSON.attributes = {});
	Object.entries(newAttributes).forEach(([key, value]) => {
		if (value != null && !(key in originalAttributes)) originalAttributes[key] = value;
	});
}
//#endregion
//#region node_modules/.pnpm/@sentry+core@10.65.0/node_modules/@sentry/core/build/esm/utils/syncpromise.js
var STATE_PENDING = 0;
var STATE_RESOLVED = 1;
var STATE_REJECTED = 2;
function resolvedSyncPromise(value) {
	return new SyncPromise((resolve) => {
		resolve(value);
	});
}
function rejectedSyncPromise(reason) {
	return new SyncPromise((_, reject) => {
		reject(reason);
	});
}
var SyncPromise = class SyncPromise {
	constructor(executor) {
		this._state = STATE_PENDING;
		this._handlers = [];
		this._runExecutor(executor);
	}
	/** @inheritdoc */
	then(onfulfilled, onrejected) {
		return new SyncPromise((resolve, reject) => {
			this._handlers.push([
				false,
				(result) => {
					if (!onfulfilled) resolve(result);
					else try {
						resolve(onfulfilled(result));
					} catch (e) {
						reject(e);
					}
				},
				(reason) => {
					if (!onrejected) reject(reason);
					else try {
						resolve(onrejected(reason));
					} catch (e) {
						reject(e);
					}
				}
			]);
			this._executeHandlers();
		});
	}
	/** @inheritdoc */
	catch(onrejected) {
		return this.then((val) => val, onrejected);
	}
	/** @inheritdoc */
	finally(onfinally) {
		return new SyncPromise((resolve, reject) => {
			let val;
			let isRejected;
			return this.then((value) => {
				isRejected = false;
				val = value;
				if (onfinally) onfinally();
			}, (reason) => {
				isRejected = true;
				val = reason;
				if (onfinally) onfinally();
			}).then(() => {
				if (isRejected) {
					reject(val);
					return;
				}
				resolve(val);
			});
		});
	}
	/** Excute the resolve/reject handlers. */
	_executeHandlers() {
		if (this._state === STATE_PENDING) return;
		const cachedHandlers = this._handlers.slice();
		this._handlers = [];
		cachedHandlers.forEach((handler) => {
			if (handler[0]) return;
			if (this._state === STATE_RESOLVED) handler[1](this._value);
			if (this._state === STATE_REJECTED) handler[2](this._value);
			handler[0] = true;
		});
	}
	/** Run the executor for the SyncPromise. */
	_runExecutor(executor) {
		const setResult = (state, value) => {
			if (this._state !== STATE_PENDING) return;
			if (isThenable(value)) {
				value.then(resolve, reject);
				return;
			}
			this._state = state;
			this._value = value;
			this._executeHandlers();
		};
		const resolve = (value) => {
			setResult(STATE_RESOLVED, value);
		};
		const reject = (reason) => {
			setResult(STATE_REJECTED, reason);
		};
		try {
			executor(resolve, reject);
		} catch (e) {
			reject(e);
		}
	}
};
//#endregion
//#region node_modules/.pnpm/@sentry+core@10.65.0/node_modules/@sentry/core/build/esm/eventProcessors.js
function notifyEventProcessors(processors, event, hint, index = 0) {
	try {
		const result = _notifyEventProcessors(event, hint, processors, index);
		return isThenable(result) ? result : resolvedSyncPromise(result);
	} catch (error) {
		return rejectedSyncPromise(error);
	}
}
function _notifyEventProcessors(event, hint, processors, index) {
	const processor = processors[index];
	if (!event || !processor) return event;
	const result = processor({ ...event }, hint);
	DEBUG_BUILD$3 && result === null && debug.log(`Event processor "${processor.id || "?"}" dropped event`);
	if (isThenable(result)) return result.then((final) => _notifyEventProcessors(final, hint, processors, index + 1));
	return _notifyEventProcessors(result, hint, processors, index + 1);
}
//#endregion
//#region node_modules/.pnpm/@sentry+core@10.65.0/node_modules/@sentry/core/build/esm/utils/debug-ids.js
var parsedStackResults;
var lastSentryKeysCount;
var lastNativeKeysCount;
var cachedFilenameDebugIds;
function getFilenameToDebugIdMap(stackParser) {
	const sentryDebugIdMap = GLOBAL_OBJ._sentryDebugIds;
	const nativeDebugIdMap = GLOBAL_OBJ._debugIds;
	if (!sentryDebugIdMap && !nativeDebugIdMap) return {};
	const sentryDebugIdKeys = sentryDebugIdMap ? Object.keys(sentryDebugIdMap) : [];
	const nativeDebugIdKeys = nativeDebugIdMap ? Object.keys(nativeDebugIdMap) : [];
	if (cachedFilenameDebugIds && sentryDebugIdKeys.length === lastSentryKeysCount && nativeDebugIdKeys.length === lastNativeKeysCount) return cachedFilenameDebugIds;
	lastSentryKeysCount = sentryDebugIdKeys.length;
	lastNativeKeysCount = nativeDebugIdKeys.length;
	cachedFilenameDebugIds = {};
	if (!parsedStackResults) parsedStackResults = {};
	const processDebugIds = (debugIdKeys, debugIdMap) => {
		for (const key of debugIdKeys) {
			const debugId = debugIdMap[key];
			const result = parsedStackResults?.[key];
			if (result && cachedFilenameDebugIds && debugId) {
				cachedFilenameDebugIds[result[0]] = debugId;
				if (parsedStackResults) parsedStackResults[key] = [result[0], debugId];
			} else if (debugId) {
				const parsedStack = stackParser(key);
				for (let i = parsedStack.length - 1; i >= 0; i--) {
					const filename = parsedStack[i]?.filename;
					if (filename && cachedFilenameDebugIds && parsedStackResults) {
						cachedFilenameDebugIds[filename] = debugId;
						parsedStackResults[key] = [filename, debugId];
						break;
					}
				}
			}
		}
	};
	if (sentryDebugIdMap) processDebugIds(sentryDebugIdKeys, sentryDebugIdMap);
	if (nativeDebugIdMap) processDebugIds(nativeDebugIdKeys, nativeDebugIdMap);
	return cachedFilenameDebugIds;
}
//#endregion
//#region node_modules/.pnpm/@sentry+core@10.65.0/node_modules/@sentry/core/build/esm/utils/prepareEvent.js
function prepareEvent(options, event, hint, scope, client, isolationScope) {
	const { normalizeDepth = 3, normalizeMaxBreadth = 1e3 } = options;
	const prepared = {
		...event,
		event_id: event.event_id || hint.event_id || uuid4(),
		timestamp: event.timestamp || dateTimestampInSeconds()
	};
	const integrations = hint.integrations || options.integrations.map((i) => i.name);
	applyClientOptions(prepared, options);
	applyIntegrationsMetadata(prepared, integrations);
	if (client) client.emit("applyFrameMetadata", event);
	if (event.type === void 0) applyDebugIds(prepared, options.stackParser);
	const finalScope = getFinalScope(scope, hint.captureContext);
	if (hint.mechanism) addExceptionMechanism(prepared, hint.mechanism);
	const clientEventProcessors = client ? client.getEventProcessors() : [];
	const data = getCombinedScopeData(isolationScope, finalScope);
	const attachments = [...hint.attachments || [], ...data.attachments];
	if (attachments.length) hint.attachments = attachments;
	applyScopeDataToEvent(prepared, data);
	const eventProcessors = [...clientEventProcessors, ...data.eventProcessors];
	return (hint.data && hint.data.__sentry__ === true ? resolvedSyncPromise(prepared) : notifyEventProcessors(eventProcessors, prepared, hint)).then((evt) => {
		if (evt) applyDebugMeta(evt);
		if (typeof normalizeDepth === "number" && normalizeDepth > 0) return normalizeEvent(evt, normalizeDepth, normalizeMaxBreadth);
		return evt;
	});
}
function applyClientOptions(event, options) {
	const { environment, release, dist, maxValueLength } = options;
	event.environment = event.environment || environment || "production";
	if (!event.release && release) event.release = release;
	if (!event.dist && dist) event.dist = dist;
	const request = event.request;
	if (request?.url && maxValueLength) request.url = truncate(request.url, maxValueLength);
	if (maxValueLength) event.exception?.values?.forEach((exception) => {
		if (exception.value) exception.value = truncate(exception.value, maxValueLength);
	});
}
function applyDebugIds(event, stackParser) {
	const filenameDebugIdMap = getFilenameToDebugIdMap(stackParser);
	event.exception?.values?.forEach((exception) => {
		exception.stacktrace?.frames?.forEach((frame) => {
			if (frame.filename) frame.debug_id = filenameDebugIdMap[frame.filename];
		});
	});
}
function applyDebugMeta(event) {
	const filenameDebugIdMap = {};
	event.exception?.values?.forEach((exception) => {
		exception.stacktrace?.frames?.forEach((frame) => {
			if (frame.debug_id) {
				if (frame.abs_path) filenameDebugIdMap[frame.abs_path] = frame.debug_id;
				else if (frame.filename) filenameDebugIdMap[frame.filename] = frame.debug_id;
				delete frame.debug_id;
			}
		});
	});
	if (Object.keys(filenameDebugIdMap).length === 0) return;
	event.debug_meta = event.debug_meta || {};
	event.debug_meta.images = event.debug_meta.images || [];
	const images = event.debug_meta.images;
	Object.entries(filenameDebugIdMap).forEach(([filename, debug_id]) => {
		images.push({
			type: "sourcemap",
			code_file: filename,
			debug_id
		});
	});
}
function applyIntegrationsMetadata(event, integrationNames) {
	if (integrationNames.length > 0) {
		event.sdk = event.sdk || {};
		event.sdk.integrations = [...event.sdk.integrations || [], ...integrationNames];
	}
}
function normalizeEvent(event, depth, maxBreadth) {
	if (!event) return null;
	const normalized = {
		...event,
		...event.breadcrumbs && { breadcrumbs: event.breadcrumbs.map((b) => ({
			...b,
			...b.data && { data: normalize(b.data, depth, maxBreadth) }
		})) },
		...event.user && { user: normalize(event.user, depth, maxBreadth) },
		...event.contexts && { contexts: normalize(event.contexts, depth, maxBreadth) },
		...event.extra && { extra: normalize(event.extra, depth, maxBreadth) }
	};
	if (event.contexts?.trace && normalized.contexts) {
		normalized.contexts.trace = event.contexts.trace;
		if (event.contexts.trace.data) normalized.contexts.trace.data = normalize(event.contexts.trace.data, depth, maxBreadth);
	}
	if (event.spans) normalized.spans = event.spans.map((span) => {
		return {
			...span,
			...span.data && { data: normalize(span.data, depth, maxBreadth) }
		};
	});
	if (event.contexts?.flags && normalized.contexts) normalized.contexts.flags = normalize(event.contexts.flags, 3, maxBreadth);
	return normalized;
}
function getFinalScope(scope, captureContext) {
	if (!captureContext) return scope;
	const finalScope = scope ? scope.clone() : new Scope();
	finalScope.update(captureContext);
	return finalScope;
}
function parseEventHintOrCaptureContext(hint) {
	if (!hint) return;
	if (hintIsScopeOrFunction(hint)) return { captureContext: hint };
	if (hintIsScopeContext(hint)) return { captureContext: hint };
	return hint;
}
function hintIsScopeOrFunction(hint) {
	return hint instanceof Scope || typeof hint === "function";
}
var captureContextKeys = [
	"user",
	"level",
	"extra",
	"contexts",
	"tags",
	"fingerprint",
	"propagationContext"
];
function hintIsScopeContext(hint) {
	return Object.keys(hint).some((key) => captureContextKeys.includes(key));
}
//#endregion
//#region node_modules/.pnpm/@sentry+core@10.65.0/node_modules/@sentry/core/build/esm/exports.js
function captureException(exception, hint) {
	return getCurrentScope().captureException(exception, parseEventHintOrCaptureContext(hint));
}
function captureMessage(message, captureContext) {
	const level = typeof captureContext === "string" ? captureContext : void 0;
	const hint = typeof captureContext !== "string" ? { captureContext } : void 0;
	return getCurrentScope().captureMessage(message, level, hint);
}
function captureEvent(event, hint) {
	return getCurrentScope().captureEvent(event, hint);
}
function isEnabled() {
	const client = getClient();
	return client?.getOptions().enabled !== false && !!client?.getTransport();
}
function startSession(context) {
	const isolationScope = getIsolationScope();
	const { user } = getCombinedScopeData(isolationScope, getCurrentScope());
	const { userAgent } = GLOBAL_OBJ.navigator || {};
	const session = makeSession({
		user,
		...userAgent && { userAgent },
		...context
	});
	const currentSession = isolationScope.getSession();
	if (currentSession?.status === "ok") updateSession(currentSession, { status: "exited" });
	endSession();
	isolationScope.setSession(session);
	return session;
}
function endSession() {
	const isolationScope = getIsolationScope();
	const session = getCurrentScope().getSession() || isolationScope.getSession();
	if (session) closeSession(session);
	_sendSessionUpdate();
	isolationScope.setSession();
}
function _sendSessionUpdate() {
	const isolationScope = getIsolationScope();
	const client = getClient();
	const session = isolationScope.getSession();
	if (session && client) client.captureSession(session);
}
function captureSession(end = false) {
	if (end) {
		endSession();
		return;
	}
	_sendSessionUpdate();
}
//#endregion
//#region node_modules/.pnpm/@sentry+core@10.65.0/node_modules/@sentry/core/build/esm/utils/timer.js
function safeUnref(timer) {
	if (typeof timer === "object" && typeof timer.unref === "function") timer.unref();
	return timer;
}
function getBaseApiEndpoint(dsn) {
	const protocol = dsn.protocol ? `${dsn.protocol}:` : "";
	const port = dsn.port ? `:${dsn.port}` : "";
	return `${protocol}//${dsn.host}${port}${dsn.path ? `/${dsn.path}` : ""}/api/`;
}
function _getIngestEndpoint(dsn) {
	return `${getBaseApiEndpoint(dsn)}${dsn.projectId}/envelope/`;
}
function _encodedAuth(dsn, sdkInfo) {
	const params = { sentry_version: "7" };
	if (dsn.publicKey) params.sentry_key = dsn.publicKey;
	if (sdkInfo) params.sentry_client = `${sdkInfo.name}/${sdkInfo.version}`;
	return new URLSearchParams(params).toString();
}
function getEnvelopeEndpointWithUrlEncodedAuth(dsn, tunnel, sdkInfo) {
	return tunnel ? tunnel : `${_getIngestEndpoint(dsn)}?${_encodedAuth(dsn, sdkInfo)}`;
}
//#endregion
//#region node_modules/.pnpm/@sentry+core@10.65.0/node_modules/@sentry/core/build/esm/integration.js
var installedIntegrations = [];
function filterDuplicates(integrations) {
	const integrationsByName = {};
	integrations.forEach((currentInstance) => {
		const { name } = currentInstance;
		const existingInstance = integrationsByName[name];
		if (existingInstance && !existingInstance.isDefaultInstance && currentInstance.isDefaultInstance) return;
		integrationsByName[name] = currentInstance;
	});
	return Object.values(integrationsByName);
}
function getIntegrationsToSetup(options) {
	const defaultIntegrations = options.defaultIntegrations || [];
	const userIntegrations = options.integrations;
	defaultIntegrations.forEach((integration) => {
		integration.isDefaultInstance = true;
	});
	let integrations;
	if (Array.isArray(userIntegrations)) integrations = [...defaultIntegrations, ...userIntegrations];
	else if (typeof userIntegrations === "function") {
		const resolvedUserIntegrations = userIntegrations(defaultIntegrations);
		integrations = Array.isArray(resolvedUserIntegrations) ? resolvedUserIntegrations : [resolvedUserIntegrations];
	} else integrations = defaultIntegrations;
	return filterDuplicates(integrations);
}
function setupIntegrations(client, integrations) {
	const integrationIndex = {};
	integrations.forEach((integration) => {
		if (integration?.beforeSetup) integration.beforeSetup(client);
	});
	integrations.forEach((integration) => {
		if (integration) setupIntegration(client, integration, integrationIndex);
	});
	return integrationIndex;
}
function afterSetupIntegrations(client, integrations) {
	for (const integration of integrations) if (integration?.afterAllSetup) integration.afterAllSetup(client);
}
function setupIntegration(client, integration, integrationIndex) {
	if (integrationIndex[integration.name]) {
		DEBUG_BUILD$3 && debug.log(`Integration skipped because it was already installed: ${integration.name}`);
		return;
	}
	integrationIndex[integration.name] = integration;
	if (!installedIntegrations.includes(integration.name) && typeof integration.setupOnce === "function") {
		integration.setupOnce();
		installedIntegrations.push(integration.name);
	}
	if (integration.setup && typeof integration.setup === "function") integration.setup(client);
	if (typeof integration.preprocessEvent === "function") {
		const callback = integration.preprocessEvent.bind(integration);
		client.on("preprocessEvent", (event, hint) => callback(event, hint, client));
	}
	if (typeof integration.processEvent === "function") {
		const callback = integration.processEvent.bind(integration);
		const processor = Object.assign((event, hint) => callback(event, hint, client), { id: integration.name });
		client.addEventProcessor(processor);
	}
	["processSpan", "processSegmentSpan"].forEach((hook) => {
		const callback = integration[hook];
		if (typeof callback === "function") client.on(hook, (span) => callback.call(integration, span, client));
	});
	DEBUG_BUILD$3 && debug.log(`Integration installed: ${integration.name}`);
}
function defineIntegration(fn) {
	return fn;
}
//#endregion
//#region node_modules/.pnpm/@sentry+core@10.65.0/node_modules/@sentry/core/build/esm/utils/env.js
function isBrowserBundle() {
	return typeof __SENTRY_BROWSER_BUNDLE__ !== "undefined" && !!__SENTRY_BROWSER_BUNDLE__;
}
function getSDKSource() {
	/*! __SENTRY_SDK_SOURCE__ */
	return "npm";
}
//#endregion
//#region node_modules/.pnpm/@sentry+core@10.65.0/node_modules/@sentry/core/build/esm/utils/node.js
function isNodeEnv() {
	return !isBrowserBundle() && Object.prototype.toString.call(typeof process !== "undefined" ? process : 0) === "[object process]";
}
//#endregion
//#region node_modules/.pnpm/@sentry+core@10.65.0/node_modules/@sentry/core/build/esm/utils/isBrowser.js
function isBrowser() {
	return typeof window !== "undefined" && (!isNodeEnv() || isElectronNodeRenderer());
}
function isElectronNodeRenderer() {
	return GLOBAL_OBJ.process?.type === "renderer";
}
//#endregion
//#region node_modules/.pnpm/@sentry+core@10.65.0/node_modules/@sentry/core/build/esm/logs/envelope.js
function createLogContainerEnvelopeItem(items, inferUserData) {
	const inferSetting = inferUserData ? "auto" : "never";
	return [{
		type: "log",
		item_count: items.length,
		content_type: "application/vnd.sentry.items.log+json"
	}, {
		version: 2,
		...isBrowser() && { ingest_settings: {
			infer_ip: inferSetting,
			infer_user_agent: inferSetting
		} },
		items
	}];
}
function createLogEnvelope(logs, metadata, tunnel, dsn, inferUserData) {
	const headers = {};
	if (metadata?.sdk) headers.sdk = {
		name: metadata.sdk.name,
		version: metadata.sdk.version
	};
	if (!!tunnel && !!dsn) headers.dsn = dsnToString(dsn);
	return createEnvelope(headers, [createLogContainerEnvelopeItem(logs, inferUserData)]);
}
//#endregion
//#region node_modules/.pnpm/@sentry+core@10.65.0/node_modules/@sentry/core/build/esm/logs/internal.js
function _INTERNAL_flushLogsBuffer(client, maybeLogBuffer) {
	const logBuffer = maybeLogBuffer ?? _INTERNAL_getLogBuffer(client) ?? [];
	if (logBuffer.length === 0) return;
	const clientOptions = client.getOptions();
	const envelope = createLogEnvelope(logBuffer, clientOptions._metadata, clientOptions.tunnel, client.getDsn(), client.getDataCollectionOptions().userInfo);
	_getBufferMap$1().set(client, []);
	client.emit("flushLogs");
	client.sendEnvelope(envelope);
}
function _INTERNAL_getLogBuffer(client) {
	return _getBufferMap$1().get(client);
}
function _getBufferMap$1() {
	return getGlobalSingleton("clientToLogBufferMap", () => /* @__PURE__ */ new WeakMap());
}
__name(_getBufferMap$1, "_getBufferMap");
//#endregion
//#region node_modules/.pnpm/@sentry+core@10.65.0/node_modules/@sentry/core/build/esm/metrics/envelope.js
function createMetricContainerEnvelopeItem(items, inferUserData) {
	const inferSetting = inferUserData ? "auto" : "never";
	return [{
		type: "trace_metric",
		item_count: items.length,
		content_type: "application/vnd.sentry.items.trace-metric+json"
	}, {
		version: 2,
		...isBrowser() && { ingest_settings: {
			infer_ip: inferSetting,
			infer_user_agent: inferSetting
		} },
		items
	}];
}
function createMetricEnvelope(metrics, metadata, tunnel, dsn, inferUserData) {
	const headers = {};
	if (metadata?.sdk) headers.sdk = {
		name: metadata.sdk.name,
		version: metadata.sdk.version
	};
	if (!!tunnel && !!dsn) headers.dsn = dsnToString(dsn);
	return createEnvelope(headers, [createMetricContainerEnvelopeItem(metrics, inferUserData)]);
}
//#endregion
//#region node_modules/.pnpm/@sentry+core@10.65.0/node_modules/@sentry/core/build/esm/metrics/internal.js
function _INTERNAL_flushMetricsBuffer(client, maybeMetricBuffer) {
	const metricBuffer = maybeMetricBuffer ?? _INTERNAL_getMetricBuffer(client) ?? [];
	if (metricBuffer.length === 0) return;
	const clientOptions = client.getOptions();
	const envelope = createMetricEnvelope(metricBuffer, clientOptions._metadata, clientOptions.tunnel, client.getDsn(), client.getDataCollectionOptions().userInfo);
	_getBufferMap().set(client, []);
	client.emit("flushMetrics");
	client.sendEnvelope(envelope);
}
function _INTERNAL_getMetricBuffer(client) {
	return _getBufferMap().get(client);
}
function _getBufferMap() {
	return getGlobalSingleton("clientToMetricBufferMap", () => /* @__PURE__ */ new WeakMap());
}
//#endregion
//#region node_modules/.pnpm/@sentry+core@10.65.0/node_modules/@sentry/core/build/esm/tracing/spans/spanJsonToStreamedSpan.js
function spanJsonToSerializedStreamedSpan(span) {
	return streamedSpanJsonToSerializedSpan({
		trace_id: span.trace_id,
		span_id: span.span_id,
		parent_span_id: span.parent_span_id,
		name: span.description || "",
		start_timestamp: span.start_timestamp,
		end_timestamp: span.timestamp || span.start_timestamp,
		status: !span.status || span.status === "ok" || span.status === "cancelled" ? "ok" : "error",
		is_segment: false,
		attributes: { ...span.data },
		links: span.links
	});
}
//#endregion
//#region node_modules/.pnpm/@sentry+core@10.65.0/node_modules/@sentry/core/build/esm/tracing/spans/extractGenAiSpans.js
function extractGenAiSpansFromEvent(event, client) {
	if (event.type !== "transaction" || !event.spans?.length || !event.sdkProcessingMetadata?.hasGenAiSpans || client.getOptions().streamGenAiSpans === false || hasSpanStreamingEnabled(client)) return;
	const genAiSpans = [];
	const remainingSpans = [];
	for (const span of event.spans) if (span.op?.startsWith("gen_ai.")) genAiSpans.push(spanJsonToSerializedStreamedSpan(span));
	else remainingSpans.push(span);
	if (genAiSpans.length === 0) return;
	event.spans = remainingSpans;
	const inferSetting = client.getDataCollectionOptions().userInfo ? "auto" : "never";
	return [{
		type: "span",
		item_count: genAiSpans.length,
		content_type: "application/vnd.sentry.items.span.v2+json"
	}, {
		version: 2,
		...isBrowser() && { ingest_settings: {
			infer_ip: inferSetting,
			infer_user_agent: inferSetting
		} },
		items: genAiSpans
	}];
}
//#endregion
//#region node_modules/.pnpm/@sentry+core@10.65.0/node_modules/@sentry/core/build/esm/utils/promisebuffer.js
var SENTRY_BUFFER_FULL_ERROR = /* @__PURE__ */ Symbol.for("SentryBufferFullError");
function makePromiseBuffer(limit = 100) {
	const buffer = /* @__PURE__ */ new Set();
	function isReady() {
		return buffer.size < limit;
	}
	function remove(task) {
		buffer.delete(task);
	}
	function add(taskProducer) {
		if (!isReady()) return rejectedSyncPromise(SENTRY_BUFFER_FULL_ERROR);
		const task = taskProducer();
		buffer.add(task);
		task.then(() => remove(task), () => remove(task));
		return task;
	}
	function drain(timeout) {
		if (!buffer.size) return resolvedSyncPromise(true);
		const drainPromise = Promise.allSettled(Array.from(buffer)).then(() => true);
		if (!timeout) return drainPromise;
		const promises = [drainPromise, new Promise((resolve) => safeUnref(setTimeout(() => resolve(false), timeout)))];
		return Promise.race(promises);
	}
	return {
		get $() {
			return Array.from(buffer);
		},
		add,
		drain
	};
}
//#endregion
//#region node_modules/.pnpm/@sentry+core@10.65.0/node_modules/@sentry/core/build/esm/utils/ratelimit.js
var DEFAULT_RETRY_AFTER = 6e4;
function parseRetryAfterHeader(header, now = safeDateNow()) {
	const headerDelay = parseInt(`${header}`, 10);
	if (!isNaN(headerDelay)) return headerDelay * 1e3;
	const headerDate = Date.parse(`${header}`);
	if (!isNaN(headerDate)) return headerDate - now;
	return DEFAULT_RETRY_AFTER;
}
function disabledUntil(limits, dataCategory) {
	return limits[dataCategory] || limits.all || 0;
}
function isRateLimited(limits, dataCategory, now = safeDateNow()) {
	return disabledUntil(limits, dataCategory) > now;
}
function updateRateLimits(limits, { statusCode, headers }, now = safeDateNow()) {
	const updatedRateLimits = { ...limits };
	const rateLimitHeader = headers?.["x-sentry-rate-limits"];
	const retryAfterHeader = headers?.["retry-after"];
	if (rateLimitHeader) for (const limit of rateLimitHeader.trim().split(",")) {
		const [retryAfter, categories, , , namespaces] = limit.split(":", 5);
		const headerDelay = parseInt(retryAfter, 10);
		const delay = (!isNaN(headerDelay) ? headerDelay : 60) * 1e3;
		if (!categories) updatedRateLimits.all = now + delay;
		else for (const category of categories.split(";")) if (category === "metric_bucket") {
			if (!namespaces || namespaces.split(";").includes("custom")) updatedRateLimits[category] = now + delay;
		} else updatedRateLimits[category] = now + delay;
	}
	else if (retryAfterHeader) updatedRateLimits.all = now + parseRetryAfterHeader(retryAfterHeader, now);
	else if (statusCode === 429) updatedRateLimits.all = now + 6e4;
	return updatedRateLimits;
}
function createTransport(options, makeRequest, buffer = makePromiseBuffer(options.bufferSize || 64)) {
	let rateLimits = {};
	const flush = (timeout) => buffer.drain(timeout);
	function send(envelope) {
		const filteredEnvelopeItems = [];
		forEachEnvelopeItem(envelope, (item, type) => {
			const dataCategory = envelopeItemTypeToDataCategory(type);
			if (isRateLimited(rateLimits, dataCategory)) options.recordDroppedEvent("ratelimit_backoff", dataCategory);
			else filteredEnvelopeItems.push(item);
		});
		if (filteredEnvelopeItems.length === 0) return Promise.resolve({});
		const filteredEnvelope = createEnvelope(envelope[0], filteredEnvelopeItems);
		const recordEnvelopeLoss = (reason) => {
			if (envelopeContainsItemType(filteredEnvelope, ["client_report"])) {
				DEBUG_BUILD$3 && debug.warn(`Dropping client report. Will not send outcomes (reason: ${reason}).`);
				return;
			}
			forEachEnvelopeItem(filteredEnvelope, (item, type) => {
				options.recordDroppedEvent(reason, envelopeItemTypeToDataCategory(type));
			});
		};
		const requestTask = () => makeRequest({ body: serializeEnvelope(filteredEnvelope) }).then((response) => {
			if (response.statusCode === 413) {
				DEBUG_BUILD$3 && debug.error("Sentry responded with status code 413. Envelope was discarded due to exceeding size limits.");
				recordEnvelopeLoss("send_error");
				return response;
			}
			if (DEBUG_BUILD$3 && response.statusCode !== void 0 && (response.statusCode < 200 || response.statusCode >= 300)) debug.warn(`Sentry responded with status code ${response.statusCode} to sent event.`);
			rateLimits = updateRateLimits(rateLimits, response);
			return response;
		}, (error) => {
			recordEnvelopeLoss("network_error");
			DEBUG_BUILD$3 && debug.error("Encountered error running transport request:", error);
			throw error;
		});
		return buffer.add(requestTask).then((result) => result, (error) => {
			if (error === SENTRY_BUFFER_FULL_ERROR) {
				DEBUG_BUILD$3 && debug.error("Skipped sending event because buffer is full.");
				recordEnvelopeLoss("queue_overflow");
				return Promise.resolve({});
			} else throw error;
		});
	}
	return {
		send,
		flush
	};
}
//#endregion
//#region node_modules/.pnpm/@sentry+core@10.65.0/node_modules/@sentry/core/build/esm/utils/clientreport.js
function createClientReportEnvelope(discarded_events, dsn, timestamp) {
	const clientReportItem = [{ type: "client_report" }, {
		timestamp: timestamp || dateTimestampInSeconds(),
		discarded_events
	}];
	return createEnvelope(dsn ? { dsn } : {}, [clientReportItem]);
}
//#endregion
//#region node_modules/.pnpm/@sentry+core@10.65.0/node_modules/@sentry/core/build/esm/utils/eventUtils.js
function getPossibleEventMessages(event) {
	const possibleMessages = [];
	if (event.message) possibleMessages.push(event.message);
	try {
		const lastException = event.exception.values[event.exception.values.length - 1];
		if (lastException?.value) {
			possibleMessages.push(lastException.value);
			if (lastException.type) possibleMessages.push(`${lastException.type}: ${lastException.value}`);
		}
	} catch {}
	return possibleMessages;
}
//#endregion
//#region node_modules/.pnpm/@sentry+core@10.65.0/node_modules/@sentry/core/build/esm/utils/transactionEvent.js
function convertTransactionEventToSpanJson(event) {
	const { trace_id, parent_span_id, span_id, status, origin, data, op } = event.contexts?.trace ?? {};
	return {
		data: data ?? {},
		description: event.transaction,
		op,
		parent_span_id,
		span_id: span_id ?? "",
		start_timestamp: event.start_timestamp ?? 0,
		status,
		timestamp: event.timestamp,
		trace_id: trace_id ?? "",
		origin,
		profile_id: data?.[SEMANTIC_ATTRIBUTE_PROFILE_ID],
		exclusive_time: data?.[SEMANTIC_ATTRIBUTE_EXCLUSIVE_TIME],
		measurements: event.measurements,
		is_segment: true
	};
}
function convertSpanJsonToTransactionEvent(span) {
	return {
		type: "transaction",
		timestamp: span.timestamp,
		start_timestamp: span.start_timestamp,
		transaction: span.description,
		contexts: { trace: {
			trace_id: span.trace_id,
			span_id: span.span_id,
			parent_span_id: span.parent_span_id,
			op: span.op,
			status: span.status,
			origin: span.origin,
			data: {
				...span.data,
				...span.profile_id && { ["sentry.profile_id"]: span.profile_id },
				...span.exclusive_time && { ["sentry.exclusive_time"]: span.exclusive_time }
			}
		} },
		measurements: span.measurements
	};
}
//#endregion
//#region node_modules/.pnpm/@sentry+core@10.65.0/node_modules/@sentry/core/build/esm/utils/data-collection/filtering-snippets.js
var PII_HEADER_SNIPPETS = [
	"forwarded",
	"-ip",
	"remote-",
	"via",
	"-user"
];
//#endregion
//#region node_modules/.pnpm/@sentry+core@10.65.0/node_modules/@sentry/core/build/esm/utils/data-collection/defaultPiiToCollectionOptions.js
function defaultPiiToCollectionOptions(sendDefaultPii) {
	return sendDefaultPii === true ? {
		userInfo: true,
		cookies: true,
		httpHeaders: {
			request: true,
			response: true
		},
		httpBodies: [
			"incomingRequest",
			"outgoingRequest",
			"incomingResponse",
			"outgoingResponse"
		],
		queryParams: true,
		genAI: {
			inputs: true,
			outputs: true
		},
		stackFrameVariables: true,
		frameContextLines: 7
	} : {
		userInfo: false,
		cookies: { deny: PII_HEADER_SNIPPETS },
		httpHeaders: {
			request: { deny: PII_HEADER_SNIPPETS },
			response: { deny: PII_HEADER_SNIPPETS }
		},
		httpBodies: [],
		queryParams: { deny: PII_HEADER_SNIPPETS },
		genAI: {
			inputs: false,
			outputs: false
		},
		stackFrameVariables: true,
		frameContextLines: 7
	};
}
//#endregion
//#region node_modules/.pnpm/@sentry+core@10.65.0/node_modules/@sentry/core/build/esm/utils/data-collection/resolveDataCollectionOptions.js
var DEFAULTS = {
	userInfo: true,
	cookies: true,
	httpHeaders: {
		request: true,
		response: true
	},
	httpBodies: [
		"incomingRequest",
		"outgoingRequest",
		"incomingResponse",
		"outgoingResponse"
	],
	queryParams: true,
	genAI: {
		inputs: true,
		outputs: true
	},
	stackFrameVariables: true,
	frameContextLines: 5
};
function resolveDataCollectionOptions(options) {
	const base = options.dataCollection != null ? DEFAULTS : defaultPiiToCollectionOptions(options.sendDefaultPii);
	const dc = options.dataCollection ?? {};
	return {
		userInfo: dc.userInfo ?? base.userInfo,
		cookies: dc.cookies ?? base.cookies,
		httpHeaders: {
			request: dc.httpHeaders?.request ?? base.httpHeaders.request,
			response: dc.httpHeaders?.response ?? base.httpHeaders.response
		},
		httpBodies: dc.httpBodies ?? base.httpBodies,
		queryParams: dc.queryParams ?? base.queryParams,
		genAI: {
			inputs: dc.genAI?.inputs ?? base.genAI.inputs,
			outputs: dc.genAI?.outputs ?? base.genAI.outputs
		},
		stackFrameVariables: dc.stackFrameVariables ?? base.stackFrameVariables,
		frameContextLines: dc.frameContextLines ?? base.frameContextLines
	};
}
//#endregion
//#region node_modules/.pnpm/@sentry+core@10.65.0/node_modules/@sentry/core/build/esm/client.js
var ALREADY_SEEN_ERROR = "Not capturing exception because it's already been captured.";
var MISSING_RELEASE_FOR_SESSION_ERROR = "Discarded session because of missing or non-string release";
var INTERNAL_ERROR_SYMBOL = /* @__PURE__ */ Symbol.for("SentryInternalError");
var DO_NOT_SEND_EVENT_SYMBOL = /* @__PURE__ */ Symbol.for("SentryDoNotSendEventError");
var DEFAULT_FLUSH_INTERVAL = 5e3;
function _makeInternalError(message) {
	return {
		message,
		[INTERNAL_ERROR_SYMBOL]: true
	};
}
function _makeDoNotSendEventError(message) {
	return {
		message,
		[DO_NOT_SEND_EVENT_SYMBOL]: true
	};
}
function _isInternalError(error) {
	return isObjectLike(error) && INTERNAL_ERROR_SYMBOL in error;
}
function _isDoNotSendEventError(error) {
	return isObjectLike(error) && DO_NOT_SEND_EVENT_SYMBOL in error;
}
function setupWeightBasedFlushing(client, afterCaptureHook, flushHook, estimateSizeFn, flushFn) {
	let weight = 0;
	let flushTimeout;
	let isTimerActive = false;
	client.on(flushHook, () => {
		weight = 0;
		clearTimeout(flushTimeout);
		isTimerActive = false;
	});
	client.on(afterCaptureHook, (item) => {
		weight += estimateSizeFn(item);
		if (weight >= 8e5) flushFn(client);
		else if (!isTimerActive) {
			const flushInterval = client.getOptions()._flushInterval ?? DEFAULT_FLUSH_INTERVAL;
			if (flushInterval > 0) {
				isTimerActive = true;
				flushTimeout = safeUnref(setTimeout(() => {
					flushFn(client);
				}, flushInterval));
			}
		}
	});
	client.on("flush", () => {
		flushFn(client);
	});
}
var Client = class {
	/**
	* Initializes this client instance.
	*
	* @param options Options for the client.
	*/
	constructor(options) {
		this._options = options;
		this._integrations = {};
		this._numProcessing = 0;
		this._outcomes = {};
		this._hooks = {};
		this._eventProcessors = [];
		this._promiseBuffer = makePromiseBuffer(options.transportOptions?.bufferSize ?? 64);
		this._dataCollection = resolveDataCollectionOptions(options);
		if (options.dsn) this._dsn = makeDsn(options.dsn);
		else DEBUG_BUILD$3 && debug.warn("No DSN provided, client will not send events.");
		if (this._dsn) {
			const url = getEnvelopeEndpointWithUrlEncodedAuth(this._dsn, options.tunnel, options._metadata ? options._metadata.sdk : void 0);
			this._transport = options.transport({
				tunnel: this._options.tunnel,
				recordDroppedEvent: this.recordDroppedEvent.bind(this),
				...options.transportOptions,
				url
			});
		}
		this._options.enableLogs = this._options.enableLogs ?? this._options._experiments?.enableLogs;
		if (this._options.enableLogs) setupWeightBasedFlushing(this, "afterCaptureLog", "flushLogs", estimateLogSizeInBytes, _INTERNAL_flushLogsBuffer);
		if (this._options.enableMetrics ?? this._options._experiments?.enableMetrics ?? true) setupWeightBasedFlushing(this, "afterCaptureMetric", "flushMetrics", estimateMetricSizeInBytes, _INTERNAL_flushMetricsBuffer);
	}
	/**
	* Captures an exception event and sends it to Sentry.
	*
	* Unlike `captureException` exported from every SDK, this method requires that you pass it the current scope.
	*/
	captureException(exception, hint, scope) {
		const eventId = uuid4();
		if (checkOrSetAlreadyCaught(exception)) {
			DEBUG_BUILD$3 && debug.log(ALREADY_SEEN_ERROR);
			return eventId;
		}
		const hintWithEventId = {
			event_id: eventId,
			...hint
		};
		this._process(() => this.eventFromException(exception, hintWithEventId).then((event) => this._captureEvent(event, hintWithEventId, scope)).then((res) => res), "error");
		return hintWithEventId.event_id;
	}
	/**
	* Captures a message event and sends it to Sentry.
	*
	* Unlike `captureMessage` exported from every SDK, this method requires that you pass it the current scope.
	*/
	captureMessage(message, level, hint, currentScope) {
		const hintWithEventId = {
			event_id: uuid4(),
			...hint
		};
		const eventMessage = isParameterizedString(message) ? message : String(message);
		const isMessage = isPrimitive(message);
		const promisedEvent = isMessage ? this.eventFromMessage(eventMessage, level, hintWithEventId) : this.eventFromException(message, hintWithEventId);
		this._process(() => promisedEvent.then((event) => this._captureEvent(event, hintWithEventId, currentScope)), isMessage ? "unknown" : "error");
		return hintWithEventId.event_id;
	}
	/**
	* Captures a manually created event and sends it to Sentry.
	*
	* Unlike `captureEvent` exported from every SDK, this method requires that you pass it the current scope.
	*/
	captureEvent(event, hint, currentScope) {
		const eventId = uuid4();
		if (hint?.originalException && checkOrSetAlreadyCaught(hint.originalException)) {
			DEBUG_BUILD$3 && debug.log(ALREADY_SEEN_ERROR);
			return eventId;
		}
		const hintWithEventId = {
			event_id: eventId,
			...hint
		};
		const sdkProcessingMetadata = event.sdkProcessingMetadata || {};
		const capturedSpanScope = sdkProcessingMetadata.capturedSpanScope;
		const capturedSpanIsolationScope = sdkProcessingMetadata.capturedSpanIsolationScope;
		const dataCategory = getDataCategoryByType(event.type);
		this._process(() => this._captureEvent(event, hintWithEventId, capturedSpanScope || currentScope, capturedSpanIsolationScope), dataCategory);
		return hintWithEventId.event_id;
	}
	/**
	* Captures a session.
	*/
	captureSession(session) {
		this.sendSession(session);
		updateSession(session, { init: false });
	}
	/**
	* Get the current Dsn.
	*/
	getDsn() {
		return this._dsn;
	}
	/**
	* Get the current options.
	*/
	getOptions() {
		return this._options;
	}
	/**
	* Get the resolved data collection configuration.
	*/
	getDataCollectionOptions() {
		return this._dataCollection;
	}
	/**
	* Get the SDK metadata.
	* @see SdkMetadata
	*/
	getSdkMetadata() {
		return this._options._metadata;
	}
	/**
	* Returns the transport that is used by the client.
	* Please note that the transport gets lazy initialized so it will only be there once the first event has been sent.
	*/
	getTransport() {
		return this._transport;
	}
	/**
	* Wait for all events to be sent or the timeout to expire, whichever comes first.
	*
	* @param timeout Maximum time in ms the client should wait for events to be flushed. Omitting this parameter will
	*   cause the client to wait until all events are sent before resolving the promise.
	* @returns A promise that will resolve with `true` if all events are sent before the timeout, or `false` if there are
	* still events in the queue when the timeout is reached.
	*/
	async flush(timeout) {
		const transport = this._transport;
		this.emit("flush");
		if (!transport) return true;
		const clientFinished = await this._isClientDoneProcessing(timeout);
		const transportFlushed = await transport.flush(timeout);
		return clientFinished && transportFlushed;
	}
	/**
	* Flush the event queue and set the client to `enabled = false`. See {@link Client.flush}.
	*
	* @param {number} timeout Maximum time in ms the client should wait before shutting down. Omitting this parameter will cause
	*   the client to wait until all events are sent before disabling itself.
	* @returns {Promise<boolean>} A promise which resolves to `true` if the flush completes successfully before the timeout, or `false` if
	* it doesn't.
	*/
	async close(timeout) {
		_INTERNAL_flushLogsBuffer(this);
		const result = await this.flush(timeout);
		this.getOptions().enabled = false;
		this.emit("close");
		return result;
	}
	/**
	* Get all installed event processors.
	*/
	getEventProcessors() {
		return this._eventProcessors;
	}
	/**
	* Adds an event processor that applies to any event processed by this client.
	*/
	addEventProcessor(eventProcessor) {
		this._eventProcessors.push(eventProcessor);
	}
	/**
	* Initialize this client.
	* Call this after the client was set on a scope.
	*/
	init() {
		if (this._isEnabled() || this._options.integrations.some(({ name }) => name.startsWith("Spotlight"))) this._setupIntegrations();
	}
	/**
	* Gets an installed integration by its name.
	*
	* @returns {Integration|undefined} The installed integration or `undefined` if no integration with that `name` was installed.
	*/
	getIntegrationByName(integrationName) {
		return this._integrations[integrationName];
	}
	/**
	* Returns the names of all installed integrations.
	*/
	getIntegrationNames() {
		return Object.keys(this._integrations);
	}
	/**
	* Add an integration to the client.
	* This can be used to e.g. lazy load integrations.
	* In most cases, this should not be necessary,
	* and you're better off just passing the integrations via `integrations: []` at initialization time.
	* However, if you find the need to conditionally load & add an integration, you can use `addIntegration` to do so.
	*/
	addIntegration(integration) {
		const isAlreadyInstalled = this._integrations[integration.name];
		if (!isAlreadyInstalled && integration.beforeSetup) integration.beforeSetup(this);
		setupIntegration(this, integration, this._integrations);
		if (!isAlreadyInstalled) afterSetupIntegrations(this, [integration]);
	}
	/**
	* Send a fully prepared event to Sentry.
	*/
	sendEvent(event, hint = {}) {
		this.emit("beforeSendEvent", event, hint);
		const genAiSpanItem = extractGenAiSpansFromEvent(event, this);
		let env = createEventEnvelope(event, this._dsn, this._options._metadata, this._options.tunnel);
		for (const attachment of hint.attachments || []) env = addItemToEnvelope(env, createAttachmentEnvelopeItem(attachment));
		if (genAiSpanItem) env = addItemToEnvelope(env, genAiSpanItem);
		this.sendEnvelope(env).then((sendResponse) => this.emit("afterSendEvent", event, sendResponse));
	}
	/**
	* Send a session or session aggregrates to Sentry.
	*/
	sendSession(session) {
		const { release: clientReleaseOption, environment: clientEnvironmentOption = DEFAULT_ENVIRONMENT } = this._options;
		if ("aggregates" in session) {
			const sessionAttrs = session.attrs || {};
			if (!sessionAttrs.release && !clientReleaseOption) {
				DEBUG_BUILD$3 && debug.warn(MISSING_RELEASE_FOR_SESSION_ERROR);
				return;
			}
			sessionAttrs.release = sessionAttrs.release || clientReleaseOption;
			sessionAttrs.environment = sessionAttrs.environment || clientEnvironmentOption;
			session.attrs = sessionAttrs;
		} else {
			if (!session.release && !clientReleaseOption) {
				DEBUG_BUILD$3 && debug.warn(MISSING_RELEASE_FOR_SESSION_ERROR);
				return;
			}
			session.release = session.release || clientReleaseOption;
			session.environment = session.environment || clientEnvironmentOption;
		}
		this.emit("beforeSendSession", session);
		const env = createSessionEnvelope(session, this._dsn, this._options._metadata, this._options.tunnel);
		this.sendEnvelope(env);
	}
	/**
	* Record on the client that an event got dropped (ie, an event that will not be sent to Sentry).
	*/
	recordDroppedEvent(reason, category, count = 1) {
		if (this._options.sendClientReports) {
			const key = `${reason}:${category}`;
			DEBUG_BUILD$3 && debug.log(`Recording outcome: "${key}"${count > 1 ? ` (${count} times)` : ""}`);
			this._outcomes[key] = (this._outcomes[key] || 0) + count;
		}
	}
	/**
	* Register a hook on this client.
	*/
	on(hook, callback) {
		const hookCallbacks = this._hooks[hook] = this._hooks[hook] || /* @__PURE__ */ new Set();
		const uniqueCallback = (...args) => callback(...args);
		hookCallbacks.add(uniqueCallback);
		return () => {
			hookCallbacks.delete(uniqueCallback);
		};
	}
	/**
	* Emit a hook that was previously registered via `on()`.
	*/
	emit(hook, ...rest) {
		const callbacks = this._hooks[hook];
		if (callbacks) callbacks.forEach((callback) => callback(...rest));
	}
	/**
	* Send an envelope to Sentry.
	*/
	async sendEnvelope(envelope) {
		this.emit("beforeEnvelope", envelope);
		if (this._isEnabled() && this._transport) try {
			return await this._transport.send(envelope);
		} catch (reason) {
			DEBUG_BUILD$3 && debug.error("Error while sending envelope:", reason);
			return {};
		}
		DEBUG_BUILD$3 && debug.error("Transport disabled");
		return {};
	}
	/**
	* Register a cleanup function to be called when the client is disposed.
	* This is useful for integrations that need to clean up global state.
	*
	* NOTE: This is a no-op in the base `Client` class. Subclasses like `ServerRuntimeClient`
	* override this method to actually register and execute cleanup callbacks.
	*/
	registerCleanup(callback) {}
	/**
	* Disposes of the client and releases all resources.
	*
	* Subclasses should override this method to clean up their own resources, including invoking
	* any callbacks registered via {@link Client.registerCleanup}. The base implementation is a
	* no-op and does NOT execute registered cleanup callbacks.
	*
	* After calling dispose(), the client should not be used anymore.
	*/
	dispose() {}
	/** Setup integrations for this client. */
	_setupIntegrations() {
		const { integrations } = this._options;
		this._integrations = setupIntegrations(this, integrations);
		afterSetupIntegrations(this, integrations);
	}
	/** Updates existing session based on the provided event */
	_updateSessionFromEvent(session, event) {
		let crashed = event.level === "fatal";
		let errored = false;
		const exceptions = event.exception?.values;
		if (exceptions) {
			errored = true;
			crashed = false;
			for (const ex of exceptions) if (ex.mechanism?.handled === false) {
				crashed = true;
				break;
			}
		}
		const sessionNonTerminal = session.status === "ok";
		if (sessionNonTerminal && session.errors === 0 || sessionNonTerminal && crashed) {
			updateSession(session, {
				...crashed && { status: "crashed" },
				errors: session.errors || Number(errored || crashed)
			});
			this.captureSession(session);
		}
	}
	/**
	* Determine if the client is finished processing. Returns a promise because it will wait `timeout` ms before saying
	* "no" (resolving to `false`) in order to give the client a chance to potentially finish first.
	*
	* @param timeout The time, in ms, after which to resolve to `false` if the client is still busy. Passing `0` (or not
	* passing anything) will make the promise wait as long as it takes for processing to finish before resolving to
	* `true`.
	* @returns A promise which will resolve to `true` if processing is already done or finishes before the timeout, and
	* `false` otherwise
	*/
	async _isClientDoneProcessing(timeout) {
		let ticked = 0;
		while (!timeout || ticked < timeout) {
			await new Promise((resolve) => setTimeout(resolve, 1));
			if (!this._numProcessing) return true;
			ticked++;
		}
		return false;
	}
	/** Determines whether this SDK is enabled and a transport is present. */
	_isEnabled() {
		return this.getOptions().enabled !== false && this._transport !== void 0;
	}
	/**
	* Adds common information to events.
	*
	* The information includes release and environment from `options`,
	* breadcrumbs and context (extra, tags and user) from the scope.
	*
	* Information that is already present in the event is never overwritten. For
	* nested objects, such as the context, keys are merged.
	*
	* @param event The original event.
	* @param hint May contain additional information about the original exception.
	* @param currentScope A scope containing event metadata.
	* @returns A new event with more information.
	*/
	_prepareEvent(event, hint, currentScope, isolationScope) {
		const options = this.getOptions();
		const integrations = this.getIntegrationNames();
		if (!hint.integrations && integrations.length) hint.integrations = integrations;
		this.emit("preprocessEvent", event, hint);
		if (!event.type) isolationScope.setLastEventId(event.event_id || hint.event_id);
		return prepareEvent(options, event, hint, currentScope, this, isolationScope).then((evt) => {
			if (evt === null) return evt;
			this.emit("postprocessEvent", evt, hint);
			evt.contexts = {
				trace: {
					...evt.contexts?.trace,
					...getTraceContextFromScope(currentScope)
				},
				...evt.contexts
			};
			evt.sdkProcessingMetadata = {
				dynamicSamplingContext: getDynamicSamplingContextFromScope(this, currentScope),
				...evt.sdkProcessingMetadata
			};
			return evt;
		});
	}
	/**
	* Processes the event and logs an error in case of rejection
	* @param event
	* @param hint
	* @param scope
	*/
	_captureEvent(event, hint = {}, currentScope = getCurrentScope(), isolationScope = getIsolationScope()) {
		if (DEBUG_BUILD$3 && isErrorEvent(event)) debug.log(`Captured error event \`${getPossibleEventMessages(event)[0] || "<unknown>"}\``);
		return this._processEvent(event, hint, currentScope, isolationScope).then((finalEvent) => {
			return finalEvent.event_id;
		}, (reason) => {
			if (DEBUG_BUILD$3) {
				if (_isDoNotSendEventError(reason)) debug.log(reason.message);
				else if (_isInternalError(reason)) debug.warn(reason.message);
				else debug.warn(reason);
			}
		});
	}
	/**
	* Processes an event (either error or message) and sends it to Sentry.
	*
	* This also adds breadcrumbs and context information to the event. However,
	* platform specific meta data (such as the User's IP address) must be added
	* by the SDK implementor.
	*
	*
	* @param event The event to send to Sentry.
	* @param hint May contain additional information about the original exception.
	* @param currentScope A scope containing event metadata.
	* @returns A SyncPromise that resolves with the event or rejects in case event was/will not be send.
	*/
	_processEvent(event, hint, currentScope, isolationScope) {
		const options = this.getOptions();
		const { sampleRate } = options;
		const isTransaction = isTransactionEvent(event);
		const isError = isErrorEvent(event);
		const beforeSendLabel = `before send for type \`${event.type || "error"}\``;
		const parsedSampleRate = typeof sampleRate === "undefined" ? void 0 : parseSampleRate(sampleRate);
		if (isError && typeof parsedSampleRate === "number" && safeMathRandom() > parsedSampleRate) {
			this.recordDroppedEvent("sample_rate", "error");
			return rejectedSyncPromise(_makeDoNotSendEventError(`Discarding event because it's not included in the random sample (sampling rate = ${sampleRate})`));
		}
		const dataCategory = getDataCategoryByType(event.type);
		return this._prepareEvent(event, hint, currentScope, isolationScope).then((prepared) => {
			if (prepared === null) {
				this.recordDroppedEvent("event_processor", dataCategory);
				throw _makeDoNotSendEventError("An event processor returned `null`, will not send event.");
			}
			if (hint.data?.__sentry__ === true) return prepared;
			return _validateBeforeSendResult(processBeforeSend(this, options, prepared, hint), beforeSendLabel);
		}).then((processedEvent) => {
			if (processedEvent === null) {
				this.recordDroppedEvent("before_send", dataCategory);
				if (isTransaction) {
					const spanCount = 1 + (event.spans || []).length;
					this.recordDroppedEvent("before_send", "span", spanCount);
				}
				throw _makeDoNotSendEventError(`${beforeSendLabel} returned \`null\`, will not send event.`);
			}
			const session = currentScope.getSession() || isolationScope.getSession();
			if (isError && session) this._updateSessionFromEvent(session, processedEvent);
			if (isTransaction) {
				const droppedSpanCount = (processedEvent.sdkProcessingMetadata?.spanCountBeforeProcessing || 0) - (processedEvent.spans ? processedEvent.spans.length : 0);
				if (droppedSpanCount > 0) this.recordDroppedEvent("before_send", "span", droppedSpanCount);
			}
			const transactionInfo = processedEvent.transaction_info;
			if (isTransaction && transactionInfo && processedEvent.transaction !== event.transaction) {
				const source = "custom";
				processedEvent.transaction_info = {
					...transactionInfo,
					source
				};
			}
			this.sendEvent(processedEvent, hint);
			return processedEvent;
		}).then(null, (reason) => {
			if (_isDoNotSendEventError(reason) || _isInternalError(reason)) throw reason;
			this.captureException(reason, {
				mechanism: {
					handled: false,
					type: "internal"
				},
				data: { __sentry__: true },
				originalException: reason
			});
			throw _makeInternalError(`Event processing pipeline threw an error, original event will not be sent. Details have been sent as a new event.
Reason: ${reason}`);
		});
	}
	/**
	* Occupies the client with processing and event
	*/
	_process(taskProducer, dataCategory) {
		this._numProcessing++;
		this._promiseBuffer.add(taskProducer).then((value) => {
			this._numProcessing--;
			return value;
		}, (reason) => {
			this._numProcessing--;
			if (reason === SENTRY_BUFFER_FULL_ERROR) this.recordDroppedEvent("queue_overflow", dataCategory);
			return reason;
		});
	}
	/**
	* Clears outcomes on this client and returns them.
	*/
	_clearOutcomes() {
		const outcomes = this._outcomes;
		this._outcomes = {};
		return Object.entries(outcomes).map(([key, quantity]) => {
			const [reason, category] = key.split(":");
			return {
				reason,
				category,
				quantity
			};
		});
	}
	/**
	* Sends client reports as an envelope.
	*/
	_flushOutcomes() {
		DEBUG_BUILD$3 && debug.log("Flushing outcomes...");
		const outcomes = this._clearOutcomes();
		if (outcomes.length === 0) {
			DEBUG_BUILD$3 && debug.log("No outcomes to send");
			return;
		}
		if (!this._dsn) {
			DEBUG_BUILD$3 && debug.log("No dsn provided, will not send outcomes");
			return;
		}
		DEBUG_BUILD$3 && debug.log("Sending outcomes:", outcomes);
		const envelope = createClientReportEnvelope(outcomes, this._options.tunnel && dsnToString(this._dsn));
		this.sendEnvelope(envelope);
	}
};
function getDataCategoryByType(type) {
	return type === "replay_event" ? "replay" : type || "error";
}
function _validateBeforeSendResult(beforeSendResult, beforeSendLabel) {
	const invalidValueError = `${beforeSendLabel} must return \`null\` or a valid event.`;
	if (isThenable(beforeSendResult)) return beforeSendResult.then((event) => {
		if (!isPlainObject(event) && event !== null) throw _makeInternalError(invalidValueError);
		return event;
	}, (e) => {
		throw _makeInternalError(`${beforeSendLabel} rejected with ${e}`);
	});
	else if (!isPlainObject(beforeSendResult) && beforeSendResult !== null) throw _makeInternalError(invalidValueError);
	return beforeSendResult;
}
function processBeforeSend(client, options, event, hint) {
	const { beforeSend, beforeSendTransaction, ignoreSpans } = options;
	const beforeSendSpan = !isStreamedBeforeSendSpanCallback(options.beforeSendSpan) && options.beforeSendSpan;
	let processedEvent = event;
	if (isErrorEvent(processedEvent) && beforeSend) return beforeSend(processedEvent, hint);
	if (isTransactionEvent(processedEvent)) {
		if (beforeSendSpan || ignoreSpans) {
			const rootSpanJson = convertTransactionEventToSpanJson(processedEvent);
			if (ignoreSpans?.length && shouldIgnoreSpan({
				description: rootSpanJson.description,
				op: rootSpanJson.op,
				attributes: rootSpanJson.data
			}, ignoreSpans)) return null;
			if (beforeSendSpan) {
				const processedRootSpanJson = beforeSendSpan(rootSpanJson);
				if (!processedRootSpanJson) showSpanDropWarning();
				else processedEvent = merge(event, convertSpanJsonToTransactionEvent(processedRootSpanJson));
			}
			if (processedEvent.spans) {
				const processedSpans = [];
				const initialSpans = processedEvent.spans;
				for (const span of initialSpans) {
					if (ignoreSpans?.length && shouldIgnoreSpan({
						description: span.description,
						op: span.op,
						attributes: span.data
					}, ignoreSpans)) {
						reparentChildSpans(initialSpans, span);
						continue;
					}
					if (beforeSendSpan) {
						const processedSpan = beforeSendSpan(span);
						if (!processedSpan) {
							showSpanDropWarning();
							processedSpans.push(span);
						} else processedSpans.push(processedSpan);
					} else processedSpans.push(span);
				}
				const droppedSpans = processedEvent.spans.length - processedSpans.length;
				if (droppedSpans) client.recordDroppedEvent("before_send", "span", droppedSpans);
				processedEvent.spans = processedSpans;
			}
		}
		if (beforeSendTransaction) {
			if (processedEvent.spans) {
				const spanCountBefore = processedEvent.spans.length;
				processedEvent.sdkProcessingMetadata = {
					...event.sdkProcessingMetadata,
					spanCountBeforeProcessing: spanCountBefore
				};
			}
			return beforeSendTransaction(processedEvent, hint);
		}
	}
	return processedEvent;
}
function isErrorEvent(event) {
	return event.type === void 0;
}
function isTransactionEvent(event) {
	return event.type === "transaction";
}
function estimateMetricSizeInBytes(metric) {
	let weight = 0;
	if (metric.name) weight += metric.name.length * 2;
	weight += 8;
	return weight + estimateAttributesSizeInBytes(metric.attributes);
}
function estimateLogSizeInBytes(log) {
	let weight = 0;
	if (log.message) weight += log.message.length * 2;
	return weight + estimateAttributesSizeInBytes(log.attributes);
}
function estimateAttributesSizeInBytes(attributes) {
	if (!attributes) return 0;
	let weight = 0;
	Object.values(attributes).forEach((value) => {
		if (Array.isArray(value)) weight += value.length * estimatePrimitiveSizeInBytes(value[0]);
		else if (isPrimitive(value)) weight += estimatePrimitiveSizeInBytes(value);
		else weight += 100;
	});
	return weight;
}
function estimatePrimitiveSizeInBytes(value) {
	if (typeof value === "string") return value.length * 2;
	else if (typeof value === "number") return 8;
	else if (typeof value === "boolean") return 4;
	return 0;
}
//#endregion
//#region node_modules/.pnpm/@sentry+core@10.65.0/node_modules/@sentry/core/build/esm/sdk.js
function initAndBind(clientClass, options) {
	if (options.debug === true) {
		if (DEBUG_BUILD$3) debug.enable();
		else consoleSandbox(() => {
			console.warn("[Sentry] Cannot initialize SDK with `debug` option using a non-debug bundle.");
		});
	}
	getCurrentScope().update(options.initialScope);
	const client = new clientClass(options);
	setCurrentClient(client);
	client.init();
	return client;
}
function setCurrentClient(client) {
	getCurrentScope().setClient(client);
}
//#endregion
//#region node_modules/.pnpm/@sentry+core@10.65.0/node_modules/@sentry/core/build/esm/utils/url.js
function parseUrl(url) {
	if (!url) return {};
	const match = url.match(/^(([^:/?#]+):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?$/);
	if (!match) return {};
	const query = match[6] || "";
	const fragment = match[8] || "";
	return {
		host: match[4],
		path: match[5],
		protocol: match[2],
		search: query,
		hash: fragment,
		relative: match[5] + query + fragment
	};
}
function stripDataUrlContent(url, includeDataPrefix = true) {
	if (url.startsWith("data:")) {
		const match = url.match(/^data:([^;,]+)/);
		const mimeType = match ? match[1] : "text/plain";
		const isBase64 = url.includes(";base64,");
		const dataStart = url.indexOf(",");
		let dataPrefix = "";
		if (includeDataPrefix && dataStart !== -1) {
			const data = url.slice(dataStart + 1);
			dataPrefix = data.length > 10 ? `${data.slice(0, 10)}... [truncated]` : data;
		}
		return `data:${mimeType}${isBase64 ? ",base64" : ""}${dataPrefix ? `,${dataPrefix}` : ""}`;
	}
	return url;
}
//#endregion
//#region node_modules/.pnpm/@sentry+core@10.65.0/node_modules/@sentry/core/build/esm/utils/ipAddress.js
function addAutoIpAddressToSession(session) {
	if ("aggregates" in session) {
		if (session.attrs?.["ip_address"] === void 0) session.attrs = {
			...session.attrs,
			ip_address: "{{auto}}"
		};
	} else if (session.ipAddress === void 0) session.ipAddress = "{{auto}}";
}
//#endregion
//#region node_modules/.pnpm/@sentry+core@10.65.0/node_modules/@sentry/core/build/esm/utils/sdkMetadata.js
function applySdkMetadata(options, name, names = [name], source = "npm") {
	const sdk = (options._metadata = options._metadata || {}).sdk = options._metadata.sdk || {};
	if (!sdk.name) {
		sdk.name = `sentry.javascript.${name}`;
		sdk.packages = names.map((name2) => ({
			name: `${source}:@sentry/${name2}`,
			version: SDK_VERSION
		}));
		sdk.version = SDK_VERSION;
	}
}
//#endregion
//#region node_modules/.pnpm/@sentry+core@10.65.0/node_modules/@sentry/core/build/esm/utils/array.js
function uniq(input) {
	return Array.from(new Set(input));
}
//#endregion
//#region node_modules/.pnpm/@sentry+core@10.65.0/node_modules/@sentry/core/build/esm/breadcrumbs.js
var DEFAULT_BREADCRUMBS = 100;
function addBreadcrumb(breadcrumb, hint) {
	const client = getClient();
	const isolationScope = getIsolationScope();
	if (!client) return;
	const { beforeBreadcrumb = null, maxBreadcrumbs = DEFAULT_BREADCRUMBS } = client.getOptions();
	if (maxBreadcrumbs <= 0) return;
	const mergedBreadcrumb = {
		timestamp: dateTimestampInSeconds(),
		...breadcrumb
	};
	const finalBreadcrumb = beforeBreadcrumb ? consoleSandbox(() => beforeBreadcrumb(mergedBreadcrumb, hint)) : mergedBreadcrumb;
	if (finalBreadcrumb === null) return;
	if (client.emit) client.emit("beforeAddBreadcrumb", finalBreadcrumb, hint);
	isolationScope.addBreadcrumb(finalBreadcrumb, maxBreadcrumbs);
}
//#endregion
//#region node_modules/.pnpm/@sentry+core@10.65.0/node_modules/@sentry/core/build/esm/integrations/functiontostring.js
var originalFunctionToString;
var INTEGRATION_NAME$9 = "FunctionToString";
var SETUP_CLIENTS = /* @__PURE__ */ new WeakMap();
var _functionToStringIntegration = (() => {
	return {
		name: INTEGRATION_NAME$9,
		setupOnce() {
			originalFunctionToString = Function.prototype.toString;
			try {
				Function.prototype.toString = function(...args) {
					const originalFunction = getOriginalFunction(this);
					const context = SETUP_CLIENTS.has(getClient()) && originalFunction !== void 0 ? originalFunction : this;
					return originalFunctionToString.apply(context, args);
				};
			} catch {}
		},
		setup(client) {
			SETUP_CLIENTS.set(client, true);
		}
	};
});
var functionToStringIntegration = defineIntegration(_functionToStringIntegration);
//#endregion
//#region node_modules/.pnpm/@sentry+core@10.65.0/node_modules/@sentry/core/build/esm/integrations/eventFilters.js
var DEFAULT_IGNORE_ERRORS = [
	/^Script error\.?$/,
	/^Javascript error: Script error\.? on line 0$/,
	/^ResizeObserver loop completed with undelivered notifications.$/,
	/^Cannot redefine property: googletag$/,
	/^Can't find variable: gmo$/,
	/^undefined is not an object \(evaluating 'a\.[A-Z]'\)$/,
	/can't redefine non-configurable property "solana"/,
	/vv\(\)\.getRestrictions is not a function/,
	/Can't find variable: _AutofillCallbackHandler/,
	/Object Not Found Matching Id:\d+, MethodName:simulateEvent/,
	/^Java exception was raised during method invocation$/
];
var INTEGRATION_NAME$8 = "EventFilters";
var eventFiltersIntegration = defineIntegration((options = {}) => {
	let mergedOptions;
	return {
		name: INTEGRATION_NAME$8,
		setup(client) {
			mergedOptions = _mergeOptions(options, client.getOptions());
		},
		processEvent(event, _hint, client) {
			if (!mergedOptions) mergedOptions = _mergeOptions(options, client.getOptions());
			return _shouldDropEvent$1(event, mergedOptions) ? null : event;
		}
	};
});
var inboundFiltersIntegration = defineIntegration(((options = {}) => {
	return {
		...eventFiltersIntegration(options),
		name: "InboundFilters"
	};
}));
function _mergeOptions(internalOptions = {}, clientOptions = {}) {
	return {
		allowUrls: [...internalOptions.allowUrls || [], ...clientOptions.allowUrls || []],
		denyUrls: [...internalOptions.denyUrls || [], ...clientOptions.denyUrls || []],
		ignoreErrors: [
			...internalOptions.ignoreErrors || [],
			...clientOptions.ignoreErrors || [],
			...internalOptions.disableErrorDefaults ? [] : DEFAULT_IGNORE_ERRORS
		],
		ignoreTransactions: [...internalOptions.ignoreTransactions || [], ...clientOptions.ignoreTransactions || []]
	};
}
function _shouldDropEvent$1(event, options) {
	if (!event.type) {
		if (_isIgnoredError(event, options.ignoreErrors)) {
			DEBUG_BUILD$3 && debug.warn(`Event dropped due to being matched by \`ignoreErrors\` option.
Event: ${getEventDescription(event)}`);
			return true;
		}
		if (_isUselessError(event)) {
			DEBUG_BUILD$3 && debug.warn(`Event dropped due to not having an error message, error type or stacktrace.
Event: ${getEventDescription(event)}`);
			return true;
		}
		if (_isDeniedUrl(event, options.denyUrls)) {
			DEBUG_BUILD$3 && debug.warn(`Event dropped due to being matched by \`denyUrls\` option.
Event: ${getEventDescription(event)}.
Url: ${_getEventFilterUrl(event)}`);
			return true;
		}
		if (!_isAllowedUrl(event, options.allowUrls)) {
			DEBUG_BUILD$3 && debug.warn(`Event dropped due to not being matched by \`allowUrls\` option.
Event: ${getEventDescription(event)}.
Url: ${_getEventFilterUrl(event)}`);
			return true;
		}
	} else if (event.type === "transaction") {
		if (_isIgnoredTransaction(event, options.ignoreTransactions)) {
			DEBUG_BUILD$3 && debug.warn(`Event dropped due to being matched by \`ignoreTransactions\` option.
Event: ${getEventDescription(event)}`);
			return true;
		}
	}
	return false;
}
__name(_shouldDropEvent$1, "_shouldDropEvent");
function _isIgnoredError(event, ignoreErrors) {
	if (!ignoreErrors?.length) return false;
	return getPossibleEventMessages(event).some((message) => stringMatchesSomePattern(message, ignoreErrors));
}
function _isIgnoredTransaction(event, ignoreTransactions) {
	if (!ignoreTransactions?.length) return false;
	const name = event.transaction;
	return name ? stringMatchesSomePattern(name, ignoreTransactions) : false;
}
function _isDeniedUrl(event, denyUrls) {
	if (!denyUrls?.length) return false;
	const url = _getEventFilterUrl(event);
	return !url ? false : stringMatchesSomePattern(url, denyUrls);
}
function _isAllowedUrl(event, allowUrls) {
	if (!allowUrls?.length) return true;
	const url = _getEventFilterUrl(event);
	return !url ? true : stringMatchesSomePattern(url, allowUrls);
}
function _getLastValidUrl(frames = []) {
	for (let i = frames.length - 1; i >= 0; i--) {
		const frame = frames[i];
		if (frame && frame.filename !== "<anonymous>" && frame.filename !== "[native code]") return frame.filename || null;
	}
	return null;
}
function _getEventFilterUrl(event) {
	try {
		const frames = [...event.exception?.values ?? []].reverse().find((value) => value.mechanism?.parent_id === void 0 && value.stacktrace?.frames?.length)?.stacktrace?.frames;
		return frames ? _getLastValidUrl(frames) : null;
	} catch {
		DEBUG_BUILD$3 && debug.error(`Cannot extract url for event ${getEventDescription(event)}`);
		return null;
	}
}
function _isUselessError(event) {
	if (!event.exception?.values?.length) return false;
	return !event.message && !event.exception.values.some((value) => value.stacktrace || value.type && value.type !== "Error" || value.value);
}
//#endregion
//#region node_modules/.pnpm/@sentry+core@10.65.0/node_modules/@sentry/core/build/esm/utils/aggregate-errors.js
function applyAggregateErrorsToEvent(exceptionFromErrorImplementation, parser, key, limit, event, hint) {
	if (!event.exception?.values || !hint || !isInstanceOf(hint.originalException, Error)) return;
	const originalException = event.exception.values.length > 0 ? event.exception.values[event.exception.values.length - 1] : void 0;
	if (originalException) event.exception.values = aggregateExceptionsFromError(exceptionFromErrorImplementation, parser, limit, hint.originalException, key, event.exception.values, originalException, 0);
}
function aggregateExceptionsFromError(exceptionFromErrorImplementation, parser, limit, error, key, prevExceptions, exception, exceptionId) {
	if (prevExceptions.length >= limit + 1) return prevExceptions;
	let newExceptions = [...prevExceptions];
	if (isInstanceOf(error[key], Error)) {
		applyExceptionGroupFieldsForParentException(exception, exceptionId, error);
		const newException = exceptionFromErrorImplementation(parser, error[key]);
		const newExceptionId = newExceptions.length;
		applyExceptionGroupFieldsForChildException(newException, key, newExceptionId, exceptionId);
		newExceptions = aggregateExceptionsFromError(exceptionFromErrorImplementation, parser, limit, error[key], key, [newException, ...newExceptions], newException, newExceptionId);
	}
	if (isExceptionGroup(error)) error.errors.forEach((childError, i) => {
		if (isInstanceOf(childError, Error)) {
			applyExceptionGroupFieldsForParentException(exception, exceptionId, error);
			const newException = exceptionFromErrorImplementation(parser, childError);
			const newExceptionId = newExceptions.length;
			applyExceptionGroupFieldsForChildException(newException, `errors[${i}]`, newExceptionId, exceptionId);
			newExceptions = aggregateExceptionsFromError(exceptionFromErrorImplementation, parser, limit, childError, key, [newException, ...newExceptions], newException, newExceptionId);
		}
	});
	return newExceptions;
}
function isExceptionGroup(error) {
	return Array.isArray(error.errors);
}
function applyExceptionGroupFieldsForParentException(exception, exceptionId, error) {
	exception.mechanism = {
		handled: true,
		type: "auto.core.linked_errors",
		...isExceptionGroup(error) && { is_exception_group: true },
		...exception.mechanism,
		exception_id: exceptionId
	};
}
function applyExceptionGroupFieldsForChildException(exception, source, exceptionId, parentId) {
	exception.mechanism = {
		handled: true,
		...exception.mechanism,
		type: "chained",
		source,
		exception_id: exceptionId,
		parent_id: parentId
	};
}
//#endregion
//#region node_modules/.pnpm/@sentry+core@10.65.0/node_modules/@sentry/core/build/esm/utils/eventbuilder.js
function hasSentryFetchUrlHost(error) {
	return isError(error) && "__sentry_fetch_url_host__" in error && typeof error.__sentry_fetch_url_host__ === "string";
}
function _enhanceErrorWithSentryInfo(error) {
	if (hasSentryFetchUrlHost(error)) return `${error.message} (${error.__sentry_fetch_url_host__})`;
	return error.message;
}
//#endregion
//#region node_modules/.pnpm/@sentry+core@10.65.0/node_modules/@sentry/core/build/esm/instrument/console.js
var _filter = /* @__PURE__ */ new Set([]);
function addConsoleInstrumentationHandler(handler) {
	const type = "console";
	const removeHandler = addHandler(type, handler);
	maybeInstrument(type, instrumentConsole);
	return removeHandler;
}
function instrumentConsole() {
	if (!("console" in GLOBAL_OBJ)) return;
	CONSOLE_LEVELS.forEach(function(level) {
		if (!(level in GLOBAL_OBJ.console)) return;
		fill(GLOBAL_OBJ.console, level, function(originalConsoleMethod) {
			originalConsoleMethods[level] = originalConsoleMethod;
			return function(...args) {
				const firstArg = args[0];
				const log = originalConsoleMethods[level];
				const isFiltered = _filter.size && typeof firstArg === "string" && stringMatchesSomePattern(firstArg, _filter);
				if (!isFiltered) triggerHandlers("console", {
					args,
					level
				});
				if (!isFiltered || DEBUG_BUILD$3 && debug.isEnabled()) log?.apply(GLOBAL_OBJ.console, args);
			};
		});
	});
}
//#endregion
//#region node_modules/.pnpm/@sentry+core@10.65.0/node_modules/@sentry/core/build/esm/utils/severity.js
function severityLevelFromString(level) {
	return level === "warn" ? "warning" : [
		"fatal",
		"error",
		"warning",
		"log",
		"info",
		"debug"
	].includes(level) ? level : "log";
}
//#endregion
//#region node_modules/.pnpm/@sentry+core@10.65.0/node_modules/@sentry/core/build/esm/integrations/dedupe.js
var INTEGRATION_NAME$7 = "Dedupe";
var _dedupeIntegration = (() => {
	let previousEvent;
	return {
		name: INTEGRATION_NAME$7,
		processEvent(currentEvent) {
			if (currentEvent.type) return currentEvent;
			try {
				if (_shouldDropEvent(currentEvent, previousEvent)) {
					DEBUG_BUILD$3 && debug.warn("Event dropped due to being a duplicate of previously captured event.");
					return null;
				}
			} catch {}
			return previousEvent = currentEvent;
		}
	};
});
var dedupeIntegration = defineIntegration(_dedupeIntegration);
function _shouldDropEvent(currentEvent, previousEvent) {
	if (!previousEvent) return false;
	if (_isSameMessageEvent(currentEvent, previousEvent)) return true;
	if (_isSameExceptionEvent(currentEvent, previousEvent)) return true;
	return false;
}
function _isSameMessageEvent(currentEvent, previousEvent) {
	const currentMessage = currentEvent.message;
	const previousMessage = previousEvent.message;
	if (!currentMessage && !previousMessage) return false;
	if (currentMessage && !previousMessage || !currentMessage && previousMessage) return false;
	if (currentMessage !== previousMessage) return false;
	if (!_isSameFingerprint(currentEvent, previousEvent)) return false;
	if (!_isSameStacktrace(currentEvent, previousEvent)) return false;
	return true;
}
function _isSameExceptionEvent(currentEvent, previousEvent) {
	const previousException = _getExceptionFromEvent(previousEvent);
	const currentException = _getExceptionFromEvent(currentEvent);
	if (!previousException || !currentException) return false;
	if (previousException.type !== currentException.type || previousException.value !== currentException.value) return false;
	if (!_isSameFingerprint(currentEvent, previousEvent)) return false;
	if (!_isSameStacktrace(currentEvent, previousEvent)) return false;
	return true;
}
function _isSameStacktrace(currentEvent, previousEvent) {
	let currentFrames = getFramesFromEvent(currentEvent);
	let previousFrames = getFramesFromEvent(previousEvent);
	if (!currentFrames && !previousFrames) return true;
	if (currentFrames && !previousFrames || !currentFrames && previousFrames) return false;
	currentFrames = currentFrames;
	previousFrames = previousFrames;
	if (previousFrames.length !== currentFrames.length) return false;
	for (let i = 0; i < previousFrames.length; i++) {
		const frameA = previousFrames[i];
		const frameB = currentFrames[i];
		if (frameA.filename !== frameB.filename || frameA.lineno !== frameB.lineno || frameA.colno !== frameB.colno || frameA.function !== frameB.function) return false;
	}
	return true;
}
function _isSameFingerprint(currentEvent, previousEvent) {
	let currentFingerprint = currentEvent.fingerprint;
	let previousFingerprint = previousEvent.fingerprint;
	if (!currentFingerprint && !previousFingerprint) return true;
	if (currentFingerprint && !previousFingerprint || !currentFingerprint && previousFingerprint) return false;
	currentFingerprint = currentFingerprint;
	previousFingerprint = previousFingerprint;
	try {
		return !!(currentFingerprint.join("") === previousFingerprint.join(""));
	} catch {
		return false;
	}
}
function _getExceptionFromEvent(event) {
	return event.exception?.values?.[0];
}
//#endregion
//#region node_modules/.pnpm/@sentry+core@10.65.0/node_modules/@sentry/core/build/esm/integrations/conversationId.js
var INTEGRATION_NAME$6 = "ConversationId";
var _conversationIdIntegration = (() => {
	return {
		name: INTEGRATION_NAME$6,
		setup(client) {
			client.on("spanStart", (span) => {
				const scopeData = getCurrentScope().getScopeData();
				const isolationScopeData = getIsolationScope().getScopeData();
				const conversationId = scopeData.conversationId || isolationScopeData.conversationId;
				if (conversationId) {
					const { op, data: attributes, description: name } = spanToJSON(span);
					if (!op?.startsWith("gen_ai.") && !attributes["ai.operationId"] && !name?.startsWith("ai.")) return;
					span.setAttribute(GEN_AI_CONVERSATION_ID_ATTRIBUTE, conversationId);
				}
			});
		}
	};
});
var conversationIdIntegration = defineIntegration(_conversationIdIntegration);
//#endregion
//#region node_modules/.pnpm/@sentry+core@10.65.0/node_modules/@sentry/core/build/esm/utils/breadcrumb-log-level.js
function getBreadcrumbLogLevelFromHttpStatusCode(statusCode) {
	if (statusCode === void 0) return;
	else if (statusCode >= 400 && statusCode < 500) return "warning";
	else if (statusCode >= 500) return "error";
	else return;
}
//#endregion
//#region node_modules/.pnpm/@sentry+core@10.65.0/node_modules/@sentry/core/build/esm/utils/supports.js
var WINDOW$3 = GLOBAL_OBJ;
function supportsHistory() {
	return "history" in WINDOW$3 && !!WINDOW$3.history;
}
function _isFetchSupported() {
	if (!("fetch" in WINDOW$3)) return false;
	try {
		new Headers();
		new Request("data:,");
		new Response();
		return true;
	} catch {
		return false;
	}
}
function isNativeFunction(func) {
	return func && /^function\s+\w+\(\)\s+\{\s+\[native code\]\s+\}$/.test(func.toString());
}
function supportsNativeFetch() {
	if (typeof EdgeRuntime === "string") return true;
	if (!_isFetchSupported()) return false;
	if (isNativeFunction(WINDOW$3.fetch)) return true;
	let result = false;
	const doc = WINDOW$3.document;
	if (doc && typeof doc.createElement === "function") try {
		const sandbox = doc.createElement("iframe");
		sandbox.hidden = true;
		doc.head.appendChild(sandbox);
		if (sandbox.contentWindow?.fetch) result = isNativeFunction(sandbox.contentWindow.fetch);
		doc.head.removeChild(sandbox);
	} catch (err) {
		DEBUG_BUILD$3 && debug.warn("Could not create sandbox iframe for pure fetch check, bailing to window.fetch: ", err);
	}
	return result;
}
//#endregion
//#region node_modules/.pnpm/@sentry+core@10.65.0/node_modules/@sentry/core/build/esm/instrument/fetch.js
function addFetchInstrumentationHandler(handler, skipNativeFetchCheck) {
	const type = "fetch";
	const removeHandler = addHandler(type, handler);
	maybeInstrument(type, () => instrumentFetch(void 0, skipNativeFetchCheck));
	return removeHandler;
}
function instrumentFetch(onFetchResolved, skipNativeFetchCheck = false) {
	if (skipNativeFetchCheck && !supportsNativeFetch()) return;
	fill(GLOBAL_OBJ, "fetch", function(originalFetch) {
		return function(...args) {
			const virtualError = /* @__PURE__ */ new Error();
			const { method, url } = parseFetchArgs(args);
			const handlerData = {
				args,
				fetchData: {
					method,
					url
				},
				startTimestamp: timestampInSeconds() * 1e3,
				virtualError,
				headers: getHeadersFromFetchArgs(args)
			};
			if (!onFetchResolved) triggerHandlers("fetch", { ...handlerData });
			return originalFetch.apply(GLOBAL_OBJ, args).then(async (response) => {
				if (onFetchResolved) onFetchResolved(response);
				else triggerHandlers("fetch", {
					...handlerData,
					endTimestamp: timestampInSeconds() * 1e3,
					response
				});
				return response;
			}, (error) => {
				triggerHandlers("fetch", {
					...handlerData,
					endTimestamp: timestampInSeconds() * 1e3,
					error
				});
				if (isError(error) && error.stack === void 0) {
					error.stack = virtualError.stack;
					addNonEnumerableProperty(error, "framesToPop", 1);
				}
				const enhanceOption = getClient()?.getOptions().enhanceFetchErrorMessages ?? "always";
				if (enhanceOption !== false && error instanceof TypeError && (error.message === "Failed to fetch" || error.message === "Load failed" || error.message === "NetworkError when attempting to fetch resource.")) try {
					const hostname = new URL(handlerData.fetchData.url).host;
					if (enhanceOption === "always") error.message = `${error.message} (${hostname})`;
					else addNonEnumerableProperty(error, "__sentry_fetch_url_host__", hostname);
				} catch {}
				throw error;
			});
		};
	});
}
function hasProp(obj, prop) {
	return isObjectLike(obj) && !!obj[prop];
}
function getUrlFromResource(resource) {
	if (typeof resource === "string") return resource;
	if (!resource) return "";
	if (hasProp(resource, "url")) return resource.url;
	if (resource.toString) return resource.toString();
	return "";
}
function parseFetchArgs(fetchArgs) {
	if (fetchArgs.length === 0) return {
		method: "GET",
		url: ""
	};
	if (fetchArgs.length === 2) {
		const [resource, options] = fetchArgs;
		return {
			url: getUrlFromResource(resource),
			method: hasProp(options, "method") ? String(options.method).toUpperCase() : isRequest(resource) && hasProp(resource, "method") ? String(resource.method).toUpperCase() : "GET"
		};
	}
	const arg = fetchArgs[0];
	return {
		url: getUrlFromResource(arg),
		method: hasProp(arg, "method") ? String(arg.method).toUpperCase() : "GET"
	};
}
function getHeadersFromFetchArgs(fetchArgs) {
	const [requestArgument, optionsArgument] = fetchArgs;
	try {
		if (typeof optionsArgument === "object" && optionsArgument !== null && "headers" in optionsArgument && optionsArgument.headers) return new Headers(optionsArgument.headers);
		if (isRequest(requestArgument)) return new Headers(requestArgument.headers);
	} catch {}
}
//#endregion
//#region node_modules/.pnpm/@sentry+core@10.65.0/node_modules/@sentry/core/build/esm/utils/browser.js
var WINDOW$2 = GLOBAL_OBJ;
function getLocationHref() {
	try {
		return WINDOW$2.document.location.href;
	} catch {
		return "";
	}
}
function getComponentName(elem, maxTraverseHeight = 5) {
	if (!WINDOW$2.HTMLElement) return null;
	let currentElem = elem;
	for (let i = 0; i < maxTraverseHeight; i++) {
		if (!currentElem) return null;
		if (currentElem instanceof HTMLElement) {
			if (currentElem.dataset["sentryComponent"]) return currentElem.dataset["sentryComponent"];
			if (currentElem.dataset["sentryElement"]) return currentElem.dataset["sentryElement"];
		}
		currentElem = currentElem.parentNode;
	}
	return null;
}
//#endregion
//#region node_modules/.pnpm/@sentry+browser@10.65.0/node_modules/@sentry/browser/build/npm/esm/prod/helpers.js
var WINDOW$1 = GLOBAL_OBJ;
var ignoreOnError = 0;
function shouldIgnoreOnError() {
	return ignoreOnError > 0;
}
function ignoreNextOnError() {
	ignoreOnError++;
	setTimeout(() => {
		ignoreOnError--;
	});
}
function wrap(fn, options = {}) {
	function isFunction(fn2) {
		return typeof fn2 === "function";
	}
	if (!isFunction(fn)) return fn;
	try {
		if (Object.prototype.hasOwnProperty.call(fn, "__sentry_wrapped__")) {
			const wrapper = fn.__sentry_wrapped__;
			if (typeof wrapper === "function") return wrapper;
			else return fn;
		}
		if (getOriginalFunction(fn)) return fn;
	} catch {
		return fn;
	}
	const sentryWrapped = function(...args) {
		GLOBAL_OBJ._sentryWrappedDepth = (GLOBAL_OBJ._sentryWrappedDepth || 0) + 1;
		try {
			const wrappedArguments = args.map((arg) => wrap(arg, options));
			return fn.apply(this, wrappedArguments);
		} catch (ex) {
			ignoreNextOnError();
			withScope((scope) => {
				scope.addEventProcessor((event) => {
					if (options.mechanism) {
						addExceptionTypeValue(event, void 0, void 0);
						addExceptionMechanism(event, options.mechanism);
					}
					event.extra = {
						...event.extra,
						arguments: args
					};
					return event;
				});
				captureException(ex);
			});
			throw ex;
		} finally {
			GLOBAL_OBJ._sentryWrappedDepth = (GLOBAL_OBJ._sentryWrappedDepth || 0) - 1;
		}
	};
	try {
		for (const property in fn) if (Object.prototype.hasOwnProperty.call(fn, property)) sentryWrapped[property] = fn[property];
	} catch {}
	markFunctionWrapped(sentryWrapped, fn);
	addNonEnumerableProperty(fn, "__sentry_wrapped__", sentryWrapped);
	try {
		if (Object.getOwnPropertyDescriptor(sentryWrapped, "name").configurable) Object.defineProperty(sentryWrapped, "name", { get() {
			return fn.name;
		} });
	} catch {}
	return sentryWrapped;
}
function getHttpRequestData() {
	const url = getLocationHref();
	const { referrer } = WINDOW$1.document || {};
	const { userAgent } = WINDOW$1.navigator || {};
	return {
		url,
		headers: {
			...referrer && { Referer: referrer },
			...userAgent && { "User-Agent": userAgent }
		}
	};
}
//#endregion
//#region node_modules/.pnpm/@sentry+browser@10.65.0/node_modules/@sentry/browser/build/npm/esm/prod/eventbuilder.js
function exceptionFromError(stackParser, ex) {
	const frames = parseStackFrames(stackParser, ex);
	const exception = {
		type: extractType(ex),
		value: extractMessage(ex)
	};
	if (frames.length) exception.stacktrace = { frames };
	if (exception.type === void 0 && exception.value === "") exception.value = "Unrecoverable error caught";
	return exception;
}
function eventFromPlainObject(stackParser, exception, syntheticException, isUnhandledRejection) {
	const normalizeDepth = getClient()?.getOptions().normalizeDepth;
	const errorFromProp = getErrorPropertyFromObject(exception);
	const extra = { __serialized__: normalizeToSize(exception, normalizeDepth) };
	if (errorFromProp) return {
		exception: { values: [exceptionFromError(stackParser, errorFromProp)] },
		extra
	};
	const event = {
		exception: { values: [{
			type: isEvent(exception) ? exception.constructor.name : isUnhandledRejection ? "UnhandledRejection" : "Error",
			value: getNonErrorObjectExceptionValue(exception, { isUnhandledRejection })
		}] },
		extra
	};
	if (syntheticException) {
		const frames = parseStackFrames(stackParser, syntheticException);
		if (frames.length) event.exception.values[0].stacktrace = { frames };
	}
	return event;
}
function eventFromError(stackParser, ex) {
	return { exception: { values: [exceptionFromError(stackParser, ex)] } };
}
function parseStackFrames(stackParser, ex) {
	const stacktrace = ex.stacktrace || ex.stack || "";
	const skipLines = getSkipFirstStackStringLines(ex);
	const framesToPop = getPopFirstTopFrames(ex);
	try {
		return stackParser(stacktrace, skipLines, framesToPop);
	} catch {}
	return [];
}
var reactMinifiedRegexp = /Minified React error #\d+;/i;
function getSkipFirstStackStringLines(ex) {
	if (ex && reactMinifiedRegexp.test(ex.message)) return 1;
	return 0;
}
function getPopFirstTopFrames(ex) {
	if (typeof ex.framesToPop === "number") return ex.framesToPop;
	return 0;
}
function isWebAssemblyException(exception) {
	if (typeof WebAssembly !== "undefined" && typeof WebAssembly.Exception !== "undefined") return exception instanceof WebAssembly.Exception;
	else return false;
}
function extractType(ex) {
	const name = ex?.name;
	if (!name && isWebAssemblyException(ex)) return ex.message && Array.isArray(ex.message) && ex.message.length == 2 ? ex.message[0] : "WebAssembly.Exception";
	return name;
}
function extractMessage(ex) {
	const message = ex?.message;
	if (isWebAssemblyException(ex)) {
		if (Array.isArray(ex.message) && ex.message.length == 2) return ex.message[1];
		return "wasm exception";
	}
	if (!message) return "No error message";
	if (message.error && typeof message.error.message === "string") return _enhanceErrorWithSentryInfo(message.error);
	return _enhanceErrorWithSentryInfo(ex);
}
function eventFromException(stackParser, exception, hint, attachStacktrace) {
	const event = eventFromUnknownInput(stackParser, exception, hint?.syntheticException || void 0, attachStacktrace);
	addExceptionMechanism(event);
	event.level = "error";
	if (hint?.event_id) event.event_id = hint.event_id;
	return resolvedSyncPromise(event);
}
function eventFromMessage(stackParser, message, level = "info", hint, attachStacktrace) {
	const event = eventFromString(stackParser, message, hint?.syntheticException || void 0, attachStacktrace);
	event.level = level;
	if (hint?.event_id) event.event_id = hint.event_id;
	return resolvedSyncPromise(event);
}
function eventFromUnknownInput(stackParser, exception, syntheticException, attachStacktrace, isUnhandledRejection) {
	let event;
	if (isErrorEvent$1(exception) && exception.error) return eventFromError(stackParser, exception.error);
	if (isDOMError(exception) || isDOMException(exception)) {
		const domException = exception;
		if ("stack" in exception) {
			event = eventFromError(stackParser, exception);
			const firstException = event.exception?.values?.[0];
			if (attachStacktrace && syntheticException && firstException && !firstException.stacktrace) {
				const frames = parseStackFrames(stackParser, syntheticException);
				if (frames.length) {
					firstException.stacktrace = { frames };
					addExceptionMechanism(event, { synthetic: true });
				}
			}
		} else {
			const name = domException.name || (isDOMError(domException) ? "DOMError" : "DOMException");
			const message = domException.message ? `${name}: ${domException.message}` : name;
			event = eventFromString(stackParser, message, syntheticException, attachStacktrace);
			addExceptionTypeValue(event, message);
		}
		if ("code" in domException) event.tags = {
			...event.tags,
			"DOMException.code": `${domException.code}`
		};
		return event;
	}
	if (isError(exception)) return eventFromError(stackParser, exception);
	if (isPlainObject(exception) || isEvent(exception)) {
		event = eventFromPlainObject(stackParser, exception, syntheticException, isUnhandledRejection);
		addExceptionMechanism(event, { synthetic: true });
		return event;
	}
	event = eventFromString(stackParser, exception, syntheticException, attachStacktrace);
	addExceptionTypeValue(event, `${exception}`, void 0);
	addExceptionMechanism(event, { synthetic: true });
	return event;
}
function eventFromString(stackParser, message, syntheticException, attachStacktrace) {
	const event = {};
	if (attachStacktrace && syntheticException) {
		const frames = parseStackFrames(stackParser, syntheticException);
		if (frames.length) event.exception = { values: [{
			value: message,
			stacktrace: { frames }
		}] };
		addExceptionMechanism(event, { synthetic: true });
	}
	if (isParameterizedString(message)) {
		const { __sentry_template_string__, __sentry_template_values__ } = message;
		event.logentry = {
			message: __sentry_template_string__,
			params: __sentry_template_values__
		};
		return event;
	}
	event.message = message;
	return event;
}
function getNonErrorObjectExceptionValue(exception, { isUnhandledRejection }) {
	const keys = extractExceptionKeysForMessage(exception);
	const captureType = isUnhandledRejection ? "promise rejection" : "exception";
	if (isErrorEvent$1(exception)) return `Event \`ErrorEvent\` captured as ${captureType} with message \`${exception.message}\``;
	if (isEvent(exception)) return `Event \`${getObjectClassName(exception)}\` (type=${exception.type}) captured as ${captureType}`;
	return `Object captured as ${captureType} with keys: ${keys}`;
}
function getObjectClassName(obj) {
	try {
		const prototype = Object.getPrototypeOf(obj);
		return prototype ? prototype.constructor.name : void 0;
	} catch {}
}
function getErrorPropertyFromObject(obj) {
	return Object.values(obj).find((v) => v instanceof Error);
}
//#endregion
//#region node_modules/.pnpm/@sentry+browser@10.65.0/node_modules/@sentry/browser/build/npm/esm/prod/client.js
var BrowserClient = class extends Client {
	/**
	* Creates a new Browser SDK instance.
	*
	* @param options Configuration options for this SDK.
	*/
	constructor(options) {
		const opts = applyDefaultOptions(options);
		applySdkMetadata(opts, "browser", ["browser"], WINDOW$1.SENTRY_SDK_SOURCE || getSDKSource());
		super(opts);
		const { userInfo } = this.getDataCollectionOptions();
		if (opts._metadata?.sdk) opts._metadata.sdk.settings = {
			infer_ip: userInfo ? "auto" : "never",
			...opts._metadata.sdk.settings
		};
		const { sendClientReports } = this._options;
		if (WINDOW$1.document) WINDOW$1.document.addEventListener("visibilitychange", () => {
			if (WINDOW$1.document.visibilityState === "hidden") {
				if (sendClientReports) this._flushOutcomes();
				queueMicrotask(() => {
					this.flush();
				});
			}
		});
		if (userInfo) this.on("beforeSendSession", addAutoIpAddressToSession);
	}
	/**
	* @inheritDoc
	*/
	eventFromException(exception, hint) {
		return eventFromException(this._options.stackParser, exception, hint, this._options.attachStacktrace);
	}
	/**
	* @inheritDoc
	*/
	eventFromMessage(message, level = "info", hint) {
		return eventFromMessage(this._options.stackParser, message, level, hint, this._options.attachStacktrace);
	}
	/**
	* @inheritDoc
	*/
	_prepareEvent(event, hint, currentScope, isolationScope) {
		event.platform = event.platform || "javascript";
		return super._prepareEvent(event, hint, currentScope, isolationScope);
	}
};
function applyDefaultOptions(optionsArg) {
	return {
		release: typeof __SENTRY_RELEASE__ === "string" ? __SENTRY_RELEASE__ : WINDOW$1.SENTRY_RELEASE?.id,
		sendClientReports: true,
		parentSpanIsAlwaysRootSpan: true,
		...optionsArg
	};
}
//#endregion
//#region node_modules/.pnpm/@sentry+browser-utils@10.65.0/node_modules/@sentry/browser-utils/build/esm/debug-build.js
var DEBUG_BUILD$2 = typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__;
//#endregion
//#region node_modules/.pnpm/@sentry+browser-utils@10.65.0/node_modules/@sentry/browser-utils/build/esm/types.js
var WINDOW = GLOBAL_OBJ;
//#endregion
//#region node_modules/.pnpm/@sentry+browser-utils@10.65.0/node_modules/@sentry/browser-utils/build/esm/metrics/web-vitals/lib/globalListeners.js
function addPageListener(type, listener, options) {
	if (WINDOW.document) WINDOW.addEventListener(type, listener, options);
}
function removePageListener(type, listener, options) {
	if (WINDOW.document) WINDOW.removeEventListener(type, listener, options);
}
//#endregion
//#region node_modules/.pnpm/@sentry+browser-utils@10.65.0/node_modules/@sentry/browser-utils/build/esm/metrics/web-vitals/lib/runOnce.js
var runOnce = (cb) => {
	let called = false;
	return () => {
		if (!called) {
			cb();
			called = true;
		}
	};
};
//#endregion
//#region node_modules/.pnpm/@sentry+browser-utils@10.65.0/node_modules/@sentry/browser-utils/build/esm/metrics/web-vitals/lib/whenIdleOrHidden.js
var whenIdleOrHidden = (cb) => {
	const rIC = WINDOW.requestIdleCallback || WINDOW.setTimeout;
	if (WINDOW.document?.visibilityState === "hidden") cb();
	else {
		cb = runOnce(cb);
		addPageListener("visibilitychange", cb, {
			once: true,
			capture: true
		});
		addPageListener("pagehide", cb, {
			once: true,
			capture: true
		});
		rIC(() => {
			cb();
			removePageListener("visibilitychange", cb, { capture: true });
			removePageListener("pagehide", cb, { capture: true });
		});
	}
};
//#endregion
//#region node_modules/.pnpm/@sentry+browser-utils@10.65.0/node_modules/@sentry/browser-utils/build/esm/htmlTreeAsString.js
var DEFAULT_MAX_STRING_LENGTH = 80;
var accessors = {};
try {
	if (typeof Node !== "undefined") accessors.parentNode = Object.getOwnPropertyDescriptor(Node.prototype, "parentNode").get;
	if (typeof Element !== "undefined") {
		accessors.tagName = Object.getOwnPropertyDescriptor(Element.prototype, "tagName").get;
		accessors.id = Object.getOwnPropertyDescriptor(Element.prototype, "id").get;
		accessors.className = Object.getOwnPropertyDescriptor(Element.prototype, "className").get;
		accessors.getAttribute = Element.prototype.getAttribute;
	}
	if (typeof HTMLElement !== "undefined") accessors.dataset = Object.getOwnPropertyDescriptor(HTMLElement.prototype, "dataset").get;
} catch {}
function _safeRead(el, prop, arg) {
	const fn = accessors[prop];
	if (fn) try {
		return fn.call(el, arg);
	} catch {}
	const val = el[prop];
	return typeof val === "function" ? val.call(el, arg) : val;
}
function htmlTreeAsString(elem, options = {}) {
	if (!elem) return "<unknown>";
	try {
		let currentElem = elem;
		const MAX_TRAVERSE_HEIGHT = 5;
		const out = [];
		let height = 0;
		let len = 0;
		const separator = " > ";
		const sepLength = 3;
		let nextStr;
		const keyAttrs = Array.isArray(options) ? options : options.keyAttrs;
		const maxStringLength = !Array.isArray(options) && options.maxStringLength || DEFAULT_MAX_STRING_LENGTH;
		while (currentElem && height++ < MAX_TRAVERSE_HEIGHT) {
			nextStr = _htmlElementAsString(currentElem, keyAttrs);
			if (nextStr === "html" || height > 1 && len + out.length * sepLength + nextStr.length >= maxStringLength) break;
			out.push(nextStr);
			len += nextStr.length;
			currentElem = _safeRead(currentElem, "parentNode");
		}
		return out.reverse().join(separator);
	} catch {
		return "<unknown>";
	}
}
function _htmlElementAsString(el, keyAttrs) {
	const out = [];
	const tagName = _safeRead(el, "tagName");
	if (!tagName) return "";
	if (typeof HTMLElement !== "undefined") {
		if (el instanceof HTMLElement) {
			const dataset = _safeRead(el, "dataset");
			if (dataset) {
				if (dataset["sentryComponent"]) return dataset["sentryComponent"];
				if (dataset["sentryElement"]) return dataset["sentryElement"];
			}
		}
	}
	out.push(tagName.toLowerCase());
	const keyAttrPairs = keyAttrs?.length ? keyAttrs.filter((keyAttr) => _safeRead(el, "getAttribute", keyAttr)).map((keyAttr) => [keyAttr, _safeRead(el, "getAttribute", keyAttr)]) : null;
	if (keyAttrPairs?.length) keyAttrPairs.forEach((keyAttrPair) => {
		out.push(`[${keyAttrPair[0]}="${keyAttrPair[1]}"]`);
	});
	else {
		const id = _safeRead(el, "id");
		if (id) out.push(`#${id}`);
		const className = _safeRead(el, "className");
		if (className && isString(className)) {
			const classes = className.split(/\s+/);
			for (const c of classes) out.push(`.${c}`);
		}
	}
	for (const k of [
		"aria-label",
		"type",
		"name",
		"title",
		"alt"
	]) {
		const attr = _safeRead(el, "getAttribute", k);
		if (attr) out.push(`[${k}="${attr}"]`);
	}
	return out.join("");
}
//#endregion
//#region node_modules/.pnpm/@sentry+browser-utils@10.65.0/node_modules/@sentry/browser-utils/build/esm/instrument/dom.js
var DEBOUNCE_DURATION = 1e3;
var debounceTimerID;
var lastCapturedEventType;
var lastCapturedEventTargetId;
function addClickKeypressInstrumentationHandler(handler) {
	const type = "dom";
	addHandler(type, handler);
	maybeInstrument(type, instrumentDOM);
}
function instrumentDOM() {
	if (!WINDOW.document) return;
	const triggerDOMHandler = triggerHandlers.bind(null, "dom");
	const globalDOMEventHandler = makeDOMEventHandler(triggerDOMHandler, true);
	WINDOW.document.addEventListener("click", globalDOMEventHandler, false);
	WINDOW.document.addEventListener("keypress", globalDOMEventHandler, false);
	["EventTarget", "Node"].forEach((target) => {
		const proto = WINDOW[target]?.prototype;
		if (!proto?.hasOwnProperty?.("addEventListener")) return;
		fill(proto, "addEventListener", function(originalAddEventListener) {
			return function(type, listener, options) {
				if (type === "click" || type == "keypress") try {
					const handlers = this.__sentry_instrumentation_handlers__ = this.__sentry_instrumentation_handlers__ || {};
					const handlerForType = handlers[type] = handlers[type] || { refCount: 0 };
					if (!handlerForType.handler) {
						const handler = makeDOMEventHandler(triggerDOMHandler);
						handlerForType.handler = handler;
						originalAddEventListener.call(this, type, handler, options);
					}
					handlerForType.refCount++;
				} catch {}
				return originalAddEventListener.call(this, type, listener, options);
			};
		});
		fill(proto, "removeEventListener", function(originalRemoveEventListener) {
			return function(type, listener, options) {
				if (type === "click" || type == "keypress") try {
					const handlers = this.__sentry_instrumentation_handlers__ || {};
					const handlerForType = handlers[type];
					if (handlerForType) {
						handlerForType.refCount--;
						if (handlerForType.refCount <= 0) {
							originalRemoveEventListener.call(this, type, handlerForType.handler, options);
							handlerForType.handler = void 0;
							delete handlers[type];
						}
						if (Object.keys(handlers).length === 0) delete this.__sentry_instrumentation_handlers__;
					}
				} catch {}
				return originalRemoveEventListener.call(this, type, listener, options);
			};
		});
	});
}
function isSimilarToLastCapturedEvent(event) {
	if (event.type !== lastCapturedEventType) return false;
	try {
		if (!event.target || event.target._sentryId !== lastCapturedEventTargetId) return false;
	} catch {}
	return true;
}
function shouldSkipDOMEvent(eventType, target) {
	if (eventType !== "keypress") return false;
	if (!target?.tagName) return true;
	if (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable) return false;
	return true;
}
function makeDOMEventHandler(handler, globalListener = false) {
	return (event) => {
		if (!event || event["_sentryCaptured"]) return;
		const target = getEventTarget(event);
		if (shouldSkipDOMEvent(event.type, target)) return;
		addNonEnumerableProperty(event, "_sentryCaptured", true);
		if (target && !target._sentryId) addNonEnumerableProperty(target, "_sentryId", uuid4());
		const name = event.type === "keypress" ? "input" : event.type;
		if (!isSimilarToLastCapturedEvent(event)) {
			handler({
				event,
				name,
				global: globalListener
			});
			lastCapturedEventType = event.type;
			lastCapturedEventTargetId = target ? target._sentryId : void 0;
		}
		clearTimeout(debounceTimerID);
		debounceTimerID = WINDOW.setTimeout(() => {
			lastCapturedEventTargetId = void 0;
			lastCapturedEventType = void 0;
		}, DEBOUNCE_DURATION);
	};
}
function getEventTarget(event) {
	try {
		return event.target;
	} catch {
		return null;
	}
}
//#endregion
//#region node_modules/.pnpm/@sentry+browser-utils@10.65.0/node_modules/@sentry/browser-utils/build/esm/instrument/history.js
var lastHref;
function addHistoryInstrumentationHandler(handler) {
	const type = "history";
	addHandler(type, handler);
	maybeInstrument(type, instrumentHistory);
}
function instrumentHistory() {
	WINDOW.addEventListener("popstate", () => {
		const to = WINDOW.location.href;
		const from = lastHref;
		lastHref = to;
		if (from === to) return;
		triggerHandlers("history", {
			from,
			to
		});
	});
	if (!supportsHistory()) return;
	function historyReplacementFunction(originalHistoryFunction) {
		return function(...args) {
			const url = args.length > 2 ? args[2] : void 0;
			if (url) {
				const from = lastHref;
				const to = getAbsoluteUrl(String(url));
				lastHref = to;
				if (from === to) return originalHistoryFunction.apply(this, args);
				triggerHandlers("history", {
					from,
					to
				});
			}
			return originalHistoryFunction.apply(this, args);
		};
	}
	fill(WINDOW.history, "pushState", historyReplacementFunction);
	fill(WINDOW.history, "replaceState", historyReplacementFunction);
}
function getAbsoluteUrl(urlOrPath) {
	try {
		return new URL(urlOrPath, WINDOW.location.origin).toString();
	} catch {
		return urlOrPath;
	}
}
//#endregion
//#region node_modules/.pnpm/@sentry+browser-utils@10.65.0/node_modules/@sentry/browser-utils/build/esm/getNativeImplementation.js
var cachedImplementations = {};
function getNativeImplementation(name) {
	const cached = cachedImplementations[name];
	if (cached) return cached;
	let impl = WINDOW[name];
	if (isNativeFunction(impl)) return cachedImplementations[name] = impl.bind(WINDOW);
	const document = WINDOW.document;
	if (document && typeof document.createElement === "function") try {
		const sandbox = document.createElement("iframe");
		sandbox.hidden = true;
		document.head.appendChild(sandbox);
		const contentWindow = sandbox.contentWindow;
		if (contentWindow?.[name]) impl = contentWindow[name];
		document.head.removeChild(sandbox);
	} catch (e) {
		DEBUG_BUILD$2 && debug.warn(`Could not create sandbox iframe for ${name} check, bailing to window.${name}: `, e);
	}
	if (!impl) return impl;
	return cachedImplementations[name] = impl.bind(WINDOW);
}
function clearCachedImplementation(name) {
	cachedImplementations[name] = void 0;
}
//#endregion
//#region node_modules/.pnpm/@sentry+browser-utils@10.65.0/node_modules/@sentry/browser-utils/build/esm/instrument/xhr.js
var SENTRY_XHR_DATA_KEY = "__sentry_xhr_v3__";
function addXhrInstrumentationHandler(handler) {
	const type = "xhr";
	addHandler(type, handler);
	maybeInstrument(type, instrumentXHR);
}
function instrumentXHR() {
	if (!WINDOW.XMLHttpRequest) return;
	const xhrproto = XMLHttpRequest.prototype;
	xhrproto.open = new Proxy(xhrproto.open, { apply(originalOpen, xhrOpenThisArg, xhrOpenArgArray) {
		const virtualError = /* @__PURE__ */ new Error();
		const startTimestamp = timestampInSeconds() * 1e3;
		const method = isString(xhrOpenArgArray[0]) ? xhrOpenArgArray[0].toUpperCase() : void 0;
		const url = parseXhrUrlArg(xhrOpenArgArray[1]);
		if (!method || !url) return originalOpen.apply(xhrOpenThisArg, xhrOpenArgArray);
		xhrOpenThisArg[SENTRY_XHR_DATA_KEY] = {
			method,
			url,
			request_headers: {}
		};
		if (method === "POST" && url.match(/sentry_key/)) xhrOpenThisArg.__sentry_own_request__ = true;
		const onreadystatechangeHandler = () => {
			const xhrInfo = xhrOpenThisArg[SENTRY_XHR_DATA_KEY];
			if (!xhrInfo) return;
			if (xhrOpenThisArg.readyState === 4) {
				try {
					xhrInfo.status_code = xhrOpenThisArg.status;
				} catch {}
				triggerHandlers("xhr", {
					endTimestamp: timestampInSeconds() * 1e3,
					startTimestamp,
					xhr: xhrOpenThisArg,
					virtualError
				});
			}
		};
		if ("onreadystatechange" in xhrOpenThisArg && typeof xhrOpenThisArg.onreadystatechange === "function") xhrOpenThisArg.onreadystatechange = new Proxy(xhrOpenThisArg.onreadystatechange, { apply(originalOnreadystatechange, onreadystatechangeThisArg, onreadystatechangeArgArray) {
			onreadystatechangeHandler();
			return originalOnreadystatechange.apply(onreadystatechangeThisArg, onreadystatechangeArgArray);
		} });
		else xhrOpenThisArg.addEventListener("readystatechange", onreadystatechangeHandler);
		xhrOpenThisArg.setRequestHeader = new Proxy(xhrOpenThisArg.setRequestHeader, { apply(originalSetRequestHeader, setRequestHeaderThisArg, setRequestHeaderArgArray) {
			const [header, value] = setRequestHeaderArgArray;
			const xhrInfo = setRequestHeaderThisArg[SENTRY_XHR_DATA_KEY];
			if (xhrInfo && isString(header) && isString(value)) xhrInfo.request_headers[header.toLowerCase()] = value;
			return originalSetRequestHeader.apply(setRequestHeaderThisArg, setRequestHeaderArgArray);
		} });
		return originalOpen.apply(xhrOpenThisArg, xhrOpenArgArray);
	} });
	xhrproto.send = new Proxy(xhrproto.send, { apply(originalSend, sendThisArg, sendArgArray) {
		const sentryXhrData = sendThisArg[SENTRY_XHR_DATA_KEY];
		if (!sentryXhrData) return originalSend.apply(sendThisArg, sendArgArray);
		if (sendArgArray[0] !== void 0) sentryXhrData.body = sendArgArray[0];
		triggerHandlers("xhr", {
			startTimestamp: timestampInSeconds() * 1e3,
			xhr: sendThisArg
		});
		return originalSend.apply(sendThisArg, sendArgArray);
	} });
}
function parseXhrUrlArg(url) {
	if (isString(url)) return url;
	try {
		return url.toString();
	} catch {}
}
//#endregion
//#region node_modules/.pnpm/@sentry+browser-utils@10.65.0/node_modules/@sentry/browser-utils/build/esm/is.js
function isElement(wat) {
	if (typeof Element === "undefined") return false;
	try {
		return wat instanceof Element;
	} catch {
		return false;
	}
}
//#endregion
//#region node_modules/.pnpm/@sentry+browser@10.65.0/node_modules/@sentry/browser/build/npm/esm/prod/transports/fetch.js
var DEFAULT_BROWSER_TRANSPORT_BUFFER_SIZE = 40;
function makeFetchTransport(options, nativeFetch = getNativeImplementation("fetch")) {
	let pendingBodySize = 0;
	let pendingCount = 0;
	async function makeRequest(request) {
		const requestSize = request.body.length;
		pendingBodySize += requestSize;
		pendingCount++;
		const requestOptions = {
			body: request.body,
			method: "POST",
			referrerPolicy: "strict-origin",
			headers: options.headers,
			keepalive: pendingBodySize <= 6e4 && pendingCount < 15,
			...options.fetchOptions
		};
		try {
			const response = await nativeFetch(options.url, requestOptions);
			return {
				statusCode: response.status,
				headers: {
					"x-sentry-rate-limits": response.headers.get("X-Sentry-Rate-Limits"),
					"retry-after": response.headers.get("Retry-After")
				}
			};
		} catch (e) {
			clearCachedImplementation("fetch");
			throw e;
		} finally {
			pendingBodySize -= requestSize;
			pendingCount--;
		}
	}
	return createTransport(options, makeRequest, makePromiseBuffer(options.bufferSize || DEFAULT_BROWSER_TRANSPORT_BUFFER_SIZE));
}
//#endregion
//#region node_modules/.pnpm/@sentry+browser@10.65.0/node_modules/@sentry/browser/build/npm/esm/prod/debug-build.js
var DEBUG_BUILD$1 = typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__;
//#endregion
//#region node_modules/.pnpm/@sentry+browser@10.65.0/node_modules/@sentry/browser/build/npm/esm/prod/stack-parsers.js
var CHROME_PRIORITY = 30;
var GECKO_PRIORITY = 50;
function createFrame(filename, func, lineno, colno) {
	const frame = {
		filename,
		function: func === "<anonymous>" ? "?" : func,
		in_app: true
	};
	if (lineno !== void 0) frame.lineno = lineno;
	if (colno !== void 0) frame.colno = colno;
	return frame;
}
var chromeRegexNoFnName = /^\s*at (\S+?)(?::(\d+))(?::(\d+))\s*$/i;
var chromeRegex = /^\s*at (?:(.+?\)(?: \[.+\])?|.*?) ?\((?:address at )?)?(?:async )?((?:<anonymous>|[-a-z]+:|.*bundle|\/)?.*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i;
var chromeEvalRegex = /\((\S*)(?::(\d+))(?::(\d+))\)/;
var chromeDataUriRegex = /at (.+?) ?\(data:(.+?),/;
var chromeStackParserFn = (line) => {
	const dataUriMatch = line.match(chromeDataUriRegex);
	if (dataUriMatch) return {
		filename: `<data:${dataUriMatch[2]}>`,
		function: dataUriMatch[1]
	};
	const noFnParts = chromeRegexNoFnName.exec(line);
	if (noFnParts) {
		const [, filename, line2, col] = noFnParts;
		return createFrame(filename, "?", +line2, +col);
	}
	const parts = chromeRegex.exec(line);
	if (parts) {
		if (parts[2]?.indexOf("eval") === 0) {
			const subMatch = chromeEvalRegex.exec(parts[2]);
			if (subMatch) {
				parts[2] = subMatch[1];
				parts[3] = subMatch[2];
				parts[4] = subMatch[3];
			}
		}
		const [func, filename] = extractSafariExtensionDetails(parts[1] || "?", parts[2]);
		return createFrame(filename, func, parts[3] ? +parts[3] : void 0, parts[4] ? +parts[4] : void 0);
	}
};
var chromeStackLineParser = [CHROME_PRIORITY, chromeStackParserFn];
var geckoREgex = /^\s*(.*?)(?:\((.*?)\))?(?:^|@)?((?:[-a-z]+)?:\/.*?|\[native code\]|[^@]*(?:bundle|\d+\.js)|\/[\w\-. /=]+)(?::(\d+))?(?::(\d+))?\s*$/i;
var geckoEvalRegex = /(\S+) line (\d+)(?: > eval line \d+)* > eval/i;
var gecko = (line) => {
	const parts = geckoREgex.exec(line);
	if (parts) {
		if (parts[3] && parts[3].indexOf(" > eval") > -1) {
			const subMatch = geckoEvalRegex.exec(parts[3]);
			if (subMatch) {
				parts[1] = parts[1] || "eval";
				parts[3] = subMatch[1];
				parts[4] = subMatch[2];
				parts[5] = "";
			}
		}
		let filename = parts[3];
		let func = parts[1] || "?";
		[func, filename] = extractSafariExtensionDetails(func, filename);
		return createFrame(filename, func, parts[4] ? +parts[4] : void 0, parts[5] ? +parts[5] : void 0);
	}
};
var defaultStackParser = createStackParser(...[chromeStackLineParser, [GECKO_PRIORITY, gecko]]);
var extractSafariExtensionDetails = (func, filename) => {
	const isSafariExtension = func.indexOf("safari-extension") !== -1;
	const isSafariWebExtension = func.indexOf("safari-web-extension") !== -1;
	return isSafariExtension || isSafariWebExtension ? [func.indexOf("@") !== -1 ? func.split("@")[0] : "?", isSafariExtension ? `safari-extension:${filename}` : `safari-web-extension:${filename}`] : [func, filename];
};
//#endregion
//#region node_modules/.pnpm/@sentry+browser@10.65.0/node_modules/@sentry/browser/build/npm/esm/prod/integrations/breadcrumbs.js
var MAX_ALLOWED_STRING_LENGTH = 1024;
var INTEGRATION_NAME$5 = "Breadcrumbs";
var _breadcrumbsIntegration = ((options = {}) => {
	const _options = {
		console: true,
		dom: true,
		fetch: true,
		history: true,
		sentry: true,
		xhr: true,
		...options
	};
	return {
		name: INTEGRATION_NAME$5,
		setup(client) {
			if (_options.console) addConsoleInstrumentationHandler(_getConsoleBreadcrumbHandler(client));
			if (_options.dom) addClickKeypressInstrumentationHandler(_getDomBreadcrumbHandler(client, _options.dom));
			if (_options.xhr) addXhrInstrumentationHandler(_getXhrBreadcrumbHandler(client));
			if (_options.fetch) addFetchInstrumentationHandler(_getFetchBreadcrumbHandler(client));
			if (_options.history) addHistoryInstrumentationHandler(_getHistoryBreadcrumbHandler(client));
			if (_options.sentry) client.on("beforeSendEvent", _getSentryBreadcrumbHandler(client));
		}
	};
});
var breadcrumbsIntegration = defineIntegration(_breadcrumbsIntegration);
function _getSentryBreadcrumbHandler(client) {
	return function addSentryBreadcrumb(event) {
		if (getClient() !== client) return;
		addBreadcrumb({
			category: `sentry.${event.type === "transaction" ? "transaction" : "event"}`,
			event_id: event.event_id,
			level: event.level,
			message: getEventDescription(event)
		}, { event });
	};
}
function _getDomBreadcrumbHandler(client, dom) {
	return function _innerDomBreadcrumb(handlerData) {
		if (getClient() !== client) return;
		let target;
		let componentName;
		let keyAttrs = typeof dom === "object" ? dom.serializeAttribute : void 0;
		let maxStringLength = typeof dom === "object" && typeof dom.maxStringLength === "number" ? dom.maxStringLength : void 0;
		if (maxStringLength && maxStringLength > MAX_ALLOWED_STRING_LENGTH) {
			DEBUG_BUILD$1 && debug.warn(`\`dom.maxStringLength\` cannot exceed ${MAX_ALLOWED_STRING_LENGTH}, but a value of ${maxStringLength} was configured. Sentry will use ${MAX_ALLOWED_STRING_LENGTH} instead.`);
			maxStringLength = MAX_ALLOWED_STRING_LENGTH;
		}
		if (typeof keyAttrs === "string") keyAttrs = [keyAttrs];
		try {
			const event = handlerData.event;
			const element = _isEvent(event) ? event.target : event;
			target = htmlTreeAsString(element, {
				keyAttrs,
				maxStringLength
			});
			componentName = getComponentName(element);
		} catch {
			target = "<unknown>";
		}
		if (target.length === 0) return;
		const breadcrumb = {
			category: `ui.${handlerData.name}`,
			message: target
		};
		if (componentName) breadcrumb.data = { "ui.component_name": componentName };
		addBreadcrumb(breadcrumb, {
			event: handlerData.event,
			name: handlerData.name,
			global: handlerData.global
		});
	};
}
function _getConsoleBreadcrumbHandler(client) {
	return function _consoleBreadcrumb(handlerData) {
		if (getClient() !== client) return;
		const breadcrumb = {
			category: "console",
			data: {
				arguments: handlerData.args,
				logger: "console"
			},
			level: severityLevelFromString(handlerData.level),
			message: safeJoin(handlerData.args, " ")
		};
		if (handlerData.level === "assert") {
			if (handlerData.args[0] === false) {
				breadcrumb.message = `Assertion failed: ${safeJoin(handlerData.args.slice(1), " ") || "console.assert"}`;
				breadcrumb.data.arguments = handlerData.args.slice(1);
			} else return;
		}
		addBreadcrumb(breadcrumb, {
			input: handlerData.args,
			level: handlerData.level
		});
	};
}
function _getXhrBreadcrumbHandler(client) {
	return function _xhrBreadcrumb(handlerData) {
		if (getClient() !== client) return;
		const { startTimestamp, endTimestamp } = handlerData;
		const sentryXhrData = handlerData.xhr[SENTRY_XHR_DATA_KEY];
		if (!startTimestamp || !endTimestamp || !sentryXhrData) return;
		const { method, url, status_code, body } = sentryXhrData;
		const data = {
			method,
			url,
			status_code
		};
		const hint = {
			xhr: handlerData.xhr,
			input: body,
			startTimestamp,
			endTimestamp
		};
		const breadcrumb = {
			category: "xhr",
			data,
			type: "http",
			level: getBreadcrumbLogLevelFromHttpStatusCode(status_code)
		};
		client.emit("beforeOutgoingRequestBreadcrumb", breadcrumb, hint);
		addBreadcrumb(breadcrumb, hint);
	};
}
function _getFetchBreadcrumbHandler(client) {
	return function _fetchBreadcrumb(handlerData) {
		if (getClient() !== client) return;
		const { startTimestamp, endTimestamp } = handlerData;
		if (!endTimestamp) return;
		if (handlerData.fetchData.url.match(/sentry_key/) && handlerData.fetchData.method === "POST") return;
		if (handlerData.error) {
			const hint = {
				data: handlerData.error,
				input: handlerData.args,
				startTimestamp,
				endTimestamp
			};
			const breadcrumb = {
				category: "fetch",
				data: handlerData.fetchData,
				level: "error",
				type: "http"
			};
			client.emit("beforeOutgoingRequestBreadcrumb", breadcrumb, hint);
			addBreadcrumb(breadcrumb, hint);
		} else {
			const response = handlerData.response;
			const data = {
				...handlerData.fetchData,
				status_code: response?.status
			};
			const hint = {
				input: handlerData.args,
				response,
				startTimestamp,
				endTimestamp
			};
			const breadcrumb = {
				category: "fetch",
				data,
				type: "http",
				level: getBreadcrumbLogLevelFromHttpStatusCode(data.status_code)
			};
			client.emit("beforeOutgoingRequestBreadcrumb", breadcrumb, hint);
			addBreadcrumb(breadcrumb, hint);
		}
	};
}
function _getHistoryBreadcrumbHandler(client) {
	return function _historyBreadcrumb(handlerData) {
		if (getClient() !== client) return;
		let from = handlerData.from;
		let to = handlerData.to;
		const parsedLoc = parseUrl(WINDOW$1.location.href);
		let parsedFrom = from ? parseUrl(from) : void 0;
		const parsedTo = parseUrl(to);
		if (!parsedFrom?.path) parsedFrom = parsedLoc;
		if (parsedLoc.protocol === parsedTo.protocol && parsedLoc.host === parsedTo.host) to = parsedTo.relative;
		if (parsedLoc.protocol === parsedFrom.protocol && parsedLoc.host === parsedFrom.host) from = parsedFrom.relative;
		addBreadcrumb({
			category: "navigation",
			data: {
				from,
				to
			}
		});
	};
}
function _isEvent(event) {
	return !!event && !!event.target;
}
//#endregion
//#region node_modules/.pnpm/@sentry+browser@10.65.0/node_modules/@sentry/browser/build/npm/esm/prod/integrations/browserapierrors.js
var DEFAULT_EVENT_TARGET = "EventTarget,Window,Node,ApplicationCache,AudioTrackList,BroadcastChannel,ChannelMergerNode,CryptoOperation,EventSource,FileReader,HTMLUnknownElement,IDBDatabase,IDBRequest,IDBTransaction,KeyOperation,MediaController,MessagePort,ModalWindow,Notification,SVGElementInstance,Screen,SharedWorker,TextTrack,TextTrackCue,TextTrackList,WebSocket,WebSocketWorker,Worker,XMLHttpRequest,XMLHttpRequestEventTarget,XMLHttpRequestUpload".split(",");
var INTEGRATION_NAME$4 = "BrowserApiErrors";
var _browserApiErrorsIntegration = ((options = {}) => {
	const _options = {
		XMLHttpRequest: true,
		eventTarget: true,
		requestAnimationFrame: true,
		setInterval: true,
		setTimeout: true,
		unregisterOriginalCallbacks: false,
		...options
	};
	return {
		name: INTEGRATION_NAME$4,
		setupOnce() {
			if (_options.setTimeout) fill(WINDOW$1, "setTimeout", _wrapTimeFunction);
			if (_options.setInterval) fill(WINDOW$1, "setInterval", _wrapTimeFunction);
			if (_options.requestAnimationFrame) fill(WINDOW$1, "requestAnimationFrame", _wrapRAF);
			if (_options.XMLHttpRequest && "XMLHttpRequest" in WINDOW$1) fill(XMLHttpRequest.prototype, "send", _wrapXHR);
			const eventTargetOption = _options.eventTarget;
			if (eventTargetOption) (Array.isArray(eventTargetOption) ? eventTargetOption : DEFAULT_EVENT_TARGET).forEach((target) => _wrapEventTarget(target, _options));
		}
	};
});
var browserApiErrorsIntegration = defineIntegration(_browserApiErrorsIntegration);
function _wrapTimeFunction(original) {
	return function(...args) {
		const originalCallback = args[0];
		args[0] = wrap(originalCallback, { mechanism: {
			handled: false,
			type: `auto.browser.browserapierrors.${getFunctionName(original)}`
		} });
		return original.apply(this, args);
	};
}
function _wrapRAF(original) {
	return function(callback) {
		return original.apply(this, [wrap(callback, { mechanism: {
			data: { handler: getFunctionName(original) },
			handled: false,
			type: "auto.browser.browserapierrors.requestAnimationFrame"
		} })]);
	};
}
function _wrapXHR(originalSend) {
	return function(...args) {
		const xhr = this;
		[
			"onload",
			"onerror",
			"onprogress",
			"onreadystatechange"
		].forEach((prop) => {
			if (prop in xhr && typeof xhr[prop] === "function") fill(xhr, prop, function(original) {
				const wrapOptions = { mechanism: {
					data: { handler: getFunctionName(original) },
					handled: false,
					type: `auto.browser.browserapierrors.xhr.${prop}`
				} };
				const originalFunction = getOriginalFunction(original);
				if (originalFunction) wrapOptions.mechanism.data.handler = getFunctionName(originalFunction);
				return wrap(original, wrapOptions);
			});
		});
		return originalSend.apply(this, args);
	};
}
function _wrapEventTarget(target, integrationOptions) {
	const proto = WINDOW$1[target]?.prototype;
	if (!proto?.hasOwnProperty?.("addEventListener")) return;
	fill(proto, "addEventListener", function(original) {
		return function(eventName, fn, options) {
			try {
				if (isEventListenerObject(fn)) fn.handleEvent = wrap(fn.handleEvent, { mechanism: {
					data: {
						handler: getFunctionName(fn),
						target
					},
					handled: false,
					type: "auto.browser.browserapierrors.handleEvent"
				} });
			} catch {}
			if (integrationOptions.unregisterOriginalCallbacks) unregisterOriginalCallback(this, eventName, fn);
			return original.apply(this, [
				eventName,
				wrap(fn, { mechanism: {
					data: {
						handler: getFunctionName(fn),
						target
					},
					handled: false,
					type: "auto.browser.browserapierrors.addEventListener"
				} }),
				options
			]);
		};
	});
	fill(proto, "removeEventListener", function(originalRemoveEventListener) {
		return function(eventName, fn, options) {
			try {
				if (Object.prototype.hasOwnProperty.call(fn, "__sentry_wrapped__")) {
					const originalEventHandler = fn.__sentry_wrapped__;
					if (originalEventHandler) originalRemoveEventListener.call(this, eventName, originalEventHandler, options);
				}
			} catch {}
			return originalRemoveEventListener.call(this, eventName, fn, options);
		};
	});
}
function isEventListenerObject(obj) {
	return typeof obj.handleEvent === "function";
}
function unregisterOriginalCallback(target, eventName, fn) {
	if (target && typeof target === "object" && "removeEventListener" in target && typeof target.removeEventListener === "function") target.removeEventListener(eventName, fn);
}
//#endregion
//#region node_modules/.pnpm/@sentry+browser@10.65.0/node_modules/@sentry/browser/build/npm/esm/prod/integrations/browsersession.js
var browserSessionIntegration = defineIntegration((options = {}) => {
	const lifecycle = options.lifecycle ?? "route";
	return {
		name: "BrowserSession",
		setupOnce() {
			if (typeof WINDOW$1.document === "undefined") {
				DEBUG_BUILD$1 && debug.warn("Using the `browserSessionIntegration` in non-browser environments is not supported.");
				return;
			}
			startSession({ ignoreDuration: true });
			let initialSessionSent = false;
			whenIdleOrHidden(() => {
				if (!initialSessionSent) {
					captureSession();
					initialSessionSent = true;
				}
			});
			const isolationScope = getIsolationScope();
			let previousUser = isolationScope.getUser();
			isolationScope.addScopeListener((scope) => {
				const maybeNewUser = scope.getUser();
				if (previousUser?.id !== maybeNewUser?.id || previousUser?.ip_address !== maybeNewUser?.ip_address) {
					previousUser = maybeNewUser;
					if (initialSessionSent) captureSession();
				}
			});
			if (lifecycle === "route") addHistoryInstrumentationHandler(({ from, to }) => {
				if (from !== to) {
					startSession({ ignoreDuration: true });
					captureSession();
					initialSessionSent = true;
				}
			});
		}
	};
});
//#endregion
//#region node_modules/.pnpm/@sentry+browser@10.65.0/node_modules/@sentry/browser/build/npm/esm/prod/integrations/culturecontext.js
var INTEGRATION_NAME$3 = "CultureContext";
var _cultureContextIntegration = (() => {
	return {
		name: INTEGRATION_NAME$3,
		preprocessEvent(event) {
			const culture = getCultureContext();
			if (culture) event.contexts = {
				...event.contexts,
				culture: {
					...culture,
					...event.contexts?.culture
				}
			};
		},
		processSegmentSpan(span) {
			const culture = getCultureContext();
			if (culture) safeSetSpanJSONAttributes(span, {
				"culture.locale": culture.locale,
				"culture.timezone": culture.timezone,
				"culture.calendar": culture.calendar
			});
		}
	};
});
var cultureContextIntegration = defineIntegration(_cultureContextIntegration);
function getCultureContext() {
	try {
		const intl = WINDOW$1.Intl;
		if (!intl) return;
		const options = intl.DateTimeFormat().resolvedOptions();
		return {
			locale: options.locale,
			timezone: options.timeZone,
			calendar: options.calendar
		};
	} catch {
		return;
	}
}
//#endregion
//#region node_modules/.pnpm/@sentry+browser@10.65.0/node_modules/@sentry/browser/build/npm/esm/prod/integrations/globalhandlers.js
var INTEGRATION_NAME$2 = "GlobalHandlers";
var _globalHandlersIntegration = ((options = {}) => {
	const _options = {
		onerror: true,
		onunhandledrejection: true,
		...options
	};
	return {
		name: INTEGRATION_NAME$2,
		setupOnce() {
			Error.stackTraceLimit = 50;
		},
		setup(client) {
			if (_options.onerror) {
				_installGlobalOnErrorHandler(client);
				globalHandlerLog("onerror");
			}
			if (_options.onunhandledrejection) {
				_installGlobalOnUnhandledRejectionHandler(client);
				globalHandlerLog("onunhandledrejection");
			}
		}
	};
});
var globalHandlersIntegration = defineIntegration(_globalHandlersIntegration);
function _installGlobalOnErrorHandler(client) {
	addGlobalErrorInstrumentationHandler((data) => {
		const { stackParser, attachStacktrace } = getOptions();
		if (getClient() !== client || shouldIgnoreOnError()) return;
		const { msg, url, line, column, error } = data;
		const event = _enhanceEventWithInitialFrame(eventFromUnknownInput(stackParser, error || msg, void 0, attachStacktrace, false), url, line, column);
		event.level = "error";
		captureEvent(event, {
			originalException: error,
			mechanism: {
				handled: false,
				type: "auto.browser.global_handlers.onerror"
			}
		});
	});
}
function _installGlobalOnUnhandledRejectionHandler(client) {
	addGlobalUnhandledRejectionInstrumentationHandler((e) => {
		const { stackParser, attachStacktrace } = getOptions();
		if (getClient() !== client || shouldIgnoreOnError()) return;
		const error = _getUnhandledRejectionError(e);
		const event = isPrimitive(error) ? _eventFromRejectionWithPrimitive(error) : eventFromUnknownInput(stackParser, error, void 0, attachStacktrace, true);
		event.level = "error";
		captureEvent(event, {
			originalException: error,
			mechanism: {
				handled: false,
				type: "auto.browser.global_handlers.onunhandledrejection"
			}
		});
	});
}
function _getUnhandledRejectionError(error) {
	if (isPrimitive(error)) return error;
	try {
		if ("reason" in error) return error.reason;
		if ("detail" in error && "reason" in error.detail) return error.detail.reason;
	} catch {}
	return error;
}
function _eventFromRejectionWithPrimitive(reason) {
	return { exception: { values: [{
		type: "UnhandledRejection",
		value: `Non-Error promise rejection captured with value: ${String(reason)}`
	}] } };
}
function _enhanceEventWithInitialFrame(event, url, lineno, colno) {
	const e = event.exception = event.exception || {};
	const ev = e.values = e.values || [];
	const ev0 = ev[0] = ev[0] || {};
	const ev0s = ev0.stacktrace = ev0.stacktrace || {};
	const ev0sf = ev0s.frames = ev0s.frames || [];
	if (ev0sf.length === 0) ev0sf.push({
		colno,
		lineno,
		filename: getFilenameFromUrl(url) ?? getLocationHref(),
		function: "?",
		in_app: true
	});
	return event;
}
function globalHandlerLog(type) {
	DEBUG_BUILD$1 && debug.log(`Global Handler attached: ${type}`);
}
function getOptions() {
	return getClient()?.getOptions() || {
		stackParser: () => [],
		attachStacktrace: false
	};
}
function getFilenameFromUrl(url) {
	if (!isString(url) || url.length === 0) return;
	if (url.startsWith("data:")) return `<${stripDataUrlContent(url, false)}>`;
	return url;
}
//#endregion
//#region node_modules/.pnpm/@sentry+browser@10.65.0/node_modules/@sentry/browser/build/npm/esm/prod/integrations/httpcontext.js
var httpContextIntegration = defineIntegration(() => {
	return {
		name: "HttpContext",
		preprocessEvent(event) {
			if (!WINDOW$1.navigator && !WINDOW$1.location && !WINDOW$1.document) return;
			const reqData = getHttpRequestData();
			const headers = {
				...reqData.headers,
				...event.request?.headers
			};
			event.request = {
				...reqData,
				...event.request,
				headers
			};
		},
		processSegmentSpan(span) {
			const spanOp = span.attributes?.[SEMANTIC_ATTRIBUTE_SENTRY_OP];
			if (!WINDOW$1.navigator && !WINDOW$1.location && !WINDOW$1.document) return;
			const reqData = getHttpRequestData();
			safeSetSpanJSONAttributes(span, {
				"url.full": spanOp !== "http.client" ? reqData.url : void 0,
				"http.request.header.user_agent": reqData.headers["User-Agent"],
				"http.request.header.referer": reqData.headers["Referer"]
			});
		}
	};
});
//#endregion
//#region node_modules/.pnpm/@sentry+browser@10.65.0/node_modules/@sentry/browser/build/npm/esm/prod/integrations/linkederrors.js
var DEFAULT_KEY = "cause";
var DEFAULT_LIMIT = 5;
var INTEGRATION_NAME$1 = "LinkedErrors";
var _linkedErrorsIntegration = ((options = {}) => {
	const limit = options.limit || DEFAULT_LIMIT;
	const key = options.key || DEFAULT_KEY;
	return {
		name: INTEGRATION_NAME$1,
		preprocessEvent(event, hint, client) {
			applyAggregateErrorsToEvent(exceptionFromError, client.getOptions().stackParser, key, limit, event, hint);
		}
	};
});
var linkedErrorsIntegration = defineIntegration(_linkedErrorsIntegration);
//#endregion
//#region node_modules/.pnpm/@sentry+browser@10.65.0/node_modules/@sentry/browser/build/npm/esm/prod/normalizeStringifyValue.js
var HTML_ELEMENT_CONSTRUCTOR_NAME_REGEX = /^HTML(\w*)Element$/;
function normalizeStringifyValue$1(value) {
	if (typeof window !== "undefined" && value === window) return "[Window]";
	if (typeof document !== "undefined" && value === document) return "[Document]";
	if (isElement(value)) {
		const objName = getConstructorName(value);
		if (HTML_ELEMENT_CONSTRUCTOR_NAME_REGEX.test(objName)) return `[HTMLElement: ${htmlTreeAsString(value)}]`;
	}
}
__name(normalizeStringifyValue$1, "normalizeStringifyValue");
function getConstructorName(value) {
	const prototype = Object.getPrototypeOf(value);
	return prototype?.constructor ? prototype.constructor.name : "null prototype";
}
//#endregion
//#region node_modules/.pnpm/@sentry+browser@10.65.0/node_modules/@sentry/browser/build/npm/esm/prod/utils/detectBrowserExtension.js
function checkAndWarnIfIsEmbeddedBrowserExtension() {
	if (_isEmbeddedBrowserExtension()) {
		if (DEBUG_BUILD$1) consoleSandbox(() => {
			console.error("[Sentry] You cannot use Sentry.init() in a browser extension, see: https://docs.sentry.io/platforms/javascript/best-practices/browser-extensions/");
		});
		return true;
	}
	return false;
}
function _isEmbeddedBrowserExtension() {
	if (typeof WINDOW$1.window === "undefined") return false;
	const _window = WINDOW$1;
	if (_window.nw) return false;
	if (!(_window["chrome"] || _window["browser"])?.runtime?.id) return false;
	const href = getLocationHref();
	return !(WINDOW$1 === WINDOW$1.top && /^(?:chrome-extension|moz-extension|ms-browser-extension|safari-web-extension):\/\//.test(href));
}
//#endregion
//#region node_modules/.pnpm/@sentry+browser@10.65.0/node_modules/@sentry/browser/build/npm/esm/prod/sdk.js
function getDefaultIntegrations(_options) {
	return [
		inboundFiltersIntegration(),
		functionToStringIntegration(),
		conversationIdIntegration(),
		browserApiErrorsIntegration(),
		breadcrumbsIntegration(),
		globalHandlersIntegration(),
		linkedErrorsIntegration(),
		dedupeIntegration(),
		httpContextIntegration(),
		cultureContextIntegration(),
		browserSessionIntegration()
	];
}
function init$1(options = {}) {
	const shouldDisableBecauseIsBrowserExtenstion = !options.skipBrowserExtensionCheck && checkAndWarnIfIsEmbeddedBrowserExtension();
	let defaultIntegrations = options.defaultIntegrations == null ? getDefaultIntegrations() : options.defaultIntegrations;
	const clientOptions = {
		...options,
		enabled: shouldDisableBecauseIsBrowserExtenstion ? false : options.enabled,
		stackParser: stackParserFromStackParserOptions(options.stackParser || defaultStackParser),
		integrations: getIntegrationsToSetup({
			integrations: options.integrations,
			defaultIntegrations
		}),
		transport: options.transport || makeFetchTransport
	};
	setNormalizeStringifier(normalizeStringifyValue$1);
	return initAndBind(BrowserClient, clientOptions);
}
__name(init$1, "init");
//#endregion
//#region node_modules/.pnpm/@sentry+vue@10.65.0_pinia@4.0.2_@vue+devtools-api@8.1.5_typescript@6.0.3_vue@3.5.42_typ_70406bd38360d4a8a9995d8002bd743e/node_modules/@sentry/vue/build/esm/constants.js
var DEFAULT_HOOKS = ["activate", "mount"];
//#endregion
//#region node_modules/.pnpm/@sentry+vue@10.65.0_pinia@4.0.2_@vue+devtools-api@8.1.5_typescript@6.0.3_vue@3.5.42_typ_70406bd38360d4a8a9995d8002bd743e/node_modules/@sentry/vue/build/esm/debug-build.js
var DEBUG_BUILD = typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__;
//#endregion
//#region node_modules/.pnpm/@sentry+vue@10.65.0_pinia@4.0.2_@vue+devtools-api@8.1.5_typescript@6.0.3_vue@3.5.42_typ_70406bd38360d4a8a9995d8002bd743e/node_modules/@sentry/vue/build/esm/vendor/components.js
var classifyRE = /(?:^|[-_])(\w)/g;
var classify = (str) => str.replace(classifyRE, (c) => c.toUpperCase()).replace(/[-_]/g, "");
var ROOT_COMPONENT_NAME = "<Root>";
var ANONYMOUS_COMPONENT_NAME = "<Anonymous>";
var repeat = (str, n) => {
	return str.repeat(n);
};
var formatComponentName = (vm, includeFile) => {
	if (!vm) return ANONYMOUS_COMPONENT_NAME;
	if (vm.$root === vm) return ROOT_COMPONENT_NAME;
	if (!vm.$options) return ANONYMOUS_COMPONENT_NAME;
	const options = vm.$options;
	let name = options.name || options._componentTag || options.__name;
	const file = options.__file;
	if (!name && file) {
		const match = file.match(/([^/\\]+)\.vue$/);
		if (match) name = match[1];
	}
	return (name ? `<${classify(name)}>` : ANONYMOUS_COMPONENT_NAME) + (file && includeFile !== false ? ` at ${file}` : "");
};
var generateComponentTrace = (vm) => {
	if (vm && (vm._isVue || vm.__isVue) && vm.$parent) {
		const tree = [];
		let currentRecursiveSequence = 0;
		while (vm) {
			if (tree.length > 0) {
				const last = tree[tree.length - 1];
				if (last.constructor === vm.constructor) {
					currentRecursiveSequence++;
					vm = vm.$parent;
					continue;
				} else if (currentRecursiveSequence > 0) {
					tree[tree.length - 1] = [last, currentRecursiveSequence];
					currentRecursiveSequence = 0;
				}
			}
			tree.push(vm);
			vm = vm.$parent;
		}
		return `

found in

${tree.map((vm2, i) => `${(i === 0 ? "---> " : repeat(" ", 5 + i * 2)) + (Array.isArray(vm2) ? `${formatComponentName(vm2[0])}... (${vm2[1]} recursive calls)` : formatComponentName(vm2))}`).join("\n")}`;
	}
	return `

(found in ${formatComponentName(vm)})`;
};
//#endregion
//#region node_modules/.pnpm/@sentry+vue@10.65.0_pinia@4.0.2_@vue+devtools-api@8.1.5_typescript@6.0.3_vue@3.5.42_typ_70406bd38360d4a8a9995d8002bd743e/node_modules/@sentry/vue/build/esm/errorhandler.js
var attachErrorHandler = (app, options) => {
	const { errorHandler: originalErrorHandler } = app.config;
	app.config.errorHandler = (error, vm, lifecycleHook) => {
		const metadata = {
			componentName: formatComponentName(vm, false),
			lifecycleHook,
			trace: vm ? generateComponentTrace(vm) : ""
		};
		if (options?.attachProps !== false && vm) {
			if (vm.$options?.propsData) metadata.propsData = vm.$options.propsData;
			else if (vm.$props) metadata.propsData = vm.$props;
		}
		setTimeout(() => {
			captureException(error, {
				captureContext: { contexts: { vue: metadata } },
				mechanism: {
					handled: !!originalErrorHandler,
					type: "auto.function.vue.error_handler"
				}
			});
		});
		if (typeof originalErrorHandler === "function" && app.config.errorHandler) originalErrorHandler.call(app, error, vm, lifecycleHook);
		else throw error;
	};
};
//#endregion
//#region node_modules/.pnpm/@sentry+vue@10.65.0_pinia@4.0.2_@vue+devtools-api@8.1.5_typescript@6.0.3_vue@3.5.42_typ_70406bd38360d4a8a9995d8002bd743e/node_modules/@sentry/vue/build/esm/tracing.js
var VUE_OP = "ui.vue";
var HOOKS = {
	activate: ["activated", "deactivated"],
	create: ["beforeCreate", "created"],
	unmount: ["beforeUnmount", "unmounted"],
	destroy: ["beforeDestroy", "destroyed"],
	mount: ["beforeMount", "mounted"],
	update: ["beforeUpdate", "updated"]
};
function maybeEndRootComponentSpan(vm, timestamp, timeout) {
	if (vm.$_sentryRootComponentSpanTimer) clearTimeout(vm.$_sentryRootComponentSpanTimer);
	vm.$_sentryRootComponentSpanTimer = setTimeout(() => {
		if (vm.$root?.$_sentryRootComponentSpan) {
			vm.$root.$_sentryRootComponentSpan.end(timestamp);
			vm.$root.$_sentryRootComponentSpan = void 0;
		}
	}, timeout);
}
function findTrackComponent(trackComponents, formattedName) {
	function extractComponentName(name) {
		return name.replace(/^<([^\s]*)>(?: at [^\s]*)?$/, "$1");
	}
	return trackComponents.some((compo) => {
		return extractComponentName(formattedName) === extractComponentName(compo);
	});
}
var createTracingMixins = (options = {}) => {
	const hooks = uniq((options.hooks || []).concat(DEFAULT_HOOKS));
	const mixins = {};
	const rootComponentSpanFinalTimeout = options.timeout || 2e3;
	for (const operation of hooks) {
		const internalHooks = HOOKS[operation];
		if (!internalHooks) {
			DEBUG_BUILD && debug.warn(`Unknown hook: ${operation}`);
			continue;
		}
		for (const internalHook of internalHooks) mixins[internalHook] = function() {
			const isRootComponent = this.$root === this;
			if (isRootComponent) {
				this.$_sentryRootComponentSpan = this.$_sentryRootComponentSpan || startInactiveSpan({
					name: "Application Render",
					op: `${VUE_OP}.render`,
					attributes: { ["sentry.origin"]: "auto.ui.vue" },
					onlyIfParent: true
				});
				maybeEndRootComponentSpan(this, timestampInSeconds(), rootComponentSpanFinalTimeout);
			}
			const componentName = formatComponentName(this, false);
			if (!(isRootComponent || (Array.isArray(options.trackComponents) ? findTrackComponent(options.trackComponents, componentName) : options.trackComponents))) {
				maybeEndRootComponentSpan(this, timestampInSeconds(), rootComponentSpanFinalTimeout);
				return;
			}
			this.$_sentryComponentSpans = this.$_sentryComponentSpans || {};
			const isBeforeHook = internalHook === internalHooks[0];
			const activeSpan = this.$root?.$_sentryRootComponentSpan || getActiveSpan();
			if (isBeforeHook) {
				if (activeSpan) {
					const oldSpan = this.$_sentryComponentSpans[operation];
					if (oldSpan) oldSpan.end();
					this.$_sentryComponentSpans[operation] = startInactiveSpan({
						name: `Vue ${componentName}`,
						op: `${VUE_OP}.${operation}`,
						attributes: { [SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: "auto.ui.vue" },
						onlyIfParent: true
					});
				}
			} else {
				const span = this.$_sentryComponentSpans[operation];
				if (!span) return;
				span.end();
				maybeEndRootComponentSpan(this, timestampInSeconds(), rootComponentSpanFinalTimeout);
			}
		};
	}
	return mixins;
};
//#endregion
//#region node_modules/.pnpm/@sentry+vue@10.65.0_pinia@4.0.2_@vue+devtools-api@8.1.5_typescript@6.0.3_vue@3.5.42_typ_70406bd38360d4a8a9995d8002bd743e/node_modules/@sentry/vue/build/esm/integration.js
var DEFAULT_CONFIG = {
	Vue: GLOBAL_OBJ.Vue,
	attachProps: true,
	attachErrorHandler: true,
	tracingOptions: {
		hooks: DEFAULT_HOOKS,
		timeout: 2e3,
		trackComponents: false
	}
};
var INTEGRATION_NAME = "Vue";
var vueIntegration = defineIntegration((integrationOptions = {}) => {
	return {
		name: INTEGRATION_NAME,
		setup(client) {
			const options = {
				...DEFAULT_CONFIG,
				...client.getOptions(),
				...integrationOptions
			};
			if (!options.Vue && !options.app) {
				consoleSandbox(() => {
					console.warn("[@sentry/vue]: Misconfigured SDK. Vue specific errors will not be captured. Update your `Sentry.init` call with an appropriate config option: `app` (Application Instance - Vue 3) or `Vue` (Vue Constructor - Vue 2).");
				});
				return;
			}
			if (options.app) (Array.isArray(options.app) ? options.app : [options.app]).forEach((app) => vueInit(app, options));
			else if (options.Vue) vueInit(options.Vue, options);
		}
	};
});
var vueInit = (app, options) => {
	if (DEBUG_BUILD) {
		if (app._instance?.isMounted === true) consoleSandbox(() => {
			console.warn("[@sentry/vue]: Misconfigured SDK. Vue app is already mounted. Make sure to call `app.mount()` after `Sentry.init()`.");
		});
	}
	if (options.attachErrorHandler) attachErrorHandler(app, options);
	if (hasSpansEnabled(options)) app.mixin(createTracingMixins(options.tracingOptions));
};
//#endregion
//#region node_modules/.pnpm/@sentry+vue@10.65.0_pinia@4.0.2_@vue+devtools-api@8.1.5_typescript@6.0.3_vue@3.5.42_typ_70406bd38360d4a8a9995d8002bd743e/node_modules/@sentry/vue/build/esm/normalizeStringifyValue.js
function isVueViewModel(wat) {
	return !!(typeof wat === "object" && wat && (wat.__isVue || wat._isVue));
}
function isVNode(wat) {
	return !!(typeof wat === "object" && wat?.__v_isVNode);
}
function normalizeStringifyValue(value) {
	if (isVueViewModel(value)) return "[VueViewModel]";
	if (isVNode(value)) return "[VueVNode]";
	return normalizeStringifyValue$1(value);
}
//#endregion
//#region node_modules/.pnpm/@sentry+vue@10.65.0_pinia@4.0.2_@vue+devtools-api@8.1.5_typescript@6.0.3_vue@3.5.42_typ_70406bd38360d4a8a9995d8002bd743e/node_modules/@sentry/vue/build/esm/sdk.js
function init(options = {}) {
	const opts = {
		defaultIntegrations: [...getDefaultIntegrations(options), vueIntegration()],
		...options
	};
	applySdkMetadata(opts, "vue");
	const client = init$1(opts);
	setNormalizeStringifier(normalizeStringifyValue);
	return client;
}
//#endregion
export { captureException as a, addBreadcrumb as i, browserApiErrorsIntegration as n, captureMessage as o, eventFiltersIntegration as r, isEnabled as s, init as t };
