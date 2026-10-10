import "./rolldown-runtime-xtsTai4I.js";
import { U as cva } from "./vendor-other-BPEcPQTD.js";
import { $ as mergeProps, Et as withCtx, G as defineComponent, H as createTextVNode, I as createBlock, Jt as normalizeClass, Kt as unref, L as createCommentVNode, O as Fragment, P as computed, R as createElementBlock, Zt as toDisplayString, dt as renderList, ft as renderSlot, lt as openBlock } from "./vendor-vue-core-C1utdb0s.js";
import { $ as reactiveOmit } from "./vendor-vueuse-BxKIIsKg.js";
import { rt as Label_default$1, yn as useForwardProps } from "./vendor-reka-ui-tdehH9A1.js";
import { t as cn } from "./src-DI1bBfrb.js";
//#region src/components/ui/field/field.variants.ts
var fieldVariants = cva({
	base: "group/field flex w-full gap-3 data-[invalid=true]:text-destructive-background",
	variants: { orientation: {
		vertical: "flex-col *:w-full [&>.sr-only]:w-auto",
		horizontal: "flex-row items-center *:data-[slot=field-label]:flex-auto"
	} },
	defaultVariants: { orientation: "vertical" }
});
//#endregion
//#region src/components/ui/field/Field.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1$1 = ["data-orientation"];
//#endregion
//#region src/components/ui/field/Field.vue
var Field_default = /* @__PURE__ */ defineComponent({
	__name: "Field",
	props: {
		class: { type: [
			Boolean,
			null,
			String,
			Object,
			Array
		] },
		orientation: {}
	},
	setup(__props) {
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", {
				role: "group",
				"data-slot": "field",
				"data-orientation": __props.orientation,
				class: normalizeClass(unref(cn)(unref(fieldVariants)({ orientation: __props.orientation }), __props.class))
			}, [renderSlot(_ctx.$slots, "default")], 10, _hoisted_1$1);
		};
	}
});
//#endregion
//#region src/components/ui/field/FieldError.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1 = {
	key: 2,
	class: "m-0 flex list-disc flex-col gap-1 pl-4"
};
//#endregion
//#region src/components/ui/field/FieldError.vue
var FieldError_default = /* @__PURE__ */ defineComponent({
	__name: "FieldError",
	props: {
		class: { type: [
			Boolean,
			null,
			String,
			Object,
			Array
		] },
		errors: { default: () => [] }
	},
	setup(__props) {
		const messages = computed(() => {
			return [...new Set(__props.errors.map((error) => typeof error === "string" ? error : error?.message))].filter((message) => !!message);
		});
		return (_ctx, _cache) => {
			return _ctx.$slots.default || messages.value.length ? (openBlock(), createElementBlock("div", {
				key: 0,
				role: "alert",
				"data-slot": "field-error",
				class: normalizeClass(unref(cn)("text-sm font-normal text-destructive-background", __props.class))
			}, [_ctx.$slots.default ? renderSlot(_ctx.$slots, "default", {}, void 0, void 0, 0) : messages.value.length === 1 ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [createTextVNode(toDisplayString(messages.value[0]), 1)], 64)) : (openBlock(), createElementBlock("ul", _hoisted_1, [(openBlock(true), createElementBlock(Fragment, null, renderList(messages.value, (message) => {
				return openBlock(), createElementBlock("li", { key: message }, toDisplayString(message), 1);
			}), 128))]))], 2)) : createCommentVNode("", true);
		};
	}
});
//#endregion
//#region src/components/ui/label/Label.vue
var Label_default = /* @__PURE__ */ defineComponent({
	__name: "Label",
	props: {
		for: {},
		asChild: { type: Boolean },
		as: {},
		class: { type: [
			Boolean,
			null,
			String,
			Object,
			Array
		] }
	},
	setup(__props) {
		const props = __props;
		const forwarded = useForwardProps(reactiveOmit(props, "class"));
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Label_default$1), mergeProps(unref(forwarded), {
				"data-slot": "label",
				class: unref(cn)("flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50", props.class)
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16, ["class"]);
		};
	}
});
//#endregion
//#region src/components/ui/field/FieldLabel.vue
var FieldLabel_default = /* @__PURE__ */ defineComponent({
	__name: "FieldLabel",
	props: { class: { type: [
		Boolean,
		null,
		String,
		Object,
		Array
	] } },
	setup(__props) {
		return (_ctx, _cache) => {
			return openBlock(), createBlock(Label_default, {
				"data-slot": "field-label",
				class: normalizeClass(unref(cn)("group/field-label peer/field-label flex w-fit gap-2 leading-snug group-data-[disabled=true]/field:opacity-50", "has-[>[data-slot=field]]:w-full has-[>[data-slot=field]]:flex-col has-[>[data-slot=field]]:rounded-md has-[>[data-slot=field]]:border *:data-[slot=field]:p-4", "has-data-[state=checked]:border-primary-background has-data-[state=checked]:bg-primary-background/10", __props.class))
			}, {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 8, ["class"]);
		};
	}
});
//#endregion
export { FieldError_default as n, Field_default as r, FieldLabel_default as t };
