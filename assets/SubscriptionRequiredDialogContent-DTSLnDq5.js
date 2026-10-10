import "./rolldown-runtime-xtsTai4I.js";
import { Dt as withDirectives, Et as withCtx, F as createBaseVNode, G as defineComponent, H as createTextVNode, I as createBlock, Jt as normalizeClass, Kt as unref, L as createCommentVNode, Lt as ref, O as Fragment, P as computed, R as createElementBlock, St as watch, U as createVNode, Zt as toDisplayString, dt as renderList, lt as openBlock, p as storeToRefs, pt as resolveComponent, w as vShow } from "./vendor-vue-core-C1utdb0s.js";
import { Ar as toTierKey, On as useBillingContext, Wl as useTeamWorkspaceStore, Zr as useCommandStore, br as TIER_PRICING, or as useAuthActions, tt as useAuthStore, vu as useErrorHandling, xr as amountForBillingCycle } from "./layoutStore-CZsuzg91.js";
import { n as useTelemetry } from "./telemetry-IkzvF0TI.js";
import { r as useI18n } from "./vendor-i18n-BZvE7WBQ.js";
import { t as cn } from "./src-DI1bBfrb.js";
import { t as Button_default } from "./Button-j0oCzR82.js";
import { t as _plugin_vue_export_helper_default } from "./_plugin-vue_export-helper-DEKQMRQ4.js";
import { n as ToggleGroup_default, t as ToggleGroupItem_default } from "./ToggleGroupItem-Da4A26JJ.js";
import "./toggle-group-B0brfUuj.js";
import "./cloud-subscription-Bm9_w48j.js";
import { t as TopbarBadge_default } from "./TopbarBadge-TDXWCiJQ.js";
import { t as ImperativePopover_default } from "./ImperativePopover-CdNFQ3n2.js";
import { t as SubscribeButton_default } from "./SubscribeButton-Dtw_BkMs.js";
//#endregion
//#region src/components/topbar/CloudBadge.vue
var CloudBadge_default = /* @__PURE__ */ defineComponent({
	__name: "CloudBadge",
	props: {
		displayMode: { default: "full" },
		reverseOrder: { type: Boolean },
		noPadding: { type: Boolean },
		backgroundColor: { default: "var(--comfy-menu-bg)" }
	},
	setup(__props) {
		const cloudBadge = computed(() => ({
			icon: "icon-[lucide--cloud]",
			text: "Comfy Cloud"
		}));
		return (_ctx, _cache) => {
			return openBlock(), createBlock(TopbarBadge_default, {
				badge: cloudBadge.value,
				"display-mode": __props.displayMode,
				"reverse-order": __props.reverseOrder,
				"no-padding": __props.noPadding,
				"background-color": __props.backgroundColor
			}, null, 8, [
				"badge",
				"display-mode",
				"reverse-order",
				"no-padding",
				"background-color"
			]);
		};
	}
});
[
	"yearly-pro",
	"yearly-creator",
	"yearly-standard",
	"monthly-pro",
	"monthly-creator",
	"monthly-standard"
].reduce((acc, plan, index) => acc.set(plan, index), /* @__PURE__ */ new Map());
//#endregion
//#region src/platform/cloud/subscription/components/PricingTable.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1$2 = { class: "flex flex-col gap-6" };
var _hoisted_2$2 = { class: "flex justify-center" };
var _hoisted_3$2 = { class: "flex items-center gap-2" };
var _hoisted_4$2 = {
	key: 0,
	class: "flex items-center rounded-full bg-primary-background px-2 py-0.5 text-2xs font-bold whitespace-nowrap text-white"
};
var _hoisted_5$2 = { class: "flex flex-col items-stretch gap-4 xl:flex-row" };
var _hoisted_6$2 = { class: "flex flex-col gap-4 p-6 pb-0" };
var _hoisted_7$2 = { class: "flex flex-row items-center justify-between gap-2" };
var _hoisted_8$1 = { class: "font-inter text-base/normal font-bold text-base-foreground" };
var _hoisted_9$1 = {
	key: 0,
	class: "flex h-5 items-center rounded-full bg-base-foreground px-1.5 text-2xs font-bold tracking-tight text-base-background uppercase"
};
var _hoisted_10$1 = { class: "flex flex-col" };
var _hoisted_11$1 = { class: "flex flex-col gap-2" };
var _hoisted_12$1 = { class: "flex flex-row items-baseline gap-2" };
var _hoisted_13$1 = { class: "font-inter text-[28px] leading-normal font-semibold text-base-foreground tabular-nums" };
var _hoisted_14$1 = { class: "font-inter text-xl/normal text-base-foreground" };
var _hoisted_15$1 = { class: "flex items-center gap-2" };
var _hoisted_16$1 = { class: "text-sm text-muted-foreground" };
var _hoisted_17$1 = ["aria-label"];
var _hoisted_18 = { class: "flex flex-1 flex-col gap-3 pb-0" };
var _hoisted_19 = { class: "flex flex-row items-center justify-between" };
var _hoisted_20 = { class: "font-inter text-sm/normal font-normal text-base-foreground" };
var _hoisted_21 = { class: "flex flex-row items-center gap-1" };
var _hoisted_22 = { class: "font-inter text-sm/normal font-bold text-base-foreground tabular-nums" };
var _hoisted_23 = { class: "flex flex-row items-center justify-between" };
var _hoisted_24 = { class: "text-sm font-normal text-base-foreground" };
var _hoisted_25 = { class: "font-inter text-sm/normal font-bold text-base-foreground tabular-nums" };
var _hoisted_26 = { class: "flex flex-row items-center justify-between" };
var _hoisted_27 = { class: "text-sm font-normal text-base-foreground" };
var _hoisted_28 = { class: "flex flex-row items-center justify-between" };
var _hoisted_29 = { class: "text-sm font-normal text-base-foreground" };
var _hoisted_30 = { class: "flex flex-row items-center justify-between" };
var _hoisted_31 = { class: "text-sm font-normal text-base-foreground" };
var _hoisted_32 = {
	key: 0,
	class: "pi pi-check text-xs text-success-background"
};
var _hoisted_33 = {
	key: 1,
	class: "pi pi-times text-xs text-base-foreground"
};
var _hoisted_34 = { class: "flex flex-col gap-2" };
var _hoisted_35 = { class: "flex flex-row items-start justify-between" };
var _hoisted_36 = { class: "flex flex-col gap-2" };
var _hoisted_37 = { class: "text-sm/relaxed font-normal text-base-foreground" };
var _hoisted_38 = { class: "group flex flex-row items-center gap-2 pt-2" };
var _hoisted_39 = { class: "font-inter text-sm/normal font-bold text-base-foreground tabular-nums" };
var _hoisted_40 = { class: "flex flex-col p-6" };
var _hoisted_41 = { class: "flex flex-col gap-2" };
var _hoisted_42 = { class: "text-sm/normal text-base-foreground" };
var _hoisted_43 = {
	href: "https://cloud.comfy.org/?template=video_wan2_2_14B_i2v",
	target: "_blank",
	rel: "noopener noreferrer",
	class: "flex gap-1 text-sm text-azure-600 no-underline hover:text-azure-400"
};
var _hoisted_44 = { class: "underline" };
//#endregion
//#region src/platform/cloud/subscription/components/PricingTable.vue
var PricingTable_default = /* @__PURE__ */ defineComponent({
	__name: "PricingTable",
	props: { reason: {} },
	emits: ["chooseTeamWorkspace"],
	setup(__props, { emit: __emit }) {
		const emit = __emit;
		const { t, n } = useI18n();
		const billingCycleOptions = [{
			label: t("subscription.yearly"),
			value: "yearly"
		}, {
			label: t("subscription.monthly"),
			value: "monthly"
		}];
		const tiers = [
			{
				id: "STANDARD",
				key: "standard",
				name: t("subscription.tiers.standard.name"),
				pricing: TIER_PRICING.standard,
				maxDuration: t("subscription.maxDuration.standard"),
				customLoRAs: false,
				isPopular: false
			},
			{
				id: "CREATOR",
				key: "creator",
				name: t("subscription.tiers.creator.name"),
				pricing: TIER_PRICING.creator,
				maxDuration: t("subscription.maxDuration.creator"),
				customLoRAs: true,
				isPopular: true
			},
			{
				id: "PRO",
				key: "pro",
				name: t("subscription.tiers.pro.name"),
				pricing: TIER_PRICING.pro,
				maxDuration: t("subscription.maxDuration.pro"),
				customLoRAs: true,
				isPopular: false
			}
		];
		const { canAccessSubscriptionFeatures, isFreeTier, tier: subscriptionTier, subscription } = useBillingContext();
		const isYearlySubscription = computed(() => subscription.value?.duration === "ANNUAL");
		useTelemetry();
		const { userId } = storeToRefs(useAuthStore());
		useTeamWorkspaceStore();
		const { accessBillingPortal, accessBillingPortalDirect, reportError } = useAuthActions();
		const { wrapWithErrorHandlingAsync } = useErrorHandling();
		const isLoading = ref(false);
		const loadingTier = ref(null);
		const popover = ref();
		const currentBillingCycle = ref("yearly");
		const hasPaidSubscription = computed(() => canAccessSubscriptionFeatures.value && !isFreeTier.value);
		const currentTierKey = computed(() => subscriptionTier.value ? toTierKey(subscriptionTier.value) : null);
		computed(() => {
			if (!currentTierKey.value) return null;
			return {
				tierKey: currentTierKey.value,
				billingCycle: isYearlySubscription.value ? "yearly" : "monthly"
			};
		});
		const isCurrentPlan = (tierKey) => {
			if (!currentTierKey.value) return false;
			const selectedIsYearly = currentBillingCycle.value === "yearly";
			return currentTierKey.value === tierKey && isYearlySubscription.value === selectedIsYearly;
		};
		const togglePopover = (event) => {
			popover.value.toggle(event);
		};
		const getButtonLabel = (tier) => {
			if (isCurrentPlan(tier.key)) return t("subscription.currentPlan");
			const planName = currentBillingCycle.value === "yearly" ? t("subscription.tierNameYearly", { name: tier.name }) : tier.name;
			return hasPaidSubscription.value ? t("subscription.changeTo", { plan: planName }) : t("subscription.subscribeTo", { plan: planName });
		};
		const getButtonSeverity = (tier) => {
			if (isCurrentPlan(tier.key)) return "secondary";
			if (tier.key === "creator") return "primary";
			return "secondary";
		};
		const getButtonTextClass = (tier) => tier.key === "creator" ? "font-inter text-sm font-bold leading-normal text-base-background" : "font-inter text-sm font-bold leading-normal text-base-foreground";
		const getPrice = (tier) => tier.pricing[currentBillingCycle.value];
		const getAnnualTotal = (tier) => tier.pricing.yearly * 12;
		const isYearly = computed(() => currentBillingCycle.value === "yearly");
		const getCreditsDisplay = (tier) => amountForBillingCycle(tier.pricing.credits, isYearly.value);
		const getVideoEstimateDisplay = (tier) => amountForBillingCycle(tier.pricing.videoEstimate, isYearly.value);
		const handleSubscribe = wrapWithErrorHandlingAsync(async (tierKey) => {}, reportError);
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", _hoisted_1$2, [
				createBaseVNode("div", _hoisted_2$2, [createVNode(unref(ToggleGroup_default), {
					modelValue: currentBillingCycle.value,
					"onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => currentBillingCycle.value = $event),
					type: "single",
					"allow-empty": false,
					class: "rounded-lg bg-secondary-background p-1.5"
				}, {
					default: withCtx(() => [(openBlock(), createElementBlock(Fragment, null, renderList(billingCycleOptions, (option) => {
						return createVNode(unref(ToggleGroupItem_default), {
							key: option.value,
							value: option.value,
							class: "h-8 w-36 data-[state=on]:bg-base-foreground data-[state=on]:text-base-background"
						}, {
							default: withCtx(() => [createBaseVNode("div", _hoisted_3$2, [createBaseVNode("span", null, toDisplayString(option.label), 1), option.value === "yearly" ? (openBlock(), createElementBlock("div", _hoisted_4$2, toDisplayString(unref(t)("subscription.saveYearly")), 1)) : createCommentVNode("", true)])]),
							_: 2
						}, 1032, ["value"]);
					}), 64))]),
					_: 1
				}, 8, ["modelValue"])]),
				createBaseVNode("div", _hoisted_5$2, [(openBlock(), createElementBlock(Fragment, null, renderList(tiers, (tier) => {
					return createBaseVNode("div", {
						key: tier.id,
						class: normalizeClass(unref(cn)("flex flex-1 flex-col rounded-2xl border border-border-default bg-base-background shadow-[0_0_12px_rgba(0,0,0,0.1)]", tier.isPopular ? "border-muted-foreground" : ""))
					}, [createBaseVNode("div", _hoisted_6$2, [
						createBaseVNode("div", _hoisted_7$2, [createBaseVNode("span", _hoisted_8$1, toDisplayString(tier.name), 1), tier.isPopular ? (openBlock(), createElementBlock("div", _hoisted_9$1, toDisplayString(unref(t)("subscription.mostPopular")), 1)) : createCommentVNode("", true)]),
						createBaseVNode("div", _hoisted_10$1, [createBaseVNode("div", _hoisted_11$1, [createBaseVNode("div", _hoisted_12$1, [createBaseVNode("span", _hoisted_13$1, [createTextVNode(" $" + toDisplayString(getPrice(tier)) + " ", 1), withDirectives(createBaseVNode("span", { class: "text-2xl text-muted-foreground line-through" }, " $" + toDisplayString(tier.pricing.monthly), 513), [[vShow, currentBillingCycle.value === "yearly"]])]), createBaseVNode("span", _hoisted_14$1, toDisplayString(unref(t)("subscription.usdPerMonth")), 1)]), createBaseVNode("div", _hoisted_15$1, [createBaseVNode("span", _hoisted_16$1, toDisplayString(currentBillingCycle.value === "yearly" ? unref(t)("subscription.billedYearly", { total: `$${getAnnualTotal(tier)}` }) : unref(t)("subscription.billedMonthly")), 1)])])]),
						createBaseVNode("p", {
							role: "note",
							"aria-label": unref(t)("subscription.soloUseOnly"),
							class: "m-0 flex h-10 items-center rounded-lg bg-muted-foreground/30 px-3 text-sm text-muted-foreground"
						}, [
							createTextVNode(toDisplayString(unref(t)("subscription.soloUseOnly")) + " ", 1),
							_cache[2] || (_cache[2] = createBaseVNode("span", { class: "mx-1 text-muted-foreground" }, "–", -1)),
							createBaseVNode("button", {
								class: "cursor-pointer border-none bg-transparent p-0 text-sm font-medium text-muted-foreground underline hover:text-base-foreground focus-visible:ring-1 focus-visible:outline-none",
								onClick: _cache[1] || (_cache[1] = ($event) => emit("chooseTeamWorkspace"))
							}, toDisplayString(unref(t)("subscription.needTeamWorkspace")), 1)
						], 8, _hoisted_17$1),
						createBaseVNode("div", _hoisted_18, [
							createBaseVNode("div", _hoisted_19, [createBaseVNode("span", _hoisted_20, toDisplayString(currentBillingCycle.value === "yearly" ? unref(t)("subscription.yearlyCreditsLabel") : unref(t)("subscription.monthlyCreditsLabel")), 1), createBaseVNode("div", _hoisted_21, [_cache[3] || (_cache[3] = createBaseVNode("i", {
								class: "icon-[lucide--coins] size-4 shrink-0 bg-credit",
								"aria-hidden": "true"
							}, null, -1)), createBaseVNode("span", _hoisted_22, toDisplayString(unref(n)(getCreditsDisplay(tier))), 1)])]),
							createBaseVNode("div", _hoisted_23, [createBaseVNode("span", _hoisted_24, toDisplayString(unref(t)("subscription.maxDurationLabel")), 1), createBaseVNode("span", _hoisted_25, toDisplayString(tier.maxDuration), 1)]),
							createBaseVNode("div", _hoisted_26, [createBaseVNode("span", _hoisted_27, toDisplayString(unref(t)("subscription.gpuLabel")), 1), _cache[4] || (_cache[4] = createBaseVNode("i", { class: "pi pi-check text-xs text-success-background" }, null, -1))]),
							createBaseVNode("div", _hoisted_28, [createBaseVNode("span", _hoisted_29, toDisplayString(unref(t)("subscription.addCreditsLabel")), 1), _cache[5] || (_cache[5] = createBaseVNode("i", { class: "pi pi-check text-xs text-success-background" }, null, -1))]),
							createBaseVNode("div", _hoisted_30, [createBaseVNode("span", _hoisted_31, toDisplayString(unref(t)("subscription.customLoRAsLabel")), 1), tier.customLoRAs ? (openBlock(), createElementBlock("i", _hoisted_32)) : (openBlock(), createElementBlock("i", _hoisted_33))]),
							createBaseVNode("div", _hoisted_34, [createBaseVNode("div", _hoisted_35, [createBaseVNode("div", _hoisted_36, [createBaseVNode("span", _hoisted_37, toDisplayString(unref(t)("subscription.videoEstimateLabel")), 1), createBaseVNode("div", _hoisted_38, [_cache[6] || (_cache[6] = createBaseVNode("i", { class: "pi pi-question-circle text-xs text-muted-foreground group-hover:text-base-foreground" }, null, -1)), createBaseVNode("span", {
								class: "cursor-pointer text-sm font-normal text-muted-foreground group-hover:text-base-foreground",
								onClick: togglePopover
							}, toDisplayString(unref(t)("subscription.videoEstimateHelp")), 1)])]), createBaseVNode("span", _hoisted_39, " ~" + toDisplayString(unref(n)(getVideoEstimateDisplay(tier))), 1)])])
						])
					]), createBaseVNode("div", _hoisted_40, [createVNode(Button_default, {
						variant: getButtonSeverity(tier),
						disabled: isLoading.value || isCurrentPlan(tier.key),
						loading: loadingTier.value === tier.key,
						class: normalizeClass(unref(cn)("h-10 w-full", getButtonTextClass(tier), tier.key === "creator" ? "border-transparent bg-base-foreground hover:bg-inverted-background-hover" : "border-transparent bg-secondary-background hover:bg-secondary-background-hover focus:bg-secondary-background-selected")),
						onClick: () => unref(handleSubscribe)(tier.key)
					}, {
						default: withCtx(() => [createTextVNode(toDisplayString(getButtonLabel(tier)), 1)]),
						_: 2
					}, 1032, [
						"variant",
						"disabled",
						"loading",
						"class",
						"onClick"
					])])], 2);
				}), 64))]),
				createVNode(ImperativePopover_default, {
					ref_key: "popover",
					ref: popover,
					align: "start",
					"content-class": "max-w-sm p-4"
				}, {
					default: withCtx(() => [createBaseVNode("div", _hoisted_41, [createBaseVNode("p", _hoisted_42, toDisplayString(unref(t)("subscription.videoEstimateExplanation")), 1), createBaseVNode("a", _hoisted_43, [createBaseVNode("span", _hoisted_44, toDisplayString(unref(t)("subscription.videoEstimateTryTemplate")), 1), _cache[7] || (_cache[7] = createBaseVNode("span", { class: "no-underline" }, "→", -1))])])]),
					_: 1
				}, 512)
			]);
		};
	}
});
//#endregion
//#region src/platform/cloud/subscription/components/SubscriptionBenefits.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1$1 = { class: "flex flex-col items-start gap-0 self-stretch" };
var _hoisted_2$1 = { class: "flex items-center gap-2 py-2" };
var _hoisted_3$1 = { class: "text-sm text-text-primary" };
var _hoisted_4$1 = { class: "flex items-center gap-2 py-2" };
var _hoisted_5$1 = { class: "text-sm text-text-primary" };
var _hoisted_6$1 = { class: "flex items-center gap-2 py-2" };
var _hoisted_7$1 = { class: "text-sm text-text-primary" };
//#endregion
//#region src/platform/cloud/subscription/components/SubscriptionBenefits.vue
var SubscriptionBenefits_default = /* @__PURE__ */ defineComponent({
	__name: "SubscriptionBenefits",
	props: { isFreeTier: {
		type: Boolean,
		default: false
	} },
	setup(__props) {
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", _hoisted_1$1, [
				createBaseVNode("div", _hoisted_2$1, [_cache[0] || (_cache[0] = createBaseVNode("i", { class: "pi pi-check text-xs text-text-primary" }, null, -1)), createBaseVNode("span", _hoisted_3$1, toDisplayString(__props.isFreeTier ? _ctx.$t("subscription.benefits.benefit1FreeTier") : _ctx.$t("subscription.benefits.benefit1")), 1)]),
				createBaseVNode("div", _hoisted_4$1, [_cache[1] || (_cache[1] = createBaseVNode("i", { class: "pi pi-check text-xs text-text-primary" }, null, -1)), createBaseVNode("span", _hoisted_5$1, toDisplayString(_ctx.$t("subscription.benefits.benefit2")), 1)]),
				createBaseVNode("div", _hoisted_6$1, [_cache[2] || (_cache[2] = createBaseVNode("i", { class: "pi pi-check text-xs text-text-primary" }, null, -1)), createBaseVNode("span", _hoisted_7$1, toDisplayString(_ctx.$t("subscription.benefits.benefit3")), 1)])
			]);
		};
	}
});
//#endregion
//#region src/platform/cloud/subscription/components/SubscriptionRequiredDialogContent.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1 = {
	key: 0,
	class: "relative flex h-full flex-col gap-6 overflow-y-auto p-4 pt-8 md:px-16 md:py-8"
};
var _hoisted_2 = { class: "flex flex-col items-center gap-3" };
var _hoisted_3 = { class: "text-muted-foreground" };
var _hoisted_4 = { class: "flex flex-col items-center gap-2" };
var _hoisted_5 = { class: "m-0 text-sm text-text-secondary" };
var _hoisted_6 = { class: "flex items-center gap-1.5" };
var _hoisted_7 = { class: "text-sm text-text-secondary" };
var _hoisted_8 = {
	key: 1,
	class: "legacy-dialog relative grid h-full grid-cols-5"
};
var _hoisted_9 = { class: "col-span-3 flex flex-col justify-between p-8" };
var _hoisted_10 = { class: "flex flex-col gap-6" };
var _hoisted_11 = { class: "inline-flex items-center gap-2" };
var _hoisted_12 = { class: "text-sm text-text-primary" };
var _hoisted_13 = {
	key: 0,
	class: "m-0 text-sm text-text-secondary"
};
var _hoisted_14 = { class: "flex items-baseline gap-2" };
var _hoisted_15 = { class: "text-4xl font-bold" };
var _hoisted_16 = { class: "text-xl" };
var _hoisted_17 = { class: "flex flex-col pt-8" };
//#endregion
//#region src/platform/cloud/subscription/components/SubscriptionRequiredDialogContent.vue
var SubscriptionRequiredDialogContent_default = /*#__PURE__*/ _plugin_vue_export_helper_default(/* @__PURE__ */ defineComponent({
	__name: "SubscriptionRequiredDialogContent",
	props: {
		onClose: { type: Function },
		reason: {},
		paymentIntentSource: {},
		onChooseTeam: { type: Function }
	},
	emits: ["close"],
	setup(__props, { emit: __emit }) {
		const emit = __emit;
		const { canAccessSubscriptionFeatures } = useBillingContext();
		const isSubscriptionEnabled = () => Boolean(false);
		const formattedMonthlyPrice = new Intl.NumberFormat(navigator.language || "en-US", {
			style: "currency",
			currency: "USD",
			minimumFractionDigits: 0,
			maximumFractionDigits: 0
		}).format(20);
		const commandStore = useCommandStore();
		const telemetry = useTelemetry();
		const showCustomPricingTable = computed(() => isSubscriptionEnabled());
		watch(() => canAccessSubscriptionFeatures.value, (isActive) => {
			if (isActive && showCustomPricingTable.value) emit("close", true);
		});
		const handleSubscribed = () => {
			emit("close", true);
		};
		const handleChooseTeam = () => {
			if (__props.onChooseTeam) __props.onChooseTeam();
			else __props.onClose();
		};
		const handleClose = () => {
			__props.onClose();
		};
		const handleContactUs = async () => {
			telemetry?.trackHelpResourceClicked({
				resource_type: "help_feedback",
				is_external: true,
				source: "subscription"
			});
			await commandStore.execute("Comfy.ContactSupport");
		};
		const handleViewEnterprise = () => {
			telemetry?.trackHelpResourceClicked({
				resource_type: "docs",
				is_external: true,
				source: "subscription"
			});
			window.open("https://comfy.org/cloud/enterprise/", "_blank");
		};
		return (_ctx, _cache) => {
			const _component_i18n_t = resolveComponent("i18n-t");
			return showCustomPricingTable.value ? (openBlock(), createElementBlock("div", _hoisted_1, [
				createVNode(Button_default, {
					size: "icon",
					variant: "muted-textonly",
					class: "absolute top-2.5 right-2.5 shrink-0 rounded-full text-text-secondary hover:bg-white/10",
					"aria-label": _ctx.$t("g.close"),
					onClick: handleClose
				}, {
					default: withCtx(() => [..._cache[0] || (_cache[0] = [createBaseVNode("i", {
						class: "pi pi-times text-xl",
						"aria-hidden": "true"
					}, null, -1)])]),
					_: 1
				}, 8, ["aria-label"]),
				createBaseVNode("div", _hoisted_2, [_cache[1] || (_cache[1] = createBaseVNode("div", {
					class: "flex size-10 items-center justify-center rounded-xl bg-muted-foreground/30 text-lg font-semibold text-white",
					"aria-hidden": "true"
				}, " P ", -1)), createVNode(_component_i18n_t, {
					keypath: "subscription.plansForWorkspace",
					tag: "h2",
					class: "m-0 font-inter text-2xl font-semibold text-base-foreground"
				}, {
					workspace: withCtx(() => [createBaseVNode("span", _hoisted_3, toDisplayString(_ctx.$t("subscription.personalWorkspace")), 1)]),
					_: 1
				})]),
				createVNode(PricingTable_default, {
					reason: __props.paymentIntentSource,
					class: "flex-1",
					onChooseTeamWorkspace: handleChooseTeam
				}, null, 8, ["reason"]),
				createBaseVNode("div", _hoisted_4, [createBaseVNode("p", _hoisted_5, toDisplayString(_ctx.$t("subscription.haveQuestions")), 1), createBaseVNode("div", _hoisted_6, [
					createVNode(Button_default, {
						variant: "muted-textonly",
						class: "h-6 p-1 text-sm text-text-secondary hover:text-base-foreground",
						onClick: handleContactUs
					}, {
						default: withCtx(() => [createTextVNode(toDisplayString(_ctx.$t("subscription.contactUs")) + " ", 1), _cache[2] || (_cache[2] = createBaseVNode("i", { class: "pi pi-comments" }, null, -1))]),
						_: 1
					}),
					createBaseVNode("span", _hoisted_7, toDisplayString(_ctx.$t("g.or")), 1),
					createVNode(Button_default, {
						variant: "muted-textonly",
						class: "h-6 p-1 text-sm text-text-secondary hover:text-base-foreground",
						onClick: handleViewEnterprise
					}, {
						default: withCtx(() => [createTextVNode(toDisplayString(_ctx.$t("subscription.viewEnterprise")) + " ", 1), _cache[3] || (_cache[3] = createBaseVNode("i", { class: "pi pi-external-link" }, null, -1))]),
						_: 1
					})
				])])
			])) : (openBlock(), createElementBlock("div", _hoisted_8, [
				createVNode(Button_default, {
					size: "icon",
					variant: "muted-textonly",
					class: "absolute top-2.5 right-2.5 z-10 size-8 rounded-full p-0 text-white hover:bg-white/20",
					"aria-label": _ctx.$t("g.close"),
					onClick: handleClose
				}, {
					default: withCtx(() => [..._cache[4] || (_cache[4] = [createBaseVNode("i", {
						class: "pi pi-times",
						"aria-hidden": "true"
					}, null, -1)])]),
					_: 1
				}, 8, ["aria-label"]),
				_cache[5] || (_cache[5] = createBaseVNode("div", { class: "relative col-span-2 flex items-center justify-center overflow-hidden rounded-sm" }, [createBaseVNode("video", {
					autoplay: "",
					loop: "",
					muted: "",
					playsinline: "",
					class: "h-full min-w-[125%] object-cover p-0",
					style: { "margin-left": "-20%" }
				}, [createBaseVNode("source", {
					src: "" + new URL("images/cloud-subscription.webm", import.meta.url).href,
					type: "video/webm"
				})])], -1)),
				createBaseVNode("div", _hoisted_9, [createBaseVNode("div", null, [createBaseVNode("div", _hoisted_10, [
					createBaseVNode("div", _hoisted_11, [createBaseVNode("div", _hoisted_12, toDisplayString(__props.reason === "out_of_credits" ? _ctx.$t("credits.topUp.insufficientTitle") : _ctx.$t("subscription.required.title")), 1), createVNode(CloudBadge_default, {
						"reverse-order": "",
						"no-padding": "",
						"background-color": "var(--p-dialog-background)",
						"use-subscription": ""
					})]),
					__props.reason === "out_of_credits" ? (openBlock(), createElementBlock("p", _hoisted_13, toDisplayString(_ctx.$t("credits.topUp.insufficientMessage")), 1)) : createCommentVNode("", true),
					createBaseVNode("div", _hoisted_14, [createBaseVNode("span", _hoisted_15, toDisplayString(unref(formattedMonthlyPrice)), 1), createBaseVNode("span", _hoisted_16, toDisplayString(_ctx.$t("subscription.perMonth")), 1)])
				]), createVNode(SubscriptionBenefits_default, { class: "mt-6 text-muted" })]), createBaseVNode("div", _hoisted_17, [createVNode(SubscribeButton_default, {
					class: "rounded-lg px-4 py-2",
					pt: {
						root: { style: "background: var(--color-accent-blue, #0B8CE9);" },
						label: { class: "font-inter font-[700] text-sm" }
					},
					onSubscribed: handleSubscribed
				})])])
			]));
		};
	}
}), [["__scopeId", "data-v-c9674cdd"]]);
//#endregion
export { SubscriptionRequiredDialogContent_default as default };
