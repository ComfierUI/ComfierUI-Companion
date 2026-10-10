import "./rolldown-runtime-xtsTai4I.js";
import { F as createBaseVNode, G as defineComponent, Lt as ref, R as createElementBlock, St as watch, Zt as toDisplayString, lt as openBlock, rt as onBeforeUnmount } from "./vendor-vue-core-C1utdb0s.js";
import { D as useIntersectionObserver } from "./vendor-vueuse-BxKIIsKg.js";
import { n as isAssetPreviewSupported, t as findServerPreviewUrl } from "./assetPreviewUtil-Bh4f-cpr.js";
//#region src/platform/assets/components/Media3DTop.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1 = ["src", "alt"];
var _hoisted_2 = {
	key: 1,
	class: "flex size-full flex-col items-center justify-center gap-2 bg-modal-card-placeholder-background transition-transform duration-300 group-hover:scale-105 group-data-[selected=true]:scale-105"
};
var _hoisted_3 = { class: "text-sm text-base-foreground" };
//#endregion
//#region src/platform/assets/components/Media3DTop.vue
var Media3DTop_default = /* @__PURE__ */ defineComponent({
	__name: "Media3DTop",
	props: { asset: {} },
	setup(__props) {
		const containerRef = ref();
		const thumbnailSrc = ref(null);
		const hasAttempted = ref(false);
		useIntersectionObserver(containerRef, ([entry]) => {
			if (entry?.isIntersecting && !hasAttempted.value) {
				hasAttempted.value = true;
				loadThumbnail();
			}
		});
		async function loadThumbnail() {
			if (__props.asset?.preview_id && __props.asset?.preview_url) {
				thumbnailSrc.value = __props.asset.preview_url;
				return;
			}
			if (!__props.asset?.src) return;
			if (__props.asset.name && isAssetPreviewSupported()) {
				const serverPreviewUrl = await findServerPreviewUrl(__props.asset.name);
				if (serverPreviewUrl) thumbnailSrc.value = serverPreviewUrl;
			}
		}
		function revokeThumbnail() {
			if (thumbnailSrc.value?.startsWith("blob:")) URL.revokeObjectURL(thumbnailSrc.value);
			thumbnailSrc.value = null;
		}
		watch(() => __props.asset?.src, () => {
			if (hasAttempted.value) {
				hasAttempted.value = false;
				revokeThumbnail();
			}
		});
		watch(() => [__props.asset?.preview_id, __props.asset?.preview_url], ([newPreviewId, newPreviewUrl], [, oldPreviewUrl]) => {
			if (newPreviewId && newPreviewUrl && newPreviewUrl !== oldPreviewUrl && !thumbnailSrc.value) {
				thumbnailSrc.value = newPreviewUrl;
				hasAttempted.value = true;
			}
		});
		onBeforeUnmount(revokeThumbnail);
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", {
				ref_key: "containerRef",
				ref: containerRef,
				class: "relative size-full overflow-hidden rounded-sm"
			}, [thumbnailSrc.value ? (openBlock(), createElementBlock("img", {
				key: 0,
				src: thumbnailSrc.value,
				alt: __props.asset?.name,
				class: "size-full object-contain transition-transform duration-300 group-hover:scale-105 group-data-[selected=true]:scale-105",
				draggable: false
			}, null, 8, _hoisted_1)) : (openBlock(), createElementBlock("div", _hoisted_2, [_cache[0] || (_cache[0] = createBaseVNode("i", { class: "icon-[lucide--box] text-3xl text-muted-foreground" }, null, -1)), createBaseVNode("span", _hoisted_3, toDisplayString(_ctx.$t("assetBrowser.media.threeDModelPlaceholder")), 1)]))], 512);
		};
	}
});
//#endregion
export { Media3DTop_default as default };
