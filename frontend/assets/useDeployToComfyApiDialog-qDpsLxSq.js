import "./rolldown-runtime-xtsTai4I.js";
import { Et as withCtx, F as createBaseVNode, G as defineComponent, H as createTextVNode, Kt as unref, O as Fragment, R as createElementBlock, U as createVNode, Zt as toDisplayString, lt as openBlock } from "./vendor-vue-core-C1utdb0s.js";
import { c as createReusableTemplate } from "./vendor-vueuse-BxKIIsKg.js";
import { r as getComfyPlatformBaseUrl } from "./comfyApi-CYSC9hA6.js";
import { t as useDialogStore } from "./dialogStore-B0GYyals.js";
import { t as Button_default } from "./Button-j0oCzR82.js";
import { t as useExternalLink } from "./useExternalLink-CXT6uu6Z.js";
import { t as Video_default } from "./Video-nu2vO3z7.js";
//#region src/platform/workflow/deploy/components/DeployToComfyApiCard.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1 = { class: "@container w-full max-w-[640px]" };
var _hoisted_2 = {
	"data-testid": "deploy-to-comfy-api-card",
	class: "relative max-h-[85dvh] overflow-y-auto rounded-2xl border border-component-node-border bg-base-background shadow-[0_20px_24px_-4px_rgba(10,13,18,0.4),0_8px_8px_-4px_rgba(10,13,18,0.25),0_3px_3px_-1.5px_rgba(10,13,18,0.2)]"
};
var _hoisted_3 = { class: "p-2" };
var _hoisted_4 = { class: "flex flex-col gap-9 p-6 @xl:gap-6 @xl:p-9" };
var _hoisted_5 = { class: "flex flex-col gap-4" };
var _hoisted_6 = ["id"];
var _hoisted_7 = { class: "my-0 text-sm/5 text-muted-foreground" };
var _hoisted_8 = { class: "flex flex-col gap-2.5 @xl:flex-row @xl:items-center @xl:justify-end" };
//#endregion
//#region src/platform/workflow/deploy/components/DeployToComfyApiCard.vue
var DeployToComfyApiCard_default = /* @__PURE__ */ defineComponent({
	inheritAttrs: false,
	__name: "DeployToComfyApiCard",
	props: {
		titleId: {},
		videoSources: { default: () => [] },
		posterSrc: { default: "" }
	},
	emits: ["done", "dismiss"],
	setup(__props, { emit: __emit }) {
		const emit = __emit;
		const { buildDocsUrl } = useExternalLink();
		const [DefineDocsLink, ReuseDocsLink] = createReusableTemplate();
		const docsUrl = buildDocsUrl("/development/overview", { includeLocale: true });
		const platformUrl = getComfyPlatformBaseUrl();
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock(Fragment, null, [createVNode(unref(DefineDocsLink), null, {
				default: withCtx(() => [createVNode(Button_default, {
					variant: "link",
					size: "link",
					class: "w-fit",
					as: "a",
					href: unref(docsUrl),
					target: "_blank",
					rel: "noopener noreferrer"
				}, {
					default: withCtx(() => [createTextVNode(toDisplayString(_ctx.$t("deployToComfyApi.readDocs")) + " ", 1), _cache[2] || (_cache[2] = createBaseVNode("span", { class: "icon-[lucide--square-arrow-out-up-right] size-4" }, null, -1))]),
					_: 1
				}, 8, ["href"])]),
				_: 1
			}), createBaseVNode("div", _hoisted_1, [createBaseVNode("div", _hoisted_2, [
				createVNode(Button_default, {
					variant: "muted-textonly",
					size: "icon",
					"aria-label": _ctx.$t("g.close"),
					class: "absolute top-3 right-3 z-20",
					onClick: _cache[0] || (_cache[0] = ($event) => emit("dismiss"))
				}, {
					default: withCtx(() => [..._cache[3] || (_cache[3] = [createBaseVNode("i", { class: "icon-[lucide--x]" }, null, -1)])]),
					_: 1
				}, 8, ["aria-label"]),
				createBaseVNode("div", _hoisted_3, [createVNode(Video_default, {
					sources: __props.videoSources,
					"poster-src": __props.posterSrc,
					autoplay: "",
					muted: "",
					loop: "",
					"plays-inline": "",
					"playback-control": "",
					"data-testid": "deploy-to-comfy-api-video",
					class: "aspect-video w-full rounded-lg object-cover"
				}, {
					fallback: withCtx(() => [..._cache[4] || (_cache[4] = [createBaseVNode("div", {
						"data-testid": "deploy-to-comfy-api-video-placeholder",
						class: "grid aspect-video w-full place-items-center rounded-lg bg-secondary-background"
					}, [createBaseVNode("span", {
						class: "grid size-16 place-items-center rounded-full border border-base-foreground/30 bg-base-foreground/10 text-base-foreground",
						"aria-hidden": "true"
					}, [createBaseVNode("i", { class: "icon-[lucide--play] size-6" })])], -1)])]),
					_: 1
				}, 8, ["sources", "poster-src"])]),
				createBaseVNode("section", _hoisted_4, [createBaseVNode("div", _hoisted_5, [
					createBaseVNode("h2", {
						id: __props.titleId,
						class: "my-0 text-xl font-semibold text-base-foreground @xl:text-2xl"
					}, toDisplayString(_ctx.$t("deployToComfyApi.title")), 9, _hoisted_6),
					createBaseVNode("p", _hoisted_7, toDisplayString(_ctx.$t("deployToComfyApi.body")), 1),
					createVNode(unref(ReuseDocsLink), { class: "@xl:hidden" })
				]), createBaseVNode("footer", _hoisted_8, [createVNode(unref(ReuseDocsLink), { class: "hidden @xl:mr-auto @xl:inline-flex" }), createVNode(Button_default, {
					variant: "inverted",
					size: "lg",
					class: "w-full @xl:w-auto",
					as: "a",
					href: unref(platformUrl),
					target: "_blank",
					rel: "noopener noreferrer",
					"data-testid": "deploy-to-comfy-api-platform",
					onClick: _cache[1] || (_cache[1] = ($event) => emit("done"))
				}, {
					default: withCtx(() => [createTextVNode(toDisplayString(_ctx.$t("deployToComfyApi.deployOnPlatform")), 1)]),
					_: 1
				}, 8, ["href"])])])
			])])], 64);
		};
	}
});
//#endregion
//#region src/platform/workflow/deploy/composables/useDeployToComfyApiDialog.ts
var DIALOG_KEY = "global-deploy-to-comfy-api";
var MEDIA_BASE = "https://media.comfy.org/website/comfy-api";
var VIDEO_SOURCES = [{
	src: `${MEDIA_BASE}/comfy-api-1280.webm`,
	type: "video/webm"
}, {
	src: `${MEDIA_BASE}/comfy-api-1280.mp4`,
	type: "video/mp4"
}];
var POSTER_SRC = `${MEDIA_BASE}/comfy-api-poster.jpg`;
function useDeployToComfyApiDialog() {
	const dialogStore = useDialogStore();
	function hide() {
		dialogStore.closeDialog({ key: DIALOG_KEY });
	}
	function show() {
		dialogStore.showDialog({
			key: DIALOG_KEY,
			component: DeployToComfyApiCard_default,
			props: {
				titleId: DIALOG_KEY,
				videoSources: VIDEO_SOURCES,
				posterSrc: POSTER_SRC,
				onDone: hide,
				onDismiss: hide
			},
			dialogComponentProps: {
				renderer: "reka",
				dismissableMask: true,
				closeOnEscape: true,
				modal: true,
				headless: true,
				overlayClass: "bg-black/55",
				contentClass: "w-[min(640px,calc(100vw-2rem))] border-none bg-transparent p-0 shadow-none sm:max-w-[640px]"
			}
		});
	}
	return {
		show,
		hide
	};
}
//#endregion
export { useDeployToComfyApiDialog };
