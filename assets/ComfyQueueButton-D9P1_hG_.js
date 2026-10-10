import "./rolldown-runtime-xtsTai4I.js";
import { C as vModelText, Dt as withDirectives, E as withModifiers, Et as withCtx, F as createBaseVNode, G as defineComponent, I as createBlock, Jt as normalizeClass, Kt as unref, Lt as ref, O as Fragment, P as computed, R as createElementBlock, St as watch, T as withKeys, U as createVNode, lt as openBlock, mt as resolveDirective, p as storeToRefs } from "./vendor-vue-core-C1utdb0s.js";
import { Fi as MenuRadioGroup_default, Ht as useWorkspaceStore, Ni as Menu_default, Rt as useExecutionErrorStore, Zr as useCommandStore, ao as isInstantRunningMode, i as useSettingStore, io as isInstantMode, oo as useQueueSettingsStore } from "./layoutStore-CZsuzg91.js";
import { n as useTelemetry } from "./telemetry-IkzvF0TI.js";
import { r as useI18n } from "./vendor-i18n-BZvE7WBQ.js";
import { t as cn } from "./src-DI1bBfrb.js";
import { t as Button_default } from "./Button-j0oCzR82.js";
import { n as TinyChevronIcon_default, r as vLayoutControl, t as ButtonGroup_default } from "./ButtonGroup-3C49arG4.js";
//#region src/components/actionbar/BatchCountEdit.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1$1 = ["aria-label"];
var _hoisted_2 = ["aria-label", "onKeydown"];
var minQueueCount = 1;
var inputClass = "h-full w-full min-w-0 border-none bg-transparent pl-1 pr-0 text-center text-sm font-normal tabular-nums text-base-foreground outline-none";
//#endregion
//#region src/components/actionbar/BatchCountEdit.vue
var BatchCountEdit_default = /* @__PURE__ */ defineComponent({
	__name: "BatchCountEdit",
	setup(__props) {
		const { t } = useI18n();
		const queueSettingsStore = useQueueSettingsStore();
		const { batchCount } = storeToRefs(queueSettingsStore);
		const settingStore = useSettingStore();
		const maxQueueCount = computed(() => settingStore.get("Comfy.QueueButton.BatchCountLimit"));
		const batchCountInputRef = ref(null);
		const batchCountInput = ref(String(batchCount.value));
		const isEditing = ref(false);
		const isIncrementDisabled = computed(() => batchCount.value >= maxQueueCount.value);
		const isDecrementDisabled = computed(() => batchCount.value <= minQueueCount);
		watch(batchCount, (nextBatchCount) => {
			if (!isEditing.value) batchCountInput.value = String(nextBatchCount);
		});
		const clampBatchCount = (nextBatchCount) => Math.min(Math.max(nextBatchCount, minQueueCount), maxQueueCount.value);
		const setBatchCount = (nextBatchCount) => {
			batchCount.value = clampBatchCount(nextBatchCount);
			batchCountInput.value = String(batchCount.value);
		};
		const incrementBatchCount = () => {
			setBatchCount(batchCount.value + 1);
		};
		const decrementBatchCount = () => {
			setBatchCount(batchCount.value - 1);
		};
		const onInputFocus = () => {
			isEditing.value = true;
		};
		const onInput = (event) => {
			const input = event.target;
			batchCountInput.value = input.value.replace(/[^0-9]/g, "");
		};
		const onInputBlur = () => {
			isEditing.value = false;
			const parsedInput = Number.parseInt(batchCountInput.value, 10);
			setBatchCount(Number.isNaN(parsedInput) ? minQueueCount : parsedInput);
		};
		const onInputEnter = () => {
			batchCountInputRef.value?.blur();
		};
		return (_ctx, _cache) => {
			const _directive_tooltip = resolveDirective("tooltip");
			return openBlock(), createElementBlock(Fragment, null, [
				withDirectives((openBlock(), createElementBlock("div", {
					class: "batch-count h-10 w-10 overflow-hidden rounded-lg",
					style: { backgroundColor: "var(--comfier-button-bg,var(--color-secondary-background))" },
					"aria-label": unref(t)("menu.batchCount")
				}, [withDirectives(createBaseVNode("input", {
					ref_key: "batchCountInputRef",
					ref: batchCountInputRef,
					"onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => batchCountInput.value = $event),
					type: "text",
					inputmode: "numeric",
					"aria-label": unref(t)("menu.batchCount"),
					class: normalizeClass(inputClass),
					onFocus: onInputFocus,
					onInput,
					onBlur: onInputBlur,
					onKeydown: withKeys(withModifiers(onInputEnter, ["prevent"]), ["enter"])
				}, null, 40, _hoisted_2), [[vModelText, batchCountInput.value]])], 8, _hoisted_1$1)), [[unref(vLayoutControl), "run:Batch_Count"], [
					_directive_tooltip,
					{
						value: unref(t)("menu.batchCount"),
						showDelay: 600
					},
					void 0,
					{ bottom: true }
				]]),
				withDirectives((openBlock(), createBlock(Button_default, {
					variant: "secondary",
					size: "unset",
					"aria-label": unref(t)("g.increment"),
					class: "h-10 w-10 rounded-lg",
					disabled: isIncrementDisabled.value,
					onClick: incrementBatchCount
				}, {
					default: withCtx(() => [createVNode(TinyChevronIcon_default, { "rotate-up": "" })]),
					_: 1
				}, 8, ["aria-label", "disabled"])), [[unref(vLayoutControl), "run:Increment"]]),
				withDirectives((openBlock(), createBlock(Button_default, {
					variant: "secondary",
					size: "unset",
					"aria-label": unref(t)("g.decrement"),
					class: "h-10 w-10 rounded-lg",
					disabled: isDecrementDisabled.value,
					onClick: decrementBatchCount
				}, {
					default: withCtx(() => [createVNode(TinyChevronIcon_default)]),
					_: 1
				}, 8, ["aria-label", "disabled"])), [[unref(vLayoutControl), "run:Decrement"]])
			], 64);
		};
	}
});
//#endregion
//#region src/components/actionbar/ComfyRunButton/ComfyQueueButton.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1 = ["aria-label", "data-run-state"];
var queueMenuTriggerClass = "h-10 w-6 rounded-l-none rounded-r-lg border-0 border-l border-solid border-current/25 p-0";
//#endregion
//#region src/components/actionbar/ComfyRunButton/ComfyQueueButton.vue
var ComfyQueueButton_default = /* @__PURE__ */ defineComponent({
	__name: "ComfyQueueButton",
	props: { paymentRecoveryLock: { default: null } },
	emits: ["paymentRecoveryClick"],
	setup(__props, { emit: __emit }) {
		const workspaceStore = useWorkspaceStore();
		const { mode: queueMode, batchCount } = storeToRefs(useQueueSettingsStore());
		const { hasMissingError } = storeToRefs(useExecutionErrorStore());
		const { t } = useI18n();
		const emit = __emit;
		watch(() => __props.paymentRecoveryLock, (lock) => {
			if (lock) queueMode.value = "disabled";
		}, { immediate: true });
		const selectedQueueMode = computed(() => isInstantMode(queueMode.value) ? "instant-idle" : queueMode.value);
		const queueModeMenuItemLookup = computed(() => {
			const items = {
				disabled: {
					value: "disabled",
					label: t("menu.run"),
					tooltip: t("menu.disabledTooltip"),
					command: () => {
						queueMode.value = "disabled";
					}
				},
				change: {
					value: "change",
					label: `${t("menu.run")} (${t("menu.onChange")})`,
					tooltip: t("menu.onChangeTooltip"),
					command: () => {
						useTelemetry()?.trackUiButtonClicked({
							button_id: "queue_mode_option_run_on_change_selected",
							element_group: "queue"
						});
						queueMode.value = "change";
					}
				}
			};
			items["instant-idle"] = {
				value: "instant-idle",
				label: `${t("menu.run")} (${t("menu.instant")})`,
				tooltip: t("menu.instantTooltip"),
				command: () => {
					useTelemetry()?.trackUiButtonClicked({
						button_id: "queue_mode_option_run_instant_selected",
						element_group: "queue"
					});
					queueMode.value = "instant-idle";
				}
			};
			return items;
		});
		const activeQueueModeMenuItem = computed(() => {
			return queueModeMenuItemLookup.value[selectedQueueMode.value] || queueModeMenuItemLookup.value.disabled;
		});
		const queueModeMenuItems = computed(() => Object.values(queueModeMenuItemLookup.value));
		const isStopInstantAction = computed(() => isInstantRunningMode(queueMode.value));
		const queueButtonLabel = computed(() => __props.paymentRecoveryLock === "owner" ? t("subscription.paymentRecovery.ownerRunLabel") : __props.paymentRecoveryLock === "member" ? t("subscription.paymentRecovery.memberRunLabel") : isStopInstantAction.value ? t("menu.stopRunInstant") : String(activeQueueModeMenuItem.value?.label ?? ""));
		const queueButtonVariant = computed(() => __props.paymentRecoveryLock === "owner" ? "subscribe" : __props.paymentRecoveryLock === "member" ? "secondary" : isStopInstantAction.value ? "destructive" : "inverted");
		const queueMenuTriggerVariant = computed(() => queueButtonVariant.value === "subscribe" ? "secondary" : queueButtonVariant.value);
		const queueMenuTriggerVariantClass = {
			destructive: "border-black/20 data-[state=open]:bg-destructive-background-hover",
			inverted: "data-[state=open]:bg-base-foreground/80",
			secondary: "text-muted-foreground"
		};
		const iconClass = computed(() => {
			if (__props.paymentRecoveryLock) return "icon-[lucide--lock]";
			if (isStopInstantAction.value) return "icon-[lucide--square]";
			if (hasMissingError.value) return "icon-[lucide--triangle-alert]";
			if (workspaceStore.shiftDown) return "icon-[lucide--list-start]";
			if (queueMode.value === "disabled") return "icon-[lucide--play]";
			if (isInstantMode(queueMode.value)) return "icon-[lucide--fast-forward]";
			if (queueMode.value === "change") return "icon-[lucide--step-forward]";
			return "icon-[lucide--play]";
		});
		const queueButtonTooltip = computed(() => {
			if (__props.paymentRecoveryLock === "owner") return t("subscription.paymentRecovery.ownerRunTooltip");
			if (__props.paymentRecoveryLock === "member") return t("subscription.paymentRecovery.memberRunTooltip");
			if (isStopInstantAction.value) return t("menu.stopRunInstantTooltip");
			if (hasMissingError.value) return t("menu.runWorkflowMissingResources");
			if (workspaceStore.shiftDown) return t("menu.runWorkflowFront");
			return t("menu.runWorkflow");
		});
		const commandStore = useCommandStore();
		const queuePrompt = async (e) => {
			if (__props.paymentRecoveryLock) {
				emit("paymentRecoveryClick");
				return;
			}
			if (isStopInstantAction.value) {
				queueMode.value = "instant-idle";
				return;
			}
			const commandId = "shiftKey" in e && e.shiftKey ? "Comfy.QueuePromptFront" : "Comfy.QueuePrompt";
			if (isInstantMode(queueMode.value)) queueMode.value = "instant-running";
			if (batchCount.value > 1) useTelemetry()?.trackUiButtonClicked({
				button_id: "queue_run_multiple_batches_submitted",
				element_group: "queue"
			});
			await commandStore.execute(commandId, { metadata: {
				subscribe_to_run: false,
				trigger_source: "button"
			} });
		};
		return (_ctx, _cache) => {
			const _directive_tooltip = resolveDirective("tooltip");
			return openBlock(), createBlock(ButtonGroup_default, { class: "contents" }, {
				default: withCtx(() => [
					createVNode(BatchCountEdit_default),
					withDirectives((openBlock(), createBlock(Button_default, {
						variant: queueButtonVariant.value,
						size: "unset",
						class: normalizeClass(unref(cn)("comfier-owned-run h-10 gap-1.5 rounded-[7px] px-0", "font-bold")),
						"data-testid": "queue-button",
						onClick: queuePrompt
					}, {
						default: withCtx(() => [createBaseVNode("span", {
							class: "comfier-custom-run-icon",
							"aria-label": queueButtonLabel.value,
							"data-run-state": iconClass.value,
							"data-testid": "queue-button-icon"
						}, null, 8, _hoisted_1)]),
						_: 1
					}, 8, ["variant", "class"])), [[
						_directive_tooltip,
						{
							value: queueButtonTooltip.value,
							showDelay: 600
						},
						void 0,
						{ bottom: true }
					], [unref(vLayoutControl), "run:queue-button"]]),
					createVNode(Menu_default, {
						side: "bottom",
						"side-offset": 4,
						class: "min-w-44"
					}, {
						trigger: withCtx(() => [withDirectives((openBlock(), createBlock(Button_default, {
							variant: queueMenuTriggerVariant.value,
							size: "unset",
							disabled: Boolean(__props.paymentRecoveryLock),
							class: normalizeClass(unref(cn)(queueMenuTriggerClass, queueMenuTriggerVariantClass[queueMenuTriggerVariant.value])),
							"aria-label": unref(t)("menu.runOptions"),
							"data-testid": "queue-mode-menu-trigger"
						}, {
							default: withCtx(() => [createVNode(TinyChevronIcon_default)]),
							_: 1
						}, 8, [
							"variant",
							"disabled",
							"class",
							"aria-label"
						])), [[unref(vLayoutControl), "run:queue-mode-menu-trigger"]])]),
						default: withCtx(() => [createVNode(MenuRadioGroup_default, {
							"model-value": selectedQueueMode.value,
							options: queueModeMenuItems.value,
							onSelect: _cache[0] || (_cache[0] = withModifiers(() => {}, ["prevent"]))
						}, null, 8, ["model-value", "options"])]),
						_: 1
					})
				]),
				_: 1
			});
		};
	}
});
//#endregion
export { ComfyQueueButton_default as t };
