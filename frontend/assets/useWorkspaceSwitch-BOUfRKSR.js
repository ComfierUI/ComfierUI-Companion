import "./rolldown-runtime-xtsTai4I.js";
import { p as storeToRefs } from "./vendor-vue-core-C1utdb0s.js";
import { Wl as useTeamWorkspaceStore } from "./layoutStore-CZsuzg91.js";
//#region src/platform/workspace/composables/useWorkspaceSwitch.ts
function useWorkspaceSwitch() {
	const workspaceStore = useTeamWorkspaceStore();
	const { activeWorkspace } = storeToRefs(workspaceStore);
	async function switchWorkspace(workspaceId) {
		if (activeWorkspace.value?.id === workspaceId) return true;
		try {
			await workspaceStore.switchWorkspace(workspaceId);
			return true;
		} catch {
			return false;
		}
	}
	return { switchWorkspace };
}
//#endregion
export { useWorkspaceSwitch as t };
