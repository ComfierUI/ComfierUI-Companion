import "./rolldown-runtime-xtsTai4I.js";
import { $ as mergeProps, Et as withCtx, G as defineComponent, I as createBlock, Jt as normalizeClass, Kt as unref, Yt as normalizeProps, ft as renderSlot, lt as openBlock, q as guardReactiveProps, z as createPropsRestProxy } from "./vendor-vue-core-C1utdb0s.js";
import { $ as NumberFieldInput_default$1, nt as NumberFieldRoot_default, yn as useForwardProps } from "./vendor-reka-ui-tdehH9A1.js";
import { t as cn } from "./src-DI1bBfrb.js";
//#region src/lib/litegraph/src/utils/mathParser.ts
function tokenize(input) {
	const tokens = [];
	const re = /(\d+(?:\.\d*)?|\.\d+)|([+\-*/%()])/g;
	let lastIndex = 0;
	for (const match of input.matchAll(re)) {
		if (input.slice(lastIndex, match.index).trim()) return void 0;
		lastIndex = match.index + match[0].length;
		if (match[1]) tokens.push({
			type: "number",
			value: parseFloat(match[1])
		});
		else tokens.push({
			type: "op",
			value: match[2]
		});
	}
	if (input.slice(lastIndex).trim()) return void 0;
	return tokens;
}
/**
* Evaluates a basic arithmetic expression string containing
* `+`, `-`, `*`, `/`, `%`, parentheses, and decimal numbers.
* Returns `undefined` for empty or malformed input.
*/
function evaluateMathExpression(input) {
	const tokenized = tokenize(input);
	if (!tokenized || tokenized.length === 0) return void 0;
	const tokens = tokenized;
	let pos = 0;
	let depth = 0;
	const MAX_DEPTH = 200;
	function peek() {
		return tokens[pos];
	}
	function consume() {
		return tokens[pos++];
	}
	function primary() {
		const t = peek();
		if (!t) return void 0;
		if (t.type === "number") {
			consume();
			return t.value;
		}
		if (t.value === "(") {
			if (++depth > MAX_DEPTH) return void 0;
			consume();
			const result = expr();
			if (result === void 0) return void 0;
			const closing = peek();
			if (!closing || closing.type !== "op" || closing.value !== ")") return;
			consume();
			depth--;
			return result;
		}
	}
	function unary() {
		const t = peek();
		if (t?.type === "op" && (t.value === "+" || t.value === "-")) {
			consume();
			const operand = unary();
			if (operand === void 0) return void 0;
			return t.value === "-" ? -operand : operand;
		}
		return primary();
	}
	function factor() {
		let left = unary();
		if (left === void 0) return void 0;
		while (peek()?.type === "op" && (peek().value === "*" || peek().value === "/" || peek().value === "%")) {
			const op = consume().value;
			const right = unary();
			if (right === void 0) return void 0;
			left = op === "*" ? left * right : op === "/" ? left / right : left % right;
		}
		return left;
	}
	function expr() {
		let left = factor();
		if (left === void 0) return void 0;
		while (peek()?.type === "op" && (peek().value === "+" || peek().value === "-")) {
			const op = consume().value;
			const right = factor();
			if (right === void 0) return void 0;
			left = op === "+" ? left + right : left - right;
		}
		return left;
	}
	const result = expr();
	if (result === void 0 || pos !== tokens.length) return void 0;
	return result === 0 ? 0 : result;
}
//#endregion
//#region src/lib/litegraph/src/utils/widget.ts
/**
* The step value for numeric widgets.
* Use {@link IWidgetOptions.step2} if available, otherwise fallback to
* {@link IWidgetOptions.step} which is scaled up by 10x in the legacy frontend logic.
*/
function getWidgetStep(options) {
	return options.step2 || (options.step || 10) * .1;
}
/**
* Coerces a numeric widget value for legacy canvas rendering.
*
* Persisted workflows and extension-provided widgets can contain values that do
* not match the current numeric widget type. Keep coercion at this runtime
* boundary so an invalid value cannot throw and stop the canvas render loop.
*/
function coerceNumericWidgetValue(value) {
	try {
		return Number(value);
	} catch {
		return NaN;
	}
}
function formatNumericWidgetValue(value, precision = 3) {
	return coerceNumericWidgetValue(value).toFixed(precision);
}
function evaluateInput(input) {
	const result = evaluateMathExpression(input);
	if (result !== void 0) {
		if (!isFinite(result)) return void 0;
		return result;
	}
	const newValue = Number(input);
	if (!isFinite(newValue)) return void 0;
	return newValue;
}
function findComboValueIndex(values, currentValue) {
	const exactIndex = values.indexOf(currentValue);
	return exactIndex === -1 ? values.findIndex((value) => String(value) === String(currentValue)) : exactIndex;
}
function getWidgetIds(widgets) {
	return widgets.map((widget) => widget.widgetId).filter((id) => id !== void 0);
}
function isDOMBackedWidget(widget) {
	if ("isDOMWidget" in widget && typeof widget.isDOMWidget === "boolean") return widget.isDOMWidget;
	return "element" in widget && !!widget.element || "component" in widget && !!widget.component;
}
function deriveWidgetRenderState(widget) {
	return {
		hasLayoutSize: typeof widget.computeLayoutSize === "function",
		isDOMWidget: isDOMBackedWidget(widget),
		tooltip: widget.tooltip
	};
}
function resolveNodeRootGraphId(node, fallbackGraphId) {
	return node.graph?.rootGraph.id ?? fallbackGraphId;
}
//#endregion
//#region src/components/ui/number-field/NumberField.vue
var NumberField_default = /* @__PURE__ */ defineComponent({
	__name: "NumberField",
	props: {
		defaultValue: {},
		modelValue: {},
		min: {},
		max: {},
		step: {},
		stepSnapping: {
			type: Boolean,
			default: false
		},
		formatOptions: {},
		locale: {},
		disabled: { type: Boolean },
		readonly: { type: Boolean },
		disableWheelChange: {
			type: Boolean,
			default: true
		},
		invertWheelChange: { type: Boolean },
		id: {},
		asChild: { type: Boolean },
		as: {},
		name: {},
		required: { type: Boolean },
		class: { type: [
			Boolean,
			null,
			String,
			Object,
			Array
		] }
	},
	emits: ["update:modelValue"],
	setup(__props, { emit: __emit }) {
		const restProps = createPropsRestProxy(__props, [
			"class",
			"stepSnapping",
			"disableWheelChange"
		]);
		const emits = __emit;
		const forwarded = useForwardProps(restProps);
		function updateModelValue(value) {
			if (value === void 0 || value === restProps.modelValue) return;
			emits("update:modelValue", value);
		}
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(NumberFieldRoot_default), mergeProps(unref(forwarded), {
				"data-slot": "number-field",
				"step-snapping": __props.stepSnapping,
				"disable-wheel-change": __props.disableWheelChange,
				class: unref(cn)("flex h-10 w-full items-center rounded-lg bg-secondary-background text-base-foreground focus-within:ring-1 focus-within:ring-border-default hover:bg-secondary-background-hover data-disabled:pointer-events-none data-disabled:opacity-50", __props.class),
				"onUpdate:modelValue": updateModelValue
			}), {
				default: withCtx((slotProps) => [renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(slotProps)))]),
				_: 3
			}, 16, [
				"step-snapping",
				"disable-wheel-change",
				"class"
			]);
		};
	}
});
//#endregion
//#region src/components/ui/number-field/NumberFieldInput.vue
var NumberFieldInput_default = /* @__PURE__ */ defineComponent({
	__name: "NumberFieldInput",
	props: { class: { type: [
		Boolean,
		null,
		String,
		Object,
		Array
	] } },
	setup(__props) {
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(NumberFieldInput_default$1), {
				"data-slot": "number-field-input",
				class: normalizeClass(unref(cn)("min-w-0 flex-1 border-none bg-transparent text-center text-base text-base-foreground focus-visible:outline-none", __props.class))
			}, null, 8, ["class"]);
		};
	}
});
//#endregion
export { evaluateInput as a, getWidgetIds as c, deriveWidgetRenderState as i, getWidgetStep as l, NumberField_default as n, findComboValueIndex as o, coerceNumericWidgetValue as r, formatNumericWidgetValue as s, NumberFieldInput_default as t, resolveNodeRootGraphId as u };
