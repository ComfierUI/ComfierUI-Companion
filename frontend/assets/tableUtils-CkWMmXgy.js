import "./rolldown-runtime-xtsTai4I.js";
import { Ot as deburr } from "./vendor-other-BPEcPQTD.js";
import { Et as withCtx, G as defineComponent, I as createBlock, Jt as normalizeClass, Kt as unref, L as createCommentVNode, Q as mergeModels, R as createElementBlock, U as createVNode, ft as renderSlot, lt as openBlock, yt as useModel } from "./vendor-vue-core-C1utdb0s.js";
import { t as cn } from "./src-DI1bBfrb.js";
import { t as Button_default } from "./Button-j0oCzR82.js";
import { r as TableHead_default } from "./TableRow-DTbUSGOo.js";
//#endregion
//#region src/components/ui/table/TableSortHead.vue
var TableSortHead_default = /* @__PURE__ */ defineComponent({
	__name: "TableSortHead",
	props: /*@__PURE__*/ mergeModels({ class: { type: [
		Boolean,
		null,
		String,
		Object,
		Array
	] } }, {
		"direction": { default: null },
		"directionModifiers": {}
	}),
	emits: ["update:direction"],
	setup(__props) {
		const direction = useModel(__props, "direction");
		function toggle() {
			direction.value = direction.value === "ascending" ? "descending" : "ascending";
		}
		return (_ctx, _cache) => {
			return openBlock(), createBlock(TableHead_default, {
				class: normalizeClass(__props.class),
				"aria-sort": direction.value ?? "none"
			}, {
				default: withCtx(() => [createVNode(Button_default, {
					variant: "link",
					size: "link",
					onClick: toggle
				}, {
					default: withCtx(() => [renderSlot(_ctx.$slots, "default"), direction.value ? (openBlock(), createElementBlock("i", {
						key: 0,
						class: normalizeClass(unref(cn)("size-4", direction.value === "ascending" ? "icon-[lucide--arrow-up]" : "icon-[lucide--arrow-down]")),
						"aria-hidden": "true"
					}, null, 2)) : createCommentVNode("", true)]),
					_: 3
				})]),
				_: 3
			}, 8, ["class", "aria-sort"]);
		};
	}
});
//#endregion
//#region src/components/ui/table/tableUtils.ts
var collator = new Intl.Collator(void 0, { numeric: true });
function normalizeSearchText(text) {
	return deburr(text).toLocaleLowerCase();
}
function filterByQuery(items, query, getSearchFields) {
	const normalizedQuery = normalizeSearchText(query.trim());
	return items.filter((item) => getSearchFields(item).some((field) => normalizeSearchText(field).includes(normalizedQuery)));
}
function sortByText(items, direction, getText) {
	if (!direction) return [...items];
	return [...items].sort((a, b) => {
		const result = collator.compare(getText(a), getText(b));
		return direction === "ascending" ? result : -result;
	});
}
//#endregion
export { sortByText as n, TableSortHead_default as r, filterByQuery as t };
