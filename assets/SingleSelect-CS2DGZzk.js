import "./rolldown-runtime-xtsTai4I.js";
import { U as cva } from "./vendor-other-BPEcPQTD.js";
import { $ as mergeProps, Et as withCtx, F as createBaseVNode, G as defineComponent, H as createTextVNode, I as createBlock, Jt as normalizeClass, Kt as unref, Lt as ref, O as Fragment, P as computed, Q as mergeModels, R as createElementBlock, St as watch, U as createVNode, Wt as toValue, Xt as normalizeStyle, Zt as toDisplayString, _t as useAttrs, dt as renderList, ft as renderSlot, lt as openBlock, xt as useTemplateRef, yt as useModel } from "./vendor-vue-core-C1utdb0s.js";
import { f as unrefElement, t as useFuse } from "./vendor-vueuse-BxKIIsKg.js";
import { r as useI18n } from "./vendor-i18n-BZvE7WBQ.js";
import { Ft as ComboboxItem_default, H as SelectRoot_default, I as SelectPortal_default, It as ComboboxInput_default, Kt as ComboboxAnchor_default, L as SelectItemText_default, Lt as ComboboxEmpty_default, M as SelectValue_default, Mt as ComboboxTrigger_default, N as SelectTrigger_default, Nt as ComboboxPortal_default, Pt as ComboboxItemIndicator_default, R as SelectItemIndicator_default, Rt as ComboboxContent_default, V as SelectContent_default, j as SelectViewport_default, jt as ComboboxViewport_default, z as SelectItem_default, zt as ComboboxRoot_default } from "./vendor-reka-ui-tdehH9A1.js";
import { t as cn } from "./src-DI1bBfrb.js";
import { n as useModalLiftedZIndex, r as useOverlayBack } from "./useModalLiftedZIndex-BuehUvPe.js";
//#region src/components/ui/select/useSelectSearch.ts
function useSelectSearch(query, options) {
	const { results } = useFuse(query, options, {
		fuseOptions: {
			keys: ["name", "value"],
			threshold: .3
		},
		matchAllWhenSearchEmpty: true
	});
	return computed(() => query.value.trim() ? results.value.map(({ item }) => item) : toValue(options));
}
//#endregion
//#region packages/design-system/src/select.variants.ts
var selectTriggerVariants = cva({
	base: "relative inline-flex cursor-pointer items-center rounded-lg border-[2.5px] border-solid bg-secondary-background text-base-foreground transition-all duration-200 ease-in-out outline-none select-none hover:bg-secondary-background-hover disabled:cursor-default disabled:opacity-30 disabled:hover:bg-secondary-background",
	variants: {
		size: {
			md: "h-8",
			lg: "h-10"
		},
		border: {
			none: "border-transparent focus-visible:border-border-default data-[state=open]:border-border-default",
			active: "border-base-foreground",
			invalid: "border-destructive-background"
		}
	},
	defaultVariants: {
		size: "lg",
		border: "none"
	}
});
var selectItemVariants = cva({
	base: "flex cursor-pointer items-center px-2 outline-none hover:bg-secondary-background-hover",
	variants: { layout: {
		multi: "h-10 shrink-0 gap-2 rounded-lg data-highlighted:bg-secondary-background-selected data-highlighted:hover:bg-secondary-background-selected",
		single: "relative w-full justify-between gap-3 rounded-sm py-3 text-sm select-none focus:bg-secondary-background-hover data-[state=checked]:bg-secondary-background-selected data-[state=checked]:hover:bg-secondary-background-selected"
	} },
	defaultVariants: { layout: "multi" }
});
var selectContentClass = "z-3000 overflow-hidden rounded-lg p-2 bg-base-background text-base-foreground border border-solid border-border-default shadow-md data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2";
var selectDropdownClass = "flex shrink-0 cursor-pointer items-center justify-center pl-3";
var selectEmptyMessageClass = "px-3 pb-4 text-sm text-muted-foreground";
var selectCountBadgeClass = "flex size-3.5 items-center justify-center rounded-full bg-base-foreground text-[9px] font-semibold text-base-background";
function stopEscapeToDocument(event) {
	if (event.key === "Escape") {
		event.stopPropagation();
		event.stopImmediatePropagation();
	}
}
//#endregion
//#region src/composables/useAttrsClass.ts
/**
* Splits `class` out of `$attrs` so wrappers can merge it with `cn()` onto an
* inner element while the remaining attrs fall through untouched.
*/
function useAttrsClass() {
	const attrs = useAttrs();
	return {
		attrsClass: computed(() => attrs.class),
		attrsWithoutClass: computed(() => {
			const { class: _class, ...rest } = attrs;
			return rest;
		})
	};
}
//#endregion
//#region src/composables/usePopoverSizing.ts
var PRIMEVUE_DIALOG_CHILD_Z_INDEX_FLOOR = 3e3;
/**
* Composable for managing popover sizing styles
* @param options Popover size configuration
* @returns Computed style object for popover sizing
*/
function usePopoverSizing(options) {
	return computed(() => {
		const { minWidth, maxWidth } = options;
		const style = {};
		if (minWidth) style.minWidth = minWidth;
		if (maxWidth) style.maxWidth = maxWidth;
		return style;
	});
}
/**
* Keeps portaled Reka popovers above their containing PrimeVue dialog.
*
* This is a temporary bridge while PrimeVue dialogs and controls are
* incrementally migrated to Reka UI. Once the affected PrimeVue parents are
* migrated, this helper should be removed with the compatibility patch.
*/
function usePrimeVueOverlayChildStyle() {
	const overlayScopeRef = ref(null);
	return {
		overlayScopeRef,
		contentStyle: computed(() => {
			const overlay = overlayScopeRef.value?.closest(".p-dialog-mask, .p-overlay-mask");
			if (!overlay) return {};
			const zIndex = Number.parseInt(getComputedStyle(overlay).zIndex, 10);
			if (!Number.isFinite(zIndex)) return {};
			return { zIndex: Math.max(PRIMEVUE_DIALOG_CHILD_Z_INDEX_FLOOR, zIndex + 1) };
		})
	};
}
//#endregion
//#region src/components/ui/single-select/SearchableSingleSelect.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1$1 = {
	key: 0,
	class: "icon-[lucide--loader-circle] shrink-0 animate-spin text-muted-foreground"
};
var _hoisted_2 = { class: "truncate" };
var _hoisted_3 = { class: "px-2 pt-2" };
var _hoisted_4 = { class: "flex items-center gap-2 rounded-lg border border-solid border-border-default px-3 py-1.5" };
var _hoisted_5 = { class: "truncate" };
//#endregion
//#region src/components/ui/single-select/SearchableSingleSelect.vue
var SearchableSingleSelect_default = /* @__PURE__ */ defineComponent({
	inheritAttrs: false,
	__name: "SearchableSingleSelect",
	props: /*@__PURE__*/ mergeModels({
		label: {},
		options: { default: () => [] },
		size: { default: "lg" },
		invalid: {
			type: Boolean,
			default: false
		},
		loading: {
			type: Boolean,
			default: false
		},
		disabled: {
			type: Boolean,
			default: false
		},
		searchPlaceholder: {},
		listMaxHeight: { default: "28rem" },
		popoverMinWidth: {},
		popoverMaxWidth: {},
		contentStyle: { type: [
			Boolean,
			null,
			String,
			Object,
			Array
		] }
	}, {
		"modelValue": { required: true },
		"modelModifiers": {}
	}),
	emits: ["update:modelValue"],
	setup(__props) {
		const { attrsClass, attrsWithoutClass } = useAttrsClass();
		const selectedItem = useModel(__props, "modelValue");
		const { t } = useI18n();
		const triggerRef = useTemplateRef("trigger");
		const isOpen = ref(false);
		const searchQuery = ref("");
		const liftedContentStyle = useModalLiftedZIndex(isOpen);
		const filteredOptions = useSelectSearch(searchQuery, () => __props.options);
		const selectedOption = computed({
			get: () => __props.options.find(({ value }) => value === selectedItem.value),
			set: (option) => {
				selectedItem.value = option?.value;
			}
		});
		watch(isOpen, (open) => {
			if (!open) searchQuery.value = "";
		});
		function onContentKeydown(event) {
			if (event.key === "Tab") {
				unrefElement(triggerRef)?.focus();
				isOpen.value = false;
				return;
			}
			if (event.key === "Escape") {
				stopEscapeToDocument(event);
				isOpen.value = false;
			}
		}
		const optionStyle = usePopoverSizing({
			minWidth: __props.popoverMinWidth,
			maxWidth: __props.popoverMaxWidth
		});
		useOverlayBack(isOpen);
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(ComboboxRoot_default), {
				modelValue: selectedOption.value,
				"onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => selectedOption.value = $event),
				open: isOpen.value,
				"onUpdate:open": _cache[2] || (_cache[2] = ($event) => isOpen.value = $event),
				by: "value",
				disabled: __props.disabled,
				"ignore-filter": ""
			}, {
				default: withCtx(() => [createVNode(unref(ComboboxAnchor_default), { "as-child": "" }, {
					default: withCtx(() => [createVNode(unref(ComboboxTrigger_default), mergeProps({ ref: "trigger" }, unref(attrsWithoutClass), {
						tabindex: "0",
						"aria-label": __props.label || unref(t)("g.singleSelectDropdown"),
						"aria-busy": __props.loading || void 0,
						"aria-invalid": __props.invalid || void 0,
						class: unref(cn)(unref(selectTriggerVariants)({
							size: __props.size,
							border: __props.invalid ? "invalid" : "none"
						}), unref(attrsClass))
					}), {
						default: withCtx(() => [createBaseVNode("div", { class: normalizeClass(unref(cn)("flex flex-1 items-center gap-2 overflow-hidden py-2 pl-2", __props.size === "md" ? "text-xs" : "text-sm")) }, [__props.loading ? (openBlock(), createElementBlock("i", _hoisted_1$1)) : renderSlot(_ctx.$slots, "icon", {}, void 0, void 0, 1), createBaseVNode("span", _hoisted_2, toDisplayString(selectedOption.value?.name ?? __props.label), 1)], 2), createBaseVNode("div", { class: normalizeClass(unref(selectDropdownClass)) }, [..._cache[3] || (_cache[3] = [createBaseVNode("i", { class: "icon-[lucide--chevron-down] text-muted-foreground" }, null, -1)])], 2)]),
						_: 3
					}, 16, [
						"aria-label",
						"aria-busy",
						"aria-invalid",
						"class"
					])]),
					_: 3
				}), createVNode(unref(ComboboxPortal_default), null, {
					default: withCtx(() => [createVNode(unref(ComboboxContent_default), {
						position: "popper",
						"side-offset": 8,
						align: "start",
						style: normalizeStyle([
							unref(optionStyle),
							__props.contentStyle,
							unref(liftedContentStyle)
						]),
						class: normalizeClass(unref(cn)(unref(selectContentClass), "min-w-(--reka-combobox-trigger-width)")),
						onKeydown: onContentKeydown
					}, {
						default: withCtx(() => [createBaseVNode("div", _hoisted_3, [createBaseVNode("div", _hoisted_4, [_cache[4] || (_cache[4] = createBaseVNode("i", { class: "icon-[lucide--search] text-muted-foreground" }, null, -1)), createVNode(unref(ComboboxInput_default), {
							modelValue: searchQuery.value,
							"onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => searchQuery.value = $event),
							"aria-label": unref(t)("g.search"),
							placeholder: __props.searchPlaceholder ?? unref(t)("g.search"),
							class: "w-full border-none bg-transparent text-sm outline-none"
						}, null, 8, [
							"modelValue",
							"aria-label",
							"placeholder"
						])])]), createVNode(unref(ComboboxViewport_default), {
							style: normalizeStyle({ maxHeight: `min(${__props.listMaxHeight}, 50vh)` }),
							class: "scrollbar-custom w-full"
						}, {
							default: withCtx(() => [(openBlock(true), createElementBlock(Fragment, null, renderList(unref(filteredOptions), (opt) => {
								return openBlock(), createBlock(unref(ComboboxItem_default), {
									key: opt.value,
									value: opt,
									class: normalizeClass(unref(selectItemVariants)({ layout: "single" }))
								}, {
									default: withCtx(() => [createBaseVNode("span", _hoisted_5, toDisplayString(opt.name), 1), createVNode(unref(ComboboxItemIndicator_default), { class: "flex shrink-0 items-center justify-center" }, {
										default: withCtx(() => [..._cache[5] || (_cache[5] = [createBaseVNode("i", {
											class: "icon-[lucide--check] text-base-foreground",
											"aria-hidden": "true"
										}, null, -1)])]),
										_: 1
									})]),
									_: 2
								}, 1032, ["value", "class"]);
							}), 128)), createVNode(unref(ComboboxEmpty_default), { class: normalizeClass(unref(selectEmptyMessageClass)) }, {
								default: withCtx(() => [createTextVNode(toDisplayString(unref(t)("g.noResultsFound")), 1)]),
								_: 1
							}, 8, ["class"])]),
							_: 1
						}, 8, ["style"])]),
						_: 1
					}, 8, ["style", "class"])]),
					_: 1
				})]),
				_: 3
			}, 8, [
				"modelValue",
				"open",
				"disabled"
			]);
		};
	}
});
//#endregion
//#region src/components/ui/single-select/SingleSelect.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1 = {
	key: 0,
	class: "icon-[lucide--loader-circle] shrink-0 animate-spin text-muted-foreground"
};
//#endregion
//#region src/components/ui/single-select/SingleSelect.vue
var SingleSelect_default = /* @__PURE__ */ defineComponent({
	inheritAttrs: false,
	__name: "SingleSelect",
	props: /*@__PURE__*/ mergeModels({
		label: {},
		options: { default: () => [] },
		size: { default: "lg" },
		invalid: {
			type: Boolean,
			default: false
		},
		loading: {
			type: Boolean,
			default: false
		},
		disabled: {
			type: Boolean,
			default: false
		},
		searchable: {
			type: Boolean,
			default: false
		},
		searchPlaceholder: {},
		listMaxHeight: { default: "28rem" },
		popoverMinWidth: {},
		popoverMaxWidth: {},
		contentStyle: { type: [
			Boolean,
			null,
			String,
			Object,
			Array
		] }
	}, {
		"modelValue": { required: true },
		"modelModifiers": {}
	}),
	emits: ["update:modelValue"],
	setup(__props) {
		const { attrsClass, attrsWithoutClass } = useAttrsClass();
		const selectedItem = useModel(__props, "modelValue");
		const { t } = useI18n();
		const isOpen = ref(false);
		const liftedContentStyle = useModalLiftedZIndex(isOpen);
		function onContentKeydown(event) {
			if (event.key === "Escape") {
				stopEscapeToDocument(event);
				isOpen.value = false;
			}
		}
		const optionStyle = usePopoverSizing({
			minWidth: __props.popoverMinWidth,
			maxWidth: __props.popoverMaxWidth
		});
		useOverlayBack(isOpen);
		return (_ctx, _cache) => {
			return __props.searchable ? (openBlock(), createBlock(SearchableSingleSelect_default, mergeProps({
				key: 0,
				modelValue: selectedItem.value,
				"onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => selectedItem.value = $event)
			}, unref(attrsWithoutClass), {
				class: unref(attrsClass),
				label: __props.label,
				options: __props.options,
				size: __props.size,
				invalid: __props.invalid,
				loading: __props.loading,
				disabled: __props.disabled,
				"search-placeholder": __props.searchPlaceholder,
				"list-max-height": __props.listMaxHeight,
				"popover-min-width": __props.popoverMinWidth,
				"popover-max-width": __props.popoverMaxWidth,
				"content-style": __props.contentStyle
			}), {
				icon: withCtx(() => [renderSlot(_ctx.$slots, "icon")]),
				_: 3
			}, 16, [
				"modelValue",
				"class",
				"label",
				"options",
				"size",
				"invalid",
				"loading",
				"disabled",
				"search-placeholder",
				"list-max-height",
				"popover-min-width",
				"popover-max-width",
				"content-style"
			])) : (openBlock(), createBlock(unref(SelectRoot_default), {
				key: 1,
				modelValue: selectedItem.value,
				"onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => selectedItem.value = $event),
				open: isOpen.value,
				"onUpdate:open": _cache[2] || (_cache[2] = ($event) => isOpen.value = $event),
				disabled: __props.disabled
			}, {
				default: withCtx(() => [createVNode(unref(SelectTrigger_default), mergeProps(unref(attrsWithoutClass), {
					"aria-label": __props.label || unref(t)("g.singleSelectDropdown"),
					"aria-busy": __props.loading || void 0,
					"aria-invalid": __props.invalid || void 0,
					class: unref(cn)(unref(selectTriggerVariants)({
						size: __props.size,
						border: __props.invalid ? "invalid" : "none"
					}), unref(attrsClass))
				}), {
					default: withCtx(() => [createBaseVNode("div", { class: normalizeClass(unref(cn)("flex flex-1 items-center gap-2 overflow-hidden py-2 pl-2", __props.size === "md" ? "text-xs" : "text-sm")) }, [__props.loading ? (openBlock(), createElementBlock("i", _hoisted_1)) : renderSlot(_ctx.$slots, "icon", {}, void 0, void 0, 1), createVNode(unref(SelectValue_default), {
						placeholder: __props.label,
						class: "truncate"
					}, null, 8, ["placeholder"])], 2), createBaseVNode("div", { class: normalizeClass(unref(selectDropdownClass)) }, [..._cache[3] || (_cache[3] = [createBaseVNode("i", { class: "icon-[lucide--chevron-down] text-muted-foreground" }, null, -1)])], 2)]),
					_: 3
				}, 16, [
					"aria-label",
					"aria-busy",
					"aria-invalid",
					"class"
				]), createVNode(unref(SelectPortal_default), null, {
					default: withCtx(() => [createVNode(unref(SelectContent_default), {
						position: "popper",
						"side-offset": 8,
						align: "start",
						style: normalizeStyle([
							unref(optionStyle),
							__props.contentStyle,
							unref(liftedContentStyle)
						]),
						class: normalizeClass(unref(cn)(unref(selectContentClass), "min-w-(--reka-select-trigger-width)")),
						onKeydown: onContentKeydown
					}, {
						default: withCtx(() => [createVNode(unref(SelectViewport_default), {
							style: normalizeStyle({ maxHeight: `min(${__props.listMaxHeight}, 50vh)` }),
							class: "scrollbar-custom w-full"
						}, {
							default: withCtx(() => [(openBlock(true), createElementBlock(Fragment, null, renderList(__props.options, (opt) => {
								return openBlock(), createBlock(unref(SelectItem_default), {
									key: opt.value,
									value: opt.value,
									class: normalizeClass(unref(selectItemVariants)({ layout: "single" }))
								}, {
									default: withCtx(() => [createVNode(unref(SelectItemText_default), { class: "truncate" }, {
										default: withCtx(() => [createTextVNode(toDisplayString(opt.name), 1)]),
										_: 2
									}, 1024), createVNode(unref(SelectItemIndicator_default), { class: "flex shrink-0 items-center justify-center" }, {
										default: withCtx(() => [..._cache[4] || (_cache[4] = [createBaseVNode("i", {
											class: "icon-[lucide--check] text-base-foreground",
											"aria-hidden": "true"
										}, null, -1)])]),
										_: 1
									})]),
									_: 2
								}, 1032, ["value", "class"]);
							}), 128))]),
							_: 1
						}, 8, ["style"])]),
						_: 1
					}, 8, ["style", "class"])]),
					_: 1
				})]),
				_: 3
			}, 8, [
				"modelValue",
				"open",
				"disabled"
			]));
		};
	}
});
//#endregion
export { selectContentClass as a, selectEmptyMessageClass as c, stopEscapeToDocument as d, useSelectSearch as f, useAttrsClass as i, selectItemVariants as l, usePopoverSizing as n, selectCountBadgeClass as o, usePrimeVueOverlayChildStyle as r, selectDropdownClass as s, SingleSelect_default as t, selectTriggerVariants as u };
