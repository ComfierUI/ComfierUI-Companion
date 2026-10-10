import "./rolldown-runtime-xtsTai4I.js";
import { G as defineComponent, I as createBlock, lt as openBlock } from "./vendor-vue-core-C1utdb0s.js";
import { t as Load3D_default } from "./Load3D-wteGUp-H.js";
//#endregion
//#region src/components/load3d/Load3DAdvanced.vue
var Load3DAdvanced_default = /* @__PURE__ */ defineComponent({
	__name: "Load3DAdvanced",
	props: {
		widget: {},
		nodeId: {}
	},
	setup(__props) {
		return (_ctx, _cache) => {
			return openBlock(), createBlock(Load3D_default, {
				widget: __props.widget,
				"node-id": __props.nodeId,
				"can-use-recording": false,
				"can-use-hdri": false,
				"can-use-background-image": false
			}, null, 8, ["widget", "node-id"]);
		};
	}
});
//#endregion
export { Load3DAdvanced_default as t };
