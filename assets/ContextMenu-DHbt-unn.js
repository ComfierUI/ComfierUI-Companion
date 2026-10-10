import "./rolldown-runtime-xtsTai4I.js";
import { B as createSlots, E as withModifiers, Et as withCtx, F as createBaseVNode, G as defineComponent, I as createBlock, Jt as normalizeClass, Kt as unref, Lt as ref, U as createVNode, Xt as normalizeStyle, Yt as normalizeProps, et as nextTick, ft as renderSlot, j as Teleport, lt as openBlock, q as guardReactiveProps, st as onUnmounted, vt as useId, xt as useTemplateRef } from "./vendor-vue-core-C1utdb0s.js";
import { x as useEventListener } from "./vendor-vueuse-BxKIIsKg.js";
import { Pi as MenuItems_default, zi as menuContentClass } from "./layoutStore-CZsuzg91.js";
import { dt as DropdownMenuPortal_default, gt as DropdownMenuRoot_default, ht as DropdownMenuContent_default, it as DropdownMenuTrigger_default } from "./vendor-reka-ui-tdehH9A1.js";
import { t as cn } from "./src-DI1bBfrb.js";
import { n as useModalLiftedZIndex, o as registerBackDismiss } from "./useModalLiftedZIndex-BuehUvPe.js";
//#region src/components/ui/menu/menuAnchor.ts
function getMenuAnchorPosition(event) {
	if (event instanceof MouseEvent && !(event.type === "click" && event.detail === 0)) return {
		x: event.clientX,
		y: event.clientY
	};
	const target = event.currentTarget ?? event.target;
	const rect = target instanceof Element ? target.getBoundingClientRect() : null;
	return {
		x: rect?.left ?? 0,
		y: rect?.top ?? 0
	};
}
//#endregion
//#region src/components/ui/menu/ContextMenu.vue
var ContextMenu_default = /* @__PURE__ */ defineComponent({
	inheritAttrs: false,
	__name: "ContextMenu",
	props: {
		id: {},
		model: {},
		reference: {}
	},
	emits: ["show", "hide"],
	setup(__props, { expose: __expose, emit: __emit }) {
		const emit = __emit;
		const trigger = useTemplateRef("trigger");
		const visible = ref(false);
		const generatedId = useId();
		const ownerId = `context-menu-${generatedId}`;
		const anchor = ref(null);
		const anchorPointerDownWhileOpen = ref(false);
		const anchorPosition = ref({
			x: 0,
			y: 0
		});
		const showRequest = ref(0);
		const contentStyle = useModalLiftedZIndex(visible);
		let releaseBack;
		onUnmounted(() => releaseBack?.());
		function setOpen(value) {
			if (visible.value === value) return;
			visible.value = value;
			releaseBack?.();
			releaseBack = value ? registerBackDismiss(hide) : void 0;
			nextTick(() => {
				if (value) emit("show");
				else emit("hide");
			});
		}
		function show(event) {
			if (event.type === "contextmenu") event.preventDefault();
			anchor.value = event.currentTarget ?? event.target;
			anchorPosition.value = getMenuAnchorPosition(event);
			if (!visible.value) {
				setOpen(true);
				return;
			}
			setOpen(false);
			const request = ++showRequest.value;
			nextTick(() => {
				if (request === showRequest.value) setOpen(true);
			});
		}
		function hide() {
			showRequest.value++;
			setOpen(false);
		}
		useEventListener(document, "pointerdown", (event) => {
			const target = event.target;
			anchorPointerDownWhileOpen.value = visible.value && target instanceof Node && anchor.value instanceof Node && anchor.value.contains(target);
			if (anchorPointerDownWhileOpen.value) return;
			if (!visible.value || !(target instanceof Element) || trigger.value?.contains(target) || target.closest("[data-menu-owner]")?.getAttribute("data-menu-owner") === ownerId) return;
			hide();
		}, { capture: true });
		function toggle(event) {
			if (visible.value || event instanceof MouseEvent && event.detail > 0 && anchorPointerDownWhileOpen.value) {
				anchorPointerDownWhileOpen.value = false;
				hide();
				return;
			}
			show(event);
		}
		function updateOpen(value) {
			setOpen(value);
		}
		__expose({
			hide,
			show,
			toggle,
			visible
		});
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(DropdownMenuRoot_default), {
				open: visible.value,
				modal: false,
				"onUpdate:open": updateOpen
			}, {
				default: withCtx(() => [(openBlock(), createBlock(Teleport, { to: "body" }, [createVNode(unref(DropdownMenuTrigger_default), { "as-child": "" }, {
					default: withCtx(() => [createBaseVNode("button", {
						ref_key: "trigger",
						ref: trigger,
						"data-menu-owner": ownerId,
						type: "button",
						tabindex: "-1",
						"aria-hidden": "true",
						class: "pointer-events-none fixed size-px opacity-0",
						style: normalizeStyle({
							left: `${anchorPosition.value.x}px`,
							top: `${anchorPosition.value.y}px`
						})
					}, null, 4)]),
					_: 1
				})])), createVNode(unref(DropdownMenuPortal_default), null, {
					default: withCtx(() => [createVNode(unref(DropdownMenuContent_default), {
						id: __props.id ?? unref(generatedId),
						reference: __props.reference,
						"data-menu-owner": ownerId,
						class: normalizeClass(unref(cn)(unref(menuContentClass), "max-h-(--reka-dropdown-menu-content-available-height)", _ctx.$attrs.class)),
						style: normalizeStyle(unref(contentStyle)),
						"side-offset": 2,
						align: "start",
						"update-position-strategy": __props.reference ? "always" : "optimized",
						onCloseAutoFocus: _cache[0] || (_cache[0] = withModifiers(() => {}, ["prevent"])),
						onFocusOutside: _cache[1] || (_cache[1] = withModifiers(() => {}, ["prevent"]))
					}, {
						default: withCtx(() => [createVNode(MenuItems_default, {
							items: __props.model,
							"owner-id": ownerId,
							onSelect: hide
						}, createSlots({ _: 2 }, [_ctx.$slots.item ? {
							name: "item",
							fn: withCtx((slotProps) => [renderSlot(_ctx.$slots, "item", normalizeProps(guardReactiveProps(slotProps)))]),
							key: "0"
						} : void 0]), 1032, ["items"])]),
						_: 3
					}, 8, [
						"id",
						"reference",
						"class",
						"style",
						"update-position-strategy"
					])]),
					_: 3
				})]),
				_: 3
			}, 8, ["open"]);
		};
	}
});
//#endregion
export { getMenuAnchorPosition as n, ContextMenu_default as t };
