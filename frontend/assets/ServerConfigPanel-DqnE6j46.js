import "./rolldown-runtime-xtsTai4I.js";
import { Et as withCtx, F as createBaseVNode, G as defineComponent, H as createTextVNode, I as createBlock, Kt as unref, L as createCommentVNode, O as Fragment, R as createElementBlock, St as watch, U as createVNode, Zt as toDisplayString, dt as renderList, lt as openBlock, p as storeToRefs, rt as onBeforeUnmount } from "./vendor-vue-core-C1utdb0s.js";
import { i as useSettingStore } from "./layoutStore-CZsuzg91.js";
import { t as useToastStore } from "./toastStore-CTfykAzG.js";
import { r as useI18n } from "./vendor-i18n-BZvE7WBQ.js";
import { t as Button_default } from "./Button-j0oCzR82.js";
import { r as useCopyToClipboard } from "./systemStatsStore-3gc4cifl.js";
import { t as electronAPI } from "./envUtil-2Z8ainL3.js";
import { t as Message_default } from "./Message-NRJmn_pf.js";
import { n as FormItem_default, t as useServerConfigStore } from "./serverConfigStore-C46jKwFb.js";
//#region src/platform/settings/components/ServerConfigPanel.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1 = { class: "server-config-panel flex flex-col gap-2" };
var _hoisted_2 = { class: "flex justify-end gap-2" };
var _hoisted_3 = { class: "flex items-center justify-between" };
var _hoisted_4 = {
	key: 0,
	class: "my-4 border-t border-interface-stroke"
};
//#endregion
//#region src/platform/settings/components/ServerConfigPanel.vue
var ServerConfigPanel_default = /* @__PURE__ */ defineComponent({
	__name: "ServerConfigPanel",
	setup(__props) {
		const settingStore = useSettingStore();
		const serverConfigStore = useServerConfigStore();
		const toastStore = useToastStore();
		const { serverConfigsByCategory, serverConfigValues, launchArgs, commandLineArgs, modifiedConfigs } = storeToRefs(serverConfigStore);
		let restartTriggered = false;
		const revertChanges = () => {
			serverConfigStore.revertChanges();
		};
		const restartApp = async () => {
			restartTriggered = true;
			await electronAPI().restartApp();
		};
		watch(launchArgs, async (newVal) => {
			await settingStore.set("Comfy.Server.LaunchArgs", newVal);
		});
		watch(serverConfigValues, async (newVal) => {
			await settingStore.set("Comfy.Server.ServerConfigValues", newVal);
		});
		const { copyToClipboard } = useCopyToClipboard();
		const copyCommandLineArgs = async () => {
			await copyToClipboard(commandLineArgs.value);
		};
		const { t } = useI18n();
		onBeforeUnmount(() => {
			if (restartTriggered) return;
			if (modifiedConfigs.value.length === 0) return;
			toastStore.add({
				severity: "warn",
				summary: t("serverConfig.restartRequiredToastSummary"),
				detail: t("serverConfig.restartRequiredToastDetail"),
				life: 1e4
			});
		});
		const translateItem = (item) => {
			return {
				...item,
				name: t(`serverConfigItems.${item.id}.name`, item.name),
				tooltip: item.tooltip ? t(`serverConfigItems.${item.id}.tooltip`, item.tooltip) : void 0
			};
		};
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", _hoisted_1, [
				unref(modifiedConfigs).length > 0 ? (openBlock(), createBlock(Message_default, {
					key: 0,
					severity: "info"
				}, {
					default: withCtx(() => [
						createBaseVNode("p", null, toDisplayString(_ctx.$t("serverConfig.modifiedConfigs")), 1),
						createBaseVNode("ul", null, [(openBlock(true), createElementBlock(Fragment, null, renderList(unref(modifiedConfigs), (config) => {
							return openBlock(), createElementBlock("li", { key: config.id }, toDisplayString(config.name) + ": " + toDisplayString(config.initialValue) + " → " + toDisplayString(config.value), 1);
						}), 128))]),
						createBaseVNode("div", _hoisted_2, [createVNode(Button_default, {
							variant: "secondary",
							onClick: revertChanges
						}, {
							default: withCtx(() => [createTextVNode(toDisplayString(_ctx.$t("serverConfig.revertChanges")), 1)]),
							_: 1
						}), createVNode(Button_default, {
							variant: "destructive",
							onClick: restartApp
						}, {
							default: withCtx(() => [createTextVNode(toDisplayString(_ctx.$t("serverConfig.restart")), 1)]),
							_: 1
						})])
					]),
					_: 1
				})) : createCommentVNode("", true),
				unref(commandLineArgs) ? (openBlock(), createBlock(Message_default, {
					key: 1,
					severity: "secondary"
				}, {
					icon: withCtx(() => [..._cache[0] || (_cache[0] = [createBaseVNode("i", { class: "icon-[lucide--terminal] text-xl font-bold" }, null, -1)])]),
					default: withCtx(() => [createBaseVNode("div", _hoisted_3, [createBaseVNode("p", null, toDisplayString(unref(commandLineArgs)), 1), createVNode(Button_default, {
						size: "icon",
						variant: "muted-textonly",
						"aria-label": _ctx.$t("g.copyToClipboard"),
						onClick: copyCommandLineArgs
					}, {
						default: withCtx(() => [..._cache[1] || (_cache[1] = [createBaseVNode("i", { class: "pi pi-clipboard" }, null, -1)])]),
						_: 1
					}, 8, ["aria-label"])])]),
					_: 1
				})) : createCommentVNode("", true),
				(openBlock(true), createElementBlock(Fragment, null, renderList(Object.entries(unref(serverConfigsByCategory)), ([label, items], i) => {
					return openBlock(), createElementBlock("div", { key: label }, [
						i > 0 ? (openBlock(), createElementBlock("div", _hoisted_4)) : createCommentVNode("", true),
						createBaseVNode("h3", null, toDisplayString(_ctx.$t(`serverConfigCategories.${label}`, label)), 1),
						(openBlock(true), createElementBlock(Fragment, null, renderList(items, (item) => {
							return openBlock(), createElementBlock("div", {
								key: item.name,
								class: "mb-4"
							}, [createVNode(FormItem_default, {
								id: item.id,
								"form-value": item.value,
								"onUpdate:formValue": ($event) => item.value = $event,
								item: translateItem(item),
								"label-class": { "text-highlight": item.initialValue !== item.value }
							}, null, 8, [
								"id",
								"form-value",
								"onUpdate:formValue",
								"item",
								"label-class"
							])]);
						}), 128))
					]);
				}), 128))
			]);
		};
	}
});
//#endregion
export { ServerConfigPanel_default as default };
