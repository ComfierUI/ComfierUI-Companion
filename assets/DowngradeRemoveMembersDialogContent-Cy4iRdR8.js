import "./rolldown-runtime-xtsTai4I.js";
import { Et as withCtx, F as createBaseVNode, G as defineComponent, H as createTextVNode, Kt as unref, Lt as ref, P as computed, R as createElementBlock, St as watch, T as withKeys, U as createVNode, Zt as toDisplayString, lt as openBlock } from "./vendor-vue-core-C1utdb0s.js";
import { r as useI18n } from "./vendor-i18n-BZvE7WBQ.js";
import { t as useDialogStore } from "./dialogStore-B0GYyals.js";
import { t as Button_default } from "./Button-j0oCzR82.js";
import { f as useToast } from "./vendor-primevue-C3d0HJ53.js";
import { t as Input_default } from "./Input-Cx8jjgHK.js";
import { a as formatUsdFromCents } from "./creditsUtil-BWj6bywK.js";
//#region src/platform/workspace/components/dialogs/DowngradeRemoveMembersDialogContent.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1 = { class: "flex w-full max-w-[400px] flex-col rounded-2xl border border-border-default bg-base-background" };
var _hoisted_2 = { class: "flex h-12 items-center justify-between border-b border-border-default px-4" };
var _hoisted_3 = { class: "m-0 text-sm font-normal text-base-foreground" };
var _hoisted_4 = ["aria-label", "disabled"];
var _hoisted_5 = { class: "flex flex-col gap-4 p-4" };
var _hoisted_6 = { class: "m-0 text-sm text-muted-foreground" };
var _hoisted_7 = { class: "flex flex-col gap-2 text-sm text-muted-foreground" };
var _hoisted_8 = { class: "flex items-center justify-end gap-4 p-4" };
//#endregion
//#region src/platform/workspace/components/dialogs/DowngradeRemoveMembersDialogContent.vue
var DowngradeRemoveMembersDialogContent_default = /* @__PURE__ */ defineComponent({
	__name: "DowngradeRemoveMembersDialogContent",
	props: {
		planName: {},
		planSlug: {},
		requiresRemoval: {
			type: Boolean,
			default: false
		},
		requiresReactivation: {
			type: Boolean,
			default: false
		},
		chargeCents: { default: 0 },
		onConfirm: { type: Function }
	},
	setup(__props) {
		const { t } = useI18n();
		const dialogStore = useDialogStore();
		const toast = useToast();
		const phrase = t("subscription.downgrade.confirmationPhrase");
		const typedValue = ref("");
		const isLoading = ref(false);
		watch([() => __props.requiresReactivation, () => __props.chargeCents], () => {
			typedValue.value = "";
		});
		const isConfirmed = computed(() => typedValue.value === phrase);
		const chargeDisplay = computed(() => `$${formatUsdFromCents({ cents: __props.chargeCents })}`);
		const bodyText = computed(() => {
			if (__props.requiresRemoval && __props.requiresReactivation) return t("subscription.downgrade.bodyRemovalAndReactivation", { amount: chargeDisplay.value });
			if (__props.requiresReactivation) return t("subscription.downgrade.bodyReactivation", { amount: chargeDisplay.value });
			return t("subscription.downgrade.body");
		});
		function onClose() {
			if (isLoading.value) return;
			dialogStore.closeDialog({ key: "downgrade-remove-members" });
		}
		async function onConfirmDowngrade() {
			if (!isConfirmed.value || isLoading.value) return;
			isLoading.value = true;
			try {
				await __props.onConfirm(__props.planSlug, __props.requiresReactivation);
				dialogStore.closeDialog({ key: "downgrade-remove-members" });
			} catch (error) {
				toast.add({
					severity: "error",
					summary: t("subscription.downgrade.failed"),
					detail: error instanceof Error ? error.message : t("g.unknownError")
				});
			} finally {
				isLoading.value = false;
			}
		}
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", _hoisted_1, [
				createBaseVNode("div", _hoisted_2, [createBaseVNode("h2", _hoisted_3, toDisplayString(_ctx.$t("subscription.downgrade.title", { plan: __props.planName })), 1), createBaseVNode("button", {
					class: "cursor-pointer rounded-sm border-none bg-transparent p-0 text-muted-foreground transition-colors hover:text-base-foreground focus-visible:ring-1 focus-visible:ring-border-default focus-visible:outline-none",
					"aria-label": _ctx.$t("g.close"),
					disabled: isLoading.value,
					onClick: onClose
				}, [..._cache[1] || (_cache[1] = [createBaseVNode("i", { class: "pi pi-times size-4" }, null, -1)])], 8, _hoisted_4)]),
				createBaseVNode("div", _hoisted_5, [createBaseVNode("p", _hoisted_6, toDisplayString(bodyText.value), 1), createBaseVNode("label", _hoisted_7, [createTextVNode(toDisplayString(_ctx.$t("subscription.downgrade.confirmationPrompt", { phrase: unref(phrase) })) + " ", 1), createVNode(Input_default, {
					modelValue: typedValue.value,
					"onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => typedValue.value = $event),
					type: "text",
					placeholder: unref(phrase),
					disabled: isLoading.value,
					autofocus: "",
					onKeyup: withKeys(onConfirmDowngrade, ["enter"])
				}, null, 8, [
					"modelValue",
					"placeholder",
					"disabled"
				])])]),
				createBaseVNode("div", _hoisted_8, [createVNode(Button_default, {
					variant: "muted-textonly",
					disabled: isLoading.value,
					onClick: onClose
				}, {
					default: withCtx(() => [createTextVNode(toDisplayString(_ctx.$t("g.cancel")), 1)]),
					_: 1
				}, 8, ["disabled"]), createVNode(Button_default, {
					variant: "destructive",
					size: "lg",
					disabled: !isConfirmed.value,
					loading: isLoading.value,
					onClick: onConfirmDowngrade
				}, {
					default: withCtx(() => [createTextVNode(toDisplayString(_ctx.$t("subscription.downgrade.confirm")), 1)]),
					_: 1
				}, 8, ["disabled", "loading"])])
			]);
		};
	}
});
//#endregion
export { DowngradeRemoveMembersDialogContent_default as default };
