const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./useSessionCookie-B1w4dEt1.js","./useSessionCookie-brPafxdw.js","./rolldown-runtime-xtsTai4I.js","./layoutStore-CZsuzg91.js","./vendor-datadog-DudeEV66.js","./vendor-other-BPEcPQTD.js","./vendor-three-DQpYrwAh.js","./vendor-vue-core-C1utdb0s.js","./vendor-zod-TMj9Wsdv.js","./vendor-tiptap-BT_4t92m.js","./requestAuth-YeU5GIXc.js","./vendor-vueuse-BxKIIsKg.js","./telemetry-IkzvF0TI.js","./api-Bt-fGt5a.js","./zod.gen-C09SPgBJ.js","./vendor-axios-QnwcNXlY.js","./vendor-sentry-zSXGkMPN.js","./reportError-LG-zfbNw.js","./hostTelemetryEnabled-BZ3GL1Cu.js","./remoteConfig-DwMQrLli.js","./vendor-firebase-B37L--zT.js","./toastStore-CTfykAzG.js","./types-t0xJOOCt.js","./desktopHostSession-IrokPizE.js","./vendor-i18n-BZvE7WBQ.js","./i18n-C3J-ToPr.js","./formatUtil-DuxXRy1z.js","./commands-BcZ6fU3-.js","./main-BfqkkuXX.js","./nodeDefs-CFOSmIZi.js","./settings-B3DInspu.js","./comfyApi-CYSC9hA6.js","./types-ColLjFnz.js","./useFeatureFlags-DAoj_aDd.js","./dialog.variants-PsJk1wgr.js","./ssoRequired-BkQMvdnz.js","./dialogStore-B0GYyals.js","./DialogPortal-B3D-ZhO6.js","./vendor-reka-ui-tdehH9A1.js","./src-DI1bBfrb.js","./Button-j0oCzR82.js","./refreshRemoteConfig-D9UzqP0h.js","./vendor-primevue-C3d0HJ53.js","./systemStatsStore-3gc4cifl.js","./useImageQuiet-Ded8W_Zd.js","./vendor-markdown-CtxqRwKg.js","./useModalLiftedZIndex-BuehUvPe.js","./NumberFieldInput-CILJZ6M6.js","./colorUtil-BzdMMd-Y.js","./vendor-yjs-D9X62SBd.js","./markdownRendererUtil-6g3t5X63.js","./downloadUtil-Bysc7OZ_.js","./SingleSelect-CS2DGZzk.js","./widgetTypes-CisWqKm9.js","./Switch-BAw3-YcG.js","./Input-Cx8jjgHK.js","./SelectValue-BYMnIcxq.js","./Loader-CwKhrtFX.js","./_plugin-vue_export-helper-DEKQMRQ4.js","./creditsUtil-BWj6bywK.js","./useExternalLink-CXT6uu6Z.js","./envUtil-2Z8ainL3.js","./vendor-other-DODGPXtn.css","./layoutStore-Nbgrgm8u.css","./CloudLayoutView-Dvd97OiM.js","./GlobalToast-Dbc5NM-L.js","./CloudLayoutView-Bza0qZSB.css","./CloudLoginView-CXsr5Omx.js","./ssoEntryQuery-MCHmpE9w.js","./Message-NRJmn_pf.js","./FieldLabel-4kD4Yi7G.js","./signInSchema-COhVh-MP.js","./PasswordInput-B9my8iEe.js","./InputGroupInput-BndLl3Nb.js","./authClasses-B7gWibuZ.js","./useCloudAuthPage-Cm-86BY_.js","./useSocialSignIn-4ach6N_x.js","./oauthState-DmjrcfWa.js","./useCurrentUser-Dzgh8A23.js","./CloudSignupView-Dcwi-Q2m.js","./SignUpForm-D4VB-c6J.js","./FieldDescription-B1neEBHX.js","./PasswordFields-ZEHNFiy2.js","./Skeleton-gXY6B2Cf.js","./CloudForgotPasswordView-Chne8WlX.js","./CloudSurveyView-CsVRv9Nb.js","./ToggleGroupItem-Da4A26JJ.js","./toggle-group-B0brfUuj.js","./auth-BShkAyQ4.js","./UserCheckView-H0B1Oriu.js","./Spinner-B79hMIoc.js","./CloudSorryContactSupportView-Bvmrin0N.js","./CloudSorryContactSupportView-Cg1Fm-bz.css","./CloudAuthTimeoutView-D0-3t47F.js","./LayoutDefault-B0gpCPpg.js","./LayoutDefault-Bx4p3ezV.js","./CloudSubscriptionRedirectView-CcDWk7qe.js","./comfy-logo-single-BCSzfwR_.js","./usePricingTableUrlLoader-dzJteNY3.js","./OAuthLayoutView-BHWZ71Sx.js","./OAuthConsentView-DcVufl9u.js","./WorkspaceProfilePic-C1aA3F8q.js"])))=>i.map(i=>d[i]);
import "./rolldown-runtime-xtsTai4I.js";
import { a as __vitePreload } from "./vendor-datadog-DudeEV66.js";
import { r as getOAuthRequestId } from "./oauthState-DmjrcfWa.js";
//#region src/platform/cloud/onboarding/onboardingCloudRoutes.ts
async function oauthConsentRedirect() {
	const oauthRequestId = getOAuthRequestId();
	if (!oauthRequestId) return { name: "cloud-user-check" };
	try {
		const { useSessionCookie } = await __vitePreload(async () => {
			const { useSessionCookie } = await import("./useSessionCookie-B1w4dEt1.js");
			return { useSessionCookie };
		}, __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63]), import.meta.url);
		await useSessionCookie().createSessionOrThrow();
	} catch (error) {
		console.warn("Failed to establish Cloud session cookie before OAuth consent:", error);
	}
	return {
		name: "cloud-oauth-consent",
		query: { oauth_request_id: oauthRequestId }
	};
}
var cloudOnboardingRoutes = [
	{
		path: "/cloud",
		component: () => __vitePreload(() => import("./CloudLayoutView-Dvd97OiM.js"), __vite__mapDeps([64,2,5,6,7,8,9,11,3,4,10,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,65,62,63,66]), import.meta.url),
		meta: { defersDesktopLoginRedemption: true },
		children: [
			{
				path: "login",
				name: "cloud-login",
				component: () => __vitePreload(() => import("./CloudLoginView-CXsr5Omx.js"), __vite__mapDeps([67,2,5,6,7,8,9,3,4,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,68,69,70,71,72,73,74,75,76,77,1,62,63]), import.meta.url),
				meta: { showTermsNotice: true },
				beforeEnter: async (to, _from, next) => {
					if (!to.query.switchAccount) {
						const { useCurrentUser } = await __vitePreload(async () => {
							const { useCurrentUser } = await import("./useCurrentUser-Dzgh8A23.js");
							return { useCurrentUser };
						}, __vite__mapDeps([78,3,2,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63]), import.meta.url);
						const { isLoggedIn } = useCurrentUser();
						if (isLoggedIn.value) return next(await oauthConsentRedirect());
					}
					next();
				}
			},
			{
				path: "signup",
				name: "cloud-signup",
				component: () => __vitePreload(() => import("./CloudSignupView-Dcwi-Q2m.js"), __vite__mapDeps([79,2,7,3,4,5,6,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,80,70,81,71,82,72,73,69,83,74,75,68,76,77,1,62,63]), import.meta.url),
				meta: { showTermsNotice: true },
				beforeEnter: async (to, _from, next) => {
					if (!to.query.switchAccount) {
						const { useCurrentUser } = await __vitePreload(async () => {
							const { useCurrentUser } = await import("./useCurrentUser-Dzgh8A23.js");
							return { useCurrentUser };
						}, __vite__mapDeps([78,3,2,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63]), import.meta.url);
						const { isLoggedIn } = useCurrentUser();
						if (isLoggedIn.value) return next(await oauthConsentRedirect());
					}
					next();
				}
			},
			{
				path: "forgot-password",
				name: "cloud-forgot-password",
				component: () => __vitePreload(() => import("./CloudForgotPasswordView-Chne8WlX.js"), __vite__mapDeps([84,2,7,3,4,5,6,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,69,70,74,62,63]), import.meta.url)
			},
			{
				path: "survey",
				name: "cloud-survey",
				component: () => __vitePreload(() => import("./CloudSurveyView-CsVRv9Nb.js"), __vite__mapDeps([85,2,5,6,7,8,9,11,3,4,10,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,86,87,88,62,63]), import.meta.url),
				meta: {
					requiresAuth: true,
					hideHero: true
				}
			},
			{
				path: "user-check",
				name: "cloud-user-check",
				component: () => __vitePreload(() => import("./UserCheckView-H0B1Oriu.js"), __vite__mapDeps([89,2,7,11,3,4,5,6,8,9,10,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,90,88,62,63]), import.meta.url),
				meta: {
					requiresAuth: true,
					hideHero: true
				}
			},
			{
				path: "sorry-contact-support",
				name: "cloud-sorry-contact-support",
				component: () => __vitePreload(() => import("./CloudSorryContactSupportView-Bvmrin0N.js"), __vite__mapDeps([91,2,7,24,58,92]), import.meta.url)
			},
			{
				path: "auth-timeout",
				name: "cloud-auth-timeout",
				component: () => __vitePreload(() => import("./CloudAuthTimeoutView-D0-3t47F.js"), __vite__mapDeps([93,2,7,3,4,5,6,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63]), import.meta.url),
				props: true
			}
		]
	},
	{
		path: "/cloud/subscribe",
		component: () => __vitePreload(() => import("./LayoutDefault-B0gpCPpg.js"), __vite__mapDeps([94,95,2,7,11,3,4,5,6,8,9,10,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63]), import.meta.url),
		meta: { requiresAuth: true },
		children: [{
			path: "",
			name: "cloud-subscribe",
			component: () => __vitePreload(() => import("./CloudSubscriptionRedirectView-CcDWk7qe.js"), __vite__mapDeps([96,2,7,3,4,5,6,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,90,97,98,62,63]), import.meta.url)
		}]
	},
	{
		path: "/oauth",
		component: () => __vitePreload(() => import("./OAuthLayoutView-BHWZ71Sx.js"), __vite__mapDeps([99,2,7,65,3,4,5,6,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63]), import.meta.url),
		children: [{
			path: "consent",
			name: "cloud-oauth-consent",
			component: () => __vitePreload(() => import("./OAuthConsentView-DcVufl9u.js"), __vite__mapDeps([100,2,7,14,8,24,38,39,5,6,9,40,77,101,62]), import.meta.url)
		}]
	},
	{
		path: "/cloud/oauth/consent",
		redirect: (to) => ({
			path: "/oauth/consent",
			query: to.query
		})
	},
	{
		path: "/login",
		redirect: (to) => ({
			name: "cloud-login",
			query: to.query,
			hash: to.hash
		})
	}
];
//#endregion
export { cloudOnboardingRoutes };
