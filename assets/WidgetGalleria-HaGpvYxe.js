import "./rolldown-runtime-xtsTai4I.js";
import { Et as withCtx, F as createBaseVNode, G as defineComponent, I as createBlock, Jt as normalizeClass, Kt as unref, L as createCommentVNode, Lt as ref, O as Fragment, P as computed, R as createElementBlock, St as watch, U as createVNode, dt as renderList, lt as openBlock, yt as useModel } from "./vendor-vue-core-C1utdb0s.js";
import { r as useI18n } from "./vendor-i18n-BZvE7WBQ.js";
import { nn as RovingFocusGroup_default, tn as RovingFocusItem_default } from "./vendor-reka-ui-tdehH9A1.js";
import { t as cn } from "./src-DI1bBfrb.js";
//#region src/renderer/extensions/vueNodes/widgets/components/WidgetGalleria.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1 = { class: "flex flex-col gap-1" };
var _hoisted_2 = ["aria-label"];
var _hoisted_3 = { class: "relative flex items-center justify-center" };
var _hoisted_4 = ["src", "alt"];
var _hoisted_5 = ["aria-label", "disabled"];
var _hoisted_6 = ["aria-label", "disabled"];
var _hoisted_7 = {
	key: 0,
	class: "overflow-x-auto px-2 py-4"
};
var _hoisted_8 = [
	"aria-label",
	"aria-current",
	"onFocus",
	"onClick"
];
var _hoisted_9 = ["src"];
var navButtonClass = "absolute top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-full border-0 bg-secondary-background/80 text-base-foreground transition-colors hover:bg-secondary-background disabled:pointer-events-none disabled:opacity-40";
//#endregion
//#region src/renderer/extensions/vueNodes/widgets/components/WidgetGalleria.vue
var WidgetGalleria_default = /* @__PURE__ */ defineComponent({
	inheritAttrs: false,
	__name: "WidgetGalleria",
	props: {
		"modelValue": { required: true },
		"modelModifiers": {}
	},
	emits: ["update:modelValue"],
	setup(__props) {
		const modelValue = useModel(__props, "modelValue");
		const images = computed(() => Array.isArray(modelValue.value) ? modelValue.value.filter((image) => typeof image === "string" && image.length > 0) : []);
		const activeIndex = ref(0);
		const { t } = useI18n();
		watch(() => images.value.length, (length) => {
			activeIndex.value = Math.max(0, Math.min(activeIndex.value, length - 1));
		});
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", _hoisted_1, [createBaseVNode("div", {
				class: "max-w-full overflow-hidden rounded-lg border border-border-default",
				role: "region",
				"aria-label": unref(t)("g.imageGallery")
			}, [createBaseVNode("div", _hoisted_3, [
				images.value.length ? (openBlock(), createElementBlock("img", {
					key: 0,
					src: images.value[activeIndex.value],
					alt: unref(t)("g.galleryImagePosition", {
						index: activeIndex.value + 1,
						total: images.value.length
					}),
					class: "h-auto max-h-64 w-full object-contain"
				}, null, 8, _hoisted_4)) : createCommentVNode("", true),
				images.value.length > 1 ? (openBlock(), createElementBlock("button", {
					key: 1,
					type: "button",
					"aria-label": unref(t)("g.previousImage"),
					disabled: activeIndex.value === 0,
					class: normalizeClass(unref(cn)(navButtonClass, "left-2")),
					onClick: _cache[0] || (_cache[0] = ($event) => activeIndex.value--)
				}, [..._cache[2] || (_cache[2] = [createBaseVNode("i", {
					class: "icon-[lucide--chevron-left] size-4",
					"aria-hidden": "true"
				}, null, -1)])], 10, _hoisted_5)) : createCommentVNode("", true),
				images.value.length > 1 ? (openBlock(), createElementBlock("button", {
					key: 2,
					type: "button",
					"aria-label": unref(t)("g.nextImage"),
					disabled: activeIndex.value === images.value.length - 1,
					class: normalizeClass(unref(cn)(navButtonClass, "right-2")),
					onClick: _cache[1] || (_cache[1] = ($event) => activeIndex.value++)
				}, [..._cache[3] || (_cache[3] = [createBaseVNode("i", {
					class: "icon-[lucide--chevron-right] size-4",
					"aria-hidden": "true"
				}, null, -1)])], 10, _hoisted_6)) : createCommentVNode("", true)
			]), images.value.length > 1 ? (openBlock(), createElementBlock("div", _hoisted_7, [createVNode(unref(RovingFocusGroup_default), {
				"current-tab-stop-id": `gallery-thumbnail-${activeIndex.value}`,
				orientation: "horizontal",
				class: "flex min-w-max items-center justify-center gap-1"
			}, {
				default: withCtx(() => [(openBlock(true), createElementBlock(Fragment, null, renderList(images.value, (image, index) => {
					return openBlock(), createBlock(unref(RovingFocusItem_default), {
						key: `${image}-${index}`,
						"as-child": "",
						"tab-stop-id": `gallery-thumbnail-${index}`
					}, {
						default: withCtx(() => [createBaseVNode("button", {
							type: "button",
							class: normalizeClass(unref(cn)("size-12 shrink-0 overflow-hidden rounded-lg border-0 bg-transparent p-1 opacity-50 transition-opacity hover:opacity-100", index === activeIndex.value && "opacity-100")),
							"aria-label": unref(t)("g.galleryThumbnailPosition", {
								index: index + 1,
								total: images.value.length
							}),
							"aria-current": index === activeIndex.value ? "true" : void 0,
							onFocus: ($event) => activeIndex.value = index,
							onClick: ($event) => activeIndex.value = index
						}, [createBaseVNode("img", {
							src: image,
							alt: "",
							class: "size-full rounded-lg object-cover"
						}, null, 8, _hoisted_9)], 42, _hoisted_8)]),
						_: 2
					}, 1032, ["tab-stop-id"]);
				}), 128))]),
				_: 1
			}, 8, ["current-tab-stop-id"])])) : createCommentVNode("", true)], 8, _hoisted_2)]);
		};
	}
});
//#endregion
export { WidgetGalleria_default as default };
