import "./rolldown-runtime-xtsTai4I.js";
import { F as createBaseVNode, G as defineComponent, Jt as normalizeClass, Kt as unref, R as createElementBlock, ft as renderSlot, lt as openBlock } from "./vendor-vue-core-C1utdb0s.js";
import { t as cn } from "./src-DI1bBfrb.js";
//#region src/components/ui/table/Table.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1 = { class: "w-full table-fixed caption-bottom border-separate border-spacing-0 text-sm" };
//#endregion
//#region src/components/ui/table/Table.vue
var Table_default = /* @__PURE__ */ defineComponent({
	__name: "Table",
	props: { class: { type: [
		Boolean,
		null,
		String,
		Object,
		Array
	] } },
	setup(__props) {
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", { class: normalizeClass(unref(cn)("relative w-full overflow-auto rounded-lg border border-border-default", __props.class)) }, [createBaseVNode("table", _hoisted_1, [renderSlot(_ctx.$slots, "default")])], 2);
		};
	}
});
//#endregion
//#region src/components/ui/table/TableBody.vue
var TableBody_default = /* @__PURE__ */ defineComponent({
	__name: "TableBody",
	props: { class: { type: [
		Boolean,
		null,
		String,
		Object,
		Array
	] } },
	setup(__props) {
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("tbody", { class: normalizeClass(unref(cn)("[&_tr:last-child]:border-0", __props.class)) }, [renderSlot(_ctx.$slots, "default")], 2);
		};
	}
});
//#endregion
//#region src/components/ui/table/TableCell.vue
var TableCell_default = /* @__PURE__ */ defineComponent({
	__name: "TableCell",
	props: { class: { type: [
		Boolean,
		null,
		String,
		Object,
		Array
	] } },
	setup(__props) {
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("td", { class: normalizeClass(unref(cn)("px-2 py-2.5 align-middle whitespace-nowrap", __props.class)) }, [renderSlot(_ctx.$slots, "default")], 2);
		};
	}
});
//#endregion
//#region src/components/ui/table/TableHead.vue
var TableHead_default = /* @__PURE__ */ defineComponent({
	__name: "TableHead",
	props: { class: { type: [
		Boolean,
		null,
		String,
		Object,
		Array
	] } },
	setup(__props) {
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("th", {
				scope: "col",
				class: normalizeClass(unref(cn)("h-10 px-2 text-left align-middle text-sm font-normal whitespace-nowrap text-muted-foreground", __props.class))
			}, [renderSlot(_ctx.$slots, "default")], 2);
		};
	}
});
//#endregion
//#region src/components/ui/table/TableHeader.vue
var TableHeader_default = /* @__PURE__ */ defineComponent({
	__name: "TableHeader",
	props: { class: { type: [
		Boolean,
		null,
		String,
		Object,
		Array
	] } },
	setup(__props) {
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("thead", { class: normalizeClass(unref(cn)("[&_tr]:border-b [&_tr]:border-border-subtle/60", __props.class)) }, [renderSlot(_ctx.$slots, "default")], 2);
		};
	}
});
//#endregion
//#region src/components/ui/table/TableRow.vue
var TableRow_default = /* @__PURE__ */ defineComponent({
	__name: "TableRow",
	props: { class: { type: [
		Boolean,
		null,
		String,
		Object,
		Array
	] } },
	setup(__props) {
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("tr", { class: normalizeClass(unref(cn)("border-b border-border-subtle/60 transition-colors hover:bg-secondary-background/50 focus-visible:outline-1 focus-visible:-outline-offset-1 focus-visible:outline-border-default data-[state=selected]:bg-secondary-background/50", __props.class)) }, [renderSlot(_ctx.$slots, "default")], 2);
		};
	}
});
//#endregion
export { TableBody_default as a, TableCell_default as i, TableHeader_default as n, Table_default as o, TableHead_default as r, TableRow_default as t };
