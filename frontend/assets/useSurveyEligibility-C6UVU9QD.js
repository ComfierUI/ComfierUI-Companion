import "./rolldown-runtime-xtsTai4I.js";
import { Lt as ref, P as computed, Wt as toValue } from "./vendor-vue-core-C1utdb0s.js";
import { U as useStorage } from "./vendor-vueuse-BxKIIsKg.js";
import { t as useFeatureUsageTracker } from "./useFeatureUsageTracker-Cyotx8WC.js";
//#region src/platform/surveys/useErrorSurveyPopoverState.ts
/**
* Singleton state for the error panel survey popover visibility.
* Kept at module scope so popover visibility survives the lifecycle of
* individual host components (e.g. the error tab being destroyed when no
* errors remain). Together with the popover component keeping its
* Teleport mounted after the first open, this is what preserves the
* Typeform iframe across workflow switches.
*/
var isPopoverOpen = ref(false);
function useErrorSurveyPopoverState() {
	function open() {
		isPopoverOpen.value = true;
	}
	return {
		isPopoverOpen,
		open
	};
}
//#endregion
//#region src/platform/surveys/useSurveyEligibility.ts
var STORAGE_KEY = "Comfy.SurveyState";
var GLOBAL_COOLDOWN_MS = 3456e5;
var DEFAULT_THRESHOLD = 3;
var DEFAULT_DELAY_MS = 5e3;
function useSurveyEligibility(config) {
	const state = useStorage(STORAGE_KEY, {
		optedOut: false,
		seenSurveys: {}
	});
	const resolvedConfig = computed(() => toValue(config));
	const { useCount } = useFeatureUsageTracker(resolvedConfig.value.featureId);
	const threshold = computed(() => resolvedConfig.value.triggerThreshold ?? DEFAULT_THRESHOLD);
	const delayMs = computed(() => resolvedConfig.value.delayMs ?? DEFAULT_DELAY_MS);
	const isSurveyEnabled = computed(() => resolvedConfig.value.enabled ?? true);
	const isNightlyLocalhost = computed(() => false);
	const hasReachedThreshold = computed(() => useCount.value >= threshold.value);
	const hasSeenSurvey = computed(() => !!state.value.seenSurveys[resolvedConfig.value.featureId]);
	const isInGlobalCooldown = computed(() => {
		const timestamps = Object.values(state.value.seenSurveys);
		if (timestamps.length === 0) return false;
		const lastShown = Math.max(...timestamps);
		return Date.now() - lastShown < GLOBAL_COOLDOWN_MS;
	});
	const hasOptedOut = computed(() => state.value.optedOut);
	const isEligible = computed(() => {
		if (!isSurveyEnabled.value) return false;
		if (!isNightlyLocalhost.value) return false;
		if (!hasReachedThreshold.value) return false;
		if (hasSeenSurvey.value) return false;
		if (isInGlobalCooldown.value) return false;
		if (hasOptedOut.value) return false;
		return true;
	});
	function markSurveyShown() {
		state.value.seenSurveys[resolvedConfig.value.featureId] = Date.now();
	}
	function optOut() {
		state.value.optedOut = true;
	}
	function resetState() {
		state.value = {
			optedOut: false,
			seenSurveys: {}
		};
	}
	return {
		isEligible,
		delayMs,
		markSurveyShown,
		optOut,
		resetState
	};
}
//#endregion
export { useErrorSurveyPopoverState as n, useSurveyEligibility as t };
