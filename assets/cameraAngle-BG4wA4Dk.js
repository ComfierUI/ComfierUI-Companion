const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./CameraAngle-DV4cyJqb.js","./rolldown-runtime-xtsTai4I.js","./vendor-three-DQpYrwAh.js","./vendor-vue-core-C1utdb0s.js","./vendor-vueuse-BxKIIsKg.js","./layoutStore-CZsuzg91.js","./vendor-datadog-DudeEV66.js","./vendor-other-BPEcPQTD.js","./vendor-zod-TMj9Wsdv.js","./vendor-tiptap-BT_4t92m.js","./requestAuth-YeU5GIXc.js","./telemetry-IkzvF0TI.js","./api-Bt-fGt5a.js","./zod.gen-C09SPgBJ.js","./vendor-axios-QnwcNXlY.js","./vendor-sentry-zSXGkMPN.js","./reportError-LG-zfbNw.js","./hostTelemetryEnabled-BZ3GL1Cu.js","./remoteConfig-DwMQrLli.js","./vendor-firebase-B37L--zT.js","./toastStore-CTfykAzG.js","./types-t0xJOOCt.js","./desktopHostSession-IrokPizE.js","./vendor-i18n-BZvE7WBQ.js","./i18n-C3J-ToPr.js","./formatUtil-DuxXRy1z.js","./commands-BcZ6fU3-.js","./main-BfqkkuXX.js","./nodeDefs-CFOSmIZi.js","./settings-B3DInspu.js","./comfyApi-CYSC9hA6.js","./types-ColLjFnz.js","./useFeatureFlags-DAoj_aDd.js","./dialog.variants-PsJk1wgr.js","./ssoRequired-BkQMvdnz.js","./dialogStore-B0GYyals.js","./DialogPortal-B3D-ZhO6.js","./vendor-reka-ui-tdehH9A1.js","./src-DI1bBfrb.js","./Button-j0oCzR82.js","./refreshRemoteConfig-D9UzqP0h.js","./vendor-primevue-C3d0HJ53.js","./systemStatsStore-3gc4cifl.js","./useImageQuiet-Ded8W_Zd.js","./vendor-markdown-CtxqRwKg.js","./useModalLiftedZIndex-BuehUvPe.js","./NumberFieldInput-CILJZ6M6.js","./colorUtil-BzdMMd-Y.js","./vendor-yjs-D9X62SBd.js","./markdownRendererUtil-6g3t5X63.js","./downloadUtil-Bysc7OZ_.js","./SingleSelect-CS2DGZzk.js","./widgetTypes-CisWqKm9.js","./Switch-BAw3-YcG.js","./Input-Cx8jjgHK.js","./SelectValue-BYMnIcxq.js","./Loader-CwKhrtFX.js","./_plugin-vue_export-helper-DEKQMRQ4.js","./creditsUtil-BWj6bywK.js","./useExternalLink-CXT6uu6Z.js","./envUtil-2Z8ainL3.js","./cameraTransform-a83Tjky1.js","./Viewport3d-1i6ZJT8U.js","./useClickDragGuard-C9dEHod_.js","./menuBarStyles-Dl-y7eUi.js","./widgetBridge-CMvdkhjP.js","./orbitDragMath-BBRzJ8Sz.js","./vendor-other-DODGPXtn.css","./layoutStore-Nbgrgm8u.css"])))=>i.map(i=>d[i]);
import "./rolldown-runtime-xtsTai4I.js";
import { a as __vitePreload } from "./vendor-datadog-DudeEV66.js";
import { W as defineAsyncComponent } from "./vendor-vue-core-C1utdb0s.js";
import { Eo as ComponentWidgetImpl, Jr as useExtensionService, Oo as addWidget } from "./layoutStore-CZsuzg91.js";
import { S as CAMERA_ANGLE_VIEW_WIDGET_NAME, t as isViewMode } from "./widgetBridge-CMvdkhjP.js";
//#region src/extensions/core/cameraAngle.ts
var CameraAngle = defineAsyncComponent(() => __vitePreload(() => import("./CameraAngle-DV4cyJqb.js"), __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68]), import.meta.url));
var NODE_CLASS = "CameraAngle";
var MIN_WIDTH = 360;
var MIN_HEIGHT = 480;
useExtensionService().registerExtension({
	name: "Comfy.CameraAngle",
	getCustomWidgets() {
		return { CAMERA_ANGLE_VIEW(node) {
			let viewMode = "camera";
			const widget = new ComponentWidgetImpl({
				node,
				name: CAMERA_ANGLE_VIEW_WIDGET_NAME,
				component: CameraAngle,
				inputSpec: {
					name: CAMERA_ANGLE_VIEW_WIDGET_NAME,
					type: "CAMERA_ANGLE_VIEW",
					isPreview: false
				},
				options: {
					serialize: false,
					getValue: () => viewMode,
					setValue: (value) => {
						if (isViewMode(value)) viewMode = value;
					}
				}
			});
			widget.type = "cameraAngle";
			addWidget(node, widget);
			return { widget };
		} };
	},
	nodeCreated(node) {
		if (node.constructor.comfyClass !== NODE_CLASS) return;
		const [width, height] = node.size;
		node.setSize([Math.max(width, MIN_WIDTH), Math.max(height, MIN_HEIGHT)]);
	}
});
//#endregion
