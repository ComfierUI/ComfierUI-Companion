import "./rolldown-runtime-xtsTai4I.js";
import { Dt as withDirectives, Et as withCtx, F as createBaseVNode, G as defineComponent, H as createTextVNode, I as createBlock, Jt as normalizeClass, Kt as unref, L as createCommentVNode, Lt as ref, O as Fragment, P as computed, R as createElementBlock, U as createVNode, Zt as toDisplayString, dt as renderList, lt as openBlock, ot as onMounted, pt as resolveComponent, w as vShow } from "./vendor-vue-core-C1utdb0s.js";
import { Ar as toTierKey, On as useBillingContext, Tr as hasActivePaidPlan, Zr as useCommandStore, br as TIER_PRICING, xr as amountForBillingCycle } from "./layoutStore-CZsuzg91.js";
import { r as useI18n } from "./vendor-i18n-BZvE7WBQ.js";
import { t as cn } from "./src-DI1bBfrb.js";
import { t as Button_default } from "./Button-j0oCzR82.js";
import { t as _plugin_vue_export_helper_default } from "./_plugin-vue_export-helper-DEKQMRQ4.js";
import { n as ToggleGroup_default, t as ToggleGroupItem_default } from "./ToggleGroupItem-Da4A26JJ.js";
import "./toggle-group-B0brfUuj.js";
import { t as ImperativePopover_default } from "./ImperativePopover-CdNFQ3n2.js";
import { i as useSubscriptionCheckout, n as SubscriptionSuccessWorkspace_default, r as SubscriptionAddPaymentPreviewWorkspace_default, t as SubscriptionTransitionPreviewWorkspace_default } from "./SubscriptionTransitionPreviewWorkspace-CaV62Ooq.js";
//#region src/platform/workspace/components/PricingTableWorkspace.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1$1 = { class: "flex flex-col gap-6" };
var _hoisted_2$1 = { class: "flex justify-center" };
var _hoisted_3$1 = { class: "flex items-center gap-2" };
var _hoisted_4$1 = {
	key: 0,
	class: "flex items-center rounded-full bg-primary-background px-1 py-0.5 text-2xs font-bold text-white"
};
var _hoisted_5$1 = { class: "flex flex-col items-stretch gap-4 xl:flex-row" };
var _hoisted_6 = { class: "flex flex-col gap-4 p-6 pb-0" };
var _hoisted_7 = { class: "flex flex-row items-center justify-between gap-2" };
var _hoisted_8 = { class: "font-inter text-base/normal font-bold text-base-foreground" };
var _hoisted_9 = {
	key: 0,
	class: "flex h-5 items-center rounded-full bg-base-foreground px-1.5 text-2xs font-bold tracking-tight text-base-background uppercase"
};
var _hoisted_10 = { class: "flex flex-col" };
var _hoisted_11 = { class: "flex flex-col gap-2" };
var _hoisted_12 = { class: "flex flex-row items-baseline gap-2" };
var _hoisted_13 = { class: "font-inter text-[28px] leading-normal font-semibold text-base-foreground" };
var _hoisted_14 = { class: "font-inter text-sm/normal text-base-foreground" };
var _hoisted_15 = { class: "flex items-center gap-2" };
var _hoisted_16 = { class: "text-sm text-muted-foreground" };
var _hoisted_17 = { class: "flex items-center gap-2" };
var _hoisted_18 = { class: "text-sm text-emerald-400" };
var _hoisted_19 = { class: "text-sm font-bold text-base-foreground" };
var _hoisted_20 = { class: "flex flex-1 flex-col gap-3 pb-0" };
var _hoisted_21 = { class: "flex flex-row items-center justify-between" };
var _hoisted_22 = { class: "text-sm font-normal text-base-foreground" };
var _hoisted_23 = { class: "flex flex-row items-center gap-1" };
var _hoisted_24 = { class: "font-inter text-sm/normal font-bold text-base-foreground" };
var _hoisted_25 = { class: "flex flex-row items-center justify-between" };
var _hoisted_26 = { class: "text-sm font-normal text-base-foreground" };
var _hoisted_27 = { class: "font-inter text-sm/normal font-bold text-base-foreground" };
var _hoisted_28 = { class: "flex flex-row items-center justify-between" };
var _hoisted_29 = { class: "text-sm font-normal text-base-foreground" };
var _hoisted_30 = { class: "font-inter text-sm/normal font-bold text-base-foreground" };
var _hoisted_31 = { class: "flex flex-row items-center justify-between" };
var _hoisted_32 = { class: "text-sm font-normal text-base-foreground" };
var _hoisted_33 = { class: "flex flex-row items-center justify-between" };
var _hoisted_34 = { class: "text-sm font-normal text-base-foreground" };
var _hoisted_35 = { class: "flex flex-row items-center justify-between" };
var _hoisted_36 = { class: "text-sm font-normal text-base-foreground" };
var _hoisted_37 = {
	key: 0,
	class: "pi pi-check text-xs text-success-background"
};
var _hoisted_38 = {
	key: 1,
	class: "pi pi-times text-xs text-base-foreground"
};
var _hoisted_39 = { class: "flex flex-col gap-2" };
var _hoisted_40 = { class: "flex flex-row items-start justify-between" };
var _hoisted_41 = { class: "flex flex-col gap-2" };
var _hoisted_42 = { class: "text-sm/relaxed font-normal text-base-foreground" };
var _hoisted_43 = { class: "group flex flex-row items-center gap-2 pt-2" };
var _hoisted_44 = { class: "font-inter text-sm/normal font-bold text-base-foreground" };
var _hoisted_45 = { class: "flex flex-col p-6" };
var _hoisted_46 = { class: "flex flex-col gap-2" };
var _hoisted_47 = { class: "text-sm/normal text-base-foreground" };
var _hoisted_48 = {
	href: "https://cloud.comfy.org/?template=video_wan2_2_14B_i2v",
	target: "_blank",
	rel: "noopener noreferrer",
	class: "flex gap-1 text-sm text-azure-600 no-underline hover:text-azure-400"
};
var _hoisted_49 = { class: "underline" };
var _hoisted_50 = { class: "flex flex-col items-center gap-2" };
var _hoisted_51 = { class: "m-0 text-sm text-text-secondary" };
var _hoisted_52 = { class: "flex items-center gap-1.5" };
var _hoisted_53 = { class: "text-sm text-text-secondary" };
//#endregion
//#region src/platform/workspace/components/PricingTableWorkspace.vue
var PricingTableWorkspace_default = /* @__PURE__ */ defineComponent({
	__name: "PricingTableWorkspace",
	props: {
		isLoading: { type: Boolean },
		loadingTier: { default: null }
	},
	emits: ["subscribe", "resubscribe"],
	setup(__props, { emit: __emit }) {
		const emit = __emit;
		const { t, n } = useI18n();
		const commandStore = useCommandStore();
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
				maxMembers: 1,
				isPopular: false
			},
			{
				id: "CREATOR",
				key: "creator",
				name: t("subscription.tiers.creator.name"),
				pricing: TIER_PRICING.creator,
				maxDuration: t("subscription.maxDuration.creator"),
				customLoRAs: true,
				maxMembers: 5,
				isPopular: true
			},
			{
				id: "PRO",
				key: "pro",
				name: t("subscription.tiers.pro.name"),
				pricing: TIER_PRICING.pro,
				maxDuration: t("subscription.maxDuration.pro"),
				customLoRAs: true,
				maxMembers: 20,
				isPopular: false
			}
		];
		const { plans: apiPlans, currentPlanSlug, fetchPlans, subscription, getMaxSeats } = useBillingContext();
		const isCancelled = computed(() => subscription.value?.isCancelled ?? false);
		const popover = ref();
		const currentBillingCycle = ref("yearly");
		const isYearly = computed(() => currentBillingCycle.value === "yearly");
		const creditsPerMemberLabelKey = computed(() => isYearly.value ? "subscription.yearlyCreditsPerMemberLabel" : "subscription.monthlyCreditsPerMemberLabel");
		onMounted(() => {
			fetchPlans();
		});
		function getApiPlanForTier(tierKey, duration) {
			const apiDuration = duration === "yearly" ? "ANNUAL" : "MONTHLY";
			const apiTier = tierKey.toUpperCase();
			return apiPlans.value.find((p) => p.tier === apiTier && p.duration === apiDuration);
		}
		function getPriceFromApi(tier) {
			const plan = getApiPlanForTier(tier.key, currentBillingCycle.value);
			if (!plan) return null;
			const price = plan.price_cents / 100;
			return currentBillingCycle.value === "yearly" ? price / 12 : price;
		}
		const currentTierKey = computed(() => subscription.value?.tier ? toTierKey(subscription.value.tier) : null);
		const isYearlySubscription = computed(() => subscription.value?.duration === "ANNUAL");
		const isCurrentPlan = (tierKey) => {
			if (currentPlanSlug.value) return getApiPlanForTier(tierKey, currentBillingCycle.value)?.slug === currentPlanSlug.value;
			if (!currentTierKey.value) return false;
			const selectedIsYearly = currentBillingCycle.value === "yearly";
			return currentTierKey.value === tierKey && isYearlySubscription.value === selectedIsYearly;
		};
		const togglePopover = (event) => {
			popover.value.toggle(event);
		};
		const getButtonLabel = (tier) => {
			const planName = currentBillingCycle.value === "yearly" ? t("subscription.tierNameYearly", { name: tier.name }) : tier.name;
			if (isCurrentPlan(tier.key)) return isCancelled.value ? t("subscription.resubscribeTo", { plan: planName }) : t("subscription.currentPlan");
			return hasActivePaidPlan(subscription.value?.tier) ? t("subscription.changeTo", { plan: planName }) : t("subscription.subscribeTo", { plan: planName });
		};
		const getButtonSeverity = (tier) => {
			if (isCurrentPlan(tier.key)) return isCancelled.value ? "primary" : "secondary";
			if (tier.key === "creator") return "primary";
			return "secondary";
		};
		const isButtonDisabled = (tier) => {
			if (__props.isLoading) return true;
			if (isCurrentPlan(tier.key)) return !isCancelled.value;
			return false;
		};
		const getButtonTextClass = (tier) => tier.key === "creator" ? "font-inter text-sm font-bold leading-normal text-base-background" : "font-inter text-sm font-bold leading-normal text-base-foreground";
		const getPrice = (tier) => getPriceFromApi(tier) ?? tier.pricing[currentBillingCycle.value];
		const getMonthlyPrice = (tier) => {
			const plan = getApiPlanForTier(tier.key, "monthly");
			return plan ? plan.price_cents / 100 : tier.pricing.monthly;
		};
		const getAnnualTotal = (tier) => {
			const plan = getApiPlanForTier(tier.key, "yearly");
			return plan ? plan.price_cents / 100 : tier.pricing.yearly * 12;
		};
		const maxMembersByTier = computed(() => Object.fromEntries(tiers.map((t) => [t.key, getMaxSeats(t.key)])));
		const getCreditsPerMember = (tier) => getApiPlanForTier(tier.key, currentBillingCycle.value)?.credits ?? amountForBillingCycle(tier.pricing.credits, isYearly.value);
		const getVideoEstimateDisplay = (tier) => Math.round(getCreditsPerMember(tier) * (tier.pricing.videoEstimate / tier.pricing.credits));
		function handleSubscribe(tierKey) {
			if (__props.isLoading) return;
			if (isCurrentPlan(tierKey)) {
				if (isCancelled.value) emit("resubscribe");
				return;
			}
			emit("subscribe", {
				tierKey,
				billingCycle: currentBillingCycle.value
			});
		}
		async function handleContactUs() {
			await commandStore.execute("Comfy.ContactSupport");
		}
		function handleViewEnterprise() {
			window.open("https://comfy.org/cloud/enterprise/", "_blank");
		}
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", _hoisted_1$1, [
				createBaseVNode("div", _hoisted_2$1, [createVNode(unref(ToggleGroup_default), {
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
							default: withCtx(() => [createBaseVNode("div", _hoisted_3$1, [createBaseVNode("span", null, toDisplayString(option.label), 1), option.value === "yearly" ? (openBlock(), createElementBlock("div", _hoisted_4$1, " -20% ")) : createCommentVNode("", true)])]),
							_: 2
						}, 1032, ["value"]);
					}), 64))]),
					_: 1
				}, 8, ["modelValue"])]),
				createBaseVNode("div", _hoisted_5$1, [(openBlock(), createElementBlock(Fragment, null, renderList(tiers, (tier) => {
					return createBaseVNode("div", {
						key: tier.id,
						class: normalizeClass(unref(cn)("flex flex-1 flex-col rounded-2xl border border-border-default bg-base-background shadow-[0_0_12px_rgba(0,0,0,0.1)]", tier.isPopular ? "border-emerald-500" : ""))
					}, [createBaseVNode("div", _hoisted_6, [
						createBaseVNode("div", _hoisted_7, [createBaseVNode("span", _hoisted_8, toDisplayString(tier.name), 1), tier.isPopular ? (openBlock(), createElementBlock("div", _hoisted_9, toDisplayString(unref(t)("subscription.mostPopular")), 1)) : createCommentVNode("", true)]),
						createBaseVNode("div", _hoisted_10, [createBaseVNode("div", _hoisted_11, [createBaseVNode("div", _hoisted_12, [createBaseVNode("span", _hoisted_13, [withDirectives(createBaseVNode("span", { class: "text-2xl text-muted-foreground line-through" }, " $" + toDisplayString(getMonthlyPrice(tier)), 513), [[vShow, currentBillingCycle.value === "yearly"]]), createTextVNode(" $" + toDisplayString(getPrice(tier)), 1)]), createBaseVNode("span", _hoisted_14, toDisplayString(unref(t)("subscription.usdPerMonthPerMember")), 1)]), createBaseVNode("div", _hoisted_15, [createBaseVNode("span", _hoisted_16, toDisplayString(currentBillingCycle.value === "yearly" ? unref(t)("subscription.billedYearly", { total: `$${getAnnualTotal(tier)}` }) : unref(t)("subscription.billedMonthly")), 1)])])]),
						createBaseVNode("div", { class: normalizeClass(unref(cn)("flex h-10 items-center justify-between rounded-lg px-3", maxMembersByTier.value[tier.key] > 1 ? "bg-emerald-500/20" : "")) }, [maxMembersByTier.value[tier.key] > 1 ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [createBaseVNode("div", _hoisted_17, [_cache[1] || (_cache[1] = createBaseVNode("i", {
							class: "pi pi-users text-xs text-emerald-400",
							"aria-hidden": "true"
						}, null, -1)), createBaseVNode("span", _hoisted_18, toDisplayString(unref(t)("subscription.inviteUpTo")), 1)]), createBaseVNode("span", _hoisted_19, toDisplayString(unref(t)("subscription.memberCount", { count: maxMembersByTier.value[tier.key] })), 1)], 64)) : createCommentVNode("", true)], 2),
						createBaseVNode("div", _hoisted_20, [
							createBaseVNode("div", _hoisted_21, [createBaseVNode("span", _hoisted_22, toDisplayString(unref(t)(creditsPerMemberLabelKey.value)), 1), createBaseVNode("div", _hoisted_23, [_cache[2] || (_cache[2] = createBaseVNode("i", { class: "icon-[lucide--coins] size-4 text-credit" }, null, -1)), createBaseVNode("span", _hoisted_24, toDisplayString(unref(n)(getCreditsPerMember(tier))), 1)])]),
							createBaseVNode("div", _hoisted_25, [createBaseVNode("span", _hoisted_26, toDisplayString(unref(t)("subscription.maxMembersLabel")), 1), createBaseVNode("span", _hoisted_27, toDisplayString(maxMembersByTier.value[tier.key]), 1)]),
							createBaseVNode("div", _hoisted_28, [createBaseVNode("span", _hoisted_29, toDisplayString(unref(t)("subscription.maxDurationLabel")), 1), createBaseVNode("span", _hoisted_30, toDisplayString(tier.maxDuration), 1)]),
							createBaseVNode("div", _hoisted_31, [createBaseVNode("span", _hoisted_32, toDisplayString(unref(t)("subscription.gpuLabel")), 1), _cache[3] || (_cache[3] = createBaseVNode("i", { class: "pi pi-check text-xs text-success-background" }, null, -1))]),
							createBaseVNode("div", _hoisted_33, [createBaseVNode("span", _hoisted_34, toDisplayString(unref(t)("subscription.addCreditsLabel")), 1), _cache[4] || (_cache[4] = createBaseVNode("i", { class: "pi pi-check text-xs text-success-background" }, null, -1))]),
							createBaseVNode("div", _hoisted_35, [createBaseVNode("span", _hoisted_36, toDisplayString(unref(t)("subscription.customLoRAsLabel")), 1), tier.customLoRAs ? (openBlock(), createElementBlock("i", _hoisted_37)) : (openBlock(), createElementBlock("i", _hoisted_38))]),
							createBaseVNode("div", _hoisted_39, [createBaseVNode("div", _hoisted_40, [createBaseVNode("div", _hoisted_41, [createBaseVNode("span", _hoisted_42, toDisplayString(unref(t)("subscription.videoEstimateLabel")), 1), createBaseVNode("div", _hoisted_43, [_cache[5] || (_cache[5] = createBaseVNode("i", { class: "pi pi-question-circle text-xs text-muted-foreground group-hover:text-base-foreground" }, null, -1)), createBaseVNode("span", {
								class: "cursor-pointer text-sm font-normal text-muted-foreground group-hover:text-base-foreground",
								onClick: togglePopover
							}, toDisplayString(unref(t)("subscription.videoEstimateHelp")), 1)])]), createBaseVNode("span", _hoisted_44, " ~" + toDisplayString(unref(n)(getVideoEstimateDisplay(tier))), 1)])])
						])
					]), createBaseVNode("div", _hoisted_45, [createVNode(Button_default, {
						variant: getButtonSeverity(tier),
						disabled: isButtonDisabled(tier),
						loading: __props.loadingTier === tier.key,
						class: normalizeClass(unref(cn)("h-10 w-full", getButtonTextClass(tier), tier.key === "creator" ? "border-transparent bg-success-background hover:bg-success-background/80" : "border-transparent bg-secondary-background hover:bg-secondary-background-hover focus:bg-secondary-background-selected")),
						onClick: () => handleSubscribe(tier.key)
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
					default: withCtx(() => [createBaseVNode("div", _hoisted_46, [createBaseVNode("p", _hoisted_47, toDisplayString(unref(t)("subscription.videoEstimateExplanation")), 1), createBaseVNode("a", _hoisted_48, [createBaseVNode("span", _hoisted_49, toDisplayString(unref(t)("subscription.videoEstimateTryTemplate")), 1), _cache[6] || (_cache[6] = createBaseVNode("span", { class: "no-underline" }, "→", -1))])])]),
					_: 1
				}, 512),
				createBaseVNode("div", _hoisted_50, [createBaseVNode("p", _hoisted_51, toDisplayString(_ctx.$t("subscription.haveQuestions")), 1), createBaseVNode("div", _hoisted_52, [
					createVNode(Button_default, {
						variant: "muted-textonly",
						class: "h-6 p-1 text-sm text-text-secondary hover:text-base-foreground",
						onClick: handleContactUs
					}, {
						default: withCtx(() => [createTextVNode(toDisplayString(_ctx.$t("subscription.contactUs")) + " ", 1), _cache[7] || (_cache[7] = createBaseVNode("i", { class: "pi pi-comments" }, null, -1))]),
						_: 1
					}),
					createBaseVNode("span", _hoisted_53, toDisplayString(_ctx.$t("g.or")), 1),
					createVNode(Button_default, {
						variant: "muted-textonly",
						class: "h-6 p-1 text-sm text-text-secondary hover:text-base-foreground",
						onClick: handleViewEnterprise
					}, {
						default: withCtx(() => [createTextVNode(toDisplayString(_ctx.$t("subscription.viewEnterprise")) + " ", 1), _cache[8] || (_cache[8] = createBaseVNode("i", { class: "pi pi-external-link" }, null, -1))]),
						_: 1
					})
				])])
			]);
		};
	}
});
//#endregion
//#region src/platform/workspace/components/SubscriptionRequiredDialogContentWorkspace.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1 = { class: "relative flex h-full flex-col gap-6 overflow-y-auto p-4 pt-8 md:px-16 md:py-8" };
var _hoisted_2 = { class: "flex flex-col items-center gap-3" };
var _hoisted_3 = {
	key: 0,
	class: "text-center"
};
var _hoisted_4 = { class: "m-0 text-xl text-muted-foreground lg:text-2xl" };
var _hoisted_5 = { class: "m-0 mt-2 text-sm text-text-secondary" };
//#endregion
//#region src/platform/workspace/components/SubscriptionRequiredDialogContentWorkspace.vue
var SubscriptionRequiredDialogContentWorkspace_default = /*#__PURE__*/ _plugin_vue_export_helper_default(/* @__PURE__ */ defineComponent({
	__name: "SubscriptionRequiredDialogContentWorkspace",
	props: {
		onClose: { type: Function },
		reason: {},
		paymentIntentSource: {},
		isPersonal: {
			type: Boolean,
			default: false
		},
		initialCheckout: {}
	},
	emits: ["close"],
	setup(__props, { emit: __emit }) {
		const { checkoutStep, isLoadingPreview, loadingTier, isSubscribing, isResubscribing, previewData, reactivationRequired, quoteIsCurrent, isApplyingPromotionCode, selectedTierKey, selectedBillingCycle, activeCheckoutActionUrl, authenticationState, authenticationError, reconciliationOperationId, parkedCheckoutRecovery, isPolling, paymentCancelable, isCancelingPayment, cancelPaymentError, cancelPayment, handleSubscribeClick, handleBackToPricing, handleAddCreditCard, handleConfirmTransition, applyPromotionCode, invalidateQuote, handleResubscribe, handleSuccessClose } = useSubscriptionCheckout(__emit, __props.paymentIntentSource, { tierPlanType: __props.isPersonal ? "personal" : "team" });
		onMounted(() => {
			if (__props.initialCheckout?.planMode === "personal") handleSubscribeClick(__props.initialCheckout);
		});
		return (_ctx, _cache) => {
			const _component_i18n_t = resolveComponent("i18n-t");
			return openBlock(), createElementBlock("div", _hoisted_1, [
				createVNode(Button_default, {
					size: "icon",
					variant: "muted-textonly",
					class: "absolute top-2.5 right-2.5 shrink-0 rounded-full text-text-secondary hover:bg-white/10",
					"aria-label": _ctx.$t("g.close"),
					onClick: __props.onClose
				}, {
					default: withCtx(() => [..._cache[0] || (_cache[0] = [createBaseVNode("i", { class: "pi pi-times text-xl" }, null, -1)])]),
					_: 1
				}, 8, ["aria-label", "onClick"]),
				createBaseVNode("div", _hoisted_2, [createBaseVNode("div", {
					class: normalizeClass(unref(cn)("flex size-10 items-center justify-center rounded-xl text-lg font-semibold text-white", __props.isPersonal ? "bg-muted-foreground/30" : "bg-primary-background")),
					"aria-hidden": "true"
				}, toDisplayString(__props.isPersonal ? "P" : "T"), 3), createVNode(_component_i18n_t, {
					keypath: "subscription.plansForWorkspace",
					tag: "h2",
					class: "m-0 font-inter text-2xl font-semibold text-base-foreground"
				}, {
					workspace: withCtx(() => [createBaseVNode("span", { class: normalizeClass(__props.isPersonal ? "text-muted-foreground" : "text-emerald-400") }, toDisplayString(__props.isPersonal ? _ctx.$t("subscription.personalWorkspace") : _ctx.$t("subscription.teamWorkspace")), 3)]),
					_: 1
				})]),
				__props.reason === "out_of_credits" ? (openBlock(), createElementBlock("div", _hoisted_3, [createBaseVNode("h2", _hoisted_4, toDisplayString(_ctx.$t("credits.topUp.insufficientTitle")), 1), createBaseVNode("p", _hoisted_5, toDisplayString(_ctx.$t("credits.topUp.insufficientMessage")), 1)])) : createCommentVNode("", true),
				unref(checkoutStep) === "pricing" ? (openBlock(), createBlock(PricingTableWorkspace_default, {
					key: 1,
					class: "flex-1",
					"is-loading": unref(isLoadingPreview) || unref(isResubscribing),
					"loading-tier": unref(loadingTier),
					onSubscribe: unref(handleSubscribeClick),
					onResubscribe: unref(handleResubscribe)
				}, null, 8, [
					"is-loading",
					"loading-tier",
					"onSubscribe",
					"onResubscribe"
				])) : unref(checkoutStep) === "preview" && unref(previewData) && unref(previewData).transition_type === "new_subscription" ? (openBlock(), createBlock(SubscriptionAddPaymentPreviewWorkspace_default, {
					key: 2,
					"preview-data": unref(previewData),
					"tier-key": unref(selectedTierKey),
					"billing-cycle": unref(selectedBillingCycle),
					"is-loading": unref(isSubscribing) || unref(isPolling),
					"action-url": unref(activeCheckoutActionUrl),
					"authentication-state": unref(authenticationState),
					"authentication-error": unref(authenticationError),
					"reconciliation-operation-id": unref(reconciliationOperationId),
					"parked-checkout-recovery": unref(parkedCheckoutRecovery),
					"quote-is-current": unref(quoteIsCurrent),
					"is-applying-promotion-code": unref(isApplyingPromotionCode),
					onAddCreditCard: unref(handleAddCreditCard),
					onApplyPromotionCode: unref(applyPromotionCode),
					onInvalidateQuote: unref(invalidateQuote),
					onBack: unref(handleBackToPricing)
				}, null, 8, [
					"preview-data",
					"tier-key",
					"billing-cycle",
					"is-loading",
					"action-url",
					"authentication-state",
					"authentication-error",
					"reconciliation-operation-id",
					"parked-checkout-recovery",
					"quote-is-current",
					"is-applying-promotion-code",
					"onAddCreditCard",
					"onApplyPromotionCode",
					"onInvalidateQuote",
					"onBack"
				])) : unref(checkoutStep) === "preview" && unref(previewData) && unref(previewData).transition_type !== "new_subscription" ? (openBlock(), createBlock(SubscriptionTransitionPreviewWorkspace_default, {
					key: 3,
					"preview-data": unref(previewData),
					"is-loading": unref(isSubscribing) || unref(isPolling),
					"action-url": unref(activeCheckoutActionUrl),
					"force-reactivation": unref(reactivationRequired),
					"authentication-state": unref(authenticationState),
					"authentication-error": unref(authenticationError),
					"reconciliation-operation-id": unref(reconciliationOperationId),
					"quote-is-current": unref(quoteIsCurrent),
					"is-applying-promotion-code": unref(isApplyingPromotionCode),
					"payment-cancelable": unref(paymentCancelable),
					"canceling-payment": unref(isCancelingPayment),
					"cancel-payment-error": unref(cancelPaymentError),
					onCancelPayment: unref(cancelPayment),
					onConfirm: unref(handleConfirmTransition),
					onApplyPromotionCode: unref(applyPromotionCode),
					onInvalidateQuote: unref(invalidateQuote),
					onBack: unref(handleBackToPricing)
				}, null, 8, [
					"preview-data",
					"is-loading",
					"action-url",
					"force-reactivation",
					"authentication-state",
					"authentication-error",
					"reconciliation-operation-id",
					"quote-is-current",
					"is-applying-promotion-code",
					"payment-cancelable",
					"canceling-payment",
					"cancel-payment-error",
					"onCancelPayment",
					"onConfirm",
					"onApplyPromotionCode",
					"onInvalidateQuote",
					"onBack"
				])) : unref(checkoutStep) === "success" && unref(selectedTierKey) ? (openBlock(), createBlock(SubscriptionSuccessWorkspace_default, {
					key: 4,
					"tier-key": unref(selectedTierKey),
					"preview-data": unref(previewData),
					onClose: unref(handleSuccessClose)
				}, null, 8, [
					"tier-key",
					"preview-data",
					"onClose"
				])) : createCommentVNode("", true)
			]);
		};
	}
}), [["__scopeId", "data-v-ac4ec339"]]);
//#endregion
export { SubscriptionRequiredDialogContentWorkspace_default as default };
