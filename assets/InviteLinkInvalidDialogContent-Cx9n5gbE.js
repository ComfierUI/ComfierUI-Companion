import "./rolldown-runtime-xtsTai4I.js";
import { Et as withCtx, F as createBaseVNode, G as defineComponent, H as createTextVNode, R as createElementBlock, U as createVNode, Zt as toDisplayString, lt as openBlock } from "./vendor-vue-core-C1utdb0s.js";
import { t as useDialogStore } from "./dialogStore-B0GYyals.js";
import { t as Button_default } from "./Button-j0oCzR82.js";
//#region src/platform/workspace/components/dialogs/InviteLinkInvalidDialogContent.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1 = { class: "flex w-full max-w-lg flex-col rounded-2xl border border-border-default bg-base-background" };
var _hoisted_2 = { class: "flex h-12 items-center justify-between border-b border-border-default px-4" };
var _hoisted_3 = { class: "m-0 text-sm font-normal text-base-foreground" };
var _hoisted_4 = ["aria-label"];
var _hoisted_5 = { class: "p-4" };
var _hoisted_6 = { class: "m-0 text-sm text-muted-foreground" };
var _hoisted_7 = { class: "flex items-center justify-end p-4" };
//#endregion
//#region src/platform/workspace/components/dialogs/InviteLinkInvalidDialogContent.vue
var InviteLinkInvalidDialogContent_default = /* @__PURE__ */ defineComponent({
	__name: "InviteLinkInvalidDialogContent",
	setup(__props) {
		const dialogStore = useDialogStore();
		function onDismiss() {
			dialogStore.closeDialog({ key: "invite-link-invalid" });
		}
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", _hoisted_1, [
				createBaseVNode("div", _hoisted_2, [createBaseVNode("h2", _hoisted_3, toDisplayString(_ctx.$t("workspacePanel.inviteLinks.invalidTitle")), 1), createBaseVNode("button", {
					class: "cursor-pointer rounded-sm border-none bg-transparent p-0 text-muted-foreground transition-colors hover:text-base-foreground focus-visible:ring-1 focus-visible:ring-border-default focus-visible:outline-none",
					"aria-label": _ctx.$t("g.close"),
					onClick: onDismiss
				}, [..._cache[0] || (_cache[0] = [createBaseVNode("i", { class: "pi pi-times size-4" }, null, -1)])], 8, _hoisted_4)]),
				createBaseVNode("div", _hoisted_5, [createBaseVNode("p", _hoisted_6, toDisplayString(_ctx.$t("workspacePanel.inviteLinks.invalidBody")), 1)]),
				createBaseVNode("div", _hoisted_7, [createVNode(Button_default, {
					variant: "secondary",
					size: "lg",
					onClick: onDismiss
				}, {
					default: withCtx(() => [createTextVNode(toDisplayString(_ctx.$t("workspacePanel.inviteLinks.invalidDismiss")), 1)]),
					_: 1
				})])
			]);
		};
	}
});
//#endregion
export { InviteLinkInvalidDialogContent_default as default };
