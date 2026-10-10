import "./rolldown-runtime-xtsTai4I.js";
import { Dt as withDirectives, Et as withCtx, F as createBaseVNode, G as defineComponent, H as createTextVNode, I as createBlock, Jt as normalizeClass, Kt as unref, L as createCommentVNode, Lt as ref, O as Fragment, P as computed, R as createElementBlock, U as createVNode, Zt as toDisplayString, dt as renderList, lt as openBlock, mt as resolveDirective } from "./vendor-vue-core-C1utdb0s.js";
import { et as refAutoReset } from "./vendor-vueuse-BxKIIsKg.js";
import { On as useBillingContext, Wl as useTeamWorkspaceStore } from "./layoutStore-CZsuzg91.js";
import { r as useI18n } from "./vendor-i18n-BZvE7WBQ.js";
import { t as useDialogStore } from "./dialogStore-B0GYyals.js";
import { t as cn } from "./src-DI1bBfrb.js";
import { t as Button_default } from "./Button-j0oCzR82.js";
import { t as InviteMembersForm_default } from "./InviteMembersForm-C3A0-ikF.js";
import { n as copyTextSilently, r as formatInviteLinksForCopy, t as buildInviteLink } from "./inviteLinks-C2Ae4GP6.js";
//#region src/platform/workspace/components/dialogs/InviteLinkList.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1$1 = { class: "m-0 flex max-h-56 list-none flex-col overflow-y-auto rounded-lg border border-border-default p-0" };
var _hoisted_2$1 = { class: "min-w-0 truncate text-sm text-base-foreground" };
//#endregion
//#region src/platform/workspace/components/dialogs/InviteLinkList.vue
var InviteLinkList_default = /* @__PURE__ */ defineComponent({
	__name: "InviteLinkList",
	props: { rows: {} },
	setup(__props) {
		const { t } = useI18n();
		const copiedId = refAutoReset(null, 2e3);
		function copyLabel(id) {
			return copiedId.value === id ? t("workspacePanel.inviteLinks.copied") : t("workspacePanel.inviteLinks.copyLink");
		}
		async function copyLink(id, url) {
			if (await copyTextSilently(url)) copiedId.value = id;
		}
		return (_ctx, _cache) => {
			const _directive_tooltip = resolveDirective("tooltip");
			return openBlock(), createElementBlock("ul", _hoisted_1$1, [(openBlock(true), createElementBlock(Fragment, null, renderList(__props.rows, (row, index) => {
				return openBlock(), createElementBlock("li", {
					key: row.id,
					class: normalizeClass(unref(cn)("flex h-12 shrink-0 items-center justify-between gap-2 px-3", index > 0 && "border-t border-border-default"))
				}, [createBaseVNode("span", _hoisted_2$1, toDisplayString(row.email), 1), row.url ? withDirectives((openBlock(), createBlock(Button_default, {
					key: 0,
					variant: "muted-textonly",
					size: "icon-lg",
					class: "shrink-0",
					"aria-label": copyLabel(row.id),
					onClick: ($event) => copyLink(row.id, row.url)
				}, {
					default: withCtx(() => [createBaseVNode("i", { class: normalizeClass(unref(copiedId) === row.id ? "icon-[lucide--check] size-4" : "icon-[lucide--link] size-4") }, null, 2)]),
					_: 2
				}, 1032, ["aria-label", "onClick"])), [[_directive_tooltip, {
					value: copyLabel(row.id),
					showDelay: 300
				}]]) : createCommentVNode("", true)], 2);
			}), 128))]);
		};
	}
});
//#endregion
//#region src/platform/workspace/components/dialogs/InviteMemberDialogContent.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1 = { class: "flex w-full max-w-lg flex-col rounded-2xl border border-border-default bg-base-background" };
var _hoisted_2 = { class: "flex h-12 items-center justify-between border-b border-border-default px-4" };
var _hoisted_3 = { class: "m-0 flex items-center gap-2 text-sm font-normal text-base-foreground" };
var _hoisted_4 = ["aria-label"];
var _hoisted_5 = { class: "flex flex-col gap-2 p-4" };
var _hoisted_6 = { class: "flex items-center justify-end gap-4 p-4" };
var _hoisted_7 = { class: "flex flex-col gap-3 p-4" };
var _hoisted_8 = { class: "m-0 text-sm/5 text-muted-foreground" };
var _hoisted_9 = { class: "flex items-center justify-end gap-4 p-4" };
//#endregion
//#region src/platform/workspace/components/dialogs/InviteMemberDialogContent.vue
var InviteMemberDialogContent_default = /* @__PURE__ */ defineComponent({
	__name: "InviteMemberDialogContent",
	setup(__props) {
		const dialogStore = useDialogStore();
		const workspaceStore = useTeamWorkspaceStore();
		const { maxSeats, occupiedSeats } = useBillingContext();
		const step = ref("form");
		const invitedEmails = ref([]);
		const createdInvites = ref([]);
		const inviteTokensById = ref(/* @__PURE__ */ new Map());
		const inviteForm = ref();
		const copiedAll = refAutoReset(false, 2e3);
		const inviteFormMaxSeats = computed(() => maxSeats.value);
		const inviteFormOccupiedSeats = computed(() => occupiedSeats.value);
		const canSubmit = computed(() => maxSeats.value !== null && occupiedSeats.value !== null && (inviteForm.value?.canSubmit ?? false));
		const loading = computed(() => inviteForm.value?.loading ?? false);
		const inviteRows = computed(() => createdInvites.value.map((invite) => {
			const token = inviteTokensById.value.get(invite.id);
			return {
				id: invite.id,
				email: invite.email,
				url: token ? buildInviteLink(token) : void 0
			};
		}));
		const copyableRows = computed(() => inviteRows.value.flatMap((row) => row.url ? [{
			email: row.email,
			url: row.url
		}] : []));
		function onClose() {
			dialogStore.closeDialog({ key: "invite-member" });
		}
		function handleInvite() {
			if (maxSeats.value === null || occupiedSeats.value === null) return;
			inviteForm.value?.submit()?.catch(console.error);
		}
		function onInvited(emails, invites) {
			invitedEmails.value = emails;
			createdInvites.value = invites;
			step.value = "invited";
			loadInviteTokens();
		}
		async function loadInviteTokens() {
			try {
				const invites = await workspaceStore.fetchPendingInvites();
				inviteTokensById.value = new Map(invites.flatMap((invite) => invite.token ? [[invite.id, invite.token]] : []));
			} catch (error) {
				console.error("Failed to load invite links", error);
			}
		}
		async function copyAllLinks() {
			if (await copyTextSilently(formatInviteLinksForCopy(copyableRows.value))) copiedAll.value = true;
		}
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", _hoisted_1, [createBaseVNode("div", _hoisted_2, [createBaseVNode("h2", _hoisted_3, [step.value === "invited" ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [_cache[0] || (_cache[0] = createBaseVNode("i", { class: "pi pi-check-circle size-4 text-success-background" }, null, -1)), createTextVNode(" " + toDisplayString(_ctx.$t("workspacePanel.inviteLinks.sentTitle", { count: invitedEmails.value.length }, invitedEmails.value.length)), 1)], 64)) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [createTextVNode(toDisplayString(_ctx.$t("workspacePanel.inviteMemberDialog.title")), 1)], 64))]), createBaseVNode("button", {
				class: "cursor-pointer rounded-sm border-none bg-transparent p-0 text-muted-foreground transition-colors hover:text-base-foreground focus-visible:ring-1 focus-visible:ring-border-default focus-visible:outline-none",
				"aria-label": _ctx.$t("g.close"),
				onClick: onClose
			}, [..._cache[1] || (_cache[1] = [createBaseVNode("i", { class: "pi pi-times size-4" }, null, -1)])], 8, _hoisted_4)]), step.value === "form" ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [createBaseVNode("div", _hoisted_5, [createVNode(InviteMembersForm_default, {
				ref_key: "inviteForm",
				ref: inviteForm,
				"auto-focus": "",
				"show-submit": false,
				source: "settings_members",
				"submit-label": _ctx.$t("workspacePanel.invite"),
				placeholder: _ctx.$t("workspacePanel.inviteMemberDialog.placeholder"),
				"max-seats": inviteFormMaxSeats.value,
				"occupied-seats": inviteFormOccupiedSeats.value,
				"tags-input-class": "min-h-10 w-full bg-secondary-background",
				onSubmitted: onInvited
			}, null, 8, [
				"submit-label",
				"placeholder",
				"max-seats",
				"occupied-seats"
			])]), createBaseVNode("div", _hoisted_6, [createVNode(Button_default, {
				variant: "muted-textonly",
				onClick: onClose
			}, {
				default: withCtx(() => [createTextVNode(toDisplayString(_ctx.$t("g.cancel")), 1)]),
				_: 1
			}), createVNode(Button_default, {
				variant: "secondary",
				size: "lg",
				loading: loading.value,
				disabled: !canSubmit.value,
				onClick: handleInvite
			}, {
				default: withCtx(() => [createTextVNode(toDisplayString(_ctx.$t("workspacePanel.invite")), 1)]),
				_: 1
			}, 8, ["loading", "disabled"])])], 64)) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [createBaseVNode("div", _hoisted_7, [createBaseVNode("p", _hoisted_8, toDisplayString(copyableRows.value.length > 0 ? _ctx.$t("workspacePanel.inviteLinks.sentLead") : _ctx.$t("workspacePanel.inviteMemberDialog.invitedMessage", { emails: invitedEmails.value.join(", ") }, invitedEmails.value.length)), 1), createVNode(InviteLinkList_default, { rows: inviteRows.value }, null, 8, ["rows"])]), createBaseVNode("div", _hoisted_9, [copyableRows.value.length >= 1 ? (openBlock(), createBlock(Button_default, {
				key: 0,
				variant: "muted-textonly",
				onClick: copyAllLinks
			}, {
				default: withCtx(() => [createTextVNode(toDisplayString(unref(copiedAll) ? _ctx.$t("workspacePanel.inviteLinks.copied") : _ctx.$t("workspacePanel.inviteLinks.copyAll", { count: copyableRows.value.length }, copyableRows.value.length)), 1)]),
				_: 1
			})) : createCommentVNode("", true), createVNode(Button_default, {
				variant: "secondary",
				size: "lg",
				onClick: onClose
			}, {
				default: withCtx(() => [createTextVNode(toDisplayString(_ctx.$t("g.close")), 1)]),
				_: 1
			})])], 64))]);
		};
	}
});
//#endregion
export { InviteMemberDialogContent_default as default };
