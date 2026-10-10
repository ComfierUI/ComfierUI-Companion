import "./rolldown-runtime-xtsTai4I.js";
import { r as getComfyPlatformBaseUrl } from "./comfyApi-CYSC9hA6.js";
//#region src/platform/cloud/subscription/utils/paymentReturnUrl.ts
/**
* Stripe appends these on the return leg. They are stripped through
* `history.replaceState`, which the router does not observe, so anything that
* later writes the router's own query has to drop them too or it puts them —
* the client secret included — back in the address bar.
*/
var STRIPE_RETURN_PARAMS = [
	"payment_intent",
	"payment_intent_client_secret",
	"redirect_status"
];
/**
* billing-web appends these when it sends the customer back by URL. The app
* refreshes billing on return either way, so they are only address-bar
* noise once the page has loaded.
*/
var BILLING_WEB_RETURN_PARAMS = ["billing_result", "billing_ref"];
var paymentReturnPending = false;
function stripPaymentReturnParams() {
	const url = new URL(globalThis.location.href);
	const stripeParams = STRIPE_RETURN_PARAMS.filter((param) => url.searchParams.has(param));
	const billingWebParams = BILLING_WEB_RETURN_PARAMS.filter((param) => url.searchParams.has(param));
	if (stripeParams.length === 0 && billingWebParams.length === 0) return;
	if (stripeParams.length > 0) paymentReturnPending = true;
	for (const param of [...stripeParams, ...billingWebParams]) url.searchParams.delete(param);
	globalThis.history.replaceState(globalThis.history.state, "", url);
}
function consumePaymentReturn() {
	stripPaymentReturnParams();
	const pending = paymentReturnPending;
	paymentReturnPending = false;
	return pending;
}
/**
* Where a redirect payment method (Alipay) or a hosted checkout sends the
* customer afterwards. Returning to the page the checkout started on keeps
* them in the app, where the pending-operation recovery on the next billing
* status read resumes polling and completes the flow. Non-HTTP origins
* (Electron) fall back to the platform success page: the backend requires an
* absolute HTTP(S) return URL.
*/
function paymentReturnUrl() {
	const { origin, pathname } = globalThis.location;
	if (origin.startsWith("https://") || origin.startsWith("http://")) return `${origin}${pathname}`;
	return `${getComfyPlatformBaseUrl()}/payment/success`;
}
//#endregion
export { paymentReturnUrl as i, STRIPE_RETURN_PARAMS as n, consumePaymentReturn as r, BILLING_WEB_RETURN_PARAMS as t };
