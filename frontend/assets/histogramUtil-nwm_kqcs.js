import "./rolldown-runtime-xtsTai4I.js";
//#region src/utils/histogramUtil.ts
/**
* Convert a histogram (arbitrary number of bins) into an SVG path string.
* Applies square-root scaling and normalizes using the 99.5th percentile
* to avoid outlier spikes.
*/
function histogramToPath(histogram) {
	const len = histogram.length;
	if (len === 0) return "";
	const sqrtValues = new Float32Array(len);
	for (let i = 0; i < len; i++) sqrtValues[i] = Math.sqrt(histogram[i]);
	const max = Array.from(sqrtValues).sort((a, b) => a - b)[Math.floor((len - 1) * .995)];
	if (max === 0) return "";
	const invMax = 1 / max;
	const lastIdx = len - 1;
	const parts = ["M0,1"];
	for (let i = 0; i < len; i++) {
		const x = lastIdx === 0 ? .5 : i / lastIdx;
		const y = 1 - Math.min(1, sqrtValues[i] * invMax);
		parts.push(`L${x},${y}`);
	}
	parts.push("L1,1 Z");
	return parts.join(" ");
}
//#endregion
export { histogramToPath as t };
