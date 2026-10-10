import { r as __name } from "./rolldown-runtime-xtsTai4I.js";
import { At as effectScope, Bt as shallowRef, Ct as watchEffect, Ft as reactive, G as defineComponent, Gt as triggerRef, Ht as toRef$1, It as readonly, K as getCurrentInstance, Kt as unref, Lt as ref, Mt as isRef, P as computed, Pt as onScopeDispose, Rt as shallowReactive, St as watch, Ut as toRefs, Wt as toValue, X as inject, Y as hasInjectionContext, c as useRoute, ct as onUpdated, et as nextTick, jt as getCurrentScope, kt as customRef, l as useRouter, ot as onMounted, st as onUnmounted, zt as shallowReadonly } from "./vendor-vue-core-C1utdb0s.js";
//#region node_modules/.pnpm/@vueuse+shared@14.4.0_vue@3.5.42_typescript@6.0.3_/node_modules/@vueuse/shared/dist/index.js
/**
* Explicitly define the deps of computed.
*
* @param source
* @param fn
*/
function computedWithControl(source, fn, options = {}) {
	let v = void 0;
	let track;
	let trigger;
	let dirty = true;
	const update = () => {
		dirty = true;
		trigger();
	};
	watch(source, update, {
		flush: "sync",
		...options
	});
	const get = typeof fn === "function" ? fn : fn.get;
	const set = typeof fn === "function" ? void 0 : fn.set;
	const result = customRef((_track, _trigger) => {
		track = _track;
		trigger = _trigger;
		return {
			get() {
				if (dirty) {
					v = get(v);
					dirty = false;
				}
				track();
				return v;
			},
			set(v) {
				set === null || set === void 0 || set(v);
			}
		};
	});
	result.trigger = update;
	return result;
}
/**
* Call onScopeDispose() if it's inside an effect scope lifecycle, if not, do nothing
*
* @param fn
*/
function tryOnScopeDispose(fn, failSilently) {
	if (getCurrentScope()) {
		onScopeDispose(fn, failSilently);
		return true;
	}
	return false;
}
/**
* Utility for creating event hooks
*
* @see https://vueuse.org/createEventHook
*
* @__NO_SIDE_EFFECTS__
*/
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
var localProvidedStateMap = /* @__PURE__ */ new WeakMap();
/**
* On the basis of `inject`, it is allowed to directly call inject to obtain the value after call provide in the same component.
*
* @example
* ```ts
* injectLocal('MyInjectionKey', 1)
* const injectedValue = injectLocal('MyInjectionKey') // injectedValue === 1
* ```
*
* @__NO_SIDE_EFFECTS__
*/
var injectLocal = (...args) => {
	var _getCurrentInstance;
	const key = args[0];
	const instance = (_getCurrentInstance = getCurrentInstance()) === null || _getCurrentInstance === void 0 ? void 0 : _getCurrentInstance.proxy;
	const owner = instance !== null && instance !== void 0 ? instance : getCurrentScope();
	if (owner == null && !hasInjectionContext()) throw new Error("injectLocal must be called in setup");
	if (owner && localProvidedStateMap.has(owner) && key in localProvidedStateMap.get(owner)) return localProvidedStateMap.get(owner)[key];
	return inject(...args);
};
var isClient = typeof window !== "undefined" && typeof document !== "undefined";
typeof WorkerGlobalScope !== "undefined" && globalThis instanceof WorkerGlobalScope;
var isDef = (val) => typeof val !== "undefined";
var notNullish = (val) => val != null;
var toString$1 = Object.prototype.toString;
var isObject$1 = /* @__PURE__ */ __name((val) => toString$1.call(val) === "[object Object]", "isObject");
var timestamp = () => +Date.now();
var noop = () => {};
var isIOS = /* #__PURE__ */ getIsIOS();
function getIsIOS() {
	var _window;
	var _window2;
	var _window3;
	return isClient && !!((_window = window) === null || _window === void 0 || (_window = _window.navigator) === null || _window === void 0 ? void 0 : _window.userAgent) && (/iP(?:ad|hone|od)/.test(window.navigator.userAgent) || ((_window2 = window) === null || _window2 === void 0 || (_window2 = _window2.navigator) === null || _window2 === void 0 ? void 0 : _window2.maxTouchPoints) > 2 && /iPad|Macintosh/.test((_window3 = window) === null || _window3 === void 0 ? void 0 : _window3.navigator.userAgent));
}
function toRef(...args) {
	if (args.length !== 1) return toRef$1(...args);
	const r = args[0];
	return typeof r === "function" ? readonly(customRef(() => ({
		get: r,
		set: noop
	}))) : ref(r);
}
function createFilterWrapper(filter, fn) {
	function wrapper(...args) {
		return new Promise((resolve, reject) => {
			Promise.resolve(filter(() => fn.apply(this, args), {
				fn,
				thisArg: this,
				args
			})).then(resolve).catch(reject);
		});
	}
	if ("cancel" in filter) Object.assign(wrapper, {
		cancel: filter.cancel,
		flush: filter.flush,
		isPending: filter.isPending
	});
	return wrapper;
}
var bypassFilter = (invoke) => {
	return invoke();
};
/**
* Create an EventFilter that debounce the events
*/
function debounceFilter(ms, options = {}) {
	let timer;
	let maxTimer;
	let lastRejector = noop;
	let lastResolve = noop;
	const _pending = shallowRef(false);
	const _clearTimeout = (timer) => {
		clearTimeout(timer);
		lastRejector();
		lastRejector = noop;
	};
	let lastInvoker;
	const handler = (invoke) => {
		const duration = toValue(ms);
		const maxDuration = toValue(options.maxWait);
		if (timer) _clearTimeout(timer);
		if (duration <= 0 || maxDuration !== void 0 && maxDuration <= 0) {
			if (maxTimer) {
				_clearTimeout(maxTimer);
				maxTimer = void 0;
			}
			_pending.value = false;
			return Promise.resolve(invoke());
		}
		_pending.value = true;
		return new Promise((resolve, reject) => {
			lastRejector = options.rejectOnCancel ? reject : resolve;
			lastResolve = resolve;
			lastInvoker = invoke;
			if (maxDuration && !maxTimer) maxTimer = setTimeout(() => {
				if (timer) _clearTimeout(timer);
				maxTimer = void 0;
				_pending.value = false;
				resolve(lastInvoker());
			}, maxDuration);
			timer = setTimeout(() => {
				if (maxTimer) _clearTimeout(maxTimer);
				maxTimer = void 0;
				_pending.value = false;
				resolve(invoke());
			}, duration);
		});
	};
	return Object.assign(handler, {
		cancel: () => {
			if (timer) {
				_clearTimeout(timer);
				timer = void 0;
			}
			if (maxTimer) {
				_clearTimeout(maxTimer);
				maxTimer = void 0;
			}
			_pending.value = false;
			lastResolve = noop;
		},
		flush: () => {
			if (_pending.value) {
				if (timer) {
					clearTimeout(timer);
					timer = void 0;
				}
				if (maxTimer) {
					clearTimeout(maxTimer);
					maxTimer = void 0;
				}
				_pending.value = false;
				const resolve = lastResolve;
				lastRejector = noop;
				lastResolve = noop;
				resolve(lastInvoker());
			}
		},
		isPending: shallowReadonly(_pending)
	});
}
function throttleFilter(...args) {
	let lastExec = 0;
	let timer;
	let isLeading = true;
	let lastRejector = noop;
	let lastValue;
	let ms;
	let trailing;
	let leading;
	let rejectOnCancel;
	if (!isRef(args[0]) && typeof args[0] === "object") ({delay: ms, trailing = true, leading = true, rejectOnCancel = false} = args[0]);
	else [ms, trailing = true, leading = true, rejectOnCancel = false] = args;
	const clear = () => {
		if (timer) {
			clearTimeout(timer);
			timer = void 0;
			lastRejector();
			lastRejector = noop;
		}
	};
	const filter = (_invoke) => {
		const duration = toValue(ms);
		const elapsed = Date.now() - lastExec;
		const invoke = () => {
			return lastValue = _invoke();
		};
		clear();
		if (duration <= 0) {
			lastExec = Date.now();
			return invoke();
		}
		if (elapsed > duration) {
			lastExec = Date.now();
			if (leading || !isLeading) invoke();
		} else if (trailing) lastValue = new Promise((resolve, reject) => {
			lastRejector = rejectOnCancel ? reject : resolve;
			timer = setTimeout(() => {
				lastExec = Date.now();
				isLeading = true;
				resolve(invoke());
				clear();
			}, Math.max(0, duration - elapsed));
		});
		if (!leading && !timer) timer = setTimeout(() => isLeading = true, duration);
		isLeading = false;
		return lastValue;
	};
	return filter;
}
/**
* EventFilter that gives extra controls to pause and resume the filter
*
* @param extendFilter  Extra filter to apply when the PausableFilter is active, default to none
* @param options Options to configure the filter
*/
function pausableFilter(extendFilter = bypassFilter, options = {}) {
	const { initialState = "active" } = options;
	const isActive = toRef(initialState === "active");
	function pause() {
		isActive.value = false;
	}
	function resume() {
		isActive.value = true;
	}
	const eventFilter = (...args) => {
		if (isActive.value) extendFilter(...args);
	};
	return {
		isActive: shallowReadonly(isActive),
		pause,
		resume,
		eventFilter
	};
}
function promiseTimeout(ms, throwOnTimeout = false, reason = "Timeout") {
	return new Promise((resolve, reject) => {
		if (throwOnTimeout) setTimeout(reject, ms, reason);
		else setTimeout(resolve, ms);
	});
}
function identity(arg) {
	return arg;
}
function increaseWithUnit(target, delta) {
	var _target$match;
	if (typeof target === "number") return target + delta;
	const value = ((_target$match = target.match(/^-?\d+\.?\d*/)) === null || _target$match === void 0 ? void 0 : _target$match[0]) || "";
	const unit = target.slice(value.length);
	const result = Number.parseFloat(value) + delta;
	if (Number.isNaN(result)) return target;
	return result + unit;
}
/**
* Get a px value for SSR use, do not rely on this method outside of SSR as REM unit is assumed at 16px, which might not be the case on the client
*/
function pxValue(px) {
	return px.endsWith("rem") ? Number.parseFloat(px) * 16 : Number.parseFloat(px);
}
function toArray(value) {
	return Array.isArray(value) ? value : [value];
}
function cacheStringFunction(fn) {
	const cache = Object.create(null);
	return ((str) => {
		return cache[str] || (cache[str] = fn(str));
	});
}
var camelizeRE = /-(\w)/g;
var camelize = cacheStringFunction((str) => {
	return str.replace(camelizeRE, (_, c) => c ? c.toUpperCase() : "");
});
function getLifeCycleTarget(target) {
	return target || getCurrentInstance();
}
/**
* Make a composable function usable with multiple Vue instances.
*
* @see https://vueuse.org/createSharedComposable
*
* @__NO_SIDE_EFFECTS__
*/
function createSharedComposable(composable) {
	if (!isClient) return composable;
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
	return ((...args) => {
		subscribers += 1;
		if (!scope) {
			scope = effectScope(true);
			state = scope.run(() => composable(...args));
		}
		tryOnScopeDispose(dispose);
		return state;
	});
}
function get$1(obj, key) {
	if (key == null) return unref(obj);
	return unref(obj)[key];
}
__name(get$1, "get");
/* @__NO_SIDE_EFFECTS__ */
function makeDestructurable(obj, arr) {
	if (typeof Symbol !== "undefined") {
		const clone = { ...obj };
		Object.defineProperty(clone, Symbol.iterator, {
			enumerable: false,
			value() {
				let index = 0;
				return { next: () => ({
					value: arr[index++],
					done: index > arr.length
				}) };
			}
		});
		return clone;
	} else return Object.assign([...arr], obj);
}
/**
* Converts ref to reactive.
*
* @see https://vueuse.org/toReactive
* @param objectRef A ref of object
*/
function toReactive(objectRef) {
	if (!isRef(objectRef)) return reactive(objectRef);
	return reactive(new Proxy({}, {
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
	}));
}
/**
* Computed reactive object.
*/
function reactiveComputed(fn) {
	return toReactive(computed(fn));
}
/**
* Reactively omit fields from a reactive object
*
* @see https://vueuse.org/reactiveOmit
*/
function reactiveOmit(obj, ...keys) {
	const flatKeys = keys.flat();
	const predicate = flatKeys[0];
	return reactiveComputed(() => typeof predicate === "function" ? Object.fromEntries(Object.entries(toRefs(obj)).filter(([k, v]) => !predicate(toValue(v), k))) : Object.fromEntries(Object.entries(toRefs(obj)).filter((e) => !flatKeys.includes(e[0]))));
}
/**
* Create a ref which will be reset to the default value after some time.
*
* @see https://vueuse.org/refAutoReset
* @param defaultValue The value which will be set.
* @param afterMs      A zero-or-greater delay in milliseconds.
*/
function refAutoReset(defaultValue, afterMs = 1e4) {
	return customRef((track, trigger) => {
		let value = toValue(defaultValue);
		let timer;
		const resetAfter = () => setTimeout(() => {
			value = toValue(defaultValue);
			trigger();
		}, toValue(afterMs));
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
/**
* Debounce execution of a function.
*
* @see https://vueuse.org/useDebounceFn
* @param  fn          A function to be executed after delay milliseconds debounced.
* @param  ms          A zero-or-greater delay in milliseconds. For event callbacks, values around 100 or 250 (or even higher) are most useful.
* @param  options     Options
*
* @return A new, debounced, function with isPending, cancel, and flush properties.
*/
function useDebounceFn(fn, ms = 200, options = {}) {
	return createFilterWrapper(debounceFilter(ms, options), fn);
}
/**
* Debounce updates of a ref.
*
* @return A new debounced ref.
*/
function refDebounced(value, ms = 200, options = {}) {
	const debounced = ref(toValue(value));
	const updater = useDebounceFn(() => {
		debounced.value = value.value;
	}, ms, options);
	watch(value, () => updater());
	return shallowReadonly(debounced);
}
/**
* Throttle execution of a function. Especially useful for rate limiting
* execution of handlers on events like resize and scroll.
*
* @param   fn             A function to be executed after delay milliseconds. The `this` context and all arguments are passed through, as-is,
*                                    to `callback` when the throttled-function is executed.
* @param   ms             A zero-or-greater delay in milliseconds. For event callbacks, values around 100 or 250 (or even higher) are most useful.
*                                    (default value: 200)
*
* @param [trailing] if true, call fn again after the time is up (default value: false)
*
* @param [leading] if true, call fn on the leading edge of the ms timeout (default value: true)
*
* @param [rejectOnCancel] if true, reject the last call if it's been cancel (default value: false)
*
* @return  A new, throttled, function.
*
* @__NO_SIDE_EFFECTS__
*/
function useThrottleFn(fn, ms = 200, trailing = false, leading = true, rejectOnCancel = false) {
	return createFilterWrapper(throttleFilter(ms, trailing, leading, rejectOnCancel), fn);
}
function watchWithFilter(source, cb, options = {}) {
	const { eventFilter = bypassFilter, ...watchOptions } = options;
	return watch(source, createFilterWrapper(eventFilter, cb), watchOptions);
}
/** @deprecated Use Vue's built-in `watch` instead. This function will be removed in future version. */
function watchPausable(source, cb, options = {}) {
	const { eventFilter: filter, initialState = "active", ...watchOptions } = options;
	const { eventFilter, pause, resume, isActive } = pausableFilter(filter, { initialState });
	return {
		stop: watchWithFilter(source, cb, {
			...watchOptions,
			eventFilter
		}),
		pause,
		resume,
		isActive
	};
}
/**
* Call onMounted() if it's inside a component lifecycle, if not, just call the function
*
* @param fn
* @param sync if set to false, it will run in the nextTick() of Vue
* @param target
*/
function tryOnMounted(fn, sync = true, target) {
	if (getLifeCycleTarget(target)) onMounted(fn, target);
	else if (sync) fn();
	else nextTick(fn);
}
/**
* Call onUnmounted() if it's inside a component lifecycle, if not, do nothing
*
* @param fn
* @param target
*/
function tryOnUnmounted(fn, target) {
	if (getLifeCycleTarget(target)) onUnmounted(fn, target);
}
function createUntil(r, isNot = false) {
	function toMatch(condition, { flush = "sync", deep = false, timeout, throwOnTimeout } = {}) {
		let stop = null;
		const promises = [new Promise((resolve) => {
			stop = watch(r, (v) => {
				if (condition(v) !== isNot) {
					if (stop) stop();
					else nextTick(() => stop === null || stop === void 0 ? void 0 : stop());
					resolve(v);
				}
			}, {
				flush,
				deep,
				immediate: true
			});
		})];
		if (timeout != null) promises.push(promiseTimeout(timeout, throwOnTimeout).then(() => toValue(r)).finally(() => stop === null || stop === void 0 ? void 0 : stop()));
		return Promise.race(promises);
	}
	function toBe(value, options) {
		if (!isRef(value)) return toMatch((v) => v === value, options);
		const { flush = "sync", deep = false, timeout, throwOnTimeout } = options !== null && options !== void 0 ? options : {};
		let stop = null;
		const promises = [new Promise((resolve) => {
			stop = watch([r, value], ([v1, v2]) => {
				if (isNot !== (v1 === v2)) {
					if (stop) stop();
					else nextTick(() => stop === null || stop === void 0 ? void 0 : stop());
					resolve(v1);
				}
			}, {
				flush,
				deep,
				immediate: true
			});
		})];
		if (timeout != null) promises.push(promiseTimeout(timeout, throwOnTimeout).then(() => toValue(r)).finally(() => {
			stop === null || stop === void 0 || stop();
			return toValue(r);
		}));
		return Promise.race(promises);
	}
	function toBeTruthy(options) {
		return toMatch((v) => Boolean(v), options);
	}
	function toBeNull(options) {
		return toBe(null, options);
	}
	function toBeUndefined(options) {
		return toBe(void 0, options);
	}
	function toBeNaN(options) {
		return toMatch(Number.isNaN, options);
	}
	function toContains(value, options) {
		return toMatch((v) => {
			const array = Array.from(v);
			return array.includes(value) || array.includes(toValue(value));
		}, options);
	}
	function changed(options) {
		return changedTimes(1, options);
	}
	function changedTimes(n = 1, options) {
		let count = -1;
		return toMatch(() => {
			count += 1;
			return count >= n;
		}, options);
	}
	if (Array.isArray(toValue(r))) return {
		toMatch,
		toContains,
		changed,
		changedTimes,
		get not() {
			return createUntil(r, !isNot);
		}
	};
	else return {
		toMatch,
		toBe,
		toBeTruthy,
		toBeNull,
		toBeNaN,
		toBeUndefined,
		changed,
		changedTimes,
		get not() {
			return createUntil(r, !isNot);
		}
	};
}
function until(r) {
	return createUntil(r);
}
/**
* Wrapper for `setInterval` with controls
*
* @see https://vueuse.org/useIntervalFn
* @param cb
* @param interval
* @param options
*/
function useIntervalFn(cb, interval = 1e3, options = {}) {
	const { immediate = true, immediateCallback = false } = options;
	let timer = null;
	const isActive = shallowRef(false);
	function clean() {
		if (timer) {
			clearInterval(timer);
			timer = null;
		}
	}
	function pause() {
		isActive.value = false;
		clean();
	}
	function resume() {
		const intervalValue = toValue(interval);
		if (intervalValue <= 0) return;
		isActive.value = true;
		if (immediateCallback) cb();
		clean();
		if (isActive.value) timer = setInterval(cb, intervalValue);
	}
	if (immediate && isClient) resume();
	if (isRef(interval) || typeof interval === "function") tryOnScopeDispose(watch(interval, () => {
		if (isActive.value && isClient) resume();
	}));
	tryOnScopeDispose(pause);
	return {
		isActive: shallowReadonly(isActive),
		pause,
		resume
	};
}
/**
* Wrapper for `setTimeout` with controls.
*
* @param cb
* @param interval
* @param options
*/
function useTimeoutFn(cb, interval, options = {}) {
	const { immediate = true, immediateCallback = false } = options;
	const isPending = shallowRef(false);
	let timer;
	function clear() {
		if (timer) {
			clearTimeout(timer);
			timer = void 0;
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
			timer = void 0;
			cb(...args);
		}, toValue(interval));
	}
	if (immediate) {
		isPending.value = true;
		if (isClient) start();
	}
	tryOnScopeDispose(stop);
	return {
		isPending: shallowReadonly(isPending),
		start,
		stop
	};
}
function useTimeout(interval = 1e3, options = {}) {
	const { controls: exposeControls = false, callback } = options;
	const controls = useTimeoutFn(callback !== null && callback !== void 0 ? callback : noop, interval, options);
	const ready = computed(() => !controls.isPending.value);
	if (exposeControls) return {
		ready,
		...controls
	};
	else return ready;
}
function watchDebounced(source, cb, options = {}) {
	const { debounce = 0, maxWait = void 0, ...watchOptions } = options;
	return watchWithFilter(source, cb, {
		...watchOptions,
		eventFilter: debounceFilter(debounce, { maxWait })
	});
}
function watchIgnorable(source, cb, options = {}) {
	const { eventFilter = bypassFilter, ...watchOptions } = options;
	const filteredCb = createFilterWrapper(eventFilter, cb);
	let ignoreUpdates;
	let ignorePrevAsyncUpdates;
	let stop;
	if (watchOptions.flush === "sync") {
		let ignore = false;
		ignorePrevAsyncUpdates = () => {};
		ignoreUpdates = (updater) => {
			ignore = true;
			updater();
			ignore = false;
		};
		stop = watch(source, (...args) => {
			if (!ignore) filteredCb(...args);
		}, watchOptions);
	} else {
		const disposables = [];
		let ignoreCounter = 0;
		let syncCounter = 0;
		ignorePrevAsyncUpdates = () => {
			ignoreCounter = syncCounter;
		};
		disposables.push(watch(source, () => {
			syncCounter++;
		}, {
			...watchOptions,
			flush: "sync"
		}));
		ignoreUpdates = (updater) => {
			const syncCounterPrev = syncCounter;
			updater();
			ignoreCounter += syncCounter - syncCounterPrev;
		};
		disposables.push(watch(source, (...args) => {
			const ignore = ignoreCounter > 0 && ignoreCounter === syncCounter;
			ignoreCounter = 0;
			syncCounter = 0;
			if (ignore) return;
			filteredCb(...args);
		}, watchOptions));
		stop = () => {
			disposables.forEach((fn) => fn());
		};
	}
	return {
		stop,
		ignoreUpdates,
		ignorePrevAsyncUpdates
	};
}
/**
* Shorthand for watching value with {immediate: true}
*
* @see https://vueuse.org/watchImmediate
*/
function watchImmediate(source, cb, options) {
	return watch(source, cb, {
		...options,
		immediate: true
	});
}
/**
* Shorthand for watching value with { once: true }
*
* @see https://vueuse.org/watchOnce
*/
function watchOnce(source, cb, options) {
	return watch(source, cb, {
		...options,
		once: true
	});
}
function whenever(source, cb, options) {
	const stop = watch(source, (v, ov, onInvalidate) => {
		if (v) {
			if (options === null || options === void 0 ? void 0 : options.once) nextTick(() => stop());
			cb(v, ov, onInvalidate);
		}
	}, {
		...options,
		once: false
	});
	return stop;
}
//#endregion
//#region node_modules/.pnpm/@vueuse+core@14.4.0_vue@3.5.42_typescript@6.0.3_/node_modules/@vueuse/core/dist/index.js
function computedAsync(evaluationCallback, initialState, optionsOrRef) {
	var _globalThis$reportErr;
	let options;
	if (isRef(optionsOrRef)) options = { evaluating: optionsOrRef };
	else options = optionsOrRef || {};
	const { lazy = false, flush = "sync", evaluating = void 0, shallow = true, onError = (_globalThis$reportErr = globalThis.reportError) !== null && _globalThis$reportErr !== void 0 ? _globalThis$reportErr : noop } = options;
	const started = shallowRef(!lazy);
	const current = shallow ? shallowRef(initialState) : ref(initialState);
	let counter = 0;
	watchEffect(async (onInvalidate) => {
		if (!started.value) return;
		counter++;
		const counterAtBeginning = counter;
		let hasFinished = false;
		if (evaluating) Promise.resolve().then(() => {
			evaluating.value = true;
		});
		try {
			const result = await evaluationCallback((cancelCallback) => {
				onInvalidate(() => {
					if (evaluating) evaluating.value = false;
					if (!hasFinished) cancelCallback();
				});
			});
			if (counterAtBeginning === counter) current.value = result;
		} catch (e) {
			onError(e);
		} finally {
			if (evaluating && counterAtBeginning === counter) evaluating.value = false;
			hasFinished = true;
		}
	}, { flush });
	if (lazy) return computed(() => {
		started.value = true;
		return current.value;
	});
	else return current;
}
/**
* This function creates `define` and `reuse` components in pair,
* It also allow to pass a generic to bind with type.
*
* @see https://vueuse.org/createReusableTemplate
*
* @__NO_SIDE_EFFECTS__
*/
function createReusableTemplate(options = {}) {
	const { inheritAttrs = true, name = "ReusableTemplate" } = options;
	const render = shallowRef();
	const define = defineComponent({
		name: `${name}.define`,
		setup(_, { slots }) {
			return () => {
				render.value = slots.default;
			};
		}
	});
	const reuse = defineComponent({
		inheritAttrs,
		name: `${name}.reuse`,
		props: options.props,
		setup(props, { attrs, slots }) {
			return () => {
				var _render$value;
				if (!render.value && true) throw new Error("[VueUse] Failed to find the definition of reusable template");
				const vnode = (_render$value = render.value) === null || _render$value === void 0 ? void 0 : _render$value.call(render, {
					...options.props == null ? keysToCamelKebabCase(attrs) : props,
					$slots: slots
				});
				return inheritAttrs && (vnode === null || vnode === void 0 ? void 0 : vnode.length) === 1 ? vnode[0] : vnode;
			};
		}
	});
	return /* @__PURE__ */ makeDestructurable({
		define,
		reuse
	}, [define, reuse]);
}
function keysToCamelKebabCase(obj) {
	const newObj = {};
	for (const key in obj) newObj[camelize(key)] = obj[key];
	return newObj;
}
var defaultWindow = isClient ? window : void 0;
var defaultDocument = isClient ? window.document : void 0;
isClient && window.navigator;
isClient && window.location;
/**
* Get the dom element of a ref of element or Vue component instance
*
* @param elRef
*/
function unrefElement(elRef) {
	var _$el;
	const plain = toValue(elRef);
	return (_$el = plain === null || plain === void 0 ? void 0 : plain.$el) !== null && _$el !== void 0 ? _$el : plain;
}
function useEventListener(...args) {
	const register = (el, event, listener, options) => {
		el.addEventListener(event, listener, options);
		return () => el.removeEventListener(event, listener, options);
	};
	const firstParamTargets = computed(() => {
		const test = toArray(toValue(args[0])).filter((e) => e != null);
		return test.every((e) => typeof e !== "string") ? test : void 0;
	});
	return watchImmediate(() => {
		var _firstParamTargets$va;
		var _firstParamTargets$va2;
		return [
			(_firstParamTargets$va = (_firstParamTargets$va2 = firstParamTargets.value) === null || _firstParamTargets$va2 === void 0 ? void 0 : _firstParamTargets$va2.map((e) => unrefElement(e))) !== null && _firstParamTargets$va !== void 0 ? _firstParamTargets$va : [defaultWindow].filter((e) => e != null),
			toArray(toValue(firstParamTargets.value ? args[1] : args[0])),
			toArray(unref(firstParamTargets.value ? args[2] : args[1])),
			toValue(firstParamTargets.value ? args[3] : args[2])
		];
	}, ([raw_targets, raw_events, raw_listeners, raw_options], _, onCleanup) => {
		if (!(raw_targets === null || raw_targets === void 0 ? void 0 : raw_targets.length) || !(raw_events === null || raw_events === void 0 ? void 0 : raw_events.length) || !(raw_listeners === null || raw_listeners === void 0 ? void 0 : raw_listeners.length)) return;
		const optionsClone = isObject$1(raw_options) ? { ...raw_options } : raw_options;
		const cleanups = raw_targets.flatMap((el) => raw_events.flatMap((event) => raw_listeners.map((listener) => register(el, event, listener, optionsClone))));
		onCleanup(() => {
			cleanups.forEach((fn) => fn());
		});
	}, { flush: "post" });
}
var _iOSWorkaround = false;
function onClickOutside(target, handler, options = {}) {
	const { window = defaultWindow, ignore = [], capture = true, detectIframe = false, controls = false } = options;
	if (!window) return controls ? {
		stop: noop,
		cancel: noop,
		trigger: noop
	} : noop;
	if (isIOS && !_iOSWorkaround) {
		_iOSWorkaround = true;
		const listenerOptions = { passive: true };
		Array.from(window.document.body.children).forEach((el) => el.addEventListener("click", noop, listenerOptions));
		window.document.documentElement.addEventListener("click", noop, listenerOptions);
	}
	let shouldListen = true;
	const shouldIgnore = (event) => {
		return toValue(ignore).some((target) => {
			if (typeof target === "string") return Array.from(window.document.querySelectorAll(target)).some((el) => el === event.target || event.composedPath().includes(el));
			else {
				const el = unrefElement(target);
				return el && (event.target === el || event.composedPath().includes(el));
			}
		});
	};
	/**
	* Determines if the given target has multiple root elements.
	* Referenced from: https://github.com/vuejs/test-utils/blob/ccb460be55f9f6be05ab708500a41ec8adf6f4bc/src/vue-wrapper.ts#L21
	*/
	function hasMultipleRoots(target) {
		const vm = toValue(target);
		return vm && vm.$.subTree.shapeFlag === 16;
	}
	function checkMultipleRoots(target, event) {
		const vm = toValue(target);
		const children = vm.$.subTree && vm.$.subTree.children;
		if (children == null || !Array.isArray(children)) return false;
		return children.some((child) => child.el === event.target || event.composedPath().includes(child.el));
	}
	const listener = (event) => {
		const el = unrefElement(target);
		if (event.target == null) return;
		if (!(el instanceof Element) && hasMultipleRoots(target) && checkMultipleRoots(target, event)) return;
		if (!el || el === event.target || event.composedPath().includes(el)) return;
		if ("detail" in event && event.detail === 0) shouldListen = !shouldIgnore(event);
		if (!shouldListen) {
			shouldListen = true;
			return;
		}
		handler(event);
	};
	let isProcessingClick = false;
	const cleanup = [
		useEventListener(window, "click", (event) => {
			if (!isProcessingClick) {
				isProcessingClick = true;
				setTimeout(() => {
					isProcessingClick = false;
				}, 0);
				listener(event);
			}
		}, {
			passive: true,
			capture
		}),
		useEventListener(window, "pointerdown", (e) => {
			const el = unrefElement(target);
			shouldListen = !shouldIgnore(e) && !!(el && !e.composedPath().includes(el));
		}, { passive: true }),
		detectIframe && useEventListener(window, "blur", (event) => {
			setTimeout(() => {
				const el = unrefElement(target);
				let activeEl = window.document.activeElement;
				while (activeEl === null || activeEl === void 0 ? void 0 : activeEl.shadowRoot) activeEl = activeEl.shadowRoot.activeElement;
				if ((activeEl === null || activeEl === void 0 ? void 0 : activeEl.tagName) === "IFRAME" && !(el === null || el === void 0 ? void 0 : el.contains(window.document.activeElement))) handler(event);
			}, 0);
		}, { passive: true })
	].filter(Boolean);
	const stop = () => cleanup.forEach((fn) => fn());
	if (controls) return {
		stop,
		cancel: () => {
			shouldListen = false;
		},
		trigger: (event) => {
			shouldListen = true;
			listener(event);
			shouldListen = false;
		}
	};
	return stop;
}
/**
* Mounted state in ref.
*
* @see https://vueuse.org/useMounted
*
* @__NO_SIDE_EFFECTS__
*/
function useMounted() {
	const isMounted = shallowRef(false);
	const instance = getCurrentInstance();
	if (instance) onMounted(() => {
		isMounted.value = true;
	}, instance);
	return isMounted;
}
/* @__NO_SIDE_EFFECTS__ */
function useSupported(callback) {
	const isMounted = useMounted();
	return computed(() => {
		isMounted.value;
		return Boolean(callback());
	});
}
/**
* Watch for changes being made to the DOM tree.
*
* @see https://vueuse.org/useMutationObserver
* @see https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver MutationObserver MDN
* @param target
* @param callback
* @param options
*/
function useMutationObserver(target, callback, options = {}) {
	const { window = defaultWindow, ...mutationOptions } = options;
	let observer;
	const isSupported = /* @__PURE__ */ useSupported(() => window && "MutationObserver" in window);
	const cleanup = () => {
		if (observer) {
			observer.disconnect();
			observer = void 0;
		}
	};
	const stopWatch = watch(computed(() => {
		const items = toArray(toValue(target)).map(unrefElement).filter(notNullish);
		return new Set(items);
	}), (newTargets) => {
		cleanup();
		if (isSupported.value && newTargets.size) {
			observer = new MutationObserver(callback);
			newTargets.forEach((el) => observer.observe(el, mutationOptions));
		}
	}, {
		immediate: true,
		flush: "post"
	});
	const takeRecords = () => {
		return observer === null || observer === void 0 ? void 0 : observer.takeRecords();
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
/**
* Fires when the element or any element containing it is removed.
*
* @param target
* @param callback
* @param options
*/
function onElementRemoval(target, callback, options = {}) {
	const { window = defaultWindow, document = window === null || window === void 0 ? void 0 : window.document, flush = "sync" } = options;
	if (!window || !document) return noop;
	let stopFn;
	const cleanupAndUpdate = (fn) => {
		stopFn === null || stopFn === void 0 || stopFn();
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
/**
* Reactive `document.activeElement`
*
* @see https://vueuse.org/useActiveElement
* @param options
*
* @__NO_SIDE_EFFECTS__
*/
function useActiveElement(options = {}) {
	var _options$document;
	const { window = defaultWindow, deep = true, triggerOnRemoval = false } = options;
	const document = (_options$document = options.document) !== null && _options$document !== void 0 ? _options$document : window === null || window === void 0 ? void 0 : window.document;
	const getDeepActiveElement = () => {
		let element = document === null || document === void 0 ? void 0 : document.activeElement;
		if (deep) {
			var _element$shadowRoot;
			while (element === null || element === void 0 ? void 0 : element.shadowRoot) element = element === null || element === void 0 || (_element$shadowRoot = element.shadowRoot) === null || _element$shadowRoot === void 0 ? void 0 : _element$shadowRoot.activeElement;
		}
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
/**
* Call function on every `requestAnimationFrame`. With controls of pausing and resuming.
*
* @see https://vueuse.org/useRafFn
* @param fn
* @param options
*/
function useRafFn(fn, options = {}) {
	const { immediate = true, fpsLimit = null, window = defaultWindow, once = false } = options;
	const isActive = shallowRef(false);
	const intervalLimit = computed(() => {
		const limit = toValue(fpsLimit);
		return limit ? 1e3 / limit : null;
	});
	let previousFrameTimestamp = 0;
	let rafId = null;
	function loop(timestamp) {
		if (!isActive.value || !window) return;
		if (!previousFrameTimestamp) previousFrameTimestamp = timestamp;
		const delta = timestamp - previousFrameTimestamp;
		if (intervalLimit.value && delta < intervalLimit.value) {
			rafId = window.requestAnimationFrame(loop);
			return;
		}
		previousFrameTimestamp = timestamp;
		fn({
			delta,
			timestamp
		});
		if (once) {
			isActive.value = false;
			rafId = null;
			return;
		}
		rafId = window.requestAnimationFrame(loop);
	}
	function resume() {
		if (!isActive.value && window) {
			isActive.value = true;
			previousFrameTimestamp = 0;
			rafId = window.requestAnimationFrame(loop);
		}
	}
	function pause() {
		isActive.value = false;
		if (rafId != null && window) {
			window.cancelAnimationFrame(rafId);
			rafId = null;
		}
	}
	if (immediate) resume();
	tryOnScopeDispose(pause);
	return {
		isActive: shallowReadonly(isActive),
		pause,
		resume
	};
}
/**
* Reactive async state. Will not block your setup function and will trigger changes once
* the promise is ready.
*
* @see https://vueuse.org/useAsyncState
* @param promise         The promise / async function to be resolved
* @param initialState    The initial state, used until the first evaluation finishes
* @param options
*/
function useAsyncState(promise, initialState, options) {
	var _globalThis$reportErr;
	const { immediate = true, delay = 0, onError = (_globalThis$reportErr = globalThis.reportError) !== null && _globalThis$reportErr !== void 0 ? _globalThis$reportErr : noop, onSuccess = noop, resetOnExecute = true, shallow = true, throwError } = options !== null && options !== void 0 ? options : {};
	const state = shallow ? shallowRef(initialState) : ref(initialState);
	const isReady = shallowRef(false);
	const isLoading = shallowRef(false);
	const error = shallowRef(void 0);
	let executionsCount = 0;
	async function execute(delay = 0, ...args) {
		const executionId = executionsCount += 1;
		if (resetOnExecute) state.value = toValue(initialState);
		error.value = void 0;
		isReady.value = false;
		isLoading.value = true;
		if (delay > 0) await promiseTimeout(delay);
		const _promise = typeof promise === "function" ? promise(...args) : promise;
		try {
			const data = await _promise;
			if (executionId === executionsCount) {
				state.value = data;
				isReady.value = true;
			}
			onSuccess(data);
			return data;
		} catch (e) {
			if (executionId === executionsCount) error.value = e;
			onError(e);
			if (throwError) throw e;
		} finally {
			if (executionId === executionsCount) isLoading.value = false;
		}
	}
	if (immediate) execute(delay);
	const shell = {
		state,
		isReady,
		isLoading,
		error,
		execute,
		executeImmediate: (...args) => execute(0, ...args)
	};
	function waitUntilIsLoaded() {
		return new Promise((resolve, reject) => {
			until(isLoading).toBe(false).then(() => resolve(shell)).catch(reject);
		});
	}
	return {
		...shell,
		then(onFulfilled, onRejected) {
			return waitUntilIsLoaded().then(onFulfilled, onRejected);
		}
	};
}
var ssrWidthSymbol = Symbol("vueuse-ssr-width");
/* @__NO_SIDE_EFFECTS__ */
function useSSRWidth() {
	const ssrWidth = hasInjectionContext() ? injectLocal(ssrWidthSymbol, null) : null;
	return typeof ssrWidth === "number" ? ssrWidth : void 0;
}
/**
* Reactive Media Query.
*
* @see https://vueuse.org/useMediaQuery
* @param query
* @param options
*/
function useMediaQuery(query, options = {}) {
	const { window = defaultWindow, ssrWidth = /* @__PURE__ */ useSSRWidth() } = options;
	const isSupported = /* @__PURE__ */ useSupported(() => window && "matchMedia" in window && typeof window.matchMedia === "function");
	const ssrSupport = shallowRef(typeof ssrWidth === "number");
	const mediaQuery = shallowRef();
	const matches = shallowRef(false);
	const handler = (event) => {
		matches.value = event.matches;
	};
	watchEffect(() => {
		if (ssrSupport.value) {
			ssrSupport.value = !isSupported.value;
			const queryStrings = toValue(query).split(",");
			matches.value = queryStrings.some((queryString) => {
				const not = queryString.includes("not all");
				const minWidth = queryString.match(/\(\s*min-width:\s*(-?\d+(?:\.\d*)?[a-z]+\s*)\)/);
				const maxWidth = queryString.match(/\(\s*max-width:\s*(-?\d+(?:\.\d*)?[a-z]+\s*)\)/);
				let res = Boolean(minWidth || maxWidth);
				if (minWidth && res) res = ssrWidth >= pxValue(minWidth[1]);
				if (maxWidth && res) res = ssrWidth <= pxValue(maxWidth[1]);
				return not ? !res : res;
			});
			return;
		}
		if (!isSupported.value) return;
		mediaQuery.value = window.matchMedia(toValue(query));
		matches.value = mediaQuery.value.matches;
	});
	useEventListener(mediaQuery, "change", handler, { passive: true });
	return computed(() => matches.value);
}
/**
* Breakpoints from Tailwind V2
*
* @see https://tailwindcss.com/docs/breakpoints
*/
var breakpointsTailwind = {
	"sm": 640,
	"md": 768,
	"lg": 1024,
	"xl": 1280,
	"2xl": 1536
};
/**
* Reactively viewport breakpoints
*
* @see https://vueuse.org/useBreakpoints
*
* @__NO_SIDE_EFFECTS__
*/
function useBreakpoints(breakpoints, options = {}) {
	function getValue(k, delta) {
		let v = toValue(breakpoints[toValue(k)]);
		if (delta != null) v = increaseWithUnit(v, delta);
		if (typeof v === "number") v = `${v}px`;
		return v;
	}
	const { window = defaultWindow, strategy = "min-width", ssrWidth = /* @__PURE__ */ useSSRWidth() } = options;
	const ssrSupport = typeof ssrWidth === "number";
	const mounted = ssrSupport ? shallowRef(false) : { value: true };
	if (ssrSupport) tryOnMounted(() => mounted.value = !!window);
	function match(query, size) {
		if (!mounted.value && ssrSupport) return query === "min" ? ssrWidth >= pxValue(size) : ssrWidth <= pxValue(size);
		if (!window) return false;
		return window.matchMedia(`(${query}-width: ${size})`).matches;
	}
	const greaterOrEqual = (k) => {
		return useMediaQuery(() => `(min-width: ${getValue(k)})`, options);
	};
	const smallerOrEqual = (k) => {
		return useMediaQuery(() => `(max-width: ${getValue(k)})`, options);
	};
	const shortcutMethods = Object.keys(breakpoints).reduce((shortcuts, k) => {
		Object.defineProperty(shortcuts, k, {
			get: () => strategy === "min-width" ? greaterOrEqual(k) : smallerOrEqual(k),
			enumerable: true,
			configurable: true
		});
		return shortcuts;
	}, {});
	function current() {
		const points = Object.keys(breakpoints).map((k) => [
			k,
			shortcutMethods[k],
			pxValue(getValue(k))
		]).sort((a, b) => a[2] - b[2]);
		return computed(() => points.filter(([, v]) => v.value).map(([k]) => k));
	}
	return Object.assign(shortcutMethods, {
		greaterOrEqual,
		smallerOrEqual,
		greater(k) {
			return useMediaQuery(() => `(min-width: ${getValue(k, .1)})`, options);
		},
		smaller(k) {
			return useMediaQuery(() => `(max-width: ${getValue(k, -.1)})`, options);
		},
		between(a, b) {
			return useMediaQuery(() => `(min-width: ${getValue(a)}) and (max-width: ${getValue(b, -.1)})`, options);
		},
		isGreater(k) {
			return match("min", getValue(k, .1));
		},
		isGreaterOrEqual(k) {
			return match("min", getValue(k));
		},
		isSmaller(k) {
			return match("max", getValue(k, -.1));
		},
		isSmallerOrEqual(k) {
			return match("max", getValue(k));
		},
		isInBetween(a, b) {
			return match("min", getValue(a)) && match("max", getValue(b, -.1));
		},
		current,
		active() {
			const bps = current();
			return computed(() => bps.value.length === 0 ? "" : bps.value.at(strategy === "min-width" ? -1 : 0));
		}
	});
}
function cloneFnJSON(source) {
	return JSON.parse(JSON.stringify(source));
}
var _global = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
var globalKey = "__vueuse_ssr_handlers__";
var handlers = /* #__PURE__ */ getHandlers();
function getHandlers() {
	if (!(globalKey in _global)) _global[globalKey] = _global[globalKey] || {};
	return _global[globalKey];
}
function getSSRHandler(key, fallback) {
	return handlers[key] || fallback;
}
function guessSerializerType(rawInit) {
	return rawInit == null ? "any" : rawInit instanceof Set ? "set" : rawInit instanceof Map ? "map" : rawInit instanceof Date ? "date" : typeof rawInit === "boolean" ? "boolean" : typeof rawInit === "string" ? "string" : typeof rawInit === "object" ? "object" : !Number.isNaN(rawInit) ? "number" : "any";
}
var StorageSerializers = {
	boolean: {
		read: (v) => v === "true",
		write: (v) => String(v)
	},
	object: {
		read: (v) => JSON.parse(v),
		write: (v) => JSON.stringify(v)
	},
	number: {
		read: (v) => Number.parseFloat(v),
		write: (v) => String(v)
	},
	any: {
		read: (v) => v,
		write: (v) => String(v)
	},
	string: {
		read: (v) => v,
		write: (v) => String(v)
	},
	map: {
		read: (v) => new Map(JSON.parse(v)),
		write: (v) => JSON.stringify(Array.from(v.entries()))
	},
	set: {
		read: (v) => new Set(JSON.parse(v)),
		write: (v) => JSON.stringify(Array.from(v))
	},
	date: {
		read: (v) => new Date(v),
		write: (v) => v.toISOString()
	}
};
var customStorageEventName = "vueuse-storage";
/**
* Reactive LocalStorage/SessionStorage.
*
* @see https://vueuse.org/useStorage
*/
function useStorage(key, defaults, storage, options = {}) {
	var _options$serializer;
	const { flush = "pre", deep = true, listenToStorageChanges = true, writeDefaults = true, mergeDefaults = false, shallow, window = defaultWindow, eventFilter, onError = (e) => {
		console.error(e);
	}, initOnMounted } = options;
	const data = (shallow ? shallowRef : ref)(typeof defaults === "function" ? defaults() : defaults);
	const keyComputed = computed(() => toValue(key));
	if (!storage) try {
		storage = getSSRHandler("getDefaultStorage", () => defaultWindow === null || defaultWindow === void 0 ? void 0 : defaultWindow.localStorage)();
	} catch (e) {
		onError(e);
	}
	if (!storage) return data;
	const rawInit = toValue(defaults);
	const type = guessSerializerType(rawInit);
	const serializer = (_options$serializer = options.serializer) !== null && _options$serializer !== void 0 ? _options$serializer : StorageSerializers[type];
	const { pause: pauseWatch, resume: resumeWatch } = watchPausable(data, (newValue) => write(newValue), {
		flush,
		deep,
		eventFilter
	});
	watch(keyComputed, () => update(), { flush });
	let firstMounted = false;
	const onStorageEvent = (ev) => {
		if (initOnMounted && !firstMounted) return;
		update(ev);
	};
	const onStorageCustomEvent = (ev) => {
		if (initOnMounted && !firstMounted) return;
		updateFromCustomEvent(ev);
	};
	/**
	* The custom event is needed for same-document syncing when using custom
	* storage backends, but it doesn't work across different documents.
	*
	* TODO: Consider implementing a BroadcastChannel-based solution that fixes this.
	*/
	if (window && listenToStorageChanges) if (storage instanceof Storage) useEventListener(window, "storage", onStorageEvent, { passive: true });
	else useEventListener(window, customStorageEventName, onStorageCustomEvent);
	if (initOnMounted) tryOnMounted(() => {
		firstMounted = true;
		update();
	});
	else update();
	function dispatchWriteEvent(oldValue, newValue) {
		if (window) {
			const payload = {
				key: keyComputed.value,
				oldValue,
				newValue,
				storageArea: storage
			};
			window.dispatchEvent(storage instanceof Storage ? new StorageEvent("storage", payload) : new CustomEvent(customStorageEventName, { detail: payload }));
		}
	}
	function write(v) {
		try {
			const oldValue = storage.getItem(keyComputed.value);
			if (v == null) {
				dispatchWriteEvent(oldValue, null);
				storage.removeItem(keyComputed.value);
			} else {
				const serialized = serializer.write(v);
				if (oldValue !== serialized) {
					storage.setItem(keyComputed.value, serialized);
					dispatchWriteEvent(oldValue, serialized);
				}
			}
		} catch (e) {
			onError(e);
		}
	}
	function read(event) {
		const rawValue = event ? event.newValue : storage.getItem(keyComputed.value);
		if (rawValue == null) {
			if (writeDefaults && rawInit != null) storage.setItem(keyComputed.value, serializer.write(rawInit));
			return rawInit;
		} else if (!event && mergeDefaults) {
			const value = serializer.read(rawValue);
			if (typeof mergeDefaults === "function") return mergeDefaults(value, rawInit);
			else if (type === "object" && !Array.isArray(value)) return {
				...rawInit,
				...value
			};
			return value;
		} else if (typeof rawValue !== "string") return rawValue;
		else return serializer.read(rawValue);
	}
	function update(event) {
		if (event && event.storageArea !== storage) return;
		if (event && event.key == null) {
			data.value = rawInit;
			return;
		}
		if (event && event.key !== keyComputed.value) return;
		pauseWatch();
		try {
			const serializedData = serializer.write(data.value);
			if (event === void 0 || (event === null || event === void 0 ? void 0 : event.newValue) !== serializedData) data.value = read(event);
		} catch (e) {
			onError(e);
		} finally {
			if (event) nextTick(resumeWatch);
			else resumeWatch();
		}
	}
	function updateFromCustomEvent(event) {
		update(event.detail);
	}
	return data;
}
function useCurrentElement(rootComponent) {
	const vm = getCurrentInstance();
	const currentElement = computedWithControl(() => null, () => rootComponent ? unrefElement(rootComponent) : vm.proxy.$el);
	onUpdated(currentElement.trigger);
	onMounted(currentElement.trigger);
	return currentElement;
}
/**
* Reactively track `document.visibilityState`.
*
* @see https://vueuse.org/useDocumentVisibility
*
* @__NO_SIDE_EFFECTS__
*/
function useDocumentVisibility(options = {}) {
	const { document = defaultDocument } = options;
	if (!document) return shallowRef("visible");
	const visibility = shallowRef(document.visibilityState);
	useEventListener(document, "visibilitychange", () => {
		visibility.value = document.visibilityState;
	}, { passive: true });
	return visibility;
}
function useDropZone(target, options = {}) {
	const isOverDropZone = shallowRef(false);
	const files = shallowRef(null);
	let counter = 0;
	let isValid = true;
	if (isClient) {
		var _options$multiple;
		var _options$preventDefau;
		const _options = typeof options === "function" ? { onDrop: options } : options;
		const multiple = (_options$multiple = _options.multiple) !== null && _options$multiple !== void 0 ? _options$multiple : true;
		const preventDefaultForUnhandled = (_options$preventDefau = _options.preventDefaultForUnhandled) !== null && _options$preventDefau !== void 0 ? _options$preventDefau : false;
		const getFiles = (event) => {
			var _event$dataTransfer$f;
			var _event$dataTransfer;
			const list = Array.from((_event$dataTransfer$f = (_event$dataTransfer = event.dataTransfer) === null || _event$dataTransfer === void 0 ? void 0 : _event$dataTransfer.files) !== null && _event$dataTransfer$f !== void 0 ? _event$dataTransfer$f : []);
			return list.length === 0 ? null : multiple ? list : [list[0]];
		};
		const checkDataTypes = (types) => {
			const dataTypes = unref(_options.dataTypes);
			if (typeof dataTypes === "function") return dataTypes(types);
			if (!(dataTypes === null || dataTypes === void 0 ? void 0 : dataTypes.length)) return true;
			if (types.length === 0) return false;
			return types.every((type) => dataTypes.some((allowedType) => type.includes(allowedType)));
		};
		const checkValidity = (items) => {
			if (_options.checkValidity) return _options.checkValidity(items);
			const types = Array.from(items !== null && items !== void 0 ? items : []).map((item) => item.type);
			const dataTypesValid = checkDataTypes(types);
			const multipleFilesValid = multiple || items.length <= 1;
			return dataTypesValid && multipleFilesValid;
		};
		const isSafari = () => /^(?:(?!chrome|android).)*safari/i.test(navigator.userAgent) && !("chrome" in window);
		const handleDragEvent = (event, eventType) => {
			var _event$dataTransfer2;
			var _ref;
			const dataTransferItemList = (_event$dataTransfer2 = event.dataTransfer) === null || _event$dataTransfer2 === void 0 ? void 0 : _event$dataTransfer2.items;
			isValid = (_ref = dataTransferItemList && checkValidity(dataTransferItemList)) !== null && _ref !== void 0 ? _ref : false;
			if (preventDefaultForUnhandled) event.preventDefault();
			if (!isSafari() && !isValid) {
				if (event.dataTransfer) event.dataTransfer.dropEffect = "none";
				return;
			}
			event.preventDefault();
			if (event.dataTransfer) event.dataTransfer.dropEffect = "copy";
			const currentFiles = getFiles(event);
			switch (eventType) {
				case "enter":
					var _options$onEnter;
					counter += 1;
					isOverDropZone.value = true;
					(_options$onEnter = _options.onEnter) === null || _options$onEnter === void 0 || _options$onEnter.call(_options, null, event);
					break;
				case "over":
					var _options$onOver;
					(_options$onOver = _options.onOver) === null || _options$onOver === void 0 || _options$onOver.call(_options, null, event);
					break;
				case "leave":
					var _options$onLeave;
					counter -= 1;
					if (counter === 0) isOverDropZone.value = false;
					(_options$onLeave = _options.onLeave) === null || _options$onLeave === void 0 || _options$onLeave.call(_options, null, event);
					break;
				case "drop":
					counter = 0;
					isOverDropZone.value = false;
					if (isValid) {
						var _options$onDrop;
						files.value = currentFiles;
						(_options$onDrop = _options.onDrop) === null || _options$onDrop === void 0 || _options$onDrop.call(_options, currentFiles, event);
					}
			}
		};
		useEventListener(target, "dragenter", (event) => handleDragEvent(event, "enter"));
		useEventListener(target, "dragover", (event) => handleDragEvent(event, "over"));
		useEventListener(target, "dragleave", (event) => handleDragEvent(event, "leave"));
		useEventListener(target, "drop", (event) => handleDragEvent(event, "drop"));
	}
	return {
		files,
		isOverDropZone
	};
}
/**
* Reports changes to the dimensions of an Element's content or the border-box
*
* @see https://vueuse.org/useResizeObserver
* @param target
* @param callback
* @param options
*/
function useResizeObserver(target, callback, options = {}) {
	const { window = defaultWindow, ...observerOptions } = options;
	let observer;
	const isSupported = /* @__PURE__ */ useSupported(() => window && "ResizeObserver" in window);
	const cleanup = () => {
		if (observer) {
			observer.disconnect();
			observer = void 0;
		}
	};
	const stopWatch = watch(computed(() => {
		const _targets = toValue(target);
		return Array.isArray(_targets) ? _targets.map((el) => unrefElement(el)) : [unrefElement(_targets)];
	}), (els) => {
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
/**
* Reactive bounding box of an HTML element.
*
* @see https://vueuse.org/useElementBounding
* @param target
*/
function useElementBounding(target, options = {}) {
	const { reset = true, windowResize = true, windowScroll = true, immediate = true, updateTiming = "sync" } = options;
	const height = shallowRef(0);
	const bottom = shallowRef(0);
	const left = shallowRef(0);
	const right = shallowRef(0);
	const top = shallowRef(0);
	const width = shallowRef(0);
	const x = shallowRef(0);
	const y = shallowRef(0);
	function recalculate() {
		const el = unrefElement(target);
		if (!el) {
			if (reset) {
				height.value = 0;
				bottom.value = 0;
				left.value = 0;
				right.value = 0;
				top.value = 0;
				width.value = 0;
				x.value = 0;
				y.value = 0;
			}
			return;
		}
		const rect = el.getBoundingClientRect();
		height.value = rect.height;
		bottom.value = rect.bottom;
		left.value = rect.left;
		right.value = rect.right;
		top.value = rect.top;
		width.value = rect.width;
		x.value = rect.x;
		y.value = rect.y;
	}
	function update() {
		if (updateTiming === "sync") recalculate();
		else if (updateTiming === "next-frame") requestAnimationFrame(() => recalculate());
	}
	useResizeObserver(target, update);
	watch(() => unrefElement(target), (ele) => !ele && update());
	useMutationObserver(target, update, { attributeFilter: ["style", "class"] });
	if (windowScroll) useEventListener("scroll", update, {
		capture: true,
		passive: true
	});
	if (windowResize) useEventListener("resize", update, { passive: true });
	tryOnMounted(() => {
		if (immediate) update();
	});
	return {
		height,
		bottom,
		left,
		right,
		top,
		width,
		x,
		y,
		update
	};
}
function useElementHover(el, options = {}) {
	const { delayEnter = 0, delayLeave = 0, triggerOnRemoval = false, window = defaultWindow } = options;
	const isHovered = shallowRef(false);
	let timer;
	const toggle = (entering) => {
		const delay = entering ? delayEnter : delayLeave;
		if (timer) {
			clearTimeout(timer);
			timer = void 0;
		}
		if (delay) timer = setTimeout(() => isHovered.value = entering, delay);
		else isHovered.value = entering;
	};
	if (!window) return isHovered;
	useEventListener(el, "mouseenter", () => toggle(true), { passive: true });
	useEventListener(el, "mouseleave", () => toggle(false), { passive: true });
	if (triggerOnRemoval) onElementRemoval(computed(() => unrefElement(el)), () => toggle(false));
	return isHovered;
}
/**
* Reactive size of an HTML element.
*
* @see https://vueuse.org/useElementSize
*/
function useElementSize(target, initialSize = {
	width: 0,
	height: 0
}, options = {}) {
	const { window = defaultWindow, box = "content-box" } = options;
	const isSVG = computed(() => {
		var _unrefElement;
		return (_unrefElement = unrefElement(target)) === null || _unrefElement === void 0 || (_unrefElement = _unrefElement.namespaceURI) === null || _unrefElement === void 0 ? void 0 : _unrefElement.includes("svg");
	});
	const width = shallowRef(initialSize.width);
	const height = shallowRef(initialSize.height);
	const { stop: stop1 } = useResizeObserver(target, ([entry]) => {
		const boxSize = box === "border-box" ? entry.borderBoxSize : box === "content-box" ? entry.contentBoxSize : entry.devicePixelContentBoxSize;
		if (window && isSVG.value) {
			const $elem = unrefElement(target);
			if ($elem) {
				const rect = $elem.getBoundingClientRect();
				width.value = rect.width;
				height.value = rect.height;
			}
		} else if (boxSize) {
			const formatBoxSize = toArray(boxSize);
			width.value = formatBoxSize.reduce((acc, { inlineSize }) => acc + inlineSize, 0);
			height.value = formatBoxSize.reduce((acc, { blockSize }) => acc + blockSize, 0);
		} else {
			width.value = entry.contentRect.width;
			height.value = entry.contentRect.height;
		}
	}, options);
	tryOnMounted(() => {
		const ele = unrefElement(target);
		if (ele && "offsetWidth" in ele) if (box === "content-box" && window) {
			const cs = window.getComputedStyle(ele);
			const padX = Number.parseFloat(cs.paddingLeft) + Number.parseFloat(cs.paddingRight);
			const padY = Number.parseFloat(cs.paddingTop) + Number.parseFloat(cs.paddingBottom);
			const bdX = Number.parseFloat(cs.borderLeftWidth) + Number.parseFloat(cs.borderRightWidth);
			const bdY = Number.parseFloat(cs.borderTopWidth) + Number.parseFloat(cs.borderBottomWidth);
			width.value = ele.offsetWidth - padX - bdX;
			height.value = ele.offsetHeight - padY - bdY;
		} else {
			width.value = ele.offsetWidth;
			height.value = ele.offsetHeight;
		}
		else if (ele) {
			width.value = initialSize.width;
			height.value = initialSize.height;
		}
	});
	const stop2 = watch(() => unrefElement(target), (ele) => {
		width.value = ele ? initialSize.width : 0;
		height.value = ele ? initialSize.height : 0;
	});
	function stop() {
		stop1();
		stop2();
	}
	return {
		width,
		height,
		stop
	};
}
/**
* Detects changes to a target element's visibility.
*
* @see https://vueuse.org/useIntersectionObserver
* @param target
* @param callback
* @param options
*/
function useIntersectionObserver(target, callback, options = {}) {
	const { root, rootMargin, threshold = 0, window = defaultWindow, immediate = true } = options;
	const isSupported = /* @__PURE__ */ useSupported(() => window && "IntersectionObserver" in window);
	const targets = computed(() => {
		return toArray(toValue(target)).map(unrefElement).filter(notNullish);
	});
	let cleanup = noop;
	const isActive = shallowRef(immediate);
	const stopWatch = isSupported.value ? watch(() => [
		targets.value,
		unrefElement(root),
		toValue(rootMargin),
		isActive.value
	], ([targets, root, rootMargin]) => {
		cleanup();
		if (!isActive.value) return;
		if (!targets.length) return;
		const observer = new IntersectionObserver(callback, {
			root: unrefElement(root),
			rootMargin,
			threshold
		});
		targets.forEach((el) => el && observer.observe(el));
		cleanup = () => {
			observer.disconnect();
			cleanup = noop;
		};
	}, {
		immediate,
		flush: "post"
	}) : noop;
	const stop = () => {
		cleanup();
		stopWatch();
		isActive.value = false;
	};
	tryOnScopeDispose(stop);
	return {
		isSupported,
		isActive,
		pause() {
			cleanup();
			isActive.value = false;
		},
		resume() {
			isActive.value = true;
		},
		stop
	};
}
function useElementVisibility(element, options = {}) {
	const { window = defaultWindow, scrollTarget, threshold = 0, rootMargin, once = false, initialValue = false } = options;
	const isVisible = shallowRef(initialValue);
	const observerController = useIntersectionObserver(element, (intersectionObserverEntries) => {
		let isIntersecting = isVisible.value;
		let latestTime = 0;
		for (const entry of intersectionObserverEntries) if (entry.time >= latestTime) {
			latestTime = entry.time;
			isIntersecting = entry.isIntersecting;
		}
		isVisible.value = isIntersecting;
		if (once) watchOnce(isVisible, () => {
			observerController.stop();
		});
	}, {
		root: scrollTarget,
		window,
		threshold,
		rootMargin
	});
	return options.controls ? {
		...observerController,
		isVisible
	} : isVisible;
}
function useFavicon(newIcon = null, options = {}) {
	const { baseUrl = "", rel = "icon", document = defaultDocument } = options;
	const favicon = toRef(newIcon);
	const applyIcon = (icon) => {
		const elements = document === null || document === void 0 ? void 0 : document.head.querySelectorAll(`link[rel*="${rel}"]`);
		if (!elements || elements.length === 0) {
			const link = document === null || document === void 0 ? void 0 : document.createElement("link");
			if (link) {
				link.rel = rel;
				link.href = `${baseUrl}${icon}`;
				link.type = `image/${icon.split(".").pop()}`;
				document === null || document === void 0 || document.head.append(link);
			}
			return;
		}
		elements === null || elements === void 0 || elements.forEach((el) => el.href = `${baseUrl}${icon}`);
	};
	watch(favicon, (i, o) => {
		if (typeof i === "string" && i !== o) applyIcon(i);
	}, { immediate: true });
	return favicon;
}
var EVENT_FOCUS_IN = "focusin";
var EVENT_FOCUS_OUT = "focusout";
var PSEUDO_CLASS_FOCUS_WITHIN = ":focus-within";
/**
* Track if focus is contained within the target element
*
* @see https://vueuse.org/useFocusWithin
* @param target The target element to track
* @param options Focus within options
*/
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
		var _targetElement$value$;
		var _targetElement$value;
		var _targetElement$value$2;
		return _focused.value = (_targetElement$value$ = (_targetElement$value = targetElement.value) === null || _targetElement$value === void 0 || (_targetElement$value$2 = _targetElement$value.matches) === null || _targetElement$value$2 === void 0 ? void 0 : _targetElement$value$2.call(_targetElement$value, PSEUDO_CLASS_FOCUS_WITHIN)) !== null && _targetElement$value$ !== void 0 ? _targetElement$value$ : false;
	}, listenerOptions);
	return { focused };
}
var eventHandlers = [
	"fullscreenchange",
	"webkitfullscreenchange",
	"webkitendfullscreen",
	"mozfullscreenchange",
	"MSFullscreenChange"
];
/**
* Reactive Fullscreen API.
*
* @see https://vueuse.org/useFullscreen
* @param target
* @param options
*/
function useFullscreen(target, options = {}) {
	const { document = defaultDocument, autoExit = false } = options;
	const targetRef = computed(() => {
		var _unrefElement;
		return (_unrefElement = unrefElement(target)) !== null && _unrefElement !== void 0 ? _unrefElement : document === null || document === void 0 ? void 0 : document.documentElement;
	});
	const isFullscreen = shallowRef(false);
	const requestMethod = computed(() => {
		return [
			"requestFullscreen",
			"webkitRequestFullscreen",
			"webkitEnterFullscreen",
			"webkitEnterFullScreen",
			"webkitRequestFullScreen",
			"mozRequestFullScreen",
			"msRequestFullscreen"
		].find((m) => document && m in document || targetRef.value && m in targetRef.value);
	});
	const exitMethod = computed(() => {
		return [
			"exitFullscreen",
			"webkitExitFullscreen",
			"webkitExitFullScreen",
			"webkitCancelFullScreen",
			"mozCancelFullScreen",
			"msExitFullscreen"
		].find((m) => document && m in document || targetRef.value && m in targetRef.value);
	});
	const fullscreenEnabled = computed(() => {
		return [
			"fullScreen",
			"webkitIsFullScreen",
			"webkitDisplayingFullscreen",
			"mozFullScreen",
			"msFullscreenElement"
		].find((m) => document && m in document || targetRef.value && m in targetRef.value);
	});
	const fullscreenElementMethod = [
		"fullscreenElement",
		"webkitFullscreenElement",
		"mozFullScreenElement",
		"msFullscreenElement"
	].find((m) => document && m in document);
	const isSupported = /* @__PURE__ */ useSupported(() => targetRef.value && document && requestMethod.value !== void 0 && exitMethod.value !== void 0 && fullscreenEnabled.value !== void 0);
	const isCurrentElementFullScreen = () => {
		if (fullscreenElementMethod) return (document === null || document === void 0 ? void 0 : document[fullscreenElementMethod]) === targetRef.value;
		return false;
	};
	const isElementFullScreen = () => {
		if (fullscreenEnabled.value) if (document && document[fullscreenEnabled.value] != null) return document[fullscreenEnabled.value];
		else {
			const target = targetRef.value;
			if ((target === null || target === void 0 ? void 0 : target[fullscreenEnabled.value]) != null) return Boolean(target[fullscreenEnabled.value]);
		}
		return false;
	};
	async function exit() {
		if (!isSupported.value || !isFullscreen.value) return;
		if (exitMethod.value) if ((document === null || document === void 0 ? void 0 : document[exitMethod.value]) != null) await document[exitMethod.value]();
		else {
			const target = targetRef.value;
			if ((target === null || target === void 0 ? void 0 : target[exitMethod.value]) != null) await target[exitMethod.value]();
		}
		isFullscreen.value = false;
	}
	async function enter() {
		if (!isSupported.value || isFullscreen.value) return;
		if (isElementFullScreen()) await exit();
		const target = targetRef.value;
		if (requestMethod.value && (target === null || target === void 0 ? void 0 : target[requestMethod.value]) != null) {
			await target[requestMethod.value]();
			isFullscreen.value = true;
		}
	}
	async function toggle() {
		await (isFullscreen.value ? exit() : enter());
	}
	const handlerCallback = () => {
		const isElementFullScreenValue = isElementFullScreen();
		if (!isElementFullScreenValue || isElementFullScreenValue && isCurrentElementFullScreen()) isFullscreen.value = isElementFullScreenValue;
	};
	const listenerOptions = {
		capture: false,
		passive: true
	};
	useEventListener(document, eventHandlers, handlerCallback, listenerOptions);
	useEventListener(() => unrefElement(targetRef), eventHandlers, handlerCallback, listenerOptions);
	tryOnMounted(handlerCallback, false);
	if (autoExit) tryOnScopeDispose(exit);
	return {
		isSupported,
		isFullscreen,
		enter,
		exit,
		toggle
	};
}
async function loadImage(options) {
	return new Promise((resolve, reject) => {
		const img = new Image();
		const { src, srcset, sizes, class: clazz, loading, crossorigin, referrerPolicy, width, height, decoding, fetchPriority, ismap, usemap } = options;
		img.src = src;
		if (srcset != null) img.srcset = srcset;
		if (sizes != null) img.sizes = sizes;
		if (clazz != null) img.className = clazz;
		if (loading != null) img.loading = loading;
		if (crossorigin != null) img.crossOrigin = crossorigin;
		if (referrerPolicy != null) img.referrerPolicy = referrerPolicy;
		if (width != null) img.width = width;
		if (height != null) img.height = height;
		if (decoding != null) img.decoding = decoding;
		if (fetchPriority != null) img.fetchPriority = fetchPriority;
		if (ismap != null) img.isMap = ismap;
		if (usemap != null) img.useMap = usemap;
		img.onload = () => resolve(img);
		img.onerror = reject;
	});
}
/**
* Reactive load an image in the browser, you can wait the result to display it or show a fallback.
*
* @see https://vueuse.org/useImage
* @param options Image attributes, as used in the <img> tag
* @param asyncStateOptions
*/
function useImage(options, asyncStateOptions = {}) {
	const state = useAsyncState(() => loadImage(toValue(options)), void 0, {
		resetOnExecute: true,
		...asyncStateOptions
	});
	watch(() => toValue(options), () => state.execute(asyncStateOptions.delay), { deep: true });
	return state;
}
/**
* Resolves an element from a given element, window, or document.
*
* @internal
*/
function resolveElement(el) {
	if (typeof Window !== "undefined" && el instanceof Window) return el.document.documentElement;
	if (typeof Document !== "undefined" && el instanceof Document) return el.documentElement;
	return el;
}
/**
* We have to check if the scroll amount is close enough to some threshold in order to
* more accurately calculate arrivedState. This is because scrollTop/scrollLeft are non-rounded
* numbers, while scrollHeight/scrollWidth and clientHeight/clientWidth are rounded.
* https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollHeight#determine_if_an_element_has_been_totally_scrolled
*/
var ARRIVED_STATE_THRESHOLD_PIXELS = 1;
/**
* Reactive scroll.
*
* @see https://vueuse.org/useScroll
* @param element
* @param options
*/
function useScroll(element, options = {}) {
	const { throttle = 0, idle = 200, onStop = noop, onScroll = noop, offset = {
		left: 0,
		right: 0,
		top: 0,
		bottom: 0
	}, observe: _observe = { mutation: false }, eventListenerOptions = {
		capture: false,
		passive: true
	}, behavior = "auto", window = defaultWindow, onError = (e) => {
		console.error(e);
	} } = options;
	const observe = typeof _observe === "boolean" ? { mutation: _observe } : _observe;
	const internalX = shallowRef(0);
	const internalY = shallowRef(0);
	const x = computed({
		get() {
			return internalX.value;
		},
		set(x) {
			scrollTo(x, void 0);
		}
	});
	const y = computed({
		get() {
			return internalY.value;
		},
		set(y) {
			scrollTo(void 0, y);
		}
	});
	function scrollTo(_x, _y) {
		var _ref;
		var _toValue;
		var _toValue2;
		var _document;
		if (!window) return;
		const _element = toValue(element);
		if (!_element) return;
		(_ref = _element instanceof Document ? window.document.body : _element) === null || _ref === void 0 || _ref.scrollTo({
			top: (_toValue = toValue(_y)) !== null && _toValue !== void 0 ? _toValue : y.value,
			left: (_toValue2 = toValue(_x)) !== null && _toValue2 !== void 0 ? _toValue2 : x.value,
			behavior: toValue(behavior)
		});
		const scrollContainer = (_element === null || _element === void 0 || (_document = _element.document) === null || _document === void 0 ? void 0 : _document.documentElement) || (_element === null || _element === void 0 ? void 0 : _element.documentElement) || _element;
		if (x != null) internalX.value = scrollContainer.scrollLeft;
		if (y != null) internalY.value = scrollContainer.scrollTop;
	}
	const isScrolling = shallowRef(false);
	const arrivedState = reactive({
		left: true,
		right: false,
		top: true,
		bottom: false
	});
	const directions = reactive({
		left: false,
		right: false,
		top: false,
		bottom: false
	});
	const onScrollEnd = (e) => {
		if (!isScrolling.value) return;
		isScrolling.value = false;
		directions.left = false;
		directions.right = false;
		directions.top = false;
		directions.bottom = false;
		onStop(e);
	};
	const onScrollEndDebounced = useDebounceFn(onScrollEnd, throttle + idle);
	const setArrivedState = (target) => {
		var _document2;
		if (!window) return;
		const el = (target === null || target === void 0 || (_document2 = target.document) === null || _document2 === void 0 ? void 0 : _document2.documentElement) || (target === null || target === void 0 ? void 0 : target.documentElement) || unrefElement(target);
		const { display, flexDirection, direction } = window.getComputedStyle(el);
		const directionMultipler = direction === "rtl" ? -1 : 1;
		const scrollLeft = el.scrollLeft;
		directions.left = scrollLeft < internalX.value;
		directions.right = scrollLeft > internalX.value;
		const left = Math.abs(scrollLeft * directionMultipler) <= (offset.left || 0);
		const right = Math.abs(scrollLeft * directionMultipler) + el.clientWidth >= el.scrollWidth - (offset.right || 0) - ARRIVED_STATE_THRESHOLD_PIXELS;
		if (display === "flex" && flexDirection === "row-reverse") {
			arrivedState.left = right;
			arrivedState.right = left;
		} else {
			arrivedState.left = left;
			arrivedState.right = right;
		}
		internalX.value = scrollLeft;
		let scrollTop = el.scrollTop;
		if (target === window.document && !scrollTop) scrollTop = window.document.body.scrollTop;
		directions.top = scrollTop < internalY.value;
		directions.bottom = scrollTop > internalY.value;
		const top = Math.abs(scrollTop) <= (offset.top || 0);
		const bottom = Math.abs(scrollTop) + el.clientHeight >= el.scrollHeight - (offset.bottom || 0) - ARRIVED_STATE_THRESHOLD_PIXELS;
		/**
		* reverse columns and rows behave exactly the other way around,
		* bottom is treated as top and top is treated as the negative version of bottom
		*/
		if (display === "flex" && flexDirection === "column-reverse") {
			arrivedState.top = bottom;
			arrivedState.bottom = top;
		} else {
			arrivedState.top = top;
			arrivedState.bottom = bottom;
		}
		internalY.value = scrollTop;
	};
	const onScrollHandler = (e) => {
		var _documentElement;
		if (!window) return;
		const eventTarget = (_documentElement = e.target.documentElement) !== null && _documentElement !== void 0 ? _documentElement : e.target;
		setArrivedState(eventTarget);
		isScrolling.value = true;
		onScrollEndDebounced(e);
		onScroll(e);
	};
	useEventListener(element, "scroll", throttle ? useThrottleFn(onScrollHandler, throttle, true, false) : onScrollHandler, eventListenerOptions);
	tryOnMounted(() => {
		try {
			const _element = toValue(element);
			if (!_element) return;
			setArrivedState(_element);
		} catch (e) {
			onError(e);
		}
	});
	if ((observe === null || observe === void 0 ? void 0 : observe.mutation) && element != null && element !== window && element !== document) useMutationObserver(element, () => {
		const _element = toValue(element);
		if (!_element) return;
		setArrivedState(_element);
	}, {
		attributes: true,
		childList: true,
		subtree: true
	});
	useEventListener(element, "scrollend", onScrollEnd, eventListenerOptions);
	return {
		x,
		y,
		isScrolling,
		arrivedState,
		directions,
		measure() {
			const _element = toValue(element);
			if (window && _element) setArrivedState(_element);
		}
	};
}
/**
* Reactive infinite scroll.
*
* @see https://vueuse.org/useInfiniteScroll
*/
function useInfiniteScroll(element, onLoadMore, options = {}) {
	var _options$distance;
	const { direction = "bottom", interval = 100, canLoadMore = () => true } = options;
	const state = reactive(useScroll(element, {
		...options,
		offset: {
			[direction]: (_options$distance = options.distance) !== null && _options$distance !== void 0 ? _options$distance : 0,
			...options.offset
		}
	}));
	const promise = shallowRef();
	const isLoading = computed(() => !!promise.value);
	const observedElement = computed(() => {
		return resolveElement(toValue(element));
	});
	const isElementVisible = useElementVisibility(observedElement);
	const canLoad = computed(() => {
		if (!observedElement.value) return false;
		return canLoadMore(observedElement.value);
	});
	function checkAndLoad() {
		state.measure();
		if (!observedElement.value || !isElementVisible.value || !canLoad.value || promise.value) return;
		const { scrollHeight, clientHeight, scrollWidth, clientWidth } = observedElement.value;
		const isNarrower = direction === "bottom" || direction === "top" ? scrollHeight <= clientHeight : scrollWidth <= clientWidth;
		if (state.arrivedState[direction] || isNarrower) promise.value = Promise.all([onLoadMore(state), new Promise((resolve) => setTimeout(resolve, interval))]).finally(() => {
			promise.value = null;
			nextTick(() => checkAndLoad());
		});
	}
	tryOnUnmounted(watch(() => [
		state.arrivedState[direction],
		isElementVisible.value,
		canLoad.value
	], checkAndLoad, {
		immediate: true,
		flush: "post"
	}));
	return {
		isLoading,
		reset() {
			nextTick(() => checkAndLoad());
		}
	};
}
var defaultEvents = [
	"mousedown",
	"mouseup",
	"keydown",
	"keyup"
];
/* @__NO_SIDE_EFFECTS__ */
function useKeyModifier(modifier, options = {}) {
	const { events = defaultEvents, document = defaultDocument, initial = null } = options;
	const state = shallowRef(initial);
	if (document) events.forEach((listenerEvent) => {
		useEventListener(document, listenerEvent, (evt) => {
			if (typeof evt.getModifierState === "function") state.value = evt.getModifierState(modifier);
		}, { passive: true });
	});
	return state;
}
/**
* Reactive LocalStorage.
*
* @see https://vueuse.org/useLocalStorage
* @param key
* @param initialValue
* @param options
*/
function useLocalStorage(key, initialValue, options = {}) {
	const { window = defaultWindow } = options;
	return useStorage(key, initialValue, window === null || window === void 0 ? void 0 : window.localStorage, options);
}
var DefaultMagicKeysAliasMap = {
	ctrl: "control",
	command: "meta",
	cmd: "meta",
	option: "alt",
	up: "arrowup",
	down: "arrowdown",
	left: "arrowleft",
	right: "arrowright"
};
/**
* Reactive keys pressed state, with magical keys combination support.
*
* @see https://vueuse.org/useMagicKeys
*/
function useMagicKeys(options = {}) {
	const { reactive: useReactive = false, target = defaultWindow, aliasMap = DefaultMagicKeysAliasMap, passive = true, onEventFired = noop } = options;
	const current = reactive(/* @__PURE__ */ new Set());
	const obj = {
		toJSON() {
			return {};
		},
		current
	};
	const refs = useReactive ? reactive(obj) : obj;
	const metaDeps = /* @__PURE__ */ new Set();
	const depsMap = /* @__PURE__ */ new Map([
		["Meta", metaDeps],
		["Shift", /* @__PURE__ */ new Set()],
		["Alt", /* @__PURE__ */ new Set()]
	]);
	const usedKeys = /* @__PURE__ */ new Set();
	function setRefs(key, value) {
		if (key in refs) if (useReactive) refs[key] = value;
		else refs[key].value = value;
	}
	function reset() {
		current.clear();
		for (const key of usedKeys) setRefs(key, false);
	}
	function updateDeps(value, e, keys) {
		if (!value || typeof e.getModifierState !== "function") return;
		for (const [modifier, depsSet] of depsMap) if (e.getModifierState(modifier)) {
			keys.forEach((key) => depsSet.add(key));
			break;
		}
	}
	function clearDeps(value, key) {
		if (value) return;
		const depsMapKey = `${key[0].toUpperCase()}${key.slice(1)}`;
		const deps = depsMap.get(depsMapKey);
		if (!["shift", "alt"].includes(key) || !deps) return;
		const depsArray = Array.from(deps);
		const depsIndex = depsArray.indexOf(key);
		depsArray.forEach((key, index) => {
			if (index >= depsIndex) {
				current.delete(key);
				setRefs(key, false);
			}
		});
		deps.clear();
	}
	function updateRefs(e, value) {
		var _e$key;
		var _e$code;
		const key = (_e$key = e.key) === null || _e$key === void 0 ? void 0 : _e$key.toLowerCase();
		const values = [(_e$code = e.code) === null || _e$code === void 0 ? void 0 : _e$code.toLowerCase(), key].filter(Boolean);
		if (!key) return;
		if (key) if (value) current.add(key);
		else current.delete(key);
		for (const key of values) {
			usedKeys.add(key);
			setRefs(key, value);
		}
		updateDeps(value, e, [...current, ...values]);
		clearDeps(value, key);
		if (key === "meta" && !value) {
			metaDeps.forEach((key) => {
				current.delete(key);
				setRefs(key, false);
			});
			metaDeps.clear();
		}
	}
	useEventListener(target, "keydown", (e) => {
		updateRefs(e, true);
		return onEventFired(e);
	}, { passive });
	useEventListener(target, "keyup", (e) => {
		updateRefs(e, false);
		return onEventFired(e);
	}, { passive });
	useEventListener("blur", reset, { passive });
	useEventListener("focus", reset, { passive });
	const proxy = new Proxy(refs, { get(target, prop, rec) {
		if (typeof prop !== "string") return Reflect.get(target, prop, rec);
		prop = prop.toLowerCase();
		if (prop in aliasMap) prop = aliasMap[prop];
		if (!(prop in refs)) if (/[+_-]/.test(prop)) {
			const keys = prop.split(/[+_-]/g).map((i) => i.trim());
			refs[prop] = computed(() => keys.map((key) => toValue(proxy[key])).every(Boolean));
		} else refs[prop] = shallowRef(false);
		const r = Reflect.get(target, prop, rec);
		return useReactive ? toValue(r) : r;
	} });
	return proxy;
}
/**
* Automatically check if the ref exists and if it does run the cb fn
*/
function usingElRef(source, cb) {
	if (toValue(source)) cb(toValue(source));
}
/**
* Converts a TimeRange object to an array
*/
function timeRangeToArray(timeRanges) {
	let ranges = [];
	for (let i = 0; i < timeRanges.length; ++i) ranges = [...ranges, [timeRanges.start(i), timeRanges.end(i)]];
	return ranges;
}
/**
* Converts a TextTrackList object to an array of `UseMediaTextTrack`
*/
function tracksToArray(tracks) {
	return Array.from(tracks).map(({ label, kind, language, mode, activeCues, cues, inBandMetadataTrackDispatchType }, id) => ({
		id,
		label,
		kind,
		language,
		mode,
		activeCues,
		cues,
		inBandMetadataTrackDispatchType
	}));
}
var defaultOptions = {
	src: "",
	tracks: []
};
function useMediaControls(target, options = {}) {
	target = toRef(target);
	options = {
		...defaultOptions,
		...options
	};
	const { document = defaultDocument } = options;
	const listenerOptions = { passive: true };
	const currentTime = shallowRef(0);
	const duration = shallowRef(0);
	const seeking = shallowRef(false);
	const volume = shallowRef(1);
	const waiting = shallowRef(false);
	const ended = shallowRef(false);
	const playing = shallowRef(false);
	const rate = shallowRef(1);
	const stalled = shallowRef(false);
	const buffered = shallowRef([]);
	const tracks = shallowRef([]);
	const selectedTrack = shallowRef(-1);
	const isPictureInPicture = shallowRef(false);
	const muted = shallowRef(false);
	const supportsPictureInPicture = Boolean(document && "pictureInPictureEnabled" in document);
	const sourceErrorEvent = createEventHook();
	const playbackErrorEvent = createEventHook();
	/**
	* Disables the specified track. If no track is specified then
	* all tracks will be disabled
	*
	* @param track The id of the track to disable
	*/
	const disableTrack = (track) => {
		usingElRef(target, (el) => {
			if (track) {
				const id = typeof track === "number" ? track : track.id;
				el.textTracks[id].mode = "disabled";
			} else for (let i = 0; i < el.textTracks.length; ++i) el.textTracks[i].mode = "disabled";
			selectedTrack.value = -1;
		});
	};
	/**
	* Enables the specified track and disables the
	* other tracks unless otherwise specified
	*
	* @param track The track of the id of the track to enable
	* @param disableTracks Disable all other tracks
	*/
	const enableTrack = (track, disableTracks = true) => {
		usingElRef(target, (el) => {
			const id = typeof track === "number" ? track : track.id;
			if (disableTracks) disableTrack();
			el.textTracks[id].mode = "showing";
			selectedTrack.value = id;
		});
	};
	/**
	* Toggle picture in picture mode for the player.
	*/
	const togglePictureInPicture = () => {
		return new Promise((resolve, reject) => {
			usingElRef(target, async (el) => {
				if (supportsPictureInPicture) if (!isPictureInPicture.value) el.requestPictureInPicture().then(resolve).catch(reject);
				else document.exitPictureInPicture().then(resolve).catch(reject);
			});
		});
	};
	/**
	* This will automatically inject sources to the media element. The sources will be
	* appended as children to the media element as `<source>` elements.
	*/
	watchEffect(() => {
		if (!document) return;
		const el = toValue(target);
		if (!el) return;
		const src = toValue(options.src);
		let sources = [];
		if (!src) return;
		if (typeof src === "string") sources = [{ src }];
		else if (Array.isArray(src)) sources = src;
		else if (isObject$1(src)) sources = [src];
		el.querySelectorAll("source").forEach((e) => {
			e.remove();
		});
		sources.forEach(({ src, type, media }) => {
			const source = document.createElement("source");
			source.setAttribute("src", src);
			source.setAttribute("type", type || "");
			source.setAttribute("media", media || "");
			useEventListener(source, "error", sourceErrorEvent.trigger, listenerOptions);
			el.appendChild(source);
		});
		el.load();
	});
	/**
	* Apply composable state to the element, also when element is changed
	*/
	watch([target, volume], () => {
		const el = toValue(target);
		if (!el) return;
		el.volume = volume.value;
	});
	watch([target, muted], () => {
		const el = toValue(target);
		if (!el) return;
		el.muted = muted.value;
	});
	watch([target, rate], () => {
		const el = toValue(target);
		if (!el) return;
		el.playbackRate = rate.value;
	});
	/**
	* Load Tracks
	*/
	watchEffect(() => {
		if (!document) return;
		const textTracks = toValue(options.tracks);
		const el = toValue(target);
		if (!textTracks || !textTracks.length || !el) return;
		/**
		* The MediaAPI provides an API for adding text tracks, but they don't currently
		* have an API for removing text tracks, so instead we will just create and remove
		* the tracks manually using the HTML api.
		*/
		el.querySelectorAll("track").forEach((e) => e.remove());
		textTracks.forEach(({ default: isDefault, kind, label, src, srcLang }, i) => {
			const track = document.createElement("track");
			track.default = isDefault || false;
			track.kind = kind;
			track.label = label;
			track.src = src;
			track.srclang = srcLang;
			if (track.default) selectedTrack.value = i;
			el.appendChild(track);
		});
	});
	/**
	* This will allow us to update the current time from the timeupdate event
	* without setting the medias current position, but if the user changes the
	* current time via the ref, then the media will seek.
	*
	* If we did not use an ignorable watch, then the current time update from
	* the timeupdate event would cause the media to stutter.
	*/
	const { ignoreUpdates: ignoreCurrentTimeUpdates } = watchIgnorable(currentTime, (time) => {
		const el = toValue(target);
		if (!el) return;
		el.currentTime = time;
	});
	/**
	* Using an ignorable watch so we can control the play state using a ref and not
	* a function
	*/
	const { ignoreUpdates: ignorePlayingUpdates } = watchIgnorable(playing, (isPlaying) => {
		const el = toValue(target);
		if (!el) return;
		if (isPlaying) el.play().catch((e) => {
			playbackErrorEvent.trigger(e);
			throw e;
		});
		else el.pause();
	});
	useEventListener(target, "timeupdate", () => ignoreCurrentTimeUpdates(() => currentTime.value = toValue(target).currentTime), listenerOptions);
	useEventListener(target, "durationchange", () => duration.value = toValue(target).duration, listenerOptions);
	useEventListener(target, "progress", () => buffered.value = timeRangeToArray(toValue(target).buffered), listenerOptions);
	useEventListener(target, "seeking", () => seeking.value = true, listenerOptions);
	useEventListener(target, "seeked", () => seeking.value = false, listenerOptions);
	useEventListener(target, ["waiting", "loadstart"], () => {
		waiting.value = true;
		ignorePlayingUpdates(() => playing.value = false);
	}, listenerOptions);
	useEventListener(target, "loadeddata", () => waiting.value = false, listenerOptions);
	useEventListener(target, "playing", () => {
		waiting.value = false;
		ended.value = false;
		ignorePlayingUpdates(() => playing.value = true);
	}, listenerOptions);
	useEventListener(target, "ratechange", () => rate.value = toValue(target).playbackRate, listenerOptions);
	useEventListener(target, "stalled", () => stalled.value = true, listenerOptions);
	useEventListener(target, "ended", () => ended.value = true, listenerOptions);
	useEventListener(target, "pause", () => ignorePlayingUpdates(() => playing.value = false), listenerOptions);
	useEventListener(target, "play", () => ignorePlayingUpdates(() => playing.value = true), listenerOptions);
	useEventListener(target, "enterpictureinpicture", () => isPictureInPicture.value = true, listenerOptions);
	useEventListener(target, "leavepictureinpicture", () => isPictureInPicture.value = false, listenerOptions);
	useEventListener(target, "volumechange", () => {
		const el = toValue(target);
		if (!el) return;
		volume.value = el.volume;
		muted.value = el.muted;
	}, listenerOptions);
	/**
	* The following listeners need to listen to a nested
	* object on the target, so we will have to use a nested
	* watch and manually remove the listeners
	*/
	const listeners = [];
	const stop = watch([target], () => {
		const el = toValue(target);
		if (!el) return;
		stop();
		listeners[0] = useEventListener(el.textTracks, "addtrack", () => tracks.value = tracksToArray(el.textTracks), listenerOptions);
		listeners[1] = useEventListener(el.textTracks, "removetrack", () => tracks.value = tracksToArray(el.textTracks), listenerOptions);
		listeners[2] = useEventListener(el.textTracks, "change", () => tracks.value = tracksToArray(el.textTracks), listenerOptions);
	});
	tryOnScopeDispose(() => listeners.forEach((listener) => listener()));
	return {
		currentTime,
		duration,
		waiting,
		seeking,
		ended,
		stalled,
		buffered,
		playing,
		rate,
		volume,
		muted,
		tracks,
		selectedTrack,
		enableTrack,
		disableTrack,
		supportsPictureInPicture,
		togglePictureInPicture,
		isPictureInPicture,
		onSourceError: sourceErrorEvent.on,
		onPlaybackError: playbackErrorEvent.on
	};
}
/**
* Reactive function result cache based on arguments
*
* @__NO_SIDE_EFFECTS__
*/
function useMemoize(resolver, options) {
	const initCache = () => {
		if (options === null || options === void 0 ? void 0 : options.cache) return shallowReactive(options.cache);
		return shallowReactive(/* @__PURE__ */ new Map());
	};
	const cache = initCache();
	/**
	* Generate key from args
	*/
	const generateKey = (...args) => (options === null || options === void 0 ? void 0 : options.getKey) ? options.getKey(...args) : JSON.stringify(args);
	/**
	* Load data and save in cache
	*/
	const _loadData = (key, ...args) => {
		cache.set(key, resolver(...args));
		return cache.get(key);
	};
	const loadData = (...args) => _loadData(generateKey(...args), ...args);
	/**
	* Delete key from cache
	*/
	const deleteData = (...args) => {
		cache.delete(generateKey(...args));
	};
	/**
	* Clear cached data
	*/
	const clearData = () => {
		cache.clear();
	};
	const memoized = (...args) => {
		const key = generateKey(...args);
		if (cache.has(key)) return cache.get(key);
		return _loadData(key, ...args);
	};
	memoized.load = loadData;
	memoized.delete = deleteData;
	memoized.clear = clearData;
	memoized.generateKey = generateKey;
	memoized.cache = cache;
	return memoized;
}
var UseMouseBuiltinExtractors = {
	page: (event) => [event.pageX, event.pageY],
	client: (event) => [event.clientX, event.clientY],
	screen: (event) => [event.screenX, event.screenY],
	movement: (event) => event instanceof MouseEvent ? [event.movementX, event.movementY] : null
};
/**
* Reactive mouse position.
*
* @see https://vueuse.org/useMouse
* @param options
*/
function useMouse(options = {}) {
	const { type = "page", touch = true, resetOnTouchEnds = false, initialValue = {
		x: 0,
		y: 0
	}, window = defaultWindow, target = window, scroll = true, eventFilter } = options;
	let _prevMouseEvent = null;
	let _prevScrollX = 0;
	let _prevScrollY = 0;
	const x = shallowRef(initialValue.x);
	const y = shallowRef(initialValue.y);
	const sourceType = shallowRef(null);
	const extractor = typeof type === "function" ? type : UseMouseBuiltinExtractors[type];
	const mouseHandler = (event) => {
		const result = extractor(event);
		_prevMouseEvent = event;
		if (result) {
			[x.value, y.value] = result;
			sourceType.value = "mouse";
		}
		if (window) {
			_prevScrollX = window.scrollX;
			_prevScrollY = window.scrollY;
		}
	};
	const touchHandler = (event) => {
		if (event.touches.length > 0) {
			const result = extractor(event.touches[0]);
			if (result) {
				[x.value, y.value] = result;
				sourceType.value = "touch";
			}
		}
	};
	const scrollHandler = () => {
		if (!_prevMouseEvent || !window) return;
		const pos = extractor(_prevMouseEvent);
		if (_prevMouseEvent instanceof MouseEvent && pos) {
			x.value = pos[0] + window.scrollX - _prevScrollX;
			y.value = pos[1] + window.scrollY - _prevScrollY;
		}
	};
	const reset = () => {
		x.value = initialValue.x;
		y.value = initialValue.y;
	};
	const mouseHandlerWrapper = eventFilter ? (event) => eventFilter(() => mouseHandler(event), {}) : (event) => mouseHandler(event);
	const touchHandlerWrapper = eventFilter ? (event) => eventFilter(() => touchHandler(event), {}) : (event) => touchHandler(event);
	const scrollHandlerWrapper = eventFilter ? () => eventFilter(() => scrollHandler(), {}) : () => scrollHandler();
	if (target) {
		const listenerOptions = { passive: true };
		useEventListener(target, ["mousemove", "dragover"], mouseHandlerWrapper, listenerOptions);
		if (touch && type !== "movement") {
			useEventListener(target, ["touchstart", "touchmove"], touchHandlerWrapper, listenerOptions);
			if (resetOnTouchEnds) useEventListener(target, "touchend", reset, listenerOptions);
		}
		if (scroll && type === "page") useEventListener(window, "scroll", scrollHandlerWrapper, listenerOptions);
	}
	return {
		x,
		y,
		sourceType
	};
}
/**
* Reactive mouse position related to an element.
*
* @see https://vueuse.org/useMouseInElement
* @param target
* @param options
*/
function useMouseInElement(target, options = {}) {
	const { windowResize = true, windowScroll = true, handleOutside = true, window = defaultWindow } = options;
	const type = options.type || "page";
	const { x, y, sourceType } = useMouse(options);
	const targetRef = shallowRef(target !== null && target !== void 0 ? target : window === null || window === void 0 ? void 0 : window.document.body);
	const elementX = shallowRef(0);
	const elementY = shallowRef(0);
	const elementPositionX = shallowRef(0);
	const elementPositionY = shallowRef(0);
	const elementHeight = shallowRef(0);
	const elementWidth = shallowRef(0);
	const isOutside = shallowRef(true);
	function update() {
		if (!window) return;
		const el = unrefElement(targetRef);
		if (!el || !(el instanceof Element)) return;
		for (const rect of el.getClientRects()) {
			const { left, top, width, height } = rect;
			elementPositionX.value = left + (type === "page" ? window.pageXOffset : 0);
			elementPositionY.value = top + (type === "page" ? window.pageYOffset : 0);
			elementHeight.value = height;
			elementWidth.value = width;
			const elX = x.value - elementPositionX.value;
			const elY = y.value - elementPositionY.value;
			isOutside.value = width === 0 || height === 0 || elX < 0 || elY < 0 || elX > width || elY > height;
			if (handleOutside || !isOutside.value) {
				elementX.value = elX;
				elementY.value = elY;
			}
			if (!isOutside.value) break;
		}
	}
	const stopFnList = [];
	function stop() {
		stopFnList.forEach((fn) => fn());
		stopFnList.length = 0;
	}
	tryOnMounted(() => {
		update();
	});
	if (window) {
		const { stop: stopResizeObserver } = useResizeObserver(targetRef, update);
		const { stop: stopMutationObserver } = useMutationObserver(targetRef, update, { attributeFilter: ["style", "class"] });
		const stopWatch = watch([
			targetRef,
			x,
			y
		], update);
		stopFnList.push(stopResizeObserver, stopMutationObserver, stopWatch);
		useEventListener(document, "mouseleave", () => isOutside.value = true, { passive: true });
		if (windowScroll) stopFnList.push(useEventListener("scroll", update, {
			capture: true,
			passive: true
		}));
		if (windowResize) stopFnList.push(useEventListener("resize", update, { passive: true }));
	}
	return {
		x,
		y,
		sourceType,
		elementX,
		elementY,
		elementPositionX,
		elementPositionY,
		elementHeight,
		elementWidth,
		isOutside,
		stop
	};
}
/**
* Reactive URL representing an object.
*
* @see https://vueuse.org/useObjectUrl
* @param object
*/
function useObjectUrl(object) {
	const url = shallowRef();
	const release = () => {
		if (url.value) URL.revokeObjectURL(url.value);
		url.value = void 0;
	};
	watch(() => toValue(object), (newObject) => {
		release();
		if (newObject) url.value = URL.createObjectURL(newObject);
	}, { immediate: true });
	tryOnScopeDispose(release);
	return shallowReadonly(url);
}
/**
* Reactive swipe detection based on PointerEvents.
*
* @see https://vueuse.org/usePointerSwipe
* @param target
* @param options
*/
function usePointerSwipe(target, options = {}) {
	const targetRef = toRef(target);
	const { threshold = 50, onSwipe, onSwipeEnd, onSwipeStart, disableTextSelect = false } = options;
	const posStart = reactive({
		x: 0,
		y: 0
	});
	const updatePosStart = (x, y) => {
		posStart.x = x;
		posStart.y = y;
	};
	const posEnd = reactive({
		x: 0,
		y: 0
	});
	const updatePosEnd = (x, y) => {
		posEnd.x = x;
		posEnd.y = y;
	};
	const distanceX = computed(() => posStart.x - posEnd.x);
	const distanceY = computed(() => posStart.y - posEnd.y);
	const { max, abs } = Math;
	const isThresholdExceeded = computed(() => max(abs(distanceX.value), abs(distanceY.value)) >= threshold);
	const isSwiping = shallowRef(false);
	const isPointerDown = shallowRef(false);
	const direction = computed(() => {
		if (!isThresholdExceeded.value) return "none";
		if (abs(distanceX.value) > abs(distanceY.value)) return distanceX.value > 0 ? "left" : "right";
		else return distanceY.value > 0 ? "up" : "down";
	});
	const eventIsAllowed = (e) => {
		var _ref;
		var _options$pointerTypes;
		var _options$pointerTypes2;
		const isReleasingButton = e.buttons === 0;
		const isPrimaryButton = e.buttons === 1;
		return (_ref = (_options$pointerTypes = (_options$pointerTypes2 = options.pointerTypes) === null || _options$pointerTypes2 === void 0 ? void 0 : _options$pointerTypes2.includes(e.pointerType)) !== null && _options$pointerTypes !== void 0 ? _options$pointerTypes : isReleasingButton || isPrimaryButton) !== null && _ref !== void 0 ? _ref : true;
	};
	const listenerOptions = { passive: true };
	const stops = [
		useEventListener(target, "pointerdown", (e) => {
			if (!eventIsAllowed(e)) return;
			isPointerDown.value = true;
			const eventTarget = e.target;
			eventTarget === null || eventTarget === void 0 || eventTarget.setPointerCapture(e.pointerId);
			const { clientX: x, clientY: y } = e;
			updatePosStart(x, y);
			updatePosEnd(x, y);
			onSwipeStart === null || onSwipeStart === void 0 || onSwipeStart(e);
		}, listenerOptions),
		useEventListener(target, "pointermove", (e) => {
			if (!eventIsAllowed(e)) return;
			if (!isPointerDown.value) return;
			const { clientX: x, clientY: y } = e;
			updatePosEnd(x, y);
			if (!isSwiping.value && isThresholdExceeded.value) isSwiping.value = true;
			if (isSwiping.value) onSwipe === null || onSwipe === void 0 || onSwipe(e);
		}, listenerOptions),
		useEventListener(target, ["pointerup", "pointercancel"], (e) => {
			if (!eventIsAllowed(e)) return;
			if (isSwiping.value) onSwipeEnd === null || onSwipeEnd === void 0 || onSwipeEnd(e, direction.value);
			isPointerDown.value = false;
			isSwiping.value = false;
		}, listenerOptions)
	];
	tryOnMounted(() => {
		var _targetRef$value;
		(_targetRef$value = targetRef.value) === null || _targetRef$value === void 0 || (_targetRef$value = _targetRef$value.style) === null || _targetRef$value === void 0 || _targetRef$value.setProperty("touch-action", "pan-y");
		if (disableTextSelect) {
			var _targetRef$value2;
			var _targetRef$value3;
			var _targetRef$value4;
			(_targetRef$value2 = targetRef.value) === null || _targetRef$value2 === void 0 || (_targetRef$value2 = _targetRef$value2.style) === null || _targetRef$value2 === void 0 || _targetRef$value2.setProperty("-webkit-user-select", "none");
			(_targetRef$value3 = targetRef.value) === null || _targetRef$value3 === void 0 || (_targetRef$value3 = _targetRef$value3.style) === null || _targetRef$value3 === void 0 || _targetRef$value3.setProperty("-ms-user-select", "none");
			(_targetRef$value4 = targetRef.value) === null || _targetRef$value4 === void 0 || (_targetRef$value4 = _targetRef$value4.style) === null || _targetRef$value4 === void 0 || _targetRef$value4.setProperty("user-select", "none");
		}
	});
	const stop = () => stops.forEach((s) => s());
	return {
		isSwiping: shallowReadonly(isSwiping),
		direction: shallowReadonly(direction),
		posStart: readonly(posStart),
		posEnd: readonly(posEnd),
		distanceX,
		distanceY,
		stop
	};
}
/**
* Reactive prefers-reduced-motion media query.
*
* @see https://vueuse.org/usePreferredReducedMotion
* @param [options]
*
* @__NO_SIDE_EFFECTS__
*/
function usePreferredReducedMotion(options) {
	const isReduced = useMediaQuery("(prefers-reduced-motion: reduce)", options);
	return computed(() => {
		if (isReduced.value) return "reduce";
		return "no-preference";
	});
}
/* @__NO_SIDE_EFFECTS__ */
function useStepper(steps, initialStep) {
	const stepsRef = ref(steps);
	const stepNames = computed(() => Array.isArray(stepsRef.value) ? stepsRef.value : Object.keys(stepsRef.value));
	const index = ref(stepNames.value.indexOf(initialStep !== null && initialStep !== void 0 ? initialStep : stepNames.value[0]));
	const current = computed(() => at(index.value));
	const isFirst = computed(() => index.value === 0);
	const isLast = computed(() => index.value === stepNames.value.length - 1);
	const next = computed(() => stepNames.value[index.value + 1]);
	const previous = computed(() => stepNames.value[index.value - 1]);
	function at(index) {
		if (Array.isArray(stepsRef.value)) return stepsRef.value[index];
		return stepsRef.value[stepNames.value[index]];
	}
	function get(step) {
		if (!stepNames.value.includes(step)) return;
		return at(stepNames.value.indexOf(step));
	}
	function goTo(step) {
		if (stepNames.value.includes(step)) index.value = stepNames.value.indexOf(step);
	}
	function goToNext() {
		if (isLast.value) return;
		index.value++;
	}
	function goToPrevious() {
		if (isFirst.value) return;
		index.value--;
	}
	function goBackTo(step) {
		if (isAfter(step)) goTo(step);
	}
	function isNext(step) {
		return stepNames.value.indexOf(step) === index.value + 1;
	}
	function isPrevious(step) {
		return stepNames.value.indexOf(step) === index.value - 1;
	}
	function isCurrent(step) {
		return stepNames.value.indexOf(step) === index.value;
	}
	function isBefore(step) {
		return index.value < stepNames.value.indexOf(step);
	}
	function isAfter(step) {
		return index.value > stepNames.value.indexOf(step);
	}
	return {
		steps: stepsRef,
		stepNames,
		index,
		current,
		next,
		previous,
		isFirst,
		isLast,
		at,
		get,
		goTo,
		goToNext,
		goToPrevious,
		goBackTo,
		isNext,
		isPrevious,
		isCurrent,
		isBefore,
		isAfter
	};
}
Number.POSITIVE_INFINITY;
function getDefaultScheduler$2(options) {
	if ("interval" in options || "immediate" in options) {
		const { interval = "requestAnimationFrame", immediate = true } = options;
		return interval === "requestAnimationFrame" ? (cb) => useRafFn(cb, { immediate }) : (cb) => useIntervalFn(cb, interval, { immediate });
	}
	return useRafFn;
}
function useTimestamp(options = {}) {
	const { controls: exposeControls = false, offset = 0, scheduler = getDefaultScheduler$2(options), callback } = options;
	const ts = shallowRef(timestamp() + offset);
	const update = () => ts.value = timestamp() + offset;
	const controls = scheduler(callback ? () => {
		update();
		callback(ts.value);
	} : update);
	if (exposeControls) return {
		timestamp: ts,
		...controls
	};
	else return ts;
}
function useTitle(newTitle = null, options = {}) {
	var _document$title;
	var _ref;
	const { document = defaultDocument, restoreOnUnmount = (t) => t } = options;
	const originalTitle = (_document$title = document === null || document === void 0 ? void 0 : document.title) !== null && _document$title !== void 0 ? _document$title : "";
	const title = toRef((_ref = newTitle !== null && newTitle !== void 0 ? newTitle : document === null || document === void 0 ? void 0 : document.title) !== null && _ref !== void 0 ? _ref : null);
	const isReadonly = !!(newTitle && typeof newTitle === "function");
	function format(t) {
		if (!("titleTemplate" in options)) return t;
		const template = options.titleTemplate || "%s";
		return typeof template === "function" ? template(t) : toValue(template).replace(/%s/g, t);
	}
	watch(title, (newValue, oldValue) => {
		if (newValue !== oldValue && document) document.title = format(newValue !== null && newValue !== void 0 ? newValue : "");
	}, { immediate: true });
	if (options.observe && !options.titleTemplate && document && !isReadonly) {
		var _document$head;
		useMutationObserver((_document$head = document.head) === null || _document$head === void 0 ? void 0 : _document$head.querySelector("title"), () => {
			if (document && document.title !== title.value) title.value = format(document.title);
		}, { childList: true });
	}
	tryOnScopeDispose(() => {
		if (restoreOnUnmount) {
			const restoredTitle = restoreOnUnmount(originalTitle, title.value || "");
			if (restoredTitle != null && document) document.title = restoredTitle;
		}
	});
	return title;
}
/**
* Common transitions
*
* @see https://easings.net
*/
var TransitionPresets = /* #__PURE__ */ Object.assign({}, { linear: identity }, {
	easeInSine: [
		.12,
		0,
		.39,
		0
	],
	easeOutSine: [
		.61,
		1,
		.88,
		1
	],
	easeInOutSine: [
		.37,
		0,
		.63,
		1
	],
	easeInQuad: [
		.11,
		0,
		.5,
		0
	],
	easeOutQuad: [
		.5,
		1,
		.89,
		1
	],
	easeInOutQuad: [
		.45,
		0,
		.55,
		1
	],
	easeInCubic: [
		.32,
		0,
		.67,
		0
	],
	easeOutCubic: [
		.33,
		1,
		.68,
		1
	],
	easeInOutCubic: [
		.65,
		0,
		.35,
		1
	],
	easeInQuart: [
		.5,
		0,
		.75,
		0
	],
	easeOutQuart: [
		.25,
		1,
		.5,
		1
	],
	easeInOutQuart: [
		.76,
		0,
		.24,
		1
	],
	easeInQuint: [
		.64,
		0,
		.78,
		0
	],
	easeOutQuint: [
		.22,
		1,
		.36,
		1
	],
	easeInOutQuint: [
		.83,
		0,
		.17,
		1
	],
	easeInExpo: [
		.7,
		0,
		.84,
		0
	],
	easeOutExpo: [
		.16,
		1,
		.3,
		1
	],
	easeInOutExpo: [
		.87,
		0,
		.13,
		1
	],
	easeInCirc: [
		.55,
		0,
		1,
		.45
	],
	easeOutCirc: [
		0,
		.55,
		.45,
		1
	],
	easeInOutCirc: [
		.85,
		0,
		.15,
		1
	],
	easeInBack: [
		.36,
		0,
		.66,
		-.56
	],
	easeOutBack: [
		.34,
		1.56,
		.64,
		1
	],
	easeInOutBack: [
		.68,
		-.6,
		.32,
		1.6
	]
});
/**
* Create an easing function from cubic bezier points.
*/
function createEasingFunction([p0, p1, p2, p3]) {
	const a = (a1, a2) => 1 - 3 * a2 + 3 * a1;
	const b = (a1, a2) => 3 * a2 - 6 * a1;
	const c = (a1) => 3 * a1;
	const calcBezier = (t, a1, a2) => ((a(a1, a2) * t + b(a1, a2)) * t + c(a1)) * t;
	const getSlope = (t, a1, a2) => 3 * a(a1, a2) * t * t + 2 * b(a1, a2) * t + c(a1);
	const getTforX = (x) => {
		let aGuessT = x;
		for (let i = 0; i < 4; ++i) {
			const currentSlope = getSlope(aGuessT, p0, p2);
			if (currentSlope === 0) return aGuessT;
			const currentX = calcBezier(aGuessT, p0, p2) - x;
			aGuessT -= currentX / currentSlope;
		}
		return aGuessT;
	};
	return (x) => p0 === p1 && p2 === p3 ? x : calcBezier(getTforX(x), p1, p3);
}
function lerp(a, b, alpha) {
	return a + alpha * (b - a);
}
function defaultInterpolation(a, b, t) {
	const aVal = toValue(a);
	const bVal = toValue(b);
	if (typeof aVal === "number" && typeof bVal === "number") return lerp(aVal, bVal, t);
	if (Array.isArray(aVal) && Array.isArray(bVal)) return aVal.map((v, i) => lerp(v, toValue(bVal[i]), t));
	throw new TypeError("Unknown transition type, specify an interpolation function.");
}
function normalizeEasing(easing) {
	var _toValue;
	return typeof easing === "function" ? easing : (_toValue = toValue(easing)) !== null && _toValue !== void 0 ? _toValue : identity;
}
/**
* Transition from one value to another.
*
* @param source
* @param from
* @param to
* @param options
*/
function transition(source, from, to, options = {}) {
	var _toValue2;
	const { window = defaultWindow } = options;
	const fromVal = toValue(from);
	const toVal = toValue(to);
	const duration = (_toValue2 = toValue(options.duration)) !== null && _toValue2 !== void 0 ? _toValue2 : 1e3;
	const startedAt = Date.now();
	const endAt = Date.now() + duration;
	const interpolation = typeof options.interpolation === "function" ? options.interpolation : defaultInterpolation;
	const trans = typeof options.easing !== "undefined" ? normalizeEasing(options.easing) : normalizeEasing(options.transition);
	const ease = typeof trans === "function" ? trans : createEasingFunction(trans);
	return new Promise((resolve) => {
		source.value = fromVal;
		const tick = () => {
			var _options$abort;
			if ((_options$abort = options.abort) === null || _options$abort === void 0 ? void 0 : _options$abort.call(options)) {
				resolve();
				return;
			}
			const now = Date.now();
			const alpha = ease((now - startedAt) / duration);
			source.value = interpolation(fromVal, toVal, alpha);
			if (now < endAt) window === null || window === void 0 || window.requestAnimationFrame(tick);
			else {
				source.value = toVal;
				resolve();
			}
		};
		tick();
	});
}
/**
* Follow value with a transition.
*
* @see https://vueuse.org/useTransition
* @param source
* @param options
*/
function useTransition(source, options = {}) {
	let currentId = 0;
	const sourceVal = () => {
		const v = toValue(source);
		return typeof options.interpolation === "undefined" && Array.isArray(v) ? v.map(toValue) : v;
	};
	const outputRef = shallowRef(sourceVal());
	watch(sourceVal, async (to) => {
		var _options$onStarted;
		var _options$onFinished;
		if (toValue(options.disabled)) return;
		const id = ++currentId;
		if (options.delay) await promiseTimeout(toValue(options.delay));
		if (id !== currentId) return;
		(_options$onStarted = options.onStarted) === null || _options$onStarted === void 0 || _options$onStarted.call(options);
		await transition(outputRef, outputRef.value, to, {
			...options,
			abort: () => {
				var _options$abort2;
				return id !== currentId || ((_options$abort2 = options.abort) === null || _options$abort2 === void 0 ? void 0 : _options$abort2.call(options));
			}
		});
		(_options$onFinished = options.onFinished) === null || _options$onFinished === void 0 || _options$onFinished.call(options);
	}, { deep: true });
	watch(() => toValue(options.disabled), (disabled) => {
		if (disabled) {
			currentId++;
			outputRef.value = sourceVal();
		}
	});
	tryOnScopeDispose(() => {
		currentId++;
	});
	return computed(() => toValue(options.disabled) ? sourceVal() : outputRef.value);
}
/**
* Shorthand for v-model binding, props + emit -> ref
*
* @see https://vueuse.org/useVModel
* @param props
* @param key (default 'modelValue')
* @param emit
* @param options
*
* @__NO_SIDE_EFFECTS__
*/
function useVModel(props, key, emit, options = {}) {
	var _vm$$emit;
	var _vm$proxy;
	const { clone = false, passive = false, eventName, deep = false, defaultValue, shouldEmit } = options;
	const vm = getCurrentInstance();
	const _emit = emit || (vm === null || vm === void 0 ? void 0 : vm.emit) || (vm === null || vm === void 0 || (_vm$$emit = vm.$emit) === null || _vm$$emit === void 0 ? void 0 : _vm$$emit.bind(vm)) || (vm === null || vm === void 0 || (_vm$proxy = vm.proxy) === null || _vm$proxy === void 0 || (_vm$proxy = _vm$proxy.$emit) === null || _vm$proxy === void 0 ? void 0 : _vm$proxy.bind(vm === null || vm === void 0 ? void 0 : vm.proxy));
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
		const proxy = ref(getValue());
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
/**
* Reactive window size.
*
* @see https://vueuse.org/useWindowSize
* @param options
*
* @__NO_SIDE_EFFECTS__
*/
function useWindowSize(options = {}) {
	const { window = defaultWindow, initialWidth = Number.POSITIVE_INFINITY, initialHeight = Number.POSITIVE_INFINITY, listenOrientation = true, includeScrollbar = true, type = "inner" } = options;
	const width = shallowRef(initialWidth);
	const height = shallowRef(initialHeight);
	const update = () => {
		if (window) if (type === "outer") {
			width.value = window.outerWidth;
			height.value = window.outerHeight;
		} else if (type === "visual" && window.visualViewport) {
			const { width: visualViewportWidth, height: visualViewportHeight, scale } = window.visualViewport;
			width.value = Math.round(visualViewportWidth * scale);
			height.value = Math.round(visualViewportHeight * scale);
		} else if (includeScrollbar) {
			width.value = window.innerWidth;
			height.value = window.innerHeight;
		} else {
			width.value = window.document.documentElement.clientWidth;
			height.value = window.document.documentElement.clientHeight;
		}
	};
	update();
	tryOnMounted(update);
	const listenerOptions = { passive: true };
	useEventListener("resize", update, listenerOptions);
	if (window && type === "visual" && window.visualViewport) useEventListener(window.visualViewport, "resize", update, listenerOptions);
	if (listenOrientation) watch(useMediaQuery("(orientation: portrait)"), () => update());
	return {
		width,
		height
	};
}
//#endregion
//#region node_modules/.pnpm/@vueuse+router@14.4.0_vue-router@5.2.0_@vue+compiler-sfc@3.5.42_esbuild@0.28.1_pinia@4._deb7caf2479003e4097d4edd536b1e15/node_modules/@vueuse/router/dist/index.js
var _hash;
/* @__NO_SIDE_EFFECTS__ */
function useRouteHash(defaultValue, { mode = "replace", route = useRoute(), router = useRouter() } = {}) {
	_hash = route.hash;
	tryOnScopeDispose(() => {
		_hash = void 0;
	});
	let _trigger;
	const proxy = customRef((track, trigger) => {
		_trigger = trigger;
		return {
			get() {
				track();
				return _hash || toValue(defaultValue);
			},
			set(v) {
				if (v === _hash) return;
				_hash = v === null ? void 0 : v;
				trigger();
				nextTick(() => {
					const { params, query } = route;
					router[toValue(mode)]({
						params,
						query,
						hash: _hash
					});
				});
			}
		};
	});
	watch(() => route.hash, () => {
		if (route.hash === _hash) return;
		_hash = route.hash;
		_trigger();
	}, { flush: "sync" });
	return proxy;
}
//#endregion
//#region node_modules/.pnpm/fuse.js@7.0.0/node_modules/fuse.js/dist/fuse.mjs
/**
* Fuse.js v7.0.0 - Lightweight fuzzy-search (http://fusejs.io)
*
* Copyright (c) 2023 Kiro Risk (http://kiro.me)
* All Rights Reserved. Apache Software License 2.0
*
* http://www.apache.org/licenses/LICENSE-2.0
*/
function isArray(value) {
	return !Array.isArray ? getTag(value) === "[object Array]" : Array.isArray(value);
}
function baseToString(value) {
	if (typeof value == "string") return value;
	let result = value + "";
	return result == "0" && 1 / value == -Infinity ? "-0" : result;
}
function toString(value) {
	return value == null ? "" : baseToString(value);
}
function isString(value) {
	return typeof value === "string";
}
function isNumber(value) {
	return typeof value === "number";
}
function isBoolean(value) {
	return value === true || value === false || isObjectLike(value) && getTag(value) == "[object Boolean]";
}
function isObject(value) {
	return typeof value === "object";
}
function isObjectLike(value) {
	return isObject(value) && value !== null;
}
function isDefined(value) {
	return value !== void 0 && value !== null;
}
function isBlank(value) {
	return !value.trim().length;
}
function getTag(value) {
	return value == null ? value === void 0 ? "[object Undefined]" : "[object Null]" : Object.prototype.toString.call(value);
}
var INCORRECT_INDEX_TYPE = "Incorrect 'index' type";
var LOGICAL_SEARCH_INVALID_QUERY_FOR_KEY = (key) => `Invalid value for key ${key}`;
var PATTERN_LENGTH_TOO_LARGE = (max) => `Pattern length exceeds max of ${max}.`;
var MISSING_KEY_PROPERTY = (name) => `Missing ${name} property in key`;
var INVALID_KEY_WEIGHT_VALUE = (key) => `Property 'weight' in key '${key}' must be a positive integer`;
var hasOwn = Object.prototype.hasOwnProperty;
var KeyStore = class {
	constructor(keys) {
		this._keys = [];
		this._keyMap = {};
		let totalWeight = 0;
		keys.forEach((key) => {
			let obj = createKey(key);
			this._keys.push(obj);
			this._keyMap[obj.id] = obj;
			totalWeight += obj.weight;
		});
		this._keys.forEach((key) => {
			key.weight /= totalWeight;
		});
	}
	get(keyId) {
		return this._keyMap[keyId];
	}
	keys() {
		return this._keys;
	}
	toJSON() {
		return JSON.stringify(this._keys);
	}
};
function createKey(key) {
	let path = null;
	let id = null;
	let src = null;
	let weight = 1;
	let getFn = null;
	if (isString(key) || isArray(key)) {
		src = key;
		path = createKeyPath(key);
		id = createKeyId(key);
	} else {
		if (!hasOwn.call(key, "name")) throw new Error(MISSING_KEY_PROPERTY("name"));
		const name = key.name;
		src = name;
		if (hasOwn.call(key, "weight")) {
			weight = key.weight;
			if (weight <= 0) throw new Error(INVALID_KEY_WEIGHT_VALUE(name));
		}
		path = createKeyPath(name);
		id = createKeyId(name);
		getFn = key.getFn;
	}
	return {
		path,
		id,
		weight,
		src,
		getFn
	};
}
function createKeyPath(key) {
	return isArray(key) ? key : key.split(".");
}
function createKeyId(key) {
	return isArray(key) ? key.join(".") : key;
}
function get(obj, path) {
	let list = [];
	let arr = false;
	const deepGet = (obj, path, index) => {
		if (!isDefined(obj)) return;
		if (!path[index]) list.push(obj);
		else {
			const value = obj[path[index]];
			if (!isDefined(value)) return;
			if (index === path.length - 1 && (isString(value) || isNumber(value) || isBoolean(value))) list.push(toString(value));
			else if (isArray(value)) {
				arr = true;
				for (let i = 0, len = value.length; i < len; i += 1) deepGet(value[i], path, index + 1);
			} else if (path.length) deepGet(value, path, index + 1);
		}
	};
	deepGet(obj, isString(path) ? path.split(".") : path, 0);
	return arr ? list : list[0];
}
var MatchOptions = {
	includeMatches: false,
	findAllMatches: false,
	minMatchCharLength: 1
};
var BasicOptions = {
	isCaseSensitive: false,
	includeScore: false,
	keys: [],
	shouldSort: true,
	sortFn: (a, b) => a.score === b.score ? a.idx < b.idx ? -1 : 1 : a.score < b.score ? -1 : 1
};
var FuzzyOptions = {
	location: 0,
	threshold: .6,
	distance: 100
};
var AdvancedOptions = {
	useExtendedSearch: false,
	getFn: get,
	ignoreLocation: false,
	ignoreFieldNorm: false,
	fieldNormWeight: 1
};
var Config = {
	...BasicOptions,
	...MatchOptions,
	...FuzzyOptions,
	...AdvancedOptions
};
var SPACE = /[^ ]+/g;
function norm(weight = 1, mantissa = 3) {
	const cache = /* @__PURE__ */ new Map();
	const m = Math.pow(10, mantissa);
	return {
		get(value) {
			const numTokens = value.match(SPACE).length;
			if (cache.has(numTokens)) return cache.get(numTokens);
			const norm = 1 / Math.pow(numTokens, .5 * weight);
			const n = parseFloat(Math.round(norm * m) / m);
			cache.set(numTokens, n);
			return n;
		},
		clear() {
			cache.clear();
		}
	};
}
var FuseIndex = class {
	constructor({ getFn = Config.getFn, fieldNormWeight = Config.fieldNormWeight } = {}) {
		this.norm = norm(fieldNormWeight, 3);
		this.getFn = getFn;
		this.isCreated = false;
		this.setIndexRecords();
	}
	setSources(docs = []) {
		this.docs = docs;
	}
	setIndexRecords(records = []) {
		this.records = records;
	}
	setKeys(keys = []) {
		this.keys = keys;
		this._keysMap = {};
		keys.forEach((key, idx) => {
			this._keysMap[key.id] = idx;
		});
	}
	create() {
		if (this.isCreated || !this.docs.length) return;
		this.isCreated = true;
		if (isString(this.docs[0])) this.docs.forEach((doc, docIndex) => {
			this._addString(doc, docIndex);
		});
		else this.docs.forEach((doc, docIndex) => {
			this._addObject(doc, docIndex);
		});
		this.norm.clear();
	}
	add(doc) {
		const idx = this.size();
		if (isString(doc)) this._addString(doc, idx);
		else this._addObject(doc, idx);
	}
	removeAt(idx) {
		this.records.splice(idx, 1);
		for (let i = idx, len = this.size(); i < len; i += 1) this.records[i].i -= 1;
	}
	getValueForItemAtKeyId(item, keyId) {
		return item[this._keysMap[keyId]];
	}
	size() {
		return this.records.length;
	}
	_addString(doc, docIndex) {
		if (!isDefined(doc) || isBlank(doc)) return;
		let record = {
			v: doc,
			i: docIndex,
			n: this.norm.get(doc)
		};
		this.records.push(record);
	}
	_addObject(doc, docIndex) {
		let record = {
			i: docIndex,
			$: {}
		};
		this.keys.forEach((key, keyIndex) => {
			let value = key.getFn ? key.getFn(doc) : this.getFn(doc, key.path);
			if (!isDefined(value)) return;
			if (isArray(value)) {
				let subRecords = [];
				const stack = [{
					nestedArrIndex: -1,
					value
				}];
				while (stack.length) {
					const { nestedArrIndex, value } = stack.pop();
					if (!isDefined(value)) continue;
					if (isString(value) && !isBlank(value)) {
						let subRecord = {
							v: value,
							i: nestedArrIndex,
							n: this.norm.get(value)
						};
						subRecords.push(subRecord);
					} else if (isArray(value)) value.forEach((item, k) => {
						stack.push({
							nestedArrIndex: k,
							value: item
						});
					});
				}
				record.$[keyIndex] = subRecords;
			} else if (isString(value) && !isBlank(value)) {
				let subRecord = {
					v: value,
					n: this.norm.get(value)
				};
				record.$[keyIndex] = subRecord;
			}
		});
		this.records.push(record);
	}
	toJSON() {
		return {
			keys: this.keys,
			records: this.records
		};
	}
};
function createIndex(keys, docs, { getFn = Config.getFn, fieldNormWeight = Config.fieldNormWeight } = {}) {
	const myIndex = new FuseIndex({
		getFn,
		fieldNormWeight
	});
	myIndex.setKeys(keys.map(createKey));
	myIndex.setSources(docs);
	myIndex.create();
	return myIndex;
}
function parseIndex(data, { getFn = Config.getFn, fieldNormWeight = Config.fieldNormWeight } = {}) {
	const { keys, records } = data;
	const myIndex = new FuseIndex({
		getFn,
		fieldNormWeight
	});
	myIndex.setKeys(keys);
	myIndex.setIndexRecords(records);
	return myIndex;
}
function computeScore$1(pattern, { errors = 0, currentLocation = 0, expectedLocation = 0, distance = Config.distance, ignoreLocation = Config.ignoreLocation } = {}) {
	const accuracy = errors / pattern.length;
	if (ignoreLocation) return accuracy;
	const proximity = Math.abs(expectedLocation - currentLocation);
	if (!distance) return proximity ? 1 : accuracy;
	return accuracy + proximity / distance;
}
function convertMaskToIndices(matchmask = [], minMatchCharLength = Config.minMatchCharLength) {
	let indices = [];
	let start = -1;
	let end = -1;
	let i = 0;
	for (let len = matchmask.length; i < len; i += 1) {
		let match = matchmask[i];
		if (match && start === -1) start = i;
		else if (!match && start !== -1) {
			end = i - 1;
			if (end - start + 1 >= minMatchCharLength) indices.push([start, end]);
			start = -1;
		}
	}
	if (matchmask[i - 1] && i - start >= minMatchCharLength) indices.push([start, i - 1]);
	return indices;
}
var MAX_BITS = 32;
function search(text, pattern, patternAlphabet, { location = Config.location, distance = Config.distance, threshold = Config.threshold, findAllMatches = Config.findAllMatches, minMatchCharLength = Config.minMatchCharLength, includeMatches = Config.includeMatches, ignoreLocation = Config.ignoreLocation } = {}) {
	if (pattern.length > MAX_BITS) throw new Error(PATTERN_LENGTH_TOO_LARGE(MAX_BITS));
	const patternLen = pattern.length;
	const textLen = text.length;
	const expectedLocation = Math.max(0, Math.min(location, textLen));
	let currentThreshold = threshold;
	let bestLocation = expectedLocation;
	const computeMatches = minMatchCharLength > 1 || includeMatches;
	const matchMask = computeMatches ? Array(textLen) : [];
	let index;
	while ((index = text.indexOf(pattern, bestLocation)) > -1) {
		let score = computeScore$1(pattern, {
			currentLocation: index,
			expectedLocation,
			distance,
			ignoreLocation
		});
		currentThreshold = Math.min(score, currentThreshold);
		bestLocation = index + patternLen;
		if (computeMatches) {
			let i = 0;
			while (i < patternLen) {
				matchMask[index + i] = 1;
				i += 1;
			}
		}
	}
	bestLocation = -1;
	let lastBitArr = [];
	let finalScore = 1;
	let binMax = patternLen + textLen;
	const mask = 1 << patternLen - 1;
	for (let i = 0; i < patternLen; i += 1) {
		let binMin = 0;
		let binMid = binMax;
		while (binMin < binMid) {
			if (computeScore$1(pattern, {
				errors: i,
				currentLocation: expectedLocation + binMid,
				expectedLocation,
				distance,
				ignoreLocation
			}) <= currentThreshold) binMin = binMid;
			else binMax = binMid;
			binMid = Math.floor((binMax - binMin) / 2 + binMin);
		}
		binMax = binMid;
		let start = Math.max(1, expectedLocation - binMid + 1);
		let finish = findAllMatches ? textLen : Math.min(expectedLocation + binMid, textLen) + patternLen;
		let bitArr = Array(finish + 2);
		bitArr[finish + 1] = (1 << i) - 1;
		for (let j = finish; j >= start; j -= 1) {
			let currentLocation = j - 1;
			let charMatch = patternAlphabet[text.charAt(currentLocation)];
			if (computeMatches) matchMask[currentLocation] = +!!charMatch;
			bitArr[j] = (bitArr[j + 1] << 1 | 1) & charMatch;
			if (i) bitArr[j] |= (lastBitArr[j + 1] | lastBitArr[j]) << 1 | 1 | lastBitArr[j + 1];
			if (bitArr[j] & mask) {
				finalScore = computeScore$1(pattern, {
					errors: i,
					currentLocation,
					expectedLocation,
					distance,
					ignoreLocation
				});
				if (finalScore <= currentThreshold) {
					currentThreshold = finalScore;
					bestLocation = currentLocation;
					if (bestLocation <= expectedLocation) break;
					start = Math.max(1, 2 * expectedLocation - bestLocation);
				}
			}
		}
		if (computeScore$1(pattern, {
			errors: i + 1,
			currentLocation: expectedLocation,
			expectedLocation,
			distance,
			ignoreLocation
		}) > currentThreshold) break;
		lastBitArr = bitArr;
	}
	const result = {
		isMatch: bestLocation >= 0,
		score: Math.max(.001, finalScore)
	};
	if (computeMatches) {
		const indices = convertMaskToIndices(matchMask, minMatchCharLength);
		if (!indices.length) result.isMatch = false;
		else if (includeMatches) result.indices = indices;
	}
	return result;
}
function createPatternAlphabet(pattern) {
	let mask = {};
	for (let i = 0, len = pattern.length; i < len; i += 1) {
		const char = pattern.charAt(i);
		mask[char] = (mask[char] || 0) | 1 << len - i - 1;
	}
	return mask;
}
var BitapSearch = class {
	constructor(pattern, { location = Config.location, threshold = Config.threshold, distance = Config.distance, includeMatches = Config.includeMatches, findAllMatches = Config.findAllMatches, minMatchCharLength = Config.minMatchCharLength, isCaseSensitive = Config.isCaseSensitive, ignoreLocation = Config.ignoreLocation } = {}) {
		this.options = {
			location,
			threshold,
			distance,
			includeMatches,
			findAllMatches,
			minMatchCharLength,
			isCaseSensitive,
			ignoreLocation
		};
		this.pattern = isCaseSensitive ? pattern : pattern.toLowerCase();
		this.chunks = [];
		if (!this.pattern.length) return;
		const addChunk = (pattern, startIndex) => {
			this.chunks.push({
				pattern,
				alphabet: createPatternAlphabet(pattern),
				startIndex
			});
		};
		const len = this.pattern.length;
		if (len > MAX_BITS) {
			let i = 0;
			const remainder = len % MAX_BITS;
			const end = len - remainder;
			while (i < end) {
				addChunk(this.pattern.substr(i, MAX_BITS), i);
				i += MAX_BITS;
			}
			if (remainder) {
				const startIndex = len - MAX_BITS;
				addChunk(this.pattern.substr(startIndex), startIndex);
			}
		} else addChunk(this.pattern, 0);
	}
	searchIn(text) {
		const { isCaseSensitive, includeMatches } = this.options;
		if (!isCaseSensitive) text = text.toLowerCase();
		if (this.pattern === text) {
			let result = {
				isMatch: true,
				score: 0
			};
			if (includeMatches) result.indices = [[0, text.length - 1]];
			return result;
		}
		const { location, distance, threshold, findAllMatches, minMatchCharLength, ignoreLocation } = this.options;
		let allIndices = [];
		let totalScore = 0;
		let hasMatches = false;
		this.chunks.forEach(({ pattern, alphabet, startIndex }) => {
			const { isMatch, score, indices } = search(text, pattern, alphabet, {
				location: location + startIndex,
				distance,
				threshold,
				findAllMatches,
				minMatchCharLength,
				includeMatches,
				ignoreLocation
			});
			if (isMatch) hasMatches = true;
			totalScore += score;
			if (isMatch && indices) allIndices = [...allIndices, ...indices];
		});
		let result = {
			isMatch: hasMatches,
			score: hasMatches ? totalScore / this.chunks.length : 1
		};
		if (hasMatches && includeMatches) result.indices = allIndices;
		return result;
	}
};
var BaseMatch = class {
	constructor(pattern) {
		this.pattern = pattern;
	}
	static isMultiMatch(pattern) {
		return getMatch(pattern, this.multiRegex);
	}
	static isSingleMatch(pattern) {
		return getMatch(pattern, this.singleRegex);
	}
	search() {}
};
function getMatch(pattern, exp) {
	const matches = pattern.match(exp);
	return matches ? matches[1] : null;
}
var ExactMatch = class extends BaseMatch {
	constructor(pattern) {
		super(pattern);
	}
	static get type() {
		return "exact";
	}
	static get multiRegex() {
		return /^="(.*)"$/;
	}
	static get singleRegex() {
		return /^=(.*)$/;
	}
	search(text) {
		const isMatch = text === this.pattern;
		return {
			isMatch,
			score: isMatch ? 0 : 1,
			indices: [0, this.pattern.length - 1]
		};
	}
};
var InverseExactMatch = class extends BaseMatch {
	constructor(pattern) {
		super(pattern);
	}
	static get type() {
		return "inverse-exact";
	}
	static get multiRegex() {
		return /^!"(.*)"$/;
	}
	static get singleRegex() {
		return /^!(.*)$/;
	}
	search(text) {
		const isMatch = text.indexOf(this.pattern) === -1;
		return {
			isMatch,
			score: isMatch ? 0 : 1,
			indices: [0, text.length - 1]
		};
	}
};
var PrefixExactMatch = class extends BaseMatch {
	constructor(pattern) {
		super(pattern);
	}
	static get type() {
		return "prefix-exact";
	}
	static get multiRegex() {
		return /^\^"(.*)"$/;
	}
	static get singleRegex() {
		return /^\^(.*)$/;
	}
	search(text) {
		const isMatch = text.startsWith(this.pattern);
		return {
			isMatch,
			score: isMatch ? 0 : 1,
			indices: [0, this.pattern.length - 1]
		};
	}
};
var InversePrefixExactMatch = class extends BaseMatch {
	constructor(pattern) {
		super(pattern);
	}
	static get type() {
		return "inverse-prefix-exact";
	}
	static get multiRegex() {
		return /^!\^"(.*)"$/;
	}
	static get singleRegex() {
		return /^!\^(.*)$/;
	}
	search(text) {
		const isMatch = !text.startsWith(this.pattern);
		return {
			isMatch,
			score: isMatch ? 0 : 1,
			indices: [0, text.length - 1]
		};
	}
};
var SuffixExactMatch = class extends BaseMatch {
	constructor(pattern) {
		super(pattern);
	}
	static get type() {
		return "suffix-exact";
	}
	static get multiRegex() {
		return /^"(.*)"\$$/;
	}
	static get singleRegex() {
		return /^(.*)\$$/;
	}
	search(text) {
		const isMatch = text.endsWith(this.pattern);
		return {
			isMatch,
			score: isMatch ? 0 : 1,
			indices: [text.length - this.pattern.length, text.length - 1]
		};
	}
};
var InverseSuffixExactMatch = class extends BaseMatch {
	constructor(pattern) {
		super(pattern);
	}
	static get type() {
		return "inverse-suffix-exact";
	}
	static get multiRegex() {
		return /^!"(.*)"\$$/;
	}
	static get singleRegex() {
		return /^!(.*)\$$/;
	}
	search(text) {
		const isMatch = !text.endsWith(this.pattern);
		return {
			isMatch,
			score: isMatch ? 0 : 1,
			indices: [0, text.length - 1]
		};
	}
};
var FuzzyMatch = class extends BaseMatch {
	constructor(pattern, { location = Config.location, threshold = Config.threshold, distance = Config.distance, includeMatches = Config.includeMatches, findAllMatches = Config.findAllMatches, minMatchCharLength = Config.minMatchCharLength, isCaseSensitive = Config.isCaseSensitive, ignoreLocation = Config.ignoreLocation } = {}) {
		super(pattern);
		this._bitapSearch = new BitapSearch(pattern, {
			location,
			threshold,
			distance,
			includeMatches,
			findAllMatches,
			minMatchCharLength,
			isCaseSensitive,
			ignoreLocation
		});
	}
	static get type() {
		return "fuzzy";
	}
	static get multiRegex() {
		return /^"(.*)"$/;
	}
	static get singleRegex() {
		return /^(.*)$/;
	}
	search(text) {
		return this._bitapSearch.searchIn(text);
	}
};
var IncludeMatch = class extends BaseMatch {
	constructor(pattern) {
		super(pattern);
	}
	static get type() {
		return "include";
	}
	static get multiRegex() {
		return /^'"(.*)"$/;
	}
	static get singleRegex() {
		return /^'(.*)$/;
	}
	search(text) {
		let location = 0;
		let index;
		const indices = [];
		const patternLen = this.pattern.length;
		while ((index = text.indexOf(this.pattern, location)) > -1) {
			location = index + patternLen;
			indices.push([index, location - 1]);
		}
		const isMatch = !!indices.length;
		return {
			isMatch,
			score: isMatch ? 0 : 1,
			indices
		};
	}
};
var searchers = [
	ExactMatch,
	IncludeMatch,
	PrefixExactMatch,
	InversePrefixExactMatch,
	InverseSuffixExactMatch,
	SuffixExactMatch,
	InverseExactMatch,
	FuzzyMatch
];
var searchersLen = searchers.length;
var SPACE_RE = / +(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)/;
var OR_TOKEN = "|";
function parseQuery(pattern, options = {}) {
	return pattern.split(OR_TOKEN).map((item) => {
		let query = item.trim().split(SPACE_RE).filter((item) => item && !!item.trim());
		let results = [];
		for (let i = 0, len = query.length; i < len; i += 1) {
			const queryItem = query[i];
			let found = false;
			let idx = -1;
			while (!found && ++idx < searchersLen) {
				const searcher = searchers[idx];
				let token = searcher.isMultiMatch(queryItem);
				if (token) {
					results.push(new searcher(token, options));
					found = true;
				}
			}
			if (found) continue;
			idx = -1;
			while (++idx < searchersLen) {
				const searcher = searchers[idx];
				let token = searcher.isSingleMatch(queryItem);
				if (token) {
					results.push(new searcher(token, options));
					break;
				}
			}
		}
		return results;
	});
}
var MultiMatchSet = /* @__PURE__ */ new Set([FuzzyMatch.type, IncludeMatch.type]);
/**
* Command-like searching
* ======================
*
* Given multiple search terms delimited by spaces.e.g. `^jscript .python$ ruby !java`,
* search in a given text.
*
* Search syntax:
*
* | Token       | Match type                 | Description                            |
* | ----------- | -------------------------- | -------------------------------------- |
* | `jscript`   | fuzzy-match                | Items that fuzzy match `jscript`       |
* | `=scheme`   | exact-match                | Items that are `scheme`                |
* | `'python`   | include-match              | Items that include `python`            |
* | `!ruby`     | inverse-exact-match        | Items that do not include `ruby`       |
* | `^java`     | prefix-exact-match         | Items that start with `java`           |
* | `!^earlang` | inverse-prefix-exact-match | Items that do not start with `earlang` |
* | `.js$`      | suffix-exact-match         | Items that end with `.js`              |
* | `!.go$`     | inverse-suffix-exact-match | Items that do not end with `.go`       |
*
* A single pipe character acts as an OR operator. For example, the following
* query matches entries that start with `core` and end with either`go`, `rb`,
* or`py`.
*
* ```
* ^core go$ | rb$ | py$
* ```
*/
var ExtendedSearch = class {
	constructor(pattern, { isCaseSensitive = Config.isCaseSensitive, includeMatches = Config.includeMatches, minMatchCharLength = Config.minMatchCharLength, ignoreLocation = Config.ignoreLocation, findAllMatches = Config.findAllMatches, location = Config.location, threshold = Config.threshold, distance = Config.distance } = {}) {
		this.query = null;
		this.options = {
			isCaseSensitive,
			includeMatches,
			minMatchCharLength,
			findAllMatches,
			ignoreLocation,
			location,
			threshold,
			distance
		};
		this.pattern = isCaseSensitive ? pattern : pattern.toLowerCase();
		this.query = parseQuery(this.pattern, this.options);
	}
	static condition(_, options) {
		return options.useExtendedSearch;
	}
	searchIn(text) {
		const query = this.query;
		if (!query) return {
			isMatch: false,
			score: 1
		};
		const { includeMatches, isCaseSensitive } = this.options;
		text = isCaseSensitive ? text : text.toLowerCase();
		let numMatches = 0;
		let allIndices = [];
		let totalScore = 0;
		for (let i = 0, qLen = query.length; i < qLen; i += 1) {
			const searchers = query[i];
			allIndices.length = 0;
			numMatches = 0;
			for (let j = 0, pLen = searchers.length; j < pLen; j += 1) {
				const searcher = searchers[j];
				const { isMatch, indices, score } = searcher.search(text);
				if (isMatch) {
					numMatches += 1;
					totalScore += score;
					if (includeMatches) {
						const type = searcher.constructor.type;
						if (MultiMatchSet.has(type)) allIndices = [...allIndices, ...indices];
						else allIndices.push(indices);
					}
				} else {
					totalScore = 0;
					numMatches = 0;
					allIndices.length = 0;
					break;
				}
			}
			if (numMatches) {
				let result = {
					isMatch: true,
					score: totalScore / numMatches
				};
				if (includeMatches) result.indices = allIndices;
				return result;
			}
		}
		return {
			isMatch: false,
			score: 1
		};
	}
};
var registeredSearchers = [];
function register(...args) {
	registeredSearchers.push(...args);
}
function createSearcher(pattern, options) {
	for (let i = 0, len = registeredSearchers.length; i < len; i += 1) {
		let searcherClass = registeredSearchers[i];
		if (searcherClass.condition(pattern, options)) return new searcherClass(pattern, options);
	}
	return new BitapSearch(pattern, options);
}
var LogicalOperator = {
	AND: "$and",
	OR: "$or"
};
var KeyType = {
	PATH: "$path",
	PATTERN: "$val"
};
var isExpression = (query) => !!(query[LogicalOperator.AND] || query[LogicalOperator.OR]);
var isPath = (query) => !!query[KeyType.PATH];
var isLeaf = (query) => !isArray(query) && isObject(query) && !isExpression(query);
var convertToExplicit = (query) => ({ [LogicalOperator.AND]: Object.keys(query).map((key) => ({ [key]: query[key] })) });
function parse(query, options, { auto = true } = {}) {
	const next = (query) => {
		let keys = Object.keys(query);
		const isQueryPath = isPath(query);
		if (!isQueryPath && keys.length > 1 && !isExpression(query)) return next(convertToExplicit(query));
		if (isLeaf(query)) {
			const key = isQueryPath ? query[KeyType.PATH] : keys[0];
			const pattern = isQueryPath ? query[KeyType.PATTERN] : query[key];
			if (!isString(pattern)) throw new Error(LOGICAL_SEARCH_INVALID_QUERY_FOR_KEY(key));
			const obj = {
				keyId: createKeyId(key),
				pattern
			};
			if (auto) obj.searcher = createSearcher(pattern, options);
			return obj;
		}
		let node = {
			children: [],
			operator: keys[0]
		};
		keys.forEach((key) => {
			const value = query[key];
			if (isArray(value)) value.forEach((item) => {
				node.children.push(next(item));
			});
		});
		return node;
	};
	if (!isExpression(query)) query = convertToExplicit(query);
	return next(query);
}
function computeScore(results, { ignoreFieldNorm = Config.ignoreFieldNorm }) {
	results.forEach((result) => {
		let totalScore = 1;
		result.matches.forEach(({ key, norm, score }) => {
			const weight = key ? key.weight : null;
			totalScore *= Math.pow(score === 0 && weight ? Number.EPSILON : score, (weight || 1) * (ignoreFieldNorm ? 1 : norm));
		});
		result.score = totalScore;
	});
}
function transformMatches(result, data) {
	const matches = result.matches;
	data.matches = [];
	if (!isDefined(matches)) return;
	matches.forEach((match) => {
		if (!isDefined(match.indices) || !match.indices.length) return;
		const { indices, value } = match;
		let obj = {
			indices,
			value
		};
		if (match.key) obj.key = match.key.src;
		if (match.idx > -1) obj.refIndex = match.idx;
		data.matches.push(obj);
	});
}
function transformScore(result, data) {
	data.score = result.score;
}
function format(results, docs, { includeMatches = Config.includeMatches, includeScore = Config.includeScore } = {}) {
	const transformers = [];
	if (includeMatches) transformers.push(transformMatches);
	if (includeScore) transformers.push(transformScore);
	return results.map((result) => {
		const { idx } = result;
		const data = {
			item: docs[idx],
			refIndex: idx
		};
		if (transformers.length) transformers.forEach((transformer) => {
			transformer(result, data);
		});
		return data;
	});
}
var Fuse = class {
	constructor(docs, options = {}, index) {
		this.options = {
			...Config,
			...options
		};
		if (this.options.useExtendedSearch && false);
		this._keyStore = new KeyStore(this.options.keys);
		this.setCollection(docs, index);
	}
	setCollection(docs, index) {
		this._docs = docs;
		if (index && !(index instanceof FuseIndex)) throw new Error(INCORRECT_INDEX_TYPE);
		this._myIndex = index || createIndex(this.options.keys, this._docs, {
			getFn: this.options.getFn,
			fieldNormWeight: this.options.fieldNormWeight
		});
	}
	add(doc) {
		if (!isDefined(doc)) return;
		this._docs.push(doc);
		this._myIndex.add(doc);
	}
	remove(predicate = () => false) {
		const results = [];
		for (let i = 0, len = this._docs.length; i < len; i += 1) {
			const doc = this._docs[i];
			if (predicate(doc, i)) {
				this.removeAt(i);
				i -= 1;
				len -= 1;
				results.push(doc);
			}
		}
		return results;
	}
	removeAt(idx) {
		this._docs.splice(idx, 1);
		this._myIndex.removeAt(idx);
	}
	getIndex() {
		return this._myIndex;
	}
	search(query, { limit = -1 } = {}) {
		const { includeMatches, includeScore, shouldSort, sortFn, ignoreFieldNorm } = this.options;
		let results = isString(query) ? isString(this._docs[0]) ? this._searchStringList(query) : this._searchObjectList(query) : this._searchLogical(query);
		computeScore(results, { ignoreFieldNorm });
		if (shouldSort) results.sort(sortFn);
		if (isNumber(limit) && limit > -1) results = results.slice(0, limit);
		return format(results, this._docs, {
			includeMatches,
			includeScore
		});
	}
	_searchStringList(query) {
		const searcher = createSearcher(query, this.options);
		const { records } = this._myIndex;
		const results = [];
		records.forEach(({ v: text, i: idx, n: norm }) => {
			if (!isDefined(text)) return;
			const { isMatch, score, indices } = searcher.searchIn(text);
			if (isMatch) results.push({
				item: text,
				idx,
				matches: [{
					score,
					value: text,
					norm,
					indices
				}]
			});
		});
		return results;
	}
	_searchLogical(query) {
		const expression = parse(query, this.options);
		const evaluate = (node, item, idx) => {
			if (!node.children) {
				const { keyId, searcher } = node;
				const matches = this._findMatches({
					key: this._keyStore.get(keyId),
					value: this._myIndex.getValueForItemAtKeyId(item, keyId),
					searcher
				});
				if (matches && matches.length) return [{
					idx,
					item,
					matches
				}];
				return [];
			}
			const res = [];
			for (let i = 0, len = node.children.length; i < len; i += 1) {
				const child = node.children[i];
				const result = evaluate(child, item, idx);
				if (result.length) res.push(...result);
				else if (node.operator === LogicalOperator.AND) return [];
			}
			return res;
		};
		const records = this._myIndex.records;
		const resultMap = {};
		const results = [];
		records.forEach(({ $: item, i: idx }) => {
			if (isDefined(item)) {
				let expResults = evaluate(expression, item, idx);
				if (expResults.length) {
					if (!resultMap[idx]) {
						resultMap[idx] = {
							idx,
							item,
							matches: []
						};
						results.push(resultMap[idx]);
					}
					expResults.forEach(({ matches }) => {
						resultMap[idx].matches.push(...matches);
					});
				}
			}
		});
		return results;
	}
	_searchObjectList(query) {
		const searcher = createSearcher(query, this.options);
		const { keys, records } = this._myIndex;
		const results = [];
		records.forEach(({ $: item, i: idx }) => {
			if (!isDefined(item)) return;
			let matches = [];
			keys.forEach((key, keyIndex) => {
				matches.push(...this._findMatches({
					key,
					value: item[keyIndex],
					searcher
				}));
			});
			if (matches.length) results.push({
				idx,
				item,
				matches
			});
		});
		return results;
	}
	_findMatches({ key, value, searcher }) {
		if (!isDefined(value)) return [];
		let matches = [];
		if (isArray(value)) value.forEach(({ v: text, i: idx, n: norm }) => {
			if (!isDefined(text)) return;
			const { isMatch, score, indices } = searcher.searchIn(text);
			if (isMatch) matches.push({
				score,
				key,
				value: text,
				idx,
				norm,
				indices
			});
		});
		else {
			const { v: text, n: norm } = value;
			const { isMatch, score, indices } = searcher.searchIn(text);
			if (isMatch) matches.push({
				score,
				key,
				value: text,
				norm,
				indices
			});
		}
		return matches;
	}
};
Fuse.version = "7.0.0";
Fuse.createIndex = createIndex;
Fuse.parseIndex = parseIndex;
Fuse.config = Config;
Fuse.parseQuery = parse;
register(ExtendedSearch);
//#endregion
//#region node_modules/.pnpm/@vueuse+integrations@14.4.0_axios@1.18.1_fuse.js@7.0.0_vue@3.5.42_typescript@6.0.3_/node_modules/@vueuse/integrations/dist/useFuse.js
function useFuse(search, data, options) {
	const createFuse = () => {
		var _toValue;
		var _toValue2;
		return new Fuse((_toValue = toValue(data)) !== null && _toValue !== void 0 ? _toValue : [], (_toValue2 = toValue(options)) === null || _toValue2 === void 0 ? void 0 : _toValue2.fuseOptions);
	};
	const fuse = shallowRef(createFuse());
	watch(() => {
		var _toValue3;
		return (_toValue3 = toValue(options)) === null || _toValue3 === void 0 ? void 0 : _toValue3.fuseOptions;
	}, () => {
		fuse.value = createFuse();
	}, { deep: true });
	watch(() => toValue(data), (newData) => {
		fuse.value.setCollection(newData);
		triggerRef(fuse);
	}, { deep: true });
	return {
		fuse,
		results: computed(() => {
			const resolved = toValue(options);
			if ((resolved === null || resolved === void 0 ? void 0 : resolved.matchAllWhenSearchEmpty) && !toValue(search)) return toValue(data).map((item, index) => ({
				item,
				refIndex: index
			}));
			const limit = resolved === null || resolved === void 0 ? void 0 : resolved.resultLimit;
			return fuse.value.search(toValue(search), limit ? { limit } : void 0);
		})
	};
}
//#endregion
export { reactiveOmit as $, useMagicKeys as A, useResizeObserver as B, useFocusWithin as C, useIntersectionObserver as D, useInfiniteScroll as E, useMutationObserver as F, useTitle as G, useStepper as H, useObjectUrl as I, useWindowSize as J, useTransition as K, usePointerSwipe as L, useMemoize as M, useMouse as N, useKeyModifier as O, useMouseInElement as P, promiseTimeout as Q, usePreferredReducedMotion as R, useFavicon as S, useImage as T, useStorage as U, useScroll as V, useTimestamp as W, createSharedComposable as X, createEventHook as Y, get$1 as Z, useDropZone as _, TransitionPresets as a, useDebounceFn as at, useElementSize as b, createReusableTemplate as c, useTimeout as ct, onClickOutside as d, whenever as dt, refAutoReset as et, unrefElement as f, useDocumentVisibility as g, useCurrentElement as h, StorageSerializers as i, until as it, useMediaControls as j, useLocalStorage as k, defaultDocument as l, useTimeoutFn as lt, useBreakpoints as m, Fuse as n, toRef as nt, breakpointsTailwind as o, useIntervalFn as ot, useAsyncState as p, useVModel as q, useRouteHash as r, tryOnScopeDispose as rt, computedAsync as s, useThrottleFn as st, useFuse as t, refDebounced as tt, defaultWindow as u, watchDebounced as ut, useElementBounding as v, useFullscreen as w, useEventListener as x, useElementHover as y, useRafFn as z };
