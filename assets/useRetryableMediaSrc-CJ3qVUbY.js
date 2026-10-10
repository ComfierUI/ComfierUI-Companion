import "./rolldown-runtime-xtsTai4I.js";
import { It as readonly, Lt as ref, St as watch, Wt as toValue, et as nextTick } from "./vendor-vue-core-C1utdb0s.js";
import { lt as useTimeoutFn } from "./vendor-vueuse-BxKIIsKg.js";
//#region src/composables/media/useRetryableMediaSrc.ts
var RETRY_DELAYS_MS = [
	500,
	1e3,
	2e3,
	4e3,
	8e3
];
function useRetryableMediaSrc(source) {
	const src = ref();
	const status = ref("idle");
	let retriesUsed = 0;
	let generation = 0;
	const nextDelay = ref(RETRY_DELAYS_MS[0]);
	const reload = async () => {
		const gen = ++generation;
		src.value = void 0;
		await nextTick();
		if (gen !== generation) return;
		src.value = toValue(source);
		status.value = "loading";
	};
	const { start, stop } = useTimeoutFn(reload, nextDelay, { immediate: false });
	const bind = (url) => {
		stop();
		generation++;
		retriesUsed = 0;
		src.value = url;
		status.value = url ? "loading" : "idle";
	};
	const onError = () => {
		if (status.value !== "loading") return;
		if (retriesUsed >= RETRY_DELAYS_MS.length) {
			status.value = "failed";
			return;
		}
		nextDelay.value = RETRY_DELAYS_MS[retriesUsed];
		retriesUsed++;
		status.value = "retrying";
		start();
	};
	const retry = () => {
		if (status.value === "idle") return;
		stop();
		retriesUsed = 0;
		status.value = "retrying";
		reload();
	};
	watch(() => toValue(source), bind, {
		immediate: true,
		flush: "sync"
	});
	return {
		src: readonly(src),
		status: readonly(status),
		onError,
		retry
	};
}
//#endregion
export { useRetryableMediaSrc as t };
