import "./rolldown-runtime-xtsTai4I.js";
import { G as defineComponent, Jt as normalizeClass, Kt as unref, R as createElementBlock, ft as renderSlot, lt as openBlock } from "./vendor-vue-core-C1utdb0s.js";
import { t as cn } from "./src-DI1bBfrb.js";
//#endregion
//#region src/components/ui/field/FieldDescription.vue
var FieldDescription_default = /* @__PURE__ */ defineComponent({
	__name: "FieldDescription",
	props: { class: { type: [
		Boolean,
		null,
		String,
		Object,
		Array
	] } },
	setup(__props) {
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("p", {
				"data-slot": "field-description",
				class: normalizeClass(unref(cn)("text-sm/normal font-normal text-muted-foreground group-has-data-[orientation=horizontal]/field:text-balance", "last:mt-0 nth-last-2:-mt-1 [[data-variant=legend]+&]:-mt-1.5", "[&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-base-foreground", __props.class))
			}, [renderSlot(_ctx.$slots, "default")], 2);
		};
	}
});
//#endregion
export { FieldDescription_default as t };
