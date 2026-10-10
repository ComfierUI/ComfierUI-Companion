import "./rolldown-runtime-xtsTai4I.js";
import { Et as withCtx, F as createBaseVNode, G as defineComponent, H as createTextVNode, I as createBlock, Kt as unref, L as createCommentVNode, Lt as ref, P as computed, R as createElementBlock, U as createVNode, Zt as toDisplayString, lt as openBlock, st as onUnmounted } from "./vendor-vue-core-C1utdb0s.js";
import { x as useEventListener } from "./vendor-vueuse-BxKIIsKg.js";
import { Dr as isSalesManagedTier, On as useBillingContext, nt as useDialogService, vu as useErrorHandling, zn as useWorkspaceUI } from "./layoutStore-CZsuzg91.js";
import { t as useFeatureFlags } from "./useFeatureFlags-DAoj_aDd.js";
import { t as useDialogStore } from "./dialogStore-B0GYyals.js";
import { t as Button_default } from "./Button-j0oCzR82.js";
import { t as ComfyQueueButton_default } from "./ComfyQueueButton-D9P1_hG_.js";
import { t as SubscribeToRun_default } from "./SubscribeToRun-Bi_R4YMY.js";
//#region src/platform/workspace/components/SubscriptionPausedDialog.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1 = { class: "flex flex-col overflow-hidden rounded-2xl border border-border-default bg-base-background" };
var _hoisted_2 = { class: "flex h-12 items-center gap-2 border-b border-border-default p-4" };
var _hoisted_3 = { class: "m-0 min-w-0 flex-1 font-inter text-sm text-base-foreground" };
var _hoisted_4 = ["aria-label"];
var _hoisted_5 = { class: "p-4" };
var _hoisted_6 = { class: "m-0 font-inter text-sm text-muted-foreground" };
var _hoisted_7 = { class: "flex items-center justify-end p-4" };
var _hoisted_8 = {
	key: 0,
	class: "pi pi-spin pi-spinner"
};
//#endregion
//#region src/platform/workspace/components/SubscriptionPausedDialog.vue
var SubscriptionPausedDialog_default = /* @__PURE__ */ defineComponent({
	__name: "SubscriptionPausedDialog",
	props: {
		canManage: { type: Boolean },
		status: {},
		isUpdatingPayment: {
			type: Boolean,
			default: false
		},
		onClose: { type: Function },
		onUpdatePayment: { type: Function }
	},
	setup(__props) {
		const titleKey = computed(() => __props.status === "payment_failed" ? __props.canManage ? "subscription.paymentRecovery.paymentFailedOwnerTitle" : "subscription.paymentRecovery.paymentFailedMemberTitle" : "subscription.paymentRecovery.title");
		const descriptionKey = computed(() => __props.canManage ? __props.status === "payment_failed" ? "subscription.paymentRecovery.paymentFailedOwnerDescription" : "subscription.paymentRecovery.ownerDescription" : __props.status === "payment_failed" ? "subscription.paymentRecovery.paymentFailedMemberDescription" : "subscription.paymentRecovery.memberDescription");
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", _hoisted_1, [
				createBaseVNode("div", _hoisted_2, [createBaseVNode("p", _hoisted_3, toDisplayString(_ctx.$t(titleKey.value)), 1), createBaseVNode("button", {
					type: "button",
					"aria-label": _ctx.$t("g.close"),
					class: "flex size-4 shrink-0 cursor-pointer items-center justify-center border-none bg-transparent text-base-foreground hover:text-muted-foreground",
					onClick: _cache[0] || (_cache[0] = (...args) => __props.onClose && __props.onClose(...args))
				}, [..._cache[2] || (_cache[2] = [createBaseVNode("i", { class: "pi pi-times text-xs" }, null, -1)])], 8, _hoisted_4)]),
				createBaseVNode("div", _hoisted_5, [createBaseVNode("p", _hoisted_6, toDisplayString(_ctx.$t(descriptionKey.value)), 1)]),
				createBaseVNode("div", _hoisted_7, [createVNode(Button_default, {
					variant: __props.canManage ? "inverted" : "secondary",
					size: "lg",
					disabled: __props.canManage && __props.isUpdatingPayment,
					onClick: _cache[1] || (_cache[1] = ($event) => __props.canManage ? __props.onUpdatePayment() : __props.onClose())
				}, {
					default: withCtx(() => [__props.canManage && __props.isUpdatingPayment ? (openBlock(), createElementBlock("i", _hoisted_8)) : createCommentVNode("", true), createTextVNode(" " + toDisplayString(_ctx.$t(__props.canManage ? "subscription.paymentRecovery.ownerCta" : "subscription.paymentRecovery.memberCta")), 1)]),
					_: 1
				}, 8, ["variant", "disabled"])])
			]);
		};
	}
});
//#endregion
//#region src/components/actionbar/ComfyRunButton/CloudRunButtonWrapper.vue?vue&type=script&setup=true&lang.ts
var DIALOG_KEY = "subscription-paused";
//#endregion
//#region src/components/actionbar/ComfyRunButton/CloudRunButtonWrapper.vue
var CloudRunButtonWrapper_default = /* @__PURE__ */ defineComponent({
	__name: "CloudRunButtonWrapper",
	setup(__props) {
		const { showsSubscribeToRunPrompt, billingStatus, subscription, manageSubscription, fetchStatus, fetchBalance } = useBillingContext();
		const isSalesManagedPlan = computed(() => isSalesManagedTier(subscription.value?.tier));
		const { flags } = useFeatureFlags();
		const { permissions } = useWorkspaceUI();
		const dialogService = useDialogService();
		const dialogStore = useDialogStore();
		const { toastErrorHandler } = useErrorHandling();
		const isUpdatingPayment = ref(false);
		let paymentPortalRequest = null;
		let billingRefreshRequest = null;
		let isUnmounted = false;
		let refreshBillingOnFocus = false;
		onUnmounted(() => {
			isUnmounted = true;
		});
		const paymentRecoveryLock = computed(() => billingStatus.value === "payment_failed" || flags.v1PaymentRecovery && billingStatus.value === "paused" ? permissions.value.canManageSubscription ? "owner" : "member" : null);
		const paymentRecoveryStatus = computed(() => billingStatus.value === "payment_failed" ? "payment_failed" : "paused");
		function refreshStaleBillingState() {
			if (billingRefreshRequest || !refreshBillingOnFocus && (!showsSubscribeToRunPrompt.value || paymentRecoveryLock.value)) return;
			refreshBillingOnFocus = false;
			billingRefreshRequest = Promise.allSettled([fetchStatus(), fetchBalance()]).then(() => void 0);
			billingRefreshRequest.finally(() => {
				billingRefreshRequest = null;
			});
		}
		useEventListener(window, "focus", refreshStaleBillingState);
		useEventListener(document, "visibilitychange", () => {
			if (document.visibilityState === "visible") refreshStaleBillingState();
		});
		function closePaymentRecoveryDialog() {
			dialogStore.closeDialog({ key: DIALOG_KEY });
		}
		function updatePayment() {
			if (paymentPortalRequest) return paymentPortalRequest;
			paymentPortalRequest = (async () => {
				isUpdatingPayment.value = true;
				dialogStore.updateDialog({
					key: DIALOG_KEY,
					contentProps: { isUpdatingPayment: true }
				});
				try {
					await manageSubscription();
					if (!isUnmounted) {
						refreshBillingOnFocus = true;
						closePaymentRecoveryDialog();
					}
				} catch (error) {
					if (!isUnmounted) toastErrorHandler(error);
				} finally {
					isUpdatingPayment.value = false;
					paymentPortalRequest = null;
					if (!isUnmounted) dialogStore.updateDialog({
						key: DIALOG_KEY,
						contentProps: { isUpdatingPayment: false }
					});
				}
			})();
			return paymentPortalRequest;
		}
		function showPaymentRecoveryDialog() {
			dialogService.showLayoutDialog({
				key: DIALOG_KEY,
				component: SubscriptionPausedDialog_default,
				props: {
					canManage: paymentRecoveryLock.value === "owner",
					status: paymentRecoveryStatus.value,
					isUpdatingPayment: isUpdatingPayment.value,
					onClose: closePaymentRecoveryDialog,
					onUpdatePayment: updatePayment
				},
				dialogComponentProps: {
					renderer: "reka",
					headless: true,
					contentClass: "w-[min(360px,95vw)] max-w-[min(360px,95vw)] sm:max-w-[min(360px,95vw)] border-0 bg-transparent shadow-none"
				}
			});
		}
		return (_ctx, _cache) => {
			return !unref(showsSubscribeToRunPrompt) || paymentRecoveryLock.value || isSalesManagedPlan.value ? (openBlock(), createBlock(ComfyQueueButton_default, {
				key: 0,
				"payment-recovery-lock": paymentRecoveryLock.value,
				onPaymentRecoveryClick: showPaymentRecoveryDialog
			}, null, 8, ["payment-recovery-lock"])) : (openBlock(), createBlock(SubscribeToRun_default, { key: 1 }));
		};
	}
});
//#endregion
export { CloudRunButtonWrapper_default as default };
