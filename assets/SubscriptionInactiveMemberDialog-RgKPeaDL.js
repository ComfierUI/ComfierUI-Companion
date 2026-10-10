import "./rolldown-runtime-xtsTai4I.js";
import { Et as withCtx, F as createBaseVNode, G as defineComponent, H as createTextVNode, R as createElementBlock, U as createVNode, Zt as toDisplayString, lt as openBlock } from "./vendor-vue-core-C1utdb0s.js";
import { t as Button_default } from "./Button-j0oCzR82.js";
//#region src/platform/workspace/components/SubscriptionInactiveMemberDialog.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1 = {
	class: "flex flex-col overflow-hidden rounded-2xl border border-border-default bg-base-background",
	"data-testid": "member-resubscribe-message"
};
var _hoisted_2 = { class: "flex h-12 items-center gap-2 border-b border-border-default p-4" };
var _hoisted_3 = { class: "m-0 min-w-0 flex-1 font-inter text-sm text-base-foreground" };
var _hoisted_4 = ["aria-label"];
var _hoisted_5 = { class: "p-4" };
var _hoisted_6 = { class: "m-0 font-inter text-sm text-muted-foreground" };
var _hoisted_7 = { class: "flex items-center justify-end p-4" };
//#endregion
//#region src/platform/workspace/components/SubscriptionInactiveMemberDialog.vue
var SubscriptionInactiveMemberDialog_default = /* @__PURE__ */ defineComponent({
	__name: "SubscriptionInactiveMemberDialog",
	props: { onClose: { type: Function } },
	setup(__props) {
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", _hoisted_1, [
				createBaseVNode("div", _hoisted_2, [createBaseVNode("p", _hoisted_3, toDisplayString(_ctx.$t("subscription.inactive.memberTitle")), 1), createBaseVNode("button", {
					type: "button",
					"aria-label": _ctx.$t("g.close"),
					class: "flex size-4 shrink-0 cursor-pointer items-center justify-center border-none bg-transparent text-base-foreground",
					onClick: _cache[0] || (_cache[0] = (...args) => __props.onClose && __props.onClose(...args))
				}, [..._cache[1] || (_cache[1] = [createBaseVNode("i", { class: "pi pi-times text-xs" }, null, -1)])], 8, _hoisted_4)]),
				createBaseVNode("div", _hoisted_5, [createBaseVNode("p", _hoisted_6, toDisplayString(_ctx.$t("subscription.inactive.memberDescription")), 1)]),
				createBaseVNode("div", _hoisted_7, [createVNode(Button_default, {
					variant: "secondary",
					size: "lg",
					onClick: __props.onClose
				}, {
					default: withCtx(() => [createTextVNode(toDisplayString(_ctx.$t("subscription.inactive.memberCta")), 1)]),
					_: 1
				}, 8, ["onClick"])])
			]);
		};
	}
});
//#endregion
export { SubscriptionInactiveMemberDialog_default as default };
