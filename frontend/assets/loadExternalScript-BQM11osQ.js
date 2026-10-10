import "./rolldown-runtime-xtsTai4I.js";
//#region packages/shared-frontend-utils/src/loadExternalScript.ts
var POLL_INTERVAL_MS = 50;
/**
* Returns a singleton loader for an external script. `getReady` should return
* the resolved value when the script's global is available, or `null` when not.
* The returned function caches the in-flight Promise so concurrent callers share
* one load, and resets on failure so a later caller can retry.
*/
function createScriptLoader(src, getReady, timeoutMs = 1e4) {
	let scriptPromise = null;
	return function loadScript() {
		if (scriptPromise) return scriptPromise;
		scriptPromise = new Promise((resolve, reject) => {
			let settled = false;
			let cancelPoll;
			function trySettle(fn) {
				if (settled) return;
				settled = true;
				fn();
			}
			const ready = getReady();
			if (ready !== null) {
				resolve(ready);
				return;
			}
			const existing = document.querySelector(`script[src="${src}"]`);
			function startPoll(onSuccess) {
				const pollId = window.setInterval(() => {
					const value = getReady();
					if (value !== null) {
						window.clearInterval(pollId);
						onSuccess();
						trySettle(() => resolve(value));
					}
				}, POLL_INTERVAL_MS);
				return () => window.clearInterval(pollId);
			}
			if (existing) {
				const timeoutId = window.setTimeout(() => {
					cancelPoll?.();
					trySettle(() => {
						scriptPromise = null;
						reject(/* @__PURE__ */ new Error(`Script load timed out: ${src}`));
					});
				}, timeoutMs);
				cancelPoll = startPoll(() => window.clearTimeout(timeoutId));
				return;
			}
			const scriptEl = document.createElement("script");
			const timeoutId = window.setTimeout(() => {
				cancelPoll?.();
				scriptEl.remove();
				trySettle(() => {
					scriptPromise = null;
					reject(/* @__PURE__ */ new Error(`Script load timed out: ${src}`));
				});
			}, timeoutMs);
			scriptEl.addEventListener("load", () => {
				if (settled) return;
				const value = getReady();
				if (value !== null) {
					window.clearTimeout(timeoutId);
					trySettle(() => resolve(value));
				} else cancelPoll = startPoll(() => window.clearTimeout(timeoutId));
			}, { once: true });
			scriptEl.addEventListener("error", () => {
				window.clearTimeout(timeoutId);
				scriptEl.remove();
				trySettle(() => {
					scriptPromise = null;
					reject(/* @__PURE__ */ new Error(`Script failed to load: ${src}`));
				});
			}, { once: true });
			scriptEl.src = src;
			scriptEl.async = true;
			document.head.appendChild(scriptEl);
		});
		return scriptPromise;
	};
}
//#endregion
export { createScriptLoader as t };
