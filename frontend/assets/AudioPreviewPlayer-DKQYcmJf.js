import "./rolldown-runtime-xtsTai4I.js";
import { E as withModifiers, Et as withCtx, F as createBaseVNode, G as defineComponent, I as createBlock, Kt as unref, L as createCommentVNode, Lt as ref, P as computed, Q as mergeModels, R as createElementBlock, U as createVNode, Xt as normalizeStyle, Zt as toDisplayString, lt as openBlock, xt as useTemplateRef, yt as useModel } from "./vendor-vue-core-C1utdb0s.js";
import { dt as whenever } from "./vendor-vueuse-BxKIIsKg.js";
import { Ii as MenuItemContent_default, Ni as Menu_default } from "./layoutStore-CZsuzg91.js";
import { r as useI18n } from "./vendor-i18n-BZvE7WBQ.js";
import { u as formatTime } from "./formatUtil-DuxXRy1z.js";
import { t as Button_default } from "./Button-j0oCzR82.js";
import { f as useToast } from "./vendor-primevue-C3d0HJ53.js";
import { n as downloadFile } from "./downloadUtil-Bysc7OZ_.js";
import { t as Slider_default } from "./Slider-eQb4a5yt.js";
//#region src/renderer/extensions/vueNodes/widgets/components/audio/AudioPreviewPlayer.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1 = {
	key: 0,
	class: "relative box-border flex h-16 w-full items-center justify-start gap-4 rounded-lg bg-component-node-widget-background px-4 py-0"
};
var _hoisted_2 = ["src"];
var _hoisted_3 = { class: "relative flex shrink-0 items-center justify-start gap-2" };
var _hoisted_4 = {
	key: 0,
	class: "icon-[lucide--play] size-4 text-muted-foreground"
};
var _hoisted_5 = {
	key: 1,
	class: "icon-[lucide--pause] size-4 text-muted-foreground"
};
var _hoisted_6 = { class: "text-sm font-normal text-nowrap text-base-foreground" };
var _hoisted_7 = { class: "relative h-0.5 flex-1 rounded-full bg-interface-stroke" };
var _hoisted_8 = ["value", "aria-label"];
var _hoisted_9 = { class: "relative flex shrink-0 items-center justify-start gap-2" };
var _hoisted_10 = {
	key: 0,
	class: "icon-[lucide--volume-2] size-4 text-muted-foreground"
};
var _hoisted_11 = {
	key: 1,
	class: "icon-[lucide--volume-1] size-4 text-muted-foreground"
};
var _hoisted_12 = {
	key: 2,
	class: "icon-[lucide--volume-x] size-4 text-muted-foreground"
};
var _hoisted_13 = {
	key: 0,
	class: "w-48"
};
var _hoisted_14 = { class: "mb-2 block text-xs text-base-foreground" };
//#endregion
//#region src/renderer/extensions/vueNodes/widgets/components/audio/AudioPreviewPlayer.vue
var AudioPreviewPlayer_default = /* @__PURE__ */ defineComponent({
	__name: "AudioPreviewPlayer",
	props: /*@__PURE__*/ mergeModels({
		hideWhenEmpty: {
			type: Boolean,
			default: true
		},
		showOptionsButton: { type: Boolean }
	}, {
		"modelValue": {},
		"modelModifiers": {}
	}),
	emits: ["update:modelValue"],
	setup(__props) {
		const { t } = useI18n();
		const toast = useToast();
		const audioRef = useTemplateRef("audioRef");
		const isPlaying = ref(false);
		const isMuted = ref(false);
		const volume = ref(1);
		const currentTime = ref(0);
		const duration = ref(0);
		const playbackRate = ref(1);
		const progressPercentage = computed(() => {
			if (!duration.value || duration.value === 0) return 0;
			return currentTime.value / duration.value * 100;
		});
		const modelValue = useModel(__props, "modelValue");
		const showVolumeTwo = computed(() => !isMuted.value && volume.value > .5);
		const showVolumeOne = computed(() => !isMuted.value && volume.value > 0);
		const togglePlayPause = () => {
			if (!audioRef.value || !audioRef.value.src) return;
			if (isPlaying.value) audioRef.value.pause();
			else audioRef.value.play();
			isPlaying.value = !isPlaying.value;
		};
		const handleDownload = () => {
			if (!modelValue.value) return;
			try {
				downloadFile(modelValue.value);
			} catch {
				toast.add({
					severity: "error",
					summary: t("g.error"),
					detail: t("g.failedToDownloadFile")
				});
			}
		};
		const toggleMute = () => {
			if (audioRef.value) {
				isMuted.value = !isMuted.value;
				audioRef.value.muted = isMuted.value;
			}
		};
		const handleSeek = (event) => {
			const target = event.target;
			const value = parseFloat(target.value);
			if (audioRef.value && duration.value > 0) {
				const newTime = value / 100 * duration.value;
				audioRef.value.currentTime = newTime;
				currentTime.value = newTime;
			}
		};
		const handleLoadedMetadata = () => {
			if (audioRef.value) duration.value = audioRef.value.duration;
		};
		const handleTimeUpdate = () => {
			if (audioRef.value) currentTime.value = audioRef.value.currentTime;
		};
		const handleEnded = () => {
			isPlaying.value = false;
			currentTime.value = 0;
		};
		const setPlaybackSpeed = (speed) => {
			playbackRate.value = speed;
			if (audioRef.value) audioRef.value.playbackRate = speed;
		};
		const handleVolumeChange = (value) => {
			const numValue = value?.[0] ?? 0;
			volume.value = numValue / 10;
			if (audioRef.value) {
				audioRef.value.volume = volume.value;
				if (volume.value > 0 && isMuted.value) {
					isMuted.value = false;
					audioRef.value.muted = false;
				}
			}
		};
		const menuItems = computed(() => [{
			label: t("g.playbackSpeed"),
			radioGroup: {
				value: () => String(playbackRate.value),
				options: [
					{
						value: "0.5",
						label: t("g.halfSpeed"),
						command: () => setPlaybackSpeed(.5)
					},
					{
						value: "1",
						label: t("g.1x"),
						command: () => setPlaybackSpeed(1)
					},
					{
						value: "2",
						label: t("g.2x"),
						command: () => setPlaybackSpeed(2)
					}
				]
			}
		}, {
			label: t("g.volume"),
			key: "volume"
		}]);
		whenever(modelValue, () => {
			isPlaying.value = false;
			audioRef.value?.pause();
			audioRef.value?.load();
		}, { immediate: true });
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", {
				class: "relative",
				onPointerdown: _cache[0] || (_cache[0] = withModifiers(() => {}, ["stop"]))
			}, [!__props.hideWhenEmpty || modelValue.value ? (openBlock(), createElementBlock("div", _hoisted_1, [
				createBaseVNode("audio", {
					ref_key: "audioRef",
					ref: audioRef,
					src: modelValue.value,
					onLoadedmetadata: handleLoadedMetadata,
					onTimeupdate: handleTimeUpdate,
					onEnded: handleEnded
				}, null, 40, _hoisted_2),
				createBaseVNode("div", _hoisted_3, [createVNode(Button_default, {
					variant: "textonly",
					size: "unset",
					"aria-label": _ctx.$t("g.playPause"),
					class: "size-6 rounded-sm",
					onClick: togglePlayPause
				}, {
					default: withCtx(() => [!isPlaying.value ? (openBlock(), createElementBlock("i", _hoisted_4)) : (openBlock(), createElementBlock("i", _hoisted_5))]),
					_: 1
				}, 8, ["aria-label"]), createBaseVNode("div", _hoisted_6, toDisplayString(unref(formatTime)(currentTime.value)) + " / " + toDisplayString(unref(formatTime)(duration.value)), 1)]),
				createBaseVNode("div", _hoisted_7, [createBaseVNode("div", {
					class: "absolute top-0 left-0 h-full rounded-full bg-button-icon transition-all",
					style: normalizeStyle({ width: `${progressPercentage.value}%` })
				}, null, 4), createBaseVNode("input", {
					type: "range",
					value: progressPercentage.value,
					min: "0",
					max: "100",
					step: "0.1",
					"aria-label": _ctx.$t("g.audioProgress"),
					class: "absolute inset-0 w-full cursor-pointer opacity-0",
					onInput: handleSeek
				}, null, 40, _hoisted_8)]),
				createBaseVNode("div", _hoisted_9, [
					createVNode(Button_default, {
						variant: "textonly",
						size: "unset",
						"aria-label": _ctx.$t("g.volume"),
						class: "size-6 rounded-sm",
						onClick: toggleMute
					}, {
						default: withCtx(() => [showVolumeTwo.value ? (openBlock(), createElementBlock("i", _hoisted_10)) : showVolumeOne.value ? (openBlock(), createElementBlock("i", _hoisted_11)) : (openBlock(), createElementBlock("i", _hoisted_12))]),
						_: 1
					}, 8, ["aria-label"]),
					modelValue.value ? (openBlock(), createBlock(Button_default, {
						key: 0,
						size: "icon-sm",
						variant: "textonly",
						"aria-label": _ctx.$t("g.downloadAudio"),
						title: _ctx.$t("g.downloadAudio"),
						class: "size-6 hover:bg-interface-menu-component-surface-hovered",
						onClick: handleDownload
					}, {
						default: withCtx(() => [..._cache[1] || (_cache[1] = [createBaseVNode("i", { class: "icon-[lucide--download] size-4 text-muted-foreground" }, null, -1)])]),
						_: 1
					}, 8, ["aria-label", "title"])) : createCommentVNode("", true),
					__props.showOptionsButton ? (openBlock(), createBlock(Menu_default, {
						key: 1,
						items: menuItems.value
					}, {
						trigger: withCtx(() => [createVNode(Button_default, {
							variant: "textonly",
							size: "unset",
							"aria-label": _ctx.$t("g.moreOptions"),
							class: "size-6 rounded-sm"
						}, {
							default: withCtx(() => [..._cache[2] || (_cache[2] = [createBaseVNode("i", { class: "icon-[lucide--more-vertical] size-4 text-muted-foreground" }, null, -1)])]),
							_: 1
						}, 8, ["aria-label"])]),
						item: withCtx(({ item, hasSubmenu }) => [item.key === "volume" ? (openBlock(), createElementBlock("div", _hoisted_13, [createBaseVNode("label", _hoisted_14, toDisplayString(item.label), 1), createVNode(Slider_default, {
							"model-value": [volume.value * 10],
							min: 0,
							max: 10,
							step: 1,
							class: "w-full",
							"onUpdate:modelValue": handleVolumeChange
						}, null, 8, ["model-value"])])) : (openBlock(), createBlock(MenuItemContent_default, {
							key: 1,
							item,
							"has-submenu": hasSubmenu
						}, null, 8, ["item", "has-submenu"]))]),
						_: 1
					}, 8, ["items"])) : createCommentVNode("", true)
				])
			])) : createCommentVNode("", true)], 32);
		};
	}
});
//#endregion
export { AudioPreviewPlayer_default as t };
