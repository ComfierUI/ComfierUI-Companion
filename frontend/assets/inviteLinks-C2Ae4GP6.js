import "./rolldown-runtime-xtsTai4I.js";
import { cu as PRESERVED_QUERY_NAMESPACES } from "./layoutStore-CZsuzg91.js";
import { n as reportError } from "./reportError-LG-zfbNw.js";
//#region src/platform/workspace/utils/inviteLinks.ts
/**
* Helpers for the shareable per-invite links (DES-1010).
*
* The app accepts workspace invites via the `?invite=TOKEN` query param
* (see useInviteUrlLoader), which is the same URL shape the invite emails
* link to. Links are email-bound on the backend: only the invited address
* can accept, so sharing a link over any channel is safe.
*/
/** Builds the user-facing invite URL for a pending invite's token. */
function buildInviteLink(token) {
	const url = new URL(window.location.origin);
	url.searchParams.set(PRESERVED_QUERY_NAMESPACES.INVITE, token);
	return url.toString();
}
/** Formats invite links for a bulk copy: one `email<TAB>url` pair per line. */
function formatInviteLinksForCopy(rows) {
	if (rows.length === 1) return rows[0].url;
	return rows.map(({ email, url }) => `${email}\t${url}`).join("\n");
}
/**
* Copies text to the clipboard with no built-in user feedback — each caller
* owns its own affordance (inline label swap in the dialog, a toast on the
* pending tab). Returns whether the copy succeeded.
*/
async function copyTextSilently(text) {
	try {
		await navigator.clipboard.writeText(text);
		return true;
	} catch {
		const el = document.createElement("textarea");
		el.value = text;
		el.style.position = "fixed";
		el.style.opacity = "0";
		document.body.appendChild(el);
		try {
			el.select();
			const copied = document.execCommand("copy");
			if (!copied) reportError(/* @__PURE__ */ new Error("execCommand copy reported failure"), {
				errorType: "error_copying_invite_link",
				surface: "workspace"
			});
			return copied;
		} catch (error) {
			reportError(error, {
				errorType: "error_copying_invite_link",
				surface: "workspace"
			});
			return false;
		} finally {
			el.remove();
		}
	}
}
//#endregion
export { copyTextSilently as n, formatInviteLinksForCopy as r, buildInviteLink as t };
