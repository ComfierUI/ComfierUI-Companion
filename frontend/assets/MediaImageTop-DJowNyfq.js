import "./rolldown-runtime-xtsTai4I.js";
import { F as createBaseVNode, G as defineComponent, Kt as unref, R as createElementBlock, lt as openBlock } from "./vendor-vue-core-C1utdb0s.js";
import { dt as whenever } from "./vendor-vueuse-BxKIIsKg.js";
import { c as getAssetDisplayName, t as useImageQuiet } from "./useImageQuiet-Ded8W_Zd.js";
//#region src/platform/assets/components/MediaImageTop.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1 = { class: "relative size-full overflow-hidden rounded-sm bg-modal-card-placeholder-background" };
var _hoisted_2 = ["src", "alt"];
var _hoisted_3 = {
	key: 1,
	class: "flex size-full items-center justify-center bg-modal-card-placeholder-background"
};
//#endregion
//#region src/platform/assets/components/MediaImageTop.vue
var MediaImageTop_default = /* @__PURE__ */ defineComponent({
	__name: "MediaImageTop",
	props: { asset: {} },
	emits: ["image-loaded"],
	setup(__props, { emit: __emit }) {
		const emit = __emit;
		const { state, error, isReady } = useImageQuiet({
			src: __props.asset.src ?? "",
			alt: getAssetDisplayName(__props.asset)
		});
		whenever(() => isReady.value && state.value?.naturalWidth && state.value?.naturalHeight, () => emit("image-loaded", state.value.naturalWidth, state.value.naturalHeight));
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", _hoisted_1, [!unref(error) ? (openBlock(), createElementBlock("img", {
				key: 0,
				src: __props.asset.src,
				alt: unref(getAssetDisplayName)(__props.asset),
				class: "size-full object-contain transition-transform duration-300 group-hover:scale-105 group-data-[selected=true]:scale-105",
				draggable: false
			}, null, 8, _hoisted_2)) : (openBlock(), createElementBlock("div", _hoisted_3, [..._cache[0] || (_cache[0] = [createBaseVNode("i", { class: "pi pi-image text-3xl text-muted-foreground" }, null, -1)])]))]);
		};
	}
});
//#endregion
export { MediaImageTop_default as default };
