import "./rolldown-runtime-xtsTai4I.js";
import { Lt as ref, Wt as toValue } from "./vendor-vue-core-C1utdb0s.js";
import { s as computedAsync } from "./vendor-vueuse-BxKIIsKg.js";
//#region src/composables/useTextFileContent.ts
function useTextFileContent(source) {
	const isLoading = ref(false);
	const hasError = ref(false);
	return {
		textContent: computedAsync(async () => {
			hasError.value = false;
			const { content, url } = toValue(source) ?? {};
			if (content !== void 0) return content;
			if (!url) return "";
			const response = await fetch(url);
			if (!response.ok) {
				hasError.value = true;
				return "";
			}
			return await response.text();
		}, "", {
			evaluating: isLoading,
			onError: () => {
				hasError.value = true;
			}
		}),
		isLoading,
		hasError
	};
}
//#endregion
export { useTextFileContent as t };
