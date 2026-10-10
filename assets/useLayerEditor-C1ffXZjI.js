import "./rolldown-runtime-xtsTai4I.js";
import { co as LayerEditorDialogContent, go as useNodeOutputStore, lo as LayerEditorDialogHeader, so as LAYER_EDITOR_DIALOG_KEY, uo as layerEditorDialogProps } from "./layoutStore-CZsuzg91.js";
import { t as useToastStore } from "./toastStore-CTfykAzG.js";
import { d as t } from "./i18n-C3J-ToPr.js";
import { t as useDialogStore } from "./dialogStore-B0GYyals.js";
//#region src/renderer/extensions/layerEditor/composables/useLayerEditor.ts
function useLayerEditor() {
	const openLayerEditor = (node) => {
		if (!node) {
			console.error("[LayerEditor] No node provided");
			return;
		}
		const imageUrls = useNodeOutputStore().getNodeImageUrls(node);
		if (!imageUrls || imageUrls.length < 2) {
			useToastStore().add({
				severity: "info",
				summary: t("layerEditor.title"),
				detail: t("layerEditor.needsTwoImages")
			});
			return;
		}
		useDialogStore().showDialog({
			key: LAYER_EDITOR_DIALOG_KEY,
			headerComponent: LayerEditorDialogHeader,
			component: LayerEditorDialogContent,
			props: { node },
			dialogComponentProps: layerEditorDialogProps
		});
	};
	return { openLayerEditor };
}
//#endregion
export { useLayerEditor };
