import "./rolldown-runtime-xtsTai4I.js";
import { Dt as withDirectives, Et as withCtx, F as createBaseVNode, G as defineComponent, H as createTextVNode, I as createBlock, Jt as normalizeClass, Kt as unref, L as createCommentVNode, Lt as ref, R as createElementBlock, U as createVNode, Zt as toDisplayString, l as useRouter, lt as openBlock, mt as resolveDirective, pt as resolveComponent } from "./vendor-vue-core-C1utdb0s.js";
import { Hl as useCloudWebSessionStore, Ul as webSessionFailureMessage, Z as useCurrentUser, nt as useDialogService, or as useAuthActions } from "./layoutStore-CZsuzg91.js";
import { t as useToastStore } from "./toastStore-CTfykAzG.js";
import { r as useI18n } from "./vendor-i18n-BZvE7WBQ.js";
import { t as Button_default } from "./Button-j0oCzR82.js";
import { t as Spinner_default } from "./Spinner-B79hMIoc.js";
import { t as UserAvatar_default } from "./UserAvatar-DqyB8UsY.js";
//#endregion
//#region src/platform/auth/session/components/SignOutEverywhereButton.vue
var SignOutEverywhereButton_default = /* @__PURE__ */ defineComponent({
	__name: "SignOutEverywhereButton",
	setup(__props) {
		const { t } = useI18n();
		const { logout } = useAuthActions();
		const webSession = useCloudWebSessionStore();
		const toastStore = useToastStore();
		const signingOut = ref(false);
		async function revokeAllSessions() {
			const result = await webSession.revokeAllSessions();
			if (result.status === "error") {
				toastStore.add({
					severity: "error",
					summary: t("auth.signOutEverywhere.failed"),
					detail: webSessionFailureMessage(result.code),
					life: 8e3
				});
				return false;
			}
			toastStore.add({
				severity: "success",
				summary: t("auth.signOutEverywhere.success"),
				detail: t("auth.signOutEverywhere.successDetail"),
				life: 5e3
			});
			return true;
		}
		async function signOutEverywhere() {
			signingOut.value = true;
			try {
				await logout({ beforeSignOut: revokeAllSessions });
			} finally {
				signingOut.value = false;
			}
		}
		return (_ctx, _cache) => {
			return unref(webSession).signedInUser ? (openBlock(), createBlock(Button_default, {
				key: 0,
				variant: "destructive-textonly",
				loading: signingOut.value,
				onClick: signOutEverywhere
			}, {
				default: withCtx(() => [createTextVNode(toDisplayString(_ctx.$t("auth.signOutEverywhere.action")), 1)]),
				_: 1
			}, 8, ["loading"])) : createCommentVNode("", true);
		};
	}
});
//#endregion
//#region src/components/dialog/content/setting/UserPanel.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1 = { class: "user-settings-container h-full" };
var _hoisted_2 = { class: "flex h-full flex-col" };
var _hoisted_3 = { class: "mb-2 text-2xl font-bold" };
var _hoisted_4 = {
	key: 0,
	class: "flex flex-col gap-2"
};
var _hoisted_5 = { class: "flex flex-col gap-0.5" };
var _hoisted_6 = { class: "font-medium" };
var _hoisted_7 = { class: "text-muted" };
var _hoisted_8 = { class: "flex flex-col gap-0.5" };
var _hoisted_9 = { class: "font-medium" };
var _hoisted_10 = { class: "text-muted" };
var _hoisted_11 = { class: "flex flex-col gap-0.5" };
var _hoisted_12 = { class: "font-medium" };
var _hoisted_13 = { class: "flex items-center gap-1 text-muted" };
var _hoisted_14 = {
	key: 2,
	class: "mt-4 flex flex-col gap-2"
};
var _hoisted_15 = { class: "flex flex-wrap items-center gap-2" };
var _hoisted_16 = {
	key: 1,
	class: "flex flex-col gap-4"
};
var _hoisted_17 = { class: "text-smoke-600" };
//#endregion
//#region src/components/dialog/content/setting/UserPanel.vue
var UserPanel_default = /* @__PURE__ */ defineComponent({
	__name: "UserPanel",
	setup(__props) {
		const { t } = useI18n();
		const router = useRouter();
		const dialogService = useDialogService();
		const { loading, isLoggedIn, isApiKeyLogin, isEmailProvider, needsFirebaseSignIn, userDisplayName, userEmail, userPhotoUrl, providerName, providerIcon, handleSignOut, handleSignIn } = useCurrentUser();
		async function onUpdatePassword() {
			if (!needsFirebaseSignIn.value) {
				await dialogService.showUpdatePasswordDialog();
				return;
			}
			if (!await dialogService.confirm({
				title: t("auth.reauthRequired.title"),
				message: t("auth.reauthRequired.message")
			})) return;
			const { href } = router.resolve({
				name: "cloud-login",
				query: {
					switchAccount: "true",
					previousFullPath: encodeURIComponent(router.currentRoute.value.fullPath)
				}
			});
			window.location.assign(href);
		}
		return (_ctx, _cache) => {
			const _component_i18n_t = resolveComponent("i18n-t");
			const _directive_tooltip = resolveDirective("tooltip");
			return openBlock(), createElementBlock("div", _hoisted_1, [createBaseVNode("div", _hoisted_2, [
				createBaseVNode("h2", _hoisted_3, toDisplayString(_ctx.$t("userSettings.title")), 1),
				_cache[4] || (_cache[4] = createBaseVNode("div", { class: "mt-4 mb-3 border-t border-interface-stroke" }, null, -1)),
				unref(isLoggedIn) ? (openBlock(), createElementBlock("div", _hoisted_4, [
					unref(userPhotoUrl) ? (openBlock(), createBlock(UserAvatar_default, {
						key: 0,
						"photo-url": unref(userPhotoUrl),
						size: "large"
					}, null, 8, ["photo-url"])) : createCommentVNode("", true),
					createBaseVNode("div", _hoisted_5, [createBaseVNode("h3", _hoisted_6, toDisplayString(_ctx.$t("userSettings.name")), 1), createBaseVNode("div", _hoisted_7, toDisplayString(unref(userDisplayName) || _ctx.$t("userSettings.notSet")), 1)]),
					createBaseVNode("div", _hoisted_8, [createBaseVNode("h3", _hoisted_9, toDisplayString(_ctx.$t("userSettings.email")), 1), createBaseVNode("span", _hoisted_10, toDisplayString(unref(userEmail)), 1)]),
					createBaseVNode("div", _hoisted_11, [createBaseVNode("h3", _hoisted_12, toDisplayString(_ctx.$t("userSettings.provider")), 1), createBaseVNode("div", _hoisted_13, [
						createBaseVNode("i", { class: normalizeClass(unref(providerIcon)) }, null, 2),
						createTextVNode(" " + toDisplayString(unref(providerName)) + " ", 1),
						unref(isEmailProvider) ? withDirectives((openBlock(), createBlock(Button_default, {
							key: 0,
							variant: "muted-textonly",
							size: "icon-sm",
							"aria-label": _ctx.$t("userSettings.updatePassword"),
							onClick: onUpdatePassword
						}, {
							default: withCtx(() => [..._cache[0] || (_cache[0] = [createBaseVNode("i", { class: "pi pi-pen-to-square" }, null, -1)])]),
							_: 1
						}, 8, ["aria-label"])), [[_directive_tooltip, {
							value: _ctx.$t("userSettings.updatePassword"),
							showDelay: 300
						}]]) : createCommentVNode("", true)
					])]),
					unref(loading) ? (openBlock(), createBlock(Spinner_default, {
						key: 1,
						class: "mt-4 size-8"
					})) : (openBlock(), createElementBlock("div", _hoisted_14, [createBaseVNode("div", _hoisted_15, [createVNode(Button_default, {
						class: "w-32",
						variant: "secondary",
						onClick: unref(handleSignOut)
					}, {
						default: withCtx(() => [_cache[1] || (_cache[1] = createBaseVNode("i", { class: "pi pi-sign-out" }, null, -1)), createTextVNode(" " + toDisplayString(_ctx.$t("auth.signOut.signOut")), 1)]),
						_: 1
					}, 8, ["onClick"]), createVNode(SignOutEverywhereButton_default)]), !unref(isApiKeyLogin) ? (openBlock(), createBlock(_component_i18n_t, {
						key: 0,
						keypath: "auth.deleteAccount.contactSupport",
						tag: "p",
						class: "text-sm text-muted"
					}, {
						email: withCtx(() => [..._cache[2] || (_cache[2] = [createBaseVNode("a", {
							href: "mailto:support@comfy.org",
							class: "underline"
						}, "support@comfy.org", -1)])]),
						_: 1
					})) : createCommentVNode("", true)]))
				])) : (openBlock(), createElementBlock("div", _hoisted_16, [createBaseVNode("p", _hoisted_17, toDisplayString(_ctx.$t("auth.login.title")), 1), createVNode(Button_default, {
					class: "w-52",
					variant: "primary",
					loading: unref(loading),
					onClick: unref(handleSignIn)
				}, {
					default: withCtx(() => [_cache[3] || (_cache[3] = createBaseVNode("i", { class: "pi pi-user" }, null, -1)), createTextVNode(" " + toDisplayString(_ctx.$t("auth.login.signInOrSignUp")), 1)]),
					_: 1
				}, 8, ["loading", "onClick"])]))
			])]);
		};
	}
});
//#endregion
export { UserPanel_default as default };
