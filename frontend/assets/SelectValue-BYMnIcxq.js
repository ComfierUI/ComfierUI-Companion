import "./rolldown-runtime-xtsTai4I.js";
import { $ as mergeProps, Et as withCtx, F as createBaseVNode, G as defineComponent, I as createBlock, Jt as normalizeClass, Kt as unref, Mt as isRef, P as computed, U as createVNode, Yt as normalizeProps, _t as useAttrs, ft as renderSlot, lt as openBlock, q as guardReactiveProps, z as createPropsRestProxy } from "./vendor-vue-core-C1utdb0s.js";
import { q as useVModel } from "./vendor-vueuse-BxKIIsKg.js";
import { B as SelectIcon_default, F as SelectScrollDownButton_default$1, H as SelectRoot_default, I as SelectPortal_default, L as SelectItemText_default, M as SelectValue_default$1, N as SelectTrigger_default$1, P as SelectScrollUpButton_default$1, R as SelectItemIndicator_default, U as injectSelectRootContext, V as SelectContent_default$1, j as SelectViewport_default, vn as useForwardPropsEmits, z as SelectItem_default$1 } from "./vendor-reka-ui-tdehH9A1.js";
import { t as cn } from "./src-DI1bBfrb.js";
import { n as useModalLiftedZIndex, r as useOverlayBack } from "./useModalLiftedZIndex-BuehUvPe.js";
//#endregion
//#region src/components/ui/select/Select.vue
var Select_default = /* @__PURE__ */ defineComponent({
	__name: "Select",
	props: {
		open: { type: Boolean },
		defaultOpen: { type: Boolean },
		defaultValue: {},
		modelValue: {},
		by: { type: [String, Function] },
		dir: {},
		multiple: { type: Boolean },
		autocomplete: {},
		disabled: { type: Boolean },
		name: {},
		required: { type: Boolean }
	},
	emits: ["update:modelValue", "update:open"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const open = useVModel(props, "open", emits, {
			passive: true,
			defaultValue: props.defaultOpen ?? false
		});
		useOverlayBack(open);
		const forwarded = useForwardPropsEmits(props, emits);
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(SelectRoot_default), mergeProps(unref(forwarded), {
				open: unref(open),
				"onUpdate:open": _cache[0] || (_cache[0] = ($event) => isRef(open) ? open.value = $event : null)
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16, ["open"]);
		};
	}
});
//#endregion
//#region src/components/ui/select/SelectScrollDownButton.vue
var SelectScrollDownButton_default = /* @__PURE__ */ defineComponent({
	__name: "SelectScrollDownButton",
	props: {
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
		const restProps = createPropsRestProxy(__props, ["class"]);
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(SelectScrollDownButton_default$1), mergeProps(restProps, { class: unref(cn)("flex cursor-default items-center justify-center py-1 text-muted-foreground", __props.class) }), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", {}, () => [_cache[0] || (_cache[0] = createBaseVNode("i", { class: "icon-[lucide--chevron-down]" }, null, -1))])]),
				_: 3
			}, 16, ["class"]);
		};
	}
});
//#endregion
//#region src/components/ui/select/SelectScrollUpButton.vue
var SelectScrollUpButton_default = /* @__PURE__ */ defineComponent({
	__name: "SelectScrollUpButton",
	props: {
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
		const restProps = createPropsRestProxy(__props, ["class"]);
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(SelectScrollUpButton_default$1), mergeProps(restProps, { class: unref(cn)("flex cursor-default items-center justify-center py-1 text-muted-foreground", __props.class) }), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", {}, () => [_cache[0] || (_cache[0] = createBaseVNode("i", { class: "icon-[lucide--chevron-up]" }, null, -1))])]),
				_: 3
			}, 16, ["class"]);
		};
	}
});
//#endregion
//#region src/components/ui/select/SelectContent.vue
var SelectContent_default = /* @__PURE__ */ defineComponent({
	inheritAttrs: false,
	__name: "SelectContent",
	props: {
		forceMount: { type: Boolean },
		position: { default: "popper" },
		bodyLock: { type: Boolean },
		side: {},
		sideOffset: {},
		sideFlip: { type: Boolean },
		align: {},
		alignOffset: {},
		alignFlip: { type: Boolean },
		avoidCollisions: { type: Boolean },
		collisionBoundary: {},
		collisionPadding: {},
		arrowPadding: {},
		sticky: {},
		hideWhenDetached: { type: Boolean },
		positionStrategy: {},
		updatePositionStrategy: {},
		disableUpdateOnLayoutShift: { type: Boolean },
		prioritizePosition: { type: Boolean },
		reference: {},
		asChild: { type: Boolean },
		as: {},
		disableOutsidePointerEvents: { type: Boolean },
		class: { type: [
			Boolean,
			null,
			String,
			Object,
			Array
		] },
		disablePortal: {
			type: Boolean,
			default: false
		}
	},
	emits: [
		"closeAutoFocus",
		"escapeKeyDown",
		"pointerDownOutside"
	],
	setup(__props, { emit: __emit }) {
		const restProps = createPropsRestProxy(__props, [
			"position",
			"disablePortal",
			"class"
		]);
		const emits = __emit;
		const delegatedProps = computed(() => ({
			position: __props.position,
			...restProps
		}));
		const forwarded = useForwardPropsEmits(delegatedProps, emits);
		const attrs = useAttrs();
		const rootContext = injectSelectRootContext();
		const liftedStyle = useModalLiftedZIndex(rootContext.open);
		const mergedStyle = computed(() => [attrs.style, liftedStyle.value]);
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(SelectPortal_default), { disabled: __props.disablePortal }, {
				default: withCtx(() => [createVNode(unref(SelectContent_default$1), mergeProps({
					...unref(forwarded),
					..._ctx.$attrs
				}, {
					style: mergedStyle.value,
					class: unref(cn)("relative z-3000 max-h-96 min-w-32 overflow-hidden", "mt-2 rounded-lg p-2", "bg-base-background text-base-foreground", "border border-solid border-border-default", "shadow-md", "data-[state=closed]:animate-out data-[state=open]:animate-in", "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95", "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2", "data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2", __props.position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1", __props.class)
				}), {
					default: withCtx(() => [
						renderSlot(_ctx.$slots, "prepend"),
						createVNode(SelectScrollUpButton_default),
						createVNode(unref(SelectViewport_default), { class: normalizeClass(unref(cn)("flex scrollbar-custom flex-col gap-0", __props.position === "popper" && "h-(--reka-select-trigger-height) w-full min-w-(--reka-select-trigger-width)")) }, {
							default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
							_: 3
						}, 8, ["class"]),
						createVNode(SelectScrollDownButton_default)
					]),
					_: 3
				}, 16, ["style", "class"])]),
				_: 3
			}, 8, ["disabled"]);
		};
	}
});
//#endregion
//#region src/components/ui/select/SelectItem.vue
var SelectItem_default = /* @__PURE__ */ defineComponent({
	__name: "SelectItem",
	props: {
		value: {},
		disabled: { type: Boolean },
		textValue: {},
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
		const restProps = createPropsRestProxy(__props, ["class"]);
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(SelectItem_default$1), mergeProps(restProps, { class: unref(cn)("relative flex w-full cursor-pointer items-center justify-between select-none", "gap-3 rounded-sm px-2 py-3 text-sm outline-none", "hover:bg-secondary-background-hover", "focus:bg-secondary-background-hover", "data-[state=checked]:bg-secondary-background-selected", "data-[state=checked]:hover:bg-secondary-background-selected", "data-disabled:pointer-events-none data-disabled:opacity-50", __props.class) }), {
				default: withCtx(() => [createVNode(unref(SelectItemText_default), { class: "truncate" }, {
					default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
					_: 3
				}), createVNode(unref(SelectItemIndicator_default), { class: "flex shrink-0 items-center justify-center" }, {
					default: withCtx(() => [..._cache[0] || (_cache[0] = [createBaseVNode("i", {
						class: "icon-[lucide--check] text-base-foreground",
						"aria-hidden": "true"
					}, null, -1)])]),
					_: 1
				})]),
				_: 3
			}, 16, ["class"]);
		};
	}
});
//#endregion
//#region src/components/ui/select/SelectTrigger.vue
var SelectTrigger_default = /* @__PURE__ */ defineComponent({
	__name: "SelectTrigger",
	props: {
		disabled: { type: Boolean },
		reference: {},
		asChild: { type: Boolean },
		as: {},
		class: { type: [
			Boolean,
			null,
			String,
			Object,
			Array
		] },
		size: { default: "lg" },
		invalid: {
			type: Boolean,
			default: false
		}
	},
	setup(__props) {
		const restProps = createPropsRestProxy(__props, [
			"class",
			"size",
			"invalid"
		]);
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(SelectTrigger_default$1), mergeProps(restProps, {
				"aria-invalid": __props.invalid || void 0,
				class: unref(cn)("flex w-full cursor-pointer items-center justify-between select-none", __props.size === "md" ? "h-8 px-3 py-1 text-xs" : "h-10 px-4 py-2 text-sm", "rounded-lg", "bg-secondary-background text-base-foreground", "transition-all duration-200 ease-in-out", "hover:bg-secondary-background-hover", "border-[2.5px] border-solid", __props.invalid ? "border-destructive-background" : "border-transparent focus:border-border-default", "focus:outline-none", "data-placeholder:text-muted-foreground", "disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-secondary-background", "[&>span]:truncate", __props.class)
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default"), createVNode(unref(SelectIcon_default), { "as-child": "" }, {
					default: withCtx(() => [..._cache[0] || (_cache[0] = [createBaseVNode("i", { class: "icon-[lucide--chevron-down] shrink-0 text-muted-foreground" }, null, -1)])]),
					_: 1
				})]),
				_: 3
			}, 16, ["aria-invalid", "class"]);
		};
	}
});
//#endregion
//#region src/components/ui/select/SelectValue.vue
var SelectValue_default = /* @__PURE__ */ defineComponent({
	__name: "SelectValue",
	props: {
		placeholder: {},
		asChild: { type: Boolean },
		as: {}
	},
	setup(__props) {
		const props = __props;
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(SelectValue_default$1), normalizeProps(guardReactiveProps(props)), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});
//#endregion
export { Select_default as a, SelectContent_default as i, SelectTrigger_default as n, SelectItem_default as r, SelectValue_default as t };
