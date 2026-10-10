import "./rolldown-runtime-xtsTai4I.js";
import { zi as menuContentClass } from "./layoutStore-CZsuzg91.js";
import { t as cn } from "./src-DI1bBfrb.js";
//#region src/components/load3d/menubar/menuBarStyles.ts
var chipClass = "flex shrink-0 items-center gap-1.5 rounded-lg border-0 bg-interface-menu-surface px-2.5 py-1 text-sm text-base-foreground outline-none transition-colors hover:bg-button-active-surface focus-visible:ring-1 focus-visible:ring-border-default";
var iconBtnClass = "flex size-8 items-center justify-center rounded-md border-0 bg-transparent text-base-foreground outline-none transition-colors hover:bg-button-hover-surface focus-visible:ring-1 focus-visible:ring-border-default";
var formPanelClass = "w-48 max-h-80 overflow-y-auto flex flex-col gap-0.5 p-1.5 rounded-lg border-border-default bg-interface-menu-surface shadow-interface";
var menuPanelClass = cn(menuContentClass, "flex max-h-80 w-48 flex-col");
function actionClass(active) {
	return cn("flex shrink-0 items-center gap-1.5 rounded-md border-0 bg-transparent px-2 py-1 text-sm text-base-foreground transition-colors outline-none hover:bg-button-hover-surface focus-visible:ring-1 focus-visible:ring-border-default", active && "bg-button-active-surface");
}
function tip(label) {
	return {
		value: label,
		showDelay: 300
	};
}
//#endregion
export { menuPanelClass as a, iconBtnClass as i, chipClass as n, tip as o, formPanelClass as r, actionClass as t };
