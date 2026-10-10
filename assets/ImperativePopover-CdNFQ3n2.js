import "./rolldown-runtime-xtsTai4I.js";
import { $ as mergeProps, Et as withCtx, F as createBaseVNode, G as defineComponent, I as createBlock, Kt as unref, Lt as ref, U as createVNode, Xt as normalizeStyle, et as nextTick, ft as renderSlot, lt as openBlock } from "./vendor-vue-core-C1utdb0s.js";
import { x as useEventListener } from "./vendor-vueuse-BxKIIsKg.js";
import { Tt as PopoverRoot_default, bt as PopoverPortal_default, xt as PopoverContent_default, yt as PopoverTrigger_default } from "./vendor-reka-ui-tdehH9A1.js";
import { t as cn } from "./src-DI1bBfrb.js";
import { n as useModalLiftedZIndex } from "./useModalLiftedZIndex-BuehUvPe.js";
//#endregion
//#region src/components/common/ImperativePopover.vue
var ImperativePopover_default = /* @__PURE__ */ defineComponent({
	inheritAttrs: false,
	__name: "ImperativePopover",
	props: {
		align: { default: "center" },
		side: { default: "bottom" },
		sideOffset: { default: 4 },
		collisionPadding: { default: 8 },
		dismissable: {
			type: Boolean,
			default: true
		},
		closeOnEscape: {
			type: Boolean,
			default: true
		},
		class: { type: [
			Boolean,
			null,
			String,
			Object,
			Array
		] },
		contentClass: { type: [
			Boolean,
			null,
			String,
			Object,
			Array
		] }
	},
	emits: ["show", "hide"],
	setup(__props, { expose: __expose, emit: __emit }) {
		const emit = __emit;
		const open = ref(false);
		const anchor = ref();
		const focusTarget = ref();
		const anchorRect = ref({
			left: 0,
			top: 0,
			width: 0,
			height: 0
		});
		const content = ref();
		const contentStyle = useModalLiftedZIndex(open);
		const returnFocusOnClose = ref(false);
		let showRequest = 0;
		function setOpen(value) {
			if (open.value === value) return;
			open.value = value;
			if (value) emit("show");
			else emit("hide");
		}
		function show(event, target) {
			const sourceTarget = event.currentTarget instanceof HTMLElement ? event.currentTarget : event.target;
			const eventTarget = target ?? sourceTarget;
			if (!(eventTarget instanceof HTMLElement)) return;
			const openedByHover = [
				"mouseenter",
				"mouseover",
				"pointerenter",
				"pointerover"
			].includes(event.type);
			focusTarget.value = openedByHover ? void 0 : sourceTarget instanceof HTMLElement ? sourceTarget : eventTarget;
			returnFocusOnClose.value = !openedByHover;
			anchor.value = eventTarget;
			const rect = eventTarget.getBoundingClientRect();
			anchorRect.value = {
				left: rect.left,
				top: rect.top,
				width: rect.width,
				height: rect.height
			};
			const request = ++showRequest;
			nextTick(() => {
				if (request === showRequest) setOpen(true);
			});
		}
		function hide() {
			showRequest++;
			returnFocusOnClose.value = Boolean(focusTarget.value);
			setOpen(false);
		}
		function onScroll(event) {
			if (anchor.value && (event.target === document || event.target instanceof Window || event.target instanceof Element && event.target.contains(anchor.value))) hide();
		}
		useEventListener(() => open.value ? window : void 0, "scroll", onScroll, { capture: true });
		useEventListener(() => open.value ? window : void 0, "resize", hide);
		function toggle(event, target) {
			if (open.value) hide();
			else show(event, target);
		}
		function onOpenChange(value) {
			setOpen(value);
		}
		function onInteractOutside(event) {
			const target = event.detail.originalEvent.target;
			if (!__props.dismissable || target instanceof Node && anchor.value?.contains(target)) event.preventDefault();
			else returnFocusOnClose.value = false;
		}
		function onOpenAutoFocus(event) {
			if (!focusTarget.value) event.preventDefault();
		}
		function onCloseAutoFocus(event) {
			event.preventDefault();
			if (returnFocusOnClose.value) focusTarget.value?.focus();
		}
		__expose({
			show,
			hide,
			toggle,
			container: content,
			open
		});
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(PopoverRoot_default), {
				open: open.value,
				"onUpdate:open": onOpenChange
			}, {
				default: withCtx(() => [createVNode(unref(PopoverTrigger_default), { "as-child": "" }, {
					default: withCtx(() => [createBaseVNode("button", {
						type: "button",
						tabindex: "-1",
						"aria-hidden": "true",
						class: "pointer-events-none fixed opacity-0",
						style: normalizeStyle({
							left: `${anchorRect.value.left}px`,
							top: `${anchorRect.value.top}px`,
							width: `${anchorRect.value.width}px`,
							height: `${anchorRect.value.height}px`
						})
					}, null, 4)]),
					_: 1
				}), createVNode(unref(PopoverPortal_default), null, {
					default: withCtx(() => [createVNode(unref(PopoverContent_default), mergeProps({
						ref_key: "content",
						ref: content
					}, _ctx.$attrs, {
						align: __props.align,
						side: __props.side,
						"side-offset": __props.sideOffset,
						"collision-padding": __props.collisionPadding,
						style: unref(contentStyle),
						class: unref(cn)("pointer-events-auto z-3000 max-h-(--reka-popover-content-available-height) max-w-(--reka-popover-content-available-width) overflow-auto rounded-lg border border-border-subtle bg-base-background text-base-foreground shadow-lg outline-none", __props.class, __props.contentClass),
						onEscapeKeyDown: _cache[0] || (_cache[0] = ($event) => !__props.closeOnEscape && $event.preventDefault()),
						onOpenAutoFocus,
						onCloseAutoFocus,
						onInteractOutside
					}), {
						default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
						_: 3
					}, 16, [
						"align",
						"side",
						"side-offset",
						"collision-padding",
						"style",
						"class"
					])]),
					_: 3
				})]),
				_: 3
			}, 8, ["open"]);
		};
	}
});
//#endregion
export { ImperativePopover_default as t };
