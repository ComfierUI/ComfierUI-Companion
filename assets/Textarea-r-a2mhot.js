import "./rolldown-runtime-xtsTai4I.js";
import { C as vModelText, Dt as withDirectives, G as defineComponent, Jt as normalizeClass, Kt as unref, Q as mergeModels, R as createElementBlock, lt as openBlock, xt as useTemplateRef, yt as useModel } from "./vendor-vue-core-C1utdb0s.js";
import { t as cn } from "./src-DI1bBfrb.js";
//#endregion
//#region src/components/ui/textarea/Textarea.vue
var Textarea_default = /* @__PURE__ */ defineComponent({
	__name: "Textarea",
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
	setup(__props, { expose: __expose }) {
		const modelValue = useModel(__props, "modelValue");
		const textareaEl = useTemplateRef("textareaEl");
		__expose({ focus: () => textareaEl.value?.focus() });
		return (_ctx, _cache) => {
			return withDirectives((openBlock(), createElementBlock("textarea", {
				ref_key: "textareaEl",
				ref: textareaEl,
				"onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => modelValue.value = $event),
				class: normalizeClass(unref(cn)("flex min-h-16 w-full scrollbar-gutter-stable rounded-lg border-none bg-secondary-background px-3 py-2 text-sm text-base-foreground placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-border-default focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 aria-invalid:ring-1 aria-invalid:ring-destructive-background", __props.class))
			}, null, 2)), [[vModelText, modelValue.value]]);
		};
	}
});
//#endregion
export { Textarea_default as t };
