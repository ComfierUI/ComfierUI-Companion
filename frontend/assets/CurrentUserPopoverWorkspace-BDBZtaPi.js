import "./rolldown-runtime-xtsTai4I.js";
import { Dt as withDirectives, E as withModifiers, Et as withCtx, F as createBaseVNode, G as defineComponent, H as createTextVNode, I as createBlock, Kt as unref, L as createCommentVNode, Lt as ref, O as Fragment, P as computed, R as createElementBlock, T as withKeys, U as createVNode, Zt as toDisplayString, lt as openBlock, mt as resolveDirective, p as storeToRefs, xt as useTemplateRef } from "./vendor-vue-core-C1utdb0s.js";
import { d as onClickOutside } from "./vendor-vueuse-BxKIIsKg.js";
import { Ml as useSettingsDialog, Nn as useSubscriptionDialog, On as useBillingContext, Wl as useTeamWorkspaceStore, Z as useCurrentUser, er as paymentIntentSourceForAddCreditsClick, nt as useDialogService, tr as useBillingCapabilities, zn as useWorkspaceUI } from "./layoutStore-CZsuzg91.js";
import { n as useTelemetry } from "./telemetry-IkzvF0TI.js";
import { r as useI18n } from "./vendor-i18n-BZvE7WBQ.js";
import { t as Button_default } from "./Button-j0oCzR82.js";
import { u as script } from "./vendor-primevue-C3d0HJ53.js";
import { i as formatCreditsFromCents } from "./creditsUtil-BWj6bywK.js";
import { t as useExternalLink } from "./useExternalLink-CXT6uu6Z.js";
import { t as UserAvatar_default } from "./UserAvatar-DqyB8UsY.js";
import { t as WorkspaceProfilePic_default } from "./WorkspaceProfilePic-C1aA3F8q.js";
import { t as SubscribeButton_default } from "./SubscribeButton-Dtw_BkMs.js";
import { t as WorkspaceSwitcherPopover_default } from "./WorkspaceSwitcherPopover-QMYpYCxW.js";
//#region src/platform/workspace/components/CurrentUserPopoverWorkspace.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1 = {
	"data-testid": "current-user-popover",
	class: "current-user-popover -m-3 w-fit max-w-96 min-w-80 rounded-lg border border-border-default bg-base-background p-2 shadow-[1px_1px_8px_0_rgba(0,0,0,0.4)]"
};
var _hoisted_2 = { class: "mb-4 flex flex-col items-center px-0 py-3" };
var _hoisted_3 = { class: "my-0 mb-1 truncate text-base font-bold text-base-foreground" };
var _hoisted_4 = {
	key: 0,
	class: "my-0 truncate text-sm text-muted"
};
var _hoisted_5 = {
	key: 0,
	class: "relative"
};
var _hoisted_6 = {
	key: 0,
	class: "flex w-full items-center gap-2 rounded-lg px-4 py-2",
	"data-testid": "workspace-context-row"
};
var _hoisted_7 = { class: "truncate text-sm text-base-foreground" };
var _hoisted_8 = ["aria-expanded"];
var _hoisted_9 = { class: "flex w-0 flex-1 items-center gap-2" };
var _hoisted_10 = { class: "truncate text-sm text-base-foreground" };
var _hoisted_11 = {
	key: 1,
	class: "flex items-center gap-2 px-4 py-2"
};
var _hoisted_12 = {
	key: 1,
	class: "text-base font-semibold text-base-foreground"
};
var _hoisted_13 = {
	key: 2,
	class: "mx-0 my-2 border-t border-interface-stroke"
};
var _hoisted_14 = { class: "flex-1 text-sm text-base-foreground" };
var _hoisted_15 = { class: "flex-1 text-sm text-base-foreground" };
var _hoisted_16 = { class: "flex-1 text-sm text-base-foreground" };
var _hoisted_17 = { class: "flex-1 text-sm text-base-foreground" };
var _hoisted_18 = {
	key: 7,
	class: "mx-0 my-2 border-t border-interface-stroke"
};
var _hoisted_19 = { class: "flex-1 text-sm text-base-foreground" };
var _hoisted_20 = { class: "flex-1 text-sm text-base-foreground" };
var _hoisted_21 = { class: "flex-1 text-sm text-base-foreground" };
//#endregion
//#region src/platform/workspace/components/CurrentUserPopoverWorkspace.vue
var CurrentUserPopoverWorkspace_default = /* @__PURE__ */ defineComponent({
	__name: "CurrentUserPopoverWorkspace",
	props: { accountActionsOnly: {
		type: Boolean,
		default: false
	} },
	emits: ["close"],
	setup(__props, { expose: __expose, emit: __emit }) {
		const workspaceStore = useTeamWorkspaceStore();
		const { initState, workspaceName, isInPersonalWorkspace: isPersonalWorkspace, activeWorkspace } = storeToRefs(workspaceStore);
		const { permissions, canReactivatePlan, canOpenPricingSurface } = useWorkspaceUI();
		const { canTopUp, canSubscribeSelfServe } = useBillingCapabilities();
		const isWorkspaceSwitcherOpen = ref(false);
		const workspaceSwitcherTrigger = useTemplateRef("workspaceSwitcherTrigger");
		const workspaceSwitcherPanel = useTemplateRef("workspaceSwitcherPanel");
		onClickOutside(workspaceSwitcherPanel, () => {
			isWorkspaceSwitcherOpen.value = false;
		}, { ignore: [workspaceSwitcherTrigger] });
		const emit = __emit;
		const { buildDocsUrl, docsPaths } = useExternalLink();
		const { userDisplayName, userEmail, userPhotoUrl, handleSignOut, isApiKeyLogin } = useCurrentUser();
		const settingsDialog = useSettingsDialog();
		const dialogService = useDialogService();
		const { billingStatus, canAccessSubscriptionFeatures, subscription, balance, isLoading, fetchBalance } = useBillingContext();
		const isCancelled = computed(() => subscription.value?.isCancelled ?? false);
		const subscriptionDialog = useSubscriptionDialog();
		const { locale } = useI18n();
		const isLoadingBalance = isLoading;
		const displayedCredits = computed(() => {
			if (initState.value !== "ready") return "";
			const cents = balance.value?.effectiveBalanceMicros ?? balance.value?.amountMicros ?? 0;
			return formatCreditsFromCents({
				cents,
				locale: locale.value,
				numberOptions: {
					minimumFractionDigits: 0,
					maximumFractionDigits: 2
				}
			});
		});
		const showPlansAndPricing = canOpenPricingSurface;
		const showLocalPlansAndCredits = computed(() => permissions.value.canManageSubscription);
		const hasDelinquentSubscription = computed(() => (billingStatus.value === "payment_failed" || billingStatus.value === "paused") && Boolean(subscription.value?.planSlug));
		const showManagePlan = computed(() => permissions.value.canManageSubscription && (canAccessSubscriptionFeatures.value || hasDelinquentSubscription.value));
		const showSubscribeAction = computed(() => false);
		const handleOpenUserSettings = () => {
			settingsDialog.show("user");
			emit("close");
		};
		const handleOpenWorkspaceSettings = () => {
			settingsDialog.show("workspace");
			emit("close");
		};
		/**
		* Plan selection stays in the app: billing-web's `/v1/pricing` has no
		* personal/team tabs, cycle toggle, or credit slider (G7), and a per-credit
		* Team plan 400s there (FE-2642). Only checkout hands off to billing-web,
		* from inside the table (`useSubscriptionCheckout`'s `handleSubscribeClick`
		* / `handleSubscribeTeamClick`).
		*/
		const handleOpenPlansAndPricing = () => {
			subscriptionDialog.showPricingTable({ reason: "avatar_menu_plans" });
			emit("close");
		};
		const handleOpenSubscriptionAction = () => {
			subscriptionDialog.showPricingTable({ reason: "avatar_menu_plans" });
			emit("close");
		};
		const handleOpenManagePlanSettings = () => {
			settingsDialog.show("workspace");
			emit("close");
		};
		const handleOpenPlanCreditsSettings = () => {
			settingsDialog.show("workspace");
			emit("close");
		};
		const handleUpgradeToAddCredits = () => {
			subscriptionDialog.showPricingTable({ reason: "upgrade_to_add_credits" });
			emit("close");
		};
		const handleTopUp = () => {
			useTelemetry()?.trackAddApiCreditButtonClicked({ source: "avatar_menu" });
			dialogService.showTopUpCreditsDialog({ source: paymentIntentSourceForAddCreditsClick("avatar_menu") });
			emit("close");
		};
		const handleOpenPartnerNodesInfo = () => {
			window.open(buildDocsUrl(docsPaths.partnerNodesPricing, { includeLocale: true }), "_blank");
			emit("close");
		};
		const handleLogout = async () => {
			await handleSignOut();
			emit("close");
		};
		const handleCreateWorkspace = () => {
			isWorkspaceSwitcherOpen.value = false;
			dialogService.showCreateWorkspaceDialog();
			emit("close");
		};
		const toggleWorkspaceSwitcher = () => {
			isWorkspaceSwitcherOpen.value = !isWorkspaceSwitcherOpen.value;
		};
		const refreshBalance = () => {
			if (!__props.accountActionsOnly) fetchBalance();
		};
		__expose({ refreshBalance });
		return (_ctx, _cache) => {
			const _directive_tooltip = resolveDirective("tooltip");
			return openBlock(), createElementBlock("div", _hoisted_1, [
				createBaseVNode("div", _hoisted_2, [
					createVNode(UserAvatar_default, {
						class: "mb-1",
						"photo-url": unref(userPhotoUrl),
						"icon-class": "size-6",
						size: "large"
					}, null, 8, ["photo-url"]),
					createBaseVNode("h3", _hoisted_3, toDisplayString(unref(userDisplayName) || _ctx.$t("g.user")), 1),
					unref(userEmail) ? (openBlock(), createElementBlock("p", _hoisted_4, toDisplayString(unref(userEmail)), 1)) : createCommentVNode("", true)
				]),
				!__props.accountActionsOnly ? (openBlock(), createElementBlock("div", _hoisted_5, [unref(isApiKeyLogin) ? (openBlock(), createElementBlock("div", _hoisted_6, [createVNode(WorkspaceProfilePic_default, {
					class: "size-6 shrink-0 text-xs",
					"workspace-name": unref(workspaceName)
				}, null, 8, ["workspace-name"]), createBaseVNode("span", _hoisted_7, toDisplayString(unref(workspaceName)), 1)])) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [withDirectives((openBlock(), createElementBlock("button", {
					ref_key: "workspaceSwitcherTrigger",
					ref: workspaceSwitcherTrigger,
					type: "button",
					class: "flex w-full cursor-pointer appearance-none items-center justify-between rounded-lg border-0 bg-transparent px-4 py-2 text-left hover:bg-secondary-background-hover",
					"aria-expanded": isWorkspaceSwitcherOpen.value,
					"aria-haspopup": "menu",
					"aria-controls": "workspace-switcher-panel",
					"data-testid": "workspace-switcher-trigger",
					onClick: toggleWorkspaceSwitcher,
					onKeydown: _cache[0] || (_cache[0] = withKeys(withModifiers(($event) => isWorkspaceSwitcherOpen.value = false, ["stop"]), ["escape"]))
				}, [createBaseVNode("div", _hoisted_9, [createVNode(WorkspaceProfilePic_default, {
					class: "size-6 shrink-0 text-xs",
					"workspace-name": unref(workspaceName),
					"subscription-tier": unref(activeWorkspace)?.subscriptionTier
				}, null, 8, ["workspace-name", "subscription-tier"]), createBaseVNode("span", _hoisted_10, toDisplayString(unref(workspaceName)), 1)]), _cache[2] || (_cache[2] = createBaseVNode("i", { class: "pi pi-chevron-down shrink-0 text-sm text-muted-foreground" }, null, -1))], 40, _hoisted_8)), [[_directive_tooltip, {
					value: unref(workspaceName),
					showDelay: 300
				}]]), isWorkspaceSwitcherOpen.value ? (openBlock(), createElementBlock("div", {
					key: 0,
					id: "workspace-switcher-panel",
					ref_key: "workspaceSwitcherPanel",
					ref: workspaceSwitcherPanel,
					role: "menu",
					class: "absolute top-0 right-full z-10 mr-4 rounded-lg border border-border-default bg-base-background shadow-[1px_1px_8px_0_rgba(0,0,0,0.4)]",
					"data-testid": "workspace-switcher-panel"
				}, [createVNode(WorkspaceSwitcherPopover_default, {
					onSelect: _cache[1] || (_cache[1] = ($event) => isWorkspaceSwitcherOpen.value = false),
					onCreate: handleCreateWorkspace
				})], 512)) : createCommentVNode("", true)], 64))])) : createCommentVNode("", true),
				!__props.accountActionsOnly ? (openBlock(), createElementBlock("div", _hoisted_11, [
					_cache[4] || (_cache[4] = createBaseVNode("i", { class: "icon-[lucide--coins] text-sm text-credit" }, null, -1)),
					unref(isLoadingBalance) ? (openBlock(), createBlock(unref(script), {
						key: 0,
						width: "4rem",
						height: "1.25rem",
						class: "w-full"
					})) : (openBlock(), createElementBlock("span", _hoisted_12, toDisplayString(displayedCredits.value), 1)),
					withDirectives((openBlock(), createBlock(Button_default, {
						variant: "muted-textonly",
						size: "icon-sm",
						class: "mr-auto",
						"aria-label": _ctx.$t("credits.unified.tooltip"),
						"data-testid": "credits-info-button"
					}, {
						default: withCtx(() => [..._cache[3] || (_cache[3] = [createBaseVNode("i", { class: "icon-[lucide--circle-help]" }, null, -1)])]),
						_: 1
					}, 8, ["aria-label"])), [[_directive_tooltip, {
						value: _ctx.$t("credits.unified.tooltip"),
						showDelay: 300
					}]]),
					unref(canTopUp) ? (openBlock(), createBlock(Button_default, {
						key: 2,
						variant: "secondary",
						size: "sm",
						class: "text-base-foreground",
						"data-testid": "add-credits-button",
						onClick: handleTopUp
					}, {
						default: withCtx(() => [createTextVNode(toDisplayString(_ctx.$t("subscription.addCredits")), 1)]),
						_: 1
					})) : unref(canSubscribeSelfServe) ? (openBlock(), createBlock(Button_default, {
						key: 3,
						variant: "subscribe",
						size: "sm",
						"data-testid": "upgrade-to-add-credits-button",
						onClick: handleUpgradeToAddCredits
					}, {
						default: withCtx(() => [createTextVNode(toDisplayString(_ctx.$t("subscription.upgradeToAddCredits")), 1)]),
						_: 1
					})) : createCommentVNode("", true),
					showSubscribeAction.value && unref(isPersonalWorkspace) ? (openBlock(), createBlock(SubscribeButton_default, {
						key: 4,
						fluid: false,
						label: isCancelled.value ? _ctx.$t("subscription.resubscribe") : _ctx.$t("workspaceSwitcher.subscribe"),
						size: "sm",
						"button-variant": "subscribe"
					}, null, 8, ["label"])) : createCommentVNode("", true),
					showSubscribeAction.value && !unref(isPersonalWorkspace) ? (openBlock(), createBlock(Button_default, {
						key: 5,
						variant: "primary",
						size: "sm",
						onClick: handleOpenSubscriptionAction
					}, {
						default: withCtx(() => [createTextVNode(toDisplayString(isCancelled.value ? _ctx.$t("subscription.resubscribe") : _ctx.$t("workspaceSwitcher.subscribe")), 1)]),
						_: 1
					})) : createCommentVNode("", true)
				])) : createCommentVNode("", true),
				!__props.accountActionsOnly ? (openBlock(), createElementBlock("div", _hoisted_13)) : createCommentVNode("", true),
				!__props.accountActionsOnly && unref(false) && unref(showPlansAndPricing) ? (openBlock(), createElementBlock("div", {
					key: 3,
					class: "flex cursor-pointer items-center gap-2 px-4 py-2 hover:bg-secondary-background-hover",
					"data-testid": "plans-pricing-menu-item",
					onClick: handleOpenPlansAndPricing
				}, [_cache[5] || (_cache[5] = createBaseVNode("i", { class: "icon-[lucide--receipt-text] text-sm text-muted-foreground" }, null, -1)), createBaseVNode("span", _hoisted_14, toDisplayString(_ctx.$t("subscription.plansAndPricing")), 1)])) : createCommentVNode("", true),
				!__props.accountActionsOnly && unref(false) && showManagePlan.value ? (openBlock(), createElementBlock("button", {
					key: 4,
					type: "button",
					class: "flex w-full cursor-pointer appearance-none items-center gap-2 border-0 bg-transparent px-4 py-2 text-left hover:bg-secondary-background-hover focus-visible:bg-secondary-background-hover focus-visible:outline-none",
					"data-testid": "manage-plan-menu-item",
					onClick: handleOpenManagePlanSettings
				}, [_cache[6] || (_cache[6] = createBaseVNode("i", { class: "icon-[lucide--credit-card] size-4 text-muted-foreground" }, null, -1)), createBaseVNode("span", _hoisted_15, toDisplayString(_ctx.$t("subscription.managePlan")), 1)])) : createCommentVNode("", true),
				!__props.accountActionsOnly && showLocalPlansAndCredits.value ? (openBlock(), createElementBlock("button", {
					key: 5,
					type: "button",
					class: "flex w-full cursor-pointer appearance-none items-center gap-2 border-0 bg-transparent px-4 py-2 text-left hover:bg-secondary-background-hover focus-visible:bg-secondary-background-hover focus-visible:outline-none",
					"data-testid": "plans-credits-menu-item",
					onClick: handleOpenPlanCreditsSettings
				}, [_cache[7] || (_cache[7] = createBaseVNode("i", { class: "icon-[lucide--coins] size-4 text-muted-foreground" }, null, -1)), createBaseVNode("span", _hoisted_16, toDisplayString(_ctx.$t("subscription.plansAndCredits")), 1)])) : createCommentVNode("", true),
				!__props.accountActionsOnly ? (openBlock(), createElementBlock("div", {
					key: 6,
					class: "flex cursor-pointer items-center gap-2 px-4 py-2 hover:bg-secondary-background-hover",
					"data-testid": "partner-nodes-menu-item",
					onClick: handleOpenPartnerNodesInfo
				}, [_cache[8] || (_cache[8] = createBaseVNode("i", { class: "icon-[lucide--tag] text-sm text-muted-foreground" }, null, -1)), createBaseVNode("span", _hoisted_17, toDisplayString(_ctx.$t("subscription.partnerNodesCredits")), 1)])) : createCommentVNode("", true),
				!__props.accountActionsOnly ? (openBlock(), createElementBlock("div", _hoisted_18)) : createCommentVNode("", true),
				!__props.accountActionsOnly ? (openBlock(), createElementBlock("div", {
					key: 8,
					class: "flex cursor-pointer items-center gap-2 px-4 py-2 hover:bg-secondary-background-hover",
					"data-testid": "workspace-settings-menu-item",
					onClick: handleOpenWorkspaceSettings
				}, [_cache[9] || (_cache[9] = createBaseVNode("i", { class: "icon-[lucide--users] text-sm text-muted-foreground" }, null, -1)), createBaseVNode("span", _hoisted_19, toDisplayString(_ctx.$t("userSettings.workspaceSettings")), 1)])) : createCommentVNode("", true),
				createBaseVNode("div", {
					class: "flex cursor-pointer items-center gap-2 px-4 py-2 hover:bg-secondary-background-hover",
					"data-testid": "user-settings-menu-item",
					onClick: handleOpenUserSettings
				}, [_cache[10] || (_cache[10] = createBaseVNode("i", { class: "icon-[lucide--settings-2] text-sm text-muted-foreground" }, null, -1)), createBaseVNode("span", _hoisted_20, toDisplayString(_ctx.$t("userSettings.accountSettings")), 1)]),
				_cache[12] || (_cache[12] = createBaseVNode("div", { class: "mx-0 my-2 border-t border-interface-stroke" }, null, -1)),
				createBaseVNode("div", {
					class: "flex cursor-pointer items-center gap-2 px-4 py-2 hover:bg-secondary-background-hover",
					"data-testid": "logout-menu-item",
					onClick: handleLogout
				}, [_cache[11] || (_cache[11] = createBaseVNode("i", { class: "icon-[lucide--log-out] text-sm text-muted-foreground" }, null, -1)), createBaseVNode("span", _hoisted_21, toDisplayString(_ctx.$t("auth.signOut.signOut")), 1)])
			]);
		};
	}
});
//#endregion
export { CurrentUserPopoverWorkspace_default as default };
