import "./rolldown-runtime-xtsTai4I.js";
import { Et as withCtx, F as createBaseVNode, G as defineComponent, H as createTextVNode, Kt as unref, Lt as ref, R as createElementBlock, U as createVNode, Zt as toDisplayString, lt as openBlock } from "./vendor-vue-core-C1utdb0s.js";
import { cu as PRESERVED_QUERY_NAMESPACES, lu as capturePreservedQuery, or as useAuthActions, tt as useAuthStore } from "./layoutStore-CZsuzg91.js";
import { t as useDialogStore } from "./dialogStore-B0GYyals.js";
import { t as Button_default } from "./Button-j0oCzR82.js";
//#region src/platform/workspace/components/dialogs/InviteWrongAccountDialogContent.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1 = { class: "flex w-full max-w-lg flex-col rounded-2xl border border-border-default bg-base-background" };
var _hoisted_2 = { class: "flex h-12 items-center justify-between border-b border-border-default px-4" };
var _hoisted_3 = { class: "m-0 text-sm font-normal text-base-foreground" };
var _hoisted_4 = ["aria-label"];
var _hoisted_5 = { class: "p-4" };
var _hoisted_6 = { class: "m-0 text-sm text-muted-foreground" };
var _hoisted_7 = { class: "flex items-center justify-end gap-4 p-4" };
//#endregion
//#region src/platform/workspace/components/dialogs/InviteWrongAccountDialogContent.vue
var InviteWrongAccountDialogContent_default = /* @__PURE__ */ defineComponent({
	__name: "InviteWrongAccountDialogContent",
	props: { inviteToken: {} },
	setup(__props) {
		const authStore = useAuthStore();
		const authActions = useAuthActions();
		const dialogStore = useDialogStore();
		const loading = ref(false);
		function onDismiss() {
			dialogStore.closeDialog({ key: "invite-wrong-account" });
		}
		async function onSwitchAccount() {
			loading.value = true;
			try {
				capturePreservedQuery(PRESERVED_QUERY_NAMESPACES.INVITE, { invite: __props.inviteToken }, ["invite"]);
				await authActions.logout();
			} finally {
				loading.value = false;
			}
		}
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", _hoisted_1, [
				createBaseVNode("div", _hoisted_2, [createBaseVNode("h2", _hoisted_3, toDisplayString(_ctx.$t("workspacePanel.inviteLinks.wrongAccountTitle")), 1), createBaseVNode("button", {
					class: "cursor-pointer rounded-sm border-none bg-transparent p-0 text-muted-foreground transition-colors hover:text-base-foreground focus-visible:ring-1 focus-visible:ring-border-default focus-visible:outline-none",
					"aria-label": _ctx.$t("g.close"),
					onClick: onDismiss
				}, [..._cache[0] || (_cache[0] = [createBaseVNode("i", { class: "pi pi-times size-4" }, null, -1)])], 8, _hoisted_4)]),
				createBaseVNode("div", _hoisted_5, [createBaseVNode("p", _hoisted_6, toDisplayString(unref(authStore).userEmail ? _ctx.$t("workspacePanel.inviteLinks.wrongAccountBody", { email: unref(authStore).userEmail }) : _ctx.$t("workspacePanel.inviteLinks.wrongAccountBodyGeneric")), 1)]),
				createBaseVNode("div", _hoisted_7, [createVNode(Button_default, {
					variant: "muted-textonly",
					onClick: onDismiss
				}, {
					default: withCtx(() => [createTextVNode(toDisplayString(_ctx.$t("workspacePanel.inviteLinks.invalidDismiss")), 1)]),
					_: 1
				}), createVNode(Button_default, {
					variant: "secondary",
					size: "lg",
					loading: loading.value,
					onClick: onSwitchAccount
				}, {
					default: withCtx(() => [createTextVNode(toDisplayString(_ctx.$t("workspacePanel.inviteLinks.switchAccount")), 1)]),
					_: 1
				}, 8, ["loading"])])
			]);
		};
	}
});
//#endregion
export { InviteWrongAccountDialogContent_default as default };
