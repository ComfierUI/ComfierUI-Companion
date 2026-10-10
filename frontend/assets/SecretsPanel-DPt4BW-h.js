import { r as __name } from "./rolldown-runtime-xtsTai4I.js";
import { Dt as withDirectives, E as withModifiers, Et as withCtx, F as createBaseVNode, Ft as reactive, G as defineComponent, H as createTextVNode, I as createBlock, Kt as unref, L as createCommentVNode, Lt as ref, Mt as isRef, O as Fragment, P as computed, Q as mergeModels, R as createElementBlock, St as watch, U as createVNode, Wt as toValue, Zt as toDisplayString, dt as renderList, lt as openBlock, mt as resolveDirective, vt as useId, xt as useTemplateRef, yt as useModel } from "./vendor-vue-core-C1utdb0s.js";
import { dt as whenever } from "./vendor-vueuse-BxKIIsKg.js";
import { i as api } from "./api-Bt-fGt5a.js";
import { t as useToastStore } from "./toastStore-CTfykAzG.js";
import { r as useI18n } from "./vendor-i18n-BZvE7WBQ.js";
import { t as useDialogStore } from "./dialogStore-B0GYyals.js";
import { a as showConfirmDialog, i as Dialog_default, n as DialogOverlay_default, o as DialogTitle_default, r as DialogContent_default, t as DialogPortal_default, u as parseErrorResponse } from "./DialogPortal-B3D-ZhO6.js";
import { t as Button_default } from "./Button-j0oCzR82.js";
import { t as Input_default } from "./Input-Cx8jjgHK.js";
import { a as Select_default, i as SelectContent_default, n as SelectTrigger_default, r as SelectItem_default, t as SelectValue_default } from "./SelectValue-BYMnIcxq.js";
import { t as Textarea_default } from "./Textarea-r-a2mhot.js";
import { n as FieldError_default, r as Field_default, t as FieldLabel_default } from "./FieldLabel-4kD4Yi7G.js";
import { t as FieldDescription_default } from "./FieldDescription-B1neEBHX.js";
import { t as PasswordInput_default } from "./PasswordInput-B9my8iEe.js";
import { t as Spinner_default } from "./Spinner-B79hMIoc.js";
import { o as parseIsoDateSafe } from "./dateTimeUtil-Dbo04jgD.js";
import { t as DialogClose_default } from "./DialogClose-B8cFZwt-.js";
import { i as DialogHeader_default, r as vRekaZIndex } from "./vRekaZIndex-CMI8sjMU.js";
//#region src/platform/secrets/types.ts
var SECRET_ERROR_CODES = [
	"INVALID_REQUEST",
	"INVALID_PROVIDER",
	"DUPLICATE_NAME",
	"DUPLICATE_PROVIDER",
	"FORBIDDEN",
	"NOT_FOUND"
];
//#endregion
//#region src/platform/secrets/api/secretsApi.ts
var SecretsApiError = class extends Error {
	status;
	code;
	constructor(message, status, code) {
		super(message);
		this.status = status;
		this.code = code;
		this.name = "SecretsApiError";
	}
};
async function handleResponse(response) {
	if (!response.ok) {
		const errorData = await parseErrorResponse(response);
		const code = SECRET_ERROR_CODES.includes(errorData.code) ? errorData.code : void 0;
		throw new SecretsApiError(errorData.message, response.status, code);
	}
	return response.json();
}
async function listSecrets() {
	const data = await handleResponse(await api.fetchApi("/secrets"));
	return Array.isArray(data.data) ? data.data : [];
}
async function listSecretProviders() {
	const data = await handleResponse(await api.fetchApi("/secrets/providers"));
	return Array.isArray(data.data) ? data.data : [];
}
async function createSecret(payload) {
	return handleResponse(await api.fetchApi("/secrets", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(payload)
	}));
}
async function updateSecret(id, payload) {
	return handleResponse(await api.fetchApi(`/secrets/${id}`, {
		method: "PATCH",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(payload)
	}));
}
async function deleteSecret(id) {
	const response = await api.fetchApi(`/secrets/${id}`, { method: "DELETE" });
	if (!response.ok) await handleResponse(response);
}
//#endregion
//#region src/platform/secrets/composables/useSecrets.ts
function useSecrets() {
	const { t } = useI18n();
	const toastStore = useToastStore();
	const loading = ref(false);
	const secrets = ref([]);
	const availableProviders = ref(null);
	const operatingSecretId = ref(null);
	const existingProviders = computed(() => secrets.value.map((s) => s.provider).filter((p) => p != null));
	async function fetchSecrets() {
		loading.value = true;
		try {
			secrets.value = await listSecrets();
		} catch (err) {
			if (err instanceof SecretsApiError) toastStore.add({
				severity: "error",
				summary: t("g.error"),
				detail: err.message
			});
			else {
				console.error("Unexpected error fetching secrets:", err);
				toastStore.add({
					severity: "error",
					summary: t("g.error"),
					detail: t("g.unknownError")
				});
			}
		} finally {
			loading.value = false;
		}
	}
	async function fetchProviders() {
		try {
			availableProviders.value = await listSecretProviders();
		} catch (err) {
			console.error("Unexpected error fetching secret providers:", err);
		}
	}
	async function deleteSecret$1(secret) {
		operatingSecretId.value = secret.id;
		try {
			await deleteSecret(secret.id);
			secrets.value = secrets.value.filter((s) => s.id !== secret.id);
		} catch (err) {
			if (err instanceof SecretsApiError) toastStore.add({
				severity: "error",
				summary: t("g.error"),
				detail: err.message
			});
			else {
				console.error("Unexpected error deleting secret:", err);
				toastStore.add({
					severity: "error",
					summary: t("g.error"),
					detail: t("g.unknownError")
				});
			}
		} finally {
			operatingSecretId.value = null;
		}
	}
	__name(deleteSecret$1, "deleteSecret");
	return {
		loading,
		secrets,
		availableProviders,
		operatingSecretId,
		existingProviders,
		fetchSecrets,
		fetchProviders,
		deleteSecret: deleteSecret$1
	};
}
//#endregion
//#region src/platform/secrets/providers.ts
/**
* Presentational metadata for known providers: how a provider id renders
* (label, logo, help text). This table is NOT the source of truth for which
* providers a user may configure — that list is server-driven via
* `GET /secrets/providers`. Ids the server returns that are absent here fall
* back to the raw id with no logo, so adding a provider server-side renders
* without an FE change (a dedicated logo/label is an optional enhancement).
*/
var SECRET_PROVIDERS = [
	{
		value: "huggingface",
		label: "HuggingFace",
		logo: "/assets/images/hf-logo.svg"
	},
	{
		value: "civitai",
		label: "Civitai",
		logo: "/assets/images/civitai.svg"
	},
	{
		value: "runway",
		label: "Runway",
		logo: "/assets/images/runway.svg",
		helpKey: "secrets.providerHelp.runway"
	},
	{
		value: "gemini",
		label: "Google Gemini",
		logo: "/assets/images/gemini.svg",
		helpKey: "secrets.providerHelp.gemini"
	}
];
/**
* Providers shown as a sensible default before the server list resolves, and to
* seed the disabled selector in edit mode. This is NOT the source of truth for
* which providers a user may configure — once `GET /secrets/providers` resolves,
* its list is rendered verbatim.
*/
var DEFAULT_PROVIDER_IDS = ["huggingface", "civitai"];
function findProvider(provider) {
	if (!provider) return void 0;
	return SECRET_PROVIDERS.find((p) => p.value === provider);
}
function getProviderLabel(provider) {
	if (!provider) return "";
	return findProvider(provider)?.label ?? provider;
}
function getProviderLogo(provider) {
	return findProvider(provider)?.logo;
}
function getProviderHelpKey(provider) {
	return findProvider(provider)?.helpKey;
}
//#endregion
//#region src/platform/secrets/composables/useSecretForm.ts
function isJsonObject(value) {
	try {
		const parsed = JSON.parse(value);
		return typeof parsed === "object" && parsed !== null && !Array.isArray(parsed);
	} catch {
		return false;
	}
}
var MAX_JSON_FILE_BYTES = 1048576;
function useSecretForm(options) {
	const { t } = useI18n();
	const { mode, secret: secretRef, existingProviders, availableProviders = null, visible, onSaved } = options;
	const loading = ref(false);
	const apiErrorCode = ref(null);
	const apiErrorMessage = ref(null);
	const fileName = ref("");
	const selectedCredentialType = ref(null);
	const form = reactive({
		name: "",
		secretValue: "",
		provider: null
	});
	const errors = reactive({
		name: "",
		secretValue: "",
		provider: ""
	});
	const providerInfoById = computed(() => {
		const map = /* @__PURE__ */ new Map();
		for (const info of toValue(availableProviders) ?? []) map.set(info.id, info);
		return map;
	});
	const providerOptions = computed(() => {
		const available = toValue(availableProviders);
		let ids;
		if (mode === "edit") {
			const stored = toValue(secretRef)?.provider;
			ids = stored && !DEFAULT_PROVIDER_IDS.some((id) => id === stored) ? [...DEFAULT_PROVIDER_IDS, stored] : [...DEFAULT_PROVIDER_IDS];
		} else ids = available === null ? [...DEFAULT_PROVIDER_IDS] : [...new Set(available.map((p) => p.id))];
		const existing = toValue(existingProviders);
		return ids.map((id) => ({
			value: id,
			label: providerInfoById.value.get(id)?.label ?? getProviderLabel(id),
			logo: getProviderLogo(id),
			disabled: mode === "edit" ? false : existing.includes(id)
		}));
	});
	const credentialOptions = computed(() => {
		if (!form.provider) return [];
		return providerInfoById.value.get(form.provider)?.credential_options ?? [];
	});
	const storedCredentialType = computed(() => mode === "edit" ? toValue(secretRef)?.credential_type ?? null : null);
	const credentialType = computed({
		get: () => storedCredentialType.value ?? (credentialOptions.value.find((option) => option.credential_type === selectedCredentialType.value) ?? credentialOptions.value.at(0))?.credential_type ?? null,
		set: (value) => {
			selectedCredentialType.value = value;
		}
	});
	const selectedInputType = computed(() => credentialOptions.value.find((option) => option.credential_type === credentialType.value)?.input_type ?? "text");
	watch(providerOptions, (resolvedOptions) => {
		if (form.provider && !resolvedOptions.some((o) => o.value === form.provider)) form.provider = null;
	});
	const providerHelp = computed(() => t(getProviderHelpKey(form.provider ?? void 0) ?? "secrets.providerHint"));
	const apiError = computed(() => {
		if (!apiErrorCode.value && !apiErrorMessage.value) return null;
		switch (apiErrorCode.value) {
			case "DUPLICATE_NAME": return t("secrets.errors.duplicateName");
			case "DUPLICATE_PROVIDER": return t("secrets.errors.duplicateProvider");
			default: return apiErrorMessage.value;
		}
	});
	function resetForm() {
		const secret = toValue(secretRef);
		if (mode === "edit" && secret) {
			form.name = secret.name;
			form.provider = secret.provider ?? null;
			form.secretValue = "";
		} else {
			form.name = "";
			form.secretValue = "";
			form.provider = null;
		}
		fileName.value = "";
		selectedCredentialType.value = null;
		errors.name = "";
		errors.secretValue = "";
		errors.provider = "";
		apiErrorCode.value = null;
		apiErrorMessage.value = null;
	}
	let latestFileReadId = 0;
	async function loadSecretFromFile(file) {
		if (!file) return;
		errors.secretValue = "";
		if (file.size > MAX_JSON_FILE_BYTES) {
			errors.secretValue = t("secrets.errors.fileTooLarge");
			return;
		}
		const readId = ++latestFileReadId;
		try {
			const text = await file.text();
			if (readId !== latestFileReadId) return;
			form.secretValue = text;
			fileName.value = file.name;
		} catch {
			if (readId !== latestFileReadId) return;
			errors.secretValue = t("secrets.errors.fileReadFailed");
		}
	}
	watch(() => form.provider, () => {
		latestFileReadId++;
		form.secretValue = "";
		fileName.value = "";
		selectedCredentialType.value = null;
	});
	watch([credentialType, selectedInputType], ([, inputType], [previousType, previousInputType]) => {
		if (previousType === null && inputType === previousInputType) return;
		latestFileReadId++;
		form.secretValue = "";
		fileName.value = "";
		errors.secretValue = "";
	});
	whenever(() => visible.value, resetForm);
	function validate() {
		errors.name = "";
		errors.secretValue = "";
		errors.provider = "";
		if (!form.name.trim()) {
			errors.name = t("secrets.errors.nameRequired");
			return false;
		}
		if (form.name.length > 255) {
			errors.name = t("secrets.errors.nameTooLong");
			return false;
		}
		if (!form.provider) {
			errors.provider = t("secrets.errors.providerRequired");
			return false;
		}
		if (mode === "create" && !form.secretValue) {
			errors.secretValue = t("secrets.errors.secretValueRequired");
			return false;
		}
		if (selectedInputType.value === "json_file" && form.secretValue && !isJsonObject(form.secretValue)) {
			errors.secretValue = t("secrets.errors.invalidJson");
			return false;
		}
		return true;
	}
	async function handleSubmit() {
		if (!validate()) return;
		loading.value = true;
		apiErrorCode.value = null;
		apiErrorMessage.value = null;
		try {
			const secret = toValue(secretRef);
			if (mode === "create") await createSecret({
				name: form.name.trim(),
				secret_value: form.secretValue,
				provider: form.provider,
				...credentialType.value ? { credential_type: credentialType.value } : {}
			});
			else if (secret) {
				const updatePayload = { name: form.name.trim() };
				if (form.secretValue) updatePayload.secret_value = form.secretValue;
				await updateSecret(secret.id, updatePayload);
			}
			onSaved();
			visible.value = false;
		} catch (err) {
			if (err instanceof SecretsApiError) {
				apiErrorCode.value = err.code ?? null;
				apiErrorMessage.value = err.message;
			}
		} finally {
			loading.value = false;
		}
	}
	return {
		form,
		errors,
		loading,
		apiError,
		providerOptions,
		providerHelp,
		selectedInputType,
		credentialOptions,
		credentialType,
		fileName,
		loadSecretFromFile,
		handleSubmit
	};
}
//#endregion
//#region src/platform/secrets/components/SecretFormDialog.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1$2 = { class: "flex items-center gap-2" };
var _hoisted_2$2 = ["src"];
var _hoisted_3$2 = {
	key: 0,
	class: "text-sm text-muted-foreground"
};
var _hoisted_4$2 = { class: "flex justify-end gap-2 py-2" };
//#endregion
//#region src/platform/secrets/components/SecretFormDialog.vue
var SecretFormDialog_default = /* @__PURE__ */ defineComponent({
	__name: "SecretFormDialog",
	props: /*@__PURE__*/ mergeModels({
		secret: {},
		existingProviders: { default: () => [] },
		availableProviders: { default: null },
		mode: { default: "create" }
	}, {
		"visible": {
			type: Boolean,
			default: false
		},
		"visibleModifiers": {}
	}),
	emits: /*@__PURE__*/ mergeModels(["saved"], ["update:visible"]),
	setup(__props, { emit: __emit }) {
		const visible = useModel(__props, "visible");
		const emit = __emit;
		const { t } = useI18n();
		const titleId = useId();
		const fileInput = useTemplateRef("fileInput");
		const { form, errors, loading, apiError, providerOptions, providerHelp, selectedInputType, credentialOptions, credentialType, fileName, loadSecretFromFile, handleSubmit } = useSecretForm({
			mode: __props.mode,
			secret: () => __props.secret,
			existingProviders: () => __props.existingProviders,
			availableProviders: () => __props.availableProviders,
			visible,
			onSaved: () => emit("saved")
		});
		const secretValueHint = computed(() => {
			if (selectedInputType.value === "json_file") return __props.mode === "edit" ? t("secrets.jsonFileHintEdit") : t("secrets.jsonFileHint");
			return __props.mode === "edit" ? t("secrets.secretValueHintEdit") : t("secrets.secretValueHint");
		});
		async function onFileChange(event) {
			const input = event.target;
			await loadSecretFromFile(input.files?.[0] ?? null);
			input.value = "";
		}
		return (_ctx, _cache) => {
			return openBlock(), createBlock(Dialog_default, {
				open: visible.value,
				"onUpdate:open": _cache[8] || (_cache[8] = ($event) => visible.value = $event)
			}, {
				default: withCtx(() => [createVNode(DialogPortal_default, null, {
					default: withCtx(() => [withDirectives(createVNode(DialogOverlay_default, { "data-reka-nested-dialog-overlay": "" }, null, 512), [[unref(vRekaZIndex)]]), withDirectives((openBlock(), createBlock(DialogContent_default, {
						size: "md",
						"aria-labelledby": unref(titleId)
					}, {
						default: withCtx(() => [createVNode(DialogHeader_default, null, {
							default: withCtx(() => [createVNode(DialogTitle_default, { id: unref(titleId) }, {
								default: withCtx(() => [createTextVNode(toDisplayString(__props.mode === "create" ? _ctx.$t("secrets.addSecret") : _ctx.$t("secrets.editSecret")), 1)]),
								_: 1
							}, 8, ["id"]), createVNode(DialogClose_default)]),
							_: 1
						}), createBaseVNode("form", {
							class: "flex flex-col gap-4 px-4 py-2",
							onSubmit: _cache[7] || (_cache[7] = withModifiers((...args) => unref(handleSubmit) && unref(handleSubmit)(...args), ["prevent"]))
						}, [
							createVNode(Field_default, { "data-invalid": !!unref(errors).provider }, {
								default: withCtx(() => [
									createVNode(FieldLabel_default, { for: "secret-provider" }, {
										default: withCtx(() => [createTextVNode(toDisplayString(_ctx.$t("secrets.provider")), 1)]),
										_: 1
									}),
									createVNode(Select_default, {
										modelValue: unref(form).provider,
										"onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => unref(form).provider = $event),
										disabled: __props.mode === "edit"
									}, {
										default: withCtx(() => [createVNode(SelectTrigger_default, {
											id: "secret-provider",
											class: "w-full",
											autofocus: "",
											invalid: !!unref(errors).provider
										}, {
											default: withCtx(() => [createVNode(SelectValue_default, { placeholder: _ctx.$t("g.none") }, null, 8, ["placeholder"])]),
											_: 1
										}, 8, ["invalid"]), createVNode(SelectContent_default, { "disable-portal": "" }, {
											default: withCtx(() => [(openBlock(true), createElementBlock(Fragment, null, renderList(unref(providerOptions), (option) => {
												return openBlock(), createBlock(SelectItem_default, {
													key: option.value || "none",
													value: option.value,
													disabled: option.disabled
												}, {
													default: withCtx(() => [createBaseVNode("span", _hoisted_1$2, [option.logo ? (openBlock(), createElementBlock("img", {
														key: 0,
														src: option.logo,
														alt: "",
														class: "size-4"
													}, null, 8, _hoisted_2$2)) : createCommentVNode("", true), createTextVNode(" " + toDisplayString(option.label), 1)])]),
													_: 2
												}, 1032, ["value", "disabled"]);
											}), 128))]),
											_: 1
										})]),
										_: 1
									}, 8, ["modelValue", "disabled"]),
									unref(errors).provider ? (openBlock(), createBlock(FieldError_default, { key: 0 }, {
										default: withCtx(() => [createTextVNode(toDisplayString(unref(errors).provider), 1)]),
										_: 1
									})) : (openBlock(), createBlock(FieldDescription_default, { key: 1 }, {
										default: withCtx(() => [createTextVNode(toDisplayString(unref(providerHelp)), 1)]),
										_: 1
									}))
								]),
								_: 1
							}, 8, ["data-invalid"]),
							__props.mode === "create" && unref(credentialOptions).length > 1 ? (openBlock(), createBlock(Field_default, { key: 0 }, {
								default: withCtx(() => [
									createVNode(FieldLabel_default, { for: "secret-credential-type" }, {
										default: withCtx(() => [createTextVNode(toDisplayString(_ctx.$t("secrets.credentialType")), 1)]),
										_: 1
									}),
									createVNode(Select_default, {
										modelValue: unref(credentialType),
										"onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => isRef(credentialType) ? credentialType.value = $event : null)
									}, {
										default: withCtx(() => [createVNode(SelectTrigger_default, {
											id: "secret-credential-type",
											class: "w-full"
										}, {
											default: withCtx(() => [createVNode(SelectValue_default)]),
											_: 1
										}), createVNode(SelectContent_default, { "disable-portal": "" }, {
											default: withCtx(() => [(openBlock(true), createElementBlock(Fragment, null, renderList(unref(credentialOptions), (option) => {
												return openBlock(), createBlock(SelectItem_default, {
													key: option.credential_type,
													value: option.credential_type
												}, {
													default: withCtx(() => [createTextVNode(toDisplayString(option.label), 1)]),
													_: 2
												}, 1032, ["value"]);
											}), 128))]),
											_: 1
										})]),
										_: 1
									}, 8, ["modelValue"]),
									createVNode(FieldDescription_default, null, {
										default: withCtx(() => [createTextVNode(toDisplayString(_ctx.$t("secrets.credentialTypeHint")), 1)]),
										_: 1
									})
								]),
								_: 1
							})) : createCommentVNode("", true),
							createVNode(Field_default, { "data-invalid": !!unref(errors).name }, {
								default: withCtx(() => [
									createVNode(FieldLabel_default, { for: "secret-name" }, {
										default: withCtx(() => [createTextVNode(toDisplayString(_ctx.$t("secrets.name")), 1)]),
										_: 1
									}),
									createVNode(Input_default, {
										id: "secret-name",
										modelValue: unref(form).name,
										"onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => unref(form).name = $event),
										placeholder: _ctx.$t("secrets.namePlaceholder"),
										"aria-invalid": !!unref(errors).name
									}, null, 8, [
										"modelValue",
										"placeholder",
										"aria-invalid"
									]),
									unref(errors).name ? (openBlock(), createBlock(FieldError_default, { key: 0 }, {
										default: withCtx(() => [createTextVNode(toDisplayString(unref(errors).name), 1)]),
										_: 1
									})) : createCommentVNode("", true)
								]),
								_: 1
							}, 8, ["data-invalid"]),
							createVNode(Field_default, { "data-invalid": !!unref(errors).secretValue }, {
								default: withCtx(() => [
									createVNode(FieldLabel_default, { for: "secret-value" }, {
										default: withCtx(() => [createTextVNode(toDisplayString(_ctx.$t("secrets.secretValue")), 1)]),
										_: 1
									}),
									unref(selectedInputType) === "json_file" ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
										createVNode(Button_default, {
											type: "button",
											variant: "secondary",
											size: "sm",
											class: "w-fit",
											onClick: _cache[3] || (_cache[3] = ($event) => fileInput.value?.click())
										}, {
											default: withCtx(() => [_cache[9] || (_cache[9] = createBaseVNode("i", { class: "icon-[lucide--upload]" }, null, -1)), createTextVNode(" " + toDisplayString(_ctx.$t("secrets.uploadJsonFile")), 1)]),
											_: 1
										}),
										createBaseVNode("input", {
											ref_key: "fileInput",
											ref: fileInput,
											type: "file",
											accept: "application/json,.json",
											class: "hidden",
											onChange: onFileChange
										}, null, 544),
										unref(fileName) ? (openBlock(), createElementBlock("span", _hoisted_3$2, toDisplayString(unref(fileName)), 1)) : createCommentVNode("", true),
										createVNode(Textarea_default, {
											id: "secret-value",
											modelValue: unref(form).secretValue,
											"onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => unref(form).secretValue = $event),
											placeholder: _ctx.$t("secrets.jsonFilePlaceholder"),
											class: "min-h-32 font-mono",
											"aria-invalid": !!unref(errors).secretValue
										}, null, 8, [
											"modelValue",
											"placeholder",
											"aria-invalid"
										])
									], 64)) : (openBlock(), createBlock(PasswordInput_default, {
										key: 1,
										id: "secret-value",
										modelValue: unref(form).secretValue,
										"onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => unref(form).secretValue = $event),
										placeholder: __props.mode === "edit" ? _ctx.$t("secrets.secretValuePlaceholderEdit") : _ctx.$t("secrets.secretValuePlaceholder"),
										"aria-invalid": !!unref(errors).secretValue
									}, null, 8, [
										"modelValue",
										"placeholder",
										"aria-invalid"
									])),
									unref(errors).secretValue ? (openBlock(), createBlock(FieldError_default, { key: 2 }, {
										default: withCtx(() => [createTextVNode(toDisplayString(unref(errors).secretValue), 1)]),
										_: 1
									})) : (openBlock(), createBlock(FieldDescription_default, { key: 3 }, {
										default: withCtx(() => [createTextVNode(toDisplayString(secretValueHint.value), 1)]),
										_: 1
									}))
								]),
								_: 1
							}, 8, ["data-invalid"]),
							unref(apiError) ? (openBlock(), createBlock(FieldError_default, { key: 1 }, {
								default: withCtx(() => [createTextVNode(toDisplayString(unref(apiError)), 1)]),
								_: 1
							})) : createCommentVNode("", true),
							createBaseVNode("div", _hoisted_4$2, [createVNode(Button_default, {
								variant: "secondary",
								type: "button",
								tabindex: "0",
								onClick: _cache[6] || (_cache[6] = ($event) => visible.value = false)
							}, {
								default: withCtx(() => [createTextVNode(toDisplayString(_ctx.$t("g.cancel")), 1)]),
								_: 1
							}), createVNode(Button_default, {
								type: "submit",
								tabindex: "0",
								loading: unref(loading)
							}, {
								default: withCtx(() => [createTextVNode(toDisplayString(_ctx.$t("g.save")), 1)]),
								_: 1
							}, 8, ["loading"])])
						], 32)]),
						_: 1
					}, 8, ["aria-labelledby"])), [[unref(vRekaZIndex)]])]),
					_: 1
				})]),
				_: 1
			}, 8, ["open"]);
		};
	}
});
//#endregion
//#region src/platform/secrets/components/SecretListItem.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1$1 = { class: "flex items-center justify-between rounded-lg border border-border-default bg-secondary-background p-4" };
var _hoisted_2$1 = { class: "flex flex-col gap-1" };
var _hoisted_3$1 = { class: "flex items-center gap-2" };
var _hoisted_4$1 = { class: "font-medium text-base-foreground" };
var _hoisted_5$1 = ["src", "alt"];
var _hoisted_6$1 = {
	key: 1,
	class: "rounded-sm bg-tertiary-background px-2 py-0.5 text-xs text-muted"
};
var _hoisted_7$1 = { class: "flex gap-3 text-xs text-muted" };
var _hoisted_8$1 = { key: 0 };
var _hoisted_9$1 = { key: 1 };
var _hoisted_10 = { class: "flex items-center gap-2" };
var _hoisted_11 = {
	key: 0,
	class: "pi pi-spinner pi-spin text-muted"
};
//#endregion
//#region src/platform/secrets/components/SecretListItem.vue
var SecretListItem_default = /* @__PURE__ */ defineComponent({
	__name: "SecretListItem",
	props: {
		secret: {},
		loading: {
			type: Boolean,
			default: false
		},
		disabled: {
			type: Boolean,
			default: false
		}
	},
	emits: ["edit", "delete"],
	setup(__props, { emit: __emit }) {
		const emit = __emit;
		const { d, t } = useI18n();
		const providerLabel = computed(() => getProviderLabel(__props.secret.provider));
		const providerLogo = computed(() => getProviderLogo(__props.secret.provider));
		function formatIsoDate(iso) {
			const date = parseIsoDateSafe(iso);
			return date ? d(date, { dateStyle: "medium" }) : "";
		}
		const createdDate = computed(() => formatIsoDate(__props.secret.created_at));
		const lastUsedDate = computed(() => formatIsoDate(__props.secret.last_used_at));
		const createdAtLabel = computed(() => createdDate.value ? t("secrets.createdAt", { date: createdDate.value }, { escapeParameter: false }) : "");
		const lastUsedLabel = computed(() => lastUsedDate.value ? t("secrets.lastUsed", { date: lastUsedDate.value }, { escapeParameter: false }) : "");
		const editLabel = computed(() => t("g.edit"));
		const deleteLabel = computed(() => t("g.delete"));
		return (_ctx, _cache) => {
			const _directive_tooltip = resolveDirective("tooltip");
			return openBlock(), createElementBlock("div", _hoisted_1$1, [createBaseVNode("div", _hoisted_2$1, [createBaseVNode("div", _hoisted_3$1, [createBaseVNode("span", _hoisted_4$1, toDisplayString(__props.secret.name), 1), providerLogo.value ? (openBlock(), createElementBlock("img", {
				key: 0,
				src: providerLogo.value,
				alt: providerLabel.value,
				class: "size-5"
			}, null, 8, _hoisted_5$1)) : __props.secret.provider ? (openBlock(), createElementBlock("span", _hoisted_6$1, toDisplayString(providerLabel.value), 1)) : createCommentVNode("", true)]), createBaseVNode("div", _hoisted_7$1, [createdAtLabel.value ? (openBlock(), createElementBlock("span", _hoisted_8$1, toDisplayString(createdAtLabel.value), 1)) : createCommentVNode("", true), lastUsedLabel.value ? (openBlock(), createElementBlock("span", _hoisted_9$1, toDisplayString(lastUsedLabel.value), 1)) : createCommentVNode("", true)])]), createBaseVNode("div", _hoisted_10, [__props.loading ? (openBlock(), createElementBlock("i", _hoisted_11)) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [withDirectives((openBlock(), createBlock(Button_default, {
				variant: "muted-textonly",
				size: "icon-sm",
				"aria-label": editLabel.value,
				disabled: __props.disabled,
				onClick: _cache[0] || (_cache[0] = ($event) => emit("edit"))
			}, {
				default: withCtx(() => [..._cache[2] || (_cache[2] = [createBaseVNode("i", { class: "pi pi-pen-to-square" }, null, -1)])]),
				_: 1
			}, 8, ["aria-label", "disabled"])), [[_directive_tooltip, {
				value: editLabel.value,
				showDelay: 300
			}]]), withDirectives((openBlock(), createBlock(Button_default, {
				variant: "muted-textonly",
				size: "icon-sm",
				"aria-label": deleteLabel.value,
				disabled: __props.disabled,
				onClick: _cache[1] || (_cache[1] = ($event) => emit("delete"))
			}, {
				default: withCtx(() => [..._cache[3] || (_cache[3] = [createBaseVNode("i", { class: "pi pi-trash" }, null, -1)])]),
				_: 1
			}, 8, ["aria-label", "disabled"])), [[_directive_tooltip, {
				value: deleteLabel.value,
				showDelay: 300
			}]])], 64))])]);
		};
	}
});
//#endregion
//#region src/platform/secrets/components/SecretsPanel.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1 = { class: "flex h-full flex-col" };
var _hoisted_2 = { class: "text-2xl font-bold" };
var _hoisted_3 = { class: "mt-1 text-sm text-muted" };
var _hoisted_4 = { class: "mt-1 text-sm text-muted" };
var _hoisted_5 = { class: "my-4 flex items-center justify-between" };
var _hoisted_6 = { class: "my-0 text-lg font-semibold" };
var _hoisted_7 = {
	key: 0,
	class: "flex items-center justify-center py-8"
};
var _hoisted_8 = {
	key: 1,
	class: "py-4 text-center text-sm text-muted"
};
var _hoisted_9 = {
	key: 2,
	class: "flex flex-col gap-3"
};
//#endregion
//#region src/platform/secrets/components/SecretsPanel.vue
var SecretsPanel_default = /* @__PURE__ */ defineComponent({
	__name: "SecretsPanel",
	setup(__props) {
		const { t } = useI18n();
		const dialogStore = useDialogStore();
		const { loading, secrets, availableProviders, operatingSecretId, existingProviders, fetchSecrets, fetchProviders, deleteSecret } = useSecrets();
		const createDialogVisible = ref(false);
		const editDialogVisible = ref(false);
		const selectedSecret = ref();
		function openCreateDialog() {
			createDialogVisible.value = true;
		}
		function openEditDialog(secret) {
			selectedSecret.value = secret;
			editDialogVisible.value = true;
		}
		function confirmDelete(secret) {
			const dialog = showConfirmDialog({
				headerProps: { title: t("secrets.deleteConfirmTitle") },
				props: { promptText: t("secrets.deleteConfirmMessage", { name: secret.name }) },
				footerProps: {
					confirmText: t("g.delete"),
					confirmVariant: "destructive",
					onCancel: () => dialogStore.closeDialog(dialog),
					onConfirm: async () => {
						dialogStore.closeDialog(dialog);
						await deleteSecret(secret);
					}
				}
			});
		}
		fetchSecrets();
		fetchProviders();
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", _hoisted_1, [
				createBaseVNode("div", null, [
					createBaseVNode("h2", _hoisted_2, toDisplayString(_ctx.$t("secrets.title")), 1),
					createBaseVNode("p", _hoisted_3, toDisplayString(_ctx.$t("secrets.description")), 1),
					createBaseVNode("p", _hoisted_4, toDisplayString(_ctx.$t("secrets.descriptionUsage")), 1)
				]),
				_cache[3] || (_cache[3] = createBaseVNode("div", { class: "my-4 border-t border-interface-stroke" }, null, -1)),
				createBaseVNode("div", _hoisted_5, [createBaseVNode("h3", _hoisted_6, toDisplayString(_ctx.$t("secrets.modelProviders")), 1), createVNode(Button_default, { onClick: openCreateDialog }, {
					default: withCtx(() => [_cache[2] || (_cache[2] = createBaseVNode("i", { class: "pi pi-plus mr-1" }, null, -1)), createTextVNode(" " + toDisplayString(_ctx.$t("secrets.addSecret")), 1)]),
					_: 1
				})]),
				unref(loading) ? (openBlock(), createElementBlock("div", _hoisted_7, [createVNode(Spinner_default, { class: "size-8" })])) : unref(secrets).length === 0 ? (openBlock(), createElementBlock("div", _hoisted_8, toDisplayString(_ctx.$t("secrets.noSecrets")), 1)) : (openBlock(), createElementBlock("div", _hoisted_9, [(openBlock(true), createElementBlock(Fragment, null, renderList(unref(secrets), (secret) => {
					return openBlock(), createBlock(SecretListItem_default, {
						key: secret.id,
						secret,
						loading: unref(operatingSecretId) === secret.id,
						disabled: unref(operatingSecretId) !== null,
						onEdit: ($event) => openEditDialog(secret),
						onDelete: ($event) => confirmDelete(secret)
					}, null, 8, [
						"secret",
						"loading",
						"disabled",
						"onEdit",
						"onDelete"
					]);
				}), 128))])),
				createVNode(SecretFormDialog_default, {
					visible: createDialogVisible.value,
					"onUpdate:visible": _cache[0] || (_cache[0] = ($event) => createDialogVisible.value = $event),
					mode: "create",
					"existing-providers": unref(existingProviders),
					"available-providers": unref(availableProviders),
					onSaved: unref(fetchSecrets)
				}, null, 8, [
					"visible",
					"existing-providers",
					"available-providers",
					"onSaved"
				]),
				createVNode(SecretFormDialog_default, {
					visible: editDialogVisible.value,
					"onUpdate:visible": _cache[1] || (_cache[1] = ($event) => editDialogVisible.value = $event),
					mode: "edit",
					secret: selectedSecret.value,
					"existing-providers": unref(existingProviders),
					"available-providers": unref(availableProviders),
					onSaved: unref(fetchSecrets)
				}, null, 8, [
					"visible",
					"secret",
					"existing-providers",
					"available-providers",
					"onSaved"
				])
			]);
		};
	}
});
//#endregion
export { SecretsPanel_default as default };
