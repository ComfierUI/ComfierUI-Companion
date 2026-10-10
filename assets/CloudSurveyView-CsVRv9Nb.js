import "./rolldown-runtime-xtsTai4I.js";
import { Jt as shuffle, _ as toTypedSchema, y as useForm } from "./vendor-other-BPEcPQTD.js";
import { E as withModifiers, Et as withCtx, F as createBaseVNode, G as defineComponent, H as createTextVNode, I as createBlock, Jt as normalizeClass, Kt as unref, L as createCommentVNode, Lt as ref, O as Fragment, P as computed, R as createElementBlock, St as watch, U as createVNode, Xt as normalizeStyle, Zt as toDisplayString, dt as renderList, et as nextTick, h as Transition, l as useRouter, lt as openBlock, ot as onMounted, s as isNavigationFailure, vt as useId, xt as useTemplateRef } from "./vendor-vue-core-C1utdb0s.js";
import { b as useElementSize } from "./vendor-vueuse-BxKIIsKg.js";
import { Bl as restoreSurveyReplayRequest, Rl as isSurveyReplayRequested, tt as useAuthStore } from "./layoutStore-CZsuzg91.js";
import { n as useTelemetry } from "./telemetry-IkzvF0TI.js";
import { _ as objectType, b as stringType, s as arrayType } from "./vendor-zod-TMj9Wsdv.js";
import { n as reportError } from "./reportError-LG-zfbNw.js";
import { s as remoteConfig } from "./remoteConfig-DwMQrLli.js";
import { t as useToastStore } from "./toastStore-CTfykAzG.js";
import { r as useI18n } from "./vendor-i18n-BZvE7WBQ.js";
import { t as useFeatureFlags } from "./useFeatureFlags-DAoj_aDd.js";
import { t as cn } from "./src-DI1bBfrb.js";
import { t as Button_default } from "./Button-j0oCzR82.js";
import { t as Input_default } from "./Input-Cx8jjgHK.js";
import { n as ToggleGroup_default, t as ToggleGroupItem_default } from "./ToggleGroupItem-Da4A26JJ.js";
import "./toggle-group-B0brfUuj.js";
import { r as submitSurvey, t as getSurveyCompletedStatus } from "./auth-BShkAyQ4.js";
var hasNonEmptyValue = (current) => {
	if (current === void 0 || current === "") return false;
	if (Array.isArray(current)) return current.length > 0;
	return true;
};
var isOtherValue = (current) => Array.isArray(current) ? current.includes("other") : current === "other";
var conditionMatches = (condition, values) => {
	if (!condition) return true;
	const current = values[condition.field];
	if (!hasNonEmptyValue(current)) return false;
	const expected = condition.equals;
	if (expected === void 0) return true;
	const expectedSet = Array.isArray(expected) ? expected : [expected];
	if (Array.isArray(current)) return current.some((v) => expectedSet.includes(v));
	return typeof current === "string" && expectedSet.includes(current);
};
var visibleFields = (survey, values) => survey.fields.filter((field) => conditionMatches(field.showWhen, values));
var PIN_LAST_VALUES = /* @__PURE__ */ new Set(["other", "not_sure"]);
var randomizeOptions = (field) => {
	if (!field.randomize || !field.options) return field;
	const pinned = field.options.filter((opt) => PIN_LAST_VALUES.has(opt.value));
	const rest = field.options.filter((opt) => !PIN_LAST_VALUES.has(opt.value));
	return {
		...field,
		options: [...shuffle(rest), ...pinned]
	};
};
var prepareSurvey = (survey) => ({
	...survey,
	fields: survey.fields.map(randomizeOptions)
});
var identityTranslator = (key) => key;
var fieldSchema = (field, t) => {
	if (field.type === "multi") {
		const arr = arrayType(stringType());
		return field.required ? arr.min(1, { message: t("cloudOnboarding.survey.errors.selectAtLeastOne") }) : arr.optional();
	}
	if (field.required) return stringType().min(1, { message: t("cloudOnboarding.survey.errors.chooseAnOption") });
	return stringType().optional();
};
var buildZodSchema = (survey, values, t = identityTranslator) => {
	const shape = {};
	for (const field of survey.fields) {
		if (!conditionMatches(field.showWhen, values)) continue;
		shape[field.id] = fieldSchema(field, t);
		if (field.allowOther && field.otherFieldId && isOtherValue(values[field.id])) shape[field.otherFieldId] = stringType().trim().min(1, { message: t("cloudOnboarding.survey.errors.describeAnswer") }).max(200, { message: t("cloudOnboarding.survey.errors.answerTooLong", { max: 200 }) });
		else if (field.otherFieldId) shape[field.otherFieldId] = stringType().optional();
	}
	return objectType(shape);
};
var buildInitialValues = (survey) => {
	const initial = {};
	for (const field of survey.fields) {
		initial[field.id] = field.type === "multi" ? [] : "";
		if (field.otherFieldId) initial[field.otherFieldId] = "";
	}
	return initial;
};
var buildSubmissionPayload = (survey, values) => {
	const payload = {};
	for (const field of survey.fields) {
		if (!conditionMatches(field.showWhen, values)) {
			payload[field.id] = field.type === "multi" ? [] : "";
			continue;
		}
		const value = values[field.id];
		const otherFieldId = field.otherFieldId;
		const otherRaw = otherFieldId ? values[otherFieldId] : void 0;
		const otherText = field.allowOther && otherFieldId && isOtherValue(value) && typeof otherRaw === "string" ? otherRaw.trim() : void 0;
		if (otherText !== void 0 && field.type !== "multi") payload[field.id] = otherText || "other";
		else {
			payload[field.id] = field.type === "multi" ? value ?? [] : value ?? "";
			if (otherText !== void 0 && otherFieldId) payload[otherFieldId] = otherText;
		}
	}
	return payload;
};
//#endregion
//#region src/platform/cloud/onboarding/survey/DynamicSurveyField.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1$2 = ["aria-invalid"];
var _hoisted_2$2 = { class: "mb-2 block text-lg font-medium text-primary-comfy-canvas" };
var _hoisted_3$1 = { class: "flex-1" };
var _hoisted_4$1 = { class: "flex-1" };
var _hoisted_5$1 = {
	key: 3,
	class: "text-xs text-destructive-background"
};
var _hoisted_6 = {
	key: 1,
	class: "flex flex-col gap-3"
};
var _hoisted_7 = ["for"];
var _hoisted_8 = {
	key: 0,
	class: "text-xs text-destructive-background"
};
var optionCardClass = "group h-auto w-full items-center justify-start gap-3 rounded-md border border-solid border-smoke-800/10 bg-smoke-800/10 px-4 py-3 text-left text-sm text-primary-comfy-canvas shadow-inset-highlight transition-colors hover:bg-sand-300/20 data-[state=on]:bg-sand-300/15 data-[state=on]:ring-1 data-[state=on]:ring-inset data-[state=on]:ring-brand-yellow";
var checkMarkClass = "icon-[lucide--check] size-4 shrink-0 text-brand-yellow opacity-0 group-data-[state=on]:opacity-100";
var inputClass = "border-smoke-800/10 bg-smoke-800/10 text-primary-comfy-canvas placeholder:text-primary-comfy-canvas/50 focus-visible:ring-inset";
//#endregion
//#region src/platform/cloud/onboarding/survey/DynamicSurveyField.vue
var DynamicSurveyField_default = /* @__PURE__ */ defineComponent({
	__name: "DynamicSurveyField",
	props: {
		field: {},
		modelValue: {},
		otherValue: {},
		errorMessage: { default: "" }
	},
	emits: ["update:modelValue", "update:otherValue"],
	setup(__props, { emit: __emit }) {
		const emit = __emit;
		const { t, te, locale } = useI18n();
		const controlId = useId();
		const isOtherSelected = computed(() => Array.isArray(__props.modelValue) ? __props.modelValue.includes("other") : __props.modelValue === "other");
		const resolveLocalized = (value) => {
			if (typeof value === "string") return value;
			return value[locale.value] ?? value.en ?? Object.values(value)[0] ?? "";
		};
		const resolvedLabel = computed(() => {
			if (__props.field.labelKey && te(__props.field.labelKey)) return t(__props.field.labelKey);
			if (__props.field.label != null) return resolveLocalized(__props.field.label);
			return __props.field.id;
		});
		const resolveOptionLabel = (option) => {
			if (option.labelKey && te(option.labelKey)) return t(option.labelKey);
			if (option.label != null) return resolveLocalized(option.label);
			return option.value;
		};
		const onSingleChange = (value) => {
			emit("update:modelValue", typeof value === "string" ? value : "");
		};
		const onMultiChange = (value) => {
			emit("update:modelValue", (Array.isArray(value) ? value : []).filter((v) => typeof v === "string"));
		};
		const onTextChange = (value) => {
			emit("update:modelValue", String(value ?? ""));
		};
		const onOtherChange = (value) => {
			emit("update:otherValue", String(value ?? ""));
		};
		return (_ctx, _cache) => {
			return __props.field.type !== "text" ? (openBlock(), createElementBlock("fieldset", {
				key: 0,
				"aria-invalid": Boolean(__props.errorMessage),
				class: "m-0 flex flex-col gap-4 border-0 p-0"
			}, [
				createBaseVNode("legend", _hoisted_2$2, toDisplayString(resolvedLabel.value), 1),
				__props.field.type === "single" ? (openBlock(), createBlock(unref(ToggleGroup_default), {
					key: 0,
					"model-value": __props.modelValue ?? "",
					type: "single",
					class: "flex w-full flex-col gap-2",
					"onUpdate:modelValue": onSingleChange
				}, {
					default: withCtx(() => [(openBlock(true), createElementBlock(Fragment, null, renderList(__props.field.options, (option) => {
						return openBlock(), createBlock(unref(ToggleGroupItem_default), {
							id: `${__props.field.id}-${option.value}`,
							key: option.value,
							value: option.value,
							class: normalizeClass(optionCardClass)
						}, {
							default: withCtx(() => [
								option.icon ? (openBlock(), createElementBlock("i", {
									key: 0,
									class: normalizeClass(unref(cn)("size-4 shrink-0 text-primary-comfy-canvas/60", option.icon)),
									"aria-hidden": "true"
								}, null, 2)) : createCommentVNode("", true),
								createBaseVNode("span", _hoisted_3$1, toDisplayString(resolveOptionLabel(option)), 1),
								createBaseVNode("i", {
									class: normalizeClass(checkMarkClass),
									"aria-hidden": "true"
								})
							]),
							_: 2
						}, 1032, ["id", "value"]);
					}), 128))]),
					_: 1
				}, 8, ["model-value"])) : (openBlock(), createBlock(unref(ToggleGroup_default), {
					key: 1,
					"model-value": __props.modelValue ?? [],
					type: "multiple",
					class: "flex w-full flex-col gap-2",
					"onUpdate:modelValue": onMultiChange
				}, {
					default: withCtx(() => [(openBlock(true), createElementBlock(Fragment, null, renderList(__props.field.options, (option) => {
						return openBlock(), createBlock(unref(ToggleGroupItem_default), {
							id: `${__props.field.id}-${option.value}`,
							key: option.value,
							value: option.value,
							class: normalizeClass(optionCardClass)
						}, {
							default: withCtx(() => [
								option.icon ? (openBlock(), createElementBlock("i", {
									key: 0,
									class: normalizeClass(unref(cn)("size-4 shrink-0 text-primary-comfy-canvas/60", option.icon)),
									"aria-hidden": "true"
								}, null, 2)) : createCommentVNode("", true),
								createBaseVNode("span", _hoisted_4$1, toDisplayString(resolveOptionLabel(option)), 1),
								createBaseVNode("i", {
									class: normalizeClass(checkMarkClass),
									"aria-hidden": "true"
								})
							]),
							_: 2
						}, 1032, ["id", "value"]);
					}), 128))]),
					_: 1
				}, 8, ["model-value"])),
				__props.field.allowOther && __props.field.otherFieldId && isOtherSelected.value ? (openBlock(), createBlock(Input_default, {
					key: 2,
					"model-value": __props.otherValue ?? "",
					class: normalizeClass(inputClass),
					maxlength: unref(200),
					placeholder: _ctx.$t(`cloudOnboarding.survey.options.${__props.field.id}.otherPlaceholder`, _ctx.$t("cloudOnboarding.survey.otherPlaceholder")),
					"onUpdate:modelValue": onOtherChange
				}, null, 8, [
					"model-value",
					"maxlength",
					"placeholder"
				])) : createCommentVNode("", true),
				__props.errorMessage ? (openBlock(), createElementBlock("p", _hoisted_5$1, toDisplayString(__props.errorMessage), 1)) : createCommentVNode("", true)
			], 8, _hoisted_1$2)) : (openBlock(), createElementBlock("div", _hoisted_6, [
				createBaseVNode("label", {
					for: unref(controlId),
					class: "block text-lg font-medium text-primary-comfy-canvas"
				}, toDisplayString(resolvedLabel.value), 9, _hoisted_7),
				createVNode(Input_default, {
					id: unref(controlId),
					"model-value": __props.modelValue ?? "",
					placeholder: __props.field.placeholder,
					"aria-invalid": Boolean(__props.errorMessage),
					class: normalizeClass(inputClass),
					"onUpdate:modelValue": onTextChange
				}, null, 8, [
					"id",
					"model-value",
					"placeholder",
					"aria-invalid"
				]),
				__props.errorMessage ? (openBlock(), createElementBlock("p", _hoisted_8, toDisplayString(__props.errorMessage), 1)) : createCommentVNode("", true)
			]));
		};
	}
});
//#endregion
//#region src/platform/cloud/onboarding/survey/DynamicSurveyForm.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1$1 = {
	key: 0,
	class: "mb-4 text-sm text-muted-foreground"
};
var _hoisted_2$1 = { class: "mb-8 h-1.5 w-full overflow-hidden rounded-full bg-primary-comfy-canvas/10" };
var _hoisted_3 = {
	key: 1,
	class: "mt-8 flex items-center justify-between gap-4"
};
var _hoisted_4 = { key: 1 };
var _hoisted_5 = { key: 4 };
//#endregion
//#region src/platform/cloud/onboarding/survey/DynamicSurveyForm.vue
var DynamicSurveyForm_default = /* @__PURE__ */ defineComponent({
	__name: "DynamicSurveyForm",
	props: {
		survey: {},
		isSubmitting: { type: Boolean }
	},
	emits: ["submit"],
	setup(__props, { emit: __emit }) {
		const emit = __emit;
		const { t, te } = useI18n();
		const preparedSurvey = computed(() => prepareSurvey(__props.survey));
		const introText = computed(() => {
			const key = preparedSurvey.value.introKey;
			if (!key) return "";
			return te(key) ? t(key) : "";
		});
		const liveValues = ref(buildInitialValues(preparedSurvey.value));
		const validationSchema = computed(() => toTypedSchema(buildZodSchema(preparedSurvey.value, liveValues.value, t)));
		const { values, errors, setFieldValue, validate, resetForm } = useForm({
			initialValues: liveValues.value,
			validationSchema
		});
		watch(() => __props.survey, () => {
			const fresh = buildInitialValues(preparedSurvey.value);
			liveValues.value = { ...fresh };
			resetForm({ values: fresh });
			stepIndex.value = 0;
			touched.value = /* @__PURE__ */ new Set();
			isAdvancing.value = false;
		});
		const visible = computed(() => visibleFields(preparedSurvey.value, values));
		const stepIndex = ref(0);
		const touched = ref(/* @__PURE__ */ new Set());
		const isAdvancing = ref(false);
		const questionContent = useTemplateRef("questionContent");
		const { height: contentHeight } = useElementSize(questionContent);
		const animatedHeightStyle = computed(() => contentHeight.value ? { height: `${contentHeight.value}px` } : {});
		const currentField = computed(() => visible.value[stepIndex.value]);
		const isFirst = computed(() => stepIndex.value === 0);
		const isLast = computed(() => stepIndex.value === visible.value.length - 1);
		const showNext = computed(() => {
			if (isLast.value || isAdvancing.value) return false;
			const field = currentField.value;
			if (!field) return false;
			if (field.type !== "single") return true;
			return !(field.required && !hasNonEmptyValue(values[field.id]));
		});
		const currentError = computed(() => {
			const field = currentField.value;
			if (!field) return void 0;
			if (touched.value.has(field.id) && errors.value[field.id]) return errors.value[field.id];
			if (field.otherFieldId && touched.value.has(field.otherFieldId) && errors.value[field.otherFieldId]) return errors.value[field.otherFieldId];
		});
		const totalSteps = computed(() => Math.max(visible.value.length, 1));
		const progressPercent = computed(() => Math.max(100 / totalSteps.value, (stepIndex.value + 1) / totalSteps.value * 100));
		const isCurrentValid = computed(() => {
			const field = currentField.value;
			if (!field) return false;
			const value = values[field.id];
			if (!hasNonEmptyValue(value)) return !field.required;
			if (field.allowOther && field.otherFieldId && isOtherValue(value)) {
				const other = values[field.otherFieldId];
				return typeof other === "string" && other.trim().length > 0;
			}
			return true;
		});
		const isAutoAdvanceValue = (field, value) => field.type === "single" && typeof value === "string" && value !== "" && value !== "other";
		const markTouched = (id) => {
			touched.value = new Set(touched.value).add(id);
		};
		const onFieldChange = async (id, value) => {
			if (isAdvancing.value) return;
			markTouched(id);
			setFieldValue(id, value);
			liveValues.value = {
				...liveValues.value,
				[id]: value
			};
			if (stepIndex.value > visible.value.length - 1) stepIndex.value = Math.max(0, visible.value.length - 1);
			const field = currentField.value;
			if (field?.id === id && isAutoAdvanceValue(field, value)) {
				isAdvancing.value = true;
				await nextTick();
				goNext();
				isAdvancing.value = false;
			}
		};
		const goNext = () => {
			if (stepIndex.value < visible.value.length - 1) stepIndex.value += 1;
		};
		const goPrevious = () => {
			if (stepIndex.value > 0) stepIndex.value -= 1;
		};
		const onSubmit = async () => {
			const field = currentField.value;
			if (field) {
				markTouched(field.id);
				if (field.otherFieldId) markTouched(field.otherFieldId);
			}
			if (!(await validate()).valid) return;
			emit("submit", buildSubmissionPayload(preparedSurvey.value, values));
		};
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("form", {
				class: "flex w-full flex-col",
				onSubmit: withModifiers(onSubmit, ["prevent"])
			}, [
				introText.value ? (openBlock(), createElementBlock("p", _hoisted_1$1, toDisplayString(introText.value), 1)) : createCommentVNode("", true),
				createBaseVNode("div", _hoisted_2$1, [createBaseVNode("div", {
					class: "h-full bg-brand-yellow transition-[width] duration-300 ease-out",
					style: normalizeStyle({ width: `${progressPercent.value}%` })
				}, null, 4)]),
				createBaseVNode("div", {
					class: "max-h-[45vh] overflow-y-auto transition-[height] duration-300 ease-out sm:max-h-[55vh]",
					style: normalizeStyle(animatedHeightStyle.value)
				}, [createBaseVNode("div", {
					ref_key: "questionContent",
					ref: questionContent,
					class: "relative"
				}, [createVNode(Transition, {
					"enter-active-class": "transition-opacity duration-300 ease-out",
					"enter-from-class": "opacity-0",
					"leave-active-class": "absolute inset-x-0 top-0 transition-opacity duration-300 ease-out",
					"leave-to-class": "opacity-0"
				}, {
					default: withCtx(() => [currentField.value ? (openBlock(), createElementBlock("div", {
						key: currentField.value.id,
						class: "flex flex-col gap-4"
					}, [createVNode(DynamicSurveyField_default, {
						field: currentField.value,
						"model-value": unref(values)[currentField.value.id],
						"other-value": currentField.value.otherFieldId ? unref(values)[currentField.value.otherFieldId] : void 0,
						"error-message": currentError.value,
						"onUpdate:modelValue": _cache[0] || (_cache[0] = (value) => void onFieldChange(currentField.value.id, value)),
						"onUpdate:otherValue": _cache[1] || (_cache[1] = (value) => currentField.value.otherFieldId && void onFieldChange(currentField.value.otherFieldId, value))
					}, null, 8, [
						"field",
						"model-value",
						"other-value",
						"error-message"
					])])) : createCommentVNode("", true)]),
					_: 1
				})], 512)], 4),
				!isFirst.value || showNext.value || isLast.value ? (openBlock(), createElementBlock("div", _hoisted_3, [!isFirst.value ? (openBlock(), createBlock(Button_default, {
					key: 0,
					type: "button",
					variant: "link",
					size: "lg",
					class: "px-0 text-primary-comfy-canvas/70 hover:text-primary-comfy-canvas",
					onClick: goPrevious
				}, {
					default: withCtx(() => [_cache[2] || (_cache[2] = createBaseVNode("i", {
						class: "icon-[lucide--chevron-left] size-4",
						"aria-hidden": "true"
					}, null, -1)), createTextVNode(" " + toDisplayString(_ctx.$t("g.back")), 1)]),
					_: 1
				})) : (openBlock(), createElementBlock("span", _hoisted_4)), showNext.value ? (openBlock(), createBlock(Button_default, {
					key: 2,
					type: "button",
					size: "lg",
					disabled: !isCurrentValid.value,
					class: "bg-brand-yellow text-primary-comfy-ink hover:bg-brand-yellow/85 disabled:bg-smoke-800/10 disabled:text-primary-comfy-canvas/40 disabled:opacity-100",
					onClick: goNext
				}, {
					default: withCtx(() => [createTextVNode(toDisplayString(_ctx.$t("g.next")) + " ", 1), _cache[3] || (_cache[3] = createBaseVNode("i", {
						class: "icon-[lucide--chevron-right] size-4",
						"aria-hidden": "true"
					}, null, -1))]),
					_: 1
				}, 8, ["disabled"])) : isLast.value ? (openBlock(), createBlock(Button_default, {
					key: 3,
					type: "submit",
					size: "lg",
					disabled: !isCurrentValid.value || __props.isSubmitting,
					loading: __props.isSubmitting,
					class: "bg-brand-yellow text-primary-comfy-ink hover:bg-brand-yellow/85 disabled:bg-smoke-800/10 disabled:text-primary-comfy-canvas/40 disabled:opacity-100"
				}, {
					default: withCtx(() => [createTextVNode(toDisplayString(_ctx.$t("g.submit")), 1)]),
					_: 1
				}, 8, ["disabled", "loading"])) : (openBlock(), createElementBlock("span", _hoisted_5))])) : createCommentVNode("", true)
			], 32);
		};
	}
});
//#endregion
//#region src/platform/cloud/onboarding/survey/defaultSurveySchema.ts
var optionsFor = (fieldId, values, icons = {}) => values.map((value) => ({
	value,
	labelKey: `cloudOnboarding.survey.options.${fieldId}.${value}`,
	...icons[value] ? { icon: icons[value] } : {}
}));
var defaultOnboardingSurvey = {
	version: 3,
	introKey: "cloudOnboarding.survey.intro",
	fields: [
		{
			id: "intent",
			type: "single",
			labelKey: "cloudSurvey_steps_intent",
			required: true,
			allowOther: true,
			otherFieldId: "intentOther",
			options: optionsFor("intent", [
				"images",
				"video",
				"workflows",
				"apps_api",
				"exploring",
				"other"
			], {
				images: "icon-[lucide--image]",
				video: "icon-[lucide--video]",
				workflows: "icon-[lucide--workflow]",
				apps_api: "icon-[lucide--blocks]",
				exploring: "icon-[lucide--compass]",
				other: "icon-[lucide--pencil]"
			})
		},
		{
			id: "experience",
			type: "single",
			labelKey: "cloudSurvey_steps_experience",
			required: true,
			options: optionsFor("experience", [
				"new",
				"some",
				"pro"
			], {
				new: "icon-[lucide--sprout]",
				some: "icon-[lucide--map]",
				pro: "icon-[lucide--rocket]"
			})
		},
		{
			id: "focus",
			type: "single",
			labelKey: "cloudSurvey_steps_focus",
			required: true,
			showWhen: {
				field: "intent",
				equals: ["workflows", "apps_api"]
			},
			options: optionsFor("focus", [
				"custom_nodes",
				"pipelines",
				"products"
			])
		},
		{
			id: "source",
			type: "single",
			labelKey: "cloudSurvey_steps_source",
			required: true,
			randomize: true,
			allowOther: true,
			otherFieldId: "sourceOther",
			options: optionsFor("source", [
				"social",
				"friend",
				"search",
				"community",
				"other"
			])
		},
		{
			id: "source_social",
			type: "single",
			labelKey: "cloudSurvey_steps_source_social",
			required: true,
			randomize: true,
			showWhen: {
				field: "source",
				equals: "social"
			},
			options: optionsFor("source_social", [
				"youtube",
				"reddit",
				"twitter",
				"instagram",
				"tiktok",
				"linkedin",
				"discord"
			])
		}
	]
};
//#endregion
//#region src/platform/cloud/onboarding/CloudSurveyView.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1 = { class: "dark-theme flex max-h-full w-full max-w-md flex-col px-4 sm:px-6" };
var _hoisted_2 = { class: "-mb-1 font-inter text-xl/8 font-semibold tracking-wide text-primary-comfy-canvas sm:text-2xl/8" };
//#endregion
//#region src/platform/cloud/onboarding/CloudSurveyView.vue
var CloudSurveyView_default = /* @__PURE__ */ defineComponent({
	__name: "CloudSurveyView",
	setup(__props) {
		const router = useRouter();
		const { t } = useI18n();
		const { flags } = useFeatureFlags();
		const onboardingSurveyEnabled = computed(() => flags.onboardingSurveyEnabled);
		const activeSurvey = computed(() => remoteConfig.value.onboarding_survey ?? defaultOnboardingSurvey);
		const isSubmitting = ref(false);
		onMounted(async () => {
			if (!onboardingSurveyEnabled.value) {
				await router.replace({ name: "cloud-user-check" });
				return;
			}
			try {
				if (await getSurveyCompletedStatus(useAuthStore().userId)) {
					await router.replace({ name: "cloud-user-check" });
					return;
				}
				if (!isSurveyReplayRequested(useAuthStore().userId)) useTelemetry()?.trackSurvey("opened");
			} catch (error) {
				console.error("Failed to check survey status:", error);
			}
		});
		const onSubmitSurvey = async (payload) => {
			if (!onboardingSurveyEnabled.value) {
				await router.replace({ name: "cloud-user-check" });
				return;
			}
			isSubmitting.value = true;
			const replayOwner = useAuthStore().userId;
			const replaying = isSurveyReplayRequested(replayOwner);
			if (replayOwner === void 0) {
				reportSurveySubmissionFailure(/* @__PURE__ */ new Error("No signed-in account while submitting the survey"));
				isSubmitting.value = false;
				return;
			}
			const result = await submitSurvey(payload, replayOwner);
			if (result.status === "cancelled") {
				isSubmitting.value = false;
				return;
			}
			if (result.status === "failed") {
				reportSurveySubmissionFailure(result.cause);
				isSubmitting.value = false;
				return;
			}
			if (result.status === "stored") useTelemetry()?.trackSurvey("submitted", payload);
			await advanceFromSurvey(replaying, replayOwner);
		};
		async function advanceFromSurvey(replaying, replayOwner) {
			try {
				const failure = await router.push({ name: "cloud-user-check" });
				if (isNavigationFailure(failure)) throw failure;
			} catch (error) {
				if (replaying && useAuthStore().userId === replayOwner) restoreSurveyReplayRequest(replayOwner);
				reportError(error, {
					surface: "platform",
					errorType: "error_navigating_from_onboarding_survey"
				});
				useToastStore().add({
					severity: "error",
					summary: t("cloudOnboarding.survey.navigationFailed"),
					detail: t("cloudOnboarding.survey.navigationFailedDetail"),
					life: 5e3
				});
			} finally {
				isSubmitting.value = false;
			}
		}
		function reportSurveySubmissionFailure(cause) {
			reportError(cause, {
				surface: "platform",
				errorType: "error_submitting_onboarding_survey"
			});
			useToastStore().add({
				severity: "error",
				summary: t("cloudOnboarding.survey.submitFailed"),
				detail: t("cloudOnboarding.survey.submitFailedDetail"),
				life: 5e3
			});
		}
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", _hoisted_1, [createBaseVNode("h1", _hoisted_2, toDisplayString(_ctx.$t("cloudOnboarding.survey.title")), 1), (openBlock(), createBlock(DynamicSurveyForm_default, {
				key: activeSurvey.value.version,
				survey: activeSurvey.value,
				"is-submitting": isSubmitting.value,
				onSubmit: onSubmitSurvey
			}, null, 8, ["survey", "is-submitting"]))]);
		};
	}
});
//#endregion
export { CloudSurveyView_default as default };
