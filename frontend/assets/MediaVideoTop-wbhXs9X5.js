import "./rolldown-runtime-xtsTai4I.js";
import { F as createBaseVNode, G as defineComponent, Kt as unref, Lt as ref, P as computed, R as createElementBlock, U as createVNode, lt as openBlock } from "./vendor-vue-core-C1utdb0s.js";
import { t as useRetryableMediaSrc } from "./useRetryableMediaSrc-CJ3qVUbY.js";
import { t as VideoPlayOverlay_default } from "./VideoPlayOverlay-CUVI1921.js";
//#region src/platform/assets/components/MediaVideoTop.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1 = ["src", "controls"];
var _hoisted_2 = ["aria-label"];
//#endregion
//#region src/platform/assets/components/MediaVideoTop.vue
var MediaVideoTop_default = /* @__PURE__ */ defineComponent({
	__name: "MediaVideoTop",
	props: {
		asset: {},
		showNativeControls: {
			type: Boolean,
			default: true
		}
	},
	setup(__props) {
		const videoElement = ref(null);
		const isHovered = ref(false);
		const isPlaying = ref(false);
		const { src, status, onError } = useRetryableMediaSrc(() => __props.asset.src || void 0);
		const shouldShowControls = computed(() => __props.showNativeControls && isPlaying.value && isHovered.value);
		const onVideoPlay = () => {
			isPlaying.value = true;
		};
		const onVideoPause = () => {
			isPlaying.value = false;
		};
		const handleVideoError = () => {
			isPlaying.value = false;
			onError();
		};
		async function onVideoClick(event) {
			if (event.shiftKey || event.metaKey || event.ctrlKey || shouldShowControls.value) return;
			const video = videoElement.value;
			if (!video) return;
			if (video.paused || video.ended) {
				await video.play().catch(() => {});
				return;
			}
			video.pause();
		}
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", {
				class: "relative size-full overflow-hidden rounded-sm bg-black",
				onMouseenter: _cache[0] || (_cache[0] = ($event) => isHovered.value = true),
				onMouseleave: _cache[1] || (_cache[1] = ($event) => isHovered.value = false)
			}, [unref(status) !== "failed" ? (openBlock(), createElementBlock("video", {
				key: 0,
				ref_key: "videoElement",
				ref: videoElement,
				"data-testid": "media-asset-video",
				src: unref(src),
				controls: shouldShowControls.value,
				preload: "metadata",
				muted: "",
				loop: "",
				playsinline: "",
				class: "relative size-full object-contain transition-transform duration-300 group-hover:scale-105 group-data-[selected=true]:scale-105",
				onClick: onVideoClick,
				onPlay: onVideoPlay,
				onPause: onVideoPause,
				onError: handleVideoError
			}, null, 40, _hoisted_1)) : (openBlock(), createElementBlock("div", {
				key: 1,
				role: "img",
				"aria-label": _ctx.$t("g.videoFailedToLoad"),
				class: "flex size-full items-center justify-center bg-modal-card-placeholder-background"
			}, [..._cache[2] || (_cache[2] = [createBaseVNode("i", { class: "icon-[lucide--video-off] size-8 text-muted-foreground" }, null, -1)])], 8, _hoisted_2)), createVNode(VideoPlayOverlay_default, {
				visible: !isPlaying.value && unref(status) !== "failed",
				size: "md"
			}, null, 8, ["visible"])], 32);
		};
	}
});
//#endregion
export { MediaVideoTop_default as default };
