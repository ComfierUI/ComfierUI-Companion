const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./ValueControlPopover-CdUNrh_t.js","./rolldown-runtime-xtsTai4I.js","./vendor-vue-core-C1utdb0s.js","./layoutStore-CZsuzg91.js","./vendor-datadog-DudeEV66.js","./vendor-other-BPEcPQTD.js","./vendor-three-DQpYrwAh.js","./vendor-zod-TMj9Wsdv.js","./vendor-tiptap-BT_4t92m.js","./requestAuth-YeU5GIXc.js","./vendor-vueuse-BxKIIsKg.js","./telemetry-IkzvF0TI.js","./api-Bt-fGt5a.js","./zod.gen-C09SPgBJ.js","./vendor-axios-QnwcNXlY.js","./vendor-sentry-zSXGkMPN.js","./reportError-LG-zfbNw.js","./hostTelemetryEnabled-BZ3GL1Cu.js","./remoteConfig-DwMQrLli.js","./vendor-firebase-B37L--zT.js","./toastStore-CTfykAzG.js","./types-t0xJOOCt.js","./desktopHostSession-IrokPizE.js","./vendor-i18n-BZvE7WBQ.js","./i18n-C3J-ToPr.js","./formatUtil-DuxXRy1z.js","./commands-BcZ6fU3-.js","./main-BfqkkuXX.js","./nodeDefs-CFOSmIZi.js","./settings-B3DInspu.js","./comfyApi-CYSC9hA6.js","./types-ColLjFnz.js","./useFeatureFlags-DAoj_aDd.js","./dialog.variants-PsJk1wgr.js","./ssoRequired-BkQMvdnz.js","./dialogStore-B0GYyals.js","./DialogPortal-B3D-ZhO6.js","./vendor-reka-ui-tdehH9A1.js","./src-DI1bBfrb.js","./Button-j0oCzR82.js","./refreshRemoteConfig-D9UzqP0h.js","./vendor-primevue-C3d0HJ53.js","./systemStatsStore-3gc4cifl.js","./useImageQuiet-Ded8W_Zd.js","./vendor-markdown-CtxqRwKg.js","./useModalLiftedZIndex-BuehUvPe.js","./NumberFieldInput-CILJZ6M6.js","./colorUtil-BzdMMd-Y.js","./vendor-yjs-D9X62SBd.js","./markdownRendererUtil-6g3t5X63.js","./downloadUtil-Bysc7OZ_.js","./SingleSelect-CS2DGZzk.js","./widgetTypes-CisWqKm9.js","./Switch-BAw3-YcG.js","./Input-Cx8jjgHK.js","./SelectValue-BYMnIcxq.js","./Loader-CwKhrtFX.js","./_plugin-vue_export-helper-DEKQMRQ4.js","./creditsUtil-BWj6bywK.js","./useExternalLink-CXT6uu6Z.js","./envUtil-2Z8ainL3.js","./RadioGroupItem-BgZ8b2ud.js","./vendor-other-DODGPXtn.css","./layoutStore-Nbgrgm8u.css"])))=>i.map(i=>d[i]);
import "./rolldown-runtime-xtsTai4I.js";
import { a as __vitePreload } from "./vendor-datadog-DudeEV66.js";
import { $ as mergeProps, Et as withCtx, G as defineComponent, I as createBlock, Jt as normalizeClass, Kt as unref, L as createCommentVNode, Lt as ref, Q as mergeModels, R as createElementBlock, St as watch, U as createVNode, W as defineAsyncComponent, Zt as toDisplayString, ht as resolveDynamicComponent, lt as openBlock, yt as useModel } from "./vendor-vue-core-C1utdb0s.js";
import { r as useI18n } from "./vendor-i18n-BZvE7WBQ.js";
import { t as cn } from "./src-DI1bBfrb.js";
import { t as Popover_default } from "./Popover-D5AU3m-q.js";
//#region src/renderer/extensions/vueNodes/widgets/components/ValueControlButton.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1$1 = ["aria-label"];
var _hoisted_2 = {
	key: 1,
	class: "text-xs font-normal text-primary-background"
};
//#endregion
//#region src/renderer/extensions/vueNodes/widgets/components/ValueControlButton.vue
var ValueControlButton_default = /* @__PURE__ */ defineComponent({
	__name: "ValueControlButton",
	props: {
		mode: {},
		variant: { default: "badge" }
	},
	setup(__props) {
		const { t } = useI18n();
		const iconMap = {
			fixed: "icon-[lucide--pencil-off]",
			randomize: "icon-[lucide--shuffle]",
			increment: null,
			decrement: null
		};
		const textMap = {
			increment: "+1",
			decrement: "-1",
			fixed: null,
			randomize: null
		};
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("button", {
				"data-testid": "value-control",
				type: "button",
				"aria-label": unref(t)("widgets.valueControl." + __props.mode),
				class: normalizeClass(unref(cn)("flex shrink-0 cursor-pointer items-center justify-center border-none focus-visible:ring-2 focus-visible:ring-primary-background focus-visible:ring-offset-1 focus-visible:outline-none", __props.variant === "badge" ? "h-4.5 w-8 rounded-full" : "size-6 rounded-sm", __props.mode !== "fixed" ? "bg-primary-background/30 hover:bg-primary-background-hover/30" : "bg-transparent"))
			}, [iconMap[__props.mode] ? (openBlock(), createElementBlock("i", {
				key: 0,
				"aria-hidden": "true",
				class: normalizeClass(unref(cn)(iconMap[__props.mode] ?? "", "text-xs", __props.mode === "fixed" ? "text-muted-foreground" : "text-primary-background"))
			}, null, 2)) : textMap[__props.mode] ? (openBlock(), createElementBlock("span", _hoisted_2, toDisplayString(textMap[__props.mode]), 1)) : createCommentVNode("", true)], 10, _hoisted_1$1);
		};
	}
});
//#endregion
//#region src/renderer/extensions/vueNodes/widgets/components/WidgetWithControl.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1 = { class: "relative grid grid-cols-subgrid" };
//#endregion
//#region src/renderer/extensions/vueNodes/widgets/components/WidgetWithControl.vue
var WidgetWithControl_default = /* @__PURE__ */ defineComponent({
	__name: "WidgetWithControl",
	props: /*@__PURE__*/ mergeModels({
		widget: {},
		component: {}
	}, {
		"modelValue": {},
		"modelModifiers": {}
	}),
	emits: ["update:modelValue"],
	setup(__props) {
		const ValueControlPopover = defineAsyncComponent(() => __vitePreload(() => import("./ValueControlPopover-CdUNrh_t.js"), __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63]), import.meta.url));
		const props = __props;
		const modelValue = useModel(__props, "modelValue");
		const controlModel = ref(props.widget.controlWidget.value);
		watch(controlModel, props.widget.controlWidget.update);
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", _hoisted_1, [(openBlock(), createBlock(resolveDynamicComponent(__props.component), mergeProps(_ctx.$attrs, {
				modelValue: modelValue.value,
				"onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => modelValue.value = $event),
				widget: __props.widget
			}), {
				default: withCtx(() => [createVNode(Popover_default, null, {
					button: withCtx(() => [createVNode(ValueControlButton_default, {
						mode: controlModel.value,
						class: "mr-1 self-center"
					}, null, 8, ["mode"])]),
					default: withCtx(() => [createVNode(unref(ValueControlPopover), {
						modelValue: controlModel.value,
						"onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => controlModel.value = $event)
					}, null, 8, ["modelValue"])]),
					_: 1
				})]),
				_: 1
			}, 16, ["modelValue", "widget"]))]);
		};
	}
});
//#endregion
export { WidgetWithControl_default as t };
