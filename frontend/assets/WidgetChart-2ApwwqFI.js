import "./rolldown-runtime-xtsTai4I.js";
import { F as createBaseVNode, G as defineComponent, Ht as toRef, I as createBlock, Jt as normalizeClass, Kt as unref, P as computed, Q as mergeModels, R as createElementBlock, St as watch, Vt as toRaw, lt as openBlock, ot as onMounted, rt as onBeforeUnmount, xt as useTemplateRef, yt as useModel } from "./vendor-vue-core-C1utdb0s.js";
import { x as useEventListener } from "./vendor-vueuse-BxKIIsKg.js";
import { t as cn } from "./src-DI1bBfrb.js";
import { a as LineController, c as PointElement, d as plugin_legend, f as plugin_tooltip, i as Chart, l as index, n as BarElement, o as LineElement, r as CategoryScale, s as LinearScale, t as BarController, u as plugin_colors } from "./vendor-chart-Wj6K1UjP.js";
//#region src/components/ui/chart/useChart.ts
Chart.register(BarController, BarElement, CategoryScale, plugin_colors, index, plugin_legend, LinearScale, LineController, LineElement, PointElement, plugin_tooltip);
function getCssVar(name) {
	return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}
function getDefaultOptions(type) {
	const uiFont = window.__comfierThemeStudio?.getAssignedColor("uiText");
	const foreground = uiFont || getCssVar("--color-base-foreground") || "#ffffff";
	const muted = getCssVar("--color-muted-foreground") || "#8a8a8a";
	return {
		responsive: true,
		maintainAspectRatio: false,
		interaction: {
			mode: "index",
			intersect: false
		},
		plugins: {
			legend: {
				align: "start",
				labels: {
					color: foreground,
					usePointStyle: true,
					pointStyle: "circle",
					boxWidth: 8,
					boxHeight: 8,
					padding: 16,
					font: {
						family: "Inter",
						size: 11
					},
					generateLabels(chart) {
						return chart.data.datasets.map((dataset, i) => {
							const color = dataset.borderColor ?? dataset.backgroundColor ?? "#888";
							return {
								text: dataset.label ?? "",
								fontColor: foreground,
								fillStyle: color,
								strokeStyle: color,
								lineWidth: 0,
								pointStyle: "circle",
								hidden: !chart.isDatasetVisible(i),
								datasetIndex: i
							};
						});
					}
				}
			},
			tooltip: {
				enabled: true,
				...uiFont && {
					titleColor: uiFont,
					bodyColor: uiFont,
					footerColor: uiFont
				}
			}
		},
		elements: { point: {
			radius: 0,
			hoverRadius: 4
		} },
		scales: {
			x: {
				ticks: {
					color: uiFont || muted,
					font: {
						family: "Inter",
						size: 11
					},
					padding: 8
				},
				grid: {
					display: true,
					color: muted + "33",
					drawTicks: false
				},
				border: {
					display: true,
					color: muted
				}
			},
			y: {
				ticks: {
					color: uiFont || muted,
					font: {
						family: "Inter",
						size: 11
					},
					padding: 4
				},
				grid: {
					display: false,
					drawTicks: false
				},
				border: {
					display: true,
					color: muted
				}
			}
		},
		...type === "bar" && { datasets: { bar: {
			borderRadius: {
				topLeft: 4,
				topRight: 4
			},
			borderSkipped: false,
			barPercentage: .6,
			categoryPercentage: .8
		} } }
	};
}
function useChart(canvasRef, type, data) {
	let chart;
	useEventListener(window, "comfier-ui-font-change", () => {
		if (!chart) return;
		chart.options = getDefaultOptions(type.value);
		chart.update("none");
	});
	function copyData() {
		const { datasets, labels, ...rest } = toRaw(data.value);
		return {
			...rest,
			labels: labels && [...labels],
			datasets: datasets.map((dataset) => ({
				...dataset,
				data: Array.isArray(dataset.data) ? [...dataset.data] : dataset.data
			}))
		};
	}
	function createChart() {
		if (!canvasRef.value) return;
		chart?.destroy();
		chart = new Chart(canvasRef.value, {
			type: type.value,
			data: copyData(),
			options: getDefaultOptions(type.value)
		});
	}
	onMounted(createChart);
	watch(type, createChart);
	watch(data, () => {
		if (!chart) return;
		const next = copyData();
		const previousCount = chart.data.datasets.length;
		for (const [index, dataset] of next.datasets.entries()) {
			if (index >= previousCount) break;
			const { hidden } = chart.getDatasetMeta(index);
			if (typeof hidden === "boolean") dataset.hidden = hidden;
		}
		chart.data = next;
		chart.update();
	}, { deep: true });
	onBeforeUnmount(() => {
		chart?.destroy();
		chart = void 0;
	});
}
//#endregion
//#region src/components/ui/chart/Chart.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1 = { class: "relative" };
var _hoisted_2 = ["aria-label"];
//#endregion
//#region src/components/ui/chart/Chart.vue
var Chart_default = /* @__PURE__ */ defineComponent({
	__name: "Chart",
	props: {
		data: {},
		label: {},
		type: {},
		class: { type: [
			Boolean,
			null,
			String,
			Object,
			Array
		] }
	},
	setup(__props) {
		const canvasRef = useTemplateRef("canvasRef");
		useChart(canvasRef, toRef(() => __props.type), toRef(() => __props.data));
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", { class: normalizeClass(unref(cn)("rounded-lg bg-secondary-background p-6", __props.class)) }, [createBaseVNode("div", _hoisted_1, [createBaseVNode("canvas", {
				ref_key: "canvasRef",
				ref: canvasRef,
				"aria-label": __props.label,
				role: "img"
			}, null, 8, _hoisted_2)])], 2);
		};
	}
});
//#endregion
//#region src/renderer/extensions/vueNodes/widgets/components/WidgetChart.vue
var WidgetChart_default = /* @__PURE__ */ defineComponent({
	__name: "WidgetChart",
	props: /*@__PURE__*/ mergeModels({ widget: {} }, {
		"modelValue": { required: true },
		"modelModifiers": {}
	}),
	emits: ["update:modelValue"],
	setup(__props) {
		const value = useModel(__props, "modelValue");
		const chartType = computed(() => __props.widget.options?.type ?? "line");
		const chartData = computed(() => ({
			...value.value,
			labels: value.value?.labels ?? [],
			datasets: value.value?.datasets ?? []
		}));
		return (_ctx, _cache) => {
			return openBlock(), createBlock(Chart_default, {
				class: "max-h-192",
				type: chartType.value,
				data: chartData.value,
				label: `${__props.widget.name || _ctx.$t("g.chart")} - ${chartType.value} ${_ctx.$t("g.chartLowercase")}`
			}, null, 8, [
				"type",
				"data",
				"label"
			]);
		};
	}
});
//#endregion
export { WidgetChart_default as default };
