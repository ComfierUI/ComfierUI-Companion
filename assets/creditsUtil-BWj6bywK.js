import "./rolldown-runtime-xtsTai4I.js";
//#region packages/shared-frontend-utils/src/creditsUtil.ts
var DEFAULT_NUMBER_FORMAT = {
	minimumFractionDigits: 2,
	maximumFractionDigits: 2
};
var formatNumber = ({ value, locale, options }) => {
	const merged = {
		...DEFAULT_NUMBER_FORMAT,
		...options
	};
	if (typeof merged.maximumFractionDigits === "number" && typeof merged.minimumFractionDigits === "number" && merged.maximumFractionDigits < merged.minimumFractionDigits) merged.minimumFractionDigits = merged.maximumFractionDigits;
	return new Intl.NumberFormat(locale, merged).format(value);
};
var centsToCredits = (cents) => Math.round(cents * 211 / 100);
var usdToCredits = (usd) => Math.round(usd * 211);
var creditsToUsd = (credits) => Math.round(credits / 211 * 100) / 100;
var formatCredits = ({ value, locale, numberOptions }) => formatNumber({
	value,
	locale,
	options: numberOptions
});
var formatCreditsFromCents = ({ cents, locale, numberOptions }) => formatCredits({
	value: centsToCredits(cents),
	locale,
	numberOptions
});
var formatUsd = ({ value, locale, numberOptions }) => formatNumber({
	value,
	locale,
	options: numberOptions
});
var formatUsdFromCents = ({ cents, locale, numberOptions }) => formatUsd({
	value: cents / 100,
	locale,
	numberOptions
});
//#endregion
export { formatUsdFromCents as a, formatCreditsFromCents as i, creditsToUsd as n, usdToCredits as o, formatCredits as r, centsToCredits as t };
