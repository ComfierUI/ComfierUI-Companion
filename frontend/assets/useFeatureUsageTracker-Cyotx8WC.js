import "./rolldown-runtime-xtsTai4I.js";
import { P as computed } from "./vendor-vue-core-C1utdb0s.js";
import { U as useStorage } from "./vendor-vueuse-BxKIIsKg.js";
//#region src/platform/surveys/surveyRegistry.ts
/**
* Registry of all feature surveys.
* Add new surveys here when targeting specific features for feedback.
*/
var FEATURE_SURVEYS = {
	"node-search": {
		featureId: "node-search",
		typeformId: "goZLqjKL",
		triggerThreshold: 3,
		delayMs: 5e3
	},
	"queue-progress-overlay": {
		featureId: "queue-progress-overlay",
		typeformId: "HZ5saxry",
		triggerThreshold: 16,
		delayMs: 5e3
	},
	"error-panel": {
		featureId: "error-panel",
		typeformId: "iFp4p4mV",
		triggerThreshold: 3,
		presentation: "inline-cta"
	},
	"example-workflows": {
		featureId: "example-workflows",
		typeformId: "OnKJQYLE",
		triggerThreshold: 3,
		delayMs: 5e3
	}
};
function getSurveyConfig(featureId) {
	return FEATURE_SURVEYS[featureId];
}
function getEnabledSurveys() {
	return Object.values(FEATURE_SURVEYS).filter((config) => config.enabled !== false);
}
/**
* Surveys that should auto-popup via the global controller.
* Inline-CTA surveys are excluded because their feature-site renders them.
*/
function getFloatingSurveys() {
	return getEnabledSurveys().filter((config) => (config.presentation ?? "floating") === "floating");
}
//#endregion
//#region src/platform/surveys/useFeatureUsageTracker.ts
var STORAGE_KEY = "Comfy.FeatureUsage";
function latestUsage(storedUsage, currentUsage) {
	if (!storedUsage) return currentUsage;
	if (!currentUsage) return storedUsage;
	return storedUsage.useCount >= currentUsage.useCount ? storedUsage : currentUsage;
}
function incrementUsage(usage, now) {
	return {
		useCount: (usage?.useCount ?? 0) + 1,
		firstUsed: usage?.firstUsed ?? now,
		lastUsed: now
	};
}
function persistUsageData(featureId, currentUsage, now) {
	try {
		const oldValue = localStorage.getItem(STORAGE_KEY);
		const storedUsageData = oldValue ? JSON.parse(oldValue) : {};
		const usageData = {
			...storedUsageData,
			[featureId]: incrementUsage(latestUsage(storedUsageData[featureId], currentUsage), now)
		};
		const newValue = JSON.stringify(usageData);
		localStorage.setItem(STORAGE_KEY, newValue);
		window.dispatchEvent(new StorageEvent("storage", {
			key: STORAGE_KEY,
			oldValue,
			newValue,
			storageArea: localStorage
		}));
		return usageData;
	} catch {
		return;
	}
}
/**
* Tracks feature usage for survey eligibility.
* Persists to localStorage.
*/
function useFeatureUsageTracker(featureId) {
	const usageData = useStorage(STORAGE_KEY, {});
	const usage = computed(() => usageData.value[featureId]);
	const useCount = computed(() => usage.value?.useCount ?? 0);
	function trackUsage() {
		const now = Date.now();
		const existing = usageData.value[featureId];
		usageData.value = persistUsageData(featureId, existing, now) ?? {
			...usageData.value,
			[featureId]: incrementUsage(existing, now)
		};
	}
	function reset() {
		delete usageData.value[featureId];
	}
	return {
		usage,
		useCount,
		trackUsage,
		reset
	};
}
//#endregion
export { getFloatingSurveys as n, getSurveyConfig as r, useFeatureUsageTracker as t };
