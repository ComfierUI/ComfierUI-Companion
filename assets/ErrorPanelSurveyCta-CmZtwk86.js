import "./rolldown-runtime-xtsTai4I.js";
import { Et as withCtx, F as createBaseVNode, G as defineComponent, H as createTextVNode, Kt as unref, L as createCommentVNode, P as computed, R as createElementBlock, U as createVNode, Zt as toDisplayString, lt as openBlock } from "./vendor-vue-core-C1utdb0s.js";
import { r as useI18n } from "./vendor-i18n-BZvE7WBQ.js";
import { t as Button_default } from "./Button-j0oCzR82.js";
import { t as isTypeformIdValid } from "./useTypeformEmbed-iT-vAgDA.js";
import { r as getSurveyConfig } from "./useFeatureUsageTracker-Cyotx8WC.js";
import { n as useErrorSurveyPopoverState, t as useSurveyEligibility } from "./useSurveyEligibility-C6UVU9QD.js";
//#region src/platform/surveys/ErrorPanelSurveyCta.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1 = {
	key: 0,
	"data-testid": "error-panel-survey-cta",
	class: "flex min-w-0 shrink-0 items-center justify-between gap-2 border-t border-interface-stroke px-4 py-3"
};
var _hoisted_2 = { class: "min-w-0 flex-1 text-sm/tight text-muted-foreground" };
var _hoisted_3 = { class: "flex shrink-0 items-center gap-1" };
//#endregion
//#region src/platform/surveys/ErrorPanelSurveyCta.vue
var ErrorPanelSurveyCta_default = /* @__PURE__ */ defineComponent({
	__name: "ErrorPanelSurveyCta",
	setup(__props) {
		const { t } = useI18n();
		const config = getSurveyConfig("error-panel");
		const { isEligible, markSurveyShown } = useSurveyEligibility(() => config ?? {
			featureId: "error-panel",
			typeformId: ""
		});
		const { open } = useErrorSurveyPopoverState();
		const shouldRenderCta = computed(() => !!config && isEligible.value && isTypeformIdValid(config.typeformId));
		function markSeen() {
			markSurveyShown();
		}
		return (_ctx, _cache) => {
			return shouldRenderCta.value ? (openBlock(), createElementBlock("div", _hoisted_1, [createBaseVNode("span", _hoisted_2, toDisplayString(unref(t)("errorPanelSurvey.ctaText")), 1), createBaseVNode("div", _hoisted_3, [createVNode(Button_default, {
				variant: "overlay-white",
				size: "sm",
				onClick: unref(open)
			}, {
				default: withCtx(() => [createTextVNode(toDisplayString(unref(t)("errorPanelSurvey.ctaButton")), 1)]),
				_: 1
			}, 8, ["onClick"]), createVNode(Button_default, {
				variant: "muted-textonly",
				size: "icon-sm",
				"aria-label": unref(t)("g.close"),
				onClick: markSeen
			}, {
				default: withCtx(() => [..._cache[0] || (_cache[0] = [createBaseVNode("i", { class: "icon-[lucide--x] size-4" }, null, -1)])]),
				_: 1
			}, 8, ["aria-label"])])])) : createCommentVNode("", true);
		};
	}
});
//#endregion
export { ErrorPanelSurveyCta_default as default };
