import "./rolldown-runtime-xtsTai4I.js";
import { Ct as watchEffect, Lt as ref, P as computed, d as defineStore } from "./vendor-vue-core-C1utdb0s.js";
import { i as api } from "./api-Bt-fGt5a.js";
//#region src/stores/userStore.ts
var useUserStore = defineStore("user", () => {
	/**
	* The user config. null if not loaded.
	*/
	const userConfig = ref(null);
	/**
	* The current user id. null if not logged in or in single user mode.
	*/
	const currentUserId = ref(null);
	const isMultiUserServer = computed(() => userConfig.value && "users" in userConfig.value);
	const needsLogin = computed(() => !currentUserId.value && isMultiUserServer.value);
	const users = computed(() => Object.entries(userConfig.value?.users ?? {}).map(([userId, username]) => ({
		userId,
		username
	})));
	const currentUser = computed(() => users.value.find((user) => user.userId === currentUserId.value) ?? null);
	const initialized = computed(() => userConfig.value !== null);
	let initializePromise = null;
	/**
	* Initialize the user store.
	*/
	async function initialize() {
		initializePromise ??= (async () => {
			try {
				userConfig.value = await api.getUserConfig();
				currentUserId.value = localStorage["Comfy.userId"];
			} catch (err) {
				initializePromise = null;
				throw err;
			}
		})();
		return initializePromise;
	}
	/**
	* Create a new user.
	*
	* @param username - The username.
	* @returns The new user.
	*/
	async function createUser(username) {
		const resp = await api.createUser(username);
		const data = await resp.json();
		if (resp.status >= 300) throw new Error(data.error ?? "Error creating user: " + resp.status + " " + resp.statusText);
		return {
			userId: data,
			username
		};
	}
	/**
	* Login the current user.
	*
	* @param user - The user.
	*/
	async function login({ userId, username }) {
		currentUserId.value = userId;
		localStorage["Comfy.userId"] = userId;
		localStorage["Comfy.userName"] = username;
	}
	watchEffect(() => {
		if (isMultiUserServer.value && currentUserId.value) api.user = currentUserId.value;
	});
	/**
	* Logout the current user.
	*/
	async function logout() {
		delete localStorage["Comfy.userId"];
		delete localStorage["Comfy.userName"];
	}
	return {
		users,
		currentUser,
		isMultiUserServer,
		needsLogin,
		initialized,
		initialize,
		createUser,
		login,
		logout
	};
});
//#endregion
export { useUserStore as t };
