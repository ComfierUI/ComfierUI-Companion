import "./rolldown-runtime-xtsTai4I.js";
import { Et as withCtx, F as createBaseVNode, G as defineComponent, H as createTextVNode, Kt as unref, Lt as ref, P as computed, R as createElementBlock, U as createVNode, Zt as toDisplayString, l as useRouter, lt as openBlock } from "./vendor-vue-core-C1utdb0s.js";
import { tt as useAuthStore, vu as useErrorHandling } from "./layoutStore-CZsuzg91.js";
import { r as useI18n } from "./vendor-i18n-BZvE7WBQ.js";
import { i as ssoStartUrl, t as SSO_ENTRY_OPEN_QUERY } from "./ssoEntryQuery-MCHmpE9w.js";
import { i as SSO_REQUIRED_DIALOG_KEY } from "./ssoRequired-BkQMvdnz.js";
import { t as useDialogStore } from "./dialogStore-B0GYyals.js";
import { t as Button_default } from "./Button-j0oCzR82.js";
//#region src/platform/auth/sso/SsoRequiredDialogContent.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1 = { class: "flex w-full max-w-lg flex-col rounded-2xl border border-border-default bg-base-background" };
var _hoisted_2 = { class: "flex h-12 items-center justify-between border-b border-border-default px-4" };
var _hoisted_3 = { class: "m-0 text-sm font-normal text-base-foreground" };
var _hoisted_4 = ["aria-label"];
var _hoisted_5 = { class: "m-0 p-4 text-sm text-muted-foreground" };
var _hoisted_6 = { class: "flex items-center justify-end gap-4 p-4" };
//#endregion
//#region src/platform/auth/sso/SsoRequiredDialogContent.vue
var SsoRequiredDialogContent_default = /* @__PURE__ */ defineComponent({
	__name: "SsoRequiredDialogContent",
	props: {
		email: {},
		returnTo: {},
		organizationId: {}
	},
	setup(__props) {
		const { t } = useI18n();
		const router = useRouter();
		const authStore = useAuthStore();
		const dialogStore = useDialogStore();
		const { toastErrorHandler } = useErrorHandling();
		const knownEmail = computed(() => __props.email ?? authStore.userEmail);
		const leaving = ref(false);
		function dismiss() {
			dialogStore.closeDialog({ key: SSO_REQUIRED_DIALOG_KEY });
		}
		function destination() {
			const back = {
				returnTo: __props.returnTo ?? router.currentRoute.value.fullPath,
				origin: window.location.origin
			};
			if (__props.organizationId) return ssoStartUrl({
				organizationId: __props.organizationId,
				email: knownEmail.value ?? void 0,
				...back
			});
			if (!knownEmail.value) return router.resolve({
				name: "cloud-login",
				query: SSO_ENTRY_OPEN_QUERY
			}).href;
			return ssoStartUrl({
				email: knownEmail.value,
				...back
			});
		}
		async function continueWithSso() {
			leaving.value = true;
			const target = destination();
			try {
				if (authStore.currentUser) await authStore.logout();
			} catch (error) {
				leaving.value = false;
				toastErrorHandler(error);
				return;
			}
			window.location.assign(target);
		}
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", _hoisted_1, [
				createBaseVNode("div", _hoisted_2, [createBaseVNode("h2", _hoisted_3, toDisplayString(unref(t)("auth.sso.required.title")), 1), createBaseVNode("button", {
					class: "cursor-pointer rounded-sm border-none bg-transparent p-0 text-muted-foreground transition-colors hover:text-base-foreground focus-visible:ring-1 focus-visible:ring-border-default focus-visible:outline-none",
					"aria-label": unref(t)("g.close"),
					onClick: dismiss
				}, [..._cache[0] || (_cache[0] = [createBaseVNode("i", { class: "icon-[lucide--x] size-4" }, null, -1)])], 8, _hoisted_4)]),
				createBaseVNode("p", _hoisted_5, toDisplayString(knownEmail.value ? unref(t)("auth.sso.required.bodyWithEmail", { email: knownEmail.value }) : unref(t)("auth.sso.required.body")), 1),
				createBaseVNode("div", _hoisted_6, [createVNode(Button_default, {
					variant: "muted-textonly",
					onClick: dismiss
				}, {
					default: withCtx(() => [createTextVNode(toDisplayString(unref(t)("auth.sso.required.dismiss")), 1)]),
					_: 1
				}), createVNode(Button_default, {
					variant: "secondary",
					size: "lg",
					loading: leaving.value,
					onClick: continueWithSso
				}, {
					default: withCtx(() => [createTextVNode(toDisplayString(unref(t)("auth.sso.continueWithSso")), 1)]),
					_: 1
				}, 8, ["loading"])])
			]);
		};
	}
});
//#endregion
export { SsoRequiredDialogContent_default as default };
