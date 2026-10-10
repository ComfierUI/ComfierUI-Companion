import "./rolldown-runtime-xtsTai4I.js";
import { Ln as toBillingCycle, Rn as toCurrentTier } from "./layoutStore-CZsuzg91.js";
//#region src/platform/cloud/subscription/utils/subscriptionCancellationTelemetry.ts
function getSubscriptionCancellationMetadata({ cancelAt, duration, endDate, tier }) {
	const effectiveEndDate = cancelAt ?? endDate;
	return {
		source: "cancel_plan_menu",
		current_tier: tier?.toLowerCase(),
		...duration ? { cycle: duration === "ANNUAL" ? "yearly" : "monthly" } : {},
		...effectiveEndDate ? { end_date: effectiveEndDate } : {}
	};
}
/**
* Reports a cancel flow as billing events. Once the customer confirms, the flow
* is no longer abandoned. While a confirmed cancel is expected to become an
* operation, its `billing.operation.*` events also own any failure, so `failed`
* is reported only for a flow that has no operation expected.
*/
function createCancelFlowReporter(telemetry, getPlan, options = {}) {
	let confirmed = options.confirmed ?? false;
	let operationFollows = false;
	const plan = () => {
		const { duration, tier } = getPlan();
		return {
			current_tier: toCurrentTier(tier),
			cycle: toBillingCycle(duration)
		};
	};
	return {
		intent() {
			telemetry?.trackBillingEvent({
				operation: "cancel",
				stage: "intent",
				outcome: "pending",
				...plan()
			});
		},
		confirmed(options) {
			confirmed = true;
			operationFollows = options.operationFollows;
		},
		hasConfirmed: () => confirmed,
		sessionFailed() {
			operationFollows = false;
		},
		abandoned() {
			if (confirmed) return;
			telemetry?.trackBillingEvent({
				operation: "cancel",
				stage: "abandoned",
				outcome: "pending",
				...plan()
			});
		},
		failed(failureCategory) {
			if (operationFollows) return;
			telemetry?.trackBillingEvent({
				operation: "cancel",
				stage: "failed",
				outcome: "failure",
				failure_category: failureCategory,
				...plan()
			});
		}
	};
}
//#endregion
export { getSubscriptionCancellationMetadata as n, createCancelFlowReporter as t };
