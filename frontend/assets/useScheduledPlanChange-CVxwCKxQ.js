import "./rolldown-runtime-xtsTai4I.js";
import { P as computed } from "./vendor-vue-core-C1utdb0s.js";
import { Ar as toTierKey, Er as isEnterprisePlanSlug, On as useBillingContext, Or as isUnknownTier } from "./layoutStore-CZsuzg91.js";
import { r as useI18n } from "./vendor-i18n-BZvE7WBQ.js";
//#region src/platform/workspace/components/subscriptionPanelWorkspace.logic.ts
function resolveSubscriptionTierKey(tier) {
	if (!tier) return "free";
	return toTierKey(tier) ?? "standard";
}
function formatSubscriptionDate(isoDate, locale) {
	if (!isoDate) return "";
	const calendarDate = /^(\d{4})-(\d{2})-(\d{2})T/.exec(isoDate);
	if (!calendarDate) return "";
	const [, year, month, day] = calendarDate;
	const calendarCheck = new Date(Date.UTC(Number(year), Number(month) - 1, Number(day)));
	if (calendarCheck.getUTCFullYear() !== Number(year) || calendarCheck.getUTCMonth() + 1 !== Number(month) || calendarCheck.getUTCDate() !== Number(day)) return "";
	const date = new Date(isoDate);
	if (Number.isNaN(date.getTime())) return "";
	return date.toLocaleDateString(locale, {
		month: "short",
		day: "numeric",
		year: "numeric"
	});
}
//#endregion
//#region src/platform/workspace/composables/useScheduledPlanChange.ts
function useScheduledPlanChange() {
	const { t, locale } = useI18n();
	const { subscription, plans } = useBillingContext();
	const scheduledChange = computed(() => subscription.value?.scheduledChange ?? null);
	const formattedDate = computed(() => formatSubscriptionDate(scheduledChange.value?.effective_at, locale.value));
	const planName = computed(() => {
		const slug = scheduledChange.value?.plan_slug;
		if (isEnterprisePlanSlug(slug)) return t("subscription.tiers.enterprise.name");
		const plan = plans.value.find(({ slug: planSlug }) => planSlug === slug);
		if (!plan) return "";
		if (plan.tier === "ENTERPRISE") return t("subscription.tiers.enterprise.name");
		if (plan.slug.startsWith("team")) return t("subscription.teamPlanName");
		if (isUnknownTier(plan.tier)) return t("subscription.unknownTierName");
		return t(`subscription.tiers.${resolveSubscriptionTierKey(plan.tier)}.name`);
	});
	return {
		scheduledChange,
		planName,
		formattedDate,
		isDisplayable: computed(() => Boolean(planName.value) && Boolean(formattedDate.value))
	};
}
//#endregion
export { formatSubscriptionDate as n, resolveSubscriptionTierKey as r, useScheduledPlanChange as t };
