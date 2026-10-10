const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./workspaceAuthStore-Y8UVH0yZ.js","./layoutStore-CZsuzg91.js","./rolldown-runtime-xtsTai4I.js","./vendor-datadog-DudeEV66.js","./vendor-other-BPEcPQTD.js","./vendor-three-DQpYrwAh.js","./vendor-vue-core-C1utdb0s.js","./vendor-zod-TMj9Wsdv.js","./vendor-tiptap-BT_4t92m.js","./requestAuth-YeU5GIXc.js","./vendor-vueuse-BxKIIsKg.js","./telemetry-IkzvF0TI.js","./zod.gen-C09SPgBJ.js","./vendor-axios-QnwcNXlY.js","./types-t0xJOOCt.js","./vendor-sentry-zSXGkMPN.js","./reportError-LG-zfbNw.js","./hostTelemetryEnabled-BZ3GL1Cu.js","./remoteConfig-DwMQrLli.js","./vendor-firebase-B37L--zT.js","./toastStore-CTfykAzG.js","./desktopHostSession-IrokPizE.js","./vendor-i18n-BZvE7WBQ.js","./i18n-C3J-ToPr.js","./formatUtil-DuxXRy1z.js","./commands-BcZ6fU3-.js","./main-BfqkkuXX.js","./nodeDefs-CFOSmIZi.js","./settings-B3DInspu.js","./comfyApi-CYSC9hA6.js","./types-ColLjFnz.js","./useFeatureFlags-DAoj_aDd.js","./dialog.variants-PsJk1wgr.js","./ssoRequired-BkQMvdnz.js","./dialogStore-B0GYyals.js","./DialogPortal-B3D-ZhO6.js","./vendor-reka-ui-tdehH9A1.js","./src-DI1bBfrb.js","./Button-j0oCzR82.js","./refreshRemoteConfig-D9UzqP0h.js","./vendor-primevue-C3d0HJ53.js","./systemStatsStore-3gc4cifl.js","./useImageQuiet-Ded8W_Zd.js","./vendor-markdown-CtxqRwKg.js","./useModalLiftedZIndex-BuehUvPe.js","./NumberFieldInput-CILJZ6M6.js","./colorUtil-BzdMMd-Y.js","./vendor-yjs-D9X62SBd.js","./markdownRendererUtil-6g3t5X63.js","./downloadUtil-Bysc7OZ_.js","./SingleSelect-CS2DGZzk.js","./widgetTypes-CisWqKm9.js","./Switch-BAw3-YcG.js","./Input-Cx8jjgHK.js","./SelectValue-BYMnIcxq.js","./Loader-CwKhrtFX.js","./_plugin-vue_export-helper-DEKQMRQ4.js","./creditsUtil-BWj6bywK.js","./useExternalLink-CXT6uu6Z.js","./envUtil-2Z8ainL3.js","./vendor-other-DODGPXtn.css","./layoutStore-Nbgrgm8u.css","./telemetry-_gZuOwgM.js"])))=>i.map(i=>d[i]);
import { r as __name } from "./rolldown-runtime-xtsTai4I.js";
import { a as __vitePreload } from "./vendor-datadog-DudeEV66.js";
import { Dt as trimEnd, wt as get } from "./vendor-other-BPEcPQTD.js";
import { t as COMFY_CLIENT } from "./requestAuth-YeU5GIXc.js";
import { Bt as shallowRef, Lt as ref } from "./vendor-vue-core-C1utdb0s.js";
import "./vendor-vueuse-BxKIIsKg.js";
import { n as useTelemetry } from "./telemetry-IkzvF0TI.js";
import { C as unknownType, S as unionType, T as ZodIssueCode, _ as objectType, b as stringType, c as booleanType, f as enumType, g as numberType, h as nullType, m as literalType, o as anyType, p as lazyType, s as arrayType, t as fromZodError, u as custom, x as tupleType, y as recordType } from "./vendor-zod-TMj9Wsdv.js";
import { $ as zWebSessionUser, A as zGetEmbeddingsResponse, B as zPostAssetsFromWorkflowResponse, C as zDeleteSessionResponse, D as zExchangeTokenResponse, E as zErrorResponse, I as zJobEntry, K as zRevokeAllSessionsResponse, N as zGetSessionResponse, _ as zCreateSessionResponse, j as zGetExtensionsResponse } from "./zod.gen-C09SPgBJ.js";
import { n as AxiosHeaders, r as axios } from "./vendor-axios-QnwcNXlY.js";
import { i as addBreadcrumb } from "./vendor-sentry-zSXGkMPN.js";
import { n as reportError } from "./reportError-LG-zfbNw.js";
import { s as remoteConfig, u as remoteConfigState } from "./remoteConfig-DwMQrLli.js";
import { n as getDevOverride } from "./hostTelemetryEnabled-BZ3GL1Cu.js";
import { _ as signOut, a as browserPopupRedirectResolver, b as initializeApp, d as initializeAuth, f as onAuthStateChanged, g as signInWithPopup, h as signInWithEmailAndPassword, i as browserLocalPersistence, l as getAuth, m as sendPasswordResetEmail, n as GithubAuthProvider, o as browserSessionPersistence, p as onIdTokenChanged, r as GoogleAuthProvider, s as createUserWithEmailAndPassword, u as indexedDBLocalPersistence, v as updatePassword, x as FirebaseError, y as getApps } from "./vendor-firebase-B37L--zT.js";
import { t as useToastStore } from "./toastStore-CTfykAzG.js";
//#region src/comfier/mediaCodec.js
var directSources = /* @__PURE__ */ new Map();
var videoFile = /\.(?:mp4|m4v|mov|mkv|webm|avi)(?:$|[?#])/i;
function h264(value) {
	try {
		var url = new URL(String(value || ""), document.baseURI);
		var filename = url.searchParams.get("filename") || decodeURIComponent(url.pathname.split("/").pop() || "");
		var preview = url.searchParams.get("preview") || "";
		if (!videoFile.test(filename) || !/^webp(?:;|$)/i.test(preview)) return null;
		url.searchParams.set("preview", "h264");
		return url.href;
	} catch (ignore) {
		return null;
	}
}
function mp4ViewVideo(value) {
	try {
		var url = new URL(String(value || ""), document.baseURI);
		var filename = url.searchParams.get("filename") || decodeURIComponent(url.pathname.split("/").pop() || "");
		return /\/(?:api\/)?viewvideo\/?$/i.test(url.pathname) && /\.(?:mp4|m4v|mov)$/i.test(filename);
	} catch (ignore) {
		return false;
	}
}
function sourceInfo(value) {
	try {
		var url = new URL(String(value || ""), document.baseURI);
		var filename = url.searchParams.get("filename") || decodeURIComponent(url.pathname.split("/").pop() || "");
		return {
			url,
			filename,
			key: url.origin + "\n" + filename + "\n" + (url.searchParams.get("subfolder") || "")
		};
	} catch (ignore) {
		return null;
	}
}
function rememberDirect(value) {
	var info = sourceInfo(value);
	if (!info || !videoFile.test(info.filename) || !/\/(?:api\/)?view\/?$/i.test(info.url.pathname)) return;
	var format = info.url.searchParams.get("format") || "";
	if (info.url.searchParams.get("type") === "temp" && /^video\/h264-mp4$/i.test(format)) directSources.set(info.key, String(value));
}
function directFor(value) {
	var info = sourceInfo(value);
	return info && /\/(?:api\/)?viewvideo\/?$/i.test(info.url.pathname) ? directSources.get(info.key) || null : null;
}
function mediaSource(value, type) {
	if (!value || typeof document === "undefined") return {
		src: value,
		type
	};
	rememberDirect(value);
	const direct = directFor(value);
	const rewritten = h264(value);
	return {
		src: direct || rewritten || value,
		type: direct || sourceInfo(value)?.url.searchParams.get("type") === "temp" && sourceInfo(value)?.url.searchParams.get("format") === "video/h264-mp4" ? void 0 : rewritten || mp4ViewVideo(value) ? "video/mp4" : type
	};
}
function mediaRoute(value) {
	return mediaSource(value).src;
}
function resetMediaSources() {
	directSources.clear();
}
var clientFeatureFlags_default = {
	supports_preview_metadata: true,
	supports_manager_v4_ui: true,
	supports_progress_text_metadata: true
};
//#endregion
//#region src/platform/auth/authCredential.ts
var HEADER_CREDENTIAL = {
	Authorization: "bearer",
	"X-API-KEY": "api-key"
};
/** The credential kind an auth header carries; `none` when it carries neither. */
function authCredentialOf(header) {
	if (header === null) return "none";
	const headerKey = Object.keys(HEADER_CREDENTIAL).find((key) => key in header);
	return headerKey === void 0 ? "none" : HEADER_CREDENTIAL[headerKey];
}
/**
* Delivers a credential kind to a diagnostics callback without letting the
* callback affect the request: telemetry must fail open.
*/
function notifyAuthCredential(callback, credential) {
	try {
		callback?.(credential);
	} catch (error) {
		console.warn("onAuthCredential callback failed:", error);
	}
}
//#endregion
//#region src/platform/auth/session/sessionMediaUrl.ts
var MEDIA_ROUTE = /^(?:\/api)?\/(?:view|viewvideo|vhs\/viewvideo|vhs\/viewaudio|assets\/[^/?#]+\/content)(?:\?|$)/;
/**
* Names the workspace on a media route, which an image or video tag loads
* without headers; absent means the personal workspace.
*/
function scopeMediaRoute(route, workspaceId) {
	if (!workspaceId || !MEDIA_ROUTE.test(route)) return route;
	if (/[?&]workspace_id=/.test(route)) return route;
	return `${route}${route.includes("?") ? "&" : "?"}workspace_id=${encodeURIComponent(workspaceId)}`;
}
//#endregion
//#region packages/account-core/src/core/ssoRequired.ts
/**
* ingest's 403 `code` for an account or workspace an SSO organization holds,
* reached with a credential that is not an SSO sign-in. Every route answers
* it, anonymous ones included.
*/
var SSO_REQUIRED_SERVER_CODE = "sso_required";
function isSsoRequiredRefusal(status, body) {
	return status === 403 && zErrorResponse.safeParse(body).data?.code === "sso_required";
}
/**
* The organization whose SSO the refusal asks for, when ingest names one. A
* workspace accepts only its own organization's sign-in, so this outranks the
* organization the email's domain would discover.
*/
function ssoRequiredOrganizationId(body) {
	return zErrorResponse.safeParse(body).data?.organization_id || void 0;
}
//#endregion
//#region packages/account-core/src/core/exchange.ts
/**
* The pure token exchange: POST the signed-in identity's Firebase token to
* the workspace JWT endpoint, parse the generated contract, and return a
* usable credential or a coded failure. No state, no storage, no identity
* ownership — the caller owns all of that and passes the request body (an
* empty body resolves the personal workspace; `{ workspace_id }` targets
* one). Cancelable by the caller's signal and bounded by a timeout, which
* the production store's timer-scheduled callers did not need.
*/
var CredentialResponseSchema = zExchangeTokenResponse;
/** 401/403/404 carry their own codes; everything else is one failure bucket. */
function codeForResponse(status) {
	if (status === 401) return "INVALID_FIREBASE_TOKEN";
	if (status === 403) return "ACCESS_DENIED";
	if (status === 404) return "WORKSPACE_NOT_FOUND";
	return "TOKEN_EXCHANGE_FAILED";
}
/** Only a 403's body is read: it tells an SSO refusal from any other. */
async function codeForRefusal(response, signal) {
	const code = codeForResponse(response.status);
	if (code !== "ACCESS_DENIED") return code;
	let body;
	try {
		body = await abortable(response.json(), signal);
	} catch {
		return code;
	}
	return isSsoRequiredRefusal(response.status, body) ? "SSO_REQUIRED" : code;
}
function abortable(promise, signal) {
	if (signal.aborted) return Promise.reject(new DOMException("Aborted", "AbortError"));
	return new Promise((resolve, reject) => {
		const onAbort = () => reject(new DOMException("Aborted", "AbortError"));
		signal.addEventListener("abort", onAbort, { once: true });
		promise.then((value) => {
			signal.removeEventListener("abort", onAbort);
			resolve(value);
		}, (error) => {
			signal.removeEventListener("abort", onAbort);
			reject(error);
		});
	});
}
async function exchangeToken(user, request) {
	const { exchangeUrl, body, fetchImpl, signal, timeoutMs, now } = request;
	if (signal?.aborted) return {
		status: "error",
		code: "TOKEN_EXCHANGE_FAILED"
	};
	const controller = new AbortController();
	const abort = () => controller.abort();
	signal?.addEventListener("abort", abort, { once: true });
	const timeout = setTimeout(() => controller.abort(), timeoutMs);
	try {
		let idToken;
		try {
			idToken = await abortable(user.getIdToken(), controller.signal);
		} catch (error) {
			return {
				status: "error",
				code: !controller.signal.aborted && typeof error === "object" && error !== null && "code" in error && error.code === "NOT_AUTHENTICATED" ? "NOT_AUTHENTICATED" : "TOKEN_EXCHANGE_FAILED"
			};
		}
		let response;
		try {
			response = await fetchImpl(exchangeUrl, {
				method: "POST",
				headers: {
					Authorization: `Bearer ${idToken}`,
					"Content-Type": "application/json"
				},
				body: JSON.stringify(body),
				signal: controller.signal
			});
		} catch {
			return {
				status: "error",
				code: "TOKEN_EXCHANGE_FAILED"
			};
		}
		if (!response.ok) return {
			status: "error",
			code: await codeForRefusal(response, controller.signal),
			httpStatus: response.status
		};
		let rawBody;
		try {
			rawBody = await abortable(response.json(), controller.signal);
		} catch {
			return {
				status: "error",
				code: "TOKEN_EXCHANGE_FAILED",
				httpStatus: response.status
			};
		}
		const parsed = CredentialResponseSchema.safeParse(rawBody);
		if (!parsed.success) return {
			status: "error",
			code: "TOKEN_EXCHANGE_FAILED",
			httpStatus: response.status
		};
		const expiresAt = Date.parse(parsed.data.expires_at);
		if (Number.isNaN(expiresAt) || parsed.data.token === "" || expiresAt <= now()) return {
			status: "error",
			code: "TOKEN_EXCHANGE_FAILED",
			httpStatus: response.status
		};
		return {
			status: "ok",
			session: {
				token: parsed.data.token,
				expiresAt,
				uid: user.uid,
				workspace: parsed.data.workspace,
				role: parsed.data.role,
				permissions: parsed.data.permissions
			}
		};
	} finally {
		clearTimeout(timeout);
		signal?.removeEventListener("abort", abort);
	}
}
//#endregion
//#region packages/account-core/src/core/credentialCache.ts
/** The generated contract for POST /api/auth/token, never a local copy of it. */
var CachedCredentialSchema = CredentialResponseSchema.omit({ expires_at: true }).extend({
	token: stringType().min(1),
	expiresAt: numberType().finite(),
	uid: stringType(),
	/** The workspace target the credential was minted for; absent = personal. */
	target: stringType().optional()
});
function toCredential(data) {
	return {
		token: data.token,
		expiresAt: data.expiresAt,
		uid: data.uid,
		workspace: data.workspace,
		role: data.role,
		permissions: data.permissions
	};
}
function encodeCached(session, target) {
	return JSON.stringify({
		...session,
		target
	});
}
function decodeCached(raw, uid) {
	let parsed;
	try {
		parsed = JSON.parse(raw);
	} catch {
		return;
	}
	const result = CachedCredentialSchema.safeParse(parsed);
	if (!result.success || result.data.uid !== uid) return void 0;
	return {
		credential: toCredential(result.data),
		target: result.data.target
	};
}
function decodeAdopted(message) {
	const parsed = CachedCredentialSchema.safeParse(message);
	return parsed.success ? toCredential(parsed.data) : void 0;
}
var DEFAULT_FRESH_MARGIN_MS = 3e5;
function isCredentialFresh(session, now, freshMarginMs = DEFAULT_FRESH_MARGIN_MS) {
	return session.expiresAt - now > freshMarginMs;
}
/**
* The live credential is authoritative; storage is recovery state, not a
* competing source. Candidates are consulted in the order given (memory
* first, then storage) for this exact uid and target, and the first fresh one
* wins — expiry must not override this (a rejected token can outlive its
* shorter-lived replacement), and a target-less read must never adopt a team
* session.
*/
function selectFreshCredential(candidates, uid, target, now, freshMarginMs) {
	for (const supply of candidates) {
		const candidate = supply();
		if (candidate?.credential?.uid === uid && candidate.target === target && isCredentialFresh(candidate.credential, now, freshMarginMs)) return candidate.credential;
	}
}
function createCredentialCache(storage) {
	return {
		read(uid) {
			let raw;
			try {
				raw = storage.read();
			} catch {
				return;
			}
			return raw === null ? void 0 : decodeCached(raw, uid);
		},
		write(session, target) {
			try {
				storage.write(encodeCached(session, target));
			} catch {}
		},
		clear() {
			try {
				storage.clear();
			} catch {}
		}
	};
}
//#endregion
//#region packages/account-core/src/core/requestTimeout.ts
/** Joins the caller's signal with an abort after `timeoutMs`, if one is set. */
function timedSignal(signal, timeoutMs) {
	if (timeoutMs === void 0) return {
		signal,
		release: () => void 0
	};
	const controller = new AbortController();
	const timer = setTimeout(() => controller.abort(), timeoutMs);
	return {
		signal: signal ? AbortSignal.any([signal, controller.signal]) : controller.signal,
		release: () => clearTimeout(timer)
	};
}
//#endregion
//#region packages/account-core/src/core/sessionTokenMint.ts
/**
* Workspace tokens for services that cannot read the session cookie. The
* session mints one at `POST /auth/token` on first use, and each token is
* reused per (session user, workspace) until it nears expiry. Failures come
* back as web-session codes; nothing here retries or signs out.
*/
var SessionTokenError = class extends Error {
	failure;
	constructor(failure) {
		super(`Workspace token mint failed: ${failure.code}`);
		this.failure = failure;
		this.name = "SessionTokenError";
	}
};
var DEFAULT_REFRESH_BUFFER_MS = 6e4;
var MAX_RETRY_AFTER_MS = 6e5;
var STATUS_RULES = {
	401: {
		byServerCode: {
			session_expired: "SESSION_EXPIRED",
			session_revoked: "SESSION_REVOKED",
			TOKEN_REVOKED: "SESSION_REVOKED"
		},
		fallback: "NO_SESSION"
	},
	403: {
		byServerCode: {
			csrf_invalid: "CSRF_STALE",
			workspace_access_denied: "WORKSPACE_ACCESS_DENIED",
			[SSO_REQUIRED_SERVER_CODE]: "SSO_REQUIRED"
		},
		fallback: "SESSION_REQUEST_REFUSED"
	},
	/** The workspace is unknown, deleted, or not the user's: one remedy. */
	404: {
		byServerCode: { NOT_FOUND: "WORKSPACE_ACCESS_DENIED" },
		fallback: "SESSION_REQUEST_REFUSED"
	}
};
var zServerCode = zErrorResponse.pick({ code: true });
function failure$1(code, httpStatus, serverCode) {
	return {
		status: "error",
		code,
		retryable: code === "SESSION_UNAVAILABLE",
		...httpStatus === void 0 ? {} : { httpStatus },
		...serverCode === void 0 ? {} : { serverCode }
	};
}
__name(failure$1, "failure");
async function readJson$1(response) {
	try {
		return await response.json();
	} catch {
		return;
	}
}
__name(readJson$1, "readJson");
/** Retry-After is delay-seconds or an HTTP-date; either is capped. */
function retryAfterMs(value, nowMs) {
	if (value === null) return void 0;
	const seconds = Number(value);
	const delayMs = Number.isFinite(seconds) ? seconds * 1e3 : Date.parse(value) - nowMs;
	return delayMs > 0 ? Math.min(delayMs, MAX_RETRY_AFTER_MS) : void 0;
}
function rateLimited(response, nowMs) {
	const limited = failure$1("SESSION_UNAVAILABLE", response.status);
	const waitMs = retryAfterMs(response.headers.get("Retry-After"), nowMs);
	return waitMs === void 0 ? limited : {
		...limited,
		retryAfterMs: waitMs
	};
}
function codeFor(status, serverCode) {
	const rule = STATUS_RULES[status];
	if (rule === void 0) return "SESSION_REQUEST_REFUSED";
	return rule.byServerCode[serverCode ?? ""] ?? rule.fallback;
}
function classifyFailure(response, body, nowMs) {
	const { status } = response;
	if (status === 429) return rateLimited(response, nowMs);
	if (status >= 500) return failure$1("SESSION_UNAVAILABLE", status);
	const parsed = zServerCode.safeParse(body);
	const serverCode = parsed.success ? parsed.data.code : void 0;
	return failure$1(codeFor(status, serverCode), status, serverCode);
}
function createSessionTokenMint({ apiBaseUrl, fetchImpl, getSession, now = Date.now, refreshBufferMs = DEFAULT_REFRESH_BUFFER_MS, timeoutMs }) {
	const tokenUrl = `${apiBaseUrl.replace(/\/+$/, "")}/auth/token`;
	/** Keyed by workspace; every entry belongs to `cacheOwner`. */
	const cache = /* @__PURE__ */ new Map();
	const inFlight = /* @__PURE__ */ new Map();
	let cacheOwner;
	/** Bumped on every owner change, so an older owner's answer never lands. */
	let ownerGeneration = 0;
	let rateLimit;
	function adoptOwner(userId) {
		if (cacheOwner === userId) return;
		cacheOwner = userId;
		ownerGeneration += 1;
		cache.clear();
		inFlight.clear();
		rateLimit = void 0;
	}
	async function request(session, workspaceId) {
		const { signal, release } = timedSignal(void 0, timeoutMs);
		try {
			const response = await fetchImpl(tokenUrl, {
				method: "POST",
				credentials: "include",
				headers: {
					"Content-Type": "application/json",
					"X-Comfy-Client": COMFY_CLIENT,
					"X-CSRF-Token": session.csrfToken,
					...workspaceId === void 0 ? {} : { "X-Comfy-Workspace-ID": workspaceId }
				},
				body: JSON.stringify(workspaceId === void 0 ? {} : { workspace_id: workspaceId }),
				signal
			});
			const body = await readJson$1(response);
			if (signal?.aborted) return failure$1("SESSION_UNAVAILABLE");
			return response.ok ? credentialFrom(session, response.status, body) : classifyFailure(response, body, now());
		} catch {
			return failure$1("SESSION_UNAVAILABLE");
		} finally {
			release();
		}
	}
	function credentialFrom(session, status, body) {
		const parsed = zExchangeTokenResponse.safeParse(body);
		const expiresAt = parsed.success ? Date.parse(parsed.data.expires_at) : NaN;
		if (!parsed.success || parsed.data.token === "" || !(expiresAt > now())) return failure$1("SESSION_UNAVAILABLE", status);
		return {
			status: "ok",
			credential: {
				token: parsed.data.token,
				expiresAt: Math.min(expiresAt, session.expiresAt),
				uid: session.user.id,
				workspace: parsed.data.workspace,
				role: parsed.data.role,
				permissions: parsed.data.permissions
			}
		};
	}
	function commit(workspaceId, generation, result) {
		if (generation !== ownerGeneration) return;
		if (result.status === "ok") {
			cache.set(workspaceId, result.credential);
			return;
		}
		if (result.httpStatus === 401) cache.clear();
		if (result.retryAfterMs !== void 0) rateLimit = {
			until: now() + result.retryAfterMs,
			failure: result
		};
	}
	async function mint(workspaceId) {
		const session = getSession();
		adoptOwner(session?.user.id);
		if (session === void 0) return failure$1("NO_SESSION");
		const userId = session.user.id;
		const cached = cache.get(workspaceId);
		if (cached && isCredentialFresh(cached, now(), refreshBufferMs)) return {
			status: "ok",
			credential: cached
		};
		if (rateLimit && now() < rateLimit.until) return rateLimit.failure;
		const joined = inFlight.get(workspaceId);
		if (joined) return joined;
		const generation = ownerGeneration;
		const running = request(session, workspaceId).then((result) => {
			if (inFlight.get(workspaceId) === running) inFlight.delete(workspaceId);
			const current = getSession();
			if (current === void 0) return failure$1("NO_SESSION");
			if (current.user.id !== userId) return failure$1("IDENTITY_CHANGED");
			commit(workspaceId, generation, result);
			return result;
		});
		inFlight.set(workspaceId, running);
		return running;
	}
	function remint(workspaceId) {
		if (!inFlight.has(workspaceId)) cache.delete(workspaceId);
		return mint(workspaceId);
	}
	return {
		mint,
		remint,
		async getWorkspaceToken(workspaceId) {
			const result = await mint(workspaceId);
			if (result.status === "ok") return result.credential.token;
			throw new SessionTokenError(result);
		}
	};
}
//#endregion
//#region packages/account-core/src/core/webSession.ts
/**
* Client for the shared web session on ingest (`/api/auth/session*`). It only
* sends and classifies: retries, boot rules, and sign-out belong to callers.
* Identity proof is an opaque string from the caller, so no provider leaks in.
*/
var UNAUTHORIZED_CODES = {
	no_session: "NO_SESSION",
	session_expired: "SESSION_EXPIRED",
	session_revoked: "SESSION_REVOKED",
	TOKEN_REVOKED: "SESSION_REVOKED"
};
var FORBIDDEN_CODES = {
	csrf_invalid: "CSRF_STALE",
	workspace_access_denied: "WORKSPACE_ACCESS_DENIED",
	[SSO_REQUIRED_SERVER_CODE]: "SSO_REQUIRED"
};
function failure(code, httpStatus, serverCode) {
	return {
		status: "error",
		code,
		retryable: code === "SESSION_UNAVAILABLE",
		...httpStatus === void 0 ? {} : { httpStatus },
		...serverCode === void 0 ? {} : { serverCode }
	};
}
/** Adds `has_personal_workspace` until ingest-types carries it. */
var zSessionResponse = zGetSessionResponse.extend({ user: zWebSessionUser.extend({ has_personal_workspace: booleanType().optional() }) });
async function readJson(response) {
	try {
		return await response.json();
	} catch {
		return;
	}
}
/** Classifies an ingest refusal the way every session call does. */
function classifyWebSessionFailure(status, body) {
	if (status === 429 || status >= 500) return failure("SESSION_UNAVAILABLE", status);
	const parsed = zErrorResponse.safeParse(body);
	if (!parsed.success) return failure("SESSION_REQUEST_REFUSED", status);
	const serverCode = parsed.data.code;
	return failure(status === 401 ? UNAUTHORIZED_CODES[serverCode] ?? "NO_SESSION" : status === 403 ? FORBIDDEN_CODES[serverCode] ?? "SESSION_REQUEST_REFUSED" : "SESSION_REQUEST_REFUSED", status, serverCode);
}
async function send(options, path, init) {
	const { signal, release } = timedSignal(options.signal, options.timeoutMs);
	try {
		const response = await options.fetchImpl(`${options.apiBaseUrl.replace(/\/+$/, "")}${path}`, {
			...init,
			credentials: "include",
			signal
		});
		const body = await readJson(response);
		if (signal?.aborted) return failure("SESSION_UNAVAILABLE");
		const { status } = response;
		return response.ok ? {
			status,
			body
		} : classifyWebSessionFailure(status, body);
	} catch {
		return failure("SESSION_UNAVAILABLE");
	} finally {
		release();
	}
}
async function readWebSession(options, { expectedUserId } = {}) {
	const sent = await send(options, "/auth/session", {
		method: "GET",
		cache: "no-store"
	});
	if ("code" in sent) return sent;
	const { status } = sent;
	const parsed = zSessionResponse.safeParse(sent.body);
	if (!parsed.success) return failure("SESSION_UNAVAILABLE", status);
	const { user, csrf_token, expires_at, absolute_expires_at } = parsed.data;
	if (expectedUserId !== void 0 && user.id !== expectedUserId) return failure("IDENTITY_CHANGED", status);
	return {
		status: "ok",
		session: {
			user: {
				id: user.id,
				email: user.email,
				name: user.name,
				emailVerified: user.email_verified,
				signInProvider: user.sign_in_provider,
				hasPersonalWorkspace: user.has_personal_workspace
			},
			csrfToken: csrf_token,
			expiresAt: Date.parse(expires_at),
			absoluteExpiresAt: Date.parse(absolute_expires_at)
		}
	};
}
/**
* Creates the session, then reads it back for the user and CSRF token. A
* failure to produce the proof is the provider's error and propagates.
*/
async function createWebSession(options, getIdentityProof, { expectedUserId } = {}) {
	const sent = await send(options, "/auth/session", {
		method: "POST",
		headers: { Authorization: `Bearer ${await getIdentityProof()}` }
	});
	if ("code" in sent) return sent;
	const parsed = zCreateSessionResponse.safeParse(sent.body);
	if (!parsed.success || !parsed.data.success) return failure("SESSION_UNAVAILABLE", sent.status);
	return readWebSession(options, { expectedUserId });
}
/** Sends no CSRF token: sign-out must work against a dead session. */
async function deleteWebSession(options) {
	const sent = await send(options, "/auth/session", { method: "DELETE" });
	if ("code" in sent) return sent;
	const parsed = zDeleteSessionResponse.safeParse(sent.body);
	if (!parsed.success || !parsed.data.success) return failure("SESSION_UNAVAILABLE", sent.status);
	return { status: "ok" };
}
/**
* Signs the user out of every device with the session cookie alone. Only a
* body the contract recognises is ok: the caller tells the user every device
* is signed out on that answer.
*/
async function revokeAllWebSessions(options, csrfToken) {
	const sent = await send(options, "/auth/sessions/revoke-all", {
		method: "POST",
		headers: {
			"X-Comfy-Client": COMFY_CLIENT,
			"X-CSRF-Token": csrfToken
		}
	});
	if ("code" in sent) return sent;
	if (!zRevokeAllSessionsResponse.safeParse(sent.body).success) return failure("SESSION_UNAVAILABLE", sent.status);
	return { status: "ok" };
}
//#endregion
//#region src/platform/auth/session/webSessionFetch.ts
/** A workspace-token mint failure whose message is localized user-facing copy. */
var WebSessionTokenError = class extends SessionTokenError {
	cause;
	constructor(original, message) {
		super(original.failure);
		this.message = message;
		this.name = "WebSessionTokenError";
		this.cause = original;
	}
};
async function refusalCode(response) {
	if (response.status !== 403) return void 0;
	const body = await response.clone().json().catch(() => void 0);
	return classifyWebSessionFailure(response.status, body).code;
}
/**
* Sends one ingest request on the session cookie. `csrf_invalid` is the one
* refusal a fresh token can fix, so it is retried once for the same user and
* workspace; `workspace_access_denied` drops that workspace and is returned
* as is, never replayed elsewhere; `sso_required` is reported and returned.
*/
async function fetchOnWebSession(url, init, scope, ports) {
	const send = async (current) => {
		const { headers, credentials } = await ports.authorize({
			kind: "session",
			session: current.session
		}, {
			target: "ingest",
			method: init.method ?? "GET",
			workspaceId: current.workspaceId
		});
		const merged = new Headers(init.headers);
		for (const [name, value] of Object.entries(headers)) merged.set(name, value);
		return fetch(url, {
			...init,
			headers: merged,
			credentials
		});
	};
	const response = await send(scope);
	const code = await refusalCode(response);
	if (code === "WORKSPACE_ACCESS_DENIED" && scope.workspaceId !== void 0) ports.workspaceDenied(scope.workspaceId);
	if (code === "SSO_REQUIRED") ports.ssoRequired(scope);
	if (code !== "CSRF_STALE" || init.body instanceof ReadableStream) return response;
	const fresh = await ports.refresh(scope);
	return fresh ? send(fresh) : response;
}
var provided;
/** Set while the web session is on for this page load; returns its release. */
function provideWebSessionRequests(requests) {
	provided = requests;
	return () => {
		if (provided === requests) provided = void 0;
	};
}
function webSessionRequests() {
	return provided;
}
/** True when the session is on and this tab is signed in on it. */
async function signedInOnWebSession() {
	return await provided?.scope() !== void 0;
}
/** Sends on the signed-in session, or undefined when this tab is not on it. */
async function webSessionSend() {
	const requests = webSessionRequests();
	if (!requests) return void 0;
	const scope = await requests.scope();
	return scope && ((url, init) => requests.send(url, init, scope));
}
/** Undefined unless the session is on and this tab is signed in on it. */
async function webSessionResourceHeader() {
	const requests = provided;
	if (!requests) return void 0;
	const scope = await requests.scope();
	return scope && requests.authorizeResource(scope);
}
/**
* Single gate for the reactive guard: a cloud build with `unified_cloud_auth`
* ON. Memoizes the feature-flag accessor so the hot `fetchApi` path does not
* build a fresh reactive proxy per request (the cached getter still reflects
* live flag changes), and is reused at every cloud request seam so the gate
* cannot be forgotten on a new call site.
*/
async function shouldRemintCloudRequest() {
	return false;
}
/**
* Re-mints the unified Cloud JWT once from the current Firebase identity and
* returns the fresh token, or `null` when there is nothing to retry with: no
* active unified session, or the re-mint failed. A permanent auth failure is
* surfaced + torn down inside `remintUnifiedOnce` (error toast + session clear,
* matching the proactive refresh path); the `catch` here only guards an
* unexpected throw (e.g. a chunk-load failure or no active Pinia), which it
* reports as `auth_unified_remint_unexpected`. Either way `null` makes the
* caller surface its original 401 unchanged.
*/
async function tryRemintToken(expectedToken) {
	try {
		const { useWorkspaceAuthStore } = await __vitePreload(async () => {
			const { useWorkspaceAuthStore } = await import("./workspaceAuthStore-Y8UVH0yZ.js");
			return { useWorkspaceAuthStore };
		}, __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61]), import.meta.url);
		return await useWorkspaceAuthStore().remintUnifiedOnce(expectedToken);
	} catch (err) {
		reportError(err, {
			surface: "auth",
			errorType: "auth_unified_remint_unexpected",
			tags: {
				failure_kind: "caught_unexpected",
				feature_area: "auth",
				operation: "auth",
				outcome: "failed"
			},
			level: "error"
		});
		return null;
	}
}
function trackRetry(transport, outcome, finalStatus, failureReason) {
	useTelemetry()?.trackUnifiedAuthRetry({
		transport,
		outcome,
		...finalStatus !== void 0 && { final_status: finalStatus },
		...failureReason !== void 0 && { failure_reason: failureReason }
	});
}
function trackRetryResponse(transport, status) {
	trackRetry(transport, status < 400 ? "succeeded" : "failed", status, status < 400 ? void 0 : "retry_rejected");
}
function bearerToken(authorization) {
	if (typeof authorization !== "string") return;
	return authorization.startsWith("Bearer ") ? authorization.slice(7) : void 0;
}
function fetchRequestHeaders(input, init) {
	if (init.headers !== void 0) return new Headers(init.headers);
	return input instanceof Request ? new Headers(input.headers) : new Headers();
}
/**
* Issues a `fetch` and, on a `401`, re-mints the unified Cloud JWT once and
* retries the request exactly once with the fresh token. A persistent `401`
* (or a `null` re-mint) surfaces the original Response unchanged — no retry
* loop. Requires a replayable body: a one-shot `ReadableStream` body cannot be
* replayed, so such a request surfaces its original `401` without a retry (no
* current cloud caller sends one).
*
* `shouldRetryOn401` is the caller's gate (see {@link shouldRemintCloudRequest}):
* flag-OFF traffic returns after a single `fetch` and never enters the re-mint
* path, so the legacy cascade stays untouched for instant rollback.
*
* `retrySignalLifecycle`, when supplied, ends the initial fetch's timeout
* before re-minting and creates a fresh signal immediately before the retry.
*/
async function fetchWithUnifiedRemint(input, init, shouldRetryOn401, retrySignalLifecycle) {
	const retryInput = shouldRetryOn401 && input instanceof Request && input.body !== null ? input.clone() : input;
	const response = await fetch(input, init);
	if (response.status === 403 && false);
	if (!shouldRetryOn401 || response.status !== 401) return response;
	if (init.body instanceof ReadableStream) {
		console.warn("fetchWithUnifiedRemint: a ReadableStream body is not replayable; surfacing the original 401");
		trackRetry("fetch", "failed", response.status, "non_replayable_body");
		return response;
	}
	const requestHeaders = fetchRequestHeaders(input, init);
	const expectedToken = bearerToken(requestHeaders.get("Authorization"));
	if (!expectedToken) {
		trackRetry("fetch", "failed", response.status, "missing_bearer");
		return response;
	}
	retrySignalLifecycle?.clearInitialTimeout();
	const token = await tryRemintToken(expectedToken);
	if (!token) {
		trackRetry("fetch", "failed", response.status, "remint_failed");
		return response;
	}
	const headers = requestHeaders;
	headers.set("Authorization", `Bearer ${token}`);
	const retryInit = retrySignalLifecycle ? {
		...init,
		headers,
		signal: retrySignalLifecycle.createSignal()
	} : {
		...init,
		headers
	};
	try {
		const retryResponse = await fetch(retryInput, retryInit);
		trackRetryResponse("fetch", retryResponse.status);
		return retryResponse;
	} catch (error) {
		trackRetry("fetch", "failed", void 0, "retry_request_failed");
		throw error;
	}
}
function isRetriableUnauthorized(error) {
	if (!axios.isAxiosError(error)) return false;
	const config = error.config;
	if (!config || config.__unifiedRetried || config.__skipUnifiedRemint) return false;
	return error.response?.status === 401;
}
async function presentSsoRefusal(error) {}
/**
* Installs a response interceptor that gives a cloud axios client the same
* reactive 401 guard as {@link fetchWithUnifiedRemint}: a single re-mint + a
* single retry on `401`, surfacing a persistent `401` unchanged. A strict
* no-op while `unified_cloud_auth` is OFF — the original error rejects exactly
* as it does today.
*/
function attachUnifiedRemintInterceptor(client) {
	client.interceptors.response.use((response) => response, async (error) => {
		await presentSsoRefusal(error);
		if (!isRetriableUnauthorized(error) || !await shouldRemintCloudRequest()) throw error;
		const expectedToken = bearerToken(new AxiosHeaders(error.config.headers).get("Authorization"));
		if (!expectedToken) {
			trackRetry("axios", "failed", 401, "missing_bearer");
			throw error;
		}
		const token = await tryRemintToken(expectedToken);
		if (!token) {
			trackRetry("axios", "failed", 401, "remint_failed");
			throw error;
		}
		const { config } = error;
		const headers = new AxiosHeaders(config.headers);
		headers.set("Authorization", `Bearer ${token}`);
		try {
			const retryResponse = await client.request({
				...config,
				headers,
				__unifiedRetried: true
			});
			trackRetryResponse("axios", retryResponse.status);
			return retryResponse;
		} catch (retryError) {
			const finalStatus = axios.isAxiosError(retryError) ? retryError.response?.status : void 0;
			trackRetry("axios", "failed", finalStatus, finalStatus !== void 0 ? "retry_rejected" : "retry_request_failed");
			throw retryError;
		}
	});
}
//#endregion
//#region packages/account-core/src/core/identity.ts
/**
* The brand is a compile-time gate only: `createSessionClient` rejects an
* unbranded port in the type system, and no runtime check remains. The
* package's own identity entries mint it, and `./testing` deliberately
* re-exports the minter as `createTestIdentity` so a suite can brand a fake.
*/
var identityBrand = Symbol("@comfyorg/account-core identity");
function brandIdentity(port) {
	return {
		...port,
		[identityBrand]: true
	};
}
//#endregion
//#region packages/account-core/src/firebaseAuthError.ts
/**
* The user or their browser dismissed/blocked the popup — an outcome to warn
* about and retry on a fresh gesture, never an app fault.
*/
var POPUP_DISMISSED_CODES = [
	"auth/popup-closed-by-user",
	"auth/cancelled-popup-request",
	"auth/popup-blocked"
];
/**
* The origin is not on the Firebase authorized-domains list (or a continue
* URI is unauthorized): auth cannot work here at all until configuration
* changes, so the host should say so rather than offer a retry.
*/
var UNAUTHORIZED_DOMAIN_CODES = [
	"auth/unauthorized-domain",
	"auth/invalid-dynamic-link-domain",
	"auth/unauthorized-continue-uri"
];
function isFirebaseAuthErrorLike(error) {
	return typeof error === "object" && error !== null && "code" in error && typeof error.code === "string" && error.code.startsWith("auth/") && "message" in error && typeof error.message === "string";
}
function classifyAuthError(error) {
	if (!isFirebaseAuthErrorLike(error)) return { kind: "unknown" };
	if (UNAUTHORIZED_DOMAIN_CODES.includes(error.code)) return {
		kind: "unauthorized-domain",
		code: error.code
	};
	if (error.message.toLowerCase().includes("signup_blocked")) return {
		kind: "signup-blocked",
		code: error.code
	};
	if (POPUP_DISMISSED_CODES.includes(error.code)) return {
		kind: "popup-dismissed",
		code: error.code
	};
	return {
		kind: "auth",
		code: error.code
	};
}
/**
* The cloud app's toast-severity policy for classified auth failures: a
* dismissed popup is the user changing their mind, not an application
* error; everything else alarms.
*/
function severityForAuthError(classification) {
	return classification.kind === "popup-dismissed" ? "warn" : "error";
}
/** Resolved to the invalid-credential line whatever table is in play. */
var ENUMERATION_NEUTRAL_CODES = /* @__PURE__ */ new Set(["auth/user-not-found", "auth/wrong-password"]);
/**
* The detail copy for a classified failure, resolved against the host copy:
* a code the table knows gets its own line, anything else the generic line, a
* blocked sign-up its named copy. The user-not-found / wrong-password pair
* collapses to the invalid-credential line so a sign-in attempt can never
* reveal whether an email has an account. Unauthorized domains need the
* host's domain and support address, which the host interpolates itself.
*/
function authErrorMessage(classification, copy) {
	switch (classification.kind) {
		case "signup-blocked": return copy.signupBlocked;
		case "popup-dismissed":
		case "auth":
			if (ENUMERATION_NEUTRAL_CODES.has(classification.code)) return copy["auth/invalid-credential"] ?? copy.generic;
			return copy[classification.code] ?? copy.generic;
		case "unauthorized-domain":
		case "unknown": return copy.generic;
	}
}
//#endregion
//#region packages/account-core/src/firebase/popupWatch.ts
/** Frequent enough to feel immediate; one `closed` read per tick. */
var CLOSED_POLL_MS = 100;
var attemptsByProvider = /* @__PURE__ */ new WeakMap();
var attemptsByEventId = /* @__PURE__ */ new Map();
var wrappedManagers = /* @__PURE__ */ new WeakSet();
var observedAuths = /* @__PURE__ */ new WeakSet();
function isObject(value) {
	return typeof value === "object" && value !== null;
}
function isResolverClass(value) {
	if (typeof value !== "function") return false;
	const prototype = value.prototype;
	return typeof prototype === "object" && prototype !== null && "_initialize" in prototype && "_openPopup" in prototype;
}
function isEventManager(value) {
	return typeof value === "object" && value !== null && "onEvent" in value && typeof value.onEvent === "function";
}
function popupWindowOf(popup) {
	if (typeof popup !== "object" || popup === null || !("window" in popup)) return void 0;
	const { window } = popup;
	return typeof window === "object" && window !== null && "closed" in window ? window : void 0;
}
function stopPolling(attempt) {
	clearInterval(attempt.poll);
	attempt.poll = void 0;
}
function deliver(original, event) {
	const attempt = event.type === "signInViaPopup" && typeof event.eventId === "string" ? attemptsByEventId.get(event.eventId) : void 0;
	if (!attempt) return original(event);
	stopPolling(attempt);
	if (!attempt.abandoned || event.error) return original(event);
	if (shouldDiscard(attempt)) return true;
	attempt.abandoned = false;
	try {
		attempt.callbacks.onResumed?.();
	} catch {}
	return original(event);
}
function shouldDiscard(attempt) {
	try {
		return attempt.callbacks.discardLateResult?.() ?? false;
	} catch {
		return true;
	}
}
/** Ties the attempt to its latest popup, dropping any earlier one's watch. */
function watchWindow(attempt, eventId, popup) {
	stopPolling(attempt);
	if (attempt.eventId) attemptsByEventId.delete(attempt.eventId);
	attempt.eventId = eventId;
	attemptsByEventId.set(eventId, attempt);
	attempt.poll = setInterval(() => {
		if (popup.closed !== true) return;
		stopPolling(attempt);
		attempt.abandoned = true;
		attempt.callbacks.onAbandoned?.();
	}, CLOSED_POLL_MS);
}
function watchingResolver(Base) {
	return class WatchingPopupRedirectResolver extends Base {
		async _initialize(auth) {
			const manager = await super._initialize(auth);
			if (!isEventManager(manager)) return manager;
			if (!wrappedManagers.has(manager)) {
				const original = manager.onEvent.bind(manager);
				manager.onEvent = (event) => deliver(original, event);
				wrappedManagers.add(manager);
			}
			if (isObject(auth)) observedAuths.add(auth);
			return manager;
		}
		async _openPopup(auth, provider, authType, eventId) {
			const popup = await super._openPopup(auth, provider, authType, eventId);
			const attempt = isObject(provider) ? attemptsByProvider.get(provider) : void 0;
			const popupWindow = popupWindowOf(popup);
			const observed = isObject(auth) && observedAuths.has(auth);
			if (attempt && observed && eventId && popupWindow) watchWindow(attempt, eventId, popupWindow);
			return popup;
		}
	};
}
/**
* The resolver a watched identity's Auth is created with. One for the whole
* page, so Auth created again for the same app is handed the same resolver.
* Firebase's own when its resolver cannot be extended.
*/
var watchedPopupRedirectResolver = isResolverClass(browserPopupRedirectResolver) ? watchingResolver(browserPopupRedirectResolver) : browserPopupRedirectResolver;
/**
* Runs one popup sign-in for `provider`, the object passed to
* `signInWithPopup`, reporting through `callbacks` while it is pending.
*/
async function runWatchedPopup(provider, signIn, callbacks) {
	const attempt = {
		callbacks,
		abandoned: false
	};
	attemptsByProvider.set(provider, attempt);
	try {
		return await signIn();
	} finally {
		stopPolling(attempt);
		attemptsByProvider.delete(provider);
		if (attempt.eventId) attemptsByEventId.delete(attempt.eventId);
	}
}
//#endregion
//#region packages/account-core/src/firebase/index.ts
function googleProvider() {
	const provider = new GoogleAuthProvider();
	provider.addScope("email");
	provider.setCustomParameters({ prompt: "select_account" });
	return provider;
}
function githubProvider() {
	const provider = new GithubAuthProvider();
	provider.addScope("user:email");
	provider.setCustomParameters({ prompt: "select_account" });
	return provider;
}
/**
* An unknown email must look exactly like a sent reset, which is how Firebase
* itself answers with email enumeration protection on; a distinct failure
* here would be an account enumeration oracle.
*/
function resolveUnknownEmailAsSent(error) {
	if (isFirebaseAuthErrorLike(error) && error.code === "auth/user-not-found") return;
	throw error;
}
/** What `getAuth` hands `initializeAuth` in a browser; read only when needed. */
function getAuthPersistence() {
	return [
		indexedDBLocalPersistence,
		browserLocalPersistence,
		browserSessionPersistence
	];
}
/**
* A pre-existing app under this name must be the same Firebase project, or
* `Auth` binds to another project's session. Deliberately a "same project"
* check on the fields that pick a session, not the SDK's byte-identical
* compare: `appId` is Installations/Analytics, so omitting it from a partial
* same-project config still binds rather than failing boot.
*/
function assertSameProject(existing, requested, appName) {
	const mismatch = [
		"projectId",
		"apiKey",
		"authDomain"
	].filter((key) => existing[key] !== requested[key]).join(", ");
	if (mismatch) throw new Error(`Firebase app "${appName}" already exists for a different project (${mismatch})`);
}
/** What `initializeAuth` needs beyond `getAuth`'s defaults; none means `getAuth`. */
function authDependencies(persistence, watchPopupSignIn) {
	if (!persistence && !watchPopupSignIn) return void 0;
	return {
		persistence: persistence ?? getAuthPersistence(),
		popupRedirectResolver: watchPopupSignIn ? watchedPopupRedirectResolver : browserPopupRedirectResolver
	};
}
/**
* When only the popup watch asked for `initializeAuth`, an Auth that already
* exists for the app is reused as `getAuth` would, unwatched, rather than
* failing sign-in.
*/
function initializeOrReuse(app, dependencies, mayReuse) {
	try {
		return initializeAuth(app, dependencies);
	} catch (error) {
		if (mayReuse && isFirebaseAuthErrorLike(error) && error.code === "auth/already-initialized") return getAuth(app);
		throw error;
	}
}
/**
* Host persistence goes through `initializeAuth`, whether this entry creates
* the named app or another script already did: Firebase allows one Auth per
* app, so an Auth another module initialized with different dependencies
* fails with `auth/already-initialized` instead of silently winning. Unlike
* `getAuth`, `initializeAuth` wires no popup resolver of its own, and popup
* sign-in throws `auth/argument-error` without one.
*/
function authResolver(config) {
	if (config.auth) {
		const { auth } = config;
		return {
			resolve: () => auth,
			peek: () => auth
		};
	}
	const appName = config.appName ?? "comfy-account";
	let resolved;
	const resolve = () => {
		if (resolved) return resolved;
		const options = typeof config.options === "function" ? config.options() : config.options;
		const existing = getApps().find((app) => app.name === appName);
		if (existing) assertSameProject(existing.options, options, appName);
		const app = existing ?? initializeApp(options, appName);
		const dependencies = authDependencies(config.persistence, config.watchPopupSignIn);
		resolved = dependencies ? initializeOrReuse(app, dependencies, !config.persistence) : getAuth(app);
		return resolved;
	};
	return {
		resolve,
		peek: () => resolved
	};
}
function createFirebaseIdentity(config) {
	const { resolve: auth, peek } = authResolver(config);
	let signInsStarted = 0;
	function popupSignIn(createProvider, options) {
		const started = ++signInsStarted;
		const provider = createProvider();
		const signIn = () => signInWithPopup(auth(), provider);
		if (!config.watchPopupSignIn) return signIn();
		let userAtStart = null;
		Promise.resolve().then(() => auth().authStateReady()).then(() => {
			userAtStart = auth().currentUser?.uid;
		}).catch(() => {});
		return new Promise((resolve, reject) => {
			const firebaseCall = runWatchedPopup(provider, signIn, {
				onAbandoned: () => reject(new FirebaseError("auth/popup-closed-by-user", "The popup has been closed by the user before finalizing the operation.")),
				discardLateResult: () => !options?.onResumed || signInsStarted !== started || auth().currentUser?.uid !== userAtStart || options.keepLateResult?.() === false,
				onResumed: () => options?.onResumed?.(firebaseCall)
			});
			firebaseCall.then(resolve, reject);
		});
	}
	return {
		...brandIdentity({ onUserChanged: (callback) => onAuthStateChanged(auth(), callback) }),
		onTokenChanged: (callback) => onIdTokenChanged(auth(), callback),
		initialize: () => {
			auth();
		},
		currentUser: () => peek()?.currentUser ?? null,
		signInWithGoogle: (options) => popupSignIn(googleProvider, options),
		signInWithGitHub: (options) => popupSignIn(githubProvider, options),
		signInWithEmail: (email, password) => {
			signInsStarted += 1;
			return signInWithEmailAndPassword(auth(), email, password);
		},
		createUserWithEmail: (email, password) => {
			signInsStarted += 1;
			return createUserWithEmailAndPassword(auth(), email, password);
		},
		sendPasswordReset: (email) => sendPasswordResetEmail(auth(), email).catch(resolveUnknownEmailAsSent),
		updatePassword: (newPassword) => {
			const user = auth().currentUser;
			return user ? updatePassword(user, newPassword) : Promise.reject(/* @__PURE__ */ new Error("No signed-in user to update the password for"));
		},
		signOut: () => signOut(auth())
	};
}
//#endregion
//#region src/config/firebase.ts
var DEV_CONFIG = {
	apiKey: "AIzaSyDa_YMeyzV0SkVe92vBZ1tVikWBmOU5KVE",
	authDomain: "dreamboothy-dev.firebaseapp.com",
	databaseURL: "https://dreamboothy-dev-default-rtdb.firebaseio.com",
	projectId: "dreamboothy-dev",
	storageBucket: "dreamboothy-dev.appspot.com",
	messagingSenderId: "313257147182",
	appId: "1:313257147182:web:be38f6ebf74345fc7618bf",
	measurementId: "G-YEVSMYXSPY"
};
var BUILD_TIME_CONFIG = DEV_CONFIG;
/**
* Firebase config for the current backend: the server's firebase_config (cloud builds),
* else the bundled DEV_CONFIG when the server reports a dev-tier backend, else the build-time default.
*/
function getFirebaseConfig() {
	const runtimeConfig = remoteConfig.value.firebase_config;
	if (runtimeConfig) return runtimeConfig;
	if (remoteConfig.value.firebase_env === "dev") return DEV_CONFIG;
	return BUILD_TIME_CONFIG;
}
//#endregion
//#region src/platform/auth/firebaseIdentity.ts
var FirebaseBeforeRemoteConfigError = class extends Error {
	constructor() {
		super("Firebase resolved before remote config loaded: initialize() belongs after the startup/remote-config phase");
		this.name = "FirebaseBeforeRemoteConfigError";
	}
};
function loadedFirebaseConfig() {
	if (remoteConfigState.value === "unloaded") throw new FirebaseBeforeRemoteConfigError();
	return getFirebaseConfig();
}
/**
* `[DEFAULT]` keeps the session key persisted sign-ins and the e2e seed are
* stored under. Firebase reads an existing user from every listed persistence
* in order and migrates it into the first available one, so a session that
* vuefire's IndexedDB default persisted (the e2e seed too) is restored and
* settles in localStorage, where `setPersistence(auth, browserLocalPersistence)`
* used to move it.
*/
var firebaseIdentity = createFirebaseIdentity({
	options: loadedFirebaseConfig,
	appName: "[DEFAULT]",
	persistence: [
		browserLocalPersistence,
		indexedDBLocalPersistence,
		browserSessionPersistence
	],
	watchPopupSignIn: true
});
//#endregion
//#region src/platform/auth/session/webSessionUser.ts
var webSessionUser = shallowRef();
/**
* Gets a session override for any feature flag, requested via `?ff=name` to
* turn it on or `?ff=name:value` for a specific value, repeatable to override
* several flags at once. A nameless `?ff=` clears the session.
*
* The request is captured into `sessionStorage` on the first read, so it
* survives reloads and in-app navigation but dies when the tab closes. Capture
* happens before authentication resolves; the employee check is re-evaluated
* on every read instead, against the SDK's current user. That read carries no
* reactive dependency of its own, so a flag flips on the next read after the
* user is known, not the moment it is.
*
* Returns undefined (not null) as the "no override" sentinel, matching
* `getDevOverride`.
*/
function getSessionOverride(flagKey) {}
//#endregion
//#region src/lib/litegraph/src/types/widgets.ts
function isWidgetValue(value) {
	if (value == null) return true;
	if (typeof value === "string") return true;
	if (typeof value === "number") return true;
	if (typeof value === "boolean") return true;
	return typeof value === "object";
}
//#endregion
//#region src/types/linkId.ts
function toLinkId(value) {
	return value;
}
function parseLinkId(value) {
	const id = Number(value);
	return Number.isSafeInteger(id) && String(id) === value ? toLinkId(id) : void 0;
}
//#endregion
//#region src/types/rerouteId.ts
function toRerouteId(value) {
	return value;
}
//#endregion
//#region src/platform/workflow/validation/schemas/workflowSchema.ts
var zRendererType = enumType([
	"LG",
	"Vue",
	"Vue-corrected"
]);
var zNodeId = unionType([numberType().int(), stringType()]);
var zNodeInputName = stringType();
var zSlotIndex = unionType([numberType().int(), stringType().transform((val) => parseInt(val)).refine((val) => !isNaN(val), { message: "Invalid number" })]);
var zDataType = unionType([
	stringType(),
	arrayType(stringType()),
	numberType()
]);
var zVector2 = unionType([objectType({
	0: numberType(),
	1: numberType()
}).passthrough().transform((v) => [v[0], v[1]]), tupleType([numberType(), numberType()])]);
var zModelFile = objectType({
	name: stringType(),
	url: stringType().url(),
	hash: stringType().optional(),
	hash_type: stringType().optional(),
	directory: stringType()
});
/**
* A node's declared model entry. Only `name` is required - the shape a
* workflow must declare to pass validation is `zModelFile`, and a workflow
* that failed it still loads.
*/
var zDeclaredModelFile = objectType({
	name: stringType(),
	url: stringType().optional(),
	hash: stringType().optional(),
	hash_type: stringType().optional(),
	directory: stringType().optional()
});
var zGraphState = objectType({
	lastGroupId: numberType(),
	lastNodeId: numberType(),
	lastLinkId: numberType(),
	lastRerouteId: numberType()
}).passthrough();
var zComfyLink = tupleType([
	numberType(),
	zNodeId,
	zSlotIndex,
	zNodeId,
	zSlotIndex,
	zDataType
]);
/** Extension to 0.4 schema (links as arrays): parent reroute ID */
var zComfyLinkExtension = objectType({
	id: numberType(),
	parentId: numberType()
}).passthrough();
var zLinkPresentationFields = {
	hidden: booleanType().optional(),
	label: stringType().optional()
};
var zComfyLinkPresentation = objectType(zLinkPresentationFields).passthrough();
var zComfyLinkObject = objectType({
	id: numberType(),
	origin_id: zNodeId,
	origin_slot: zSlotIndex,
	target_id: zNodeId,
	target_slot: zSlotIndex,
	type: zDataType,
	parentId: numberType().optional(),
	...zLinkPresentationFields
}).passthrough();
var zReroute = objectType({
	id: numberType(),
	parentId: numberType().optional(),
	pos: zVector2,
	linkIds: arrayType(numberType()).nullish(),
	floating: objectType({ slotType: enumType(["input", "output"]) }).optional()
}).passthrough();
var zNodeOutput = objectType({
	name: stringType(),
	type: zDataType,
	links: arrayType(numberType()).nullable().optional(),
	slot_index: zSlotIndex.optional()
}).passthrough();
var zNodeInput = objectType({
	name: zNodeInputName,
	type: zDataType,
	link: numberType().nullable().optional(),
	slot_index: zSlotIndex.optional()
}).passthrough();
var zFlags = objectType({
	collapsed: booleanType().optional(),
	pinned: booleanType().optional(),
	allow_interaction: booleanType().optional(),
	horizontal: booleanType().optional(),
	skip_repeated_outputs: booleanType().optional()
}).passthrough();
var repoLikeIdPattern = /^[a-zA-Z0-9](?:[a-zA-Z0-9._-]*[a-zA-Z0-9])?$/;
var githubUsernamePattern = /^(?!-)(?!.*--)[a-zA-Z0-9-]+(?<!-)$/;
var gitHashPattern = /^[0-9a-f]{4,40}$/i;
var semverPattern = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-([\da-z-]+(?:\.[\da-z-]+)*))?(?:\+([\da-z-]+(?:\.[\da-z-]+)*))?$/;
var zRepoLikeId = stringType().min(1).max(100).regex(repoLikeIdPattern, { message: "ID can only contain ASCII letters, digits, '_', '-', and '.'" }).refine((id) => !/^[_\-.]|[_\-.]$/.test(id), { message: "ID must not start or end with '_', '-', or '.'" });
var zCnrId = zRepoLikeId;
var zGithubRepoName = zRepoLikeId;
var zGithubUsername = stringType().min(1).max(39).regex(githubUsernamePattern, "Invalid GitHub username/org");
var zAuxId = stringType().regex(/^[^/]+\/[^/]+$/, "Invalid format. Must be 'github-user/repo-name'").transform((id) => id.split("/")).refine(([username, repo]) => zGithubUsername.safeParse(username).success && zGithubRepoName.safeParse(repo).success, "Invalid aux_id: Must be valid 'github-username/github-repo-name'").transform(([username, repo]) => `${username}/${repo}`);
var zGitHash = stringType().superRefine((val, ctx) => {
	if (!gitHashPattern.test(val)) ctx.addIssue({
		code: ZodIssueCode.custom,
		message: `Node pack version has invalid Git commit hash: "${val}"`
	});
});
var zSemVer = stringType().superRefine((val, ctx) => {
	if (!semverPattern.test(val)) ctx.addIssue({
		code: ZodIssueCode.custom,
		message: `Node pack version has invalid semantic version: "${val}"`
	});
});
var zVersion = unionType([stringType().transform((ver) => ver.replace(/^v/, "")).pipe(unionType([zSemVer, zGitHash])), literalType("unknown")]);
var zNodeProperty = unionType([
	stringType(),
	numberType(),
	booleanType(),
	nullType(),
	recordType(unknownType()),
	arrayType(unknownType())
]);
var zProperties = objectType({
	["Node name for S&R"]: stringType().optional(),
	cnr_id: zCnrId.optional(),
	aux_id: zAuxId.optional(),
	ver: zVersion.optional(),
	models: arrayType(zModelFile).optional()
}).catchall(zNodeProperty.optional());
var zWidgetValue = custom(isWidgetValue);
var zWidgetValues = unionType([arrayType(zWidgetValue), recordType(zWidgetValue)]);
var MAX_CLIPBOARD_WIDGET_VALUES = 1e4;
function hasSupportedClipboardWidgetValuesLength(values) {
	if (!values || Array.isArray(values)) return true;
	return typeof values.length !== "number" || values.length <= MAX_CLIPBOARD_WIDGET_VALUES;
}
function isArrayLikeLength(value) {
	return typeof value === "number" && Number.isSafeInteger(value) && value >= 0;
}
function normalizeClipboardWidgetValues(values) {
	if (!values || Array.isArray(values)) return values;
	const length = values.length;
	if (!isArrayLikeLength(length)) return [];
	const normalized = [];
	normalized.length = length;
	for (const [key, value] of Object.entries(values)) {
		const index = Number(key);
		if (Number.isInteger(index) && index >= 0 && index < length) normalized[index] = value;
	}
	return normalized;
}
function normalizeClipboardNodeWidgets(node) {
	const values = node.widgets_values;
	if (values && !Array.isArray(values) && typeof values.length !== "number") return {
		...node,
		widgets_values: void 0,
		widgets_values_named: { ...values }
	};
	return {
		...node,
		widgets_values: normalizeClipboardWidgetValues(values)
	};
}
var zComfyNode = objectType({
	id: zNodeId,
	type: stringType(),
	pos: zVector2,
	size: zVector2,
	flags: zFlags,
	order: numberType(),
	mode: numberType(),
	inputs: arrayType(zNodeInput).optional(),
	outputs: arrayType(zNodeOutput).optional(),
	properties: zProperties,
	widgets_values: zWidgetValues.optional(),
	color: stringType().optional(),
	bgcolor: stringType().optional()
}).passthrough();
var zSubgraphIO = zNodeInput.extend({
	/** Slot ID (internal; never changes once instantiated). */
	id: stringType().uuid(),
	/** The data type this slot uses. Unlike nodes, this does not support legacy numeric types. */
	type: stringType(),
	/** Links connected to this slot, or `undefined` if not connected. An output slot should only ever have one link. */
	linkIds: arrayType(numberType()).optional()
});
var zSubgraphInstance = objectType({
	id: zNodeId,
	type: stringType().uuid(),
	pos: zVector2,
	size: zVector2,
	flags: zFlags,
	order: numberType(),
	mode: numberType(),
	inputs: arrayType(zSubgraphIO).optional(),
	outputs: arrayType(zSubgraphIO).optional(),
	widgets_values: zWidgetValues.optional(),
	color: stringType().optional(),
	bgcolor: stringType().optional()
}).passthrough();
var zGroup = objectType({
	id: numberType().optional(),
	title: stringType(),
	bounding: tupleType([
		numberType(),
		numberType(),
		numberType(),
		numberType()
	]),
	color: stringType().optional(),
	font_size: numberType().optional(),
	locked: booleanType().optional()
}).passthrough();
var zDS = objectType({
	scale: numberType(),
	offset: zVector2
}).passthrough();
var zConfig = objectType({
	links_ontop: booleanType().optional(),
	align_to_grid: booleanType().optional()
}).passthrough();
var zExtra = objectType({
	ds: zDS.optional(),
	frontendVersion: stringType().optional(),
	linkExtensions: arrayType(zComfyLinkExtension).optional(),
	linkPresentation: recordType(stringType().refine((value) => parseLinkId(value) !== void 0, { message: "Expected a canonical integer link ID" }), zComfyLinkPresentation).optional(),
	reroutes: arrayType(zReroute).optional(),
	workflowRendererVersion: zRendererType.optional(),
	BlueprintDescription: stringType().optional(),
	BlueprintSearchAliases: arrayType(stringType()).optional(),
	linearMode: booleanType().optional(),
	linearData: objectType({
		inputs: arrayType(unionType([tupleType([
			zNodeId,
			stringType(),
			objectType({ height: numberType().optional() }).passthrough()
		]), tupleType([zNodeId, stringType()])])).optional(),
		outputs: arrayType(zNodeId).optional()
	}).optional()
}).passthrough();
var zGraphDefinitions = objectType({ subgraphs: lazyType(() => arrayType(zSubgraphDefinition)) });
var zBaseExportableGraph = objectType({
	/** Unique graph ID.  Automatically generated if not provided. */
	id: stringType().uuid().optional(),
	revision: numberType().optional(),
	config: zConfig.optional().nullable(),
	/** Details of the appearance and location of subgraphs shown in this graph. Similar to */
	subgraphs: arrayType(zSubgraphInstance).optional()
});
/** Schema version 0.4 */
var zComfyWorkflow = zBaseExportableGraph.extend({
	id: stringType().uuid().optional(),
	revision: numberType().optional(),
	last_node_id: zNodeId,
	last_link_id: numberType(),
	nodes: arrayType(zComfyNode),
	links: arrayType(zComfyLink),
	floatingLinks: arrayType(zComfyLinkObject).optional(),
	groups: arrayType(zGroup).optional(),
	config: zConfig.optional().nullable(),
	extra: zExtra.optional().nullable(),
	version: numberType(),
	models: arrayType(zModelFile).optional(),
	definitions: zGraphDefinitions.optional()
}).passthrough();
/** Schema version 1 */
var zComfyWorkflow1 = zBaseExportableGraph.extend({
	id: stringType().uuid().optional(),
	revision: numberType().optional(),
	version: literalType(1),
	config: zConfig.optional().nullable(),
	state: zGraphState,
	groups: arrayType(zGroup).optional(),
	nodes: arrayType(zComfyNode),
	links: arrayType(zComfyLinkObject).optional(),
	floatingLinks: arrayType(zComfyLinkObject).optional(),
	reroutes: arrayType(zReroute).optional(),
	extra: zExtra.optional().nullable(),
	models: arrayType(zModelFile).optional(),
	definitions: objectType({ subgraphs: lazyType(() => arrayType(zSubgraphDefinition)) }).optional()
}).passthrough();
var zExportedSubgraphIONode = objectType({
	id: zNodeId,
	bounding: tupleType([
		numberType(),
		numberType(),
		numberType(),
		numberType()
	]),
	pinned: booleanType().optional()
});
var zExposedWidget = objectType({
	id: stringType(),
	name: stringType()
});
/** A subgraph definition `worfklow.definitions.subgraphs` */
var zSubgraphDefinition = zComfyWorkflow1.extend({
	/** Unique graph ID.  Automatically generated if not provided. */
	id: stringType().uuid(),
	revision: numberType(),
	name: stringType(),
	/** Optional description shown as tooltip when hovering over the subgraph node. */
	description: stringType().optional(),
	category: stringType().optional(),
	essentials_category: stringType().optional(),
	inputNode: zExportedSubgraphIONode,
	outputNode: zExportedSubgraphIONode,
	/** Ordered list of inputs to the subgraph itself. Similar to a reroute, with the input side in the graph, and the output side in the subgraph. */
	inputs: arrayType(zSubgraphIO).optional(),
	/** Ordered list of outputs from the subgraph itself. Similar to a reroute, with the input side in the subgraph, and the output side in the graph. */
	outputs: arrayType(zSubgraphIO).optional(),
	/** A list of node widgets displayed in the parent graph, on the subgraph object. */
	widgets: arrayType(zExposedWidget).optional(),
	definitions: objectType({ subgraphs: lazyType(() => zSubgraphDefinition.array()) }).optional()
}).passthrough();
var zClipboardNode = zComfyNode.refine((node) => hasSupportedClipboardWidgetValuesLength(node.widgets_values), {
	path: ["widgets_values"],
	message: "Clipboard widget values length is too large"
}).transform(normalizeClipboardNodeWidgets);
var zClipboardSubgraphInstance = zSubgraphInstance.refine((node) => hasSupportedClipboardWidgetValuesLength(node.widgets_values), {
	path: ["widgets_values"],
	message: "Clipboard widget values length is too large"
}).transform(normalizeClipboardNodeWidgets);
var zClipboardGroup = zGroup.transform((group) => ({
	...group,
	id: group.id ?? -1
}));
var zClipboardReroute = zReroute.transform((reroute) => ({
	...reroute,
	linkIds: reroute.linkIds ?? []
}));
var zClipboardSubgraphDefinition = zSubgraphDefinition.extend({
	groups: arrayType(zClipboardGroup).optional(),
	nodes: arrayType(zClipboardNode),
	reroutes: arrayType(zClipboardReroute).optional(),
	subgraphs: arrayType(zClipboardSubgraphInstance).optional(),
	definitions: objectType({ subgraphs: lazyType(() => arrayType(zClipboardSubgraphDefinition)) }).optional()
}).transform(({ config, extra, ...subgraph }) => {
	const normalizedExtra = extra ? {
		...extra,
		reroutes: extra.reroutes?.map((reroute) => ({
			...reroute,
			linkIds: reroute.linkIds ?? []
		})),
		linkExtensions: extra.linkExtensions?.map((link) => ({
			...link,
			id: toLinkId(link.id),
			parentId: toRerouteId(link.parentId)
		}))
	} : void 0;
	return {
		...subgraph,
		config: config ?? void 0,
		extra: normalizedExtra
	};
});
var zClipboardItems = objectType({
	nodes: arrayType(zClipboardNode).optional(),
	groups: arrayType(zClipboardGroup).optional(),
	reroutes: arrayType(zClipboardReroute).optional(),
	links: arrayType(zComfyLinkObject).optional(),
	subgraphs: arrayType(zClipboardSubgraphDefinition).optional()
}).refine((items) => items.nodes !== void 0 || items.groups !== void 0 || items.reroutes !== void 0 || items.links !== void 0 || items.subgraphs !== void 0);
/**
* The minimum a node must carry for `LGraph.configure` to instantiate it:
* it calls `LiteGraph.createNode(type)` and assigns `id`.
*/
var zLegacyLoadableNode = objectType({
	id: zNodeId,
	type: stringType()
}).passthrough();
var zLegacyLoadableWorkflow = objectType({
	version: numberType(),
	nodes: arrayType(zLegacyLoadableNode),
	links: arrayType(unknownType()).optional(),
	last_node_id: zNodeId.optional(),
	last_link_id: numberType().optional()
}).passthrough();
var zWorkflowVersion = objectType({ version: numberType() });
async function validateComfyWorkflow(data, onError = console.warn) {
	const versionResult = zWorkflowVersion.safeParse(data);
	let result;
	if (!versionResult.success) {
		onError(`Workflow does not contain a valid version.  Zod error:\n${fromZodError(versionResult.error)}`);
		return null;
	} else if (versionResult.data.version === 1) result = await zComfyWorkflow1.safeParseAsync(data);
	else result = await zComfyWorkflow.safeParseAsync(data);
	if (result.success) return result.data;
	onError(`Invalid workflow against zod schema:\n${fromZodError(result.error)}`);
	return null;
}
/**
* API format workflow for direct API usage.
*/
var zNodeInputValue = unionType([anyType(), tupleType([zNodeId, zSlotIndex])]);
var zNodePackMetadata = zProperties.pick({
	cnr_id: true,
	aux_id: true,
	ver: true
}).strip();
var zNodeData = objectType({
	inputs: recordType(zNodeInputName, zNodeInputValue),
	class_type: stringType(),
	_meta: zNodePackMetadata.extend({ title: stringType() }).optional()
});
recordType(zNodeId, zNodeData);
//#endregion
//#region src/schemas/resultItemTypeSchema.ts
var resultItemType = enumType([
	"input",
	"output",
	"temp"
]);
//#endregion
//#region src/platform/remote/comfyui/execution/types.ts
var zResultItem = objectType({
	filename: stringType().optional(),
	subfolder: stringType().optional(),
	type: resultItemType.optional(),
	display_name: stringType().optional(),
	id: stringType().optional()
});
var zOutputs = objectType({
	audio: arrayType(zResultItem).optional(),
	images: arrayType(zResultItem).optional(),
	video: arrayType(zResultItem).optional(),
	animated: arrayType(booleanType()).optional(),
	text: unionType([stringType(), arrayType(stringType())]).optional()
}).passthrough();
var zTaskOutput = recordType(zNodeId, zOutputs);
//#endregion
//#region src/platform/remote/comfyui/jobs/jobTypes.ts
/**
* @fileoverview Jobs API types - Backend job API format
* @module platform/remote/comfyui/jobs/jobTypes
*
* These types represent the jobs API format returned by the backend.
* Jobs API provides a memory-optimized alternative to history API.
*/
var zJobStatus = enumType([
	"pending",
	"in_progress",
	"completed",
	"failed",
	"cancelled"
]);
var zPreviewOutput = objectType({
	filename: stringType().optional(),
	subfolder: stringType().optional(),
	type: resultItemType.optional(),
	nodeId: stringType(),
	mediaType: stringType(),
	content: stringType().optional(),
	display_name: stringType().optional()
}).passthrough();
/**
* Execution error from Jobs API.
* Similar to ExecutionErrorWsMessage but with optional prompt_id/timestamp/executed
* since these may not be present in stored errors or infrastructure-generated errors.
*/
var zExecutionError = objectType({
	prompt_id: stringType().optional(),
	timestamp: numberType().optional(),
	node_id: stringType(),
	node_type: stringType(),
	executed: arrayType(stringType()).optional(),
	exception_message: stringType(),
	exception_type: stringType(),
	traceback: arrayType(stringType()),
	current_inputs: unknownType(),
	current_outputs: unknownType()
}).passthrough();
/**
* Raw job from API - uses passthrough to allow extra fields
*/
var zRawJobListItem = objectType({
	id: stringType(),
	status: zJobStatus,
	create_time: numberType(),
	execution_start_time: numberType().nullable().optional(),
	execution_end_time: numberType().nullable().optional(),
	preview_output: zPreviewOutput.nullable().optional(),
	outputs_count: zJobEntry.shape.outputs_count.nullable(),
	previewable_outputs_count: zJobEntry.shape.previewable_outputs_count.nullable(),
	execution_error: zExecutionError.nullable().optional(),
	workflow_id: stringType().nullable().optional(),
	priority: numberType().optional()
}).passthrough();
/**
* Job detail - returned by GET /api/jobs/{job_id} (detail endpoint)
* Includes full workflow and outputs for re-execution and downloads
*/
var zJobDetail = zRawJobListItem.extend({
	workflow: unknownType().optional(),
	outputs: zTaskOutput.optional(),
	update_time: numberType().optional(),
	execution_status: unknownType().optional(),
	execution_meta: unknownType().optional()
}).passthrough();
var zPaginationInfo = objectType({
	offset: numberType(),
	limit: numberType(),
	total: numberType(),
	has_more: booleanType()
});
var zJobsListResponse = objectType({
	jobs: arrayType(zRawJobListItem),
	pagination: zPaginationInfo
});
/**
* A single output asset produced by a job, enriched with per-output node
* context (`node_id`, `output_key`, `output_index`) correlated from the job's
* execution outputs by content hash. Node-context fields are null when the
* asset cannot be matched to an output entry.
* Returned by GET /api/jobs/{job_id}/assets.
*/
var zJobOutputAsset = objectType({
	id: stringType(),
	name: stringType(),
	hash: stringType().nullable().optional(),
	preview_url: stringType().nullable().optional(),
	mime_type: stringType().nullable().optional(),
	size: numberType().nullable().optional(),
	node_id: stringType().nullable().optional(),
	output_key: stringType().nullable().optional(),
	output_index: numberType().nullable().optional(),
	created_at: stringType().nullable().optional()
}).passthrough();
/**
* Paginated list of a single job's output assets. The envelope is lenient
* where `zJobsListResponse` is strict: the cloud serialiser drops null fields
* (`exclude_none=True`) and this endpoint's pagination convention is
* unconfirmed, so a missing bookkeeping field must degrade to "no more pages"
* rather than reject the payload and silently disable enrichment.
*/
var zJobAssetsResponse = objectType({
	job_id: stringType().optional(),
	assets: arrayType(zJobOutputAsset),
	pagination: objectType({
		offset: numberType().nullable().optional(),
		limit: numberType().nullable().optional(),
		total: numberType().nullable().optional(),
		has_more: booleanType().nullable().optional()
	}).optional()
});
/** Schema for workflow container structure in job detail responses */
var zWorkflowContainer = objectType({
	prompt: unknownType(),
	extra_data: objectType({ extra_pnginfo: objectType({ workflow: unknownType() }).nullish() }).nullish()
});
//#endregion
//#region src/platform/remote/comfyui/jobs/fetchJobs.ts
var JobsApiError = class extends Error {};
/**
* Fetches raw jobs from /jobs endpoint
* @internal
*/
async function fetchJobsRaw(fetchApi, statuses, maxItems = 200, offset = 0, options) {
	const url = `/jobs?status=${statuses.join(",")}&limit=${maxItems}&offset=${offset}`;
	try {
		const res = await fetchApi(url);
		if (!res.ok) throw new JobsApiError(`Failed to fetch jobs: ${res.status}`);
		const data = zJobsListResponse.parse(await res.json());
		return {
			jobs: data.jobs,
			total: data.pagination.total,
			offset: data.pagination.offset,
			limit: data.pagination.limit,
			hasMore: data.pagination.has_more
		};
	} catch (error) {
		if (options?.throwOnError) throw error;
		console.error("[Jobs API] Error fetching jobs:", error);
		return {
			jobs: [],
			total: 0,
			offset,
			limit: maxItems,
			hasMore: false
		};
	}
}
var QUEUE_PRIORITY_BASE = 1e6;
/**
* Assigns synthetic priority to jobs.
* Only assigns if job doesn't already have a server-provided priority.
*/
function assignPriority(jobs, basePriority) {
	return jobs.map((job, index) => ({
		...job,
		priority: job.priority ?? basePriority - index
	}));
}
/**
* Fetches history (terminal state jobs: completed, failed, cancelled)
* Assigns synthetic priority starting from total (lower than queue jobs).
*/
async function fetchHistory(fetchApi, maxItems = 200, offset = 0) {
	const { jobs } = await fetchHistoryPage(fetchApi, maxItems, offset);
	return jobs;
}
/**
* Fetches one page of history with server-provided pagination metadata.
*/
async function fetchHistoryPage(fetchApi, maxItems = 200, offset = 0) {
	const result = await fetchJobsRaw(fetchApi, [
		"completed",
		"failed",
		"cancelled"
	], maxItems, offset);
	return {
		jobs: assignPriority(result.jobs, result.total - result.offset),
		total: result.total,
		offset: result.offset,
		limit: result.limit,
		hasMore: result.hasMore
	};
}
/**
* Fetches queue (in_progress + pending jobs)
* Pending jobs get highest priority, then running jobs.
*/
async function fetchQueue(fetchApi, options) {
	const { jobs } = await fetchJobsRaw(fetchApi, ["in_progress", "pending"], 200, 0, options);
	const running = jobs.filter((j) => j.status === "in_progress");
	const pending = jobs.filter((j) => j.status === "pending");
	return {
		Running: assignPriority(running, QUEUE_PRIORITY_BASE + running.length),
		Pending: assignPriority(pending, QUEUE_PRIORITY_BASE + running.length + pending.length)
	};
}
/**
* Fetches full job details from /jobs/{job_id}
*/
async function fetchJobDetail(fetchApi, jobId) {
	try {
		const res = await fetchApi(`/jobs/${encodeURIComponent(jobId)}`);
		if (!res.ok) {
			console.warn(`Job not found for job ${jobId}`);
			return;
		}
		return zJobDetail.parse(await res.json());
	} catch (error) {
		console.error(`Failed to fetch job detail for job ${jobId}:`, error);
		return;
	}
}
var JOB_ASSETS_PAGE_SIZE = 500;
var JOB_ASSETS_MAX_PAGES = 20;
/**
* Fetches all output assets for a job from GET /api/jobs/{job_id}/assets,
* paginating internally. Each asset carries a real asset id plus per-output
* node context (node_id, output_key, output_index) resolved server-side by
* content hash. Degrades to whatever was accumulated on any failure (e.g. the
* endpoint is unavailable on non-cloud distributions) so callers can still
* render; `complete` is false whenever pages are known to be missing, so a
* truncated list is distinguishable from a full one and callers can decline to
* cache it.
*/
async function fetchJobAssets(fetchApi, jobId) {
	const assets = [];
	let offset = 0;
	try {
		for (let page = 0; page < JOB_ASSETS_MAX_PAGES; page++) {
			const res = await fetchApi(`/jobs/${encodeURIComponent(jobId)}/assets?limit=${JOB_ASSETS_PAGE_SIZE}&offset=${offset}`);
			if (!res.ok) {
				console.warn(`[Jobs API] Failed to fetch assets for job ${jobId}: ${res.status}`);
				return {
					assets,
					complete: false
				};
			}
			const data = zJobAssetsResponse.parse(await res.json());
			assets.push(...data.assets);
			if (!(data.pagination?.has_more ?? false)) return {
				assets,
				complete: true
			};
			if (data.assets.length === 0) {
				console.warn(`[Jobs API] Job ${jobId} assets page reported has_more with an empty page; stopping pagination`);
				return {
					assets,
					complete: false
				};
			}
			offset += data.assets.length;
		}
	} catch (error) {
		console.error(`Failed to fetch assets for job ${jobId}:`, error);
		return {
			assets,
			complete: false
		};
	}
	console.warn(`[Jobs API] Job ${jobId} assets pagination hit the ${JOB_ASSETS_MAX_PAGES}-page cap; returning a truncated list`);
	return {
		assets,
		complete: false
	};
}
/**
* Extracts and validates workflow from job detail response.
* The workflow is nested at: workflow.extra_data.extra_pnginfo.workflow
*
* Uses Zod validation via validateComfyWorkflow to ensure the workflow
* conforms to the expected schema. Logs validation failures for debugging
* but still returns undefined to allow graceful degradation.
*/
async function extractWorkflow(job) {
	const parsed = zWorkflowContainer.safeParse(job?.workflow);
	if (!parsed.success) return void 0;
	const rawWorkflow = parsed.data.extra_data?.extra_pnginfo?.workflow;
	if (!rawWorkflow) return void 0;
	return await validateComfyWorkflow(rawWorkflow, (error) => {
		console.warn("[extractWorkflow] Workflow validation failed:", error);
	}) ?? void 0;
}
/**
* Extracts the API-format graph a job stores at: workflow.prompt
*
* Jobs submitted through the API embed no editor workflow, leaving the
* API-format prompt as the only graph they store. Returns undefined whenever
* an embedded workflow exists so those submissions are always used as-is,
* never re-derived. The prompt itself is returned unvalidated — callers gate
* it with `app.isApiJson` before loading it.
*/
function extractApiPrompt(job) {
	const parsed = zWorkflowContainer.safeParse(job?.workflow);
	if (!parsed.success) return void 0;
	const embeddedWorkflow = parsed.data.extra_data?.extra_pnginfo?.workflow;
	if (embeddedWorkflow !== void 0 && embeddedWorkflow !== null) return;
	return parsed.data.prompt;
}
//#endregion
//#region src/scripts/api.ts
var SERVER_FEATURE_FLAGS_TIMEOUT_MS = 5e3;
var FETCH_RESPONSE_HEADERS_TIMEOUT_MS = 6e4;
var FETCH_ROUTE_GROUPS = /* @__PURE__ */ new Set([
	"assets",
	"embeddings",
	"experiment",
	"extensions",
	"features",
	"files",
	"folder_paths",
	"free",
	"global_subgraphs",
	"history",
	"hub",
	"internal",
	"interrupt",
	"jobs",
	"logs",
	"models",
	"node_replacements",
	"object_info",
	"prompt",
	"providers",
	"queue",
	"secrets",
	"settings",
	"system_stats",
	"upload",
	"user",
	"userdata",
	"users",
	"video_metadata",
	"view",
	"view_metadata",
	"workflow_templates",
	"workflows",
	"workspace"
]);
function getFetchRouteTemplate(route) {
	const segments = (route.split(/[?#]/)[0] ?? "").split("/").filter(Boolean);
	const [routeGroup, ...resources] = segments[0] === "api" ? segments.slice(1) : segments;
	if (!routeGroup || !FETCH_ROUTE_GROUPS.has(routeGroup)) return "/other";
	return `/${routeGroup}${resources.length ? "/:resource" : ""}`;
}
var UnauthorizedError = class extends Error {};
function addHeaderEntry(headers, key, value) {
	if (Array.isArray(headers)) headers.push([key, value]);
	else if (headers instanceof Headers) headers.set(key, value);
	else headers[key] = value;
}
/**
* Fire-and-forget: a telemetry chunk-load failure must never prevent the
* token-less WebSocket connect fallback from proceeding.
*/
async function trackWsTokenUnavailable() {
	try {
		if (!await shouldRemintCloudRequest()) return;
		const { useTelemetry } = await __vitePreload(async () => {
			const { useTelemetry } = await import("./telemetry-_gZuOwgM.js");
			return { useTelemetry };
		}, __vite__mapDeps([62,11,2]), import.meta.url);
		useTelemetry()?.trackUnifiedAuthRetry({
			transport: "ws",
			outcome: "failed",
			failure_reason: "token_unavailable"
		});
	} catch (err) {
		console.warn("Failed to report WebSocket token unavailability:", err);
	}
}
var PromptExecutionError = class extends Error {
	response;
	status;
	constructor(response, status) {
		super("Prompt execution failed");
		this.response = response;
		this.status = status;
	}
	toString() {
		let message = "";
		const error = this.response.error;
		if (typeof error === "string") message += error;
		else if (typeof error === "object" && error !== null) {
			const errorMessage = "message" in error ? error.message : void 0;
			const errorDetails = "details" in error ? error.details : void 0;
			if (typeof errorMessage === "string") {
				message += errorMessage;
				if (typeof errorDetails === "string") message += ": " + errorDetails;
			}
		}
		if (!message && typeof this.response.message === "string") message += this.response.message;
		for (const [_, nodeError] of Object.entries(this.response.node_errors ?? [])) {
			message += "\n" + nodeError.class_type + ":";
			for (const errorReason of nodeError.errors) {
				message += "\n    - " + errorReason.message;
				if (errorReason.details) message += ": " + errorReason.details;
			}
		}
		return message;
	}
};
var ComfyApi = class extends EventTarget {
	_registered = /* @__PURE__ */ new Set();
	/**
	* Maps an original event listener to its error-guarded wrapper, so that
	* {@link removeEventListener} can match the wrapper installed by
	* {@link addEventListener}. Keyed weakly so wrappers are GC'd with listeners.
	*/
	_listenerWrappers = /* @__PURE__ */ new WeakMap();
	api_host;
	api_base;
	/**
	* The client id from the initial session storage.
	*/
	initialClientId;
	/**
	* The current client id from websocket status updates.
	*/
	clientId;
	/**
	* The current user id.
	*/
	user;
	socket = null;
	/**
	* Monotonic id bumped by every createSocket() attempt. Because createSocket()
	* holds `this.socket === null` across its async token fetch, two attempts can
	* overlap (an identity reset racing the close-handler's reconnect, or two
	* resets in quick succession). Each attempt captures its generation and, once
	* its awaits settle, only proceeds if it is still the latest — so the newest
	* identity always wins and superseded attempts never open a leaked socket.
	*/
	socketGeneration = 0;
	/**
	* Cache Firebase auth store composable function.
	*/
	authStoreComposable;
	reportedUnknownMessageTypes = /* @__PURE__ */ new Set();
	/**
	* Get feature flags supported by this frontend client.
	* Returns a copy to prevent external modification.
	*/
	getClientFeatureFlags() {
		return { ...clientFeatureFlags_default };
	}
	/**
	* Feature flags received from the backend server.
	*/
	serverFeatureFlags = ref({});
	/**
	* Whether feature-flag negotiation for the current socket has settled: the
	* server delivered a map, or delivery was abandoned (5s timeout, or the
	* socket closed first). Not monotonic: each replacement socket resets it to
	* false, so it can flip repeatedly while a connection is reconnecting. True
	* does not imply the map is non-empty, and after {@link resetSocket}
	* {@link serverFeatureFlags} still holds the previous identity's map until
	* the next `feature_flags` message replaces it.
	*/
	serverFeatureFlagsSettled = ref(false);
	/**
	* The auth token for the comfy org account if the user is logged in.
	* This is only used for {@link queuePrompt} now. It is not directly
	* passed as parameter to the function because some custom nodes are hijacking
	* {@link queuePrompt} improperly, which causes extra parameters to be lost
	* in the function call chain.
	*
	* Ref: https://cs.comfy.org/search?q=context:global+%22api.queuePrompt+%3D%22&patternType=keyword&sm=0
	*
	* TODO: Move this field to parameter of {@link queuePrompt} once all
	* custom nodes are patched.
	*/
	authToken;
	/**
	* The API key for the comfy org account if the user logged in via API key.
	*/
	apiKey;
	constructor() {
		super();
		this.user = "";
		this.api_host = location.host;
		this.api_base = location.pathname.split("/").slice(0, -1).join("/");
		this.initialClientId = sessionStorage.getItem("clientId");
	}
	internalURL(route) {
		return this.api_base + "/internal" + route;
	}
	apiURL(route) {
		const requests = webSessionRequests();
		return mediaRoute(this.unscopedApiURL(requests ? scopeMediaRoute(route, requests.workspaceId()) : route));
	}
	/** For requests whose headers already name the workspace. */
	unscopedApiURL(route) {
		if (route.startsWith("/api")) return this.api_base + route;
		return this.api_base + "/api" + route;
	}
	fileURL(route) {
		if (location.pathname.startsWith("/__comfier_cloud__/") && route.startsWith("/templates/")) return route;
		return this.api_base + route;
	}
	/**
	* Gets the Firebase auth store instance using cached composable function.
	* Caches the composable function on first call, then reuses it.
	* Returns null for non-cloud distributions.
	* @returns The Firebase auth store instance, or null if not in cloud
	*/
	async getAuthStore() {}
	async getWebSessionSend() {
		const requests = webSessionRequests();
		if (!requests) return void 0;
		const scope = await requests.scope();
		return scope && ((url, init) => requests.send(url, init, scope));
	}
	/** Sends a same-origin request on the web session; undefined when this tab is not on it. */
	async fetchOnWebSession(url, init) {
		return (await this.getWebSessionSend())?.(url, init);
	}
	/**
	* Adds today's token header, reporting the scheme that was actually used and
	* whether a 401 may be re-minted.
	*
	* The scheme is returned rather than assumed by the caller because this helper
	* is the only place that knows whether a header was obtained: it reports
	* `authHeader !== null` through `onAuthHeader` and attaches nothing when auth
	* is unavailable. A caller that announced `cloud-auth-header` on entry to this
	* path would misreport exactly the unauthenticated case PM-1802 is about.
	*/
	async addCloudAuthHeader(headers, onAuthHeader) {
		const getAuthHeaderIfAvailable = async () => {
			try {
				const authStore = await this.getAuthStore();
				return authStore ? await authStore.getAuthHeader() : null;
			} catch (error) {
				console.warn("Failed to get auth header:", error);
				return null;
			}
		};
		const authHeader = await getAuthHeaderIfAvailable();
		onAuthHeader?.(authHeader !== null);
		if (!authHeader) return {
			scheme: "none",
			credential: "none",
			unifiedRetryOn401: false
		};
		for (const [key, value] of Object.entries(authHeader)) addHeaderEntry(headers, key, value);
		return {
			scheme: "cloud-auth-header",
			credential: authCredentialOf(authHeader),
			unifiedRetryOn401: await shouldRemintCloudRequest()
		};
	}
	/**
	* Waits for Firebase auth to be initialized before proceeding.
	* Includes 10-second timeout to prevent infinite hanging.
	*/
	async waitForAuthInitialization() {}
	async fetchApi(route, options) {
		const { timeoutMs = FETCH_RESPONSE_HEADERS_TIMEOUT_MS, onAuthHeader, onAuthScheme, onAuthCredential, ...requestOptions } = options ?? {};
		const headers = requestOptions.headers ?? {};
		let unifiedRetryOn401 = false;
		onAuthHeader?.(false);
		onAuthScheme?.("none");
		notifyAuthCredential(onAuthCredential, "none");
		addHeaderEntry(headers, "Comfy-User", this.user);
		const timeout = timeoutMs === null ? null : {
			controller: new AbortController(),
			duration: timeoutMs
		};
		const timeoutId = timeout ? setTimeout(() => {
			const method = (requestOptions.method ?? "GET").toUpperCase();
			const routeTemplate = getFetchRouteTemplate(route);
			addBreadcrumb({
				category: "fetch",
				message: `Timeout on ${method} ${routeTemplate}`,
				level: "warning",
				data: { timeout_ms: timeout.duration }
			});
			useTelemetry()?.trackFetchTimeout({
				route: routeTemplate,
				method,
				timeout_ms: timeout.duration
			});
			timeout.controller.abort(new DOMException("Fetch timeout", "TimeoutError"));
		}, timeout.duration) : void 0;
		const signal = requestOptions.signal && timeout ? AbortSignal.any([requestOptions.signal, timeout.controller.signal]) : requestOptions.signal ?? timeout?.controller.signal;
		let retryTimeoutId;
		const retrySignalLifecycle = timeout ? {
			clearInitialTimeout: () => {
				if (timeoutId !== void 0) clearTimeout(timeoutId);
			},
			createSignal: () => {
				const retryController = new AbortController();
				retryTimeoutId = setTimeout(() => {
					const method = (requestOptions.method ?? "GET").toUpperCase();
					const routeTemplate = getFetchRouteTemplate(route);
					addBreadcrumb({
						category: "fetch",
						message: `Timeout on ${method} ${routeTemplate}`,
						level: "warning",
						data: { timeout_ms: timeout.duration }
					});
					useTelemetry()?.trackFetchTimeout({
						route: routeTemplate,
						method,
						timeout_ms: timeout.duration
					});
					retryController.abort(new DOMException("Fetch timeout", "TimeoutError"));
				}, timeout.duration);
				return requestOptions.signal ? AbortSignal.any([requestOptions.signal, retryController.signal]) : retryController.signal;
			}
		} : void 0;
		const init = {
			cache: "no-cache",
			...requestOptions,
			headers,
			signal
		};
		return fetchWithUnifiedRemint(this.apiURL(route), init, unifiedRetryOn401, retrySignalLifecycle).finally(() => {
			if (timeoutId !== void 0) clearTimeout(timeoutId);
			if (retryTimeoutId !== void 0) clearTimeout(retryTimeoutId);
		});
	}
	/**
	* Wraps an event listener so an exception thrown by it — most often from a
	* third-party custom node — is caught and logged instead of surfacing as an
	* unhandled error in global telemetry (which RUM captures as a high-volume,
	* non-actionable error). Native EventTarget already isolates listeners from
	* one another; this only changes where the error goes.
	*
	* The same original listener always maps to the same wrapper, so
	* {@link removeEventListener} still matches. Logged at `warn` level on
	* purpose: RUM collects `console.error` by default, which would re-introduce
	* the noise this guard removes.
	*/
	wrapListener(callback) {
		if (!callback) return callback;
		let wrapped = this._listenerWrappers.get(callback);
		if (!wrapped) {
			const logError = (event, error) => console.warn(`[ComfyApi] Uncaught error in "${event.type}" event listener:`, error);
			wrapped = function(event) {
				try {
					const result = typeof callback === "function" ? callback.call(this, event) : callback.handleEvent(event);
					if (result != null && typeof result.then === "function") Promise.resolve(result).catch((error) => logError(event, error));
				} catch (error) {
					logError(event, error);
				}
			};
			this._listenerWrappers.set(callback, wrapped);
		}
		return wrapped;
	}
	/**
	* Looks up the guarded wrapper for a listener without creating one — used on
	* the remove path so a never-registered callback does not leave a stray
	* WeakMap entry. Falls back to the original callback (a harmless no-op).
	*/
	getWrappedListener(callback) {
		if (!callback) return callback;
		return this._listenerWrappers.get(callback) ?? callback;
	}
	addEventListener(type, callback, options) {
		super.addEventListener(type, this.wrapListener(callback), options);
		this._registered.add(type);
	}
	removeEventListener(type, callback, options) {
		super.removeEventListener(type, this.getWrappedListener(callback), options);
	}
	addCustomEventListener(type, callback, options) {
		super.addEventListener(type, this.wrapListener(callback), options);
		this._registered.add(type);
	}
	removeCustomEventListener(type, callback, options) {
		super.removeEventListener(type, this.getWrappedListener(callback), options);
	}
	dispatchCustomEvent(type, detail) {
		const event = detail === void 0 ? new CustomEvent(type) : new CustomEvent(type, { detail });
		return super.dispatchEvent(event);
	}
	/** @deprecated Use {@link dispatchCustomEvent}. */
	dispatchEvent(event) {
		return super.dispatchEvent(event);
	}
	/**
	* Poll status  for colab and other things that don't support websockets.
	*/
	_pollQueue() {
		setInterval(async () => {
			try {
				const status = await (await this.fetchApi("/prompt")).json();
				this.dispatchCustomEvent("status", status);
			} catch {
				this.dispatchCustomEvent("status", null);
			}
		}, 1e3);
	}
	/** False when the web session is on and no one is signed in to open it. */
	async addSocketAuth(params) {
		const requests = webSessionRequests();
		const sessionScope = requests && await requests.scope();
		if (sessionScope?.workspaceId) params.set("workspace_id", sessionScope.workspaceId);
		if (sessionScope) return true;
		try {
			const authToken = await (await this.getAuthStore())?.getAuthToken();
			if (authToken) params.set("token", authToken);
		} catch (error) {
			trackWsTokenUnavailable();
			console.warn("Could not get auth token for WebSocket connection:", error);
		}
		return !requests || params.has("token");
	}
	/**
	* Creates and connects a WebSocket for realtime updates
	* @param {boolean} isReconnect If the socket is connection is a reconnect attempt
	*/
	async createSocket(isReconnect) {
		if (this.socket) return;
		const generation = ++this.socketGeneration;
		let opened = false;
		const existingSession = window.name;
		const params = new URLSearchParams();
		if (existingSession) params.set("clientId", existingSession);
		const baseUrl = `${window.location.protocol === "https:" ? "wss" : "ws"}://${this.api_host}${this.api_base}/ws`;
		const query = params.toString();
		const wsUrl = query ? `${baseUrl}?${query}` : baseUrl;
		if (generation !== this.socketGeneration) return;
		const socket = new WebSocket(wsUrl);
		this.socket = socket;
		this.serverFeatureFlagsSettled.value = false;
		socket.binaryType = "arraybuffer";
		const settleTimer = setTimeout(() => {
			if (this.socket === socket && !this.serverFeatureFlagsSettled.value) this.serverFeatureFlagsSettled.value = true;
		}, SERVER_FEATURE_FLAGS_TIMEOUT_MS);
		socket.addEventListener("open", () => {
			opened = true;
			socket.send(JSON.stringify({
				type: "feature_flags",
				data: this.getClientFeatureFlags()
			}));
			if (isReconnect) this.dispatchCustomEvent("reconnected");
		});
		socket.addEventListener("error", () => {
			if (this.socket !== socket) return;
			socket.close();
			if (!isReconnect && !opened) this._pollQueue();
		});
		socket.addEventListener("close", () => {
			if (this.socket !== socket) return;
			this.serverFeatureFlagsSettled.value = true;
			clearTimeout(settleTimer);
			setTimeout(async () => {
				if (this.socket !== socket) return;
				this.socket = null;
				await this.createSocket(true);
			}, 300);
			if (opened) {
				this.dispatchCustomEvent("status", null);
				this.dispatchCustomEvent("reconnecting");
			}
		});
		socket.addEventListener("message", (event) => {
			if (this.socket !== socket) return;
			try {
				if (event.data instanceof ArrayBuffer) {
					const view = new DataView(event.data);
					const eventType = view.getUint32(0);
					switch (eventType) {
						case 3:
							try {
								const decoder3 = new TextDecoder();
								const rawData = event.data.slice(4);
								const rawView = new DataView(rawData);
								let offset = 0;
								let promptId;
								if (this.serverSupportsFeature("supports_progress_text_metadata")) {
									const promptIdLength = rawView.getUint32(offset);
									offset += 4;
									promptId = decoder3.decode(rawData.slice(offset, offset + promptIdLength));
									offset += promptIdLength;
								}
								const nodeIdLength = rawView.getUint32(offset);
								offset += 4;
								const nodeId = decoder3.decode(rawData.slice(offset, offset + nodeIdLength));
								offset += nodeIdLength;
								const text = decoder3.decode(rawData.slice(offset));
								this.dispatchCustomEvent("progress_text", {
									nodeId,
									text,
									...promptId !== void 0 && { prompt_id: promptId }
								});
							} catch (e) {
								console.warn("Failed to parse progress_text binary message", e);
							}
							break;
						case 1: {
							const imageType = view.getUint32(4);
							const imageData = event.data.slice(8);
							const imageBlob = new Blob([imageData], { type: imageType === 2 ? "image/png" : "image/jpeg" });
							this.dispatchCustomEvent("b_preview", imageBlob);
							break;
						}
						case 4: {
							const decoder4 = new TextDecoder();
							const metadataLength = view.getUint32(4);
							const metadataBytes = event.data.slice(8, 8 + metadataLength);
							const metadata = JSON.parse(decoder4.decode(metadataBytes));
							const imageData4 = event.data.slice(8 + metadataLength);
							const imageMime4 = metadata.image_type;
							const imageBlob4 = new Blob([imageData4], { type: imageMime4 });
							this.dispatchCustomEvent("b_preview_with_metadata", {
								blob: imageBlob4,
								nodeId: metadata.node_id,
								displayNodeId: metadata.display_node_id,
								parentNodeId: metadata.parent_node_id,
								realNodeId: metadata.real_node_id,
								jobId: metadata.prompt_id
							});
							this.dispatchCustomEvent("b_preview", imageBlob4);
							break;
						}
						default: console.error(`Unknown binary websocket message of type ${eventType}`);
					}
				} else {
					const msg = JSON.parse(event.data);
					switch (msg.type) {
						case "status":
							if (msg.data.sid) {
								const clientId = msg.data.sid;
								this.clientId = clientId;
								window.name = clientId;
								sessionStorage.setItem("clientId", clientId);
							}
							this.dispatchCustomEvent("status", msg.data.status ?? null);
							break;
						case "executing":
							this.dispatchCustomEvent("executing", msg.data.display_node || msg.data.node);
							break;
						case "execution_start":
						case "execution_error":
						case "execution_interrupted":
						case "execution_cached":
						case "execution_success":
						case "progress":
						case "progress_state":
						case "executed":
						case "promptQueued":
						case "logs":
						case "b_preview":
						case "notification":
							this.dispatchCustomEvent(msg.type, msg.data);
							break;
						case "graphChanged":
							this.dispatchCustomEvent("graphChanged", msg.data);
							this.dispatchCustomEvent("autoQueueGraphChanged");
							break;
						case "autoQueueGraphChanged":
							this.dispatchCustomEvent("autoQueueGraphChanged");
							break;
						case "feature_flags":
							this.serverFeatureFlags.value = msg.data;
							this.serverFeatureFlagsSettled.value = true;
							this.dispatchCustomEvent("feature_flags", msg.data);
							break;
						default: if (this._registered.has(msg.type)) super.dispatchEvent(new CustomEvent(msg.type, { detail: msg.data }));
						else if (!this.reportedUnknownMessageTypes.has(msg.type)) {
							this.reportedUnknownMessageTypes.add(msg.type);
							console.error(`Unknown message type ${msg.type}`);
						}
					}
				}
			} catch (error) {
				console.warn("Unhandled message:", event.data, error);
			}
		});
	}
	/**
	* Initialises sockets and realtime updates
	*/
	async init() {
		await this.createSocket();
	}
	/**
	* Tears down the active realtime socket and reconnects, re-authenticating
	* with the currently active account's token. Invoked on a direct identity
	* change so a tab cannot keep receiving the previous account's realtime
	* events over a handshake that was authenticated as that account.
	*/
	async resetSocket() {
		this.clientId = void 0;
		window.name = "";
		sessionStorage.removeItem("clientId");
		await this.replaceSocket();
	}
	/**
	* Re-handshakes the socket for the same account, keeping its client id, so
	* a new web session workspace takes effect. Does nothing before init().
	*/
	async reconnectSocket() {
		if (this.socketGeneration === 0) return;
		await this.replaceSocket();
	}
	async replaceSocket() {
		const previous = this.socket;
		this.serverFeatureFlagsSettled.value = false;
		this.socket = null;
		if (previous && previous.readyState !== WebSocket.CLOSED) try {
			previous.close();
		} catch {}
		await this.createSocket();
	}
	/**
	* Gets a list of extension urls
	*/
	async getExtensions() {
		const resp = await this.fetchApi("/extensions", { cache: "no-store" });
		return zGetExtensionsResponse.parse(await resp.json()).filter((url) => !/(?:^|\/)(?:imageFeed|image_feed|image-feed)\.js(?:\?|$)/i.test(url));
	}
	/**
	* Gets the available workflow templates from custom nodes.
	* @returns A map of custom_node names and associated template workflow names.
	*/
	async getWorkflowTemplates() {
		return await (await this.fetchApi("/workflow_templates")).json();
	}
	/**
	* Gets the index of core workflow templates.
	* @param locale Optional locale code (e.g., 'en', 'fr', 'zh') to load localized templates
	*/
	async getCoreWorkflowTemplates(locale) {
		const fileName = locale && locale !== "en" ? `index.${locale}.json` : "index.json";
		try {
			const res = await axios.get(this.fileURL(`/templates/${fileName}`));
			return String(res.headers["content-type"] ?? "").includes("application/json") ? res.data : [];
		} catch (error) {
			if (locale && locale !== "en") {
				console.warn(`Localized templates for '${locale}' not found, falling back to English`);
				return this.getCoreWorkflowTemplates();
			}
			console.error("Error loading core workflow templates:", error);
			return [];
		}
	}
	/**
	* Gets a list of embedding names
	* @throws When the request fails or the response does not match the schema
	*/
	async getEmbeddings() {
		const resp = await this.fetchApi("/embeddings", { cache: "no-store" });
		if (!resp.ok) throw new Error(`Failed to fetch /embeddings: ${resp.status}`);
		return zGetEmbeddingsResponse.parse(await resp.json());
	}
	/**
	* Loads node object definitions for the graph
	* @returns The node definitions
	*/
	async getNodeDefs() {
		return await (await this.fetchApi("/object_info", { cache: "no-store" })).json();
	}
	/**
	* Queues a prompt to be executed
	* @param {number} number The index at which to queue the prompt, passing -1 will insert the prompt at the front of the queue
	* @param {object} data The prompt data to queue
	* @param {QueuePromptOptions} options Optional execution options
	* @throws {PromptExecutionError} If the prompt fails to execute
	*/
	async queuePrompt(number, data, options) {
		const { output: prompt, workflow } = data;
		const body = {
			client_id: this.clientId ?? "",
			prompt,
			...options?.partialExecutionTargets && { partial_execution_targets: options.partialExecutionTargets },
			extra_data: {
				auth_token_comfy_org: this.authToken,
				api_key_comfy_org: this.apiKey,
				comfy_usage_source: "comfyui-frontend",
				extra_pnginfo: { workflow },
				...options?.previewMethod && options.previewMethod !== "default" && { preview_method: options.previewMethod }
			}
		};
		if (number === -1) body.front = true;
		else if (number != 0) body.number = number;
		window.__comfierDevice?.trackPrompt("queue-request");
		const res = await this.fetchApi("/prompt", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(body)
		});
		if (res.status !== 200) {
			const text = await res.text();
			let errorResponse;
			try {
				errorResponse = JSON.parse(text);
			} catch {
				errorResponse = { error: {
					type: "server_error",
					message: `${res.status} ${res.statusText}`,
					details: text
				} };
			}
			throw new PromptExecutionError(errorResponse, res.status);
		}
		return await res.json();
	}
	/**
	* Gets the list of assets and models referenced by a prompt that would
	* need user consent before sharing.
	*/
	async getShareableAssets(prompt, options) {
		const body = { workflow_api_json: prompt };
		if (options?.owned !== void 0) body.owned = options.owned;
		const res = await this.fetchApi("/assets/from-workflow", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(body)
		});
		if (res.status !== 200) throw new Error(`Failed to fetch shareable assets: ${res.status}`);
		const data = await res.json();
		return zPostAssetsFromWorkflowResponse.parse(data);
	}
	/**
	* Gets a list of model folder keys (eg ['checkpoints', 'loras', ...])
	* @returns The list of model folder keys
	*/
	async getModelFolders() {
		const res = await this.fetchApi(`/experiment/models`);
		if (res.status === 404) return [];
		const folderBlacklist = ["configs", "custom_nodes"];
		return (await res.json()).filter((folder) => !folderBlacklist.includes(folder.name));
	}
	/**
	* Gets a list of models in the specified folder
	* @param {string} folder The folder to list models from, such as 'checkpoints'
	* @returns The list of model filenames within the specified folder
	*/
	async getModels(folder) {
		const res = await this.fetchApi(`/experiment/models/${folder}`);
		if (res.status === 404) return [];
		return await res.json();
	}
	/**
	* Gets the metadata for a model
	* @param {string} folder The folder containing the model
	* @param {string} model The model to get metadata for
	* @returns The metadata for the model
	*/
	async viewMetadata(folder, model) {
		const res = await this.fetchApi(`/view_metadata/${folder}?filename=${encodeURIComponent(model)}`);
		const rawResponse = await res.text();
		if (!rawResponse) return null;
		try {
			return JSON.parse(rawResponse);
		} catch (error) {
			console.error("Error viewing metadata", res.status, res.statusText, rawResponse, error);
			return null;
		}
	}
	/**
	* Loads a list of items (queue or history)
	* @param {string} type The type of items to load, queue or history
	* @returns The items of the specified type grouped by their status
	*/
	async getItems(type) {
		if (type === "queue") return this.getQueue();
		return this.getHistory();
	}
	/**
	* Gets the current state of the queue
	* @returns The currently running and queued items
	*/
	async getQueue(options) {
		try {
			return await fetchQueue(this.fetchApi.bind(this), options);
		} catch (error) {
			if (options?.throwOnError) throw error;
			console.error("Failed to fetch queue:", error);
			return {
				Running: [],
				Pending: []
			};
		}
	}
	/**
	* Gets the prompt execution history
	* @returns Prompt history including node outputs
	*/
	async getHistory(max_items = 200, options) {
		try {
			return await fetchHistory(this.fetchApi.bind(this), max_items, options?.offset);
		} catch (error) {
			console.error(error);
			return [];
		}
	}
	/**
	* Gets detailed job info including outputs and workflow
	* @param jobId The job ID
	* @returns Full job details or undefined if not found
	*/
	async getJobDetail(jobId) {
		return fetchJobDetail(this.fetchApi.bind(this), jobId);
	}
	/**
	* Gets a job's output assets, each resolved to a real asset entity with
	* per-output node context. Returns an empty list when the endpoint is
	* unavailable (e.g. non-cloud distributions).
	* @param jobId The job ID
	* @returns The job's output assets and whether the list is exhaustive
	*/
	async getJobAssets(jobId) {
		return fetchJobAssets(this.fetchApi.bind(this), jobId);
	}
	/**
	* Gets system & device stats
	* @returns System stats such as python version, OS, per device info
	*/
	async getSystemStats() {
		return await (await this.fetchApi("/system_stats")).json();
	}
	/**
	* Sends a POST request to the API
	* @param {*} type The endpoint to post to
	* @param {*} body Optional POST data
	*/
	async _postItem(type, body) {
		try {
			await this.fetchApi("/" + type, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: body ? JSON.stringify(body) : void 0
			});
		} catch (error) {
			console.error(error);
		}
	}
	/**
	* Deletes an item from the specified list
	* @param {string} type The type of item to delete, queue or history
	* @param {number} id The id of the item to delete
	*/
	async deleteItem(type, id) {
		await this._postItem(type, { delete: [id] });
	}
	/**
	* Clears the specified list
	* @param {string} type The type of list to clear, queue or history
	*/
	async clearItems(type) {
		await this._postItem(type, { clear: true });
	}
	/**
	* Interrupts the execution of the running job. If runningJobId is provided,
	* it is included in the payload as a helpful hint to the backend.
	* @param {string | null} [runningJobId] Optional Running Job ID to interrupt
	*/
	async interrupt(runningJobId) {
		await this._postItem("interrupt", runningJobId ? { prompt_id: runningJobId } : void 0);
	}
	/**
	* Cancels a single job by id via `POST /api/jobs/{job_id}/cancel` (idempotent:
	* already-terminal jobs are a no-op). Requires runtime parity — not every
	* runtime exposes this endpoint yet; do not merge callers before parity lands.
	*
	* @param {string} jobId The id of the job to cancel
	*/
	async cancelJob(jobId) {
		const res = await this.fetchApi(`/jobs/${encodeURIComponent(jobId)}/cancel`, { method: "POST" });
		if (!res.ok) {
			const body = await res.text().catch(() => "");
			throw new Error(`Failed to cancel job ${jobId}: ${res.status}${body ? ` — ${body}` : ""}`);
		}
	}
	/**
	* Cancels multiple jobs in a single request via `POST /api/jobs/cancel` with
	* body `{ job_ids: [...] }`. Already-terminal jobs are no-ops. Same runtime
	* parity requirement as {@link cancelJob}.
	*
	* @param {string[]} jobIds The ids of the jobs to cancel
	*/
	async cancelJobs(jobIds) {
		if (!jobIds.length) return;
		const res = await this.fetchApi("/jobs/cancel", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ job_ids: jobIds })
		});
		if (!res.ok) {
			const body = await res.text().catch(() => "");
			throw new Error(`Failed to cancel jobs: ${res.status}${body ? ` — ${body}` : ""}`);
		}
	}
	/**
	* Gets user configuration data and where data should be stored
	*/
	async getUserConfig() {
		return (await this.fetchApi("/users")).json();
	}
	/**
	* Creates a new user
	* @param { string } username
	* @returns The fetch response
	*/
	createUser(username) {
		return this.fetchApi("/users", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ username })
		});
	}
	/**
	* Gets all setting values for the current user
	* @returns { Promise<string, unknown> } A dictionary of id -> value
	*/
	async getSettings() {
		if (window.ComfierApp && !window.__comfierDevice) throw new Error("Device preferences are unavailable");
		return window.__comfierDevice ? window.__comfierDevice.preferences.read(() => this.loadHostSettings()) : this.loadHostSettings();
	}
	async loadHostSettings() {
		const resp = await this.fetchApi("/settings");
		if (resp.status == 401) throw new UnauthorizedError(`Failed to load settings: 401 ${resp.statusText || "Unauthorized"}`);
		return await resp.json();
	}
	/**
	* Gets a setting for the current user
	* @param { string } id The id of the setting to fetch
	* @returns { Promise<unknown> } The setting value
	*/
	async getSetting(id) {
		return (await this.getSettings())[id];
	}
	/**
	* Stores a dictionary of settings for the current user
	*/
	async storeSettings(settings) {
		if (window.ComfierApp && !window.__comfierDevice) throw new Error("Device preferences are unavailable");
		if (window.__comfierDevice) return window.__comfierDevice.preferences.write(settings, () => this.loadHostSettings());
		return this.fetchApi("/settings", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(settings)
		});
	}
	/**
	* Stores a setting for the current user
	*/
	async storeSetting(id, value) {
		if (window.ComfierApp && !window.__comfierDevice) throw new Error("Device preferences are unavailable");
		if (window.__comfierDevice) return window.__comfierDevice.preferences.write({ [id]: value }, () => this.loadHostSettings());
		return this.fetchApi(`/settings/${encodeURIComponent(id)}`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(value)
		});
	}
	/**
	* Gets a user data file for the current user
	*/
	async getUserData(file, options) {
		return this.fetchApi(`/userdata/${encodeURIComponent(file)}`, options);
	}
	/**
	* Stores a user data file for the current user
	* @param { string } file The name of the userdata file to save
	* @param { unknown } data The data to save to the file
	* @param { RequestInit & { stringify?: boolean, throwOnError?: boolean } } [options]
	* @returns { Promise<Response> }
	*/
	async storeUserData(file, data, options = {
		overwrite: true,
		stringify: true,
		throwOnError: true,
		full_info: false
	}) {
		const resp = await this.fetchApi(`/userdata/${encodeURIComponent(file)}?overwrite=${options.overwrite}&full_info=${options.full_info}`, {
			method: "POST",
			body: options.stringify ? JSON.stringify(data) : data,
			...options
		});
		if (resp.status !== 200 && options.throwOnError !== false) throw new Error(`Error storing user data file '${file}': ${resp.status} ${(await resp).statusText}`);
		return resp;
	}
	/**
	* Deletes a user data file for the current user
	* @param { string } file The name of the userdata file to delete
	*/
	async deleteUserData(file) {
		return await this.fetchApi(`/userdata/${encodeURIComponent(file)}`, { method: "DELETE" });
	}
	/**
	* Move a user data file for the current user
	* @param { string } source The userdata file to move
	* @param { string } dest The destination for the file
	*/
	async moveUserData(source, dest, options = { overwrite: false }) {
		return await this.fetchApi(`/userdata/${encodeURIComponent(source)}/move/${encodeURIComponent(dest)}?overwrite=${options.overwrite}`, { method: "POST" });
	}
	async listUserDataFullInfo(dir) {
		const trimmedDir = trimEnd(dir, "/");
		const resp = await this.fetchApi(`/userdata?dir=${encodeURIComponent(trimmedDir)}&recurse=true&split=false&full_info=true`);
		if (resp.status === 404) return [];
		if (resp.status !== 200) throw new Error(`Error getting user data list '${trimmedDir}': ${resp.status} ${resp.statusText}`);
		return resp.json();
	}
	async getGlobalSubgraphData(id) {
		const resp = await api.fetchApi("/global_subgraphs/" + id);
		if (resp.status !== 200) throw new Error(`Failed to fetch global subgraph '${id}': ${resp.status} ${resp.statusText}`);
		const subgraph = await resp.json();
		if (typeof subgraph !== "object" || subgraph === null || !("data" in subgraph) || typeof subgraph.data !== "string" || !subgraph.data) throw new Error(`Global subgraph '${id}' returned empty data`);
		return subgraph.data;
	}
	async getGlobalSubgraphs() {
		const resp = await api.fetchApi("/global_subgraphs");
		if (resp.status !== 200) return {};
		const subgraphs = await resp.json();
		for (const [k, v] of Object.entries(subgraphs)) if (!v.data) v.data = this.getGlobalSubgraphData(k);
		return subgraphs;
	}
	async getLogs() {
		const url = this.internalURL("/logs");
		const { data } = await axios.get(url);
		if (typeof data === "string") return data;
		return data === void 0 ? "" : JSON.stringify(data, null, 2);
	}
	async getRawLogs() {
		const url = this.internalURL("/logs/raw");
		return (await axios.get(url)).data;
	}
	async subscribeLogs(enabled) {
		const url = this.internalURL("/logs/subscribe");
		return await axios.patch(url, {
			enabled,
			clientId: this.clientId
		});
	}
	async getFolderPaths() {
		const response = await axios.get(this.internalURL("/folder_paths")).catch(() => null);
		if (!response) return {};
		return response.data;
	}
	async freeMemory(options) {
		try {
			let mode = "";
			if (options.freeExecutionCache) mode = "{\"unload_models\": true, \"free_memory\": true}";
			else mode = "{\"unload_models\": true}";
			if ((await this.fetchApi(`/free`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: mode
			})).status === 200) {
				if (options.freeExecutionCache) useToastStore().add({
					severity: "success",
					summary: "Models and Execution Cache have been cleared.",
					life: 3e3
				});
				else useToastStore().add({
					severity: "success",
					summary: "Models have been unloaded.",
					life: 3e3
				});
			} else useToastStore().add({
				severity: "error",
				summary: "Unloading of models failed. Installed ComfyUI may be an outdated version."
			});
		} catch {
			useToastStore().add({
				severity: "error",
				summary: "An error occurred while trying to unload models."
			});
		}
	}
	/**
	* Gets the custom nodes i18n data from the server.
	*
	* @returns The custom nodes i18n data
	*/
	async getCustomNodesI18n() {
		return (await axios.get(this.apiURL("/i18n"))).data;
	}
	/**
	* Checks if the server supports a specific feature.
	* @param featureName The name of the feature to check (supports dot notation for nested values)
	* @returns true if the feature is supported, false otherwise
	*/
	serverSupportsFeature(featureName) {
		const override = /* @__PURE__ */ getDevOverride(featureName);
		if (override !== void 0) return override;
		return get(this.serverFeatureFlags.value, featureName) === true;
	}
	/**
	* Gets a server feature flag value.
	* @param featureName The name of the feature to get (supports dot notation for nested values)
	* @param defaultValue The default value if the feature is not found
	* @returns The feature value or default
	*/
	getServerFeature(featureName, defaultValue) {
		const override = /* @__PURE__ */ getDevOverride(featureName);
		if (override !== void 0) return override;
		return get(this.serverFeatureFlags.value, featureName, defaultValue);
	}
	/**
	* Gets all server feature flags.
	* @returns Copy of all server feature flags
	*/
	getServerFeatures() {
		return { ...this.serverFeatureFlags.value };
	}
};
var api = new ComfyApi();
window.comfyAPI = window.comfyAPI || {};
window.comfyAPI.api = window.comfyAPI.api || {};
window.comfyAPI.api.UnauthorizedError = UnauthorizedError;
window.comfyAPI.api.PromptExecutionError = PromptExecutionError;
window.comfyAPI.api.ComfyApi = ComfyApi;
window.comfyAPI.api.api = api;
//#endregion
export { provideWebSessionRequests as A, createSessionTokenMint as B, classifyAuthError as C, shouldRemintCloudRequest as D, fetchWithUnifiedRemint as E, createWebSession as F, isCredentialFresh as G, DEFAULT_FRESH_MARGIN_MS as H, deleteWebSession as I, exchangeToken as J, selectFreshCredential as K, readWebSession as L, webSessionRequests as M, webSessionResourceHeader as N, WebSessionTokenError as O, webSessionSend as P, resetMediaSources as Q, revokeAllWebSessions as R, authErrorMessage as S, attachUnifiedRemintInterceptor as T, createCredentialCache as U, timedSignal as V, decodeAdopted as W, ssoRequiredOrganizationId as X, isSsoRequiredRefusal as Y, mediaSource as Z, toLinkId as _, extractApiPrompt as a, webSessionUser as b, resultItemType as c, zDeclaredModelFile as d, zLegacyLoadableWorkflow as f, parseLinkId as g, toRerouteId as h, api as i, signedInOnWebSession as j, fetchOnWebSession as k, validateComfyWorkflow as l, zNodePackMetadata as m, PromptExecutionError as n, extractWorkflow as o, zModelFile as p, abortable as q, UnauthorizedError as r, zResultItem as s, ComfyApi as t, zClipboardItems as u, isWidgetValue as v, severityForAuthError as w, firebaseIdentity as x, getSessionOverride as y, SessionTokenError as z };
