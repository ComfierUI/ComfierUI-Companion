import "./rolldown-runtime-xtsTai4I.js";
import { Pt as onScopeDispose } from "./vendor-vue-core-C1utdb0s.js";
import { or as useAuthActions } from "./layoutStore-CZsuzg91.js";
import { n as reportError } from "./reportError-LG-zfbNw.js";
//#region packages/account-core/src/webviewDetection.ts
var SOCIAL_APP_PATTERNS = /FBAN|FBAV|Instagram|Line\/|Snapchat|TikTok|musical_ly/i;
var IOS_FIRST_PARTY_BROWSER_PATTERNS = /CriOS|FxiOS|OPiOS|EdgiOS/i;
function isAndroidWebView(ua) {
	return /\bwv\b/.test(ua) && /Android/.test(ua);
}
function isIOSWebView(ua) {
	if (!/AppleWebKit/i.test(ua)) return false;
	if (/Safari\//i.test(ua)) return false;
	if (IOS_FIRST_PARTY_BROWSER_PATTERNS.test(ua)) return false;
	return true;
}
function isSocialAppBrowser(ua) {
	return SOCIAL_APP_PATTERNS.test(ua);
}
function isFirstPartyIOSBrowser(ua) {
	if (IOS_FIRST_PARTY_BROWSER_PATTERNS.test(ua)) return true;
	if (!/iPhone|iPad|iPod|Macintosh.*Mobile\//i.test(ua)) return false;
	return /Safari\//i.test(ua) && /Version\//i.test(ua);
}
function hasWkWebViewMessageBridge() {
	try {
		const win = globalThis;
		return typeof win.webkit === "object" && win.webkit !== null && typeof win.webkit.messageHandlers === "object";
	} catch {
		return false;
	}
}
function hasReactNativeWebViewBridge() {
	try {
		return globalThis.ReactNativeWebView != null;
	} catch {
		return false;
	}
}
/**
* Whether the page runs inside an app's embedded browser, where Google's
* popup sign-in is blocked. Both hosts show the same notice on that answer.
*/
function isEmbeddedWebView(ua = navigator.userAgent) {
	if (isSocialAppBrowser(ua)) return true;
	if (isAndroidWebView(ua)) return true;
	if (isIOSWebView(ua)) return true;
	if (hasReactNativeWebViewBridge()) return true;
	if (!isFirstPartyIOSBrowser(ua) && hasWkWebViewMessageBridge()) return true;
	return false;
}
//#endregion
//#region src/platform/auth/social/useSocialSignIn.ts
/**
* Google and GitHub sign-in for a page or dialog. A popup the visitor closes
* fails at once like any other failure; if its result still arrives, it
* finishes as a sign-in of its own, but only while this scope is alive and no
* newer sign-in has started from it.
*/
function useSocialSignIn(options) {
	const authActions = useAuthActions();
	let alive = true;
	onScopeDispose(() => {
		alive = false;
	});
	let latest = 0;
	/** `undefined` from the provider means useAuthActions already toasted the failure. */
	async function signInWith(provider, resumed) {
		const attempt = ++latest;
		const wanted = () => alive && attempt === latest;
		if (await provider({
			isNewUser: options.isNewUser(),
			resumed,
			popup: {
				onResumed: (credential) => {
					signInWith(provider, credential).catch((error) => reportError(error, {
						surface: "auth",
						errorType: "auth_late_sign_in_failed"
					}));
				},
				keepLateResult: wanted
			}
		}) && wanted()) await options.onSignedIn();
	}
	return {
		signInWithGoogle: () => signInWith(authActions.signInWithGoogle),
		signInWithGithub: () => signInWith(authActions.signInWithGithub)
	};
}
//#endregion
export { isEmbeddedWebView as n, useSocialSignIn as t };
