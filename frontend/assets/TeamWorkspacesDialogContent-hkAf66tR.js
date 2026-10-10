import "./rolldown-runtime-xtsTai4I.js";
import { C as vModelText, Dt as withDirectives, Et as withCtx, F as createBaseVNode, G as defineComponent, H as createTextVNode, Jt as normalizeClass, L as createCommentVNode, Lt as ref, O as Fragment, P as computed, R as createElementBlock, T as withKeys, U as createVNode, Zt as toDisplayString, dt as renderList, lt as openBlock, p as storeToRefs } from "./vendor-vue-core-C1utdb0s.js";
import { Wl as useTeamWorkspaceStore } from "./layoutStore-CZsuzg91.js";
import { r as useI18n } from "./vendor-i18n-BZvE7WBQ.js";
import { t as useDialogStore } from "./dialogStore-B0GYyals.js";
import { t as Button_default } from "./Button-j0oCzR82.js";
import { f as useToast } from "./vendor-primevue-C3d0HJ53.js";
import { t as WorkspaceProfilePic_default } from "./WorkspaceProfilePic-C1aA3F8q.js";
import { t as useWorkspaceSwitch } from "./useWorkspaceSwitch-BOUfRKSR.js";
import { t as useWorkspaceTierLabel } from "./useWorkspaceTierLabel-DjgGD1WF.js";
//#region src/platform/workspace/components/dialogs/TeamWorkspacesDialogContent.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1 = { class: "flex w-full max-w-[480px] flex-col rounded-2xl border border-border-default bg-base-background" };
var _hoisted_2 = { class: "flex items-start gap-3 p-5 pb-0" };
var _hoisted_3 = { class: "flex min-w-0 flex-1 flex-col" };
var _hoisted_4 = { class: "m-0 text-lg font-semibold text-base-foreground" };
var _hoisted_5 = { class: "m-0 text-sm text-muted-foreground" };
var _hoisted_6 = ["aria-label"];
var _hoisted_7 = {
	key: 0,
	class: "flex flex-col px-5 pt-5"
};
var _hoisted_8 = { class: "m-0 mb-3 text-xs font-semibold tracking-wider text-muted-foreground uppercase" };
var _hoisted_9 = { class: "m-0 flex max-h-52 list-none flex-col gap-2 overflow-y-auto p-0" };
var _hoisted_10 = ["onClick"];
var _hoisted_11 = { class: "flex min-w-0 flex-1 flex-col items-start gap-1" };
var _hoisted_12 = { class: "flex items-center gap-1.5" };
var _hoisted_13 = { class: "truncate text-left text-sm font-medium text-base-foreground" };
var _hoisted_14 = {
	key: 0,
	class: "shrink-0 rounded-full bg-base-foreground px-1 py-0.5 text-2xs font-bold text-base-background uppercase"
};
var _hoisted_15 = { class: "shrink-0 text-sm font-medium text-muted-foreground" };
var _hoisted_16 = {
	key: 1,
	class: "mx-5 my-4 border-border-default"
};
var _hoisted_17 = { class: "m-0 text-xs font-semibold tracking-wider text-muted-foreground uppercase" };
var _hoisted_18 = { class: "flex flex-col gap-2" };
var _hoisted_19 = {
	for: "workspace-name-input",
	class: "text-sm text-base-foreground"
};
var _hoisted_20 = [
	"placeholder",
	"aria-invalid",
	"aria-describedby"
];
var _hoisted_21 = {
	key: 0,
	id: "workspace-name-error",
	class: "m-0 text-xs text-destructive-background"
};
var DIALOG_KEY = "team-workspaces";
//#endregion
//#region src/platform/workspace/components/dialogs/TeamWorkspacesDialogContent.vue
var TeamWorkspacesDialogContent_default = /* @__PURE__ */ defineComponent({
	__name: "TeamWorkspacesDialogContent",
	props: { onConfirm: { type: Function } },
	setup(__props) {
		const SAFE_NAME_REGEX = /^[a-zA-Z0-9][a-zA-Z0-9\s\-_'.,()&+]*$/;
		const { t } = useI18n();
		const dialogStore = useDialogStore();
		const toast = useToast();
		const workspaceStore = useTeamWorkspaceStore();
		const { switchWorkspace } = useWorkspaceSwitch();
		const { getTierLabel } = useWorkspaceTierLabel();
		const { sharedWorkspaces } = storeToRefs(workspaceStore);
		const loading = ref(false);
		const workspaceName = ref("");
		const ownedTeamWorkspaces = computed(() => sharedWorkspaces.value.filter((w) => w.role === "owner"));
		const tierLabels = computed(() => new Map(ownedTeamWorkspaces.value.map((w) => [w.id, getTierLabel(w)])));
		const isValidName = computed(() => {
			const name = workspaceName.value.trim();
			return name.length >= 1 && name.length <= 50 && SAFE_NAME_REGEX.test(name);
		});
		function onCancel() {
			dialogStore.closeDialog({ key: DIALOG_KEY });
		}
		async function handleSwitch(workspaceId) {
			try {
				await switchWorkspace(workspaceId);
				dialogStore.closeDialog({ key: DIALOG_KEY });
			} catch (error) {
				toast.add({
					severity: "error",
					summary: t("workspaceSwitcher.failedToSwitch"),
					detail: error instanceof Error ? error.message : t("g.unknownError")
				});
			}
		}
		async function onCreate() {
			if (!isValidName.value || loading.value) return;
			loading.value = true;
			try {
				const name = workspaceName.value.trim();
				try {
					await workspaceStore.createWorkspace(name);
				} catch (error) {
					toast.add({
						severity: "error",
						summary: t("workspacePanel.toast.failedToCreateWorkspace"),
						detail: error instanceof Error ? error.message : t("g.unknownError")
					});
					return;
				}
				try {
					await __props.onConfirm?.(name);
				} catch (error) {
					toast.add({
						severity: "error",
						summary: t("teamWorkspacesDialog.confirmCallbackFailed"),
						detail: error instanceof Error ? error.message : t("g.unknownError")
					});
				}
				dialogStore.closeDialog({ key: DIALOG_KEY });
			} finally {
				loading.value = false;
			}
		}
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("section", _hoisted_1, [
				createBaseVNode("header", _hoisted_2, [
					_cache[3] || (_cache[3] = createBaseVNode("div", {
						class: "flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary-background text-white",
						"aria-hidden": "true"
					}, [createBaseVNode("i", { class: "icon-[lucide--users] text-lg" })], -1)),
					createBaseVNode("div", _hoisted_3, [createBaseVNode("h2", _hoisted_4, toDisplayString(_ctx.$t("teamWorkspacesDialog.title")), 1), createBaseVNode("p", _hoisted_5, toDisplayString(ownedTeamWorkspaces.value.length > 0 ? _ctx.$t("teamWorkspacesDialog.subtitle") : _ctx.$t("teamWorkspacesDialog.subtitleNoWorkspaces")), 1)]),
					createBaseVNode("button", {
						class: "-mt-1 cursor-pointer rounded-sm border-none bg-transparent p-2 text-muted-foreground transition-colors hover:text-base-foreground focus-visible:ring-1 focus-visible:ring-border-default focus-visible:outline-none",
						"aria-label": _ctx.$t("g.close"),
						onClick: onCancel
					}, [..._cache[2] || (_cache[2] = [createBaseVNode("i", {
						class: "pi pi-times size-4",
						"aria-hidden": "true"
					}, null, -1)])], 8, _hoisted_6)
				]),
				ownedTeamWorkspaces.value.length > 0 ? (openBlock(), createElementBlock("section", _hoisted_7, [createBaseVNode("h3", _hoisted_8, toDisplayString(_ctx.$t("teamWorkspacesDialog.yourTeamWorkspaces")), 1), createBaseVNode("ul", _hoisted_9, [(openBlock(true), createElementBlock(Fragment, null, renderList(ownedTeamWorkspaces.value, (workspace) => {
					return openBlock(), createElementBlock("li", { key: workspace.id }, [createBaseVNode("button", {
						class: "flex w-full cursor-pointer items-center gap-3 rounded-lg border border-border-default bg-transparent px-4 py-3 transition-colors hover:bg-secondary-background-hover focus-visible:ring-1 focus-visible:ring-border-default focus-visible:outline-none",
						onClick: ($event) => handleSwitch(workspace.id)
					}, [
						createVNode(WorkspaceProfilePic_default, {
							class: "size-9 shrink-0 text-sm",
							"workspace-name": workspace.name,
							"subscription-tier": workspace.subscriptionTier
						}, null, 8, ["workspace-name", "subscription-tier"]),
						createBaseVNode("div", _hoisted_11, [createBaseVNode("div", _hoisted_12, [createBaseVNode("span", _hoisted_13, toDisplayString(workspace.name), 1), tierLabels.value.get(workspace.id) ? (openBlock(), createElementBlock("span", _hoisted_14, toDisplayString(tierLabels.value.get(workspace.id)), 1)) : createCommentVNode("", true)])]),
						createBaseVNode("span", _hoisted_15, [createTextVNode(toDisplayString(_ctx.$t("teamWorkspacesDialog.switch")) + " ", 1), _cache[4] || (_cache[4] = createBaseVNode("i", {
							class: "pi pi-arrow-right text-xs",
							"aria-hidden": "true"
						}, null, -1))])
					], 8, _hoisted_10)]);
				}), 128))])])) : createCommentVNode("", true),
				ownedTeamWorkspaces.value.length > 0 ? (openBlock(), createElementBlock("hr", _hoisted_16)) : createCommentVNode("", true),
				createBaseVNode("section", { class: normalizeClass(["flex flex-col gap-3 px-5 pb-5", { "pt-5": ownedTeamWorkspaces.value.length === 0 }]) }, [
					createBaseVNode("h3", _hoisted_17, toDisplayString(_ctx.$t("teamWorkspacesDialog.newWorkspace")), 1),
					createBaseVNode("div", _hoisted_18, [
						createBaseVNode("label", _hoisted_19, toDisplayString(_ctx.$t("workspacePanel.createWorkspaceDialog.nameLabel")), 1),
						withDirectives(createBaseVNode("input", {
							id: "workspace-name-input",
							"onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => workspaceName.value = $event),
							type: "text",
							class: "w-full rounded-lg border border-border-default bg-transparent px-3 py-2 text-sm text-base-foreground placeholder:text-muted-foreground focus:ring-1 focus:ring-border-default focus:outline-none",
							placeholder: _ctx.$t("teamWorkspacesDialog.namePlaceholder"),
							"aria-invalid": workspaceName.value.length > 0 && !isValidName.value,
							"aria-describedby": workspaceName.value.length > 0 && !isValidName.value ? "workspace-name-error" : void 0,
							onKeydown: _cache[1] || (_cache[1] = withKeys(($event) => isValidName.value && !loading.value && onCreate(), ["enter"]))
						}, null, 40, _hoisted_20), [[vModelText, workspaceName.value]]),
						workspaceName.value.length > 0 && !isValidName.value ? (openBlock(), createElementBlock("p", _hoisted_21, toDisplayString(_ctx.$t("teamWorkspacesDialog.nameValidationError")), 1)) : createCommentVNode("", true)
					]),
					createVNode(Button_default, {
						variant: "secondary",
						size: "lg",
						class: "w-full",
						loading: loading.value,
						disabled: !isValidName.value || loading.value,
						onClick: onCreate
					}, {
						default: withCtx(() => [_cache[5] || (_cache[5] = createBaseVNode("i", {
							class: "pi pi-plus text-xs",
							"aria-hidden": "true"
						}, null, -1)), createTextVNode(" " + toDisplayString(_ctx.$t("teamWorkspacesDialog.createWorkspace")), 1)]),
						_: 1
					}, 8, ["loading", "disabled"])
				], 2)
			]);
		};
	}
});
//#endregion
export { TeamWorkspacesDialogContent_default as default };
