import "./rolldown-runtime-xtsTai4I.js";
import { Wt as toValue } from "./vendor-vue-core-C1utdb0s.js";
import { x as useEventListener } from "./vendor-vueuse-BxKIIsKg.js";
//#region src/composables/useDismissableOverlay.ts
var isNode = (value) => value instanceof Node;
var isInside = (target, element) => !!element?.contains(target);
function useDismissableOverlay({ isOpen, getOverlayEl, onDismiss, getTriggerEl, dismissOnScroll = false }) {
	const dismissIfOutside = (event) => {
		if (!toValue(isOpen)) return;
		const overlay = getOverlayEl();
		if (!overlay) return;
		if (!isNode(event.target)) {
			onDismiss();
			return;
		}
		if (isInside(event.target, overlay) || isInside(event.target, getTriggerEl?.())) return;
		onDismiss();
	};
	useEventListener(window, "pointerdown", dismissIfOutside, { capture: true });
	if (dismissOnScroll) useEventListener(window, "scroll", dismissIfOutside, {
		capture: true,
		passive: true
	});
}
//#endregion
export { useDismissableOverlay as t };
