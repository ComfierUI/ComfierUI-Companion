import "./rolldown-runtime-xtsTai4I.js";
import { F as createBaseVNode, G as defineComponent, P as computed, R as createElementBlock, Zt as toDisplayString, lt as openBlock } from "./vendor-vue-core-C1utdb0s.js";
import { t as useTextFileContent } from "./useTextFileContent-XxRImuXq.js";
//#region src/platform/assets/components/MediaTextTop.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1 = { class: "relative size-full overflow-hidden rounded-sm" };
var _hoisted_2 = { class: "size-full bg-modal-card-placeholder-background transition-transform duration-300 group-hover:scale-105 group-data-[selected=true]:scale-105" };
var _hoisted_3 = {
	key: 0,
	class: "m-0 size-full overflow-hidden p-2 text-left text-xs/4 wrap-break-word whitespace-pre-wrap text-base-foreground"
};
var _hoisted_4 = {
	key: 1,
	class: "flex size-full items-center justify-center"
};
var MAX_SNIPPET_LENGTH = 1e3;
//#endregion
//#region src/platform/assets/components/MediaTextTop.vue
var MediaTextTop_default = /* @__PURE__ */ defineComponent({
	__name: "MediaTextTop",
	props: { asset: {} },
	setup(__props) {
		const { textContent } = useTextFileContent(() => ({ url: __props.asset.preview_url || __props.asset.src }));
		const snippet = computed(() => textContent.value.slice(0, MAX_SNIPPET_LENGTH));
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", _hoisted_1, [createBaseVNode("div", _hoisted_2, [snippet.value ? (openBlock(), createElementBlock("p", _hoisted_3, toDisplayString(snippet.value), 1)) : (openBlock(), createElementBlock("div", _hoisted_4, [..._cache[0] || (_cache[0] = [createBaseVNode("i", { class: "icon-[lucide--text] text-3xl text-base-foreground" }, null, -1)])]))])]);
		};
	}
});
//#endregion
export { MediaTextTop_default as default };
