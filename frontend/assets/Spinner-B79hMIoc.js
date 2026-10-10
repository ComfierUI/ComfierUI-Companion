import "./rolldown-runtime-xtsTai4I.js";
import { F as createBaseVNode, G as defineComponent, Jt as normalizeClass, Kt as unref, R as createElementBlock, lt as openBlock } from "./vendor-vue-core-C1utdb0s.js";
import { t as cn } from "./src-DI1bBfrb.js";
//#region src/components/ui/spinner/Spinner.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1 = ["aria-label"];
//#endregion
//#region src/components/ui/spinner/Spinner.vue
var Spinner_default = /* @__PURE__ */ defineComponent({
	__name: "Spinner",
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
			return openBlock(), createElementBlock("svg", {
				role: "progressbar",
				"aria-label": _ctx.$t("g.loading"),
				class: normalizeClass(unref(cn)("size-6 animate-spin text-muted-foreground", __props.class)),
				viewBox: "0 0 24 24",
				fill: "none",
				xmlns: "http://www.w3.org/2000/svg"
			}, [..._cache[0] || (_cache[0] = [createBaseVNode("circle", {
				class: "opacity-25",
				cx: "12",
				cy: "12",
				r: "10",
				stroke: "currentColor",
				"stroke-width": "4"
			}, null, -1), createBaseVNode("path", {
				class: "opacity-75",
				fill: "currentColor",
				d: "M4 12a8 8 0 0 1 8-8v4a4 4 0 0 0-4 4H4Z"
			}, null, -1)])], 10, _hoisted_1);
		};
	}
});
//#endregion
export { Spinner_default as t };
