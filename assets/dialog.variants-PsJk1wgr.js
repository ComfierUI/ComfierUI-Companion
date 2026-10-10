import { U as cva } from "./vendor-other-BPEcPQTD.js";
//#region src/components/ui/dialog/dialog.variants.ts
var dialogContentVariants = cva({
	base: "fixed z-1700 flex flex-col rounded-lg border border-border-subtle bg-base-background shadow-lg outline-none data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
	variants: {
		size: {
			sm: "sm:max-w-96",
			md: "sm:max-w-xl",
			lg: "sm:max-w-3xl",
			xl: "sm:max-w-5xl",
			full: "sm:max-w-[calc(100vw-1rem)]"
		},
		maximized: {
			true: "inset-2 top-2 left-2 size-auto max-h-none max-w-none sm:max-w-none",
			false: "top-1/2 left-1/2 max-h-[85vh] w-[calc(100vw-1rem)] translate-x-[calc(-50%-min(var(--workspace-inset-right,0px)/2,max(0px,(50vw-50%-var(--workspace-inset-right,0px)/2-0.5rem+1px)*1000)))] -translate-y-1/2"
		}
	},
	defaultVariants: {
		size: "md",
		maximized: false
	}
});
var HUG_CONTENT_CLASS = "w-fit max-w-[calc(100vw-1rem)] sm:max-w-[calc(100vw-1rem)]";
var SELF_STYLED_PANEL_CONTENT_CLASS = `${HUG_CONTENT_CLASS} border-none bg-transparent shadow-none`;
//#endregion
export { SELF_STYLED_PANEL_CONTENT_CLASS as n, dialogContentVariants as r, HUG_CONTENT_CLASS as t };
