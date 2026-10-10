import "./rolldown-runtime-xtsTai4I.js";
import { Et as withCtx, F as createBaseVNode, G as defineComponent, H as createTextVNode, Kt as unref, R as createElementBlock, U as createVNode, Zt as toDisplayString, lt as openBlock } from "./vendor-vue-core-C1utdb0s.js";
import { r as useI18n } from "./vendor-i18n-BZvE7WBQ.js";
import { t as Button_default } from "./Button-j0oCzR82.js";
import { t as DialogClose_default } from "./DialogClose-B8cFZwt-.js";
//#region src/renderer/extensions/layerEditor/components/dialog/TopBarHeader.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1 = { class: "flex w-full items-center justify-between gap-2" };
var _hoisted_2 = { class: "flex items-center gap-2" };
var _hoisted_3 = { class: "m-0 text-sm font-semibold" };
var _hoisted_4 = { class: "flex items-center gap-2" };
//#endregion
//#region src/renderer/extensions/layerEditor/components/dialog/TopBarHeader.vue
var TopBarHeader_default = /* @__PURE__ */ defineComponent({
	__name: "TopBarHeader",
	setup(__props) {
		const { t } = useI18n();
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", _hoisted_1, [createBaseVNode("div", _hoisted_2, [_cache[0] || (_cache[0] = createBaseVNode("i", { class: "icon-[lucide--layers-2] size-4" }, null, -1)), createBaseVNode("h3", _hoisted_3, toDisplayString(unref(t)("layerEditor.title")), 1)]), createBaseVNode("div", _hoisted_4, [_cache[2] || (_cache[2] = createBaseVNode("div", {
				id: "layer-editor-header-actions",
				class: "flex items-center gap-2",
				role: "group"
			}, null, -1)), createVNode(DialogClose_default, null, {
				default: withCtx(() => [createVNode(Button_default, {
					variant: "outline",
					size: "md"
				}, {
					default: withCtx(() => [createTextVNode(toDisplayString(unref(t)("g.close")) + " ", 1), _cache[1] || (_cache[1] = createBaseVNode("i", { class: "icon-[lucide--x] size-4" }, null, -1))]),
					_: 1
				})]),
				_: 1
			})])]);
		};
	}
});
//#endregion
export { TopBarHeader_default as default };
