import "./rolldown-runtime-xtsTai4I.js";
import { C as vModelText, Dt as withDirectives, Et as withCtx, F as createBaseVNode, G as defineComponent, H as createTextVNode, Lt as ref, P as computed, R as createElementBlock, T as withKeys, U as createVNode, Zt as toDisplayString, lt as openBlock } from "./vendor-vue-core-C1utdb0s.js";
import { Wl as useTeamWorkspaceStore } from "./layoutStore-CZsuzg91.js";
import { r as useI18n } from "./vendor-i18n-BZvE7WBQ.js";
import { t as useDialogStore } from "./dialogStore-B0GYyals.js";
import { t as Button_default } from "./Button-j0oCzR82.js";
import { f as useToast } from "./vendor-primevue-C3d0HJ53.js";
//#region src/platform/workspace/components/dialogs/CreateWorkspaceDialogContent.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1 = { class: "flex w-full max-w-lg flex-col rounded-2xl border border-border-default bg-base-background" };
var _hoisted_2 = { class: "flex h-12 items-center justify-between border-b border-border-default px-4" };
var _hoisted_3 = { class: "m-0 text-sm font-normal text-base-foreground" };
var _hoisted_4 = ["aria-label"];
var _hoisted_5 = { class: "flex flex-col gap-4 p-4" };
var _hoisted_6 = { class: "m-0 text-sm text-muted-foreground" };
var _hoisted_7 = { class: "flex flex-col gap-2" };
var _hoisted_8 = { class: "text-sm text-muted-foreground" };
var _hoisted_9 = ["placeholder"];
var _hoisted_10 = { class: "flex items-center justify-end gap-4 p-4" };
//#endregion
//#region src/platform/workspace/components/dialogs/CreateWorkspaceDialogContent.vue
var CreateWorkspaceDialogContent_default = /* @__PURE__ */ defineComponent({
	__name: "CreateWorkspaceDialogContent",
	props: { onConfirm: { type: Function } },
	setup(__props) {
		const { t } = useI18n();
		const dialogStore = useDialogStore();
		const toast = useToast();
		const workspaceStore = useTeamWorkspaceStore();
		const loading = ref(false);
		const workspaceName = ref("");
		const isValidName = computed(() => {
			const name = workspaceName.value.trim();
			return name.length >= 1 && name.length <= 50 && /^[a-zA-Z0-9][a-zA-Z0-9\s\-_'.,()&+]*$/.test(name);
		});
		function onCancel() {
			dialogStore.closeDialog({ key: "create-workspace" });
		}
		async function onCreate() {
			if (!isValidName.value) return;
			loading.value = true;
			try {
				const name = workspaceName.value.trim();
				await __props.onConfirm?.(name);
				dialogStore.closeDialog({ key: "create-workspace" });
				await workspaceStore.createWorkspace(name);
			} catch (error) {
				console.error("[CreateWorkspaceDialog] Failed to create workspace:", error);
				toast.add({
					severity: "error",
					summary: t("workspacePanel.toast.failedToCreateWorkspace"),
					detail: error instanceof Error ? error.message : t("g.unknownError")
				});
			} finally {
				loading.value = false;
			}
		}
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", _hoisted_1, [
				createBaseVNode("div", _hoisted_2, [createBaseVNode("h2", _hoisted_3, toDisplayString(_ctx.$t("workspacePanel.createWorkspaceDialog.title")), 1), createBaseVNode("button", {
					class: "cursor-pointer rounded-sm border-none bg-transparent p-0 text-muted-foreground transition-colors hover:text-base-foreground focus-visible:ring-1 focus-visible:ring-border-default focus-visible:outline-none",
					"aria-label": _ctx.$t("g.close"),
					onClick: onCancel
				}, [..._cache[2] || (_cache[2] = [createBaseVNode("i", { class: "pi pi-times size-4" }, null, -1)])], 8, _hoisted_4)]),
				createBaseVNode("div", _hoisted_5, [createBaseVNode("p", _hoisted_6, toDisplayString(_ctx.$t("workspacePanel.createWorkspaceDialog.message")), 1), createBaseVNode("div", _hoisted_7, [createBaseVNode("label", _hoisted_8, toDisplayString(_ctx.$t("workspacePanel.createWorkspaceDialog.nameLabel")), 1), withDirectives(createBaseVNode("input", {
					"onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => workspaceName.value = $event),
					type: "text",
					class: "h-10 w-full rounded-lg border-none bg-secondary-background px-4 text-sm text-base-foreground placeholder:text-muted-foreground focus:ring-1 focus:ring-border-default focus:outline-none",
					placeholder: _ctx.$t("workspacePanel.createWorkspaceDialog.namePlaceholder"),
					onKeydown: _cache[1] || (_cache[1] = withKeys(($event) => isValidName.value && onCreate(), ["enter"]))
				}, null, 40, _hoisted_9), [[vModelText, workspaceName.value]])])]),
				createBaseVNode("div", _hoisted_10, [createVNode(Button_default, {
					variant: "muted-textonly",
					onClick: onCancel
				}, {
					default: withCtx(() => [createTextVNode(toDisplayString(_ctx.$t("g.cancel")), 1)]),
					_: 1
				}), createVNode(Button_default, {
					variant: "primary",
					size: "lg",
					loading: loading.value,
					disabled: !isValidName.value,
					onClick: onCreate
				}, {
					default: withCtx(() => [createTextVNode(toDisplayString(_ctx.$t("workspacePanel.createWorkspaceDialog.create")), 1)]),
					_: 1
				}, 8, ["loading", "disabled"])])
			]);
		};
	}
});
//#endregion
export { CreateWorkspaceDialogContent_default as default };
