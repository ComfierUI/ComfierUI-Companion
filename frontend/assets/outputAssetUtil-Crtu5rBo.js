import "./rolldown-runtime-xtsTai4I.js";
import { C as vModelText, Dt as withDirectives, F as createBaseVNode, Ft as reactive, G as defineComponent, Ht as toRef, It as readonly, Jt as normalizeClass, Kt as unref, L as createCommentVNode, Lt as ref, P as computed, Q as mergeModels, R as createElementBlock, St as watch, T as withKeys, Wt as toValue, et as nextTick, lt as openBlock, ot as onMounted, yt as useModel } from "./vendor-vue-core-C1utdb0s.js";
import { X as createSharedComposable, tt as refDebounced } from "./vendor-vueuse-BxKIIsKg.js";
import { Wr as getJobDetail, ci as resultItemUrl, qr as getPreviewableOutputsFromJobDetail, si as resultItemPreviewUrl } from "./layoutStore-CZsuzg91.js";
import { t as cn } from "./src-DI1bBfrb.js";
//#region src/renderer/core/layout/transform/useTransformState.ts
/**
* Composable for managing transform state synchronized with LiteGraph canvas
*
* This composable is a critical part of the hybrid rendering architecture that
* allows Vue components to render in perfect alignment with LiteGraph's canvas.
*
* ## Core Concept
*
* LiteGraph uses a canvas for rendering connections, grid, and handling interactions.
* Vue components need to render nodes on top of this canvas. The challenge is
* synchronizing the coordinate systems:
*
* - LiteGraph: Uses canvas coordinates with its own transform matrix
* - Vue/DOM: Uses screen coordinates with CSS transforms
*
* ## Solution: Transform Container Pattern
*
* Instead of transforming individual nodes (O(n) complexity), we:
* 1. Mirror LiteGraph's transform matrix to a single CSS container
* 2. Place all Vue nodes as children with simple absolute positioning
* 3. Achieve O(1) transform updates regardless of node count
*
* ## Coordinate Systems
*
* - **Canvas coordinates**: LiteGraph's internal coordinate system
* - **Screen coordinates**: Browser's viewport coordinate system
* - **Transform sync**: camera.x/y/z mirrors canvas.ds.offset/scale
*
* ## Performance Benefits
*
* - GPU acceleration via CSS transforms
* - No layout thrashing (only transform changes)
* - Efficient viewport culling calculations
* - Scales to 1000+ nodes while maintaining 60 FPS
*
* @example
* ```typescript
* const { camera, transformStyle, screenToCanvas } = useTransformState()
*
* // In template
* <div :style="transformStyle">
*   <NodeComponent
*     v-for="node in nodes"
*     :style="{ left: node.x + 'px', top: node.y + 'px' }"
*   />
* </div>
*
* // Convert coordinates
* const canvasPos = screenToCanvas({ x: clientX, y: clientY })
* ```
*/
function useTransformStateIndividual() {
	const camera = reactive({
		x: 0,
		y: 0,
		z: 1
	});
	const transformStyle = computed(() => ({
		transform: `scale3d(${camera.z}, ${camera.z}, ${camera.z}) translate3d(${camera.x}px, ${camera.y}px, 0)`,
		transformOrigin: "0 0"
	}));
	/**
	* Synchronizes Vue's reactive camera state with LiteGraph's canvas transform
	*
	* Called every frame via RAF to ensure Vue components stay aligned with canvas.
	* This is the heart of the hybrid rendering system - it bridges the gap between
	* LiteGraph's canvas transforms and Vue's reactive system.
	*
	* @param canvas - LiteGraph canvas instance with DragAndScale (ds) transform state
	*/
	function syncWithCanvas(canvas) {
		camera.x = canvas.ds.offset[0];
		camera.y = canvas.ds.offset[1];
		camera.z = canvas.ds.scale || 1;
	}
	/**
	* Converts screen coordinates to canvas coordinates
	*
	* Inverse of the pane's own `transformStyle`. Useful for hit testing and
	* converting mouse events back to canvas space.
	*
	* Formula: canvas = screen / scale - offset
	*
	* @param point - Point in screen coordinate system
	* @returns Point in canvas coordinate system
	*/
	const screenToCanvas = (point) => {
		return {
			x: point.x / camera.z - camera.x,
			y: point.y / camera.z - camera.y
		};
	};
	return {
		camera: readonly(camera),
		transformStyle,
		syncWithCanvas,
		screenToCanvas
	};
}
var useTransformState = createSharedComposable(useTransformStateIndividual);
//#endregion
//#region src/components/ui/search-input/AsyncSearchInput.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1 = ["placeholder", "autofocus"];
var _hoisted_2 = ["aria-label"];
//#endregion
//#region src/components/ui/search-input/AsyncSearchInput.vue
var AsyncSearchInput_default = /* @__PURE__ */ defineComponent({
	__name: "AsyncSearchInput",
	props: /*@__PURE__*/ mergeModels({
		searcher: {
			type: Function,
			default: async () => {}
		},
		updateKey: {},
		autofocus: {
			type: Boolean,
			default: false
		},
		debounceMs: { default: 250 },
		debounceMaxWaitMs: { default: 1e3 },
		class: { type: [
			Boolean,
			null,
			String,
			Object,
			Array
		] }
	}, {
		"modelValue": { default: "" },
		"modelModifiers": {}
	}),
	emits: /*@__PURE__*/ mergeModels(["enter"], ["update:modelValue"]),
	setup(__props, { expose: __expose, emit: __emit }) {
		const emit = __emit;
		const searchQuery = useModel(__props, "modelValue");
		const inputRef = ref();
		onMounted(() => {
			if (!__props.autofocus) return;
			nextTick(() => inputRef.value?.focus());
		});
		__expose({ focus: () => inputRef.value?.focus() });
		const isQuerying = ref(false);
		const debouncedSearchQuery = refDebounced(searchQuery, __props.debounceMs, { maxWait: __props.debounceMaxWaitMs });
		watch(searchQuery, (value) => {
			isQuerying.value = value !== debouncedSearchQuery.value;
		});
		const updateKeyRef = toRef(() => toValue(__props.updateKey));
		watch([debouncedSearchQuery, updateKeyRef], (_, __, onCleanup) => {
			let isCleanup = false;
			let cleanupFn;
			onCleanup(() => {
				isCleanup = true;
				cleanupFn?.();
			});
			__props.searcher(debouncedSearchQuery.value, (cb) => cleanupFn = cb).catch((error) => {
				console.error("[AsyncSearchInput] searcher failed", error);
			}).finally(() => {
				if (!isCleanup) isQuerying.value = false;
			});
		}, { immediate: true });
		function handleFocus(event) {
			const target = event.target;
			if (target instanceof HTMLInputElement) target.select();
		}
		function handleKeydownEnter(event) {
			if (event.isComposing) return;
			emit("enter", event);
		}
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("label", { class: normalizeClass(unref(cn)("group", "rounded-lg bg-secondary-background transition-all duration-150", "flex flex-1 items-center", "border-0 text-base-foreground", "focus-within:ring focus-within:ring-border-default/80", __props.class)) }, [
				createBaseVNode("i", { class: normalizeClass(unref(cn)("ml-2 size-4 shrink-0 transition-colors duration-150", isQuerying.value ? "icon-[lucide--loader-circle] animate-spin" : "icon-[lucide--search]", searchQuery.value?.trim() !== "" ? "text-base-foreground" : "text-muted-foreground group-focus-within:text-base-foreground group-hover:text-base-foreground")) }, null, 2),
				withDirectives(createBaseVNode("input", {
					ref_key: "inputRef",
					ref: inputRef,
					"onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => searchQuery.value = $event),
					type: "text",
					class: "mx-2 my-1.5 h-5 w-full min-w-0 border-0 bg-transparent ring-0 outline-0",
					placeholder: _ctx.$t("g.searchPlaceholder", { subject: "" }),
					autofocus: __props.autofocus,
					onFocus: handleFocus,
					onKeydown: withKeys(handleKeydownEnter, ["enter"])
				}, null, 40, _hoisted_1), [[vModelText, searchQuery.value]]),
				searchQuery.value.trim().length > 0 ? (openBlock(), createElementBlock("button", {
					key: 0,
					class: "m-0 flex shrink-0 items-center justify-center border-0 bg-transparent p-0 pr-3 pl-1 text-muted-foreground ring-0 outline-0 transition-all duration-150 hover:scale-108 hover:text-base-foreground",
					"aria-label": _ctx.$t("g.clear"),
					onClick: _cache[1] || (_cache[1] = ($event) => searchQuery.value = "")
				}, [createBaseVNode("i", { class: normalizeClass(unref(cn)("icon-[lucide--delete] size-4 cursor-pointer")) }, null, 2)], 8, _hoisted_2)) : createCommentVNode("", true)
			], 2);
		};
	}
});
//#endregion
//#region src/platform/assets/utils/outputKeyUtil.ts
function getOutputKey({ nodeId, subfolder, filename }) {
	if (nodeId == null || subfolder == null || !filename) return null;
	return JSON.stringify([
		String(nodeId),
		subfolder,
		filename
	]);
}
//#endregion
//#region src/platform/assets/utils/outputAssetUtil.ts
function shouldLoadFullOutputs(outputCount, outputsLength) {
	return typeof outputCount === "number" && outputCount > 1 && outputsLength < outputCount;
}
/**
* Maps a job's outputs to AssetItems with ids derived from the composite
* `[nodeId, subfolder, filename]` key. Records sharing a composite key are
* dropped after the first to keep `:key` unique in VirtualGrid — colliding
* ids cause Vue to reuse one DOM node and visibly duplicate the asset on
* scroll.
*
* The dedupe key ignores `type`/`mediaType`/`format`/`frame_rate` because
* those fields don't appear in `AssetItem.id`, so widening the key would
* just let the collision propagate. The kept copy is the first one seen;
* callers that reverse the input (e.g. `resolveOutputAssetItems`) retain
* the last record in the API's original order.
*/
function mapOutputsToAssetItems({ jobId, outputs, createdAt, executionTimeInSeconds, workflow, excludeOutputKey }) {
	const createdAtValue = createdAt ?? (/* @__PURE__ */ new Date()).toISOString();
	const seenOutputKeys = /* @__PURE__ */ new Set();
	return outputs.reduce((items, output) => {
		const outputKey = getOutputKey(output);
		if (!output.filename || !outputKey || outputKey === excludeOutputKey) return items;
		if (seenOutputKeys.has(outputKey)) return items;
		seenOutputKeys.add(outputKey);
		items.push({
			id: output.assetId || `${jobId}-${outputKey}`,
			name: output.filename,
			display_name: output.display_name,
			size: 0,
			created_at: createdAtValue,
			updated_at: createdAtValue,
			tags: ["output"],
			thumbnail_url: resultItemPreviewUrl(output),
			preview_url: resultItemUrl(output),
			user_metadata: {
				jobId,
				nodeId: output.nodeId,
				subfolder: output.subfolder,
				executionTimeInSeconds,
				workflow
			}
		});
		return items;
	}, []);
}
async function resolveOutputAssetItems(metadata, { createdAt, excludeOutputKey } = {}) {
	let outputsToDisplay = metadata.allOutputs ?? [];
	if (shouldLoadFullOutputs(metadata.outputCount, outputsToDisplay.length)) {
		const jobDetail = await getJobDetail(metadata.jobId);
		const previewableOutputs = getPreviewableOutputsFromJobDetail(jobDetail);
		if (previewableOutputs.length) outputsToDisplay = previewableOutputs;
	}
	return mapOutputsToAssetItems({
		jobId: metadata.jobId,
		outputs: [...outputsToDisplay].reverse(),
		createdAt,
		executionTimeInSeconds: metadata.executionTimeInSeconds,
		workflow: metadata.workflow,
		excludeOutputKey
	});
}
//#endregion
export { useTransformState as i, getOutputKey as n, AsyncSearchInput_default as r, resolveOutputAssetItems as t };
