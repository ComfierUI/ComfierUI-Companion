import "./rolldown-runtime-xtsTai4I.js";
import { G as defineComponent, R as createElementBlock, U as createVNode, lt as openBlock } from "./vendor-vue-core-C1utdb0s.js";
import { Z as useCurrentUser } from "./layoutStore-CZsuzg91.js";
import { n as useTelemetry } from "./telemetry-IkzvF0TI.js";
import { d as t } from "./i18n-C3J-ToPr.js";
import { t as useDialogStore } from "./dialogStore-B0GYyals.js";
import { t as TypeformEmbed_default } from "./TypeformEmbed-Climqota.js";
//#region src/platform/surveys/TypeformDialogContent.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1 = { class: "h-[70vh] min-h-96" };
//#endregion
//#region src/platform/surveys/TypeformDialogContent.vue
var TypeformDialogContent_default = /* @__PURE__ */ defineComponent({
	__name: "TypeformDialogContent",
	props: {
		typeformId: {},
		hiddenFields: {}
	},
	setup(__props) {
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", _hoisted_1, [createVNode(TypeformEmbed_default, {
				"typeform-id": __props.typeformId,
				"hidden-fields": __props.hiddenFields,
				"redirect-target": "_self"
			}, null, 8, ["typeform-id", "hidden-fields"])]);
		};
	}
});
//#endregion
//#region src/platform/surveys/openTypeformDialog.ts
function openTypeformDialog({ typeformId, title, hiddenFields, key }) {
	useDialogStore().showDialog({
		key: key ?? `typeform-${typeformId}`,
		title,
		component: TypeformDialogContent_default,
		props: {
			typeformId,
			hiddenFields
		},
		dialogComponentProps: {
			renderer: "reka",
			size: "lg"
		}
	});
}
//#endregion
//#region src/platform/support/config.ts
/**
* Zendesk ticket form field IDs.
*/
var ZENDESK_FIELDS = {
	/** Distribution tag (cloud vs OSS) */
	DISTRIBUTION: "tf_42243568391700",
	/** User email (anonymous requester) */
	ANONYMOUS_EMAIL: "tf_anonymous_requester_email",
	/** User email (authenticated) */
	EMAIL: "tf_40029135130388",
	/** User ID */
	USER_ID: "tf_42515251051412"
};
/**
* Gets the distribution identifier for tracking.
* Helps distinguish feedback from different build types.
*/
function getDistribution() {
	return "oss";
}
var SUPPORT_BASE_URL = "https://support.comfy.org/hc/en-us/requests/new";
var FEEDBACK_TYPEFORM_ID = "q7azbWPi";
var FEEDBACK_TYPEFORM_BASE_URL = `https://form.typeform.com/to/${FEEDBACK_TYPEFORM_ID}`;
/** Shared by the URL and embed builders so their segmentation tags can't drift. */
function getFeedbackTags(source) {
	return {
		distribution: getDistribution(),
		source
	};
}
/**
* Builds the feedback Typeform URL tagged with the current build distribution
* and the UI source that opened it. Tags are passed via the URL fragment
* (Typeform's hidden-field convention) so survey responses can be segmented
* by distribution (cloud / oss-nightly / oss) and entry point.
*/
function buildFeedbackTypeformUrl(source) {
	return `${FEEDBACK_TYPEFORM_BASE_URL}#${new URLSearchParams(getFeedbackTags(source)).toString()}`;
}
function buildFeedbackHiddenFields(source, extraTags = {}) {
	return Object.entries({
		...getFeedbackTags(source),
		...extraTags
	}).map(([key, value]) => `${key}=${value.replace(/,/g, "\\,")}`).join(",");
}
/**
* Builds the support URL with optional user information for pre-filling.
* Users without login information will still get a valid support URL without pre-fill.
*
* @param params - User information to pre-fill in the support form
* @returns Complete Zendesk support URL with query parameters
*/
function buildSupportUrl(params) {
	const searchParams = new URLSearchParams({ [ZENDESK_FIELDS.DISTRIBUTION]: getDistribution() });
	if (params?.userEmail) {
		searchParams.append(ZENDESK_FIELDS.ANONYMOUS_EMAIL, params.userEmail);
		searchParams.append(ZENDESK_FIELDS.EMAIL, params.userEmail);
	}
	if (params?.userId) searchParams.append(ZENDESK_FIELDS.USER_ID, params.userId);
	return `${SUPPORT_BASE_URL}?${searchParams.toString()}`;
}
//#endregion
//#region src/platform/support/feedbackDialog.ts
function openFeedbackDialog(source) {
	const { userEmail } = useCurrentUser();
	useTelemetry()?.trackUiButtonClicked({
		button_id: "feedback_button_clicked",
		element_group: source
	});
	openTypeformDialog({
		key: "global-feedback",
		typeformId: FEEDBACK_TYPEFORM_ID,
		title: t("feedback.title"),
		hiddenFields: buildFeedbackHiddenFields(source, userEmail.value ? { email: userEmail.value } : {})
	});
}
//#endregion
export { buildFeedbackTypeformUrl as n, buildSupportUrl as r, openFeedbackDialog as t };
