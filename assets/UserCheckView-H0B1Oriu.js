import "./rolldown-runtime-xtsTai4I.js";
import { Et as withCtx, F as createBaseVNode, G as defineComponent, H as createTextVNode, I as createBlock, Kt as unref, Lt as ref, O as Fragment, P as computed, R as createElementBlock, U as createVNode, Zt as toDisplayString, dt as renderList, et as nextTick, l as useRouter, lt as openBlock } from "./vendor-vue-core-C1utdb0s.js";
import { p as useAsyncState } from "./vendor-vueuse-BxKIIsKg.js";
import { tt as useAuthStore, vu as useErrorHandling } from "./layoutStore-CZsuzg91.js";
import { t as useFeatureFlags } from "./useFeatureFlags-DAoj_aDd.js";
import { t as Button_default } from "./Button-j0oCzR82.js";
import { u as script } from "./vendor-primevue-C3d0HJ53.js";
import { t as Spinner_default } from "./Spinner-B79hMIoc.js";
import { n as getUserCloudStatus, t as getSurveyCompletedStatus } from "./auth-BShkAyQ4.js";
//#region src/platform/cloud/onboarding/skeletons/CloudLoginViewSkeleton.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1$2 = { class: "flex h-full items-center justify-center p-8" };
var _hoisted_2$2 = { class: "max-w-[100vw] lg:w-96" };
var _hoisted_3$2 = { class: "rounded-lg bg-charcoal-500 p-4" };
var _hoisted_4$2 = { class: "mt-6 mb-8 flex flex-col gap-4" };
var _hoisted_5$1 = { class: "flex items-center" };
var _hoisted_6 = { class: "mb-8" };
var _hoisted_7 = { class: "my-8 flex items-center" };
var _hoisted_8 = { class: "flex flex-col gap-6" };
var _hoisted_9 = { class: "mt-5" };
//#endregion
//#region src/platform/cloud/onboarding/skeletons/CloudLoginViewSkeleton.vue
var CloudLoginViewSkeleton_default = /* @__PURE__ */ defineComponent({
	__name: "CloudLoginViewSkeleton",
	setup(__props) {
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", _hoisted_1$2, [createBaseVNode("div", _hoisted_2$2, [
				createBaseVNode("div", _hoisted_3$2, [
					createVNode(unref(script), {
						width: "60%",
						height: "1.125rem",
						class: "mb-2"
					}),
					createVNode(unref(script), {
						width: "90%",
						height: "1rem",
						class: "mb-2"
					}),
					createVNode(unref(script), {
						width: "80%",
						height: "1rem"
					})
				]),
				createBaseVNode("div", _hoisted_4$2, [createVNode(unref(script), {
					width: "45%",
					height: "1.5rem",
					class: "my-0"
				}), createBaseVNode("div", _hoisted_5$1, [createVNode(unref(script), {
					width: "25%",
					height: "1rem",
					class: "mr-1"
				}), createVNode(unref(script), {
					width: "20%",
					height: "1rem"
				})])]),
				createBaseVNode("div", _hoisted_6, [
					createVNode(unref(script), {
						width: "20%",
						height: "1rem",
						class: "mb-2"
					}),
					createVNode(unref(script), {
						width: "100%",
						height: "2.5rem",
						class: "mb-4"
					}),
					createVNode(unref(script), {
						width: "25%",
						height: "1rem",
						class: "mb-4"
					}),
					createVNode(unref(script), {
						width: "100%",
						height: "2.5rem",
						class: "mb-6"
					}),
					createVNode(unref(script), {
						width: "80%",
						height: "1rem",
						class: "mb-4"
					}),
					createVNode(unref(script), {
						width: "100%",
						height: "2.5rem"
					})
				]),
				createBaseVNode("div", _hoisted_7, [
					_cache[0] || (_cache[0] = createBaseVNode("div", { class: "flex-1 border-t border-gray-300" }, null, -1)),
					createVNode(unref(script), {
						width: "30%",
						height: "1rem",
						class: "mx-4"
					}),
					_cache[1] || (_cache[1] = createBaseVNode("div", { class: "flex-1 border-t border-gray-300" }, null, -1))
				]),
				createBaseVNode("div", _hoisted_8, [createVNode(unref(script), {
					width: "100%",
					height: "2.5rem"
				}), createVNode(unref(script), {
					width: "100%",
					height: "2.5rem"
				})]),
				createBaseVNode("div", _hoisted_9, [createVNode(unref(script), {
					width: "70%",
					height: "0.875rem"
				})])
			])]);
		};
	}
});
//#endregion
//#region src/platform/cloud/onboarding/skeletons/CloudSurveyViewSkeleton.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1$1 = { class: "flex min-h-[638px] min-w-[320px] flex-col" };
var _hoisted_2$1 = { class: "flex flex-1 flex-col p-0" };
var _hoisted_3$1 = { class: "flex min-h-full flex-1 flex-col justify-between" };
var _hoisted_4$1 = { class: "flex flex-col gap-6" };
var _hoisted_5 = { class: "flex justify-between pt-4" };
//#endregion
//#region src/platform/cloud/onboarding/skeletons/CloudSurveyViewSkeleton.vue
var CloudSurveyViewSkeleton_default = /* @__PURE__ */ defineComponent({
	__name: "CloudSurveyViewSkeleton",
	setup(__props) {
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", null, [createBaseVNode("div", _hoisted_1$1, [createVNode(unref(script), {
				width: "100%",
				height: "0.5rem",
				class: "mb-8"
			}), createBaseVNode("div", _hoisted_2$1, [createBaseVNode("div", _hoisted_3$1, [createBaseVNode("div", null, [createVNode(unref(script), {
				width: "70%",
				height: "1.75rem",
				class: "mb-8"
			}), createBaseVNode("div", _hoisted_4$1, [(openBlock(), createElementBlock(Fragment, null, renderList(5, (i) => {
				return createBaseVNode("div", {
					key: i,
					class: "flex items-center gap-3"
				}, [createVNode(unref(script), {
					width: "1.25rem",
					height: "1.25rem",
					shape: "circle"
				}), createVNode(unref(script), {
					width: "85%",
					height: "0.875rem"
				})]);
			}), 64))])]), createBaseVNode("div", _hoisted_5, [_cache[0] || (_cache[0] = createBaseVNode("span", null, null, -1)), createVNode(unref(script), {
				width: "100%",
				height: "2.5rem"
			})])])])])]);
		};
	}
});
//#endregion
//#region src/platform/cloud/onboarding/UserCheckView.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1 = {
	key: 2,
	class: "flex h-full items-center justify-center p-8"
};
var _hoisted_2 = { class: "max-w-[100vw] p-2 text-center lg:w-96" };
var _hoisted_3 = { class: "mb-4 text-red-500" };
var _hoisted_4 = {
	key: 3,
	class: "flex items-center justify-center"
};
//#endregion
//#region src/platform/cloud/onboarding/UserCheckView.vue
var UserCheckView_default = /* @__PURE__ */ defineComponent({
	__name: "UserCheckView",
	setup(__props) {
		const router = useRouter();
		const { wrapWithErrorHandlingAsync } = useErrorHandling();
		const { flags } = useFeatureFlags();
		const onboardingSurveyEnabled = computed(() => flags.onboardingSurveyEnabled ?? true);
		const skeletonType = ref("loading");
		const { isLoading, error, execute: checkUserStatus } = useAsyncState(wrapWithErrorHandlingAsync(async () => {
			await nextTick();
			if (!onboardingSurveyEnabled.value) {
				await router.replace({ path: "/" });
				return;
			}
			const [cloudUserStats, surveyStatus] = await Promise.all([getUserCloudStatus(), getSurveyCompletedStatus(useAuthStore().userId)]);
			if (!cloudUserStats) {
				skeletonType.value = "login";
				await router.replace({ name: "cloud-login" });
				return;
			}
			if (!surveyStatus) {
				skeletonType.value = "survey";
				await router.replace({ name: "cloud-survey" });
				return;
			}
			globalThis.location.href = "/";
		}), null, { resetOnExecute: false });
		const errorMessage = computed(() => {
			if (!error.value) return "";
			const errorStr = error.value.toString().toLowerCase();
			if (errorStr.includes("network") || errorStr.includes("fetch")) return "Connection problem. Please check your internet connection.";
			if (errorStr.includes("timeout")) return "Request timed out. Please try again.";
			return "Unable to check account status. Please try again.";
		});
		const isRetrying = computed(() => isLoading.value && !!error.value);
		const handleRetry = async () => {
			await checkUserStatus();
		};
		return (_ctx, _cache) => {
			return skeletonType.value === "login" ? (openBlock(), createBlock(CloudLoginViewSkeleton_default, { key: 0 })) : skeletonType.value === "survey" ? (openBlock(), createBlock(CloudSurveyViewSkeleton_default, { key: 1 })) : unref(error) ? (openBlock(), createElementBlock("div", _hoisted_1, [createBaseVNode("div", _hoisted_2, [createBaseVNode("p", _hoisted_3, toDisplayString(errorMessage.value), 1), createVNode(Button_default, {
				loading: isRetrying.value,
				class: "w-full",
				onClick: handleRetry
			}, {
				default: withCtx(() => [createTextVNode(toDisplayString(isRetrying.value ? _ctx.$t("cloudOnboarding.retrying") : _ctx.$t("cloudOnboarding.retry")), 1)]),
				_: 1
			}, 8, ["loading"])])])) : (openBlock(), createElementBlock("div", _hoisted_4, [createVNode(Spinner_default, { class: "size-8" })]));
		};
	}
});
//#endregion
export { UserCheckView_default as default };
