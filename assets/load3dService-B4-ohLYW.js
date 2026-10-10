const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./useLoad3d-yfTefDGC.js","./useLoad3d-BeiAY6wy.js","./rolldown-runtime-xtsTai4I.js","./vendor-vue-core-C1utdb0s.js","./vendor-vueuse-BxKIIsKg.js","./layoutStore-CZsuzg91.js","./vendor-datadog-DudeEV66.js","./vendor-other-BPEcPQTD.js","./vendor-three-DQpYrwAh.js","./vendor-zod-TMj9Wsdv.js","./vendor-tiptap-BT_4t92m.js","./requestAuth-YeU5GIXc.js","./telemetry-IkzvF0TI.js","./api-Bt-fGt5a.js","./zod.gen-C09SPgBJ.js","./vendor-axios-QnwcNXlY.js","./vendor-sentry-zSXGkMPN.js","./reportError-LG-zfbNw.js","./hostTelemetryEnabled-BZ3GL1Cu.js","./remoteConfig-DwMQrLli.js","./vendor-firebase-B37L--zT.js","./toastStore-CTfykAzG.js","./types-t0xJOOCt.js","./desktopHostSession-IrokPizE.js","./vendor-i18n-BZvE7WBQ.js","./i18n-C3J-ToPr.js","./formatUtil-DuxXRy1z.js","./commands-BcZ6fU3-.js","./main-BfqkkuXX.js","./nodeDefs-CFOSmIZi.js","./settings-B3DInspu.js","./comfyApi-CYSC9hA6.js","./types-ColLjFnz.js","./useFeatureFlags-DAoj_aDd.js","./dialog.variants-PsJk1wgr.js","./ssoRequired-BkQMvdnz.js","./dialogStore-B0GYyals.js","./DialogPortal-B3D-ZhO6.js","./vendor-reka-ui-tdehH9A1.js","./src-DI1bBfrb.js","./Button-j0oCzR82.js","./refreshRemoteConfig-D9UzqP0h.js","./vendor-primevue-C3d0HJ53.js","./systemStatsStore-3gc4cifl.js","./useImageQuiet-Ded8W_Zd.js","./vendor-markdown-CtxqRwKg.js","./useModalLiftedZIndex-BuehUvPe.js","./NumberFieldInput-CILJZ6M6.js","./colorUtil-BzdMMd-Y.js","./vendor-yjs-D9X62SBd.js","./markdownRendererUtil-6g3t5X63.js","./downloadUtil-Bysc7OZ_.js","./SingleSelect-CS2DGZzk.js","./widgetTypes-CisWqKm9.js","./Switch-BAw3-YcG.js","./Input-Cx8jjgHK.js","./SelectValue-BYMnIcxq.js","./Loader-CwKhrtFX.js","./_plugin-vue_export-helper-DEKQMRQ4.js","./creditsUtil-BWj6bywK.js","./useExternalLink-CXT6uu6Z.js","./envUtil-2Z8ainL3.js","./nodeTypes-CU2vW7lJ.js","./assetPreviewUtil-Bh4f-cpr.js","./vendor-other-DODGPXtn.css","./layoutStore-Nbgrgm8u.css","./useLoad3dViewer-BDqyQinR.js","./useLoad3dViewer-Cv7HNH2I.js","./SkeletonUtils-BO3xBoLT.js"])))=>i.map(i=>d[i]);
import "./rolldown-runtime-xtsTai4I.js";
import { a as __vitePreload } from "./vendor-datadog-DudeEV66.js";
import { C as ngonEncodedFaceSizes, S as hasNgonEncoding, T as isBinaryFbx, g as FBXExporter, h as OBJLoader2Parallel, m as MtlObjBridge, p as OBJLoader2WorkerModule_default, w as readFbxPolygons, x as matchFbxPolygons } from "./vendor-other-BPEcPQTD.js";
import { $ as LinearSRGBColorSpace, A as BufferGeometry, At as SpriteMaterial, B as Euler, C as AnimationMixer, D as Box3, E as Bone, Et as SkinnedMesh, G as GridHelper, It as Vector2, J as Light, K as Group, Lt as Vector3, Mt as TextureLoader, St as SRGBColorSpace, T as BasicDepthPacking, Tt as SkeletonHelper, _ as clone, _t as Points, a as FBXLoader, b as PMREMGenerator, c as GLTFExporter, ct as MeshBasicMaterial, d as TransformControls, dt as MeshStandardMaterial, ft as Object3D, i as GLTFLoader, j as Camera, k as BufferAttribute, kt as Sprite, l as RGBELoader, lt as MeshDepthMaterial, m as SplatMesh, n as STLLoader, o as STLExporter, p as SparkRenderer, pt as OrthographicCamera, r as MTLLoader, s as OBJExporter, st as Mesh, t as PLYLoader, tt as LoopRepeat, u as EXRLoader, ut as MeshNormalMaterial, vt as PointsMaterial } from "./vendor-three-DQpYrwAh.js";
import { Vt as toRaw } from "./vendor-vue-core-C1utdb0s.js";
import { f as Load3dUtils, i as useSettingStore, p as DIRECT_EXPORT_FORMATS } from "./layoutStore-CZsuzg91.js";
import { i as api } from "./api-Bt-fGt5a.js";
import { t as useToastStore } from "./toastStore-CTfykAzG.js";
import { d as t } from "./i18n-C3J-ToPr.js";
import { t as downloadBlob } from "./downloadUtil-Bysc7OZ_.js";
import { a as SceneManager, c as registerFaceSizes, d as ControlsManager, f as CameraManager, i as ViewHelperManager, l as LightingManager, n as computeLetterboxedViewport, o as QuadWireframeManager, p as RendererView, r as isLoad3dActive, s as QuadWireframeOverlay, t as Viewport3d, u as EventManager } from "./Viewport3d-1i6ZJT8U.js";
//#region src/extensions/core/load3d/AnimationManager.ts
var AnimationManager = class {
	currentAnimation = null;
	animationActions = [];
	animationClips = [];
	selectedAnimationIndex = 0;
	isAnimationPlaying = false;
	animationSpeed = 1;
	eventManager;
	constructor(eventManager) {
		this.eventManager = eventManager;
	}
	init() {}
	dispose() {
		if (this.currentAnimation) {
			this.animationActions.forEach((action) => {
				action.stop();
			});
			this.currentAnimation = null;
		}
		this.animationActions = [];
		this.animationClips = [];
		this.selectedAnimationIndex = 0;
		this.isAnimationPlaying = false;
		this.animationSpeed = 1;
		this.eventManager.emitEvent("animationListChange", []);
	}
	setupModelAnimations(model, originalModel) {
		if (this.currentAnimation) {
			this.currentAnimation.stopAllAction();
			this.animationActions = [];
		}
		let animations = [];
		if (model.animations.length > 0) animations = model.animations;
		else if (originalModel && "animations" in originalModel && Array.isArray(originalModel.animations)) animations = originalModel.animations;
		if (animations.length > 0) {
			this.animationClips = animations;
			this.currentAnimation = new AnimationMixer(model);
			if (this.animationClips.length > 0) this.updateSelectedAnimation(0);
		} else this.animationClips = [];
		this.updateAnimationList();
	}
	updateAnimationList() {
		let updatedAnimationList = [];
		if (this.animationClips.length > 0) updatedAnimationList = this.animationClips.map((clip, index) => ({
			name: clip.name || `Animation ${index + 1}`,
			index
		}));
		this.eventManager.emitEvent("animationListChange", updatedAnimationList);
	}
	setAnimationSpeed(speed) {
		this.animationSpeed = speed;
		this.animationActions.forEach((action) => {
			action.setEffectiveTimeScale(speed);
		});
	}
	updateSelectedAnimation(index) {
		if (!this.currentAnimation || index >= this.animationClips.length) {
			console.warn("Invalid animation update request");
			return;
		}
		this.animationActions.forEach((action) => {
			action.stop();
		});
		this.currentAnimation.stopAllAction();
		this.animationActions = [];
		this.selectedAnimationIndex = index;
		const clip = this.animationClips[index];
		const action = this.currentAnimation.clipAction(clip);
		action.setEffectiveTimeScale(this.animationSpeed);
		action.reset();
		action.clampWhenFinished = false;
		action.loop = LoopRepeat;
		if (this.isAnimationPlaying) action.play();
		else {
			action.play();
			action.paused = true;
		}
		this.animationActions = [action];
		this.eventManager.emitEvent("animationProgressChange", {
			progress: 0,
			currentTime: 0,
			duration: clip.duration
		});
	}
	toggleAnimation(play) {
		if (!this.currentAnimation || this.animationActions.length === 0) {
			console.warn("No animation to toggle");
			return;
		}
		this.isAnimationPlaying = play ?? !this.isAnimationPlaying;
		this.animationActions.forEach((action) => {
			if (this.isAnimationPlaying) {
				action.paused = false;
				if (action.time === 0 || action.time === action.getClip().duration) action.reset();
			} else action.paused = true;
		});
	}
	update(delta) {
		if (this.currentAnimation && this.isAnimationPlaying) {
			this.currentAnimation.update(delta);
			if (this.animationActions.length > 0) {
				const action = this.animationActions[0];
				const clip = action.getClip();
				const progress = action.time / clip.duration * 100;
				this.eventManager.emitEvent("animationProgressChange", {
					progress,
					currentTime: action.time,
					duration: clip.duration
				});
			}
		}
	}
	getAnimationTime() {
		if (this.animationActions.length === 0) return 0;
		return this.animationActions[0].time;
	}
	getAnimationDuration() {
		if (this.animationActions.length === 0) return 0;
		return this.animationActions[0].getClip().duration;
	}
	setAnimationTime(time) {
		if (this.animationActions.length === 0) return;
		const duration = this.getAnimationDuration();
		const clampedTime = Math.max(0, Math.min(time, duration));
		const wasPaused = this.animationActions.map((action) => action.paused);
		this.animationActions.forEach((action) => {
			action.paused = false;
			action.time = clampedTime;
		});
		if (this.currentAnimation) {
			this.currentAnimation.setTime(clampedTime);
			this.currentAnimation.update(0);
		}
		this.animationActions.forEach((action, i) => {
			action.paused = wasPaused[i];
		});
		this.eventManager.emitEvent("animationProgressChange", {
			progress: clampedTime / duration * 100,
			currentTime: clampedTime,
			duration
		});
	}
	reset() {}
};
window.comfyAPI = window.comfyAPI || {};
window.comfyAPI.AnimationManager = window.comfyAPI.AnimationManager || {};
window.comfyAPI.AnimationManager.AnimationManager = AnimationManager;
//#endregion
//#region src/extensions/core/load3d/GizmoManager.ts
var OFF_SCREEN_POINTER_NDC = {
	x: 10,
	y: 10
};
var GizmoManager = class {
	transformControls = null;
	targetObject = null;
	initialPosition = new Vector3();
	initialRotation = new Euler();
	initialScale = new Vector3(1, 1, 1);
	enabled = false;
	activeCamera;
	mode = "translate";
	scene;
	interactionElement;
	orbitControls;
	onTransformChange;
	getPointerNdc;
	constructor(scene, interactionElement, orbitControls, getActiveCamera, onTransformChange) {
		this.scene = scene;
		this.interactionElement = interactionElement;
		this.orbitControls = orbitControls;
		this.activeCamera = getActiveCamera();
		this.onTransformChange = onTransformChange;
	}
	init() {
		this.transformControls = new TransformControls(this.activeCamera, this.interactionElement);
		this.transformControls.addEventListener("dragging-changed", (event) => {
			this.orbitControls.enabled = !event.value;
			if (!event.value && this.onTransformChange) this.onTransformChange();
		});
		this.installPointerNdcOverride();
		const helper = this.transformControls.getHelper();
		helper.name = "GizmoTransformControls";
		helper.renderOrder = 999;
		this.scene.add(helper);
	}
	setPointerNdcSource(getPointerNdc) {
		this.getPointerNdc = getPointerNdc;
	}
	installPointerNdcOverride() {
		if (!this.transformControls) return;
		const transformControls = this.transformControls;
		const controls = transformControls;
		const original = controls._getPointer;
		if (typeof original !== "function") {
			console.warn("TransformControls no longer exposes _getPointer; letterbox-aware gizmo pointer mapping is disabled.");
			return;
		}
		controls._getPointer = (event) => {
			if (!this.getPointerNdc) return original.call(transformControls, event);
			const ndc = this.getPointerNdc(event.clientX, event.clientY);
			if (!ndc || !ndc.inside && !transformControls.dragging) return {
				...OFF_SCREEN_POINTER_NDC,
				button: event.button
			};
			return {
				x: ndc.x,
				y: ndc.y,
				button: event.button
			};
		};
	}
	setupForModel(model) {
		if (!this.transformControls) return;
		this.ensureHelperInScene();
		this.transformControls.detach();
		this.transformControls.enabled = false;
		this.targetObject = model;
		this.initialPosition.copy(model.position);
		this.initialRotation.copy(model.rotation);
		this.initialScale.copy(model.scale);
		if (this.enabled) {
			this.transformControls.attach(model);
			this.transformControls.setMode(this.mode);
			this.transformControls.enabled = true;
		}
	}
	detach() {
		this.enabled = false;
		if (this.transformControls) {
			this.transformControls.detach();
			this.transformControls.enabled = false;
		}
		this.targetObject = null;
	}
	setEnabled(enabled) {
		this.enabled = enabled;
		if (!this.transformControls) return;
		this.ensureHelperInScene();
		if (enabled && this.targetObject) {
			this.transformControls.attach(this.targetObject);
			this.transformControls.setMode(this.mode);
			this.transformControls.enabled = true;
		} else {
			this.transformControls.detach();
			this.transformControls.enabled = false;
		}
	}
	ensureHelperInScene() {
		if (!this.transformControls) return;
		const helper = this.transformControls.getHelper();
		if (!helper.parent) this.scene.add(helper);
	}
	removeFromScene() {
		if (!this.transformControls) return;
		const helper = this.transformControls.getHelper();
		if (helper.parent) helper.parent.remove(helper);
	}
	isEnabled() {
		return this.enabled;
	}
	updateCamera(camera) {
		this.activeCamera = camera;
		if (this.transformControls) this.transformControls.camera = camera;
	}
	setMode(mode) {
		this.mode = mode;
		if (this.transformControls) this.transformControls.setMode(mode);
	}
	getMode() {
		return this.mode;
	}
	reset() {
		if (!this.targetObject) return;
		this.targetObject.position.copy(this.initialPosition);
		this.targetObject.rotation.copy(this.initialRotation);
		this.targetObject.scale.copy(this.initialScale);
		this.onTransformChange?.();
	}
	applyTransform(position, rotation, scale) {
		if (!this.targetObject) return;
		this.targetObject.position.set(position.x, position.y, position.z);
		this.targetObject.rotation.set(rotation.x, rotation.y, rotation.z);
		if (scale) this.targetObject.scale.set(scale.x, scale.y, scale.z);
	}
	applyModelTransform(transform) {
		if (!this.targetObject) return;
		this.targetObject.position.set(transform.position.x, transform.position.y, transform.position.z);
		this.targetObject.quaternion.set(transform.quaternion.x, transform.quaternion.y, transform.quaternion.z, transform.quaternion.w);
		this.targetObject.scale.set(transform.scale.x, transform.scale.y, transform.scale.z);
		this.onTransformChange?.();
	}
	getInitialTransform() {
		return {
			position: {
				x: this.initialPosition.x,
				y: this.initialPosition.y,
				z: this.initialPosition.z
			},
			rotation: {
				x: this.initialRotation.x,
				y: this.initialRotation.y,
				z: this.initialRotation.z
			},
			scale: {
				x: this.initialScale.x,
				y: this.initialScale.y,
				z: this.initialScale.z
			}
		};
	}
	getTransform() {
		if (!this.targetObject) return {
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
		return {
			position: {
				x: this.targetObject.position.x,
				y: this.targetObject.position.y,
				z: this.targetObject.position.z
			},
			rotation: {
				x: this.targetObject.rotation.x,
				y: this.targetObject.rotation.y,
				z: this.targetObject.rotation.z
			},
			scale: {
				x: this.targetObject.scale.x,
				y: this.targetObject.scale.y,
				z: this.targetObject.scale.z
			}
		};
	}
	getModelInfo() {
		const object = this.targetObject;
		if (!object) return null;
		return {
			position: {
				x: object.position.x,
				y: object.position.y,
				z: object.position.z
			},
			quaternion: {
				x: object.quaternion.x,
				y: object.quaternion.y,
				z: object.quaternion.z,
				w: object.quaternion.w
			},
			scale: {
				x: object.scale.x,
				y: object.scale.y,
				z: object.scale.z
			}
		};
	}
	dispose() {
		if (this.transformControls) {
			const helper = this.transformControls.getHelper();
			this.scene.remove(helper);
			this.transformControls.detach();
			this.transformControls.dispose();
			this.transformControls = null;
		}
		this.targetObject = null;
	}
};
window.comfyAPI = window.comfyAPI || {};
window.comfyAPI.GizmoManager = window.comfyAPI.GizmoManager || {};
window.comfyAPI.GizmoManager.GizmoManager = GizmoManager;
//#endregion
//#region src/extensions/core/load3d/HDRIManager.ts
var HDRIManager = class {
	scene;
	viewState;
	pmremGenerator;
	eventManager;
	hdriTexture = null;
	envMapTarget = null;
	_isEnabled = false;
	_showAsBackground = false;
	_intensity = 1;
	get isEnabled() {
		return this._isEnabled;
	}
	get showAsBackground() {
		return this._showAsBackground;
	}
	get intensity() {
		return this._intensity;
	}
	constructor(scene, renderer, viewState, eventManager) {
		this.scene = scene;
		this.viewState = viewState;
		this.pmremGenerator = new PMREMGenerator(renderer);
		this.pmremGenerator.compileEquirectangularShader();
		this.eventManager = eventManager;
	}
	async loadHDRI(url) {
		const ext = Load3dUtils.getFilenameExtension(url);
		let newTexture;
		if (ext === "exr") newTexture = await new Promise((resolve, reject) => {
			new EXRLoader().load(url, resolve, void 0, reject);
		});
		else newTexture = await new Promise((resolve, reject) => {
			new RGBELoader().load(url, resolve, void 0, reject);
		});
		newTexture.mapping = 303;
		const newEnvMapTarget = this.pmremGenerator.fromEquirectangular(newTexture);
		this.hdriTexture?.dispose();
		this.envMapTarget?.dispose();
		this.hdriTexture = newTexture;
		this.envMapTarget = newEnvMapTarget;
		if (this._isEnabled) this.applyToScene();
	}
	setEnabled(enabled) {
		this._isEnabled = enabled;
		if (enabled) {
			if (this.envMapTarget) this.applyToScene();
		} else this.removeFromScene();
	}
	setShowAsBackground(show) {
		this._showAsBackground = show;
		if (this._isEnabled && this.envMapTarget) this.applyToScene();
	}
	setIntensity(intensity) {
		this._intensity = intensity;
		if (this._isEnabled) this.scene.environmentIntensity = intensity;
	}
	applyToScene() {
		const envMap = this.envMapTarget?.texture;
		if (!envMap) return;
		this.scene.environment = envMap;
		this.scene.environmentIntensity = this._intensity;
		this.scene.background = this._showAsBackground ? this.hdriTexture : null;
		this.viewState.toneMapping = 4;
		this.viewState.toneMappingExposure = 1;
		this.eventManager.emitEvent("hdriChange", {
			enabled: this._isEnabled,
			showAsBackground: this._showAsBackground
		});
	}
	removeFromScene() {
		this.scene.environment = null;
		if (this.scene.background === this.hdriTexture) this.scene.background = null;
		this.viewState.toneMapping = 0;
		this.viewState.toneMappingExposure = 1;
		this.eventManager.emitEvent("hdriChange", {
			enabled: false,
			showAsBackground: this._showAsBackground
		});
	}
	clearResources() {
		this.removeFromScene();
		this.hdriTexture?.dispose();
		this.envMapTarget?.dispose();
		this.hdriTexture = null;
		this.envMapTarget = null;
	}
	clear() {
		this.clearResources();
		this._isEnabled = false;
	}
	dispose() {
		this.clearResources();
		this.pmremGenerator.dispose();
	}
};
window.comfyAPI = window.comfyAPI || {};
window.comfyAPI.HDRIManager = window.comfyAPI.HDRIManager || {};
window.comfyAPI.HDRIManager.HDRIManager = HDRIManager;
//#endregion
//#region src/extensions/core/load3d/ModelExporter.ts
var ModelExporter = class ModelExporter {
	static detectFormatFromURL(url) {
		try {
			const filenameParam = new URLSearchParams(url.split("?")[1]).get("filename");
			if (filenameParam) return filenameParam.split(".").pop()?.toLowerCase() || null;
		} catch (e) {
			console.error("Error parsing URL:", e);
		}
		return null;
	}
	static canUseDirectURL(url, format) {
		if (!url) return false;
		const urlFormat = ModelExporter.detectFormatFromURL(url);
		if (!urlFormat) return false;
		return urlFormat.toLowerCase() === format.toLowerCase();
	}
	static async downloadFromURL(url, desiredFilename) {
		try {
			const response = await fetch(url);
			if (!response.ok) throw new Error(`Failed to download file (HTTP ${response.status})`);
			const blob = await response.blob();
			downloadBlob(desiredFilename, blob);
		} catch (error) {
			console.error("Error downloading from URL:", error);
			useToastStore().addAlert(t("toastMessages.failedToDownloadFile"));
			throw error;
		}
	}
	static async exportGLB(model, filename = "model.glb", originalURL) {
		if (originalURL && ModelExporter.canUseDirectURL(originalURL, "glb")) return ModelExporter.downloadFromURL(originalURL, filename);
		const exporter = new GLTFExporter();
		try {
			await new Promise((resolve) => setTimeout(resolve, 50));
			const result = await new Promise((resolve, reject) => {
				exporter.parse(model, (gltf) => {
					resolve(gltf);
				}, (error) => {
					reject(error);
				}, { binary: true });
			});
			await new Promise((resolve) => setTimeout(resolve, 50));
			ModelExporter.saveArrayBuffer(result, filename);
		} catch (error) {
			console.error("Error exporting GLB:", error);
			useToastStore().addAlert(t("toastMessages.failedToExportModel", { format: "GLB" }));
			throw error;
		}
	}
	static async exportOBJ(model, filename = "model.obj", originalURL) {
		if (originalURL && ModelExporter.canUseDirectURL(originalURL, "obj")) return ModelExporter.downloadFromURL(originalURL, filename);
		const exporter = new OBJExporter();
		try {
			await new Promise((resolve) => setTimeout(resolve, 50));
			const result = exporter.parse(model);
			await new Promise((resolve) => setTimeout(resolve, 50));
			ModelExporter.saveString(result, filename);
		} catch (error) {
			console.error("Error exporting OBJ:", error);
			useToastStore().addAlert(t("toastMessages.failedToExportModel", { format: "OBJ" }));
			throw error;
		}
	}
	static async exportFBX(model, filename = "model.fbx", originalURL) {
		if (originalURL && ModelExporter.canUseDirectURL(originalURL, "fbx")) return ModelExporter.downloadFromURL(originalURL, filename);
		const exporter = new FBXExporter();
		try {
			await new Promise((resolve) => setTimeout(resolve, 50));
			const bytes = await exporter.parseAsync(model);
			await new Promise((resolve) => setTimeout(resolve, 50));
			ModelExporter.saveArrayBuffer(bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength), filename);
		} catch (error) {
			console.error("Error exporting FBX:", error);
			useToastStore().addAlert(t("toastMessages.failedToExportModel", { format: "FBX" }));
			throw error;
		}
	}
	static async exportSTL(model, filename = "model.stl", originalURL) {
		if (originalURL && ModelExporter.canUseDirectURL(originalURL, "stl")) return ModelExporter.downloadFromURL(originalURL, filename);
		const exporter = new STLExporter();
		try {
			await new Promise((resolve) => setTimeout(resolve, 50));
			const result = exporter.parse(model);
			await new Promise((resolve) => setTimeout(resolve, 50));
			ModelExporter.saveString(result, filename);
		} catch (error) {
			console.error("Error exporting STL:", error);
			useToastStore().addAlert(t("toastMessages.failedToExportModel", { format: "STL" }));
			throw error;
		}
	}
	static async exportDirect(originalURL, filename, format) {
		if (!originalURL) throw new Error(`No source file available to export as ${format}`);
		return ModelExporter.downloadFromURL(originalURL, filename);
	}
	static saveArrayBuffer(buffer, filename) {
		const blob = new Blob([buffer], { type: "application/octet-stream" });
		downloadBlob(filename, blob);
	}
	static saveString(text, filename) {
		const blob = new Blob([text], { type: "text/plain" });
		downloadBlob(filename, blob);
	}
};
window.comfyAPI = window.comfyAPI || {};
window.comfyAPI.ModelExporter = window.comfyAPI.ModelExporter || {};
window.comfyAPI.ModelExporter.ModelExporter = ModelExporter;
//#endregion
//#region src/extensions/core/load3d/ModelAdapter.ts
var DEFAULT_MODEL_CAPABILITIES = {
	fitToViewer: true,
	requiresMaterialRebuild: false,
	gizmoTransform: true,
	lighting: true,
	exportable: true,
	materialModes: [
		"original",
		"clay",
		"normal",
		"wireframe"
	],
	fitTargetSize: 5
};
var createAdapterRef = () => ({
	current: null,
	capabilities: null
});
async function fetchModelData(path, filename) {
	const route = "/" + path.replace(/^api\//, "") + encodeURIComponent(filename);
	const response = await api.fetchApi(route);
	if (!response.ok) throw new Error(`Failed to fetch model: ${response.status}`);
	return response.arrayBuffer();
}
window.comfyAPI = window.comfyAPI || {};
window.comfyAPI.ModelAdapter = window.comfyAPI.ModelAdapter || {};
window.comfyAPI.ModelAdapter.DEFAULT_MODEL_CAPABILITIES = DEFAULT_MODEL_CAPABILITIES;
window.comfyAPI.ModelAdapter.createAdapterRef = createAdapterRef;
window.comfyAPI.ModelAdapter.fetchModelData = fetchModelData;
//#endregion
//#region src/extensions/core/load3d/quadWireframe/adoptClonedModel.ts
function meshesOf(root) {
	const meshes = [];
	root.traverse((child) => {
		if (child instanceof Mesh) meshes.push(child);
	});
	return meshes;
}
function adoptClonedModel(clone, source, sourceOriginals, cloneOriginals) {
	const overlays = [];
	clone.traverse((child) => {
		if (child instanceof QuadWireframeOverlay) overlays.push(child);
	});
	for (const overlay of overlays) overlay.removeFromParent();
	const sourceMeshes = meshesOf(source);
	meshesOf(clone).forEach((mesh, i) => {
		const original = sourceOriginals.get(sourceMeshes[i]) ?? mesh.material;
		mesh.material = original;
		cloneOriginals?.set(mesh, original);
	});
}
window.comfyAPI = window.comfyAPI || {};
window.comfyAPI.adoptClonedModel = window.comfyAPI.adoptClonedModel || {};
window.comfyAPI.adoptClonedModel.adoptClonedModel = adoptClonedModel;
//#endregion
//#region src/extensions/core/load3d/cameraFromMatrices.ts
function computeCameraFromMatrices(extrinsics, intrinsics) {
	assertMatrixShape(extrinsics, 4, 4, "extrinsics");
	assertMatrixShape(intrinsics, 3, 3, "intrinsics");
	const r00 = extrinsics[0][0];
	const r01 = extrinsics[0][1];
	const r02 = extrinsics[0][2];
	const r10 = extrinsics[1][0];
	const r11 = extrinsics[1][1];
	const r12 = extrinsics[1][2];
	const r20 = extrinsics[2][0];
	const r21 = extrinsics[2][1];
	const r22 = extrinsics[2][2];
	const tx = extrinsics[0][3];
	const ty = extrinsics[1][3];
	const tz = extrinsics[2][3];
	const posX = -(r00 * tx + r10 * ty + r20 * tz);
	const posY = -(r01 * tx + r11 * ty + r21 * tz);
	const posZ = -(r02 * tx + r12 * ty + r22 * tz);
	const targetX = posX + r20;
	const targetY = posY + r21;
	const targetZ = posZ + r22;
	const fy = intrinsics[1][1];
	const cy = intrinsics[1][2];
	if (!Number.isFinite(fy) || fy === 0) throw new Error(`intrinsics[1][1] (fy) must be a non-zero finite number, got ${fy}`);
	const fovYDegrees = 2 * Math.atan(cy / fy) * 180 / Math.PI;
	return {
		position: [
			posX,
			-posY,
			-posZ
		],
		target: [
			targetX,
			-targetY,
			-targetZ
		],
		fovYDegrees
	};
}
function assertMatrixShape(matrix, rows, cols, name) {
	if (matrix.length !== rows) throw new Error(`${name} must be ${rows}x${cols}, got ${matrix.length} rows`);
	for (let i = 0; i < rows; i++) if (matrix[i].length !== cols) throw new Error(`${name} row ${i} must have ${cols} columns, got ${matrix[i].length}`);
}
window.comfyAPI = window.comfyAPI || {};
window.comfyAPI.cameraFromMatrices = window.comfyAPI.cameraFromMatrices || {};
window.comfyAPI.cameraFromMatrices.computeCameraFromMatrices = computeCameraFromMatrices;
//#endregion
//#region src/extensions/core/load3d/Load3d.ts
function positionThumbnailCamera(camera, box) {
	const size = box.getSize(new Vector3());
	const center = box.getCenter(new Vector3());
	const distance = Math.max(size.x, size.y, size.z) * 1.5;
	camera.position.set(center.x + distance * .7, center.y + distance * .5, center.z + distance * .7);
	camera.lookAt(center);
	camera.updateProjectionMatrix();
}
var Load3d = class extends Viewport3d {
	hdriManager;
	loaderManager;
	modelManager;
	recordingManager;
	animationManager;
	gizmoManager;
	adapterRef;
	configurationCleanup;
	loadingPromise = null;
	_loadGeneration = 0;
	hasLoadedModel = false;
	thumbnailCaptureQueue = Promise.resolve();
	constructor(container, deps, options = {}) {
		super(container, deps, options);
		this.hdriManager = deps.hdriManager;
		this.loaderManager = deps.loaderManager;
		this.modelManager = deps.modelManager;
		this.recordingManager = deps.recordingManager;
		this.animationManager = deps.animationManager;
		this.gizmoManager = deps.gizmoManager;
		this.adapterRef = deps.adapterRef;
		this.loaderManager.init();
		this.animationManager.init();
		this.gizmoManager.setPointerNdcSource((clientX, clientY) => this.clientPointToNdc(clientX, clientY));
		this.gizmoManager.init();
		this.eventManager.addEventListener("modelReady", () => {
			if (this.adapterRef.current?.kind !== "splat") return;
			this.repaintWhenSparkPaintable();
		});
		this.start();
	}
	async repaintWhenSparkPaintable() {
		const sortComplete = this.sceneManager.awaitNextSparkDirty();
		this.forceRender();
		await sortComplete;
		this.forceRender();
	}
	getLoaderManager() {
		return this.loaderManager;
	}
	getModelManager() {
		return this.modelManager;
	}
	getRecordingManager() {
		return this.recordingManager;
	}
	getGizmoManager() {
		return this.gizmoManager;
	}
	tickPerFrame(delta) {
		this.animationManager.update(delta);
		super.tickPerFrame(delta);
	}
	isActive() {
		return isLoad3dActive({
			mouseOnNode: this.STATUS_MOUSE_ON_NODE,
			mouseOnScene: this.STATUS_MOUSE_ON_SCENE,
			mouseOnViewer: this.STATUS_MOUSE_ON_VIEWER,
			recording: this.isRecording(),
			initialRenderDone: this.INITIAL_RENDER_DONE,
			animationPlaying: this.animationManager.isAnimationPlaying
		});
	}
	async exportModel(format) {
		if (!this.modelManager.currentModel) throw new Error("No model to export");
		const exportMessage = `Exporting as ${format.toUpperCase()}...`;
		this.eventManager.emitEvent("exportLoadingStart", exportMessage);
		const filename = `${this.modelManager.originalFileName || "model"}.${format}`;
		const originalURL = this.modelManager.originalURL;
		if (DIRECT_EXPORT_FORMATS.has(format)) {
			try {
				if (this.getSourceFormat() !== format) throw new Error(`Cannot export ${format} without converting from the loaded ${this.getSourceFormat() ?? "unknown"} source`);
				await ModelExporter.exportDirect(originalURL, filename, format);
			} catch (error) {
				console.error(`Error exporting model as ${format}:`, error);
				throw error;
			} finally {
				this.eventManager.emitEvent("exportLoadingEnd", null);
			}
			return;
		}
		const source = this.modelManager.currentModel;
		const savedPos = source.position.clone();
		const savedRot = source.rotation.clone();
		const savedScale = source.scale.clone();
		source.position.set(0, 0, 0);
		source.rotation.set(0, 0, 0);
		source.scale.set(1, 1, 1);
		source.updateMatrixWorld(true);
		try {
			const original = this.modelManager.originalModel;
			const clipsFromOriginal = original && "animations" in original && Array.isArray(original.animations) ? original.animations : [];
			const clips = source.animations.length ? source.animations : clipsFromOriginal;
			const model = format === "fbx" ? Object.assign(clone(source), { animations: clips }) : source.clone();
			adoptClonedModel(model, source, this.modelManager.originalMaterials);
			await new Promise((resolve) => setTimeout(resolve, 10));
			switch (format) {
				case "glb":
					await ModelExporter.exportGLB(model, filename, originalURL);
					break;
				case "obj":
					await ModelExporter.exportOBJ(model, filename, originalURL);
					break;
				case "stl":
					await ModelExporter.exportSTL(model, filename, originalURL);
					break;
				case "fbx":
					await ModelExporter.exportFBX(model, filename, originalURL);
					break;
				default: throw new Error(`Unsupported export format: ${format}`);
			}
			await new Promise((resolve) => setTimeout(resolve, 10));
		} catch (error) {
			console.error(`Error exporting model as ${format}:`, error);
			throw error;
		} finally {
			source.position.copy(savedPos);
			source.rotation.copy(savedRot);
			source.scale.copy(savedScale);
			source.updateMatrixWorld(true);
			this.eventManager.emitEvent("exportLoadingEnd", null);
		}
	}
	getSourceFormat() {
		const url = this.modelManager.originalURL;
		if (!url) return null;
		return ModelExporter.detectFormatFromURL(url);
	}
	onActiveCameraChanged() {
		this.gizmoManager.updateCamera(this.cameraManager.activeCamera);
	}
	setFOV(fov) {
		this.cameraManager.setFOV(fov);
		this.forceRender();
	}
	setBackgroundColor(color) {
		this.sceneManager.setBackgroundColor(color);
		this.forceRender();
	}
	toggleGrid(showGrid) {
		this.sceneManager.toggleGrid(showGrid);
		this.forceRender();
	}
	setLightIntensity(intensity) {
		this.lightingManager.setLightIntensity(intensity);
		this.forceRender();
	}
	async setBackgroundImage(uploadPath) {
		await this.sceneManager.setBackgroundImage(uploadPath);
		if (this.sceneManager.backgroundTexture && this.sceneManager.backgroundMesh) {
			const containerWidth = this.domElement.clientWidth;
			const containerHeight = this.domElement.clientHeight;
			if (this.shouldMaintainAspectRatio()) {
				const { width, height } = computeLetterboxedViewport({
					width: containerWidth,
					height: containerHeight
				}, this.targetAspectRatio);
				this.sceneManager.updateBackgroundSize(this.sceneManager.backgroundTexture, this.sceneManager.backgroundMesh, width, height);
			} else this.sceneManager.updateBackgroundSize(this.sceneManager.backgroundTexture, this.sceneManager.backgroundMesh, containerWidth, containerHeight);
		}
		this.forceRender();
	}
	removeBackgroundImage() {
		this.sceneManager.removeBackgroundImage();
		this.forceRender();
	}
	setBackgroundRenderMode(mode) {
		this.sceneManager.setBackgroundRenderMode(mode);
		this.forceRender();
	}
	setCameraFromMatrices(extrinsics, intrinsics) {
		const { position, target, fovYDegrees } = computeCameraFromMatrices(extrinsics, intrinsics);
		const current = this.cameraManager.getCameraState();
		this.setCameraState({
			position: new Vector3(position[0], position[1], position[2]),
			target: new Vector3(target[0], target[1], target[2]),
			zoom: current.zoom,
			cameraType: current.cameraType
		});
		this.setFOV(fovYDegrees);
	}
	getCurrentModel() {
		return this.modelManager.currentModel;
	}
	setMaterialMode(mode) {
		this.modelManager.setMaterialMode(mode);
		this.forceRender();
	}
	get currentLoadGeneration() {
		return this._loadGeneration;
	}
	async loadModel(url, originalFileName, options) {
		this._loadGeneration += 1;
		const loadGeneration = this._loadGeneration;
		const previousLoad = this.loadingPromise;
		const acceptedLoad = (async () => {
			try {
				await previousLoad;
			} catch {}
			try {
				await this._loadModelInternal(url, originalFileName, options);
			} finally {
				if (loadGeneration !== this._loadGeneration) this.clearModelState();
			}
			return loadGeneration === this._loadGeneration;
		})();
		this.loadingPromise = acceptedLoad;
		try {
			return await acceptedLoad;
		} finally {
			if (this.loadingPromise === acceptedLoad) this.loadingPromise = null;
		}
	}
	async whenLoadIdle() {
		let last = null;
		while (this.loadingPromise && this.loadingPromise !== last) {
			last = this.loadingPromise;
			try {
				await last;
			} catch {}
		}
	}
	async _loadModelInternal(url, originalFileName, options) {
		const shouldRetainView = this.hasLoadedModel;
		const savedCameraState = shouldRetainView ? this.cameraManager.getCameraState() : null;
		if (!shouldRetainView) {
			this.cameraManager.reset();
			this.controlsManager.reset();
		}
		this.gizmoManager.detach();
		this.modelManager.clearModel();
		this.animationManager.dispose();
		await this.loaderManager.loadModel(url, originalFileName, options);
		if (this.modelManager.currentModel) {
			this.animationManager.setupModelAnimations(this.modelManager.currentModel, this.modelManager.originalModel);
			this.hasLoadedModel = true;
		}
		if (savedCameraState) {
			if (savedCameraState.cameraType !== this.cameraManager.getCurrentCameraType()) this.toggleCamera(savedCameraState.cameraType);
			this.cameraManager.setCameraState(savedCameraState);
		}
		this.handleResize();
	}
	isSplatModel() {
		return this.adapterRef.current?.kind === "splat";
	}
	isPlyModel() {
		return this.adapterRef.current?.kind === "pointCloud";
	}
	getCurrentModelCapabilities() {
		return this.adapterRef.capabilities ?? DEFAULT_MODEL_CAPABILITIES;
	}
	clearModel() {
		this._loadGeneration += 1;
		this.clearModelState();
	}
	clearModelState() {
		this.animationManager.dispose();
		this.gizmoManager.detach();
		this.modelManager.clearModel();
		this.adapterRef.current = null;
		this.hasLoadedModel = false;
		this.forceRender();
	}
	setUpDirection(direction) {
		this.modelManager.setUpDirection(direction);
		this.forceRender();
	}
	async loadHDRI(url) {
		await this.hdriManager.loadHDRI(url);
		this.forceRender();
	}
	setHDRIEnabled(enabled) {
		this.hdriManager.setEnabled(enabled);
		this.lightingManager.setHDRIMode(enabled);
		this.forceRender();
	}
	setHDRIAsBackground(show) {
		this.hdriManager.setShowAsBackground(show);
		this.forceRender();
	}
	setHDRIIntensity(intensity) {
		this.hdriManager.setIntensity(intensity);
		this.forceRender();
	}
	clearHDRI() {
		this.hdriManager.clear();
		this.lightingManager.setHDRIMode(false);
		this.forceRender();
	}
	emitModelReady() {
		this.eventManager.emitEvent("modelReady", null);
	}
	captureScene(width, height) {
		this.gizmoManager.removeFromScene();
		return this.sceneManager.captureScene(width, height).finally(() => {
			this.gizmoManager.ensureHelperInScene();
		});
	}
	async startRecording() {
		this.viewHelperManager.visibleViewHelper(false);
		return this.recordingManager.startRecording(this.targetWidth, this.targetHeight);
	}
	stopRecording() {
		this.viewHelperManager.visibleViewHelper(true);
		this.recordingManager.stopRecording();
		this.eventManager.emitEvent("recordingStatusChange", false);
	}
	isRecording() {
		return this.recordingManager.getIsRecording();
	}
	getRecordingDuration() {
		return this.recordingManager.getRecordingDuration();
	}
	getRecordingData() {
		return this.recordingManager.getRecordingData();
	}
	exportRecording(filename) {
		this.recordingManager.exportRecording(filename);
	}
	clearRecording() {
		this.recordingManager.clearRecording();
	}
	setAnimationSpeed(speed) {
		this.animationManager.setAnimationSpeed(speed);
	}
	updateSelectedAnimation(index) {
		this.animationManager.updateSelectedAnimation(index);
	}
	toggleAnimation(play) {
		this.animationManager.toggleAnimation(play);
	}
	hasAnimations() {
		return this.animationManager.animationClips.length > 0;
	}
	hasSkeleton() {
		return this.modelManager.hasSkeleton();
	}
	setShowSkeleton(show) {
		this.modelManager.setShowSkeleton(show);
		this.forceRender();
	}
	getShowSkeleton() {
		return this.modelManager.showSkeleton;
	}
	getAnimationTime() {
		return this.animationManager.getAnimationTime();
	}
	getAnimationDuration() {
		return this.animationManager.getAnimationDuration();
	}
	setAnimationTime(time) {
		this.animationManager.setAnimationTime(time);
		this.forceRender();
	}
	captureThumbnail(width = 256, height = 256) {
		const capture = this.thumbnailCaptureQueue.then(() => this.captureThumbnailNow(width, height));
		this.thumbnailCaptureQueue = capture.catch(() => {});
		return capture;
	}
	async captureThumbnailNow(width, height) {
		if (!this.modelManager.currentModel) throw new Error("No model loaded for thumbnail capture");
		const savedState = this.cameraManager.getCameraState();
		const savedCameraType = this.cameraManager.getCurrentCameraType();
		const savedGridVisible = this.sceneManager.gridHelper.visible;
		try {
			this.sceneManager.gridHelper.visible = false;
			if (savedCameraType !== "perspective") this.cameraManager.toggleCamera("perspective");
			const box = this.modelManager.getCurrentBounds() ?? new Box3().setFromObject(this.modelManager.currentModel);
			positionThumbnailCamera(this.cameraManager.perspectiveCamera, box);
			this.controlsManager.controls.target.copy(box.getCenter(new Vector3()));
			this.controlsManager.controls.update();
			if (this.isSplatModel()) await this.sceneManager.whenSplatsSorted(this.cameraManager.perspectiveCamera);
			return (await this.captureScene(width, height)).scene;
		} finally {
			this.sceneManager.gridHelper.visible = savedGridVisible;
			if (savedCameraType !== "perspective") this.cameraManager.toggleCamera(savedCameraType);
			this.cameraManager.setCameraState(savedState);
			this.controlsManager.controls.update();
			this.forceRender();
		}
	}
	setGizmoEnabled(enabled) {
		if (enabled && !this.getCurrentModelCapabilities().gizmoTransform) return;
		this.gizmoManager.setEnabled(enabled);
		this.forceRender();
	}
	setGizmoMode(mode) {
		if (!this.getCurrentModelCapabilities().gizmoTransform) return;
		this.gizmoManager.setMode(mode);
		this.forceRender();
	}
	resetGizmoTransform() {
		if (!this.getCurrentModelCapabilities().gizmoTransform) return;
		this.gizmoManager.reset();
		this.forceRender();
	}
	applyGizmoTransform(position, rotation, scale) {
		if (!this.getCurrentModelCapabilities().gizmoTransform) return;
		this.gizmoManager.applyTransform(position, rotation, scale);
		this.forceRender();
	}
	applyModelTransform(transform) {
		if (!this.getCurrentModelCapabilities().gizmoTransform) return;
		this.gizmoManager.applyModelTransform(transform);
		this.forceRender();
	}
	getGizmoTransform() {
		return this.gizmoManager.getTransform();
	}
	getModelInfo() {
		return this.gizmoManager.getModelInfo();
	}
	fitToViewer() {
		this.modelManager.fitToViewer();
		this.forceRender();
	}
	centerCameraOnModel() {
		const bounds = this.modelManager.getCurrentBounds();
		if (!bounds || bounds.isEmpty()) return;
		const center = bounds.getCenter(new Vector3());
		const camera = this.cameraManager.activeCamera;
		const controls = this.controlsManager.controls;
		const offset = center.clone().sub(camera.position);
		camera.position.add(offset);
		controls.target.add(offset);
		camera.updateMatrixWorld(true);
		controls.update();
		this.forceRender();
	}
	setConfigurationCleanup(cleanup) {
		this.clearConfigurationCleanup();
		this.configurationCleanup = cleanup;
	}
	clearConfigurationCleanup() {
		this.configurationCleanup?.();
		this.configurationCleanup = void 0;
	}
	disposeManagers() {
		this.clearConfigurationCleanup();
		super.disposeManagers();
		this.hdriManager.dispose();
		this.loaderManager.dispose();
		this.modelManager.dispose();
		this.adapterRef.current = null;
		this.recordingManager.dispose();
		this.animationManager.dispose();
		this.gizmoManager.dispose();
	}
};
//#endregion
//#region src/extensions/core/load3d/MeshModelAdapter.ts
var MeshModelAdapter = class {
	kind = "mesh";
	extensions = [
		"stl",
		"fbx",
		"obj",
		"gltf",
		"glb"
	];
	capabilities = {
		fitToViewer: true,
		requiresMaterialRebuild: false,
		gizmoTransform: true,
		lighting: true,
		exportable: true,
		materialModes: [
			"original",
			"clay",
			"normal",
			"wireframe"
		],
		fitTargetSize: 5
	};
	gltfLoader = new GLTFLoader();
	objLoader;
	mtlLoader = new MTLLoader();
	fbxLoader = new FBXLoader();
	stlLoader = new STLLoader();
	constructor() {
		this.objLoader = new OBJLoader2Parallel();
		this.objLoader.setWorkerUrl(true, new URL(OBJLoader2WorkerModule_default, import.meta.url));
	}
	async load(ctx, path, filename, fetchBytes) {
		const extension = filename.split(".").pop()?.toLowerCase();
		const object = await (extension === "stl" ? this.loadSTL(ctx, path, filename) : extension === "fbx" ? this.loadFBX(ctx, path, filename, fetchBytes) : extension === "obj" ? this.loadOBJ(ctx, path, filename) : extension === "gltf" || extension === "glb" ? this.loadGLTF(ctx, path, filename) : Promise.resolve(null));
		return object ? {
			object,
			capabilities: this.capabilities
		} : null;
	}
	async loadSTL(ctx, path, filename) {
		this.stlLoader.setPath(path);
		const geometry = await this.stlLoader.loadAsync(filename);
		ctx.setOriginalModel(geometry);
		geometry.computeVertexNormals();
		const mesh = new Mesh(geometry, ctx.standardMaterial);
		const group = new Group();
		group.add(mesh);
		return group;
	}
	async loadFBX(ctx, path, filename, fetchBytes) {
		this.fbxLoader.setPath(path);
		const bytes = fetchBytes ? await fetchBytes() : null;
		const fbxModel = bytes ? this.fbxLoader.parse(bytes, path) : await this.fbxLoader.loadAsync(filename);
		ctx.setOriginalModel(fbxModel);
		const polygons = bytes && isBinaryFbx(bytes) ? readFbxPolygons(bytes) : [];
		fbxModel.traverse((child) => {
			if (child instanceof Mesh) {
				ctx.registerOriginalMaterial(child, child.material);
				if (child instanceof SkinnedMesh) child.frustumCulled = false;
				const faceSizes = matchFbxPolygons(polygons, child.geometry);
				if (faceSizes) registerFaceSizes(child.geometry, faceSizes);
			}
		});
		return fbxModel;
	}
	async loadOBJ(ctx, path, filename) {
		this.objLoader.setBaseObject3d(new Object3D());
		if (ctx.materialMode === "original") try {
			this.mtlLoader.setPath(path);
			const mtlFileName = filename.replace(/\.obj$/i, ".mtl");
			const materials = await this.mtlLoader.loadAsync(mtlFileName);
			materials.preload();
			const materialsFromMtl = MtlObjBridge.addMaterialsFromMtlLoader(materials);
			this.objLoader.setMaterials(materialsFromMtl);
		} catch {
			console.warn("No MTL file found or error loading it, continuing without materials");
		}
		const objUrl = path + encodeURIComponent(filename);
		const model = await this.objLoader.loadAsync(objUrl);
		model.traverse((child) => {
			if (child instanceof Mesh) ctx.registerOriginalMaterial(child, child.material);
		});
		return model;
	}
	async loadGLTF(ctx, path, filename) {
		this.gltfLoader.setPath(path);
		const gltf = await this.gltfLoader.loadAsync(filename);
		ctx.setOriginalModel(gltf);
		gltf.scene.traverse((child) => {
			if (child instanceof Mesh) {
				child.geometry.computeVertexNormals();
				ctx.registerOriginalMaterial(child, child.material);
				if (child instanceof SkinnedMesh) child.frustumCulled = false;
				if (hasNgonEncoding(child)) registerFaceSizes(child.geometry, ngonEncodedFaceSizes(child.geometry));
			}
		});
		return gltf.scene;
	}
};
window.comfyAPI = window.comfyAPI || {};
window.comfyAPI.MeshModelAdapter = window.comfyAPI.MeshModelAdapter || {};
window.comfyAPI.MeshModelAdapter.MeshModelAdapter = MeshModelAdapter;
//#endregion
//#region src/scripts/metadata/ply.ts
function parsePLYHeader(lines) {
	let vertexCount = 0;
	let headerEndLine = 0;
	let hasColor = false;
	let xIndex = -1;
	let yIndex = -1;
	let zIndex = -1;
	let redIndex = -1;
	let greenIndex = -1;
	let blueIndex = -1;
	let propertyIndex = 0;
	for (let i = 0; i < lines.length; i++) {
		const line = lines[i].trim();
		if (line.startsWith("element vertex")) vertexCount = parseInt(line.split(/\s+/)[2]);
		else if (line.startsWith("property")) {
			const parts = line.split(/\s+/);
			const propName = parts[parts.length - 1];
			if (propName === "x") xIndex = propertyIndex;
			else if (propName === "y") yIndex = propertyIndex;
			else if (propName === "z") zIndex = propertyIndex;
			else if (propName === "red") {
				hasColor = true;
				redIndex = propertyIndex;
			} else if (propName === "green") greenIndex = propertyIndex;
			else if (propName === "blue") blueIndex = propertyIndex;
			propertyIndex++;
		} else if (line === "end_header") {
			headerEndLine = i;
			break;
		}
	}
	if (vertexCount === 0 || xIndex < 0 || yIndex < 0 || zIndex < 0) return null;
	return {
		vertexCount,
		hasColor,
		propertyIndices: {
			x: xIndex,
			y: yIndex,
			z: zIndex,
			red: redIndex,
			green: greenIndex,
			blue: blueIndex
		},
		headerEndLine
	};
}
function parsePLYVertices(lines, header) {
	const { vertexCount, hasColor, propertyIndices, headerEndLine } = header;
	const { x: xIndex, y: yIndex, z: zIndex } = propertyIndices;
	const { red: redIndex, green: greenIndex, blue: blueIndex } = propertyIndices;
	const positions = new Float32Array(vertexCount * 3);
	const colors = hasColor ? new Float32Array(vertexCount * 3) : null;
	let vertexIndex = 0;
	for (let i = headerEndLine + 1; i < lines.length && vertexIndex < vertexCount; i++) {
		const line = lines[i].trim();
		if (!line) continue;
		const parts = line.split(/\s+/);
		if (parts.length < 3) continue;
		const posIndex = vertexIndex * 3;
		positions[posIndex] = parseFloat(parts[xIndex]);
		positions[posIndex + 1] = parseFloat(parts[yIndex]);
		positions[posIndex + 2] = parseFloat(parts[zIndex]);
		if (hasColor && colors && redIndex >= 0 && greenIndex >= 0 && blueIndex >= 0) {
			if (parts.length > Math.max(redIndex, greenIndex, blueIndex)) {
				colors[posIndex] = parseInt(parts[redIndex]) / 255;
				colors[posIndex + 1] = parseInt(parts[greenIndex]) / 255;
				colors[posIndex + 2] = parseInt(parts[blueIndex]) / 255;
			}
		}
		vertexIndex++;
	}
	return {
		positions,
		colors,
		vertexCount: vertexIndex
	};
}
/**
* Parse ASCII PLY data from an ArrayBuffer
* Returns positions and colors as typed arrays
*/
function parseASCIIPLY(arrayBuffer) {
	const lines = new TextDecoder().decode(arrayBuffer).split("\n");
	const header = parsePLYHeader(lines);
	if (!header) return null;
	return parsePLYVertices(lines, header);
}
/**
* Check if PLY data is in ASCII format
*/
function isPLYAsciiFormat(arrayBuffer) {
	return new TextDecoder().decode(arrayBuffer.slice(0, 500)).includes("format ascii");
}
var PLY_HEADER_SCAN_BYTES = 65536;
var GAUSSIAN_SPLAT_PROPERTIES = [
	"scale_0",
	"scale_1",
	"scale_2",
	"rot_0",
	"rot_1",
	"rot_2",
	"rot_3"
];
function readPLYHeaderLines(arrayBuffer) {
	const lines = new TextDecoder("latin1").decode(arrayBuffer.slice(0, PLY_HEADER_SCAN_BYTES)).split("\n").map((line) => line.trim());
	const end = lines.indexOf("end_header");
	if (lines[0] !== "ply" || end < 0) return null;
	return lines.slice(0, end);
}
function vertexPropertyNames(headerLines) {
	const names = /* @__PURE__ */ new Set();
	let inVertexElement = false;
	for (const line of headerLines) {
		const parts = line.split(/\s+/);
		if (parts[0] === "element") inVertexElement = parts[1] === "vertex";
		else if (inVertexElement && parts[0] === "property") names.add(parts[parts.length - 1]);
	}
	return names;
}
function isGaussianSplatPLY(arrayBuffer) {
	const headerLines = readPLYHeaderLines(arrayBuffer);
	if (!headerLines) return false;
	if (headerLines.some((line) => line.startsWith("format ascii"))) return false;
	const properties = vertexPropertyNames(headerLines);
	return GAUSSIAN_SPLAT_PROPERTIES.every((name) => properties.has(name));
}
window.comfyAPI = window.comfyAPI || {};
window.comfyAPI.ply = window.comfyAPI.ply || {};
window.comfyAPI.ply.parseASCIIPLY = parseASCIIPLY;
window.comfyAPI.ply.isPLYAsciiFormat = isPLYAsciiFormat;
window.comfyAPI.ply.isGaussianSplatPLY = isGaussianSplatPLY;
//#endregion
//#region src/extensions/core/load3d/loader/FastPLYLoader.ts
/**
* Fast ASCII PLY Loader
* Optimized for simple ASCII PLY files with position and color data
* 4-5x faster than Three.js PLYLoader for ASCII files
*/
var FastPLYLoader = class {
	parse(arrayBuffer) {
		const plyData = parseASCIIPLY(arrayBuffer);
		if (!plyData) throw new Error("Failed to parse PLY data");
		const geometry = new BufferGeometry();
		geometry.setAttribute("position", new BufferAttribute(plyData.positions, 3));
		if (plyData.colors) geometry.setAttribute("color", new BufferAttribute(plyData.colors, 3));
		return geometry;
	}
};
window.comfyAPI = window.comfyAPI || {};
window.comfyAPI.FastPLYLoader = window.comfyAPI.FastPLYLoader || {};
window.comfyAPI.FastPLYLoader.FastPLYLoader = FastPLYLoader;
//#endregion
//#region src/extensions/core/load3d/PointCloudModelAdapter.ts
function getPLYEngine() {
	return useSettingStore().get("Comfy.Load3D.PLYEngine");
}
var POINT_CLOUD_CAPABILITIES = {
	fitToViewer: true,
	requiresMaterialRebuild: true,
	gizmoTransform: false,
	lighting: true,
	exportable: true,
	materialModes: [
		"original",
		"pointCloud",
		"normal",
		"wireframe"
	],
	fitTargetSize: 5
};
var PointCloudModelAdapter = class {
	kind = "pointCloud";
	extensions = ["ply"];
	capabilities = POINT_CLOUD_CAPABILITIES;
	plyLoader = new PLYLoader();
	fastPlyLoader = new FastPLYLoader();
	async load(ctx, path, filename, fetchBytes) {
		const arrayBuffer = await (fetchBytes?.() ?? fetchModelData(path, filename));
		const plyGeometry = isPLYAsciiFormat(arrayBuffer) && getPLYEngine() === "fastply" ? this.fastPlyLoader.parse(arrayBuffer) : (this.plyLoader.setPath(path), this.plyLoader.parse(arrayBuffer));
		ctx.setOriginalModel(plyGeometry);
		plyGeometry.computeVertexNormals();
		const hasVertexColors = plyGeometry.hasAttribute("color");
		const hasFaces = (plyGeometry.index?.count ?? 0) > 0;
		return {
			object: ctx.materialMode === "pointCloud" || !hasFaces ? buildPointsGroup(ctx, plyGeometry, hasVertexColors) : buildMeshGroup(ctx, plyGeometry, hasVertexColors),
			capabilities: hasFaces ? POINT_CLOUD_CAPABILITIES : {
				...POINT_CLOUD_CAPABILITIES,
				materialModes: ["pointCloud"]
			}
		};
	}
};
function buildPointsGroup(ctx, geometry, hasVertexColors) {
	geometry.computeBoundingSphere();
	if (geometry.boundingSphere) {
		const { center, radius } = geometry.boundingSphere;
		geometry.translate(-center.x, -center.y, -center.z);
		if (radius > 0) {
			const scale = 1 / radius;
			geometry.scale(scale, scale, scale);
		}
	}
	const pointMaterial = hasVertexColors ? new PointsMaterial({
		size: .005,
		vertexColors: true,
		sizeAttenuation: true
	}) : new PointsMaterial({
		size: .005,
		color: 13421772,
		sizeAttenuation: true
	});
	const points = new Points(geometry, pointMaterial);
	ctx.registerOriginalMaterial(points, pointMaterial);
	const group = new Group();
	group.add(points);
	return group;
}
function buildMeshGroup(ctx, geometry, hasVertexColors) {
	const material = hasVertexColors ? new MeshStandardMaterial({
		vertexColors: true,
		metalness: 0,
		roughness: .5,
		side: 2
	}) : ctx.standardMaterial.clone();
	if (!hasVertexColors && material instanceof MeshStandardMaterial) material.side = 2;
	const mesh = new Mesh(geometry, material);
	ctx.registerOriginalMaterial(mesh, material);
	const group = new Group();
	group.add(mesh);
	return group;
}
function buildPointCloudForMaterialMode(originalGeometry, mode, standardMaterial, originalMaterials) {
	const geometry = originalGeometry.clone();
	const hasVertexColors = geometry.hasAttribute("color");
	const ctx = {
		setOriginalModel: () => {},
		registerOriginalMaterial: (mesh, material) => originalMaterials.set(mesh, material),
		standardMaterial,
		materialMode: mode
	};
	if (mode === "pointCloud") return buildPointsGroup(ctx, geometry, hasVertexColors);
	const group = buildMeshGroup(ctx, geometry, hasVertexColors);
	if (mode === "normal" || mode === "wireframe") {
		const mesh = group.children[0];
		mesh.material = mode === "normal" ? new MeshNormalMaterial({
			flatShading: false,
			side: 2
		}) : new MeshBasicMaterial({
			color: 16777215,
			wireframe: true
		});
	}
	return group;
}
window.comfyAPI = window.comfyAPI || {};
window.comfyAPI.PointCloudModelAdapter = window.comfyAPI.PointCloudModelAdapter || {};
window.comfyAPI.PointCloudModelAdapter.PointCloudModelAdapter = PointCloudModelAdapter;
window.comfyAPI.PointCloudModelAdapter.buildPointCloudForMaterialMode = buildPointCloudForMaterialMode;
//#endregion
//#region src/extensions/core/load3d/SplatModelAdapter.ts
var SplatModelAdapter = class {
	kind = "splat";
	extensions = [
		"spz",
		"splat",
		"ksplat",
		"ply"
	];
	capabilities = {
		fitToViewer: true,
		requiresMaterialRebuild: false,
		gizmoTransform: true,
		lighting: false,
		exportable: true,
		materialModes: [],
		fitTargetSize: 20
	};
	async matches(extension, fetchBytes) {
		if (extension !== "ply") return true;
		return isGaussianSplatPLY(await fetchBytes());
	}
	async load(ctx, path, filename, fetchBytes) {
		const arrayBuffer = await (fetchBytes?.() ?? fetchModelData(path, filename));
		const splatMesh = new SplatMesh({
			fileBytes: arrayBuffer,
			fileName: filename
		});
		await splatMesh.initialized;
		splatMesh.quaternion.set(1, 0, 0, 0);
		ctx.setOriginalModel(splatMesh);
		const splatGroup = new Group();
		splatGroup.add(splatMesh);
		return {
			object: splatGroup,
			capabilities: this.capabilities
		};
	}
	computeBounds(model) {
		const splat = model.children[0];
		if (!(splat instanceof SplatMesh)) return null;
		splat.updateWorldMatrix(true, false);
		return splat.getBoundingBox(false).clone().applyMatrix4(splat.matrixWorld);
	}
	disposeModel(model) {
		model.traverse((child) => {
			if (child instanceof SplatMesh) child.dispose();
		});
	}
	defaultCameraPose() {
		return {
			size: new Vector3(5, 5, 5),
			center: new Vector3(0, 2.5, 0)
		};
	}
};
window.comfyAPI = window.comfyAPI || {};
window.comfyAPI.SplatModelAdapter = window.comfyAPI.SplatModelAdapter || {};
window.comfyAPI.SplatModelAdapter.SplatModelAdapter = SplatModelAdapter;
//#endregion
//#region src/extensions/core/load3d/LoaderManager.ts
/**
* three.js's HttpError attaches the failed `Response` to the thrown Error.
* fetchModelData throws a plain Error whose message embeds the status code.
* Detect both forms so we can keep the toast for parse / network failures
* but stay silent on 404 when the caller opted in.
*/
function isNotFoundError(error) {
	if (!(error instanceof Error)) return false;
	if ("response" in error && typeof error.response === "object" && error.response !== null && "status" in error.response && error.response.status === 404) return true;
	return /\b404\b/.test(error.message);
}
/**
* Default adapter set: mesh + splat + pointCloud. Each adapter declares the
* file extensions it owns. For shared extensions (.ply), the adapter with an
* async `matches()` tiebreaker is tried first; the unconditional adapter acts
* as the fallback — so SplatModelAdapter precedes PointCloudModelAdapter.
*/
function defaultAdapters() {
	return [
		new MeshModelAdapter(),
		new SplatModelAdapter(),
		new PointCloudModelAdapter()
	];
}
var LoaderManager = class {
	modelManager;
	eventManager;
	adapters;
	adapterRef;
	currentLoadId = 0;
	constructor(modelManager, eventManager, adapters, adapterRef) {
		this.modelManager = modelManager;
		this.eventManager = eventManager;
		this.adapters = adapters ? [...adapters] : defaultAdapters();
		this.adapterRef = adapterRef ?? createAdapterRef();
	}
	getCurrentAdapter() {
		return this.adapterRef.current;
	}
	init() {}
	dispose() {}
	async loadModel(url, originalFileName, options) {
		const loadId = ++this.currentLoadId;
		try {
			this.eventManager.emitEvent("modelLoadingStart", null);
			this.modelManager.clearModel();
			this.adapterRef.current = null;
			this.adapterRef.capabilities = null;
			this.modelManager.originalURL = url;
			let fileExtension;
			if (originalFileName) {
				fileExtension = originalFileName.split(".").pop()?.toLowerCase();
				this.modelManager.originalFileName = originalFileName.split("/").pop()?.split(".")[0] || "model";
			} else {
				const filename = new URLSearchParams(url.split("?")[1]).get("filename");
				fileExtension = filename?.split(".").pop()?.toLowerCase();
				this.modelManager.originalFileName = filename ? filename.split(".")[0] || "model" : "model";
			}
			if (!fileExtension) {
				useToastStore().addAlert(t("toastMessages.couldNotDetermineFileType"));
				return;
			}
			const result = await this.loadModelInternal(url, fileExtension);
			if (loadId !== this.currentLoadId) return;
			if (result) {
				this.adapterRef.current = result.adapter;
				this.adapterRef.capabilities = result.capabilities;
				await this.modelManager.setupModel(result.object);
			}
			this.eventManager.emitEvent("modelLoadingEnd", null);
		} catch (error) {
			if (loadId === this.currentLoadId) {
				this.eventManager.emitEvent("modelLoadingEnd", null);
				console.error("Error loading model:", error);
				if (!(options?.silentOnNotFound && isNotFoundError(error))) useToastStore().addAlert(t("toastMessages.errorLoadingModel"));
			}
		}
	}
	async pickAdapter(extension, fetchBytes) {
		const candidates = this.adapters.filter((a) => a.extensions.includes(extension));
		for (const adapter of candidates) {
			if (!adapter.matches) return adapter;
			if (await adapter.matches(extension, fetchBytes)) return adapter;
		}
		return null;
	}
	createLoadContext() {
		const mm = this.modelManager;
		return {
			setOriginalModel: (model) => mm.setOriginalModel(model),
			registerOriginalMaterial: (mesh, material) => mm.originalMaterials.set(mesh, material),
			get standardMaterial() {
				return mm.standardMaterial;
			},
			get materialMode() {
				return mm.materialMode;
			}
		};
	}
	async loadModelInternal(url, fileExtension) {
		const params = new URLSearchParams(url.split("?")[1]);
		const filename = params.get("filename");
		if (!filename) {
			console.error("Missing filename in URL:", url);
			return null;
		}
		const requestedType = params.get("type");
		const loadRootFolder = requestedType === "output" || requestedType === "temp" ? requestedType : "input";
		const subfolder = params.get("subfolder") ?? "";
		const path = "api/view?type=" + loadRootFolder + "&subfolder=" + encodeURIComponent(subfolder) + "&filename=";
		let bytesPromise = null;
		const fetchBytes = () => bytesPromise ??= fetchModelData(path, filename);
		const adapter = await this.pickAdapter(fileExtension, fetchBytes);
		if (!adapter) return null;
		const loadResult = await adapter.load(this.createLoadContext(), path, filename, fetchBytes);
		return loadResult ? {
			object: loadResult.object,
			capabilities: loadResult.capabilities,
			adapter
		} : null;
	}
};
window.comfyAPI = window.comfyAPI || {};
window.comfyAPI.LoaderManager = window.comfyAPI.LoaderManager || {};
window.comfyAPI.LoaderManager.LoaderManager = LoaderManager;
//#endregion
//#region src/extensions/core/load3d/RecordingManager.ts
var RecordingManager = class {
	mediaRecorder = null;
	recordedChunks = [];
	isRecording = false;
	recordingStream = null;
	recordingIndicator = null;
	scene;
	sourceCanvas;
	eventManager;
	recordingStartTime = 0;
	recordingDuration = 0;
	recordingCanvas = null;
	recordingContext = null;
	animationFrameId = null;
	constructor(scene, sourceCanvas, eventManager) {
		this.scene = scene;
		this.sourceCanvas = sourceCanvas;
		this.eventManager = eventManager;
		this.setupRecordingIndicator();
	}
	setupRecordingIndicator() {
		const map = new TextureLoader().load("data:image/svg+xml;base64," + btoa(`<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64">
        <circle cx="32" cy="32" r="24" fill="#4CAF50" opacity="0.8" />
        <circle cx="32" cy="32" r="16" fill="#2E7D32" opacity="0.8" />
      </svg>`));
		const material = new SpriteMaterial({
			map,
			transparent: true,
			depthTest: false,
			depthWrite: false
		});
		this.recordingIndicator = new Sprite(material);
		this.recordingIndicator.scale.set(.5, .5, .5);
		this.recordingIndicator.position.set(-.8, .8, 0);
		this.recordingIndicator.visible = false;
		this.scene.add(this.recordingIndicator);
	}
	async startRecording(targetWidth, targetHeight) {
		if (this.isRecording) return;
		try {
			const sourceCanvas = this.sourceCanvas;
			const sourceWidth = sourceCanvas.width;
			const sourceHeight = sourceCanvas.height;
			const recordWidth = targetWidth || sourceWidth;
			const recordHeight = targetHeight || sourceHeight;
			this.recordingCanvas = document.createElement("canvas");
			this.recordingCanvas.width = recordWidth;
			this.recordingCanvas.height = recordHeight;
			this.recordingContext = this.recordingCanvas.getContext("2d", { alpha: false });
			if (!this.recordingContext) throw new Error("Failed to get 2D context for recording canvas");
			const sourceAspectRatio = sourceWidth / sourceHeight;
			const targetAspectRatio = recordWidth / recordHeight;
			let sx = 0;
			let sy = 0;
			let sw = sourceWidth;
			let sh = sourceHeight;
			if (Math.abs(sourceAspectRatio - targetAspectRatio) > .01) {
				if (sourceAspectRatio > targetAspectRatio) {
					sw = sourceHeight * targetAspectRatio;
					sx = (sourceWidth - sw) / 2;
				} else {
					sh = sourceWidth / targetAspectRatio;
					sy = (sourceHeight - sh) / 2;
				}
			}
			const captureFrame = () => {
				if (!this.isRecording || !this.recordingContext) return;
				this.recordingContext.drawImage(sourceCanvas, sx, sy, sw, sh, 0, 0, recordWidth, recordHeight);
				this.animationFrameId = requestAnimationFrame(captureFrame);
			};
			this.recordingStream = this.recordingCanvas.captureStream(30);
			this.mediaRecorder = new MediaRecorder(this.recordingStream, {
				mimeType: "video/webm;codecs=vp9",
				videoBitsPerSecond: 5e6
			});
			this.recordedChunks = [];
			this.mediaRecorder.ondataavailable = (event) => {
				if (event.data.size > 0) this.recordedChunks.push(event.data);
			};
			this.mediaRecorder.onstop = () => {
				this.recordingIndicator.visible = false;
				this.isRecording = false;
				this.recordingStream = null;
				if (this.animationFrameId !== null) {
					cancelAnimationFrame(this.animationFrameId);
					this.animationFrameId = null;
				}
				this.eventManager.emitEvent("recordingStopped", {
					duration: this.recordingDuration,
					hasRecording: this.recordedChunks.length > 0
				});
			};
			if (this.recordingIndicator) this.recordingIndicator.visible = true;
			this.mediaRecorder.start(100);
			this.isRecording = true;
			this.recordingStartTime = Date.now();
			captureFrame();
			this.eventManager.emitEvent("recordingStarted", null);
		} catch (error) {
			console.error("Error starting recording:", error);
			this.eventManager.emitEvent("recordingError", error);
		}
	}
	stopRecording() {
		if (!this.isRecording || !this.mediaRecorder) return;
		this.recordingDuration = (Date.now() - this.recordingStartTime) / 1e3;
		if (this.animationFrameId !== null) {
			cancelAnimationFrame(this.animationFrameId);
			this.animationFrameId = null;
		}
		this.mediaRecorder.stop();
		if (this.recordingStream) this.recordingStream.getTracks().forEach((track) => track.stop());
		this.recordingCanvas = null;
		this.recordingContext = null;
	}
	getIsRecording() {
		return this.isRecording;
	}
	hasRecording() {
		return this.recordedChunks.length > 0;
	}
	getRecordingDuration() {
		return this.recordingDuration;
	}
	getRecordingData() {
		if (this.recordedChunks.length !== 0) {
			const blob = new Blob(this.recordedChunks, { type: "video/webm" });
			return URL.createObjectURL(blob);
		}
		return null;
	}
	exportRecording(filename = "scene-recording.mp4") {
		if (this.recordedChunks.length === 0) {
			this.eventManager.emitEvent("recordingError", /* @__PURE__ */ new Error("No recording available to export"));
			return;
		}
		this.eventManager.emitEvent("exportingRecording", null);
		try {
			const blob = new Blob(this.recordedChunks, { type: "video/webm" });
			downloadBlob(filename, blob);
			this.eventManager.emitEvent("recordingExported", null);
		} catch (error) {
			console.error("Error exporting recording:", error);
			this.eventManager.emitEvent("recordingError", error);
		}
	}
	clearRecording() {
		this.recordedChunks = [];
		this.recordingDuration = 0;
		this.eventManager.emitEvent("recordingCleared", null);
	}
	dispose() {
		if (this.animationFrameId !== null) {
			cancelAnimationFrame(this.animationFrameId);
			this.animationFrameId = null;
		}
		this.stopRecording();
		this.clearRecording();
		this.recordingCanvas = null;
		this.recordingContext = null;
		if (this.recordingIndicator) {
			this.scene.remove(this.recordingIndicator);
			this.recordingIndicator.material.map?.dispose();
			this.recordingIndicator.material.dispose();
		}
	}
};
window.comfyAPI = window.comfyAPI || {};
window.comfyAPI.RecordingManager = window.comfyAPI.RecordingManager || {};
window.comfyAPI.RecordingManager.RecordingManager = RecordingManager;
//#endregion
//#region src/extensions/core/load3d/SceneModelManager.ts
var SceneModelManager = class {
	currentModel = null;
	originalModel = null;
	originalRotation = null;
	currentUpDirection = "original";
	materialMode = "original";
	originalMaterials = /* @__PURE__ */ new WeakMap();
	normalMaterial;
	standardMaterial;
	wireframeMaterial;
	occluderMaterial;
	depthMaterial;
	clayMaterial;
	originalFileName = null;
	originalURL = null;
	appliedTexture = null;
	textureLoader;
	skeletonHelper = null;
	showSkeleton = false;
	scene;
	viewState;
	eventManager;
	activeCamera;
	setupCamera;
	setupGizmo;
	getCurrentCapabilities;
	getBoundsFromAdapter;
	disposeModelViaAdapter;
	getDefaultCameraPose;
	quadWireframe = new QuadWireframeManager();
	constructor(scene, viewState, eventManager, getActiveCamera, setupCamera, setupGizmo, getCurrentCapabilities = () => DEFAULT_MODEL_CAPABILITIES, getBoundsFromAdapter = () => null, disposeModelViaAdapter = () => {}, getDefaultCameraPose = () => null) {
		this.scene = scene;
		this.viewState = viewState;
		this.eventManager = eventManager;
		this.activeCamera = getActiveCamera();
		this.setupCamera = setupCamera;
		this.textureLoader = new TextureLoader();
		this.setupGizmo = setupGizmo;
		this.getCurrentCapabilities = getCurrentCapabilities;
		this.getBoundsFromAdapter = getBoundsFromAdapter;
		this.disposeModelViaAdapter = disposeModelViaAdapter;
		this.getDefaultCameraPose = getDefaultCameraPose;
		this.normalMaterial = new MeshNormalMaterial({
			flatShading: false,
			side: 2,
			normalScale: new Vector2(1, 1),
			transparent: false,
			opacity: 1
		});
		this.wireframeMaterial = new MeshBasicMaterial({
			color: 16777215,
			wireframe: true,
			transparent: false,
			opacity: 1
		});
		this.occluderMaterial = new MeshBasicMaterial({
			colorWrite: false,
			side: 2,
			polygonOffset: true,
			polygonOffsetFactor: 1,
			polygonOffsetUnits: 1
		});
		this.depthMaterial = new MeshDepthMaterial({
			depthPacking: BasicDepthPacking,
			side: 2
		});
		this.depthMaterial.onBeforeCompile = (shader) => {
			shader.uniforms.cameraType = { value: this.activeCamera instanceof OrthographicCamera ? 1 : 0 };
			shader.fragmentShader = `
                uniform float cameraType;
                ${shader.fragmentShader}
              `;
			shader.fragmentShader = shader.fragmentShader.replace(/gl_FragColor\s*=\s*vec4\(\s*vec3\(\s*1.0\s*-\s*fragCoordZ\s*\)\s*,\s*opacity\s*\)\s*;/, `
                  float depth = 1.0 - fragCoordZ;
                  if (cameraType > 0.5) {
                    depth = pow(depth, 400.0);
                  } else {
                    depth = pow(depth, 0.6);
                  }
                  gl_FragColor = vec4(vec3(depth), opacity);
                `);
		};
		this.depthMaterial.customProgramCacheKey = () => {
			return this.activeCamera instanceof OrthographicCamera ? "ortho" : "persp";
		};
		this.standardMaterial = this.createSTLMaterial();
		this.clayMaterial = new MeshStandardMaterial({
			color: 8947848,
			metalness: 0,
			roughness: .9,
			flatShading: false,
			side: 2
		});
	}
	init() {}
	dispose() {
		this.clearModel();
		this.quadWireframe.dispose();
		this.normalMaterial.dispose();
		this.standardMaterial.dispose();
		this.wireframeMaterial.dispose();
		this.occluderMaterial.dispose();
		this.depthMaterial.dispose();
		this.clayMaterial.dispose();
		if (this.appliedTexture) {
			this.appliedTexture.dispose();
			this.appliedTexture = null;
		}
	}
	createSTLMaterial() {
		return new MeshStandardMaterial({
			color: 8421504,
			metalness: .1,
			roughness: .8,
			flatShading: false,
			side: 2
		});
	}
	removeAllMainModelsFromScene() {
		this.quadWireframe.clear();
		const oldMainModels = [];
		this.scene.traverse((obj) => {
			if (obj.name === "MainModel") oldMainModels.push(obj);
		});
		oldMainModels.forEach((oldModel) => {
			oldModel.traverse((child) => {
				if (child instanceof Mesh || child instanceof Points) {
					child.geometry?.dispose();
					if (Array.isArray(child.material)) child.material.forEach((m) => m.dispose());
					else child.material?.dispose();
				}
			});
			this.disposeModelViaAdapter(oldModel);
			this.scene.remove(oldModel);
		});
	}
	rebuildForMaterialMode(mode) {
		if (!(this.originalModel instanceof BufferGeometry)) return;
		this.removeAllMainModelsFromScene();
		this.currentModel = null;
		const newModel = buildPointCloudForMaterialMode(this.originalModel, mode, this.standardMaterial, this.originalMaterials);
		newModel.name = "MainModel";
		if (mode !== "pointCloud") {
			const box = new Box3().setFromObject(newModel);
			const size = box.getSize(new Vector3());
			const center = box.getCenter(new Vector3());
			const maxDim = Math.max(size.x, size.y, size.z);
			const scale = this.getCurrentCapabilities().fitTargetSize / maxDim;
			newModel.scale.multiplyScalar(scale);
			box.setFromObject(newModel);
			box.getCenter(center);
			box.getSize(size);
			newModel.position.set(-center.x, -box.min.y, -center.z);
		}
		this.scene.add(newModel);
		this.currentModel = newModel;
		this.eventManager.emitEvent("materialModeChange", mode);
	}
	setMaterialMode(mode) {
		if (!this.currentModel || mode === this.materialMode) return;
		this.materialMode = mode;
		if (this.getCurrentCapabilities().requiresMaterialRebuild) {
			this.rebuildForMaterialMode(mode);
			return;
		}
		if (mode === "depth") this.viewState.outputColorSpace = LinearSRGBColorSpace;
		else this.viewState.outputColorSpace = SRGBColorSpace;
		this.currentModel.visible = true;
		this.currentModel.traverse((child) => {
			if (child instanceof Mesh) switch (mode) {
				case "depth":
					if (!this.originalMaterials.has(child)) this.originalMaterials.set(child, child.material);
					child.material = this.depthMaterial;
					break;
				case "normal":
					if (!this.originalMaterials.has(child)) this.originalMaterials.set(child, child.material);
					child.material = this.normalMaterial;
					break;
				case "wireframe":
					if (!this.originalMaterials.has(child)) this.originalMaterials.set(child, child.material);
					child.material = this.wireframeMaterial;
					break;
				case "clay":
					if (!this.originalMaterials.has(child)) this.originalMaterials.set(child, child.material);
					child.material = this.clayMaterial;
					break;
				case "original":
				case "pointCloud": {
					const originalMaterial = this.originalMaterials.get(child);
					if (originalMaterial) child.material = originalMaterial;
					else if (this.appliedTexture) child.material = new MeshStandardMaterial({
						map: this.appliedTexture,
						metalness: .1,
						roughness: .8,
						side: 2
					});
					else child.material = this.standardMaterial;
					break;
				}
			}
		});
		this.syncQuadWireframe(mode);
		this.eventManager.emitEvent("materialModeChange", mode);
	}
	clearQuadWireframe() {
		this.quadWireframe.clear();
	}
	syncQuadWireframe(mode) {
		if (mode !== "wireframe") {
			this.quadWireframe.hide();
			return;
		}
		if (!this.currentModel) return;
		for (const mesh of this.quadWireframe.show(this.currentModel)) mesh.material = this.occluderMaterial;
	}
	setupModelMaterials(model) {
		model.traverse((child) => {
			if (child instanceof Mesh) this.originalMaterials.set(child, child.material);
		});
		this.setMaterialMode("original");
	}
	clearModel() {
		this.quadWireframe.clear();
		const objectsToRemove = [];
		for (const object of Array.from(this.scene.children)) if (!(object instanceof GridHelper || object instanceof Light || object instanceof Camera || object instanceof SparkRenderer || object.name === "GizmoTransformControls")) objectsToRemove.push(object);
		objectsToRemove.forEach((obj) => {
			this.scene.remove(obj);
			obj.traverse((child) => {
				if (child instanceof Mesh || child instanceof Points) {
					child.geometry?.dispose();
					if (Array.isArray(child.material)) child.material.forEach((material) => material.dispose());
					else child.material?.dispose();
				}
			});
			this.disposeModelViaAdapter(obj);
		});
		this.reset();
	}
	reset() {
		this.currentModel = null;
		this.originalModel = null;
		this.originalRotation = null;
		this.currentUpDirection = "original";
		this.setMaterialMode("original");
		this.originalFileName = null;
		this.originalURL = null;
		if (this.appliedTexture) {
			this.appliedTexture.dispose();
			this.appliedTexture = null;
		}
		if (this.skeletonHelper) {
			this.scene.remove(this.skeletonHelper);
			this.skeletonHelper.dispose();
			this.skeletonHelper = null;
		}
		this.showSkeleton = false;
		this.originalMaterials = /* @__PURE__ */ new WeakMap();
	}
	hasSkeleton() {
		if (!this.currentModel) return false;
		let found = false;
		this.currentModel.traverse((child) => {
			if (child instanceof SkinnedMesh) found = true;
		});
		return found;
	}
	setShowSkeleton(show) {
		this.showSkeleton = show;
		if (show) {
			if (!this.skeletonHelper && this.currentModel) {
				const rootBones = [];
				const skinnedMeshes = [];
				this.currentModel.traverse((child) => {
					if (child instanceof Bone && !(child.parent instanceof Bone)) rootBones.push(child);
					else if (child instanceof SkinnedMesh) skinnedMeshes.push(child);
				});
				const skeletonRoot = rootBones.at(0) ?? skinnedMeshes.at(0);
				if (skeletonRoot) {
					this.skeletonHelper = new SkeletonHelper(skeletonRoot);
					this.scene.add(this.skeletonHelper);
				}
			} else if (this.skeletonHelper) this.skeletonHelper.visible = true;
		} else if (this.skeletonHelper) this.skeletonHelper.visible = false;
		this.eventManager.emitEvent("skeletonVisibilityChange", show);
	}
	addModelToScene(model) {
		this.currentModel = model;
		model.name = "MainModel";
		this.scene.add(this.currentModel);
	}
	computeWorldBounds(model) {
		return this.getBoundsFromAdapter(model) ?? new Box3().setFromObject(model);
	}
	getCurrentBounds() {
		if (!this.currentModel) return null;
		return this.computeWorldBounds(this.currentModel);
	}
	async setupModel(model) {
		this.currentModel = model;
		model.name = "MainModel";
		if (!this.getCurrentCapabilities().fitToViewer) {
			const pose = this.getDefaultCameraPose();
			if (pose) {
				this.scene.add(model);
				this.setupCamera(pose.size, pose.center);
				return;
			}
		}
		this.scene.add(model);
		const pendingMaterialMode = this.materialMode;
		this.setupModelMaterials(model);
		if (pendingMaterialMode !== "original") this.setMaterialMode(pendingMaterialMode);
		const validModes = this.getCurrentCapabilities().materialModes;
		if (validModes.length > 0 && !validModes.includes(this.materialMode)) {
			this.materialMode = validModes[0];
			this.eventManager.emitEvent("materialModeChange", this.materialMode);
		}
		if (this.currentUpDirection !== "original") this.setUpDirection(this.currentUpDirection);
		const box = this.computeWorldBounds(model);
		const size = box.getSize(new Vector3());
		const center = box.getCenter(new Vector3());
		this.setupCamera(size, center);
		this.setupGizmo(model);
	}
	fitToViewer() {
		if (!this.currentModel || !this.getCurrentCapabilities().fitToViewer) return;
		const model = this.currentModel;
		model.scale.set(1, 1, 1);
		model.position.set(0, 0, 0);
		model.rotation.set(0, 0, 0);
		const box = this.computeWorldBounds(model);
		const size = box.getSize(new Vector3());
		const center = box.getCenter(new Vector3());
		const maxDim = Math.max(size.x, size.y, size.z);
		if (maxDim === 0) return;
		const scale = this.getCurrentCapabilities().fitTargetSize / maxDim;
		model.scale.set(scale, scale, scale);
		const scaledBox = this.computeWorldBounds(model);
		scaledBox.getCenter(center);
		scaledBox.getSize(size);
		model.position.set(-center.x, -scaledBox.min.y, -center.z);
		this.originalRotation = null;
		if (this.currentUpDirection !== "original") this.setUpDirection(this.currentUpDirection);
		const newBox = this.computeWorldBounds(model);
		const newSize = newBox.getSize(new Vector3());
		const newCenter = newBox.getCenter(new Vector3());
		this.setupCamera(newSize, newCenter);
		this.setupGizmo(model);
	}
	setOriginalModel(model) {
		this.originalModel = model;
	}
	setUpDirection(direction) {
		if (!this.currentModel) return;
		const directionChanged = this.currentUpDirection !== direction;
		this.originalRotation ??= this.currentModel.rotation.clone();
		this.currentUpDirection = direction;
		this.currentModel.rotation.copy(this.originalRotation);
		switch (direction) {
			case "original": break;
			case "-x":
				this.currentModel.rotation.z = Math.PI / 2;
				break;
			case "+x":
				this.currentModel.rotation.z = -Math.PI / 2;
				break;
			case "-y":
				this.currentModel.rotation.x = Math.PI;
				break;
			case "+y": break;
			case "-z":
				this.currentModel.rotation.x = Math.PI / 2;
				break;
			case "+z": this.currentModel.rotation.x = -Math.PI / 2;
		}
		this.eventManager.emitEvent("upDirectionChange", direction);
		if (directionChanged) this.setupGizmo(this.currentModel);
	}
};
window.comfyAPI = window.comfyAPI || {};
window.comfyAPI.SceneModelManager = window.comfyAPI.SceneModelManager || {};
window.comfyAPI.SceneModelManager.SceneModelManager = SceneModelManager;
//#endregion
//#region src/extensions/core/load3d/createLoad3d.ts
function buildLoad3dDeps(container) {
	const view = new RendererView(container);
	const renderer = view.renderer;
	const eventManager = new EventManager();
	const adapterRef = createAdapterRef();
	const cameraManager = new CameraManager(renderer, eventManager);
	const controlsManager = new ControlsManager(container, cameraManager.activeCamera);
	cameraManager.setControls(controlsManager.controls);
	const getActiveCamera = () => cameraManager.activeCamera;
	const getControls = () => controlsManager.controls;
	const sceneManager = new SceneManager(view, getActiveCamera, getControls, eventManager);
	const lightingManager = new LightingManager(sceneManager.scene, eventManager);
	const hdriManager = new HDRIManager(sceneManager.scene, renderer, view.state, eventManager);
	const viewHelperManager = new ViewHelperManager(renderer, getActiveCamera, getControls, () => cameraManager.getCameraState(), eventManager);
	const modelManager = new SceneModelManager(sceneManager.scene, view.state, eventManager, getActiveCamera, (size, center) => cameraManager.setupForModel(size, center), (model) => gizmoManager.setupForModel(model), () => adapterRef.capabilities ?? DEFAULT_MODEL_CAPABILITIES, (model) => adapterRef.current?.computeBounds?.(model) ?? null, (model) => adapterRef.current?.disposeModel?.(model), () => adapterRef.current?.defaultCameraPose?.() ?? null);
	const loaderManager = new LoaderManager(modelManager, eventManager, void 0, adapterRef);
	const recordingManager = new RecordingManager(sceneManager.scene, view.canvas, eventManager);
	const animationManager = new AnimationManager(eventManager);
	const gizmoManager = new GizmoManager(sceneManager.scene, container, controlsManager.controls, getActiveCamera, () => {
		const transform = gizmoManager.getTransform();
		eventManager.emitEvent("gizmoTransformChange", {
			...transform,
			enabled: gizmoManager.isEnabled(),
			mode: gizmoManager.getMode()
		});
	});
	return {
		view,
		eventManager,
		sceneManager,
		cameraManager,
		controlsManager,
		lightingManager,
		hdriManager,
		viewHelperManager,
		loaderManager,
		modelManager,
		recordingManager,
		animationManager,
		gizmoManager,
		adapterRef
	};
}
function createLoad3d(container, options) {
	return new Load3d(container, buildLoad3dDeps(container), options);
}
window.comfyAPI = window.comfyAPI || {};
window.comfyAPI.createLoad3d = window.comfyAPI.createLoad3d || {};
window.comfyAPI.createLoad3d.createLoad3d = createLoad3d;
//#endregion
//#region src/services/load3dService.ts
/**
* Load3D Service - provides access to Load3D instances
*
* This service uses lazy imports to avoid pulling THREE.js into the main bundle.
* The nodeToLoad3dMap is accessed lazily - it will only be available after
* the load3d extension has been loaded.
*/
var cachedNodeToLoad3dMap = null;
var cachedUseLoad3dViewer = null;
var cachedSkeletonUtils = null;
function getNodeToLoad3dMapSync() {
	return cachedNodeToLoad3dMap;
}
async function loadNodeToLoad3dMap() {
	if (!cachedNodeToLoad3dMap) cachedNodeToLoad3dMap = (await __vitePreload(() => import("./useLoad3d-yfTefDGC.js"), __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65]), import.meta.url)).nodeToLoad3dMap;
	return cachedNodeToLoad3dMap;
}
async function loadUseLoad3dViewer() {
	if (!cachedUseLoad3dViewer) cachedUseLoad3dViewer = (await __vitePreload(() => import("./useLoad3dViewer-BDqyQinR.js"), __vite__mapDeps([66,67,2,7,8,3,9,10,5,6,11,4,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65]), import.meta.url)).useLoad3dViewer;
	return cachedUseLoad3dViewer;
}
async function loadSkeletonUtils() {
	if (!cachedSkeletonUtils) cachedSkeletonUtils = await __vitePreload(() => import("./SkeletonUtils-BO3xBoLT.js"), __vite__mapDeps([68,8,2]), import.meta.url);
	return cachedSkeletonUtils;
}
var viewerInstances = /* @__PURE__ */ new Map();
var Load3dService = class Load3dService {
	static instance;
	constructor() {}
	static getInstance() {
		if (!Load3dService.instance) Load3dService.instance = new Load3dService();
		return Load3dService.instance;
	}
	/**
	* Get Load3d instance for a node (synchronous).
	* Returns null if the load3d module hasn't been loaded yet.
	*/
	getLoad3d(node) {
		const rawNode = toRaw(node);
		const map = getNodeToLoad3dMapSync();
		if (!map) return null;
		return map.get(rawNode) || null;
	}
	/**
	* Get Load3d instance for a node (async, loads module if needed).
	*/
	async getLoad3dAsync(node) {
		const rawNode = toRaw(node);
		return (await loadNodeToLoad3dMap()).get(rawNode) || null;
	}
	getNodeByLoad3d(load3d) {
		const map = getNodeToLoad3dMapSync();
		if (!map) return null;
		for (const [node, instance] of map) if (instance === load3d) return node;
		return null;
	}
	removeLoad3d(node) {
		const rawNode = toRaw(node);
		const map = getNodeToLoad3dMapSync();
		if (!map) return;
		const instance = map.get(rawNode);
		if (instance) {
			instance.remove();
			map.delete(rawNode);
		}
	}
	clear() {
		const map = getNodeToLoad3dMapSync();
		if (!map) return;
		for (const [node] of map) this.removeLoad3d(node);
	}
	/**
	* Get or create viewer (async, loads module if needed).
	* Use this for initial viewer creation.
	*/
	async getOrCreateViewer(node) {
		const nodeId = node.id;
		if (!viewerInstances.has(nodeId)) {
			const useLoad3dViewer = await loadUseLoad3dViewer();
			viewerInstances.set(nodeId, useLoad3dViewer(node));
		}
		return viewerInstances.get(nodeId);
	}
	/**
	* Get or create viewer (sync version).
	* Only works after useLoad3dViewer has been loaded.
	* Returns null if module not yet loaded - use async version instead.
	*/
	getOrCreateViewerSync(node, useLoad3dViewer) {
		const nodeId = node.id;
		if (!viewerInstances.has(nodeId)) viewerInstances.set(nodeId, useLoad3dViewer(node));
		return viewerInstances.get(nodeId);
	}
	removeViewer(node) {
		const nodeId = node.id;
		const viewer = viewerInstances.get(nodeId);
		if (viewer) viewer.cleanup();
		viewerInstances.delete(nodeId);
	}
	async copyLoad3dState(source, target) {
		const sourceModel = source.modelManager.currentModel;
		const gizmoWasEnabled = target.getGizmoManager().isEnabled();
		target.getGizmoManager().detach();
		if (sourceModel) {
			const existingModel = target.getModelManager().currentModel;
			if (existingModel) {
				target.getModelManager().clearQuadWireframe();
				target.getSceneManager().scene.remove(existingModel);
			}
			if (source.isSplatModel()) {
				const originalURL = source.modelManager.originalURL;
				if (originalURL && !await target.loadModel(originalURL)) return;
			} else {
				const modelClone = (await loadSkeletonUtils()).clone(sourceModel);
				adoptClonedModel(modelClone, sourceModel, source.getModelManager().originalMaterials, target.getModelManager().originalMaterials);
				target.getModelManager().materialMode = "original";
				target.getModelManager().currentModel = modelClone;
				target.getSceneManager().scene.add(modelClone);
				const sourceOriginalModel = source.getModelManager().originalModel;
				if (sourceOriginalModel) target.getModelManager().originalModel = sourceOriginalModel;
				target.getModelManager().currentUpDirection = source.getModelManager().currentUpDirection;
				target.setMaterialMode(source.getModelManager().materialMode);
				target.setUpDirection(source.getModelManager().currentUpDirection);
				if (source.getModelManager().appliedTexture) target.getModelManager().appliedTexture = source.getModelManager().appliedTexture;
				const sourceInitial = source.getGizmoManager().getInitialTransform();
				modelClone.position.set(sourceInitial.position.x, sourceInitial.position.y, sourceInitial.position.z);
				modelClone.rotation.set(sourceInitial.rotation.x, sourceInitial.rotation.y, sourceInitial.rotation.z);
				modelClone.scale.set(sourceInitial.scale.x, sourceInitial.scale.y, sourceInitial.scale.z);
				target.getGizmoManager().setupForModel(modelClone);
				const gizmoTransform = source.getGizmoTransform();
				target.applyGizmoTransform(gizmoTransform.position, gizmoTransform.rotation, gizmoTransform.scale);
				if (gizmoWasEnabled || source.getGizmoManager().isEnabled()) target.setGizmoEnabled(true);
				if (source.hasAnimations()) target.animationManager.setupModelAnimations(modelClone, sourceOriginalModel);
			}
		}
		const sourceCameraType = source.getCurrentCameraType();
		const sourceCameraState = source.getCameraState();
		target.toggleCamera(sourceCameraType);
		target.setCameraState(sourceCameraState);
		target.setBackgroundColor(source.getSceneManager().currentBackgroundColor);
		target.toggleGrid(source.getSceneManager().gridHelper.visible);
		if (source.getSceneManager().getCurrentBackgroundInfo().type === "image") {
			const backgroundPath = (this.getNodeByLoad3d(source)?.properties["Scene Config"])?.backgroundImage;
			if (backgroundPath) await target.setBackgroundImage(backgroundPath);
		} else await target.setBackgroundImage("");
		target.setLightIntensity(source.getLightingManager().lights[1]?.intensity || 1);
		if (sourceCameraType === "perspective") target.setFOV(source.getCameraManager().perspectiveCamera.fov);
	}
	handleViewportRefresh(load3d) {
		if (!load3d) return;
		load3d.handleResize();
		const currentType = load3d.getCurrentCameraType();
		load3d.toggleCamera(currentType === "perspective" ? "orthographic" : "perspective");
		load3d.toggleCamera(currentType);
		load3d.getControlsManager().controls.update();
	}
	async handleViewerClose(node) {
		const viewer = await useLoad3dService().getOrCreateViewer(node);
		if (!viewer) return;
		if (viewer.needApplyChanges.value) {
			await viewer.applyChanges();
			const load3DNode = node;
			if (load3DNode.syncLoad3dConfig) load3DNode.syncLoad3dConfig();
		}
		useLoad3dService().removeViewer(node);
	}
};
var useLoad3dService = () => {
	return Load3dService.getInstance();
};
//#endregion
export { createLoad3d as n, useLoad3dService as t };
