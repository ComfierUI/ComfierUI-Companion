import "./rolldown-runtime-xtsTai4I.js";
import { Bt as shallowRef, P as computed } from "./vendor-vue-core-C1utdb0s.js";
//#region src/platform/auth/desktopHost/desktopHostSession.ts
var session = shallowRef({ status: "inactive" });
var bridge;
var unsubscribe;
/** Bumped on every session change, so a reply that raced one is dropped. */
var revision = 0;
function toSession(state) {
	if (state.status === "disabled") return { status: "inactive" };
	if (state.status === "signed_out") return { status: "signed_out" };
	const { userId, email, workspaceId } = state;
	return {
		status: "signed_in",
		user: {
			id: userId,
			email,
			workspaceId
		}
	};
}
function apply(state) {
	const next = toSession(state);
	if (next.status === "inactive") {
		stopDesktopHostSession();
		return;
	}
	revision++;
	session.value = next;
}
/** The Desktop account signed in to this view, or null. */
var desktopHostUser = computed(() => session.value.status === "signed_in" ? session.value.user : null);
/** True while Desktop shares its session with this view, signed in or not. */
function isDesktopHostSessionActive() {
	return session.value.status !== "inactive";
}
/** True while a Desktop account is signed in; only then does it own auth. */
function isDesktopHostSignedIn() {
	return desktopHostUser.value !== null;
}
/**
* Makes the Desktop account the identity for this page when Desktop shares
* its session. Stays inactive, leaving Firebase in charge, when Desktop
* answers `disabled` or the bridge fails.
*/
async function startDesktopHostSession(hostBridge) {
	stopDesktopHostSession();
	bridge = hostBridge;
	try {
		unsubscribe = hostBridge.onChanged(apply);
		const before = revision;
		const initial = await hostBridge.getState();
		if (bridge === hostBridge && revision === before) apply(initial);
	} catch {
		if (bridge === hostBridge) stopDesktopHostSession();
	}
}
function stopDesktopHostSession() {
	unsubscribe?.();
	unsubscribe = void 0;
	bridge = void 0;
	revision++;
	session.value = { status: "inactive" };
}
/**
* Desktop's credential for `workspaceId`, released only when its session is
* scoped to exactly that workspace. This is the API-node credential.
*/
function desktopHostWorkspaceToken(workspaceId) {
	return fetchToken((current) => current.getWorkspaceToken(workspaceId));
}
async function fetchToken(read) {
	const current = bridge;
	if (!current || session.value.status !== "signed_in") return void 0;
	const before = revision;
	const token = await read(current).catch(() => null);
	return revision === before ? token ?? void 0 : void 0;
}
/** Runs Desktop's browser sign-in. Resolves true when it ends signed in. */
async function requestDesktopHostSignIn() {
	const current = bridge;
	if (!current) return false;
	const before = revision;
	const next = await current.requestSignIn().catch(() => void 0);
	if (next && bridge === current && revision === before) apply(next);
	return desktopHostUser.value !== null;
}
/** Signs Desktop out of its account. Resolves true once no Desktop user remains. */
async function requestDesktopHostSignOut() {
	const current = bridge;
	if (!current) return true;
	const before = revision;
	const next = await current.signOut().catch(() => void 0);
	if (next && bridge === current && revision === before) apply(next);
	return desktopHostUser.value === null;
}
//#endregion
export { requestDesktopHostSignIn as a, stopDesktopHostSession as c, isDesktopHostSignedIn as i, desktopHostWorkspaceToken as n, requestDesktopHostSignOut as o, isDesktopHostSessionActive as r, startDesktopHostSession as s, desktopHostUser as t };
