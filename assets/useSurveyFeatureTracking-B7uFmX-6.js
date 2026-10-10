import "./rolldown-runtime-xtsTai4I.js";
import { P as computed } from "./vendor-vue-core-C1utdb0s.js";
import { r as getSurveyConfig, t as useFeatureUsageTracker } from "./useFeatureUsageTracker-Cyotx8WC.js";
//#region src/platform/surveys/useSurveyFeatureTracking.ts
/**
* Convenience composable for tracking feature usage for surveys.
* Use this at the feature site to track when a feature is used.
*
* @example
* ```typescript
* const { trackFeatureUsed } = useSurveyFeatureTracking('simple-mode')
*
* function onFeatureAction() {
*   trackFeatureUsed()
* }
* ```
*/
function useSurveyFeatureTracking(featureId) {
	const config = getSurveyConfig(featureId);
	if (config?.enabled === false || !config) return {
		trackFeatureUsed: () => {},
		useCount: computed(() => 0)
	};
	const { trackUsage, useCount } = useFeatureUsageTracker(featureId);
	return {
		trackFeatureUsed: trackUsage,
		useCount
	};
}
//#endregion
export { useSurveyFeatureTracking as t };
