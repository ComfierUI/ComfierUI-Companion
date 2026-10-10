import "./rolldown-runtime-xtsTai4I.js";
import { $ as mergeProps, E as withModifiers, Et as withCtx, F as createBaseVNode, G as defineComponent, I as createBlock, Jt as normalizeClass, Kt as unref, L as createCommentVNode, Lt as ref, P as computed, Q as mergeModels, R as createElementBlock, T as withKeys, ft as renderSlot, lt as openBlock, xt as useTemplateRef, yt as useModel } from "./vendor-vue-core-C1utdb0s.js";
import { L as usePointerSwipe, d as onClickOutside, dt as whenever } from "./vendor-vueuse-BxKIIsKg.js";
import { r as useI18n } from "./vendor-i18n-BZvE7WBQ.js";
import { t as cn } from "./src-DI1bBfrb.js";
import { t as Button_default } from "./Button-j0oCzR82.js";
import { a as useWidgetHeight } from "./widgetTypes-CisWqKm9.js";
//#region src/components/common/ScrubableNumberInput.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1 = { class: "relative my-0.25 min-w-[4ch] flex-1 py-1.5" };
var _hoisted_2 = ["value", "disabled"];
//#endregion
//#region src/components/common/ScrubableNumberInput.vue
var ScrubableNumberInput_default = /* @__PURE__ */ defineComponent({
	__name: "ScrubableNumberInput",
	props: /*@__PURE__*/ mergeModels({
		min: { default: () => -Number.MAX_VALUE },
		max: { default: () => Number.MAX_VALUE },
		step: { default: 1 },
		disabled: {
			type: Boolean,
			default: false
		},
		hideButtons: {
			type: Boolean,
			default: false
		},
		displayValue: {},
		parseValue: { type: Function },
		inputAttrs: {}
	}, {
		"modelValue": { default: 0 },
		"modelModifiers": {}
	}),
	emits: ["update:modelValue"],
	setup(__props) {
		const { t } = useI18n();
		const modelValue = useModel(__props, "modelValue");
		const container = useTemplateRef("container");
		const inputField = useTemplateRef("inputField");
		const swipeElement = useTemplateRef("swipeElement");
		const textEdit = ref(false);
		onClickOutside(container, () => {
			if (textEdit.value) textEdit.value = false;
		});
		function clamp(value) {
			return Math.min(__props.max, Math.max(__props.min, value));
		}
		const canDecrement = computed(() => modelValue.value > __props.min && !__props.disabled);
		const canIncrement = computed(() => modelValue.value < __props.max && !__props.disabled);
		function handleBlur(e) {
			const target = e.target;
			const raw = target.value.trim();
			const parsed = __props.parseValue ? __props.parseValue(raw) : raw === "" ? void 0 : Number(raw);
			if (parsed != null && !isNaN(parsed)) modelValue.value = clamp(parsed);
			else target.value = __props.displayValue ?? String(modelValue.value);
			textEdit.value = false;
		}
		let dragDelta = 0;
		function handlePointerUp() {
			if (isSwiping.value) return;
			textEdit.value = true;
			inputField.value?.focus();
			inputField.value?.select();
		}
		const { distanceX, isSwiping } = usePointerSwipe(swipeElement, { onSwipeEnd: () => dragDelta = 0 });
		whenever(distanceX, () => {
			if (__props.disabled) return;
			const delta = (distanceX.value - dragDelta) / 10 | 0;
			dragDelta += delta * 10;
			modelValue.value = clamp(modelValue.value - delta * __props.step);
		});
		function updateValueBy(delta) {
			modelValue.value = Math.min(__props.max, Math.max(__props.min, modelValue.value + delta));
		}
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", {
				ref_key: "container",
				ref: container,
				class: normalizeClass(unref(cn)("flex overflow-hidden rounded-md bg-component-node-widget-background text-xs text-component-node-foreground", unref(useWidgetHeight)()))
			}, [
				renderSlot(_ctx.$slots, "background"),
				!__props.hideButtons ? (openBlock(), createBlock(Button_default, {
					key: 0,
					"aria-label": unref(t)("g.decrement"),
					"data-testid": "decrement",
					class: "aspect-square h-full rounded-none p-0 hover:bg-component-node-widget-background-hovered disabled:opacity-30",
					variant: "muted-textonly",
					size: "unset",
					disabled: !canDecrement.value,
					tabindex: "-1",
					onClick: _cache[0] || (_cache[0] = ($event) => modelValue.value = clamp(modelValue.value - __props.step))
				}, {
					default: withCtx(() => [..._cache[6] || (_cache[6] = [createBaseVNode("i", { class: "icon-[lucide--minus]" }, null, -1)])]),
					_: 1
				}, 8, ["aria-label", "disabled"])) : createCommentVNode("", true),
				createBaseVNode("div", _hoisted_1, [createBaseVNode("input", mergeProps({
					ref_key: "inputField",
					ref: inputField
				}, __props.inputAttrs, {
					value: __props.displayValue ?? modelValue.value,
					disabled: __props.disabled,
					class: unref(cn)("absolute inset-0 truncate border-0 bg-transparent p-1 text-xs focus:outline-0"),
					inputmode: "decimal",
					autocomplete: "off",
					autocorrect: "off",
					spellcheck: "false",
					onBlur: handleBlur,
					onKeyup: withKeys(handleBlur, ["enter"]),
					onKeydown: [
						_cache[1] || (_cache[1] = withKeys(withModifiers(($event) => updateValueBy(__props.step), ["prevent"]), ["up"])),
						_cache[2] || (_cache[2] = withKeys(withModifiers(($event) => updateValueBy(-__props.step), ["prevent"]), ["down"])),
						_cache[3] || (_cache[3] = withKeys(withModifiers(($event) => updateValueBy(10 * __props.step), ["prevent"]), ["page-up"])),
						_cache[4] || (_cache[4] = withKeys(withModifiers(($event) => updateValueBy(-10 * __props.step), ["prevent"]), ["page-down"]))
					]
				}), null, 16, _hoisted_2), createBaseVNode("div", {
					ref_key: "swipeElement",
					ref: swipeElement,
					class: normalizeClass(unref(cn)("absolute inset-0 z-10 cursor-ew-resize touch-pan-y", textEdit.value && "pointer-events-none hidden")),
					onPointerup: handlePointerUp
				}, null, 34)]),
				renderSlot(_ctx.$slots, "default"),
				!__props.hideButtons ? (openBlock(), createBlock(Button_default, {
					key: 1,
					"aria-label": unref(t)("g.increment"),
					"data-testid": "increment",
					class: "aspect-square h-full rounded-none p-0 hover:bg-component-node-widget-background-hovered disabled:opacity-30",
					variant: "muted-textonly",
					size: "unset",
					disabled: !canIncrement.value,
					tabindex: "-1",
					onClick: _cache[5] || (_cache[5] = ($event) => modelValue.value = clamp(modelValue.value + __props.step))
				}, {
					default: withCtx(() => [..._cache[7] || (_cache[7] = [createBaseVNode("i", { class: "icon-[lucide--plus]" }, null, -1)])]),
					_: 1
				}, 8, ["aria-label", "disabled"])) : createCommentVNode("", true)
			], 2);
		};
	}
});
//#endregion
export { ScrubableNumberInput_default as t };
