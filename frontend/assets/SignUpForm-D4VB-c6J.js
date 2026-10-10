import "./rolldown-runtime-xtsTai4I.js";
import { _ as toTypedSchema, v as Field, y as useForm } from "./vendor-other-BPEcPQTD.js";
import { $ as mergeProps, Dt as withDirectives, E as withModifiers, Et as withCtx, F as createBaseVNode, G as defineComponent, H as createTextVNode, I as createBlock, It as readonly, Jt as normalizeClass, Kt as unref, L as createCommentVNode, Lt as ref, Mt as isRef, P as computed, Q as mergeModels, R as createElementBlock, St as watch, U as createVNode, Zt as toDisplayString, ft as renderSlot, lt as openBlock, ot as onMounted, rt as onBeforeUnmount, w as vShow, xt as useTemplateRef, yt as useModel } from "./vendor-vue-core-C1utdb0s.js";
import { lt as useTimeoutFn, st as useThrottleFn } from "./vendor-vueuse-BxKIIsKg.js";
import { Lo as useColorPaletteStore, tt as useAuthStore } from "./layoutStore-CZsuzg91.js";
import "./remoteConfig-DwMQrLli.js";
import { r as useI18n } from "./vendor-i18n-BZvE7WBQ.js";
import { t as useFeatureFlags } from "./useFeatureFlags-DAoj_aDd.js";
import { t as cn } from "./src-DI1bBfrb.js";
import { t as Button_default } from "./Button-j0oCzR82.js";
import { t as Input_default } from "./Input-Cx8jjgHK.js";
import { n as FieldError_default, r as Field_default, t as FieldLabel_default } from "./FieldLabel-4kD4Yi7G.js";
import { t as FieldDescription_default } from "./FieldDescription-B1neEBHX.js";
import { r as signUpSchema } from "./signInSchema-COhVh-MP.js";
import { t as PasswordFields_default } from "./PasswordFields-ZEHNFiy2.js";
//#region packages/account-ui/src/auth/regionProbe.ts
/**
* Where the client is, for the sign-up region gate in `./regionGate`. Browser
* APIs only — `fetch`, `navigator`, `performance` — so the package stays free
* of an HTTP client the host would otherwise have to install.
*/
/**
* A CDN implementation detail, not a contract we own. The durable form is a
* first-party endpoint echoing `CF-IPCountry`.
*/
var CLIENT_COUNTRY_URL = "https://cloud.comfy.org/cdn-cgi/trace";
/** Bounds every probe leg; two previously had none. */
var PROBE_TIMEOUT_MS = 2e3;
/** Baidu answering this fast implies a China route. */
var CHINA_LATENCY_MS = 150;
/** `XX` is an unknown country and `T1` is Tor: neither names where the client is. */
var UNRESOLVED_COUNTRIES = /* @__PURE__ */ new Set(["XX", "T1"]);
var parseTraceCountry = (body) => {
	const country = body.split("\n").find((line) => line.startsWith("loc="))?.slice(4).trim().toUpperCase() || void 0;
	return country && UNRESOLVED_COUNTRIES.has(country) ? void 0 : country;
};
/**
* The abort signal alone is not enough: a request the browser never resolves
* nor rejects would hang forever, so the deadline rejects independently.
*
* `read` runs inside the deadline so a response that sends headers and then
* stalls its body is bounded too.
*/
async function fetchWithin(url, init, read) {
	const controller = new AbortController();
	let expire;
	const deadline = new Promise((_, reject) => {
		expire = setTimeout(() => {
			controller.abort();
			reject(/* @__PURE__ */ new Error(`Timed out after ${PROBE_TIMEOUT_MS}ms: ${url}`));
		}, PROBE_TIMEOUT_MS);
	});
	try {
		return await Promise.race([fetch(url, {
			...init,
			signal: controller.signal
		}).then(read), deadline]);
	} finally {
		clearTimeout(expire);
	}
}
/** ISO country from the CDN edge, or `undefined` when it cannot answer. */
async function getClientCountry() {
	try {
		const body = await fetchWithin(CLIENT_COUNTRY_URL, { cache: "no-store" }, async (response) => response.ok ? response.text() : void 0);
		return body === void 0 ? void 0 : parseTraceCountry(body);
	} catch {
		return;
	}
}
var probe = (url) => fetchWithin(url, {
	mode: "no-cors",
	cache: "no-cache"
}, async () => {});
/**
* Fallback for when the edge cannot answer. Unsound both ways: a VPN user in
* China reaches Google, and a `zh-CN` user anywhere is blocked whenever Google
* is briefly unreachable.
*/
async function isInChinaByProbe() {
	const isChineseLocale = navigator.language.toLowerCase().startsWith("zh-cn");
	try {
		await probe("https://www.google.com");
		return false;
	} catch {
		if (isChineseLocale) return true;
		try {
			const start = performance.now();
			await probe("https://www.baidu.com");
			return performance.now() - start < CHINA_LATENCY_MS;
		} catch {
			return isChineseLocale;
		}
	}
}
/**
* Prefers the edge's geo-IP, falling back to the heuristic. Always settles, so
* callers must not add a timeout that could pre-empt a slow but real answer.
*/
async function isInChina() {
	const country = await getClientCountry();
	if (country !== void 0) return country === "CN";
	return isInChinaByProbe();
}
//#endregion
//#region packages/account-ui/src/auth/regionGate.ts
/**
* Gates email sign-up on the client's region. Starts `pending` and always
* leaves it. Do not race this against a timeout: that decides `allowed` while a
* real `blocked` answer is still in flight. The probe runs when the
* component has mounted and `enabled` is true, so a host that gates its
* sign-up form behind a flag never probes for a page it does not show;
* disabling returns to `pending` and re-enabling probes again.
*/
function useRegionGate(enabled = ref(true)) {
	const status = ref("pending");
	let generation = 0;
	onMounted(() => {
		watch(enabled, async (on) => {
			const probeGeneration = ++generation;
			if (!on) {
				status.value = "pending";
				return;
			}
			const blocked = await isInChina().catch(() => false);
			if (probeGeneration !== generation) return;
			status.value = blocked ? "blocked" : "allowed";
		}, { immediate: true });
	});
	return { status: readonly(status) };
}
//#endregion
//#region src/components/ui/field/FieldGroup.vue
var FieldGroup_default = /* @__PURE__ */ defineComponent({
	__name: "FieldGroup",
	props: { class: { type: [
		Boolean,
		null,
		String,
		Object,
		Array
	] } },
	setup(__props) {
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", {
				"data-slot": "field-group",
				class: normalizeClass(unref(cn)("group/field-group @container/field-group flex w-full flex-col gap-7 data-[slot=checkbox-group]:gap-3 *:data-[slot=field-group]:gap-4", __props.class))
			}, [renderSlot(_ctx.$slots, "default")], 2);
		};
	}
});
//#endregion
//#region packages/account-core/src/turnstile.ts
/**
* Clamp an externally-sourced value to a known TurnstileMode. Unknown strings
* (typos, stale flag variants) resolve to 'off' so a bad value can never leave
* the widget rendered-but-unenforced — mirrors the server-side resolver.
*/
function normalizeTurnstileMode(raw) {
	return raw === "shadow" || raw === "enforce" ? raw : "off";
}
/**
* Whether the signup Turnstile widget should render. Purely config-driven: the
* flag must be shadow/enforce and a sitekey must be configured. Hosts that
* resolve no sitekey (OSS / local builds) never render the widget; their
* exemption lives server-side (loopback-IP check in CreateCustomer).
*/
function isTurnstileEnabled(mode, siteKey) {
	return mode !== "off" && siteKey !== "";
}
//#endregion
//#region src/config/turnstile.ts
/**
* Returns the Cloudflare Turnstile sitekey for the current environment.
* - OSS / localhost never renders the cloud widget (server-side loopback
*   exemption covers local signup); in dev it falls back to the always-pass test
*   key so the flow is exercisable locally, otherwise ''.
* - Cloud builds prefer the per-env sitekey delivered via remote config
*   (`turnstile_sitekey`) and fall back to the build-time constant, so the widget
*   still renders during a remote-config gap rather than silently disappearing.
*/
function getTurnstileSiteKey() {
	return "";
}
//#endregion
//#region packages/account-ui/src/auth/turnstileGate.ts
/**
* Submit-gating state for a signup form's Turnstile widget: a token/
* unavailable pair, plus `waiting`, which is true while a real token is still
* needed. Waits in both shadow and enforce mode (`enabled`), not just
* enforce, so shadow mode's token can't race the async Cloudflare
* challenge; falls back open once the widget reports `unavailable` so a
* broken/slow load can never permanently block signup.
*
* `token`/`unavailable` reset on every `enabled` transition, in either
* direction, so state from a previous widget instance can never leak into a
* freshly (re-)rendered one.
*/
function useTurnstileGate(enabled) {
	const token = ref("");
	const unavailable = ref(false);
	const waiting = computed(() => enabled.value && !token.value && !unavailable.value);
	watch(enabled, () => {
		token.value = "";
		unavailable.value = false;
	});
	return {
		token,
		unavailable,
		waiting
	};
}
//#endregion
//#region src/composables/auth/useTurnstile.ts
/**
* Reactive Turnstile state for the signup form.
* - `enabled`: render the widget
* - `enforced`: block submit until the challenge is solved
*
* Binds the shared resolution rules to this app's config sources: the
* signupTurnstileMode feature flag and the per-env sitekey. OSS / local
* builds resolve no sitekey — the real per-env keys are tree-shaken out via
* the __DISTRIBUTION__ build define (see config/turnstile.ts) — so the widget
* never renders there.
*/
function useTurnstile() {
	const { flags } = useFeatureFlags();
	const mode = computed(() => normalizeTurnstileMode(flags.signupTurnstileMode));
	const siteKey = computed(getTurnstileSiteKey);
	const enabled = computed(() => isTurnstileEnabled(mode.value, siteKey.value));
	return {
		mode,
		siteKey,
		enabled,
		enforced: computed(() => enabled.value && mode.value === "enforce")
	};
}
//#endregion
//#region packages/account-core/src/loadExternalScript.ts
/** Keep in sync with packages/shared-frontend-utils/src/loadExternalScript.ts. */
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
//#region packages/account-core/src/turnstileScript.ts
var loadTurnstileScript = createScriptLoader("https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit", () => window.turnstile ?? null);
function loadTurnstile() {
	return loadTurnstileScript();
}
//#endregion
//#region packages/account-ui/src/auth/TurnstileWidget.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1 = { class: "flex flex-col gap-2" };
var TURNSTILE_LOAD_TIMEOUT_MS = 9e3;
//#endregion
//#region packages/account-ui/src/auth/TurnstileWidget.vue
var TurnstileWidget_default$1 = /* @__PURE__ */ defineComponent({
	__name: "TurnstileWidget",
	props: /*@__PURE__*/ mergeModels({
		siteKey: {},
		theme: { default: "auto" },
		expiredMessage: {},
		failedMessage: {},
		errorClass: {},
		loader: {
			type: Function,
			default: loadTurnstile
		}
	}, {
		"token": { default: "" },
		"tokenModifiers": {},
		"unavailable": {
			type: Boolean,
			default: false
		},
		"unavailableModifiers": {}
	}),
	emits: ["update:token", "update:unavailable"],
	setup(__props, { expose: __expose }) {
		const token = useModel(__props, "token");
		/**
		* Set true whenever the widget cannot be relied on to ever produce a token:
		* the Cloudflare script failed to load, the rendered challenge errored out,
		* or it simply hasn't resolved within `TURNSTILE_LOAD_TIMEOUT_MS`. The parent
		* uses this to stop waiting on a token so a broken/slow widget (network
		* issue, ad-blocker, CDN outage) can never permanently block signup.
		*/
		const unavailable = useModel(__props, "unavailable");
		const containerRef = ref();
		const errorMessage = ref("");
		let widgetId;
		/** The API the loader resolved; the one that rendered the widget owns it. */
		let turnstile;
		/** How long to wait for the widget to resolve before falling back. */
		const { start: armTimeout, stop: clearLoadTimeout } = useTimeoutFn(() => {
			unavailable.value = true;
		}, TURNSTILE_LOAD_TIMEOUT_MS, { immediate: false });
		const clearToken = () => {
			token.value = "";
		};
		/**
		* Fetch a fresh challenge and clear the current token.
		*
		* Turnstile tokens are single-use, so after a token is consumed by a submit
		* attempt that did not succeed, the spent token must be discarded and a new
		* challenge requested. Clearing the model re-blocks submission until the user
		* solves the fresh challenge; clearing the error drops any stale failure text
		* so it can't linger over the new challenge.
		*/
		const reset = () => {
			clearToken();
			errorMessage.value = "";
			if (widgetId && turnstile) {
				turnstile.reset(widgetId);
				unavailable.value = false;
				armTimeout();
			}
		};
		__expose({ reset });
		onMounted(async () => {
			armTimeout();
			try {
				turnstile = await __props.loader();
				if (!containerRef.value) return;
				widgetId = turnstile.render(containerRef.value, {
					sitekey: __props.siteKey,
					theme: __props.theme,
					callback: (newToken) => {
						clearLoadTimeout();
						errorMessage.value = "";
						unavailable.value = false;
						token.value = newToken;
					},
					"expired-callback": () => {
						clearToken();
						errorMessage.value = __props.expiredMessage;
						if (widgetId && turnstile) {
							turnstile.reset(widgetId);
							armTimeout();
						}
					},
					"error-callback": () => {
						clearToken();
						clearLoadTimeout();
						console.warn("Turnstile challenge failed");
						errorMessage.value = __props.failedMessage;
						unavailable.value = true;
						if (widgetId && turnstile) turnstile.reset(widgetId);
					}
				});
			} catch (error) {
				clearLoadTimeout();
				console.warn("Turnstile failed to load", error);
				errorMessage.value = __props.failedMessage;
				unavailable.value = true;
			}
		});
		onBeforeUnmount(() => {
			if (widgetId && turnstile) turnstile.remove(widgetId);
		});
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", _hoisted_1, [createBaseVNode("div", {
				ref_key: "containerRef",
				ref: containerRef
			}, null, 512), errorMessage.value ? (openBlock(), createElementBlock("small", {
				key: 0,
				role: "alert",
				"aria-live": "assertive",
				class: normalizeClass(__props.errorClass)
			}, toDisplayString(errorMessage.value), 3)) : createCommentVNode("", true)]);
		};
	}
});
//#endregion
//#region src/components/dialog/content/signin/TurnstileWidget.vue
var TurnstileWidget_default = /* @__PURE__ */ defineComponent({
	__name: "TurnstileWidget",
	props: {
		"token": { default: "" },
		"tokenModifiers": {},
		"unavailable": {
			type: Boolean,
			default: false
		},
		"unavailableModifiers": {}
	},
	emits: ["update:token", "update:unavailable"],
	setup(__props, { expose: __expose }) {
		const token = useModel(__props, "token");
		const unavailable = useModel(__props, "unavailable");
		const { t } = useI18n();
		const colorPaletteStore = useColorPaletteStore();
		const theme = computed(() => colorPaletteStore.completedActivePalette.light_theme ? "light" : "dark");
		const widget = ref();
		__expose({ reset: () => widget.value?.reset() });
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(TurnstileWidget_default$1), {
				ref_key: "widget",
				ref: widget,
				token: token.value,
				"onUpdate:token": _cache[0] || (_cache[0] = ($event) => token.value = $event),
				unavailable: unavailable.value,
				"onUpdate:unavailable": _cache[1] || (_cache[1] = ($event) => unavailable.value = $event),
				"site-key": unref(getTurnstileSiteKey)(),
				theme: theme.value,
				"expired-message": unref(t)("auth.turnstile.expired"),
				"failed-message": unref(t)("auth.turnstile.failed"),
				"error-class": "text-red-500",
				loader: unref(loadTurnstile)
			}, null, 8, [
				"token",
				"unavailable",
				"site-key",
				"theme",
				"expired-message",
				"failed-message",
				"loader"
			]);
		};
	}
});
//#endregion
//#region src/components/dialog/content/signin/SignUpForm.vue
var SignUpForm_default = /* @__PURE__ */ defineComponent({
	__name: "SignUpForm",
	props: {
		fieldClass: { type: [
			Boolean,
			null,
			String,
			Object,
			Array
		] },
		submitClass: { type: [
			Boolean,
			null,
			String,
			Object,
			Array
		] },
		submitVariant: { default: "secondary" },
		submitSize: { default: "lg" }
	},
	emits: ["submit"],
	setup(__props, { expose: __expose, emit: __emit }) {
		const { t } = useI18n();
		const authStore = useAuthStore();
		const loading = computed(() => authStore.loading);
		const { enabled: turnstileEnabled } = useTurnstile();
		const { token: turnstileToken, unavailable: turnstileUnavailable, waiting: waitingForTurnstile } = useTurnstileGate(turnstileEnabled);
		const turnstileWidget = useTemplateRef("turnstileWidget");
		const emit = __emit;
		const { handleSubmit, meta } = useForm({
			validationSchema: toTypedSchema(signUpSchema),
			initialValues: {
				email: "",
				password: "",
				confirmPassword: ""
			}
		});
		const onSubmit = useThrottleFn(handleSubmit((values) => {
			if (waitingForTurnstile.value) return;
			emit("submit", values, turnstileToken.value || void 0);
		}), 1500);
		function resetTurnstile() {
			turnstileWidget.value?.reset();
		}
		__expose({ resetTurnstile });
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("form", {
				class: "flex flex-col gap-6",
				onSubmit: _cache[2] || (_cache[2] = withModifiers((...args) => unref(onSubmit) && unref(onSubmit)(...args), ["prevent"]))
			}, [
				createVNode(FieldGroup_default, null, {
					default: withCtx(() => [createVNode(unref(Field), { name: "email" }, {
						default: withCtx(({ componentField, errors }) => [createVNode(Field_default, { "data-invalid": !!errors.length }, {
							default: withCtx(() => [
								createVNode(FieldLabel_default, { for: "comfy-org-sign-up-email" }, {
									default: withCtx(() => [createTextVNode(toDisplayString(unref(t)("auth.signup.emailLabel")), 1)]),
									_: 1
								}),
								createVNode(Input_default, mergeProps(componentField, {
									id: "comfy-org-sign-up-email",
									autocomplete: "email",
									class: __props.fieldClass,
									type: "email",
									placeholder: unref(t)("auth.signup.emailPlaceholder"),
									"aria-invalid": !!errors.length
								}), null, 16, [
									"class",
									"placeholder",
									"aria-invalid"
								]),
								errors.length ? (openBlock(), createBlock(FieldError_default, {
									key: 0,
									errors
								}, null, 8, ["errors"])) : createCommentVNode("", true)
							]),
							_: 2
						}, 1032, ["data-invalid"])]),
						_: 1
					}), createVNode(PasswordFields_default, { "field-class": __props.fieldClass }, null, 8, ["field-class"])]),
					_: 1
				}),
				unref(turnstileEnabled) ? (openBlock(), createBlock(TurnstileWidget_default, {
					key: 0,
					ref_key: "turnstileWidget",
					ref: turnstileWidget,
					token: unref(turnstileToken),
					"onUpdate:token": _cache[0] || (_cache[0] = ($event) => isRef(turnstileToken) ? turnstileToken.value = $event : null),
					unavailable: unref(turnstileUnavailable),
					"onUpdate:unavailable": _cache[1] || (_cache[1] = ($event) => isRef(turnstileUnavailable) ? turnstileUnavailable.value = $event : null)
				}, null, 8, ["token", "unavailable"])) : createCommentVNode("", true),
				withDirectives(createVNode(FieldDescription_default, {
					id: "comfy-org-sign-up-turnstile-hint",
					role: "status",
					"aria-live": "polite"
				}, {
					default: withCtx(() => [createTextVNode(toDisplayString(unref(t)("auth.turnstile.submitBlockedHint")), 1)]),
					_: 1
				}, 512), [[vShow, unref(waitingForTurnstile)]]),
				createVNode(Button_default, {
					type: "submit",
					variant: __props.submitVariant,
					size: __props.submitSize,
					class: normalizeClass(unref(cn)("mt-4", __props.submitClass)),
					loading: loading.value,
					disabled: !unref(meta).valid || unref(waitingForTurnstile),
					"aria-describedby": unref(waitingForTurnstile) ? "comfy-org-sign-up-turnstile-hint" : void 0
				}, {
					default: withCtx(() => [createTextVNode(toDisplayString(unref(t)("auth.signup.signUpButton")), 1)]),
					_: 1
				}, 8, [
					"variant",
					"size",
					"class",
					"loading",
					"disabled",
					"aria-describedby"
				])
			], 32);
		};
	}
});
//#endregion
export { FieldGroup_default as n, useRegionGate as r, SignUpForm_default as t };
