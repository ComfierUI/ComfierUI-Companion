import "./rolldown-runtime-xtsTai4I.js";
import { Et as withCtx, F as createBaseVNode, G as defineComponent, I as createBlock, Kt as unref, U as createVNode, ft as renderSlot, lt as openBlock } from "./vendor-vue-core-C1utdb0s.js";
import { r as useI18n } from "./vendor-i18n-BZvE7WBQ.js";
import { un as DialogClose_default$1 } from "./vendor-reka-ui-tdehH9A1.js";
import { t as Button_default } from "./Button-j0oCzR82.js";
//#endregion
//#region src/components/ui/dialog/DialogClose.vue
var DialogClose_default = /* @__PURE__ */ defineComponent({
	__name: "DialogClose",
	setup(__props) {
		const { t } = useI18n();
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(DialogClose_default$1), { "as-child": "" }, {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", {}, () => [createVNode(Button_default, {
					"aria-label": unref(t)("g.close"),
					size: "icon",
					variant: "muted-textonly"
				}, {
					default: withCtx(() => [..._cache[0] || (_cache[0] = [createBaseVNode("i", { class: "icon-[lucide--x]" }, null, -1)])]),
					_: 1
				}, 8, ["aria-label"])])]),
				_: 3
			});
		};
	}
});
//#endregion
export { DialogClose_default as t };
