import "./rolldown-runtime-xtsTai4I.js";
import { o as app } from "./layoutStore-CZsuzg91.js";
import { i as api, s as zResultItem } from "./api-Bt-fGt5a.js";
import { s as arrayType } from "./vendor-zod-TMj9Wsdv.js";
//#region src/renderer/extensions/vueNodes/widgets/utils/savedImageUrls.ts
var NO_IMAGES = [];
var zSavedImages = arrayType(zResultItem);
function savedImageUrls(saved) {
	const parsed = zSavedImages.safeParse(saved);
	if (!parsed.success) return NO_IMAGES;
	const rand = app.getRandParam();
	const previewParam = app.getPreviewFormatParam();
	return parsed.data.map((item) => {
		const params = new URLSearchParams(item);
		return api.apiURL(`/view?${params}${previewParam}${rand}`);
	});
}
//#endregion
export { savedImageUrls as t };
