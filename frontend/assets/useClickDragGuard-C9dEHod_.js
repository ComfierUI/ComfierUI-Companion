import "./rolldown-runtime-xtsTai4I.js";
//#region src/composables/useClickDragGuard.ts
function squaredDistance(a, b) {
	const dx = a.x - b.x;
	const dy = a.y - b.y;
	return dx * dx + dy * dy;
}
function exceedsClickThreshold(start, end, threshold) {
	return squaredDistance(start, end) > threshold * threshold;
}
function useClickDragGuard(threshold = 5) {
	let start = null;
	function recordStart(e) {
		start = {
			x: e.clientX,
			y: e.clientY
		};
	}
	function wasDragged(e) {
		if (!start) return false;
		return exceedsClickThreshold(start, {
			x: e.clientX,
			y: e.clientY
		}, threshold);
	}
	function reset() {
		start = null;
	}
	return {
		recordStart,
		wasDragged,
		reset
	};
}
//#endregion
export { useClickDragGuard as n, exceedsClickThreshold as t };
