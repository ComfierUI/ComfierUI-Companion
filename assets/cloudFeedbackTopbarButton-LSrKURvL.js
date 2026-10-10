import "./rolldown-runtime-xtsTai4I.js";
import { Jr as useExtensionService, i as useSettingStore } from "./layoutStore-CZsuzg91.js";
import { d as t } from "./i18n-C3J-ToPr.js";
import { t as openFeedbackDialog } from "./feedbackDialog-tMzXSNi8.js";
//#region src/extensions/core/cloudFeedbackTopbarButton.ts
var buttons = [{
	icon: "icon-[hugeicons--megaphone-03]",
	label: t("actionbar.feedback"),
	tooltip: t("actionbar.feedbackTooltip"),
	onClick: () => openFeedbackDialog("action-bar")
}];
useExtensionService().registerExtension({
	name: "Comfy.FeedbackButton",
	get actionBarButtons() {
		return useSettingStore().get("Comfy.UI.TabBarLayout") === "Legacy" ? buttons : [];
	}
});
//#endregion
