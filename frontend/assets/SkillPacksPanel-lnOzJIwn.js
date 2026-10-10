import { r as __name } from "./rolldown-runtime-xtsTai4I.js";
import { Dt as withDirectives, E as withModifiers, Et as withCtx, F as createBaseVNode, Ft as reactive, G as defineComponent, H as createTextVNode, I as createBlock, Jt as normalizeClass, Kt as unref, L as createCommentVNode, Lt as ref, O as Fragment, P as computed, Pt as onScopeDispose, Q as mergeModels, R as createElementBlock, St as watch, U as createVNode, Wt as toValue, Zt as toDisplayString, dt as renderList, lt as openBlock, p as storeToRefs, vt as useId, yt as useModel } from "./vendor-vue-core-C1utdb0s.js";
import { x as useEventListener } from "./vendor-vueuse-BxKIIsKg.js";
import { n as reportError } from "./reportError-LG-zfbNw.js";
import { t as useToastStore } from "./toastStore-CTfykAzG.js";
import { r as useI18n } from "./vendor-i18n-BZvE7WBQ.js";
import { t as useDialogStore } from "./dialogStore-B0GYyals.js";
import { a as showConfirmDialog, i as Dialog_default, n as DialogOverlay_default, o as DialogTitle_default, r as DialogContent_default, t as DialogPortal_default } from "./DialogPortal-B3D-ZhO6.js";
import { t as cn } from "./src-DI1bBfrb.js";
import { t as Button_default } from "./Button-j0oCzR82.js";
import { t as Input_default } from "./Input-Cx8jjgHK.js";
import { t as Textarea_default } from "./Textarea-r-a2mhot.js";
import { t as DialogClose_default } from "./DialogClose-B8cFZwt-.js";
import { i as DialogHeader_default, r as vRekaZIndex } from "./vRekaZIndex-CMI8sjMU.js";
import { a as CONTROL_CHARACTERS, c as RESERVED_PACK_NAMES, d as utf8ByteLength, i as publishSkillPack, l as codePointLength, n as SkillPacksApiError, o as MAX_DESCRIPTION_CODE_POINTS, r as deleteSkillPack, s as PACK_NAME_PATTERN, t as useSkillPacksStore, u as packByteSize } from "./skillPacksStore-BL-orGxm.js";
//#region src/platform/skills/composables/useSkillPacks.ts
function useSkillPacks() {
	const { t } = useI18n();
	const toastStore = useToastStore();
	const store = useSkillPacksStore();
	const { packs, loading, hasLoaded } = storeToRefs(store);
	const operatingPackName = ref(null);
	function reportUnexpected(error, errorType) {
		reportError(error, {
			errorType,
			surface: "agent"
		});
		toastStore.add({
			severity: "error",
			summary: t("g.error"),
			detail: error instanceof SkillPacksApiError ? error.message : t("g.unknownError")
		});
	}
	async function fetchSkillPacks() {
		try {
			await store.fetchPacks();
		} catch (error) {
			reportUnexpected(error, "error_fetching_agent_skill_packs");
		}
	}
	/**
	* Delete 404 means missing pack or disabled gate; re-list to distinguish them.
	*/
	async function deleteSkillPack$1(pack) {
		operatingPackName.value = pack.name;
		try {
			await deleteSkillPack(pack.name);
			store.removePack(pack.name);
		} catch (error) {
			if (error instanceof SkillPacksApiError && error.status === 404) {
				store.removePack(pack.name);
				await fetchSkillPacks();
				return;
			}
			reportUnexpected(error, "error_deleting_agent_skill_pack");
		} finally {
			operatingPackName.value = null;
		}
	}
	__name(deleteSkillPack$1, "deleteSkillPack");
	return {
		packs,
		loading,
		hasLoaded,
		operatingPackName,
		fetchSkillPacks,
		deleteSkillPack: deleteSkillPack$1
	};
}
//#endregion
//#region src/platform/skills/composables/useSkillPackForm.ts
function useSkillPackForm(options) {
	const { t } = useI18n();
	const { pack: packRef, visible } = options;
	const store = useSkillPacksStore();
	const loading = ref(false);
	let formGeneration = 0;
	const fieldError = ref(null);
	const budgetError = ref(null);
	const form = reactive({
		name: "",
		description: "",
		body: ""
	});
	const errors = reactive({
		name: "",
		description: "",
		body: ""
	});
	const isReplacing = computed(() => store.packs.some((existing) => existing.name === form.name.trim()));
	const bodyBytes = computed(() => utf8ByteLength(form.body));
	function resetForm() {
		const pack = toValue(packRef);
		form.name = pack?.name ?? "";
		form.description = pack?.description ?? "";
		form.body = pack?.body ?? "";
		errors.name = "";
		errors.description = "";
		errors.body = "";
		fieldError.value = null;
		budgetError.value = null;
	}
	resetForm();
	watch(() => visible.value, () => formGeneration++, { flush: "sync" });
	watch(() => visible.value, (isVisible) => {
		if (isVisible) resetForm();
	});
	onScopeDispose(() => formGeneration++);
	function validateName() {
		const name = form.name.trim();
		if (!name) {
			errors.name = t("skillPacks.errors.nameRequired");
			return false;
		}
		if (name.length > 64) {
			errors.name = t("skillPacks.errors.nameTooLong", { max: 64 });
			return false;
		}
		if (!PACK_NAME_PATTERN.test(name)) {
			errors.name = t("skillPacks.errors.nameCharset");
			return false;
		}
		if (RESERVED_PACK_NAMES.some((reserved) => reserved === name)) {
			errors.name = t("skillPacks.errors.nameReserved", { name });
			return false;
		}
		if (!toValue(packRef) && isReplacing.value) {
			errors.name = t("skillPacks.errors.nameAlreadyExists", { name });
			return false;
		}
		return true;
	}
	function validateDescription() {
		if (!form.description.trim()) {
			errors.description = t("skillPacks.errors.descriptionRequired");
			return false;
		}
		if (CONTROL_CHARACTERS.test(form.description)) {
			errors.description = t("skillPacks.errors.descriptionSingleLine");
			return false;
		}
		if (codePointLength(form.description) > 1024) {
			errors.description = t("skillPacks.errors.descriptionTooLong", { max: MAX_DESCRIPTION_CODE_POINTS });
			return false;
		}
		return true;
	}
	function validateBody() {
		if (!form.body.trim()) {
			errors.body = t("skillPacks.errors.bodyRequired");
			return false;
		}
		return true;
	}
	function validate() {
		errors.name = "";
		errors.description = "";
		errors.body = "";
		fieldError.value = null;
		budgetError.value = null;
		if (!validateName() || !validateDescription() || !validateBody()) return false;
		return true;
	}
	function handlePublishFailure(error, generation) {
		if (error instanceof SkillPacksApiError && error.status === 404) {
			store.markUnavailable();
			if (generation === formGeneration) visible.value = false;
			return;
		}
		if (!(error instanceof SkillPacksApiError)) reportError(error, {
			errorType: "error_publishing_agent_skill_pack",
			surface: "agent"
		});
		if (generation !== formGeneration) return;
		if (error instanceof SkillPacksApiError && error.status === 409) budgetError.value = error.message;
		else if (error instanceof SkillPacksApiError) fieldError.value = error.message;
		else fieldError.value = t("g.unknownError");
	}
	async function handleSubmit() {
		if (loading.value || !visible.value) return;
		if (!validate()) return;
		const generation = formGeneration;
		loading.value = true;
		try {
			const saved = await publishSkillPack({
				name: form.name.trim(),
				description: form.description,
				body: form.body
			});
			store.upsertPack(saved);
			if (generation !== formGeneration) return;
			visible.value = false;
		} catch (error) {
			handlePublishFailure(error, generation);
		} finally {
			loading.value = false;
		}
	}
	return {
		form,
		errors,
		loading,
		fieldError,
		budgetError,
		bodyBytes,
		handleSubmit
	};
}
//#endregion
//#region src/platform/skills/components/SkillPackFormDialog.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1$2 = { class: "flex flex-col gap-1" };
var _hoisted_2$2 = ["for"];
var _hoisted_3$2 = ["id"];
var _hoisted_4$2 = ["id"];
var _hoisted_5$2 = { class: "flex flex-col gap-1" };
var _hoisted_6$2 = ["for"];
var _hoisted_7$1 = ["id"];
var _hoisted_8$1 = ["id"];
var _hoisted_9 = { class: "flex flex-col gap-1" };
var _hoisted_10 = ["for"];
var _hoisted_11 = ["id"];
var _hoisted_12 = ["id"];
var _hoisted_13 = {
	key: 0,
	"data-testid": "skill-pack-budget-error",
	role: "alert",
	class: "flex flex-col gap-1 rounded-lg border border-destructive-background p-3"
};
var _hoisted_14 = { class: "text-sm font-medium text-destructive-background" };
var _hoisted_15 = { class: "text-sm text-muted" };
var _hoisted_16 = { class: "text-sm text-muted" };
var _hoisted_17 = {
	key: 1,
	"data-testid": "skill-pack-field-error",
	role: "alert",
	class: "text-sm text-destructive-background"
};
var _hoisted_18 = { class: "flex justify-end gap-2 py-2" };
//#endregion
//#region src/platform/skills/components/SkillPackFormDialog.vue
var SkillPackFormDialog_default = /* @__PURE__ */ defineComponent({
	__name: "SkillPackFormDialog",
	props: /*@__PURE__*/ mergeModels({ pack: {} }, {
		"visible": {
			type: Boolean,
			default: false
		},
		"visibleModifiers": {}
	}),
	emits: ["update:visible"],
	setup(__props) {
		const visible = useModel(__props, "visible");
		const { t } = useI18n();
		const titleId = useId();
		const nameId = useId();
		const descriptionId = useId();
		const bodyId = useId();
		const { form, errors, loading, fieldError, budgetError, bodyBytes, handleSubmit } = useSkillPackForm({
			pack: () => __props.pack,
			visible
		});
		const bodySizeLabel = computed(() => t("skillPacks.bodySize", { bytes: bodyBytes.value }));
		return (_ctx, _cache) => {
			return openBlock(), createBlock(Dialog_default, {
				open: visible.value,
				"onUpdate:open": _cache[5] || (_cache[5] = ($event) => visible.value = $event)
			}, {
				default: withCtx(() => [createVNode(DialogPortal_default, null, {
					default: withCtx(() => [withDirectives(createVNode(DialogOverlay_default, { "data-reka-nested-dialog-overlay": "" }, null, 512), [[unref(vRekaZIndex)]]), withDirectives((openBlock(), createBlock(DialogContent_default, {
						size: "md",
						"aria-labelledby": unref(titleId)
					}, {
						default: withCtx(() => [createVNode(DialogHeader_default, null, {
							default: withCtx(() => [createVNode(DialogTitle_default, { id: unref(titleId) }, {
								default: withCtx(() => [createTextVNode(toDisplayString(__props.pack ? _ctx.$t("skillPacks.editPack") : _ctx.$t("skillPacks.addPack")), 1)]),
								_: 1
							}, 8, ["id"]), createVNode(DialogClose_default)]),
							_: 1
						}), createBaseVNode("form", {
							class: "flex flex-col gap-4 px-4 py-2",
							onSubmit: _cache[4] || (_cache[4] = withModifiers((...args) => unref(handleSubmit) && unref(handleSubmit)(...args), ["prevent"]))
						}, [
							createBaseVNode("div", _hoisted_1$2, [
								createBaseVNode("label", {
									for: unref(nameId),
									class: "text-sm font-medium"
								}, toDisplayString(_ctx.$t("skillPacks.name")), 9, _hoisted_2$2),
								createVNode(Input_default, {
									id: unref(nameId),
									modelValue: unref(form).name,
									"onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => unref(form).name = $event),
									placeholder: _ctx.$t("skillPacks.namePlaceholder"),
									disabled: __props.pack !== void 0 || unref(loading),
									"aria-invalid": !!unref(errors).name || void 0,
									"aria-describedby": `${unref(nameId)}-help`,
									maxlength: unref(64)
								}, null, 8, [
									"id",
									"modelValue",
									"placeholder",
									"disabled",
									"aria-invalid",
									"aria-describedby",
									"maxlength"
								]),
								unref(errors).name ? (openBlock(), createElementBlock("small", {
									key: 0,
									id: `${unref(nameId)}-help`,
									role: "alert",
									class: "text-destructive-background"
								}, toDisplayString(unref(errors).name), 9, _hoisted_3$2)) : (openBlock(), createElementBlock("small", {
									key: 1,
									id: `${unref(nameId)}-help`,
									class: "text-muted"
								}, toDisplayString(_ctx.$t("skillPacks.nameHint")), 9, _hoisted_4$2))
							]),
							createBaseVNode("div", _hoisted_5$2, [
								createBaseVNode("label", {
									for: unref(descriptionId),
									class: "text-sm font-medium"
								}, toDisplayString(_ctx.$t("skillPacks.triggerLine")), 9, _hoisted_6$2),
								createVNode(Input_default, {
									id: unref(descriptionId),
									modelValue: unref(form).description,
									"onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => unref(form).description = $event),
									placeholder: _ctx.$t("skillPacks.triggerLinePlaceholder"),
									disabled: unref(loading),
									"aria-invalid": !!unref(errors).description || void 0,
									"aria-describedby": `${unref(descriptionId)}-help`
								}, null, 8, [
									"id",
									"modelValue",
									"placeholder",
									"disabled",
									"aria-invalid",
									"aria-describedby"
								]),
								unref(errors).description ? (openBlock(), createElementBlock("small", {
									key: 0,
									id: `${unref(descriptionId)}-help`,
									role: "alert",
									class: "text-destructive-background"
								}, toDisplayString(unref(errors).description), 9, _hoisted_7$1)) : (openBlock(), createElementBlock("small", {
									key: 1,
									id: `${unref(descriptionId)}-help`,
									class: "text-muted"
								}, toDisplayString(_ctx.$t("skillPacks.triggerLineHint")), 9, _hoisted_8$1))
							]),
							createBaseVNode("div", _hoisted_9, [
								createBaseVNode("label", {
									for: unref(bodyId),
									class: "text-sm font-medium"
								}, toDisplayString(_ctx.$t("skillPacks.body")), 9, _hoisted_10),
								createVNode(Textarea_default, {
									id: unref(bodyId),
									modelValue: unref(form).body,
									"onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => unref(form).body = $event),
									class: "min-h-48 font-mono",
									placeholder: _ctx.$t("skillPacks.bodyPlaceholder"),
									disabled: unref(loading),
									"aria-invalid": !!unref(errors).body || void 0,
									"aria-describedby": `${unref(bodyId)}-help`
								}, null, 8, [
									"id",
									"modelValue",
									"placeholder",
									"disabled",
									"aria-invalid",
									"aria-describedby"
								]),
								unref(errors).body ? (openBlock(), createElementBlock("small", {
									key: 0,
									id: `${unref(bodyId)}-help`,
									role: "alert",
									class: "text-destructive-background"
								}, toDisplayString(unref(errors).body), 9, _hoisted_11)) : (openBlock(), createElementBlock("small", {
									key: 1,
									id: `${unref(bodyId)}-help`,
									class: "text-muted"
								}, toDisplayString(bodySizeLabel.value), 9, _hoisted_12))
							]),
							unref(budgetError) ? (openBlock(), createElementBlock("div", _hoisted_13, [
								createBaseVNode("span", _hoisted_14, toDisplayString(_ctx.$t("skillPacks.atLimitTitle")), 1),
								createBaseVNode("span", _hoisted_15, toDisplayString(unref(budgetError)), 1),
								createBaseVNode("span", _hoisted_16, toDisplayString(_ctx.$t("skillPacks.atLimitHint")), 1)
							])) : unref(fieldError) ? (openBlock(), createElementBlock("span", _hoisted_17, toDisplayString(unref(fieldError)), 1)) : createCommentVNode("", true),
							createBaseVNode("div", _hoisted_18, [createVNode(Button_default, {
								variant: "secondary",
								type: "button",
								onClick: _cache[3] || (_cache[3] = ($event) => visible.value = false)
							}, {
								default: withCtx(() => [createTextVNode(toDisplayString(_ctx.$t("g.cancel")), 1)]),
								_: 1
							}), createVNode(Button_default, {
								type: "submit",
								loading: unref(loading)
							}, {
								default: withCtx(() => [createTextVNode(toDisplayString(_ctx.$t("skillPacks.publish")), 1)]),
								_: 1
							}, 8, ["loading"])])
						], 32)]),
						_: 1
					}, 8, ["aria-labelledby"])), [[unref(vRekaZIndex)]])]),
					_: 1
				})]),
				_: 1
			}, 8, ["open"]);
		};
	}
});
//#endregion
//#region src/platform/skills/components/SkillPackListItem.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1$1 = { class: "group relative rounded-lg border border-border-default" };
var _hoisted_2$1 = { class: "w-full truncate font-medium text-base-foreground" };
var _hoisted_3$1 = ["id"];
var _hoisted_4$1 = { class: "text-xs text-muted" };
var _hoisted_5$1 = { class: "absolute top-4 right-4" };
var _hoisted_6$1 = {
	key: 0,
	class: "icon-[lucide--loader-circle] size-4 animate-spin text-muted"
};
//#endregion
//#region src/platform/skills/components/SkillPackListItem.vue
var SkillPackListItem_default = /* @__PURE__ */ defineComponent({
	__name: "SkillPackListItem",
	props: {
		pack: {},
		loading: {
			type: Boolean,
			default: false
		},
		disabled: {
			type: Boolean,
			default: false
		},
		keyboardNavigation: {
			type: Boolean,
			default: true
		}
	},
	emits: ["edit", "delete"],
	setup(__props, { emit: __emit }) {
		const emit = __emit;
		const { t } = useI18n();
		const descriptionId = useId();
		const sizeLabel = computed(() => t("skillPacks.packSize", { bytes: packByteSize(__props.pack) }));
		const editLabel = computed(() => t("g.edit"));
		const deleteLabel = computed(() => t("g.delete"));
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", _hoisted_1$1, [createVNode(Button_default, {
				variant: "textonly",
				size: "unset",
				class: "flex w-full min-w-0 flex-col items-start gap-1 rounded-lg p-4 pr-24 text-left font-normal whitespace-normal hover:bg-transparent",
				"aria-label": __props.pack.name,
				"aria-describedby": unref(descriptionId),
				disabled: __props.disabled || __props.loading,
				onClick: _cache[0] || (_cache[0] = ($event) => emit("edit"))
			}, {
				default: withCtx(() => [
					createBaseVNode("span", _hoisted_2$1, toDisplayString(__props.pack.name), 1),
					createBaseVNode("span", {
						id: unref(descriptionId),
						class: "line-clamp-2 text-sm text-muted"
					}, toDisplayString(__props.pack.description), 9, _hoisted_3$1),
					createBaseVNode("span", _hoisted_4$1, toDisplayString(sizeLabel.value), 1)
				]),
				_: 1
			}, 8, [
				"aria-label",
				"aria-describedby",
				"disabled"
			]), createBaseVNode("div", _hoisted_5$1, [__props.loading ? (openBlock(), createElementBlock("i", _hoisted_6$1)) : (openBlock(), createElementBlock("div", {
				key: 1,
				class: normalizeClass(unref(cn)("pointer-events-none flex items-center gap-2 opacity-0 transition-opacity group-hover:pointer-events-auto group-hover:opacity-100 touch:pointer-events-auto touch:opacity-100", __props.keyboardNavigation && "group-has-focus-visible:pointer-events-auto group-has-focus-visible:opacity-100"))
			}, [createVNode(Button_default, {
				variant: "muted-textonly",
				size: "icon",
				"aria-label": editLabel.value,
				disabled: __props.disabled,
				onClick: _cache[1] || (_cache[1] = ($event) => emit("edit"))
			}, {
				default: withCtx(() => [..._cache[3] || (_cache[3] = [createBaseVNode("i", { class: "icon-[lucide--square-pen] size-4" }, null, -1)])]),
				_: 1
			}, 8, ["aria-label", "disabled"]), createVNode(Button_default, {
				variant: "muted-textonly",
				size: "icon",
				"aria-label": deleteLabel.value,
				disabled: __props.disabled,
				onClick: _cache[2] || (_cache[2] = ($event) => emit("delete"))
			}, {
				default: withCtx(() => [..._cache[4] || (_cache[4] = [createBaseVNode("i", { class: "icon-[lucide--trash-2] size-4" }, null, -1)])]),
				_: 1
			}, 8, ["aria-label", "disabled"])], 2))])]);
		};
	}
});
//#endregion
//#region src/platform/skills/components/SkillPacksPanel.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1 = { class: "flex h-full flex-col" };
var _hoisted_2 = { class: "text-2xl font-bold" };
var _hoisted_3 = { class: "mt-1 text-sm text-muted" };
var _hoisted_4 = { class: "my-4 flex items-center justify-between" };
var _hoisted_5 = { class: "my-0 text-lg font-semibold" };
var _hoisted_6 = {
	key: 0,
	class: "flex items-center justify-center py-8"
};
var _hoisted_7 = {
	key: 1,
	class: "py-4 text-center text-sm text-muted"
};
var _hoisted_8 = {
	key: 2,
	class: "flex flex-col gap-3"
};
//#endregion
//#region src/platform/skills/components/SkillPacksPanel.vue
var SkillPacksPanel_default = /* @__PURE__ */ defineComponent({
	__name: "SkillPacksPanel",
	setup(__props) {
		const { t } = useI18n();
		const dialogStore = useDialogStore();
		const { packs, loading, hasLoaded, operatingPackName, fetchSkillPacks, deleteSkillPack } = useSkillPacks();
		const editorVisible = ref(false);
		const selectedPack = ref();
		const keyboardNavigation = ref(false);
		useEventListener("keydown", (event) => {
			if (event.key !== "Escape") keyboardNavigation.value = true;
		}, { capture: true });
		useEventListener(["pointerdown", "pointermove"], () => keyboardNavigation.value = false, {
			capture: true,
			passive: true
		});
		function openCreateDialog() {
			selectedPack.value = void 0;
			editorVisible.value = true;
		}
		function openEditDialog(pack) {
			selectedPack.value = pack;
			editorVisible.value = true;
		}
		function confirmDelete(pack) {
			const dialog = showConfirmDialog({
				headerProps: { title: t("skillPacks.deleteConfirmTitle") },
				props: { promptText: t("skillPacks.deleteConfirmMessage", { name: pack.name }) },
				footerProps: {
					confirmText: t("g.delete"),
					confirmVariant: "destructive",
					onCancel: () => dialogStore.closeDialog(dialog),
					onConfirm: async () => {
						dialogStore.closeDialog(dialog);
						await deleteSkillPack(pack);
					}
				}
			});
		}
		fetchSkillPacks();
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", _hoisted_1, [
				createBaseVNode("div", null, [createBaseVNode("h2", _hoisted_2, toDisplayString(_ctx.$t("skillPacks.title")), 1), createBaseVNode("p", _hoisted_3, toDisplayString(_ctx.$t("skillPacks.panelDescription")), 1)]),
				_cache[3] || (_cache[3] = createBaseVNode("div", { class: "my-4 border-t border-border-default" }, null, -1)),
				createBaseVNode("div", _hoisted_4, [createBaseVNode("h3", _hoisted_5, toDisplayString(_ctx.$t("skillPacks.yourPacks")), 1), createVNode(Button_default, { onClick: openCreateDialog }, {
					default: withCtx(() => [_cache[1] || (_cache[1] = createBaseVNode("i", { class: "mr-1 icon-[lucide--plus] size-4" }, null, -1)), createTextVNode(" " + toDisplayString(_ctx.$t("skillPacks.addPack")), 1)]),
					_: 1
				})]),
				unref(loading) && !unref(hasLoaded) ? (openBlock(), createElementBlock("div", _hoisted_6, [..._cache[2] || (_cache[2] = [createBaseVNode("i", { class: "icon-[lucide--loader-circle] size-8 animate-spin text-muted" }, null, -1)])])) : unref(packs).length === 0 ? (openBlock(), createElementBlock("div", _hoisted_7, toDisplayString(_ctx.$t("skillPacks.noPacks")), 1)) : (openBlock(), createElementBlock("div", _hoisted_8, [(openBlock(true), createElementBlock(Fragment, null, renderList(unref(packs), (pack) => {
					return openBlock(), createBlock(SkillPackListItem_default, {
						key: pack.id,
						pack,
						loading: unref(operatingPackName) === pack.name,
						disabled: unref(operatingPackName) !== null,
						"keyboard-navigation": keyboardNavigation.value,
						onEdit: ($event) => openEditDialog(pack),
						onDelete: ($event) => confirmDelete(pack)
					}, null, 8, [
						"pack",
						"loading",
						"disabled",
						"keyboard-navigation",
						"onEdit",
						"onDelete"
					]);
				}), 128))])),
				createVNode(SkillPackFormDialog_default, {
					visible: editorVisible.value,
					"onUpdate:visible": _cache[0] || (_cache[0] = ($event) => editorVisible.value = $event),
					pack: selectedPack.value
				}, null, 8, ["visible", "pack"])
			]);
		};
	}
});
//#endregion
export { SkillPacksPanel_default as default };
