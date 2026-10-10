import "./rolldown-runtime-xtsTai4I.js";
import { E as withModifiers, Et as withCtx, F as createBaseVNode, G as defineComponent, H as createTextVNode, I as createBlock, Kt as unref, L as createCommentVNode, Lt as ref, O as Fragment, P as computed, R as createElementBlock, U as createVNode, Zt as toDisplayString, dt as renderList, lt as openBlock, ot as onMounted } from "./vendor-vue-core-C1utdb0s.js";
import { Ni as Menu_default, Zi as SearchInput_default, i as useSettingStore } from "./layoutStore-CZsuzg91.js";
import { r as useI18n } from "./vendor-i18n-BZvE7WBQ.js";
import { t as Button_default } from "./Button-j0oCzR82.js";
import { n as useExtensionStore } from "./systemStatsStore-3gc4cifl.js";
import { t as Switch_default } from "./Switch-BAw3-YcG.js";
import { t as Message_default } from "./Message-NRJmn_pf.js";
import { t as Badge_default } from "./Badge-DXbmxSwq.js";
import { a as TableBody_default, i as TableCell_default, n as TableHeader_default, o as Table_default, r as TableHead_default, t as TableRow_default } from "./TableRow-DTbUSGOo.js";
import { n as sortByText, r as TableSortHead_default, t as filterByQuery } from "./tableUtils-CkWMmXgy.js";
import { n as ToggleGroup_default, t as ToggleGroupItem_default } from "./ToggleGroupItem-Da4A26JJ.js";
import "./toggle-group-B0brfUuj.js";
import { t as Checkbox_default } from "./Checkbox-CimVrKfM.js";
//#region src/platform/settings/components/ExtensionPanel.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1 = { class: "extension-panel flex flex-col gap-2" };
var _hoisted_2 = { class: "flex justify-end" };
var _hoisted_3 = { class: "mb-3 flex gap-2" };
//#endregion
//#region src/platform/settings/components/ExtensionPanel.vue
var ExtensionPanel_default = /* @__PURE__ */ defineComponent({
	__name: "ExtensionPanel",
	setup(__props) {
		const { t } = useI18n();
		const filterTypeKeys = [
			"all",
			"core",
			"custom"
		];
		const filterTypes = computed(() => filterTypeKeys.map((key) => ({
			label: t(`g.${key}`),
			value: key
		})));
		const filterType = ref("all");
		const selectedExtensionNames = ref(/* @__PURE__ */ new Set());
		const searchQuery = ref("");
		const nameSortDirection = ref(null);
		const extensionStore = useExtensionStore();
		const settingStore = useSettingStore();
		const editingEnabledExtensions = ref({});
		const filteredExtensions = computed(() => {
			const extensions = extensionStore.extensions;
			switch (filterType.value) {
				case "core": return extensions.filter((ext) => extensionStore.isCoreExtension(ext.name));
				case "custom": return extensions.filter((ext) => !extensionStore.isCoreExtension(ext.name));
				default: return extensions;
			}
		});
		const visibleExtensions = computed(() => {
			const filtered = filterByQuery(filteredExtensions.value, searchQuery.value, (extension) => [extension.name]);
			return sortByText(filtered, nameSortDirection.value, (extension) => extension.name);
		});
		const selectAllState = computed(() => {
			const selectedCount = visibleExtensions.value.filter((extension) => selectedExtensionNames.value.has(extension.name)).length;
			if (selectedCount === 0) return false;
			return selectedCount === visibleExtensions.value.length ? true : "indeterminate";
		});
		function setExtensionSelected(name, selected) {
			const names = new Set(selectedExtensionNames.value);
			if (selected === true) names.add(name);
			else names.delete(name);
			selectedExtensionNames.value = names;
		}
		function toggleAllVisible(selected) {
			selectedExtensionNames.value = new Set(selected === true ? visibleExtensions.value.map((extension) => extension.name) : []);
		}
		onMounted(() => {
			extensionStore.extensions.forEach((ext) => {
				editingEnabledExtensions.value[ext.name] = extensionStore.isExtensionEnabled(ext.name);
			});
		});
		const changedExtensions = computed(() => {
			return extensionStore.extensions.filter((ext) => editingEnabledExtensions.value[ext.name] !== extensionStore.isExtensionEnabled(ext.name));
		});
		const hasChanges = computed(() => {
			return changedExtensions.value.length > 0;
		});
		const updateExtensionStatus = async () => {
			const editingDisabledExtensionNames = Object.entries(editingEnabledExtensions.value).filter(([_, enabled]) => !enabled).map(([name]) => name);
			await settingStore.set("Comfy.Extension.Disabled", [...extensionStore.inactiveDisabledExtensionNames, ...editingDisabledExtensionNames]);
		};
		async function setExtensionEnabled(name, enabled) {
			editingEnabledExtensions.value[name] = enabled;
			await updateExtensionStatus();
		}
		const enableAllExtensions = async () => {
			extensionStore.extensions.forEach((ext) => {
				if (extensionStore.isExtensionReadOnly(ext.name)) return;
				editingEnabledExtensions.value[ext.name] = true;
			});
			await updateExtensionStatus();
		};
		const disableAllExtensions = async () => {
			extensionStore.extensions.forEach((ext) => {
				if (extensionStore.isExtensionReadOnly(ext.name)) return;
				editingEnabledExtensions.value[ext.name] = false;
			});
			await updateExtensionStatus();
		};
		const disableThirdPartyExtensions = async () => {
			extensionStore.extensions.forEach((ext) => {
				if (extensionStore.isCoreExtension(ext.name)) return;
				editingEnabledExtensions.value[ext.name] = false;
			});
			await updateExtensionStatus();
		};
		const applyChanges = () => {
			window.location.reload();
		};
		const extensionActions = computed(() => [
			{
				label: t("g.enableSelected"),
				icon: "pi pi-check",
				command: async () => {
					selectedExtensionNames.value.forEach((name) => {
						if (!extensionStore.isExtensionReadOnly(name)) editingEnabledExtensions.value[name] = true;
					});
					await updateExtensionStatus();
				}
			},
			{
				label: t("g.disableSelected"),
				icon: "pi pi-times",
				command: async () => {
					selectedExtensionNames.value.forEach((name) => {
						if (!extensionStore.isExtensionReadOnly(name)) editingEnabledExtensions.value[name] = false;
					});
					await updateExtensionStatus();
				}
			},
			{ separator: true },
			{
				label: t("g.enableAll"),
				icon: "pi pi-check",
				command: enableAllExtensions
			},
			{
				label: t("g.disableAll"),
				icon: "pi pi-times",
				command: disableAllExtensions
			},
			{
				label: t("g.disableThirdParty"),
				icon: "pi pi-times",
				command: disableThirdPartyExtensions,
				disabled: !extensionStore.hasThirdPartyExtensions
			}
		]);
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", _hoisted_1, [
				createVNode(SearchInput_default, {
					modelValue: searchQuery.value,
					"onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => searchQuery.value = $event),
					placeholder: _ctx.$t("g.searchPlaceholder", { subject: _ctx.$t("g.extensions") })
				}, null, 8, ["modelValue", "placeholder"]),
				hasChanges.value ? (openBlock(), createBlock(Message_default, {
					key: 0,
					severity: "info",
					class: "max-h-96 overflow-y-auto"
				}, {
					default: withCtx(() => [createBaseVNode("ul", null, [(openBlock(true), createElementBlock(Fragment, null, renderList(changedExtensions.value, (ext) => {
						return openBlock(), createElementBlock("li", { key: ext.name }, [createBaseVNode("span", null, toDisplayString(unref(extensionStore).isExtensionEnabled(ext.name) ? "[-]" : "[+]"), 1), createTextVNode(" " + toDisplayString(ext.name), 1)]);
					}), 128))]), createBaseVNode("div", _hoisted_2, [createVNode(Button_default, {
						variant: "destructive",
						onClick: applyChanges
					}, {
						default: withCtx(() => [createTextVNode(toDisplayString(_ctx.$t("g.reloadToApplyChanges")), 1)]),
						_: 1
					})])]),
					_: 1
				})) : createCommentVNode("", true),
				createBaseVNode("div", _hoisted_3, [createVNode(unref(ToggleGroup_default), {
					modelValue: filterType.value,
					"onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => filterType.value = $event),
					type: "single",
					"allow-empty": false
				}, {
					default: withCtx(() => [(openBlock(true), createElementBlock(Fragment, null, renderList(filterTypes.value, (option) => {
						return openBlock(), createBlock(unref(ToggleGroupItem_default), {
							key: option.value,
							value: option.value
						}, {
							default: withCtx(() => [createTextVNode(toDisplayString(option.label), 1)]),
							_: 2
						}, 1032, ["value"]);
					}), 128))]),
					_: 1
				}, 8, ["modelValue"])]),
				createVNode(Table_default, null, {
					default: withCtx(() => [createVNode(TableHeader_default, null, {
						default: withCtx(() => [createVNode(TableRow_default, null, {
							default: withCtx(() => [
								createVNode(TableHead_default, { class: "w-12" }, {
									default: withCtx(() => [createVNode(Checkbox_default, {
										"model-value": selectAllState.value,
										"aria-label": _ctx.$t("g.selectAll"),
										"onUpdate:modelValue": toggleAllVisible
									}, null, 8, ["model-value", "aria-label"])]),
									_: 1
								}),
								createVNode(TableSortHead_default, {
									direction: nameSortDirection.value,
									"onUpdate:direction": _cache[2] || (_cache[2] = ($event) => nameSortDirection.value = $event)
								}, {
									default: withCtx(() => [createTextVNode(toDisplayString(_ctx.$t("g.extensionName")), 1)]),
									_: 1
								}, 8, ["direction"]),
								createVNode(TableHead_default, { class: "w-20 text-right" }, {
									default: withCtx(() => [createVNode(Menu_default, {
										items: extensionActions.value,
										align: "end"
									}, {
										trigger: withCtx(() => [createVNode(Button_default, {
											size: "icon",
											variant: "muted-textonly",
											"aria-label": _ctx.$t("g.moreOptions")
										}, {
											default: withCtx(() => [..._cache[5] || (_cache[5] = [createBaseVNode("i", { class: "icon-[lucide--ellipsis]" }, null, -1)])]),
											_: 1
										}, 8, ["aria-label"])]),
										_: 1
									}, 8, ["items"])]),
									_: 1
								})
							]),
							_: 1
						})]),
						_: 1
					}), createVNode(TableBody_default, null, {
						default: withCtx(() => [(openBlock(true), createElementBlock(Fragment, null, renderList(visibleExtensions.value, (extension) => {
							return openBlock(), createBlock(TableRow_default, {
								key: extension.name,
								class: "cursor-pointer",
								"data-state": selectedExtensionNames.value.has(extension.name) ? "selected" : void 0,
								onClick: ($event) => setExtensionSelected(extension.name, !selectedExtensionNames.value.has(extension.name))
							}, {
								default: withCtx(() => [
									createVNode(TableCell_default, null, {
										default: withCtx(() => [createVNode(Checkbox_default, {
											"model-value": selectedExtensionNames.value.has(extension.name),
											"aria-label": _ctx.$t("g.selectItem", { name: extension.name }),
											onClick: _cache[3] || (_cache[3] = withModifiers(() => {}, ["stop"])),
											"onUpdate:modelValue": (selected) => setExtensionSelected(extension.name, selected)
										}, null, 8, [
											"model-value",
											"aria-label",
											"onUpdate:modelValue"
										])]),
										_: 2
									}, 1024),
									createVNode(TableCell_default, null, {
										default: withCtx(() => [createTextVNode(toDisplayString(extension.name) + " ", 1), unref(extensionStore).isCoreExtension(extension.name) ? (openBlock(), createBlock(Badge_default, { key: 0 }, {
											default: withCtx(() => [createTextVNode(toDisplayString(_ctx.$t("g.core")), 1)]),
											_: 1
										})) : (openBlock(), createBlock(Badge_default, {
											key: 1,
											severity: "info"
										}, {
											default: withCtx(() => [createTextVNode(toDisplayString(_ctx.$t("g.custom")), 1)]),
											_: 1
										}))]),
										_: 2
									}, 1024),
									createVNode(TableCell_default, { class: "text-right" }, {
										default: withCtx(() => [createVNode(Switch_default, {
											"model-value": editingEnabledExtensions.value[extension.name],
											disabled: unref(extensionStore).isExtensionReadOnly(extension.name),
											"aria-label": extension.name,
											onClick: _cache[4] || (_cache[4] = withModifiers(() => {}, ["stop"])),
											"onUpdate:modelValue": (enabled) => setExtensionEnabled(extension.name, enabled)
										}, null, 8, [
											"model-value",
											"disabled",
											"aria-label",
											"onUpdate:modelValue"
										])]),
										_: 2
									}, 1024)
								]),
								_: 2
							}, 1032, ["data-state", "onClick"]);
						}), 128))]),
						_: 1
					})]),
					_: 1
				})
			]);
		};
	}
});
//#endregion
export { ExtensionPanel_default as default };
