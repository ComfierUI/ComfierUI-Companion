import "./rolldown-runtime-xtsTai4I.js";
//#region src/platform/cloud/oauth/oauthState.ts
var OAUTH_REQUEST_ID_STORAGE_KEY = "Comfy.OAuthRequestId";
var UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-7][0-9a-f]{3}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
function readQueryString(value) {
	return typeof value === "string" ? value : null;
}
function isOAuthRequestId(value) {
	return UUID_PATTERN.test(value);
}
function captureOAuthRequestId(query) {
	const raw = query.oauth_request_id;
	const value = readQueryString(raw);
	if (!value) {
		if (raw !== void 0) sessionStorage.removeItem(OAUTH_REQUEST_ID_STORAGE_KEY);
		return null;
	}
	if (!isOAuthRequestId(value)) {
		sessionStorage.removeItem(OAUTH_REQUEST_ID_STORAGE_KEY);
		return null;
	}
	sessionStorage.setItem(OAUTH_REQUEST_ID_STORAGE_KEY, value);
	return value;
}
function getOAuthRequestId() {
	const value = sessionStorage.getItem(OAUTH_REQUEST_ID_STORAGE_KEY);
	return value && isOAuthRequestId(value) ? value : null;
}
function clearOAuthRequestId() {
	sessionStorage.removeItem(OAUTH_REQUEST_ID_STORAGE_KEY);
}
//#endregion
export { clearOAuthRequestId as n, getOAuthRequestId as r, captureOAuthRequestId as t };
