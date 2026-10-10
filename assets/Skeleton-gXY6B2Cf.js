import "./rolldown-runtime-xtsTai4I.js";
import { G as defineComponent, Jt as normalizeClass, Kt as unref, R as createElementBlock, lt as openBlock } from "./vendor-vue-core-C1utdb0s.js";
import { t as cn } from "./src-DI1bBfrb.js";
//#endregion
//#region src/components/ui/skeleton/Skeleton.vue
var Skeleton_default = /* @__PURE__ */ defineComponent({
	__name: "Skeleton",
	props: { class: { type: [
		Boolean,
		null,
		String,
		Object,
		Array
	] } },
	setup(__props) {
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", { class: normalizeClass(unref(cn)("animate-pulse rounded-md bg-secondary-background", __props.class)) }, null, 2);
		};
	}
});
//#endregion
export { Skeleton_default as t };
