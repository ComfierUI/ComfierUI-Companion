import "./rolldown-runtime-xtsTai4I.js";
import { U as cva } from "./vendor-other-BPEcPQTD.js";
import { Et as withCtx, G as defineComponent, I as createBlock, Jt as normalizeClass, Kt as unref, Q as mergeModels, R as createElementBlock, ft as renderSlot, lt as openBlock, yt as useModel } from "./vendor-vue-core-C1utdb0s.js";
import { t as cn } from "./src-DI1bBfrb.js";
import { t as Button_default } from "./Button-j0oCzR82.js";
import { t as Input_default } from "./Input-Cx8jjgHK.js";
//#endregion
//#region src/components/ui/input-group/InputGroup.vue
var InputGroup_default = /* @__PURE__ */ defineComponent({
	__name: "InputGroup",
	props: { class: { type: [
		Boolean,
		null,
		String,
		Object,
		Array
	] } },
	setup(__props) {
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", {
				"data-slot": "input-group",
				role: "group",
				class: normalizeClass(unref(cn)("group/input-group relative flex h-10 w-full min-w-0 items-center rounded-lg bg-secondary-background text-sm text-base-foreground outline-none", "has-[>[data-align=inline-start]]:*:data-[slot=input-group-control]:pl-2", "has-[>[data-align=inline-end]]:*:data-[slot=input-group-control]:pr-2", "has-[[data-slot=input-group-control]:focus-visible]:ring-1 has-[[data-slot=input-group-control]:focus-visible]:ring-border-default", "has-[[data-slot=input-group-control][aria-invalid=true]]:ring-1 has-[[data-slot=input-group-control][aria-invalid=true]]:ring-destructive-background", __props.class))
			}, [renderSlot(_ctx.$slots, "default")], 2);
		};
	}
});
//#endregion
//#region src/components/ui/input-group/inputGroup.variants.ts
var inputGroupAddonVariants = cva({
	base: "flex h-auto cursor-text items-center justify-center gap-2 py-1.5 text-sm font-medium text-muted-foreground select-none group-has-[[data-slot=input-group-control]:disabled]/input-group:opacity-50",
	variants: { align: {
		"inline-start": "order-first pl-3 has-[>button]:pl-1",
		"inline-end": "order-last pr-3 has-[>button]:pr-1"
	} },
	defaultVariants: { align: "inline-start" }
});
var inputGroupButtonVariants = cva({
	base: "flex items-center gap-2 text-sm",
	variants: { size: {
		xs: "h-6 gap-1 rounded-sm px-2",
		sm: "h-8 gap-1.5 rounded-md px-2.5",
		"icon-xs": "size-6 rounded-sm p-0",
		"icon-sm": "size-8 p-0"
	} },
	defaultVariants: { size: "xs" }
});
//#endregion
//#region src/components/ui/input-group/InputGroupAddon.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1 = ["data-align"];
//#endregion
//#region src/components/ui/input-group/InputGroupAddon.vue
var InputGroupAddon_default = /* @__PURE__ */ defineComponent({
	__name: "InputGroupAddon",
	props: {
		align: { default: "inline-start" },
		class: { type: [
			Boolean,
			null,
			String,
			Object,
			Array
		] }
	},
	setup(__props) {
		function focusControl(event) {
			if (!(event.target instanceof Element) || event.target.closest("button")) return;
			if (!(event.currentTarget instanceof HTMLElement)) return;
			event.currentTarget.parentElement?.querySelector("input")?.focus();
		}
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", {
				role: "group",
				"data-slot": "input-group-addon",
				"data-align": __props.align,
				class: normalizeClass(unref(cn)(unref(inputGroupAddonVariants)({ align: __props.align }), __props.class)),
				onClick: focusControl
			}, [renderSlot(_ctx.$slots, "default")], 10, _hoisted_1);
		};
	}
});
//#endregion
//#region src/components/ui/input-group/InputGroupButton.vue
var InputGroupButton_default = /* @__PURE__ */ defineComponent({
	__name: "InputGroupButton",
	props: {
		variant: { default: "muted-textonly" },
		size: { default: "xs" },
		class: { type: [
			Boolean,
			null,
			String,
			Object,
			Array
		] }
	},
	setup(__props) {
		return (_ctx, _cache) => {
			return openBlock(), createBlock(Button_default, {
				type: "button",
				"data-slot": "input-group-button",
				"data-size": __props.size,
				variant: __props.variant,
				size: "unset",
				class: normalizeClass(unref(cn)(unref(inputGroupButtonVariants)({ size: __props.size }), __props.class))
			}, {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 8, [
				"data-size",
				"variant",
				"class"
			]);
		};
	}
});
//#endregion
//#region src/components/ui/input-group/InputGroupInput.vue
var InputGroupInput_default = /* @__PURE__ */ defineComponent({
	__name: "InputGroupInput",
	props: /*@__PURE__*/ mergeModels({ class: { type: [
		Boolean,
		null,
		String,
		Object,
		Array
	] } }, {
		"modelValue": {},
		"modelModifiers": {}
	}),
	emits: ["update:modelValue"],
	setup(__props) {
		const modelValue = useModel(__props, "modelValue");
		return (_ctx, _cache) => {
			return openBlock(), createBlock(Input_default, {
				modelValue: modelValue.value,
				"onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => modelValue.value = $event),
				"data-slot": "input-group-control",
				class: normalizeClass(unref(cn)("flex-1 rounded-none bg-transparent text-inherit focus-visible:ring-0 aria-invalid:ring-0", __props.class))
			}, null, 8, ["modelValue", "class"]);
		};
	}
});
//#endregion
export { InputGroup_default as i, InputGroupButton_default as n, InputGroupAddon_default as r, InputGroupInput_default as t };
