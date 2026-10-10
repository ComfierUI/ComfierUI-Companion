import "./rolldown-runtime-xtsTai4I.js";
import { C as vModelText, Dt as withDirectives, E as withModifiers, Et as withCtx, F as createBaseVNode, G as defineComponent, H as createTextVNode, I as createBlock, Kt as unref, L as createCommentVNode, Lt as ref, O as Fragment, P as computed, Q as mergeModels, R as createElementBlock, St as watch, U as createVNode, Vt as toRaw, Wt as toValue, Zt as toDisplayString, b as vModelCheckbox, dt as renderList, lt as openBlock, ot as onMounted, rt as onBeforeUnmount, yt as useModel } from "./vendor-vue-core-C1utdb0s.js";
import { h as SUPPORTED_EXTENSIONS, i as useSettingStore, y as getExportFormatOptions } from "./layoutStore-CZsuzg91.js";
import { t as useToastStore } from "./toastStore-CTfykAzG.js";
import { r as useI18n } from "./vendor-i18n-BZvE7WBQ.js";
import { d as t } from "./i18n-C3J-ToPr.js";
import { t as useDialogStore } from "./dialogStore-B0GYyals.js";
import { t as Button_default } from "./Button-j0oCzR82.js";
import { a as Select_default, i as SelectContent_default, n as SelectTrigger_default, r as SelectItem_default, t as SelectValue_default } from "./SelectValue-BYMnIcxq.js";
import { t as _plugin_vue_export_helper_default } from "./_plugin-vue_export-helper-DEKQMRQ4.js";
import { t as AnimationControls_default } from "./AnimationControls-yykLVfiH.js";
import { t as Slider_default } from "./Slider-eQb4a5yt.js";
import { n as ToggleGroup_default, t as ToggleGroupItem_default } from "./ToggleGroupItem-Da4A26JJ.js";
import "./toggle-group-B0brfUuj.js";
import { t as useLoad3dService } from "./load3dService-B4-ohLYW.js";
import { t as useLoad3dViewer } from "./useLoad3dViewer-Cv7HNH2I.js";
//#region src/components/load3d/controls/viewer/ViewerCameraControls.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1$6 = { class: "space-y-4" };
var _hoisted_2$4 = { class: "flex flex-col gap-2" };
var _hoisted_3$3 = {
	key: 0,
	class: "flex flex-col gap-2"
};
//#endregion
//#region src/components/load3d/controls/viewer/ViewerCameraControls.vue
var ViewerCameraControls_default = /* @__PURE__ */ defineComponent({
	__name: "ViewerCameraControls",
	props: {
		"cameraType": {},
		"cameraTypeModifiers": {},
		"fov": {},
		"fovModifiers": {}
	},
	emits: ["update:cameraType", "update:fov"],
	setup(__props) {
		const { t } = useI18n();
		const cameras = [{
			title: t("load3d.cameraType.perspective"),
			value: "perspective"
		}, {
			title: t("load3d.cameraType.orthographic"),
			value: "orthographic"
		}];
		const cameraType = useModel(__props, "cameraType");
		const fov = useModel(__props, "fov");
		const showFOVButton = computed(() => cameraType.value === "perspective");
		const fovSliderValue = computed(() => [fov.value ?? 10]);
		function onFovUpdate(val) {
			if (val?.length) fov.value = val[0];
		}
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", _hoisted_1$6, [createBaseVNode("div", _hoisted_2$4, [createBaseVNode("label", null, toDisplayString(unref(t)("load3d.viewer.cameraType")), 1), createVNode(Select_default, {
				modelValue: cameraType.value,
				"onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => cameraType.value = $event)
			}, {
				default: withCtx(() => [createVNode(SelectTrigger_default, { size: "md" }, {
					default: withCtx(() => [createVNode(SelectValue_default)]),
					_: 1
				}), createVNode(SelectContent_default, null, {
					default: withCtx(() => [(openBlock(), createElementBlock(Fragment, null, renderList(cameras, (cam) => {
						return createVNode(SelectItem_default, {
							key: cam.value,
							value: cam.value
						}, {
							default: withCtx(() => [createTextVNode(toDisplayString(cam.title), 1)]),
							_: 2
						}, 1032, ["value"]);
					}), 64))]),
					_: 1
				})]),
				_: 1
			}, 8, ["modelValue"])]), showFOVButton.value ? (openBlock(), createElementBlock("div", _hoisted_3$3, [createBaseVNode("label", null, toDisplayString(unref(t)("load3d.fov")), 1), createVNode(Slider_default, {
				"model-value": fovSliderValue.value,
				min: 10,
				max: 150,
				step: 1,
				"aria-label": unref(t)("load3d.fov"),
				"onUpdate:modelValue": onFovUpdate
			}, null, 8, ["model-value", "aria-label"])])) : createCommentVNode("", true)]);
		};
	}
});
//#endregion
//#region src/components/load3d/controls/viewer/ViewerExportControls.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1$5 = { class: "space-y-4" };
//#endregion
//#region src/components/load3d/controls/viewer/ViewerExportControls.vue
var ViewerExportControls_default = /* @__PURE__ */ defineComponent({
	__name: "ViewerExportControls",
	props: { sourceFormat: { default: null } },
	emits: ["exportModel"],
	setup(__props, { emit: __emit }) {
		const emit = __emit;
		const exportFormats = computed(() => getExportFormatOptions(__props.sourceFormat));
		const exportFormat = ref("obj");
		watch(exportFormats, (formats) => {
			if (!formats.some((fmt) => fmt.value === exportFormat.value)) exportFormat.value = formats[0]?.value ?? "";
		}, { immediate: true });
		const exportModel = (format) => {
			emit("exportModel", format);
		};
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", _hoisted_1$5, [createVNode(Select_default, {
				modelValue: exportFormat.value,
				"onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => exportFormat.value = $event)
			}, {
				default: withCtx(() => [createVNode(SelectTrigger_default, { size: "md" }, {
					default: withCtx(() => [createVNode(SelectValue_default)]),
					_: 1
				}), createVNode(SelectContent_default, null, {
					default: withCtx(() => [(openBlock(true), createElementBlock(Fragment, null, renderList(exportFormats.value, (fmt) => {
						return openBlock(), createBlock(SelectItem_default, {
							key: fmt.value,
							value: fmt.value
						}, {
							default: withCtx(() => [createTextVNode(toDisplayString(fmt.label), 1)]),
							_: 2
						}, 1032, ["value"]);
					}), 128))]),
					_: 1
				})]),
				_: 1
			}, 8, ["modelValue"]), createVNode(Button_default, {
				variant: "muted-textonly",
				class: "rounded-full",
				onClick: _cache[1] || (_cache[1] = ($event) => exportModel(exportFormat.value))
			}, {
				default: withCtx(() => [createTextVNode(toDisplayString(_ctx.$t("load3d.export")), 1)]),
				_: 1
			})]);
		};
	}
});
//#endregion
//#region src/components/load3d/controls/viewer/ViewerGizmoControls.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1$4 = { class: "space-y-4" };
var _hoisted_2$3 = { class: "flex items-center justify-between" };
//#endregion
//#region src/components/load3d/controls/viewer/ViewerGizmoControls.vue
var ViewerGizmoControls_default = /* @__PURE__ */ defineComponent({
	__name: "ViewerGizmoControls",
	props: {
		"gizmoEnabled": { type: Boolean },
		"gizmoEnabledModifiers": {},
		"gizmoMode": {},
		"gizmoModeModifiers": {}
	},
	emits: /*@__PURE__*/ mergeModels(["reset-transform"], ["update:gizmoEnabled", "update:gizmoMode"]),
	setup(__props) {
		const gizmoEnabled = useModel(__props, "gizmoEnabled");
		const gizmoMode = useModel(__props, "gizmoMode");
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", _hoisted_1$4, [createBaseVNode("div", _hoisted_2$3, [createBaseVNode("label", null, toDisplayString(_ctx.$t("load3d.gizmo.toggle")), 1), createVNode(unref(ToggleGroup_default), {
				type: "single",
				"model-value": gizmoEnabled.value ? "on" : "off",
				"onUpdate:modelValue": _cache[0] || (_cache[0] = (v) => gizmoEnabled.value = v === "on")
			}, {
				default: withCtx(() => [createVNode(unref(ToggleGroupItem_default), {
					value: "off",
					size: "sm",
					class: "flex-1"
				}, {
					default: withCtx(() => [createTextVNode(toDisplayString(_ctx.$t("g.off")), 1)]),
					_: 1
				}), createVNode(unref(ToggleGroupItem_default), {
					value: "on",
					size: "sm",
					class: "flex-1"
				}, {
					default: withCtx(() => [createTextVNode(toDisplayString(_ctx.$t("g.on")), 1)]),
					_: 1
				})]),
				_: 1
			}, 8, ["model-value"])]), gizmoEnabled.value ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [createBaseVNode("div", null, [createVNode(unref(ToggleGroup_default), {
				type: "single",
				"model-value": gizmoMode.value,
				"onUpdate:modelValue": _cache[1] || (_cache[1] = (v) => {
					if (v) gizmoMode.value = v;
				})
			}, {
				default: withCtx(() => [
					createVNode(unref(ToggleGroupItem_default), {
						value: "translate",
						class: "flex-1"
					}, {
						default: withCtx(() => [createTextVNode(toDisplayString(_ctx.$t("load3d.gizmo.translate")), 1)]),
						_: 1
					}),
					createVNode(unref(ToggleGroupItem_default), {
						value: "rotate",
						class: "flex-1"
					}, {
						default: withCtx(() => [createTextVNode(toDisplayString(_ctx.$t("load3d.gizmo.rotate")), 1)]),
						_: 1
					}),
					createVNode(unref(ToggleGroupItem_default), {
						value: "scale",
						class: "flex-1"
					}, {
						default: withCtx(() => [createTextVNode(toDisplayString(_ctx.$t("load3d.gizmo.scale")), 1)]),
						_: 1
					})
				]),
				_: 1
			}, 8, ["model-value"])]), createBaseVNode("div", null, [createVNode(Button_default, {
				variant: "secondary",
				onClick: _cache[2] || (_cache[2] = ($event) => _ctx.$emit("reset-transform"))
			}, {
				default: withCtx(() => [_cache[3] || (_cache[3] = createBaseVNode("i", { class: "pi pi-refresh" }, null, -1)), createTextVNode(" " + toDisplayString(_ctx.$t("load3d.gizmo.reset")), 1)]),
				_: 1
			})])], 64)) : createCommentVNode("", true)]);
		};
	}
});
//#endregion
//#region src/components/load3d/controls/viewer/ViewerLightControls.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1$3 = { class: "flex flex-col gap-2" };
//#endregion
//#region src/components/load3d/controls/viewer/ViewerLightControls.vue
var ViewerLightControls_default = /* @__PURE__ */ defineComponent({
	__name: "ViewerLightControls",
	props: {
		"lightIntensity": {},
		"lightIntensityModifiers": {}
	},
	emits: ["update:lightIntensity"],
	setup(__props) {
		const lightIntensity = useModel(__props, "lightIntensity");
		const lightIntensityMaximum = useSettingStore().get("Comfy.Load3D.LightIntensityMaximum");
		const lightIntensityMinimum = useSettingStore().get("Comfy.Load3D.LightIntensityMinimum");
		const lightAdjustmentIncrement = useSettingStore().get("Comfy.Load3D.LightAdjustmentIncrement");
		const sliderValue = computed(() => [lightIntensity.value ?? lightIntensityMinimum]);
		function onSliderUpdate(val) {
			if (val?.length) lightIntensity.value = val[0];
		}
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", _hoisted_1$3, [createBaseVNode("label", null, toDisplayString(_ctx.$t("load3d.lightIntensity")), 1), createVNode(Slider_default, {
				"model-value": sliderValue.value,
				class: "w-full",
				min: unref(lightIntensityMinimum),
				max: unref(lightIntensityMaximum),
				step: unref(lightAdjustmentIncrement),
				"onUpdate:modelValue": onSliderUpdate
			}, null, 8, [
				"model-value",
				"min",
				"max",
				"step"
			])]);
		};
	}
});
//#endregion
//#region src/components/load3d/controls/viewer/ViewerModelControls.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1$2 = { class: "space-y-4" };
var _hoisted_2$2 = { class: "flex flex-col gap-2" };
var _hoisted_3$2 = {
	key: 0,
	class: "flex flex-col gap-2"
};
//#endregion
//#region src/components/load3d/controls/viewer/ViewerModelControls.vue
var ViewerModelControls_default = /* @__PURE__ */ defineComponent({
	__name: "ViewerModelControls",
	props: /*@__PURE__*/ mergeModels({ materialModes: { default: () => [
		"original",
		"normal",
		"wireframe"
	] } }, {
		"upDirection": {},
		"upDirectionModifiers": {},
		"materialMode": {},
		"materialModeModifiers": {}
	}),
	emits: ["update:upDirection", "update:materialMode"],
	setup(__props) {
		const { t } = useI18n();
		const upDirection = useModel(__props, "upDirection");
		const materialMode = useModel(__props, "materialMode");
		const upDirectionOptions = [
			{
				label: t("load3d.upDirections.original"),
				value: "original"
			},
			{
				label: "-X",
				value: "-x"
			},
			{
				label: "+X",
				value: "+x"
			},
			{
				label: "-Y",
				value: "-y"
			},
			{
				label: "+Y",
				value: "+y"
			},
			{
				label: "-Z",
				value: "-z"
			},
			{
				label: "+Z",
				value: "+z"
			}
		];
		const materialModeOptions = computed(() => __props.materialModes.map((mode) => ({
			label: t(`load3d.materialModes.${mode}`),
			value: mode
		})));
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", _hoisted_1$2, [createBaseVNode("div", _hoisted_2$2, [createBaseVNode("label", null, toDisplayString(_ctx.$t("load3d.upDirection")), 1), createVNode(Select_default, {
				modelValue: upDirection.value,
				"onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => upDirection.value = $event)
			}, {
				default: withCtx(() => [createVNode(SelectTrigger_default, { size: "md" }, {
					default: withCtx(() => [createVNode(SelectValue_default)]),
					_: 1
				}), createVNode(SelectContent_default, null, {
					default: withCtx(() => [(openBlock(), createElementBlock(Fragment, null, renderList(upDirectionOptions, (opt) => {
						return createVNode(SelectItem_default, {
							key: opt.value,
							value: opt.value
						}, {
							default: withCtx(() => [createTextVNode(toDisplayString(opt.label), 1)]),
							_: 2
						}, 1032, ["value"]);
					}), 64))]),
					_: 1
				})]),
				_: 1
			}, 8, ["modelValue"])]), __props.materialModes.length > 0 ? (openBlock(), createElementBlock("div", _hoisted_3$2, [createBaseVNode("label", null, toDisplayString(_ctx.$t("load3d.materialMode")), 1), createVNode(Select_default, {
				modelValue: materialMode.value,
				"onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => materialMode.value = $event)
			}, {
				default: withCtx(() => [createVNode(SelectTrigger_default, { size: "md" }, {
					default: withCtx(() => [createVNode(SelectValue_default)]),
					_: 1
				}), createVNode(SelectContent_default, null, {
					default: withCtx(() => [(openBlock(true), createElementBlock(Fragment, null, renderList(materialModeOptions.value, (opt) => {
						return openBlock(), createBlock(SelectItem_default, {
							key: opt.value,
							value: opt.value
						}, {
							default: withCtx(() => [createTextVNode(toDisplayString(opt.label), 1)]),
							_: 2
						}, 1032, ["value"]);
					}), 128))]),
					_: 1
				})]),
				_: 1
			}, 8, ["modelValue"])])) : createCommentVNode("", true)]);
		};
	}
});
//#endregion
//#region src/components/load3d/controls/viewer/ViewerSceneControls.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1$1 = { class: "space-y-4" };
var _hoisted_2$1 = {
	key: 0,
	class: "flex flex-col gap-2"
};
var _hoisted_3$1 = { class: "flex items-center gap-2" };
var _hoisted_4$1 = {
	for: "showGrid",
	class: "cursor-pointer"
};
var _hoisted_5$1 = { key: 1 };
var _hoisted_6$1 = {
	key: 2,
	class: "space-y-2"
};
var _hoisted_7$1 = { class: "flex gap-2" };
//#endregion
//#region src/components/load3d/controls/viewer/ViewerSceneControls.vue
var ViewerSceneControls_default = /* @__PURE__ */ defineComponent({
	__name: "ViewerSceneControls",
	props: /*@__PURE__*/ mergeModels({
		hasBackgroundImage: { type: Boolean },
		disableBackgroundUpload: { type: Boolean }
	}, {
		"backgroundColor": {},
		"backgroundColorModifiers": {},
		"showGrid": { type: Boolean },
		"showGridModifiers": {},
		"backgroundRenderMode": {},
		"backgroundRenderModeModifiers": {}
	}),
	emits: /*@__PURE__*/ mergeModels(["updateBackgroundImage"], [
		"update:backgroundColor",
		"update:showGrid",
		"update:backgroundRenderMode"
	]),
	setup(__props, { emit: __emit }) {
		const backgroundColor = useModel(__props, "backgroundColor");
		const showGrid = useModel(__props, "showGrid");
		const backgroundRenderMode = useModel(__props, "backgroundRenderMode");
		const emit = __emit;
		const imagePickerRef = ref(null);
		const openImagePicker = () => {
			imagePickerRef.value?.click();
		};
		const handleImageUpload = (event) => {
			const input = event.target;
			if (input.files && input.files[0]) emit("updateBackgroundImage", input.files[0]);
			input.value = "";
		};
		const removeBackgroundImage = () => {
			emit("updateBackgroundImage", null);
		};
		const setBackgroundRenderMode = (mode) => {
			backgroundRenderMode.value = mode;
		};
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", _hoisted_1$1, [
				!__props.hasBackgroundImage ? (openBlock(), createElementBlock("div", _hoisted_2$1, [createBaseVNode("label", null, toDisplayString(_ctx.$t("load3d.backgroundColor")), 1), withDirectives(createBaseVNode("input", {
					"onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => backgroundColor.value = $event),
					type: "color",
					class: "h-8 w-full"
				}, null, 512), [[vModelText, backgroundColor.value]])])) : createCommentVNode("", true),
				createBaseVNode("div", _hoisted_3$1, [withDirectives(createBaseVNode("input", {
					id: "showGrid",
					"onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => showGrid.value = $event),
					type: "checkbox",
					name: "showGrid",
					class: "size-4 cursor-pointer accent-node-component-surface-highlight"
				}, null, 512), [[vModelCheckbox, showGrid.value]]), createBaseVNode("label", _hoisted_4$1, toDisplayString(_ctx.$t("load3d.showGrid")), 1)]),
				!__props.hasBackgroundImage && !__props.disableBackgroundUpload ? (openBlock(), createElementBlock("div", _hoisted_5$1, [createVNode(Button_default, {
					variant: "secondary",
					class: "w-full",
					onClick: openImagePicker
				}, {
					default: withCtx(() => [_cache[4] || (_cache[4] = createBaseVNode("i", { class: "pi pi-image" }, null, -1)), createTextVNode(" " + toDisplayString(_ctx.$t("load3d.uploadBackgroundImage")), 1)]),
					_: 1
				}), createBaseVNode("input", {
					ref_key: "imagePickerRef",
					ref: imagePickerRef,
					type: "file",
					accept: "image/*",
					class: "hidden",
					onChange: handleImageUpload
				}, null, 544)])) : createCommentVNode("", true),
				__props.hasBackgroundImage ? (openBlock(), createElementBlock("div", _hoisted_6$1, [createBaseVNode("div", _hoisted_7$1, [createVNode(Button_default, {
					variant: backgroundRenderMode.value === "tiled" ? "primary" : "secondary",
					class: "flex-1",
					onClick: _cache[2] || (_cache[2] = ($event) => setBackgroundRenderMode("tiled"))
				}, {
					default: withCtx(() => [_cache[5] || (_cache[5] = createBaseVNode("i", { class: "pi pi-th-large" }, null, -1)), createTextVNode(" " + toDisplayString(_ctx.$t("load3d.tiledMode")), 1)]),
					_: 1
				}, 8, ["variant"]), createVNode(Button_default, {
					variant: backgroundRenderMode.value === "panorama" ? "primary" : "secondary",
					class: "flex-1",
					onClick: _cache[3] || (_cache[3] = ($event) => setBackgroundRenderMode("panorama"))
				}, {
					default: withCtx(() => [_cache[6] || (_cache[6] = createBaseVNode("i", { class: "pi pi-globe" }, null, -1)), createTextVNode(" " + toDisplayString(_ctx.$t("load3d.panoramaMode")), 1)]),
					_: 1
				}, 8, ["variant"])]), createVNode(Button_default, {
					variant: "secondary",
					class: "w-full",
					onClick: removeBackgroundImage
				}, {
					default: withCtx(() => [_cache[7] || (_cache[7] = createBaseVNode("i", { class: "pi pi-times" }, null, -1)), createTextVNode(" " + toDisplayString(_ctx.$t("load3d.removeBackgroundImage")), 1)]),
					_: 1
				})])) : createCommentVNode("", true)
			]);
		};
	}
});
//#endregion
//#region src/composables/useLoad3dDrag.ts
function useLoad3dDrag(options) {
	const isDragging = ref(false);
	const dragMessage = ref("");
	const isDisabled = computed(() => toValue(options.disabled) ?? false);
	function isValidModelFile(file) {
		const fileName = file.name.toLowerCase();
		const extension = fileName.substring(fileName.lastIndexOf("."));
		return SUPPORTED_EXTENSIONS.has(extension);
	}
	function handleDragOver(event) {
		if (isDisabled.value) return;
		if (!event.dataTransfer) return;
		if (!event.dataTransfer.types.includes("Files")) return;
		isDragging.value = true;
		event.dataTransfer.dropEffect = "copy";
		dragMessage.value = t("load3d.dropToLoad");
	}
	function handleDragLeave() {
		isDragging.value = false;
	}
	async function handleDrop(event) {
		isDragging.value = false;
		if (isDisabled.value) return;
		if (!event.dataTransfer) return;
		const files = Array.from(event.dataTransfer.files);
		if (files.length === 0) return;
		const modelFile = files.find(isValidModelFile);
		if (modelFile) await options.onModelDrop(modelFile);
		else useToastStore().addAlert(t("load3d.unsupportedFileType"));
	}
	return {
		isDragging,
		dragMessage,
		handleDragOver,
		handleDragLeave,
		handleDrop
	};
}
//#endregion
//#region src/components/load3d/Load3dViewerContent.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1 = { class: "relative flex-1" };
var _hoisted_2 = {
	key: 1,
	class: "pointer-events-none absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
};
var _hoisted_3 = { class: "rounded-lg border-2 border-dashed border-blue-400 bg-blue-500/20 px-6 py-4 text-lg font-medium text-blue-100" };
var _hoisted_4 = {
	class: "flex w-72 flex-col",
	"data-testid": "load3d-viewer-sidebar"
};
var _hoisted_5 = { class: "flex-1 overflow-y-auto p-4" };
var _hoisted_6 = { class: "space-y-2" };
var _hoisted_7 = { class: "space-y-4 p-2" };
var _hoisted_8 = { class: "space-y-4 p-2" };
var _hoisted_9 = { class: "space-y-4 p-2" };
var _hoisted_10 = {
	key: 0,
	class: "space-y-4 p-2"
};
var _hoisted_11 = {
	key: 1,
	class: "space-y-4 p-2"
};
var _hoisted_12 = {
	key: 2,
	class: "space-y-4 p-2"
};
var _hoisted_13 = { class: "p-4" };
var _hoisted_14 = { class: "flex gap-2" };
//#endregion
//#region src/components/load3d/Load3dViewerContent.vue
var Load3dViewerContent_default = /*#__PURE__*/ _plugin_vue_export_helper_default(/* @__PURE__ */ defineComponent({
	__name: "Load3dViewerContent",
	props: {
		node: {},
		modelUrl: {}
	},
	setup(__props) {
		const { t } = useI18n();
		const props = __props;
		const viewerContentRef = ref();
		const containerRef = ref();
		const mutationObserver = ref(null);
		const isStandaloneMode = !props.node && props.modelUrl;
		const viewer = props.node ? useLoad3dService().getOrCreateViewerSync(toRaw(props.node), useLoad3dViewer) : useLoad3dViewer();
		const { isDragging, dragMessage, handleDragOver, handleDragLeave, handleDrop } = useLoad3dDrag({
			onModelDrop: async (file) => {
				await viewer.handleModelDrop(file);
			},
			disabled: viewer.isPreview.value || !!isStandaloneMode
		});
		onMounted(async () => {
			if (!containerRef.value) return;
			if (isStandaloneMode && props.modelUrl) await viewer.initializeStandaloneViewer(containerRef.value, props.modelUrl);
			else if (props.node) {
				const source = await useLoad3dService().getLoad3dAsync(props.node);
				if (source) await viewer.initializeViewer(containerRef.value, source);
			}
			if (viewerContentRef.value) {
				mutationObserver.value = new MutationObserver((mutations) => {
					mutations.forEach((mutation) => {
						if (mutation.type === "attributes" && mutation.attributeName === "maximized") setTimeout(() => {
							viewer.refreshViewport();
						}, 0);
					});
				});
				mutationObserver.value.observe(viewerContentRef.value, {
					attributes: true,
					attributeFilter: ["maximized"]
				});
			}
			window.addEventListener("resize", viewer.handleResize);
		});
		const handleCancel = () => {
			if (!isStandaloneMode) viewer.restoreInitialState();
			useDialogStore().closeDialog();
		};
		onBeforeUnmount(() => {
			window.removeEventListener("resize", viewer.handleResize);
			if (mutationObserver.value) {
				mutationObserver.value.disconnect();
				mutationObserver.value = null;
			}
		});
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", {
				ref_key: "viewerContentRef",
				ref: viewerContentRef,
				class: "flex size-full",
				onMouseenter: _cache[21] || (_cache[21] = (...args) => unref(viewer).handleMouseEnter && unref(viewer).handleMouseEnter(...args)),
				onMouseleave: _cache[22] || (_cache[22] = (...args) => unref(viewer).handleMouseLeave && unref(viewer).handleMouseLeave(...args))
			}, [createBaseVNode("div", _hoisted_1, [
				createBaseVNode("div", {
					ref_key: "containerRef",
					ref: containerRef,
					class: "absolute size-full",
					onResize: _cache[0] || (_cache[0] = (...args) => unref(viewer).handleResize && unref(viewer).handleResize(...args)),
					onDragover: _cache[1] || (_cache[1] = withModifiers((...args) => unref(handleDragOver) && unref(handleDragOver)(...args), ["prevent", "stop"])),
					onDragleave: _cache[2] || (_cache[2] = withModifiers((...args) => unref(handleDragLeave) && unref(handleDragLeave)(...args), ["stop"])),
					onDrop: _cache[3] || (_cache[3] = withModifiers((...args) => unref(handleDrop) && unref(handleDrop)(...args), ["prevent", "stop"]))
				}, null, 544),
				unref(viewer).animations.value && unref(viewer).animations.value.length > 0 ? (openBlock(), createBlock(AnimationControls_default, {
					key: 0,
					animations: unref(viewer).animations.value,
					"onUpdate:animations": _cache[4] || (_cache[4] = ($event) => unref(viewer).animations.value = $event),
					playing: unref(viewer).playing.value,
					"onUpdate:playing": _cache[5] || (_cache[5] = ($event) => unref(viewer).playing.value = $event),
					"selected-speed": unref(viewer).selectedSpeed.value,
					"onUpdate:selectedSpeed": _cache[6] || (_cache[6] = ($event) => unref(viewer).selectedSpeed.value = $event),
					"selected-animation": unref(viewer).selectedAnimation.value,
					"onUpdate:selectedAnimation": _cache[7] || (_cache[7] = ($event) => unref(viewer).selectedAnimation.value = $event),
					"animation-progress": unref(viewer).animationProgress.value,
					"onUpdate:animationProgress": _cache[8] || (_cache[8] = ($event) => unref(viewer).animationProgress.value = $event),
					"animation-duration": unref(viewer).animationDuration.value,
					"onUpdate:animationDuration": _cache[9] || (_cache[9] = ($event) => unref(viewer).animationDuration.value = $event),
					onSeek: unref(viewer).handleSeek
				}, null, 8, [
					"animations",
					"playing",
					"selected-speed",
					"selected-animation",
					"animation-progress",
					"animation-duration",
					"onSeek"
				])) : createCommentVNode("", true),
				unref(isDragging) ? (openBlock(), createElementBlock("div", _hoisted_2, [createBaseVNode("div", _hoisted_3, toDisplayString(unref(dragMessage)), 1)])) : createCommentVNode("", true)
			]), createBaseVNode("div", _hoisted_4, [createBaseVNode("div", _hoisted_5, [createBaseVNode("div", _hoisted_6, [
				createBaseVNode("div", _hoisted_7, [createVNode(ViewerSceneControls_default, {
					"background-color": unref(viewer).backgroundColor.value,
					"onUpdate:backgroundColor": _cache[10] || (_cache[10] = ($event) => unref(viewer).backgroundColor.value = $event),
					"show-grid": unref(viewer).showGrid.value,
					"onUpdate:showGrid": _cache[11] || (_cache[11] = ($event) => unref(viewer).showGrid.value = $event),
					"background-render-mode": unref(viewer).backgroundRenderMode.value,
					"onUpdate:backgroundRenderMode": _cache[12] || (_cache[12] = ($event) => unref(viewer).backgroundRenderMode.value = $event),
					fov: unref(viewer).fov.value,
					"onUpdate:fov": _cache[13] || (_cache[13] = ($event) => unref(viewer).fov.value = $event),
					"has-background-image": unref(viewer).hasBackgroundImage.value,
					"disable-background-upload": unref(viewer).isStandaloneMode.value,
					onUpdateBackgroundImage: unref(viewer).handleBackgroundImageUpdate
				}, null, 8, [
					"background-color",
					"show-grid",
					"background-render-mode",
					"fov",
					"has-background-image",
					"disable-background-upload",
					"onUpdateBackgroundImage"
				])]),
				createBaseVNode("div", _hoisted_8, [createVNode(ViewerModelControls_default, {
					"up-direction": unref(viewer).upDirection.value,
					"onUpdate:upDirection": _cache[14] || (_cache[14] = ($event) => unref(viewer).upDirection.value = $event),
					"material-mode": unref(viewer).materialMode.value,
					"onUpdate:materialMode": _cache[15] || (_cache[15] = ($event) => unref(viewer).materialMode.value = $event),
					"material-modes": unref(viewer).materialModes.value
				}, null, 8, [
					"up-direction",
					"material-mode",
					"material-modes"
				])]),
				createBaseVNode("div", _hoisted_9, [createVNode(ViewerCameraControls_default, {
					"camera-type": unref(viewer).cameraType.value,
					"onUpdate:cameraType": _cache[16] || (_cache[16] = ($event) => unref(viewer).cameraType.value = $event),
					fov: unref(viewer).fov.value,
					"onUpdate:fov": _cache[17] || (_cache[17] = ($event) => unref(viewer).fov.value = $event)
				}, null, 8, ["camera-type", "fov"])]),
				unref(viewer).canUseLighting.value ? (openBlock(), createElementBlock("div", _hoisted_10, [createVNode(ViewerLightControls_default, {
					"light-intensity": unref(viewer).lightIntensity.value,
					"onUpdate:lightIntensity": _cache[18] || (_cache[18] = ($event) => unref(viewer).lightIntensity.value = $event)
				}, null, 8, ["light-intensity"])])) : createCommentVNode("", true),
				unref(viewer).canUseGizmo.value ? (openBlock(), createElementBlock("div", _hoisted_11, [createVNode(ViewerGizmoControls_default, {
					"gizmo-enabled": unref(viewer).gizmoEnabled.value,
					"onUpdate:gizmoEnabled": _cache[19] || (_cache[19] = ($event) => unref(viewer).gizmoEnabled.value = $event),
					"gizmo-mode": unref(viewer).gizmoMode.value,
					"onUpdate:gizmoMode": _cache[20] || (_cache[20] = ($event) => unref(viewer).gizmoMode.value = $event),
					onResetTransform: unref(viewer).resetGizmoTransform
				}, null, 8, [
					"gizmo-enabled",
					"gizmo-mode",
					"onResetTransform"
				])])) : createCommentVNode("", true),
				unref(viewer).canExport.value ? (openBlock(), createElementBlock("div", _hoisted_12, [createVNode(ViewerExportControls_default, {
					"source-format": unref(viewer).sourceFormat.value,
					onExportModel: unref(viewer).exportModel
				}, null, 8, ["source-format", "onExportModel"])])) : createCommentVNode("", true)
			])]), createBaseVNode("div", _hoisted_13, [createBaseVNode("div", _hoisted_14, [createVNode(Button_default, {
				variant: "secondary",
				onClick: handleCancel
			}, {
				default: withCtx(() => [_cache[23] || (_cache[23] = createBaseVNode("i", { class: "pi pi-times" }, null, -1)), createTextVNode(" " + toDisplayString(unref(t)("g.cancel")), 1)]),
				_: 1
			})])])])], 544);
		};
	}
}), [["__scopeId", "data-v-2f500b56"]]);
//#endregion
export { useLoad3dDrag as n, Load3dViewerContent_default as t };
