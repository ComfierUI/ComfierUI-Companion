import "./rolldown-runtime-xtsTai4I.js";
import { G as defineComponent, Jt as normalizeClass, Kt as unref, Lt as ref, P as computed, R as createElementBlock, St as watch, lt as openBlock } from "./vendor-vue-core-C1utdb0s.js";
import { t as cn } from "./src-DI1bBfrb.js";
//#region src/components/common/UserAvatar.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1 = [
	"src",
	"alt",
	"aria-label"
];
var _hoisted_2 = ["aria-label"];
//#endregion
//#region src/components/common/UserAvatar.vue
var UserAvatar_default = /* @__PURE__ */ defineComponent({
	__name: "UserAvatar",
	props: {
		photoUrl: {},
		ariaLabel: {},
		iconClass: { default: "size-4" },
		size: { default: "normal" }
	},
	setup(__props) {
		const imageError = ref(false);
		const handleImageError = () => {
			imageError.value = true;
		};
		const hasAvatar = computed(() => __props.photoUrl && !imageError.value);
		watch(() => __props.photoUrl, () => {
			imageError.value = false;
		});
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("span", { class: normalizeClass(unref(cn)("inline-flex aspect-square items-center justify-center overflow-hidden rounded-full bg-interface-panel-selected-surface", __props.size === "large" ? "size-12" : "size-8")) }, [hasAvatar.value ? (openBlock(), createElementBlock("img", {
				key: 0,
				src: __props.photoUrl ?? void 0,
				alt: __props.ariaLabel ?? _ctx.$t("auth.login.userAvatar"),
				"aria-label": __props.ariaLabel ?? _ctx.$t("auth.login.userAvatar"),
				class: "size-full object-cover",
				onError: handleImageError
			}, null, 40, _hoisted_1)) : (openBlock(), createElementBlock("i", {
				key: 1,
				"data-testid": "avatar-icon",
				"aria-label": __props.ariaLabel ?? _ctx.$t("auth.login.userAvatar"),
				class: normalizeClass(unref(cn)("icon-[lucide--user]", __props.iconClass))
			}, null, 10, _hoisted_2))], 2);
		};
	}
});
//#endregion
export { UserAvatar_default as t };
