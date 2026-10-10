import "./rolldown-runtime-xtsTai4I.js";
import { P as computed, St as watch, X as inject, st as onUnmounted } from "./vendor-vue-core-C1utdb0s.js";
import { l as ZIndex } from "./vendor-primevue-C3d0HJ53.js";
//#region src/comfier/backDismiss.ts
var dismissals = /* @__PURE__ */ new Map();
function registerBackDismiss(dismiss) {
	const key = Symbol();
	dismissals.set(key, dismiss);
	return () => {
		dismissals.delete(key);
	};
}
function dismissTopOverlay() {
	const latest = [...dismissals.entries()].at(-1);
	if (!latest) return false;
	dismissals.delete(latest[0]);
	latest[1]();
	return true;
}
var handlers = /* @__PURE__ */ new Map();
var dispatching = false;
function registerBackHandler(dismiss, priority, name) {
	const key = name ?? Symbol();
	const entry = {
		name: name ?? "",
		priority,
		dismiss
	};
	handlers.set(key, entry);
	return () => {
		if (handlers.get(key) === entry) handlers.delete(key);
	};
}
function dismissOwnedPage(minimum = 0, maximum = Infinity) {
	if (dispatching) return false;
	dispatching = true;
	try {
		for (const handler of [...handlers.values()].sort((a, b) => a.priority - b.priority || a.name.localeCompare(b.name))) if (handler.priority >= minimum && handler.priority <= maximum && handler.dismiss()) return true;
		return false;
	} finally {
		dispatching = false;
	}
}
//#endregion
//#region src/comfier/useOverlayBack.ts
function useOverlayBack(open, close = () => {
	open.value = false;
}) {
	let release;
	watch(open, (value) => {
		release?.();
		release = value ? registerBackDismiss(close) : void 0;
	}, {
		flush: "sync",
		immediate: true
	});
	onUnmounted(() => release?.());
}
//#endregion
//#region src/composables/useModalLiftedZIndex.ts
var overlayZIndexKey = Symbol("overlayZIndex");
var MODAL_BASE_Z_INDEX = 1700;
/**
* Inline z-index style for body-portaled popover/menu content. Such content
* keeps its static `z-1700` class unless a dialog that joined @primeuix's
* auto-incrementing 'modal' counter (Reka and PrimeVue dialogs both do, via
* `v-reka-z-index` or PrimeVue's mask) is open above it; then lift past that
* dialog so the content isn't hidden behind the dialog or its scrim.
*/
function useModalLiftedZIndex(open) {
	const parentZIndex = inject(overlayZIndexKey, 0);
	return computed(() => {
		if (!open.value) return void 0;
		const topZIndex = Math.max(ZIndex.getCurrent("modal"), parentZIndex);
		return topZIndex >= MODAL_BASE_Z_INDEX ? { zIndex: topZIndex + 1 } : void 0;
	});
}
//#endregion
export { dismissTopOverlay as a, dismissOwnedPage as i, useModalLiftedZIndex as n, registerBackDismiss as o, useOverlayBack as r, registerBackHandler as s, overlayZIndexKey as t };
