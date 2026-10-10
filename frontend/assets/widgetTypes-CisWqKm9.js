import "./rolldown-runtime-xtsTai4I.js";
import { X as inject } from "./vendor-vue-core-C1utdb0s.js";
//#region src/types/widgetTypes.ts
var OnCloseKey = Symbol();
var HideLayoutFieldKey = Symbol();
function useHideLayoutField() {
	return inject(HideLayoutFieldKey, false);
}
var WidgetHeightKey = Symbol();
function useWidgetHeight() {
	return inject(WidgetHeightKey, "h-6");
}
//#endregion
export { useWidgetHeight as a, useHideLayoutField as i, OnCloseKey as n, WidgetHeightKey as r, HideLayoutFieldKey as t };
