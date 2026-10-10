import "./rolldown-runtime-xtsTai4I.js";
import { Et as withCtx, G as defineComponent, H as createTextVNode, I as createBlock, Jt as normalizeClass, Kt as unref, Lt as ref, St as watch, Zt as toDisplayString, lt as openBlock, rt as onBeforeUnmount } from "./vendor-vue-core-C1utdb0s.js";
import { On as useBillingContext } from "./layoutStore-CZsuzg91.js";
import { n as useTelemetry } from "./telemetry-IkzvF0TI.js";
import { t as cn } from "./src-DI1bBfrb.js";
import { t as Button_default } from "./Button-j0oCzR82.js";
//#endregion
//#region src/platform/cloud/subscription/components/SubscribeButton.vue
var SubscribeButton_default = /* @__PURE__ */ defineComponent({
	__name: "SubscribeButton",
	props: {
		label: {},
		size: { default: "lg" },
		buttonVariant: { default: "default" },
		fluid: {
			type: Boolean,
			default: true
		},
		disabled: {
			type: Boolean,
			default: false
		}
	},
	emits: ["subscribed"],
	setup(__props, { emit: __emit }) {
		const { canAccessSubscriptionFeatures, showSubscriptionDialog, tier } = useBillingContext();
		const isAwaitingStripeSubscription = ref(false);
		watch([isAwaitingStripeSubscription, canAccessSubscriptionFeatures], ([awaiting, isActive]) => {});
		const handleSubscribe = () => {
			useTelemetry()?.trackSubscription("subscribe_clicked", {
				current_tier: tier.value?.toLowerCase(),
				reason: "subscribe_now_button"
			});
			isAwaitingStripeSubscription.value = true;
			showSubscriptionDialog({ reason: "subscribe_now_button" });
		};
		onBeforeUnmount(() => {
			isAwaitingStripeSubscription.value = false;
		});
		return (_ctx, _cache) => {
			return openBlock(), createBlock(Button_default, {
				size: __props.size,
				disabled: __props.disabled,
				variant: __props.buttonVariant === "subscribe" ? "subscribe" : "primary",
				class: normalizeClass(unref(cn)("font-bold", __props.fluid && "w-full")),
				onClick: handleSubscribe
			}, {
				default: withCtx(() => [createTextVNode(toDisplayString(__props.label || _ctx.$t("subscription.required.subscribe")), 1)]),
				_: 1
			}, 8, [
				"size",
				"disabled",
				"variant",
				"class"
			]);
		};
	}
});
//#endregion
export { SubscribeButton_default as t };
