import "./rolldown-runtime-xtsTai4I.js";
import { n as Fuse } from "./vendor-vueuse-BxKIIsKg.js";
import { t as setTelemetryRegistry } from "./telemetry-IkzvF0TI.js";
import { t as isHostTelemetryEnabled } from "./hostTelemetryEnabled-BZ3GL1Cu.js";
import { n as TelemetryEvents, t as CANCELLATION_STAGE_EVENTS } from "./types-ColLjFnz.js";
//#region packages/account-core/src/core/billing/telemetry/billingTelemetryEvent.ts
function getBillingTelemetryEventName(event) {
	return `billing.${event.operation}.${event.stage}`;
}
//#endregion
//#region packages/account-core/src/core/billing/telemetry/payload.ts
var BILLING_PAYLOAD_FIELD_HANDLING = {
	checkout_status: "required",
	control: "required",
	correlation_id: "required",
	destination: "required",
	failure_category: "required",
	has_plan: "required",
	intent: "required",
	member_removal_count: "required",
	member_removal_failures: "required",
	mode: "required",
	navigation: "required",
	operation_type: "required",
	origin: "required",
	product: "required",
	reason: "required",
	result: "required",
	source: "required",
	step: "required",
	target: "required",
	to: "required",
	amount_cents: "optional",
	amount_preset: "optional",
	billing_client: "optional",
	billing_op_id: "optional",
	checkout_attempt_id: "optional",
	checkout_type: "optional",
	checkout_ui: "optional",
	current_tier: "optional",
	cycle: "optional",
	decline_reason: "optional",
	duration_ms: "optional",
	error_code: "optional",
	method_kind: "optional",
	payment_intent_source: "optional",
	presentation: "optional",
	recovery_outcome: "optional",
	resumed: "optional",
	target_tier: "optional",
	tier: "optional"
};
var OPTIONAL_BILLING_PAYLOAD_FIELDS = Object.entries(BILLING_PAYLOAD_FIELD_HANDLING).flatMap(([field, handling]) => handling === "optional" ? [field] : []);
var REQUIRED_BILLING_PAYLOAD_FIELDS = Object.entries(BILLING_PAYLOAD_FIELD_HANDLING).flatMap(([field, handling]) => handling === "required" ? [field] : []);
var optionalBillingPayloadFields = new Set(OPTIONAL_BILLING_PAYLOAD_FIELDS);
var requiredBillingPayloadFields = new Set(REQUIRED_BILLING_PAYLOAD_FIELDS);
function getBillingTelemetryEventPayload(event) {
	const payload = {
		operation: event.operation,
		stage: event.stage,
		outcome: event.outcome
	};
	for (const [field, value] of Object.entries(event)) if (requiredBillingPayloadFields.has(field)) payload[field] = value;
	else if (optionalBillingPayloadFields.has(field) && value !== void 0) payload[field] = value;
	return payload;
}
//#endregion
//#region src/platform/telemetry/TelemetryRegistry.ts
/**
* Registry that holds multiple telemetry providers and dispatches
* all tracking calls to each registered provider.
*
* Implements TelemetryDispatcher (all methods required) while dispatching
* to TelemetryProvider instances using optional chaining since providers
* only implement the methods they care about.
*/
var TelemetryRegistry = class {
	providers = [];
	registerProvider(provider) {
		this.providers.push(provider);
	}
	dispatch(action) {
		this.providers.forEach((provider) => {
			try {
				action(provider);
			} catch (error) {
				console.error("[Telemetry] Provider dispatch failed", error);
			}
		});
	}
	trackSignupOpened() {
		this.dispatch((provider) => provider.trackSignupOpened?.());
	}
	trackAuth(metadata) {
		this.dispatch((provider) => provider.trackAuth?.(metadata));
	}
	trackAuthFailed(metadata) {
		this.dispatch((provider) => provider.trackAuthFailed?.(metadata));
	}
	trackUnifiedAuthRetry(metadata) {
		this.dispatch((provider) => provider.trackUnifiedAuthRetry?.(metadata));
	}
	trackUnifiedAuthRefresh(metadata) {
		this.dispatch((provider) => provider.trackUnifiedAuthRefresh?.(metadata));
	}
	trackWebSessionEvent(event) {
		this.dispatch((provider) => provider.trackWebSessionEvent?.(event));
	}
	trackImageLoadFailed(metadata) {
		this.dispatch((provider) => provider.trackImageLoadFailed?.(metadata));
	}
	trackBootstrapComplete(metadata) {
		this.dispatch((provider) => provider.trackBootstrapComplete?.(metadata));
	}
	trackFeatureFlagEvaluation(key, value) {
		this.dispatch((provider) => provider.trackFeatureFlagEvaluation?.(key, value));
	}
	trackUserLoggedIn() {
		this.dispatch((provider) => provider.trackUserLoggedIn?.());
	}
	trackSubscription(event, metadata) {
		this.dispatch((provider) => provider.trackSubscription?.(event, metadata));
	}
	trackBeginCheckout(metadata) {
		this.dispatch((provider) => provider.trackBeginCheckout?.(metadata));
	}
	trackMonthlySubscriptionSucceeded(metadata) {
		this.dispatch((provider) => provider.trackMonthlySubscriptionSucceeded?.(metadata));
	}
	trackMonthlySubscriptionCancelled() {
		this.dispatch((provider) => provider.trackMonthlySubscriptionCancelled?.());
	}
	trackSubscriptionCancellation(event, metadata) {
		this.dispatch((provider) => provider.trackSubscriptionCancellation?.(event, metadata));
	}
	trackResubscribeClicked(metadata) {
		this.dispatch((provider) => provider.trackResubscribeClicked?.(metadata));
	}
	trackAddApiCreditButtonClicked(metadata) {
		this.dispatch((provider) => provider.trackAddApiCreditButtonClicked?.(metadata));
	}
	trackApiCreditTopupButtonPurchaseClicked(amount) {
		this.dispatch((provider) => provider.trackApiCreditTopupButtonPurchaseClicked?.(amount));
	}
	trackApiCreditTopupSucceeded() {
		this.dispatch((provider) => provider.trackApiCreditTopupSucceeded?.());
	}
	trackWorkspaceInviteSent(metadata) {
		this.dispatch((provider) => provider.trackWorkspaceInviteSent?.(metadata));
	}
	trackWorkspaceInviteFailed(metadata) {
		this.dispatch((provider) => provider.trackWorkspaceInviteFailed?.(metadata));
	}
	trackBillingEvent(event) {
		this.dispatch((provider) => provider.trackBillingEvent?.(event));
	}
	trackCheckoutJourneyEvent(event) {
		this.dispatch((provider) => provider.trackCheckoutJourneyEvent?.(event));
	}
	trackAgentPaywallShown(metadata) {
		this.dispatch((provider) => provider.trackAgentPaywallShown?.(metadata));
	}
	trackAgentPaywallCtaClicked(metadata) {
		this.dispatch((provider) => provider.trackAgentPaywallCtaClicked?.(metadata));
	}
	trackRunButton(properties) {
		this.dispatch((provider) => provider.trackRunButton?.(properties));
	}
	trackSurvey(stage, responses) {
		this.dispatch((provider) => provider.trackSurvey?.(stage, responses));
	}
	trackOnboardingTour(stage, metadata) {
		this.dispatch((provider) => {
			provider.trackOnboardingTour?.call(provider, stage, metadata);
		});
	}
	trackEmailVerification(stage) {
		this.dispatch((provider) => provider.trackEmailVerification?.(stage));
	}
	trackTemplate(metadata) {
		this.dispatch((provider) => provider.trackTemplate?.(metadata));
	}
	trackTemplateLibraryOpened(metadata) {
		this.dispatch((provider) => provider.trackTemplateLibraryOpened?.(metadata));
	}
	trackTemplateLibraryClosed(metadata) {
		this.dispatch((provider) => provider.trackTemplateLibraryClosed?.(metadata));
	}
	trackWorkflowImported(metadata) {
		this.dispatch((provider) => provider.trackWorkflowImported?.(metadata));
	}
	trackWorkflowOpened(metadata) {
		this.dispatch((provider) => provider.trackWorkflowOpened?.(metadata));
	}
	trackWorkflowSaved(metadata) {
		this.dispatch((provider) => provider.trackWorkflowSaved?.(metadata));
	}
	trackDefaultViewSet(metadata) {
		this.dispatch((provider) => provider.trackDefaultViewSet?.(metadata));
	}
	trackEnterLinear(metadata) {
		this.dispatch((provider) => provider.trackEnterLinear?.(metadata));
	}
	trackShareFlow(metadata) {
		this.dispatch((provider) => provider.trackShareFlow?.(metadata));
	}
	trackShareLinkOpened(metadata) {
		this.dispatch((provider) => provider.trackShareLinkOpened?.(metadata));
	}
	trackPageVisibilityChanged(metadata) {
		this.dispatch((provider) => provider.trackPageVisibilityChanged?.(metadata));
	}
	trackTabCount(metadata) {
		this.dispatch((provider) => provider.trackTabCount?.(metadata));
	}
	trackShellLayout(metadata) {
		this.dispatch((provider) => provider.trackShellLayout?.(metadata));
	}
	trackNodeSearch(metadata) {
		this.dispatch((provider) => provider.trackNodeSearch?.(metadata));
	}
	trackNodeSearchResultSelected(metadata) {
		this.dispatch((provider) => provider.trackNodeSearchResultSelected?.(metadata));
	}
	trackSearchQuery(metadata) {
		this.dispatch((provider) => provider.trackSearchQuery?.(metadata));
	}
	trackNodeAdded(metadata) {
		this.dispatch((provider) => provider.trackNodeAdded?.(metadata));
	}
	trackTemplateFilterChanged(metadata) {
		this.dispatch((provider) => provider.trackTemplateFilterChanged?.(metadata));
	}
	trackHelpCenterOpened(metadata) {
		this.dispatch((provider) => provider.trackHelpCenterOpened?.(metadata));
	}
	trackHelpResourceClicked(metadata) {
		this.dispatch((provider) => provider.trackHelpResourceClicked?.(metadata));
	}
	trackHelpCenterClosed(metadata) {
		this.dispatch((provider) => provider.trackHelpCenterClosed?.(metadata));
	}
	trackWorkflowCreated(metadata) {
		this.dispatch((provider) => provider.trackWorkflowCreated?.(metadata));
	}
	trackWorkflowExecution() {
		this.dispatch((provider) => provider.trackWorkflowExecution?.());
	}
	trackExecutionOutcome(metadata) {
		this.dispatch((provider) => provider.trackExecutionOutcome?.(metadata));
	}
	trackExecutionError(metadata) {
		this.dispatch((provider) => provider.trackExecutionError?.(metadata));
	}
	trackExecutionSuccess(metadata) {
		this.dispatch((provider) => provider.trackExecutionSuccess?.(metadata));
	}
	trackSharedWorkflowRun(metadata) {
		this.dispatch((provider) => provider.trackSharedWorkflowRun?.(metadata));
	}
	trackSettingChanged(metadata) {
		this.dispatch((provider) => provider.trackSettingChanged?.(metadata));
	}
	trackUiButtonClicked(metadata) {
		this.dispatch((provider) => provider.trackUiButtonClicked?.(metadata));
	}
	trackAgentMessageFeedback(metadata) {
		this.dispatch((provider) => provider.trackAgentMessageFeedback?.(metadata));
	}
	trackAgentPanelOpened(metadata) {
		this.dispatch((provider) => provider.trackAgentPanelOpened?.(metadata));
	}
	trackAgentPanelClosed(metadata) {
		this.dispatch((provider) => provider.trackAgentPanelClosed?.(metadata));
	}
	trackAgentEntryButtonClicked(metadata) {
		this.dispatch((provider) => provider.trackAgentEntryButtonClicked?.(metadata));
	}
	trackAgentCloseButtonClicked() {
		this.dispatch((provider) => provider.trackAgentCloseButtonClicked?.());
	}
	trackAgentConsentShown(metadata) {
		this.dispatch((provider) => provider.trackAgentConsentShown?.(metadata));
	}
	trackAgentConsentResolved(metadata) {
		this.dispatch((provider) => provider.trackAgentConsentResolved?.(metadata));
	}
	trackAgentOnboardingShown() {
		this.dispatch((provider) => provider.trackAgentOnboardingShown?.());
	}
	trackAgentOnboardingStep(metadata) {
		this.dispatch((provider) => provider.trackAgentOnboardingStep?.(metadata));
	}
	trackAgentMessageSent(metadata) {
		this.dispatch((provider) => provider.trackAgentMessageSent?.(metadata));
	}
	trackAgentStarterPromptClicked(metadata) {
		this.dispatch((provider) => provider.trackAgentStarterPromptClicked?.(metadata));
	}
	trackAgentFreeUseNotice(metadata) {
		this.dispatch((provider) => provider.trackAgentFreeUseNotice?.(metadata));
	}
	trackAgentFreeUseExposure(metadata) {
		this.dispatch((provider) => provider.trackAgentFreeUseExposure?.(metadata));
	}
	trackAgentNodeTagged(metadata) {
		this.dispatch((provider) => provider.trackAgentNodeTagged?.(metadata));
	}
	trackAgentAttachButtonClicked(metadata) {
		this.dispatch((provider) => provider.trackAgentAttachButtonClicked?.(metadata));
	}
	trackAgentWorkflowApplied(metadata) {
		this.dispatch((provider) => provider.trackAgentWorkflowApplied?.(metadata));
	}
	trackAgentError(metadata) {
		this.dispatch((provider) => provider.trackAgentError?.(metadata));
	}
	trackAgentStopClicked(metadata) {
		this.dispatch((provider) => provider.trackAgentStopClicked?.(metadata));
	}
	trackAgentWorkflowBound(metadata) {
		this.dispatch((provider) => provider.trackAgentWorkflowBound?.(metadata));
	}
	trackAgentRunApprovalShown(metadata) {
		this.dispatch((provider) => provider.trackAgentRunApprovalShown?.(metadata));
	}
	trackAgentRunApprovalResolved(metadata) {
		this.dispatch((provider) => provider.trackAgentRunApprovalResolved?.(metadata));
	}
	trackAgentRunModeChanged(metadata) {
		this.dispatch((provider) => provider.trackAgentRunModeChanged?.(metadata));
	}
	trackAgentThreadStarted(metadata) {
		this.dispatch((provider) => provider.trackAgentThreadStarted?.(metadata));
	}
	trackAgentConsentNotOffered(metadata) {
		this.dispatch((provider) => provider.trackAgentConsentNotOffered?.(metadata));
	}
	trackAgentConsentOfferExited(metadata) {
		this.dispatch((provider) => provider.trackAgentConsentOfferExited?.(metadata));
	}
	trackAgentOnboardingNotShown(metadata) {
		this.dispatch((provider) => provider.trackAgentOnboardingNotShown?.(metadata));
	}
	trackWidgetFavoriteToggled(metadata) {
		this.dispatch((provider) => provider.trackWidgetFavoriteToggled?.(metadata));
	}
	trackNamedValuesShadowDiffMismatch(metadata) {
		this.dispatch((provider) => provider.trackNamedValuesShadowDiffMismatch?.(metadata));
	}
	trackNamedValuesShadowDiffSummary(metadata) {
		this.dispatch((provider) => provider.trackNamedValuesShadowDiffSummary?.(metadata));
	}
	trackLinkDedupDrop(metadata) {
		this.dispatch((provider) => provider.trackLinkDedupDrop?.(metadata));
	}
	trackPageView(pageName, properties) {
		this.dispatch((provider) => provider.trackPageView?.(pageName, properties));
	}
	trackFetchTimeout(metadata) {
		this.dispatch((provider) => provider.trackFetchTimeout?.(metadata));
	}
};
//#endregion
//#region src/platform/telemetry/utils/surveyNormalization.ts
/**
* Survey Response Normalization Utilities
*
* Smart categorization system to normalize free-text survey responses
* into standardized categories for better analytics breakdowns.
* Uses Fuse.js for fuzzy matching against category keywords.
*/
/**
* Industry category mappings based on ~9,000 user analysis
*/
var INDUSTRY_CATEGORIES = [
	{
		name: "Film / TV / Animation",
		userCount: 2885,
		keywords: [
			"film",
			"tv",
			"television",
			"animation",
			"animation studio",
			"tv production",
			"film production",
			"story",
			"anime",
			"video",
			"cinematography",
			"visual effects",
			"vfx",
			"vfx artist",
			"movie",
			"cinema",
			"documentary",
			"documentary filmmaker",
			"broadcast",
			"streaming",
			"production",
			"director",
			"filmmaker",
			"post-production",
			"editing"
		]
	},
	{
		name: "Marketing / Advertising / Social Media",
		userCount: 1340,
		keywords: [
			"marketing",
			"advertising",
			"youtube",
			"tiktok",
			"social media",
			"content creation",
			"influencer",
			"brand",
			"promotion",
			"digital marketing",
			"seo",
			"campaigns",
			"copywriting",
			"growth",
			"engagement"
		]
	},
	{
		name: "Software / IT / AI",
		userCount: 1100,
		keywords: [
			"software",
			"software development",
			"software engineer",
			"it",
			"ai",
			"ai research",
			"corporate ai research",
			"ai research lab",
			"tech company ai research",
			"developer",
			"app developer",
			"consulting",
			"tech",
			"tech startup",
			"programmer",
			"data science",
			"machine learning",
			"coding",
			"programming",
			"web development",
			"app development",
			"saas"
		]
	},
	{
		name: "Product & Industrial Design",
		userCount: 1050,
		keywords: [
			"product design",
			"industrial",
			"manufacturing",
			"3d rendering",
			"product visualization",
			"mechanical",
			"automotive",
			"cad",
			"prototype",
			"design engineering",
			"invention"
		]
	},
	{
		name: "Fine Art / Contemporary Art",
		userCount: 780,
		keywords: [
			"fine art",
			"art",
			"illustration",
			"contemporary",
			"artist",
			"painting",
			"drawing",
			"sculpture",
			"gallery",
			"canvas",
			"digital art",
			"mixed media",
			"abstract",
			"portrait"
		]
	},
	{
		name: "Education / Research",
		userCount: 640,
		keywords: [
			"education",
			"student",
			"teacher",
			"research",
			"university research",
			"academic ai research",
			"university ai research",
			"ai research at university",
			"learning",
			"university",
			"school",
			"academic",
			"professor",
			"curriculum",
			"training",
			"instruction",
			"pedagogy"
		]
	},
	{
		name: "Architecture / Engineering / Construction",
		userCount: 420,
		keywords: [
			"architecture",
			"architecture firm",
			"construction",
			"engineering",
			"civil",
			"civil engineering",
			"cad",
			"building",
			"structural",
			"landscape",
			"landscape architecture",
			"interior design",
			"real estate",
			"planning",
			"blueprints"
		]
	},
	{
		name: "Gaming / Interactive Media",
		userCount: 410,
		keywords: [
			"gaming",
			"game dev",
			"game development",
			"indie game studio",
			"vr development",
			"roblox",
			"interactive",
			"interactive media",
			"virtual world",
			"vr",
			"ar",
			"metaverse",
			"simulation",
			"unity",
			"unity developer",
			"unreal",
			"indie games"
		]
	},
	{
		name: "Photography / Videography",
		userCount: 70,
		keywords: [
			"photography",
			"photo",
			"videography",
			"camera",
			"image",
			"portrait",
			"wedding",
			"commercial photo",
			"stock photography",
			"photojournalism",
			"event photography"
		]
	},
	{
		name: "Fashion / Beauty / Retail",
		userCount: 25,
		keywords: [
			"fashion",
			"fashion design",
			"beauty",
			"beauty industry",
			"jewelry",
			"jewelry design",
			"custom jewelry design",
			"retail",
			"retail store",
			"style",
			"clothing",
			"cosmetics",
			"makeup",
			"accessories",
			"boutique"
		]
	},
	{
		name: "Music / Performing Arts",
		userCount: 25,
		keywords: [
			"music",
			"music production",
			"vj",
			"dance",
			"projection mapping",
			"audio visual",
			"concert",
			"concert production",
			"performance",
			"theater",
			"stage",
			"live events"
		]
	},
	{
		name: "Healthcare / Medical / Life Science",
		userCount: 30,
		keywords: [
			"healthcare",
			"medical",
			"medical research",
			"doctor",
			"biotech",
			"life science",
			"pharmaceutical",
			"clinical",
			"clinical research",
			"hospital",
			"medicine",
			"health"
		]
	},
	{
		name: "E-commerce / Print-on-Demand / Business",
		userCount: 15,
		keywords: [
			"ecommerce",
			"e-commerce",
			"print on demand",
			"shop",
			"business",
			"commercial",
			"startup",
			"entrepreneur",
			"sales",
			"online store"
		]
	},
	{
		name: "Nonprofit / Government / Public Sector",
		userCount: 15,
		keywords: [
			"501c3",
			"ngo",
			"government",
			"public service",
			"policy",
			"nonprofit",
			"charity",
			"civic",
			"community",
			"social impact"
		]
	},
	{
		name: "Adult / NSFW",
		userCount: 10,
		keywords: [
			"nsfw",
			"nsfw content",
			"adult",
			"adult entertainment",
			"erotic",
			"explicit",
			"xxx",
			"porn"
		]
	}
];
/**
* Use case category mappings based on common patterns
*/
var USE_CASE_CATEGORIES = [
	{
		name: "Content Creation & Marketing",
		keywords: [
			"content creation",
			"social media",
			"marketing",
			"marketing campaigns",
			"advertising",
			"youtube",
			"youtube thumbnail",
			"youtube thumbnail generation",
			"tiktok",
			"instagram",
			"thumbnails",
			"posts",
			"campaigns",
			"brand content"
		]
	},
	{
		name: "Art & Illustration",
		keywords: [
			"art",
			"illustration",
			"drawing",
			"painting",
			"concept art",
			"creating concept art",
			"character design",
			"digital art",
			"fantasy art",
			"portraits"
		]
	},
	{
		name: "Product Visualization & Design",
		keywords: [
			"product",
			"product mockup",
			"product mockup creation",
			"visualization",
			"prototype visualization",
			"design",
			"prototype",
			"mockup",
			"3d rendering",
			"industrial design",
			"product photos"
		]
	},
	{
		name: "Film & Video Production",
		keywords: [
			"film",
			"video",
			"video editing",
			"movie",
			"movie production",
			"animation",
			"vfx",
			"visual effects",
			"storyboard",
			"storyboard creation",
			"cinematography",
			"post production"
		]
	},
	{
		name: "Gaming & Interactive Media",
		keywords: [
			"game",
			"gaming",
			"game asset generation",
			"game assets",
			"game development",
			"game textures",
			"interactive",
			"vr",
			"vr content creation",
			"ar",
			"virtual",
			"simulation",
			"metaverse",
			"textures"
		]
	},
	{
		name: "Architecture & Construction",
		keywords: [
			"architecture",
			"architectural rendering",
			"building",
			"building visualization",
			"construction",
			"interior design",
			"interior design mockups",
			"landscape",
			"real estate",
			"real estate visualization",
			"floor plans",
			"renderings"
		]
	},
	{
		name: "Education & Training",
		keywords: [
			"education",
			"educational",
			"educational content",
			"training",
			"training materials",
			"learning",
			"teaching",
			"tutorial",
			"tutorial creation",
			"course",
			"academic",
			"academic projects",
			"instructional",
			"workshops"
		]
	},
	{
		name: "Research & Development",
		keywords: [
			"research",
			"research experiments",
			"development",
			"experiment",
			"prototype",
			"prototype testing",
			"testing",
			"analysis",
			"study",
			"innovation",
			"innovation projects",
			"r&d",
			"scientific visualization"
		]
	},
	{
		name: "Personal & Hobby",
		keywords: [
			"personal",
			"personal art projects",
			"hobby",
			"hobby work",
			"fun",
			"fun experiments",
			"experiment",
			"learning",
			"curiosity",
			"explore",
			"creative",
			"creative exploration",
			"side project"
		]
	},
	{
		name: "Photography & Image Processing",
		keywords: [
			"photography",
			"product photography",
			"portrait photography",
			"photo",
			"photo editing",
			"image",
			"image enhancement",
			"portrait",
			"editing",
			"enhancement",
			"restoration",
			"photo manipulation"
		]
	}
];
/**
* Fuse.js configuration for category matching
*/
var FUSE_OPTIONS = {
	keys: ["keywords"],
	threshold: .53,
	minMatchCharLength: 5,
	includeScore: true,
	includeMatches: true,
	ignoreLocation: true,
	findAllMatches: true
};
/**
* Create Fuse instances for category matching
*/
var industryFuse = new Fuse(INDUSTRY_CATEGORIES, FUSE_OPTIONS);
var useCaseFuse = new Fuse(USE_CASE_CATEGORIES, FUSE_OPTIONS);
/**
* Normalize industry responses using Fuse.js fuzzy search
*/
function normalizeIndustry(rawIndustry) {
	if (!rawIndustry || typeof rawIndustry !== "string") return "Other / Undefined";
	if (rawIndustry.toLowerCase().trim().match(/^(other|none|undefined|unknown|n\/a|not applicable|-|)$/)) return "Other / Undefined";
	const results = industryFuse.search(rawIndustry);
	if (results.length > 0) return results[0].item.name;
	return `Uncategorized: ${rawIndustry}`;
}
/**
* Normalize use case responses using Fuse.js fuzzy search
*/
function normalizeUseCase(rawUseCase) {
	if (!rawUseCase || typeof rawUseCase !== "string") return "Other / Undefined";
	if (rawUseCase.toLowerCase().trim().match(/^(other|none|undefined|unknown|n\/a|not applicable|-|)$/)) return "Other / Undefined";
	const results = useCaseFuse.search(rawUseCase);
	if (results.length > 0) return results[0].item.name;
	return `Uncategorized: ${rawUseCase}`;
}
/**
* Apply normalization to survey responses
* Creates both normalized and raw versions of responses
*/
function normalizeSurveyResponses(responses) {
	const normalized = { ...responses };
	if (typeof responses.industry === "string") {
		normalized.industry_normalized = normalizeIndustry(responses.industry);
		normalized.industry_raw = responses.industry;
	}
	if (typeof responses.useCase === "string") {
		normalized.useCase_normalized = normalizeUseCase(responses.useCase);
		normalized.useCase_raw = responses.useCase;
	}
	return normalized;
}
//#endregion
//#region src/platform/telemetry/providers/host/HostTelemetrySink.ts
function isHostTelemetryPrimitive(value) {
	return value === null || typeof value === "string" || typeof value === "number" || typeof value === "boolean";
}
function toHostTelemetryProperties(properties) {
	if (!properties) return void 0;
	const out = {};
	for (const [key, value] of Object.entries(properties)) if (isHostTelemetryPrimitive(value)) out[key] = value;
	else if (Array.isArray(value) && value.every(isHostTelemetryPrimitive)) out[key] = value;
	return out;
}
var HostTelemetrySink = class {
	capture(event, properties) {
		window.__comfyDesktop2?.Telemetry?.capture(event, toHostTelemetryProperties(properties));
	}
	trackSignupOpened() {
		this.capture(TelemetryEvents.USER_SIGN_UP_OPENED);
	}
	trackAuth(metadata) {
		this.capture(TelemetryEvents.USER_AUTH_COMPLETED, metadata);
	}
	trackUserLoggedIn() {
		this.capture(TelemetryEvents.USER_LOGGED_IN);
	}
	trackSubscription(event, metadata) {
		this.capture(event === "modal_opened" ? TelemetryEvents.SUBSCRIPTION_REQUIRED_MODAL_OPENED : TelemetryEvents.SUBSCRIBE_NOW_BUTTON_CLICKED, metadata);
	}
	trackBeginCheckout(metadata) {
		this.capture(TelemetryEvents.BEGIN_CHECKOUT, metadata);
	}
	trackBillingEvent(event) {
		this.capture(getBillingTelemetryEventName(event), getBillingTelemetryEventPayload(event));
	}
	trackMonthlySubscriptionSucceeded(metadata) {
		this.capture(TelemetryEvents.MONTHLY_SUBSCRIPTION_SUCCEEDED, metadata);
	}
	trackMonthlySubscriptionCancelled() {
		this.capture(TelemetryEvents.MONTHLY_SUBSCRIPTION_CANCELLED);
	}
	trackSubscriptionCancellation(event, metadata) {
		this.capture(CANCELLATION_STAGE_EVENTS[event], metadata);
	}
	trackResubscribeClicked(metadata) {
		this.capture(TelemetryEvents.RESUBSCRIBE_BUTTON_CLICKED, metadata);
	}
	trackAddApiCreditButtonClicked(metadata) {
		this.capture(TelemetryEvents.ADD_API_CREDIT_BUTTON_CLICKED, metadata);
	}
	trackAgentPaywallShown(metadata) {
		this.capture(TelemetryEvents.AGENT_PAYWALL_SHOWN, metadata);
	}
	trackAgentPaywallCtaClicked(metadata) {
		this.capture(TelemetryEvents.AGENT_PAYWALL_CTA_CLICKED, metadata);
	}
	trackApiCreditTopupButtonPurchaseClicked(amount) {
		this.capture(TelemetryEvents.API_CREDIT_TOPUP_BUTTON_PURCHASE_CLICKED, { credit_amount: amount });
	}
	trackApiCreditTopupSucceeded() {
		this.capture(TelemetryEvents.API_CREDIT_TOPUP_SUCCEEDED);
	}
	trackRunButton(properties) {
		this.capture(TelemetryEvents.RUN_BUTTON_CLICKED, properties);
	}
	trackSurvey(stage, responses) {
		this.capture(stage === "opened" ? TelemetryEvents.USER_SURVEY_OPENED : TelemetryEvents.USER_SURVEY_SUBMITTED, responses ? normalizeSurveyResponses(responses) : void 0);
	}
	trackEmailVerification(stage) {
		const event = stage === "opened" ? TelemetryEvents.USER_EMAIL_VERIFY_OPENED : stage === "requested" ? TelemetryEvents.USER_EMAIL_VERIFY_REQUESTED : TelemetryEvents.USER_EMAIL_VERIFY_COMPLETED;
		this.capture(event);
	}
	trackTemplate(metadata) {
		this.capture(TelemetryEvents.TEMPLATE_WORKFLOW_OPENED, metadata);
	}
	trackTemplateLibraryOpened(metadata) {
		this.capture(TelemetryEvents.TEMPLATE_LIBRARY_OPENED, metadata);
	}
	trackTemplateLibraryClosed(metadata) {
		this.capture(TelemetryEvents.TEMPLATE_LIBRARY_CLOSED, metadata);
	}
	trackWorkflowImported(metadata) {
		this.capture(TelemetryEvents.WORKFLOW_IMPORTED, metadata);
	}
	trackWorkflowOpened(metadata) {
		this.capture(TelemetryEvents.WORKFLOW_OPENED, metadata);
	}
	trackWorkflowSaved(metadata) {
		this.capture(TelemetryEvents.WORKFLOW_SAVED, metadata);
	}
	trackDefaultViewSet(metadata) {
		this.capture(TelemetryEvents.DEFAULT_VIEW_SET, metadata);
	}
	trackEnterLinear(metadata) {
		this.capture(TelemetryEvents.ENTER_LINEAR_MODE, metadata);
	}
	trackShareFlow(metadata) {
		this.capture(TelemetryEvents.SHARE_FLOW, metadata);
	}
	trackShareLinkOpened(metadata) {
		this.capture(TelemetryEvents.SHARE_LINK_OPENED, metadata);
	}
	trackPageVisibilityChanged(metadata) {
		this.capture(TelemetryEvents.PAGE_VISIBILITY_CHANGED, metadata);
	}
	trackTabCount(metadata) {
		this.capture(TelemetryEvents.TAB_COUNT_TRACKING, metadata);
	}
	trackNodeSearch(metadata) {
		this.capture(TelemetryEvents.NODE_SEARCH, metadata);
	}
	trackNodeSearchResultSelected(metadata) {
		this.capture(TelemetryEvents.NODE_SEARCH_RESULT_SELECTED, metadata);
	}
	trackSearchQuery(metadata) {
		this.capture(TelemetryEvents.SEARCH_QUERY, metadata);
	}
	trackNodeAdded(metadata) {
		this.capture(TelemetryEvents.NODE_ADDED, metadata);
	}
	trackTemplateFilterChanged(metadata) {
		this.capture(TelemetryEvents.TEMPLATE_FILTER_CHANGED, metadata);
	}
	trackHelpCenterOpened(metadata) {
		this.capture(TelemetryEvents.HELP_CENTER_OPENED, metadata);
	}
	trackHelpResourceClicked(metadata) {
		this.capture(TelemetryEvents.HELP_RESOURCE_CLICKED, metadata);
	}
	trackHelpCenterClosed(metadata) {
		this.capture(TelemetryEvents.HELP_CENTER_CLOSED, metadata);
	}
	trackWorkflowCreated(metadata) {
		this.capture(TelemetryEvents.WORKFLOW_CREATED, metadata);
	}
	trackExecutionError(metadata) {
		this.capture(TelemetryEvents.EXECUTION_ERROR, metadata);
	}
	trackExecutionSuccess(metadata) {
		this.capture(TelemetryEvents.EXECUTION_SUCCESS, metadata);
	}
	trackSharedWorkflowRun(metadata) {
		this.capture(TelemetryEvents.SHARED_WORKFLOW_RUN, metadata);
	}
	trackSettingChanged(metadata) {
		this.capture(TelemetryEvents.SETTING_CHANGED, metadata);
	}
	trackUiButtonClicked(metadata) {
		this.capture(TelemetryEvents.UI_BUTTON_CLICKED, metadata);
	}
	trackAgentMessageFeedback(metadata) {
		this.capture(TelemetryEvents.AGENT_MESSAGE_FEEDBACK, metadata);
	}
	trackAgentPanelOpened(metadata) {
		this.capture(TelemetryEvents.AGENT_PANEL_OPENED, metadata);
	}
	trackAgentPanelClosed(metadata) {
		this.capture(TelemetryEvents.AGENT_PANEL_CLOSED, metadata);
	}
	trackAgentEntryButtonClicked(metadata) {
		this.capture(TelemetryEvents.AGENT_ENTRY_BUTTON_CLICKED, metadata);
	}
	trackAgentCloseButtonClicked() {
		this.capture(TelemetryEvents.AGENT_CLOSE_BUTTON_CLICKED);
	}
	trackAgentConsentShown(metadata) {
		this.capture(TelemetryEvents.AGENT_CONSENT_SHOWN, metadata);
	}
	trackAgentConsentResolved(metadata) {
		this.capture(TelemetryEvents.AGENT_CONSENT_RESOLVED, metadata);
	}
	trackAgentOnboardingShown() {
		this.capture(TelemetryEvents.AGENT_ONBOARDING_SHOWN);
	}
	trackAgentOnboardingStep(metadata) {
		this.capture(TelemetryEvents.AGENT_ONBOARDING_STEP, metadata);
	}
	trackAgentMessageSent(metadata) {
		this.capture(TelemetryEvents.AGENT_MESSAGE_SENT, metadata);
	}
	trackAgentStarterPromptClicked(metadata) {
		this.capture(TelemetryEvents.AGENT_STARTER_PROMPT_CLICKED, metadata);
	}
	trackAgentFreeUseNotice(metadata) {
		this.capture(TelemetryEvents.AGENT_FREE_USE_NOTICE, metadata);
	}
	trackAgentFreeUseExposure(metadata) {
		this.capture(TelemetryEvents.AGENT_FREE_USE_EXPOSURE, metadata);
	}
	trackAgentNodeTagged(metadata) {
		this.capture(TelemetryEvents.AGENT_NODE_TAGGED, metadata);
	}
	trackAgentAttachButtonClicked(metadata) {
		this.capture(TelemetryEvents.AGENT_ATTACH_BUTTON_CLICKED, metadata);
	}
	trackAgentWorkflowApplied(metadata) {
		this.capture(TelemetryEvents.AGENT_WORKFLOW_APPLIED, metadata);
	}
	trackAgentStopClicked(metadata) {
		this.capture(TelemetryEvents.AGENT_STOP_CLICKED, metadata);
	}
	trackAgentWorkflowBound(metadata) {
		this.capture(TelemetryEvents.AGENT_WORKFLOW_BOUND, metadata);
	}
	trackAgentRunApprovalShown(metadata) {
		this.capture(TelemetryEvents.AGENT_RUN_APPROVAL_SHOWN, metadata);
	}
	trackAgentRunApprovalResolved(metadata) {
		this.capture(TelemetryEvents.AGENT_RUN_APPROVAL_RESOLVED, metadata);
	}
	trackAgentRunModeChanged(metadata) {
		this.capture(TelemetryEvents.AGENT_RUN_MODE_CHANGED, metadata);
	}
	trackAgentThreadStarted(metadata) {
		this.capture(TelemetryEvents.AGENT_THREAD_STARTED, metadata);
	}
	trackAgentConsentNotOffered(metadata) {
		this.capture(TelemetryEvents.AGENT_CONSENT_NOT_OFFERED, metadata);
	}
	trackAgentConsentOfferExited(metadata) {
		this.capture(TelemetryEvents.AGENT_CONSENT_OFFER_EXITED, metadata);
	}
	trackAgentOnboardingNotShown(metadata) {
		this.capture(TelemetryEvents.AGENT_ONBOARDING_NOT_SHOWN, metadata);
	}
	trackLinkDedupDrop(metadata) {
		this.capture(TelemetryEvents.LINK_DEDUP_DROP, metadata);
	}
	trackNamedValuesShadowDiffMismatch(metadata) {
		this.capture(TelemetryEvents.NAMED_VALUES_SHADOW_DIFF_MISMATCH, metadata);
	}
	trackNamedValuesShadowDiffSummary(metadata) {
		this.capture(TelemetryEvents.NAMED_VALUES_SHADOW_DIFF_SUMMARY, metadata);
	}
	trackPageView(pageName, properties) {
		this.capture(TelemetryEvents.PAGE_VIEW, {
			page_name: pageName,
			...properties
		});
	}
};
//#endregion
//#region src/platform/telemetry/initHostTelemetry.ts
function initHostTelemetry() {
	if (!isHostTelemetryEnabled()) return;
	if (!window.__comfyDesktop2?.Telemetry) return;
	const registry = new TelemetryRegistry();
	registry.registerProvider(new HostTelemetrySink());
	setTelemetryRegistry(registry);
}
//#endregion
export { initHostTelemetry };
