import "./rolldown-runtime-xtsTai4I.js";
import { P as computed, p as storeToRefs } from "./vendor-vue-core-C1utdb0s.js";
import { Ar as toTierKey, In as useBillingOperationStore, Jn as SettledOperationError, On as useBillingContext, Wl as useTeamWorkspaceStore, Z as useCurrentUser, lr as categorizeBillingApiError, tr as useBillingCapabilities, zn as useWorkspaceUI } from "./layoutStore-CZsuzg91.js";
import { n as useTelemetry } from "./telemetry-IkzvF0TI.js";
import { d as t } from "./i18n-C3J-ToPr.js";
import { r as getComfyPlatformBaseUrl } from "./comfyApi-CYSC9hA6.js";
//#region src/platform/workspace/composables/useDowngradeToPersonal.ts
/** Thrown by `downgradeToPersonal` when the billing authority requires
*  reactivation consent, so the still-open confirmation can collect it and
*  retry with `confirmReactivation: true`. */
var ReactivationConfirmationRequiredError = class extends Error {
	preview;
	constructor(preview) {
		super(t("subscription.downgrade.reactivationConfirmationRequired"));
		this.preview = preview;
	}
};
/** Thrown by `downgradeToPersonal` when the amount a caller confirmed no
*  longer matches a fresh preview taken right before billing — refuses to
*  charge an amount the user never actually saw and consented to. */
var ReactivationAmountChangedError = class extends Error {
	preview;
	constructor(preview) {
		super(t("subscription.downgrade.reactivationAmountChanged"));
		this.preview = preview;
	}
};
/**
* Team-plan downgrade to personal: validate via `previewSubscribe`, remove
* every member except the original owner, then initiate the tier change.
* Billing is not committed until member cleanup succeeds, so a removal failure
* cannot leave a personal plan with Team members still attached.
* The removal-email and an atomic downgrade endpoint are backend-owned future
* work; until then the frontend orchestrates the two steps non-atomically.
*/
function useDowngradeToPersonal({ paymentIntentSource } = {}) {
	const workspaceStore = useTeamWorkspaceStore();
	const { members } = storeToRefs(workspaceStore);
	const { subscribe, previewSubscribe, subscription, fetchStatus } = useBillingContext();
	const billingOperationStore = useBillingOperationStore();
	const { userEmail } = useCurrentUser();
	const { permissions } = useWorkspaceUI();
	const { canDowngradeToPersonal } = useBillingCapabilities();
	const telemetry = useTelemetry();
	let activeTelemetryAttempt;
	const removableMembers = computed(() => {
		if (members.value.some((m) => m.isOriginalOwner)) return members.value.filter((m) => !m.isOriginalOwner);
		const email = userEmail.value?.toLowerCase() ?? null;
		return members.value.filter((m) => m.role !== "owner" && m.email.toLowerCase() !== email);
	});
	const hasOtherMembers = computed(() => removableMembers.value.length > 0);
	function ensureCanDowngrade() {
		if (!permissions.value.canDowngradeToPersonal) throw new Error(t("subscription.downgrade.notAllowed"));
	}
	function hasErrorCode(error, code) {
		return typeof error === "object" && error !== null && "code" in error && error.code === code;
	}
	async function refreshMembers() {
		if (!permissions.value.canManageSubscription) throw new Error(t("subscription.downgrade.notAllowed"));
		await workspaceStore.fetchMembers();
		ensureCanDowngrade();
	}
	function requiresReactivationConfirmation(preview) {
		if (preview.transition_type === "new_subscription") return false;
		return subscription.value === null || subscription.value.isCancelled;
	}
	/** Read-only preview so a caller can decide whether to collect reactivation
	*  consent before ever invoking `downgradeToPersonal`. */
	async function previewDowngrade(planSlug) {
		ensureCanDowngrade();
		const preview = await previewSubscribe(planSlug);
		if (!preview?.allowed) throw new Error(preview?.reason || t("subscription.downgrade.notAllowed"));
		ensureCanDowngrade();
		await fetchStatus();
		return {
			preview,
			requiresReactivationConfirmation: requiresReactivationConfirmation(preview)
		};
	}
	async function downgradeToPersonal(planSlug, confirmReactivation = false, confirmedChargeCents) {
		ensureCanDowngrade();
		const membersToRemove = removableMembers.value;
		const telemetryAttempt = activeTelemetryAttempt ?? {
			startedAt: Date.now(),
			memberRemovalCount: membersToRemove.length,
			memberRemovalFailures: 0
		};
		let telemetryFailure;
		if (!activeTelemetryAttempt) {
			activeTelemetryAttempt = telemetryAttempt;
			telemetry?.trackBillingEvent({
				operation: "downgrade_to_personal",
				stage: "started",
				outcome: "pending",
				member_removal_count: telemetryAttempt.memberRemovalCount,
				member_removal_failures: 0,
				payment_intent_source: paymentIntentSource
			});
		}
		function trackSucceeded(operationObserved) {
			const now = Date.now();
			telemetry?.trackBillingEvent({
				operation: "downgrade_to_personal",
				stage: "succeeded",
				outcome: "success",
				member_removal_count: telemetryAttempt.memberRemovalCount,
				member_removal_failures: telemetryAttempt.memberRemovalFailures,
				target_tier: telemetryAttempt.targetTier,
				payment_intent_source: paymentIntentSource,
				duration_ms: now - telemetryAttempt.startedAt
			});
			if (telemetryAttempt.checkoutStartedAt === void 0) return;
			telemetry?.trackBillingEvent({
				operation: "subscription_checkout",
				stage: "succeeded",
				outcome: "success",
				tier: telemetryAttempt.targetTier,
				cycle: telemetryAttempt.targetCycle,
				checkout_type: "change",
				payment_intent_source: paymentIntentSource,
				duration_ms: now - telemetryAttempt.checkoutStartedAt
			});
			if (operationObserved) return;
			telemetry?.trackBillingEvent({
				operation: "operation",
				stage: "succeeded",
				outcome: "success",
				operation_type: "subscription",
				tier: telemetryAttempt.targetTier,
				cycle: telemetryAttempt.targetCycle,
				checkout_type: "change",
				payment_intent_source: paymentIntentSource,
				duration_ms: now - telemetryAttempt.checkoutStartedAt
			});
		}
		try {
			const preview = await previewSubscribe(planSlug);
			if (!preview?.allowed) {
				telemetryFailure = {
					failure_category: "validation",
					error_code: "downgrade_not_allowed"
				};
				throw new Error(preview?.reason || t("subscription.downgrade.notAllowed"));
			}
			ensureCanDowngrade();
			const newPlan = Object.hasOwn(preview, "new_plan") ? preview.new_plan : void 0;
			telemetryAttempt.targetTier = newPlan?.tier ? toTierKey(newPlan.tier) ?? void 0 : void 0;
			telemetryAttempt.targetCycle = newPlan ? newPlan.duration === "ANNUAL" ? "yearly" : "monthly" : void 0;
			await fetchStatus();
			if (requiresReactivationConfirmation(preview)) {
				if (!confirmReactivation) throw new ReactivationConfirmationRequiredError(preview);
				if (preview.cost_today_cents !== confirmedChargeCents) throw new ReactivationAmountChangedError(preview);
			}
			for (const member of membersToRemove) {
				ensureCanDowngrade();
				try {
					await workspaceStore.removeMember(member.id);
				} catch (error) {
					telemetryAttempt.memberRemovalFailures += 1;
					telemetryFailure = {
						failure_category: categorizeBillingApiError(error),
						error_code: "member_removal_failed"
					};
					throw new Error(t("subscription.downgrade.memberRemovalFailed", { email: member.email }), { cause: error });
				}
			}
			ensureCanDowngrade();
			if (telemetryAttempt.checkoutStartedAt === void 0) {
				telemetryAttempt.checkoutStartedAt = Date.now();
				telemetry?.trackBillingEvent({
					operation: "subscription_checkout",
					stage: "started",
					outcome: "pending",
					tier: telemetryAttempt.targetTier,
					cycle: telemetryAttempt.targetCycle,
					checkout_type: "change",
					payment_intent_source: paymentIntentSource
				});
				telemetry?.trackBillingEvent({
					operation: "operation",
					stage: "started",
					outcome: "pending",
					operation_type: "subscription",
					tier: telemetryAttempt.targetTier,
					cycle: telemetryAttempt.targetCycle,
					checkout_type: "change",
					payment_intent_source: paymentIntentSource
				});
			}
			let response;
			try {
				response = await subscribe(planSlug, {
					returnUrl: `${getComfyPlatformBaseUrl()}/payment/success`,
					cancelUrl: `${getComfyPlatformBaseUrl()}/payment/failed`,
					confirmReactivation,
					...preview.proration_at && { prorationAt: preview.proration_at },
					attemptStartedAt: telemetryAttempt.checkoutStartedAt
				});
			} catch (error) {
				if (!confirmReactivation && hasErrorCode(error, "REACTIVATION_CONFIRMATION_REQUIRED")) throw new ReactivationConfirmationRequiredError(preview);
				throw error;
			}
			if (!response) {
				telemetryFailure = {
					failure_category: "unknown",
					error_code: "missing_checkout_response"
				};
				throw new Error(telemetryAttempt.memberRemovalCount > 0 ? t("subscription.downgrade.failedAfterMemberRemoval") : t("subscription.downgrade.failed"));
			}
			if (response.status === "needs_payment_method") {
				if (!response.payment_method_url) {
					telemetryFailure = {
						failure_category: "redirect",
						error_code: "missing_payment_method_url"
					};
					throw new Error(t("subscription.downgrade.paymentMethodRequired"));
				}
				if (!window.open(response.payment_method_url, "_blank")) {
					telemetryFailure = {
						failure_category: "redirect",
						error_code: "payment_popup_blocked"
					};
					throw new Error(t("subscription.downgrade.paymentPageBlocked"));
				}
				billingOperationStore.startOperation(response.billing_op_id, "subscription", {
					tier: telemetryAttempt.targetTier,
					cycle: telemetryAttempt.targetCycle,
					checkoutType: "change",
					paymentIntentSource,
					downgradeToPersonal: {
						memberRemovalCount: telemetryAttempt.memberRemovalCount,
						memberRemovalFailures: telemetryAttempt.memberRemovalFailures,
						targetTier: telemetryAttempt.targetTier,
						startedAt: telemetryAttempt.startedAt
					},
					attemptStartedAt: telemetryAttempt.checkoutStartedAt
				});
				activeTelemetryAttempt = void 0;
				return null;
			}
			if (response.status === "pending_payment") {
				billingOperationStore.startOperation(response.billing_op_id, "subscription", {
					tier: telemetryAttempt.targetTier,
					cycle: telemetryAttempt.targetCycle,
					checkoutType: "change",
					paymentIntentSource,
					downgradeToPersonal: {
						memberRemovalCount: telemetryAttempt.memberRemovalCount,
						memberRemovalFailures: telemetryAttempt.memberRemovalFailures,
						targetTier: telemetryAttempt.targetTier,
						startedAt: telemetryAttempt.startedAt
					},
					attemptStartedAt: telemetryAttempt.checkoutStartedAt
				});
				activeTelemetryAttempt = void 0;
				return null;
			}
			trackSucceeded(response.operationObserved === true);
			activeTelemetryAttempt = void 0;
			return {
				preview,
				response
			};
		} catch (error) {
			if (error instanceof ReactivationConfirmationRequiredError || error instanceof ReactivationAmountChangedError) throw error;
			const failure = telemetryFailure ?? { failure_category: categorizeBillingApiError(error) };
			const now = Date.now();
			telemetry?.trackBillingEvent({
				operation: "downgrade_to_personal",
				stage: "failed",
				outcome: "failure",
				member_removal_count: telemetryAttempt.memberRemovalCount,
				member_removal_failures: telemetryAttempt.memberRemovalFailures,
				target_tier: telemetryAttempt.targetTier,
				payment_intent_source: paymentIntentSource,
				...failure,
				duration_ms: now - telemetryAttempt.startedAt
			});
			if (telemetryAttempt.checkoutStartedAt !== void 0) {
				telemetry?.trackBillingEvent({
					operation: "subscription_checkout",
					stage: "failed",
					outcome: "failure",
					tier: telemetryAttempt.targetTier,
					cycle: telemetryAttempt.targetCycle,
					checkout_type: "change",
					payment_intent_source: paymentIntentSource,
					...failure,
					duration_ms: now - telemetryAttempt.checkoutStartedAt
				});
				if (!(error instanceof SettledOperationError)) telemetry?.trackBillingEvent({
					operation: "operation",
					stage: "failed",
					outcome: "failure",
					operation_type: "subscription",
					tier: telemetryAttempt.targetTier,
					cycle: telemetryAttempt.targetCycle,
					checkout_type: "change",
					payment_intent_source: paymentIntentSource,
					...failure,
					duration_ms: now - telemetryAttempt.checkoutStartedAt
				});
			}
			activeTelemetryAttempt = void 0;
			throw error;
		}
	}
	return {
		removableMembers,
		hasOtherMembers,
		refreshMembers,
		previewDowngrade,
		downgradeToPersonal
	};
}
//#endregion
export { ReactivationAmountChangedError, ReactivationConfirmationRequiredError, useDowngradeToPersonal };
