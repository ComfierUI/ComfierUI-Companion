import "./rolldown-runtime-xtsTai4I.js";
import { F as createBaseVNode, G as defineComponent, Jt as normalizeClass, Kt as unref, O as Fragment, P as computed, R as createElementBlock, Zt as toDisplayString, lt as openBlock } from "./vendor-vue-core-C1utdb0s.js";
import { Tt as resolveNode, il as useWidgetValueStore, ll as widgetId } from "./layoutStore-CZsuzg91.js";
import { r as useI18n } from "./vendor-i18n-BZvE7WBQ.js";
import { t as cn } from "./src-DI1bBfrb.js";
import { a as useWidgetHeight } from "./widgetTypes-CisWqKm9.js";
import { t as WidgetInputBaseClass } from "./layout-BZWBHixI.js";
//#region src/renderer/extensions/vueNodes/widgets/components/WidgetResolutionPreview.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1 = ["data-widget-name"];
var _hoisted_2 = {
	class: "text-xs",
	"data-testid": "resolution-preview-value"
};
var _hoisted_3 = { class: "text-xs text-muted-foreground" };
var _hoisted_4 = {
	key: 1,
	class: "text-xs text-muted-foreground"
};
//#endregion
//#region src/renderer/extensions/vueNodes/widgets/components/WidgetResolutionPreview.vue
var WidgetResolutionPreview_default = /* @__PURE__ */ defineComponent({
	__name: "WidgetResolutionPreview",
	props: {
		widget: {},
		nodeId: {}
	},
	setup(__props) {
		const { t } = useI18n();
		const widgetValueStore = useWidgetValueStore();
		const hostNode = computed(() => __props.nodeId === void 0 ? void 0 : resolveNode(__props.nodeId));
		function siblingValue(name) {
			const node = hostNode.value;
			const graphId = node?.graph?.rootGraph.id;
			if (!node || !graphId) return void 0;
			return widgetValueStore.getWidget(widgetId(graphId, node.id, name))?.value;
		}
		function roundHalfToEven(value) {
			const floor = Math.floor(value);
			if (value - floor !== .5) return Math.round(value);
			return floor % 2 === 0 ? floor : floor + 1;
		}
		const resolution = computed(() => {
			const ratioRaw = siblingValue(__props.widget.options?.ratio_widget ?? "aspect_ratio");
			const mpRaw = siblingValue(__props.widget.options?.megapixels_widget ?? "megapixels");
			const multipleRaw = siblingValue(__props.widget.options?.multiple_widget ?? "multiple");
			const match = typeof ratioRaw === "string" ? /^(\d+(?:\.\d+)?)\s*:\s*(\d+(?:\.\d+)?)/.exec(ratioRaw) : null;
			const megapixels = typeof mpRaw === "number" ? mpRaw : NaN;
			const multiple = typeof multipleRaw === "number" && multipleRaw > 0 ? multipleRaw : null;
			if (!match || !Number.isFinite(megapixels) || megapixels <= 0 || multiple === null) return null;
			const wRatio = Number(match[1]);
			const hRatio = Number(match[2]);
			if (!(wRatio > 0) || !(hRatio > 0)) return null;
			const scale = Math.sqrt(megapixels * 1024 * 1024 / (wRatio * hRatio));
			const width = roundHalfToEven(wRatio * scale / multiple) * multiple;
			const height = roundHalfToEven(hRatio * scale / multiple) * multiple;
			if (!width || !height) return null;
			return {
				width,
				height,
				mpLabel: t("g.megapixelsValue", { count: (width * height / 1048576).toFixed(2) })
			};
		});
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", {
				class: normalizeClass(unref(cn)(unref(WidgetInputBaseClass), "flex w-full items-center justify-center gap-2 px-2", unref(useWidgetHeight)())),
				"data-widget-name": __props.widget.name
			}, [resolution.value ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [createBaseVNode("span", _hoisted_2, toDisplayString(resolution.value.width) + " × " + toDisplayString(resolution.value.height), 1), createBaseVNode("span", _hoisted_3, toDisplayString(resolution.value.mpLabel), 1)], 64)) : (openBlock(), createElementBlock("span", _hoisted_4, " — "))], 10, _hoisted_1);
		};
	}
});
//#endregion
export { WidgetResolutionPreview_default as default };
