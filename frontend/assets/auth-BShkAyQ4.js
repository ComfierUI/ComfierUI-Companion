import "./rolldown-runtime-xtsTai4I.js";
import { St as watch } from "./vendor-vue-core-C1utdb0s.js";
import { Il as consumeSurveyReplayRequest, Rl as isSurveyReplayRequested, tt as useAuthStore } from "./layoutStore-CZsuzg91.js";
import { i as api, x as firebaseIdentity } from "./api-Bt-fGt5a.js";
import { i as addBreadcrumb } from "./vendor-sentry-zSXGkMPN.js";
import { i as toError, n as reportError } from "./reportError-LG-zfbNw.js";
//#region src/platform/cloud/onboarding/auth.ts
var ONBOARDING_SURVEY_KEY = "onboarding_survey";
function captureApiError(error, endpoint, errorType, httpStatus, operation, extraContext) {
	reportError(error, {
		surface: "platform",
		errorType,
		tags: {
			api_endpoint: endpoint,
			http_status: httpStatus,
			operation
		},
		context: extraContext
	});
}
function isHttpError(error, errorMessagePrefix) {
	return error instanceof Error && error.message.startsWith(errorMessagePrefix);
}
async function getUserCloudStatus() {
	try {
		const response = await api.fetchApi("/user", {
			method: "GET",
			headers: { "Content-Type": "application/json" }
		});
		if (!response.ok) {
			const error = /* @__PURE__ */ new Error(`Failed to get user: ${response.statusText}`);
			captureApiError(error, "/user", "http_error", response.status, void 0, { api: {
				method: "GET",
				endpoint: "/user",
				status_code: response.status,
				status_text: response.statusText
			} });
			throw error;
		}
		return response.json();
	} catch (error) {
		if (!isHttpError(error, "Failed to get user:")) captureApiError(toError(error), "/user", "network_error");
		throw error;
	}
}
async function getSurveyCompletedStatus(ownerId) {
	if (isSurveyReplayRequested(ownerId)) return false;
	return await readStoredSurvey() !== "absent";
}
function classifyStoredSurvey(data) {
	if (typeof data !== "object" || data === null || !("value" in data)) return "unknown";
	const value = data.value;
	if (value === null) return "absent";
	if (typeof value !== "object" || Array.isArray(value)) return "unknown";
	return Object.keys(value).length === 0 ? "absent" : "present";
}
async function readStoredSurvey(signal) {
	try {
		const response = await api.fetchApi(`/settings/${ONBOARDING_SURVEY_KEY}`, {
			method: "GET",
			signal,
			headers: { "Content-Type": "application/json" }
		});
		if (response.status === 404) return "absent";
		if (!response.ok) {
			addBreadcrumb({
				category: "auth",
				message: "Survey status check returned non-ok response",
				level: "warning",
				data: {
					status: response.status,
					endpoint: `/settings/${ONBOARDING_SURVEY_KEY}`
				}
			});
			return "unknown";
		}
		return classifyStoredSurvey(await response.json());
	} catch (error) {
		if (signal?.aborted && error === signal.reason) return "unknown";
		reportError(error, {
			surface: "platform",
			errorType: "network_error",
			tags: { api_endpoint: "/settings/{key}" },
			context: {
				route_template: "/settings/{key}",
				route_actual: `/settings/${ONBOARDING_SURVEY_KEY}`
			},
			level: "warning"
		});
		return "unknown";
	}
}
async function submitSurvey(survey, ownerId) {
	const identityChanged = new AbortController();
	const auth = useAuthStore();
	const abortUnlessOwner = (firebaseUid) => {
		if ((firebaseUid ?? auth.sessionOnlyUser?.id) !== ownerId) identityChanged.abort();
	};
	const stopWatchingFirebase = firebaseIdentity.onUserChanged((user) => abortUnlessOwner(user?.uid));
	const stopWatchingSession = watch(() => auth.sessionOnlyUser?.id, () => abortUnlessOwner(auth.currentUser?.uid), { flush: "sync" });
	try {
		const replaying = isSurveyReplayRequested(ownerId);
		if (replaying) {
			const stored = await readStoredSurvey(identityChanged.signal);
			if (identityChanged.signal.aborted) return { status: "cancelled" };
			if (stored === "unknown") return {
				status: "failed",
				cause: "Could not read the stored survey answers, so the replayed submission was not written"
			};
			if (stored === "present") {
				consumeSurveyReplayRequest(ownerId);
				return { status: "preserved" };
			}
		}
		addBreadcrumb({
			category: "auth",
			message: "Submitting survey",
			level: "info",
			data: { survey_fields: Object.keys(survey) }
		});
		const response = await api.fetchApi("/settings", {
			method: "POST",
			signal: identityChanged.signal,
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ [ONBOARDING_SURVEY_KEY]: survey })
		});
		if (identityChanged.signal.aborted) return { status: "cancelled" };
		if (!response.ok) {
			const error = /* @__PURE__ */ new Error(`Failed to submit survey: ${response.statusText}`);
			captureApiError(error, "/settings", "http_error", response.status, "submit_survey", { survey: {
				field_count: Object.keys(survey).length,
				field_names: Object.keys(survey)
			} });
			return {
				status: "failed",
				cause: error
			};
		}
		if (replaying) consumeSurveyReplayRequest(ownerId);
		addBreadcrumb({
			category: "auth",
			message: "Survey submitted successfully",
			level: "info"
		});
		return { status: "stored" };
	} catch (error) {
		if (identityChanged.signal.aborted && error === identityChanged.signal.reason) return { status: "cancelled" };
		captureApiError(toError(error), "/settings", "network_error", void 0, "submit_survey");
		return {
			status: "failed",
			cause: error
		};
	} finally {
		stopWatchingFirebase();
		stopWatchingSession();
	}
}
//#endregion
export { getUserCloudStatus as n, submitSurvey as r, getSurveyCompletedStatus as t };
