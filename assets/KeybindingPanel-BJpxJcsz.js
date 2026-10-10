import "./rolldown-runtime-xtsTai4I.js";
import { Dt as withDirectives, E as withModifiers, Et as withCtx, F as createBaseVNode, Ft as reactive, G as defineComponent, H as createTextVNode, I as createBlock, Jt as normalizeClass, Kt as unref, L as createCommentVNode, Lt as ref, O as Fragment, P as computed, R as createElementBlock, St as watch, T as withKeys, U as createVNode, Vt as toRaw, Zt as toDisplayString, dt as renderList, j as Teleport, lt as openBlock, mt as resolveDirective, ot as onMounted, xt as useTemplateRef } from "./vendor-vue-core-C1utdb0s.js";
import { $r as KeybindingImpl, G as useKeybindingService, Ni as Menu_default, Qr as useKeybindingStore, So as uploadFile, Zi as SearchInput_default, Zr as useCommandStore, ei as KeyComboImpl, i as useSettingStore, nt as useDialogService, vu as useErrorHandling } from "./layoutStore-CZsuzg91.js";
import { i as api } from "./api-Bt-fGt5a.js";
import { _ as objectType, b as stringType, c as booleanType, s as arrayType, t as fromZodError } from "./vendor-zod-TMj9Wsdv.js";
import { t as useToastStore } from "./toastStore-CTfykAzG.js";
import { r as useI18n } from "./vendor-i18n-BZvE7WBQ.js";
import { d as t } from "./i18n-C3J-ToPr.js";
import { T as normalizeI18nKey } from "./formatUtil-DuxXRy1z.js";
import { t as useDialogStore } from "./dialogStore-B0GYyals.js";
import { a as showConfirmDialog } from "./DialogPortal-B3D-ZhO6.js";
import { nn as RovingFocusGroup_default, tn as RovingFocusItem_default } from "./vendor-reka-ui-tdehH9A1.js";
import { t as cn } from "./src-DI1bBfrb.js";
import { t as Button_default } from "./Button-j0oCzR82.js";
import { t as downloadBlob } from "./downloadUtil-Bysc7OZ_.js";
import { a as Select_default, i as SelectContent_default, n as SelectTrigger_default, r as SelectItem_default, t as SelectValue_default } from "./SelectValue-BYMnIcxq.js";
import { t as _plugin_vue_export_helper_default } from "./_plugin-vue_export-helper-DEKQMRQ4.js";
import { t as Badge_default } from "./Badge-DXbmxSwq.js";
import { t as Pagination_default } from "./Pagination-BWDSswkE.js";
import { a as TableBody_default, i as TableCell_default, n as TableHeader_default, o as Table_default, r as TableHead_default, t as TableRow_default } from "./TableRow-DTbUSGOo.js";
import { t as ContextMenu_default } from "./ContextMenu-DHbt-unn.js";
import { n as sortByText, r as TableSortHead_default, t as filterByQuery } from "./tableUtils-CkWMmXgy.js";
//#region src/components/dialog/content/setting/keybinding/EditKeybindingContent.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1$9 = { class: "flex w-96 flex-col border-t border-border-default px-4" };
var _hoisted_2$7 = { class: "mb-4 text-sm text-muted-foreground" };
var _hoisted_3$5 = { class: "mb-4 text-sm text-base-foreground" };
var _hoisted_4$3 = [
	"value",
	"placeholder",
	"aria-label"
];
var _hoisted_5$2 = { class: "min-h-12" };
var _hoisted_6$2 = {
	key: 0,
	class: "m-0 text-sm text-destructive-background"
};
var _hoisted_7$1 = {
	key: 1,
	class: "m-0 text-sm text-destructive-background"
};
//#endregion
//#region src/components/dialog/content/setting/keybinding/EditKeybindingContent.vue
var EditKeybindingContent_default = /* @__PURE__ */ defineComponent({
	__name: "EditKeybindingContent",
	props: {
		dialogState: {},
		commandLabel: {},
		onUpdateCombo: { type: Function },
		existingKeybindingOnCombo: {}
	},
	setup(__props) {
		function captureKeybinding(event) {
			if (!event.shiftKey && !event.altKey && !event.ctrlKey && !event.metaKey) {
				if (event.key === "Escape") return;
			}
			__props.onUpdateCombo(KeyComboImpl.fromEvent(event));
		}
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", _hoisted_1$9, [
				createBaseVNode("p", _hoisted_2$7, toDisplayString(_ctx.$t("g.setAKeybindingForTheFollowing")), 1),
				createBaseVNode("div", _hoisted_3$5, toDisplayString(__props.commandLabel), 1),
				createBaseVNode("input", {
					class: "mb-4 w-full rounded-sm border border-border-default bg-secondary-background px-3 py-2 text-center text-base-foreground shadow-none focus:outline-none",
					value: __props.dialogState.newCombo?.toString() ?? "",
					placeholder: _ctx.$t("g.enterYourKeybind"),
					"aria-label": _ctx.$t("g.enterYourKeybind"),
					autocomplete: "off",
					autofocus: "",
					onKeydown: withModifiers(captureKeybinding, ["stop", "prevent"])
				}, null, 40, _hoisted_4$3),
				createBaseVNode("div", _hoisted_5$2, [__props.dialogState.newCombo?.isBrowserReserved ? (openBlock(), createElementBlock("p", _hoisted_6$2, toDisplayString(_ctx.$t("g.browserReservedKeybinding")), 1)) : __props.existingKeybindingOnCombo ? (openBlock(), createElementBlock("p", _hoisted_7$1, toDisplayString(_ctx.$t("g.keybindingAlreadyExists")) + " " + toDisplayString(__props.existingKeybindingOnCombo.commandId), 1)) : createCommentVNode("", true)])
			]);
		};
	}
});
//#endregion
//#region src/components/dialog/content/setting/keybinding/EditKeybindingFooter.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1$8 = { class: "flex w-full justify-end gap-2 px-4 py-2" };
//#endregion
//#region src/components/dialog/content/setting/keybinding/EditKeybindingFooter.vue
var EditKeybindingFooter_default = /* @__PURE__ */ defineComponent({
	__name: "EditKeybindingFooter",
	props: {
		dialogState: {},
		existingKeybindingOnCombo: {}
	},
	setup(__props) {
		const keybindingStore = useKeybindingStore();
		const keybindingService = useKeybindingService();
		const dialogStore = useDialogStore();
		function handleCancel() {
			dialogStore.closeDialog({ key: DIALOG_KEY });
		}
		async function handleSave() {
			const combo = __props.dialogState.newCombo;
			const commandId = __props.dialogState.commandId;
			if (!combo || !commandId) return;
			dialogStore.closeDialog({ key: DIALOG_KEY });
			if (__props.dialogState.mode === "add") keybindingStore.addUserKeybinding(new KeybindingImpl({
				commandId,
				combo
			}));
			else if (__props.dialogState.existingBinding) keybindingStore.updateSpecificKeybinding(__props.dialogState.existingBinding, new KeybindingImpl({
				commandId,
				combo
			}));
			else keybindingStore.updateKeybindingOnCommand(new KeybindingImpl({
				commandId,
				combo
			}));
			await keybindingService.persistUserKeybindings();
		}
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", _hoisted_1$8, [createVNode(Button_default, {
				variant: "textonly",
				size: "md",
				class: "text-muted-foreground",
				onClick: handleCancel
			}, {
				default: withCtx(() => [createTextVNode(toDisplayString(_ctx.$t("g.cancel")), 1)]),
				_: 1
			}), createVNode(Button_default, {
				variant: __props.existingKeybindingOnCombo ? "destructive" : __props.dialogState.newCombo?.isBrowserReserved ? "secondary" : "primary",
				size: "md",
				disabled: !__props.dialogState.newCombo,
				class: "px-4 py-2",
				onClick: handleSave
			}, {
				default: withCtx(() => [createTextVNode(toDisplayString(__props.existingKeybindingOnCombo ? _ctx.$t("g.overwrite") : __props.dialogState.newCombo?.isBrowserReserved ? _ctx.$t("g.saveAnyway") : _ctx.$t("g.save")), 1)]),
				_: 1
			}, 8, ["variant", "disabled"])]);
		};
	}
});
//#endregion
//#region src/components/dialog/content/setting/keybinding/EditKeybindingHeader.vue
var _sfc_main = {};
var _hoisted_1$7 = { class: "flex w-full items-center gap-2 p-4" };
var _hoisted_2$6 = { class: "m-0 font-semibold" };
function _sfc_render(_ctx, _cache) {
	return openBlock(), createElementBlock("div", _hoisted_1$7, [createBaseVNode("p", _hoisted_2$6, toDisplayString(_ctx.$t("g.modifyKeybinding")), 1)]);
}
var EditKeybindingHeader_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main, [["render", _sfc_render]]);
//#endregion
//#region src/composables/useEditKeybindingDialog.ts
var DIALOG_KEY = "edit-keybinding";
function useEditKeybindingDialog() {
	const { showSmallLayoutDialog } = useDialogService();
	const keybindingStore = useKeybindingStore();
	function show(options) {
		const dialogState = reactive({
			commandId: options.commandId,
			newCombo: options.currentCombo,
			currentCombo: options.currentCombo,
			mode: options.mode ?? "edit",
			existingBinding: options.existingBinding ?? null
		});
		const existingKeybindingOnCombo = computed(() => {
			if (!dialogState.newCombo) return null;
			if (dialogState.currentCombo?.equals(dialogState.newCombo)) return null;
			return keybindingStore.getKeybinding(dialogState.newCombo);
		});
		function onUpdateCombo(combo) {
			dialogState.newCombo = combo;
		}
		showSmallLayoutDialog({
			key: DIALOG_KEY,
			headerComponent: EditKeybindingHeader_default,
			footerComponent: EditKeybindingFooter_default,
			component: EditKeybindingContent_default,
			props: {
				dialogState,
				onUpdateCombo,
				commandLabel: options.commandLabel,
				existingKeybindingOnCombo
			},
			headerProps: {},
			footerProps: {
				dialogState,
				existingKeybindingOnCombo
			}
		});
	}
	return { show };
}
//#endregion
//#region src/components/dialog/content/setting/keybinding/UnsavedChangesContent.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1$6 = { class: "flex w-full max-w-[420px] flex-col border-t border-border-default" };
var _hoisted_2$5 = { class: "flex flex-col gap-4 p-4" };
var _hoisted_3$4 = { class: "m-0 text-sm text-muted-foreground" };
var _hoisted_4$2 = { class: "flex justify-end gap-2" };
//#endregion
//#region src/components/dialog/content/setting/keybinding/UnsavedChangesContent.vue
var UnsavedChangesContent_default = /* @__PURE__ */ defineComponent({
	__name: "UnsavedChangesContent",
	props: { onResult: { type: Function } },
	setup(__props) {
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", _hoisted_1$6, [createBaseVNode("div", _hoisted_2$5, [createBaseVNode("p", _hoisted_3$4, toDisplayString(_ctx.$t("g.keybindingPresets.unsavedChangesMessage")), 1), createBaseVNode("div", _hoisted_4$2, [
				createVNode(Button_default, {
					variant: "textonly",
					class: "text-muted-foreground",
					onClick: _cache[0] || (_cache[0] = ($event) => __props.onResult(null))
				}, {
					default: withCtx(() => [createTextVNode(toDisplayString(_ctx.$t("g.cancel")), 1)]),
					_: 1
				}),
				createVNode(Button_default, {
					variant: "secondary",
					class: "bg-secondary-background",
					onClick: _cache[1] || (_cache[1] = ($event) => __props.onResult(false))
				}, {
					default: withCtx(() => [createTextVNode(toDisplayString(_ctx.$t("g.keybindingPresets.discardAndSwitch")), 1)]),
					_: 1
				}),
				createVNode(Button_default, {
					variant: "secondary",
					class: "bg-base-foreground text-base-background",
					onClick: _cache[2] || (_cache[2] = ($event) => __props.onResult(true))
				}, {
					default: withCtx(() => [createTextVNode(toDisplayString(_ctx.$t("g.keybindingPresets.saveAndSwitch")), 1)]),
					_: 1
				})
			])])]);
		};
	}
});
//#endregion
//#region src/components/dialog/content/setting/keybinding/UnsavedChangesHeader.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1$5 = { class: "flex w-full items-center p-4" };
var _hoisted_2$4 = { class: "m-0 text-sm font-medium" };
//#endregion
//#region src/components/dialog/content/setting/keybinding/UnsavedChangesHeader.vue
var UnsavedChangesHeader_default = /* @__PURE__ */ defineComponent({
	__name: "UnsavedChangesHeader",
	props: { presetName: {} },
	setup(__props) {
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", _hoisted_1$5, [createBaseVNode("p", _hoisted_2$4, toDisplayString(_ctx.$t("g.keybindingPresets.unsavedChangesTo", { name: __props.presetName })), 1)]);
		};
	}
});
//#endregion
//#region src/platform/keybindings/types.ts
var zKeyCombo = objectType({
	key: stringType(),
	ctrl: booleanType().optional(),
	alt: booleanType().optional(),
	shift: booleanType().optional(),
	meta: booleanType().optional()
});
var zKeybinding = objectType({
	commandId: stringType(),
	combo: zKeyCombo,
	targetElementId: stringType().optional()
});
var zKeybindingPreset = objectType({
	name: stringType().trim().min(1, "Preset name cannot be empty"),
	newBindings: arrayType(zKeybinding),
	unsetBindings: arrayType(zKeybinding)
});
//#endregion
//#region src/platform/keybindings/presetService.ts
var PRESETS_DIR = "keybindings";
function presetFilePath(name) {
	const trimmed = name.trim();
	if (!trimmed || trimmed === "default" || trimmed.toLowerCase().endsWith(".json") || trimmed.includes("/") || trimmed.includes("\\") || trimmed.includes("..") || trimmed.startsWith(".")) throw new Error(t("g.keybindingPresets.invalidPresetName"));
	return `${PRESETS_DIR}/${trimmed}.json`;
}
function buildPresetFromStore(name, keybindingStore) {
	return {
		name,
		newBindings: toRaw(keybindingStore.getUserKeybindingValues()),
		unsetBindings: toRaw(keybindingStore.getUserUnsetKeybindingValues())
	};
}
function useKeybindingPresetService() {
	const keybindingStore = useKeybindingStore();
	const keybindingService = useKeybindingService();
	const settingStore = useSettingStore();
	const dialogService = useDialogService();
	const dialogStore = useDialogStore();
	const toast = useToastStore();
	const { wrapWithErrorHandlingAsync } = useErrorHandling();
	async function switchToDefaultPreset({ resetBindings = true } = {}) {
		if (resetBindings) keybindingStore.resetAllKeybindings();
		keybindingStore.currentPresetName = "default";
		keybindingStore.savedPresetData = null;
		await keybindingService.persistUserKeybindings();
		await settingStore.set("Comfy.Keybinding.CurrentPreset", "default");
	}
	const UNSAVED_DIALOG_KEY = "unsaved-keybinding-changes";
	function showUnsavedChangesDialog(presetName) {
		return new Promise((resolve) => {
			dialogService.showSmallLayoutDialog({
				key: UNSAVED_DIALOG_KEY,
				headerComponent: UnsavedChangesHeader_default,
				headerProps: { presetName },
				component: UnsavedChangesContent_default,
				props: { onResult: (result) => {
					resolve(result);
					dialogStore.closeDialog({ key: UNSAVED_DIALOG_KEY });
				} },
				dialogComponentProps: { onClose: () => resolve(null) }
			});
		});
	}
	async function listPresets() {
		return (await api.listUserDataFullInfo(PRESETS_DIR)).map((f) => f.path.replace(/\.json$/, "")).filter((name) => name.length > 0);
	}
	async function loadPreset(name) {
		const resp = await api.getUserData(presetFilePath(name));
		if (!resp.ok) throw new Error(t("g.keybindingPresets.loadPresetFailed", { name }));
		const data = await resp.json();
		const result = zKeybindingPreset.safeParse(data);
		if (!result.success) throw new Error(t("g.keybindingPresets.invalidPresetFile") + ": " + fromZodError(result.error).message);
		return {
			...result.data,
			name
		};
	}
	function applyPreset(preset) {
		keybindingStore.resetAllKeybindings();
		for (const binding of preset.unsetBindings) keybindingStore.unsetKeybinding(new KeybindingImpl(binding));
		for (const binding of preset.newBindings) keybindingStore.addUserKeybinding(new KeybindingImpl(binding));
		keybindingStore.savedPresetData = buildPresetFromStore(preset.name, keybindingStore);
		keybindingStore.currentPresetName = preset.name;
	}
	async function savePreset(name) {
		const preset = buildPresetFromStore(name, keybindingStore);
		await api.storeUserData(presetFilePath(name), JSON.stringify(preset), {
			overwrite: true,
			stringify: false
		});
		keybindingStore.savedPresetData = preset;
		keybindingStore.currentPresetName = name;
		await keybindingService.persistUserKeybindings();
		await settingStore.set("Comfy.Keybinding.CurrentPreset", name);
		toast.add({
			severity: "success",
			summary: t("g.keybindingPresets.presetSaved", { name }),
			life: 3e3
		});
	}
	async function deletePreset(name) {
		if (!await dialogService.confirm({
			title: t("g.keybindingPresets.deletePresetTitle"),
			message: t("g.keybindingPresets.deletePresetWarning"),
			type: "delete"
		})) return;
		if (!(await api.deleteUserData(presetFilePath(name))).ok) throw new Error(t("g.keybindingPresets.deletePresetFailed", { name }));
		if (keybindingStore.currentPresetName === name) await switchToDefaultPreset();
		toast.add({
			severity: "info",
			summary: t("g.keybindingPresets.presetDeleted", { name }),
			life: 3e3
		});
	}
	function exportPreset() {
		const preset = buildPresetFromStore(keybindingStore.currentPresetName, keybindingStore);
		downloadBlob(`${preset.name}.json`, new Blob([JSON.stringify(preset, null, 2)], { type: "application/json" }));
	}
	async function importPreset() {
		const text = await (await uploadFile("application/json")).text();
		let data;
		try {
			data = JSON.parse(text);
		} catch {
			throw new Error(t("g.keybindingPresets.invalidPresetFile"));
		}
		const result = zKeybindingPreset.safeParse(data);
		if (!result.success) throw new Error(t("g.keybindingPresets.invalidPresetFile") + ": " + fromZodError(result.error).message);
		const preset = result.data;
		await api.storeUserData(presetFilePath(preset.name), JSON.stringify(preset), {
			overwrite: true,
			stringify: false
		});
		await switchPreset(preset.name);
		toast.add({
			severity: "success",
			summary: t("g.keybindingPresets.presetImported"),
			life: 3e3
		});
	}
	async function promptAndSaveNewPreset() {
		const name = await dialogService.prompt({
			title: t("g.keybindingPresets.saveAsNewPreset"),
			message: t("g.keybindingPresets.presetNamePrompt"),
			defaultValue: ""
		});
		if (!name) return false;
		const trimmedName = name.trim();
		if (!trimmedName) return false;
		if ((await listPresets()).includes(trimmedName)) {
			if (!await dialogService.confirm({
				title: t("g.keybindingPresets.overwritePresetTitle"),
				message: t("g.keybindingPresets.overwritePresetMessage", { name: trimmedName }),
				type: "overwrite"
			})) return false;
		}
		await savePreset(trimmedName);
		return true;
	}
	async function switchPreset(targetName) {
		if (keybindingStore.isCurrentPresetModified) {
			const result = await showUnsavedChangesDialog(keybindingStore.currentPresetName === "default" ? t("g.keybindingPresets.default") : keybindingStore.currentPresetName);
			if (result === null) return;
			if (result) {
				if (keybindingStore.currentPresetName !== "default") await savePreset(keybindingStore.currentPresetName);
				else if (!await promptAndSaveNewPreset()) return;
			}
		}
		if (targetName === "default") {
			await switchToDefaultPreset();
			return;
		}
		applyPreset(await loadPreset(targetName));
		await keybindingService.persistUserKeybindings();
		await settingStore.set("Comfy.Keybinding.CurrentPreset", targetName);
	}
	return {
		listPresets: wrapWithErrorHandlingAsync(listPresets),
		loadPreset: wrapWithErrorHandlingAsync(loadPreset),
		savePreset: wrapWithErrorHandlingAsync(savePreset),
		deletePreset: wrapWithErrorHandlingAsync(deletePreset),
		exportPreset,
		importPreset: wrapWithErrorHandlingAsync(importPreset),
		switchPreset: wrapWithErrorHandlingAsync(switchPreset),
		switchToDefaultPreset: wrapWithErrorHandlingAsync(switchToDefaultPreset),
		promptAndSaveNewPreset: wrapWithErrorHandlingAsync(promptAndSaveNewPreset),
		applyPreset
	};
}
//#endregion
//#region src/components/dialog/content/setting/keybinding/KeyComboDisplay.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1$4 = { class: "flex flex-row gap-0.5" };
//#endregion
//#region src/components/dialog/content/setting/keybinding/KeyComboDisplay.vue
var KeyComboDisplay_default = /* @__PURE__ */ defineComponent({
	__name: "KeyComboDisplay",
	props: {
		keyCombo: {},
		isModified: {
			type: Boolean,
			default: false
		}
	},
	setup(__props) {
		const keySequences = computed(() => __props.keyCombo.getKeySequences());
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("span", _hoisted_1$4, [(openBlock(true), createElementBlock(Fragment, null, renderList(keySequences.value, (sequence, index) => {
				return openBlock(), createBlock(Badge_default, {
					key: index,
					class: "min-w-6 justify-center gap-1 bg-interface-menu-keybind-surface-default text-center font-normal text-base-foreground capitalize",
					severity: __props.isModified ? "info" : "secondary"
				}, {
					default: withCtx(() => [createTextVNode(toDisplayString(sequence), 1)]),
					_: 2
				}, 1032, ["severity"]);
			}), 128))]);
		};
	}
});
//#endregion
//#region src/components/dialog/content/setting/keybinding/KeybindingList.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1$3 = {
	key: 0,
	class: "@container/keybindings flex w-full min-w-0 items-center gap-1 overflow-hidden",
	"data-testid": "keybinding-list"
};
var _hoisted_2$3 = {
	key: 1,
	class: "hidden rounded-sm px-1.5 py-0.5 text-xs text-muted-foreground @[16rem]/keybindings:inline",
	"data-testid": "keybinding-list-more-wide"
};
var _hoisted_3$3 = {
	key: 2,
	class: "hidden rounded-sm px-1.5 py-0.5 text-xs text-muted-foreground @[12rem]/keybindings:inline @[16rem]/keybindings:hidden",
	"data-testid": "keybinding-list-more-medium"
};
var _hoisted_4$1 = {
	key: 3,
	class: "hidden rounded-sm px-1.5 py-0.5 text-xs text-muted-foreground @[8rem]/keybindings:inline @[12rem]/keybindings:hidden",
	"data-testid": "keybinding-list-more-compact"
};
var _hoisted_5$1 = {
	class: "sr-only",
	"data-testid": "keybinding-list-aria"
};
var _hoisted_6$1 = { key: 1 };
//#endregion
//#region src/components/dialog/content/setting/keybinding/KeybindingList.vue
var KeybindingList_default = /* @__PURE__ */ defineComponent({
	__name: "KeybindingList",
	props: {
		keybindings: {},
		isModified: {
			type: Boolean,
			default: false
		}
	},
	setup(__props) {
		const { t } = useI18n();
		const ariaLabel = computed(() => {
			if (__props.keybindings.length === 0) return "";
			const combos = __props.keybindings.map((binding) => binding.combo.toString()).join(", ");
			return t("g.keybindingListAriaLabel", { combos });
		});
		return (_ctx, _cache) => {
			return __props.keybindings.length > 0 ? (openBlock(), createElementBlock("span", _hoisted_1$3, [
				createVNode(KeyComboDisplay_default, {
					"key-combo": __props.keybindings[0].combo,
					"is-modified": __props.isModified
				}, null, 8, ["key-combo", "is-modified"]),
				__props.keybindings.length >= 2 ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [_cache[0] || (_cache[0] = createBaseVNode("span", {
					class: "hidden text-muted-foreground @[16rem]/keybindings:inline",
					"aria-hidden": "true"
				}, " , ", -1)), createVNode(KeyComboDisplay_default, {
					class: "hidden @[16rem]/keybindings:inline-flex",
					"key-combo": __props.keybindings[1].combo,
					"is-modified": __props.isModified
				}, null, 8, ["key-combo", "is-modified"])], 64)) : createCommentVNode("", true),
				__props.keybindings.length > 2 ? (openBlock(), createElementBlock("span", _hoisted_2$3, toDisplayString(_ctx.$t("g.nMoreKeybindings", { count: __props.keybindings.length - 2 })), 1)) : createCommentVNode("", true),
				__props.keybindings.length >= 2 ? (openBlock(), createElementBlock("span", _hoisted_3$3, toDisplayString(_ctx.$t("g.nMoreKeybindings", { count: __props.keybindings.length - 1 })), 1)) : createCommentVNode("", true),
				__props.keybindings.length >= 2 ? (openBlock(), createElementBlock("span", _hoisted_4$1, toDisplayString(_ctx.$t("g.nMoreKeybindingsCompact", { count: __props.keybindings.length - 1 })), 1)) : createCommentVNode("", true),
				createBaseVNode("span", _hoisted_5$1, toDisplayString(ariaLabel.value), 1)
			])) : (openBlock(), createElementBlock("span", _hoisted_6$1, "-"));
		};
	}
});
//#endregion
//#region src/components/dialog/content/setting/keybinding/KeybindingCommandRows.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1$2 = ["title"];
var _hoisted_2$2 = {
	key: 1,
	class: "icon-[lucide--triangle-alert] shrink-0 text-warning-background"
};
var _hoisted_3$2 = ["title"];
var _hoisted_4 = {
	class: "pl-4",
	"data-testid": "keybinding-expansion-content"
};
var _hoisted_5 = { class: "flex items-center gap-4" };
var _hoisted_6 = { class: "text-muted-foreground" };
var _hoisted_7 = { class: "flex flex-row" };
//#endregion
//#region src/components/dialog/content/setting/keybinding/KeybindingCommandRows.vue
var KeybindingCommandRows_default = /* @__PURE__ */ defineComponent({
	__name: "KeybindingCommandRows",
	props: {
		command: {},
		expanded: { type: Boolean },
		selected: { type: Boolean }
	},
	emits: [
		"activate",
		"add",
		"edit",
		"remove",
		"removeSingle",
		"reset",
		"rowContextmenu",
		"rowDblclick"
	],
	setup(__props, { emit: __emit }) {
		const emit = __emit;
		return (_ctx, _cache) => {
			const _directive_tooltip = resolveDirective("tooltip");
			return openBlock(), createElementBlock(Fragment, null, [createVNode(unref(RovingFocusItem_default), {
				"as-child": "",
				"tab-stop-id": __props.command.rowId
			}, {
				default: withCtx(() => [createVNode(TableRow_default, {
					id: __props.command.rowId,
					"data-state": __props.selected ? "selected" : void 0,
					"aria-expanded": __props.command.expandable ? __props.expanded : void 0,
					onClick: _cache[6] || (_cache[6] = ($event) => emit("activate")),
					onDblclick: _cache[7] || (_cache[7] = ($event) => emit("rowDblclick")),
					onContextmenu: _cache[8] || (_cache[8] = ($event) => emit("rowContextmenu", $event)),
					onKeydown: [
						_cache[9] || (_cache[9] = withKeys(withModifiers(($event) => emit("rowContextmenu", $event), ["self", "prevent"]), ["context-menu"])),
						_cache[10] || (_cache[10] = withKeys(withModifiers(($event) => emit("activate"), ["self", "prevent"]), ["enter"])),
						_cache[11] || (_cache[11] = withKeys(withModifiers(($event) => emit("rowContextmenu", $event), [
							"shift",
							"self",
							"prevent"
						]), ["f10"])),
						_cache[12] || (_cache[12] = withKeys(withModifiers(($event) => emit("activate"), ["self", "prevent"]), ["space"]))
					]
				}, {
					default: withCtx(() => [
						createVNode(TableCell_default, { class: "p-1" }, {
							default: withCtx(() => [createBaseVNode("div", {
								class: normalizeClass(unref(cn)("flex min-w-0 items-center gap-1 truncate", !__props.command.expandable && "pl-5")),
								title: __props.command.id
							}, [
								__props.command.expandable ? (openBlock(), createElementBlock("i", {
									key: 0,
									class: normalizeClass(unref(cn)("icon-[lucide--chevron-right] size-4 shrink-0 text-muted-foreground transition-transform", __props.expanded && "rotate-90"))
								}, null, 2)) : createCommentVNode("", true),
								__props.command.keybindings.some((binding) => binding.combo.isBrowserReserved) ? withDirectives((openBlock(), createElementBlock("i", _hoisted_2$2, null, 512)), [[_directive_tooltip, _ctx.$t("g.browserReservedKeybindingTooltip")]]) : createCommentVNode("", true),
								createTextVNode(" " + toDisplayString(__props.command.label), 1)
							], 10, _hoisted_1$2)]),
							_: 1
						}),
						createVNode(TableCell_default, { class: "p-1" }, {
							default: withCtx(() => [createVNode(KeybindingList_default, {
								keybindings: __props.command.keybindings,
								"is-modified": __props.command.isModified
							}, null, 8, ["keybindings", "is-modified"])]),
							_: 1
						}),
						createVNode(TableCell_default, { class: "p-1" }, {
							default: withCtx(() => [createBaseVNode("span", {
								class: "block truncate",
								title: __props.command.source
							}, toDisplayString(__props.command.source || "-"), 9, _hoisted_3$2)]),
							_: 1
						}),
						createVNode(TableCell_default, { class: "p-1 whitespace-nowrap" }, {
							default: withCtx(() => [createBaseVNode("div", {
								class: "flex flex-row justify-end whitespace-nowrap",
								onClick: _cache[4] || (_cache[4] = withModifiers(() => {}, ["stop"])),
								onDblclick: _cache[5] || (_cache[5] = withModifiers(() => {}, ["stop"]))
							}, [
								__props.command.keybindings.length === 1 ? withDirectives((openBlock(), createBlock(Button_default, {
									key: 0,
									variant: "textonly",
									size: "icon",
									"aria-label": _ctx.$t("g.edit"),
									onClick: _cache[0] || (_cache[0] = ($event) => emit("edit", __props.command.keybindings[0]))
								}, {
									default: withCtx(() => [..._cache[13] || (_cache[13] = [createBaseVNode("i", { class: "icon-[lucide--pencil]" }, null, -1)])]),
									_: 1
								}, 8, ["aria-label"])), [[_directive_tooltip, _ctx.$t("g.edit")]]) : createCommentVNode("", true),
								withDirectives((openBlock(), createBlock(Button_default, {
									variant: "textonly",
									size: "icon",
									"aria-label": _ctx.$t("g.addNewKeybinding"),
									onClick: _cache[1] || (_cache[1] = ($event) => emit("add"))
								}, {
									default: withCtx(() => [..._cache[14] || (_cache[14] = [createBaseVNode("i", { class: "icon-[lucide--plus]" }, null, -1)])]),
									_: 1
								}, 8, ["aria-label"])), [[_directive_tooltip, _ctx.$t("g.addNewKeybinding")]]),
								withDirectives((openBlock(), createBlock(Button_default, {
									variant: "textonly",
									size: "icon",
									"aria-label": _ctx.$t("g.reset"),
									disabled: !__props.command.isModified,
									onClick: _cache[2] || (_cache[2] = ($event) => emit("reset"))
								}, {
									default: withCtx(() => [..._cache[15] || (_cache[15] = [createBaseVNode("i", { class: "icon-[lucide--rotate-ccw]" }, null, -1)])]),
									_: 1
								}, 8, ["aria-label", "disabled"])), [[_directive_tooltip, _ctx.$t("g.reset")]]),
								withDirectives((openBlock(), createBlock(Button_default, {
									variant: "textonly",
									size: "icon",
									"aria-label": _ctx.$t("g.delete"),
									disabled: __props.command.keybindings.length === 0,
									onClick: _cache[3] || (_cache[3] = ($event) => emit("remove"))
								}, {
									default: withCtx(() => [..._cache[16] || (_cache[16] = [createBaseVNode("i", { class: "icon-[lucide--trash-2]" }, null, -1)])]),
									_: 1
								}, 8, ["aria-label", "disabled"])), [[_directive_tooltip, _ctx.$t("g.delete")]])
							], 32)]),
							_: 1
						})
					]),
					_: 1
				}, 8, [
					"id",
					"data-state",
					"aria-expanded"
				])]),
				_: 1
			}, 8, ["tab-stop-id"]), __props.expanded ? (openBlock(), createBlock(TableRow_default, { key: 0 }, {
				default: withCtx(() => [createVNode(TableCell_default, {
					colspan: "4",
					class: "p-0"
				}, {
					default: withCtx(() => [createBaseVNode("div", _hoisted_4, [(openBlock(true), createElementBlock(Fragment, null, renderList(__props.command.keybindings, (binding, index) => {
						return openBlock(), createElementBlock("div", {
							key: binding.combo.serialize(),
							"data-testid": "keybinding-expansion-binding",
							class: "flex items-center justify-between border-b border-border-subtle py-1.5 last:border-b-0"
						}, [createBaseVNode("div", _hoisted_5, [createBaseVNode("span", _hoisted_6, toDisplayString(__props.command.label), 1), createVNode(KeyComboDisplay_default, {
							"key-combo": binding.combo,
							"is-modified": __props.command.isModified
						}, null, 8, ["key-combo", "is-modified"])]), createBaseVNode("div", _hoisted_7, [withDirectives((openBlock(), createBlock(Button_default, {
							variant: "textonly",
							size: "icon",
							"aria-label": _ctx.$t("g.edit"),
							onClick: ($event) => emit("edit", binding)
						}, {
							default: withCtx(() => [..._cache[17] || (_cache[17] = [createBaseVNode("i", { class: "icon-[lucide--pencil]" }, null, -1)])]),
							_: 1
						}, 8, ["aria-label", "onClick"])), [[_directive_tooltip, _ctx.$t("g.edit")]]), withDirectives((openBlock(), createBlock(Button_default, {
							variant: "textonly",
							size: "icon",
							"aria-label": _ctx.$t("g.removeKeybinding"),
							onClick: ($event) => emit("removeSingle", index)
						}, {
							default: withCtx(() => [..._cache[18] || (_cache[18] = [createBaseVNode("i", { class: "icon-[lucide--trash-2]" }, null, -1)])]),
							_: 1
						}, 8, ["aria-label", "onClick"])), [[_directive_tooltip, _ctx.$t("g.removeKeybinding")]])])]);
					}), 128))])]),
					_: 1
				})]),
				_: 1
			})) : createCommentVNode("", true)], 64);
		};
	}
});
//#endregion
//#region src/components/dialog/content/setting/keybinding/KeybindingPresetToolbar.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1$1 = { class: "flex items-center gap-2" };
var _hoisted_2$1 = { class: "max-w-60" };
var _hoisted_3$1 = { class: "truncate" };
//#endregion
//#region src/components/dialog/content/setting/keybinding/KeybindingPresetToolbar.vue
var KeybindingPresetToolbar_default = /* @__PURE__ */ defineComponent({
	__name: "KeybindingPresetToolbar",
	props: { presetNames: {} },
	emits: ["presets-changed"],
	setup(__props, { emit: __emit }) {
		const emit = __emit;
		const { t } = useI18n();
		const keybindingStore = useKeybindingStore();
		const presetService = useKeybindingPresetService();
		const selectedPreset = ref(keybindingStore.currentPresetName);
		const displayLabel = computed(() => {
			const name = selectedPreset.value === "default" ? t("g.keybindingPresets.default") : selectedPreset.value;
			return keybindingStore.isCurrentPresetModified ? `${name} *` : name;
		});
		watch(selectedPreset, async (newValue) => {
			if (newValue !== keybindingStore.currentPresetName) {
				await presetService.switchPreset(newValue);
				selectedPreset.value = keybindingStore.currentPresetName;
				emit("presets-changed");
			}
		});
		watch(() => keybindingStore.currentPresetName, (name) => {
			selectedPreset.value = name;
		});
		const showSaveButton = computed(() => keybindingStore.currentPresetName !== "default" && keybindingStore.isCurrentPresetModified);
		async function handleSavePreset() {
			await presetService.savePreset(keybindingStore.currentPresetName);
		}
		async function handleImportFromDropdown() {
			await presetService.importPreset();
			emit("presets-changed");
		}
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", _hoisted_1$1, [showSaveButton.value ? (openBlock(), createBlock(Button_default, {
				key: 0,
				size: "lg",
				onClick: handleSavePreset
			}, {
				default: withCtx(() => [createTextVNode(toDisplayString(_ctx.$t("g.keybindingPresets.saveChanges")), 1)]),
				_: 1
			})) : createCommentVNode("", true), createVNode(Select_default, {
				modelValue: selectedPreset.value,
				"onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => selectedPreset.value = $event)
			}, {
				default: withCtx(() => [createVNode(SelectTrigger_default, { class: "w-64" }, {
					default: withCtx(() => [createVNode(SelectValue_default, { placeholder: _ctx.$t("g.keybindingPresets.default") }, {
						default: withCtx(() => [createTextVNode(toDisplayString(displayLabel.value), 1)]),
						_: 1
					}, 8, ["placeholder"])]),
					_: 1
				}), createVNode(SelectContent_default, { class: "max-w-64 min-w-0" }, {
					default: withCtx(() => [createBaseVNode("div", _hoisted_2$1, [
						createVNode(SelectItem_default, {
							value: "default",
							class: "max-w-60 p-2 data-[state=checked]:bg-transparent"
						}, {
							default: withCtx(() => [createTextVNode(toDisplayString(_ctx.$t("g.keybindingPresets.default")), 1)]),
							_: 1
						}),
						(openBlock(true), createElementBlock(Fragment, null, renderList(__props.presetNames, (name) => {
							return openBlock(), createBlock(SelectItem_default, {
								key: name,
								value: name,
								class: "max-w-60 p-2 data-[state=checked]:bg-transparent"
							}, {
								default: withCtx(() => [createTextVNode(toDisplayString(name), 1)]),
								_: 2
							}, 1032, ["value"]);
						}), 128)),
						_cache[2] || (_cache[2] = createBaseVNode("hr", { class: "h-px max-w-60 border border-border-default" }, null, -1)),
						createBaseVNode("button", {
							class: "relative flex w-full max-w-60 cursor-pointer items-center justify-between gap-3 rounded-sm border-none bg-transparent p-2 text-sm outline-none select-none hover:bg-secondary-background-hover focus:bg-secondary-background-hover",
							onClick: withModifiers(handleImportFromDropdown, ["stop"])
						}, [createBaseVNode("span", _hoisted_3$1, toDisplayString(_ctx.$t("g.keybindingPresets.importKeybindingPreset")), 1), _cache[1] || (_cache[1] = createBaseVNode("i", {
							class: "icon-[lucide--file-input] shrink-0 text-base-foreground",
							"aria-hidden": "true"
						}, null, -1))])
					])]),
					_: 1
				})]),
				_: 1
			}, 8, ["modelValue"])]);
		};
	}
});
//#endregion
//#region src/components/dialog/content/setting/KeybindingPanel.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1 = { class: "keybinding-panel flex min-w-0 flex-col gap-2 overflow-x-hidden" };
var _hoisted_2 = { class: "flex items-center gap-2" };
var _hoisted_3 = { class: "sr-only" };
//#endregion
//#region src/components/dialog/content/setting/KeybindingPanel.vue
var KeybindingPanel_default = /* @__PURE__ */ defineComponent({
	__name: "KeybindingPanel",
	setup(__props) {
		const searchQuery = ref("");
		const keybindingStore = useKeybindingStore();
		const keybindingService = useKeybindingService();
		const presetService = useKeybindingPresetService();
		const settingStore = useSettingStore();
		const commandStore = useCommandStore();
		const dialogStore = useDialogStore();
		const { t } = useI18n();
		const toastStore = useToastStore();
		const presetNames = ref([]);
		async function refreshPresetList() {
			presetNames.value = await presetService.listPresets() ?? [];
		}
		async function initPresets() {
			await refreshPresetList();
			const currentName = settingStore.get("Comfy.Keybinding.CurrentPreset");
			if (currentName !== "default") {
				const preset = await presetService.loadPreset(currentName);
				if (preset) {
					keybindingStore.savedPresetData = preset;
					keybindingStore.currentPresetName = currentName;
				} else await presetService.switchToDefaultPreset();
			}
		}
		onMounted(() => initPresets());
		async function saveAsNewPreset() {
			await presetService.promptAndSaveNewPreset();
			refreshPresetList();
		}
		async function handleDeletePreset() {
			await presetService.deletePreset(keybindingStore.currentPresetName);
			refreshPresetList();
		}
		async function handleImportPreset() {
			await presetService.importPreset();
			refreshPresetList();
		}
		const showSaveAsNew = computed(() => keybindingStore.currentPresetName !== "default" || keybindingStore.isCurrentPresetModified);
		const menuEntries = computed(() => [
			...showSaveAsNew.value ? [{
				label: t("g.keybindingPresets.saveAsNewPreset"),
				icon: "icon-[lucide--save]",
				command: saveAsNewPreset
			}] : [],
			{
				label: t("g.keybindingPresets.resetToDefault"),
				icon: "icon-[lucide--rotate-cw]",
				command: () => presetService.switchPreset("default").then(() => refreshPresetList())
			},
			{
				label: t("g.keybindingPresets.deletePreset"),
				icon: "icon-[lucide--trash-2]",
				disabled: keybindingStore.currentPresetName === "default",
				command: handleDeletePreset
			},
			{
				label: t("g.keybindingPresets.importPreset"),
				icon: "icon-[lucide--file-input]",
				command: handleImportPreset
			},
			{
				label: t("g.keybindingPresets.exportPreset"),
				icon: "icon-[lucide--file-output]",
				command: () => presetService.exportPreset()
			}
		]);
		const commandsData = computed(() => {
			return Object.values(commandStore.commands).map((command) => {
				const keybindings = keybindingStore.getKeybindingsByCommandId(command.id);
				return {
					expandable: keybindings.length >= 2,
					id: command.id,
					isModified: keybindingStore.isCommandKeybindingModified(command.id),
					keybindings,
					label: t(`commands.${normalizeI18nKey(command.id)}.label`, command.label ?? command.id),
					rowId: `keybinding-row-${command.id}`,
					source: command.source
				};
			});
		});
		const commandSortDirection = ref(null);
		const currentPage = ref(1);
		const commandsPerPage = ref(50);
		const commandsPerPageOptions = [
			25,
			50,
			100
		];
		const filteredCommands = computed(() => {
			const filtered = filterByQuery(commandsData.value, searchQuery.value, (command) => [command.id, command.label]);
			return sortByText(filtered, commandSortDirection.value, (command) => command.label);
		});
		const visibleCommands = computed(() => {
			const start = (currentPage.value - 1) * commandsPerPage.value;
			return filteredCommands.value.slice(start, start + commandsPerPage.value);
		});
		watch(commandSortDirection, () => {
			currentPage.value = 1;
		});
		const focusedRowTabStopId = ref(null);
		const currentRowTabStopId = computed({
			get: () => {
				const rowIds = visibleCommands.value.map((command) => command.rowId);
				const focused = focusedRowTabStopId.value;
				return focused && rowIds.includes(focused) ? focused : rowIds[0] ?? null;
			},
			set: (rowId) => {
				focusedRowTabStopId.value = rowId;
			}
		});
		const expandedCommandIds = ref(/* @__PURE__ */ new Set());
		function toggleExpanded(commandId) {
			if (expandedCommandIds.value.has(commandId)) expandedCommandIds.value.delete(commandId);
			else expandedCommandIds.value.add(commandId);
		}
		watch(searchQuery, () => {
			currentPage.value = 1;
			expandedCommandIds.value.clear();
		});
		const selectedCommandId = ref(null);
		const editKeybindingDialog = useEditKeybindingDialog();
		const rowMenu = useTemplateRef("rowMenu");
		const contextMenuTarget = ref(null);
		let rowMenuOrigin = null;
		const rowMenuItems = computed(() => {
			const target = contextMenuTarget.value;
			if (!target) return [];
			const hasBindings = target.keybindings.length > 0;
			return [
				{
					label: t("g.changeKeybinding"),
					icon: "icon-[lucide--pencil]",
					disabled: !hasBindings,
					command: () => changeKeybinding(target)
				},
				{
					label: t("g.addNewKeybinding"),
					icon: "icon-[lucide--plus]",
					command: () => addKeybinding(target)
				},
				{ separator: true },
				{
					label: t("g.resetToDefault"),
					icon: "icon-[lucide--rotate-ccw]",
					disabled: !target.isModified,
					command: () => resetKeybinding(target)
				},
				{
					label: t("g.removeKeybinding"),
					icon: "icon-[lucide--trash-2]",
					disabled: !hasBindings,
					command: () => handleRemoveKeybindingFromMenu(target)
				}
			];
		});
		function editKeybinding(command, binding) {
			editKeybindingDialog.show({
				commandId: command.id,
				commandLabel: command.label,
				currentCombo: binding.combo,
				mode: "edit",
				existingBinding: binding
			});
		}
		function addKeybinding(command) {
			editKeybindingDialog.show({
				commandId: command.id,
				commandLabel: command.label,
				currentCombo: null,
				mode: "add"
			});
		}
		function activateRow(command) {
			selectedCommandId.value = command.id;
			if (command.expandable || expandedCommandIds.value.has(command.id)) toggleExpanded(command.id);
		}
		function handleRowDblClick(command) {
			if (command.keybindings.length === 0) addKeybinding(command);
			else if (command.keybindings.length === 1) editKeybinding(command, command.keybindings[0]);
		}
		function handleRowContextMenu(event, command) {
			selectedCommandId.value = command.id;
			contextMenuTarget.value = command;
			rowMenuOrigin = event.currentTarget instanceof HTMLElement ? event.currentTarget : null;
			rowMenu.value?.show(event);
		}
		function restoreRowFocus() {
			const focused = document.activeElement;
			if (focused === document.body || focused?.closest("[role=\"menu\"]")) rowMenuOrigin?.focus();
			rowMenuOrigin = null;
		}
		async function removeSingleKeybinding(command, index) {
			const binding = command.keybindings[index];
			if (binding) {
				keybindingStore.unsetKeybinding(binding);
				if (command.keybindings.length <= 2) expandedCommandIds.value.delete(command.id);
				await keybindingService.persistUserKeybindings();
			}
		}
		function handleRemoveAllKeybindings(command) {
			const dialog = showConfirmDialog({
				headerProps: { title: t("g.removeAllKeybindingsTitle") },
				props: { promptText: t("g.removeAllKeybindingsMessage") },
				footerProps: {
					confirmText: t("g.removeAll"),
					confirmVariant: "destructive",
					onCancel: () => dialogStore.closeDialog(dialog),
					onConfirm: async () => {
						keybindingStore.removeAllKeybindingsForCommand(command.id);
						await keybindingService.persistUserKeybindings();
						dialogStore.closeDialog(dialog);
					}
				}
			});
		}
		function handleRemoveKeybindingFromMenu(command) {
			if (command.expandable) handleRemoveAllKeybindings(command);
			else removeSingleKeybinding(command, 0);
		}
		function changeKeybinding(command) {
			if (command.keybindings.length === 1) editKeybinding(command, command.keybindings[0]);
			else expandedCommandIds.value.add(command.id);
		}
		async function resetKeybinding(command) {
			if (keybindingStore.resetKeybindingForCommand(command.id)) {
				expandedCommandIds.value.delete(command.id);
				await keybindingService.persistUserKeybindings();
			} else console.warn(`No changes made when resetting keybinding for command: ${command.id}`);
		}
		function resetAllKeybindings() {
			const dialog = showConfirmDialog({
				headerProps: { title: t("g.resetAllKeybindingsTitle") },
				props: { promptText: t("g.resetAllKeybindingsMessage") },
				footerProps: {
					confirmText: t("g.resetAll"),
					confirmVariant: "destructive",
					onCancel: () => {
						dialogStore.closeDialog(dialog);
					},
					onConfirm: async () => {
						keybindingStore.resetAllKeybindings();
						await keybindingService.persistUserKeybindings();
						dialogStore.closeDialog(dialog);
						toastStore.add({
							severity: "info",
							summary: t("g.info"),
							detail: t("g.allKeybindingsReset"),
							life: 3e3
						});
					}
				}
			});
		}
		return (_ctx, _cache) => {
			const _directive_tooltip = resolveDirective("tooltip");
			return openBlock(), createElementBlock("div", _hoisted_1, [
				(openBlock(), createBlock(Teleport, {
					defer: "",
					to: "#keybinding-panel-header"
				}, [createVNode(SearchInput_default, {
					modelValue: searchQuery.value,
					"onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => searchQuery.value = $event),
					class: "max-w-96",
					size: "lg",
					autofocus: "",
					placeholder: _ctx.$t("g.searchPlaceholder", { subject: _ctx.$t("g.keybindings") })
				}, null, 8, ["modelValue", "placeholder"])])),
				(openBlock(), createBlock(Teleport, {
					defer: "",
					to: "#keybinding-panel-actions"
				}, [createBaseVNode("div", _hoisted_2, [createVNode(KeybindingPresetToolbar_default, {
					"preset-names": presetNames.value,
					onPresetsChanged: refreshPresetList
				}, null, 8, ["preset-names"]), createVNode(Menu_default, {
					items: menuEntries.value,
					to: "#keybinding-panel-actions",
					align: "end"
				}, {
					trigger: withCtx(() => [createVNode(Button_default, {
						size: "icon-lg",
						"data-testid": "keybinding-preset-menu",
						icon: "icon-[lucide--ellipsis]",
						"aria-label": _ctx.$t("g.more")
					}, null, 8, ["aria-label"])]),
					_: 1
				}, 8, ["items"])])])),
				createVNode(Table_default, { "data-testid": "keybinding-table-container" }, {
					default: withCtx(() => [createVNode(TableHeader_default, null, {
						default: withCtx(() => [createVNode(TableRow_default, null, {
							default: withCtx(() => [
								createVNode(TableSortHead_default, {
									direction: commandSortDirection.value,
									"onUpdate:direction": _cache[1] || (_cache[1] = ($event) => commandSortDirection.value = $event)
								}, {
									default: withCtx(() => [createTextVNode(toDisplayString(_ctx.$t("g.command")), 1)]),
									_: 1
								}, 8, ["direction"]),
								createVNode(TableHead_default, { class: "w-3/10" }, {
									default: withCtx(() => [createTextVNode(toDisplayString(_ctx.$t("g.keybinding")), 1)]),
									_: 1
								}),
								createVNode(TableHead_default, { class: "w-4/25" }, {
									default: withCtx(() => [createTextVNode(toDisplayString(_ctx.$t("g.source")), 1)]),
									_: 1
								}),
								createVNode(TableHead_default, { class: "w-36" }, {
									default: withCtx(() => [createBaseVNode("span", _hoisted_3, toDisplayString(_ctx.$t("g.actions")), 1)]),
									_: 1
								})
							]),
							_: 1
						})]),
						_: 1
					}), createVNode(unref(RovingFocusGroup_default), {
						"current-tab-stop-id": currentRowTabStopId.value,
						"onUpdate:currentTabStopId": _cache[2] || (_cache[2] = ($event) => currentRowTabStopId.value = $event),
						"as-child": "",
						orientation: "vertical"
					}, {
						default: withCtx(() => [createVNode(TableBody_default, null, {
							default: withCtx(() => [(openBlock(true), createElementBlock(Fragment, null, renderList(visibleCommands.value, (command) => {
								return openBlock(), createBlock(KeybindingCommandRows_default, {
									key: command.id,
									command,
									expanded: expandedCommandIds.value.has(command.id),
									selected: selectedCommandId.value === command.id,
									onActivate: ($event) => activateRow(command),
									onRowDblclick: ($event) => handleRowDblClick(command),
									onRowContextmenu: ($event) => handleRowContextMenu($event, command),
									onEdit: ($event) => editKeybinding(command, $event),
									onAdd: ($event) => addKeybinding(command),
									onReset: ($event) => resetKeybinding(command),
									onRemove: ($event) => handleRemoveKeybindingFromMenu(command),
									onRemoveSingle: ($event) => removeSingleKeybinding(command, $event)
								}, null, 8, [
									"command",
									"expanded",
									"selected",
									"onActivate",
									"onRowDblclick",
									"onRowContextmenu",
									"onEdit",
									"onAdd",
									"onReset",
									"onRemove",
									"onRemoveSingle"
								]);
							}), 128))]),
							_: 1
						})]),
						_: 1
					}, 8, ["current-tab-stop-id"])]),
					_: 1
				}),
				filteredCommands.value.length > commandsPerPageOptions[0] ? (openBlock(), createBlock(Pagination_default, {
					key: 0,
					page: currentPage.value,
					"onUpdate:page": _cache[3] || (_cache[3] = ($event) => currentPage.value = $event),
					"items-per-page": commandsPerPage.value,
					"onUpdate:itemsPerPage": _cache[4] || (_cache[4] = ($event) => commandsPerPage.value = $event),
					total: filteredCommands.value.length,
					"items-per-page-options": commandsPerPageOptions
				}, null, 8, [
					"page",
					"items-per-page",
					"total"
				])) : createCommentVNode("", true),
				createVNode(ContextMenu_default, {
					ref_key: "rowMenu",
					ref: rowMenu,
					model: rowMenuItems.value,
					onHide: restoreRowFocus
				}, null, 8, ["model"]),
				withDirectives((openBlock(), createBlock(Button_default, {
					class: "mt-4 w-full",
					variant: "destructive-textonly",
					onClick: resetAllKeybindings
				}, {
					default: withCtx(() => [_cache[5] || (_cache[5] = createBaseVNode("i", { class: "icon-[lucide--rotate-ccw]" }, null, -1)), createTextVNode(" " + toDisplayString(_ctx.$t("g.resetAll")), 1)]),
					_: 1
				})), [[_directive_tooltip, _ctx.$t("g.resetAllKeybindingsTooltip")]])
			]);
		};
	}
});
//#endregion
export { KeybindingPanel_default as default };
