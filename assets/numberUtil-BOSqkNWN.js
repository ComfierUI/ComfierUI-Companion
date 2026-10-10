import "./rolldown-runtime-xtsTai4I.js";
import { Lt as clamp } from "./vendor-other-BPEcPQTD.js";
import { Bt as shallowRef, It as readonly, Lt as ref, P as computed, St as watch, d as defineStore } from "./vendor-vue-core-C1utdb0s.js";
import { Wl as useTeamWorkspaceStore } from "./layoutStore-CZsuzg91.js";
import { i as api } from "./api-Bt-fGt5a.js";
import { _ as objectType, b as stringType, c as booleanType, s as arrayType } from "./vendor-zod-TMj9Wsdv.js";
import { t as useFeatureFlags } from "./useFeatureFlags-DAoj_aDd.js";
//#region src/platform/settings/composables/useSettingsHeaderCollapse.ts
/**
* Collapses the workspace header in the settings dialog once a workspace panel
* is scrolled, so the panel's controls can take the header's row alongside the
* close button. Shared module state: the dialog is a singleton, and the panel
* that owns the scroller is not the component that renders the header.
*/
var isHeaderCollapsed = ref(false);
/**
* Separate thresholds because collapsing feeds back into its own input:
* lifting the controls row out of the panel body grows the scroller's viewport
* and shrinks its overflow, which can clamp scrollTop back down. With a single
* threshold that clamp re-expands the header, which restores the overflow, and
* a marginally-scrollable panel flip-flops.
*/
var COLLAPSE_ABOVE_PX = 24;
var EXPAND_BELOW_PX = 4;
function useSettingsHeaderCollapse() {
	function handlePanelScroll(event) {
		const scroller = event.target;
		if (!(scroller instanceof HTMLElement)) return;
		const { scrollTop } = scroller;
		if (!isHeaderCollapsed.value && scrollTop > COLLAPSE_ABOVE_PX) isHeaderCollapsed.value = true;
		else if (isHeaderCollapsed.value && scrollTop < EXPAND_BELOW_PX) isHeaderCollapsed.value = false;
	}
	function resetHeaderCollapse() {
		isHeaderCollapsed.value = false;
	}
	return {
		isHeaderCollapsed: readonly(isHeaderCollapsed),
		handlePanelScroll,
		resetHeaderCollapse
	};
}
//#endregion
//#region src/platform/workspace/api/partnerNodePolicyApi.ts
var partnerProviderSchema = objectType({
	provider_id: stringType(),
	display_name: stringType(),
	node_categories: arrayType(stringType())
});
var partnerProviderCatalogResponseSchema = objectType({ providers: arrayType(partnerProviderSchema) });
var partnerProviderPolicyEntrySchema = objectType({
	provider_id: stringType(),
	enabled: booleanType()
});
var partnerNodePolicyResponseSchema = objectType({
	enforcement_enabled: booleanType(),
	providers: arrayType(partnerProviderPolicyEntrySchema)
});
var PartnerNodePolicyApiError = class extends Error {
	status;
	constructor(status, message) {
		super(message);
		this.status = status;
		this.name = "PartnerNodePolicyApiError";
	}
};
function normalizePolicy(data) {
	return {
		enforcementEnabled: data.enforcement_enabled,
		providers: data.providers.map(({ provider_id, enabled }) => ({
			providerId: provider_id,
			enabled
		}))
	};
}
function throwResponseError(response) {
	throw new PartnerNodePolicyApiError(response.status, response.statusText);
}
async function getPartnerProviders() {
	const response = await api.fetchApi("/providers", { cache: "no-store" });
	if (!response.ok) throwResponseError(response);
	return partnerProviderCatalogResponseSchema.parse(await response.json()).providers.map(({ provider_id, display_name, node_categories }) => ({
		id: provider_id,
		displayName: display_name,
		nodeCategories: node_categories
	}));
}
async function getPartnerNodePolicy() {
	const response = await api.fetchApi("/workspace/provider-policy", { cache: "no-store" });
	if (response.status === 404) return null;
	if (!response.ok) throwResponseError(response);
	return normalizePolicy(partnerNodePolicyResponseSchema.parse(await response.json()));
}
async function updatePartnerNodePolicy(policy) {
	const response = await api.fetchApi("/workspace/provider-policy", {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			enforcement_enabled: policy.enforcementEnabled,
			providers: policy.providers.map(({ providerId, enabled }) => ({
				provider_id: providerId,
				enabled
			}))
		})
	});
	if (!response.ok) throwResponseError(response);
	return normalizePolicy(partnerNodePolicyResponseSchema.parse(await response.json()));
}
//#endregion
//#region src/platform/workspace/stores/partnerNodeGovernanceStore.ts
var usePartnerNodeGovernanceStore = defineStore("partnerNodeGovernance", () => {
	const { flags } = useFeatureFlags();
	const workspaceStore = useTeamWorkspaceStore();
	const providers = shallowRef([]);
	const policy = shallowRef(null);
	const status = ref("inactive");
	const error = shallowRef(null);
	const activeSaveIdsByWorkspace = shallowRef(/* @__PURE__ */ new Map());
	let requestVersion = 0;
	let nextSaveId = 0;
	const governedWorkspaceId = computed(() => flags.partnerNodeGovernanceEnabled ? workspaceStore.activeWorkspace?.id ?? null : null);
	const isSaving = computed(() => {
		const workspaceId = governedWorkspaceId.value;
		return workspaceId !== null && activeSaveIdsByWorkspace.value.has(workspaceId);
	});
	function createInitialPolicy() {
		return {
			enforcementEnabled: false,
			providers: providers.value.map(({ id }) => ({
				providerId: id,
				enabled: true
			}))
		};
	}
	function isProviderEnabled(providerId) {
		if (!policy.value) return true;
		return policy.value.providers.find((provider) => provider.providerId === providerId)?.enabled === true;
	}
	async function loadPolicy() {
		const workspaceId = governedWorkspaceId.value;
		const version = ++requestVersion;
		if (!workspaceId) {
			providers.value = [];
			policy.value = null;
			status.value = "inactive";
			error.value = null;
			return;
		}
		providers.value = [];
		policy.value = null;
		status.value = "loading";
		error.value = null;
		const [providersResult, policyResult] = await Promise.allSettled([getPartnerProviders(), getPartnerNodePolicy()]);
		if (version !== requestVersion || governedWorkspaceId.value !== workspaceId) return;
		const loadError = policyResult.status === "rejected" ? policyResult.reason : providersResult.status === "rejected" ? providersResult.reason : null;
		if (loadError === null) {
			const nextPolicy = policyResult.status === "fulfilled" ? policyResult.value : null;
			providers.value = providersResult.status === "fulfilled" ? providersResult.value : [];
			policy.value = nextPolicy;
			status.value = nextPolicy ? "configured" : "unconfigured";
			return;
		}
		const ineligible = loadError instanceof PartnerNodePolicyApiError && loadError.status === 403;
		providers.value = ineligible && providersResult.status === "fulfilled" ? providersResult.value : [];
		policy.value = null;
		error.value = loadError instanceof Error ? loadError : /* @__PURE__ */ new Error("Failed to load partner provider policy");
		status.value = ineligible ? "ineligible" : "error";
	}
	async function savePolicy(nextPolicy) {
		const workspaceId = governedWorkspaceId.value;
		if (!workspaceId) return;
		if (activeSaveIdsByWorkspace.value.has(workspaceId)) {
			console.error("Provider policy save already in progress");
			return;
		}
		const version = ++requestVersion;
		const saveId = ++nextSaveId;
		activeSaveIdsByWorkspace.value = new Map(activeSaveIdsByWorkspace.value).set(workspaceId, saveId);
		try {
			const savedPolicy = await updatePartnerNodePolicy(nextPolicy);
			if (version !== requestVersion || governedWorkspaceId.value !== workspaceId) return;
			policy.value = savedPolicy;
			status.value = "configured";
			error.value = null;
		} catch (saveError) {
			if (version !== requestVersion || governedWorkspaceId.value !== workspaceId) return;
			if (saveError instanceof PartnerNodePolicyApiError && saveError.status === 422) await loadPolicy();
			throw saveError;
		} finally {
			if (activeSaveIdsByWorkspace.value.get(workspaceId) === saveId) {
				const nextActiveSaveIds = new Map(activeSaveIdsByWorkspace.value);
				nextActiveSaveIds.delete(workspaceId);
				activeSaveIdsByWorkspace.value = nextActiveSaveIds;
			}
		}
	}
	async function setProviderEnabled(providerId, enabled) {
		if (!providers.value.some(({ id }) => id === providerId)) return;
		const currentPolicy = policy.value ?? createInitialPolicy();
		const nextProviders = currentPolicy.providers.find((provider) => provider.providerId === providerId) ? currentPolicy.providers.map((provider) => provider.providerId === providerId ? {
			...provider,
			enabled
		} : provider) : [...currentPolicy.providers, {
			providerId,
			enabled
		}];
		await savePolicy({
			...currentPolicy,
			enforcementEnabled: currentPolicy.enforcementEnabled || !enabled,
			providers: nextProviders
		});
	}
	async function setProvidersEnabled(providerIds, enabled) {
		const targetIds = new Set(providerIds);
		if (!providers.value.some(({ id }) => targetIds.has(id))) return;
		const currentPolicy = policy.value ?? createInitialPolicy();
		await savePolicy({
			...currentPolicy,
			enforcementEnabled: currentPolicy.enforcementEnabled || !enabled,
			providers: providers.value.map(({ id }) => targetIds.has(id) ? {
				providerId: id,
				enabled
			} : currentPolicy.providers.find(({ providerId }) => providerId === id) ?? {
				providerId: id,
				enabled: false
			})
		});
	}
	async function setAllProvidersEnabled(enabled) {
		const currentPolicy = policy.value ?? createInitialPolicy();
		await savePolicy({
			...currentPolicy,
			enforcementEnabled: currentPolicy.enforcementEnabled || !enabled,
			providers: providers.value.map(({ id }) => ({
				providerId: id,
				enabled
			}))
		});
	}
	async function setEnforcementEnabled(enabled) {
		await savePolicy({
			...policy.value ?? createInitialPolicy(),
			enforcementEnabled: enabled
		});
	}
	watch(governedWorkspaceId, () => void loadPolicy(), { immediate: true });
	return {
		providers,
		policy,
		status,
		error,
		isSaving,
		governedWorkspaceId,
		isProviderEnabled,
		loadPolicy,
		setProviderEnabled,
		setProvidersEnabled,
		setAllProvidersEnabled,
		setEnforcementEnabled
	};
});
//#endregion
//#region src/utils/numberUtil.ts
/**
* Clamp a numeric value to an integer percent in the range [0, 100].
*
* @param value Numeric value expected to be a percentage (0-100)
* @returns Integer percent between 0 and 100
*/
var clampPercentInt = (value) => {
	return clamp(Math.round(value ?? 0), 0, 100);
};
/**
* Format a percentage (0-100) using the provided locale with 0 fraction digits.
*
* @param locale BCP-47 locale string
* @param value0to100 Percent value in [0, 100]
* @returns Localized percent string, e.g. "42%"
*/
var formatPercent0 = (locale, value0to100) => {
	const v = clampPercentInt(value0to100);
	return new Intl.NumberFormat(locale, {
		style: "percent",
		maximumFractionDigits: 0
	}).format((v || 0) / 100);
};
/**
* Format a USD amount given in cents as localized currency. Whole-dollar
* amounts drop the fractional part; fractional cents render two decimals so a
* charge like 66550 cents shows as "$665.50" instead of being rounded.
*
* @param locale BCP-47 locale string
* @param cents USD amount in integer cents
* @returns Localized currency string, e.g. "$665" or "$665.50"
*/
var formatUsdCents = (locale, cents) => {
	const hasFractionalCents = cents % 100 !== 0;
	return new Intl.NumberFormat(locale, {
		style: "currency",
		currency: "USD",
		minimumFractionDigits: hasFractionalCents ? 2 : 0,
		maximumFractionDigits: hasFractionalCents ? 2 : 0
	}).format(cents / 100);
};
//#endregion
export { useSettingsHeaderCollapse as a, usePartnerNodeGovernanceStore as i, formatPercent0 as n, formatUsdCents as r, clampPercentInt as t };
