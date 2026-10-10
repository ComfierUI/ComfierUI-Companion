import { C as unknownType, S as unionType, _ as objectType, b as stringType, c as booleanType, f as enumType, g as numberType, l as coerce, m as literalType, s as arrayType, w as voidType, x as tupleType, y as recordType } from "./vendor-zod-TMj9Wsdv.js";
//#region packages/ingest-types/src/zod.gen.ts
/**
* Subscription tier (uppercase to match comfy-api)
*/
var zSubscriptionTier = enumType([
	"FREE",
	"STANDARD",
	"CREATOR",
	"PRO",
	"FOUNDERS_EDITION",
	"TEAM",
	"ENTERPRISE"
]);
/**
* Workspace entity annotated with the requesting user's role.
*/
var zWorkspaceWithRole = objectType({
	created_at: stringType().datetime(),
	id: stringType(),
	joined_at: stringType().datetime(),
	name: stringType(),
	role: enumType(["owner", "member"]),
	subscription_tier: zSubscriptionTier.optional(),
	type: enumType(["personal", "team"])
});
/**
* Abbreviated workspace metadata used in list responses.
*/
var zWorkspaceSummary = objectType({
	id: stringType(),
	name: stringType(),
	type: enumType(["personal", "team"])
});
/**
* Metadata for a workspace-scoped API key (secret is never returned).
*/
var zWorkspaceApiKeyInfo = objectType({
	created_at: stringType().datetime(),
	description: stringType().max(5e3),
	expires_at: stringType().datetime().optional(),
	id: stringType().uuid(),
	key_prefix: stringType(),
	last_used_at: stringType().datetime().optional(),
	name: stringType(),
	revoked_at: stringType().datetime().optional(),
	user_id: stringType(),
	workspace_id: stringType()
});
objectType({
	created_at: stringType().datetime(),
	id: stringType(),
	name: stringType(),
	type: enumType(["personal", "team"])
});
objectType({
	created_at: stringType().datetime(),
	created_by: stringType(),
	id: stringType(),
	latest_version: numberType().int(),
	version: numberType().int()
});
objectType({
	created_at: stringType().datetime(),
	created_by: stringType(),
	dependency_asset_ids: arrayType(stringType()).optional(),
	id: stringType(),
	version: numberType().int(),
	workflow_json: recordType(unknownType())
});
objectType({
	default_view: enumType(["workflow", "app"]).optional(),
	description: stringType().max(2e3).optional(),
	forked_from_workflow_id: stringType().max(128).optional(),
	forked_from_workflow_version_id: stringType().max(128).optional(),
	name: stringType().max(255).optional()
});
/**
* Reference to the parent workflow from which this workflow was forked.
*/
var zWorkflowForkedFrom = objectType({
	workflow_id: stringType().optional(),
	workflow_version_id: stringType().optional()
});
/**
* Full workflow entity including metadata and version history.
*/
var zWorkflowResponse = objectType({
	created_at: stringType().datetime(),
	created_by: stringType(),
	default_view: enumType(["workflow", "app"]).optional(),
	description: stringType().optional(),
	forked_from: zWorkflowForkedFrom.optional(),
	id: stringType(),
	latest_version: numberType().int(),
	name: stringType().optional(),
	updated_at: stringType().datetime()
});
/**
* Lightweight asset reference used in workflow publishing payloads.
*/
var zAssetInfo = objectType({
	id: stringType(),
	in_library: booleanType(),
	model: booleanType(),
	name: stringType(),
	preview_url: stringType(),
	public: booleanType(),
	storage_url: stringType()
});
objectType({
	assets: arrayType(zAssetInfo),
	listed: booleanType(),
	publish_time: stringType().datetime().nullish(),
	share_id: stringType(),
	workflow_id: stringType()
});
/**
* Pagination metadata included in list responses. Supports both legacy
* offset/limit pagination and cursor-based pagination. When cursor-based
* pagination is used, `next_cursor` is the primary pagination token and
* `offset`/`total` may be zero.
*
*/
var zPaginationInfo = objectType({
	has_more: booleanType(),
	limit: numberType().int().gte(1),
	next_cursor: stringType().optional(),
	offset: numberType().int().gte(0),
	total: numberType().int().gte(0)
});
objectType({
	data: arrayType(zWorkflowResponse),
	pagination: zPaginationInfo
});
/**
* Response containing assets associated with a workflow.
*/
var zWorkflowApiAssetsResponse = objectType({ assets: arrayType(zAssetInfo) });
objectType({ workflow_api_json: recordType(unknownType()) });
/**
* The user a web session belongs to
*/
var zWebSessionUser = objectType({
	email: stringType(),
	email_verified: booleanType(),
	id: stringType(),
	name: stringType().optional(),
	sign_in_provider: stringType().optional()
});
/**
* The live web session and the user it belongs to
*/
var zWebSessionResponse = objectType({
	absolute_expires_at: stringType().datetime(),
	csrf_token: stringType(),
	expires_at: stringType().datetime(),
	has_personal_workspace: booleanType(),
	user: zWebSessionUser
});
/**
* Details of a single validation error encountered during asset operations.
*/
var zValidationError = objectType({
	code: stringType(),
	field: stringType(),
	message: stringType()
});
/**
* Result of validating a set of asset operations.
*/
var zValidationResult = objectType({
	errors: arrayType(zValidationError).optional(),
	is_valid: booleanType(),
	warnings: arrayType(zValidationError).optional()
});
objectType({
	id: stringType(),
	status: stringType()
});
objectType({
	modified: coerce.bigint().min(BigInt("-9223372036854775808"), { message: "Invalid value: Expected int64 to be >= -9223372036854775808" }).max(BigInt("9223372036854775807"), { message: "Invalid value: Expected int64 to be <= 9223372036854775807" }).optional(),
	path: stringType().optional(),
	size: numberType().int().optional()
});
/**
* Current remaining balance, mirroring /billing/balance. Every amount is CENTS of `currency`; the `*_micros` names are a misnomer kept for wire compatibility.
*/
var zUsageBalance = objectType({
	amount_cents: numberType().optional(),
	amount_micros: numberType().optional(),
	cloud_credit_balance_cents: numberType().optional(),
	cloud_credit_balance_micros: numberType().optional(),
	currency: stringType().optional(),
	prepaid_balance_cents: numberType().optional(),
	prepaid_balance_micros: numberType().optional()
});
/**
* Mixed units, deliberately. `spend_micros` here (and `cost_micros` on UsageBucket / UsageBreakdownRow) is genuinely MICROS -- 1/1,000,000 of the currency unit -- because it comes from Metronome's usage figures. The `balance` breakdown below is CENTS, and its `*_micros` names are a misnomer; use its `*_cents` fields.
*/
var zUsageSummary = objectType({
	balance: zUsageBalance.optional(),
	spend_micros: numberType()
});
/**
* Present, with empty groups, buckets and breakdown, when the requested grouping has no data source yet. Render as unavailable, not as zero spend.
*/
var zUsageNotAvailable = objectType({ reason: enumType(["no_attribution_source"]) });
var zUsageGroupLabel = objectType({
	display_name: stringType().optional(),
	key: stringType(),
	key_name: stringType().optional(),
	key_prefix: stringType().optional(),
	kind: enumType([
		"api_key",
		"session",
		"deployment"
	]).optional(),
	owner_display_name: stringType().optional(),
	owner_user_id: stringType().optional()
});
var zUsageBucket = objectType({
	cost_micros: numberType(),
	group_key: stringType(),
	period_end: stringType().datetime(),
	period_start: stringType().datetime()
});
var zUsageBreakdownRow = objectType({
	cost_micros: numberType(),
	group_key: stringType(),
	share: numberType()
});
objectType({
	breakdown: arrayType(zUsageBreakdownRow),
	buckets: arrayType(zUsageBucket),
	ending_before: stringType().datetime(),
	granularity: enumType([
		"hour",
		"day",
		"month"
	]),
	group_by: enumType([
		"model",
		"endpoint",
		"product",
		"product_line",
		"person",
		"source"
	]),
	group_labels: arrayType(zUsageGroupLabel).optional(),
	groups: arrayType(stringType()),
	not_available: zUsageNotAvailable.optional(),
	starting_on: stringType().datetime(),
	summary: zUsageSummary
});
objectType({
	expires_in: numberType().int(),
	upload_path: stringType()
});
objectType({ name: stringType().min(1).max(100).optional() });
objectType({
	default_view: enumType(["workflow", "app"]).optional(),
	description: stringType().optional(),
	name: stringType().optional()
});
objectType({
	name: stringType().min(1).max(255).optional(),
	secret_value: stringType().min(1).optional()
});
objectType({ role: enumType(["owner", "member"]) });
objectType({
	avatar_token: stringType().nullish(),
	description: stringType().optional(),
	display_name: stringType().optional(),
	website_urls: arrayType(stringType()).optional()
});
/**
* What a credit top-up of the requested amount would grant.
*/
var zTopupQuoteResponse = objectType({
	amount_cents: coerce.bigint().min(BigInt("-9223372036854775808"), { message: "Invalid value: Expected int64 to be >= -9223372036854775808" }).max(BigInt("9223372036854775807"), { message: "Invalid value: Expected int64 to be <= 9223372036854775807" }),
	credits: coerce.bigint().min(BigInt("-9223372036854775808"), { message: "Invalid value: Expected int64 to be >= -9223372036854775808" }).max(BigInt("9223372036854775807"), { message: "Invalid value: Expected int64 to be <= 9223372036854775807" }),
	expires_at: stringType().datetime()
});
/**
* One persisted tool call attached to an assistant message's content.tool_calls (services/agent/internal/persist.ToolCallSummary), so a chat reload can render the tool-call history a turn produced. Display data only — raw arguments/results are never projected here. Only terminal rows (status ok/error) are ever surfaced; a row a dead turn left in pending/running has no wire-status mapping and is dropped rather than shown as a perpetual-progress chip.
*/
var zToolCallSummary = objectType({
	duration_ms: numberType().int().optional(),
	error_code: stringType().optional(),
	finished_at: stringType().datetime().optional(),
	id: stringType(),
	started_at: stringType().datetime().optional(),
	status: enumType(["success", "error"]),
	tool_call_id: stringType(),
	tool_name: stringType()
});
/**
* Pre/post-discount price for a team credit stop, in cents.
*/
var zTeamCreditStopPrice = objectType({
	list_price_cents: coerce.bigint().min(BigInt("-9223372036854775808"), { message: "Invalid value: Expected int64 to be >= -9223372036854775808" }).max(BigInt("9223372036854775807"), { message: "Invalid value: Expected int64 to be <= 9223372036854775807" }),
	price_cents: coerce.bigint().min(BigInt("-9223372036854775808"), { message: "Invalid value: Expected int64 to be >= -9223372036854775808" }).max(BigInt("9223372036854775807"), { message: "Invalid value: Expected int64 to be <= 9223372036854775807" })
});
/**
* A selectable preset on the team pricing slider. Echoed on subscribe via
* team_credit_stop_id; the backend owns the resolved amounts. credits is a
* RAW monthly credit count (not cents). Save% is derived by the FE as
* (list_price_cents - price_cents) / list_price_cents.
*
*/
var zTeamCreditStop = objectType({
	credits: coerce.bigint().min(BigInt("-9223372036854775808"), { message: "Invalid value: Expected int64 to be >= -9223372036854775808" }).max(BigInt("9223372036854775807"), { message: "Invalid value: Expected int64 to be <= 9223372036854775807" }),
	id: stringType(),
	monthly: zTeamCreditStopPrice,
	yearly: zTeamCreditStopPrice
});
/**
* Credit-stop ladder for the pricing slider (BE-1254). Returned by GET /api/billing/plans for every workspace regardless of the caller's token or workspace type (the personal/team distinction was removed); omitted only when the catalog defines no stops.
*/
var zTeamCreditStops = objectType({
	default_stop_index: numberType().int(),
	stops: arrayType(zTeamCreditStop)
});
/**
* The team credit stop a workspace is currently subscribed to: the
* per-workspace slider choice recorded at subscribe time
* (workspace_subscriptions.team_credit_stop_id). Amounts are owned by the
* catalog, not the subscription row. Returned on GET /api/billing/status
* for per-credit Team plans (BE-1254).
*
*/
var zTeamCreditStopSummary = objectType({
	credits_monthly: coerce.bigint().min(BigInt("-9223372036854775808"), { message: "Invalid value: Expected int64 to be >= -9223372036854775808" }).max(BigInt("9223372036854775807"), { message: "Invalid value: Expected int64 to be <= 9223372036854775807" }),
	id: stringType(),
	stop_usd: coerce.bigint().min(BigInt("-9223372036854775808"), { message: "Invalid value: Expected int64 to be >= -9223372036854775808" }).max(BigInt("9223372036854775807"), { message: "Invalid value: Expected int64 to be <= 9223372036854775807" })
});
/**
* Task data for list views
*/
var zTaskEntry = objectType({
	completed_at: stringType().datetime().optional(),
	create_time: stringType().datetime(),
	id: stringType().uuid(),
	started_at: stringType().datetime().optional(),
	status: enumType([
		"created",
		"running",
		"completed",
		"failed",
		"cancelled"
	]),
	task_name: stringType()
});
objectType({
	pagination: zPaginationInfo,
	tasks: arrayType(zTaskEntry)
});
/**
* Full task details including payload and result
*/
var zTaskResponse = objectType({
	completed_at: stringType().datetime().optional(),
	create_time: stringType().datetime(),
	error_message: stringType().optional(),
	id: stringType().uuid(),
	idempotency_key: stringType(),
	payload: recordType(unknownType()),
	result: recordType(unknownType()).optional(),
	started_at: stringType().datetime().optional(),
	status: enumType([
		"created",
		"running",
		"completed",
		"failed",
		"cancelled"
	]),
	task_name: stringType(),
	update_time: stringType().datetime()
});
objectType({
	added: arrayType(stringType()).optional(),
	already_present: arrayType(stringType()).optional(),
	not_present: arrayType(stringType()).optional(),
	removed: arrayType(stringType()).optional(),
	total_tags: arrayType(stringType())
});
/**
* Metadata for a single tag that can be applied to assets.
*/
var zTagInfo = objectType({
	count: numberType().int(),
	name: stringType()
});
objectType({
	devices: arrayType(objectType({
		name: stringType(),
		type: stringType(),
		vram_free: numberType().optional(),
		vram_total: numberType().optional()
	})),
	system: objectType({
		argv: arrayType(stringType()),
		cloud_version: stringType().optional(),
		comfyui_frontend_version: stringType().optional(),
		comfyui_version: stringType(),
		deploy_environment: stringType().optional(),
		embedded_python: booleanType(),
		os: stringType(),
		python_version: stringType(),
		pytorch_version: stringType(),
		ram_free: numberType(),
		ram_total: numberType(),
		workflow_templates_version: stringType().optional()
	})
});
/**
* Billing period (uppercase to match comfy-api)
*/
var zSubscriptionDuration = enumType(["MONTHLY", "ANNUAL"]);
var zSubscriptionDiscount = objectType({
	amount_off_cents: coerce.bigint().min(BigInt("-9223372036854775808"), { message: "Invalid value: Expected int64 to be >= -9223372036854775808" }).max(BigInt("9223372036854775807"), { message: "Invalid value: Expected int64 to be <= 9223372036854775807" }).optional(),
	code: stringType(),
	duration: enumType([
		"once",
		"repeating",
		"forever"
	]).optional(),
	duration_in_months: coerce.bigint().min(BigInt("-9223372036854775808"), { message: "Invalid value: Expected int64 to be >= -9223372036854775808" }).max(BigInt("9223372036854775807"), { message: "Invalid value: Expected int64 to be <= 9223372036854775807" }).optional(),
	kind: enumType(["plan", "promotion"]),
	name: stringType().optional(),
	term: enumType([
		"this_payment",
		"first_month",
		"first_year",
		"months",
		"ongoing"
	]).optional()
});
/**
* Response after successfully subscribing to a billing plan.
*/
var zSubscribeResponse = objectType({
	billing_op_id: stringType(),
	effective_at: stringType().datetime().optional(),
	payment_method_url: stringType().optional(),
	status: enumType([
		"subscribed",
		"needs_payment_method",
		"pending_payment"
	])
});
/**
* Request body for subscribing a workspace to a billing plan.
*/
var zSubscribeRequest = objectType({
	billing_cycle: enumType(["monthly", "yearly"]).optional(),
	cancel_url: stringType().optional(),
	checkout_attempt_id: stringType().optional(),
	confirm_reactivation: booleanType().optional(),
	confirmation_token: stringType().optional(),
	idempotency_key: stringType().optional(),
	plan_slug: stringType(),
	promotion_code: stringType().optional(),
	proration_at: stringType().datetime().optional(),
	quote_id: stringType().optional(),
	quote_version: numberType().int().optional(),
	return_url: stringType().optional(),
	saved_payment_method_id: stringType().regex(/^pm_/).optional(),
	team_credit_stop_id: stringType().optional()
});
/**
* The last-changed timestamp every stored setting carries.
*/
var zGlobalSettingUpdatedAt = objectType({ updated_at: stringType().datetime() });
/**
* Consent to the in-app Agent panel. `true` is the only value that can be written — consent is revoked by DELETE, not by writing `false`, so the audit trail records a revocation rather than a value flip.
*/
var zAgentConsentSettingValue = objectType({
	key: enumType(["Comfy.AgentPanel.ConsentAccepted"]),
	value: literalType(true)
});
/**
* A stored AgentConsentSettingValue with its timestamp. Named apart from the write schema because codegen derives nested property type names from the schema name, and `AgentConsentSetting` would generate an `AgentConsentSettingValue` that collides with the write schema itself.
*/
var zStoredAgentConsentSetting = zAgentConsentSettingValue.and(zGlobalSettingUpdatedAt);
/**
* First rejected op in an abort-remainder batch.
*/
var zDocOpFailure = objectType({
	code: stringType(),
	index: numberType().int(),
	message: stringType(),
	op_id: stringType().max(128).optional()
});
var zDocOpsResultData = objectType({
	applied: arrayType(stringType()).optional(),
	code: stringType().optional(),
	failed: zDocOpFailure.optional(),
	message: stringType().optional(),
	ok: booleanType(),
	seq: coerce.bigint().min(BigInt("-9223372036854775808"), { message: "Invalid value: Expected int64 to be >= -9223372036854775808" }).max(BigInt("9223372036854775807"), { message: "Invalid value: Expected int64 to be <= 9223372036854775807" }).optional(),
	skipped: arrayType(stringType()).optional(),
	v: numberType().int().gte(1).lte(1),
	workflow_id: stringType().min(1).max(128)
});
/**
* Host acknowledgement for a doc_ops batch.
*/
var zDocOpsResultFrame = objectType({
	data: zDocOpsResultData,
	type: enumType(["doc_ops_result"])
});
var zDocResetData = objectType({
	actor: stringType().max(256).optional(),
	lineage_seq: coerce.bigint().min(BigInt("-9223372036854775808"), { message: "Invalid value: Expected int64 to be >= -9223372036854775808" }).max(BigInt("9223372036854775807"), { message: "Invalid value: Expected int64 to be <= 9223372036854775807" }),
	seq: coerce.bigint().min(BigInt("-9223372036854775808"), { message: "Invalid value: Expected int64 to be >= -9223372036854775808" }).max(BigInt("9223372036854775807"), { message: "Invalid value: Expected int64 to be <= 9223372036854775807" }),
	v: numberType().int().gte(1).lte(1),
	workflow_id: stringType().min(1).max(128)
});
/**
* Host-to-follower lineage break. The follower must resubscribe for fresh state.
*/
var zDocResetFrame = objectType({
	data: zDocResetData,
	type: enumType(["doc_reset"])
});
var zDocUpdateData = objectType({
	actor: stringType().max(256).optional(),
	lineage_seq: coerce.bigint().min(BigInt("-9223372036854775808"), { message: "Invalid value: Expected int64 to be >= -9223372036854775808" }).max(BigInt("9223372036854775807"), { message: "Invalid value: Expected int64 to be <= 9223372036854775807" }),
	op_ids: arrayType(stringType().min(1).max(128)).max(256).optional(),
	seq: coerce.bigint().min(BigInt("-9223372036854775808"), { message: "Invalid value: Expected int64 to be >= -9223372036854775808" }).max(BigInt("9223372036854775807"), { message: "Invalid value: Expected int64 to be <= 9223372036854775807" }),
	update_b64: stringType(),
	v: numberType().int().gte(1).lte(1),
	workflow_id: stringType().min(1).max(128)
});
/**
* Host-to-follower incremental Yjs document update.
*/
var zDocUpdateFrame = objectType({
	data: zDocUpdateData,
	type: enumType(["doc_update"])
});
unionType([
	zDocUpdateFrame,
	zDocResetFrame,
	zDocOpsResultFrame
]);
/**
* User secret metadata (the secret value itself is never returned after creation).
*/
var zSecretResponse = objectType({
	created_at: stringType().datetime(),
	credential_type: enumType(["api_key", "gcp_service_account"]).optional(),
	id: stringType().uuid(),
	last_used_at: stringType().datetime().optional(),
	name: stringType(),
	provider: stringType().optional(),
	updated_at: stringType().datetime()
});
/**
* One way a provider's credential can be entered. When a provider exposes more than one option, clients present a sub-selection; the selected option's credential_type is sent on CreateSecretRequest.
*/
var zCredentialOption = objectType({
	credential_type: enumType(["api_key", "gcp_service_account"]),
	input_type: enumType(["text", "json_file"]),
	label: stringType()
});
/**
* A provider the user may configure a secret for, with its display label and credential-entry options.
*/
var zSecretProvider = objectType({
	credential_options: arrayType(zCredentialOption).optional(),
	id: stringType(),
	label: stringType().optional()
});
objectType({ data: arrayType(zSecretProvider) });
objectType({ data: arrayType(zSecretResponse) });
/**
* A plan change persisted to take effect at a future billing boundary.
*/
var zScheduledPlanChange = objectType({
	effective_at: stringType().datetime(),
	plan_slug: stringType(),
	team_credit_stop: zTeamCreditStopSummary.nullable()
});
var zSavedPaymentMethod = objectType({
	brand: stringType().optional(),
	id: stringType().regex(/^pm_/),
	is_default: booleanType(),
	last4: stringType().regex(/^[0-9]{4}$/).optional(),
	type: stringType()
});
var zSsoDiscoverResponse = objectType({
	organization_name: stringType().optional(),
	sso: booleanType()
});
/**
* Response after signing out of all devices
*/
var zRevokeAllSessionsResponse = objectType({ revoked: numberType().int() });
objectType({
	billing_op_id: stringType(),
	status: enumType(["reverted", "pending"])
});
objectType({ idempotency_key: stringType().optional() });
/**
* Present only when the session's arm is an offer. Terms come from the server catalog.
*/
var zRetentionOffer = objectType({
	duration_in_months: numberType().int().lte(9007199254740991),
	id: stringType(),
	percent_off: numberType().int().lte(9007199254740991)
});
var zRetentionFlowSubscription = objectType({
	currency: stringType(),
	period_end: numberType().int().lte(9007199254740991),
	quantity: numberType().int().lte(9007199254740991),
	unit_amount: numberType().int().lte(9007199254740991)
});
objectType({
	experiment_variant: stringType().optional(),
	expires_at: numberType().int().lte(9007199254740991),
	offer: zRetentionOffer.optional(),
	session_id: stringType().uuid(),
	subscription: zRetentionFlowSubscription
});
objectType({
	event: enumType(["flow_opened", "offer_shown"]),
	session_id: stringType().uuid()
});
objectType({
	billing_op_id: stringType(),
	status: enumType(["pending", "succeeded"])
});
objectType({ session_id: stringType().uuid() });
/**
* Response after accepting a resubscribe request.
*/
var zResubscribeResponse = objectType({
	billing_op_id: stringType(),
	message: stringType().optional(),
	status: enumType(["active", "pending"])
});
objectType({ idempotency_key: stringType().optional() });
/**
* The newest open renewal invoice of the workspace's Stripe subscription (active, or canceled but not yet ended). Returned only to workspace owners on the stripe billing rail while billing_status is payment_failed or paused, or on the legacy_stripe billing rail while billing_status is payment_failed and its legacy subscription is past_due or unpaid, and not while a payment for it is processing. hosted_invoice_url is a bearer payment link.
*/
var zRenewalInvoice = objectType({
	amount_due: coerce.bigint().min(BigInt("-9223372036854775808"), { message: "Invalid value: Expected int64 to be >= -9223372036854775808" }).max(BigInt("9223372036854775807"), { message: "Invalid value: Expected int64 to be <= 9223372036854775807" }),
	currency: stringType(),
	hosted_invoice_url: stringType(),
	next_payment_attempt: stringType().datetime().optional()
});
objectType({
	cleared: booleanType().optional(),
	deleted: arrayType(stringType()).optional()
});
objectType({
	clear: booleanType().optional(),
	delete: arrayType(stringType()).optional()
});
objectType({
	queue_pending: arrayType(tupleType([
		unknownType(),
		unknownType(),
		unknownType(),
		unknownType(),
		unknownType()
	])).optional(),
	queue_running: arrayType(tupleType([
		unknownType(),
		unknownType(),
		unknownType(),
		unknownType(),
		unknownType()
	])).optional()
});
objectType({
	assets: arrayType(zAssetInfo),
	listed: booleanType(),
	name: stringType(),
	publish_time: stringType().datetime().nullish(),
	share_id: stringType(),
	workflow_id: stringType(),
	workflow_json: recordType(unknownType())
});
objectType({ asset_ids: arrayType(stringType()) });
objectType({
	asset_ids: arrayType(stringType()),
	custom_nodes: arrayType(stringType()).optional(),
	description: stringType().optional(),
	metadata: recordType(unknownType()).optional(),
	models: arrayType(stringType()).optional(),
	name: stringType(),
	sample_image_tokens_or_urls: arrayType(stringType()).optional(),
	tags: arrayType(stringType()).optional(),
	thumbnail_comparison_token_or_url: stringType().optional(),
	thumbnail_token_or_url: stringType().optional(),
	thumbnail_type: enumType([
		"image",
		"video",
		"image_comparison"
	]).optional(),
	tutorial_url: stringType().optional(),
	username: stringType(),
	workflow_filename: stringType()
});
/**
* One provider's policy state.
*/
var zProviderPolicyEntry = objectType({
	enabled: booleanType(),
	provider_id: stringType()
});
objectType({
	enforcement_enabled: booleanType(),
	providers: arrayType(zProviderPolicyEntry)
});
/**
* Display data for one governable partner provider.
*/
var zCatalogProvider = objectType({
	display_name: stringType(),
	node_categories: arrayType(stringType()),
	provider_id: stringType()
});
objectType({ providers: arrayType(zCatalogProvider) });
objectType({
	node_errors: recordType(unknownType()).optional(),
	number: numberType().optional(),
	prompt_id: stringType().uuid().optional()
});
objectType({
	extra_data: recordType(unknownType()).optional(),
	front: booleanType().optional(),
	number: numberType().optional(),
	partial_execution_targets: arrayType(stringType()).optional(),
	prompt: recordType(unknownType()),
	workflow_id: stringType().optional(),
	workflow_version_id: stringType().optional()
});
objectType({ exec_info: objectType({ queue_remaining: numberType().int().optional() }).optional() });
/**
* Error response for ComfyUI prompt execution.
*/
var zPromptErrorResponse = recordType(unknownType());
/**
* Summary of seat costs based on current workspace members
*/
var zPlanSeatSummary = objectType({
	seat_count: numberType().int(),
	total_cost_cents: coerce.bigint().min(BigInt("-9223372036854775808"), { message: "Invalid value: Expected int64 to be >= -9223372036854775808" }).max(BigInt("9223372036854775807"), { message: "Invalid value: Expected int64 to be <= 9223372036854775807" }),
	total_credits_cents: coerce.bigint().min(BigInt("-9223372036854775808"), { message: "Invalid value: Expected int64 to be >= -9223372036854775808" }).max(BigInt("9223372036854775807"), { message: "Invalid value: Expected int64 to be <= 9223372036854775807" })
});
/**
* Plan information for preview display
*/
var zPreviewPlanInfo = objectType({
	credits_cents: coerce.bigint().min(BigInt("-9223372036854775808"), { message: "Invalid value: Expected int64 to be >= -9223372036854775808" }).max(BigInt("9223372036854775807"), { message: "Invalid value: Expected int64 to be <= 9223372036854775807" }),
	duration: zSubscriptionDuration,
	list_price_cents: coerce.bigint().min(BigInt("-9223372036854775808"), { message: "Invalid value: Expected int64 to be >= -9223372036854775808" }).max(BigInt("9223372036854775807"), { message: "Invalid value: Expected int64 to be <= 9223372036854775807" }).optional(),
	monthly_list_price_cents: coerce.bigint().min(BigInt("-9223372036854775808"), { message: "Invalid value: Expected int64 to be >= -9223372036854775808" }).max(BigInt("9223372036854775807"), { message: "Invalid value: Expected int64 to be <= 9223372036854775807" }).optional(),
	monthly_price_cents: coerce.bigint().min(BigInt("-9223372036854775808"), { message: "Invalid value: Expected int64 to be >= -9223372036854775808" }).max(BigInt("9223372036854775807"), { message: "Invalid value: Expected int64 to be <= 9223372036854775807" }).optional(),
	period_end: stringType().datetime().optional(),
	period_start: stringType().datetime().optional(),
	price_cents: coerce.bigint().min(BigInt("-9223372036854775808"), { message: "Invalid value: Expected int64 to be >= -9223372036854775808" }).max(BigInt("9223372036854775807"), { message: "Invalid value: Expected int64 to be <= 9223372036854775807" }),
	seat_summary: zPlanSeatSummary,
	slug: stringType(),
	tier: zSubscriptionTier
});
/**
* Itemized cost preview for a pending subscription change.
*/
var zPreviewSubscribeResponse = objectType({
	allowed: booleanType(),
	amount_due_cents: coerce.bigint().min(BigInt("-9223372036854775808"), { message: "Invalid value: Expected int64 to be >= -9223372036854775808" }).max(BigInt("9223372036854775807"), { message: "Invalid value: Expected int64 to be <= 9223372036854775807" }).optional(),
	balance_applied_cents: coerce.bigint().min(BigInt("-9223372036854775808"), { message: "Invalid value: Expected int64 to be >= -9223372036854775808" }).max(BigInt("9223372036854775807"), { message: "Invalid value: Expected int64 to be <= 9223372036854775807" }).optional(),
	cost_next_period_cents: coerce.bigint().min(BigInt("-9223372036854775808"), { message: "Invalid value: Expected int64 to be >= -9223372036854775808" }).max(BigInt("9223372036854775807"), { message: "Invalid value: Expected int64 to be <= 9223372036854775807" }),
	cost_today_cents: coerce.bigint().min(BigInt("-9223372036854775808"), { message: "Invalid value: Expected int64 to be >= -9223372036854775808" }).max(BigInt("9223372036854775807"), { message: "Invalid value: Expected int64 to be <= 9223372036854775807" }),
	credits_next_period: coerce.bigint().min(BigInt("-9223372036854775808"), { message: "Invalid value: Expected int64 to be >= -9223372036854775808" }).max(BigInt("9223372036854775807"), { message: "Invalid value: Expected int64 to be <= 9223372036854775807" }).optional(),
	credits_next_period_cents: coerce.bigint().min(BigInt("-9223372036854775808"), { message: "Invalid value: Expected int64 to be >= -9223372036854775808" }).max(BigInt("9223372036854775807"), { message: "Invalid value: Expected int64 to be <= 9223372036854775807" }),
	credits_today: coerce.bigint().min(BigInt("-9223372036854775808"), { message: "Invalid value: Expected int64 to be >= -9223372036854775808" }).max(BigInt("9223372036854775807"), { message: "Invalid value: Expected int64 to be <= 9223372036854775807" }).optional(),
	credits_today_cents: coerce.bigint().min(BigInt("-9223372036854775808"), { message: "Invalid value: Expected int64 to be >= -9223372036854775808" }).max(BigInt("9223372036854775807"), { message: "Invalid value: Expected int64 to be <= 9223372036854775807" }),
	currency: stringType().optional(),
	current_plan: zPreviewPlanInfo.optional(),
	discounts: arrayType(zSubscriptionDiscount).optional(),
	effective_at: stringType().datetime(),
	is_immediate: booleanType(),
	new_plan: zPreviewPlanInfo,
	payment_method_configuration_id: stringType().optional(),
	promotion_code: stringType().optional(),
	proration_at: stringType().datetime().optional(),
	proration_remaining_cents: coerce.bigint().min(BigInt("-9223372036854775808"), { message: "Invalid value: Expected int64 to be >= -9223372036854775808" }).max(BigInt("9223372036854775807"), { message: "Invalid value: Expected int64 to be <= 9223372036854775807" }).optional(),
	proration_unused_cents: coerce.bigint().min(BigInt("-9223372036854775808"), { message: "Invalid value: Expected int64 to be >= -9223372036854775808" }).max(BigInt("9223372036854775807"), { message: "Invalid value: Expected int64 to be <= 9223372036854775807" }).optional(),
	quote_id: stringType().optional(),
	quote_version: numberType().int().optional(),
	reason: stringType().optional(),
	renewal_amount_cents: coerce.bigint().min(BigInt("-9223372036854775808"), { message: "Invalid value: Expected int64 to be >= -9223372036854775808" }).max(BigInt("9223372036854775807"), { message: "Invalid value: Expected int64 to be <= 9223372036854775807" }).optional(),
	renewal_at: stringType().datetime().optional(),
	requires_reactivation_confirmation: booleanType().optional(),
	subtotal_cents: coerce.bigint().min(BigInt("-9223372036854775808"), { message: "Invalid value: Expected int64 to be >= -9223372036854775808" }).max(BigInt("9223372036854775807"), { message: "Invalid value: Expected int64 to be <= 9223372036854775807" }).optional(),
	transition_type: enumType([
		"new_subscription",
		"upgrade",
		"downgrade",
		"duration_change"
	])
});
/**
* Request body for previewing the cost of a plan subscription change.
*/
var zPreviewSubscribeRequest = objectType({
	checkout_attempt_id: stringType().optional(),
	plan_slug: stringType(),
	promotion_code: stringType().optional(),
	team_credit_stop_id: stringType().optional()
});
/**
* Reason why a plan is unavailable
*/
var zPlanAvailabilityReason = enumType([
	"same_plan",
	"incompatible_transition",
	"requires_team",
	"requires_personal",
	"exceeds_max_seats"
]);
/**
* Availability and eligibility information for a billing plan.
*/
var zPlanAvailability = objectType({
	available: booleanType(),
	reason: zPlanAvailabilityReason.optional()
});
/**
* Billing plan details including pricing, limits, and features.
*/
var zPlan = objectType({
	availability: zPlanAvailability,
	credits: coerce.bigint().min(BigInt("-9223372036854775808"), { message: "Invalid value: Expected int64 to be >= -9223372036854775808" }).max(BigInt("9223372036854775807"), { message: "Invalid value: Expected int64 to be <= 9223372036854775807" }).optional(),
	credits_cents: coerce.bigint().min(BigInt("-9223372036854775808"), { message: "Invalid value: Expected int64 to be >= -9223372036854775808" }).max(BigInt("9223372036854775807"), { message: "Invalid value: Expected int64 to be <= 9223372036854775807" }),
	duration: zSubscriptionDuration,
	max_seats: coerce.bigint().min(BigInt("-9223372036854775808"), { message: "Invalid value: Expected int64 to be >= -9223372036854775808" }).max(BigInt("9223372036854775807"), { message: "Invalid value: Expected int64 to be <= 9223372036854775807" }),
	price_cents: coerce.bigint().min(BigInt("-9223372036854775808"), { message: "Invalid value: Expected int64 to be >= -9223372036854775808" }).max(BigInt("9223372036854775807"), { message: "Invalid value: Expected int64 to be <= 9223372036854775807" }),
	seat_summary: zPlanSeatSummary,
	slug: stringType(),
	tier: zSubscriptionTier
});
/**
* An outstanding workspace invitation that has not yet been accepted.
*/
var zPendingInvite = objectType({
	email: stringType().email(),
	expires_at: stringType().datetime(),
	id: stringType(),
	invited_at: stringType().datetime(),
	token: stringType().optional()
});
/**
* Response containing a redirect URL to the payment portal.
*/
var zPaymentPortalResponse = objectType({ url: stringType() });
objectType({ return_url: stringType().optional() });
objectType({
	access_token: stringType(),
	expires_in: numberType().int(),
	refresh_token: stringType(),
	scope: stringType(),
	token_type: enumType(["Bearer"])
});
objectType({
	error: stringType(),
	error_description: stringType().optional()
});
objectType({
	application_type: enumType(["native", "web"]),
	client_id: stringType(),
	client_id_issued_at: coerce.bigint().min(BigInt("-9223372036854775808"), { message: "Invalid value: Expected int64 to be >= -9223372036854775808" }).max(BigInt("9223372036854775807"), { message: "Invalid value: Expected int64 to be <= 9223372036854775807" }),
	client_name: stringType().optional(),
	grant_types: arrayType(stringType()),
	redirect_uris: arrayType(stringType()),
	response_types: arrayType(stringType()),
	token_endpoint_auth_method: enumType(["none"])
});
objectType({
	application_type: enumType(["native", "web"]).optional(),
	client_name: stringType().max(100).optional(),
	client_uri: stringType().nullish(),
	contacts: arrayType(stringType()).nullish(),
	grant_types: arrayType(enumType(["authorization_code", "refresh_token"])).optional(),
	jwks: recordType(unknownType()).nullish(),
	jwks_uri: stringType().nullish(),
	logo_uri: stringType().nullish(),
	policy_uri: stringType().nullish(),
	redirect_uris: arrayType(stringType()).min(1).max(5),
	resource_grants: recordType(arrayType(stringType())).nullish(),
	response_types: arrayType(enumType(["code"])).optional(),
	scope: stringType().nullish(),
	software_id: stringType().nullish(),
	software_version: stringType().nullish(),
	token_endpoint_auth_method: stringType().optional(),
	tos_uri: stringType().nullish()
});
/**
* RFC 7591 §3.2.2 error response.
*/
var zOAuthRegisterError = objectType({
	error: enumType(["invalid_redirect_uri", "invalid_client_metadata"]),
	error_description: stringType().nullish()
});
/**
* Standard error response with a machine-readable code and human-readable message.
*/
var zErrorResponse = objectType({
	code: stringType(),
	details: recordType(unknownType()).optional(),
	message: stringType(),
	organization_id: stringType().optional()
});
unionType([zOAuthRegisterError, zErrorResponse]);
objectType({
	authorization_servers: arrayType(stringType().url()),
	bearer_methods_supported: arrayType(stringType()).optional(),
	resource: stringType().url(),
	scopes_supported: arrayType(stringType())
});
/**
* One workspace option presented in the OAuth consent challenge. Promoted to a named schema so the generated Go type is referenceable in handlers and tests rather than re-declared as an anonymous struct at every callsite.
*
*/
var zOAuthConsentChallengeWorkspace = objectType({
	id: stringType(),
	name: stringType(),
	role: enumType(["owner", "member"]),
	type: enumType(["personal", "team"])
});
objectType({
	client_display_name: stringType(),
	csrf_token: stringType(),
	oauth_request_id: stringType().uuid(),
	redirect_uri: stringType().url(),
	resource_display_name: stringType(),
	scopes: arrayType(stringType()),
	workspaces: arrayType(zOAuthConsentChallengeWorkspace)
});
objectType({ redirect_url: stringType().url() });
objectType({
	authorization_endpoint: stringType().url(),
	code_challenge_methods_supported: arrayType(stringType()),
	grant_types_supported: arrayType(stringType()),
	issuer: stringType().url(),
	jwks_uri: stringType().url(),
	registration_endpoint: stringType().url().optional(),
	response_types_supported: arrayType(stringType()),
	scopes_supported: arrayType(stringType()).optional(),
	token_endpoint: stringType().url(),
	token_endpoint_auth_methods_supported: arrayType(stringType())
});
/**
* Metadata describing a single ComfyUI node type and its inputs/outputs.
*/
var zNodeInfo = objectType({
	api_node: booleanType().optional(),
	category: stringType().optional(),
	deprecated: booleanType().optional(),
	description: stringType().optional(),
	display_name: stringType().optional(),
	experimental: booleanType().optional(),
	input: recordType(unknownType()).optional(),
	input_order: recordType(arrayType(stringType())).optional(),
	name: stringType().optional(),
	output: arrayType(stringType()).optional(),
	output_is_list: arrayType(booleanType()).optional(),
	output_name: arrayType(stringType()).optional(),
	output_node: booleanType().optional(),
	output_tooltips: arrayType(stringType()).optional(),
	python_module: stringType().optional()
});
/**
* Represents a folder containing models
*/
var zModelFolder = objectType({
	folders: arrayType(stringType()),
	name: stringType()
});
/**
* Represents a model file with metadata
*/
var zModelFile = objectType({
	name: stringType(),
	pathIndex: numberType().int()
});
/**
* Workspace member with profile and role information.
*/
var zMember = objectType({
	email: stringType(),
	id: stringType(),
	is_original_owner: booleanType(),
	joined_at: stringType().datetime(),
	managed_by_directory: booleanType().optional(),
	name: stringType(),
	role: enumType(["owner", "member"])
});
/**
* 400 for a missing `filename` or a `res` that is not a number, on the media routes served outside the generated wrapper.
*/
var zMediaQueryError = objectType({ error: stringType() });
unionType([zErrorResponse, zMediaQueryError]);
objectType({ workspaces: arrayType(zWorkspaceWithRole) });
objectType({ api_keys: arrayType(zWorkspaceApiKeyInfo) });
objectType({
	has_more: booleanType(),
	tags: arrayType(zTagInfo),
	total: numberType().int()
});
objectType({
	members: arrayType(zMember),
	pagination: zPaginationInfo
});
objectType({ invites: arrayType(zPendingInvite) });
/**
* Represents a user-owned asset (image, video, or other generated output).
*/
var zAsset = objectType({
	created_at: stringType().datetime(),
	display_name: stringType().nullish(),
	file_path: stringType().nullish(),
	hash: stringType().regex(/^blake3:[a-f0-9]{64}$/).optional(),
	id: stringType().uuid(),
	is_immutable: booleanType().optional(),
	job_id: stringType().uuid().nullish(),
	last_access_time: stringType().datetime().optional(),
	loader_path: stringType().nullish(),
	metadata: recordType(unknownType()).readonly().optional(),
	mime_type: stringType().optional(),
	name: stringType(),
	preview_id: stringType().uuid().nullish(),
	preview_url: stringType().url().optional(),
	short_url: stringType().nullish(),
	size: coerce.bigint().min(BigInt("-9223372036854775808"), { message: "Invalid value: Expected int64 to be >= -9223372036854775808" }).max(BigInt("9223372036854775807"), { message: "Invalid value: Expected int64 to be <= 9223372036854775807" }).optional(),
	tags: arrayType(stringType()).optional(),
	updated_at: stringType().datetime(),
	user_metadata: recordType(unknownType()).optional()
});
/**
* Paginated list of assets belonging to the authenticated user.
*/
var zListAssetsResponse = objectType({
	assets: arrayType(zAsset),
	has_more: booleanType(),
	next_cursor: stringType().optional(),
	total: numberType().int()
});
/**
* Reference to a Hub label by ID.
*/
var zLabelRef = objectType({
	display_name: stringType(),
	name: stringType()
});
/**
* A single JSON Web Key entry within a JWKS response.
*/
var zJwkKey = objectType({
	alg: stringType(),
	crv: stringType(),
	kid: stringType(),
	kty: stringType(),
	use: stringType(),
	x: stringType(),
	y: stringType()
});
objectType({ keys: arrayType(zJwkKey) });
/**
* Detailed execution error information from ComfyUI
*/
var zExecutionError = objectType({
	current_inputs: recordType(unknownType()),
	current_outputs: recordType(unknownType()),
	exception_message: stringType(),
	exception_type: stringType(),
	node_id: stringType(),
	node_type: stringType(),
	traceback: arrayType(stringType())
});
/**
* Lightweight job data for list views (workflow and full outputs excluded)
*/
var zJobEntry = objectType({
	create_time: coerce.bigint().min(BigInt("-9223372036854775808"), { message: "Invalid value: Expected int64 to be >= -9223372036854775808" }).max(BigInt("9223372036854775807"), { message: "Invalid value: Expected int64 to be <= 9223372036854775807" }),
	execution_end_time: coerce.bigint().min(BigInt("-9223372036854775808"), { message: "Invalid value: Expected int64 to be >= -9223372036854775808" }).max(BigInt("9223372036854775807"), { message: "Invalid value: Expected int64 to be <= 9223372036854775807" }).optional(),
	execution_error: zExecutionError.optional(),
	execution_start_time: coerce.bigint().min(BigInt("-9223372036854775808"), { message: "Invalid value: Expected int64 to be >= -9223372036854775808" }).max(BigInt("9223372036854775807"), { message: "Invalid value: Expected int64 to be <= 9223372036854775807" }).optional(),
	id: stringType().uuid(),
	outputs_count: numberType().int().optional(),
	preview_output: recordType(unknownType()).optional(),
	previewable_outputs_count: numberType().int().optional(),
	status: enumType([
		"pending",
		"in_progress",
		"completed",
		"failed",
		"cancelled"
	]),
	workflow_id: stringType().optional()
});
objectType({
	jobs: arrayType(zJobEntry),
	pagination: zPaginationInfo
});
objectType({ cancelled: arrayType(stringType()) });
objectType({ job_ids: arrayType(stringType().uuid()).min(1).max(100) });
objectType({
	assigned_inference: stringType().nullish(),
	created_at: stringType().datetime(),
	error_message: stringType().nullish(),
	id: stringType().uuid(),
	last_state_update: stringType().datetime().optional(),
	status: enumType([
		"waiting_to_dispatch",
		"pending",
		"in_progress",
		"completed",
		"error",
		"cancelled"
	]),
	updated_at: stringType().datetime()
});
/**
* An asset produced by a job, enriched with the per-output node context
* (`node_id`, `output_key`, `output_index`) correlated from the job's
* execution outputs by content hash. The node-context fields are null
* when the asset cannot be matched to an output entry.
*
*/
var zJobOutputAsset = objectType({
	created_at: stringType().datetime(),
	hash: stringType().regex(/^blake3:[a-f0-9]{64}$/).optional(),
	id: stringType().uuid(),
	mime_type: stringType().optional(),
	name: stringType(),
	node_id: stringType().nullish(),
	output_index: numberType().int().nullish(),
	output_key: stringType().nullish(),
	preview_url: stringType().optional(),
	size: coerce.bigint().min(BigInt("-9223372036854775808"), { message: "Invalid value: Expected int64 to be >= -9223372036854775808" }).max(BigInt("9223372036854775807"), { message: "Invalid value: Expected int64 to be <= 9223372036854775807" }).optional()
});
objectType({
	create_time: coerce.bigint().min(BigInt("-9223372036854775808"), { message: "Invalid value: Expected int64 to be >= -9223372036854775808" }).max(BigInt("9223372036854775807"), { message: "Invalid value: Expected int64 to be <= 9223372036854775807" }),
	execution_end_time: coerce.bigint().min(BigInt("-9223372036854775808"), { message: "Invalid value: Expected int64 to be >= -9223372036854775808" }).max(BigInt("9223372036854775807"), { message: "Invalid value: Expected int64 to be <= 9223372036854775807" }).optional(),
	execution_error: zExecutionError.optional(),
	execution_meta: recordType(unknownType()).optional(),
	execution_start_time: coerce.bigint().min(BigInt("-9223372036854775808"), { message: "Invalid value: Expected int64 to be >= -9223372036854775808" }).max(BigInt("9223372036854775807"), { message: "Invalid value: Expected int64 to be <= 9223372036854775807" }).optional(),
	execution_status: recordType(unknownType()).optional(),
	id: stringType().uuid(),
	outputs: recordType(unknownType()).optional(),
	outputs_count: numberType().int().optional(),
	preview_output: recordType(unknownType()).optional(),
	previewable_outputs_count: numberType().int().optional(),
	status: enumType([
		"pending",
		"in_progress",
		"completed",
		"failed",
		"cancelled"
	]),
	update_time: coerce.bigint().min(BigInt("-9223372036854775808"), { message: "Invalid value: Expected int64 to be >= -9223372036854775808" }).max(BigInt("9223372036854775807"), { message: "Invalid value: Expected int64 to be <= 9223372036854775807" }),
	user_id: stringType().optional(),
	workflow: recordType(unknownType()).optional(),
	workflow_id: stringType().optional(),
	workflow_version_id: stringType().optional(),
	workspace_id: stringType().optional()
});
objectType({ cancelled: booleanType() });
objectType({
	assets: arrayType(zJobOutputAsset),
	job_id: stringType().uuid(),
	pagination: zPaginationInfo
});
objectType({ content_type: stringType().max(64) });
/**
* Result of redeeming an input-image upload grant. Identical in shape to
* the POST /api/upload/image response.
*
*/
var zInputUploadResponse = objectType({
	name: stringType(),
	subfolder: stringType(),
	type: stringType()
});
objectType({ assets: arrayType(zAssetInfo) });
objectType({
	published_asset_ids: arrayType(stringType()),
	share_id: stringType().nullish()
});
/**
* Public workflow status. NULL in the database is represented as pending in API responses.
*/
var zHubWorkflowStatus = enumType([
	"pending",
	"approved",
	"rejected",
	"deprecated"
]);
/**
* Abbreviated Hub profile used in workflow listings.
*/
var zHubProfileSummary = objectType({
	avatar_url: stringType().optional(),
	display_name: stringType().optional(),
	username: stringType()
});
/**
* Entry in the curated workflow template gallery shown on the home page.
*/
var zHubWorkflowTemplateEntry = objectType({
	contentTemplate: stringType().optional(),
	date: stringType().optional(),
	description: stringType().optional(),
	extendedDescription: stringType().optional(),
	faqItems: arrayType(objectType({
		answer: stringType(),
		question: stringType()
	})).optional(),
	howToUse: arrayType(stringType()).optional(),
	includeOnDistributions: arrayType(stringType()).optional(),
	io: objectType({
		inputs: arrayType(recordType(unknownType())).optional(),
		outputs: arrayType(recordType(unknownType())).optional()
	}).optional(),
	isApp: booleanType(),
	isEssential: booleanType().optional(),
	logos: arrayType(recordType(unknownType())).optional(),
	mediaSubtype: stringType().optional(),
	mediaType: stringType().optional(),
	metaDescription: stringType().optional(),
	models: arrayType(stringType()).optional(),
	name: stringType(),
	openSource: booleanType().optional(),
	profile: zHubProfileSummary.optional(),
	requiresCustomNodes: arrayType(stringType()).optional(),
	searchRank: coerce.bigint().min(BigInt("-9223372036854775808"), { message: "Invalid value: Expected int64 to be >= -9223372036854775808" }).max(BigInt("9223372036854775807"), { message: "Invalid value: Expected int64 to be <= 9223372036854775807" }).optional(),
	shareId: stringType().optional(),
	size: coerce.bigint().min(BigInt("-9223372036854775808"), { message: "Invalid value: Expected int64 to be >= -9223372036854775808" }).max(BigInt("9223372036854775807"), { message: "Invalid value: Expected int64 to be <= 9223372036854775807" }).optional(),
	status: zHubWorkflowStatus,
	suggestedUseCases: arrayType(stringType()).optional(),
	tags: arrayType(stringType()).optional(),
	thumbnailComparisonUrl: stringType().optional(),
	thumbnailUrl: stringType().optional(),
	thumbnailVariant: stringType().optional(),
	title: stringType(),
	tutorialUrl: stringType().optional(),
	usage: coerce.bigint().min(BigInt("-9223372036854775808"), { message: "Invalid value: Expected int64 to be >= -9223372036854775808" }).max(BigInt("9223372036854775807"), { message: "Invalid value: Expected int64 to be <= 9223372036854775807" }).optional(),
	vram: coerce.bigint().min(BigInt("-9223372036854775808"), { message: "Invalid value: Expected int64 to be >= -9223372036854775808" }).max(BigInt("9223372036854775807"), { message: "Invalid value: Expected int64 to be <= 9223372036854775807" }).optional()
});
/**
* Abbreviated Hub workflow metadata used in search and listing results.
*/
var zHubWorkflowSummary = objectType({
	custom_nodes: arrayType(zLabelRef).optional(),
	description: stringType().optional(),
	is_app: booleanType(),
	metadata: recordType(unknownType()).optional(),
	models: arrayType(zLabelRef).optional(),
	name: stringType(),
	profile: zHubProfileSummary,
	publish_time: stringType().datetime().nullish(),
	sample_image_urls: arrayType(stringType()).optional(),
	share_id: stringType(),
	status: zHubWorkflowStatus,
	tags: arrayType(zLabelRef).optional(),
	thumbnail_comparison_url: stringType().optional(),
	thumbnail_type: enumType([
		"image",
		"video",
		"image_comparison"
	]).optional(),
	thumbnail_url: stringType().optional(),
	tutorial_url: stringType().optional()
});
/**
* Full Hub workflow detail including versions, assets, and statistics.
*/
var zHubWorkflowDetail = objectType({
	assets: arrayType(zAssetInfo),
	custom_nodes: arrayType(zLabelRef).optional(),
	description: stringType().optional(),
	is_app: booleanType(),
	metadata: recordType(unknownType()).optional(),
	models: arrayType(zLabelRef).optional(),
	name: stringType(),
	profile: zHubProfileSummary,
	publish_time: stringType().datetime().nullish(),
	sample_image_urls: arrayType(stringType()).optional(),
	share_id: stringType(),
	status: zHubWorkflowStatus,
	tags: arrayType(zLabelRef).optional(),
	thumbnail_comparison_url: stringType().optional(),
	thumbnail_type: enumType([
		"image",
		"video",
		"image_comparison"
	]).optional(),
	thumbnail_url: stringType().optional(),
	tutorial_url: stringType().optional(),
	workflow_id: stringType(),
	workflow_json: recordType(unknownType())
});
objectType({
	next_cursor: stringType().optional(),
	workflows: arrayType(unionType([zHubWorkflowSummary, zHubWorkflowDetail]))
});
objectType({
	available: booleanType(),
	suggestions: arrayType(stringType()).optional(),
	username: stringType(),
	validation_error: stringType().optional()
});
/**
* Full public profile for a Hub creator.
*/
var zHubProfile = objectType({
	avatar_url: stringType().optional(),
	description: stringType().optional(),
	display_name: stringType().optional(),
	username: stringType(),
	website_urls: arrayType(stringType()).optional()
});
/**
* Metadata for a single Hub label.
*/
var zHubLabelInfo = objectType({
	description: stringType().optional(),
	display_name: stringType(),
	name: stringType(),
	type: enumType([
		"tag",
		"model",
		"custom_node"
	])
});
objectType({ labels: arrayType(zHubLabelInfo) });
objectType({
	public_url: stringType(),
	token: stringType(),
	upload_url: stringType()
});
objectType({
	content_type: stringType(),
	filename: stringType()
});
/**
* History entry with prompt_id and execution data
*/
var zHistoryEntry = objectType({
	create_time: coerce.bigint().min(BigInt("-9223372036854775808"), { message: "Invalid value: Expected int64 to be >= -9223372036854775808" }).max(BigInt("9223372036854775807"), { message: "Invalid value: Expected int64 to be <= 9223372036854775807" }).optional(),
	meta: recordType(unknownType()).optional(),
	outputs: recordType(unknownType()).optional(),
	prompt: objectType({
		extra_data: recordType(unknownType()).optional(),
		priority: numberType().optional(),
		prompt_id: stringType().optional()
	}).optional(),
	prompt_id: stringType(),
	status: recordType(unknownType()).optional(),
	workflow_id: stringType().optional()
});
objectType({ history: arrayType(zHistoryEntry) });
objectType({
	clear: booleanType().optional(),
	delete: arrayType(stringType()).optional()
});
/**
* History entry with full prompt data. The workflow graph (extra_data.extra_pnginfo) is omitted from records persisted after it stopped being stored; older records may still contain it.
*/
var zHistoryDetailEntry = objectType({
	meta: recordType(unknownType()).optional(),
	outputs: recordType(unknownType()).optional(),
	prompt: objectType({
		extra_data: recordType(unknownType()).optional(),
		outputs_to_execute: arrayType(stringType()).optional(),
		priority: numberType().optional(),
		prompt: recordType(unknownType()).optional(),
		prompt_id: stringType().optional()
	}).optional(),
	status: recordType(unknownType()).optional()
});
recordType(zHistoryDetailEntry);
/**
* Metadata for a global subgraph blueprint (without full data)
*/
var zGlobalSubgraphInfo = objectType({
	data: stringType().optional(),
	info: objectType({ node_pack: stringType() }),
	name: stringType(),
	source: stringType()
});
objectType({
	data: stringType(),
	info: objectType({ node_pack: stringType() }),
	name: stringType(),
	source: stringType()
});
objectType({ key: literalType("Comfy.AgentPanel.ConsentAccepted") }).and(zAgentConsentSettingValue);
/**
* The union of setting keys this server accepts. Published as an enum so clients cannot address a key the registry does not know.
*/
var zGlobalSettingKey = enumType(["Comfy.AgentPanel.ConsentAccepted"]);
/**
* A stored setting: one GlobalSettingValue member plus when it last changed. Discriminated on `key` like GlobalSettingValue, so narrowing a read yields the same single value schema a write is typed by.
*/
var zGlobalSetting = objectType({ key: literalType("Comfy.AgentPanel.ConsentAccepted") }).and(zStoredAgentConsentSetting);
/**
* Individual file entry within a full user data response.
*/
var zGetUserDataResponseFullFile = objectType({
	modified: coerce.bigint().min(BigInt("-9223372036854775808"), { message: "Invalid value: Expected int64 to be >= -9223372036854775808" }).max(BigInt("9223372036854775807"), { message: "Invalid value: Expected int64 to be <= 9223372036854775807" }).optional(),
	path: stringType().optional(),
	size: numberType().int().optional()
});
arrayType(zGetUserDataResponseFullFile);
objectType({
	name: stringType().optional(),
	source_version: numberType().int()
});
/**
* 403 for a credential the route does not take. `accepted` names the ones it does, as `WWW-Authenticate` does.
*/
var zAuthTypeNotAllowedError = objectType({
	accepted: arrayType(stringType()),
	error: objectType({
		message: stringType(),
		type: enumType(["auth_type_not_allowed"])
	})
});
unionType([zErrorResponse, zAuthTypeNotAllowedError]);
recordType(unknownType());
objectType({
	content: stringType().optional(),
	metadata: recordType(unknownType()).optional(),
	rating: numberType().int().gte(1).lte(5).optional(),
	type: enumType([
		"missing_nodes",
		"general",
		"missing_models"
	])
});
objectType({
	expires_at: stringType().datetime().optional(),
	url: stringType()
});
/**
* Response containing the issued Cloud JWT and its expiry.
*/
var zExchangeTokenResponse = objectType({
	expires_at: stringType().datetime(),
	permissions: arrayType(stringType()),
	role: enumType(["owner", "member"]),
	token: stringType(),
	workspace: zWorkspaceSummary
});
objectType({ workspace_id: stringType().optional() });
objectType({ status: enumType(["redeemed"]) });
objectType({ code: stringType() });
objectType({
	custom_token: stringType().optional(),
	status: enumType(["pending", "complete"])
});
objectType({
	code: stringType(),
	code_verifier: stringType().min(43).max(128)
});
objectType({
	code: stringType(),
	expires_in: numberType().int(),
	poll_interval: numberType().int()
});
objectType({
	app_version: stringType().min(1).max(64),
	code_challenge: stringType().min(43).max(128),
	installation_id: stringType().min(8).max(128).regex(/^[A-Za-z0-9._-]+$/).optional(),
	platform: stringType().min(1).max(32)
});
/**
* Response after deleting a session cookie
*/
var zDeleteSessionResponse = objectType({ success: booleanType() });
/**
* The workspace bound to the presented credential, plus how that credential authenticated. Same shape as Workspace with the caller's role and the auth method added, and without created_at (callers of this endpoint want identity, not provenance).
*/
var zCurrentWorkspaceResponse = objectType({
	auth_method: stringType(),
	id: stringType(),
	name: stringType(),
	permissions: arrayType(stringType()).optional(),
	role: enumType(["owner", "member"]).optional(),
	type: enumType(["personal", "team"])
});
objectType({ name: stringType().min(1).max(100) });
objectType({
	created_at: stringType().datetime(),
	description: stringType().max(5e3),
	expires_at: stringType().datetime().optional(),
	id: stringType().uuid(),
	key: stringType(),
	key_prefix: stringType(),
	name: stringType()
});
objectType({
	description: stringType().max(5e3).optional(),
	expires_at: stringType().datetime().optional(),
	name: stringType()
});
objectType({
	base_version: numberType().int(),
	workflow_json: recordType(unknownType())
});
objectType({
	default_view: enumType(["workflow", "app"]).optional(),
	description: stringType().optional(),
	forked_from_workflow_id: stringType().optional(),
	forked_from_workflow_version_id: stringType().optional(),
	name: stringType().optional(),
	workflow_json: recordType(unknownType())
});
/**
* Response after successfully purchasing a credit top-up.
*/
var zCreateTopupResponse = objectType({
	amount_cents: coerce.bigint().min(BigInt("-9223372036854775808"), { message: "Invalid value: Expected int64 to be >= -9223372036854775808" }).max(BigInt("9223372036854775807"), { message: "Invalid value: Expected int64 to be <= 9223372036854775807" }),
	billing_op_id: stringType(),
	status: enumType([
		"pending",
		"completed",
		"failed"
	]),
	topup_id: stringType()
});
/**
* Request body for purchasing a one-time credit top-up.
*/
var zCreateTopupRequest = objectType({
	amount_cents: coerce.bigint().gte(BigInt(500)).max(BigInt("9223372036854775807"), { message: "Invalid value: Expected int64 to be <= 9223372036854775807" }),
	checkout_attempt_id: stringType().optional(),
	idempotency_key: stringType().optional()
});
objectType({ amount_cents: coerce.bigint().min(BigInt("-9223372036854775808"), { message: "Invalid value: Expected int64 to be >= -9223372036854775808" }).max(BigInt("9223372036854775807"), { message: "Invalid value: Expected int64 to be <= 9223372036854775807" }) });
/**
* A hosted Stripe Checkout session for a credit top-up.
*/
var zCreateTopupCheckoutResponse = objectType({
	checkout_url: stringType().url(),
	session_id: stringType().optional()
});
/**
* Request body for creating a hosted credit top-up checkout session.
*/
var zCreateTopupCheckoutRequest = objectType({
	amount_cents: coerce.bigint().gte(BigInt(500)).lte(BigInt(16e5)),
	idempotency_key: stringType().optional(),
	return_url: stringType().url()
});
/**
* Response after creating a session cookie
*/
var zCreateSessionResponse = objectType({
	expiresIn: numberType().int().optional(),
	success: booleanType()
});
objectType({
	credential_type: enumType(["api_key", "gcp_service_account"]).optional().default("api_key"),
	name: stringType().min(1).max(255),
	provider: stringType().max(64).optional(),
	secret_value: stringType().min(1)
});
objectType({ email: stringType().email() });
objectType({
	avatar_token: stringType().optional(),
	description: stringType().optional(),
	display_name: stringType().optional(),
	username: stringType(),
	website_urls: arrayType(stringType()).optional(),
	workspace_id: stringType()
});
/**
* Credentials the Churnkey embed requires to launch the cancel flow.
* `auth_hash` is hex-encoded HMAC-SHA256 of `customer_id` signed with the
* server's CHURNKEY_HMAC_SECRET; it is bound to that single customer ID
* and must not be reused for other customers.
*
*/
var zChurnkeyAuthResponse = objectType({
	auth_hash: stringType(),
	customer_id: stringType(),
	mode: enumType([
		"live",
		"test",
		"sandbox"
	]),
	offer_subscription_id: stringType().min(1).optional()
});
/**
* Response after successfully cancelling a subscription.
*/
var zCancelSubscriptionResponse = objectType({
	billing_op_id: stringType(),
	cancel_at: stringType().datetime()
});
objectType({ idempotency_key: stringType().optional() });
/**
* Response when a cancellation is accepted but has not committed yet. Carries no cancel_at: no cancellation time exists to report until the operation settles. The billing operation reports only status, so once it reaches `succeeded` the committed date is read from `cancel_at` on `GET /api/billing/status`.
*/
var zCancelSubscriptionAcceptedResponse = objectType({
	billing_op_id: stringType(),
	status: enumType(["pending"])
});
objectType({ revoked_count: numberType().int().gte(0) });
/**
* A tax identifier for a company Stripe customer. Stripe validates the
* type/value combination synchronously and verifies VAT/ABN-style IDs
* asynchronously.
*
*/
var zBillingTaxId = objectType({
	type: stringType(),
	value: stringType()
});
/**
* Payment lifecycle status
*/
var zBillingStatus = enumType([
	"awaiting_payment_method",
	"pending_payment",
	"paid",
	"payment_failed",
	"paused",
	"inactive"
]);
/**
* Current billing and subscription status for a workspace.
*/
var zBillingStatusResponse = objectType({
	action_url: stringType().optional(),
	billing_rail: enumType([
		"legacy_stripe",
		"metronome",
		"stripe"
	]).optional(),
	billing_status: zBillingStatus.optional(),
	cancel_at: stringType().datetime().optional(),
	has_funds: booleanType(),
	is_active: booleanType(),
	max_seats: numberType().int(),
	occupied_seats: numberType().int(),
	payment_intent_client_secret: stringType().optional(),
	pending_billing_op_id: stringType().optional(),
	pending_billing_op_type: enumType(["subscription", "topup"]).optional(),
	plan_slug: stringType().optional(),
	renewal_date: stringType().datetime().optional(),
	renewal_invoice: zRenewalInvoice.optional(),
	scheduled_change: zScheduledPlanChange.nullable(),
	scoped_effective_has_funds: recordType(booleanType()).optional(),
	scoped_has_funds: recordType(booleanType()).optional(),
	subscription_duration: zSubscriptionDuration.optional(),
	subscription_status: enumType([
		"active",
		"ended",
		"canceled"
	]).optional(),
	subscription_tier: zSubscriptionTier.optional(),
	team_credit_stop: zTeamCreditStopSummary.nullable()
});
/**
* List of available billing plans for subscription.
*/
var zBillingPlansResponse = objectType({
	current_plan_slug: stringType().optional(),
	plans: arrayType(zPlan),
	team_credit_stops: zTeamCreditStops.optional()
});
/**
* Display only. The plan the operation targets; for a scheduled change,
* the plan it switches to at period end. Present for plan changes,
* initial subscriptions and resubscribes in every status (pending,
* failed and succeeded alike), so a recovered pending operation can be
* labelled with its own plan. Absent when the target plan could not be
* resolved. Visible to any workspace member who can read the operation.
* tier and the price fields are absent when the server cannot describe
* the plan, as for the retired seat-based Team plans, whose rows carry a
* personal tier and whose price depends on the workspace's seats.
*
*/
var zBillingOpReceiptPlan = objectType({
	currency: stringType().optional(),
	duration: zSubscriptionDuration,
	monthly_price_cents: coerce.bigint().min(BigInt("-9223372036854775808"), { message: "Invalid value: Expected int64 to be >= -9223372036854775808" }).max(BigInt("9223372036854775807"), { message: "Invalid value: Expected int64 to be <= 9223372036854775807" }).optional(),
	price_cents: coerce.bigint().min(BigInt("-9223372036854775808"), { message: "Invalid value: Expected int64 to be >= -9223372036854775808" }).max(BigInt("9223372036854775807"), { message: "Invalid value: Expected int64 to be <= 9223372036854775807" }).optional(),
	slug: stringType(),
	team_credit_stop_id: stringType().optional(),
	tier: zSubscriptionTier.optional()
});
/**
* One deduction from today's charge. discount is the promotion in the
* quote's discount shape (kind promotion, without amount_off_cents; the
* amount is amount_cents), present exactly for promo_code and
* subscription_discount. Its duration_in_months is set only for
* promo_code: a carried promotion's remaining term is not the coupon's.
*
*/
var zBillingOpChargeReason = objectType({
	amount_cents: coerce.bigint().min(BigInt("-9223372036854775808"), { message: "Invalid value: Expected int64 to be >= -9223372036854775808" }).max(BigInt("9223372036854775807"), { message: "Invalid value: Expected int64 to be <= 9223372036854775807" }),
	discount: zSubscriptionDiscount.optional(),
	kind: enumType([
		"promo_code",
		"subscription_discount",
		"account_balance"
	])
});
/**
* Display only. Why a succeeded subscription operation charged other
* than its plan rate, read from the operation's paid Stripe invoice.
* Present only when that invoice collected more than zero and a
* promotion, the account balance or proration moved the charge off the
* plan rate; absent means no rows. Plan coupons (the annual or team
* commitment rate) are part of the rate and are never a reason. Never
* present for top-ups. Returned only to workspace billing managers,
* like amount_charged_cents.
*
*/
var zBillingOpChargeBreakdown = objectType({
	amount_charged_cents: coerce.bigint().min(BigInt("-9223372036854775808"), { message: "Invalid value: Expected int64 to be >= -9223372036854775808" }).max(BigInt("9223372036854775807"), { message: "Invalid value: Expected int64 to be <= 9223372036854775807" }),
	currency: stringType(),
	prorated: booleanType(),
	reasons: arrayType(zBillingOpChargeReason)
});
/**
* Status of an asynchronous billing operation.
*/
var zBillingOpStatusResponse = objectType({
	action_url: stringType().optional(),
	amount_charged_cents: coerce.bigint().min(BigInt("-9223372036854775808"), { message: "Invalid value: Expected int64 to be >= -9223372036854775808" }).max(BigInt("9223372036854775807"), { message: "Invalid value: Expected int64 to be <= 9223372036854775807" }).optional(),
	authentication_state: enumType([
		"requires_action",
		"processing",
		"failed_retryable",
		"succeeded",
		"reconciliation_needed"
	]).optional(),
	cancelable: booleanType().optional(),
	charge_breakdown: zBillingOpChargeBreakdown.optional(),
	completed_at: stringType().datetime().optional(),
	credits_added: coerce.bigint().min(BigInt("-9223372036854775808"), { message: "Invalid value: Expected int64 to be >= -9223372036854775808" }).max(BigInt("9223372036854775807"), { message: "Invalid value: Expected int64 to be <= 9223372036854775807" }).optional(),
	decline_reason: enumType([
		"card_declined",
		"insufficient_funds",
		"expired_card",
		"incorrect_cvc",
		"authentication_required",
		"authentication_failed",
		"processing_error",
		"payment_not_completed",
		"generic"
	]).optional(),
	error_message: stringType().optional(),
	id: stringType(),
	payment_intent_client_secret: stringType().optional(),
	phase: enumType([
		"awaiting_payment_method",
		"awaiting_invoice_payment",
		"in_progress"
	]).optional(),
	plan: zBillingOpReceiptPlan.optional(),
	recovery_action: enumType([
		"retry",
		"replace_payment_method",
		"authenticate_payment",
		"contact_support"
	]).optional(),
	retryable: booleanType().optional(),
	started_at: stringType().datetime(),
	status: enumType([
		"pending",
		"succeeded",
		"failed",
		"reconciliation_needed"
	])
});
var zBillingOpCancelResponse = objectType({
	billing_op_id: stringType(),
	status: enumType(["canceled", "cancel_requested"])
});
/**
* A single history event. The cloud history-events store is the single source of truth for both billing events (charges, credits, adjustments) and user-facing usage events.
*/
var zBillingEvent = objectType({
	createdAt: stringType().datetime(),
	event_id: stringType(),
	event_type: stringType(),
	params: recordType(unknownType()).optional()
});
/**
* Paginated list of billing events for a workspace.
*/
var zBillingEventsResponse = objectType({
	events: arrayType(zBillingEvent),
	limit: numberType().int(),
	page: numberType().int(),
	total: numberType().int(),
	totalPages: numberType().int()
});
/**
* A billing address for a company Stripe customer. city and postal_code
* are optional because some countries (e.g. Hong Kong, the UAE, Panama)
* have no postal code and are not collected for them; Stripe validates
* what a given country actually requires.
*
*/
var zBillingAddress = objectType({
	city: stringType().optional(),
	country: stringType(),
	line1: stringType(),
	line2: stringType().optional(),
	postal_code: stringType().optional(),
	state: stringType().optional()
});
objectType({
	address: zBillingAddress.optional(),
	company_name: stringType().optional(),
	tax_id: zBillingTaxId.optional()
});
objectType({
	address: zBillingAddress.optional(),
	company_name: stringType().optional(),
	tax_id: zBillingTaxId.optional()
});
var zBillingCapabilityScope = objectType({
	user_id: stringType(),
	workspace_id: stringType()
});
/**
* Identifies capability values currently using safe rollout defaults
* instead of deterministic policy results. A true value is UI guidance,
* not evidence that the corresponding write will succeed.
*
*/
var zBillingCapabilityRolloutDefaults = objectType({
	can_downgrade_to_personal: booleanType(),
	can_subscribe_self_serve: booleanType(),
	can_top_up: booleanType()
});
/**
* Why a capability resolved false, keyed by the capability. The value
* names the policy branch that decided, not customer-facing wording: the
* client owns the message.
*
* The invariant runs one way only. **Presence implies refusal**: a key is
* present only alongside `capabilities.<key> == false`, reconciled before
* the response is built, so a reason never accompanies a granted
* capability. **Absence implies nothing** -- it means no recognised
* explanation, not that the capability was granted. Consult
* `capabilities`, which stays authoritative for what the client may offer.
*
* A key is absent for a refused capability whenever this service is
* talking to a billing-api that predates the field, and whenever it drops
* a reason it does not recognise rather than forwarding a value outside
* the enum below. Both are supported states, so a client must never infer
* a capability's value from a missing reason -- only from `capabilities`.
*
* This endpoint omits the entire `denied_reasons` object when no recognised
* reason survives. The billing-api endpoint may emit `{}` for the same
* logical state, so object presence must not be used to detect support.
*
*/
var zBillingCapabilityDenials = objectType({ can_subscribe_self_serve: enumType([
	"not_a_member",
	"not_workspace_owner",
	"tier_not_self_serve",
	"subscription_not_started",
	"subscription_change_in_progress",
	"subscription_status_unrecognized"
]).optional() });
/**
* Conservative UI guidance. These values do not authorize billing writes;
* each write endpoint independently enforces its permission policy.
*
*/
var zBillingCapabilities = objectType({
	can_cancel: booleanType(),
	can_change_seats: booleanType(),
	can_downgrade_to_personal: booleanType(),
	can_invite_members: booleanType(),
	can_reactivate: booleanType(),
	can_revert_scheduled_change: booleanType(),
	can_subscribe_self_serve: booleanType(),
	can_top_up: booleanType()
});
objectType({
	capabilities: zBillingCapabilities,
	denied_reasons: zBillingCapabilityDenials.optional(),
	expires_at: stringType().datetime(),
	resolved_for: zBillingCapabilityScope,
	revision: coerce.bigint().min(BigInt("-9223372036854775808"), { message: "Invalid value: Expected int64 to be >= -9223372036854775808" }).lte(BigInt(9007199254740991)),
	rollout_defaults_applied: zBillingCapabilityRolloutDefaults,
	subscription_state_authoritative: booleanType().optional()
});
/**
* Current credit balance and usage details for a workspace. Every amount here is CENTS of `currency`. The `*_micros` fields are a misnamed legacy set kept for wire compatibility; the `*_cents` fields beside them carry the identical values under honest names. `amount_micros` stays required and `amount_cents` is optional so existing strict clients are unaffected.
*/
var zBillingBalanceResponse = objectType({
	amount_cents: numberType().optional(),
	amount_micros: numberType(),
	cloud_credit_balance_cents: numberType().optional(),
	cloud_credit_balance_micros: numberType().optional(),
	currency: stringType(),
	effective_balance_authoritative: booleanType().optional(),
	effective_balance_cents: numberType().optional(),
	effective_balance_micros: numberType().optional(),
	pending_charges_cents: numberType().optional(),
	pending_charges_micros: numberType().optional(),
	prepaid_balance_cents: numberType().optional(),
	prepaid_balance_micros: numberType().optional()
});
objectType({
	expires_in: numberType().int().optional(),
	method: enumType([
		"sso",
		"password",
		"session",
		"firebase"
	]),
	organization_name: stringType().optional(),
	start_url: stringType().optional()
});
objectType({
	email: stringType().max(320),
	password: stringType().max(4096).optional()
});
objectType({
	code: stringType(),
	message: stringType(),
	organization_id: stringType().optional(),
	start_url: stringType().optional()
});
objectType({
	display_name: stringType().nullish(),
	file_path: stringType().nullish(),
	hash: stringType().regex(/^blake3:[a-f0-9]{64}$/).optional(),
	id: stringType().uuid(),
	job_id: stringType().uuid().nullish(),
	loader_path: stringType().nullish(),
	mime_type: stringType().optional(),
	name: stringType().optional(),
	tags: arrayType(stringType()).optional(),
	updated_at: stringType().datetime(),
	user_metadata: recordType(unknownType()).optional()
});
objectType({ tag_counts: recordType(numberType().int()) });
objectType({
	content_length: coerce.bigint().min(BigInt("-9223372036854775808"), { message: "Invalid value: Expected int64 to be >= -9223372036854775808" }).max(BigInt("9223372036854775807"), { message: "Invalid value: Expected int64 to be <= 9223372036854775807" }),
	content_type: stringType().optional(),
	filename: stringType().optional(),
	name: stringType().optional(),
	preview_image: stringType().optional(),
	tags: arrayType(stringType()).optional(),
	validation: zValidationResult.optional()
});
/**
* Acknowledgement of an async asset download task; clients poll GET /api/tasks/{task_id} for status.
*/
var zAssetDownloadResponse = objectType({
	message: stringType().optional(),
	status: enumType([
		"created",
		"running",
		"completed",
		"failed",
		"cancelled"
	]),
	task_id: stringType().uuid()
});
/**
* Response returned when a new asset is successfully created.
*/
var zAssetCreated = zAsset.and(objectType({ created_new: booleanType() }));
objectType({
	message_id: stringType(),
	thread_id: stringType()
});
/**
* One agent thread row for the history sidebar.
*/
var zAgentThreadSummary = objectType({
	created_at: stringType(),
	id: stringType(),
	last_message_at: stringType(),
	message_count: numberType().int().gte(0),
	preview: stringType(),
	status: enumType(["active", "archived"]),
	title: stringType(),
	updated_at: stringType(),
	workflow_id: stringType()
});
objectType({
	pagination: zPaginationInfo,
	threads: arrayType(zAgentThreadSummary)
});
objectType({ thread_id: stringType() });
objectType({ workflow_id: stringType().optional() });
objectType({
	always: booleanType().optional().default(false),
	body: stringType(),
	description: stringType().max(1024),
	name: stringType().max(64).regex(/^[A-Za-z0-9._-]*[A-Za-z0-9_-][A-Za-z0-9._-]*$/)
});
/**
* One of the caller's user-authored skill packs.
*/
var zAgentSkill = objectType({
	body: stringType(),
	body_hash: stringType(),
	created_at: stringType(),
	description: stringType(),
	id: stringType(),
	name: stringType(),
	updated_at: stringType()
});
/**
* The caller's skill packs, ordered by name.
*/
var zAgentSkillListResponse = objectType({ skills: arrayType(zAgentSkill) });
objectType({
	credit_limit: numberType().int().gte(1).lte(2147483647).nullish(),
	mode: enumType([
		"ask_approval",
		"auto",
		"auto_limited"
	])
});
objectType({
	credit_limit: numberType().int().gte(1).lte(2147483647).nullable(),
	mode: enumType([
		"ask_approval",
		"auto",
		"auto_limited"
	])
});
/**
* The `context` of a `run_approval` ask. Ids and a display name, never the user's prose.
*/
var zAgentRunApprovalContext = objectType({
	workflow_id: stringType(),
	workflow_name: stringType().optional()
});
/**
* Which card renders an ask. `ask_user` is the generic prompt raised by the ask_user tool. `run_approval` is the run consent card raised when the caller's ask_approval run mode gates a run: exactly the Run and Cancel options, never free text. `paused` is the admission pause card: one Resume option, never free text. `delete_approval` is the delete consent card for nodes the user made: exactly the Delete and Keep options, never free text. The same value is the agent_ask event's `kind`, the message list's `pending_ask.kind`, and an entry of `ask_kinds` on the message POST.
*/
var zAgentAskKind = enumType([
	"ask_user",
	"run_approval",
	"paused",
	"delete_approval"
]);
objectType({
	ask_kinds: arrayType(zAgentAskKind).optional(),
	attachments: arrayType(stringType()).optional(),
	client_id: stringType().optional(),
	client_message_id: stringType().max(128).optional(),
	content: stringType(),
	current_tab: stringType().optional(),
	current_tab_unbound: booleanType().optional(),
	draft: objectType({ content: recordType(unknownType()).optional() }).optional(),
	open_tabs: arrayType(objectType({
		name: stringType().optional(),
		workflow_id: stringType()
	})).optional(),
	selection: recordType(unknownType()).optional(),
	workflow_id: stringType().optional(),
	workflow_references: arrayType(objectType({
		name: stringType().optional(),
		workflow_id: stringType()
	})).optional()
});
var zAgentAskOption = objectType({
	description: stringType().optional(),
	id: stringType(),
	label: stringType()
});
/**
* The fields every pending ask carries, whatever its kind.
*/
var zAgentPendingAskBase = objectType({
	allow_other: booleanType(),
	ask_id: stringType(),
	kind: zAgentAskKind,
	max_selections: numberType().int(),
	message_id: stringType(),
	min_selections: numberType().int(),
	options: arrayType(zAgentAskOption),
	prompt: stringType()
});
/**
* A pending `run_approval` consent card.
*/
var zAgentPendingRunApproval = zAgentPendingAskBase.and(objectType({
	context: zAgentRunApprovalContext,
	kind: enumType(["run_approval"])
}));
/**
* The `context` of a `paused` ask.
*/
var zAgentPausedContext = objectType({
	message: stringType(),
	reason: stringType(),
	recheck_after_seconds: numberType().int()
});
/**
* A pending `paused` admission card.
*/
var zAgentPendingPaused = zAgentPendingAskBase.and(objectType({
	context: zAgentPausedContext,
	kind: enumType(["paused"])
}));
/**
* One node a `delete_approval` ask names, read from the turn's workflow.
*/
var zAgentAskNodeRef = objectType({
	id: stringType(),
	title: stringType().optional(),
	type: stringType().optional()
});
/**
* The `context` of a `delete_approval` ask: the user-made nodes the agent's delete would remove. The server always lists at least one node, and lists at most 50; any more are counted in `hidden_node_count`, so the card can say how many it did not list.
*/
var zAgentDeleteApprovalContext = objectType({
	action: enumType(["delete_nodes"]),
	hidden_node_count: numberType().int().gte(1).optional(),
	nodes: arrayType(zAgentAskNodeRef).min(1).max(50)
});
/**
* A pending `delete_approval` consent card.
*/
var zAgentPendingDeleteApproval = zAgentPendingAskBase.and(objectType({
	context: zAgentDeleteApprovalContext,
	kind: enumType(["delete_approval"])
}));
/**
* A pending `ask_user` prompt. It carries no context.
*/
var zAgentPendingAskUser = zAgentPendingAskBase.and(objectType({ kind: enumType(["ask_user"]) }));
/**
* An unanswered ask attached to its assistant message, so a reload rehydrates the prompt from the ROW rather than from the agent_ask WebSocket event the client missed. Present only while the ask is pending; answer it via POST /agent/threads/{id}/asks/{ask_id}/answer. Discriminated on `kind`: narrowing on it gives the kind's `context` schema. The agent_ask WebSocket event's `data` is this same shape plus `thread_id`.
*/
var zAgentPendingAsk = unionType([
	objectType({ kind: literalType("ask_user") }).and(zAgentPendingAskUser),
	objectType({ kind: literalType("run_approval") }).and(zAgentPendingRunApproval),
	objectType({ kind: literalType("paused") }).and(zAgentPendingPaused),
	objectType({ kind: literalType("delete_approval") }).and(zAgentPendingDeleteApproval)
]);
/**
* A persisted message in an agent thread.
*/
var zAgentMessage = objectType({
	content: objectType({ tool_calls: arrayType(zToolCallSummary).optional() }).optional(),
	id: stringType(),
	pending_ask: zAgentPendingAsk.optional(),
	role: enumType([
		"user",
		"assistant",
		"tool",
		"system"
	]),
	seq: numberType().int(),
	status: enumType([
		"streaming",
		"complete",
		"error",
		"interrupted"
	]),
	thread_id: stringType(),
	turn_id: stringType(),
	workflow_id: stringType().optional()
});
objectType({
	user_id: stringType(),
	workspace_id: stringType()
});
objectType({ error: stringType() });
objectType({
	content: recordType(unknownType()),
	version: numberType().int()
});
objectType({
	code: enumType(["cancel_not_requested", "cancel_outcome_unknown"]),
	error: stringType(),
	retryable: booleanType()
});
objectType({ status: enumType(["cancelling"]) });
/**
* How an ask left pending, as stored on the ask row. `answered` means an answer was committed and delivered to the turn; `cancelled` means the turn ended, was stopped, or could not take the answer; `expired` means the ask timed out. There is no "unknown" status: when an answer request fails with a 5xx the client does not know the outcome and should wait for agent_ask_resolved or refetch the thread.
*/
var zAgentAskStatus = enumType([
	"answered",
	"cancelled",
	"expired"
]);
/**
* The `data` of an agent_ask_resolved WebSocket event: the outcome the server committed to the ask row. Every open tab gets the same frame, including tabs that did not send the answer, so a client reads the answer that won from here and never infers it from what it sent.
*/
var zAgentAskResolvedData = objectType({
	ask_id: stringType(),
	message_id: stringType(),
	other_text: stringType().optional(),
	selected: arrayType(stringType()).nullable(),
	status: zAgentAskStatus,
	thread_id: stringType()
});
/**
* Server-to-client agent_ask_resolved frame on /ws. An ask left pending.
*/
var zAgentAskResolvedFrame = objectType({
	data: zAgentAskResolvedData,
	type: enumType(["agent_ask_resolved"])
});
/**
* Server-to-client agent_ask frame on /ws. A turn is parked on this ask.
*/
var zAgentAskFrame = objectType({
	data: zAgentPendingAsk.and(objectType({ thread_id: stringType() })),
	type: enumType(["agent_ask"])
});
unionType([zAgentAskFrame, zAgentAskResolvedFrame]);
objectType({
	error: stringType(),
	other_text: stringType().optional(),
	selected: arrayType(stringType()).nullish(),
	status: zAgentAskStatus.optional()
});
objectType({
	other_text: stringType().optional(),
	selected: arrayType(stringType())
});
objectType({
	other_text: stringType().optional(),
	selected: arrayType(stringType()),
	status: enumType(["answered"])
});
objectType({ error: objectType({
	message: stringType(),
	reason: enumType([
		"no_funds",
		"manual_block",
		"funds_unavailable"
	]),
	type: enumType(["PAYMENT_REQUIRED", "SERVICE_UNAVAILABLE"])
}) });
objectType({
	workspace_id: stringType(),
	workspace_name: stringType()
});
/**
* Represents a user-owned asset (image, video, or other generated output).
*/
var zAssetWritable = objectType({
	created_at: stringType().datetime(),
	display_name: stringType().nullish(),
	file_path: stringType().nullish(),
	hash: stringType().regex(/^blake3:[a-f0-9]{64}$/).optional(),
	id: stringType().uuid(),
	is_immutable: booleanType().optional(),
	job_id: stringType().uuid().nullish(),
	last_access_time: stringType().datetime().optional(),
	loader_path: stringType().nullish(),
	mime_type: stringType().optional(),
	name: stringType(),
	preview_id: stringType().uuid().nullish(),
	preview_url: stringType().url().optional(),
	short_url: stringType().nullish(),
	size: coerce.bigint().min(BigInt("-9223372036854775808"), { message: "Invalid value: Expected int64 to be >= -9223372036854775808" }).max(BigInt("9223372036854775807"), { message: "Invalid value: Expected int64 to be <= 9223372036854775807" }).optional(),
	tags: arrayType(stringType()).optional(),
	updated_at: stringType().datetime(),
	user_metadata: recordType(unknownType()).optional()
});
objectType({
	assets: arrayType(zAssetWritable),
	has_more: booleanType(),
	next_cursor: stringType().optional(),
	total: numberType().int()
});
zAssetWritable.and(objectType({ created_new: booleanType() }));
stringType();
objectType({ resourcePath: stringType().regex(/^[a-zA-Z0-9._-]+$/) });
objectType({ path: stringType() });
objectType({ path: stringType() });
objectType({ workflow_id: stringType() });
objectType({
	token: stringType().optional(),
	workspace_id: stringType().optional()
});
objectType({
	message_id: stringType().optional(),
	step: numberType().int().gte(0),
	turn_id: stringType()
});
objectType({
	after_seconds: numberType().int().optional(),
	kind: enumType([
		"proceed",
		"wait",
		"pause",
		"fail"
	]),
	message: stringType().optional(),
	position: numberType().int().optional(),
	reason: stringType().optional()
});
recordType(unknownType());
stringType();
objectType({ name: stringType().max(64).regex(/^[A-Za-z0-9._-]*[A-Za-z0-9_-][A-Za-z0-9._-]*$/) });
voidType();
objectType({
	limit: numberType().int().gte(1).lte(100).optional().default(20),
	after: stringType().optional()
});
objectType({
	id: stringType(),
	ask_id: stringType()
});
objectType({ id: stringType() });
arrayType(zAgentMessage);
objectType({ id: stringType() });
objectType({
	id: stringType(),
	message_id: stringType()
});
objectType({
	include_tags: arrayType(stringType()).optional(),
	exclude_tags: arrayType(stringType()).optional(),
	tags_all: arrayType(stringType()).optional(),
	tags_any: arrayType(stringType()).optional(),
	tags_none: arrayType(stringType()).optional(),
	name_contains: stringType().optional(),
	metadata_filter: stringType().optional(),
	limit: numberType().int().gte(1).lte(500).optional().default(20),
	offset: numberType().int().gte(0).optional().default(0),
	sort: enumType([
		"name",
		"created_at",
		"updated_at",
		"size",
		"last_access_time"
	]).optional().default("created_at"),
	order: enumType(["asc", "desc"]).optional().default("desc"),
	include_public: booleanType().optional().default(true),
	hash: stringType().optional(),
	after: stringType().optional()
});
objectType({
	file: stringType(),
	hash: stringType().regex(/^(blake3|sha256):[a-f0-9]{64}$/).optional(),
	id: stringType().uuid().optional(),
	mime_type: stringType().optional(),
	name: stringType().optional(),
	preview_id: stringType().uuid().optional(),
	tags: stringType().optional(),
	user_metadata: stringType().optional()
});
objectType({ id: stringType().uuid() });
voidType();
objectType({ id: stringType().uuid() });
objectType({
	mime_type: stringType().optional(),
	name: stringType().optional(),
	preview_id: stringType().uuid().optional(),
	user_metadata: recordType(unknownType()).optional()
});
objectType({ id: stringType().uuid() });
objectType({ id: stringType() });
objectType({
	disposition: enumType(["inline", "attachment"]).optional().default("attachment"),
	workspace_id: stringType().optional()
});
stringType();
objectType({ tags: arrayType(stringType()).min(1) });
objectType({ id: stringType().uuid() });
objectType({ tags: arrayType(stringType()).min(1) });
objectType({ id: stringType().uuid() });
objectType({
	preview_id: stringType().uuid().optional(),
	source_url: stringType().url(),
	tags: arrayType(stringType()).optional(),
	user_metadata: recordType(unknownType()).optional()
});
unionType([zAssetCreated, zAssetDownloadResponse]);
objectType({
	asset_ids: arrayType(stringType()).optional(),
	include_previews: booleanType().optional().default(false),
	job_asset_name_filters: recordType(arrayType(stringType()).min(1)).optional(),
	job_ids: arrayType(stringType()).optional(),
	naming_strategy: enumType([
		"group_by_job_id",
		"preserve",
		"asset_id",
		"group_by_job_time"
	]).optional().default("group_by_job_time")
});
objectType({ exportName: stringType().regex(/^[a-zA-Z0-9_-]+\.zip$/) });
objectType({
	hash: stringType().regex(/^blake3:[a-f0-9]{64}$/),
	mime_type: stringType().optional(),
	name: stringType().optional(),
	tags: arrayType(stringType()).min(1),
	user_metadata: recordType(unknownType()).optional()
});
/**
* Success
*/
var zPostAssetsFromWorkflowResponse = zWorkflowApiAssetsResponse;
objectType({ hash: stringType().regex(/^blake3:[a-f0-9]{64}$/) });
objectType({
	marked: numberType().int().optional(),
	status: stringType().optional()
});
objectType({ url: stringType().url() });
objectType({ roots: arrayType(stringType()).optional() });
objectType({ status: stringType().optional() });
objectType({ status: stringType().optional() });
recordType(unknownType());
objectType({
	include_tags: arrayType(stringType()).optional(),
	exclude_tags: arrayType(stringType()).optional(),
	tags_all: arrayType(stringType()).optional(),
	tags_any: arrayType(stringType()).optional(),
	tags_none: arrayType(stringType()).optional(),
	name_contains: stringType().optional(),
	metadata_filter: stringType().optional(),
	limit: numberType().int().gte(1).lte(1e3).optional().default(100),
	include_public: booleanType().optional().default(true)
});
/**
* The live session
*/
var zGetSessionResponse = zWebSessionResponse;
var zDiscoverSsoBody = objectType({ email: stringType().max(320) });
/**
* Whether the email's domain belongs to an SSO organization
*/
var zDiscoverSsoResponse = zSsoDiscoverResponse;
objectType({
	page: numberType().int().gte(1).optional().default(1),
	limit: numberType().int().gte(1).lte(100).optional().default(20),
	scope: enumType([
		"self",
		"workspace",
		"user"
	]).optional().default("self"),
	user_id: stringType().optional(),
	filter: stringType().optional(),
	start_date: stringType().datetime().optional(),
	end_date: stringType().datetime().optional()
});
/**
* Paginated billing events
*/
var zGetBillingEventsResponse = zBillingEventsResponse;
objectType({ id: stringType() });
objectType({ id: stringType() });
/**
* Canceled; nothing was charged. Also returned for an operation already discarded or expired without authentication, so a repeat is safe.
*/
var zCancelBillingOpResponse = zBillingOpCancelResponse;
/**
* Saved payment methods
*/
var zListSavedPaymentMethodsResponse = arrayType(zSavedPaymentMethod);
/**
* Available plans with pricing
*/
var zGetBillingPlansResponse = zBillingPlansResponse;
voidType();
var zCancelSubscriptionResponse2 = unionType([zCancelSubscriptionResponse, zCancelSubscriptionAcceptedResponse]);
objectType({
	group_by: enumType([
		"model",
		"endpoint",
		"product",
		"product_line",
		"person",
		"source"
	]).optional().default("model"),
	granularity: enumType([
		"hour",
		"day",
		"month"
	]).optional().default("month"),
	starting_on: stringType().datetime().optional(),
	ending_before: stringType().datetime().optional(),
	months: numberType().int().gte(1).lte(24).optional().default(6)
});
/**
* Embedding names
*/
var zGetEmbeddingsResponse = arrayType(stringType());
arrayType(zModelFolder);
objectType({ folder: stringType() });
arrayType(zModelFile);
objectType({
	folder: stringType(),
	path_index: numberType().int(),
	filename: stringType()
});
objectType({ id: stringType() });
/**
* URL paths (relative to web root) of available extension JS files
*/
var zGetExtensionsResponse = arrayType(stringType());
objectType({
	"agent-free-use-message-placement": enumType([
		"control",
		"top-banner",
		"near-composer",
		"above-input",
		"inside-input"
	]).default("control"),
	"agent-starter-prompt-set": enumType(["control", "test"]).optional().default("control"),
	billing_web_url: stringType().optional(),
	can_run_partner_nodes: booleanType().optional(),
	free_tier_balance: objectType({
		allowance: numberType().int(),
		remaining: numberType().int(),
		used: numberType().int()
	}).optional(),
	free_tier_offer: objectType({
		job_allowance: numberType().int(),
		requires_google_sign_in: booleanType()
	}).optional(),
	max_upload_size: numberType().int().optional(),
	new_free_tier_subscriptions: booleanType().optional(),
	sso_enabled: booleanType().optional(),
	stripe_publishable_key: stringType().optional(),
	supports_preview_metadata: booleanType().optional(),
	web_session_probe: booleanType().optional()
});
objectType({ filename: stringType() });
objectType({
	mask: stringType().nullish(),
	paint: stringType().nullish(),
	painted: stringType().nullish(),
	painted_masked: stringType().nullish()
});
objectType({
	free_memory: booleanType().optional(),
	unload_models: booleanType().optional()
});
objectType({ key: zGlobalSettingKey });
voidType();
objectType({ key: zGlobalSettingKey });
recordType(zGlobalSubgraphInfo);
objectType({ id: stringType() });
objectType({ prompt_id: stringType() });
objectType({
	max_items: numberType().int().optional(),
	offset: numberType().int().optional().default(0)
});
objectType({ prompt_id: stringType() });
objectType({ type: enumType([
	"tag",
	"model",
	"custom_node"
]).optional() });
objectType({ username: stringType() });
objectType({ username: stringType() });
objectType({ username: stringType() });
objectType({
	cursor: stringType().optional(),
	limit: numberType().int().gte(1).lte(100).optional().default(20),
	search: stringType().optional(),
	tag: stringType().optional(),
	username: stringType().optional(),
	detail: booleanType().optional().default(false),
	status: arrayType(zHubWorkflowStatus).optional()
});
objectType({ share_id: stringType() });
voidType();
objectType({ share_id: stringType() });
/**
* Hub workflow detail
*/
var zGetHubWorkflowResponse = zHubWorkflowDetail;
objectType({ status: arrayType(zHubWorkflowStatus).optional() });
arrayType(zHubWorkflowTemplateEntry);
recordType(unknownType());
objectType({ token: stringType() });
objectType({ job_id: stringType() });
objectType({ job_id: stringType() });
objectType({ job_id: stringType().uuid() });
objectType({
	status: stringType().optional(),
	workflow_id: stringType().optional(),
	output_type: enumType([
		"image",
		"video",
		"audio",
		"3d"
	]).optional(),
	sort_by: enumType(["create_time", "execution_time"]).optional().default("create_time"),
	sort_order: enumType(["asc", "desc"]).optional().default("desc"),
	after: stringType().optional(),
	offset: numberType().int().gte(0).optional().default(0),
	limit: numberType().int().gte(1).lte(1e3).optional().default(100)
});
objectType({ job_id: stringType().uuid() });
objectType({ short_link: enumType(["ephemeral_tool_chain", "default"]).optional() });
objectType({ job_id: stringType().uuid() });
objectType({
	limit: numberType().int().gte(1).lte(500).optional().default(20),
	offset: numberType().int().gte(0).optional().default(0)
});
objectType({ job_id: stringType().uuid() });
objectType({ folder: stringType() });
recordType(unknownType());
objectType({ include_user_models: booleanType().optional().default(false) });
recordType(zNodeInfo);
objectType({ node_class: stringType() });
objectType({ prompt_id: stringType() });
objectType({ id: stringType().uuid() });
voidType();
objectType({ id: stringType().uuid() });
objectType({ id: stringType().uuid() });
recordType(unknownType());
recordType(unknownType());
recordType(unknownType());
objectType({ id: stringType() });
objectType({ value: unknownType().optional() });
unknownType();
objectType({ id: stringType() });
objectType({ value: unknownType().optional() });
objectType({
	prefix: stringType().optional(),
	limit: numberType().int().gte(1).lte(1e3).optional().default(100),
	offset: numberType().int().gte(0).optional().default(0),
	order: enumType(["count_desc", "name_asc"]).optional().default("count_desc"),
	include_zero: booleanType().optional().default(false),
	include_public: booleanType().optional().default(true)
});
objectType({
	task_name: stringType().optional(),
	idempotency_key: stringType().optional(),
	status: stringType().optional(),
	created_after: stringType().datetime().optional(),
	created_before: stringType().datetime().optional(),
	sort_order: enumType(["asc", "desc"]).optional().default("desc"),
	offset: numberType().int().gte(0).optional().default(0),
	limit: numberType().int().gte(1).lte(100).optional().default(20)
});
objectType({ task_id: stringType().uuid() });
voidType();
objectType({ task_id: stringType().uuid() });
objectType({
	image: stringType(),
	overwrite: stringType().optional(),
	subfolder: stringType().optional(),
	type: stringType().optional()
});
/**
* Image uploaded successfully
*/
var zUploadImageResponse = objectType({
	name: stringType().optional(),
	subfolder: stringType().optional(),
	type: stringType().optional()
});
objectType({
	image: stringType(),
	original_ref: stringType()
});
objectType({
	name: stringType().optional(),
	subfolder: stringType().optional(),
	type: stringType().optional()
});
stringType();
objectType({ upload_id: stringType() });
unionType([zInputUploadResponse, zWorkflowResponse]);
objectType({
	dir: stringType().optional(),
	recurse: booleanType().optional().default(false),
	split: booleanType().optional().default(false),
	full_info: booleanType().optional().default(false)
});
objectType({ file: stringType() });
voidType();
objectType({ file: stringType() });
stringType();
stringType();
objectType({ file: stringType() });
objectType({
	overwrite: enumType(["true", "false"]).optional().default("true"),
	full_info: enumType(["true", "false"]).optional().default("false")
});
objectType({
	file: stringType(),
	dest: stringType()
});
objectType({ overwrite: enumType(["true", "false"]).optional().default("true") });
objectType({ file: stringType() });
objectType({ file: stringType() });
objectType({
	migrated: booleanType(),
	storage: stringType()
});
objectType({
	filename: stringType(),
	workspace_id: stringType().optional()
});
objectType({ source: objectType({
	duration: numberType(),
	fps: numberType(),
	frames: numberType().int(),
	size: tupleType([numberType().int(), numberType().int()])
}) });
objectType({
	filename: stringType(),
	type: stringType().optional(),
	subfolder: stringType().optional(),
	channel: stringType().optional(),
	res: numberType().int().gte(64).lte(1024).optional(),
	workspace_id: stringType().optional()
});
stringType();
objectType({
	filename: stringType(),
	type: stringType().optional(),
	subfolder: stringType().optional(),
	channel: stringType().optional(),
	res: numberType().int().gte(64).lte(1024).optional(),
	workspace_id: stringType().optional()
});
stringType();
objectType({
	filename: stringType(),
	subfolder: stringType().optional(),
	type: stringType().optional(),
	fullpath: stringType().optional(),
	format: stringType().optional(),
	frame_rate: numberType().int().optional(),
	workflow: stringType().optional(),
	timestamp: numberType().int().optional(),
	channel: stringType().optional(),
	res: numberType().int().gte(64).lte(1024).optional(),
	workspace_id: stringType().optional()
});
stringType();
objectType({ folder_name: stringType() });
objectType({
	filename: stringType(),
	channel: stringType().optional(),
	res: numberType().int().gte(64).lte(1024).optional(),
	workspace_id: stringType().optional()
});
stringType();
recordType(unknownType());
objectType({
	limit: numberType().int().lte(100).optional().default(20),
	offset: numberType().int().optional().default(0),
	name: stringType().optional(),
	default_view: enumType(["workflow", "app"]).optional(),
	sort: enumType([
		"create_time",
		"update_time",
		"name"
	]).optional().default("create_time"),
	order: enumType(["asc", "desc"]).optional().default("desc")
});
objectType({ workflow_id: stringType() });
voidType();
objectType({ workflow_id: stringType() });
objectType({ workflow_id: stringType() });
objectType({ workflow_id: stringType() });
objectType({ workflow_id: stringType() });
objectType({ workflow_id: stringType() });
objectType({ share_id: stringType() });
objectType({ include_revoked: booleanType().optional().default(false) });
objectType({ id: stringType().uuid() });
voidType();
objectType({ inviteId: stringType() });
voidType();
objectType({ inviteId: stringType() });
voidType();
objectType({
	offset: numberType().int().gte(0).optional().default(0),
	limit: numberType().int().gte(1).lte(100).optional().default(20)
});
objectType({ user_id: stringType().min(1) });
objectType({ userId: stringType() });
voidType();
objectType({ userId: stringType() });
objectType({ id: stringType() });
voidType();
objectType({ id: stringType() });
objectType({ id: stringType() });
objectType({ path: stringType() });
objectType({ file: stringType() });
stringType();
recordType(arrayType(arrayType(stringType())));
stringType();
objectType({
	entries: arrayType(objectType({
		m: stringType().optional(),
		t: numberType().optional()
	})).optional(),
	size: objectType({
		cols: numberType().int().optional(),
		rows: numberType().int().optional()
	}).optional()
});
objectType({
	clientId: stringType(),
	enabled: booleanType()
});
objectType({ path: stringType() });
objectType({
	response_type: stringType().optional(),
	client_id: stringType().optional(),
	redirect_uri: stringType().optional(),
	scope: stringType().optional(),
	state: stringType().optional(),
	code_challenge: stringType().optional(),
	code_challenge_method: stringType().optional(),
	resource: stringType().optional(),
	oauth_request_id: stringType().optional()
});
objectType({
	csrf_token: stringType(),
	decision: enumType(["allow", "deny"]),
	oauth_request_id: stringType().uuid(),
	workspace_id: stringType()
});
objectType({
	client_id: stringType(),
	client_secret: stringType().optional(),
	code: stringType().optional(),
	code_verifier: stringType().optional(),
	grant_type: enumType(["authorization_code", "refresh_token"]),
	redirect_uri: stringType().optional(),
	refresh_token: stringType().optional(),
	scope: stringType().optional()
});
objectType({ path: stringType() });
objectType({
	filename: stringType(),
	channel: stringType().optional(),
	res: numberType().int().gte(64).lte(1024).optional(),
	workspace_id: stringType().optional()
});
stringType();
objectType({
	token: stringType().optional(),
	workspace_id: stringType().optional(),
	clientId: stringType().optional()
});
//#endregion
export { zWebSessionUser as $, zGetEmbeddingsResponse as A, zPostAssetsFromWorkflowResponse as B, zDeleteSessionResponse as C, zExchangeTokenResponse as D, zErrorResponse as E, zHubProfile as F, zResubscribeResponse as G, zPreviewSubscribeRequest as H, zJobEntry as I, zSubscribeResponse as J, zRevokeAllSessionsResponse as K, zListAssetsResponse as L, zGetHubWorkflowResponse as M, zGetSessionResponse as N, zGetBillingEventsResponse as O, zGlobalSetting as P, zUploadImageResponse as Q, zListSavedPaymentMethodsResponse as R, zCurrentWorkspaceResponse as S, zDiscoverSsoResponse as T, zPreviewSubscribeResponse as U, zPreviewPlanInfo as V, zPromptErrorResponse as W, zTaskResponse as X, zSubscriptionDiscount as Y, zTopupQuoteResponse as Z, zCreateSessionResponse as _, zBillingBalanceResponse as a, zCreateTopupRequest as b, zBillingCapabilityScope as c, zBillingOpReceiptPlan as d, zWorkspaceWithRole as et, zBillingOpStatusResponse as f, zChurnkeyAuthResponse as g, zCancelSubscriptionResponse2 as h, zAssetInfo as i, zGetExtensionsResponse as j, zGetBillingPlansResponse as k, zBillingOpChargeBreakdown as l, zCancelBillingOpResponse as m, zAgentSkillListResponse as n, zBillingCapabilities as o, zBillingStatusResponse as p, zSubscribeRequest as q, zAsset as r, zBillingCapabilityRolloutDefaults as s, zAgentSkill as t, zBillingOpChargeReason as u, zCreateTopupCheckoutRequest as v, zDiscoverSsoBody as w, zCreateTopupResponse as x, zCreateTopupCheckoutResponse as y, zPaymentPortalResponse as z };
