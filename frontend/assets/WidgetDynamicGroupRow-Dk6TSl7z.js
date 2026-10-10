import "./rolldown-runtime-xtsTai4I.js";
import { Et as withCtx, F as createBaseVNode, G as defineComponent, Kt as unref, R as createElementBlock, U as createVNode, Zt as toDisplayString, lt as openBlock } from "./vendor-vue-core-C1utdb0s.js";
import { r as useI18n } from "./vendor-i18n-BZvE7WBQ.js";
import { t as Button_default } from "./Button-j0oCzR82.js";
//#region src/renderer/extensions/vueNodes/widgets/components/WidgetDynamicGroupRow.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1 = { class: "flex items-center gap-2" };
var _hoisted_2 = { class: "text-xs text-muted-foreground" };
//#endregion
//#region src/renderer/extensions/vueNodes/widgets/components/WidgetDynamicGroupRow.vue
var WidgetDynamicGroupRow_default = /* @__PURE__ */ defineComponent({
	__name: "WidgetDynamicGroupRow",
	props: { widget: {} },
	emits: ["removed"],
	setup(__props, { emit: __emit }) {
		const { t } = useI18n();
		const emit = __emit;
		function removeRow() {
			const name = __props.widget.name;
			__props.widget.callback?.(void 0);
			emit("removed", name);
		}
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", _hoisted_1, [
				_cache[1] || (_cache[1] = createBaseVNode("span", { class: "h-px flex-1 bg-border-default" }, null, -1)),
				createBaseVNode("span", _hoisted_2, toDisplayString(__props.widget.label), 1),
				createVNode(Button_default, {
					variant: "textonly",
					size: "icon",
					class: "size-6",
					disabled: __props.widget.options?.disabled,
					"aria-label": unref(t)("dynamicGroup.remove", { row: __props.widget.label }),
					onClick: removeRow
				}, {
					default: withCtx(() => [..._cache[0] || (_cache[0] = [createBaseVNode("i", { class: "icon-[lucide--x] size-4" }, null, -1)])]),
					_: 1
				}, 8, ["disabled", "aria-label"])
			]);
		};
	}
});
//#endregion
export { WidgetDynamicGroupRow_default as default };
