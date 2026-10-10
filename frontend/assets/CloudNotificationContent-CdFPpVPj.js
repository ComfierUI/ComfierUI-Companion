import "./rolldown-runtime-xtsTai4I.js";
import { Et as withCtx, F as createBaseVNode, G as defineComponent, H as createTextVNode, Kt as unref, O as Fragment, R as createElementBlock, U as createVNode, Zt as toDisplayString, dt as renderList, lt as openBlock, ot as onMounted } from "./vendor-vue-core-C1utdb0s.js";
import { n as useTelemetry } from "./telemetry-IkzvF0TI.js";
import { r as useI18n } from "./vendor-i18n-BZvE7WBQ.js";
import { t as useDialogStore } from "./dialogStore-B0GYyals.js";
import { t as Button_default } from "./Button-j0oCzR82.js";
import "./cloud-subscription-Bm9_w48j.js";
//#region src/platform/cloud/notification/components/CloudNotificationContent.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1 = {
	"data-testid": "cloud-notification-dialog",
	class: "relative grid h-full grid-cols-5"
};
var _hoisted_2 = { class: "col-span-3 flex flex-col justify-between p-8" };
var _hoisted_3 = { class: "flex flex-col gap-4" };
var _hoisted_4 = { class: "text-sm font-semibold text-text-primary" };
var _hoisted_5 = { class: "m-0 text-sm text-text-secondary" };
var _hoisted_6 = { class: "mt-6 flex flex-col items-start gap-0 self-stretch" };
var _hoisted_7 = { class: "text-sm text-text-primary" };
var _hoisted_8 = { class: "flex flex-col gap-2 pt-8" };
var _hoisted_9 = { class: "m-0 text-center text-xs text-text-secondary" };
//#endregion
//#region src/platform/cloud/notification/components/CloudNotificationContent.vue
var CloudNotificationContent_default = /* @__PURE__ */ defineComponent({
	__name: "CloudNotificationContent",
	setup(__props) {
		const { t } = useI18n();
		onMounted(() => {
			useTelemetry()?.trackUiButtonClicked({
				button_id: "cloud_notification_modal_impression",
				element_group: "cloud_notification"
			});
		});
		function onDismiss() {
			useTelemetry()?.trackUiButtonClicked({
				button_id: "cloud_notification_continue_locally_clicked",
				element_group: "cloud_notification"
			});
			useDialogStore().closeDialog();
		}
		function onExplore() {
			useTelemetry()?.trackUiButtonClicked({
				button_id: "cloud_notification_explore_cloud_clicked",
				element_group: "cloud_notification"
			});
			const params = new URLSearchParams({
				utm_source: "desktop",
				utm_medium: "onload-modal",
				utm_campaign: "local-to-cloud-conversion",
				utm_id: "desktop-onload-modal",
				utm_source_platform: "mac-desktop"
			});
			window.open(`https://comfy.org/cloud/?${params}`, "_blank", "noopener,noreferrer");
			useDialogStore().closeDialog();
		}
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", _hoisted_1, [
				createVNode(Button_default, {
					size: "unset",
					variant: "muted-textonly",
					class: "absolute top-2.5 right-2.5 z-10 size-8 rounded-full p-0 text-white hover:bg-white/20",
					"aria-label": unref(t)("g.close"),
					onClick: onDismiss
				}, {
					default: withCtx(() => [..._cache[0] || (_cache[0] = [createBaseVNode("i", { class: "pi pi-times" }, null, -1)])]),
					_: 1
				}, 8, ["aria-label"]),
				_cache[2] || (_cache[2] = createBaseVNode("div", { class: "relative col-span-2 flex items-center justify-center overflow-hidden rounded-sm" }, [createBaseVNode("video", {
					autoplay: "",
					loop: "",
					muted: "",
					playsinline: "",
					class: "ml-[-20%] h-full min-w-5/4 object-cover p-0"
				}, [createBaseVNode("source", {
					src: "" + new URL("images/cloud-subscription.webm", import.meta.url).href,
					type: "video/webm"
				})])], -1)),
				createBaseVNode("div", _hoisted_2, [createBaseVNode("div", null, [createBaseVNode("div", _hoisted_3, [createBaseVNode("div", _hoisted_4, toDisplayString(unref(t)("cloudNotification.title")), 1), createBaseVNode("p", _hoisted_5, toDisplayString(unref(t)("cloudNotification.message")), 1)]), createBaseVNode("div", _hoisted_6, [(openBlock(), createElementBlock(Fragment, null, renderList([
					2,
					3,
					4
				], (n) => {
					return createBaseVNode("div", {
						key: n,
						class: "flex items-center gap-2 py-2"
					}, [_cache[1] || (_cache[1] = createBaseVNode("i", { class: "pi pi-check text-xs text-text-primary" }, null, -1)), createBaseVNode("span", _hoisted_7, toDisplayString(unref(t)(`cloudNotification.feature${n}Title`)), 1)]);
				}), 64))])]), createBaseVNode("div", _hoisted_8, [
					createVNode(Button_default, {
						variant: "primary",
						size: "lg",
						class: "w-full font-bold",
						onClick: onExplore
					}, {
						default: withCtx(() => [createTextVNode(toDisplayString(unref(t)("cloudNotification.exploreCloud")), 1)]),
						_: 1
					}),
					createVNode(Button_default, {
						variant: "textonly",
						size: "sm",
						class: "w-full",
						onClick: onDismiss
					}, {
						default: withCtx(() => [createTextVNode(toDisplayString(unref(t)("cloudNotification.continueLocally")), 1)]),
						_: 1
					}),
					createBaseVNode("p", _hoisted_9, toDisplayString(unref(t)("cloudNotification.footer")), 1)
				])])
			]);
		};
	}
});
//#endregion
export { CloudNotificationContent_default as default };
