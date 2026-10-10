import "./rolldown-runtime-xtsTai4I.js";
import { $ as mergeProps, E as withModifiers, Et as withCtx, F as createBaseVNode, G as defineComponent, I as createBlock, Jt as normalizeClass, Kt as unref, L as createCommentVNode, Lt as ref, P as computed, Q as mergeModels, R as createElementBlock, U as createVNode, Zt as toDisplayString, lt as openBlock, st as onUnmounted, vt as useId, xt as useTemplateRef, yt as useModel } from "./vendor-vue-core-C1utdb0s.js";
import { la as usePromptEditorStore } from "./layoutStore-CZsuzg91.js";
import { t as cn } from "./src-DI1bBfrb.js";
import { t as Button_default } from "./Button-j0oCzR82.js";
import { r as useCopyToClipboard } from "./systemStatsStore-3gc4cifl.js";
import { i as useHideLayoutField } from "./widgetTypes-CisWqKm9.js";
import { t as Textarea_default } from "./Textarea-r-a2mhot.js";
import { a as filterWidgetProps, n as INPUT_EXCLUDED_PROPS } from "./widgetPropFilter-RwwBg40l.js";
import { t as WidgetInputBaseClass } from "./layout-BZWBHixI.js";
import { t as isNodeOptionsOpen } from "./useMoreOptionsMenu-aa1PS45F.js";
//#region src/renderer/extensions/vueNodes/widgets/components/WidgetTextarea.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1 = ["for"];
//#endregion
//#region src/renderer/extensions/vueNodes/widgets/components/WidgetTextarea.vue
var WidgetTextarea_default = /* @__PURE__ */ defineComponent({
	__name: "WidgetTextarea",
	props: /*@__PURE__*/ mergeModels({
		widget: {},
		placeholder: { default: "" }
	}, {
		"modelValue": { default: "" },
		"modelModifiers": {}
	}),
	emits: ["update:modelValue"],
	setup(__props) {
		const textAreaRef = useTemplateRef("textAreaRef");
		const modelValue = useModel(__props, "modelValue");
		const isFocused = ref(false);
		const editor = usePromptEditorStore();
		const read = () => modelValue.value;
		function openEditor(event) {
			isFocused.value = document.activeElement === textAreaRef.value?.$el;
			if (!editor || event.button !== 0 || isReadOnly.value) return;
			event.preventDefault();
			editor.open({
				element: event.currentTarget instanceof HTMLElement ? event.currentTarget : void 0,
				title: displayName.value,
				read,
				write: (value) => {
					modelValue.value = value;
				}
			});
		}
		onUnmounted(() => editor?.release(read));
		const hideLayoutField = useHideLayoutField();
		const { copyToClipboard } = useCopyToClipboard();
		const filteredProps = computed(() => filterWidgetProps(__props.widget.options, INPUT_EXCLUDED_PROPS));
		const displayName = computed(() => __props.widget.label || __props.widget.name);
		const id = useId();
		const isReadOnly = computed(() => Boolean(__props.widget.options?.read_only || __props.widget.options?.disabled));
		function handleContextMenu(e) {
			if (isNodeOptionsOpen() || isFocused.value) {
				e.stopPropagation();
				return;
			}
			e.preventDefault();
		}
		function handleCopy() {
			copyToClipboard(modelValue.value);
		}
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", { class: normalizeClass(unref(cn)("group relative rounded-lg transition-all focus-within:ring focus-within:ring-component-node-widget-background-highlighted", !isReadOnly.value && "hover:bg-component-node-widget-background-hovered", __props.widget.borderStyle)) }, [
				!unref(hideLayoutField) ? (openBlock(), createElementBlock("label", {
					key: 0,
					for: unref(id),
					class: "pointer-events-none absolute top-1.5 left-3 z-10 text-2xs text-muted-foreground"
				}, toDisplayString(displayName.value), 9, _hoisted_1)) : createCommentVNode("", true),
				createVNode(Textarea_default, mergeProps(filteredProps.value, {
					id: unref(id),
					ref_key: "textAreaRef",
					ref: textAreaRef,
					modelValue: modelValue.value,
					"onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => modelValue.value = $event),
					class: unref(cn)(unref(WidgetInputBaseClass), "size-full resize-none text-(length:--comfy-textarea-font-size) leading-normal", !unref(hideLayoutField) && "pt-5", "overflow-hidden hover:overflow-auto focus:overflow-auto"),
					placeholder: __props.placeholder,
					readonly: isReadOnly.value,
					"data-capture-wheel": "true",
					onPointerdownCapture: withModifiers(openEditor, ["stop"]),
					onPointermoveCapture: _cache[1] || (_cache[1] = withModifiers(() => {}, ["stop"])),
					onPointerupCapture: _cache[2] || (_cache[2] = withModifiers(() => {}, ["stop"])),
					onContextmenuCapture: handleContextMenu
				}), null, 16, [
					"id",
					"modelValue",
					"class",
					"placeholder",
					"readonly"
				]),
				isReadOnly.value ? (openBlock(), createBlock(Button_default, {
					key: 1,
					variant: "textonly",
					size: "icon",
					class: "invisible absolute top-1.5 right-1.5 z-10 group-focus-within:visible group-hover:visible hover:bg-base-foreground/10",
					title: _ctx.$t("g.copyToClipboard"),
					"aria-label": _ctx.$t("g.copyToClipboard"),
					onClick: handleCopy,
					onPointerdownCapture: _cache[3] || (_cache[3] = withModifiers(() => {}, ["stop"]))
				}, {
					default: withCtx(() => [..._cache[4] || (_cache[4] = [createBaseVNode("i", { class: "icon-[lucide--copy] size-4 text-component-node-foreground" }, null, -1)])]),
					_: 1
				}, 8, ["title", "aria-label"])) : createCommentVNode("", true)
			], 2);
		};
	}
});
//#endregion
export { WidgetTextarea_default as default };
