import "./rolldown-runtime-xtsTai4I.js";
import { Dt as withDirectives, E as withModifiers, Et as withCtx, F as createBaseVNode, G as defineComponent, H as createTextVNode, I as createBlock, Jt as normalizeClass, Kt as unref, L as createCommentVNode, Lt as ref, Mt as isRef, O as Fragment, P as computed, R as createElementBlock, St as watch, U as createVNode, Xt as normalizeStyle, Zt as toDisplayString, dt as renderList, et as nextTick, j as Teleport, lt as openBlock, mt as resolveDirective, ot as onMounted, p as storeToRefs, pt as resolveComponent, xt as useTemplateRef } from "./vendor-vue-core-C1utdb0s.js";
import { W as useTimestamp, X as createSharedComposable, x as useEventListener } from "./vendor-vueuse-BxKIIsKg.js";
import { An as useSubscriptionOperationView, Ar as toTierKey, Cr as getTierFeatures, Dr as isSalesManagedTier, Gn as platformLink, Ni as Menu_default, Nn as useSubscriptionDialog, On as useBillingContext, Pa as useNodeDefStore, Sr as getTierCredits, U as getProviderIcon, W as getProviderName, Wl as useTeamWorkspaceStore, Yi as StatusBadge_default, Z as useCurrentUser, Zi as SearchInput_default, Zr as useCommandStore, er as paymentIntentSourceForAddCreditsClick, fr as useFreeTierQuota, kr as isWithinEnterpriseEndingNotice, lr as categorizeBillingApiError, nt as useDialogService, tr as useBillingCapabilities, ur as useBillingRouting, vu as useErrorHandling, wr as getTierPrice, yr as ENTERPRISE_URL, zn as useWorkspaceUI } from "./layoutStore-CZsuzg91.js";
import { n as useTelemetry } from "./telemetry-IkzvF0TI.js";
import { n as reportError } from "./reportError-LG-zfbNw.js";
import { t as useToastStore } from "./toastStore-CTfykAzG.js";
import { r as useI18n } from "./vendor-i18n-BZvE7WBQ.js";
import { t as useFeatureFlags } from "./useFeatureFlags-DAoj_aDd.js";
import { t as useDialogStore } from "./dialogStore-B0GYyals.js";
import { a as showConfirmDialog } from "./DialogPortal-B3D-ZhO6.js";
import { t as cn } from "./src-DI1bBfrb.js";
import { t as Button_default } from "./Button-j0oCzR82.js";
import { f as useToast } from "./vendor-primevue-C3d0HJ53.js";
import { t as Switch_default } from "./Switch-BAw3-YcG.js";
import { t as _plugin_vue_export_helper_default } from "./_plugin-vue_export-helper-DEKQMRQ4.js";
import { t as useExternalLink } from "./useExternalLink-CXT6uu6Z.js";
import { t as Skeleton_default } from "./Skeleton-gXY6B2Cf.js";
import { n as CreditsTile_default, r as UsageLogsTable_default, t as CreditsPanel_default } from "./CreditsPanel-eD1Qayu-.js";
import { t as UserAvatar_default } from "./UserAvatar-DqyB8UsY.js";
import { t as useWorkspaceTierLabel } from "./useWorkspaceTierLabel-DjgGD1WF.js";
import { n as formatSubscriptionDate, r as resolveSubscriptionTierKey, t as useScheduledPlanChange } from "./useScheduledPlanChange-CVxwCKxQ.js";
import { n as copyTextSilently, t as buildInviteLink } from "./inviteLinks-C2Ae4GP6.js";
import { a as useSettingsHeaderCollapse, i as usePartnerNodeGovernanceStore, r as formatUsdCents } from "./numberUtil-BOSqkNWN.js";
//#region src/platform/workspace/composables/useTeamPlan.ts
function useTeamPlan() {
	const { canAccessSubscriptionFeatures, isInitialized, isTeamPlan, maxSeats, subscription, subscriptionStatus } = useBillingContext();
	const isCancelled = computed(() => subscription.value?.isCancelled ?? false);
	return {
		maxSeats,
		hasTeamPlan: isTeamPlan,
		isOnTeamPlan: computed(() => isTeamPlan.value && canAccessSubscriptionFeatures.value && !isCancelled.value),
		isCancelled,
		hasLapsedTeamPlan: computed(() => isTeamPlan.value && (subscriptionStatus.value === "canceled" || subscriptionStatus.value === "ended")),
		hasMemberSeats: computed(() => maxSeats.value === 0 || (maxSeats.value ?? 0) > 1),
		isPlanLoading: computed(() => !isInitialized.value)
	};
}
//#endregion
//#region src/platform/workspace/composables/usePlanEnded.ts
function usePlanEnded() {
	const { subscription, subscriptionStatus, canAccessSubscriptionFeatures } = useBillingContext();
	const { hasTeamPlan } = useTeamPlan();
	const isPlanTerminal = computed(() => subscriptionStatus.value === "ended" || subscriptionStatus.value === "canceled" && !canAccessSubscriptionFeatures.value);
	return {
		isPlanEnded: computed(() => {
			if (!isPlanTerminal.value) return false;
			if (hasTeamPlan.value) return true;
			const tier = subscription.value?.tier;
			return tier != null && isSalesManagedTier(tier);
		}),
		isPlanTerminal,
		isSalesManagedPlan: computed(() => {
			const tier = subscription.value?.tier;
			return tier == null ? true : isSalesManagedTier(tier);
		}),
		isEnterprisePlan: computed(() => subscription.value?.tier === "ENTERPRISE")
	};
}
var PERSONAL_RECOVERY_TIERS = /* @__PURE__ */ new Set([
	"STANDARD",
	"CREATOR",
	"PRO",
	"FOUNDERS_EDITION"
]);
function billingBannerAudience(inputs) {
	if (inputs.isEnterprise) return null;
	if (inputs.isTeamPlan) return "team";
	return inputs.isKnownPersonalTier ? "personal" : null;
}
function classifyTier(tier) {
	return {
		isEnterprise: tier === "ENTERPRISE",
		isInvoiceRecoverableTier: tier == null || tier === "FREE",
		isKnownPersonalTier: tier != null && PERSONAL_RECOVERY_TIERS.has(tier)
	};
}
function readSubscriptionInputs(subscription) {
	return {
		...classifyTier(subscription?.tier),
		isLoaded: subscription !== null,
		hasFunds: subscription?.hasFunds ?? null,
		isCancelled: subscription?.isCancelled ?? false,
		endDate: subscription?.endDate ?? null,
		hasScheduledChange: subscription?.scheduledChange != null
	};
}
function useBillingBannerInternal() {
	const { canAccessSubscriptionFeatures, billingStatus, subscription, isTeamPlan, renewalInvoice, fetchStatus, fetchBalance } = useBillingContext();
	const { permissions } = useWorkspaceUI();
	const { flags } = useFeatureFlags();
	const { isPlanEnded, isPlanTerminal } = usePlanEnded();
	const planEndedDismissed = ref(false);
	const outOfCreditsDismissed = ref(false);
	const planChangeDismissed = ref(false);
	useTimestamp({ interval: 6e4 });
	const bannerInputs = computed(() => ({
		billingControlEnabled: flags.billingControlEnabled,
		v1PaymentRecovery: flags.v1PaymentRecovery,
		isTeamPlan: isTeamPlan.value,
		hasRenewalInvoice: renewalInvoice.value != null,
		canAccessSubscriptionFeatures: canAccessSubscriptionFeatures.value,
		billingStatus: billingStatus.value,
		canManage: permissions.value.canManageSubscription,
		isPlanEnded: isPlanEnded.value,
		isPlanTerminal: isPlanTerminal.value,
		planEndedDismissed: planEndedDismissed.value,
		outOfCreditsDismissed: outOfCreditsDismissed.value,
		planChangeDismissed: planChangeDismissed.value,
		...readSubscriptionInputs(subscription.value)
	}));
	const kind = computed(() => null);
	const audience = computed(() => billingBannerAudience(bannerInputs.value));
	const hasExhaustedFunds = computed(() => subscription.value?.hasFunds === false);
	watch(hasExhaustedFunds, (exhausted) => {
		if (!exhausted) outOfCreditsDismissed.value = false;
	});
	useEventListener(window, "focus", () => {
		if (kind.value !== "paymentFailed" && kind.value !== "paused") return;
		Promise.allSettled([fetchStatus(), fetchBalance()]);
	});
	function dismiss() {
		if (kind.value === "planEnded") planEndedDismissed.value = true;
		if (kind.value === "outOfCredits") outOfCreditsDismissed.value = true;
		if (kind.value === "planChange") planChangeDismissed.value = true;
	}
	return {
		kind,
		audience,
		dismiss
	};
}
var useBillingBanner = createSharedComposable(useBillingBannerInternal);
//#endregion
//#region src/platform/workspace/composables/useResubscribe.ts
/**
* Reactivates a cancelled-but-still-active subscription and surfaces success or
* failure as a toast, tracking the in-flight state for the calling button.
*/
function useResubscribe() {
	const { t } = useI18n();
	const toast = useToast();
	const { resubscribe } = useBillingContext();
	const { shouldUseWorkspaceBilling } = useBillingRouting();
	const { canReactivatePlan } = useWorkspaceUI();
	const isResubscribing = ref(false);
	async function handleResubscribe() {
		if (!canReactivatePlan.value) return;
		const source = "settings_billing_panel";
		const startedAt = Date.now();
		const isWorkspaceResubscribe = shouldUseWorkspaceBilling.value;
		useTelemetry()?.trackResubscribeClicked({ source });
		useTelemetry()?.trackBillingEvent({
			operation: "resubscribe",
			stage: "started",
			outcome: "pending",
			source
		});
		isResubscribing.value = true;
		try {
			await resubscribe({ source });
			if (isWorkspaceResubscribe) useTelemetry()?.trackBillingEvent({
				operation: "resubscribe",
				stage: "succeeded",
				outcome: "success",
				source,
				duration_ms: Date.now() - startedAt
			});
			toast.add({
				severity: "success",
				summary: t("subscription.resubscribeSuccess"),
				life: 5e3
			});
		} catch (error) {
			const detail = error instanceof Error && error.message.trim() ? error.message : t("subscription.resubscribeFailed");
			useTelemetry()?.trackBillingEvent({
				operation: "resubscribe",
				stage: "failed",
				outcome: "failure",
				source,
				failure_category: categorizeBillingApiError(error),
				...isWorkspaceResubscribe && { duration_ms: Date.now() - startedAt }
			});
			toast.add({
				severity: "error",
				summary: t("g.error"),
				detail
			});
		} finally {
			isResubscribing.value = false;
		}
	}
	return {
		isResubscribing,
		handleResubscribe
	};
}
//#endregion
//#region src/platform/workspace/components/dialogs/settings/BillingStatusBanner.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1$11 = {
	key: 0,
	class: "@container"
};
var _hoisted_2$10 = {
	role: "status",
	class: "flex flex-col gap-3 rounded-2xl border border-interface-stroke/60 bg-base-background p-4 @2xl:flex-row @2xl:items-center @2xl:gap-2"
};
var _hoisted_3$7 = { class: "flex min-w-0 flex-1 flex-col gap-1" };
var _hoisted_4$7 = { class: "flex items-center gap-2" };
var _hoisted_5$7 = { class: "text-sm text-base-foreground" };
var _hoisted_6$7 = { class: "m-0 pl-6 text-sm text-muted-foreground" };
var _hoisted_7$7 = {
	key: 0,
	class: "flex shrink-0 flex-wrap items-center gap-2 pl-6 @2xl:pl-0"
};
var bs = "workspacePanel.billingStatus";
//#endregion
//#region src/platform/workspace/components/dialogs/settings/BillingStatusBanner.vue
var BillingStatusBanner_default = /* @__PURE__ */ defineComponent({
	__name: "BillingStatusBanner",
	props: { section: {} },
	setup(__props) {
		const { t, d } = useI18n();
		const { renewalDate, renewalInvoice, subscription, manageSubscription } = useBillingContext();
		const { permissions, canReactivatePlan, workspaceType } = useWorkspaceUI();
		const { canTopUp } = useBillingCapabilities();
		const { kind, audience, dismiss } = useBillingBanner();
		const { formatTierName } = useWorkspaceTierLabel();
		const { isResubscribing, handleResubscribe } = useResubscribe();
		const { scheduledChange, planName: scheduledPlanName, isDisplayable: canShowScheduledChange } = useScheduledPlanChange();
		const dialogService = useDialogService();
		const subscriptionDialog = useSubscriptionDialog();
		const { isSalesManagedPlan, isEnterprisePlan: isEndedEnterprisePlan } = usePlanEnded();
		const canManage = computed(() => permissions.value.canManageSubscription);
		const isEnterprisePlan = computed(() => subscription.value?.tier === "ENTERPRISE");
		function longDate(raw) {
			const date = raw ? new Date(raw) : null;
			if (!date || Number.isNaN(date.getTime())) return "";
			return d(date, {
				year: "numeric",
				month: "long",
				day: "numeric"
			});
		}
		const cycleResetDate = computed(() => longDate(renewalDate.value));
		const planEndDate = computed(() => longDate(subscription.value?.endDate));
		const planName = computed(() => formatTierName(subscription.value?.tier, false));
		const audienceCopy = {
			team: {
				outOfCreditsBody: `${bs}.outOfCredits.body`,
				outOfCreditsBodyNoDate: `${bs}.outOfCredits.bodyNoDate`,
				endingTitle: `${bs}.ending.title`,
				endingBody: `${bs}.ending.body`
			},
			personal: {
				outOfCreditsBody: `${bs}.outOfCredits.personalBody`,
				outOfCreditsBodyNoDate: `${bs}.outOfCredits.personalBodyNoDate`,
				endingTitle: `${bs}.ending.personalTitle`,
				endingBody: `${bs}.ending.personalBody`
			}
		};
		const copy = computed(() => audienceCopy[audience.value ?? "team"]);
		const PLAN_LIFECYCLE_KINDS = /* @__PURE__ */ new Set([
			"planEnded",
			"ending",
			"planChange"
		]);
		const isHiddenOnSection = computed(() => __props.section === "members" && workspaceType.value === "personal" && kind.value !== null && PLAN_LIFECYCLE_KINDS.has(kind.value));
		function safeInvoiceUrl(value) {
			if (!value) return void 0;
			try {
				return new URL(value).protocol === "https:" ? value : void 0;
			} catch {
				return;
			}
		}
		const pausedView = () => ({
			muted: !canManage.value,
			title: t(`${bs}.paused.title`),
			body: canManage.value ? t(`${bs}.paused.body`) : t(`${bs}.paused.memberBody`),
			action: canManage.value ? "updatePayment" : null,
			dismissible: false,
			payInvoiceUrl: safeInvoiceUrl(renewalInvoice.value?.hosted_invoice_url)
		});
		function planEndedCopy() {
			const date = planEndDate.value;
			if (audience.value === "personal") {
				const plan = planName.value;
				const body = t(`${bs}.planEnded.personalBody`);
				return {
					title: date ? t(`${bs}.planEnded.personalTitle`, {
						plan,
						date
					}) : t(`${bs}.planEnded.personalTitleNoDate`, { plan }),
					ownerBody: body,
					memberBody: body
				};
			}
			if (!isSalesManagedPlan.value) return {
				title: date ? t(`${bs}.planEnded.teamTitle`, { date }) : t("workspacePanel.members.endedTeamTitle"),
				ownerBody: t(`${bs}.planEnded.teamBody`),
				memberBody: t(`${bs}.planEnded.teamMemberBody`)
			};
			const named = isEndedEnterprisePlan.value;
			return {
				title: date ? t(`${bs}.planEnded.${named ? "enterpriseTitle" : "planTitle"}`, { date }) : t(`workspacePanel.members.${named ? "endedEnterpriseTitle" : "endedPlanTitle"}`),
				ownerBody: t(`${bs}.planEnded.${named ? "enterpriseBody" : "salesBody"}`),
				memberBody: t(`${bs}.planEnded.salesMemberBody`)
			};
		}
		const planEndedView = () => {
			const copy = planEndedCopy();
			const ownerAction = audience.value !== "personal" && isSalesManagedPlan.value ? "contactSales" : "resubscribe";
			return {
				muted: true,
				title: copy.title,
				body: canManage.value ? copy.ownerBody : copy.memberBody,
				action: canManage.value ? ownerAction : null,
				dismissible: true
			};
		};
		const outOfCreditsBody = (key, noDateKey) => cycleResetDate.value ? t(key, { date: cycleResetDate.value }) : t(noDateKey);
		const outOfCreditsView = () => {
			if (!canManage.value) return {
				muted: false,
				title: t(`${bs}.outOfCredits.title`),
				body: outOfCreditsBody(`${bs}.outOfCredits.memberBody`, `${bs}.outOfCredits.memberBodyNoDate`),
				action: null,
				dismissible: true
			};
			if (!canTopUp.value) return null;
			return {
				muted: false,
				title: t(`${bs}.outOfCredits.title`),
				body: outOfCreditsBody(copy.value.outOfCreditsBody, copy.value.outOfCreditsBodyNoDate),
				action: "addCredits",
				dismissible: true
			};
		};
		const enterpriseEndingView = () => ({
			muted: true,
			title: t(`${bs}.ending.enterpriseTitle`, { date: planEndDate.value }),
			body: canManage.value ? t(`${bs}.ending.enterpriseBody`) : t(`${bs}.ending.memberBody`),
			action: canManage.value ? "contactSales" : null,
			dismissible: false
		});
		const selfServeEndingView = () => ({
			muted: true,
			title: t(copy.value.endingTitle, {
				plan: planName.value,
				date: planEndDate.value
			}),
			body: canManage.value ? t(copy.value.endingBody) : t(`${bs}.ending.memberBody`),
			action: canManage.value && canReactivatePlan.value ? "reactivate" : null,
			dismissible: false
		});
		const endingView = () => isEnterprisePlan.value ? enterpriseEndingView() : selfServeEndingView();
		const planChangeView = () => canShowScheduledChange.value ? {
			muted: true,
			title: t(`${bs}.planChange.title`, {
				plan: scheduledPlanName.value,
				date: longDate(scheduledChange.value?.effective_at)
			}),
			body: t(`${bs}.planChange.body`),
			action: null,
			dismissible: true
		} : null;
		const bannerViews = {
			paused: pausedView,
			paymentFailed: pausedView,
			planEnded: planEndedView,
			outOfCredits: outOfCreditsView,
			ending: endingView,
			planChange: planChangeView
		};
		const banner = computed(() => kind.value && !isHiddenOnSection.value ? bannerViews[kind.value]() : null);
		function handleAddCredits() {
			dialogService.showTopUpCreditsDialog();
		}
		function handleResubscribePlan() {
			subscriptionDialog.show({
				planMode: audience.value === "personal" ? "personal" : "team",
				reason: "settings_billing_panel"
			});
		}
		function handleContactSales() {
			window.open(ENTERPRISE_URL, "_blank", "noopener,noreferrer");
		}
		function handlePayInvoice(url) {
			window.open(url, "_blank", "noopener,noreferrer");
		}
		function handleUpdatePayment() {
			manageSubscription();
		}
		return (_ctx, _cache) => {
			return banner.value ? (openBlock(), createElementBlock("div", _hoisted_1$11, [createBaseVNode("div", _hoisted_2$10, [createBaseVNode("div", _hoisted_3$7, [createBaseVNode("div", _hoisted_4$7, [createBaseVNode("i", { class: normalizeClass(unref(cn)("size-4 shrink-0", banner.value.muted ? "icon-[lucide--circle-alert] text-muted-foreground" : "icon-[lucide--triangle-alert] text-warning-background")) }, null, 2), createBaseVNode("span", _hoisted_5$7, toDisplayString(banner.value.title), 1)]), createBaseVNode("p", _hoisted_6$7, toDisplayString(banner.value.body), 1)]), banner.value.dismissible || banner.value.action ? (openBlock(), createElementBlock("div", _hoisted_7$7, [banner.value.dismissible ? (openBlock(), createBlock(Button_default, {
				key: 0,
				variant: "textonly",
				size: "lg",
				onClick: unref(dismiss)
			}, {
				default: withCtx(() => [createTextVNode(toDisplayString(_ctx.$t("workspacePanel.billingStatus.outOfCredits.dismiss")), 1)]),
				_: 1
			}, 8, ["onClick"])) : createCommentVNode("", true), banner.value.action === "addCredits" ? (openBlock(), createBlock(Button_default, {
				key: 1,
				variant: "secondary",
				size: "lg",
				onClick: handleAddCredits
			}, {
				default: withCtx(() => [createTextVNode(toDisplayString(_ctx.$t("workspacePanel.billingStatus.outOfCredits.addCredits")), 1)]),
				_: 1
			})) : banner.value.action === "reactivate" ? (openBlock(), createBlock(Button_default, {
				key: 2,
				variant: "secondary",
				size: "lg",
				loading: unref(isResubscribing),
				onClick: unref(handleResubscribe)
			}, {
				default: withCtx(() => [createTextVNode(toDisplayString(_ctx.$t("workspacePanel.billingStatus.ending.reactivate")), 1)]),
				_: 1
			}, 8, ["loading", "onClick"])) : banner.value.action === "resubscribe" ? (openBlock(), createBlock(Button_default, {
				key: 3,
				variant: "secondary",
				size: "lg",
				onClick: handleResubscribePlan
			}, {
				default: withCtx(() => [createTextVNode(toDisplayString(_ctx.$t("workspacePanel.members.resubscribe")), 1)]),
				_: 1
			})) : banner.value.action === "contactSales" ? (openBlock(), createBlock(Button_default, {
				key: 4,
				variant: "secondary",
				size: "lg",
				onClick: handleContactSales
			}, {
				default: withCtx(() => [createTextVNode(toDisplayString(_ctx.$t("workspacePanel.billingStatus.ending.contactSales")), 1)]),
				_: 1
			})) : banner.value.action === "updatePayment" ? (openBlock(), createElementBlock(Fragment, { key: 5 }, [banner.value.payInvoiceUrl ? (openBlock(), createBlock(Button_default, {
				key: 0,
				variant: "inverted",
				size: "lg",
				onClick: _cache[0] || (_cache[0] = ($event) => handlePayInvoice(banner.value.payInvoiceUrl))
			}, {
				default: withCtx(() => [createTextVNode(toDisplayString(_ctx.$t("workspacePanel.billingStatus.payInvoice")), 1)]),
				_: 1
			})) : createCommentVNode("", true), createVNode(Button_default, {
				variant: banner.value.payInvoiceUrl ? "secondary" : "inverted",
				size: "lg",
				onClick: handleUpdatePayment
			}, {
				default: withCtx(() => [createTextVNode(toDisplayString(_ctx.$t("workspacePanel.billingStatus.updatePayment")), 1)]),
				_: 1
			}, 8, ["variant"])], 64)) : createCommentVNode("", true)])) : createCommentVNode("", true)])])) : createCommentVNode("", true);
		};
	}
});
//#endregion
//#region src/platform/workspace/components/dialogs/settings/PartnerNodeAccessPanel.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1$10 = {
	id: "partner-node-access-title",
	class: "sr-only"
};
var _hoisted_2$9 = { class: "flex items-start gap-4 rounded-2xl border border-interface-stroke p-4 font-inter" };
var _hoisted_3$6 = { class: "min-w-0 flex-1" };
var _hoisted_4$6 = { class: "flex h-6 items-center gap-2" };
var _hoisted_5$6 = { class: "m-0 text-sm leading-[normal] font-normal text-base-foreground" };
var _hoisted_6$6 = {
	key: 0,
	class: "rounded-full bg-secondary-background px-2 py-0.5 text-xs text-base-foreground"
};
var _hoisted_7$6 = {
	key: 0,
	class: "m-0 mt-1 text-sm leading-[normal] font-normal text-muted-foreground"
};
var _hoisted_8$6 = {
	key: 1,
	class: "m-0 mt-1 text-sm leading-[normal] font-normal text-muted-foreground"
};
var _hoisted_9$4 = {
	key: 2,
	class: "m-0 mt-1 flex items-center gap-2 text-sm/4 font-normal text-muted-foreground"
};
var _hoisted_10$4 = {
	key: 0,
	class: "text-sm text-muted-foreground"
};
var _hoisted_11$4 = ["aria-label"];
var _hoisted_12$3 = {
	key: 2,
	role: "alert",
	class: "flex min-h-48 flex-col items-center justify-center gap-3 rounded-2xl border border-interface-stroke p-6 text-center"
};
var _hoisted_13$3 = { class: "text-sm text-muted-foreground" };
var _hoisted_14$2 = {
	key: 3,
	role: "status",
	class: "flex min-h-48 items-center justify-center rounded-2xl border border-interface-stroke p-6 text-center"
};
var _hoisted_15$1 = { class: "text-sm text-muted-foreground" };
var _hoisted_16$1 = { class: "flex flex-wrap items-center justify-between gap-3" };
var _hoisted_17$1 = { class: "w-full max-w-64" };
var _hoisted_18$1 = { class: "sr-only" };
var _hoisted_19$1 = {
	key: 0,
	role: "alert",
	class: "rounded-lg bg-destructive-background/10 px-4 py-3 text-sm text-destructive-background"
};
var _hoisted_20$1 = ["aria-label"];
var _hoisted_21$1 = { class: "min-h-0 grow scrollbar-gutter-stable overflow-y-auto" };
var _hoisted_22$1 = ["aria-sort"];
var _hoisted_23$1 = ["aria-sort"];
var _hoisted_24$1 = ["aria-sort"];
var _hoisted_25$1 = {
	role: "cell",
	class: "min-w-0"
};
var _hoisted_26$1 = {
	class: "flex size-5 shrink-0 items-center justify-center rounded-full bg-interface-panel-hover-surface",
	"aria-hidden": "true"
};
var _hoisted_27$1 = { class: "truncate" };
var _hoisted_28$1 = {
	role: "cell",
	class: "hidden text-sm text-muted-foreground lg:block"
};
var _hoisted_29$1 = {
	role: "cell",
	class: "flex h-8 items-center justify-end justify-self-end"
};
var _hoisted_30$1 = {
	role: "cell",
	class: "truncate pl-17 text-muted-foreground"
};
var _hoisted_31$1 = {
	key: 0,
	class: "flex min-h-40 items-center justify-center p-6 text-sm text-muted-foreground"
};
var _hoisted_32$1 = {
	key: 0,
	class: "mt-2 flex shrink-0 justify-end border-t border-border-default px-2 pt-3 text-sm text-base-foreground"
};
var _hoisted_33$1 = { class: "font-bold" };
var rowGridClass = "grid-cols-[minmax(0,1fr)_2.5rem] lg:grid-cols-[minmax(0,1fr)_12rem_5rem]";
//#endregion
//#region src/platform/workspace/components/dialogs/settings/PartnerNodeAccessPanel.vue
var PartnerNodeAccessPanel_default = /* @__PURE__ */ defineComponent({
	__name: "PartnerNodeAccessPanel",
	setup(__props) {
		const { handlePanelScroll } = useSettingsHeaderCollapse();
		const governanceStore = usePartnerNodeGovernanceStore();
		const { governedWorkspaceId, isSaving, policy, providers, status } = storeToRefs(governanceStore);
		const { isProviderEnabled, loadPolicy, setAllProvidersEnabled, setEnforcementEnabled, setProviderEnabled, setProvidersEnabled } = governanceStore;
		const nodeDefStore = useNodeDefStore();
		const { nodeDefsByName } = storeToRefs(nodeDefStore);
		const dialogStore = useDialogStore();
		const { workspaceRole } = useWorkspaceUI();
		const { t } = useI18n();
		const searchQuery = ref("");
		const isSearching = computed(() => searchQuery.value.trim().length > 0);
		const expandedProviderIds = ref(/* @__PURE__ */ new Set());
		const saveError = ref(false);
		const sortField = ref("provider");
		const sortDirection = ref("ascending");
		const isRestricted = computed(() => policy.value?.enforcementEnabled === true);
		const isPolicyLoaded = computed(() => status.value === "configured" || status.value === "unconfigured");
		const isGated = computed(() => status.value === "ineligible" && providers.value.length > 0);
		const isReadOnly = computed(() => workspaceRole.value !== "owner");
		const canEditPolicy = computed(() => !isReadOnly.value && isPolicyLoaded.value);
		const providerRows = computed(() => providers.value.filter(({ nodeCategories }) => nodeCategories.length > 0).map((provider) => {
			const nodes = Object.values(nodeDefsByName.value).filter((nodeDef) => nodeDef.api_node && provider.nodeCategories.includes(getProviderName(nodeDef.category))).map((nodeDef) => ({
				id: nodeDef.name,
				name: nodeDef.display_name || nodeDef.name
			})).sort((a, b) => a.name.localeCompare(b.name));
			return {
				...provider,
				enabled: isProviderEnabled(provider.id),
				nodes
			};
		}));
		const enabledModelCount = computed(() => providerRows.value.reduce((total, { enabled, nodes }) => total + (enabled ? nodes.length : 0), 0));
		const filteredProviders = computed(() => {
			const query = searchQuery.value.trim().toLocaleLowerCase();
			if (!query) return providerRows.value;
			return providerRows.value.flatMap((provider) => {
				if (provider.displayName.toLocaleLowerCase().includes(query)) return [provider];
				const nodes = provider.nodes.filter(({ name }) => name.toLocaleLowerCase().includes(query));
				return nodes.length > 0 ? [{
					...provider,
					nodes,
					totalModelCount: provider.nodes.length
				}] : [];
			});
		});
		const bulkMenuEntries = computed(() => {
			const rows = filteredProviders.value;
			const providerIds = rows.map(({ id }) => id);
			const locked = isSaving.value || !canEditPolicy.value || rows.length === 0;
			return [{
				label: isSearching.value ? t("workspacePanel.partnerNodes.disableMatchingCount", rows.length) : t("workspacePanel.partnerNodes.disableAllCount", rows.length),
				disabled: locked || rows.every(({ enabled }) => !enabled),
				command: () => handleBulkDisable(providerIds)
			}, {
				label: isSearching.value ? t("workspacePanel.partnerNodes.enableMatchingCount", rows.length) : t("workspacePanel.partnerNodes.enableAllCount", rows.length),
				disabled: locked || rows.every(({ enabled }) => enabled),
				command: () => void performSave(() => setProvidersEnabled(providerIds, true))
			}];
		});
		const sortedProviders = computed(() => [...filteredProviders.value].sort((a, b) => {
			const result = sortField.value === "provider" ? a.displayName.localeCompare(b.displayName) : sortField.value === "models" ? a.nodes.length - b.nodes.length : Number(a.enabled) - Number(b.enabled);
			return (sortDirection.value === "ascending" ? result : -result) || a.displayName.localeCompare(b.displayName);
		}));
		function sortBy(field) {
			if (sortField.value === field) {
				sortDirection.value = sortDirection.value === "ascending" ? "descending" : "ascending";
				return;
			}
			sortField.value = field;
			sortDirection.value = field === "provider" ? "ascending" : "descending";
		}
		function sortIcon(field) {
			return cn(sortField.value === field ? "icon-[lucide--arrow-down]" : "icon-[lucide--arrow-up-down]", sortField.value === field && sortDirection.value === "descending" && "rotate-180");
		}
		function toggleExpanded(providerId) {
			const nextIds = new Set(expandedProviderIds.value);
			if (nextIds.has(providerId)) nextIds.delete(providerId);
			else nextIds.add(providerId);
			expandedProviderIds.value = nextIds;
		}
		function isProviderExpanded(provider) {
			return expandedProviderIds.value.has(provider.id);
		}
		async function performSave(action) {
			saveError.value = false;
			try {
				await action();
			} catch {
				saveError.value = true;
			}
		}
		function saveProviderChange(providerId, enabled) {
			performSave(() => setProviderEnabled(providerId, enabled));
		}
		function handleBulkDisable(providerIds) {
			if (isSearching.value) {
				performSave(() => setProvidersEnabled(providerIds, false));
				return;
			}
			confirmDisableAll();
		}
		function createPolicyConfirmationGuard() {
			const sourceWorkspaceId = governedWorkspaceId.value;
			const sourcePolicy = policy.value;
			if (!sourceWorkspaceId) return null;
			return () => workspaceRole.value === "owner" && governedWorkspaceId.value === sourceWorkspaceId && policy.value === sourcePolicy;
		}
		function confirmDisableAll() {
			const canConfirm = createPolicyConfirmationGuard();
			if (!canConfirm) return;
			const dialog = showConfirmDialog({
				headerProps: { title: t("workspacePanel.partnerNodes.disableAllTitle") },
				props: { promptText: t("workspacePanel.partnerNodes.disableAllMessage") },
				footerProps: {
					confirmText: t("workspacePanel.partnerNodes.disableAll"),
					confirmVariant: "destructive",
					optionsDisabled: isSaving,
					onCancel: () => dialogStore.closeDialog(dialog),
					onConfirm: async () => {
						if (!canConfirm()) {
							dialogStore.closeDialog(dialog);
							return;
						}
						await performSave(() => setAllProvidersEnabled(false));
						dialogStore.closeDialog(dialog);
					}
				}
			});
		}
		function requestAccessModeToggle() {
			if (isGated.value) {
				confirmEnterpriseUpsell();
				return;
			}
			if (!canEditPolicy.value || isSaving.value) return;
			const enabled = !isRestricted.value;
			confirmAccessModeChange(enabled, () => setEnforcementEnabled(enabled));
		}
		function openEnterprisePage() {
			window.open("https://comfy.org/cloud/enterprise/", "_blank");
		}
		function confirmEnterpriseUpsell() {
			const dialog = showConfirmDialog({
				headerProps: { title: t("workspacePanel.partnerNodes.gatedDialogTitle") },
				props: { promptText: t("workspacePanel.partnerNodes.gatedDialogMessage") },
				footerProps: {
					cancelText: t("workspacePanel.partnerNodes.notNow"),
					confirmText: t("workspacePanel.partnerNodes.contactUs"),
					confirmVariant: "inverted",
					onCancel: () => dialogStore.closeDialog(dialog),
					onConfirm: () => {
						openEnterprisePage();
						dialogStore.closeDialog(dialog);
					}
				}
			});
		}
		function confirmAccessModeChange(enabled, action) {
			const canConfirm = createPolicyConfirmationGuard();
			if (!canConfirm) return;
			const key = enabled ? "restrictAccess" : "allowAllAccess";
			const dialog = showConfirmDialog({
				headerProps: { title: t(`workspacePanel.partnerNodes.${key}Title`) },
				props: { promptText: `${t(`workspacePanel.partnerNodes.${key}Message`)} ${t(`workspacePanel.partnerNodes.${key}Hint`)}` },
				footerProps: {
					confirmText: t("g.confirm"),
					confirmVariant: "secondary",
					optionsDisabled: isSaving,
					onCancel: () => dialogStore.closeDialog(dialog),
					onConfirm: async () => {
						if (!canConfirm()) {
							dialogStore.closeDialog(dialog);
							return;
						}
						await performSave(action);
						dialogStore.closeDialog(dialog);
					}
				}
			});
		}
		return (_ctx, _cache) => {
			const _component_i18n_t = resolveComponent("i18n-t");
			return openBlock(), createElementBlock("section", {
				class: "flex min-h-0 grow flex-col gap-6 overflow-auto",
				"aria-labelledby": "partner-node-access-title",
				onScroll: _cache[4] || (_cache[4] = (...args) => unref(handlePanelScroll) && unref(handlePanelScroll)(...args))
			}, [
				createBaseVNode("h2", _hoisted_1$10, toDisplayString(_ctx.$t("workspacePanel.partnerNodes.title")), 1),
				createBaseVNode("div", _hoisted_2$9, [
					createBaseVNode("span", {
						class: "shrink-0",
						onClick: withModifiers(requestAccessModeToggle, ["prevent"])
					}, [createVNode(Switch_default, {
						"model-value": !isRestricted.value,
						readonly: "",
						disabled: !isGated.value && (!canEditPolicy.value || unref(isSaving)),
						"aria-label": _ctx.$t("workspacePanel.partnerNodes.accessMode"),
						class: normalizeClass(unref(cn)("transition-transform active:scale-90", isGated.value && "opacity-60"))
					}, null, 8, [
						"model-value",
						"disabled",
						"aria-label",
						"class"
					])]),
					createBaseVNode("div", _hoisted_3$6, [createBaseVNode("div", _hoisted_4$6, [createBaseVNode("p", _hoisted_5$6, toDisplayString(_ctx.$t("workspacePanel.partnerNodes.allowAll")), 1), isGated.value ? (openBlock(), createElementBlock("span", _hoisted_6$6, toDisplayString(_ctx.$t("workspacePanel.partnerNodes.enterpriseBadge")), 1)) : createCommentVNode("", true)]), isGated.value ? (openBlock(), createElementBlock("p", _hoisted_7$6, toDisplayString(_ctx.$t("workspacePanel.partnerNodes.gatedHint")), 1)) : isPolicyLoaded.value && !isRestricted.value ? (openBlock(), createElementBlock("p", _hoisted_8$6, toDisplayString(_ctx.$t("workspacePanel.partnerNodes.allowAllOnHint")), 1)) : isPolicyLoaded.value ? (openBlock(), createElementBlock("p", _hoisted_9$4, [_cache[5] || (_cache[5] = createBaseVNode("i", {
						class: "icon-[lucide--circle-alert] size-4 shrink-0 text-warning-background",
						"aria-hidden": "true"
					}, null, -1)), createBaseVNode("span", null, toDisplayString(_ctx.$t("workspacePanel.partnerNodes.allowAllOffHint")), 1)])) : createCommentVNode("", true)]),
					isGated.value ? (openBlock(), createBlock(Button_default, {
						key: 0,
						variant: "inverted",
						size: "lg",
						class: "shrink-0 self-center",
						onClick: openEnterprisePage
					}, {
						default: withCtx(() => [createTextVNode(toDisplayString(_ctx.$t("workspacePanel.partnerNodes.contactUs")), 1)]),
						_: 1
					})) : createCommentVNode("", true)
				]),
				isReadOnly.value ? (openBlock(), createElementBlock("p", _hoisted_10$4, toDisplayString(_ctx.$t("workspacePanel.partnerNodes.ownerOnly")), 1)) : createCommentVNode("", true),
				unref(status) === "loading" ? (openBlock(), createElementBlock("div", {
					key: 1,
					"aria-label": _ctx.$t("workspacePanel.partnerNodes.loading"),
					class: "space-y-3"
				}, [createVNode(Skeleton_default, { class: "h-10 w-full" }), (openBlock(), createElementBlock(Fragment, null, renderList(5, (index) => {
					return createVNode(Skeleton_default, {
						key: index,
						class: "h-12 w-full"
					});
				}), 64))], 8, _hoisted_11$4)) : unref(status) === "error" ? (openBlock(), createElementBlock("div", _hoisted_12$3, [createBaseVNode("p", _hoisted_13$3, toDisplayString(_ctx.$t("workspacePanel.partnerNodes.loadError")), 1), createVNode(Button_default, {
					variant: "secondary",
					onClick: unref(loadPolicy)
				}, {
					default: withCtx(() => [createTextVNode(toDisplayString(_ctx.$t("workspacePanel.partnerNodes.retry")), 1)]),
					_: 1
				}, 8, ["onClick"])])) : unref(status) === "ineligible" && !isGated.value || unref(status) === "inactive" ? (openBlock(), createElementBlock("div", _hoisted_14$2, [createBaseVNode("p", _hoisted_15$1, toDisplayString(_ctx.$t("workspacePanel.partnerNodes.unavailable")), 1)])) : (openBlock(), createElementBlock(Fragment, { key: 4 }, [
					createBaseVNode("div", _hoisted_16$1, [createBaseVNode("label", _hoisted_17$1, [createBaseVNode("span", _hoisted_18$1, toDisplayString(_ctx.$t("workspacePanel.partnerNodes.searchPlaceholder")), 1), createVNode(SearchInput_default, {
						modelValue: searchQuery.value,
						"onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => searchQuery.value = $event),
						placeholder: _ctx.$t("workspacePanel.partnerNodes.searchPlaceholder"),
						size: "lg",
						class: "w-full"
					}, null, 8, ["modelValue", "placeholder"])]), isRestricted.value ? (openBlock(), createBlock(Menu_default, {
						key: 0,
						items: bulkMenuEntries.value,
						modal: false
					}, {
						trigger: withCtx(() => [createVNode(Button_default, {
							variant: "secondary",
							size: "lg",
							disabled: unref(isSaving) || !canEditPolicy.value
						}, {
							default: withCtx(() => [createTextVNode(toDisplayString(_ctx.$t("workspacePanel.partnerNodes.disableAll")) + " ", 1), _cache[6] || (_cache[6] = createBaseVNode("i", {
								class: "icon-[lucide--chevron-down] size-4",
								"aria-hidden": "true"
							}, null, -1))]),
							_: 1
						}, 8, ["disabled"])]),
						_: 1
					}, 8, ["items"])) : createCommentVNode("", true)]),
					saveError.value ? (openBlock(), createElementBlock("p", _hoisted_19$1, toDisplayString(_ctx.$t("workspacePanel.partnerNodes.saveError")), 1)) : createCommentVNode("", true),
					createBaseVNode("div", {
						role: "table",
						"aria-label": _ctx.$t("workspacePanel.partnerNodes.tableLabel"),
						class: "flex min-h-0 grow flex-col rounded-2xl border border-interface-stroke px-4 py-3"
					}, [createBaseVNode("div", _hoisted_21$1, [
						createBaseVNode("div", {
							role: "row",
							class: normalizeClass(unref(cn)("sticky -top-px z-10 grid h-10 items-center gap-2 border-b border-border-default bg-base-background px-2 text-sm text-muted-foreground", rowGridClass))
						}, [
							createBaseVNode("span", {
								role: "columnheader",
								"aria-sort": sortField.value === "provider" ? sortDirection.value : "none"
							}, [createVNode(Button_default, {
								variant: "textonly",
								size: "unset",
								class: "-m-2 gap-2 p-2 text-sm font-normal text-muted-foreground",
								onClick: _cache[1] || (_cache[1] = ($event) => sortBy("provider"))
							}, {
								default: withCtx(() => [createTextVNode(toDisplayString(_ctx.$t("workspacePanel.partnerNodes.columns.provider")) + " ", 1), createBaseVNode("i", {
									class: normalizeClass(unref(cn)("size-4 transition-transform", sortIcon("provider"))),
									"aria-hidden": "true"
								}, null, 2)]),
								_: 1
							})], 8, _hoisted_22$1),
							createBaseVNode("span", {
								role: "columnheader",
								"aria-sort": sortField.value === "models" ? sortDirection.value : "none",
								class: "hidden lg:block"
							}, [createVNode(Button_default, {
								variant: "textonly",
								size: "unset",
								class: "-m-2 gap-2 p-2 text-sm font-normal text-muted-foreground",
								onClick: _cache[2] || (_cache[2] = ($event) => sortBy("models"))
							}, {
								default: withCtx(() => [createTextVNode(toDisplayString(_ctx.$t("workspacePanel.partnerNodes.columns.models")) + " ", 1), createBaseVNode("i", {
									class: normalizeClass(unref(cn)("size-4 transition-transform", sortIcon("models"))),
									"aria-hidden": "true"
								}, null, 2)]),
								_: 1
							})], 8, _hoisted_23$1),
							createBaseVNode("span", {
								role: "columnheader",
								"aria-sort": sortField.value === "state" ? sortDirection.value : "none",
								class: "hidden lg:flex lg:justify-end"
							}, [isRestricted.value ? (openBlock(), createBlock(Button_default, {
								key: 0,
								variant: "textonly",
								size: "unset",
								class: "-m-2 gap-2 p-2 text-sm font-normal text-muted-foreground",
								onClick: _cache[3] || (_cache[3] = ($event) => sortBy("state"))
							}, {
								default: withCtx(() => [createTextVNode(toDisplayString(_ctx.$t("workspacePanel.partnerNodes.columns.state")) + " ", 1), createBaseVNode("i", {
									class: normalizeClass(unref(cn)("size-4 transition-transform", sortIcon("state"))),
									"aria-hidden": "true"
								}, null, 2)]),
								_: 1
							})) : createCommentVNode("", true)], 8, _hoisted_24$1)
						], 2),
						(openBlock(true), createElementBlock(Fragment, null, renderList(sortedProviders.value, (provider) => {
							return openBlock(), createElementBlock(Fragment, { key: provider.id }, [createBaseVNode("div", {
								role: "row",
								class: normalizeClass(unref(cn)("grid h-10 items-center gap-2 border-b border-secondary-background px-2 last:border-b-0 hover:bg-secondary-background/40", rowGridClass))
							}, [
								createBaseVNode("div", _hoisted_25$1, [createVNode(Button_default, {
									variant: "textonly",
									size: "unset",
									class: "h-10 w-full justify-start gap-2 p-0 text-left font-normal hover:bg-transparent",
									"aria-expanded": isProviderExpanded(provider),
									onClick: ($event) => toggleExpanded(provider.id)
								}, {
									default: withCtx(() => [
										createBaseVNode("i", {
											class: normalizeClass(unref(cn)("size-4 shrink-0 text-muted-foreground transition-transform", "icon-[lucide--chevron-down]", !isProviderExpanded(provider) && "-rotate-90")),
											"aria-hidden": "true"
										}, null, 2),
										createBaseVNode("span", _hoisted_26$1, [createBaseVNode("i", { class: normalizeClass(unref(cn)(unref(getProviderIcon)(provider.nodeCategories[0] ?? provider.displayName), "size-3")) }, null, 2)]),
										createBaseVNode("span", _hoisted_27$1, toDisplayString(provider.displayName), 1)
									]),
									_: 2
								}, 1032, ["aria-expanded", "onClick"])]),
								createBaseVNode("span", _hoisted_28$1, toDisplayString(provider.totalModelCount !== void 0 && provider.nodes.length < provider.totalModelCount ? _ctx.$t("workspacePanel.partnerNodes.matchedModelCount", {
									matched: provider.nodes.length,
									total: provider.totalModelCount
								}, provider.nodes.length) : _ctx.$t("workspacePanel.partnerNodes.modelCount", provider.nodes.length)), 1),
								createBaseVNode("div", _hoisted_29$1, [isRestricted.value ? (openBlock(), createBlock(Switch_default, {
									key: 0,
									"model-value": provider.enabled,
									disabled: unref(isSaving) || !canEditPolicy.value,
									"aria-label": _ctx.$t("workspacePanel.partnerNodes.toggleProvider", { provider: provider.displayName }),
									class: "transition-transform active:scale-90",
									"onUpdate:modelValue": ($event) => saveProviderChange(provider.id, $event)
								}, null, 8, [
									"model-value",
									"disabled",
									"aria-label",
									"onUpdate:modelValue"
								])) : createCommentVNode("", true)])
							], 2), (openBlock(true), createElementBlock(Fragment, null, renderList(isProviderExpanded(provider) ? provider.nodes : [], (node) => {
								return openBlock(), createElementBlock("div", {
									key: node.id,
									role: "row",
									class: normalizeClass(unref(cn)("grid h-10 items-center gap-2 border-b border-secondary-background px-2 text-sm last:border-b-0", rowGridClass))
								}, [
									createBaseVNode("span", _hoisted_30$1, toDisplayString(node.name), 1),
									_cache[7] || (_cache[7] = createBaseVNode("span", {
										role: "cell",
										class: "hidden lg:block"
									}, null, -1)),
									_cache[8] || (_cache[8] = createBaseVNode("span", { role: "cell" }, null, -1))
								], 2);
							}), 128))], 64);
						}), 128)),
						sortedProviders.value.length === 0 ? (openBlock(), createElementBlock("div", _hoisted_31$1, toDisplayString(_ctx.$t("workspacePanel.partnerNodes.noResults")), 1)) : createCommentVNode("", true)
					]), sortedProviders.value.length > 0 ? (openBlock(), createElementBlock("div", _hoisted_32$1, [createVNode(_component_i18n_t, {
						keypath: "workspacePanel.partnerNodes.allowedSummary",
						tag: "span",
						scope: "global"
					}, {
						count: withCtx(() => [createBaseVNode("span", _hoisted_33$1, toDisplayString(isRestricted.value ? enabledModelCount.value : _ctx.$t("workspacePanel.partnerNodes.allowedSummaryAll")), 1)]),
						_: 1
					})])) : createCommentVNode("", true)], 8, _hoisted_20$1)
				], 64))
			], 32);
		};
	}
});
//#endregion
//#region src/platform/cloud/subscription/composables/useSubscriptionActions.ts
/**
* Composable for handling subscription panel actions and loading states
*/
function useSubscriptionActions() {
	const dialogService = useDialogService();
	const commandStore = useCommandStore();
	const telemetry = useTelemetry();
	const { fetchBalance, fetchStatus } = useBillingContext();
	const { wrapWithErrorHandlingAsync, toastErrorHandler } = useErrorHandling();
	const isLoadingSupport = ref(false);
	onMounted(() => {
		handleRefresh();
	});
	const handleAddApiCredits = () => {
		telemetry?.trackAddApiCreditButtonClicked({ source: "settings_billing_panel" });
		dialogService.showTopUpCreditsDialog({ source: paymentIntentSourceForAddCreditsClick("settings_billing_panel") });
	};
	const reportSupportFailure = (error) => {
		reportError(error, {
			surface: "billing",
			errorType: "contact_support_failed"
		});
		toastErrorHandler(error);
	};
	const handleMessageSupport = wrapWithErrorHandlingAsync(async () => {
		isLoadingSupport.value = true;
		telemetry?.trackHelpResourceClicked({
			resource_type: "help_feedback",
			is_external: true,
			source: "subscription"
		});
		await commandStore.execute("Comfy.ContactSupport");
	}, reportSupportFailure, () => {
		isLoadingSupport.value = false;
	});
	const handleRefresh = async () => {
		try {
			await Promise.all([fetchBalance(), fetchStatus()]);
		} catch (error) {
			console.error("[useSubscriptionActions] Error refreshing data:", error);
		}
	};
	const handleLearnMoreClick = () => {
		window.open("https://docs.comfy.org/get_started/cloud", "_blank");
	};
	return {
		isLoadingSupport,
		handleAddApiCredits,
		handleMessageSupport,
		handleRefresh,
		handleLearnMoreClick
	};
}
//#endregion
//#region src/platform/cloud/subscription/components/SubscriptionFooterLinks.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1$9 = { class: "flex items-center justify-between pt-3 pb-6" };
var _hoisted_2$8 = { class: "flex gap-2" };
//#endregion
//#region src/platform/cloud/subscription/components/SubscriptionFooterLinks.vue
var SubscriptionFooterLinks_default = /* @__PURE__ */ defineComponent({
	__name: "SubscriptionFooterLinks",
	props: {
		showInvoiceHistory: {
			type: Boolean,
			default: true
		},
		showUsageActivity: {
			type: Boolean,
			default: true
		},
		showPlansLink: {
			type: Boolean,
			default: false
		}
	},
	emits: ["viewPlans"],
	setup(__props) {
		const { buildDocsUrl, docsPaths } = useExternalLink();
		const { manageSubscription } = useBillingContext();
		const { isLoadingSupport, handleMessageSupport } = useSubscriptionActions();
		async function handleInvoiceHistory() {
			if (!__props.showInvoiceHistory) return;
			await manageSubscription();
		}
		function handleFullUsageActivity() {
			window.open(platformLink("/profile/usage"), "_blank", "noopener");
		}
		function handleOpenPartnerNodesInfo() {
			window.open(buildDocsUrl(docsPaths.partnerNodesPricing, { includeLocale: true }), "_blank");
		}
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", _hoisted_1$9, [createBaseVNode("div", _hoisted_2$8, [
				__props.showUsageActivity ? (openBlock(), createBlock(Button_default, {
					key: 0,
					variant: "muted-textonly",
					class: "text-xs text-text-secondary",
					onClick: handleFullUsageActivity
				}, {
					default: withCtx(() => [_cache[1] || (_cache[1] = createBaseVNode("i", { class: "pi pi-external-link text-xs text-text-secondary" }, null, -1)), createTextVNode(" " + toDisplayString(_ctx.$t("subscription.fullUsageActivity")), 1)]),
					_: 1
				})) : createCommentVNode("", true),
				__props.showPlansLink ? (openBlock(), createBlock(Button_default, {
					key: 1,
					variant: "muted-textonly",
					class: "text-xs text-text-secondary",
					onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("viewPlans"))
				}, {
					default: withCtx(() => [_cache[2] || (_cache[2] = createBaseVNode("i", { class: "pi pi-external-link text-xs text-text-secondary" }, null, -1)), createTextVNode(" " + toDisplayString(_ctx.$t("subscription.plansAndPricing")), 1)]),
					_: 1
				})) : createCommentVNode("", true),
				createVNode(Button_default, {
					variant: "muted-textonly",
					class: "text-xs text-text-secondary",
					onClick: handleOpenPartnerNodesInfo
				}, {
					default: withCtx(() => [_cache[3] || (_cache[3] = createBaseVNode("i", { class: "pi pi-question-circle text-xs text-text-secondary" }, null, -1)), createTextVNode(" " + toDisplayString(_ctx.$t("subscription.partnerNodesPricingTable")), 1)]),
					_: 1
				}),
				createVNode(Button_default, {
					variant: "muted-textonly",
					class: "text-xs text-text-secondary",
					loading: unref(isLoadingSupport),
					onClick: unref(handleMessageSupport)
				}, {
					default: withCtx(() => [_cache[4] || (_cache[4] = createBaseVNode("i", { class: "pi pi-comment text-xs text-text-secondary" }, null, -1)), createTextVNode(" " + toDisplayString(_ctx.$t("subscription.messageSupport")), 1)]),
					_: 1
				}, 8, ["loading", "onClick"])
			]), !unref(false) && __props.showInvoiceHistory ? (openBlock(), createBlock(Button_default, {
				key: 0,
				variant: "muted-textonly",
				class: "text-xs text-text-secondary",
				onClick: handleInvoiceHistory
			}, {
				default: withCtx(() => [createTextVNode(toDisplayString(_ctx.$t("subscription.invoiceHistory")) + " ", 1), _cache[5] || (_cache[5] = createBaseVNode("i", { class: "pi pi-external-link text-xs text-text-secondary" }, null, -1))]),
				_: 1
			})) : createCommentVNode("", true)]);
		};
	}
});
//#endregion
//#region src/platform/cloud/subscription/utils/tierBenefits.ts
function getCommonTierBenefits(key, t, n) {
	const benefits = [];
	const isFree = key === "free";
	if (isFree) {
		const credits = getTierCredits(key);
		if (credits) benefits.push({
			key: "monthlyCredits",
			type: "metric",
			value: n(credits),
			label: t("subscription.monthlyCreditsLabel")
		});
	}
	benefits.push({
		key: "maxDuration",
		type: "metric",
		value: t(`subscription.maxDuration.${key}`),
		label: t("subscription.maxDurationLabel")
	});
	benefits.push({
		key: "gpu",
		type: "feature",
		label: t("subscription.gpuLabel")
	});
	if (!isFree) benefits.push({
		key: "addCredits",
		type: "feature",
		label: t("subscription.addCreditsLabel")
	});
	if (getTierFeatures(key).customLoRAs) benefits.push({
		key: "customLoRAs",
		type: "feature",
		label: t("subscription.customLoRAsLabel")
	});
	return benefits;
}
//#endregion
//#region src/platform/workspace/composables/useWorkspaceMenuItems.ts
/**
* Builds the Plan & Credits overflow-menu model for the workspace subscription
* panel. Visibility and the Delete enable/disable policy are derived from the
* shared useWorkspaceUI state so this menu can't desync with the sibling
* Plan & Credits panel menu.
*/
function useWorkspaceMenuItems() {
	const { t, locale } = useI18n();
	const { billingStatus, isFreeTier, subscription } = useBillingContext();
	const { shouldUseWorkspaceBilling } = useBillingRouting();
	const { canCancel } = useBillingCapabilities();
	const { permissions, uiConfig, isInPersonalWorkspace, canAccessSubscriptionFeatures, isSubscriptionCancelled, isDeleteDisabled, deleteDisabledTooltipKey } = useWorkspaceUI();
	const { showCancelSubscriptionFlow, showEditWorkspaceDialog, showDeleteWorkspaceDialog, showLeaveWorkspaceDialog } = useDialogService();
	function editWorkspace() {
		showEditWorkspaceDialog();
	}
	function cancelSubscription() {
		if (!canCancelPlan.value) return;
		showCancelSubscriptionFlow(subscription.value?.endDate ?? void 0);
	}
	function deleteWorkspace() {
		if (!permissions.value.canManageSubscription || isInPersonalWorkspace.value || isDeleteDisabled.value) return;
		showDeleteWorkspaceDialog();
	}
	function leaveWorkspace() {
		if (!permissions.value.canLeaveWorkspace) return;
		showLeaveWorkspaceDialog();
	}
	const canCancelPlan = computed(() => {
		return permissions.value.canManageSubscriptionLifecycle && (canAccessSubscriptionFeatures.value || (billingStatus.value === "payment_failed" || billingStatus.value === "paused") && Boolean(subscription.value?.planSlug)) && !isSubscriptionCancelled.value && !isFreeTier.value && !isSalesManagedTier(subscription.value?.tier);
	});
	const canDeleteWorkspace = computed(() => permissions.value.canManageSubscription && !isInPersonalWorkspace.value && subscription.value?.tier !== "ENTERPRISE");
	const deleteTooltip = computed(() => {
		const planEndDate = formatSubscriptionDate(subscription.value?.endDate, locale.value);
		if (isDeleteDisabled.value && isSubscriptionCancelled.value && planEndDate) return t("workspacePanel.menu.deleteWorkspaceAfterPlanEndsTooltip", { date: planEndDate });
		const key = deleteDisabledTooltipKey.value;
		return key ? t(key) : void 0;
	});
	const menuItems = computed(() => {
		const items = [];
		if (uiConfig.value.showEditWorkspaceMenuItem) items.push({
			label: t("workspacePanel.menu.editWorkspace"),
			command: editWorkspace
		});
		if (canCancelPlan.value) items.push({
			label: t("subscription.cancelPlan"),
			command: cancelSubscription
		});
		if (canDeleteWorkspace.value) items.push({
			label: t("workspacePanel.menu.deleteWorkspace"),
			class: isDeleteDisabled.value ? "data-disabled:cursor-not-allowed data-disabled:text-destructive-background/50 data-disabled:pointer-events-auto" : "text-destructive-background",
			disabled: isDeleteDisabled.value,
			tooltip: deleteTooltip.value,
			command: isDeleteDisabled.value ? void 0 : deleteWorkspace
		});
		if (permissions.value.canLeaveWorkspace) items.push({
			label: t("workspacePanel.menu.leaveWorkspace"),
			command: leaveWorkspace
		});
		return items;
	});
	return {
		menuItems,
		menuEntries: computed(() => menuItems.value.flatMap((item, index) => index === 0 ? [item] : [{ separator: true }, item]))
	};
}
//#endregion
//#region src/platform/workspace/composables/useWorkspacePlanPricing.ts
/**
* Resolves the price shown in the Plan & Credits header into a ready-to-render
* string + unit label.
*
* Team pricing comes from the subscribed credit stop's per-month price (the
* cycle `price_cents` is the authoritative recurring charge; `stop_usd` only
* names the ladder rung). Both monthly and yearly stops are per-month figures.
* When the subscribed stop id is absent from the resolved ladder the facade is
* stale, so pricing warns and falls back to the per-member tier price rather
* than silently mispricing an active plan.
*/
function useWorkspacePlanPricing() {
	const { t, locale } = useI18n();
	const { subscription, teamCreditStops, currentTeamCreditStop, isTeamPlan } = useBillingContext();
	const isYearly = computed(() => subscription.value?.duration === "ANNUAL");
	const tierKey = computed(() => {
		const tier = subscription.value?.tier;
		if (!tier) return "free";
		return toTierKey(tier) ?? "standard";
	});
	const isPriceCycleUnknown = computed(() => !subscription.value?.duration && tierKey.value !== "free" && tierKey.value !== "founder");
	const subscribedStop = computed(() => {
		if (!isTeamPlan.value) return null;
		const id = currentTeamCreditStop.value?.id;
		const stops = teamCreditStops.value?.stops;
		if (!id || !stops) return null;
		return stops.find((stop) => stop.id === id) ?? null;
	});
	const hasStaleCreditStop = computed(() => !!currentTeamCreditStop.value && !!teamCreditStops.value && subscribedStop.value === null);
	const teamMonthlyCostCents = computed(() => {
		const stop = subscribedStop.value;
		if (!stop) return null;
		return isYearly.value ? stop.yearly.price_cents : stop.monthly.price_cents;
	});
	const displayPrice = computed(() => {
		const cents = teamMonthlyCostCents.value ?? getTierPrice(tierKey.value, isYearly.value) * 100;
		return formatUsdCents(locale.value, cents);
	});
	const priceUnitLabel = computed(() => teamMonthlyCostCents.value !== null || !isTeamPlan.value ? t("subscription.usdPerMonth") : t("subscription.usdPerMonthPerMember"));
	watch(hasStaleCreditStop, (isStale) => {
		if (isStale) console.warn(`Subscribed credit stop "${currentTeamCreditStop.value?.id}" not found in the resolved ladder; falling back to per-member pricing.`);
	});
	return {
		isPriceCycleUnknown,
		displayPrice,
		priceUnitLabel
	};
}
//#endregion
//#region src/platform/workspace/components/SubscriptionPanelContentWorkspace.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1$8 = {
	key: 0,
	class: "rounded-2xl border border-interface-stroke p-6"
};
var _hoisted_2$7 = { class: "flex items-center gap-2 py-4 text-muted-foreground" };
var _hoisted_3$5 = {
	key: 1,
	class: "rounded-2xl border border-interface-stroke p-6"
};
var _hoisted_4$5 = { class: "flex items-center gap-2 py-4 text-muted-foreground" };
var _hoisted_5$5 = {
	key: 2,
	class: "flex flex-col items-start gap-3 rounded-2xl border border-interface-stroke p-6"
};
var _hoisted_6$5 = { class: "flex items-center gap-2 text-text-secondary" };
var _hoisted_7$5 = { class: "text-sm" };
var _hoisted_8$5 = {
	key: 0,
	"data-testid": "subscription-state-card",
	class: "mb-6 flex gap-1 rounded-2xl border border-warning-background bg-warning-background/20 p-4"
};
var _hoisted_9$3 = { class: "flex flex-col gap-2" };
var _hoisted_10$3 = { class: "m-0 pt-1.5 text-sm font-bold text-text-primary" };
var _hoisted_11$3 = { class: "m-0 text-sm text-text-secondary" };
var _hoisted_12$2 = { class: "rounded-2xl border border-interface-stroke p-6" };
var _hoisted_13$2 = { class: "flex flex-col gap-4 md:flex-row md:items-center md:justify-between md:gap-2" };
var _hoisted_14$1 = { class: "flex flex-col gap-2" };
var _hoisted_15 = { class: "text-sm text-text-secondary" };
var _hoisted_16 = { class: "flex flex-wrap gap-2 md:ml-auto" };
var _hoisted_17 = {
	key: 1,
	class: "flex flex-col gap-2"
};
var _hoisted_18 = { class: "m-0 text-sm font-bold text-text-primary" };
var _hoisted_19 = { class: "text-sm text-text-secondary" };
var _hoisted_20 = { class: "flex flex-col gap-2" };
var _hoisted_21 = { class: "m-0 text-base font-bold text-text-primary" };
var _hoisted_22 = {
	key: 0,
	class: "flex items-baseline gap-1 font-inter"
};
var _hoisted_23 = { class: "text-2xl font-semibold" };
var _hoisted_24 = { class: "text-base" };
var _hoisted_25 = { class: "flex flex-wrap gap-2 md:ml-auto" };
var _hoisted_26 = { class: "flex flex-col gap-2" };
var _hoisted_27 = { class: "flex items-center gap-2" };
var _hoisted_28 = { class: "m-0 text-base font-bold text-text-primary" };
var _hoisted_29 = {
	key: 0,
	class: "flex items-baseline gap-1 font-inter"
};
var _hoisted_30 = { class: "text-2xl font-semibold" };
var _hoisted_31 = { class: "text-base" };
var _hoisted_32 = {
	key: 1,
	class: "text-sm text-text-secondary"
};
var _hoisted_33 = {
	key: 2,
	class: "m-0 text-sm text-text-secondary"
};
var _hoisted_34 = {
	key: 0,
	class: "flex flex-wrap gap-2 md:ml-auto"
};
var _hoisted_35 = { class: "flex flex-col gap-6 pt-6 lg:flex-row lg:items-stretch" };
var _hoisted_36 = { class: "w-full lg:max-w-md" };
var _hoisted_37 = {
	key: 0,
	class: "flex flex-col gap-2"
};
var _hoisted_38 = { class: "text-text-primary" };
var _hoisted_39 = {
	key: 1,
	class: "text-sm text-muted"
};
var _hoisted_40 = {
	key: 2,
	class: "text-sm text-text-primary"
};
var _hoisted_41 = { class: "flex flex-col gap-0" };
var _hoisted_42 = {
	key: 1,
	class: "text-sm font-normal whitespace-nowrap text-text-primary"
};
var _hoisted_43 = { class: "text-sm text-muted" };
//#endregion
//#region src/platform/workspace/components/SubscriptionPanelContentWorkspace.vue
var SubscriptionPanelContentWorkspace_default = /*#__PURE__*/ _plugin_vue_export_helper_default(/* @__PURE__ */ defineComponent({
	__name: "SubscriptionPanelContentWorkspace",
	setup(__props) {
		const { handlePanelScroll } = useSettingsHeaderCollapse();
		const workspaceStore = useTeamWorkspaceStore();
		const { isWorkspaceSubscribed, isInPersonalWorkspace } = storeToRefs(workspaceStore);
		const { permissions, isSubscriptionCancelled, workspaceRole, canReactivatePlan, canOpenPricingSurface } = useWorkspaceUI();
		const { canChangeSeats, canSubscribeSelfServe } = useBillingCapabilities();
		const { maxAvailable: freeRunsAllowance, quotaEnabled: freeRunsQuotaEnabled } = useFreeTierQuota();
		const { t, n, locale } = useI18n();
		const { isSettingUp, subscriptionActionUrl } = useSubscriptionOperationView();
		function openSubscriptionVerification() {
			if (!subscriptionActionUrl.value) return;
			window.open(subscriptionActionUrl.value, "_blank", "noopener,noreferrer");
		}
		const { canAccessSubscriptionFeatures, isFreeTier: isFreeTierPlan, isTeamPlan, subscription, billingStatus, subscriptionStatus, isLoading, error, showSubscriptionDialog, manageSubscription, initialize } = useBillingContext();
		const { showPricingTable } = useSubscriptionDialog();
		const { isResubscribing, handleResubscribe } = useResubscribe();
		const { displayPrice, priceUnitLabel, isPriceCycleUnknown } = useWorkspacePlanPricing();
		const { menuEntries } = useWorkspaceMenuItems();
		const isSubscriptionEnded = computed(() => {
			if (subscriptionStatus.value === "ended") return true;
			if (canAccessSubscriptionFeatures.value) return false;
			return isSubscriptionCancelled.value || isInPersonalWorkspace.value && billingStatus.value === "inactive";
		});
		const showSubscribePrompt = computed(() => {
			if (!permissions.value.canManageSubscription) return false;
			if (isSubscriptionEnded.value) return true;
			if (isSubscriptionCancelled.value) return false;
			if (subscription.value && !isFreeTierPlan.value && (subscription.value.planSlug || subscription.value.tier)) return false;
			if (isInPersonalWorkspace.value) return !canAccessSubscriptionFeatures.value;
			return !isWorkspaceSubscribed.value;
		});
		const canChangePlan = computed(() => permissions.value.canManageSubscription);
		const showTeamSubscribePrompt = computed(() => showSubscribePrompt.value && !isInPersonalWorkspace.value && isSubscriptionEnded.value && isTeamPlan.value);
		const showInactiveTeamSubscription = computed(() => permissions.value.canManageSubscription && !isInPersonalWorkspace.value && isSubscriptionEnded.value && isTeamPlan.value);
		const isPersonalFree = computed(() => isInPersonalWorkspace.value && (showSubscribePrompt.value || isFreeTierPlan.value));
		const isTeamActive = computed(() => isTeamPlan.value && canAccessSubscriptionFeatures.value);
		const isMemberView = computed(() => !permissions.value.canManageSubscription && !canAccessSubscriptionFeatures.value && !isWorkspaceSubscribed.value);
		const showZeroState = computed(() => showTeamSubscribePrompt.value || isMemberView.value);
		function handleSubscribeWorkspace() {
			showSubscriptionDialog({ reason: "settings_billing_panel" });
		}
		function handleUpgrade() {
			if (isFreeTierPlan.value) showPricingTable({ reason: "settings_billing_panel" });
			else showSubscriptionDialog({ reason: "settings_billing_panel" });
		}
		function handleViewMoreDetails() {
			window.open("https://comfy.org/cloud/pricing/", "_blank");
		}
		async function handleRetry() {
			await initialize();
		}
		const isYearlySubscription = computed(() => subscription.value?.duration === "ANNUAL");
		const formattedRenewalDate = computed(() => formatSubscriptionDate(subscription.value?.renewalDate, locale.value));
		const formattedEndDate = computed(() => formatSubscriptionDate(subscription.value?.endDate, locale.value));
		const { scheduledChange, planName: scheduledPlanName, formattedDate: formattedChangeDate } = useScheduledPlanChange();
		const isNonCatalogPlan = computed(() => isSalesManagedTier(subscription.value?.tier));
		const isEnterprisePlan = computed(() => subscription.value?.tier === "ENTERPRISE");
		const isEndedEnterprise = computed(() => isEnterprisePlan.value && isSubscriptionEnded.value);
		const hasScheduledEnterpriseEnd = computed(() => {
			const endDate = subscription.value?.endDate;
			if (!isEnterprisePlan.value || !endDate) return false;
			return !Number.isNaN(Date.parse(endDate));
		});
		const now = useTimestamp({ interval: 6e4 });
		const isQuietEnterpriseEnding = computed(() => hasScheduledEnterpriseEnd.value && !isWithinEnterpriseEndingNotice(subscription.value?.endDate, now.value));
		const { kind: billingBannerKind } = useBillingBanner();
		const showSubscriptionStateCard = computed(() => isSubscriptionCancelled.value && !isSubscriptionEnded.value && !hasScheduledEnterpriseEnd.value && billingBannerKind.value !== "ending");
		const subscriptionStateCardTitle = computed(() => t("subscription.canceledCard.title"));
		const subscriptionStateCardDescription = computed(() => formattedEndDate.value ? t("subscription.canceledCard.description", { date: formattedEndDate.value }) : t("subscription.canceledCard.descriptionWithoutDate"));
		const planStatusBadge = computed(() => {
			if (isSubscriptionEnded.value) return {
				label: t("subscription.inactive.badge"),
				severity: "secondary"
			};
			if (isSubscriptionCancelled.value && !hasScheduledEnterpriseEnd.value) return {
				label: t("subscription.canceled"),
				severity: "warn"
			};
			return null;
		});
		const planDateDisplay = computed(() => {
			if (!canAccessSubscriptionFeatures.value || isSubscriptionEnded.value) return "";
			if (isSubscriptionCancelled.value) {
				if (isQuietEnterpriseEnding.value) return "";
				return formattedEndDate.value ? t("subscription.endsOnDate", { date: formattedEndDate.value }) : "";
			}
			if (scheduledChange.value) return scheduledPlanName.value && formattedChangeDate.value ? t("subscription.changesToPlanOnDate", {
				plan: scheduledPlanName.value,
				date: formattedChangeDate.value
			}) : "";
			return formattedRenewalDate.value ? t("subscription.renewsOnDate", { date: formattedRenewalDate.value }) : "";
		});
		const subscriptionTierName = computed(() => {
			const tier = subscription.value?.tier;
			if (!tier) return "";
			const key = resolveSubscriptionTierKey(tier);
			const baseName = t(`subscription.tiers.${key}.name`);
			return isYearlySubscription.value ? t("subscription.tierNameYearly", { name: baseName }) : baseName;
		});
		const planDisplayName = computed(() => {
			if (isEnterprisePlan.value) return t("subscription.tiers.enterprise.name");
			if (isNonCatalogPlan.value) return t("subscription.unknownTierName");
			return isTeamPlan.value ? t("subscription.teamPlanName") : subscriptionTierName.value;
		});
		const tierKey = computed(() => resolveSubscriptionTierKey(subscription.value?.tier));
		const TEAM_PERK_KEYS = [
			"inviteMembers",
			"concurrentRuns",
			"sharedCreditPool",
			"rolePermissions"
		];
		const tierBenefits = computed(() => {
			if (isNonCatalogPlan.value) return [];
			if (isTeamActive.value || showInactiveTeamSubscription.value) return TEAM_PERK_KEYS.map((key) => ({
				key,
				type: "feature",
				label: t(`subscription.teamPerks.${key}`)
			}));
			if (isPersonalFree.value) return [...freeRunsQuotaEnabled.value ? [{
				key: "freeRuns",
				type: "feature",
				label: t("subscription.freePerks.freeRuns", freeRunsAllowance.value)
			}] : [], {
				key: "maxRuntime",
				type: "feature",
				label: t("subscription.freePerks.maxRuntime", { duration: t("subscription.maxDuration.free") })
			}];
			return getCommonTierBenefits(tierKey.value, t, n);
		});
		return (_ctx, _cache) => {
			const _component_i18n_t = resolveComponent("i18n-t");
			const _directive_tooltip = resolveDirective("tooltip");
			return openBlock(), createElementBlock("div", {
				class: "flex grow flex-col overflow-auto pt-2",
				onScroll: _cache[0] || (_cache[0] = (...args) => unref(handlePanelScroll) && unref(handlePanelScroll)(...args))
			}, [unref(isSettingUp) ? (openBlock(), createElementBlock("div", _hoisted_1$8, [createBaseVNode("div", _hoisted_2$7, [_cache[1] || (_cache[1] = createBaseVNode("i", { class: "pi pi-spin pi-spinner" }, null, -1)), createBaseVNode("span", null, toDisplayString(_ctx.$t("billingOperation.subscriptionProcessing")), 1)]), unref(subscriptionActionUrl) && unref(permissions).canManageSubscription ? (openBlock(), createBlock(Button_default, {
				key: 0,
				variant: "primary",
				size: "lg",
				class: "rounded-lg px-4 text-sm font-normal",
				onClick: openSubscriptionVerification
			}, {
				default: withCtx(() => [createTextVNode(toDisplayString(_ctx.$t("subscription.preview.completeVerification")), 1)]),
				_: 1
			})) : createCommentVNode("", true)])) : unref(isLoading) && !unref(subscription) ? (openBlock(), createElementBlock("div", _hoisted_3$5, [createBaseVNode("div", _hoisted_4$5, [_cache[2] || (_cache[2] = createBaseVNode("i", { class: "pi pi-spin pi-spinner" }, null, -1)), createBaseVNode("span", null, toDisplayString(_ctx.$t("g.loading")), 1)])])) : unref(error) && !unref(subscription) ? (openBlock(), createElementBlock("div", _hoisted_5$5, [createBaseVNode("div", _hoisted_6$5, [_cache[3] || (_cache[3] = createBaseVNode("i", { class: "pi pi-exclamation-circle text-destructive-background" }, null, -1)), createBaseVNode("span", _hoisted_7$5, toDisplayString(_ctx.$t("subscription.planLoadError")), 1)]), createVNode(Button_default, {
				variant: "secondary",
				size: "lg",
				class: "rounded-lg px-4 text-sm font-normal",
				loading: unref(isLoading),
				onClick: handleRetry
			}, {
				default: withCtx(() => [createTextVNode(toDisplayString(_ctx.$t("subscription.planLoadErrorRetry")), 1)]),
				_: 1
			}, 8, ["loading"])])) : (openBlock(), createElementBlock(Fragment, { key: 3 }, [
				showSubscriptionStateCard.value ? (openBlock(), createElementBlock("div", _hoisted_8$5, [_cache[4] || (_cache[4] = createBaseVNode("div", { class: "flex size-8 shrink-0 items-center justify-center rounded-full text-warning-background" }, [createBaseVNode("i", { class: "pi pi-info-circle" })], -1)), createBaseVNode("div", _hoisted_9$3, [createBaseVNode("h2", _hoisted_10$3, toDisplayString(subscriptionStateCardTitle.value), 1), createBaseVNode("p", _hoisted_11$3, toDisplayString(subscriptionStateCardDescription.value), 1)])])) : createCommentVNode("", true),
				createBaseVNode("div", _hoisted_12$2, [createBaseVNode("div", null, [createBaseVNode("div", _hoisted_13$2, [showTeamSubscribePrompt.value ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [createBaseVNode("div", _hoisted_14$1, [createBaseVNode("h3", { class: normalizeClass(unref(cn)("m-0 font-bold text-text-primary", showInactiveTeamSubscription.value ? "text-base" : "text-sm")) }, toDisplayString(_ctx.$t(showInactiveTeamSubscription.value ? "subscription.inactiveTeamTitle" : "subscription.workspaceNotSubscribed")), 3), createBaseVNode("div", _hoisted_15, toDisplayString(_ctx.$t(showInactiveTeamSubscription.value ? "subscription.inactiveTeamDescription" : "subscription.subscriptionRequiredMessage")), 1)]), createBaseVNode("div", _hoisted_16, [
					unref(permissions).canManageSubscription && (unref(false) || showInactiveTeamSubscription.value) ? (openBlock(), createBlock(Button_default, {
						key: 0,
						size: "lg",
						variant: "secondary",
						class: "rounded-lg bg-interface-menu-component-surface-selected px-4 text-sm font-normal text-text-primary",
						onClick: unref(manageSubscription)
					}, {
						default: withCtx(() => [createTextVNode(toDisplayString(_ctx.$t("subscription.billingAndInvoices")), 1)]),
						_: 1
					}, 8, ["onClick"])) : createCommentVNode("", true),
					createVNode(Button_default, {
						variant: "primary",
						size: "lg",
						class: "rounded-lg px-4 py-2 text-sm font-normal",
						onClick: handleSubscribeWorkspace
					}, {
						default: withCtx(() => [createTextVNode(toDisplayString(_ctx.$t(showInactiveTeamSubscription.value ? "subscription.reactivatePlan" : "subscription.subscribeNow")), 1)]),
						_: 1
					}),
					showInactiveTeamSubscription.value && unref(menuEntries).length > 0 ? (openBlock(), createBlock(Menu_default, {
						key: 1,
						items: unref(menuEntries)
					}, {
						trigger: withCtx(() => [withDirectives(createVNode(Button_default, {
							variant: "secondary",
							size: "icon-lg",
							icon: "icon-[lucide--ellipsis]",
							"aria-label": _ctx.$t("g.moreOptions")
						}, null, 8, ["aria-label"]), [[_directive_tooltip, {
							value: _ctx.$t("g.moreOptions"),
							showDelay: 300
						}]])]),
						_: 1
					}, 8, ["items"])) : createCommentVNode("", true)
				])], 64)) : isMemberView.value ? (openBlock(), createElementBlock("div", _hoisted_17, [createBaseVNode("h3", _hoisted_18, toDisplayString(_ctx.$t("subscription.workspaceNotSubscribed")), 1), createBaseVNode("div", _hoisted_19, toDisplayString(_ctx.$t("subscription.contactOwnerToSubscribe")), 1)])) : isPersonalFree.value ? (openBlock(), createElementBlock(Fragment, { key: 2 }, [createBaseVNode("div", _hoisted_20, [createBaseVNode("h3", _hoisted_21, toDisplayString(_ctx.$t("subscription.tiers.free.name")), 1), !unref(isPriceCycleUnknown) ? (openBlock(), createElementBlock("div", _hoisted_22, [createBaseVNode("span", _hoisted_23, toDisplayString(unref(displayPrice)), 1), createBaseVNode("span", _hoisted_24, toDisplayString(unref(priceUnitLabel)), 1)])) : createCommentVNode("", true)]), createBaseVNode("div", _hoisted_25, [
					unref(false) && unref(permissions).canManageSubscription ? (openBlock(), createBlock(Button_default, {
						key: 0,
						size: "lg",
						variant: "secondary",
						class: "rounded-lg bg-interface-menu-component-surface-selected px-4 text-sm font-normal text-text-primary",
						onClick: unref(manageSubscription)
					}, {
						default: withCtx(() => [createTextVNode(toDisplayString(_ctx.$t("subscription.billingAndInvoices")), 1)]),
						_: 1
					}, 8, ["onClick"])) : createCommentVNode("", true),
					createVNode(Button_default, {
						variant: "primary",
						size: "lg",
						class: "rounded-lg px-4 text-sm font-normal",
						onClick: handleSubscribeWorkspace
					}, {
						default: withCtx(() => [createTextVNode(toDisplayString(_ctx.$t("subscription.subscribe")), 1)]),
						_: 1
					}),
					unref(menuEntries).length > 0 ? (openBlock(), createBlock(Menu_default, {
						key: 1,
						items: unref(menuEntries)
					}, {
						trigger: withCtx(() => [withDirectives(createVNode(Button_default, {
							variant: "secondary",
							size: "icon-lg",
							icon: "icon-[lucide--ellipsis]",
							"aria-label": _ctx.$t("g.moreOptions")
						}, null, 8, ["aria-label"]), [[_directive_tooltip, {
							value: _ctx.$t("g.moreOptions"),
							showDelay: 300
						}]])]),
						_: 1
					}, 8, ["items"])) : createCommentVNode("", true)
				])], 64)) : (openBlock(), createElementBlock(Fragment, { key: 3 }, [createBaseVNode("div", _hoisted_26, [
					createBaseVNode("div", _hoisted_27, [createBaseVNode("h3", _hoisted_28, toDisplayString(planDisplayName.value), 1), planStatusBadge.value ? (openBlock(), createBlock(StatusBadge_default, {
						key: 0,
						"data-testid": "plan-status-badge",
						label: planStatusBadge.value.label,
						severity: planStatusBadge.value.severity
					}, null, 8, ["label", "severity"])) : createCommentVNode("", true)]),
					!isNonCatalogPlan.value && !unref(isPriceCycleUnknown) ? (openBlock(), createElementBlock("div", _hoisted_29, [createBaseVNode("span", _hoisted_30, toDisplayString(unref(displayPrice)), 1), createBaseVNode("span", _hoisted_31, toDisplayString(unref(priceUnitLabel)), 1)])) : createCommentVNode("", true),
					planDateDisplay.value ? (openBlock(), createElementBlock("div", _hoisted_32, toDisplayString(planDateDisplay.value), 1)) : createCommentVNode("", true),
					isEndedEnterprise.value ? (openBlock(), createElementBlock("p", _hoisted_33, toDisplayString(_ctx.$t("subscription.inactiveEnterpriseDescription")), 1)) : createCommentVNode("", true)
				]), unref(canAccessSubscriptionFeatures) || unref(false) && unref(permissions).canManageSubscription ? (openBlock(), createElementBlock("div", _hoisted_34, [
					unref(permissions).canManageSubscription && (unref(false) || !unref(isFreeTierPlan)) ? (openBlock(), createBlock(Button_default, {
						key: 0,
						size: "lg",
						variant: "secondary",
						class: "rounded-lg bg-interface-menu-component-surface-selected px-4 text-sm font-normal text-text-primary",
						onClick: unref(manageSubscription)
					}, {
						default: withCtx(() => [createTextVNode(toDisplayString(_ctx.$t(unref(false) ? "subscription.billingAndInvoices" : "subscription.manageBilling")), 1)]),
						_: 1
					}, 8, ["onClick"])) : createCommentVNode("", true),
					unref(isSubscriptionCancelled) && unref(canReactivatePlan) ? (openBlock(), createBlock(Button_default, {
						key: 1,
						size: "lg",
						variant: "primary",
						class: "rounded-lg px-4 text-sm font-normal",
						loading: unref(isResubscribing),
						onClick: unref(handleResubscribe)
					}, {
						default: withCtx(() => [createTextVNode(toDisplayString(_ctx.$t("subscription.reactivatePlan")), 1)]),
						_: 1
					}, 8, ["loading", "onClick"])) : !unref(isSubscriptionCancelled) && unref(canAccessSubscriptionFeatures) && canChangePlan.value ? (openBlock(), createBlock(Button_default, {
						key: 2,
						size: "lg",
						variant: "secondary",
						class: "rounded-lg bg-interface-menu-component-surface-selected px-4 text-sm font-normal text-text-primary",
						onClick: handleUpgrade
					}, {
						default: withCtx(() => [createTextVNode(toDisplayString(unref(isInPersonalWorkspace) && !unref(isTeamPlan) ? _ctx.$t("subscription.upgradePlan") : _ctx.$t("subscription.changePlan")), 1)]),
						_: 1
					})) : createCommentVNode("", true),
					unref(menuEntries).length > 0 ? (openBlock(), createBlock(Menu_default, {
						key: 3,
						items: unref(menuEntries)
					}, {
						trigger: withCtx(() => [withDirectives(createVNode(Button_default, {
							variant: "secondary",
							size: "icon-lg",
							icon: "icon-[lucide--ellipsis]",
							"aria-label": _ctx.$t("g.moreOptions")
						}, null, 8, ["aria-label"]), [[_directive_tooltip, {
							value: _ctx.$t("g.moreOptions"),
							showDelay: 300
						}]])]),
						_: 1
					}, 8, ["items"])) : createCommentVNode("", true)
				])) : createCommentVNode("", true)], 64))])]), createBaseVNode("div", _hoisted_35, [createBaseVNode("div", _hoisted_36, [createVNode(CreditsTile_default, {
					"zero-state": showZeroState.value,
					"inactive-plan": showInactiveTeamSubscription.value || isEndedEnterprise.value
				}, null, 8, ["zero-state", "inactive-plan"])]), !isNonCatalogPlan.value && (unref(canAccessSubscriptionFeatures) || isPersonalFree.value || showInactiveTeamSubscription.value) ? (openBlock(), createElementBlock("div", _hoisted_37, [isTeamActive.value || showInactiveTeamSubscription.value ? (openBlock(), createBlock(_component_i18n_t, {
					key: 0,
					keypath: showInactiveTeamSubscription.value ? "subscription.inactiveTeamPlanIncludes" : "subscription.teamPlanIncludes",
					tag: "div",
					class: "text-sm text-muted"
				}, {
					plan: withCtx(() => [createBaseVNode("span", _hoisted_38, toDisplayString(_ctx.$t("subscription.tiers.pro.name")), 1)]),
					_: 1
				}, 8, ["keypath"])) : isPersonalFree.value ? (openBlock(), createElementBlock("div", _hoisted_39, toDisplayString(_ctx.$t("subscription.whatsIncluded")), 1)) : (openBlock(), createElementBlock("div", _hoisted_40, toDisplayString(_ctx.$t("subscription.yourPlanIncludes")), 1)), createBaseVNode("div", _hoisted_41, [(openBlock(true), createElementBlock(Fragment, null, renderList(tierBenefits.value, (benefit) => {
					return openBlock(), createElementBlock("div", {
						key: benefit.key,
						class: "flex items-center gap-2 py-2"
					}, [benefit.type === "feature" ? (openBlock(), createElementBlock("i", {
						key: 0,
						class: normalizeClass(unref(cn)("pi pi-check text-xs", showInactiveTeamSubscription.value ? "text-muted" : "text-text-primary"))
					}, null, 2)) : benefit.type === "metric" && benefit.value ? (openBlock(), createElementBlock("span", _hoisted_42, toDisplayString(benefit.value), 1)) : createCommentVNode("", true), createBaseVNode("span", _hoisted_43, toDisplayString(benefit.label), 1)]);
				}), 128))])])) : createCommentVNode("", true)])]),
				createVNode(SubscriptionFooterLinks_default, {
					class: "mt-auto pt-6",
					"show-plans-link": unref(canOpenPricingSurface),
					"show-invoice-history": unref(permissions).canManageSubscription,
					"show-usage-activity": unref(workspaceRole) === "owner",
					onViewPlans: handleViewMoreDetails
				}, null, 8, [
					"show-plans-link",
					"show-invoice-history",
					"show-usage-activity"
				])
			], 64))], 32);
		};
	}
}), [["__scopeId", "data-v-336b0da6"]]);
//#endregion
//#region src/composables/billing/useNextInvoice.ts
/**
* Next invoice for the Settings > Invoices banner; annual subscriptions show
* their yearly total and renewal date. Unit semantics: credit-stop
* `yearly.price_cents` is a per-month figure (x12 for the invoice total)
* while an ANNUAL plan's `price_cents` is already the yearly total.
* `renewalDate` is BE-computed and passed through untouched — backends own
* period math including month-end bias — and goes null once a cancellation
* is scheduled. Cancelled/inactive return null because the cancelled Toast
* owns that state. A non-positive resolved amount also returns null (free
* tier can look like an active subscription with no real invoice).
* Intentionally limited to the subscription price: usage/overage pending
* charges are excluded until the backend exposes an authoritative
* upcoming-invoice amount.
*/
function deriveNextInvoice({ subscription, planSlug, plans, teamCreditStops, currentTeamCreditStop }) {
	if (!subscription?.isActive || subscription.isCancelled) return null;
	const duration = subscription.duration === "ANNUAL" ? "ANNUAL" : "MONTHLY";
	const stop = teamCreditStops?.stops.find(({ id }) => id === currentTeamCreditStop?.id);
	const plan = plans.find((candidate) => candidate.slug === planSlug && candidate.duration === duration);
	const amountCents = stop ? duration === "ANNUAL" ? stop.yearly.price_cents * 12 : stop.monthly.price_cents : plan?.price_cents;
	if (!amountCents || amountCents <= 0) return null;
	return {
		amountCents,
		renewalDate: subscription.renewalDate,
		duration
	};
}
/**
* Callers own billing-context initialization; a null invoice hides the
* banner.
*/
function useNextInvoice() {
	const { subscription, currentPlanSlug, plans, teamCreditStops, currentTeamCreditStop } = useBillingContext();
	return { nextInvoice: computed(() => deriveNextInvoice({
		subscription: subscription.value,
		planSlug: currentPlanSlug.value,
		plans: plans.value,
		teamCreditStops: teamCreditStops.value,
		currentTeamCreditStop: currentTeamCreditStop.value
	})) };
}
//#endregion
//#region src/platform/workspace/components/dialogs/settings/WorkspaceInvoicesContent.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1$7 = { class: "flex min-h-0 flex-1 flex-col gap-4" };
var _hoisted_2$6 = {
	key: 0,
	class: "rounded-2xl border border-interface-stroke p-6"
};
var _hoisted_3$4 = { class: "flex items-center gap-2 py-4 text-muted-foreground" };
var _hoisted_4$4 = {
	key: 1,
	class: "flex flex-col items-start gap-3 rounded-2xl border border-interface-stroke p-6"
};
var _hoisted_5$4 = { class: "flex items-center gap-2 text-text-secondary" };
var _hoisted_6$4 = { class: "text-sm" };
var _hoisted_7$4 = {
	key: 2,
	class: "flex flex-col gap-4 rounded-2xl border border-interface-stroke/60 p-4 @2xl:flex-row @2xl:items-center @2xl:justify-between"
};
var _hoisted_8$4 = {
	key: 0,
	class: "flex flex-col gap-2"
};
var _hoisted_9$2 = { class: "text-sm text-muted-foreground" };
var _hoisted_10$2 = { class: "m-0 text-2xl font-semibold text-base-foreground" };
var _hoisted_11$2 = { class: "text-base font-normal text-base-foreground" };
//#endregion
//#region src/platform/workspace/components/dialogs/settings/WorkspaceInvoicesContent.vue
var WorkspaceInvoicesContent_default = /* @__PURE__ */ defineComponent({
	__name: "WorkspaceInvoicesContent",
	setup(__props) {
		const { locale } = useI18n();
		const { toastErrorHandler } = useErrorHandling();
		const { billingStatus, subscription, isLoading, error, initialize, manageSubscription } = useBillingContext();
		const { nextInvoice } = useNextInvoice();
		const upcomingAmount = computed(() => {
			if (billingStatus.value === "paused") return null;
			const invoice = nextInvoice.value;
			return invoice ? formatUsdCents(locale.value, invoice.amountCents) : null;
		});
		const isOpeningHistory = ref(false);
		function openHistory() {
			if (isOpeningHistory.value) return;
			isOpeningHistory.value = true;
			manageSubscription().catch(toastErrorHandler).finally(() => {
				isOpeningHistory.value = false;
			});
		}
		function handleRetry() {
			initialize().catch(() => void 0);
		}
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", _hoisted_1$7, [unref(isLoading) && !unref(subscription) ? (openBlock(), createElementBlock("div", _hoisted_2$6, [createBaseVNode("div", _hoisted_3$4, [_cache[0] || (_cache[0] = createBaseVNode("i", { class: "pi pi-spin pi-spinner" }, null, -1)), createBaseVNode("span", null, toDisplayString(_ctx.$t("g.loading")), 1)])])) : unref(error) && !unref(subscription) ? (openBlock(), createElementBlock("div", _hoisted_4$4, [createBaseVNode("div", _hoisted_5$4, [_cache[1] || (_cache[1] = createBaseVNode("i", { class: "pi pi-exclamation-circle text-destructive-background" }, null, -1)), createBaseVNode("span", _hoisted_6$4, toDisplayString(_ctx.$t("subscription.planLoadError")), 1)]), createVNode(Button_default, {
				variant: "secondary",
				size: "lg",
				class: "rounded-lg px-4 text-sm font-normal",
				loading: unref(isLoading),
				onClick: handleRetry
			}, {
				default: withCtx(() => [createTextVNode(toDisplayString(_ctx.$t("subscription.planLoadErrorRetry")), 1)]),
				_: 1
			}, 8, ["loading"])])) : (openBlock(), createElementBlock("div", _hoisted_7$4, [upcomingAmount.value ? (openBlock(), createElementBlock("div", _hoisted_8$4, [createBaseVNode("span", _hoisted_9$2, toDisplayString(_ctx.$t("workspacePanel.invoices.nextInvoice")), 1), createBaseVNode("p", _hoisted_10$2, [createTextVNode(toDisplayString(upcomingAmount.value) + " ", 1), createBaseVNode("span", _hoisted_11$2, toDisplayString(_ctx.$t("workspacePanel.invoices.usd")), 1)])])) : createCommentVNode("", true), createVNode(Button_default, {
				variant: "secondary",
				size: "lg",
				class: "@2xl:ml-auto",
				loading: isOpeningHistory.value,
				onClick: openHistory
			}, {
				default: withCtx(() => [createTextVNode(toDisplayString(_ctx.$t("workspacePanel.invoices.fullHistory")) + " ", 1), _cache[2] || (_cache[2] = createBaseVNode("i", { class: "icon-[lucide--external-link] size-4" }, null, -1))]),
				_: 1
			}, 8, ["loading"])]))]);
		};
	}
});
//#endregion
//#region src/platform/workspace/components/dialogs/settings/PlanCreditsPanelContent.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1$6 = { class: "flex min-h-0 flex-1 flex-col" };
var _hoisted_2$5 = { class: "flex min-w-0 flex-1 items-center gap-2" };
//#endregion
//#region src/platform/workspace/components/dialogs/settings/PlanCreditsPanelContent.vue
var PlanCreditsPanelContent_default = /* @__PURE__ */ defineComponent({
	__name: "PlanCreditsPanelContent",
	setup(__props) {
		const { isHeaderCollapsed, handlePanelScroll, resetHeaderCollapse } = useSettingsHeaderCollapse();
		const { t } = useI18n();
		const { permissions } = useWorkspaceUI();
		const canSeeInvoices = computed(() => false);
		const tabs = computed(() => [
			{
				key: "overview",
				label: t("workspacePanel.planCredits.tabs.overview")
			},
			{
				key: "activity",
				label: t("workspacePanel.planCredits.tabs.activity")
			},
			...canSeeInvoices.value ? [{
				key: "invoices",
				label: t("workspacePanel.planCredits.tabs.invoices")
			}] : []
		]);
		const activeView = ref("overview");
		watch(canSeeInvoices, (allowed) => {
			if (!allowed && activeView.value === "invoices") activeView.value = "overview";
		});
		watch(activeView, resetHeaderCollapse);
		const usageLogsTable = useTemplateRef("usageLogsTable");
		watch(usageLogsTable, (table) => {
			table?.refresh().catch(() => {
				console.error("Error refreshing usage logs");
			});
		});
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", _hoisted_1$6, [(openBlock(), createBlock(Teleport, {
				defer: "",
				to: "#settings-header-controls",
				disabled: !unref(isHeaderCollapsed)
			}, [createBaseVNode("div", { class: normalizeClass(unref(cn)("flex w-full gap-3", unref(isHeaderCollapsed) ? "min-w-0 flex-1 flex-row items-center gap-9" : "mb-4 flex-col @2xl:flex-row @2xl:items-center @2xl:gap-9")) }, [createBaseVNode("div", _hoisted_2$5, [(openBlock(true), createElementBlock(Fragment, null, renderList(tabs.value, (tab) => {
				return openBlock(), createBlock(Button_default, {
					key: tab.key,
					variant: activeView.value === tab.key ? "secondary" : "muted-textonly",
					size: "lg",
					onClick: ($event) => activeView.value = tab.key
				}, {
					default: withCtx(() => [createTextVNode(toDisplayString(tab.label), 1)]),
					_: 2
				}, 1032, ["variant", "onClick"]);
			}), 128))])], 2)], 8, ["disabled"])), activeView.value === "overview" ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [unref(false) ? (openBlock(), createBlock(SubscriptionPanelContentWorkspace_default, { key: 0 })) : (openBlock(), createElementBlock("div", {
				key: 1,
				class: "flex min-h-0 flex-1 flex-col gap-8 overflow-y-auto",
				onScroll: _cache[0] || (_cache[0] = (...args) => unref(handlePanelScroll) && unref(handlePanelScroll)(...args))
			}, [createVNode(CreditsPanel_default, { embedded: "" }), createVNode(SubscriptionFooterLinks_default, {
				class: "mt-auto shrink-0",
				"show-invoice-history": false,
				"show-usage-activity": false
			})], 32))], 64)) : activeView.value === "invoices" ? (openBlock(), createBlock(WorkspaceInvoicesContent_default, { key: 1 })) : (openBlock(), createBlock(UsageLogsTable_default, {
				key: 2,
				ref_key: "usageLogsTable",
				ref: usageLogsTable
			}, null, 512))]);
		};
	}
});
//#endregion
//#region src/platform/workspace/components/dialogs/settings/WorkspaceMenuButton.vue
var WorkspaceMenuButton_default = /* @__PURE__ */ defineComponent({
	__name: "WorkspaceMenuButton",
	setup(__props) {
		const { t } = useI18n();
		const { showLeaveWorkspaceDialog, showDeleteWorkspaceDialog, showEditWorkspaceDialog } = useDialogService();
		const { isWorkspaceSubscribed } = storeToRefs(useTeamWorkspaceStore());
		const { permissions, uiConfig } = useWorkspaceUI();
		const isDeleteDisabled = computed(() => uiConfig.value.workspaceMenuAction === "delete" && isWorkspaceSubscribed.value);
		const deleteTooltip = computed(() => {
			if (!isDeleteDisabled.value) return void 0;
			const tooltipKey = uiConfig.value.workspaceMenuDisabledTooltip;
			return tooltipKey ? t(tooltipKey) : void 0;
		});
		function leaveWorkspace() {
			if (!permissions.value.canLeaveWorkspace) return;
			showLeaveWorkspaceDialog();
		}
		function deleteWorkspace() {
			if (!permissions.value.canManageSubscription || uiConfig.value.workspaceMenuAction !== "delete" || isDeleteDisabled.value) return;
			showDeleteWorkspaceDialog();
		}
		const menuItems = computed(() => {
			const items = [];
			if (uiConfig.value.showEditWorkspaceMenuItem) items.push({
				label: t("workspacePanel.menu.editWorkspace"),
				icon: "pi pi-pencil",
				command: () => showEditWorkspaceDialog()
			});
			if (uiConfig.value.workspaceMenuAction === "delete" && permissions.value.canManageSubscription) items.push({
				label: t("workspacePanel.menu.deleteWorkspace"),
				icon: "pi pi-trash",
				variant: "destructive",
				disabled: isDeleteDisabled.value,
				tooltip: deleteTooltip.value,
				command: isDeleteDisabled.value ? void 0 : deleteWorkspace
			});
			if (permissions.value.canLeaveWorkspace) items.push({
				label: t("workspacePanel.menu.leaveWorkspace"),
				icon: "pi pi-sign-out",
				command: leaveWorkspace
			});
			return items;
		});
		return (_ctx, _cache) => {
			const _directive_tooltip = resolveDirective("tooltip");
			return openBlock(), createBlock(Menu_default, { items: menuItems.value }, {
				trigger: withCtx(() => [withDirectives(createVNode(Button_default, {
					variant: "muted-textonly",
					size: "icon-lg",
					"aria-label": _ctx.$t("g.moreOptions"),
					icon: "icon-[lucide--ellipsis]"
				}, null, 8, ["aria-label"]), [[_directive_tooltip, {
					value: _ctx.$t("g.moreOptions"),
					showDelay: 300
				}]])]),
				_: 1
			}, 8, ["items"]);
		};
	}
});
//#endregion
//#region src/platform/workspace/components/dialogs/settings/MemberListItem.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1$5 = ["data-testid"];
var _hoisted_2$4 = { class: "flex items-center gap-3" };
var _hoisted_3$3 = {
	key: 1,
	class: "flex size-8 shrink-0 items-center justify-center rounded-full bg-secondary-background"
};
var _hoisted_4$3 = { class: "text-sm text-muted-foreground" };
var _hoisted_5$3 = { class: "flex min-w-0 flex-1 flex-col gap-1" };
var _hoisted_6$3 = { class: "text-sm text-base-foreground" };
var _hoisted_7$3 = {
	key: 0,
	class: "text-muted-foreground"
};
var _hoisted_8$3 = { class: "text-sm text-muted-foreground" };
var _hoisted_9$1 = {
	key: 1,
	class: "text-sm tabular-nums"
};
var _hoisted_10$1 = {
	key: 0,
	class: "flex flex-col gap-1"
};
var _hoisted_11$1 = { class: "text-base-foreground" };
var _hoisted_12$1 = [
	"aria-valuenow",
	"aria-label",
	"aria-valuetext"
];
var _hoisted_13$1 = {
	key: 1,
	class: "text-muted-foreground"
};
var _hoisted_14 = {
	key: 2,
	class: "flex items-center justify-end"
};
//#endregion
//#region src/platform/workspace/components/dialogs/settings/MemberListItem.vue
var MemberListItem_default = /* @__PURE__ */ defineComponent({
	__name: "MemberListItem",
	props: {
		member: {},
		isCurrentUser: { type: Boolean },
		photoUrl: {},
		gridCols: {},
		showRoleColumn: {
			type: Boolean,
			default: false
		},
		showCreditsColumn: {
			type: Boolean,
			default: false
		},
		canManageMembers: {
			type: Boolean,
			default: false
		},
		isSingleSeatPlan: {
			type: Boolean,
			default: false
		},
		menuItems: { default: () => [] }
	},
	setup(__props) {
		const { n, t } = useI18n();
		const hasCreditLimit = computed(() => __props.member.monthlyCreditLimit !== null && __props.member.monthlyCreditLimit !== void 0);
		const hasCreditUsage = computed(() => __props.member.creditsUsedThisMonth !== void 0);
		const creditsLabel = computed(() => {
			const used = __props.member.creditsUsedThisMonth;
			const limit = __props.member.monthlyCreditLimit;
			if (used === void 0) return limit == null ? "—" : `— / ${n(limit)}`;
			return limit == null ? n(used) : `${n(used)} / ${n(limit)}`;
		});
		const creditUsagePercent = computed(() => {
			const used = __props.member.creditsUsedThisMonth;
			const limit = __props.member.monthlyCreditLimit;
			if (used === void 0 || limit == null) return 0;
			if (limit === 0) return 100;
			return Math.min(100, used / limit * 100);
		});
		const creditUsageValueText = computed(() => t("subscription.monthlyUsageProgress", {
			used: n(__props.member.creditsUsedThisMonth ?? 0),
			total: n(__props.member.monthlyCreditLimit ?? 0)
		}));
		const memberInitial = computed(() => (__props.member.name?.trim() || __props.member.email).charAt(0).toUpperCase());
		return (_ctx, _cache) => {
			const _directive_tooltip = resolveDirective("tooltip");
			return openBlock(), createElementBlock("div", {
				"data-testid": `member-row-${__props.member.id}`,
				class: normalizeClass(unref(cn)("grid w-full items-center border-b border-interface-stroke/30 p-2 last:border-0", __props.isSingleSeatPlan ? "grid-cols-1" : __props.gridCols))
			}, [
				createBaseVNode("div", _hoisted_2$4, [__props.isCurrentUser && __props.photoUrl ? (openBlock(), createBlock(UserAvatar_default, {
					key: 0,
					class: "size-8",
					"photo-url": __props.photoUrl,
					"icon-class": "size-5"
				}, null, 8, ["photo-url"])) : (openBlock(), createElementBlock("div", _hoisted_3$3, [createBaseVNode("span", _hoisted_4$3, toDisplayString(memberInitial.value), 1)])), createBaseVNode("div", _hoisted_5$3, [createBaseVNode("span", _hoisted_6$3, [createTextVNode(toDisplayString(__props.member.name) + " ", 1), __props.isCurrentUser ? (openBlock(), createElementBlock("span", _hoisted_7$3, " (" + toDisplayString(_ctx.$t("g.you")) + ") ", 1)) : createCommentVNode("", true)]), createBaseVNode("span", _hoisted_8$3, toDisplayString(__props.member.email), 1)])]),
				__props.showRoleColumn && !__props.isSingleSeatPlan ? (openBlock(), createElementBlock("span", {
					key: 0,
					class: normalizeClass(unref(cn)("text-sm text-muted-foreground", !__props.showCreditsColumn && "text-right"))
				}, toDisplayString(__props.member.role === "owner" ? _ctx.$t("workspaceSwitcher.roleOwner") : _ctx.$t("workspaceSwitcher.roleMember")), 3)) : createCommentVNode("", true),
				__props.showCreditsColumn ? (openBlock(), createElementBlock("div", _hoisted_9$1, [hasCreditLimit.value ? (openBlock(), createElementBlock("div", _hoisted_10$1, [createBaseVNode("span", _hoisted_11$1, toDisplayString(creditsLabel.value), 1), hasCreditUsage.value ? (openBlock(), createElementBlock("div", {
					key: 0,
					class: "h-1 overflow-hidden rounded-full bg-secondary-background-hover",
					role: "progressbar",
					"aria-valuenow": creditUsagePercent.value,
					"aria-valuemin": "0",
					"aria-valuemax": "100",
					"aria-label": _ctx.$t("workspacePanel.members.columns.creditsUsed"),
					"aria-valuetext": creditUsageValueText.value
				}, [createBaseVNode("div", {
					class: "h-full rounded-full bg-credit",
					style: normalizeStyle({ width: `${creditUsagePercent.value}%` })
				}, null, 4)], 8, _hoisted_12$1)) : createCommentVNode("", true)])) : (openBlock(), createElementBlock("span", _hoisted_13$1, toDisplayString(creditsLabel.value), 1))])) : createCommentVNode("", true),
				__props.canManageMembers && !__props.isSingleSeatPlan ? (openBlock(), createElementBlock("div", _hoisted_14, [__props.menuItems.length > 0 ? (openBlock(), createBlock(Menu_default, {
					key: 0,
					items: __props.menuItems
				}, {
					trigger: withCtx(() => [withDirectives(createVNode(Button_default, {
						variant: "muted-textonly",
						size: "icon",
						"aria-label": _ctx.$t("g.moreOptions"),
						icon: "icon-[lucide--ellipsis]"
					}, null, 8, ["aria-label"]), [[_directive_tooltip, {
						value: _ctx.$t("g.moreOptions"),
						showDelay: 300
					}]])]),
					_: 1
				}, 8, ["items"])) : createCommentVNode("", true)])) : createCommentVNode("", true)
			], 10, _hoisted_1$5);
		};
	}
});
//#endregion
//#region src/platform/workspace/components/dialogs/settings/MemberUpsellBanner.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1$4 = { class: "@container mb-4" };
var _hoisted_2$3 = {
	role: "status",
	class: "flex flex-col gap-3 rounded-2xl border border-interface-stroke/60 bg-base-background p-4 @2xl:flex-row @2xl:items-center @2xl:gap-2"
};
var _hoisted_3$2 = { class: "flex min-w-0 flex-1 flex-col gap-1" };
var _hoisted_4$2 = { class: "flex items-center gap-2" };
var _hoisted_5$2 = {
	key: 0,
	class: "text-sm text-base-foreground"
};
var _hoisted_6$2 = {
	key: 1,
	class: "text-sm text-muted-foreground"
};
var _hoisted_7$2 = {
	key: 0,
	class: "m-0 pl-6 text-sm text-muted-foreground"
};
var _hoisted_8$2 = { class: "flex shrink-0 flex-wrap items-center gap-2 pl-6 @2xl:pl-0" };
//#endregion
//#region src/platform/workspace/components/dialogs/settings/MemberUpsellBanner.vue
var MemberUpsellBanner_default = /* @__PURE__ */ defineComponent({
	__name: "MemberUpsellBanner",
	props: {
		variant: {},
		enterprise: {
			type: Boolean,
			default: false
		}
	},
	emits: ["action"],
	setup(__props) {
		const { t } = useI18n();
		const title = computed(() => {
			if (__props.variant === "reactivate") return t("workspacePanel.members.endedTeamTitle");
			if (__props.variant === "contactSales") return __props.enterprise ? t("workspacePanel.members.endedEnterpriseTitle") : t("workspacePanel.members.endedPlanTitle");
			return null;
		});
		const body = computed(() => {
			if (__props.variant === "reactivate") return t("workspacePanel.members.upsellBannerReactivate");
			if (__props.variant === "contactSales") return __props.enterprise ? t("workspacePanel.members.upsellBannerEnterpriseEnded") : t("workspacePanel.members.upsellBannerPlanEnded");
			return t("workspacePanel.members.upsellBanner");
		});
		const cta = computed(() => {
			if (__props.variant === "reactivate") return t("workspacePanel.members.resubscribe");
			if (__props.variant === "contactSales") return t("workspacePanel.members.contactSales");
			return t("workspacePanel.members.upgradeToTeam");
		});
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", _hoisted_1$4, [createBaseVNode("div", _hoisted_2$3, [createBaseVNode("div", _hoisted_3$2, [createBaseVNode("div", _hoisted_4$2, [_cache[1] || (_cache[1] = createBaseVNode("i", { class: "icon-[lucide--circle-alert] size-4 shrink-0 text-muted-foreground" }, null, -1)), title.value ? (openBlock(), createElementBlock("span", _hoisted_5$2, toDisplayString(title.value), 1)) : (openBlock(), createElementBlock("span", _hoisted_6$2, toDisplayString(body.value), 1))]), title.value ? (openBlock(), createElementBlock("p", _hoisted_7$2, toDisplayString(body.value), 1)) : createCommentVNode("", true)]), createBaseVNode("div", _hoisted_8$2, [createVNode(Button_default, {
				variant: "secondary",
				size: "lg",
				onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("action"))
			}, {
				default: withCtx(() => [createTextVNode(toDisplayString(cta.value), 1)]),
				_: 1
			})])])]);
		};
	}
});
//#endregion
//#region src/platform/workspace/components/dialogs/settings/PendingInvitesList.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1$3 = { class: "flex size-8 shrink-0 items-center justify-center rounded-full bg-secondary-background" };
var _hoisted_2$2 = { class: "text-sm text-muted-foreground" };
var _hoisted_3$1 = { class: "flex min-w-0 flex-1 flex-col gap-1" };
var _hoisted_4$1 = { class: "text-sm text-base-foreground" };
var _hoisted_5$1 = { class: "text-sm text-muted-foreground" };
var _hoisted_6$1 = { class: "text-sm text-muted-foreground" };
var _hoisted_7$1 = { class: "flex items-center justify-end" };
var _hoisted_8$1 = {
	key: 0,
	class: "flex w-full items-center justify-center py-8 text-sm text-muted-foreground"
};
//#endregion
//#region src/platform/workspace/components/dialogs/settings/PendingInvitesList.vue
var PendingInvitesList_default = /* @__PURE__ */ defineComponent({
	__name: "PendingInvitesList",
	props: {
		invites: {},
		gridCols: {},
		searchQuery: { default: "" },
		loaded: {
			type: Boolean,
			default: false
		}
	},
	emits: ["resend", "revoke"],
	setup(__props, { emit: __emit }) {
		const toastStore = useToastStore();
		const emit = __emit;
		const { d, t } = useI18n();
		function getInviteDisplayName(email) {
			return email.split("@")[0];
		}
		function getInviteInitial(email) {
			return email.charAt(0).toUpperCase();
		}
		function formatDate(date) {
			return d(date, { dateStyle: "medium" });
		}
		function isExpired(invite) {
			return !invite.token;
		}
		async function copyInviteLink(invite) {
			if (!invite.token) return;
			if (await copyTextSilently(buildInviteLink(invite.token))) toastStore.add({
				severity: "success",
				summary: t("workspacePanel.inviteLinks.copiedToast"),
				life: 3e3
			});
			else toastStore.add({
				severity: "error",
				summary: t("workspacePanel.inviteLinks.copyFailedToast")
			});
		}
		function getInviteMenuItems(invite) {
			return [
				{
					label: () => t("workspacePanel.members.actions.copyInviteLink"),
					icon: "icon-[lucide--link]",
					visible: Boolean(invite.token),
					command: () => copyInviteLink(invite)
				},
				{
					label: () => t("workspacePanel.members.actions.resendInvite"),
					icon: "icon-[lucide--mail-plus]",
					command: () => emit("resend", invite)
				},
				{
					label: () => t("workspacePanel.members.actions.cancelInvite"),
					icon: "icon-[lucide--mail-x]",
					command: () => emit("revoke", invite)
				}
			];
		}
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", null, [(openBlock(true), createElementBlock(Fragment, null, renderList(__props.invites, (invite) => {
				return openBlock(), createElementBlock("div", {
					key: invite.id,
					class: normalizeClass(unref(cn)("grid w-full items-center border-b border-interface-stroke/30 p-2 last:border-0", __props.gridCols))
				}, [
					createBaseVNode("div", { class: normalizeClass(unref(cn)("flex items-center gap-3", isExpired(invite) && "opacity-60")) }, [createBaseVNode("div", _hoisted_1$3, [createBaseVNode("span", _hoisted_2$2, toDisplayString(getInviteInitial(invite.email)), 1)]), createBaseVNode("div", _hoisted_3$1, [createBaseVNode("span", _hoisted_4$1, toDisplayString(getInviteDisplayName(invite.email)), 1), createBaseVNode("span", _hoisted_5$1, toDisplayString(invite.email), 1)])], 2),
					createBaseVNode("span", _hoisted_6$1, toDisplayString(formatDate(invite.inviteDate)), 1),
					createBaseVNode("span", { class: normalizeClass(unref(cn)("text-sm", isExpired(invite) ? "text-warning-background" : "text-muted-foreground")) }, toDisplayString(isExpired(invite) ? _ctx.$t("workspacePanel.members.expiredOn", { date: formatDate(invite.expiryDate) }) : formatDate(invite.expiryDate)), 3),
					createBaseVNode("div", _hoisted_7$1, [createVNode(Menu_default, {
						items: getInviteMenuItems(invite),
						align: "end"
					}, {
						trigger: withCtx(() => [createVNode(Button_default, {
							size: "icon",
							variant: "muted-textonly",
							"aria-label": _ctx.$t("g.moreOptions"),
							icon: "icon-[lucide--ellipsis]"
						}, null, 8, ["aria-label"])]),
						_: 1
					}, 8, ["items"])])
				], 2);
			}), 128)), __props.loaded && __props.invites.length === 0 ? (openBlock(), createElementBlock("div", _hoisted_8$1, toDisplayString(__props.searchQuery.trim() ? _ctx.$t("workspacePanel.members.noInvitesMatch", { query: __props.searchQuery.trim() }) : _ctx.$t("workspacePanel.members.noInvites")), 1)) : createCommentVNode("", true)]);
		};
	}
});
//#endregion
//#region src/platform/workspace/composables/useMembersPanel.ts
function sortMembers(members, currentUserEmail, originalOwnerId = null) {
	return [...members].sort((a, b) => {
		const aIsOriginalOwner = a.id === originalOwnerId;
		const bIsOriginalOwner = b.id === originalOwnerId;
		if (aIsOriginalOwner && !bIsOriginalOwner) return -1;
		if (!aIsOriginalOwner && bIsOriginalOwner) return 1;
		if (a.role !== b.role) return a.role === "owner" ? -1 : 1;
		const aIsCurrent = a.email.toLowerCase() === currentUserEmail?.toLowerCase();
		const bIsCurrent = b.email.toLowerCase() === currentUserEmail?.toLowerCase();
		if (aIsCurrent && !bIsCurrent) return -1;
		if (!aIsCurrent && bIsCurrent) return 1;
		return b.joinDate.getTime() - a.joinDate.getTime();
	});
}
function filterBySearch(items, query) {
	if (!query) return items;
	const q = query.toLowerCase();
	return items.filter((item) => item.email.toLowerCase().includes(q) || "name" in item && item.name?.toLowerCase().includes(q));
}
function sortPendingInvites(invites, sortField, sortDirection) {
	return [...invites].sort((a, b) => {
		const aDate = getInviteDate(a, sortField);
		const bDate = getInviteDate(b, sortField);
		if (!aDate || !bDate) return 0;
		const aValue = aDate.getTime();
		const bValue = bDate.getTime();
		return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
	});
}
function getInviteDate(invite, field) {
	return invite[field];
}
function useMembersPanel() {
	const { t } = useI18n();
	const toast = useToast();
	const { userPhotoUrl, userEmail, userDisplayName } = useCurrentUser();
	const { flags } = useFeatureFlags();
	const { showRemoveMemberDialog, showRevokeInviteDialog, showChangeMemberRoleDialog, showSetMemberCreditLimitDialog, showInviteMemberDialog, showInviteMemberUpsellDialog } = useDialogService();
	const workspaceStore = useTeamWorkspaceStore();
	const { activeWorkspace, isInPersonalWorkspace, members, membersLoaded, pendingInvites, pendingInvitesLoaded, originalOwnerId } = storeToRefs(workspaceStore);
	const totalMembers = computed(() => activeWorkspace.value?.totalMembers ?? members.value.length);
	const { resendInvite } = workspaceStore;
	const { permissions: workspacePermissions, uiConfig: workspaceUiConfig, workspaceRole } = useWorkspaceUI();
	const { hasTeamPlan, isOnTeamPlan, hasMemberSeats, isPlanLoading } = useTeamPlan();
	const subscriptionDialog = useSubscriptionDialog();
	const { maxSeats, occupiedSeats } = useBillingContext();
	const { canChangeSeats, canInviteMembers } = useBillingCapabilities();
	const { isPlanEnded, isSalesManagedPlan, isEnterprisePlan } = usePlanEnded();
	const permissions = computed(() => {
		const canManageMembers = hasMemberSeats.value && workspaceRole.value === "owner";
		const canManageInvites = hasMemberSeats.value && workspaceRole.value === "owner";
		return {
			...workspacePermissions.value,
			canViewOtherMembers: hasMemberSeats.value,
			canViewPendingInvites: canManageInvites,
			canInviteMembers: canManageInvites,
			canManageInvites,
			canManageMembers
		};
	});
	const uiConfig = computed(() => {
		if (!hasMemberSeats.value && !isPlanEnded.value) return {
			...workspaceUiConfig.value,
			showMembersList: false,
			showPendingTab: false,
			showSearch: false,
			showRoleColumn: false,
			showCreditsColumn: false,
			membersGridCols: "grid-cols-1",
			pendingGridCols: "grid-cols-[50%_20%_20%_10%]",
			headerGridCols: "grid-cols-1"
		};
		if (workspaceRole.value === "owner") return {
			...workspaceUiConfig.value,
			showMembersList: true,
			showPendingTab: true,
			showSearch: true,
			showRoleColumn: true,
			membersGridCols: workspaceUiConfig.value.showCreditsColumn ? workspaceUiConfig.value.membersGridCols : "grid-cols-[50%_40%_10%]",
			pendingGridCols: "grid-cols-[50%_20%_20%_10%]",
			headerGridCols: workspaceUiConfig.value.showCreditsColumn ? workspaceUiConfig.value.headerGridCols : "grid-cols-[50%_40%_10%]"
		};
		return {
			...workspaceUiConfig.value,
			showMembersList: true,
			showPendingTab: false,
			showSearch: true,
			showRoleColumn: true,
			membersGridCols: "grid-cols-[1fr_auto]",
			pendingGridCols: "grid-cols-[50%_20%_20%_10%]",
			headerGridCols: "grid-cols-[1fr_auto]"
		};
	});
	const hasMultipleMembers = computed(() => members.value.length > 1);
	const showSearch = computed(() => uiConfig.value.showSearch && hasMultipleMembers.value);
	const showViewTabs = computed(() => hasMemberSeats.value && (hasMultipleMembers.value || pendingInvites.value.length > 0));
	const showInviteButton = computed(() => workspaceRole.value === "owner");
	const isMemberLimitReached = computed(() => maxSeats.value !== null && occupiedSeats.value !== null && maxSeats.value > 0 && occupiedSeats.value >= maxSeats.value);
	const isInviteDisabled = computed(() => isPlanLoading.value || !permissions.value.canInviteMembers || isPlanEnded.value || maxSeats.value === null || occupiedSeats.value === null || !hasMemberSeats.value || isMemberLimitReached.value);
	const inviteTooltip = computed(() => {
		if (!hasMemberSeats.value) return null;
		if (maxSeats.value === null || occupiedSeats.value === null) return null;
		if (!isMemberLimitReached.value) return null;
		return t("workspacePanel.inviteLimitReached", { count: maxSeats.value });
	});
	function handleInviteMember() {
		if (workspaceRole.value !== "owner") return;
		if (isPlanLoading.value || maxSeats.value === null || occupiedSeats.value === null) return;
		if (!hasMemberSeats.value) {
			showInviteMemberUpsellDialog();
			return;
		}
		if (isPlanEnded.value || isMemberLimitReached.value) return;
		showInviteMemberDialog();
	}
	const personalWorkspaceMember = computed(() => ({
		id: "self",
		name: userDisplayName.value ?? "",
		email: userEmail.value ?? "",
		role: "owner",
		joinDate: /* @__PURE__ */ new Date(0),
		isOriginalOwner: true
	}));
	const searchQuery = ref("");
	const activeView = ref("active");
	const sortField = ref("inviteDate");
	const sortDirection = ref("desc");
	function memberMenuItems(member) {
		if (!permissions.value.canManageMembers) return [];
		const creditLimitItem = {
			label: t("workspacePanel.members.actions.setCreditLimit"),
			command: () => void showSetMemberCreditLimitDialog({
				memberId: member.id,
				memberName: member.name,
				creditsUsed: member.creditsUsedThisMonth,
				currentLimit: member.monthlyCreditLimit
			})
		};
		if (isCurrentUser(member) || isOriginalOwner(member)) return [];
		return [
			{
				label: t("workspacePanel.members.actions.changeRole"),
				radioGroup: {
					value: member.role,
					options: [{
						value: "owner",
						label: t("workspaceSwitcher.roleOwner"),
						command: () => handleChangeRole(member, "owner")
					}, {
						value: "member",
						label: t("workspaceSwitcher.roleMember"),
						command: () => handleChangeRole(member, "member")
					}]
				}
			},
			...flags.memberCreditLimitsEnabled && member.role === "member" ? [creditLimitItem] : [],
			{
				label: t("workspacePanel.members.actions.removeMember"),
				command: () => handleRemoveMember(member)
			}
		];
	}
	function isCurrentUser(member) {
		return member.email.toLowerCase() === userEmail.value?.toLowerCase();
	}
	function isOriginalOwner(member) {
		return activeWorkspace.value?.type === "personal" && member.id === originalOwnerId.value;
	}
	const filteredMembers = computed(() => {
		return sortMembers(filterBySearch(members.value, searchQuery.value), userEmail.value ?? null, originalOwnerId.value);
	});
	const memberMenus = computed(() => new Map(filteredMembers.value.map((m) => [m.id, memberMenuItems(m)])));
	const filteredPendingInvites = computed(() => {
		return sortPendingInvites(filterBySearch(pendingInvites.value, searchQuery.value), sortField.value, sortDirection.value);
	});
	function toggleSort(field) {
		if (sortField.value === field) sortDirection.value = sortDirection.value === "asc" ? "desc" : "asc";
		else {
			sortField.value = field;
			sortDirection.value = "desc";
		}
	}
	async function handleResendInvite(invite) {
		if (!permissions.value.canManageInvites) return;
		try {
			await resendInvite(invite.id);
			toast.add({
				severity: "success",
				summary: t("workspacePanel.toast.inviteResent"),
				life: 2e3
			});
		} catch {
			toast.add({
				severity: "error",
				summary: t("workspacePanel.toast.inviteResendFailed")
			});
		}
	}
	function handleRevokeInvite(invite) {
		if (!permissions.value.canManageInvites) return;
		showRevokeInviteDialog(invite.id);
	}
	function handleRemoveMember(member) {
		if (!permissions.value.canManageMembers) return;
		showRemoveMemberDialog(member.id);
	}
	function handleChangeRole(member, targetRole) {
		if (!permissions.value.canManageMembers) return;
		if (member.role === targetRole) return;
		showChangeMemberRoleDialog({
			memberId: member.id,
			memberName: member.name,
			targetRole
		});
	}
	function showTeamPlans() {
		subscriptionDialog.show({
			planMode: "team",
			reason: "team_members_panel"
		});
	}
	return {
		searchQuery,
		activeView,
		sortField,
		sortDirection,
		maxSeats,
		isInPersonalWorkspace,
		hasTeamPlan,
		isOnTeamPlan,
		isPlanEnded,
		isSalesManagedPlan,
		isEnterprisePlan,
		hasMemberSeats,
		isPlanLoading,
		hasMultipleMembers,
		showSearch,
		showViewTabs,
		showInviteButton,
		isInviteDisabled,
		inviteTooltip,
		handleInviteMember,
		personalWorkspaceMember,
		filteredMembers,
		filteredPendingInvites,
		memberMenuItems,
		memberMenus,
		members,
		membersLoaded,
		totalMembers,
		pendingInvites,
		pendingInvitesLoaded,
		permissions,
		uiConfig,
		userPhotoUrl,
		isCurrentUser,
		isOriginalOwner,
		toggleSort,
		showTeamPlans,
		handleResendInvite,
		handleRevokeInvite,
		handleRemoveMember,
		handleChangeRole
	};
}
//#endregion
//#region src/platform/workspace/components/dialogs/settings/MembersPanelContent.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1$2 = { class: "flex h-full flex-col" };
var _hoisted_2$1 = {
	key: 0,
	class: "flex items-center gap-2"
};
var _hoisted_3 = { class: "ml-auto flex items-center gap-2" };
var _hoisted_4 = { class: "flex min-h-0 w-full flex-1 flex-col gap-2 rounded-2xl border border-interface-stroke p-6" };
var _hoisted_5 = { class: "flex min-h-0 flex-1 flex-col" };
var _hoisted_6 = { class: "text-xs text-muted-foreground" };
var _hoisted_7 = {
	key: 0,
	class: "flex items-center gap-1 text-xs text-muted-foreground"
};
var _hoisted_8 = { key: 1 };
var _hoisted_9 = {
	key: 1,
	class: "p-6 text-center text-sm text-muted-foreground"
};
var _hoisted_10 = {
	key: 1,
	class: "flex shrink-0 items-center gap-1 pt-2 pb-6"
};
var _hoisted_11 = { class: "text-sm text-muted-foreground" };
var _hoisted_12 = {
	key: 2,
	class: "flex shrink-0 items-center gap-1 pt-2 pb-6"
};
var _hoisted_13 = { class: "text-sm text-muted-foreground" };
var TEAM_PLAN_REQUEST_URL = "https://comfysupport.portal.usepylon.com/forms/team-plan-requests";
//#endregion
//#region src/platform/workspace/components/dialogs/settings/MembersPanelContent.vue
var MembersPanelContent_default = /* @__PURE__ */ defineComponent({
	__name: "MembersPanelContent",
	setup(__props) {
		const { searchQuery, membersLoaded, totalMembers, pendingInvitesLoaded, activeView, maxSeats, isInPersonalWorkspace, isPlanEnded, isSalesManagedPlan, isEnterprisePlan, hasMemberSeats, isPlanLoading, hasMultipleMembers, showSearch, showViewTabs, showInviteButton, isInviteDisabled, inviteTooltip, handleInviteMember, personalWorkspaceMember, filteredMembers, filteredPendingInvites, memberMenus, pendingInvites, permissions, uiConfig, userPhotoUrl, isCurrentUser, toggleSort, showTeamPlans, handleResendInvite, handleRevokeInvite } = useMembersPanel();
		const { isHeaderCollapsed, handlePanelScroll } = useSettingsHeaderCollapse();
		const controlsRef = useTemplateRef("controlsRef");
		watch(isHeaderCollapsed, async () => {
			const active = document.activeElement;
			if (!(active instanceof HTMLElement && !!controlsRef.value?.contains(active))) return;
			await nextTick();
			active.focus();
		});
		const { t } = useI18n();
		const showsEndedUpsell = computed(() => isPlanEnded.value && !isInPersonalWorkspace.value);
		const emptyStateMessage = computed(() => {
			if (!uiConfig.value.showMembersList) return null;
			if (!membersLoaded.value) return null;
			if (activeView.value !== "active") return null;
			if (isInPersonalWorkspace.value && maxSeats.value === 1) return null;
			if (filteredMembers.value.length > 0) return null;
			const query = searchQuery.value.trim();
			return query ? t("workspacePanel.members.noMembersMatch", { query }) : t("workspacePanel.members.noMembers");
		});
		const livePendingCount = computed(() => pendingInvites.value.filter((invite) => invite.token).length);
		function handleContactUs() {
			window.open(TEAM_PLAN_REQUEST_URL, "_blank", "noopener,noreferrer");
		}
		function handleContactSales() {
			window.open(ENTERPRISE_URL, "_blank", "noopener,noreferrer");
		}
		return (_ctx, _cache) => {
			const _directive_tooltip = resolveDirective("tooltip");
			return openBlock(), createElementBlock("div", _hoisted_1$2, [
				!unref(isPlanLoading) && (unref(isInPersonalWorkspace) && unref(maxSeats) === 1 || unref(isPlanEnded)) && unref(permissions).canManageSubscription ? (openBlock(), createBlock(MemberUpsellBanner_default, {
					key: 0,
					variant: showsEndedUpsell.value ? unref(isSalesManagedPlan) ? "contactSales" : "reactivate" : "upgrade",
					enterprise: unref(isEnterprisePlan),
					onAction: _cache[0] || (_cache[0] = ($event) => showsEndedUpsell.value && unref(isSalesManagedPlan) ? handleContactSales() : unref(showTeamPlans)())
				}, null, 8, ["variant", "enterprise"])) : createCommentVNode("", true),
				(openBlock(), createBlock(Teleport, {
					defer: "",
					to: "#settings-header-controls",
					disabled: !unref(isHeaderCollapsed)
				}, [createBaseVNode("div", {
					ref_key: "controlsRef",
					ref: controlsRef,
					class: normalizeClass(unref(cn)("flex w-full items-center gap-4", unref(isHeaderCollapsed) ? "min-w-0 flex-1" : "mb-6"))
				}, [unref(showViewTabs) ? (openBlock(), createElementBlock("div", _hoisted_2$1, [createVNode(Button_default, {
					variant: unref(activeView) === "active" ? "secondary" : "muted-textonly",
					size: "lg",
					onClick: _cache[1] || (_cache[1] = ($event) => activeView.value = "active")
				}, {
					default: withCtx(() => [createTextVNode(toDisplayString(_ctx.$t("workspacePanel.members.tabs.active")), 1)]),
					_: 1
				}, 8, ["variant"]), unref(uiConfig).showPendingTab ? (openBlock(), createBlock(Button_default, {
					key: 0,
					variant: unref(activeView) === "pending" ? "secondary" : "muted-textonly",
					size: "lg",
					onClick: _cache[2] || (_cache[2] = ($event) => activeView.value = "pending")
				}, {
					default: withCtx(() => [createTextVNode(toDisplayString(_ctx.$t("workspacePanel.members.tabs.pendingCount", livePendingCount.value)), 1)]),
					_: 1
				}, 8, ["variant"])) : createCommentVNode("", true)])) : createCommentVNode("", true), createBaseVNode("div", _hoisted_3, [
					unref(showSearch) ? (openBlock(), createBlock(SearchInput_default, {
						key: 0,
						modelValue: unref(searchQuery),
						"onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => isRef(searchQuery) ? searchQuery.value = $event : null),
						placeholder: _ctx.$t("workspacePanel.members.searchPlaceholder"),
						size: "lg",
						class: "w-64"
					}, null, 8, ["modelValue", "placeholder"])) : createCommentVNode("", true),
					unref(showInviteButton) ? withDirectives((openBlock(), createBlock(Button_default, {
						key: 1,
						variant: "secondary",
						size: "lg",
						disabled: unref(isInviteDisabled),
						"aria-label": _ctx.$t("workspacePanel.inviteMember"),
						onClick: unref(handleInviteMember)
					}, {
						default: withCtx(() => [createTextVNode(toDisplayString(_ctx.$t("workspacePanel.invite")) + " ", 1), _cache[8] || (_cache[8] = createBaseVNode("i", { class: "pi pi-plus text-sm" }, null, -1))]),
						_: 1
					}, 8, [
						"disabled",
						"aria-label",
						"onClick"
					])), [[_directive_tooltip, unref(inviteTooltip) ? {
						value: unref(inviteTooltip),
						showDelay: 0
					} : {
						value: _ctx.$t("workspacePanel.inviteMember"),
						showDelay: 300
					}]]) : createCommentVNode("", true),
					unref(permissions).canAccessWorkspaceMenu ? (openBlock(), createBlock(WorkspaceMenuButton_default, { key: 2 })) : createCommentVNode("", true)
				])], 2)], 8, ["disabled"])),
				createBaseVNode("div", _hoisted_4, [createBaseVNode("div", _hoisted_5, [createBaseVNode("div", {
					class: "min-h-0 flex-1 overflow-y-auto",
					onScroll: _cache[6] || (_cache[6] = (...args) => unref(handlePanelScroll) && unref(handlePanelScroll)(...args))
				}, [
					unref(uiConfig).showMembersList && unref(showViewTabs) ? (openBlock(), createElementBlock("div", {
						key: 0,
						class: normalizeClass(unref(cn)("sticky -top-px z-10 grid w-full items-center bg-base-background px-2 pt-[calc(--spacing(2)+1px)] pb-2", unref(activeView) === "pending" ? unref(uiConfig).pendingGridCols : unref(uiConfig).headerGridCols))
					}, [createBaseVNode("span", _hoisted_6, toDisplayString(_ctx.$t("workspacePanel.members.columns.email")), 1), unref(activeView) === "pending" ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
						createVNode(Button_default, {
							variant: "muted-textonly",
							size: "sm",
							class: "w-fit justify-self-start",
							onClick: _cache[4] || (_cache[4] = ($event) => unref(toggleSort)("inviteDate"))
						}, {
							default: withCtx(() => [createTextVNode(toDisplayString(_ctx.$t("workspacePanel.members.columns.inviteDate")) + " ", 1), _cache[9] || (_cache[9] = createBaseVNode("i", { class: "icon-[lucide--chevrons-up-down] size-4" }, null, -1))]),
							_: 1
						}),
						createVNode(Button_default, {
							variant: "muted-textonly",
							size: "sm",
							class: "w-fit justify-self-start",
							onClick: _cache[5] || (_cache[5] = ($event) => unref(toggleSort)("expiryDate"))
						}, {
							default: withCtx(() => [createTextVNode(toDisplayString(_ctx.$t("workspacePanel.members.columns.expiryDate")) + " ", 1), _cache[10] || (_cache[10] = createBaseVNode("i", { class: "icon-[lucide--chevrons-up-down] size-4" }, null, -1))]),
							_: 1
						}),
						_cache[11] || (_cache[11] = createBaseVNode("div", null, null, -1))
					], 64)) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
						createBaseVNode("span", { class: normalizeClass(unref(cn)("text-xs text-muted-foreground", unref(uiConfig).showCreditsColumn ? "justify-self-start" : "justify-self-end")) }, toDisplayString(_ctx.$t("workspacePanel.members.columns.role")), 3),
						unref(uiConfig).showCreditsColumn ? (openBlock(), createElementBlock("div", _hoisted_7, [_cache[12] || (_cache[12] = createBaseVNode("i", { class: "icon-[lucide--coins] size-4" }, null, -1)), createTextVNode(" " + toDisplayString(_ctx.$t("workspacePanel.members.columns.creditsUsed")), 1)])) : createCommentVNode("", true),
						unref(permissions).canManageMembers ? (openBlock(), createElementBlock("div", _hoisted_8)) : createCommentVNode("", true)
					], 64))], 2)) : createCommentVNode("", true),
					emptyStateMessage.value ? (openBlock(), createElementBlock("p", _hoisted_9, toDisplayString(emptyStateMessage.value), 1)) : createCommentVNode("", true),
					unref(activeView) === "active" ? (openBlock(), createElementBlock(Fragment, { key: 2 }, [unref(isInPersonalWorkspace) && unref(maxSeats) === 1 ? (openBlock(), createBlock(MemberListItem_default, {
						key: 0,
						member: unref(personalWorkspaceMember),
						"is-current-user": true,
						"photo-url": unref(userPhotoUrl) ?? void 0,
						"grid-cols": unref(uiConfig).membersGridCols,
						"is-single-seat-plan": unref(maxSeats) === 1
					}, null, 8, [
						"member",
						"photo-url",
						"grid-cols",
						"is-single-seat-plan"
					])) : (openBlock(true), createElementBlock(Fragment, { key: 1 }, renderList(unref(filteredMembers), (member) => {
						return openBlock(), createBlock(MemberListItem_default, {
							key: member.id,
							member,
							"is-current-user": unref(isCurrentUser)(member),
							"photo-url": unref(isCurrentUser)(member) ? unref(userPhotoUrl) ?? void 0 : void 0,
							"grid-cols": unref(uiConfig).membersGridCols,
							"show-role-column": unref(uiConfig).showRoleColumn && unref(hasMultipleMembers),
							"show-credits-column": unref(uiConfig).showCreditsColumn,
							"can-manage-members": unref(permissions).canManageMembers,
							"menu-items": unref(memberMenus).get(member.id)
						}, null, 8, [
							"member",
							"is-current-user",
							"photo-url",
							"grid-cols",
							"show-role-column",
							"show-credits-column",
							"can-manage-members",
							"menu-items"
						]);
					}), 128))], 64)) : createCommentVNode("", true),
					unref(activeView) === "pending" ? (openBlock(), createBlock(PendingInvitesList_default, {
						key: 3,
						invites: unref(filteredPendingInvites),
						"grid-cols": unref(uiConfig).pendingGridCols,
						"search-query": unref(searchQuery),
						loaded: unref(pendingInvitesLoaded),
						onResend: unref(handleResendInvite),
						onRevoke: unref(handleRevokeInvite)
					}, null, 8, [
						"invites",
						"grid-cols",
						"search-query",
						"loaded",
						"onResend",
						"onRevoke"
					])) : createCommentVNode("", true)
				], 32)])]),
				unref(isPlanEnded) ? (openBlock(), createElementBlock("div", _hoisted_10, [createBaseVNode("p", _hoisted_11, toDisplayString(_ctx.$t("workspacePanel.members.planEndedFooter")), 1), unref(permissions).canManageSubscription ? (openBlock(), createBlock(Button_default, {
					key: 0,
					variant: "muted-textonly",
					size: "sm",
					class: "text-sm text-base-foreground",
					onClick: _cache[7] || (_cache[7] = ($event) => unref(isSalesManagedPlan) ? handleContactSales() : unref(showTeamPlans)())
				}, {
					default: withCtx(() => [createTextVNode(toDisplayString(unref(isSalesManagedPlan) ? _ctx.$t("workspacePanel.members.contactSales") : _ctx.$t("workspacePanel.members.resubscribe")), 1)]),
					_: 1
				})) : createCommentVNode("", true)])) : unref(hasMemberSeats) && unref(membersLoaded) ? (openBlock(), createElementBlock("div", _hoisted_12, [createBaseVNode("p", _hoisted_13, toDisplayString(unref(maxSeats) === 0 ? _ctx.$t("workspacePanel.members.totalMembersUnlimited", { count: unref(totalMembers) }, unref(totalMembers)) : _ctx.$t("workspacePanel.members.totalMembersCount", {
					count: unref(totalMembers),
					maxSeats: unref(maxSeats)
				})) + " " + toDisplayString(_ctx.$t("workspacePanel.members.needMoreMembers")), 1), createVNode(Button_default, {
					variant: "muted-textonly",
					size: "sm",
					class: "text-sm text-base-foreground",
					onClick: handleContactUs
				}, {
					default: withCtx(() => [createTextVNode(toDisplayString(_ctx.$t("workspacePanel.members.contactUs")), 1)]),
					_: 1
				})])) : createCommentVNode("", true)
			]);
		};
	}
});
//#endregion
//#region src/platform/workspace/components/dialogs/settings/WorkspaceMembersPanelContent.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1$1 = { class: "flex min-h-0 flex-1 flex-col" };
var _hoisted_2 = {
	key: 0,
	class: "flex items-center gap-2 px-6 py-3 text-sm text-warning-background"
};
//#endregion
//#region src/platform/workspace/components/dialogs/settings/WorkspaceMembersPanelContent.vue
var WorkspaceMembersPanelContent_default = /* @__PURE__ */ defineComponent({
	__name: "WorkspaceMembersPanelContent",
	setup(__props) {
		const { fetchMembers, fetchPendingInvites } = useTeamWorkspaceStore();
		const { workspaceRole, permissions } = useWorkspaceUI();
		const loadFailed = ref(false);
		async function load() {
			loadFailed.value = false;
			const results = await Promise.allSettled([fetchMembers(), ...permissions.value.canViewPendingInvites ? [fetchPendingInvites()] : []]);
			loadFailed.value = results.some((result) => result.status === "rejected");
		}
		onMounted(() => {
			load();
		});
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", _hoisted_1$1, [loadFailed.value ? (openBlock(), createElementBlock("div", _hoisted_2, [
				_cache[0] || (_cache[0] = createBaseVNode("i", { class: "icon-[lucide--circle-alert] size-4 shrink-0" }, null, -1)),
				createBaseVNode("span", null, toDisplayString(_ctx.$t("workspacePanel.members.loadFailed")), 1),
				createVNode(Button_default, {
					variant: "muted-textonly",
					size: "sm",
					onClick: load
				}, {
					default: withCtx(() => [createTextVNode(toDisplayString(_ctx.$t("g.retry")), 1)]),
					_: 1
				})
			])) : createCommentVNode("", true), (openBlock(), createBlock(MembersPanelContent_default, { key: unref(workspaceRole) }))]);
		};
	}
});
//#endregion
//#region src/platform/workspace/components/dialogs/settings/WorkspaceSettingsPanelContent.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1 = { class: "@container flex size-full min-h-0 flex-col" };
//#endregion
//#region src/platform/workspace/components/dialogs/settings/WorkspaceSettingsPanelContent.vue
var WorkspaceSettingsPanelContent_default = /* @__PURE__ */ defineComponent({
	__name: "WorkspaceSettingsPanelContent",
	props: { section: {} },
	setup(__props) {
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", _hoisted_1, [createVNode(BillingStatusBanner_default, {
				section: __props.section,
				class: "mb-4"
			}, null, 8, ["section"]), __props.section === "planCredits" ? (openBlock(), createBlock(PlanCreditsPanelContent_default, { key: 0 })) : __props.section === "members" ? (openBlock(), createBlock(WorkspaceMembersPanelContent_default, { key: 1 })) : (openBlock(), createBlock(PartnerNodeAccessPanel_default, { key: 2 }))]);
		};
	}
});
//#endregion
export { WorkspaceSettingsPanelContent_default as default };
