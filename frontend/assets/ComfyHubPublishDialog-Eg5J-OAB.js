import "./rolldown-runtime-xtsTai4I.js";
import { Zt as orderBy, l as v4, o as monitorForElements, r as setCustomNativeDragPreview, s as vAutoAnimate } from "./vendor-other-BPEcPQTD.js";
import { Dt as withDirectives, E as withModifiers, Et as withCtx, F as createBaseVNode, Ft as reactive, G as defineComponent, H as createTextVNode, I as createBlock, Jt as normalizeClass, Kt as unref, L as createCommentVNode, Lt as ref, O as Fragment, P as computed, Q as mergeModels, R as createElementBlock, St as watch, T as withKeys, U as createVNode, Xt as normalizeStyle, Zt as toDisplayString, b as vModelCheckbox, dt as renderList, et as nextTick, lt as openBlock, ot as onMounted, rt as onBeforeUnmount, ut as provide, yt as useModel } from "./vendor-vue-core-C1utdb0s.js";
import { H as useStepper, I as useObjectUrl, P as useMouseInElement, _ as useDropZone, p as useAsyncState } from "./vendor-vueuse-BxKIIsKg.js";
import { Si as TagsInputItem_default, Ti as TagsInput_default, Vt as useWorkflowService, Xi as BaseModalLayout_default, Yi as StatusBadge_default, Z as useCurrentUser, _i as TagsInputItemText_default, jt as useWorkflowStore, mu as WORKSPACE_STORAGE_KEYS, vi as TagsInputItemDelete_default, vu as useErrorHandling, wi as TagsInputInput_default } from "./layoutStore-CZsuzg91.js";
import { i as api } from "./api-Bt-fGt5a.js";
import { r as getErrorMessage } from "./reportError-LG-zfbNw.js";
import { t as useToastStore } from "./toastStore-CTfykAzG.js";
import { r as useI18n } from "./vendor-i18n-BZvE7WBQ.js";
import { d as t } from "./i18n-C3J-ToPr.js";
import { t as appendJsonExt } from "./formatUtil-DuxXRy1z.js";
import { t as useFeatureFlags } from "./useFeatureFlags-DAoj_aDd.js";
import { hn as CollapsibleRoot_default, mn as CollapsibleContent_default, pn as CollapsibleTrigger_default } from "./vendor-reka-ui-tdehH9A1.js";
import { t as cn } from "./src-DI1bBfrb.js";
import { t as Button_default } from "./Button-j0oCzR82.js";
import { f as useToast } from "./vendor-primevue-C3d0HJ53.js";
import { n as OnCloseKey } from "./widgetTypes-CisWqKm9.js";
import { t as Input_default } from "./Input-Cx8jjgHK.js";
import { t as Textarea_default } from "./Textarea-r-a2mhot.js";
import { t as Skeleton_default } from "./Skeleton-gXY6B2Cf.js";
import { n as ToggleGroup_default, t as ToggleGroupItem_default } from "./ToggleGroupItem-Da4A26JJ.js";
import "./toggle-group-B0brfUuj.js";
import { a as zHubAssetUploadUrlResponse, c as zHubWorkflowPublishResponse, i as usePragmaticDroppable, n as AssetSectionList_default, o as zHubLabelListResponse, r as usePragmaticDraggable, s as zHubProfileResponse, t as useWorkflowShareService } from "./workflowShareService-D2WyTi0Z.js";
//#region src/platform/workflow/sharing/components/publish/ComfyHubPublishNav.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1$11 = {
	"data-testid": "publish-nav",
	class: "flex flex-col gap-6 px-3 py-4"
};
var _hoisted_2$10 = { class: "flex list-none flex-col p-0" };
var _hoisted_3$9 = ["aria-current"];
var _hoisted_4$8 = { class: "truncate text-sm text-base-foreground" };
var _hoisted_5$7 = {
	key: 0,
	class: "flex h-10 w-full items-center rounded-lg bg-secondary-background-selected pl-11 select-none"
};
var _hoisted_6$4 = { class: "truncate text-sm text-base-foreground" };
//#endregion
//#region src/platform/workflow/sharing/components/publish/ComfyHubPublishNav.vue
var ComfyHubPublishNav_default = /* @__PURE__ */ defineComponent({
	__name: "ComfyHubPublishNav",
	props: { currentStep: {} },
	emits: ["stepClick"],
	setup(__props) {
		const { t } = useI18n();
		const steps = [
			{
				name: "describe",
				number: 1,
				label: t("comfyHubPublish.stepDescribe")
			},
			{
				name: "examples",
				number: 2,
				label: t("comfyHubPublish.stepExamples")
			},
			{
				name: "finish",
				number: 3,
				label: t("comfyHubPublish.stepFinish")
			}
		];
		const isProfileCreationFlow = computed(() => __props.currentStep === "profileCreation");
		const currentStepNumber = computed(() => {
			if (isProfileCreationFlow.value) return 3;
			return steps.find((step) => step.name === __props.currentStep)?.number ?? 0;
		});
		function isCurrentStep(stepName) {
			return __props.currentStep === stepName;
		}
		function isCompletedStep(stepName) {
			return (steps.find((step) => step.name === stepName)?.number ?? 0) < currentStepNumber.value;
		}
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("nav", _hoisted_1$11, [createBaseVNode("ol", _hoisted_2$10, [(openBlock(), createElementBlock(Fragment, null, renderList(steps, (step) => {
				return withDirectives((openBlock(), createElementBlock("li", {
					key: step.name,
					"aria-current": isCurrentStep(step.name) ? "step" : void 0,
					class: normalizeClass(unref(cn)(isProfileCreationFlow.value && step.name === "finish" && "rounded-lg bg-secondary-background-hover"))
				}, [createVNode(Button_default, {
					variant: "textonly",
					size: "unset",
					class: normalizeClass(unref(cn)("h-10 w-full justify-start rounded-lg px-4 py-3 text-left", isCurrentStep(step.name) && !(isProfileCreationFlow.value && step.name === "finish") ? "bg-secondary-background-selected" : "hover:bg-interface-menu-component-surface-hovered")),
					onClick: ($event) => _ctx.$emit("stepClick", step.name)
				}, {
					default: withCtx(() => [createVNode(StatusBadge_default, {
						label: step.number,
						variant: "circle",
						severity: "contrast",
						class: normalizeClass(unref(cn)("size-5 shrink-0 border bg-transparent font-inter text-xs font-bold", isCurrentStep(step.name) ? "border-base-foreground bg-base-foreground text-base-background" : isCompletedStep(step.name) ? "border-base-foreground text-base-foreground" : "border-muted-foreground text-muted-foreground"))
					}, null, 8, ["label", "class"]), createBaseVNode("span", _hoisted_4$8, toDisplayString(step.label), 1)]),
					_: 2
				}, 1032, ["class", "onClick"]), isProfileCreationFlow.value && step.name === "finish" ? withDirectives((openBlock(), createElementBlock("div", _hoisted_5$7, [createBaseVNode("span", _hoisted_6$4, toDisplayString(_ctx.$t("comfyHubProfile.profileCreationNav")), 1)])), [[unref(vAutoAnimate)]]) : createCommentVNode("", true)], 10, _hoisted_3$9)), [[unref(vAutoAnimate)]]);
			}), 64))])]);
		};
	}
});
//#endregion
//#region src/platform/workflow/sharing/services/comfyHubService.ts
function normalizeThumbnailType(type) {
	if (type === "imageComparison") return "image_comparison";
	return type;
}
async function parseErrorMessage(response, fallbackMessage) {
	const body = await response.json().catch(() => null);
	if (!body || typeof body !== "object") return fallbackMessage;
	if ("message" in body && typeof body.message === "string") return body.message;
	return fallbackMessage;
}
async function parseRequiredJson(response, parser, fallbackMessage) {
	const payload = await response.json().catch(() => null);
	const parsed = parser.safeParse(payload);
	if (!parsed.success) throw new Error(fallbackMessage);
	return parsed.data;
}
function useComfyHubService() {
	async function requestAssetUploadUrl(input) {
		const response = await api.fetchApi("/hub/assets/upload-url", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				filename: input.filename,
				content_type: input.contentType
			})
		});
		if (!response.ok) throw new Error(await parseErrorMessage(response, "Failed to request upload URL"));
		return parseRequiredJson(response, zHubAssetUploadUrlResponse, "Invalid upload URL response from server");
	}
	async function uploadFileToPresignedUrl(input) {
		const response = await fetch(input.uploadUrl, {
			method: "PUT",
			headers: { "Content-Type": input.contentType },
			body: input.file
		});
		if (!response.ok) {
			const message = await parseErrorMessage(response, "Failed to upload file to presigned URL");
			throw new Error(message);
		}
	}
	async function getMyProfile() {
		const response = await api.fetchApi("/hub/profiles/me");
		if (!response.ok) {
			if (response.status === 404) return null;
			throw new Error(await parseErrorMessage(response, "Failed to load ComfyHub profile"));
		}
		return parseRequiredJson(response, zHubProfileResponse, "Invalid profile response from server");
	}
	async function createProfile(input) {
		const response = await api.fetchApi("/hub/profiles", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				workspace_id: input.workspaceId,
				username: input.username,
				display_name: input.displayName,
				description: input.description,
				avatar_token: input.avatarToken
			})
		});
		if (!response.ok) throw new Error(await parseErrorMessage(response, "Failed to create ComfyHub profile"));
		return parseRequiredJson(response, zHubProfileResponse, "Invalid profile response from server");
	}
	async function publishWorkflow(input) {
		const body = {
			username: input.username,
			name: input.name,
			workflow_filename: input.workflowFilename,
			asset_ids: input.assetIds,
			description: input.description,
			tags: input.tags,
			models: input.models,
			custom_nodes: input.customNodes,
			thumbnail_type: input.thumbnailType ? normalizeThumbnailType(input.thumbnailType) : void 0,
			thumbnail_token_or_url: input.thumbnailTokenOrUrl,
			thumbnail_comparison_token_or_url: input.thumbnailComparisonTokenOrUrl,
			sample_image_tokens_or_urls: input.sampleImageTokensOrUrls,
			tutorial_url: input.tutorialUrl,
			metadata: input.metadata
		};
		const response = await api.fetchApi("/hub/workflows", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(body)
		});
		if (!response.ok) throw new Error(await parseErrorMessage(response, "Failed to publish workflow"));
		return parseRequiredJson(response, zHubWorkflowPublishResponse, "Invalid publish response from server");
	}
	async function fetchTagLabels() {
		const response = await api.fetchApi("/hub/labels?type=tag");
		if (!response.ok) throw new Error(await parseErrorMessage(response, "Failed to fetch hub labels"));
		return (await parseRequiredJson(response, zHubLabelListResponse, "Invalid label list response from server")).labels.map((label) => label.display_name);
	}
	return {
		requestAssetUploadUrl,
		uploadFileToPresignedUrl,
		getMyProfile,
		createProfile,
		publishWorkflow,
		fetchTagLabels
	};
}
//#endregion
//#region src/platform/workflow/sharing/composables/useComfyHubProfileGate.ts
var hasProfile = ref(null);
var isCheckingProfile = ref(false);
var isFetchingProfile = ref(false);
var profile = ref(null);
var cachedUserId = ref(null);
var inflightFetch = null;
function getCurrentWorkspaceId() {
	const workspaceJson = sessionStorage.getItem(WORKSPACE_STORAGE_KEYS.CURRENT_WORKSPACE);
	if (!workspaceJson) throw new Error("Unable to determine current workspace");
	let workspace;
	try {
		workspace = JSON.parse(workspaceJson);
	} catch {
		throw new Error("Unable to determine current workspace");
	}
	if (!workspace || typeof workspace !== "object" || !("id" in workspace) || typeof workspace.id !== "string" || workspace.id.length === 0) throw new Error("Unable to determine current workspace");
	return workspace.id;
}
function useComfyHubProfileGate() {
	const { resolvedUserInfo } = useCurrentUser();
	const { toastErrorHandler } = useErrorHandling();
	const { getMyProfile, requestAssetUploadUrl, uploadFileToPresignedUrl, createProfile: createComfyHubProfile } = useComfyHubService();
	function syncCachedProfileWithCurrentUser() {
		const currentUserId = resolvedUserInfo.value?.id ?? null;
		if (cachedUserId.value === currentUserId) return;
		hasProfile.value = null;
		profile.value = null;
		cachedUserId.value = currentUserId;
	}
	async function performFetch() {
		isFetchingProfile.value = true;
		try {
			const nextProfile = await getMyProfile();
			if (!nextProfile) {
				hasProfile.value = false;
				profile.value = null;
				return null;
			}
			hasProfile.value = true;
			profile.value = nextProfile;
			return nextProfile;
		} catch (error) {
			hasProfile.value = false;
			toastErrorHandler(error);
			return null;
		} finally {
			isFetchingProfile.value = false;
			inflightFetch = null;
		}
	}
	function fetchProfile(options) {
		syncCachedProfileWithCurrentUser();
		if (!options?.force && profile.value) return Promise.resolve(profile.value);
		if (!options?.force && inflightFetch) return inflightFetch;
		inflightFetch = performFetch();
		return inflightFetch;
	}
	async function checkProfile() {
		syncCachedProfileWithCurrentUser();
		if (hasProfile.value !== null) return hasProfile.value;
		isCheckingProfile.value = true;
		try {
			return await fetchProfile() !== null;
		} finally {
			isCheckingProfile.value = false;
		}
	}
	async function createProfile(data) {
		syncCachedProfileWithCurrentUser();
		let avatarToken;
		if (data.profilePicture) {
			const contentType = data.profilePicture.type || "application/octet-stream";
			const upload = await requestAssetUploadUrl({
				filename: data.profilePicture.name,
				contentType
			});
			await uploadFileToPresignedUrl({
				uploadUrl: upload.uploadUrl,
				file: data.profilePicture,
				contentType
			});
			avatarToken = upload.token;
		}
		const createdProfile = await createComfyHubProfile({
			workspaceId: getCurrentWorkspaceId(),
			username: data.username,
			displayName: data.name,
			description: data.description,
			avatarToken
		});
		hasProfile.value = true;
		profile.value = createdProfile;
		return createdProfile;
	}
	return {
		hasProfile,
		profile,
		isCheckingProfile,
		isFetchingProfile,
		checkProfile,
		fetchProfile,
		createProfile
	};
}
//#endregion
//#region src/platform/workflow/sharing/utils/validateFileSize.ts
function isFileTooLarge(file, maxSizeMB) {
	const fileSizeMB = file.size / 1024 / 1024;
	if (fileSizeMB <= maxSizeMB) return false;
	useToastStore().add({
		severity: "error",
		summary: t("g.error"),
		detail: t("toastMessages.fileTooLarge", {
			size: fileSizeMB.toFixed(1),
			maxSize: maxSizeMB
		})
	});
	return true;
}
//#endregion
//#region src/platform/workflow/sharing/components/profile/ComfyHubCreateProfileForm.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1$10 = {
	key: 0,
	class: "flex h-16 items-center justify-between px-6"
};
var _hoisted_2$9 = { class: "text-base font-normal text-base-foreground" };
var _hoisted_3$8 = {
	key: 1,
	class: "px-6 pt-6 text-base font-normal text-base-foreground"
};
var _hoisted_4$7 = { class: "flex min-h-0 flex-1 flex-col gap-6 overflow-y-auto px-6 py-4" };
var _hoisted_5$6 = { class: "flex flex-col gap-4" };
var _hoisted_6$3 = {
	for: "profile-picture",
	class: "text-sm text-muted-foreground"
};
var _hoisted_7$3 = { class: "flex size-13 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-linear-to-b from-green-600/50 to-green-900" };
var _hoisted_8$3 = ["src", "alt"];
var _hoisted_9$2 = {
	key: 1,
	class: "text-base text-white"
};
var _hoisted_10$2 = { class: "flex flex-col gap-6" };
var _hoisted_11$2 = { class: "flex flex-col gap-4" };
var _hoisted_12$2 = {
	for: "profile-name",
	class: "text-sm text-muted-foreground"
};
var _hoisted_13$2 = { class: "flex flex-col gap-2" };
var _hoisted_14$1 = {
	for: "profile-username",
	class: "text-sm text-muted-foreground"
};
var _hoisted_15$1 = { class: "relative" };
var _hoisted_16$1 = {
	key: 0,
	id: "profile-username-error",
	class: "text-xs text-destructive-background"
};
var _hoisted_17$1 = { class: "flex flex-col gap-2" };
var _hoisted_18$1 = {
	for: "profile-description",
	class: "text-sm text-muted-foreground"
};
var _hoisted_19$1 = { class: "flex items-center justify-end gap-4 border-t border-border-default px-6 py-4" };
//#endregion
//#region src/platform/workflow/sharing/components/profile/ComfyHubCreateProfileForm.vue
var ComfyHubCreateProfileForm_default = /* @__PURE__ */ defineComponent({
	__name: "ComfyHubCreateProfileForm",
	props: {
		onProfileCreated: { type: Function },
		onClose: { type: Function },
		showCloseButton: {
			type: Boolean,
			default: true
		}
	},
	setup(__props) {
		const { createProfile } = useComfyHubProfileGate();
		const toast = useToast();
		const { t } = useI18n();
		const name = ref("");
		const username = ref("");
		const description = ref("");
		const profilePictureFile = ref(null);
		const profilePreviewUrl = useObjectUrl(profilePictureFile);
		const isCreating = ref(false);
		const VALID_USERNAME_PATTERN = /^[a-z0-9][a-z0-9-]{1,40}[a-z0-9]$/;
		const isUsernameValid = computed(() => VALID_USERNAME_PATTERN.test(username.value));
		const showUsernameError = computed(() => username.value.length > 0 && !isUsernameValid.value);
		const profileInitial = computed(() => {
			const source = name.value.trim() || username.value.trim();
			return source ? source[0].toUpperCase() : "C";
		});
		function handleProfileSelect(event) {
			if (!(event.target instanceof HTMLInputElement)) return;
			const file = event.target.files?.[0];
			if (!file || isFileTooLarge(file, 10)) return;
			profilePictureFile.value = file;
		}
		async function handleCreate() {
			if (isCreating.value) return;
			isCreating.value = true;
			try {
				const profile = await createProfile({
					username: username.value.trim(),
					name: name.value.trim() || void 0,
					description: description.value.trim() || void 0,
					profilePicture: profilePictureFile.value ?? void 0
				});
				__props.onProfileCreated(profile);
			} catch (error) {
				toast.add({
					severity: "error",
					summary: t("g.error"),
					detail: error instanceof Error ? error.message : t("g.error")
				});
			} finally {
				isCreating.value = false;
			}
		}
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("form", {
				class: "flex min-h-0 flex-1 flex-col overflow-hidden bg-base-background",
				onSubmit: _cache[3] || (_cache[3] = withModifiers(() => {}, ["prevent"]))
			}, [
				__props.showCloseButton ? (openBlock(), createElementBlock("header", _hoisted_1$10, [createBaseVNode("h2", _hoisted_2$9, toDisplayString(_ctx.$t("comfyHubProfile.createProfileTitle")), 1), createVNode(Button_default, {
					size: "icon",
					"aria-label": _ctx.$t("g.close"),
					onClick: __props.onClose
				}, {
					default: withCtx(() => [..._cache[4] || (_cache[4] = [createBaseVNode("i", { class: "icon-[lucide--x] size-4" }, null, -1)])]),
					_: 1
				}, 8, ["aria-label", "onClick"])])) : (openBlock(), createElementBlock("h2", _hoisted_3$8, toDisplayString(_ctx.$t("comfyHubProfile.createProfileTitle")), 1)),
				createBaseVNode("div", _hoisted_4$7, [createBaseVNode("div", _hoisted_5$6, [createBaseVNode("label", _hoisted_6$3, toDisplayString(_ctx.$t("comfyHubProfile.chooseProfilePicture")), 1), createBaseVNode("label", _hoisted_7$3, [createBaseVNode("input", {
					id: "profile-picture",
					type: "file",
					accept: "image/*",
					class: "hidden",
					onChange: handleProfileSelect
				}, null, 32), unref(profilePreviewUrl) ? (openBlock(), createElementBlock("img", {
					key: 0,
					src: unref(profilePreviewUrl),
					alt: _ctx.$t("comfyHubProfile.chooseProfilePicture"),
					class: "size-full rounded-full object-cover"
				}, null, 8, _hoisted_8$3)) : (openBlock(), createElementBlock("span", _hoisted_9$2, toDisplayString(profileInitial.value), 1))])]), createBaseVNode("div", _hoisted_10$2, [
					createBaseVNode("div", _hoisted_11$2, [createBaseVNode("label", _hoisted_12$2, toDisplayString(_ctx.$t("comfyHubProfile.nameLabel")), 1), createVNode(Input_default, {
						id: "profile-name",
						modelValue: name.value,
						"onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => name.value = $event),
						placeholder: _ctx.$t("comfyHubProfile.namePlaceholder")
					}, null, 8, ["modelValue", "placeholder"])]),
					createBaseVNode("div", _hoisted_13$2, [
						createBaseVNode("label", _hoisted_14$1, toDisplayString(_ctx.$t("comfyHubProfile.usernameLabel")), 1),
						createBaseVNode("div", _hoisted_15$1, [createBaseVNode("span", { class: normalizeClass(unref(cn)("pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-sm", username.value ? "text-base-foreground" : "text-muted-foreground")) }, " @ ", 2), createVNode(Input_default, {
							id: "profile-username",
							modelValue: username.value,
							"onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => username.value = $event),
							class: "pl-7",
							"aria-invalid": showUsernameError.value ? "true" : "false",
							"aria-describedby": showUsernameError.value ? "profile-username-error" : void 0
						}, null, 8, [
							"modelValue",
							"aria-invalid",
							"aria-describedby"
						])]),
						showUsernameError.value ? (openBlock(), createElementBlock("p", _hoisted_16$1, toDisplayString(_ctx.$t("comfyHubProfile.usernameError")), 1)) : createCommentVNode("", true)
					]),
					createBaseVNode("div", _hoisted_17$1, [createBaseVNode("label", _hoisted_18$1, toDisplayString(_ctx.$t("comfyHubProfile.descriptionLabel")), 1), createVNode(Textarea_default, {
						id: "profile-description",
						modelValue: description.value,
						"onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => description.value = $event),
						placeholder: _ctx.$t("comfyHubProfile.descriptionPlaceholder"),
						class: "h-24 resize-none rounded-lg border-none bg-secondary-background p-4 text-sm shadow-none"
					}, null, 8, ["modelValue", "placeholder"])])
				])]),
				createBaseVNode("footer", _hoisted_19$1, [createVNode(Button_default, {
					size: "lg",
					onClick: __props.onClose
				}, {
					default: withCtx(() => [createTextVNode(toDisplayString(_ctx.$t("g.cancel")), 1)]),
					_: 1
				}, 8, ["onClick"]), createVNode(Button_default, {
					variant: "primary",
					size: "lg",
					disabled: !isUsernameValid.value || isCreating.value,
					onClick: handleCreate
				}, {
					default: withCtx(() => [createTextVNode(toDisplayString(isCreating.value ? _ctx.$t("comfyHubProfile.creatingProfile") : _ctx.$t("comfyHubProfile.createProfile")), 1)]),
					_: 1
				}, 8, ["disabled"])])
			], 32);
		};
	}
});
var COMFY_HUB_TAG_OPTIONS = orderBy([
	{
		tag: "API",
		count: 143
	},
	{
		tag: "Video",
		count: 102
	},
	{
		tag: "Image",
		count: 98
	},
	{
		tag: "Text to Image",
		count: 61
	},
	{
		tag: "Image to Video",
		count: 48
	},
	{
		tag: "Image Edit",
		count: 46
	},
	{
		tag: "Text to Video",
		count: 34
	},
	{
		tag: "Audio",
		count: 20
	},
	{
		tag: "3D",
		count: 19
	},
	{
		tag: "FLF2V",
		count: 18
	},
	{
		tag: "ControlNet",
		count: 16
	},
	{
		tag: "Image Upscale",
		count: 16
	},
	{
		tag: "Product",
		count: 11
	},
	{
		tag: "Text to Audio",
		count: 10
	},
	{
		tag: "Image to 3D",
		count: 9
	},
	{
		tag: "Inpainting",
		count: 8
	},
	{
		tag: "Character Reference",
		count: 6
	},
	{
		tag: "Video to Video",
		count: 6
	},
	{
		tag: "Video Upscale",
		count: 6
	},
	{
		tag: "Mockup",
		count: 5
	},
	{
		tag: "Outpainting",
		count: 5
	},
	{
		tag: "Preprocessor",
		count: 5
	},
	{
		tag: "Relight",
		count: 5
	},
	{
		tag: "Voice Cloning",
		count: 5
	},
	{
		tag: "Brand Design",
		count: 4
	},
	{
		tag: "Fashion",
		count: 4
	},
	{
		tag: "Image to Model",
		count: 4
	},
	{
		tag: "Portrait",
		count: 4
	},
	{
		tag: "Text to Model",
		count: 4
	},
	{
		tag: "Video Edit",
		count: 4
	},
	{
		tag: "Anime",
		count: 3
	},
	{
		tag: "Audio to Audio",
		count: 3
	},
	{
		tag: "Audio to Video",
		count: 3
	},
	{
		tag: "LLM",
		count: 3
	},
	{
		tag: "Motion Control",
		count: 3
	},
	{
		tag: "Music",
		count: 3
	},
	{
		tag: "Style Reference",
		count: 3
	},
	{
		tag: "Style Transfer",
		count: 3
	},
	{
		tag: "Text to Speech",
		count: 3
	},
	{
		tag: "3D Model",
		count: 2
	},
	{
		tag: "Audio Editing",
		count: 2
	},
	{
		tag: "Character",
		count: 2
	},
	{
		tag: "Layer Decompose",
		count: 2
	},
	{
		tag: "Lip Sync",
		count: 2
	},
	{
		tag: "Multiple Angles",
		count: 2
	},
	{
		tag: "Remove Background",
		count: 2
	},
	{
		tag: "Vector",
		count: 2
	},
	{
		tag: "Brand",
		count: 1
	},
	{
		tag: "Canny",
		count: 1
	},
	{
		tag: "Depth Map",
		count: 1
	},
	{
		tag: "Frame Interpolation",
		count: 1
	},
	{
		tag: "icon",
		count: 1
	},
	{
		tag: "Image Enhancement",
		count: 1
	},
	{
		tag: "Layout Design",
		count: 1
	},
	{
		tag: "Normal Map",
		count: 1
	},
	{
		tag: "OpenPose",
		count: 1
	},
	{
		tag: "Pose transfer",
		count: 1
	},
	{
		tag: "Replacement",
		count: 1
	},
	{
		tag: "Sound Effects",
		count: 1
	},
	{
		tag: "Speech to Text",
		count: 1
	},
	{
		tag: "Text Generation",
		count: 1
	},
	{
		tag: "Turbo",
		count: 1
	},
	{
		tag: "Video Extension",
		count: 1
	},
	{
		tag: "Voice Isolation",
		count: 1
	}
], ["count", "tag"], ["desc", "asc"]).map(({ tag }) => tag);
//#endregion
//#region src/platform/workflow/sharing/components/publish/ComfyHubDescribeStep.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1$9 = {
	"data-testid": "publish-describe-step",
	class: "flex min-h-0 flex-1 flex-col gap-6 px-6 py-4"
};
var _hoisted_2$8 = { class: "flex flex-col gap-2" };
var _hoisted_3$7 = { class: "text-sm text-base-foreground" };
var _hoisted_4$6 = { class: "flex flex-col gap-2" };
var _hoisted_5$5 = { class: "text-sm text-base-foreground" };
var _hoisted_6$2 = { class: "flex flex-col gap-2" };
var _hoisted_7$2 = { class: "text-sm text-base-foreground" };
var _hoisted_8$2 = {
	key: 0,
	class: "flex basis-full flex-wrap gap-2"
};
var INITIAL_TAG_SUGGESTION_COUNT = 10;
//#endregion
//#region src/platform/workflow/sharing/components/publish/ComfyHubDescribeStep.vue
var ComfyHubDescribeStep_default = /* @__PURE__ */ defineComponent({
	__name: "ComfyHubDescribeStep",
	props: {
		name: {},
		description: {},
		tags: {}
	},
	emits: [
		"update:name",
		"update:description",
		"update:tags"
	],
	setup(__props, { emit: __emit }) {
		const emit = __emit;
		const showAllSuggestions = ref(false);
		const tagOptions = ref(COMFY_HUB_TAG_OPTIONS);
		const { fetchTagLabels } = useComfyHubService();
		onMounted(async () => {
			try {
				tagOptions.value = await fetchTagLabels();
			} catch {}
		});
		const availableSuggestions = computed(() => tagOptions.value.filter((tag) => !__props.tags.includes(tag)));
		const displayedSuggestions = computed(() => showAllSuggestions.value ? availableSuggestions.value : availableSuggestions.value.slice(0, INITIAL_TAG_SUGGESTION_COUNT));
		const hasHiddenSuggestions = computed(() => !showAllSuggestions.value && availableSuggestions.value.length > INITIAL_TAG_SUGGESTION_COUNT);
		const shouldShowSuggestionToggle = computed(() => showAllSuggestions.value || hasHiddenSuggestions.value);
		function addTag(tag) {
			emit("update:tags", [...__props.tags, tag]);
		}
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", _hoisted_1$9, [
				createBaseVNode("label", _hoisted_2$8, [createBaseVNode("span", _hoisted_3$7, toDisplayString(_ctx.$t("comfyHubPublish.workflowName")), 1), createVNode(Input_default, {
					"data-testid": "publish-name-input",
					"model-value": __props.name,
					placeholder: _ctx.$t("comfyHubPublish.workflowNamePlaceholder"),
					"onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.$emit("update:name", String($event)))
				}, null, 8, ["model-value", "placeholder"])]),
				createBaseVNode("label", _hoisted_4$6, [createBaseVNode("span", _hoisted_5$5, toDisplayString(_ctx.$t("comfyHubPublish.workflowDescription")), 1), createVNode(Textarea_default, {
					"model-value": __props.description,
					placeholder: _ctx.$t("comfyHubPublish.workflowDescriptionPlaceholder"),
					rows: "5",
					"onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => _ctx.$emit("update:description", String($event)))
				}, null, 8, ["model-value", "placeholder"])]),
				createBaseVNode("label", _hoisted_6$2, [createBaseVNode("span", _hoisted_7$2, toDisplayString(_ctx.$t("comfyHubPublish.tagsDescription")), 1), createVNode(TagsInput_default, {
					"data-testid": "publish-tags-input",
					"always-editing": "",
					class: "bg-secondary-background select-none",
					"model-value": __props.tags,
					"onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => _ctx.$emit("update:tags", $event))
				}, {
					default: withCtx(({ isEmpty }) => [(openBlock(true), createElementBlock(Fragment, null, renderList(__props.tags, (tag) => {
						return openBlock(), createBlock(TagsInputItem_default, {
							key: tag,
							value: tag
						}, {
							default: withCtx(() => [createVNode(TagsInputItemText_default), createVNode(TagsInputItemDelete_default)]),
							_: 1
						}, 8, ["value"]);
					}), 128)), createVNode(TagsInputInput_default, { "is-empty": isEmpty }, null, 8, ["is-empty"])]),
					_: 1
				}, 8, ["model-value"])]),
				createVNode(TagsInput_default, {
					disabled: "",
					class: "bg-transparent p-0 hover:bg-transparent"
				}, {
					default: withCtx(() => [displayedSuggestions.value.length > 0 ? (openBlock(), createElementBlock("div", _hoisted_8$2, [(openBlock(true), createElementBlock(Fragment, null, renderList(displayedSuggestions.value, (tag) => {
						return withDirectives((openBlock(), createBlock(TagsInputItem_default, {
							key: tag,
							value: tag,
							class: "cursor-pointer bg-secondary-background px-2 text-muted-foreground transition-colors select-none hover:bg-secondary-background-selected",
							onClick: ($event) => addTag(tag)
						}, {
							default: withCtx(() => [createVNode(TagsInputItemText_default)]),
							_: 1
						}, 8, ["value", "onClick"])), [[unref(vAutoAnimate)]]);
					}), 128))])) : createCommentVNode("", true), shouldShowSuggestionToggle.value ? (openBlock(), createBlock(Button_default, {
						key: 1,
						variant: "muted-textonly",
						size: "unset",
						class: "px-0 text-xs hover:bg-transparent",
						onClick: _cache[3] || (_cache[3] = ($event) => showAllSuggestions.value = !showAllSuggestions.value)
					}, {
						default: withCtx(() => [createTextVNode(toDisplayString(_ctx.$t(showAllSuggestions.value ? "comfyHubPublish.showLessTags" : "comfyHubPublish.showMoreTags")), 1)]),
						_: 1
					})) : createCommentVNode("", true)]),
					_: 1
				})
			]);
		};
	}
});
//#endregion
//#region src/platform/workflow/sharing/components/publish/ReorderableExampleImage.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1$8 = ["aria-label", "onKeydown"];
var _hoisted_2$7 = ["src", "alt"];
//#endregion
//#region src/platform/workflow/sharing/components/publish/ReorderableExampleImage.vue
var ReorderableExampleImage_default = /* @__PURE__ */ defineComponent({
	__name: "ReorderableExampleImage",
	props: {
		image: {},
		index: {},
		total: {},
		instanceId: {}
	},
	emits: [
		"remove",
		"move",
		"insertFiles"
	],
	setup(__props, { emit: __emit }) {
		const emit = __emit;
		function focusVisible(el) {
			el.focus({ focusVisible: true });
		}
		async function handleArrowKey(direction, event) {
			if (event.shiftKey) {
				emit("move", __props.image.id, direction);
				await nextTick();
				if (tileRef.value) focusVisible(tileRef.value);
			} else focusSibling(direction);
		}
		function focusSibling(direction) {
			const sibling = direction < 0 ? tileRef.value?.previousElementSibling : tileRef.value?.nextElementSibling;
			if (sibling instanceof HTMLElement) focusVisible(sibling);
		}
		async function handleRemove() {
			const next = tileRef.value?.nextElementSibling ?? tileRef.value?.previousElementSibling;
			emit("remove", __props.image.id);
			await nextTick();
			if (next instanceof HTMLElement) focusVisible(next);
		}
		function handleFileDrop(event) {
			if (event.dataTransfer?.files?.length) emit("insertFiles", __props.index, event.dataTransfer.files);
		}
		const tileRef = ref(null);
		const state = ref("idle");
		const tileGetter = () => tileRef.value;
		usePragmaticDraggable(tileGetter, {
			getInitialData: () => ({
				type: "example-image",
				imageId: __props.image.id,
				instanceId: __props.instanceId
			}),
			onGenerateDragPreview: ({ nativeSetDragImage }) => {
				setCustomNativeDragPreview({
					nativeSetDragImage,
					render: ({ container }) => {
						const img = tileRef.value?.querySelector("img");
						if (!img) return;
						const preview = img.cloneNode(true);
						preview.style.width = "8rem";
						preview.style.height = "8rem";
						preview.style.objectFit = "cover";
						preview.style.borderRadius = "4px";
						container.appendChild(preview);
					}
				});
			},
			onDragStart: () => {
				state.value = "dragging";
			},
			onDrop: () => {
				state.value = "idle";
			}
		});
		usePragmaticDroppable(tileGetter, {
			getData: () => ({ imageId: __props.image.id }),
			canDrop: ({ source }) => source.data.instanceId === __props.instanceId && source.data.type === "example-image" && source.data.imageId !== __props.image.id,
			onDragEnter: () => {
				state.value = "over";
			},
			onDragLeave: () => {
				state.value = "idle";
			},
			onDrop: () => {
				state.value = "idle";
			}
		});
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", {
				ref_key: "tileRef",
				ref: tileRef,
				class: normalizeClass(unref(cn)("group relative aspect-square overflow-hidden rounded-sm outline-offset-2 focus-visible:outline-2 focus-visible:outline-border-default", state.value === "dragging" && "opacity-40", state.value === "over" && "ring-2 ring-primary")),
				tabindex: "0",
				role: "listitem",
				"aria-label": _ctx.$t("comfyHubPublish.exampleImagePosition", {
					index: __props.index + 1,
					total: __props.total
				}),
				onPointerdown: _cache[1] || (_cache[1] = ($event) => tileRef.value && focusVisible(tileRef.value)),
				onKeydown: [
					_cache[2] || (_cache[2] = withKeys(withModifiers(($event) => handleArrowKey(-1, $event), ["prevent"]), ["left"])),
					_cache[3] || (_cache[3] = withKeys(withModifiers(($event) => handleArrowKey(1, $event), ["prevent"]), ["right"])),
					withKeys(withModifiers(handleRemove, ["prevent"]), ["delete"]),
					withKeys(withModifiers(handleRemove, ["prevent"]), ["backspace"])
				],
				onDragover: _cache[4] || (_cache[4] = withModifiers(() => {}, ["prevent", "stop"])),
				onDrop: withModifiers(handleFileDrop, ["prevent", "stop"])
			}, [createBaseVNode("img", {
				src: __props.image.url,
				alt: _ctx.$t("comfyHubPublish.exampleImage", { index: __props.index + 1 }),
				class: "pointer-events-none size-full object-cover",
				draggable: "false"
			}, null, 8, _hoisted_2$7), createVNode(Button_default, {
				variant: "textonly",
				size: "icon",
				"aria-label": _ctx.$t("comfyHubPublish.removeExampleImage"),
				tabindex: "-1",
				class: "absolute top-1 right-1 flex size-6 items-center justify-center bg-black/60 text-white opacity-0 transition-opacity not-group-has-focus-visible/grid:group-hover:opacity-100 group-focus-visible:opacity-100 hover:bg-black/80",
				onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("remove", __props.image.id))
			}, {
				default: withCtx(() => [..._cache[5] || (_cache[5] = [createBaseVNode("i", {
					class: "icon-[lucide--x] size-4",
					"aria-hidden": "true"
				}, null, -1)])]),
				_: 1
			}, 8, ["aria-label"])], 42, _hoisted_1$8);
		};
	}
});
//#endregion
//#region src/platform/workflow/sharing/components/publish/ComfyHubExamplesStep.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1$7 = { class: "flex min-h-0 flex-1 flex-col" };
var _hoisted_2$6 = { class: "text-sm select-none" };
var _hoisted_3$6 = {
	role: "list",
	class: "group/grid grid gap-2",
	style: { "grid-template-columns": "repeat(auto-fill, 8rem)" }
};
var _hoisted_4$5 = ["aria-label"];
var _hoisted_5$4 = { class: "sr-only" };
var MAX_EXAMPLES = 8;
//#endregion
//#region src/platform/workflow/sharing/components/publish/ComfyHubExamplesStep.vue
var ComfyHubExamplesStep_default = /* @__PURE__ */ defineComponent({
	__name: "ComfyHubExamplesStep",
	props: {
		"exampleImages": { required: true },
		"exampleImagesModifiers": {}
	},
	emits: ["update:exampleImages"],
	setup(__props) {
		const fileInputRef = ref(null);
		const exampleImages = useModel(__props, "exampleImages");
		const showUploadTile = computed(() => exampleImages.value.length < MAX_EXAMPLES);
		const instanceId = Symbol("example-images");
		let cleanupMonitor = () => {};
		onMounted(() => {
			cleanupMonitor = monitorForElements({
				canMonitor: ({ source }) => source.data.instanceId === instanceId,
				onDrop: ({ source, location }) => {
					const destination = location.current.dropTargets[0];
					if (!destination) return;
					const fromId = source.data.imageId;
					const toId = destination.data.imageId;
					if (typeof fromId !== "string" || typeof toId !== "string") return;
					reorderImages(fromId, toId);
				}
			});
		});
		onBeforeUnmount(() => {
			cleanupMonitor();
		});
		function moveByIndex(fromIndex, toIndex) {
			if (fromIndex < 0 || toIndex < 0) return;
			if (toIndex >= exampleImages.value.length || fromIndex === toIndex) return;
			const updated = [...exampleImages.value];
			const [moved] = updated.splice(fromIndex, 1);
			updated.splice(toIndex, 0, moved);
			exampleImages.value = updated;
		}
		function reorderImages(fromId, toId) {
			moveByIndex(exampleImages.value.findIndex((img) => img.id === fromId), exampleImages.value.findIndex((img) => img.id === toId));
		}
		function moveImage(id, direction) {
			const currentIndex = exampleImages.value.findIndex((img) => img.id === id);
			moveByIndex(currentIndex, currentIndex + direction);
		}
		function removeImage(id) {
			const image = exampleImages.value.find((img) => img.id === id);
			if (image?.file) URL.revokeObjectURL(image.url);
			exampleImages.value = exampleImages.value.filter((img) => img.id !== id);
		}
		function createExampleImages(files) {
			return Array.from(files).filter((f) => f.type.startsWith("image/")).filter((f) => !isFileTooLarge(f, 10)).map((file) => ({
				id: v4(),
				url: URL.createObjectURL(file),
				file
			}));
		}
		function addImages(files) {
			const remaining = MAX_EXAMPLES - exampleImages.value.length;
			if (remaining <= 0) return;
			const created = createExampleImages(files);
			const newImages = created.slice(0, remaining);
			for (const img of created.slice(remaining)) URL.revokeObjectURL(img.url);
			if (newImages.length > 0) exampleImages.value = [...newImages, ...exampleImages.value];
		}
		function insertImagesAt(index, files) {
			const created = createExampleImages(files);
			if (created.length === 0) return;
			const updated = [...exampleImages.value];
			const safeIndex = Math.min(Math.max(index, 0), updated.length);
			const remaining = MAX_EXAMPLES - exampleImages.value.length;
			const maxInsert = remaining <= 0 ? Math.max(updated.length - safeIndex, 0) : remaining;
			const newImages = created.slice(0, maxInsert);
			for (const img of created.slice(maxInsert)) URL.revokeObjectURL(img.url);
			if (newImages.length === 0) return;
			if (remaining <= 0) {
				const replacedImages = updated.splice(safeIndex, newImages.length, ...newImages);
				for (const img of replacedImages) if (img.file) URL.revokeObjectURL(img.url);
			} else updated.splice(safeIndex, 0, ...newImages);
			exampleImages.value = updated;
		}
		function handleFileSelect(event) {
			if (!(event.target instanceof HTMLInputElement)) return;
			if (event.target.files?.length) addImages(event.target.files);
		}
		function handleFileDrop(event) {
			if (event.dataTransfer?.files?.length) addImages(event.dataTransfer.files);
		}
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", _hoisted_1$7, [createBaseVNode("p", _hoisted_2$6, toDisplayString(_ctx.$t("comfyHubPublish.examplesDescription", { total: MAX_EXAMPLES })), 1), createBaseVNode("div", _hoisted_3$6, [showUploadTile.value ? (openBlock(), createElementBlock("label", {
				key: 0,
				tabindex: "0",
				role: "button",
				"aria-label": _ctx.$t("comfyHubPublish.uploadExampleImage"),
				class: "flex aspect-square cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-border-default text-center transition-colors hover:border-muted-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-default",
				onDragenter: _cache[0] || (_cache[0] = withModifiers(() => {}, ["stop"])),
				onDragleave: _cache[1] || (_cache[1] = withModifiers(() => {}, ["stop"])),
				onDragover: _cache[2] || (_cache[2] = withModifiers(() => {}, ["prevent", "stop"])),
				onDrop: withModifiers(handleFileDrop, ["prevent", "stop"]),
				onKeydown: [_cache[3] || (_cache[3] = withKeys(withModifiers(($event) => fileInputRef.value?.click(), ["prevent"]), ["enter"])), _cache[4] || (_cache[4] = withKeys(withModifiers(($event) => fileInputRef.value?.click(), ["prevent"]), ["space"]))]
			}, [
				createBaseVNode("input", {
					ref_key: "fileInputRef",
					ref: fileInputRef,
					type: "file",
					accept: "image/*",
					multiple: "",
					class: "hidden",
					onChange: handleFileSelect
				}, null, 544),
				_cache[5] || (_cache[5] = createBaseVNode("i", {
					class: "icon-[lucide--plus] size-4 text-muted-foreground",
					"aria-hidden": "true"
				}, null, -1)),
				createBaseVNode("span", _hoisted_5$4, toDisplayString(_ctx.$t("comfyHubPublish.uploadExampleImage")), 1)
			], 40, _hoisted_4$5)) : createCommentVNode("", true), (openBlock(true), createElementBlock(Fragment, null, renderList(exampleImages.value, (image, index) => {
				return openBlock(), createBlock(ReorderableExampleImage_default, {
					key: image.id,
					image,
					index,
					total: exampleImages.value.length,
					"instance-id": unref(instanceId),
					onRemove: removeImage,
					onMove: moveImage,
					onInsertFiles: insertImagesAt
				}, null, 8, [
					"image",
					"index",
					"total",
					"instance-id"
				]);
			}), 128))])]);
		};
	}
});
//#endregion
//#region src/platform/workflow/sharing/components/ShareAssetWarningBox.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1$6 = { class: "flex flex-col gap-3 rounded-lg" };
var _hoisted_2$5 = { class: "m-0 flex-1 text-left text-sm text-muted-foreground" };
var _hoisted_3$5 = { class: "mt-3 flex cursor-pointer items-center gap-2" };
var _hoisted_4$4 = { class: "text-sm text-muted-foreground" };
//#endregion
//#region src/platform/workflow/sharing/components/ShareAssetWarningBox.vue
var ShareAssetWarningBox_default = /* @__PURE__ */ defineComponent({
	__name: "ShareAssetWarningBox",
	props: /*@__PURE__*/ mergeModels({ items: {} }, {
		"acknowledged": { type: Boolean },
		"acknowledgedModifiers": {}
	}),
	emits: ["update:acknowledged"],
	setup(__props) {
		const acknowledged = useModel(__props, "acknowledged");
		const isWarningExpanded = ref(true);
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", _hoisted_1$6, [createVNode(unref(CollapsibleRoot_default), {
				open: isWarningExpanded.value,
				"onUpdate:open": _cache[0] || (_cache[0] = ($event) => isWarningExpanded.value = $event),
				class: "overflow-hidden rounded-lg bg-secondary-background"
			}, {
				default: withCtx(() => [createVNode(unref(CollapsibleTrigger_default), { "as-child": "" }, {
					default: withCtx(() => [createVNode(Button_default, {
						variant: "secondary",
						class: "w-full justify-between px-4 py-1 text-sm"
					}, {
						default: withCtx(() => [
							_cache[2] || (_cache[2] = createBaseVNode("i", {
								class: "icon-[lucide--circle-alert] size-4 shrink-0 text-warning-background",
								"aria-hidden": "true"
							}, null, -1)),
							createBaseVNode("span", _hoisted_2$5, toDisplayString(_ctx.$t("shareWorkflow.privateAssetsDescription")), 1),
							createBaseVNode("i", { class: normalizeClass(unref(cn)("icon-[lucide--chevron-right] size-4 shrink-0 text-muted-foreground transition-transform", isWarningExpanded.value && "rotate-90")) }, null, 2)
						]),
						_: 1
					})]),
					_: 1
				}), createVNode(unref(CollapsibleContent_default), { class: "overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down" }, {
					default: withCtx(() => [createVNode(AssetSectionList_default, { items: __props.items }, null, 8, ["items"])]),
					_: 1
				})]),
				_: 1
			}, 8, ["open"]), createBaseVNode("label", _hoisted_3$5, [withDirectives(createBaseVNode("input", {
				"onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => acknowledged.value = $event),
				type: "checkbox",
				class: "size-3.5 shrink-0 cursor-pointer accent-primary-background"
			}, null, 512), [[vModelCheckbox, acknowledged.value]]), createBaseVNode("span", _hoisted_4$4, toDisplayString(_ctx.$t("shareWorkflow.acknowledgeCheckbox")), 1)])]);
		};
	}
});
//#endregion
//#region src/platform/workflow/sharing/components/publish/ComfyHubFinishStep.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1$5 = {
	"data-testid": "publish-finish-step",
	class: "flex min-h-0 flex-1 flex-col gap-8 px-6 py-4"
};
var _hoisted_2$4 = { class: "flex flex-col gap-4" };
var _hoisted_3$4 = { class: "text-sm text-base-foreground" };
var _hoisted_4$3 = { class: "flex items-center gap-4 rounded-2xl bg-secondary-background px-6 py-4" };
var _hoisted_5$3 = { class: "flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-linear-to-b from-green-600/50 to-green-900" };
var _hoisted_6$1 = ["src", "alt"];
var _hoisted_7$1 = {
	key: 1,
	class: "text-base text-white"
};
var _hoisted_8$1 = { class: "flex flex-1 flex-col gap-2" };
var _hoisted_9$1 = { class: "text-sm text-base-foreground" };
var _hoisted_10$1 = { class: "text-sm text-muted-foreground" };
var _hoisted_11$1 = {
	key: 0,
	class: "flex flex-col gap-4"
};
var _hoisted_12$1 = { class: "text-sm text-base-foreground" };
var _hoisted_13$1 = {
	key: 0,
	class: "m-0 text-sm text-muted-foreground italic"
};
//#endregion
//#region src/platform/workflow/sharing/components/publish/ComfyHubFinishStep.vue
var ComfyHubFinishStep_default = /* @__PURE__ */ defineComponent({
	__name: "ComfyHubFinishStep",
	props: /*@__PURE__*/ mergeModels({ profile: {} }, {
		"acknowledged": {
			type: Boolean,
			default: false
		},
		"acknowledgedModifiers": {},
		"ready": {
			type: Boolean,
			default: false
		},
		"readyModifiers": {}
	}),
	emits: ["update:acknowledged", "update:ready"],
	setup(__props) {
		const acknowledged = useModel(__props, "acknowledged");
		const ready = useModel(__props, "ready");
		const shareService = useWorkflowShareService();
		const { state: privateAssets, isLoading: isLoadingAssets, error: privateAssetsError } = useAsyncState(() => shareService.getShareableAssets(), []);
		const hasPrivateAssets = computed(() => privateAssets.value.length > 0);
		const isReady = computed(() => !isLoadingAssets.value && !privateAssetsError.value && (!hasPrivateAssets.value || acknowledged.value));
		watch(isReady, (val) => {
			ready.value = val;
		}, { immediate: true });
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", _hoisted_1$5, [createBaseVNode("section", _hoisted_2$4, [createBaseVNode("span", _hoisted_3$4, toDisplayString(_ctx.$t("comfyHubPublish.shareAs")), 1), createBaseVNode("div", _hoisted_4$3, [createBaseVNode("div", _hoisted_5$3, [__props.profile.profilePictureUrl ? (openBlock(), createElementBlock("img", {
				key: 0,
				src: __props.profile.profilePictureUrl,
				alt: __props.profile.username,
				class: "size-full rounded-full object-cover"
			}, null, 8, _hoisted_6$1)) : (openBlock(), createElementBlock("span", _hoisted_7$1, toDisplayString((__props.profile.name ?? __props.profile.username).charAt(0).toUpperCase()), 1))]), createBaseVNode("div", _hoisted_8$1, [createBaseVNode("span", _hoisted_9$1, toDisplayString(__props.profile.name ?? __props.profile.username), 1), createBaseVNode("span", _hoisted_10$1, " @" + toDisplayString(__props.profile.username), 1)])])]), unref(isLoadingAssets) || hasPrivateAssets.value ? (openBlock(), createElementBlock("section", _hoisted_11$1, [createBaseVNode("span", _hoisted_12$1, toDisplayString(_ctx.$t("comfyHubPublish.additionalInfo")), 1), unref(isLoadingAssets) ? (openBlock(), createElementBlock("p", _hoisted_13$1, toDisplayString(_ctx.$t("shareWorkflow.checkingAssets")), 1)) : (openBlock(), createBlock(ShareAssetWarningBox_default, {
				key: 1,
				acknowledged: acknowledged.value,
				"onUpdate:acknowledged": _cache[0] || (_cache[0] = ($event) => acknowledged.value = $event),
				items: unref(privateAssets)
			}, null, 8, ["acknowledged", "items"]))])) : createCommentVNode("", true)]);
		};
	}
});
//#endregion
//#region src/platform/workflow/sharing/components/publish/ComfyHubProfilePromptPanel.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1$4 = {
	"data-testid": "publish-profile-prompt",
	class: "flex min-h-0 flex-1 flex-col gap-4 px-6 py-4"
};
var _hoisted_2$3 = { class: "text-sm text-base-foreground" };
var _hoisted_3$3 = { class: "inline-flex items-center gap-1 text-sm text-base-foreground" };
//#endregion
//#region src/platform/workflow/sharing/components/publish/ComfyHubProfilePromptPanel.vue
var ComfyHubProfilePromptPanel_default = /* @__PURE__ */ defineComponent({
	__name: "ComfyHubProfilePromptPanel",
	emits: ["requestProfile"],
	setup(__props, { emit: __emit }) {
		const emit = __emit;
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", _hoisted_1$4, [createBaseVNode("p", _hoisted_2$3, toDisplayString(_ctx.$t("comfyHubPublish.createProfileToPublish")), 1), createVNode(Button_default, {
				variant: "textonly",
				size: "unset",
				class: "flex w-64 items-center gap-4 rounded-2xl border border-dashed border-border-default px-6 py-4 hover:bg-secondary-background-hover",
				onClick: _cache[0] || (_cache[0] = ($event) => emit("requestProfile"))
			}, {
				default: withCtx(() => [_cache[2] || (_cache[2] = createBaseVNode("div", { class: "flex size-12 items-center justify-center rounded-full border border-dashed border-border-default" }, [createBaseVNode("i", { class: "icon-[lucide--user] size-4 text-muted-foreground" })], -1)), createBaseVNode("span", _hoisted_3$3, [_cache[1] || (_cache[1] = createBaseVNode("i", { class: "icon-[lucide--plus] size-4" }, null, -1)), createTextVNode(" " + toDisplayString(_ctx.$t("comfyHubPublish.createProfileCta")), 1)])]),
				_: 1
			})]);
		};
	}
});
//#endregion
//#region src/platform/workflow/sharing/composables/useSliderFromMouse.ts
function useSliderFromMouse(target) {
	const position = ref(50);
	const { elementX, elementWidth, isOutside } = useMouseInElement(target);
	watch([
		elementX,
		elementWidth,
		isOutside
	], ([x, width, outside]) => {
		if (!outside && width > 0) position.value = x / width * 100;
	});
	return position;
}
//#endregion
//#region src/platform/workflow/sharing/components/publish/ComfyHubThumbnailStep.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1$3 = { class: "flex min-h-0 flex-1 flex-col gap-6" };
var _hoisted_2$2 = { class: "flex flex-col gap-2" };
var _hoisted_3$2 = { class: "text-sm text-base-foreground select-none" };
var _hoisted_4$2 = { class: "text-center text-sm font-bold" };
var _hoisted_5$2 = { class: "flex min-h-0 flex-1 flex-col gap-2" };
var _hoisted_6 = { class: "flex items-center justify-between" };
var _hoisted_7 = { class: "text-sm text-base-foreground select-none" };
var _hoisted_8 = {
	key: 0,
	class: "grid flex-1 grid-cols-1 grid-rows-1 place-content-center-safe overflow-hidden"
};
var _hoisted_9 = ["src", "alt"];
var _hoisted_10 = ["src", "alt"];
var _hoisted_11 = ["onChange"];
var _hoisted_12 = ["src", "alt"];
var _hoisted_13 = { class: "text-sm font-medium text-muted-foreground" };
var _hoisted_14 = { class: "text-xs text-muted-foreground" };
var _hoisted_15 = ["accept"];
var _hoisted_16 = ["src", "aria-label"];
var _hoisted_17 = ["src", "alt"];
var _hoisted_18 = { class: "text-sm text-muted-foreground" };
var _hoisted_19 = { class: "text-sm text-muted-foreground" };
var _hoisted_20 = { class: "text-xs text-muted-foreground" };
//#endregion
//#region src/platform/workflow/sharing/components/publish/ComfyHubThumbnailStep.vue
var ComfyHubThumbnailStep_default = /* @__PURE__ */ defineComponent({
	__name: "ComfyHubThumbnailStep",
	props: {
		thumbnailType: { default: "image" },
		thumbnailFile: { default: null },
		thumbnailUrl: { default: null },
		existingThumbnailType: { default: null },
		comparisonBeforeFile: { default: null },
		comparisonAfterFile: { default: null },
		comparisonAfterUrl: { default: null }
	},
	emits: [
		"update:thumbnailType",
		"update:thumbnailFile",
		"update:thumbnailUrl",
		"update:comparisonBeforeFile",
		"update:comparisonAfterFile",
		"update:comparisonAfterUrl"
	],
	setup(__props, { emit: __emit }) {
		const emit = __emit;
		const { t } = useI18n();
		function isThumbnailType(value) {
			return value === "image" || value === "video" || value === "imageComparison";
		}
		function handleThumbnailTypeChange(value) {
			if (typeof value === "string" && isThumbnailType(value)) {
				emit("update:thumbnailFile", null);
				emit("update:comparisonBeforeFile", null);
				emit("update:comparisonAfterFile", null);
				emit("update:thumbnailType", value);
			}
		}
		const uploadSectionLabel = computed(() => {
			if (__props.thumbnailType === "video") return t("comfyHubPublish.uploadVideo");
			if (__props.thumbnailType === "imageComparison") return t("comfyHubPublish.uploadComparison");
			return t("comfyHubPublish.uploadThumbnail");
		});
		const uploadDropText = computed(() => __props.thumbnailType === "video" ? t("comfyHubPublish.uploadPromptDropVideo") : t("comfyHubPublish.uploadPromptDropImage"));
		const thumbnailOptions = [
			{
				value: "image",
				label: t("comfyHubPublish.thumbnailImage"),
				icon: "icon-[lucide--image]"
			},
			{
				value: "video",
				label: t("comfyHubPublish.thumbnailVideo"),
				icon: "icon-[lucide--video]"
			},
			{
				value: "imageComparison",
				label: t("comfyHubPublish.thumbnailImageComparison"),
				icon: "icon-[lucide--diff]"
			}
		];
		const existingSingleUrl = computed(() => __props.existingThumbnailType === __props.thumbnailType ? __props.thumbnailUrl ?? void 0 : void 0);
		const existingComparisonUrls = computed(() => __props.existingThumbnailType === "imageComparison" ? {
			before: __props.thumbnailUrl ?? void 0,
			after: __props.comparisonAfterUrl ?? void 0
		} : {
			before: void 0,
			after: void 0
		});
		const thumbnailFileUrl = useObjectUrl(() => __props.thumbnailFile ?? void 0);
		const thumbnailPreviewUrl = computed(() => thumbnailFileUrl.value ?? existingSingleUrl.value);
		function isAnimatedImageUrl(url) {
			return /\.(gif|webp)(\?|#|$)/i.test(url);
		}
		const showVideoPreview = computed(() => {
			if (__props.thumbnailFile) return __props.thumbnailFile.type.startsWith("video/");
			return __props.thumbnailType === "video" && !!existingSingleUrl.value ? !isAnimatedImageUrl(existingSingleUrl.value) : false;
		});
		function setThumbnailPreview(file) {
			if (isFileTooLarge(file, file.type.startsWith("video/") ? 50 : 10)) return;
			emit("update:thumbnailFile", file);
			emit("update:thumbnailUrl", null);
		}
		const comparisonBeforeFileUrl = useObjectUrl(() => __props.comparisonBeforeFile ?? void 0);
		const comparisonAfterFileUrl = useObjectUrl(() => __props.comparisonAfterFile ?? void 0);
		const comparisonPreviewUrls = computed(() => ({
			before: comparisonBeforeFileUrl.value ?? existingComparisonUrls.value.before,
			after: comparisonAfterFileUrl.value ?? existingComparisonUrls.value.after
		}));
		const hasBothComparisonImages = computed(() => !!(comparisonPreviewUrls.value.before && comparisonPreviewUrls.value.after));
		const comparisonPreviewRef = ref(null);
		const previewSliderPosition = useSliderFromMouse(comparisonPreviewRef);
		const hasThumbnailContent = computed(() => {
			if (__props.thumbnailType === "imageComparison") return !!(comparisonPreviewUrls.value.before || comparisonPreviewUrls.value.after);
			return !!thumbnailPreviewUrl.value;
		});
		function clearAllPreviews() {
			if (__props.thumbnailType === "imageComparison") {
				emit("update:comparisonBeforeFile", null);
				emit("update:comparisonAfterFile", null);
				emit("update:thumbnailUrl", null);
				emit("update:comparisonAfterUrl", null);
				return;
			}
			emit("update:thumbnailFile", null);
			emit("update:thumbnailUrl", null);
		}
		function handleFileSelect(event) {
			if (!(event.target instanceof HTMLInputElement)) return;
			const file = event.target.files?.[0];
			if (file) setThumbnailPreview(file);
		}
		const singleDropRef = ref(null);
		function isImageType(types) {
			return types.some((type) => type.startsWith("image/"));
		}
		function isVideoModeMedia(types) {
			return types.some((type) => type.startsWith("video/") || type === "image/gif" || type === "image/webp");
		}
		const { isOverDropZone: isOverSingleDrop } = useDropZone(singleDropRef, {
			dataTypes: (types) => __props.thumbnailType === "video" ? isVideoModeMedia(types) : isImageType(types),
			multiple: false,
			onDrop(files) {
				const file = files?.[0];
				if (file) setThumbnailPreview(file);
			}
		});
		const comparisonSlots = [{
			key: "before",
			label: t("comfyHubPublish.uploadComparisonBeforePrompt")
		}, {
			key: "after",
			label: t("comfyHubPublish.uploadComparisonAfterPrompt")
		}];
		function setComparisonPreview(file, slot) {
			if (isFileTooLarge(file, 10)) return;
			if (slot === "before") {
				emit("update:comparisonBeforeFile", file);
				emit("update:thumbnailUrl", null);
				return;
			}
			emit("update:comparisonAfterFile", file);
			emit("update:comparisonAfterUrl", null);
		}
		function handleComparisonSelect(event, slot) {
			if (!(event.target instanceof HTMLInputElement)) return;
			const file = event.target.files?.[0];
			if (file) setComparisonPreview(file, slot);
		}
		const comparisonDropRefs = reactive({
			before: null,
			after: null
		});
		function useComparisonDropZone(slot) {
			return useDropZone(computed(() => comparisonDropRefs[slot]), {
				dataTypes: isImageType,
				multiple: false,
				onDrop(files) {
					const file = files?.[0];
					if (file) setComparisonPreview(file, slot);
				}
			});
		}
		const { isOverDropZone: isOverBefore } = useComparisonDropZone("before");
		const { isOverDropZone: isOverAfter } = useComparisonDropZone("after");
		const comparisonOverStates = computed(() => ({
			before: isOverBefore.value,
			after: isOverAfter.value
		}));
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", _hoisted_1$3, [createBaseVNode("div", _hoisted_2$2, [createBaseVNode("span", _hoisted_3$2, toDisplayString(_ctx.$t("comfyHubPublish.selectAThumbnail")), 1), createVNode(unref(ToggleGroup_default), {
				type: "single",
				"model-value": __props.thumbnailType,
				class: "grid w-full grid-cols-3 gap-4",
				"onUpdate:modelValue": handleThumbnailTypeChange
			}, {
				default: withCtx(() => [(openBlock(), createElementBlock(Fragment, null, renderList(thumbnailOptions, (option) => {
					return createVNode(unref(ToggleGroupItem_default), {
						key: option.value,
						value: option.value,
						class: "flex h-auto w-full gap-2 rounded-sm bg-node-component-surface p-2 font-inter text-base-foreground data-[state=on]:bg-muted-background"
					}, {
						default: withCtx(() => [createBaseVNode("i", { class: normalizeClass(unref(cn)("size-4", option.icon)) }, null, 2), createBaseVNode("span", _hoisted_4$2, toDisplayString(option.label), 1)]),
						_: 2
					}, 1032, ["value"]);
				}), 64))]),
				_: 1
			}, 8, ["model-value"])]), createBaseVNode("div", _hoisted_5$2, [createBaseVNode("div", _hoisted_6, [createBaseVNode("span", _hoisted_7, toDisplayString(uploadSectionLabel.value), 1), hasThumbnailContent.value ? (openBlock(), createBlock(Button_default, {
				key: 0,
				variant: "muted-textonly",
				size: "sm",
				onClick: clearAllPreviews
			}, {
				default: withCtx(() => [createTextVNode(toDisplayString(_ctx.$t("g.clear")), 1)]),
				_: 1
			})) : createCommentVNode("", true)]), __props.thumbnailType === "imageComparison" ? (openBlock(), createElementBlock("div", _hoisted_8, [hasBothComparisonImages.value ? (openBlock(), createElementBlock("div", {
				key: 0,
				ref_key: "comparisonPreviewRef",
				ref: comparisonPreviewRef,
				class: "relative col-span-full row-span-full cursor-crosshair overflow-hidden rounded-lg"
			}, [
				createBaseVNode("img", {
					src: comparisonPreviewUrls.value.after,
					alt: _ctx.$t("comfyHubPublish.uploadComparisonAfterPrompt"),
					class: "size-full object-contain"
				}, null, 8, _hoisted_9),
				createBaseVNode("img", {
					src: comparisonPreviewUrls.value.before,
					alt: _ctx.$t("comfyHubPublish.uploadComparisonBeforePrompt"),
					class: "absolute inset-0 size-full object-contain",
					style: normalizeStyle({ clipPath: `inset(0 ${100 - unref(previewSliderPosition)}% 0 0)` })
				}, null, 12, _hoisted_10),
				createBaseVNode("div", {
					class: "pointer-events-none absolute inset-y-0 w-0.5 bg-white/30 backdrop-blur-sm",
					style: normalizeStyle({ left: `${unref(previewSliderPosition)}%` })
				}, null, 4)
			], 512)) : createCommentVNode("", true), createBaseVNode("div", { class: normalizeClass(unref(cn)("col-span-full row-span-full flex items-center-safe justify-center-safe gap-2", hasBothComparisonImages.value && "invisible")) }, [(openBlock(), createElementBlock(Fragment, null, renderList(comparisonSlots, (slot) => {
				return createBaseVNode("label", {
					key: slot.key,
					ref_for: true,
					ref: (el) => comparisonDropRefs[slot.key] = el,
					class: normalizeClass(unref(cn)("flex aspect-square h-full min-h-0 flex-[0_1_auto] cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed text-center transition-colors", comparisonPreviewUrls.value[slot.key] ? "self-start" : "flex-[0_1_1]", comparisonOverStates.value[slot.key] ? "border-muted-foreground" : "border-border-default hover:border-muted-foreground")),
					onDragenter: _cache[0] || (_cache[0] = withModifiers(() => {}, ["stop"])),
					onDragleave: _cache[1] || (_cache[1] = withModifiers(() => {}, ["stop"])),
					onDragover: _cache[2] || (_cache[2] = withModifiers(() => {}, ["prevent", "stop"])),
					onDrop: _cache[3] || (_cache[3] = withModifiers(() => {}, ["prevent", "stop"]))
				}, [createBaseVNode("input", {
					type: "file",
					accept: "image/*",
					class: "hidden",
					onChange: (e) => handleComparisonSelect(e, slot.key)
				}, null, 40, _hoisted_11), comparisonPreviewUrls.value[slot.key] ? (openBlock(), createElementBlock("img", {
					key: 0,
					src: comparisonPreviewUrls.value[slot.key],
					alt: slot.label,
					class: "max-h-full max-w-full object-contain"
				}, null, 8, _hoisted_12)) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [createBaseVNode("span", _hoisted_13, toDisplayString(slot.label), 1), createBaseVNode("span", _hoisted_14, toDisplayString(_ctx.$t("comfyHubPublish.uploadThumbnailHint")), 1)], 64))], 34);
			}), 64))], 2)])) : (openBlock(), createElementBlock("label", {
				key: 1,
				ref_key: "singleDropRef",
				ref: singleDropRef,
				class: normalizeClass(unref(cn)("m-auto flex aspect-square min-h-0 w-full max-w-48 cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed text-center transition-colors", thumbnailPreviewUrl.value ? "self-center p-1" : "flex-1", unref(isOverSingleDrop) ? "border-muted-foreground" : "border-border-default hover:border-muted-foreground")),
				onDragenter: _cache[4] || (_cache[4] = withModifiers(() => {}, ["stop"])),
				onDragleave: _cache[5] || (_cache[5] = withModifiers(() => {}, ["stop"])),
				onDragover: _cache[6] || (_cache[6] = withModifiers(() => {}, ["prevent", "stop"])),
				onDrop: _cache[7] || (_cache[7] = withModifiers(() => {}, ["prevent", "stop"]))
			}, [createBaseVNode("input", {
				type: "file",
				accept: __props.thumbnailType === "video" ? "video/*,image/gif,image/webp" : "image/*",
				class: "hidden",
				onChange: handleFileSelect
			}, null, 40, _hoisted_15), thumbnailPreviewUrl.value ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [showVideoPreview.value ? (openBlock(), createElementBlock("video", {
				key: 0,
				src: thumbnailPreviewUrl.value,
				"aria-label": _ctx.$t("comfyHubPublish.videoPreview"),
				class: "max-h-full max-w-full object-contain",
				muted: "",
				loop: "",
				autoplay: ""
			}, null, 8, _hoisted_16)) : (openBlock(), createElementBlock("img", {
				key: 1,
				src: thumbnailPreviewUrl.value,
				alt: _ctx.$t("comfyHubPublish.thumbnailPreview"),
				class: "max-h-full max-w-full object-contain"
			}, null, 8, _hoisted_17))], 64)) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
				createBaseVNode("span", _hoisted_18, toDisplayString(_ctx.$t("comfyHubPublish.uploadPromptClickToBrowse")), 1),
				createBaseVNode("span", _hoisted_19, toDisplayString(uploadDropText.value), 1),
				createBaseVNode("span", _hoisted_20, toDisplayString(_ctx.$t("comfyHubPublish.uploadThumbnailHint")), 1)
			], 64))], 34))])]);
		};
	}
});
//#endregion
//#region src/platform/workflow/sharing/components/publish/ComfyHubPublishFooter.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1$2 = {
	"data-testid": "publish-footer",
	class: "flex shrink items-center justify-end gap-4 border-t border-border-default px-6 py-4"
};
//#endregion
//#region src/platform/workflow/sharing/components/publish/ComfyHubPublishFooter.vue
var ComfyHubPublishFooter_default = /* @__PURE__ */ defineComponent({
	__name: "ComfyHubPublishFooter",
	props: {
		isFirstStep: { type: Boolean },
		isLastStep: { type: Boolean },
		isPublishDisabled: { type: Boolean },
		isPublishing: { type: Boolean },
		isUpdate: { type: Boolean }
	},
	emits: [
		"back",
		"next",
		"publish"
	],
	setup(__props) {
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("footer", _hoisted_1$2, [!__props.isFirstStep ? (openBlock(), createBlock(Button_default, {
				key: 0,
				size: "lg",
				onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("back"))
			}, {
				default: withCtx(() => [createTextVNode(toDisplayString(_ctx.$t("comfyHubPublish.back")), 1)]),
				_: 1
			})) : createCommentVNode("", true), !__props.isLastStep ? (openBlock(), createBlock(Button_default, {
				key: 1,
				variant: "primary",
				size: "lg",
				onClick: _cache[1] || (_cache[1] = ($event) => _ctx.$emit("next"))
			}, {
				default: withCtx(() => [createTextVNode(toDisplayString(_ctx.$t("comfyHubPublish.next")) + " ", 1), _cache[3] || (_cache[3] = createBaseVNode("i", { class: "icon-[lucide--chevron-right] size-4" }, null, -1))]),
				_: 1
			})) : (openBlock(), createBlock(Button_default, {
				key: 2,
				variant: "primary",
				size: "lg",
				disabled: __props.isPublishDisabled || __props.isPublishing,
				loading: __props.isPublishing,
				onClick: _cache[2] || (_cache[2] = ($event) => _ctx.$emit("publish"))
			}, {
				default: withCtx(() => [createBaseVNode("i", { class: normalizeClass(unref(cn)("size-4", __props.isUpdate ? "icon-[lucide--refresh-cw]" : "icon-[lucide--upload]")) }, null, 2), createTextVNode(" " + toDisplayString(__props.isUpdate ? _ctx.$t("comfyHubPublish.updateButton") : _ctx.$t("comfyHubPublish.publishButton")), 1)]),
				_: 1
			}, 8, ["disabled", "loading"]))]);
		};
	}
});
//#endregion
//#region src/platform/workflow/sharing/components/publish/ComfyHubPublishWizardContent.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1$1 = { class: "flex min-h-0 flex-1 flex-col" };
var _hoisted_2$1 = {
	key: 1,
	class: "flex min-h-0 flex-1 flex-col"
};
var _hoisted_3$1 = { class: "flex min-h-0 flex-1 flex-col overflow-y-auto" };
var _hoisted_4$1 = {
	key: 1,
	class: "flex min-h-0 flex-1 flex-col gap-6 px-6 py-4"
};
var _hoisted_5$1 = {
	key: 2,
	class: "flex min-h-0 flex-1 flex-col gap-4 px-6 py-4"
};
//#endregion
//#region src/platform/workflow/sharing/components/publish/ComfyHubPublishWizardContent.vue
var ComfyHubPublishWizardContent_default = /* @__PURE__ */ defineComponent({
	__name: "ComfyHubPublishWizardContent",
	props: {
		currentStep: {},
		formData: {},
		isFirstStep: { type: Boolean },
		isLastStep: { type: Boolean },
		isPublishing: {
			type: Boolean,
			default: false
		},
		isUpdate: {
			type: Boolean,
			default: false
		},
		onGoNext: { type: Function },
		onGoBack: { type: Function },
		onUpdateFormData: { type: Function },
		onPublish: { type: Function },
		onRequireProfile: { type: Function },
		onGateComplete: {
			type: Function,
			default: () => {}
		},
		onGateClose: {
			type: Function,
			default: () => {}
		}
	},
	setup(__props) {
		const { toastErrorHandler } = useErrorHandling();
		const { flags } = useFeatureFlags();
		const { checkProfile, hasProfile, isFetchingProfile, profile } = useComfyHubProfileGate();
		const isProfileLoading = computed(() => hasProfile.value === null || isFetchingProfile.value);
		const finishStepReady = ref(false);
		const assetsAcknowledged = ref(false);
		const isResolvingPublishAccess = ref(false);
		const isPublishInFlight = computed(() => __props.isPublishing || isResolvingPublishAccess.value);
		const isFinishStepVisible = computed(() => __props.currentStep === "finish" && hasProfile.value === true && profile.value !== null);
		const isPublishDisabled = computed(() => isPublishInFlight.value || flags.comfyHubProfileGateEnabled && hasProfile.value !== true || isFinishStepVisible.value && !finishStepReady.value);
		async function handlePublish() {
			if (isResolvingPublishAccess.value || __props.isPublishing) return;
			isResolvingPublishAccess.value = true;
			try {
				if (!flags.comfyHubProfileGateEnabled) {
					await __props.onPublish();
					return;
				}
				let profileExists;
				try {
					profileExists = await checkProfile();
				} catch (error) {
					toastErrorHandler(error);
					return;
				}
				if (profileExists) {
					await __props.onPublish();
					return;
				}
				__props.onRequireProfile();
			} catch (error) {
				toastErrorHandler(error);
			} finally {
				isResolvingPublishAccess.value = false;
			}
		}
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", _hoisted_1$1, [__props.currentStep === "profileCreation" ? (openBlock(), createBlock(ComfyHubCreateProfileForm_default, {
				key: 0,
				"data-testid": "publish-gate-flow",
				"on-profile-created": () => __props.onGateComplete(),
				"on-close": __props.onGateClose,
				"show-close-button": false
			}, null, 8, ["on-profile-created", "on-close"])) : (openBlock(), createElementBlock("div", _hoisted_2$1, [createBaseVNode("div", _hoisted_3$1, [__props.currentStep === "describe" ? (openBlock(), createBlock(ComfyHubDescribeStep_default, {
				key: 0,
				name: __props.formData.name,
				description: __props.formData.description,
				tags: __props.formData.tags,
				"onUpdate:name": _cache[0] || (_cache[0] = ($event) => __props.onUpdateFormData({ name: $event })),
				"onUpdate:description": _cache[1] || (_cache[1] = ($event) => __props.onUpdateFormData({ description: $event })),
				"onUpdate:tags": _cache[2] || (_cache[2] = ($event) => __props.onUpdateFormData({ tags: $event }))
			}, null, 8, [
				"name",
				"description",
				"tags"
			])) : __props.currentStep === "examples" ? (openBlock(), createElementBlock("div", _hoisted_4$1, [createVNode(ComfyHubThumbnailStep_default, {
				"thumbnail-type": __props.formData.thumbnailType,
				"thumbnail-file": __props.formData.thumbnailFile,
				"thumbnail-url": __props.formData.thumbnailUrl,
				"existing-thumbnail-type": __props.formData.existingThumbnailType,
				"comparison-before-file": __props.formData.comparisonBeforeFile,
				"comparison-after-file": __props.formData.comparisonAfterFile,
				"comparison-after-url": __props.formData.comparisonAfterUrl,
				"onUpdate:thumbnailType": _cache[3] || (_cache[3] = ($event) => __props.onUpdateFormData({ thumbnailType: $event })),
				"onUpdate:thumbnailFile": _cache[4] || (_cache[4] = ($event) => __props.onUpdateFormData({ thumbnailFile: $event })),
				"onUpdate:thumbnailUrl": _cache[5] || (_cache[5] = ($event) => __props.onUpdateFormData({ thumbnailUrl: $event })),
				"onUpdate:comparisonBeforeFile": _cache[6] || (_cache[6] = ($event) => __props.onUpdateFormData({ comparisonBeforeFile: $event })),
				"onUpdate:comparisonAfterFile": _cache[7] || (_cache[7] = ($event) => __props.onUpdateFormData({ comparisonAfterFile: $event })),
				"onUpdate:comparisonAfterUrl": _cache[8] || (_cache[8] = ($event) => __props.onUpdateFormData({ comparisonAfterUrl: $event }))
			}, null, 8, [
				"thumbnail-type",
				"thumbnail-file",
				"thumbnail-url",
				"existing-thumbnail-type",
				"comparison-before-file",
				"comparison-after-file",
				"comparison-after-url"
			]), createVNode(ComfyHubExamplesStep_default, {
				"example-images": __props.formData.exampleImages,
				"onUpdate:exampleImages": _cache[9] || (_cache[9] = ($event) => __props.onUpdateFormData({ exampleImages: $event }))
			}, null, 8, ["example-images"])])) : __props.currentStep === "finish" && isProfileLoading.value ? (openBlock(), createElementBlock("div", _hoisted_5$1, [createVNode(Skeleton_default, { class: "h-4 w-1/4" }), createVNode(Skeleton_default, { class: "h-20 w-full rounded-2xl" })])) : __props.currentStep === "finish" && unref(hasProfile) && unref(profile) ? (openBlock(), createBlock(ComfyHubFinishStep_default, {
				key: 3,
				ready: finishStepReady.value,
				"onUpdate:ready": _cache[10] || (_cache[10] = ($event) => finishStepReady.value = $event),
				acknowledged: assetsAcknowledged.value,
				"onUpdate:acknowledged": _cache[11] || (_cache[11] = ($event) => assetsAcknowledged.value = $event),
				profile: unref(profile)
			}, null, 8, [
				"ready",
				"acknowledged",
				"profile"
			])) : __props.currentStep === "finish" ? (openBlock(), createBlock(ComfyHubProfilePromptPanel_default, {
				key: 4,
				onRequestProfile: __props.onRequireProfile
			}, null, 8, ["onRequestProfile"])) : createCommentVNode("", true)]), createVNode(ComfyHubPublishFooter_default, {
				"is-first-step": __props.isFirstStep,
				"is-last-step": __props.isLastStep,
				"is-publish-disabled": isPublishDisabled.value,
				"is-publishing": isPublishInFlight.value,
				"is-update": __props.isUpdate,
				onBack: __props.onGoBack,
				onNext: __props.onGoNext,
				onPublish: handlePublish
			}, null, 8, [
				"is-first-step",
				"is-last-step",
				"is-publish-disabled",
				"is-publishing",
				"is-update",
				"onBack",
				"onNext"
			])]))]);
		};
	}
});
//#endregion
//#region src/platform/workflow/sharing/utils/normalizeTags.ts
/**
* Normalizes a tag to its slug form for the ComfyHub API.
* Converts display names like "Text to Image" to "text-to-image".
*/
function normalizeTag(tag) {
	return tag.trim().toLowerCase().replace(/\s+/g, "-");
}
/**
* Normalizes and deduplicates an array of tags for API submission.
*/
function normalizeTags(tags) {
	return [...new Set(tags.map(normalizeTag).filter(Boolean))];
}
//#endregion
//#region src/platform/workflow/sharing/composables/useComfyHubPublishSubmission.ts
function getFileContentType(file) {
	return file.type || "application/octet-stream";
}
function getUsername(profile) {
	const username = profile?.username.trim();
	if (!username) throw new Error("ComfyHub profile is required before publishing");
	return username;
}
function getWorkflowFilename(path) {
	const workflowFilename = path?.trim();
	if (!workflowFilename) throw new Error("No active workflow file available for publishing");
	return workflowFilename;
}
function getAssetIds(assets) {
	return assets.map((asset) => asset.id);
}
function resolveThumbnailFile(formData) {
	if (formData.thumbnailType === "imageComparison") return formData.comparisonBeforeFile ?? void 0;
	return formData.thumbnailFile ?? void 0;
}
function useComfyHubPublishSubmission() {
	const { profile } = useComfyHubProfileGate();
	const workflowStore = useWorkflowStore();
	const workflowShareService = useWorkflowShareService();
	const comfyHubService = useComfyHubService();
	async function uploadFileAndGetToken(file) {
		const contentType = getFileContentType(file);
		const upload = await comfyHubService.requestAssetUploadUrl({
			filename: file.name,
			contentType
		});
		await comfyHubService.uploadFileToPresignedUrl({
			uploadUrl: upload.uploadUrl,
			file,
			contentType
		});
		return upload.token;
	}
	async function submitToComfyHub(formData) {
		const username = getUsername(profile.value);
		const workflowFilename = getWorkflowFilename(workflowStore.activeWorkflow?.path);
		const assetIds = getAssetIds(await workflowShareService.getShareableAssets());
		const keepsExistingThumbnail = formData.existingThumbnailType === formData.thumbnailType;
		const thumbnailFile = resolveThumbnailFile(formData);
		const thumbnailTokenOrUrl = thumbnailFile ? await uploadFileAndGetToken(thumbnailFile) : keepsExistingThumbnail ? formData.thumbnailUrl ?? void 0 : void 0;
		const thumbnailComparisonTokenOrUrl = formData.thumbnailType === "imageComparison" ? formData.comparisonAfterFile ? await uploadFileAndGetToken(formData.comparisonAfterFile) : keepsExistingThumbnail ? formData.comparisonAfterUrl ?? void 0 : void 0 : void 0;
		const sampleImageTokensOrUrls = formData.exampleImages.length > 0 ? await Promise.all(formData.exampleImages.map((image) => image.file ? uploadFileAndGetToken(image.file) : image.url)) : void 0;
		await comfyHubService.publishWorkflow({
			username,
			name: formData.name,
			workflowFilename,
			assetIds,
			description: formData.description || void 0,
			tags: formData.tags.length > 0 ? normalizeTags(formData.tags) : void 0,
			models: formData.models.length > 0 ? formData.models : void 0,
			customNodes: formData.customNodes.length > 0 ? formData.customNodes : void 0,
			thumbnailType: formData.thumbnailType,
			thumbnailTokenOrUrl,
			thumbnailComparisonTokenOrUrl,
			sampleImageTokensOrUrls,
			tutorialUrl: formData.tutorialUrl || void 0,
			metadata: Object.keys(formData.metadata).length > 0 ? formData.metadata : void 0
		});
	}
	return { submitToComfyHub };
}
//#endregion
//#region src/platform/workflow/sharing/composables/useComfyHubPublishWizard.ts
var PUBLISH_STEPS = [
	"describe",
	"examples",
	"finish",
	"profileCreation"
];
var cachedPrefills = /* @__PURE__ */ new Map();
function createDefaultFormData() {
	return {
		name: useWorkflowStore().activeWorkflow?.filename ?? "",
		description: "",
		tags: [],
		models: [],
		customNodes: [],
		thumbnailType: "image",
		thumbnailFile: null,
		thumbnailUrl: null,
		existingThumbnailType: null,
		comparisonBeforeFile: null,
		comparisonAfterFile: null,
		comparisonAfterUrl: null,
		exampleImages: [],
		tutorialUrl: "",
		metadata: {}
	};
}
function createExampleImagesFromUrls(urls) {
	return urls.map((url) => ({
		id: v4(),
		url
	}));
}
function extractPrefillFromFormData(formData) {
	return {
		name: formData.name || void 0,
		description: formData.description || void 0,
		tags: formData.tags.length > 0 ? normalizeTags(formData.tags) : void 0,
		models: formData.models.length > 0 ? formData.models : void 0,
		customNodes: formData.customNodes.length > 0 ? formData.customNodes : void 0,
		thumbnailType: formData.thumbnailType,
		thumbnailUrl: formData.thumbnailUrl ?? void 0,
		thumbnailComparisonUrl: formData.comparisonAfterUrl ?? void 0,
		sampleImageUrls: formData.exampleImages.map((img) => img.url).filter((url) => !url.startsWith("blob:")),
		tutorialUrl: formData.tutorialUrl || void 0,
		metadata: Object.keys(formData.metadata).length > 0 ? formData.metadata : void 0
	};
}
function cachePublishPrefill(workflowPath, formData) {
	cachedPrefills.set(workflowPath, extractPrefillFromFormData(formData));
}
function getCachedPrefill(workflowPath) {
	return cachedPrefills.get(workflowPath) ?? null;
}
function useComfyHubPublishWizard() {
	const stepper = useStepper([...PUBLISH_STEPS]);
	const formData = ref(createDefaultFormData());
	const canGoNext = computed(() => {
		if (stepper.isCurrent("describe")) return formData.value.name.trim().length > 0;
		return true;
	});
	const isLastStep = computed(() => stepper.isCurrent("finish"));
	const isProfileCreationStep = computed(() => stepper.isCurrent("profileCreation"));
	function openProfileCreationStep() {
		stepper.goTo("profileCreation");
	}
	function closeProfileCreationStep() {
		stepper.goTo("finish");
	}
	function applyPrefill(prefill) {
		const defaults = createDefaultFormData();
		const current = formData.value;
		const hasThumbnail = !!(current.thumbnailFile || current.thumbnailUrl);
		const hasComparisonAfter = !!(current.comparisonAfterFile || current.comparisonAfterUrl);
		const restoredThumbnailUrl = hasThumbnail ? current.thumbnailUrl : prefill.thumbnailUrl ?? current.thumbnailUrl;
		formData.value = {
			...current,
			name: current.name === defaults.name ? prefill.name ?? current.name : current.name,
			description: current.description === defaults.description ? prefill.description ?? current.description : current.description,
			tags: current.tags.length === 0 && prefill.tags?.length ? prefill.tags : current.tags,
			models: current.models.length === 0 && prefill.models?.length ? prefill.models : current.models,
			customNodes: current.customNodes.length === 0 && prefill.customNodes?.length ? prefill.customNodes : current.customNodes,
			thumbnailType: current.thumbnailType === defaults.thumbnailType ? prefill.thumbnailType ?? current.thumbnailType : current.thumbnailType,
			thumbnailUrl: restoredThumbnailUrl,
			existingThumbnailType: restoredThumbnailUrl && !current.thumbnailFile ? prefill.thumbnailType ?? current.existingThumbnailType : current.existingThumbnailType,
			comparisonAfterUrl: hasComparisonAfter ? current.comparisonAfterUrl : prefill.thumbnailComparisonUrl ?? current.comparisonAfterUrl,
			exampleImages: current.exampleImages.length === 0 && prefill.sampleImageUrls?.length ? createExampleImagesFromUrls(prefill.sampleImageUrls) : current.exampleImages,
			tutorialUrl: current.tutorialUrl === defaults.tutorialUrl ? prefill.tutorialUrl ?? current.tutorialUrl : current.tutorialUrl,
			metadata: Object.keys(current.metadata).length === 0 && prefill.metadata ? prefill.metadata : current.metadata
		};
	}
	return {
		currentStep: stepper.current,
		formData,
		canGoNext,
		isFirstStep: stepper.isFirst,
		isLastStep,
		isProfileCreationStep,
		goToStep: stepper.goTo,
		goNext: stepper.goToNext,
		goBack: stepper.goToPrevious,
		openProfileCreationStep,
		closeProfileCreationStep,
		applyPrefill
	};
}
//#endregion
//#region src/platform/workflow/sharing/components/publish/ComfyHubPublishDialog.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1 = { class: "flex-1 text-base font-semibold select-none" };
var _hoisted_2 = {
	key: 0,
	"data-testid": "publish-save-prompt",
	class: "flex flex-col gap-4 p-6"
};
var _hoisted_3 = { class: "m-0 text-sm text-muted-foreground" };
var _hoisted_4 = {
	key: 0,
	class: "flex flex-col gap-1"
};
var _hoisted_5 = { class: "text-sm font-medium text-muted-foreground" };
//#endregion
//#region src/platform/workflow/sharing/components/publish/ComfyHubPublishDialog.vue
var ComfyHubPublishDialog_default = /* @__PURE__ */ defineComponent({
	__name: "ComfyHubPublishDialog",
	props: { onClose: { type: Function } },
	setup(__props) {
		const { t } = useI18n();
		const toast = useToast();
		const { fetchProfile } = useComfyHubProfileGate();
		const { submitToComfyHub } = useComfyHubPublishSubmission();
		const shareService = useWorkflowShareService();
		const workflowService = useWorkflowService();
		const workflowStore = useWorkflowStore();
		const { currentStep, formData, isFirstStep, isLastStep, goToStep, goNext, goBack, openProfileCreationStep, closeProfileCreationStep, applyPrefill } = useComfyHubPublishWizard();
		const isPublishing = ref(false);
		const isAlreadyPublished = ref(false);
		const needsSave = ref(false);
		const workflowName = ref("");
		const nameInputRef = ref(null);
		const isTemporary = computed(() => workflowStore.activeWorkflow?.isTemporary ?? false);
		function checkNeedsSave() {
			const workflow = workflowStore.activeWorkflow;
			needsSave.value = !workflow || workflow.isTemporary || workflow.isModified;
			if (workflow) workflowName.value = workflow.filename.replace(/\.json$/i, "");
		}
		watch(needsSave, async (needs) => {
			if (needs && isTemporary.value) {
				await nextTick();
				nameInputRef.value?.focus();
				nameInputRef.value?.select();
			}
		});
		function buildWorkflowPath(directory, filename) {
			const normalizedDirectory = directory.replace(/\/+$/, "");
			const normalizedFilename = appendJsonExt(filename.replace(/\.json$/i, ""));
			return normalizedDirectory ? `${normalizedDirectory}/${normalizedFilename}` : normalizedFilename;
		}
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
			checkNeedsSave();
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
		function handlePublishGateComplete() {
			closeProfileCreationStep();
			fetchProfile({ force: true });
		}
		function handlePublishGateClose() {
			closeProfileCreationStep();
		}
		function handleRequireProfile() {
			openProfileCreationStep();
		}
		async function handlePublish() {
			if (isPublishing.value) return;
			isPublishing.value = true;
			try {
				await submitToComfyHub(formData.value);
				const path = workflowStore.activeWorkflow?.path;
				if (path) cachePublishPrefill(path, formData.value);
				toast.add({
					severity: "success",
					summary: t("comfyHubPublish.publishSuccessTitle"),
					detail: t("comfyHubPublish.publishSuccessDescription"),
					life: 5e3
				});
				__props.onClose();
			} catch (error) {
				console.error("Failed to publish workflow:", error);
				const reason = getErrorMessage(error);
				toast.add({
					severity: "error",
					summary: t("comfyHubPublish.publishFailedTitle"),
					detail: reason ? t("comfyHubPublish.publishFailedDescriptionWithReason", { reason }) : t("comfyHubPublish.publishFailedDescription")
				});
			} finally {
				isPublishing.value = false;
			}
		}
		function updateFormData(patch) {
			formData.value = {
				...formData.value,
				...patch
			};
		}
		async function fetchPublishPrefill() {
			const path = workflowStore.activeWorkflow?.path;
			if (!path) {
				isAlreadyPublished.value = false;
				return;
			}
			try {
				const status = await shareService.getPublishStatus(path);
				if (workflowStore.activeWorkflow?.path !== path) return;
				isAlreadyPublished.value = status.isPublished;
				const prefill = status.isPublished ? status.prefill ?? getCachedPrefill(path) : getCachedPrefill(path);
				if (prefill) applyPrefill(prefill);
			} catch (error) {
				if (workflowStore.activeWorkflow?.path !== path) return;
				isAlreadyPublished.value = false;
				console.warn("Failed to fetch publish prefill:", error);
				const cached = getCachedPrefill(path);
				if (cached) applyPrefill(cached);
			}
		}
		onMounted(() => {
			checkNeedsSave();
			fetchProfile();
			fetchPublishPrefill();
		});
		watch(() => workflowStore.activeWorkflow?.path, (newPath, oldPath) => {
			if (isPublishing.value) return;
			if (!newPath || newPath === oldPath) return;
			fetchPublishPrefill();
		});
		onBeforeUnmount(() => {
			for (const image of formData.value.exampleImages) if (image.file) URL.revokeObjectURL(image.url);
		});
		provide(OnCloseKey, __props.onClose);
		return (_ctx, _cache) => {
			return openBlock(), createBlock(BaseModalLayout_default, {
				"content-title": _ctx.$t("comfyHubPublish.title"),
				"content-padding": "none",
				"left-panel-width": "16.5rem",
				size: "md"
			}, {
				leftPanelHeaderTitle: withCtx(() => [createBaseVNode("h2", _hoisted_1, toDisplayString(_ctx.$t("comfyHubPublish.title")), 1)]),
				leftPanel: withCtx(() => [!needsSave.value ? (openBlock(), createBlock(ComfyHubPublishNav_default, {
					key: 0,
					"current-step": unref(currentStep),
					onStepClick: unref(goToStep)
				}, null, 8, ["current-step", "onStepClick"])) : createCommentVNode("", true)]),
				header: withCtx(() => [..._cache[3] || (_cache[3] = [])]),
				content: withCtx(() => [needsSave.value ? (openBlock(), createElementBlock("div", _hoisted_2, [
					createBaseVNode("p", _hoisted_3, toDisplayString(_ctx.$t("comfyHubPublish.unsavedDescription")), 1),
					isTemporary.value ? (openBlock(), createElementBlock("label", _hoisted_4, [createBaseVNode("span", _hoisted_5, toDisplayString(_ctx.$t("shareWorkflow.workflowNameLabel")), 1), createVNode(Input_default, {
						ref_key: "nameInputRef",
						ref: nameInputRef,
						modelValue: workflowName.value,
						"onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => workflowName.value = $event),
						disabled: unref(isSaving),
						onKeydown: _cache[1] || (_cache[1] = withKeys(() => unref(handleSave)(), ["enter"]))
					}, null, 8, ["modelValue", "disabled"])])) : createCommentVNode("", true),
					createVNode(Button_default, {
						variant: "primary",
						size: "lg",
						loading: unref(isSaving),
						onClick: _cache[2] || (_cache[2] = () => unref(handleSave)())
					}, {
						default: withCtx(() => [createTextVNode(toDisplayString(unref(isSaving) ? _ctx.$t("shareWorkflow.saving") : _ctx.$t("shareWorkflow.saveButton")), 1)]),
						_: 1
					}, 8, ["loading"])
				])) : (openBlock(), createBlock(ComfyHubPublishWizardContent_default, {
					key: 1,
					"current-step": unref(currentStep),
					"form-data": unref(formData),
					"is-first-step": unref(isFirstStep),
					"is-last-step": unref(isLastStep),
					"is-publishing": isPublishing.value,
					"is-update": isAlreadyPublished.value,
					"on-update-form-data": updateFormData,
					"on-go-next": unref(goNext),
					"on-go-back": unref(goBack),
					"on-require-profile": handleRequireProfile,
					"on-gate-complete": handlePublishGateComplete,
					"on-gate-close": handlePublishGateClose,
					"on-publish": handlePublish
				}, null, 8, [
					"current-step",
					"form-data",
					"is-first-step",
					"is-last-step",
					"is-publishing",
					"is-update",
					"on-go-next",
					"on-go-back"
				]))]),
				_: 1
			}, 8, ["content-title"]);
		};
	}
});
//#endregion
export { ShareAssetWarningBox_default as n, ComfyHubPublishDialog_default as t };
