import "./rolldown-runtime-xtsTai4I.js";
import { s as vAutoAnimate } from "./vendor-other-BPEcPQTD.js";
import { Dt as withDirectives, Et as withCtx, F as createBaseVNode, G as defineComponent, H as createTextVNode, I as createBlock, Jt as normalizeClass, Kt as unref, L as createCommentVNode, Lt as ref, O as Fragment, P as computed, R as createElementBlock, St as watch, T as withKeys, U as createVNode, Zt as toDisplayString, et as nextTick, lt as openBlock, ot as onMounted, w as vShow } from "./vendor-vue-core-C1utdb0s.js";
import { et as refAutoReset, p as useAsyncState } from "./vendor-vueuse-BxKIIsKg.js";
import { Kt as useAppModeStore, Vt as useWorkflowService, jt as useWorkflowStore, kt as useAppMode, nt as useDialogService } from "./layoutStore-CZsuzg91.js";
import { n as useTelemetry } from "./telemetry-IkzvF0TI.js";
import { r as useI18n } from "./vendor-i18n-BZvE7WBQ.js";
import { d as t } from "./i18n-C3J-ToPr.js";
import { t as appendJsonExt } from "./formatUtil-DuxXRy1z.js";
import { t as useFeatureFlags } from "./useFeatureFlags-DAoj_aDd.js";
import { t as useDialogStore } from "./dialogStore-B0GYyals.js";
import { a as showConfirmDialog } from "./DialogPortal-B3D-ZhO6.js";
import { t as cn } from "./src-DI1bBfrb.js";
import { t as Button_default } from "./Button-j0oCzR82.js";
import { f as useToast } from "./vendor-primevue-C3d0HJ53.js";
import { r as useCopyToClipboard } from "./systemStatsStore-3gc4cifl.js";
import { t as Input_default } from "./Input-Cx8jjgHK.js";
import { t as Skeleton_default } from "./Skeleton-gXY6B2Cf.js";
import { n as ShareAssetWarningBox_default, t as ComfyHubPublishDialog_default } from "./ComfyHubPublishDialog-Eg5J-OAB.js";
import { t as useWorkflowShareService } from "./workflowShareService-D2WyTi0Z.js";
//#region src/platform/workflow/sharing/components/profile/ComfyHubPublishIntroPanel.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1$2 = { class: "flex w-full flex-col overflow-hidden bg-base-background" };
var _hoisted_2$1 = {
	key: 0,
	class: "flex justify-end px-2 pt-2"
};
var _hoisted_3$1 = { class: "flex flex-col items-center gap-4 px-4 pt-4 pb-6" };
var _hoisted_4$1 = { class: "m-0 text-base font-semibold text-base-foreground" };
var _hoisted_5$1 = { class: "m-0 text-center text-sm text-muted-foreground" };
//#endregion
//#region src/platform/workflow/sharing/components/profile/ComfyHubPublishIntroPanel.vue
var ComfyHubPublishIntroPanel_default = /* @__PURE__ */ defineComponent({
	__name: "ComfyHubPublishIntroPanel",
	props: {
		onCreateProfile: { type: Function },
		onClose: { type: Function },
		showCloseButton: {
			type: Boolean,
			default: true
		},
		isUpdate: {
			type: Boolean,
			default: false
		}
	},
	setup(__props) {
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", _hoisted_1$2, [__props.showCloseButton ? (openBlock(), createElementBlock("div", _hoisted_2$1, [createVNode(Button_default, {
				size: "icon",
				class: "rounded-full",
				"aria-label": _ctx.$t("g.close"),
				onClick: __props.onClose
			}, {
				default: withCtx(() => [..._cache[0] || (_cache[0] = [createBaseVNode("i", { class: "icon-[lucide--x] size-4" }, null, -1)])]),
				_: 1
			}, 8, ["aria-label", "onClick"])])) : createCommentVNode("", true), createBaseVNode("section", _hoisted_3$1, [
				createBaseVNode("h2", _hoisted_4$1, toDisplayString(__props.isUpdate ? _ctx.$t("comfyHubProfile.updateIntroTitle") : _ctx.$t("comfyHubProfile.introTitle")), 1),
				createBaseVNode("p", _hoisted_5$1, toDisplayString(__props.isUpdate ? _ctx.$t("comfyHubProfile.updateIntroDescription") : _ctx.$t("comfyHubProfile.introDescription")), 1),
				createVNode(Button_default, {
					variant: "primary",
					size: "lg",
					class: "mt-2 w-full",
					onClick: __props.onCreateProfile
				}, {
					default: withCtx(() => [createTextVNode(toDisplayString(__props.isUpdate ? _ctx.$t("comfyHubProfile.startUpdatingButton") : _ctx.$t("comfyHubProfile.startPublishingButton")), 1)]),
					_: 1
				}, 8, ["onClick"])
			])]);
		};
	}
});
//#endregion
//#region src/platform/workflow/sharing/composables/useShareFlowContext.ts
function useShareFlowContext() {
	const { mode, isAppMode } = useAppMode();
	return computed(() => ({
		source: isAppMode.value ? "app_mode" : "graph_mode",
		view_mode: mode.value,
		is_app_mode: isAppMode.value
	}));
}
//#endregion
//#region src/platform/workflow/sharing/components/ShareUrlCopyField.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1$1 = { class: "flex items-center gap-2" };
//#endregion
//#region src/platform/workflow/sharing/components/ShareUrlCopyField.vue
var ShareUrlCopyField_default = /* @__PURE__ */ defineComponent({
	__name: "ShareUrlCopyField",
	props: {
		url: {},
		shareId: {}
	},
	setup(__props) {
		const { copyToClipboard } = useCopyToClipboard();
		const shareFlowContext = useShareFlowContext();
		const copied = refAutoReset(false, 2e3);
		async function handleCopy() {
			await copyToClipboard(__props.url);
			copied.value = true;
			useTelemetry()?.trackShareFlow({
				step: "link_copied",
				...shareFlowContext.value,
				share_id: __props.shareId
			});
		}
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", _hoisted_1$1, [createVNode(Input_default, {
				readonly: "",
				"model-value": __props.url,
				"aria-label": _ctx.$t("shareWorkflow.shareUrlLabel"),
				class: "flex-1",
				onFocus: _cache[0] || (_cache[0] = ($event) => $event.target.select())
			}, null, 8, ["model-value", "aria-label"]), createVNode(Button_default, {
				variant: "secondary",
				size: "lg",
				class: "font-normal",
				onClick: handleCopy
			}, {
				default: withCtx(() => [createTextVNode(toDisplayString(unref(copied) ? _ctx.$t("shareWorkflow.linkCopied") : _ctx.$t("shareWorkflow.copyLink")) + " ", 1), _cache[1] || (_cache[1] = createBaseVNode("i", {
					class: "icon-[lucide--link] size-3.5",
					"aria-hidden": "true"
				}, null, -1))]),
				_: 1
			})]);
		};
	}
});
//#endregion
//#region src/platform/workflow/sharing/composables/useComfyHubPublishDialog.ts
var DIALOG_KEY$1 = "global-comfyhub-publish";
/** Reka's default `md` frame is 576px — too narrow for this 1400px layout. */
var PUBLISH_CONTENT_CLASS = "w-[90vw] max-w-[1400px] sm:max-w-[1400px] h-[80vh] rounded-2xl overflow-hidden";
function useComfyHubPublishDialog() {
	const dialogService = useDialogService();
	const dialogStore = useDialogStore();
	function hide() {
		dialogStore.closeDialog({ key: DIALOG_KEY$1 });
	}
	function show() {
		dialogService.showLayoutDialog({
			key: DIALOG_KEY$1,
			component: ComfyHubPublishDialog_default,
			props: { onClose: hide },
			dialogComponentProps: {
				size: "full",
				contentClass: PUBLISH_CONTENT_CLASS
			}
		});
	}
	return {
		show,
		hide
	};
}
//#endregion
//#region src/platform/workflow/sharing/components/ShareWorkflowDialogContent.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1 = { class: "flex w-full flex-col" };
var _hoisted_2 = { class: "flex h-12 items-center justify-between gap-2 border-b border-border-default px-4" };
var _hoisted_3 = {
	key: 0,
	role: "tablist",
	class: "flex flex-1 items-center gap-2"
};
var _hoisted_4 = {
	key: 1,
	class: "select-none"
};
var _hoisted_5 = { class: "flex flex-col gap-4 p-4" };
var _hoisted_6 = ["role", "aria-labelledby"];
var _hoisted_7 = { class: "m-0 text-sm text-muted-foreground" };
var _hoisted_8 = {
	key: 0,
	class: "flex flex-col gap-1"
};
var _hoisted_9 = { class: "text-sm font-medium text-muted-foreground" };
var _hoisted_10 = {
	key: 0,
	class: "m-0 text-xs text-muted-foreground"
};
var _hoisted_11 = {
	key: 1,
	class: "m-0 text-sm text-muted-foreground italic"
};
var _hoisted_12 = { class: "flex flex-col gap-1" };
var _hoisted_13 = {
	key: 0,
	class: "m-0 text-xs text-muted-foreground"
};
var _hoisted_14 = { class: "m-0 text-xs text-muted-foreground" };
var _hoisted_15 = {
	key: 0,
	role: "tabpanel",
	"aria-labelledby": "tab-publish",
	"data-testid": "publish-tab-panel",
	class: "flex min-h-0 flex-col gap-4"
};
var _hoisted_16 = { class: "m-0 text-sm text-muted-foreground" };
var _hoisted_17 = {
	key: 0,
	class: "flex flex-col gap-1"
};
var _hoisted_18 = { class: "text-sm font-medium text-muted-foreground" };
//#endregion
//#region src/platform/workflow/sharing/components/ShareWorkflowDialogContent.vue
var ShareWorkflowDialogContent_default = /* @__PURE__ */ defineComponent({
	__name: "ShareWorkflowDialogContent",
	props: { onClose: { type: Function } },
	setup(__props) {
		const { t, locale } = useI18n();
		const toast = useToast();
		const { flags } = useFeatureFlags();
		const publishDialog = useComfyHubPublishDialog();
		const shareService = useWorkflowShareService();
		const workflowStore = useWorkflowStore();
		const workflowService = useWorkflowService();
		const shareFlowContext = useShareFlowContext();
		function resolveDialogStateFromStatus(status, workflow) {
			if (!status.isPublished) return {
				publishResult: null,
				dialogState: "ready"
			};
			const publishedAtMs = status.publishedAt.getTime();
			const lastModifiedMs = workflow.lastModified;
			return {
				publishResult: {
					shareId: status.shareId,
					shareUrl: status.shareUrl,
					publishedAt: status.publishedAt
				},
				dialogState: lastModifiedMs > publishedAtMs ? "stale" : "shared"
			};
		}
		const dialogState = ref("loading");
		const dialogMode = ref("shareLink");
		const acknowledged = ref(false);
		const workflowName = ref("");
		const nameInputRef = ref(null);
		const publishNameInputRef = ref(null);
		function focusActiveNameInput() {
			const input = dialogMode.value === "publishToHub" ? publishNameInputRef.value : nameInputRef.value;
			input?.focus();
			input?.select();
		}
		const isTemporary = computed(() => workflowStore.activeWorkflow?.isTemporary ?? false);
		watch(dialogState, async (state) => {
			if (state === "unsaved" && isTemporary.value) {
				await nextTick();
				focusActiveNameInput();
			}
		});
		const { state: assetInfo, isLoading: isLoadingAssets, execute: reloadAssets } = useAsyncState(() => shareService.getShareableAssets(), []);
		const requiresAcknowledgment = computed(() => assetInfo.value.length > 0);
		const showPublishToHubTab = computed(() => flags.comfyHubUploadEnabled);
		function handleOpenPublishDialog() {
			__props.onClose();
			publishDialog.show();
		}
		function tabButtonClass(mode) {
			return cn("cursor-pointer border-none transition-colors", dialogMode.value === mode ? "bg-secondary-background text-base-foreground" : "bg-transparent text-muted-foreground hover:bg-secondary-background-hover");
		}
		async function handleDialogModeChange(nextMode) {
			if (nextMode === dialogMode.value) return;
			if (nextMode === "publishToHub" && !showPublishToHubTab.value) return;
			dialogMode.value = nextMode;
			if (dialogState.value === "unsaved" && isTemporary.value) {
				await nextTick();
				focusActiveNameInput();
			}
		}
		watch(showPublishToHubTab, (isVisible) => {
			if (!isVisible && dialogMode.value === "publishToHub") dialogMode.value = "shareLink";
		});
		const formattedDate = computed(() => {
			if (!publishResult.value) return "";
			return publishResult.value.publishedAt.toLocaleDateString(locale.value, {
				year: "numeric",
				month: "long",
				day: "numeric"
			});
		});
		const publishButtonLabel = computed(() => {
			if (dialogState.value === "stale") return isPublishing.value ? t("shareWorkflow.updatingLink") : t("shareWorkflow.updateLinkButton");
			return isPublishing.value ? t("shareWorkflow.creatingLink") : t("shareWorkflow.createLinkButton");
		});
		function stripJsonExtension(filename) {
			return filename.replace(/\.json$/i, "");
		}
		function buildWorkflowPath(directory, filename) {
			const normalizedDirectory = directory.replace(/\/+$/, "");
			const normalizedFilename = appendJsonExt(stripJsonExtension(filename));
			return normalizedDirectory ? `${normalizedDirectory}/${normalizedFilename}` : normalizedFilename;
		}
		async function refreshDialogState() {
			const workflow = workflowStore.activeWorkflow;
			if (!workflow || workflow.isTemporary || workflow.isModified) {
				dialogState.value = "unsaved";
				useTelemetry()?.trackShareFlow({
					step: "save_prompted",
					...shareFlowContext.value
				});
				if (workflow) workflowName.value = stripJsonExtension(workflow.filename);
				return;
			}
			try {
				const resolved = resolveDialogStateFromStatus(await shareService.getPublishStatus(workflow.path), workflow);
				publishResult.value = resolved.publishResult;
				dialogState.value = resolved.dialogState;
			} catch (error) {
				console.error("Failed to load publish status:", error);
				publishResult.value = null;
				dialogState.value = "ready";
				toast.add({
					severity: "error",
					summary: t("shareWorkflow.loadFailed")
				});
			}
		}
		onMounted(() => {
			refreshDialogState();
		});
		const { isLoading: isSaving, execute: handleSave } = useAsyncState(async () => {
			const workflow = workflowStore.activeWorkflow;
			if (!workflow) return;
			if (workflow.isTemporary) {
				const name = workflowName.value.trim();
				if (!name) return;
				const newPath = buildWorkflowPath(workflow.directory, name);
				await workflowService.renameWorkflow(workflow, newPath);
				await workflowStore.saveWorkflow(workflow);
			} else await workflowService.saveWorkflow(workflow);
			acknowledged.value = false;
			await reloadAssets();
			await refreshDialogState();
		}, void 0, {
			immediate: false,
			onError: (error) => {
				console.error("Failed to save workflow:", error);
				toast.add({
					severity: "error",
					summary: t("shareWorkflow.saveFailedTitle"),
					detail: t("shareWorkflow.saveFailedDescription")
				});
			}
		});
		const { state: publishResult, isLoading: isPublishing, execute: handlePublish } = useAsyncState(async () => {
			const workflow = workflowStore.activeWorkflow;
			if (!workflow) return null;
			const publishableAssets = assetInfo.value;
			if (publishableAssets.length > 0 && !acknowledged.value) return null;
			const result = await shareService.publishWorkflow(workflow.path, publishableAssets);
			dialogState.value = "shared";
			acknowledged.value = false;
			useTelemetry()?.trackShareFlow({
				step: "link_created",
				...shareFlowContext.value,
				share_id: result.shareId
			});
			return result;
		}, null, {
			immediate: false,
			onError: (error) => {
				console.error("Failed to publish workflow:", error);
				toast.add({
					severity: "error",
					summary: t("g.error"),
					detail: error instanceof Error ? error.message : t("g.error")
				});
			}
		});
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", _hoisted_1, [createBaseVNode("header", _hoisted_2, [showPublishToHubTab.value ? (openBlock(), createElementBlock("div", _hoisted_3, [createVNode(Button_default, {
				id: "tab-share-link",
				role: "tab",
				"aria-selected": dialogMode.value === "shareLink",
				class: normalizeClass(tabButtonClass("shareLink")),
				onClick: _cache[0] || (_cache[0] = ($event) => handleDialogModeChange("shareLink"))
			}, {
				default: withCtx(() => [createTextVNode(toDisplayString(_ctx.$t("shareWorkflow.shareLinkTab")), 1)]),
				_: 1
			}, 8, ["aria-selected", "class"]), createVNode(Button_default, {
				id: "tab-publish",
				role: "tab",
				"aria-selected": dialogMode.value === "publishToHub",
				class: normalizeClass(tabButtonClass("publishToHub")),
				onClick: _cache[1] || (_cache[1] = ($event) => handleDialogModeChange("publishToHub"))
			}, {
				default: withCtx(() => [_cache[10] || (_cache[10] = createBaseVNode("i", {
					class: "icon-[lucide--globe] size-4",
					"aria-hidden": "true"
				}, null, -1)), createTextVNode(" " + toDisplayString(_ctx.$t("shareWorkflow.publishToHubTab")), 1)]),
				_: 1
			}, 8, ["aria-selected", "class"])])) : (openBlock(), createElementBlock("div", _hoisted_4, toDisplayString(_ctx.$t("shareWorkflow.shareLinkTab")), 1)), createVNode(Button_default, {
				size: "icon",
				"aria-label": _ctx.$t("g.close"),
				onClick: __props.onClose
			}, {
				default: withCtx(() => [..._cache[11] || (_cache[11] = [createBaseVNode("i", { class: "icon-[lucide--x] size-4" }, null, -1)])]),
				_: 1
			}, 8, ["aria-label", "onClick"])]), withDirectives((openBlock(), createElementBlock("main", _hoisted_5, [withDirectives((openBlock(), createElementBlock("div", {
				role: showPublishToHubTab.value ? "tabpanel" : void 0,
				"aria-labelledby": showPublishToHubTab.value ? "tab-share-link" : void 0,
				class: "flex flex-col gap-4"
			}, [
				dialogState.value === "loading" ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
					createVNode(Skeleton_default, { class: "h-3 w-4/5" }),
					createVNode(Skeleton_default, { class: "h-3 w-3/5" }),
					createVNode(Skeleton_default, { class: "h-10 w-full" })
				], 64)) : createCommentVNode("", true),
				dialogState.value === "unsaved" ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
					createBaseVNode("p", _hoisted_7, toDisplayString(_ctx.$t("shareWorkflow.unsavedDescription")), 1),
					isTemporary.value ? (openBlock(), createElementBlock("label", _hoisted_8, [createBaseVNode("span", _hoisted_9, toDisplayString(_ctx.$t("shareWorkflow.workflowNameLabel")), 1), createVNode(Input_default, {
						ref_key: "nameInputRef",
						ref: nameInputRef,
						modelValue: workflowName.value,
						"onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => workflowName.value = $event),
						disabled: unref(isSaving),
						onKeydown: _cache[3] || (_cache[3] = withKeys(() => unref(handleSave)(), ["enter"]))
					}, null, 8, ["modelValue", "disabled"])])) : createCommentVNode("", true),
					createVNode(Button_default, {
						variant: "primary",
						size: "lg",
						loading: unref(isSaving),
						onClick: _cache[4] || (_cache[4] = () => unref(handleSave)())
					}, {
						default: withCtx(() => [createTextVNode(toDisplayString(unref(isSaving) ? _ctx.$t("shareWorkflow.saving") : _ctx.$t("shareWorkflow.saveButton")), 1)]),
						_: 1
					}, 8, ["loading"])
				], 64)) : createCommentVNode("", true),
				dialogState.value === "ready" || dialogState.value === "stale" ? (openBlock(), createElementBlock(Fragment, { key: 2 }, [
					dialogState.value === "stale" ? (openBlock(), createElementBlock("p", _hoisted_10, toDisplayString(_ctx.$t("shareWorkflow.hasChangesDescription")), 1)) : createCommentVNode("", true),
					unref(isLoadingAssets) ? (openBlock(), createElementBlock("p", _hoisted_11, toDisplayString(_ctx.$t("shareWorkflow.checkingAssets")), 1)) : requiresAcknowledgment.value ? (openBlock(), createBlock(ShareAssetWarningBox_default, {
						key: 2,
						acknowledged: acknowledged.value,
						"onUpdate:acknowledged": _cache[5] || (_cache[5] = ($event) => acknowledged.value = $event),
						items: unref(assetInfo)
					}, null, 8, ["acknowledged", "items"])) : createCommentVNode("", true),
					createVNode(Button_default, {
						variant: "primary",
						size: "lg",
						disabled: unref(isPublishing) || unref(isLoadingAssets) || requiresAcknowledgment.value && !acknowledged.value,
						onClick: _cache[6] || (_cache[6] = () => unref(handlePublish)())
					}, {
						default: withCtx(() => [createTextVNode(toDisplayString(publishButtonLabel.value), 1)]),
						_: 1
					}, 8, ["disabled"])
				], 64)) : createCommentVNode("", true),
				dialogState.value === "shared" && unref(publishResult) ? (openBlock(), createElementBlock(Fragment, { key: 3 }, [createVNode(ShareUrlCopyField_default, {
					url: unref(publishResult).shareUrl,
					"share-id": unref(publishResult).shareId
				}, null, 8, ["url", "share-id"]), createBaseVNode("div", _hoisted_12, [unref(publishResult).publishedAt ? (openBlock(), createElementBlock("p", _hoisted_13, toDisplayString(_ctx.$t("shareWorkflow.publishedOn", { date: formattedDate.value })), 1)) : createCommentVNode("", true), createBaseVNode("p", _hoisted_14, toDisplayString(_ctx.$t("shareWorkflow.successDescription")), 1)])], 64)) : createCommentVNode("", true)
			], 8, _hoisted_6)), [[vShow, dialogMode.value === "shareLink"], [unref(vAutoAnimate)]]), showPublishToHubTab.value ? withDirectives((openBlock(), createElementBlock("div", _hoisted_15, [dialogState.value === "loading" ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
				createVNode(Skeleton_default, { class: "h-3 w-4/5" }),
				createVNode(Skeleton_default, { class: "h-3 w-3/5" }),
				createVNode(Skeleton_default, { class: "h-10 w-full" })
			], 64)) : dialogState.value === "unsaved" ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
				createBaseVNode("p", _hoisted_16, toDisplayString(_ctx.$t("comfyHubPublish.unsavedDescription")), 1),
				isTemporary.value ? (openBlock(), createElementBlock("label", _hoisted_17, [createBaseVNode("span", _hoisted_18, toDisplayString(_ctx.$t("shareWorkflow.workflowNameLabel")), 1), createVNode(Input_default, {
					ref_key: "publishNameInputRef",
					ref: publishNameInputRef,
					modelValue: workflowName.value,
					"onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => workflowName.value = $event),
					disabled: unref(isSaving),
					onKeydown: _cache[8] || (_cache[8] = withKeys(() => unref(handleSave)(), ["enter"]))
				}, null, 8, ["modelValue", "disabled"])])) : createCommentVNode("", true),
				createVNode(Button_default, {
					variant: "primary",
					size: "lg",
					loading: unref(isSaving),
					onClick: _cache[9] || (_cache[9] = () => unref(handleSave)())
				}, {
					default: withCtx(() => [createTextVNode(toDisplayString(unref(isSaving) ? _ctx.$t("shareWorkflow.saving") : _ctx.$t("shareWorkflow.saveButton")), 1)]),
					_: 1
				}, 8, ["loading"])
			], 64)) : (openBlock(), createBlock(ComfyHubPublishIntroPanel_default, {
				key: 2,
				"data-testid": "publish-intro",
				"is-update": !!unref(publishResult),
				"on-create-profile": handleOpenPublishDialog,
				"on-close": __props.onClose,
				"show-close-button": false
			}, null, 8, ["is-update", "on-close"]))])), [[vShow, dialogMode.value === "publishToHub"], [unref(vAutoAnimate)]]) : createCommentVNode("", true)])), [[unref(vAutoAnimate)]])]);
		};
	}
});
//#endregion
//#region src/platform/workflow/sharing/composables/useShareDialog.ts
var DIALOG_KEY = "global-share-workflow";
function useShareDialog() {
	const dialogService = useDialogService();
	const dialogStore = useDialogStore();
	const { pruneLinearData } = useAppModeStore();
	const workflowStore = useWorkflowStore();
	const shareFlowContext = useShareFlowContext();
	function hide() {
		dialogStore.closeDialog({ key: DIALOG_KEY });
	}
	function showNoOutputsDialogIfRequired(share) {
		const wf = workflowStore.activeWorkflow;
		if (!wf) return share();
		const isAppDefault = wf.initialMode === "app";
		const linearData = wf.changeTracker.activeState.extra?.linearData;
		const { outputs } = pruneLinearData(linearData);
		if (isAppDefault && outputs.length === 0) {
			const dialog = showConfirmDialog({
				headerProps: { title: t("shareNoOutputs.title") },
				props: {
					promptText: t("shareNoOutputs.message"),
					preserveNewlines: true
				},
				footerProps: {
					confirmText: t("shareNoOutputs.shareAnyway"),
					confirmVariant: "secondary",
					onCancel: () => dialogStore.closeDialog(dialog),
					onConfirm: () => {
						dialogStore.closeDialog(dialog);
						share();
					}
				}
			});
			return;
		}
		share();
	}
	function showShareDialog() {
		useTelemetry()?.trackShareFlow({
			step: "dialog_opened",
			...shareFlowContext.value
		});
		dialogService.showLayoutDialog({
			key: DIALOG_KEY,
			component: ShareWorkflowDialogContent_default,
			props: { onClose: hide },
			dialogComponentProps: { contentClass: "rounded-2xl overflow-hidden" }
		});
	}
	function show() {
		showNoOutputsDialogIfRequired(showShareDialog);
	}
	return {
		show,
		hide
	};
}
//#endregion
export { useShareDialog };
