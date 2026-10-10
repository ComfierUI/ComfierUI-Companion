import "./rolldown-runtime-xtsTai4I.js";
//#region packages/account-core/src/telemetry.ts
var SESSION_TELEMETRY_EVENT = {
	refreshSucceeded: "auth.unified.refresh.succeeded",
	refreshFailed: "auth.unified.refresh.failed",
	bootstrap: "session_bootstrap",
	signedOutRemotely: "session_signed_out_remotely"
};
/** The web-session identity's telemetry hooks, routed to one host sink. */
function webSessionTelemetryHooks(track) {
	return {
		onBootstrap: ({ outcome, origin }) => track({
			name: SESSION_TELEMETRY_EVENT.bootstrap,
			properties: {
				outcome,
				origin
			}
		}),
		onSignedOutRemotely: ({ origin }) => track({
			name: SESSION_TELEMETRY_EVENT.signedOutRemotely,
			properties: { origin }
		})
	};
}
/**
* The cloud app's `billing.operation.*` events, emitted by the billing
* operation lifecycle for every observed `billing_op_id` regardless of
* which presentation settled it.
*/
var BILLING_OPERATION_TELEMETRY_EVENT = {
	started: "billing.operation.started",
	succeeded: "billing.operation.succeeded",
	failed: "billing.operation.failed",
	timeout: "billing.operation.timeout"
};
/**
* Payment friction the lifecycle observes inside one operation: a bank
* challenge and its verdict, each retryable decline, and a hosted step the
* customer was sent to and came back from.
*/
var BILLING_CHECKOUT_FRICTION_TELEMETRY_EVENT = {
	challengeRequired: "billing.checkout.challenge_required",
	challengeCompleted: "billing.checkout.challenge_completed",
	challengeFailed: "billing.checkout.challenge_failed",
	redirectStarted: "billing.checkout.redirect_started",
	returned: "billing.checkout.returned"
};
var AUTH_TELEMETRY_EVENT = {
	signUpOpened: "app:user_sign_up_opened",
	authCompleted: "app:user_auth_completed",
	authFailed: "app:user_auth_failed"
};
//#endregion
//#region src/platform/telemetry/types.ts
/**
* Telemetry Provider Interface
*
* CRITICAL: OSS Build Safety
* This module is excluded from OSS builds via conditional compilation.
* When DISTRIBUTION is unset (OSS builds), Vite's tree-shaking removes this code entirely,
* ensuring the open source build contains no telemetry dependencies.
*
* To verify OSS builds are clean:
* 1. `DISTRIBUTION= pnpm build` (OSS build)
* 2. `grep -RinE --include='*.js' 'trackWorkflow|trackEvent|mixpanel' dist/` (should find nothing)
* 3. Check dist/assets/*.js files contain no tracking code
*/
/**
* Telemetry event constants
*
* Event naming conventions:
* - 'app:' prefix: UI/user interaction events
* - No prefix: Backend/system events (execution lifecycle)
*/
var TelemetryEvents = {
	USER_SIGN_UP_OPENED: AUTH_TELEMETRY_EVENT.signUpOpened,
	USER_AUTH_COMPLETED: AUTH_TELEMETRY_EVENT.authCompleted,
	USER_AUTH_FAILED: AUTH_TELEMETRY_EVENT.authFailed,
	USER_LOGGED_IN: "app:user_logged_in",
	UNIFIED_AUTH_RETRY_SUCCEEDED: "auth.unified.request_retry.succeeded",
	UNIFIED_AUTH_RETRY_FAILED: "auth.unified.request_retry.failed",
	UNIFIED_AUTH_REFRESH_SUCCEEDED: SESSION_TELEMETRY_EVENT.refreshSucceeded,
	UNIFIED_AUTH_REFRESH_FAILED: SESSION_TELEMETRY_EVENT.refreshFailed,
	IMAGE_LOAD_FAILED: "app:image_load_failed",
	BOOTSTRAP_COMPLETE: "app:bootstrap_complete",
	RUN_BUTTON_CLICKED: "app:run_button_click",
	SUBSCRIPTION_REQUIRED_MODAL_OPENED: "app:subscription_required_modal_opened",
	SUBSCRIBE_NOW_BUTTON_CLICKED: "app:subscribe_now_button_clicked",
	MONTHLY_SUBSCRIPTION_SUCCEEDED: "app:monthly_subscription_succeeded",
	MONTHLY_SUBSCRIPTION_CANCELLED: "app:monthly_subscription_cancelled",
	SUBSCRIPTION_CANCEL_FLOW_OPENED: "app:subscription_cancel_flow_opened",
	SUBSCRIPTION_CANCEL_CONFIRMED: "app:subscription_cancel_confirmed",
	SUBSCRIPTION_CANCEL_ABANDONED: "app:subscription_cancel_abandoned",
	SUBSCRIPTION_CANCEL_FAILED: "app:subscription_cancel_failed",
	RESUBSCRIBE_BUTTON_CLICKED: "app:resubscribe_button_clicked",
	ADD_API_CREDIT_BUTTON_CLICKED: "app:add_api_credit_button_clicked",
	API_CREDIT_TOPUP_BUTTON_PURCHASE_CLICKED: "app:api_credit_topup_button_purchase_clicked",
	API_CREDIT_TOPUP_SUCCEEDED: "app:api_credit_topup_succeeded",
	WORKSPACE_INVITE_SENT: "app:workspace_invite_sent",
	WORKSPACE_INVITE_FAILED: "app:workspace_invite_failed",
	BEGIN_CHECKOUT: "begin_checkout",
	AGENT_PAYWALL_SHOWN: "app:agent_paywall_shown",
	AGENT_PAYWALL_CTA_CLICKED: "app:agent_paywall_cta_clicked",
	BILLING_SUBSCRIPTION_CHECKOUT_RECEIVED: "billing.subscription_checkout.checkout_received",
	BILLING_TOPUP_CHECKOUT_RECEIVED: "billing.topup.checkout_received",
	BILLING_SUBSCRIPTION_CHECKOUT_REQUEST_SENT: "billing.subscription_checkout.request_sent",
	BILLING_TOPUP_REQUEST_SENT: "billing.topup.request_sent",
	BILLING_SUBSCRIPTION_CHECKOUT_INTENT: "billing.subscription_checkout.intent",
	BILLING_TOPUP_INTENT: "billing.topup.intent",
	BILLING_SUBSCRIPTION_CHECKOUT_STARTED: "billing.subscription_checkout.started",
	BILLING_SUBSCRIPTION_CHECKOUT_SUCCEEDED: "billing.subscription_checkout.succeeded",
	BILLING_SUBSCRIPTION_CHECKOUT_FAILED: "billing.subscription_checkout.failed",
	BILLING_SUBSCRIPTION_CHECKOUT_TIMEOUT: "billing.subscription_checkout.timeout",
	BILLING_OPERATION_STARTED: "billing.operation.started",
	BILLING_CAPABILITY_READ_SUCCEEDED: "billing.capability_read.succeeded",
	BILLING_CAPABILITY_READ_FAILED: "billing.capability_read.failed",
	BILLING_OPERATION_SUCCEEDED: "billing.operation.succeeded",
	BILLING_OPERATION_FAILED: "billing.operation.failed",
	BILLING_OPERATION_TIMEOUT: "billing.operation.timeout",
	BILLING_RESUBSCRIBE_STARTED: "billing.resubscribe.started",
	BILLING_RESUBSCRIBE_SUCCEEDED: "billing.resubscribe.succeeded",
	BILLING_RESUBSCRIBE_FAILED: "billing.resubscribe.failed",
	BILLING_TOPUP_STARTED: "billing.topup.started",
	BILLING_TOPUP_SUCCEEDED: "billing.topup.succeeded",
	BILLING_TOPUP_FAILED: "billing.topup.failed",
	BILLING_DOWNGRADE_TO_PERSONAL_STARTED: "billing.downgrade_to_personal.started",
	BILLING_DOWNGRADE_TO_PERSONAL_SUCCEEDED: "billing.downgrade_to_personal.succeeded",
	BILLING_DOWNGRADE_TO_PERSONAL_FAILED: "billing.downgrade_to_personal.failed",
	BILLING_WEB_HANDOFF_OPENED: "billing.web_handoff.opened",
	BILLING_ENTRY_PAYWALL_SHOWN: "billing.entry.paywall_shown",
	BILLING_ENTRY_ADD_CREDITS_CLICKED: "billing.entry.add_credits_clicked",
	BILLING_CANCEL_INTENT: "billing.cancel.intent",
	BILLING_CANCEL_ABANDONED: "billing.cancel.abandoned",
	BILLING_CANCEL_FAILED: "billing.cancel.failed",
	BILLING_PORTAL_OPENED: "billing.portal.opened",
	BILLING_PORTAL_FAILED: "billing.portal.failed",
	BILLING_PORTAL_RETURNED: "billing.portal.returned",
	USER_SURVEY_OPENED: "app:user_survey_opened",
	USER_SURVEY_SUBMITTED: "app:user_survey_submitted",
	ONBOARDING_TOUR_NOT_STARTED: "app:onboarding_tour_not_started",
	ONBOARDING_TOUR_STARTED: "app:onboarding_tour_started",
	ONBOARDING_TOUR_STEP_SHOWN: "app:onboarding_tour_step_shown",
	ONBOARDING_TOUR_COMPLETED: "app:onboarding_tour_completed",
	ONBOARDING_TOUR_SKIPPED: "app:onboarding_tour_skipped",
	ONBOARDING_TOUR_NUDGE_SHOWN: "app:onboarding_tour_nudge_shown",
	ONBOARDING_TOUR_EXPLORE_TEMPLATES_CLICKED: "app:onboarding_tour_explore_templates_clicked",
	USER_EMAIL_VERIFY_OPENED: "app:user_email_verify_opened",
	USER_EMAIL_VERIFY_REQUESTED: "app:user_email_verify_requested",
	USER_EMAIL_VERIFY_COMPLETED: "app:user_email_verify_completed",
	TEMPLATE_WORKFLOW_OPENED: "app:template_workflow_opened",
	TEMPLATE_LIBRARY_OPENED: "app:template_library_opened",
	TEMPLATE_LIBRARY_CLOSED: "app:template_library_closed",
	WORKFLOW_IMPORTED: "app:workflow_imported",
	WORKFLOW_OPENED: "app:workflow_opened",
	ENTER_LINEAR_MODE: "app:app_mode_opened",
	SHARE_FLOW: "app:share_flow",
	SHARE_LINK_OPENED: "app:share_link_opened",
	PAGE_VISIBILITY_CHANGED: "app:page_visibility_changed",
	TAB_COUNT_TRACKING: "app:tab_count_tracking",
	SHELL_LAYOUT: "app:shell_layout",
	NODE_SEARCH: "app:node_search",
	NODE_SEARCH_RESULT_SELECTED: "app:node_search_result_selected",
	SEARCH_QUERY: "app:search_query",
	NODE_ADDED: "app:node_added_to_workflow",
	TEMPLATE_FILTER_CHANGED: "app:template_filter_changed",
	SETTING_CHANGED: "app:setting_changed",
	HELP_CENTER_OPENED: "app:help_center_opened",
	HELP_RESOURCE_CLICKED: "app:help_resource_clicked",
	HELP_CENTER_CLOSED: "app:help_center_closed",
	WORKFLOW_CREATED: "app:workflow_created",
	WORKFLOW_SAVED: "app:workflow_saved",
	DEFAULT_VIEW_SET: "app:default_view_set",
	EXECUTION_START: "execution_start",
	EXECUTION_ERROR: "execution_error",
	EXECUTION_SUCCESS: "execution_success",
	SHARED_WORKFLOW_RUN: "app:shared_workflow_run",
	UI_BUTTON_CLICKED: "app:ui_button_clicked",
	AGENT_MESSAGE_FEEDBACK: "app:agent_message_feedback",
	AGENT_PANEL_OPENED: "app:agent_panel_opened",
	AGENT_PANEL_CLOSED: "app:agent_panel_closed",
	AGENT_ENTRY_BUTTON_CLICKED: "app:agent_entry_button_clicked",
	AGENT_CLOSE_BUTTON_CLICKED: "app:agent_close_button_clicked",
	AGENT_CONSENT_SHOWN: "app:agent_consent_shown",
	AGENT_CONSENT_RESOLVED: "app:agent_consent_resolved",
	AGENT_ONBOARDING_SHOWN: "app:agent_onboarding_shown",
	AGENT_ONBOARDING_STEP: "app:agent_onboarding_step",
	AGENT_MESSAGE_SENT: "app:agent_message_sent",
	AGENT_STARTER_PROMPT_CLICKED: "app:agent_starter_prompt_clicked",
	AGENT_FREE_USE_NOTICE: "app:agent_free_use_notice",
	AGENT_FREE_USE_EXPOSURE: "app:agent_free_use_exposure",
	AGENT_NODE_TAGGED: "app:agent_node_tagged",
	AGENT_ATTACH_BUTTON_CLICKED: "app:agent_attach_button_clicked",
	AGENT_WORKFLOW_APPLIED: "app:agent_workflow_applied",
	AGENT_ERROR: "app:agent_error",
	AGENT_STOP_CLICKED: "app:agent_stop_clicked",
	AGENT_WORKFLOW_BOUND: "app:agent_workflow_bound",
	AGENT_RUN_APPROVAL_SHOWN: "app:agent_run_approval_shown",
	AGENT_RUN_APPROVAL_RESOLVED: "app:agent_run_approval_resolved",
	AGENT_RUN_MODE_CHANGED: "app:agent_run_mode_changed",
	AGENT_THREAD_STARTED: "app:agent_thread_started",
	AGENT_CONSENT_NOT_OFFERED: "app:agent_consent_not_offered",
	AGENT_CONSENT_OFFER_EXITED: "app:agent_consent_offer_exited",
	AGENT_ONBOARDING_NOT_SHOWN: "app:agent_onboarding_not_shown",
	WIDGET_FAVORITE_TOGGLED: "app:widget_favorite_toggled",
	NAMED_VALUES_SHADOW_DIFF_MISMATCH: "app:named_values_shadow_diff_mismatch",
	NAMED_VALUES_SHADOW_DIFF_SUMMARY: "app:named_values_shadow_diff_summary",
	LINK_DEDUP_DROP: "app:link_dedup_drop",
	PAGE_VIEW: "app:page_view",
	FETCH_TIMEOUT: "app:fetch_timeout"
};
TelemetryEvents.ONBOARDING_TOUR_NOT_STARTED, TelemetryEvents.ONBOARDING_TOUR_STARTED, TelemetryEvents.ONBOARDING_TOUR_STEP_SHOWN, TelemetryEvents.ONBOARDING_TOUR_COMPLETED, TelemetryEvents.ONBOARDING_TOUR_SKIPPED, TelemetryEvents.ONBOARDING_TOUR_NUDGE_SHOWN, TelemetryEvents.ONBOARDING_TOUR_EXPLORE_TEMPLATES_CLICKED;
var CANCELLATION_STAGE_EVENTS = {
	flow_opened: TelemetryEvents.SUBSCRIPTION_CANCEL_FLOW_OPENED,
	confirmed: TelemetryEvents.SUBSCRIPTION_CANCEL_CONFIRMED,
	abandoned: TelemetryEvents.SUBSCRIPTION_CANCEL_ABANDONED,
	failed: TelemetryEvents.SUBSCRIPTION_CANCEL_FAILED
};
var executionTriggerSources = [
	"button",
	"keybinding",
	"legacy_ui",
	"unknown",
	"linear",
	"auto_queue"
];
function normalizeExecutionTriggerSource(value) {
	return executionTriggerSources.find((triggerSource) => triggerSource === value) ?? "unknown";
}
//#endregion
export { BILLING_OPERATION_TELEMETRY_EVENT as a, BILLING_CHECKOUT_FRICTION_TELEMETRY_EVENT as i, TelemetryEvents as n, webSessionTelemetryHooks as o, normalizeExecutionTriggerSource as r, CANCELLATION_STAGE_EVENTS as t };
