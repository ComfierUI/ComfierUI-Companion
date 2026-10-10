import "./rolldown-runtime-xtsTai4I.js";
import "./layoutStore-CZsuzg91.js";
import "./api-Bt-fGt5a.js";
import "./reportError-LG-zfbNw.js";
import "./useFeatureFlags-DAoj_aDd.js";
Promise.resolve();
/**
* Session cookie management for cloud authentication.
* Creates and deletes session cookies on the ComfyUI server.
*/
var useSessionCookie = () => {
	const ensureSessionCookie = async () => {};
	const createSession = async () => {};
	/** After an interactive sign-in: whether ingest refused its session for SSO. */
	const sessionRequiresSso = async () => {
		return false;
	};
	const createSessionOrThrow = async () => {};
	/**
	* Deletes the session cookie.
	* Called on logout.
	*/
	const deleteSession = async () => {};
	return {
		createSession,
		createSessionOrThrow,
		sessionRequiresSso,
		ensureSessionCookie,
		deleteSession
	};
};
//#endregion
export { useSessionCookie as t };
