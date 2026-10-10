import "./rolldown-runtime-xtsTai4I.js";
import { Dt as withDirectives, Et as withCtx, F as createBaseVNode, G as defineComponent, H as createTextVNode, I as createBlock, Lt as ref, P as computed, Zt as toDisplayString, lt as openBlock, mt as resolveDirective, ot as onMounted, st as onUnmounted } from "./vendor-vue-core-C1utdb0s.js";
import { m as useBreakpoints, o as breakpointsTailwind } from "./vendor-vueuse-BxKIIsKg.js";
import { On as useBillingContext, kt as useAppMode, z as getExecutionContext, zn as useWorkspaceUI } from "./layoutStore-CZsuzg91.js";
import { n as useTelemetry } from "./telemetry-IkzvF0TI.js";
import { r as useI18n } from "./vendor-i18n-BZvE7WBQ.js";
import { t as Button_default } from "./Button-j0oCzR82.js";
//#region src/platform/cloud/subscription/composables/useSubscribeCtaPresence.ts
var mountedPrompts = ref(0);
/**
* Registers a mounted Run-slot subscribe prompt for the caller's lifetime.
* The billing flag alone is not evidence a prompt is on screen — builder
* mode unmounts the actionbar, Linear mode needs outputs, and the wrapper
* withholds the prompt for sales-managed and payment-recovery states — so
* anything yielding to the prompt must key on real presence.
*/
function registerSubscribeToRunPrompt() {
	onMounted(() => {
		mountedPrompts.value += 1;
	});
	onUnmounted(() => {
		mountedPrompts.value = Math.max(0, mountedPrompts.value - 1);
	});
}
/** Whether any Run-slot subscribe prompt is currently on screen. */
function useSubscribeToRunPromptPresence() {
	return computed(() => mountedPrompts.value > 0);
}
//#endregion
//#region src/platform/telemetry/utils/getActionbarDockState.ts
function getActionbarDockState() {
	try {
		return localStorage.getItem("Comfy.MenuPosition.Docked") === "false" ? "floating" : "docked";
	} catch {
		return "docked";
	}
}
//#endregion
//#region src/platform/telemetry/utils/getAgentPanelOpen.ts
/**
* The last flushed state of the user's agent-panel preference.
*
* Reads the key `useAgentPanelStore` persists `isOpen` to rather than the store
* itself: this util is consumed from `platform/`, which the layer architecture
* forbids from importing `workbench/`. Same trade-off as
* `getActionbarDockState`, whose key is likewise duplicated from its writer.
*
* "Last flushed" rather than "open right now": the store persists through
* `useLocalStorage`, whose write lands on a watcher flush rather than
* synchronously on assignment, so a toggle in the same tick as a run is not yet
* visible here.
*
* `isOpen` is the user's stored preference, not the store's `isVisible` — the
* latter also folds in the feature gate and consent, which would make the flag
* incomparable across users. Two consequences worth knowing when reading this
* property: a user whose agent feature flag was turned off after they last had
* the panel open still reports `true`, because `suppressRestoredOpen()` only
* runs for callers that require `agentPanelStore.enabled`; and the key is
* shared across the origin, so the value is whichever preference was persisted
* last by any window, not the state of the window submitting the run.
*/
function getAgentPanelOpen() {
	try {
		return localStorage.getItem("Comfy.AgentPanel.open") === "true";
	} catch {
		return false;
	}
}
//#endregion
//#region src/composables/useRunButtonTelemetry.ts
function getRunButtonTelemetryProperties(options) {
	const executionContext = getExecutionContext();
	const { mode, isAppMode } = useAppMode();
	return {
		subscribe_to_run: options?.subscribe_to_run ?? false,
		workflow_type: executionContext.is_template ? "template" : "custom",
		workflow_name: executionContext.workflow_name ?? "untitled",
		custom_node_count: executionContext.custom_node_count,
		total_node_count: executionContext.total_node_count,
		subgraph_count: executionContext.subgraph_count,
		has_api_nodes: executionContext.has_api_nodes,
		api_node_names: executionContext.api_node_names,
		has_toolkit_nodes: executionContext.has_toolkit_nodes,
		toolkit_node_names: executionContext.toolkit_node_names,
		trigger_source: options?.trigger_source,
		view_mode: mode.value,
		is_app_mode: isAppMode.value,
		dock_state: getActionbarDockState(),
		agent_panel_open: getAgentPanelOpen()
	};
}
function useRunButtonTelemetry() {
	function trackRunButton(options) {
		const telemetry = useTelemetry();
		if (!telemetry) return;
		try {
			telemetry.trackRunButton(getRunButtonTelemetryProperties(options));
		} catch (error) {
			console.error("[Telemetry] Run button tracking failed", error);
		}
	}
	return { trackRunButton };
}
//#endregion
//#region src/platform/cloud/subscription/components/SubscribeToRun.vue
var SubscribeToRun_default = /* @__PURE__ */ defineComponent({
	__name: "SubscribeToRun",
	setup(__props) {
		const { t } = useI18n();
		registerSubscribeToRunPrompt();
		const isMdOrLarger = useBreakpoints(breakpointsTailwind).greaterOrEqual("md");
		const { permissions } = useWorkspaceUI();
		const { showSubscriptionDialog } = useBillingContext();
		const { trackRunButton } = useRunButtonTelemetry();
		const canResubscribe = computed(() => permissions.value.canManageSubscription);
		const buttonLabel = computed(() => {
			if (!canResubscribe.value) return t("subscription.inactive.runLabel");
			return isMdOrLarger.value ? t("subscription.subscribeToRunFull") : t("subscription.subscribeToRun");
		});
		const buttonTooltip = computed(() => canResubscribe.value ? t("subscription.subscribeToRunFull") : t("subscription.inactive.memberRunTooltip"));
		function handleSubscribeToRun() {
			showSubscriptionDialog({ reason: "subscribe_to_run" });
		}
		return (_ctx, _cache) => {
			const _directive_tooltip = resolveDirective("tooltip");
			return withDirectives((openBlock(), createBlock(Button_default, {
				class: "subscribe-to-run-button h-8 gap-1.5 rounded-lg px-4 whitespace-nowrap",
				variant: "subscribe",
				size: "unset",
				"data-testid": "subscribe-to-run-button",
				onClick: handleSubscribeToRun
			}, {
				default: withCtx(() => [_cache[0] || (_cache[0] = createBaseVNode("i", { class: "pi pi-lock" }, null, -1)), createTextVNode(" " + toDisplayString(buttonLabel.value), 1)]),
				_: 1
			})), [[
				_directive_tooltip,
				{
					value: buttonTooltip.value,
					showDelay: 600
				},
				void 0,
				{ bottom: true }
			]]);
		};
	}
});
//#endregion
export { useSubscribeToRunPromptPresence as i, useRunButtonTelemetry as n, getActionbarDockState as r, SubscribeToRun_default as t };
