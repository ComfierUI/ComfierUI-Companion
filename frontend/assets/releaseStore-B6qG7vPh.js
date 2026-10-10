import "./rolldown-runtime-xtsTai4I.js";
import { G as require_semver } from "./vendor-other-BPEcPQTD.js";
import { Bt as shallowRef, It as readonly, Lt as ref, P as computed, Pt as onScopeDispose, Rt as shallowReactive, St as watch, d as defineStore, jt as getCurrentScope } from "./vendor-vue-core-C1utdb0s.js";
import { it as until, m as useBreakpoints, o as breakpointsTailwind } from "./vendor-vueuse-BxKIIsKg.js";
import { Jc as isAbortError, Kt as useAppModeStore, i as useSettingStore, kt as useAppMode, qt as useSidebarTabStore } from "./layoutStore-CZsuzg91.js";
import { n as useTelemetry } from "./telemetry-IkzvF0TI.js";
import { r as axios } from "./vendor-axios-QnwcNXlY.js";
import { t as useToastStore } from "./toastStore-CTfykAzG.js";
import { d as t, f as te } from "./i18n-C3J-ToPr.js";
import { k as stringToLocale } from "./formatUtil-DuxXRy1z.js";
import { t as getComfyApiBaseUrl } from "./comfyApi-CYSC9hA6.js";
import { t as useSystemStatsStore } from "./systemStatsStore-3gc4cifl.js";
//#region src/platform/onboarding/onboardingOverlayStore.ts
var import_semver = require_semver();
/**
* Signals onboarding overlays that live outside the tour store (the agent
* onboarding coach is the first), so the What's New popup can defer to them as
* it already does to `activeTour`. A source registers a getter and drops it on
* teardown, so an unmounted overlay cannot leak as permanently active.
*/
var useOnboardingOverlayStore = defineStore("onboardingOverlay", () => {
	const sources = shallowRef(/* @__PURE__ */ new Set());
	const active = computed(() => [...sources.value].some((isActive) => isActive()));
	function registerSource(isActive) {
		const source = () => isActive();
		sources.value = new Set(sources.value).add(source);
		const stop = () => {
			const next = new Set(sources.value);
			next.delete(source);
			sources.value = next;
		};
		if (getCurrentScope()) onScopeDispose(stop);
		return stop;
	}
	return {
		active,
		registerSource
	};
});
//#endregion
//#region src/platform/onboarding/coachmarkRegistry.ts
function isRectTarget(target) {
	return !(target instanceof HTMLElement);
}
var EMPTY = [];
/** A target's rect, once it is rendered with a size. */
function laidOutRect(target) {
	const rect = isRectTarget(target) ? target.getRect() : target.getBoundingClientRect();
	if (!rect || rect.width <= 0 || rect.height <= 0) return null;
	return rect;
}
var registry = shallowReactive(/* @__PURE__ */ new Map());
function registerCoachmark(id, target) {
	registry.set(id, [...registry.get(id) ?? EMPTY, target]);
}
function unregisterCoachmark(id, target) {
	const next = (registry.get(id) ?? EMPTY).filter((entry) => entry !== target);
	if (next.length) registry.set(id, next);
	else registry.delete(id);
}
function coachmarkElements(id) {
	return registry.get(id) ?? EMPTY;
}
function targetMounted(id) {
	return coachmarkElements(id).some((target) => !!laidOutRect(target));
}
/** Resolves once a laid-out target for the id exists; false on timeout or abort. */
function waitForTarget(id, signal, timeoutMs) {
	if (targetMounted(id)) return Promise.resolve(true);
	if (signal.aborted) return Promise.resolve(false);
	return new Promise((resolve) => {
		let done = false;
		let poll;
		function finish(found) {
			if (done) return;
			done = true;
			stopWatch();
			clearTimeout(poll);
			clearTimeout(timer);
			signal.removeEventListener("abort", onAbort);
			resolve(found);
		}
		function onAbort() {
			finish(false);
		}
		function samplePlacement() {
			if (targetMounted(id)) finish(true);
			else if (coachmarkElements(id).length) poll = setTimeout(samplePlacement, 100);
		}
		const stopWatch = watch(() => coachmarkElements(id).length, () => {
			clearTimeout(poll);
			samplePlacement();
		}, { flush: "post" });
		const timer = setTimeout(() => finish(false), timeoutMs);
		signal.addEventListener("abort", onAbort);
		samplePlacement();
	});
}
//#endregion
//#region src/platform/onboarding/onboardingTours.ts
/** Every tour, including ones whose steps a consumer registers at runtime. */
var ENTRY_PATHS = ["appMode", "firstRun"];
/** Setting holding the tours the user has completed or dismissed. */
var TOUR_SEEN_SETTING = "Comfy.OnboardingCoachmarks.Seen";
/** Every element a tour can point at; the e2e drift guard asserts each resolves. */
var COACH_IDS = {
	appRunButton: "app-run-button",
	inputsList: "inputs-list",
	outputs: "outputs",
	assetsPanel: "assets-panel"
};
/**
* Graph-view anchors for the first-run tour and its nudge. Kept out of
* {@link COACH_IDS} because the drift guard iterates that map and asserts each
* id resolves in App mode, where the canvas anchors do not exist.
* `runButton` and `templatesButton` are ordinary chrome, so only the first-run
* walk and the nudge e2e cover their drift.
*/
var FIRST_RUN_COACH_IDS = {
	runButton: "first-run-run-button",
	source: "first-run-source",
	prompt: "first-run-prompt",
	sink: "first-run-sink",
	templatesButton: "first-run-templates-button"
};
/**
* Fixes the running step set (and so the step count) at tour start: drops steps
* whose own target isn't mounted, keeping targetless and deferred steps.
*/
function resolveSteps(steps, isMounted) {
	return steps.filter((s) => s.kind === "landing" || !s.coachId || s.deferTarget || isMounted(s.coachId));
}
var TOURS = { appMode: [
	{
		kind: "landing",
		name: "landing",
		image: "/assets/images/app-mode-landing.png"
	},
	{
		kind: "spotlight",
		name: "inputs",
		coachId: COACH_IDS.inputsList,
		placement: "auto",
		deferTarget: true
	},
	{
		kind: "spotlight",
		name: "run",
		coachId: COACH_IDS.appRunButton,
		placement: "auto",
		deferTarget: true
	},
	{
		kind: "spotlight",
		name: "outputs",
		coachId: COACH_IDS.outputs,
		placement: "leftCenter",
		deferTarget: true
	},
	{
		kind: "spotlight",
		name: "assets",
		coachId: COACH_IDS.assetsPanel,
		placement: "auto",
		deferTarget: true,
		openSidebarTab: "assets"
	}
] };
var HOLDS = shallowReactive(/* @__PURE__ */ new Map());
/** False ends the tour: the context its steps point at is gone. */
function registerTourHolds(entry, holds) {
	if (holds) HOLDS.set(entry, holds);
	else HOLDS.delete(entry);
}
/**
* Registers a tour whose steps are built by a higher layer — the layer rules
* forbid this one from importing them. Re-registering replaces the definition.
*/
function registerTour(entry, definition, holds) {
	TOURS[entry] = definition;
	registerTourHolds(entry, holds);
}
function tourDefinition(entry) {
	return TOURS[entry];
}
/** True for a tour that registered no condition — it has no context to lose. */
function tourHolds(entry) {
	return HOLDS.get(entry)?.value ?? true;
}
//#endregion
//#region src/platform/onboarding/tourState.ts
var IDLE = { phase: "idle" };
function isRunning(state) {
	return state.phase === "waiting" || state.phase === "entering" || state.phase === "showing";
}
/** `fromIdx === null` means nothing is on screen yet, so nothing to travel. */
function shownIdx(state) {
	if (state.phase === "showing") return state.idx;
	if (state.phase === "entering") return state.fromIdx === null ? null : state.toIdx;
	if (state.phase === "waiting") return state.fromIdx;
	return null;
}
/**
* The only transition table. An event meaningless in the current phase, or from
* a run that is over, returns `state` itself rather than a phase that shouldn't
* follow.
*/
function reduceTour(state, event) {
	if (event.type === "requested") return state.phase === "idle" ? {
		phase: "resolving",
		tour: event.tour,
		run: event.run
	} : state;
	if (state.phase === "idle" || state.run !== event.run) return state;
	switch (event.type) {
		case "resolved": return state.phase === "resolving" ? {
			phase: "entering",
			tour: state.tour,
			run: state.run,
			steps: event.steps,
			fromIdx: null,
			toIdx: 0
		} : state;
		case "resolvedEmpty": return state.phase === "resolving" ? IDLE : state;
		case "targetAwaited": return isRunning(state) ? {
			phase: "waiting",
			tour: state.tour,
			run: state.run,
			steps: state.steps,
			fromIdx: event.fromIdx
		} : state;
		case "stepEntering": return isRunning(state) ? {
			phase: "entering",
			tour: state.tour,
			run: state.run,
			steps: state.steps,
			fromIdx: shownIdx(state),
			toIdx: event.toIdx
		} : state;
		case "stepShown": return state.phase === "entering" ? {
			phase: "showing",
			tour: state.tour,
			run: state.run,
			steps: state.steps,
			idx: event.idx
		} : state;
		case "ended": return IDLE;
	}
}
//#endregion
//#region src/platform/onboarding/useTourTriggers.ts
/** Each tour's auto-open condition, paired with its entry path. */
function useTourTriggers() {
	const { mode } = useAppMode();
	const appModeStore = useAppModeStore();
	const desktopLayout = useBreakpoints(breakpointsTailwind).greaterOrEqual("md");
	const inAppMode = computed(() => desktopLayout.value && mode.value === "app");
	return [["appMode", {
		holds: inAppMode,
		autoOpen: computed(() => inAppMode.value && appModeStore.hasOutputs)
	}]];
}
//#endregion
//#region src/platform/onboarding/onboardingTourStore.ts
var DEFER_TIMEOUT_MS = 8e3;
/** Empty when a runtime resolver fails, so one bad graph costs only its own tour. */
async function resolveDefinition(definition) {
	if (Array.isArray(definition)) return { steps: definition };
	try {
		const resolution = await definition();
		return Array.isArray(resolution) ? { steps: resolution } : resolution;
	} catch (error) {
		console.error("coachmark tour definition failed", error);
		return {
			steps: [],
			reason: "resolver_failed"
		};
	}
}
/**
* The tour state machine: which tour starts and when, which steps run, and the
* advance/skip/complete lifecycle.
*/
var useOnboardingTourStore = defineStore("onboardingTour", () => {
	const settingStore = useSettingStore();
	const telemetry = useTelemetry();
	const state = shallowRef(IDLE);
	const lastEnding = shallowRef(null);
	let stepController = null;
	let lastRun = 0;
	function nextRun() {
		return ++lastRun;
	}
	/** The only writer of `state`. Returns false when the reducer refused. */
	function dispatch(event) {
		const before = state.value;
		state.value = reduceTour(before, event);
		return state.value !== before;
	}
	function currentRun() {
		return state.value.phase === "idle" ? null : state.value.run;
	}
	const steps = computed(() => isRunning(state.value) ? state.value.steps : []);
	const activeTour = computed(() => state.value.phase === "idle" ? null : state.value.tour);
	const waitingForTarget = computed(() => state.value.phase === "waiting");
	const stepSettled = computed(() => state.value.phase === "showing");
	const stepIdx = computed(() => shownIdx(state.value));
	const step = computed(() => stepIdx.value === null ? null : steps.value[stepIdx.value] ?? null);
	const isLast = computed(() => stepIdx.value === steps.value.length - 1);
	const countedSteps = computed(() => steps.value.filter((s) => s.kind !== "landing"));
	const countedStepsTotal = computed(() => countedSteps.value.length);
	const countedStepIdx = computed(() => {
		const s = step.value;
		return s ? countedSteps.value.indexOf(s) : 0;
	});
	const previousStep = computed(() => stepIdx.value === null ? null : steps.value[stepIdx.value - 1] ?? null);
	const canGoBack = computed(() => {
		const previous = previousStep.value;
		if (countedStepIdx.value <= 0) return false;
		return previous?.kind !== "spotlight" || previous.selfAdvancing !== true;
	});
	/** What telemetry reports, captured before a transition clears it. */
	function snapshot() {
		return {
			tour: activeTour.value,
			counted: countedSteps.value
		};
	}
	function trackTour(stage, skipReason, reported = step.value, { tour, counted } = snapshot()) {
		if (!tour) return;
		const reportedIdx = reported ? counted.indexOf(reported) : -1;
		telemetry?.trackOnboardingTour(stage, {
			tour,
			step_count: counted.length,
			...stage !== "started" && reportedIdx >= 0 && {
				step_number: reportedIdx + 1,
				coach_id: reported?.kind === "spotlight" ? reported.coachId : void 0
			},
			...skipReason && { skip_reason: skipReason }
		});
	}
	function stepKey(suffix) {
		return `onboardingCoachmarks.${activeTour.value}.${step.value?.name}.${suffix}`;
	}
	const title = computed(() => step.value ? t(stepKey("title")) : "");
	const body = computed(() => step.value ? t(stepKey("body")) : "");
	const primaryLabel = computed(() => {
		if (step.value && te(stepKey("primary"))) return t(stepKey("primary"));
		return isLast.value ? t("onboardingCoachmarks.done") : t("onboardingCoachmarks.next");
	});
	const skipLabel = computed(() => step.value && te(stepKey("skip")) ? t(stepKey("skip")) : t("onboardingCoachmarks.skip"));
	const backLabel = computed(() => t("onboardingCoachmarks.back"));
	async function showStep(idx) {
		const current = state.value;
		if (!isRunning(current)) return;
		const nextStep = current.steps[idx];
		stepController?.abort();
		const controller = new AbortController();
		stepController = controller;
		const { signal } = controller;
		const run = current.run;
		const superseded = () => run !== currentRun() || stepController !== controller;
		const fromIdx = shownIdx(current);
		if (nextStep.kind === "spotlight" && nextStep.openSidebarTab) openSidebarTab(nextStep.openSidebarTab);
		if (nextStep.kind === "spotlight" && nextStep.deferTarget && nextStep.coachId && !targetMounted(nextStep.coachId)) {
			if (!dispatch({
				type: "targetAwaited",
				run,
				fromIdx
			})) return;
			const found = await waitForTarget(nextStep.coachId, signal, DEFER_TIMEOUT_MS);
			if (superseded()) return;
			if (!found) {
				abandonStep(nextStep);
				return;
			}
		}
		if (!dispatch({
			type: "stepEntering",
			run,
			toIdx: idx
		})) return;
		if (nextStep.onEnter) {
			try {
				await nextStep.onEnter(signal);
			} catch (error) {
				if (superseded()) return;
				console.error("coachmark onEnter failed", error);
				abandonStep(nextStep);
				return;
			}
			if (superseded()) return;
		}
		if (!dispatch({
			type: "stepShown",
			run,
			idx
		})) return;
		trackTour("step_shown");
	}
	/**
	* Ends the tour on a step it could not present, without the seen-flag so the
	* user is offered it again rather than losing it to a bad moment.
	*/
	function abandonStep(step) {
		finish("skipped", {
			markSeen: false,
			skipReason: "target_timeout",
			reported: step
		});
		useToastStore().add({
			severity: "error",
			summary: t("g.error"),
			detail: t("onboardingCoachmarks.loadError")
		});
	}
	const lostTarget = computed(() => {
		if (state.value.phase !== "showing") return null;
		const shown = step.value;
		if (shown?.kind !== "spotlight") return null;
		return shown.coachId && !targetMounted(shown.coachId) ? shown : null;
	});
	watch(lostTarget, (lost) => {
		if (lost) abandonStep(lost);
	});
	function openSidebarTab(tabId) {
		const sidebar = useSidebarTabStore();
		if (sidebar.activeSidebarTabId !== tabId) sidebar.toggleSidebarTab(tabId);
	}
	function next() {
		if (waitingForTarget.value) return;
		if (isLast.value) {
			finish("completed");
			return;
		}
		if (stepIdx.value !== null) showStep(stepIdx.value + 1);
	}
	function back() {
		if (canGoBack.value && stepIdx.value !== null) showStep(stepIdx.value - 1);
	}
	function skip() {
		finish("skipped");
	}
	/**
	* Ends the tour without marking it seen: something outside it barred the way,
	* so the user has not had their tour yet and is offered it again.
	*/
	function postpone() {
		finish("skipped", {
			markSeen: false,
			skipReason: "postponed"
		});
	}
	function finish(outcome, { markSeen = true, skipReason = "user", reported } = {}) {
		const run = currentRun();
		if (run === null) return;
		const ending = snapshot();
		const reportedStep = reported ?? step.value;
		if (!dispatch({
			type: "ended",
			run
		})) return;
		if (ending.tour) lastEnding.value = outcome === "skipped" ? {
			tour: ending.tour,
			outcome,
			skipReason
		} : {
			tour: ending.tour,
			outcome
		};
		trackTour(outcome, outcome === "skipped" ? skipReason : void 0, reportedStep, ending);
		stepController?.abort();
		if (markSeen && ending.tour) markTourSeen(ending.tour);
	}
	for (const [entryPath, trigger] of useTourTriggers()) {
		registerTourHolds(entryPath, trigger.holds);
		watch(trigger.autoOpen, (visible) => {
			if (visible) startTour(entryPath);
		}, { immediate: true });
	}
	for (const entryPath of ENTRY_PATHS) watch(() => tourHolds(entryPath), (holding) => {
		if (!holding && activeTour.value === entryPath) finish("skipped", {
			markSeen: false,
			skipReason: "trigger_lost"
		});
	});
	function hasSeenTour(entryPath) {
		return settingStore.get(TOUR_SEEN_SETTING).includes(entryPath);
	}
	function markTourSeen(entryPath) {
		const seen = settingStore.get(TOUR_SEEN_SETTING);
		if (seen.includes(entryPath)) return;
		settingStore.set(TOUR_SEEN_SETTING, [...seen, entryPath]);
	}
	async function begin(entryPath) {
		const definition = tourDefinition(entryPath);
		if (!definition || !tourHolds(entryPath)) return false;
		const run = nextRun();
		if (!dispatch({
			type: "requested",
			tour: entryPath,
			run
		})) return false;
		lastEnding.value = null;
		const built = await resolveDefinition(definition);
		const resolved = resolveSteps(built.steps, targetMounted);
		if (!resolved.length) {
			dispatch({
				type: "resolvedEmpty",
				run
			});
			reportNotStarted(entryPath, built.reason ?? "no_steps");
			return false;
		}
		if (!dispatch({
			type: "resolved",
			run,
			steps: resolved
		})) return false;
		trackTour("started");
		showStep(0);
		return true;
	}
	const reportedNotStarted = /* @__PURE__ */ new Set();
	function reportNotStarted(entryPath, reason) {
		if (reportedNotStarted.has(entryPath)) return;
		reportedNotStarted.add(entryPath);
		telemetry?.trackOnboardingTour("not_started", {
			tour: entryPath,
			step_count: 0,
			not_started_reason: reason
		});
	}
	/** Starts an unseen tour; false when nothing started. */
	async function startTour(entryPath) {
		if (hasSeenTour(entryPath)) {
			reportNotStarted(entryPath, "already_seen");
			return false;
		}
		return begin(entryPath);
	}
	function replayTour(entryPath) {
		begin(entryPath);
	}
	return {
		activeTour: readonly(activeTour),
		lastEnding: readonly(lastEnding),
		step,
		isLast,
		canGoBack,
		title,
		body,
		primaryLabel,
		skipLabel,
		backLabel,
		countedStepIdx,
		countedStepsTotal,
		waitingForTarget,
		stepSettled,
		startTour,
		replayTour,
		next,
		back,
		skip,
		postpone
	};
});
//#endregion
//#region src/platform/updates/common/releaseService.ts
var releaseApiClient = axios.create({
	baseURL: getComfyApiBaseUrl(),
	headers: { "Content-Type": "application/json" }
});
var useReleaseService = () => {
	const isLoading = ref(false);
	const error = ref(null);
	watch(() => getComfyApiBaseUrl(), (url) => {
		releaseApiClient.defaults.baseURL = url;
	});
	const handleApiError = (err, context, routeSpecificErrors) => {
		if (!axios.isAxiosError(err)) return err instanceof Error ? `${context}: ${err.message}` : `${context}: Unknown error occurred`;
		const axiosError = err;
		if (axiosError.response) {
			const { status, data } = axiosError.response;
			if (routeSpecificErrors && routeSpecificErrors[status]) return routeSpecificErrors[status];
			switch (status) {
				case 400: return `Bad request: ${data.message || "Invalid input"}`;
				case 401: return "Unauthorized: Authentication required";
				case 403: return `Forbidden: ${data.message || "Access denied"}`;
				case 404: return `Not found: ${data.message || "Resource not found"}`;
				case 500: return `Server error: ${data.message || "Internal server error"}`;
				default: return `${context}: ${data.message || axiosError.message}`;
			}
		}
		return `${context}: ${axiosError.message}`;
	};
	const executeApiRequest = async (apiCall, errorContext, routeSpecificErrors) => {
		isLoading.value = true;
		error.value = null;
		try {
			return (await apiCall()).data;
		} catch (err) {
			if (isAbortError(err)) return null;
			error.value = handleApiError(err, errorContext, routeSpecificErrors);
			return null;
		} finally {
			isLoading.value = false;
		}
	};
	const getReleases = async (params, options = {}) => {
		const { signal, deployEnvironment } = options;
		const endpoint = "/releases";
		return await executeApiRequest(() => releaseApiClient.get(endpoint, {
			params,
			signal,
			headers: deployEnvironment ? { "Comfy-Env": deployEnvironment } : void 0
		}), "Failed to get releases", { 400: "Invalid project or version parameter" });
	};
	return {
		isLoading,
		error,
		getReleases
	};
};
//#endregion
//#region src/platform/updates/common/releaseStore.ts
var useReleaseStore = defineStore("release", () => {
	const releases = ref([]);
	const isLoading = ref(false);
	const error = ref(null);
	const releaseService = useReleaseService();
	const systemStatsStore = useSystemStatsStore();
	const settingStore = useSettingStore();
	const onboardingTourStore = useOnboardingTourStore();
	const onboardingOverlayStore = useOnboardingOverlayStore();
	const currentVersion = computed(() => systemStatsStore.systemStats?.system.comfyui_version ?? "");
	const locale = computed(() => settingStore.get("Comfy.Locale"));
	computed(() => settingStore.get("Comfy.Release.Version"));
	const releaseStatus = computed(() => settingStore.get("Comfy.Release.Status"));
	computed(() => settingStore.get("Comfy.Release.Timestamp"));
	const showVersionUpdates = computed(() => settingStore.get("Comfy.Notification.ShowVersionUpdates"));
	const recentRelease = computed(() => {
		return releases.value.at(0) ?? null;
	});
	const recentReleases = computed(() => {
		return releases.value.slice(0, 3);
	});
	const compareVersions = (releaseVersion, currentVer) => {
		if ((0, import_semver.valid)(releaseVersion) && (0, import_semver.valid)(currentVer)) return (0, import_semver.compare)(releaseVersion, currentVer);
		return releaseVersion === currentVer ? 0 : 1;
	};
	const isNewVersionAvailable = computed(() => !!recentRelease.value && compareVersions(recentRelease.value.version, currentVersion.value || "0.0.0") > 0);
	computed(() => !!recentRelease.value && compareVersions(recentRelease.value.version, currentVersion.value || "0.0.0") === 0);
	computed(() => {
		const attention = recentRelease.value?.attention;
		return attention === "medium" || attention === "high";
	});
	const shouldShowToast = computed(() => {
		return false;
	});
	const shouldShowRedDot = computed(() => {
		return false;
	});
	const shouldShowPopup = computed(() => {
		if (onboardingTourStore.activeTour === "firstRun") return false;
		if (onboardingOverlayStore.active) return false;
		return false;
	});
	async function handleSkipRelease(version) {
		if (version !== recentRelease.value?.version || releaseStatus.value === "changelog seen") return;
		await settingStore.setMany({
			"Comfy.Release.Version": version,
			"Comfy.Release.Status": "skipped",
			"Comfy.Release.Timestamp": Date.now()
		});
	}
	async function handleShowChangelog(version) {
		if (version !== recentRelease.value?.version) return;
		await settingStore.setMany({
			"Comfy.Release.Version": version,
			"Comfy.Release.Status": "changelog seen",
			"Comfy.Release.Timestamp": Date.now()
		});
	}
	async function handleWhatsNewSeen(version) {
		if (version !== recentRelease.value?.version) return;
		await settingStore.setMany({
			"Comfy.Release.Version": version,
			"Comfy.Release.Status": "what's new seen",
			"Comfy.Release.Timestamp": Date.now()
		});
	}
	async function fetchReleases() {
		if (isLoading.value) return;
		if (!showVersionUpdates.value) return;
		if (systemStatsStore.systemStats?.system.argv?.includes("--disable-api-nodes")) return;
		isLoading.value = true;
		error.value = null;
		try {
			if (!systemStatsStore.systemStats) await until(systemStatsStore.isInitialized);
			const fetchedReleases = await releaseService.getReleases({
				project: "comfyui",
				current_version: currentVersion.value,
				form_factor: systemStatsStore.getFormFactor(),
				locale: stringToLocale(locale.value)
			}, { deployEnvironment: systemStatsStore.systemStats?.system.deploy_environment });
			if (fetchedReleases !== null) releases.value = fetchedReleases;
			else if (releaseService.error.value) error.value = releaseService.error.value;
		} catch (err) {
			error.value = err instanceof Error ? err.message : "Unknown error occurred";
		} finally {
			isLoading.value = false;
		}
	}
	async function initialize() {
		await fetchReleases();
	}
	return {
		releases,
		isLoading,
		error,
		recentRelease,
		recentReleases,
		shouldShowToast,
		shouldShowRedDot,
		shouldShowPopup,
		shouldShowUpdateButton: isNewVersionAvailable,
		handleSkipRelease,
		handleShowChangelog,
		handleWhatsNewSeen,
		fetchReleases,
		initialize
	};
});
//#endregion
export { TOUR_SEEN_SETTING as a, isRectTarget as c, unregisterCoachmark as d, FIRST_RUN_COACH_IDS as i, laidOutRect as l, useOnboardingTourStore as n, registerTour as o, COACH_IDS as r, coachmarkElements as s, useReleaseStore as t, registerCoachmark as u };
