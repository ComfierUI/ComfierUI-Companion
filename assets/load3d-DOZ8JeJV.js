import "./rolldown-runtime-xtsTai4I.js";
import { et as nextTick } from "./vendor-vue-core-C1utdb0s.js";
import { Eo as ComponentWidgetImpl, Jr as useExtensionService, Oo as addWidget, a as ComfyApp, f as Load3dUtils, g as SUPPORTED_EXTENSIONS_ACCEPT, m as LOAD3D_NONE_MODEL, o as app, xt as isLoad3dNode, zc as getNodeByLocatorId } from "./layoutStore-CZsuzg91.js";
import { i as api } from "./api-Bt-fGt5a.js";
import { n as reportError } from "./reportError-LG-zfbNw.js";
import { t as useToastStore } from "./toastStore-CTfykAzG.js";
import { d as t } from "./i18n-C3J-ToPr.js";
import { t as useDialogStore } from "./dialogStore-B0GYyals.js";
import { t as Load3D_default } from "./Load3D-wteGUp-H.js";
import { t as Load3dViewerContent_default } from "./Load3dViewerContent-BG4TFQvW.js";
import { t as useLoad3dService } from "./load3dService-B4-ohLYW.js";
import { t as LOAD3D_VIEWER_DIALOG_PROPS } from "./load3dViewerDialog-cvuuBJel.js";
import { a as nodeToLoad3dMap, i as markLoad3dSceneDirty, n as getLoad3dSceneRevision, o as setLoad3dOutputCache, r as isLoad3dSceneDirty, s as useLoad3d, t as getLoad3dOutputCache } from "./useLoad3d-BeiAY6wy.js";
import { n as createExportMenuItems, t as Load3DConfiguration } from "./Load3DConfiguration-Br8ldpNN.js";
import { t as snapshotLoad3dState } from "./load3dSerialize-Ce8Vlfog.js";
import { t as readModel3DOutput } from "./model3dOutput-CYCrt2OQ.js";
//#region src/extensions/core/load3d.ts
/** Extra captures allowed when the scene changes mid-capture. */
var MAX_STALE_CAPTURE_RETRIES = 2;
var inputSpecLoad3D = {
	name: "image",
	type: "Load3D",
	isPreview: false
};
var inputSpecPreview3D = {
	name: "image",
	type: "Preview3D",
	isPreview: true
};
async function handleModelUpload(files, node) {
	if (!files.length) return;
	const modelWidget = node.widgets?.find((w) => w.name === "model_file");
	try {
		const resourceFolder = node.properties["Resource Folder"] || "";
		const subfolder = resourceFolder.trim() ? `3d/${resourceFolder.trim()}` : "3d";
		const uploadPath = await Load3dUtils.uploadFile(files[0], subfolder);
		if (!uploadPath) {
			useToastStore().addAlert(t("toastMessages.fileUploadFailed"));
			return;
		}
		const modelUrl = api.apiURL(Load3dUtils.getResourceURL(...Load3dUtils.splitFilePath(uploadPath), "input"));
		useLoad3d(node).waitForLoad3d(async (load3d) => {
			try {
				await load3d.loadModel(modelUrl);
			} catch {
				useToastStore().addAlert(t("toastMessages.failedToLoadModel"));
			}
		});
		if (uploadPath && modelWidget) {
			if (!modelWidget.options.values?.includes(uploadPath)) modelWidget.options.values?.push(uploadPath);
			modelWidget.value = uploadPath;
		}
		markLoad3dSceneDirty(node);
	} catch (error) {
		console.error("Model upload failed:", error);
		useToastStore().addAlert(t("toastMessages.fileUploadFailed"));
	}
}
async function handleResourcesUpload(files, node) {
	if (!files.length) return;
	try {
		const resourceFolder = node.properties["Resource Folder"] || "";
		const subfolder = resourceFolder.trim() ? `3d/${resourceFolder.trim()}` : "3d";
		await Load3dUtils.uploadMultipleFiles(files, subfolder);
		markLoad3dSceneDirty(node);
	} catch (error) {
		console.error("Extra resources upload failed:", error);
		useToastStore().addAlert(t("toastMessages.extraResourcesUploadFailed"));
	}
}
function createFileInput(accept, multiple = false) {
	const input = document.createElement("input");
	input.type = "file";
	input.accept = accept;
	input.multiple = multiple;
	input.style.display = "none";
	return input;
}
useExtensionService().registerExtension({
	name: "Comfy.Load3D",
	settings: [
		{
			id: "Comfy.Load3D.ShowGrid",
			category: [
				"3D",
				"Scene",
				"Initial Grid Visibility"
			],
			name: "Initial Grid Visibility",
			tooltip: "Controls whether the grid is visible by default when a new 3D widget is created. This default can still be toggled individually for each widget after creation.",
			type: "boolean",
			defaultValue: true,
			experimental: true
		},
		{
			id: "Comfy.Load3D.BackgroundColor",
			category: [
				"3D",
				"Scene",
				"Initial Background Color"
			],
			name: "Initial Background Color",
			tooltip: "Controls the default background color of the 3D scene. This setting determines the background appearance when a new 3D widget is created, but can be adjusted individually for each widget after creation.",
			type: "color",
			defaultValue: "282828",
			experimental: true
		},
		{
			id: "Comfy.Load3D.CameraType",
			category: [
				"3D",
				"Camera",
				"Initial Camera Type"
			],
			name: "Initial Camera Type",
			tooltip: "Controls whether the camera is perspective or orthographic by default when a new 3D widget is created. This default can still be toggled individually for each widget after creation.",
			type: "combo",
			options: ["perspective", "orthographic"],
			defaultValue: "perspective",
			experimental: true
		},
		{
			id: "Comfy.Load3D.LightIntensity",
			category: [
				"3D",
				"Light",
				"Initial Light Intensity"
			],
			name: "Initial Light Intensity",
			tooltip: "Sets the default brightness level of lighting in the 3D scene. This value determines how intensely lights illuminate objects when a new 3D widget is created, but can be adjusted individually for each widget after creation.",
			type: "number",
			defaultValue: 3,
			experimental: true
		},
		{
			id: "Comfy.Load3D.LightIntensityMaximum",
			category: [
				"3D",
				"Light",
				"Light Intensity Maximum"
			],
			name: "Light Intensity Maximum",
			tooltip: "Sets the maximum allowable light intensity value for 3D scenes. This defines the upper brightness limit that can be set when adjusting lighting in any 3D widget.",
			type: "number",
			defaultValue: 10,
			experimental: true
		},
		{
			id: "Comfy.Load3D.LightIntensityMinimum",
			category: [
				"3D",
				"Light",
				"Light Intensity Minimum"
			],
			name: "Light Intensity Minimum",
			tooltip: "Sets the minimum allowable light intensity value for 3D scenes. This defines the lower brightness limit that can be set when adjusting lighting in any 3D widget.",
			type: "number",
			defaultValue: 1,
			experimental: true
		},
		{
			id: "Comfy.Load3D.LightAdjustmentIncrement",
			category: [
				"3D",
				"Light",
				"Light Adjustment Increment"
			],
			name: "Light Adjustment Increment",
			tooltip: "Controls the increment size when adjusting light intensity in 3D scenes. A smaller step value allows for finer control over lighting adjustments, while a larger value results in more noticeable changes per adjustment.",
			type: "slider",
			attrs: {
				min: .1,
				max: 1,
				step: .1
			},
			defaultValue: .5,
			experimental: true
		},
		{
			id: "Comfy.Load3D.3DViewerEnable",
			category: [
				"3D",
				"3DViewer",
				"Enable"
			],
			name: "Enable 3D Viewer (Beta)",
			tooltip: "Enables the 3D Viewer (Beta) for selected nodes. This feature allows you to visualize and interact with 3D models directly within the full size 3d viewer.",
			type: "boolean",
			defaultValue: true,
			experimental: true
		},
		{
			id: "Comfy.Load3D.PLYEngine",
			category: [
				"3D",
				"PointCloud",
				"Point Cloud Engine"
			],
			name: "Point Cloud Engine",
			tooltip: "Select the engine for loading point cloud PLY files. \"threejs\" uses the native Three.js PLYLoader (handles binary + ASCII, mesh-capable). \"fastply\" uses an optimized parser for ASCII PLY files. 3D Gaussian Splat PLYs are detected automatically and always rendered via sparkjs regardless of this setting.",
			type: "combo",
			options: ["threejs", "fastply"],
			defaultValue: "threejs",
			migrateDeprecatedValue: (value) => value === "sparkjs" ? "threejs" : value,
			experimental: true
		}
	],
	commands: [{
		id: "Comfy.3DViewer.Open3DViewer",
		icon: "pi pi-pencil",
		label: "Open 3D Viewer (Beta) for Selected Node",
		function: () => {
			const selectedNodes = app.canvas.selected_nodes;
			if (Object.keys(selectedNodes).length !== 1) return;
			const selectedNode = selectedNodes[Object.keys(selectedNodes)[0]];
			if (!isLoad3dNode(selectedNode)) return;
			ComfyApp.copyToClipspace(selectedNode);
			ComfyApp.clipspace_return_node = selectedNode;
			const props = { node: selectedNode };
			useDialogStore().showDialog({
				key: "global-load3d-viewer",
				title: t("load3d.viewer.title"),
				component: Load3dViewerContent_default,
				props,
				dialogComponentProps: {
					...LOAD3D_VIEWER_DIALOG_PROPS,
					onClose: async () => {
						await useLoad3dService().handleViewerClose(props.node);
					}
				}
			});
		}
	}],
	getCustomWidgets() {
		const VIEWPORT_STATE_NODES = /* @__PURE__ */ new Set([
			"Preview3DAdvanced",
			"Save3DAdvanced",
			"PreviewGaussianSplat",
			"PreviewPointCloud",
			"SaveGaussianSplat",
			"SavePointCloud"
		]);
		return { LOAD_3D(node) {
			const inputName = VIEWPORT_STATE_NODES.has(node.constructor.comfyClass) ? "viewport_state" : "image";
			if (node.widgets?.some((w) => w.name === "model_file")) {
				const fileInput = createFileInput(SUPPORTED_EXTENSIONS_ACCEPT, false);
				node.properties["Resource Folder"] = "";
				fileInput.onchange = async () => {
					await handleModelUpload(fileInput.files, node);
				};
				node.addWidget("button", "upload 3d model", "upload3dmodel", () => {
					fileInput.click();
				});
				const resourcesInput = createFileInput("*", true);
				resourcesInput.onchange = async () => {
					await handleResourcesUpload(resourcesInput.files, node);
					resourcesInput.value = "";
				};
				node.addWidget("button", "upload extra resources", "uploadExtraResources", () => {
					resourcesInput.click();
				});
				node.addWidget("button", "clear", "clear", () => {
					const modelWidget = node.widgets?.find((w) => w.name === "model_file");
					if (modelWidget) modelWidget.value = LOAD3D_NONE_MODEL;
					markLoad3dSceneDirty(node);
				});
			}
			const widget = new ComponentWidgetImpl({
				node,
				name: inputName,
				component: Load3D_default,
				inputSpec: {
					...inputSpecLoad3D,
					name: inputName
				},
				options: { hideInPanel: true }
			});
			widget.type = "load3D";
			addWidget(node, widget);
			return { widget };
		} };
	},
	getNodeMenuItems(node) {
		if (node.constructor.comfyClass !== "Load3D") return [];
		const load3d = useLoad3dService().getLoad3d(node);
		if (!load3d) return [];
		if (load3d.isSplatModel()) return [];
		return createExportMenuItems(load3d);
	},
	async nodeCreated(node) {
		if (node.constructor.comfyClass !== "Load3D") return;
		const [oldWidth, oldHeight] = node.size;
		node.setSize([Math.max(oldWidth, 300), Math.max(oldHeight, 600)]);
		await nextTick();
		useLoad3d(node).onLoad3dReady((load3d) => {
			const modelWidget = node.widgets?.find((w) => w.name === "model_file");
			const width = node.widgets?.find((w) => w.name === "width" && w.type === "number");
			const height = node.widgets?.find((w) => w.name === "height" && w.type === "number");
			if (!modelWidget || !width || !height) return;
			const cameraState = node.properties["Camera Config"]?.state;
			new Load3DConfiguration(load3d, node.properties).configure({
				loadFolder: "input",
				modelWidget,
				cameraState,
				width,
				height,
				onSceneInvalidated: () => markLoad3dSceneDirty(node)
			});
		});
		useLoad3d(node).waitForLoad3d(() => {
			const modelWidget = node.widgets?.find((w) => w.name === "model_file");
			const width = node.widgets?.find((w) => w.name === "width");
			const height = node.widgets?.find((w) => w.name === "height");
			const sceneWidget = node.widgets?.find((w) => w.name === "image");
			if (modelWidget && width && height && sceneWidget) sceneWidget.serializeValue = async () => {
				const currentLoad3d = nodeToLoad3dMap.get(node);
				if (!currentLoad3d) {
					console.error("No load3d instance found for node");
					return null;
				}
				for (let attempt = 0;; attempt++) {
					if (!isLoad3dSceneDirty(node)) {
						const cached = getLoad3dOutputCache(node);
						if (cached) return cached;
					}
					const sceneRevision = getLoad3dSceneRevision(node);
					await currentLoad3d.whenLoadIdle();
					const { camera_info, model_3d_info } = snapshotLoad3dState(node, currentLoad3d);
					const { scene: imageData, mask: maskData, normal: normalData } = await currentLoad3d.captureScene(width.value, height.value);
					const [data, dataMask, dataNormal] = await Promise.all([
						Load3dUtils.uploadTempImage(imageData, "scene"),
						Load3dUtils.uploadTempImage(maskData, "scene_mask"),
						Load3dUtils.uploadTempImage(normalData, "scene_normal")
					]);
					currentLoad3d.handleResize();
					const returnVal = {
						image: `threed/${data.name} [temp]`,
						mask: `threed/${dataMask.name} [temp]`,
						normal: `threed/${dataNormal.name} [temp]`,
						camera_info,
						recording: "",
						model_3d_info
					};
					const recordingData = currentLoad3d.getRecordingData();
					if (recordingData) returnVal.recording = `threed/${(await Load3dUtils.uploadTempImage(recordingData, "recording", "mp4")).name} [temp]`;
					if (setLoad3dOutputCache(node, returnVal, sceneRevision)) return returnVal;
					if (attempt >= MAX_STALE_CAPTURE_RETRIES) {
						reportError(/* @__PURE__ */ new Error("Load3D scene did not stabilize during capture"), {
							surface: "assets",
							errorType: "error_capturing_load3d_scene_unstable"
						});
						return null;
					}
				}
			};
		});
	}
});
function applyPreview3DOutput(node, result) {
	const filePath = result[0];
	const cameraState = result[1];
	const bgImagePath = result[2];
	const extrinsics = result[3];
	const intrinsics = result[4];
	if (!filePath) return;
	const modelWidget = node.widgets?.find((w) => w.name === "model_file");
	if (!modelWidget) return;
	const normalizedPath = filePath.replaceAll("\\", "/");
	modelWidget.value = normalizedPath;
	node.properties["Last Time Model File"] = normalizedPath;
	useLoad3d(node).waitForLoad3d((load3d) => {
		new Load3DConfiguration(load3d, node.properties).configure({
			loadFolder: "output",
			modelWidget,
			cameraState,
			bgImagePath,
			silentOnNotFound: true
		});
		if (bgImagePath) load3d.setBackgroundImage(bgImagePath);
		if (extrinsics && intrinsics) {
			const targetGeneration = load3d.currentLoadGeneration;
			load3d.whenLoadIdle().then(() => {
				if (load3d.currentLoadGeneration !== targetGeneration) return;
				load3d.setCameraFromMatrices(extrinsics, intrinsics);
			}).catch((error) => {
				console.error("Failed to apply camera matrices from Preview3D output:", error);
			});
		}
	});
}
useExtensionService().registerExtension({
	name: "Comfy.Preview3D",
	async beforeRegisterNodeDef(_nodeType, nodeData) {
		if ("Preview3D" === nodeData.name) {
			const input = nodeData.input ??= {};
			const required = input.required ??= {};
			required.image = ["PREVIEW_3D"];
		}
	},
	onNodeOutputsUpdated(nodeOutputs) {
		for (const [locatorId, output] of Object.entries(nodeOutputs)) {
			const result = output.result;
			if (!result?.[0]) continue;
			const node = getNodeByLocatorId(app.rootGraph, locatorId);
			if (!node || node.constructor.comfyClass !== "Preview3D") continue;
			applyPreview3DOutput(node, result);
		}
	},
	getNodeMenuItems(node) {
		if (node.constructor.comfyClass !== "Preview3D") return [];
		const load3d = useLoad3dService().getLoad3d(node);
		if (!load3d) return [];
		if (load3d.isSplatModel()) return [];
		return createExportMenuItems(load3d);
	},
	getCustomWidgets() {
		return { PREVIEW_3D(node) {
			const widget = new ComponentWidgetImpl({
				node,
				name: inputSpecPreview3D.name,
				component: Load3D_default,
				inputSpec: inputSpecPreview3D,
				options: { hideInPanel: true }
			});
			widget.type = "load3D";
			addWidget(node, widget);
			return { widget };
		} };
	},
	async nodeCreated(node) {
		if (node.constructor.comfyClass !== "Preview3D") return;
		const [oldWidth, oldHeight] = node.size;
		node.setSize([Math.max(oldWidth, 400), Math.max(oldHeight, 550)]);
		await nextTick();
		const onExecuted = node.onExecuted;
		useLoad3d(node).onLoad3dReady((load3d) => {
			const modelWidget = node.widgets?.find((w) => w.name === "model_file");
			if (!modelWidget) return;
			const lastTimeModelFile = node.properties["Last Time Model File"];
			if (!lastTimeModelFile) return;
			modelWidget.value = lastTimeModelFile;
			const cameraState = node.properties["Camera Config"]?.state;
			new Load3DConfiguration(load3d, node.properties).configure({
				loadFolder: "output",
				modelWidget,
				cameraState,
				silentOnNotFound: true
			});
		});
		useLoad3d(node).waitForLoad3d((load3d) => {
			const config = new Load3DConfiguration(load3d, node.properties);
			const modelWidget = node.widgets?.find((w) => w.name === "model_file");
			if (modelWidget) node.onExecuted = function(output) {
				onExecuted?.call(this, output);
				const result = output.result;
				const filePath = result?.[0];
				if (!filePath) {
					const msg = t("toastMessages.unableToGetModelFilePath");
					console.error(msg);
					useToastStore().addAlert(msg);
				}
				const cameraState = result?.[1];
				const bgImagePath = result?.[2];
				const extrinsics = result?.[3];
				const intrinsics = result?.[4];
				const modelFilePath = filePath?.replaceAll("\\", "/");
				modelWidget.value = modelFilePath;
				node.properties["Last Time Model File"] = modelFilePath;
				const settings = {
					loadFolder: "output",
					modelWidget,
					cameraState,
					bgImagePath,
					silentOnNotFound: true
				};
				config.configure(settings);
				if (bgImagePath) load3d.setBackgroundImage(bgImagePath);
				if (filePath && extrinsics && intrinsics) {
					const targetGeneration = load3d.currentLoadGeneration;
					load3d.whenLoadIdle().then(() => {
						if (load3d.currentLoadGeneration !== targetGeneration) return;
						load3d.setCameraFromMatrices(extrinsics, intrinsics);
					}).catch((error) => {
						console.error("Failed to apply camera matrices from Preview3D output:", error);
					});
				}
			};
		});
	}
});
function applyPreview3DAdvancedResult(node, load3d, reported, loadFolder, comfyClass) {
	const normalizedPath = reported.filePath.replaceAll("\\", "/");
	const folder = reported.folder ?? loadFolder;
	node.properties["Last Time Model File"] = normalizedPath;
	node.properties["Last Time Model Folder"] = folder;
	new Load3DConfiguration(load3d, node.properties).configureForSaveMesh(folder, normalizedPath, { silentOnNotFound: true });
	const { cameraState, modelTransform } = reported;
	if (!cameraState && !modelTransform) return;
	const targetGeneration = load3d.currentLoadGeneration;
	load3d.whenLoadIdle().then(() => {
		if (load3d.currentLoadGeneration !== targetGeneration) return;
		if (cameraState) load3d.setCameraState(cameraState);
		if (modelTransform) load3d.applyModelTransform(modelTransform);
	}).catch((error) => {
		console.error(`Failed to apply input camera_info / model_3d_info from ${comfyClass}:`, error);
	});
}
function createPreview3DAdvancedExtension(comfyClass, extensionName, loadFolder) {
	return {
		name: extensionName,
		onNodeOutputsUpdated(nodeOutputs) {
			for (const [locatorId, output] of Object.entries(nodeOutputs)) {
				const reported = readModel3DOutput(output);
				if (!reported) continue;
				const node = getNodeByLocatorId(app.rootGraph, locatorId);
				if (!node || node.constructor.comfyClass !== comfyClass) continue;
				useLoad3d(node).waitForLoad3d((load3d) => {
					applyPreview3DAdvancedResult(node, load3d, reported, loadFolder, comfyClass);
				});
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
				if (!cameraState) return;
				const targetGeneration = load3d.currentLoadGeneration;
				load3d.whenLoadIdle().then(() => {
					if (load3d.currentLoadGeneration !== targetGeneration) return;
					load3d.setCameraState(cameraState);
					load3d.forceRender();
				}).catch((error) => {
					console.error(`Failed to restore camera state for ${comfyClass}:`, error);
				});
			});
			waitForLoad3d((load3d) => {
				const sceneWidget = node.widgets?.find((w) => w.name === "viewport_state");
				if (!sceneWidget) return;
				const resolveLoad3d = () => nodeToLoad3dMap.get(node) ?? load3d;
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
				sceneWidget.serializeValue = async () => {
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
					applyPreview3DAdvancedResult(node, resolveLoad3d(), reported, loadFolder, comfyClass);
				};
			});
		}
	};
}
useExtensionService().registerExtension(createPreview3DAdvancedExtension("Preview3DAdvanced", "Comfy.Preview3DAdvanced", "temp"));
useExtensionService().registerExtension(createPreview3DAdvancedExtension("Save3DAdvanced", "Comfy.Save3DAdvanced", "output"));
//#endregion
