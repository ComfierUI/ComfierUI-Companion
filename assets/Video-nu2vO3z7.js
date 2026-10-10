import "./rolldown-runtime-xtsTai4I.js";
import { $ as mergeProps, Ct as watchEffect, Et as withCtx, F as createBaseVNode, G as defineComponent, I as createBlock, Jt as normalizeClass, L as createCommentVNode, Lt as ref, O as Fragment, P as computed, R as createElementBlock, dt as renderList, ft as renderSlot, lt as openBlock, xt as useTemplateRef } from "./vendor-vue-core-C1utdb0s.js";
import { R as usePreferredReducedMotion } from "./vendor-vueuse-BxKIIsKg.js";
import { t as Button_default } from "./Button-j0oCzR82.js";
//#region src/components/common/Video.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1 = {
	key: 0,
	class: "relative"
};
var _hoisted_2 = [
	"poster",
	"autoplay",
	"muted",
	"loop",
	"playsinline"
];
var _hoisted_3 = [
	"src",
	"type",
	"onError"
];
//#endregion
//#region src/components/common/Video.vue
var Video_default = /* @__PURE__ */ defineComponent({
	inheritAttrs: false,
	__name: "Video",
	props: {
		sources: { default: () => [] },
		posterSrc: { default: "" },
		autoplay: {
			type: Boolean,
			default: false
		},
		muted: {
			type: Boolean,
			default: false
		},
		loop: {
			type: Boolean,
			default: false
		},
		playsInline: {
			type: Boolean,
			default: false
		},
		playbackControl: {
			type: Boolean,
			default: false
		}
	},
	setup(__props) {
		const video = useTemplateRef("video");
		const failed = ref(false);
		const playing = ref(false);
		const reducedMotion = usePreferredReducedMotion();
		const shouldAutoplay = computed(() => __props.autoplay && reducedMotion.value !== "reduce");
		watchEffect(() => {
			if (__props.autoplay && !shouldAutoplay.value) video.value?.pause();
		});
		function togglePlayback() {
			const element = video.value;
			if (!element) return;
			if (!element.paused) element.pause();
			else element.play().catch(() => {
				playing.value = false;
			});
		}
		return (_ctx, _cache) => {
			return __props.sources.length && !failed.value ? (openBlock(), createElementBlock("div", _hoisted_1, [createBaseVNode("video", mergeProps({
				ref_key: "video",
				ref: video
			}, _ctx.$attrs, {
				poster: __props.posterSrc || void 0,
				autoplay: shouldAutoplay.value,
				muted: __props.muted,
				loop: __props.loop,
				playsinline: __props.playsInline,
				onPlay: _cache[0] || (_cache[0] = ($event) => playing.value = true),
				onPause: _cache[1] || (_cache[1] = ($event) => playing.value = false),
				onError: _cache[2] || (_cache[2] = ($event) => failed.value = true)
			}), [(openBlock(true), createElementBlock(Fragment, null, renderList(__props.sources, (source, index) => {
				return openBlock(), createElementBlock("source", {
					key: source.src,
					src: source.src,
					type: source.type,
					onError: ($event) => failed.value = index === __props.sources.length - 1
				}, null, 40, _hoisted_3);
			}), 128))], 16, _hoisted_2), __props.playbackControl ? (openBlock(), createBlock(Button_default, {
				key: 0,
				variant: "overlay-white",
				size: "icon",
				class: "absolute right-3 bottom-3",
				"aria-label": playing.value ? _ctx.$t("g.pause") : _ctx.$t("g.play"),
				onClick: togglePlayback
			}, {
				default: withCtx(() => [createBaseVNode("i", {
					class: normalizeClass(playing.value ? "icon-[lucide--pause]" : "icon-[lucide--play]"),
					"aria-hidden": "true"
				}, null, 2)]),
				_: 1
			}, 8, ["aria-label"])) : createCommentVNode("", true)])) : renderSlot(_ctx.$slots, "fallback", {}, void 0, void 0, 1);
		};
	}
});
//#endregion
export { Video_default as t };
