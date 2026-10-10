import "./rolldown-runtime-xtsTai4I.js";
import { Dt as withDirectives, Et as withCtx, F as createBaseVNode, G as defineComponent, H as createTextVNode, I as createBlock, Kt as unref, R as createElementBlock, St as watch, Zt as toDisplayString, et as nextTick, lt as openBlock, mt as resolveDirective, xt as useTemplateRef } from "./vendor-vue-core-C1utdb0s.js";
import { Y as usePartnerNodesRunGate, nt as useDialogService } from "./layoutStore-CZsuzg91.js";
import { r as useI18n } from "./vendor-i18n-BZvE7WBQ.js";
import { t as Button_default } from "./Button-j0oCzR82.js";
import { t as ComfyQueueButton_default } from "./ComfyQueueButton-D9P1_hG_.js";
//#endregion
//#region src/components/actionbar/ComfyRunButton/LocalRunButtonWrapper.vue
var LocalRunButtonWrapper_default = /* @__PURE__ */ defineComponent({
	__name: "LocalRunButtonWrapper",
	setup(__props) {
		const { t } = useI18n();
		const { gate, partnerNodes } = usePartnerNodesRunGate();
		const dialogService = useDialogService();
		const root = useTemplateRef("root");
		watch(gate, async () => {
			if (!root.value?.contains(document.activeElement)) return;
			await nextTick();
			root.value?.querySelector("button")?.focus();
		});
		function openPartnerSignInDialog() {
			dialogService.showApiNodesSignInDialog(partnerNodes.value.map((node) => node.displayName));
		}
		return (_ctx, _cache) => {
			const _directive_tooltip = resolveDirective("tooltip");
			return openBlock(), createElementBlock("div", {
				ref_key: "root",
				ref: root,
				class: "contents"
			}, [unref(gate) === "none" ? (openBlock(), createBlock(ComfyQueueButton_default, { key: 0 })) : withDirectives((openBlock(), createBlock(Button_default, {
				key: 1,
				variant: "secondary",
				size: "unset",
				class: "h-8 gap-1.5 rounded-lg px-4 whitespace-nowrap",
				"data-testid": "partner-sign-in-to-run-button",
				"aria-describedby": "partner-run-gate-caption",
				onClick: openPartnerSignInDialog
			}, {
				default: withCtx(() => [_cache[0] || (_cache[0] = createBaseVNode("i", {
					class: "icon-[lucide--log-in] size-4",
					"aria-hidden": "true"
				}, null, -1)), createTextVNode(" " + toDisplayString(unref(t)("actionbar.partnerRunGate.signInToRun")), 1)]),
				_: 1
			})), [[
				_directive_tooltip,
				{
					value: unref(t)("actionbar.partnerRunGate.signInCaption"),
					showDelay: 600
				},
				void 0,
				{ bottom: true }
			]])], 512);
		};
	}
});
//#endregion
export { LocalRunButtonWrapper_default as default };
