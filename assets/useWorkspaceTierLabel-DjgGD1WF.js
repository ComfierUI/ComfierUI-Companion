import "./rolldown-runtime-xtsTai4I.js";
import { r as useI18n } from "./vendor-i18n-BZvE7WBQ.js";
//#region src/platform/workspace/composables/useWorkspaceTierLabel.ts
var tierKeyMap = {
	FREE: "free",
	STANDARD: "standard",
	CREATOR: "creator",
	PRO: "pro",
	FOUNDER: "founder",
	FOUNDERS_EDITION: "founder",
	ENTERPRISE: "enterprise"
};
function useWorkspaceTierLabel() {
	const { t } = useI18n();
	function formatTierName(tier, isYearly) {
		if (!tier) return "";
		if (tier === "TEAM") return t("subscription.teamPlanName");
		const key = tierKeyMap[tier];
		if (!key) return "";
		const baseName = t(`subscription.tiers.${key}.name`);
		return isYearly ? t("subscription.tierNameYearly", { name: baseName }) : baseName;
	}
	function getTierLabel(workspace) {
		if (!workspace.isSubscribed) return null;
		if (workspace.subscriptionTier) return formatTierName(workspace.subscriptionTier, false);
		if (!workspace.subscriptionPlan) return null;
		const planSlug = workspace.subscriptionPlan.toUpperCase();
		const tierMatch = Object.keys(tierKeyMap).sort((a, b) => b.length - a.length).find((tier) => planSlug === tier || planSlug.startsWith(`${tier}_`));
		if (!tierMatch) return null;
		return formatTierName(tierMatch, planSlug.includes("YEARLY") || planSlug.includes("ANNUAL"));
	}
	return {
		formatTierName,
		getTierLabel
	};
}
//#endregion
export { useWorkspaceTierLabel as t };
