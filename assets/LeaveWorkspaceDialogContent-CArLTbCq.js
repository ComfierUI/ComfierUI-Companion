import "./rolldown-runtime-xtsTai4I.js";
import { Et as withCtx, F as createBaseVNode, G as defineComponent, H as createTextVNode, Lt as ref, R as createElementBlock, U as createVNode, Zt as toDisplayString, lt as openBlock } from "./vendor-vue-core-C1utdb0s.js";
import { Wl as useTeamWorkspaceStore } from "./layoutStore-CZsuzg91.js";
import { r as useI18n } from "./vendor-i18n-BZvE7WBQ.js";
import { t as useDialogStore } from "./dialogStore-B0GYyals.js";
import { t as Button_default } from "./Button-j0oCzR82.js";
import { f as useToast } from "./vendor-primevue-C3d0HJ53.js";
//#region src/platform/workspace/components/dialogs/LeaveWorkspaceDialogContent.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1 = { class: "flex w-full max-w-[360px] flex-col rounded-2xl border border-border-default bg-base-background" };
var _hoisted_2 = { class: "flex h-12 items-center justify-between border-b border-border-default px-4" };
var _hoisted_3 = { class: "m-0 text-sm font-normal text-base-foreground" };
var _hoisted_4 = ["aria-label"];
var _hoisted_5 = { class: "p-4" };
var _hoisted_6 = { class: "m-0 text-sm text-muted-foreground" };
var _hoisted_7 = { class: "flex items-center justify-end gap-4 p-4" };
//#endregion
//#region src/platform/workspace/components/dialogs/LeaveWorkspaceDialogContent.vue
var LeaveWorkspaceDialogContent_default = /* @__PURE__ */ defineComponent({
	__name: "LeaveWorkspaceDialogContent",
	setup(__props) {
		const { t } = useI18n();
		const toast = useToast();
		const dialogStore = useDialogStore();
		const workspaceStore = useTeamWorkspaceStore();
		const loading = ref(false);
		function onCancel() {
			dialogStore.closeDialog({ key: "leave-workspace" });
		}
		async function onLeave() {
			loading.value = true;
			try {
				await workspaceStore.leaveWorkspace();
				dialogStore.closeDialog({ key: "leave-workspace" });
				window.location.reload();
			} catch (error) {
				console.error("[LeaveWorkspaceDialog] Failed to leave workspace:", error);
				toast.add({
					severity: "error",
					summary: t("workspacePanel.toast.failedToLeaveWorkspace"),
					detail: error instanceof Error ? error.message : t("g.unknownError")
				});
			} finally {
				loading.value = false;
			}
		}
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", _hoisted_1, [
				createBaseVNode("div", _hoisted_2, [createBaseVNode("h2", _hoisted_3, toDisplayString(_ctx.$t("workspacePanel.leaveDialog.title")), 1), createBaseVNode("button", {
					class: "cursor-pointer rounded-sm border-none bg-transparent p-0 text-muted-foreground transition-colors hover:text-base-foreground focus-visible:ring-1 focus-visible:ring-border-default focus-visible:outline-none",
					"aria-label": _ctx.$t("g.close"),
					onClick: onCancel
				}, [..._cache[0] || (_cache[0] = [createBaseVNode("i", { class: "pi pi-times size-4" }, null, -1)])], 8, _hoisted_4)]),
				createBaseVNode("div", _hoisted_5, [createBaseVNode("p", _hoisted_6, toDisplayString(_ctx.$t("workspacePanel.leaveDialog.message")), 1)]),
				createBaseVNode("div", _hoisted_7, [createVNode(Button_default, {
					variant: "muted-textonly",
					onClick: onCancel
				}, {
					default: withCtx(() => [createTextVNode(toDisplayString(_ctx.$t("g.cancel")), 1)]),
					_: 1
				}), createVNode(Button_default, {
					variant: "destructive",
					size: "lg",
					loading: loading.value,
					onClick: onLeave
				}, {
					default: withCtx(() => [createTextVNode(toDisplayString(_ctx.$t("workspacePanel.leaveDialog.leave")), 1)]),
					_: 1
				}, 8, ["loading"])])
			]);
		};
	}
});
//#endregion
export { LeaveWorkspaceDialogContent_default as default };
