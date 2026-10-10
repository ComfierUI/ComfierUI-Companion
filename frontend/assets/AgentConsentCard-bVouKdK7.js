import "./rolldown-runtime-xtsTai4I.js";
import { Et as withCtx, F as createBaseVNode, G as defineComponent, H as createTextVNode, I as createBlock, Kt as unref, L as createCommentVNode, Lt as ref, O as Fragment, P as computed, R as createElementBlock, U as createVNode, Zt as toDisplayString, dt as renderList, lt as openBlock } from "./vendor-vue-core-C1utdb0s.js";
import { B as useResizeObserver, c as createReusableTemplate } from "./vendor-vueuse-BxKIIsKg.js";
import { t as Button_default } from "./Button-j0oCzR82.js";
import { t as Video_default } from "./Video-nu2vO3z7.js";
//#region src/workbench/extensions/agent/components/agent/AgentConsentCard.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1 = {
	"data-testid": "agent-consent-card",
	class: "max-h-[85dvh] overflow-y-auto rounded-2xl border border-component-node-border bg-base-background shadow-[0_20px_24px_-4px_rgba(10,13,18,0.4),0_8px_8px_-4px_rgba(10,13,18,0.25),0_3px_3px_-1.5px_rgba(10,13,18,0.2)]"
};
var _hoisted_2 = { class: "p-2" };
var _hoisted_3 = { class: "grid aspect-video w-full place-items-center rounded-lg bg-secondary-background text-xs text-muted-foreground" };
var _hoisted_4 = { class: "flex flex-col gap-9 p-6 @xl:gap-6 @xl:p-9" };
var _hoisted_5 = { class: "flex flex-col gap-4" };
var _hoisted_6 = ["id"];
var _hoisted_7 = {
	key: 1,
	role: "alert",
	class: "my-0 text-sm/5 text-destructive-background"
};
var _hoisted_8 = { class: "flex flex-col gap-2.5 @xl:flex-row @xl:flex-wrap @xl:items-center @xl:justify-end" };
var _hoisted_9 = { class: "flex max-w-full flex-col gap-2.5 @xl:flex-row @xl:flex-wrap @xl:justify-end" };
var CONTAINER_XL_MIN_WIDTH = 576;
//#endregion
//#region src/workbench/extensions/agent/components/agent/AgentConsentCard.vue
var AgentConsentCard_default = /* @__PURE__ */ defineComponent({
	__name: "AgentConsentCard",
	props: {
		title: {},
		titleId: {},
		paragraphs: {},
		videoSources: { default: () => [] },
		posterSrc: { default: "" },
		docsUrl: { default: "" },
		accepting: {
			type: Boolean,
			default: false
		},
		error: { default: "" }
	},
	emits: ["reject", "accept"],
	setup(__props, { emit: __emit }) {
		const emit = __emit;
		const [DefineDocsLink, ReuseDocsLink] = createReusableTemplate();
		const containerRef = ref();
		const isWide = ref(false);
		const actions = computed(() => {
			if (__props.accepting) return ["accept"];
			return isWide.value ? ["reject", "accept"] : ["accept", "reject"];
		});
		useResizeObserver(containerRef, ([entry]) => {
			isWide.value = entry.contentRect.width >= CONTAINER_XL_MIN_WIDTH;
		});
		function choose(action) {
			if (action === "accept") emit("accept");
			else emit("reject");
		}
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock(Fragment, null, [createVNode(unref(DefineDocsLink), null, {
				default: withCtx(() => [createVNode(Button_default, {
					variant: "link",
					size: "link",
					class: "mr-auto w-fit",
					as: "a",
					href: __props.docsUrl,
					target: "_blank",
					rel: "noopener noreferrer"
				}, {
					default: withCtx(() => [createTextVNode(toDisplayString(_ctx.$t("agent.consent.readDocs")) + " ", 1), _cache[0] || (_cache[0] = createBaseVNode("span", { class: "icon-[lucide--square-arrow-out-up-right] size-4" }, null, -1))]),
					_: 1
				}, 8, ["href"])]),
				_: 1
			}), createBaseVNode("div", {
				ref_key: "containerRef",
				ref: containerRef,
				class: "dark-theme @container w-full max-w-[640px]"
			}, [createBaseVNode("div", _hoisted_1, [createBaseVNode("div", _hoisted_2, [createVNode(Video_default, {
				sources: __props.videoSources,
				"poster-src": __props.posterSrc,
				autoplay: "",
				muted: "",
				loop: "",
				"plays-inline": "",
				"data-testid": "agent-consent-video",
				class: "aspect-video w-full rounded-lg object-cover"
			}, {
				fallback: withCtx(() => [createBaseVNode("div", _hoisted_3, toDisplayString(_ctx.$t("agent.consent.videoPlaceholder")), 1)]),
				_: 1
			}, 8, ["sources", "poster-src"])]), createBaseVNode("section", _hoisted_4, [createBaseVNode("div", _hoisted_5, [
				createBaseVNode("h2", {
					id: __props.titleId,
					class: "my-0 text-xl font-semibold text-base-foreground @xl:text-2xl"
				}, toDisplayString(__props.title), 9, _hoisted_6),
				(openBlock(true), createElementBlock(Fragment, null, renderList(__props.paragraphs, (paragraph, index) => {
					return openBlock(), createElementBlock("p", {
						key: index,
						class: "my-0 text-sm/5 text-muted-foreground"
					}, toDisplayString(paragraph), 1);
				}), 128)),
				__props.docsUrl && !isWide.value ? (openBlock(), createBlock(unref(ReuseDocsLink), { key: 0 })) : createCommentVNode("", true),
				__props.error ? (openBlock(), createElementBlock("p", _hoisted_7, toDisplayString(__props.error), 1)) : createCommentVNode("", true)
			]), createBaseVNode("footer", _hoisted_8, [__props.docsUrl && isWide.value ? (openBlock(), createBlock(unref(ReuseDocsLink), { key: 0 })) : createCommentVNode("", true), createBaseVNode("div", _hoisted_9, [(openBlock(true), createElementBlock(Fragment, null, renderList(actions.value, (action) => {
				return openBlock(), createBlock(Button_default, {
					key: action,
					variant: action === "accept" ? "inverted" : "secondary",
					size: "lg",
					class: "w-full @xl:w-auto",
					loading: action === "accept" && __props.accepting,
					disabled: __props.accepting,
					onClick: ($event) => choose(action)
				}, {
					default: withCtx(() => [createTextVNode(toDisplayString(action === "accept" ? _ctx.$t("agent.consent.accept") : _ctx.$t("agent.consent.reject")), 1)]),
					_: 2
				}, 1032, [
					"variant",
					"loading",
					"disabled",
					"onClick"
				]);
			}), 128))])])])])], 512)], 64);
		};
	}
});
//#endregion
export { AgentConsentCard_default as default };
