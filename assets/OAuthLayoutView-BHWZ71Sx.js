import "./rolldown-runtime-xtsTai4I.js";
import { F as createBaseVNode, G as defineComponent, Kt as unref, O as Fragment, R as createElementBlock, U as createVNode, lt as openBlock, n as RouterView, ot as onMounted } from "./vendor-vue-core-C1utdb0s.js";
import { t as GlobalToast_default } from "./GlobalToast-Dbc5NM-L.js";
//#region src/platform/cloud/onboarding/components/OAuthLayoutView.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1 = { class: "dark-theme relative h-svh w-screen overflow-y-auto bg-primary-comfy-ink font-sans text-primary-comfy-canvas" };
//#endregion
//#region src/platform/cloud/onboarding/components/OAuthLayoutView.vue
var OAuthLayoutView_default = /* @__PURE__ */ defineComponent({
	__name: "OAuthLayoutView",
	setup(__props) {
		onMounted(() => {
			document.getElementById("splash-loader")?.remove();
		});
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock(Fragment, null, [createBaseVNode("div", _hoisted_1, [_cache[0] || (_cache[0] = createBaseVNode("i", {
				class: "absolute top-6 left-6 icon-[comfy--comfy-logo] aspect-173/48 h-5 w-auto text-brand-yellow md:h-6",
				"aria-hidden": "true"
			}, null, -1)), createVNode(unref(RouterView))]), createVNode(GlobalToast_default)], 64);
		};
	}
});
//#endregion
export { OAuthLayoutView_default as default };
