import "./rolldown-runtime-xtsTai4I.js";
import { V as timedSignal } from "./api-Bt-fGt5a.js";
import { E as zErrorResponse, T as zDiscoverSsoResponse, w as zDiscoverSsoBody } from "./zod.gen-C09SPgBJ.js";
//#region packages/account-core/src/redirect.ts
/** True if the string contains any C0 control char the URL parser would strip. */
function hasControlChar(value) {
	for (let i = 0; i < value.length; i++) if (value.charCodeAt(i) <= 31) return true;
	return false;
}
/**
* Where a visitor may be sent after sign-in. Only a same-origin absolute
* path qualifies; anything that could leave the origin (a protocol-relative
* or backslash prefix, an absolute or javascript: URL, or a path hiding one
* of those behind a stripped control char) falls back.
*
* The prefix checks alone are not enough: the WHATWG URL parser strips C0
* control chars (tab, LF, CR) before parsing, so `/<TAB>//evil.com` passes a
* literal `startsWith('//')` check yet the browser resolves it cross-origin.
* So a control char is rejected outright, and the result is re-parsed against
* the origin to confirm it truly stays same-origin.
*/
function safeInternalPath(raw, origin, fallback) {
	if (typeof raw !== "string" || !raw.startsWith("/") || raw.startsWith("//") || raw.startsWith("/\\") || hasControlChar(raw)) return fallback;
	try {
		const resolved = new URL(raw, origin);
		if (resolved.origin !== origin) return fallback;
		return resolved.pathname + resolved.search + resolved.hash;
	} catch {
		return fallback;
	}
}
//#endregion
//#region packages/account-core/src/sso.ts
var SSO_DISCOVER_PATH = "/api/auth/sso/discover";
var SSO_START_PATH = "/api/auth/sso/start";
var DEFAULT_DISCOVER_TIMEOUT_MS = 5e3;
function fromResponse(body) {
	if (!body.sso) return { kind: "not-sso" };
	return body.organization_name === void 0 ? { kind: "sso" } : {
		kind: "sso",
		organizationName: body.organization_name
	};
}
async function readJson(response) {
	try {
		return await response.json();
	} catch {
		return;
	}
}
function classify(status, body) {
	if (status === 200) {
		const parsed = zDiscoverSsoResponse.safeParse(body);
		return parsed.success ? fromResponse(parsed.data) : { kind: "unavailable" };
	}
	const error = zErrorResponse.safeParse(body);
	return status === 400 && error.success && error.data.code === "INVALID_EMAIL" ? { kind: "invalid-email" } : { kind: "unavailable" };
}
/**
* Whether an email signs in through its organization's SSO. Never throws: a
* network failure, timeout, unexpected status or unreadable body is
* `unavailable`, so a caller can fall back to its usual sign-in.
*/
async function discoverSso(email, options) {
	const request = zDiscoverSsoBody.safeParse({ email: email.trim() });
	if (!request.success || request.data.email === "") return { kind: "invalid-email" };
	const { signal, release } = timedSignal(options.signal, options.timeoutMs ?? DEFAULT_DISCOVER_TIMEOUT_MS);
	try {
		const response = await options.fetchImpl(`${options.baseUrl ?? ""}${SSO_DISCOVER_PATH}`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(request.data),
			signal
		});
		return classify(response.status, await readJson(response));
	} catch {
		return { kind: "unavailable" };
	} finally {
		release();
	}
}
/**
* Ingest sends API routes back to `/`: they refuse a cross-site navigation,
* so the person would land on an error. Anything off-origin goes there too.
*/
function ssoReturnTo(raw, origin) {
	const path = safeInternalPath(raw, origin, "/");
	const pathname = new URL(path, origin).pathname.toLowerCase();
	return pathname === "/api" || pathname.startsWith("/api/") ? "/" : path;
}
/**
* Where the browser goes to sign in with SSO. Ingest answers with a redirect
* to the identity provider, so this is for a full-page navigation, never a
* fetch.
*/
function ssoStartUrl(options) {
	const url = new URL(SSO_START_PATH, options.origin);
	if (options.email !== void 0) url.searchParams.set("email", options.email.trim());
	if (options.organizationId !== void 0) url.searchParams.set("organization", options.organizationId);
	url.searchParams.set("return_to", ssoReturnTo(options.returnTo, options.origin));
	return url.toString();
}
var KNOWN_SSO_ERRORS = /* @__PURE__ */ new Set([
	"INTERNAL_ERROR",
	"RATE_LIMITED",
	"SESSION_CREATION_FAILED",
	"SSO_ACCOUNT_CONFLICT",
	"SSO_ACCOUNT_DELETED",
	"SSO_CONFIRM_EXPIRED",
	"SSO_EMAIL_DOMAIN_NOT_ALLOWED",
	"SSO_EXCHANGE_FAILED",
	"SSO_IDP_ERROR",
	"SSO_INVALID_STATE",
	"SSO_LINK_CHECK_FAILED",
	"SSO_NOT_CONFIGURED",
	"SSO_ORG_DISABLED",
	"SSO_ORG_MISMATCH",
	"SSO_ORG_NOT_ATTACHED",
	"SSO_SIGN_IN_FAILED",
	"SSO_UNAVAILABLE",
	"SSO_USER_SUSPENDED"
]);
function isSsoErrorCode(value) {
	return KNOWN_SSO_ERRORS.has(value);
}
/**
* Reads an `?sso_error=` query value. Absent is undefined; a code this build
* predates reads as a generic sign-in failure, so it still gets a message.
*/
function readSsoError(value) {
	const raw = Array.isArray(value) ? value[0] : value;
	if (typeof raw !== "string" || raw === "") return void 0;
	return isSsoErrorCode(raw) ? raw : "SSO_SIGN_IN_FAILED";
}
//#endregion
//#region src/platform/cloud/onboarding/sso/ssoEntryQuery.ts
/** The login page query that opens it on its SSO entry. */
var SSO_ENTRY_OPEN_QUERY = { sso: "open" };
//#endregion
export { safeInternalPath as a, ssoStartUrl as i, discoverSso as n, readSsoError as r, SSO_ENTRY_OPEN_QUERY as t };
