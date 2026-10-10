import "./rolldown-runtime-xtsTai4I.js";
import { s as remoteConfig } from "./remoteConfig-DwMQrLli.js";
//#region src/utils/devFeatureFlagOverride.ts
/**
* Gets a dev-time feature flag override from localStorage.
* Stripped from production builds via import.meta.env.DEV tree-shaking.
*
* Returns undefined (not null) as the "no override" sentinel because
* null is a valid JSON value — JSON.parse('null') returns null.
* Using undefined avoids ambiguity between "no override set" and
* "override explicitly set to null".
*
* Usage in browser console:
*   localStorage.setItem('ff:example_enabled', 'true')
*   localStorage.removeItem('ff:example_enabled')
*/
function getDevOverride(flagKey) {}
function isHostTelemetryEnabled() {
	return remoteConfig.value.enable_telemetry === true;
}
//#endregion
export { getDevOverride as n, isHostTelemetryEnabled as t };
