const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./module-BHfLvA66.js","./vendor-other-BPEcPQTD.js","./rolldown-runtime-xtsTai4I.js","./vendor-three-DQpYrwAh.js","./vendor-vue-core-C1utdb0s.js","./vendor-zod-TMj9Wsdv.js","./vendor-tiptap-BT_4t92m.js","./vendor-other-DODGPXtn.css"])))=>i.map(i=>d[i]);
import "./rolldown-runtime-xtsTai4I.js";
import { a as __vitePreload } from "./vendor-datadog-DudeEV66.js";
import { Lt as ref, P as computed, d as defineStore } from "./vendor-vue-core-C1utdb0s.js";
import { i as api } from "./api-Bt-fGt5a.js";
import { n as zAgentSkillListResponse, t as zAgentSkill } from "./zod.gen-C09SPgBJ.js";
import { n as reportError } from "./reportError-LG-zfbNw.js";
import { u as parseErrorResponse } from "./DialogPortal-B3D-ZhO6.js";
//#region src/platform/skills/types.ts
/** `maxLength` from the spec, counted in code points as JSON Schema defines it. */
var MAX_DESCRIPTION_CODE_POINTS = 1024;
/** All-dot names are excluded because clients normalize `.` and `..` paths. */
var PACK_NAME_PATTERN = /^[A-Za-z0-9._-]*[A-Za-z0-9_-][A-Za-z0-9._-]*$/;
/** Only always-on built-ins are reserved; on-demand built-ins are shadowable. */
var RESERVED_PACK_NAMES = [
	"building",
	"comfy-cloud",
	"canvas-tabs"
];
var CONTROL_CHARACTERS = /[\p{Cc}\u2028\u2029]/u;
function utf8ByteLength(value) {
	return new TextEncoder().encode(value).length;
}
function codePointLength(value) {
	return Array.from(value).length;
}
/** Description + body, the unit the per-user total-bytes budget is counted in. */
function packByteSize(pack) {
	return utf8ByteLength(pack.description) + utf8ByteLength(pack.body);
}
//#endregion
//#region src/platform/skills/api/skillsApi.ts
/**
* 400 is corrective; 409 is capacity. List/publish 404 hides the feature,
* while delete 404 can also mean the pack is already gone.
*/
var SkillPacksApiError = class extends Error {
	status;
	constructor(message, status) {
		super(message);
		this.status = status;
		this.name = "SkillPacksApiError";
	}
};
/**
* Agent responses use `{ error }`; ingest uses the canonical ErrorResponse.
* Preserve either producer's message, preferring explicit `message` fields.
*/
async function toApiError(response) {
	const body = await response.clone().json().catch(() => void 0);
	if (typeof body === "object" && body !== null && !("message" in body) && "error" in body && typeof body.error === "string") return new SkillPacksApiError(body.error, response.status);
	return new SkillPacksApiError((await parseErrorResponse(response)).message, response.status);
}
async function listSkillPacks() {
	const response = await api.fetchApi("/agent/skills");
	if (!response.ok) throw await toApiError(response);
	return zAgentSkillListResponse.parse(await response.json()).skills;
}
/** Publishing an existing name replaces that pack. */
async function publishSkillPack(payload) {
	const response = await api.fetchApi("/agent/skills", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(payload)
	});
	if (!response.ok) throw await toApiError(response);
	return zAgentSkill.parse(await response.json());
}
async function deleteSkillPack(name) {
	if (name.length > 64 || !PACK_NAME_PATTERN.test(name)) throw new SkillPacksApiError("Invalid skill pack name", 400);
	const response = await api.fetchApi(`/agent/skills/${encodeURIComponent(name)}`, { method: "DELETE" });
	if (!response.ok) throw await toApiError(response);
}
//#endregion
//#region src/platform/skills/stores/skillPacksStore.ts
var AGENT_EXPERIENCE_FLAG = "agent-in-app-experience";
var SKILL_PACKS_FLAG = "agent-skill-packs";
var useSkillPacksStore = defineStore("skillPacks", () => {
	const packs = ref([]);
	const loading = ref(false);
	const hasLoaded = ref(false);
	const flagsEnabled = ref(false);
	const routesAvailable = ref(true);
	const enabled = computed(() => flagsEnabled.value && routesAvailable.value);
	let flagGateStarted = false;
	let fetchGeneration = 0;
	async function startFlagGate() {
		if (flagGateStarted) {
			if (flagsEnabled.value && !routesAvailable.value) fetchPacks().catch(reportFetchFailure);
			return;
		}
		flagGateStarted = true;
		try {
			const { default: posthog } = await __vitePreload(async () => {
				const { default: posthog } = await import("./module-BHfLvA66.js");
				return { default: posthog };
			}, __vite__mapDeps([0,1,2,3,4,5,6,7]), import.meta.url);
			const sync = () => {
				const wasEnabled = flagsEnabled.value;
				flagsEnabled.value = posthog.isFeatureEnabled(AGENT_EXPERIENCE_FLAG) === true && posthog.isFeatureEnabled(SKILL_PACKS_FLAG) === true;
				if (!wasEnabled && flagsEnabled.value) fetchPacks().catch(reportFetchFailure);
			};
			posthog.onFeatureFlags((_flags, _variants, context) => {
				if (context?.errorsLoading) return;
				sync();
			});
			sync();
		} catch (error) {
			flagGateStarted = false;
			reportError(error, {
				errorType: "agent_skill_packs_flag_gate_failure",
				surface: "agent"
			});
		}
	}
	function reportFetchFailure(error) {
		reportError(error, {
			errorType: "error_fetching_agent_skill_packs",
			surface: "agent"
		});
	}
	async function fetchPacks() {
		const generation = ++fetchGeneration;
		loading.value = true;
		try {
			const nextPacks = await listSkillPacks();
			if (generation !== fetchGeneration) return;
			packs.value = nextPacks;
			hasLoaded.value = true;
			routesAvailable.value = true;
		} catch (error) {
			if (generation !== fetchGeneration) return;
			if (error instanceof SkillPacksApiError && error.status === 404) {
				markUnavailable();
				return;
			}
			throw error;
		} finally {
			if (generation === fetchGeneration) loading.value = false;
		}
	}
	function upsertPack(pack) {
		fetchGeneration++;
		loading.value = false;
		hasLoaded.value = true;
		const rest = packs.value.filter((existing) => existing.name !== pack.name);
		packs.value = [...rest, pack].sort((a, b) => a.name.localeCompare(b.name));
	}
	function removePack(name) {
		fetchGeneration++;
		loading.value = false;
		packs.value = packs.value.filter((pack) => pack.name !== name);
	}
	function markUnavailable() {
		fetchGeneration++;
		loading.value = false;
		routesAvailable.value = false;
		hasLoaded.value = false;
		packs.value = [];
	}
	return {
		packs,
		loading,
		hasLoaded,
		enabled,
		flagsEnabled,
		routesAvailable,
		startFlagGate,
		fetchPacks,
		upsertPack,
		removePack,
		markUnavailable
	};
});
//#endregion
export { CONTROL_CHARACTERS as a, RESERVED_PACK_NAMES as c, utf8ByteLength as d, publishSkillPack as i, codePointLength as l, SkillPacksApiError as n, MAX_DESCRIPTION_CODE_POINTS as o, deleteSkillPack as r, PACK_NAME_PATTERN as s, useSkillPacksStore as t, packByteSize as u };
