import "./rolldown-runtime-xtsTai4I.js";
import { F as createBaseVNode, G as defineComponent, Jt as normalizeClass, Kt as unref, R as createElementBlock, Zt as toDisplayString, lt as openBlock } from "./vendor-vue-core-C1utdb0s.js";
import { r as useI18n } from "./vendor-i18n-BZvE7WBQ.js";
import { t as cn } from "./src-DI1bBfrb.js";
//#region src/components/loader/Loader.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1 = {
	role: "status",
	class: "inline-flex"
};
var _hoisted_2 = { class: "sr-only" };
//#endregion
//#region src/components/loader/Loader.vue
var Loader_default = /* @__PURE__ */ defineComponent({
	__name: "Loader",
	props: {
		size: {},
		variant: {}
	},
	setup(__props) {
		const { t } = useI18n();
		const sizeClass = __props.size ? {
			sm: "size-4",
			md: "size-8",
			lg: "size-12"
		}[__props.size] : "";
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("span", _hoisted_1, [__props.variant === "loader" ? (openBlock(), createElementBlock("i", {
				key: 0,
				"aria-hidden": "true",
				class: normalizeClass(unref(cn)("icon-[lucide--loader]", unref(sizeClass)))
			}, [..._cache[0] || (_cache[0] = [createBaseVNode("div", { class: "size-full animate-spin bg-conic from-base-foreground from-10% to-muted-foreground to-10%" }, null, -1)])], 2)) : (openBlock(), createElementBlock("i", {
				key: 1,
				"aria-hidden": "true",
				class: normalizeClass(unref(cn)("icon-[lucide--loader-circle] animate-spin", unref(sizeClass)))
			}, null, 2)), createBaseVNode("span", _hoisted_2, toDisplayString(unref(t)("g.loading")), 1)]);
		};
	}
});
//#endregion
export { Loader_default as t };
