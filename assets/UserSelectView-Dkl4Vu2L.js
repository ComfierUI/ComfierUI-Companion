import "./rolldown-runtime-xtsTai4I.js";
import { Dt as withDirectives, Et as withCtx, F as createBaseVNode, G as defineComponent, H as createTextVNode, I as createBlock, Jt as normalizeClass, Kt as unref, L as createCommentVNode, Lt as ref, P as computed, R as createElementBlock, T as withKeys, U as createVNode, Zt as toDisplayString, ft as renderSlot, l as useRouter, lt as openBlock, ot as onMounted, w as vShow } from "./vendor-vue-core-C1utdb0s.js";
import { t as Button_default } from "./Button-j0oCzR82.js";
import { t as SingleSelect_default } from "./SingleSelect-CS2DGZzk.js";
import { t as Input_default } from "./Input-Cx8jjgHK.js";
import { n as isNativeWindow } from "./envUtil-2Z8ainL3.js";
import { t as Message_default } from "./Message-NRJmn_pf.js";
import { t as useUserStore } from "./userStore-DBaUQ6bl.js";
//#region src/views/templates/BaseViewTemplate.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1$1 = { class: "flex w-full grow items-center justify-center overflow-auto" };
//#endregion
//#region src/views/templates/BaseViewTemplate.vue
var BaseViewTemplate_default = /* @__PURE__ */ defineComponent({
	__name: "BaseViewTemplate",
	props: { dark: {
		type: Boolean,
		default: false
	} },
	setup(__props) {
		const topMenuRef = ref(null);
		onMounted(async () => {});
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", { class: normalizeClass(["flex h-svh w-screen flex-col font-sans", [__props.dark ? "dark-theme bg-neutral-900 text-neutral-300" : "bg-neutral-300 text-neutral-900"]]) }, [withDirectives(createBaseVNode("div", {
				ref_key: "topMenuRef",
				ref: topMenuRef,
				class: "app-drag h-(--comfy-topbar-height) w-full"
			}, null, 512), [[vShow, unref(isNativeWindow)()]]), createBaseVNode("div", _hoisted_1$1, [renderSlot(_ctx.$slots, "default")])], 2);
		};
	}
});
//#endregion
//#region src/views/UserSelectView.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1 = {
	id: "comfy-user-selection",
	class: "relative min-w-84 rounded-lg bg-(--comfy-menu-bg) p-5 px-10 shadow-lg"
};
var _hoisted_2 = { class: "flex w-full flex-col items-center" };
var _hoisted_3 = { class: "flex w-full flex-col gap-2" };
var _hoisted_4 = { for: "new-user-input" };
var _hoisted_5 = { class: "flex w-full flex-col gap-2" };
var _hoisted_6 = {
	id: "existing-user-label",
	for: "existing-user-select"
};
var _hoisted_7 = { class: "mt-5" };
//#endregion
//#region src/views/UserSelectView.vue
var UserSelectView_default = /* @__PURE__ */ defineComponent({
	__name: "UserSelectView",
	setup(__props) {
		const userStore = useUserStore();
		const router = useRouter();
		const selectedUserId = ref();
		const selectedUser = computed(() => userStore.users.find((user) => user.userId === selectedUserId.value));
		const userOptions = computed(() => userStore.users.map(({ userId, username }) => ({
			name: username,
			value: userId
		})));
		const newUsername = ref("");
		const loginError = ref("");
		const createNewUser = computed(() => newUsername.value.trim() !== "");
		const newUserExistsError = computed(() => {
			return userStore.users.find((user) => user.username === newUsername.value) ? `User "${newUsername.value}" already exists` : "";
		});
		const error = computed(() => newUserExistsError.value || loginError.value);
		const login = async () => {
			try {
				const user = createNewUser.value ? await userStore.createUser(newUsername.value) : selectedUser.value;
				if (!user) {
					console.error("No user selected");
					loginError.value = "No user selected";
					return;
				}
				await userStore.login(user);
				await router.push("/");
			} catch (err) {
				loginError.value = err instanceof Error ? err.message : JSON.stringify(err);
			}
		};
		onMounted(async () => {
			document.getElementById("splash-loader")?.remove();
			await userStore.initialize();
		});
		return (_ctx, _cache) => {
			return openBlock(), createBlock(BaseViewTemplate_default, { dark: "" }, {
				default: withCtx(() => [createBaseVNode("main", _hoisted_1, [_cache[3] || (_cache[3] = createBaseVNode("h1", { class: "my-2.5 mb-7 font-normal" }, "ComfyUI", -1)), createBaseVNode("div", _hoisted_2, [
					createBaseVNode("div", _hoisted_3, [createBaseVNode("label", _hoisted_4, toDisplayString(_ctx.$t("userSelect.newUser")) + ":", 1), createVNode(Input_default, {
						id: "new-user-input",
						modelValue: newUsername.value,
						"onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => newUsername.value = $event),
						placeholder: _ctx.$t("userSelect.enterUsername"),
						onKeyup: withKeys(login, ["enter"])
					}, null, 8, ["modelValue", "placeholder"])]),
					_cache[2] || (_cache[2] = createBaseVNode("div", { class: "my-4 w-full border-t border-interface-stroke" }, null, -1)),
					createBaseVNode("div", _hoisted_5, [
						createBaseVNode("label", _hoisted_6, toDisplayString(_ctx.$t("userSelect.existingUser")) + ":", 1),
						createVNode(SingleSelect_default, {
							id: "existing-user-select",
							modelValue: selectedUserId.value,
							"onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => selectedUserId.value = $event),
							"aria-labelledby": "existing-user-label",
							class: "w-full",
							options: userOptions.value,
							label: _ctx.$t("userSelect.selectUser"),
							disabled: createNewUser.value
						}, null, 8, [
							"modelValue",
							"options",
							"label",
							"disabled"
						]),
						error.value ? (openBlock(), createBlock(Message_default, {
							key: 0,
							severity: "error"
						}, {
							default: withCtx(() => [createTextVNode(toDisplayString(error.value), 1)]),
							_: 1
						})) : createCommentVNode("", true)
					]),
					createBaseVNode("footer", _hoisted_7, [createVNode(Button_default, { onClick: login }, {
						default: withCtx(() => [createTextVNode(toDisplayString(_ctx.$t("userSelect.next")), 1)]),
						_: 1
					})])
				])])]),
				_: 1
			});
		};
	}
});
//#endregion
export { UserSelectView_default as default };
