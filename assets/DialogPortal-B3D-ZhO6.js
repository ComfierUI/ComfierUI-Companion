import "./rolldown-runtime-xtsTai4I.js";
import { Pt as isPlainObject } from "./vendor-other-BPEcPQTD.js";
import { $ as mergeProps, Et as withCtx, F as createBaseVNode, G as defineComponent, H as createTextVNode, I as createBlock, Jt as normalizeClass, Kt as unref, L as createCommentVNode, P as computed, R as createElementBlock, U as createVNode, Wt as toValue, Yt as normalizeProps, Zt as toDisplayString, ft as renderSlot, lt as openBlock, q as guardReactiveProps, z as createPropsRestProxy } from "./vendor-vue-core-C1utdb0s.js";
import { r as useI18n } from "./vendor-i18n-BZvE7WBQ.js";
import { r as dialogContentVariants } from "./dialog.variants-PsJk1wgr.js";
import { t as useDialogStore } from "./dialogStore-B0GYyals.js";
import { _n as Presence_default, an as DialogPortal_default$1, cn as DialogContent_default$1, dn as DialogRoot_default, fn as injectDialogRootContext, in as DialogTitle_default$1, on as DialogOverlay_default$1, vn as useForwardPropsEmits } from "./vendor-reka-ui-tdehH9A1.js";
import { t as cn } from "./src-DI1bBfrb.js";
import { t as Button_default } from "./Button-j0oCzR82.js";
//#region src/platform/remote/comfyui/errors.ts
/** Code reported when an error payload carries no machine-readable code. */
var UNKNOWN_ERROR_CODE = "UNKNOWN_ERROR";
/**
* Upper bound on a raw non-JSON body surfaced as the user-facing message.
* Short text/plain proxy errors (e.g. "upstream connect error") stay useful;
* oversized bodies (e.g. a full HTML gateway page) degrade to the clean
* status-derived fallback instead of dumping markup into a toast.
*/
var MAX_RAW_MESSAGE_LENGTH = 500;
/**
* A body opening with a tag is a markup document, never a usable message —
* however short the page happens to be. Anchored so prose that merely
* mentions a bracketed token (e.g. "connection to <backend-01> refused")
* still surfaces.
*/
var MARKUP_DOCUMENT = /^<[a-z!/]/i;
var CODE_SHAPE = /^[A-Z][A-Z0-9_]*$/;
/** Refusal of a legacy `/customers/*` call for a workspace not on the legacy rail. */
function isWorkspaceBillingRequiredError(err) {
	return err instanceof Error && "status" in err && err.status === 409 && "code" in err && err.code === "WORKSPACE_BILLING_REQUIRED";
}
/**
* Flat `{ error, message }` bodies (the /customers/* shape) carry the code in
* `error`; a prose value there (e.g. "Forbidden") is not a code.
*/
function codeFromRecord(record) {
	const raw = record.code ?? (typeof record.error === "string" && CODE_SHAPE.test(record.error) ? record.error : void 0);
	return typeof raw === "string" && raw !== "" ? raw : UNKNOWN_ERROR_CODE;
}
function usableText(body, fallbackMessage) {
	const trimmed = body.trim();
	return trimmed !== "" && trimmed.length <= MAX_RAW_MESSAGE_LENGTH && !MARKUP_DOCUMENT.test(trimmed) ? trimmed : fallbackMessage;
}
/**
* Coerce an already-parsed error body into the canonical
* `ErrorResponse { code, message, details? }` shape.
*
* The API emits this shape for all error responses; this helper is the
* single place that tolerates legacy/partial flat `ErrorResponse` payloads
* (missing `code`, missing `message`, non-object bodies) so call sites never
* shape-sniff. Nested/domain error envelopes (e.g. `PromptExecutionError`)
* are out of scope.
*
* @param body - The parsed response body (any JSON value, or `undefined`)
* @param fallbackMessage - Used when the body carries no usable message
*/
function errorResponseFromBody(body, fallbackMessage) {
	if (typeof body === "string") return {
		code: UNKNOWN_ERROR_CODE,
		message: usableText(body, fallbackMessage)
	};
	const record = isPlainObject(body) ? body : {};
	const code = codeFromRecord(record);
	const message = typeof record.message === "string" && record.message !== "" ? record.message : fallbackMessage;
	const details = isPlainObject(record.details) ? record.details : void 0;
	return details !== void 0 ? {
		code,
		message,
		details
	} : {
		code,
		message
	};
}
/**
* Parse JSON when possible, otherwise surface the raw text. A blank or
* whitespace-only body yields `undefined` so callers fall through to a
* status-derived fallback.
*/
function parseJsonOrText(text) {
	if (text.trim() === "") return void 0;
	try {
		return JSON.parse(text);
	} catch {
		return text;
	}
}
/**
* Parse a failed HTTP `Response` into the canonical
* `ErrorResponse { code, message, details? }` shape.
*
* Never throws: the body is read as text and JSON-parsed when possible, so
* plain-text error bodies (e.g. from a proxy) survive as the message. Empty
* or unreadable bodies degrade to a status-derived message and the
* `UNKNOWN_ERROR` code.
*/
async function parseErrorResponse(response) {
	const fallbackMessage = response.statusText || `HTTP ${response.status}`;
	return errorResponseFromBody(parseJsonOrText(await response.text().catch((err) => {
		console.warn("parseErrorResponse: failed to read response body", err);
		return "";
	})), fallbackMessage);
}
//#endregion
//#region src/components/ui/dialog/DialogTitle.vue
var DialogTitle_default = /* @__PURE__ */ defineComponent({
	__name: "DialogTitle",
	props: {
		asChild: { type: Boolean },
		as: {},
		class: {
			type: [
				Boolean,
				null,
				String,
				Object,
				Array
			],
			default: ""
		}
	},
	setup(__props) {
		const delegated = createPropsRestProxy(__props, ["class"]);
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(DialogTitle_default$1), mergeProps(delegated, { class: unref(cn)("min-w-0 text-base font-semibold wrap-break-word text-base-foreground", __props.class) }), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16, ["class"]);
		};
	}
});
//#endregion
//#region src/components/dialog/confirm/ConfirmBody.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1$3 = { class: "flex flex-col border-t border-border-default p-4 text-sm/5 wrap-break-word text-muted-foreground" };
//#endregion
//#region src/components/dialog/confirm/ConfirmBody.vue
var ConfirmBody_default = /* @__PURE__ */ defineComponent({
	__name: "ConfirmBody",
	props: {
		promptText: {},
		preserveNewlines: {
			type: Boolean,
			default: false
		}
	},
	setup(__props) {
		const promptTextReal = computed(() => toValue(__props.promptText));
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", _hoisted_1$3, [promptTextReal.value ? (openBlock(), createElementBlock("p", {
				key: 0,
				class: normalizeClass(unref(cn)("m-0", __props.preserveNewlines && "whitespace-pre-line"))
			}, toDisplayString(promptTextReal.value), 3)) : createCommentVNode("", true)]);
		};
	}
});
//#endregion
//#region src/components/dialog/confirm/ConfirmFooter.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1$2 = { class: "flex w-full flex-wrap items-center justify-end gap-4 p-4" };
//#endregion
//#region src/components/dialog/confirm/ConfirmFooter.vue
var ConfirmFooter_default = /* @__PURE__ */ defineComponent({
	__name: "ConfirmFooter",
	props: {
		cancelText: {},
		confirmText: {},
		confirmClass: {},
		confirmVariant: {},
		optionsDisabled: {}
	},
	emits: ["cancel", "confirm"],
	setup(__props) {
		const { t } = useI18n();
		const confirmTextX = computed(() => __props.confirmText || t("g.confirm"));
		const cancelTextX = computed(() => __props.cancelText || t("g.cancel"));
		const disabled = computed(() => toValue(__props.optionsDisabled));
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("section", _hoisted_1$2, [createVNode(Button_default, {
				disabled: disabled.value,
				variant: "muted-textonly",
				size: "lg",
				autofocus: "",
				onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("cancel"))
			}, {
				default: withCtx(() => [createTextVNode(toDisplayString(cancelTextX.value), 1)]),
				_: 1
			}, 8, ["disabled"]), createVNode(Button_default, {
				disabled: disabled.value,
				variant: __props.confirmVariant ?? "textonly",
				size: "lg",
				class: normalizeClass(__props.confirmClass),
				onClick: _cache[1] || (_cache[1] = ($event) => _ctx.$emit("confirm"))
			}, {
				default: withCtx(() => [createTextVNode(toDisplayString(confirmTextX.value), 1)]),
				_: 1
			}, 8, [
				"disabled",
				"variant",
				"class"
			])]);
		};
	}
});
//#endregion
//#region src/components/dialog/confirm/ConfirmHeader.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1$1 = { class: "flex items-center gap-2 p-4 font-inter text-sm font-normal text-base-foreground" };
var _hoisted_2 = {
	key: 1,
	class: "flex-auto"
};
//#endregion
//#region src/components/dialog/confirm/ConfirmHeader.vue
var ConfirmHeader_default = /* @__PURE__ */ defineComponent({
	__name: "ConfirmHeader",
	props: {
		title: {},
		icon: {}
	},
	setup(__props) {
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", _hoisted_1$1, [__props.icon ? (openBlock(), createElementBlock("i", {
				key: 0,
				class: normalizeClass(unref(cn)(__props.icon, "size-4")),
				"aria-hidden": "true"
			}, null, 2)) : createCommentVNode("", true), __props.title ? (openBlock(), createElementBlock("span", _hoisted_2, toDisplayString(__props.title), 1)) : createCommentVNode("", true)]);
		};
	}
});
//#endregion
//#region src/components/dialog/confirm/confirmDialog.ts
function showConfirmDialog(options = {}) {
	const dialogStore = useDialogStore();
	const { key, headerProps, props, footerProps } = options;
	return dialogStore.showDialog({
		key,
		headerComponent: ConfirmHeader_default,
		component: ConfirmBody_default,
		footerComponent: ConfirmFooter_default,
		headerProps,
		props,
		footerProps,
		dialogComponentProps: {
			renderer: "reka",
			size: "md",
			contentClass: "rounded-2xl border-border-default sm:max-w-lg",
			headerClass: "p-0 pr-3",
			bodyClass: "p-0",
			footerClass: "p-0"
		}
	});
}
//#endregion
//#region src/components/ui/dialog/Dialog.vue
var Dialog_default = /* @__PURE__ */ defineComponent({
	__name: "Dialog",
	props: {
		open: { type: Boolean },
		defaultOpen: { type: Boolean },
		modal: { type: Boolean }
	},
	emits: ["update:open"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emit = __emit;
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(DialogRoot_default), mergeProps(props, { "onUpdate:open": _cache[0] || (_cache[0] = (open) => emit("update:open", open)) }), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});
//#endregion
//#region src/components/ui/dialog/DialogContent.vue
var DialogContent_default = /* @__PURE__ */ defineComponent({
	__name: "DialogContent",
	props: {
		forceMount: { type: Boolean },
		disableOutsidePointerEvents: { type: Boolean },
		asChild: { type: Boolean },
		as: {},
		size: {},
		maximized: {
			type: Boolean,
			default: false
		},
		class: {
			type: [
				Boolean,
				null,
				String,
				Object,
				Array
			],
			default: ""
		}
	},
	emits: [
		"escapeKeyDown",
		"pointerDownOutside",
		"focusOutside",
		"interactOutside",
		"openAutoFocus",
		"closeAutoFocus"
	],
	setup(__props, { emit: __emit }) {
		const restProps = createPropsRestProxy(__props, [
			"size",
			"maximized",
			"class"
		]);
		const forwarded = useForwardPropsEmits(restProps, __emit);
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(DialogContent_default$1), mergeProps(unref(forwarded), { class: unref(cn)(unref(dialogContentVariants)({
				size: __props.size,
				maximized: __props.maximized
			}), __props.class, __props.maximized && "top-2 left-2 size-auto max-h-none max-w-none sm:max-w-none") }), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16, ["class"]);
		};
	}
});
//#endregion
//#region src/components/ui/dialog/DialogOverlay.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1 = ["data-state"];
var overlayClass = "fixed inset-0 z-1700 bg-black/70 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0";
//#endregion
//#region src/components/ui/dialog/DialogOverlay.vue
var DialogOverlay_default = /* @__PURE__ */ defineComponent({
	__name: "DialogOverlay",
	props: {
		forceMount: { type: Boolean },
		asChild: { type: Boolean },
		as: {},
		class: {
			type: [
				Boolean,
				null,
				String,
				Object,
				Array
			],
			default: ""
		}
	},
	setup(__props) {
		const delegated = createPropsRestProxy(__props, ["class"]);
		const rootContext = injectDialogRootContext();
		return (_ctx, _cache) => {
			return unref(rootContext).modal.value ? (openBlock(), createBlock(unref(DialogOverlay_default$1), mergeProps({ key: 0 }, delegated, {
				"data-testid": "dialog-overlay",
				class: unref(cn)(overlayClass, __props.class)
			}), null, 16, ["class"])) : (openBlock(), createBlock(unref(Presence_default), {
				key: 1,
				present: delegated.forceMount || unref(rootContext).open.value
			}, {
				default: withCtx(() => [createBaseVNode("div", {
					"data-state": unref(rootContext).open.value ? "open" : "closed",
					"data-testid": "dialog-overlay",
					class: normalizeClass(unref(cn)(overlayClass, __props.class))
				}, null, 10, _hoisted_1)]),
				_: 1
			}, 8, ["present"]));
		};
	}
});
//#endregion
//#region src/components/ui/dialog/DialogPortal.vue
var DialogPortal_default = /* @__PURE__ */ defineComponent({
	__name: "DialogPortal",
	props: {
		to: {},
		disabled: { type: Boolean },
		defer: { type: Boolean },
		forceMount: { type: Boolean }
	},
	setup(__props) {
		const props = __props;
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(DialogPortal_default$1), normalizeProps(guardReactiveProps(props)), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});
//#endregion
export { showConfirmDialog as a, errorResponseFromBody as c, Dialog_default as i, isWorkspaceBillingRequiredError as l, DialogOverlay_default as n, DialogTitle_default as o, DialogContent_default as r, UNKNOWN_ERROR_CODE as s, DialogPortal_default as t, parseErrorResponse as u };
