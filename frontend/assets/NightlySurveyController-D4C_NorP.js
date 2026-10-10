import "./rolldown-runtime-xtsTai4I.js";
import { Dt as withDirectives, Et as withCtx, F as createBaseVNode, G as defineComponent, H as createTextVNode, I as createBlock, Jt as normalizeClass, Kt as unref, L as createCommentVNode, Lt as ref, Mt as isRef, O as Fragment, P as computed, Q as mergeModels, R as createElementBlock, St as watch, U as createVNode, Zt as toDisplayString, dt as renderList, h as Transition, j as Teleport, lt as openBlock, p as storeToRefs, st as onUnmounted, w as vShow, yt as useModel } from "./vendor-vue-core-C1utdb0s.js";
import { Rt as useExecutionErrorStore } from "./layoutStore-CZsuzg91.js";
import { r as useI18n } from "./vendor-i18n-BZvE7WBQ.js";
import { t as Button_default } from "./Button-j0oCzR82.js";
import { t as isTypeformIdValid } from "./useTypeformEmbed-iT-vAgDA.js";
import { t as TypeformEmbed_default } from "./TypeformEmbed-Climqota.js";
import { n as getFloatingSurveys, r as getSurveyConfig } from "./useFeatureUsageTracker-Cyotx8WC.js";
import { n as useErrorSurveyPopoverState, t as useSurveyEligibility } from "./useSurveyEligibility-C6UVU9QD.js";
import { t as useSurveyFeatureTracking } from "./useSurveyFeatureTracking-B7uFmX-6.js";
//#region src/platform/surveys/NightlySurveyPopover.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1 = {
	"data-testid": "nightly-survey-popover",
	class: "fixed right-4 bottom-4 z-10000 w-80 rounded-lg border border-border-subtle bg-base-background p-4 shadow-lg"
};
var _hoisted_2 = { class: "mb-2 flex items-center justify-end" };
var _hoisted_3 = { class: "min-h-75" };
//#endregion
//#region src/platform/surveys/NightlySurveyPopover.vue
var NightlySurveyPopover_default = /* @__PURE__ */ defineComponent({
	__name: "NightlySurveyPopover",
	props: /*@__PURE__*/ mergeModels({
		config: {},
		mode: { default: "eligible" }
	}, {
		"open": {
			type: Boolean,
			default: false
		},
		"openModifiers": {}
	}),
	emits: /*@__PURE__*/ mergeModels([
		"shown",
		"dismissed",
		"optedOut"
	], ["update:open"]),
	setup(__props, { emit: __emit }) {
		const openModel = useModel(__props, "open");
		const emit = __emit;
		const { t } = useI18n();
		const { isEligible, delayMs, markSurveyShown, optOut } = useSurveyEligibility(() => __props.config);
		const hasOpenedOnce = ref(openModel.value);
		watch(openModel, (open) => {
			if (open) hasOpenedOnce.value = true;
		});
		let showTimeout = null;
		watch(isEligible, (eligible) => {
			if (__props.mode !== "eligible") return;
			if (!eligible) {
				if (showTimeout) {
					clearTimeout(showTimeout);
					showTimeout = null;
				}
				return;
			}
			if (openModel.value || showTimeout) return;
			showTimeout = setTimeout(() => {
				showTimeout = null;
				if (!isTypeformIdValid(__props.config.typeformId)) return;
				if (openModel.value) return;
				openModel.value = true;
				markSurveyShown();
				emit("shown");
			}, delayMs.value);
		}, { immediate: true });
		onUnmounted(() => {
			if (showTimeout) clearTimeout(showTimeout);
		});
		function handleDismiss() {
			if (showTimeout) {
				clearTimeout(showTimeout);
				showTimeout = null;
			}
			openModel.value = false;
			emit("dismissed");
		}
		function handleOptOut() {
			optOut();
			if (showTimeout) {
				clearTimeout(showTimeout);
				showTimeout = null;
			}
			openModel.value = false;
			emit("optedOut");
		}
		return (_ctx, _cache) => {
			return hasOpenedOnce.value ? (openBlock(), createBlock(Teleport, {
				key: 0,
				to: "body"
			}, [createVNode(Transition, {
				appear: "",
				"enter-active-class": "transition duration-300 ease-out",
				"enter-from-class": "translate-x-full opacity-0",
				"enter-to-class": "translate-x-0 opacity-100",
				"leave-active-class": "transition duration-300 ease-in",
				"leave-from-class": "translate-x-0 opacity-100",
				"leave-to-class": "translate-x-full opacity-0"
			}, {
				default: withCtx(() => [withDirectives(createBaseVNode("div", _hoisted_1, [
					createBaseVNode("div", _hoisted_2, [createVNode(Button_default, {
						variant: "muted-textonly",
						size: "icon-sm",
						"aria-label": unref(t)("g.close"),
						onClick: handleDismiss
					}, {
						default: withCtx(() => [..._cache[0] || (_cache[0] = [createBaseVNode("i", { class: "icon-[lucide--x] size-4" }, null, -1)])]),
						_: 1
					}, 8, ["aria-label"])]),
					createBaseVNode("div", _hoisted_3, [createVNode(TypeformEmbed_default, {
						"typeform-id": __props.config.typeformId,
						"auto-resize": ""
					}, null, 8, ["typeform-id"])]),
					createBaseVNode("div", { class: normalizeClass(["mt-3 flex items-center gap-2", __props.mode === "eligible" ? "justify-center" : "justify-end"]) }, [__props.mode === "eligible" ? (openBlock(), createBlock(Button_default, {
						key: 0,
						variant: "textonly",
						size: "sm",
						onClick: handleDismiss
					}, {
						default: withCtx(() => [createTextVNode(toDisplayString(unref(t)("nightlySurvey.notNow")), 1)]),
						_: 1
					})) : createCommentVNode("", true), createVNode(Button_default, {
						variant: "muted-textonly",
						size: "sm",
						onClick: handleOptOut
					}, {
						default: withCtx(() => [createTextVNode(toDisplayString(unref(t)("nightlySurvey.dontAskAgain")), 1)]),
						_: 1
					})], 2)
				], 512), [[vShow, openModel.value]])]),
				_: 1
			})])) : createCommentVNode("", true);
		};
	}
});
//#endregion
//#region src/platform/surveys/useErrorSurveyTracking.ts
var FEATURE_ID = "error-panel";
/**
* Counts error panel occurrences for nightly survey eligibility.
* Each transition into an error state (from "no errors anywhere" to
* "at least one error somewhere") increments the counter. This treats
* a workflow load with multiple simultaneous error types as one event.
* `immediate: true` ensures a workflow that loads already in an error
* state (e.g. missing nodes/models on startup) counts on initial mount.
*/
function useErrorSurveyTracking() {
	const { trackFeatureUsed } = useSurveyFeatureTracking(FEATURE_ID);
	const { hasAnyError } = storeToRefs(useExecutionErrorStore());
	watch(hasAnyError, (next, prev) => {
		if (!prev && next) trackFeatureUsed();
	}, { immediate: true });
}
//#endregion
//#region src/platform/surveys/NightlySurveyController.vue
var NightlySurveyController_default = /* @__PURE__ */ defineComponent({
	__name: "NightlySurveyController",
	setup(__props) {
		useErrorSurveyTracking();
		const { isPopoverOpen: isErrorPopoverOpen } = useErrorSurveyPopoverState();
		const enabledSurveys = computed(() => getFloatingSurveys());
		const errorPanelConfig = computed(() => {
			const config = getSurveyConfig("error-panel");
			if (!config || config.enabled === false) return void 0;
			if (config.presentation !== "inline-cta") return void 0;
			return config;
		});
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock(Fragment, null, [(openBlock(true), createElementBlock(Fragment, null, renderList(enabledSurveys.value, (config) => {
				return openBlock(), createBlock(NightlySurveyPopover_default, {
					key: config.featureId,
					config
				}, null, 8, ["config"]);
			}), 128)), errorPanelConfig.value ? (openBlock(), createBlock(NightlySurveyPopover_default, {
				key: 0,
				open: unref(isErrorPopoverOpen),
				"onUpdate:open": _cache[0] || (_cache[0] = ($event) => isRef(isErrorPopoverOpen) ? isErrorPopoverOpen.value = $event : null),
				config: errorPanelConfig.value,
				mode: "manual"
			}, null, 8, ["open", "config"])) : createCommentVNode("", true)], 64);
		};
	}
});
//#endregion
export { NightlySurveyController_default as default };
