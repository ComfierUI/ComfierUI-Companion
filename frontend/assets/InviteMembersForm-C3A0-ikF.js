import "./rolldown-runtime-xtsTai4I.js";
import { Et as withCtx, G as defineComponent, H as createTextVNode, I as createBlock, Jt as normalizeClass, Kt as unref, L as createCommentVNode, Lt as ref, O as Fragment, P as computed, R as createElementBlock, U as createVNode, Zt as toDisplayString, dt as renderList, lt as openBlock, vt as useId } from "./vendor-vue-core-C1utdb0s.js";
import { p as useAsyncState } from "./vendor-vueuse-BxKIIsKg.js";
import { On as useBillingContext, Si as TagsInputItem_default, Ti as TagsInput_default, Wl as useTeamWorkspaceStore, _i as TagsInputItemText_default, vi as TagsInputItemDelete_default, wi as TagsInputInput_default } from "./layoutStore-CZsuzg91.js";
import { n as useTelemetry } from "./telemetry-IkzvF0TI.js";
import { r as useI18n } from "./vendor-i18n-BZvE7WBQ.js";
import { t as cn } from "./src-DI1bBfrb.js";
import { t as Button_default } from "./Button-j0oCzR82.js";
import { f as useToast } from "./vendor-primevue-C3d0HJ53.js";
//#region packages/account-ui/src/billing/checkout/inviteEmails.ts
var EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
var EMAIL_DELIMITER = /[,\s]+/;
function normalizeEmail(value) {
	return value.trim().toLowerCase();
}
function isValidEmail(email) {
	return EMAIL_REGEX.test(email);
}
function sanitizeInviteEmails(values, limit) {
	const unique = [...new Set(values.map(normalizeEmail).filter(Boolean))];
	return unique.length > limit ? unique.slice(0, limit) : unique;
}
//#endregion
//#region src/platform/workspace/components/InviteMembersForm.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1 = { class: "flex flex-col gap-2" };
var _hoisted_2 = ["id"];
var _hoisted_3 = ["id"];
var _hoisted_4 = ["id"];
var MAX_INVITES_PER_BATCH = 30;
//#endregion
//#region src/platform/workspace/components/InviteMembersForm.vue
var InviteMembersForm_default = /* @__PURE__ */ defineComponent({
	__name: "InviteMembersForm",
	props: {
		submitLabel: {},
		placeholder: {},
		source: {},
		cancelLabel: {},
		maxSeats: { default: () => MAX_INVITES_PER_BATCH },
		occupiedSeats: { default: 0 },
		showSubmit: {
			type: Boolean,
			default: true
		},
		autoFocus: {
			type: Boolean,
			default: false
		},
		tagsInputClass: { default: "min-h-10 w-full bg-tertiary-background px-3 focus-within:bg-tertiary-background hover:bg-tertiary-background-hover" }
	},
	emits: ["submitted", "cancel"],
	setup(__props, { expose: __expose, emit: __emit }) {
		const emit = __emit;
		const { t } = useI18n();
		const toast = useToast();
		const telemetry = useTelemetry();
		const workspaceStore = useTeamWorkspaceStore();
		const { fetchStatus } = useBillingContext();
		const emails = ref([]);
		const invitedEmails = ref([]);
		const invitedInvites = ref([]);
		const loading = ref(false);
		const { state: pendingInvites, execute: refreshPendingInvites } = useAsyncState(async () => {
			try {
				return await workspaceStore.fetchPendingInvites();
			} catch (error) {
				console.error(error);
				return [];
			}
		}, workspaceStore.pendingInvites, { immediate: false });
		const pendingInvitesRequest = refreshPendingInvites();
		const invalidEmailsHintId = useId();
		const pendingInvitesHintId = useId();
		const seatLimitHintId = useId();
		const invalidEmails = computed(() => emails.value.filter((email) => !isValidEmail(email)));
		const pendingInviteEmailSet = computed(() => new Set(pendingInvites.value.map((invite) => normalizeEmail(invite.email))));
		const alreadyInvitedEmails = computed(() => emails.value.filter((email) => pendingInviteEmailSet.value.has(email)));
		const newInviteEmails = computed(() => emails.value.filter((email) => !pendingInviteEmailSet.value.has(email)));
		const remainingSeats = computed(() => {
			if (__props.maxSeats === null || __props.occupiedSeats === null) return null;
			return __props.maxSeats === 0 ? MAX_INVITES_PER_BATCH : Math.max(0, __props.maxSeats - __props.occupiedSeats);
		});
		const seatOverage = computed(() => {
			if (remainingSeats.value === null) return 0;
			return Math.max(0, newInviteEmails.value.length - remainingSeats.value);
		});
		const canSubmit = computed(() => remainingSeats.value !== null && emails.value.length > 0 && newInviteEmails.value.length > 0 && invalidEmails.value.length === 0 && seatOverage.value === 0);
		const describedBy = computed(() => [
			invalidEmails.value.length > 0 ? invalidEmailsHintId : void 0,
			alreadyInvitedEmails.value.length > 0 ? pendingInvitesHintId : void 0,
			seatOverage.value > 0 ? seatLimitHintId : void 0
		].filter(Boolean).join(" ") || void 0);
		function onEmailsUpdate(value) {
			emails.value = sanitizeInviteEmails(value, MAX_INVITES_PER_BATCH);
		}
		async function onSubmit() {
			if (loading.value || !canSubmit.value) return;
			loading.value = true;
			try {
				await pendingInvitesRequest;
				if (!canSubmit.value) return;
				const emailSnapshot = [...newInviteEmails.value];
				if (emailSnapshot.length === 0) return;
				const results = await Promise.allSettled(emailSnapshot.map((email) => workspaceStore.createInvite(email)));
				const failedEmails = emailSnapshot.filter((_, index) => results[index].status === "rejected");
				const successfulEmails = emailSnapshot.filter((_, index) => results[index].status === "fulfilled");
				const createdInvites = results.flatMap((result) => result.status === "fulfilled" ? [result.value] : []);
				if (successfulEmails.length > 0) {
					invitedEmails.value.push(...successfulEmails);
					invitedInvites.value.push(...createdInvites);
					telemetry?.trackWorkspaceInviteSent({
						source: __props.source,
						count: successfulEmails.length
					});
					fetchStatus().catch(console.error);
				}
				if (failedEmails.length === 0) {
					emit("submitted", [...invitedEmails.value], [...invitedInvites.value]);
					return;
				}
				telemetry?.trackWorkspaceInviteFailed({
					source: __props.source,
					attempted_count: emailSnapshot.length,
					failed_count: failedEmails.length
				});
				emails.value = failedEmails;
				toast.add({
					severity: "error",
					summary: t("workspacePanel.inviteMemberDialog.failedCount", failedEmails.length),
					life: 5e3
				});
			} finally {
				loading.value = false;
			}
		}
		__expose({
			submit: onSubmit,
			get canSubmit() {
				return canSubmit.value;
			},
			get loading() {
				return loading.value;
			}
		});
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", _hoisted_1, [
				createVNode(TagsInput_default, {
					"always-editing": "",
					"add-on-paste": "",
					"add-on-blur": "",
					delimiter: unref(EMAIL_DELIMITER),
					"convert-value": unref(normalizeEmail),
					"model-value": emails.value,
					class: normalizeClass(unref(cn)("max-h-48 overflow-y-auto", __props.tagsInputClass)),
					"onUpdate:modelValue": onEmailsUpdate
				}, {
					default: withCtx(() => [(openBlock(true), createElementBlock(Fragment, null, renderList(emails.value, (email) => {
						return openBlock(), createBlock(TagsInputItem_default, {
							key: email,
							value: email,
							class: normalizeClass(unref(cn)("rounded-full", !unref(isValidEmail)(email) && "bg-destructive-background/20 text-destructive-background"))
						}, {
							default: withCtx(() => [createVNode(TagsInputItemText_default), createVNode(TagsInputItemDelete_default)]),
							_: 1
						}, 8, ["value", "class"]);
					}), 128)), createVNode(TagsInputInput_default, {
						"auto-focus": __props.autoFocus,
						class: "min-w-0 text-sm",
						"aria-label": __props.placeholder,
						"aria-describedby": describedBy.value,
						placeholder: emails.value.length === 0 ? __props.placeholder : void 0
					}, null, 8, [
						"auto-focus",
						"aria-label",
						"aria-describedby",
						"placeholder"
					])]),
					_: 1
				}, 8, [
					"delimiter",
					"convert-value",
					"model-value",
					"class"
				]),
				invalidEmails.value.length > 0 ? (openBlock(), createElementBlock("p", {
					key: 0,
					id: unref(invalidEmailsHintId),
					role: "alert",
					class: "m-0 text-xs text-destructive-background"
				}, toDisplayString(_ctx.$t("workspacePanel.inviteMemberDialog.invalidEmailCount", invalidEmails.value.length)), 9, _hoisted_2)) : createCommentVNode("", true),
				alreadyInvitedEmails.value.length > 0 ? (openBlock(), createElementBlock("p", {
					key: 1,
					id: unref(pendingInvitesHintId),
					"aria-live": "polite",
					class: "m-0 text-xs text-warning-background"
				}, [alreadyInvitedEmails.value.length === 1 ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [createTextVNode(toDisplayString(_ctx.$t("workspacePanel.inviteMemberDialog.pendingInviteSingle")), 1)], 64)) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [createTextVNode(toDisplayString(_ctx.$t("workspacePanel.inviteMemberDialog.pendingInviteCount", { count: alreadyInvitedEmails.value.length })), 1)], 64))], 8, _hoisted_3)) : createCommentVNode("", true),
				seatOverage.value > 0 ? (openBlock(), createElementBlock("p", {
					key: 2,
					id: unref(seatLimitHintId),
					role: "alert",
					class: "m-0 text-xs text-destructive-background"
				}, toDisplayString(_ctx.$t("workspacePanel.inviteMemberDialog.seatLimitExceeded", {
					max: __props.maxSeats,
					overage: seatOverage.value
				})), 9, _hoisted_4)) : createCommentVNode("", true),
				__props.showSubmit ? (openBlock(), createElementBlock("div", {
					key: 3,
					class: normalizeClass(unref(cn)("flex", __props.cancelLabel ? "items-center justify-end gap-4" : "flex-col"))
				}, [__props.cancelLabel ? (openBlock(), createBlock(Button_default, {
					key: 0,
					variant: "muted-textonly",
					size: "lg",
					onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("cancel"))
				}, {
					default: withCtx(() => [createTextVNode(toDisplayString(__props.cancelLabel), 1)]),
					_: 1
				})) : createCommentVNode("", true), createVNode(Button_default, {
					variant: "secondary",
					size: "lg",
					class: normalizeClass(unref(cn)(!__props.cancelLabel && "w-full rounded-lg")),
					loading: loading.value,
					disabled: !canSubmit.value,
					"aria-busy": loading.value,
					"aria-label": loading.value ? _ctx.$t("g.loading") : __props.submitLabel,
					onClick: onSubmit
				}, {
					default: withCtx(() => [createTextVNode(toDisplayString(__props.submitLabel), 1)]),
					_: 1
				}, 8, [
					"class",
					"loading",
					"disabled",
					"aria-busy",
					"aria-label"
				])], 2)) : createCommentVNode("", true)
			]);
		};
	}
});
//#endregion
export { InviteMembersForm_default as t };
