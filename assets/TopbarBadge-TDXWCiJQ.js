import "./rolldown-runtime-xtsTai4I.js";
import { Dt as withDirectives, E as withModifiers, Et as withCtx, F as createBaseVNode, G as defineComponent, I as createBlock, Jt as normalizeClass, Kt as unref, L as createCommentVNode, Lt as ref, P as computed, R as createElementBlock, U as createVNode, Xt as normalizeStyle, Zt as toDisplayString, lt as openBlock, mt as resolveDirective, xt as useTemplateRef } from "./vendor-vue-core-C1utdb0s.js";
import { Tt as PopoverRoot_default, yt as PopoverTrigger_default } from "./vendor-reka-ui-tdehH9A1.js";
import { t as cn } from "./src-DI1bBfrb.js";
import { t as PopoverContent_default } from "./PopoverContent-0k_uVDfE.js";
//#region src/components/topbar/TopbarBadge.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1 = ["aria-label"];
var _hoisted_2 = { class: "font-inter text-sm" };
var _hoisted_3 = {
	key: 1,
	class: "text-xs"
};
var labelClasses = "shrink-0 rounded-full border border-border-default px-2 py-0.5 text-xs text-muted-foreground";
//#endregion
//#region src/components/topbar/TopbarBadge.vue
var TopbarBadge_default = /* @__PURE__ */ defineComponent({
	__name: "TopbarBadge",
	props: {
		badge: {},
		displayMode: { default: "full" },
		reverseOrder: { type: Boolean },
		noPadding: { type: Boolean },
		backgroundColor: { default: "var(--comfy-menu-bg)" }
	},
	setup(__props) {
		const popoverOpen = ref(false);
		const badgeContent = useTemplateRef("badgeContent");
		const variant = computed(() => __props.badge.variant ?? "info");
		const menuBackgroundStyle = computed(() => ({ backgroundColor: __props.backgroundColor }));
		const showLabel = computed(() => {
			if (!__props.badge.label) return false;
			const needle = __props.badge.label.toLowerCase();
			return !__props.badge.text.toLowerCase().split(/\s+/).some((word) => word.replace(/^[^\p{L}\p{N}]+|[^\p{L}\p{N}]+$/gu, "").startsWith(needle));
		});
		const triggerShowsLabel = computed(() => Boolean(__props.displayMode === "compact" ? showLabel.value : __props.badge.label && !iconClass.value));
		const textClasses = computed(() => {
			switch (variant.value) {
				case "error": return "text-danger-100";
				case "warning": return "text-warning-background";
				default: return "text-text-primary";
			}
		});
		const iconClass = computed(() => {
			if (__props.badge.icon) return __props.badge.icon;
			switch (variant.value) {
				case "error": return "pi pi-exclamation-circle";
				case "warning": return "icon-[lucide--triangle-alert]";
				default: return;
			}
		});
		const badgeIconClass = computed(() => cn("size-4 shrink-0 text-base", iconClass.value, textClasses.value));
		const dotClasses = computed(() => {
			switch (variant.value) {
				case "error": return "bg-danger-100";
				case "warning": return "bg-gold-600";
				default: return "bg-text-secondary";
			}
		});
		return (_ctx, _cache) => {
			const _directive_tooltip = resolveDirective("tooltip");
			return __props.displayMode !== "full" ? (openBlock(), createBlock(unref(PopoverRoot_default), {
				key: 0,
				open: popoverOpen.value,
				"onUpdate:open": _cache[1] || (_cache[1] = ($event) => popoverOpen.value = $event)
			}, {
				default: withCtx(() => [createVNode(unref(PopoverTrigger_default), { "as-child": "" }, {
					default: withCtx(() => [createBaseVNode("button", {
						type: "button",
						"aria-label": triggerShowsLabel.value ? void 0 : __props.badge.text,
						class: normalizeClass(unref(cn)("relative flex h-full shrink-0 cursor-pointer items-center border-0 bg-transparent transition-opacity hover:opacity-80", __props.displayMode === "icon-only" ? "justify-center px-2" : "gap-2 whitespace-nowrap", __props.displayMode === "compact" && __props.reverseOrder && "flex-row-reverse", __props.displayMode === "compact" && !__props.noPadding && "px-3")),
						style: normalizeStyle(menuBackgroundStyle.value)
					}, [iconClass.value ? (openBlock(), createElementBlock("i", {
						key: 0,
						"data-testid": "badge-icon",
						"aria-hidden": "true",
						class: normalizeClass(badgeIconClass.value)
					}, null, 2)) : createCommentVNode("", true), triggerShowsLabel.value ? (openBlock(), createElementBlock("div", {
						key: 1,
						class: normalizeClass(labelClasses)
					}, toDisplayString(__props.badge.label), 1)) : !iconClass.value ? (openBlock(), createElementBlock("div", {
						key: 2,
						"data-testid": "badge-dot",
						class: normalizeClass(["size-2 shrink-0 rounded-full", dotClasses.value])
					}, null, 2)) : createCommentVNode("", true)], 14, _hoisted_1)]),
					_: 1
				}), createVNode(PopoverContent_default, {
					align: "start",
					class: "w-auto max-w-xs min-w-40 border-border-default bg-base-background p-3",
					onOpenAutoFocus: _cache[0] || (_cache[0] = withModifiers(($event) => badgeContent.value?.focus(), ["prevent"]))
				}, {
					default: withCtx(() => [createBaseVNode("div", {
						ref_key: "badgeContent",
						ref: badgeContent,
						tabindex: "-1",
						class: "flex flex-col gap-2 outline-none"
					}, [
						showLabel.value ? (openBlock(), createElementBlock("div", {
							key: 0,
							class: normalizeClass(unref(cn)(labelClasses, "w-fit"))
						}, toDisplayString(__props.badge.label), 3)) : createCommentVNode("", true),
						createBaseVNode("div", _hoisted_2, toDisplayString(__props.badge.text), 1),
						__props.badge.tooltip ? (openBlock(), createElementBlock("div", _hoisted_3, toDisplayString(__props.badge.tooltip), 1)) : createCommentVNode("", true)
					], 512)]),
					_: 1
				})]),
				_: 1
			}, 8, ["open"])) : withDirectives((openBlock(), createElementBlock("div", {
				key: 1,
				class: normalizeClass(unref(cn)("flex h-full shrink-0 items-center gap-1 whitespace-nowrap", __props.reverseOrder && "flex-row-reverse", !__props.noPadding && "px-2")),
				style: normalizeStyle(menuBackgroundStyle.value)
			}, [
				iconClass.value ? (openBlock(), createElementBlock("i", {
					key: 0,
					"data-testid": "badge-icon",
					"aria-hidden": "true",
					class: normalizeClass(badgeIconClass.value)
				}, null, 2)) : createCommentVNode("", true),
				createBaseVNode("div", { class: normalizeClass(["font-inter text-xs font-medium", textClasses.value]) }, toDisplayString(__props.badge.text), 3),
				showLabel.value ? (openBlock(), createElementBlock("div", {
					key: 1,
					class: normalizeClass(labelClasses)
				}, toDisplayString(__props.badge.label), 1)) : createCommentVNode("", true)
			], 6)), [[_directive_tooltip, __props.badge.tooltip]]);
		};
	}
});
//#endregion
export { TopbarBadge_default as t };
