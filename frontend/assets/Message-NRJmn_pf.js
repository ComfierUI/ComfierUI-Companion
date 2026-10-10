import "./rolldown-runtime-xtsTai4I.js";
import { U as cva } from "./vendor-other-BPEcPQTD.js";
import { Et as withCtx, F as createBaseVNode, G as defineComponent, I as createBlock, Jt as normalizeClass, Kt as unref, L as createCommentVNode, Q as mergeModels, R as createElementBlock, ft as renderSlot, lt as openBlock, yt as useModel } from "./vendor-vue-core-C1utdb0s.js";
import { t as cn } from "./src-DI1bBfrb.js";
import { t as Button_default } from "./Button-j0oCzR82.js";
//#region src/components/ui/message/message.variants.ts
var messageVariants = cva({
	base: "flex w-full items-start gap-2 rounded-lg border px-3 py-2.75 text-sm",
	variants: { severity: {
		error: "border-destructive-background/40 bg-destructive-background/10 text-base-foreground",
		warning: "border-warning-background/50 bg-warning-background/15 text-base-foreground",
		info: "border-primary-background/40 bg-primary-background/10 text-base-foreground",
		success: "border-success-background/50 bg-success-background/15 text-base-foreground",
		secondary: "border-border-subtle bg-secondary-background text-base-foreground"
	} },
	defaultVariants: { severity: "info" }
});
//#endregion
//#region src/components/ui/message/Message.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1 = {
	key: 0,
	class: "shrink-0",
	"aria-hidden": "true"
};
var _hoisted_2 = { class: "min-w-0 flex-1" };
//#endregion
//#region src/components/ui/message/Message.vue
var Message_default = /* @__PURE__ */ defineComponent({
	__name: "Message",
	props: /*@__PURE__*/ mergeModels({
		severity: {},
		closable: {
			type: Boolean,
			default: false
		},
		class: {
			type: [
				Boolean,
				null,
				String,
				Object,
				Array
			],
			default: ""
		}
	}, {
		"visible": {
			type: Boolean,
			default: true
		},
		"visibleModifiers": {}
	}),
	emits: /*@__PURE__*/ mergeModels(["close"], ["update:visible"]),
	setup(__props, { emit: __emit }) {
		const emit = __emit;
		const visible = useModel(__props, "visible");
		function close(event) {
			visible.value = false;
			emit("close", event);
		}
		return (_ctx, _cache) => {
			return visible.value ? (openBlock(), createElementBlock("div", {
				key: 0,
				role: "alert",
				"aria-live": "assertive",
				"aria-atomic": "true",
				class: normalizeClass(unref(cn)(unref(messageVariants)({ severity: __props.severity }), __props.class))
			}, [
				_ctx.$slots.icon ? (openBlock(), createElementBlock("span", _hoisted_1, [renderSlot(_ctx.$slots, "icon")])) : createCommentVNode("", true),
				createBaseVNode("div", _hoisted_2, [renderSlot(_ctx.$slots, "default")]),
				__props.closable ? (openBlock(), createBlock(Button_default, {
					key: 1,
					type: "button",
					variant: "textonly",
					size: "unset",
					class: "size-6 shrink-0 p-0 text-current",
					"aria-label": _ctx.$t("g.close"),
					onClick: close
				}, {
					default: withCtx(() => [..._cache[0] || (_cache[0] = [createBaseVNode("i", {
						class: "icon-[lucide--x] size-4",
						"aria-hidden": "true"
					}, null, -1)])]),
					_: 1
				}, 8, ["aria-label"])) : createCommentVNode("", true)
			], 2)) : createCommentVNode("", true);
		};
	}
});
//#endregion
export { Message_default as t };
