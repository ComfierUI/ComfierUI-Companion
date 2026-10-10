import "./rolldown-runtime-xtsTai4I.js";
import { Et as withCtx, F as createBaseVNode, G as defineComponent, H as createTextVNode, Jt as normalizeClass, Kt as unref, L as createCommentVNode, O as Fragment, P as computed, R as createElementBlock, U as createVNode, Zt as toDisplayString, dt as renderList, lt as openBlock, vt as useId, yt as useModel } from "./vendor-vue-core-C1utdb0s.js";
import { i as useSettingStore } from "./layoutStore-CZsuzg91.js";
import { n as RadioGroup_default, t as RadioGroupItem_default } from "./RadioGroupItem-BgZ8b2ud.js";
//#region src/renderer/extensions/vueNodes/widgets/components/ValueControlPopover.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1 = { class: "w-113 max-w-md space-y-4 p-4" };
var _hoisted_2 = { class: "text-sm/tight text-muted-foreground" };
var _hoisted_3 = { class: "font-medium text-base-foreground" };
var _hoisted_4 = ["for"];
var _hoisted_5 = { class: "flex size-8 shrink-0 items-center justify-center rounded-lg border border-border-subtle bg-secondary-background" };
var _hoisted_6 = {
	key: 1,
	class: "text-xs font-normal text-base-foreground"
};
var _hoisted_7 = { class: "flex min-w-0 flex-1 flex-col gap-0.5" };
var _hoisted_8 = { class: "text-sm/tight font-normal text-base-foreground" };
var _hoisted_9 = { class: "text-sm/tight font-normal text-muted-foreground" };
//#endregion
//#region src/renderer/extensions/vueNodes/widgets/components/ValueControlPopover.vue
var ValueControlPopover_default = /* @__PURE__ */ defineComponent({
	__name: "ValueControlPopover",
	props: {
		"modelValue": {},
		"modelModifiers": {}
	},
	emits: ["update:modelValue"],
	setup(__props) {
		const settingStore = useSettingStore();
		const radioIdPrefix = useId();
		const controlOptions = [
			{
				mode: "fixed",
				icon: "icon-[lucide--pencil-off]",
				title: "fixed",
				description: "fixedDesc"
			},
			{
				mode: "increment",
				text: "+1",
				title: "increment",
				description: "incrementDesc"
			},
			{
				mode: "decrement",
				text: "-1",
				title: "decrement",
				description: "decrementDesc"
			},
			{
				mode: "randomize",
				icon: "icon-[lucide--shuffle]",
				title: "randomize",
				description: "randomizeDesc"
			}
		];
		const widgetControlMode = computed(() => settingStore.get("Comfy.WidgetControlMode"));
		const controlMode = useModel(__props, "modelValue");
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", _hoisted_1, [createBaseVNode("div", _hoisted_2, [
				createTextVNode(toDisplayString(_ctx.$t("widgets.valueControl.header.prefix")) + " ", 1),
				createBaseVNode("span", _hoisted_3, toDisplayString(widgetControlMode.value === "before" ? _ctx.$t("widgets.valueControl.header.before") : _ctx.$t("widgets.valueControl.header.after")), 1),
				createTextVNode(" " + toDisplayString(_ctx.$t("widgets.valueControl.header.postfix")), 1)
			]), createVNode(RadioGroup_default, {
				modelValue: controlMode.value,
				"onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => controlMode.value = $event),
				class: "flex-col space-y-2"
			}, {
				default: withCtx(() => [(openBlock(), createElementBlock(Fragment, null, renderList(controlOptions, (option) => {
					return createBaseVNode("div", {
						key: option.mode,
						class: "flex h-[unset] w-full items-center justify-between gap-7 py-2 text-left"
					}, [createBaseVNode("label", {
						for: `${unref(radioIdPrefix)}-${option.mode}`,
						class: "flex min-w-0 flex-1 cursor-pointer items-center gap-2 text-wrap"
					}, [createBaseVNode("div", _hoisted_5, [option.icon ? (openBlock(), createElementBlock("i", {
						key: 0,
						class: normalizeClass([option.icon, "text-base text-base-foreground"])
					}, null, 2)) : createCommentVNode("", true), option.text ? (openBlock(), createElementBlock("span", _hoisted_6, toDisplayString(option.text), 1)) : createCommentVNode("", true)]), createBaseVNode("div", _hoisted_7, [createBaseVNode("div", _hoisted_8, [createBaseVNode("span", null, toDisplayString(_ctx.$t(`widgets.valueControl.${option.title}`)), 1)]), createBaseVNode("div", _hoisted_9, toDisplayString(_ctx.$t(`widgets.valueControl.${option.description}`)), 1)])], 8, _hoisted_4), createVNode(RadioGroupItem_default, {
						id: `${unref(radioIdPrefix)}-${option.mode}`,
						class: "shrink",
						value: option.mode
					}, null, 8, ["id", "value"])]);
				}), 64))]),
				_: 1
			}, 8, ["modelValue"])]);
		};
	}
});
//#endregion
export { ValueControlPopover_default as default };
