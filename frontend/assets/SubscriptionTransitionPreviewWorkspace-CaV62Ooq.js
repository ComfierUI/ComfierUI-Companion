const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./dialogService-BzdVxI_V.js","./layoutStore-CZsuzg91.js","./rolldown-runtime-xtsTai4I.js","./vendor-datadog-DudeEV66.js","./vendor-other-BPEcPQTD.js","./vendor-three-DQpYrwAh.js","./vendor-vue-core-C1utdb0s.js","./vendor-zod-TMj9Wsdv.js","./vendor-tiptap-BT_4t92m.js","./requestAuth-YeU5GIXc.js","./vendor-vueuse-BxKIIsKg.js","./telemetry-IkzvF0TI.js","./api-Bt-fGt5a.js","./zod.gen-C09SPgBJ.js","./vendor-axios-QnwcNXlY.js","./vendor-sentry-zSXGkMPN.js","./reportError-LG-zfbNw.js","./hostTelemetryEnabled-BZ3GL1Cu.js","./remoteConfig-DwMQrLli.js","./vendor-firebase-B37L--zT.js","./toastStore-CTfykAzG.js","./types-t0xJOOCt.js","./desktopHostSession-IrokPizE.js","./vendor-i18n-BZvE7WBQ.js","./i18n-C3J-ToPr.js","./formatUtil-DuxXRy1z.js","./commands-BcZ6fU3-.js","./main-BfqkkuXX.js","./nodeDefs-CFOSmIZi.js","./settings-B3DInspu.js","./comfyApi-CYSC9hA6.js","./types-ColLjFnz.js","./useFeatureFlags-DAoj_aDd.js","./dialog.variants-PsJk1wgr.js","./ssoRequired-BkQMvdnz.js","./dialogStore-B0GYyals.js","./DialogPortal-B3D-ZhO6.js","./vendor-reka-ui-tdehH9A1.js","./src-DI1bBfrb.js","./Button-j0oCzR82.js","./refreshRemoteConfig-D9UzqP0h.js","./vendor-primevue-C3d0HJ53.js","./systemStatsStore-3gc4cifl.js","./useImageQuiet-Ded8W_Zd.js","./vendor-markdown-CtxqRwKg.js","./useModalLiftedZIndex-BuehUvPe.js","./NumberFieldInput-CILJZ6M6.js","./colorUtil-BzdMMd-Y.js","./vendor-yjs-D9X62SBd.js","./markdownRendererUtil-6g3t5X63.js","./downloadUtil-Bysc7OZ_.js","./SingleSelect-CS2DGZzk.js","./widgetTypes-CisWqKm9.js","./Switch-BAw3-YcG.js","./Input-Cx8jjgHK.js","./SelectValue-BYMnIcxq.js","./Loader-CwKhrtFX.js","./_plugin-vue_export-helper-DEKQMRQ4.js","./creditsUtil-BWj6bywK.js","./useExternalLink-CXT6uu6Z.js","./envUtil-2Z8ainL3.js","./vendor-other-DODGPXtn.css","./layoutStore-Nbgrgm8u.css"])))=>i.map(i=>d[i]);
import "./rolldown-runtime-xtsTai4I.js";
import { a as __vitePreload } from "./vendor-datadog-DudeEV66.js";
import { R as loadStripe } from "./vendor-other-BPEcPQTD.js";
import { C as vModelText, Dt as withDirectives, E as withModifiers, Et as withCtx, F as createBaseVNode, G as defineComponent, H as createTextVNode, I as createBlock, Jt as normalizeClass, Kt as unref, L as createCommentVNode, Lt as ref, O as Fragment, P as computed, Pt as onScopeDispose, Q as mergeModels, R as createElementBlock, St as watch, U as createVNode, Zt as toDisplayString, b as vModelCheckbox, dt as renderList, et as nextTick, ft as renderSlot, lt as openBlock, ot as onMounted, rt as onBeforeUnmount, vt as useId, yt as useModel } from "./vendor-vue-core-C1utdb0s.js";
import { $n as resolveEntrySource, Ar as toTierKey, Fn as savePendingSubscriptionCheckout, Gl as workspaceApi, In as useBillingOperationStore, Jn as SettledOperationError, Lo as useColorPaletteStore, Mn as openHostedBillingTab, On as useBillingContext, Pn as clearPendingSubscriptionCheckoutIfTerminal, Qn as resolveCheckoutJourney, Sr as getTierCredits, Wl as useTeamWorkspaceStore, Xn as getActiveCheckoutJourney, Yn as bindOperationToCheckoutJourney, Zn as resolveCheckoutAssignment, ar as registerRefreshOnReturn, at as useCheckoutJourneyExit, ir as createBillingPortalReporter, it as trackCheckoutJourneyPhase, jn as useSubscriptionRail, lr as categorizeBillingApiError, nr as resolveStripePublishableKey, qn as useBillingReadRail, rr as readOnRail, rt as handOffCheckoutJourney, tr as useBillingCapabilities, tt as useAuthStore, ur as useBillingRouting, wr as getTierPrice, zn as useWorkspaceUI } from "./layoutStore-CZsuzg91.js";
import { n as useTelemetry } from "./telemetry-IkzvF0TI.js";
import { i as api } from "./api-Bt-fGt5a.js";
import { n as reportError } from "./reportError-LG-zfbNw.js";
import { r as useI18n } from "./vendor-i18n-BZvE7WBQ.js";
import { r as getComfyPlatformBaseUrl } from "./comfyApi-CYSC9hA6.js";
import { H as SelectRoot_default, I as SelectPortal_default, L as SelectItemText_default, M as SelectValue_default, N as SelectTrigger_default, R as SelectItemIndicator_default, V as SelectContent_default, j as SelectViewport_default, z as SelectItem_default } from "./vendor-reka-ui-tdehH9A1.js";
import { t as cn } from "./src-DI1bBfrb.js";
import { n as buttonVariants, t as Button_default } from "./Button-j0oCzR82.js";
import { f as useToast } from "./vendor-primevue-C3d0HJ53.js";
import { a as selectContentClass, d as stopEscapeToDocument, l as selectItemVariants, s as selectDropdownClass, u as selectTriggerVariants } from "./SingleSelect-CS2DGZzk.js";
import { i as paymentReturnUrl } from "./paymentReturnUrl-bUoRS0fe.js";
import { t as InviteMembersForm_default } from "./InviteMembersForm-C3A0-ikF.js";
//#region packages/account-ui/src/billing/checkout/checkoutQuote.ts
function isAnnualDuration(duration) {
	return duration === "ANNUAL";
}
/**
* The preview's resolved plan duration wins; absent a preview (fresh subscribe
* with no proration) it falls back to the user's selected billing cycle.
*/
function isYearlyCheckout(planDuration, billingCycle) {
	return planDuration !== void 0 ? isAnnualDuration(planDuration) : billingCycle === "yearly";
}
var LEGACY_QUOTE_CURRENCY = "usd";
function formatQuoteMoney(cents, currency, locale) {
	if (!currency) return "";
	return new Intl.NumberFormat(locale, {
		style: "currency",
		currency: currency.toUpperCase()
	}).format(cents / 100);
}
/** Locale-grouped number, as the host's i18n `n()` prints one. */
function formatNumber(value, locale) {
	return new Intl.NumberFormat(locale).format(value);
}
/** Two-decimal display without a currency symbol; the template adds `$`. */
function formatUsdFromCents(cents, locale) {
	return new Intl.NumberFormat(locale, {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2
	}).format(cents / 100);
}
function resolveQuoteMoney(exactCents, exactCurrency, legacyCents) {
	return exactCents === void 0 ? {
		cents: legacyCents,
		currency: LEGACY_QUOTE_CURRENCY
	} : {
		cents: exactCents,
		currency: exactCurrency
	};
}
function resolveAmountDueToday(preview) {
	return resolveQuoteMoney(preview.amount_due_cents, preview.currency, preview.cost_today_cents);
}
function amountDueTodayChanged(installed, refreshed) {
	const before = resolveAmountDueToday(installed);
	const after = resolveAmountDueToday(refreshed);
	return before.cents !== after.cents || before.currency !== after.currency;
}
function formatAmountDueToday(preview, locale) {
	const { cents, currency } = resolveAmountDueToday(preview);
	return formatQuoteMoney(cents, currency, locale);
}
function formatRenewalAmount(preview, locale) {
	const { cents, currency } = resolveQuoteMoney(preview.renewal_amount_cents, preview.currency, preview.cost_next_period_cents);
	return formatQuoteMoney(cents, currency, locale);
}
function resolveRenewalDate(preview) {
	return preview.renewal_at ?? preview.new_plan.period_end;
}
//#endregion
//#region packages/account-ui/src/billing/stripe/StripePaymentForm.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1$14 = {
	key: 0,
	class: "flex items-start justify-between gap-4"
};
var _hoisted_2$12 = ["id"];
var _hoisted_3$9 = { class: "m-0 mt-1 max-w-md text-sm text-muted-foreground" };
var _hoisted_4$8 = {
	key: 1,
	class: "rounded-lg border border-destructive-background bg-destructive-background/10 px-3 py-2 text-sm text-destructive-background"
};
var _hoisted_5$6 = [
	"aria-labelledby",
	"aria-label",
	"inert"
];
var _hoisted_6$4 = { class: "flex flex-col gap-3" };
var _hoisted_7$4 = {
	key: 0,
	class: "flex items-start gap-3 rounded-xl bg-base-background/60 px-4 py-3 text-xs text-muted-foreground"
};
var _hoisted_8$4 = { class: "m-0" };
//#endregion
//#region packages/account-ui/src/billing/stripe/StripePaymentForm.vue
var StripePaymentForm_default = /* @__PURE__ */ defineComponent({
	__name: "StripePaymentForm",
	props: {
		publishableKey: {},
		amountCents: {},
		currency: {},
		copy: {},
		paymentMethodConfigurationId: { default: "" },
		isLoading: {
			type: Boolean,
			default: false
		},
		verificationPending: {
			type: Boolean,
			default: false
		},
		canSubmit: {
			type: Boolean,
			default: true
		},
		locked: {
			type: Boolean,
			default: false
		},
		themeKey: { default: "" },
		pageLayout: {
			type: Boolean,
			default: false
		}
	},
	emits: [
		"confirm",
		"submittingChange",
		"phase"
	],
	setup(__props, { emit: __emit }) {
		/**
		* The provider-bound half of checkout: mounts Stripe's Payment and Address
		* Elements, validates them, and turns them into a confirmation token the
		* caller hands to `subscribe`. Everything host-shaped arrives as an input —
		* the publishable key, the copy, the pay button through the `submit` slot —
		* and every observation leaves as a `phase` event, so the package chooses no
		* design system, no i18n runtime and no telemetry sink.
		*/
		const emit = __emit;
		const headingId = useId();
		let isUnmounted = false;
		function reportPhase(phase) {
			if (isUnmounted) return;
			emit("phase", phase);
		}
		const paymentElementTarget = ref();
		const addressElementTarget = ref();
		const stripeElements = ref();
		const configurationError = ref("");
		const isSubmitting = ref(false);
		const selectedMethodType = ref("");
		let stripe = null;
		let paymentElement;
		let addressElement;
		const submitDisabled = computed(() => !stripeElements.value || !__props.canSubmit || __props.verificationPending);
		const submitBlocked = computed(() => submitDisabled.value || isSubmitting.value || __props.isLoading);
		function failElementInit() {
			configurationError.value = __props.copy.unavailable;
			reportPhase({
				phase: "payment_element_failed",
				element: "payment",
				element_phase: "init"
			});
		}
		function failSubmit(submitPhase, error) {
			configurationError.value = error?.message ?? __props.copy.genericError;
			reportPhase({
				phase: "payment_submit_failed",
				submit_phase: submitPhase,
				...error?.code && { error_code: error.code }
			});
		}
		function mountPaymentElement(elements, target) {
			paymentElement = elements.create("payment", {
				layout: {
					type: "accordion",
					defaultCollapsed: false,
					radios: "always",
					spacedAccordionItems: true
				},
				fields: { billingDetails: { address: "never" } },
				terms: { card: "never" }
			});
			paymentElement.mount(target);
			paymentElement.on("ready", () => {
				reportPhase({
					phase: "payment_element_ready",
					element: "payment"
				});
			});
			paymentElement.on("loaderror", (event) => {
				reportPhase({
					phase: "payment_element_failed",
					element: "payment",
					element_phase: "mount",
					...event.error?.code && { error_code: event.error.code }
				});
			});
			paymentElement.on("change", (event) => {
				selectedMethodType.value = event.value?.type ?? "";
			});
		}
		/**
		* A full billing address feeds AVS to the issuer and Radar. In billing mode
		* every field is required, and because the address shares the Payment
		* Element's group, createConfirmationToken folds it into the token's
		* billing_details.
		*/
		function mountAddressElement(elements, target) {
			addressElement = elements.create("address", { mode: "billing" });
			addressElement.mount(target);
			addressElement.on("ready", () => {
				reportPhase({
					phase: "payment_element_ready",
					element: "address"
				});
			});
			addressElement.on("loaderror", (event) => {
				reportPhase({
					phase: "payment_element_failed",
					element: "address",
					element_phase: "mount",
					...event.error?.code && { error_code: event.error.code }
				});
			});
		}
		onMounted(async () => {
			if (!__props.publishableKey || !__props.paymentMethodConfigurationId) {
				failElementInit();
				return;
			}
			if (__props.amountCents <= 0) return;
			try {
				stripe = await loadStripe(__props.publishableKey);
			} catch {
				failElementInit();
				return;
			}
			if (!stripe || !paymentElementTarget.value || isUnmounted) {
				failElementInit();
				return;
			}
			stripeElements.value = stripe.elements({
				mode: "subscription",
				amount: __props.amountCents,
				currency: __props.currency.toLowerCase(),
				setupFutureUsage: "off_session",
				paymentMethodConfiguration: __props.paymentMethodConfigurationId,
				appearance: resolveAppearance(paymentElementTarget.value)
			});
			mountPaymentElement(stripeElements.value, paymentElementTarget.value);
			if (addressElementTarget.value) mountAddressElement(stripeElements.value, addressElementTarget.value);
		});
		watch([() => __props.amountCents, () => __props.currency], ([amount, nextCurrency]) => {
			if (!stripeElements.value || amount <= 0) return;
			stripeElements.value.update({
				amount,
				currency: nextCurrency.toLowerCase()
			}).catch(() => {
				if (isUnmounted) return;
				configurationError.value = __props.copy.genericError;
				reportPhase({
					phase: "payment_element_failed",
					element: "payment",
					element_phase: "update"
				});
			});
		});
		watch(() => __props.themeKey, () => {
			if (!stripeElements.value || !paymentElementTarget.value) return;
			stripeElements.value.update({ appearance: resolveAppearance(paymentElementTarget.value) }).catch(() => {
				reportPhase({
					phase: "payment_element_failed",
					element: "payment",
					element_phase: "update"
				});
			});
		}, { flush: "post" });
		onBeforeUnmount(() => {
			isUnmounted = true;
			paymentElement?.destroy();
			addressElement?.destroy();
		});
		async function mintConfirmationToken(elements, client) {
			let submitResult;
			try {
				submitResult = await elements.submit();
			} catch {
				failSubmit("validation");
				return;
			}
			if (submitResult.error) {
				failSubmit("validation", submitResult.error);
				return;
			}
			const result = await client.createConfirmationToken({ elements });
			if (result.error) {
				failSubmit("token_creation", result.error);
				return;
			}
			return {
				id: result.confirmationToken.id,
				paymentMethodType: result.confirmationToken.payment_method_preview.type
			};
		}
		async function submit() {
			if (submitBlocked.value || !stripeElements.value || !stripe) return;
			isSubmitting.value = true;
			emit("submittingChange", true);
			configurationError.value = "";
			reportPhase({ phase: "payment_submit_attempted" });
			try {
				const confirmationToken = await mintConfirmationToken(stripeElements.value, stripe);
				if (confirmationToken && !isUnmounted) emit("confirm", confirmationToken.id, confirmationToken.paymentMethodType);
			} catch {
				failSubmit("token_creation");
			} finally {
				isSubmitting.value = false;
				if (!isUnmounted) emit("submittingChange", false);
			}
		}
		/**
		* Stripe takes appearance as concrete values, so every token is resolved
		* against the form's own theme root, where the host's theme class applies.
		*/
		function resolveAppearance(themeRoot) {
			const resolveThemeColor = (variable) => resolveColorIn(themeRoot, variable);
			return {
				variables: {
					colorPrimary: resolveThemeColor("--base-foreground"),
					colorBackground: resolveThemeColor("--base-background"),
					colorText: resolveThemeColor("--base-foreground"),
					colorTextSecondary: resolveThemeColor("--muted-foreground"),
					colorDanger: resolveThemeColor("--destructive-background"),
					colorSuccess: resolveThemeColor("--primary-background"),
					fontFamily: getComputedStyle(themeRoot).fontFamily,
					borderRadius: "10px",
					spacingUnit: "5px"
				},
				rules: {
					".AccordionItem": {
						backgroundColor: resolveThemeColor("--base-background"),
						border: "1px solid transparent",
						boxShadow: "none"
					},
					".AccordionItem--selected": { borderColor: resolveThemeColor("--base-foreground") },
					".Input": {
						backgroundColor: resolveThemeColor("--input-surface"),
						borderColor: resolveThemeColor("--border-default"),
						boxShadow: "none"
					},
					".Input:focus": {
						borderColor: resolveThemeColor("--primary-background"),
						boxShadow: `0 0 0 1px ${resolveThemeColor("--primary-background")}`
					},
					".Label": { fontWeight: "500" }
				}
			};
		}
		function resolveColorIn(themeRoot, variable) {
			const probe = document.createElement("span");
			probe.style.color = `var(${variable})`;
			themeRoot.append(probe);
			const color = getComputedStyle(probe).color;
			probe.remove();
			return color;
		}
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("form", {
				class: "flex min-h-0 flex-col gap-6 xl:flex-1",
				onSubmit: withModifiers(submit, ["prevent"])
			}, [
				!__props.pageLayout ? (openBlock(), createElementBlock("div", _hoisted_1$14, [createBaseVNode("div", null, [createBaseVNode("h3", {
					id: unref(headingId),
					class: "m-0 text-base font-semibold text-base-foreground"
				}, toDisplayString(__props.copy.paymentMethod), 9, _hoisted_2$12), createBaseVNode("p", _hoisted_3$9, toDisplayString(__props.copy.methodChoice), 1)])])) : createCommentVNode("", true),
				configurationError.value ? (openBlock(), createElementBlock("div", _hoisted_4$8, toDisplayString(configurationError.value), 1)) : createCommentVNode("", true),
				createBaseVNode("div", {
					role: "group",
					"aria-labelledby": __props.pageLayout ? void 0 : unref(headingId),
					"aria-label": __props.pageLayout ? __props.copy.paymentMethod : void 0,
					inert: __props.locked,
					class: "flex flex-col gap-6 xl:min-h-0 xl:flex-1 xl:overflow-x-hidden xl:overflow-y-auto xl:pr-1"
				}, [
					createBaseVNode("div", {
						ref_key: "paymentElementTarget",
						ref: paymentElementTarget
					}, null, 512),
					createBaseVNode("div", _hoisted_6$4, [createBaseVNode("h4", { class: normalizeClass(unref(cn)("m-0 text-base-foreground", __props.pageLayout ? "text-base font-normal" : "text-sm font-medium")) }, toDisplayString(__props.copy.billingAddress), 3), createBaseVNode("div", {
						ref_key: "addressElementTarget",
						ref: addressElementTarget
					}, null, 512)]),
					selectedMethodType.value === "alipay" ? (openBlock(), createElementBlock("div", _hoisted_7$4, [_cache[0] || (_cache[0] = createBaseVNode("i", { class: "mt-0.5 icon-[lucide--shield-check] size-4 shrink-0 text-(--success-foreground)" }, null, -1)), createBaseVNode("p", _hoisted_8$4, toDisplayString(__props.copy.alipayRenewalNote), 1)])) : createCommentVNode("", true)
				], 8, _hoisted_5$6),
				renderSlot(_ctx.$slots, "submit", {
					disabled: submitDisabled.value,
					loading: __props.isLoading || isSubmitting.value,
					verificationPending: __props.verificationPending
				})
			], 32);
		};
	}
});
//#endregion
//#region packages/account-ui/src/billing/checkout/CheckoutButton.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1$13 = [
	"type",
	"disabled",
	"aria-busy"
];
var _hoisted_2$11 = {
	key: 0,
	class: "pi pi-spin pi-spinner",
	"aria-hidden": "true"
};
var _hoisted_3$8 = {
	key: 1,
	class: "sr-only"
};
//#endregion
//#region packages/account-ui/src/billing/checkout/CheckoutButton.vue
var CheckoutButton_default = /* @__PURE__ */ defineComponent({
	__name: "CheckoutButton",
	props: {
		type: { default: "button" },
		variant: {},
		size: {},
		class: {
			type: [
				Boolean,
				null,
				String,
				Object,
				Array
			],
			default: ""
		},
		loading: {
			type: Boolean,
			default: false
		},
		disabled: {
			type: Boolean,
			default: false
		}
	},
	setup(__props) {
		/**
		* The cloud app's Button, as a native button: same variant classes, same
		* loading treatment (spinner with the label kept for screen readers).
		*/
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("button", {
				type: __props.type,
				disabled: __props.disabled || __props.loading,
				"aria-busy": __props.loading || void 0,
				class: normalizeClass(unref(cn)(unref(buttonVariants)({
					variant: __props.variant,
					size: __props.size
				}), __props.class))
			}, [__props.loading ? (openBlock(), createElementBlock("i", _hoisted_2$11)) : createCommentVNode("", true), __props.loading ? (openBlock(), createElementBlock("span", _hoisted_3$8, [renderSlot(_ctx.$slots, "default")])) : renderSlot(_ctx.$slots, "default", {}, void 0, void 0, 2)], 10, _hoisted_1$13);
		};
	}
});
//#endregion
//#region packages/account-ui/src/billing/checkout/CheckoutPaymentForm.vue
var CheckoutPaymentForm_default = /* @__PURE__ */ defineComponent({
	__name: "CheckoutPaymentForm",
	props: {
		publishableKey: {},
		amountCents: {},
		currency: {},
		copy: {},
		submitLabel: {},
		paymentMethodConfigurationId: { default: "" },
		isLoading: {
			type: Boolean,
			default: false
		},
		verificationPending: {
			type: Boolean,
			default: false
		},
		canSubmit: {
			type: Boolean,
			default: true
		},
		themeKey: {}
	},
	emits: [
		"confirm",
		"submittingChange",
		"phase"
	],
	setup(__props, { emit: __emit }) {
		/**
		* The payment form with the checkout's pay button: the card entry both the
		* cloud app and billing-web show when no saved method stands in for it.
		*/
		const emit = __emit;
		return (_ctx, _cache) => {
			return openBlock(), createBlock(StripePaymentForm_default, {
				"publishable-key": __props.publishableKey,
				"amount-cents": __props.amountCents,
				currency: __props.currency,
				copy: __props.copy,
				"payment-method-configuration-id": __props.paymentMethodConfigurationId,
				"is-loading": __props.isLoading,
				"verification-pending": __props.verificationPending,
				"can-submit": __props.canSubmit,
				"theme-key": __props.themeKey,
				onConfirm: _cache[0] || (_cache[0] = (token, methodType) => emit("confirm", token, methodType)),
				onSubmittingChange: _cache[1] || (_cache[1] = ($event) => emit("submittingChange", $event)),
				onPhase: _cache[2] || (_cache[2] = ($event) => emit("phase", $event))
			}, {
				submit: withCtx(({ disabled, loading, verificationPending: pending }) => [createVNode(CheckoutButton_default, {
					type: "submit",
					variant: pending ? "tertiary" : "inverted",
					size: "lg",
					class: "w-full rounded-lg",
					disabled,
					loading
				}, {
					default: withCtx(() => [createTextVNode(toDisplayString(__props.submitLabel), 1)]),
					_: 1
				}, 8, [
					"variant",
					"disabled",
					"loading"
				])]),
				_: 1
			}, 8, [
				"publishable-key",
				"amount-cents",
				"currency",
				"copy",
				"payment-method-configuration-id",
				"is-loading",
				"verification-pending",
				"can-submit",
				"theme-key"
			]);
		};
	}
});
//#endregion
//#region packages/account-ui/src/billing/checkout/CheckoutSavedMethodSelect.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1$12 = { class: "flex flex-1 items-center gap-2 overflow-hidden py-2 pl-2 text-sm" };
//#endregion
//#region packages/account-ui/src/billing/checkout/CheckoutSavedMethodSelect.vue
var CheckoutSavedMethodSelect_default = /* @__PURE__ */ defineComponent({
	__name: "CheckoutSavedMethodSelect",
	props: /*@__PURE__*/ mergeModels({
		label: {},
		options: {}
	}, {
		"modelValue": { required: true },
		"modelModifiers": {}
	}),
	emits: ["update:modelValue"],
	setup(__props) {
		/**
		* The cloud app's single select, reduced to what the saved-method picker
		* uses: the large trigger and a flat option list.
		*/
		const selected = useModel(__props, "modelValue");
		const isOpen = ref(false);
		function onContentKeydown(event) {
			if (event.key === "Escape") {
				stopEscapeToDocument(event);
				isOpen.value = false;
			}
		}
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(SelectRoot_default), {
				modelValue: selected.value,
				"onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => selected.value = $event),
				open: isOpen.value,
				"onUpdate:open": _cache[1] || (_cache[1] = ($event) => isOpen.value = $event)
			}, {
				default: withCtx(() => [createVNode(unref(SelectTrigger_default), {
					"aria-label": __props.label,
					class: normalizeClass(unref(selectTriggerVariants)({
						size: "lg",
						border: "none"
					}))
				}, {
					default: withCtx(() => [createBaseVNode("div", _hoisted_1$12, [createVNode(unref(SelectValue_default), { class: "truncate" })]), createBaseVNode("div", { class: normalizeClass(unref(selectDropdownClass)) }, [..._cache[2] || (_cache[2] = [createBaseVNode("i", { class: "icon-[lucide--chevron-down] text-muted-foreground" }, null, -1)])], 2)]),
					_: 1
				}, 8, ["aria-label", "class"]), createVNode(unref(SelectPortal_default), null, {
					default: withCtx(() => [createVNode(unref(SelectContent_default), {
						position: "popper",
						"side-offset": 8,
						align: "start",
						class: normalizeClass(unref(cn)(unref(selectContentClass), "min-w-(--reka-select-trigger-width)")),
						onKeydown: onContentKeydown
					}, {
						default: withCtx(() => [createVNode(unref(SelectViewport_default), {
							style: { maxHeight: "min(28rem, 50vh)" },
							class: "scrollbar-custom w-full"
						}, {
							default: withCtx(() => [(openBlock(true), createElementBlock(Fragment, null, renderList(__props.options, (option) => {
								return openBlock(), createBlock(unref(SelectItem_default), {
									key: option.value,
									value: option.value,
									class: normalizeClass(unref(selectItemVariants)({ layout: "single" }))
								}, {
									default: withCtx(() => [createVNode(unref(SelectItemText_default), { class: "truncate" }, {
										default: withCtx(() => [createTextVNode(toDisplayString(option.name), 1)]),
										_: 2
									}, 1024), createVNode(unref(SelectItemIndicator_default), { class: "flex shrink-0 items-center justify-center" }, {
										default: withCtx(() => [..._cache[3] || (_cache[3] = [createBaseVNode("i", {
											class: "icon-[lucide--check] text-base-foreground",
											"aria-hidden": "true"
										}, null, -1)])]),
										_: 1
									})]),
									_: 2
								}, 1032, ["value", "class"]);
							}), 128))]),
							_: 1
						})]),
						_: 1
					}, 8, ["class"])]),
					_: 1
				})]),
				_: 1
			}, 8, ["modelValue", "open"]);
		};
	}
});
//#endregion
//#region packages/account-ui/src/billing/checkout/CheckoutSavedMethods.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1$11 = { class: "flex flex-col gap-2 pt-6" };
var _hoisted_2$10 = { class: "text-sm text-muted-foreground" };
var _hoisted_3$7 = {
	key: 0,
	class: "flex h-10 items-center gap-3 rounded-lg bg-secondary-background px-4"
};
var _hoisted_4$7 = { class: "text-sm text-base-foreground tabular-nums" };
var ADD_NEW = "add-new";
//#endregion
//#region packages/account-ui/src/billing/checkout/CheckoutSavedMethods.vue
var CheckoutSavedMethods_default = /* @__PURE__ */ defineComponent({
	__name: "CheckoutSavedMethods",
	props: /*@__PURE__*/ mergeModels({
		methods: {},
		copy: {}
	}, {
		"selectedMethodId": { default: null },
		"selectedMethodIdModifiers": {}
	}),
	emits: /*@__PURE__*/ mergeModels(["changePaymentMethod"], ["update:selectedMethodId"]),
	setup(__props, { emit: __emit }) {
		/**
		* The saved payment methods standing in for the card form. One method shows
		* a Change affordance; two or more become a picker whose last option adds a
		* new method. Cards carry brand + last4; Alipay is a linked account with
		* neither.
		*/
		const emit = __emit;
		const selectedMethodId = useModel(__props, "selectedMethodId");
		function methodLabel(method) {
			if (method.type === "alipay") return __props.copy.alipay;
			return `${method.brand} •••• ${method.last4}`;
		}
		const options = computed(() => [...__props.methods.map((method) => ({
			name: methodLabel(method),
			value: method.id
		})), {
			name: __props.copy.addNewPaymentMethod,
			value: ADD_NEW
		}]);
		const selectedMethod = computed({
			get: () => selectedMethodId.value ?? "",
			set: (value) => {
				if (value === ADD_NEW) {
					selectedMethodId.value = null;
					emit("changePaymentMethod");
					return;
				}
				selectedMethodId.value = value;
			}
		});
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", _hoisted_1$11, [createBaseVNode("span", _hoisted_2$10, toDisplayString(__props.copy.savedPaymentMethod), 1), __props.methods.length === 1 ? (openBlock(), createElementBlock("div", _hoisted_3$7, [
				createBaseVNode("i", { class: normalizeClass(unref(cn)("size-4 shrink-0", __props.methods[0].type === "alipay" ? "icon-[lucide--wallet]" : "icon-[lucide--credit-card]")) }, null, 2),
				createBaseVNode("span", _hoisted_4$7, toDisplayString(methodLabel(__props.methods[0])), 1),
				createVNode(CheckoutButton_default, {
					variant: "link",
					size: "lg",
					class: "ml-auto px-0",
					onClick: _cache[0] || (_cache[0] = ($event) => emit("changePaymentMethod"))
				}, {
					default: withCtx(() => [createTextVNode(toDisplayString(__props.copy.changePaymentMethod), 1)]),
					_: 1
				})
			])) : (openBlock(), createBlock(CheckoutSavedMethodSelect_default, {
				key: 1,
				modelValue: selectedMethod.value,
				"onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => selectedMethod.value = $event),
				label: __props.copy.selectLabel,
				options: options.value
			}, null, 8, [
				"modelValue",
				"label",
				"options"
			]))]);
		};
	}
});
//#endregion
//#region packages/account-ui/src/billing/checkout/CheckoutPromotionCode.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1$10 = { class: "flex gap-2 pt-6" };
var _hoisted_2$9 = [
	"aria-label",
	"disabled",
	"placeholder"
];
//#endregion
//#region packages/account-ui/src/billing/checkout/CheckoutPromotionCode.vue
var CheckoutPromotionCode_default = /* @__PURE__ */ defineComponent({
	__name: "CheckoutPromotionCode",
	props: {
		appliedCode: {},
		disabled: {
			type: Boolean,
			default: false
		},
		copy: {}
	},
	emits: ["apply", "invalidate"],
	setup(__props, { emit: __emit }) {
		const emit = __emit;
		const code = ref(__props.appliedCode ?? "");
		watch(() => __props.appliedCode, (applied) => {
			code.value = applied ?? "";
		});
		function invalidateEditedCode() {
			if (code.value !== (__props.appliedCode ?? "")) emit("invalidate");
		}
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", _hoisted_1$10, [withDirectives(createBaseVNode("input", {
				"onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => code.value = $event),
				"aria-label": __props.copy.promoCodePlaceholder,
				disabled: __props.disabled,
				class: "h-10 min-w-0 flex-1 rounded-lg border border-interface-stroke bg-secondary-background px-3 text-base-foreground",
				placeholder: __props.copy.promoCodePlaceholder,
				onInput: invalidateEditedCode
			}, null, 40, _hoisted_2$9), [[vModelText, code.value]]), createVNode(CheckoutButton_default, {
				variant: "secondary",
				size: "lg",
				disabled: __props.disabled,
				onClick: _cache[1] || (_cache[1] = ($event) => emit("apply", code.value))
			}, {
				default: withCtx(() => [createTextVNode(toDisplayString(__props.copy.applyPromoCode), 1)]),
				_: 1
			}, 8, ["disabled"])]);
		};
	}
});
//#endregion
//#region packages/account-ui/src/billing/checkout/CheckoutPaymentNotices.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1$9 = {
	key: 0,
	class: "rounded-lg border border-interface-stroke bg-secondary-background p-4"
};
var _hoisted_2$8 = { class: "m-0 font-semibold text-base-foreground" };
var _hoisted_3$6 = { class: "m-0 mt-1 text-sm text-muted-foreground" };
var _hoisted_4$6 = { class: "font-mono" };
var _hoisted_5$5 = {
	key: 1,
	role: "alert",
	class: "rounded-lg border border-interface-stroke bg-secondary-background p-4 text-sm text-base-foreground"
};
//#endregion
//#region packages/account-ui/src/billing/checkout/CheckoutPaymentNotices.vue
var CheckoutPaymentNotices_default = /* @__PURE__ */ defineComponent({
	__name: "CheckoutPaymentNotices",
	props: {
		embeddedCheckoutEnabled: { type: Boolean },
		reconciliationOperationId: {},
		authenticationState: {},
		authenticationError: {},
		copy: {}
	},
	setup(__props) {
		/** What an earlier payment attempt left for the customer to read. */
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock(Fragment, null, [__props.embeddedCheckoutEnabled && __props.reconciliationOperationId ? (openBlock(), createElementBlock("div", _hoisted_1$9, [createBaseVNode("p", _hoisted_2$8, toDisplayString(__props.copy.reconciliationTitle), 1), createBaseVNode("p", _hoisted_3$6, [createTextVNode(toDisplayString(__props.copy.reconciliationDetail) + " ", 1), createBaseVNode("span", _hoisted_4$6, toDisplayString(__props.reconciliationOperationId), 1)])])) : createCommentVNode("", true), __props.embeddedCheckoutEnabled && __props.authenticationState === "failed_retryable" ? (openBlock(), createElementBlock("div", _hoisted_5$5, toDisplayString(__props.authenticationError || __props.copy.authenticationFailedDetail), 1)) : createCommentVNode("", true)], 64);
		};
	}
});
//#endregion
//#region packages/account-ui/src/billing/checkout/checkoutCopy.ts
/**
* Splits `text` at each `{key}` so a template can render the surrounding
* prose as text and each placeholder as its own element.
*/
function splitPlaceholders(text, keys) {
	const pattern = new RegExp(`\\{(${keys.join("|")})\\}`, "g");
	const segments = [];
	let cursor = 0;
	for (const match of text.matchAll(pattern)) {
		if (match.index > cursor) segments.push({
			kind: "text",
			text: text.slice(cursor, match.index)
		});
		const key = keys.find((candidate) => candidate === match[1]);
		if (key !== void 0) segments.push({
			kind: "slot",
			key
		});
		cursor = match.index + match[0].length;
	}
	if (cursor < text.length) segments.push({
		kind: "text",
		text: text.slice(cursor)
	});
	return segments;
}
//#endregion
//#region packages/account-ui/src/billing/checkout/CheckoutTermsNote.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1$8 = { class: "m-0 text-center text-xs text-muted-foreground" };
var _hoisted_2$7 = ["href"];
//#endregion
//#region packages/account-ui/src/billing/checkout/CheckoutTermsNote.vue
var CheckoutTermsNote_default = /* @__PURE__ */ defineComponent({
	__name: "CheckoutTermsNote",
	props: { copy: {} },
	setup(__props) {
		const LINKS = {
			terms: "https://comfy.org/terms-of-service/",
			privacy: "https://comfy.org/privacy-policy/"
		};
		const segments = computed(() => splitPlaceholders(__props.copy.agreement, ["terms", "privacy"]));
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("p", _hoisted_1$8, [createBaseVNode("span", null, [(openBlock(true), createElementBlock(Fragment, null, renderList(segments.value, (segment, index) => {
				return openBlock(), createElementBlock(Fragment, { key: index }, [segment.kind === "text" ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [createTextVNode(toDisplayString(segment.text), 1)], 64)) : (openBlock(), createElementBlock("a", {
					key: 1,
					href: LINKS[segment.key],
					target: "_blank",
					rel: "noopener noreferrer",
					class: "underline hover:text-base-foreground"
				}, toDisplayString(segment.key === "terms" ? __props.copy.terms : __props.copy.privacyPolicy), 9, _hoisted_2$7))], 64);
			}), 128))])]);
		};
	}
});
//#endregion
//#region packages/account-ui/src/billing/checkout/CheckoutVerificationPrompt.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1$7 = {
	role: "status",
	class: "m-0 text-sm text-muted-foreground"
};
//#endregion
//#region packages/account-ui/src/billing/checkout/CheckoutVerificationPrompt.vue
var CheckoutVerificationPrompt_default = /* @__PURE__ */ defineComponent({
	__name: "CheckoutVerificationPrompt",
	props: {
		actionUrl: {},
		copy: {}
	},
	setup(__props) {
		/**
		* A pending 3DS verification is the only actionable step, so it leads the
		* footer and opens the bank's page in a new tab.
		*/
		function openVerification() {
			window.open(__props.actionUrl, "_blank", "noopener,noreferrer");
		}
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock(Fragment, null, [createBaseVNode("p", _hoisted_1$7, toDisplayString(__props.copy.pendingVerificationDetail), 1), createVNode(CheckoutButton_default, {
				variant: "inverted",
				size: "lg",
				class: "w-full rounded-lg",
				onClick: openVerification
			}, {
				default: withCtx(() => [createTextVNode(toDisplayString(__props.copy.completeVerification), 1)]),
				_: 1
			})], 64);
		};
	}
});
//#endregion
//#region packages/account-ui/src/billing/checkout/CheckoutSubscribeActions.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1$6 = {
	key: 0,
	class: "flex flex-col gap-2"
};
var _hoisted_2$6 = {
	role: "alert",
	class: "rounded-lg border border-interface-stroke bg-secondary-background p-4 text-sm text-base-foreground"
};
//#endregion
//#region packages/account-ui/src/billing/checkout/CheckoutSubscribeActions.vue
var CheckoutSubscribeActions_default = /* @__PURE__ */ defineComponent({
	__name: "CheckoutSubscribeActions",
	props: {
		payAction: {},
		copy: {},
		planName: {},
		previewData: {},
		publishableKey: {},
		themeKey: {},
		isLoading: { type: Boolean },
		payDisabled: { type: Boolean },
		verificationUrl: {},
		verificationPending: { type: Boolean },
		quoteIsCurrent: { type: Boolean },
		embeddedCheckoutEnabled: { type: Boolean },
		reconciliationOperationId: {},
		authenticationState: {},
		authenticationError: {}
	},
	emits: [
		"addCreditCard",
		"confirmPayment",
		"submittingChange",
		"paymentPhase"
	],
	setup(__props, { emit: __emit }) {
		/**
		* The new-subscription confirm's pay column: what an earlier attempt left to
		* read or finish, then the one way to pay `payAction` names, then the terms.
		*/
		const emit = __emit;
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock(Fragment, null, [
				createVNode(CheckoutPaymentNotices_default, {
					"embedded-checkout-enabled": __props.embeddedCheckoutEnabled,
					"reconciliation-operation-id": __props.reconciliationOperationId,
					"authentication-state": __props.authenticationState,
					"authentication-error": __props.authenticationError,
					copy: __props.copy
				}, null, 8, [
					"embedded-checkout-enabled",
					"reconciliation-operation-id",
					"authentication-state",
					"authentication-error",
					"copy"
				]),
				__props.payAction === "parked" ? (openBlock(), createElementBlock("div", _hoisted_1$6, [createBaseVNode("div", _hoisted_2$6, toDisplayString(__props.copy.parkedCheckoutDetail), 1), createVNode(CheckoutButton_default, {
					variant: "inverted",
					size: "lg",
					class: "w-full rounded-lg",
					loading: __props.isLoading,
					disabled: __props.payDisabled,
					onClick: _cache[0] || (_cache[0] = ($event) => emit("addCreditCard"))
				}, {
					default: withCtx(() => [createTextVNode(toDisplayString(__props.copy.completePayment), 1)]),
					_: 1
				}, 8, ["loading", "disabled"])])) : createCommentVNode("", true),
				__props.verificationUrl ? (openBlock(), createBlock(CheckoutVerificationPrompt_default, {
					key: 1,
					"action-url": __props.verificationUrl,
					copy: __props.copy
				}, null, 8, ["action-url", "copy"])) : createCommentVNode("", true),
				__props.payAction === "form" && __props.previewData ? (openBlock(), createBlock(CheckoutPaymentForm_default, {
					key: `${__props.previewData.quote_id}:${__props.previewData.quote_version}`,
					"publishable-key": __props.publishableKey,
					"amount-cents": __props.previewData.amount_due_cents ?? 0,
					currency: __props.previewData.currency ?? "",
					copy: __props.copy.payment,
					"submit-label": __props.copy.payAndSubscribe,
					"payment-method-configuration-id": __props.previewData.payment_method_configuration_id ?? "",
					"is-loading": __props.isLoading,
					"verification-pending": __props.verificationPending,
					"can-submit": __props.quoteIsCurrent,
					"theme-key": __props.themeKey,
					onSubmittingChange: _cache[1] || (_cache[1] = ($event) => emit("submittingChange", $event)),
					onConfirm: _cache[2] || (_cache[2] = (token, methodType) => emit("confirmPayment", token, methodType)),
					onPhase: _cache[3] || (_cache[3] = ($event) => emit("paymentPhase", $event))
				}, null, 8, [
					"publishable-key",
					"amount-cents",
					"currency",
					"copy",
					"submit-label",
					"payment-method-configuration-id",
					"is-loading",
					"verification-pending",
					"can-submit",
					"theme-key"
				])) : createCommentVNode("", true),
				__props.payAction === "pay" || __props.payAction === "subscribe" ? (openBlock(), createBlock(CheckoutButton_default, {
					key: 3,
					variant: __props.payAction === "pay" ? "inverted" : "tertiary",
					size: "lg",
					class: "w-full rounded-lg",
					loading: __props.isLoading,
					disabled: __props.payDisabled,
					onClick: _cache[4] || (_cache[4] = ($event) => emit("addCreditCard"))
				}, {
					default: withCtx(() => [createTextVNode(toDisplayString(__props.payAction === "pay" ? __props.copy.payAndSubscribe : __props.copy.subscribeToPlan(__props.planName)), 1)]),
					_: 1
				}, 8, [
					"variant",
					"loading",
					"disabled"
				])) : createCommentVNode("", true),
				createVNode(CheckoutTermsNote_default, {
					class: "mt-2",
					copy: __props.copy.terms
				}, null, 8, ["copy"])
			], 64);
		};
	}
});
//#endregion
//#region packages/account-ui/src/billing/checkout/CheckoutSubscribeSummary.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1$5 = { class: "flex flex-col gap-2" };
var _hoisted_2$5 = { class: "text-sm text-base-foreground" };
var _hoisted_3$5 = { class: "flex items-baseline gap-2" };
var _hoisted_4$5 = { class: "text-2xl font-semibold text-base-foreground tabular-nums" };
var _hoisted_5$4 = { class: "text-base text-base-foreground" };
var _hoisted_6$3 = { class: "text-muted-foreground" };
var _hoisted_7$3 = { class: "text-muted-foreground" };
var _hoisted_8$3 = { class: "flex items-center justify-between" };
var _hoisted_9$3 = { class: "text-base-foreground" };
var _hoisted_10$3 = { class: "flex items-center gap-1" };
var _hoisted_11$3 = { class: "font-bold text-base-foreground tabular-nums" };
var _hoisted_12$2 = { class: "flex items-center justify-between text-base" };
var _hoisted_13$1 = { class: "text-base-foreground" };
var _hoisted_14 = { class: "font-bold text-base-foreground tabular-nums" };
var _hoisted_15 = { class: "text-sm text-muted-foreground" };
var _hoisted_16 = {
	key: 1,
	class: "flex flex-col gap-2 pt-4 text-sm"
};
var _hoisted_17 = { class: "text-base-foreground" };
//#endregion
//#region packages/account-ui/src/billing/checkout/CheckoutSubscribeSummary.vue
var CheckoutSubscribeSummary_default = /* @__PURE__ */ defineComponent({
	__name: "CheckoutSubscribeSummary",
	props: {
		plan: {},
		copy: {},
		locale: {},
		previewData: {},
		billingCycle: {},
		compact: {
			type: Boolean,
			default: false
		}
	},
	setup(__props) {
		/**
		* The new-subscription confirm's money block: the plan and its price, the
		* credits a period refills, today's charge with the renewal terms, and the
		* discounts the quote applied.
		*/
		const isYearly = computed(() => isYearlyCheckout(__props.previewData?.new_plan.duration, __props.billingCycle));
		const quotedPrice = computed(() => __props.plan.pricedByQuote ? __props.previewData?.new_plan : void 0);
		const displayPrice = computed(() => {
			if (quotedPrice.value) {
				const cents = quotedPrice.value.price_cents;
				return ((isYearly.value ? cents / 12 : cents) / 100).toFixed(0);
			}
			return formatNumber(isYearly.value ? __props.plan.monthlyPriceUsd.yearly : __props.plan.monthlyPriceUsd.monthly, __props.locale);
		});
		const billedLabel = computed(() => {
			if (!isYearly.value) return __props.copy.billedMonthly;
			const usd = quotedPrice.value ? quotedPrice.value.price_cents / 100 : __props.plan.monthlyPriceUsd.yearly * 12;
			return __props.copy.billedYearly(`$${formatNumber(usd, __props.locale)}`);
		});
		const refillLabel = computed(() => isYearly.value ? __props.copy.eachYearCreditsRefill : __props.copy.eachMonthCreditsRefill);
		const refillCredits = computed(() => formatNumber(isYearly.value ? __props.plan.monthlyCredits * 12 : __props.plan.monthlyCredits, __props.locale));
		const totalDueToday = computed(() => __props.previewData ? formatAmountDueToday(__props.previewData, __props.locale) : "");
		const renewalTerms = computed(() => {
			if (!__props.previewData) return "";
			const amount = formatRenewalAmount(__props.previewData, __props.locale);
			if (!amount) return "";
			const renewsAt = resolveRenewalDate(__props.previewData);
			if (!renewsAt) return __props.copy.renewsAtAmount(amount);
			const date = new Date(renewsAt).toLocaleDateString(__props.locale, {
				month: "short",
				day: "numeric",
				year: "numeric",
				timeZone: "UTC"
			});
			return __props.copy.renewsAt(amount, date);
		});
		const discounts = computed(() => (__props.previewData?.discounts ?? []).map((discount) => ({
			key: `${discount.kind}:${discount.code}`,
			label: __props.copy.discount[discount.kind],
			name: discount.name || discount.code,
			amount: discount.amount_off_cents ? formatQuoteMoney(discount.amount_off_cents, __props.previewData?.currency, __props.locale) : ""
		})));
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock(Fragment, null, [
				createBaseVNode("div", _hoisted_1$5, [
					createBaseVNode("span", _hoisted_2$5, toDisplayString(__props.plan.name), 1),
					createBaseVNode("div", _hoisted_3$5, [createBaseVNode("span", _hoisted_4$5, " $" + toDisplayString(displayPrice.value), 1), createBaseVNode("span", _hoisted_5$4, toDisplayString(__props.copy.usdPerMonth), 1)]),
					createBaseVNode("span", _hoisted_6$3, toDisplayString(billedLabel.value), 1),
					createBaseVNode("span", _hoisted_7$3, toDisplayString(__props.copy.startingToday), 1)
				]),
				createBaseVNode("div", { class: normalizeClass(unref(cn)("flex flex-col gap-3 pt-16 pb-8", __props.compact && "xl:pt-6 xl:pb-4")) }, [createBaseVNode("div", _hoisted_8$3, [createBaseVNode("span", _hoisted_9$3, toDisplayString(refillLabel.value), 1), createBaseVNode("div", _hoisted_10$3, [_cache[0] || (_cache[0] = createBaseVNode("i", { class: "icon-[lucide--coins] size-4 shrink-0 bg-credit" }, null, -1)), createBaseVNode("span", _hoisted_11$3, toDisplayString(refillCredits.value), 1)])])], 2),
				totalDueToday.value ? (openBlock(), createElementBlock("div", {
					key: 0,
					class: normalizeClass(unref(cn)("flex flex-col gap-2 border-t border-border-subtle pt-8", __props.compact && "xl:pt-6"))
				}, [createBaseVNode("div", _hoisted_12$2, [createBaseVNode("span", _hoisted_13$1, toDisplayString(__props.copy.totalDueToday), 1), createBaseVNode("span", _hoisted_14, toDisplayString(totalDueToday.value), 1)]), createBaseVNode("span", _hoisted_15, toDisplayString(renewalTerms.value), 1)], 2)) : createCommentVNode("", true),
				discounts.value.length ? (openBlock(), createElementBlock("div", _hoisted_16, [(openBlock(true), createElementBlock(Fragment, null, renderList(discounts.value, (discount) => {
					return openBlock(), createElementBlock("div", {
						key: discount.key,
						class: "flex items-center justify-between text-muted-foreground"
					}, [createBaseVNode("span", null, toDisplayString(discount.label), 1), createBaseVNode("span", _hoisted_17, [createTextVNode(toDisplayString(discount.name), 1), discount.amount ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [createTextVNode(" · −" + toDisplayString(discount.amount), 1)], 64)) : createCommentVNode("", true)])]);
				}), 128))])) : createCommentVNode("", true)
			], 64);
		};
	}
});
//#endregion
//#region packages/account-ui/src/billing/checkout/checkoutRecovery.ts
/** A 3DS link is on offer unless the last attempt at it already failed. */
function isVerificationOffered({ actionUrl, authenticationState }) {
	return Boolean(actionUrl) && authenticationState !== "failed_retryable";
}
/**
* While an earlier payment still needs the customer (a verification to
* finish, a failed one to retry, or a charge awaiting reconciliation), the
* pay action stays disabled so a second charge cannot start beside it.
*/
function isVerificationRecoveryActive(state) {
	return isVerificationOffered(state) || state.embeddedCheckoutEnabled && (state.authenticationState === "requires_action" || state.authenticationState === "failed_retryable" || Boolean(state.reconciliationOperationId));
}
//#endregion
//#region packages/account-ui/src/billing/checkout/CheckoutSubscribeConfirm.vue
var CheckoutSubscribeConfirm_default = /* @__PURE__ */ defineComponent({
	__name: "CheckoutSubscribeConfirm",
	props: /*@__PURE__*/ mergeModels({
		plan: {},
		copy: {},
		locale: {},
		publishableKey: {},
		themeKey: {},
		billingCycle: { default: "monthly" },
		isLoading: {
			type: Boolean,
			default: false
		},
		previewData: { default: null },
		actionUrl: { default: null },
		authenticationState: { default: null },
		authenticationError: { default: null },
		reconciliationOperationId: { default: null },
		parkedCheckoutRecovery: {
			type: Boolean,
			default: false
		},
		usePaymentElement: {
			type: Boolean,
			default: false
		},
		savedMethods: { default: null },
		quoteIsCurrent: {
			type: Boolean,
			default: false
		},
		isApplyingPromotionCode: {
			type: Boolean,
			default: false
		},
		embeddedCheckoutEnabled: {
			type: Boolean,
			default: false
		}
	}, {
		"selectedSavedMethodId": { default: null },
		"selectedSavedMethodIdModifiers": {}
	}),
	emits: /*@__PURE__*/ mergeModels([
		"addCreditCard",
		"confirmPayment",
		"back",
		"changePaymentMethod",
		"applyPromotionCode",
		"invalidateQuote",
		"paymentPhase"
	], ["update:selectedSavedMethodId"]),
	setup(__props, { emit: __emit }) {
		/**
		* The confirm step of a new subscription: the plan and today's charge on one
		* side, and the way to pay on the other — the card form, the saved methods
		* that stand in for it, or a hosted continuation the host opens.
		*/
		const emit = __emit;
		const selectedSavedMethodId = useModel(__props, "selectedSavedMethodId");
		const captureMode = computed(() => __props.usePaymentElement && !__props.savedMethods?.length);
		const showSavedMethods = computed(() => __props.embeddedCheckoutEnabled && Boolean(__props.savedMethods?.length));
		const layout = computed(() => {
			const split = captureMode.value;
			return {
				root: cn("mx-auto flex h-full min-h-0 max-w-[400px] flex-col items-stretch justify-between overflow-y-auto text-sm motion-safe:animate-in motion-safe:duration-300 motion-safe:fade-in motion-safe:slide-in-from-bottom-2", split && "xl:min-h-0 xl:w-full xl:max-w-none xl:flex-1 xl:flex-row xl:items-stretch xl:gap-0 xl:overflow-visible"),
				summary: cn(split && "xl:w-[42%] xl:shrink-0 xl:border-r xl:border-border-subtle xl:bg-base-background xl:px-12 xl:py-10", split && "max-xl:-mx-4 max-xl:-mt-6 max-xl:rounded-t-2xl max-xl:bg-base-background max-xl:p-6"),
				header: cn("mb-8 flex items-center gap-3", split && "xl:mb-10"),
				title: cn("m-0 flex-1 text-center text-xl font-semibold text-base-foreground lg:text-2xl", split && "xl:text-left xl:text-base xl:font-medium xl:text-muted-foreground"),
				footer: cn("flex flex-col gap-2 pt-8 pb-4", split && "xl:min-h-0 xl:min-w-0 xl:flex-1 xl:px-16 xl:py-10", split && "max-xl:px-2")
			};
		});
		const amountDueCents = computed(() => __props.previewData?.amount_due_cents ?? 0);
		const quoteReady = computed(() => amountDueCents.value > 0 && Boolean(__props.previewData?.currency) && Boolean(__props.previewData?.quote_id) && __props.previewData?.quote_version !== void 0);
		const recoveryState = computed(() => ({
			actionUrl: __props.actionUrl,
			authenticationState: __props.authenticationState,
			reconciliationOperationId: __props.reconciliationOperationId,
			embeddedCheckoutEnabled: __props.embeddedCheckoutEnabled
		}));
		const verificationOffered = computed(() => isVerificationOffered(recoveryState.value));
		const verificationRecoveryActive = computed(() => isVerificationRecoveryActive(recoveryState.value));
		const quoteIsUsable = computed(() => !__props.embeddedCheckoutEnabled || __props.quoteIsCurrent);
		const stripeSubmissionPending = ref(false);
		const interactionLocked = computed(() => __props.isLoading || __props.isApplyingPromotionCode || stripeSubmissionPending.value);
		const payAction = computed(() => {
			if (__props.parkedCheckoutRecovery) return "parked";
			if (captureMode.value) return quoteReady.value ? "form" : "pay";
			return __props.savedMethods?.length ? "pay" : "subscribe";
		});
		const payDisabled = computed(() => interactionLocked.value || !quoteIsUsable.value || verificationRecoveryActive.value);
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", { class: normalizeClass(layout.value.root) }, [createBaseVNode("div", { class: normalizeClass(layout.value.summary) }, [
				createBaseVNode("div", { class: normalizeClass(layout.value.header) }, [createVNode(CheckoutButton_default, {
					size: "icon",
					variant: "muted-textonly",
					class: "shrink-0 rounded-full",
					"aria-label": __props.copy.back,
					disabled: interactionLocked.value,
					onClick: _cache[0] || (_cache[0] = ($event) => emit("back"))
				}, {
					default: withCtx(() => [..._cache[9] || (_cache[9] = [createBaseVNode("i", { class: "pi pi-arrow-left text-base" }, null, -1)])]),
					_: 1
				}, 8, ["aria-label", "disabled"]), createBaseVNode("h2", { class: normalizeClass(layout.value.title) }, toDisplayString(__props.copy.confirmPayment), 3)], 2),
				createVNode(CheckoutSubscribeSummary_default, {
					plan: __props.plan,
					copy: __props.copy,
					locale: __props.locale,
					"preview-data": __props.previewData,
					"billing-cycle": __props.billingCycle,
					compact: __props.usePaymentElement
				}, null, 8, [
					"plan",
					"copy",
					"locale",
					"preview-data",
					"billing-cycle",
					"compact"
				]),
				__props.embeddedCheckoutEnabled ? (openBlock(), createBlock(CheckoutPromotionCode_default, {
					key: 0,
					"applied-code": __props.previewData?.promotion_code,
					disabled: interactionLocked.value,
					copy: __props.copy,
					onApply: _cache[1] || (_cache[1] = ($event) => emit("applyPromotionCode", $event)),
					onInvalidate: _cache[2] || (_cache[2] = ($event) => emit("invalidateQuote"))
				}, null, 8, [
					"applied-code",
					"disabled",
					"copy"
				])) : createCommentVNode("", true),
				showSavedMethods.value && __props.savedMethods ? (openBlock(), createBlock(CheckoutSavedMethods_default, {
					key: 1,
					"selected-method-id": selectedSavedMethodId.value,
					"onUpdate:selectedMethodId": _cache[3] || (_cache[3] = ($event) => selectedSavedMethodId.value = $event),
					methods: __props.savedMethods,
					copy: __props.copy.savedMethod,
					onChangePaymentMethod: _cache[4] || (_cache[4] = ($event) => emit("changePaymentMethod"))
				}, null, 8, [
					"selected-method-id",
					"methods",
					"copy"
				])) : createCommentVNode("", true)
			], 2), createBaseVNode("div", { class: normalizeClass(layout.value.footer) }, [createVNode(CheckoutSubscribeActions_default, {
				"pay-action": payAction.value,
				copy: __props.copy,
				"plan-name": __props.plan.name,
				"preview-data": __props.previewData,
				"publishable-key": __props.publishableKey,
				"theme-key": __props.themeKey,
				"is-loading": __props.isLoading,
				"pay-disabled": payDisabled.value,
				"verification-url": verificationOffered.value ? __props.actionUrl : null,
				"verification-pending": Boolean(__props.actionUrl) || verificationRecoveryActive.value,
				"quote-is-current": __props.quoteIsCurrent,
				"embedded-checkout-enabled": __props.embeddedCheckoutEnabled,
				"reconciliation-operation-id": __props.reconciliationOperationId,
				"authentication-state": __props.authenticationState,
				"authentication-error": __props.authenticationError,
				onAddCreditCard: _cache[5] || (_cache[5] = ($event) => emit("addCreditCard")),
				onConfirmPayment: _cache[6] || (_cache[6] = (token, type) => emit("confirmPayment", token, type)),
				onSubmittingChange: _cache[7] || (_cache[7] = ($event) => stripeSubmissionPending.value = $event),
				onPaymentPhase: _cache[8] || (_cache[8] = ($event) => emit("paymentPhase", $event))
			}, null, 8, [
				"pay-action",
				"copy",
				"plan-name",
				"preview-data",
				"publishable-key",
				"theme-key",
				"is-loading",
				"pay-disabled",
				"verification-url",
				"verification-pending",
				"quote-is-current",
				"embedded-checkout-enabled",
				"reconciliation-operation-id",
				"authentication-state",
				"authentication-error"
			])], 2)], 2);
		};
	}
});
//#endregion
//#region packages/account-ui/src/billing/checkout/CheckoutSuccess.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1$4 = { class: "mx-auto flex h-full min-h-0 max-w-[400px] flex-col items-stretch justify-between overflow-y-auto text-sm motion-safe:animate-in motion-safe:duration-300 motion-safe:fade-in motion-safe:slide-in-from-bottom-2" };
var _hoisted_2$4 = { class: "flex flex-col items-center gap-4 pt-8" };
var _hoisted_3$4 = { class: "m-0 text-center text-xl font-semibold text-base-foreground lg:text-2xl" };
var _hoisted_4$4 = { class: "m-0 text-center text-sm text-muted-foreground" };
var _hoisted_5$3 = { class: "text-sm text-base-foreground" };
var _hoisted_6$2 = { class: "flex items-baseline gap-1" };
var _hoisted_7$2 = { class: "text-2xl font-semibold text-base-foreground tabular-nums" };
var _hoisted_8$2 = { class: "text-sm text-base-foreground" };
var _hoisted_9$2 = { class: "flex items-center gap-1 text-sm text-muted-foreground" };
var _hoisted_10$2 = { class: "tabular-nums" };
var _hoisted_11$2 = {
	key: 0,
	class: "m-0 text-center text-sm text-muted-foreground tabular-nums"
};
var _hoisted_12$1 = { class: "font-medium text-base-foreground" };
var _hoisted_13 = { class: "flex flex-col gap-2 pt-8 pb-4" };
//#endregion
//#region packages/account-ui/src/billing/checkout/CheckoutSuccess.vue
var CheckoutSuccess_default = /* @__PURE__ */ defineComponent({
	__name: "CheckoutSuccess",
	props: {
		plan: {},
		copy: {},
		locale: {},
		previewData: { default: null },
		billingCycle: { default: "monthly" },
		darkSurface: {
			type: Boolean,
			default: false
		},
		promoApplied: { default: null },
		closeDemoted: {
			type: Boolean,
			default: false
		}
	},
	emits: ["close"],
	setup(__props, { emit: __emit }) {
		/**
		* The step after a successful subscribe: what the customer now has. A host
		* adds its own follow-up (the cloud app's team invite) through the
		* `details` and `actions` slots, demoting Close when it leads with another
		* action.
		*/
		const emit = __emit;
		const isYearly = computed(() => isYearlyCheckout(__props.previewData?.new_plan?.duration, __props.billingCycle));
		const displayPrice = computed(() => {
			if (__props.previewData?.new_plan) return (__props.previewData.new_plan.price_cents / 100).toFixed(0);
			if (__props.plan.pricedByQuote) return "0";
			return String(isYearly.value ? __props.plan.monthlyPriceUsd.yearly * 12 : __props.plan.monthlyPriceUsd.monthly);
		});
		const displayCredits = computed(() => formatNumber(isYearly.value ? __props.plan.monthlyCredits * 12 : __props.plan.monthlyCredits, __props.locale));
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", _hoisted_1$4, [createBaseVNode("div", _hoisted_2$4, [
				_cache[2] || (_cache[2] = createBaseVNode("i", { class: "pi pi-check-circle text-5xl text-success-background" }, null, -1)),
				createBaseVNode("h2", _hoisted_3$4, toDisplayString(__props.copy.allSet), 1),
				createBaseVNode("p", _hoisted_4$4, toDisplayString(__props.copy.planUpdated) + " " + toDisplayString(__props.copy.receiptEmailed), 1),
				createBaseVNode("div", { class: normalizeClass(unref(cn)("mt-4 flex w-full flex-col gap-1 rounded-xl border border-border-default bg-base-background p-4", __props.darkSurface && "border-none bg-secondary-background")) }, [
					createBaseVNode("span", _hoisted_5$3, toDisplayString(__props.plan.name), 1),
					createBaseVNode("div", _hoisted_6$2, [createBaseVNode("span", _hoisted_7$2, " $" + toDisplayString(displayPrice.value), 1), createBaseVNode("span", _hoisted_8$2, toDisplayString(isYearly.value ? __props.copy.usdPerYear : __props.copy.usdPerMonth), 1)]),
					createBaseVNode("div", _hoisted_9$2, [_cache[1] || (_cache[1] = createBaseVNode("i", { class: "icon-[lucide--coins] size-4 shrink-0 bg-credit" }, null, -1)), createBaseVNode("span", _hoisted_10$2, toDisplayString(displayCredits.value) + " " + toDisplayString(isYearly.value ? __props.copy.perYear : __props.copy.perMonth), 1)])
				], 2),
				__props.promoApplied ? (openBlock(), createElementBlock("p", _hoisted_11$2, [createBaseVNode("span", _hoisted_12$1, toDisplayString(__props.copy.promoApplied(__props.promoApplied.code)), 1), createTextVNode(" " + toDisplayString(__props.copy.promoRenews(__props.promoApplied.renewalAmount, __props.promoApplied.renewalDate)), 1)])) : createCommentVNode("", true),
				renderSlot(_ctx.$slots, "details")
			]), createBaseVNode("div", _hoisted_13, [renderSlot(_ctx.$slots, "actions"), createVNode(CheckoutButton_default, {
				variant: __props.closeDemoted ? "muted-textonly" : "secondary",
				size: "lg",
				class: "w-full rounded-lg",
				onClick: _cache[0] || (_cache[0] = ($event) => emit("close"))
			}, {
				default: withCtx(() => [createTextVNode(toDisplayString(__props.copy.close), 1)]),
				_: 1
			}, 8, ["variant"])])]);
		};
	}
});
//#endregion
//#region packages/account-ui/src/billing/checkout/CheckoutReactivationBanner.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1$3 = { class: "mb-6 flex gap-3 rounded-2xl border border-warning-background bg-warning-background/20 p-4" };
var _hoisted_2$3 = { class: "flex flex-col gap-2" };
var _hoisted_3$3 = { class: "m-0 text-sm font-bold text-base-foreground" };
var _hoisted_4$3 = { class: "m-0 text-sm text-muted-foreground" };
var _hoisted_5$2 = {
	key: 0,
	class: "flex items-center gap-2 pt-1 text-sm text-muted-foreground"
};
//#endregion
//#region packages/account-ui/src/billing/checkout/CheckoutReactivationBanner.vue
var CheckoutReactivationBanner_default = /* @__PURE__ */ defineComponent({
	__name: "CheckoutReactivationBanner",
	props: /*@__PURE__*/ mergeModels({
		title: {},
		segments: {},
		checkboxLabel: {}
	}, {
		"confirmed": {
			type: Boolean,
			required: true
		},
		"confirmedModifiers": {}
	}),
	emits: ["update:confirmed"],
	setup(__props) {
		/**
		* The plan-change confirm's disclosure that the change reactivates a
		* subscription set to end. A charge above the current monthly price is
		* emphasised and has to be acknowledged (`checkboxLabel` set).
		*/
		const confirmed = useModel(__props, "confirmed");
		const amountClass = computed(() => cn("font-bold text-base-foreground", __props.checkboxLabel !== null && "text-base font-extrabold"));
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", _hoisted_1$3, [_cache[1] || (_cache[1] = createBaseVNode("div", { class: "flex size-8 shrink-0 items-center justify-center rounded-full text-warning-background" }, [createBaseVNode("i", { class: "pi pi-info-circle" })], -1)), createBaseVNode("div", _hoisted_2$3, [
				createBaseVNode("p", _hoisted_3$3, toDisplayString(__props.title), 1),
				createBaseVNode("p", _hoisted_4$3, [createBaseVNode("span", null, [(openBlock(true), createElementBlock(Fragment, null, renderList(__props.segments, (segment, index) => {
					return openBlock(), createElementBlock(Fragment, { key: index }, [segment.emphasis ? (openBlock(), createElementBlock("span", {
						key: 0,
						class: normalizeClass(amountClass.value)
					}, toDisplayString(segment.text), 3)) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [createTextVNode(toDisplayString(segment.text), 1)], 64))], 64);
				}), 128))])]),
				__props.checkboxLabel ? (openBlock(), createElementBlock("label", _hoisted_5$2, [withDirectives(createBaseVNode("input", {
					"onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => confirmed.value = $event),
					type: "checkbox",
					class: "size-4 rounded-sm border-interface-stroke"
				}, null, 512), [[vModelCheckbox, confirmed.value]]), createTextVNode(" " + toDisplayString(__props.checkboxLabel), 1)])) : createCommentVNode("", true)
			])]);
		};
	}
});
//#endregion
//#region packages/account-ui/src/billing/checkout/CheckoutTransitionSummary.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1$2 = { class: "flex flex-col gap-2" };
var _hoisted_2$2 = { class: "text-sm font-semibold text-base-foreground" };
var _hoisted_3$2 = { class: "flex items-baseline gap-2" };
var _hoisted_4$2 = { class: "text-2xl font-semibold text-base-foreground tabular-nums" };
var _hoisted_5$1 = { class: "text-base text-base-foreground" };
var _hoisted_6$1 = { class: "flex flex-col gap-2 pt-10" };
var _hoisted_7$1 = {
	key: 0,
	class: "text-xs font-semibold tracking-wide text-muted-foreground uppercase"
};
var _hoisted_8$1 = { class: "flex items-center justify-between" };
var _hoisted_9$1 = { class: "text-base-foreground" };
var _hoisted_10$1 = { class: "flex items-center gap-1" };
var _hoisted_11$1 = { class: "font-bold text-base-foreground tabular-nums" };
var _hoisted_12 = {
	key: 1,
	class: "text-sm text-muted-foreground"
};
//#endregion
//#region packages/account-ui/src/billing/checkout/CheckoutTransitionSummary.vue
var CheckoutTransitionSummary_default = /* @__PURE__ */ defineComponent({
	__name: "CheckoutTransitionSummary",
	props: {
		planName: {},
		heroPrice: {},
		usdPerMonth: {},
		details: {},
		heading: { default: "" },
		refillLabel: {},
		refillCredits: {},
		note: { default: "" }
	},
	setup(__props) {
		/**
		* The plan-change confirm's plan block: the plan switched to, when it takes
		* effect, and the credits it refills — with the "after that" heading a
		* scheduled change carries.
		*/
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock(Fragment, null, [createBaseVNode("div", _hoisted_1$2, [
				createBaseVNode("span", _hoisted_2$2, toDisplayString(__props.planName), 1),
				createBaseVNode("div", _hoisted_3$2, [createBaseVNode("span", _hoisted_4$2, " $" + toDisplayString(__props.heroPrice), 1), createBaseVNode("span", _hoisted_5$1, toDisplayString(__props.usdPerMonth), 1)]),
				(openBlock(true), createElementBlock(Fragment, null, renderList(__props.details, (line) => {
					return openBlock(), createElementBlock("span", {
						key: line,
						class: "text-muted-foreground"
					}, toDisplayString(line), 1);
				}), 128))
			]), createBaseVNode("div", _hoisted_6$1, [
				__props.heading ? (openBlock(), createElementBlock("span", _hoisted_7$1, toDisplayString(__props.heading), 1)) : createCommentVNode("", true),
				createBaseVNode("div", _hoisted_8$1, [createBaseVNode("span", _hoisted_9$1, toDisplayString(__props.refillLabel), 1), createBaseVNode("div", _hoisted_10$1, [_cache[0] || (_cache[0] = createBaseVNode("i", { class: "icon-[lucide--coins] size-4 shrink-0 bg-credit" }, null, -1)), createBaseVNode("span", _hoisted_11$1, toDisplayString(__props.refillCredits), 1)])]),
				__props.note ? (openBlock(), createElementBlock("span", _hoisted_12, toDisplayString(__props.note), 1)) : createCommentVNode("", true)
			])], 64);
		};
	}
});
//#endregion
//#region packages/account-ui/src/billing/checkout/CheckoutTransitionConfirm.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1$1 = { class: "mx-auto flex h-full min-h-0 max-w-[400px] flex-col items-stretch justify-between overflow-y-auto text-sm motion-safe:animate-in motion-safe:duration-300 motion-safe:fade-in motion-safe:slide-in-from-bottom-2" };
var _hoisted_2$1 = { class: "mb-8 flex items-center gap-3" };
var _hoisted_3$1 = { class: "m-0 flex-1 text-center text-xl font-semibold text-base-foreground lg:text-2xl" };
var _hoisted_4$1 = { class: "flex items-center justify-between text-muted-foreground" };
var _hoisted_5 = { class: "text-base-foreground" };
var _hoisted_6 = { class: "flex items-center justify-between text-base" };
var _hoisted_7 = { class: "text-base-foreground" };
var _hoisted_8 = { class: "font-bold text-base-foreground tabular-nums" };
var _hoisted_9 = { class: "text-sm text-muted-foreground" };
var _hoisted_10 = { class: "flex flex-col gap-2 pt-8 pb-4" };
var _hoisted_11 = {
	key: 0,
	role: "alert",
	class: "m-0 text-sm text-destructive-background"
};
//#endregion
//#region packages/account-ui/src/billing/checkout/CheckoutTransitionConfirm.vue
var CheckoutTransitionConfirm_default = /* @__PURE__ */ defineComponent({
	__name: "CheckoutTransitionConfirm",
	props: {
		previewData: {},
		plan: {},
		currentPlanName: {},
		copy: {},
		locale: {},
		subscriptionLoaded: { type: Boolean },
		subscriptionCancelled: {
			type: Boolean,
			default: false
		},
		subscriptionEndDate: { default: null },
		isLoading: {
			type: Boolean,
			default: false
		},
		actionUrl: { default: null },
		forceReactivation: {
			type: Boolean,
			default: false
		},
		authenticationState: { default: null },
		authenticationError: { default: null },
		reconciliationOperationId: { default: null },
		quoteIsCurrent: {
			type: Boolean,
			default: false
		},
		isApplyingPromotionCode: {
			type: Boolean,
			default: false
		},
		embeddedCheckoutEnabled: {
			type: Boolean,
			default: false
		},
		paymentCancelable: {
			type: Boolean,
			default: false
		},
		cancelingPayment: {
			type: Boolean,
			default: false
		},
		cancelPaymentError: { default: null }
	},
	emits: [
		"confirm",
		"back",
		"applyPromotionCode",
		"invalidateQuote",
		"cancelPayment"
	],
	setup(__props, { emit: __emit }) {
		/**
		* The confirm step of a change to an existing subscription: what it switches
		* to and when, what is charged today, and — for a subscription set to end —
		* the reactivation the change implies, which a large enough charge has to be
		* acknowledged before the confirm unlocks.
		*/
		const emit = __emit;
		const recoveryState = computed(() => ({
			actionUrl: __props.actionUrl,
			authenticationState: __props.authenticationState,
			reconciliationOperationId: __props.reconciliationOperationId,
			embeddedCheckoutEnabled: __props.embeddedCheckoutEnabled
		}));
		const verificationUrl = computed(() => isVerificationOffered(recoveryState.value) ? __props.actionUrl : null);
		const verificationRecoveryActive = computed(() => isVerificationRecoveryActive(recoveryState.value));
		const quoteIsUsable = computed(() => !__props.embeddedCheckoutEnabled || __props.quoteIsCurrent);
		const interactionLocked = computed(() => __props.isLoading || __props.isApplyingPromotionCode);
		function formatDate(date) {
			return new Intl.DateTimeFormat("en-US", {
				month: "short",
				day: "numeric",
				year: "numeric",
				timeZone: "UTC"
			}).format(typeof date === "string" ? new Date(date) : date);
		}
		const isImmediate = computed(() => __props.previewData.is_immediate);
		const newIsYearly = computed(() => isAnnualDuration(__props.previewData.new_plan.duration));
		const currentIsYearly = computed(() => isAnnualDuration(__props.previewData.current_plan?.duration));
		const isCancelled = computed(() => __props.forceReactivation || !__props.embeddedCheckoutEnabled && __props.subscriptionCancelled);
		const reactivationVariant = computed(() => {
			if (!isCancelled.value) return null;
			switch (__props.previewData.transition_type) {
				case "upgrade": return "upgrade";
				case "downgrade": return "downgrade";
				case "duration_change": return "duration_change";
				default: return null;
			}
		});
		const cancelAt = computed(() => __props.subscriptionEndDate ?? __props.previewData.current_plan?.period_end);
		const isReactivating = computed(() => isCancelled.value && reactivationVariant.value !== null && !!cancelAt.value && !!__props.previewData.current_plan);
		const currentMonthlyPriceCents = computed(() => {
			const current = __props.previewData.current_plan;
			if (!current) return 0;
			const totalCents = current.seat_summary.total_cost_cents;
			return currentIsYearly.value ? totalCents / 12 : totalCents;
		});
		const chargeCents = computed(() => __props.previewData.amount_due_cents ?? __props.previewData.cost_today_cents);
		const exceedsMonthlyThreshold = computed(() => isReactivating.value && reactivationVariant.value !== "downgrade" && chargeCents.value > currentMonthlyPriceCents.value);
		const chargeDisplay = computed(() => `$${formatUsdFromCents(chargeCents.value)}`);
		const reactivationConfirmed = ref(false);
		watch(() => __props.previewData, () => {
			reactivationConfirmed.value = false;
		});
		const confirmDisabled = computed(() => !__props.subscriptionLoaded || exceedsMonthlyThreshold.value && !reactivationConfirmed.value);
		const confirmBlocked = computed(() => confirmDisabled.value || !quoteIsUsable.value || verificationRecoveryActive.value);
		const confirmReactivation = computed(() => isReactivating.value && (!exceedsMonthlyThreshold.value || reactivationConfirmed.value));
		const bannerTitle = computed(() => reactivationVariant.value === "duration_change" && newIsYearly.value ? __props.copy.reactivation.titleAnnual : __props.copy.reactivation.title);
		const bannerBody = computed(() => {
			const bodies = nextPaymentDate.value === void 0 ? __props.copy.reactivation.withoutRenewalDate : __props.copy.reactivation;
			switch (reactivationVariant.value) {
				case "upgrade": return bodies.upgradeBody;
				case "downgrade": return bodies.downgradeBody;
				case "duration_change": return newIsYearly.value ? bodies.durationChangeBody : bodies.durationChangeBodyMonthly;
				default: return "";
			}
		});
		const bannerSegments = computed(() => splitPlaceholders(bannerBody.value, [
			"plan",
			"date",
			"newPlan",
			"nextDate",
			"amount"
		]).map((segment) => {
			if (segment.kind === "text") return {
				text: segment.text,
				emphasis: false
			};
			if (segment.key === "amount") return {
				text: chargeDisplay.value,
				emphasis: true
			};
			return {
				text: bannerValues.value[segment.key],
				emphasis: false
			};
		}));
		const newMonthlyUsd = computed(() => {
			const cents = __props.previewData.new_plan.price_cents;
			return (newIsYearly.value ? cents / 12 : cents) / 100;
		});
		const heroPrice = computed(() => newMonthlyUsd.value.toFixed(0));
		const annualTotalFormatted = computed(() => `$${formatNumber(__props.previewData.new_plan.price_cents / 100, __props.locale)}`);
		const refillCredits = computed(() => formatNumber(newIsYearly.value ? __props.plan.monthlyCredits * 12 : __props.plan.monthlyCredits, __props.locale));
		const refillLabel = computed(() => {
			if (isImmediate.value) return newIsYearly.value ? __props.copy.creditsYoullGetToday : __props.copy.eachMonthCreditsRefill;
			return newIsYearly.value ? __props.copy.eachYearCreditsRefill : __props.copy.creditsRefillMonthlyTo;
		});
		const billedLabel = computed(() => newIsYearly.value ? __props.copy.billedYearly(annualTotalFormatted.value) : __props.copy.billedMonthly);
		const planDetails = computed(() => isImmediate.value ? [billedLabel.value, __props.copy.switchesToday] : [__props.copy.startsOn(effectiveDateLabel.value)]);
		const refillNote = computed(() => {
			if (isImmediate.value) return newIsYearly.value ? __props.copy.refillReplacesNote : "";
			return newIsYearly.value ? __props.copy.billedYearly(annualTotalFormatted.value) : __props.copy.billedEachMonth(`$${formatNumber(newMonthlyUsd.value, __props.locale)}`);
		});
		const totalClass = computed(() => cn("flex flex-col gap-2 border-t border-border-subtle pt-6", !isImmediate.value && "mt-10"));
		const discounts = computed(() => isImmediate.value ? (__props.previewData.discounts ?? []).map((discount) => ({
			key: `${discount.kind}:${discount.code}`,
			label: __props.copy.discount[discount.kind],
			name: discount.name || discount.code,
			amount: discount.amount_off_cents ? `$${formatUsdFromCents(discount.amount_off_cents)}` : ""
		})) : []);
		const effectiveDateLabel = computed(() => formatDate(__props.previewData.effective_at));
		const nextPaymentDate = computed(() => {
			const renewsAt = resolveRenewalDate(__props.previewData);
			return renewsAt ? formatDate(renewsAt) : void 0;
		});
		const bannerValues = computed(() => ({
			plan: __props.currentPlanName,
			date: cancelAt.value ? formatDate(cancelAt.value) : "",
			newPlan: __props.plan.name,
			nextDate: nextPaymentDate.value ?? ""
		}));
		const confirmTitle = computed(() => isImmediate.value ? __props.copy.confirmUpgradeTitle : __props.copy.confirmChangeTitle);
		const confirmCta = computed(() => {
			if (!isReactivating.value) return isImmediate.value ? __props.copy.confirmUpgradeCta : __props.copy.confirmChange;
			if (reactivationVariant.value === "downgrade") return __props.copy.reactivation.confirmButton;
			return __props.copy.reactivation.confirmButtonWithCharge(chargeDisplay.value);
		});
		const amountDueToday = computed(() => formatAmountDueToday(__props.previewData, __props.locale) || __props.copy.quoteUnavailable);
		const renewalTerms = computed(() => {
			const amount = formatRenewalAmount(__props.previewData, __props.locale);
			if (!amount) return __props.copy.quoteUnavailable;
			const renewsAt = resolveRenewalDate(__props.previewData);
			if (!renewsAt) return __props.copy.renewsAtAmount(amount);
			return __props.copy.renewsAt(amount, formatDate(renewsAt));
		});
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", _hoisted_1$1, [createBaseVNode("div", null, [
				createBaseVNode("div", _hoisted_2$1, [
					createVNode(CheckoutButton_default, {
						size: "icon",
						variant: "muted-textonly",
						class: "shrink-0 rounded-full",
						"aria-label": __props.copy.back,
						disabled: interactionLocked.value,
						onClick: _cache[0] || (_cache[0] = ($event) => emit("back"))
					}, {
						default: withCtx(() => [..._cache[6] || (_cache[6] = [createBaseVNode("i", { class: "pi pi-arrow-left text-base" }, null, -1)])]),
						_: 1
					}, 8, ["aria-label", "disabled"]),
					createBaseVNode("h2", _hoisted_3$1, toDisplayString(confirmTitle.value), 1),
					_cache[7] || (_cache[7] = createBaseVNode("div", {
						class: "size-8 shrink-0",
						"aria-hidden": "true"
					}, null, -1))
				]),
				isReactivating.value ? (openBlock(), createBlock(CheckoutReactivationBanner_default, {
					key: 0,
					confirmed: reactivationConfirmed.value,
					"onUpdate:confirmed": _cache[1] || (_cache[1] = ($event) => reactivationConfirmed.value = $event),
					title: bannerTitle.value,
					segments: bannerSegments.value,
					"checkbox-label": exceedsMonthlyThreshold.value ? __props.copy.reactivation.checkboxLabel(chargeDisplay.value) : null
				}, null, 8, [
					"confirmed",
					"title",
					"segments",
					"checkbox-label"
				])) : createCommentVNode("", true),
				createVNode(CheckoutTransitionSummary_default, {
					"plan-name": __props.plan.name,
					"hero-price": heroPrice.value,
					"usd-per-month": __props.copy.usdPerMonth,
					details: planDetails.value,
					heading: isImmediate.value ? "" : __props.copy.afterThat,
					"refill-label": refillLabel.value,
					"refill-credits": refillCredits.value,
					note: refillNote.value
				}, null, 8, [
					"plan-name",
					"hero-price",
					"usd-per-month",
					"details",
					"heading",
					"refill-label",
					"refill-credits",
					"note"
				]),
				createBaseVNode("div", { class: normalizeClass(totalClass.value) }, [
					discounts.value.length ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [createBaseVNode("div", _hoisted_4$1, [createBaseVNode("span", null, toDisplayString(__props.copy.discountComposition), 1)]), (openBlock(true), createElementBlock(Fragment, null, renderList(discounts.value, (discount) => {
						return openBlock(), createElementBlock("div", {
							key: discount.key,
							class: "flex items-center justify-between text-muted-foreground"
						}, [createBaseVNode("span", null, toDisplayString(discount.label), 1), createBaseVNode("span", _hoisted_5, [createTextVNode(toDisplayString(discount.name), 1), discount.amount ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [createTextVNode(" · −" + toDisplayString(discount.amount), 1)], 64)) : createCommentVNode("", true)])]);
					}), 128))], 64)) : createCommentVNode("", true),
					createBaseVNode("div", _hoisted_6, [createBaseVNode("span", _hoisted_7, toDisplayString(__props.copy.totalDueToday), 1), createBaseVNode("span", _hoisted_8, toDisplayString(amountDueToday.value), 1)]),
					createBaseVNode("span", _hoisted_9, toDisplayString(renewalTerms.value), 1)
				], 2),
				__props.embeddedCheckoutEnabled ? (openBlock(), createBlock(CheckoutPromotionCode_default, {
					key: 1,
					"applied-code": __props.previewData.promotion_code,
					disabled: interactionLocked.value,
					copy: __props.copy,
					onApply: _cache[2] || (_cache[2] = ($event) => emit("applyPromotionCode", $event)),
					onInvalidate: _cache[3] || (_cache[3] = ($event) => emit("invalidateQuote"))
				}, null, 8, [
					"applied-code",
					"disabled",
					"copy"
				])) : createCommentVNode("", true)
			]), createBaseVNode("div", _hoisted_10, [
				createVNode(CheckoutPaymentNotices_default, {
					"embedded-checkout-enabled": __props.embeddedCheckoutEnabled,
					"reconciliation-operation-id": __props.reconciliationOperationId,
					"authentication-state": __props.authenticationState,
					"authentication-error": __props.authenticationError,
					copy: __props.copy
				}, null, 8, [
					"embedded-checkout-enabled",
					"reconciliation-operation-id",
					"authentication-state",
					"authentication-error",
					"copy"
				]),
				verificationUrl.value ? (openBlock(), createBlock(CheckoutVerificationPrompt_default, {
					key: 0,
					"action-url": verificationUrl.value,
					copy: __props.copy
				}, null, 8, ["action-url", "copy"])) : createCommentVNode("", true),
				__props.paymentCancelable ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [createVNode(CheckoutButton_default, {
					variant: "secondary",
					size: "lg",
					class: "w-full rounded-lg",
					loading: __props.cancelingPayment,
					onClick: _cache[4] || (_cache[4] = ($event) => emit("cancelPayment"))
				}, {
					default: withCtx(() => [createTextVNode(toDisplayString(__props.copy.cancelPaymentAndRetry), 1)]),
					_: 1
				}, 8, ["loading"]), __props.cancelPaymentError ? (openBlock(), createElementBlock("p", _hoisted_11, toDisplayString(__props.cancelPaymentError), 1)) : createCommentVNode("", true)], 64)) : createCommentVNode("", true),
				createVNode(CheckoutButton_default, {
					variant: __props.actionUrl ? "tertiary" : "inverted",
					size: "lg",
					class: "w-full rounded-lg",
					loading: __props.isLoading,
					disabled: confirmBlocked.value,
					onClick: _cache[5] || (_cache[5] = ($event) => emit("confirm", confirmReactivation.value))
				}, {
					default: withCtx(() => [createTextVNode(toDisplayString(confirmCta.value), 1)]),
					_: 1
				}, 8, [
					"variant",
					"loading",
					"disabled"
				]),
				createVNode(CheckoutTermsNote_default, {
					class: "mt-2",
					copy: __props.copy.terms
				}, null, 8, ["copy"])
			])]);
		};
	}
});
//#endregion
//#region src/platform/cloud/subscription/constants/teamPlanCreditStops.ts
/**
* Team-plan credit-subscription slider stops — OSS / pre-deploy fallback.
*
* The live set comes from `GET /api/billing/plans → team_credit_stops` (mapped
* via `mapApiTeamCreditStops`); these hardcoded DES-197 breakpoints render only
* when the API doesn't supply them. The slider snaps to exactly these 5 fixed
* breakpoints — the user cannot select a value in between. The `credits` figures
* equal `usdToCredits(usd)` at the current rate (`CREDITS_PER_USD = 211`); a unit
* test guards against rate drift silently changing the designed values.
*/
var TEAM_PLAN_CREDIT_STOPS = [
	{
		usd: 200,
		credits: 42200,
		discountPercentYearly: 0
	},
	{
		usd: 400,
		credits: 84400,
		discountPercentYearly: 5
	},
	{
		usd: 700,
		credits: 147700,
		discountPercentYearly: 10
	},
	{
		usd: 1400,
		credits: 295400,
		discountPercentYearly: 15
	},
	{
		usd: 2500,
		credits: 527500,
		discountPercentYearly: 20
	}
];
/**
* Per-credit Team plan slug for a billing cadence (cloud catalog). The slug
* encodes the cadence; `POST /api/billing/subscribe` reads `plan_slug` +
* `team_credit_stop_id` and resolves all amounts server-side from the stop.
*/
function getTeamPlanSlug(billingCycle) {
	return billingCycle === "yearly" ? "team_per_credit_annual" : "team_per_credit_monthly";
}
//#endregion
//#region src/platform/workspace/utils/workspaceCheckoutTelemetry.ts
function trackWorkspaceCheckoutStarted({ tier, cycle, checkoutType, billingOpId, paymentIntentSource }) {
	const { userId } = useAuthStore();
	if (!userId) return;
	useTelemetry()?.trackBeginCheckout({
		user_id: userId,
		tier,
		cycle,
		checkout_type: checkoutType,
		billing_op_id: billingOpId,
		...paymentIntentSource ? { payment_intent_source: paymentIntentSource } : {}
	});
}
//#endregion
//#region src/platform/workspace/composables/useSubscriptionCheckout.ts
var BILLING_PORTAL_ORIGINS = /* @__PURE__ */ new Set(["https://billing.stripe.com", "https://checkout.comfy.org"]);
function parseBillingPortalUrl(url) {
	if (typeof url !== "string") return null;
	try {
		const portalUrl = new URL(url);
		return BILLING_PORTAL_ORIGINS.has(portalUrl.origin) ? portalUrl : null;
	} catch {
		return null;
	}
}
var stopPaymentRecoveryReturnRefresh = null;
function armPaymentRecoveryReturnRefresh() {
	stopPaymentRecoveryReturnRefresh?.();
	const { fetchStatus } = useBillingContext();
	stopPaymentRecoveryReturnRefresh = registerRefreshOnReturn(fetchStatus);
}
/** Thrown by `assertReactivationAmountUnchanged` when a fresh preview no
*  longer matches the billing state the reactivation banner showed and the
*  user consented to. Caught by the surrounding try/catch and surfaced
*  through the same toast as any other subscribe failure. */
var ReactivationAmountChangedError = class extends Error {};
function findPlanSlug(plans, tierKey, billingCycle) {
	const apiDuration = billingCycle === "yearly" ? "ANNUAL" : "MONTHLY";
	const apiTier = tierKey.toUpperCase();
	return plans.find((p) => p.tier === apiTier && p.duration === apiDuration)?.slug ?? null;
}
function useSubscriptionCheckout(emit, paymentIntentSource, { tierPlanType = "personal", embeddedCheckoutEnabled = false } = {}) {
	const { t } = useI18n();
	const toast = useToast();
	const { subscribe, previewSubscribe, plans, fetchPlans, fetchStatus, isTeamPlan, resubscribe, subscription } = useBillingContext();
	const { shouldUseWorkspaceBilling } = useBillingRouting();
	const { canSubscribeSelfServe, canChangeSeats, canDowngradeToPersonal } = useBillingCapabilities();
	const { permissions, canReactivatePlan } = useWorkspaceUI();
	const telemetry = useTelemetry();
	const billingOperationStore = useBillingOperationStore();
	const workspaceStore = useTeamWorkspaceStore();
	const subscriptionRail = useSubscriptionRail();
	const checkoutStep = ref("pricing");
	const isLoadingPreview = ref(false);
	const loadingTier = ref(null);
	const isSubscribing = ref(false);
	const isApplyingPromotionCode = ref(false);
	const isResubscribing = ref(false);
	const previewData = ref(null);
	const quoteIsCurrent = ref(false);
	const savedPaymentMethods = ref([]);
	const selectedSavedPaymentMethodId = ref(null);
	const selectedTierKey = ref(null);
	const selectedTeamCheckout = ref(null);
	let teamPreviewRequestId = 0;
	let promotionPreviewRequestId = 0;
	let checkoutMutationOwner = 0;
	let checkoutMutationSeq = 0;
	let activeCheckoutAttemptStartedAt;
	let lastEmittedPreviewRevision;
	onScopeDispose(() => toast.removeGroup("payment-recovery"));
	useCheckoutJourneyExit();
	const reactivationRequired = ref(false);
	const selectedBillingCycle = ref("yearly");
	const activeCheckoutOperationId = ref(null);
	const activeCheckoutOperation = computed(() => {
		const operationId = activeCheckoutOperationId.value;
		if (!operationId) return subscriptionRail?.subscriptionActionOperation ?? billingOperationStore.subscriptionActionOperation;
		const operation = subscriptionRail?.getOperation(operationId) ?? billingOperationStore.getOperation(operationId);
		return operation?.workspaceId === workspaceStore.activeWorkspaceId ? operation : void 0;
	});
	const activeCheckoutActionUrl = computed(() => activeCheckoutOperation.value?.actionUrl ?? subscriptionRail?.subscriptionActionUrl ?? null);
	const parkedCheckoutRecovery = computed(() => activeCheckoutOperation.value?.phase === "awaiting_payment_method");
	const authenticationState = computed(() => activeCheckoutOperation.value?.authenticationState ?? null);
	const authenticationError = computed(() => activeCheckoutOperation.value?.errorMessage ?? null);
	const reconciliationOperationId = computed(() => activeCheckoutOperation.value?.status === "reconciliation_needed" ? activeCheckoutOperation.value.opId : null);
	const isPolling = computed(() => {
		const operation = activeCheckoutOperation.value;
		if (!operation) return false;
		if (operation.status === "succeeded") return true;
		if (operation.status !== "pending") return false;
		if (operation.isAuthenticating) return true;
		if (operation.phase === "awaiting_payment_method") return false;
		return operation.authenticationState !== "failed_retryable" && operation.authenticationState !== "requires_action";
	});
	const cancelablePaymentId = computed(() => {
		const opId = activeCheckoutOperation.value?.opId;
		return opId && subscriptionRail?.getOperation(opId)?.cancelable ? opId : null;
	});
	const paymentCancelable = computed(() => cancelablePaymentId.value !== null);
	const isCancelingPayment = ref(false);
	const cancelPaymentError = ref(null);
	async function cancelPayment() {
		const opId = cancelablePaymentId.value;
		if (!opId || !subscriptionRail || isCancelingPayment.value) return;
		isCancelingPayment.value = true;
		cancelPaymentError.value = null;
		const outcome = await subscriptionRail.cancelOperation(opId);
		isCancelingPayment.value = false;
		if (outcome.status === "error") cancelPaymentError.value = outcome.error.message;
		else if (outcome.status === "unavailable") cancelPaymentError.value = t("billingOperation.cancelPaymentFailed");
	}
	function beginCheckoutMutation() {
		if (checkoutMutationOwner !== 0) return 0;
		checkoutMutationOwner = ++checkoutMutationSeq;
		return checkoutMutationOwner;
	}
	function finishCheckoutMutation(token) {
		if (token !== 0 && checkoutMutationOwner === token) checkoutMutationOwner = 0;
	}
	const selectedTeamStop = computed(() => selectedTeamCheckout.value?.stop ?? null);
	const isTeamCheckout = computed(() => selectedTeamCheckout.value !== null);
	function isSubscriptionCancelled() {
		return subscription.value?.isCancelled ?? false;
	}
	function previewRequiresReactivation(preview) {
		return preview?.requires_reactivation_confirmation ?? isSubscriptionCancelled();
	}
	function hasQuoteIdentity(preview) {
		return Boolean(preview.quote_id) && preview.quote_version !== void 0;
	}
	function installPreview(preview) {
		if (!preview.allowed) return false;
		previewData.value = preview;
		if (embeddedCheckoutEnabled) reactivationRequired.value = previewRequiresReactivation(preview);
		quoteIsCurrent.value = true;
		const journey = getActiveCheckoutJourney();
		if (journey) {
			const revision = hasQuoteIdentity(preview) ? `${preview.quote_id}:${preview.quote_version}` : void 0;
			if (revision === void 0 || revision !== lastEmittedPreviewRevision) {
				lastEmittedPreviewRevision = revision;
				trackCheckoutJourneyPhase(journey, {
					phase: "preview_ready",
					...revision !== void 0 && { preview_revision: revision }
				});
			}
		}
		return true;
	}
	function requiresReactivationConfirmation() {
		if (embeddedCheckoutEnabled) return previewRequiresReactivation(previewData.value);
		return isSubscriptionCancelled() || reactivationRequired.value;
	}
	function subscribeAcceptsSavedMethod() {
		return !previewData.value || previewData.value.transition_type === "new_subscription";
	}
	function buildPaymentOptions(quote, confirmationToken, promotionCode) {
		return {
			...confirmationToken && { confirmationToken },
			...!confirmationToken && subscribeAcceptsSavedMethod() && selectedSavedPaymentMethodId.value && { savedPaymentMethodId: selectedSavedPaymentMethodId.value },
			promotionCode: quote?.promotion_code ?? promotionCode,
			...quote && hasQuoteIdentity(quote) && {
				quoteId: quote.quote_id,
				quoteVersion: quote.quote_version
			}
		};
	}
	async function loadSavedPaymentMethods() {
		if (!embeddedCheckoutEnabled || !shouldUseWorkspaceBilling.value) return;
		try {
			const rail = useBillingReadRail();
			const methods = rail === null ? await workspaceApi.listSavedPaymentMethods() : await readOnRail(rail.readPaymentMethods);
			if (methods === void 0) return;
			savedPaymentMethods.value = methods;
			selectedSavedPaymentMethodId.value = methods.find((method) => method.is_default)?.id ?? null;
		} catch {
			savedPaymentMethods.value = [];
			selectedSavedPaymentMethodId.value = null;
		}
	}
	function invalidateQuote() {
		quoteIsCurrent.value = false;
	}
	function withCurrentPromotion(options = {}) {
		const promotionCode = previewData.value?.promotion_code;
		return {
			...options,
			...promotionCode && { promotionCode }
		};
	}
	function notifyReactivationConfirmationRequired() {
		toast.add({
			severity: "error",
			summary: t("g.error"),
			detail: t("subscription.preview.reactivation.confirmationRequired")
		});
	}
	function isExistingPlanPreview(preview) {
		return !!preview?.allowed && preview.transition_type !== "new_subscription";
	}
	function isReactivationCapablePreview(preview) {
		return isExistingPlanPreview(preview) && !!preview.current_plan && !!(subscription.value?.endDate ?? preview.current_plan.period_end);
	}
	function isUsableTeamPreview(preview, checkoutType) {
		if (isSubscriptionCancelled()) return isReactivationCapablePreview(preview);
		return checkoutType === "change" ? isExistingPlanPreview(preview) : Boolean(preview?.allowed);
	}
	function reactivationMaterialSnapshot(preview, ignoreTimeDerivedTodayValues = false) {
		const planSnapshot = (plan) => {
			if (!plan) return null;
			const { seat_summary: seatSummary } = plan;
			return [
				plan.slug,
				plan.tier,
				plan.duration,
				plan.price_cents,
				plan.credits_cents,
				seatSummary?.seat_count,
				seatSummary?.total_cost_cents,
				seatSummary?.total_credits_cents,
				plan.period_start,
				plan.period_end
			];
		};
		return JSON.stringify([
			preview.allowed,
			preview.transition_type,
			preview.is_immediate,
			preview.is_immediate ? null : preview.effective_at,
			preview.cost_next_period_cents,
			ignoreTimeDerivedTodayValues ? null : preview.credits_today_cents,
			preview.credits_next_period_cents,
			planSnapshot(preview.current_plan),
			planSnapshot(preview.new_plan)
		]);
	}
	async function assertReactivationAmountUnchanged(planSlug, options) {
		const confirmedPreview = previewData.value;
		const freshPreview = await previewSubscribe(planSlug, withCurrentPromotion(options));
		if (!freshPreview?.allowed) throw new Error(freshPreview?.reason || t("subscription.subscribeFailed"));
		if (confirmedPreview?.proration_at) {
			const isImmediateTransition = confirmedPreview.is_immediate;
			const amountChanged = isImmediateTransition ? freshPreview.cost_today_cents > confirmedPreview.cost_today_cents : freshPreview.cost_today_cents !== confirmedPreview.cost_today_cents;
			const materialChanged = reactivationMaterialSnapshot(freshPreview, isImmediateTransition) !== reactivationMaterialSnapshot(confirmedPreview, isImmediateTransition);
			if (amountChanged || materialChanged) {
				installPreview(freshPreview);
				throw new ReactivationAmountChangedError(t(amountChanged ? "subscription.preview.reactivation.amountChanged" : "subscription.preview.reactivation.confirmationRequired"));
			}
			return;
		}
		const amountChanged = freshPreview.cost_today_cents !== (confirmedPreview?.cost_today_cents ?? 0);
		const materialChanged = !!confirmedPreview && reactivationMaterialSnapshot(freshPreview) !== reactivationMaterialSnapshot(confirmedPreview);
		installPreview(freshPreview);
		if (amountChanged || materialChanged) throw new ReactivationAmountChangedError(t(amountChanged ? "subscription.preview.reactivation.amountChanged" : "subscription.preview.reactivation.confirmationRequired"));
	}
	function hasErrorCode(error, code) {
		return typeof error === "object" && error !== null && "code" in error && error.code === code;
	}
	/**
	* The portal URL for recovery, from whichever rail owns the subscription.
	* An `unavailable` route is not deployed here, so the legacy client answers;
	* a failure throws into the caller's catch, where a legacy throw already
	* lands.
	*/
	async function readPaymentPortalUrl(returnUrl) {
		if (subscriptionRail) {
			const outcome = await subscriptionRail.openPaymentPortal(returnUrl);
			if (outcome.status === "ok") return {
				url: outcome.value,
				billingClient: "sdk"
			};
			if (outcome.status === "error") throw outcome.error;
		}
		const { url } = await workspaceApi.getPaymentPortalUrl(returnUrl);
		return {
			url,
			billingClient: "legacy"
		};
	}
	async function recoverOutstandingPayment(error, isCurrent = () => true) {
		const readRail = useBillingReadRail();
		const hasPaymentRecoveryCode = hasErrorCode(error, "SUBSCRIPTION_PAYMENT_REQUIRED") || hasErrorCode(error, "OUTSTANDING_PAYMENT_REQUIRED");
		let requiresRecovery = hasPaymentRecoveryCode;
		if (!requiresRecovery && hasErrorCode(error, "TRANSITION_NOT_ALLOWED")) try {
			const status = readRail === null ? await workspaceApi.getBillingStatus() : await readOnRail(readRail.readStatus);
			requiresRecovery = status?.billing_status === "payment_failed" || status?.billing_status === "paused";
		} catch {
			return null;
		}
		if (!requiresRecovery || !isCurrent()) return null;
		const portal = createBillingPortalReporter(telemetry, "payment_recovery");
		let billingClient;
		try {
			const portalResponse = await readPaymentPortalUrl(`${globalThis.location.origin}${globalThis.location.pathname}`);
			billingClient = portalResponse.billingClient;
			const portalUrl = parseBillingPortalUrl(portalResponse.url);
			if (!isCurrent()) return null;
			if (!portalUrl) throw new Error(t("toastMessages.failedToAccessBillingPortal", { error: t("toastMessages.invalidBillingPortalUrl") }));
			if (!window.open(portalUrl.href, "_blank")) {
				portal.blocked(billingClient);
				toast.add({
					group: "payment-recovery",
					severity: "warn",
					summary: t("g.warning"),
					detail: {
						text: t("subscription.preview.paymentPopupBlocked"),
						actionLabel: t("subscription.planLoadErrorRetry"),
						onAction: () => {
							if (!isCurrent()) return;
							if (window.open(portalUrl.href, "_blank")) portal.opened(billingClient);
							else portal.blocked(billingClient);
							armPaymentRecoveryReturnRefresh();
						}
					}
				});
				return "blocked";
			}
			portal.opened(billingClient);
			armPaymentRecoveryReturnRefresh();
			return "opened";
		} catch (portalError) {
			if (!isCurrent()) return null;
			portal.failed(portalError, billingClient);
			reportError(portalError, {
				surface: "workspace",
				errorType: "billing_portal_open_failure"
			});
			showSubscribeError(hasPaymentRecoveryCode ? error : portalError);
			return "failed";
		}
	}
	async function refreshExpiredProrationQuote(error, planSlug, options) {
		if (!hasErrorCode(error, "PRORATION_QUOTE_EXPIRED")) return false;
		let freshPreview;
		try {
			freshPreview = await previewSubscribe(planSlug, withCurrentPromotion(options));
		} catch (previewError) {
			if (!await recoverOutstandingPayment(previewError)) showSubscribeError(previewError);
			return true;
		}
		if (!isReactivationCapablePreview(freshPreview)) {
			resetToPricing();
			toast.add({
				severity: "error",
				summary: t("g.error"),
				detail: t("subscription.preview.reactivation.unavailable")
			});
			return true;
		}
		const amountChanged = !previewData.value || amountDueTodayChanged(previewData.value, freshPreview);
		installPreview(freshPreview);
		toast.add({
			severity: "error",
			summary: t("g.error"),
			detail: t(amountChanged ? "subscription.preview.reactivation.amountChanged" : "subscription.preview.reactivation.confirmationRequired")
		});
		return true;
	}
	async function refreshPreviewOnReactivationBlock(planSlug, options) {
		let freshPreview = null;
		try {
			freshPreview = await previewSubscribe(planSlug, withCurrentPromotion(options));
		} catch (error) {
			const recovery = await recoverOutstandingPayment(error);
			if (recovery === "failed") resetToPricing();
			if (recovery) return true;
		}
		if (freshPreview?.requires_reactivation_confirmation !== false && isReactivationCapablePreview(freshPreview)) {
			installPreview(freshPreview);
			reactivationRequired.value = true;
			notifyReactivationConfirmationRequired();
			return true;
		}
		if (freshPreview?.allowed && freshPreview.transition_type === "new_subscription" && !isSubscriptionCancelled() && !previewRequiresReactivation(freshPreview)) {
			const amountChanged = !!previewData.value && amountDueTodayChanged(previewData.value, freshPreview);
			installPreview(freshPreview);
			if (!amountChanged) return false;
			toast.add({
				severity: "error",
				summary: t("g.error"),
				detail: t("subscription.preview.reactivation.amountChanged")
			});
			return true;
		}
		reactivationRequired.value = false;
		resetToPricing();
		toast.add({
			severity: "error",
			summary: t("g.error"),
			detail: t("subscription.preview.reactivation.unavailable")
		});
		return true;
	}
	function canSelectTierPlan() {
		return tierPlanType === "team" || !isTeamPlan.value || permissions.value.canDowngradeToPersonal;
	}
	function canPerformCheckout(checkoutType) {
		return permissions.value.canManageSubscription;
	}
	function needsTeamToPersonalDowngrade() {
		return tierPlanType !== "team" && isTeamPlan.value;
	}
	async function showTeamToPersonalDowngrade(planSlug, tierKey) {
		const { useDialogService } = await __vitePreload(async () => {
			const { useDialogService } = await import("./dialogService-BzdVxI_V.js");
			return { useDialogService };
		}, __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62]), import.meta.url);
		const result = await useDialogService().showDowngradeToPersonalDialog({
			planName: t(`subscription.tiers.${tierKey}.name`),
			planSlug,
			paymentIntentSource
		});
		if (!result) return;
		previewData.value = result.preview;
		trackWorkspaceCheckoutStarted({
			tier: tierKey,
			cycle: selectedBillingCycle.value,
			checkoutType: "change",
			billingOpId: result.response.billing_op_id,
			paymentIntentSource
		});
		await handleSubscribeResponse(result.response, {
			tier: tierKey,
			cycle: selectedBillingCycle.value,
			checkoutType: "change"
		}, false);
	}
	const previewVariant = computed(() => {
		if (selectedTeamCheckout.value) return selectedTeamCheckout.value.checkoutType === "change" || previewData.value && previewData.value.transition_type !== "new_subscription" ? "team-change" : "team-new";
		if (previewData.value) return previewData.value.transition_type === "new_subscription" ? "personal-new" : "personal-change";
		return null;
	});
	function getApiPlanSlug(tierKey, billingCycle) {
		return findPlanSlug(plans.value, tierKey, billingCycle);
	}
	async function handleSubscribeClick(payload) {
		if (isSubscribing.value || !canSelectTierPlan() || (isTeamPlan.value && tierPlanType !== "team" ? !permissions.value.canDowngradeToPersonal : false)) return;
		telemetry?.trackBillingEvent({
			operation: "subscription_checkout",
			stage: "intent",
			outcome: "pending",
			tier: payload.tierKey,
			cycle: payload.billingCycle,
			payment_intent_source: paymentIntentSource
		});
		const { tierKey, billingCycle } = payload;
		promotionPreviewRequestId += 1;
		reactivationRequired.value = false;
		isLoadingPreview.value = true;
		loadingTier.value = tierKey;
		selectedTierKey.value = tierKey;
		selectedBillingCycle.value = billingCycle;
		const enteredJourney = enterCheckoutJourney(`${tierKey}:${billingCycle}`);
		try {
			let planSlug = getApiPlanSlug(tierKey, billingCycle);
			if (!planSlug) {
				await fetchPlans();
				planSlug = getApiPlanSlug(tierKey, billingCycle);
			}
			if (!planSlug) {
				toast.add({
					severity: "error",
					summary: "Unable to subscribe",
					detail: "This plan is not available"
				});
				return;
			}
			if (needsTeamToPersonalDowngrade()) {
				await showTeamToPersonalDowngrade(planSlug, tierKey);
				return;
			}
			if (openHostedBillingTab("checkout", {
				plan: planSlug,
				source: paymentIntentSource,
				journeyId: enteredJourney?.journey_id
			})) {
				handOffCheckoutJourney();
				emit("close", false);
				return;
			}
			const response = embeddedCheckoutEnabled ? (await Promise.all([previewSubscribe(planSlug), loadSavedPaymentMethods()]))[0] : await previewSubscribe(planSlug);
			if (!response || !response.allowed) {
				const journey = getActiveCheckoutJourney();
				if (journey) trackCheckoutJourneyPhase(journey, {
					phase: "preview_failed",
					failure_category: "unknown"
				});
				toast.add({
					severity: "error",
					summary: "Unable to subscribe",
					detail: response?.reason || "This plan is not available"
				});
				return;
			}
			if (!canPerformCheckout(response.transition_type === "new_subscription" ? "new" : "change")) return;
			installPreview(response);
			checkoutStep.value = "preview";
		} catch (error) {
			if (await recoverOutstandingPayment(error)) return;
			const journey = getActiveCheckoutJourney();
			if (journey) trackCheckoutJourneyPhase(journey, {
				phase: "preview_failed",
				failure_category: categorizeBillingApiError(error)
			});
			const message = error instanceof Error ? error.message : "Failed to load subscription preview";
			toast.add({
				severity: "error",
				summary: "Error",
				detail: message
			});
		} finally {
			isLoadingPreview.value = false;
			loadingTier.value = null;
		}
	}
	/**
	* Team-plan checkout entry. A fresh subscribe has nothing to prorate and shows
	* the display-only "Confirm your payment" step. An existing subscriber changing
	* their credit commitment gets a prorated transition preview when the backend
	* can describe it; until `preview-subscribe` accepts a team stop the attempt
	* falls back to the same display-only step.
	*/
	async function handleSubscribeTeamClick(payload) {
		const checkoutType = payload.isChange ? "change" : "new";
		if (isSubscribing.value || !canPerformCheckout(checkoutType)) return;
		telemetry?.trackBillingEvent({
			operation: "subscription_checkout",
			stage: "intent",
			outcome: "pending",
			tier: "team",
			cycle: payload.billingCycle,
			checkout_type: checkoutType,
			payment_intent_source: paymentIntentSource
		});
		const previewRequestId = ++teamPreviewRequestId;
		promotionPreviewRequestId += 1;
		reactivationRequired.value = false;
		selectedTeamCheckout.value = {
			stop: payload.stop,
			checkoutType
		};
		selectedBillingCycle.value = payload.billingCycle;
		selectedTierKey.value = null;
		previewData.value = null;
		quoteIsCurrent.value = false;
		const enteredJourney = enterCheckoutJourney(`team:${payload.stop.id}:${payload.billingCycle}`);
		if (payload.stop.id && openHostedBillingTab("checkout", {
			plan: getTeamPlanSlug(payload.billingCycle),
			teamCreditStopId: payload.stop.id,
			source: paymentIntentSource,
			journeyId: enteredJourney?.journey_id
		})) {
			handOffCheckoutJourney();
			emit("close", false);
			return;
		}
		if (!embeddedCheckoutEnabled) {
			const teamCreditStopId = payload.stop.id;
			if (!teamCreditStopId) {
				toast.add({
					severity: "error",
					summary: t("subscription.teamPlan.name"),
					detail: t("subscription.teamPlan.unavailable")
				});
				resetToPricing();
				return;
			}
			isLoadingPreview.value = true;
			let response = null;
			let previewError;
			try {
				response = await previewSubscribe(getTeamPlanSlug(payload.billingCycle), { teamCreditStopId });
			} catch (error) {
				previewError = error;
				const recovery = await recoverOutstandingPayment(error, () => previewRequestId === teamPreviewRequestId);
				if (recovery === "failed") {
					resetToPricing();
					return;
				}
				if (recovery) return;
			} finally {
				if (previewRequestId === teamPreviewRequestId) isLoadingPreview.value = false;
			}
			if (previewRequestId !== teamPreviewRequestId) return;
			if (isUsableTeamPreview(response, checkoutType)) {
				installPreview(response);
				checkoutStep.value = "preview";
				return;
			}
			toast.add({
				severity: "error",
				summary: t("subscription.teamPlan.name"),
				detail: previewError instanceof Error ? previewError.message : response?.reason || t("subscription.subscribeFailed")
			});
			checkoutStep.value = "pricing";
			selectedTeamCheckout.value = null;
			return;
		}
		if (!payload.stop.id) return;
		isLoadingPreview.value = true;
		let response = null;
		let previewError;
		try {
			const planSlug = getTeamPlanSlug(payload.billingCycle);
			[response] = await Promise.all([previewSubscribe(planSlug, { teamCreditStopId: payload.stop.id }), loadSavedPaymentMethods()]);
		} catch (error) {
			previewError = error;
			const recovery = await recoverOutstandingPayment(error, () => previewRequestId === teamPreviewRequestId);
			if (recovery === "failed") {
				resetToPricing();
				return;
			}
			if (recovery) return;
		} finally {
			if (previewRequestId === teamPreviewRequestId) isLoadingPreview.value = false;
		}
		if (previewRequestId !== teamPreviewRequestId) return;
		if (response?.allowed && (response.requires_reactivation_confirmation === false || isReactivationCapablePreview(response))) {
			installPreview(response);
			checkoutStep.value = "preview";
			return;
		}
		toast.add({
			severity: "error",
			summary: t("subscription.teamPlan.name"),
			detail: previewError instanceof Error ? previewError.message : response?.reason || t("subscription.subscribeFailed")
		});
		checkoutStep.value = "pricing";
		selectedTeamCheckout.value = null;
	}
	function resetToPricing() {
		teamPreviewRequestId += 1;
		promotionPreviewRequestId += 1;
		isLoadingPreview.value = false;
		reactivationRequired.value = false;
		checkoutStep.value = "pricing";
		previewData.value = null;
		quoteIsCurrent.value = false;
		selectedTeamCheckout.value = null;
		activeCheckoutOperationId.value = null;
		activeCheckoutAttemptStartedAt = void 0;
		toast.removeGroup("payment-recovery");
	}
	function handleBackToPricing() {
		if (isPolling.value || isSubscribing.value) return;
		resetToPricing();
	}
	function handleSuccessClose() {
		emit("close", true);
	}
	async function handleSubscription(confirmReactivation = false, confirmationToken, promotionCode) {
		if (!canSelectTierPlan()) return;
		const mutationToken = beginCheckoutMutation();
		if (!mutationToken) return;
		const tierKey = selectedTierKey.value;
		if (!tierKey) {
			finishCheckoutMutation(mutationToken);
			return;
		}
		const billingCycle = selectedBillingCycle.value;
		const planSlug = getApiPlanSlug(tierKey, billingCycle);
		if (!planSlug) {
			finishCheckoutMutation(mutationToken);
			return;
		}
		const checkoutType = previewData.value && previewData.value.transition_type !== "new_subscription" ? "change" : "new";
		if (!canPerformCheckout(checkoutType)) {
			finishCheckoutMutation(mutationToken);
			return;
		}
		isSubscribing.value = true;
		try {
			if (needsTeamToPersonalDowngrade()) {
				await showTeamToPersonalDowngrade(planSlug, tierKey);
				return;
			}
			await fetchStatus();
			if (!confirmReactivation && requiresReactivationConfirmation()) {
				if (await refreshPreviewOnReactivationBlock(planSlug)) return;
			}
			const attemptStartedAt = trackSubscriptionStarted({
				tier: tierKey,
				cycle: billingCycle,
				checkoutType
			});
			if (confirmReactivation && requiresReactivationConfirmation()) await assertReactivationAmountUnchanged(planSlug);
			const quote = embeddedCheckoutEnabled ? previewData.value : null;
			if (embeddedCheckoutEnabled && quote && !quoteIsCurrent.value) throw new Error(t("subscription.preview.applyQuoteBeforeContinuing"));
			const submittingJourney = getActiveCheckoutJourney();
			if (submittingJourney) trackCheckoutJourneyPhase(submittingJourney, { phase: "submitted" });
			const response = await subscribe(planSlug, {
				...embeddedCheckoutEnabled && buildPaymentOptions(quote, confirmationToken, promotionCode),
				returnUrl: embeddedCheckoutEnabled ? paymentReturnUrl() : `${getComfyPlatformBaseUrl()}/payment/success`,
				cancelUrl: `${getComfyPlatformBaseUrl()}/payment/failed`,
				confirmReactivation,
				prorationAt: previewData.value?.is_immediate ? previewData.value.proration_at : void 0,
				attemptStartedAt
			});
			if (response) {
				linkSubmittingJourneyToOperation(submittingJourney, response.billing_op_id);
				trackWorkspaceCheckoutStarted({
					tier: tierKey,
					cycle: billingCycle,
					checkoutType,
					billingOpId: response.billing_op_id,
					paymentIntentSource
				});
			}
			await handleSubscribeResponse(response, {
				tier: tierKey,
				cycle: billingCycle,
				checkoutType,
				attemptStartedAt
			}, true, mutationToken);
			activeCheckoutAttemptStartedAt = void 0;
		} catch (error) {
			if (hasErrorCode(error, "REACTIVATION_CONFIRMATION_REQUIRED") && await refreshPreviewOnReactivationBlock(planSlug)) return;
			trackSubscriptionFailure({
				tier: tierKey,
				cycle: billingCycle,
				checkoutType,
				attemptStartedAt: activeCheckoutAttemptStartedAt
			}, error);
			activeCheckoutAttemptStartedAt = void 0;
			if (await recoverOutstandingPayment(error)) return;
			if (await refreshExpiredProrationQuote(error, planSlug)) return;
			if (embeddedCheckoutEnabled && await recoverStaleQuote(error)) return;
			showSubscribeError(error);
		} finally {
			isSubscribing.value = false;
			finishCheckoutMutation(mutationToken);
		}
	}
	const attemptErrorToasts = [];
	function showSubscribeError(error) {
		const message = {
			severity: "error",
			summary: t("g.error"),
			detail: error instanceof Error ? error.message : t("subscription.subscribeFailed")
		};
		attemptErrorToasts.push(message);
		toast.add(message);
	}
	watch(checkoutStep, (step) => {
		if (step !== "success") return;
		for (const message of attemptErrorToasts.splice(0)) toast.remove(message);
	});
	async function recoverStaleQuote(error) {
		if (!hasErrorCode(error, "SUBSCRIPTION_QUOTE_STALE")) return false;
		quoteIsCurrent.value = false;
		if (!await applyPromotionCode(previewData.value?.promotion_code ?? "", false, false)) {
			resetToPricing();
			toast.add({
				severity: "error",
				summary: t("g.error"),
				detail: t("subscription.preview.quoteRefreshFailed")
			});
			return true;
		}
		toast.add({
			severity: "error",
			summary: t("g.error"),
			detail: t("subscription.preview.quoteStale")
		});
		return true;
	}
	async function applyPromotionCode(promotionCode, showFailure = true, lockMutation = true) {
		if (!embeddedCheckoutEnabled) return false;
		const mutationToken = lockMutation ? beginCheckoutMutation() : 0;
		if (lockMutation && !mutationToken) return false;
		isApplyingPromotionCode.value = true;
		const requestId = ++promotionPreviewRequestId;
		const normalizedInput = promotionCode.trim();
		let planSlug;
		let options;
		if (selectedTeamCheckout.value?.stop.id) {
			planSlug = getTeamPlanSlug(selectedBillingCycle.value);
			options = {
				teamCreditStopId: selectedTeamCheckout.value.stop.id,
				...normalizedInput && { promotionCode: normalizedInput }
			};
		} else if (selectedTierKey.value) {
			planSlug = getApiPlanSlug(selectedTierKey.value, selectedBillingCycle.value);
			options = normalizedInput ? { promotionCode: normalizedInput } : {};
		} else {
			if (lockMutation) finishCheckoutMutation(mutationToken);
			isApplyingPromotionCode.value = false;
			return false;
		}
		if (!planSlug) {
			if (lockMutation) finishCheckoutMutation(mutationToken);
			isApplyingPromotionCode.value = false;
			return false;
		}
		quoteIsCurrent.value = false;
		try {
			const response = await previewSubscribe(planSlug, options);
			if (!response?.allowed) throw new Error(response?.reason || t("subscription.subscribeFailed"));
			if (requestId !== promotionPreviewRequestId) return false;
			installPreview(response);
			return true;
		} catch (error) {
			if (requestId !== promotionPreviewRequestId) return false;
			if (showFailure) showSubscribeError(error);
			return false;
		} finally {
			if (requestId === promotionPreviewRequestId) isApplyingPromotionCode.value = false;
			if (lockMutation) finishCheckoutMutation(mutationToken);
		}
	}
	function currentSubscriptionEntryFlow() {
		return subscription.value?.isActive && subscription.value.tier !== "FREE" ? "paid_upgrade" : "initial_subscription";
	}
	function enterCheckoutJourney(intent) {
		const workspaceId = workspaceStore.activeWorkspaceId;
		const ownerUid = useAuthStore().userId;
		if (!workspaceId || !ownerUid) return null;
		const entrySource = resolveEntrySource(paymentIntentSource, "pricing");
		const resolved = resolveCheckoutJourney({
			actorUid: ownerUid,
			workspaceId,
			entryFlow: currentSubscriptionEntryFlow(),
			entrySource,
			paymentIntentSource,
			intent: `${entrySource}:${intent}`,
			uiMode: embeddedCheckoutEnabled ? "embedded" : "hosted",
			assignment: resolveCheckoutAssignment(api.getServerFeatures())
		});
		if (resolved.status === "blocked") return null;
		if (!resolved.resumed) trackCheckoutJourneyPhase(resolved.record, { phase: "entered" });
		return resolved.record;
	}
	function linkSubmittingJourneyToOperation(submittingJourney, billingOpId) {
		if (!submittingJourney || getActiveCheckoutJourney()?.journey_id !== submittingJourney.journey_id) return;
		const linked = bindOperationToCheckoutJourney(billingOpId);
		if (linked) trackCheckoutJourneyPhase(linked, {
			phase: "operation_linked",
			billing_op_id: billingOpId
		});
	}
	function trackSubscriptionStarted(context) {
		if (activeCheckoutAttemptStartedAt !== void 0) return activeCheckoutAttemptStartedAt;
		if (!shouldUseWorkspaceBilling.value) return void 0;
		activeCheckoutAttemptStartedAt = Date.now();
		telemetry?.trackBillingEvent({
			operation: "subscription_checkout",
			stage: "started",
			outcome: "pending",
			tier: context.tier,
			cycle: context.cycle,
			checkout_type: context.checkoutType,
			payment_intent_source: paymentIntentSource
		});
		telemetry?.trackBillingEvent({
			operation: "operation",
			stage: "started",
			outcome: "pending",
			operation_type: "subscription",
			tier: context.tier,
			cycle: context.cycle,
			checkout_type: context.checkoutType,
			payment_intent_source: paymentIntentSource
		});
		return activeCheckoutAttemptStartedAt;
	}
	function trackSubscriptionFailure(context, error, errorCode) {
		if (context.attemptStartedAt === void 0) return;
		const failureCategory = errorCode ? "unknown" : categorizeBillingApiError(error);
		telemetry?.trackBillingEvent({
			operation: "subscription_checkout",
			stage: "failed",
			outcome: "failure",
			tier: context.tier,
			cycle: context.cycle,
			checkout_type: context.checkoutType,
			payment_intent_source: paymentIntentSource,
			failure_category: failureCategory,
			...errorCode && { error_code: errorCode },
			duration_ms: Date.now() - context.attemptStartedAt
		});
		if (error instanceof SettledOperationError) return;
		telemetry?.trackBillingEvent({
			operation: "operation",
			stage: "failed",
			outcome: "failure",
			operation_type: "subscription",
			tier: context.tier,
			cycle: context.cycle,
			checkout_type: context.checkoutType,
			payment_intent_source: paymentIntentSource,
			failure_category: failureCategory,
			...errorCode && { error_code: errorCode },
			duration_ms: Date.now() - context.attemptStartedAt
		});
	}
	async function handleSubscribeResponse(response, context, shouldTrackSubscriptionSuccess = true, mutationToken = 0) {
		if (!response) {
			trackSubscriptionFailure(context, void 0, "missing_checkout_response");
			return;
		}
		if (response.status === "subscribed") {
			if (shouldTrackSubscriptionSuccess && context.attemptStartedAt !== void 0) {
				const durationMs = Date.now() - context.attemptStartedAt;
				telemetry?.trackBillingEvent({
					operation: "subscription_checkout",
					stage: "succeeded",
					outcome: "success",
					tier: context.tier,
					cycle: context.cycle,
					checkout_type: context.checkoutType,
					payment_intent_source: paymentIntentSource,
					billing_op_id: response.billing_op_id,
					duration_ms: durationMs
				});
				if (!response.operationObserved) telemetry?.trackBillingEvent({
					operation: "operation",
					stage: "succeeded",
					outcome: "success",
					operation_type: "subscription",
					tier: context.tier,
					cycle: context.cycle,
					checkout_type: context.checkoutType,
					payment_intent_source: paymentIntentSource,
					billing_op_id: response.billing_op_id,
					duration_ms: durationMs
				});
				if (response.requiredPayment) telemetry?.trackMonthlySubscriptionSucceeded({
					tier: context.tier,
					cycle: context.cycle,
					checkout_type: context.checkoutType,
					payment_intent_source: paymentIntentSource,
					billing_op_id: response.billing_op_id
				});
			}
			if (response.requiredPayment) toast.add({
				severity: "success",
				summary: t("billingOperation.subscriptionSuccess"),
				life: 5e3
			});
			checkoutStep.value = "success";
			return;
		}
		savePendingCheckout(response.billing_op_id, context);
		let initialActionUrl;
		if (response.status === "needs_payment_method") {
			if (!response.payment_method_url) throw new Error(t("subscription.preview.stripeUnavailable"));
			initialActionUrl = response.payment_method_url;
			if (!window.open(initialActionUrl, "_blank")) {
				const paymentMethodUrl = initialActionUrl;
				const opId = response.billing_op_id;
				toast.add({
					group: "payment-recovery",
					severity: "warn",
					summary: t("g.warning"),
					detail: {
						text: t("subscription.preview.paymentPopupBlocked"),
						actionLabel: t("subscription.planLoadErrorRetry"),
						onAction: () => {
							if (activeCheckoutOperationId.value !== opId) return;
							window.open(paymentMethodUrl, "_blank");
						}
					}
				});
			}
		}
		await advanceToSuccessOnOperation(response.billing_op_id, context, initialActionUrl, mutationToken);
	}
	function savePendingCheckout(operationId, context) {
		const workspaceId = workspaceStore.activeWorkspaceId;
		const ownerUid = useAuthStore().userId;
		if (!workspaceId || !ownerUid) return;
		const attemptedAt = context.attemptStartedAt ?? Date.now();
		if (context.tier === "team") {
			const teamCreditStopId = selectedTeamCheckout.value?.stop.id;
			if (!teamCreditStopId) return;
			savePendingSubscriptionCheckout({
				operationId,
				workspaceId,
				ownerUid,
				selection: {
					planMode: "team",
					teamCreditStopId,
					billingCycle: context.cycle
				},
				attemptedAt
			});
			return;
		}
		savePendingSubscriptionCheckout({
			operationId,
			workspaceId,
			ownerUid,
			selection: {
				planMode: "personal",
				tierKey: context.tier,
				billingCycle: context.cycle
			},
			attemptedAt
		});
	}
	async function advanceToSuccessOnOperation(opId, context, initialActionUrl, mutationToken) {
		activeCheckoutOperationId.value = opId;
		const metadata = {
			tier: context.tier,
			cycle: context.cycle,
			checkoutType: context.checkoutType,
			paymentIntentSource,
			attemptStartedAt: context.attemptStartedAt,
			...embeddedCheckoutEnabled && {
				suppressProcessingToast: true,
				autoHandleRequiresAction: true
			}
		};
		const terminalOperation = initialActionUrl ? billingOperationStore.startOperation(opId, "subscription", metadata, initialActionUrl) : billingOperationStore.startOperation(opId, "subscription", metadata);
		isSubscribing.value = false;
		finishCheckoutMutation(mutationToken);
		const operation = await terminalOperation;
		clearPendingSubscriptionCheckoutIfTerminal(opId, operation.status);
		if (operation.status === "succeeded" && activeCheckoutOperationId.value === opId && operation.workspaceId === workspaceStore.activeWorkspaceId) checkoutStep.value = "success";
	}
	async function handleTeamSubscription(confirmReactivation = false, confirmationToken, promotionCode) {
		if (isLoadingPreview.value || isSubscribing.value || !selectedTeamCheckout.value || !canPerformCheckout(selectedTeamCheckout.value.checkoutType)) return;
		const mutationToken = beginCheckoutMutation();
		if (!mutationToken) return;
		const teamCheckout = selectedTeamCheckout.value;
		if (!teamCheckout.stop.id) {
			toast.add({
				severity: "error",
				summary: t("subscription.teamPlan.name"),
				detail: t("subscription.teamPlan.unavailable")
			});
			finishCheckoutMutation(mutationToken);
			return;
		}
		const { stop, checkoutType } = teamCheckout;
		const billingCycle = selectedBillingCycle.value;
		const planSlug = getTeamPlanSlug(billingCycle);
		isSubscribing.value = true;
		try {
			await fetchStatus();
			if (!confirmReactivation && requiresReactivationConfirmation()) {
				if (await refreshPreviewOnReactivationBlock(planSlug, { teamCreditStopId: stop.id })) return;
			}
			const attemptStartedAt = trackSubscriptionStarted({
				tier: "team",
				cycle: billingCycle,
				checkoutType
			});
			if (confirmReactivation && requiresReactivationConfirmation()) await assertReactivationAmountUnchanged(planSlug, { teamCreditStopId: stop.id });
			const quote = embeddedCheckoutEnabled ? previewData.value : null;
			if (embeddedCheckoutEnabled && quote && !quoteIsCurrent.value) throw new Error(t("subscription.preview.applyQuoteBeforeContinuing"));
			const submittingJourney = getActiveCheckoutJourney();
			if (submittingJourney) trackCheckoutJourneyPhase(submittingJourney, { phase: "submitted" });
			const response = await subscribe(planSlug, {
				...embeddedCheckoutEnabled && buildPaymentOptions(quote, confirmationToken, promotionCode),
				teamCreditStopId: stop.id,
				billingCycle,
				returnUrl: embeddedCheckoutEnabled ? paymentReturnUrl() : `${getComfyPlatformBaseUrl()}/payment/success`,
				cancelUrl: `${getComfyPlatformBaseUrl()}/payment/failed`,
				confirmReactivation,
				prorationAt: previewData.value?.is_immediate ? previewData.value.proration_at : void 0,
				attemptStartedAt
			});
			if (response) {
				linkSubmittingJourneyToOperation(submittingJourney, response.billing_op_id);
				trackWorkspaceCheckoutStarted({
					tier: "team",
					cycle: billingCycle,
					checkoutType,
					billingOpId: response.billing_op_id,
					paymentIntentSource
				});
			}
			await handleSubscribeResponse(response, {
				tier: "team",
				cycle: billingCycle,
				checkoutType,
				attemptStartedAt
			}, true, mutationToken);
			activeCheckoutAttemptStartedAt = void 0;
		} catch (error) {
			if (hasErrorCode(error, "REACTIVATION_CONFIRMATION_REQUIRED") && await refreshPreviewOnReactivationBlock(planSlug, { teamCreditStopId: stop.id })) return;
			trackSubscriptionFailure({
				tier: "team",
				cycle: billingCycle,
				checkoutType,
				attemptStartedAt: activeCheckoutAttemptStartedAt
			}, error);
			activeCheckoutAttemptStartedAt = void 0;
			if (await recoverOutstandingPayment(error)) return;
			if (await refreshExpiredProrationQuote(error, planSlug, { teamCreditStopId: stop.id })) return;
			if (embeddedCheckoutEnabled && await recoverStaleQuote(error)) return;
			showSubscribeError(error);
		} finally {
			isSubscribing.value = false;
			finishCheckoutMutation(mutationToken);
		}
	}
	async function handleResubscribe() {
		if (!canReactivatePlan.value) return;
		if (openHostedBillingTab("subscription", { source: paymentIntentSource })) {
			emit("close", false);
			return;
		}
		const source = "pricing_dialog";
		const startedAt = Date.now();
		const isWorkspaceResubscribe = shouldUseWorkspaceBilling.value;
		telemetry?.trackResubscribeClicked({
			source,
			payment_intent_source: paymentIntentSource
		});
		telemetry?.trackBillingEvent({
			operation: "resubscribe",
			stage: "started",
			outcome: "pending",
			source,
			payment_intent_source: paymentIntentSource
		});
		isResubscribing.value = true;
		try {
			await resubscribe({ source });
			if (isWorkspaceResubscribe) telemetry?.trackBillingEvent({
				operation: "resubscribe",
				stage: "succeeded",
				outcome: "success",
				source,
				payment_intent_source: paymentIntentSource,
				duration_ms: Date.now() - startedAt
			});
			toast.add({
				severity: "success",
				summary: t("subscription.resubscribeSuccess"),
				life: 5e3
			});
			emit("close", true);
		} catch (error) {
			const message = error instanceof Error ? error.message : "Failed to resubscribe";
			telemetry?.trackBillingEvent({
				operation: "resubscribe",
				stage: "failed",
				outcome: "failure",
				source,
				payment_intent_source: paymentIntentSource,
				failure_category: categorizeBillingApiError(error),
				...isWorkspaceResubscribe && { duration_ms: Date.now() - startedAt }
			});
			toast.add({
				severity: "error",
				summary: "Error",
				detail: message
			});
		} finally {
			isResubscribing.value = false;
		}
	}
	function handleSubscriptionPayment(confirmationToken, promotionCode) {
		return handleSubscription(false, confirmationToken, promotionCode);
	}
	function handleTeamSubscriptionPayment(confirmationToken, promotionCode) {
		return handleTeamSubscription(false, confirmationToken, promotionCode);
	}
	return {
		checkoutStep,
		isLoadingPreview,
		loadingTier,
		isSubscribing,
		isApplyingPromotionCode,
		isResubscribing,
		previewData,
		reactivationRequired,
		quoteIsCurrent,
		savedPaymentMethods,
		selectedSavedPaymentMethodId,
		selectedTierKey,
		selectedTeamStop,
		selectedBillingCycle,
		activeCheckoutActionUrl,
		authenticationState,
		authenticationError,
		reconciliationOperationId,
		parkedCheckoutRecovery,
		isPolling,
		paymentCancelable,
		isCancelingPayment,
		cancelPaymentError,
		cancelPayment,
		isTeamCheckout,
		previewVariant,
		handleSubscribeClick,
		handleSubscribeTeamClick,
		handleBackToPricing,
		handleSuccessClose,
		handleAddCreditCard: handleSubscription,
		handleConfirmTransition: handleSubscription,
		handleTeamSubscribe: handleTeamSubscription,
		handleSubscriptionPayment,
		handleTeamSubscriptionPayment,
		applyPromotionCode,
		invalidateQuote,
		handleResubscribe
	};
}
//#endregion
//#region src/platform/workspace/composables/useCheckoutCopy.ts
/**
* The app's translations and catalog for the shared checkout steps.
* Sentences that wrap an element around a placeholder keep their `{name}`
* tokens for the component to split.
*/
function useCheckoutCopy() {
	const { t } = useI18n();
	const keepTokens = (keys) => Object.fromEntries(keys.map((key) => [key, `{${key}}`]));
	const reactivationTokens = keepTokens([
		"plan",
		"date",
		"newPlan",
		"nextDate",
		"amount"
	]);
	const copy = computed(() => ({
		back: t("g.back"),
		usdPerMonth: t("subscription.usdPerMonth"),
		billedMonthly: t("subscription.billedMonthly"),
		billedYearly: (total) => t("subscription.billedYearly", { total }),
		eachMonthCreditsRefill: t("subscription.preview.eachMonthCreditsRefill"),
		eachYearCreditsRefill: t("subscription.preview.eachYearCreditsRefill"),
		totalDueToday: t("subscription.preview.totalDueToday"),
		renewsAt: (amount, date) => t("subscription.preview.renewsAt", {
			amount,
			date
		}),
		renewsAtAmount: (amount) => t("subscription.preview.renewsAtAmount", { amount }),
		discount: {
			plan: t("subscription.preview.discount.plan"),
			promotion: t("subscription.preview.discount.promotion")
		},
		promoCodePlaceholder: t("subscription.preview.promoCodePlaceholder"),
		applyPromoCode: t("subscription.preview.applyPromoCode"),
		reconciliationTitle: t("billingOperation.reconciliationTitle"),
		reconciliationDetail: t("billingOperation.reconciliationDetail"),
		authenticationFailedDetail: t("billingOperation.authenticationFailedDetail"),
		pendingVerificationDetail: t("subscription.preview.pendingVerificationDetail"),
		completeVerification: t("subscription.preview.completeVerification"),
		cancelPaymentAndRetry: t("subscription.preview.cancelPaymentAndRetry"),
		confirmPayment: t("subscription.preview.confirmPayment"),
		startingToday: t("subscription.preview.startingToday"),
		parkedCheckoutDetail: t("subscription.preview.parkedCheckoutDetail"),
		completePayment: t("subscription.preview.completePayment"),
		payAndSubscribe: t("subscription.preview.payAndSubscribe"),
		subscribeToPlan: (plan) => t("subscription.preview.subscribeToPlan", { plan }),
		confirmUpgradeTitle: t("subscription.preview.confirmUpgradeTitle"),
		confirmChangeTitle: t("subscription.preview.confirmChangeTitle"),
		switchesToday: t("subscription.preview.switchesToday"),
		startsOn: (date) => t("subscription.preview.startsOn", { date }),
		creditsYoullGetToday: t("subscription.preview.creditsYoullGetToday"),
		refillReplacesNote: t("subscription.preview.refillReplacesNote"),
		afterThat: t("subscription.preview.afterThat"),
		creditsRefillMonthlyTo: t("subscription.preview.creditsRefillMonthlyTo"),
		billedEachMonth: (amount) => t("subscription.preview.billedEachMonth", { amount }),
		discountComposition: t("subscription.preview.discountComposition"),
		quoteUnavailable: t("subscription.preview.quoteUnavailable"),
		confirmUpgradeCta: t("subscription.preview.confirmUpgradeCta"),
		confirmChange: t("subscription.preview.confirmChange"),
		reactivation: {
			title: t("subscription.preview.reactivation.title"),
			titleAnnual: t("subscription.preview.reactivation.titleAnnual"),
			upgradeBody: t("subscription.preview.reactivation.upgradeBody", reactivationTokens),
			downgradeBody: t("subscription.preview.reactivation.downgradeBody", reactivationTokens),
			durationChangeBody: t("subscription.preview.reactivation.durationChangeBody", reactivationTokens),
			durationChangeBodyMonthly: t("subscription.preview.reactivation.durationChangeBodyMonthly", reactivationTokens),
			withoutRenewalDate: {
				upgradeBody: t("subscription.preview.reactivation.withoutRenewalDate.upgradeBody", reactivationTokens),
				downgradeBody: t("subscription.preview.reactivation.withoutRenewalDate.downgradeBody", reactivationTokens),
				durationChangeBody: t("subscription.preview.reactivation.withoutRenewalDate.durationChangeBody", reactivationTokens),
				durationChangeBodyMonthly: t("subscription.preview.reactivation.withoutRenewalDate.durationChangeBodyMonthly", reactivationTokens)
			},
			confirmButton: t("subscription.preview.reactivation.confirmButton"),
			confirmButtonWithCharge: (amount) => t("subscription.preview.reactivation.confirmButtonWithCharge", { amount }),
			checkboxLabel: (amount) => t("subscription.preview.reactivation.checkboxLabel", { amount })
		},
		savedMethod: {
			savedPaymentMethod: t("subscription.preview.savedPaymentMethod"),
			changePaymentMethod: t("subscription.preview.changePaymentMethod"),
			addNewPaymentMethod: t("subscription.preview.addNewPaymentMethod"),
			alipay: t("subscription.preview.alipay"),
			selectLabel: t("g.singleSelectDropdown")
		},
		terms: {
			agreement: t("subscription.preview.termsAgreement", keepTokens(["terms", "privacy"])),
			terms: t("subscription.preview.terms"),
			privacyPolicy: t("subscription.preview.privacyPolicy")
		},
		payment: {
			paymentMethod: t("subscription.preview.paymentMethod"),
			methodChoice: t("subscription.preview.stripeMethodChoice"),
			billingAddress: t("subscription.preview.billingAddress"),
			alipayRenewalNote: t("subscription.preview.alipayRenewalNote"),
			unavailable: t("subscription.preview.stripeUnavailable"),
			genericError: t("g.error")
		}
	}));
	const successCopy = computed(() => ({
		allSet: t("subscription.success.allSet"),
		planUpdated: t("subscription.success.planUpdated"),
		receiptEmailed: t("subscription.success.receiptEmailed"),
		usdPerMonth: t("subscription.usdPerMonth"),
		usdPerYear: t("subscription.usdPerYear"),
		perMonth: t("subscription.perMonth"),
		perYear: t("subscription.perYear"),
		promoApplied: (code) => t("subscription.success.promoApplied", { code }),
		promoRenews: (amount, date) => t("subscription.success.promoRenews", {
			amount,
			date
		}),
		close: t("g.close")
	}));
	function checkoutPlan(tierKey, teamPlan) {
		if (teamPlan) return {
			name: t("subscription.teamPlan.name"),
			monthlyPriceUsd: {
				monthly: teamPlan.discountedUsd,
				yearly: teamPlan.discountedUsd
			},
			monthlyCredits: teamPlan.credits,
			pricedByQuote: false
		};
		return {
			name: t(`subscription.tiers.${tierKey}.name`),
			monthlyPriceUsd: {
				monthly: tierKey ? getTierPrice(tierKey, false) : 0,
				yearly: tierKey ? getTierPrice(tierKey, true) : 0
			},
			monthlyCredits: tierKey ? getTierCredits(tierKey) ?? 0 : 0,
			pricedByQuote: true
		};
	}
	return {
		copy,
		successCopy,
		checkoutPlan
	};
}
//#endregion
//#region src/platform/workspace/components/SubscriptionAddPaymentPreviewWorkspace.vue
var SubscriptionAddPaymentPreviewWorkspace_default = /* @__PURE__ */ defineComponent({
	__name: "SubscriptionAddPaymentPreviewWorkspace",
	props: /*@__PURE__*/ mergeModels({
		tierKey: {},
		billingCycle: { default: "monthly" },
		isLoading: {
			type: Boolean,
			default: false
		},
		previewData: { default: null },
		teamPlan: { default: null },
		actionUrl: { default: null },
		authenticationState: { default: null },
		authenticationError: { default: null },
		reconciliationOperationId: { default: null },
		parkedCheckoutRecovery: {
			type: Boolean,
			default: false
		},
		usePaymentElement: {
			type: Boolean,
			default: false
		},
		savedMethods: { default: null },
		quoteIsCurrent: {
			type: Boolean,
			default: false
		},
		isApplyingPromotionCode: {
			type: Boolean,
			default: false
		},
		embeddedCheckoutEnabled: {
			type: Boolean,
			default: false
		}
	}, {
		"selectedSavedMethodId": { default: null },
		"selectedSavedMethodIdModifiers": {}
	}),
	emits: /*@__PURE__*/ mergeModels([
		"addCreditCard",
		"confirmPayment",
		"back",
		"changePaymentMethod",
		"applyPromotionCode",
		"invalidateQuote"
	], ["update:selectedSavedMethodId"]),
	setup(__props, { emit: __emit }) {
		/**
		* The cloud app's binding of the shared new-subscription confirm: its tier
		* and team-stop catalog, its translations, its Stripe key and theme, and its
		* checkout-journey telemetry (ADR BILLING-WEB-0038).
		*/
		const emit = __emit;
		const selectedSavedMethodId = useModel(__props, "selectedSavedMethodId");
		const { locale } = useI18n();
		const { copy, checkoutPlan } = useCheckoutCopy();
		const colorPaletteStore = useColorPaletteStore();
		const publishableKey = resolveStripePublishableKey() ?? "";
		const plan = computed(() => checkoutPlan(__props.tierKey, __props.teamPlan));
		function emitPaymentJourneyPhase(phase) {
			const journey = getActiveCheckoutJourney();
			if (!journey) return;
			trackCheckoutJourneyPhase(journey, phase);
		}
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(CheckoutSubscribeConfirm_default), {
				"selected-saved-method-id": selectedSavedMethodId.value,
				"onUpdate:selectedSavedMethodId": _cache[0] || (_cache[0] = ($event) => selectedSavedMethodId.value = $event),
				plan: plan.value,
				copy: unref(copy),
				locale: unref(locale),
				"publishable-key": unref(publishableKey),
				"theme-key": unref(colorPaletteStore).activePaletteId,
				"billing-cycle": __props.billingCycle,
				"is-loading": __props.isLoading,
				"preview-data": __props.previewData,
				"action-url": __props.actionUrl,
				"authentication-state": __props.authenticationState,
				"authentication-error": __props.authenticationError,
				"reconciliation-operation-id": __props.reconciliationOperationId,
				"parked-checkout-recovery": __props.parkedCheckoutRecovery,
				"use-payment-element": __props.usePaymentElement,
				"saved-methods": __props.savedMethods,
				"quote-is-current": __props.quoteIsCurrent,
				"is-applying-promotion-code": __props.isApplyingPromotionCode,
				"embedded-checkout-enabled": __props.embeddedCheckoutEnabled,
				onAddCreditCard: _cache[1] || (_cache[1] = ($event) => emit("addCreditCard")),
				onConfirmPayment: _cache[2] || (_cache[2] = ($event) => emit("confirmPayment", $event)),
				onBack: _cache[3] || (_cache[3] = ($event) => emit("back")),
				onChangePaymentMethod: _cache[4] || (_cache[4] = ($event) => emit("changePaymentMethod")),
				onApplyPromotionCode: _cache[5] || (_cache[5] = ($event) => emit("applyPromotionCode", $event)),
				onInvalidateQuote: _cache[6] || (_cache[6] = ($event) => emit("invalidateQuote")),
				onPaymentPhase: emitPaymentJourneyPhase
			}, null, 8, [
				"selected-saved-method-id",
				"plan",
				"copy",
				"locale",
				"publishable-key",
				"theme-key",
				"billing-cycle",
				"is-loading",
				"preview-data",
				"action-url",
				"authentication-state",
				"authentication-error",
				"reconciliation-operation-id",
				"parked-checkout-recovery",
				"use-payment-element",
				"saved-methods",
				"quote-is-current",
				"is-applying-promotion-code",
				"embedded-checkout-enabled"
			]);
		};
	}
});
//#endregion
//#region src/platform/workspace/components/SubscriptionSuccessWorkspace.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1 = {
	key: 0,
	class: "mt-4 flex w-full flex-col gap-2"
};
var _hoisted_2 = { class: "m-0 text-base font-normal text-base-foreground" };
var _hoisted_3 = { class: "m-0 text-sm text-muted-foreground" };
var _hoisted_4 = { "aria-live": "polite" };
//#endregion
//#region src/platform/workspace/components/SubscriptionSuccessWorkspace.vue
var SubscriptionSuccessWorkspace_default = /* @__PURE__ */ defineComponent({
	__name: "SubscriptionSuccessWorkspace",
	props: {
		tierKey: {},
		previewData: { default: null },
		teamPlan: { default: null },
		billingCycle: { default: "monthly" },
		darkSurface: {
			type: Boolean,
			default: false
		},
		promoApplied: { default: null }
	},
	emits: ["close"],
	setup(__props) {
		/**
		* The cloud app's binding of the shared success step, plus the team invite
		* that follows a multi-seat upgrade (ADR BILLING-WEB-0038).
		*/
		const { locale } = useI18n();
		const { successCopy, checkoutPlan } = useCheckoutCopy();
		const { maxSeats, occupiedSeats } = useBillingContext();
		const inviteFormMaxSeats = computed(() => maxSeats.value);
		const inviteFormOccupiedSeats = computed(() => occupiedSeats.value);
		const showInviteBlock = computed(() => maxSeats.value === 0 || (maxSeats.value ?? 0) > 1);
		const invitedEmails = ref([]);
		const invitedMessage = ref();
		const inviteForm = ref();
		const canSendInvites = computed(() => maxSeats.value !== null && occupiedSeats.value !== null && (inviteForm.value?.canSubmit ?? false));
		const isSendingInvites = computed(() => inviteForm.value?.loading ?? false);
		function handleSendInvites() {
			if (maxSeats.value === null || occupiedSeats.value === null) return;
			inviteForm.value?.submit()?.catch(console.error);
		}
		async function onInvited(emails) {
			invitedEmails.value = emails;
			await nextTick();
			invitedMessage.value?.focus();
		}
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(CheckoutSuccess_default), {
				plan: unref(checkoutPlan)(__props.tierKey, __props.teamPlan),
				copy: unref(successCopy),
				locale: unref(locale),
				"preview-data": __props.previewData,
				"billing-cycle": __props.billingCycle,
				"dark-surface": __props.darkSurface,
				"promo-applied": __props.promoApplied,
				"close-demoted": showInviteBlock.value && invitedEmails.value.length === 0,
				onClose: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("close"))
			}, {
				details: withCtx(() => [showInviteBlock.value ? (openBlock(), createElementBlock("div", _hoisted_1, [
					createBaseVNode("h3", _hoisted_2, toDisplayString(_ctx.$t("subscription.success.inviteTitle")), 1),
					createBaseVNode("p", _hoisted_3, toDisplayString(_ctx.$t("subscription.success.inviteSubtext")), 1),
					createBaseVNode("div", _hoisted_4, [invitedEmails.value.length > 0 ? (openBlock(), createElementBlock("p", {
						key: 0,
						ref_key: "invitedMessage",
						ref: invitedMessage,
						tabindex: "-1",
						class: "m-0 text-sm text-success-background"
					}, toDisplayString(_ctx.$t("workspacePanel.inviteMemberDialog.invitedMessage", { emails: invitedEmails.value.join(", ") }, invitedEmails.value.length)), 513)) : (openBlock(), createBlock(InviteMembersForm_default, {
						key: 1,
						ref_key: "inviteForm",
						ref: inviteForm,
						"show-submit": false,
						"tags-input-class": __props.darkSurface ? "min-h-10 w-full bg-secondary-background px-3 focus-within:bg-secondary-background hover:bg-secondary-background-hover" : void 0,
						source: "post_upgrade_success",
						"submit-label": _ctx.$t("subscription.success.sendInvites"),
						placeholder: _ctx.$t("subscription.success.inviteEmailsPlaceholder"),
						"max-seats": inviteFormMaxSeats.value,
						"occupied-seats": inviteFormOccupiedSeats.value,
						onSubmitted: onInvited
					}, null, 8, [
						"tags-input-class",
						"submit-label",
						"placeholder",
						"max-seats",
						"occupied-seats"
					]))])
				])) : createCommentVNode("", true)]),
				actions: withCtx(() => [showInviteBlock.value && invitedEmails.value.length === 0 ? (openBlock(), createBlock(Button_default, {
					key: 0,
					variant: "tertiary",
					size: "lg",
					class: "w-full rounded-lg",
					disabled: !canSendInvites.value,
					loading: isSendingInvites.value,
					onClick: handleSendInvites
				}, {
					default: withCtx(() => [createTextVNode(toDisplayString(_ctx.$t("subscription.success.sendInvites")), 1)]),
					_: 1
				}, 8, ["disabled", "loading"])) : createCommentVNode("", true)]),
				_: 1
			}, 8, [
				"plan",
				"copy",
				"locale",
				"preview-data",
				"billing-cycle",
				"dark-surface",
				"promo-applied",
				"close-demoted"
			]);
		};
	}
});
//#endregion
//#region src/platform/workspace/components/SubscriptionTransitionPreviewWorkspace.vue
var SubscriptionTransitionPreviewWorkspace_default = /* @__PURE__ */ defineComponent({
	__name: "SubscriptionTransitionPreviewWorkspace",
	props: {
		previewData: {},
		isLoading: {
			type: Boolean,
			default: false
		},
		teamPlan: { default: null },
		actionUrl: { default: null },
		forceReactivation: {
			type: Boolean,
			default: false
		},
		authenticationState: { default: null },
		authenticationError: { default: null },
		reconciliationOperationId: { default: null },
		quoteIsCurrent: {
			type: Boolean,
			default: false
		},
		isApplyingPromotionCode: {
			type: Boolean,
			default: false
		},
		embeddedCheckoutEnabled: {
			type: Boolean,
			default: false
		},
		paymentCancelable: {
			type: Boolean,
			default: false
		},
		cancelingPayment: {
			type: Boolean,
			default: false
		},
		cancelPaymentError: { default: null }
	},
	emits: [
		"confirm",
		"back",
		"applyPromotionCode",
		"invalidateQuote",
		"cancelPayment"
	],
	setup(__props, { emit: __emit }) {
		/**
		* The cloud app's binding of the shared plan-change confirm: its tier names
		* and credits, its translations, and the subscription status that decides
		* whether the change reactivates a cancelled plan (ADR BILLING-WEB-0038).
		*/
		const emit = __emit;
		const { locale, t, te } = useI18n();
		const { copy } = useCheckoutCopy();
		const { subscription } = useBillingContext();
		function formatTierName(tier) {
			const nameKey = `subscription.tiers.${tier.toLowerCase()}.name`;
			if (te(nameKey)) return t(nameKey);
			return tier.toLowerCase().split(/[_-]+/).filter(Boolean).map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
		}
		function tierMonthlyCredits(tier) {
			const tierKey = toTierKey(tier);
			return tierKey ? getTierCredits(tierKey) ?? 0 : 0;
		}
		const plan = computed(() => __props.teamPlan ? {
			name: t("subscription.teamPlan.name"),
			monthlyCredits: __props.teamPlan.credits
		} : {
			name: formatTierName(__props.previewData.new_plan.tier),
			monthlyCredits: tierMonthlyCredits(__props.previewData.new_plan.tier)
		});
		const currentTierName = computed(() => {
			const tier = __props.previewData.current_plan?.tier;
			if (!tier) return "";
			return tier.toUpperCase() === "TEAM" ? t("subscription.teamPlan.name") : formatTierName(tier);
		});
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(CheckoutTransitionConfirm_default), {
				"preview-data": __props.previewData,
				plan: plan.value,
				"current-plan-name": currentTierName.value,
				copy: unref(copy),
				locale: unref(locale),
				"subscription-loaded": unref(subscription) !== null,
				"subscription-cancelled": unref(subscription)?.isCancelled ?? false,
				"subscription-end-date": unref(subscription)?.endDate,
				"is-loading": __props.isLoading,
				"action-url": __props.actionUrl,
				"force-reactivation": __props.forceReactivation,
				"authentication-state": __props.authenticationState,
				"authentication-error": __props.authenticationError,
				"reconciliation-operation-id": __props.reconciliationOperationId,
				"quote-is-current": __props.quoteIsCurrent,
				"is-applying-promotion-code": __props.isApplyingPromotionCode,
				"embedded-checkout-enabled": __props.embeddedCheckoutEnabled,
				"payment-cancelable": __props.paymentCancelable,
				"canceling-payment": __props.cancelingPayment,
				"cancel-payment-error": __props.cancelPaymentError,
				onCancelPayment: _cache[0] || (_cache[0] = ($event) => emit("cancelPayment")),
				onConfirm: _cache[1] || (_cache[1] = ($event) => emit("confirm", $event)),
				onBack: _cache[2] || (_cache[2] = ($event) => emit("back")),
				onApplyPromotionCode: _cache[3] || (_cache[3] = ($event) => emit("applyPromotionCode", $event)),
				onInvalidateQuote: _cache[4] || (_cache[4] = ($event) => emit("invalidateQuote"))
			}, null, 8, [
				"preview-data",
				"plan",
				"current-plan-name",
				"copy",
				"locale",
				"subscription-loaded",
				"subscription-cancelled",
				"subscription-end-date",
				"is-loading",
				"action-url",
				"force-reactivation",
				"authentication-state",
				"authentication-error",
				"reconciliation-operation-id",
				"quote-is-current",
				"is-applying-promotion-code",
				"embedded-checkout-enabled",
				"payment-cancelable",
				"canceling-payment",
				"cancel-payment-error"
			]);
		};
	}
});
//#endregion
export { TEAM_PLAN_CREDIT_STOPS as a, useSubscriptionCheckout as i, SubscriptionSuccessWorkspace_default as n, SubscriptionAddPaymentPreviewWorkspace_default as r, SubscriptionTransitionPreviewWorkspace_default as t };
