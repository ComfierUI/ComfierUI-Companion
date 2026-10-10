import "./rolldown-runtime-xtsTai4I.js";
import { C as vModelText, Dt as withDirectives, Et as withCtx, F as createBaseVNode, G as defineComponent, H as createTextVNode, Kt as unref, L as createCommentVNode, Lt as ref, P as computed, R as createElementBlock, U as createVNode, Zt as toDisplayString, lt as openBlock, vt as useId, x as vModelRadio } from "./vendor-vue-core-C1utdb0s.js";
import { Wl as useTeamWorkspaceStore } from "./layoutStore-CZsuzg91.js";
import { r as useI18n } from "./vendor-i18n-BZvE7WBQ.js";
import { t as useDialogStore } from "./dialogStore-B0GYyals.js";
import { t as Button_default } from "./Button-j0oCzR82.js";
//#region src/platform/workspace/components/dialogs/SetMemberCreditLimitDialogContent.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1 = { class: "flex w-lg max-w-full flex-col rounded-2xl border border-border-default bg-base-background" };
var _hoisted_2 = { class: "flex h-12 items-center justify-between border-b border-border-default px-4" };
var _hoisted_3 = {
	id: "set-member-credit-limit",
	class: "m-0 text-sm font-normal text-base-foreground"
};
var _hoisted_4 = ["aria-label"];
var _hoisted_5 = { class: "flex flex-col gap-6 p-4" };
var _hoisted_6 = { class: "m-0 text-sm text-muted-foreground" };
var _hoisted_7 = { class: "flex flex-col gap-2" };
var _hoisted_8 = ["id", "name"];
var _hoisted_9 = { class: "flex flex-1 flex-col gap-2" };
var _hoisted_10 = ["for"];
var _hoisted_11 = { class: "flex h-10 items-center gap-2 rounded-lg bg-secondary-background px-4" };
var _hoisted_12 = ["aria-label"];
var _hoisted_13 = ["id", "name"];
var _hoisted_14 = ["for"];
var _hoisted_15 = {
	key: 0,
	class: "m-0 flex gap-1 text-sm text-credit"
};
var _hoisted_16 = {
	key: 1,
	class: "m-0 text-sm text-destructive-background"
};
var _hoisted_17 = { class: "flex items-center justify-end gap-4 p-4" };
//#endregion
//#region src/platform/workspace/components/dialogs/SetMemberCreditLimitDialogContent.vue
var SetMemberCreditLimitDialogContent_default = /* @__PURE__ */ defineComponent({
	__name: "SetMemberCreditLimitDialogContent",
	props: {
		memberId: {},
		memberName: {},
		creditsUsed: {},
		currentLimit: {}
	},
	setup(__props) {
		const dialogStore = useDialogStore();
		const workspaceStore = useTeamWorkspaceStore();
		const { n } = useI18n();
		const modeGroupName = useId();
		const mode = ref(__props.currentLimit !== null && __props.currentLimit !== void 0 ? "limited" : "unlimited");
		const limitInput = ref(__props.currentLimit?.toString() ?? "");
		const limitModel = computed({
			get: () => {
				if (!limitInput.value) return "";
				const value = Number(limitInput.value);
				return Number.isSafeInteger(value) ? n(value) : limitInput.value;
			},
			set: (value) => {
				limitInput.value = value.replace(/[^0-9]/g, "");
			}
		});
		const parsedLimit = computed(() => Number(limitInput.value));
		const hasValidLimit = computed(() => Number.isSafeInteger(parsedLimit.value) && parsedLimit.value > 0);
		const canUpdate = computed(() => mode.value === "unlimited" || hasValidLimit.value);
		const showError = computed(() => mode.value === "limited" && limitInput.value.length > 0 && !hasValidLimit.value);
		const showWarning = computed(() => mode.value === "limited" && __props.creditsUsed !== void 0 && hasValidLimit.value && parsedLimit.value <= __props.creditsUsed);
		function onClose() {
			dialogStore.closeDialog({ key: "set-member-credit-limit" });
		}
		function onUpdate() {
			if (!canUpdate.value) return;
			workspaceStore.setMemberCreditLimit(__props.memberId, mode.value === "limited" ? parsedLimit.value : null);
			onClose();
		}
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", _hoisted_1, [
				createBaseVNode("div", _hoisted_2, [createBaseVNode("h2", _hoisted_3, toDisplayString(_ctx.$t("workspacePanel.members.creditLimitDialog.title", { name: __props.memberName })), 1), createBaseVNode("button", {
					class: "cursor-pointer rounded-sm border-none bg-transparent p-1 text-muted-foreground transition-colors hover:text-base-foreground focus-visible:ring-1 focus-visible:ring-border-default focus-visible:outline-none",
					"aria-label": _ctx.$t("g.close"),
					onClick: onClose
				}, [..._cache[6] || (_cache[6] = [createBaseVNode("i", { class: "pi pi-times size-4" }, null, -1)])], 8, _hoisted_4)]),
				createBaseVNode("div", _hoisted_5, [
					createBaseVNode("p", _hoisted_6, toDisplayString(_ctx.$t("workspacePanel.members.creditLimitDialog.description")), 1),
					createBaseVNode("div", _hoisted_7, [createBaseVNode("div", {
						class: "flex cursor-pointer items-start gap-2 rounded-lg p-2 text-sm text-muted-foreground transition-colors hover:bg-secondary-background-hover/30",
						onClick: _cache[3] || (_cache[3] = ($event) => mode.value = "limited")
					}, [withDirectives(createBaseVNode("input", {
						id: `${unref(modeGroupName)}-limited`,
						"onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => mode.value = $event),
						type: "radio",
						name: unref(modeGroupName),
						value: "limited",
						class: "mt-0.5 size-4 appearance-none rounded-full border border-muted-background checked:border-3 checked:bg-white focus-visible:ring-2 focus-visible:ring-border-default focus-visible:outline-none"
					}, null, 8, _hoisted_8), [[vModelRadio, mode.value]]), createBaseVNode("span", _hoisted_9, [createBaseVNode("label", {
						for: `${unref(modeGroupName)}-limited`,
						class: "cursor-pointer"
					}, toDisplayString(_ctx.$t("workspacePanel.members.creditLimitDialog.limitOption")), 9, _hoisted_10), createBaseVNode("span", _hoisted_11, [_cache[7] || (_cache[7] = createBaseVNode("i", { class: "icon-[lucide--coins] size-4 shrink-0 text-credit" }, null, -1)), withDirectives(createBaseVNode("input", {
						"onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => limitModel.value = $event),
						inputmode: "numeric",
						"aria-label": _ctx.$t("workspacePanel.members.creditLimitDialog.limitOption"),
						class: "w-full border-none bg-transparent text-sm text-base-foreground tabular-nums outline-none",
						onFocus: _cache[2] || (_cache[2] = ($event) => mode.value = "limited")
					}, null, 40, _hoisted_12), [[vModelText, limitModel.value]])])])]), createBaseVNode("div", {
						class: "flex cursor-pointer items-center gap-2 rounded-lg p-2 text-sm text-muted-foreground transition-colors hover:bg-secondary-background-hover/30",
						onClick: _cache[5] || (_cache[5] = ($event) => mode.value = "unlimited")
					}, [withDirectives(createBaseVNode("input", {
						id: `${unref(modeGroupName)}-unlimited`,
						"onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => mode.value = $event),
						type: "radio",
						name: unref(modeGroupName),
						value: "unlimited",
						class: "size-4 appearance-none rounded-full border border-muted-background checked:border-3 checked:bg-white focus-visible:ring-2 focus-visible:ring-border-default focus-visible:outline-none"
					}, null, 8, _hoisted_13), [[vModelRadio, mode.value]]), createBaseVNode("label", {
						for: `${unref(modeGroupName)}-unlimited`,
						class: "cursor-pointer"
					}, toDisplayString(_ctx.$t("workspacePanel.members.creditLimitDialog.noLimit")), 9, _hoisted_14)])]),
					showWarning.value ? (openBlock(), createElementBlock("p", _hoisted_15, [_cache[8] || (_cache[8] = createBaseVNode("i", { class: "mt-0.5 icon-[lucide--triangle-alert] size-4 shrink-0" }, null, -1)), createTextVNode(" " + toDisplayString(_ctx.$t("workspacePanel.members.creditLimitDialog.warning", { credits: _ctx.$n(__props.creditsUsed ?? 0) })), 1)])) : createCommentVNode("", true),
					showError.value ? (openBlock(), createElementBlock("p", _hoisted_16, toDisplayString(_ctx.$t("workspacePanel.members.creditLimitDialog.invalidLimit")), 1)) : createCommentVNode("", true)
				]),
				createBaseVNode("div", _hoisted_17, [createVNode(Button_default, {
					variant: "muted-textonly",
					onClick: onClose
				}, {
					default: withCtx(() => [createTextVNode(toDisplayString(_ctx.$t("g.cancel")), 1)]),
					_: 1
				}), createVNode(Button_default, {
					variant: "secondary",
					size: "lg",
					disabled: !canUpdate.value,
					onClick: onUpdate
				}, {
					default: withCtx(() => [createTextVNode(toDisplayString(_ctx.$t("workspacePanel.members.creditLimitDialog.update")), 1)]),
					_: 1
				}, 8, ["disabled"])])
			]);
		};
	}
});
//#endregion
export { SetMemberCreditLimitDialogContent_default as default };
