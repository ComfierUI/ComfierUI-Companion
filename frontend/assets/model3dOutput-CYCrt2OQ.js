import "./rolldown-runtime-xtsTai4I.js";
import { C as unknownType, _ as objectType, b as stringType, c as booleanType, f as enumType, g as numberType, s as arrayType, u as custom } from "./vendor-zod-TMj9Wsdv.js";
//#region src/extensions/core/load3d/model3dOutput.ts
var zVector3 = objectType({
	x: numberType(),
	y: numberType(),
	z: numberType()
});
var zQuaternion = zVector3.extend({ w: numberType() });
var zCameraShape = objectType({
	position: zVector3,
	target: zVector3,
	zoom: numberType(),
	cameraType: enumType(["perspective", "orthographic"]),
	quaternion: zQuaternion.optional(),
	useCustomUp: booleanType().optional(),
	customUp: zVector3.optional(),
	fov: numberType().optional(),
	aspect: numberType().optional(),
	near: numberType().optional(),
	far: numberType().optional(),
	frustum: objectType({
		left: numberType(),
		right: numberType(),
		top: numberType(),
		bottom: numberType()
	}).optional()
});
var zCameraState = custom((value) => zCameraShape.safeParse(value).success);
var zModelTransform = objectType({
	position: zVector3,
	quaternion: zQuaternion,
	scale: zVector3
});
var zLoadFolder = enumType(["output", "temp"]);
var zModel3DItem = objectType({
	filename: stringType().min(1),
	subfolder: stringType().optional().catch(void 0),
	type: zLoadFolder.optional().catch(void 0)
});
var zOptionalList = arrayType(unknownType()).optional().catch(void 0);
var zModel3DNodeOutput = objectType({
	"3d": zOptionalList,
	camera_info: zOptionalList,
	model_3d_info: zOptionalList,
	result: zOptionalList
});
function parseOptional(schema, value) {
	const parsed = schema.safeParse(value);
	return parsed.success ? parsed.data : void 0;
}
function readModel3DOutput(output) {
	const parsed = zModel3DNodeOutput.safeParse(output);
	if (!parsed.success) return null;
	const { "3d": items, camera_info, model_3d_info, result } = parsed.data;
	const parsedItem = zModel3DItem.safeParse(items?.[0]);
	if (parsedItem.success) {
		const item = parsedItem.data;
		return {
			filePath: item.subfolder ? `${item.subfolder}/${item.filename}` : item.filename,
			folder: item.type,
			cameraState: parseOptional(zCameraState, camera_info?.[0]),
			modelTransform: parseOptional(zModelTransform, model_3d_info?.[0])
		};
	}
	const [filePath, cameraInfo, modelInfo] = result ?? [];
	if (typeof filePath !== "string" || !filePath) return null;
	return {
		filePath,
		cameraState: parseOptional(zCameraState, cameraInfo),
		modelTransform: parseOptional(zModelTransform, Array.isArray(modelInfo) ? modelInfo[0] : void 0)
	};
}
window.comfyAPI = window.comfyAPI || {};
window.comfyAPI.model3dOutput = window.comfyAPI.model3dOutput || {};
window.comfyAPI.model3dOutput.readModel3DOutput = readModel3DOutput;
//#endregion
export { readModel3DOutput as t };
