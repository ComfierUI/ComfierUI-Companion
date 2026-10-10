import "./rolldown-runtime-xtsTai4I.js";
import { G as defineComponent, Jt as normalizeClass, Kt as unref, R as createElementBlock, ft as renderSlot, lt as openBlock } from "./vendor-vue-core-C1utdb0s.js";
import { t as cn } from "./src-DI1bBfrb.js";
import { l as ZIndex } from "./vendor-primevue-C3d0HJ53.js";
//#endregion
//#region src/components/ui/dialog/DialogHeader.vue
var DialogHeader_default = /* @__PURE__ */ defineComponent({
	__name: "DialogHeader",
	props: { class: {
		type: [
			Boolean,
			null,
			String,
			Object,
			Array
		],
		default: ""
	} },
	setup(__props) {
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", { class: normalizeClass(unref(cn)("flex shrink-0 items-center justify-between gap-2 px-4 pt-4 pb-2", __props.class)) }, [renderSlot(_ctx.$slots, "default")], 2);
		};
	}
});
//#endregion
//#region src/components/dialog/vRekaZIndex.ts
/** Shared PrimeVue/Reka modal stacking sequence; later registrations cover earlier ones. */
var MODAL_Z_KEY = "modal";
var MODAL_Z_BASE = 1700;
var vRekaZIndex = {
	mounted(el) {
		ZIndex.set(MODAL_Z_KEY, el, MODAL_Z_BASE);
	},
	beforeUnmount(el) {
		ZIndex.clear(el);
	}
};
//#endregion
export { DialogHeader_default as i, MODAL_Z_KEY as n, vRekaZIndex as r, MODAL_Z_BASE as t };
