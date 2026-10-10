import "./rolldown-runtime-xtsTai4I.js";
import { _ as objectType, b as stringType } from "./vendor-zod-TMj9Wsdv.js";
import { d as t } from "./i18n-C3J-ToPr.js";
//#region packages/account-core/src/signInSchemas.ts
/**
* The one password policy, shared by the schema and by the live checklist
* sign-up forms show while the field is being typed.
*/
var PASSWORD_RULES = {
	minLength: 8,
	maxLength: 32,
	uppercase: /[A-Z]/,
	lowercase: /[a-z]/,
	number: /\d/,
	special: /[^A-Za-z0-9]/
};
function passwordRuleChecks(password) {
	return {
		length: password.length >= PASSWORD_RULES.minLength && password.length <= PASSWORD_RULES.maxLength,
		uppercase: PASSWORD_RULES.uppercase.test(password),
		lowercase: PASSWORD_RULES.lowercase.test(password),
		number: PASSWORD_RULES.number.test(password),
		special: PASSWORD_RULES.special.test(password)
	};
}
/**
* Builds the auth validation schemas with the host's own translator, so the
* rules live once while each host keeps its i18n system. Messages resolve
* eagerly at build time, so a locale switch requires rebuilding the schemas.
*/
function createAuthSchemas(t) {
	const apiKeySchema = objectType({ apiKey: stringType().trim().startsWith("comfyui-", t("validation.prefix", { prefix: "comfyui-" })).length(72, t("validation.length", { length: 72 })) });
	const signInSchema = objectType({
		email: stringType().email(t("validation.invalidEmail")).min(1, t("validation.required")),
		password: stringType().min(1, t("validation.required"))
	});
	const passwordSchema = objectType({
		password: stringType().min(PASSWORD_RULES.minLength, t("validation.minLength", { length: PASSWORD_RULES.minLength })).max(PASSWORD_RULES.maxLength, t("validation.maxLength", { length: PASSWORD_RULES.maxLength })).regex(PASSWORD_RULES.uppercase, t("validation.password.uppercase")).regex(PASSWORD_RULES.lowercase, t("validation.password.lowercase")).regex(PASSWORD_RULES.number, t("validation.password.number")).regex(PASSWORD_RULES.special, t("validation.password.special")),
		confirmPassword: stringType().min(1, t("validation.required"))
	});
	return {
		apiKeySchema,
		signInSchema,
		updatePasswordSchema: passwordSchema.refine((data) => data.password === data.confirmPassword, {
			message: t("validation.password.match"),
			path: ["confirmPassword"]
		}),
		signUpSchema: passwordSchema.extend({ email: stringType().email(t("validation.invalidEmail")).min(1, t("validation.required")) }).refine((data) => data.password === data.confirmPassword, {
			message: t("validation.password.match"),
			path: ["confirmPassword"]
		})
	};
}
//#endregion
//#region src/schemas/signInSchema.ts
var { apiKeySchema, signInSchema, updatePasswordSchema, signUpSchema } = createAuthSchemas(t);
//#endregion
export { passwordRuleChecks as a, updatePasswordSchema as i, signInSchema as n, signUpSchema as r, apiKeySchema as t };
