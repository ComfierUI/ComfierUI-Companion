import "./rolldown-runtime-xtsTai4I.js";
import { Lt as clamp } from "./vendor-other-BPEcPQTD.js";
import { Et as withCtx, F as createBaseVNode, G as defineComponent, H as createTextVNode, I as createBlock, Jt as normalizeClass, Kt as unref, L as createCommentVNode, Lt as ref, O as Fragment, P as computed, R as createElementBlock, St as watch, U as createVNode, Wt as toValue, Xt as normalizeStyle, Zt as toDisplayString, c as useRoute, dt as renderList, ft as renderSlot, lt as openBlock, n as RouterView, ot as onMounted, xt as useTemplateRef } from "./vendor-vue-core-C1utdb0s.js";
import { D as useIntersectionObserver, R as usePreferredReducedMotion, g as useDocumentVisibility, lt as useTimeoutFn, m as useBreakpoints, o as breakpointsTailwind, z as useRafFn } from "./vendor-vueuse-BxKIIsKg.js";
import { k as wrapIndex } from "./layoutStore-CZsuzg91.js";
import { r as useI18n } from "./vendor-i18n-BZvE7WBQ.js";
import { t as cn } from "./src-DI1bBfrb.js";
import { t as Button_default } from "./Button-j0oCzR82.js";
import { t as GlobalToast_default } from "./GlobalToast-Dbc5NM-L.js";
//#region ../../../../../../assets/images/comfy-logo-wordmark.svg
var comfy_logo_wordmark_default = "" + new URL("images/comfy-logo-wordmark.svg", import.meta.url).href;
//#endregion
//#region src/platform/cloud/onboarding/composables/useProgressBarPainter.ts
/**
* Fraction of the way to the next slide. Falls back to elapsed wall-clock against
* the watchdog's delay, so a buffering video still tracks when it will change.
*/
function slideProgress({ currentTime, duration, elapsedMs, fallbackMs }) {
	const ratio = Number.isFinite(duration) && duration > 0 ? currentTime / duration : elapsedMs / fallbackMs;
	return clamp(ratio, 0, 1);
}
/**
* Writes to the DOM each frame; a 60Hz ref would re-diff every mounted video.
* Sets `scale`, not `transform`: Tailwind compiles `scale-x-*` to the standalone
* `scale` property, so `transform` would multiply against the class.
*/
function useProgressBarPainter({ target, progress, active }) {
	const paint = () => {
		const el = toValue(target);
		if (el) el.style.scale = `${clamp(progress(), 0, 1)} 1`;
	};
	const { pause, resume } = useRafFn(paint, { immediate: false });
	watch([() => toValue(active), () => toValue(target)], ([isActive, el]) => {
		pause();
		if (!el) return;
		paint();
		if (isActive) resume();
	}, { immediate: true });
}
//#endregion
//#region src/platform/cloud/onboarding/composables/useVideoCarousel.ts
var DEFAULT_FALLBACK_MS = 6e3;
function useVideoCarousel({ count, root, fallbackMs = DEFAULT_FALLBACK_MS }) {
	const activeIndex = ref(0);
	const failedIndices = ref(/* @__PURE__ */ new Set());
	const isPlaying = ref(false);
	const videoEls = ref([]);
	/** Optimistic: the hero is above the fold, and waiting for the observer's
	*  first callback would cost a frame of playback. */
	const isVisible = ref(true);
	useIntersectionObserver(root, ([entry]) => {
		isVisible.value = entry.isIntersecting;
	});
	const documentVisibility = useDocumentVisibility();
	const motionPreference = usePreferredReducedMotion();
	const shouldPlay = computed(() => motionPreference.value !== "reduce" && isVisible.value && documentVisibility.value !== "hidden" && !failedIndices.value.has(activeIndex.value));
	const setVideoRef = (index, el) => {
		videoEls.value[index] = el instanceof HTMLVideoElement ? el : null;
	};
	const activeVideo = computed(() => videoEls.value[activeIndex.value] ?? null);
	/** The direction the last move was asked to travel. Skipping a failed slide
	*  can land further than one slot, so the gap between indices does not
	*  reveal it. */
	const lastStep = ref(1);
	/** Nearest slide in `delta`'s direction that has not failed. */
	const step = (delta) => {
		if (count === 0) return;
		if (failedIndices.value.size >= count) failedIndices.value = /* @__PURE__ */ new Set();
		let candidate = activeIndex.value;
		for (let attempt = 0; attempt < count; attempt++) {
			candidate = wrapIndex(candidate + delta, count);
			if (!failedIndices.value.has(candidate)) break;
		}
		lastStep.value = delta;
		activeIndex.value = candidate;
	};
	const goToNextSlide = () => step(1);
	const goToPreviousSlide = () => step(-1);
	/** Media events fire per slide; only the active one may act. */
	const forActiveSlide = (handle) => (index) => {
		if (index === activeIndex.value) handle();
	};
	/** Outside reactivity: read once per frame by `progress()`, never in a render. */
	let slideStartedAt = performance.now();
	watch(activeIndex, () => {
		slideStartedAt = performance.now();
		isPlaying.value = false;
		const incoming = activeVideo.value;
		if (incoming) incoming.currentTime = 0;
	});
	const pauseInactiveVideos = () => {
		for (const [index, video] of videoEls.value.entries()) if (video && index !== activeIndex.value) video.pause();
	};
	watch([shouldPlay, activeVideo], ([mayPlay, video]) => {
		pauseInactiveVideos();
		if (!video) return;
		if (!mayPlay) {
			video.pause();
			return;
		}
		video.play().catch(() => {});
	}, { immediate: true });
	const { start: startWatchdog, stop: stopWatchdog } = useTimeoutFn(goToNextSlide, fallbackMs, { immediate: false });
	/** Armed during playback too: a mid-decode freeze emits no `waiting`, `pause`
	*  or `ended`, so silence from `timeupdate` is the only signal it died. */
	const armWatchdog = () => {
		stopWatchdog();
		if (count > 1 && shouldPlay.value) startWatchdog();
	};
	watch([
		isPlaying,
		activeIndex,
		shouldPlay
	], armWatchdog, { immediate: true });
	const nextIndex = computed(() => count > 1 ? wrapIndex(activeIndex.value + 1, count) : -1);
	return {
		activeIndex,
		lastStep,
		setVideoRef,
		isCarouselActive: computed(() => shouldPlay.value || isPlaying.value),
		next: goToNextSlide,
		previous: goToPreviousSlide,
		onPlaying: forActiveSlide(() => {
			isPlaying.value = true;
		}),
		onStalled: forActiveSlide(() => {
			isPlaying.value = false;
		}),
		onEnded: forActiveSlide(goToNextSlide),
		/** Each report pushes the stall deadline out. */
		onProgress: forActiveSlide(armWatchdog),
		/** Marks the source dead so `step` skips it. */
		onError: (index) => {
			if (failedIndices.value.has(index)) return;
			failedIndices.value = new Set(failedIndices.value).add(index);
			if (index === activeIndex.value) goToNextSlide();
		},
		/**
		* The next slide arms only once the current one is playing, so two clips
		* never compete for bandwidth. `none`, not `metadata`, for the rest: that
		* would still open a connection per slide.
		*/
		preloadFor: (index) => index === activeIndex.value || isPlaying.value && index === nextIndex.value ? "auto" : "none",
		progress: () => slideProgress({
			currentTime: activeVideo.value?.currentTime ?? 0,
			duration: activeVideo.value?.duration ?? NaN,
			elapsedMs: performance.now() - slideStartedAt,
			fallbackMs
		})
	};
}
//#endregion
//#region src/platform/cloud/onboarding/constants/heroSlides.ts
/** Hero carousel media on media.comfy.org (gs://comfy-org-videos/website/cloud/onboarding). */
var HERO_MEDIA = "https://media.comfy.org/website/cloud/onboarding";
var HERO_SLIDES = [
	{
		id: "nano-banana-pro",
		title: "Nano Banana Pro",
		provider: "gemini",
		src: `${HERO_MEDIA}/hero-1.webm`,
		poster: `${HERO_MEDIA}/hero-1.webp`,
		mimeType: "video/webm"
	},
	{
		id: "seedream-4",
		title: "Seedream 4",
		provider: "bytedance",
		src: `${HERO_MEDIA}/hero-2.webm`,
		poster: `${HERO_MEDIA}/hero-2.webp`,
		mimeType: "video/webm"
	},
	{
		id: "kling-2-5",
		title: "Kling 2.5",
		provider: "kling",
		src: `${HERO_MEDIA}/hero-3.webm`,
		poster: `${HERO_MEDIA}/hero-3.webp`,
		mimeType: "video/webm"
	}
];
var PROVIDER_ICON = {
	gemini: "icon-mask-[comfy--gemini]",
	openai: "icon-mask-[comfy--openai]",
	kling: "icon-mask-[comfy--kling]",
	bytedance: "icon-mask-[comfy--bytedance]"
};
//#endregion
//#region src/platform/cloud/onboarding/components/CloudHeroCarousel.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1$3 = ["aria-roledescription", "aria-label"];
var _hoisted_2$3 = {
	class: "sr-only",
	role: "status",
	"aria-live": "polite"
};
var _hoisted_3$3 = { class: "relative min-h-0 w-full flex-1 overflow-clip rounded-[2.5rem] bg-primary-comfy-canvas/4" };
var _hoisted_4$3 = [
	"aria-roledescription",
	"aria-label",
	"aria-hidden",
	"inert"
];
var _hoisted_5$2 = [
	"poster",
	"preload",
	"loop",
	"onPlaying",
	"onTimeupdate",
	"onWaiting",
	"onPause",
	"onEnded",
	"onError"
];
var _hoisted_6$2 = ["src", "type"];
var _hoisted_7$1 = { class: "absolute inset-x-0 bottom-0 flex items-center gap-4 p-5 xl:p-6 2xl:p-8" };
var _hoisted_8 = { class: "flex size-12 shrink-0 items-center justify-center rounded-3xl bg-transparency-white-t8 backdrop-blur-[6px] xl:size-16" };
var _hoisted_9 = { class: "m-0 text-2xl/tight font-medium tracking-tight text-primary-warm-white xl:text-3xl/tight 2xl:text-4xl/tight" };
var _hoisted_10 = {
	key: 0,
	class: "flex w-full shrink-0 items-center gap-4 xl:gap-6"
};
var _hoisted_11 = { class: "h-2 min-w-0 flex-1 overflow-clip rounded-full bg-transparency-white-t20 backdrop-blur-[30px]" };
var SLIDE_LEAD = 1;
//#endregion
//#region src/platform/cloud/onboarding/components/CloudHeroCarousel.vue
var CloudHeroCarousel_default = /* @__PURE__ */ defineComponent({
	__name: "CloudHeroCarousel",
	setup(__props) {
		const { t } = useI18n();
		const rootEl = useTemplateRef("rootEl");
		const progressFillEl = useTemplateRef("progressFillEl");
		const trackEl = useTemplateRef("trackEl");
		/** Slots of run-up kept before the active slide, so a backwards step has
		*  somewhere to come from. One is enough: only ever one slide is in flight. */
		const forceReflow = (el) => void el.offsetWidth;
		const slides = HERO_SLIDES;
		const { activeIndex, lastStep, setVideoRef, isCarouselActive, next, previous, onPlaying, onProgress, onStalled, onEnded, onError, preloadFor, progress } = useVideoCarousel({
			count: slides.length,
			root: rootEl
		});
		useProgressBarPainter({
			target: progressFillEl,
			progress,
			active: isCarouselActive
		});
		const announcement = ref("");
		const announceCurrentSlide = () => {
			const slide = slides[activeIndex.value];
			if (!slide) return;
			announcement.value = t("cloudHero.slideStatus", {
				title: slide.title,
				current: activeIndex.value + 1,
				total: slides.length
			});
		};
		const goToNext = () => {
			next();
			announceCurrentSlide();
		};
		const goToPrevious = () => {
			previous();
			announceCurrentSlide();
		};
		/**
		* Rotates the flex order so the active slide always sits at the same slot, with
		* a neighbour either side. Keeping every slide in flow matters: the frame is
		* `w-auto` with a fixed aspect ratio, so it derives its width from the height of
		* its in-flow children and collapses if they are taken out.
		*/
		const slideOrder = (index) => wrapIndex(index - activeIndex.value + SLIDE_LEAD, slides.length);
		const RESTING_X = -100;
		/**
		* `order` applies instantly, so animating it directly would teleport. Instead
		* the strip is nudged one slot opposite the travel and released on the next
		* frame, which turns every move -- including the wrap -- into the same
		* one-slide glide in the direction the user asked for.
		*/
		watch(activeIndex, (to, from) => {
			const track = trackEl.value;
			if (!track || to === from) return;
			const offscreenX = RESTING_X + lastStep.value * 100;
			const slideFrom = (x) => {
				track.style.transition = "none";
				track.style.transform = `translateX(${x}%)`;
			};
			const releaseTo = (x) => {
				track.style.transition = "";
				track.style.transform = `translateX(${x}%)`;
			};
			slideFrom(offscreenX);
			forceReflow(track);
			releaseTo(RESTING_X);
		});
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", {
				ref_key: "rootEl",
				ref: rootEl,
				class: "flex size-full min-h-0 flex-col items-center justify-center px-6 py-8 xl:p-10 2xl:px-14"
			}, [createBaseVNode("div", {
				role: "group",
				"aria-roledescription": unref(t)("cloudHero.carouselRoleDescription"),
				"aria-label": unref(t)("cloudHero.carouselLabel"),
				class: "flex min-h-0 w-full max-w-3xl flex-1 flex-col gap-4 xl:gap-5 2xl:gap-6"
			}, [
				createBaseVNode("p", _hoisted_2$3, toDisplayString(announcement.value), 1),
				createBaseVNode("div", _hoisted_3$3, [createBaseVNode("div", {
					ref_key: "trackEl",
					ref: trackEl,
					class: "flex size-full motion-safe:transition-transform motion-safe:duration-500 motion-safe:ease-out",
					style: normalizeStyle({ transform: `translateX(-100%)` })
				}, [(openBlock(true), createElementBlock(Fragment, null, renderList(unref(slides), (slide, index) => {
					return openBlock(), createElementBlock("div", {
						key: slide.id,
						role: "group",
						"aria-roledescription": unref(t)("cloudHero.slideRoleDescription"),
						"aria-label": slide.title,
						"aria-hidden": index !== unref(activeIndex),
						inert: index !== unref(activeIndex),
						class: "relative size-full shrink-0",
						style: normalizeStyle({ order: slideOrder(index) })
					}, [
						createBaseVNode("video", {
							ref_for: true,
							ref: (el) => unref(setVideoRef)(index, el),
							poster: slide.poster,
							preload: unref(preloadFor)(index),
							loop: unref(slides).length === 1,
							muted: "",
							playsinline: "",
							disablepictureinpicture: "",
							disableremoteplayback: "",
							"aria-hidden": "true",
							class: "cloud-hero-video size-full object-cover object-center",
							onPlaying: ($event) => unref(onPlaying)(index),
							onTimeupdate: ($event) => unref(onProgress)(index),
							onWaiting: ($event) => unref(onStalled)(index),
							onPause: ($event) => unref(onStalled)(index),
							onEnded: ($event) => unref(onEnded)(index),
							onError: ($event) => unref(onError)(index)
						}, [createBaseVNode("source", {
							src: slide.src,
							type: slide.mimeType
						}, null, 8, _hoisted_6$2)], 40, _hoisted_5$2),
						_cache[0] || (_cache[0] = createBaseVNode("div", {
							"aria-hidden": "true",
							class: "pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-black/70 to-transparent"
						}, null, -1)),
						createBaseVNode("div", _hoisted_7$1, [createBaseVNode("span", _hoisted_8, [createBaseVNode("i", { class: normalizeClass(unref(cn)(unref(PROVIDER_ICON)[slide.provider], "size-6 xl:size-8")) }, null, 2)]), createBaseVNode("p", _hoisted_9, toDisplayString(slide.title), 1)])
					], 12, _hoisted_4$3);
				}), 128))], 4)]),
				unref(slides).length > 1 ? (openBlock(), createElementBlock("div", _hoisted_10, [
					createBaseVNode("div", _hoisted_11, [createBaseVNode("div", {
						ref_key: "progressFillEl",
						ref: progressFillEl,
						class: "size-full origin-left scale-x-0 bg-brand-yellow shadow-[0_0_8px_-1px_white] will-change-transform"
					}, null, 512)]),
					createVNode(Button_default, {
						type: "button",
						variant: "brand-ghost-accent",
						size: "brand-icon",
						class: "shrink-0",
						"aria-label": unref(t)("cloudHero.previousSlide"),
						onClick: goToPrevious
					}, {
						default: withCtx(() => [..._cache[1] || (_cache[1] = [createBaseVNode("i", { class: "icon-[lucide--chevron-left] size-6" }, null, -1)])]),
						_: 1
					}, 8, ["aria-label"]),
					createVNode(Button_default, {
						type: "button",
						variant: "brand-ghost-accent",
						size: "brand-icon",
						class: "shrink-0",
						"aria-label": unref(t)("cloudHero.nextSlide"),
						onClick: goToNext
					}, {
						default: withCtx(() => [..._cache[2] || (_cache[2] = [createBaseVNode("i", { class: "icon-[lucide--chevron-right] size-6" }, null, -1)])]),
						_: 1
					}, 8, ["aria-label"])
				])) : createCommentVNode("", true)
			], 8, _hoisted_1$3)], 512);
		};
	}
});
//#endregion
//#region src/platform/cloud/onboarding/components/CloudTemplateFooter.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1$2 = { class: "mt-10 flex w-full shrink-0 items-start justify-center gap-2.5" };
var _hoisted_2$2 = {
	href: "https://comfy.org/terms-of-service/",
	target: "_blank",
	rel: "noopener noreferrer",
	class: "cursor-pointer text-sm text-primary-comfy-canvas/60 no-underline"
};
var _hoisted_3$2 = {
	href: "https://comfy.org/privacy-policy/",
	target: "_blank",
	rel: "noopener noreferrer",
	class: "cursor-pointer text-sm text-primary-comfy-canvas/60 no-underline"
};
var _hoisted_4$2 = {
	href: "https://support.comfy.org",
	class: "cursor-pointer text-sm text-primary-comfy-canvas/60 no-underline",
	target: "_blank",
	rel: "noopener noreferrer"
};
//#endregion
//#region src/platform/cloud/onboarding/components/CloudTemplateFooter.vue
var CloudTemplateFooter_default = /* @__PURE__ */ defineComponent({
	__name: "CloudTemplateFooter",
	setup(__props) {
		const { t } = useI18n();
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("footer", _hoisted_1$2, [
				createBaseVNode("a", _hoisted_2$2, toDisplayString(unref(t)("auth.login.termsLink")), 1),
				createBaseVNode("a", _hoisted_3$2, toDisplayString(unref(t)("auth.login.privacyLink")), 1),
				createBaseVNode("a", _hoisted_4$2, toDisplayString(unref(t)("cloudFooter_needHelp")), 1)
			]);
		};
	}
});
//#endregion
//#region src/platform/cloud/onboarding/components/CloudTermsNotice.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1$1 = { class: "mt-10 shrink-0 text-center text-sm/relaxed text-primary-warm-gray" };
var _hoisted_2$1 = { class: "my-0" };
var _hoisted_3$1 = {
	href: "https://comfy.org/terms-of-service/",
	target: "_blank",
	rel: "noopener noreferrer",
	class: "text-primary-comfy-canvas underline"
};
var _hoisted_4$1 = {
	href: "https://comfy.org/privacy-policy/",
	target: "_blank",
	rel: "noopener noreferrer",
	class: "text-primary-comfy-canvas underline"
};
var _hoisted_5$1 = { class: "my-4 text-xs/relaxed" };
var _hoisted_6$1 = {
	href: "https://support.comfy.org",
	target: "_blank",
	rel: "noopener noreferrer",
	class: "text-primary-comfy-canvas underline"
};
//#endregion
//#region src/platform/cloud/onboarding/components/CloudTermsNotice.vue
var CloudTermsNotice_default = /* @__PURE__ */ defineComponent({
	__name: "CloudTermsNotice",
	setup(__props) {
		const { t } = useI18n();
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", _hoisted_1$1, [createBaseVNode("p", _hoisted_2$1, [
				createTextVNode(toDisplayString(unref(t)("auth.login.termsText")) + " ", 1),
				_cache[0] || (_cache[0] = createBaseVNode("br", null, null, -1)),
				createBaseVNode("a", _hoisted_3$1, toDisplayString(unref(t)("auth.login.termsLink")), 1),
				createTextVNode(" " + toDisplayString(unref(t)("auth.login.andText")) + " ", 1),
				createBaseVNode("a", _hoisted_4$1, toDisplayString(unref(t)("auth.login.privacyLink")), 1),
				_cache[1] || (_cache[1] = createTextVNode(". ", -1))
			]), createBaseVNode("p", _hoisted_5$1, [
				createTextVNode(toDisplayString(unref(t)("cloudWaitlist_questionsText")) + " ", 1),
				createBaseVNode("a", _hoisted_6$1, toDisplayString(unref(t)("cloudWaitlist_contactLink")), 1),
				_cache[2] || (_cache[2] = createTextVNode(". ", -1))
			])]);
		};
	}
});
//#endregion
//#region src/platform/cloud/onboarding/components/CloudTemplate.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1 = { class: "dark-theme flex h-svh w-screen items-center bg-primary-comfy-ink font-formula text-primary-comfy-canvas" };
var _hoisted_2 = { class: "mx-auto flex size-full max-h-248 max-w-[100rem]" };
var _hoisted_3 = {
	key: 0,
	class: "relative min-h-0 flex-1 overflow-hidden"
};
var _hoisted_4 = { class: "flex min-h-0 flex-1 flex-col overflow-auto" };
var _hoisted_5 = { class: "mx-auto flex min-h-full w-full max-w-md flex-col px-6 py-8 lg:max-w-lg xl:py-10 2xl:max-w-xl" };
var _hoisted_6 = ["alt"];
var _hoisted_7 = { class: "my-auto w-full" };
//#endregion
//#region src/platform/cloud/onboarding/components/CloudTemplate.vue
var CloudTemplate_default = /* @__PURE__ */ defineComponent({
	__name: "CloudTemplate",
	setup(__props) {
		const { t } = useI18n();
		const route = useRoute();
		const isWideViewport = useBreakpoints(breakpointsTailwind).greaterOrEqual("xl");
		const showHero = computed(() => isWideViewport.value && !route.meta.hideHero);
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", _hoisted_1, [createBaseVNode("div", _hoisted_2, [showHero.value ? (openBlock(), createElementBlock("div", _hoisted_3, [createVNode(CloudHeroCarousel_default)])) : createCommentVNode("", true), createBaseVNode("div", _hoisted_4, [createBaseVNode("div", _hoisted_5, [
				createBaseVNode("img", {
					src: comfy_logo_wordmark_default,
					alt: unref(t)("g.comfyOrgLogoAlt"),
					class: "h-9 w-auto shrink-0 object-contain object-left lg:h-10 2xl:h-11"
				}, null, 8, _hoisted_6),
				createBaseVNode("div", _hoisted_7, [renderSlot(_ctx.$slots, "default")]),
				unref(route).meta.showTermsNotice ? (openBlock(), createBlock(CloudTermsNotice_default, { key: 0 })) : createCommentVNode("", true),
				!unref(route).meta.showTermsNotice ? (openBlock(), createBlock(CloudTemplateFooter_default, { key: 1 })) : createCommentVNode("", true)
			])])])]);
		};
	}
});
//#endregion
//#region src/platform/cloud/onboarding/components/CloudLayoutView.vue
var CloudLayoutView_default = /* @__PURE__ */ defineComponent({
	__name: "CloudLayoutView",
	setup(__props) {
		onMounted(() => {
			document.getElementById("splash-loader")?.remove();
		});
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock(Fragment, null, [createVNode(CloudTemplate_default, null, {
				default: withCtx(() => [createVNode(unref(RouterView))]),
				_: 1
			}), createVNode(GlobalToast_default)], 64);
		};
	}
});
//#endregion
export { CloudLayoutView_default as default };
