import "./rolldown-runtime-xtsTai4I.js";
import { Lt as ref, St as watch, Vt as toRaw, f as getActivePinia } from "./vendor-vue-core-C1utdb0s.js";
import { at as useDebounceFn, nt as toRef } from "./vendor-vueuse-BxKIIsKg.js";
import { Dt as useCanvasStore, Mo as useChainCallback, cs as LiteGraph, f as Load3dUtils, i as useSettingStore, o as app } from "./layoutStore-CZsuzg91.js";
import { i as api } from "./api-Bt-fGt5a.js";
import { t as useToastStore } from "./toastStore-CTfykAzG.js";
import { d as t } from "./i18n-C3J-ToPr.js";
import { n as createLoad3d, t as useLoad3dService } from "./load3dService-B4-ohLYW.js";
import { n as isLoad3dResultViewerNode } from "./nodeTypes-CU2vW7lJ.js";
import { n as isAssetPreviewSupported, r as persistThumbnail } from "./assetPreviewUtil-Bh4f-cpr.js";
//#region src/composables/useLoad3d.ts
var nodeToLoad3dMap = /* @__PURE__ */ new Map();
var load3dSceneDirty = /* @__PURE__ */ new WeakMap();
var load3dSceneRevisions = /* @__PURE__ */ new WeakMap();
var load3dOutputCache = /* @__PURE__ */ new WeakMap();
var markLoad3dSceneDirty = (node) => {
	if (!node) return;
	load3dSceneRevisions.set(node, (load3dSceneRevisions.get(node) ?? 0) + 1);
	load3dSceneDirty.set(node, true);
};
var getLoad3dSceneRevision = (node) => load3dSceneRevisions.get(node) ?? 0;
var isLoad3dSceneDirty = (node) => load3dSceneDirty.get(node) !== false;
var getLoad3dOutputCache = (node) => load3dOutputCache.get(node);
var setLoad3dOutputCache = (node, output, sceneRevision = getLoad3dSceneRevision(node)) => {
	if (getLoad3dSceneRevision(node) !== sceneRevision) return false;
	load3dOutputCache.set(node, output);
	load3dSceneDirty.set(node, false);
	return true;
};
var pendingCallbacks = /* @__PURE__ */ new Map();
var persistentReadyCallbacks = /* @__PURE__ */ new Map();
var nodesWithCleanup = /* @__PURE__ */ new WeakSet();
var ensureNodeCleanupChained = (node) => {
	if (nodesWithCleanup.has(node)) return;
	nodesWithCleanup.add(node);
	node.onRemoved = useChainCallback(node.onRemoved, () => {
		useLoad3dService().removeLoad3d(node);
		pendingCallbacks.delete(node);
		persistentReadyCallbacks.delete(node);
	});
};
var invokeReadyCallback = (callback, instance) => {
	try {
		callback(instance);
	} catch (error) {
		console.error("Load3d ready callback failed:", error);
	}
};
var useLoad3d = (nodeOrRef) => {
	const nodeRef = toRef(nodeOrRef);
	let load3d = null;
	let isFirstModelLoad = true;
	const markDirty = () => {
		const rawNode = toRaw(nodeRef.value);
		if (rawNode) markLoad3dSceneDirty(rawNode);
	};
	const debouncedHandleResize = useDebounceFn(() => {
		load3d?.handleResize();
	}, 150);
	watch(() => getActivePinia() ? useCanvasStore().appScalePercentage : 0, debouncedHandleResize);
	const sceneConfig = ref({
		showGrid: true,
		backgroundColor: getActivePinia() ? "#" + useSettingStore().get("Comfy.Load3D.BackgroundColor") : "#282828",
		backgroundImage: "",
		backgroundRenderMode: "tiled"
	});
	const modelConfig = ref({
		upDirection: "original",
		materialMode: "original",
		showSkeleton: false,
		gizmo: {
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
		}
	});
	const hasSkeleton = ref(false);
	const cameraConfig = ref({
		cameraType: "perspective",
		fov: 75,
		hasCustomUp: false
	});
	const lightConfig = ref({
		intensity: 5,
		hdri: {
			enabled: false,
			hdriPath: "",
			showAsBackground: false,
			intensity: 1
		}
	});
	const lastNonHdriLightIntensity = ref(lightConfig.value.intensity);
	const isRecording = ref(false);
	const hasRecording = ref(false);
	const recordingDuration = ref(0);
	const animations = ref([]);
	const playing = ref(false);
	const selectedSpeed = ref(1);
	const selectedAnimation = ref(0);
	const animationProgress = ref(0);
	const animationDuration = ref(0);
	const loading = ref(false);
	const loadingMessage = ref("");
	const isPreview = ref(false);
	const isSplatModel = ref(false);
	const isPlyModel = ref(false);
	const sourceFormat = ref(null);
	const canFitToViewer = ref(true);
	const canCenterCameraOnModel = ref(false);
	const canUseGizmo = ref(true);
	const canUseLighting = ref(true);
	const canExport = ref(true);
	const materialModes = ref([
		"original",
		"clay",
		"normal",
		"wireframe"
	]);
	const initializeLoad3d = async (containerRef) => {
		const rawNode = toRaw(nodeRef.value);
		if (!containerRef || !rawNode) return;
		const node = rawNode;
		try {
			const widthWidget = node.widgets?.find((w) => w.name === "width");
			const heightWidget = node.widgets?.find((w) => w.name === "height");
			const comfyClass = node.constructor.comfyClass;
			if (typeof comfyClass === "string" && (isLoad3dResultViewerNode(comfyClass) || comfyClass.startsWith("Preview")) || !(widthWidget && heightWidget)) isPreview.value = true;
			load3d = createLoad3d(containerRef, {
				width: widthWidget?.value,
				height: heightWidget?.value,
				getDimensions: widthWidget && heightWidget ? () => ({
					width: widthWidget.value,
					height: heightWidget.value
				}) : void 0,
				getZoomScale: () => {
					return app.canvas.ds.scale;
				},
				onContextMenu: (event) => {
					const menuOptions = app.canvas.getNodeMenuOptions(node);
					new LiteGraph.ContextMenu(menuOptions, {
						event,
						title: node.type,
						extra: node
					});
				}
			});
			await restoreConfigurationsFromNode(node);
			node.onMouseEnter = useChainCallback(node.onMouseEnter, () => {
				load3d?.refreshViewport();
				load3d?.updateStatusMouseOnNode(true);
			});
			node.onMouseLeave = useChainCallback(node.onMouseLeave, () => {
				load3d?.updateStatusMouseOnNode(false);
			});
			node.onResize = useChainCallback(node.onResize, () => {
				load3d?.handleResize();
			});
			node.onDrawBackground = useChainCallback(node.onDrawBackground, function() {
				if (load3d) load3d.domElement.hidden = this.flags.collapsed ?? false;
			});
			ensureNodeCleanupChained(node);
			nodeToLoad3dMap.set(node, load3d);
			handleEvents("add");
			const initializedLoad3d = load3d;
			const callbacks = pendingCallbacks.get(node);
			if (callbacks) {
				callbacks.forEach((callback) => {
					invokeReadyCallback(callback, initializedLoad3d);
				});
				pendingCallbacks.delete(node);
			}
			const persistent = persistentReadyCallbacks.get(node);
			if (persistent) persistent.forEach((callback) => {
				invokeReadyCallback(callback, initializedLoad3d);
			});
		} catch (error) {
			console.error("Error initializing Load3d:", error);
			useToastStore().addAlert(t("toastMessages.failedToInitializeLoad3dViewer"));
		}
	};
	const restoreConfigurationsFromNode = async (node) => {
		if (!load3d) return;
		const savedSceneConfig = node.properties["Scene Config"];
		if (savedSceneConfig) sceneConfig.value = {
			...sceneConfig.value,
			...savedSceneConfig,
			backgroundRenderMode: savedSceneConfig.backgroundRenderMode || "tiled"
		};
		const savedModelConfig = node.properties["Model Config"];
		if (savedModelConfig) modelConfig.value = {
			...modelConfig.value,
			...savedModelConfig,
			gizmo: savedModelConfig.gizmo ? {
				...modelConfig.value.gizmo,
				...savedModelConfig.gizmo,
				scale: savedModelConfig.gizmo.scale ?? {
					x: 1,
					y: 1,
					z: 1
				}
			} : {
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
			}
		};
		const savedCameraConfig = node.properties["Camera Config"];
		if (savedCameraConfig) cameraConfig.value = savedCameraConfig;
		const savedLightConfig = node.properties["Light Config"];
		const savedHdriEnabled = savedLightConfig?.hdri?.enabled ?? false;
		if (savedLightConfig) {
			lightConfig.value = {
				intensity: savedLightConfig.intensity ?? lightConfig.value.intensity,
				hdri: {
					...lightConfig.value.hdri,
					...savedLightConfig.hdri,
					enabled: false
				}
			};
			lastNonHdriLightIntensity.value = lightConfig.value.intensity;
		}
		const hdri = lightConfig.value.hdri;
		let hdriLoaded = false;
		if (hdri?.hdriPath) {
			const hdriUrl = api.apiURL(Load3dUtils.getResourceURL(...Load3dUtils.splitFilePath(hdri.hdriPath), "input"));
			try {
				await load3d.loadHDRI(hdriUrl);
				hdriLoaded = true;
			} catch (error) {
				console.warn("Failed to restore HDRI:", error);
				lightConfig.value = {
					...lightConfig.value,
					hdri: {
						...lightConfig.value.hdri,
						hdriPath: "",
						enabled: false
					}
				};
			}
		}
		if (hdriLoaded && savedHdriEnabled) lightConfig.value = {
			...lightConfig.value,
			hdri: {
				...lightConfig.value.hdri,
				enabled: true
			}
		};
		applySceneConfigToLoad3d();
		applyLightConfigToLoad3d();
	};
	const applySceneConfigToLoad3d = () => {
		if (!load3d) return;
		const cfg = sceneConfig.value;
		load3d.toggleGrid(cfg.showGrid);
		if (!lightConfig.value.hdri?.enabled) load3d.setBackgroundColor(cfg.backgroundColor);
		if (cfg.backgroundRenderMode) load3d.setBackgroundRenderMode(cfg.backgroundRenderMode);
	};
	const applyGizmoConfigToLoad3d = () => {
		if (!load3d) return;
		const gizmo = modelConfig.value.gizmo;
		if (!gizmo) return;
		if (gizmo.position.x !== 0 || gizmo.position.y !== 0 || gizmo.position.z !== 0 || gizmo.rotation.x !== 0 || gizmo.rotation.y !== 0 || gizmo.rotation.z !== 0 || gizmo.scale.x !== 1 || gizmo.scale.y !== 1 || gizmo.scale.z !== 1) load3d.applyGizmoTransform(gizmo.position, gizmo.rotation, gizmo.scale);
		if (gizmo.enabled) load3d.setGizmoEnabled(true);
		if (gizmo.mode !== "translate") load3d.setGizmoMode(gizmo.mode);
	};
	const applyLightConfigToLoad3d = () => {
		if (!load3d) return;
		const cfg = lightConfig.value;
		load3d.setLightIntensity(cfg.intensity);
		const hdri = cfg.hdri;
		if (!hdri) return;
		load3d.setHDRIIntensity(hdri.intensity);
		load3d.setHDRIAsBackground(hdri.showAsBackground);
		load3d.setHDRIEnabled(hdri.enabled);
	};
	const persistLightConfigToNode = () => {
		const n = nodeRef.value;
		if (n) n.properties["Light Config"] = lightConfig.value;
		markDirty();
	};
	const waitForLoad3d = (callback) => {
		const node = toRaw(nodeRef.value);
		if (!node) return;
		const existingInstance = nodeToLoad3dMap.get(node);
		if (existingInstance) {
			invokeReadyCallback(callback, existingInstance);
			return;
		}
		if (!pendingCallbacks.has(node)) pendingCallbacks.set(node, []);
		pendingCallbacks.get(node).push(callback);
		ensureNodeCleanupChained(node);
	};
	const onLoad3dReady = (callback) => {
		const node = toRaw(nodeRef.value);
		if (!node) return;
		if (!persistentReadyCallbacks.has(node)) persistentReadyCallbacks.set(node, []);
		persistentReadyCallbacks.get(node).push(callback);
		ensureNodeCleanupChained(node);
		const existingInstance = nodeToLoad3dMap.get(node);
		if (existingInstance) invokeReadyCallback(callback, existingInstance);
	};
	watch(sceneConfig, (newValue) => {
		if (nodeRef.value) nodeRef.value.properties["Scene Config"] = newValue;
		markDirty();
	}, { deep: true });
	watch(() => sceneConfig.value.showGrid, (showGrid) => {
		load3d?.toggleGrid(showGrid);
	});
	watch(() => sceneConfig.value.backgroundColor, (color) => {
		if (!load3d || lightConfig.value.hdri?.enabled) return;
		load3d.setBackgroundColor(color);
	});
	watch(() => sceneConfig.value.backgroundImage, async (image) => {
		if (!load3d) return;
		await load3d.setBackgroundImage(image || "");
	});
	watch(() => sceneConfig.value.backgroundRenderMode, (mode) => {
		if (mode) load3d?.setBackgroundRenderMode(mode);
	});
	watch(modelConfig, (newValue) => {
		if (nodeRef.value) nodeRef.value.properties["Model Config"] = newValue;
		markDirty();
	}, { deep: true });
	watch(() => modelConfig.value.upDirection, (newValue) => {
		if (load3d) load3d.setUpDirection(newValue);
	});
	watch(() => modelConfig.value.materialMode, (newValue) => {
		if (load3d) load3d.setMaterialMode(newValue);
	});
	watch(() => modelConfig.value.showSkeleton, (newValue) => {
		if (load3d) load3d.setShowSkeleton(newValue);
	});
	watch(cameraConfig, (newValue) => {
		if (load3d && nodeRef.value) {
			nodeRef.value.properties["Camera Config"] = newValue;
			load3d.toggleCamera(newValue.cameraType);
			load3d.setFOV(newValue.fov);
			if (newValue.hasCustomUp) load3d.setUseCustomUp(newValue.useCustomUp);
		}
		markDirty();
	}, { deep: true });
	watch(() => lightConfig.value.intensity, (intensity) => {
		if (!load3d || !nodeRef.value) return;
		if (!lightConfig.value.hdri?.enabled) lastNonHdriLightIntensity.value = intensity;
		persistLightConfigToNode();
		load3d.setLightIntensity(intensity);
	});
	watch(() => lightConfig.value.hdri?.intensity, (intensity) => {
		if (!load3d || !nodeRef.value) return;
		if (intensity === void 0) return;
		persistLightConfigToNode();
		load3d.setHDRIIntensity(intensity);
	});
	watch(() => lightConfig.value.hdri?.showAsBackground, (show) => {
		if (!load3d || !nodeRef.value) return;
		if (show === void 0) return;
		persistLightConfigToNode();
		load3d.setHDRIAsBackground(show);
	});
	watch(() => lightConfig.value.hdri?.enabled, (enabled, prevEnabled) => {
		if (!load3d || !nodeRef.value) return;
		if (enabled === void 0) return;
		if (enabled && prevEnabled === false) lastNonHdriLightIntensity.value = lightConfig.value.intensity;
		if (!enabled && prevEnabled === true) lightConfig.value = {
			...lightConfig.value,
			intensity: lastNonHdriLightIntensity.value
		};
		persistLightConfigToNode();
		load3d.setHDRIEnabled(enabled);
	});
	watch(playing, (newValue) => {
		if (load3d) load3d.toggleAnimation(newValue);
		markDirty();
	});
	watch(selectedSpeed, (newValue) => {
		if (load3d && newValue) load3d.setAnimationSpeed(newValue);
		markDirty();
	});
	watch(selectedAnimation, (newValue) => {
		if (load3d) load3d.updateSelectedAnimation(newValue);
		markDirty();
	});
	const handleMouseEnter = () => {
		load3d?.updateStatusMouseOnScene(true);
	};
	const handleMouseLeave = () => {
		load3d?.updateStatusMouseOnScene(false);
	};
	const handleStartRecording = async () => {
		if (load3d) {
			await load3d.startRecording();
			isRecording.value = true;
			markDirty();
		}
	};
	const handleStopRecording = () => {
		if (load3d) {
			load3d.stopRecording();
			isRecording.value = false;
			recordingDuration.value = load3d.getRecordingDuration();
			hasRecording.value = recordingDuration.value > 0;
			if (hasRecording.value) markDirty();
		}
	};
	const handleExportRecording = () => {
		if (load3d) {
			const filename = `${(/* @__PURE__ */ new Date()).toISOString().replace(/[:.]/g, "-")}-scene-recording.mp4`;
			load3d.exportRecording(filename);
		}
	};
	const handleClearRecording = () => {
		if (load3d) {
			load3d.clearRecording();
			hasRecording.value = false;
			recordingDuration.value = 0;
			markDirty();
		}
	};
	const handleSeek = (progress) => {
		if (load3d && animationDuration.value > 0) {
			const time = progress / 100 * animationDuration.value;
			load3d.setAnimationTime(time);
			markDirty();
		}
	};
	const handleHDRIFileUpdate = async (file) => {
		const capturedLoad3d = load3d;
		if (!capturedLoad3d) return;
		if (!file) {
			lightConfig.value = {
				...lightConfig.value,
				hdri: {
					...lightConfig.value.hdri,
					hdriPath: "",
					enabled: false,
					showAsBackground: false
				}
			};
			capturedLoad3d.clearHDRI();
			return;
		}
		const resourceFolder = nodeRef.value?.properties["Resource Folder"] || "";
		const subfolder = resourceFolder.trim() ? `3d/${resourceFolder.trim()}` : "3d";
		const uploadedPath = await Load3dUtils.uploadFile(file, subfolder);
		if (!uploadedPath) return;
		if (load3d !== capturedLoad3d) return;
		const hdriUrl = api.apiURL(Load3dUtils.getResourceURL(...Load3dUtils.splitFilePath(uploadedPath), "input"));
		try {
			loading.value = true;
			loadingMessage.value = t("load3d.loadingHDRI");
			await capturedLoad3d.loadHDRI(hdriUrl);
			if (load3d !== capturedLoad3d) return;
			let sceneMin = 1;
			let sceneMax = 10;
			if (getActivePinia() != null) {
				const settingStore = useSettingStore();
				sceneMin = settingStore.get("Comfy.Load3D.LightIntensityMinimum");
				sceneMax = settingStore.get("Comfy.Load3D.LightIntensityMaximum");
			}
			const mappedHdriIntensity = Load3dUtils.mapSceneLightIntensityToHdri(lightConfig.value.intensity, sceneMin, sceneMax);
			lightConfig.value = {
				...lightConfig.value,
				hdri: {
					...lightConfig.value.hdri,
					hdriPath: uploadedPath,
					enabled: true,
					showAsBackground: true,
					intensity: mappedHdriIntensity
				}
			};
		} catch (error) {
			console.error("Failed to load HDRI:", error);
			capturedLoad3d.clearHDRI();
			lightConfig.value = {
				...lightConfig.value,
				hdri: {
					...lightConfig.value.hdri,
					hdriPath: "",
					enabled: false,
					showAsBackground: false
				}
			};
			useToastStore().addAlert(t("toastMessages.failedToLoadHDRI"));
		} finally {
			loading.value = false;
			loadingMessage.value = "";
		}
	};
	const handleBackgroundImageUpdate = async (file) => {
		if (!file) {
			sceneConfig.value.backgroundImage = "";
			await load3d?.setBackgroundImage("");
			return;
		}
		const resourceFolder = nodeRef.value?.properties["Resource Folder"] || "";
		const subfolder = resourceFolder.trim() ? `3d/${resourceFolder.trim()}` : "3d";
		const uploadedPath = await Load3dUtils.uploadFile(file, subfolder);
		if (!uploadedPath) return;
		sceneConfig.value.backgroundRenderMode = "tiled";
		sceneConfig.value.backgroundImage = uploadedPath;
		await load3d?.setBackgroundImage(uploadedPath);
	};
	const handleExportModel = async (format) => {
		if (!load3d) {
			useToastStore().addAlert(t("toastMessages.no3dSceneToExport"));
			return;
		}
		try {
			await load3d.exportModel(format);
		} catch (error) {
			console.error("Error exporting model:", error);
			useToastStore().addAlert(t("toastMessages.failedToExportModel", { format: format.toUpperCase() }));
		}
	};
	const handleModelDrop = async (file) => {
		if (!load3d) {
			useToastStore().addAlert(t("toastMessages.no3dScene"));
			return;
		}
		const node = toRaw(nodeRef.value);
		if (!node) return;
		try {
			const resourceFolder = node.properties["Resource Folder"] || "";
			const subfolder = resourceFolder.trim() ? `3d/${resourceFolder.trim()}` : "3d";
			loading.value = true;
			loadingMessage.value = t("load3d.uploadingModel");
			const uploadedPath = await Load3dUtils.uploadFile(file, subfolder);
			if (!uploadedPath) {
				useToastStore().addAlert(t("toastMessages.fileUploadFailed"));
				return;
			}
			const modelUrl = api.apiURL(Load3dUtils.getResourceURL(...Load3dUtils.splitFilePath(uploadedPath), isPreview.value ? "output" : "input"));
			loadingMessage.value = t("load3d.loadingModel");
			if (!await load3d.loadModel(modelUrl)) return;
			const modelWidget = node.widgets?.find((w) => w.name === "model_file");
			if (modelWidget) {
				const options = modelWidget.options;
				if (options?.values && !options.values.includes(uploadedPath)) options.values.push(uploadedPath);
				modelWidget.value = uploadedPath;
			}
		} catch (error) {
			console.error("Model drop failed:", error);
			useToastStore().addAlert(t("toastMessages.failedToLoadModel"));
		} finally {
			loading.value = false;
			loadingMessage.value = "";
		}
	};
	const syncSceneModels = () => {
		const modelInfo = load3d?.getModelInfo();
		sceneConfig.value.models = modelInfo ? [modelInfo] : [];
	};
	const eventConfig = {
		materialModeChange: (value) => {
			modelConfig.value.materialMode = value;
		},
		backgroundColorChange: (value) => {
			sceneConfig.value.backgroundColor = value;
		},
		backgroundRenderModeChange: (value) => {
			sceneConfig.value.backgroundRenderMode = value;
		},
		lightIntensityChange: (value) => {
			lightConfig.value.intensity = value;
		},
		fovChange: (value) => {
			cameraConfig.value.fov = value;
		},
		cameraTypeChange: (value) => {
			cameraConfig.value.cameraType = value;
		},
		cameraUpStateChange: (value) => {
			const { cameraType, fov, state } = cameraConfig.value;
			cameraConfig.value = value.hasCustomUp ? {
				cameraType,
				fov,
				state,
				hasCustomUp: true,
				useCustomUp: value.usingCustomUp
			} : {
				cameraType,
				fov,
				state,
				hasCustomUp: false
			};
		},
		showGridChange: (value) => {
			sceneConfig.value.showGrid = value;
		},
		upDirectionChange: (value) => {
			modelConfig.value.upDirection = value;
		},
		backgroundImageChange: (value) => {
			sceneConfig.value.backgroundImage = value;
		},
		backgroundImageLoadingStart: () => {
			loadingMessage.value = t("load3d.loadingBackgroundImage");
			loading.value = true;
		},
		backgroundImageLoadingEnd: () => {
			loadingMessage.value = "";
			loading.value = false;
		},
		modelLoadingStart: () => {
			loadingMessage.value = t("load3d.loadingModel");
			loading.value = true;
			if (!isFirstModelLoad) modelConfig.value = {
				upDirection: "original",
				materialMode: "original",
				showSkeleton: false,
				gizmo: {
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
				}
			};
		},
		modelLoadingEnd: () => {
			loadingMessage.value = "";
			loading.value = false;
			isSplatModel.value = load3d?.isSplatModel() ?? false;
			isPlyModel.value = load3d?.isPlyModel() ?? false;
			sourceFormat.value = load3d?.getSourceFormat() ?? null;
			canCenterCameraOnModel.value = isSplatModel.value || isPlyModel.value;
			const caps = load3d?.getCurrentModelCapabilities();
			canFitToViewer.value = caps?.fitToViewer ?? true;
			canUseGizmo.value = caps?.gizmoTransform ?? true;
			canUseLighting.value = caps?.lighting ?? true;
			canExport.value = caps?.exportable ?? true;
			materialModes.value = caps?.materialModes ?? [
				"original",
				"normal",
				"wireframe"
			];
			hasSkeleton.value = load3d?.hasSkeleton() ?? false;
			applyGizmoConfigToLoad3d();
			syncSceneModels();
			isFirstModelLoad = false;
		},
		modelReady: () => {
			if (!load3d || !isAssetPreviewSupported()) return;
			const node = nodeRef.value;
			if (node?.properties["Last Time Model Folder"] === "temp") return;
			const widgetValue = (node?.widgets?.find((w) => w.name === "model_file" || w.name === "image"))?.value;
			const value = typeof widgetValue === "string" && widgetValue.trim() ? widgetValue : node?.properties["Last Time Model File"];
			if (typeof value !== "string" || !value) return;
			const filename = value.trim().replace(/\s*\[output\]$/, "");
			const modelName = Load3dUtils.splitFilePath(filename)[1];
			load3d.captureThumbnail(256, 256).then((dataUrl) => fetch(dataUrl).then((r) => r.blob())).then((blob) => persistThumbnail(modelName, blob)).catch(() => {});
		},
		skeletonVisibilityChange: (value) => {
			modelConfig.value.showSkeleton = value;
		},
		exportLoadingStart: (message) => {
			loadingMessage.value = message || t("load3d.exportingModel");
			loading.value = true;
		},
		exportLoadingEnd: () => {
			loadingMessage.value = "";
			loading.value = false;
		},
		recordingStatusChange: (value) => {
			isRecording.value = value;
			if (!value && load3d) {
				recordingDuration.value = load3d.getRecordingDuration();
				hasRecording.value = recordingDuration.value > 0;
			}
		},
		animationListChange: (newValue) => {
			animations.value = newValue;
		},
		animationProgressChange: (data) => {
			animationProgress.value = data.progress;
			animationDuration.value = data.duration;
		},
		cameraChanged: (cameraState) => {
			const rawNode = toRaw(nodeRef.value);
			if (rawNode) {
				const node = rawNode;
				const cameraConfigProp = node.properties["Camera Config"];
				if (cameraConfigProp) cameraConfigProp.state = cameraState;
				else node.properties["Camera Config"] = {
					cameraType: cameraConfig.value.cameraType,
					fov: cameraConfig.value.fov,
					state: cameraState
				};
				markLoad3dSceneDirty(node);
			}
		},
		gizmoTransformChange: (data) => {
			if (modelConfig.value.gizmo && nodeRef.value) {
				modelConfig.value.gizmo.position = data.position;
				modelConfig.value.gizmo.rotation = data.rotation;
				modelConfig.value.gizmo.scale = data.scale;
				modelConfig.value.gizmo.enabled = data.enabled;
				modelConfig.value.gizmo.mode = data.mode;
			}
			syncSceneModels();
		}
	};
	const handleToggleGizmo = (enabled) => {
		if (load3d && modelConfig.value.gizmo) {
			modelConfig.value.gizmo.enabled = enabled;
			load3d.setGizmoEnabled(enabled);
		}
	};
	const handleSetGizmoMode = (mode) => {
		if (load3d && modelConfig.value.gizmo) {
			modelConfig.value.gizmo.mode = mode;
			load3d.setGizmoMode(mode);
		}
	};
	const handleFitToViewer = () => {
		if (!load3d) return;
		load3d.fitToViewer();
		if (!modelConfig.value.gizmo) return;
		const transform = load3d.getGizmoTransform();
		modelConfig.value.gizmo.position = transform.position;
		modelConfig.value.gizmo.scale = transform.scale;
		syncSceneModels();
	};
	const handleCenterCameraOnModel = () => {
		if (!load3d) return;
		load3d.centerCameraOnModel();
		markDirty();
	};
	const handleResetGizmoTransform = () => {
		if (load3d) load3d.resetGizmoTransform();
	};
	const handleEvents = (action) => {
		Object.entries(eventConfig).forEach(([event, handler]) => {
			const method = `${action}EventListener`;
			load3d?.[method](event, handler);
		});
	};
	const cleanup = () => {
		handleEvents("remove");
		const node = toRaw(nodeRef.value);
		if (!node) return;
		if (nodeToLoad3dMap.get(node) === load3d) nodeToLoad3dMap.delete(node);
		load3d?.remove();
		load3d = null;
	};
	return {
		load3d,
		sceneConfig,
		modelConfig,
		cameraConfig,
		lightConfig,
		isRecording,
		isPreview,
		isSplatModel,
		isPlyModel,
		sourceFormat,
		canFitToViewer,
		canCenterCameraOnModel,
		canUseGizmo,
		canUseLighting,
		canExport,
		materialModes,
		hasSkeleton,
		hasRecording,
		recordingDuration,
		animations,
		playing,
		selectedSpeed,
		selectedAnimation,
		animationProgress,
		animationDuration,
		loading,
		loadingMessage,
		initializeLoad3d,
		waitForLoad3d,
		onLoad3dReady,
		handleMouseEnter,
		handleMouseLeave,
		handleStartRecording,
		handleStopRecording,
		handleExportRecording,
		handleClearRecording,
		handleSeek,
		handleBackgroundImageUpdate,
		handleHDRIFileUpdate,
		handleExportModel,
		handleModelDrop,
		handleToggleGizmo,
		handleSetGizmoMode,
		handleResetGizmoTransform,
		handleFitToViewer,
		handleCenterCameraOnModel,
		cleanup
	};
};
//#endregion
export { nodeToLoad3dMap as a, markLoad3dSceneDirty as i, getLoad3dSceneRevision as n, setLoad3dOutputCache as o, isLoad3dSceneDirty as r, useLoad3d as s, getLoad3dOutputCache as t };
