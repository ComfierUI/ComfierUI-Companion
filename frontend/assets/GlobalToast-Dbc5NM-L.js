import "./rolldown-runtime-xtsTai4I.js";
import { Et as withCtx, F as createBaseVNode, G as defineComponent, H as createTextVNode, Kt as unref, O as Fragment, R as createElementBlock, St as watch, U as createVNode, Vt as toRaw, Zt as toDisplayString, lt as openBlock } from "./vendor-vue-core-C1utdb0s.js";
import { Dt as useCanvasStore } from "./layoutStore-CZsuzg91.js";
import { t as useToastStore } from "./toastStore-CTfykAzG.js";
import { t as Button_default } from "./Button-j0oCzR82.js";
import { f as useToast, n as script } from "./vendor-primevue-C3d0HJ53.js";
//#region src/components/toast/GlobalToast.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1 = { class: "flex items-center gap-2" };
var _hoisted_2 = {
	key: 0,
	class: "pi pi-exclamation-circle text-warning-background",
	"aria-hidden": "true"
};
var _hoisted_3 = {
	key: 1,
	class: "pi pi-spin pi-spinner text-primary",
	"aria-hidden": "true"
};
var _hoisted_4 = { class: "flex w-full items-center justify-between gap-2" };
var _hoisted_5 = { class: "flex flex-col justify-start" };
var _hoisted_6 = { class: "text-base" };
var _hoisted_7 = { class: "mt-1 text-sm text-base-foreground" };
//#endregion
//#region src/components/toast/GlobalToast.vue
var GlobalToast_default = /* @__PURE__ */ defineComponent({
	__name: "GlobalToast",
	setup(__props) {
		const toast = useToast();
		const toastStore = useToastStore();
		const canvasStore = useCanvasStore();
		/**
		* Messages raised while node selection mode is active. The mode hides the whole
		* toast layer, and adding to a hidden layer would let anything carrying a `life`
		* expire unseen - so they are held here and replayed on exit. Messages without a
		* `life` are sticky in PrimeVue, so errors already on screen survive the hide
		* untouched. Deliberately a plain array: nothing renders it.
		*/
		let deferredMessages = [];
		watch(() => toastStore.messagesToAdd, (newMessages) => {
			if (newMessages.length === 0) return;
			newMessages.forEach((message) => {
				if (canvasStore.isPickingNodes) deferredMessages.push(message);
				else toast.add(message);
			});
			toastStore.messagesToAdd = [];
		}, { deep: true });
		watch(() => canvasStore.isPickingNodes, (active) => {
			if (active) return;
			deferredMessages.splice(0).forEach((message) => {
				toast.add(message);
			});
		});
		watch(() => toastStore.messagesToRemove, (messagesToRemove) => {
			if (messagesToRemove.length === 0) return;
			deferredMessages = deferredMessages.filter((message) => !messagesToRemove.some((removed) => toRaw(removed) === toRaw(message)));
			messagesToRemove.forEach((message) => {
				toast.remove(message);
			});
			toastStore.messagesToRemove = [];
		}, { deep: true });
		watch(() => toastStore.removeAllRequested, (requested) => {
			if (requested) {
				toast.removeAllGroups();
				deferredMessages = [];
				toastStore.removeAllRequested = false;
			}
		});
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock(Fragment, null, [
				createVNode(unref(script), {
					position: "bottom-right",
					class: "graph-toast top-[calc(anchor(--graph-canvas-panel_top,1rem)+0.25rem)] left-[calc(anchor(--graph-canvas-panel_right,anchor(--docked-agent-panel_left,calc(100vw-var(--workspace-inset-right,0px)-0.75rem)))-25.5rem)] z-10000 h-fit w-100 [&_.p-toast-close-button]:size-7 [&_.p-toast-close-icon]:size-4 [&_.p-toast-close-icon]:text-base [&_.p-toast-detail]:text-sm [&_.p-toast-message]:mb-4 [&_.p-toast-message]:min-h-[73px] [&_.p-toast-message-content]:gap-2 [&_.p-toast-message-content]:p-3 [&_.p-toast-message-icon]:size-4.5 [&_.p-toast-message-icon]:text-lg [&_.p-toast-message-text]:gap-2 [&_.p-toast-summary]:text-base"
				}),
				createVNode(unref(script), {
					group: "billing-operation",
					position: "top-right"
				}, {
					message: withCtx((slotProps) => [createBaseVNode("div", _hoisted_1, [slotProps.message.severity === "warn" ? (openBlock(), createElementBlock("i", _hoisted_2)) : (openBlock(), createElementBlock("i", _hoisted_3)), createBaseVNode("span", null, toDisplayString(slotProps.message.summary), 1)])]),
					_: 1
				}),
				createVNode(unref(script), {
					group: "payment-recovery",
					position: "top-right"
				}, {
					message: withCtx((slotProps) => [createBaseVNode("div", _hoisted_4, [createBaseVNode("div", _hoisted_5, [createBaseVNode("div", _hoisted_6, toDisplayString(slotProps.message.summary), 1), createBaseVNode("div", _hoisted_7, toDisplayString(slotProps.message.detail.text), 1)]), createVNode(Button_default, {
						size: "md",
						variant: "inverted",
						onClick: ($event) => slotProps.message.detail.onAction()
					}, {
						default: withCtx(() => [createTextVNode(toDisplayString(slotProps.message.detail.actionLabel), 1)]),
						_: 2
					}, 1032, ["onClick"])])]),
					_: 1
				})
			], 64);
		};
	}
});
//#endregion
export { GlobalToast_default as t };
