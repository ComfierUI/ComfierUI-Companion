import "./rolldown-runtime-xtsTai4I.js";
import { et as nextTick } from "./vendor-vue-core-C1utdb0s.js";
import { Eo as ComponentWidgetImpl, Jr as useExtensionService, Oo as addWidget } from "./layoutStore-CZsuzg91.js";
import { t as CameraInfo_default } from "./CameraInfo-DDXRkhSt.js";
//#region src/extensions/core/cameraInfo.ts
useExtensionService().registerExtension({
	name: "Comfy.CreateCameraInfo",
	getCustomWidgets() {
		return { CAMERA_INFO_STATE(node) {
			const widget = new ComponentWidgetImpl({
				node,
				name: "camera_info_state",
				component: CameraInfo_default,
				inputSpec: {
					name: "camera_info_state",
					type: "CAMERA_INFO_STATE",
					isPreview: false
				},
				options: { serialize: false }
			});
			widget.type = "cameraInfo";
			widget.serialize = false;
			addWidget(node, widget);
			return { widget };
		} };
	},
	async nodeCreated(node) {
		if (node.constructor.comfyClass !== "CreateCameraInfo") return;
		const [oldWidth, oldHeight] = node.size;
		node.setSize([Math.max(oldWidth, 360), Math.max(oldHeight, 480)]);
		await nextTick();
	}
});
//#endregion
