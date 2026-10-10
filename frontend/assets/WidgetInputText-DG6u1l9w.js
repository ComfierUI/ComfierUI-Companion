import "./rolldown-runtime-xtsTai4I.js";
import { $ as mergeProps, Et as withCtx, F as createBaseVNode, G as defineComponent, I as createBlock, Kt as unref, L as createCommentVNode, P as computed, Q as mergeModels, U as createVNode, lt as openBlock, yt as useModel } from "./vendor-vue-core-C1utdb0s.js";
import { t as cn } from "./src-DI1bBfrb.js";
import { t as Input_default } from "./Input-Cx8jjgHK.js";
import { t as Loader_default } from "./Loader-CwKhrtFX.js";
import { a as filterWidgetProps, n as INPUT_EXCLUDED_PROPS } from "./widgetPropFilter-RwwBg40l.js";
import { t as WidgetInputBaseClass } from "./layout-BZWBHixI.js";
import { t as WidgetLayoutField_default } from "./WidgetLayoutField-BUL5w3Gs.js";
//#region src/renderer/extensions/vueNodes/widgets/components/WidgetInputText.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1 = { class: "relative" };
//#endregion
//#region src/renderer/extensions/vueNodes/widgets/components/WidgetInputText.vue
var WidgetInputText_default = /* @__PURE__ */ defineComponent({
	__name: "WidgetInputText",
	props: /*@__PURE__*/ mergeModels({
		widget: {},
		size: { default: "medium" },
		invalid: {
			type: Boolean,
			default: false
		},
		loading: {
			type: Boolean,
			default: false
		}
	}, {
		"modelValue": { default: "" },
		"modelModifiers": {}
	}),
	emits: ["update:modelValue"],
	setup(__props) {
		const modelValue = useModel(__props, "modelValue");
		const filteredProps = computed(() => filterWidgetProps(__props.widget.options, INPUT_EXCLUDED_PROPS));
		const isReadOnly = computed(() => Boolean(__props.widget.options?.read_only || __props.widget.options?.disabled));
		const layoutWidget = computed(() => ({
			name: __props.widget.name,
			label: __props.widget.label,
			borderStyle: cn(__props.widget.borderStyle, __props.invalid && "border border-destructive-background")
		}));
		return (_ctx, _cache) => {
			return openBlock(), createBlock(WidgetLayoutField_default, { widget: layoutWidget.value }, {
				default: withCtx(() => [createBaseVNode("div", _hoisted_1, [__props.loading ? (openBlock(), createBlock(Loader_default, {
					key: 0,
					size: "sm",
					class: "absolute top-1/2 left-3 z-10 -translate-y-1/2 text-component-node-foreground"
				})) : createCommentVNode("", true), createVNode(Input_default, mergeProps({
					modelValue: modelValue.value,
					"onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => modelValue.value = $event)
				}, filteredProps.value, {
					class: unref(cn)(unref(WidgetInputBaseClass), "h-auto min-w-[4ch] truncate", !isReadOnly.value && "hover:bg-component-node-widget-background-hovered", __props.size === "large" ? "py-3 text-sm" : "py-2 text-xs", __props.loading && "pl-9"),
					"aria-label": __props.widget.name,
					"aria-invalid": __props.invalid || void 0,
					readonly: isReadOnly.value
				}), null, 16, [
					"modelValue",
					"class",
					"aria-label",
					"aria-invalid",
					"readonly"
				])])]),
				_: 1
			}, 8, ["widget"]);
		};
	}
});
//#endregion
export { WidgetInputText_default as default };
