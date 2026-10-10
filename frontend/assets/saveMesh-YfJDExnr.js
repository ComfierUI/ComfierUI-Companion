import "./rolldown-runtime-xtsTai4I.js";
import { et as nextTick } from "./vendor-vue-core-C1utdb0s.js";
import { Eo as ComponentWidgetImpl, Jr as useExtensionService, Oo as addWidget, o as app, zc as getNodeByLocatorId } from "./layoutStore-CZsuzg91.js";
import { t as Load3D_default } from "./Load3D-wteGUp-H.js";
import { t as useLoad3dService } from "./load3dService-B4-ohLYW.js";
import { s as useLoad3d } from "./useLoad3d-BeiAY6wy.js";
import { n as createExportMenuItems, t as Load3DConfiguration } from "./Load3DConfiguration-Br8ldpNN.js";
//#region src/extensions/core/saveMesh.ts
var inputSpec = {
	name: "image",
	type: "Preview3D",
	isPreview: true
};
function applySaveGLBOutput(node, fileInfo) {
	const filePath = (fileInfo.subfolder ?? "") + "/" + (fileInfo.filename ?? "");
	const loadFolder = fileInfo.type;
	const modelWidget = node.widgets?.find((w) => w.name === "image");
	if (!modelWidget) return;
	if (modelWidget.value === filePath && node.properties["Last Time Model File"] === filePath && node.properties["Last Time Model Folder"] === loadFolder) return;
	modelWidget.value = filePath;
	node.properties["Last Time Model File"] = filePath;
	node.properties["Last Time Model Folder"] = loadFolder;
	useLoad3d(node).waitForLoad3d((load3d) => {
		new Load3DConfiguration(load3d, node.properties).configureForSaveMesh(loadFolder, filePath, { silentOnNotFound: true });
	});
}
useExtensionService().registerExtension({
	name: "Comfy.SaveGLB",
	async beforeRegisterNodeDef(_nodeType, nodeData) {
		if ("SaveGLB" === nodeData.name) {
			const input = nodeData.input ??= {};
			const required = input.required ??= {};
			required.image = ["PREVIEW_3D"];
		}
	},
	onNodeOutputsUpdated(nodeOutputs) {
		for (const [locatorId, output] of Object.entries(nodeOutputs)) {
			const fileInfo = output["3d"]?.[0];
			if (!fileInfo) continue;
			const node = getNodeByLocatorId(app.rootGraph, locatorId);
			if (!node || node.constructor.comfyClass !== "SaveGLB") continue;
			applySaveGLBOutput(node, fileInfo);
		}
	},
	getCustomWidgets() {
		return { PREVIEW_3D(node) {
			const widget = new ComponentWidgetImpl({
				node,
				name: inputSpec.name,
				component: Load3D_default,
				inputSpec,
				options: { hideInPanel: true }
			});
			widget.type = "load3D";
			addWidget(node, widget);
			return { widget };
		} };
	},
	getNodeMenuItems(node) {
		if (node.constructor.comfyClass !== "SaveGLB") return [];
		const load3d = useLoad3dService().getLoad3d(node);
		if (!load3d) return [];
		if (load3d.isSplatModel()) return [];
		return createExportMenuItems(load3d);
	},
	async nodeCreated(node) {
		if (node.constructor.comfyClass !== "SaveGLB") return;
		const [oldWidth, oldHeight] = node.size;
		node.setSize([Math.max(oldWidth, 400), Math.max(oldHeight, 550)]);
		await nextTick();
		useLoad3d(node).onLoad3dReady((load3d) => {
			const modelWidget = node.widgets?.find((w) => w.name === "image");
			if (!modelWidget) return;
			const lastTimeModelFile = node.properties["Last Time Model File"];
			const lastTimeModelFolder = node.properties["Last Time Model Folder"] ?? "output";
			if (!lastTimeModelFile) return;
			modelWidget.value = lastTimeModelFile;
			new Load3DConfiguration(load3d, node.properties).configureForSaveMesh(lastTimeModelFolder, lastTimeModelFile, { silentOnNotFound: true });
		});
		const onExecuted = node.onExecuted;
		node.onExecuted = function(output) {
			onExecuted?.call(this, output);
			const fileInfo = output["3d"]?.[0];
			if (!fileInfo) return;
			useLoad3d(node).waitForLoad3d((load3d) => {
				const modelWidget = node.widgets?.find((w) => w.name === "image");
				if (modelWidget) {
					const filePath = (fileInfo.subfolder ?? "") + "/" + (fileInfo.filename ?? "");
					modelWidget.value = filePath;
					const config = new Load3DConfiguration(load3d, node.properties);
					const loadFolder = fileInfo.type;
					node.properties["Last Time Model File"] = filePath;
					node.properties["Last Time Model Folder"] = loadFolder;
					config.configureForSaveMesh(loadFolder, filePath, { silentOnNotFound: true });
				}
			});
		};
	}
});
//#endregion
