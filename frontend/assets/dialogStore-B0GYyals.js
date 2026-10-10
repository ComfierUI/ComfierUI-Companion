import "./rolldown-runtime-xtsTai4I.js";
import { Q as merge } from "./vendor-other-BPEcPQTD.js";
import { Lt as ref, Nt as markRaw, d as defineStore } from "./vendor-vue-core-C1utdb0s.js";
//#region src/stores/dialogStore.ts
function notifyRemoved(dialog) {
	dialog?.dialogComponentProps.onRemoved?.();
}
var useDialogStore = defineStore("dialog", () => {
	const dialogStack = ref([]);
	/**
	* The key of the currently active (top-most) dialog.
	* Only the active dialog can be closed with the ESC key.
	*/
	const activeKey = ref(null);
	const genDialogKey = () => `dialog-${Math.random().toString(36).slice(2, 9)}`;
	/**
	* Inserts a dialog into the stack at the correct position based on priority.
	* Higher priority dialogs are placed before lower priority ones.
	*/
	function insertDialogByPriority(dialog) {
		const insertIndex = dialogStack.value.findIndex((d) => d.priority <= dialog.priority);
		dialogStack.value.splice(insertIndex === -1 ? dialogStack.value.length : insertIndex, 0, dialog);
	}
	function riseDialog(options) {
		const dialogKey = options.key;
		const index = dialogStack.value.findIndex((d) => d.key === dialogKey);
		if (index !== -1) {
			const [dialog] = dialogStack.value.splice(index, 1);
			insertDialogByPriority(dialog);
			activeKey.value = dialogKey;
			updateCloseOnEscapeStates();
		}
	}
	function closeDialog(options) {
		const targetDialog = options ? dialogStack.value.find((d) => d.key === options.key) : dialogStack.value.find((d) => d.key === activeKey.value);
		if (!targetDialog) return;
		targetDialog.dialogComponentProps.onClose?.();
		const index = dialogStack.value.findIndex((d) => d === targetDialog);
		const removed = index !== -1;
		if (removed) dialogStack.value.splice(index, 1);
		if (!dialogStack.value.some((d) => d.key === activeKey.value)) activeKey.value = dialogStack.value.length > 0 ? dialogStack.value[dialogStack.value.length - 1].key : null;
		updateCloseOnEscapeStates();
		if (removed) notifyRemoved(targetDialog);
	}
	function createDialog(options) {
		const evicted = dialogStack.value.length >= 10 ? dialogStack.value.shift() : void 0;
		const dialog = {
			key: options.key,
			visible: true,
			title: options.title,
			headerComponent: options.headerComponent ? markRaw(options.headerComponent) : void 0,
			footerComponent: options.footerComponent ? markRaw(options.footerComponent) : void 0,
			component: markRaw(options.component),
			headerProps: { ...options.headerProps },
			contentProps: { ...options.props },
			footerProps: { ...options.footerProps },
			priority: options.priority ?? 1,
			dialogComponentProps: {
				maximizable: false,
				modal: true,
				closable: true,
				closeOnEscape: true,
				dismissableMask: true,
				renderer: "reka",
				...options.dialogComponentProps,
				maximized: options.dialogComponentProps?.maximized ?? false,
				onMaximize: () => {
					dialog.dialogComponentProps.maximized = true;
				},
				onUnmaximize: () => {
					dialog.dialogComponentProps.maximized = false;
				},
				onAfterHide: () => {
					closeDialog(dialog);
				},
				pt: merge(options.dialogComponentProps?.pt || {}, { root: { onMousedown: () => {
					riseDialog(dialog);
				} } })
			}
		};
		insertDialogByPriority(dialog);
		activeKey.value = options.key;
		updateCloseOnEscapeStates();
		notifyRemoved(evicted);
		return dialog;
	}
	/**
	* Ensures only the top-most dialog in the stack can be closed with the Escape key.
	* This is necessary because PrimeVue Dialogs do not handle `closeOnEscape` prop
	* correctly when multiple dialogs are open.
	*/
	function updateCloseOnEscapeStates() {
		const topDialog = dialogStack.value.find((d) => d.key === activeKey.value);
		const topClosable = topDialog?.dialogComponentProps.closable;
		dialogStack.value.forEach((dialog) => {
			dialog.dialogComponentProps = {
				...dialog.dialogComponentProps,
				closeOnEscape: dialog === topDialog && !!topClosable
			};
		});
	}
	function showDialog(options) {
		const dialogKey = options.key || genDialogKey();
		let dialog = dialogStack.value.find((d) => d.key === dialogKey);
		if (dialog) {
			dialog.visible = true;
			riseDialog(dialog);
		} else dialog = createDialog({
			...options,
			key: dialogKey
		});
		return dialog;
	}
	/**
	* Shows a dialog from a third party extension.
	* Explicitly keys extension dialogs with `extension-` prefix,
	* to avoid conflicts & prevent use of internal dialogs (available via `dialogService`).
	*/
	function showExtensionDialog(options) {
		const { key } = options;
		if (!key) {
			console.error("Extension dialog key is required");
			return;
		}
		const extKey = key.startsWith("extension-") ? key : `extension-${key}`;
		const dialog = dialogStack.value.find((d) => d.key === extKey);
		if (!dialog) return createDialog({
			...options,
			key: extKey
		});
		dialog.visible = true;
		riseDialog(dialog);
		return dialog;
	}
	function isDialogOpen(key) {
		return dialogStack.value.some((d) => d.key === key);
	}
	function updateDialog(options) {
		const dialog = dialogStack.value.find((d) => d.key === options.key);
		if (!dialog) return false;
		if (options.contentProps) dialog.contentProps = {
			...dialog.contentProps,
			...options.contentProps
		};
		if (options.dialogComponentProps) {
			dialog.dialogComponentProps = {
				...dialog.dialogComponentProps,
				...options.dialogComponentProps
			};
			updateCloseOnEscapeStates();
		}
		return true;
	}
	return {
		dialogStack,
		riseDialog,
		showDialog,
		closeDialog,
		showExtensionDialog,
		isDialogOpen,
		updateDialog,
		activeKey
	};
});
//#endregion
export { useDialogStore as t };
