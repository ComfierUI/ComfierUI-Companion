import "./rolldown-runtime-xtsTai4I.js";
import { $ as mergeProps, Dt as withDirectives, Et as withCtx, F as createBaseVNode, G as defineComponent, H as createTextVNode, I as createBlock, Jt as normalizeClass, Kt as unref, L as createCommentVNode, Lt as ref, Nt as markRaw, O as Fragment, P as computed, Q as mergeModels, R as createElementBlock, St as watch, T as withKeys, U as createVNode, Zt as toDisplayString, d as defineStore, dt as renderList, ft as renderSlot, ht as resolveDynamicComponent, lt as openBlock, mt as resolveDirective, ot as onMounted, w as vShow, yt as useModel } from "./vendor-vue-core-C1utdb0s.js";
import { Da as appendCloudResParam, ot as NumberFieldIncrement_default, st as NumberFieldDecrement_default } from "./layoutStore-CZsuzg91.js";
import { i as api } from "./api-Bt-fGt5a.js";
import { r as axios } from "./vendor-axios-QnwcNXlY.js";
import { t as useToastStore } from "./toastStore-CTfykAzG.js";
import { x as isValidUrl } from "./formatUtil-DuxXRy1z.js";
import { t as cn } from "./src-DI1bBfrb.js";
import { t as Button_default } from "./Button-j0oCzR82.js";
import { t as script } from "./vendor-primevue-C3d0HJ53.js";
import { n as NumberField_default, t as NumberFieldInput_default } from "./NumberFieldInput-CILJZ6M6.js";
import { t as SingleSelect_default } from "./SingleSelect-CS2DGZzk.js";
import { t as Switch_default } from "./Switch-BAw3-YcG.js";
import { t as Input_default } from "./Input-Cx8jjgHK.js";
import { t as ColorPicker_default } from "./ColorPicker-D34wwQO7.js";
import { i as InputGroup_default, n as InputGroupButton_default, r as InputGroupAddon_default, t as InputGroupInput_default } from "./InputGroupInput-BndLl3Nb.js";
import { t as Slider_default } from "./Slider-eQb4a5yt.js";
import { n as RadioGroup_default, t as RadioGroupItem_default } from "./RadioGroupItem-BgZ8b2ud.js";
//#region src/comfier/detailPopovers.js
function startDetailPopovers() {
	"use strict";
	window.__comfierDetailPopovers?.remove?.();
	const jobs = window.__comfierRuntime.scope("detail-popovers");
	const ICON = ".pi-info-circle";
	const icons = /* @__PURE__ */ new Map();
	let stopped = false;
	let active = null;
	let tap = null;
	let lastTouch = 0;
	let forwarding = false;
	const style = document.createElement("style");
	style.id = "comfier-detail-popovers-style";
	style.textContent = `
html body #comfier-info-tooltip{position:fixed;box-sizing:border-box;margin:0;padding:10px 12px;border:1px solid var(--interface-stroke,#555);border-radius:8px;background:var(--comfy-menu-bg,#242427);color:var(--input-text,#fff);font:400 13px/1.4 sans-serif;white-space:pre-wrap;overflow-wrap:anywhere;overflow:auto;overscroll-behavior:contain;touch-action:pan-y;box-shadow:0 4px 16px #0006;z-index:710;pointer-events:auto}
html body :is([data-testid="settings-dialog"],.comfier-native-settings-panel) .pi-info-circle[data-comfier-info-trigger]{position:relative;padding:4px;margin:-4px;cursor:pointer;touch-action:manipulation}
`;
	document.head.appendChild(style);
	const tip = document.createElement("div");
	tip.id = "comfier-info-tooltip";
	tip.setAttribute("role", "tooltip");
	tip.setAttribute("data-comfier-info-tooltip", "");
	tip.hidden = true;
	document.body.appendChild(tip);
	function set(el, key, value) {
		if (el.style.getPropertyValue(key) !== value) el.style.setProperty(key, value, "important");
	}
	function viewport() {
		const v = window.visualViewport;
		return {
			left: v?.offsetLeft || 0,
			top: v?.offsetTop || 0,
			width: v?.width || innerWidth,
			height: v?.height || innerHeight
		};
	}
	function zoom() {
		return window.__comfierViewport?.scale() || Math.max(.3, Math.min(2, parseFloat(window.__comfierUiZoomValue) || 1));
	}
	function bounds() {
		const v = viewport();
		return {
			left: v.left + 8,
			top: v.top + 8,
			right: v.left + v.width - 8,
			bottom: v.top + v.height - 8
		};
	}
	function visible(el) {
		if (!el?.isConnected) return false;
		const s = getComputedStyle(el);
		const r = el.getBoundingClientRect();
		return s.display !== "none" && s.visibility !== "hidden" && r.width > 0 && r.height > 0;
	}
	function iconFrom(target) {
		const icon = target?.closest?.(ICON);
		return icons.has(icon) ? icon : null;
	}
	function content(icon) {
		if (icon.$_ptooltipDisabled) return "";
		if (typeof icon.$_ptooltipValue === "string") return icon.$_ptooltipValue.trim();
		const id = icon.getAttribute("aria-describedby");
		const native = id && document.getElementById(id);
		return native?.getAttribute("role") === "tooltip" ? (native.textContent || "").trim() : "";
	}
	function restoreAttribute(el, name, value) {
		if (value === null) el.removeAttribute(name);
		else el.setAttribute(name, value);
	}
	function markIcon(icon) {
		if (icons.has(icon) || !content(icon)) return;
		icons.set(icon, {
			role: icon.getAttribute("role"),
			tabindex: icon.getAttribute("tabindex"),
			label: icon.getAttribute("aria-label")
		});
		icon.setAttribute("data-comfier-info-trigger", "");
		icon.setAttribute("role", "button");
		icon.setAttribute("tabindex", "0");
		if (!icon.getAttribute("aria-label")) icon.setAttribute("aria-label", "Setting information");
	}
	function hideNative(icon) {
		if (icon.__comfierInfoOwned) return;
		forwarding = true;
		try {
			icon.dispatchEvent(new MouseEvent("mouseleave", { bubbles: false }));
		} finally {
			forwarding = false;
		}
	}
	function releaseIcon(icon) {
		if (active?.icon === icon) closeTip();
		const saved = icons.get(icon);
		if (saved) {
			restoreAttribute(icon, "role", saved.role);
			restoreAttribute(icon, "tabindex", saved.tabindex);
			restoreAttribute(icon, "aria-label", saved.label);
			icon.removeAttribute("data-comfier-info-trigger");
			icons.delete(icon);
		}
	}
	function bindInfo(icon, binding) {
		const value = binding.value;
		icon.__comfierInfoOwned = true;
		icon.$_ptooltipValue = typeof value === "string" ? value : typeof value?.value === "string" ? value.value : "";
		icon.$_ptooltipDisabled = value?.disabled === true;
		if (!content(icon)) {
			releaseIcon(icon);
			return;
		}
		markIcon(icon);
		if (active?.icon === icon) {
			tip.textContent = content(icon);
			positionTip();
		}
	}
	const infoDirective = {
		beforeMount: bindInfo,
		updated: bindInfo,
		beforeUnmount(icon) {
			releaseIcon(icon);
			delete icon.__comfierInfoOwned;
			delete icon.$_ptooltipValue;
			delete icon.$_ptooltipDisabled;
		}
	};
	function positionTip() {
		if (!active) return;
		if (!visible(active.icon)) {
			closeTip();
			return;
		}
		const b = bounds();
		const z = zoom();
		const r = active.icon.getBoundingClientRect();
		const w = Math.max(1, Math.min(360, (b.right - b.left) / z));
		set(tip, "zoom", String(z));
		set(tip, "width", w + "px");
		set(tip, "max-height", Math.max(1, (b.bottom - b.top) / z) + "px");
		const h = Math.min(tip.getBoundingClientRect().height, b.bottom - b.top);
		const left = Math.max(b.left, Math.min((r.left + r.right - w * z) / 2, b.right - w * z));
		let top = r.bottom + 8;
		if (top + h > b.bottom) top = r.top - h - 8;
		top = Math.max(b.top, Math.min(top, b.bottom - h));
		set(tip, "left", left / z + "px");
		set(tip, "top", top / z + "px");
	}
	function closeTip() {
		if (!active) return false;
		const old = active;
		active = null;
		restoreAttribute(old.icon, "aria-describedby", old.described);
		tip.hidden = true;
		tip.textContent = "";
		return true;
	}
	function showTip(icon, pinned) {
		const text = content(icon);
		if (!text) return false;
		markIcon(icon);
		if (active?.icon !== icon) {
			closeTip();
			active = {
				icon,
				pinned,
				described: icon.getAttribute("aria-describedby")
			};
		} else active.pinned = pinned || active.pinned;
		hideNative(icon);
		tip.textContent = text;
		tip.hidden = false;
		icon.setAttribute("aria-describedby", tip.id);
		positionTip();
		return true;
	}
	function toggle(icon) {
		if (active?.icon === icon && active.pinned) return closeTip();
		return showTip(icon, true);
	}
	function schedule() {
		if (!stopped && active) jobs.frame("place", positionTip);
	}
	jobs.listen(document, "mouseenter", (event) => {
		if (forwarding) return;
		const icon = iconFrom(event.target);
		if (!icon || !content(icon)) return;
		event.stopImmediatePropagation();
		if (Date.now() - lastTouch > 800) showTip(icon, false);
	}, true);
	jobs.listen(document, "mouseleave", (event) => {
		if (forwarding) return;
		const icon = iconFrom(event.target);
		if (!icon || !content(icon)) return;
		event.stopImmediatePropagation();
		if (active?.icon === icon && !active.pinned && !tip.contains(event.relatedTarget)) closeTip();
	}, true);
	jobs.listen(tip, "mouseleave", () => {
		if (active && !active.pinned) closeTip();
	});
	jobs.listen(document, "focusin", (event) => {
		const icon = iconFrom(event.target);
		if (icon) showTip(icon, false);
	}, true);
	jobs.listen(document, "focusout", (event) => {
		if (active?.icon === event.target && !active.pinned) closeTip();
	}, true);
	jobs.listen(document, "pointerdown", (event) => {
		const icon = iconFrom(event.target);
		if (active && icon !== active.icon && !tip.contains(event.target)) closeTip();
		if (event.pointerType === "touch" || event.pointerType === "pen") {
			lastTouch = Date.now();
			tap = icon && content(icon) ? {
				icon,
				id: event.pointerId,
				x: event.clientX,
				y: event.clientY,
				moved: false
			} : null;
		}
	}, true);
	jobs.listen(document, "pointermove", (event) => {
		if (tap && event.pointerId === tap.id && Math.hypot(event.clientX - tap.x, event.clientY - tap.y) > 8) tap.moved = true;
	}, true);
	jobs.listen(document, "pointercancel", () => {
		tap = null;
	}, true);
	jobs.listen(document, "pointerup", (event) => {
		if (!tap || event.pointerId !== tap.id) return;
		const t = tap;
		tap = null;
		lastTouch = Date.now();
		if (!t.moved && iconFrom(event.target) === t.icon) {
			event.preventDefault();
			event.stopImmediatePropagation();
			toggle(t.icon);
		}
	}, true);
	jobs.listen(document, "click", (event) => {
		const icon = iconFrom(event.target);
		if (!icon || !content(icon)) return;
		event.preventDefault();
		event.stopImmediatePropagation();
		if (Date.now() - lastTouch > 800) toggle(icon);
	}, true);
	jobs.listen(document, "keydown", (event) => {
		if (event.key === "Escape" && closeTip()) {
			event.preventDefault();
			event.stopImmediatePropagation();
			return;
		}
		const icon = iconFrom(event.target);
		if (icon && content(icon) && (event.key === "Enter" || event.key === " ")) {
			event.preventDefault();
			event.stopImmediatePropagation();
			toggle(icon);
		}
	}, true);
	jobs.listen(document, "scroll", (event) => {
		if (active && !tip.contains(event.target)) closeTip();
	}, true);
	jobs.listen(window, "resize", schedule, { passive: true });
	if (window.visualViewport) {
		jobs.listen(window.visualViewport, "resize", schedule, { passive: true });
		jobs.listen(window.visualViewport, "scroll", schedule, { passive: true });
	}
	const unregister = window.__comfierBack?.register("info-tooltip", 5, closeTip);
	currentDirective = infoDirective;
	const controller = {
		closeTooltip: closeTip,
		remove() {
			if (stopped) return;
			stopped = true;
			closeTip();
			jobs.dispose();
			unregister?.();
			for (const icon of [...icons.keys()]) releaseIcon(icon);
			tip.remove();
			style.remove();
			currentDirective = null;
			delete window.__comfierDetailPopovers;
		}
	};
	window.__comfierDetailPopovers = controller;
	return controller.remove;
}
var currentDirective = null;
var vSettingInfo = {
	beforeMount(el, binding) {
		currentDirective?.beforeMount(el, binding);
	},
	updated(el, binding) {
		currentDirective?.updated(el, binding);
	},
	beforeUnmount(el) {
		currentDirective?.beforeUnmount(el);
	}
};
//#endregion
//#region src/components/common/BackgroundImageUpload.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1$6 = { class: "flex gap-2" };
//#endregion
//#region src/components/common/BackgroundImageUpload.vue
var BackgroundImageUpload_default = /* @__PURE__ */ defineComponent({
	__name: "BackgroundImageUpload",
	props: {
		"modelValue": {},
		"modelModifiers": {}
	},
	emits: ["update:modelValue"],
	setup(__props) {
		const modelValue = useModel(__props, "modelValue");
		const fileInput = ref(null);
		const isUploading = ref(false);
		const triggerFileInput = () => {
			fileInput.value?.click();
		};
		const uploadFile = async (file) => {
			const body = new FormData();
			body.append("image", file);
			body.append("subfolder", "backgrounds");
			const resp = await api.fetchApi("/upload/image", {
				method: "POST",
				body
			});
			if (resp.status !== 200) {
				useToastStore().addAlert(`Upload failed: ${resp.status} - ${resp.statusText}`);
				return null;
			}
			const data = await resp.json();
			return data.subfolder ? `${data.subfolder}/${data.name}` : data.name;
		};
		const handleFileUpload = async (event) => {
			const target = event.target;
			if (target.files && target.files[0]) {
				const file = target.files[0];
				isUploading.value = true;
				try {
					const uploadedPath = await uploadFile(file);
					if (uploadedPath) {
						const params = new URLSearchParams({
							filename: uploadedPath,
							type: "input",
							subfolder: "backgrounds"
						});
						appendCloudResParam(params, file.name);
						modelValue.value = `/api/view?${params.toString()}`;
					}
				} catch (error) {
					useToastStore().addAlert(`Upload error: ${String(error)}`);
				} finally {
					isUploading.value = false;
				}
			}
		};
		const clearImage = () => {
			modelValue.value = "";
			if (fileInput.value) fileInput.value.value = "";
		};
		return (_ctx, _cache) => {
			const _directive_tooltip = resolveDirective("tooltip");
			return openBlock(), createElementBlock("div", _hoisted_1$6, [
				createVNode(Input_default, {
					modelValue: modelValue.value,
					"onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => modelValue.value = $event),
					class: "flex-1",
					placeholder: _ctx.$t("g.imageUrl")
				}, null, 8, ["modelValue", "placeholder"]),
				withDirectives((openBlock(), createBlock(Button_default, {
					variant: "secondary",
					size: "sm",
					"aria-label": _ctx.$t("g.upload"),
					disabled: isUploading.value,
					onClick: triggerFileInput
				}, {
					default: withCtx(() => [createBaseVNode("i", { class: normalizeClass(isUploading.value ? "pi pi-spin pi-spinner" : "pi pi-upload") }, null, 2)]),
					_: 1
				}, 8, ["aria-label", "disabled"])), [[_directive_tooltip, _ctx.$t("g.upload")]]),
				withDirectives((openBlock(), createBlock(Button_default, {
					variant: "destructive",
					size: "sm",
					"aria-label": _ctx.$t("g.clear"),
					disabled: !modelValue.value,
					onClick: clearImage
				}, {
					default: withCtx(() => [..._cache[1] || (_cache[1] = [createBaseVNode("i", { class: "pi pi-trash" }, null, -1)])]),
					_: 1
				}, 8, ["aria-label", "disabled"])), [[_directive_tooltip, _ctx.$t("g.clear")]]),
				createBaseVNode("input", {
					ref_key: "fileInput",
					ref: fileInput,
					type: "file",
					class: "hidden",
					accept: "image/*",
					onChange: handleFileUpload
				}, null, 544)
			]);
		};
	}
});
//#endregion
//#region src/components/common/CustomFormValue.vue
var CustomFormValue_default = /* @__PURE__ */ defineComponent({
	__name: "CustomFormValue",
	props: { renderFunction: { type: Function } },
	setup(__props) {
		const props = __props;
		const container = ref(null);
		function renderContent() {
			if (container.value) {
				container.value.innerHTML = "";
				const element = props.renderFunction();
				container.value.appendChild(element);
			}
		}
		onMounted(renderContent);
		watch(() => props.renderFunction, renderContent);
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", {
				ref_key: "container",
				ref: container
			}, null, 512);
		};
	}
});
//#endregion
//#region src/components/common/FormColorPicker.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1$5 = { class: "color-picker-wrapper flex items-center gap-2" };
//#endregion
//#region src/components/common/FormColorPicker.vue
var FormColorPicker_default = /* @__PURE__ */ defineComponent({
	inheritAttrs: false,
	__name: "FormColorPicker",
	props: /*@__PURE__*/ mergeModels({
		label: {},
		disabled: {
			type: Boolean,
			default: false
		},
		id: {},
		ariaLabelledby: {}
	}, {
		"modelValue": {},
		"modelModifiers": {}
	}),
	emits: ["update:modelValue"],
	setup(__props) {
		const modelValue = useModel(__props, "modelValue");
		const hexValue = computed({
			get: () => modelValue.value?.startsWith("#") ? modelValue.value : `#${modelValue.value ?? "000000"}`,
			set: (next) => {
				modelValue.value = next.replace(/^#/, "");
			}
		});
		const draftText = ref(modelValue.value ?? "");
		watch(modelValue, (next) => {
			draftText.value = next ?? "";
		});
		const FULL_HEX = /^#?([0-9a-f]{6}|[0-9a-f]{8})$/i;
		function commitDraft() {
			const raw = draftText.value.trim();
			if (raw === "") {
				draftText.value = modelValue.value ?? "";
				return;
			}
			if (FULL_HEX.test(raw)) modelValue.value = raw.replace(/^#/, "").toLowerCase();
			else draftText.value = modelValue.value ?? "";
		}
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", _hoisted_1$5, [createVNode(ColorPicker_default, {
				id: __props.id,
				modelValue: hexValue.value,
				"onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => hexValue.value = $event),
				disabled: __props.disabled,
				"aria-labelledby": __props.ariaLabelledby
			}, null, 8, [
				"id",
				"modelValue",
				"disabled",
				"aria-labelledby"
			]), createVNode(Input_default, {
				modelValue: draftText.value,
				"onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => draftText.value = $event),
				class: "w-28",
				placeholder: __props.label,
				disabled: __props.disabled,
				onBlur: commitDraft,
				onKeydown: withKeys(commitDraft, ["enter"])
			}, null, 8, [
				"modelValue",
				"placeholder",
				"disabled"
			])]);
		};
	}
});
//#endregion
//#region src/components/common/FormImageUpload.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1$4 = { class: "image-upload-wrapper" };
var _hoisted_2$1 = { class: "flex items-center gap-2" };
var _hoisted_3$1 = ["src"];
var _hoisted_4$1 = {
	key: 1,
	class: "pi pi-image text-xl text-smoke-400"
};
var _hoisted_5$1 = { class: "flex flex-col gap-2" };
//#endregion
//#region src/components/common/FormImageUpload.vue
var FormImageUpload_default = /* @__PURE__ */ defineComponent({
	__name: "FormImageUpload",
	props: { modelValue: {} },
	emits: ["update:modelValue"],
	setup(__props, { emit: __emit }) {
		const emit = __emit;
		const fileInput = ref(null);
		const triggerFileInput = () => {
			fileInput.value?.click();
		};
		const handleFileUpload = (event) => {
			const target = event.target;
			if (target.files && target.files[0]) {
				const file = target.files[0];
				const reader = new FileReader();
				reader.onload = (e) => {
					emit("update:modelValue", e.target?.result);
				};
				reader.readAsDataURL(file);
			}
		};
		const clearImage = () => {
			emit("update:modelValue", "");
			if (fileInput.value) fileInput.value.value = "";
		};
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", _hoisted_1$4, [createBaseVNode("div", _hoisted_2$1, [createBaseVNode("div", { class: normalizeClass(["preview-box flex size-16 items-center justify-center rounded-sm border p-2", { "bg-base-background": !__props.modelValue }]) }, [__props.modelValue ? (openBlock(), createElementBlock("img", {
				key: 0,
				src: __props.modelValue,
				class: "max-h-full max-w-full object-contain"
			}, null, 8, _hoisted_3$1)) : (openBlock(), createElementBlock("i", _hoisted_4$1))], 2), createBaseVNode("div", _hoisted_5$1, [createVNode(Button_default, {
				size: "sm",
				onClick: triggerFileInput
			}, {
				default: withCtx(() => [_cache[0] || (_cache[0] = createBaseVNode("i", { class: "pi pi-upload" }, null, -1)), createTextVNode(" " + toDisplayString(_ctx.$t("g.upload")), 1)]),
				_: 1
			}), __props.modelValue ? (openBlock(), createBlock(Button_default, {
				key: 0,
				class: "w-full",
				variant: "destructive",
				size: "sm",
				"aria-label": _ctx.$t("g.delete"),
				onClick: clearImage
			}, {
				default: withCtx(() => [..._cache[1] || (_cache[1] = [createBaseVNode("i", { class: "pi pi-trash" }, null, -1)])]),
				_: 1
			}, 8, ["aria-label"])) : createCommentVNode("", true)])]), createBaseVNode("input", {
				ref_key: "fileInput",
				ref: fileInput,
				type: "file",
				class: "hidden",
				accept: "image/*",
				onChange: handleFileUpload
			}, null, 544)]);
		};
	}
});
//#endregion
//#region src/components/common/FormNumberField.vue
var FormNumberField_default = /* @__PURE__ */ defineComponent({
	__name: "FormNumberField",
	props: /*@__PURE__*/ mergeModels({
		id: {},
		min: {},
		max: {},
		step: {},
		disabled: { type: Boolean },
		ariaLabelledby: {}
	}, {
		"modelValue": {},
		"modelModifiers": {}
	}),
	emits: ["update:modelValue"],
	setup(__props) {
		const modelValue = useModel(__props, "modelValue");
		return (_ctx, _cache) => {
			return openBlock(), createBlock(NumberField_default, {
				id: __props.id,
				modelValue: modelValue.value,
				"onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => modelValue.value = $event),
				min: __props.min,
				max: __props.max,
				step: __props.step,
				disabled: __props.disabled,
				class: "w-32"
			}, {
				default: withCtx(() => [
					createVNode(NumberFieldDecrement_default),
					createVNode(NumberFieldInput_default, { "aria-labelledby": __props.ariaLabelledby }, null, 8, ["aria-labelledby"]),
					createVNode(NumberFieldIncrement_default)
				]),
				_: 1
			}, 8, [
				"id",
				"modelValue",
				"min",
				"max",
				"step",
				"disabled"
			]);
		};
	}
});
//#endregion
//#region src/components/common/FormRadioGroup.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1$3 = ["for"];
//#endregion
//#region src/components/common/FormRadioGroup.vue
var FormRadioGroup_default = /* @__PURE__ */ defineComponent({
	__name: "FormRadioGroup",
	props: /*@__PURE__*/ mergeModels({
		options: { default: () => [] },
		id: {}
	}, {
		"modelValue": {},
		"modelModifiers": {}
	}),
	emits: ["update:modelValue"],
	setup(__props) {
		const modelValue = useModel(__props, "modelValue");
		const normalizedOptions = computed(() => __props.options.map((option) => typeof option === "string" ? {
			text: option,
			value: option
		} : {
			text: option.text,
			value: option.value ?? option.text
		}));
		return (_ctx, _cache) => {
			return openBlock(), createBlock(RadioGroup_default, {
				modelValue: modelValue.value,
				"onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => modelValue.value = $event),
				name: __props.id,
				orientation: "horizontal",
				class: "gap-4"
			}, {
				default: withCtx(() => [(openBlock(true), createElementBlock(Fragment, null, renderList(normalizedOptions.value, (option) => {
					return openBlock(), createElementBlock("div", {
						key: option.value,
						class: "flex items-center"
					}, [createVNode(RadioGroupItem_default, {
						id: `${__props.id}-${option.value}`,
						value: option.value
					}, null, 8, ["id", "value"]), createBaseVNode("label", {
						for: `${__props.id}-${option.value}`,
						class: "ml-2 cursor-pointer"
					}, toDisplayString(option.text), 9, _hoisted_1$3)]);
				}), 128))]),
				_: 1
			}, 8, ["modelValue", "name"]);
		};
	}
});
//#endregion
//#region src/components/common/InputKnob.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1$2 = { class: "flex items-center gap-2" };
//#endregion
//#region src/components/common/InputKnob.vue
var InputKnob_default = /* @__PURE__ */ defineComponent({
	inheritAttrs: false,
	__name: "InputKnob",
	props: {
		modelValue: {},
		min: {},
		max: {},
		step: {},
		resolution: {},
		disabled: { type: Boolean },
		ariaLabel: {},
		ariaLabelledby: {}
	},
	emits: ["update:modelValue"],
	setup(__props, { emit: __emit }) {
		const emit = __emit;
		const displayValue = (value) => {
			const stepString = (__props.step ?? 1).toString();
			const stepResolution = stepString.includes(".") ? stepString.split(".")[1].length : 0;
			return value.toFixed(__props.resolution ?? stepResolution);
		};
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", _hoisted_1$2, [createVNode(unref(script), mergeProps({
				"model-value": __props.modelValue,
				"value-template": displayValue,
				class: "w-32",
				min: __props.min,
				max: __props.max,
				step: __props.step,
				disabled: __props.disabled,
				"aria-label": __props.ariaLabel,
				"aria-labelledby": __props.ariaLabelledby
			}, _ctx.$attrs, { "onUpdate:modelValue": _cache[0] || (_cache[0] = (value) => emit("update:modelValue", value)) }), null, 16, [
				"model-value",
				"min",
				"max",
				"step",
				"disabled",
				"aria-label",
				"aria-labelledby"
			]), createVNode(NumberField_default, {
				"model-value": __props.modelValue,
				class: "w-32",
				"format-options": { maximumFractionDigits: 3 },
				min: __props.min,
				max: __props.max,
				step: __props.step,
				"step-snapping": "",
				disabled: __props.disabled,
				"onUpdate:modelValue": _cache[1] || (_cache[1] = (value) => emit("update:modelValue", value))
			}, {
				default: withCtx(() => [
					createVNode(NumberFieldDecrement_default),
					createVNode(NumberFieldInput_default, {
						"aria-label": __props.ariaLabel,
						"aria-labelledby": __props.ariaLabelledby
					}, null, 8, ["aria-label", "aria-labelledby"]),
					createVNode(NumberFieldIncrement_default)
				]),
				_: 1
			}, 8, [
				"model-value",
				"min",
				"max",
				"step",
				"disabled"
			])]);
		};
	}
});
//#endregion
//#region src/components/common/InputSlider.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1$1 = { class: "flex items-center gap-2" };
//#endregion
//#region src/components/common/InputSlider.vue
var InputSlider_default = /* @__PURE__ */ defineComponent({
	inheritAttrs: false,
	__name: "InputSlider",
	props: {
		modelValue: {},
		min: {},
		max: {},
		step: {},
		disabled: { type: Boolean },
		ariaLabel: {},
		ariaLabelledby: {}
	},
	emits: ["update:modelValue"],
	setup(__props, { emit: __emit }) {
		const emit = __emit;
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", _hoisted_1$1, [createVNode(Slider_default, mergeProps({
				"model-value": [__props.modelValue],
				class: "w-20",
				min: __props.min,
				max: __props.max,
				step: __props.step,
				disabled: __props.disabled,
				"aria-label": __props.ariaLabel,
				"aria-labelledby": __props.ariaLabelledby
			}, _ctx.$attrs, { "onUpdate:modelValue": _cache[0] || (_cache[0] = (value) => value && emit("update:modelValue", value[0])) }), null, 16, [
				"model-value",
				"min",
				"max",
				"step",
				"disabled",
				"aria-label",
				"aria-labelledby"
			]), createVNode(NumberField_default, {
				"model-value": __props.modelValue,
				class: "w-32",
				"format-options": { maximumFractionDigits: 3 },
				min: __props.min,
				max: __props.max,
				step: __props.step,
				"step-snapping": "",
				disabled: __props.disabled,
				"onUpdate:modelValue": _cache[1] || (_cache[1] = (value) => emit("update:modelValue", value))
			}, {
				default: withCtx(() => [
					createVNode(NumberFieldDecrement_default),
					createVNode(NumberFieldInput_default, {
						"aria-label": __props.ariaLabel,
						"aria-labelledby": __props.ariaLabelledby
					}, null, 8, ["aria-label", "aria-labelledby"]),
					createVNode(NumberFieldIncrement_default)
				]),
				_: 1
			}, 8, [
				"model-value",
				"min",
				"max",
				"step",
				"disabled"
			])]);
		};
	}
});
//#endregion
//#region packages/shared-frontend-utils/src/networkUtil.ts
var VALID_STATUS_CODES = [
	200,
	201,
	301,
	302,
	307,
	308
];
var checkUrlReachable = async (url) => {
	try {
		const response = await axios.head(url);
		return VALID_STATUS_CODES.includes(response.status);
	} catch {
		return false;
	}
};
//#endregion
//#region src/utils/validationUtil.ts
var ValidationState = /* @__PURE__ */ function(ValidationState) {
	ValidationState["IDLE"] = "IDLE";
	ValidationState["LOADING"] = "LOADING";
	ValidationState["VALID"] = "VALID";
	ValidationState["INVALID"] = "INVALID";
	return ValidationState;
}({});
//#endregion
//#region src/components/common/UrlInput.vue
var UrlInput_default = /* @__PURE__ */ defineComponent({
	inheritAttrs: false,
	__name: "UrlInput",
	props: {
		modelValue: {},
		validateUrlFn: { type: Function },
		disabled: {
			type: Boolean,
			default: false
		}
	},
	emits: ["update:modelValue", "state-change"],
	setup(__props, { emit: __emit }) {
		const emit = __emit;
		const validationState = ref(ValidationState.IDLE);
		const validationIcon = computed(() => {
			switch (validationState.value) {
				case ValidationState.LOADING: return "icon-[lucide--loader-circle] animate-spin text-muted-foreground";
				case ValidationState.VALID: return "icon-[lucide--check] text-success-background";
				case ValidationState.INVALID: return "icon-[lucide--x] text-destructive-background";
				default: return;
			}
		});
		const cleanInput = (value) => value ? value.replace(/\s+/g, "") : "";
		const internalValue = ref(cleanInput(__props.modelValue));
		watch(() => __props.modelValue, async (newValue) => {
			internalValue.value = cleanInput(newValue);
			await validateUrl(newValue);
		});
		watch(validationState, (newState) => {
			emit("state-change", newState);
		});
		onMounted(async () => {
			await validateUrl(__props.modelValue);
		});
		const handleInput = (value) => {
			const cleaned = cleanInput(String(value ?? ""));
			internalValue.value = cleaned;
			validationState.value = ValidationState.IDLE;
		};
		const handleBlur = async () => {
			const input = cleanInput(internalValue.value);
			let normalizedUrl = input;
			try {
				normalizedUrl = new URL(input).toString();
			} catch {}
			emit("update:modelValue", normalizedUrl);
		};
		const defaultValidateUrl = async (url) => {
			if (!isValidUrl(url)) return false;
			try {
				return await checkUrlReachable(url);
			} catch {
				return false;
			}
		};
		const validateUrl = async (value) => {
			if (validationState.value === ValidationState.LOADING) return;
			const url = cleanInput(value);
			validationState.value = ValidationState.IDLE;
			if (!url) return;
			validationState.value = ValidationState.LOADING;
			try {
				const isValid = await (__props.validateUrlFn ?? defaultValidateUrl)(url);
				validationState.value = isValid ? ValidationState.VALID : ValidationState.INVALID;
			} catch {
				validationState.value = ValidationState.INVALID;
			}
		};
		return (_ctx, _cache) => {
			return openBlock(), createBlock(InputGroup_default, null, {
				default: withCtx(() => [createVNode(InputGroupInput_default, mergeProps({ "model-value": internalValue.value }, _ctx.$attrs, {
					disabled: __props.disabled,
					"aria-invalid": validationState.value === unref(ValidationState).INVALID,
					"onUpdate:modelValue": handleInput,
					onBlur: handleBlur
				}), null, 16, [
					"model-value",
					"disabled",
					"aria-invalid"
				]), withDirectives(createVNode(InputGroupAddon_default, { align: "inline-end" }, {
					default: withCtx(() => [createVNode(InputGroupButton_default, {
						size: "icon-sm",
						"aria-label": _ctx.$t("g.validate"),
						disabled: __props.disabled || validationState.value === unref(ValidationState).LOADING,
						"data-validation-state": validationState.value,
						onClick: _cache[0] || (_cache[0] = ($event) => validateUrl(__props.modelValue))
					}, {
						default: withCtx(() => [createBaseVNode("i", { class: normalizeClass(unref(cn)(validationIcon.value, "size-4")) }, null, 2)]),
						_: 1
					}, 8, [
						"aria-label",
						"disabled",
						"data-validation-state"
					])]),
					_: 1
				}, 512), [[vShow, validationState.value !== unref(ValidationState).IDLE]])]),
				_: 1
			});
		};
	}
});
//#endregion
//#region src/components/common/FormItem.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1 = { class: "flex min-h-8 flex-row items-center gap-2" };
var _hoisted_2 = { class: "flex grow items-center" };
var _hoisted_3 = ["id"];
var _hoisted_4 = {
	key: 0,
	class: "pi pi-info-circle bg-transparent"
};
var _hoisted_5 = { class: "flex justify-end" };
//#endregion
//#region src/components/common/FormItem.vue
var FormItem_default = /* @__PURE__ */ defineComponent({
	__name: "FormItem",
	props: /*@__PURE__*/ mergeModels({
		item: {},
		id: {},
		labelClass: {}
	}, {
		"formValue": {},
		"formValueModifiers": {}
	}),
	emits: ["update:formValue"],
	setup(__props) {
		const formValue = useModel(__props, "formValue");
		const props = __props;
		function getFormAttrs(item) {
			const attrs = { ...item.attrs };
			const inputType = item.type;
			if (typeof inputType === "function") attrs["renderFunction"] = () => inputType(props.item.name, (v) => formValue.value = v, formValue.value, item.attrs);
			switch (item.type) {
				case "combo":
				case "radio": {
					const options = typeof item.options === "function" ? item.options(formValue.value) : item.options;
					attrs["options"] = item.type === "combo" ? options?.map((option) => typeof option === "string" ? {
						name: option,
						value: option
					} : {
						name: option.text,
						value: option.value ?? option.text
					}) : options;
					attrs["class"] = "w-44";
					break;
				}
				case "text": attrs["class"] = "w-44";
			}
			return attrs;
		}
		function getFormComponent(item) {
			if (typeof item.type === "function") return CustomFormValue_default;
			switch (item.type) {
				case "boolean": return Switch_default;
				case "number": return FormNumberField_default;
				case "slider": return InputSlider_default;
				case "knob": return InputKnob_default;
				case "combo": return SingleSelect_default;
				case "radio": return FormRadioGroup_default;
				case "image": return FormImageUpload_default;
				case "color": return FormColorPicker_default;
				case "url": return UrlInput_default;
				case "backgroundImage": return BackgroundImageUpload_default;
				default: return Input_default;
			}
		}
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", _hoisted_1, [createBaseVNode("div", _hoisted_2, [createBaseVNode("span", {
				id: `${props.id}-label`,
				class: normalizeClass(["text-sm text-muted", props.labelClass])
			}, [
				renderSlot(_ctx.$slots, "name-prefix"),
				createTextVNode(" " + toDisplayString(props.item.name) + " ", 1),
				props.item.tooltip ? withDirectives((openBlock(), createElementBlock("i", _hoisted_4, null, 512)), [[unref(vSettingInfo), props.item.tooltip]]) : createCommentVNode("", true),
				renderSlot(_ctx.$slots, "name-suffix")
			], 10, _hoisted_3)]), createBaseVNode("div", _hoisted_5, [(openBlock(), createBlock(resolveDynamicComponent(markRaw(getFormComponent(props.item))), mergeProps({
				id: props.id,
				"model-value": formValue.value,
				"onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => formValue.value = $event),
				"aria-labelledby": `${props.id}-label`
			}, getFormAttrs(props.item)), null, 16, [
				"id",
				"model-value",
				"aria-labelledby"
			]))])]);
		};
	}
});
//#endregion
//#region src/stores/serverConfigStore.ts
var useServerConfigStore = defineStore("serverConfig", () => {
	const serverConfigById = ref({});
	const serverConfigs = computed(() => {
		return Object.values(serverConfigById.value);
	});
	const modifiedConfigs = computed(() => {
		return serverConfigs.value.filter((config) => {
			return config.initialValue !== config.value;
		});
	});
	const revertChanges = () => {
		for (const config of modifiedConfigs.value) config.value = config.initialValue;
	};
	const serverConfigsByCategory = computed(() => {
		const categories = /* @__PURE__ */ new Map();
		for (const config of serverConfigs.value) {
			const category = config.category?.[0] ?? "General";
			const configs = categories.get(category) ?? [];
			configs.push(config);
			categories.set(category, configs);
		}
		return Object.fromEntries(categories);
	});
	const serverConfigValues = computed(() => {
		return Object.fromEntries(serverConfigs.value.map((config) => {
			return [config.id, config.value === config.defaultValue || config.value === null || config.value === void 0 ? void 0 : config.value];
		}));
	});
	const launchArgs = computed(() => {
		const args = Object.assign({}, ...serverConfigs.value.map((config) => {
			if (config.value === config.defaultValue || config.value === null || config.value === void 0) return {};
			return config.getValue ? config.getValue(config.value) : { [config.id]: config.value };
		}));
		return Object.fromEntries(Object.entries(args).map(([key, value]) => {
			if (value === true) return [key, ""];
			return [key, value.toString()];
		}));
	});
	const commandLineArgs = computed(() => {
		return Object.entries(launchArgs.value).map(([key, value]) => [`--${key}`, value]).flat().filter((arg) => arg !== "").join(" ");
	});
	function loadServerConfig(configs, values) {
		for (const config of configs) {
			const value = values[config.id] ?? config.defaultValue;
			serverConfigById.value[config.id] = {
				...config,
				value,
				initialValue: value
			};
		}
	}
	return {
		serverConfigById,
		serverConfigs,
		modifiedConfigs,
		serverConfigsByCategory,
		serverConfigValues,
		launchArgs,
		commandLineArgs,
		revertChanges,
		loadServerConfig
	};
});
//#endregion
export { FormItem_default as n, startDetailPopovers as r, useServerConfigStore as t };
