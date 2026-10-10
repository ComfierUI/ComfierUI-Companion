import { r as __name } from "./rolldown-runtime-xtsTai4I.js";
import { $ as mergeProps, At as effectScope, Bt as shallowRef, Ct as watchEffect, D as Comment, E as withModifiers, Et as withCtx, F as createBaseVNode, Ft as reactive, G as defineComponent, Gt as triggerRef, H as createTextVNode, Ht as toRef, I as createBlock, It as readonly, J as h, K as getCurrentInstance, Kt as unref, L as createCommentVNode, Lt as ref, Mt as isRef, N as cloneVNode, Nt as markRaw, O as Fragment, Ot as withMemo, P as computed, Pt as onScopeDispose, Qt as toHandlerKey, R as createElementBlock, St as watch, T as withKeys, Tt as watchSyncEffect, U as createVNode, Ut as toRefs, Vt as toRaw, Wt as toValue$1, X as inject, Xt as normalizeStyle, Yt as normalizeProps, Z as mergeDefaults, Zt as toDisplayString, bt as useSlots, ct as onUpdated, dt as renderList, et as nextTick, ft as renderSlot, gt as toHandlers, ht as resolveDynamicComponent, j as Teleport, jt as getCurrentScope, kt as customRef, lt as openBlock, m as vue_runtime_esm_bundler_exports, nt as onBeforeMount, ot as onMounted, q as guardReactiveProps, qt as camelize$1, rt as onBeforeUnmount, st as onUnmounted, ut as provide, vt as useId$1, wt as watchPostEffect, zt as shallowReadonly } from "./vendor-vue-core-C1utdb0s.js";
//#region node_modules/.pnpm/ohash@2.0.11/node_modules/ohash/dist/shared/ohash.D__AXeF1.mjs
function serialize(o) {
	return typeof o == "string" ? `'${o}'` : new c().serialize(o);
}
var c = /*@__PURE__*/ function() {
	class o {
		#t = /* @__PURE__ */ new Map();
		compare(t, r) {
			const e = typeof t;
			const n = typeof r;
			return e === "string" && n === "string" ? t.localeCompare(r) : e === "number" && n === "number" ? t - r : String.prototype.localeCompare.call(this.serialize(t, true), this.serialize(r, true));
		}
		serialize(t, r) {
			if (t === null) return "null";
			switch (typeof t) {
				case "string": return r ? t : `'${t}'`;
				case "bigint": return `${t}n`;
				case "object": return this.$object(t);
				case "function": return this.$function(t);
			}
			return String(t);
		}
		serializeObject(t) {
			const r = Object.prototype.toString.call(t);
			if (r !== "[object Object]") return this.serializeBuiltInType(r.length < 10 ? `unknown:${r}` : r.slice(8, -1), t);
			const e = t.constructor;
			const n = e === Object || e === void 0 ? "" : e.name;
			if (n !== "" && globalThis[n] === e) return this.serializeBuiltInType(n, t);
			if (typeof t.toJSON == "function") {
				const i = t.toJSON();
				return n + (i !== null && typeof i == "object" ? this.$object(i) : `(${this.serialize(i)})`);
			}
			return this.serializeObjectEntries(n, Object.entries(t));
		}
		serializeBuiltInType(t, r) {
			const e = this["$" + t];
			if (e) return e.call(this, r);
			if (typeof r?.entries == "function") return this.serializeObjectEntries(t, r.entries());
			throw new Error(`Cannot serialize ${t}`);
		}
		serializeObjectEntries(t, r) {
			const e = Array.from(r).sort((i, a) => this.compare(i[0], a[0]));
			let n = `${t}{`;
			for (let i = 0; i < e.length; i++) {
				const [a, l] = e[i];
				n += `${this.serialize(a, true)}:${this.serialize(l)}`, i < e.length - 1 && (n += ",");
			}
			return n + "}";
		}
		$object(t) {
			let r = this.#t.get(t);
			return r === void 0 && (this.#t.set(t, `#${this.#t.size}`), r = this.serializeObject(t), this.#t.set(t, r)), r;
		}
		$function(t) {
			const r = Function.prototype.toString.call(t);
			return r.slice(-15) === "[native code] }" ? `${t.name || ""}()[native]` : `${t.name}(${t.length})${r.replace(/\s*\n\s*/g, "")}`;
		}
		$Array(t) {
			let r = "[";
			for (let e = 0; e < t.length; e++) r += this.serialize(t[e]), e < t.length - 1 && (r += ",");
			return r + "]";
		}
		$Date(t) {
			try {
				return `Date(${t.toISOString()})`;
			} catch {
				return "Date(null)";
			}
		}
		$ArrayBuffer(t) {
			return `ArrayBuffer[${new Uint8Array(t).join(",")}]`;
		}
		$Set(t) {
			return `Set${this.$Array(Array.from(t).sort((r, e) => this.compare(r, e)))}`;
		}
		$Map(t) {
			return this.serializeObjectEntries("Map", t.entries());
		}
	}
	for (const s of [
		"Error",
		"RegExp",
		"URL"
	]) o.prototype["$" + s] = function(t) {
		return `${s}(${t})`;
	};
	for (const s of [
		"Int8Array",
		"Uint8Array",
		"Uint8ClampedArray",
		"Int16Array",
		"Uint16Array",
		"Int32Array",
		"Uint32Array",
		"Float32Array",
		"Float64Array"
	]) o.prototype["$" + s] = function(t) {
		return `${s}[${t.join(",")}]`;
	};
	for (const s of ["BigInt64Array", "BigUint64Array"]) o.prototype["$" + s] = function(t) {
		return `${s}[${t.join("n,")}${t.length > 0 ? "n" : ""}]`;
	};
	return o;
}();
function isEqual(object1, object2) {
	if (object1 === object2) return true;
	if (serialize(object1) === serialize(object2)) return true;
	return false;
}
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/shared/arrays.js
/**
* The function `areEqual` compares two arrays and returns true if they are equal in length and have
* the same elements at corresponding indexes.
* @param {any[]} arrayA - An array of any type of elements.
* @param {any[]} arrayB - It looks like you haven't provided the value for `arrayB`. Could you please
* provide the arrayB value so that I can assist you further?
* @returns The function `areEqual` is returning a boolean value, either `true` if the two input arrays
* `arrayA` and `arrayB` are equal, or `false` if they are not equal.
*/
function areEqual(arrayA, arrayB) {
	if (arrayA.length !== arrayB.length) return false;
	for (let index = 0; index < arrayA.length; index++) if (arrayA[index] !== arrayB[index]) return false;
	return true;
}
/**
* The function `findValuesBetween` takes an array and two values, then returns a subarray containing
* elements between the first occurrence of the start value and the first occurrence of the end value
* in the array.
* @param {T[]} array - The `array` parameter is an array of values of type `T`.
* @param {T} start - The `start` parameter is the value that marks the beginning of the range you want
* to find in the array.
* @param {T} end - The `end` parameter in the `findValuesBetween` function represents the end value
* that you want to find in the array. This function will return a subarray of values that are between
* the `start` and `end` values in the original array.
* @returns The `findValuesBetween` function returns an array of values from the input array that are
* between the `start` and `end` values (inclusive). If either the `start` or `end` values are not
* found in the input array, an empty array is returned.
*/
function findValuesBetween(array, start, end) {
	const startIndex = array.findIndex((i) => isEqual(i, start));
	const endIndex = array.findIndex((i) => isEqual(i, end));
	if (startIndex === -1 || endIndex === -1) return [];
	const [minIndex, maxIndex] = [startIndex, endIndex].sort((a, b) => a - b);
	return array.slice(minIndex, maxIndex + 1);
}
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/shared/browser.js
var isBrowser = typeof document !== "undefined";
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/shared/clamp.js
/**
* The `clamp` function restricts a number within a specified range by returning the value itself if it
* falls within the range, or the closest boundary value if it exceeds the range.
* @param {number} value - The `value` parameter represents the number that you want to clamp within
* the specified range defined by `min` and `max` values.
* @param {number} min - If the `value` parameter is less than the `min` value, the
* function will return the `min` value.
* @param {number} max - If the `value` parameter is greater than the `max` value,
* the function will return `max`.
* @returns The `clamp` function returns the value of `value` constrained within the range defined by
* `min` and `max`.
*/
function clamp$1(value, min = Number.NEGATIVE_INFINITY, max = Number.POSITIVE_INFINITY) {
	return Math.min(max, Math.max(min, value));
}
__name(clamp$1, "clamp");
/**
* The function `roundToStepPrecision` rounds a number to a specified precision step.
* @param {number} value - The `value` parameter is the number that you want to round to a specific
* precision based on the `step` parameter.
* @param {number} step - The `step` parameter in the `roundToStepPrecision` function represents the
* interval at which you want to round the `value`. For example, if `step` is 0.5, the `value` will be
* rounded to the nearest half.
* @returns the `roundedValue` after rounding it to the precision specified by the `step`.
*/
function roundToStepPrecision(value, step) {
	let roundedValue = value;
	const stepString = step.toString();
	const pointIndex = stepString.indexOf(".");
	const precision = pointIndex >= 0 ? stepString.length - pointIndex : 0;
	if (precision > 0) {
		const pow = 10 ** precision;
		roundedValue = Math.round(roundedValue * pow) / pow;
	}
	return roundedValue;
}
/**
* The function `snapValueToStep` snaps a given value to the nearest step within a specified range.
* @param {number} value - The `value` parameter represents the number that you want to snap to the
* nearest step value.
* @param {number | undefined} min - The `min` parameter represents the minimum value that the `value`
* should be snapped to. If `value` is less than `min`, it will be snapped to `min`. If `min` is not
* provided (undefined), then the snapping will not consider a minimum value.
* @param {number | undefined} max - The `max` parameter represents the maximum value that the `value`
* should be snapped to. It ensures that the snapped value does not exceed this maximum value.
* @param {number} step - The `step` parameter in the `snapValueToStep` function represents the
* interval at which the `value` should be snapped to. It determines the granularity of the snapping
* operation. For example, if `step` is 5, the `value` will be snapped to the nearest multiple of
* @returns a number that has been snapped to the nearest step value within the specified range of minimum and maximum values.
*/
function snapValueToStep(value, min, max, step) {
	min = Number(min);
	max = Number(max);
	const remainder = (value - (Number.isNaN(min) ? 0 : min)) % step;
	let snappedValue = roundToStepPrecision(Math.abs(remainder) * 2 >= step ? value + Math.sign(remainder) * (step - Math.abs(remainder)) : value - remainder, step);
	if (!Number.isNaN(min)) {
		if (snappedValue < min) snappedValue = min;
		else if (!Number.isNaN(max) && snappedValue > max) snappedValue = min + Math.floor(roundToStepPrecision((max - min) / step, step)) * step;
	} else if (!Number.isNaN(max) && snappedValue > max) snappedValue = Math.floor(roundToStepPrecision(max / step, step)) * step;
	snappedValue = roundToStepPrecision(snappedValue, step);
	return snappedValue;
}
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/shared/createContext.js
/**
* @param providerComponentName - The name(s) of the component(s) providing the context.
*
* There are situations where context can come from multiple components. In such cases, you might need to give an array of component names to provide your context, instead of just a single string.
*
* @param contextName The description for injection key symbol.
*/
function createContext(providerComponentName, contextName) {
	const symbolDescription = typeof providerComponentName === "string" && !contextName ? `${providerComponentName}Context` : contextName;
	const injectionKey = Symbol(symbolDescription);
	/**
	* @param fallback The context value to return if the injection fails.
	*
	* @throws When context injection failed and no fallback is specified.
	* This happens when the component injecting the context is not a child of the root component providing the context.
	*/
	const injectContext = (fallback) => {
		const context = inject(injectionKey, fallback);
		if (context) return context;
		if (context === null) return context;
		throw new Error(`Injection \`${injectionKey.toString()}\` not found. Component must be used within ${Array.isArray(providerComponentName) ? `one of the following components: ${providerComponentName.join(", ")}` : `\`${providerComponentName}\``}`);
	};
	const provideContext = (contextValue) => {
		provide(injectionKey, contextValue);
		return contextValue;
	};
	return [injectContext, provideContext];
}
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/shared/getActiveElement.js
function getActiveElement() {
	let activeElement = document.activeElement;
	if (activeElement == null) return null;
	while (activeElement != null && activeElement.shadowRoot != null && activeElement.shadowRoot.activeElement != null) activeElement = activeElement.shadowRoot.activeElement;
	return activeElement;
}
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/shared/handleAndDispatchCustomEvent.js
function handleAndDispatchCustomEvent(name, handler, detail) {
	const target = detail.originalEvent.target;
	const event = new CustomEvent(name, {
		bubbles: false,
		cancelable: true,
		detail
	});
	if (handler) target.addEventListener(name, handler, { once: true });
	target.dispatchEvent(event);
}
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/shared/nullish.js
function isNullish(value) {
	return value === null || value === void 0;
}
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/shared/isValueEqualOrExist.js
/**
* The function `isValueEqualOrExist` checks if a value is equal to or exists in another value or
* array.
* @param {T | T[] | undefined} base - It represents the base value that you want to compare with the `current` value.
* @param {T | T[] | undefined} current - The `current` parameter represents the current value that you want to compare with the `base` value or values.
* @returns The `isValueEqualOrExist` function returns a boolean value. It checks if the `base` value
* is equal to the `current` value or if the `current` value exists within the `base` value. The
* function handles cases where `base` can be a single value, an array of values, or undefined.
*/
function isValueEqualOrExist(base, current) {
	if (isNullish(base)) return false;
	if (Array.isArray(base)) return base.some((val) => isEqual(val, current));
	else return isEqual(base, current);
}
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/shared/renderSlotFragments.js
function renderSlotFragments(children) {
	if (!children) return [];
	return children.flatMap((child) => {
		if (child.type === Fragment) return renderSlotFragments(child.children);
		return [child];
	});
}
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/shared/useArrowNavigation.js
var ignoredElement = ["INPUT", "TEXTAREA"];
/**
* Allow arrow navigation for every html element with data-reka-collection-item tag
*
* @param e               Keyboard event
* @param currentElement  Event initiator element or any element that wants to handle the navigation
* @param parentElement   Parent element where contains all the collection items, this will collect every item to be used when nav
* @param options         further options
* @returns               the navigated html element or null if none
*/
function useArrowNavigation(e, currentElement, parentElement, options = {}) {
	if (!currentElement || options.enableIgnoredElement && ignoredElement.includes(currentElement.nodeName)) return null;
	const { arrowKeyOptions = "both", attributeName = "[data-reka-collection-item]", itemsArray = [], loop = true, dir = "ltr", preventScroll = true, focus = false } = options;
	const [right, left, up, down, home, end] = [
		e.key === "ArrowRight",
		e.key === "ArrowLeft",
		e.key === "ArrowUp",
		e.key === "ArrowDown",
		e.key === "Home",
		e.key === "End"
	];
	const goingVertical = up || down;
	const goingHorizontal = right || left;
	if (!home && !end && (!goingVertical && !goingHorizontal || arrowKeyOptions === "vertical" && goingHorizontal || arrowKeyOptions === "horizontal" && goingVertical)) return null;
	const allCollectionItems = parentElement ? Array.from(parentElement.querySelectorAll(attributeName)) : itemsArray;
	if (!allCollectionItems.length) return null;
	if (preventScroll) e.preventDefault();
	let item = null;
	if (goingHorizontal || goingVertical) item = findNextFocusableElement(allCollectionItems, currentElement, {
		goForward: goingVertical ? down : dir === "ltr" ? right : left,
		loop
	});
	else if (home) item = allCollectionItems.at(0) || null;
	else if (end) item = allCollectionItems.at(-1) || null;
	if (focus) item?.focus();
	return item;
}
/**
* Recursive function to find the next focusable element to avoid disabled elements
*
* @param elements Elements to navigate
* @param currentElement Current active element
* @param options
* @returns next focusable element
*/
function findNextFocusableElement(elements, currentElement, options, iterations = elements.length) {
	if (--iterations === 0) return null;
	const index = elements.indexOf(currentElement);
	const newIndex = options.goForward ? index + 1 : index - 1;
	if (!options.loop && (newIndex < 0 || newIndex >= elements.length)) return null;
	const candidate = elements[(newIndex + elements.length) % elements.length];
	if (!candidate) return null;
	if (candidate.hasAttribute("disabled") && candidate.getAttribute("disabled") !== "false") return findNextFocusableElement(elements, candidate, options, iterations);
	return candidate;
}
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/ConfigProvider/ConfigProvider.js
var [injectConfigProviderContext, provideConfigProviderContext] = createContext("ConfigProvider");
//#endregion
//#region node_modules/.pnpm/@vueuse+shared@12.8.2_typescript@6.0.3/node_modules/@vueuse/shared/index.mjs
function computedEager(fn, options) {
	var _a;
	const result = shallowRef();
	watchEffect(() => {
		result.value = fn();
	}, {
		...options,
		flush: (_a = options == null ? void 0 : options.flush) != null ? _a : "sync"
	});
	return readonly(result);
}
function computedWithControl(source, fn) {
	let v = void 0;
	let track;
	let trigger;
	const dirty = shallowRef(true);
	const update = () => {
		dirty.value = true;
		trigger();
	};
	watch(source, update, { flush: "sync" });
	const get = typeof fn === "function" ? fn : fn.get;
	const set = typeof fn === "function" ? void 0 : fn.set;
	const result = customRef((_track, _trigger) => {
		track = _track;
		trigger = _trigger;
		return {
			get() {
				if (dirty.value) {
					v = get(v);
					dirty.value = false;
				}
				track();
				return v;
			},
			set(v2) {
				set?.(v2);
			}
		};
	});
	if (Object.isExtensible(result)) result.trigger = update;
	return result;
}
function tryOnScopeDispose(fn) {
	if (getCurrentScope()) {
		onScopeDispose(fn);
		return true;
	}
	return false;
}
function createEventHook() {
	const fns = /* @__PURE__ */ new Set();
	const off = (fn) => {
		fns.delete(fn);
	};
	const clear = () => {
		fns.clear();
	};
	const on = (fn) => {
		fns.add(fn);
		const offFn = () => off(fn);
		tryOnScopeDispose(offFn);
		return { off: offFn };
	};
	const trigger = (...args) => {
		return Promise.all(Array.from(fns).map((fn) => fn(...args)));
	};
	return {
		on,
		off,
		trigger,
		clear
	};
}
function createGlobalState(stateFactory) {
	let initialized = false;
	let state;
	const scope = effectScope(true);
	return (...args) => {
		if (!initialized) {
			state = scope.run(() => stateFactory(...args));
			initialized = true;
		}
		return state;
	};
}
function createSharedComposable(composable) {
	let subscribers = 0;
	let state;
	let scope;
	const dispose = () => {
		subscribers -= 1;
		if (scope && subscribers <= 0) {
			scope.stop();
			state = void 0;
			scope = void 0;
		}
	};
	return (...args) => {
		subscribers += 1;
		if (!scope) {
			scope = effectScope(true);
			state = scope.run(() => composable(...args));
		}
		tryOnScopeDispose(dispose);
		return state;
	};
}
function toReactive(objectRef) {
	if (!isRef(objectRef)) return reactive(objectRef);
	const proxy = new Proxy({}, {
		get(_, p, receiver) {
			return unref(Reflect.get(objectRef.value, p, receiver));
		},
		set(_, p, value) {
			if (isRef(objectRef.value[p]) && !isRef(value)) objectRef.value[p].value = value;
			else objectRef.value[p] = value;
			return true;
		},
		deleteProperty(_, p) {
			return Reflect.deleteProperty(objectRef.value, p);
		},
		has(_, p) {
			return Reflect.has(objectRef.value, p);
		},
		ownKeys() {
			return Object.keys(objectRef.value);
		},
		getOwnPropertyDescriptor() {
			return {
				enumerable: true,
				configurable: true
			};
		}
	});
	return reactive(proxy);
}
function reactiveComputed(fn) {
	return toReactive(computed(fn));
}
function reactiveOmit(obj, ...keys) {
	const flatKeys = keys.flat();
	const predicate = flatKeys[0];
	return reactiveComputed(() => typeof predicate === "function" ? Object.fromEntries(Object.entries(toRefs(obj)).filter(([k, v]) => !predicate(toValue$1(v), k))) : Object.fromEntries(Object.entries(toRefs(obj)).filter((e) => !flatKeys.includes(e[0]))));
}
var isClient = typeof window !== "undefined" && typeof document !== "undefined";
typeof WorkerGlobalScope !== "undefined" && globalThis instanceof WorkerGlobalScope;
var isDef = (val) => typeof val !== "undefined";
var notNullish = (val) => val != null;
var toString = Object.prototype.toString;
var isObject = (val) => toString.call(val) === "[object Object]";
var noop = () => {};
var isIOS = /* @__PURE__ */ getIsIOS();
function getIsIOS() {
	var _a;
	var _b;
	return isClient && ((_a = window == null ? void 0 : window.navigator) == null ? void 0 : _a.userAgent) && (/iP(?:ad|hone|od)/.test(window.navigator.userAgent) || ((_b = window == null ? void 0 : window.navigator) == null ? void 0 : _b.maxTouchPoints) > 2 && /iPad|Macintosh/.test(window == null ? void 0 : window.navigator.userAgent));
}
function getLifeCycleTarget(target) {
	return target || getCurrentInstance();
}
function toArray(value) {
	return Array.isArray(value) ? value : [value];
}
function refAutoReset(defaultValue, afterMs = 1e4) {
	return customRef((track, trigger) => {
		let value = toValue$1(defaultValue);
		let timer;
		const resetAfter = () => setTimeout(() => {
			value = toValue$1(defaultValue);
			trigger();
		}, toValue$1(afterMs));
		tryOnScopeDispose(() => {
			clearTimeout(timer);
		});
		return {
			get() {
				track();
				return value;
			},
			set(newValue) {
				value = newValue;
				trigger();
				clearTimeout(timer);
				timer = resetAfter();
			}
		};
	});
}
function tryOnBeforeUnmount(fn, target) {
	if (getLifeCycleTarget(target)) onBeforeUnmount(fn, target);
}
function tryOnMounted(fn, sync = true, target) {
	if (getLifeCycleTarget()) onMounted(fn, target);
	else if (sync) fn();
	else nextTick(fn);
}
function useTimeoutFn(cb, interval, options = {}) {
	const { immediate = true, immediateCallback = false } = options;
	const isPending = shallowRef(false);
	let timer = null;
	function clear() {
		if (timer) {
			clearTimeout(timer);
			timer = null;
		}
	}
	function stop() {
		isPending.value = false;
		clear();
	}
	function start(...args) {
		if (immediateCallback) cb();
		clear();
		isPending.value = true;
		timer = setTimeout(() => {
			isPending.value = false;
			timer = null;
			cb(...args);
		}, toValue$1(interval));
	}
	if (immediate) {
		isPending.value = true;
		if (isClient) start();
	}
	tryOnScopeDispose(stop);
	return {
		isPending: readonly(isPending),
		start,
		stop
	};
}
function watchImmediate(source, cb, options) {
	return watch(source, cb, {
		...options,
		immediate: true
	});
}
//#endregion
//#region node_modules/.pnpm/@vueuse+core@12.8.2_typescript@6.0.3/node_modules/@vueuse/core/index.mjs
var defaultWindow = isClient ? window : void 0;
isClient && window.document;
isClient && window.navigator;
isClient && window.location;
function unrefElement(elRef) {
	var _a;
	const plain = toValue$1(elRef);
	return (_a = plain == null ? void 0 : plain.$el) != null ? _a : plain;
}
function useEventListener(...args) {
	const cleanups = [];
	const cleanup = () => {
		cleanups.forEach((fn) => fn());
		cleanups.length = 0;
	};
	const register = (el, event, listener, options) => {
		el.addEventListener(event, listener, options);
		return () => el.removeEventListener(event, listener, options);
	};
	const firstParamTargets = computed(() => {
		const test = toArray(toValue$1(args[0])).filter((e) => e != null);
		return test.every((e) => typeof e !== "string") ? test : void 0;
	});
	const stopWatch = watchImmediate(() => {
		var _a;
		var _b;
		return [
			(_b = (_a = firstParamTargets.value) == null ? void 0 : _a.map((e) => unrefElement(e))) != null ? _b : [defaultWindow].filter((e) => e != null),
			toArray(toValue$1(firstParamTargets.value ? args[1] : args[0])),
			toArray(unref(firstParamTargets.value ? args[2] : args[1])),
			toValue$1(firstParamTargets.value ? args[3] : args[2])
		];
	}, ([raw_targets, raw_events, raw_listeners, raw_options]) => {
		cleanup();
		if (!(raw_targets == null ? void 0 : raw_targets.length) || !(raw_events == null ? void 0 : raw_events.length) || !(raw_listeners == null ? void 0 : raw_listeners.length)) return;
		const optionsClone = isObject(raw_options) ? { ...raw_options } : raw_options;
		cleanups.push(...raw_targets.flatMap((el) => raw_events.flatMap((event) => raw_listeners.map((listener) => register(el, event, listener, optionsClone)))));
	}, { flush: "post" });
	const stop = () => {
		stopWatch();
		cleanup();
	};
	tryOnScopeDispose(cleanup);
	return stop;
}
function useMounted() {
	const isMounted = shallowRef(false);
	const instance = getCurrentInstance();
	if (instance) onMounted(() => {
		isMounted.value = true;
	}, instance);
	return isMounted;
}
function useSupported(callback) {
	const isMounted = useMounted();
	return computed(() => {
		isMounted.value;
		return Boolean(callback());
	});
}
function useMutationObserver(target, callback, options = {}) {
	const { window = defaultWindow, ...mutationOptions } = options;
	let observer;
	const isSupported = useSupported(() => window && "MutationObserver" in window);
	const cleanup = () => {
		if (observer) {
			observer.disconnect();
			observer = void 0;
		}
	};
	const targets = computed(() => {
		const items = toArray(toValue$1(target)).map(unrefElement).filter(notNullish);
		return new Set(items);
	});
	const stopWatch = watch(() => targets.value, (targets2) => {
		cleanup();
		if (isSupported.value && targets2.size) {
			observer = new MutationObserver(callback);
			targets2.forEach((el) => observer.observe(el, mutationOptions));
		}
	}, {
		immediate: true,
		flush: "post"
	});
	const takeRecords = () => {
		return observer == null ? void 0 : observer.takeRecords();
	};
	const stop = () => {
		stopWatch();
		cleanup();
	};
	tryOnScopeDispose(stop);
	return {
		isSupported,
		stop,
		takeRecords
	};
}
function onElementRemoval(target, callback, options = {}) {
	const { window = defaultWindow, document = window == null ? void 0 : window.document, flush = "sync" } = options;
	if (!window || !document) return noop;
	let stopFn;
	const cleanupAndUpdate = (fn) => {
		stopFn?.();
		stopFn = fn;
	};
	const stopWatch = watchEffect(() => {
		const el = unrefElement(target);
		if (el) {
			const { stop } = useMutationObserver(document, (mutationsList) => {
				if (mutationsList.map((mutation) => [...mutation.removedNodes]).flat().some((node) => node === el || node.contains(el))) callback(mutationsList);
			}, {
				window,
				childList: true,
				subtree: true
			});
			cleanupAndUpdate(stop);
		}
	}, { flush });
	const stopHandle = () => {
		stopWatch();
		cleanupAndUpdate();
	};
	tryOnScopeDispose(stopHandle);
	return stopHandle;
}
function createKeyPredicate(keyFilter) {
	if (typeof keyFilter === "function") return keyFilter;
	else if (typeof keyFilter === "string") return (event) => event.key === keyFilter;
	else if (Array.isArray(keyFilter)) return (event) => keyFilter.includes(event.key);
	return () => true;
}
function onKeyStroke(...args) {
	let key;
	let handler;
	let options = {};
	if (args.length === 3) {
		key = args[0];
		handler = args[1];
		options = args[2];
	} else if (args.length === 2) {
		if (typeof args[1] === "object") {
			key = true;
			handler = args[0];
			options = args[1];
		} else {
			key = args[0];
			handler = args[1];
		}
	} else {
		key = true;
		handler = args[0];
	}
	const { target = defaultWindow, eventName = "keydown", passive = false, dedupe = false } = options;
	const predicate = createKeyPredicate(key);
	const listener = (e) => {
		if (e.repeat && toValue$1(dedupe)) return;
		if (predicate(e)) handler(e);
	};
	return useEventListener(target, eventName, listener, passive);
}
function useActiveElement(options = {}) {
	var _a;
	const { window = defaultWindow, deep = true, triggerOnRemoval = false } = options;
	const document = (_a = options.document) != null ? _a : window == null ? void 0 : window.document;
	const getDeepActiveElement = () => {
		var _a2;
		let element = document == null ? void 0 : document.activeElement;
		if (deep) while (element == null ? void 0 : element.shadowRoot) element = (_a2 = element == null ? void 0 : element.shadowRoot) == null ? void 0 : _a2.activeElement;
		return element;
	};
	const activeElement = shallowRef();
	const trigger = () => {
		activeElement.value = getDeepActiveElement();
	};
	if (window) {
		const listenerOptions = {
			capture: true,
			passive: true
		};
		useEventListener(window, "blur", (event) => {
			if (event.relatedTarget !== null) return;
			trigger();
		}, listenerOptions);
		useEventListener(window, "focus", trigger, listenerOptions);
	}
	if (triggerOnRemoval) onElementRemoval(activeElement, trigger, { document });
	trigger();
	return activeElement;
}
function cloneFnJSON(source) {
	return JSON.parse(JSON.stringify(source));
}
function useCurrentElement(rootComponent) {
	const vm = getCurrentInstance();
	const currentElement = computedWithControl(() => null, () => rootComponent ? unrefElement(rootComponent) : vm.proxy.$el);
	onUpdated(currentElement.trigger);
	onMounted(currentElement.trigger);
	return currentElement;
}
function useResizeObserver(target, callback, options = {}) {
	const { window = defaultWindow, ...observerOptions } = options;
	let observer;
	const isSupported = useSupported(() => window && "ResizeObserver" in window);
	const cleanup = () => {
		if (observer) {
			observer.disconnect();
			observer = void 0;
		}
	};
	const targets = computed(() => {
		const _targets = toValue$1(target);
		return Array.isArray(_targets) ? _targets.map((el) => unrefElement(el)) : [unrefElement(_targets)];
	});
	const stopWatch = watch(targets, (els) => {
		cleanup();
		if (isSupported.value && window) {
			observer = new ResizeObserver(callback);
			for (const _el of els) if (_el) observer.observe(_el, observerOptions);
		}
	}, {
		immediate: true,
		flush: "post"
	});
	const stop = () => {
		cleanup();
		stopWatch();
	};
	tryOnScopeDispose(stop);
	return {
		isSupported,
		stop
	};
}
var EVENT_FOCUS_IN = "focusin";
var EVENT_FOCUS_OUT = "focusout";
var PSEUDO_CLASS_FOCUS_WITHIN = ":focus-within";
function useFocusWithin(target, options = {}) {
	const { window = defaultWindow } = options;
	const targetElement = computed(() => unrefElement(target));
	const _focused = shallowRef(false);
	const focused = computed(() => _focused.value);
	const activeElement = useActiveElement(options);
	if (!window || !activeElement.value) return { focused };
	const listenerOptions = { passive: true };
	useEventListener(targetElement, EVENT_FOCUS_IN, () => _focused.value = true, listenerOptions);
	useEventListener(targetElement, EVENT_FOCUS_OUT, () => {
		var _a;
		var _b;
		var _c;
		return _focused.value = (_c = (_b = (_a = targetElement.value) == null ? void 0 : _a.matches) == null ? void 0 : _b.call(_a, PSEUDO_CLASS_FOCUS_WITHIN)) != null ? _c : false;
	}, listenerOptions);
	return { focused };
}
function useParentElement(element = useCurrentElement()) {
	const parentElement = shallowRef();
	const update = () => {
		const el = unrefElement(element);
		if (el) parentElement.value = el.parentElement;
	};
	tryOnMounted(update);
	watch(() => toValue$1(element), update);
	return parentElement;
}
Number.POSITIVE_INFINITY;
function useVModel(props, key, emit, options = {}) {
	var _a;
	var _b;
	var _c;
	const { clone = false, passive = false, eventName, deep = false, defaultValue, shouldEmit } = options;
	const vm = getCurrentInstance();
	const _emit = emit || (vm == null ? void 0 : vm.emit) || ((_a = vm == null ? void 0 : vm.$emit) == null ? void 0 : _a.bind(vm)) || ((_c = (_b = vm == null ? void 0 : vm.proxy) == null ? void 0 : _b.$emit) == null ? void 0 : _c.bind(vm == null ? void 0 : vm.proxy));
	let event = eventName;
	if (!key) key = "modelValue";
	event = event || `update:${key.toString()}`;
	const cloneFn = (val) => !clone ? val : typeof clone === "function" ? clone(val) : cloneFnJSON(val);
	const getValue = () => isDef(props[key]) ? cloneFn(props[key]) : defaultValue;
	const triggerEmit = (value) => {
		if (shouldEmit) {
			if (shouldEmit(value)) _emit(event, value);
		} else _emit(event, value);
	};
	if (passive) {
		const initialValue = getValue();
		const proxy = ref(initialValue);
		let isUpdating = false;
		watch(() => props[key], (v) => {
			if (!isUpdating) {
				isUpdating = true;
				proxy.value = cloneFn(v);
				nextTick(() => isUpdating = false);
			}
		});
		watch(proxy, (v) => {
			if (!isUpdating && (v !== props[key] || deep)) triggerEmit(v);
		}, { deep });
		return proxy;
	} else return computed({
		get() {
			return getValue();
		},
		set(value) {
			triggerEmit(value);
		}
	});
}
//#endregion
//#region node_modules/.pnpm/defu@6.1.7/node_modules/defu/dist/defu.mjs
function isPlainObject(value) {
	if (value === null || typeof value !== "object") return false;
	const prototype = Object.getPrototypeOf(value);
	if (prototype !== null && prototype !== Object.prototype && Object.getPrototypeOf(prototype) !== null) return false;
	if (Symbol.iterator in value) return false;
	if (Symbol.toStringTag in value) return Object.prototype.toString.call(value) === "[object Module]";
	return true;
}
function _defu(baseObject, defaults, namespace = ".", merger) {
	if (!isPlainObject(defaults)) return _defu(baseObject, {}, namespace, merger);
	const object = { ...defaults };
	for (const key of Object.keys(baseObject)) {
		if (key === "__proto__" || key === "constructor") continue;
		const value = baseObject[key];
		if (value === null || value === void 0) continue;
		if (merger && merger(object, key, value, namespace)) continue;
		if (Array.isArray(value) && Array.isArray(object[key])) object[key] = [...value, ...object[key]];
		else if (isPlainObject(value) && isPlainObject(object[key])) object[key] = _defu(value, object[key], (namespace ? `${namespace}.` : "") + key.toString(), merger);
		else object[key] = value;
	}
	return object;
}
function createDefu(merger) {
	return (...arguments_) => arguments_.reduce((p, c) => _defu(p, c, "", merger), {});
}
var defu = createDefu();
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/shared/useBodyScrollLock.js
var useBodyLockStackCount = createSharedComposable(() => {
	const map = ref(/* @__PURE__ */ new Map());
	const initialOverflow = ref();
	const locked = computed(() => {
		for (const value of map.value.values()) if (value) return true;
		return false;
	});
	const context = injectConfigProviderContext({ scrollBody: ref(true) });
	let stopTouchMoveListener = null;
	const resetBodyStyle = () => {
		document.body.style.paddingRight = "";
		document.body.style.marginRight = "";
		document.body.style.pointerEvents = "";
		document.documentElement.style.removeProperty("--scrollbar-width");
		document.body.style.overflow = initialOverflow.value ?? "";
		isIOS && stopTouchMoveListener?.();
		initialOverflow.value = void 0;
	};
	watch(locked, (val, oldVal) => {
		if (!isClient) return;
		if (!val) {
			if (oldVal) resetBodyStyle();
			return;
		}
		if (initialOverflow.value === void 0) initialOverflow.value = document.body.style.overflow;
		const verticalScrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
		const defaultConfig = {
			padding: verticalScrollbarWidth,
			margin: 0
		};
		const config = context.scrollBody?.value ? typeof context.scrollBody.value === "object" ? defu({
			padding: context.scrollBody.value.padding === true ? verticalScrollbarWidth : context.scrollBody.value.padding,
			margin: context.scrollBody.value.margin === true ? verticalScrollbarWidth : context.scrollBody.value.margin
		}, defaultConfig) : defaultConfig : {
			padding: 0,
			margin: 0
		};
		if (verticalScrollbarWidth > 0) {
			document.body.style.paddingRight = typeof config.padding === "number" ? `${config.padding}px` : String(config.padding);
			document.body.style.marginRight = typeof config.margin === "number" ? `${config.margin}px` : String(config.margin);
			document.documentElement.style.setProperty("--scrollbar-width", `${verticalScrollbarWidth}px`);
			document.body.style.overflow = "hidden";
		}
		if (isIOS) stopTouchMoveListener = useEventListener(document, "touchmove", (e) => preventDefault(e), { passive: false });
		nextTick(() => {
			document.body.style.pointerEvents = "none";
			document.body.style.overflow = "hidden";
		});
	}, {
		immediate: true,
		flush: "sync"
	});
	return map;
});
function useBodyScrollLock(initialState) {
	const id = Math.random().toString(36).substring(2, 7);
	const map = useBodyLockStackCount();
	map.value.set(id, initialState ?? false);
	const locked = computed({
		get: () => map.value.get(id) ?? false,
		set: (value) => map.value.set(id, value)
	});
	tryOnBeforeUnmount(() => {
		map.value.delete(id);
	});
	return locked;
}
function checkOverflowScroll(ele) {
	const style = window.getComputedStyle(ele);
	if (style.overflowX === "scroll" || style.overflowY === "scroll" || style.overflowX === "auto" && ele.clientWidth < ele.scrollWidth || style.overflowY === "auto" && ele.clientHeight < ele.scrollHeight) return true;
	else {
		const parent = ele.parentNode;
		if (!(parent instanceof Element) || parent.tagName === "BODY") return false;
		return checkOverflowScroll(parent);
	}
}
function preventDefault(rawEvent) {
	const e = rawEvent || window.event;
	const _target = e.target;
	if (_target instanceof Element && checkOverflowScroll(_target)) return false;
	if (e.touches.length > 1) return true;
	if (e.preventDefault && e.cancelable) e.preventDefault();
	return false;
}
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/shared/useDirection.js
/**
* The `useDirection` function provides a way to access the current direction in your application.
* @param {Ref<Direction | undefined>} [dir] - An optional ref containing the direction (ltr or rtl).
* @returns  computed value that combines with the resolved direction.
*/
function useDirection(dir) {
	const context = injectConfigProviderContext({ dir: ref("ltr") });
	return computed(() => dir?.value || context.dir?.value || "ltr");
}
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/shared/useEmitAsProps.js
/**
* The `useEmitAsProps` function is a TypeScript utility that converts emitted events into props for a
* Vue component.
* @param emit - The `emit` parameter is a function that is used to emit events from a component. It
* takes two parameters: `name` which is the name of the event to be emitted, and `...args` which are
* the arguments to be passed along with the event.
* @returns The function `useEmitAsProps` returns an object that maps event names to functions that
* call the `emit` function with the corresponding event name and arguments.
*/
function useEmitAsProps(emit) {
	const vm = getCurrentInstance();
	const events = vm?.type.emits;
	const result = {};
	if (!events?.length) console.warn(`No emitted event found. Please check component: ${vm?.type.__name}`);
	events?.forEach((ev) => {
		result[toHandlerKey(camelize$1(ev))] = (...arg) => emit(ev, ...arg);
	});
	return result;
}
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/shared/useFilter.js
/**
* Provides locale-aware string filtering functions.
* Uses `Intl.Collator` for comparison to ensure proper Unicode handling.
*
* @param options - Optional collator options to customize comparison behavior.
*   See [Intl.CollatorOptions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Collator/Collator#options) for details.
* @returns An object with methods to check if a string starts with, ends with, or contains a substring.
*
* @example
* const { startsWith, endsWith, contains } = useFilter();
*
* startsWith('hello', 'he'); // true
* endsWith('hello', 'lo'); // true
* contains('hello', 'ell'); // true
*/
function useFilter(options) {
	const computedOptions = computed(() => unref(options));
	const collator = computed(() => new Intl.Collator("en", {
		usage: "search",
		...computedOptions.value
	}));
	const startsWith = (string, substring) => {
		if (substring.length === 0) return true;
		string = string.normalize("NFC");
		substring = substring.normalize("NFC");
		return collator.value.compare(string.slice(0, substring.length), substring) === 0;
	};
	const endsWith = (string, substring) => {
		if (substring.length === 0) return true;
		string = string.normalize("NFC");
		substring = substring.normalize("NFC");
		return collator.value.compare(string.slice(-substring.length), substring) === 0;
	};
	const contains = (string, substring) => {
		if (substring.length === 0) return true;
		string = string.normalize("NFC");
		substring = substring.normalize("NFC");
		let scan = 0;
		const sliceLen = substring.length;
		for (; scan + sliceLen <= string.length; scan++) {
			const slice = string.slice(scan, scan + sliceLen);
			if (collator.value.compare(substring, slice) === 0) return true;
		}
		return false;
	};
	return {
		startsWith,
		endsWith,
		contains
	};
}
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/shared/useFocusGuards.js
/** Number of components which have requested interest to have focus guards */
var count$1 = 0;
/**
* Injects a pair of focus guards at the edges of the whole DOM tree
* to ensure `focusin` & `focusout` events can be caught consistently.
*/
function useFocusGuards() {
	watchEffect((cleanupFn) => {
		if (!isClient) return;
		const edgeGuards = document.querySelectorAll("[data-reka-focus-guard]");
		document.body.insertAdjacentElement("afterbegin", edgeGuards[0] ?? createFocusGuard());
		document.body.insertAdjacentElement("beforeend", edgeGuards[1] ?? createFocusGuard());
		count$1++;
		cleanupFn(() => {
			if (count$1 === 1) document.querySelectorAll("[data-reka-focus-guard]").forEach((node) => node.remove());
			count$1--;
		});
	});
}
function createFocusGuard() {
	const element = document.createElement("span");
	element.setAttribute("data-reka-focus-guard", "");
	element.tabIndex = 0;
	element.style.outline = "none";
	element.style.opacity = "0";
	element.style.position = "fixed";
	element.style.pointerEvents = "none";
	return element;
}
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/shared/useFormControl.js
function useFormControl(el) {
	return computed(() => toValue$1(el) ? Boolean(unrefElement(el)?.closest("form")) : true);
}
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/shared/useForwardExpose.js
function useForwardExpose() {
	const instance = getCurrentInstance();
	const currentRef = ref();
	const currentElement = computed(() => {
		return ["#text", "#comment"].includes(currentRef.value?.$el.nodeName) ? currentRef.value?.$el.nextElementSibling : unrefElement(currentRef);
	});
	const localExpose = Object.assign({}, instance.exposed);
	const ret = {};
	for (const key in instance.props) Object.defineProperty(ret, key, {
		enumerable: true,
		configurable: true,
		get: () => instance.props[key]
	});
	if (Object.keys(localExpose).length > 0) for (const key in localExpose) Object.defineProperty(ret, key, {
		enumerable: true,
		configurable: true,
		get: () => localExpose[key]
	});
	Object.defineProperty(ret, "$el", {
		enumerable: true,
		configurable: true,
		get: () => instance.vnode.el
	});
	instance.exposed = ret;
	function forwardRef(ref$1) {
		currentRef.value = ref$1;
		if (!ref$1) return;
		Object.defineProperty(ret, "$el", {
			enumerable: true,
			configurable: true,
			get: () => ref$1 instanceof Element ? ref$1 : ref$1.$el
		});
		if (!(ref$1 instanceof Element) && !Object.hasOwn(ref$1, "$el")) {
			const childExposed = ref$1.$.exposed;
			const merged = Object.assign({}, ret);
			for (const key in childExposed) Object.defineProperty(merged, key, {
				enumerable: true,
				configurable: true,
				get: () => childExposed[key]
			});
			instance.exposed = merged;
		}
	}
	return {
		forwardRef,
		currentRef,
		currentElement
	};
}
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/shared/useForwardProps.js
/**
* The `useForwardProps` function in TypeScript takes in a set of props and returns a computed value
* that combines default props with assigned props from the current instance.
* @param {T} props - The `props` parameter is an object that represents the props passed to a
* component.
* @returns computed value that combines the default props, preserved props, and assigned props.
*/
function useForwardProps(props) {
	const vm = getCurrentInstance();
	const defaultProps = Object.keys(vm?.type.props ?? {}).reduce((prev, curr) => {
		const defaultValue = (vm?.type.props[curr]).default;
		if (defaultValue !== void 0) prev[curr] = defaultValue;
		return prev;
	}, {});
	const refProps = toRef(props);
	return computed(() => {
		const preservedProps = {};
		const assignedProps = vm?.vnode.props ?? {};
		Object.keys(assignedProps).forEach((key) => {
			preservedProps[camelize$1(key)] = assignedProps[key];
		});
		return Object.keys({
			...defaultProps,
			...preservedProps
		}).reduce((prev, curr) => {
			if (refProps.value[curr] !== void 0) prev[curr] = refProps.value[curr];
			return prev;
		}, {});
	});
}
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/shared/useForwardPropsEmits.js
/**
* The function `useForwardPropsEmits` takes in props and an optional emit function, and returns a
* computed object that combines the parsed props and emits as props.
* @param {T} props - The `props` parameter is of type `T`, which is a generic type that extends the
* parameters of the `useForwardProps` function. It represents the props object that is passed to the
* `useForwardProps` function.
* @param [emit] - The `emit` parameter is a function that can be used to emit events. It takes two
* arguments: `name`, which is the name of the event to be emitted, and `args`, which are the arguments
* to be passed along with the event.
* @returns a computed property that combines the parsed
* props and emits as props.
*/
function useForwardPropsEmits(props, emit) {
	const parsedProps = useForwardProps(props);
	const emitsAsProps = emit ? useEmitAsProps(emit) : {};
	return computed(() => ({
		...parsedProps.value,
		...emitsAsProps
	}));
}
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/shared/useGraceArea.js
function useGraceArea(triggerElement, containerElement) {
	const isPointerInTransit = refAutoReset(false, 300);
	tryOnScopeDispose(() => {
		isPointerInTransit.value = false;
	});
	const pointerGraceArea = ref(null);
	const pointerExit = createEventHook();
	function handleRemoveGraceArea() {
		pointerGraceArea.value = null;
		isPointerInTransit.value = false;
	}
	function handleCreateGraceArea(event, hoverTarget) {
		const currentTarget = event.currentTarget;
		const exitPoint = {
			x: event.clientX,
			y: event.clientY
		};
		const paddedExitPoints = getPaddedExitPoints(exitPoint, getExitSideFromRect(exitPoint, currentTarget.getBoundingClientRect()));
		const hoverTargetPoints = getPointsFromRect(hoverTarget.getBoundingClientRect());
		const graceArea = getHull([...paddedExitPoints, ...hoverTargetPoints]);
		pointerGraceArea.value = graceArea;
		isPointerInTransit.value = true;
	}
	watchEffect((cleanupFn) => {
		if (triggerElement.value && containerElement.value) {
			const handleTriggerLeave = (event) => handleCreateGraceArea(event, containerElement.value);
			const handleContentLeave = (event) => handleCreateGraceArea(event, triggerElement.value);
			triggerElement.value.addEventListener("pointerleave", handleTriggerLeave);
			containerElement.value.addEventListener("pointerleave", handleContentLeave);
			cleanupFn(() => {
				triggerElement.value?.removeEventListener("pointerleave", handleTriggerLeave);
				containerElement.value?.removeEventListener("pointerleave", handleContentLeave);
			});
		}
	});
	watchEffect((cleanupFn) => {
		if (pointerGraceArea.value) {
			const handleTrackPointerGrace = (event) => {
				if (!pointerGraceArea.value || !(event.target instanceof Element)) return;
				const target = event.target;
				const pointerPosition = {
					x: event.clientX,
					y: event.clientY
				};
				const hasEnteredTarget = triggerElement.value?.contains(target) || containerElement.value?.contains(target);
				const isPointerOutsideGraceArea = !isPointInPolygon$1(pointerPosition, pointerGraceArea.value);
				const isAnotherGraceAreaTrigger = !!target.closest("[data-grace-area-trigger]");
				if (hasEnteredTarget) handleRemoveGraceArea();
				else if (isPointerOutsideGraceArea || isAnotherGraceAreaTrigger) {
					handleRemoveGraceArea();
					pointerExit.trigger();
				}
			};
			triggerElement.value?.ownerDocument.addEventListener("pointermove", handleTrackPointerGrace);
			cleanupFn(() => triggerElement.value?.ownerDocument.removeEventListener("pointermove", handleTrackPointerGrace));
		}
	});
	return {
		isPointerInTransit,
		onPointerExit: pointerExit.on
	};
}
function getExitSideFromRect(point, rect) {
	const top = Math.abs(rect.top - point.y);
	const bottom = Math.abs(rect.bottom - point.y);
	const right = Math.abs(rect.right - point.x);
	const left = Math.abs(rect.left - point.x);
	switch (Math.min(top, bottom, right, left)) {
		case left: return "left";
		case right: return "right";
		case top: return "top";
		case bottom: return "bottom";
		default: throw new Error("unreachable");
	}
}
function getPaddedExitPoints(exitPoint, exitSide, padding = 5) {
	const paddedExitPoints = [];
	switch (exitSide) {
		case "top":
			paddedExitPoints.push({
				x: exitPoint.x - padding,
				y: exitPoint.y + padding
			}, {
				x: exitPoint.x + padding,
				y: exitPoint.y + padding
			});
			break;
		case "bottom":
			paddedExitPoints.push({
				x: exitPoint.x - padding,
				y: exitPoint.y - padding
			}, {
				x: exitPoint.x + padding,
				y: exitPoint.y - padding
			});
			break;
		case "left":
			paddedExitPoints.push({
				x: exitPoint.x + padding,
				y: exitPoint.y - padding
			}, {
				x: exitPoint.x + padding,
				y: exitPoint.y + padding
			});
			break;
		case "right": paddedExitPoints.push({
			x: exitPoint.x - padding,
			y: exitPoint.y - padding
		}, {
			x: exitPoint.x - padding,
			y: exitPoint.y + padding
		});
	}
	return paddedExitPoints;
}
function getPointsFromRect(rect) {
	const { top, right, bottom, left } = rect;
	return [
		{
			x: left,
			y: top
		},
		{
			x: right,
			y: top
		},
		{
			x: right,
			y: bottom
		},
		{
			x: left,
			y: bottom
		}
	];
}
function isPointInPolygon$1(point, polygon) {
	const { x, y } = point;
	let inside = false;
	for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
		const xi = polygon[i].x;
		const yi = polygon[i].y;
		const xj = polygon[j].x;
		const yj = polygon[j].y;
		if (yi > y !== yj > y && x < (xj - xi) * (y - yi) / (yj - yi) + xi) inside = !inside;
	}
	return inside;
}
__name(isPointInPolygon$1, "isPointInPolygon");
function getHull(points) {
	const newPoints = points.slice();
	newPoints.sort((a, b) => {
		if (a.x < b.x) return -1;
		else if (a.x > b.x) return 1;
		else if (a.y < b.y) return -1;
		else if (a.y > b.y) return 1;
		else return 0;
	});
	return getHullPresorted(newPoints);
}
function getHullPresorted(points) {
	if (points.length <= 1) return points.slice();
	const upperHull = [];
	for (let i = 0; i < points.length; i++) {
		const p = points[i];
		while (upperHull.length >= 2) {
			const q = upperHull[upperHull.length - 1];
			const r = upperHull[upperHull.length - 2];
			if ((q.x - r.x) * (p.y - r.y) >= (q.y - r.y) * (p.x - r.x)) upperHull.pop();
			else break;
		}
		upperHull.push(p);
	}
	upperHull.pop();
	const lowerHull = [];
	for (let i = points.length - 1; i >= 0; i--) {
		const p = points[i];
		while (lowerHull.length >= 2) {
			const q = lowerHull[lowerHull.length - 1];
			const r = lowerHull[lowerHull.length - 2];
			if ((q.x - r.x) * (p.y - r.y) >= (q.y - r.y) * (p.x - r.x)) lowerHull.pop();
			else break;
		}
		lowerHull.push(p);
	}
	lowerHull.pop();
	if (upperHull.length === 1 && lowerHull.length === 1 && upperHull[0].x === lowerHull[0].x && upperHull[0].y === lowerHull[0].y) return upperHull;
	else return upperHull.concat(lowerHull);
}
//#endregion
//#region node_modules/.pnpm/aria-hidden@1.2.6/node_modules/aria-hidden/dist/es2015/index.js
var getDefaultParent = function(originalTarget) {
	if (typeof document === "undefined") return null;
	return (Array.isArray(originalTarget) ? originalTarget[0] : originalTarget).ownerDocument.body;
};
var counterMap = /* @__PURE__ */ new WeakMap();
var uncontrolledNodes = /* @__PURE__ */ new WeakMap();
var markerMap = {};
var lockCount = 0;
var unwrapHost = function(node) {
	return node && (node.host || unwrapHost(node.parentNode));
};
var correctTargets = function(parent, targets) {
	return targets.map(function(target) {
		if (parent.contains(target)) return target;
		var correctedTarget = unwrapHost(target);
		if (correctedTarget && parent.contains(correctedTarget)) return correctedTarget;
		console.error("aria-hidden", target, "in not contained inside", parent, ". Doing nothing");
		return null;
	}).filter(function(x) {
		return Boolean(x);
	});
};
/**
* Marks everything except given node(or nodes) as aria-hidden
* @param {Element | Element[]} originalTarget - elements to keep on the page
* @param [parentNode] - top element, defaults to document.body
* @param {String} [markerName] - a special attribute to mark every node
* @param {String} [controlAttribute] - html Attribute to control
* @return {Undo} undo command
*/
var applyAttributeToOthers = function(originalTarget, parentNode, markerName, controlAttribute) {
	var targets = correctTargets(parentNode, Array.isArray(originalTarget) ? originalTarget : [originalTarget]);
	if (!markerMap[markerName]) markerMap[markerName] = /* @__PURE__ */ new WeakMap();
	var markerCounter = markerMap[markerName];
	var hiddenNodes = [];
	var elementsToKeep = /* @__PURE__ */ new Set();
	var elementsToStop = new Set(targets);
	var keep = function(el) {
		if (!el || elementsToKeep.has(el)) return;
		elementsToKeep.add(el);
		keep(el.parentNode);
	};
	targets.forEach(keep);
	var deep = function(parent) {
		if (!parent || elementsToStop.has(parent)) return;
		Array.prototype.forEach.call(parent.children, function(node) {
			if (elementsToKeep.has(node)) deep(node);
			else try {
				var attr = node.getAttribute(controlAttribute);
				var alreadyHidden = attr !== null && attr !== "false";
				var counterValue = (counterMap.get(node) || 0) + 1;
				var markerValue = (markerCounter.get(node) || 0) + 1;
				counterMap.set(node, counterValue);
				markerCounter.set(node, markerValue);
				hiddenNodes.push(node);
				if (counterValue === 1 && alreadyHidden) uncontrolledNodes.set(node, true);
				if (markerValue === 1) node.setAttribute(markerName, "true");
				if (!alreadyHidden) node.setAttribute(controlAttribute, "true");
			} catch (e) {
				console.error("aria-hidden: cannot operate on ", node, e);
			}
		});
	};
	deep(parentNode);
	elementsToKeep.clear();
	lockCount++;
	return function() {
		hiddenNodes.forEach(function(node) {
			var counterValue = counterMap.get(node) - 1;
			var markerValue = markerCounter.get(node) - 1;
			counterMap.set(node, counterValue);
			markerCounter.set(node, markerValue);
			if (!counterValue) {
				if (!uncontrolledNodes.has(node)) node.removeAttribute(controlAttribute);
				uncontrolledNodes.delete(node);
			}
			if (!markerValue) node.removeAttribute(markerName);
		});
		lockCount--;
		if (!lockCount) {
			counterMap = /* @__PURE__ */ new WeakMap();
			counterMap = /* @__PURE__ */ new WeakMap();
			uncontrolledNodes = /* @__PURE__ */ new WeakMap();
			markerMap = {};
		}
	};
};
/**
* Marks everything except given node(or nodes) as aria-hidden
* @param {Element | Element[]} originalTarget - elements to keep on the page
* @param [parentNode] - top element, defaults to document.body
* @param {String} [markerName] - a special attribute to mark every node
* @return {Undo} undo command
*/
var hideOthers = function(originalTarget, parentNode, markerName) {
	if (markerName === void 0) markerName = "data-aria-hidden";
	var targets = Array.from(Array.isArray(originalTarget) ? originalTarget : [originalTarget]);
	var activeParentNode = parentNode || getDefaultParent(originalTarget);
	if (!activeParentNode) return function() {
		return null;
	};
	targets.push.apply(targets, Array.from(activeParentNode.querySelectorAll("[aria-live], script")));
	return applyAttributeToOthers(targets, activeParentNode, markerName, "aria-hidden");
};
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/shared/useHideOthers.js
/**
* The `useHideOthers` function is a TypeScript function that takes a target element reference and
* hides all other elements in ARIA when the target element is present, and restores the visibility of the
* hidden elements when the target element is removed.
* @param {MaybeElementRef} target - The `target` parameter is a reference to the element that you want
* to hide other elements when it is clicked or focused.
*/
function useHideOthers(target) {
	let undo;
	watch(() => unrefElement(target), (el) => {
		if (el) undo = hideOthers(el);
		else if (undo) undo();
	});
	onUnmounted(() => {
		if (undo) undo();
	});
}
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/shared/useId.js
var count = 0;
/**
* The `useId` function generates a unique identifier using a provided deterministic ID or a default
* one prefixed with "reka-", or the provided one via `useId` props from `<ConfigProvider>`.
* @param {string | null | undefined} [deterministicId] - The `useId` function you provided takes an
* optional parameter `deterministicId`, which can be a string, null, or undefined. If
* `deterministicId` is provided, the function will return it. Otherwise, it will generate an id using
* the `useId` function obtained
*/
function useId(deterministicId, prefix = "reka") {
	if (deterministicId) return deterministicId;
	if ("useId" in vue_runtime_esm_bundler_exports) return `${prefix}-${useId$1?.()}`;
	const configProviderContext = injectConfigProviderContext({ useId: void 0 });
	if (configProviderContext.useId) return `${prefix}-${configProviderContext.useId()}`;
	return `${prefix}-${++count}`;
}
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/shared/useKbd.js
function useKbd() {
	return {
		ALT: "Alt",
		ARROW_DOWN: "ArrowDown",
		ARROW_LEFT: "ArrowLeft",
		ARROW_RIGHT: "ArrowRight",
		ARROW_UP: "ArrowUp",
		BACKSPACE: "Backspace",
		CAPS_LOCK: "CapsLock",
		CONTROL: "Control",
		DELETE: "Delete",
		END: "End",
		ENTER: "Enter",
		ESCAPE: "Escape",
		F1: "F1",
		F10: "F10",
		F11: "F11",
		F12: "F12",
		F2: "F2",
		F3: "F3",
		F4: "F4",
		F5: "F5",
		F6: "F6",
		F7: "F7",
		F8: "F8",
		F9: "F9",
		HOME: "Home",
		META: "Meta",
		PAGE_DOWN: "PageDown",
		PAGE_UP: "PageUp",
		SHIFT: "Shift",
		SPACE: " ",
		TAB: "Tab",
		CTRL: "Control",
		ASTERISK: "*",
		SPACE_CODE: "Space"
	};
}
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/shared/useLocale.js
/**
* The `useLocale` function provides a way to access the current locale in your application.
* @param {Ref<string | undefined>} [locale] - An optional ref containing the locale.
* @returns A computed ref holding the resolved locale.
*/
function useLocale(locale) {
	const context = injectConfigProviderContext({ locale: ref("en") });
	return computed(() => locale?.value || context.locale?.value || "en");
}
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/shared/useSelectionBehavior.js
function useSelectionBehavior(modelValue, props) {
	const firstValue = ref();
	const onSelectItem = (val, condition) => {
		if (props.multiple && Array.isArray(modelValue.value)) if (props.selectionBehavior === "replace") {
			modelValue.value = [val];
			firstValue.value = val;
		} else {
			const index = modelValue.value.findIndex((v) => condition(v));
			if (index !== -1) modelValue.value = modelValue.value.filter((_, i) => i !== index);
			else modelValue.value = [...modelValue.value, val];
		}
		else if (props.selectionBehavior === "replace") modelValue.value = { ...val };
		else if (!Array.isArray(modelValue.value) && condition(modelValue.value)) modelValue.value = void 0;
		else modelValue.value = { ...val };
		return modelValue.value;
	};
	function handleMultipleReplace(intent, currentElement, getItems, options) {
		if (!firstValue?.value || !props.multiple || !Array.isArray(modelValue.value)) return;
		const lastValue = getItems().filter((i) => i.ref.dataset.disabled !== "").find((i) => i.ref === currentElement)?.value;
		if (!lastValue) return;
		let value = null;
		switch (intent) {
			case "prev":
			case "next":
				value = findValuesBetween(options, firstValue.value, lastValue);
				break;
			case "first":
				value = findValuesBetween(options, firstValue.value, options?.[0]);
				break;
			case "last": value = findValuesBetween(options, firstValue.value, options?.[options.length - 1]);
		}
		modelValue.value = value;
	}
	return {
		firstValue,
		onSelectItem,
		handleMultipleReplace
	};
}
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/shared/useSize.js
function useSize(element) {
	const size = ref();
	const width = computed(() => size.value?.width ?? 0);
	const height = computed(() => size.value?.height ?? 0);
	onMounted(() => {
		const el = unrefElement(element);
		if (el) {
			size.value = {
				width: el.offsetWidth,
				height: el.offsetHeight
			};
			const resizeObserver = new ResizeObserver((entries) => {
				if (!Array.isArray(entries)) return;
				if (!entries.length) return;
				const entry = entries[0];
				let width$1;
				let height$1;
				if ("borderBoxSize" in entry) {
					const borderSizeEntry = entry.borderBoxSize;
					const borderSize = Array.isArray(borderSizeEntry) ? borderSizeEntry[0] : borderSizeEntry;
					width$1 = borderSize.inlineSize;
					height$1 = borderSize.blockSize;
				} else {
					width$1 = el.offsetWidth;
					height$1 = el.offsetHeight;
				}
				size.value = {
					width: width$1,
					height: height$1
				};
			});
			resizeObserver.observe(el, { box: "border-box" });
			return () => resizeObserver.unobserve(el);
		} else size.value = void 0;
	});
	return {
		width,
		height
	};
}
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/shared/useStateMachine.js
/**
* The `useStateMachine` function is a TypeScript function that creates a state machine and returns the
* current state and a dispatch function to update the state based on events.
* @param initialState - The `initialState` parameter is the initial state of the state machine. It
* represents the starting point of the state machine's state.
* @param machine - The `machine` parameter is an object that represents a state machine. It should
* have keys that correspond to the possible states of the machine, and the values should be objects
* that represent the possible events and their corresponding next states.
* @returns The `useStateMachine` function returns an object with two properties: `state` and
* `dispatch`.
*/
function useStateMachine(initialState, machine) {
	const state = ref(initialState);
	function reducer(event) {
		return machine[state.value][event] ?? state.value;
	}
	const dispatch = (event) => {
		state.value = reducer(event);
	};
	return {
		state,
		dispatch
	};
}
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/shared/useTypeahead.js
function useTypeahead(callback) {
	const search = refAutoReset("", 1e3);
	const handleTypeaheadSearch = (key, items) => {
		search.value = search.value + key;
		if (callback) callback(key);
		else {
			const currentItem = getActiveElement();
			const itemsWithTextValue = items.map((item) => ({
				...item,
				textValue: item.value?.textValue ?? item.ref.textContent?.trim() ?? ""
			}));
			const currentMatch = itemsWithTextValue.find((item) => item.ref === currentItem);
			const nextMatch = getNextMatch(itemsWithTextValue.map((item) => item.textValue), search.value, currentMatch?.textValue);
			const newItem = itemsWithTextValue.find((item) => item.textValue === nextMatch);
			if (newItem) newItem.ref.focus();
			return newItem?.ref;
		}
	};
	const resetTypeahead = () => {
		search.value = "";
	};
	return {
		search,
		handleTypeaheadSearch,
		resetTypeahead
	};
}
/**
* Wraps an array around itself at a given start index
* Example: `wrapArray(['a', 'b', 'c', 'd'], 2) === ['c', 'd', 'a', 'b']`
*/
function wrapArray$1(array, startIndex) {
	return array.map((_, index) => array[(startIndex + index) % array.length]);
}
__name(wrapArray$1, "wrapArray");
/**
* This is the "meat" of the typeahead matching logic. It takes in all the values,
* the search and the current match, and returns the next match (or `undefined`).
*
* We normalize the search because if a user has repeatedly pressed a character,
* we want the exact same behavior as if we only had that one character
* (ie. cycle through options starting with that character)
*
* We also reorder the values by wrapping the array around the current match.
* This is so we always look forward from the current match, and picking the first
* match will always be the correct one.
*
* Finally, if the normalized search is exactly one character, we exclude the
* current match from the values because otherwise it would be the first to match always
* and focus would never move. This is as opposed to the regular case, where we
* don't want focus to move if the current match still matches.
*/
function getNextMatch(values, search, currentMatch) {
	const normalizedSearch = search.length > 1 && Array.from(search).every((char) => char === search[0]) ? search[0] : search;
	const currentMatchIndex = currentMatch ? values.indexOf(currentMatch) : -1;
	let wrappedValues = wrapArray$1(values, Math.max(currentMatchIndex, 0));
	if (normalizedSearch.length === 1) wrappedValues = wrappedValues.filter((v) => v !== currentMatch);
	const nextMatch = wrappedValues.find((value) => value.toLowerCase().startsWith(normalizedSearch.toLowerCase()));
	return nextMatch !== currentMatch ? nextMatch : void 0;
}
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/Presence/usePresence.js
function usePresence(present, node) {
	const stylesRef = ref({});
	const prevAnimationNameRef = ref("none");
	const prevPresentRef = ref(present);
	const initialState = present.value ? "mounted" : "unmounted";
	let timeoutId;
	const ownerWindow = node.value?.ownerDocument.defaultView ?? defaultWindow;
	const { state, dispatch } = useStateMachine(initialState, {
		mounted: {
			UNMOUNT: "unmounted",
			ANIMATION_OUT: "unmountSuspended"
		},
		unmountSuspended: {
			MOUNT: "mounted",
			ANIMATION_END: "unmounted"
		},
		unmounted: { MOUNT: "mounted" }
	});
	const dispatchCustomEvent = (name) => {
		if (isClient) {
			const customEvent = new CustomEvent(name, {
				bubbles: false,
				cancelable: false
			});
			node.value?.dispatchEvent(customEvent);
		}
	};
	watch(present, async (currentPresent, prevPresent) => {
		const hasPresentChanged = prevPresent !== currentPresent;
		await nextTick();
		if (hasPresentChanged) {
			const prevAnimationName = prevAnimationNameRef.value;
			const currentAnimationName = getAnimationName(node.value);
			if (currentPresent) {
				dispatch("MOUNT");
				dispatchCustomEvent("enter");
				if (currentAnimationName === "none") dispatchCustomEvent("after-enter");
			} else if (currentAnimationName === "none" || currentAnimationName === "undefined" || stylesRef.value?.display === "none") {
				dispatch("UNMOUNT");
				dispatchCustomEvent("leave");
				dispatchCustomEvent("after-leave");
			} else if (prevPresent && prevAnimationName !== currentAnimationName) {
				dispatch("ANIMATION_OUT");
				dispatchCustomEvent("leave");
			} else {
				dispatch("UNMOUNT");
				dispatchCustomEvent("after-leave");
			}
		}
	}, { immediate: true });
	/**
	* Triggering an ANIMATION_OUT during an ANIMATION_IN will fire an `animationcancel`
	* event for ANIMATION_IN after we have entered `unmountSuspended` state. So, we
	* make sure we only trigger ANIMATION_END for the currently active animation.
	*/
	const handleAnimationEnd = (event) => {
		const currentAnimationName = getAnimationName(node.value);
		const isCurrentAnimation = currentAnimationName.includes(CSS.escape(event.animationName));
		const directionName = state.value === "mounted" ? "enter" : "leave";
		if (event.target === node.value && isCurrentAnimation) {
			dispatchCustomEvent(`after-${directionName}`);
			dispatch("ANIMATION_END");
			if (!prevPresentRef.value) {
				const currentFillMode = node.value.style.animationFillMode;
				node.value.style.animationFillMode = "forwards";
				timeoutId = ownerWindow?.setTimeout(() => {
					if (node.value?.style.animationFillMode === "forwards") node.value.style.animationFillMode = currentFillMode;
				});
			}
		}
		if (event.target === node.value && currentAnimationName === "none") dispatch("ANIMATION_END");
	};
	const handleAnimationStart = (event) => {
		if (event.target === node.value) prevAnimationNameRef.value = getAnimationName(node.value);
	};
	const watcher = watch(node, (newNode, oldNode) => {
		if (newNode) {
			stylesRef.value = getComputedStyle(newNode);
			newNode.addEventListener("animationstart", handleAnimationStart);
			newNode.addEventListener("animationcancel", handleAnimationEnd);
			newNode.addEventListener("animationend", handleAnimationEnd);
		} else {
			dispatch("ANIMATION_END");
			if (timeoutId !== void 0) ownerWindow?.clearTimeout(timeoutId);
			oldNode?.removeEventListener("animationstart", handleAnimationStart);
			oldNode?.removeEventListener("animationcancel", handleAnimationEnd);
			oldNode?.removeEventListener("animationend", handleAnimationEnd);
		}
	}, { immediate: true });
	const stateWatcher = watch(state, () => {
		const currentAnimationName = getAnimationName(node.value);
		prevAnimationNameRef.value = state.value === "mounted" ? currentAnimationName : "none";
	});
	onUnmounted(() => {
		watcher();
		stateWatcher();
	});
	return { isPresent: computed(() => ["mounted", "unmountSuspended"].includes(state.value)) };
}
function getAnimationName(node) {
	return node ? getComputedStyle(node).animationName || "none" : "none";
}
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/Presence/Presence.js
var Presence_default = defineComponent({
	name: "Presence",
	props: {
		present: {
			type: Boolean,
			required: true
		},
		forceMount: { type: Boolean }
	},
	slots: {},
	setup(props, { slots, expose }) {
		const { present, forceMount } = toRefs(props);
		const node = ref();
		const { isPresent } = usePresence(present, node);
		expose({ present: isPresent });
		let children = slots.default({ present: isPresent.value });
		children = renderSlotFragments(children || []);
		const instance = getCurrentInstance();
		if (children && children?.length > 1) {
			const componentName = instance?.parent?.type.name ? `<${instance.parent.type.name} />` : "component";
			throw new Error([
				`Detected an invalid children for \`${componentName}\` for  \`Presence\` component.`,
				"",
				"Note: Presence works similarly to `v-if` directly, but it waits for animation/transition to finished before unmounting. So it expect only one direct child of valid VNode type.",
				"You can apply a few solutions:",
				["Provide a single child element so that `presence` directive attach correctly.", "Ensure the first child is an actual element instead of a raw text node or comment node."].map((line) => `  - ${line}`).join("\n")
			].join("\n"));
		}
		return () => {
			if (forceMount.value || present.value || isPresent.value) return h(slots.default({ present: isPresent.value })[0], { ref: (v) => {
				const el = unrefElement(v);
				if (typeof el?.hasAttribute === "undefined") return el;
				if (el?.hasAttribute("data-reka-popper-content-wrapper")) node.value = el.firstElementChild;
				else node.value = el;
				return el;
			} });
			else return null;
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/Primitive/Slot.js
var Slot = defineComponent({
	name: "PrimitiveSlot",
	inheritAttrs: false,
	setup(_, { attrs, slots }) {
		return () => {
			if (!slots.default) return null;
			const children = renderSlotFragments(slots.default());
			const firstNonCommentChildrenIndex = children.findIndex((child) => child.type !== Comment);
			if (firstNonCommentChildrenIndex === -1) return children;
			const firstNonCommentChildren = children[firstNonCommentChildrenIndex];
			delete firstNonCommentChildren.props?.ref;
			const mergedProps = firstNonCommentChildren.props ? mergeProps(attrs, firstNonCommentChildren.props) : attrs;
			const cloned = cloneVNode({
				...firstNonCommentChildren,
				props: {}
			}, mergedProps);
			if (children.length === 1) return cloned;
			children[firstNonCommentChildrenIndex] = cloned;
			return children;
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/Primitive/Primitive.js
var SELF_CLOSING_TAGS = [
	"area",
	"img",
	"input"
];
var Primitive = defineComponent({
	name: "Primitive",
	inheritAttrs: false,
	props: {
		asChild: {
			type: Boolean,
			default: false
		},
		as: {
			type: [String, Object],
			default: "div"
		}
	},
	setup(props, { attrs, slots }) {
		const asTag = props.asChild ? "template" : props.as;
		if (typeof asTag === "string" && SELF_CLOSING_TAGS.includes(asTag)) return () => h(asTag, attrs);
		if (asTag !== "template") return () => h(props.as, attrs, { default: slots.default });
		return () => h(Slot, attrs, { default: slots.default });
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/Primitive/usePrimitiveElement.js
function usePrimitiveElement() {
	const primitiveElement = ref();
	return {
		primitiveElement,
		currentElement: computed(() => ["#text", "#comment"].includes(primitiveElement.value?.$el.nodeName) ? primitiveElement.value?.$el.nextElementSibling : unrefElement(primitiveElement))
	};
}
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/Collapsible/CollapsibleRoot.js
var [injectCollapsibleRootContext, provideCollapsibleRootContext] = createContext("CollapsibleRoot");
var CollapsibleRoot_default = /* @__PURE__ */ defineComponent({
	__name: "CollapsibleRoot",
	props: {
		defaultOpen: {
			type: Boolean,
			required: false,
			default: false
		},
		open: {
			type: Boolean,
			required: false,
			default: void 0
		},
		disabled: {
			type: Boolean,
			required: false
		},
		unmountOnHide: {
			type: Boolean,
			required: false,
			default: true
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false
		}
	},
	emits: ["update:open"],
	setup(__props, { expose: __expose, emit: __emit }) {
		const props = __props;
		const open = useVModel(props, "open", __emit, {
			defaultValue: props.defaultOpen,
			passive: props.open === void 0
		});
		const { disabled, unmountOnHide } = toRefs(props);
		provideCollapsibleRootContext({
			contentId: "",
			disabled,
			open,
			unmountOnHide,
			onOpenToggle: () => {
				if (disabled.value) return;
				open.value = !open.value;
			}
		});
		__expose({ open });
		useForwardExpose();
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), {
				as: _ctx.as,
				"as-child": props.asChild,
				"data-state": unref(open) ? "open" : "closed",
				"data-disabled": unref(disabled) ? "" : void 0
			}, {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", { open: unref(open) })]),
				_: 3
			}, 8, [
				"as",
				"as-child",
				"data-state",
				"data-disabled"
			]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/Collapsible/CollapsibleContent.js
var CollapsibleContent_default = /* @__PURE__ */ defineComponent({
	inheritAttrs: false,
	__name: "CollapsibleContent",
	props: {
		forceMount: {
			type: Boolean,
			required: false
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false
		}
	},
	emits: ["contentFound"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const rootContext = injectCollapsibleRootContext();
		rootContext.contentId ||= useId(void 0, "reka-collapsible-content");
		const presentRef = ref();
		const { forwardRef, currentElement } = useForwardExpose();
		const width = ref(0);
		const height = ref(0);
		const isOpen = computed(() => rootContext.open.value);
		const isMountAnimationPrevented = ref(isOpen.value);
		const currentStyle = ref();
		watch(() => [isOpen.value, presentRef.value?.present], async () => {
			await nextTick();
			const node = currentElement.value;
			if (!node) return;
			currentStyle.value = currentStyle.value || {
				transitionDuration: node.style.transitionDuration,
				animationName: node.style.animationName
			};
			node.style.transitionDuration = "0s";
			node.style.animationName = "none";
			const rect = node.getBoundingClientRect();
			height.value = rect.height;
			width.value = rect.width;
			if (!isMountAnimationPrevented.value) {
				node.style.transitionDuration = currentStyle.value.transitionDuration;
				node.style.animationName = currentStyle.value.animationName;
			}
		}, { immediate: true });
		const skipAnimation = computed(() => isMountAnimationPrevented.value && rootContext.open.value);
		onMounted(() => {
			requestAnimationFrame(() => {
				isMountAnimationPrevented.value = false;
			});
		});
		useEventListener(currentElement, "beforematch", (ev) => {
			requestAnimationFrame(() => {
				rootContext.onOpenToggle();
				emits("contentFound");
			});
		});
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Presence_default), {
				ref_key: "presentRef",
				ref: presentRef,
				present: _ctx.forceMount || unref(rootContext).open.value,
				"force-mount": true
			}, {
				default: withCtx(({ present }) => [createVNode(unref(Primitive), mergeProps(_ctx.$attrs, {
					id: unref(rootContext).contentId,
					ref: unref(forwardRef),
					"as-child": props.asChild,
					as: _ctx.as,
					hidden: !present ? unref(rootContext).unmountOnHide.value ? "" : "until-found" : void 0,
					"data-state": skipAnimation.value ? void 0 : unref(rootContext).open.value ? "open" : "closed",
					"data-disabled": unref(rootContext).disabled?.value ? "" : void 0,
					style: {
						[`--reka-collapsible-content-height`]: `${height.value}px`,
						[`--reka-collapsible-content-width`]: `${width.value}px`
					}
				}), {
					default: withCtx(() => [(unref(rootContext).unmountOnHide.value ? present : true) ? renderSlot(_ctx.$slots, "default", { key: 0 }) : createCommentVNode("v-if", true)]),
					_: 2
				}, 1040, [
					"id",
					"as-child",
					"as",
					"hidden",
					"data-state",
					"data-disabled",
					"style"
				])]),
				_: 3
			}, 8, ["present"]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/Collapsible/CollapsibleTrigger.js
var CollapsibleTrigger_default = /* @__PURE__ */ defineComponent({
	__name: "CollapsibleTrigger",
	props: {
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false,
			default: "button"
		}
	},
	setup(__props) {
		const props = __props;
		useForwardExpose();
		const rootContext = injectCollapsibleRootContext();
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), {
				type: _ctx.as === "button" ? "button" : void 0,
				as: _ctx.as,
				"as-child": props.asChild,
				"aria-controls": unref(rootContext).contentId,
				"aria-expanded": unref(rootContext).open.value,
				"data-state": unref(rootContext).open.value ? "open" : "closed",
				"data-disabled": unref(rootContext).disabled?.value ? "" : void 0,
				disabled: unref(rootContext).disabled?.value,
				onClick: unref(rootContext).onOpenToggle
			}, {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 8, [
				"type",
				"as",
				"as-child",
				"aria-controls",
				"aria-expanded",
				"data-state",
				"data-disabled",
				"disabled",
				"onClick"
			]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/shared/useSingleOrMultipleValue.js
/**
* Validates the props and it makes sure that the types are coherent with each other
*
* 1. If type, defaultValue, and modelValue are all undefined, throw an error.
* 2. If modelValue and defaultValue are defined and not of the same type, throw an error.
* 3. If type is defined:
*    a. If type is 'single' and either modelValue or defaultValue is an array, log an error and return 'multiple'.
*    b. If type is 'multiple' and neither modelValue nor defaultValue is an array, log an error and return 'single'.
* 4. Return 'multiple' if modelValue is an array, else return 'single'.
*/
function validateProps({ type, defaultValue, modelValue }) {
	const value = modelValue || defaultValue;
	if (modelValue !== void 0 || defaultValue !== void 0) return Array.isArray(value) ? "multiple" : "single";
	else return type ?? "single";
}
function getDefaultType({ type, defaultValue, modelValue }) {
	if (type) return type;
	return validateProps({
		type,
		defaultValue,
		modelValue
	});
}
function getDefaultValue({ type, defaultValue }) {
	if (defaultValue !== void 0) return defaultValue;
	return type === "single" ? void 0 : [];
}
function useSingleOrMultipleValue(props, emits) {
	const type = computed(() => getDefaultType(props));
	const modelValue = useVModel(props, "modelValue", emits, {
		defaultValue: getDefaultValue(props),
		passive: props.modelValue === void 0,
		deep: true
	});
	function changeModelValue(value) {
		if (type.value === "single") modelValue.value = isEqual(value, modelValue.value) ? void 0 : value;
		else {
			const modelValueArray = Array.isArray(modelValue.value) ? [...modelValue.value || []] : [modelValue.value].filter(Boolean);
			if (isValueEqualOrExist(modelValueArray, value)) {
				const index = modelValueArray.findIndex((i) => isEqual(i, value));
				modelValueArray.splice(index, 1);
			} else modelValueArray.push(value);
			modelValue.value = modelValueArray;
		}
	}
	return {
		modelValue,
		changeModelValue,
		isSingle: computed(() => type.value === "single")
	};
}
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/Dialog/DialogRoot.js
var [injectDialogRootContext, provideDialogRootContext] = createContext("DialogRoot");
var DialogRoot_default = /* @__PURE__ */ defineComponent({
	inheritAttrs: false,
	__name: "DialogRoot",
	props: {
		open: {
			type: Boolean,
			required: false,
			default: void 0
		},
		defaultOpen: {
			type: Boolean,
			required: false,
			default: false
		},
		modal: {
			type: Boolean,
			required: false,
			default: true
		}
	},
	emits: ["update:open"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const open = useVModel(props, "open", __emit, {
			defaultValue: props.defaultOpen,
			passive: props.open === void 0
		});
		const triggerElement = ref();
		const contentElement = ref();
		const { modal } = toRefs(props);
		provideDialogRootContext({
			open,
			modal,
			openModal: () => {
				open.value = true;
			},
			onOpenChange: (value) => {
				open.value = value;
			},
			onOpenToggle: () => {
				open.value = !open.value;
			},
			contentId: "",
			titleId: "",
			descriptionId: "",
			triggerElement,
			contentElement
		});
		return (_ctx, _cache) => {
			return renderSlot(_ctx.$slots, "default", {
				open: unref(open),
				close: () => open.value = false
			});
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/Dialog/DialogClose.js
var DialogClose_default = /* @__PURE__ */ defineComponent({
	__name: "DialogClose",
	props: {
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false,
			default: "button"
		}
	},
	setup(__props) {
		const props = __props;
		useForwardExpose();
		const rootContext = injectDialogRootContext();
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), mergeProps(props, {
				type: _ctx.as === "button" ? "button" : void 0,
				onClick: _cache[0] || (_cache[0] = ($event) => unref(rootContext).onOpenChange(false))
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16, ["type"]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/DismissableLayer/utils.js
var POINTER_DOWN_OUTSIDE = "dismissableLayer.pointerDownOutside";
var FOCUS_OUTSIDE = "dismissableLayer.focusOutside";
function isLayerExist(layerElement, targetElement) {
	const targetLayer = targetElement.closest("[data-dismissable-layer]");
	const mainLayer = layerElement.dataset.dismissableLayer === "" ? layerElement : layerElement.querySelector("[data-dismissable-layer]");
	const nodeList = Array.from(layerElement.ownerDocument.querySelectorAll("[data-dismissable-layer]"));
	if (targetLayer && (mainLayer === targetLayer || nodeList.indexOf(mainLayer) < nodeList.indexOf(targetLayer))) return true;
	else return false;
}
/**
* Listens for `pointerdown` outside a DOM subtree. We use `pointerdown` rather than `pointerup`
* to mimic layer dismissing behaviour present in OS.
* Returns props to pass to the node we want to check for outside events.
*/
function usePointerDownOutside(onPointerDownOutside, element, enabled = true) {
	const ownerDocument = element?.value?.ownerDocument ?? globalThis?.document;
	const isPointerInsideDOMTree = ref(false);
	const handleClickRef = ref(() => {});
	watchEffect((cleanupFn) => {
		if (!isClient || !toValue$1(enabled)) return;
		const handlePointerDown = async (event) => {
			const target = event.target;
			if (!element?.value || !target) return;
			if (isLayerExist(element.value, target)) {
				isPointerInsideDOMTree.value = false;
				return;
			}
			if (event.target && !isPointerInsideDOMTree.value) {
				const eventDetail = { originalEvent: event };
				function handleAndDispatchPointerDownOutsideEvent() {
					handleAndDispatchCustomEvent(POINTER_DOWN_OUTSIDE, onPointerDownOutside, eventDetail);
				}
				/**
				* On touch devices, we need to wait for a click event because browsers implement
				* a ~350ms delay between the time the user stops touching the display and when the
				* browser executes events. We need to ensure we don't reactivate pointer-events within
				* this timeframe otherwise the browser may execute events that should have been prevented.
				*
				* Additionally, this also lets us deal automatically with cancellations when a click event
				* isn't raised because the page was considered scrolled/drag-scrolled, long-pressed, etc.
				*
				* This is why we also continuously remove the previous listener, because we cannot be
				* certain that it was raised, and therefore cleaned-up.
				*/
				if (event.pointerType === "touch") {
					ownerDocument.removeEventListener("click", handleClickRef.value);
					handleClickRef.value = handleAndDispatchPointerDownOutsideEvent;
					ownerDocument.addEventListener("click", handleClickRef.value, { once: true });
				} else handleAndDispatchPointerDownOutsideEvent();
			} else ownerDocument.removeEventListener("click", handleClickRef.value);
			isPointerInsideDOMTree.value = false;
		};
		/**
		* if this hook executes in a component that mounts via a `pointerdown` event, the event
		* would bubble up to the document and trigger a `pointerDownOutside` event. We avoid
		* this by delaying the event listener registration on the document.
		* This is how the DOM works, ie:
		* ```
		* button.addEventListener('pointerdown', () => {
		*   console.log('I will log');
		*   document.addEventListener('pointerdown', () => {
		*     console.log('I will also log');
		*   })
		* });
		*/
		const timerId = window.setTimeout(() => {
			ownerDocument.addEventListener("pointerdown", handlePointerDown);
		}, 0);
		cleanupFn(() => {
			window.clearTimeout(timerId);
			ownerDocument.removeEventListener("pointerdown", handlePointerDown);
			ownerDocument.removeEventListener("click", handleClickRef.value);
		});
	});
	return { onPointerDownCapture: () => {
		if (!toValue$1(enabled)) return;
		isPointerInsideDOMTree.value = true;
	} };
}
/**
* Listens for when focus happens outside a DOM subtree.
* Returns props to pass to the root (node) of the subtree we want to check.
*/
function useFocusOutside(onFocusOutside, element, enabled = true) {
	const ownerDocument = element?.value?.ownerDocument ?? globalThis?.document;
	const isFocusInsideDOMTree = ref(false);
	watchEffect((cleanupFn) => {
		if (!isClient || !toValue$1(enabled)) return;
		const handleFocus = async (event) => {
			if (!element?.value) return;
			await nextTick();
			await nextTick();
			const target = event.target;
			if (!element.value || !target || isLayerExist(element.value, target)) return;
			if (event.target && !isFocusInsideDOMTree.value) handleAndDispatchCustomEvent(FOCUS_OUTSIDE, onFocusOutside, { originalEvent: event });
		};
		ownerDocument.addEventListener("focusin", handleFocus);
		cleanupFn(() => ownerDocument.removeEventListener("focusin", handleFocus));
	});
	return {
		onFocusCapture: () => {
			if (!toValue$1(enabled)) return;
			isFocusInsideDOMTree.value = true;
		},
		onBlurCapture: () => {
			if (!toValue$1(enabled)) return;
			isFocusInsideDOMTree.value = false;
		}
	};
}
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/DismissableLayer/DismissableLayer.js
var context = reactive({
	layersRoot: /* @__PURE__ */ new Set(),
	layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
	originalBodyPointerEvents: void 0,
	branches: /* @__PURE__ */ new Set()
});
var DismissableLayer_default = /* @__PURE__ */ defineComponent({
	__name: "DismissableLayer",
	props: {
		disableOutsidePointerEvents: {
			type: Boolean,
			required: false,
			default: false
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false
		}
	},
	emits: [
		"escapeKeyDown",
		"pointerDownOutside",
		"focusOutside",
		"interactOutside",
		"dismiss"
	],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const { forwardRef, currentElement: layerElement } = useForwardExpose();
		const ownerDocument = computed(() => layerElement.value?.ownerDocument ?? globalThis.document);
		const layers = computed(() => context.layersRoot);
		const index = computed(() => {
			return layerElement.value ? Array.from(layers.value).indexOf(layerElement.value) : -1;
		});
		const isBodyPointerEventsDisabled = computed(() => {
			return context.layersWithOutsidePointerEventsDisabled.size > 0;
		});
		const isPointerEventsEnabled = computed(() => {
			const localLayers = Array.from(layers.value);
			const [highestLayerWithOutsidePointerEventsDisabled] = [...context.layersWithOutsidePointerEventsDisabled].slice(-1);
			const highestLayerWithOutsidePointerEventsDisabledIndex = localLayers.indexOf(highestLayerWithOutsidePointerEventsDisabled);
			return index.value >= highestLayerWithOutsidePointerEventsDisabledIndex;
		});
		const pointerDownOutside = usePointerDownOutside(async (event) => {
			const isPointerDownOnBranch = [...context.branches].some((branch) => branch?.contains(event.target));
			if (!isPointerEventsEnabled.value || isPointerDownOnBranch) return;
			emits("pointerDownOutside", event);
			emits("interactOutside", event);
			await nextTick();
			if (!event.defaultPrevented) emits("dismiss");
		}, layerElement);
		const focusOutside = useFocusOutside((event) => {
			if ([...context.branches].some((branch) => branch?.contains(event.target))) return;
			emits("focusOutside", event);
			emits("interactOutside", event);
			if (!event.defaultPrevented) emits("dismiss");
		}, layerElement);
		onKeyStroke("Escape", (event) => {
			if (!(index.value === layers.value.size - 1)) return;
			emits("escapeKeyDown", event);
			if (!event.defaultPrevented) emits("dismiss");
		});
		watchEffect((cleanupFn) => {
			if (!layerElement.value) return;
			if (props.disableOutsidePointerEvents) {
				if (context.layersWithOutsidePointerEventsDisabled.size === 0) {
					context.originalBodyPointerEvents = ownerDocument.value.body.style.pointerEvents;
					ownerDocument.value.body.style.pointerEvents = "none";
				}
				context.layersWithOutsidePointerEventsDisabled.add(layerElement.value);
			}
			layers.value.add(layerElement.value);
			cleanupFn(() => {
				if (props.disableOutsidePointerEvents && context.layersWithOutsidePointerEventsDisabled.size === 1 && !isNullish(context.originalBodyPointerEvents)) ownerDocument.value.body.style.pointerEvents = context.originalBodyPointerEvents;
			});
		});
		watchEffect((cleanupFn) => {
			cleanupFn(() => {
				if (!layerElement.value) return;
				layers.value.delete(layerElement.value);
				context.layersWithOutsidePointerEventsDisabled.delete(layerElement.value);
			});
		});
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), {
				ref: unref(forwardRef),
				"as-child": _ctx.asChild,
				as: _ctx.as,
				"data-dismissable-layer": "",
				style: normalizeStyle({ pointerEvents: isBodyPointerEventsDisabled.value ? isPointerEventsEnabled.value ? "auto" : "none" : void 0 }),
				onFocusCapture: unref(focusOutside).onFocusCapture,
				onBlurCapture: unref(focusOutside).onBlurCapture,
				onPointerdownCapture: unref(pointerDownOutside).onPointerDownCapture
			}, {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 8, [
				"as-child",
				"as",
				"style",
				"onFocusCapture",
				"onBlurCapture",
				"onPointerdownCapture"
			]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/FocusScope/stack.js
var useFocusStackState = createGlobalState(() => {
	return ref([]);
});
function createFocusScopesStack() {
	/** A stack of focus scopes, with the active one at the top */
	const stack = useFocusStackState();
	return {
		add(focusScope) {
			const activeFocusScope = stack.value[0];
			if (focusScope !== activeFocusScope) activeFocusScope?.pause();
			stack.value = arrayRemove(stack.value, focusScope);
			stack.value.unshift(focusScope);
		},
		remove(focusScope) {
			stack.value = arrayRemove(stack.value, focusScope);
			stack.value[0]?.resume();
		}
	};
}
function arrayRemove(array, item) {
	const updatedArray = [...array];
	const index = updatedArray.indexOf(item);
	if (index !== -1) updatedArray.splice(index, 1);
	return updatedArray;
}
function removeLinks(items) {
	return items.filter((item) => item.tagName !== "A");
}
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/FocusScope/utils.js
var AUTOFOCUS_ON_MOUNT = "focusScope.autoFocusOnMount";
var AUTOFOCUS_ON_UNMOUNT = "focusScope.autoFocusOnUnmount";
var EVENT_OPTIONS$1 = {
	bubbles: false,
	cancelable: true
};
/**
* Attempts focusing the first element in a list of candidates.
* Stops when focus has actually moved.
*/
function focusFirst$2(candidates, { select = false } = {}) {
	const previouslyFocusedElement = getActiveElement();
	for (const candidate of candidates) {
		focus(candidate, { select });
		if (getActiveElement() !== previouslyFocusedElement) return true;
	}
}
__name(focusFirst$2, "focusFirst");
/**
* Returns the first and last tabbable elements inside a container.
*/
function getTabbableEdges(container) {
	const candidates = getTabbableCandidates(container);
	return [findVisible(candidates, container), findVisible(candidates.reverse(), container)];
}
/**
* Returns a list of potential tabbable candidates.
*
* NOTE: This is only a close approximation. For example it doesn't take into account cases like when
* elements are not visible. This cannot be worked out easily by just reading a property, but rather
* necessitate runtime knowledge (computed styles, etc). We deal with these cases separately.
*
* See: https://developer.mozilla.org/en-US/docs/Web/API/TreeWalker
* Credit: https://github.com/discord/focus-layers/blob/master/src/util/wrapFocus.tsx#L1
*/
function getTabbableCandidates(container) {
	const nodes = [];
	const walker = document.createTreeWalker(container, NodeFilter.SHOW_ELEMENT, { acceptNode: (node) => {
		const isHiddenInput = node.tagName === "INPUT" && node.type === "hidden";
		if (node.disabled || node.hidden || isHiddenInput) return NodeFilter.FILTER_SKIP;
		return node.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
	} });
	while (walker.nextNode()) nodes.push(walker.currentNode);
	return nodes;
}
/**
* Returns the first visible element in a list.
* NOTE: Only checks visibility up to the `container`.
*/
function findVisible(elements, container) {
	for (const element of elements) if (!isHidden(element, { upTo: container })) return element;
}
function isHidden(node, { upTo }) {
	if (getComputedStyle(node).visibility === "hidden") return true;
	while (node) {
		if (upTo !== void 0 && node === upTo) return false;
		if (getComputedStyle(node).display === "none") return true;
		node = node.parentElement;
	}
	return false;
}
function isSelectableInput(element) {
	return element instanceof HTMLInputElement && "select" in element;
}
function focus(element, { select = false } = {}) {
	if (element && element.focus) {
		const previouslyFocusedElement = getActiveElement();
		element.focus({ preventScroll: true });
		if (element !== previouslyFocusedElement && isSelectableInput(element) && select) element.select();
	}
}
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/FocusScope/FocusScope.js
var FocusScope_default = /* @__PURE__ */ defineComponent({
	__name: "FocusScope",
	props: {
		loop: {
			type: Boolean,
			required: false,
			default: false
		},
		trapped: {
			type: Boolean,
			required: false,
			default: false
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false
		}
	},
	emits: ["mountAutoFocus", "unmountAutoFocus"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const { currentRef, currentElement } = useForwardExpose();
		const lastFocusedElementRef = ref(null);
		const focusScopesStack = createFocusScopesStack();
		const focusScope = reactive({
			paused: false,
			pause() {
				this.paused = true;
			},
			resume() {
				this.paused = false;
			}
		});
		watchEffect((cleanupFn) => {
			if (!isClient) return;
			const container = currentElement.value;
			if (!props.trapped) return;
			function handleFocusIn(event) {
				if (focusScope.paused || !container) return;
				const target = event.target;
				if (container.contains(target)) lastFocusedElementRef.value = target;
				else focus(lastFocusedElementRef.value, { select: true });
			}
			function handleFocusOut(event) {
				if (focusScope.paused || !container) return;
				const relatedTarget = event.relatedTarget;
				if (relatedTarget === null) return;
				if (!container.contains(relatedTarget)) focus(lastFocusedElementRef.value, { select: true });
			}
			function handleMutations(mutations) {
				if (!container.contains(lastFocusedElementRef.value)) focus(container);
			}
			document.addEventListener("focusin", handleFocusIn);
			document.addEventListener("focusout", handleFocusOut);
			const mutationObserver = new MutationObserver(handleMutations);
			if (container) mutationObserver.observe(container, {
				childList: true,
				subtree: true
			});
			cleanupFn(() => {
				document.removeEventListener("focusin", handleFocusIn);
				document.removeEventListener("focusout", handleFocusOut);
				mutationObserver.disconnect();
			});
		});
		watchEffect(async (cleanupFn) => {
			const container = currentElement.value;
			await nextTick();
			if (!container) return;
			focusScopesStack.add(focusScope);
			const previouslyFocusedElement = getActiveElement();
			if (!container.contains(previouslyFocusedElement)) {
				const mountEvent = new CustomEvent(AUTOFOCUS_ON_MOUNT, EVENT_OPTIONS$1);
				container.addEventListener(AUTOFOCUS_ON_MOUNT, (ev) => emits("mountAutoFocus", ev));
				container.dispatchEvent(mountEvent);
				if (!mountEvent.defaultPrevented) {
					focusFirst$2(removeLinks(getTabbableCandidates(container)), { select: true });
					if (getActiveElement() === previouslyFocusedElement) focus(container);
				}
			}
			cleanupFn(() => {
				container.removeEventListener(AUTOFOCUS_ON_MOUNT, (ev) => emits("mountAutoFocus", ev));
				const unmountEvent = new CustomEvent(AUTOFOCUS_ON_UNMOUNT, EVENT_OPTIONS$1);
				const unmountEventHandler = (ev) => {
					emits("unmountAutoFocus", ev);
				};
				container.addEventListener(AUTOFOCUS_ON_UNMOUNT, unmountEventHandler);
				container.dispatchEvent(unmountEvent);
				setTimeout(() => {
					if (!unmountEvent.defaultPrevented) focus(previouslyFocusedElement ?? document.body, { select: true });
					container.removeEventListener(AUTOFOCUS_ON_UNMOUNT, unmountEventHandler);
					focusScopesStack.remove(focusScope);
				}, 0);
			});
		});
		function handleKeyDown(event) {
			if (!props.loop && !props.trapped) return;
			if (focusScope.paused) return;
			const isTabKey = event.key === "Tab" && !event.altKey && !event.ctrlKey && !event.metaKey;
			const focusedElement = getActiveElement();
			if (isTabKey && focusedElement) {
				const container = event.currentTarget;
				const [first, last] = getTabbableEdges(container);
				if (!(first && last)) {
					if (focusedElement === container) event.preventDefault();
				} else if (!event.shiftKey && focusedElement === last) {
					event.preventDefault();
					if (props.loop) focus(first, { select: true });
				} else if (event.shiftKey && focusedElement === first) {
					event.preventDefault();
					if (props.loop) focus(last, { select: true });
				}
			}
		}
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), {
				ref_key: "currentRef",
				ref: currentRef,
				tabindex: "-1",
				"as-child": _ctx.asChild,
				as: _ctx.as,
				onKeydown: handleKeyDown
			}, {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 8, ["as-child", "as"]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/Menu/utils.js
var ITEM_SELECT = "menu.itemSelect";
var SELECTION_KEYS$1 = ["Enter", " "];
var FIRST_KEYS = [
	"ArrowDown",
	"PageUp",
	"Home"
];
var LAST_KEYS = [
	"ArrowUp",
	"PageDown",
	"End"
];
var FIRST_LAST_KEYS = [...FIRST_KEYS, ...LAST_KEYS];
var SUB_OPEN_KEYS = {
	ltr: [...SELECTION_KEYS$1, "ArrowRight"],
	rtl: [...SELECTION_KEYS$1, "ArrowLeft"]
};
var SUB_CLOSE_KEYS = {
	ltr: ["ArrowLeft"],
	rtl: ["ArrowRight"]
};
function getOpenState(open) {
	return open ? "open" : "closed";
}
function isIndeterminate$1(checked) {
	return checked === "indeterminate";
}
__name(isIndeterminate$1, "isIndeterminate");
function getCheckedState(checked) {
	return isIndeterminate$1(checked) ? "indeterminate" : checked ? "checked" : "unchecked";
}
function focusFirst$1(candidates) {
	const PREVIOUSLY_FOCUSED_ELEMENT = getActiveElement();
	for (const candidate of candidates) {
		if (candidate === PREVIOUSLY_FOCUSED_ELEMENT) return;
		candidate.focus();
		if (getActiveElement() !== PREVIOUSLY_FOCUSED_ELEMENT) return;
	}
}
__name(focusFirst$1, "focusFirst");
function isPointInPolygon(point, polygon) {
	const { x, y } = point;
	let inside = false;
	for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
		const xi = polygon[i].x;
		const yi = polygon[i].y;
		const xj = polygon[j].x;
		const yj = polygon[j].y;
		if (yi > y !== yj > y && x < (xj - xi) * (y - yi) / (yj - yi) + xi) inside = !inside;
	}
	return inside;
}
function isPointerInGraceArea(event, area) {
	if (!area) return false;
	return isPointInPolygon({
		x: event.clientX,
		y: event.clientY
	}, area);
}
function isMouseEvent$1(event) {
	return event.pointerType === "mouse";
}
__name(isMouseEvent$1, "isMouseEvent");
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/Dialog/DialogContentImpl.js
var DialogContentImpl_default = /* @__PURE__ */ defineComponent({
	__name: "DialogContentImpl",
	props: {
		forceMount: {
			type: Boolean,
			required: false
		},
		trapFocus: {
			type: Boolean,
			required: false
		},
		disableOutsidePointerEvents: {
			type: Boolean,
			required: false
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false
		}
	},
	emits: [
		"escapeKeyDown",
		"pointerDownOutside",
		"focusOutside",
		"interactOutside",
		"openAutoFocus",
		"closeAutoFocus"
	],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const rootContext = injectDialogRootContext();
		const { forwardRef, currentElement: contentElement } = useForwardExpose();
		rootContext.titleId ||= useId(void 0, "reka-dialog-title");
		rootContext.descriptionId ||= useId(void 0, "reka-dialog-description");
		onMounted(() => {
			rootContext.contentElement = contentElement;
			if (getActiveElement() !== document.body) rootContext.triggerElement.value = getActiveElement();
		});
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(FocusScope_default), {
				"as-child": "",
				loop: "",
				trapped: props.trapFocus,
				onMountAutoFocus: _cache[5] || (_cache[5] = ($event) => emits("openAutoFocus", $event)),
				onUnmountAutoFocus: _cache[6] || (_cache[6] = ($event) => emits("closeAutoFocus", $event))
			}, {
				default: withCtx(() => [createVNode(unref(DismissableLayer_default), mergeProps({
					id: unref(rootContext).contentId,
					ref: unref(forwardRef),
					as: _ctx.as,
					"as-child": _ctx.asChild,
					"disable-outside-pointer-events": _ctx.disableOutsidePointerEvents,
					role: "dialog",
					"aria-describedby": unref(rootContext).descriptionId,
					"aria-labelledby": unref(rootContext).titleId,
					"data-state": unref(getOpenState)(unref(rootContext).open.value)
				}, _ctx.$attrs, {
					onDismiss: _cache[0] || (_cache[0] = ($event) => unref(rootContext).onOpenChange(false)),
					onEscapeKeyDown: _cache[1] || (_cache[1] = ($event) => emits("escapeKeyDown", $event)),
					onFocusOutside: _cache[2] || (_cache[2] = ($event) => emits("focusOutside", $event)),
					onInteractOutside: _cache[3] || (_cache[3] = ($event) => emits("interactOutside", $event)),
					onPointerDownOutside: _cache[4] || (_cache[4] = ($event) => emits("pointerDownOutside", $event))
				}), {
					default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
					_: 3
				}, 16, [
					"id",
					"as",
					"as-child",
					"disable-outside-pointer-events",
					"aria-describedby",
					"aria-labelledby",
					"data-state"
				])]),
				_: 3
			}, 8, ["trapped"]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/Dialog/DialogContentModal.js
var DialogContentModal_default = /* @__PURE__ */ defineComponent({
	__name: "DialogContentModal",
	props: {
		forceMount: {
			type: Boolean,
			required: false
		},
		trapFocus: {
			type: Boolean,
			required: false
		},
		disableOutsidePointerEvents: {
			type: Boolean,
			required: false
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false
		}
	},
	emits: [
		"escapeKeyDown",
		"pointerDownOutside",
		"focusOutside",
		"interactOutside",
		"openAutoFocus",
		"closeAutoFocus"
	],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const rootContext = injectDialogRootContext();
		const emitsAsProps = useEmitAsProps(emits);
		const { forwardRef, currentElement } = useForwardExpose();
		useHideOthers(currentElement);
		return (_ctx, _cache) => {
			return openBlock(), createBlock(DialogContentImpl_default, mergeProps({
				...props,
				...unref(emitsAsProps)
			}, {
				ref: unref(forwardRef),
				"trap-focus": unref(rootContext).open.value,
				"disable-outside-pointer-events": true,
				onCloseAutoFocus: _cache[0] || (_cache[0] = (event) => {
					if (!event.defaultPrevented) {
						event.preventDefault();
						unref(rootContext).triggerElement.value?.focus();
					}
				}),
				onPointerDownOutside: _cache[1] || (_cache[1] = (event) => {
					const originalEvent = event.detail.originalEvent;
					const ctrlLeftClick = originalEvent.button === 0 && originalEvent.ctrlKey === true;
					if (originalEvent.button === 2 || ctrlLeftClick) event.preventDefault();
				}),
				onFocusOutside: _cache[2] || (_cache[2] = (event) => {
					event.preventDefault();
				})
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16, ["trap-focus"]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/Dialog/DialogContentNonModal.js
var DialogContentNonModal_default = /* @__PURE__ */ defineComponent({
	__name: "DialogContentNonModal",
	props: {
		forceMount: {
			type: Boolean,
			required: false
		},
		trapFocus: {
			type: Boolean,
			required: false
		},
		disableOutsidePointerEvents: {
			type: Boolean,
			required: false
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false
		}
	},
	emits: [
		"escapeKeyDown",
		"pointerDownOutside",
		"focusOutside",
		"interactOutside",
		"openAutoFocus",
		"closeAutoFocus"
	],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emitsAsProps = useEmitAsProps(__emit);
		useForwardExpose();
		const rootContext = injectDialogRootContext();
		const hasInteractedOutsideRef = ref(false);
		const hasPointerDownOutsideRef = ref(false);
		return (_ctx, _cache) => {
			return openBlock(), createBlock(DialogContentImpl_default, mergeProps({
				...props,
				...unref(emitsAsProps)
			}, {
				"trap-focus": false,
				"disable-outside-pointer-events": false,
				onCloseAutoFocus: _cache[0] || (_cache[0] = (event) => {
					if (!event.defaultPrevented) {
						if (!hasInteractedOutsideRef.value) unref(rootContext).triggerElement.value?.focus();
						event.preventDefault();
					}
					hasInteractedOutsideRef.value = false;
					hasPointerDownOutsideRef.value = false;
				}),
				onInteractOutside: _cache[1] || (_cache[1] = (event) => {
					if (!event.defaultPrevented) {
						hasInteractedOutsideRef.value = true;
						if (event.detail.originalEvent.type === "pointerdown") hasPointerDownOutsideRef.value = true;
					}
					const target = event.target;
					if (unref(rootContext).triggerElement.value?.contains(target)) event.preventDefault();
					if (event.detail.originalEvent.type === "focusin" && hasPointerDownOutsideRef.value) event.preventDefault();
				})
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/Dialog/DialogContent.js
var DialogContent_default = /* @__PURE__ */ defineComponent({
	__name: "DialogContent",
	props: {
		forceMount: {
			type: Boolean,
			required: false
		},
		disableOutsidePointerEvents: {
			type: Boolean,
			required: false
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false
		}
	},
	emits: [
		"escapeKeyDown",
		"pointerDownOutside",
		"focusOutside",
		"interactOutside",
		"openAutoFocus",
		"closeAutoFocus"
	],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const rootContext = injectDialogRootContext();
		const emitsAsProps = useEmitAsProps(emits);
		const { forwardRef } = useForwardExpose();
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Presence_default), { present: _ctx.forceMount || unref(rootContext).open.value }, {
				default: withCtx(() => [unref(rootContext).modal.value ? (openBlock(), createBlock(DialogContentModal_default, mergeProps({
					key: 0,
					ref: unref(forwardRef)
				}, {
					...props,
					...unref(emitsAsProps),
					..._ctx.$attrs
				}), {
					default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
					_: 3
				}, 16)) : (openBlock(), createBlock(DialogContentNonModal_default, mergeProps({
					key: 1,
					ref: unref(forwardRef)
				}, {
					...props,
					...unref(emitsAsProps),
					..._ctx.$attrs
				}), {
					default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
					_: 3
				}, 16))]),
				_: 3
			}, 8, ["present"]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/Dialog/DialogDescription.js
var DialogDescription_default = /* @__PURE__ */ defineComponent({
	__name: "DialogDescription",
	props: {
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false,
			default: "p"
		}
	},
	setup(__props) {
		const props = __props;
		useForwardExpose();
		const rootContext = injectDialogRootContext();
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), mergeProps(props, { id: unref(rootContext).descriptionId }), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16, ["id"]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/Dialog/DialogOverlayImpl.js
var DialogOverlayImpl_default = /* @__PURE__ */ defineComponent({
	__name: "DialogOverlayImpl",
	props: {
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false
		}
	},
	setup(__props) {
		const rootContext = injectDialogRootContext();
		useBodyScrollLock(true);
		useForwardExpose();
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), {
				as: _ctx.as,
				"as-child": _ctx.asChild,
				"data-state": unref(rootContext).open.value ? "open" : "closed",
				style: { "pointer-events": "auto" }
			}, {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 8, [
				"as",
				"as-child",
				"data-state"
			]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/Dialog/DialogOverlay.js
var DialogOverlay_default = /* @__PURE__ */ defineComponent({
	__name: "DialogOverlay",
	props: {
		forceMount: {
			type: Boolean,
			required: false
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false
		}
	},
	setup(__props) {
		const rootContext = injectDialogRootContext();
		const { forwardRef } = useForwardExpose();
		return (_ctx, _cache) => {
			return unref(rootContext)?.modal.value ? (openBlock(), createBlock(unref(Presence_default), {
				key: 0,
				present: _ctx.forceMount || unref(rootContext).open.value
			}, {
				default: withCtx(() => [createVNode(DialogOverlayImpl_default, mergeProps(_ctx.$attrs, {
					ref: unref(forwardRef),
					as: _ctx.as,
					"as-child": _ctx.asChild
				}), {
					default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
					_: 3
				}, 16, ["as", "as-child"])]),
				_: 3
			}, 8, ["present"])) : createCommentVNode("v-if", true);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/Teleport/Teleport.js
var Teleport_default = /* @__PURE__ */ defineComponent({
	__name: "Teleport",
	props: {
		to: {
			type: null,
			required: false,
			default: "body"
		},
		disabled: {
			type: Boolean,
			required: false
		},
		defer: {
			type: Boolean,
			required: false
		},
		forceMount: {
			type: Boolean,
			required: false
		}
	},
	setup(__props) {
		const isMounted = useMounted();
		return (_ctx, _cache) => {
			return unref(isMounted) || _ctx.forceMount ? (openBlock(), createBlock(Teleport, {
				key: 0,
				to: _ctx.to,
				disabled: _ctx.disabled,
				defer: _ctx.defer
			}, [renderSlot(_ctx.$slots, "default")], 8, [
				"to",
				"disabled",
				"defer"
			])) : createCommentVNode("v-if", true);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/Dialog/DialogPortal.js
var DialogPortal_default = /* @__PURE__ */ defineComponent({
	__name: "DialogPortal",
	props: {
		to: {
			type: null,
			required: false
		},
		disabled: {
			type: Boolean,
			required: false
		},
		defer: {
			type: Boolean,
			required: false
		},
		forceMount: {
			type: Boolean,
			required: false
		}
	},
	setup(__props) {
		const props = __props;
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Teleport_default), normalizeProps(guardReactiveProps(props)), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/Dialog/DialogTitle.js
var DialogTitle_default = /* @__PURE__ */ defineComponent({
	__name: "DialogTitle",
	props: {
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false,
			default: "h2"
		}
	},
	setup(__props) {
		const props = __props;
		const rootContext = injectDialogRootContext();
		useForwardExpose();
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), mergeProps(props, { id: unref(rootContext).titleId }), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16, ["id"]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/Dialog/DialogTrigger.js
var DialogTrigger_default = /* @__PURE__ */ defineComponent({
	__name: "DialogTrigger",
	props: {
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false,
			default: "button"
		}
	},
	setup(__props) {
		const props = __props;
		const rootContext = injectDialogRootContext();
		const { forwardRef, currentElement } = useForwardExpose();
		rootContext.contentId ||= useId(void 0, "reka-dialog-content");
		onMounted(() => {
			rootContext.triggerElement.value = currentElement.value;
		});
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), mergeProps(props, {
				ref: unref(forwardRef),
				type: _ctx.as === "button" ? "button" : void 0,
				"aria-haspopup": "dialog",
				"aria-expanded": unref(rootContext).open.value || false,
				"aria-controls": unref(rootContext).open.value ? unref(rootContext).contentId : void 0,
				"data-state": unref(rootContext).open.value ? "open" : "closed",
				onClick: unref(rootContext).onOpenToggle
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16, [
				"type",
				"aria-expanded",
				"aria-controls",
				"data-state",
				"onClick"
			]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/Collection/Collection.js
var ITEM_DATA_ATTR = "data-reka-collection-item";
function useCollection(options = {}) {
	const { key = "", isProvider = false } = options;
	const injectionKey = `${key}CollectionProvider`;
	let context;
	if (isProvider) {
		const itemMap = ref(/* @__PURE__ */ new Map());
		context = {
			collectionRef: ref(),
			itemMap
		};
		provide(injectionKey, context);
	} else context = inject(injectionKey);
	const getItems = (includeDisabledItem = false) => {
		const collectionNode = context.collectionRef.value;
		if (!collectionNode) return [];
		const orderedNodes = Array.from(collectionNode.querySelectorAll(`[${ITEM_DATA_ATTR}]`));
		const orderedItems = Array.from(context.itemMap.value.values()).sort((a, b) => orderedNodes.indexOf(a.ref) - orderedNodes.indexOf(b.ref));
		if (includeDisabledItem) return orderedItems;
		else return orderedItems.filter((i) => i.ref.dataset.disabled !== "");
	};
	const CollectionSlot = defineComponent({
		name: "CollectionSlot",
		setup(_, { slots }) {
			const { primitiveElement, currentElement } = usePrimitiveElement();
			watch(currentElement, () => {
				context.collectionRef.value = currentElement.value;
			});
			return () => h(Slot, { ref: primitiveElement }, slots);
		}
	});
	const CollectionItem = defineComponent({
		name: "CollectionItem",
		inheritAttrs: false,
		props: { value: { validator: () => true } },
		setup(props, { slots, attrs }) {
			const { primitiveElement, currentElement } = usePrimitiveElement();
			watchEffect((cleanupFn) => {
				if (currentElement.value) {
					const key$1 = markRaw(currentElement.value);
					context.itemMap.value.set(key$1, {
						ref: currentElement.value,
						value: props.value
					});
					cleanupFn(() => context.itemMap.value.delete(key$1));
				}
			});
			return () => h(Slot, {
				...attrs,
				[ITEM_DATA_ATTR]: "",
				ref: primitiveElement
			}, slots);
		}
	});
	return {
		getItems,
		reactiveItems: computed(() => Array.from(context.itemMap.value.values())),
		itemMapSize: computed(() => context.itemMap.value.size),
		CollectionSlot,
		CollectionItem
	};
}
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/RovingFocus/utils.js
var ENTRY_FOCUS = "rovingFocusGroup.onEntryFocus";
var EVENT_OPTIONS = {
	bubbles: false,
	cancelable: true
};
var MAP_KEY_TO_FOCUS_INTENT = {
	ArrowLeft: "prev",
	ArrowUp: "prev",
	ArrowRight: "next",
	ArrowDown: "next",
	PageUp: "first",
	Home: "first",
	PageDown: "last",
	End: "last"
};
function getDirectionAwareKey(key, dir) {
	if (dir !== "rtl") return key;
	return key === "ArrowLeft" ? "ArrowRight" : key === "ArrowRight" ? "ArrowLeft" : key;
}
function getFocusIntent(event, orientation, dir) {
	const key = getDirectionAwareKey(event.key, dir);
	if (orientation === "vertical" && ["ArrowLeft", "ArrowRight"].includes(key)) return void 0;
	if (orientation === "horizontal" && ["ArrowUp", "ArrowDown"].includes(key)) return void 0;
	return MAP_KEY_TO_FOCUS_INTENT[key];
}
function focusFirst(candidates, preventScroll = false) {
	const PREVIOUSLY_FOCUSED_ELEMENT = getActiveElement();
	for (const candidate of candidates) {
		if (candidate === PREVIOUSLY_FOCUSED_ELEMENT) return;
		candidate.focus({ preventScroll });
		if (getActiveElement() !== PREVIOUSLY_FOCUSED_ELEMENT) return;
	}
}
/**
* Wraps an array around itself at a given start index
* Example: `wrapArray(['a', 'b', 'c', 'd'], 2) === ['c', 'd', 'a', 'b']`
*/
function wrapArray(array, startIndex) {
	return array.map((_, index) => array[(startIndex + index) % array.length]);
}
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/RovingFocus/RovingFocusGroup.js
var [injectRovingFocusGroupContext, provideRovingFocusGroupContext] = createContext("RovingFocusGroup");
var RovingFocusGroup_default = /* @__PURE__ */ defineComponent({
	__name: "RovingFocusGroup",
	props: {
		orientation: {
			type: String,
			required: false,
			default: void 0
		},
		dir: {
			type: String,
			required: false
		},
		loop: {
			type: Boolean,
			required: false,
			default: false
		},
		currentTabStopId: {
			type: [String, null],
			required: false
		},
		defaultCurrentTabStopId: {
			type: String,
			required: false
		},
		preventScrollOnEntryFocus: {
			type: Boolean,
			required: false,
			default: false
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false
		}
	},
	emits: ["entryFocus", "update:currentTabStopId"],
	setup(__props, { expose: __expose, emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const { loop, orientation, dir: propDir } = toRefs(props);
		const dir = useDirection(propDir);
		const currentTabStopId = useVModel(props, "currentTabStopId", emits, {
			defaultValue: props.defaultCurrentTabStopId,
			passive: props.currentTabStopId === void 0
		});
		const isTabbingBackOut = ref(false);
		const isClickFocus = ref(false);
		const focusableItemsCount = ref(0);
		const { getItems, CollectionSlot } = useCollection({ isProvider: true });
		function handleFocus(event) {
			const isKeyboardFocus = !isClickFocus.value;
			if (event.currentTarget && event.target === event.currentTarget && isKeyboardFocus && !isTabbingBackOut.value) {
				const entryFocusEvent = new CustomEvent(ENTRY_FOCUS, EVENT_OPTIONS);
				event.currentTarget.dispatchEvent(entryFocusEvent);
				emits("entryFocus", entryFocusEvent);
				if (!entryFocusEvent.defaultPrevented) {
					const items = getItems().map((i) => i.ref).filter((i) => i.dataset.disabled !== "");
					focusFirst([
						items.find((item) => item.getAttribute("data-active") === ""),
						items.find((item) => item.getAttribute("data-highlighted") === ""),
						items.find((item) => item.id === currentTabStopId.value),
						...items
					].filter(Boolean), props.preventScrollOnEntryFocus);
				}
			}
			isClickFocus.value = false;
		}
		function handleMouseUp() {
			setTimeout(() => {
				isClickFocus.value = false;
			}, 1);
		}
		__expose({ getItems });
		provideRovingFocusGroupContext({
			loop,
			dir,
			orientation,
			currentTabStopId,
			onItemFocus: (tabStopId) => {
				currentTabStopId.value = tabStopId;
			},
			onItemShiftTab: () => {
				isTabbingBackOut.value = true;
			},
			onFocusableItemAdd: () => {
				focusableItemsCount.value++;
			},
			onFocusableItemRemove: () => {
				focusableItemsCount.value--;
			}
		});
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(CollectionSlot), null, {
				default: withCtx(() => [createVNode(unref(Primitive), {
					tabindex: isTabbingBackOut.value || focusableItemsCount.value === 0 ? -1 : 0,
					"data-orientation": unref(orientation),
					as: _ctx.as,
					"as-child": _ctx.asChild,
					dir: unref(dir),
					style: { "outline": "none" },
					onMousedown: _cache[0] || (_cache[0] = ($event) => isClickFocus.value = true),
					onMouseup: handleMouseUp,
					onFocus: handleFocus,
					onBlur: _cache[1] || (_cache[1] = ($event) => isTabbingBackOut.value = false)
				}, {
					default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
					_: 3
				}, 8, [
					"tabindex",
					"data-orientation",
					"as",
					"as-child",
					"dir"
				])]),
				_: 3
			});
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/RovingFocus/RovingFocusItem.js
var RovingFocusItem_default = /* @__PURE__ */ defineComponent({
	__name: "RovingFocusItem",
	props: {
		tabStopId: {
			type: String,
			required: false
		},
		focusable: {
			type: Boolean,
			required: false,
			default: true
		},
		active: {
			type: Boolean,
			required: false
		},
		allowShiftKey: {
			type: Boolean,
			required: false
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false,
			default: "span"
		}
	},
	setup(__props) {
		const props = __props;
		const context = injectRovingFocusGroupContext();
		const randomId = useId();
		const id = computed(() => props.tabStopId || randomId);
		const isCurrentTabStop = computed(() => context.currentTabStopId.value === id.value);
		const { getItems, CollectionItem } = useCollection();
		onMounted(() => {
			if (props.focusable) context.onFocusableItemAdd();
		});
		onUnmounted(() => {
			if (props.focusable) context.onFocusableItemRemove();
		});
		function handleKeydown(event) {
			if (event.key === "Tab" && event.shiftKey) {
				context.onItemShiftTab();
				return;
			}
			if (event.target !== event.currentTarget) return;
			const focusIntent = getFocusIntent(event, context.orientation.value, context.dir.value);
			if (focusIntent !== void 0) {
				if (event.metaKey || event.ctrlKey || event.altKey || (props.allowShiftKey ? false : event.shiftKey)) return;
				event.preventDefault();
				let candidateNodes = [...getItems().map((i) => i.ref).filter((i) => i.dataset.disabled !== "")];
				if (focusIntent === "last") candidateNodes.reverse();
				else if (focusIntent === "prev" || focusIntent === "next") {
					if (focusIntent === "prev") candidateNodes.reverse();
					const currentIndex = candidateNodes.indexOf(event.currentTarget);
					candidateNodes = context.loop.value ? wrapArray(candidateNodes, currentIndex + 1) : candidateNodes.slice(currentIndex + 1);
				}
				nextTick(() => focusFirst(candidateNodes));
			}
		}
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(CollectionItem), null, {
				default: withCtx(() => [createVNode(unref(Primitive), {
					tabindex: isCurrentTabStop.value ? 0 : -1,
					"data-orientation": unref(context).orientation.value,
					"data-active": _ctx.active ? "" : void 0,
					"data-disabled": !_ctx.focusable ? "" : void 0,
					as: _ctx.as,
					"as-child": _ctx.asChild,
					onMousedown: _cache[0] || (_cache[0] = (event) => {
						if (!_ctx.focusable) event.preventDefault();
						else unref(context).onItemFocus(id.value);
					}),
					onFocus: _cache[1] || (_cache[1] = ($event) => unref(context).onItemFocus(id.value)),
					onKeydown: handleKeydown
				}, {
					default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
					_: 3
				}, 8, [
					"tabindex",
					"data-orientation",
					"data-active",
					"data-disabled",
					"as",
					"as-child"
				])]),
				_: 3
			});
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/VisuallyHidden/VisuallyHidden.js
var VisuallyHidden_default = /* @__PURE__ */ defineComponent({
	__name: "VisuallyHidden",
	props: {
		feature: {
			type: String,
			required: false,
			default: "focusable"
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false,
			default: "span"
		}
	},
	setup(__props) {
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), {
				as: _ctx.as,
				"as-child": _ctx.asChild,
				"aria-hidden": _ctx.feature === "focusable" ? "true" : void 0,
				"data-hidden": _ctx.feature === "fully-hidden" ? "" : void 0,
				tabindex: _ctx.feature === "fully-hidden" ? "-1" : void 0,
				style: {
					position: "absolute",
					border: 0,
					width: "1px",
					height: "1px",
					padding: 0,
					margin: "-1px",
					overflow: "hidden",
					clip: "rect(0, 0, 0, 0)",
					clipPath: "inset(50%)",
					whiteSpace: "nowrap",
					wordWrap: "normal",
					top: "-1px",
					left: "-1px"
				}
			}, {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 8, [
				"as",
				"as-child",
				"aria-hidden",
				"data-hidden",
				"tabindex"
			]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/VisuallyHidden/VisuallyHiddenInputBubble.js
var VisuallyHiddenInputBubble_default = /* @__PURE__ */ defineComponent({
	inheritAttrs: false,
	__name: "VisuallyHiddenInputBubble",
	props: {
		name: {
			type: String,
			required: true
		},
		value: {
			type: null,
			required: true
		},
		checked: {
			type: Boolean,
			required: false,
			default: void 0
		},
		required: {
			type: Boolean,
			required: false
		},
		disabled: {
			type: Boolean,
			required: false
		},
		feature: {
			type: String,
			required: false,
			default: "fully-hidden"
		}
	},
	setup(__props) {
		const props = __props;
		const { primitiveElement, currentElement } = usePrimitiveElement();
		const valueState = computed(() => props.checked ?? props.value);
		watch(valueState, (cur, prev) => {
			if (!currentElement.value) return;
			const input = currentElement.value;
			const inputProto = window.HTMLInputElement.prototype;
			const setValue = Object.getOwnPropertyDescriptor(inputProto, "value").set;
			if (setValue && cur !== prev) {
				const inputEvent = new Event("input", { bubbles: true });
				const changeEvent = new Event("change", { bubbles: true });
				setValue.call(input, cur);
				input.dispatchEvent(inputEvent);
				input.dispatchEvent(changeEvent);
			}
		});
		return (_ctx, _cache) => {
			return openBlock(), createBlock(VisuallyHidden_default, mergeProps({
				ref_key: "primitiveElement",
				ref: primitiveElement
			}, {
				...props,
				..._ctx.$attrs
			}, { as: "input" }), null, 16);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/VisuallyHidden/VisuallyHiddenInput.js
var VisuallyHiddenInput_default = /* @__PURE__ */ defineComponent({
	inheritAttrs: false,
	__name: "VisuallyHiddenInput",
	props: {
		name: {
			type: String,
			required: true
		},
		value: {
			type: null,
			required: true
		},
		checked: {
			type: Boolean,
			required: false,
			default: void 0
		},
		required: {
			type: Boolean,
			required: false
		},
		disabled: {
			type: Boolean,
			required: false
		},
		feature: {
			type: String,
			required: false,
			default: "fully-hidden"
		}
	},
	setup(__props) {
		const props = __props;
		const isFormArrayEmptyAndRequired = computed(() => typeof props.value === "object" && Array.isArray(props.value) && props.value.length === 0 && props.required);
		const parsedValue = computed(() => {
			if (typeof props.value === "string" || typeof props.value === "number" || typeof props.value === "boolean" || props.value === null || props.value === void 0) return [{
				name: props.name,
				value: props.value
			}];
			else if (typeof props.value === "object" && Array.isArray(props.value)) return props.value.flatMap((obj, index) => {
				if (typeof obj === "object") return Object.entries(obj).map(([key, value]) => ({
					name: `${props.name}[${index}][${key}]`,
					value
				}));
				else return {
					name: `${props.name}[${index}]`,
					value: obj
				};
			});
			else if (props.value !== null && typeof props.value === "object" && !Array.isArray(props.value)) return Object.entries(props.value).map(([key, value]) => ({
				name: `${props.name}[${key}]`,
				value
			}));
			return [];
		});
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock(Fragment, null, [createCommentVNode(" We render single input if it's required "), isFormArrayEmptyAndRequired.value ? (openBlock(), createBlock(VisuallyHiddenInputBubble_default, mergeProps({ key: _ctx.name }, {
				...props,
				..._ctx.$attrs
			}, {
				name: _ctx.name,
				value: _ctx.value
			}), null, 16, ["name", "value"])) : (openBlock(true), createElementBlock(Fragment, { key: 1 }, renderList(parsedValue.value, (parsed) => {
				return openBlock(), createBlock(VisuallyHiddenInputBubble_default, mergeProps({ key: parsed.name }, { ref_for: true }, {
					...props,
					..._ctx.$attrs
				}, {
					name: parsed.name,
					value: parsed.value
				}), null, 16, ["name", "value"]);
			}), 128))], 2112);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/Checkbox/CheckboxGroupRoot.js
var [injectCheckboxGroupRootContext, provideCheckboxGroupRootContext] = createContext("CheckboxGroupRoot");
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/Checkbox/utils.js
function isIndeterminate(checked) {
	return checked === "indeterminate";
}
function getState(checked) {
	return isIndeterminate(checked) ? "indeterminate" : checked ? "checked" : "unchecked";
}
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/Checkbox/CheckboxRoot.js
var [injectCheckboxRootContext, provideCheckboxRootContext] = createContext("CheckboxRoot");
var CheckboxRoot_default = /* @__PURE__ */ defineComponent({
	inheritAttrs: false,
	__name: "CheckboxRoot",
	props: {
		defaultValue: {
			type: [Boolean, String],
			required: false
		},
		modelValue: {
			type: [
				Boolean,
				String,
				null
			],
			required: false,
			default: void 0
		},
		disabled: {
			type: Boolean,
			required: false
		},
		value: {
			type: null,
			required: false,
			default: "on"
		},
		id: {
			type: String,
			required: false
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false,
			default: "button"
		},
		name: {
			type: String,
			required: false
		},
		required: {
			type: Boolean,
			required: false
		}
	},
	emits: ["update:modelValue"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const { forwardRef, currentElement } = useForwardExpose();
		const checkboxGroupContext = injectCheckboxGroupRootContext(null);
		const modelValue = useVModel(props, "modelValue", emits, {
			defaultValue: props.defaultValue,
			passive: props.modelValue === void 0
		});
		const disabled = computed(() => checkboxGroupContext?.disabled.value || props.disabled);
		const checkboxState = computed(() => {
			if (!isNullish(checkboxGroupContext?.modelValue.value)) return isValueEqualOrExist(checkboxGroupContext.modelValue.value, props.value);
			else return modelValue.value === "indeterminate" ? "indeterminate" : modelValue.value;
		});
		function handleClick() {
			if (!isNullish(checkboxGroupContext?.modelValue.value)) {
				const modelValueArray = [...checkboxGroupContext.modelValue.value || []];
				if (isValueEqualOrExist(modelValueArray, props.value)) {
					const index = modelValueArray.findIndex((i) => isEqual(i, props.value));
					modelValueArray.splice(index, 1);
				} else modelValueArray.push(props.value);
				checkboxGroupContext.modelValue.value = modelValueArray;
			} else modelValue.value = isIndeterminate(modelValue.value) ? true : !modelValue.value;
		}
		const isFormControl = useFormControl(currentElement);
		const ariaLabel = computed(() => props.id && currentElement.value ? document.querySelector(`[for="${props.id}"]`)?.innerText : void 0);
		provideCheckboxRootContext({
			disabled,
			state: checkboxState
		});
		return (_ctx, _cache) => {
			return openBlock(), createBlock(resolveDynamicComponent(unref(checkboxGroupContext)?.rovingFocus.value ? unref(RovingFocusItem_default) : unref(Primitive)), mergeProps(_ctx.$attrs, {
				id: _ctx.id,
				ref: unref(forwardRef),
				role: "checkbox",
				"as-child": _ctx.asChild,
				as: _ctx.as,
				type: _ctx.as === "button" ? "button" : void 0,
				"aria-checked": unref(isIndeterminate)(checkboxState.value) ? "mixed" : checkboxState.value,
				"aria-required": _ctx.required,
				"aria-label": _ctx.$attrs["aria-label"] || ariaLabel.value,
				"data-state": unref(getState)(checkboxState.value),
				"data-disabled": disabled.value ? "" : void 0,
				disabled: disabled.value,
				focusable: unref(checkboxGroupContext)?.rovingFocus.value ? !disabled.value : void 0,
				onKeydown: withKeys(withModifiers(() => {}, ["prevent"]), ["enter"]),
				onClick: handleClick
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", {
					modelValue: unref(modelValue),
					state: checkboxState.value
				}), unref(isFormControl) && _ctx.name && !unref(checkboxGroupContext) ? (openBlock(), createBlock(unref(VisuallyHiddenInput_default), {
					key: 0,
					type: "checkbox",
					checked: !!checkboxState.value,
					name: _ctx.name,
					value: _ctx.value,
					disabled: disabled.value,
					required: _ctx.required
				}, null, 8, [
					"checked",
					"name",
					"value",
					"disabled",
					"required"
				])) : createCommentVNode("v-if", true)]),
				_: 3
			}, 16, [
				"id",
				"as-child",
				"as",
				"type",
				"aria-checked",
				"aria-required",
				"aria-label",
				"data-state",
				"data-disabled",
				"disabled",
				"focusable",
				"onKeydown"
			]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/Checkbox/CheckboxIndicator.js
var CheckboxIndicator_default = /* @__PURE__ */ defineComponent({
	__name: "CheckboxIndicator",
	props: {
		forceMount: {
			type: Boolean,
			required: false
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false,
			default: "span"
		}
	},
	setup(__props) {
		const { forwardRef } = useForwardExpose();
		const rootContext = injectCheckboxRootContext();
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Presence_default), { present: _ctx.forceMount || unref(isIndeterminate)(unref(rootContext).state.value) || unref(rootContext).state.value === true }, {
				default: withCtx(() => [createVNode(unref(Primitive), mergeProps({
					ref: unref(forwardRef),
					"data-state": unref(getState)(unref(rootContext).state.value),
					"data-disabled": unref(rootContext).disabled.value ? "" : void 0,
					style: { pointerEvents: "none" },
					"as-child": _ctx.asChild,
					as: _ctx.as
				}, _ctx.$attrs), {
					default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
					_: 3
				}, 16, [
					"data-state",
					"data-disabled",
					"as-child",
					"as"
				])]),
				_: 3
			}, 8, ["present"]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/Popper/PopperRoot.js
var [injectPopperRootContext, providePopperRootContext] = createContext("PopperRoot");
var PopperRoot_default = /* @__PURE__ */ defineComponent({
	inheritAttrs: false,
	__name: "PopperRoot",
	setup(__props) {
		const anchor = ref();
		providePopperRootContext({
			anchor,
			onAnchorChange: (element) => anchor.value = element
		});
		return (_ctx, _cache) => {
			return renderSlot(_ctx.$slots, "default");
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/Popper/PopperAnchor.js
var PopperAnchor_default = /* @__PURE__ */ defineComponent({
	__name: "PopperAnchor",
	props: {
		reference: {
			type: null,
			required: false
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false
		}
	},
	setup(__props) {
		const props = __props;
		const { forwardRef, currentElement } = useForwardExpose();
		const rootContext = injectPopperRootContext();
		watchPostEffect(() => {
			rootContext.onAnchorChange(props.reference ?? currentElement.value);
		});
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), {
				ref: unref(forwardRef),
				as: _ctx.as,
				"as-child": _ctx.asChild
			}, {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 8, ["as", "as-child"]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/component/Arrow.js
var _hoisted_1$2 = {
	key: 0,
	d: "M0 0L6 6L12 0"
};
var _hoisted_2 = {
	key: 1,
	d: "M0 0L4.58579 4.58579C5.36683 5.36683 6.63316 5.36684 7.41421 4.58579L12 0"
};
var Arrow_default = /* @__PURE__ */ defineComponent({
	__name: "Arrow",
	props: {
		width: {
			type: Number,
			required: false,
			default: 10
		},
		height: {
			type: Number,
			required: false,
			default: 5
		},
		rounded: {
			type: Boolean,
			required: false
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false,
			default: "svg"
		}
	},
	setup(__props) {
		const props = __props;
		useForwardExpose();
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), mergeProps(props, {
				width: _ctx.width,
				height: _ctx.height,
				viewBox: _ctx.asChild ? void 0 : "0 0 12 6",
				preserveAspectRatio: _ctx.asChild ? void 0 : "none"
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", {}, () => [!_ctx.rounded ? (openBlock(), createElementBlock("path", _hoisted_1$2)) : (openBlock(), createElementBlock("path", _hoisted_2))])]),
				_: 3
			}, 16, [
				"width",
				"height",
				"viewBox",
				"preserveAspectRatio"
			]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/Popper/utils.js
function isNotNull(value) {
	return value !== null;
}
function transformOrigin(options) {
	return {
		name: "transformOrigin",
		options,
		fn(data) {
			const { placement, rects, middlewareData } = data;
			const isArrowHidden = middlewareData.arrow?.centerOffset !== 0;
			const arrowWidth = isArrowHidden ? 0 : options.arrowWidth;
			const arrowHeight = isArrowHidden ? 0 : options.arrowHeight;
			const [placedSide, placedAlign] = getSideAndAlignFromPlacement(placement);
			const noArrowAlign = {
				start: "0%",
				center: "50%",
				end: "100%"
			}[placedAlign];
			const arrowXCenter = (middlewareData.arrow?.x ?? 0) + arrowWidth / 2;
			const arrowYCenter = (middlewareData.arrow?.y ?? 0) + arrowHeight / 2;
			let x = "";
			let y = "";
			if (placedSide === "bottom") {
				x = isArrowHidden ? noArrowAlign : `${arrowXCenter}px`;
				y = `${-arrowHeight}px`;
			} else if (placedSide === "top") {
				x = isArrowHidden ? noArrowAlign : `${arrowXCenter}px`;
				y = `${rects.floating.height + arrowHeight}px`;
			} else if (placedSide === "right") {
				x = `${-arrowHeight}px`;
				y = isArrowHidden ? noArrowAlign : `${arrowYCenter}px`;
			} else if (placedSide === "left") {
				x = `${rects.floating.width + arrowHeight}px`;
				y = isArrowHidden ? noArrowAlign : `${arrowYCenter}px`;
			}
			return { data: {
				x,
				y
			} };
		}
	};
}
function getSideAndAlignFromPlacement(placement) {
	const [side, align = "center"] = placement.split("-");
	return [side, align];
}
//#endregion
//#region node_modules/.pnpm/@floating-ui+utils@0.2.12/node_modules/@floating-ui/utils/dist/floating-ui.utils.mjs
/**
* Custom positioning reference element.
* @see https://floating-ui.com/docs/virtual-elements
*/
var sides = [
	"top",
	"right",
	"bottom",
	"left"
];
var min = Math.min;
var max = Math.max;
var round = Math.round;
var floor = Math.floor;
var createCoords = (v) => ({
	x: v,
	y: v
});
var oppositeSideMap = {
	left: "right",
	right: "left",
	bottom: "top",
	top: "bottom"
};
function clamp(start, value, end) {
	return max(start, min(value, end));
}
function evaluate(value, param) {
	return typeof value === "function" ? value(param) : value;
}
function getSide(placement) {
	return placement.split("-")[0];
}
function getAlignment(placement) {
	return placement.split("-")[1];
}
function getOppositeAxis(axis) {
	return axis === "x" ? "y" : "x";
}
function getAxisLength(axis) {
	return axis === "y" ? "height" : "width";
}
function getSideAxis(placement) {
	const firstChar = placement[0];
	return firstChar === "t" || firstChar === "b" ? "y" : "x";
}
function getAlignmentAxis(placement) {
	return getOppositeAxis(getSideAxis(placement));
}
function getAlignmentSides(placement, rects, rtl) {
	if (rtl === void 0) rtl = false;
	const alignment = getAlignment(placement);
	const alignmentAxis = getAlignmentAxis(placement);
	const length = getAxisLength(alignmentAxis);
	let mainAlignmentSide = alignmentAxis === "x" ? alignment === (rtl ? "end" : "start") ? "right" : "left" : alignment === "start" ? "bottom" : "top";
	if (rects.reference[length] > rects.floating[length]) mainAlignmentSide = getOppositePlacement(mainAlignmentSide);
	return [mainAlignmentSide, getOppositePlacement(mainAlignmentSide)];
}
function getExpandedPlacements(placement) {
	const oppositePlacement = getOppositePlacement(placement);
	return [
		getOppositeAlignmentPlacement(placement),
		oppositePlacement,
		getOppositeAlignmentPlacement(oppositePlacement)
	];
}
function getOppositeAlignmentPlacement(placement) {
	return placement.includes("start") ? placement.replace("start", "end") : placement.replace("end", "start");
}
var lrPlacement = ["left", "right"];
var rlPlacement = ["right", "left"];
var tbPlacement = ["top", "bottom"];
var btPlacement = ["bottom", "top"];
function getSideList(side, isStart, rtl) {
	switch (side) {
		case "top":
		case "bottom":
			if (rtl) return isStart ? rlPlacement : lrPlacement;
			return isStart ? lrPlacement : rlPlacement;
		case "left":
		case "right": return isStart ? tbPlacement : btPlacement;
		default: return [];
	}
}
function getOppositeAxisPlacements(placement, flipAlignment, direction, rtl) {
	const alignment = getAlignment(placement);
	let list = getSideList(getSide(placement), direction === "start", rtl);
	if (alignment) {
		list = list.map((side) => side + "-" + alignment);
		if (flipAlignment) list = list.concat(list.map(getOppositeAlignmentPlacement));
	}
	return list;
}
function getOppositePlacement(placement) {
	const side = getSide(placement);
	return oppositeSideMap[side] + placement.slice(side.length);
}
function expandPaddingObject(padding) {
	var _padding$top;
	var _padding$right;
	var _padding$bottom;
	var _padding$left;
	return {
		top: (_padding$top = padding.top) != null ? _padding$top : 0,
		right: (_padding$right = padding.right) != null ? _padding$right : 0,
		bottom: (_padding$bottom = padding.bottom) != null ? _padding$bottom : 0,
		left: (_padding$left = padding.left) != null ? _padding$left : 0
	};
}
function getPaddingObject(padding) {
	return typeof padding !== "number" ? expandPaddingObject(padding) : {
		top: padding,
		right: padding,
		bottom: padding,
		left: padding
	};
}
function rectToClientRect(rect) {
	const { x, y, width, height } = rect;
	return {
		width,
		height,
		top: y,
		left: x,
		right: x + width,
		bottom: y + height,
		x,
		y
	};
}
//#endregion
//#region node_modules/.pnpm/@floating-ui+core@1.8.0/node_modules/@floating-ui/core/dist/floating-ui.core.mjs
function computeCoordsFromPlacement(_ref, placement, rtl) {
	let { reference, floating } = _ref;
	const sideAxis = getSideAxis(placement);
	const alignmentAxis = getAlignmentAxis(placement);
	const alignLength = getAxisLength(alignmentAxis);
	const side = getSide(placement);
	const isVertical = sideAxis === "y";
	const commonX = reference.x + reference.width / 2 - floating.width / 2;
	const commonY = reference.y + reference.height / 2 - floating.height / 2;
	const commonAlign = reference[alignLength] / 2 - floating[alignLength] / 2;
	let coords;
	switch (side) {
		case "top":
			coords = {
				x: commonX,
				y: reference.y - floating.height
			};
			break;
		case "bottom":
			coords = {
				x: commonX,
				y: reference.y + reference.height
			};
			break;
		case "right":
			coords = {
				x: reference.x + reference.width,
				y: commonY
			};
			break;
		case "left":
			coords = {
				x: reference.x - floating.width,
				y: commonY
			};
			break;
		default: coords = {
			x: reference.x,
			y: reference.y
		};
	}
	const alignment = getAlignment(placement);
	if (alignment) coords[alignmentAxis] += commonAlign * (alignment === "end" ? 1 : -1) * (rtl && isVertical ? -1 : 1);
	return coords;
}
/**
* Resolves with an object of overflow side offsets that determine how much the
* element is overflowing a given clipping boundary on each side.
* - positive = overflowing the boundary by that number of pixels
* - negative = how many pixels left before it will overflow
* - 0 = lies flush with the boundary
* @see https://floating-ui.com/docs/detectOverflow
*/
async function detectOverflow(state, options) {
	var _await$platform$isEle;
	if (options === void 0) options = {};
	const { x, y, platform, rects, elements, strategy } = state;
	const { boundary = "clippingAncestors", rootBoundary = "viewport", elementContext = "floating", altBoundary = false, padding = 0 } = evaluate(options, state);
	const paddingObject = getPaddingObject(padding);
	const element = elements[altBoundary ? elementContext === "floating" ? "reference" : "floating" : elementContext];
	const clippingClientRect = rectToClientRect(await platform.getClippingRect({
		element: ((_await$platform$isEle = await (platform.isElement == null ? void 0 : platform.isElement(element))) != null ? _await$platform$isEle : true) ? element : element.contextElement || await (platform.getDocumentElement == null ? void 0 : platform.getDocumentElement(elements.floating)),
		boundary,
		rootBoundary,
		strategy
	}));
	const rect = elementContext === "floating" ? {
		x,
		y,
		width: rects.floating.width,
		height: rects.floating.height
	} : rects.reference;
	const offsetParent = await (platform.getOffsetParent == null ? void 0 : platform.getOffsetParent(elements.floating));
	const offsetScale = await (platform.isElement == null ? void 0 : platform.isElement(offsetParent)) && await (platform.getScale == null ? void 0 : platform.getScale(offsetParent)) || {
		x: 1,
		y: 1
	};
	const elementClientRect = rectToClientRect(platform.convertOffsetParentRelativeRectToViewportRelativeRect ? await platform.convertOffsetParentRelativeRectToViewportRelativeRect({
		elements,
		rect,
		offsetParent,
		strategy
	}) : rect);
	return {
		top: (clippingClientRect.top - elementClientRect.top + paddingObject.top) / offsetScale.y,
		bottom: (elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom) / offsetScale.y,
		left: (clippingClientRect.left - elementClientRect.left + paddingObject.left) / offsetScale.x,
		right: (elementClientRect.right - clippingClientRect.right + paddingObject.right) / offsetScale.x
	};
}
var MAX_RESET_COUNT = 50;
/**
* Computes the `x` and `y` coordinates that will place the floating element
* next to a given reference element.
*
* This export does not have any `platform` interface logic. You will need to
* write one for the platform you are using Floating UI with.
*/
var computePosition$1 = /* @__PURE__ */ __name(async (reference, floating, config) => {
	const { placement = "bottom", strategy = "absolute", middleware = [], platform } = config;
	const platformWithDetectOverflow = platform.detectOverflow ? platform : {
		...platform,
		detectOverflow
	};
	const rtl = await (platform.isRTL == null ? void 0 : platform.isRTL(floating));
	let rects = await platform.getElementRects({
		reference,
		floating,
		strategy
	});
	let { x, y } = computeCoordsFromPlacement(rects, placement, rtl);
	let statefulPlacement = placement;
	let resetCount = 0;
	const middlewareData = {};
	for (let i = 0; i < middleware.length; i++) {
		const currentMiddleware = middleware[i];
		if (!currentMiddleware) continue;
		const { name, fn } = currentMiddleware;
		const { x: nextX, y: nextY, data, reset } = await fn({
			x,
			y,
			initialPlacement: placement,
			placement: statefulPlacement,
			strategy,
			middlewareData,
			rects,
			platform: platformWithDetectOverflow,
			elements: {
				reference,
				floating
			}
		});
		x = nextX != null ? nextX : x;
		y = nextY != null ? nextY : y;
		middlewareData[name] = {
			...middlewareData[name],
			...data
		};
		if (reset && resetCount < MAX_RESET_COUNT) {
			resetCount++;
			if (typeof reset === "object") {
				if (reset.placement) statefulPlacement = reset.placement;
				if (reset.rects) rects = reset.rects === true ? await platform.getElementRects({
					reference,
					floating,
					strategy
				}) : reset.rects;
				({x, y} = computeCoordsFromPlacement(rects, statefulPlacement, rtl));
			}
			i = -1;
		}
	}
	return {
		x,
		y,
		placement: statefulPlacement,
		strategy,
		middlewareData
	};
}, "computePosition");
/**
* Provides data to position an inner element of the floating element so that it
* appears centered to the reference element.
* @see https://floating-ui.com/docs/arrow
*/
var arrow$2 = /* @__PURE__ */ __name((options) => ({
	name: "arrow",
	options,
	async fn(state) {
		const { x, y, placement, rects, platform, elements, middlewareData } = state;
		const { element, padding = 0 } = evaluate(options, state) || {};
		if (element == null) return {};
		const paddingObject = getPaddingObject(padding);
		const coords = {
			x,
			y
		};
		const axis = getAlignmentAxis(placement);
		const length = getAxisLength(axis);
		const arrowDimensions = await platform.getDimensions(element);
		const isYAxis = axis === "y";
		const minProp = isYAxis ? "top" : "left";
		const maxProp = isYAxis ? "bottom" : "right";
		const clientProp = isYAxis ? "clientHeight" : "clientWidth";
		const endDiff = rects.reference[length] + rects.reference[axis] - coords[axis] - rects.floating[length];
		const startDiff = coords[axis] - rects.reference[axis];
		const arrowOffsetParent = await (platform.getOffsetParent == null ? void 0 : platform.getOffsetParent(element));
		let clientSize = arrowOffsetParent ? arrowOffsetParent[clientProp] : 0;
		if (!clientSize || !await (platform.isElement == null ? void 0 : platform.isElement(arrowOffsetParent))) clientSize = elements.floating[clientProp] || rects.floating[length];
		const centerToReference = endDiff / 2 - startDiff / 2;
		const largestPossiblePadding = clientSize / 2 - arrowDimensions[length] / 2 - 1;
		const minPadding = min(paddingObject[minProp], largestPossiblePadding);
		const maxPadding = min(paddingObject[maxProp], largestPossiblePadding);
		const max = clientSize - arrowDimensions[length] - maxPadding;
		const center = clientSize / 2 - arrowDimensions[length] / 2 + centerToReference;
		const offset = clamp(minPadding, center, max);
		const shouldAddOffset = !middlewareData.arrow && getAlignment(placement) != null && center !== offset && rects.reference[length] / 2 - (center < minPadding ? minPadding : maxPadding) - arrowDimensions[length] / 2 < 0;
		const alignmentOffset = shouldAddOffset ? center < minPadding ? center - minPadding : center - max : 0;
		return {
			[axis]: coords[axis] + alignmentOffset,
			data: {
				[axis]: offset,
				centerOffset: center - offset - alignmentOffset,
				...shouldAddOffset && { alignmentOffset }
			},
			reset: shouldAddOffset
		};
	}
}), "arrow");
/**
* Optimizes the visibility of the floating element by flipping the `placement`
* in order to keep it in view when the preferred placement(s) will overflow the
* clipping boundary. Alternative to `autoPlacement`.
* @see https://floating-ui.com/docs/flip
*/
var flip$1 = /* @__PURE__ */ __name(function(options) {
	if (options === void 0) options = {};
	return {
		name: "flip",
		options,
		async fn(state) {
			var _middlewareData$arrow;
			var _middlewareData$flip;
			const { placement, middlewareData, rects, initialPlacement, platform, elements } = state;
			const { mainAxis: checkMainAxis = true, crossAxis: checkCrossAxis = true, fallbackPlacements: specifiedFallbackPlacements, fallbackStrategy = "bestFit", fallbackAxisSideDirection = "none", flipAlignment = true, ...detectOverflowOptions } = evaluate(options, state);
			if ((_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) return {};
			const side = getSide(placement);
			const initialSideAxis = getSideAxis(initialPlacement);
			const isBasePlacement = getSide(initialPlacement) === initialPlacement;
			const rtl = await (platform.isRTL == null ? void 0 : platform.isRTL(elements.floating));
			const fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipAlignment ? [getOppositePlacement(initialPlacement)] : getExpandedPlacements(initialPlacement));
			const hasFallbackAxisSideDirection = fallbackAxisSideDirection !== "none";
			if (!specifiedFallbackPlacements && hasFallbackAxisSideDirection) fallbackPlacements.push(...getOppositeAxisPlacements(initialPlacement, flipAlignment, fallbackAxisSideDirection, rtl));
			const placements = [initialPlacement, ...fallbackPlacements];
			const overflow = await platform.detectOverflow(state, detectOverflowOptions);
			const overflows = [];
			let overflowsData = ((_middlewareData$flip = middlewareData.flip) == null ? void 0 : _middlewareData$flip.overflows) || [];
			if (checkMainAxis) overflows.push(overflow[side]);
			if (checkCrossAxis) {
				const sides = getAlignmentSides(placement, rects, rtl);
				overflows.push(overflow[sides[0]], overflow[sides[1]]);
			}
			overflowsData = [...overflowsData, {
				placement,
				overflows
			}];
			if (!overflows.every((side) => side <= 0)) {
				var _middlewareData$flip2;
				var _overflowsData$filter;
				const nextIndex = (((_middlewareData$flip2 = middlewareData.flip) == null ? void 0 : _middlewareData$flip2.index) || 0) + 1;
				const nextPlacement = placements[nextIndex];
				if (nextPlacement) {
					if (!(checkCrossAxis === "alignment" ? initialSideAxis !== getSideAxis(nextPlacement) : false) || overflowsData.every((d) => getSideAxis(d.placement) === initialSideAxis ? d.overflows[0] > 0 : true)) return {
						data: {
							index: nextIndex,
							overflows: overflowsData
						},
						reset: { placement: nextPlacement }
					};
				}
				let resetPlacement = (_overflowsData$filter = overflowsData.filter((d) => d.overflows[0] <= 0).sort((a, b) => a.overflows[1] - b.overflows[1])[0]) == null ? void 0 : _overflowsData$filter.placement;
				if (!resetPlacement) switch (fallbackStrategy) {
					case "bestFit": {
						var _overflowsData$filter2;
						const placement = (_overflowsData$filter2 = overflowsData.filter((d) => {
							if (hasFallbackAxisSideDirection) {
								const currentSideAxis = getSideAxis(d.placement);
								return currentSideAxis === initialSideAxis || currentSideAxis === "y";
							}
							return true;
						}).map((d) => [d.placement, d.overflows.filter((overflow) => overflow > 0).reduce((acc, overflow) => acc + overflow, 0)]).sort((a, b) => a[1] - b[1])[0]) == null ? void 0 : _overflowsData$filter2[0];
						if (placement) resetPlacement = placement;
						break;
					}
					case "initialPlacement": resetPlacement = initialPlacement;
				}
				if (placement !== resetPlacement) return { reset: { placement: resetPlacement } };
			}
			return {};
		}
	};
}, "flip");
function getSideOffsets(overflow, rect) {
	return {
		top: overflow.top - rect.height,
		right: overflow.right - rect.width,
		bottom: overflow.bottom - rect.height,
		left: overflow.left - rect.width
	};
}
function isAnySideFullyClipped(overflow) {
	return sides.some((side) => overflow[side] >= 0);
}
/**
* Provides data to hide the floating element in applicable situations, such as
* when it is not in the same clipping context as the reference element.
* @see https://floating-ui.com/docs/hide
*/
var hide$1 = /* @__PURE__ */ __name(function(options) {
	if (options === void 0) options = {};
	return {
		name: "hide",
		options,
		async fn(state) {
			const { rects, platform } = state;
			const { strategy = "referenceHidden", ...detectOverflowOptions } = evaluate(options, state);
			switch (strategy) {
				case "referenceHidden": {
					const offsets = getSideOffsets(await platform.detectOverflow(state, {
						...detectOverflowOptions,
						elementContext: "reference"
					}), rects.reference);
					return { data: {
						referenceHiddenOffsets: offsets,
						referenceHidden: isAnySideFullyClipped(offsets)
					} };
				}
				case "escaped": {
					const offsets = getSideOffsets(await platform.detectOverflow(state, {
						...detectOverflowOptions,
						altBoundary: true
					}), rects.floating);
					return { data: {
						escapedOffsets: offsets,
						escaped: isAnySideFullyClipped(offsets)
					} };
				}
				default: return {};
			}
		}
	};
}, "hide");
var originSides = /*#__PURE__*/ new Set(["left", "top"]);
async function convertValueToCoords(state, options) {
	const { placement, platform, elements } = state;
	const rtl = await (platform.isRTL == null ? void 0 : platform.isRTL(elements.floating));
	const side = getSide(placement);
	const alignment = getAlignment(placement);
	const isVertical = getSideAxis(placement) === "y";
	const mainAxisMulti = originSides.has(side) ? -1 : 1;
	const crossAxisMulti = rtl && isVertical ? -1 : 1;
	const rawValue = evaluate(options, state);
	let { mainAxis, crossAxis, alignmentAxis } = typeof rawValue === "number" ? {
		mainAxis: rawValue,
		crossAxis: 0,
		alignmentAxis: null
	} : {
		mainAxis: rawValue.mainAxis || 0,
		crossAxis: rawValue.crossAxis || 0,
		alignmentAxis: rawValue.alignmentAxis
	};
	if (alignment && typeof alignmentAxis === "number") crossAxis = alignment === "end" ? alignmentAxis * -1 : alignmentAxis;
	return isVertical ? {
		x: crossAxis * crossAxisMulti,
		y: mainAxis * mainAxisMulti
	} : {
		x: mainAxis * mainAxisMulti,
		y: crossAxis * crossAxisMulti
	};
}
/**
* Modifies the placement by translating the floating element along the
* specified axes.
* A number (shorthand for `mainAxis` or distance), or an axes configuration
* object may be passed.
* @see https://floating-ui.com/docs/offset
*/
var offset$1 = /* @__PURE__ */ __name(function(options) {
	if (options === void 0) options = 0;
	return {
		name: "offset",
		options,
		async fn(state) {
			var _middlewareData$offse;
			var _middlewareData$arrow;
			const { x, y, placement, middlewareData } = state;
			const diffCoords = await convertValueToCoords(state, options);
			if (placement === ((_middlewareData$offse = middlewareData.offset) == null ? void 0 : _middlewareData$offse.placement) && (_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) return {};
			return {
				x: x + diffCoords.x,
				y: y + diffCoords.y,
				data: {
					...diffCoords,
					placement
				}
			};
		}
	};
}, "offset");
/**
* Optimizes the visibility of the floating element by shifting it in order to
* keep it in view when it will overflow the clipping boundary.
* @see https://floating-ui.com/docs/shift
*/
var shift$1 = /* @__PURE__ */ __name(function(options) {
	if (options === void 0) options = {};
	return {
		name: "shift",
		options,
		async fn(state) {
			const { x, y, placement, platform } = state;
			const { mainAxis: checkMainAxis = true, crossAxis: checkCrossAxis = false, limiter = { fn: (_ref) => {
				let { x, y } = _ref;
				return {
					x,
					y
				};
			} }, ...detectOverflowOptions } = evaluate(options, state);
			const coords = {
				x,
				y
			};
			const overflow = await platform.detectOverflow(state, detectOverflowOptions);
			const crossAxis = getSideAxis(placement);
			const mainAxis = getOppositeAxis(crossAxis);
			let mainAxisCoord = coords[mainAxis];
			let crossAxisCoord = coords[crossAxis];
			const clampCoord = (axis, coord) => clamp(coord + overflow[axis === "y" ? "top" : "left"], coord, coord - overflow[axis === "y" ? "bottom" : "right"]);
			if (checkMainAxis) mainAxisCoord = clampCoord(mainAxis, mainAxisCoord);
			if (checkCrossAxis) crossAxisCoord = clampCoord(crossAxis, crossAxisCoord);
			const limitedCoords = limiter.fn({
				...state,
				[mainAxis]: mainAxisCoord,
				[crossAxis]: crossAxisCoord
			});
			return {
				...limitedCoords,
				data: {
					x: limitedCoords.x - x,
					y: limitedCoords.y - y,
					enabled: {
						[mainAxis]: checkMainAxis,
						[crossAxis]: checkCrossAxis
					}
				}
			};
		}
	};
}, "shift");
/**
* Built-in `limiter` that will stop `shift()` at a certain point.
*/
var limitShift$1 = /* @__PURE__ */ __name(function(options) {
	if (options === void 0) options = {};
	return {
		options,
		fn(state) {
			var _rawOffset$mainAxis;
			var _rawOffset$crossAxis;
			const { x, y, placement, rects, middlewareData } = state;
			const { offset = 0, mainAxis: checkMainAxis = true, crossAxis: checkCrossAxis = true } = evaluate(options, state);
			const coords = {
				x,
				y
			};
			const crossAxis = getSideAxis(placement);
			const mainAxis = getOppositeAxis(crossAxis);
			let mainAxisCoord = coords[mainAxis];
			let crossAxisCoord = coords[crossAxis];
			const rawOffset = evaluate(offset, state);
			const computedOffset = typeof rawOffset === "number" ? {
				mainAxis: rawOffset,
				crossAxis: 0
			} : {
				mainAxis: (_rawOffset$mainAxis = rawOffset.mainAxis) != null ? _rawOffset$mainAxis : 0,
				crossAxis: (_rawOffset$crossAxis = rawOffset.crossAxis) != null ? _rawOffset$crossAxis : 0
			};
			if (checkMainAxis) {
				const len = mainAxis === "y" ? "height" : "width";
				const limitMin = rects.reference[mainAxis] - rects.floating[len] + computedOffset.mainAxis;
				const limitMax = rects.reference[mainAxis] + rects.reference[len] - computedOffset.mainAxis;
				if (mainAxisCoord < limitMin) mainAxisCoord = limitMin;
				else if (mainAxisCoord > limitMax) mainAxisCoord = limitMax;
			}
			if (checkCrossAxis) {
				var _middlewareData$offse;
				var _middlewareData$offse2;
				const len = mainAxis === "y" ? "width" : "height";
				const isOriginSide = originSides.has(getSide(placement));
				const limitMin = rects.reference[crossAxis] - rects.floating[len] + (isOriginSide ? ((_middlewareData$offse = middlewareData.offset) == null ? void 0 : _middlewareData$offse[crossAxis]) || 0 : 0) + (isOriginSide ? 0 : computedOffset.crossAxis);
				const limitMax = rects.reference[crossAxis] + rects.reference[len] + (isOriginSide ? 0 : ((_middlewareData$offse2 = middlewareData.offset) == null ? void 0 : _middlewareData$offse2[crossAxis]) || 0) - (isOriginSide ? computedOffset.crossAxis : 0);
				if (crossAxisCoord < limitMin) crossAxisCoord = limitMin;
				else if (crossAxisCoord > limitMax) crossAxisCoord = limitMax;
			}
			return {
				[mainAxis]: mainAxisCoord,
				[crossAxis]: crossAxisCoord
			};
		}
	};
}, "limitShift");
/**
* Provides data that allows you to change the size of the floating element —
* for instance, prevent it from overflowing the clipping boundary or match the
* width of the reference element.
* @see https://floating-ui.com/docs/size
*/
var size$1 = /* @__PURE__ */ __name(function(options) {
	if (options === void 0) options = {};
	return {
		name: "size",
		options,
		async fn(state) {
			const { placement, rects, platform, elements } = state;
			const { apply = () => {}, ...detectOverflowOptions } = evaluate(options, state);
			const overflow = await platform.detectOverflow(state, detectOverflowOptions);
			const side = getSide(placement);
			const alignment = getAlignment(placement);
			const isYAxis = getSideAxis(placement) === "y";
			const { width, height } = rects.floating;
			let heightSide;
			let widthSide;
			if (side === "top" || side === "bottom") {
				heightSide = side;
				widthSide = alignment === (await (platform.isRTL == null ? void 0 : platform.isRTL(elements.floating)) ? "start" : "end") ? "left" : "right";
			} else {
				widthSide = side;
				heightSide = alignment === "end" ? "top" : "bottom";
			}
			const maximumClippingHeight = height - overflow.top - overflow.bottom;
			const maximumClippingWidth = width - overflow.left - overflow.right;
			const overflowAvailableHeight = min(height - overflow[heightSide], maximumClippingHeight);
			const overflowAvailableWidth = min(width - overflow[widthSide], maximumClippingWidth);
			const shiftData = state.middlewareData.shift;
			const noShift = !shiftData;
			let availableHeight = overflowAvailableHeight;
			let availableWidth = overflowAvailableWidth;
			if (shiftData != null && shiftData.enabled.x) availableWidth = maximumClippingWidth;
			if (shiftData != null && shiftData.enabled.y) availableHeight = maximumClippingHeight;
			if (noShift && !alignment) {
				if (isYAxis) availableWidth = width - 2 * max(overflow.left, overflow.right);
				else availableHeight = height - 2 * max(overflow.top, overflow.bottom);
			}
			await apply({
				...state,
				availableWidth,
				availableHeight
			});
			const nextDimensions = await platform.getDimensions(elements.floating);
			if (width !== nextDimensions.width || height !== nextDimensions.height) return { reset: { rects: true } };
			return {};
		}
	};
}, "size");
//#endregion
//#region node_modules/.pnpm/@floating-ui+utils@0.2.12/node_modules/@floating-ui/utils/dist/floating-ui.utils.dom.mjs
function hasWindow() {
	return typeof window !== "undefined";
}
function getNodeName(node) {
	if (isNode(node)) return (node.nodeName || "").toLowerCase();
	return "#document";
}
function getWindow(node) {
	var _node$ownerDocument;
	return (node == null || (_node$ownerDocument = node.ownerDocument) == null ? void 0 : _node$ownerDocument.defaultView) || window;
}
function getDocumentElement(node) {
	var _ref;
	return (_ref = (isNode(node) ? node.ownerDocument : node.document) || window.document) == null ? void 0 : _ref.documentElement;
}
function isNode(value) {
	if (!hasWindow()) return false;
	return value instanceof Node || value instanceof getWindow(value).Node;
}
function isElement(value) {
	if (!hasWindow()) return false;
	return value instanceof Element || value instanceof getWindow(value).Element;
}
function isHTMLElement(value) {
	if (!hasWindow()) return false;
	return value instanceof HTMLElement || value instanceof getWindow(value).HTMLElement;
}
function isShadowRoot(value) {
	if (!hasWindow() || typeof ShadowRoot === "undefined") return false;
	return value instanceof ShadowRoot || value instanceof getWindow(value).ShadowRoot;
}
function isOverflowElement(element) {
	const { overflow, overflowX, overflowY, display } = getComputedStyle$1(element);
	return /auto|scroll|overlay|hidden|clip/.test(overflow + overflowY + overflowX) && display !== "inline" && display !== "contents";
}
function isTableElement(element) {
	return /^(table|td|th)$/.test(getNodeName(element));
}
function isTopLayer(element) {
	try {
		if (element.matches(":popover-open")) return true;
	} catch (_e) {}
	try {
		return element.matches(":modal");
	} catch (_e) {
		return false;
	}
}
var willChangeRe = /transform|translate|scale|rotate|perspective|filter/;
var containRe = /paint|layout|strict|content/;
var isNotNone = (value) => !!value && value !== "none";
var isWebKitValue;
function isContainingBlock(elementOrCss) {
	const css = isElement(elementOrCss) ? getComputedStyle$1(elementOrCss) : elementOrCss;
	return isNotNone(css.transform) || isNotNone(css.translate) || isNotNone(css.scale) || isNotNone(css.rotate) || isNotNone(css.perspective) || !isWebKit() && (isNotNone(css.backdropFilter) || isNotNone(css.filter)) || willChangeRe.test(css.willChange || "") || containRe.test(css.contain || "");
}
function getContainingBlock(element) {
	let currentNode = getParentNode(element);
	while (isHTMLElement(currentNode) && !isLastTraversableNode(currentNode)) {
		if (isContainingBlock(currentNode)) return currentNode;
		else if (isTopLayer(currentNode)) return null;
		currentNode = getParentNode(currentNode);
	}
	return null;
}
function isWebKit() {
	if (isWebKitValue == null) isWebKitValue = typeof CSS !== "undefined" && CSS.supports && CSS.supports("-webkit-backdrop-filter", "none");
	return isWebKitValue;
}
function isLastTraversableNode(node) {
	return /^(html|body|#document)$/.test(getNodeName(node));
}
function getComputedStyle$1(element) {
	return getWindow(element).getComputedStyle(element);
}
__name(getComputedStyle$1, "getComputedStyle");
function getNodeScroll(element) {
	if (isElement(element)) return {
		scrollLeft: element.scrollLeft,
		scrollTop: element.scrollTop
	};
	return {
		scrollLeft: element.scrollX,
		scrollTop: element.scrollY
	};
}
function getParentNode(node) {
	if (getNodeName(node) === "html") return node;
	const result = node.assignedSlot || node.parentNode || isShadowRoot(node) && node.host || getDocumentElement(node);
	return isShadowRoot(result) ? result.host : result;
}
function getNearestOverflowAncestor(node) {
	const parentNode = getParentNode(node);
	if (isLastTraversableNode(parentNode)) return (node.ownerDocument || node).body;
	if (isHTMLElement(parentNode) && isOverflowElement(parentNode)) return parentNode;
	return getNearestOverflowAncestor(parentNode);
}
function getOverflowAncestors(node, list, traverseIframes) {
	var _node$ownerDocument2;
	if (list === void 0) list = [];
	if (traverseIframes === void 0) traverseIframes = true;
	const scrollableAncestor = getNearestOverflowAncestor(node);
	const isBody = scrollableAncestor === ((_node$ownerDocument2 = node.ownerDocument) == null ? void 0 : _node$ownerDocument2.body);
	const win = getWindow(scrollableAncestor);
	if (isBody) {
		const frameElement = getFrameElement(win);
		return list.concat(win, win.visualViewport || [], isOverflowElement(scrollableAncestor) ? scrollableAncestor : [], frameElement && traverseIframes ? getOverflowAncestors(frameElement) : []);
	} else return list.concat(scrollableAncestor, getOverflowAncestors(scrollableAncestor, [], traverseIframes));
}
function getFrameElement(win) {
	return win.parent && Object.getPrototypeOf(win.parent) ? win.frameElement : null;
}
//#endregion
//#region node_modules/.pnpm/@floating-ui+dom@1.8.0/node_modules/@floating-ui/dom/dist/floating-ui.dom.mjs
function getCssDimensions(element) {
	const css = getComputedStyle$1(element);
	let width = parseFloat(css.width) || 0;
	let height = parseFloat(css.height) || 0;
	const hasOffset = isHTMLElement(element);
	const offsetWidth = hasOffset ? element.offsetWidth : width;
	const offsetHeight = hasOffset ? element.offsetHeight : height;
	const shouldFallback = round(width) !== offsetWidth || round(height) !== offsetHeight;
	if (shouldFallback) {
		width = offsetWidth;
		height = offsetHeight;
	}
	return {
		width,
		height,
		$: shouldFallback
	};
}
function unwrapElement$1(element) {
	return !isElement(element) ? element.contextElement : element;
}
__name(unwrapElement$1, "unwrapElement");
function getScale(element) {
	const domElement = unwrapElement$1(element);
	if (!isHTMLElement(domElement)) return createCoords(1);
	const rect = domElement.getBoundingClientRect();
	const { width, height, $ } = getCssDimensions(domElement);
	let x = ($ ? round(rect.width) : rect.width) / width;
	let y = ($ ? round(rect.height) : rect.height) / height;
	if (!x || !Number.isFinite(x)) x = 1;
	if (!y || !Number.isFinite(y)) y = 1;
	return {
		x,
		y
	};
}
var noOffsets = /*#__PURE__*/ createCoords(0);
function getVisualOffsets(element) {
	const win = getWindow(element);
	if (!isWebKit() || !win.visualViewport) return noOffsets;
	return {
		x: win.visualViewport.offsetLeft,
		y: win.visualViewport.offsetTop
	};
}
function shouldAddVisualOffsets(element, isFixed, floatingOffsetParent) {
	if (isFixed === void 0) isFixed = false;
	return !!floatingOffsetParent && isFixed && floatingOffsetParent === getWindow(element);
}
function getBoundingClientRect(element, includeScale, isFixedStrategy, offsetParent) {
	if (includeScale === void 0) includeScale = false;
	if (isFixedStrategy === void 0) isFixedStrategy = false;
	const clientRect = element.getBoundingClientRect();
	const domElement = unwrapElement$1(element);
	let scale = createCoords(1);
	if (includeScale) {
		if (offsetParent) {
			if (isElement(offsetParent)) scale = getScale(offsetParent);
		} else scale = getScale(element);
	}
	const visualOffsets = shouldAddVisualOffsets(domElement, isFixedStrategy, offsetParent) ? getVisualOffsets(domElement) : createCoords(0);
	let x = (clientRect.left + visualOffsets.x) / scale.x;
	let y = (clientRect.top + visualOffsets.y) / scale.y;
	let width = clientRect.width / scale.x;
	let height = clientRect.height / scale.y;
	if (domElement && offsetParent) {
		const win = getWindow(domElement);
		const offsetWin = isElement(offsetParent) ? getWindow(offsetParent) : offsetParent;
		let currentWin = win;
		let currentIFrame = getFrameElement(currentWin);
		while (currentIFrame && offsetWin !== currentWin) {
			const iframeScale = getScale(currentIFrame);
			const iframeRect = currentIFrame.getBoundingClientRect();
			const css = getComputedStyle$1(currentIFrame);
			const left = iframeRect.left + (currentIFrame.clientLeft + parseFloat(css.paddingLeft)) * iframeScale.x;
			const top = iframeRect.top + (currentIFrame.clientTop + parseFloat(css.paddingTop)) * iframeScale.y;
			x *= iframeScale.x;
			y *= iframeScale.y;
			width *= iframeScale.x;
			height *= iframeScale.y;
			x += left;
			y += top;
			currentWin = getWindow(currentIFrame);
			currentIFrame = getFrameElement(currentWin);
		}
	}
	return rectToClientRect({
		width,
		height,
		x,
		y
	});
}
function getWindowScrollBarX(element, rect) {
	const leftScroll = getNodeScroll(element).scrollLeft;
	if (!rect) return getBoundingClientRect(getDocumentElement(element)).left + leftScroll;
	return rect.left + leftScroll;
}
function getHTMLOffset(documentElement, scroll) {
	const htmlRect = documentElement.getBoundingClientRect();
	return {
		x: htmlRect.left + scroll.scrollLeft - getWindowScrollBarX(documentElement, htmlRect),
		y: htmlRect.top + scroll.scrollTop
	};
}
function convertOffsetParentRelativeRectToViewportRelativeRect(_ref) {
	let { elements, rect, offsetParent, strategy } = _ref;
	const isFixed = strategy === "fixed";
	const documentElement = getDocumentElement(offsetParent);
	const topLayer = elements ? isTopLayer(elements.floating) : false;
	if (offsetParent === documentElement || topLayer && isFixed) return rect;
	let scroll = {
		scrollLeft: 0,
		scrollTop: 0
	};
	let scale = createCoords(1);
	const offsets = createCoords(0);
	const isOffsetParentAnElement = isHTMLElement(offsetParent);
	if (isOffsetParentAnElement || !isFixed) {
		if (getNodeName(offsetParent) !== "body" || isOverflowElement(documentElement)) scroll = getNodeScroll(offsetParent);
		if (isOffsetParentAnElement) {
			const offsetRect = getBoundingClientRect(offsetParent);
			scale = getScale(offsetParent);
			offsets.x = offsetRect.x + offsetParent.clientLeft;
			offsets.y = offsetRect.y + offsetParent.clientTop;
		}
	}
	const htmlOffset = documentElement && !isOffsetParentAnElement && !isFixed ? getHTMLOffset(documentElement, scroll) : createCoords(0);
	return {
		width: rect.width * scale.x,
		height: rect.height * scale.y,
		x: rect.x * scale.x - scroll.scrollLeft * scale.x + offsets.x + htmlOffset.x,
		y: rect.y * scale.y - scroll.scrollTop * scale.y + offsets.y + htmlOffset.y
	};
}
function getClientRects(element) {
	return element.getClientRects ? Array.from(element.getClientRects()) : [];
}
function getDocumentRect(html) {
	const scroll = getNodeScroll(html);
	const body = html.ownerDocument.body;
	const width = max(html.scrollWidth, html.clientWidth, body.scrollWidth, body.clientWidth);
	const height = max(html.scrollHeight, html.clientHeight, body.scrollHeight, body.clientHeight);
	let x = -scroll.scrollLeft + getWindowScrollBarX(html);
	const y = -scroll.scrollTop;
	if (getComputedStyle$1(body).direction === "rtl") x += max(html.clientWidth, body.clientWidth) - width;
	return {
		width,
		height,
		x,
		y
	};
}
var SCROLLBAR_MAX = 25;
function getViewportRect(element, strategy, rootBoundary) {
	if (rootBoundary === void 0) rootBoundary = "viewport";
	const isLayoutViewport = rootBoundary === "layoutViewport";
	const win = getWindow(element);
	const html = getDocumentElement(element);
	const visualViewport = win.visualViewport;
	let width = html.clientWidth;
	let height = html.clientHeight;
	let x = 0;
	let y = 0;
	if (visualViewport) {
		const layoutRelativeClientCoords = !isWebKit() || strategy === "fixed";
		if (isLayoutViewport) {
			if (!layoutRelativeClientCoords) {
				x = -visualViewport.offsetLeft;
				y = -visualViewport.offsetTop;
			}
		} else {
			width = visualViewport.width;
			height = visualViewport.height;
			if (layoutRelativeClientCoords) {
				x = visualViewport.offsetLeft;
				y = visualViewport.offsetTop;
			}
		}
	}
	if (getWindowScrollBarX(html) <= 0) {
		const doc = html.ownerDocument;
		const body = doc.body;
		const bodyStyles = getComputedStyle(body);
		const bodyMarginInline = doc.compatMode === "CSS1Compat" ? parseFloat(bodyStyles.marginLeft) + parseFloat(bodyStyles.marginRight) || 0 : 0;
		const reservedWidth = Math.abs(html.clientWidth - body.clientWidth - bodyMarginInline);
		const gutter = getComputedStyle(html).scrollbarGutter === "stable both-edges" ? reservedWidth / 2 : reservedWidth;
		if (gutter <= SCROLLBAR_MAX) width -= gutter;
	}
	return {
		width,
		height,
		x,
		y
	};
}
function getInnerBoundingClientRect(element, strategy) {
	const clientRect = getBoundingClientRect(element, true, strategy === "fixed");
	const top = clientRect.top + element.clientTop;
	const left = clientRect.left + element.clientLeft;
	const scale = getScale(element);
	return {
		width: element.clientWidth * scale.x,
		height: element.clientHeight * scale.y,
		x: left * scale.x,
		y: top * scale.y
	};
}
function getClientRectFromClippingAncestor(element, clippingAncestor, strategy) {
	let rect;
	if (clippingAncestor === "viewport" || clippingAncestor === "layoutViewport") rect = getViewportRect(element, strategy, clippingAncestor);
	else if (clippingAncestor === "document") rect = getDocumentRect(getDocumentElement(element));
	else if (isElement(clippingAncestor)) rect = getInnerBoundingClientRect(clippingAncestor, strategy);
	else {
		const visualOffsets = getVisualOffsets(element);
		rect = {
			x: clippingAncestor.x - visualOffsets.x,
			y: clippingAncestor.y - visualOffsets.y,
			width: clippingAncestor.width,
			height: clippingAncestor.height
		};
	}
	return rectToClientRect(rect);
}
function getClippingElementAncestors(element, cache) {
	const cachedResult = cache.get(element);
	if (cachedResult) return cachedResult;
	let result = getOverflowAncestors(element, [], false).filter((el) => isElement(el) && getNodeName(el) !== "body");
	let lastKeptComputedStyle = null;
	const elementIsFixed = getComputedStyle$1(element).position === "fixed";
	let currentNode = elementIsFixed ? getParentNode(element) : element;
	while (isElement(currentNode) && !isLastTraversableNode(currentNode)) {
		const computedStyle = getComputedStyle$1(currentNode);
		const currentNodeIsContaining = isContainingBlock(currentNode);
		const lastPosition = lastKeptComputedStyle ? lastKeptComputedStyle.position : elementIsFixed ? "fixed" : "";
		if (!currentNodeIsContaining && (lastPosition === "fixed" || lastPosition === "absolute" && computedStyle.position === "static")) result = result.filter((ancestor) => ancestor !== currentNode);
		else lastKeptComputedStyle = computedStyle;
		currentNode = getParentNode(currentNode);
	}
	cache.set(element, result);
	return result;
}
function getClippingRect(_ref) {
	let { element, boundary, rootBoundary, strategy } = _ref;
	const clippingAncestors = [...boundary === "clippingAncestors" ? isTopLayer(element) ? [] : getClippingElementAncestors(element, this._c) : [].concat(boundary), rootBoundary];
	const firstRect = getClientRectFromClippingAncestor(element, clippingAncestors[0], strategy);
	let top = firstRect.top;
	let right = firstRect.right;
	let bottom = firstRect.bottom;
	let left = firstRect.left;
	for (let i = 1; i < clippingAncestors.length; i++) {
		const rect = getClientRectFromClippingAncestor(element, clippingAncestors[i], strategy);
		top = max(rect.top, top);
		right = min(rect.right, right);
		bottom = min(rect.bottom, bottom);
		left = max(rect.left, left);
	}
	return {
		width: right - left,
		height: bottom - top,
		x: left,
		y: top
	};
}
function getDimensions(element) {
	const { width, height } = getCssDimensions(element);
	return {
		width,
		height
	};
}
function getRectRelativeToOffsetParent(element, offsetParent, strategy) {
	const isOffsetParentAnElement = isHTMLElement(offsetParent);
	const documentElement = getDocumentElement(offsetParent);
	const isFixed = strategy === "fixed";
	const rect = getBoundingClientRect(element, true, isFixed, offsetParent);
	let scroll = {
		scrollLeft: 0,
		scrollTop: 0
	};
	const offsets = createCoords(0);
	if (isOffsetParentAnElement || !isFixed) {
		if (getNodeName(offsetParent) !== "body" || isOverflowElement(documentElement)) scroll = getNodeScroll(offsetParent);
		if (isOffsetParentAnElement) {
			const offsetRect = getBoundingClientRect(offsetParent, true, isFixed, offsetParent);
			offsets.x = offsetRect.x + offsetParent.clientLeft;
			offsets.y = offsetRect.y + offsetParent.clientTop;
		}
	}
	if (!isOffsetParentAnElement && documentElement) offsets.x = getWindowScrollBarX(documentElement);
	const htmlOffset = documentElement && !isOffsetParentAnElement && !isFixed ? getHTMLOffset(documentElement, scroll) : createCoords(0);
	return {
		x: rect.left + scroll.scrollLeft - offsets.x - htmlOffset.x,
		y: rect.top + scroll.scrollTop - offsets.y - htmlOffset.y,
		width: rect.width,
		height: rect.height
	};
}
function isStaticPositioned(element) {
	return getComputedStyle$1(element).position === "static";
}
function getTrueOffsetParent(element, polyfill) {
	if (!isHTMLElement(element) || getComputedStyle$1(element).position === "fixed") return null;
	if (polyfill) return polyfill(element);
	let rawOffsetParent = element.offsetParent;
	if (getDocumentElement(element) === rawOffsetParent) rawOffsetParent = rawOffsetParent.ownerDocument.body;
	return rawOffsetParent;
}
function getOffsetParent(element, polyfill) {
	const win = getWindow(element);
	if (isTopLayer(element)) return win;
	if (!isHTMLElement(element)) {
		let svgOffsetParent = getParentNode(element);
		while (svgOffsetParent && !isLastTraversableNode(svgOffsetParent)) {
			if (isElement(svgOffsetParent) && !isStaticPositioned(svgOffsetParent)) return svgOffsetParent;
			svgOffsetParent = getParentNode(svgOffsetParent);
		}
		return win;
	}
	let offsetParent = getTrueOffsetParent(element, polyfill);
	while (offsetParent && isTableElement(offsetParent) && isStaticPositioned(offsetParent)) offsetParent = getTrueOffsetParent(offsetParent, polyfill);
	if (offsetParent && isLastTraversableNode(offsetParent) && isStaticPositioned(offsetParent) && !isContainingBlock(offsetParent)) return win;
	return offsetParent || getContainingBlock(element) || win;
}
var getElementRects = async function(data) {
	const getOffsetParentFn = this.getOffsetParent || getOffsetParent;
	const getDimensionsFn = this.getDimensions;
	const floatingDimensions = await getDimensionsFn(data.floating);
	return {
		reference: getRectRelativeToOffsetParent(data.reference, await getOffsetParentFn(data.floating), data.strategy),
		floating: {
			x: 0,
			y: 0,
			width: floatingDimensions.width,
			height: floatingDimensions.height
		}
	};
};
function isRTL(element) {
	return getComputedStyle$1(element).direction === "rtl";
}
var platform = {
	convertOffsetParentRelativeRectToViewportRelativeRect,
	getDocumentElement,
	getClippingRect,
	getOffsetParent,
	getElementRects,
	getClientRects,
	getDimensions,
	getScale,
	isElement,
	isRTL
};
function rectsAreEqual(a, b) {
	return a.x === b.x && a.y === b.y && a.width === b.width && a.height === b.height;
}
function observeMove(element, onMove, ancestorResize) {
	let io = null;
	let timeoutId;
	const root = getDocumentElement(element);
	function cleanup() {
		var _io;
		clearTimeout(timeoutId);
		(_io = io) == null || _io.disconnect();
		io = null;
	}
	function refresh(skip, threshold) {
		if (skip === void 0) skip = false;
		if (threshold === void 0) threshold = 1;
		cleanup();
		const elementRectForRootMargin = element.getBoundingClientRect();
		const { left, top, width, height } = elementRectForRootMargin;
		if (!skip) onMove();
		if (!width || !height) return;
		const insetTop = floor(top);
		const insetRight = floor(root.clientWidth - (left + width));
		const insetBottom = floor(root.clientHeight - (top + height));
		const insetLeft = floor(left);
		const options = {
			rootMargin: -insetTop + "px " + -insetRight + "px " + -insetBottom + "px " + -insetLeft + "px",
			threshold: max(0, min(1, threshold)) || 1
		};
		let isFirstUpdate = true;
		function handleObserve(entries) {
			const ratio = entries[0].intersectionRatio;
			if (!rectsAreEqual(elementRectForRootMargin, element.getBoundingClientRect())) return refresh();
			if (ratio !== threshold) {
				if (!isFirstUpdate) return refresh();
				if (!ratio) timeoutId = setTimeout(() => {
					refresh(false, 1e-7);
				}, 1e3);
				else refresh(false, ratio);
			}
			isFirstUpdate = false;
		}
		try {
			io = new IntersectionObserver(handleObserve, {
				...options,
				root: root.ownerDocument
			});
		} catch (_e) {
			io = new IntersectionObserver(handleObserve, options);
		}
		io.observe(element);
	}
	const win = getWindow(element);
	const handleResize = () => refresh(ancestorResize);
	win.addEventListener("resize", handleResize);
	refresh(true);
	return () => {
		win.removeEventListener("resize", handleResize);
		cleanup();
	};
}
/**
* Automatically updates the position of the floating element when necessary.
* Should only be called when the floating element is mounted on the DOM or
* visible on the screen.
* @returns cleanup function that should be invoked when the floating element is
* removed from the DOM or hidden from the screen.
* @see https://floating-ui.com/docs/autoUpdate
*/
function autoUpdate(reference, floating, update, options) {
	if (options === void 0) options = {};
	const { ancestorScroll = true, ancestorResize = true, elementResize = typeof ResizeObserver === "function", layoutShift = typeof IntersectionObserver === "function", animationFrame = false } = options;
	const referenceEl = unwrapElement$1(reference);
	const ancestors = ancestorScroll || ancestorResize ? [...referenceEl ? getOverflowAncestors(referenceEl) : [], ...floating ? getOverflowAncestors(floating) : []] : [];
	ancestors.forEach((ancestor) => {
		ancestorScroll && ancestor.addEventListener("scroll", update);
		ancestorResize && ancestor.addEventListener("resize", update);
	});
	const cleanupIo = referenceEl && layoutShift ? observeMove(referenceEl, update, ancestorResize) : null;
	let reobserveFrame = -1;
	let resizeObserver = null;
	if (elementResize) {
		resizeObserver = new ResizeObserver((_ref) => {
			let [firstEntry] = _ref;
			if (firstEntry && firstEntry.target === referenceEl && resizeObserver && floating) {
				resizeObserver.unobserve(floating);
				cancelAnimationFrame(reobserveFrame);
				reobserveFrame = requestAnimationFrame(() => {
					var _resizeObserver;
					(_resizeObserver = resizeObserver) == null || _resizeObserver.observe(floating);
				});
			}
			update();
		});
		if (referenceEl && !animationFrame) resizeObserver.observe(referenceEl);
		if (floating) resizeObserver.observe(floating);
	}
	let frameId;
	let prevRefRect = animationFrame ? getBoundingClientRect(reference) : null;
	if (animationFrame) frameLoop();
	function frameLoop() {
		const nextRefRect = getBoundingClientRect(reference);
		if (prevRefRect && !rectsAreEqual(prevRefRect, nextRefRect)) update();
		prevRefRect = nextRefRect;
		frameId = requestAnimationFrame(frameLoop);
	}
	update();
	return () => {
		var _resizeObserver2;
		ancestors.forEach((ancestor) => {
			ancestorScroll && ancestor.removeEventListener("scroll", update);
			ancestorResize && ancestor.removeEventListener("resize", update);
		});
		cleanupIo?.();
		(_resizeObserver2 = resizeObserver) == null || _resizeObserver2.disconnect();
		resizeObserver = null;
		if (animationFrame) cancelAnimationFrame(frameId);
	};
}
/**
* Modifies the placement by translating the floating element along the
* specified axes.
* A number (shorthand for `mainAxis` or distance), or an axes configuration
* object may be passed.
* @see https://floating-ui.com/docs/offset
*/
var offset = offset$1;
/**
* Optimizes the visibility of the floating element by shifting it in order to
* keep it in view when it will overflow the clipping boundary.
* @see https://floating-ui.com/docs/shift
*/
var shift = shift$1;
/**
* Optimizes the visibility of the floating element by flipping the `placement`
* in order to keep it in view when the preferred placement(s) will overflow the
* clipping boundary. Alternative to `autoPlacement`.
* @see https://floating-ui.com/docs/flip
*/
var flip = flip$1;
/**
* Provides data that allows you to change the size of the floating element —
* for instance, prevent it from overflowing the clipping boundary or match the
* width of the reference element.
* @see https://floating-ui.com/docs/size
*/
var size = size$1;
/**
* Provides data to hide the floating element in applicable situations, such as
* when it is not in the same clipping context as the reference element.
* @see https://floating-ui.com/docs/hide
*/
var hide = hide$1;
/**
* Provides data to position an inner element of the floating element so that it
* appears centered to the reference element.
* @see https://floating-ui.com/docs/arrow
*/
var arrow$1 = arrow$2;
/**
* Built-in `limiter` that will stop `shift()` at a certain point.
*/
var limitShift = limitShift$1;
/**
* Computes the `x` and `y` coordinates that will place the floating element
* next to a given reference element.
*/
var computePosition = (reference, floating, options) => {
	const cache = /* @__PURE__ */ new Map();
	const mergedOptions = options != null ? options : {};
	const platformWithCache = {
		...platform,
		...mergedOptions.platform,
		_c: cache
	};
	return computePosition$1(reference, floating, {
		...mergedOptions,
		platform: platformWithCache
	});
};
//#endregion
//#region node_modules/.pnpm/@floating-ui+vue@1.1.11_vue@3.5.42_typescript@6.0.3_/node_modules/@floating-ui/vue/dist/floating-ui.vue.mjs
function isComponentPublicInstance(target) {
	return target != null && typeof target === "object" && "$el" in target;
}
function unwrapElement(target) {
	if (isComponentPublicInstance(target)) {
		const element = target.$el;
		return isNode(element) && getNodeName(element) === "#comment" ? null : element;
	}
	return target;
}
function toValue(source) {
	return typeof source === "function" ? source() : unref(source);
}
/**
* Positions an inner element of the floating element such that it is centered to the reference element.
* @param options The arrow options.
* @see https://floating-ui.com/docs/arrow
*/
function arrow(options) {
	return {
		name: "arrow",
		options,
		fn(args) {
			const element = unwrapElement(toValue(options.element));
			if (element == null) return {};
			return arrow$1({
				element,
				padding: options.padding
			}).fn(args);
		}
	};
}
function getDPR(element) {
	if (typeof window === "undefined") return 1;
	return (element.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function roundByDPR(element, value) {
	const dpr = getDPR(element);
	return Math.round(value * dpr) / dpr;
}
/**
* Computes the `x` and `y` coordinates that will place the floating element next to a reference element when it is given a certain CSS positioning strategy.
* @param reference The reference template ref.
* @param floating The floating template ref.
* @param options The floating options.
* @see https://floating-ui.com/docs/vue
*/
function useFloating(reference, floating, options) {
	if (options === void 0) options = {};
	const whileElementsMountedOption = options.whileElementsMounted;
	const openOption = computed(() => {
		var _toValue;
		return (_toValue = toValue(options.open)) != null ? _toValue : true;
	});
	const middlewareOption = computed(() => toValue(options.middleware));
	const placementOption = computed(() => {
		var _toValue2;
		return (_toValue2 = toValue(options.placement)) != null ? _toValue2 : "bottom";
	});
	const strategyOption = computed(() => {
		var _toValue3;
		return (_toValue3 = toValue(options.strategy)) != null ? _toValue3 : "absolute";
	});
	const transformOption = computed(() => {
		var _toValue4;
		return (_toValue4 = toValue(options.transform)) != null ? _toValue4 : true;
	});
	const referenceElement = computed(() => unwrapElement(reference.value));
	const floatingElement = computed(() => unwrapElement(floating.value));
	const x = ref(0);
	const y = ref(0);
	const strategy = ref(strategyOption.value);
	const placement = ref(placementOption.value);
	const middlewareData = shallowRef({});
	const isPositioned = ref(false);
	const floatingStyles = computed(() => {
		const initialStyles = {
			position: strategy.value,
			left: "0",
			top: "0"
		};
		if (!floatingElement.value) return initialStyles;
		const xVal = roundByDPR(floatingElement.value, x.value);
		const yVal = roundByDPR(floatingElement.value, y.value);
		if (transformOption.value) return {
			...initialStyles,
			transform: "translate(" + xVal + "px, " + yVal + "px)",
			...getDPR(floatingElement.value) >= 1.5 && { willChange: "transform" }
		};
		return {
			position: strategy.value,
			left: xVal + "px",
			top: yVal + "px"
		};
	});
	let whileElementsMountedCleanup;
	function update() {
		if (referenceElement.value == null || floatingElement.value == null) return;
		const open = openOption.value;
		computePosition(referenceElement.value, floatingElement.value, {
			middleware: middlewareOption.value,
			placement: placementOption.value,
			strategy: strategyOption.value
		}).then((position) => {
			x.value = position.x;
			y.value = position.y;
			strategy.value = position.strategy;
			placement.value = position.placement;
			middlewareData.value = position.middlewareData;
			/**
			* The floating element's position may be recomputed while it's closed
			* but still mounted (such as when transitioning out). To ensure
			* `isPositioned` will be `false` initially on the next open, avoid
			* setting it to `true` when `open === false` (must be specified).
			*/
			isPositioned.value = open !== false;
		});
	}
	function cleanup() {
		if (typeof whileElementsMountedCleanup === "function") {
			whileElementsMountedCleanup();
			whileElementsMountedCleanup = void 0;
		}
	}
	function attach() {
		cleanup();
		if (whileElementsMountedOption === void 0) {
			update();
			return;
		}
		if (referenceElement.value != null && floatingElement.value != null) {
			whileElementsMountedCleanup = whileElementsMountedOption(referenceElement.value, floatingElement.value, update);
			return;
		}
	}
	function reset() {
		if (!openOption.value) isPositioned.value = false;
	}
	watch([
		middlewareOption,
		placementOption,
		strategyOption,
		openOption
	], update, { flush: "sync" });
	watch([referenceElement, floatingElement], attach, { flush: "sync" });
	watch(openOption, reset, { flush: "sync" });
	if (getCurrentScope()) onScopeDispose(cleanup);
	return {
		x: shallowReadonly(x),
		y: shallowReadonly(y),
		strategy: shallowReadonly(strategy),
		placement: shallowReadonly(placement),
		middlewareData: shallowReadonly(middlewareData),
		isPositioned: shallowReadonly(isPositioned),
		floatingStyles,
		update
	};
}
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/Popper/PopperContent.js
var PopperContentPropsDefaultValue = {
	side: "bottom",
	sideOffset: 0,
	sideFlip: true,
	align: "center",
	alignOffset: 0,
	alignFlip: true,
	arrowPadding: 0,
	avoidCollisions: true,
	collisionBoundary: () => [],
	collisionPadding: 0,
	sticky: "partial",
	hideWhenDetached: false,
	positionStrategy: "fixed",
	updatePositionStrategy: "optimized",
	prioritizePosition: false
};
var [injectPopperContentContext, providePopperContentContext] = createContext("PopperContent");
var PopperContent_default = /* @__PURE__ */ defineComponent({
	inheritAttrs: false,
	__name: "PopperContent",
	props: /* @__PURE__ */ mergeDefaults({
		side: {
			type: null,
			required: false
		},
		sideOffset: {
			type: Number,
			required: false
		},
		sideFlip: {
			type: Boolean,
			required: false
		},
		align: {
			type: null,
			required: false
		},
		alignOffset: {
			type: Number,
			required: false
		},
		alignFlip: {
			type: Boolean,
			required: false
		},
		avoidCollisions: {
			type: Boolean,
			required: false
		},
		collisionBoundary: {
			type: null,
			required: false
		},
		collisionPadding: {
			type: [Number, Object],
			required: false
		},
		arrowPadding: {
			type: Number,
			required: false
		},
		sticky: {
			type: String,
			required: false
		},
		hideWhenDetached: {
			type: Boolean,
			required: false
		},
		positionStrategy: {
			type: String,
			required: false
		},
		updatePositionStrategy: {
			type: String,
			required: false
		},
		disableUpdateOnLayoutShift: {
			type: Boolean,
			required: false
		},
		prioritizePosition: {
			type: Boolean,
			required: false
		},
		reference: {
			type: null,
			required: false
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false
		}
	}, { ...PopperContentPropsDefaultValue }),
	emits: ["placed"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const rootContext = injectPopperRootContext();
		const { forwardRef, currentElement: contentElement } = useForwardExpose();
		const floatingRef = ref();
		const arrow$1 = ref();
		const { width: arrowWidth, height: arrowHeight } = useSize(arrow$1);
		const desiredPlacement = computed(() => props.side + (props.align !== "center" ? `-${props.align}` : ""));
		const collisionPadding = computed(() => {
			return typeof props.collisionPadding === "number" ? props.collisionPadding : {
				top: 0,
				right: 0,
				bottom: 0,
				left: 0,
				...props.collisionPadding
			};
		});
		const boundary = computed(() => {
			return Array.isArray(props.collisionBoundary) ? props.collisionBoundary : [props.collisionBoundary];
		});
		const detectOverflowOptions = computed(() => {
			return {
				padding: collisionPadding.value,
				boundary: boundary.value.filter(isNotNull),
				altBoundary: boundary.value.length > 0
			};
		});
		const flipOptions = computed(() => {
			return {
				mainAxis: props.sideFlip,
				crossAxis: props.alignFlip
			};
		});
		const computedMiddleware = computedEager(() => {
			return [
				offset({
					mainAxis: props.sideOffset + arrowHeight.value,
					alignmentAxis: props.alignOffset
				}),
				props.prioritizePosition && props.avoidCollisions && flip({
					...detectOverflowOptions.value,
					...flipOptions.value
				}),
				props.avoidCollisions && shift({
					mainAxis: true,
					crossAxis: !!props.prioritizePosition,
					limiter: props.sticky === "partial" ? limitShift() : void 0,
					...detectOverflowOptions.value
				}),
				!props.prioritizePosition && props.avoidCollisions && flip({
					...detectOverflowOptions.value,
					...flipOptions.value
				}),
				size({
					...detectOverflowOptions.value,
					apply: ({ elements, rects, availableWidth, availableHeight }) => {
						const { width: anchorWidth, height: anchorHeight } = rects.reference;
						const contentStyle = elements.floating.style;
						contentStyle.setProperty("--reka-popper-available-width", `${availableWidth}px`);
						contentStyle.setProperty("--reka-popper-available-height", `${availableHeight}px`);
						contentStyle.setProperty("--reka-popper-anchor-width", `${anchorWidth}px`);
						contentStyle.setProperty("--reka-popper-anchor-height", `${anchorHeight}px`);
					}
				}),
				arrow$1.value && arrow({
					element: arrow$1.value,
					padding: props.arrowPadding
				}),
				transformOrigin({
					arrowWidth: arrowWidth.value,
					arrowHeight: arrowHeight.value
				}),
				props.hideWhenDetached && hide({
					strategy: "referenceHidden",
					...detectOverflowOptions.value
				})
			];
		});
		const { floatingStyles, placement, isPositioned, middlewareData, update } = useFloating(computed(() => props.reference ?? rootContext.anchor.value), floatingRef, {
			strategy: props.positionStrategy,
			placement: desiredPlacement,
			whileElementsMounted: (...args) => {
				return autoUpdate(...args, {
					layoutShift: !props.disableUpdateOnLayoutShift,
					animationFrame: props.updatePositionStrategy === "always"
				});
			},
			middleware: computedMiddleware
		});
		const placedSide = computed(() => getSideAndAlignFromPlacement(placement.value)[0]);
		const placedAlign = computed(() => getSideAndAlignFromPlacement(placement.value)[1]);
		watchPostEffect(() => {
			if (isPositioned.value) emits("placed");
		});
		const cannotCenterArrow = computed(() => middlewareData.value.arrow?.centerOffset !== 0);
		const contentZIndex = ref("");
		watchEffect(() => {
			if (contentElement.value) contentZIndex.value = window.getComputedStyle(contentElement.value).zIndex;
		});
		providePopperContentContext({
			placedSide,
			onArrowChange: (element) => arrow$1.value = element,
			arrowX: computed(() => middlewareData.value.arrow?.x ?? 0),
			arrowY: computed(() => middlewareData.value.arrow?.y ?? 0),
			shouldHideArrow: cannotCenterArrow
		});
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", {
				ref_key: "floatingRef",
				ref: floatingRef,
				"data-reka-popper-content-wrapper": "",
				style: normalizeStyle({
					...unref(floatingStyles),
					transform: unref(isPositioned) ? unref(floatingStyles).transform : "translate(0, -200%)",
					minWidth: "max-content",
					zIndex: contentZIndex.value,
					["--reka-popper-transform-origin"]: [unref(middlewareData).transformOrigin?.x, unref(middlewareData).transformOrigin?.y].join(" "),
					...unref(middlewareData).hide?.referenceHidden && {
						visibility: "hidden",
						pointerEvents: "none"
					}
				})
			}, [createVNode(unref(Primitive), mergeProps({ ref: unref(forwardRef) }, _ctx.$attrs, {
				"as-child": props.asChild,
				as: _ctx.as,
				"data-side": placedSide.value,
				"data-align": placedAlign.value,
				style: { animation: !unref(isPositioned) ? "none" : void 0 }
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16, [
				"as-child",
				"as",
				"data-side",
				"data-align",
				"style"
			])], 4);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/Popper/PopperArrow.js
var OPPOSITE_SIDE = {
	top: "bottom",
	right: "left",
	bottom: "top",
	left: "right"
};
var PopperArrow_default = /* @__PURE__ */ defineComponent({
	inheritAttrs: false,
	__name: "PopperArrow",
	props: {
		width: {
			type: Number,
			required: false
		},
		height: {
			type: Number,
			required: false
		},
		rounded: {
			type: Boolean,
			required: false
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false,
			default: "svg"
		}
	},
	setup(__props) {
		const { forwardRef } = useForwardExpose();
		const contentContext = injectPopperContentContext();
		const baseSide = computed(() => OPPOSITE_SIDE[contentContext.placedSide.value]);
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("span", {
				ref: (el) => {
					unref(contentContext).onArrowChange(el);
				},
				style: normalizeStyle({
					position: "absolute",
					left: unref(contentContext).arrowX?.value ? `${unref(contentContext).arrowX?.value}px` : void 0,
					top: unref(contentContext).arrowY?.value ? `${unref(contentContext).arrowY?.value}px` : void 0,
					[baseSide.value]: 0,
					transformOrigin: {
						top: "",
						right: "0 0",
						bottom: "center 0",
						left: "100% 0"
					}[unref(contentContext).placedSide.value],
					transform: {
						top: "translateY(100%)",
						right: "translateY(50%) rotate(90deg) translateX(-50%)",
						bottom: `rotate(180deg)`,
						left: "translateY(50%) rotate(-90deg) translateX(50%)"
					}[unref(contentContext).placedSide.value],
					visibility: unref(contentContext).shouldHideArrow.value ? "hidden" : void 0
				})
			}, [createVNode(Arrow_default, mergeProps(_ctx.$attrs, {
				ref: unref(forwardRef),
				style: { display: "block" },
				as: _ctx.as,
				"as-child": _ctx.asChild,
				rounded: _ctx.rounded,
				width: _ctx.width,
				height: _ctx.height
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16, [
				"as",
				"as-child",
				"rounded",
				"width",
				"height"
			])], 4);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/Combobox/ComboboxAnchor.js
var ComboboxAnchor_default = /* @__PURE__ */ defineComponent({
	__name: "ComboboxAnchor",
	props: {
		reference: {
			type: null,
			required: false
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false
		}
	},
	setup(__props) {
		const { forwardRef } = useForwardExpose();
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(PopperAnchor_default), {
				"as-child": "",
				reference: _ctx.reference
			}, {
				default: withCtx(() => [createVNode(unref(Primitive), mergeProps({
					ref: unref(forwardRef),
					"as-child": _ctx.asChild,
					as: _ctx.as
				}, _ctx.$attrs), {
					default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
					_: 3
				}, 16, ["as-child", "as"])]),
				_: 3
			}, 8, ["reference"]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/Listbox/utils.js
function valueComparator$1(value, currentValue, comparator) {
	if (value === void 0) return false;
	else if (Array.isArray(value)) return value.some((val) => compare$2(val, currentValue, comparator));
	else return compare$2(value, currentValue, comparator);
}
__name(valueComparator$1, "valueComparator");
function compare$2(value, currentValue, comparator) {
	if (value === void 0 || currentValue === void 0) return false;
	if (typeof value === "string") return value === currentValue;
	if (typeof comparator === "function") return comparator(value, currentValue);
	if (typeof comparator === "string") return value?.[comparator] === currentValue?.[comparator];
	return isEqual(value, currentValue);
}
__name(compare$2, "compare");
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/Listbox/ListboxRoot.js
var [injectListboxRootContext, provideListboxRootContext] = createContext("ListboxRoot");
var ListboxRoot_default = /* @__PURE__ */ defineComponent({
	__name: "ListboxRoot",
	props: {
		modelValue: {
			type: null,
			required: false
		},
		defaultValue: {
			type: null,
			required: false
		},
		multiple: {
			type: Boolean,
			required: false
		},
		orientation: {
			type: String,
			required: false,
			default: "vertical"
		},
		dir: {
			type: String,
			required: false
		},
		disabled: {
			type: Boolean,
			required: false
		},
		selectionBehavior: {
			type: String,
			required: false,
			default: "toggle"
		},
		highlightOnHover: {
			type: Boolean,
			required: false
		},
		by: {
			type: [String, Function],
			required: false
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false
		},
		name: {
			type: String,
			required: false
		},
		required: {
			type: Boolean,
			required: false
		}
	},
	emits: [
		"update:modelValue",
		"highlight",
		"entryFocus",
		"leave"
	],
	setup(__props, { expose: __expose, emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const { multiple, highlightOnHover, orientation, disabled, selectionBehavior, dir: propDir } = toRefs(props);
		const { getItems } = useCollection({ isProvider: true });
		const { handleTypeaheadSearch } = useTypeahead();
		const { primitiveElement, currentElement } = usePrimitiveElement();
		const kbd = useKbd();
		const dir = useDirection(propDir);
		const isFormControl = useFormControl(currentElement);
		const firstValue = ref();
		const isUserAction = ref(false);
		const focusable = ref(true);
		const modelValue = useVModel(props, "modelValue", emits, {
			defaultValue: props.defaultValue ?? (multiple.value ? [] : void 0),
			passive: props.modelValue === void 0,
			deep: true
		});
		function onValueChange(val) {
			isUserAction.value = true;
			if (props.multiple) {
				const modelArray = Array.isArray(modelValue.value) ? [...modelValue.value] : [];
				const index = modelArray.findIndex((i) => compare$2(i, val, props.by));
				if (props.selectionBehavior === "toggle") {
					index === -1 ? modelArray.push(val) : modelArray.splice(index, 1);
					modelValue.value = modelArray;
				} else {
					modelValue.value = [val];
					firstValue.value = val;
				}
			} else if (props.selectionBehavior === "toggle") if (compare$2(modelValue.value, val, props.by)) modelValue.value = void 0;
			else modelValue.value = val;
			else modelValue.value = val;
			setTimeout(() => {
				isUserAction.value = false;
			}, 1);
		}
		const highlightedElement = ref(null);
		const previousElement = ref(null);
		const isVirtual = ref(false);
		const isComposing = ref(false);
		const virtualFocusHook = createEventHook();
		const virtualKeydownHook = createEventHook();
		const virtualHighlightHook = createEventHook();
		function getCollectionItem() {
			return getItems().map((i) => i.ref).filter((i) => i.dataset.disabled !== "");
		}
		function changeHighlight(el, scrollIntoView = true) {
			if (!el) return;
			highlightedElement.value = el;
			if (focusable.value) highlightedElement.value.focus();
			if (scrollIntoView) highlightedElement.value.scrollIntoView({ block: "nearest" });
			const highlightedItem = getItems().find((i) => i.ref === el);
			emits("highlight", highlightedItem);
		}
		function highlightItem(value) {
			if (isVirtual.value) virtualHighlightHook.trigger(value);
			else {
				const item = getItems().find((i) => compare$2(i.value, value, props.by));
				if (item) {
					highlightedElement.value = item.ref;
					changeHighlight(item.ref);
				}
			}
		}
		function onKeydownEnter(event) {
			if (highlightedElement.value && highlightedElement.value.isConnected) {
				event.preventDefault();
				event.stopPropagation();
				if (!isComposing.value) highlightedElement.value.click();
			}
		}
		function onKeydownTypeAhead(event) {
			if (!focusable.value) return;
			isUserAction.value = true;
			if (isVirtual.value) virtualKeydownHook.trigger(event);
			else {
				const isMetaKey = event.altKey || event.ctrlKey || event.metaKey;
				if (isMetaKey && event.key === "a" && multiple.value) {
					const collection = getItems();
					const values = collection.map((i) => i.value);
					modelValue.value = [...values];
					event.preventDefault();
					changeHighlight(collection[collection.length - 1].ref);
				} else if (!isMetaKey) {
					const el = handleTypeaheadSearch(event.key, getItems());
					if (el) changeHighlight(el);
				}
			}
			setTimeout(() => {
				isUserAction.value = false;
			}, 1);
		}
		function onCompositionStart() {
			isComposing.value = true;
		}
		function onCompositionEnd() {
			nextTick(() => {
				isComposing.value = false;
			});
		}
		function highlightFirstItem() {
			nextTick(() => {
				onKeydownNavigation(new KeyboardEvent("keydown", { key: "PageUp" }));
			});
		}
		function onLeave(event) {
			const el = highlightedElement.value;
			if (el?.isConnected) previousElement.value = el;
			highlightedElement.value = null;
			emits("leave", event);
		}
		function onEnter(event) {
			const entryFocusEvent = new CustomEvent("listbox.entryFocus", {
				bubbles: false,
				cancelable: true
			});
			event.currentTarget?.dispatchEvent(entryFocusEvent);
			emits("entryFocus", entryFocusEvent);
			if (entryFocusEvent.defaultPrevented) return;
			if (previousElement.value) changeHighlight(previousElement.value);
			else {
				const el = getCollectionItem()?.[0];
				changeHighlight(el);
			}
		}
		function onKeydownNavigation(event) {
			const intent = getFocusIntent(event, orientation.value, dir.value);
			if (!intent) return;
			let collection = getCollectionItem();
			if (highlightedElement.value) {
				if (intent === "last") collection.reverse();
				else if (intent === "prev" || intent === "next") {
					if (intent === "prev") collection.reverse();
					const currentIndex = collection.indexOf(highlightedElement.value);
					collection = collection.slice(currentIndex + 1);
				}
				handleMultipleReplace(event, collection[0]);
			}
			if (collection.length) {
				const index = !highlightedElement.value && intent === "prev" ? collection.length - 1 : 0;
				changeHighlight(collection[index]);
			}
			if (isVirtual.value) return virtualKeydownHook.trigger(event);
		}
		function handleMultipleReplace(event, targetEl) {
			if (isVirtual.value || props.selectionBehavior !== "replace" || !multiple.value || !Array.isArray(modelValue.value)) return;
			if ((event.altKey || event.ctrlKey || event.metaKey) && !event.shiftKey) return;
			if (event.shiftKey) {
				const collection = getItems().filter((i) => i.ref.dataset.disabled !== "");
				let lastValue = collection.find((i) => i.ref === targetEl)?.value;
				if (event.key === kbd.END) lastValue = collection[collection.length - 1].value;
				else if (event.key === kbd.HOME) lastValue = collection[0].value;
				if (!lastValue || !firstValue.value) return;
				const values = findValuesBetween(collection.map((i) => i.value), firstValue.value, lastValue);
				modelValue.value = values;
			}
		}
		async function highlightSelected(event) {
			await nextTick();
			if (isVirtual.value) virtualFocusHook.trigger(event);
			else {
				const collection = getCollectionItem();
				const item = collection.find((i) => i.dataset.state === "checked");
				if (item) changeHighlight(item);
				else if (collection.length) changeHighlight(collection[0]);
			}
		}
		watch(modelValue, () => {
			if (!isUserAction.value) nextTick(() => {
				highlightSelected();
			});
		}, {
			immediate: true,
			deep: true
		});
		__expose({
			highlightedElement,
			highlightItem,
			highlightFirstItem,
			highlightSelected,
			getItems
		});
		provideListboxRootContext({
			modelValue,
			onValueChange,
			multiple,
			orientation,
			dir,
			disabled,
			highlightOnHover,
			highlightedElement,
			isVirtual,
			virtualFocusHook,
			virtualKeydownHook,
			virtualHighlightHook,
			by: props.by,
			firstValue,
			selectionBehavior,
			focusable,
			onLeave,
			onEnter,
			changeHighlight,
			onKeydownEnter,
			onKeydownNavigation,
			onKeydownTypeAhead,
			onCompositionStart,
			onCompositionEnd,
			highlightFirstItem
		});
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), {
				ref_key: "primitiveElement",
				ref: primitiveElement,
				as: _ctx.as,
				"as-child": _ctx.asChild,
				dir: unref(dir),
				"data-disabled": unref(disabled) ? "" : void 0,
				onPointerleave: onLeave,
				onFocusout: _cache[0] || (_cache[0] = async (event) => {
					const target = event.relatedTarget || event.target;
					await nextTick();
					if (highlightedElement.value && unref(currentElement) && !unref(currentElement).contains(target)) onLeave(event);
				})
			}, {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", { modelValue: unref(modelValue) }), unref(isFormControl) && _ctx.name ? (openBlock(), createBlock(unref(VisuallyHiddenInput_default), {
					key: 0,
					name: _ctx.name,
					value: unref(modelValue),
					disabled: unref(disabled),
					required: _ctx.required
				}, null, 8, [
					"name",
					"value",
					"disabled",
					"required"
				])) : createCommentVNode("v-if", true)]),
				_: 3
			}, 8, [
				"as",
				"as-child",
				"dir",
				"data-disabled"
			]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/Listbox/ListboxContent.js
var ListboxContent_default = /* @__PURE__ */ defineComponent({
	__name: "ListboxContent",
	props: {
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false
		}
	},
	setup(__props) {
		const { CollectionSlot } = useCollection();
		const rootContext = injectListboxRootContext();
		const isClickFocus = refAutoReset(false, 10);
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(CollectionSlot), null, {
				default: withCtx(() => [createVNode(unref(Primitive), {
					role: "listbox",
					as: _ctx.as,
					"as-child": _ctx.asChild,
					tabindex: unref(rootContext).focusable.value ? unref(rootContext).highlightedElement.value ? "-1" : "0" : "-1",
					"aria-orientation": unref(rootContext).orientation.value,
					"aria-multiselectable": !!unref(rootContext).multiple.value,
					"data-orientation": unref(rootContext).orientation.value,
					onMousedown: _cache[0] || (_cache[0] = withModifiers(($event) => isClickFocus.value = true, ["left"])),
					onFocus: _cache[1] || (_cache[1] = (ev) => {
						if (unref(isClickFocus)) return;
						unref(rootContext).onEnter(ev);
					}),
					onKeydown: [
						_cache[2] || (_cache[2] = withKeys((event) => {
							if (unref(rootContext).orientation.value === "vertical" && (event.key === "ArrowLeft" || event.key === "ArrowRight") || unref(rootContext).orientation.value === "horizontal" && (event.key === "ArrowUp" || event.key === "ArrowDown")) return;
							event.preventDefault();
							unref(rootContext).focusable.value && unref(rootContext).onKeydownNavigation(event);
						}, [
							"down",
							"up",
							"left",
							"right",
							"home",
							"end"
						])),
						withKeys(unref(rootContext).onKeydownEnter, ["enter"]),
						unref(rootContext).onKeydownTypeAhead
					]
				}, {
					default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
					_: 3
				}, 8, [
					"as",
					"as-child",
					"tabindex",
					"aria-orientation",
					"aria-multiselectable",
					"data-orientation",
					"onKeydown"
				])]),
				_: 3
			});
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/Listbox/ListboxFilter.js
var ListboxFilter_default = /* @__PURE__ */ defineComponent({
	__name: "ListboxFilter",
	props: {
		modelValue: {
			type: String,
			required: false
		},
		autoFocus: {
			type: Boolean,
			required: false
		},
		disabled: {
			type: Boolean,
			required: false
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false,
			default: "input"
		}
	},
	emits: ["update:modelValue"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const modelValue = useVModel(props, "modelValue", __emit, {
			defaultValue: "",
			passive: props.modelValue === void 0
		});
		const rootContext = injectListboxRootContext();
		const { primitiveElement, currentElement } = usePrimitiveElement();
		const disabled = computed(() => props.disabled || rootContext.disabled.value || false);
		const activedescendant = ref();
		watchSyncEffect(() => activedescendant.value = rootContext.highlightedElement.value?.id);
		onMounted(() => {
			rootContext.focusable.value = false;
			setTimeout(() => {
				if (props.autoFocus) currentElement.value?.focus();
			}, 1);
		});
		onUnmounted(() => {
			rootContext.focusable.value = true;
		});
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), {
				ref_key: "primitiveElement",
				ref: primitiveElement,
				as: _ctx.as,
				"as-child": _ctx.asChild,
				value: unref(modelValue),
				disabled: disabled.value ? "" : void 0,
				"data-disabled": disabled.value ? "" : void 0,
				"aria-disabled": disabled.value ?? void 0,
				"aria-activedescendant": activedescendant.value,
				type: "text",
				onKeydown: [withKeys(withModifiers(unref(rootContext).onKeydownNavigation, ["prevent"]), [
					"down",
					"up",
					"home",
					"end"
				]), withKeys(unref(rootContext).onKeydownEnter, ["enter"])],
				onInput: _cache[0] || (_cache[0] = (event) => {
					modelValue.value = event.target.value;
					unref(rootContext).highlightFirstItem();
				}),
				onCompositionstart: unref(rootContext).onCompositionStart,
				onCompositionend: unref(rootContext).onCompositionEnd
			}, {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", { modelValue: unref(modelValue) })]),
				_: 3
			}, 8, [
				"as",
				"as-child",
				"value",
				"disabled",
				"data-disabled",
				"aria-disabled",
				"aria-activedescendant",
				"onKeydown",
				"onCompositionstart",
				"onCompositionend"
			]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/Listbox/ListboxItem.js
var LISTBOX_SELECT = "listbox.select";
var [injectListboxItemContext, provideListboxItemContext] = createContext("ListboxItem");
var ListboxItem_default = /* @__PURE__ */ defineComponent({
	__name: "ListboxItem",
	props: {
		value: {
			type: null,
			required: true
		},
		disabled: {
			type: Boolean,
			required: false
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false,
			default: "div"
		}
	},
	emits: ["select"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const id = useId(void 0, "reka-listbox-item");
		const { CollectionItem } = useCollection();
		const { forwardRef, currentElement } = useForwardExpose();
		const rootContext = injectListboxRootContext();
		const isHighlighted = computed(() => currentElement.value === rootContext.highlightedElement.value);
		const isSelected = computed(() => valueComparator$1(rootContext.modelValue.value, props.value, rootContext.by));
		const disabled = computed(() => rootContext.disabled.value || props.disabled);
		async function handleSelect(ev) {
			emits("select", ev);
			if (ev?.defaultPrevented) return;
			if (!disabled.value && ev) {
				rootContext.onValueChange(props.value);
				rootContext.changeHighlight(currentElement.value);
			}
		}
		function handleSelectCustomEvent(ev) {
			handleAndDispatchCustomEvent(LISTBOX_SELECT, handleSelect, {
				originalEvent: ev,
				value: props.value
			});
		}
		provideListboxItemContext({ isSelected });
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(CollectionItem), { value: _ctx.value }, {
				default: withCtx(() => [withMemo([isHighlighted.value, isSelected.value], () => createVNode(unref(Primitive), mergeProps({ id: unref(id) }, _ctx.$attrs, {
					ref: unref(forwardRef),
					role: "option",
					tabindex: unref(rootContext).focusable.value ? isHighlighted.value ? "0" : "-1" : -1,
					"aria-selected": isSelected.value,
					as: _ctx.as,
					"as-child": _ctx.asChild,
					disabled: disabled.value ? "" : void 0,
					"data-disabled": disabled.value ? "" : void 0,
					"data-highlighted": isHighlighted.value ? "" : void 0,
					"data-state": isSelected.value ? "checked" : "unchecked",
					onClick: handleSelectCustomEvent,
					onKeydown: withKeys(withModifiers(handleSelectCustomEvent, ["prevent"]), ["space"]),
					onPointermove: _cache[0] || (_cache[0] = () => {
						if (unref(rootContext).highlightedElement.value === unref(currentElement)) return;
						if (unref(rootContext).highlightOnHover.value && !unref(rootContext).focusable.value) unref(rootContext).changeHighlight(unref(currentElement), false);
					})
				}), {
					default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
					_: 3
				}, 16, [
					"id",
					"tabindex",
					"aria-selected",
					"as",
					"as-child",
					"disabled",
					"data-disabled",
					"data-highlighted",
					"data-state",
					"onKeydown"
				]), _cache, 1)]),
				_: 3
			}, 8, ["value"]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/Listbox/ListboxItemIndicator.js
var ListboxItemIndicator_default = /* @__PURE__ */ defineComponent({
	__name: "ListboxItemIndicator",
	props: {
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false,
			default: "span"
		}
	},
	setup(__props) {
		const props = __props;
		useForwardExpose();
		const itemContext = injectListboxItemContext();
		return (_ctx, _cache) => {
			return unref(itemContext).isSelected.value ? (openBlock(), createBlock(unref(Primitive), mergeProps({
				key: 0,
				"aria-hidden": "true"
			}, props), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16)) : createCommentVNode("v-if", true);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/@tanstack+virtual-core@3.17.4/node_modules/@tanstack/virtual-core/dist/esm/lazy-measurements.js
function createLazyMeasurementsView(count, flat, getItemKey) {
	const cache = new Array(count);
	return new Proxy(cache, { get(target, prop, receiver) {
		if (typeof prop === "string") {
			const c = prop.charCodeAt(0);
			if (c >= 48 && c <= 57) {
				const i = +prop;
				if (Number.isInteger(i) && i >= 0 && i < count) {
					let v = target[i];
					if (!v) {
						const s = flat[i * 2];
						v = target[i] = {
							index: i,
							key: getItemKey(i),
							start: s,
							size: flat[i * 2 + 1],
							end: s + flat[i * 2 + 1],
							lane: 0
						};
					}
					return v;
				}
			}
			if (prop === "length") return count;
		}
		return Reflect.get(target, prop, receiver);
	} });
}
//#endregion
//#region node_modules/.pnpm/@tanstack+virtual-core@3.17.4/node_modules/@tanstack/virtual-core/dist/esm/utils.js
function memo(getDeps, fn, opts) {
	let deps = opts.initialDeps ?? [];
	let result;
	let isInitial = true;
	function memoizedFunction() {
		const newDeps = getDeps();
		if (!(newDeps.length !== deps.length || newDeps.some((dep, index) => deps[index] !== dep))) return result;
		deps = newDeps;
		result = fn(...newDeps);
		if ((opts == null ? void 0 : opts.onChange) && !(isInitial && opts.skipInitialOnChange)) opts.onChange(result);
		isInitial = false;
		return result;
	}
	memoizedFunction.updateDeps = (newDeps) => {
		deps = newDeps;
	};
	return memoizedFunction;
}
function notUndefined(value, msg) {
	if (value === void 0) throw new Error(`Unexpected undefined${msg ? `: ${msg}` : ""}`);
	else return value;
}
var approxEqual = (a, b) => Math.abs(a - b) < 1.01;
var debounce$1 = /* @__PURE__ */ __name((targetWindow, fn, ms) => {
	let timeoutId;
	return function(...args) {
		targetWindow.clearTimeout(timeoutId);
		timeoutId = targetWindow.setTimeout(() => fn.apply(this, args), ms);
	};
}, "debounce");
//#endregion
//#region node_modules/.pnpm/@tanstack+virtual-core@3.17.4/node_modules/@tanstack/virtual-core/dist/esm/index.js
var _isIOSResult;
var isIOSWebKit = () => {
	if (_isIOSResult !== void 0) return _isIOSResult;
	if (typeof navigator === "undefined") return _isIOSResult = false;
	if (/iP(hone|od|ad)/.test(navigator.userAgent)) return _isIOSResult = true;
	const mtp = navigator.maxTouchPoints;
	return _isIOSResult = navigator.platform === "MacIntel" && mtp !== void 0 && mtp > 0;
};
var getRect = (element) => {
	const { offsetWidth, offsetHeight } = element;
	return {
		width: offsetWidth,
		height: offsetHeight
	};
};
var defaultKeyExtractor = (index) => index;
var defaultRangeExtractor = (range) => {
	const start = Math.max(range.startIndex - range.overscan, 0);
	const len = Math.min(range.endIndex + range.overscan, range.count - 1) - start + 1;
	const arr = new Array(len);
	for (let i = 0; i < len; i++) arr[i] = start + i;
	return arr;
};
var observeElementRect = (instance, cb) => {
	const element = instance.scrollElement;
	if (!element) return;
	const targetWindow = instance.targetWindow;
	if (!targetWindow) return;
	const handler = (rect) => {
		const { width, height } = rect;
		cb({
			width: Math.round(width),
			height: Math.round(height)
		});
	};
	handler(getRect(element));
	if (!targetWindow.ResizeObserver) return () => {};
	const observer = new targetWindow.ResizeObserver((entries) => {
		const run = () => {
			const entry = entries[0];
			if (entry == null ? void 0 : entry.borderBoxSize) {
				const box = entry.borderBoxSize[0];
				if (box) {
					handler({
						width: box.inlineSize,
						height: box.blockSize
					});
					return;
				}
			}
			handler(getRect(element));
		};
		instance.options.useAnimationFrameWithResizeObserver ? requestAnimationFrame(run) : run();
	});
	observer.observe(element, { box: "border-box" });
	return () => {
		observer.unobserve(element);
	};
};
var addEventListenerOptions = { passive: true };
var supportsScrollend = typeof window == "undefined" ? true : "onscrollend" in window;
var observeOffset = (instance, cb, readOffset) => {
	const element = instance.scrollElement;
	if (!element) return;
	const targetWindow = instance.targetWindow;
	if (!targetWindow) return;
	const registerScrollendEvent = instance.options.useScrollendEvent && supportsScrollend;
	let offset = 0;
	const fallback = registerScrollendEvent ? null : debounce$1(targetWindow, () => cb(offset, false), instance.options.isScrollingResetDelay);
	const createHandler = (isScrolling) => () => {
		offset = readOffset(element);
		fallback?.();
		cb(offset, isScrolling);
	};
	const handler = createHandler(true);
	const endHandler = createHandler(false);
	element.addEventListener("scroll", handler, addEventListenerOptions);
	if (registerScrollendEvent) element.addEventListener("scrollend", endHandler, addEventListenerOptions);
	return () => {
		element.removeEventListener("scroll", handler);
		if (registerScrollendEvent) element.removeEventListener("scrollend", endHandler);
	};
};
var observeElementOffset = (instance, cb) => observeOffset(instance, cb, (el) => {
	const { horizontal, isRtl } = instance.options;
	return horizontal ? el.scrollLeft * (isRtl && -1 || 1) : el.scrollTop;
});
var measureElement = (element, entry, instance) => {
	if (instance.options.useCachedMeasurements) {
		const index = instance.indexFromElement(element);
		const key = instance.options.getItemKey(index);
		return instance.itemSizeCache.get(key) ?? instance.options.estimateSize(index);
	}
	if (entry == null ? void 0 : entry.borderBoxSize) {
		const box = entry.borderBoxSize[0];
		if (box) return Math.round(box[instance.options.horizontal ? "inlineSize" : "blockSize"]);
	}
	if (!entry) {
		const index = instance.indexFromElement(element);
		const key = instance.options.getItemKey(index);
		const cachedSize = instance.itemSizeCache.get(key);
		if (cachedSize !== void 0) return cachedSize;
	}
	return element[instance.options.horizontal ? "offsetWidth" : "offsetHeight"];
};
var scrollWithAdjustments = (offset, { adjustments = 0, behavior }, instance) => {
	var _a;
	var _b;
	(_b = (_a = instance.scrollElement) == null ? void 0 : _a.scrollTo) == null || _b.call(_a, {
		[instance.options.horizontal ? "left" : "top"]: offset + adjustments,
		behavior
	});
};
var elementScroll = scrollWithAdjustments;
var Virtualizer = class {
	constructor(opts) {
		this.unsubs = [];
		this.scrollElement = null;
		this.targetWindow = null;
		this.isScrolling = false;
		this.scrollState = null;
		this.measurementsCache = [];
		this._flatMeasurements = null;
		this.itemSizeCache = /* @__PURE__ */ new Map();
		this.itemSizeCacheVersion = 0;
		this.laneAssignments = /* @__PURE__ */ new Map();
		this.pendingMin = null;
		this.prevLanes = void 0;
		this.lanesChangedFlag = false;
		this.lanesSettling = false;
		this.pendingScrollAnchor = null;
		this.scrollRect = null;
		this.scrollOffset = null;
		this.scrollDirection = null;
		this.scrollAdjustments = 0;
		this._iosDeferredAdjustment = 0;
		this._iosTouching = false;
		this._iosJustTouchEnded = false;
		this._iosTouchEndTimerId = null;
		this._intendedScrollOffset = null;
		this.elementsCache = /* @__PURE__ */ new Map();
		this.now = () => {
			var _a;
			var _b;
			var _c;
			return ((_c = (_b = (_a = this.targetWindow) == null ? void 0 : _a.performance) == null ? void 0 : _b.now) == null ? void 0 : _c.call(_b)) ?? Date.now();
		};
		this.observer = /* @__PURE__ */ (() => {
			let _ro = null;
			const get = () => {
				if (_ro) return _ro;
				if (!this.targetWindow || !this.targetWindow.ResizeObserver) return null;
				return _ro = new this.targetWindow.ResizeObserver((entries) => {
					entries.forEach((entry) => {
						const run = () => {
							const node = entry.target;
							const index = this.indexFromElement(node);
							if (!node.isConnected) {
								this.observer.unobserve(node);
								for (const [cacheKey, cachedNode] of this.elementsCache) if (cachedNode === node) {
									this.elementsCache.delete(cacheKey);
									break;
								}
								return;
							}
							if (this.shouldMeasureDuringScroll(index)) this.resizeItem(index, this.options.measureElement(node, entry, this));
						};
						this.options.useAnimationFrameWithResizeObserver ? requestAnimationFrame(run) : run();
					});
				});
			};
			return {
				disconnect: () => {
					var _a;
					(_a = get()) == null || _a.disconnect();
					_ro = null;
				},
				observe: (target) => {
					var _a;
					return (_a = get()) == null ? void 0 : _a.observe(target, { box: "border-box" });
				},
				unobserve: (target) => {
					var _a;
					return (_a = get()) == null ? void 0 : _a.unobserve(target);
				}
			};
		})();
		this.range = null;
		this.setOptions = (opts2) => {
			var _a;
			var _b;
			const merged = {
				debug: false,
				initialOffset: 0,
				overscan: 1,
				paddingStart: 0,
				paddingEnd: 0,
				scrollPaddingStart: 0,
				scrollPaddingEnd: 0,
				horizontal: false,
				getItemKey: defaultKeyExtractor,
				rangeExtractor: defaultRangeExtractor,
				onChange: () => {},
				measureElement,
				initialRect: {
					width: 0,
					height: 0
				},
				scrollMargin: 0,
				gap: 0,
				indexAttribute: "data-index",
				initialMeasurementsCache: [],
				lanes: 1,
				anchorTo: "start",
				followOnAppend: false,
				scrollEndThreshold: 1,
				isScrollingResetDelay: 150,
				enabled: true,
				isRtl: false,
				useScrollendEvent: false,
				useAnimationFrameWithResizeObserver: false,
				laneAssignmentMode: "estimate",
				useCachedMeasurements: false
			};
			for (const key in opts2) {
				const v = opts2[key];
				if (v !== void 0) merged[key] = v;
			}
			const prevOptions = this.options;
			let anchor = null;
			let followOnAppend = null;
			let edgeKeysChanged = false;
			if (prevOptions !== void 0 && prevOptions.enabled && merged.enabled && merged.anchorTo === "end" && this.scrollElement !== null) {
				const prevCount = prevOptions.count;
				const nextCount = merged.count;
				const measurements = this.getMeasurements();
				const prevFirstKey = prevCount > 0 ? ((_a = measurements[0]) == null ? void 0 : _a.key) ?? prevOptions.getItemKey(0) : null;
				const prevLastKey = prevCount > 0 ? ((_b = measurements[prevCount - 1]) == null ? void 0 : _b.key) ?? prevOptions.getItemKey(prevCount - 1) : null;
				if (nextCount !== prevCount || prevCount > 0 && nextCount > 0 && (merged.getItemKey(0) !== prevFirstKey || merged.getItemKey(nextCount - 1) !== prevLastKey)) {
					edgeKeysChanged = true;
					const item = prevCount > 0 ? this.getVirtualItemForOffset(this.getScrollOffset()) ?? measurements[0] : null;
					if (item) anchor = [item.key, this.getScrollOffset() - item.start];
					const behavior = merged.followOnAppend === true ? "auto" : merged.followOnAppend || null;
					if (behavior && nextCount > prevCount && this.isAtEnd(prevOptions.scrollEndThreshold) && (prevCount === 0 || merged.getItemKey(nextCount - 1) !== prevLastKey)) followOnAppend = behavior;
				}
			}
			this.options = merged;
			if (edgeKeysChanged) {
				this.pendingMin = 0;
				this.itemSizeCacheVersion++;
			}
			let anchorResolved = false;
			let anchorDelta = 0;
			if (anchor && this.scrollOffset !== null) {
				const [anchorKey, anchorOffset] = anchor;
				const newMeasurements = this.getMeasurements();
				const { count, getItemKey } = this.options;
				let idx = 0;
				while (idx < count && getItemKey(idx) !== anchorKey) idx++;
				if (idx < count) {
					const anchorItem = newMeasurements[idx];
					if (anchorItem) {
						const newOffset = anchorItem.start + anchorOffset;
						if (newOffset !== this.scrollOffset) {
							anchorDelta = newOffset - this.scrollOffset;
							this.scrollOffset = newOffset;
							anchorResolved = true;
						}
					}
				}
			}
			if (anchorResolved || followOnAppend) this.pendingScrollAnchor = [
				anchorResolved ? anchor[0] : null,
				anchorResolved ? anchor[1] : 0,
				followOnAppend,
				anchorDelta
			];
		};
		this.notify = (sync) => {
			var _a;
			var _b;
			(_b = (_a = this.options).onChange) == null || _b.call(_a, this, sync);
		};
		this.maybeNotify = memo(() => {
			this.calculateRange();
			return [
				this.isScrolling,
				this.range ? this.range.startIndex : null,
				this.range ? this.range.endIndex : null
			];
		}, (isScrolling) => {
			this.notify(isScrolling);
		}, {
			key: false,
			debug: () => this.options.debug,
			initialDeps: [
				this.isScrolling,
				this.range ? this.range.startIndex : null,
				this.range ? this.range.endIndex : null
			]
		});
		this.cleanup = () => {
			this.unsubs.filter(Boolean).forEach((d) => d());
			this.unsubs = [];
			this.observer.disconnect();
			if (this.rafId != null && this.targetWindow) {
				this.targetWindow.cancelAnimationFrame(this.rafId);
				this.rafId = null;
			}
			this.scrollState = null;
			this._iosDeferredAdjustment = 0;
			this._iosTouching = false;
			this._iosJustTouchEnded = false;
			this.scrollElement = null;
			this.targetWindow = null;
		};
		this._didMount = () => {
			return () => {
				this.cleanup();
			};
		};
		this._willUpdate = () => {
			var _a;
			const scrollElement = this.options.enabled ? this.options.getScrollElement() : null;
			if (this.scrollElement !== scrollElement) {
				this.cleanup();
				if (!scrollElement) {
					this.maybeNotify();
					return;
				}
				this.scrollElement = scrollElement;
				if (this.scrollElement && "ownerDocument" in this.scrollElement) this.targetWindow = this.scrollElement.ownerDocument.defaultView;
				else this.targetWindow = ((_a = this.scrollElement) == null ? void 0 : _a.window) ?? null;
				this.elementsCache.forEach((cached) => {
					this.observer.observe(cached);
				});
				this.unsubs.push(this.options.observeElementRect(this, (rect) => {
					this.scrollRect = rect;
					this.maybeNotify();
				}));
				this.unsubs.push(this.options.observeElementOffset(this, (offset, isScrolling) => {
					if (isScrolling && this._intendedScrollOffset === null && offset === this.scrollOffset) return;
					if (this._intendedScrollOffset !== null && Math.abs(offset - this._intendedScrollOffset) < 1.5) offset = this._intendedScrollOffset;
					this._intendedScrollOffset = null;
					this.scrollAdjustments = 0;
					const prevOffset = this.getScrollOffset();
					this.scrollDirection = isScrolling ? prevOffset === offset ? this.scrollDirection : prevOffset < offset ? "forward" : "backward" : null;
					this.scrollOffset = offset;
					this.isScrolling = isScrolling;
					this._flushIosDeferredIfReady();
					if (this.scrollState) this.scheduleScrollReconcile();
					this.maybeNotify();
				}));
				if ("addEventListener" in this.scrollElement) {
					const scrollEl = this.scrollElement;
					const onTouchStart = () => {
						this._iosTouching = true;
						this._iosJustTouchEnded = false;
						if (this._iosTouchEndTimerId !== null && this.targetWindow != null) {
							this.targetWindow.clearTimeout(this._iosTouchEndTimerId);
							this._iosTouchEndTimerId = null;
						}
					};
					const onTouchEnd = () => {
						this._iosTouching = false;
						if (!isIOSWebKit() || this.targetWindow == null) return;
						this._iosJustTouchEnded = true;
						this._iosTouchEndTimerId = this.targetWindow.setTimeout(() => {
							this._iosJustTouchEnded = false;
							this._iosTouchEndTimerId = null;
							this._flushIosDeferredIfReady();
						}, 150);
					};
					scrollEl.addEventListener("touchstart", onTouchStart, addEventListenerOptions);
					scrollEl.addEventListener("touchend", onTouchEnd, addEventListenerOptions);
					this.unsubs.push(() => {
						scrollEl.removeEventListener("touchstart", onTouchStart);
						scrollEl.removeEventListener("touchend", onTouchEnd);
						if (this._iosTouchEndTimerId !== null && this.targetWindow != null) {
							this.targetWindow.clearTimeout(this._iosTouchEndTimerId);
							this._iosTouchEndTimerId = null;
						}
					});
				}
				this._scrollToOffset(this.getScrollOffset(), {
					adjustments: void 0,
					behavior: void 0
				});
			}
			const anchor = this.pendingScrollAnchor;
			this.pendingScrollAnchor = null;
			if (anchor && this.scrollElement && this.options.enabled) {
				const [key, _offset, followOnAppend, anchorDelta] = anchor;
				if (key !== null && !followOnAppend) {
					if (isIOSWebKit() && (this.isScrolling || this._iosTouching || this._iosJustTouchEnded)) {
						if (anchorDelta !== 0) this._iosDeferredAdjustment += anchorDelta;
					} else this._scrollToOffset(this.getScrollOffset(), {
						adjustments: void 0,
						behavior: void 0
					});
				}
				if (followOnAppend) this.scrollToEnd({ behavior: followOnAppend });
			}
		};
		this._flushIosDeferredIfReady = () => {
			if (this._iosDeferredAdjustment === 0) return;
			if (this.isScrolling) return;
			if (this._iosTouching) return;
			if (this._iosJustTouchEnded) return;
			const cur = this.getScrollOffset();
			const max = this.getMaxScrollOffset();
			if (cur < 0 || cur > max) return;
			const delta = this._iosDeferredAdjustment;
			this._iosDeferredAdjustment = 0;
			this._scrollToOffset(cur, {
				adjustments: this.scrollAdjustments += delta,
				behavior: void 0
			});
		};
		this.rafId = null;
		this.getSize = () => {
			if (!this.options.enabled) {
				this.scrollRect = null;
				return 0;
			}
			this.scrollRect = this.scrollRect ?? this.options.initialRect;
			return this.scrollRect[this.options.horizontal ? "width" : "height"];
		};
		this.getScrollOffset = () => {
			if (!this.options.enabled) {
				this.scrollOffset = null;
				return 0;
			}
			this.scrollOffset = this.scrollOffset ?? (typeof this.options.initialOffset === "function" ? this.options.initialOffset() : this.options.initialOffset);
			return this.scrollOffset;
		};
		this.getMeasurementOptions = memo(() => [
			this.options.count,
			this.options.paddingStart,
			this.options.scrollMargin,
			this.options.getItemKey,
			this.options.enabled,
			this.options.lanes,
			this.options.laneAssignmentMode,
			this.options.gap
		], (count, paddingStart, scrollMargin, getItemKey, enabled, lanes, laneAssignmentMode, gap) => {
			if (this.prevLanes !== void 0 && this.prevLanes !== lanes) this.lanesChangedFlag = true;
			this.prevLanes = lanes;
			this.pendingMin = null;
			return {
				count,
				paddingStart,
				scrollMargin,
				getItemKey,
				enabled,
				lanes,
				laneAssignmentMode,
				gap
			};
		}, { key: false });
		this.getMeasurements = memo(() => [this.getMeasurementOptions(), this.itemSizeCacheVersion], ({ count, paddingStart, scrollMargin, getItemKey, enabled, lanes, laneAssignmentMode, gap }, _itemSizeCacheVersion) => {
			const itemSizeCache = this.itemSizeCache;
			if (!enabled) {
				this.measurementsCache = [];
				this.itemSizeCache.clear();
				this.laneAssignments.clear();
				return [];
			}
			if (this.laneAssignments.size > count) {
				for (const index of this.laneAssignments.keys()) if (index >= count) this.laneAssignments.delete(index);
			}
			if (this.lanesChangedFlag) {
				this.lanesChangedFlag = false;
				this.lanesSettling = true;
				this.measurementsCache = [];
				this.itemSizeCache.clear();
				this.laneAssignments.clear();
				this.pendingMin = null;
			}
			if (this.measurementsCache.length === 0 && !this.lanesSettling) {
				this.measurementsCache = this.options.initialMeasurementsCache;
				this.measurementsCache.forEach((item) => {
					this.itemSizeCache.set(item.key, item.size);
				});
			}
			const min = this.lanesSettling ? 0 : this.pendingMin ?? 0;
			this.pendingMin = null;
			if (this.lanesSettling && this.measurementsCache.length === count) this.lanesSettling = false;
			if (lanes === 1) {
				const need = count * 2;
				let flat = this._flatMeasurements;
				if (!flat || flat.length < need) {
					const next = new Float64Array(need);
					if (flat && min > 0) next.set(flat.subarray(0, min * 2));
					flat = next;
					this._flatMeasurements = flat;
				}
				let runningStart;
				if (min === 0) runningStart = paddingStart + scrollMargin;
				else {
					const prevIdx = min - 1;
					runningStart = flat[prevIdx * 2] + flat[prevIdx * 2 + 1] + gap;
				}
				for (let i = min; i < count; i++) {
					const key = getItemKey(i);
					const measuredSize = itemSizeCache.get(key);
					const size = typeof measuredSize === "number" ? measuredSize : this.options.estimateSize(i);
					flat[i * 2] = runningStart;
					flat[i * 2 + 1] = size;
					runningStart += size + gap;
				}
				const view = createLazyMeasurementsView(count, flat, getItemKey);
				this.measurementsCache = view;
				return view;
			}
			const measurements = this.measurementsCache.slice(0, min);
			const laneLastIndex = new Array(lanes).fill(void 0);
			const laneEnds = new Float64Array(lanes);
			let filledLanes = 0;
			for (let m = 0; m < min; m++) {
				const item = measurements[m];
				if (item) {
					if (laneLastIndex[item.lane] === void 0) filledLanes++;
					laneLastIndex[item.lane] = m;
					laneEnds[item.lane] = item.end;
				}
			}
			for (let i = min; i < count; i++) {
				const key = getItemKey(i);
				const cachedLane = this.laneAssignments.get(i);
				let lane;
				let start;
				const shouldCacheLane = laneAssignmentMode === "estimate" || itemSizeCache.has(key);
				if (cachedLane !== void 0 && this.options.lanes > 1) {
					lane = cachedLane;
					const prevIndex = laneLastIndex[lane];
					const prevInLane = prevIndex !== void 0 ? measurements[prevIndex] : void 0;
					start = prevInLane ? prevInLane.end + gap : paddingStart + scrollMargin;
				} else if (filledLanes === lanes) {
					let bestLane = 0;
					let bestEnd = laneEnds[0];
					let bestIdx = laneLastIndex[0];
					for (let l = 1; l < lanes; l++) {
						const e = laneEnds[l];
						if (e < bestEnd || e === bestEnd && laneLastIndex[l] < bestIdx) {
							bestLane = l;
							bestEnd = e;
							bestIdx = laneLastIndex[l];
						}
					}
					lane = bestLane;
					start = bestEnd + gap;
					if (shouldCacheLane) this.laneAssignments.set(i, lane);
				} else {
					lane = i % this.options.lanes;
					start = paddingStart + scrollMargin;
					if (shouldCacheLane) this.laneAssignments.set(i, lane);
				}
				const measuredSize = itemSizeCache.get(key);
				const size = typeof measuredSize === "number" ? measuredSize : this.options.estimateSize(i);
				const end = start + size;
				measurements[i] = {
					index: i,
					start,
					size,
					end,
					key,
					lane
				};
				if (laneLastIndex[lane] === void 0) filledLanes++;
				laneLastIndex[lane] = i;
				laneEnds[lane] = end;
			}
			this.measurementsCache = measurements;
			return measurements;
		}, {
			key: false,
			debug: () => this.options.debug
		});
		this.calculateRange = memo(() => [
			this.getMeasurements(),
			this.getSize(),
			this.getScrollOffset(),
			this.options.lanes
		], (measurements, outerSize, scrollOffset, lanes) => {
			if (measurements.length === 0 || outerSize === 0) {
				this.range = null;
				return null;
			}
			this.range = calculateRangeImpl(measurements, outerSize, scrollOffset, lanes, lanes === 1 && this._flatMeasurements != null ? this._flatMeasurements : null);
			return this.range;
		}, {
			key: false,
			debug: () => this.options.debug
		});
		this.getVirtualIndexes = memo(() => {
			let startIndex = null;
			let endIndex = null;
			const range = this.calculateRange();
			if (range) {
				startIndex = range.startIndex;
				endIndex = range.endIndex;
			}
			this.maybeNotify.updateDeps([
				this.isScrolling,
				startIndex,
				endIndex
			]);
			return [
				this.options.rangeExtractor,
				this.options.overscan,
				this.options.count,
				startIndex,
				endIndex
			];
		}, (rangeExtractor, overscan, count, startIndex, endIndex) => {
			return startIndex === null || endIndex === null ? [] : rangeExtractor({
				startIndex,
				endIndex,
				overscan,
				count
			});
		}, {
			key: false,
			debug: () => this.options.debug
		});
		this.indexFromElement = (node) => {
			const attributeName = this.options.indexAttribute;
			const indexStr = node.getAttribute(attributeName);
			if (!indexStr) {
				console.warn(`Missing attribute name '${attributeName}={index}' on measured element.`);
				return -1;
			}
			return parseInt(indexStr, 10);
		};
		this.shouldMeasureDuringScroll = (index) => {
			var _a;
			if (!this.scrollState || this.scrollState.behavior !== "smooth") return true;
			const scrollIndex = this.scrollState.index ?? ((_a = this.getVirtualItemForOffset(this.scrollState.lastTargetOffset)) == null ? void 0 : _a.index);
			if (scrollIndex !== void 0 && this.range) {
				const bufferSize = Math.max(this.options.overscan, Math.ceil((this.range.endIndex - this.range.startIndex) / 2));
				const minIndex = Math.max(0, scrollIndex - bufferSize);
				const maxIndex = Math.min(this.options.count - 1, scrollIndex + bufferSize);
				return index >= minIndex && index <= maxIndex;
			}
			return true;
		};
		this.measureElement = (node) => {
			if (!node) {
				this.elementsCache.forEach((cached, key2) => {
					if (!cached.isConnected) {
						this.observer.unobserve(cached);
						this.elementsCache.delete(key2);
					}
				});
				return;
			}
			const index = this.indexFromElement(node);
			const key = this.options.getItemKey(index);
			const prevNode = this.elementsCache.get(key);
			if (prevNode !== node) {
				if (prevNode) this.observer.unobserve(prevNode);
				this.observer.observe(node);
				this.elementsCache.set(key, node);
			}
			if ((!this.isScrolling || this.scrollState) && this.shouldMeasureDuringScroll(index)) this.resizeItem(index, this.options.measureElement(node, void 0, this));
		};
		this.resizeItem = (index, size) => {
			var _a;
			var _b;
			if (index < 0 || index >= this.options.count) return;
			let cachedSize;
			let itemStart;
			let key;
			const flat = this._flatMeasurements;
			if (this.options.lanes === 1 && flat !== null) {
				key = this.options.getItemKey(index);
				itemStart = flat[index * 2];
				cachedSize = flat[index * 2 + 1];
			} else {
				const item = this.measurementsCache[index];
				if (!item) return;
				key = item.key;
				itemStart = item.start;
				cachedSize = item.size;
			}
			const delta = size - (this.itemSizeCache.get(key) ?? cachedSize);
			if (delta !== 0) {
				const wasAtEnd = this.options.anchorTo === "end" && ((_a = this.scrollState) == null ? void 0 : _a.behavior) !== "smooth" && this.getVirtualDistanceFromEnd() <= this.options.scrollEndThreshold;
				const prevTotalSize = wasAtEnd ? this.getTotalSize() : 0;
				const shouldAdjustScroll = ((_b = this.scrollState) == null ? void 0 : _b.behavior) !== "smooth" && (this.shouldAdjustScrollPositionOnItemSizeChange !== void 0 ? this.shouldAdjustScrollPositionOnItemSizeChange(this.measurementsCache[index] ?? {
					index,
					key,
					start: itemStart,
					size: cachedSize,
					end: itemStart + cachedSize,
					lane: 0
				}, delta, this) : itemStart < this.getScrollOffset() + this.scrollAdjustments && (!this.itemSizeCache.has(key) || this.scrollDirection !== "backward"));
				if (this.pendingMin === null || index < this.pendingMin) this.pendingMin = index;
				this.itemSizeCache.set(key, size);
				this.itemSizeCacheVersion++;
				if (wasAtEnd) this.applyScrollAdjustment(this.getTotalSize() - prevTotalSize);
				else if (shouldAdjustScroll) this.applyScrollAdjustment(delta);
				this.notify(false);
			}
		};
		this.getVirtualItems = memo(() => [this.getVirtualIndexes(), this.getMeasurements()], (indexes, measurements) => {
			const virtualItems = [];
			for (let k = 0, len = indexes.length; k < len; k++) {
				const measurement = measurements[indexes[k]];
				virtualItems.push(measurement);
			}
			return virtualItems;
		}, {
			key: false,
			debug: () => this.options.debug
		});
		this.getVirtualItemForOffset = (offset) => {
			const measurements = this.getMeasurements();
			if (measurements.length === 0) return;
			const flat = this._flatMeasurements;
			const useFlat = this.options.lanes === 1 && flat != null;
			return notUndefined(measurements[findNearestBinarySearch(0, measurements.length - 1, useFlat ? (i) => flat[i * 2] : (i) => notUndefined(measurements[i]).start, offset)]);
		};
		this.getMaxScrollOffset = () => {
			if (!this.scrollElement) return 0;
			if ("scrollHeight" in this.scrollElement) return this.options.horizontal ? this.scrollElement.scrollWidth - this.scrollElement.clientWidth : this.scrollElement.scrollHeight - this.scrollElement.clientHeight;
			else {
				const doc = this.scrollElement.document.documentElement;
				return this.options.horizontal ? doc.scrollWidth - this.scrollElement.innerWidth : doc.scrollHeight - this.scrollElement.innerHeight;
			}
		};
		this.getVirtualDistanceFromEnd = () => {
			return Math.max(this.getTotalSize() - this.getSize() - this.getScrollOffset(), 0);
		};
		this.getDistanceFromEnd = () => {
			return Math.max(this.getMaxScrollOffset() - this.getScrollOffset(), 0);
		};
		this.isAtEnd = (threshold = this.options.scrollEndThreshold) => {
			return this.getDistanceFromEnd() <= threshold;
		};
		this.getOffsetForAlignment = (toOffset, align, itemSize = 0) => {
			if (!this.scrollElement) return 0;
			const size = this.getSize();
			const scrollOffset = this.getScrollOffset();
			if (align === "auto") align = toOffset >= scrollOffset + size ? "end" : "start";
			if (align === "center") toOffset += (itemSize - size) / 2;
			else if (align === "end") toOffset -= size;
			const maxOffset = this.getMaxScrollOffset();
			return Math.max(Math.min(maxOffset, toOffset), 0);
		};
		this.getOffsetForIndex = (index, align = "auto") => {
			index = Math.max(0, Math.min(index, this.options.count - 1));
			const size = this.getSize();
			const scrollOffset = this.getScrollOffset();
			const item = this.measurementsCache[index];
			if (!item) return;
			if (align === "auto") {
				if (item.end >= scrollOffset + size - this.options.scrollPaddingEnd) align = "end";
				else if (item.start <= scrollOffset + this.options.scrollPaddingStart) align = "start";
				else return [scrollOffset, align];
			}
			if (align === "end" && index === this.options.count - 1) return [this.getMaxScrollOffset(), align];
			const toOffset = align === "end" ? item.end + this.options.scrollPaddingEnd : item.start - this.options.scrollPaddingStart;
			return [this.getOffsetForAlignment(toOffset, align, item.size), align];
		};
		this.scrollToOffset = (toOffset, { align = "start", behavior = "auto" } = {}) => {
			const offset = this.getOffsetForAlignment(toOffset, align);
			const now = this.now();
			this.scrollState = {
				index: null,
				align,
				behavior,
				startedAt: now,
				lastTargetOffset: offset,
				stableFrames: 0
			};
			this._scrollToOffset(offset, {
				adjustments: void 0,
				behavior
			});
			this.scheduleScrollReconcile();
		};
		this.scrollToIndex = (index, { align: initialAlign = "auto", behavior = "auto" } = {}) => {
			index = Math.max(0, Math.min(index, this.options.count - 1));
			const offsetInfo = this.getOffsetForIndex(index, initialAlign);
			if (!offsetInfo) return;
			const [offset, align] = offsetInfo;
			const now = this.now();
			this.scrollState = {
				index,
				align,
				behavior,
				startedAt: now,
				lastTargetOffset: offset,
				stableFrames: 0
			};
			this._scrollToOffset(offset, {
				adjustments: void 0,
				behavior
			});
			this.scheduleScrollReconcile();
		};
		this.scrollBy = (delta, { behavior = "auto" } = {}) => {
			const offset = this.getScrollOffset() + delta;
			const now = this.now();
			this.scrollState = {
				index: null,
				align: "start",
				behavior,
				startedAt: now,
				lastTargetOffset: offset,
				stableFrames: 0
			};
			this._scrollToOffset(offset, {
				adjustments: void 0,
				behavior
			});
			this.scheduleScrollReconcile();
		};
		this.scrollToEnd = ({ behavior = "auto" } = {}) => {
			if (this.options.count > 0) {
				this.scrollToIndex(this.options.count - 1, {
					align: "end",
					behavior
				});
				return;
			}
			this.scrollToOffset(Math.max(this.getTotalSize() - this.getSize(), 0), { behavior });
		};
		this.getTotalSize = () => {
			var _a;
			const measurements = this.getMeasurements();
			let end;
			if (measurements.length === 0) end = this.options.paddingStart;
			else if (this.options.lanes === 1) {
				const lastIdx = measurements.length - 1;
				const flat = this._flatMeasurements;
				if (flat != null) end = flat[lastIdx * 2] + flat[lastIdx * 2 + 1];
				else end = ((_a = measurements[lastIdx]) == null ? void 0 : _a.end) ?? 0;
			} else {
				const endByLane = Array(this.options.lanes).fill(null);
				let endIndex = measurements.length - 1;
				while (endIndex >= 0 && endByLane.some((val) => val === null)) {
					const item = measurements[endIndex];
					if (endByLane[item.lane] === null) endByLane[item.lane] = item.end;
					endIndex--;
				}
				end = Math.max(...endByLane.filter((val) => val !== null));
			}
			return Math.max(end - this.options.scrollMargin + this.options.paddingEnd, 0);
		};
		this.takeSnapshot = () => {
			const snapshot = [];
			if (this.itemSizeCache.size === 0) return snapshot;
			const m = this.getMeasurements();
			for (const item of m) if (item && this.itemSizeCache.has(item.key)) snapshot.push({
				index: item.index,
				key: item.key,
				start: item.start,
				size: item.size,
				end: item.end,
				lane: item.lane
			});
			return snapshot;
		};
		this._scrollToOffset = (offset, { adjustments, behavior }) => {
			this._intendedScrollOffset = offset + (adjustments ?? 0);
			this.options.scrollToFn(offset, {
				behavior,
				adjustments
			}, this);
		};
		this.measure = () => {
			this.pendingMin = null;
			this.itemSizeCache.clear();
			this.laneAssignments.clear();
			this.itemSizeCacheVersion++;
			this.notify(false);
		};
		this.setOptions(opts);
	}
	applyScrollAdjustment(delta, behavior) {
		if (delta === 0) return;
		if (isIOSWebKit() && (this.isScrolling || this._iosTouching || this._iosJustTouchEnded)) this._iosDeferredAdjustment += delta;
		else {
			this._scrollToOffset(this.getScrollOffset(), {
				adjustments: this.scrollAdjustments += delta,
				behavior
			});
			if (this.scrollOffset !== null) {
				this.scrollOffset += this.scrollAdjustments;
				this.scrollAdjustments = 0;
			}
		}
	}
	scheduleScrollReconcile() {
		if (!this.targetWindow) {
			this.scrollState = null;
			return;
		}
		if (this.rafId != null) return;
		this.rafId = this.targetWindow.requestAnimationFrame(() => {
			this.rafId = null;
			this.reconcileScroll();
		});
	}
	reconcileScroll() {
		if (!this.scrollState) return;
		if (!this.scrollElement) return;
		if (this.now() - this.scrollState.startedAt > 5e3) {
			this.scrollState = null;
			return;
		}
		const offsetInfo = this.scrollState.index != null ? this.getOffsetForIndex(this.scrollState.index, this.scrollState.align) : void 0;
		const targetOffset = offsetInfo ? offsetInfo[0] : this.scrollState.lastTargetOffset;
		const STABLE_FRAMES = 1;
		const targetChanged = targetOffset !== this.scrollState.lastTargetOffset;
		if (!targetChanged && approxEqual(targetOffset, this.getScrollOffset())) {
			this.scrollState.stableFrames++;
			if (this.scrollState.stableFrames >= STABLE_FRAMES) {
				if (this.getScrollOffset() !== targetOffset) this._scrollToOffset(targetOffset, {
					adjustments: void 0,
					behavior: "auto"
				});
				this.scrollState = null;
				return;
			}
		} else {
			this.scrollState.stableFrames = 0;
			if (targetChanged) {
				const viewport = this.getSize() || 600;
				const distance = Math.abs(targetOffset - this.getScrollOffset());
				const keepSmooth = this.scrollState.behavior === "smooth" && distance > viewport;
				this.scrollState.lastTargetOffset = targetOffset;
				if (!keepSmooth) this.scrollState.behavior = "auto";
				this._scrollToOffset(targetOffset, {
					adjustments: void 0,
					behavior: keepSmooth ? "smooth" : "auto"
				});
			}
		}
		this.scheduleScrollReconcile();
	}
};
var findNearestBinarySearch = (low, high, getCurrentValue, value) => {
	while (low <= high) {
		const middle = (low + high) / 2 | 0;
		const currentValue = getCurrentValue(middle);
		if (currentValue < value) low = middle + 1;
		else if (currentValue > value) high = middle - 1;
		else return middle;
	}
	if (low > 0) return low - 1;
	else return 0;
};
function findNearestBinarySearchFlat(flat, high, value) {
	let low = 0;
	while (low <= high) {
		const middle = (low + high) / 2 | 0;
		const currentValue = flat[middle * 2];
		if (currentValue < value) low = middle + 1;
		else if (currentValue > value) high = middle - 1;
		else return middle;
	}
	return low > 0 ? low - 1 : 0;
}
function calculateRangeImpl(measurements, outerSize, scrollOffset, lanes, flat) {
	const lastIndex = measurements.length - 1;
	if (measurements.length <= lanes) return {
		startIndex: 0,
		endIndex: lastIndex
	};
	if (lanes === 1 && flat !== null) {
		const startIndex2 = findNearestBinarySearchFlat(flat, lastIndex, scrollOffset);
		let endIndex2 = startIndex2;
		const limit = scrollOffset + outerSize;
		while (endIndex2 < lastIndex && flat[endIndex2 * 2] + flat[endIndex2 * 2 + 1] < limit) endIndex2++;
		return {
			startIndex: startIndex2,
			endIndex: endIndex2
		};
	}
	const getStart = (index) => measurements[index].start;
	let startIndex = findNearestBinarySearch(0, lastIndex, getStart, scrollOffset);
	let endIndex = startIndex;
	if (lanes === 1) while (endIndex < lastIndex && measurements[endIndex].end < scrollOffset + outerSize) endIndex++;
	else if (lanes > 1) {
		const endPerLane = Array(lanes).fill(0);
		while (endIndex < lastIndex && endPerLane.some((pos) => pos < scrollOffset + outerSize)) {
			const item = measurements[endIndex];
			endPerLane[item.lane] = item.end;
			endIndex++;
		}
		const startPerLane = Array(lanes).fill(scrollOffset + outerSize);
		while (startIndex >= 0 && startPerLane.some((pos) => pos >= scrollOffset)) {
			const item = measurements[startIndex];
			startPerLane[item.lane] = item.start;
			startIndex--;
		}
		startIndex = Math.max(0, startIndex - startIndex % lanes);
		endIndex = Math.min(lastIndex, endIndex + (lanes - 1 - endIndex % lanes));
	}
	return {
		startIndex,
		endIndex
	};
}
//#endregion
//#region node_modules/.pnpm/@tanstack+vue-virtual@3.13.32_vue@3.5.42_typescript@6.0.3_/node_modules/@tanstack/vue-virtual/dist/esm/index.js
function useVirtualizerBase(options) {
	const virtualizer = new Virtualizer(unref(options));
	const state = shallowRef(virtualizer);
	const cleanup = virtualizer._didMount();
	watch(() => unref(options).getScrollElement(), (el) => {
		if (el) virtualizer._willUpdate();
	}, { immediate: true });
	watch(() => unref(options), (options2) => {
		virtualizer.setOptions({
			...options2,
			onChange: (instance, sync) => {
				var _a;
				triggerRef(state);
				(_a = options2.onChange) == null || _a.call(options2, instance, sync);
			}
		});
		virtualizer._willUpdate();
		triggerRef(state);
	}, { immediate: true });
	onScopeDispose(cleanup);
	return state;
}
function useVirtualizer(options) {
	return useVirtualizerBase(computed(() => ({
		observeElementRect,
		observeElementOffset,
		scrollToFn: elementScroll,
		...unref(options)
	})));
}
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/Combobox/ComboboxRoot.js
var [injectComboboxRootContext, provideComboboxRootContext] = createContext("ComboboxRoot");
var ComboboxRoot_default = /* @__PURE__ */ defineComponent({
	__name: "ComboboxRoot",
	props: {
		open: {
			type: Boolean,
			required: false,
			default: void 0
		},
		defaultOpen: {
			type: Boolean,
			required: false
		},
		resetSearchTermOnBlur: {
			type: Boolean,
			required: false,
			default: true
		},
		resetSearchTermOnSelect: {
			type: Boolean,
			required: false,
			default: true
		},
		openOnFocus: {
			type: Boolean,
			required: false,
			default: false
		},
		openOnClick: {
			type: Boolean,
			required: false,
			default: false
		},
		ignoreFilter: {
			type: Boolean,
			required: false
		},
		resetModelValueOnClear: {
			type: Boolean,
			required: false,
			default: false
		},
		modelValue: {
			type: null,
			required: false
		},
		defaultValue: {
			type: null,
			required: false
		},
		multiple: {
			type: Boolean,
			required: false
		},
		dir: {
			type: String,
			required: false
		},
		disabled: {
			type: Boolean,
			required: false
		},
		highlightOnHover: {
			type: Boolean,
			required: false,
			default: true
		},
		by: {
			type: [String, Function],
			required: false
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false
		},
		name: {
			type: String,
			required: false
		},
		required: {
			type: Boolean,
			required: false
		}
	},
	emits: [
		"update:modelValue",
		"highlight",
		"update:open"
	],
	setup(__props, { expose: __expose, emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const { primitiveElement, currentElement: parentElement } = usePrimitiveElement();
		const { multiple, disabled, ignoreFilter, resetSearchTermOnSelect, openOnFocus, openOnClick, dir: propDir, resetModelValueOnClear, highlightOnHover } = toRefs(props);
		const dir = useDirection(propDir);
		const modelValue = useVModel(props, "modelValue", emits, {
			defaultValue: props.defaultValue ?? (multiple.value ? [] : void 0),
			passive: props.modelValue === void 0,
			deep: true
		});
		const open = useVModel(props, "open", emits, {
			defaultValue: props.defaultOpen,
			passive: props.open === void 0
		});
		async function onOpenChange(val) {
			open.value = val;
			filterSearch.value = "";
			if (val) {
				await nextTick();
				primitiveElement.value?.highlightSelected();
				isUserInputted.value = true;
				inputElement.value?.focus();
			} else {
				isUserInputted.value = false;
				setTimeout(() => {
					if (!val && props.resetSearchTermOnBlur) resetSearchTerm.trigger();
				}, 1);
			}
		}
		const resetSearchTerm = createEventHook();
		const isUserInputted = ref(false);
		const isVirtual = ref(false);
		const inputElement = ref();
		const triggerElement = ref();
		const highlightedElement = computed(() => primitiveElement.value?.highlightedElement ?? void 0);
		const allItems = ref(/* @__PURE__ */ new Map());
		const allGroups = ref(/* @__PURE__ */ new Map());
		const { contains } = useFilter({ sensitivity: "base" });
		const filterSearch = ref("");
		const filterState = computed((oldValue) => {
			if (!filterSearch.value || props.ignoreFilter || isVirtual.value) return {
				count: allItems.value.size,
				items: oldValue?.items ?? /* @__PURE__ */ new Map(),
				groups: oldValue?.groups ?? new Set(allGroups.value.keys())
			};
			let itemCount = 0;
			const filteredItems = /* @__PURE__ */ new Map();
			const filteredGroups = /* @__PURE__ */ new Set();
			for (const [id, value] of allItems.value) {
				const score = contains(value, filterSearch.value);
				filteredItems.set(id, score ? 1 : 0);
				if (score) itemCount++;
			}
			for (const [groupId, group] of allGroups.value) for (const itemId of group) if (filteredItems.get(itemId) > 0) {
				filteredGroups.add(groupId);
				break;
			}
			return {
				count: itemCount,
				items: filteredItems,
				groups: filteredGroups
			};
		});
		const inst = getCurrentInstance();
		onMounted(() => {
			if (inst?.exposed) {
				inst.exposed.highlightItem = primitiveElement.value?.highlightItem;
				inst.exposed.highlightFirstItem = primitiveElement.value?.highlightFirstItem;
				inst.exposed.highlightSelected = primitiveElement.value?.highlightSelected;
			}
		});
		__expose({
			filtered: filterState,
			highlightedElement,
			highlightItem: primitiveElement.value?.highlightItem,
			highlightFirstItem: primitiveElement.value?.highlightFirstItem,
			highlightSelected: primitiveElement.value?.highlightSelected
		});
		provideComboboxRootContext({
			modelValue,
			multiple,
			disabled,
			open,
			onOpenChange,
			contentId: "",
			isUserInputted,
			isVirtual,
			inputElement,
			highlightedElement,
			onInputElementChange: (val) => inputElement.value = val,
			triggerElement,
			onTriggerElementChange: (val) => triggerElement.value = val,
			parentElement,
			resetSearchTermOnSelect,
			onResetSearchTerm: resetSearchTerm.on,
			allItems,
			allGroups,
			filterSearch,
			filterState,
			ignoreFilter,
			openOnFocus,
			openOnClick,
			resetModelValueOnClear
		});
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(PopperRoot_default), null, {
				default: withCtx(() => [createVNode(unref(ListboxRoot_default), mergeProps({
					ref_key: "primitiveElement",
					ref: primitiveElement
				}, _ctx.$attrs, {
					modelValue: unref(modelValue),
					"onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => isRef(modelValue) ? modelValue.value = $event : null),
					style: { pointerEvents: unref(open) ? "auto" : void 0 },
					as: _ctx.as,
					"as-child": _ctx.asChild,
					dir: unref(dir),
					multiple: unref(multiple),
					name: _ctx.name,
					required: _ctx.required,
					disabled: unref(disabled),
					"highlight-on-hover": unref(highlightOnHover),
					by: props.by,
					onHighlight: _cache[1] || (_cache[1] = ($event) => emits("highlight", $event))
				}), {
					default: withCtx(() => [renderSlot(_ctx.$slots, "default", {
						open: unref(open),
						modelValue: unref(modelValue)
					})]),
					_: 3
				}, 16, [
					"modelValue",
					"style",
					"as",
					"as-child",
					"dir",
					"multiple",
					"name",
					"required",
					"disabled",
					"highlight-on-hover",
					"by"
				])]),
				_: 3
			});
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/Combobox/ComboboxContentImpl.js
var [injectComboboxContentContext, provideComboboxContentContext] = createContext("ComboboxContent");
var ComboboxContentImpl_default = /* @__PURE__ */ defineComponent({
	__name: "ComboboxContentImpl",
	props: {
		position: {
			type: String,
			required: false,
			default: "inline"
		},
		bodyLock: {
			type: Boolean,
			required: false
		},
		side: {
			type: null,
			required: false
		},
		sideOffset: {
			type: Number,
			required: false
		},
		sideFlip: {
			type: Boolean,
			required: false
		},
		align: {
			type: null,
			required: false
		},
		alignOffset: {
			type: Number,
			required: false
		},
		alignFlip: {
			type: Boolean,
			required: false
		},
		avoidCollisions: {
			type: Boolean,
			required: false
		},
		collisionBoundary: {
			type: null,
			required: false
		},
		collisionPadding: {
			type: [Number, Object],
			required: false
		},
		arrowPadding: {
			type: Number,
			required: false
		},
		sticky: {
			type: String,
			required: false
		},
		hideWhenDetached: {
			type: Boolean,
			required: false
		},
		positionStrategy: {
			type: String,
			required: false
		},
		updatePositionStrategy: {
			type: String,
			required: false
		},
		disableUpdateOnLayoutShift: {
			type: Boolean,
			required: false
		},
		prioritizePosition: {
			type: Boolean,
			required: false
		},
		reference: {
			type: null,
			required: false
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false
		},
		disableOutsidePointerEvents: {
			type: Boolean,
			required: false
		}
	},
	emits: [
		"escapeKeyDown",
		"pointerDownOutside",
		"focusOutside",
		"interactOutside"
	],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const { position } = toRefs(props);
		const rootContext = injectComboboxRootContext();
		const { forwardRef, currentElement } = useForwardExpose();
		useBodyScrollLock(props.bodyLock);
		useHideOthers(rootContext.parentElement);
		const forwardedProps = useForwardProps(computed(() => {
			if (props.position === "popper") return props;
			else return {};
		}).value);
		const popperStyle = {
			"boxSizing": "border-box",
			"--reka-combobox-content-transform-origin": "var(--reka-popper-transform-origin)",
			"--reka-combobox-content-available-width": "var(--reka-popper-available-width)",
			"--reka-combobox-content-available-height": "var(--reka-popper-available-height)",
			"--reka-combobox-trigger-width": "var(--reka-popper-anchor-width)",
			"--reka-combobox-trigger-height": "var(--reka-popper-anchor-height)"
		};
		provideComboboxContentContext({ position });
		const isInputWithinContent = ref(false);
		onMounted(() => {
			if (rootContext.inputElement.value) {
				isInputWithinContent.value = currentElement.value.contains(rootContext.inputElement.value);
				if (isInputWithinContent.value) rootContext.inputElement.value.focus();
			}
		});
		onUnmounted(() => {
			const activeElement = getActiveElement();
			if (isInputWithinContent.value && (!activeElement || activeElement === document.body)) rootContext.triggerElement.value?.focus();
		});
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(ListboxContent_default), { "as-child": "" }, {
				default: withCtx(() => [createVNode(unref(DismissableLayer_default), {
					"as-child": "",
					"disable-outside-pointer-events": _ctx.disableOutsidePointerEvents,
					onDismiss: _cache[0] || (_cache[0] = ($event) => unref(rootContext).onOpenChange(false)),
					onFocusOutside: _cache[1] || (_cache[1] = (ev) => {
						if (unref(rootContext).parentElement.value?.contains(ev.target)) ev.preventDefault();
						emits("focusOutside", ev);
					}),
					onInteractOutside: _cache[2] || (_cache[2] = ($event) => emits("interactOutside", $event)),
					onEscapeKeyDown: _cache[3] || (_cache[3] = ($event) => emits("escapeKeyDown", $event)),
					onPointerDownOutside: _cache[4] || (_cache[4] = (ev) => {
						if (unref(rootContext).parentElement.value?.contains(ev.target)) ev.preventDefault();
						emits("pointerDownOutside", ev);
					})
				}, {
					default: withCtx(() => [(openBlock(), createBlock(resolveDynamicComponent(unref(position) === "popper" ? unref(PopperContent_default) : unref(Primitive)), mergeProps({
						..._ctx.$attrs,
						...unref(forwardedProps)
					}, {
						id: unref(rootContext).contentId,
						ref: unref(forwardRef),
						"data-state": unref(rootContext).open.value ? "open" : "closed",
						style: {
							display: "flex",
							flexDirection: "column",
							outline: "none",
							...unref(position) === "popper" ? popperStyle : {}
						}
					}), {
						default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
						_: 3
					}, 16, [
						"id",
						"data-state",
						"style"
					]))]),
					_: 3
				}, 8, ["disable-outside-pointer-events"])]),
				_: 3
			});
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/Combobox/ComboboxContent.js
var ComboboxContent_default = /* @__PURE__ */ defineComponent({
	__name: "ComboboxContent",
	props: {
		forceMount: {
			type: Boolean,
			required: false
		},
		position: {
			type: String,
			required: false
		},
		bodyLock: {
			type: Boolean,
			required: false
		},
		side: {
			type: null,
			required: false
		},
		sideOffset: {
			type: Number,
			required: false
		},
		sideFlip: {
			type: Boolean,
			required: false
		},
		align: {
			type: null,
			required: false
		},
		alignOffset: {
			type: Number,
			required: false
		},
		alignFlip: {
			type: Boolean,
			required: false
		},
		avoidCollisions: {
			type: Boolean,
			required: false
		},
		collisionBoundary: {
			type: null,
			required: false
		},
		collisionPadding: {
			type: [Number, Object],
			required: false
		},
		arrowPadding: {
			type: Number,
			required: false
		},
		sticky: {
			type: String,
			required: false
		},
		hideWhenDetached: {
			type: Boolean,
			required: false
		},
		positionStrategy: {
			type: String,
			required: false
		},
		updatePositionStrategy: {
			type: String,
			required: false
		},
		disableUpdateOnLayoutShift: {
			type: Boolean,
			required: false
		},
		prioritizePosition: {
			type: Boolean,
			required: false
		},
		reference: {
			type: null,
			required: false
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false
		},
		disableOutsidePointerEvents: {
			type: Boolean,
			required: false
		}
	},
	emits: [
		"escapeKeyDown",
		"pointerDownOutside",
		"focusOutside",
		"interactOutside"
	],
	setup(__props, { emit: __emit }) {
		const forwarded = useForwardPropsEmits(__props, __emit);
		const { forwardRef } = useForwardExpose();
		const rootContext = injectComboboxRootContext();
		rootContext.contentId ||= useId(void 0, "reka-combobox-content");
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Presence_default), { present: _ctx.forceMount || unref(rootContext).open.value }, {
				default: withCtx(() => [createVNode(ComboboxContentImpl_default, mergeProps({
					...unref(forwarded),
					..._ctx.$attrs
				}, { ref: unref(forwardRef) }), {
					default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
					_: 3
				}, 16)]),
				_: 3
			}, 8, ["present"]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/Combobox/ComboboxEmpty.js
var ComboboxEmpty_default = /* @__PURE__ */ defineComponent({
	__name: "ComboboxEmpty",
	props: {
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false
		}
	},
	setup(__props) {
		const props = __props;
		const rootContext = injectComboboxRootContext();
		const isRender = computed(() => rootContext.ignoreFilter.value ? rootContext.allItems.value.size === 0 : rootContext.filterState.value.count === 0);
		return (_ctx, _cache) => {
			return isRender.value ? (openBlock(), createBlock(unref(Primitive), normalizeProps(mergeProps({ key: 0 }, props)), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", {}, () => [_cache[0] || (_cache[0] = createTextVNode("No options"))])]),
				_: 3
			}, 16)) : createCommentVNode("v-if", true);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/Combobox/ComboboxGroup.js
var [injectComboboxGroupContext, provideComboboxGroupContext] = createContext("ComboboxGroup");
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/Combobox/ComboboxInput.js
var ComboboxInput_default = /* @__PURE__ */ defineComponent({
	__name: "ComboboxInput",
	props: {
		displayValue: {
			type: Function,
			required: false
		},
		modelValue: {
			type: String,
			required: false
		},
		autoFocus: {
			type: Boolean,
			required: false
		},
		disabled: {
			type: Boolean,
			required: false
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false,
			default: "input"
		}
	},
	emits: ["update:modelValue"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const rootContext = injectComboboxRootContext();
		const listboxContext = injectListboxRootContext();
		const { primitiveElement, currentElement } = usePrimitiveElement();
		const modelValue = useVModel(props, "modelValue", emits, { passive: props.modelValue === void 0 });
		onMounted(() => {
			if (currentElement.value) rootContext.onInputElementChange(currentElement.value);
		});
		function handleKeyDown(ev) {
			if (!rootContext.open.value) rootContext.onOpenChange(true);
		}
		function handleInput(event) {
			const target = event.target;
			if (!rootContext.open.value) {
				rootContext.onOpenChange(true);
				nextTick(() => {
					if (target.value) {
						rootContext.filterSearch.value = target.value;
						listboxContext.highlightFirstItem();
					}
				});
			} else rootContext.filterSearch.value = target.value;
		}
		function handleFocus() {
			if (rootContext.openOnFocus.value && !rootContext.open.value) rootContext.onOpenChange(true);
		}
		function handleClick() {
			if (rootContext.openOnClick.value && !rootContext.open.value) rootContext.onOpenChange(true);
		}
		function resetSearchTerm() {
			const rootModelValue = rootContext.modelValue.value;
			if (props.displayValue) modelValue.value = props.displayValue(rootModelValue);
			else if (!rootContext.multiple.value && rootModelValue && !Array.isArray(rootModelValue)) if (typeof rootModelValue !== "object") modelValue.value = rootModelValue.toString();
			else modelValue.value = "";
			else modelValue.value = "";
			nextTick(() => {
				modelValue.value = modelValue.value;
			});
		}
		rootContext.onResetSearchTerm(() => {
			resetSearchTerm();
		});
		watch(rootContext.modelValue, async () => {
			if (!rootContext.isUserInputted.value && rootContext.resetSearchTermOnSelect.value) resetSearchTerm();
		}, {
			immediate: true,
			deep: true
		});
		watch(rootContext.filterState, (_newValue, oldValue) => {
			if (!rootContext.isVirtual.value && oldValue.count === 0) listboxContext.highlightFirstItem();
		});
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(ListboxFilter_default), {
				ref_key: "primitiveElement",
				ref: primitiveElement,
				modelValue: unref(modelValue),
				"onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => isRef(modelValue) ? modelValue.value = $event : null),
				as: _ctx.as,
				"as-child": _ctx.asChild,
				"auto-focus": _ctx.autoFocus,
				disabled: _ctx.disabled,
				"aria-expanded": unref(rootContext).open.value,
				"aria-controls": unref(rootContext).contentId,
				"aria-autocomplete": "list",
				role: "combobox",
				autocomplete: "off",
				onClick: handleClick,
				onInput: handleInput,
				onKeydown: withKeys(withModifiers(handleKeyDown, ["prevent"]), ["down", "up"]),
				onFocus: handleFocus
			}, {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 8, [
				"modelValue",
				"as",
				"as-child",
				"auto-focus",
				"disabled",
				"aria-expanded",
				"aria-controls",
				"onKeydown"
			]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/Combobox/ComboboxItem.js
var ComboboxItem_default = /* @__PURE__ */ defineComponent({
	__name: "ComboboxItem",
	props: {
		textValue: {
			type: String,
			required: false
		},
		value: {
			type: null,
			required: true
		},
		disabled: {
			type: Boolean,
			required: false
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false
		}
	},
	emits: ["select"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const id = useId(void 0, "reka-combobox-item");
		const rootContext = injectComboboxRootContext();
		const groupContext = injectComboboxGroupContext(null);
		const { primitiveElement, currentElement } = usePrimitiveElement();
		if (props.value === "") throw new Error("A <ComboboxItem /> must have a value prop that is not an empty string. This is because the Combobox value can be set to an empty string to clear the selection and show the placeholder.");
		const isRender = computed(() => {
			if (rootContext.isVirtual.value || rootContext.ignoreFilter.value || !rootContext.filterSearch.value) return true;
			else {
				const filteredCurrentItem = rootContext.filterState.value.items.get(id);
				if (filteredCurrentItem === void 0) return true;
				return filteredCurrentItem > 0;
			}
		});
		onMounted(() => {
			rootContext.allItems.value.set(id, props.textValue || currentElement.value.textContent || currentElement.value.innerText);
			const groupId = groupContext?.id;
			if (groupId) if (!rootContext.allGroups.value.has(groupId)) rootContext.allGroups.value.set(groupId, /* @__PURE__ */ new Set([id]));
			else rootContext.allGroups.value.get(groupId)?.add(id);
		});
		onUnmounted(() => {
			rootContext.allItems.value.delete(id);
		});
		return (_ctx, _cache) => {
			return isRender.value ? (openBlock(), createBlock(unref(ListboxItem_default), mergeProps({ key: 0 }, props, {
				id: unref(id),
				ref_key: "primitiveElement",
				ref: primitiveElement,
				disabled: unref(rootContext).disabled.value || _ctx.disabled,
				onSelect: _cache[0] || (_cache[0] = (event) => {
					emits("select", event);
					if (event.defaultPrevented) return;
					if (!unref(rootContext).multiple.value && !_ctx.disabled && !unref(rootContext).disabled.value) {
						event.preventDefault();
						unref(rootContext).onOpenChange(false);
						unref(rootContext).modelValue.value = props.value;
					}
				})
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", {}, () => [createTextVNode(toDisplayString(_ctx.value), 1)])]),
				_: 3
			}, 16, ["id", "disabled"])) : createCommentVNode("v-if", true);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/Combobox/ComboboxItemIndicator.js
var ComboboxItemIndicator_default = /* @__PURE__ */ defineComponent({
	__name: "ComboboxItemIndicator",
	props: {
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false,
			default: "span"
		}
	},
	setup(__props) {
		const props = __props;
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(ListboxItemIndicator_default), normalizeProps(guardReactiveProps(props)), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/Combobox/ComboboxPortal.js
var ComboboxPortal_default = /* @__PURE__ */ defineComponent({
	__name: "ComboboxPortal",
	props: {
		to: {
			type: null,
			required: false
		},
		disabled: {
			type: Boolean,
			required: false
		},
		defer: {
			type: Boolean,
			required: false
		},
		forceMount: {
			type: Boolean,
			required: false
		}
	},
	setup(__props) {
		const props = __props;
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Teleport_default), normalizeProps(guardReactiveProps(props)), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/Combobox/ComboboxTrigger.js
var ComboboxTrigger_default = /* @__PURE__ */ defineComponent({
	__name: "ComboboxTrigger",
	props: {
		disabled: {
			type: Boolean,
			required: false
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false,
			default: "button"
		}
	},
	setup(__props) {
		const props = __props;
		const { forwardRef, currentElement } = useForwardExpose();
		const rootContext = injectComboboxRootContext();
		const disabled = computed(() => props.disabled || rootContext.disabled.value || false);
		onMounted(() => {
			if (currentElement.value) rootContext.onTriggerElementChange(currentElement.value);
		});
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), mergeProps(props, {
				ref: unref(forwardRef),
				type: _ctx.as === "button" ? "button" : void 0,
				tabindex: "-1",
				"aria-label": "Show popup",
				"aria-haspopup": "listbox",
				"aria-expanded": unref(rootContext).open.value,
				"aria-controls": unref(rootContext).contentId,
				"data-state": unref(rootContext).open.value ? "open" : "closed",
				disabled: disabled.value,
				"data-disabled": disabled.value ? "" : void 0,
				"aria-disabled": disabled.value ?? void 0,
				onClick: _cache[0] || (_cache[0] = ($event) => unref(rootContext).onOpenChange(!unref(rootContext).open.value))
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16, [
				"type",
				"aria-expanded",
				"aria-controls",
				"data-state",
				"disabled",
				"data-disabled",
				"aria-disabled"
			]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/shared/useNonce.js
function useNonce(nonce) {
	const context = injectConfigProviderContext({ nonce: ref() });
	return computed(() => nonce?.value || context.nonce?.value);
}
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/Combobox/ComboboxViewport.js
var ComboboxViewport_default = /* @__PURE__ */ defineComponent({
	__name: "ComboboxViewport",
	props: {
		nonce: {
			type: String,
			required: false
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false
		}
	},
	setup(__props) {
		const props = __props;
		const { forwardRef } = useForwardExpose();
		const { nonce: propNonce } = toRefs(props);
		const nonce = useNonce(propNonce);
		const rootContext = injectComboboxRootContext();
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock(Fragment, null, [createVNode(unref(Primitive), mergeProps({
				..._ctx.$attrs,
				...props
			}, {
				ref: unref(forwardRef),
				"data-reka-combobox-viewport": "",
				role: "presentation",
				style: {
					position: "relative",
					flex: unref(rootContext).isVirtual.value ? void 0 : 1,
					overflow: "auto"
				}
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16, ["style"]), createVNode(unref(Primitive), {
				as: "style",
				nonce: unref(nonce)
			}, {
				default: withCtx(() => _cache[0] || (_cache[0] = [createTextVNode(" /* Hide scrollbars cross-browser and enable momentum scroll for touch devices */ [data-reka-combobox-viewport] { scrollbar-width:none; -ms-overflow-style: none; -webkit-overflow-scrolling: touch; } [data-reka-combobox-viewport]::-webkit-scrollbar { display: none; } ")])),
				_: 1,
				__: [0]
			}, 8, ["nonce"])], 64);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/Menu/MenuAnchor.js
var MenuAnchor_default = /* @__PURE__ */ defineComponent({
	__name: "MenuAnchor",
	props: {
		reference: {
			type: null,
			required: false
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false
		}
	},
	setup(__props) {
		const props = __props;
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(PopperAnchor_default), normalizeProps(guardReactiveProps(props)), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/shared/useIsUsingKeyboard.js
function useIsUsingKeyboardImpl() {
	const isUsingKeyboard = ref(false);
	onMounted(() => {
		useEventListener("keydown", () => {
			isUsingKeyboard.value = true;
		}, {
			capture: true,
			passive: true
		});
		useEventListener(["pointerdown", "pointermove"], () => {
			isUsingKeyboard.value = false;
		}, {
			capture: true,
			passive: true
		});
	});
	return isUsingKeyboard;
}
var useIsUsingKeyboard = createSharedComposable(useIsUsingKeyboardImpl);
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/Menu/MenuRoot.js
var [injectMenuContext, provideMenuContext] = createContext(["MenuRoot", "MenuSub"], "MenuContext");
var [injectMenuRootContext, provideMenuRootContext] = createContext("MenuRoot");
var MenuRoot_default = /* @__PURE__ */ defineComponent({
	__name: "MenuRoot",
	props: {
		open: {
			type: Boolean,
			required: false,
			default: false
		},
		dir: {
			type: String,
			required: false
		},
		modal: {
			type: Boolean,
			required: false,
			default: true
		}
	},
	emits: ["update:open"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const { modal, dir: propDir } = toRefs(props);
		const dir = useDirection(propDir);
		const open = useVModel(props, "open", emits);
		const content = ref();
		const isUsingKeyboardRef = useIsUsingKeyboard();
		provideMenuContext({
			open,
			onOpenChange: (value) => {
				open.value = value;
			},
			content,
			onContentChange: (element) => {
				content.value = element;
			}
		});
		provideMenuRootContext({
			onClose: () => {
				open.value = false;
			},
			isUsingKeyboardRef,
			dir,
			modal
		});
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(PopperRoot_default), null, {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			});
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/Menu/MenuContentImpl.js
var [injectMenuContentContext, provideMenuContentContext] = createContext("MenuContent");
var MenuContentImpl_default = /* @__PURE__ */ defineComponent({
	__name: "MenuContentImpl",
	props: /* @__PURE__ */ mergeDefaults({
		loop: {
			type: Boolean,
			required: false
		},
		disableOutsidePointerEvents: {
			type: Boolean,
			required: false
		},
		disableOutsideScroll: {
			type: Boolean,
			required: false
		},
		trapFocus: {
			type: Boolean,
			required: false
		},
		side: {
			type: null,
			required: false
		},
		sideOffset: {
			type: Number,
			required: false
		},
		sideFlip: {
			type: Boolean,
			required: false
		},
		align: {
			type: null,
			required: false
		},
		alignOffset: {
			type: Number,
			required: false
		},
		alignFlip: {
			type: Boolean,
			required: false
		},
		avoidCollisions: {
			type: Boolean,
			required: false
		},
		collisionBoundary: {
			type: null,
			required: false
		},
		collisionPadding: {
			type: [Number, Object],
			required: false
		},
		arrowPadding: {
			type: Number,
			required: false
		},
		sticky: {
			type: String,
			required: false
		},
		hideWhenDetached: {
			type: Boolean,
			required: false
		},
		positionStrategy: {
			type: String,
			required: false
		},
		updatePositionStrategy: {
			type: String,
			required: false
		},
		disableUpdateOnLayoutShift: {
			type: Boolean,
			required: false
		},
		prioritizePosition: {
			type: Boolean,
			required: false
		},
		reference: {
			type: null,
			required: false
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false
		}
	}, { ...PopperContentPropsDefaultValue }),
	emits: [
		"escapeKeyDown",
		"pointerDownOutside",
		"focusOutside",
		"interactOutside",
		"entryFocus",
		"openAutoFocus",
		"closeAutoFocus",
		"dismiss"
	],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const menuContext = injectMenuContext();
		const rootContext = injectMenuRootContext();
		const { trapFocus, disableOutsidePointerEvents, loop } = toRefs(props);
		useFocusGuards();
		useBodyScrollLock(disableOutsidePointerEvents.value);
		const searchRef = ref("");
		const timerRef = ref(0);
		const pointerGraceTimerRef = ref(0);
		const pointerGraceIntentRef = ref(null);
		const pointerDirRef = ref("right");
		const lastPointerXRef = ref(0);
		const currentItemId = ref(null);
		const rovingFocusGroupRef = ref();
		const { forwardRef, currentElement: contentElement } = useForwardExpose();
		const { handleTypeaheadSearch } = useTypeahead();
		watch(contentElement, (el) => {
			menuContext.onContentChange(el);
		});
		onUnmounted(() => {
			window.clearTimeout(timerRef.value);
		});
		function isPointerMovingToSubmenu(event) {
			return pointerDirRef.value === pointerGraceIntentRef.value?.side && isPointerInGraceArea(event, pointerGraceIntentRef.value?.area);
		}
		async function handleMountAutoFocus(event) {
			emits("openAutoFocus", event);
			if (event.defaultPrevented) return;
			event.preventDefault();
			contentElement.value?.focus({ preventScroll: true });
		}
		function handleKeyDown(event) {
			if (event.defaultPrevented) return;
			const isKeyDownInside = event.target.closest("[data-reka-menu-content]") === event.currentTarget;
			const isModifierKey = event.ctrlKey || event.altKey || event.metaKey;
			const isCharacterKey = event.key.length === 1;
			const el = useArrowNavigation(event, getActiveElement(), contentElement.value, {
				loop: loop.value,
				arrowKeyOptions: "vertical",
				dir: rootContext?.dir.value,
				focus: true,
				attributeName: "[data-reka-collection-item]:not([data-disabled])"
			});
			if (el) return el?.focus();
			if (event.code === "Space") return;
			const collectionItems = rovingFocusGroupRef.value?.getItems() ?? [];
			if (isKeyDownInside) {
				if (event.key === "Tab") event.preventDefault();
				if (!isModifierKey && isCharacterKey) handleTypeaheadSearch(event.key, collectionItems);
			}
			if (event.target !== contentElement.value) return;
			if (!FIRST_LAST_KEYS.includes(event.key)) return;
			event.preventDefault();
			const candidateNodes = [...collectionItems.map((item) => item.ref)];
			if (LAST_KEYS.includes(event.key)) candidateNodes.reverse();
			focusFirst$1(candidateNodes);
		}
		function handleBlur(event) {
			if (!event?.currentTarget?.contains?.(event.target)) {
				window.clearTimeout(timerRef.value);
				searchRef.value = "";
			}
		}
		function handlePointerMove(event) {
			if (!isMouseEvent$1(event)) return;
			const target = event.target;
			const pointerXHasChanged = lastPointerXRef.value !== event.clientX;
			if ((event?.currentTarget)?.contains(target) && pointerXHasChanged) {
				const newDir = event.clientX > lastPointerXRef.value ? "right" : "left";
				pointerDirRef.value = newDir;
				lastPointerXRef.value = event.clientX;
			}
		}
		provideMenuContentContext({
			onItemEnter: (event) => {
				if (isPointerMovingToSubmenu(event)) return true;
				else return false;
			},
			onItemLeave: (event) => {
				if (isPointerMovingToSubmenu(event)) return;
				contentElement.value?.focus();
				currentItemId.value = null;
			},
			onTriggerLeave: (event) => {
				if (isPointerMovingToSubmenu(event)) return true;
				else return false;
			},
			searchRef,
			pointerGraceTimerRef,
			onPointerGraceIntentChange: (intent) => {
				pointerGraceIntentRef.value = intent;
			}
		});
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(FocusScope_default), {
				"as-child": "",
				trapped: unref(trapFocus),
				onMountAutoFocus: handleMountAutoFocus,
				onUnmountAutoFocus: _cache[7] || (_cache[7] = ($event) => emits("closeAutoFocus", $event))
			}, {
				default: withCtx(() => [createVNode(unref(DismissableLayer_default), {
					"as-child": "",
					"disable-outside-pointer-events": unref(disableOutsidePointerEvents),
					onEscapeKeyDown: _cache[2] || (_cache[2] = ($event) => emits("escapeKeyDown", $event)),
					onPointerDownOutside: _cache[3] || (_cache[3] = ($event) => emits("pointerDownOutside", $event)),
					onFocusOutside: _cache[4] || (_cache[4] = ($event) => emits("focusOutside", $event)),
					onInteractOutside: _cache[5] || (_cache[5] = ($event) => emits("interactOutside", $event)),
					onDismiss: _cache[6] || (_cache[6] = ($event) => emits("dismiss"))
				}, {
					default: withCtx(() => [createVNode(unref(RovingFocusGroup_default), {
						ref_key: "rovingFocusGroupRef",
						ref: rovingFocusGroupRef,
						"current-tab-stop-id": currentItemId.value,
						"onUpdate:currentTabStopId": _cache[0] || (_cache[0] = ($event) => currentItemId.value = $event),
						"as-child": "",
						orientation: "vertical",
						dir: unref(rootContext).dir.value,
						loop: unref(loop),
						onEntryFocus: _cache[1] || (_cache[1] = (event) => {
							emits("entryFocus", event);
							if (!unref(rootContext).isUsingKeyboardRef.value) event.preventDefault();
						})
					}, {
						default: withCtx(() => [createVNode(unref(PopperContent_default), {
							ref: unref(forwardRef),
							role: "menu",
							as: _ctx.as,
							"as-child": _ctx.asChild,
							"aria-orientation": "vertical",
							"data-reka-menu-content": "",
							"data-state": unref(getOpenState)(unref(menuContext).open.value),
							dir: unref(rootContext).dir.value,
							side: _ctx.side,
							"side-offset": _ctx.sideOffset,
							align: _ctx.align,
							"align-offset": _ctx.alignOffset,
							"avoid-collisions": _ctx.avoidCollisions,
							"collision-boundary": _ctx.collisionBoundary,
							"collision-padding": _ctx.collisionPadding,
							"arrow-padding": _ctx.arrowPadding,
							"prioritize-position": _ctx.prioritizePosition,
							"position-strategy": _ctx.positionStrategy,
							"update-position-strategy": _ctx.updatePositionStrategy,
							sticky: _ctx.sticky,
							"hide-when-detached": _ctx.hideWhenDetached,
							reference: _ctx.reference,
							onKeydown: handleKeyDown,
							onBlur: handleBlur,
							onPointermove: handlePointerMove
						}, {
							default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
							_: 3
						}, 8, [
							"as",
							"as-child",
							"data-state",
							"dir",
							"side",
							"side-offset",
							"align",
							"align-offset",
							"avoid-collisions",
							"collision-boundary",
							"collision-padding",
							"arrow-padding",
							"prioritize-position",
							"position-strategy",
							"update-position-strategy",
							"sticky",
							"hide-when-detached",
							"reference"
						])]),
						_: 3
					}, 8, [
						"current-tab-stop-id",
						"dir",
						"loop"
					])]),
					_: 3
				}, 8, ["disable-outside-pointer-events"])]),
				_: 3
			}, 8, ["trapped"]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/Menu/MenuItemImpl.js
var MenuItemImpl_default = /* @__PURE__ */ defineComponent({
	inheritAttrs: false,
	__name: "MenuItemImpl",
	props: {
		disabled: {
			type: Boolean,
			required: false
		},
		textValue: {
			type: String,
			required: false
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false
		}
	},
	setup(__props) {
		const props = __props;
		const contentContext = injectMenuContentContext();
		const { forwardRef } = useForwardExpose();
		const { CollectionItem } = useCollection();
		const isFocused = ref(false);
		async function handlePointerMove(event) {
			if (event.defaultPrevented) return;
			if (!isMouseEvent$1(event)) return;
			if (props.disabled) contentContext.onItemLeave(event);
			else if (!contentContext.onItemEnter(event)) event.currentTarget?.focus({ preventScroll: true });
		}
		async function handlePointerLeave(event) {
			await nextTick();
			if (event.defaultPrevented) return;
			if (!isMouseEvent$1(event)) return;
			contentContext.onItemLeave(event);
		}
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(CollectionItem), { value: { textValue: _ctx.textValue } }, {
				default: withCtx(() => [createVNode(unref(Primitive), mergeProps({
					ref: unref(forwardRef),
					role: "menuitem",
					tabindex: "-1"
				}, _ctx.$attrs, {
					as: _ctx.as,
					"as-child": _ctx.asChild,
					"aria-disabled": _ctx.disabled || void 0,
					"data-disabled": _ctx.disabled ? "" : void 0,
					"data-highlighted": isFocused.value ? "" : void 0,
					onPointermove: handlePointerMove,
					onPointerleave: handlePointerLeave,
					onFocus: _cache[0] || (_cache[0] = async (event) => {
						await nextTick();
						if (event.defaultPrevented || _ctx.disabled) return;
						isFocused.value = true;
					}),
					onBlur: _cache[1] || (_cache[1] = async (event) => {
						await nextTick();
						if (event.defaultPrevented) return;
						isFocused.value = false;
					})
				}), {
					default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
					_: 3
				}, 16, [
					"as",
					"as-child",
					"aria-disabled",
					"data-disabled",
					"data-highlighted"
				])]),
				_: 3
			}, 8, ["value"]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/Menu/MenuItem.js
var MenuItem_default = /* @__PURE__ */ defineComponent({
	__name: "MenuItem",
	props: {
		disabled: {
			type: Boolean,
			required: false
		},
		textValue: {
			type: String,
			required: false
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false
		}
	},
	emits: ["select"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const { forwardRef, currentElement } = useForwardExpose();
		const rootContext = injectMenuRootContext();
		const contentContext = injectMenuContentContext();
		const isPointerDownRef = ref(false);
		async function handleSelect() {
			const menuItem = currentElement.value;
			if (!props.disabled && menuItem) {
				const itemSelectEvent = new CustomEvent(ITEM_SELECT, {
					bubbles: true,
					cancelable: true
				});
				emits("select", itemSelectEvent);
				await nextTick();
				if (itemSelectEvent.defaultPrevented) isPointerDownRef.value = false;
				else rootContext.onClose();
			}
		}
		return (_ctx, _cache) => {
			return openBlock(), createBlock(MenuItemImpl_default, mergeProps(props, {
				ref: unref(forwardRef),
				onClick: handleSelect,
				onPointerdown: _cache[0] || (_cache[0] = () => {
					isPointerDownRef.value = true;
				}),
				onPointerup: _cache[1] || (_cache[1] = async (event) => {
					await nextTick();
					if (event.defaultPrevented) return;
					if (!isPointerDownRef.value) event.currentTarget?.click();
				}),
				onKeydown: _cache[2] || (_cache[2] = async (event) => {
					const isTypingAhead = unref(contentContext).searchRef.value !== "";
					if (_ctx.disabled || isTypingAhead && event.key === " ") return;
					if (unref(SELECTION_KEYS$1).includes(event.key)) {
						event.currentTarget.click();
						/**
						* We prevent default browser behaviour for selection keys as they should trigger
						* a selection only:
						* - prevents space from scrolling the page.
						* - if keydown causes focus to move, prevents keydown from firing on the new target.
						*/
						event.preventDefault();
					}
				})
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/Menu/MenuItemIndicator.js
var [injectMenuItemIndicatorContext, provideMenuItemIndicatorContext] = createContext(["MenuCheckboxItem", "MenuRadioItem"], "MenuItemIndicatorContext");
var MenuItemIndicator_default = /* @__PURE__ */ defineComponent({
	__name: "MenuItemIndicator",
	props: {
		forceMount: {
			type: Boolean,
			required: false
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false,
			default: "span"
		}
	},
	setup(__props) {
		const indicatorContext = injectMenuItemIndicatorContext({ modelValue: ref(false) });
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Presence_default), { present: _ctx.forceMount || unref(isIndeterminate$1)(unref(indicatorContext).modelValue.value) || unref(indicatorContext).modelValue.value === true }, {
				default: withCtx(() => [createVNode(unref(Primitive), {
					as: _ctx.as,
					"as-child": _ctx.asChild,
					"data-state": unref(getCheckedState)(unref(indicatorContext).modelValue.value)
				}, {
					default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
					_: 3
				}, 8, [
					"as",
					"as-child",
					"data-state"
				])]),
				_: 3
			}, 8, ["present"]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/Menu/MenuCheckboxItem.js
var MenuCheckboxItem_default = /* @__PURE__ */ defineComponent({
	__name: "MenuCheckboxItem",
	props: {
		modelValue: {
			type: [Boolean, String],
			required: false,
			default: false
		},
		disabled: {
			type: Boolean,
			required: false
		},
		textValue: {
			type: String,
			required: false
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false
		}
	},
	emits: ["select", "update:modelValue"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const forwarded = useForwardProps(reactiveOmit(props, ["modelValue"]));
		const modelValue = useVModel(props, "modelValue", emits);
		provideMenuItemIndicatorContext({ modelValue });
		return (_ctx, _cache) => {
			return openBlock(), createBlock(MenuItem_default, mergeProps({ role: "menuitemcheckbox" }, unref(forwarded), {
				"aria-checked": unref(isIndeterminate$1)(unref(modelValue)) ? "mixed" : unref(modelValue),
				"data-state": unref(getCheckedState)(unref(modelValue)),
				onSelect: _cache[0] || (_cache[0] = async (event) => {
					emits("select", event);
					if (unref(isIndeterminate$1)(unref(modelValue))) modelValue.value = true;
					else modelValue.value = !unref(modelValue);
				})
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", { modelValue: unref(modelValue) })]),
				_: 3
			}, 16, ["aria-checked", "data-state"]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/Menu/MenuRootContentModal.js
var MenuRootContentModal_default = /* @__PURE__ */ defineComponent({
	__name: "MenuRootContentModal",
	props: {
		loop: {
			type: Boolean,
			required: false
		},
		side: {
			type: null,
			required: false
		},
		sideOffset: {
			type: Number,
			required: false
		},
		sideFlip: {
			type: Boolean,
			required: false
		},
		align: {
			type: null,
			required: false
		},
		alignOffset: {
			type: Number,
			required: false
		},
		alignFlip: {
			type: Boolean,
			required: false
		},
		avoidCollisions: {
			type: Boolean,
			required: false
		},
		collisionBoundary: {
			type: null,
			required: false
		},
		collisionPadding: {
			type: [Number, Object],
			required: false
		},
		arrowPadding: {
			type: Number,
			required: false
		},
		sticky: {
			type: String,
			required: false
		},
		hideWhenDetached: {
			type: Boolean,
			required: false
		},
		positionStrategy: {
			type: String,
			required: false
		},
		updatePositionStrategy: {
			type: String,
			required: false
		},
		disableUpdateOnLayoutShift: {
			type: Boolean,
			required: false
		},
		prioritizePosition: {
			type: Boolean,
			required: false
		},
		reference: {
			type: null,
			required: false
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false
		}
	},
	emits: [
		"escapeKeyDown",
		"pointerDownOutside",
		"focusOutside",
		"interactOutside",
		"entryFocus",
		"openAutoFocus",
		"closeAutoFocus"
	],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const forwarded = useForwardPropsEmits(props, emits);
		const menuContext = injectMenuContext();
		const { forwardRef, currentElement } = useForwardExpose();
		useHideOthers(currentElement);
		return (_ctx, _cache) => {
			return openBlock(), createBlock(MenuContentImpl_default, mergeProps(unref(forwarded), {
				ref: unref(forwardRef),
				"trap-focus": unref(menuContext).open.value,
				"disable-outside-pointer-events": unref(menuContext).open.value,
				"disable-outside-scroll": true,
				onDismiss: _cache[0] || (_cache[0] = ($event) => unref(menuContext).onOpenChange(false)),
				onFocusOutside: _cache[1] || (_cache[1] = withModifiers(($event) => emits("focusOutside", $event), ["prevent"]))
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16, ["trap-focus", "disable-outside-pointer-events"]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/Menu/MenuRootContentNonModal.js
var MenuRootContentNonModal_default = /* @__PURE__ */ defineComponent({
	__name: "MenuRootContentNonModal",
	props: {
		loop: {
			type: Boolean,
			required: false
		},
		side: {
			type: null,
			required: false
		},
		sideOffset: {
			type: Number,
			required: false
		},
		sideFlip: {
			type: Boolean,
			required: false
		},
		align: {
			type: null,
			required: false
		},
		alignOffset: {
			type: Number,
			required: false
		},
		alignFlip: {
			type: Boolean,
			required: false
		},
		avoidCollisions: {
			type: Boolean,
			required: false
		},
		collisionBoundary: {
			type: null,
			required: false
		},
		collisionPadding: {
			type: [Number, Object],
			required: false
		},
		arrowPadding: {
			type: Number,
			required: false
		},
		sticky: {
			type: String,
			required: false
		},
		hideWhenDetached: {
			type: Boolean,
			required: false
		},
		positionStrategy: {
			type: String,
			required: false
		},
		updatePositionStrategy: {
			type: String,
			required: false
		},
		disableUpdateOnLayoutShift: {
			type: Boolean,
			required: false
		},
		prioritizePosition: {
			type: Boolean,
			required: false
		},
		reference: {
			type: null,
			required: false
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false
		}
	},
	emits: [
		"escapeKeyDown",
		"pointerDownOutside",
		"focusOutside",
		"interactOutside",
		"entryFocus",
		"openAutoFocus",
		"closeAutoFocus"
	],
	setup(__props, { emit: __emit }) {
		const forwarded = useForwardPropsEmits(__props, __emit);
		const menuContext = injectMenuContext();
		return (_ctx, _cache) => {
			return openBlock(), createBlock(MenuContentImpl_default, mergeProps(unref(forwarded), {
				"trap-focus": false,
				"disable-outside-pointer-events": false,
				"disable-outside-scroll": false,
				onDismiss: _cache[0] || (_cache[0] = ($event) => unref(menuContext).onOpenChange(false))
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/Menu/MenuContent.js
var MenuContent_default = /* @__PURE__ */ defineComponent({
	__name: "MenuContent",
	props: {
		forceMount: {
			type: Boolean,
			required: false
		},
		loop: {
			type: Boolean,
			required: false
		},
		side: {
			type: null,
			required: false
		},
		sideOffset: {
			type: Number,
			required: false
		},
		sideFlip: {
			type: Boolean,
			required: false
		},
		align: {
			type: null,
			required: false
		},
		alignOffset: {
			type: Number,
			required: false
		},
		alignFlip: {
			type: Boolean,
			required: false
		},
		avoidCollisions: {
			type: Boolean,
			required: false
		},
		collisionBoundary: {
			type: null,
			required: false
		},
		collisionPadding: {
			type: [Number, Object],
			required: false
		},
		arrowPadding: {
			type: Number,
			required: false
		},
		sticky: {
			type: String,
			required: false
		},
		hideWhenDetached: {
			type: Boolean,
			required: false
		},
		positionStrategy: {
			type: String,
			required: false
		},
		updatePositionStrategy: {
			type: String,
			required: false
		},
		disableUpdateOnLayoutShift: {
			type: Boolean,
			required: false
		},
		prioritizePosition: {
			type: Boolean,
			required: false
		},
		reference: {
			type: null,
			required: false
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false
		}
	},
	emits: [
		"escapeKeyDown",
		"pointerDownOutside",
		"focusOutside",
		"interactOutside",
		"entryFocus",
		"openAutoFocus",
		"closeAutoFocus"
	],
	setup(__props, { emit: __emit }) {
		const forwarded = useForwardPropsEmits(__props, __emit);
		const menuContext = injectMenuContext();
		const rootContext = injectMenuRootContext();
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Presence_default), { present: _ctx.forceMount || unref(menuContext).open.value }, {
				default: withCtx(() => [unref(rootContext).modal.value ? (openBlock(), createBlock(MenuRootContentModal_default, normalizeProps(mergeProps({ key: 0 }, {
					..._ctx.$attrs,
					...unref(forwarded)
				})), {
					default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
					_: 3
				}, 16)) : (openBlock(), createBlock(MenuRootContentNonModal_default, normalizeProps(mergeProps({ key: 1 }, {
					..._ctx.$attrs,
					...unref(forwarded)
				})), {
					default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
					_: 3
				}, 16))]),
				_: 3
			}, 8, ["present"]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/Menu/MenuGroup.js
var MenuGroup_default = /* @__PURE__ */ defineComponent({
	__name: "MenuGroup",
	props: {
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false
		}
	},
	setup(__props) {
		const props = __props;
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), mergeProps({ role: "group" }, props), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/Menu/MenuLabel.js
var MenuLabel_default = /* @__PURE__ */ defineComponent({
	__name: "MenuLabel",
	props: {
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false,
			default: "div"
		}
	},
	setup(__props) {
		const props = __props;
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), normalizeProps(guardReactiveProps(props)), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/Menu/MenuPortal.js
var MenuPortal_default = /* @__PURE__ */ defineComponent({
	__name: "MenuPortal",
	props: {
		to: {
			type: null,
			required: false
		},
		disabled: {
			type: Boolean,
			required: false
		},
		defer: {
			type: Boolean,
			required: false
		},
		forceMount: {
			type: Boolean,
			required: false
		}
	},
	setup(__props) {
		const props = __props;
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Teleport_default), normalizeProps(guardReactiveProps(props)), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/Menu/MenuRadioGroup.js
var [injectMenuRadioGroupContext, provideMenuRadioGroupContext] = createContext("MenuRadioGroup");
var MenuRadioGroup_default = /* @__PURE__ */ defineComponent({
	__name: "MenuRadioGroup",
	props: {
		modelValue: {
			type: String,
			required: false,
			default: ""
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false
		}
	},
	emits: ["update:modelValue"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const forwarded = useForwardProps(reactiveOmit(props, ["modelValue"]));
		const modelValue = useVModel(props, "modelValue", emits);
		provideMenuRadioGroupContext({
			modelValue,
			onValueChange: (payload) => {
				modelValue.value = payload;
			}
		});
		return (_ctx, _cache) => {
			return openBlock(), createBlock(MenuGroup_default, normalizeProps(guardReactiveProps(unref(forwarded))), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", { modelValue: unref(modelValue) })]),
				_: 3
			}, 16);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/Menu/MenuRadioItem.js
var MenuRadioItem_default = /* @__PURE__ */ defineComponent({
	__name: "MenuRadioItem",
	props: {
		value: {
			type: String,
			required: true
		},
		disabled: {
			type: Boolean,
			required: false
		},
		textValue: {
			type: String,
			required: false
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false
		}
	},
	emits: ["select"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const forwarded = useForwardProps(reactiveOmit(props, ["value"]));
		const { value } = toRefs(props);
		const radioGroupContext = injectMenuRadioGroupContext();
		const modelValue = computed(() => radioGroupContext.modelValue.value === value?.value);
		provideMenuItemIndicatorContext({ modelValue });
		return (_ctx, _cache) => {
			return openBlock(), createBlock(MenuItem_default, mergeProps({ role: "menuitemradio" }, unref(forwarded), {
				"aria-checked": modelValue.value,
				"data-state": unref(getCheckedState)(modelValue.value),
				onSelect: _cache[0] || (_cache[0] = async (event) => {
					emits("select", event);
					unref(radioGroupContext).onValueChange(unref(value));
				})
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16, ["aria-checked", "data-state"]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/Menu/MenuSeparator.js
var MenuSeparator_default = /* @__PURE__ */ defineComponent({
	__name: "MenuSeparator",
	props: {
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false
		}
	},
	setup(__props) {
		const props = __props;
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), mergeProps(props, {
				role: "separator",
				"aria-orientation": "horizontal"
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/Menu/MenuSub.js
var [injectMenuSubContext, provideMenuSubContext] = createContext("MenuSub");
var MenuSub_default = /* @__PURE__ */ defineComponent({
	__name: "MenuSub",
	props: { open: {
		type: Boolean,
		required: false,
		default: void 0
	} },
	emits: ["update:open"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const open = useVModel(props, "open", __emit, {
			defaultValue: false,
			passive: props.open === void 0
		});
		const parentMenuContext = injectMenuContext();
		const trigger = ref();
		const content = ref();
		watchEffect((cleanupFn) => {
			if (parentMenuContext?.open.value === false) open.value = false;
			cleanupFn(() => open.value = false);
		});
		provideMenuContext({
			open,
			onOpenChange: (value) => {
				open.value = value;
			},
			content,
			onContentChange: (element) => {
				content.value = element;
			}
		});
		provideMenuSubContext({
			triggerId: "",
			contentId: "",
			trigger,
			onTriggerChange: (element) => {
				trigger.value = element;
			}
		});
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(PopperRoot_default), null, {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			});
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/Menu/MenuSubContent.js
var MenuSubContent_default = /* @__PURE__ */ defineComponent({
	__name: "MenuSubContent",
	props: {
		forceMount: {
			type: Boolean,
			required: false
		},
		loop: {
			type: Boolean,
			required: false
		},
		sideOffset: {
			type: Number,
			required: false
		},
		sideFlip: {
			type: Boolean,
			required: false
		},
		alignOffset: {
			type: Number,
			required: false
		},
		alignFlip: {
			type: Boolean,
			required: false
		},
		avoidCollisions: {
			type: Boolean,
			required: false
		},
		collisionBoundary: {
			type: null,
			required: false
		},
		collisionPadding: {
			type: [Number, Object],
			required: false
		},
		arrowPadding: {
			type: Number,
			required: false
		},
		sticky: {
			type: String,
			required: false
		},
		hideWhenDetached: {
			type: Boolean,
			required: false
		},
		positionStrategy: {
			type: String,
			required: false
		},
		updatePositionStrategy: {
			type: String,
			required: false
		},
		disableUpdateOnLayoutShift: {
			type: Boolean,
			required: false
		},
		prioritizePosition: {
			type: Boolean,
			required: false,
			default: true
		},
		reference: {
			type: null,
			required: false
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false
		}
	},
	emits: [
		"escapeKeyDown",
		"pointerDownOutside",
		"focusOutside",
		"interactOutside",
		"entryFocus",
		"openAutoFocus",
		"closeAutoFocus"
	],
	setup(__props, { emit: __emit }) {
		const forwarded = useForwardPropsEmits(__props, __emit);
		const menuContext = injectMenuContext();
		const rootContext = injectMenuRootContext();
		const menuSubContext = injectMenuSubContext();
		const { forwardRef, currentElement: subContentElement } = useForwardExpose();
		menuSubContext.contentId ||= useId(void 0, "reka-menu-sub-content");
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Presence_default), { present: _ctx.forceMount || unref(menuContext).open.value }, {
				default: withCtx(() => [createVNode(MenuContentImpl_default, mergeProps(unref(forwarded), {
					id: unref(menuSubContext).contentId,
					ref: unref(forwardRef),
					"aria-labelledby": unref(menuSubContext).triggerId,
					align: "start",
					side: unref(rootContext).dir.value === "rtl" ? "left" : "right",
					"disable-outside-pointer-events": false,
					"disable-outside-scroll": false,
					"trap-focus": false,
					onOpenAutoFocus: _cache[0] || (_cache[0] = withModifiers((event) => {
						if (unref(rootContext).isUsingKeyboardRef.value) unref(subContentElement)?.focus();
					}, ["prevent"])),
					onCloseAutoFocus: _cache[1] || (_cache[1] = withModifiers(() => {}, ["prevent"])),
					onFocusOutside: _cache[2] || (_cache[2] = (event) => {
						if (event.defaultPrevented) return;
						if (event.target !== unref(menuSubContext).trigger.value) unref(menuContext).onOpenChange(false);
					}),
					onEscapeKeyDown: _cache[3] || (_cache[3] = (event) => {
						unref(rootContext).onClose();
						event.preventDefault();
					}),
					onKeydown: _cache[4] || (_cache[4] = (event) => {
						const isKeyDownInside = event.currentTarget?.contains(event.target);
						const isCloseKey = unref(SUB_CLOSE_KEYS)[unref(rootContext).dir.value].includes(event.key);
						if (isKeyDownInside && isCloseKey) {
							unref(menuContext).onOpenChange(false);
							unref(menuSubContext).trigger.value?.focus();
							event.preventDefault();
						}
					})
				}), {
					default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
					_: 3
				}, 16, [
					"id",
					"aria-labelledby",
					"side"
				])]),
				_: 3
			}, 8, ["present"]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/Menu/MenuSubTrigger.js
var MenuSubTrigger_default = /* @__PURE__ */ defineComponent({
	__name: "MenuSubTrigger",
	props: {
		disabled: {
			type: Boolean,
			required: false
		},
		textValue: {
			type: String,
			required: false
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false
		}
	},
	setup(__props) {
		const props = __props;
		const menuContext = injectMenuContext();
		const rootContext = injectMenuRootContext();
		const subContext = injectMenuSubContext();
		const contentContext = injectMenuContentContext();
		const openTimerRef = ref(null);
		subContext.triggerId ||= useId(void 0, "reka-menu-sub-trigger");
		function clearOpenTimer() {
			if (openTimerRef.value) window.clearTimeout(openTimerRef.value);
			openTimerRef.value = null;
		}
		onUnmounted(() => {
			clearOpenTimer();
		});
		function handlePointerMove(event) {
			if (!isMouseEvent$1(event)) return;
			if (contentContext.onItemEnter(event)) return;
			if (!props.disabled && !menuContext.open.value && !openTimerRef.value) {
				contentContext.onPointerGraceIntentChange(null);
				openTimerRef.value = window.setTimeout(() => {
					menuContext.onOpenChange(true);
					clearOpenTimer();
				}, 100);
			}
		}
		async function handlePointerLeave(event) {
			if (!isMouseEvent$1(event)) return;
			clearOpenTimer();
			const contentRect = menuContext.content.value?.getBoundingClientRect();
			if (contentRect?.width) {
				const side = menuContext.content.value?.dataset.side;
				const rightSide = side === "right";
				const bleed = rightSide ? -5 : 5;
				const contentNearEdge = contentRect[rightSide ? "left" : "right"];
				const contentFarEdge = contentRect[rightSide ? "right" : "left"];
				contentContext.onPointerGraceIntentChange({
					area: [
						{
							x: event.clientX + bleed,
							y: event.clientY
						},
						{
							x: contentNearEdge,
							y: contentRect.top
						},
						{
							x: contentFarEdge,
							y: contentRect.top
						},
						{
							x: contentFarEdge,
							y: contentRect.bottom
						},
						{
							x: contentNearEdge,
							y: contentRect.bottom
						}
					],
					side
				});
				window.clearTimeout(contentContext.pointerGraceTimerRef.value);
				contentContext.pointerGraceTimerRef.value = window.setTimeout(() => contentContext.onPointerGraceIntentChange(null), 300);
			} else {
				if (contentContext.onTriggerLeave(event)) return;
				contentContext.onPointerGraceIntentChange(null);
			}
		}
		async function handleKeyDown(event) {
			const isTypingAhead = contentContext.searchRef.value !== "";
			if (props.disabled || isTypingAhead && event.key === " ") return;
			if (SUB_OPEN_KEYS[rootContext.dir.value].includes(event.key)) {
				menuContext.onOpenChange(true);
				await nextTick();
				menuContext.content.value?.focus();
				event.preventDefault();
			}
		}
		return (_ctx, _cache) => {
			return openBlock(), createBlock(MenuAnchor_default, { "as-child": "" }, {
				default: withCtx(() => [createVNode(MenuItemImpl_default, mergeProps(props, {
					id: unref(subContext).triggerId,
					ref: (vnode) => {
						unref(subContext)?.onTriggerChange(vnode?.$el);
					},
					"aria-haspopup": "menu",
					"aria-expanded": unref(menuContext).open.value,
					"aria-controls": unref(subContext).contentId,
					"data-state": unref(getOpenState)(unref(menuContext).open.value),
					onClick: _cache[0] || (_cache[0] = async (event) => {
						if (props.disabled || event.defaultPrevented) return;
						/**
						* We manually focus because iOS Safari doesn't always focus on click (e.g. buttons)
						* and we rely heavily on `onFocusOutside` for submenus to close when switching
						* between separate submenus.
						*/
						event.currentTarget.focus();
						if (!unref(menuContext).open.value) unref(menuContext).onOpenChange(true);
					}),
					onPointermove: handlePointerMove,
					onPointerleave: handlePointerLeave,
					onKeydown: handleKeyDown
				}), {
					default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
					_: 3
				}, 16, [
					"id",
					"aria-expanded",
					"aria-controls",
					"data-state"
				])]),
				_: 3
			});
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/ContextMenu/ContextMenuRoot.js
var [injectContextMenuRootContext, provideContextMenuRootContext] = createContext("ContextMenuRoot");
var ContextMenuRoot_default = /* @__PURE__ */ defineComponent({
	inheritAttrs: false,
	__name: "ContextMenuRoot",
	props: {
		pressOpenDelay: {
			type: Number,
			required: false,
			default: 700
		},
		dir: {
			type: String,
			required: false
		},
		modal: {
			type: Boolean,
			required: false,
			default: true
		}
	},
	emits: ["update:open"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const { dir: propDir, modal, pressOpenDelay } = toRefs(props);
		useForwardExpose();
		const dir = useDirection(propDir);
		const open = ref(false);
		provideContextMenuRootContext({
			open,
			onOpenChange: (value) => {
				open.value = value;
			},
			dir,
			modal,
			triggerElement: ref(),
			pressOpenDelay
		});
		watch(open, (value) => {
			emits("update:open", value);
		});
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(MenuRoot_default), {
				open: open.value,
				"onUpdate:open": _cache[0] || (_cache[0] = ($event) => open.value = $event),
				dir: unref(dir),
				modal: unref(modal)
			}, {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 8, [
				"open",
				"dir",
				"modal"
			]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/ContextMenu/ContextMenuContent.js
var ContextMenuContent_default = /* @__PURE__ */ defineComponent({
	__name: "ContextMenuContent",
	props: {
		forceMount: {
			type: Boolean,
			required: false
		},
		loop: {
			type: Boolean,
			required: false
		},
		sideFlip: {
			type: Boolean,
			required: false
		},
		alignOffset: {
			type: Number,
			required: false,
			default: 0
		},
		alignFlip: {
			type: Boolean,
			required: false
		},
		avoidCollisions: {
			type: Boolean,
			required: false,
			default: true
		},
		collisionBoundary: {
			type: null,
			required: false,
			default: () => []
		},
		collisionPadding: {
			type: [Number, Object],
			required: false,
			default: 0
		},
		sticky: {
			type: String,
			required: false,
			default: "partial"
		},
		hideWhenDetached: {
			type: Boolean,
			required: false,
			default: false
		},
		positionStrategy: {
			type: String,
			required: false
		},
		disableUpdateOnLayoutShift: {
			type: Boolean,
			required: false
		},
		prioritizePosition: {
			type: Boolean,
			required: false
		},
		reference: {
			type: null,
			required: false
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false
		}
	},
	emits: [
		"escapeKeyDown",
		"pointerDownOutside",
		"focusOutside",
		"interactOutside",
		"closeAutoFocus"
	],
	setup(__props, { emit: __emit }) {
		const forwarded = useForwardPropsEmits(__props, __emit);
		useForwardExpose();
		const rootContext = injectContextMenuRootContext();
		const hasInteractedOutside = ref(false);
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(MenuContent_default), mergeProps(unref(forwarded), {
				side: "right",
				"side-offset": 2,
				align: "start",
				"update-position-strategy": "always",
				style: {
					"--reka-context-menu-content-transform-origin": "var(--reka-popper-transform-origin)",
					"--reka-context-menu-content-available-width": "var(--reka-popper-available-width)",
					"--reka-context-menu-content-available-height": "var(--reka-popper-available-height)",
					"--reka-context-menu-trigger-width": "var(--reka-popper-anchor-width)",
					"--reka-context-menu-trigger-height": "var(--reka-popper-anchor-height)"
				},
				onCloseAutoFocus: _cache[0] || (_cache[0] = (event) => {
					if (!event.defaultPrevented && hasInteractedOutside.value) event.preventDefault();
					hasInteractedOutside.value = false;
				}),
				onInteractOutside: _cache[1] || (_cache[1] = (event) => {
					if (event.detail.originalEvent.button === 2 && event.target === unref(rootContext).triggerElement.value) event.preventDefault();
					if (!event.defaultPrevented && !unref(rootContext).modal.value) hasInteractedOutside.value = true;
				})
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/ContextMenu/ContextMenuPortal.js
var ContextMenuPortal_default = /* @__PURE__ */ defineComponent({
	__name: "ContextMenuPortal",
	props: {
		to: {
			type: null,
			required: false
		},
		disabled: {
			type: Boolean,
			required: false
		},
		defer: {
			type: Boolean,
			required: false
		},
		forceMount: {
			type: Boolean,
			required: false
		}
	},
	setup(__props) {
		const props = __props;
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(MenuPortal_default), normalizeProps(guardReactiveProps(props)), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/ContextMenu/utils.js
function isTouchOrPen(event) {
	return event.pointerType !== "mouse";
}
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/ContextMenu/ContextMenuTrigger.js
var ContextMenuTrigger_default = /* @__PURE__ */ defineComponent({
	inheritAttrs: false,
	__name: "ContextMenuTrigger",
	props: {
		disabled: {
			type: Boolean,
			required: false,
			default: false
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false,
			default: "span"
		}
	},
	setup(__props) {
		const { disabled } = toRefs(__props);
		const { forwardRef, currentElement } = useForwardExpose();
		const rootContext = injectContextMenuRootContext();
		const point = ref({
			x: 0,
			y: 0
		});
		const virtualEl = computed(() => ({ getBoundingClientRect: () => ({
			width: 0,
			height: 0,
			left: point.value.x,
			right: point.value.x,
			top: point.value.y,
			bottom: point.value.y,
			...point.value
		}) }));
		const longPressTimer = ref(0);
		function clearLongPress() {
			window.clearTimeout(longPressTimer.value);
		}
		function handleOpen(event) {
			point.value = {
				x: event.clientX,
				y: event.clientY
			};
			rootContext.onOpenChange(true);
		}
		async function handleContextMenu(event) {
			if (!disabled.value) {
				await nextTick();
				if (!event.defaultPrevented) {
					clearLongPress();
					handleOpen(event);
					event.preventDefault();
				}
			}
		}
		async function handlePointerDown(event) {
			if (!disabled.value) {
				await nextTick();
				if (isTouchOrPen(event) && !event.defaultPrevented) {
					clearLongPress();
					longPressTimer.value = window.setTimeout(() => handleOpen(event), rootContext.pressOpenDelay.value);
				}
			}
		}
		async function handlePointerEvent(event) {
			if (!disabled.value) {
				await nextTick();
				if (isTouchOrPen(event) && !event.defaultPrevented) clearLongPress();
			}
		}
		onMounted(() => {
			if (currentElement.value) rootContext.triggerElement.value = currentElement.value;
		});
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock(Fragment, null, [createVNode(unref(MenuAnchor_default), {
				as: "template",
				reference: virtualEl.value
			}, null, 8, ["reference"]), createVNode(unref(Primitive), mergeProps({
				ref: unref(forwardRef),
				as: _ctx.as,
				"as-child": _ctx.asChild,
				"data-state": unref(rootContext).open.value ? "open" : "closed",
				"data-disabled": unref(disabled) ? "" : void 0,
				style: {
					WebkitTouchCallout: "none",
					pointerEvents: "auto"
				}
			}, _ctx.$attrs, {
				onContextmenu: handleContextMenu,
				onPointerdown: handlePointerDown,
				onPointermove: handlePointerEvent,
				onPointercancel: handlePointerEvent,
				onPointerup: handlePointerEvent
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16, [
				"as",
				"as-child",
				"data-state",
				"data-disabled"
			])], 64);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/Popover/PopoverRoot.js
var [injectPopoverRootContext, providePopoverRootContext] = createContext("PopoverRoot");
var PopoverRoot_default = /* @__PURE__ */ defineComponent({
	__name: "PopoverRoot",
	props: {
		defaultOpen: {
			type: Boolean,
			required: false,
			default: false
		},
		open: {
			type: Boolean,
			required: false,
			default: void 0
		},
		modal: {
			type: Boolean,
			required: false,
			default: false
		}
	},
	emits: ["update:open"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emit = __emit;
		const { modal } = toRefs(props);
		const open = useVModel(props, "open", emit, {
			defaultValue: props.defaultOpen,
			passive: props.open === void 0
		});
		providePopoverRootContext({
			contentId: "",
			triggerId: "",
			modal,
			open,
			onOpenChange: (value) => {
				open.value = value;
			},
			onOpenToggle: () => {
				open.value = !open.value;
			},
			triggerElement: ref(),
			hasCustomAnchor: ref(false)
		});
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(PopperRoot_default), null, {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", {
					open: unref(open),
					close: () => open.value = false
				})]),
				_: 3
			});
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/Popover/PopoverAnchor.js
var PopoverAnchor_default = /* @__PURE__ */ defineComponent({
	__name: "PopoverAnchor",
	props: {
		reference: {
			type: null,
			required: false
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false
		}
	},
	setup(__props) {
		const props = __props;
		useForwardExpose();
		const rootContext = injectPopoverRootContext();
		onBeforeMount(() => {
			rootContext.hasCustomAnchor.value = true;
		});
		onUnmounted(() => {
			rootContext.hasCustomAnchor.value = false;
		});
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(PopperAnchor_default), normalizeProps(guardReactiveProps(props)), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/Popover/PopoverArrow.js
var PopoverArrow_default = /* @__PURE__ */ defineComponent({
	__name: "PopoverArrow",
	props: {
		width: {
			type: Number,
			required: false,
			default: 10
		},
		height: {
			type: Number,
			required: false,
			default: 5
		},
		rounded: {
			type: Boolean,
			required: false
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false,
			default: "svg"
		}
	},
	setup(__props) {
		const props = __props;
		useForwardExpose();
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(PopperArrow_default), normalizeProps(guardReactiveProps(props)), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/Popover/PopoverClose.js
var PopoverClose_default = /* @__PURE__ */ defineComponent({
	__name: "PopoverClose",
	props: {
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false,
			default: "button"
		}
	},
	setup(__props) {
		const props = __props;
		useForwardExpose();
		const rootContext = injectPopoverRootContext();
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), {
				type: _ctx.as === "button" ? "button" : void 0,
				as: _ctx.as,
				"as-child": props.asChild,
				onClick: _cache[0] || (_cache[0] = ($event) => unref(rootContext).onOpenChange(false))
			}, {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 8, [
				"type",
				"as",
				"as-child"
			]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/Popover/PopoverContentImpl.js
var PopoverContentImpl_default = /* @__PURE__ */ defineComponent({
	__name: "PopoverContentImpl",
	props: {
		trapFocus: {
			type: Boolean,
			required: false
		},
		side: {
			type: null,
			required: false
		},
		sideOffset: {
			type: Number,
			required: false
		},
		sideFlip: {
			type: Boolean,
			required: false
		},
		align: {
			type: null,
			required: false
		},
		alignOffset: {
			type: Number,
			required: false
		},
		alignFlip: {
			type: Boolean,
			required: false
		},
		avoidCollisions: {
			type: Boolean,
			required: false
		},
		collisionBoundary: {
			type: null,
			required: false
		},
		collisionPadding: {
			type: [Number, Object],
			required: false
		},
		arrowPadding: {
			type: Number,
			required: false
		},
		sticky: {
			type: String,
			required: false
		},
		hideWhenDetached: {
			type: Boolean,
			required: false
		},
		positionStrategy: {
			type: String,
			required: false
		},
		updatePositionStrategy: {
			type: String,
			required: false
		},
		disableUpdateOnLayoutShift: {
			type: Boolean,
			required: false
		},
		prioritizePosition: {
			type: Boolean,
			required: false
		},
		reference: {
			type: null,
			required: false
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false
		},
		disableOutsidePointerEvents: {
			type: Boolean,
			required: false
		}
	},
	emits: [
		"escapeKeyDown",
		"pointerDownOutside",
		"focusOutside",
		"interactOutside",
		"openAutoFocus",
		"closeAutoFocus"
	],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const forwarded = useForwardProps(reactiveOmit(props, "trapFocus", "disableOutsidePointerEvents"));
		const { forwardRef } = useForwardExpose();
		const rootContext = injectPopoverRootContext();
		useFocusGuards();
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(FocusScope_default), {
				"as-child": "",
				loop: "",
				trapped: _ctx.trapFocus,
				onMountAutoFocus: _cache[5] || (_cache[5] = ($event) => emits("openAutoFocus", $event)),
				onUnmountAutoFocus: _cache[6] || (_cache[6] = ($event) => emits("closeAutoFocus", $event))
			}, {
				default: withCtx(() => [createVNode(unref(DismissableLayer_default), {
					"as-child": "",
					"disable-outside-pointer-events": _ctx.disableOutsidePointerEvents,
					onPointerDownOutside: _cache[0] || (_cache[0] = ($event) => emits("pointerDownOutside", $event)),
					onInteractOutside: _cache[1] || (_cache[1] = ($event) => emits("interactOutside", $event)),
					onEscapeKeyDown: _cache[2] || (_cache[2] = ($event) => emits("escapeKeyDown", $event)),
					onFocusOutside: _cache[3] || (_cache[3] = ($event) => emits("focusOutside", $event)),
					onDismiss: _cache[4] || (_cache[4] = ($event) => unref(rootContext).onOpenChange(false))
				}, {
					default: withCtx(() => [createVNode(unref(PopperContent_default), mergeProps(unref(forwarded), {
						id: unref(rootContext).contentId,
						ref: unref(forwardRef),
						"data-state": unref(rootContext).open.value ? "open" : "closed",
						"aria-labelledby": unref(rootContext).triggerId,
						style: {
							"--reka-popover-content-transform-origin": "var(--reka-popper-transform-origin)",
							"--reka-popover-content-available-width": "var(--reka-popper-available-width)",
							"--reka-popover-content-available-height": "var(--reka-popper-available-height)",
							"--reka-popover-trigger-width": "var(--reka-popper-anchor-width)",
							"--reka-popover-trigger-height": "var(--reka-popper-anchor-height)"
						},
						role: "dialog"
					}), {
						default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
						_: 3
					}, 16, [
						"id",
						"data-state",
						"aria-labelledby"
					])]),
					_: 3
				}, 8, ["disable-outside-pointer-events"])]),
				_: 3
			}, 8, ["trapped"]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/Popover/PopoverContentModal.js
var PopoverContentModal_default = /* @__PURE__ */ defineComponent({
	__name: "PopoverContentModal",
	props: {
		side: {
			type: null,
			required: false
		},
		sideOffset: {
			type: Number,
			required: false
		},
		sideFlip: {
			type: Boolean,
			required: false
		},
		align: {
			type: null,
			required: false
		},
		alignOffset: {
			type: Number,
			required: false
		},
		alignFlip: {
			type: Boolean,
			required: false
		},
		avoidCollisions: {
			type: Boolean,
			required: false
		},
		collisionBoundary: {
			type: null,
			required: false
		},
		collisionPadding: {
			type: [Number, Object],
			required: false
		},
		arrowPadding: {
			type: Number,
			required: false
		},
		sticky: {
			type: String,
			required: false
		},
		hideWhenDetached: {
			type: Boolean,
			required: false
		},
		positionStrategy: {
			type: String,
			required: false
		},
		updatePositionStrategy: {
			type: String,
			required: false
		},
		disableUpdateOnLayoutShift: {
			type: Boolean,
			required: false
		},
		prioritizePosition: {
			type: Boolean,
			required: false
		},
		reference: {
			type: null,
			required: false
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false
		},
		disableOutsidePointerEvents: {
			type: Boolean,
			required: false
		}
	},
	emits: [
		"escapeKeyDown",
		"pointerDownOutside",
		"focusOutside",
		"interactOutside",
		"openAutoFocus",
		"closeAutoFocus"
	],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const rootContext = injectPopoverRootContext();
		const isRightClickOutsideRef = ref(false);
		useBodyScrollLock(true);
		const forwarded = useForwardPropsEmits(props, emits);
		const { forwardRef, currentElement } = useForwardExpose();
		useHideOthers(currentElement);
		return (_ctx, _cache) => {
			return openBlock(), createBlock(PopoverContentImpl_default, mergeProps(unref(forwarded), {
				ref: unref(forwardRef),
				"trap-focus": unref(rootContext).open.value,
				"disable-outside-pointer-events": "",
				onCloseAutoFocus: _cache[0] || (_cache[0] = withModifiers((event) => {
					emits("closeAutoFocus", event);
					if (!isRightClickOutsideRef.value) unref(rootContext).triggerElement.value?.focus();
				}, ["prevent"])),
				onPointerDownOutside: _cache[1] || (_cache[1] = (event) => {
					emits("pointerDownOutside", event);
					const originalEvent = event.detail.originalEvent;
					const ctrlLeftClick = originalEvent.button === 0 && originalEvent.ctrlKey === true;
					const isRightClick = originalEvent.button === 2 || ctrlLeftClick;
					isRightClickOutsideRef.value = isRightClick;
				}),
				onFocusOutside: _cache[2] || (_cache[2] = withModifiers(() => {}, ["prevent"]))
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16, ["trap-focus"]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/Popover/PopoverContentNonModal.js
var PopoverContentNonModal_default = /* @__PURE__ */ defineComponent({
	__name: "PopoverContentNonModal",
	props: {
		side: {
			type: null,
			required: false
		},
		sideOffset: {
			type: Number,
			required: false
		},
		sideFlip: {
			type: Boolean,
			required: false
		},
		align: {
			type: null,
			required: false
		},
		alignOffset: {
			type: Number,
			required: false
		},
		alignFlip: {
			type: Boolean,
			required: false
		},
		avoidCollisions: {
			type: Boolean,
			required: false
		},
		collisionBoundary: {
			type: null,
			required: false
		},
		collisionPadding: {
			type: [Number, Object],
			required: false
		},
		arrowPadding: {
			type: Number,
			required: false
		},
		sticky: {
			type: String,
			required: false
		},
		hideWhenDetached: {
			type: Boolean,
			required: false
		},
		positionStrategy: {
			type: String,
			required: false
		},
		updatePositionStrategy: {
			type: String,
			required: false
		},
		disableUpdateOnLayoutShift: {
			type: Boolean,
			required: false
		},
		prioritizePosition: {
			type: Boolean,
			required: false
		},
		reference: {
			type: null,
			required: false
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false
		},
		disableOutsidePointerEvents: {
			type: Boolean,
			required: false
		}
	},
	emits: [
		"escapeKeyDown",
		"pointerDownOutside",
		"focusOutside",
		"interactOutside",
		"openAutoFocus",
		"closeAutoFocus"
	],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const rootContext = injectPopoverRootContext();
		const hasInteractedOutsideRef = ref(false);
		const hasPointerDownOutsideRef = ref(false);
		const forwarded = useForwardPropsEmits(props, emits);
		return (_ctx, _cache) => {
			return openBlock(), createBlock(PopoverContentImpl_default, mergeProps(unref(forwarded), {
				"trap-focus": false,
				"disable-outside-pointer-events": false,
				onCloseAutoFocus: _cache[0] || (_cache[0] = (event) => {
					emits("closeAutoFocus", event);
					if (!event.defaultPrevented) {
						if (!hasInteractedOutsideRef.value) unref(rootContext).triggerElement.value?.focus();
						event.preventDefault();
					}
					hasInteractedOutsideRef.value = false;
					hasPointerDownOutsideRef.value = false;
				}),
				onInteractOutside: _cache[1] || (_cache[1] = async (event) => {
					emits("interactOutside", event);
					if (!event.defaultPrevented) {
						hasInteractedOutsideRef.value = true;
						if (event.detail.originalEvent.type === "pointerdown") hasPointerDownOutsideRef.value = true;
					}
					const target = event.target;
					if (unref(rootContext).triggerElement.value?.contains(target)) event.preventDefault();
					if (event.detail.originalEvent.type === "focusin" && hasPointerDownOutsideRef.value) event.preventDefault();
				})
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/Popover/PopoverContent.js
var PopoverContent_default = /* @__PURE__ */ defineComponent({
	__name: "PopoverContent",
	props: {
		forceMount: {
			type: Boolean,
			required: false
		},
		side: {
			type: null,
			required: false
		},
		sideOffset: {
			type: Number,
			required: false
		},
		sideFlip: {
			type: Boolean,
			required: false
		},
		align: {
			type: null,
			required: false
		},
		alignOffset: {
			type: Number,
			required: false
		},
		alignFlip: {
			type: Boolean,
			required: false
		},
		avoidCollisions: {
			type: Boolean,
			required: false
		},
		collisionBoundary: {
			type: null,
			required: false
		},
		collisionPadding: {
			type: [Number, Object],
			required: false
		},
		arrowPadding: {
			type: Number,
			required: false
		},
		sticky: {
			type: String,
			required: false
		},
		hideWhenDetached: {
			type: Boolean,
			required: false
		},
		positionStrategy: {
			type: String,
			required: false
		},
		updatePositionStrategy: {
			type: String,
			required: false
		},
		disableUpdateOnLayoutShift: {
			type: Boolean,
			required: false
		},
		prioritizePosition: {
			type: Boolean,
			required: false
		},
		reference: {
			type: null,
			required: false
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false
		},
		disableOutsidePointerEvents: {
			type: Boolean,
			required: false
		}
	},
	emits: [
		"escapeKeyDown",
		"pointerDownOutside",
		"focusOutside",
		"interactOutside",
		"openAutoFocus",
		"closeAutoFocus"
	],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const rootContext = injectPopoverRootContext();
		const forwarded = useForwardPropsEmits(props, emits);
		const { forwardRef } = useForwardExpose();
		rootContext.contentId ||= useId(void 0, "reka-popover-content");
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Presence_default), { present: _ctx.forceMount || unref(rootContext).open.value }, {
				default: withCtx(() => [unref(rootContext).modal.value ? (openBlock(), createBlock(PopoverContentModal_default, mergeProps({ key: 0 }, unref(forwarded), { ref: unref(forwardRef) }), {
					default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
					_: 3
				}, 16)) : (openBlock(), createBlock(PopoverContentNonModal_default, mergeProps({ key: 1 }, unref(forwarded), { ref: unref(forwardRef) }), {
					default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
					_: 3
				}, 16))]),
				_: 3
			}, 8, ["present"]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/Popover/PopoverPortal.js
var PopoverPortal_default = /* @__PURE__ */ defineComponent({
	__name: "PopoverPortal",
	props: {
		to: {
			type: null,
			required: false
		},
		disabled: {
			type: Boolean,
			required: false
		},
		defer: {
			type: Boolean,
			required: false
		},
		forceMount: {
			type: Boolean,
			required: false
		}
	},
	setup(__props) {
		const props = __props;
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Teleport_default), normalizeProps(guardReactiveProps(props)), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/Popover/PopoverTrigger.js
var PopoverTrigger_default = /* @__PURE__ */ defineComponent({
	__name: "PopoverTrigger",
	props: {
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false,
			default: "button"
		}
	},
	setup(__props) {
		const props = __props;
		const rootContext = injectPopoverRootContext();
		const { forwardRef, currentElement: triggerElement } = useForwardExpose();
		rootContext.triggerId ||= useId(void 0, "reka-popover-trigger");
		onMounted(() => {
			rootContext.triggerElement.value = triggerElement.value;
		});
		return (_ctx, _cache) => {
			return openBlock(), createBlock(resolveDynamicComponent(unref(rootContext).hasCustomAnchor.value ? unref(Primitive) : unref(PopperAnchor_default)), { "as-child": "" }, {
				default: withCtx(() => [createVNode(unref(Primitive), {
					id: unref(rootContext).triggerId,
					ref: unref(forwardRef),
					type: _ctx.as === "button" ? "button" : void 0,
					"aria-haspopup": "dialog",
					"aria-expanded": unref(rootContext).open.value,
					"aria-controls": unref(rootContext).contentId,
					"data-state": unref(rootContext).open.value ? "open" : "closed",
					as: _ctx.as,
					"as-child": props.asChild,
					onClick: unref(rootContext).onOpenToggle
				}, {
					default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
					_: 3
				}, 8, [
					"id",
					"type",
					"aria-expanded",
					"aria-controls",
					"data-state",
					"as",
					"as-child",
					"onClick"
				])]),
				_: 3
			});
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/DropdownMenu/DropdownMenuCheckboxItem.js
var DropdownMenuCheckboxItem_default = /* @__PURE__ */ defineComponent({
	__name: "DropdownMenuCheckboxItem",
	props: {
		modelValue: {
			type: [Boolean, String],
			required: false
		},
		disabled: {
			type: Boolean,
			required: false
		},
		textValue: {
			type: String,
			required: false
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false
		}
	},
	emits: ["select", "update:modelValue"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emitsAsProps = useEmitAsProps(__emit);
		useForwardExpose();
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(MenuCheckboxItem_default), normalizeProps(guardReactiveProps({
				...props,
				...unref(emitsAsProps)
			})), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/DropdownMenu/DropdownMenuRoot.js
var [injectDropdownMenuRootContext, provideDropdownMenuRootContext] = createContext("DropdownMenuRoot");
var DropdownMenuRoot_default = /* @__PURE__ */ defineComponent({
	__name: "DropdownMenuRoot",
	props: {
		defaultOpen: {
			type: Boolean,
			required: false
		},
		open: {
			type: Boolean,
			required: false,
			default: void 0
		},
		dir: {
			type: String,
			required: false
		},
		modal: {
			type: Boolean,
			required: false,
			default: true
		}
	},
	emits: ["update:open"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emit = __emit;
		useForwardExpose();
		const open = useVModel(props, "open", emit, {
			defaultValue: props.defaultOpen,
			passive: props.open === void 0
		});
		const triggerElement = ref();
		const { modal, dir: propDir } = toRefs(props);
		const dir = useDirection(propDir);
		provideDropdownMenuRootContext({
			open,
			onOpenChange: (value) => {
				open.value = value;
			},
			onOpenToggle: () => {
				open.value = !open.value;
			},
			triggerId: "",
			triggerElement,
			contentId: "",
			modal,
			dir
		});
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(MenuRoot_default), {
				open: unref(open),
				"onUpdate:open": _cache[0] || (_cache[0] = ($event) => isRef(open) ? open.value = $event : null),
				dir: unref(dir),
				modal: unref(modal)
			}, {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", { open: unref(open) })]),
				_: 3
			}, 8, [
				"open",
				"dir",
				"modal"
			]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/DropdownMenu/DropdownMenuContent.js
var DropdownMenuContent_default = /* @__PURE__ */ defineComponent({
	__name: "DropdownMenuContent",
	props: {
		forceMount: {
			type: Boolean,
			required: false
		},
		loop: {
			type: Boolean,
			required: false
		},
		side: {
			type: null,
			required: false
		},
		sideOffset: {
			type: Number,
			required: false
		},
		sideFlip: {
			type: Boolean,
			required: false
		},
		align: {
			type: null,
			required: false
		},
		alignOffset: {
			type: Number,
			required: false
		},
		alignFlip: {
			type: Boolean,
			required: false
		},
		avoidCollisions: {
			type: Boolean,
			required: false
		},
		collisionBoundary: {
			type: null,
			required: false
		},
		collisionPadding: {
			type: [Number, Object],
			required: false
		},
		arrowPadding: {
			type: Number,
			required: false
		},
		sticky: {
			type: String,
			required: false
		},
		hideWhenDetached: {
			type: Boolean,
			required: false
		},
		positionStrategy: {
			type: String,
			required: false
		},
		updatePositionStrategy: {
			type: String,
			required: false
		},
		disableUpdateOnLayoutShift: {
			type: Boolean,
			required: false
		},
		prioritizePosition: {
			type: Boolean,
			required: false
		},
		reference: {
			type: null,
			required: false
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false
		}
	},
	emits: [
		"escapeKeyDown",
		"pointerDownOutside",
		"focusOutside",
		"interactOutside",
		"closeAutoFocus"
	],
	setup(__props, { emit: __emit }) {
		const forwarded = useForwardPropsEmits(__props, __emit);
		useForwardExpose();
		const rootContext = injectDropdownMenuRootContext();
		const hasInteractedOutsideRef = ref(false);
		function handleCloseAutoFocus(event) {
			if (event.defaultPrevented) return;
			if (!hasInteractedOutsideRef.value) setTimeout(() => {
				rootContext.triggerElement.value?.focus();
			}, 0);
			hasInteractedOutsideRef.value = false;
			event.preventDefault();
		}
		rootContext.contentId ||= useId(void 0, "reka-dropdown-menu-content");
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(MenuContent_default), mergeProps(unref(forwarded), {
				id: unref(rootContext).contentId,
				"aria-labelledby": unref(rootContext)?.triggerId,
				style: {
					"--reka-dropdown-menu-content-transform-origin": "var(--reka-popper-transform-origin)",
					"--reka-dropdown-menu-content-available-width": "var(--reka-popper-available-width)",
					"--reka-dropdown-menu-content-available-height": "var(--reka-popper-available-height)",
					"--reka-dropdown-menu-trigger-width": "var(--reka-popper-anchor-width)",
					"--reka-dropdown-menu-trigger-height": "var(--reka-popper-anchor-height)"
				},
				onCloseAutoFocus: handleCloseAutoFocus,
				onInteractOutside: _cache[0] || (_cache[0] = (event) => {
					if (event.defaultPrevented) return;
					const originalEvent = event.detail.originalEvent;
					const ctrlLeftClick = originalEvent.button === 0 && originalEvent.ctrlKey === true;
					const isRightClick = originalEvent.button === 2 || ctrlLeftClick;
					if (!unref(rootContext).modal.value || isRightClick) hasInteractedOutsideRef.value = true;
					if (unref(rootContext).triggerElement.value?.contains(event.target)) event.preventDefault();
				})
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16, ["id", "aria-labelledby"]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/DropdownMenu/DropdownMenuItem.js
var DropdownMenuItem_default = /* @__PURE__ */ defineComponent({
	__name: "DropdownMenuItem",
	props: {
		disabled: {
			type: Boolean,
			required: false
		},
		textValue: {
			type: String,
			required: false
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false
		}
	},
	emits: ["select"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emitsAsProps = useEmitAsProps(__emit);
		useForwardExpose();
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(MenuItem_default), normalizeProps(guardReactiveProps({
				...props,
				...unref(emitsAsProps)
			})), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/DropdownMenu/DropdownMenuItemIndicator.js
var DropdownMenuItemIndicator_default = /* @__PURE__ */ defineComponent({
	__name: "DropdownMenuItemIndicator",
	props: {
		forceMount: {
			type: Boolean,
			required: false
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false
		}
	},
	setup(__props) {
		const props = __props;
		useForwardExpose();
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(MenuItemIndicator_default), normalizeProps(guardReactiveProps(props)), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/DropdownMenu/DropdownMenuLabel.js
var DropdownMenuLabel_default = /* @__PURE__ */ defineComponent({
	__name: "DropdownMenuLabel",
	props: {
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false
		}
	},
	setup(__props) {
		const props = __props;
		useForwardExpose();
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(MenuLabel_default), normalizeProps(guardReactiveProps(props)), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/DropdownMenu/DropdownMenuPortal.js
var DropdownMenuPortal_default = /* @__PURE__ */ defineComponent({
	__name: "DropdownMenuPortal",
	props: {
		to: {
			type: null,
			required: false
		},
		disabled: {
			type: Boolean,
			required: false
		},
		defer: {
			type: Boolean,
			required: false
		},
		forceMount: {
			type: Boolean,
			required: false
		}
	},
	setup(__props) {
		const props = __props;
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(MenuPortal_default), normalizeProps(guardReactiveProps(props)), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/DropdownMenu/DropdownMenuRadioGroup.js
var DropdownMenuRadioGroup_default = /* @__PURE__ */ defineComponent({
	__name: "DropdownMenuRadioGroup",
	props: {
		modelValue: {
			type: String,
			required: false
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false
		}
	},
	emits: ["update:modelValue"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emitsAsProps = useEmitAsProps(__emit);
		useForwardExpose();
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(MenuRadioGroup_default), normalizeProps(guardReactiveProps({
				...props,
				...unref(emitsAsProps)
			})), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/DropdownMenu/DropdownMenuRadioItem.js
var DropdownMenuRadioItem_default = /* @__PURE__ */ defineComponent({
	__name: "DropdownMenuRadioItem",
	props: {
		value: {
			type: String,
			required: true
		},
		disabled: {
			type: Boolean,
			required: false
		},
		textValue: {
			type: String,
			required: false
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false
		}
	},
	emits: ["select"],
	setup(__props, { emit: __emit }) {
		const forwarded = useForwardPropsEmits(__props, __emit);
		useForwardExpose();
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(MenuRadioItem_default), normalizeProps(guardReactiveProps(unref(forwarded))), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/DropdownMenu/DropdownMenuSeparator.js
var DropdownMenuSeparator_default = /* @__PURE__ */ defineComponent({
	__name: "DropdownMenuSeparator",
	props: {
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false
		}
	},
	setup(__props) {
		const props = __props;
		useForwardExpose();
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(MenuSeparator_default), normalizeProps(guardReactiveProps(props)), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/DropdownMenu/DropdownMenuSub.js
var DropdownMenuSub_default = /* @__PURE__ */ defineComponent({
	__name: "DropdownMenuSub",
	props: {
		defaultOpen: {
			type: Boolean,
			required: false
		},
		open: {
			type: Boolean,
			required: false,
			default: void 0
		}
	},
	emits: ["update:open"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const open = useVModel(props, "open", __emit, {
			passive: props.open === void 0,
			defaultValue: props.defaultOpen ?? false
		});
		useForwardExpose();
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(MenuSub_default), {
				open: unref(open),
				"onUpdate:open": _cache[0] || (_cache[0] = ($event) => isRef(open) ? open.value = $event : null)
			}, {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", { open: unref(open) })]),
				_: 3
			}, 8, ["open"]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/DropdownMenu/DropdownMenuSubContent.js
var DropdownMenuSubContent_default = /* @__PURE__ */ defineComponent({
	__name: "DropdownMenuSubContent",
	props: {
		forceMount: {
			type: Boolean,
			required: false
		},
		loop: {
			type: Boolean,
			required: false
		},
		sideOffset: {
			type: Number,
			required: false
		},
		sideFlip: {
			type: Boolean,
			required: false
		},
		alignOffset: {
			type: Number,
			required: false
		},
		alignFlip: {
			type: Boolean,
			required: false
		},
		avoidCollisions: {
			type: Boolean,
			required: false
		},
		collisionBoundary: {
			type: null,
			required: false
		},
		collisionPadding: {
			type: [Number, Object],
			required: false
		},
		arrowPadding: {
			type: Number,
			required: false
		},
		sticky: {
			type: String,
			required: false
		},
		hideWhenDetached: {
			type: Boolean,
			required: false
		},
		positionStrategy: {
			type: String,
			required: false
		},
		updatePositionStrategy: {
			type: String,
			required: false
		},
		disableUpdateOnLayoutShift: {
			type: Boolean,
			required: false
		},
		prioritizePosition: {
			type: Boolean,
			required: false
		},
		reference: {
			type: null,
			required: false
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false
		}
	},
	emits: [
		"escapeKeyDown",
		"pointerDownOutside",
		"focusOutside",
		"interactOutside",
		"entryFocus",
		"openAutoFocus",
		"closeAutoFocus"
	],
	setup(__props, { emit: __emit }) {
		const forwarded = useForwardPropsEmits(__props, __emit);
		useForwardExpose();
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(MenuSubContent_default), mergeProps(unref(forwarded), { style: {
				"--reka-dropdown-menu-content-transform-origin": "var(--reka-popper-transform-origin)",
				"--reka-dropdown-menu-content-available-width": "var(--reka-popper-available-width)",
				"--reka-dropdown-menu-content-available-height": "var(--reka-popper-available-height)",
				"--reka-dropdown-menu-trigger-width": "var(--reka-popper-anchor-width)",
				"--reka-dropdown-menu-trigger-height": "var(--reka-popper-anchor-height)"
			} }), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/DropdownMenu/DropdownMenuSubTrigger.js
var DropdownMenuSubTrigger_default = /* @__PURE__ */ defineComponent({
	__name: "DropdownMenuSubTrigger",
	props: {
		disabled: {
			type: Boolean,
			required: false
		},
		textValue: {
			type: String,
			required: false
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false
		}
	},
	setup(__props) {
		const props = __props;
		useForwardExpose();
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(MenuSubTrigger_default), normalizeProps(guardReactiveProps(props)), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/DropdownMenu/DropdownMenuTrigger.js
var DropdownMenuTrigger_default = /* @__PURE__ */ defineComponent({
	__name: "DropdownMenuTrigger",
	props: {
		disabled: {
			type: Boolean,
			required: false
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false,
			default: "button"
		}
	},
	setup(__props) {
		const props = __props;
		const rootContext = injectDropdownMenuRootContext();
		const { forwardRef, currentElement: triggerElement } = useForwardExpose();
		onMounted(() => {
			rootContext.triggerElement = triggerElement;
		});
		rootContext.triggerId ||= useId(void 0, "reka-dropdown-menu-trigger");
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(MenuAnchor_default), { "as-child": "" }, {
				default: withCtx(() => [createVNode(unref(Primitive), {
					id: unref(rootContext).triggerId,
					ref: unref(forwardRef),
					type: _ctx.as === "button" ? "button" : void 0,
					"as-child": props.asChild,
					as: _ctx.as,
					"aria-haspopup": "menu",
					"aria-expanded": unref(rootContext).open.value,
					"aria-controls": unref(rootContext).open.value ? unref(rootContext).contentId : void 0,
					"data-disabled": _ctx.disabled ? "" : void 0,
					disabled: _ctx.disabled,
					"data-state": unref(rootContext).open.value ? "open" : "closed",
					onClick: _cache[0] || (_cache[0] = async (event) => {
						if (!_ctx.disabled && event.button === 0 && event.ctrlKey === false) {
							unref(rootContext)?.onOpenToggle();
							await nextTick();
							if (unref(rootContext).open.value) event.preventDefault();
						}
					}),
					onKeydown: _cache[1] || (_cache[1] = withKeys((event) => {
						if (_ctx.disabled) return;
						if (["Enter", " "].includes(event.key)) unref(rootContext).onOpenToggle();
						if (event.key === "ArrowDown") unref(rootContext).onOpenChange(true);
						if ([
							"Enter",
							" ",
							"ArrowDown"
						].includes(event.key)) event.preventDefault();
					}, [
						"enter",
						"space",
						"arrow-down"
					]))
				}, {
					default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
					_: 3
				}, 8, [
					"id",
					"type",
					"as-child",
					"as",
					"aria-expanded",
					"aria-controls",
					"data-disabled",
					"disabled",
					"data-state"
				])]),
				_: 3
			});
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/Label/Label.js
var Label_default = /* @__PURE__ */ defineComponent({
	__name: "Label",
	props: {
		for: {
			type: String,
			required: false
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false,
			default: "label"
		}
	},
	setup(__props) {
		const props = __props;
		useForwardExpose();
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), mergeProps(props, { onMousedown: _cache[0] || (_cache[0] = (event) => {
				if (!event.defaultPrevented && event.detail > 1) event.preventDefault();
			}) }), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/@internationalized+number@3.6.7/node_modules/@internationalized/number/dist/private/NumberFormatter.mjs
var $1dfb119a85e764e5$var$formatterCache = /* @__PURE__ */ new Map();
var $1dfb119a85e764e5$var$supportsSignDisplay = false;
try {
	$1dfb119a85e764e5$var$supportsSignDisplay = new Intl.NumberFormat("de-DE", { signDisplay: "exceptZero" }).resolvedOptions().signDisplay === "exceptZero";
} catch {}
var $1dfb119a85e764e5$var$supportsUnit = false;
try {
	$1dfb119a85e764e5$var$supportsUnit = new Intl.NumberFormat("de-DE", {
		style: "unit",
		unit: "degree"
	}).resolvedOptions().style === "unit";
} catch {}
var $1dfb119a85e764e5$var$UNITS = { degree: { narrow: {
	default: "°",
	"ja-JP": " 度",
	"zh-TW": "度",
	"sl-SI": " °"
} } };
var $1dfb119a85e764e5$export$cc77c4ff7e8673c5 = class {
	constructor(locale, options = {}) {
		this.numberFormatter = $1dfb119a85e764e5$var$getCachedNumberFormatter(locale, options);
		this.options = options;
	}
	/**
	* Formats a number value as a string, according to the locale and options provided to the
	* constructor.
	*/ format(value) {
		let res = "";
		if (!$1dfb119a85e764e5$var$supportsSignDisplay && this.options.signDisplay != null) res = $1dfb119a85e764e5$export$711b50b3c525e0f2(this.numberFormatter, this.options.signDisplay, value);
		else res = this.numberFormatter.format(value);
		if (this.options.style === "unit" && !$1dfb119a85e764e5$var$supportsUnit) {
			let { unit, unitDisplay = "short", locale } = this.resolvedOptions();
			if (!unit) return res;
			let values = $1dfb119a85e764e5$var$UNITS[unit]?.[unitDisplay];
			res += values[locale] || values.default;
		}
		return res;
	}
	/** Formats a number to an array of parts such as separators, digits, punctuation, and more. */ formatToParts(value) {
		return this.numberFormatter.formatToParts(value);
	}
	/** Formats a number range as a string. */ formatRange(start, end) {
		if (typeof this.numberFormatter.formatRange === "function") return this.numberFormatter.formatRange(start, end);
		if (end < start) throw new RangeError("End date must be >= start date");
		return `${this.format(start)} \u{2013} ${this.format(end)}`;
	}
	/** Formats a number range as an array of parts. */ formatRangeToParts(start, end) {
		if (typeof this.numberFormatter.formatRangeToParts === "function") return this.numberFormatter.formatRangeToParts(start, end);
		if (end < start) throw new RangeError("End date must be >= start date");
		let startParts = this.numberFormatter.formatToParts(start);
		let endParts = this.numberFormatter.formatToParts(end);
		return [
			...startParts.map((p) => ({
				...p,
				source: "startRange"
			})),
			{
				type: "literal",
				value: " – ",
				source: "shared"
			},
			...endParts.map((p) => ({
				...p,
				source: "endRange"
			}))
		];
	}
	/** Returns the resolved formatting options based on the values passed to the constructor. */ resolvedOptions() {
		let options = this.numberFormatter.resolvedOptions();
		if (!$1dfb119a85e764e5$var$supportsSignDisplay && this.options.signDisplay != null) options = {
			...options,
			signDisplay: this.options.signDisplay
		};
		if (!$1dfb119a85e764e5$var$supportsUnit && this.options.style === "unit") options = {
			...options,
			style: "unit",
			unit: this.options.unit,
			unitDisplay: this.options.unitDisplay
		};
		return options;
	}
};
function $1dfb119a85e764e5$var$getCachedNumberFormatter(locale, options = {}) {
	let { numberingSystem } = options;
	if (numberingSystem && locale.includes("-nu-")) {
		if (!locale.includes("-u-")) locale += "-u-";
		locale += `-nu-${numberingSystem}`;
	}
	if (options.style === "unit" && !$1dfb119a85e764e5$var$supportsUnit) {
		let { unit, unitDisplay = "short" } = options;
		if (!unit) throw new Error("unit option must be provided with style: \"unit\"");
		if (!$1dfb119a85e764e5$var$UNITS[unit]?.[unitDisplay]) throw new Error(`Unsupported unit ${unit} with unitDisplay = ${unitDisplay}`);
		options = {
			...options,
			style: "decimal"
		};
	}
	let cacheKey = locale + (options ? Object.entries(options).sort((a, b) => a[0] < b[0] ? -1 : 1).join() : "");
	if ($1dfb119a85e764e5$var$formatterCache.has(cacheKey)) return $1dfb119a85e764e5$var$formatterCache.get(cacheKey);
	let numberFormatter = new Intl.NumberFormat(locale, options);
	$1dfb119a85e764e5$var$formatterCache.set(cacheKey, numberFormatter);
	return numberFormatter;
}
function $1dfb119a85e764e5$export$711b50b3c525e0f2(numberFormat, signDisplay, num) {
	if (signDisplay === "auto") return numberFormat.format(num);
	else if (signDisplay === "never") return numberFormat.format(Math.abs(num));
	else {
		let needsPositiveSign = false;
		if (signDisplay === "always") needsPositiveSign = num > 0 || Object.is(num, 0);
		else if (signDisplay === "exceptZero") {
			if (Object.is(num, -0) || Object.is(num, 0)) num = Math.abs(num);
			else needsPositiveSign = num > 0;
		}
		if (needsPositiveSign) {
			let negative = numberFormat.format(-num);
			let noSign = numberFormat.format(num);
			let minus = negative.replace(noSign, "").replace(/\u200e|\u061C/, "");
			if ([...minus].length !== 1) console.warn("@react-aria/i18n polyfill for NumberFormat signDisplay: Unsupported case");
			return negative.replace(noSign, "!!!").replace(minus, "+").replace("!!!", noSign);
		} else return numberFormat.format(num);
	}
}
//#endregion
//#region node_modules/.pnpm/@internationalized+number@3.6.7/node_modules/@internationalized/number/dist/private/NumberParser.mjs
var $eb76cf4feb040f77$var$CURRENCY_SIGN_REGEX = /* @__PURE__ */ new RegExp("^.*\\(.*\\).*$");
var $eb76cf4feb040f77$var$NUMBERING_SYSTEMS = [
	"latn",
	"arab",
	"hanidec",
	"deva",
	"beng",
	"fullwide"
];
var $eb76cf4feb040f77$export$cd11ab140839f11d = class {
	constructor(locale, options = {}) {
		this.locale = locale;
		this.options = options;
	}
	/**
	* Parses the given string to a number. Returns NaN if a valid number could not be parsed.
	*/ parse(value) {
		return $eb76cf4feb040f77$var$getNumberParserImpl(this.locale, this.options, value).parse(value);
	}
	/**
	* Returns whether the given string could potentially be a valid number. This should be used to
	* validate user input as the user types. If a `minValue` or `maxValue` is provided, the validity
	* of the minus/plus sign characters can be checked.
	*/ isValidPartialNumber(value, minValue, maxValue) {
		return $eb76cf4feb040f77$var$getNumberParserImpl(this.locale, this.options, value).isValidPartialNumber(value, minValue, maxValue);
	}
	/**
	* Returns a numbering system for which the given string is valid in the current locale.
	* If no numbering system could be detected, the default numbering system for the current
	* locale is returned.
	*/ getNumberingSystem(value) {
		return $eb76cf4feb040f77$var$getNumberParserImpl(this.locale, this.options, value).options.numberingSystem;
	}
};
var $eb76cf4feb040f77$var$numberParserCache = /* @__PURE__ */ new Map();
function $eb76cf4feb040f77$var$getNumberParserImpl(locale, options, value) {
	let defaultParser = $eb76cf4feb040f77$var$getCachedNumberParser(locale, options);
	if (!locale.includes("-nu-") && !defaultParser.isValidPartialNumber(value)) {
		for (let numberingSystem of $eb76cf4feb040f77$var$NUMBERING_SYSTEMS) if (numberingSystem !== defaultParser.options.numberingSystem) {
			let parser = $eb76cf4feb040f77$var$getCachedNumberParser(locale + (locale.includes("-u-") ? "-nu-" : "-u-nu-") + numberingSystem, options);
			if (parser.isValidPartialNumber(value)) return parser;
		}
	}
	return defaultParser;
}
function $eb76cf4feb040f77$var$getCachedNumberParser(locale, options) {
	let cacheKey = locale + (options ? Object.entries(options).sort((a, b) => a[0] < b[0] ? -1 : 1).join() : "");
	let parser = $eb76cf4feb040f77$var$numberParserCache.get(cacheKey);
	if (!parser) {
		parser = new $eb76cf4feb040f77$var$NumberParserImpl(locale, options);
		$eb76cf4feb040f77$var$numberParserCache.set(cacheKey, parser);
	}
	return parser;
}
var $eb76cf4feb040f77$var$NumberParserImpl = class {
	constructor(locale, options = {}) {
		this.locale = locale;
		if (options.roundingIncrement !== 1 && options.roundingIncrement != null) {
			if (options.maximumFractionDigits == null && options.minimumFractionDigits == null) {
				options.maximumFractionDigits = 0;
				options.minimumFractionDigits = 0;
			} else if (options.maximumFractionDigits == null) options.maximumFractionDigits = options.minimumFractionDigits;
			else if (options.minimumFractionDigits == null) options.minimumFractionDigits = options.maximumFractionDigits;
		}
		this.formatter = new Intl.NumberFormat(locale, options);
		this.options = this.formatter.resolvedOptions();
		this.symbols = $eb76cf4feb040f77$var$getSymbols(locale, this.formatter, this.options, options);
		if (this.options.style === "percent" && ((this.options.minimumFractionDigits ?? 0) > 18 || (this.options.maximumFractionDigits ?? 0) > 18)) console.warn("NumberParser cannot handle percentages with greater than 18 decimal places, please reduce the number in your options.");
	}
	parse(value) {
		let isGroupSymbolAllowed = this.formatter.resolvedOptions().useGrouping;
		let fullySanitizedValue = this.sanitize(value);
		if (!isGroupSymbolAllowed && this.symbols.group && fullySanitizedValue.includes(this.symbols.group)) return NaN;
		else if (this.symbols.group) fullySanitizedValue = fullySanitizedValue.replaceAll(this.symbols.group, "");
		if (this.symbols.decimal) fullySanitizedValue = fullySanitizedValue.replace(this.symbols.decimal, ".");
		if (this.symbols.minusSign) fullySanitizedValue = fullySanitizedValue.replace(this.symbols.minusSign, "-");
		fullySanitizedValue = fullySanitizedValue.replace(this.symbols.numeral, this.symbols.index);
		if (this.options.style === "percent") {
			let isNegative = fullySanitizedValue.indexOf("-");
			fullySanitizedValue = fullySanitizedValue.replace("-", "");
			fullySanitizedValue = fullySanitizedValue.replace("+", "");
			let index = fullySanitizedValue.indexOf(".");
			if (index === -1) index = fullySanitizedValue.length;
			fullySanitizedValue = fullySanitizedValue.replace(".", "");
			if (index - 2 === 0) fullySanitizedValue = `0.${fullySanitizedValue}`;
			else if (index - 2 === -1) fullySanitizedValue = `0.0${fullySanitizedValue}`;
			else if (index - 2 === -2) fullySanitizedValue = "0.00";
			else fullySanitizedValue = `${fullySanitizedValue.slice(0, index - 2)}.${fullySanitizedValue.slice(index - 2)}`;
			if (isNegative > -1) fullySanitizedValue = `-${fullySanitizedValue}`;
		}
		let newValue = fullySanitizedValue ? +fullySanitizedValue : NaN;
		if (isNaN(newValue)) return NaN;
		if (this.options.style === "percent") {
			let options = {
				...this.options,
				style: "decimal",
				minimumFractionDigits: Math.min((this.options.minimumFractionDigits ?? 0) + 2, 20),
				maximumFractionDigits: Math.min((this.options.maximumFractionDigits ?? 0) + 2, 20)
			};
			return new $eb76cf4feb040f77$export$cd11ab140839f11d(this.locale, options).parse(new $1dfb119a85e764e5$export$cc77c4ff7e8673c5(this.locale, options).format(newValue));
		}
		if (this.options.currencySign === "accounting" && $eb76cf4feb040f77$var$CURRENCY_SIGN_REGEX.test(value)) newValue = -1 * newValue;
		return newValue;
	}
	sanitize(value) {
		let isGroupSymbolAllowed = this.formatter.resolvedOptions().useGrouping;
		if (this.symbols.noNumeralUnits.length > 0 && this.symbols.noNumeralUnits.find((obj) => obj.unit === value)) return this.symbols.noNumeralUnits.find((obj) => obj.unit === value).value.toString();
		value = value.replace(this.symbols.literals, "");
		if (this.symbols.minusSign) value = value.replace("-", this.symbols.minusSign);
		if (this.options.numberingSystem === "arab") {
			if (this.symbols.decimal) {
				value = $eb76cf4feb040f77$var$replaceAll(value, ",", this.symbols.decimal);
				value = $eb76cf4feb040f77$var$replaceAll(value, String.fromCharCode(1548), this.symbols.decimal);
			}
			if (this.symbols.group && isGroupSymbolAllowed) value = $eb76cf4feb040f77$var$replaceAll(value, ".", this.symbols.group);
		}
		if (this.symbols.group === "’" && value.includes("'") && isGroupSymbolAllowed) value = $eb76cf4feb040f77$var$replaceAll(value, "'", this.symbols.group);
		if (this.symbols.group === "'" && value.includes("’") && isGroupSymbolAllowed) value = $eb76cf4feb040f77$var$replaceAll(value, "’", this.symbols.group);
		if (this.options.locale === "fr-FR" && this.symbols.group && isGroupSymbolAllowed) {
			value = $eb76cf4feb040f77$var$replaceAll(value, " ", this.symbols.group);
			value = $eb76cf4feb040f77$var$replaceAll(value, /\u00A0/g, this.symbols.group);
		}
		return value;
	}
	isValidPartialNumber(value, minValue = -Infinity, maxValue = Infinity) {
		let isGroupSymbolAllowed = this.formatter.resolvedOptions().useGrouping;
		value = this.sanitize(value);
		if (this.symbols.minusSign && value.startsWith(this.symbols.minusSign) && minValue < 0) value = value.slice(this.symbols.minusSign.length);
		else if (this.symbols.plusSign && value.startsWith(this.symbols.plusSign) && maxValue > 0) value = value.slice(this.symbols.plusSign.length);
		if (this.symbols.decimal && value.indexOf(this.symbols.decimal) > -1 && this.options.maximumFractionDigits === 0) return false;
		if (this.symbols.group && isGroupSymbolAllowed) value = $eb76cf4feb040f77$var$replaceAll(value, this.symbols.group, "");
		value = value.replace(this.symbols.numeral, "");
		if (this.symbols.decimal) value = value.replace(this.symbols.decimal, "");
		return value.length === 0;
	}
};
var $eb76cf4feb040f77$var$nonLiteralParts = /* @__PURE__ */ new Set([
	"decimal",
	"fraction",
	"integer",
	"minusSign",
	"plusSign",
	"group"
]);
var $eb76cf4feb040f77$var$pluralNumbers = [
	0,
	4,
	2,
	1,
	11,
	20,
	3,
	7,
	100,
	21,
	.1,
	1.1
];
function $eb76cf4feb040f77$var$getSymbols(locale, formatter, intlOptions, originalOptions) {
	let symbolFormatter = new Intl.NumberFormat(locale, {
		...intlOptions,
		minimumSignificantDigits: 1,
		maximumSignificantDigits: 21,
		roundingIncrement: 1,
		roundingPriority: "auto",
		roundingMode: "halfExpand",
		useGrouping: true
	});
	let allParts = symbolFormatter.formatToParts(-10000.111);
	let posAllParts = symbolFormatter.formatToParts(10000.111);
	let pluralParts = $eb76cf4feb040f77$var$pluralNumbers.map((n) => symbolFormatter.formatToParts(n));
	let noNumeralUnits = pluralParts.map((p, i) => {
		let unit = p.find((p) => p.type === "unit");
		if (unit && !p.some((p) => p.type === "integer" || p.type === "fraction")) return {
			unit: unit.value,
			value: $eb76cf4feb040f77$var$pluralNumbers[i]
		};
		return null;
	}).filter((p) => !!p);
	let minusSign = allParts.find((p) => p.type === "minusSign")?.value ?? "-";
	let plusSign = posAllParts.find((p) => p.type === "plusSign")?.value;
	if (!plusSign && (originalOptions?.signDisplay === "exceptZero" || originalOptions?.signDisplay === "always")) plusSign = "+";
	let decimal = new Intl.NumberFormat(locale, {
		...intlOptions,
		minimumFractionDigits: 2,
		maximumFractionDigits: 2
	}).formatToParts(.001).find((p) => p.type === "decimal")?.value;
	let group = allParts.find((p) => p.type === "group")?.value;
	let allPartsLiterals = allParts.filter((p) => !$eb76cf4feb040f77$var$nonLiteralParts.has(p.type)).map((p) => $eb76cf4feb040f77$var$escapeRegex(p.value));
	let pluralPartsLiterals = pluralParts.flatMap((p) => p.filter((p) => !$eb76cf4feb040f77$var$nonLiteralParts.has(p.type)).map((p) => $eb76cf4feb040f77$var$escapeRegex(p.value)));
	let sortedLiterals = [.../* @__PURE__ */ new Set([...allPartsLiterals, ...pluralPartsLiterals])].sort((a, b) => b.length - a.length);
	let literals = sortedLiterals.length === 0 ? /* @__PURE__ */ new RegExp("\\p{White_Space}|\\p{Cf}", "gu") : new RegExp(`${sortedLiterals.join("|")}|\\p{White_Space}|\\p{Cf}`, "gu");
	let numerals = [...new Intl.NumberFormat(intlOptions.locale, { useGrouping: false }).format(9876543210)].reverse();
	let indexes = new Map(numerals.map((d, i) => [d, i]));
	let numeral = new RegExp(`[${numerals.join("")}]`, "g");
	let index = (d) => String(indexes.get(d));
	return {
		minusSign,
		plusSign,
		decimal,
		group,
		literals,
		numeral,
		numerals,
		index,
		noNumeralUnits
	};
}
function $eb76cf4feb040f77$var$replaceAll(str, find, replace) {
	if (str.replaceAll) return str.replaceAll(find, replace);
	return str.split(find).join(replace);
}
function $eb76cf4feb040f77$var$escapeRegex(string) {
	return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/NumberField/utils.js
function usePressedHold(options) {
	const { disabled } = options;
	const timeout = ref();
	const triggerHook = createEventHook();
	const resetTimeout = () => window.clearTimeout(timeout.value);
	const onIncrementPressStart = (delay) => {
		resetTimeout();
		if (disabled.value) return;
		triggerHook.trigger();
		timeout.value = window.setTimeout(() => {
			onIncrementPressStart(60);
		}, delay);
	};
	const handlePressStart = () => {
		onIncrementPressStart(400);
	};
	const handlePressEnd = () => {
		resetTimeout();
	};
	const isPressed = ref(false);
	const target = computed(() => unrefElement(options.target));
	const onPressStart = (event) => {
		if (event.button !== 0 || isPressed.value) return;
		event.preventDefault();
		isPressed.value = true;
		handlePressStart();
	};
	const onPressRelease = () => {
		isPressed.value = false;
		handlePressEnd();
	};
	if (isClient) {
		useEventListener(target || window, "pointerdown", onPressStart);
		useEventListener(window, "pointerup", onPressRelease);
		useEventListener(window, "pointercancel", onPressRelease);
	}
	return {
		isPressed,
		onTrigger: triggerHook.on
	};
}
function useNumberFormatter(locale, options = ref({})) {
	return reactiveComputed(() => new $1dfb119a85e764e5$export$cc77c4ff7e8673c5(locale.value, options.value));
}
function useNumberParser(locale, options = ref({})) {
	return reactiveComputed(() => new $eb76cf4feb040f77$export$cd11ab140839f11d(locale.value, options.value));
}
function handleDecimalOperation(operator, value1, value2) {
	let result = operator === "+" ? value1 + value2 : value1 - value2;
	if (value1 % 1 !== 0 || value2 % 1 !== 0) {
		const value1Decimal = value1.toString().split(".");
		const value2Decimal = value2.toString().split(".");
		const value1DecimalLength = value1Decimal[1] && value1Decimal[1].length || 0;
		const value2DecimalLength = value2Decimal[1] && value2Decimal[1].length || 0;
		const multiplier = 10 ** Math.max(value1DecimalLength, value2DecimalLength);
		value1 = Math.round(value1 * multiplier);
		value2 = Math.round(value2 * multiplier);
		result = operator === "+" ? value1 + value2 : value1 - value2;
		result /= multiplier;
	}
	return result;
}
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/NumberField/NumberFieldRoot.js
var [injectNumberFieldRootContext, provideNumberFieldRootContext] = createContext("NumberFieldRoot");
var NumberFieldRoot_default = /* @__PURE__ */ defineComponent({
	inheritAttrs: false,
	__name: "NumberFieldRoot",
	props: {
		defaultValue: {
			type: Number,
			required: false,
			default: void 0
		},
		modelValue: {
			type: [Number, null],
			required: false
		},
		min: {
			type: Number,
			required: false
		},
		max: {
			type: Number,
			required: false
		},
		step: {
			type: Number,
			required: false,
			default: 1
		},
		stepSnapping: {
			type: Boolean,
			required: false,
			default: true
		},
		formatOptions: {
			type: null,
			required: false
		},
		locale: {
			type: String,
			required: false
		},
		disabled: {
			type: Boolean,
			required: false
		},
		readonly: {
			type: Boolean,
			required: false
		},
		disableWheelChange: {
			type: Boolean,
			required: false
		},
		invertWheelChange: {
			type: Boolean,
			required: false
		},
		id: {
			type: String,
			required: false
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false,
			default: "div"
		},
		name: {
			type: String,
			required: false
		},
		required: {
			type: Boolean,
			required: false
		}
	},
	emits: ["update:modelValue"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const { disabled, readonly, disableWheelChange, invertWheelChange, min, max, step, stepSnapping, formatOptions, id, locale: propLocale } = toRefs(props);
		const modelValue = useVModel(props, "modelValue", emits, {
			defaultValue: props.defaultValue,
			passive: props.modelValue === void 0
		});
		const { primitiveElement, currentElement } = usePrimitiveElement();
		const locale = useLocale(propLocale);
		const isFormControl = useFormControl(currentElement);
		const inputEl = ref();
		const isDecreaseDisabled = computed(() => !isNullish(modelValue.value) && (clampInputValue(modelValue.value) === min.value || min.value && !isNaN(modelValue.value) ? handleDecimalOperation("-", modelValue.value, step.value) < min.value : false));
		const isIncreaseDisabled = computed(() => !isNullish(modelValue.value) && (clampInputValue(modelValue.value) === max.value || max.value && !isNaN(modelValue.value) ? handleDecimalOperation("+", modelValue.value, step.value) > max.value : false));
		function handleChangingValue(type, multiplier = 1) {
			inputEl.value?.focus();
			if (props.disabled || props.readonly) return;
			const currentInputValue = numberParser.parse(inputEl.value?.value ?? "");
			if (isNaN(currentInputValue)) modelValue.value = min.value ?? 0;
			else if (type === "increase") modelValue.value = clampInputValue(currentInputValue + (step.value ?? 1) * multiplier);
			else modelValue.value = clampInputValue(currentInputValue - (step.value ?? 1) * multiplier);
		}
		function handleIncrease(multiplier = 1) {
			handleChangingValue("increase", multiplier);
		}
		function handleDecrease(multiplier = 1) {
			handleChangingValue("decrease", multiplier);
		}
		function handleMinMaxValue(type) {
			if (type === "min" && min.value !== void 0) modelValue.value = clampInputValue(min.value);
			else if (type === "max" && max.value !== void 0) modelValue.value = clampInputValue(max.value);
		}
		const numberFormatter = useNumberFormatter(locale, formatOptions);
		const numberParser = useNumberParser(locale, formatOptions);
		const inputMode = computed(() => {
			return numberFormatter.resolvedOptions().maximumFractionDigits > 0 ? "decimal" : "numeric";
		});
		const textValueFormatter = useNumberFormatter(locale, formatOptions);
		const textValue = computed(() => isNullish(modelValue.value) || isNaN(modelValue.value) ? "" : textValueFormatter.format(modelValue.value));
		function validate(val) {
			return numberParser.isValidPartialNumber(val, min.value, max.value);
		}
		function setInputValue(val) {
			if (inputEl.value) inputEl.value.value = val;
		}
		function clampInputValue(val) {
			let clampedValue;
			if (step.value === void 0 || isNaN(step.value) || !stepSnapping.value) clampedValue = clamp$1(val, min.value, max.value);
			else clampedValue = snapValueToStep(val, min.value, max.value, step.value);
			clampedValue = numberParser.parse(numberFormatter.format(clampedValue));
			return clampedValue;
		}
		function applyInputValue(val) {
			const parsedValue = numberParser.parse(val);
			modelValue.value = isNaN(parsedValue) ? void 0 : clampInputValue(parsedValue);
			if (!val.length) return setInputValue(val);
			if (isNaN(parsedValue)) return setInputValue(textValue.value);
			return setInputValue(textValue.value);
		}
		provideNumberFieldRootContext({
			modelValue,
			handleDecrease,
			handleIncrease,
			handleMinMaxValue,
			inputMode,
			inputEl,
			onInputElement: (el) => inputEl.value = el,
			textValue,
			validate,
			applyInputValue,
			disabled,
			readonly,
			disableWheelChange,
			invertWheelChange,
			max,
			min,
			isDecreaseDisabled,
			isIncreaseDisabled,
			id
		});
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), mergeProps(_ctx.$attrs, {
				ref_key: "primitiveElement",
				ref: primitiveElement,
				role: "group",
				as: _ctx.as,
				"as-child": _ctx.asChild,
				"data-disabled": unref(disabled) ? "" : void 0,
				"data-readonly": unref(readonly) ? "" : void 0
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", {
					modelValue: unref(modelValue),
					textValue: textValue.value
				}), unref(isFormControl) && _ctx.name ? (openBlock(), createBlock(unref(VisuallyHiddenInput_default), {
					key: 0,
					type: "text",
					value: unref(modelValue),
					name: _ctx.name,
					disabled: unref(disabled),
					readonly: unref(readonly),
					required: _ctx.required
				}, null, 8, [
					"value",
					"name",
					"disabled",
					"readonly",
					"required"
				])) : createCommentVNode("v-if", true)]),
				_: 3
			}, 16, [
				"as",
				"as-child",
				"data-disabled",
				"data-readonly"
			]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/NumberField/NumberFieldDecrement.js
var NumberFieldDecrement_default = /* @__PURE__ */ defineComponent({
	__name: "NumberFieldDecrement",
	props: {
		disabled: {
			type: Boolean,
			required: false
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false,
			default: "button"
		}
	},
	setup(__props) {
		const props = __props;
		const rootContext = injectNumberFieldRootContext();
		const isDisabled = computed(() => rootContext.disabled?.value || rootContext.readonly.value || props.disabled || rootContext.isDecreaseDisabled.value);
		const { primitiveElement, currentElement } = usePrimitiveElement();
		const { isPressed, onTrigger } = usePressedHold({
			target: currentElement,
			disabled: isDisabled
		});
		onTrigger(() => {
			rootContext.handleDecrease();
		});
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), mergeProps(props, {
				ref_key: "primitiveElement",
				ref: primitiveElement,
				tabindex: "-1",
				"aria-label": "Decrease",
				type: _ctx.as === "button" ? "button" : void 0,
				style: { userSelect: unref(isPressed) ? "none" : void 0 },
				disabled: isDisabled.value ? "" : void 0,
				"data-disabled": isDisabled.value ? "" : void 0,
				"data-pressed": unref(isPressed) ? "true" : void 0,
				onContextmenu: _cache[0] || (_cache[0] = withModifiers(() => {}, ["prevent"]))
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16, [
				"type",
				"style",
				"disabled",
				"data-disabled",
				"data-pressed"
			]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/NumberField/NumberFieldIncrement.js
var NumberFieldIncrement_default = /* @__PURE__ */ defineComponent({
	__name: "NumberFieldIncrement",
	props: {
		disabled: {
			type: Boolean,
			required: false
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false,
			default: "button"
		}
	},
	setup(__props) {
		const props = __props;
		const rootContext = injectNumberFieldRootContext();
		const isDisabled = computed(() => rootContext.disabled?.value || rootContext.readonly.value || props.disabled || rootContext.isIncreaseDisabled.value);
		const { primitiveElement, currentElement } = usePrimitiveElement();
		const { isPressed, onTrigger } = usePressedHold({
			target: currentElement,
			disabled: isDisabled
		});
		onTrigger(() => {
			rootContext.handleIncrease();
		});
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), mergeProps(props, {
				ref_key: "primitiveElement",
				ref: primitiveElement,
				tabindex: "-1",
				"aria-label": "Increase",
				type: _ctx.as === "button" ? "button" : void 0,
				style: { userSelect: unref(isPressed) ? "none" : void 0 },
				disabled: isDisabled.value ? "" : void 0,
				"data-disabled": isDisabled.value ? "" : void 0,
				"data-pressed": unref(isPressed) ? "true" : void 0,
				onContextmenu: _cache[0] || (_cache[0] = withModifiers(() => {}, ["prevent"]))
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16, [
				"type",
				"style",
				"disabled",
				"data-disabled",
				"data-pressed"
			]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/NumberField/NumberFieldInput.js
var NumberFieldInput_default = /* @__PURE__ */ defineComponent({
	__name: "NumberFieldInput",
	props: {
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false,
			default: "input"
		}
	},
	setup(__props) {
		const props = __props;
		const { primitiveElement, currentElement } = usePrimitiveElement();
		const rootContext = injectNumberFieldRootContext();
		function handleWheelEvent(event) {
			if (rootContext.disableWheelChange.value) return;
			if (event.target !== getActiveElement()) return;
			if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;
			event.preventDefault();
			if (event.deltaY > 0) rootContext.invertWheelChange.value ? rootContext.handleDecrease() : rootContext.handleIncrease();
			else if (event.deltaY < 0) rootContext.invertWheelChange.value ? rootContext.handleIncrease() : rootContext.handleDecrease();
		}
		onMounted(() => {
			rootContext.onInputElement(currentElement.value);
		});
		const inputValue = ref(rootContext.textValue.value);
		watch(() => rootContext.textValue.value, () => {
			inputValue.value = rootContext.textValue.value;
		}, {
			immediate: true,
			deep: true
		});
		function handleChange() {
			requestAnimationFrame(() => {
				inputValue.value = rootContext.textValue.value;
			});
		}
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), mergeProps(props, {
				id: unref(rootContext).id.value,
				ref_key: "primitiveElement",
				ref: primitiveElement,
				value: inputValue.value,
				role: "spinbutton",
				type: "text",
				tabindex: "0",
				inputmode: unref(rootContext).inputMode.value,
				disabled: unref(rootContext).disabled.value ? "" : void 0,
				"data-disabled": unref(rootContext).disabled.value ? "" : void 0,
				readonly: unref(rootContext).readonly.value ? "" : void 0,
				"data-readonly": unref(rootContext).readonly.value ? "" : void 0,
				autocomplete: "off",
				autocorrect: "off",
				spellcheck: "false",
				"aria-roledescription": "Number field",
				"aria-valuenow": unref(rootContext).modelValue.value,
				"aria-valuemin": unref(rootContext).min.value,
				"aria-valuemax": unref(rootContext).max.value,
				onKeydown: [
					_cache[0] || (_cache[0] = withKeys(withModifiers(($event) => unref(rootContext).handleIncrease(), ["prevent"]), ["up"])),
					_cache[1] || (_cache[1] = withKeys(withModifiers(($event) => unref(rootContext).handleDecrease(), ["prevent"]), ["down"])),
					_cache[2] || (_cache[2] = withKeys(withModifiers(($event) => unref(rootContext).handleIncrease(10), ["prevent"]), ["page-up"])),
					_cache[3] || (_cache[3] = withKeys(withModifiers(($event) => unref(rootContext).handleDecrease(10), ["prevent"]), ["page-down"])),
					_cache[4] || (_cache[4] = withKeys(withModifiers(($event) => unref(rootContext).handleMinMaxValue("min"), ["prevent"]), ["home"])),
					_cache[5] || (_cache[5] = withKeys(withModifiers(($event) => unref(rootContext).handleMinMaxValue("max"), ["prevent"]), ["end"])),
					_cache[8] || (_cache[8] = withKeys(($event) => unref(rootContext).applyInputValue($event.target?.value), ["enter"]))
				],
				onWheel: handleWheelEvent,
				onBeforeinput: _cache[6] || (_cache[6] = (event) => {
					const target = event.target;
					let nextValue = target.value.slice(0, target.selectionStart ?? void 0) + (event.data ?? "") + target.value.slice(target.selectionEnd ?? void 0);
					if (!unref(rootContext).validate(nextValue)) event.preventDefault();
				}),
				onInput: _cache[7] || (_cache[7] = (event) => {
					const target = event.target;
					inputValue.value = target.value;
				}),
				onChange: handleChange,
				onBlur: _cache[9] || (_cache[9] = ($event) => unref(rootContext).applyInputValue($event.target?.value))
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16, [
				"id",
				"value",
				"inputmode",
				"disabled",
				"data-disabled",
				"readonly",
				"data-readonly",
				"aria-valuenow",
				"aria-valuemin",
				"aria-valuemax"
			]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/Pagination/PaginationEllipsis.js
var PaginationEllipsis_default = /* @__PURE__ */ defineComponent({
	__name: "PaginationEllipsis",
	props: {
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false
		}
	},
	setup(__props) {
		const props = __props;
		useForwardExpose();
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), mergeProps(props, { "data-type": "ellipsis" }), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", {}, () => [_cache[0] || (_cache[0] = createTextVNode("…"))])]),
				_: 3
			}, 16);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/Pagination/PaginationRoot.js
var [injectPaginationRootContext, providePaginationRootContext] = createContext("PaginationRoot");
var PaginationRoot_default = /* @__PURE__ */ defineComponent({
	__name: "PaginationRoot",
	props: {
		page: {
			type: Number,
			required: false
		},
		defaultPage: {
			type: Number,
			required: false,
			default: 1
		},
		itemsPerPage: {
			type: Number,
			required: true
		},
		total: {
			type: Number,
			required: false,
			default: 0
		},
		siblingCount: {
			type: Number,
			required: false,
			default: 2
		},
		disabled: {
			type: Boolean,
			required: false
		},
		showEdges: {
			type: Boolean,
			required: false,
			default: false
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false,
			default: "nav"
		}
	},
	emits: ["update:page"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const { siblingCount, disabled, showEdges } = toRefs(props);
		useForwardExpose();
		const page = useVModel(props, "page", emits, {
			defaultValue: props.defaultPage,
			passive: props.page === void 0
		});
		const pageCount = computed(() => Math.max(1, Math.ceil(props.total / (props.itemsPerPage || 1))));
		providePaginationRootContext({
			page,
			onPageChange(value) {
				page.value = value;
			},
			pageCount,
			siblingCount,
			disabled,
			showEdges
		});
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), {
				as: _ctx.as,
				"as-child": _ctx.asChild
			}, {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", {
					page: unref(page),
					pageCount: pageCount.value
				})]),
				_: 3
			}, 8, ["as", "as-child"]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/Pagination/utils.js
function range(start, end) {
	const length = end - start + 1;
	return Array.from({ length }, (_, idx) => idx + start);
}
function transform(items) {
	return items.map((value) => {
		if (typeof value === "number") return {
			type: "page",
			value
		};
		return { type: "ellipsis" };
	});
}
var ELLIPSIS = "ellipsis";
function getRange(currentPage, pageCount, siblingCount, showEdges) {
	const firstPageIndex = 1;
	const lastPageIndex = pageCount;
	const leftSiblingIndex = Math.max(currentPage - siblingCount, firstPageIndex);
	const rightSiblingIndex = Math.min(currentPage + siblingCount, lastPageIndex);
	if (showEdges) {
		const itemCount = Math.min(2 * siblingCount + 5, pageCount) - 2;
		const showLeftEllipsis = leftSiblingIndex > 3 && Math.abs(lastPageIndex - itemCount - firstPageIndex + 1) > 2 && Math.abs(leftSiblingIndex - firstPageIndex) > 2;
		const showRightEllipsis = rightSiblingIndex < lastPageIndex - 2 && Math.abs(lastPageIndex - itemCount) > 2 && Math.abs(lastPageIndex - rightSiblingIndex) > 2;
		if (!showLeftEllipsis && showRightEllipsis) return [
			...range(1, itemCount),
			ELLIPSIS,
			lastPageIndex
		];
		if (showLeftEllipsis && !showRightEllipsis) return [
			firstPageIndex,
			ELLIPSIS,
			...range(lastPageIndex - itemCount + 1, lastPageIndex)
		];
		if (showLeftEllipsis && showRightEllipsis) return [
			firstPageIndex,
			ELLIPSIS,
			...range(leftSiblingIndex, rightSiblingIndex),
			ELLIPSIS,
			lastPageIndex
		];
		return range(firstPageIndex, lastPageIndex);
	} else {
		const itemCount = siblingCount * 2 + 1;
		if (pageCount < itemCount) return range(1, lastPageIndex);
		else if (currentPage <= siblingCount + 1) return range(firstPageIndex, itemCount);
		else if (pageCount - currentPage <= siblingCount) return range(pageCount - itemCount + 1, lastPageIndex);
		else return range(leftSiblingIndex, rightSiblingIndex);
	}
}
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/Pagination/PaginationList.js
var PaginationList_default = /* @__PURE__ */ defineComponent({
	__name: "PaginationList",
	props: {
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false
		}
	},
	setup(__props) {
		const props = __props;
		useForwardExpose();
		const rootContext = injectPaginationRootContext();
		const transformedRange = computed(() => {
			return transform(getRange(rootContext.page.value, rootContext.pageCount.value, rootContext.siblingCount.value, rootContext.showEdges.value));
		});
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), normalizeProps(guardReactiveProps(props)), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", { items: transformedRange.value })]),
				_: 3
			}, 16);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/Pagination/PaginationListItem.js
var PaginationListItem_default = /* @__PURE__ */ defineComponent({
	__name: "PaginationListItem",
	props: {
		value: {
			type: Number,
			required: true
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false,
			default: "button"
		}
	},
	setup(__props) {
		const props = __props;
		useForwardExpose();
		const rootContext = injectPaginationRootContext();
		const isSelected = computed(() => rootContext.page.value === props.value);
		const disabled = computed(() => rootContext.disabled.value);
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), mergeProps(props, {
				"data-type": "page",
				"aria-label": `Page ${_ctx.value}`,
				"aria-current": isSelected.value ? "page" : void 0,
				"data-selected": isSelected.value ? "true" : void 0,
				disabled: disabled.value,
				type: _ctx.as === "button" ? "button" : void 0,
				onClick: _cache[0] || (_cache[0] = ($event) => !disabled.value && unref(rootContext).onPageChange(_ctx.value))
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", {}, () => [createTextVNode(toDisplayString(_ctx.value), 1)])]),
				_: 3
			}, 16, [
				"aria-label",
				"aria-current",
				"data-selected",
				"disabled",
				"type"
			]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/Pagination/PaginationNext.js
var PaginationNext_default = /* @__PURE__ */ defineComponent({
	__name: "PaginationNext",
	props: {
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false,
			default: "button"
		}
	},
	setup(__props) {
		const props = __props;
		useForwardExpose();
		const rootContext = injectPaginationRootContext();
		const disabled = computed(() => rootContext.page.value === rootContext.pageCount.value || rootContext.disabled.value);
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), mergeProps(props, {
				"aria-label": "Next Page",
				type: _ctx.as === "button" ? "button" : void 0,
				disabled: disabled.value,
				onClick: _cache[0] || (_cache[0] = ($event) => !disabled.value && unref(rootContext).onPageChange(unref(rootContext).page.value + 1))
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", {}, () => [_cache[1] || (_cache[1] = createTextVNode("Next page"))])]),
				_: 3
			}, 16, ["type", "disabled"]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/Pagination/PaginationPrev.js
var PaginationPrev_default = /* @__PURE__ */ defineComponent({
	__name: "PaginationPrev",
	props: {
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false,
			default: "button"
		}
	},
	setup(__props) {
		const props = __props;
		useForwardExpose();
		const rootContext = injectPaginationRootContext();
		const disabled = computed(() => rootContext.page.value === 1 || rootContext.disabled.value);
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), mergeProps(props, {
				"aria-label": "Previous Page",
				type: _ctx.as === "button" ? "button" : void 0,
				disabled: disabled.value,
				onClick: _cache[0] || (_cache[0] = ($event) => !disabled.value && unref(rootContext).onPageChange(unref(rootContext).page.value - 1))
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", {}, () => [_cache[1] || (_cache[1] = createTextVNode("Prev page"))])]),
				_: 3
			}, 16, ["type", "disabled"]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/RadioGroup/utils.js
var RADIO_SELECT = "radio.select";
function handleSelect(event, value, callback) {
	handleAndDispatchCustomEvent(RADIO_SELECT, callback, {
		originalEvent: event,
		value
	});
}
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/RadioGroup/Radio.js
var Radio_default = /* @__PURE__ */ defineComponent({
	__name: "Radio",
	props: {
		id: {
			type: String,
			required: false
		},
		value: {
			type: null,
			required: false
		},
		disabled: {
			type: Boolean,
			required: false,
			default: false
		},
		checked: {
			type: Boolean,
			required: false,
			default: void 0
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false,
			default: "button"
		},
		name: {
			type: String,
			required: false
		},
		required: {
			type: Boolean,
			required: false
		}
	},
	emits: ["update:checked", "select"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const checked = useVModel(props, "checked", emits, { passive: props.checked === void 0 });
		const { value } = toRefs(props);
		const { forwardRef, currentElement: triggerElement } = useForwardExpose();
		const isFormControl = useFormControl(triggerElement);
		const ariaLabel = computed(() => props.id && triggerElement.value ? document.querySelector(`[for="${props.id}"]`)?.innerText ?? props.value : void 0);
		function handleClick(event) {
			if (props.disabled) return;
			handleSelect(event, props.value, (ev) => {
				emits("select", ev);
				if (ev?.defaultPrevented) return;
				checked.value = true;
				if (isFormControl.value) ev.stopPropagation();
			});
		}
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), mergeProps(_ctx.$attrs, {
				id: _ctx.id,
				ref: unref(forwardRef),
				role: "radio",
				type: _ctx.as === "button" ? "button" : void 0,
				as: _ctx.as,
				"aria-checked": unref(checked),
				"aria-label": ariaLabel.value,
				"as-child": _ctx.asChild,
				disabled: _ctx.disabled ? "" : void 0,
				"data-state": unref(checked) ? "checked" : "unchecked",
				"data-disabled": _ctx.disabled ? "" : void 0,
				value: unref(value),
				required: _ctx.required,
				name: _ctx.name,
				onClick: withModifiers(handleClick, ["stop"])
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", { checked: unref(checked) }), unref(isFormControl) && _ctx.name ? (openBlock(), createBlock(unref(VisuallyHiddenInput_default), {
					key: 0,
					type: "radio",
					tabindex: "-1",
					value: unref(value),
					checked: !!unref(checked),
					name: _ctx.name,
					disabled: _ctx.disabled,
					required: _ctx.required
				}, null, 8, [
					"value",
					"checked",
					"name",
					"disabled",
					"required"
				])) : createCommentVNode("v-if", true)]),
				_: 3
			}, 16, [
				"id",
				"type",
				"as",
				"aria-checked",
				"aria-label",
				"as-child",
				"disabled",
				"data-state",
				"data-disabled",
				"value",
				"required",
				"name"
			]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/RadioGroup/RadioGroupRoot.js
var [injectRadioGroupRootContext, provideRadioGroupRootContext] = createContext("RadioGroupRoot");
var RadioGroupRoot_default = /* @__PURE__ */ defineComponent({
	__name: "RadioGroupRoot",
	props: {
		modelValue: {
			type: null,
			required: false
		},
		defaultValue: {
			type: null,
			required: false
		},
		disabled: {
			type: Boolean,
			required: false,
			default: false
		},
		orientation: {
			type: String,
			required: false,
			default: void 0
		},
		dir: {
			type: String,
			required: false
		},
		loop: {
			type: Boolean,
			required: false,
			default: true
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false
		},
		name: {
			type: String,
			required: false
		},
		required: {
			type: Boolean,
			required: false,
			default: false
		}
	},
	emits: ["update:modelValue"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const { forwardRef, currentElement } = useForwardExpose();
		const modelValue = useVModel(props, "modelValue", emits, {
			defaultValue: props.defaultValue,
			passive: props.modelValue === void 0
		});
		const { disabled, loop, orientation, name, required, dir: propDir } = toRefs(props);
		const dir = useDirection(propDir);
		const isFormControl = useFormControl(currentElement);
		provideRadioGroupRootContext({
			modelValue,
			changeModelValue: (value) => {
				modelValue.value = value;
			},
			disabled,
			loop,
			orientation,
			name: name?.value,
			required
		});
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(RovingFocusGroup_default), {
				"as-child": "",
				orientation: unref(orientation),
				dir: unref(dir),
				loop: unref(loop)
			}, {
				default: withCtx(() => [createVNode(unref(Primitive), {
					ref: unref(forwardRef),
					role: "radiogroup",
					"data-disabled": unref(disabled) ? "" : void 0,
					"as-child": _ctx.asChild,
					as: _ctx.as,
					"aria-orientation": unref(orientation),
					"aria-required": unref(required),
					dir: unref(dir)
				}, {
					default: withCtx(() => [renderSlot(_ctx.$slots, "default", { modelValue: unref(modelValue) }), unref(isFormControl) && unref(name) ? (openBlock(), createBlock(unref(VisuallyHiddenInput_default), {
						key: 0,
						required: unref(required),
						disabled: unref(disabled),
						value: unref(modelValue),
						name: unref(name)
					}, null, 8, [
						"required",
						"disabled",
						"value",
						"name"
					])) : createCommentVNode("v-if", true)]),
					_: 3
				}, 8, [
					"data-disabled",
					"as-child",
					"as",
					"aria-orientation",
					"aria-required",
					"dir"
				])]),
				_: 3
			}, 8, [
				"orientation",
				"dir",
				"loop"
			]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/RadioGroup/RadioGroupItem.js
var [injectRadioGroupItemContext, provideRadiogroupItemContext] = createContext("RadioGroupItem");
var RadioGroupItem_default = /* @__PURE__ */ defineComponent({
	inheritAttrs: false,
	__name: "RadioGroupItem",
	props: {
		id: {
			type: String,
			required: false
		},
		value: {
			type: null,
			required: false
		},
		disabled: {
			type: Boolean,
			required: false,
			default: false
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false,
			default: "button"
		},
		name: {
			type: String,
			required: false
		},
		required: {
			type: Boolean,
			required: false
		}
	},
	emits: ["select"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const { forwardRef, currentElement } = useForwardExpose();
		const rootContext = injectRadioGroupRootContext();
		const disabled = computed(() => rootContext.disabled.value || props.disabled);
		const required = computed(() => rootContext.required.value || props.required);
		const checked = computed(() => isEqual(rootContext.modelValue?.value, props.value));
		provideRadiogroupItemContext({
			disabled,
			checked
		});
		const isArrowKeyPressed = ref(false);
		const ARROW_KEYS = [
			"ArrowUp",
			"ArrowDown",
			"ArrowLeft",
			"ArrowRight"
		];
		useEventListener("keydown", (event) => {
			if (ARROW_KEYS.includes(event.key)) isArrowKeyPressed.value = true;
		});
		useEventListener("keyup", () => {
			isArrowKeyPressed.value = false;
		});
		function handleFocus() {
			setTimeout(() => {
				/**
				* Our `RovingFocusGroup` will focus the radio when navigating with arrow keys
				* and we need to 'check' it in that case. We click it to 'check' it (instead
				* of updating `context.value`) so that the radio change event fires.
				*/
				if (isArrowKeyPressed.value) currentElement.value?.click();
			}, 0);
		}
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(RovingFocusItem_default), {
				checked: checked.value,
				disabled: disabled.value,
				"as-child": "",
				focusable: !disabled.value,
				active: checked.value
			}, {
				default: withCtx(() => [createVNode(Radio_default, mergeProps({
					..._ctx.$attrs,
					...props
				}, {
					ref: unref(forwardRef),
					checked: checked.value,
					required: required.value,
					disabled: disabled.value,
					"onUpdate:checked": _cache[0] || (_cache[0] = ($event) => unref(rootContext).changeModelValue(_ctx.value)),
					onSelect: _cache[1] || (_cache[1] = ($event) => emits("select", $event)),
					onKeydown: _cache[2] || (_cache[2] = withKeys(withModifiers(() => {}, ["prevent"]), ["enter"])),
					onFocus: handleFocus
				}), {
					default: withCtx(() => [renderSlot(_ctx.$slots, "default", {
						checked: checked.value,
						required: required.value,
						disabled: disabled.value
					})]),
					_: 3
				}, 16, [
					"checked",
					"required",
					"disabled"
				])]),
				_: 3
			}, 8, [
				"checked",
				"disabled",
				"focusable",
				"active"
			]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/RadioGroup/RadioGroupIndicator.js
var RadioGroupIndicator_default = /* @__PURE__ */ defineComponent({
	__name: "RadioGroupIndicator",
	props: {
		forceMount: {
			type: Boolean,
			required: false
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false,
			default: "span"
		}
	},
	setup(__props) {
		const { forwardRef } = useForwardExpose();
		const itemContext = injectRadioGroupItemContext();
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Presence_default), { present: _ctx.forceMount || unref(itemContext).checked.value }, {
				default: withCtx(() => [createVNode(unref(Primitive), mergeProps({
					ref: unref(forwardRef),
					"data-state": unref(itemContext).checked.value ? "checked" : "unchecked",
					"data-disabled": unref(itemContext).disabled.value ? "" : void 0,
					"as-child": _ctx.asChild,
					as: _ctx.as
				}, _ctx.$attrs), {
					default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
					_: 3
				}, 16, [
					"data-state",
					"data-disabled",
					"as-child",
					"as"
				])]),
				_: 3
			}, 8, ["present"]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/Select/utils.js
var OPEN_KEYS = [
	" ",
	"Enter",
	"ArrowUp",
	"ArrowDown"
];
var SELECTION_KEYS = [" ", "Enter"];
function valueComparator(value, currentValue, comparator) {
	if (value === void 0) return false;
	else if (Array.isArray(value)) return value.some((val) => compare$1(val, currentValue, comparator));
	else return compare$1(value, currentValue, comparator);
}
function compare$1(value, currentValue, comparator) {
	if (value === void 0 || currentValue === void 0) return false;
	if (typeof value === "string") return value === currentValue;
	if (typeof comparator === "function") return comparator(value, currentValue);
	if (typeof comparator === "string") return value?.[comparator] === currentValue?.[comparator];
	return isEqual(value, currentValue);
}
__name(compare$1, "compare");
function shouldShowPlaceholder(value) {
	return value === void 0 || value === null || value === "" || Array.isArray(value) && value.length === 0;
}
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/Select/SelectRoot.js
var _hoisted_1$1 = {
	key: 0,
	value: ""
};
var [injectSelectRootContext, provideSelectRootContext] = createContext("SelectRoot");
var SelectRoot_default = /* @__PURE__ */ defineComponent({
	inheritAttrs: false,
	__name: "SelectRoot",
	props: {
		open: {
			type: Boolean,
			required: false,
			default: void 0
		},
		defaultOpen: {
			type: Boolean,
			required: false
		},
		defaultValue: {
			type: null,
			required: false
		},
		modelValue: {
			type: null,
			required: false,
			default: void 0
		},
		by: {
			type: [String, Function],
			required: false
		},
		dir: {
			type: String,
			required: false
		},
		multiple: {
			type: Boolean,
			required: false
		},
		autocomplete: {
			type: String,
			required: false
		},
		disabled: {
			type: Boolean,
			required: false
		},
		name: {
			type: String,
			required: false
		},
		required: {
			type: Boolean,
			required: false
		}
	},
	emits: ["update:modelValue", "update:open"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const { required, disabled, multiple, dir: propDir } = toRefs(props);
		const modelValue = useVModel(props, "modelValue", emits, {
			defaultValue: props.defaultValue ?? (multiple.value ? [] : void 0),
			passive: props.modelValue === void 0,
			deep: true
		});
		const open = useVModel(props, "open", emits, {
			defaultValue: props.defaultOpen,
			passive: props.open === void 0
		});
		const triggerElement = ref();
		const valueElement = ref();
		const triggerPointerDownPosRef = ref({
			x: 0,
			y: 0
		});
		const isEmptyModelValue = computed(() => {
			if (multiple.value && Array.isArray(modelValue.value)) return modelValue.value?.length === 0;
			else return isNullish(modelValue.value);
		});
		useCollection({ isProvider: true });
		const dir = useDirection(propDir);
		const isFormControl = useFormControl(triggerElement);
		const optionsSet = ref(/* @__PURE__ */ new Set());
		const nativeSelectKey = computed(() => {
			return Array.from(optionsSet.value).map((option) => option.value).join(";");
		});
		function handleValueChange(value) {
			if (multiple.value) {
				const array = Array.isArray(modelValue.value) ? [...modelValue.value] : [];
				const index = array.findIndex((i) => compare$1(i, value, props.by));
				index === -1 ? array.push(value) : array.splice(index, 1);
				modelValue.value = [...array];
			} else modelValue.value = value;
		}
		function getOption(value) {
			return Array.from(optionsSet.value).find((option) => valueComparator(value, option.value, props.by));
		}
		provideSelectRootContext({
			triggerElement,
			onTriggerChange: (node) => {
				triggerElement.value = node;
			},
			valueElement,
			onValueElementChange: (node) => {
				valueElement.value = node;
			},
			contentId: "",
			modelValue,
			onValueChange: handleValueChange,
			by: props.by,
			open,
			multiple,
			required,
			onOpenChange: (value) => {
				open.value = value;
			},
			dir,
			triggerPointerDownPosRef,
			disabled,
			isEmptyModelValue,
			optionsSet,
			onOptionAdd: (option) => {
				const existingOption = getOption(option.value);
				if (existingOption) optionsSet.value.delete(existingOption);
				optionsSet.value.add(option);
			},
			onOptionRemove: (option) => {
				const existingOption = getOption(option.value);
				if (existingOption) optionsSet.value.delete(existingOption);
			}
		});
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(PopperRoot_default), null, {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", {
					modelValue: unref(modelValue),
					open: unref(open)
				}), unref(isFormControl) ? (openBlock(), createBlock(BubbleSelect_default, {
					key: nativeSelectKey.value,
					"aria-hidden": "true",
					tabindex: "-1",
					multiple: unref(multiple),
					required: unref(required),
					name: _ctx.name,
					autocomplete: _ctx.autocomplete,
					disabled: unref(disabled),
					value: unref(modelValue)
				}, {
					default: withCtx(() => [unref(isNullish)(unref(modelValue)) ? (openBlock(), createElementBlock("option", _hoisted_1$1)) : createCommentVNode("v-if", true), (openBlock(true), createElementBlock(Fragment, null, renderList(Array.from(optionsSet.value), (option) => {
						return openBlock(), createElementBlock("option", mergeProps({ key: option.value ?? "" }, { ref_for: true }, option), null, 16);
					}), 128))]),
					_: 1
				}, 8, [
					"multiple",
					"required",
					"name",
					"autocomplete",
					"disabled",
					"value"
				])) : createCommentVNode("v-if", true)]),
				_: 3
			});
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/Select/BubbleSelect.js
var BubbleSelect_default = /* @__PURE__ */ defineComponent({
	__name: "BubbleSelect",
	props: {
		autocomplete: {
			type: String,
			required: false
		},
		autofocus: {
			type: Boolean,
			required: false
		},
		disabled: {
			type: Boolean,
			required: false
		},
		form: {
			type: String,
			required: false
		},
		multiple: {
			type: Boolean,
			required: false
		},
		name: {
			type: String,
			required: false
		},
		required: {
			type: Boolean,
			required: false
		},
		size: {
			type: Number,
			required: false
		},
		value: {
			type: null,
			required: false
		}
	},
	setup(__props) {
		const props = __props;
		const selectElement = ref();
		const rootContext = injectSelectRootContext();
		watch(() => props.value, (cur, prev) => {
			const selectProto = window.HTMLSelectElement.prototype;
			const setValue = Object.getOwnPropertyDescriptor(selectProto, "value").set;
			if (cur !== prev && setValue && selectElement.value) {
				const event = new Event("change", { bubbles: true });
				setValue.call(selectElement.value, cur);
				selectElement.value.dispatchEvent(event);
			}
		});
		/**
		* Form autofill will trigger an `input` event on the `select` element.
		* We listen to that event and update our internal state to support it.
		*/
		function handleInput(event) {
			rootContext.onValueChange(event.target.value);
		}
		/**
		* We purposefully use a `select` here to support form autofill as much
		* as possible.
		*
		* We purposefully do not add the `value` attribute here to allow the value
		* to be set programmatically and bubble to any parent form `onChange` event.
		*
		* We use `VisuallyHidden` rather than `display: "none"` because Safari autofill
		* won't work otherwise.
		*/
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(VisuallyHidden_default), { "as-child": "" }, {
				default: withCtx(() => [createBaseVNode("select", mergeProps({
					ref_key: "selectElement",
					ref: selectElement
				}, props, { onInput: handleInput }), [renderSlot(_ctx.$slots, "default")], 16)]),
				_: 3
			});
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/Select/SelectPopperPosition.js
var SelectPopperPosition_default = /* @__PURE__ */ defineComponent({
	__name: "SelectPopperPosition",
	props: {
		side: {
			type: null,
			required: false
		},
		sideOffset: {
			type: Number,
			required: false
		},
		sideFlip: {
			type: Boolean,
			required: false
		},
		align: {
			type: null,
			required: false,
			default: "start"
		},
		alignOffset: {
			type: Number,
			required: false
		},
		alignFlip: {
			type: Boolean,
			required: false
		},
		avoidCollisions: {
			type: Boolean,
			required: false
		},
		collisionBoundary: {
			type: null,
			required: false
		},
		collisionPadding: {
			type: [Number, Object],
			required: false,
			default: 10
		},
		arrowPadding: {
			type: Number,
			required: false
		},
		sticky: {
			type: String,
			required: false
		},
		hideWhenDetached: {
			type: Boolean,
			required: false
		},
		positionStrategy: {
			type: String,
			required: false
		},
		updatePositionStrategy: {
			type: String,
			required: false
		},
		disableUpdateOnLayoutShift: {
			type: Boolean,
			required: false
		},
		prioritizePosition: {
			type: Boolean,
			required: false
		},
		reference: {
			type: null,
			required: false
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false
		}
	},
	setup(__props) {
		const forwarded = useForwardProps(__props);
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(PopperContent_default), mergeProps(unref(forwarded), { style: {
				"boxSizing": "border-box",
				"--reka-select-content-transform-origin": "var(--reka-popper-transform-origin)",
				"--reka-select-content-available-width": "var(--reka-popper-available-width)",
				"--reka-select-content-available-height": "var(--reka-popper-available-height)",
				"--reka-select-trigger-width": "var(--reka-popper-anchor-width)",
				"--reka-select-trigger-height": "var(--reka-popper-anchor-height)"
			} }), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/Select/SelectContentImpl.js
var SelectContentDefaultContextValue = {
	onViewportChange: () => {},
	itemTextRefCallback: () => {},
	itemRefCallback: () => {}
};
var [injectSelectContentContext, provideSelectContentContext] = createContext("SelectContent");
var SelectContentImpl_default = /* @__PURE__ */ defineComponent({
	__name: "SelectContentImpl",
	props: {
		position: {
			type: String,
			required: false,
			default: "item-aligned"
		},
		bodyLock: {
			type: Boolean,
			required: false,
			default: true
		},
		side: {
			type: null,
			required: false
		},
		sideOffset: {
			type: Number,
			required: false
		},
		sideFlip: {
			type: Boolean,
			required: false
		},
		align: {
			type: null,
			required: false,
			default: "start"
		},
		alignOffset: {
			type: Number,
			required: false
		},
		alignFlip: {
			type: Boolean,
			required: false
		},
		avoidCollisions: {
			type: Boolean,
			required: false
		},
		collisionBoundary: {
			type: null,
			required: false
		},
		collisionPadding: {
			type: [Number, Object],
			required: false
		},
		arrowPadding: {
			type: Number,
			required: false
		},
		sticky: {
			type: String,
			required: false
		},
		hideWhenDetached: {
			type: Boolean,
			required: false
		},
		positionStrategy: {
			type: String,
			required: false
		},
		updatePositionStrategy: {
			type: String,
			required: false
		},
		disableUpdateOnLayoutShift: {
			type: Boolean,
			required: false
		},
		prioritizePosition: {
			type: Boolean,
			required: false
		},
		reference: {
			type: null,
			required: false
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false
		},
		disableOutsidePointerEvents: {
			type: Boolean,
			required: false,
			default: true
		}
	},
	emits: [
		"closeAutoFocus",
		"escapeKeyDown",
		"pointerDownOutside"
	],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const rootContext = injectSelectRootContext();
		useFocusGuards();
		useBodyScrollLock(props.bodyLock);
		const { CollectionSlot, getItems } = useCollection();
		const content = ref();
		useHideOthers(content);
		const { search, handleTypeaheadSearch } = useTypeahead();
		const viewport = ref();
		const selectedItem = ref();
		const selectedItemText = ref();
		const isPositioned = ref(false);
		const firstValidItemFoundRef = ref(false);
		const firstSelectedItemInArrayFoundRef = ref(false);
		function focusSelectedItem() {
			if (selectedItem.value && content.value) focusFirst$1([selectedItem.value, content.value]);
		}
		watch(isPositioned, () => {
			focusSelectedItem();
		});
		const { onOpenChange, triggerPointerDownPosRef } = rootContext;
		watchEffect((cleanupFn) => {
			if (!content.value) return;
			let pointerMoveDelta = {
				x: 0,
				y: 0
			};
			const handlePointerMove = (event) => {
				pointerMoveDelta = {
					x: Math.abs(Math.round(event.pageX) - (triggerPointerDownPosRef.value?.x ?? 0)),
					y: Math.abs(Math.round(event.pageY) - (triggerPointerDownPosRef.value?.y ?? 0))
				};
			};
			const handlePointerUp = (event) => {
				if (event.pointerType === "touch") return;
				if (pointerMoveDelta.x <= 10 && pointerMoveDelta.y <= 10) event.preventDefault();
				else if (!content.value?.contains(event.target)) onOpenChange(false);
				document.removeEventListener("pointermove", handlePointerMove);
				triggerPointerDownPosRef.value = null;
			};
			if (triggerPointerDownPosRef.value !== null) {
				document.addEventListener("pointermove", handlePointerMove);
				document.addEventListener("pointerup", handlePointerUp, {
					capture: true,
					once: true
				});
			}
			cleanupFn(() => {
				document.removeEventListener("pointermove", handlePointerMove);
				document.removeEventListener("pointerup", handlePointerUp, { capture: true });
			});
		});
		function handleKeyDown(event) {
			const isModifierKey = event.ctrlKey || event.altKey || event.metaKey;
			if (event.key === "Tab") event.preventDefault();
			if (!isModifierKey && event.key.length === 1) handleTypeaheadSearch(event.key, getItems());
			if ([
				"ArrowUp",
				"ArrowDown",
				"Home",
				"End"
			].includes(event.key)) {
				let candidateNodes = [...getItems().map((i) => i.ref)];
				if (["ArrowUp", "End"].includes(event.key)) candidateNodes = candidateNodes.slice().reverse();
				if (["ArrowUp", "ArrowDown"].includes(event.key)) {
					const currentElement = event.target;
					const currentIndex = candidateNodes.indexOf(currentElement);
					candidateNodes = candidateNodes.slice(currentIndex + 1);
				}
				setTimeout(() => focusFirst$1(candidateNodes));
				event.preventDefault();
			}
		}
		const forwardedProps = useForwardProps(computed(() => {
			if (props.position === "popper") return props;
			else return {};
		}).value);
		provideSelectContentContext({
			content,
			viewport,
			onViewportChange: (node) => {
				viewport.value = node;
			},
			itemRefCallback: (node, value, disabled) => {
				const isFirstValidItem = !firstValidItemFoundRef.value && !disabled;
				const isSelectedItem = valueComparator(rootContext.modelValue.value, value, rootContext.by);
				if (rootContext.multiple.value) {
					if (firstSelectedItemInArrayFoundRef.value) return;
					if (isSelectedItem || isFirstValidItem) {
						selectedItem.value = node;
						if (isSelectedItem) firstSelectedItemInArrayFoundRef.value = true;
					}
				} else if (isSelectedItem || isFirstValidItem) selectedItem.value = node;
				if (isFirstValidItem) firstValidItemFoundRef.value = true;
			},
			selectedItem,
			selectedItemText,
			onItemLeave: () => {
				content.value?.focus();
			},
			itemTextRefCallback: (node, value, disabled) => {
				const isFirstValidItem = !firstValidItemFoundRef.value && !disabled;
				if (valueComparator(rootContext.modelValue.value, value, rootContext.by) || isFirstValidItem) selectedItemText.value = node;
			},
			focusSelectedItem,
			position: props.position,
			isPositioned,
			searchRef: search
		});
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(CollectionSlot), null, {
				default: withCtx(() => [createVNode(unref(FocusScope_default), {
					"as-child": "",
					onMountAutoFocus: _cache[6] || (_cache[6] = withModifiers(() => {}, ["prevent"])),
					onUnmountAutoFocus: _cache[7] || (_cache[7] = (event) => {
						emits("closeAutoFocus", event);
						if (event.defaultPrevented) return;
						unref(rootContext).triggerElement.value?.focus({ preventScroll: true });
						event.preventDefault();
					})
				}, {
					default: withCtx(() => [createVNode(unref(DismissableLayer_default), {
						"as-child": "",
						"disable-outside-pointer-events": _ctx.disableOutsidePointerEvents,
						onFocusOutside: _cache[2] || (_cache[2] = withModifiers(() => {}, ["prevent"])),
						onDismiss: _cache[3] || (_cache[3] = ($event) => unref(rootContext).onOpenChange(false)),
						onEscapeKeyDown: _cache[4] || (_cache[4] = ($event) => emits("escapeKeyDown", $event)),
						onPointerDownOutside: _cache[5] || (_cache[5] = ($event) => emits("pointerDownOutside", $event))
					}, {
						default: withCtx(() => [(openBlock(), createBlock(resolveDynamicComponent(_ctx.position === "popper" ? SelectPopperPosition_default : SelectItemAlignedPosition_default), mergeProps({
							..._ctx.$attrs,
							...unref(forwardedProps)
						}, {
							id: unref(rootContext).contentId,
							ref: (vnode) => {
								const el = unref(unrefElement)(vnode);
								if (el?.hasAttribute("data-reka-popper-content-wrapper")) content.value = el.firstElementChild;
								else content.value = el;
							},
							role: "listbox",
							"data-state": unref(rootContext).open.value ? "open" : "closed",
							dir: unref(rootContext).dir.value,
							style: {
								display: "flex",
								flexDirection: "column",
								outline: "none"
							},
							onContextmenu: _cache[0] || (_cache[0] = withModifiers(() => {}, ["prevent"])),
							onPlaced: _cache[1] || (_cache[1] = ($event) => isPositioned.value = true),
							onKeydown: handleKeyDown
						}), {
							default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
							_: 3
						}, 16, [
							"id",
							"data-state",
							"dir",
							"onKeydown"
						]))]),
						_: 3
					}, 8, ["disable-outside-pointer-events"])]),
					_: 3
				})]),
				_: 3
			});
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/Select/SelectItemAlignedPosition.js
var [injectSelectItemAlignedPositionContext, provideSelectItemAlignedPositionContext] = createContext("SelectItemAlignedPosition");
var SelectItemAlignedPosition_default = /* @__PURE__ */ defineComponent({
	inheritAttrs: false,
	__name: "SelectItemAlignedPosition",
	props: {
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false
		}
	},
	emits: ["placed"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const { getItems } = useCollection();
		const rootContext = injectSelectRootContext();
		const contentContext = injectSelectContentContext();
		const shouldExpandOnScrollRef = ref(false);
		const shouldRepositionRef = ref(true);
		const contentWrapperElement = ref();
		const { forwardRef, currentElement: contentElement } = useForwardExpose();
		const { viewport, selectedItem, selectedItemText, focusSelectedItem } = contentContext;
		function position() {
			if (rootContext.triggerElement.value && rootContext.valueElement.value && contentWrapperElement.value && contentElement.value && viewport?.value && selectedItem?.value && selectedItemText?.value) {
				const triggerRect = rootContext.triggerElement.value.getBoundingClientRect();
				const contentRect = contentElement.value.getBoundingClientRect();
				const valueNodeRect = rootContext.valueElement.value.getBoundingClientRect();
				const itemTextRect = selectedItemText.value.getBoundingClientRect();
				if (rootContext.dir.value !== "rtl") {
					const itemTextOffset = itemTextRect.left - contentRect.left;
					const left = valueNodeRect.left - itemTextOffset;
					const leftDelta = triggerRect.left - left;
					const minContentWidth = triggerRect.width + leftDelta;
					const contentWidth = Math.max(minContentWidth, contentRect.width);
					const rightEdge = window.innerWidth - 10;
					const clampedLeft = clamp$1(left, 10, Math.max(10, rightEdge - contentWidth));
					contentWrapperElement.value.style.minWidth = `${minContentWidth}px`;
					contentWrapperElement.value.style.left = `${clampedLeft}px`;
				} else {
					const itemTextOffset = contentRect.right - itemTextRect.right;
					const right = window.innerWidth - valueNodeRect.right - itemTextOffset;
					const rightDelta = window.innerWidth - triggerRect.right - right;
					const minContentWidth = triggerRect.width + rightDelta;
					const contentWidth = Math.max(minContentWidth, contentRect.width);
					const leftEdge = window.innerWidth - 10;
					const clampedRight = clamp$1(right, 10, Math.max(10, leftEdge - contentWidth));
					contentWrapperElement.value.style.minWidth = `${minContentWidth}px`;
					contentWrapperElement.value.style.right = `${clampedRight}px`;
				}
				const items = getItems().map((i) => i.ref);
				const availableHeight = window.innerHeight - 20;
				const itemsHeight = viewport.value.scrollHeight;
				const contentStyles = window.getComputedStyle(contentElement.value);
				const contentBorderTopWidth = Number.parseInt(contentStyles.borderTopWidth, 10);
				const contentPaddingTop = Number.parseInt(contentStyles.paddingTop, 10);
				const contentBorderBottomWidth = Number.parseInt(contentStyles.borderBottomWidth, 10);
				const contentPaddingBottom = Number.parseInt(contentStyles.paddingBottom, 10);
				const fullContentHeight = contentBorderTopWidth + contentPaddingTop + itemsHeight + contentPaddingBottom + contentBorderBottomWidth;
				const minContentHeight = Math.min(selectedItem.value.offsetHeight * 5, fullContentHeight);
				const viewportStyles = window.getComputedStyle(viewport.value);
				const viewportPaddingTop = Number.parseInt(viewportStyles.paddingTop, 10);
				const viewportPaddingBottom = Number.parseInt(viewportStyles.paddingBottom, 10);
				const topEdgeToTriggerMiddle = triggerRect.top + triggerRect.height / 2 - 10;
				const triggerMiddleToBottomEdge = availableHeight - topEdgeToTriggerMiddle;
				const selectedItemHalfHeight = selectedItem.value.offsetHeight / 2;
				const itemOffsetMiddle = selectedItem.value.offsetTop + selectedItemHalfHeight;
				const contentTopToItemMiddle = contentBorderTopWidth + contentPaddingTop + itemOffsetMiddle;
				const itemMiddleToContentBottom = fullContentHeight - contentTopToItemMiddle;
				if (contentTopToItemMiddle <= topEdgeToTriggerMiddle) {
					const isLastItem = selectedItem.value === items[items.length - 1];
					contentWrapperElement.value.style.bottom = `0px`;
					const viewportOffsetBottom = contentElement.value.clientHeight - viewport.value.offsetTop - viewport.value.offsetHeight;
					const height = contentTopToItemMiddle + Math.max(triggerMiddleToBottomEdge, selectedItemHalfHeight + (isLastItem ? viewportPaddingBottom : 0) + viewportOffsetBottom + contentBorderBottomWidth);
					contentWrapperElement.value.style.height = `${height}px`;
				} else {
					const isFirstItem = selectedItem.value === items[0];
					contentWrapperElement.value.style.top = `0px`;
					const height = Math.max(topEdgeToTriggerMiddle, contentBorderTopWidth + viewport.value.offsetTop + (isFirstItem ? viewportPaddingTop : 0) + selectedItemHalfHeight) + itemMiddleToContentBottom;
					contentWrapperElement.value.style.height = `${height}px`;
					viewport.value.scrollTop = contentTopToItemMiddle - topEdgeToTriggerMiddle + viewport.value.offsetTop;
				}
				contentWrapperElement.value.style.margin = `10px 0`;
				contentWrapperElement.value.style.minHeight = `${minContentHeight}px`;
				contentWrapperElement.value.style.maxHeight = `${availableHeight}px`;
				emits("placed");
				requestAnimationFrame(() => shouldExpandOnScrollRef.value = true);
			}
		}
		const contentZIndex = ref("");
		onMounted(async () => {
			await nextTick();
			position();
			if (contentElement.value) contentZIndex.value = window.getComputedStyle(contentElement.value).zIndex;
		});
		function handleScrollButtonChange(node) {
			if (node && shouldRepositionRef.value === true) {
				position();
				focusSelectedItem?.();
				shouldRepositionRef.value = false;
			}
		}
		useResizeObserver(rootContext.triggerElement, () => {
			position();
		});
		provideSelectItemAlignedPositionContext({
			contentWrapper: contentWrapperElement,
			shouldExpandOnScrollRef,
			onScrollButtonChange: handleScrollButtonChange
		});
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", {
				ref_key: "contentWrapperElement",
				ref: contentWrapperElement,
				style: normalizeStyle({
					display: "flex",
					flexDirection: "column",
					position: "fixed",
					zIndex: contentZIndex.value
				})
			}, [createVNode(unref(Primitive), mergeProps({
				ref: unref(forwardRef),
				style: {
					boxSizing: "border-box",
					maxHeight: "100%"
				}
			}, {
				..._ctx.$attrs,
				...props
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16)], 4);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/Select/SelectProvider.js
var SelectProvider_default = /* @__PURE__ */ defineComponent({
	inheritAttrs: false,
	__name: "SelectProvider",
	props: { context: {
		type: Object,
		required: true
	} },
	setup(__props) {
		provideSelectRootContext(__props.context);
		provideSelectContentContext(SelectContentDefaultContextValue);
		return (_ctx, _cache) => {
			return renderSlot(_ctx.$slots, "default");
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/Select/SelectContent.js
var _hoisted_1 = { key: 1 };
var SelectContent_default = /* @__PURE__ */ defineComponent({
	inheritAttrs: false,
	__name: "SelectContent",
	props: {
		forceMount: {
			type: Boolean,
			required: false
		},
		position: {
			type: String,
			required: false
		},
		bodyLock: {
			type: Boolean,
			required: false
		},
		side: {
			type: null,
			required: false
		},
		sideOffset: {
			type: Number,
			required: false
		},
		sideFlip: {
			type: Boolean,
			required: false
		},
		align: {
			type: null,
			required: false
		},
		alignOffset: {
			type: Number,
			required: false
		},
		alignFlip: {
			type: Boolean,
			required: false
		},
		avoidCollisions: {
			type: Boolean,
			required: false
		},
		collisionBoundary: {
			type: null,
			required: false
		},
		collisionPadding: {
			type: [Number, Object],
			required: false
		},
		arrowPadding: {
			type: Number,
			required: false
		},
		sticky: {
			type: String,
			required: false
		},
		hideWhenDetached: {
			type: Boolean,
			required: false
		},
		positionStrategy: {
			type: String,
			required: false
		},
		updatePositionStrategy: {
			type: String,
			required: false
		},
		disableUpdateOnLayoutShift: {
			type: Boolean,
			required: false
		},
		prioritizePosition: {
			type: Boolean,
			required: false
		},
		reference: {
			type: null,
			required: false
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false
		},
		disableOutsidePointerEvents: {
			type: Boolean,
			required: false
		}
	},
	emits: [
		"closeAutoFocus",
		"escapeKeyDown",
		"pointerDownOutside"
	],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const forwarded = useForwardPropsEmits(props, __emit);
		const rootContext = injectSelectRootContext();
		const fragment = ref();
		onMounted(() => {
			fragment.value = new DocumentFragment();
		});
		const presenceRef = ref();
		const present = computed(() => props.forceMount || rootContext.open.value);
		const renderPresence = ref(present.value);
		watch(present, () => {
			setTimeout(() => renderPresence.value = present.value);
		});
		return (_ctx, _cache) => {
			return present.value || renderPresence.value || presenceRef.value?.present ? (openBlock(), createBlock(unref(Presence_default), {
				key: 0,
				ref_key: "presenceRef",
				ref: presenceRef,
				present: present.value
			}, {
				default: withCtx(() => [createVNode(SelectContentImpl_default, normalizeProps(guardReactiveProps({
					...unref(forwarded),
					..._ctx.$attrs
				})), {
					default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
					_: 3
				}, 16)]),
				_: 3
			}, 8, ["present"])) : fragment.value ? (openBlock(), createElementBlock("div", _hoisted_1, [(openBlock(), createBlock(Teleport, { to: fragment.value }, [createVNode(SelectProvider_default, { context: unref(rootContext) }, {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 8, ["context"])], 8, ["to"]))])) : createCommentVNode("v-if", true);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/Select/SelectIcon.js
var SelectIcon_default = /* @__PURE__ */ defineComponent({
	__name: "SelectIcon",
	props: {
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false,
			default: "span"
		}
	},
	setup(__props) {
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), {
				"aria-hidden": "true",
				as: _ctx.as,
				"as-child": _ctx.asChild
			}, {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", {}, () => [_cache[0] || (_cache[0] = createTextVNode("▼"))])]),
				_: 3
			}, 8, ["as", "as-child"]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/Select/SelectItem.js
var [injectSelectItemContext, provideSelectItemContext] = createContext("SelectItem");
var SelectItem_default = /* @__PURE__ */ defineComponent({
	__name: "SelectItem",
	props: {
		value: {
			type: null,
			required: true
		},
		disabled: {
			type: Boolean,
			required: false
		},
		textValue: {
			type: String,
			required: false
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false
		}
	},
	emits: ["select"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const { disabled } = toRefs(props);
		const rootContext = injectSelectRootContext();
		const contentContext = injectSelectContentContext();
		const { forwardRef, currentElement } = useForwardExpose();
		const { CollectionItem } = useCollection();
		const isSelected = computed(() => valueComparator(rootContext.modelValue?.value, props.value, rootContext.by));
		const isFocused = ref(false);
		const textValue = ref(props.textValue ?? "");
		const textId = useId(void 0, "reka-select-item-text");
		const SELECT_SELECT = "select.select";
		async function handleSelectCustomEvent(ev) {
			if (ev.defaultPrevented) return;
			const eventDetail = {
				originalEvent: ev,
				value: props.value
			};
			handleAndDispatchCustomEvent(SELECT_SELECT, handleSelect, eventDetail);
		}
		async function handleSelect(ev) {
			await nextTick();
			emits("select", ev);
			if (ev.defaultPrevented) return;
			if (!disabled.value) {
				rootContext.onValueChange(props.value);
				if (!rootContext.multiple.value) rootContext.onOpenChange(false);
			}
		}
		async function handlePointerMove(event) {
			await nextTick();
			if (event.defaultPrevented) return;
			if (disabled.value) contentContext.onItemLeave?.();
			else event.currentTarget?.focus({ preventScroll: true });
		}
		async function handlePointerLeave(event) {
			await nextTick();
			if (event.defaultPrevented) return;
			if (event.currentTarget === getActiveElement()) contentContext.onItemLeave?.();
		}
		async function handleKeyDown(event) {
			await nextTick();
			if (event.defaultPrevented) return;
			if (contentContext.searchRef?.value !== "" && event.key === " ") return;
			if (SELECTION_KEYS.includes(event.key)) handleSelectCustomEvent(event);
			if (event.key === " ") event.preventDefault();
		}
		if (props.value === "") throw new Error("A <SelectItem /> must have a value prop that is not an empty string. This is because the Select value can be set to an empty string to clear the selection and show the placeholder.");
		onMounted(() => {
			if (!currentElement.value) return;
			contentContext.itemRefCallback(currentElement.value, props.value, props.disabled);
		});
		provideSelectItemContext({
			value: props.value,
			disabled,
			textId,
			isSelected,
			onItemTextChange: (node) => {
				textValue.value = ((textValue.value || node?.textContent) ?? "").trim();
			}
		});
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(CollectionItem), { value: { textValue: textValue.value } }, {
				default: withCtx(() => [createVNode(unref(Primitive), {
					ref: unref(forwardRef),
					role: "option",
					"aria-labelledby": unref(textId),
					"data-highlighted": isFocused.value ? "" : void 0,
					"aria-selected": isSelected.value,
					"data-state": isSelected.value ? "checked" : "unchecked",
					"aria-disabled": unref(disabled) || void 0,
					"data-disabled": unref(disabled) ? "" : void 0,
					tabindex: unref(disabled) ? void 0 : -1,
					as: _ctx.as,
					"as-child": _ctx.asChild,
					onFocus: _cache[0] || (_cache[0] = ($event) => isFocused.value = true),
					onBlur: _cache[1] || (_cache[1] = ($event) => isFocused.value = false),
					onPointerup: handleSelectCustomEvent,
					onPointerdown: _cache[2] || (_cache[2] = (event) => {
						event.currentTarget.focus({ preventScroll: true });
					}),
					onTouchend: _cache[3] || (_cache[3] = withModifiers(() => {}, ["prevent", "stop"])),
					onPointermove: handlePointerMove,
					onPointerleave: handlePointerLeave,
					onKeydown: handleKeyDown
				}, {
					default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
					_: 3
				}, 8, [
					"aria-labelledby",
					"data-highlighted",
					"aria-selected",
					"data-state",
					"aria-disabled",
					"data-disabled",
					"tabindex",
					"as",
					"as-child"
				])]),
				_: 3
			}, 8, ["value"]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/Select/SelectItemIndicator.js
var SelectItemIndicator_default = /* @__PURE__ */ defineComponent({
	__name: "SelectItemIndicator",
	props: {
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false,
			default: "span"
		}
	},
	setup(__props) {
		const props = __props;
		const itemContext = injectSelectItemContext();
		return (_ctx, _cache) => {
			return unref(itemContext).isSelected.value ? (openBlock(), createBlock(unref(Primitive), mergeProps({
				key: 0,
				"aria-hidden": "true"
			}, props), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16)) : createCommentVNode("v-if", true);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/Select/SelectItemText.js
var SelectItemText_default = /* @__PURE__ */ defineComponent({
	inheritAttrs: false,
	__name: "SelectItemText",
	props: {
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false,
			default: "span"
		}
	},
	setup(__props) {
		const props = __props;
		const rootContext = injectSelectRootContext();
		const contentContext = injectSelectContentContext();
		const itemContext = injectSelectItemContext();
		const { forwardRef, currentElement: itemTextElement } = useForwardExpose();
		const optionProps = computed(() => {
			return {
				value: itemContext.value,
				disabled: itemContext.disabled.value,
				textContent: itemTextElement.value?.textContent ?? itemContext.value?.toString() ?? ""
			};
		});
		onMounted(() => {
			if (!itemTextElement.value) return;
			itemContext.onItemTextChange(itemTextElement.value);
			contentContext.itemTextRefCallback(itemTextElement.value, itemContext.value, itemContext.disabled.value);
			rootContext.onOptionAdd(optionProps.value);
		});
		onUnmounted(() => {
			rootContext.onOptionRemove(optionProps.value);
		});
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), mergeProps({
				id: unref(itemContext).textId,
				ref: unref(forwardRef)
			}, {
				...props,
				..._ctx.$attrs
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16, ["id"]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/Select/SelectPortal.js
var SelectPortal_default = /* @__PURE__ */ defineComponent({
	__name: "SelectPortal",
	props: {
		to: {
			type: null,
			required: false
		},
		disabled: {
			type: Boolean,
			required: false
		},
		defer: {
			type: Boolean,
			required: false
		},
		forceMount: {
			type: Boolean,
			required: false
		}
	},
	setup(__props) {
		const props = __props;
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Teleport_default), normalizeProps(guardReactiveProps(props)), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/Select/SelectScrollButtonImpl.js
var SelectScrollButtonImpl_default = /* @__PURE__ */ defineComponent({
	__name: "SelectScrollButtonImpl",
	emits: ["autoScroll"],
	setup(__props, { emit: __emit }) {
		const emits = __emit;
		const { getItems } = useCollection();
		const contentContext = injectSelectContentContext();
		const autoScrollTimerRef = ref(null);
		function clearAutoScrollTimer() {
			if (autoScrollTimerRef.value !== null) {
				window.clearInterval(autoScrollTimerRef.value);
				autoScrollTimerRef.value = null;
			}
		}
		watchEffect(() => {
			getItems().map((i) => i.ref).find((item) => item === getActiveElement())?.scrollIntoView({ block: "nearest" });
		});
		function handlePointerDown() {
			if (autoScrollTimerRef.value === null) autoScrollTimerRef.value = window.setInterval(() => {
				emits("autoScroll");
			}, 50);
		}
		function handlePointerMove() {
			contentContext.onItemLeave?.();
			if (autoScrollTimerRef.value === null) autoScrollTimerRef.value = window.setInterval(() => {
				emits("autoScroll");
			}, 50);
		}
		onBeforeUnmount(() => clearAutoScrollTimer());
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), mergeProps({
				"aria-hidden": "true",
				style: { flexShrink: 0 }
			}, _ctx.$parent?.$props, {
				onPointerdown: handlePointerDown,
				onPointermove: handlePointerMove,
				onPointerleave: _cache[0] || (_cache[0] = () => {
					clearAutoScrollTimer();
				})
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/Select/SelectScrollDownButton.js
var SelectScrollDownButton_default = /* @__PURE__ */ defineComponent({
	__name: "SelectScrollDownButton",
	props: {
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false
		}
	},
	setup(__props) {
		const contentContext = injectSelectContentContext();
		const alignedPositionContext = contentContext.position === "item-aligned" ? injectSelectItemAlignedPositionContext() : void 0;
		const { forwardRef, currentElement } = useForwardExpose();
		const canScrollDown = ref(false);
		watchEffect((cleanupFn) => {
			if (contentContext.viewport?.value && contentContext.isPositioned?.value) {
				const viewport = contentContext.viewport.value;
				function handleScroll() {
					const maxScroll = viewport.scrollHeight - viewport.clientHeight;
					canScrollDown.value = Math.ceil(viewport.scrollTop) < maxScroll;
				}
				handleScroll();
				viewport.addEventListener("scroll", handleScroll);
				cleanupFn(() => viewport.removeEventListener("scroll", handleScroll));
			}
		});
		watch(currentElement, () => {
			if (currentElement.value) alignedPositionContext?.onScrollButtonChange(currentElement.value);
		});
		return (_ctx, _cache) => {
			return canScrollDown.value ? (openBlock(), createBlock(SelectScrollButtonImpl_default, {
				key: 0,
				ref: unref(forwardRef),
				onAutoScroll: _cache[0] || (_cache[0] = () => {
					const { viewport, selectedItem } = unref(contentContext);
					if (viewport?.value && selectedItem?.value) viewport.value.scrollTop = viewport.value.scrollTop + selectedItem.value.offsetHeight;
				})
			}, {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 512)) : createCommentVNode("v-if", true);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/Select/SelectScrollUpButton.js
var SelectScrollUpButton_default = /* @__PURE__ */ defineComponent({
	__name: "SelectScrollUpButton",
	props: {
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false
		}
	},
	setup(__props) {
		const contentContext = injectSelectContentContext();
		const alignedPositionContext = contentContext.position === "item-aligned" ? injectSelectItemAlignedPositionContext() : void 0;
		const { forwardRef, currentElement } = useForwardExpose();
		const canScrollUp = ref(false);
		watchEffect((cleanupFn) => {
			if (contentContext.viewport?.value && contentContext.isPositioned?.value) {
				const viewport = contentContext.viewport.value;
				function handleScroll() {
					canScrollUp.value = viewport.scrollTop > 0;
				}
				handleScroll();
				viewport.addEventListener("scroll", handleScroll);
				cleanupFn(() => viewport.removeEventListener("scroll", handleScroll));
			}
		});
		watch(currentElement, () => {
			if (currentElement.value) alignedPositionContext?.onScrollButtonChange(currentElement.value);
		});
		return (_ctx, _cache) => {
			return canScrollUp.value ? (openBlock(), createBlock(SelectScrollButtonImpl_default, {
				key: 0,
				ref: unref(forwardRef),
				onAutoScroll: _cache[0] || (_cache[0] = () => {
					const { viewport, selectedItem } = unref(contentContext);
					if (viewport?.value && selectedItem?.value) viewport.value.scrollTop = viewport.value.scrollTop - selectedItem.value.offsetHeight;
				})
			}, {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 512)) : createCommentVNode("v-if", true);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/Select/SelectTrigger.js
var SelectTrigger_default = /* @__PURE__ */ defineComponent({
	__name: "SelectTrigger",
	props: {
		disabled: {
			type: Boolean,
			required: false
		},
		reference: {
			type: null,
			required: false
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false,
			default: "button"
		}
	},
	setup(__props) {
		const props = __props;
		const rootContext = injectSelectRootContext();
		const { forwardRef, currentElement: triggerElement } = useForwardExpose();
		const isDisabled = computed(() => rootContext.disabled?.value || props.disabled);
		rootContext.contentId ||= useId(void 0, "reka-select-content");
		onMounted(() => {
			rootContext.onTriggerChange(triggerElement.value);
		});
		const { getItems } = useCollection();
		const { search, handleTypeaheadSearch, resetTypeahead } = useTypeahead();
		function handleOpen() {
			if (!isDisabled.value) {
				rootContext.onOpenChange(true);
				resetTypeahead();
			}
		}
		function handlePointerOpen(event) {
			handleOpen();
			rootContext.triggerPointerDownPosRef.value = {
				x: Math.round(event.pageX),
				y: Math.round(event.pageY)
			};
		}
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(PopperAnchor_default), {
				"as-child": "",
				reference: _ctx.reference
			}, {
				default: withCtx(() => [createVNode(unref(Primitive), {
					ref: unref(forwardRef),
					role: "combobox",
					type: _ctx.as === "button" ? "button" : void 0,
					"aria-controls": unref(rootContext).contentId,
					"aria-expanded": unref(rootContext).open.value || false,
					"aria-required": unref(rootContext).required?.value,
					"aria-autocomplete": "none",
					disabled: isDisabled.value,
					dir: unref(rootContext)?.dir.value,
					"data-state": unref(rootContext)?.open.value ? "open" : "closed",
					"data-disabled": isDisabled.value ? "" : void 0,
					"data-placeholder": unref(shouldShowPlaceholder)(unref(rootContext).modelValue?.value) ? "" : void 0,
					"as-child": _ctx.asChild,
					as: _ctx.as,
					onClick: _cache[0] || (_cache[0] = (event) => {
						(event?.currentTarget)?.focus();
					}),
					onPointerdown: _cache[1] || (_cache[1] = (event) => {
						if (event.pointerType === "touch") return event.preventDefault();
						const target = event.target;
						if (target.hasPointerCapture(event.pointerId)) target.releasePointerCapture(event.pointerId);
						if (event.button === 0 && event.ctrlKey === false) {
							handlePointerOpen(event);
							event.preventDefault();
						}
					}),
					onPointerup: _cache[2] || (_cache[2] = withModifiers((event) => {
						if (event.pointerType === "touch") handlePointerOpen(event);
					}, ["prevent"])),
					onKeydown: _cache[3] || (_cache[3] = (event) => {
						const isTypingAhead = unref(search) !== "";
						if (!(event.ctrlKey || event.altKey || event.metaKey) && event.key.length === 1) {
							if (isTypingAhead && event.key === " ") return;
						}
						unref(handleTypeaheadSearch)(event.key, unref(getItems)());
						if (unref(OPEN_KEYS).includes(event.key)) {
							handleOpen();
							event.preventDefault();
						}
					})
				}, {
					default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
					_: 3
				}, 8, [
					"type",
					"aria-controls",
					"aria-expanded",
					"aria-required",
					"disabled",
					"dir",
					"data-state",
					"data-disabled",
					"data-placeholder",
					"as-child",
					"as"
				])]),
				_: 3
			}, 8, ["reference"]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/Select/SelectValue.js
var SelectValue_default = /* @__PURE__ */ defineComponent({
	__name: "SelectValue",
	props: {
		placeholder: {
			type: String,
			required: false,
			default: ""
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false,
			default: "span"
		}
	},
	setup(__props) {
		const props = __props;
		const { forwardRef, currentElement } = useForwardExpose();
		const rootContext = injectSelectRootContext();
		onMounted(() => {
			rootContext.valueElement = currentElement;
		});
		const selectedLabel = computed(() => {
			let list = [];
			const options = Array.from(rootContext.optionsSet.value);
			const getOption = (value) => options.find((option) => valueComparator(value, option.value, rootContext.by));
			if (Array.isArray(rootContext.modelValue.value)) list = rootContext.modelValue.value.map((value) => getOption(value)?.textContent ?? "");
			else list = [getOption(rootContext.modelValue.value)?.textContent ?? ""];
			return list.filter(Boolean);
		});
		const slotText = computed(() => {
			return selectedLabel.value.length ? selectedLabel.value.join(", ") : props.placeholder;
		});
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), {
				ref: unref(forwardRef),
				as: _ctx.as,
				"as-child": _ctx.asChild,
				style: { pointerEvents: "none" },
				"data-placeholder": selectedLabel.value.length ? void 0 : props.placeholder
			}, {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", {
					selectedLabel: selectedLabel.value,
					modelValue: unref(rootContext).modelValue.value
				}, () => [createTextVNode(toDisplayString(slotText.value), 1)])]),
				_: 3
			}, 8, [
				"as",
				"as-child",
				"data-placeholder"
			]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/Select/SelectViewport.js
var SelectViewport_default = /* @__PURE__ */ defineComponent({
	__name: "SelectViewport",
	props: {
		nonce: {
			type: String,
			required: false
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false
		}
	},
	setup(__props) {
		const props = __props;
		const { nonce: propNonce } = toRefs(props);
		const nonce = useNonce(propNonce);
		const contentContext = injectSelectContentContext();
		const alignedPositionContext = contentContext.position === "item-aligned" ? injectSelectItemAlignedPositionContext() : void 0;
		const { forwardRef, currentElement } = useForwardExpose();
		onMounted(() => {
			contentContext?.onViewportChange(currentElement.value);
		});
		const prevScrollTopRef = ref(0);
		function handleScroll(event) {
			const viewport = event.currentTarget;
			const { shouldExpandOnScrollRef, contentWrapper } = alignedPositionContext ?? {};
			if (shouldExpandOnScrollRef?.value && contentWrapper?.value) {
				const scrolledBy = Math.abs(prevScrollTopRef.value - viewport.scrollTop);
				if (scrolledBy > 0) {
					const availableHeight = window.innerHeight - 20;
					const cssMinHeight = Number.parseFloat(contentWrapper.value.style.minHeight);
					const cssHeight = Number.parseFloat(contentWrapper.value.style.height);
					const prevHeight = Math.max(cssMinHeight, cssHeight);
					if (prevHeight < availableHeight) {
						const nextHeight = prevHeight + scrolledBy;
						const clampedNextHeight = Math.min(availableHeight, nextHeight);
						const heightDiff = nextHeight - clampedNextHeight;
						contentWrapper.value.style.height = `${clampedNextHeight}px`;
						if (contentWrapper.value.style.bottom === "0px") {
							viewport.scrollTop = heightDiff > 0 ? heightDiff : 0;
							contentWrapper.value.style.justifyContent = "flex-end";
						}
					}
				}
			}
			prevScrollTopRef.value = viewport.scrollTop;
		}
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock(Fragment, null, [createVNode(unref(Primitive), mergeProps({
				ref: unref(forwardRef),
				"data-reka-select-viewport": "",
				role: "presentation"
			}, {
				..._ctx.$attrs,
				...props
			}, {
				style: {
					position: "relative",
					flex: 1,
					overflow: "hidden auto"
				},
				onScroll: handleScroll
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16), createVNode(unref(Primitive), {
				as: "style",
				nonce: unref(nonce)
			}, {
				default: withCtx(() => _cache[0] || (_cache[0] = [createTextVNode(" /* Hide scrollbars cross-browser and enable momentum scroll for touch devices */ [data-reka-select-viewport] { scrollbar-width:none; -ms-overflow-style: none; -webkit-overflow-scrolling: touch; } [data-reka-select-viewport]::-webkit-scrollbar { display: none; } ")])),
				_: 1,
				__: [0]
			}, 8, ["nonce"])], 64);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/Slider/utils.js
function getNextSortedValues(prevValues = [], nextValue, atIndex) {
	const nextValues = [...prevValues];
	nextValues[atIndex] = nextValue;
	return nextValues.sort((a, b) => a - b);
}
function convertValueToPercentage(value, min, max) {
	return clamp$1(100 / (max - min) * (value - min), 0, 100);
}
/**
* Returns a label for each thumb when there are two or more thumbs
*/
function getLabel(index, totalValues) {
	if (totalValues > 2) return `Value ${index + 1} of ${totalValues}`;
	else if (totalValues === 2) return ["Minimum", "Maximum"][index];
	else return void 0;
}
/**
* Given a `values` array and a `nextValue`, determine which value in
* the array is closest to `nextValue` and return its index.
*
* @example
* // returns 1
* getClosestValueIndex([10, 30], 25);
*/
function getClosestValueIndex(values, nextValue) {
	if (values.length === 1) return 0;
	const distances = values.map((value) => Math.abs(value - nextValue));
	const closestDistance = Math.min(...distances);
	return distances.indexOf(closestDistance);
}
/**
* Offsets the thumb centre point while sliding to ensure it remains
* within the bounds of the slider when reaching the edges
*/
function getThumbInBoundsOffset(width, left, direction) {
	const halfWidth = width / 2;
	return (halfWidth - linearScale([0, 50], [0, halfWidth])(left) * direction) * direction;
}
/**
* Gets an array of steps between each value.
*
* @example
* // returns [1, 9]
* getStepsBetweenValues([10, 11, 20]);
*/
function getStepsBetweenValues(values) {
	return values.slice(0, -1).map((value, index) => values[index + 1] - value);
}
/**
* Verifies the minimum steps between all values is greater than or equal
* to the expected minimum steps.
*
* @example
* // returns false
* hasMinStepsBetweenValues([1,2,3], 2);
*
* @example
* // returns true
* hasMinStepsBetweenValues([1,2,3], 1);
*/
function hasMinStepsBetweenValues(values, minStepsBetweenValues) {
	if (minStepsBetweenValues > 0) {
		const stepsBetweenValues = getStepsBetweenValues(values);
		return Math.min(...stepsBetweenValues) >= minStepsBetweenValues;
	}
	return true;
}
function linearScale(input, output) {
	return (value) => {
		if (input[0] === input[1] || output[0] === output[1]) return output[0];
		const ratio = (output[1] - output[0]) / (input[1] - input[0]);
		return output[0] + ratio * (value - input[0]);
	};
}
function getDecimalCount(value) {
	return (String(value).split(".")[1] || "").length;
}
function roundValue(value, decimalCount) {
	const rounder = 10 ** decimalCount;
	return Math.round(value * rounder) / rounder;
}
var PAGE_KEYS = ["PageUp", "PageDown"];
var ARROW_KEYS = [
	"ArrowUp",
	"ArrowDown",
	"ArrowLeft",
	"ArrowRight"
];
var BACK_KEYS = {
	"from-left": [
		"Home",
		"PageDown",
		"ArrowDown",
		"ArrowLeft"
	],
	"from-right": [
		"Home",
		"PageDown",
		"ArrowDown",
		"ArrowRight"
	],
	"from-bottom": [
		"Home",
		"PageDown",
		"ArrowDown",
		"ArrowLeft"
	],
	"from-top": [
		"Home",
		"PageUp",
		"ArrowUp",
		"ArrowLeft"
	]
};
var [injectSliderOrientationContext, provideSliderOrientationContext] = createContext(["SliderVertical", "SliderHorizontal"]);
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/Slider/SliderHorizontal.js
var SliderHorizontal_default = /* @__PURE__ */ defineComponent({
	__name: "SliderHorizontal",
	props: {
		dir: {
			type: String,
			required: false
		},
		min: {
			type: Number,
			required: true
		},
		max: {
			type: Number,
			required: true
		},
		inverted: {
			type: Boolean,
			required: true
		}
	},
	emits: [
		"slideEnd",
		"slideStart",
		"slideMove",
		"homeKeyDown",
		"endKeyDown",
		"stepKeyDown"
	],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const { max, min, dir, inverted } = toRefs(props);
		const { forwardRef, currentElement: sliderElement } = useForwardExpose();
		const rootContext = injectSliderRootContext();
		const offsetPosition = ref();
		const rectRef = ref();
		const isSlidingFromLeft = computed(() => dir?.value !== "rtl" && !inverted.value || dir?.value !== "ltr" && inverted.value);
		function getValueFromPointerEvent(event, slideStart) {
			const rect = rectRef.value || sliderElement.value.getBoundingClientRect();
			const thumb = [...rootContext.thumbElements.value][rootContext.valueIndexToChangeRef.value];
			const thumbWidth = rootContext.thumbAlignment.value === "contain" ? thumb.clientWidth : 0;
			if (!offsetPosition.value && !slideStart && rootContext.thumbAlignment.value === "contain") offsetPosition.value = event.clientX - thumb.getBoundingClientRect().left;
			const value = linearScale([0, rect.width - thumbWidth], isSlidingFromLeft.value ? [min.value, max.value] : [max.value, min.value]);
			rectRef.value = rect;
			return value(slideStart ? event.clientX - rect.left - thumbWidth / 2 : event.clientX - rect.left - (offsetPosition.value ?? 0));
		}
		provideSliderOrientationContext({
			startEdge: computed(() => isSlidingFromLeft.value ? "left" : "right"),
			endEdge: computed(() => isSlidingFromLeft.value ? "right" : "left"),
			direction: computed(() => isSlidingFromLeft.value ? 1 : -1),
			size: "width"
		});
		return (_ctx, _cache) => {
			return openBlock(), createBlock(SliderImpl_default, {
				ref: unref(forwardRef),
				dir: unref(dir),
				"data-orientation": "horizontal",
				style: normalizeStyle({ ["--reka-slider-thumb-transform"]: !isSlidingFromLeft.value && unref(rootContext).thumbAlignment.value === "overflow" ? "translateX(50%)" : "translateX(-50%)" }),
				onSlideStart: _cache[0] || (_cache[0] = (event) => {
					const value = getValueFromPointerEvent(event, true);
					emits("slideStart", value);
				}),
				onSlideMove: _cache[1] || (_cache[1] = (event) => {
					const value = getValueFromPointerEvent(event);
					emits("slideMove", value);
				}),
				onSlideEnd: _cache[2] || (_cache[2] = () => {
					rectRef.value = void 0;
					offsetPosition.value = void 0;
					emits("slideEnd");
				}),
				onStepKeyDown: _cache[3] || (_cache[3] = (event) => {
					const slideDirection = isSlidingFromLeft.value ? "from-left" : "from-right";
					const isBackKey = unref(BACK_KEYS)[slideDirection].includes(event.key);
					emits("stepKeyDown", event, isBackKey ? -1 : 1);
				}),
				onEndKeyDown: _cache[4] || (_cache[4] = ($event) => emits("endKeyDown", $event)),
				onHomeKeyDown: _cache[5] || (_cache[5] = ($event) => emits("homeKeyDown", $event))
			}, {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 8, ["dir", "style"]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/Slider/SliderVertical.js
var SliderVertical_default = /* @__PURE__ */ defineComponent({
	__name: "SliderVertical",
	props: {
		min: {
			type: Number,
			required: true
		},
		max: {
			type: Number,
			required: true
		},
		inverted: {
			type: Boolean,
			required: true
		}
	},
	emits: [
		"slideEnd",
		"slideStart",
		"slideMove",
		"homeKeyDown",
		"endKeyDown",
		"stepKeyDown"
	],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const { max, min, inverted } = toRefs(props);
		const rootContext = injectSliderRootContext();
		const { forwardRef, currentElement: sliderElement } = useForwardExpose();
		const offsetPosition = ref();
		const rectRef = ref();
		const isSlidingFromBottom = computed(() => !inverted.value);
		function getValueFromPointerEvent(event, slideStart) {
			const rect = rectRef.value || sliderElement.value.getBoundingClientRect();
			const thumb = [...rootContext.thumbElements.value][rootContext.valueIndexToChangeRef.value];
			const thumbHeight = rootContext.thumbAlignment.value === "contain" ? thumb.clientHeight : 0;
			if (!offsetPosition.value && !slideStart && rootContext.thumbAlignment.value === "contain") offsetPosition.value = event.clientY - thumb.getBoundingClientRect().top;
			const value = linearScale([0, rect.height - thumbHeight], isSlidingFromBottom.value ? [max.value, min.value] : [min.value, max.value]);
			const position = slideStart ? event.clientY - rect.top - thumbHeight / 2 : event.clientY - rect.top - (offsetPosition.value ?? 0);
			rectRef.value = rect;
			return value(position);
		}
		provideSliderOrientationContext({
			startEdge: computed(() => isSlidingFromBottom.value ? "bottom" : "top"),
			endEdge: computed(() => isSlidingFromBottom.value ? "top" : "bottom"),
			direction: computed(() => isSlidingFromBottom.value ? 1 : -1),
			size: "height"
		});
		return (_ctx, _cache) => {
			return openBlock(), createBlock(SliderImpl_default, {
				ref: unref(forwardRef),
				"data-orientation": "vertical",
				style: normalizeStyle({ ["--reka-slider-thumb-transform"]: !isSlidingFromBottom.value && unref(rootContext).thumbAlignment.value === "overflow" ? "translateY(-50%)" : "translateY(50%)" }),
				onSlideStart: _cache[0] || (_cache[0] = (event) => {
					const value = getValueFromPointerEvent(event, true);
					emits("slideStart", value);
				}),
				onSlideMove: _cache[1] || (_cache[1] = (event) => {
					const value = getValueFromPointerEvent(event);
					emits("slideMove", value);
				}),
				onSlideEnd: _cache[2] || (_cache[2] = () => {
					rectRef.value = void 0;
					offsetPosition.value = void 0;
					emits("slideEnd");
				}),
				onStepKeyDown: _cache[3] || (_cache[3] = (event) => {
					const slideDirection = isSlidingFromBottom.value ? "from-bottom" : "from-top";
					const isBackKey = unref(BACK_KEYS)[slideDirection].includes(event.key);
					emits("stepKeyDown", event, isBackKey ? -1 : 1);
				}),
				onEndKeyDown: _cache[4] || (_cache[4] = ($event) => emits("endKeyDown", $event)),
				onHomeKeyDown: _cache[5] || (_cache[5] = ($event) => emits("homeKeyDown", $event))
			}, {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 8, ["style"]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/Slider/SliderRoot.js
var [injectSliderRootContext, provideSliderRootContext] = createContext("SliderRoot");
var SliderRoot_default = /* @__PURE__ */ defineComponent({
	inheritAttrs: false,
	__name: "SliderRoot",
	props: {
		defaultValue: {
			type: Array,
			required: false,
			default: () => [0]
		},
		modelValue: {
			type: [Array, null],
			required: false
		},
		disabled: {
			type: Boolean,
			required: false,
			default: false
		},
		orientation: {
			type: String,
			required: false,
			default: "horizontal"
		},
		dir: {
			type: String,
			required: false
		},
		inverted: {
			type: Boolean,
			required: false,
			default: false
		},
		min: {
			type: Number,
			required: false,
			default: 0
		},
		max: {
			type: Number,
			required: false,
			default: 100
		},
		step: {
			type: Number,
			required: false,
			default: 1
		},
		minStepsBetweenThumbs: {
			type: Number,
			required: false,
			default: 0
		},
		thumbAlignment: {
			type: String,
			required: false,
			default: "contain"
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false,
			default: "span"
		},
		name: {
			type: String,
			required: false
		},
		required: {
			type: Boolean,
			required: false
		}
	},
	emits: ["update:modelValue", "valueCommit"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const { min, max, step, minStepsBetweenThumbs, orientation, disabled, thumbAlignment, dir: propDir } = toRefs(props);
		const dir = useDirection(propDir);
		const { forwardRef, currentElement } = useForwardExpose();
		const isFormControl = useFormControl(currentElement);
		const { CollectionSlot } = useCollection({ isProvider: true });
		const modelValue = useVModel(props, "modelValue", emits, {
			defaultValue: props.defaultValue,
			passive: props.modelValue === void 0
		});
		const currentModelValue = computed(() => Array.isArray(modelValue.value) ? [...modelValue.value] : []);
		const valueIndexToChangeRef = ref(0);
		const valuesBeforeSlideStartRef = ref(currentModelValue.value);
		function handleSlideStart(value) {
			updateValues(value, getClosestValueIndex(currentModelValue.value, value));
		}
		function handleSlideMove(value) {
			updateValues(value, valueIndexToChangeRef.value);
		}
		function handleSlideEnd() {
			const prevValue = valuesBeforeSlideStartRef.value[valueIndexToChangeRef.value];
			if (currentModelValue.value[valueIndexToChangeRef.value] !== prevValue) emits("valueCommit", toRaw(currentModelValue.value));
		}
		function updateValues(value, atIndex, { commit } = { commit: false }) {
			const decimalCount = getDecimalCount(step.value);
			const nextValue = clamp$1(roundValue(Math.round((value - min.value) / step.value) * step.value + min.value, decimalCount), min.value, max.value);
			const nextValues = getNextSortedValues(currentModelValue.value, nextValue, atIndex);
			if (hasMinStepsBetweenValues(nextValues, minStepsBetweenThumbs.value * step.value)) {
				valueIndexToChangeRef.value = nextValues.indexOf(nextValue);
				const hasChanged = String(nextValues) !== String(modelValue.value);
				if (hasChanged && commit) emits("valueCommit", nextValues);
				if (hasChanged) {
					thumbElements.value[valueIndexToChangeRef.value]?.focus();
					modelValue.value = nextValues;
				}
			}
		}
		const thumbElements = ref([]);
		provideSliderRootContext({
			modelValue,
			currentModelValue,
			valueIndexToChangeRef,
			thumbElements,
			orientation,
			min,
			max,
			disabled,
			thumbAlignment
		});
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(CollectionSlot), null, {
				default: withCtx(() => [(openBlock(), createBlock(resolveDynamicComponent(unref(orientation) === "horizontal" ? SliderHorizontal_default : SliderVertical_default), mergeProps(_ctx.$attrs, {
					ref: unref(forwardRef),
					"as-child": _ctx.asChild,
					as: _ctx.as,
					min: unref(min),
					max: unref(max),
					dir: unref(dir),
					inverted: _ctx.inverted,
					"aria-disabled": unref(disabled),
					"data-disabled": unref(disabled) ? "" : void 0,
					onPointerdown: _cache[0] || (_cache[0] = () => {
						if (!unref(disabled)) valuesBeforeSlideStartRef.value = currentModelValue.value;
					}),
					onSlideStart: _cache[1] || (_cache[1] = ($event) => !unref(disabled) && handleSlideStart($event)),
					onSlideMove: _cache[2] || (_cache[2] = ($event) => !unref(disabled) && handleSlideMove($event)),
					onSlideEnd: _cache[3] || (_cache[3] = ($event) => !unref(disabled) && handleSlideEnd()),
					onHomeKeyDown: _cache[4] || (_cache[4] = ($event) => !unref(disabled) && updateValues(unref(min), 0, { commit: true })),
					onEndKeyDown: _cache[5] || (_cache[5] = ($event) => !unref(disabled) && updateValues(unref(max), currentModelValue.value.length - 1, { commit: true })),
					onStepKeyDown: _cache[6] || (_cache[6] = (event, direction) => {
						if (!unref(disabled)) {
							const multiplier = unref(PAGE_KEYS).includes(event.key) || event.shiftKey && unref(ARROW_KEYS).includes(event.key) ? 10 : 1;
							const atIndex = valueIndexToChangeRef.value;
							const value = currentModelValue.value[atIndex];
							updateValues(value + unref(step) * multiplier * direction, atIndex, { commit: true });
						}
					})
				}), {
					default: withCtx(() => [renderSlot(_ctx.$slots, "default", { modelValue: unref(modelValue) }), unref(isFormControl) && _ctx.name ? (openBlock(), createBlock(unref(VisuallyHiddenInput_default), {
						key: 0,
						type: "number",
						value: unref(modelValue),
						name: _ctx.name,
						required: _ctx.required,
						disabled: unref(disabled),
						step: unref(step)
					}, null, 8, [
						"value",
						"name",
						"required",
						"disabled",
						"step"
					])) : createCommentVNode("v-if", true)]),
					_: 3
				}, 16, [
					"as-child",
					"as",
					"min",
					"max",
					"dir",
					"inverted",
					"aria-disabled",
					"data-disabled"
				]))]),
				_: 3
			});
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/Slider/SliderImpl.js
var SliderImpl_default = /* @__PURE__ */ defineComponent({
	__name: "SliderImpl",
	props: {
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false,
			default: "span"
		}
	},
	emits: [
		"slideStart",
		"slideMove",
		"slideEnd",
		"homeKeyDown",
		"endKeyDown",
		"stepKeyDown"
	],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const rootContext = injectSliderRootContext();
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), mergeProps({ "data-slider-impl": "" }, props, {
				onKeydown: _cache[0] || (_cache[0] = (event) => {
					if (event.key === "Home") {
						emits("homeKeyDown", event);
						event.preventDefault();
					} else if (event.key === "End") {
						emits("endKeyDown", event);
						event.preventDefault();
					} else if (unref(PAGE_KEYS).concat(unref(ARROW_KEYS)).includes(event.key)) {
						emits("stepKeyDown", event);
						event.preventDefault();
					}
				}),
				onPointerdown: _cache[1] || (_cache[1] = (event) => {
					const target = event.target;
					target.setPointerCapture(event.pointerId);
					event.preventDefault();
					if (unref(rootContext).thumbElements.value.includes(target)) target.focus();
					else emits("slideStart", event);
				}),
				onPointermove: _cache[2] || (_cache[2] = (event) => {
					if (event.target.hasPointerCapture(event.pointerId)) emits("slideMove", event);
				}),
				onPointerup: _cache[3] || (_cache[3] = (event) => {
					const target = event.target;
					if (target.hasPointerCapture(event.pointerId)) {
						target.releasePointerCapture(event.pointerId);
						emits("slideEnd", event);
					}
				})
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/Slider/SliderRange.js
var SliderRange_default = /* @__PURE__ */ defineComponent({
	__name: "SliderRange",
	props: {
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false,
			default: "span"
		}
	},
	setup(__props) {
		const rootContext = injectSliderRootContext();
		const orientation = injectSliderOrientationContext();
		useForwardExpose();
		const percentages = computed(() => rootContext.currentModelValue.value.map((value) => convertValueToPercentage(value, rootContext.min.value, rootContext.max.value)));
		const offsetStart = computed(() => rootContext.currentModelValue.value.length > 1 ? Math.min(...percentages.value) : 0);
		const offsetEnd = computed(() => 100 - Math.max(...percentages.value, 0));
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), {
				"data-disabled": unref(rootContext).disabled.value ? "" : void 0,
				"data-orientation": unref(rootContext).orientation.value,
				"as-child": _ctx.asChild,
				as: _ctx.as,
				style: normalizeStyle({
					[unref(orientation).startEdge.value]: `${offsetStart.value}%`,
					[unref(orientation).endEdge.value]: `${offsetEnd.value}%`
				})
			}, {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 8, [
				"data-disabled",
				"data-orientation",
				"as-child",
				"as",
				"style"
			]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/Slider/SliderThumbImpl.js
var SliderThumbImpl_default = /* @__PURE__ */ defineComponent({
	inheritAttrs: false,
	__name: "SliderThumbImpl",
	props: {
		index: {
			type: Number,
			required: true
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false
		}
	},
	setup(__props) {
		const props = __props;
		const rootContext = injectSliderRootContext();
		const orientation = injectSliderOrientationContext();
		const { forwardRef, currentElement: thumbElement } = useForwardExpose();
		const { CollectionItem } = useCollection();
		const value = computed(() => rootContext.modelValue?.value?.[props.index]);
		const percent = computed(() => value.value === void 0 ? 0 : convertValueToPercentage(value.value, rootContext.min.value ?? 0, rootContext.max.value ?? 100));
		const label = computed(() => getLabel(props.index, rootContext.modelValue?.value?.length ?? 0));
		const size = useSize(thumbElement);
		const orientationSize = computed(() => size[orientation.size].value);
		const thumbInBoundsOffset = computed(() => {
			if (rootContext.thumbAlignment.value === "overflow" || !orientationSize.value) return 0;
			else return getThumbInBoundsOffset(orientationSize.value, percent.value, orientation.direction.value);
		});
		const isMounted = useMounted();
		onMounted(() => {
			rootContext.thumbElements.value.push(thumbElement.value);
		});
		onUnmounted(() => {
			const i = rootContext.thumbElements.value.findIndex((i$1) => i$1 === thumbElement.value) ?? -1;
			rootContext.thumbElements.value.splice(i, 1);
		});
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(CollectionItem), null, {
				default: withCtx(() => [createVNode(unref(Primitive), mergeProps(_ctx.$attrs, {
					ref: unref(forwardRef),
					role: "slider",
					tabindex: unref(rootContext).disabled.value ? void 0 : 0,
					"aria-label": _ctx.$attrs["aria-label"] || label.value,
					"data-disabled": unref(rootContext).disabled.value ? "" : void 0,
					"data-orientation": unref(rootContext).orientation.value,
					"aria-valuenow": value.value,
					"aria-valuemin": unref(rootContext).min.value,
					"aria-valuemax": unref(rootContext).max.value,
					"aria-orientation": unref(rootContext).orientation.value,
					"as-child": _ctx.asChild,
					as: _ctx.as,
					style: {
						transform: "var(--reka-slider-thumb-transform)",
						position: "absolute",
						[unref(orientation).startEdge.value]: `calc(${percent.value}% + ${thumbInBoundsOffset.value}px)`,
						display: !unref(isMounted) && value.value === void 0 ? "none" : void 0
					},
					onFocus: _cache[0] || (_cache[0] = () => {
						unref(rootContext).valueIndexToChangeRef.value = _ctx.index;
					})
				}), {
					default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
					_: 3
				}, 16, [
					"tabindex",
					"aria-label",
					"data-disabled",
					"data-orientation",
					"aria-valuenow",
					"aria-valuemin",
					"aria-valuemax",
					"aria-orientation",
					"as-child",
					"as",
					"style"
				])]),
				_: 3
			});
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/Slider/SliderThumb.js
var SliderThumb_default = /* @__PURE__ */ defineComponent({
	__name: "SliderThumb",
	props: {
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false,
			default: "span"
		}
	},
	setup(__props) {
		const props = __props;
		const { getItems } = useCollection();
		const { forwardRef, currentElement: thumbElement } = useForwardExpose();
		const index = computed(() => thumbElement.value ? getItems(true).findIndex((i) => i.ref === thumbElement.value) : -1);
		return (_ctx, _cache) => {
			return openBlock(), createBlock(SliderThumbImpl_default, mergeProps({ ref: unref(forwardRef) }, props, { index: index.value }), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16, ["index"]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/Slider/SliderTrack.js
var SliderTrack_default = /* @__PURE__ */ defineComponent({
	__name: "SliderTrack",
	props: {
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false,
			default: "span"
		}
	},
	setup(__props) {
		const rootContext = injectSliderRootContext();
		useForwardExpose();
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), {
				"as-child": _ctx.asChild,
				as: _ctx.as,
				"data-disabled": unref(rootContext).disabled.value ? "" : void 0,
				"data-orientation": unref(rootContext).orientation.value
			}, {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 8, [
				"as-child",
				"as",
				"data-disabled",
				"data-orientation"
			]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/utils/assert.js
function assert(expectedCondition, message = "Assertion failed!") {
	if (!expectedCondition) {
		console.error(message);
		throw new Error(message);
	}
}
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/utils/dom.js
function getPanelGroupElement(id, rootElement = document) {
	if (!isBrowser) return null;
	if (rootElement instanceof HTMLElement && rootElement?.dataset?.panelGroupId === id) return rootElement;
	const element = rootElement.querySelector(`[data-panel-group][data-panel-group-id="${id}"]`);
	if (element) return element;
	return null;
}
function getResizeHandleElement(id, scope = document) {
	if (!isBrowser) return null;
	const element = scope.querySelector(`[data-panel-resize-handle-id="${id}"]`);
	if (element) return element;
	return null;
}
function getResizeHandleElementIndex(groupId, id, scope = document) {
	if (!isBrowser) return null;
	return getResizeHandleElementsForGroup(groupId, scope).findIndex((handle) => handle.getAttribute("data-panel-resize-handle-id") === id) ?? null;
}
function getResizeHandleElementsForGroup(groupId, scope = document) {
	if (!isBrowser) return [];
	return Array.from(scope.querySelectorAll(`[data-panel-resize-handle-id][data-panel-group-id="${groupId}"]`));
}
function getResizeHandlePanelIds(groupId, handleId, panelsArray, scope = document) {
	const handle = getResizeHandleElement(handleId, scope);
	const handles = getResizeHandleElementsForGroup(groupId, scope);
	const index = handle ? handles.indexOf(handle) : -1;
	return [panelsArray[index]?.id ?? null, panelsArray[index + 1]?.id ?? null];
}
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/utils/events.js
function isKeyDown(event) {
	return event.type === "keydown";
}
function isMouseEvent(event) {
	return event.type.startsWith("mouse");
}
function isTouchEvent(event) {
	return event.type.startsWith("touch");
}
function getResizeEventCoordinates(event) {
	if (isMouseEvent(event)) return {
		x: event.clientX,
		y: event.clientY
	};
	else if (isTouchEvent(event)) {
		const touch = event.touches[0];
		if (touch && touch.clientX && touch.clientY) return {
			x: touch.clientX,
			y: touch.clientY
		};
	}
	return {
		x: Number.POSITIVE_INFINITY,
		y: Number.POSITIVE_INFINITY
	};
}
function getResizeEventCursorPosition(direction, event) {
	const isHorizontal = direction === "horizontal";
	const { x, y } = getResizeEventCoordinates(event);
	return isHorizontal ? x : y;
}
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/utils/calculate.js
function calculateDragOffsetPercentage(event, dragHandleId, direction, initialDragState, panelGroupElement) {
	const isHorizontal = direction === "horizontal";
	const handleElement = getResizeHandleElement(dragHandleId, panelGroupElement);
	assert(handleElement);
	const groupId = handleElement.getAttribute("data-panel-group-id");
	assert(groupId);
	const { initialCursorPosition } = initialDragState;
	const cursorPosition = getResizeEventCursorPosition(direction, event);
	const groupElement = getPanelGroupElement(groupId, panelGroupElement);
	assert(groupElement);
	const groupRect = groupElement.getBoundingClientRect();
	const groupSizeInPixels = isHorizontal ? groupRect.width : groupRect.height;
	return (cursorPosition - initialCursorPosition) / groupSizeInPixels * 100;
}
function calculateDeltaPercentage(event, dragHandleId, direction, initialDragState, keyboardResizeBy, panelGroupElement) {
	if (isKeyDown(event)) {
		const isHorizontal = direction === "horizontal";
		let delta = 0;
		if (event.shiftKey) delta = 100;
		else delta = keyboardResizeBy ?? 10;
		let movement = 0;
		switch (event.key) {
			case "ArrowDown":
				movement = isHorizontal ? 0 : delta;
				break;
			case "ArrowLeft":
				movement = isHorizontal ? -delta : 0;
				break;
			case "ArrowRight":
				movement = isHorizontal ? delta : 0;
				break;
			case "ArrowUp":
				movement = isHorizontal ? 0 : -delta;
				break;
			case "End":
				movement = 100;
				break;
			case "Home": movement = -100;
		}
		return movement;
	} else {
		if (initialDragState == null) return 0;
		return calculateDragOffsetPercentage(event, dragHandleId, direction, initialDragState, panelGroupElement);
	}
}
function calculateAriaValues({ layout, panelsArray, pivotIndices }) {
	let currentMinSize = 0;
	let currentMaxSize = 100;
	let totalMinSize = 0;
	let totalMaxSize = 0;
	const firstIndex = pivotIndices[0];
	assert(firstIndex != null);
	panelsArray.forEach((panelData, index) => {
		const { constraints } = panelData;
		const { maxSize = 100, minSize = 0 } = constraints;
		if (index === firstIndex) {
			currentMinSize = minSize;
			currentMaxSize = maxSize;
		} else {
			totalMinSize += minSize;
			totalMaxSize += maxSize;
		}
	});
	return {
		valueMax: Math.min(currentMaxSize, 100 - totalMinSize),
		valueMin: Math.max(currentMinSize, 100 - totalMaxSize),
		valueNow: layout[firstIndex]
	};
}
function calculateUnsafeDefaultLayout({ panelDataArray }) {
	const layout = Array.from({ length: panelDataArray.length });
	const panelConstraintsArray = panelDataArray.map((panelData) => panelData.constraints);
	let numPanelsWithSizes = 0;
	let remainingSize = 100;
	for (let index = 0; index < panelDataArray.length; index++) {
		const panelConstraints = panelConstraintsArray[index];
		assert(panelConstraints);
		const { defaultSize } = panelConstraints;
		if (defaultSize != null) {
			numPanelsWithSizes++;
			layout[index] = defaultSize;
			remainingSize -= defaultSize;
		}
	}
	for (let index = 0; index < panelDataArray.length; index++) {
		const panelConstraints = panelConstraintsArray[index];
		assert(panelConstraints);
		const { defaultSize } = panelConstraints;
		if (defaultSize != null) continue;
		const numRemainingPanels = panelDataArray.length - numPanelsWithSizes;
		const size = remainingSize / numRemainingPanels;
		numPanelsWithSizes++;
		layout[index] = size;
		remainingSize -= size;
	}
	return layout;
}
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/utils/callPanelCallbacks.js
function callPanelCallbacks(panelsArray, layout, panelIdToLastNotifiedSizeMap) {
	layout.forEach((size, index) => {
		const panelData = panelsArray[index];
		assert(panelData);
		const { callbacks, constraints, id: panelId } = panelData;
		const { collapsedSize = 0, collapsible } = constraints;
		const lastNotifiedSize = panelIdToLastNotifiedSizeMap[panelId];
		if (lastNotifiedSize == null || size !== lastNotifiedSize) {
			panelIdToLastNotifiedSizeMap[panelId] = size;
			const { onCollapse, onExpand, onResize } = callbacks;
			if (onResize) onResize(size, lastNotifiedSize);
			if (collapsible && (onCollapse || onExpand)) {
				if (onExpand && (lastNotifiedSize == null || lastNotifiedSize === collapsedSize) && size !== collapsedSize) onExpand();
				if (onCollapse && (lastNotifiedSize == null || lastNotifiedSize !== collapsedSize) && size === collapsedSize) onCollapse();
			}
		}
	});
}
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/utils/debounce.js
function debounce(callback, durationMs = 10) {
	let timeoutId = null;
	const callable = (...args) => {
		if (timeoutId !== null) clearTimeout(timeoutId);
		timeoutId = setTimeout(() => {
			callback(...args);
		}, durationMs);
	};
	return callable;
}
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/utils/compare.js
function fuzzyCompareNumbers(actual, expected, fractionDigits = 10) {
	actual = Number.parseFloat(actual.toFixed(fractionDigits));
	expected = Number.parseFloat(expected.toFixed(fractionDigits));
	const delta = actual - expected;
	if (delta === 0) return 0;
	else return delta > 0 ? 1 : -1;
}
function fuzzyNumbersEqual(actual, expected, fractionDigits) {
	return fuzzyCompareNumbers(actual, expected, fractionDigits) === 0;
}
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/utils/resizePanel.js
function resizePanel({ panelConstraints: panelConstraintsArray, panelIndex, size }) {
	const panelConstraints = panelConstraintsArray[panelIndex];
	assert(panelConstraints != null);
	const { collapsedSize = 0, collapsible, maxSize = 100, minSize = 0 } = panelConstraints;
	if (fuzzyCompareNumbers(size, minSize) < 0) if (collapsible) {
		const halfwayPoint = (collapsedSize + minSize) / 2;
		if (fuzzyCompareNumbers(size, halfwayPoint) < 0) size = collapsedSize;
		else size = minSize;
	} else size = minSize;
	size = Math.min(maxSize, size);
	size = Number.parseFloat(size.toFixed(10));
	return size;
}
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/utils/layout.js
function compareLayouts(a, b) {
	if (a.length !== b.length) return false;
	else for (let index = 0; index < a.length; index++) if (a[index] !== b[index]) return false;
	return true;
}
function adjustLayoutByDelta({ delta, layout: prevLayout, panelConstraints: panelConstraintsArray, pivotIndices, trigger }) {
	if (fuzzyNumbersEqual(delta, 0)) return prevLayout;
	const nextLayout = [...prevLayout];
	const [firstPivotIndex, secondPivotIndex] = pivotIndices;
	assert(firstPivotIndex != null);
	assert(secondPivotIndex != null);
	let deltaApplied = 0;
	if (trigger === "keyboard") {
		{
			const index = delta < 0 ? secondPivotIndex : firstPivotIndex;
			const panelConstraints = panelConstraintsArray[index];
			assert(panelConstraints);
			if (panelConstraints.collapsible) {
				const prevSize = prevLayout[index];
				assert(prevSize != null);
				const panelConstraints$1 = panelConstraintsArray[index];
				assert(panelConstraints$1);
				const { collapsedSize = 0, minSize = 0 } = panelConstraints$1;
				if (fuzzyNumbersEqual(prevSize, collapsedSize)) {
					const localDelta = minSize - prevSize;
					if (fuzzyCompareNumbers(localDelta, Math.abs(delta)) > 0) delta = delta < 0 ? 0 - localDelta : localDelta;
				}
			}
		}
		{
			const index = delta < 0 ? firstPivotIndex : secondPivotIndex;
			const panelConstraints = panelConstraintsArray[index];
			assert(panelConstraints);
			const { collapsible } = panelConstraints;
			if (collapsible) {
				const prevSize = prevLayout[index];
				assert(prevSize != null);
				const panelConstraints$1 = panelConstraintsArray[index];
				assert(panelConstraints$1);
				const { collapsedSize = 0, minSize = 0 } = panelConstraints$1;
				if (fuzzyNumbersEqual(prevSize, minSize)) {
					const localDelta = prevSize - collapsedSize;
					if (fuzzyCompareNumbers(localDelta, Math.abs(delta)) > 0) delta = delta < 0 ? 0 - localDelta : localDelta;
				}
			}
		}
	}
	{
		const increment = delta < 0 ? 1 : -1;
		let index = delta < 0 ? secondPivotIndex : firstPivotIndex;
		let maxAvailableDelta = 0;
		while (true) {
			const prevSize = prevLayout[index];
			assert(prevSize != null);
			const delta$1 = resizePanel({
				panelConstraints: panelConstraintsArray,
				panelIndex: index,
				size: 100
			}) - prevSize;
			maxAvailableDelta += delta$1;
			index += increment;
			if (index < 0 || index >= panelConstraintsArray.length) break;
		}
		const minAbsDelta = Math.min(Math.abs(delta), Math.abs(maxAvailableDelta));
		delta = delta < 0 ? 0 - minAbsDelta : minAbsDelta;
	}
	{
		let index = delta < 0 ? firstPivotIndex : secondPivotIndex;
		while (index >= 0 && index < panelConstraintsArray.length) {
			const deltaRemaining = Math.abs(delta) - Math.abs(deltaApplied);
			const prevSize = prevLayout[index];
			assert(prevSize != null);
			const unsafeSize = prevSize - deltaRemaining;
			const safeSize = resizePanel({
				panelConstraints: panelConstraintsArray,
				panelIndex: index,
				size: unsafeSize
			});
			if (!fuzzyNumbersEqual(prevSize, safeSize)) {
				deltaApplied += prevSize - safeSize;
				nextLayout[index] = safeSize;
				if (deltaApplied.toPrecision(3).localeCompare(Math.abs(delta).toPrecision(3), void 0, { numeric: true }) >= 0) break;
			}
			if (delta < 0) index--;
			else index++;
		}
	}
	if (fuzzyNumbersEqual(deltaApplied, 0)) return prevLayout;
	{
		const pivotIndex = delta < 0 ? secondPivotIndex : firstPivotIndex;
		const prevSize = prevLayout[pivotIndex];
		assert(prevSize != null);
		const unsafeSize = prevSize + deltaApplied;
		const safeSize = resizePanel({
			panelConstraints: panelConstraintsArray,
			panelIndex: pivotIndex,
			size: unsafeSize
		});
		nextLayout[pivotIndex] = safeSize;
		if (!fuzzyNumbersEqual(safeSize, unsafeSize)) {
			let deltaRemaining = unsafeSize - safeSize;
			let index = delta < 0 ? secondPivotIndex : firstPivotIndex;
			while (index >= 0 && index < panelConstraintsArray.length) {
				const prevSize$1 = nextLayout[index];
				assert(prevSize$1 != null);
				const unsafeSize$1 = prevSize$1 + deltaRemaining;
				const safeSize$1 = resizePanel({
					panelConstraints: panelConstraintsArray,
					panelIndex: index,
					size: unsafeSize$1
				});
				if (!fuzzyNumbersEqual(prevSize$1, safeSize$1)) {
					deltaRemaining -= safeSize$1 - prevSize$1;
					nextLayout[index] = safeSize$1;
				}
				if (fuzzyNumbersEqual(deltaRemaining, 0)) break;
				if (delta > 0) index--;
				else index++;
			}
		}
	}
	if (!fuzzyNumbersEqual(nextLayout.reduce((total, size) => size + total, 0), 100)) return prevLayout;
	return nextLayout;
}
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/utils/pivot.js
function determinePivotIndices(groupId, dragHandleId, panelGroupElement) {
	const index = getResizeHandleElementIndex(groupId, dragHandleId, panelGroupElement);
	return index != null ? [index, index + 1] : [-1, -1];
}
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/utils/rects.js
function intersects(rectOne, rectTwo, strict) {
	if (strict) return rectOne.x < rectTwo.x + rectTwo.width && rectOne.x + rectOne.width > rectTwo.x && rectOne.y < rectTwo.y + rectTwo.height && rectOne.y + rectOne.height > rectTwo.y;
	else return rectOne.x <= rectTwo.x + rectTwo.width && rectOne.x + rectOne.width >= rectTwo.x && rectOne.y <= rectTwo.y + rectTwo.height && rectOne.y + rectOne.height >= rectTwo.y;
}
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/utils/stackingOrder.js
/**
* Determine which of two nodes appears in front of the other —
* if `a` is in front, returns 1, otherwise returns -1
* @param {HTMLElement} a
* @param {HTMLElement} b
*/
function compare(a, b) {
	if (a === b) throw new Error("Cannot compare node with itself");
	const ancestors = {
		a: getAncestors(a),
		b: getAncestors(b)
	};
	let common_ancestor;
	while (ancestors.a.at(-1) === ancestors.b.at(-1)) {
		a = ancestors.a.pop();
		b = ancestors.b.pop();
		common_ancestor = a;
	}
	assert(common_ancestor);
	const z_indexes = {
		a: getZIndex(findStackingContext(ancestors.a)),
		b: getZIndex(findStackingContext(ancestors.b))
	};
	if (z_indexes.a === z_indexes.b) {
		const children = common_ancestor.childNodes;
		const furthest_ancestors = {
			a: ancestors.a.at(-1),
			b: ancestors.b.at(-1)
		};
		let i = children.length;
		while (i--) {
			const child = children[i];
			if (child === furthest_ancestors.a) return 1;
			if (child === furthest_ancestors.b) return -1;
		}
	}
	return Math.sign(z_indexes.a - z_indexes.b);
}
var props = /\b(?:position|zIndex|opacity|transform|webkitTransform|mixBlendMode|filter|webkitFilter|isolation)\b/;
/** @param {HTMLElement} node */
function isFlexItem(node) {
	const display = getComputedStyle(getParent(node)).display;
	return display === "flex" || display === "inline-flex";
}
/** @param {HTMLElement} node */
function createsStackingContext(node) {
	const style = getComputedStyle(node);
	if (style.position === "fixed") return true;
	if (style.zIndex !== "auto" && (style.position !== "static" || isFlexItem(node))) return true;
	if (+style.opacity < 1) return true;
	if ("transform" in style && style.transform !== "none") return true;
	if ("webkitTransform" in style && style.webkitTransform !== "none") return true;
	if ("mixBlendMode" in style && style.mixBlendMode !== "normal") return true;
	if ("filter" in style && style.filter !== "none") return true;
	if ("webkitFilter" in style && style.webkitFilter !== "none") return true;
	if ("isolation" in style && style.isolation === "isolate") return true;
	if (props.test(style.willChange)) return true;
	if (style.webkitOverflowScrolling === "touch") return true;
	return false;
}
/** @param {HTMLElement[]} nodes */
function findStackingContext(nodes) {
	let i = nodes.length;
	while (i--) {
		const node = nodes[i];
		assert(node);
		if (createsStackingContext(node)) return node;
	}
	return null;
}
/** @param {HTMLElement} node */
function getZIndex(node) {
	return node && Number(getComputedStyle(node).zIndex) || 0;
}
/** @param {HTMLElement} node */
function getAncestors(node) {
	const ancestors = [];
	while (node) {
		ancestors.push(node);
		node = getParent(node);
	}
	return ancestors;
}
/** @param {HTMLElement} node */
function getParent(node) {
	return node.parentNode instanceof DocumentFragment && node.parentNode?.host || node.parentNode;
}
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/utils/registry.js
function getInputType() {
	if (typeof matchMedia === "function") return matchMedia("(pointer:coarse)").matches ? "coarse" : "fine";
}
var isCoarsePointer = getInputType() === "coarse";
var intersectingHandles = [];
var isPointerDown = false;
var ownerDocumentCounts = /* @__PURE__ */ new Map();
var panelConstraintFlags = /* @__PURE__ */ new Map();
var registeredResizeHandlers = /* @__PURE__ */ new Set();
function registerResizeHandle(resizeHandleId, element, direction, hitAreaMargins, nonce, setResizeHandlerState) {
	const { ownerDocument } = element;
	const data = {
		direction,
		element,
		hitAreaMargins,
		nonce,
		setResizeHandlerState
	};
	const count = ownerDocumentCounts.get(ownerDocument) ?? 0;
	ownerDocumentCounts.set(ownerDocument, count + 1);
	registeredResizeHandlers.add(data);
	updateListeners();
	return function unregisterResizeHandle() {
		panelConstraintFlags.delete(resizeHandleId);
		registeredResizeHandlers.delete(data);
		const count$1 = ownerDocumentCounts.get(ownerDocument) ?? 1;
		ownerDocumentCounts.set(ownerDocument, count$1 - 1);
		updateListeners();
		resetGlobalCursorStyle();
		if (count$1 === 1) ownerDocumentCounts.delete(ownerDocument);
	};
}
function handlePointerDown(event) {
	const { target } = event;
	const { x, y } = getResizeEventCoordinates(event);
	isPointerDown = true;
	recalculateIntersectingHandles({
		target,
		x,
		y
	});
	updateListeners();
	if (intersectingHandles.length > 0) {
		updateResizeHandlerStates("down", event);
		event.preventDefault();
	}
}
function handlePointerMove(event) {
	const { x, y } = getResizeEventCoordinates(event);
	if (!isPointerDown) {
		const { target } = event;
		recalculateIntersectingHandles({
			target,
			x,
			y
		});
	}
	updateResizeHandlerStates("move", event);
	updateCursor();
	if (intersectingHandles.length > 0) event.preventDefault();
}
function handlePointerUp(event) {
	const { target } = event;
	const { x, y } = getResizeEventCoordinates(event);
	panelConstraintFlags.clear();
	isPointerDown = false;
	if (intersectingHandles.length > 0) event.preventDefault();
	updateResizeHandlerStates("up", event);
	recalculateIntersectingHandles({
		target,
		x,
		y
	});
	updateCursor();
	updateListeners();
}
function recalculateIntersectingHandles({ target, x, y }) {
	intersectingHandles.splice(0);
	let targetElement = null;
	if (target instanceof HTMLElement) targetElement = target;
	registeredResizeHandlers.forEach((data) => {
		const { element: dragHandleElement, hitAreaMargins } = data;
		const dragHandleRect = dragHandleElement.getBoundingClientRect();
		const { bottom, left, right, top } = dragHandleRect;
		const margin = isCoarsePointer ? hitAreaMargins.coarse : hitAreaMargins.fine;
		if (x >= left - margin && x <= right + margin && y >= top - margin && y <= bottom + margin) {
			if (targetElement !== null && dragHandleElement !== targetElement && !dragHandleElement.contains(targetElement) && !targetElement.contains(dragHandleElement) && compare(targetElement, dragHandleElement) > 0) {
				let currentElement = targetElement;
				let didIntersect = false;
				while (currentElement) {
					if (currentElement.contains(dragHandleElement)) break;
					else if (intersects(currentElement.getBoundingClientRect(), dragHandleRect, true)) {
						didIntersect = true;
						break;
					}
					currentElement = currentElement.parentElement;
				}
				if (didIntersect) return;
			}
			intersectingHandles.push(data);
		}
	});
}
function reportConstraintsViolation(resizeHandleId, flag) {
	panelConstraintFlags.set(resizeHandleId, flag);
}
function updateCursor() {
	let intersectsHorizontal = false;
	let intersectsVertical = false;
	let nonce;
	intersectingHandles.forEach((data) => {
		const { direction, nonce: _nonce } = data;
		if (direction.value === "horizontal") intersectsHorizontal = true;
		else intersectsVertical = true;
		nonce = _nonce.value;
	});
	let constraintFlags = 0;
	panelConstraintFlags.forEach((flag) => {
		constraintFlags |= flag;
	});
	if (intersectsHorizontal && intersectsVertical) setGlobalCursorStyle("intersection", constraintFlags, nonce);
	else if (intersectsHorizontal) setGlobalCursorStyle("horizontal", constraintFlags, nonce);
	else if (intersectsVertical) setGlobalCursorStyle("vertical", constraintFlags, nonce);
	else resetGlobalCursorStyle();
}
function updateListeners() {
	ownerDocumentCounts.forEach((_, ownerDocument) => {
		const { body } = ownerDocument;
		body.removeEventListener("contextmenu", handlePointerUp);
		body.removeEventListener("mousedown", handlePointerDown);
		body.removeEventListener("mouseleave", handlePointerMove);
		body.removeEventListener("mousemove", handlePointerMove);
		body.removeEventListener("touchmove", handlePointerMove);
		body.removeEventListener("touchstart", handlePointerDown);
	});
	window.removeEventListener("mouseup", handlePointerUp);
	window.removeEventListener("touchcancel", handlePointerUp);
	window.removeEventListener("touchend", handlePointerUp);
	if (registeredResizeHandlers.size > 0) if (isPointerDown) {
		if (intersectingHandles.length > 0) ownerDocumentCounts.forEach((count, ownerDocument) => {
			const { body } = ownerDocument;
			if (count > 0) {
				body.addEventListener("contextmenu", handlePointerUp);
				body.addEventListener("mouseleave", handlePointerMove);
				body.addEventListener("mousemove", handlePointerMove);
				body.addEventListener("touchmove", handlePointerMove, { passive: false });
			}
		});
		window.addEventListener("mouseup", handlePointerUp);
		window.addEventListener("touchcancel", handlePointerUp);
		window.addEventListener("touchend", handlePointerUp);
	} else ownerDocumentCounts.forEach((count, ownerDocument) => {
		const { body } = ownerDocument;
		if (count > 0) {
			body.addEventListener("mousedown", handlePointerDown);
			body.addEventListener("mousemove", handlePointerMove);
			body.addEventListener("touchmove", handlePointerMove, { passive: false });
			body.addEventListener("touchstart", handlePointerDown);
		}
	});
}
function updateResizeHandlerStates(action, event) {
	registeredResizeHandlers.forEach((data) => {
		const { setResizeHandlerState } = data;
		setResizeHandlerState(action, intersectingHandles.includes(data), event);
	});
}
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/utils/style.js
var currentCursorStyle = null;
var styleElement = null;
function getCursorStyle(state, constraintFlags) {
	if (constraintFlags) {
		const horizontalMin = (constraintFlags & 1) !== 0;
		const horizontalMax = (constraintFlags & 2) !== 0;
		const verticalMin = (constraintFlags & 4) !== 0;
		const verticalMax = (constraintFlags & 8) !== 0;
		if (horizontalMin) if (verticalMin) return "se-resize";
		else if (verticalMax) return "ne-resize";
		else return "e-resize";
		else if (horizontalMax) if (verticalMin) return "sw-resize";
		else if (verticalMax) return "nw-resize";
		else return "w-resize";
		else if (verticalMin) return "s-resize";
		else if (verticalMax) return "n-resize";
	}
	switch (state) {
		case "horizontal": return "ew-resize";
		case "intersection": return "move";
		case "vertical": return "ns-resize";
	}
}
function resetGlobalCursorStyle() {
	if (styleElement !== null) {
		document.head.removeChild(styleElement);
		currentCursorStyle = null;
		styleElement = null;
	}
}
function setGlobalCursorStyle(state, constraintFlags, nonce) {
	const style = getCursorStyle(state, constraintFlags);
	if (currentCursorStyle === style) return;
	currentCursorStyle = style;
	if (styleElement === null) {
		styleElement = document.createElement("style");
		if (nonce) styleElement.nonce = nonce;
		document.head.appendChild(styleElement);
	}
	styleElement.innerHTML = `*{cursor: ${style}!important;}`;
}
function computePanelFlexBoxStyle({ defaultSize, dragState, layout, panelData, panelIndex, precision = 3 }) {
	const size = layout[panelIndex];
	let flexGrow;
	if (size == null) flexGrow = defaultSize !== void 0 ? defaultSize.toPrecision(precision) : "1";
	else if (panelData.length === 1) flexGrow = "1";
	else flexGrow = size.toPrecision(precision);
	return {
		flexBasis: 0,
		flexGrow,
		flexShrink: 1,
		overflow: "hidden",
		pointerEvents: dragState !== null ? "none" : void 0
	};
}
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/utils/validation.js
function validatePanelGroupLayout({ layout: prevLayout, panelConstraints }) {
	const nextLayout = [...prevLayout];
	const nextLayoutTotalSize = nextLayout.reduce((accumulated, current) => accumulated + current, 0);
	if (nextLayout.length !== panelConstraints.length) throw new Error(`Invalid ${panelConstraints.length} panel layout: ${nextLayout.map((size) => `${size}%`).join(", ")}`);
	else if (!fuzzyNumbersEqual(nextLayoutTotalSize, 100)) {
		console.warn(`WARNING: Invalid layout total size: ${nextLayout.map((size) => `${size}%`).join(", ")}. Layout normalization will be applied.`);
		for (let index = 0; index < panelConstraints.length; index++) {
			const unsafeSize = nextLayout[index];
			assert(unsafeSize != null);
			const safeSize = 100 / nextLayoutTotalSize * unsafeSize;
			nextLayout[index] = safeSize;
		}
	}
	let remainingSize = 0;
	for (let index = 0; index < panelConstraints.length; index++) {
		const unsafeSize = nextLayout[index];
		assert(unsafeSize != null);
		const safeSize = resizePanel({
			panelConstraints,
			panelIndex: index,
			size: unsafeSize
		});
		if (unsafeSize !== safeSize) {
			remainingSize += unsafeSize - safeSize;
			nextLayout[index] = safeSize;
		}
	}
	if (!fuzzyNumbersEqual(remainingSize, 0)) for (let index = 0; index < panelConstraints.length; index++) {
		const prevSize = nextLayout[index];
		assert(prevSize != null);
		const unsafeSize = prevSize + remainingSize;
		const safeSize = resizePanel({
			panelConstraints,
			panelIndex: index,
			size: unsafeSize
		});
		if (prevSize !== safeSize) {
			remainingSize -= safeSize - prevSize;
			nextLayout[index] = safeSize;
			if (fuzzyNumbersEqual(remainingSize, 0)) break;
		}
	}
	return nextLayout;
}
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/composables/useWindowSplitterPanelGroupBehavior.js
function useWindowSplitterPanelGroupBehavior({ eagerValuesRef, groupId, layout, panelDataArray, panelGroupElement, setLayout }) {
	watchEffect((onCleanup) => {
		const _panelGroupElement = panelGroupElement.value;
		if (!_panelGroupElement) return;
		const resizeHandleElements = getResizeHandleElementsForGroup(groupId, _panelGroupElement);
		for (let index = 0; index < panelDataArray.length - 1; index++) {
			const { valueMax, valueMin, valueNow } = calculateAriaValues({
				layout: layout.value,
				panelsArray: panelDataArray,
				pivotIndices: [index, index + 1]
			});
			const resizeHandleElement = resizeHandleElements[index];
			if (resizeHandleElement == null) {} else {
				const panelData = panelDataArray[index];
				assert(panelData);
				resizeHandleElement.setAttribute("aria-controls", panelData.id);
				resizeHandleElement.setAttribute("aria-valuemax", `${Math.round(valueMax)}`);
				resizeHandleElement.setAttribute("aria-valuemin", `${Math.round(valueMin)}`);
				resizeHandleElement.setAttribute("aria-valuenow", valueNow != null ? `${Math.round(valueNow)}` : "");
			}
		}
		onCleanup(() => {
			resizeHandleElements.forEach((resizeHandleElement) => {
				resizeHandleElement.removeAttribute("aria-controls");
				resizeHandleElement.removeAttribute("aria-valuemax");
				resizeHandleElement.removeAttribute("aria-valuemin");
				resizeHandleElement.removeAttribute("aria-valuenow");
			});
		});
	});
	watchEffect((onCleanup) => {
		const _panelGroupElement = panelGroupElement.value;
		if (!_panelGroupElement) return;
		const eagerValues = eagerValuesRef.value;
		assert(eagerValues);
		const { panelDataArray: panelDataArray$1 } = eagerValues;
		assert(getPanelGroupElement(groupId, _panelGroupElement) != null, `No group found for id "${groupId}"`);
		const handles = getResizeHandleElementsForGroup(groupId, _panelGroupElement);
		assert(handles);
		const cleanupFunctions = handles.map((handle) => {
			const handleId = handle.getAttribute("data-panel-resize-handle-id");
			assert(handleId);
			const [idBefore, idAfter] = getResizeHandlePanelIds(groupId, handleId, panelDataArray$1, _panelGroupElement);
			if (idBefore == null || idAfter == null) return () => {};
			const onKeyDown = (event) => {
				if (event.defaultPrevented) return;
				switch (event.key) {
					case "Enter": {
						event.preventDefault();
						const index = panelDataArray$1.findIndex((panelData) => panelData.id === idBefore);
						if (index >= 0) {
							const panelData = panelDataArray$1[index];
							assert(panelData);
							const size = layout.value[index];
							const { collapsedSize = 0, collapsible, minSize = 0 } = panelData.constraints;
							if (size != null && collapsible) {
								const nextLayout = adjustLayoutByDelta({
									delta: fuzzyNumbersEqual(size, collapsedSize) ? minSize - collapsedSize : collapsedSize - size,
									layout: layout.value,
									panelConstraints: panelDataArray$1.map((panelData$1) => panelData$1.constraints),
									pivotIndices: determinePivotIndices(groupId, handleId, _panelGroupElement),
									trigger: "keyboard"
								});
								if (layout.value !== nextLayout) setLayout(nextLayout);
							}
						}
						break;
					}
				}
			};
			handle.addEventListener("keydown", onKeyDown);
			return () => {
				handle.removeEventListener("keydown", onKeyDown);
			};
		});
		onCleanup(() => {
			cleanupFunctions.forEach((cleanupFunction) => cleanupFunction());
		});
	});
}
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/utils/storage.js
function initializeDefaultStorage(storageObject) {
	try {
		if (typeof localStorage !== "undefined") {
			storageObject.getItem = (name) => {
				return localStorage.getItem(name);
			};
			storageObject.setItem = (name, value) => {
				localStorage.setItem(name, value);
			};
		} else throw new TypeError("localStorage not supported in this environment");
	} catch (error) {
		console.error(error);
		storageObject.getItem = () => null;
		storageObject.setItem = () => {};
	}
}
function getPanelGroupKey(autoSaveId) {
	return `reka:${autoSaveId}`;
}
function getPanelKey(panels) {
	return panels.map((panel) => {
		const { constraints, id, idIsFromProps, order } = panel;
		if (idIsFromProps) return id;
		else return order ? `${order}:${JSON.stringify(constraints)}` : JSON.stringify(constraints);
	}).sort((a, b) => a.localeCompare(b)).join(",");
}
function loadSerializedPanelGroupState(autoSaveId, storage) {
	try {
		const panelGroupKey = getPanelGroupKey(autoSaveId);
		const serialized = storage.getItem(panelGroupKey);
		if (serialized) {
			const parsed = JSON.parse(serialized);
			if (typeof parsed === "object" && parsed != null) return parsed;
		}
	} catch (error) {}
	return null;
}
function loadPanelGroupState(autoSaveId, panels, storage) {
	return (loadSerializedPanelGroupState(autoSaveId, storage) ?? {})[getPanelKey(panels)] ?? null;
}
function savePanelGroupState(autoSaveId, panels, panelSizesBeforeCollapse, sizes, storage) {
	const panelGroupKey = getPanelGroupKey(autoSaveId);
	const panelKey = getPanelKey(panels);
	const state = loadSerializedPanelGroupState(autoSaveId, storage) ?? {};
	state[panelKey] = {
		expandToSizes: Object.fromEntries(panelSizesBeforeCollapse.entries()),
		layout: sizes
	};
	try {
		storage.setItem(panelGroupKey, JSON.stringify(state));
	} catch (error) {
		console.error(error);
	}
}
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/Splitter/SplitterGroup.js
var LOCAL_STORAGE_DEBOUNCE_INTERVAL = 100;
var defaultStorage = {
	getItem: (name) => {
		initializeDefaultStorage(defaultStorage);
		return defaultStorage.getItem(name);
	},
	setItem: (name, value) => {
		initializeDefaultStorage(defaultStorage);
		defaultStorage.setItem(name, value);
	}
};
var [injectPanelGroupContext, providePanelGroupContext] = createContext("PanelGroup");
var SplitterGroup_default = /* @__PURE__ */ defineComponent({
	__name: "SplitterGroup",
	props: {
		id: {
			type: [String, null],
			required: false
		},
		autoSaveId: {
			type: [String, null],
			required: false,
			default: null
		},
		direction: {
			type: String,
			required: true
		},
		keyboardResizeBy: {
			type: [Number, null],
			required: false,
			default: 10
		},
		storage: {
			type: Object,
			required: false,
			default: () => defaultStorage
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false
		}
	},
	emits: ["layout"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const debounceMap = {};
		const { direction } = toRefs(props);
		const groupId = useId(props.id, "reka-splitter-group");
		const dir = useDirection();
		const { forwardRef, currentElement: panelGroupElementRef } = useForwardExpose();
		const dragState = ref(null);
		const layout = ref([]);
		const panelIdToLastNotifiedSizeMapRef = ref({});
		const panelSizeBeforeCollapseRef = ref(/* @__PURE__ */ new Map());
		const prevDeltaRef = ref(0);
		const committedValuesRef = computed(() => ({
			autoSaveId: props.autoSaveId,
			direction: props.direction,
			dragState: dragState.value,
			id: groupId,
			keyboardResizeBy: props.keyboardResizeBy,
			storage: props.storage
		}));
		const eagerValuesRef = ref({
			layout: layout.value,
			panelDataArray: [],
			panelDataArrayChanged: false
		});
		const setLayout = (val) => layout.value = val;
		useWindowSplitterPanelGroupBehavior({
			eagerValuesRef,
			groupId,
			layout,
			panelDataArray: eagerValuesRef.value.panelDataArray,
			setLayout,
			panelGroupElement: panelGroupElementRef
		});
		watchEffect(() => {
			const { panelDataArray } = eagerValuesRef.value;
			const { autoSaveId } = props;
			if (autoSaveId) {
				if (layout.value.length === 0 || layout.value.length !== panelDataArray.length) return;
				let debouncedSave = debounceMap[autoSaveId];
				if (!debouncedSave) {
					debouncedSave = debounce(savePanelGroupState, LOCAL_STORAGE_DEBOUNCE_INTERVAL);
					debounceMap[autoSaveId] = debouncedSave;
				}
				const clonedPanelDataArray = [...panelDataArray];
				const clonedPanelSizesBeforeCollapse = new Map(panelSizeBeforeCollapseRef.value);
				debouncedSave(autoSaveId, clonedPanelDataArray, clonedPanelSizesBeforeCollapse, layout.value, props.storage);
			}
		});
		function getPanelStyle(panelData, defaultSize) {
			const { panelDataArray } = eagerValuesRef.value;
			const panelIndex = findPanelDataIndex(panelDataArray, panelData);
			return computePanelFlexBoxStyle({
				defaultSize,
				dragState: dragState.value,
				layout: layout.value,
				panelData: panelDataArray,
				panelIndex
			});
		}
		function registerPanel(panelData) {
			const { panelDataArray } = eagerValuesRef.value;
			panelDataArray.push(panelData);
			panelDataArray.sort((panelA, panelB) => {
				const orderA = panelA.order;
				const orderB = panelB.order;
				if (orderA == null && orderB == null) return 0;
				else if (orderA == null) return -1;
				else if (orderB == null) return 1;
				else return orderA - orderB;
			});
			eagerValuesRef.value.panelDataArrayChanged = true;
		}
		watch(() => eagerValuesRef.value.panelDataArrayChanged, () => {
			if (eagerValuesRef.value.panelDataArrayChanged) {
				eagerValuesRef.value.panelDataArrayChanged = false;
				const { autoSaveId, storage } = committedValuesRef.value;
				const { layout: prevLayout, panelDataArray } = eagerValuesRef.value;
				let unsafeLayout = null;
				if (autoSaveId) {
					const state = loadPanelGroupState(autoSaveId, panelDataArray, storage);
					if (state) {
						panelSizeBeforeCollapseRef.value = new Map(Object.entries(state.expandToSizes));
						unsafeLayout = state.layout;
					}
				}
				if (unsafeLayout === null) unsafeLayout = calculateUnsafeDefaultLayout({ panelDataArray });
				const nextLayout = validatePanelGroupLayout({
					layout: unsafeLayout,
					panelConstraints: panelDataArray.map((panelData) => panelData.constraints)
				});
				if (!areEqual(prevLayout, nextLayout)) {
					setLayout(nextLayout);
					eagerValuesRef.value.layout = nextLayout;
					emits("layout", nextLayout);
					callPanelCallbacks(panelDataArray, nextLayout, panelIdToLastNotifiedSizeMapRef.value);
				}
			}
		});
		function registerResizeHandle(dragHandleId) {
			return function resizeHandler(event) {
				event.preventDefault();
				const panelGroupElement = panelGroupElementRef.value;
				if (!panelGroupElement) return () => null;
				const { direction: direction$1, dragState: dragState$1, id: groupId$1, keyboardResizeBy } = committedValuesRef.value;
				const { layout: prevLayout, panelDataArray } = eagerValuesRef.value;
				const { initialLayout } = dragState$1 ?? {};
				const pivotIndices = determinePivotIndices(groupId$1, dragHandleId, panelGroupElement);
				let delta = calculateDeltaPercentage(event, dragHandleId, direction$1, dragState$1, keyboardResizeBy, panelGroupElement);
				if (delta === 0) return;
				const isHorizontal = direction$1 === "horizontal";
				if (dir.value === "rtl" && isHorizontal) delta = -delta;
				const panelConstraints = panelDataArray.map((panelData) => panelData.constraints);
				const nextLayout = adjustLayoutByDelta({
					delta,
					layout: initialLayout ?? prevLayout,
					panelConstraints,
					pivotIndices,
					trigger: isKeyDown(event) ? "keyboard" : "mouse-or-touch"
				});
				const layoutChanged = !compareLayouts(prevLayout, nextLayout);
				if (isMouseEvent(event) || isTouchEvent(event)) {
					if (prevDeltaRef.value !== delta) {
						prevDeltaRef.value = delta;
						if (!layoutChanged) if (isHorizontal) reportConstraintsViolation(dragHandleId, delta < 0 ? 1 : 2);
						else reportConstraintsViolation(dragHandleId, delta < 0 ? 4 : 8);
						else reportConstraintsViolation(dragHandleId, 0);
					}
				}
				if (layoutChanged) {
					setLayout(nextLayout);
					eagerValuesRef.value.layout = nextLayout;
					emits("layout", nextLayout);
					callPanelCallbacks(panelDataArray, nextLayout, panelIdToLastNotifiedSizeMapRef.value);
				}
			};
		}
		function resizePanel(panelData, unsafePanelSize) {
			const { layout: prevLayout, panelDataArray } = eagerValuesRef.value;
			const panelConstraintsArray = panelDataArray.map((panelData$1) => panelData$1.constraints);
			const { panelSize, pivotIndices } = panelDataHelper(panelDataArray, panelData, prevLayout);
			assert(panelSize != null);
			const nextLayout = adjustLayoutByDelta({
				delta: findPanelDataIndex(panelDataArray, panelData) === panelDataArray.length - 1 ? panelSize - unsafePanelSize : unsafePanelSize - panelSize,
				layout: prevLayout,
				panelConstraints: panelConstraintsArray,
				pivotIndices,
				trigger: "imperative-api"
			});
			if (!compareLayouts(prevLayout, nextLayout)) {
				setLayout(nextLayout);
				eagerValuesRef.value.layout = nextLayout;
				emits("layout", nextLayout);
				callPanelCallbacks(panelDataArray, nextLayout, panelIdToLastNotifiedSizeMapRef.value);
			}
		}
		function reevaluatePanelConstraints(panelData, prevConstraints) {
			const { layout: layout$1, panelDataArray } = eagerValuesRef.value;
			const index = findPanelDataIndex(panelDataArray, panelData);
			panelDataArray[index] = panelData;
			eagerValuesRef.value.panelDataArrayChanged = true;
			const { collapsedSize: prevCollapsedSize = 0, collapsible: prevCollapsible } = prevConstraints;
			const { collapsedSize: nextCollapsedSize = 0, collapsible: nextCollapsible, maxSize: nextMaxSize = 100, minSize: nextMinSize = 0 } = panelData.constraints;
			const { panelSize: prevPanelSize } = panelDataHelper(panelDataArray, panelData, layout$1);
			if (prevPanelSize === null) return;
			if (prevCollapsible && nextCollapsible && prevPanelSize === prevCollapsedSize) {
				if (prevCollapsedSize !== nextCollapsedSize) resizePanel(panelData, nextCollapsedSize);
			} else if (prevPanelSize < nextMinSize) resizePanel(panelData, nextMinSize);
			else if (prevPanelSize > nextMaxSize) resizePanel(panelData, nextMaxSize);
		}
		function startDragging(dragHandleId, event) {
			const { direction: direction$1 } = committedValuesRef.value;
			const { layout: layout$1 } = eagerValuesRef.value;
			if (!panelGroupElementRef.value) return;
			const handleElement = getResizeHandleElement(dragHandleId, panelGroupElementRef.value);
			assert(handleElement);
			const initialCursorPosition = getResizeEventCursorPosition(direction$1, event);
			dragState.value = {
				dragHandleId,
				dragHandleRect: handleElement.getBoundingClientRect(),
				initialCursorPosition,
				initialLayout: layout$1
			};
		}
		function stopDragging() {
			dragState.value = null;
		}
		function unregisterPanel(panelData) {
			const { panelDataArray } = eagerValuesRef.value;
			const index = findPanelDataIndex(panelDataArray, panelData);
			if (index >= 0) {
				panelDataArray.splice(index, 1);
				delete panelIdToLastNotifiedSizeMapRef.value[panelData.id];
				eagerValuesRef.value.panelDataArrayChanged = true;
			}
		}
		function collapsePanel(panelData) {
			const { layout: prevLayout, panelDataArray } = eagerValuesRef.value;
			if (panelData.constraints.collapsible) {
				const panelConstraintsArray = panelDataArray.map((panelData$1) => panelData$1.constraints);
				const { collapsedSize = 0, panelSize, pivotIndices } = panelDataHelper(panelDataArray, panelData, prevLayout);
				assert(panelSize != null, `Panel size not found for panel "${panelData.id}"`);
				if (panelSize !== collapsedSize) {
					panelSizeBeforeCollapseRef.value.set(panelData.id, panelSize);
					const nextLayout = adjustLayoutByDelta({
						delta: findPanelDataIndex(panelDataArray, panelData) === panelDataArray.length - 1 ? panelSize - collapsedSize : collapsedSize - panelSize,
						layout: prevLayout,
						panelConstraints: panelConstraintsArray,
						pivotIndices,
						trigger: "imperative-api"
					});
					if (!compareLayouts(prevLayout, nextLayout)) {
						setLayout(nextLayout);
						eagerValuesRef.value.layout = nextLayout;
						emits("layout", nextLayout);
						callPanelCallbacks(panelDataArray, nextLayout, panelIdToLastNotifiedSizeMapRef.value);
					}
				}
			}
		}
		function expandPanel(panelData) {
			const { layout: prevLayout, panelDataArray } = eagerValuesRef.value;
			if (panelData.constraints.collapsible) {
				const panelConstraintsArray = panelDataArray.map((panelData$1) => panelData$1.constraints);
				const { collapsedSize = 0, panelSize, minSize = 0, pivotIndices } = panelDataHelper(panelDataArray, panelData, prevLayout);
				if (panelSize === collapsedSize) {
					const prevPanelSize = panelSizeBeforeCollapseRef.value.get(panelData.id);
					const baseSize = prevPanelSize != null && prevPanelSize >= minSize ? prevPanelSize : minSize;
					const nextLayout = adjustLayoutByDelta({
						delta: findPanelDataIndex(panelDataArray, panelData) === panelDataArray.length - 1 ? panelSize - baseSize : baseSize - panelSize,
						layout: prevLayout,
						panelConstraints: panelConstraintsArray,
						pivotIndices,
						trigger: "imperative-api"
					});
					if (!compareLayouts(prevLayout, nextLayout)) {
						setLayout(nextLayout);
						eagerValuesRef.value.layout = nextLayout;
						emits("layout", nextLayout);
						callPanelCallbacks(panelDataArray, nextLayout, panelIdToLastNotifiedSizeMapRef.value);
					}
				}
			}
		}
		function getPanelSize(panelData) {
			const { layout: layout$1, panelDataArray } = eagerValuesRef.value;
			const { panelSize } = panelDataHelper(panelDataArray, panelData, layout$1);
			assert(panelSize != null, `Panel size not found for panel "${panelData.id}"`);
			return panelSize;
		}
		function isPanelCollapsed(panelData) {
			const { layout: layout$1, panelDataArray } = eagerValuesRef.value;
			const { collapsedSize = 0, collapsible, panelSize } = panelDataHelper(panelDataArray, panelData, layout$1);
			if (!collapsible) return false;
			if (panelSize === void 0) return panelData.constraints.defaultSize === panelData.constraints.collapsedSize;
			else return panelSize === collapsedSize;
		}
		function isPanelExpanded(panelData) {
			const { layout: layout$1, panelDataArray } = eagerValuesRef.value;
			const { collapsedSize = 0, collapsible, panelSize } = panelDataHelper(panelDataArray, panelData, layout$1);
			assert(panelSize != null, `Panel size not found for panel "${panelData.id}"`);
			return !collapsible || panelSize > collapsedSize;
		}
		providePanelGroupContext({
			direction,
			dragState: dragState.value,
			groupId,
			reevaluatePanelConstraints,
			registerPanel,
			registerResizeHandle,
			resizePanel,
			startDragging,
			stopDragging,
			unregisterPanel,
			panelGroupElement: panelGroupElementRef,
			collapsePanel,
			expandPanel,
			isPanelCollapsed,
			isPanelExpanded,
			getPanelSize,
			getPanelStyle
		});
		function findPanelDataIndex(panelDataArray, panelData) {
			return panelDataArray.findIndex((prevPanelData) => prevPanelData === panelData || prevPanelData.id === panelData.id);
		}
		function panelDataHelper(panelDataArray, panelData, layout$1) {
			const panelIndex = findPanelDataIndex(panelDataArray, panelData);
			const pivotIndices = panelIndex === panelDataArray.length - 1 ? [panelIndex - 1, panelIndex] : [panelIndex, panelIndex + 1];
			const panelSize = layout$1[panelIndex];
			return {
				...panelData.constraints,
				panelSize,
				pivotIndices
			};
		}
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), {
				ref: unref(forwardRef),
				as: _ctx.as,
				"as-child": _ctx.asChild,
				style: normalizeStyle({
					display: "flex",
					flexDirection: unref(direction) === "horizontal" ? "row" : "column",
					height: "100%",
					overflow: "hidden",
					width: "100%"
				}),
				"data-panel-group": "",
				"data-orientation": unref(direction),
				"data-panel-group-id": unref(groupId)
			}, {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", { layout: layout.value })]),
				_: 3
			}, 8, [
				"as",
				"as-child",
				"style",
				"data-orientation",
				"data-panel-group-id"
			]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/Splitter/SplitterPanel.js
var SplitterPanel_default = /* @__PURE__ */ defineComponent({
	__name: "SplitterPanel",
	props: {
		collapsedSize: {
			type: Number,
			required: false
		},
		collapsible: {
			type: Boolean,
			required: false
		},
		defaultSize: {
			type: Number,
			required: false
		},
		id: {
			type: String,
			required: false
		},
		maxSize: {
			type: Number,
			required: false
		},
		minSize: {
			type: Number,
			required: false
		},
		order: {
			type: Number,
			required: false
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false
		}
	},
	emits: [
		"collapse",
		"expand",
		"resize"
	],
	setup(__props, { expose: __expose, emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const panelGroupContext = injectPanelGroupContext();
		if (panelGroupContext === null) throw new Error("SplitterPanel components must be rendered within a SplitterGroup container");
		const { collapsePanel, expandPanel, getPanelSize, getPanelStyle, isPanelCollapsed, resizePanel, groupId, reevaluatePanelConstraints, registerPanel, unregisterPanel } = panelGroupContext;
		const panelId = useId(props.id, "reka-splitter-panel");
		const panelDataRef = computed(() => ({
			callbacks: {
				onCollapse: () => emits("collapse"),
				onExpand: () => emits("expand"),
				onResize: (...args) => emits("resize", ...args)
			},
			constraints: {
				collapsedSize: props.collapsedSize && Number.parseFloat(props.collapsedSize.toFixed(10)),
				collapsible: props.collapsible,
				defaultSize: props.defaultSize,
				maxSize: props.maxSize,
				minSize: props.minSize
			},
			id: panelId,
			idIsFromProps: props.id !== void 0,
			order: props.order
		}));
		watch(() => panelDataRef.value.constraints, (constraints, prevConstraints) => {
			if (prevConstraints.collapsedSize !== constraints.collapsedSize || prevConstraints.collapsible !== constraints.collapsible || prevConstraints.maxSize !== constraints.maxSize || prevConstraints.minSize !== constraints.minSize) reevaluatePanelConstraints(panelDataRef.value, prevConstraints);
		}, { deep: true });
		onMounted(() => {
			registerPanel(panelDataRef.value);
		});
		onUnmounted(() => {
			unregisterPanel(panelDataRef.value);
		});
		const style = computed(() => getPanelStyle(panelDataRef.value, props.defaultSize));
		/** Panel id (unique within group); falls back to useId when not provided */
		const isCollapsed = computed(() => isPanelCollapsed(panelDataRef.value));
		const isExpanded = computed(() => !isCollapsed.value);
		function collapse() {
			collapsePanel(panelDataRef.value);
		}
		function expand() {
			expandPanel(panelDataRef.value);
		}
		function resize(size) {
			resizePanel(panelDataRef.value, size);
		}
		__expose({
			collapse,
			expand,
			getSize() {
				return getPanelSize(panelDataRef.value);
			},
			resize,
			isCollapsed,
			isExpanded
		});
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), {
				id: unref(panelId),
				style: normalizeStyle(style.value),
				as: _ctx.as,
				"as-child": _ctx.asChild,
				"data-panel": "",
				"data-panel-collapsible": _ctx.collapsible || void 0,
				"data-panel-group-id": unref(groupId),
				"data-panel-id": unref(panelId),
				"data-panel-size": Number.parseFloat(`${style.value.flexGrow}`).toFixed(1),
				"data-state": _ctx.collapsible ? isCollapsed.value ? "collapsed" : "expanded" : void 0
			}, {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", {
					isCollapsed: isCollapsed.value,
					isExpanded: isExpanded.value,
					expand,
					collapse,
					resize
				})]),
				_: 3
			}, 8, [
				"id",
				"style",
				"as",
				"as-child",
				"data-panel-collapsible",
				"data-panel-group-id",
				"data-panel-id",
				"data-panel-size",
				"data-state"
			]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/composables/useWindowSplitterBehavior.js
function useWindowSplitterResizeHandlerBehavior({ disabled, handleId, resizeHandler, panelGroupElement }) {
	watchEffect((onCleanup) => {
		const _panelGroupElement = panelGroupElement.value;
		if (disabled.value || resizeHandler.value === null || _panelGroupElement === null) return;
		const handleElement = getResizeHandleElement(handleId, _panelGroupElement);
		if (handleElement == null) return;
		const onKeyDown = (event) => {
			if (event.defaultPrevented) return;
			switch (event.key) {
				case "ArrowDown":
				case "ArrowLeft":
				case "ArrowRight":
				case "ArrowUp":
				case "End":
				case "Home":
					event.preventDefault();
					resizeHandler.value?.(event);
					break;
				case "F6": {
					event.preventDefault();
					const groupId = handleElement.getAttribute("data-panel-group-id");
					assert(groupId);
					const handles = getResizeHandleElementsForGroup(groupId, _panelGroupElement);
					const index = getResizeHandleElementIndex(groupId, handleId, _panelGroupElement);
					assert(index !== null);
					handles[event.shiftKey ? index > 0 ? index - 1 : handles.length - 1 : index + 1 < handles.length ? index + 1 : 0].focus();
					break;
				}
			}
		};
		handleElement.addEventListener("keydown", onKeyDown);
		onCleanup(() => {
			handleElement.removeEventListener("keydown", onKeyDown);
		});
	});
}
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/Splitter/SplitterResizeHandle.js
var SplitterResizeHandle_default = /* @__PURE__ */ defineComponent({
	__name: "SplitterResizeHandle",
	props: {
		id: {
			type: String,
			required: false
		},
		hitAreaMargins: {
			type: Object,
			required: false
		},
		tabindex: {
			type: Number,
			required: false,
			default: 0
		},
		disabled: {
			type: Boolean,
			required: false
		},
		nonce: {
			type: String,
			required: false
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false
		}
	},
	emits: ["dragging"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const { forwardRef, currentElement } = useForwardExpose();
		const { disabled } = toRefs(props);
		const panelGroupContext = injectPanelGroupContext();
		if (panelGroupContext === null) throw new Error("PanelResizeHandle components must be rendered within a PanelGroup container");
		const { direction, groupId, registerResizeHandle: registerResizeHandleWithParentGroup, startDragging, stopDragging, panelGroupElement } = panelGroupContext;
		const resizeHandleId = useId(props.id, "reka-splitter-resize-handle");
		const state = ref("inactive");
		const isFocused = ref(false);
		const resizeHandler = ref(null);
		const { nonce: propNonce } = toRefs(props);
		const nonce = useNonce(propNonce);
		watch(disabled, () => {
			if (!isBrowser) return;
			if (disabled.value) resizeHandler.value = null;
			else resizeHandler.value = registerResizeHandleWithParentGroup(resizeHandleId);
		}, { immediate: true });
		watchEffect((onCleanup) => {
			if (disabled.value || resizeHandler.value === null) return;
			const element = currentElement.value;
			if (!element) return;
			assert(element);
			const setResizeHandlerState = (action, isActive, event) => {
				if (isActive) switch (action) {
					case "down":
						state.value = "drag";
						startDragging(resizeHandleId, event);
						emits("dragging", true);
						break;
					case "move":
						if (state.value !== "drag") state.value = "hover";
						resizeHandler.value?.(event);
						break;
					case "up":
						state.value = "hover";
						stopDragging();
						emits("dragging", false);
				}
				else state.value = "inactive";
			};
			onCleanup(registerResizeHandle(resizeHandleId, element, direction, {
				coarse: props.hitAreaMargins?.coarse ?? 15,
				fine: props.hitAreaMargins?.fine ?? 5
			}, nonce, setResizeHandlerState));
		});
		useWindowSplitterResizeHandlerBehavior({
			disabled,
			resizeHandler,
			handleId: resizeHandleId,
			panelGroupElement
		});
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), {
				id: unref(resizeHandleId),
				ref: unref(forwardRef),
				style: {
					touchAction: "none",
					userSelect: "none"
				},
				as: _ctx.as,
				"as-child": _ctx.asChild,
				role: "separator",
				"data-resize-handle": "",
				tabindex: _ctx.tabindex,
				"data-state": state.value,
				"data-disabled": unref(disabled) ? "" : void 0,
				"data-orientation": unref(direction),
				"data-panel-group-id": unref(groupId),
				"data-resize-handle-active": state.value === "drag" ? "pointer" : isFocused.value ? "keyboard" : void 0,
				"data-resize-handle-state": state.value,
				"data-panel-resize-handle-enabled": !unref(disabled),
				"data-panel-resize-handle-id": unref(resizeHandleId),
				onBlur: _cache[0] || (_cache[0] = ($event) => isFocused.value = false),
				onFocus: _cache[1] || (_cache[1] = ($event) => isFocused.value = false)
			}, {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 8, [
				"id",
				"as",
				"as-child",
				"tabindex",
				"data-state",
				"data-disabled",
				"data-orientation",
				"data-panel-group-id",
				"data-resize-handle-active",
				"data-resize-handle-state",
				"data-panel-resize-handle-enabled",
				"data-panel-resize-handle-id"
			]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/Switch/SwitchRoot.js
var [injectSwitchRootContext, provideSwitchRootContext] = createContext("SwitchRoot");
var SwitchRoot_default = /* @__PURE__ */ defineComponent({
	__name: "SwitchRoot",
	props: {
		defaultValue: {
			type: Boolean,
			required: false
		},
		modelValue: {
			type: [Boolean, null],
			required: false,
			default: void 0
		},
		disabled: {
			type: Boolean,
			required: false
		},
		id: {
			type: String,
			required: false
		},
		value: {
			type: String,
			required: false,
			default: "on"
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false,
			default: "button"
		},
		name: {
			type: String,
			required: false
		},
		required: {
			type: Boolean,
			required: false
		}
	},
	emits: ["update:modelValue"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emit = __emit;
		const { disabled } = toRefs(props);
		const modelValue = useVModel(props, "modelValue", emit, {
			defaultValue: props.defaultValue,
			passive: props.modelValue === void 0
		});
		function toggleCheck() {
			if (disabled.value) return;
			modelValue.value = !modelValue.value;
		}
		const { forwardRef, currentElement } = useForwardExpose();
		const isFormControl = useFormControl(currentElement);
		const ariaLabel = computed(() => props.id && currentElement.value ? document.querySelector(`[for="${props.id}"]`)?.innerText : void 0);
		provideSwitchRootContext({
			modelValue,
			toggleCheck,
			disabled
		});
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), mergeProps(_ctx.$attrs, {
				id: _ctx.id,
				ref: unref(forwardRef),
				role: "switch",
				type: _ctx.as === "button" ? "button" : void 0,
				value: _ctx.value,
				"aria-label": _ctx.$attrs["aria-label"] || ariaLabel.value,
				"aria-checked": unref(modelValue),
				"aria-required": _ctx.required,
				"data-state": unref(modelValue) ? "checked" : "unchecked",
				"data-disabled": unref(disabled) ? "" : void 0,
				"as-child": _ctx.asChild,
				as: _ctx.as,
				disabled: unref(disabled),
				onClick: toggleCheck,
				onKeydown: withKeys(withModifiers(toggleCheck, ["prevent"]), ["enter"])
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", { modelValue: unref(modelValue) }), unref(isFormControl) && _ctx.name ? (openBlock(), createBlock(unref(VisuallyHiddenInput_default), {
					key: 0,
					type: "checkbox",
					name: _ctx.name,
					disabled: unref(disabled),
					required: _ctx.required,
					value: _ctx.value,
					checked: !!unref(modelValue)
				}, null, 8, [
					"name",
					"disabled",
					"required",
					"value",
					"checked"
				])) : createCommentVNode("v-if", true)]),
				_: 3
			}, 16, [
				"id",
				"type",
				"value",
				"aria-label",
				"aria-checked",
				"aria-required",
				"data-state",
				"data-disabled",
				"as-child",
				"as",
				"disabled",
				"onKeydown"
			]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/Switch/SwitchThumb.js
var SwitchThumb_default = /* @__PURE__ */ defineComponent({
	__name: "SwitchThumb",
	props: {
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false,
			default: "span"
		}
	},
	setup(__props) {
		const rootContext = injectSwitchRootContext();
		useForwardExpose();
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), {
				"data-state": unref(rootContext).modelValue?.value ? "checked" : "unchecked",
				"data-disabled": unref(rootContext).disabled.value ? "" : void 0,
				"as-child": _ctx.asChild,
				as: _ctx.as
			}, {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 8, [
				"data-state",
				"data-disabled",
				"as-child",
				"as"
			]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/Tabs/TabsRoot.js
var [injectTabsRootContext, provideTabsRootContext] = createContext("TabsRoot");
var TabsRoot_default = /* @__PURE__ */ defineComponent({
	__name: "TabsRoot",
	props: {
		defaultValue: {
			type: null,
			required: false
		},
		orientation: {
			type: String,
			required: false,
			default: "horizontal"
		},
		dir: {
			type: String,
			required: false
		},
		activationMode: {
			type: String,
			required: false,
			default: "automatic"
		},
		modelValue: {
			type: null,
			required: false
		},
		unmountOnHide: {
			type: Boolean,
			required: false,
			default: true
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false
		}
	},
	emits: ["update:modelValue"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const { orientation, unmountOnHide, dir: propDir } = toRefs(props);
		const dir = useDirection(propDir);
		useForwardExpose();
		const modelValue = useVModel(props, "modelValue", emits, {
			defaultValue: props.defaultValue,
			passive: props.modelValue === void 0
		});
		const tabsList = ref();
		provideTabsRootContext({
			modelValue,
			changeModelValue: (value) => {
				modelValue.value = value;
			},
			orientation,
			dir,
			unmountOnHide,
			activationMode: props.activationMode,
			baseId: useId(void 0, "reka-tabs"),
			tabsList
		});
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), {
				dir: unref(dir),
				"data-orientation": unref(orientation),
				"as-child": _ctx.asChild,
				as: _ctx.as
			}, {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", { modelValue: unref(modelValue) })]),
				_: 3
			}, 8, [
				"dir",
				"data-orientation",
				"as-child",
				"as"
			]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/Tabs/utils.js
function makeTriggerId(baseId, value) {
	return `${baseId}-trigger-${value}`;
}
function makeContentId(baseId, value) {
	return `${baseId}-content-${value}`;
}
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/Tabs/TabsContent.js
var TabsContent_default = /* @__PURE__ */ defineComponent({
	__name: "TabsContent",
	props: {
		value: {
			type: [String, Number],
			required: true
		},
		forceMount: {
			type: Boolean,
			required: false
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false
		}
	},
	setup(__props) {
		const props = __props;
		const { forwardRef } = useForwardExpose();
		const rootContext = injectTabsRootContext();
		const triggerId = computed(() => makeTriggerId(rootContext.baseId, props.value));
		const contentId = computed(() => makeContentId(rootContext.baseId, props.value));
		const isSelected = computed(() => props.value === rootContext.modelValue.value);
		const isMountAnimationPreventedRef = ref(isSelected.value);
		onMounted(() => {
			requestAnimationFrame(() => {
				isMountAnimationPreventedRef.value = false;
			});
		});
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Presence_default), {
				present: _ctx.forceMount || isSelected.value,
				"force-mount": ""
			}, {
				default: withCtx(({ present }) => [createVNode(unref(Primitive), {
					id: contentId.value,
					ref: unref(forwardRef),
					"as-child": _ctx.asChild,
					as: _ctx.as,
					role: "tabpanel",
					"data-state": isSelected.value ? "active" : "inactive",
					"data-orientation": unref(rootContext).orientation.value,
					"aria-labelledby": triggerId.value,
					hidden: !present,
					tabindex: "0",
					style: normalizeStyle({ animationDuration: isMountAnimationPreventedRef.value ? "0s" : void 0 })
				}, {
					default: withCtx(() => [(unref(rootContext).unmountOnHide.value ? present : true) ? renderSlot(_ctx.$slots, "default", { key: 0 }) : createCommentVNode("v-if", true)]),
					_: 2
				}, 1032, [
					"id",
					"as-child",
					"as",
					"data-state",
					"data-orientation",
					"aria-labelledby",
					"hidden",
					"style"
				])]),
				_: 3
			}, 8, ["present"]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/Tabs/TabsList.js
var TabsList_default = /* @__PURE__ */ defineComponent({
	__name: "TabsList",
	props: {
		loop: {
			type: Boolean,
			required: false,
			default: true
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false
		}
	},
	setup(__props) {
		const { loop } = toRefs(__props);
		const { forwardRef, currentElement } = useForwardExpose();
		const context = injectTabsRootContext();
		context.tabsList = currentElement;
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(RovingFocusGroup_default), {
				"as-child": "",
				orientation: unref(context).orientation.value,
				dir: unref(context).dir.value,
				loop: unref(loop)
			}, {
				default: withCtx(() => [createVNode(unref(Primitive), {
					ref: unref(forwardRef),
					role: "tablist",
					"as-child": _ctx.asChild,
					as: _ctx.as,
					"aria-orientation": unref(context).orientation.value
				}, {
					default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
					_: 3
				}, 8, [
					"as-child",
					"as",
					"aria-orientation"
				])]),
				_: 3
			}, 8, [
				"orientation",
				"dir",
				"loop"
			]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/Tabs/TabsTrigger.js
var TabsTrigger_default = /* @__PURE__ */ defineComponent({
	__name: "TabsTrigger",
	props: {
		value: {
			type: [String, Number],
			required: true
		},
		disabled: {
			type: Boolean,
			required: false,
			default: false
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false,
			default: "button"
		}
	},
	setup(__props) {
		const props = __props;
		const { forwardRef } = useForwardExpose();
		const rootContext = injectTabsRootContext();
		const triggerId = computed(() => makeTriggerId(rootContext.baseId, props.value));
		const contentId = computed(() => makeContentId(rootContext.baseId, props.value));
		const isSelected = computed(() => props.value === rootContext.modelValue.value);
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(RovingFocusItem_default), {
				"as-child": "",
				focusable: !_ctx.disabled,
				active: isSelected.value
			}, {
				default: withCtx(() => [createVNode(unref(Primitive), {
					id: triggerId.value,
					ref: unref(forwardRef),
					role: "tab",
					type: _ctx.as === "button" ? "button" : void 0,
					as: _ctx.as,
					"as-child": _ctx.asChild,
					"aria-selected": isSelected.value ? "true" : "false",
					"aria-controls": contentId.value,
					"data-state": isSelected.value ? "active" : "inactive",
					disabled: _ctx.disabled,
					"data-disabled": _ctx.disabled ? "" : void 0,
					"data-orientation": unref(rootContext).orientation.value,
					onMousedown: _cache[0] || (_cache[0] = withModifiers((event) => {
						if (!_ctx.disabled && event.ctrlKey === false) unref(rootContext).changeModelValue(_ctx.value);
						else event.preventDefault();
					}, ["left"])),
					onKeydown: _cache[1] || (_cache[1] = withKeys(($event) => unref(rootContext).changeModelValue(_ctx.value), ["enter", "space"])),
					onFocus: _cache[2] || (_cache[2] = () => {
						const isAutomaticActivation = unref(rootContext).activationMode !== "manual";
						if (!isSelected.value && !_ctx.disabled && isAutomaticActivation) unref(rootContext).changeModelValue(_ctx.value);
					})
				}, {
					default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
					_: 3
				}, 8, [
					"id",
					"type",
					"as",
					"as-child",
					"aria-selected",
					"aria-controls",
					"data-state",
					"disabled",
					"data-disabled",
					"data-orientation"
				])]),
				_: 3
			}, 8, ["focusable", "active"]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/TagsInput/TagsInputRoot.js
var [injectTagsInputRootContext, provideTagsInputRootContext] = createContext("TagsInputRoot");
var TagsInputRoot_default = /* @__PURE__ */ defineComponent({
	__name: "TagsInputRoot",
	props: {
		modelValue: {
			type: [Array, null],
			required: false
		},
		defaultValue: {
			type: Array,
			required: false,
			default: () => []
		},
		addOnPaste: {
			type: Boolean,
			required: false
		},
		addOnTab: {
			type: Boolean,
			required: false
		},
		addOnBlur: {
			type: Boolean,
			required: false
		},
		duplicate: {
			type: Boolean,
			required: false
		},
		disabled: {
			type: Boolean,
			required: false
		},
		delimiter: {
			type: null,
			required: false,
			default: ","
		},
		dir: {
			type: String,
			required: false
		},
		max: {
			type: Number,
			required: false,
			default: 0
		},
		id: {
			type: String,
			required: false
		},
		convertValue: {
			type: Function,
			required: false
		},
		displayValue: {
			type: Function,
			required: false,
			default: (value) => value.toString()
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false
		},
		name: {
			type: String,
			required: false
		},
		required: {
			type: Boolean,
			required: false
		}
	},
	emits: [
		"update:modelValue",
		"invalid",
		"addTag",
		"removeTag"
	],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const { addOnPaste, disabled, delimiter, max, id, dir: propDir, addOnBlur, addOnTab } = toRefs(props);
		const dir = useDirection(propDir);
		const modelValue = useVModel(props, "modelValue", emits, {
			defaultValue: props.defaultValue,
			passive: true,
			deep: true
		});
		const { forwardRef, currentElement } = useForwardExpose();
		const { focused } = useFocusWithin(currentElement);
		const isFormControl = useFormControl(currentElement);
		const { getItems, CollectionSlot } = useCollection({ isProvider: true });
		const selectedElement = ref();
		const isInvalidInput = ref(false);
		const currentModelValue = computed(() => Array.isArray(modelValue.value) ? [...modelValue.value] : []);
		function handleRemoveTag(index) {
			if (index !== -1) {
				const collection = getItems().filter((i) => i.ref.dataset.disabled !== "");
				modelValue.value = modelValue.value.filter((_, i) => i !== index);
				emits("removeTag", collection[index].value);
			}
		}
		provideTagsInputRootContext({
			modelValue,
			onAddValue: (_payload) => {
				const array = [...currentModelValue.value];
				const modelValueIsObject = array.length > 0 && typeof array[0] === "object";
				const defaultValueIsObject = array.length > 0 && typeof props.defaultValue[0] === "object";
				if ((modelValueIsObject || defaultValueIsObject) && typeof props.convertValue !== "function") throw new Error("You must provide a `convertValue` function when using objects as values.");
				const payload = props.convertValue ? props.convertValue(_payload) : _payload;
				if (array.length >= max.value && !!max.value) {
					emits("invalid", payload);
					return false;
				}
				if (props.duplicate) {
					modelValue.value = [...array, payload];
					emits("addTag", payload);
					return true;
				} else if (!array.includes(payload)) {
					modelValue.value = [...array, payload];
					emits("addTag", payload);
					return true;
				} else isInvalidInput.value = true;
				emits("invalid", payload);
				return false;
			},
			onRemoveValue: handleRemoveTag,
			onInputKeydown: (event) => {
				const target = event.target;
				const collection = getItems().map((i) => i.ref).filter((i) => i.dataset.disabled !== "");
				if (!collection.length) return;
				const lastTag = collection.at(-1);
				switch (event.key) {
					case "Delete":
					case "Backspace":
						if (target.selectionStart !== 0 || target.selectionEnd !== 0) break;
						if (selectedElement.value) {
							const index = collection.findIndex((i) => i === selectedElement.value);
							handleRemoveTag(index);
							selectedElement.value = selectedElement.value === lastTag ? collection.at(index - 1) : collection.at(index + 1);
							event.preventDefault();
						} else if (event.key === "Backspace") {
							selectedElement.value = lastTag;
							event.preventDefault();
						}
						break;
					case "Home":
					case "End":
					case "ArrowRight":
					case "ArrowLeft": {
						const isArrowRight = event.key === "ArrowRight" && dir.value === "ltr" || event.key === "ArrowLeft" && dir.value === "rtl";
						const isArrowLeft = !isArrowRight;
						if (target.selectionStart !== 0 || target.selectionEnd !== 0) break;
						if (isArrowLeft && !selectedElement.value) {
							selectedElement.value = lastTag;
							event.preventDefault();
						} else if (isArrowRight && lastTag && selectedElement.value === lastTag) {
							selectedElement.value = void 0;
							event.preventDefault();
						} else if (selectedElement.value) {
							const el = useArrowNavigation(event, selectedElement.value, void 0, {
								itemsArray: collection,
								loop: false,
								dir: dir.value
							});
							if (el) selectedElement.value = el;
							event.preventDefault();
						}
						break;
					}
					case "ArrowUp":
					case "ArrowDown":
						if (selectedElement.value) event.preventDefault();
						break;
					default: selectedElement.value = void 0;
				}
			},
			selectedElement,
			isInvalidInput,
			addOnPaste,
			addOnBlur,
			addOnTab,
			dir,
			disabled,
			delimiter,
			max,
			id,
			displayValue: props.displayValue
		});
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(CollectionSlot), null, {
				default: withCtx(() => [createVNode(unref(Primitive), {
					ref: unref(forwardRef),
					dir: unref(dir),
					as: _ctx.as,
					"as-child": _ctx.asChild,
					"data-invalid": isInvalidInput.value ? "" : void 0,
					"data-disabled": unref(disabled) ? "" : void 0,
					"data-focused": unref(focused) ? "" : void 0
				}, {
					default: withCtx(() => [renderSlot(_ctx.$slots, "default", { modelValue: unref(modelValue) }), unref(isFormControl) && _ctx.name ? (openBlock(), createBlock(unref(VisuallyHiddenInput_default), {
						key: 0,
						name: _ctx.name,
						value: unref(modelValue),
						required: _ctx.required,
						disabled: unref(disabled)
					}, null, 8, [
						"name",
						"value",
						"required",
						"disabled"
					])) : createCommentVNode("v-if", true)]),
					_: 3
				}, 8, [
					"dir",
					"as",
					"as-child",
					"data-invalid",
					"data-disabled",
					"data-focused"
				])]),
				_: 3
			});
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/TagsInput/TagsInputInput.js
var TagsInputInput_default = /* @__PURE__ */ defineComponent({
	__name: "TagsInputInput",
	props: {
		placeholder: {
			type: String,
			required: false
		},
		autoFocus: {
			type: Boolean,
			required: false
		},
		maxLength: {
			type: Number,
			required: false
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false,
			default: "input"
		}
	},
	setup(__props) {
		const props = __props;
		const context = injectTagsInputRootContext();
		const { forwardRef, currentElement } = useForwardExpose();
		function handleBlur(event) {
			context.selectedElement.value = void 0;
			if (!context.addOnBlur.value) return;
			const target = event.target;
			if (!target.value) return;
			if (context.onAddValue(target.value)) target.value = "";
		}
		function handleTab(event) {
			if (!context.addOnTab.value) return;
			handleCustomKeydown(event);
		}
		const isComposing = ref(false);
		function onCompositionStart() {
			isComposing.value = true;
		}
		function onCompositionEnd() {
			nextTick(() => {
				isComposing.value = false;
			});
		}
		async function handleCustomKeydown(event) {
			if (isComposing.value) return;
			await nextTick();
			if (event.defaultPrevented) return;
			const target = event.target;
			if (!target.value) return;
			if (context.onAddValue(target.value)) target.value = "";
			event.preventDefault();
		}
		function handleInput(event) {
			context.isInvalidInput.value = false;
			if (event.data === null) return;
			const delimiter = context.delimiter.value;
			if (delimiter === event.data || delimiter instanceof RegExp && delimiter.test(event.data)) {
				const target = event.target;
				target.value = target.value.replace(delimiter, "");
				if (target.value.trim() === "") {
					target.value = "";
					return;
				}
				if (context.onAddValue(target.value)) target.value = "";
			}
		}
		function handlePaste(event) {
			if (context.addOnPaste.value) {
				event.preventDefault();
				const clipboardData = event.clipboardData;
				if (!clipboardData) return;
				const value = clipboardData.getData("text");
				if (context.delimiter.value) value.split(context.delimiter.value).forEach((v) => {
					context.onAddValue(v);
				});
				else context.onAddValue(value);
			}
		}
		onMounted(() => {
			const inputEl = currentElement.value.nodeName === "INPUT" ? currentElement.value : currentElement.value.querySelector("input");
			if (!inputEl) return;
			setTimeout(() => {
				if (props.autoFocus) inputEl?.focus();
			}, 1);
		});
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), {
				id: unref(context).id?.value,
				ref: unref(forwardRef),
				type: "text",
				autocomplete: "off",
				autocorrect: "off",
				autocapitalize: "off",
				as: _ctx.as,
				"as-child": _ctx.asChild,
				maxlength: _ctx.maxLength,
				placeholder: _ctx.placeholder,
				disabled: unref(context).disabled.value,
				"data-invalid": unref(context).isInvalidInput.value ? "" : void 0,
				onInput: handleInput,
				onKeydown: [
					withKeys(handleCustomKeydown, ["enter"]),
					withKeys(handleTab, ["tab"]),
					unref(context).onInputKeydown
				],
				onBlur: handleBlur,
				onCompositionstart: onCompositionStart,
				onCompositionend: onCompositionEnd,
				onPaste: handlePaste
			}, {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 8, [
				"id",
				"as",
				"as-child",
				"maxlength",
				"placeholder",
				"disabled",
				"data-invalid",
				"onKeydown"
			]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/TagsInput/TagsInputItem.js
var [injectTagsInputItemContext, provideTagsInputItemContext] = createContext("TagsInputItem");
var TagsInputItem_default = /* @__PURE__ */ defineComponent({
	__name: "TagsInputItem",
	props: {
		value: {
			type: null,
			required: true
		},
		disabled: {
			type: Boolean,
			required: false
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false
		}
	},
	setup(__props) {
		const props = __props;
		const { value } = toRefs(props);
		const context = injectTagsInputRootContext();
		const { forwardRef, currentElement } = useForwardExpose();
		const { CollectionItem } = useCollection();
		const isSelected = computed(() => context.selectedElement.value === currentElement.value);
		const disabled = computed(() => props.disabled || context.disabled.value);
		const itemContext = provideTagsInputItemContext({
			value,
			isSelected,
			disabled,
			textId: "",
			displayValue: computed(() => context.displayValue(value.value))
		});
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(CollectionItem), { value: unref(value) }, {
				default: withCtx(() => [createVNode(unref(Primitive), {
					ref: unref(forwardRef),
					as: _ctx.as,
					"as-child": _ctx.asChild,
					"aria-labelledby": unref(itemContext).textId,
					"aria-current": isSelected.value,
					"data-disabled": disabled.value ? "" : void 0,
					"data-state": isSelected.value ? "active" : "inactive"
				}, {
					default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
					_: 3
				}, 8, [
					"as",
					"as-child",
					"aria-labelledby",
					"aria-current",
					"data-disabled",
					"data-state"
				])]),
				_: 3
			}, 8, ["value"]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/TagsInput/TagsInputItemDelete.js
var TagsInputItemDelete_default = /* @__PURE__ */ defineComponent({
	__name: "TagsInputItemDelete",
	props: {
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false,
			default: "button"
		}
	},
	setup(__props) {
		const props = __props;
		useForwardExpose();
		const context = injectTagsInputRootContext();
		const itemContext = injectTagsInputItemContext();
		const disabled = computed(() => itemContext.disabled?.value || context.disabled.value);
		function handleDelete() {
			if (disabled.value) return;
			const index = context.modelValue.value.findIndex((i) => isEqual(i, itemContext.value.value));
			context.onRemoveValue(index);
		}
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), mergeProps({ tabindex: "-1" }, props, {
				"aria-labelledby": unref(itemContext).textId,
				"aria-current": unref(itemContext).isSelected.value,
				"data-state": unref(itemContext).isSelected.value ? "active" : "inactive",
				"data-disabled": disabled.value ? "" : void 0,
				type: _ctx.as === "button" ? "button" : void 0,
				onClick: handleDelete
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16, [
				"aria-labelledby",
				"aria-current",
				"data-state",
				"data-disabled",
				"type"
			]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/TagsInput/TagsInputItemText.js
var TagsInputItemText_default = /* @__PURE__ */ defineComponent({
	__name: "TagsInputItemText",
	props: {
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false,
			default: "span"
		}
	},
	setup(__props) {
		const props = __props;
		const itemContext = injectTagsInputItemContext();
		useForwardExpose();
		itemContext.textId ||= useId(void 0, "reka-tags-input-item-text");
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), mergeProps(props, { id: unref(itemContext).textId }), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", {}, () => [createTextVNode(toDisplayString(unref(itemContext).displayValue.value), 1)])]),
				_: 3
			}, 16, ["id"]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/ToggleGroup/ToggleGroupRoot.js
var [injectToggleGroupRootContext, provideToggleGroupRootContext] = createContext("ToggleGroupRoot");
var ToggleGroupRoot_default = /* @__PURE__ */ defineComponent({
	__name: "ToggleGroupRoot",
	props: {
		rovingFocus: {
			type: Boolean,
			required: false,
			default: true
		},
		disabled: {
			type: Boolean,
			required: false,
			default: false
		},
		orientation: {
			type: String,
			required: false
		},
		dir: {
			type: String,
			required: false
		},
		loop: {
			type: Boolean,
			required: false,
			default: true
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false
		},
		name: {
			type: String,
			required: false
		},
		required: {
			type: Boolean,
			required: false
		},
		type: {
			type: String,
			required: false
		},
		modelValue: {
			type: null,
			required: false
		},
		defaultValue: {
			type: null,
			required: false
		}
	},
	emits: ["update:modelValue"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const { loop, rovingFocus, disabled, dir: propDir } = toRefs(props);
		const dir = useDirection(propDir);
		const { forwardRef, currentElement } = useForwardExpose();
		const { modelValue, changeModelValue, isSingle } = useSingleOrMultipleValue(props, emits);
		const isFormControl = useFormControl(currentElement);
		provideToggleGroupRootContext({
			isSingle,
			modelValue,
			changeModelValue,
			dir,
			orientation: props.orientation,
			loop,
			rovingFocus,
			disabled
		});
		return (_ctx, _cache) => {
			return openBlock(), createBlock(resolveDynamicComponent(unref(rovingFocus) ? unref(RovingFocusGroup_default) : unref(Primitive)), {
				"as-child": "",
				orientation: unref(rovingFocus) ? _ctx.orientation : void 0,
				dir: unref(dir),
				loop: unref(rovingFocus) ? unref(loop) : void 0
			}, {
				default: withCtx(() => [createVNode(unref(Primitive), {
					ref: unref(forwardRef),
					role: "group",
					"as-child": _ctx.asChild,
					as: _ctx.as
				}, {
					default: withCtx(() => [renderSlot(_ctx.$slots, "default", { modelValue: unref(modelValue) }), unref(isFormControl) && _ctx.name ? (openBlock(), createBlock(VisuallyHiddenInput_default, {
						key: 0,
						name: _ctx.name,
						required: _ctx.required,
						value: unref(modelValue)
					}, null, 8, [
						"name",
						"required",
						"value"
					])) : createCommentVNode("v-if", true)]),
					_: 3
				}, 8, ["as-child", "as"])]),
				_: 3
			}, 8, [
				"orientation",
				"dir",
				"loop"
			]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/Toggle/Toggle.js
var Toggle_default = /* @__PURE__ */ defineComponent({
	__name: "Toggle",
	props: {
		defaultValue: {
			type: Boolean,
			required: false
		},
		modelValue: {
			type: [Boolean, null],
			required: false,
			default: void 0
		},
		disabled: {
			type: Boolean,
			required: false,
			default: false
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false,
			default: "button"
		},
		name: {
			type: String,
			required: false
		},
		required: {
			type: Boolean,
			required: false
		}
	},
	emits: ["update:modelValue"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const { forwardRef, currentElement } = useForwardExpose();
		const toggleGroupContext = injectToggleGroupRootContext(null);
		const modelValue = useVModel(props, "modelValue", emits, {
			defaultValue: props.defaultValue,
			passive: props.modelValue === void 0
		});
		function togglePressed() {
			modelValue.value = !modelValue.value;
		}
		const dataState = computed(() => {
			return modelValue.value ? "on" : "off";
		});
		const isFormControl = useFormControl(currentElement);
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Primitive), {
				ref: unref(forwardRef),
				type: _ctx.as === "button" ? "button" : void 0,
				"as-child": props.asChild,
				as: _ctx.as,
				"aria-pressed": unref(modelValue),
				"data-state": dataState.value,
				"data-disabled": _ctx.disabled ? "" : void 0,
				disabled: _ctx.disabled,
				onClick: togglePressed
			}, {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", {
					modelValue: unref(modelValue),
					disabled: _ctx.disabled,
					pressed: unref(modelValue),
					state: dataState.value
				}), unref(isFormControl) && _ctx.name && !unref(toggleGroupContext) ? (openBlock(), createBlock(VisuallyHiddenInput_default, {
					key: 0,
					type: "checkbox",
					name: _ctx.name,
					value: unref(modelValue),
					required: _ctx.required
				}, null, 8, [
					"name",
					"value",
					"required"
				])) : createCommentVNode("v-if", true)]),
				_: 3
			}, 8, [
				"type",
				"as-child",
				"as",
				"aria-pressed",
				"data-state",
				"data-disabled",
				"disabled"
			]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/ToggleGroup/ToggleGroupItem.js
var ToggleGroupItem_default = /* @__PURE__ */ defineComponent({
	__name: "ToggleGroupItem",
	props: {
		value: {
			type: null,
			required: true
		},
		disabled: {
			type: Boolean,
			required: false
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false,
			default: "button"
		}
	},
	setup(__props) {
		const props = __props;
		const rootContext = injectToggleGroupRootContext();
		const disabled = computed(() => rootContext.disabled?.value || props.disabled);
		const pressed = computed(() => isValueEqualOrExist(rootContext.modelValue.value, props.value));
		const { forwardRef } = useForwardExpose();
		return (_ctx, _cache) => {
			return openBlock(), createBlock(resolveDynamicComponent(unref(rootContext).rovingFocus.value ? unref(RovingFocusItem_default) : unref(Primitive)), mergeProps({ "as-child": "" }, unref(rootContext).rovingFocus.value ? {
				focusable: !disabled.value,
				active: pressed.value
			} : {}), {
				default: withCtx(() => [createVNode(unref(Toggle_default), mergeProps(props, {
					ref: unref(forwardRef),
					disabled: disabled.value,
					"model-value": pressed.value,
					"onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => unref(rootContext).changeModelValue(_ctx.value))
				}), {
					default: withCtx((slotProps) => [renderSlot(_ctx.$slots, "default", normalizeProps(guardReactiveProps(slotProps)))]),
					_: 3
				}, 16, ["disabled", "model-value"])]),
				_: 3
			}, 16);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/Tooltip/TooltipArrow.js
var TooltipArrow_default = /* @__PURE__ */ defineComponent({
	__name: "TooltipArrow",
	props: {
		width: {
			type: Number,
			required: false,
			default: 10
		},
		height: {
			type: Number,
			required: false,
			default: 5
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false,
			default: "svg"
		}
	},
	setup(__props) {
		const props = __props;
		useForwardExpose();
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(PopperArrow_default), normalizeProps(guardReactiveProps(props)), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/Tooltip/TooltipProvider.js
var [injectTooltipProviderContext, provideTooltipProviderContext] = createContext("TooltipProvider");
var TooltipProvider_default = /* @__PURE__ */ defineComponent({
	inheritAttrs: false,
	__name: "TooltipProvider",
	props: {
		delayDuration: {
			type: Number,
			required: false,
			default: 700
		},
		skipDelayDuration: {
			type: Number,
			required: false,
			default: 300
		},
		disableHoverableContent: {
			type: Boolean,
			required: false,
			default: false
		},
		disableClosingTrigger: {
			type: Boolean,
			required: false
		},
		disabled: {
			type: Boolean,
			required: false
		},
		ignoreNonKeyboardFocus: {
			type: Boolean,
			required: false,
			default: false
		}
	},
	setup(__props) {
		const { delayDuration, skipDelayDuration, disableHoverableContent, disableClosingTrigger, ignoreNonKeyboardFocus, disabled } = toRefs(__props);
		useForwardExpose();
		const isOpenDelayed = ref(true);
		const isPointerInTransitRef = ref(false);
		const { start: startTimer, stop: clearTimer } = useTimeoutFn(() => {
			isOpenDelayed.value = true;
		}, skipDelayDuration, { immediate: false });
		provideTooltipProviderContext({
			isOpenDelayed,
			delayDuration,
			onOpen() {
				clearTimer();
				isOpenDelayed.value = false;
			},
			onClose() {
				startTimer();
			},
			isPointerInTransitRef,
			disableHoverableContent,
			disableClosingTrigger,
			disabled,
			ignoreNonKeyboardFocus
		});
		return (_ctx, _cache) => {
			return renderSlot(_ctx.$slots, "default");
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/Tooltip/utils.js
var TOOLTIP_OPEN = "tooltip.open";
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/Tooltip/TooltipRoot.js
var [injectTooltipRootContext, provideTooltipRootContext] = createContext("TooltipRoot");
var TooltipRoot_default = /* @__PURE__ */ defineComponent({
	__name: "TooltipRoot",
	props: {
		defaultOpen: {
			type: Boolean,
			required: false,
			default: false
		},
		open: {
			type: Boolean,
			required: false,
			default: void 0
		},
		delayDuration: {
			type: Number,
			required: false,
			default: void 0
		},
		disableHoverableContent: {
			type: Boolean,
			required: false,
			default: void 0
		},
		disableClosingTrigger: {
			type: Boolean,
			required: false,
			default: void 0
		},
		disabled: {
			type: Boolean,
			required: false,
			default: void 0
		},
		ignoreNonKeyboardFocus: {
			type: Boolean,
			required: false,
			default: void 0
		}
	},
	emits: ["update:open"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emit = __emit;
		useForwardExpose();
		const providerContext = injectTooltipProviderContext();
		const disableHoverableContent = computed(() => props.disableHoverableContent ?? providerContext.disableHoverableContent.value);
		const disableClosingTrigger = computed(() => props.disableClosingTrigger ?? providerContext.disableClosingTrigger.value);
		const disableTooltip = computed(() => props.disabled ?? providerContext.disabled.value);
		const delayDuration = computed(() => props.delayDuration ?? providerContext.delayDuration.value);
		const ignoreNonKeyboardFocus = computed(() => props.ignoreNonKeyboardFocus ?? providerContext.ignoreNonKeyboardFocus.value);
		const open = useVModel(props, "open", emit, {
			defaultValue: props.defaultOpen,
			passive: props.open === void 0
		});
		watch(open, (isOpen) => {
			if (!providerContext.onClose) return;
			if (isOpen) {
				providerContext.onOpen();
				document.dispatchEvent(new CustomEvent(TOOLTIP_OPEN));
			} else providerContext.onClose();
		});
		const wasOpenDelayedRef = ref(false);
		const trigger = ref();
		const stateAttribute = computed(() => {
			if (!open.value) return "closed";
			return wasOpenDelayedRef.value ? "delayed-open" : "instant-open";
		});
		const { start: startTimer, stop: clearTimer } = useTimeoutFn(() => {
			wasOpenDelayedRef.value = true;
			open.value = true;
		}, delayDuration, { immediate: false });
		function handleOpen() {
			clearTimer();
			wasOpenDelayedRef.value = false;
			open.value = true;
		}
		function handleClose() {
			clearTimer();
			open.value = false;
		}
		function handleDelayedOpen() {
			startTimer();
		}
		provideTooltipRootContext({
			contentId: "",
			open,
			stateAttribute,
			trigger,
			onTriggerChange(el) {
				trigger.value = el;
			},
			onTriggerEnter() {
				if (providerContext.isOpenDelayed.value) handleDelayedOpen();
				else handleOpen();
			},
			onTriggerLeave() {
				if (disableHoverableContent.value) handleClose();
				else clearTimer();
			},
			onOpen: handleOpen,
			onClose: handleClose,
			disableHoverableContent,
			disableClosingTrigger,
			disabled: disableTooltip,
			ignoreNonKeyboardFocus
		});
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(PopperRoot_default), null, {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", { open: unref(open) })]),
				_: 3
			});
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/Tooltip/TooltipContentImpl.js
var TooltipContentImpl_default = /* @__PURE__ */ defineComponent({
	__name: "TooltipContentImpl",
	props: {
		ariaLabel: {
			type: String,
			required: false
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false
		},
		side: {
			type: null,
			required: false,
			default: "top"
		},
		sideOffset: {
			type: Number,
			required: false,
			default: 0
		},
		align: {
			type: null,
			required: false,
			default: "center"
		},
		alignOffset: {
			type: Number,
			required: false
		},
		avoidCollisions: {
			type: Boolean,
			required: false,
			default: true
		},
		collisionBoundary: {
			type: null,
			required: false,
			default: () => []
		},
		collisionPadding: {
			type: [Number, Object],
			required: false,
			default: 0
		},
		arrowPadding: {
			type: Number,
			required: false,
			default: 0
		},
		sticky: {
			type: String,
			required: false,
			default: "partial"
		},
		hideWhenDetached: {
			type: Boolean,
			required: false,
			default: false
		},
		positionStrategy: {
			type: String,
			required: false
		},
		updatePositionStrategy: {
			type: String,
			required: false
		}
	},
	emits: ["escapeKeyDown", "pointerDownOutside"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const rootContext = injectTooltipRootContext();
		const { forwardRef, currentElement } = useForwardExpose();
		const ariaLabel = computed(() => props.ariaLabel || currentElement.value?.textContent);
		const popperContentProps = computed(() => {
			const { ariaLabel: _, ...restProps } = props;
			return restProps;
		});
		onMounted(() => {
			useEventListener(window, "scroll", (event) => {
				if (event.target?.contains(rootContext.trigger.value)) rootContext.onClose();
			});
			useEventListener(window, TOOLTIP_OPEN, rootContext.onClose);
		});
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(DismissableLayer_default), {
				"as-child": "",
				"disable-outside-pointer-events": false,
				onEscapeKeyDown: _cache[0] || (_cache[0] = ($event) => emits("escapeKeyDown", $event)),
				onPointerDownOutside: _cache[1] || (_cache[1] = (event) => {
					if (unref(rootContext).disableClosingTrigger.value && unref(rootContext).trigger.value?.contains(event.target)) event.preventDefault();
					emits("pointerDownOutside", event);
				}),
				onFocusOutside: _cache[2] || (_cache[2] = withModifiers(() => {}, ["prevent"])),
				onDismiss: _cache[3] || (_cache[3] = ($event) => unref(rootContext).onClose())
			}, {
				default: withCtx(() => [createVNode(unref(PopperContent_default), mergeProps({
					ref: unref(forwardRef),
					"data-state": unref(rootContext).stateAttribute.value
				}, {
					..._ctx.$attrs,
					...popperContentProps.value
				}, { style: {
					"--reka-tooltip-content-transform-origin": "var(--reka-popper-transform-origin)",
					"--reka-tooltip-content-available-width": "var(--reka-popper-available-width)",
					"--reka-tooltip-content-available-height": "var(--reka-popper-available-height)",
					"--reka-tooltip-trigger-width": "var(--reka-popper-anchor-width)",
					"--reka-tooltip-trigger-height": "var(--reka-popper-anchor-height)"
				} }), {
					default: withCtx(() => [renderSlot(_ctx.$slots, "default"), createVNode(unref(VisuallyHidden_default), {
						id: unref(rootContext).contentId,
						role: "tooltip"
					}, {
						default: withCtx(() => [createTextVNode(toDisplayString(ariaLabel.value), 1)]),
						_: 1
					}, 8, ["id"])]),
					_: 3
				}, 16, ["data-state"])]),
				_: 3
			});
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/Tooltip/TooltipContentHoverable.js
var TooltipContentHoverable_default = /* @__PURE__ */ defineComponent({
	__name: "TooltipContentHoverable",
	props: {
		ariaLabel: {
			type: String,
			required: false
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false
		},
		side: {
			type: null,
			required: false
		},
		sideOffset: {
			type: Number,
			required: false
		},
		align: {
			type: null,
			required: false
		},
		alignOffset: {
			type: Number,
			required: false
		},
		avoidCollisions: {
			type: Boolean,
			required: false
		},
		collisionBoundary: {
			type: null,
			required: false
		},
		collisionPadding: {
			type: [Number, Object],
			required: false
		},
		arrowPadding: {
			type: Number,
			required: false
		},
		sticky: {
			type: String,
			required: false
		},
		hideWhenDetached: {
			type: Boolean,
			required: false
		},
		positionStrategy: {
			type: String,
			required: false
		},
		updatePositionStrategy: {
			type: String,
			required: false
		}
	},
	setup(__props) {
		const forwardedProps = useForwardProps(__props);
		const { forwardRef, currentElement } = useForwardExpose();
		const { trigger, onClose } = injectTooltipRootContext();
		const providerContext = injectTooltipProviderContext();
		const { isPointerInTransit, onPointerExit } = useGraceArea(trigger, currentElement);
		providerContext.isPointerInTransitRef = isPointerInTransit;
		onPointerExit(() => {
			onClose();
		});
		return (_ctx, _cache) => {
			return openBlock(), createBlock(TooltipContentImpl_default, mergeProps({ ref: unref(forwardRef) }, unref(forwardedProps)), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/Tooltip/TooltipContent.js
var TooltipContent_default = /* @__PURE__ */ defineComponent({
	__name: "TooltipContent",
	props: {
		forceMount: {
			type: Boolean,
			required: false
		},
		ariaLabel: {
			type: String,
			required: false
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false
		},
		side: {
			type: null,
			required: false,
			default: "top"
		},
		sideOffset: {
			type: Number,
			required: false
		},
		align: {
			type: null,
			required: false
		},
		alignOffset: {
			type: Number,
			required: false
		},
		avoidCollisions: {
			type: Boolean,
			required: false
		},
		collisionBoundary: {
			type: null,
			required: false
		},
		collisionPadding: {
			type: [Number, Object],
			required: false
		},
		arrowPadding: {
			type: Number,
			required: false
		},
		sticky: {
			type: String,
			required: false
		},
		hideWhenDetached: {
			type: Boolean,
			required: false
		},
		positionStrategy: {
			type: String,
			required: false
		},
		updatePositionStrategy: {
			type: String,
			required: false
		}
	},
	emits: ["escapeKeyDown", "pointerDownOutside"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const rootContext = injectTooltipRootContext();
		const forwarded = useForwardPropsEmits(props, emits);
		const { forwardRef } = useForwardExpose();
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Presence_default), { present: _ctx.forceMount || unref(rootContext).open.value }, {
				default: withCtx(() => [(openBlock(), createBlock(resolveDynamicComponent(unref(rootContext).disableHoverableContent.value ? TooltipContentImpl_default : TooltipContentHoverable_default), mergeProps({ ref: unref(forwardRef) }, unref(forwarded)), {
					default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
					_: 3
				}, 16))]),
				_: 3
			}, 8, ["present"]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/Tooltip/TooltipPortal.js
var TooltipPortal_default = /* @__PURE__ */ defineComponent({
	__name: "TooltipPortal",
	props: {
		to: {
			type: null,
			required: false
		},
		disabled: {
			type: Boolean,
			required: false
		},
		defer: {
			type: Boolean,
			required: false
		},
		forceMount: {
			type: Boolean,
			required: false
		}
	},
	setup(__props) {
		const props = __props;
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(Teleport_default), normalizeProps(guardReactiveProps(props)), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/Tooltip/TooltipTrigger.js
var TooltipTrigger_default = /* @__PURE__ */ defineComponent({
	__name: "TooltipTrigger",
	props: {
		reference: {
			type: null,
			required: false
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false,
			default: "button"
		}
	},
	setup(__props) {
		const props = __props;
		const rootContext = injectTooltipRootContext();
		const providerContext = injectTooltipProviderContext();
		rootContext.contentId ||= useId(void 0, "reka-tooltip-content");
		const { forwardRef, currentElement: triggerElement } = useForwardExpose();
		const isPointerDown = ref(false);
		const hasPointerMoveOpened = ref(false);
		const tooltipListeners = computed(() => {
			if (rootContext.disabled.value) return {};
			return {
				click: handleClick,
				focus: handleFocus,
				pointermove: handlePointerMove,
				pointerleave: handlePointerLeave,
				pointerdown: handlePointerDown,
				blur: handleBlur
			};
		});
		onMounted(() => {
			rootContext.onTriggerChange(triggerElement.value);
		});
		function handlePointerUp() {
			setTimeout(() => {
				isPointerDown.value = false;
			}, 1);
		}
		function handlePointerDown() {
			if (rootContext.open && !rootContext.disableClosingTrigger.value) rootContext.onClose();
			isPointerDown.value = true;
			document.addEventListener("pointerup", handlePointerUp, { once: true });
		}
		function handlePointerMove(event) {
			if (event.pointerType === "touch") return;
			if (!hasPointerMoveOpened.value && !providerContext.isPointerInTransitRef.value) {
				rootContext.onTriggerEnter();
				hasPointerMoveOpened.value = true;
			}
		}
		function handlePointerLeave() {
			rootContext.onTriggerLeave();
			hasPointerMoveOpened.value = false;
		}
		function handleFocus(event) {
			if (isPointerDown.value) return;
			if (rootContext.ignoreNonKeyboardFocus.value && !event.target.matches?.(":focus-visible")) return;
			rootContext.onOpen();
		}
		function handleBlur() {
			rootContext.onClose();
		}
		function handleClick() {
			if (!rootContext.disableClosingTrigger.value) rootContext.onClose();
		}
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(PopperAnchor_default), {
				"as-child": "",
				reference: _ctx.reference
			}, {
				default: withCtx(() => [createVNode(unref(Primitive), mergeProps({
					ref: unref(forwardRef),
					"aria-describedby": unref(rootContext).open.value ? unref(rootContext).contentId : void 0,
					"data-state": unref(rootContext).stateAttribute.value,
					as: _ctx.as,
					"as-child": props.asChild,
					"data-grace-area-trigger": ""
				}, toHandlers(tooltipListeners.value)), {
					default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
					_: 3
				}, 16, [
					"aria-describedby",
					"data-state",
					"as",
					"as-child"
				])]),
				_: 3
			}, 8, ["reference"]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/Tree/utils.js
function flatten(items) {
	return items.reduce((acc, item) => {
		acc.push(item);
		if (item.children) acc.push(...flatten(item.children));
		return acc;
	}, []);
}
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/Tree/TreeRoot.js
var [injectTreeRootContext, provideTreeRootContext] = createContext("TreeRoot");
var TreeRoot_default = /* @__PURE__ */ defineComponent({
	__name: "TreeRoot",
	props: {
		modelValue: {
			type: null,
			required: false
		},
		defaultValue: {
			type: null,
			required: false
		},
		items: {
			type: Array,
			required: false
		},
		expanded: {
			type: Array,
			required: false
		},
		defaultExpanded: {
			type: Array,
			required: false
		},
		getKey: {
			type: Function,
			required: true
		},
		getChildren: {
			type: Function,
			required: false,
			default: (val) => val.children
		},
		selectionBehavior: {
			type: String,
			required: false,
			default: "toggle"
		},
		multiple: {
			type: Boolean,
			required: false,
			skipCheck: true
		},
		dir: {
			type: String,
			required: false
		},
		disabled: {
			type: Boolean,
			required: false
		},
		propagateSelect: {
			type: Boolean,
			required: false
		},
		bubbleSelect: {
			type: Boolean,
			required: false
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false,
			default: "ul"
		}
	},
	emits: ["update:modelValue", "update:expanded"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const { items, multiple, disabled, propagateSelect, dir: propDir, bubbleSelect } = toRefs(props);
		const { handleTypeaheadSearch } = useTypeahead();
		const dir = useDirection(propDir);
		const rovingFocusGroupRef = ref();
		const isVirtual = ref(false);
		const virtualKeydownHook = createEventHook();
		const modelValue = useVModel(props, "modelValue", emits, {
			defaultValue: props.defaultValue ?? (multiple.value ? [] : void 0),
			passive: true,
			deep: true
		});
		const expanded = useVModel(props, "expanded", emits, {
			defaultValue: props.defaultExpanded ?? [],
			passive: props.expanded === void 0,
			deep: true
		});
		const { onSelectItem, handleMultipleReplace } = useSelectionBehavior(modelValue, props);
		const selectedKeys = computed(() => {
			if (multiple.value && Array.isArray(modelValue.value)) return modelValue.value.map((i) => props.getKey(i));
			else return [props.getKey(modelValue.value ?? {})];
		});
		function flattenItems(items$1, level = 1, parentItem) {
			return items$1.reduce((acc, item, index) => {
				const key = props.getKey(item);
				const children = props.getChildren(item);
				const isExpanded = expanded.value.includes(key);
				const flattenedItem = {
					_id: key,
					value: item,
					index,
					level,
					parentItem,
					hasChildren: !!children,
					bind: {
						"value": item,
						level,
						"aria-setsize": items$1.length,
						"aria-posinset": index + 1
					}
				};
				acc.push(flattenedItem);
				if (children && isExpanded) acc.push(...flattenItems(children, level + 1, item));
				return acc;
			}, []);
		}
		const expandedItems = computed(() => {
			const items$1 = props.items;
			expanded.value.map((i) => i);
			return flattenItems(items$1 ?? []);
		});
		function handleKeydown(event) {
			if (isVirtual.value) virtualKeydownHook.trigger(event);
			else {
				const collections = rovingFocusGroupRef.value?.getItems() ?? [];
				handleTypeaheadSearch(event.key, collections);
			}
		}
		function handleKeydownNavigation(event) {
			if (isVirtual.value) return;
			const intent = MAP_KEY_TO_FOCUS_INTENT[event.key];
			nextTick(() => {
				handleMultipleReplace(intent, getActiveElement(), rovingFocusGroupRef.value?.getItems, expandedItems.value.map((i) => i.value));
			});
		}
		function handleBubbleSelect(item) {
			if (item.parentItem != null && Array.isArray(modelValue.value) && props.multiple) {
				const parentItem = expandedItems.value.find((i) => {
					return item.parentItem != null && props.getKey(i.value) === props.getKey(item.parentItem);
				});
				if (parentItem != null) {
					if (props.getChildren(parentItem.value)?.every((i) => modelValue.value.find((v) => props.getKey(v) === props.getKey(i)))) modelValue.value = [...modelValue.value, parentItem.value];
					else modelValue.value = modelValue.value.filter((v) => props.getKey(v) !== props.getKey(parentItem.value));
					handleBubbleSelect(parentItem);
				}
			}
		}
		provideTreeRootContext({
			modelValue,
			selectedKeys,
			onSelect: (val) => {
				const condition = (baseValue) => props.getKey(baseValue ?? {}) === props.getKey(val);
				const exist = props.multiple && Array.isArray(modelValue.value) ? modelValue.value?.findIndex(condition) !== -1 : void 0;
				onSelectItem(val, condition);
				if (props.bubbleSelect && props.multiple && Array.isArray(modelValue.value)) {
					const item = expandedItems.value.find((i) => {
						return props.getKey(i.value) === props.getKey(val);
					});
					if (item != null) handleBubbleSelect(item);
				}
				if (props.propagateSelect && props.multiple && Array.isArray(modelValue.value)) {
					const children = flatten(props.getChildren(val) ?? []);
					if (exist) modelValue.value = [...modelValue.value].filter((i) => !children.some((child) => props.getKey(i ?? {}) === props.getKey(child)));
					else modelValue.value = [...modelValue.value, ...children];
				}
			},
			expanded,
			onToggle(val) {
				if (!(val ? props.getChildren(val) : void 0)) return;
				const key = props.getKey(val) ?? val;
				if (expanded.value.includes(key)) expanded.value = expanded.value.filter((val$1) => val$1 !== key);
				else expanded.value = [...expanded.value, key];
			},
			getKey: props.getKey,
			getChildren: props.getChildren,
			items,
			expandedItems,
			disabled,
			multiple,
			dir,
			propagateSelect,
			bubbleSelect,
			isVirtual,
			virtualKeydownHook,
			handleMultipleReplace
		});
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(RovingFocusGroup_default), {
				ref_key: "rovingFocusGroupRef",
				ref: rovingFocusGroupRef,
				"as-child": "",
				orientation: "vertical",
				dir: unref(dir)
			}, {
				default: withCtx(() => [createVNode(unref(Primitive), {
					role: "tree",
					as: _ctx.as,
					"as-child": _ctx.asChild,
					"aria-multiselectable": unref(multiple) ? true : void 0,
					onKeydown: [handleKeydown, withKeys(withModifiers(handleKeydownNavigation, ["shift"]), ["up", "down"])]
				}, {
					default: withCtx(() => [renderSlot(_ctx.$slots, "default", {
						flattenItems: expandedItems.value,
						modelValue: unref(modelValue),
						expanded: unref(expanded)
					})]),
					_: 3
				}, 8, [
					"as",
					"as-child",
					"aria-multiselectable",
					"onKeydown"
				])]),
				_: 3
			}, 8, ["dir"]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/Tree/TreeItem.js
var TREE_SELECT = "tree.select";
var TREE_TOGGLE = "tree.toggle";
var TreeItem_default = /* @__PURE__ */ defineComponent({
	inheritAttrs: false,
	__name: "TreeItem",
	props: {
		value: {
			type: null,
			required: true
		},
		level: {
			type: Number,
			required: true
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false,
			default: "li"
		}
	},
	emits: ["select", "toggle"],
	setup(__props, { expose: __expose, emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const rootContext = injectTreeRootContext();
		const { getItems } = useCollection();
		const hasChildren = computed(() => !!rootContext.getChildren(props.value));
		const isExpanded = computed(() => {
			const key = rootContext.getKey(props.value);
			return rootContext.expanded.value.includes(key);
		});
		const isSelected = computed(() => {
			const key = rootContext.getKey(props.value);
			return rootContext.selectedKeys.value.includes(key);
		});
		const isIndeterminate = computed(() => {
			if (rootContext.bubbleSelect.value && hasChildren.value && Array.isArray(rootContext.modelValue.value)) {
				const children = flatten(rootContext.getChildren(props.value) || []);
				return children.some((child) => rootContext.modelValue.value.find((v) => rootContext.getKey(v) === rootContext.getKey(child))) && !children.every((child) => rootContext.modelValue.value.find((v) => rootContext.getKey(v) === rootContext.getKey(child)));
			} else if (rootContext.propagateSelect.value && isSelected.value && hasChildren.value && Array.isArray(rootContext.modelValue.value)) return !flatten(rootContext.getChildren(props.value) || []).every((child) => rootContext.modelValue.value.find((v) => rootContext.getKey(v) === rootContext.getKey(child)));
			else return void 0;
		});
		function handleKeydownRight(ev) {
			if (!hasChildren.value) return;
			if (isExpanded.value) {
				const collection = getItems().map((i) => i.ref);
				const currentElement = getActiveElement();
				const currentIndex = collection.indexOf(currentElement);
				const nextElement = [...collection].slice(currentIndex).find((el) => Number(el.getAttribute("data-indent")) === props.level + 1);
				if (nextElement) nextElement.focus();
			} else handleToggleCustomEvent(ev);
		}
		function handleKeydownLeft(ev) {
			if (isExpanded.value) handleToggleCustomEvent(ev);
			else {
				const collection = getItems().map((i) => i.ref);
				const currentElement = getActiveElement();
				const currentIndex = collection.indexOf(currentElement);
				const parentElement = [...collection].slice(0, currentIndex).reverse().find((el) => Number(el.getAttribute("data-indent")) === props.level - 1);
				if (parentElement) parentElement.focus();
			}
		}
		async function handleSelect(ev) {
			emits("select", ev);
			if (ev?.defaultPrevented) return;
			rootContext.onSelect(props.value);
		}
		async function handleToggle(ev) {
			emits("toggle", ev);
			if (ev?.defaultPrevented) return;
			rootContext.onToggle(props.value);
		}
		async function handleSelectCustomEvent(ev) {
			if (!ev) return;
			handleAndDispatchCustomEvent(TREE_SELECT, handleSelect, {
				originalEvent: ev,
				value: props.value,
				isExpanded: isExpanded.value,
				isSelected: isSelected.value
			});
		}
		async function handleToggleCustomEvent(ev) {
			if (!ev) return;
			handleAndDispatchCustomEvent(TREE_TOGGLE, handleToggle, {
				originalEvent: ev,
				value: props.value,
				isExpanded: isExpanded.value,
				isSelected: isSelected.value
			});
		}
		__expose({
			isExpanded,
			isSelected,
			isIndeterminate,
			handleToggle: () => rootContext.onToggle(props.value),
			handleSelect: () => rootContext.onSelect(props.value)
		});
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(RovingFocusItem_default), {
				"as-child": "",
				value: _ctx.value,
				"allow-shift-key": ""
			}, {
				default: withCtx(() => [createVNode(unref(Primitive), mergeProps(_ctx.$attrs, {
					role: "treeitem",
					as: _ctx.as,
					"as-child": _ctx.asChild,
					"aria-selected": isSelected.value,
					"aria-expanded": hasChildren.value ? isExpanded.value : void 0,
					"aria-level": _ctx.level,
					"data-indent": _ctx.level,
					"data-selected": isSelected.value ? "" : void 0,
					"data-expanded": isExpanded.value ? "" : void 0,
					onKeydown: [
						withKeys(withModifiers(handleSelectCustomEvent, ["self", "prevent"]), ["enter", "space"]),
						_cache[0] || (_cache[0] = withKeys(withModifiers((ev) => unref(rootContext).dir.value === "ltr" ? handleKeydownRight(ev) : handleKeydownLeft(ev), ["prevent"]), ["right"])),
						_cache[1] || (_cache[1] = withKeys(withModifiers((ev) => unref(rootContext).dir.value === "ltr" ? handleKeydownLeft(ev) : handleKeydownRight(ev), ["prevent"]), ["left"]))
					],
					onClick: _cache[2] || (_cache[2] = withModifiers((ev) => {
						handleSelectCustomEvent(ev);
						handleToggleCustomEvent(ev);
					}, ["stop"]))
				}), {
					default: withCtx(() => [renderSlot(_ctx.$slots, "default", {
						isExpanded: isExpanded.value,
						isSelected: isSelected.value,
						isIndeterminate: isIndeterminate.value,
						handleSelect: () => unref(rootContext).onSelect(_ctx.value),
						handleToggle: () => unref(rootContext).onToggle(_ctx.value)
					})]),
					_: 3
				}, 16, [
					"as",
					"as-child",
					"aria-selected",
					"aria-expanded",
					"aria-level",
					"data-indent",
					"data-selected",
					"data-expanded",
					"onKeydown"
				])]),
				_: 3
			}, 8, ["value"]);
		};
	}
});
//#endregion
//#region node_modules/.pnpm/reka-ui@2.6.2_typescript@6.0.3_vue@3.5.42_typescript@6.0.3_/node_modules/reka-ui/dist/Tree/TreeVirtualizer.js
var TreeVirtualizer_default = /* @__PURE__ */ defineComponent({
	__name: "TreeVirtualizer",
	props: {
		overscan: {
			type: Number,
			required: false
		},
		estimateSize: {
			type: [Number, Function],
			required: false
		},
		textContent: {
			type: Function,
			required: false
		}
	},
	setup(__props) {
		const props = __props;
		const slots = useSlots();
		const rootContext = injectTreeRootContext();
		const parentEl = useParentElement();
		const { getItems } = useCollection();
		const search = refAutoReset("", 1e3);
		const optionsWithMetadata = computed(() => {
			const parseTextContent = (option) => {
				if (props.textContent) return props.textContent(option);
				else return option.toString().toLowerCase();
			};
			return rootContext.expandedItems.value.map((option, index) => ({
				index,
				textContent: parseTextContent(option.value)
			}));
		});
		rootContext.isVirtual.value = true;
		const padding = computed(() => {
			const el = parentEl.value;
			if (!el) return {
				start: 0,
				end: 0
			};
			else {
				const styles = window.getComputedStyle(el);
				return {
					start: Number.parseFloat(styles.paddingBlockStart || styles.paddingTop),
					end: Number.parseFloat(styles.paddingBlockEnd || styles.paddingBottom)
				};
			}
		});
		const virtualizer = useVirtualizer({
			get scrollPaddingStart() {
				return padding.value.start;
			},
			get scrollPaddingEnd() {
				return padding.value.end;
			},
			get count() {
				return rootContext.expandedItems.value.length ?? 0;
			},
			get horizontal() {
				return false;
			},
			getItemKey(index) {
				return index + rootContext.getKey(rootContext.expandedItems.value[index].value);
			},
			estimateSize(index) {
				if (typeof props.estimateSize === "function") return props.estimateSize(index);
				return props.estimateSize ?? 28;
			},
			getScrollElement() {
				return parentEl.value;
			},
			overscan: props.overscan ?? 12
		});
		const virtualizedItems = computed(() => virtualizer.value.getVirtualItems().map((item) => {
			return {
				item,
				is: cloneVNode(slots.default({
					item: rootContext.expandedItems.value[item.index],
					virtualizer: virtualizer.value,
					virtualItem: item
				})[0], {
					"data-index": item.index,
					"style": {
						position: "absolute",
						top: 0,
						left: 0,
						transform: `translateY(${item.start}px)`,
						overflowAnchor: "none"
					}
				})
			};
		}));
		function scrollToIndexAndFocus(index) {
			virtualizer.value.scrollToIndex(index, { align: "start" });
			requestAnimationFrame(() => {
				const item = parentEl.value.querySelector(`[data-index="${index}"]`);
				if (item instanceof HTMLElement) item.focus();
			});
		}
		rootContext.virtualKeydownHook.on((event) => {
			const isMetaKey = event.altKey || event.ctrlKey || event.metaKey;
			if (event.key === "Tab" && !isMetaKey) return;
			const intent = MAP_KEY_TO_FOCUS_INTENT[event.key];
			if (["first", "last"].includes(intent)) {
				event.preventDefault();
				const index = intent === "first" ? 0 : rootContext.expandedItems.value.length - 1;
				virtualizer.value.scrollToIndex(index);
				requestAnimationFrame(() => {
					const items = getItems();
					(intent === "first" ? items[0] : items[items.length - 1]).ref.focus();
				});
			} else if (intent === "prev" && event.key !== "ArrowUp") {
				const currentElement = getActiveElement();
				const currentIndex = Number(currentElement.getAttribute("data-index"));
				const currentLevel = Number(currentElement.getAttribute("data-indent"));
				const parentItem = rootContext.expandedItems.value.slice(0, currentIndex).map((item, index) => ({
					...item,
					index
				})).reverse().find((item) => item.level === currentLevel - 1);
				if (parentItem) scrollToIndexAndFocus(parentItem.index);
			} else if (!intent && !isMetaKey) {
				search.value += event.key;
				const currentIndex = Number(getActiveElement()?.getAttribute("data-index"));
				const currentMatch = optionsWithMetadata.value[currentIndex].textContent;
				const next = getNextMatch(optionsWithMetadata.value.map((i) => i.textContent), search.value, currentMatch);
				const nextMatch = optionsWithMetadata.value.find((option) => option.textContent === next);
				if (nextMatch) scrollToIndexAndFocus(nextMatch.index);
			}
			nextTick(() => {
				if (event.shiftKey && intent) rootContext.handleMultipleReplace(intent, getActiveElement(), getItems, rootContext.expandedItems.value.map((i) => i.value));
			});
		});
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", {
				"data-reka-virtualizer": "",
				style: normalizeStyle({
					position: "relative",
					width: "100%",
					height: `${unref(virtualizer).getTotalSize()}px`
				})
			}, [(openBlock(true), createElementBlock(Fragment, null, renderList(virtualizedItems.value, ({ is, item }) => {
				return openBlock(), createBlock(resolveDynamicComponent(is), { key: item.key });
			}), 128))], 4);
		};
	}
});
//#endregion
export { NumberFieldInput_default as $, CheckboxRoot_default as $t, SliderRoot_default as A, ContextMenuRoot_default as At, SelectIcon_default as B, useVirtualizer as Bt, SwitchRoot_default as C, PopoverArrow_default as Ct, SliderTrack_default as D, ContextMenuTrigger_default as Dt, SplitterGroup_default as E, injectPopoverRootContext as Et, SelectScrollDownButton_default as F, ComboboxItem_default as Ft, RadioGroupItem_default as G, ListboxRoot_default as Gt, SelectRoot_default as H, ListboxItem_default as Ht, SelectPortal_default as I, ComboboxInput_default as It, PaginationNext_default as J, autoUpdate as Jt, RadioGroupRoot_default as K, ComboboxAnchor_default as Kt, SelectItemText_default as L, ComboboxEmpty_default as Lt, SelectValue_default as M, ComboboxTrigger_default as Mt, SelectTrigger_default as N, ComboboxPortal_default as Nt, SliderThumb_default as O, ContextMenuPortal_default as Ot, SelectScrollUpButton_default as P, ComboboxItemIndicator_default as Pt, PaginationEllipsis_default as Q, CheckboxIndicator_default as Qt, SelectItemIndicator_default as R, ComboboxContent_default as Rt, SwitchThumb_default as S, PopoverClose_default as St, SplitterPanel_default as T, PopoverRoot_default as Tt, injectSelectRootContext as U, ListboxFilter_default as Ut, SelectContent_default as V, ListboxItemIndicator_default as Vt, RadioGroupIndicator_default as W, ListboxContent_default as Wt, PaginationList_default as X, offset as Xt, PaginationListItem_default as Y, flip as Yt, PaginationRoot_default as Z, shift as Zt, TagsInputRoot_default as _, Presence_default as _n, injectDropdownMenuRootContext as _t, TooltipTrigger_default as a, DialogPortal_default as an, DropdownMenuSubTrigger_default as at, TabsContent_default as b, useForwardExpose as bn, PopoverPortal_default as bt, TooltipRoot_default as c, DialogContent_default as cn, DropdownMenuSeparator_default as ct, ToggleGroupItem_default as d, DialogRoot_default as dn, DropdownMenuPortal_default as dt, VisuallyHidden_default as en, NumberFieldIncrement_default as et, ToggleGroupRoot_default as f, injectDialogRootContext as fn, DropdownMenuLabel_default as ft, TagsInputInput_default as g, Primitive as gn, DropdownMenuRoot_default as gt, TagsInputItem_default as h, CollapsibleRoot_default as hn, DropdownMenuContent_default as ht, injectTreeRootContext as i, DialogTitle_default as in, DropdownMenuTrigger_default as it, SelectViewport_default as j, ComboboxViewport_default as jt, SliderRange_default as k, ContextMenuContent_default as kt, TooltipProvider_default as l, FocusScope_default as ln, DropdownMenuRadioItem_default as lt, TagsInputItemDelete_default as m, CollapsibleContent_default as mn, DropdownMenuItem_default as mt, TreeItem_default as n, RovingFocusGroup_default as nn, NumberFieldRoot_default as nt, TooltipPortal_default as o, DialogOverlay_default as on, DropdownMenuSubContent_default as ot, TagsInputItemText_default as p, CollapsibleTrigger_default as pn, DropdownMenuItemIndicator_default as pt, PaginationPrev_default as q, useFloating as qt, TreeRoot_default as r, DialogTrigger_default as rn, Label_default as rt, TooltipContent_default as s, DialogDescription_default as sn, DropdownMenuSub_default as st, TreeVirtualizer_default as t, RovingFocusItem_default as tn, NumberFieldDecrement_default as tt, TooltipArrow_default as u, DialogClose_default as un, DropdownMenuRadioGroup_default as ut, TabsTrigger_default as v, useForwardPropsEmits as vn, DropdownMenuCheckboxItem_default as vt, SplitterResizeHandle_default as w, PopoverAnchor_default as wt, TabsRoot_default as x, PopoverContent_default as xt, TabsList_default as y, useForwardProps as yn, PopoverTrigger_default as yt, SelectItem_default as z, ComboboxRoot_default as zt };
