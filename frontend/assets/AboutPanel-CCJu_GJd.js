import "./rolldown-runtime-xtsTai4I.js";
import { Et as withCtx, F as createBaseVNode, G as defineComponent, H as createTextVNode, I as createBlock, Jt as normalizeClass, Kt as unref, L as createCommentVNode, O as Fragment, P as computed, R as createElementBlock, U as createVNode, Wt as toValue, Zt as toDisplayString, d as defineStore, dt as renderList, lt as openBlock } from "./vendor-vue-core-C1utdb0s.js";
import { d as t } from "./i18n-C3J-ToPr.js";
import { a as formatCommitHash, l as formatSize } from "./formatUtil-DuxXRy1z.js";
import { t as cn } from "./src-DI1bBfrb.js";
import { t as Button_default } from "./Button-j0oCzR82.js";
import { n as useExtensionStore, r as useCopyToClipboard, t as useSystemStatsStore } from "./systemStatsStore-3gc4cifl.js";
import "./envUtil-2Z8ainL3.js";
import { t as useExternalLink } from "./useExternalLink-CXT6uu6Z.js";
import { i as Tabs_default, n as TabsList_default, r as TabsContent_default, t as TabsTrigger_default } from "./TabsTrigger-ZqeJfaak.js";
import { t as Badge_default } from "./Badge-DXbmxSwq.js";
//#region src/components/common/DeviceInfo.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1$2 = { class: "grid grid-cols-2 gap-2" };
var _hoisted_2$2 = { class: "font-medium" };
//#endregion
//#region src/components/common/DeviceInfo.vue
var DeviceInfo_default = /* @__PURE__ */ defineComponent({
	__name: "DeviceInfo",
	props: { device: {} },
	setup(__props) {
		const props = __props;
		const deviceColumns = [
			{
				field: "name",
				header: "Name"
			},
			{
				field: "type",
				header: "Type"
			},
			{
				field: "vram_total",
				header: "VRAM Total"
			},
			{
				field: "vram_free",
				header: "VRAM Free"
			},
			{
				field: "torch_vram_total",
				header: "Torch VRAM Total"
			},
			{
				field: "torch_vram_free",
				header: "Torch VRAM Free"
			}
		];
		const formatValue = (value, field) => {
			if ([
				"vram_total",
				"vram_free",
				"torch_vram_total",
				"torch_vram_free"
			].includes(field)) {
				const num = Number(value);
				if (Number.isFinite(num)) return formatSize(num);
				return value;
			}
			return value;
		};
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", _hoisted_1$2, [(openBlock(), createElementBlock(Fragment, null, renderList(deviceColumns, (col) => {
				return openBlock(), createElementBlock(Fragment, { key: col.field }, [createBaseVNode("div", _hoisted_2$2, toDisplayString(col.header), 1), createBaseVNode("div", null, toDisplayString(formatValue(props.device[col.field], col.field)), 1)], 64);
			}), 64))]);
		};
	}
});
var systemStatsColumns = [
	{
		field: "argv",
		headerKey: "g.systemStatsArguments"
	},
	{
		field: "embedded_python",
		headerKey: "g.systemStatsEmbeddedPython"
	},
	{
		field: "installed_templates_version",
		headerKey: "g.systemStatsTemplatesVersion"
	},
	{
		field: "os",
		headerKey: "g.systemStatsOS"
	},
	{
		field: "python_version",
		headerKey: "g.systemStatsPythonVersion"
	},
	{
		field: "pytorch_version",
		headerKey: "g.systemStatsPyTorchVersion"
	},
	{
		field: "ram_free",
		headerKey: "g.systemStatsRAMFree",
		formatNumber: formatSize
	},
	{
		field: "ram_total",
		headerKey: "g.systemStatsRAMTotal",
		formatNumber: formatSize
	}
];
function getColumnDisplayValue(stats, column) {
	const systemInfo = {
		...stats.system,
		argv: stats.system.argv.join(" ")
	};
	const value = column.getValue ? column.getValue() : systemInfo[column.field];
	if (column.formatNumber && typeof value === "number") return column.formatNumber(value);
	if (column.format && typeof value === "string") return column.format(value);
	if (Array.isArray(value)) return void 0;
	return value;
}
//#endregion
//#region src/composables/useCopySystemInfo.ts
function formatSystemInfoText(stats) {
	const lines = ["## System Info"];
	for (const col of systemStatsColumns) {
		const display = getColumnDisplayValue(stats, col);
		if (display !== void 0 && display !== "") lines.push(`${t(col.headerKey)}: ${display}`);
	}
	if (stats.devices.length > 0) {
		lines.push("");
		lines.push("## Devices");
		for (const device of stats.devices) {
			lines.push(`- ${device.name} (${device.type})`);
			lines.push(`  VRAM Total: ${formatSize(device.vram_total)}`);
			lines.push(`  VRAM Free: ${formatSize(device.vram_free)}`);
			lines.push(`  Torch VRAM Total: ${formatSize(device.torch_vram_total)}`);
			lines.push(`  Torch VRAM Free: ${formatSize(device.torch_vram_free)}`);
		}
	}
	return lines.join("\n");
}
function useCopySystemInfo(stats) {
	const { copyToClipboard } = useCopyToClipboard();
	function copySystemInfo() {
		return copyToClipboard(formatSystemInfoText(toValue(stats)));
	}
	return { copySystemInfo };
}
//#endregion
//#region src/components/common/SystemStatsPanel.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1$1 = { class: "system-stats" };
var _hoisted_2$1 = { class: "mb-6" };
var _hoisted_3$1 = { class: "mb-4 flex items-center gap-2" };
var _hoisted_4$1 = { class: "text-2xl font-semibold" };
var _hoisted_5 = { class: "grid grid-cols-2 gap-2" };
var _hoisted_6 = { class: "mb-4 text-2xl font-semibold" };
//#endregion
//#region src/components/common/SystemStatsPanel.vue
var SystemStatsPanel_default = /* @__PURE__ */ defineComponent({
	__name: "SystemStatsPanel",
	props: { stats: {} },
	setup(__props) {
		const hasDevices = computed(() => __props.stats.devices.length > 0);
		const { copySystemInfo } = useCopySystemInfo(() => __props.stats);
		function isOutdated(column) {
			if (column.field !== "installed_templates_version") return false;
			const installed = __props.stats.system.installed_templates_version;
			const required = __props.stats.system.required_templates_version;
			return !!installed && !!required && installed !== required;
		}
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", _hoisted_1$1, [createBaseVNode("div", _hoisted_2$1, [createBaseVNode("div", _hoisted_3$1, [createBaseVNode("h2", _hoisted_4$1, toDisplayString(_ctx.$t("g.systemInfo")), 1), createVNode(Button_default, {
				variant: "secondary",
				onClick: unref(copySystemInfo)
			}, {
				default: withCtx(() => [_cache[0] || (_cache[0] = createBaseVNode("i", { class: "pi pi-copy" }, null, -1)), createTextVNode(" " + toDisplayString(_ctx.$t("g.copySystemInfo")), 1)]),
				_: 1
			}, 8, ["onClick"])]), createBaseVNode("div", _hoisted_5, [(openBlock(true), createElementBlock(Fragment, null, renderList(unref(systemStatsColumns), (col) => {
				return openBlock(), createElementBlock(Fragment, { key: col.field }, [createBaseVNode("div", { class: normalizeClass(unref(cn)("font-medium", isOutdated(col) && "text-danger-100")) }, toDisplayString(_ctx.$t(col.headerKey)), 3), createBaseVNode("div", { class: normalizeClass(unref(cn)(isOutdated(col) && "text-danger-100")) }, toDisplayString(unref(getColumnDisplayValue)(__props.stats, col)), 3)], 64);
			}), 128))])]), hasDevices.value ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [_cache[1] || (_cache[1] = createBaseVNode("div", { class: "my-4 border-t border-interface-stroke" }, null, -1)), createBaseVNode("div", null, [createBaseVNode("h2", _hoisted_6, toDisplayString(_ctx.$t("g.devices")), 1), __props.stats.devices.length > 1 ? (openBlock(), createBlock(Tabs_default, {
				key: 0,
				"default-value": String(__props.stats.devices[0].index)
			}, {
				default: withCtx(() => [createVNode(TabsList_default, {
					variant: "bordered",
					class: "mb-4"
				}, {
					default: withCtx(() => [(openBlock(true), createElementBlock(Fragment, null, renderList(__props.stats.devices, (device) => {
						return openBlock(), createBlock(TabsTrigger_default, {
							key: device.index,
							value: String(device.index)
						}, {
							default: withCtx(() => [createTextVNode(toDisplayString(device.name), 1)]),
							_: 2
						}, 1032, ["value"]);
					}), 128))]),
					_: 1
				}), (openBlock(true), createElementBlock(Fragment, null, renderList(__props.stats.devices, (device) => {
					return openBlock(), createBlock(TabsContent_default, {
						key: device.index,
						value: String(device.index)
					}, {
						default: withCtx(() => [createVNode(DeviceInfo_default, { device }, null, 8, ["device"])]),
						_: 2
					}, 1032, ["value"]);
				}), 128))]),
				_: 1
			}, 8, ["default-value"])) : (openBlock(), createBlock(DeviceInfo_default, {
				key: 1,
				device: __props.stats.devices[0]
			}, null, 8, ["device"]))])], 64)) : createCommentVNode("", true)]);
		};
	}
});
//#endregion
//#region src/stores/aboutPanelStore.ts
var useAboutPanelStore = defineStore("aboutPanel", () => {
	const frontendVersion = void 0;
	const extensionStore = useExtensionStore();
	const systemStatsStore = useSystemStatsStore();
	const { staticUrls } = useExternalLink();
	const coreVersion = computed(() => systemStatsStore.systemStats?.system.comfyui_version ?? "");
	const templatesVersion = computed(() => systemStatsStore.systemStats?.system.installed_templates_version ?? "");
	const requiredTemplatesVersion = computed(() => systemStatsStore.systemStats?.system.required_templates_version ?? "");
	const isTemplatesOutdated = computed(() => templatesVersion.value !== "" && requiredTemplatesVersion.value !== "" && templatesVersion.value !== requiredTemplatesVersion.value);
	const coreBadges = computed(() => [
		{
			label: `ComfyUI ${formatCommitHash(coreVersion.value)}`,
			url: staticUrls.github,
			icon: "pi pi-github"
		},
		{
			label: `ComfyUI_frontend v${frontendVersion}`,
			url: staticUrls.githubFrontend,
			icon: "pi pi-github"
		},
		...templatesVersion.value ? [{
			label: `Templates v${templatesVersion.value}`,
			url: "https://pypi.org/project/comfyui-workflow-templates/",
			icon: "pi pi-book",
			...isTemplatesOutdated.value ? { severity: "danger" } : {}
		}] : [],
		{
			label: "Discord",
			url: staticUrls.discord,
			icon: "pi pi-discord"
		},
		{
			label: "ComfyOrg",
			url: staticUrls.comfyOrg,
			icon: "pi pi-globe"
		}
	]);
	return { badges: computed(() => [...coreBadges.value, ...extensionStore.extensions.flatMap((e) => e.aboutPageBadges ?? [])]) };
});
//#endregion
//#region src/components/dialog/content/setting/AboutPanel.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1 = {
	class: "about-container flex flex-col gap-2",
	"data-testid": "about-panel"
};
var _hoisted_2 = { class: "mb-2 text-2xl font-bold" };
var _hoisted_3 = { class: "space-y-2" };
var _hoisted_4 = ["href", "title"];
//#endregion
//#region src/components/dialog/content/setting/AboutPanel.vue
var AboutPanel_default = /* @__PURE__ */ defineComponent({
	__name: "AboutPanel",
	setup(__props) {
		const systemStatsStore = useSystemStatsStore();
		const aboutPanelStore = useAboutPanelStore();
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", _hoisted_1, [
				createBaseVNode("h2", _hoisted_2, toDisplayString(_ctx.$t("g.about")), 1),
				createBaseVNode("div", _hoisted_3, [(openBlock(true), createElementBlock(Fragment, null, renderList(unref(aboutPanelStore).badges, (badge) => {
					return openBlock(), createElementBlock("a", {
						key: badge.url,
						href: badge.url,
						target: "_blank",
						rel: "noopener noreferrer",
						class: "about-badge inline-flex items-center no-underline",
						title: badge.url
					}, [createVNode(Badge_default, {
						class: "mr-2",
						severity: badge.severity === "warn" ? "warning" : badge.severity
					}, {
						icon: withCtx(() => [createBaseVNode("i", { class: normalizeClass(unref(cn)(badge.icon, "mr-2 text-xl")) }, null, 2)]),
						default: withCtx(() => [createTextVNode(" " + toDisplayString(badge.label), 1)]),
						_: 2
					}, 1032, ["severity"])], 8, _hoisted_4);
				}), 128))]),
				_cache[0] || (_cache[0] = createBaseVNode("div", { class: "my-4 border-t border-interface-stroke" }, null, -1)),
				unref(systemStatsStore).systemStats ? (openBlock(), createBlock(SystemStatsPanel_default, {
					key: 0,
					stats: unref(systemStatsStore).systemStats
				}, null, 8, ["stats"])) : createCommentVNode("", true)
			]);
		};
	}
});
//#endregion
export { AboutPanel_default as default };
