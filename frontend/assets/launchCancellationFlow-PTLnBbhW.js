import "./rolldown-runtime-xtsTai4I.js";
import { Gl as workspaceApi, On as useBillingContext, Wl as useTeamWorkspaceStore, dr as supportsInAppCancellation, kn as CancellationScopeChangedError } from "./layoutStore-CZsuzg91.js";
import { n as useTelemetry } from "./telemetry-IkzvF0TI.js";
import { i as toError, n as reportError, r as getErrorMessage } from "./reportError-LG-zfbNw.js";
import { t as useToastStore } from "./toastStore-CTfykAzG.js";
import { d as t } from "./i18n-C3J-ToPr.js";
import { t as useFeatureFlags } from "./useFeatureFlags-DAoj_aDd.js";
import { n as getSubscriptionCancellationMetadata, t as createCancelFlowReporter } from "./subscriptionCancellationTelemetry-DPU1P5zB.js";
import { t as createScriptLoader } from "./loadExternalScript-BQM11osQ.js";
//#region src/platform/cloud/churnkey/churnkeyClient.ts
var EMBED_SCRIPT_URL = "https://assets.churnkey.co/js/app.js";
var scriptLoaders = /* @__PURE__ */ new Map();
function loadChurnkey(appId) {
	window.churnkey ??= { created: true };
	const src = `${EMBED_SCRIPT_URL}?appId=${encodeURIComponent(appId)}`;
	let loadScript = scriptLoaders.get(src);
	if (!loadScript) {
		loadScript = createScriptLoader(src, () => window.churnkey?.init ?? null);
		scriptLoaders.set(src, loadScript);
	}
	return loadScript();
}
function churnkeyError(error, type) {
	const baseError = toError(error);
	return type ? /* @__PURE__ */ new Error(`${baseError.message} (${type})`) : baseError;
}
function rejectUnsupportedOffer() {
	return Promise.reject(new Error(t("subscription.cancelDialog.offerUnavailable")));
}
function createSession(init, auth, configuredAppId) {
	const offerSubscriptionId = auth.offer_subscription_id;
	return { show: (options) => new Promise((resolve, reject) => {
		let settled = false;
		let retention = { type: "undecided" };
		function settle(fn) {
			if (settled) return;
			settled = true;
			fn();
			window.churnkey?.clearState?.();
		}
		function handleCancel(surveyResponse, freeformFeedback) {
			switch (retention.type) {
				case "discounted": return Promise.reject(new Error(t("subscription.cancelDialog.discountApplied")));
				case "cancelling": return retention.cancellation;
				case "undecided": {
					const cancellation = options.handleCancel(surveyResponse, freeformFeedback);
					retention = {
						type: "cancelling",
						cancellation
					};
					return cancellation;
				}
			}
		}
		function settleAfterCancellation(cancellation, outcome) {
			cancellation.then(() => settle(() => resolve(outcome)), (error) => settle(() => reject(toError(error))));
		}
		function recordDiscount() {
			if (settled) return;
			switch (retention.type) {
				case "undecided":
					retention = { type: "discounted" };
					return;
				case "discounted": return;
				case "cancelling":
					reportError(/* @__PURE__ */ new Error("Churnkey applied a discount during cancellation"), {
						surface: "billing",
						errorType: "error_applying_churnkey_discount_during_cancellation"
					});
					return;
				default: return retention;
			}
		}
		const offerConfig = offerSubscriptionId ? {
			subscriptionId: offerSubscriptionId,
			onDiscount: recordDiscount,
			customerAttributes: { nativeOfferEligible: true }
		} : {
			handleDiscount: rejectUnsupportedOffer,
			customerAttributes: { nativeOfferEligible: false }
		};
		const config = {
			appId: configuredAppId,
			authHash: auth.auth_hash,
			customerId: auth.customer_id,
			provider: "stripe",
			mode: auth.mode,
			handleCancel: (_customer, surveyResponse, freeformFeedback) => handleCancel(surveyResponse, freeformFeedback),
			handlePause: rejectUnsupportedOffer,
			...offerConfig,
			handleTrialExtension: rejectUnsupportedOffer,
			handlePlanChange: rejectUnsupportedOffer,
			handleRebate: rejectUnsupportedOffer,
			handleRedirect: rejectUnsupportedOffer,
			onClose: (results) => {
				const closedOutcome = { type: results.aborted === true ? "abandoned" : "closed" };
				switch (retention.type) {
					case "undecided":
						settle(() => resolve(closedOutcome));
						return;
					case "discounted":
						settle(() => resolve({ type: "discount-applied" }));
						return;
					case "cancelling":
						settleAfterCancellation(retention.cancellation, closedOutcome);
						return;
					default: return retention;
				}
			},
			onError: (error, type) => {
				if (settled) return;
				window.churnkey?.hide?.();
				switch (retention.type) {
					case "undecided":
						settled = true;
						reject(churnkeyError(error, type));
						queueMicrotask(() => window.churnkey?.clearState?.());
						return;
					case "discounted":
						settled = true;
						resolve({ type: "discount-applied" });
						reportError(error, {
							surface: "billing",
							errorType: "error_displaying_churnkey_after_discount",
							context: { churnkeyErrorType: type }
						});
						queueMicrotask(() => window.churnkey?.clearState?.());
						return;
					case "cancelling":
						reportError(error, {
							surface: "billing",
							errorType: "error_displaying_churnkey_during_cancellation",
							context: { churnkeyErrorType: type }
						});
						settleAfterCancellation(retention.cancellation, { type: "closed" });
						return;
					default: return retention;
				}
			}
		};
		try {
			init("show", config);
		} catch (error) {
			settle(() => {
				window.churnkey?.hide?.();
				reject(churnkeyError(error));
			});
		}
	}) };
}
async function prepareChurnkey() {
	const configuredAppId = useFeatureFlags().flags.churnkeyAppId;
	if (!configuredAppId) return null;
	const auth = await workspaceApi.getChurnkeyAuth();
	return createSession(await loadChurnkey(configuredAppId), auth, configuredAppId);
}
//#endregion
//#region src/platform/cloud/subscription/launchCancellationFlow.ts
function fallbackReportedError(fallbackError, vendorFailure) {
	const fallback = toError(fallbackError);
	if (!vendorFailure) return fallback;
	const reported = new Error(fallback.message, { cause: toError(vendorFailure.error) });
	reported.name = fallback.name;
	reported.stack = fallback.stack;
	return reported;
}
function reportFallbackFailure(fallbackError, vendorFailure, workspaceStillCurrent) {
	reportError(fallbackReportedError(fallbackError, vendorFailure), {
		surface: "billing",
		errorType: "cloud_cancellation_vendor_fallback",
		tags: {
			failure_kind: workspaceStillCurrent ? "caught_unexpected" : "degraded",
			feature_area: "billing",
			operation: "load",
			outcome: workspaceStillCurrent ? "failed" : "aborted",
			vendor_stage: vendorFailure?.stage ?? "none",
			vendor_preparation_failed: vendorFailure?.stage === "preparation",
			workspace_still_current: workspaceStillCurrent
		},
		level: workspaceStillCurrent ? "error" : "warning"
	});
	if (!workspaceStillCurrent) return;
	useToastStore().add({
		severity: "error",
		summary: t("subscription.cancelDialog.failed"),
		life: 8e3
	});
}
async function showCancellationFallback(showFallback, isScopeCurrent, options, vendorFailure) {
	if (!isScopeCurrent()) return "declined";
	try {
		return await showFallback({
			...options,
			isScopeCurrent
		}) ? "shown" : "declined";
	} catch (fallbackError) {
		reportFallbackFailure(fallbackError, vendorFailure, isScopeCurrent());
		return "failed";
	}
}
async function prepareCancellationSession(isLaunchWorkspaceCurrent, showFallback) {
	const preparation = await prepareChurnkey().then((session) => ({
		session,
		threw: false
	}), (error) => ({
		session: null,
		threw: true,
		error
	}));
	if (preparation.session) return preparation.session;
	if (!isLaunchWorkspaceCurrent()) {
		if (preparation.threw) reportError(preparation.error, {
			surface: "billing",
			errorType: "cloud_cancellation_vendor_fallback",
			tags: {
				failure_kind: "degraded",
				feature_area: "billing",
				operation: "load",
				outcome: "aborted",
				workspace_still_current: false
			},
			level: "warning"
		});
		return null;
	}
	const fallbackOutcome = await showCancellationFallback(showFallback, isLaunchWorkspaceCurrent, void 0, preparation.threw ? {
		stage: "preparation",
		error: preparation.error
	} : void 0);
	if (preparation.threw && fallbackOutcome !== "failed") {
		const workspaceStillCurrent = isLaunchWorkspaceCurrent();
		reportError(preparation.error, {
			surface: "billing",
			errorType: "cloud_cancellation_vendor_fallback",
			tags: {
				failure_kind: "degraded",
				feature_area: "billing",
				operation: "load",
				outcome: fallbackOutcome === "shown" && workspaceStillCurrent ? "recovered" : "aborted",
				workspace_still_current: workspaceStillCurrent
			},
			level: "warning"
		});
	}
	return null;
}
async function fallBackAfterSessionFailure(error, showFallback, isScopeCurrent, cancelReport) {
	cancelReport.sessionFailed();
	if (await showCancellationFallback(showFallback, isScopeCurrent, {
		flowAlreadyOpened: true,
		flowAlreadyConfirmed: cancelReport.hasConfirmed()
	}, {
		stage: "session",
		error
	}) === "failed") cancelReport.failed("rendering");
}
async function launchCancellationFlow({ cancelAt, launchWorkspaceId: capturedWorkspaceId, showFallback }) {
	const billing = useBillingContext();
	const workspaceStore = useTeamWorkspaceStore();
	const launchWorkspaceId = capturedWorkspaceId === void 0 ? workspaceStore.activeWorkspaceId : capturedWorkspaceId;
	const isLaunchWorkspaceCurrent = () => workspaceStore.activeWorkspaceId === launchWorkspaceId;
	if (billing.type.value !== "workspace" || !launchWorkspaceId || !supportsInAppCancellation(workspaceStore.activeWorkspaceBillingRail)) {
		await showCancellationFallback(showFallback, launchWorkspaceId ? isLaunchWorkspaceCurrent : () => true);
		return;
	}
	const session = await prepareCancellationSession(isLaunchWorkspaceCurrent, showFallback);
	if (!session) return;
	if (!isLaunchWorkspaceCurrent()) return;
	const telemetry = useTelemetry();
	const metadata = getSubscriptionCancellationMetadata({
		cancelAt,
		duration: billing.subscription.value?.duration,
		endDate: billing.subscription.value?.endDate,
		tier: billing.tier.value
	});
	const plan = {
		duration: billing.subscription.value?.duration,
		tier: billing.tier.value
	};
	const cancelReport = createCancelFlowReporter(telemetry, () => plan);
	telemetry?.trackSubscriptionCancellation("flow_opened", metadata);
	cancelReport.intent();
	try {
		const results = await session.show({ handleCancel: async () => {
			if (!isLaunchWorkspaceCurrent()) throw new CancellationScopeChangedError(t("subscription.cancelDialog.workspaceChanged"));
			telemetry?.trackSubscriptionCancellation("confirmed", metadata);
			cancelReport.confirmed({ operationFollows: true });
			try {
				await billing.cancelSubscription(isLaunchWorkspaceCurrent);
				return { message: t("subscription.cancelSuccess") };
			} catch (error) {
				throw new Error(getErrorMessage(error) ?? t("subscription.cancelDialog.failed"), { cause: error });
			}
		} });
		switch (results.type) {
			case "discount-applied":
				if (!isLaunchWorkspaceCurrent()) return;
				await billing.fetchStatus().catch((error) => {
					reportError(error, {
						surface: "billing",
						errorType: "error_refreshing_billing_after_churnkey_discount"
					});
					useToastStore().add({
						severity: "warn",
						summary: t("subscription.cancelDialog.discountRefreshFailed"),
						life: 8e3
					});
				});
				return;
			case "abandoned":
				telemetry?.trackSubscriptionCancellation("abandoned", metadata);
				cancelReport.abandoned();
				return;
			case "closed": return;
			default: return results;
		}
	} catch (error) {
		if (!isLaunchWorkspaceCurrent()) return;
		telemetry?.trackSubscriptionCancellation("failed", {
			...metadata,
			error_message: getErrorMessage(error) ?? t("g.unknownError")
		});
		await fallBackAfterSessionFailure(error, showFallback, isLaunchWorkspaceCurrent, cancelReport);
	}
}
//#endregion
export { launchCancellationFlow };
