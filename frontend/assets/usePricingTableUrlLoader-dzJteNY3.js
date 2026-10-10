import "./rolldown-runtime-xtsTai4I.js";
import { c as useRoute, l as useRouter } from "./vendor-vue-core-C1utdb0s.js";
import { Nn as useSubscriptionDialog, On as useBillingContext, cu as PRESERVED_QUERY_NAMESPACES, fu as hydratePreservedQuery, pu as mergePreservedQueryIntoQuery, tr as useBillingCapabilities, uu as clearPreservedQuery, zn as useWorkspaceUI } from "./layoutStore-CZsuzg91.js";
//#region src/platform/cloud/subscription/composables/usePricingTableUrlLoader.ts
var NAMESPACE = PRESERVED_QUERY_NAMESPACES.PRICING;
function isCheckoutTier(value) {
	return value === "standard" || value === "creator" || value === "pro";
}
function isBillingCycle(value) {
	return value === "monthly" || value === "yearly";
}
function getTeamCheckoutRequest(pricing, stop, cycle) {
	if (pricing !== "team" || typeof stop !== "string" || !stop || !isBillingCycle(cycle)) return;
	return {
		stop,
		billingCycle: cycle
	};
}
function getPricingCheckoutSelection(pricing, stop, cycle, teamCreditStops) {
	if (isCheckoutTier(pricing)) {
		if (stop !== void 0 || !isBillingCycle(cycle)) return;
		return {
			planMode: "personal",
			tierKey: pricing,
			billingCycle: cycle
		};
	}
	const teamCheckoutRequest = getTeamCheckoutRequest(pricing, stop, cycle);
	if (!teamCheckoutRequest) return;
	const catalogStop = teamCreditStops?.stops.find((candidate) => candidate.id === teamCheckoutRequest.stop);
	if (!catalogStop) return;
	return {
		planMode: "team",
		stop: {
			id: catalogStop.id,
			credits: catalogStop.credits,
			usd: catalogStop[teamCheckoutRequest.billingCycle].list_price_cents / 100,
			discountedUsd: catalogStop[teamCheckoutRequest.billingCycle].price_cents / 100
		},
		billingCycle: teamCheckoutRequest.billingCycle
	};
}
/**
* Opens the pricing table from a `?pricing=` deep link, to send pilot users
* straight to subscribe. Values: `1` (default tab), `team`, `personal`, or a
* selected personal tier or Team credit stop with a billing cycle to open its
* confirmation.
*
* Gated to workspace owners (`canManageSubscription`); a member is a silent
* no-op with the param stripped. Survives the login redirect via the
* preserved-query system, like the invite URL loader.
*/
function usePricingTableUrlLoader() {
	const route = useRoute();
	const router = useRouter();
	const subscriptionDialog = useSubscriptionDialog();
	const { teamCreditStops, fetchPlans } = useBillingContext();
	const { permissions, canOpenPricingSurface } = useWorkspaceUI();
	const { initialize: initializeCapabilities } = useBillingCapabilities();
	/** Reads `?pricing=`, strips it, and opens the table when the gate allows. */
	async function loadPricingTableFromUrl() {
		hydratePreservedQuery(NAMESPACE);
		const query = mergePreservedQueryIntoQuery(NAMESPACE, route.query) ?? route.query;
		const param = query.pricing;
		if (param === void 0 && query.stop === void 0 && query.cycle === void 0) return;
		const cleanQuery = { ...query };
		delete cleanQuery.pricing;
		delete cleanQuery.stop;
		delete cleanQuery.cycle;
		router.replace({ query: cleanQuery }).catch((error) => {
			console.warn("[usePricingTableUrlLoader] Failed to clean URL params:", error);
		});
		clearPreservedQuery(NAMESPACE);
		if (typeof param !== "string" || !param) return;
		if (!permissions.value.canManageSubscription) return;
		await initializeCapabilities();
		if (!canOpenPricingSurface.value) return;
		const teamCheckoutRequest = getTeamCheckoutRequest(param, query.stop, query.cycle);
		if (teamCheckoutRequest && !teamCreditStops.value) {
			try {
				await fetchPlans();
			} catch (error) {
				console.error("[usePricingTableUrlLoader] Failed to load Team pricing plans:", error);
			}
			if (permissions.value.canManageSubscription !== true) return;
			if (!teamCreditStops.value) {
				subscriptionDialog.showPricingTable({
					reason: "deep_link",
					planMode: "team"
				});
				return;
			}
		}
		const initialCheckout = getPricingCheckoutSelection(param, query.stop, query.cycle, teamCreditStops.value);
		if (isCheckoutTier(param) && !initialCheckout) return;
		if (teamCheckoutRequest && !initialCheckout) {
			subscriptionDialog.showPricingTable({
				reason: "deep_link",
				planMode: "team"
			});
			return;
		}
		if (!initialCheckout && (query.stop !== void 0 || query.cycle !== void 0)) return;
		const planMode = initialCheckout ? initialCheckout.planMode : param === "team" || param === "personal" ? param : void 0;
		if (!initialCheckout && ![
			"1",
			"team",
			"personal"
		].includes(param)) return;
		if (permissions.value.canManageSubscription !== true) return;
		subscriptionDialog.showPricingTable({
			reason: "deep_link",
			planMode,
			initialCheckout
		});
	}
	return { loadPricingTableFromUrl };
}
//#endregion
export { usePricingTableUrlLoader as n, getPricingCheckoutSelection as t };
