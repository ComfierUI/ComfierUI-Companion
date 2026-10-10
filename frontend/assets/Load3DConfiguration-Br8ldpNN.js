import "./rolldown-runtime-xtsTai4I.js";
import { At as effectScope, St as watch } from "./vendor-vue-core-C1utdb0s.js";
import { cs as LiteGraph, f as Load3dUtils, i as useSettingStore, xo as parseAnnotatedPath } from "./layoutStore-CZsuzg91.js";
import { i as api } from "./api-Bt-fGt5a.js";
import { t as useToastStore } from "./toastStore-CTfykAzG.js";
import { d as t } from "./i18n-C3J-ToPr.js";
//#region src/extensions/core/load3d/exportMenuHelper.ts
var EXPORT_FORMATS = [
	{
		label: "GLB",
		value: "glb"
	},
	{
		label: "OBJ",
		value: "obj"
	},
	{
		label: "STL",
		value: "stl"
	},
	{
		label: "FBX",
		value: "fbx"
	}
];
/**
* Creates export menu items for a 3D node using the new extension API.
* Returns an array of context menu items including a separator and export submenu.
*/
function createExportMenuItems(load3d) {
	return [null, {
		content: "Save",
		has_submenu: true,
		callback: (_value, _options, event, prev_menu) => {
			const submenuOptions = EXPORT_FORMATS.map((format) => ({
				content: format.label,
				callback: () => {
					(async () => {
						try {
							await load3d.exportModel(format.value);
							useToastStore().add({
								severity: "success",
								summary: t("toastMessages.exportSuccess", { format: format.label })
							});
						} catch (error) {
							console.error("Export failed:", error);
							useToastStore().addAlert(t("toastMessages.failedToExportModel", { format: format.label }));
						}
					})();
				}
			}));
			new LiteGraph.ContextMenu(submenuOptions, {
				event,
				parentMenu: prev_menu
			});
		}
	}];
}
window.comfyAPI = window.comfyAPI || {};
window.comfyAPI.exportMenuHelper = window.comfyAPI.exportMenuHelper || {};
window.comfyAPI.exportMenuHelper.createExportMenuItems = createExportMenuItems;
//#endregion
//#region src/extensions/core/load3d/Load3DConfiguration.ts
var DEFAULT_GIZMO = {
	enabled: false,
	mode: "translate",
	position: {
		x: 0,
		y: 0,
		z: 0
	},
	rotation: {
		x: 0,
		y: 0,
		z: 0
	},
	scale: {
		x: 1,
		y: 1,
		z: 1
	}
};
var Load3DConfiguration = class {
	load3d;
	properties;
	constructor(load3d, properties) {
		this.load3d = load3d;
		this.properties = properties;
	}
	configureForSaveMesh(loadFolder, filePath, options) {
		this.setupModelHandlingForSaveMesh(filePath, loadFolder, options?.silentOnNotFound ?? false);
		this.setupDefaultProperties();
	}
	configure(setting) {
		const onModelWidgetUpdate = this.setupModelHandling(setting.modelWidget, setting.loadFolder, setting.cameraState, setting.silentOnNotFound ?? false);
		this.setupTargetSize(setting.width, setting.height);
		this.setupReactiveHandling(setting, onModelWidgetUpdate);
		this.setupDefaultProperties(setting.bgImagePath);
	}
	setupReactiveHandling(setting, onModelWidgetUpdate) {
		const scope = effectScope();
		scope.run(() => {
			watch(() => setting.modelWidget.value, (value) => {
				onModelWidgetUpdate(value);
				setting.onSceneInvalidated?.();
			}, { flush: "sync" });
			const { width, height } = setting;
			if (width && height) watch([() => width.value, () => height.value], ([nextWidth, nextHeight]) => {
				this.load3d.setTargetSize(nextWidth, nextHeight);
				setting.onSceneInvalidated?.();
			}, { flush: "sync" });
		});
		this.load3d.setConfigurationCleanup(() => scope.stop());
	}
	setupTargetSize(width, height) {
		if (width && height) this.load3d.setTargetSize(width.value, height.value);
	}
	setupModelHandlingForSaveMesh(filePath, loadFolder, silentOnNotFound) {
		const onModelWidgetUpdate = this.createModelUpdateHandler(loadFolder, void 0, silentOnNotFound);
		if (filePath) onModelWidgetUpdate(filePath);
	}
	setupModelHandling(modelWidget, loadFolder, cameraState, silentOnNotFound = false) {
		const onModelWidgetUpdate = this.createModelUpdateHandler(loadFolder, cameraState, silentOnNotFound);
		if (modelWidget.value && modelWidget.value !== "none") onModelWidgetUpdate(modelWidget.value);
		return onModelWidgetUpdate;
	}
	setupDefaultProperties(bgImagePath) {
		const sceneConfig = this.loadSceneConfig();
		this.applySceneConfig(sceneConfig, bgImagePath);
		const cameraConfig = this.loadCameraConfig();
		this.applyCameraConfig(cameraConfig);
		const lightConfig = this.loadLightConfig();
		this.applyLightConfig(lightConfig);
		if (lightConfig.hdri) this.applyHDRISettings(lightConfig.hdri);
	}
	loadSceneConfig() {
		if (this.properties && "Scene Config" in this.properties) return this.properties["Scene Config"];
		return {
			showGrid: useSettingStore().get("Comfy.Load3D.ShowGrid"),
			backgroundColor: "#" + useSettingStore().get("Comfy.Load3D.BackgroundColor"),
			backgroundImage: ""
		};
	}
	loadCameraConfig() {
		if (this.properties && "Camera Config" in this.properties) return this.properties["Camera Config"];
		return {
			cameraType: useSettingStore().get("Comfy.Load3D.CameraType"),
			fov: 35
		};
	}
	loadLightConfig() {
		const hdriDefaults = {
			enabled: false,
			hdriPath: "",
			showAsBackground: false,
			intensity: 1
		};
		if (this.properties && "Light Config" in this.properties) {
			const saved = this.properties["Light Config"];
			return {
				intensity: saved.intensity ?? useSettingStore().get("Comfy.Load3D.LightIntensity"),
				hdri: {
					...hdriDefaults,
					...saved.hdri
				}
			};
		}
		return {
			intensity: useSettingStore().get("Comfy.Load3D.LightIntensity"),
			hdri: hdriDefaults
		};
	}
	loadModelConfig() {
		const stored = this.properties?.["Model Config"];
		const config = {
			upDirection: "original",
			materialMode: "original",
			showSkeleton: false,
			...stored,
			gizmo: {
				...DEFAULT_GIZMO,
				...stored?.gizmo
			}
		};
		if (stored) stored.gizmo = config.gizmo;
		return config;
	}
	applySceneConfig(config, bgImagePath) {
		this.load3d.toggleGrid(config.showGrid);
		this.load3d.setBackgroundColor(config.backgroundColor);
		if (config.backgroundImage) {
			if (bgImagePath && bgImagePath != config.backgroundImage) return;
			this.load3d.setBackgroundImage(config.backgroundImage);
			if (config.backgroundRenderMode) this.load3d.setBackgroundRenderMode(config.backgroundRenderMode);
		}
	}
	applyCameraConfig(config) {
		this.load3d.toggleCamera(config.cameraType);
		this.load3d.setFOV(config.fov);
		if (config.state) this.load3d.setCameraState(config.state);
	}
	applyLightConfig(config) {
		this.load3d.setLightIntensity(config.intensity);
	}
	applyHDRISettings(config) {
		if (!config.hdriPath) return;
		this.load3d.setHDRIIntensity(config.intensity);
		this.load3d.setHDRIAsBackground(config.showAsBackground);
		if (config.enabled) this.load3d.setHDRIEnabled(true);
	}
	applyModelConfig(config) {
		this.load3d.setUpDirection(config.upDirection);
		this.load3d.setMaterialMode(config.materialMode);
	}
	createModelUpdateHandler(loadFolder, cameraState, silentOnNotFound = false) {
		let isFirstLoad = true;
		return async (value) => {
			if (!value || value === "none") {
				this.load3d.clearModel();
				return;
			}
			const { filepath: filename, rootFolder: folder } = parseAnnotatedPath(value, loadFolder);
			this.setResourceFolder(filename);
			const modelUrl = api.apiURL(Load3dUtils.getResourceURL(...Load3dUtils.splitFilePath(filename), folder));
			if (!await this.load3d.loadModel(modelUrl, filename, { silentOnNotFound })) return;
			const modelConfig = this.loadModelConfig();
			this.applyModelConfig(modelConfig);
			if (isFirstLoad && cameraState) {
				try {
					this.load3d.setCameraState(cameraState);
				} catch (error) {
					console.warn("Failed to restore camera state:", error);
				}
				isFirstLoad = false;
			}
			this.load3d.emitModelReady();
		};
	}
	setResourceFolder(filename) {
		const pathParts = filename.split("/").filter((part) => part.trim());
		if (pathParts.length <= 2) return;
		const subfolder = pathParts.slice(1, -1).join("/");
		if (subfolder && this.properties) this.properties["Resource Folder"] = subfolder;
	}
};
//#endregion
export { createExportMenuItems as n, Load3DConfiguration as t };
