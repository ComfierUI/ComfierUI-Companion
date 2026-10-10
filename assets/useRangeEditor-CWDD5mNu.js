import "./rolldown-runtime-xtsTai4I.js";
import { Lt as clamp } from "./vendor-other-BPEcPQTD.js";
import { Lt as ref, rt as onBeforeUnmount } from "./vendor-vue-core-C1utdb0s.js";
import { E as denormalize, O as normalize } from "./layoutStore-CZsuzg91.js";
//#region src/composables/useRangeEditor.ts
function useRangeEditor({ trackRef, modelValue, valueMin, valueMax, showMidpoint, contentInsetX, handleCenterOffsetX }) {
	const activeHandle = ref(null);
	let cleanupDrag = null;
	function grabShiftFor(handle) {
		const offset = handleCenterOffsetX?.value ?? 0;
		if (!Number.isFinite(offset)) return 0;
		if (handle === "min") return offset;
		if (handle === "max") return -offset;
		return 0;
	}
	function pointerToValue(e, handle = null) {
		const el = trackRef.value;
		if (!el) return valueMin.value;
		const rect = el.getBoundingClientRect();
		const rawInset = contentInsetX?.value ?? 0;
		const inset = Number.isFinite(rawInset) ? clamp(rawInset, 0, rect.width / 2) : 0;
		const contentWidth = Math.max(rect.width - 2 * inset, 1);
		const normalized = clamp((e.clientX + grabShiftFor(handle) - rect.left - inset) / contentWidth, 0, 1);
		return denormalize(normalized, valueMin.value, valueMax.value);
	}
	function nearestHandle(value) {
		const { min, max, midpoint } = modelValue.value;
		const dMin = Math.abs(value - min);
		const dMax = Math.abs(value - max);
		let best = dMin <= dMax ? "min" : "max";
		const bestDist = Math.min(dMin, dMax);
		if (midpoint !== void 0 && showMidpoint.value) {
			const midAbs = min + midpoint * (max - min);
			if (Math.abs(value - midAbs) < bestDist) best = "midpoint";
		}
		return best;
	}
	function updateValue(handle, value) {
		const current = modelValue.value;
		const clamped = clamp(value, valueMin.value, valueMax.value);
		if (handle === "min") modelValue.value = {
			...current,
			min: Math.min(clamped, current.max)
		};
		else if (handle === "max") modelValue.value = {
			...current,
			max: Math.max(clamped, current.min)
		};
		else {
			const midNorm = current.max - current.min > 0 ? normalize(clamped, current.min, current.max) : 0;
			const midpoint = clamp(midNorm, 0, 1);
			modelValue.value = {
				...current,
				midpoint
			};
		}
	}
	function handleTrackPointerDown(e) {
		if (e.button !== 0) return;
		startDrag(nearestHandle(pointerToValue(e)), e);
	}
	function startDrag(handle, e) {
		if (e.button !== 0) return;
		cleanupDrag?.();
		const el = trackRef.value;
		if (!el) return;
		activeHandle.value = handle;
		el.setPointerCapture(e.pointerId);
		const onMove = (ev) => {
			if (!activeHandle.value) return;
			updateValue(activeHandle.value, pointerToValue(ev, activeHandle.value));
		};
		const endDrag = () => {
			if (!activeHandle.value) return;
			activeHandle.value = null;
			el.removeEventListener("pointermove", onMove);
			el.removeEventListener("pointerup", endDrag);
			el.removeEventListener("lostpointercapture", endDrag);
			cleanupDrag = null;
		};
		cleanupDrag = endDrag;
		el.addEventListener("pointermove", onMove);
		el.addEventListener("pointerup", endDrag);
		el.addEventListener("lostpointercapture", endDrag);
	}
	onBeforeUnmount(() => {
		cleanupDrag?.();
	});
	return {
		handleTrackPointerDown,
		startDrag,
		activeHandle
	};
}
//#endregion
export { useRangeEditor as t };
