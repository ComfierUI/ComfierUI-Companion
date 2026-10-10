import "./rolldown-runtime-xtsTai4I.js";
import { et as nextTick } from "./vendor-vue-core-C1utdb0s.js";
import { Jr as useExtensionService, o as app, zc as getNodeByLocatorId } from "./layoutStore-CZsuzg91.js";
import { t as useToastStore } from "./toastStore-CTfykAzG.js";
import { d as t } from "./i18n-C3J-ToPr.js";
import { t as useLoad3dService } from "./load3dService-B4-ohLYW.js";
import { a as nodeToLoad3dMap, s as useLoad3d } from "./useLoad3d-BeiAY6wy.js";
import { n as createExportMenuItems, t as Load3DConfiguration } from "./Load3DConfiguration-Br8ldpNN.js";
import { t as readModel3DOutput } from "./model3dOutput-CYCrt2OQ.js";
//#region src/extensions/core/load3dPreviewExtensions.ts
function applyResultToLoad3d(node, load3d, reported, loadFolder) {
	const { cameraState, modelTransform } = reported;
	const normalizedPath = reported.filePath.replaceAll("\\", "/");
	const folder = reported.folder ?? loadFolder;
	node.properties["Last Time Model File"] = normalizedPath;
	node.properties["Last Time Model Folder"] = folder;
	if (cameraState) {
		const existing = node.properties["Camera Config"];
		node.properties["Camera Config"] = {
			cameraType: load3d.getCurrentCameraType(),
			fov: 75,
			...existing,
			state: cameraState
		};
	}
	new Load3DConfiguration(load3d, node.properties).configureForSaveMesh(folder, normalizedPath, { silentOnNotFound: true });
	const targetGeneration = load3d.currentLoadGeneration;
	load3d.whenLoadIdle().then(() => {
		if (load3d.currentLoadGeneration !== targetGeneration) return;
		if (cameraState) load3d.setCameraState(cameraState);
		if (modelTransform) load3d.applyModelTransform(modelTransform);
		load3d.forceRender();
	});
}
function createPreview3DExtension(comfyClass, extensionName, loadFolder) {
	const applyPreviewOutput = (node, reported) => {
		useLoad3d(node).waitForLoad3d((load3d) => {
			applyResultToLoad3d(node, load3d, reported, loadFolder);
		});
	};
	return {
		name: extensionName,
		onNodeOutputsUpdated(nodeOutputs) {
			for (const [locatorId, output] of Object.entries(nodeOutputs)) {
				const reported = readModel3DOutput(output);
				if (!reported) continue;
				const node = getNodeByLocatorId(app.rootGraph, locatorId);
				if (!node || node.constructor.comfyClass !== comfyClass) continue;
				applyPreviewOutput(node, reported);
			}
		},
		getNodeMenuItems(node) {
			if (node.constructor.comfyClass !== comfyClass) return [];
			const load3d = useLoad3dService().getLoad3d(node);
			if (!load3d) return [];
			if (load3d.isSplatModel()) return [];
			return createExportMenuItems(load3d);
		},
		async nodeCreated(node) {
			if (node.constructor.comfyClass !== comfyClass) return;
			const [oldWidth, oldHeight] = node.size;
			node.setSize([Math.max(oldWidth, 400), Math.max(oldHeight, 550)]);
			await nextTick();
			const onExecuted = node.onExecuted;
			const { onLoad3dReady, waitForLoad3d } = useLoad3d(node);
			onLoad3dReady((load3d) => {
				const lastTimeModelFile = node.properties["Last Time Model File"];
				if (!lastTimeModelFile) return;
				const lastTimeModelFolder = node.properties["Last Time Model Folder"];
				const folder = lastTimeModelFolder === "temp" || lastTimeModelFolder === "output" ? lastTimeModelFolder : loadFolder;
				new Load3DConfiguration(load3d, node.properties).configureForSaveMesh(folder, lastTimeModelFile, { silentOnNotFound: true });
				const cameraState = node.properties["Camera Config"]?.state;
				const targetGeneration = load3d.currentLoadGeneration;
				load3d.whenLoadIdle().then(() => {
					if (load3d.currentLoadGeneration !== targetGeneration) return;
					if (cameraState) load3d.setCameraState(cameraState);
					load3d.forceRender();
				});
			});
			waitForLoad3d((load3d) => {
				const resolveLoad3d = () => nodeToLoad3dMap.get(node) ?? load3d;
				const sceneWidget = node.widgets?.find((w) => w.name === "viewport_state");
				const widthWidget = node.widgets?.find((w) => w.name === "width");
				const heightWidget = node.widgets?.find((w) => w.name === "height");
				if (widthWidget && heightWidget) {
					load3d.setTargetSize(widthWidget.value, heightWidget.value);
					widthWidget.callback = (value) => {
						resolveLoad3d().setTargetSize(value, heightWidget.value);
					};
					heightWidget.callback = (value) => {
						resolveLoad3d().setTargetSize(widthWidget.value, value);
					};
				}
				if (sceneWidget) sceneWidget.serializeValue = async () => {
					const currentLoad3d = nodeToLoad3dMap.get(node);
					if (!currentLoad3d) {
						console.error("No load3d instance found for node");
						return null;
					}
					const cameraConfig = node.properties["Camera Config"] || {
						cameraType: currentLoad3d.getCurrentCameraType(),
						fov: currentLoad3d.cameraManager.perspectiveCamera.fov
					};
					const cameraState = currentLoad3d.getCameraState();
					cameraConfig.state = cameraState;
					node.properties["Camera Config"] = cameraConfig;
					const modelInfo = currentLoad3d.getModelInfo();
					return {
						image: "",
						mask: "",
						normal: "",
						camera_info: cameraState,
						recording: "",
						model_3d_info: modelInfo ? [modelInfo] : []
					};
				};
				node.onExecuted = function(output) {
					onExecuted?.call(this, output);
					const reported = readModel3DOutput(output);
					if (!reported) {
						const msg = t("toastMessages.unableToGetModelFilePath");
						console.error(msg);
						useToastStore().addAlert(msg);
						return;
					}
					applyResultToLoad3d(node, resolveLoad3d(), reported, loadFolder);
				};
			});
		}
	};
}
useExtensionService().registerExtension(createPreview3DExtension("PreviewGaussianSplat", "Comfy.PreviewGaussianSplat", "temp"));
useExtensionService().registerExtension(createPreview3DExtension("PreviewPointCloud", "Comfy.PreviewPointCloud", "temp"));
useExtensionService().registerExtension(createPreview3DExtension("SaveGaussianSplat", "Comfy.SaveGaussianSplat", "output"));
useExtensionService().registerExtension(createPreview3DExtension("SavePointCloud", "Comfy.SavePointCloud", "output"));
//#endregion
