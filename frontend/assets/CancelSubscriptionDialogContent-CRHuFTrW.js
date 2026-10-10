import "./rolldown-runtime-xtsTai4I.js";
import { Et as withCtx, F as createBaseVNode, G as defineComponent, H as createTextVNode, Lt as ref, P as computed, R as createElementBlock, St as watch, U as createVNode, Zt as toDisplayString, lt as openBlock, ot as onMounted, st as onUnmounted } from "./vendor-vue-core-C1utdb0s.js";
import { st as useThrottleFn, u as defaultWindow, x as useEventListener } from "./vendor-vueuse-BxKIIsKg.js";
import { On as useBillingContext, lr as categorizeBillingApiError, tr as useBillingCapabilities, ur as useBillingRouting, zn as useWorkspaceUI } from "./layoutStore-CZsuzg91.js";
import { n as useTelemetry } from "./telemetry-IkzvF0TI.js";
import { r as getErrorMessage } from "./reportError-LG-zfbNw.js";
import { r as useI18n } from "./vendor-i18n-BZvE7WBQ.js";
import { t as useDialogStore } from "./dialogStore-B0GYyals.js";
import { t as Button_default } from "./Button-j0oCzR82.js";
import { f as useToast } from "./vendor-primevue-C3d0HJ53.js";
import { n as getSubscriptionCancellationMetadata, t as createCancelFlowReporter } from "./subscriptionCancellationTelemetry-DPU1P5zB.js";
import { o as parseIsoDateSafe } from "./dateTimeUtil-Dbo04jgD.js";
//#region src/components/dialog/content/subscription/CancelSubscriptionDialogContent.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1 = { class: "flex w-full max-w-[400px] flex-col rounded-2xl border border-border-default bg-base-background" };
var _hoisted_2 = { class: "flex h-12 items-center justify-between border-b border-border-default px-4" };
var _hoisted_3 = { class: "m-0 text-sm font-normal text-base-foreground" };
var _hoisted_4 = ["aria-label", "disabled"];
var _hoisted_5 = { class: "flex flex-col gap-4 p-4" };
var _hoisted_6 = { class: "m-0 text-sm text-muted-foreground" };
var _hoisted_7 = {
	key: 0,
	class: "flex items-center justify-end gap-4 p-4"
};
var _hoisted_8 = {
	key: 1,
	class: "flex items-center justify-end gap-4 p-4"
};
//#endregion
//#region src/components/dialog/content/subscription/CancelSubscriptionDialogContent.vue
var CancelSubscriptionDialogContent_default = /* @__PURE__ */ defineComponent({
	__name: "CancelSubscriptionDialogContent",
	props: {
		cancelAt: {},
		flowAlreadyOpened: {
			type: Boolean,
			default: false
		},
		flowAlreadyConfirmed: {
			type: Boolean,
			default: false
		},
		isScopeCurrent: {
			type: Function,
			default: () => true
		}
	},
	setup(__props) {
		const { t } = useI18n();
		const dialogStore = useDialogStore();
		const toast = useToast();
		const { cancelSubscription, fetchStatus, subscription, tier } = useBillingContext();
		const { shouldUseWorkspaceBilling } = useBillingRouting();
		const { canCancel } = useBillingCapabilities();
		const { permissions } = useWorkspaceUI();
		const telemetry = useTelemetry();
		const isLoading = ref(false);
		const didCancelSucceed = ref(false);
		const isAwaitingStripe = ref(false);
		let lastCancelled = null;
		let cancelObserved = false;
		const didScopeAbort = ref(false);
		const cancelReport = createCancelFlowReporter(telemetry, () => ({
			duration: subscription.value?.duration,
			tier: tier.value
		}), { confirmed: __props.flowAlreadyConfirmed });
		function cancellationMetadata() {
			return getSubscriptionCancellationMetadata({
				cancelAt: __props.cancelAt,
				duration: subscription.value?.duration,
				endDate: subscription.value?.endDate,
				tier: tier.value
			});
		}
		onMounted(() => {
			if (__props.flowAlreadyOpened) return;
			telemetry?.trackSubscriptionCancellation("flow_opened", cancellationMetadata());
			cancelReport.intent();
		});
		function reportAbandoned() {
			telemetry?.trackSubscriptionCancellation("abandoned", cancellationMetadata());
			cancelReport.abandoned();
		}
		let unmounted = false;
		onUnmounted(() => {
			unmounted = true;
			if (didCancelSucceed.value || didScopeAbort.value || isLoading.value) return;
			reportAbandoned();
		});
		const formattedEndDate = computed(() => {
			const date = parseIsoDateSafe(__props.cancelAt ?? subscription.value?.endDate);
			if (!date) return t("subscription.cancelDialog.endOfBillingPeriod");
			return date.toLocaleDateString("en-US", {
				month: "long",
				day: "numeric",
				year: "numeric"
			});
		});
		const description = computed(() => isAwaitingStripe.value ? t("subscription.cancelDialog.finishOnStripe") : t("subscription.cancelDialog.description", { date: formattedEndDate.value }));
		function completeObservedCancel() {
			if (!cancelObserved || didCancelSucceed.value) return;
			if (!__props.isScopeCurrent()) return abortForScopeChange();
			didCancelSucceed.value = true;
			isAwaitingStripe.value = false;
			telemetry?.trackSubscriptionCancellation("confirmed", cancellationMetadata());
			cancelReport.confirmed({ operationFollows: false });
			dialogStore.closeDialog({ key: "cancel-subscription" });
			toast.add({
				severity: "success",
				summary: t("subscription.cancelSuccess"),
				life: 5e3
			});
		}
		watch(() => subscription.value ? !!subscription.value.isCancelled : null, (cancelled) => {
			if (cancelled === null) return;
			if (cancelled && lastCancelled === false) cancelObserved = true;
			if (!cancelled) cancelObserved = false;
			lastCancelled = cancelled;
			if (cancelObserved && isAwaitingStripe.value) completeObservedCancel();
		});
		const refreshOnFocus = useThrottleFn(() => {
			if (isAwaitingStripe.value) fetchStatus().catch(() => {});
		}, 1e4);
		useEventListener(defaultWindow, "focus", () => void refreshOnFocus());
		function onClose() {
			if (isLoading.value) return;
			dialogStore.closeDialog({ key: "cancel-subscription" });
		}
		function abortForScopeChange() {
			didScopeAbort.value = true;
			toast.add({
				severity: "warn",
				summary: t("subscription.cancelDialog.workspaceChanged")
			});
			dialogStore.closeDialog({ key: "cancel-subscription" });
		}
		function lacksWorkspaceCancelPermission() {
			return shouldUseWorkspaceBilling.value && !permissions.value.canManageSubscriptionLifecycle;
		}
		function reportCancelFailure(error) {
			if (!shouldUseWorkspaceBilling.value) {
				telemetry?.trackSubscriptionCancellation("failed", cancellationMetadata());
				cancelReport.confirmed({ operationFollows: false });
				cancelReport.failed(categorizeBillingApiError(error));
			}
			toast.add({
				severity: "error",
				summary: t("subscription.cancelDialog.failed"),
				detail: getErrorMessage(error) ?? t("g.unknownError")
			});
			isLoading.value = false;
		}
		function reportWorkspaceConfirmed() {
			telemetry?.trackSubscriptionCancellation("confirmed", cancellationMetadata());
			cancelReport.confirmed({ operationFollows: true });
		}
		function awaitStripeCancel() {
			if (unmounted) return reportAbandoned();
			isAwaitingStripe.value = true;
			isLoading.value = false;
			completeObservedCancel();
		}
		async function finishWorkspaceCancel() {
			didCancelSucceed.value = true;
			try {
				await fetchStatus();
			} catch {}
			dialogStore.closeDialog({ key: "cancel-subscription" });
			toast.add({
				severity: "success",
				summary: t("subscription.cancelSuccess"),
				life: 5e3
			});
			isLoading.value = false;
		}
		function handleCancelError(error) {
			if (!__props.isScopeCurrent()) return abortForScopeChange();
			reportCancelFailure(error);
		}
		async function finishCancel(rail, confirmedBeforeCall) {
			if (!__props.isScopeCurrent()) return abortForScopeChange();
			if (rail === "legacy") return awaitStripeCancel();
			if (!confirmedBeforeCall) reportWorkspaceConfirmed();
			await finishWorkspaceCancel();
		}
		async function onConfirmCancel() {
			if (!__props.isScopeCurrent()) return abortForScopeChange();
			if (lacksWorkspaceCancelPermission()) return;
			const confirmedBeforeCall = shouldUseWorkspaceBilling.value;
			if (confirmedBeforeCall) reportWorkspaceConfirmed();
			lastCancelled = subscription.value ? !!subscription.value.isCancelled : null;
			cancelObserved = false;
			isLoading.value = true;
			let rail;
			try {
				rail = await cancelSubscription(__props.isScopeCurrent);
			} catch (error) {
				return handleCancelError(error);
			}
			await finishCancel(rail, confirmedBeforeCall);
		}
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", _hoisted_1, [
				createBaseVNode("div", _hoisted_2, [createBaseVNode("h2", _hoisted_3, toDisplayString(_ctx.$t("subscription.cancelDialog.title")), 1), createBaseVNode("button", {
					class: "cursor-pointer rounded-sm border-none bg-transparent p-0 text-muted-foreground transition-colors hover:text-base-foreground focus-visible:ring-1 focus-visible:ring-border-default focus-visible:outline-none",
					"aria-label": _ctx.$t("g.close"),
					disabled: isLoading.value,
					onClick: onClose
				}, [..._cache[0] || (_cache[0] = [createBaseVNode("i", { class: "pi pi-times size-4" }, null, -1)])], 8, _hoisted_4)]),
				createBaseVNode("div", _hoisted_5, [createBaseVNode("p", _hoisted_6, toDisplayString(description.value), 1)]),
				isAwaitingStripe.value ? (openBlock(), createElementBlock("div", _hoisted_7, [createVNode(Button_default, {
					variant: "muted-textonly",
					onClick: onClose
				}, {
					default: withCtx(() => [createTextVNode(toDisplayString(_ctx.$t("g.close")), 1)]),
					_: 1
				})])) : (openBlock(), createElementBlock("div", _hoisted_8, [createVNode(Button_default, {
					variant: "muted-textonly",
					disabled: isLoading.value,
					onClick: onClose
				}, {
					default: withCtx(() => [createTextVNode(toDisplayString(_ctx.$t("subscription.cancelDialog.keepSubscription")), 1)]),
					_: 1
				}, 8, ["disabled"]), createVNode(Button_default, {
					variant: "destructive",
					size: "lg",
					loading: isLoading.value,
					onClick: onConfirmCancel
				}, {
					default: withCtx(() => [createTextVNode(toDisplayString(_ctx.$t("subscription.cancelDialog.confirmCancel")), 1)]),
					_: 1
				}, 8, ["loading"])]))
			]);
		};
	}
});
//#endregion
export { CancelSubscriptionDialogContent_default as default };
