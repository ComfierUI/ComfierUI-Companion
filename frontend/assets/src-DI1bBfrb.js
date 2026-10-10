import "./rolldown-runtime-xtsTai4I.js";
import { H as extendTailwindMerge, W as clsx } from "./vendor-other-BPEcPQTD.js";
//#region packages/tailwind-utils/src/index.ts
var twMerge = extendTailwindMerge({ extend: { classGroups: {
	"font-size": ["text-xxs", "text-xxxs"],
	"max-h": [{ "max-h": ["none"] }]
} } });
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
//#endregion
export { cn as t };
