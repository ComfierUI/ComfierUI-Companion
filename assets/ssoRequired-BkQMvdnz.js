const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./SsoRequiredDialogContent-Do90MVF9.js","./rolldown-runtime-xtsTai4I.js","./vendor-vue-core-C1utdb0s.js","./layoutStore-CZsuzg91.js","./vendor-datadog-DudeEV66.js","./vendor-other-BPEcPQTD.js","./vendor-three-DQpYrwAh.js","./vendor-zod-TMj9Wsdv.js","./vendor-tiptap-BT_4t92m.js","./requestAuth-YeU5GIXc.js","./vendor-vueuse-BxKIIsKg.js","./telemetry-IkzvF0TI.js","./api-Bt-fGt5a.js","./zod.gen-C09SPgBJ.js","./vendor-axios-QnwcNXlY.js","./vendor-sentry-zSXGkMPN.js","./reportError-LG-zfbNw.js","./hostTelemetryEnabled-BZ3GL1Cu.js","./remoteConfig-DwMQrLli.js","./vendor-firebase-B37L--zT.js","./toastStore-CTfykAzG.js","./types-t0xJOOCt.js","./desktopHostSession-IrokPizE.js","./vendor-i18n-BZvE7WBQ.js","./i18n-C3J-ToPr.js","./formatUtil-DuxXRy1z.js","./commands-BcZ6fU3-.js","./main-BfqkkuXX.js","./nodeDefs-CFOSmIZi.js","./settings-B3DInspu.js","./comfyApi-CYSC9hA6.js","./types-ColLjFnz.js","./useFeatureFlags-DAoj_aDd.js","./dialog.variants-PsJk1wgr.js","./dialogStore-B0GYyals.js","./DialogPortal-B3D-ZhO6.js","./vendor-reka-ui-tdehH9A1.js","./src-DI1bBfrb.js","./Button-j0oCzR82.js","./refreshRemoteConfig-D9UzqP0h.js","./vendor-primevue-C3d0HJ53.js","./systemStatsStore-3gc4cifl.js","./useImageQuiet-Ded8W_Zd.js","./vendor-markdown-CtxqRwKg.js","./useModalLiftedZIndex-BuehUvPe.js","./NumberFieldInput-CILJZ6M6.js","./colorUtil-BzdMMd-Y.js","./vendor-yjs-D9X62SBd.js","./markdownRendererUtil-6g3t5X63.js","./downloadUtil-Bysc7OZ_.js","./SingleSelect-CS2DGZzk.js","./widgetTypes-CisWqKm9.js","./Switch-BAw3-YcG.js","./Input-Cx8jjgHK.js","./SelectValue-BYMnIcxq.js","./Loader-CwKhrtFX.js","./_plugin-vue_export-helper-DEKQMRQ4.js","./creditsUtil-BWj6bywK.js","./useExternalLink-CXT6uu6Z.js","./envUtil-2Z8ainL3.js","./ssoEntryQuery-MCHmpE9w.js","./vendor-other-DODGPXtn.css","./layoutStore-Nbgrgm8u.css"])))=>i.map(i=>d[i]);
import "./rolldown-runtime-xtsTai4I.js";
import { a as __vitePreload } from "./vendor-datadog-DudeEV66.js";
import { jt as omitBy } from "./vendor-other-BPEcPQTD.js";
import { X as ssoRequiredOrganizationId, Y as isSsoRequiredRefusal } from "./api-Bt-fGt5a.js";
import { n as reportError } from "./reportError-LG-zfbNw.js";
import { t as useToastStore } from "./toastStore-CTfykAzG.js";
import { d as t } from "./i18n-C3J-ToPr.js";
import { t as useFeatureFlags } from "./useFeatureFlags-DAoj_aDd.js";
import { n as SELF_STYLED_PANEL_CONTENT_CLASS } from "./dialog.variants-PsJk1wgr.js";
import { t as useDialogStore } from "./dialogStore-B0GYyals.js";
//#region src/platform/auth/sso/ssoRequiredDialogKey.ts
var SSO_REQUIRED_DIALOG_KEY = "sso-required";
//#endregion
//#region src/platform/auth/sso/ssoRequired.ts
/**
* Shows the one SSO-required screen. False while `sso_enabled` is off, so the
* caller keeps the handling it has today. Several refusals can land at once;
* a later caller only adds what it knows, so a request seam without context
* never erases the email the sign-in page passed. A refusal always answers the
* organization, so one that names none clears an earlier one.
*/
function presentSsoRequired(context = {}) {
	if (!useFeatureFlags().flags.ssoEnabled) return false;
	const dialogStore = useDialogStore();
	const known = {
		...omitBy(context, (value) => value === void 0),
		..."organizationId" in context && { organizationId: context.organizationId }
	};
	__vitePreload(async () => {
		const { default: component } = await import("./SsoRequiredDialogContent-Do90MVF9.js");
		return { default: component };
	}, __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62]), import.meta.url).then(({ default: component }) => {
		if (dialogStore.isDialogOpen("sso-required")) {
			dialogStore.updateDialog({
				key: SSO_REQUIRED_DIALOG_KEY,
				contentProps: known
			});
			return;
		}
		dialogStore.showDialog({
			key: SSO_REQUIRED_DIALOG_KEY,
			component,
			props: known,
			dialogComponentProps: {
				renderer: "reka",
				headless: true,
				contentClass: SELF_STYLED_PANEL_CONTENT_CLASS
			}
		});
	}).catch((error) => {
		reportError(error, {
			surface: "auth",
			errorType: "failure_loading_sso_required_dialog"
		});
		useToastStore().add({
			severity: "error",
			summary: t("auth.sso.required.title"),
			detail: t("auth.sso.required.body")
		});
	});
	return true;
}
function presentForRefusal(status, body) {
	return isSsoRequiredRefusal(status, body) && presentSsoRequired({ organizationId: ssoRequiredOrganizationId(body) });
}
/** Reads a clone, and only of a 403 while `sso_enabled` is on. */
async function presentForResponse(response) {
	if (response.status !== 403 || !useFeatureFlags().flags.ssoEnabled) return false;
	const body = await response.clone().json().catch(() => void 0);
	return presentForRefusal(response.status, body);
}
//#endregion
export { SSO_REQUIRED_DIALOG_KEY as i, presentForResponse as n, presentSsoRequired as r, presentForRefusal as t };
