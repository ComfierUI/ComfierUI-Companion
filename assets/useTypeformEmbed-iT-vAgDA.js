import "./rolldown-runtime-xtsTai4I.js";
import { Lt as ref, P as computed, Wt as toValue } from "./vendor-vue-core-C1utdb0s.js";
import { dt as whenever } from "./vendor-vueuse-BxKIIsKg.js";
import { t as createScriptLoader } from "./loadExternalScript-BQM11osQ.js";
//#region src/platform/surveys/useTypeformEmbed.ts
var TYPEFORM_SRC = "https://embed.typeform.com/next/embed.js";
var VALID_ID_PATTERN = /^[A-Za-z0-9]+$/;
/** Pure validator for Typeform form IDs. Exported so feature sites can
*  gate rendering before mounting the embed container. */
function isTypeformIdValid(id) {
	return !!id && VALID_ID_PATTERN.test(id);
}
var loadTypeformScript = createScriptLoader(TYPEFORM_SRC, () => typeof window.tf?.load === "function" ? window.tf : null);
function ensureScriptLoaded() {
	return loadTypeformScript();
}
/**
* Loads the Typeform embed script on first consumer mount and exposes
* validation + error state for an inline form container. After the
* script is ready, `window.tf.load()` is called each time a new
* container appears so Typeform re-scans for the new `data-tf-widget`
* element — the embed's DOMContentLoaded auto-scan only runs once and
* its MutationObserver does not reliably catch elements added by later
* consumers (e.g. a second popover opening later in the session).
* `load()` with `forceReload: false` is idempotent for already-
* initialized elements.
*/
function useTypeformEmbed(typeformRef, typeformIdInput) {
	const typeformError = ref(false);
	const isValidTypeformId = computed(() => isTypeformIdValid(toValue(typeformIdInput)));
	whenever(typeformRef, async () => {
		try {
			await ensureScriptLoaded();
			const tf = window.tf;
			if (typeof tf?.load !== "function") {
				console.error("Typeform API unavailable after script load");
				typeformError.value = true;
				return;
			}
			tf.load();
		} catch (err) {
			console.error("[useTypeformEmbed]", err);
			typeformError.value = true;
		}
	});
	return {
		typeformError,
		isValidTypeformId
	};
}
//#endregion
export { useTypeformEmbed as n, isTypeformIdValid as t };
