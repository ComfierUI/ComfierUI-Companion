import "./rolldown-runtime-xtsTai4I.js";
import { t as datadogRum } from "./vendor-datadog-DudeEV66.js";
import { a as captureException, s as isEnabled } from "./vendor-sentry-zSXGkMPN.js";
import { t as isHostTelemetryEnabled } from "./hostTelemetryEnabled-BZ3GL1Cu.js";
//#region packages/shared-frontend-utils/src/telemetry.ts
/**
* Marks the console line a reporter writes for every report. RUM collects
* `console.error` on its own, so `isRumErrorNoise` matches on this to drop the
* untagged console copy of a failure RUM already received tagged.
*/
var REPORTED_ERROR_PREFIX = "[Reported error]: ";
var EXTENSION_ERROR_MESSAGES = ["Invalid call to runtime.sendMessage(). Tab not found.", "[messaging] In this JS context, only one listener can be setup for"];
var ERROR_MESSAGE_PREFIX = /^(?:Unhandled promise rejection:\s*)?(?:Error:\s*)?$/;
function isThirdPartyErrorNoise(message) {
	if (!message) return false;
	return EXTENSION_ERROR_MESSAGES.some((known) => {
		const index = message.indexOf(known);
		return index >= 0 && ERROR_MESSAGE_PREFIX.test(message.slice(0, index));
	});
}
//#endregion
//#region src/utils/errorUtil.ts
/**
* Narrow an unknown caught value to an Error.
*
* Replaces unsafe `value as Error` assertions. When `value` is not already
* an Error instance, wraps it in a new Error whose message is the stringified
* input so downstream consumers (loggers, Sentry, toasts) always receive a
* usable Error object instead of `undefined.message`.
*/
function toError(value) {
	if (value instanceof Error) return value;
	if (typeof value === "string") return new Error(value);
	if (value === void 0) return /* @__PURE__ */ new Error("undefined");
	try {
		const serialised = JSON.stringify(value);
		return new Error(serialised);
	} catch {
		return new Error(String(value));
	}
}
/**
* Extract a message from an unknown caught value without asserting its type.
* Returns `undefined` when the value carries no usable message.
*/
function getErrorMessage(value) {
	if (value instanceof Error) return value.message;
	if (typeof value === "string") return value;
	if (typeof value === "object" && value !== null && "message" in value && typeof value.message === "string") return value.message;
}
//#endregion
//#region src/platform/telemetry/reportError.ts
var NO_DELIVERY = {
	sentry: false,
	datadog: false,
	desktop: false
};
/**
* Reports raised before any sink is live are held here rather than dropped.
* On cloud, Datadog RUM arrives behind `initTelemetry()`'s dynamic imports, so
* its delivery remains pending even when Sentry received the report first.
*/
var pendingReports = [];
var MAX_PENDING_REPORTS = 25;
var reportedErrors = /* @__PURE__ */ new WeakSet();
var isDatadogRumLive = () => datadogRum.getInitConfiguration() !== void 0;
var definedEntriesOf = (values) => Object.fromEntries(Object.entries(values ?? {}).filter((entry) => entry[1] !== void 0));
/** Written from `options`, so a caller tag of the same name never lands. */
var RESERVED_TAG_KEYS = /* @__PURE__ */ new Set([
	"error_type",
	"level",
	"surface"
]);
var dispatching = false;
var definedTagsOf = (tags) => Object.fromEntries(Object.entries(tags ?? {}).filter((entry) => {
	const [key, value] = entry;
	return !RESERVED_TAG_KEYS.has(key) && (typeof value === "string" || typeof value === "number" || typeof value === "boolean");
}));
function desktopExceptionSink() {
	if (!isHostTelemetryEnabled()) return;
	const telemetry = window.__comfyDesktop2?.Telemetry;
	if (!telemetry || typeof telemetry !== "object") return;
	if (!("captureException" in telemetry)) return;
	const capture = telemetry.captureException;
	if (typeof capture !== "function") return;
	return (error, properties) => {
		Reflect.apply(capture, telemetry, [error, properties]);
	};
}
function dispatchToDesktop(error, errorType, surface, tags, level) {
	try {
		const capture = desktopExceptionSink();
		if (!capture) return false;
		capture({
			message: error.message,
			...error.stack ? { stack: error.stack } : {}
		}, {
			...tags,
			error_type: errorType,
			surface,
			...level ? { level } : {}
		});
		return true;
	} catch (reporterFailure) {
		console.error("[reportError] Desktop delivery failed", reporterFailure, error);
		return false;
	}
}
function dispatch(error, options, alreadyDelivered = NO_DELIVERY) {
	const { errorType, surface, level } = options;
	const context = definedEntriesOf(options.context);
	const tags = definedTagsOf(options.tags);
	const sentryLive = !alreadyDelivered.sentry && isEnabled();
	const datadogLive = !alreadyDelivered.datadog && isDatadogRumLive();
	let sentryDelivered = alreadyDelivered.sentry;
	let datadogDelivered = alreadyDelivered.datadog;
	let desktopDelivered = alreadyDelivered.desktop;
	dispatching = true;
	try {
		if (sentryLive) try {
			captureException(error, {
				tags: {
					...tags,
					error_type: errorType,
					surface
				},
				extra: context,
				level
			});
			sentryDelivered = true;
		} catch (reporterFailure) {
			console.error("[reportError] Sentry delivery failed", reporterFailure, error);
		}
		if (datadogLive) try {
			const datadogError = Object.assign(new Error(error.message, { cause: error.cause }), error, {
				name: errorType,
				stack: error.stack
			});
			datadogRum.addError(datadogError, {
				...context,
				...tags,
				error_type: errorType,
				surface,
				...level ? { level } : {}
			});
			datadogDelivered = true;
		} catch (reporterFailure) {
			console.error("[reportError] Datadog delivery failed", reporterFailure, error);
		}
	} finally {
		dispatching = false;
	}
	if (!desktopDelivered) desktopDelivered = dispatchToDesktop(error, errorType, surface, tags, level);
	return {
		sentry: sentryDelivered,
		datadog: datadogDelivered,
		desktop: desktopDelivered
	};
}
function enqueuePendingReport(report) {
	if (pendingReports.length < MAX_PENDING_REPORTS) pendingReports.push(report);
}
/**
* Cloud wants the report in both of its own sinks and never has the Desktop
* bridge, so `desktop` stays out of that branch — holding for a sink that
* cannot arrive would pend every cloud report forever.
*
* Off cloud, Datadog RUM is gated on a comfy.org hostname it never sees on
* Desktop, so a report the bridge accepted has to retire on that alone or the
* buffer stays permanently full and every later report re-drains it.
*/
function isPending(delivered) {
	return !delivered.sentry && !delivered.datadog && !delivered.desktop;
}
/**
* A probe, not a delivery: `isHostTelemetryEnabled()` reads `localStorage` and
* the bridge lookup touches an Electron context that can be revoked, and both
* throw where `flushErrorReports()` promises not to.
*/
function hasLiveSink() {
	try {
		return isEnabled() || isDatadogRumLive() || !!desktopExceptionSink();
	} catch (probeFailure) {
		console.error("[reportError] sink probe failed", probeFailure);
		return false;
	}
}
/**
* Drains reports buffered before a sink came up. Safe to call repeatedly;
* a no-op while every sink is still inert.
*
* Callers are `main.ts` and `bootstrap.ts` on the boot path, so this must
* never throw: a sink that explodes here would take the whole app down
* instead of the one report it failed to deliver.
*/
function flushErrorReports() {
	if (!pendingReports.length) return;
	if (!hasLiveSink()) return;
	const drained = pendingReports.splice(0, pendingReports.length);
	for (const report of drained) {
		const { error, options } = report;
		try {
			const delivered = dispatch(error, options, report.delivered);
			if (isPending(delivered)) enqueuePendingReport({
				error,
				options,
				delivered
			});
		} catch (reporterFailure) {
			enqueuePendingReport(report);
			console.error("[reportError] failed to flush", reporterFailure, error);
		}
	}
}
function logReport(cause, options, suffix = "") {
	if (options.logToConsole === false) return;
	(options.level === "warning" ? console.warn : console.error)(`${REPORTED_ERROR_PREFIX}${options.errorType}${suffix}`, cause);
}
/**
* Report an error to every observability sink at once.
*
* Prefer this to calling `captureException` or `datadogRum.addError`
* directly: a raw `captureException` reaches Sentry only, which is how
* `workspace_auth_gate_initialization_failure` stayed invisible on every
* Datadog dashboard while it was firing in production.
*
* Also writes the failure to the console, so callers never pair this with a
* `console.error` of their own: Sentry is off in DEV, RUM only comes up behind
* `initTelemetry()`, and a caller that forgot the pair went silent on dev and
* self-hosted installs.
*
* A report raised while a sink is still delivering only reaches the console.
*
* Never throws — a failing error reporter must not become a second failure.
*/
function reportError(cause, options) {
	try {
		if (cause instanceof Error && reportedErrors.has(cause)) return;
		if (dispatching) {
			logReport(cause, options, " (suppressed: raised while reporting)");
			return;
		}
		logReport(cause, options);
		flushErrorReports();
		const error = toError(cause);
		const delivered = dispatch(error, options);
		if (isPending(delivered)) enqueuePendingReport({
			error,
			options,
			delivered
		});
	} catch (reporterFailure) {
		console.error("[reportError] failed to report", reporterFailure, cause);
	}
}
//#endregion
export { isThirdPartyErrorNoise as a, toError as i, reportError as n, getErrorMessage as r, flushErrorReports as t };
