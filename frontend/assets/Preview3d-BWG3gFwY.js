import "./rolldown-runtime-xtsTai4I.js";
import { Dt as withDirectives, E as withModifiers, Et as withCtx, F as createBaseVNode, G as defineComponent, H as createTextVNode, I as createBlock, Jt as normalizeClass, Kt as unref, L as createCommentVNode, Lt as ref, O as Fragment, P as computed, Q as mergeModels, R as createElementBlock, St as watch, U as createVNode, Zt as toDisplayString, dt as renderList, lt as openBlock, mt as resolveDirective, ot as onMounted, st as onUnmounted, w as vShow, xt as useTemplateRef, yt as useModel } from "./vendor-vue-core-C1utdb0s.js";
import { _ as SUPPORTED_HDRI_EXTENSIONS, i as useSettingStore, v as SUPPORTED_HDRI_EXTENSIONS_ACCEPT, y as getExportFormatOptions } from "./layoutStore-CZsuzg91.js";
import { t as useToastStore } from "./toastStore-CTfykAzG.js";
import { r as useI18n } from "./vendor-i18n-BZvE7WBQ.js";
import { t as cn } from "./src-DI1bBfrb.js";
import { t as Button_default } from "./Button-j0oCzR82.js";
import { t as AnimationControls_default } from "./AnimationControls-yykLVfiH.js";
import { t as Slider_default } from "./Slider-eQb4a5yt.js";
import { t as useLoad3dViewer } from "./useLoad3dViewer-Cv7HNH2I.js";
import { t as useDismissableOverlay } from "./useDismissableOverlay-CfA0qMz7.js";
//#region src/components/load3d/controls/PopupSlider.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1$9 = { class: "show-slider relative" };
var _hoisted_2$6 = { class: "absolute top-0 left-12 w-[150px] rounded-lg bg-interface-menu-surface p-4 shadow-lg" };
//#endregion
//#region src/components/load3d/controls/PopupSlider.vue
var PopupSlider_default = /* @__PURE__ */ defineComponent({
	__name: "PopupSlider",
	props: /*@__PURE__*/ mergeModels({
		icon: { default: "pi-expand" },
		tooltipText: {},
		min: { default: 10 },
		max: { default: 150 },
		step: { default: 1 }
	}, {
		"modelValue": {},
		"modelModifiers": {}
	}),
	emits: ["update:modelValue"],
	setup(__props) {
		const value = useModel(__props, "modelValue");
		const showSlider = ref(false);
		const sliderValue = computed(() => [value.value ?? __props.min]);
		function onSliderUpdate(val) {
			if (val?.length) value.value = val[0];
		}
		const toggleSlider = () => {
			showSlider.value = !showSlider.value;
		};
		const closeSlider = (e) => {
			if (!e.target.closest(".show-slider")) showSlider.value = false;
		};
		onMounted(() => {
			document.addEventListener("click", closeSlider);
		});
		onUnmounted(() => {
			document.removeEventListener("click", closeSlider);
		});
		return (_ctx, _cache) => {
			const _directive_tooltip = resolveDirective("tooltip");
			return openBlock(), createElementBlock("div", _hoisted_1$9, [withDirectives((openBlock(), createBlock(Button_default, {
				size: "icon",
				variant: "textonly",
				class: "rounded-full",
				"aria-label": __props.tooltipText,
				onClick: toggleSlider
			}, {
				default: withCtx(() => [createBaseVNode("i", { class: normalizeClass([
					"pi",
					__props.icon,
					"text-lg text-base-foreground"
				]) }, null, 2)]),
				_: 1
			}, 8, ["aria-label"])), [[
				_directive_tooltip,
				{
					value: __props.tooltipText,
					showDelay: 300
				},
				void 0,
				{ right: true }
			]]), withDirectives(createBaseVNode("div", _hoisted_2$6, [createVNode(Slider_default, {
				"model-value": sliderValue.value,
				class: "w-full",
				min: __props.min,
				max: __props.max,
				step: __props.step,
				"onUpdate:modelValue": onSliderUpdate
			}, null, 8, [
				"model-value",
				"min",
				"max",
				"step"
			])], 512), [[vShow, showSlider.value]])]);
		};
	}
});
//#endregion
//#region src/components/load3d/controls/CameraControls.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1$8 = { class: "flex flex-col" };
//#endregion
//#region src/components/load3d/controls/CameraControls.vue
var CameraControls_default = /* @__PURE__ */ defineComponent({
	__name: "CameraControls",
	props: /*@__PURE__*/ mergeModels({ hasCustomUp: {
		type: Boolean,
		default: false
	} }, {
		"cameraType": {},
		"cameraTypeModifiers": {},
		"fov": {},
		"fovModifiers": {},
		"useCustomUp": {
			type: Boolean,
			default: false
		},
		"useCustomUpModifiers": {}
	}),
	emits: [
		"update:cameraType",
		"update:fov",
		"update:useCustomUp"
	],
	setup(__props) {
		const cameraType = useModel(__props, "cameraType");
		const fov = useModel(__props, "fov");
		const useCustomUp = useModel(__props, "useCustomUp");
		const showFOVButton = computed(() => cameraType.value === "perspective");
		const switchCamera = () => {
			cameraType.value = cameraType.value === "perspective" ? "orthographic" : "perspective";
		};
		const toggleUp = () => {
			useCustomUp.value = !useCustomUp.value;
		};
		return (_ctx, _cache) => {
			const _directive_tooltip = resolveDirective("tooltip");
			return openBlock(), createElementBlock("div", _hoisted_1$8, [
				withDirectives((openBlock(), createBlock(Button_default, {
					size: "icon",
					variant: "textonly",
					class: "rounded-full",
					"aria-label": _ctx.$t("load3d.switchCamera"),
					onClick: switchCamera
				}, {
					default: withCtx(() => [..._cache[1] || (_cache[1] = [createBaseVNode("i", { class: "pi pi-camera text-lg text-base-foreground" }, null, -1)])]),
					_: 1
				}, 8, ["aria-label"])), [[
					_directive_tooltip,
					{
						value: _ctx.$t("load3d.switchCamera"),
						showDelay: 300
					},
					void 0,
					{ right: true }
				]]),
				__props.hasCustomUp ? withDirectives((openBlock(), createBlock(Button_default, {
					key: 0,
					size: "icon",
					variant: "textonly",
					class: "rounded-full",
					"aria-label": useCustomUp.value ? _ctx.$t("load3d.useNaturalUp") : _ctx.$t("load3d.useCustomUp"),
					onClick: toggleUp
				}, {
					default: withCtx(() => [createBaseVNode("i", { class: normalizeClass(unref(cn)(useCustomUp.value ? "icon-[lucide--compass]" : "icon-[lucide--rotate-ccw]", "size-5 text-base-foreground")) }, null, 2)]),
					_: 1
				}, 8, ["aria-label"])), [[
					_directive_tooltip,
					{
						value: useCustomUp.value ? _ctx.$t("load3d.useNaturalUp") : _ctx.$t("load3d.useCustomUp"),
						showDelay: 300
					},
					void 0,
					{ right: true }
				]]) : createCommentVNode("", true),
				showFOVButton.value ? (openBlock(), createBlock(PopupSlider_default, {
					key: 1,
					modelValue: fov.value,
					"onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => fov.value = $event),
					"tooltip-text": _ctx.$t("load3d.fov")
				}, null, 8, ["modelValue", "tooltip-text"])) : createCommentVNode("", true)
			]);
		};
	}
});
//#endregion
//#region src/components/load3d/controls/ExportControls.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1$7 = { class: "flex flex-col" };
var _hoisted_2$5 = { class: "show-export-formats relative" };
var _hoisted_3$4 = { class: "absolute top-0 left-12 rounded-lg bg-interface-menu-surface shadow-lg" };
var _hoisted_4$4 = { class: "flex flex-col" };
//#endregion
//#region src/components/load3d/controls/ExportControls.vue
var ExportControls_default = /* @__PURE__ */ defineComponent({
	__name: "ExportControls",
	props: { sourceFormat: { default: null } },
	emits: ["exportModel"],
	setup(__props, { emit: __emit }) {
		const emit = __emit;
		const showExportFormats = ref(false);
		const exportFormats = computed(() => getExportFormatOptions(__props.sourceFormat));
		function toggleExportFormats() {
			showExportFormats.value = !showExportFormats.value;
		}
		function exportModel(format) {
			emit("exportModel", format);
			showExportFormats.value = false;
		}
		function closeExportFormatsList(e) {
			if (!e.target.closest(".show-export-formats")) showExportFormats.value = false;
		}
		onMounted(() => {
			document.addEventListener("click", closeExportFormatsList);
		});
		onUnmounted(() => {
			document.removeEventListener("click", closeExportFormatsList);
		});
		return (_ctx, _cache) => {
			const _directive_tooltip = resolveDirective("tooltip");
			return openBlock(), createElementBlock("div", _hoisted_1$7, [createBaseVNode("div", _hoisted_2$5, [withDirectives((openBlock(), createBlock(Button_default, {
				size: "icon",
				variant: "textonly",
				class: "rounded-full",
				"aria-label": _ctx.$t("load3d.exportModel"),
				onClick: toggleExportFormats
			}, {
				default: withCtx(() => [..._cache[0] || (_cache[0] = [createBaseVNode("i", { class: "pi pi-download text-lg text-base-foreground" }, null, -1)])]),
				_: 1
			}, 8, ["aria-label"])), [[
				_directive_tooltip,
				{
					value: _ctx.$t("load3d.exportModel"),
					showDelay: 300
				},
				void 0,
				{ right: true }
			]]), withDirectives(createBaseVNode("div", _hoisted_3$4, [createBaseVNode("div", _hoisted_4$4, [(openBlock(true), createElementBlock(Fragment, null, renderList(exportFormats.value, (format) => {
				return openBlock(), createBlock(Button_default, {
					key: format.value,
					variant: "textonly",
					class: "text-base-foreground",
					onClick: ($event) => exportModel(format.value)
				}, {
					default: withCtx(() => [createTextVNode(toDisplayString(format.label), 1)]),
					_: 2
				}, 1032, ["onClick"]);
			}), 128))])], 512), [[vShow, showExportFormats.value]])])]);
		};
	}
});
//#endregion
//#region src/components/load3d/controls/GizmoControls.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1$6 = { class: "flex flex-col" };
//#endregion
//#region src/components/load3d/controls/GizmoControls.vue
var GizmoControls_default = /* @__PURE__ */ defineComponent({
	__name: "GizmoControls",
	props: {
		"gizmoConfig": {},
		"gizmoConfigModifiers": {}
	},
	emits: /*@__PURE__*/ mergeModels([
		"toggleGizmo",
		"setGizmoMode",
		"resetGizmoTransform"
	], ["update:gizmoConfig"]),
	setup(__props, { emit: __emit }) {
		const { t } = useI18n();
		const gizmoConfig = useModel(__props, "gizmoConfig");
		const gizmoEnabled = computed(() => gizmoConfig.value?.enabled ?? false);
		const gizmoMode = computed(() => gizmoConfig.value?.mode ?? "translate");
		const emit = __emit;
		const toggleGizmo = () => {
			if (!gizmoConfig.value) return;
			gizmoConfig.value.enabled = !gizmoConfig.value.enabled;
			emit("toggleGizmo", gizmoConfig.value.enabled);
		};
		const setMode = (mode) => {
			if (!gizmoConfig.value) return;
			gizmoConfig.value.mode = mode;
			emit("setGizmoMode", mode);
		};
		const resetTransform = () => {
			emit("resetGizmoTransform");
		};
		return (_ctx, _cache) => {
			const _directive_tooltip = resolveDirective("tooltip");
			return openBlock(), createElementBlock("div", _hoisted_1$6, [withDirectives((openBlock(), createBlock(Button_default, {
				variant: "textonly",
				size: "icon",
				class: normalizeClass(unref(cn)("rounded-full", gizmoEnabled.value && "ring-2 ring-white/50")),
				"aria-label": unref(t)("load3d.gizmo.toggle"),
				onClick: toggleGizmo
			}, {
				default: withCtx(() => [..._cache[3] || (_cache[3] = [createBaseVNode("i", { class: "pi pi-compass text-lg text-base-foreground" }, null, -1)])]),
				_: 1
			}, 8, ["class", "aria-label"])), [[
				_directive_tooltip,
				{
					value: unref(t)("load3d.gizmo.toggle"),
					showDelay: 300
				},
				void 0,
				{ right: true }
			]]), gizmoEnabled.value ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
				withDirectives((openBlock(), createBlock(Button_default, {
					variant: "textonly",
					size: "icon",
					class: normalizeClass(unref(cn)("rounded-full", gizmoMode.value === "translate" && "ring-2 ring-white/50")),
					"aria-label": unref(t)("load3d.gizmo.translate"),
					onClick: _cache[0] || (_cache[0] = ($event) => setMode("translate"))
				}, {
					default: withCtx(() => [..._cache[4] || (_cache[4] = [createBaseVNode("i", { class: "pi pi-arrows-alt text-lg text-base-foreground" }, null, -1)])]),
					_: 1
				}, 8, ["class", "aria-label"])), [[
					_directive_tooltip,
					{
						value: unref(t)("load3d.gizmo.translate"),
						showDelay: 300
					},
					void 0,
					{ right: true }
				]]),
				withDirectives((openBlock(), createBlock(Button_default, {
					variant: "textonly",
					size: "icon",
					class: normalizeClass(unref(cn)("rounded-full", gizmoMode.value === "rotate" && "ring-2 ring-white/50")),
					"aria-label": unref(t)("load3d.gizmo.rotate"),
					onClick: _cache[1] || (_cache[1] = ($event) => setMode("rotate"))
				}, {
					default: withCtx(() => [..._cache[5] || (_cache[5] = [createBaseVNode("i", { class: "pi pi-sync text-lg text-base-foreground" }, null, -1)])]),
					_: 1
				}, 8, ["class", "aria-label"])), [[
					_directive_tooltip,
					{
						value: unref(t)("load3d.gizmo.rotate"),
						showDelay: 300
					},
					void 0,
					{ right: true }
				]]),
				withDirectives((openBlock(), createBlock(Button_default, {
					variant: "textonly",
					size: "icon",
					class: normalizeClass(unref(cn)("rounded-full", gizmoMode.value === "scale" && "ring-2 ring-white/50")),
					"aria-label": unref(t)("load3d.gizmo.scale"),
					onClick: _cache[2] || (_cache[2] = ($event) => setMode("scale"))
				}, {
					default: withCtx(() => [..._cache[6] || (_cache[6] = [createBaseVNode("i", { class: "pi pi-expand text-lg text-base-foreground" }, null, -1)])]),
					_: 1
				}, 8, ["class", "aria-label"])), [[
					_directive_tooltip,
					{
						value: unref(t)("load3d.gizmo.scale"),
						showDelay: 300
					},
					void 0,
					{ right: true }
				]]),
				withDirectives((openBlock(), createBlock(Button_default, {
					variant: "textonly",
					size: "icon",
					class: "rounded-full",
					"aria-label": unref(t)("load3d.gizmo.reset"),
					onClick: resetTransform
				}, {
					default: withCtx(() => [..._cache[7] || (_cache[7] = [createBaseVNode("i", { class: "pi pi-refresh text-lg text-base-foreground" }, null, -1)])]),
					_: 1
				}, 8, ["aria-label"])), [[
					_directive_tooltip,
					{
						value: unref(t)("load3d.gizmo.reset"),
						showDelay: 300
					},
					void 0,
					{ right: true }
				]])
			], 64)) : createCommentVNode("", true)]);
		};
	}
});
//#endregion
//#region src/components/load3d/controls/HDRIControls.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1$5 = {
	key: 0,
	class: "flex flex-col"
};
var _hoisted_2$4 = ["accept"];
//#endregion
//#region src/components/load3d/controls/HDRIControls.vue
var HDRIControls_default = /* @__PURE__ */ defineComponent({
	__name: "HDRIControls",
	props: /*@__PURE__*/ mergeModels({ hasBackgroundImage: {
		type: Boolean,
		default: false
	} }, {
		"hdriConfig": {},
		"hdriConfigModifiers": {}
	}),
	emits: /*@__PURE__*/ mergeModels(["updateHdriFile"], ["update:hdriConfig"]),
	setup(__props, { emit: __emit }) {
		const { t } = useI18n();
		const hdriConfig = useModel(__props, "hdriConfig");
		const emit = __emit;
		const fileInputRef = ref(null);
		function triggerFileInput() {
			fileInputRef.value?.click();
		}
		function onFileChange(event) {
			const input = event.target;
			const file = input.files?.[0] ?? null;
			input.value = "";
			if (file) {
				const ext = `.${file.name.split(".").pop()?.toLowerCase() ?? ""}`;
				if (!SUPPORTED_HDRI_EXTENSIONS.has(ext)) {
					useToastStore().addAlert(t("toastMessages.unsupportedHDRIFormat"));
					return;
				}
			}
			emit("updateHdriFile", file);
		}
		function toggleEnabled() {
			if (!hdriConfig.value) return;
			hdriConfig.value = {
				...hdriConfig.value,
				enabled: !hdriConfig.value.enabled
			};
		}
		function toggleShowAsBackground() {
			if (!hdriConfig.value) return;
			hdriConfig.value = {
				...hdriConfig.value,
				showAsBackground: !hdriConfig.value.showAsBackground
			};
		}
		function onRemoveHDRI() {
			emit("updateHdriFile", null);
		}
		return (_ctx, _cache) => {
			const _directive_tooltip = resolveDirective("tooltip");
			return !__props.hasBackgroundImage || hdriConfig.value?.hdriPath ? (openBlock(), createElementBlock("div", _hoisted_1$5, [
				withDirectives((openBlock(), createBlock(Button_default, {
					size: "icon",
					variant: "textonly",
					class: "rounded-full",
					"aria-label": hdriConfig.value?.hdriPath ? _ctx.$t("load3d.hdri.changeFile") : _ctx.$t("load3d.hdri.uploadFile"),
					onClick: triggerFileInput
				}, {
					default: withCtx(() => [..._cache[0] || (_cache[0] = [createBaseVNode("i", { class: "icon-[lucide--upload] text-lg text-base-foreground" }, null, -1)])]),
					_: 1
				}, 8, ["aria-label"])), [[
					_directive_tooltip,
					{
						value: hdriConfig.value?.hdriPath ? _ctx.$t("load3d.hdri.changeFile") : _ctx.$t("load3d.hdri.uploadFile"),
						showDelay: 300
					},
					void 0,
					{ right: true }
				]]),
				hdriConfig.value?.hdriPath ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
					withDirectives((openBlock(), createBlock(Button_default, {
						size: "icon",
						variant: "textonly",
						class: normalizeClass(unref(cn)("rounded-full", hdriConfig.value?.enabled && "ring-2 ring-white/50")),
						"aria-label": _ctx.$t("load3d.hdri.label"),
						onClick: toggleEnabled
					}, {
						default: withCtx(() => [..._cache[1] || (_cache[1] = [createBaseVNode("i", { class: "icon-[lucide--globe] text-lg text-base-foreground" }, null, -1)])]),
						_: 1
					}, 8, ["class", "aria-label"])), [[
						_directive_tooltip,
						{
							value: _ctx.$t("load3d.hdri.label"),
							showDelay: 300
						},
						void 0,
						{ right: true }
					]]),
					withDirectives((openBlock(), createBlock(Button_default, {
						size: "icon",
						variant: "textonly",
						class: normalizeClass(unref(cn)("rounded-full", hdriConfig.value?.showAsBackground && "ring-2 ring-white/50")),
						"aria-label": _ctx.$t("load3d.hdri.showAsBackground"),
						onClick: toggleShowAsBackground
					}, {
						default: withCtx(() => [..._cache[2] || (_cache[2] = [createBaseVNode("i", { class: "icon-[lucide--image] text-lg text-base-foreground" }, null, -1)])]),
						_: 1
					}, 8, ["class", "aria-label"])), [[
						_directive_tooltip,
						{
							value: _ctx.$t("load3d.hdri.showAsBackground"),
							showDelay: 300
						},
						void 0,
						{ right: true }
					]]),
					withDirectives((openBlock(), createBlock(Button_default, {
						size: "icon",
						variant: "textonly",
						class: "rounded-full",
						"aria-label": _ctx.$t("load3d.hdri.removeFile"),
						onClick: onRemoveHDRI
					}, {
						default: withCtx(() => [..._cache[3] || (_cache[3] = [createBaseVNode("i", { class: "icon-[lucide--x] text-lg text-base-foreground" }, null, -1)])]),
						_: 1
					}, 8, ["aria-label"])), [[
						_directive_tooltip,
						{
							value: _ctx.$t("load3d.hdri.removeFile"),
							showDelay: 300
						},
						void 0,
						{ right: true }
					]])
				], 64)) : createCommentVNode("", true),
				createBaseVNode("input", {
					ref_key: "fileInputRef",
					ref: fileInputRef,
					type: "file",
					class: "hidden",
					accept: unref(SUPPORTED_HDRI_EXTENSIONS_ACCEPT),
					onChange: onFileChange
				}, null, 40, _hoisted_2$4)
			])) : createCommentVNode("", true);
		};
	}
});
//#endregion
//#region src/components/load3d/controls/LightControls.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1$4 = { class: "flex flex-col" };
var _hoisted_2$3 = {
	key: 0,
	class: "flex w-[200px] flex-col gap-2 rounded-lg bg-black/50 p-3 shadow-lg"
};
var _hoisted_3$3 = { class: "text-sm font-medium text-base-foreground" };
var _hoisted_4$3 = {
	key: 1,
	class: "relative"
};
//#endregion
//#region src/components/load3d/controls/LightControls.vue
var LightControls_default = /* @__PURE__ */ defineComponent({
	__name: "LightControls",
	props: /*@__PURE__*/ mergeModels({ embedded: {
		type: Boolean,
		default: false
	} }, {
		"lightIntensity": {},
		"lightIntensityModifiers": {},
		"materialMode": {},
		"materialModeModifiers": {},
		"hdriConfig": {},
		"hdriConfigModifiers": {}
	}),
	emits: [
		"update:lightIntensity",
		"update:materialMode",
		"update:hdriConfig"
	],
	setup(__props) {
		const lightIntensity = useModel(__props, "lightIntensity");
		const materialMode = useModel(__props, "materialMode");
		const hdriConfig = useModel(__props, "hdriConfig");
		const usesHdriIntensity = computed(() => !!hdriConfig.value?.hdriPath?.length && !!hdriConfig.value?.enabled);
		const showIntensityControl = computed(() => materialMode.value === "original");
		const lightIntensityMaximum = useSettingStore().get("Comfy.Load3D.LightIntensityMaximum");
		const lightIntensityMinimum = useSettingStore().get("Comfy.Load3D.LightIntensityMinimum");
		const lightAdjustmentIncrement = useSettingStore().get("Comfy.Load3D.LightAdjustmentIncrement");
		const sliderMin = computed(() => usesHdriIntensity.value ? 0 : lightIntensityMinimum);
		const sliderMax = computed(() => usesHdriIntensity.value ? 5 : lightIntensityMaximum);
		const sliderStep = computed(() => usesHdriIntensity.value ? .1 : lightAdjustmentIncrement);
		const sliderValue = computed(() => {
			if (usesHdriIntensity.value) return [hdriConfig.value?.intensity ?? 1];
			return [lightIntensity.value ?? lightIntensityMinimum];
		});
		const showLightIntensity = ref(false);
		const panelRef = ref(null);
		const triggerRef = ref(null);
		useDismissableOverlay({
			isOpen: showLightIntensity,
			getOverlayEl: () => panelRef.value,
			getTriggerEl: () => triggerRef.value?.$el ?? null,
			onDismiss: () => {
				showLightIntensity.value = false;
			}
		});
		function toggleLightIntensity() {
			showLightIntensity.value = !showLightIntensity.value;
		}
		function onSliderUpdate(value) {
			if (!value?.length) return;
			const next = value[0];
			if (usesHdriIntensity.value) {
				const h = hdriConfig.value;
				if (!h) return;
				hdriConfig.value = {
					...h,
					intensity: next
				};
			} else lightIntensity.value = next;
		}
		return (_ctx, _cache) => {
			const _directive_tooltip = resolveDirective("tooltip");
			return openBlock(), createElementBlock("div", _hoisted_1$4, [__props.embedded && showIntensityControl.value ? (openBlock(), createElementBlock("div", _hoisted_2$3, [createBaseVNode("span", _hoisted_3$3, toDisplayString(_ctx.$t("load3d.lightIntensity")), 1), createVNode(Slider_default, {
				"model-value": sliderValue.value,
				class: "w-full",
				min: sliderMin.value,
				max: sliderMax.value,
				step: sliderStep.value,
				"onUpdate:modelValue": onSliderUpdate
			}, null, 8, [
				"model-value",
				"min",
				"max",
				"step"
			])])) : showIntensityControl.value ? (openBlock(), createElementBlock("div", _hoisted_4$3, [withDirectives((openBlock(), createBlock(Button_default, {
				ref_key: "triggerRef",
				ref: triggerRef,
				size: "icon",
				variant: "textonly",
				class: "rounded-full",
				"aria-label": _ctx.$t("load3d.lightIntensity"),
				onClick: toggleLightIntensity
			}, {
				default: withCtx(() => [..._cache[0] || (_cache[0] = [createBaseVNode("i", { class: "icon-[lucide--sun] text-lg text-base-foreground" }, null, -1)])]),
				_: 1
			}, 8, ["aria-label"])), [[
				_directive_tooltip,
				{
					value: _ctx.$t("load3d.lightIntensity"),
					showDelay: 300
				},
				void 0,
				{ right: true }
			]]), withDirectives(createBaseVNode("div", {
				ref_key: "panelRef",
				ref: panelRef,
				class: "absolute top-0 left-12 w-[200px] rounded-lg bg-black/50 p-3 shadow-lg"
			}, [createVNode(Slider_default, {
				"model-value": sliderValue.value,
				class: "w-full",
				min: sliderMin.value,
				max: sliderMax.value,
				step: sliderStep.value,
				"onUpdate:modelValue": onSliderUpdate
			}, null, 8, [
				"model-value",
				"min",
				"max",
				"step"
			])], 512), [[vShow, showLightIntensity.value]])])) : createCommentVNode("", true)]);
		};
	}
});
//#endregion
//#region src/components/load3d/controls/ModelControls.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1$3 = { class: "flex flex-col" };
var _hoisted_2$2 = { class: "show-up-direction relative" };
var _hoisted_3$2 = { class: "absolute top-0 left-12 rounded-lg bg-interface-menu-surface shadow-lg" };
var _hoisted_4$2 = { class: "flex flex-col" };
var _hoisted_5$2 = {
	key: 0,
	class: "show-material-mode relative"
};
var _hoisted_6$1 = { class: "absolute top-0 left-12 rounded-lg bg-interface-menu-surface shadow-lg" };
var _hoisted_7 = { class: "flex flex-col" };
var _hoisted_8 = { key: 1 };
//#endregion
//#region src/components/load3d/controls/ModelControls.vue
var ModelControls_default = /* @__PURE__ */ defineComponent({
	__name: "ModelControls",
	props: /*@__PURE__*/ mergeModels({
		materialModes: { default: () => [
			"original",
			"normal",
			"wireframe"
		] },
		hasSkeleton: {
			type: Boolean,
			default: false
		}
	}, {
		"materialMode": {},
		"materialModeModifiers": {},
		"upDirection": {},
		"upDirectionModifiers": {},
		"showSkeleton": { type: Boolean },
		"showSkeletonModifiers": {}
	}),
	emits: [
		"update:materialMode",
		"update:upDirection",
		"update:showSkeleton"
	],
	setup(__props) {
		const { t } = useI18n();
		const materialMode = useModel(__props, "materialMode");
		const upDirection = useModel(__props, "upDirection");
		const showSkeleton = useModel(__props, "showSkeleton");
		const showUpDirection = ref(false);
		const showMaterialMode = ref(false);
		const upDirections = [
			"original",
			"-x",
			"+x",
			"-y",
			"+y",
			"-z",
			"+z"
		];
		function toggleUpDirection() {
			showUpDirection.value = !showUpDirection.value;
			showMaterialMode.value = false;
		}
		function selectUpDirection(direction) {
			upDirection.value = direction;
			showUpDirection.value = false;
		}
		function toggleMaterialMode() {
			showMaterialMode.value = !showMaterialMode.value;
			showUpDirection.value = false;
		}
		function selectMaterialMode(mode) {
			materialMode.value = mode;
			showMaterialMode.value = false;
		}
		function formatMaterialMode(mode) {
			return t(`load3d.materialModes.${mode}`);
		}
		function closeSceneSlider(e) {
			const target = e.target;
			if (!target.closest(".show-up-direction")) showUpDirection.value = false;
			if (!target.closest(".show-material-mode")) showMaterialMode.value = false;
		}
		onMounted(() => {
			document.addEventListener("click", closeSceneSlider);
		});
		onUnmounted(() => {
			document.removeEventListener("click", closeSceneSlider);
		});
		return (_ctx, _cache) => {
			const _directive_tooltip = resolveDirective("tooltip");
			return openBlock(), createElementBlock("div", _hoisted_1$3, [
				createBaseVNode("div", _hoisted_2$2, [withDirectives((openBlock(), createBlock(Button_default, {
					size: "icon",
					variant: "textonly",
					class: "rounded-full",
					"aria-label": unref(t)("load3d.upDirection"),
					onClick: toggleUpDirection
				}, {
					default: withCtx(() => [..._cache[1] || (_cache[1] = [createBaseVNode("i", { class: "pi pi-arrow-up text-lg text-base-foreground" }, null, -1)])]),
					_: 1
				}, 8, ["aria-label"])), [[
					_directive_tooltip,
					{
						value: unref(t)("load3d.upDirection"),
						showDelay: 300
					},
					void 0,
					{ right: true }
				]]), withDirectives(createBaseVNode("div", _hoisted_3$2, [createBaseVNode("div", _hoisted_4$2, [(openBlock(), createElementBlock(Fragment, null, renderList(upDirections, (direction) => {
					return createVNode(Button_default, {
						key: direction,
						variant: "textonly",
						class: normalizeClass(unref(cn)("text-base-foreground", upDirection.value === direction && "bg-blue-500")),
						onClick: ($event) => selectUpDirection(direction)
					}, {
						default: withCtx(() => [createTextVNode(toDisplayString(direction.toUpperCase()), 1)]),
						_: 2
					}, 1032, ["class", "onClick"]);
				}), 64))])], 512), [[vShow, showUpDirection.value]])]),
				__props.materialModes.length > 0 ? (openBlock(), createElementBlock("div", _hoisted_5$2, [withDirectives((openBlock(), createBlock(Button_default, {
					size: "icon",
					variant: "textonly",
					class: "rounded-full",
					"aria-label": unref(t)("load3d.materialMode"),
					onClick: toggleMaterialMode
				}, {
					default: withCtx(() => [..._cache[2] || (_cache[2] = [createBaseVNode("i", { class: "pi pi-box text-lg text-base-foreground" }, null, -1)])]),
					_: 1
				}, 8, ["aria-label"])), [[
					_directive_tooltip,
					{
						value: unref(t)("load3d.materialMode"),
						showDelay: 300
					},
					void 0,
					{ right: true }
				]]), withDirectives(createBaseVNode("div", _hoisted_6$1, [createBaseVNode("div", _hoisted_7, [(openBlock(true), createElementBlock(Fragment, null, renderList(__props.materialModes, (mode) => {
					return openBlock(), createBlock(Button_default, {
						key: mode,
						variant: "textonly",
						class: normalizeClass(unref(cn)("whitespace-nowrap text-base-foreground", materialMode.value === mode && "bg-blue-500")),
						onClick: ($event) => selectMaterialMode(mode)
					}, {
						default: withCtx(() => [createTextVNode(toDisplayString(formatMaterialMode(mode)), 1)]),
						_: 2
					}, 1032, ["class", "onClick"]);
				}), 128))])], 512), [[vShow, showMaterialMode.value]])])) : createCommentVNode("", true),
				__props.hasSkeleton ? (openBlock(), createElementBlock("div", _hoisted_8, [withDirectives((openBlock(), createBlock(Button_default, {
					size: "icon",
					variant: "textonly",
					class: normalizeClass(unref(cn)("rounded-full", showSkeleton.value && "bg-blue-500")),
					"aria-label": unref(t)("load3d.showSkeleton"),
					onClick: _cache[0] || (_cache[0] = ($event) => showSkeleton.value = !showSkeleton.value)
				}, {
					default: withCtx(() => [..._cache[3] || (_cache[3] = [createBaseVNode("i", { class: "pi pi-sitemap text-lg text-base-foreground" }, null, -1)])]),
					_: 1
				}, 8, ["class", "aria-label"])), [[
					_directive_tooltip,
					{
						value: unref(t)("load3d.showSkeleton"),
						showDelay: 300
					},
					void 0,
					{ right: true }
				]])])) : createCommentVNode("", true)
			]);
		};
	}
});
//#endregion
//#region src/components/load3d/controls/SceneControls.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1$2 = { class: "flex flex-col" };
var _hoisted_2$1 = { key: 0 };
var _hoisted_3$1 = ["value"];
var _hoisted_4$1 = { key: 1 };
var _hoisted_5$1 = { key: 1 };
var _hoisted_6 = { key: 3 };
//#endregion
//#region src/components/load3d/controls/SceneControls.vue
var SceneControls_default = /* @__PURE__ */ defineComponent({
	__name: "SceneControls",
	props: /*@__PURE__*/ mergeModels({
		hdriActive: {
			type: Boolean,
			default: false
		},
		showBackgroundImage: {
			type: Boolean,
			default: true
		}
	}, {
		"showGrid": { type: Boolean },
		"showGridModifiers": {},
		"backgroundColor": {},
		"backgroundColorModifiers": {},
		"backgroundImage": {},
		"backgroundImageModifiers": {},
		"backgroundRenderMode": { default: "tiled" },
		"backgroundRenderModeModifiers": {},
		"fov": {},
		"fovModifiers": {}
	}),
	emits: /*@__PURE__*/ mergeModels(["updateBackgroundImage"], [
		"update:showGrid",
		"update:backgroundColor",
		"update:backgroundImage",
		"update:backgroundRenderMode",
		"update:fov"
	]),
	setup(__props, { emit: __emit }) {
		const emit = __emit;
		const showGrid = useModel(__props, "showGrid");
		const backgroundColor = useModel(__props, "backgroundColor");
		const backgroundImage = useModel(__props, "backgroundImage");
		const backgroundRenderMode = useModel(__props, "backgroundRenderMode");
		const fov = useModel(__props, "fov");
		const hasBackgroundImage = computed(() => backgroundImage.value && backgroundImage.value !== "");
		const colorPickerRef = ref(null);
		const imagePickerRef = ref(null);
		const toggleGrid = () => {
			showGrid.value = !showGrid.value;
		};
		const updateBackgroundColor = (color) => {
			backgroundColor.value = color;
		};
		const openColorPicker = () => {
			colorPickerRef.value?.click();
		};
		const openImagePicker = () => {
			imagePickerRef.value?.click();
		};
		const uploadBackgroundImage = (event) => {
			const input = event.target;
			if (input.files && input.files[0]) emit("updateBackgroundImage", input.files[0]);
		};
		const removeBackgroundImage = () => {
			emit("updateBackgroundImage", null);
		};
		const toggleBackgroundRenderMode = () => {
			backgroundRenderMode.value = backgroundRenderMode.value === "panorama" ? "tiled" : "panorama";
		};
		return (_ctx, _cache) => {
			const _directive_tooltip = resolveDirective("tooltip");
			return openBlock(), createElementBlock("div", _hoisted_1$2, [
				withDirectives((openBlock(), createBlock(Button_default, {
					variant: "textonly",
					size: "icon",
					class: normalizeClass(unref(cn)("rounded-full", showGrid.value && "ring-2 ring-white/50")),
					"aria-label": _ctx.$t("load3d.showGrid"),
					onClick: toggleGrid
				}, {
					default: withCtx(() => [..._cache[2] || (_cache[2] = [createBaseVNode("i", { class: "pi pi-table text-lg text-base-foreground" }, null, -1)])]),
					_: 1
				}, 8, ["class", "aria-label"])), [[
					_directive_tooltip,
					{
						value: _ctx.$t("load3d.showGrid"),
						showDelay: 300
					},
					void 0,
					{ right: true }
				]]),
				!__props.hdriActive ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [!hasBackgroundImage.value ? (openBlock(), createElementBlock("div", _hoisted_2$1, [withDirectives((openBlock(), createBlock(Button_default, {
					variant: "textonly",
					size: "icon",
					class: "rounded-full",
					"aria-label": _ctx.$t("load3d.backgroundColor"),
					onClick: openColorPicker
				}, {
					default: withCtx(() => [_cache[3] || (_cache[3] = createBaseVNode("i", { class: "pi pi-palette text-lg text-base-foreground" }, null, -1)), createBaseVNode("input", {
						ref_key: "colorPickerRef",
						ref: colorPickerRef,
						type: "color",
						value: backgroundColor.value,
						class: "pointer-events-none absolute m-0 size-0 p-0 opacity-0",
						onInput: _cache[0] || (_cache[0] = ($event) => updateBackgroundColor($event.target.value))
					}, null, 40, _hoisted_3$1)]),
					_: 1
				}, 8, ["aria-label"])), [[
					_directive_tooltip,
					{
						value: _ctx.$t("load3d.backgroundColor"),
						showDelay: 300
					},
					void 0,
					{ right: true }
				]])])) : createCommentVNode("", true), __props.showBackgroundImage && !hasBackgroundImage.value ? (openBlock(), createElementBlock("div", _hoisted_4$1, [withDirectives((openBlock(), createBlock(Button_default, {
					variant: "textonly",
					size: "icon",
					class: "rounded-full",
					"aria-label": _ctx.$t("load3d.uploadBackgroundImage"),
					onClick: openImagePicker
				}, {
					default: withCtx(() => [_cache[4] || (_cache[4] = createBaseVNode("i", { class: "pi pi-image text-lg text-base-foreground" }, null, -1)), createBaseVNode("input", {
						ref_key: "imagePickerRef",
						ref: imagePickerRef,
						type: "file",
						accept: "image/*",
						class: "pointer-events-none absolute m-0 size-0 p-0 opacity-0",
						onChange: uploadBackgroundImage
					}, null, 544)]),
					_: 1
				}, 8, ["aria-label"])), [[
					_directive_tooltip,
					{
						value: _ctx.$t("load3d.uploadBackgroundImage"),
						showDelay: 300
					},
					void 0,
					{ right: true }
				]])])) : createCommentVNode("", true)], 64)) : createCommentVNode("", true),
				__props.showBackgroundImage && hasBackgroundImage.value ? (openBlock(), createElementBlock("div", _hoisted_5$1, [withDirectives((openBlock(), createBlock(Button_default, {
					variant: "textonly",
					size: "icon",
					class: normalizeClass(unref(cn)("rounded-full", backgroundRenderMode.value === "panorama" && "ring-2 ring-white/50")),
					"aria-label": _ctx.$t("load3d.panoramaMode"),
					onClick: toggleBackgroundRenderMode
				}, {
					default: withCtx(() => [..._cache[5] || (_cache[5] = [createBaseVNode("i", { class: "pi pi-globe text-lg text-base-foreground" }, null, -1)])]),
					_: 1
				}, 8, ["class", "aria-label"])), [[
					_directive_tooltip,
					{
						value: _ctx.$t("load3d.panoramaMode"),
						showDelay: 300
					},
					void 0,
					{ right: true }
				]])])) : createCommentVNode("", true),
				__props.showBackgroundImage && hasBackgroundImage.value && backgroundRenderMode.value === "panorama" ? (openBlock(), createBlock(PopupSlider_default, {
					key: 2,
					modelValue: fov.value,
					"onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => fov.value = $event),
					"tooltip-text": _ctx.$t("load3d.fov")
				}, null, 8, ["modelValue", "tooltip-text"])) : createCommentVNode("", true),
				__props.showBackgroundImage && hasBackgroundImage.value ? (openBlock(), createElementBlock("div", _hoisted_6, [withDirectives((openBlock(), createBlock(Button_default, {
					variant: "textonly",
					size: "icon",
					class: "rounded-full",
					"aria-label": _ctx.$t("load3d.removeBackgroundImage"),
					onClick: removeBackgroundImage
				}, {
					default: withCtx(() => [..._cache[6] || (_cache[6] = [createBaseVNode("i", { class: "pi pi-times text-lg text-base-foreground" }, null, -1)])]),
					_: 1
				}, 8, ["aria-label"])), [[
					_directive_tooltip,
					{
						value: _ctx.$t("load3d.removeBackgroundImage"),
						showDelay: 300
					},
					void 0,
					{ right: true }
				]])])) : createCommentVNode("", true)
			]);
		};
	}
});
//#endregion
//#region src/components/load3d/Load3DControls.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1$1 = { class: "relative" };
var _hoisted_2 = { class: "flex flex-col" };
var _hoisted_3 = { class: "whitespace-nowrap text-base-foreground" };
var _hoisted_4 = { class: "rounded-lg bg-smoke-700/30" };
var _hoisted_5 = {
	key: 3,
	class: "flex flex-col"
};
//#endregion
//#region src/components/load3d/Load3DControls.vue
var Load3DControls_default = /* @__PURE__ */ defineComponent({
	__name: "Load3DControls",
	props: /*@__PURE__*/ mergeModels({
		canUseGizmo: {
			type: Boolean,
			default: true
		},
		canUseLighting: {
			type: Boolean,
			default: true
		},
		canExport: {
			type: Boolean,
			default: true
		},
		canUseHdri: {
			type: Boolean,
			default: true
		},
		canUseBackgroundImage: {
			type: Boolean,
			default: true
		},
		materialModes: { default: () => [
			"original",
			"normal",
			"wireframe"
		] },
		hasSkeleton: {
			type: Boolean,
			default: false
		},
		sourceFormat: { default: null }
	}, {
		"sceneConfig": {},
		"sceneConfigModifiers": {},
		"modelConfig": {},
		"modelConfigModifiers": {},
		"cameraConfig": {},
		"cameraConfigModifiers": {},
		"lightConfig": {},
		"lightConfigModifiers": {}
	}),
	emits: /*@__PURE__*/ mergeModels([
		"updateBackgroundImage",
		"exportModel",
		"updateHdriFile",
		"toggleGizmo",
		"setGizmoMode",
		"resetGizmoTransform"
	], [
		"update:sceneConfig",
		"update:modelConfig",
		"update:cameraConfig",
		"update:lightConfig"
	]),
	setup(__props, { emit: __emit }) {
		const sceneConfig = useModel(__props, "sceneConfig");
		const modelConfig = useModel(__props, "modelConfig");
		const cameraConfig = useModel(__props, "cameraConfig");
		const lightConfig = useModel(__props, "lightConfig");
		const useCustomUp = computed({
			get: () => cameraConfig.value?.hasCustomUp === true && cameraConfig.value.useCustomUp,
			set: (value) => {
				const config = cameraConfig.value;
				if (config?.hasCustomUp) cameraConfig.value = {
					...config,
					useCustomUp: value
				};
			}
		});
		const isMenuOpen = ref(false);
		const menuPanelRef = ref(null);
		const menuTriggerRef = ref(null);
		useDismissableOverlay({
			isOpen: isMenuOpen,
			getOverlayEl: () => menuPanelRef.value,
			getTriggerEl: () => menuTriggerRef.value?.$el ?? null,
			onDismiss: () => {
				isMenuOpen.value = false;
			}
		});
		const activeCategory = ref("scene");
		const categoryLabels = {
			scene: "load3d.scene",
			model: "load3d.model",
			camera: "load3d.camera",
			light: "load3d.light",
			gizmo: "load3d.gizmo.label",
			export: "load3d.export"
		};
		const availableCategories = computed(() => {
			const categories = [
				"scene",
				"model",
				"camera"
			];
			if (__props.canUseLighting) categories.push("light");
			if (__props.canUseGizmo) categories.push("gizmo");
			if (__props.canExport) categories.push("export");
			return categories;
		});
		watch(availableCategories, (categories) => {
			if (!categories.includes(activeCategory.value)) activeCategory.value = "scene";
		}, { immediate: true });
		const showSceneControls = computed(() => activeCategory.value === "scene" && !!sceneConfig.value);
		const showModelControls = computed(() => activeCategory.value === "model" && !!modelConfig.value);
		const showCameraControls = computed(() => activeCategory.value === "camera" && !!cameraConfig.value);
		const showLightControls = computed(() => __props.canUseLighting && activeCategory.value === "light" && !!lightConfig.value && !!modelConfig.value);
		const showExportControls = computed(() => __props.canExport && activeCategory.value === "export");
		const showGizmoControls = computed(() => __props.canUseGizmo && activeCategory.value === "gizmo" && !!modelConfig.value);
		const toggleMenu = () => {
			isMenuOpen.value = !isMenuOpen.value;
		};
		const selectCategory = (category) => {
			activeCategory.value = category;
			isMenuOpen.value = false;
		};
		const categoryIcons = {
			scene: "icon-[lucide--image]",
			model: "icon-[lucide--box]",
			camera: "icon-[lucide--camera]",
			light: "icon-[lucide--sun]",
			gizmo: "icon-[lucide--move-3d]",
			export: "icon-[lucide--download]"
		};
		const getCategoryIcon = (category) => {
			const icon = category in categoryIcons ? categoryIcons[category] : "icon-[lucide--circle]";
			return cn(icon, "text-lg text-base-foreground");
		};
		const emit = __emit;
		const handleBackgroundImageUpdate = (file) => {
			emit("updateBackgroundImage", file);
		};
		const handleExportModel = (format) => {
			emit("exportModel", format);
		};
		const handleHDRIFileUpdate = (file) => {
			emit("updateHdriFile", file);
		};
		const handleToggleGizmo = (enabled) => {
			emit("toggleGizmo", enabled);
		};
		const handleSetGizmoMode = (mode) => {
			emit("setGizmoMode", mode);
		};
		const handleResetGizmoTransform = () => {
			emit("resetGizmoTransform");
		};
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", {
				class: "pointer-events-auto absolute top-12 left-2 z-20 flex flex-col rounded-lg bg-backdrop/30",
				onPointerdown: _cache[16] || (_cache[16] = withModifiers(() => {}, ["stop"])),
				onPointermove: _cache[17] || (_cache[17] = withModifiers(() => {}, ["stop"])),
				onPointerup: _cache[18] || (_cache[18] = withModifiers(() => {}, ["stop"])),
				onWheel: _cache[19] || (_cache[19] = withModifiers(() => {}, ["stop"]))
			}, [createBaseVNode("div", _hoisted_1$1, [createVNode(Button_default, {
				ref_key: "menuTriggerRef",
				ref: menuTriggerRef,
				variant: "textonly",
				size: "icon",
				"aria-label": _ctx.$t("menu.showMenu"),
				class: "rounded-full",
				onClick: toggleMenu
			}, {
				default: withCtx(() => [..._cache[20] || (_cache[20] = [createBaseVNode("i", { class: "icon-[lucide--menu] text-lg text-base-foreground" }, null, -1)])]),
				_: 1
			}, 8, ["aria-label"]), withDirectives(createBaseVNode("div", {
				ref_key: "menuPanelRef",
				ref: menuPanelRef,
				class: "absolute top-0 left-12 rounded-lg bg-interface-menu-surface shadow-lg"
			}, [createBaseVNode("div", _hoisted_2, [(openBlock(true), createElementBlock(Fragment, null, renderList(availableCategories.value, (category) => {
				return openBlock(), createBlock(Button_default, {
					key: category,
					variant: "textonly",
					class: normalizeClass(unref(cn)("flex w-full items-center justify-start", activeCategory.value === category && "bg-button-active-surface")),
					onClick: ($event) => selectCategory(category)
				}, {
					default: withCtx(() => [createBaseVNode("i", { class: normalizeClass(getCategoryIcon(category)) }, null, 2), createBaseVNode("span", _hoisted_3, toDisplayString(_ctx.$t(categoryLabels[category])), 1)]),
					_: 2
				}, 1032, ["class", "onClick"]);
			}), 128))])], 512), [[vShow, isMenuOpen.value]])]), withDirectives(createBaseVNode("div", _hoisted_4, [
				showSceneControls.value ? (openBlock(), createBlock(SceneControls_default, {
					key: 0,
					"show-grid": sceneConfig.value.showGrid,
					"onUpdate:showGrid": _cache[0] || (_cache[0] = ($event) => sceneConfig.value.showGrid = $event),
					"background-color": sceneConfig.value.backgroundColor,
					"onUpdate:backgroundColor": _cache[1] || (_cache[1] = ($event) => sceneConfig.value.backgroundColor = $event),
					"background-image": sceneConfig.value.backgroundImage,
					"onUpdate:backgroundImage": _cache[2] || (_cache[2] = ($event) => sceneConfig.value.backgroundImage = $event),
					"background-render-mode": sceneConfig.value.backgroundRenderMode,
					"onUpdate:backgroundRenderMode": _cache[3] || (_cache[3] = ($event) => sceneConfig.value.backgroundRenderMode = $event),
					fov: cameraConfig.value.fov,
					"onUpdate:fov": _cache[4] || (_cache[4] = ($event) => cameraConfig.value.fov = $event),
					"show-background-image": __props.canUseBackgroundImage,
					"hdri-active": !!lightConfig.value?.hdri?.hdriPath && !!lightConfig.value?.hdri?.enabled,
					onUpdateBackgroundImage: handleBackgroundImageUpdate
				}, null, 8, [
					"show-grid",
					"background-color",
					"background-image",
					"background-render-mode",
					"fov",
					"show-background-image",
					"hdri-active"
				])) : createCommentVNode("", true),
				showModelControls.value ? (openBlock(), createBlock(ModelControls_default, {
					key: 1,
					"material-mode": modelConfig.value.materialMode,
					"onUpdate:materialMode": _cache[5] || (_cache[5] = ($event) => modelConfig.value.materialMode = $event),
					"up-direction": modelConfig.value.upDirection,
					"onUpdate:upDirection": _cache[6] || (_cache[6] = ($event) => modelConfig.value.upDirection = $event),
					"show-skeleton": modelConfig.value.showSkeleton,
					"onUpdate:showSkeleton": _cache[7] || (_cache[7] = ($event) => modelConfig.value.showSkeleton = $event),
					"material-modes": __props.materialModes,
					"has-skeleton": __props.hasSkeleton
				}, null, 8, [
					"material-mode",
					"up-direction",
					"show-skeleton",
					"material-modes",
					"has-skeleton"
				])) : createCommentVNode("", true),
				showCameraControls.value ? (openBlock(), createBlock(CameraControls_default, {
					key: 2,
					"camera-type": cameraConfig.value.cameraType,
					"onUpdate:cameraType": _cache[8] || (_cache[8] = ($event) => cameraConfig.value.cameraType = $event),
					fov: cameraConfig.value.fov,
					"onUpdate:fov": _cache[9] || (_cache[9] = ($event) => cameraConfig.value.fov = $event),
					"use-custom-up": useCustomUp.value,
					"onUpdate:useCustomUp": _cache[10] || (_cache[10] = ($event) => useCustomUp.value = $event),
					"has-custom-up": cameraConfig.value.hasCustomUp
				}, null, 8, [
					"camera-type",
					"fov",
					"use-custom-up",
					"has-custom-up"
				])) : createCommentVNode("", true),
				showLightControls.value ? (openBlock(), createElementBlock("div", _hoisted_5, [createVNode(LightControls_default, {
					"light-intensity": lightConfig.value.intensity,
					"onUpdate:lightIntensity": _cache[11] || (_cache[11] = ($event) => lightConfig.value.intensity = $event),
					"material-mode": modelConfig.value.materialMode,
					"onUpdate:materialMode": _cache[12] || (_cache[12] = ($event) => modelConfig.value.materialMode = $event),
					"hdri-config": lightConfig.value.hdri,
					"onUpdate:hdriConfig": _cache[13] || (_cache[13] = ($event) => lightConfig.value.hdri = $event)
				}, null, 8, [
					"light-intensity",
					"material-mode",
					"hdri-config"
				]), __props.canUseHdri ? (openBlock(), createBlock(HDRIControls_default, {
					key: 0,
					"hdri-config": lightConfig.value.hdri,
					"onUpdate:hdriConfig": _cache[14] || (_cache[14] = ($event) => lightConfig.value.hdri = $event),
					"has-background-image": !!sceneConfig.value?.backgroundImage,
					onUpdateHdriFile: handleHDRIFileUpdate
				}, null, 8, ["hdri-config", "has-background-image"])) : createCommentVNode("", true)])) : createCommentVNode("", true),
				showExportControls.value ? (openBlock(), createBlock(ExportControls_default, {
					key: 4,
					"source-format": __props.sourceFormat,
					onExportModel: handleExportModel
				}, null, 8, ["source-format"])) : createCommentVNode("", true),
				showGizmoControls.value ? (openBlock(), createBlock(GizmoControls_default, {
					key: 5,
					"gizmo-config": modelConfig.value.gizmo,
					"onUpdate:gizmoConfig": _cache[15] || (_cache[15] = ($event) => modelConfig.value.gizmo = $event),
					onToggleGizmo: handleToggleGizmo,
					onSetGizmoMode: handleSetGizmoMode,
					onResetGizmoTransform: handleResetGizmoTransform
				}, null, 8, ["gizmo-config"])) : createCommentVNode("", true)
			], 512), [[vShow, activeCategory.value]])], 32);
		};
	}
});
//#endregion
//#region src/renderer/extensions/linearMode/Preview3d.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1 = { class: "pointer-events-none absolute top-0 left-0 size-full" };
//#endregion
//#region src/renderer/extensions/linearMode/Preview3d.vue
var Preview3d_default = /* @__PURE__ */ defineComponent({
	__name: "Preview3d",
	props: { modelUrl: {} },
	setup(__props) {
		const containerRef = useTemplateRef("containerRef");
		const viewer = ref(useLoad3dViewer());
		watch([containerRef, () => __props.modelUrl], async () => {
			if (!containerRef.value || !__props.modelUrl) return;
			viewer.value.cleanup();
			await viewer.value.initializeStandaloneViewer(containerRef.value, __props.modelUrl);
		}, { flush: "post" });
		onUnmounted(() => {
			viewer.value.cleanup();
		});
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", {
				ref_key: "containerRef",
				ref: containerRef,
				class: "relative size-full self-center md:w-[calc(100%-150px)]",
				onMouseenter: _cache[10] || (_cache[10] = (...args) => viewer.value.handleMouseEnter && viewer.value.handleMouseEnter(...args)),
				onMouseleave: _cache[11] || (_cache[11] = (...args) => viewer.value.handleMouseLeave && viewer.value.handleMouseLeave(...args)),
				onResize: _cache[12] || (_cache[12] = (...args) => viewer.value.handleResize && viewer.value.handleResize(...args))
			}, [createBaseVNode("div", _hoisted_1, [createVNode(Load3DControls_default, {
				"scene-config": viewer.value,
				"onUpdate:sceneConfig": _cache[0] || (_cache[0] = ($event) => viewer.value = $event),
				"model-config": viewer.value,
				"onUpdate:modelConfig": _cache[1] || (_cache[1] = ($event) => viewer.value = $event),
				"camera-config": viewer.value,
				"onUpdate:cameraConfig": _cache[2] || (_cache[2] = ($event) => viewer.value = $event),
				"light-config": viewer.value,
				"onUpdate:lightConfig": _cache[3] || (_cache[3] = ($event) => viewer.value = $event),
				"can-use-gizmo": viewer.value.canUseGizmo,
				"can-use-lighting": viewer.value.canUseLighting,
				"can-export": viewer.value.canExport,
				"material-modes": viewer.value.materialModes,
				"has-skeleton": viewer.value.hasSkeleton,
				"source-format": viewer.value.sourceFormat,
				onUpdateBackgroundImage: viewer.value.handleBackgroundImageUpdate,
				onExportModel: viewer.value.exportModel
			}, null, 8, [
				"scene-config",
				"model-config",
				"camera-config",
				"light-config",
				"can-use-gizmo",
				"can-use-lighting",
				"can-export",
				"material-modes",
				"has-skeleton",
				"source-format",
				"onUpdateBackgroundImage",
				"onExportModel"
			]), viewer.value.animations && viewer.value.animations.length > 0 ? (openBlock(), createBlock(AnimationControls_default, {
				key: 0,
				animations: viewer.value.animations,
				"onUpdate:animations": _cache[4] || (_cache[4] = ($event) => viewer.value.animations = $event),
				playing: viewer.value.playing,
				"onUpdate:playing": _cache[5] || (_cache[5] = ($event) => viewer.value.playing = $event),
				"selected-speed": viewer.value.selectedSpeed,
				"onUpdate:selectedSpeed": _cache[6] || (_cache[6] = ($event) => viewer.value.selectedSpeed = $event),
				"selected-animation": viewer.value.selectedAnimation,
				"onUpdate:selectedAnimation": _cache[7] || (_cache[7] = ($event) => viewer.value.selectedAnimation = $event),
				"animation-progress": viewer.value.animationProgress,
				"onUpdate:animationProgress": _cache[8] || (_cache[8] = ($event) => viewer.value.animationProgress = $event),
				"animation-duration": viewer.value.animationDuration,
				"onUpdate:animationDuration": _cache[9] || (_cache[9] = ($event) => viewer.value.animationDuration = $event),
				onSeek: viewer.value.handleSeek
			}, null, 8, [
				"animations",
				"playing",
				"selected-speed",
				"selected-animation",
				"animation-progress",
				"animation-duration",
				"onSeek"
			])) : createCommentVNode("", true)])], 544);
		};
	}
});
//#endregion
export { Preview3d_default as default };
