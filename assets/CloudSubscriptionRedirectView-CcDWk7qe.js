import "./rolldown-runtime-xtsTai4I.js";
import { F as createBaseVNode, G as defineComponent, I as createBlock, Kt as unref, L as createCommentVNode, Lt as ref, P as computed, R as createElementBlock, Zt as toDisplayString, c as useRoute, l as useRouter, lt as openBlock, ot as onMounted } from "./vendor-vue-core-C1utdb0s.js";
import { Nn as useSubscriptionDialog, On as useBillingContext, or as useAuthActions, vu as useErrorHandling } from "./layoutStore-CZsuzg91.js";
import { r as useI18n } from "./vendor-i18n-BZvE7WBQ.js";
import { i as script } from "./vendor-primevue-C3d0HJ53.js";
import { t as Spinner_default } from "./Spinner-B79hMIoc.js";
import { t as comfy_logo_single_default } from "./comfy-logo-single-BCSzfwR_.js";
import { t as getPricingCheckoutSelection } from "./usePricingTableUrlLoader-dzJteNY3.js";
//#region src/platform/cloud/onboarding/CloudSubscriptionRedirectView.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1 = { class: "flex size-full items-center justify-center bg-comfy-menu-secondary" };
var _hoisted_2 = { class: "flex flex-col items-center gap-4" };
var _hoisted_3 = ["alt"];
var _hoisted_4 = {
	key: 0,
	class: "font-inter text-base/normal font-normal text-base-foreground"
};
//#endregion
//#region src/platform/cloud/onboarding/CloudSubscriptionRedirectView.vue
var CloudSubscriptionRedirectView_default = /* @__PURE__ */ defineComponent({
	__name: "CloudSubscriptionRedirectView",
	setup(__props) {
		function isBillingCycle(value) {
			return value === "monthly" || value === "yearly";
		}
		function isCheckoutTierKey(value) {
			return [
				"standard",
				"creator",
				"pro"
			].includes(value);
		}
		function isPaidPersonalTierKey(value) {
			return isCheckoutTierKey(value) || value === "founder";
		}
		const { t } = useI18n();
		const route = useRoute();
		const router = useRouter();
		const { reportError } = useAuthActions();
		const { wrapWithErrorHandlingAsync } = useErrorHandling();
		const { showPricingTable } = useSubscriptionDialog();
		const { canAccessSubscriptionFeatures, isInitialized, teamCreditStops, initialize, fetchPlans, manageSubscription } = useBillingContext();
		const selectedTierKey = ref(null);
		const tierDisplayName = computed(() => {
			if (!selectedTierKey.value) return "";
			return {
				free: t("subscription.tiers.free.name"),
				standard: t("subscription.tiers.standard.name"),
				creator: t("subscription.tiers.creator.name"),
				pro: t("subscription.tiers.pro.name"),
				founder: t("subscription.tiers.founder.name")
			}[selectedTierKey.value];
		});
		const isTeamCheckout = ref(false);
		const planLabel = computed(() => isTeamCheckout.value ? t("subscription.teamPlan.name") : tierDisplayName.value);
		const runRedirect = wrapWithErrorHandlingAsync(async () => {
			const rawType = route.query.tier;
			const rawCycle = route.query.cycle;
			let tierKeyParam = null;
			let cycleParam = "monthly";
			if (typeof rawType === "string") tierKeyParam = rawType;
			else if (Array.isArray(rawType) && rawType[0]) tierKeyParam = rawType[0];
			if (typeof rawCycle === "string") cycleParam = rawCycle;
			else if (Array.isArray(rawCycle) && rawCycle[0]) cycleParam = rawCycle[0];
			if (!tierKeyParam) {
				await router.push("/");
				return;
			}
			const billingCycle = isBillingCycle(cycleParam) ? cycleParam : "monthly";
			let stopId = null;
			if (tierKeyParam === "team") {
				const rawStop = route.query.stop;
				stopId = typeof rawStop === "string" ? rawStop : Array.isArray(rawStop) ? rawStop[0] : null;
				if (!stopId) {
					await router.push("/");
					return;
				}
				isTeamCheckout.value = true;
			} else if (!isPaidPersonalTierKey(tierKeyParam)) {
				await router.push("/");
				return;
			} else selectedTierKey.value = tierKeyParam;
			if (!isInitialized.value) await initialize();
			if (canAccessSubscriptionFeatures.value) {
				await manageSubscription();
				return;
			}
			if (isPaidPersonalTierKey(tierKeyParam)) {
				if (!isCheckoutTierKey(tierKeyParam)) {
					showPricingTable({
						reason: "deep_link",
						planMode: "personal"
					});
					return;
				}
				showPricingTable({
					reason: "deep_link",
					planMode: "personal",
					initialCheckout: {
						planMode: "personal",
						tierKey: tierKeyParam,
						billingCycle
					}
				});
				return;
			}
			if (!teamCreditStops.value) await fetchPlans().catch(reportError);
			const initialCheckout = getPricingCheckoutSelection(tierKeyParam, stopId, billingCycle, teamCreditStops.value);
			showPricingTable({
				reason: "deep_link",
				planMode: "team",
				initialCheckout
			});
		}, reportError);
		onMounted(() => {
			document.getElementById("splash-loader")?.remove();
			runRedirect();
		});
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", _hoisted_1, [createBaseVNode("div", _hoisted_2, [
				createBaseVNode("img", {
					src: comfy_logo_single_default,
					alt: unref(t)("g.comfyOrgLogoAlt"),
					class: "size-16"
				}, null, 8, _hoisted_3),
				planLabel.value ? (openBlock(), createElementBlock("p", _hoisted_4, toDisplayString(unref(t)("subscription.subscribeTo", { plan: planLabel.value })), 1)) : createCommentVNode("", true),
				planLabel.value ? (openBlock(), createBlock(Spinner_default, {
					key: 1,
					class: "size-8"
				})) : createCommentVNode("", true),
				planLabel.value ? (openBlock(), createBlock(unref(script), {
					key: 2,
					as: "a",
					href: "/",
					link: "",
					label: unref(t)("cloudOnboarding.skipToCloudApp")
				}, null, 8, ["label"])) : createCommentVNode("", true)
			])]);
		};
	}
});
//#endregion
export { CloudSubscriptionRedirectView_default as default };
