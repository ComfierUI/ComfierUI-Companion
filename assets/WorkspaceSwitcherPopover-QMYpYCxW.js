import "./rolldown-runtime-xtsTai4I.js";
import { Dt as withDirectives, F as createBaseVNode, G as defineComponent, Jt as normalizeClass, Kt as unref, L as createCommentVNode, O as Fragment, P as computed, R as createElementBlock, U as createVNode, Zt as toDisplayString, dt as renderList, lt as openBlock, mt as resolveDirective, p as storeToRefs } from "./vendor-vue-core-C1utdb0s.js";
import { On as useBillingContext, Wl as useTeamWorkspaceStore } from "./layoutStore-CZsuzg91.js";
import { r as useI18n } from "./vendor-i18n-BZvE7WBQ.js";
import { t as cn } from "./src-DI1bBfrb.js";
import { t as WorkspaceProfilePic_default } from "./WorkspaceProfilePic-C1aA3F8q.js";
import { t as useWorkspaceSwitch } from "./useWorkspaceSwitch-BOUfRKSR.js";
import { t as useWorkspaceTierLabel } from "./useWorkspaceTierLabel-DjgGD1WF.js";
//#region src/platform/workspace/components/WorkspaceSwitcherPopover.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1 = { class: "flex max-h-96 w-80 flex-col overflow-hidden rounded-lg" };
var _hoisted_2 = {
	class: "flex scrollbar-custom min-h-0 flex-1 flex-col",
	"data-testid": "workspace-switcher-list"
};
var _hoisted_3 = {
	key: 0,
	class: "flex flex-col gap-2 p-2"
};
var _hoisted_4 = ["disabled", "onClick"];
var _hoisted_5 = { class: "flex min-w-0 flex-1 flex-col items-start gap-1" };
var _hoisted_6 = { class: "flex max-w-full min-w-0 items-center gap-1.5" };
var _hoisted_7 = ["title"];
var _hoisted_8 = {
	key: 0,
	class: "shrink-0 rounded-full bg-base-foreground px-1 py-0.5 text-2xs font-bold text-base-background uppercase"
};
var _hoisted_9 = { class: "text-xs text-muted-foreground" };
var _hoisted_10 = {
	key: 0,
	class: "pi pi-check shrink-0 text-sm text-base-foreground"
};
var _hoisted_11 = {
	key: 0,
	class: "flex shrink-0 items-center gap-2 px-4 py-2 text-xs text-muted-foreground"
};
var _hoisted_12 = { class: "pi pi-info-circle text-xs" };
var _hoisted_13 = {
	key: 1,
	class: "shrink-0 border-t border-border-default p-2"
};
var _hoisted_14 = { class: "flex min-w-0 flex-1 flex-col" };
var _hoisted_15 = {
	key: 0,
	class: "text-sm text-muted-foreground"
};
var _hoisted_16 = {
	key: 1,
	class: "text-sm text-muted-foreground"
};
//#endregion
//#region src/platform/workspace/components/WorkspaceSwitcherPopover.vue
var WorkspaceSwitcherPopover_default = /* @__PURE__ */ defineComponent({
	__name: "WorkspaceSwitcherPopover",
	emits: ["select", "create"],
	setup(__props, { emit: __emit }) {
		const emit = __emit;
		const { t } = useI18n();
		const { switchWorkspace } = useWorkspaceSwitch();
		const { subscription } = useBillingContext();
		const { formatTierName, getTierLabel } = useWorkspaceTierLabel();
		const currentSubscriptionTierName = computed(() => {
			const tier = subscription.value?.tier;
			if (!tier) return "";
			const isYearly = subscription.value?.duration === "ANNUAL";
			return formatTierName(tier, isYearly);
		});
		const workspaceStore = useTeamWorkspaceStore();
		const { workspaceId, workspaces, canCreateWorkspace, isFetchingWorkspaces, isSwitching } = storeToRefs(workspaceStore);
		const availableWorkspaces = computed(() => workspaces.value.map((w) => ({
			id: w.id,
			name: w.name,
			type: w.type,
			role: w.role,
			isSubscribed: w.isSubscribed,
			subscriptionPlan: w.subscriptionPlan,
			subscriptionTier: w.subscriptionTier
		})));
		function isCurrentWorkspace(workspace) {
			return workspace.id === workspaceId.value;
		}
		function getRoleLabel(role) {
			if (role === "owner") return t("workspaceSwitcher.roleOwner");
			if (role === "member") return t("workspaceSwitcher.roleMember");
			return "";
		}
		function resolveTierLabel(workspace) {
			if (workspace.type !== "personal") return null;
			if (isCurrentWorkspace(workspace)) return currentSubscriptionTierName.value || null;
			return getTierLabel(workspace);
		}
		async function handleSelectWorkspace(workspace) {
			if (await switchWorkspace(workspace.id)) emit("select", workspace);
		}
		function handleCreateWorkspace() {
			emit("create");
		}
		return (_ctx, _cache) => {
			const _directive_tooltip = resolveDirective("tooltip");
			return openBlock(), createElementBlock("div", _hoisted_1, [
				createBaseVNode("div", _hoisted_2, [unref(isFetchingWorkspaces) ? (openBlock(), createElementBlock("div", _hoisted_3, [(openBlock(), createElementBlock(Fragment, null, renderList(2, (i) => {
					return createBaseVNode("div", {
						key: i,
						class: "flex h-[54px] animate-pulse items-center gap-2 rounded-sm px-2 py-4"
					}, [..._cache[1] || (_cache[1] = [createBaseVNode("div", { class: "size-8 rounded-full bg-secondary-background" }, null, -1), createBaseVNode("div", { class: "flex flex-1 flex-col gap-1" }, [createBaseVNode("div", { class: "h-4 w-24 rounded-sm bg-secondary-background" }), createBaseVNode("div", { class: "h-3 w-16 rounded-sm bg-secondary-background" })], -1)])]);
				}), 64))])) : (openBlock(true), createElementBlock(Fragment, { key: 1 }, renderList(availableWorkspaces.value, (workspace) => {
					return openBlock(), createElementBlock("div", {
						key: workspace.id,
						class: "border-b border-border-default p-2"
					}, [createBaseVNode("div", { class: normalizeClass(unref(cn)("group flex h-[54px] w-full items-center gap-2 rounded-sm px-2 py-4", "hover:bg-secondary-background-hover", isCurrentWorkspace(workspace) && "bg-secondary-background")) }, [createBaseVNode("button", {
						class: "flex min-w-0 flex-1 cursor-pointer items-center gap-2 border-none bg-transparent p-0",
						disabled: !unref(false) && unref(isSwitching),
						onClick: ($event) => handleSelectWorkspace(workspace)
					}, [
						createVNode(WorkspaceProfilePic_default, {
							class: "size-8 shrink-0 text-sm",
							"workspace-name": workspace.name,
							"subscription-tier": workspace.subscriptionTier
						}, null, 8, ["workspace-name", "subscription-tier"]),
						createBaseVNode("div", _hoisted_5, [createBaseVNode("div", _hoisted_6, [createBaseVNode("span", {
							title: workspace.name,
							class: "min-w-0 truncate text-sm text-base-foreground"
						}, toDisplayString(workspace.name), 9, _hoisted_7), resolveTierLabel(workspace) ? (openBlock(), createElementBlock("span", _hoisted_8, toDisplayString(resolveTierLabel(workspace)), 1)) : createCommentVNode("", true)]), createBaseVNode("span", _hoisted_9, toDisplayString(getRoleLabel(workspace.role)), 1)]),
						isCurrentWorkspace(workspace) ? (openBlock(), createElementBlock("i", _hoisted_10)) : createCommentVNode("", true)
					], 8, _hoisted_4)], 2)]);
				}), 128))]),
				!unref(false) ? (openBlock(), createElementBlock("div", _hoisted_11, [withDirectives(createBaseVNode("i", _hoisted_12, null, 512), [[
					_directive_tooltip,
					{
						value: _ctx.$t("workspaceSwitcher.scopeTooltip"),
						showDelay: 300
					},
					void 0,
					{ left: true }
				]]), createBaseVNode("span", null, toDisplayString(_ctx.$t("workspaceSwitcher.scopeCaption")), 1)])) : createCommentVNode("", true),
				unref(false) ? (openBlock(), createElementBlock("div", _hoisted_13, [createBaseVNode("div", {
					class: normalizeClass(unref(cn)("flex h-12 w-full items-center gap-2 rounded-sm p-2", unref(canCreateWorkspace) ? "cursor-pointer hover:bg-secondary-background-hover" : "cursor-default")),
					onClick: _cache[0] || (_cache[0] = ($event) => unref(canCreateWorkspace) && handleCreateWorkspace())
				}, [createBaseVNode("div", { class: normalizeClass(unref(cn)("flex size-8 items-center justify-center rounded-full bg-secondary-background", !unref(canCreateWorkspace) && "opacity-50")) }, [..._cache[2] || (_cache[2] = [createBaseVNode("i", { class: "pi pi-plus text-sm text-muted-foreground" }, null, -1)])], 2), createBaseVNode("div", _hoisted_14, [unref(canCreateWorkspace) ? (openBlock(), createElementBlock("span", _hoisted_15, toDisplayString(_ctx.$t("workspaceSwitcher.createWorkspace")), 1)) : (openBlock(), createElementBlock("span", _hoisted_16, toDisplayString(_ctx.$t("workspaceSwitcher.maxWorkspacesReached")), 1))])], 2)])) : createCommentVNode("", true)
			]);
		};
	}
});
//#endregion
export { WorkspaceSwitcherPopover_default as t };
