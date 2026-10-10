import "./rolldown-runtime-xtsTai4I.js";
import { Lt as ref, P as computed } from "./vendor-vue-core-C1utdb0s.js";
import { U as useStorage } from "./vendor-vueuse-BxKIIsKg.js";
//#region src/platform/remoteConfig/remoteConfig.ts
/**
* Remote configuration service
*
* Fetches configuration from the server at runtime, enabling:
* - Feature flags without rebuilding
* - Server-side feature discovery
* - Version compatibility management
* - Avoiding vendor lock-in for native apps
*
* This module is tree-shaken in OSS builds.
*/
/**
* Current load state of remote configuration
*/
var remoteConfigState = ref("unloaded");
var authenticatedRemoteConfigState = ref("unloaded");
var remoteConfigRevision = ref(0);
var remoteConfigErrorStatus = ref(null);
/** Whether the authenticated config has been loaded. */
var isAuthenticatedConfigLoaded = computed(() => authenticatedRemoteConfigState.value === "authenticated");
/**
* Reactive remote configuration
* Updated whenever config is loaded from the server
*/
var remoteConfig = ref({});
function configValueOrDefault(remoteConfig, key, defaultValue) {
	return remoteConfig[key] || defaultValue;
}
var cachedBillingControlEnabled = useStorage("billing_control_enabled", void 0);
var cachedLegacyBillingMigrationEnabled = ref();
/**
* Last authenticated answer for the agent allowlist, so a transient /features
* failure cannot unmount the panel mid-session. Deliberately NOT `useStorage`
* like its neighbours above: a persisted grant is what let two browsers
* disagree for one account (PM-1707).
*/
var sessionAgentGrant = ref();
var sessionAgentGrantValidUntil = ref();
var cachedV1PaymentRecovery = useStorage("v1_payment_recovery", void 0);
//#endregion
export { configValueOrDefault as a, remoteConfigErrorStatus as c, sessionAgentGrant as d, sessionAgentGrantValidUntil as f, cachedV1PaymentRecovery as i, remoteConfigRevision as l, cachedBillingControlEnabled as n, isAuthenticatedConfigLoaded as o, cachedLegacyBillingMigrationEnabled as r, remoteConfig as s, authenticatedRemoteConfigState as t, remoteConfigState as u };
