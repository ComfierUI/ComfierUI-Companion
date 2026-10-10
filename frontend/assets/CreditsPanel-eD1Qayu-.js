import "./rolldown-runtime-xtsTai4I.js";
import { Lt as clamp } from "./vendor-other-BPEcPQTD.js";
import { Dt as withDirectives, Et as withCtx, F as createBaseVNode, G as defineComponent, H as createTextVNode, I as createBlock, Jt as normalizeClass, Kt as unref, L as createCommentVNode, Lt as ref, O as Fragment, P as computed, R as createElementBlock, St as watch, U as createVNode, Wt as toValue, Xt as normalizeStyle, Zt as toDisplayString, dt as renderList, lt as openBlock, mt as resolveDirective, ot as onMounted } from "./vendor-vue-core-C1utdb0s.js";
import { x as useEventListener } from "./vendor-vueuse-BxKIIsKg.js";
import { Ar as toTierKey, Dr as isSalesManagedTier, Gl as workspaceApi, Jc as isAbortError, Nn as useSubscriptionDialog, On as useBillingContext, Sr as getTierCredits, Wl as useTeamWorkspaceStore, Zr as useCommandStore, er as paymentIntentSourceForAddCreditsClick, nt as useDialogService, qn as useBillingReadRail, rr as readOnRail, sr as usePendingTopup, tr as useBillingCapabilities, tt as useAuthStore, ur as useBillingRouting, vr as DEFAULT_TIER_KEY, vu as useErrorHandling } from "./layoutStore-CZsuzg91.js";
import { n as useTelemetry } from "./telemetry-IkzvF0TI.js";
import { N as webSessionResourceHeader, T as attachUnifiedRemintInterceptor } from "./api-Bt-fGt5a.js";
import { r as axios } from "./vendor-axios-QnwcNXlY.js";
import { r as useI18n } from "./vendor-i18n-BZvE7WBQ.js";
import { d as t, t as d } from "./i18n-C3J-ToPr.js";
import { t as getComfyApiBaseUrl } from "./comfyApi-CYSC9hA6.js";
import { t as cn } from "./src-DI1bBfrb.js";
import { t as Button_default } from "./Button-j0oCzR82.js";
import { u as script } from "./vendor-primevue-C3d0HJ53.js";
import { i as formatCreditsFromCents, r as formatCredits, t as centsToCredits } from "./creditsUtil-BWj6bywK.js";
import { t as useExternalLink } from "./useExternalLink-CXT6uu6Z.js";
import { t as Message_default } from "./Message-NRJmn_pf.js";
import { t as Spinner_default } from "./Spinner-B79hMIoc.js";
import { t as Badge_default } from "./Badge-DXbmxSwq.js";
import { t as Pagination_default } from "./Pagination-BWDSswkE.js";
import { a as TableBody_default, i as TableCell_default, n as TableHeader_default, o as Table_default, r as TableHead_default, t as TableRow_default } from "./TableRow-DTbUSGOo.js";
//#region src/services/customerEventsService.ts
var EventType = /* @__PURE__ */ function(EventType) {
	EventType["CREDIT_ADDED"] = "credit_added";
	EventType["ACCOUNT_CREATED"] = "account_created";
	EventType["API_USAGE_STARTED"] = "api_usage_started";
	EventType["API_USAGE_COMPLETED"] = "api_usage_completed";
	return EventType;
}({});
var customerApiClient = axios.create({
	baseURL: getComfyApiBaseUrl(),
	headers: { "Content-Type": "application/json" }
});
attachUnifiedRemintInterceptor(customerApiClient);
var useCustomerEventsService = () => {
	const isLoading = ref(false);
	const error = ref(null);
	let latestRequestId = 0;
	watch(() => getComfyApiBaseUrl(), (url) => {
		customerApiClient.defaults.baseURL = url;
	});
	const describeRequestError = (err, context, routeSpecificErrors) => {
		if (isAbortError(err)) return null;
		if (!axios.isAxiosError(err)) return `${context} failed: ${err instanceof Error ? err.message : String(err)}`;
		const axiosError = err;
		const status = axiosError.response?.status;
		if (status && routeSpecificErrors?.[status]) return routeSpecificErrors[status];
		return axiosError.response?.data.message ?? `${context} failed with status ${status}`;
	};
	const executeRequest = async (requestCall, options) => {
		const { errorContext, routeSpecificErrors } = options;
		try {
			return {
				data: (await requestCall()).data,
				errorMessage: null
			};
		} catch (err) {
			return {
				data: null,
				errorMessage: describeRequestError(err, errorContext, routeSpecificErrors)
			};
		}
	};
	function formatEventType(eventType) {
		switch (eventType) {
			case "credit_added":
			case "topup_completed": return t("credits.eventTypes.creditAdded");
			case "account_created": return t("credits.eventTypes.accountCreated");
			case "api_usage_completed": return t("credits.eventTypes.apiUsage");
			case "gpu_usage": return t("credits.eventTypes.gpuUsage");
			case "api_node_usage": return t("credits.eventTypes.apiNodeUsage");
			default: return eventType;
		}
	}
	function formatDate(dateString) {
		const date = new Date(dateString);
		return d(date, {
			month: "short",
			day: "numeric",
			hour: "2-digit",
			minute: "2-digit"
		});
	}
	function formatJsonKey(key) {
		return key.split("_").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
	}
	function formatJsonValue(value) {
		if (typeof value === "number") return value.toLocaleString();
		if (typeof value === "string") {
			const date = new Date(value);
			if (!Number.isNaN(date.getTime()) && /^\d{4}-\d{2}-\d{2}T/.test(value)) return d(date, {
				dateStyle: "medium",
				timeStyle: "short"
			});
		}
		return value;
	}
	function getEventSeverity(eventType) {
		switch (eventType) {
			case "credit_added":
			case "topup_completed": return "success";
			case "account_created": return "info";
			case "api_usage_completed":
			case "gpu_usage":
			case "api_node_usage": return "warning";
			default: return "info";
		}
	}
	function hasAdditionalInfo(event) {
		const { amount, api_name, model, ...otherParams } = event.params || {};
		return Object.keys(otherParams).length > 0;
	}
	function getTooltipContent(event) {
		const { ...params } = event.params || {};
		return Object.entries(params).map(([key, value]) => {
			return `<strong>${formatJsonKey(key)}:</strong> ${formatJsonValue(value)}`;
		}).join("<br>");
	}
	function formatAmount(amountMicros) {
		if (!amountMicros) return "0.00";
		return (amountMicros / 100).toFixed(2);
	}
	async function getMyEvents({ page = 1, limit = 10 } = {}) {
		const errorContext = "Fetching customer events";
		const routeSpecificErrors = {
			400: "Invalid input, object invalid",
			404: "Not found"
		};
		const authStore = useAuthStore();
		const requestOwner = authStore.currentUserIdentity();
		const requestId = ++latestRequestId;
		if (!authStore.hasPersonalWorkspace) {
			isLoading.value = false;
			error.value = t("toastMessages.noPersonalWorkspace");
			return null;
		}
		isLoading.value = true;
		error.value = null;
		let authHeaders;
		try {
			authHeaders = await webSessionResourceHeader() ?? await authStore.getUserAuthHeader();
		} catch (err) {
			if (requestId !== latestRequestId) return null;
			isLoading.value = false;
			error.value = describeRequestError(err, errorContext);
			return null;
		}
		if (requestId !== latestRequestId) return null;
		if (authStore.currentUserIdentity() !== requestOwner) {
			isLoading.value = false;
			return null;
		}
		if (!authHeaders) {
			isLoading.value = false;
			error.value = "Authentication header is missing";
			return null;
		}
		const { data, errorMessage } = await executeRequest(() => customerApiClient.get("/customers/events", {
			params: {
				page,
				limit
			},
			headers: authHeaders
		}), {
			errorContext,
			routeSpecificErrors
		});
		if (requestId !== latestRequestId) return null;
		isLoading.value = false;
		if (authStore.currentUserIdentity() !== requestOwner) return null;
		error.value = errorMessage;
		return data;
	}
	return {
		isLoading,
		error,
		getMyEvents,
		formatEventType,
		getEventSeverity,
		formatAmount,
		hasAdditionalInfo,
		formatDate,
		formatJsonKey,
		formatJsonValue,
		getTooltipContent
	};
};
//#endregion
//#region src/components/dialog/content/setting/UsageLogsTable.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1$2 = {
	key: 0,
	class: "flex items-center justify-center p-8"
};
var _hoisted_2$2 = {
	key: 1,
	class: "p-4"
};
var _hoisted_3$2 = {
	key: 0,
	class: "font-semibold text-success-background"
};
var _hoisted_4$2 = { key: 1 };
var _hoisted_5$2 = {
	key: 2,
	class: "flex flex-col gap-1"
};
var _hoisted_6$2 = { class: "font-semibold" };
var _hoisted_7$2 = { class: "text-sm text-muted-foreground" };
//#endregion
//#region src/components/dialog/content/setting/UsageLogsTable.vue
var UsageLogsTable_default = /* @__PURE__ */ defineComponent({
	__name: "UsageLogsTable",
	setup(__props, { expose: __expose }) {
		const { t } = useI18n();
		const events = ref([]);
		const loading = ref(true);
		const error = ref(null);
		const customerEventService = useCustomerEventsService();
		const { shouldUseWorkspaceBilling } = useBillingRouting();
		const pagination = ref({
			page: 1,
			limit: 7,
			total: 0
		});
		function eventAmount(event) {
			const amount = event.params?.amount;
			const value = typeof amount === "string" ? Number(amount) : amount;
			return typeof value === "number" && Number.isFinite(value) ? value : void 0;
		}
		const tooltipContentMap = computed(() => {
			const map = /* @__PURE__ */ new Map();
			events.value.forEach((event) => {
				if (customerEventService.hasAdditionalInfo(event) && event.event_id) map.set(event.event_id, customerEventService.getTooltipContent(event));
			});
			return map;
		});
		let latestLoadToken = 0;
		const readWorkspaceEvents = (params) => {
			const rail = useBillingReadRail();
			return rail === null ? workspaceApi.getBillingEvents(params) : readOnRail(() => rail.readEvents(params));
		};
		const loadEvents = async () => {
			const loadToken = ++latestLoadToken;
			loading.value = true;
			error.value = null;
			try {
				const params = {
					page: pagination.value.page,
					limit: pagination.value.limit
				};
				const response = shouldUseWorkspaceBilling.value ? await readWorkspaceEvents(params) : await customerEventService.getMyEvents(params);
				const completedTopup = usePendingTopup().consumeCompletedTopup(response?.events);
				if (completedTopup) {
					const telemetry = useTelemetry();
					telemetry?.trackApiCreditTopupSucceeded();
					telemetry?.trackBillingEvent({
						operation: "topup",
						stage: "succeeded",
						outcome: "success",
						duration_ms: Date.now() - completedTopup.startedAtMs
					});
				}
				if (loadToken !== latestLoadToken) return;
				if (response === void 0) {
					dropRenderedEvents();
					return;
				}
				if (response) {
					if (response.events) events.value = response.events;
					if (response.page) pagination.value.page = response.page;
					if (response.limit) pagination.value.limit = response.limit;
					if (response.total != null) pagination.value.total = response.total;
				} else {
					const legacyError = shouldUseWorkspaceBilling.value ? null : customerEventService.error.value;
					error.value = legacyError || t("credits.loadEventsError");
				}
			} catch (err) {
				if (loadToken !== latestLoadToken) return;
				error.value = t("credits.loadEventsUnknownError");
				console.error("Error loading events:", err);
			} finally {
				if (loadToken === latestLoadToken) loading.value = false;
			}
		};
		const onPageChange = (page) => {
			pagination.value.page = page;
			loadEvents().catch((error) => {
				console.error("Error loading events:", error);
			});
		};
		/**
		* Forget what is on screen. A superseded read and a workspace switch both mean
		* the rendered rows belong to a scope this table has left, so they go before
		* the next read rather than after it settles.
		*/
		const dropRenderedEvents = () => {
			events.value = [];
			pagination.value = {
				...pagination.value,
				page: 1,
				total: 0
			};
		};
		const refresh = async () => {
			pagination.value.page = 1;
			await loadEvents();
		};
		const workspaceStore = useTeamWorkspaceStore();
		watch([shouldUseWorkspaceBilling, () => workspaceStore.activeWorkspaceId], ([, workspaceId], previous) => {
			if (previous !== void 0 && previous[1] !== workspaceId) dropRenderedEvents();
			refresh().catch((error) => {
				console.error("Error loading events:", error);
			});
		}, { immediate: true });
		__expose({ refresh });
		return (_ctx, _cache) => {
			const _directive_tooltip = resolveDirective("tooltip");
			return openBlock(), createElementBlock("div", null, [loading.value ? (openBlock(), createElementBlock("div", _hoisted_1$2, [createVNode(Spinner_default)])) : error.value ? (openBlock(), createElementBlock("div", _hoisted_2$2, [createVNode(Message_default, { severity: "error" }, {
				default: withCtx(() => [createTextVNode(toDisplayString(error.value), 1)]),
				_: 1
			})])) : (openBlock(), createElementBlock(Fragment, { key: 2 }, [createVNode(Table_default, null, {
				default: withCtx(() => [createVNode(TableHeader_default, null, {
					default: withCtx(() => [createVNode(TableRow_default, null, {
						default: withCtx(() => [
							createVNode(TableHead_default, null, {
								default: withCtx(() => [createTextVNode(toDisplayString(_ctx.$t("credits.eventType")), 1)]),
								_: 1
							}),
							createVNode(TableHead_default, null, {
								default: withCtx(() => [createTextVNode(toDisplayString(_ctx.$t("credits.details")), 1)]),
								_: 1
							}),
							createVNode(TableHead_default, null, {
								default: withCtx(() => [createTextVNode(toDisplayString(_ctx.$t("credits.time")), 1)]),
								_: 1
							}),
							createVNode(TableHead_default, null, {
								default: withCtx(() => [createTextVNode(toDisplayString(_ctx.$t("credits.additionalInfo")), 1)]),
								_: 1
							})
						]),
						_: 1
					})]),
					_: 1
				}), createVNode(TableBody_default, null, {
					default: withCtx(() => [(openBlock(true), createElementBlock(Fragment, null, renderList(events.value, (event, index) => {
						return openBlock(), createBlock(TableRow_default, { key: event.event_id ?? index }, {
							default: withCtx(() => [
								createVNode(TableCell_default, null, {
									default: withCtx(() => [createVNode(Badge_default, {
										variant: "badge",
										severity: unref(customerEventService).getEventSeverity(event.event_type ?? "")
									}, {
										default: withCtx(() => [createTextVNode(toDisplayString(unref(customerEventService).formatEventType(event.event_type ?? "")), 1)]),
										_: 2
									}, 1032, ["severity"])]),
									_: 2
								}, 1024),
								createVNode(TableCell_default, null, {
									default: withCtx(() => [event.event_type === unref(EventType).CREDIT_ADDED ? (openBlock(), createElementBlock("div", _hoisted_3$2, toDisplayString(_ctx.$t("credits.added")) + " $" + toDisplayString(unref(customerEventService).formatAmount(eventAmount(event))), 1)) : event.event_type === unref(EventType).ACCOUNT_CREATED ? (openBlock(), createElementBlock("div", _hoisted_4$2, toDisplayString(_ctx.$t("credits.accountInitialized")), 1)) : event.event_type === unref(EventType).API_USAGE_COMPLETED ? (openBlock(), createElementBlock("div", _hoisted_5$2, [createBaseVNode("div", _hoisted_6$2, toDisplayString(event.params?.api_name || _ctx.$t("credits.api")), 1), createBaseVNode("div", _hoisted_7$2, toDisplayString(_ctx.$t("credits.model")) + ": " + toDisplayString(event.params?.model || "-"), 1)])) : createCommentVNode("", true)]),
									_: 2
								}, 1024),
								createVNode(TableCell_default, null, {
									default: withCtx(() => [createTextVNode(toDisplayString(unref(customerEventService).formatDate(event.createdAt ?? "")), 1)]),
									_: 2
								}, 1024),
								createVNode(TableCell_default, null, {
									default: withCtx(() => [unref(customerEventService).hasAdditionalInfo(event) ? withDirectives((openBlock(), createBlock(Button_default, {
										key: 0,
										variant: "textonly",
										size: "icon-sm",
										"aria-label": _ctx.$t("credits.additionalInfo")
									}, {
										default: withCtx(() => [..._cache[0] || (_cache[0] = [createBaseVNode("i", { class: "pi pi-info-circle" }, null, -1)])]),
										_: 1
									}, 8, ["aria-label"])), [[
										_directive_tooltip,
										{
											escape: false,
											value: tooltipContentMap.value.get(event.event_id ?? "") || ""
										},
										void 0,
										{ top: true }
									]]) : createCommentVNode("", true)]),
									_: 2
								}, 1024)
							]),
							_: 2
						}, 1024);
					}), 128))]),
					_: 1
				})]),
				_: 1
			}), pagination.value.total > pagination.value.limit ? (openBlock(), createBlock(Pagination_default, {
				key: 0,
				page: pagination.value.page,
				total: pagination.value.total,
				"items-per-page": pagination.value.limit,
				class: "mt-3",
				"onUpdate:page": onPageChange
			}, null, 8, [
				"page",
				"total",
				"items-per-page"
			])) : createCommentVNode("", true)], 64))]);
		};
	}
});
//#endregion
//#region src/platform/cloud/subscription/composables/useSubscriptionCredits.ts
/**
* Composable for handling subscription credit calculations and formatting.
*
* Uses useBillingContext which automatically selects the correct billing source:
* - If team workspaces feature is disabled: uses legacy (/customers)
* - If team workspaces feature is enabled:
*   - Personal workspace: uses legacy (/customers)
*   - Team workspace: uses workspace (/billing)
*/
/**
* Formats a cent value to display credits.
* Backend returns cents despite the *_micros naming convention.
*/
function formatBalance(maybeCents, locale) {
	return formatCreditsFromCents({
		cents: maybeCents ?? 0,
		locale,
		numberOptions: {
			minimumFractionDigits: 0,
			maximumFractionDigits: 0
		}
	});
}
function useSubscriptionCredits() {
	const billingContext = useBillingContext();
	const { locale } = useI18n();
	const totalCredits = computed(() => {
		return formatBalance(toValue(billingContext.balance)?.amountMicros, locale.value);
	});
	const monthlyBonusCredits = computed(() => {
		return formatBalance(toValue(billingContext.balance)?.cloudCreditBalanceMicros, locale.value);
	});
	const prepaidCredits = computed(() => {
		return formatBalance(toValue(billingContext.balance)?.prepaidBalanceMicros, locale.value);
	});
	const isLoadingBalance = computed(() => toValue(billingContext.isLoading));
	const creditsFromMicros = (maybeCents) => centsToCredits(maybeCents ?? 0);
	return {
		totalCredits,
		monthlyBonusCredits,
		prepaidCredits,
		monthlyBonusCreditsValue: computed(() => creditsFromMicros(toValue(billingContext.balance)?.cloudCreditBalanceMicros)),
		prepaidCreditsValue: computed(() => creditsFromMicros(toValue(billingContext.balance)?.prepaidBalanceMicros)),
		isLoadingBalance
	};
}
//#endregion
//#region src/platform/cloud/subscription/utils/creditsProgress.ts
/**
* Computes monthly credit usage for the credits bar. `remaining` clamps to the
* allowance, and `used` is its complement, so `used + remaining` always equals
* `monthlyTotal` — a balance above the allowance cannot read as more left than
* the plan grants.
*/
function computeMonthlyUsage(monthlyRemaining, monthlyTotal) {
	if (monthlyTotal <= 0) return {
		used: 0,
		remaining: 0,
		usedFraction: 0
	};
	const remaining = clamp(monthlyRemaining, 0, monthlyTotal);
	const used = monthlyTotal - remaining;
	return {
		used,
		remaining,
		usedFraction: used / monthlyTotal
	};
}
//#endregion
//#region src/platform/cloud/subscription/components/CreditsTile.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1$1 = { class: "flex flex-col gap-1" };
var _hoisted_2$1 = { class: "text-sm text-muted" };
var _hoisted_3$1 = {
	key: 1,
	class: "flex items-baseline gap-2"
};
var _hoisted_4$1 = { class: "text-2xl leading-none font-bold" };
var _hoisted_5$1 = { class: "text-sm text-muted @max-[300px]:hidden" };
var _hoisted_6$1 = {
	key: 0,
	class: "flex items-start gap-2 rounded-lg bg-base-background p-3 text-sm"
};
var _hoisted_7$1 = { class: "flex flex-col gap-1" };
var _hoisted_8$1 = { class: "text-base-foreground" };
var _hoisted_9 = { class: "text-muted" };
var _hoisted_10 = { class: "flex items-center justify-between text-sm" };
var _hoisted_11 = { class: "text-text-primary" };
var _hoisted_12 = { class: "text-muted" };
var _hoisted_13 = [
	"aria-valuenow",
	"aria-valuemax",
	"aria-valuetext"
];
var _hoisted_14 = { class: "flex items-center justify-between gap-2 text-sm" };
var _hoisted_15 = {
	key: 1,
	class: "text-muted @max-[300px]:hidden"
};
var _hoisted_16 = {
	key: 3,
	class: "flex items-center gap-1 font-bold text-text-primary"
};
var _hoisted_17 = { class: "@max-[180px]:hidden" };
var _hoisted_18 = { class: "hidden @max-[180px]:inline" };
var _hoisted_19 = { class: "flex flex-col gap-2" };
var _hoisted_20 = { class: "flex items-center justify-between gap-2 text-sm @max-[300px]:flex-col @max-[300px]:items-start" };
var _hoisted_21 = { class: "flex items-center gap-1 text-text-primary" };
var _hoisted_22 = {
	key: 0,
	class: "flex h-3.5 items-center rounded-full bg-base-foreground px-1 text-2xs/none font-semibold text-base-background uppercase"
};
var _hoisted_23 = {
	key: 1,
	class: "flex items-center gap-1 font-bold text-text-primary"
};
var _hoisted_24 = {
	key: 0,
	class: "text-sm text-muted @max-[300px]:hidden"
};
var _hoisted_25 = { class: "flex flex-col gap-2" };
var _hoisted_26 = { class: "flex items-center justify-between gap-2 text-sm" };
var _hoisted_27 = { class: "flex items-center gap-1" };
var _hoisted_28 = { class: "flex items-center gap-1 font-bold" };
var _hoisted_29 = { class: "text-sm" };
var _hoisted_30 = {
	key: 2,
	class: "flex flex-col gap-3"
};
//#endregion
//#region src/platform/cloud/subscription/components/CreditsTile.vue
var CreditsTile_default = /* @__PURE__ */ defineComponent({
	__name: "CreditsTile",
	props: {
		zeroState: {
			type: Boolean,
			default: false
		},
		inactivePlan: { type: Boolean }
	},
	setup(__props) {
		const { locale, t } = useI18n();
		const { subscription, balance, canAccessSubscriptionFeatures, currentTeamCreditStop, fetchBalance, fetchStatus } = useBillingContext();
		const { canTopUp, canSubscribeSelfServe } = useBillingCapabilities();
		const { prepaidCredits, totalCredits, monthlyBonusCreditsValue, prepaidCreditsValue, isLoadingBalance } = useSubscriptionCredits();
		const { wrapWithErrorHandlingAsync } = useErrorHandling();
		const { showPricingTable } = useSubscriptionDialog();
		const customerEventsService = useCustomerEventsService();
		const dialogService = useDialogService();
		const telemetry = useTelemetry();
		const { pendingTopupNeedsRefresh, consumeCompletedTopup } = usePendingTopup();
		const tierKey = computed(() => {
			const tier = subscription.value?.tier;
			if (!tier) return DEFAULT_TIER_KEY;
			return toTierKey(tier) ?? "standard";
		});
		const isAnnualBilling = computed(() => subscription.value?.duration === "ANNUAL");
		const isDurationUnknown = computed(() => !!subscription.value?.tier && !subscription.value.duration && tierKey.value !== "free" && tierKey.value !== "founder");
		const creditPoolTotalCredits = computed(() => {
			if (isDurationUnknown.value) return null;
			const monthlyCredits = currentTeamCreditStop.value?.credits_monthly ?? (isSalesManagedTier(subscription.value?.tier) ? null : getTierCredits(tierKey.value));
			if (monthlyCredits === null) return null;
			return isAnnualBilling.value ? monthlyCredits * 12 : monthlyCredits;
		});
		const showsInactivePlanState = computed(() => __props.inactivePlan === true);
		const inactiveCreditsNote = computed(() => {
			if (!isSalesManagedTier(subscription.value?.tier)) return t("subscription.reactivateToUseCredits");
			return prepaidCreditsValue.value > 0 ? t("subscription.salesManagedInactiveCreditsNote") : t("subscription.salesManagedCreditsEndedNote");
		});
		const usage = computed(() => computeMonthlyUsage(monthlyBonusCreditsValue.value, creditPoolTotalCredits.value ?? 0));
		const refillsDateShort = computed(() => {
			const raw = subscription.value?.renewalDate;
			if (!raw) return "";
			const date = new Date(raw);
			return Number.isNaN(date.getTime()) ? "" : date.toLocaleDateString(locale.value, {
				month: "short",
				day: "numeric"
			});
		});
		const hasRefillsDate = computed(() => refillsDateShort.value !== "");
		const refillsLabel = computed(() => hasRefillsDate.value ? t("subscription.refillsDate", { date: refillsDateShort.value }) : t("subscription.refillsNextCycle"));
		const allowanceLabel = computed(() => t(isAnnualBilling.value ? "subscription.yearly" : "subscription.monthly"));
		const usedAfterAllowanceLabel = computed(() => t(isAnnualBilling.value ? "subscription.usedAfterYearly" : "subscription.usedAfterMonthly"));
		const formatCreditCount = (value) => formatCredits({
			value,
			locale: locale.value,
			numberOptions: { maximumFractionDigits: 0 }
		});
		const creditPoolTotalDisplay = computed(() => {
			const total = creditPoolTotalCredits.value;
			return total === null ? "—" : formatCreditCount(total);
		});
		const usedDisplay = computed(() => formatCreditCount(usage.value.used));
		const monthlyRemainingDisplay = computed(() => formatCreditCount(usage.value.remaining));
		const compactNumber = computed(() => new Intl.NumberFormat(locale.value, { notation: "compact" }));
		const monthlyRemainingCompact = computed(() => compactNumber.value.format(usage.value.remaining));
		const creditPoolTotalCompact = computed(() => {
			const total = creditPoolTotalCredits.value;
			return total === null ? "—" : compactNumber.value.format(total);
		});
		const displayTotal = computed(() => __props.zeroState || showsInactivePlanState.value ? formatCreditCount(0) : totalCredits.value);
		const retainsPrepaidWhileInactive = computed(() => isSalesManagedTier(subscription.value?.tier));
		const displayPrepaid = computed(() => {
			if (__props.zeroState) return formatCreditCount(0);
			if (showsInactivePlanState.value && !retainsPrepaidWhileInactive.value) return formatCreditCount(0);
			return prepaidCredits.value;
		});
		const usedBarWidth = computed(() => `${(usage.value.usedFraction * 100).toFixed(2)}%`);
		const monthlyUsageLabel = computed(() => t(isAnnualBilling.value ? "subscription.yearlyUsageProgress" : "subscription.monthlyUsageProgress", {
			used: usedDisplay.value,
			total: creditPoolTotalDisplay.value
		}));
		const showBreakdown = computed(() => canAccessSubscriptionFeatures.value && !__props.zeroState && !showsInactivePlanState.value);
		const showBar = computed(() => false);
		const showActionButton = computed(() => (canTopUp.value || canSubscribeSelfServe.value) && !__props.zeroState && !showsInactivePlanState.value);
		const isMonthlyDepleted = computed(() => showBar.value && !isLoadingBalance.value && balance.value != null && monthlyBonusCreditsValue.value <= 0);
		const isAllowanceDepleted = computed(() => isMonthlyDepleted.value || isDurationUnknown.value && false);
		const isOutOfCredits = computed(() => isAllowanceDepleted.value && prepaidCreditsValue.value <= 0);
		const isSpendingAdditional = computed(() => isAllowanceDepleted.value && prepaidCreditsValue.value > 0);
		const emptyStateNotice = computed(() => {
			if (isOutOfCredits.value) return {
				title: hasRefillsDate.value ? t("subscription.outOfCreditsTitle", { date: refillsDateShort.value }) : t("subscription.outOfCreditsTitleNoDate"),
				description: t("subscription.outOfCreditsDescription")
			};
			if (isMonthlyDepleted.value) return {
				title: hasRefillsDate.value ? t(isAnnualBilling.value ? "subscription.yearlyCreditsUsedUpTitle" : "subscription.monthlyCreditsUsedUpTitle", { date: refillsDateShort.value }) : t(isAnnualBilling.value ? "subscription.yearlyCreditsUsedUpTitleNoDate" : "subscription.monthlyCreditsUsedUpTitleNoDate"),
				description: t("subscription.monthlyCreditsUsedUpDescription")
			};
			return null;
		});
		async function refreshCredits() {
			const results = await Promise.allSettled([fetchBalance(), fetchStatus()]);
			for (const result of results) if (result.status === "rejected") throw result.reason;
			if (!pendingTopupNeedsRefresh()) return;
			const response = await customerEventsService.getMyEvents({
				page: 1,
				limit: 10
			});
			if (!response) throw new Error(customerEventsService.error.value ?? "Fetching customer events failed");
			const completedTopup = consumeCompletedTopup(response.events);
			if (completedTopup) {
				telemetry?.trackApiCreditTopupSucceeded();
				telemetry?.trackBillingEvent({
					operation: "topup",
					stage: "succeeded",
					outcome: "success",
					duration_ms: Date.now() - completedTopup.startedAtMs
				});
			}
		}
		let refreshRequested = false;
		let activeRefresh = null;
		async function refreshLatestCredits() {
			refreshRequested = true;
			if (activeRefresh) return activeRefresh;
			activeRefresh = (async () => {
				let lastError;
				while (refreshRequested) {
					refreshRequested = false;
					try {
						await refreshCredits();
						lastError = void 0;
					} catch (error) {
						lastError = error;
					}
				}
				if (lastError) throw lastError;
			})();
			try {
				await activeRefresh;
			} finally {
				activeRefresh = null;
			}
		}
		const handleRefresh = wrapWithErrorHandlingAsync(refreshLatestCredits);
		function handleAddCredits() {
			telemetry?.trackAddApiCreditButtonClicked({ source: "credits_panel" });
			dialogService.showTopUpCreditsDialog({ source: paymentIntentSourceForAddCreditsClick("credits_panel") });
		}
		function handleUpgradeToAddCredits() {
			showPricingTable({ reason: "upgrade_to_add_credits" });
		}
		async function handleWindowFocus() {
			if (pendingTopupNeedsRefresh()) await handleRefresh();
		}
		useEventListener(window, "focus", () => void handleWindowFocus());
		onMounted(handleRefresh);
		return (_ctx, _cache) => {
			const _directive_tooltip = resolveDirective("tooltip");
			return openBlock(), createElementBlock("div", { class: normalizeClass(unref(cn)("@container relative flex flex-col gap-6 rounded-2xl border border-interface-stroke bg-modal-panel-background px-6 py-5", __props.inactivePlan && "text-muted")) }, [
				createVNode(Button_default, {
					variant: "muted-textonly",
					size: "icon-sm",
					class: "absolute top-4 right-4",
					loading: unref(isLoadingBalance),
					"aria-label": _ctx.$t("subscription.refreshCredits"),
					onClick: unref(handleRefresh)
				}, {
					default: withCtx(() => [..._cache[0] || (_cache[0] = [createBaseVNode("i", { class: "icon-[lucide--refresh-cw] size-4 text-text-secondary" }, null, -1)])]),
					_: 1
				}, 8, [
					"loading",
					"aria-label",
					"onClick"
				]),
				createBaseVNode("div", _hoisted_1$1, [createBaseVNode("div", _hoisted_2$1, toDisplayString(_ctx.$t("subscription.totalCredits")), 1), unref(isLoadingBalance) ? (openBlock(), createBlock(unref(script), {
					key: 0,
					width: "8rem",
					height: "2rem"
				})) : (openBlock(), createElementBlock("div", _hoisted_3$1, [
					createBaseVNode("i", { class: normalizeClass(unref(cn)("icon-[lucide--coins] size-4 self-center", !__props.inactivePlan && "text-credit")) }, null, 2),
					createBaseVNode("span", _hoisted_4$1, toDisplayString(displayTotal.value), 1),
					createBaseVNode("span", _hoisted_5$1, toDisplayString(_ctx.$t("subscription.remaining")), 1)
				]))]),
				showBreakdown.value ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
					emptyStateNotice.value ? (openBlock(), createElementBlock("div", _hoisted_6$1, [_cache[1] || (_cache[1] = createBaseVNode("i", { class: "mt-0.5 icon-[lucide--info] size-4 shrink-0 text-base-foreground" }, null, -1)), createBaseVNode("div", _hoisted_7$1, [createBaseVNode("span", _hoisted_8$1, toDisplayString(emptyStateNotice.value.title), 1), createBaseVNode("span", _hoisted_9, toDisplayString(emptyStateNotice.value.description), 1)])])) : createCommentVNode("", true),
					showBar.value ? (openBlock(), createElementBlock("div", {
						key: 1,
						class: normalizeClass(unref(cn)("flex flex-col gap-2", isMonthlyDepleted.value && "opacity-30"))
					}, [
						createBaseVNode("div", _hoisted_10, [createBaseVNode("span", _hoisted_11, toDisplayString(allowanceLabel.value), 1), createBaseVNode("span", _hoisted_12, toDisplayString(refillsLabel.value), 1)]),
						createBaseVNode("div", {
							role: "progressbar",
							"aria-valuenow": usage.value.used,
							"aria-valuemin": 0,
							"aria-valuemax": creditPoolTotalCredits.value ?? 0,
							"aria-valuetext": monthlyUsageLabel.value,
							class: "h-2 w-full overflow-hidden rounded-full bg-secondary-background-hover"
						}, [createBaseVNode("div", {
							class: "h-full rounded-full bg-credit",
							style: normalizeStyle({ width: usedBarWidth.value })
						}, null, 4)], 8, _hoisted_13),
						createBaseVNode("div", _hoisted_14, [unref(isLoadingBalance) ? (openBlock(), createBlock(unref(script), {
							key: 0,
							class: "@max-[300px]:hidden",
							width: "5rem",
							height: "1rem"
						})) : (openBlock(), createElementBlock("span", _hoisted_15, toDisplayString(_ctx.$t("subscription.creditsUsed", { used: usedDisplay.value })), 1)), unref(isLoadingBalance) ? (openBlock(), createBlock(unref(script), {
							key: 2,
							width: "9rem",
							height: "1rem"
						})) : (openBlock(), createElementBlock("span", _hoisted_16, [
							_cache[2] || (_cache[2] = createBaseVNode("i", { class: "icon-[lucide--coins] size-4 text-credit" }, null, -1)),
							createBaseVNode("span", _hoisted_17, toDisplayString(_ctx.$t("subscription.creditsLeftOfTotal", {
								remaining: monthlyRemainingDisplay.value,
								total: creditPoolTotalDisplay.value
							})), 1),
							createBaseVNode("span", _hoisted_18, toDisplayString(_ctx.$t("subscription.creditsLeftOfTotal", {
								remaining: monthlyRemainingCompact.value,
								total: creditPoolTotalCompact.value
							})), 1)
						]))])
					], 2)) : createCommentVNode("", true),
					_cache[5] || (_cache[5] = createBaseVNode("div", { class: "h-px w-full bg-interface-stroke" }, null, -1)),
					createBaseVNode("div", _hoisted_19, [createBaseVNode("div", _hoisted_20, [createBaseVNode("span", _hoisted_21, [
						createTextVNode(toDisplayString(_ctx.$t("subscription.additionalCredits")) + " ", 1),
						withDirectives((openBlock(), createBlock(Button_default, {
							variant: "muted-textonly",
							size: "icon-sm",
							"aria-label": _ctx.$t("subscription.additionalCreditsInfo"),
							class: "text-muted"
						}, {
							default: withCtx(() => [..._cache[3] || (_cache[3] = [createBaseVNode("i", { class: "icon-[lucide--info] size-4" }, null, -1)])]),
							_: 1
						}, 8, ["aria-label"])), [[_directive_tooltip, {
							value: _ctx.$t("subscription.additionalCreditsTooltip"),
							showDelay: 300
						}]]),
						isSpendingAdditional.value ? (openBlock(), createElementBlock("span", _hoisted_22, toDisplayString(_ctx.$t("subscription.additionalCreditsInUse")), 1)) : createCommentVNode("", true)
					]), unref(isLoadingBalance) ? (openBlock(), createBlock(unref(script), {
						key: 0,
						width: "3rem",
						height: "1rem"
					})) : (openBlock(), createElementBlock("span", _hoisted_23, [_cache[4] || (_cache[4] = createBaseVNode("i", { class: "icon-[lucide--coins] size-4 text-credit" }, null, -1)), createTextVNode(" " + toDisplayString(displayPrepaid.value), 1)]))]), !isDurationUnknown.value ? (openBlock(), createElementBlock("span", _hoisted_24, toDisplayString(usedAfterAllowanceLabel.value), 1)) : createCommentVNode("", true)])
				], 64)) : showsInactivePlanState.value ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [_cache[8] || (_cache[8] = createBaseVNode("div", { class: "h-px w-full bg-interface-stroke" }, null, -1)), createBaseVNode("div", _hoisted_25, [createBaseVNode("div", _hoisted_26, [createBaseVNode("span", _hoisted_27, [createTextVNode(toDisplayString(_ctx.$t("subscription.additionalCredits")) + " ", 1), withDirectives((openBlock(), createBlock(Button_default, {
					variant: "muted-textonly",
					size: "icon-sm",
					"aria-label": _ctx.$t("subscription.additionalCreditsInfo"),
					class: "text-muted"
				}, {
					default: withCtx(() => [..._cache[6] || (_cache[6] = [createBaseVNode("i", { class: "icon-[lucide--info] size-4" }, null, -1)])]),
					_: 1
				}, 8, ["aria-label"])), [[_directive_tooltip, {
					value: _ctx.$t("subscription.additionalCreditsTooltip"),
					showDelay: 300
				}]])]), createBaseVNode("span", _hoisted_28, [_cache[7] || (_cache[7] = createBaseVNode("i", { class: "icon-[lucide--coins] size-4" }, null, -1)), createTextVNode(" " + toDisplayString(displayPrepaid.value), 1)])]), createBaseVNode("span", _hoisted_29, toDisplayString(inactiveCreditsNote.value), 1)])], 64)) : createCommentVNode("", true),
				showActionButton.value ? (openBlock(), createElementBlock("div", _hoisted_30, [unref(canTopUp) ? (openBlock(), createBlock(Button_default, {
					key: 0,
					variant: isOutOfCredits.value ? "inverted" : "secondary",
					size: "lg",
					class: normalizeClass(unref(cn)("w-full font-normal", !isOutOfCredits.value && "bg-interface-menu-component-surface-selected text-text-primary")),
					onClick: handleAddCredits
				}, {
					default: withCtx(() => [createTextVNode(toDisplayString(_ctx.$t("subscription.addCredits")), 1)]),
					_: 1
				}, 8, ["variant", "class"])) : (openBlock(), createBlock(Button_default, {
					key: 1,
					variant: "subscribe",
					size: "lg",
					class: "w-full font-normal",
					onClick: handleUpgradeToAddCredits
				}, {
					default: withCtx(() => [createTextVNode(toDisplayString(_ctx.$t("subscription.upgradeToAddCredits")), 1)]),
					_: 1
				}))])) : createCommentVNode("", true)
			], 2);
		};
	}
});
//#endregion
//#region src/components/dialog/content/setting/CreditsPanel.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1 = { key: 0 };
var _hoisted_2 = { class: "mb-2 text-2xl font-bold" };
var _hoisted_3 = {
	key: 1,
	class: "rounded-2xl border border-interface-stroke p-6"
};
var _hoisted_4 = { class: "mb-4 flex items-center justify-between" };
var _hoisted_5 = { class: "m-0 text-base font-semibold" };
var _hoisted_6 = {
	key: 3,
	class: "flex items-center justify-between"
};
var _hoisted_7 = { class: "m-0" };
var _hoisted_8 = {
	key: 5,
	class: "flex flex-row gap-2"
};
//#endregion
//#region src/components/dialog/content/setting/CreditsPanel.vue
var CreditsPanel_default = /* @__PURE__ */ defineComponent({
	__name: "CreditsPanel",
	props: { embedded: {
		type: Boolean,
		default: false
	} },
	setup(__props) {
		const { buildDocsUrl, docsPaths } = useExternalLink();
		const { balance, manageSubscription } = useBillingContext();
		const commandStore = useCommandStore();
		const telemetry = useTelemetry();
		const usageLogsTableRef = ref(null);
		watch(balance, (next, previous) => {
			if (!next || !previous) return;
			usageLogsTableRef.value?.refresh();
		});
		const handleCreditsHistoryClick = async () => {
			await manageSubscription();
		};
		const handleMessageSupport = async () => {
			telemetry?.trackHelpResourceClicked({
				resource_type: "help_feedback",
				is_external: true,
				source: "credits_panel"
			});
			await commandStore.execute("Comfy.ContactSupport");
		};
		const handleFaqClick = () => {
			window.open(buildDocsUrl("/tutorials/api-nodes/faq", { includeLocale: true }), "_blank", "noopener,noreferrer");
		};
		const handleOpenPartnerNodesInfo = () => {
			window.open(buildDocsUrl(docsPaths.partnerNodesPricing, { includeLocale: true }), "_blank", "noopener,noreferrer");
		};
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", { class: normalizeClass(unref(cn)("credits-container flex flex-col gap-4", __props.embedded ? "shrink-0" : "h-full")) }, [
				!__props.embedded ? (openBlock(), createElementBlock("div", _hoisted_1, [createBaseVNode("h2", _hoisted_2, toDisplayString(_ctx.$t("credits.credits")), 1), _cache[0] || (_cache[0] = createBaseVNode("div", { class: "my-4 border-t border-interface-stroke" }, null, -1))])) : createCommentVNode("", true),
				__props.embedded ? (openBlock(), createElementBlock("div", _hoisted_3, [createBaseVNode("div", _hoisted_4, [createBaseVNode("h3", _hoisted_5, toDisplayString(_ctx.$t("credits.workspaceCredits")), 1), createVNode(Button_default, {
					variant: "secondary",
					size: "lg",
					onClick: handleCreditsHistoryClick
				}, {
					default: withCtx(() => [createTextVNode(toDisplayString(_ctx.$t("subscription.manageBilling")), 1)]),
					_: 1
				})]), createVNode(CreditsTile_default, { class: "max-w-md" })])) : (openBlock(), createBlock(CreditsTile_default, { key: 2 })),
				!__props.embedded ? (openBlock(), createElementBlock("div", _hoisted_6, [createBaseVNode("h3", _hoisted_7, toDisplayString(_ctx.$t("credits.activity")), 1), createVNode(Button_default, {
					variant: "muted-textonly",
					onClick: handleCreditsHistoryClick
				}, {
					default: withCtx(() => [_cache[1] || (_cache[1] = createBaseVNode("i", { class: "pi pi-arrow-up-right" }, null, -1)), createTextVNode(" " + toDisplayString(_ctx.$t("credits.invoiceHistory")), 1)]),
					_: 1
				})])) : createCommentVNode("", true),
				!__props.embedded ? (openBlock(), createBlock(UsageLogsTable_default, {
					key: 4,
					ref_key: "usageLogsTableRef",
					ref: usageLogsTableRef
				}, null, 512)) : createCommentVNode("", true),
				!__props.embedded ? (openBlock(), createElementBlock("div", _hoisted_8, [
					createVNode(Button_default, {
						variant: "muted-textonly",
						onClick: handleFaqClick
					}, {
						default: withCtx(() => [_cache[2] || (_cache[2] = createBaseVNode("i", { class: "pi pi-question-circle" }, null, -1)), createTextVNode(" " + toDisplayString(_ctx.$t("credits.faqs")), 1)]),
						_: 1
					}),
					createVNode(Button_default, {
						variant: "muted-textonly",
						onClick: handleOpenPartnerNodesInfo
					}, {
						default: withCtx(() => [_cache[3] || (_cache[3] = createBaseVNode("i", { class: "pi pi-question-circle" }, null, -1)), createTextVNode(" " + toDisplayString(_ctx.$t("subscription.partnerNodesCredits")), 1)]),
						_: 1
					}),
					createVNode(Button_default, {
						variant: "muted-textonly",
						onClick: handleMessageSupport
					}, {
						default: withCtx(() => [_cache[4] || (_cache[4] = createBaseVNode("i", { class: "pi pi-comments" }, null, -1)), createTextVNode(" " + toDisplayString(_ctx.$t("credits.messageSupport")), 1)]),
						_: 1
					})
				])) : createCommentVNode("", true)
			], 2);
		};
	}
});
//#endregion
export { CreditsTile_default as n, UsageLogsTable_default as r, CreditsPanel_default as t };
