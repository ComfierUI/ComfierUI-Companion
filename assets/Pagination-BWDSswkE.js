import "./rolldown-runtime-xtsTai4I.js";
import { Et as withCtx, F as createBaseVNode, G as defineComponent, H as createTextVNode, I as createBlock, Jt as normalizeClass, Kt as unref, L as createCommentVNode, O as Fragment, Q as mergeModels, R as createElementBlock, U as createVNode, Zt as toDisplayString, dt as renderList, lt as openBlock, yt as useModel } from "./vendor-vue-core-C1utdb0s.js";
import { J as PaginationNext_default, Q as PaginationEllipsis_default, X as PaginationList_default, Y as PaginationListItem_default, Z as PaginationRoot_default, q as PaginationPrev_default } from "./vendor-reka-ui-tdehH9A1.js";
import { t as Button_default } from "./Button-j0oCzR82.js";
import { a as Select_default, i as SelectContent_default, n as SelectTrigger_default, r as SelectItem_default, t as SelectValue_default } from "./SelectValue-BYMnIcxq.js";
//#region src/components/ui/pagination/Pagination.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1 = { class: "flex flex-wrap items-center justify-center gap-2" };
var _hoisted_2 = {
	key: 0,
	class: "mr-2 flex items-center gap-2"
};
var _hoisted_3 = { class: "text-sm text-muted-foreground" };
var ellipsisClass = "inline-flex size-8 items-center justify-center text-sm text-muted-foreground";
//#endregion
//#region src/components/ui/pagination/Pagination.vue
var Pagination_default = /* @__PURE__ */ defineComponent({
	__name: "Pagination",
	props: /*@__PURE__*/ mergeModels({
		total: {},
		itemsPerPageOptions: {}
	}, {
		"page": { default: 1 },
		"pageModifiers": {},
		"itemsPerPage": { default: 10 },
		"itemsPerPageModifiers": {}
	}),
	emits: ["update:page", "update:itemsPerPage"],
	setup(__props) {
		const page = useModel(__props, "page");
		const itemsPerPage = useModel(__props, "itemsPerPage");
		function updateItemsPerPage(value) {
			if (typeof value !== "number") return;
			itemsPerPage.value = value;
			page.value = 1;
		}
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(PaginationRoot_default), {
				page: page.value,
				"onUpdate:page": _cache[0] || (_cache[0] = ($event) => page.value = $event),
				total: __props.total,
				"items-per-page": itemsPerPage.value,
				"sibling-count": 1,
				"show-edges": ""
			}, {
				default: withCtx(() => [createBaseVNode("div", _hoisted_1, [
					__props.itemsPerPageOptions?.length ? (openBlock(), createElementBlock("div", _hoisted_2, [createBaseVNode("span", _hoisted_3, toDisplayString(_ctx.$t("g.itemsPerPage")), 1), createVNode(Select_default, {
						"model-value": itemsPerPage.value,
						"onUpdate:modelValue": updateItemsPerPage
					}, {
						default: withCtx(() => [createVNode(SelectTrigger_default, {
							size: "md",
							class: "w-20",
							"aria-label": _ctx.$t("g.itemsPerPage")
						}, {
							default: withCtx(() => [createVNode(SelectValue_default)]),
							_: 1
						}, 8, ["aria-label"]), createVNode(SelectContent_default, null, {
							default: withCtx(() => [(openBlock(true), createElementBlock(Fragment, null, renderList(__props.itemsPerPageOptions, (option) => {
								return openBlock(), createBlock(SelectItem_default, {
									key: option,
									value: option
								}, {
									default: withCtx(() => [createTextVNode(toDisplayString(option), 1)]),
									_: 2
								}, 1032, ["value"]);
							}), 128))]),
							_: 1
						})]),
						_: 1
					}, 8, ["model-value"])])) : createCommentVNode("", true),
					createVNode(unref(PaginationPrev_default), { "as-child": "" }, {
						default: withCtx(() => [createVNode(Button_default, {
							variant: "muted-textonly",
							size: "md",
							class: "text-sm",
							"aria-label": _ctx.$t("g.previous")
						}, {
							default: withCtx(() => [_cache[1] || (_cache[1] = createBaseVNode("i", { class: "icon-[lucide--chevron-left] size-4" }, null, -1)), createTextVNode(" " + toDisplayString(_ctx.$t("g.previous")), 1)]),
							_: 1
						}, 8, ["aria-label"])]),
						_: 1
					}),
					createVNode(unref(PaginationList_default), { class: "flex items-center gap-1" }, {
						default: withCtx(({ items }) => [(openBlock(true), createElementBlock(Fragment, null, renderList(items, (item, index) => {
							return openBlock(), createElementBlock(Fragment, { key: index }, [item.type === "page" ? (openBlock(), createBlock(unref(PaginationListItem_default), {
								key: 0,
								value: item.value,
								"as-child": ""
							}, {
								default: withCtx(() => [createVNode(Button_default, {
									variant: item.value === page.value ? "secondary" : "muted-textonly",
									size: "icon",
									"aria-label": _ctx.$t("g.pageNumber", { page: item.value })
								}, {
									default: withCtx(() => [createTextVNode(toDisplayString(item.value), 1)]),
									_: 2
								}, 1032, ["variant", "aria-label"])]),
								_: 2
							}, 1032, ["value"])) : (openBlock(), createBlock(unref(PaginationEllipsis_default), {
								key: 1,
								index,
								class: normalizeClass(ellipsisClass)
							}, {
								default: withCtx(() => [..._cache[2] || (_cache[2] = [createTextVNode(" … ", -1)])]),
								_: 1
							}, 8, ["index"]))], 64);
						}), 128))]),
						_: 1
					}),
					createVNode(unref(PaginationNext_default), { "as-child": "" }, {
						default: withCtx(() => [createVNode(Button_default, {
							variant: "muted-textonly",
							size: "md",
							class: "text-sm",
							"aria-label": _ctx.$t("g.next")
						}, {
							default: withCtx(() => [createTextVNode(toDisplayString(_ctx.$t("g.next")) + " ", 1), _cache[3] || (_cache[3] = createBaseVNode("i", { class: "icon-[lucide--chevron-right] size-4" }, null, -1))]),
							_: 1
						}, 8, ["aria-label"])]),
						_: 1
					})
				])]),
				_: 1
			}, 8, [
				"page",
				"total",
				"items-per-page"
			]);
		};
	}
});
//#endregion
export { Pagination_default as t };
