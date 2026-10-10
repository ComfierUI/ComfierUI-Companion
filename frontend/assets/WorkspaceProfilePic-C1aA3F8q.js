import "./rolldown-runtime-xtsTai4I.js";
import { G as defineComponent, Kt as unref, P as computed, R as createElementBlock, Xt as normalizeStyle, Zt as toDisplayString, lt as openBlock } from "./vendor-vue-core-C1utdb0s.js";
//#region packages/design-system/src/workspaceAvatar.ts
var PLAN_COLORS = {
	FREE: {
		lightness: .45,
		chroma: .016,
		hue: 240,
		hueRange: 0
	},
	CREATOR: {
		lightness: .53,
		chroma: .085,
		hue: 210,
		hueRange: 14
	},
	PRO: {
		lightness: .52,
		chroma: .14,
		hue: 295,
		hueRange: 14
	},
	TEAM: {
		lightness: .52,
		chroma: .1,
		hue: 155,
		hueRange: 14
	},
	ENTERPRISE: {
		lightness: .66,
		chroma: .16,
		hue: 345,
		hueRange: 12
	}
};
var NAME_VARIATIONS = [
	-1,
	-.5,
	0,
	.5,
	1
];
/** Solid Polar plan color for a workspace avatar; neutral when the tier is unavailable. */
function workspaceAvatarStyle(workspaceName, subscriptionTier) {
	if (subscriptionTier === void 0) return {};
	const plan = resolveAvatarPlan(subscriptionTier);
	const base = PLAN_COLORS[plan];
	const variation = NAME_VARIATIONS[nameHash(workspaceName) % NAME_VARIATIONS.length] ?? 0;
	const lightnessStep = base.hueRange ? .025 : .055;
	return {
		backgroundColor: `oklch(${(base.lightness + variation * lightnessStep).toFixed(3)} ${(base.chroma + variation * .006).toFixed(3)} ${Math.round(base.hue + variation * base.hueRange)})`,
		color: plan === "ENTERPRISE" ? "var(--color-charcoal-800)" : "var(--color-white)"
	};
}
function resolveAvatarPlan(tier) {
	if (tier === "STANDARD" || tier === "FOUNDERS_EDITION") return "CREATOR";
	return tier && isAvatarPlan(tier) ? tier : "FREE";
}
function isAvatarPlan(tier) {
	return Object.hasOwn(PLAN_COLORS, tier);
}
function nameHash(name) {
	return Array.from(name.normalize("NFKC").trim().toLowerCase()).reduce((hash, character) => Math.imul(hash ^ (character.codePointAt(0) ?? 0), 16777619), 2166136261) >>> 0;
}
//#endregion
//#region src/platform/workspace/components/WorkspaceProfilePic.vue
var WorkspaceProfilePic_default = /* @__PURE__ */ defineComponent({
	__name: "WorkspaceProfilePic",
	props: {
		workspaceName: {},
		subscriptionTier: {}
	},
	setup(__props) {
		const letter = computed(() => [...__props.workspaceName][0]?.toUpperCase() ?? "?");
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", {
				class: "flex aspect-square size-8 items-center justify-center rounded-md bg-secondary-background text-base font-semibold text-base-foreground",
				style: normalizeStyle(unref(workspaceAvatarStyle)(__props.workspaceName, __props.subscriptionTier))
			}, toDisplayString(letter.value), 5);
		};
	}
});
//#endregion
export { WorkspaceProfilePic_default as t };
