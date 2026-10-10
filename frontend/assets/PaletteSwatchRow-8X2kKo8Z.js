import "./rolldown-runtime-xtsTai4I.js";
import { E as withModifiers, Et as withCtx, F as createBaseVNode, G as defineComponent, I as createBlock, Kt as unref, L as createCommentVNode, Lt as ref, O as Fragment, Q as mergeModels, R as createElementBlock, Xt as normalizeStyle, dt as renderList, lt as openBlock, xt as useTemplateRef, yt as useModel } from "./vendor-vue-core-C1utdb0s.js";
import { x as useEventListener } from "./vendor-vueuse-BxKIIsKg.js";
import { r as useI18n } from "./vendor-i18n-BZvE7WBQ.js";
import { t as ColorPicker_default } from "./ColorPicker-D34wwQO7.js";
//#region src/composables/palette/usePaletteSwatchRow.ts
function usePaletteSwatchRow({ modelValue, container }) {
	function updateAt(i, value) {
		if (modelValue.value[i] === value) return;
		const next = modelValue.value.slice();
		next[i] = value;
		modelValue.value = next;
	}
	function remove(i) {
		const next = modelValue.value.slice();
		next.splice(i, 1);
		modelValue.value = next;
	}
	function addColor() {
		modelValue.value = [...modelValue.value, "#ffffff"];
	}
	const drag = ref(null);
	function onPointerDown(i, e) {
		if (e.button !== 0) return;
		drag.value = {
			index: i,
			startX: e.clientX,
			startY: e.clientY,
			active: false
		};
	}
	useEventListener(document, "pointermove", (e) => {
		const d = drag.value;
		if (!d) return;
		if ((e.buttons & 1) === 0) {
			drag.value = null;
			return;
		}
		if (!d.active) {
			if (Math.abs(e.clientX - d.startX) + Math.abs(e.clientY - d.startY) < 4) return;
			d.active = true;
		}
		const rows = container.value?.querySelectorAll("[data-index]");
		if (!rows) return;
		for (const other of rows) {
			if (parseInt(other.dataset.index || "-1", 10) === d.index) continue;
			const r = other.getBoundingClientRect();
			if (e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top - 6 && e.clientY <= r.bottom + 6) {
				const oi = parseInt(other.dataset.index || "-1", 10);
				if (oi < 0) continue;
				const next = modelValue.value.slice();
				const [moved] = next.splice(d.index, 1);
				const insertAt = e.clientX > r.left + r.width / 2 ? oi + 1 : oi;
				next.splice(insertAt > d.index ? insertAt - 1 : insertAt, 0, moved);
				modelValue.value = next;
				drag.value = null;
				return;
			}
		}
	});
	useEventListener(document, "pointerup", () => {
		drag.value = null;
	});
	useEventListener(document, "pointercancel", () => {
		drag.value = null;
	});
	return {
		updateAt,
		remove,
		addColor,
		onPointerDown
	};
}
//#endregion
//#region src/components/palette/PaletteSwatchRow.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1 = [
	"data-index",
	"data-hex",
	"title",
	"onContextmenu",
	"onPointerdown"
];
var _hoisted_2 = ["title"];
//#endregion
//#region src/components/palette/PaletteSwatchRow.vue
var PaletteSwatchRow_default = /* @__PURE__ */ defineComponent({
	__name: "PaletteSwatchRow",
	props: /*@__PURE__*/ mergeModels({ max: { default: 5 } }, {
		"modelValue": { required: true },
		"modelModifiers": {}
	}),
	emits: ["update:modelValue"],
	setup(__props) {
		const modelValue = useModel(__props, "modelValue");
		const { t } = useI18n();
		const container = useTemplateRef("container");
		const { updateAt, remove, addColor, onPointerDown } = usePaletteSwatchRow({
			modelValue,
			container
		});
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", {
				ref_key: "container",
				ref: container,
				class: "flex flex-wrap items-center gap-1"
			}, [(openBlock(true), createElementBlock(Fragment, null, renderList(modelValue.value, (hex, i) => {
				return openBlock(), createBlock(ColorPicker_default, {
					key: i,
					"model-value": hex,
					alpha: false,
					"onUpdate:modelValue": (value) => unref(updateAt)(i, value)
				}, {
					trigger: withCtx(() => [createBaseVNode("button", {
						type: "button",
						"data-index": i,
						"data-hex": hex,
						class: "relative size-5 cursor-pointer rounded-sm border border-component-node-border p-0",
						style: normalizeStyle({ background: hex }),
						title: unref(t)("palette.swatchTitle"),
						onContextmenu: withModifiers(($event) => unref(remove)(i), ["prevent", "stop"]),
						onPointerdown: ($event) => unref(onPointerDown)(i, $event)
					}, null, 44, _hoisted_1)]),
					_: 2
				}, 1032, ["model-value", "onUpdate:modelValue"]);
			}), 128)), modelValue.value.length < __props.max ? (openBlock(), createElementBlock("button", {
				key: 0,
				type: "button",
				class: "h-5 rounded-sm border border-component-node-border bg-component-node-widget-background px-2 text-xs leading-none",
				title: unref(t)("palette.addColor"),
				onClick: _cache[0] || (_cache[0] = (...args) => unref(addColor) && unref(addColor)(...args))
			}, " + ", 8, _hoisted_2)) : createCommentVNode("", true)], 512);
		};
	}
});
//#endregion
export { PaletteSwatchRow_default as t };
