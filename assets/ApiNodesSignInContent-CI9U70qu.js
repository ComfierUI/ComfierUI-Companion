import "./rolldown-runtime-xtsTai4I.js";
import { Et as withCtx, F as createBaseVNode, G as defineComponent, H as createTextVNode, Kt as unref, L as createCommentVNode, O as Fragment, R as createElementBlock, U as createVNode, Zt as toDisplayString, dt as renderList, lt as openBlock } from "./vendor-vue-core-C1utdb0s.js";
import { Pa as useNodeDefStore } from "./layoutStore-CZsuzg91.js";
import { r as useI18n } from "./vendor-i18n-BZvE7WBQ.js";
import { t as Button_default } from "./Button-j0oCzR82.js";
import { t as useExternalLink } from "./useExternalLink-CXT6uu6Z.js";
import { t as AccessibleTooltip_default } from "./AccessibleTooltip-BrSxwyaK.js";
"" + new URL("images/partner-nodes-signin.webp", import.meta.url).href;
//#endregion
//#region src/components/dialog/content/ApiNodesSignInContent.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1 = {
	"data-testid": "api-signin-dialog",
	class: "relative flex max-h-[85vh] min-h-100 w-[min(44rem,90vw)] items-stretch rounded-3xl border border-border-subtle bg-base-background p-2"
};
var _hoisted_2 = { class: "flex min-w-0 flex-1 flex-col justify-between pt-5 pr-3 pb-2 pl-6" };
var _hoisted_3 = { class: "flex flex-col gap-5" };
var _hoisted_4 = { class: "flex flex-col gap-3" };
var _hoisted_5 = ["id"];
var _hoisted_6 = { class: "m-0 text-sm/[1.45] text-muted-foreground" };
var _hoisted_7 = {
	key: 0,
	class: "flex flex-col gap-2"
};
var _hoisted_8 = { class: "text-xs font-medium text-muted-foreground" };
var _hoisted_9 = { class: "m-0 flex max-h-48 list-none flex-col gap-2 overflow-y-auto p-0" };
var _hoisted_10 = ["title"];
var _hoisted_11 = { class: "flex flex-wrap items-center justify-between gap-x-2.5 gap-y-2 pt-4" };
var _hoisted_12 = ["href"];
var _hoisted_13 = { class: "leading-4" };
//#endregion
//#region src/components/dialog/content/ApiNodesSignInContent.vue
var ApiNodesSignInContent_default = /* @__PURE__ */ defineComponent({
	__name: "ApiNodesSignInContent",
	props: {
		apiNodeNames: {},
		titleId: {},
		onLogin: { type: Function },
		onCancel: { type: Function }
	},
	setup(__props) {
		const { t } = useI18n();
		const { buildDocsUrl } = useExternalLink();
		const nodeDefStore = useNodeDefStore();
		const partnerNodesDocsUrl = buildDocsUrl("/tutorials/api-nodes/faq", { includeLocale: true });
		const displayNameFor = (name) => nodeDefStore.nodeDefsByName[name]?.display_name || name;
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", _hoisted_1, [
				createVNode(Button_default, {
					variant: "muted-textonly",
					size: "icon-sm",
					class: "absolute top-4 right-4 size-6 rounded-sm",
					"aria-label": unref(t)("g.close"),
					onClick: _cache[0] || (_cache[0] = ($event) => __props.onCancel?.())
				}, {
					default: withCtx(() => [..._cache[2] || (_cache[2] = [createBaseVNode("i", { class: "icon-[lucide--x] block size-4 leading-none" }, null, -1)])]),
					_: 1
				}, 8, ["aria-label"]),
				_cache[5] || (_cache[5] = createBaseVNode("img", {
					src: "" + new URL("images/partner-nodes-signin.webp", import.meta.url).href,
					alt: "",
					class: "hidden w-74.25 shrink-0 rounded-[20px] object-cover sm:block"
				}, null, -1)),
				createBaseVNode("div", _hoisted_2, [createBaseVNode("div", _hoisted_3, [createBaseVNode("div", _hoisted_4, [createBaseVNode("h2", {
					id: __props.titleId,
					class: "m-0 text-[22px] font-semibold text-base-foreground"
				}, toDisplayString(unref(t)("apiNodesSignInDialog.title")), 9, _hoisted_5), createBaseVNode("p", _hoisted_6, toDisplayString(unref(t)("apiNodesSignInDialog.message")), 1)]), __props.apiNodeNames.length ? (openBlock(), createElementBlock("div", _hoisted_7, [createBaseVNode("div", _hoisted_8, toDisplayString(unref(t)("apiNodesSignInDialog.partnerNodesInWorkflow")), 1), createBaseVNode("ul", _hoisted_9, [(openBlock(true), createElementBlock(Fragment, null, renderList(__props.apiNodeNames, (name) => {
					return openBlock(), createElementBlock("li", {
						key: name,
						class: "flex items-center gap-2 rounded-lg bg-secondary-background px-3.5 py-2.5 text-sm font-semibold text-base-foreground"
					}, [_cache[3] || (_cache[3] = createBaseVNode("i", {
						class: "icon-[tabler--crown-filled] size-4 shrink-0 text-brand-yellow",
						"aria-hidden": "true"
					}, null, -1)), createBaseVNode("span", {
						title: displayNameFor(name),
						class: "min-w-0 flex-1 truncate"
					}, toDisplayString(displayNameFor(name)), 9, _hoisted_10)]);
				}), 128))])])) : createCommentVNode("", true)]), createBaseVNode("div", _hoisted_11, [createVNode(AccessibleTooltip_default, {
					label: unref(t)("apiNodesSignInDialog.tooltip"),
					side: "bottom"
				}, {
					trigger: withCtx(() => [createBaseVNode("a", {
						href: unref(partnerNodesDocsUrl),
						target: "_blank",
						rel: "noopener noreferrer",
						class: "flex items-center gap-1 text-xs text-muted-foreground no-underline duration-150 hover:text-base-foreground motion-safe:transition-colors"
					}, [_cache[4] || (_cache[4] = createBaseVNode("i", {
						class: "icon-[lucide--info] size-4 shrink-0",
						"aria-hidden": "true"
					}, null, -1)), createBaseVNode("span", _hoisted_13, toDisplayString(unref(t)("apiNodesSignInDialog.whatArePartnerNodes")), 1)], 8, _hoisted_12)]),
					_: 1
				}, 8, ["label"]), createVNode(Button_default, {
					variant: "inverted",
					size: "unset",
					class: "h-9 rounded-lg px-6 text-sm font-medium",
					onClick: _cache[1] || (_cache[1] = ($event) => __props.onLogin?.())
				}, {
					default: withCtx(() => [createTextVNode(toDisplayString(unref(t)("apiNodesSignInDialog.signIn")), 1)]),
					_: 1
				})])])
			]);
		};
	}
});
//#endregion
export { ApiNodesSignInContent_default as default };
