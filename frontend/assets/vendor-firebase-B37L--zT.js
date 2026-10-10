import "./rolldown-runtime-xtsTai4I.js";
//#region node_modules/.pnpm/@firebase+util@1.12.1/node_modules/@firebase/util/dist/postinstall.mjs
/**
* @license
* Copyright 2025 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var getDefaultsFromPostinstall = () => void 0;
//#endregion
//#region node_modules/.pnpm/@firebase+util@1.12.1/node_modules/@firebase/util/dist/index.esm2017.js
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var stringToByteArray$1 = function(str) {
	const out = [];
	let p = 0;
	for (let i = 0; i < str.length; i++) {
		let c = str.charCodeAt(i);
		if (c < 128) out[p++] = c;
		else if (c < 2048) {
			out[p++] = c >> 6 | 192;
			out[p++] = c & 63 | 128;
		} else if ((c & 64512) === 55296 && i + 1 < str.length && (str.charCodeAt(i + 1) & 64512) === 56320) {
			c = 65536 + ((c & 1023) << 10) + (str.charCodeAt(++i) & 1023);
			out[p++] = c >> 18 | 240;
			out[p++] = c >> 12 & 63 | 128;
			out[p++] = c >> 6 & 63 | 128;
			out[p++] = c & 63 | 128;
		} else {
			out[p++] = c >> 12 | 224;
			out[p++] = c >> 6 & 63 | 128;
			out[p++] = c & 63 | 128;
		}
	}
	return out;
};
/**
* Turns an array of numbers into the string given by the concatenation of the
* characters to which the numbers correspond.
* @param bytes Array of numbers representing characters.
* @return Stringification of the array.
*/
var byteArrayToString = function(bytes) {
	const out = [];
	let pos = 0;
	let c = 0;
	while (pos < bytes.length) {
		const c1 = bytes[pos++];
		if (c1 < 128) out[c++] = String.fromCharCode(c1);
		else if (c1 > 191 && c1 < 224) {
			const c2 = bytes[pos++];
			out[c++] = String.fromCharCode((c1 & 31) << 6 | c2 & 63);
		} else if (c1 > 239 && c1 < 365) {
			const c2 = bytes[pos++];
			const c3 = bytes[pos++];
			const c4 = bytes[pos++];
			const u = ((c1 & 7) << 18 | (c2 & 63) << 12 | (c3 & 63) << 6 | c4 & 63) - 65536;
			out[c++] = String.fromCharCode(55296 + (u >> 10));
			out[c++] = String.fromCharCode(56320 + (u & 1023));
		} else {
			const c2 = bytes[pos++];
			const c3 = bytes[pos++];
			out[c++] = String.fromCharCode((c1 & 15) << 12 | (c2 & 63) << 6 | c3 & 63);
		}
	}
	return out.join("");
};
var base64 = {
	/**
	* Maps bytes to characters.
	*/
	byteToCharMap_: null,
	/**
	* Maps characters to bytes.
	*/
	charToByteMap_: null,
	/**
	* Maps bytes to websafe characters.
	* @private
	*/
	byteToCharMapWebSafe_: null,
	/**
	* Maps websafe characters to bytes.
	* @private
	*/
	charToByteMapWebSafe_: null,
	/**
	* Our default alphabet, shared between
	* ENCODED_VALS and ENCODED_VALS_WEBSAFE
	*/
	ENCODED_VALS_BASE: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
	/**
	* Our default alphabet. Value 64 (=) is special; it means "nothing."
	*/
	get ENCODED_VALS() {
		return this.ENCODED_VALS_BASE + "+/=";
	},
	/**
	* Our websafe alphabet.
	*/
	get ENCODED_VALS_WEBSAFE() {
		return this.ENCODED_VALS_BASE + "-_.";
	},
	/**
	* Whether this browser supports the atob and btoa functions. This extension
	* started at Mozilla but is now implemented by many browsers. We use the
	* ASSUME_* variables to avoid pulling in the full useragent detection library
	* but still allowing the standard per-browser compilations.
	*
	*/
	HAS_NATIVE_SUPPORT: typeof atob === "function",
	/**
	* Base64-encode an array of bytes.
	*
	* @param input An array of bytes (numbers with
	*     value in [0, 255]) to encode.
	* @param webSafe Boolean indicating we should use the
	*     alternative alphabet.
	* @return The base64 encoded string.
	*/
	encodeByteArray(input, webSafe) {
		if (!Array.isArray(input)) throw Error("encodeByteArray takes an array as a parameter");
		this.init_();
		const byteToCharMap = webSafe ? this.byteToCharMapWebSafe_ : this.byteToCharMap_;
		const output = [];
		for (let i = 0; i < input.length; i += 3) {
			const byte1 = input[i];
			const haveByte2 = i + 1 < input.length;
			const byte2 = haveByte2 ? input[i + 1] : 0;
			const haveByte3 = i + 2 < input.length;
			const byte3 = haveByte3 ? input[i + 2] : 0;
			const outByte1 = byte1 >> 2;
			const outByte2 = (byte1 & 3) << 4 | byte2 >> 4;
			let outByte3 = (byte2 & 15) << 2 | byte3 >> 6;
			let outByte4 = byte3 & 63;
			if (!haveByte3) {
				outByte4 = 64;
				if (!haveByte2) outByte3 = 64;
			}
			output.push(byteToCharMap[outByte1], byteToCharMap[outByte2], byteToCharMap[outByte3], byteToCharMap[outByte4]);
		}
		return output.join("");
	},
	/**
	* Base64-encode a string.
	*
	* @param input A string to encode.
	* @param webSafe If true, we should use the
	*     alternative alphabet.
	* @return The base64 encoded string.
	*/
	encodeString(input, webSafe) {
		if (this.HAS_NATIVE_SUPPORT && !webSafe) return btoa(input);
		return this.encodeByteArray(stringToByteArray$1(input), webSafe);
	},
	/**
	* Base64-decode a string.
	*
	* @param input to decode.
	* @param webSafe True if we should use the
	*     alternative alphabet.
	* @return string representing the decoded value.
	*/
	decodeString(input, webSafe) {
		if (this.HAS_NATIVE_SUPPORT && !webSafe) return atob(input);
		return byteArrayToString(this.decodeStringToByteArray(input, webSafe));
	},
	/**
	* Base64-decode a string.
	*
	* In base-64 decoding, groups of four characters are converted into three
	* bytes.  If the encoder did not apply padding, the input length may not
	* be a multiple of 4.
	*
	* In this case, the last group will have fewer than 4 characters, and
	* padding will be inferred.  If the group has one or two characters, it decodes
	* to one byte.  If the group has three characters, it decodes to two bytes.
	*
	* @param input Input to decode.
	* @param webSafe True if we should use the web-safe alphabet.
	* @return bytes representing the decoded value.
	*/
	decodeStringToByteArray(input, webSafe) {
		this.init_();
		const charToByteMap = webSafe ? this.charToByteMapWebSafe_ : this.charToByteMap_;
		const output = [];
		for (let i = 0; i < input.length;) {
			const byte1 = charToByteMap[input.charAt(i++)];
			const byte2 = i < input.length ? charToByteMap[input.charAt(i)] : 0;
			++i;
			const byte3 = i < input.length ? charToByteMap[input.charAt(i)] : 64;
			++i;
			const byte4 = i < input.length ? charToByteMap[input.charAt(i)] : 64;
			++i;
			if (byte1 == null || byte2 == null || byte3 == null || byte4 == null) throw new DecodeBase64StringError();
			const outByte1 = byte1 << 2 | byte2 >> 4;
			output.push(outByte1);
			if (byte3 !== 64) {
				const outByte2 = byte2 << 4 & 240 | byte3 >> 2;
				output.push(outByte2);
				if (byte4 !== 64) {
					const outByte3 = byte3 << 6 & 192 | byte4;
					output.push(outByte3);
				}
			}
		}
		return output;
	},
	/**
	* Lazy static initialization function. Called before
	* accessing any of the static map variables.
	* @private
	*/
	init_() {
		if (!this.byteToCharMap_) {
			this.byteToCharMap_ = {};
			this.charToByteMap_ = {};
			this.byteToCharMapWebSafe_ = {};
			this.charToByteMapWebSafe_ = {};
			for (let i = 0; i < this.ENCODED_VALS.length; i++) {
				this.byteToCharMap_[i] = this.ENCODED_VALS.charAt(i);
				this.charToByteMap_[this.byteToCharMap_[i]] = i;
				this.byteToCharMapWebSafe_[i] = this.ENCODED_VALS_WEBSAFE.charAt(i);
				this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[i]] = i;
				if (i >= this.ENCODED_VALS_BASE.length) {
					this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(i)] = i;
					this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(i)] = i;
				}
			}
		}
	}
};
/**
* An error encountered while decoding base64 string.
*/
var DecodeBase64StringError = class extends Error {
	constructor() {
		super(...arguments);
		this.name = "DecodeBase64StringError";
	}
};
/**
* URL-safe base64 encoding
*/
var base64Encode = function(str) {
	const utf8Bytes = stringToByteArray$1(str);
	return base64.encodeByteArray(utf8Bytes, true);
};
/**
* URL-safe base64 encoding (without "." padding in the end).
* e.g. Used in JSON Web Token (JWT) parts.
*/
var base64urlEncodeWithoutPadding = function(str) {
	return base64Encode(str).replace(/\./g, "");
};
/**
* URL-safe base64 decoding
*
* NOTE: DO NOT use the global atob() function - it does NOT support the
* base64Url variant encoding.
*
* @param str To be decoded
* @return Decoded result, if possible
*/
var base64Decode = function(str) {
	try {
		return base64.decodeString(str, true);
	} catch (e) {
		console.error("base64Decode failed: ", e);
	}
	return null;
};
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
/**
* @license
* Copyright 2022 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
/**
* Polyfill for `globalThis` object.
* @returns the `globalThis` object for the given environment.
* @public
*/
function getGlobal() {
	if (typeof self !== "undefined") return self;
	if (typeof window !== "undefined") return window;
	if (typeof global !== "undefined") return global;
	throw new Error("Unable to locate global object.");
}
/**
* @license
* Copyright 2022 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var getDefaultsFromGlobal = () => getGlobal().__FIREBASE_DEFAULTS__;
/**
* Attempt to read defaults from a JSON string provided to
* process(.)env(.)__FIREBASE_DEFAULTS__ or a JSON file whose path is in
* process(.)env(.)__FIREBASE_DEFAULTS_PATH__
* The dots are in parens because certain compilers (Vite?) cannot
* handle seeing that variable in comments.
* See https://github.com/firebase/firebase-js-sdk/issues/6838
*/
var getDefaultsFromEnvVariable = () => {
	if (typeof process === "undefined" || false) return;
	const defaultsJsonString = {}.__FIREBASE_DEFAULTS__;
	if (defaultsJsonString) return JSON.parse(defaultsJsonString);
};
var getDefaultsFromCookie = () => {
	if (typeof document === "undefined") return;
	let match;
	try {
		match = document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/);
	} catch (e) {
		return;
	}
	const decoded = match && base64Decode(match[1]);
	return decoded && JSON.parse(decoded);
};
/**
* Get the __FIREBASE_DEFAULTS__ object. It checks in order:
* (1) if such an object exists as a property of `globalThis`
* (2) if such an object was provided on a shell environment variable
* (3) if such an object exists in a cookie
* @public
*/
var getDefaults = () => {
	try {
		return getDefaultsFromPostinstall() || getDefaultsFromGlobal() || getDefaultsFromEnvVariable() || getDefaultsFromCookie();
	} catch (e) {
		/**
		* Catch-all for being unable to get __FIREBASE_DEFAULTS__ due
		* to any environment case we have not accounted for. Log to
		* info instead of swallowing so we can find these unknown cases
		* and add paths for them if needed.
		*/
		`${e}`;
		return;
	}
};
/**
* Returns emulator host stored in the __FIREBASE_DEFAULTS__ object
* for the given product.
* @returns a URL host formatted like `127.0.0.1:9999` or `[::1]:4000` if available
* @public
*/
var getDefaultEmulatorHost = (productName) => {
	var _a;
	var _b;
	return (_b = (_a = getDefaults()) === null || _a === void 0 ? void 0 : _a.emulatorHosts) === null || _b === void 0 ? void 0 : _b[productName];
};
/**
* Returns Firebase app config stored in the __FIREBASE_DEFAULTS__ object.
* @public
*/
var getDefaultAppConfig = () => {
	var _a;
	return (_a = getDefaults()) === null || _a === void 0 ? void 0 : _a.config;
};
/**
* Returns an experimental setting on the __FIREBASE_DEFAULTS__ object (properties
* prefixed by "_")
* @public
*/
var getExperimentalSetting = (name) => {
	var _a;
	return (_a = getDefaults()) === null || _a === void 0 ? void 0 : _a[`_${name}`];
};
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var Deferred = class {
	constructor() {
		this.reject = () => {};
		this.resolve = () => {};
		this.promise = new Promise((resolve, reject) => {
			this.resolve = resolve;
			this.reject = reject;
		});
	}
	/**
	* Our API internals are not promisified and cannot because our callback APIs have subtle expectations around
	* invoking promises inline, which Promises are forbidden to do. This method accepts an optional node-style callback
	* and returns a node-style callback which will resolve or reject the Deferred's promise.
	*/
	wrapCallback(callback) {
		return (error, value) => {
			if (error) this.reject(error);
			else this.resolve(value);
			if (typeof callback === "function") {
				this.promise.catch(() => {});
				if (callback.length === 1) callback(error);
				else callback(error, value);
			}
		};
	}
};
/**
* @license
* Copyright 2025 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
/**
* Checks whether host is a cloud workstation or not.
* @public
*/
function isCloudWorkstation(url) {
	try {
		return (url.startsWith("http://") || url.startsWith("https://") ? new URL(url).hostname : url).endsWith(".cloudworkstations.dev");
	} catch (_a) {
		return false;
	}
}
/**
* Makes a fetch request to the given server.
* Mostly used for forwarding cookies in Firebase Studio.
* @public
*/
async function pingServer(endpoint) {
	return (await fetch(endpoint, { credentials: "include" })).ok;
}
/**
* @license
* Copyright 2021 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var emulatorStatus = {};
function getEmulatorSummary() {
	const summary = {
		prod: [],
		emulator: []
	};
	for (const key of Object.keys(emulatorStatus)) if (emulatorStatus[key]) summary.emulator.push(key);
	else summary.prod.push(key);
	return summary;
}
function getOrCreateEl(id) {
	let parentDiv = document.getElementById(id);
	let created = false;
	if (!parentDiv) {
		parentDiv = document.createElement("div");
		parentDiv.setAttribute("id", id);
		created = true;
	}
	return {
		created,
		element: parentDiv
	};
}
var previouslyDismissed = false;
/**
* Updates Emulator Banner. Primarily used for Firebase Studio
* @param name
* @param isRunningEmulator
* @public
*/
function updateEmulatorBanner(name, isRunningEmulator) {
	if (typeof window === "undefined" || typeof document === "undefined" || !isCloudWorkstation(window.location.host) || emulatorStatus[name] === isRunningEmulator || emulatorStatus[name] || previouslyDismissed) return;
	emulatorStatus[name] = isRunningEmulator;
	function prefixedId(id) {
		return `__firebase__banner__${id}`;
	}
	const bannerId = "__firebase__banner";
	const showError = getEmulatorSummary().prod.length > 0;
	function tearDown() {
		const element = document.getElementById(bannerId);
		if (element) element.remove();
	}
	function setupBannerStyles(bannerEl) {
		bannerEl.style.display = "flex";
		bannerEl.style.background = "#7faaf0";
		bannerEl.style.position = "fixed";
		bannerEl.style.bottom = "5px";
		bannerEl.style.left = "5px";
		bannerEl.style.padding = ".5em";
		bannerEl.style.borderRadius = "5px";
		bannerEl.style.alignItems = "center";
	}
	function setupIconStyles(prependIcon, iconId) {
		prependIcon.setAttribute("width", "24");
		prependIcon.setAttribute("id", iconId);
		prependIcon.setAttribute("height", "24");
		prependIcon.setAttribute("viewBox", "0 0 24 24");
		prependIcon.setAttribute("fill", "none");
		prependIcon.style.marginLeft = "-6px";
	}
	function setupCloseBtn() {
		const closeBtn = document.createElement("span");
		closeBtn.style.cursor = "pointer";
		closeBtn.style.marginLeft = "16px";
		closeBtn.style.fontSize = "24px";
		closeBtn.innerHTML = " &times;";
		closeBtn.onclick = () => {
			previouslyDismissed = true;
			tearDown();
		};
		return closeBtn;
	}
	function setupLinkStyles(learnMoreLink, learnMoreId) {
		learnMoreLink.setAttribute("id", learnMoreId);
		learnMoreLink.innerText = "Learn more";
		learnMoreLink.href = "https://firebase.google.com/docs/studio/preview-apps#preview-backend";
		learnMoreLink.setAttribute("target", "__blank");
		learnMoreLink.style.paddingLeft = "5px";
		learnMoreLink.style.textDecoration = "underline";
	}
	function setupDom() {
		const banner = getOrCreateEl(bannerId);
		const firebaseTextId = prefixedId("text");
		const firebaseText = document.getElementById(firebaseTextId) || document.createElement("span");
		const learnMoreId = prefixedId("learnmore");
		const learnMoreLink = document.getElementById(learnMoreId) || document.createElement("a");
		const prependIconId = prefixedId("preprendIcon");
		const prependIcon = document.getElementById(prependIconId) || document.createElementNS("http://www.w3.org/2000/svg", "svg");
		if (banner.created) {
			const bannerEl = banner.element;
			setupBannerStyles(bannerEl);
			setupLinkStyles(learnMoreLink, learnMoreId);
			const closeBtn = setupCloseBtn();
			setupIconStyles(prependIcon, prependIconId);
			bannerEl.append(prependIcon, firebaseText, learnMoreLink, closeBtn);
			document.body.appendChild(bannerEl);
		}
		if (showError) {
			firebaseText.innerText = `Preview backend disconnected.`;
			prependIcon.innerHTML = `<g clip-path="url(#clip0_6013_33858)">
<path d="M4.8 17.6L12 5.6L19.2 17.6H4.8ZM6.91667 16.4H17.0833L12 7.93333L6.91667 16.4ZM12 15.6C12.1667 15.6 12.3056 15.5444 12.4167 15.4333C12.5389 15.3111 12.6 15.1667 12.6 15C12.6 14.8333 12.5389 14.6944 12.4167 14.5833C12.3056 14.4611 12.1667 14.4 12 14.4C11.8333 14.4 11.6889 14.4611 11.5667 14.5833C11.4556 14.6944 11.4 14.8333 11.4 15C11.4 15.1667 11.4556 15.3111 11.5667 15.4333C11.6889 15.5444 11.8333 15.6 12 15.6ZM11.4 13.6H12.6V10.4H11.4V13.6Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6013_33858">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`;
		} else {
			prependIcon.innerHTML = `<g clip-path="url(#clip0_6083_34804)">
<path d="M11.4 15.2H12.6V11.2H11.4V15.2ZM12 10C12.1667 10 12.3056 9.94444 12.4167 9.83333C12.5389 9.71111 12.6 9.56667 12.6 9.4C12.6 9.23333 12.5389 9.09444 12.4167 8.98333C12.3056 8.86111 12.1667 8.8 12 8.8C11.8333 8.8 11.6889 8.86111 11.5667 8.98333C11.4556 9.09444 11.4 9.23333 11.4 9.4C11.4 9.56667 11.4556 9.71111 11.5667 9.83333C11.6889 9.94444 11.8333 10 12 10ZM12 18.4C11.1222 18.4 10.2944 18.2333 9.51667 17.9C8.73889 17.5667 8.05556 17.1111 7.46667 16.5333C6.88889 15.9444 6.43333 15.2611 6.1 14.4833C5.76667 13.7056 5.6 12.8778 5.6 12C5.6 11.1111 5.76667 10.2833 6.1 9.51667C6.43333 8.73889 6.88889 8.06111 7.46667 7.48333C8.05556 6.89444 8.73889 6.43333 9.51667 6.1C10.2944 5.76667 11.1222 5.6 12 5.6C12.8889 5.6 13.7167 5.76667 14.4833 6.1C15.2611 6.43333 15.9389 6.89444 16.5167 7.48333C17.1056 8.06111 17.5667 8.73889 17.9 9.51667C18.2333 10.2833 18.4 11.1111 18.4 12C18.4 12.8778 18.2333 13.7056 17.9 14.4833C17.5667 15.2611 17.1056 15.9444 16.5167 16.5333C15.9389 17.1111 15.2611 17.5667 14.4833 17.9C13.7167 18.2333 12.8889 18.4 12 18.4ZM12 17.2C13.4444 17.2 14.6722 16.6944 15.6833 15.6833C16.6944 14.6722 17.2 13.4444 17.2 12C17.2 10.5556 16.6944 9.32778 15.6833 8.31667C14.6722 7.30555 13.4444 6.8 12 6.8C10.5556 6.8 9.32778 7.30555 8.31667 8.31667C7.30556 9.32778 6.8 10.5556 6.8 12C6.8 13.4444 7.30556 14.6722 8.31667 15.6833C9.32778 16.6944 10.5556 17.2 12 17.2Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6083_34804">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`;
			firebaseText.innerText = "Preview backend running in this workspace.";
		}
		firebaseText.setAttribute("id", firebaseTextId);
	}
	if (document.readyState === "loading") window.addEventListener("DOMContentLoaded", setupDom);
	else setupDom();
}
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
/**
* Returns navigator.userAgent string or '' if it's not defined.
* @return user agent string
*/
function getUA() {
	if (typeof navigator !== "undefined" && typeof navigator["userAgent"] === "string") return navigator["userAgent"];
	else return "";
}
/**
* Detect Cordova / PhoneGap / Ionic frameworks on a mobile device.
*
* Deliberately does not rely on checking `file://` URLs (as this fails PhoneGap
* in the Ripple emulator) nor Cordova `onDeviceReady`, which would normally
* wait for a callback.
*/
function isMobileCordova() {
	return typeof window !== "undefined" && !!(window["cordova"] || window["phonegap"] || window["PhoneGap"]) && /ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(getUA());
}
/**
* Detect Cloudflare Worker context.
*/
function isCloudflareWorker() {
	return typeof navigator !== "undefined" && navigator.userAgent === "Cloudflare-Workers";
}
function isBrowserExtension() {
	const runtime = typeof chrome === "object" ? chrome.runtime : typeof browser === "object" ? browser.runtime : void 0;
	return typeof runtime === "object" && runtime.id !== void 0;
}
/**
* Detect React Native.
*
* @return true if ReactNative environment is detected.
*/
function isReactNative() {
	return typeof navigator === "object" && navigator["product"] === "ReactNative";
}
/** Detects Internet Explorer. */
function isIE() {
	const ua = getUA();
	return ua.indexOf("MSIE ") >= 0 || ua.indexOf("Trident/") >= 0;
}
/**
* This method checks if indexedDB is supported by current browser/service worker context
* @return true if indexedDB is supported by current browser/service worker context
*/
function isIndexedDBAvailable() {
	try {
		return typeof indexedDB === "object";
	} catch (e) {
		return false;
	}
}
/**
* This method validates browser/sw context for indexedDB by opening a dummy indexedDB database and reject
* if errors occur during the database open operation.
*
* @throws exception if current browser/sw context can't run idb.open (ex: Safari iframe, Firefox
* private browsing)
*/
function validateIndexedDBOpenable() {
	return new Promise((resolve, reject) => {
		try {
			let preExist = true;
			const DB_CHECK_NAME = "validate-browser-context-for-indexeddb-analytics-module";
			const request = self.indexedDB.open(DB_CHECK_NAME);
			request.onsuccess = () => {
				request.result.close();
				if (!preExist) self.indexedDB.deleteDatabase(DB_CHECK_NAME);
				resolve(true);
			};
			request.onupgradeneeded = () => {
				preExist = false;
			};
			request.onerror = () => {
				var _a;
				reject(((_a = request.error) === null || _a === void 0 ? void 0 : _a.message) || "");
			};
		} catch (error) {
			reject(error);
		}
	});
}
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
/**
* @fileoverview Standardized Firebase Error.
*
* Usage:
*
*   // TypeScript string literals for type-safe codes
*   type Err =
*     'unknown' |
*     'object-not-found'
*     ;
*
*   // Closure enum for type-safe error codes
*   // at-enum {string}
*   var Err = {
*     UNKNOWN: 'unknown',
*     OBJECT_NOT_FOUND: 'object-not-found',
*   }
*
*   let errors: Map<Err, string> = {
*     'generic-error': "Unknown error",
*     'file-not-found': "Could not find file: {$file}",
*   };
*
*   // Type-safe function - must pass a valid error code as param.
*   let error = new ErrorFactory<Err>('service', 'Service', errors);
*
*   ...
*   throw error.create(Err.GENERIC);
*   ...
*   throw error.create(Err.FILE_NOT_FOUND, {'file': fileName});
*   ...
*   // Service: Could not file file: foo.txt (service/file-not-found).
*
*   catch (e) {
*     assert(e.message === "Could not find file: foo.txt.");
*     if ((e as FirebaseError)?.code === 'service/file-not-found') {
*       console.log("Could not read file: " + e['file']);
*     }
*   }
*/
var ERROR_NAME = "FirebaseError";
var FirebaseError = class FirebaseError extends Error {
	constructor(code, message, customData) {
		super(message);
		this.code = code;
		this.customData = customData;
		/** The custom name for all FirebaseErrors. */
		this.name = ERROR_NAME;
		Object.setPrototypeOf(this, FirebaseError.prototype);
		if (Error.captureStackTrace) Error.captureStackTrace(this, ErrorFactory.prototype.create);
	}
};
var ErrorFactory = class {
	constructor(service, serviceName, errors) {
		this.service = service;
		this.serviceName = serviceName;
		this.errors = errors;
	}
	create(code, ...data) {
		const customData = data[0] || {};
		const fullCode = `${this.service}/${code}`;
		const template = this.errors[code];
		const message = template ? replaceTemplate(template, customData) : "Error";
		return new FirebaseError(fullCode, `${this.serviceName}: ${message} (${fullCode}).`, customData);
	}
};
function replaceTemplate(template, data) {
	return template.replace(PATTERN, (_, key) => {
		const value = data[key];
		return value != null ? String(value) : `<${key}?>`;
	});
}
var PATTERN = /\{\$([^}]+)}/g;
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
function isEmpty(obj) {
	for (const key in obj) if (Object.prototype.hasOwnProperty.call(obj, key)) return false;
	return true;
}
/**
* Deep equal two objects. Support Arrays and Objects.
*/
function deepEqual(a, b) {
	if (a === b) return true;
	const aKeys = Object.keys(a);
	const bKeys = Object.keys(b);
	for (const k of aKeys) {
		if (!bKeys.includes(k)) return false;
		const aProp = a[k];
		const bProp = b[k];
		if (isObject(aProp) && isObject(bProp)) {
			if (!deepEqual(aProp, bProp)) return false;
		} else if (aProp !== bProp) return false;
	}
	for (const k of bKeys) if (!aKeys.includes(k)) return false;
	return true;
}
function isObject(thing) {
	return thing !== null && typeof thing === "object";
}
/**
* @license
* Copyright 2022 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
/**
* Returns a querystring-formatted string (e.g. &arg=val&arg2=val2) from a
* params object (e.g. {arg: 'val', arg2: 'val2'})
* Note: You must prepend it with ? when adding it to a URL.
*/
function querystring(querystringParams) {
	const params = [];
	for (const [key, value] of Object.entries(querystringParams)) if (Array.isArray(value)) value.forEach((arrayVal) => {
		params.push(encodeURIComponent(key) + "=" + encodeURIComponent(arrayVal));
	});
	else params.push(encodeURIComponent(key) + "=" + encodeURIComponent(value));
	return params.length ? "&" + params.join("&") : "";
}
/**
* Decodes a querystring (e.g. ?arg=val&arg2=val2) into a params object
* (e.g. {arg: 'val', arg2: 'val2'})
*/
function querystringDecode(querystring) {
	const obj = {};
	querystring.replace(/^\?/, "").split("&").forEach((token) => {
		if (token) {
			const [key, value] = token.split("=");
			obj[decodeURIComponent(key)] = decodeURIComponent(value);
		}
	});
	return obj;
}
/**
* Extract the query string part of a URL, including the leading question mark (if present).
*/
function extractQuerystring(url) {
	const queryStart = url.indexOf("?");
	if (!queryStart) return "";
	const fragmentStart = url.indexOf("#", queryStart);
	return url.substring(queryStart, fragmentStart > 0 ? fragmentStart : void 0);
}
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
/**
* Helper to make a Subscribe function (just like Promise helps make a
* Thenable).
*
* @param executor Function which can make calls to a single Observer
*     as a proxy.
* @param onNoObservers Callback when count of Observers goes to zero.
*/
function createSubscribe(executor, onNoObservers) {
	const proxy = new ObserverProxy(executor, onNoObservers);
	return proxy.subscribe.bind(proxy);
}
/**
* Implement fan-out for any number of Observers attached via a subscribe
* function.
*/
var ObserverProxy = class {
	/**
	* @param executor Function which can make calls to a single Observer
	*     as a proxy.
	* @param onNoObservers Callback when count of Observers goes to zero.
	*/
	constructor(executor, onNoObservers) {
		this.observers = [];
		this.unsubscribes = [];
		this.observerCount = 0;
		this.task = Promise.resolve();
		this.finalized = false;
		this.onNoObservers = onNoObservers;
		this.task.then(() => {
			executor(this);
		}).catch((e) => {
			this.error(e);
		});
	}
	next(value) {
		this.forEachObserver((observer) => {
			observer.next(value);
		});
	}
	error(error) {
		this.forEachObserver((observer) => {
			observer.error(error);
		});
		this.close(error);
	}
	complete() {
		this.forEachObserver((observer) => {
			observer.complete();
		});
		this.close();
	}
	/**
	* Subscribe function that can be used to add an Observer to the fan-out list.
	*
	* - We require that no event is sent to a subscriber synchronously to their
	*   call to subscribe().
	*/
	subscribe(nextOrObserver, error, complete) {
		let observer;
		if (nextOrObserver === void 0 && error === void 0 && complete === void 0) throw new Error("Missing Observer.");
		if (implementsAnyMethods(nextOrObserver, [
			"next",
			"error",
			"complete"
		])) observer = nextOrObserver;
		else observer = {
			next: nextOrObserver,
			error,
			complete
		};
		if (observer.next === void 0) observer.next = noop;
		if (observer.error === void 0) observer.error = noop;
		if (observer.complete === void 0) observer.complete = noop;
		const unsub = this.unsubscribeOne.bind(this, this.observers.length);
		if (this.finalized) this.task.then(() => {
			try {
				if (this.finalError) observer.error(this.finalError);
				else observer.complete();
			} catch (e) {}
		});
		this.observers.push(observer);
		return unsub;
	}
	unsubscribeOne(i) {
		if (this.observers === void 0 || this.observers[i] === void 0) return;
		delete this.observers[i];
		this.observerCount -= 1;
		if (this.observerCount === 0 && this.onNoObservers !== void 0) this.onNoObservers(this);
	}
	forEachObserver(fn) {
		if (this.finalized) return;
		for (let i = 0; i < this.observers.length; i++) this.sendOne(i, fn);
	}
	sendOne(i, fn) {
		this.task.then(() => {
			if (this.observers !== void 0 && this.observers[i] !== void 0) try {
				fn(this.observers[i]);
			} catch (e) {
				if (typeof console !== "undefined" && console.error) console.error(e);
			}
		});
	}
	close(err) {
		if (this.finalized) return;
		this.finalized = true;
		if (err !== void 0) this.finalError = err;
		this.task.then(() => {
			this.observers = void 0;
			this.onNoObservers = void 0;
		});
	}
};
/**
* Return true if the object passed in implements any of the named methods.
*/
function implementsAnyMethods(obj, methods) {
	if (typeof obj !== "object" || obj === null) return false;
	for (const method of methods) if (method in obj && typeof obj[method] === "function") return true;
	return false;
}
function noop() {}
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
/**
* @license
* Copyright 2021 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
function getModularInstance(service) {
	if (service && service._delegate) return service._delegate;
	else return service;
}
//#endregion
//#region node_modules/.pnpm/@firebase+component@0.6.18/node_modules/@firebase/component/dist/esm/index.esm2017.js
/**
* Component for service name T, e.g. `auth`, `auth-internal`
*/
var Component = class {
	/**
	*
	* @param name The public service name, e.g. app, auth, firestore, database
	* @param instanceFactory Service factory responsible for creating the public interface
	* @param type whether the service provided by the component is public or private
	*/
	constructor(name, instanceFactory, type) {
		this.name = name;
		this.instanceFactory = instanceFactory;
		this.type = type;
		this.multipleInstances = false;
		/**
		* Properties to be added to the service namespace
		*/
		this.serviceProps = {};
		this.instantiationMode = "LAZY";
		this.onInstanceCreated = null;
	}
	setInstantiationMode(mode) {
		this.instantiationMode = mode;
		return this;
	}
	setMultipleInstances(multipleInstances) {
		this.multipleInstances = multipleInstances;
		return this;
	}
	setServiceProps(props) {
		this.serviceProps = props;
		return this;
	}
	setInstanceCreatedCallback(callback) {
		this.onInstanceCreated = callback;
		return this;
	}
};
/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var DEFAULT_ENTRY_NAME$1 = "[DEFAULT]";
/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
/**
* Provider for instance for service name T, e.g. 'auth', 'auth-internal'
* NameServiceMapping[T] is an alias for the type of the instance
*/
var Provider = class {
	constructor(name, container) {
		this.name = name;
		this.container = container;
		this.component = null;
		this.instances = /* @__PURE__ */ new Map();
		this.instancesDeferred = /* @__PURE__ */ new Map();
		this.instancesOptions = /* @__PURE__ */ new Map();
		this.onInitCallbacks = /* @__PURE__ */ new Map();
	}
	/**
	* @param identifier A provider can provide multiple instances of a service
	* if this.component.multipleInstances is true.
	*/
	get(identifier) {
		const normalizedIdentifier = this.normalizeInstanceIdentifier(identifier);
		if (!this.instancesDeferred.has(normalizedIdentifier)) {
			const deferred = new Deferred();
			this.instancesDeferred.set(normalizedIdentifier, deferred);
			if (this.isInitialized(normalizedIdentifier) || this.shouldAutoInitialize()) try {
				const instance = this.getOrInitializeService({ instanceIdentifier: normalizedIdentifier });
				if (instance) deferred.resolve(instance);
			} catch (e) {}
		}
		return this.instancesDeferred.get(normalizedIdentifier).promise;
	}
	getImmediate(options) {
		var _a;
		const normalizedIdentifier = this.normalizeInstanceIdentifier(options === null || options === void 0 ? void 0 : options.identifier);
		const optional = (_a = options === null || options === void 0 ? void 0 : options.optional) !== null && _a !== void 0 ? _a : false;
		if (this.isInitialized(normalizedIdentifier) || this.shouldAutoInitialize()) try {
			return this.getOrInitializeService({ instanceIdentifier: normalizedIdentifier });
		} catch (e) {
			if (optional) return null;
			else throw e;
		}
		else if (optional) return null;
		else throw Error(`Service ${this.name} is not available`);
	}
	getComponent() {
		return this.component;
	}
	setComponent(component) {
		if (component.name !== this.name) throw Error(`Mismatching Component ${component.name} for Provider ${this.name}.`);
		if (this.component) throw Error(`Component for ${this.name} has already been provided`);
		this.component = component;
		if (!this.shouldAutoInitialize()) return;
		if (isComponentEager(component)) try {
			this.getOrInitializeService({ instanceIdentifier: DEFAULT_ENTRY_NAME$1 });
		} catch (e) {}
		for (const [instanceIdentifier, instanceDeferred] of this.instancesDeferred.entries()) {
			const normalizedIdentifier = this.normalizeInstanceIdentifier(instanceIdentifier);
			try {
				const instance = this.getOrInitializeService({ instanceIdentifier: normalizedIdentifier });
				instanceDeferred.resolve(instance);
			} catch (e) {}
		}
	}
	clearInstance(identifier = DEFAULT_ENTRY_NAME$1) {
		this.instancesDeferred.delete(identifier);
		this.instancesOptions.delete(identifier);
		this.instances.delete(identifier);
	}
	async delete() {
		const services = Array.from(this.instances.values());
		await Promise.all([...services.filter((service) => "INTERNAL" in service).map((service) => service.INTERNAL.delete()), ...services.filter((service) => "_delete" in service).map((service) => service._delete())]);
	}
	isComponentSet() {
		return this.component != null;
	}
	isInitialized(identifier = DEFAULT_ENTRY_NAME$1) {
		return this.instances.has(identifier);
	}
	getOptions(identifier = DEFAULT_ENTRY_NAME$1) {
		return this.instancesOptions.get(identifier) || {};
	}
	initialize(opts = {}) {
		const { options = {} } = opts;
		const normalizedIdentifier = this.normalizeInstanceIdentifier(opts.instanceIdentifier);
		if (this.isInitialized(normalizedIdentifier)) throw Error(`${this.name}(${normalizedIdentifier}) has already been initialized`);
		if (!this.isComponentSet()) throw Error(`Component ${this.name} has not been registered yet`);
		const instance = this.getOrInitializeService({
			instanceIdentifier: normalizedIdentifier,
			options
		});
		for (const [instanceIdentifier, instanceDeferred] of this.instancesDeferred.entries()) if (normalizedIdentifier === this.normalizeInstanceIdentifier(instanceIdentifier)) instanceDeferred.resolve(instance);
		return instance;
	}
	/**
	*
	* @param callback - a function that will be invoked  after the provider has been initialized by calling provider.initialize().
	* The function is invoked SYNCHRONOUSLY, so it should not execute any longrunning tasks in order to not block the program.
	*
	* @param identifier An optional instance identifier
	* @returns a function to unregister the callback
	*/
	onInit(callback, identifier) {
		var _a;
		const normalizedIdentifier = this.normalizeInstanceIdentifier(identifier);
		const existingCallbacks = (_a = this.onInitCallbacks.get(normalizedIdentifier)) !== null && _a !== void 0 ? _a : /* @__PURE__ */ new Set();
		existingCallbacks.add(callback);
		this.onInitCallbacks.set(normalizedIdentifier, existingCallbacks);
		const existingInstance = this.instances.get(normalizedIdentifier);
		if (existingInstance) callback(existingInstance, normalizedIdentifier);
		return () => {
			existingCallbacks.delete(callback);
		};
	}
	/**
	* Invoke onInit callbacks synchronously
	* @param instance the service instance`
	*/
	invokeOnInitCallbacks(instance, identifier) {
		const callbacks = this.onInitCallbacks.get(identifier);
		if (!callbacks) return;
		for (const callback of callbacks) try {
			callback(instance, identifier);
		} catch (_a) {}
	}
	getOrInitializeService({ instanceIdentifier, options = {} }) {
		let instance = this.instances.get(instanceIdentifier);
		if (!instance && this.component) {
			instance = this.component.instanceFactory(this.container, {
				instanceIdentifier: normalizeIdentifierForFactory(instanceIdentifier),
				options
			});
			this.instances.set(instanceIdentifier, instance);
			this.instancesOptions.set(instanceIdentifier, options);
			/**
			* Invoke onInit listeners.
			* Note this.component.onInstanceCreated is different, which is used by the component creator,
			* while onInit listeners are registered by consumers of the provider.
			*/
			this.invokeOnInitCallbacks(instance, instanceIdentifier);
			/**
			* Order is important
			* onInstanceCreated() should be called after this.instances.set(instanceIdentifier, instance); which
			* makes `isInitialized()` return true.
			*/
			if (this.component.onInstanceCreated) try {
				this.component.onInstanceCreated(this.container, instanceIdentifier, instance);
			} catch (_a) {}
		}
		return instance || null;
	}
	normalizeInstanceIdentifier(identifier = DEFAULT_ENTRY_NAME$1) {
		if (this.component) return this.component.multipleInstances ? identifier : DEFAULT_ENTRY_NAME$1;
		else return identifier;
	}
	shouldAutoInitialize() {
		return !!this.component && this.component.instantiationMode !== "EXPLICIT";
	}
};
function normalizeIdentifierForFactory(identifier) {
	return identifier === DEFAULT_ENTRY_NAME$1 ? void 0 : identifier;
}
function isComponentEager(component) {
	return component.instantiationMode === "EAGER";
}
/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
/**
* ComponentContainer that provides Providers for service name T, e.g. `auth`, `auth-internal`
*/
var ComponentContainer = class {
	constructor(name) {
		this.name = name;
		this.providers = /* @__PURE__ */ new Map();
	}
	/**
	*
	* @param component Component being added
	* @param overwrite When a component with the same name has already been registered,
	* if overwrite is true: overwrite the existing component with the new component and create a new
	* provider with the new component. It can be useful in tests where you want to use different mocks
	* for different tests.
	* if overwrite is false: throw an exception
	*/
	addComponent(component) {
		const provider = this.getProvider(component.name);
		if (provider.isComponentSet()) throw new Error(`Component ${component.name} has already been registered with ${this.name}`);
		provider.setComponent(component);
	}
	addOrOverwriteComponent(component) {
		if (this.getProvider(component.name).isComponentSet()) this.providers.delete(component.name);
		this.addComponent(component);
	}
	/**
	* getProvider provides a type safe interface where it can only be called with a field name
	* present in NameServiceMapping interface.
	*
	* Firebase SDKs providing services should extend NameServiceMapping interface to register
	* themselves.
	*/
	getProvider(name) {
		if (this.providers.has(name)) return this.providers.get(name);
		const provider = new Provider(name, this);
		this.providers.set(name, provider);
		return provider;
	}
	getProviders() {
		return Array.from(this.providers.values());
	}
};
//#endregion
//#region node_modules/.pnpm/@firebase+logger@0.4.4/node_modules/@firebase/logger/dist/esm/index.esm2017.js
/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
/**
* A container for all of the Logger instances
*/
var instances = [];
/**
* The JS SDK supports 5 log levels and also allows a user the ability to
* silence the logs altogether.
*
* The order is a follows:
* DEBUG < VERBOSE < INFO < WARN < ERROR
*
* All of the log types above the current log level will be captured (i.e. if
* you set the log level to `INFO`, errors will still be logged, but `DEBUG` and
* `VERBOSE` logs will not)
*/
var LogLevel;
(function(LogLevel) {
	LogLevel[LogLevel["DEBUG"] = 0] = "DEBUG";
	LogLevel[LogLevel["VERBOSE"] = 1] = "VERBOSE";
	LogLevel[LogLevel["INFO"] = 2] = "INFO";
	LogLevel[LogLevel["WARN"] = 3] = "WARN";
	LogLevel[LogLevel["ERROR"] = 4] = "ERROR";
	LogLevel[LogLevel["SILENT"] = 5] = "SILENT";
})(LogLevel || (LogLevel = {}));
var levelStringToEnum = {
	"debug": LogLevel.DEBUG,
	"verbose": LogLevel.VERBOSE,
	"info": LogLevel.INFO,
	"warn": LogLevel.WARN,
	"error": LogLevel.ERROR,
	"silent": LogLevel.SILENT
};
/**
* The default log level
*/
var defaultLogLevel = LogLevel.INFO;
/**
* By default, `console.debug` is not displayed in the developer console (in
* chrome). To avoid forcing users to have to opt-in to these logs twice
* (i.e. once for firebase, and once in the console), we are sending `DEBUG`
* logs to the `console.log` function.
*/
var ConsoleMethod = {
	[LogLevel.DEBUG]: "log",
	[LogLevel.VERBOSE]: "log",
	[LogLevel.INFO]: "info",
	[LogLevel.WARN]: "warn",
	[LogLevel.ERROR]: "error"
};
/**
* The default log handler will forward DEBUG, VERBOSE, INFO, WARN, and ERROR
* messages on to their corresponding console counterparts (if the log method
* is supported by the current log level)
*/
var defaultLogHandler = (instance, logType, ...args) => {
	if (logType < instance.logLevel) return;
	const now = (/* @__PURE__ */ new Date()).toISOString();
	const method = ConsoleMethod[logType];
	if (method) console[method](`[${now}]  ${instance.name}:`, ...args);
	else throw new Error(`Attempted to log a message with an invalid logType (value: ${logType})`);
};
var Logger = class {
	/**
	* Gives you an instance of a Logger to capture messages according to
	* Firebase's logging scheme.
	*
	* @param name The name that the logs will be associated with
	*/
	constructor(name) {
		this.name = name;
		/**
		* The log level of the given Logger instance.
		*/
		this._logLevel = defaultLogLevel;
		/**
		* The main (internal) log handler for the Logger instance.
		* Can be set to a new function in internal package code but not by user.
		*/
		this._logHandler = defaultLogHandler;
		/**
		* The optional, additional, user-defined log handler for the Logger instance.
		*/
		this._userLogHandler = null;
		/**
		* Capture the current instance for later use
		*/
		instances.push(this);
	}
	get logLevel() {
		return this._logLevel;
	}
	set logLevel(val) {
		if (!(val in LogLevel)) throw new TypeError(`Invalid value "${val}" assigned to \`logLevel\``);
		this._logLevel = val;
	}
	setLogLevel(val) {
		this._logLevel = typeof val === "string" ? levelStringToEnum[val] : val;
	}
	get logHandler() {
		return this._logHandler;
	}
	set logHandler(val) {
		if (typeof val !== "function") throw new TypeError("Value assigned to `logHandler` must be a function");
		this._logHandler = val;
	}
	get userLogHandler() {
		return this._userLogHandler;
	}
	set userLogHandler(val) {
		this._userLogHandler = val;
	}
	/**
	* The functions below are all based on the `console` interface
	*/
	debug(...args) {
		this._userLogHandler && this._userLogHandler(this, LogLevel.DEBUG, ...args);
		this._logHandler(this, LogLevel.DEBUG, ...args);
	}
	log(...args) {
		this._userLogHandler && this._userLogHandler(this, LogLevel.VERBOSE, ...args);
		this._logHandler(this, LogLevel.VERBOSE, ...args);
	}
	info(...args) {
		this._userLogHandler && this._userLogHandler(this, LogLevel.INFO, ...args);
		this._logHandler(this, LogLevel.INFO, ...args);
	}
	warn(...args) {
		this._userLogHandler && this._userLogHandler(this, LogLevel.WARN, ...args);
		this._logHandler(this, LogLevel.WARN, ...args);
	}
	error(...args) {
		this._userLogHandler && this._userLogHandler(this, LogLevel.ERROR, ...args);
		this._logHandler(this, LogLevel.ERROR, ...args);
	}
};
//#endregion
//#region node_modules/.pnpm/idb@7.1.1/node_modules/idb/build/wrap-idb-value.js
var instanceOfAny = (object, constructors) => constructors.some((c) => object instanceof c);
var idbProxyableTypes;
var cursorAdvanceMethods;
function getIdbProxyableTypes() {
	return idbProxyableTypes || (idbProxyableTypes = [
		IDBDatabase,
		IDBObjectStore,
		IDBIndex,
		IDBCursor,
		IDBTransaction
	]);
}
function getCursorAdvanceMethods() {
	return cursorAdvanceMethods || (cursorAdvanceMethods = [
		IDBCursor.prototype.advance,
		IDBCursor.prototype.continue,
		IDBCursor.prototype.continuePrimaryKey
	]);
}
var cursorRequestMap = /* @__PURE__ */ new WeakMap();
var transactionDoneMap = /* @__PURE__ */ new WeakMap();
var transactionStoreNamesMap = /* @__PURE__ */ new WeakMap();
var transformCache = /* @__PURE__ */ new WeakMap();
var reverseTransformCache = /* @__PURE__ */ new WeakMap();
function promisifyRequest(request) {
	const promise = new Promise((resolve, reject) => {
		const unlisten = () => {
			request.removeEventListener("success", success);
			request.removeEventListener("error", error);
		};
		const success = () => {
			resolve(wrap(request.result));
			unlisten();
		};
		const error = () => {
			reject(request.error);
			unlisten();
		};
		request.addEventListener("success", success);
		request.addEventListener("error", error);
	});
	promise.then((value) => {
		if (value instanceof IDBCursor) cursorRequestMap.set(value, request);
	}).catch(() => {});
	reverseTransformCache.set(promise, request);
	return promise;
}
function cacheDonePromiseForTransaction(tx) {
	if (transactionDoneMap.has(tx)) return;
	const done = new Promise((resolve, reject) => {
		const unlisten = () => {
			tx.removeEventListener("complete", complete);
			tx.removeEventListener("error", error);
			tx.removeEventListener("abort", error);
		};
		const complete = () => {
			resolve();
			unlisten();
		};
		const error = () => {
			reject(tx.error || new DOMException("AbortError", "AbortError"));
			unlisten();
		};
		tx.addEventListener("complete", complete);
		tx.addEventListener("error", error);
		tx.addEventListener("abort", error);
	});
	transactionDoneMap.set(tx, done);
}
var idbProxyTraps = {
	get(target, prop, receiver) {
		if (target instanceof IDBTransaction) {
			if (prop === "done") return transactionDoneMap.get(target);
			if (prop === "objectStoreNames") return target.objectStoreNames || transactionStoreNamesMap.get(target);
			if (prop === "store") return receiver.objectStoreNames[1] ? void 0 : receiver.objectStore(receiver.objectStoreNames[0]);
		}
		return wrap(target[prop]);
	},
	set(target, prop, value) {
		target[prop] = value;
		return true;
	},
	has(target, prop) {
		if (target instanceof IDBTransaction && (prop === "done" || prop === "store")) return true;
		return prop in target;
	}
};
function replaceTraps(callback) {
	idbProxyTraps = callback(idbProxyTraps);
}
function wrapFunction(func) {
	if (func === IDBDatabase.prototype.transaction && !("objectStoreNames" in IDBTransaction.prototype)) return function(storeNames, ...args) {
		const tx = func.call(unwrap(this), storeNames, ...args);
		transactionStoreNamesMap.set(tx, storeNames.sort ? storeNames.sort() : [storeNames]);
		return wrap(tx);
	};
	if (getCursorAdvanceMethods().includes(func)) return function(...args) {
		func.apply(unwrap(this), args);
		return wrap(cursorRequestMap.get(this));
	};
	return function(...args) {
		return wrap(func.apply(unwrap(this), args));
	};
}
function transformCachableValue(value) {
	if (typeof value === "function") return wrapFunction(value);
	if (value instanceof IDBTransaction) cacheDonePromiseForTransaction(value);
	if (instanceOfAny(value, getIdbProxyableTypes())) return new Proxy(value, idbProxyTraps);
	return value;
}
function wrap(value) {
	if (value instanceof IDBRequest) return promisifyRequest(value);
	if (transformCache.has(value)) return transformCache.get(value);
	const newValue = transformCachableValue(value);
	if (newValue !== value) {
		transformCache.set(value, newValue);
		reverseTransformCache.set(newValue, value);
	}
	return newValue;
}
var unwrap = (value) => reverseTransformCache.get(value);
//#endregion
//#region node_modules/.pnpm/idb@7.1.1/node_modules/idb/build/index.js
/**
* Open a database.
*
* @param name Name of the database.
* @param version Schema version.
* @param callbacks Additional callbacks.
*/
function openDB(name, version, { blocked, upgrade, blocking, terminated } = {}) {
	const request = indexedDB.open(name, version);
	const openPromise = wrap(request);
	if (upgrade) request.addEventListener("upgradeneeded", (event) => {
		upgrade(wrap(request.result), event.oldVersion, event.newVersion, wrap(request.transaction), event);
	});
	if (blocked) request.addEventListener("blocked", (event) => blocked(event.oldVersion, event.newVersion, event));
	openPromise.then((db) => {
		if (terminated) db.addEventListener("close", () => terminated());
		if (blocking) db.addEventListener("versionchange", (event) => blocking(event.oldVersion, event.newVersion, event));
	}).catch(() => {});
	return openPromise;
}
var readMethods = [
	"get",
	"getKey",
	"getAll",
	"getAllKeys",
	"count"
];
var writeMethods = [
	"put",
	"add",
	"delete",
	"clear"
];
var cachedMethods = /* @__PURE__ */ new Map();
function getMethod(target, prop) {
	if (!(target instanceof IDBDatabase && !(prop in target) && typeof prop === "string")) return;
	if (cachedMethods.get(prop)) return cachedMethods.get(prop);
	const targetFuncName = prop.replace(/FromIndex$/, "");
	const useIndex = prop !== targetFuncName;
	const isWrite = writeMethods.includes(targetFuncName);
	if (!(targetFuncName in (useIndex ? IDBIndex : IDBObjectStore).prototype) || !(isWrite || readMethods.includes(targetFuncName))) return;
	const method = async function(storeName, ...args) {
		const tx = this.transaction(storeName, isWrite ? "readwrite" : "readonly");
		let target = tx.store;
		if (useIndex) target = target.index(args.shift());
		return (await Promise.all([target[targetFuncName](...args), isWrite && tx.done]))[0];
	};
	cachedMethods.set(prop, method);
	return method;
}
replaceTraps((oldTraps) => ({
	...oldTraps,
	get: (target, prop, receiver) => getMethod(target, prop) || oldTraps.get(target, prop, receiver),
	has: (target, prop) => !!getMethod(target, prop) || oldTraps.has(target, prop)
}));
//#endregion
//#region node_modules/.pnpm/@firebase+app@0.13.2/node_modules/@firebase/app/dist/esm/index.esm2017.js
/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var PlatformLoggerServiceImpl = class {
	constructor(container) {
		this.container = container;
	}
	getPlatformInfoString() {
		return this.container.getProviders().map((provider) => {
			if (isVersionServiceProvider(provider)) {
				const service = provider.getImmediate();
				return `${service.library}/${service.version}`;
			} else return null;
		}).filter((logString) => logString).join(" ");
	}
};
/**
*
* @param provider check if this provider provides a VersionService
*
* NOTE: Using Provider<'app-version'> is a hack to indicate that the provider
* provides VersionService. The provider is not necessarily a 'app-version'
* provider.
*/
function isVersionServiceProvider(provider) {
	const component = provider.getComponent();
	return (component === null || component === void 0 ? void 0 : component.type) === "VERSION";
}
var name$q = "@firebase/app";
var version$1 = "0.13.2";
/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var logger = new Logger("@firebase/app");
var name$p = "@firebase/app-compat";
var name$o = "@firebase/analytics-compat";
var name$n = "@firebase/analytics";
var name$m = "@firebase/app-check-compat";
var name$l = "@firebase/app-check";
var name$k = "@firebase/auth";
var name$j = "@firebase/auth-compat";
var name$i = "@firebase/database";
var name$h = "@firebase/data-connect";
var name$g = "@firebase/database-compat";
var name$f = "@firebase/functions";
var name$e = "@firebase/functions-compat";
var name$d = "@firebase/installations";
var name$c = "@firebase/installations-compat";
var name$b = "@firebase/messaging";
var name$a = "@firebase/messaging-compat";
var name$9 = "@firebase/performance";
var name$8 = "@firebase/performance-compat";
var name$7 = "@firebase/remote-config";
var name$6 = "@firebase/remote-config-compat";
var name$5 = "@firebase/storage";
var name$4 = "@firebase/storage-compat";
var name$3 = "@firebase/firestore";
var name$2 = "@firebase/ai";
var name$1 = "@firebase/firestore-compat";
var name$10 = "firebase";
var version$2 = "11.10.0";
/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
/**
* The default app name
*
* @internal
*/
var DEFAULT_ENTRY_NAME = "[DEFAULT]";
var PLATFORM_LOG_STRING = {
	[name$q]: "fire-core",
	[name$p]: "fire-core-compat",
	[name$n]: "fire-analytics",
	[name$o]: "fire-analytics-compat",
	[name$l]: "fire-app-check",
	[name$m]: "fire-app-check-compat",
	[name$k]: "fire-auth",
	[name$j]: "fire-auth-compat",
	[name$i]: "fire-rtdb",
	[name$h]: "fire-data-connect",
	[name$g]: "fire-rtdb-compat",
	[name$f]: "fire-fn",
	[name$e]: "fire-fn-compat",
	[name$d]: "fire-iid",
	[name$c]: "fire-iid-compat",
	[name$b]: "fire-fcm",
	[name$a]: "fire-fcm-compat",
	[name$9]: "fire-perf",
	[name$8]: "fire-perf-compat",
	[name$7]: "fire-rc",
	[name$6]: "fire-rc-compat",
	[name$5]: "fire-gcs",
	[name$4]: "fire-gcs-compat",
	[name$3]: "fire-fst",
	[name$1]: "fire-fst-compat",
	[name$2]: "fire-vertex",
	"fire-js": "fire-js",
	[name$10]: "fire-js-all"
};
/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
/**
* @internal
*/
var _apps = /* @__PURE__ */ new Map();
/**
* @internal
*/
var _serverApps = /* @__PURE__ */ new Map();
/**
* Registered components.
*
* @internal
*/
var _components = /* @__PURE__ */ new Map();
/**
* @param component - the component being added to this app's container
*
* @internal
*/
function _addComponent(app, component) {
	try {
		app.container.addComponent(component);
	} catch (e) {
		logger.debug(`Component ${component.name} failed to register with FirebaseApp ${app.name}`, e);
	}
}
/**
*
* @param component - the component to register
* @returns whether or not the component is registered successfully
*
* @internal
*/
function _registerComponent(component) {
	const componentName = component.name;
	if (_components.has(componentName)) {
		logger.debug(`There were multiple attempts to register component ${componentName}.`);
		return false;
	}
	_components.set(componentName, component);
	for (const app of _apps.values()) _addComponent(app, component);
	for (const serverApp of _serverApps.values()) _addComponent(serverApp, component);
	return true;
}
/**
*
* @param app - FirebaseApp instance
* @param name - service name
*
* @returns the provider for the service with the matching name
*
* @internal
*/
function _getProvider(app, name) {
	const heartbeatController = app.container.getProvider("heartbeat").getImmediate({ optional: true });
	if (heartbeatController) heartbeatController.triggerHeartbeat();
	return app.container.getProvider(name);
}
/**
*
* @param obj - an object of type FirebaseApp.
*
* @returns true if the provided object is of type FirebaseServerAppImpl.
*
* @internal
*/
function _isFirebaseServerApp(obj) {
	if (obj === null || obj === void 0) return false;
	return obj.settings !== void 0;
}
/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var ERROR_FACTORY = new ErrorFactory("app", "Firebase", {
	["no-app"]: "No Firebase App '{$appName}' has been created - call initializeApp() first",
	["bad-app-name"]: "Illegal App name: '{$appName}'",
	["duplicate-app"]: "Firebase App named '{$appName}' already exists with different options or config",
	["app-deleted"]: "Firebase App named '{$appName}' already deleted",
	["server-app-deleted"]: "Firebase Server App has been deleted",
	["no-options"]: "Need to provide options, when not being deployed to hosting via source.",
	["invalid-app-argument"]: "firebase.{$appName}() takes either no argument or a Firebase App instance.",
	["invalid-log-argument"]: "First argument to `onLog` must be null or a function.",
	["idb-open"]: "Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.",
	["idb-get"]: "Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.",
	["idb-set"]: "Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.",
	["idb-delete"]: "Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.",
	["finalization-registry-not-supported"]: "FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.",
	["invalid-server-app-environment"]: "FirebaseServerApp is not for use in browser environments."
});
/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var FirebaseAppImpl = class {
	constructor(options, config, container) {
		this._isDeleted = false;
		this._options = Object.assign({}, options);
		this._config = Object.assign({}, config);
		this._name = config.name;
		this._automaticDataCollectionEnabled = config.automaticDataCollectionEnabled;
		this._container = container;
		this.container.addComponent(new Component("app", () => this, "PUBLIC"));
	}
	get automaticDataCollectionEnabled() {
		this.checkDestroyed();
		return this._automaticDataCollectionEnabled;
	}
	set automaticDataCollectionEnabled(val) {
		this.checkDestroyed();
		this._automaticDataCollectionEnabled = val;
	}
	get name() {
		this.checkDestroyed();
		return this._name;
	}
	get options() {
		this.checkDestroyed();
		return this._options;
	}
	get config() {
		this.checkDestroyed();
		return this._config;
	}
	get container() {
		return this._container;
	}
	get isDeleted() {
		return this._isDeleted;
	}
	set isDeleted(val) {
		this._isDeleted = val;
	}
	/**
	* This function will throw an Error if the App has already been deleted -
	* use before performing API actions on the App.
	*/
	checkDestroyed() {
		if (this.isDeleted) throw ERROR_FACTORY.create("app-deleted", { appName: this._name });
	}
};
/**
* @license
* Copyright 2023 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
/**
* The current SDK version.
*
* @public
*/
var SDK_VERSION = version$2;
function initializeApp(_options, rawConfig = {}) {
	let options = _options;
	if (typeof rawConfig !== "object") rawConfig = { name: rawConfig };
	const config = Object.assign({
		name: DEFAULT_ENTRY_NAME,
		automaticDataCollectionEnabled: true
	}, rawConfig);
	const name = config.name;
	if (typeof name !== "string" || !name) throw ERROR_FACTORY.create("bad-app-name", { appName: String(name) });
	options || (options = getDefaultAppConfig());
	if (!options) throw ERROR_FACTORY.create("no-options");
	const existingApp = _apps.get(name);
	if (existingApp) {
		if (deepEqual(options, existingApp.options) && deepEqual(config, existingApp.config)) return existingApp;
		else throw ERROR_FACTORY.create("duplicate-app", { appName: name });
	}
	const container = new ComponentContainer(name);
	for (const component of _components.values()) container.addComponent(component);
	const newApp = new FirebaseAppImpl(options, config, container);
	_apps.set(name, newApp);
	return newApp;
}
/**
* Retrieves a {@link @firebase/app#FirebaseApp} instance.
*
* When called with no arguments, the default app is returned. When an app name
* is provided, the app corresponding to that name is returned.
*
* An exception is thrown if the app being retrieved has not yet been
* initialized.
*
* @example
* ```javascript
* // Return the default app
* const app = getApp();
* ```
*
* @example
* ```javascript
* // Return a named app
* const otherApp = getApp("otherApp");
* ```
*
* @param name - Optional name of the app to return. If no name is
*   provided, the default is `"[DEFAULT]"`.
*
* @returns The app corresponding to the provided app name.
*   If no app name is provided, the default app is returned.
*
* @public
*/
function getApp(name = DEFAULT_ENTRY_NAME) {
	const app = _apps.get(name);
	if (!app && name === "[DEFAULT]" && getDefaultAppConfig()) return initializeApp();
	if (!app) throw ERROR_FACTORY.create("no-app", { appName: name });
	return app;
}
/**
* A (read-only) array of all initialized apps.
* @public
*/
function getApps() {
	return Array.from(_apps.values());
}
/**
* Registers a library's name and version for platform logging purposes.
* @param library - Name of 1p or 3p library (e.g. firestore, angularfire)
* @param version - Current version of that library.
* @param variant - Bundle variant, e.g., node, rn, etc.
*
* @public
*/
function registerVersion(libraryKeyOrName, version, variant) {
	var _a;
	let library = (_a = PLATFORM_LOG_STRING[libraryKeyOrName]) !== null && _a !== void 0 ? _a : libraryKeyOrName;
	if (variant) library += `-${variant}`;
	const libraryMismatch = library.match(/\s|\//);
	const versionMismatch = version.match(/\s|\//);
	if (libraryMismatch || versionMismatch) {
		const warning = [`Unable to register library "${library}" with version "${version}":`];
		if (libraryMismatch) warning.push(`library name "${library}" contains illegal characters (whitespace or "/")`);
		if (libraryMismatch && versionMismatch) warning.push("and");
		if (versionMismatch) warning.push(`version name "${version}" contains illegal characters (whitespace or "/")`);
		logger.warn(warning.join(" "));
		return;
	}
	_registerComponent(new Component(`${library}-version`, () => ({
		library,
		version
	}), "VERSION"));
}
/**
* @license
* Copyright 2021 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var DB_NAME$1 = "firebase-heartbeat-database";
var DB_VERSION$1 = 1;
var STORE_NAME = "firebase-heartbeat-store";
var dbPromise = null;
function getDbPromise() {
	if (!dbPromise) dbPromise = openDB(DB_NAME$1, DB_VERSION$1, { upgrade: (db, oldVersion) => {
		switch (oldVersion) {
			case 0: try {
				db.createObjectStore(STORE_NAME);
			} catch (e) {
				console.warn(e);
			}
		}
	} }).catch((e) => {
		throw ERROR_FACTORY.create("idb-open", { originalErrorMessage: e.message });
	});
	return dbPromise;
}
async function readHeartbeatsFromIndexedDB(app) {
	try {
		const tx = (await getDbPromise()).transaction(STORE_NAME);
		const result = await tx.objectStore(STORE_NAME).get(computeKey(app));
		await tx.done;
		return result;
	} catch (e) {
		if (e instanceof FirebaseError) logger.warn(e.message);
		else {
			const idbGetError = ERROR_FACTORY.create("idb-get", { originalErrorMessage: e === null || e === void 0 ? void 0 : e.message });
			logger.warn(idbGetError.message);
		}
	}
}
async function writeHeartbeatsToIndexedDB(app, heartbeatObject) {
	try {
		const tx = (await getDbPromise()).transaction(STORE_NAME, "readwrite");
		await tx.objectStore(STORE_NAME).put(heartbeatObject, computeKey(app));
		await tx.done;
	} catch (e) {
		if (e instanceof FirebaseError) logger.warn(e.message);
		else {
			const idbGetError = ERROR_FACTORY.create("idb-set", { originalErrorMessage: e === null || e === void 0 ? void 0 : e.message });
			logger.warn(idbGetError.message);
		}
	}
}
function computeKey(app) {
	return `${app.name}!${app.options.appId}`;
}
/**
* @license
* Copyright 2021 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var MAX_HEADER_BYTES = 1024;
var MAX_NUM_STORED_HEARTBEATS = 30;
var HeartbeatServiceImpl = class {
	constructor(container) {
		this.container = container;
		/**
		* In-memory cache for heartbeats, used by getHeartbeatsHeader() to generate
		* the header string.
		* Stores one record per date. This will be consolidated into the standard
		* format of one record per user agent string before being sent as a header.
		* Populated from indexedDB when the controller is instantiated and should
		* be kept in sync with indexedDB.
		* Leave public for easier testing.
		*/
		this._heartbeatsCache = null;
		const app = this.container.getProvider("app").getImmediate();
		this._storage = new HeartbeatStorageImpl(app);
		this._heartbeatsCachePromise = this._storage.read().then((result) => {
			this._heartbeatsCache = result;
			return result;
		});
	}
	/**
	* Called to report a heartbeat. The function will generate
	* a HeartbeatsByUserAgent object, update heartbeatsCache, and persist it
	* to IndexedDB.
	* Note that we only store one heartbeat per day. So if a heartbeat for today is
	* already logged, subsequent calls to this function in the same day will be ignored.
	*/
	async triggerHeartbeat() {
		var _a;
		var _b;
		try {
			const agent = this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString();
			const date = getUTCDateString();
			if (((_a = this._heartbeatsCache) === null || _a === void 0 ? void 0 : _a.heartbeats) == null) {
				this._heartbeatsCache = await this._heartbeatsCachePromise;
				if (((_b = this._heartbeatsCache) === null || _b === void 0 ? void 0 : _b.heartbeats) == null) return;
			}
			if (this._heartbeatsCache.lastSentHeartbeatDate === date || this._heartbeatsCache.heartbeats.some((singleDateHeartbeat) => singleDateHeartbeat.date === date)) return;
			else {
				this._heartbeatsCache.heartbeats.push({
					date,
					agent
				});
				if (this._heartbeatsCache.heartbeats.length > MAX_NUM_STORED_HEARTBEATS) {
					const earliestHeartbeatIdx = getEarliestHeartbeatIdx(this._heartbeatsCache.heartbeats);
					this._heartbeatsCache.heartbeats.splice(earliestHeartbeatIdx, 1);
				}
			}
			return this._storage.overwrite(this._heartbeatsCache);
		} catch (e) {
			logger.warn(e);
		}
	}
	/**
	* Returns a base64 encoded string which can be attached to the heartbeat-specific header directly.
	* It also clears all heartbeats from memory as well as in IndexedDB.
	*
	* NOTE: Consuming product SDKs should not send the header if this method
	* returns an empty string.
	*/
	async getHeartbeatsHeader() {
		var _a;
		try {
			if (this._heartbeatsCache === null) await this._heartbeatsCachePromise;
			if (((_a = this._heartbeatsCache) === null || _a === void 0 ? void 0 : _a.heartbeats) == null || this._heartbeatsCache.heartbeats.length === 0) return "";
			const date = getUTCDateString();
			const { heartbeatsToSend, unsentEntries } = extractHeartbeatsForHeader(this._heartbeatsCache.heartbeats);
			const headerString = base64urlEncodeWithoutPadding(JSON.stringify({
				version: 2,
				heartbeats: heartbeatsToSend
			}));
			this._heartbeatsCache.lastSentHeartbeatDate = date;
			if (unsentEntries.length > 0) {
				this._heartbeatsCache.heartbeats = unsentEntries;
				await this._storage.overwrite(this._heartbeatsCache);
			} else {
				this._heartbeatsCache.heartbeats = [];
				this._storage.overwrite(this._heartbeatsCache);
			}
			return headerString;
		} catch (e) {
			logger.warn(e);
			return "";
		}
	}
};
function getUTCDateString() {
	return (/* @__PURE__ */ new Date()).toISOString().substring(0, 10);
}
function extractHeartbeatsForHeader(heartbeatsCache, maxSize = MAX_HEADER_BYTES) {
	const heartbeatsToSend = [];
	let unsentEntries = heartbeatsCache.slice();
	for (const singleDateHeartbeat of heartbeatsCache) {
		const heartbeatEntry = heartbeatsToSend.find((hb) => hb.agent === singleDateHeartbeat.agent);
		if (!heartbeatEntry) {
			heartbeatsToSend.push({
				agent: singleDateHeartbeat.agent,
				dates: [singleDateHeartbeat.date]
			});
			if (countBytes(heartbeatsToSend) > maxSize) {
				heartbeatsToSend.pop();
				break;
			}
		} else {
			heartbeatEntry.dates.push(singleDateHeartbeat.date);
			if (countBytes(heartbeatsToSend) > maxSize) {
				heartbeatEntry.dates.pop();
				break;
			}
		}
		unsentEntries = unsentEntries.slice(1);
	}
	return {
		heartbeatsToSend,
		unsentEntries
	};
}
var HeartbeatStorageImpl = class {
	constructor(app) {
		this.app = app;
		this._canUseIndexedDBPromise = this.runIndexedDBEnvironmentCheck();
	}
	async runIndexedDBEnvironmentCheck() {
		if (!isIndexedDBAvailable()) return false;
		else return validateIndexedDBOpenable().then(() => true).catch(() => false);
	}
	/**
	* Read all heartbeats.
	*/
	async read() {
		if (!await this._canUseIndexedDBPromise) return { heartbeats: [] };
		else {
			const idbHeartbeatObject = await readHeartbeatsFromIndexedDB(this.app);
			if (idbHeartbeatObject === null || idbHeartbeatObject === void 0 ? void 0 : idbHeartbeatObject.heartbeats) return idbHeartbeatObject;
			else return { heartbeats: [] };
		}
	}
	async overwrite(heartbeatsObject) {
		var _a;
		if (!await this._canUseIndexedDBPromise) return;
		else {
			const existingHeartbeatsObject = await this.read();
			return writeHeartbeatsToIndexedDB(this.app, {
				lastSentHeartbeatDate: (_a = heartbeatsObject.lastSentHeartbeatDate) !== null && _a !== void 0 ? _a : existingHeartbeatsObject.lastSentHeartbeatDate,
				heartbeats: heartbeatsObject.heartbeats
			});
		}
	}
	async add(heartbeatsObject) {
		var _a;
		if (!await this._canUseIndexedDBPromise) return;
		else {
			const existingHeartbeatsObject = await this.read();
			return writeHeartbeatsToIndexedDB(this.app, {
				lastSentHeartbeatDate: (_a = heartbeatsObject.lastSentHeartbeatDate) !== null && _a !== void 0 ? _a : existingHeartbeatsObject.lastSentHeartbeatDate,
				heartbeats: [...existingHeartbeatsObject.heartbeats, ...heartbeatsObject.heartbeats]
			});
		}
	}
};
/**
* Calculate bytes of a HeartbeatsByUserAgent array after being wrapped
* in a platform logging header JSON object, stringified, and converted
* to base 64.
*/
function countBytes(heartbeatsCache) {
	return base64urlEncodeWithoutPadding(JSON.stringify({
		version: 2,
		heartbeats: heartbeatsCache
	})).length;
}
/**
* Returns the index of the heartbeat with the earliest date.
* If the heartbeats array is empty, -1 is returned.
*/
function getEarliestHeartbeatIdx(heartbeats) {
	if (heartbeats.length === 0) return -1;
	let earliestHeartbeatIdx = 0;
	let earliestHeartbeatDate = heartbeats[0].date;
	for (let i = 1; i < heartbeats.length; i++) if (heartbeats[i].date < earliestHeartbeatDate) {
		earliestHeartbeatDate = heartbeats[i].date;
		earliestHeartbeatIdx = i;
	}
	return earliestHeartbeatIdx;
}
/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
function registerCoreComponents(variant) {
	_registerComponent(new Component("platform-logger", (container) => new PlatformLoggerServiceImpl(container), "PRIVATE"));
	_registerComponent(new Component("heartbeat", (container) => new HeartbeatServiceImpl(container), "PRIVATE"));
	registerVersion(name$q, version$1, variant);
	registerVersion(name$q, version$1, "esm2017");
	registerVersion("fire-js", "");
}
/**
* Firebase App
*
* @remarks This package coordinates the communication between the different Firebase components
* @packageDocumentation
*/
registerCoreComponents("");
//#endregion
//#region node_modules/.pnpm/tslib@2.8.1/node_modules/tslib/tslib.es6.mjs
function __rest(s, e) {
	var t = {};
	for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
	if (s != null && typeof Object.getOwnPropertySymbols === "function") {
		for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
	}
	return t;
}
//#endregion
//#region node_modules/.pnpm/@firebase+auth@1.10.8_@firebase+app@0.13.2/node_modules/@firebase/auth/dist/esm2017/index-35c79a8a.js
/**
* @license
* Copyright 2021 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
function _prodErrorMap() {
	return { ["dependent-sdk-initialized-before-auth"]: "Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK." };
}
/**
* A minimal error map with all verbose error messages stripped.
*
* See discussion at {@link AuthErrorMap}
*
* @public
*/
var prodErrorMap = _prodErrorMap;
var _DEFAULT_AUTH_ERROR_FACTORY = new ErrorFactory("auth", "Firebase", _prodErrorMap());
/**
* A map of potential `Auth` error codes, for easier comparison with errors
* thrown by the SDK.
*
* @remarks
* Note that you can't tree-shake individual keys
* in the map, so by using the map you might substantially increase your
* bundle size.
*
* @public
*/
var AUTH_ERROR_CODES_MAP_DO_NOT_USE_INTERNALLY = {
	ADMIN_ONLY_OPERATION: "auth/admin-restricted-operation",
	ARGUMENT_ERROR: "auth/argument-error",
	APP_NOT_AUTHORIZED: "auth/app-not-authorized",
	APP_NOT_INSTALLED: "auth/app-not-installed",
	CAPTCHA_CHECK_FAILED: "auth/captcha-check-failed",
	CODE_EXPIRED: "auth/code-expired",
	CORDOVA_NOT_READY: "auth/cordova-not-ready",
	CORS_UNSUPPORTED: "auth/cors-unsupported",
	CREDENTIAL_ALREADY_IN_USE: "auth/credential-already-in-use",
	CREDENTIAL_MISMATCH: "auth/custom-token-mismatch",
	CREDENTIAL_TOO_OLD_LOGIN_AGAIN: "auth/requires-recent-login",
	DEPENDENT_SDK_INIT_BEFORE_AUTH: "auth/dependent-sdk-initialized-before-auth",
	DYNAMIC_LINK_NOT_ACTIVATED: "auth/dynamic-link-not-activated",
	EMAIL_CHANGE_NEEDS_VERIFICATION: "auth/email-change-needs-verification",
	EMAIL_EXISTS: "auth/email-already-in-use",
	EMULATOR_CONFIG_FAILED: "auth/emulator-config-failed",
	EXPIRED_OOB_CODE: "auth/expired-action-code",
	EXPIRED_POPUP_REQUEST: "auth/cancelled-popup-request",
	INTERNAL_ERROR: "auth/internal-error",
	INVALID_API_KEY: "auth/invalid-api-key",
	INVALID_APP_CREDENTIAL: "auth/invalid-app-credential",
	INVALID_APP_ID: "auth/invalid-app-id",
	INVALID_AUTH: "auth/invalid-user-token",
	INVALID_AUTH_EVENT: "auth/invalid-auth-event",
	INVALID_CERT_HASH: "auth/invalid-cert-hash",
	INVALID_CODE: "auth/invalid-verification-code",
	INVALID_CONTINUE_URI: "auth/invalid-continue-uri",
	INVALID_CORDOVA_CONFIGURATION: "auth/invalid-cordova-configuration",
	INVALID_CUSTOM_TOKEN: "auth/invalid-custom-token",
	INVALID_DYNAMIC_LINK_DOMAIN: "auth/invalid-dynamic-link-domain",
	INVALID_EMAIL: "auth/invalid-email",
	INVALID_EMULATOR_SCHEME: "auth/invalid-emulator-scheme",
	INVALID_IDP_RESPONSE: "auth/invalid-credential",
	INVALID_LOGIN_CREDENTIALS: "auth/invalid-credential",
	INVALID_MESSAGE_PAYLOAD: "auth/invalid-message-payload",
	INVALID_MFA_SESSION: "auth/invalid-multi-factor-session",
	INVALID_OAUTH_CLIENT_ID: "auth/invalid-oauth-client-id",
	INVALID_OAUTH_PROVIDER: "auth/invalid-oauth-provider",
	INVALID_OOB_CODE: "auth/invalid-action-code",
	INVALID_ORIGIN: "auth/unauthorized-domain",
	INVALID_PASSWORD: "auth/wrong-password",
	INVALID_PERSISTENCE: "auth/invalid-persistence-type",
	INVALID_PHONE_NUMBER: "auth/invalid-phone-number",
	INVALID_PROVIDER_ID: "auth/invalid-provider-id",
	INVALID_RECIPIENT_EMAIL: "auth/invalid-recipient-email",
	INVALID_SENDER: "auth/invalid-sender",
	INVALID_SESSION_INFO: "auth/invalid-verification-id",
	INVALID_TENANT_ID: "auth/invalid-tenant-id",
	MFA_INFO_NOT_FOUND: "auth/multi-factor-info-not-found",
	MFA_REQUIRED: "auth/multi-factor-auth-required",
	MISSING_ANDROID_PACKAGE_NAME: "auth/missing-android-pkg-name",
	MISSING_APP_CREDENTIAL: "auth/missing-app-credential",
	MISSING_AUTH_DOMAIN: "auth/auth-domain-config-required",
	MISSING_CODE: "auth/missing-verification-code",
	MISSING_CONTINUE_URI: "auth/missing-continue-uri",
	MISSING_IFRAME_START: "auth/missing-iframe-start",
	MISSING_IOS_BUNDLE_ID: "auth/missing-ios-bundle-id",
	MISSING_OR_INVALID_NONCE: "auth/missing-or-invalid-nonce",
	MISSING_MFA_INFO: "auth/missing-multi-factor-info",
	MISSING_MFA_SESSION: "auth/missing-multi-factor-session",
	MISSING_PHONE_NUMBER: "auth/missing-phone-number",
	MISSING_SESSION_INFO: "auth/missing-verification-id",
	MODULE_DESTROYED: "auth/app-deleted",
	NEED_CONFIRMATION: "auth/account-exists-with-different-credential",
	NETWORK_REQUEST_FAILED: "auth/network-request-failed",
	NULL_USER: "auth/null-user",
	NO_AUTH_EVENT: "auth/no-auth-event",
	NO_SUCH_PROVIDER: "auth/no-such-provider",
	OPERATION_NOT_ALLOWED: "auth/operation-not-allowed",
	OPERATION_NOT_SUPPORTED: "auth/operation-not-supported-in-this-environment",
	POPUP_BLOCKED: "auth/popup-blocked",
	POPUP_CLOSED_BY_USER: "auth/popup-closed-by-user",
	PROVIDER_ALREADY_LINKED: "auth/provider-already-linked",
	QUOTA_EXCEEDED: "auth/quota-exceeded",
	REDIRECT_CANCELLED_BY_USER: "auth/redirect-cancelled-by-user",
	REDIRECT_OPERATION_PENDING: "auth/redirect-operation-pending",
	REJECTED_CREDENTIAL: "auth/rejected-credential",
	SECOND_FACTOR_ALREADY_ENROLLED: "auth/second-factor-already-in-use",
	SECOND_FACTOR_LIMIT_EXCEEDED: "auth/maximum-second-factor-count-exceeded",
	TENANT_ID_MISMATCH: "auth/tenant-id-mismatch",
	TIMEOUT: "auth/timeout",
	TOKEN_EXPIRED: "auth/user-token-expired",
	TOO_MANY_ATTEMPTS_TRY_LATER: "auth/too-many-requests",
	UNAUTHORIZED_DOMAIN: "auth/unauthorized-continue-uri",
	UNSUPPORTED_FIRST_FACTOR: "auth/unsupported-first-factor",
	UNSUPPORTED_PERSISTENCE: "auth/unsupported-persistence-type",
	UNSUPPORTED_TENANT_OPERATION: "auth/unsupported-tenant-operation",
	UNVERIFIED_EMAIL: "auth/unverified-email",
	USER_CANCELLED: "auth/user-cancelled",
	USER_DELETED: "auth/user-not-found",
	USER_DISABLED: "auth/user-disabled",
	USER_MISMATCH: "auth/user-mismatch",
	USER_SIGNED_OUT: "auth/user-signed-out",
	WEAK_PASSWORD: "auth/weak-password",
	WEB_STORAGE_UNSUPPORTED: "auth/web-storage-unsupported",
	ALREADY_INITIALIZED: "auth/already-initialized",
	RECAPTCHA_NOT_ENABLED: "auth/recaptcha-not-enabled",
	MISSING_RECAPTCHA_TOKEN: "auth/missing-recaptcha-token",
	INVALID_RECAPTCHA_TOKEN: "auth/invalid-recaptcha-token",
	INVALID_RECAPTCHA_ACTION: "auth/invalid-recaptcha-action",
	MISSING_CLIENT_TYPE: "auth/missing-client-type",
	MISSING_RECAPTCHA_VERSION: "auth/missing-recaptcha-version",
	INVALID_RECAPTCHA_VERSION: "auth/invalid-recaptcha-version",
	INVALID_REQ_TYPE: "auth/invalid-req-type",
	INVALID_HOSTING_LINK_DOMAIN: "auth/invalid-hosting-link-domain"
};
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var logClient = new Logger("@firebase/auth");
function _logWarn(msg, ...args) {
	if (logClient.logLevel <= LogLevel.WARN) logClient.warn(`Auth (${SDK_VERSION}): ${msg}`, ...args);
}
function _logError(msg, ...args) {
	if (logClient.logLevel <= LogLevel.ERROR) logClient.error(`Auth (${SDK_VERSION}): ${msg}`, ...args);
}
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
function _fail(authOrCode, ...rest) {
	throw createErrorInternal(authOrCode, ...rest);
}
function _createError(authOrCode, ...rest) {
	return createErrorInternal(authOrCode, ...rest);
}
function _errorWithCustomMessage(auth, code, message) {
	return new ErrorFactory("auth", "Firebase", Object.assign(Object.assign({}, prodErrorMap()), { [code]: message })).create(code, { appName: auth.name });
}
function _serverAppCurrentUserOperationNotSupportedError(auth) {
	return _errorWithCustomMessage(auth, "operation-not-supported-in-this-environment", "Operations that alter the current user are not supported in conjunction with FirebaseServerApp");
}
function _assertInstanceOf(auth, object, instance) {
	const constructorInstance = instance;
	if (!(object instanceof constructorInstance)) {
		if (constructorInstance.name !== object.constructor.name) _fail(auth, "argument-error");
		throw _errorWithCustomMessage(auth, "argument-error", `Type of ${object.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`);
	}
}
function createErrorInternal(authOrCode, ...rest) {
	if (typeof authOrCode !== "string") {
		const code = rest[0];
		const fullParams = [...rest.slice(1)];
		if (fullParams[0]) fullParams[0].appName = authOrCode.name;
		return authOrCode._errorFactory.create(code, ...fullParams);
	}
	return _DEFAULT_AUTH_ERROR_FACTORY.create(authOrCode, ...rest);
}
function _assert(assertion, authOrCode, ...rest) {
	if (!assertion) throw createErrorInternal(authOrCode, ...rest);
}
/**
* Unconditionally fails, throwing an internal error with the given message.
*
* @param failure type of failure encountered
* @throws Error
*/
function debugFail(failure) {
	const message = `INTERNAL ASSERTION FAILED: ` + failure;
	_logError(message);
	throw new Error(message);
}
/**
* Fails if the given assertion condition is false, throwing an Error with the
* given message if it did.
*
* @param assertion
* @param message
*/
function debugAssert(assertion, message) {
	if (!assertion) debugFail(message);
}
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
function _getCurrentUrl() {
	var _a;
	return typeof self !== "undefined" && ((_a = self.location) === null || _a === void 0 ? void 0 : _a.href) || "";
}
function _isHttpOrHttps() {
	return _getCurrentScheme() === "http:" || _getCurrentScheme() === "https:";
}
function _getCurrentScheme() {
	var _a;
	return typeof self !== "undefined" && ((_a = self.location) === null || _a === void 0 ? void 0 : _a.protocol) || null;
}
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
/**
* Determine whether the browser is working online
*/
function _isOnline() {
	if (typeof navigator !== "undefined" && navigator && "onLine" in navigator && typeof navigator.onLine === "boolean" && (_isHttpOrHttps() || isBrowserExtension() || "connection" in navigator)) return navigator.onLine;
	return true;
}
function _getUserLanguage() {
	if (typeof navigator === "undefined") return null;
	const navigatorLanguage = navigator;
	return navigatorLanguage.languages && navigatorLanguage.languages[0] || navigatorLanguage.language || null;
}
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
/**
* A structure to help pick between a range of long and short delay durations
* depending on the current environment. In general, the long delay is used for
* mobile environments whereas short delays are used for desktop environments.
*/
var Delay = class {
	constructor(shortDelay, longDelay) {
		this.shortDelay = shortDelay;
		this.longDelay = longDelay;
		debugAssert(longDelay > shortDelay, "Short delay should be less than long delay!");
		this.isMobile = isMobileCordova() || isReactNative();
	}
	get() {
		if (!_isOnline()) return Math.min(5e3, this.shortDelay);
		return this.isMobile ? this.longDelay : this.shortDelay;
	}
};
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
function _emulatorUrl(config, path) {
	debugAssert(config.emulator, "Emulator should always be set here");
	const { url } = config.emulator;
	if (!path) return url;
	return `${url}${path.startsWith("/") ? path.slice(1) : path}`;
}
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var FetchProvider = class {
	static initialize(fetchImpl, headersImpl, responseImpl) {
		this.fetchImpl = fetchImpl;
		if (headersImpl) this.headersImpl = headersImpl;
		if (responseImpl) this.responseImpl = responseImpl;
	}
	static fetch() {
		if (this.fetchImpl) return this.fetchImpl;
		if (typeof self !== "undefined" && "fetch" in self) return self.fetch;
		if (typeof globalThis !== "undefined" && globalThis.fetch) return globalThis.fetch;
		if (typeof fetch !== "undefined") return fetch;
		debugFail("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill");
	}
	static headers() {
		if (this.headersImpl) return this.headersImpl;
		if (typeof self !== "undefined" && "Headers" in self) return self.Headers;
		if (typeof globalThis !== "undefined" && globalThis.Headers) return globalThis.Headers;
		if (typeof Headers !== "undefined") return Headers;
		debugFail("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill");
	}
	static response() {
		if (this.responseImpl) return this.responseImpl;
		if (typeof self !== "undefined" && "Response" in self) return self.Response;
		if (typeof globalThis !== "undefined" && globalThis.Response) return globalThis.Response;
		if (typeof Response !== "undefined") return Response;
		debugFail("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill");
	}
};
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
/**
* Map from errors returned by the server to errors to developer visible errors
*/
var SERVER_ERROR_MAP = {
	["CREDENTIAL_MISMATCH"]: "custom-token-mismatch",
	["MISSING_CUSTOM_TOKEN"]: "internal-error",
	["INVALID_IDENTIFIER"]: "invalid-email",
	["MISSING_CONTINUE_URI"]: "internal-error",
	["INVALID_PASSWORD"]: "wrong-password",
	["MISSING_PASSWORD"]: "missing-password",
	["INVALID_LOGIN_CREDENTIALS"]: "invalid-credential",
	["EMAIL_EXISTS"]: "email-already-in-use",
	["PASSWORD_LOGIN_DISABLED"]: "operation-not-allowed",
	["INVALID_IDP_RESPONSE"]: "invalid-credential",
	["INVALID_PENDING_TOKEN"]: "invalid-credential",
	["FEDERATED_USER_ID_ALREADY_LINKED"]: "credential-already-in-use",
	["MISSING_REQ_TYPE"]: "internal-error",
	["EMAIL_NOT_FOUND"]: "user-not-found",
	["RESET_PASSWORD_EXCEED_LIMIT"]: "too-many-requests",
	["EXPIRED_OOB_CODE"]: "expired-action-code",
	["INVALID_OOB_CODE"]: "invalid-action-code",
	["MISSING_OOB_CODE"]: "internal-error",
	["CREDENTIAL_TOO_OLD_LOGIN_AGAIN"]: "requires-recent-login",
	["INVALID_ID_TOKEN"]: "invalid-user-token",
	["TOKEN_EXPIRED"]: "user-token-expired",
	["USER_NOT_FOUND"]: "user-token-expired",
	["TOO_MANY_ATTEMPTS_TRY_LATER"]: "too-many-requests",
	["PASSWORD_DOES_NOT_MEET_REQUIREMENTS"]: "password-does-not-meet-requirements",
	["INVALID_CODE"]: "invalid-verification-code",
	["INVALID_SESSION_INFO"]: "invalid-verification-id",
	["INVALID_TEMPORARY_PROOF"]: "invalid-credential",
	["MISSING_SESSION_INFO"]: "missing-verification-id",
	["SESSION_EXPIRED"]: "code-expired",
	["MISSING_ANDROID_PACKAGE_NAME"]: "missing-android-pkg-name",
	["UNAUTHORIZED_DOMAIN"]: "unauthorized-continue-uri",
	["INVALID_OAUTH_CLIENT_ID"]: "invalid-oauth-client-id",
	["ADMIN_ONLY_OPERATION"]: "admin-restricted-operation",
	["INVALID_MFA_PENDING_CREDENTIAL"]: "invalid-multi-factor-session",
	["MFA_ENROLLMENT_NOT_FOUND"]: "multi-factor-info-not-found",
	["MISSING_MFA_ENROLLMENT_ID"]: "missing-multi-factor-info",
	["MISSING_MFA_PENDING_CREDENTIAL"]: "missing-multi-factor-session",
	["SECOND_FACTOR_EXISTS"]: "second-factor-already-in-use",
	["SECOND_FACTOR_LIMIT_EXCEEDED"]: "maximum-second-factor-count-exceeded",
	["BLOCKING_FUNCTION_ERROR_RESPONSE"]: "internal-error",
	["RECAPTCHA_NOT_ENABLED"]: "recaptcha-not-enabled",
	["MISSING_RECAPTCHA_TOKEN"]: "missing-recaptcha-token",
	["INVALID_RECAPTCHA_TOKEN"]: "invalid-recaptcha-token",
	["INVALID_RECAPTCHA_ACTION"]: "invalid-recaptcha-action",
	["MISSING_CLIENT_TYPE"]: "missing-client-type",
	["MISSING_RECAPTCHA_VERSION"]: "missing-recaptcha-version",
	["INVALID_RECAPTCHA_VERSION"]: "invalid-recaptcha-version",
	["INVALID_REQ_TYPE"]: "invalid-req-type"
};
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var CookieAuthProxiedEndpoints = [
	"/v1/accounts:signInWithCustomToken",
	"/v1/accounts:signInWithEmailLink",
	"/v1/accounts:signInWithIdp",
	"/v1/accounts:signInWithPassword",
	"/v1/accounts:signInWithPhoneNumber",
	"/v1/token"
];
var DEFAULT_API_TIMEOUT_MS = new Delay(3e4, 6e4);
function _addTidIfNecessary(auth, request) {
	if (auth.tenantId && !request.tenantId) return Object.assign(Object.assign({}, request), { tenantId: auth.tenantId });
	return request;
}
async function _performApiRequest(auth, method, path, request, customErrorMap = {}) {
	return _performFetchWithErrorHandling(auth, customErrorMap, async () => {
		let body = {};
		let params = {};
		if (request) {
			if (method === "GET") params = request;
			else body = { body: JSON.stringify(request) };
		}
		const query = querystring(Object.assign({ key: auth.config.apiKey }, params)).slice(1);
		const headers = await auth._getAdditionalHeaders();
		headers["Content-Type"] = "application/json";
		if (auth.languageCode) headers["X-Firebase-Locale"] = auth.languageCode;
		const fetchArgs = Object.assign({
			method,
			headers
		}, body);
		if (!isCloudflareWorker()) fetchArgs.referrerPolicy = "no-referrer";
		if (auth.emulatorConfig && isCloudWorkstation(auth.emulatorConfig.host)) fetchArgs.credentials = "include";
		return FetchProvider.fetch()(await _getFinalTarget(auth, auth.config.apiHost, path, query), fetchArgs);
	});
}
async function _performFetchWithErrorHandling(auth, customErrorMap, fetchFn) {
	auth._canInitEmulator = false;
	const errorMap = Object.assign(Object.assign({}, SERVER_ERROR_MAP), customErrorMap);
	try {
		const networkTimeout = new NetworkTimeout(auth);
		const response = await Promise.race([fetchFn(), networkTimeout.promise]);
		networkTimeout.clearNetworkTimeout();
		const json = await response.json();
		if ("needConfirmation" in json) throw _makeTaggedError(auth, "account-exists-with-different-credential", json);
		if (response.ok && !("errorMessage" in json)) return json;
		else {
			const [serverErrorCode, serverErrorMessage] = (response.ok ? json.errorMessage : json.error.message).split(" : ");
			if (serverErrorCode === "FEDERATED_USER_ID_ALREADY_LINKED") throw _makeTaggedError(auth, "credential-already-in-use", json);
			else if (serverErrorCode === "EMAIL_EXISTS") throw _makeTaggedError(auth, "email-already-in-use", json);
			else if (serverErrorCode === "USER_DISABLED") throw _makeTaggedError(auth, "user-disabled", json);
			const authError = errorMap[serverErrorCode] || serverErrorCode.toLowerCase().replace(/[_\s]+/g, "-");
			if (serverErrorMessage) throw _errorWithCustomMessage(auth, authError, serverErrorMessage);
			else _fail(auth, authError);
		}
	} catch (e) {
		if (e instanceof FirebaseError) throw e;
		_fail(auth, "network-request-failed", { "message": String(e) });
	}
}
async function _performSignInRequest(auth, method, path, request, customErrorMap = {}) {
	const serverResponse = await _performApiRequest(auth, method, path, request, customErrorMap);
	if ("mfaPendingCredential" in serverResponse) _fail(auth, "multi-factor-auth-required", { _serverResponse: serverResponse });
	return serverResponse;
}
async function _getFinalTarget(auth, host, path, query) {
	const base = `${host}${path}?${query}`;
	const authInternal = auth;
	const finalTarget = authInternal.config.emulator ? _emulatorUrl(auth.config, base) : `${auth.config.apiScheme}://${base}`;
	if (CookieAuthProxiedEndpoints.includes(path)) {
		await authInternal._persistenceManagerAvailable;
		if (authInternal._getPersistenceType() === "COOKIE") return authInternal._getPersistence()._getFinalTarget(finalTarget).toString();
	}
	return finalTarget;
}
function _parseEnforcementState(enforcementStateStr) {
	switch (enforcementStateStr) {
		case "ENFORCE": return "ENFORCE";
		case "AUDIT": return "AUDIT";
		case "OFF": return "OFF";
		default: return "ENFORCEMENT_STATE_UNSPECIFIED";
	}
}
var NetworkTimeout = class {
	clearNetworkTimeout() {
		clearTimeout(this.timer);
	}
	constructor(auth) {
		this.auth = auth;
		this.timer = null;
		this.promise = new Promise((_, reject) => {
			this.timer = setTimeout(() => {
				return reject(_createError(this.auth, "network-request-failed"));
			}, DEFAULT_API_TIMEOUT_MS.get());
		});
	}
};
function _makeTaggedError(auth, code, response) {
	const errorParams = { appName: auth.name };
	if (response.email) errorParams.email = response.email;
	if (response.phoneNumber) errorParams.phoneNumber = response.phoneNumber;
	const error = _createError(auth, code, errorParams);
	error.customData._tokenResponse = response;
	return error;
}
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
function isEnterprise(grecaptcha) {
	return grecaptcha !== void 0 && grecaptcha.enterprise !== void 0;
}
var RecaptchaConfig = class {
	constructor(response) {
		/**
		* The reCAPTCHA site key.
		*/
		this.siteKey = "";
		/**
		* The list of providers and their enablement status for reCAPTCHA Enterprise.
		*/
		this.recaptchaEnforcementState = [];
		if (response.recaptchaKey === void 0) throw new Error("recaptchaKey undefined");
		this.siteKey = response.recaptchaKey.split("/")[3];
		this.recaptchaEnforcementState = response.recaptchaEnforcementState;
	}
	/**
	* Returns the reCAPTCHA Enterprise enforcement state for the given provider.
	*
	* @param providerStr - The provider whose enforcement state is to be returned.
	* @returns The reCAPTCHA Enterprise enforcement state for the given provider.
	*/
	getProviderEnforcementState(providerStr) {
		if (!this.recaptchaEnforcementState || this.recaptchaEnforcementState.length === 0) return null;
		for (const recaptchaEnforcementState of this.recaptchaEnforcementState) if (recaptchaEnforcementState.provider && recaptchaEnforcementState.provider === providerStr) return _parseEnforcementState(recaptchaEnforcementState.enforcementState);
		return null;
	}
	/**
	* Returns true if the reCAPTCHA Enterprise enforcement state for the provider is set to ENFORCE or AUDIT.
	*
	* @param providerStr - The provider whose enablement state is to be returned.
	* @returns Whether or not reCAPTCHA Enterprise protection is enabled for the given provider.
	*/
	isProviderEnabled(providerStr) {
		return this.getProviderEnforcementState(providerStr) === "ENFORCE" || this.getProviderEnforcementState(providerStr) === "AUDIT";
	}
	/**
	* Returns true if reCAPTCHA Enterprise protection is enabled in at least one provider, otherwise
	* returns false.
	*
	* @returns Whether or not reCAPTCHA Enterprise protection is enabled for at least one provider.
	*/
	isAnyProviderEnabled() {
		return this.isProviderEnabled("EMAIL_PASSWORD_PROVIDER") || this.isProviderEnabled("PHONE_PROVIDER");
	}
};
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
async function getRecaptchaConfig(auth, request) {
	return _performApiRequest(auth, "GET", "/v2/recaptchaConfig", _addTidIfNecessary(auth, request));
}
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
async function deleteAccount(auth, request) {
	return _performApiRequest(auth, "POST", "/v1/accounts:delete", request);
}
async function getAccountInfo(auth, request) {
	return _performApiRequest(auth, "POST", "/v1/accounts:lookup", request);
}
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
function utcTimestampToDateString(utcTimestamp) {
	if (!utcTimestamp) return;
	try {
		const date = new Date(Number(utcTimestamp));
		if (!isNaN(date.getTime())) return date.toUTCString();
	} catch (e) {}
}
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
/**
* Returns a deserialized JSON Web Token (JWT) used to identify the user to a Firebase service.
*
* @remarks
* Returns the current token if it has not expired or if it will not expire in the next five
* minutes. Otherwise, this will refresh the token and return a new one.
*
* @param user - The user.
* @param forceRefresh - Force refresh regardless of token expiration.
*
* @public
*/
async function getIdTokenResult(user, forceRefresh = false) {
	const userInternal = getModularInstance(user);
	const token = await userInternal.getIdToken(forceRefresh);
	const claims = _parseToken(token);
	_assert(claims && claims.exp && claims.auth_time && claims.iat, userInternal.auth, "internal-error");
	const firebase = typeof claims.firebase === "object" ? claims.firebase : void 0;
	const signInProvider = firebase === null || firebase === void 0 ? void 0 : firebase["sign_in_provider"];
	return {
		claims,
		token,
		authTime: utcTimestampToDateString(secondsStringToMilliseconds(claims.auth_time)),
		issuedAtTime: utcTimestampToDateString(secondsStringToMilliseconds(claims.iat)),
		expirationTime: utcTimestampToDateString(secondsStringToMilliseconds(claims.exp)),
		signInProvider: signInProvider || null,
		signInSecondFactor: (firebase === null || firebase === void 0 ? void 0 : firebase["sign_in_second_factor"]) || null
	};
}
function secondsStringToMilliseconds(seconds) {
	return Number(seconds) * 1e3;
}
function _parseToken(token) {
	const [algorithm, payload, signature] = token.split(".");
	if (algorithm === void 0 || payload === void 0 || signature === void 0) {
		_logError("JWT malformed, contained fewer than 3 sections");
		return null;
	}
	try {
		const decoded = base64Decode(payload);
		if (!decoded) {
			_logError("Failed to decode base64 JWT payload");
			return null;
		}
		return JSON.parse(decoded);
	} catch (e) {
		_logError("Caught error parsing JWT payload as JSON", e === null || e === void 0 ? void 0 : e.toString());
		return null;
	}
}
/**
* Extract expiresIn TTL from a token by subtracting the expiration from the issuance.
*/
function _tokenExpiresIn(token) {
	const parsedToken = _parseToken(token);
	_assert(parsedToken, "internal-error");
	_assert(typeof parsedToken.exp !== "undefined", "internal-error");
	_assert(typeof parsedToken.iat !== "undefined", "internal-error");
	return Number(parsedToken.exp) - Number(parsedToken.iat);
}
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
async function _logoutIfInvalidated(user, promise, bypassAuthState = false) {
	if (bypassAuthState) return promise;
	try {
		return await promise;
	} catch (e) {
		if (e instanceof FirebaseError && isUserInvalidated(e)) {
			if (user.auth.currentUser === user) await user.auth.signOut();
		}
		throw e;
	}
}
function isUserInvalidated({ code }) {
	return code === `auth/user-disabled` || code === `auth/user-token-expired`;
}
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var ProactiveRefresh = class {
	constructor(user) {
		this.user = user;
		this.isRunning = false;
		this.timerId = null;
		this.errorBackoff = 3e4;
	}
	_start() {
		if (this.isRunning) return;
		this.isRunning = true;
		this.schedule();
	}
	_stop() {
		if (!this.isRunning) return;
		this.isRunning = false;
		if (this.timerId !== null) clearTimeout(this.timerId);
	}
	getInterval(wasError) {
		var _a;
		if (wasError) {
			const interval = this.errorBackoff;
			this.errorBackoff = Math.min(this.errorBackoff * 2, 96e4);
			return interval;
		} else {
			this.errorBackoff = 3e4;
			const interval = ((_a = this.user.stsTokenManager.expirationTime) !== null && _a !== void 0 ? _a : 0) - Date.now() - 3e5;
			return Math.max(0, interval);
		}
	}
	schedule(wasError = false) {
		if (!this.isRunning) return;
		const interval = this.getInterval(wasError);
		this.timerId = setTimeout(async () => {
			await this.iteration();
		}, interval);
	}
	async iteration() {
		try {
			await this.user.getIdToken(true);
		} catch (e) {
			if ((e === null || e === void 0 ? void 0 : e.code) === `auth/network-request-failed`) this.schedule(true);
			return;
		}
		this.schedule();
	}
};
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var UserMetadata = class {
	constructor(createdAt, lastLoginAt) {
		this.createdAt = createdAt;
		this.lastLoginAt = lastLoginAt;
		this._initializeTime();
	}
	_initializeTime() {
		this.lastSignInTime = utcTimestampToDateString(this.lastLoginAt);
		this.creationTime = utcTimestampToDateString(this.createdAt);
	}
	_copy(metadata) {
		this.createdAt = metadata.createdAt;
		this.lastLoginAt = metadata.lastLoginAt;
		this._initializeTime();
	}
	toJSON() {
		return {
			createdAt: this.createdAt,
			lastLoginAt: this.lastLoginAt
		};
	}
};
/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
async function _reloadWithoutSaving(user) {
	var _a;
	const auth = user.auth;
	const response = await _logoutIfInvalidated(user, getAccountInfo(auth, { idToken: await user.getIdToken() }));
	_assert(response === null || response === void 0 ? void 0 : response.users.length, auth, "internal-error");
	const coreAccount = response.users[0];
	user._notifyReloadListener(coreAccount);
	const newProviderData = ((_a = coreAccount.providerUserInfo) === null || _a === void 0 ? void 0 : _a.length) ? extractProviderData(coreAccount.providerUserInfo) : [];
	const providerData = mergeProviderData(user.providerData, newProviderData);
	const oldIsAnonymous = user.isAnonymous;
	const newIsAnonymous = !(user.email && coreAccount.passwordHash) && !(providerData === null || providerData === void 0 ? void 0 : providerData.length);
	const isAnonymous = !oldIsAnonymous ? false : newIsAnonymous;
	const updates = {
		uid: coreAccount.localId,
		displayName: coreAccount.displayName || null,
		photoURL: coreAccount.photoUrl || null,
		email: coreAccount.email || null,
		emailVerified: coreAccount.emailVerified || false,
		phoneNumber: coreAccount.phoneNumber || null,
		tenantId: coreAccount.tenantId || null,
		providerData,
		metadata: new UserMetadata(coreAccount.createdAt, coreAccount.lastLoginAt),
		isAnonymous
	};
	Object.assign(user, updates);
}
/**
* Reloads user account data, if signed in.
*
* @param user - The user.
*
* @public
*/
async function reload(user) {
	const userInternal = getModularInstance(user);
	await _reloadWithoutSaving(userInternal);
	await userInternal.auth._persistUserIfCurrent(userInternal);
	userInternal.auth._notifyListenersIfCurrent(userInternal);
}
function mergeProviderData(original, newData) {
	return [...original.filter((o) => !newData.some((n) => n.providerId === o.providerId)), ...newData];
}
function extractProviderData(providers) {
	return providers.map((_a) => {
		var { providerId } = _a, provider = __rest(_a, ["providerId"]);
		return {
			providerId,
			uid: provider.rawId || "",
			displayName: provider.displayName || null,
			email: provider.email || null,
			phoneNumber: provider.phoneNumber || null,
			photoURL: provider.photoUrl || null
		};
	});
}
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
async function requestStsToken(auth, refreshToken) {
	const response = await _performFetchWithErrorHandling(auth, {}, async () => {
		const body = querystring({
			"grant_type": "refresh_token",
			"refresh_token": refreshToken
		}).slice(1);
		const { tokenApiHost, apiKey } = auth.config;
		const url = await _getFinalTarget(auth, tokenApiHost, "/v1/token", `key=${apiKey}`);
		const headers = await auth._getAdditionalHeaders();
		headers["Content-Type"] = "application/x-www-form-urlencoded";
		const options = {
			method: "POST",
			headers,
			body
		};
		if (auth.emulatorConfig && isCloudWorkstation(auth.emulatorConfig.host)) options.credentials = "include";
		return FetchProvider.fetch()(url, options);
	});
	return {
		accessToken: response.access_token,
		expiresIn: response.expires_in,
		refreshToken: response.refresh_token
	};
}
async function revokeToken(auth, request) {
	return _performApiRequest(auth, "POST", "/v2/accounts:revokeToken", _addTidIfNecessary(auth, request));
}
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
/**
* We need to mark this class as internal explicitly to exclude it in the public typings, because
* it references AuthInternal which has a circular dependency with UserInternal.
*
* @internal
*/
var StsTokenManager = class StsTokenManager {
	constructor() {
		this.refreshToken = null;
		this.accessToken = null;
		this.expirationTime = null;
	}
	get isExpired() {
		return !this.expirationTime || Date.now() > this.expirationTime - 3e4;
	}
	updateFromServerResponse(response) {
		_assert(response.idToken, "internal-error");
		_assert(typeof response.idToken !== "undefined", "internal-error");
		_assert(typeof response.refreshToken !== "undefined", "internal-error");
		const expiresIn = "expiresIn" in response && typeof response.expiresIn !== "undefined" ? Number(response.expiresIn) : _tokenExpiresIn(response.idToken);
		this.updateTokensAndExpiration(response.idToken, response.refreshToken, expiresIn);
	}
	updateFromIdToken(idToken) {
		_assert(idToken.length !== 0, "internal-error");
		const expiresIn = _tokenExpiresIn(idToken);
		this.updateTokensAndExpiration(idToken, null, expiresIn);
	}
	async getToken(auth, forceRefresh = false) {
		if (!forceRefresh && this.accessToken && !this.isExpired) return this.accessToken;
		_assert(this.refreshToken, auth, "user-token-expired");
		if (this.refreshToken) {
			await this.refresh(auth, this.refreshToken);
			return this.accessToken;
		}
		return null;
	}
	clearRefreshToken() {
		this.refreshToken = null;
	}
	async refresh(auth, oldToken) {
		const { accessToken, refreshToken, expiresIn } = await requestStsToken(auth, oldToken);
		this.updateTokensAndExpiration(accessToken, refreshToken, Number(expiresIn));
	}
	updateTokensAndExpiration(accessToken, refreshToken, expiresInSec) {
		this.refreshToken = refreshToken || null;
		this.accessToken = accessToken || null;
		this.expirationTime = Date.now() + expiresInSec * 1e3;
	}
	static fromJSON(appName, object) {
		const { refreshToken, accessToken, expirationTime } = object;
		const manager = new StsTokenManager();
		if (refreshToken) {
			_assert(typeof refreshToken === "string", "internal-error", { appName });
			manager.refreshToken = refreshToken;
		}
		if (accessToken) {
			_assert(typeof accessToken === "string", "internal-error", { appName });
			manager.accessToken = accessToken;
		}
		if (expirationTime) {
			_assert(typeof expirationTime === "number", "internal-error", { appName });
			manager.expirationTime = expirationTime;
		}
		return manager;
	}
	toJSON() {
		return {
			refreshToken: this.refreshToken,
			accessToken: this.accessToken,
			expirationTime: this.expirationTime
		};
	}
	_assign(stsTokenManager) {
		this.accessToken = stsTokenManager.accessToken;
		this.refreshToken = stsTokenManager.refreshToken;
		this.expirationTime = stsTokenManager.expirationTime;
	}
	_clone() {
		return Object.assign(new StsTokenManager(), this.toJSON());
	}
	_performRefresh() {
		return debugFail("not implemented");
	}
};
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
function assertStringOrUndefined(assertion, appName) {
	_assert(typeof assertion === "string" || typeof assertion === "undefined", "internal-error", { appName });
}
var UserImpl = class UserImpl {
	constructor(_a) {
		var { uid, auth, stsTokenManager } = _a, opt = __rest(_a, [
			"uid",
			"auth",
			"stsTokenManager"
		]);
		this.providerId = "firebase";
		this.proactiveRefresh = new ProactiveRefresh(this);
		this.reloadUserInfo = null;
		this.reloadListener = null;
		this.uid = uid;
		this.auth = auth;
		this.stsTokenManager = stsTokenManager;
		this.accessToken = stsTokenManager.accessToken;
		this.displayName = opt.displayName || null;
		this.email = opt.email || null;
		this.emailVerified = opt.emailVerified || false;
		this.phoneNumber = opt.phoneNumber || null;
		this.photoURL = opt.photoURL || null;
		this.isAnonymous = opt.isAnonymous || false;
		this.tenantId = opt.tenantId || null;
		this.providerData = opt.providerData ? [...opt.providerData] : [];
		this.metadata = new UserMetadata(opt.createdAt || void 0, opt.lastLoginAt || void 0);
	}
	async getIdToken(forceRefresh) {
		const accessToken = await _logoutIfInvalidated(this, this.stsTokenManager.getToken(this.auth, forceRefresh));
		_assert(accessToken, this.auth, "internal-error");
		if (this.accessToken !== accessToken) {
			this.accessToken = accessToken;
			await this.auth._persistUserIfCurrent(this);
			this.auth._notifyListenersIfCurrent(this);
		}
		return accessToken;
	}
	getIdTokenResult(forceRefresh) {
		return getIdTokenResult(this, forceRefresh);
	}
	reload() {
		return reload(this);
	}
	_assign(user) {
		if (this === user) return;
		_assert(this.uid === user.uid, this.auth, "internal-error");
		this.displayName = user.displayName;
		this.photoURL = user.photoURL;
		this.email = user.email;
		this.emailVerified = user.emailVerified;
		this.phoneNumber = user.phoneNumber;
		this.isAnonymous = user.isAnonymous;
		this.tenantId = user.tenantId;
		this.providerData = user.providerData.map((userInfo) => Object.assign({}, userInfo));
		this.metadata._copy(user.metadata);
		this.stsTokenManager._assign(user.stsTokenManager);
	}
	_clone(auth) {
		const newUser = new UserImpl(Object.assign(Object.assign({}, this), {
			auth,
			stsTokenManager: this.stsTokenManager._clone()
		}));
		newUser.metadata._copy(this.metadata);
		return newUser;
	}
	_onReload(callback) {
		_assert(!this.reloadListener, this.auth, "internal-error");
		this.reloadListener = callback;
		if (this.reloadUserInfo) {
			this._notifyReloadListener(this.reloadUserInfo);
			this.reloadUserInfo = null;
		}
	}
	_notifyReloadListener(userInfo) {
		if (this.reloadListener) this.reloadListener(userInfo);
		else this.reloadUserInfo = userInfo;
	}
	_startProactiveRefresh() {
		this.proactiveRefresh._start();
	}
	_stopProactiveRefresh() {
		this.proactiveRefresh._stop();
	}
	async _updateTokensIfNecessary(response, reload = false) {
		let tokensRefreshed = false;
		if (response.idToken && response.idToken !== this.stsTokenManager.accessToken) {
			this.stsTokenManager.updateFromServerResponse(response);
			tokensRefreshed = true;
		}
		if (reload) await _reloadWithoutSaving(this);
		await this.auth._persistUserIfCurrent(this);
		if (tokensRefreshed) this.auth._notifyListenersIfCurrent(this);
	}
	async delete() {
		if (_isFirebaseServerApp(this.auth.app)) return Promise.reject(_serverAppCurrentUserOperationNotSupportedError(this.auth));
		const idToken = await this.getIdToken();
		await _logoutIfInvalidated(this, deleteAccount(this.auth, { idToken }));
		this.stsTokenManager.clearRefreshToken();
		return this.auth.signOut();
	}
	toJSON() {
		return Object.assign(Object.assign({
			uid: this.uid,
			email: this.email || void 0,
			emailVerified: this.emailVerified,
			displayName: this.displayName || void 0,
			isAnonymous: this.isAnonymous,
			photoURL: this.photoURL || void 0,
			phoneNumber: this.phoneNumber || void 0,
			tenantId: this.tenantId || void 0,
			providerData: this.providerData.map((userInfo) => Object.assign({}, userInfo)),
			stsTokenManager: this.stsTokenManager.toJSON(),
			_redirectEventId: this._redirectEventId
		}, this.metadata.toJSON()), {
			apiKey: this.auth.config.apiKey,
			appName: this.auth.name
		});
	}
	get refreshToken() {
		return this.stsTokenManager.refreshToken || "";
	}
	static _fromJSON(auth, object) {
		var _a;
		var _b;
		var _c;
		var _d;
		var _e;
		var _f;
		var _g;
		var _h;
		const displayName = (_a = object.displayName) !== null && _a !== void 0 ? _a : void 0;
		const email = (_b = object.email) !== null && _b !== void 0 ? _b : void 0;
		const phoneNumber = (_c = object.phoneNumber) !== null && _c !== void 0 ? _c : void 0;
		const photoURL = (_d = object.photoURL) !== null && _d !== void 0 ? _d : void 0;
		const tenantId = (_e = object.tenantId) !== null && _e !== void 0 ? _e : void 0;
		const _redirectEventId = (_f = object._redirectEventId) !== null && _f !== void 0 ? _f : void 0;
		const createdAt = (_g = object.createdAt) !== null && _g !== void 0 ? _g : void 0;
		const lastLoginAt = (_h = object.lastLoginAt) !== null && _h !== void 0 ? _h : void 0;
		const { uid, emailVerified, isAnonymous, providerData, stsTokenManager: plainObjectTokenManager } = object;
		_assert(uid && plainObjectTokenManager, auth, "internal-error");
		const stsTokenManager = StsTokenManager.fromJSON(this.name, plainObjectTokenManager);
		_assert(typeof uid === "string", auth, "internal-error");
		assertStringOrUndefined(displayName, auth.name);
		assertStringOrUndefined(email, auth.name);
		_assert(typeof emailVerified === "boolean", auth, "internal-error");
		_assert(typeof isAnonymous === "boolean", auth, "internal-error");
		assertStringOrUndefined(phoneNumber, auth.name);
		assertStringOrUndefined(photoURL, auth.name);
		assertStringOrUndefined(tenantId, auth.name);
		assertStringOrUndefined(_redirectEventId, auth.name);
		assertStringOrUndefined(createdAt, auth.name);
		assertStringOrUndefined(lastLoginAt, auth.name);
		const user = new UserImpl({
			uid,
			auth,
			email,
			emailVerified,
			displayName,
			isAnonymous,
			photoURL,
			phoneNumber,
			tenantId,
			stsTokenManager,
			createdAt,
			lastLoginAt
		});
		if (providerData && Array.isArray(providerData)) user.providerData = providerData.map((userInfo) => Object.assign({}, userInfo));
		if (_redirectEventId) user._redirectEventId = _redirectEventId;
		return user;
	}
	/**
	* Initialize a User from an idToken server response
	* @param auth
	* @param idTokenResponse
	*/
	static async _fromIdTokenResponse(auth, idTokenResponse, isAnonymous = false) {
		const stsTokenManager = new StsTokenManager();
		stsTokenManager.updateFromServerResponse(idTokenResponse);
		const user = new UserImpl({
			uid: idTokenResponse.localId,
			auth,
			stsTokenManager,
			isAnonymous
		});
		await _reloadWithoutSaving(user);
		return user;
	}
	/**
	* Initialize a User from an idToken server response
	* @param auth
	* @param idTokenResponse
	*/
	static async _fromGetAccountInfoResponse(auth, response, idToken) {
		const coreAccount = response.users[0];
		_assert(coreAccount.localId !== void 0, "internal-error");
		const providerData = coreAccount.providerUserInfo !== void 0 ? extractProviderData(coreAccount.providerUserInfo) : [];
		const isAnonymous = !(coreAccount.email && coreAccount.passwordHash) && !(providerData === null || providerData === void 0 ? void 0 : providerData.length);
		const stsTokenManager = new StsTokenManager();
		stsTokenManager.updateFromIdToken(idToken);
		const user = new UserImpl({
			uid: coreAccount.localId,
			auth,
			stsTokenManager,
			isAnonymous
		});
		const updates = {
			uid: coreAccount.localId,
			displayName: coreAccount.displayName || null,
			photoURL: coreAccount.photoUrl || null,
			email: coreAccount.email || null,
			emailVerified: coreAccount.emailVerified || false,
			phoneNumber: coreAccount.phoneNumber || null,
			tenantId: coreAccount.tenantId || null,
			providerData,
			metadata: new UserMetadata(coreAccount.createdAt, coreAccount.lastLoginAt),
			isAnonymous: !(coreAccount.email && coreAccount.passwordHash) && !(providerData === null || providerData === void 0 ? void 0 : providerData.length)
		};
		Object.assign(user, updates);
		return user;
	}
};
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var instanceCache = /* @__PURE__ */ new Map();
function _getInstance(cls) {
	debugAssert(cls instanceof Function, "Expected a class definition");
	let instance = instanceCache.get(cls);
	if (instance) {
		debugAssert(instance instanceof cls, "Instance stored in cache mismatched with class");
		return instance;
	}
	instance = new cls();
	instanceCache.set(cls, instance);
	return instance;
}
/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var InMemoryPersistence = class {
	constructor() {
		this.type = "NONE";
		this.storage = {};
	}
	async _isAvailable() {
		return true;
	}
	async _set(key, value) {
		this.storage[key] = value;
	}
	async _get(key) {
		const value = this.storage[key];
		return value === void 0 ? null : value;
	}
	async _remove(key) {
		delete this.storage[key];
	}
	_addListener(_key, _listener) {}
	_removeListener(_key, _listener) {}
};
InMemoryPersistence.type = "NONE";
/**
* An implementation of {@link Persistence} of type 'NONE'.
*
* @public
*/
var inMemoryPersistence = InMemoryPersistence;
/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
function _persistenceKeyName(key, apiKey, appName) {
	return `firebase:${key}:${apiKey}:${appName}`;
}
var PersistenceUserManager = class PersistenceUserManager {
	constructor(persistence, auth, userKey) {
		this.persistence = persistence;
		this.auth = auth;
		this.userKey = userKey;
		const { config, name } = this.auth;
		this.fullUserKey = _persistenceKeyName(this.userKey, config.apiKey, name);
		this.fullPersistenceKey = _persistenceKeyName("persistence", config.apiKey, name);
		this.boundEventHandler = auth._onStorageEvent.bind(auth);
		this.persistence._addListener(this.fullUserKey, this.boundEventHandler);
	}
	setCurrentUser(user) {
		return this.persistence._set(this.fullUserKey, user.toJSON());
	}
	async getCurrentUser() {
		const blob = await this.persistence._get(this.fullUserKey);
		if (!blob) return null;
		if (typeof blob === "string") {
			const response = await getAccountInfo(this.auth, { idToken: blob }).catch(() => void 0);
			if (!response) return null;
			return UserImpl._fromGetAccountInfoResponse(this.auth, response, blob);
		}
		return UserImpl._fromJSON(this.auth, blob);
	}
	removeCurrentUser() {
		return this.persistence._remove(this.fullUserKey);
	}
	savePersistenceForRedirect() {
		return this.persistence._set(this.fullPersistenceKey, this.persistence.type);
	}
	async setPersistence(newPersistence) {
		if (this.persistence === newPersistence) return;
		const currentUser = await this.getCurrentUser();
		await this.removeCurrentUser();
		this.persistence = newPersistence;
		if (currentUser) return this.setCurrentUser(currentUser);
	}
	delete() {
		this.persistence._removeListener(this.fullUserKey, this.boundEventHandler);
	}
	static async create(auth, persistenceHierarchy, userKey = "authUser") {
		if (!persistenceHierarchy.length) return new PersistenceUserManager(_getInstance(inMemoryPersistence), auth, userKey);
		const availablePersistences = (await Promise.all(persistenceHierarchy.map(async (persistence) => {
			if (await persistence._isAvailable()) return persistence;
		}))).filter((persistence) => persistence);
		let selectedPersistence = availablePersistences[0] || _getInstance(inMemoryPersistence);
		const key = _persistenceKeyName(userKey, auth.config.apiKey, auth.name);
		let userToMigrate = null;
		for (const persistence of persistenceHierarchy) try {
			const blob = await persistence._get(key);
			if (blob) {
				let user;
				if (typeof blob === "string") {
					const response = await getAccountInfo(auth, { idToken: blob }).catch(() => void 0);
					if (!response) break;
					user = await UserImpl._fromGetAccountInfoResponse(auth, response, blob);
				} else user = UserImpl._fromJSON(auth, blob);
				if (persistence !== selectedPersistence) userToMigrate = user;
				selectedPersistence = persistence;
				break;
			}
		} catch (_a) {}
		const migrationHierarchy = availablePersistences.filter((p) => p._shouldAllowMigration);
		if (!selectedPersistence._shouldAllowMigration || !migrationHierarchy.length) return new PersistenceUserManager(selectedPersistence, auth, userKey);
		selectedPersistence = migrationHierarchy[0];
		if (userToMigrate) await selectedPersistence._set(key, userToMigrate.toJSON());
		await Promise.all(persistenceHierarchy.map(async (persistence) => {
			if (persistence !== selectedPersistence) try {
				await persistence._remove(key);
			} catch (_a) {}
		}));
		return new PersistenceUserManager(selectedPersistence, auth, userKey);
	}
};
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
/**
* Determine the browser for the purposes of reporting usage to the API
*/
function _getBrowserName(userAgent) {
	const ua = userAgent.toLowerCase();
	if (ua.includes("opera/") || ua.includes("opr/") || ua.includes("opios/")) return "Opera";
	else if (_isIEMobile(ua)) return "IEMobile";
	else if (ua.includes("msie") || ua.includes("trident/")) return "IE";
	else if (ua.includes("edge/")) return "Edge";
	else if (_isFirefox(ua)) return "Firefox";
	else if (ua.includes("silk/")) return "Silk";
	else if (_isBlackBerry(ua)) return "Blackberry";
	else if (_isWebOS(ua)) return "Webos";
	else if (_isSafari(ua)) return "Safari";
	else if ((ua.includes("chrome/") || _isChromeIOS(ua)) && !ua.includes("edge/")) return "Chrome";
	else if (_isAndroid(ua)) return "Android";
	else {
		const matches = userAgent.match(/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/);
		if ((matches === null || matches === void 0 ? void 0 : matches.length) === 2) return matches[1];
	}
	return "Other";
}
function _isFirefox(ua = getUA()) {
	return /firefox\//i.test(ua);
}
function _isSafari(userAgent = getUA()) {
	const ua = userAgent.toLowerCase();
	return ua.includes("safari/") && !ua.includes("chrome/") && !ua.includes("crios/") && !ua.includes("android");
}
function _isChromeIOS(ua = getUA()) {
	return /crios\//i.test(ua);
}
function _isIEMobile(ua = getUA()) {
	return /iemobile/i.test(ua);
}
function _isAndroid(ua = getUA()) {
	return /android/i.test(ua);
}
function _isBlackBerry(ua = getUA()) {
	return /blackberry/i.test(ua);
}
function _isWebOS(ua = getUA()) {
	return /webos/i.test(ua);
}
function _isIOS(ua = getUA()) {
	return /iphone|ipad|ipod/i.test(ua) || /macintosh/i.test(ua) && /mobile/i.test(ua);
}
function _isIOSStandalone(ua = getUA()) {
	var _a;
	return _isIOS(ua) && !!((_a = window.navigator) === null || _a === void 0 ? void 0 : _a.standalone);
}
function _isIE10() {
	return isIE() && document.documentMode === 10;
}
function _isMobileBrowser(ua = getUA()) {
	return _isIOS(ua) || _isAndroid(ua) || _isWebOS(ua) || _isBlackBerry(ua) || /windows phone/i.test(ua) || _isIEMobile(ua);
}
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
function _getClientVersion(clientPlatform, frameworks = []) {
	let reportedPlatform;
	switch (clientPlatform) {
		case "Browser":
			reportedPlatform = _getBrowserName(getUA());
			break;
		case "Worker":
			reportedPlatform = `${_getBrowserName(getUA())}-${clientPlatform}`;
			break;
		default: reportedPlatform = clientPlatform;
	}
	const reportedFrameworks = frameworks.length ? frameworks.join(",") : "FirebaseCore-web";
	return `${reportedPlatform}/JsCore/${SDK_VERSION}/${reportedFrameworks}`;
}
/**
* @license
* Copyright 2022 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var AuthMiddlewareQueue = class {
	constructor(auth) {
		this.auth = auth;
		this.queue = [];
	}
	pushCallback(callback, onAbort) {
		const wrappedCallback = (user) => new Promise((resolve, reject) => {
			try {
				resolve(callback(user));
			} catch (e) {
				reject(e);
			}
		});
		wrappedCallback.onAbort = onAbort;
		this.queue.push(wrappedCallback);
		const index = this.queue.length - 1;
		return () => {
			this.queue[index] = () => Promise.resolve();
		};
	}
	async runMiddleware(nextUser) {
		if (this.auth.currentUser === nextUser) return;
		const onAbortStack = [];
		try {
			for (const beforeStateCallback of this.queue) {
				await beforeStateCallback(nextUser);
				if (beforeStateCallback.onAbort) onAbortStack.push(beforeStateCallback.onAbort);
			}
		} catch (e) {
			onAbortStack.reverse();
			for (const onAbort of onAbortStack) try {
				onAbort();
			} catch (_) {}
			throw this.auth._errorFactory.create("login-blocked", { originalMessage: e === null || e === void 0 ? void 0 : e.message });
		}
	}
};
/**
* @license
* Copyright 2023 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
/**
* Fetches the password policy for the currently set tenant or the project if no tenant is set.
*
* @param auth Auth object.
* @param request Password policy request.
* @returns Password policy response.
*/
async function _getPasswordPolicy(auth, request = {}) {
	return _performApiRequest(auth, "GET", "/v2/passwordPolicy", _addTidIfNecessary(auth, request));
}
/**
* @license
* Copyright 2023 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var MINIMUM_MIN_PASSWORD_LENGTH = 6;
/**
* Stores password policy requirements and provides password validation against the policy.
*
* @internal
*/
var PasswordPolicyImpl = class {
	constructor(response) {
		var _a;
		var _b;
		var _c;
		var _d;
		const responseOptions = response.customStrengthOptions;
		this.customStrengthOptions = {};
		this.customStrengthOptions.minPasswordLength = (_a = responseOptions.minPasswordLength) !== null && _a !== void 0 ? _a : MINIMUM_MIN_PASSWORD_LENGTH;
		if (responseOptions.maxPasswordLength) this.customStrengthOptions.maxPasswordLength = responseOptions.maxPasswordLength;
		if (responseOptions.containsLowercaseCharacter !== void 0) this.customStrengthOptions.containsLowercaseLetter = responseOptions.containsLowercaseCharacter;
		if (responseOptions.containsUppercaseCharacter !== void 0) this.customStrengthOptions.containsUppercaseLetter = responseOptions.containsUppercaseCharacter;
		if (responseOptions.containsNumericCharacter !== void 0) this.customStrengthOptions.containsNumericCharacter = responseOptions.containsNumericCharacter;
		if (responseOptions.containsNonAlphanumericCharacter !== void 0) this.customStrengthOptions.containsNonAlphanumericCharacter = responseOptions.containsNonAlphanumericCharacter;
		this.enforcementState = response.enforcementState;
		if (this.enforcementState === "ENFORCEMENT_STATE_UNSPECIFIED") this.enforcementState = "OFF";
		this.allowedNonAlphanumericCharacters = (_c = (_b = response.allowedNonAlphanumericCharacters) === null || _b === void 0 ? void 0 : _b.join("")) !== null && _c !== void 0 ? _c : "";
		this.forceUpgradeOnSignin = (_d = response.forceUpgradeOnSignin) !== null && _d !== void 0 ? _d : false;
		this.schemaVersion = response.schemaVersion;
	}
	validatePassword(password) {
		var _a;
		var _b;
		var _c;
		var _d;
		var _e;
		var _f;
		const status = {
			isValid: true,
			passwordPolicy: this
		};
		this.validatePasswordLengthOptions(password, status);
		this.validatePasswordCharacterOptions(password, status);
		status.isValid && (status.isValid = (_a = status.meetsMinPasswordLength) !== null && _a !== void 0 ? _a : true);
		status.isValid && (status.isValid = (_b = status.meetsMaxPasswordLength) !== null && _b !== void 0 ? _b : true);
		status.isValid && (status.isValid = (_c = status.containsLowercaseLetter) !== null && _c !== void 0 ? _c : true);
		status.isValid && (status.isValid = (_d = status.containsUppercaseLetter) !== null && _d !== void 0 ? _d : true);
		status.isValid && (status.isValid = (_e = status.containsNumericCharacter) !== null && _e !== void 0 ? _e : true);
		status.isValid && (status.isValid = (_f = status.containsNonAlphanumericCharacter) !== null && _f !== void 0 ? _f : true);
		return status;
	}
	/**
	* Validates that the password meets the length options for the policy.
	*
	* @param password Password to validate.
	* @param status Validation status.
	*/
	validatePasswordLengthOptions(password, status) {
		const minPasswordLength = this.customStrengthOptions.minPasswordLength;
		const maxPasswordLength = this.customStrengthOptions.maxPasswordLength;
		if (minPasswordLength) status.meetsMinPasswordLength = password.length >= minPasswordLength;
		if (maxPasswordLength) status.meetsMaxPasswordLength = password.length <= maxPasswordLength;
	}
	/**
	* Validates that the password meets the character options for the policy.
	*
	* @param password Password to validate.
	* @param status Validation status.
	*/
	validatePasswordCharacterOptions(password, status) {
		this.updatePasswordCharacterOptionsStatuses(status, false, false, false, false);
		let passwordChar;
		for (let i = 0; i < password.length; i++) {
			passwordChar = password.charAt(i);
			this.updatePasswordCharacterOptionsStatuses(status, passwordChar >= "a" && passwordChar <= "z", passwordChar >= "A" && passwordChar <= "Z", passwordChar >= "0" && passwordChar <= "9", this.allowedNonAlphanumericCharacters.includes(passwordChar));
		}
	}
	/**
	* Updates the running validation status with the statuses for the character options.
	* Expected to be called each time a character is processed to update each option status
	* based on the current character.
	*
	* @param status Validation status.
	* @param containsLowercaseCharacter Whether the character is a lowercase letter.
	* @param containsUppercaseCharacter Whether the character is an uppercase letter.
	* @param containsNumericCharacter Whether the character is a numeric character.
	* @param containsNonAlphanumericCharacter Whether the character is a non-alphanumeric character.
	*/
	updatePasswordCharacterOptionsStatuses(status, containsLowercaseCharacter, containsUppercaseCharacter, containsNumericCharacter, containsNonAlphanumericCharacter) {
		if (this.customStrengthOptions.containsLowercaseLetter) status.containsLowercaseLetter || (status.containsLowercaseLetter = containsLowercaseCharacter);
		if (this.customStrengthOptions.containsUppercaseLetter) status.containsUppercaseLetter || (status.containsUppercaseLetter = containsUppercaseCharacter);
		if (this.customStrengthOptions.containsNumericCharacter) status.containsNumericCharacter || (status.containsNumericCharacter = containsNumericCharacter);
		if (this.customStrengthOptions.containsNonAlphanumericCharacter) status.containsNonAlphanumericCharacter || (status.containsNonAlphanumericCharacter = containsNonAlphanumericCharacter);
	}
};
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var AuthImpl = class {
	constructor(app, heartbeatServiceProvider, appCheckServiceProvider, config) {
		this.app = app;
		this.heartbeatServiceProvider = heartbeatServiceProvider;
		this.appCheckServiceProvider = appCheckServiceProvider;
		this.config = config;
		this.currentUser = null;
		this.emulatorConfig = null;
		this.operations = Promise.resolve();
		this.authStateSubscription = new Subscription(this);
		this.idTokenSubscription = new Subscription(this);
		this.beforeStateQueue = new AuthMiddlewareQueue(this);
		this.redirectUser = null;
		this.isProactiveRefreshEnabled = false;
		this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION = 1;
		this._canInitEmulator = true;
		this._isInitialized = false;
		this._deleted = false;
		this._initializationPromise = null;
		this._popupRedirectResolver = null;
		this._errorFactory = _DEFAULT_AUTH_ERROR_FACTORY;
		this._agentRecaptchaConfig = null;
		this._tenantRecaptchaConfigs = {};
		this._projectPasswordPolicy = null;
		this._tenantPasswordPolicies = {};
		this._resolvePersistenceManagerAvailable = void 0;
		this.lastNotifiedUid = void 0;
		this.languageCode = null;
		this.tenantId = null;
		this.settings = { appVerificationDisabledForTesting: false };
		this.frameworks = [];
		this.name = app.name;
		this.clientVersion = config.sdkClientVersion;
		this._persistenceManagerAvailable = new Promise((resolve) => this._resolvePersistenceManagerAvailable = resolve);
	}
	_initializeWithPersistence(persistenceHierarchy, popupRedirectResolver) {
		if (popupRedirectResolver) this._popupRedirectResolver = _getInstance(popupRedirectResolver);
		this._initializationPromise = this.queue(async () => {
			var _a;
			var _b;
			var _c;
			if (this._deleted) return;
			this.persistenceManager = await PersistenceUserManager.create(this, persistenceHierarchy);
			(_a = this._resolvePersistenceManagerAvailable) === null || _a === void 0 || _a.call(this);
			if (this._deleted) return;
			if ((_b = this._popupRedirectResolver) === null || _b === void 0 ? void 0 : _b._shouldInitProactively) try {
				await this._popupRedirectResolver._initialize(this);
			} catch (e) {}
			await this.initializeCurrentUser(popupRedirectResolver);
			this.lastNotifiedUid = ((_c = this.currentUser) === null || _c === void 0 ? void 0 : _c.uid) || null;
			if (this._deleted) return;
			this._isInitialized = true;
		});
		return this._initializationPromise;
	}
	/**
	* If the persistence is changed in another window, the user manager will let us know
	*/
	async _onStorageEvent() {
		if (this._deleted) return;
		const user = await this.assertedPersistence.getCurrentUser();
		if (!this.currentUser && !user) return;
		if (this.currentUser && user && this.currentUser.uid === user.uid) {
			this._currentUser._assign(user);
			await this.currentUser.getIdToken();
			return;
		}
		await this._updateCurrentUser(user, true);
	}
	async initializeCurrentUserFromIdToken(idToken) {
		try {
			const response = await getAccountInfo(this, { idToken });
			const user = await UserImpl._fromGetAccountInfoResponse(this, response, idToken);
			await this.directlySetCurrentUser(user);
		} catch (err) {
			console.warn("FirebaseServerApp could not login user with provided authIdToken: ", err);
			await this.directlySetCurrentUser(null);
		}
	}
	async initializeCurrentUser(popupRedirectResolver) {
		var _a;
		if (_isFirebaseServerApp(this.app)) {
			const idToken = this.app.settings.authIdToken;
			if (idToken) return new Promise((resolve) => {
				setTimeout(() => this.initializeCurrentUserFromIdToken(idToken).then(resolve, resolve));
			});
			else return this.directlySetCurrentUser(null);
		}
		const previouslyStoredUser = await this.assertedPersistence.getCurrentUser();
		let futureCurrentUser = previouslyStoredUser;
		let needsTocheckMiddleware = false;
		if (popupRedirectResolver && this.config.authDomain) {
			await this.getOrInitRedirectPersistenceManager();
			const redirectUserEventId = (_a = this.redirectUser) === null || _a === void 0 ? void 0 : _a._redirectEventId;
			const storedUserEventId = futureCurrentUser === null || futureCurrentUser === void 0 ? void 0 : futureCurrentUser._redirectEventId;
			const result = await this.tryRedirectSignIn(popupRedirectResolver);
			if ((!redirectUserEventId || redirectUserEventId === storedUserEventId) && (result === null || result === void 0 ? void 0 : result.user)) {
				futureCurrentUser = result.user;
				needsTocheckMiddleware = true;
			}
		}
		if (!futureCurrentUser) return this.directlySetCurrentUser(null);
		if (!futureCurrentUser._redirectEventId) {
			if (needsTocheckMiddleware) try {
				await this.beforeStateQueue.runMiddleware(futureCurrentUser);
			} catch (e) {
				futureCurrentUser = previouslyStoredUser;
				this._popupRedirectResolver._overrideRedirectResult(this, () => Promise.reject(e));
			}
			if (futureCurrentUser) return this.reloadAndSetCurrentUserOrClear(futureCurrentUser);
			else return this.directlySetCurrentUser(null);
		}
		_assert(this._popupRedirectResolver, this, "argument-error");
		await this.getOrInitRedirectPersistenceManager();
		if (this.redirectUser && this.redirectUser._redirectEventId === futureCurrentUser._redirectEventId) return this.directlySetCurrentUser(futureCurrentUser);
		return this.reloadAndSetCurrentUserOrClear(futureCurrentUser);
	}
	async tryRedirectSignIn(redirectResolver) {
		let result = null;
		try {
			result = await this._popupRedirectResolver._completeRedirectFn(this, redirectResolver, true);
		} catch (e) {
			await this._setRedirectUser(null);
		}
		return result;
	}
	async reloadAndSetCurrentUserOrClear(user) {
		try {
			await _reloadWithoutSaving(user);
		} catch (e) {
			if ((e === null || e === void 0 ? void 0 : e.code) !== `auth/network-request-failed`) return this.directlySetCurrentUser(null);
		}
		return this.directlySetCurrentUser(user);
	}
	useDeviceLanguage() {
		this.languageCode = _getUserLanguage();
	}
	async _delete() {
		this._deleted = true;
	}
	async updateCurrentUser(userExtern) {
		if (_isFirebaseServerApp(this.app)) return Promise.reject(_serverAppCurrentUserOperationNotSupportedError(this));
		const user = userExtern ? getModularInstance(userExtern) : null;
		if (user) _assert(user.auth.config.apiKey === this.config.apiKey, this, "invalid-user-token");
		return this._updateCurrentUser(user && user._clone(this));
	}
	async _updateCurrentUser(user, skipBeforeStateCallbacks = false) {
		if (this._deleted) return;
		if (user) _assert(this.tenantId === user.tenantId, this, "tenant-id-mismatch");
		if (!skipBeforeStateCallbacks) await this.beforeStateQueue.runMiddleware(user);
		return this.queue(async () => {
			await this.directlySetCurrentUser(user);
			this.notifyAuthListeners();
		});
	}
	async signOut() {
		if (_isFirebaseServerApp(this.app)) return Promise.reject(_serverAppCurrentUserOperationNotSupportedError(this));
		await this.beforeStateQueue.runMiddleware(null);
		if (this.redirectPersistenceManager || this._popupRedirectResolver) await this._setRedirectUser(null);
		return this._updateCurrentUser(null, true);
	}
	setPersistence(persistence) {
		if (_isFirebaseServerApp(this.app)) return Promise.reject(_serverAppCurrentUserOperationNotSupportedError(this));
		return this.queue(async () => {
			await this.assertedPersistence.setPersistence(_getInstance(persistence));
		});
	}
	_getRecaptchaConfig() {
		if (this.tenantId == null) return this._agentRecaptchaConfig;
		else return this._tenantRecaptchaConfigs[this.tenantId];
	}
	async validatePassword(password) {
		if (!this._getPasswordPolicyInternal()) await this._updatePasswordPolicy();
		const passwordPolicy = this._getPasswordPolicyInternal();
		if (passwordPolicy.schemaVersion !== this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION) return Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version", {}));
		return passwordPolicy.validatePassword(password);
	}
	_getPasswordPolicyInternal() {
		if (this.tenantId === null) return this._projectPasswordPolicy;
		else return this._tenantPasswordPolicies[this.tenantId];
	}
	async _updatePasswordPolicy() {
		const passwordPolicy = new PasswordPolicyImpl(await _getPasswordPolicy(this));
		if (this.tenantId === null) this._projectPasswordPolicy = passwordPolicy;
		else this._tenantPasswordPolicies[this.tenantId] = passwordPolicy;
	}
	_getPersistenceType() {
		return this.assertedPersistence.persistence.type;
	}
	_getPersistence() {
		return this.assertedPersistence.persistence;
	}
	_updateErrorMap(errorMap) {
		this._errorFactory = new ErrorFactory("auth", "Firebase", errorMap());
	}
	onAuthStateChanged(nextOrObserver, error, completed) {
		return this.registerStateListener(this.authStateSubscription, nextOrObserver, error, completed);
	}
	beforeAuthStateChanged(callback, onAbort) {
		return this.beforeStateQueue.pushCallback(callback, onAbort);
	}
	onIdTokenChanged(nextOrObserver, error, completed) {
		return this.registerStateListener(this.idTokenSubscription, nextOrObserver, error, completed);
	}
	authStateReady() {
		return new Promise((resolve, reject) => {
			if (this.currentUser) resolve();
			else {
				const unsubscribe = this.onAuthStateChanged(() => {
					unsubscribe();
					resolve();
				}, reject);
			}
		});
	}
	/**
	* Revokes the given access token. Currently only supports Apple OAuth access tokens.
	*/
	async revokeAccessToken(token) {
		if (this.currentUser) {
			const request = {
				providerId: "apple.com",
				tokenType: "ACCESS_TOKEN",
				token,
				idToken: await this.currentUser.getIdToken()
			};
			if (this.tenantId != null) request.tenantId = this.tenantId;
			await revokeToken(this, request);
		}
	}
	toJSON() {
		var _a;
		return {
			apiKey: this.config.apiKey,
			authDomain: this.config.authDomain,
			appName: this.name,
			currentUser: (_a = this._currentUser) === null || _a === void 0 ? void 0 : _a.toJSON()
		};
	}
	async _setRedirectUser(user, popupRedirectResolver) {
		const redirectManager = await this.getOrInitRedirectPersistenceManager(popupRedirectResolver);
		return user === null ? redirectManager.removeCurrentUser() : redirectManager.setCurrentUser(user);
	}
	async getOrInitRedirectPersistenceManager(popupRedirectResolver) {
		if (!this.redirectPersistenceManager) {
			const resolver = popupRedirectResolver && _getInstance(popupRedirectResolver) || this._popupRedirectResolver;
			_assert(resolver, this, "argument-error");
			this.redirectPersistenceManager = await PersistenceUserManager.create(this, [_getInstance(resolver._redirectPersistence)], "redirectUser");
			this.redirectUser = await this.redirectPersistenceManager.getCurrentUser();
		}
		return this.redirectPersistenceManager;
	}
	async _redirectUserForId(id) {
		var _a;
		var _b;
		if (this._isInitialized) await this.queue(async () => {});
		if (((_a = this._currentUser) === null || _a === void 0 ? void 0 : _a._redirectEventId) === id) return this._currentUser;
		if (((_b = this.redirectUser) === null || _b === void 0 ? void 0 : _b._redirectEventId) === id) return this.redirectUser;
		return null;
	}
	async _persistUserIfCurrent(user) {
		if (user === this.currentUser) return this.queue(async () => this.directlySetCurrentUser(user));
	}
	/** Notifies listeners only if the user is current */
	_notifyListenersIfCurrent(user) {
		if (user === this.currentUser) this.notifyAuthListeners();
	}
	_key() {
		return `${this.config.authDomain}:${this.config.apiKey}:${this.name}`;
	}
	_startProactiveRefresh() {
		this.isProactiveRefreshEnabled = true;
		if (this.currentUser) this._currentUser._startProactiveRefresh();
	}
	_stopProactiveRefresh() {
		this.isProactiveRefreshEnabled = false;
		if (this.currentUser) this._currentUser._stopProactiveRefresh();
	}
	/** Returns the current user cast as the internal type */
	get _currentUser() {
		return this.currentUser;
	}
	notifyAuthListeners() {
		var _a;
		var _b;
		if (!this._isInitialized) return;
		this.idTokenSubscription.next(this.currentUser);
		const currentUid = (_b = (_a = this.currentUser) === null || _a === void 0 ? void 0 : _a.uid) !== null && _b !== void 0 ? _b : null;
		if (this.lastNotifiedUid !== currentUid) {
			this.lastNotifiedUid = currentUid;
			this.authStateSubscription.next(this.currentUser);
		}
	}
	registerStateListener(subscription, nextOrObserver, error, completed) {
		if (this._deleted) return () => {};
		const cb = typeof nextOrObserver === "function" ? nextOrObserver : nextOrObserver.next.bind(nextOrObserver);
		let isUnsubscribed = false;
		const promise = this._isInitialized ? Promise.resolve() : this._initializationPromise;
		_assert(promise, this, "internal-error");
		promise.then(() => {
			if (isUnsubscribed) return;
			cb(this.currentUser);
		});
		if (typeof nextOrObserver === "function") {
			const unsubscribe = subscription.addObserver(nextOrObserver, error, completed);
			return () => {
				isUnsubscribed = true;
				unsubscribe();
			};
		} else {
			const unsubscribe = subscription.addObserver(nextOrObserver);
			return () => {
				isUnsubscribed = true;
				unsubscribe();
			};
		}
	}
	/**
	* Unprotected (from race conditions) method to set the current user. This
	* should only be called from within a queued callback. This is necessary
	* because the queue shouldn't rely on another queued callback.
	*/
	async directlySetCurrentUser(user) {
		if (this.currentUser && this.currentUser !== user) this._currentUser._stopProactiveRefresh();
		if (user && this.isProactiveRefreshEnabled) user._startProactiveRefresh();
		this.currentUser = user;
		if (user) await this.assertedPersistence.setCurrentUser(user);
		else await this.assertedPersistence.removeCurrentUser();
	}
	queue(action) {
		this.operations = this.operations.then(action, action);
		return this.operations;
	}
	get assertedPersistence() {
		_assert(this.persistenceManager, this, "internal-error");
		return this.persistenceManager;
	}
	_logFramework(framework) {
		if (!framework || this.frameworks.includes(framework)) return;
		this.frameworks.push(framework);
		this.frameworks.sort();
		this.clientVersion = _getClientVersion(this.config.clientPlatform, this._getFrameworks());
	}
	_getFrameworks() {
		return this.frameworks;
	}
	async _getAdditionalHeaders() {
		var _a;
		const headers = { ["X-Client-Version"]: this.clientVersion };
		if (this.app.options.appId) headers["X-Firebase-gmpid"] = this.app.options.appId;
		const heartbeatsHeader = await ((_a = this.heartbeatServiceProvider.getImmediate({ optional: true })) === null || _a === void 0 ? void 0 : _a.getHeartbeatsHeader());
		if (heartbeatsHeader) headers["X-Firebase-Client"] = heartbeatsHeader;
		const appCheckToken = await this._getAppCheckToken();
		if (appCheckToken) headers["X-Firebase-AppCheck"] = appCheckToken;
		return headers;
	}
	async _getAppCheckToken() {
		var _a;
		if (_isFirebaseServerApp(this.app) && this.app.settings.appCheckToken) return this.app.settings.appCheckToken;
		const appCheckTokenResult = await ((_a = this.appCheckServiceProvider.getImmediate({ optional: true })) === null || _a === void 0 ? void 0 : _a.getToken());
		if (appCheckTokenResult === null || appCheckTokenResult === void 0 ? void 0 : appCheckTokenResult.error) _logWarn(`Error while retrieving App Check token: ${appCheckTokenResult.error}`);
		return appCheckTokenResult === null || appCheckTokenResult === void 0 ? void 0 : appCheckTokenResult.token;
	}
};
/**
* Method to be used to cast down to our private implementation of Auth.
* It will also handle unwrapping from the compat type if necessary
*
* @param auth Auth object passed in from developer
*/
function _castAuth(auth) {
	return getModularInstance(auth);
}
/** Helper class to wrap subscriber logic */
var Subscription = class {
	constructor(auth) {
		this.auth = auth;
		this.observer = null;
		this.addObserver = createSubscribe((observer) => this.observer = observer);
	}
	get next() {
		_assert(this.observer, this.auth, "internal-error");
		return this.observer.next.bind(this.observer);
	}
};
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var externalJSProvider = {
	async loadJS() {
		throw new Error("Unable to load external scripts");
	},
	recaptchaV2Script: "",
	recaptchaEnterpriseScript: "",
	gapiScript: ""
};
function _setExternalJSProvider(p) {
	externalJSProvider = p;
}
function _loadJS(url) {
	return externalJSProvider.loadJS(url);
}
function _recaptchaEnterpriseScriptUrl() {
	return externalJSProvider.recaptchaEnterpriseScript;
}
function _gapiScriptUrl() {
	return externalJSProvider.gapiScript;
}
function _generateCallbackName(prefix) {
	return `__${prefix}${Math.floor(Math.random() * 1e6)}`;
}
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var MockGreCAPTCHATopLevel = class {
	constructor() {
		this.enterprise = new MockGreCAPTCHA();
	}
	ready(callback) {
		callback();
	}
	execute(_siteKey, _options) {
		return Promise.resolve("token");
	}
	render(_container, _parameters) {
		return "";
	}
};
var MockGreCAPTCHA = class {
	ready(callback) {
		callback();
	}
	execute(_siteKey, _options) {
		return Promise.resolve("token");
	}
	render(_container, _parameters) {
		return "";
	}
};
var RECAPTCHA_ENTERPRISE_VERIFIER_TYPE = "recaptcha-enterprise";
var FAKE_TOKEN = "NO_RECAPTCHA";
var RecaptchaEnterpriseVerifier = class {
	/**
	*
	* @param authExtern - The corresponding Firebase {@link Auth} instance.
	*
	*/
	constructor(authExtern) {
		/**
		* Identifies the type of application verifier (e.g. "recaptcha-enterprise").
		*/
		this.type = RECAPTCHA_ENTERPRISE_VERIFIER_TYPE;
		this.auth = _castAuth(authExtern);
	}
	/**
	* Executes the verification process.
	*
	* @returns A Promise for a token that can be used to assert the validity of a request.
	*/
	async verify(action = "verify", forceRefresh = false) {
		async function retrieveSiteKey(auth) {
			if (!forceRefresh) {
				if (auth.tenantId == null && auth._agentRecaptchaConfig != null) return auth._agentRecaptchaConfig.siteKey;
				if (auth.tenantId != null && auth._tenantRecaptchaConfigs[auth.tenantId] !== void 0) return auth._tenantRecaptchaConfigs[auth.tenantId].siteKey;
			}
			return new Promise(async (resolve, reject) => {
				getRecaptchaConfig(auth, {
					clientType: "CLIENT_TYPE_WEB",
					version: "RECAPTCHA_ENTERPRISE"
				}).then((response) => {
					if (response.recaptchaKey === void 0) reject(/* @__PURE__ */ new Error("recaptcha Enterprise site key undefined"));
					else {
						const config = new RecaptchaConfig(response);
						if (auth.tenantId == null) auth._agentRecaptchaConfig = config;
						else auth._tenantRecaptchaConfigs[auth.tenantId] = config;
						return resolve(config.siteKey);
					}
				}).catch((error) => {
					reject(error);
				});
			});
		}
		function retrieveRecaptchaToken(siteKey, resolve, reject) {
			const grecaptcha = window.grecaptcha;
			if (isEnterprise(grecaptcha)) grecaptcha.enterprise.ready(() => {
				grecaptcha.enterprise.execute(siteKey, { action }).then((token) => {
					resolve(token);
				}).catch(() => {
					resolve(FAKE_TOKEN);
				});
			});
			else reject(Error("No reCAPTCHA enterprise script loaded."));
		}
		if (this.auth.settings.appVerificationDisabledForTesting) return new MockGreCAPTCHATopLevel().execute("siteKey", { action: "verify" });
		return new Promise((resolve, reject) => {
			retrieveSiteKey(this.auth).then((siteKey) => {
				if (!forceRefresh && isEnterprise(window.grecaptcha)) retrieveRecaptchaToken(siteKey, resolve, reject);
				else {
					if (typeof window === "undefined") {
						reject(/* @__PURE__ */ new Error("RecaptchaVerifier is only supported in browser"));
						return;
					}
					let url = _recaptchaEnterpriseScriptUrl();
					if (url.length !== 0) url += siteKey;
					_loadJS(url).then(() => {
						retrieveRecaptchaToken(siteKey, resolve, reject);
					}).catch((error) => {
						reject(error);
					});
				}
			}).catch((error) => {
				reject(error);
			});
		});
	}
};
async function injectRecaptchaFields(auth, request, action, isCaptchaResp = false, isFakeToken = false) {
	const verifier = new RecaptchaEnterpriseVerifier(auth);
	let captchaResponse;
	if (isFakeToken) captchaResponse = FAKE_TOKEN;
	else try {
		captchaResponse = await verifier.verify(action);
	} catch (error) {
		captchaResponse = await verifier.verify(action, true);
	}
	const newRequest = Object.assign({}, request);
	if (action === "mfaSmsEnrollment" || action === "mfaSmsSignIn") {
		if ("phoneEnrollmentInfo" in newRequest) {
			const phoneNumber = newRequest.phoneEnrollmentInfo.phoneNumber;
			const recaptchaToken = newRequest.phoneEnrollmentInfo.recaptchaToken;
			Object.assign(newRequest, { "phoneEnrollmentInfo": {
				phoneNumber,
				recaptchaToken,
				captchaResponse,
				"clientType": "CLIENT_TYPE_WEB",
				"recaptchaVersion": "RECAPTCHA_ENTERPRISE"
			} });
		} else if ("phoneSignInInfo" in newRequest) {
			const recaptchaToken = newRequest.phoneSignInInfo.recaptchaToken;
			Object.assign(newRequest, { "phoneSignInInfo": {
				recaptchaToken,
				captchaResponse,
				"clientType": "CLIENT_TYPE_WEB",
				"recaptchaVersion": "RECAPTCHA_ENTERPRISE"
			} });
		}
		return newRequest;
	}
	if (!isCaptchaResp) Object.assign(newRequest, { captchaResponse });
	else Object.assign(newRequest, { "captchaResp": captchaResponse });
	Object.assign(newRequest, { "clientType": "CLIENT_TYPE_WEB" });
	Object.assign(newRequest, { "recaptchaVersion": "RECAPTCHA_ENTERPRISE" });
	return newRequest;
}
async function handleRecaptchaFlow(authInstance, request, actionName, actionMethod, recaptchaAuthProvider) {
	var _a;
	var _b;
	if (recaptchaAuthProvider === "EMAIL_PASSWORD_PROVIDER") {
		if ((_a = authInstance._getRecaptchaConfig()) === null || _a === void 0 ? void 0 : _a.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")) return actionMethod(authInstance, await injectRecaptchaFields(authInstance, request, actionName, actionName === "getOobCode"));
		else return actionMethod(authInstance, request).catch(async (error) => {
			if (error.code === `auth/missing-recaptcha-token`) {
				`${actionName}`;
				return actionMethod(authInstance, await injectRecaptchaFields(authInstance, request, actionName, actionName === "getOobCode"));
			} else return Promise.reject(error);
		});
	} else if (recaptchaAuthProvider === "PHONE_PROVIDER") {
		if ((_b = authInstance._getRecaptchaConfig()) === null || _b === void 0 ? void 0 : _b.isProviderEnabled("PHONE_PROVIDER")) return actionMethod(authInstance, await injectRecaptchaFields(authInstance, request, actionName)).catch(async (error) => {
			var _a;
			if (((_a = authInstance._getRecaptchaConfig()) === null || _a === void 0 ? void 0 : _a.getProviderEnforcementState("PHONE_PROVIDER")) === "AUDIT") {
				if (error.code === `auth/missing-recaptcha-token` || error.code === `auth/invalid-app-credential`) {
					`${actionName}`;
					return actionMethod(authInstance, await injectRecaptchaFields(authInstance, request, actionName, false, true));
				}
			}
			return Promise.reject(error);
		});
		else return actionMethod(authInstance, await injectRecaptchaFields(authInstance, request, actionName, false, true));
	} else return Promise.reject(recaptchaAuthProvider + " provider is not supported.");
}
async function _initializeRecaptchaConfig(auth) {
	const authInternal = _castAuth(auth);
	const config = new RecaptchaConfig(await getRecaptchaConfig(authInternal, {
		clientType: "CLIENT_TYPE_WEB",
		version: "RECAPTCHA_ENTERPRISE"
	}));
	if (authInternal.tenantId == null) authInternal._agentRecaptchaConfig = config;
	else authInternal._tenantRecaptchaConfigs[authInternal.tenantId] = config;
	if (config.isAnyProviderEnabled()) new RecaptchaEnterpriseVerifier(authInternal).verify();
}
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
/**
* Initializes an {@link Auth} instance with fine-grained control over
* {@link Dependencies}.
*
* @remarks
*
* This function allows more control over the {@link Auth} instance than
* {@link getAuth}. `getAuth` uses platform-specific defaults to supply
* the {@link Dependencies}. In general, `getAuth` is the easiest way to
* initialize Auth and works for most use cases. Use `initializeAuth` if you
* need control over which persistence layer is used, or to minimize bundle
* size if you're not using either `signInWithPopup` or `signInWithRedirect`.
*
* For example, if your app only uses anonymous accounts and you only want
* accounts saved for the current session, initialize `Auth` with:
*
* ```js
* const auth = initializeAuth(app, {
*   persistence: browserSessionPersistence,
*   popupRedirectResolver: undefined,
* });
* ```
*
* @public
*/
function initializeAuth(app, deps) {
	const provider = _getProvider(app, "auth");
	if (provider.isInitialized()) {
		const auth = provider.getImmediate();
		if (deepEqual(provider.getOptions(), deps !== null && deps !== void 0 ? deps : {})) return auth;
		else _fail(auth, "already-initialized");
	}
	return provider.initialize({ options: deps });
}
function _initializeAuthInstance(auth, deps) {
	const persistence = (deps === null || deps === void 0 ? void 0 : deps.persistence) || [];
	const hierarchy = (Array.isArray(persistence) ? persistence : [persistence]).map(_getInstance);
	if (deps === null || deps === void 0 ? void 0 : deps.errorMap) auth._updateErrorMap(deps.errorMap);
	auth._initializeWithPersistence(hierarchy, deps === null || deps === void 0 ? void 0 : deps.popupRedirectResolver);
}
/**
* Changes the {@link Auth} instance to communicate with the Firebase Auth Emulator, instead of production
* Firebase Auth services.
*
* @remarks
* This must be called synchronously immediately following the first call to
* {@link initializeAuth}.  Do not use with production credentials as emulator
* traffic is not encrypted.
*
*
* @example
* ```javascript
* connectAuthEmulator(auth, 'http://127.0.0.1:9099', { disableWarnings: true });
* ```
*
* @param auth - The {@link Auth} instance.
* @param url - The URL at which the emulator is running (eg, 'http://localhost:9099').
* @param options - Optional. `options.disableWarnings` defaults to `false`. Set it to
* `true` to disable the warning banner attached to the DOM.
*
* @public
*/
function connectAuthEmulator(auth, url, options) {
	const authInternal = _castAuth(auth);
	_assert(/^https?:\/\//.test(url), authInternal, "invalid-emulator-scheme");
	const disableWarnings = !!(options === null || options === void 0 ? void 0 : options.disableWarnings);
	const protocol = extractProtocol(url);
	const { host, port } = extractHostAndPort(url);
	const portStr = port === null ? "" : `:${port}`;
	const emulator = { url: `${protocol}//${host}${portStr}/` };
	const emulatorConfig = Object.freeze({
		host,
		port,
		protocol: protocol.replace(":", ""),
		options: Object.freeze({ disableWarnings })
	});
	if (!authInternal._canInitEmulator) {
		_assert(authInternal.config.emulator && authInternal.emulatorConfig, authInternal, "emulator-config-failed");
		_assert(deepEqual(emulator, authInternal.config.emulator) && deepEqual(emulatorConfig, authInternal.emulatorConfig), authInternal, "emulator-config-failed");
		return;
	}
	authInternal.config.emulator = emulator;
	authInternal.emulatorConfig = emulatorConfig;
	authInternal.settings.appVerificationDisabledForTesting = true;
	if (isCloudWorkstation(host)) {
		pingServer(`${protocol}//${host}${portStr}`);
		updateEmulatorBanner("Auth", true);
	} else if (!disableWarnings) emitEmulatorWarning();
}
function extractProtocol(url) {
	const protocolEnd = url.indexOf(":");
	return protocolEnd < 0 ? "" : url.substr(0, protocolEnd + 1);
}
function extractHostAndPort(url) {
	const protocol = extractProtocol(url);
	const authority = /(\/\/)?([^?#/]+)/.exec(url.substr(protocol.length));
	if (!authority) return {
		host: "",
		port: null
	};
	const hostAndPort = authority[2].split("@").pop() || "";
	const bracketedIPv6 = /^(\[[^\]]+\])(:|$)/.exec(hostAndPort);
	if (bracketedIPv6) {
		const host = bracketedIPv6[1];
		return {
			host,
			port: parsePort(hostAndPort.substr(host.length + 1))
		};
	} else {
		const [host, port] = hostAndPort.split(":");
		return {
			host,
			port: parsePort(port)
		};
	}
}
function parsePort(portStr) {
	if (!portStr) return null;
	const port = Number(portStr);
	if (isNaN(port)) return null;
	return port;
}
function emitEmulatorWarning() {
	function attachBanner() {
		const el = document.createElement("p");
		const sty = el.style;
		el.innerText = "Running in emulator mode. Do not use with production credentials.";
		sty.position = "fixed";
		sty.width = "100%";
		sty.backgroundColor = "#ffffff";
		sty.border = ".1em solid #000000";
		sty.color = "#b50000";
		sty.bottom = "0px";
		sty.left = "0px";
		sty.margin = "0px";
		sty.zIndex = "10000";
		sty.textAlign = "center";
		el.classList.add("firebase-emulator-warning");
		document.body.appendChild(el);
	}
	if (typeof console !== "undefined" && typeof console.info === "function") {}
	if (typeof window !== "undefined" && typeof document !== "undefined") {
		if (document.readyState === "loading") window.addEventListener("DOMContentLoaded", attachBanner);
		else attachBanner();
	}
}
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
/**
* Interface that represents the credentials returned by an {@link AuthProvider}.
*
* @remarks
* Implementations specify the details about each auth provider's credential requirements.
*
* @public
*/
var AuthCredential = class {
	/** @internal */
	constructor(providerId, signInMethod) {
		this.providerId = providerId;
		this.signInMethod = signInMethod;
	}
	/**
	* Returns a JSON-serializable representation of this object.
	*
	* @returns a JSON-serializable representation of this object.
	*/
	toJSON() {
		return debugFail("not implemented");
	}
	/** @internal */
	_getIdTokenResponse(_auth) {
		return debugFail("not implemented");
	}
	/** @internal */
	_linkToIdToken(_auth, _idToken) {
		return debugFail("not implemented");
	}
	/** @internal */
	_getReauthenticationResolver(_auth) {
		return debugFail("not implemented");
	}
};
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
async function updateEmailPassword(auth, request) {
	return _performApiRequest(auth, "POST", "/v1/accounts:update", request);
}
async function linkEmailPassword(auth, request) {
	return _performApiRequest(auth, "POST", "/v1/accounts:signUp", request);
}
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
async function signInWithPassword(auth, request) {
	return _performSignInRequest(auth, "POST", "/v1/accounts:signInWithPassword", _addTidIfNecessary(auth, request));
}
async function sendOobCode(auth, request) {
	return _performApiRequest(auth, "POST", "/v1/accounts:sendOobCode", _addTidIfNecessary(auth, request));
}
async function sendPasswordResetEmail$1(auth, request) {
	return sendOobCode(auth, request);
}
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
async function signInWithEmailLink$1(auth, request) {
	return _performSignInRequest(auth, "POST", "/v1/accounts:signInWithEmailLink", _addTidIfNecessary(auth, request));
}
async function signInWithEmailLinkForLinking(auth, request) {
	return _performSignInRequest(auth, "POST", "/v1/accounts:signInWithEmailLink", _addTidIfNecessary(auth, request));
}
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
/**
* Interface that represents the credentials returned by {@link EmailAuthProvider} for
* {@link ProviderId}.PASSWORD
*
* @remarks
* Covers both {@link SignInMethod}.EMAIL_PASSWORD and
* {@link SignInMethod}.EMAIL_LINK.
*
* @public
*/
var EmailAuthCredential = class EmailAuthCredential extends AuthCredential {
	/** @internal */
	constructor(_email, _password, signInMethod, _tenantId = null) {
		super("password", signInMethod);
		this._email = _email;
		this._password = _password;
		this._tenantId = _tenantId;
	}
	/** @internal */
	static _fromEmailAndPassword(email, password) {
		return new EmailAuthCredential(email, password, "password");
	}
	/** @internal */
	static _fromEmailAndCode(email, oobCode, tenantId = null) {
		return new EmailAuthCredential(email, oobCode, "emailLink", tenantId);
	}
	/** {@inheritdoc AuthCredential.toJSON} */
	toJSON() {
		return {
			email: this._email,
			password: this._password,
			signInMethod: this.signInMethod,
			tenantId: this._tenantId
		};
	}
	/**
	* Static method to deserialize a JSON representation of an object into an {@link  AuthCredential}.
	*
	* @param json - Either `object` or the stringified representation of the object. When string is
	* provided, `JSON.parse` would be called first.
	*
	* @returns If the JSON input does not represent an {@link AuthCredential}, null is returned.
	*/
	static fromJSON(json) {
		const obj = typeof json === "string" ? JSON.parse(json) : json;
		if ((obj === null || obj === void 0 ? void 0 : obj.email) && (obj === null || obj === void 0 ? void 0 : obj.password)) {
			if (obj.signInMethod === "password") return this._fromEmailAndPassword(obj.email, obj.password);
			else if (obj.signInMethod === "emailLink") return this._fromEmailAndCode(obj.email, obj.password, obj.tenantId);
		}
		return null;
	}
	/** @internal */
	async _getIdTokenResponse(auth) {
		switch (this.signInMethod) {
			case "password": return handleRecaptchaFlow(auth, {
				returnSecureToken: true,
				email: this._email,
				password: this._password,
				clientType: "CLIENT_TYPE_WEB"
			}, "signInWithPassword", signInWithPassword, "EMAIL_PASSWORD_PROVIDER");
			case "emailLink": return signInWithEmailLink$1(auth, {
				email: this._email,
				oobCode: this._password
			});
			default: _fail(auth, "internal-error");
		}
	}
	/** @internal */
	async _linkToIdToken(auth, idToken) {
		switch (this.signInMethod) {
			case "password": return handleRecaptchaFlow(auth, {
				idToken,
				returnSecureToken: true,
				email: this._email,
				password: this._password,
				clientType: "CLIENT_TYPE_WEB"
			}, "signUpPassword", linkEmailPassword, "EMAIL_PASSWORD_PROVIDER");
			case "emailLink": return signInWithEmailLinkForLinking(auth, {
				idToken,
				email: this._email,
				oobCode: this._password
			});
			default: _fail(auth, "internal-error");
		}
	}
	/** @internal */
	_getReauthenticationResolver(auth) {
		return this._getIdTokenResponse(auth);
	}
};
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
async function signInWithIdp(auth, request) {
	return _performSignInRequest(auth, "POST", "/v1/accounts:signInWithIdp", _addTidIfNecessary(auth, request));
}
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var IDP_REQUEST_URI$1 = "http://localhost";
/**
* Represents the OAuth credentials returned by an {@link OAuthProvider}.
*
* @remarks
* Implementations specify the details about each auth provider's credential requirements.
*
* @public
*/
var OAuthCredential = class OAuthCredential extends AuthCredential {
	constructor() {
		super(...arguments);
		this.pendingToken = null;
	}
	/** @internal */
	static _fromParams(params) {
		const cred = new OAuthCredential(params.providerId, params.signInMethod);
		if (params.idToken || params.accessToken) {
			if (params.idToken) cred.idToken = params.idToken;
			if (params.accessToken) cred.accessToken = params.accessToken;
			if (params.nonce && !params.pendingToken) cred.nonce = params.nonce;
			if (params.pendingToken) cred.pendingToken = params.pendingToken;
		} else if (params.oauthToken && params.oauthTokenSecret) {
			cred.accessToken = params.oauthToken;
			cred.secret = params.oauthTokenSecret;
		} else _fail("argument-error");
		return cred;
	}
	/** {@inheritdoc AuthCredential.toJSON}  */
	toJSON() {
		return {
			idToken: this.idToken,
			accessToken: this.accessToken,
			secret: this.secret,
			nonce: this.nonce,
			pendingToken: this.pendingToken,
			providerId: this.providerId,
			signInMethod: this.signInMethod
		};
	}
	/**
	* Static method to deserialize a JSON representation of an object into an
	* {@link  AuthCredential}.
	*
	* @param json - Input can be either Object or the stringified representation of the object.
	* When string is provided, JSON.parse would be called first.
	*
	* @returns If the JSON input does not represent an {@link  AuthCredential}, null is returned.
	*/
	static fromJSON(json) {
		const obj = typeof json === "string" ? JSON.parse(json) : json;
		const { providerId, signInMethod } = obj, rest = __rest(obj, ["providerId", "signInMethod"]);
		if (!providerId || !signInMethod) return null;
		const cred = new OAuthCredential(providerId, signInMethod);
		cred.idToken = rest.idToken || void 0;
		cred.accessToken = rest.accessToken || void 0;
		cred.secret = rest.secret;
		cred.nonce = rest.nonce;
		cred.pendingToken = rest.pendingToken || null;
		return cred;
	}
	/** @internal */
	_getIdTokenResponse(auth) {
		return signInWithIdp(auth, this.buildRequest());
	}
	/** @internal */
	_linkToIdToken(auth, idToken) {
		const request = this.buildRequest();
		request.idToken = idToken;
		return signInWithIdp(auth, request);
	}
	/** @internal */
	_getReauthenticationResolver(auth) {
		const request = this.buildRequest();
		request.autoCreate = false;
		return signInWithIdp(auth, request);
	}
	buildRequest() {
		const request = {
			requestUri: IDP_REQUEST_URI$1,
			returnSecureToken: true
		};
		if (this.pendingToken) request.pendingToken = this.pendingToken;
		else {
			const postBody = {};
			if (this.idToken) postBody["id_token"] = this.idToken;
			if (this.accessToken) postBody["access_token"] = this.accessToken;
			if (this.secret) postBody["oauth_token_secret"] = this.secret;
			postBody["providerId"] = this.providerId;
			if (this.nonce && !this.pendingToken) postBody["nonce"] = this.nonce;
			request.postBody = querystring(postBody);
		}
		return request;
	}
};
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
async function sendPhoneVerificationCode(auth, request) {
	return _performApiRequest(auth, "POST", "/v1/accounts:sendVerificationCode", _addTidIfNecessary(auth, request));
}
async function signInWithPhoneNumber$1(auth, request) {
	return _performSignInRequest(auth, "POST", "/v1/accounts:signInWithPhoneNumber", _addTidIfNecessary(auth, request));
}
async function linkWithPhoneNumber$1(auth, request) {
	const response = await _performSignInRequest(auth, "POST", "/v1/accounts:signInWithPhoneNumber", _addTidIfNecessary(auth, request));
	if (response.temporaryProof) throw _makeTaggedError(auth, "account-exists-with-different-credential", response);
	return response;
}
var VERIFY_PHONE_NUMBER_FOR_EXISTING_ERROR_MAP_ = { ["USER_NOT_FOUND"]: "user-not-found" };
async function verifyPhoneNumberForExisting(auth, request) {
	return _performSignInRequest(auth, "POST", "/v1/accounts:signInWithPhoneNumber", _addTidIfNecessary(auth, Object.assign(Object.assign({}, request), { operation: "REAUTH" })), VERIFY_PHONE_NUMBER_FOR_EXISTING_ERROR_MAP_);
}
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
/**
* Represents the credentials returned by {@link PhoneAuthProvider}.
*
* @public
*/
var PhoneAuthCredential = class PhoneAuthCredential extends AuthCredential {
	constructor(params) {
		super("phone", "phone");
		this.params = params;
	}
	/** @internal */
	static _fromVerification(verificationId, verificationCode) {
		return new PhoneAuthCredential({
			verificationId,
			verificationCode
		});
	}
	/** @internal */
	static _fromTokenResponse(phoneNumber, temporaryProof) {
		return new PhoneAuthCredential({
			phoneNumber,
			temporaryProof
		});
	}
	/** @internal */
	_getIdTokenResponse(auth) {
		return signInWithPhoneNumber$1(auth, this._makeVerificationRequest());
	}
	/** @internal */
	_linkToIdToken(auth, idToken) {
		return linkWithPhoneNumber$1(auth, Object.assign({ idToken }, this._makeVerificationRequest()));
	}
	/** @internal */
	_getReauthenticationResolver(auth) {
		return verifyPhoneNumberForExisting(auth, this._makeVerificationRequest());
	}
	/** @internal */
	_makeVerificationRequest() {
		const { temporaryProof, phoneNumber, verificationId, verificationCode } = this.params;
		if (temporaryProof && phoneNumber) return {
			temporaryProof,
			phoneNumber
		};
		return {
			sessionInfo: verificationId,
			code: verificationCode
		};
	}
	/** {@inheritdoc AuthCredential.toJSON} */
	toJSON() {
		const obj = { providerId: this.providerId };
		if (this.params.phoneNumber) obj.phoneNumber = this.params.phoneNumber;
		if (this.params.temporaryProof) obj.temporaryProof = this.params.temporaryProof;
		if (this.params.verificationCode) obj.verificationCode = this.params.verificationCode;
		if (this.params.verificationId) obj.verificationId = this.params.verificationId;
		return obj;
	}
	/** Generates a phone credential based on a plain object or a JSON string. */
	static fromJSON(json) {
		if (typeof json === "string") json = JSON.parse(json);
		const { verificationId, verificationCode, phoneNumber, temporaryProof } = json;
		if (!verificationCode && !verificationId && !phoneNumber && !temporaryProof) return null;
		return new PhoneAuthCredential({
			verificationId,
			verificationCode,
			phoneNumber,
			temporaryProof
		});
	}
};
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
/**
* Maps the mode string in action code URL to Action Code Info operation.
*
* @param mode
*/
function parseMode(mode) {
	switch (mode) {
		case "recoverEmail": return "RECOVER_EMAIL";
		case "resetPassword": return "PASSWORD_RESET";
		case "signIn": return "EMAIL_SIGNIN";
		case "verifyEmail": return "VERIFY_EMAIL";
		case "verifyAndChangeEmail": return "VERIFY_AND_CHANGE_EMAIL";
		case "revertSecondFactorAddition": return "REVERT_SECOND_FACTOR_ADDITION";
		default: return null;
	}
}
/**
* Helper to parse FDL links
*
* @param url
*/
function parseDeepLink(url) {
	const link = querystringDecode(extractQuerystring(url))["link"];
	const doubleDeepLink = link ? querystringDecode(extractQuerystring(link))["deep_link_id"] : null;
	const iOSDeepLink = querystringDecode(extractQuerystring(url))["deep_link_id"];
	return (iOSDeepLink ? querystringDecode(extractQuerystring(iOSDeepLink))["link"] : null) || iOSDeepLink || doubleDeepLink || link || url;
}
/**
* A utility class to parse email action URLs such as password reset, email verification,
* email link sign in, etc.
*
* @public
*/
var ActionCodeURL = class ActionCodeURL {
	/**
	* @param actionLink - The link from which to extract the URL.
	* @returns The {@link ActionCodeURL} object, or null if the link is invalid.
	*
	* @internal
	*/
	constructor(actionLink) {
		var _a;
		var _b;
		var _c;
		var _d;
		var _e;
		var _f;
		const searchParams = querystringDecode(extractQuerystring(actionLink));
		const apiKey = (_a = searchParams["apiKey"]) !== null && _a !== void 0 ? _a : null;
		const code = (_b = searchParams["oobCode"]) !== null && _b !== void 0 ? _b : null;
		const operation = parseMode((_c = searchParams["mode"]) !== null && _c !== void 0 ? _c : null);
		_assert(apiKey && code && operation, "argument-error");
		this.apiKey = apiKey;
		this.operation = operation;
		this.code = code;
		this.continueUrl = (_d = searchParams["continueUrl"]) !== null && _d !== void 0 ? _d : null;
		this.languageCode = (_e = searchParams["lang"]) !== null && _e !== void 0 ? _e : null;
		this.tenantId = (_f = searchParams["tenantId"]) !== null && _f !== void 0 ? _f : null;
	}
	/**
	* Parses the email action link string and returns an {@link ActionCodeURL} if the link is valid,
	* otherwise returns null.
	*
	* @param link  - The email action link string.
	* @returns The {@link ActionCodeURL} object, or null if the link is invalid.
	*
	* @public
	*/
	static parseLink(link) {
		const actionLink = parseDeepLink(link);
		try {
			return new ActionCodeURL(actionLink);
		} catch (_a) {
			return null;
		}
	}
};
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
/**
* Provider for generating {@link EmailAuthCredential}.
*
* @public
*/
var EmailAuthProvider = class EmailAuthProvider {
	constructor() {
		/**
		* Always set to {@link ProviderId}.PASSWORD, even for email link.
		*/
		this.providerId = EmailAuthProvider.PROVIDER_ID;
	}
	/**
	* Initialize an {@link AuthCredential} using an email and password.
	*
	* @example
	* ```javascript
	* const authCredential = EmailAuthProvider.credential(email, password);
	* const userCredential = await signInWithCredential(auth, authCredential);
	* ```
	*
	* @example
	* ```javascript
	* const userCredential = await signInWithEmailAndPassword(auth, email, password);
	* ```
	*
	* @param email - Email address.
	* @param password - User account password.
	* @returns The auth provider credential.
	*/
	static credential(email, password) {
		return EmailAuthCredential._fromEmailAndPassword(email, password);
	}
	/**
	* Initialize an {@link AuthCredential} using an email and an email link after a sign in with
	* email link operation.
	*
	* @example
	* ```javascript
	* const authCredential = EmailAuthProvider.credentialWithLink(auth, email, emailLink);
	* const userCredential = await signInWithCredential(auth, authCredential);
	* ```
	*
	* @example
	* ```javascript
	* await sendSignInLinkToEmail(auth, email);
	* // Obtain emailLink from user.
	* const userCredential = await signInWithEmailLink(auth, email, emailLink);
	* ```
	*
	* @param auth - The {@link Auth} instance used to verify the link.
	* @param email - Email address.
	* @param emailLink - Sign-in email link.
	* @returns - The auth provider credential.
	*/
	static credentialWithLink(email, emailLink) {
		const actionCodeUrl = ActionCodeURL.parseLink(emailLink);
		_assert(actionCodeUrl, "argument-error");
		return EmailAuthCredential._fromEmailAndCode(email, actionCodeUrl.code, actionCodeUrl.tenantId);
	}
};
/**
* Always set to {@link ProviderId}.PASSWORD, even for email link.
*/
EmailAuthProvider.PROVIDER_ID = "password";
/**
* Always set to {@link SignInMethod}.EMAIL_PASSWORD.
*/
EmailAuthProvider.EMAIL_PASSWORD_SIGN_IN_METHOD = "password";
/**
* Always set to {@link SignInMethod}.EMAIL_LINK.
*/
EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD = "emailLink";
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
/**
* The base class for all Federated providers (OAuth (including OIDC), SAML).
*
* This class is not meant to be instantiated directly.
*
* @public
*/
var FederatedAuthProvider = class {
	/**
	* Constructor for generic OAuth providers.
	*
	* @param providerId - Provider for which credentials should be generated.
	*/
	constructor(providerId) {
		this.providerId = providerId;
		/** @internal */
		this.defaultLanguageCode = null;
		/** @internal */
		this.customParameters = {};
	}
	/**
	* Set the language gode.
	*
	* @param languageCode - language code
	*/
	setDefaultLanguage(languageCode) {
		this.defaultLanguageCode = languageCode;
	}
	/**
	* Sets the OAuth custom parameters to pass in an OAuth request for popup and redirect sign-in
	* operations.
	*
	* @remarks
	* For a detailed list, check the reserved required OAuth 2.0 parameters such as `client_id`,
	* `redirect_uri`, `scope`, `response_type`, and `state` are not allowed and will be ignored.
	*
	* @param customOAuthParameters - The custom OAuth parameters to pass in the OAuth request.
	*/
	setCustomParameters(customOAuthParameters) {
		this.customParameters = customOAuthParameters;
		return this;
	}
	/**
	* Retrieve the current list of {@link CustomParameters}.
	*/
	getCustomParameters() {
		return this.customParameters;
	}
};
/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
/**
* Common code to all OAuth providers. This is separate from the
* {@link OAuthProvider} so that child providers (like
* {@link GoogleAuthProvider}) don't inherit the `credential` instance method.
* Instead, they rely on a static `credential` method.
*/
var BaseOAuthProvider = class extends FederatedAuthProvider {
	constructor() {
		super(...arguments);
		/** @internal */
		this.scopes = [];
	}
	/**
	* Add an OAuth scope to the credential.
	*
	* @param scope - Provider OAuth scope to add.
	*/
	addScope(scope) {
		if (!this.scopes.includes(scope)) this.scopes.push(scope);
		return this;
	}
	/**
	* Retrieve the current list of OAuth scopes.
	*/
	getScopes() {
		return [...this.scopes];
	}
};
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
/**
* Provider for generating an {@link OAuthCredential} for {@link ProviderId}.FACEBOOK.
*
* @example
* ```javascript
* // Sign in using a redirect.
* const provider = new FacebookAuthProvider();
* // Start a sign in process for an unauthenticated user.
* provider.addScope('user_birthday');
* await signInWithRedirect(auth, provider);
* // This will trigger a full page redirect away from your app
*
* // After returning from the redirect when your app initializes you can obtain the result
* const result = await getRedirectResult(auth);
* if (result) {
*   // This is the signed-in user
*   const user = result.user;
*   // This gives you a Facebook Access Token.
*   const credential = FacebookAuthProvider.credentialFromResult(result);
*   const token = credential.accessToken;
* }
* ```
*
* @example
* ```javascript
* // Sign in using a popup.
* const provider = new FacebookAuthProvider();
* provider.addScope('user_birthday');
* const result = await signInWithPopup(auth, provider);
*
* // The signed-in user info.
* const user = result.user;
* // This gives you a Facebook Access Token.
* const credential = FacebookAuthProvider.credentialFromResult(result);
* const token = credential.accessToken;
* ```
*
* @public
*/
var FacebookAuthProvider = class FacebookAuthProvider extends BaseOAuthProvider {
	constructor() {
		super("facebook.com");
	}
	/**
	* Creates a credential for Facebook.
	*
	* @example
	* ```javascript
	* // `event` from the Facebook auth.authResponseChange callback.
	* const credential = FacebookAuthProvider.credential(event.authResponse.accessToken);
	* const result = await signInWithCredential(credential);
	* ```
	*
	* @param accessToken - Facebook access token.
	*/
	static credential(accessToken) {
		return OAuthCredential._fromParams({
			providerId: FacebookAuthProvider.PROVIDER_ID,
			signInMethod: FacebookAuthProvider.FACEBOOK_SIGN_IN_METHOD,
			accessToken
		});
	}
	/**
	* Used to extract the underlying {@link OAuthCredential} from a {@link UserCredential}.
	*
	* @param userCredential - The user credential.
	*/
	static credentialFromResult(userCredential) {
		return FacebookAuthProvider.credentialFromTaggedObject(userCredential);
	}
	/**
	* Used to extract the underlying {@link OAuthCredential} from a {@link AuthError} which was
	* thrown during a sign-in, link, or reauthenticate operation.
	*
	* @param userCredential - The user credential.
	*/
	static credentialFromError(error) {
		return FacebookAuthProvider.credentialFromTaggedObject(error.customData || {});
	}
	static credentialFromTaggedObject({ _tokenResponse: tokenResponse }) {
		if (!tokenResponse || !("oauthAccessToken" in tokenResponse)) return null;
		if (!tokenResponse.oauthAccessToken) return null;
		try {
			return FacebookAuthProvider.credential(tokenResponse.oauthAccessToken);
		} catch (_a) {
			return null;
		}
	}
};
/** Always set to {@link SignInMethod}.FACEBOOK. */
FacebookAuthProvider.FACEBOOK_SIGN_IN_METHOD = "facebook.com";
/** Always set to {@link ProviderId}.FACEBOOK. */
FacebookAuthProvider.PROVIDER_ID = "facebook.com";
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
/**
* Provider for generating an {@link OAuthCredential} for {@link ProviderId}.GOOGLE.
*
* @example
* ```javascript
* // Sign in using a redirect.
* const provider = new GoogleAuthProvider();
* // Start a sign in process for an unauthenticated user.
* provider.addScope('profile');
* provider.addScope('email');
* await signInWithRedirect(auth, provider);
* // This will trigger a full page redirect away from your app
*
* // After returning from the redirect when your app initializes you can obtain the result
* const result = await getRedirectResult(auth);
* if (result) {
*   // This is the signed-in user
*   const user = result.user;
*   // This gives you a Google Access Token.
*   const credential = GoogleAuthProvider.credentialFromResult(result);
*   const token = credential.accessToken;
* }
* ```
*
* @example
* ```javascript
* // Sign in using a popup.
* const provider = new GoogleAuthProvider();
* provider.addScope('profile');
* provider.addScope('email');
* const result = await signInWithPopup(auth, provider);
*
* // The signed-in user info.
* const user = result.user;
* // This gives you a Google Access Token.
* const credential = GoogleAuthProvider.credentialFromResult(result);
* const token = credential.accessToken;
* ```
*
* @public
*/
var GoogleAuthProvider = class GoogleAuthProvider extends BaseOAuthProvider {
	constructor() {
		super("google.com");
		this.addScope("profile");
	}
	/**
	* Creates a credential for Google. At least one of ID token and access token is required.
	*
	* @example
	* ```javascript
	* // \`googleUser\` from the onsuccess Google Sign In callback.
	* const credential = GoogleAuthProvider.credential(googleUser.getAuthResponse().id_token);
	* const result = await signInWithCredential(credential);
	* ```
	*
	* @param idToken - Google ID token.
	* @param accessToken - Google access token.
	*/
	static credential(idToken, accessToken) {
		return OAuthCredential._fromParams({
			providerId: GoogleAuthProvider.PROVIDER_ID,
			signInMethod: GoogleAuthProvider.GOOGLE_SIGN_IN_METHOD,
			idToken,
			accessToken
		});
	}
	/**
	* Used to extract the underlying {@link OAuthCredential} from a {@link UserCredential}.
	*
	* @param userCredential - The user credential.
	*/
	static credentialFromResult(userCredential) {
		return GoogleAuthProvider.credentialFromTaggedObject(userCredential);
	}
	/**
	* Used to extract the underlying {@link OAuthCredential} from a {@link AuthError} which was
	* thrown during a sign-in, link, or reauthenticate operation.
	*
	* @param userCredential - The user credential.
	*/
	static credentialFromError(error) {
		return GoogleAuthProvider.credentialFromTaggedObject(error.customData || {});
	}
	static credentialFromTaggedObject({ _tokenResponse: tokenResponse }) {
		if (!tokenResponse) return null;
		const { oauthIdToken, oauthAccessToken } = tokenResponse;
		if (!oauthIdToken && !oauthAccessToken) return null;
		try {
			return GoogleAuthProvider.credential(oauthIdToken, oauthAccessToken);
		} catch (_a) {
			return null;
		}
	}
};
/** Always set to {@link SignInMethod}.GOOGLE. */
GoogleAuthProvider.GOOGLE_SIGN_IN_METHOD = "google.com";
/** Always set to {@link ProviderId}.GOOGLE. */
GoogleAuthProvider.PROVIDER_ID = "google.com";
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
/**
* Provider for generating an {@link OAuthCredential} for {@link ProviderId}.GITHUB.
*
* @remarks
* GitHub requires an OAuth 2.0 redirect, so you can either handle the redirect directly, or use
* the {@link signInWithPopup} handler:
*
* @example
* ```javascript
* // Sign in using a redirect.
* const provider = new GithubAuthProvider();
* // Start a sign in process for an unauthenticated user.
* provider.addScope('repo');
* await signInWithRedirect(auth, provider);
* // This will trigger a full page redirect away from your app
*
* // After returning from the redirect when your app initializes you can obtain the result
* const result = await getRedirectResult(auth);
* if (result) {
*   // This is the signed-in user
*   const user = result.user;
*   // This gives you a GitHub Access Token.
*   const credential = GithubAuthProvider.credentialFromResult(result);
*   const token = credential.accessToken;
* }
* ```
*
* @example
* ```javascript
* // Sign in using a popup.
* const provider = new GithubAuthProvider();
* provider.addScope('repo');
* const result = await signInWithPopup(auth, provider);
*
* // The signed-in user info.
* const user = result.user;
* // This gives you a GitHub Access Token.
* const credential = GithubAuthProvider.credentialFromResult(result);
* const token = credential.accessToken;
* ```
* @public
*/
var GithubAuthProvider = class GithubAuthProvider extends BaseOAuthProvider {
	constructor() {
		super("github.com");
	}
	/**
	* Creates a credential for GitHub.
	*
	* @param accessToken - GitHub access token.
	*/
	static credential(accessToken) {
		return OAuthCredential._fromParams({
			providerId: GithubAuthProvider.PROVIDER_ID,
			signInMethod: GithubAuthProvider.GITHUB_SIGN_IN_METHOD,
			accessToken
		});
	}
	/**
	* Used to extract the underlying {@link OAuthCredential} from a {@link UserCredential}.
	*
	* @param userCredential - The user credential.
	*/
	static credentialFromResult(userCredential) {
		return GithubAuthProvider.credentialFromTaggedObject(userCredential);
	}
	/**
	* Used to extract the underlying {@link OAuthCredential} from a {@link AuthError} which was
	* thrown during a sign-in, link, or reauthenticate operation.
	*
	* @param userCredential - The user credential.
	*/
	static credentialFromError(error) {
		return GithubAuthProvider.credentialFromTaggedObject(error.customData || {});
	}
	static credentialFromTaggedObject({ _tokenResponse: tokenResponse }) {
		if (!tokenResponse || !("oauthAccessToken" in tokenResponse)) return null;
		if (!tokenResponse.oauthAccessToken) return null;
		try {
			return GithubAuthProvider.credential(tokenResponse.oauthAccessToken);
		} catch (_a) {
			return null;
		}
	}
};
/** Always set to {@link SignInMethod}.GITHUB. */
GithubAuthProvider.GITHUB_SIGN_IN_METHOD = "github.com";
/** Always set to {@link ProviderId}.GITHUB. */
GithubAuthProvider.PROVIDER_ID = "github.com";
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
/**
* Provider for generating an {@link OAuthCredential} for {@link ProviderId}.TWITTER.
*
* @example
* ```javascript
* // Sign in using a redirect.
* const provider = new TwitterAuthProvider();
* // Start a sign in process for an unauthenticated user.
* await signInWithRedirect(auth, provider);
* // This will trigger a full page redirect away from your app
*
* // After returning from the redirect when your app initializes you can obtain the result
* const result = await getRedirectResult(auth);
* if (result) {
*   // This is the signed-in user
*   const user = result.user;
*   // This gives you a Twitter Access Token and Secret.
*   const credential = TwitterAuthProvider.credentialFromResult(result);
*   const token = credential.accessToken;
*   const secret = credential.secret;
* }
* ```
*
* @example
* ```javascript
* // Sign in using a popup.
* const provider = new TwitterAuthProvider();
* const result = await signInWithPopup(auth, provider);
*
* // The signed-in user info.
* const user = result.user;
* // This gives you a Twitter Access Token and Secret.
* const credential = TwitterAuthProvider.credentialFromResult(result);
* const token = credential.accessToken;
* const secret = credential.secret;
* ```
*
* @public
*/
var TwitterAuthProvider = class TwitterAuthProvider extends BaseOAuthProvider {
	constructor() {
		super("twitter.com");
	}
	/**
	* Creates a credential for Twitter.
	*
	* @param token - Twitter access token.
	* @param secret - Twitter secret.
	*/
	static credential(token, secret) {
		return OAuthCredential._fromParams({
			providerId: TwitterAuthProvider.PROVIDER_ID,
			signInMethod: TwitterAuthProvider.TWITTER_SIGN_IN_METHOD,
			oauthToken: token,
			oauthTokenSecret: secret
		});
	}
	/**
	* Used to extract the underlying {@link OAuthCredential} from a {@link UserCredential}.
	*
	* @param userCredential - The user credential.
	*/
	static credentialFromResult(userCredential) {
		return TwitterAuthProvider.credentialFromTaggedObject(userCredential);
	}
	/**
	* Used to extract the underlying {@link OAuthCredential} from a {@link AuthError} which was
	* thrown during a sign-in, link, or reauthenticate operation.
	*
	* @param userCredential - The user credential.
	*/
	static credentialFromError(error) {
		return TwitterAuthProvider.credentialFromTaggedObject(error.customData || {});
	}
	static credentialFromTaggedObject({ _tokenResponse: tokenResponse }) {
		if (!tokenResponse) return null;
		const { oauthAccessToken, oauthTokenSecret } = tokenResponse;
		if (!oauthAccessToken || !oauthTokenSecret) return null;
		try {
			return TwitterAuthProvider.credential(oauthAccessToken, oauthTokenSecret);
		} catch (_a) {
			return null;
		}
	}
};
/** Always set to {@link SignInMethod}.TWITTER. */
TwitterAuthProvider.TWITTER_SIGN_IN_METHOD = "twitter.com";
/** Always set to {@link ProviderId}.TWITTER. */
TwitterAuthProvider.PROVIDER_ID = "twitter.com";
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
async function signUp(auth, request) {
	return _performSignInRequest(auth, "POST", "/v1/accounts:signUp", _addTidIfNecessary(auth, request));
}
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var UserCredentialImpl = class UserCredentialImpl {
	constructor(params) {
		this.user = params.user;
		this.providerId = params.providerId;
		this._tokenResponse = params._tokenResponse;
		this.operationType = params.operationType;
	}
	static async _fromIdTokenResponse(auth, operationType, idTokenResponse, isAnonymous = false) {
		const user = await UserImpl._fromIdTokenResponse(auth, idTokenResponse, isAnonymous);
		const providerId = providerIdForResponse(idTokenResponse);
		return new UserCredentialImpl({
			user,
			providerId,
			_tokenResponse: idTokenResponse,
			operationType
		});
	}
	static async _forOperation(user, operationType, response) {
		await user._updateTokensIfNecessary(response, true);
		const providerId = providerIdForResponse(response);
		return new UserCredentialImpl({
			user,
			providerId,
			_tokenResponse: response,
			operationType
		});
	}
};
function providerIdForResponse(response) {
	if (response.providerId) return response.providerId;
	if ("phoneNumber" in response) return "phone";
	return null;
}
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var MultiFactorError = class MultiFactorError extends FirebaseError {
	constructor(auth, error, operationType, user) {
		var _a;
		super(error.code, error.message);
		this.operationType = operationType;
		this.user = user;
		Object.setPrototypeOf(this, MultiFactorError.prototype);
		this.customData = {
			appName: auth.name,
			tenantId: (_a = auth.tenantId) !== null && _a !== void 0 ? _a : void 0,
			_serverResponse: error.customData._serverResponse,
			operationType
		};
	}
	static _fromErrorAndOperation(auth, error, operationType, user) {
		return new MultiFactorError(auth, error, operationType, user);
	}
};
function _processCredentialSavingMfaContextIfNecessary(auth, operationType, credential, user) {
	return (operationType === "reauthenticate" ? credential._getReauthenticationResolver(auth) : credential._getIdTokenResponse(auth)).catch((error) => {
		if (error.code === `auth/multi-factor-auth-required`) throw MultiFactorError._fromErrorAndOperation(auth, error, operationType, user);
		throw error;
	});
}
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
async function _link$1(user, credential, bypassAuthState = false) {
	const response = await _logoutIfInvalidated(user, credential._linkToIdToken(user.auth, await user.getIdToken()), bypassAuthState);
	return UserCredentialImpl._forOperation(user, "link", response);
}
/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
async function _reauthenticate(user, credential, bypassAuthState = false) {
	const { auth } = user;
	if (_isFirebaseServerApp(auth.app)) return Promise.reject(_serverAppCurrentUserOperationNotSupportedError(auth));
	const operationType = "reauthenticate";
	try {
		const response = await _logoutIfInvalidated(user, _processCredentialSavingMfaContextIfNecessary(auth, operationType, credential, user), bypassAuthState);
		_assert(response.idToken, auth, "internal-error");
		const parsed = _parseToken(response.idToken);
		_assert(parsed, auth, "internal-error");
		const { sub: localId } = parsed;
		_assert(user.uid === localId, auth, "user-mismatch");
		return UserCredentialImpl._forOperation(user, operationType, response);
	} catch (e) {
		if ((e === null || e === void 0 ? void 0 : e.code) === `auth/user-not-found`) _fail(auth, "user-mismatch");
		throw e;
	}
}
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
async function _signInWithCredential(auth, credential, bypassAuthState = false) {
	if (_isFirebaseServerApp(auth.app)) return Promise.reject(_serverAppCurrentUserOperationNotSupportedError(auth));
	const operationType = "signIn";
	const response = await _processCredentialSavingMfaContextIfNecessary(auth, operationType, credential);
	const userCredential = await UserCredentialImpl._fromIdTokenResponse(auth, operationType, response);
	if (!bypassAuthState) await auth._updateCurrentUser(userCredential.user);
	return userCredential;
}
/**
* Asynchronously signs in with the given credentials.
*
* @remarks
* An {@link AuthProvider} can be used to generate the credential.
*
* This method is not supported by {@link Auth} instances created with a
* {@link @firebase/app#FirebaseServerApp}.
*
* @param auth - The {@link Auth} instance.
* @param credential - The auth credential.
*
* @public
*/
async function signInWithCredential(auth, credential) {
	return _signInWithCredential(_castAuth(auth), credential);
}
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
function _setActionCodeSettingsOnRequest(auth, request, actionCodeSettings) {
	var _a;
	_assert(((_a = actionCodeSettings.url) === null || _a === void 0 ? void 0 : _a.length) > 0, auth, "invalid-continue-uri");
	_assert(typeof actionCodeSettings.dynamicLinkDomain === "undefined" || actionCodeSettings.dynamicLinkDomain.length > 0, auth, "invalid-dynamic-link-domain");
	_assert(typeof actionCodeSettings.linkDomain === "undefined" || actionCodeSettings.linkDomain.length > 0, auth, "invalid-hosting-link-domain");
	request.continueUrl = actionCodeSettings.url;
	request.dynamicLinkDomain = actionCodeSettings.dynamicLinkDomain;
	request.linkDomain = actionCodeSettings.linkDomain;
	request.canHandleCodeInApp = actionCodeSettings.handleCodeInApp;
	if (actionCodeSettings.iOS) {
		_assert(actionCodeSettings.iOS.bundleId.length > 0, auth, "missing-ios-bundle-id");
		request.iOSBundleId = actionCodeSettings.iOS.bundleId;
	}
	if (actionCodeSettings.android) {
		_assert(actionCodeSettings.android.packageName.length > 0, auth, "missing-android-pkg-name");
		request.androidInstallApp = actionCodeSettings.android.installApp;
		request.androidMinimumVersionCode = actionCodeSettings.android.minimumVersion;
		request.androidPackageName = actionCodeSettings.android.packageName;
	}
}
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
/**
* Updates the password policy cached in the {@link Auth} instance if a policy is already
* cached for the project or tenant.
*
* @remarks
* We only fetch the password policy if the password did not meet policy requirements and
* there is an existing policy cached. A developer must call validatePassword at least
* once for the cache to be automatically updated.
*
* @param auth - The {@link Auth} instance.
*
* @private
*/
async function recachePasswordPolicy(auth) {
	const authInternal = _castAuth(auth);
	if (authInternal._getPasswordPolicyInternal()) await authInternal._updatePasswordPolicy();
}
/**
* Sends a password reset email to the given email address. This method does not throw an error when
* there's no user account with the given email address and
* {@link https://cloud.google.com/identity-platform/docs/admin/email-enumeration-protection | Email Enumeration Protection}
* is enabled.
*
* @remarks
* To complete the password reset, call {@link confirmPasswordReset} with the code supplied in
* the email sent to the user, along with the new password specified by the user.
*
* @example
* ```javascript
* const actionCodeSettings = {
*   url: 'https://www.example.com/?email=user@example.com',
*   iOS: {
*      bundleId: 'com.example.ios'
*   },
*   android: {
*     packageName: 'com.example.android',
*     installApp: true,
*     minimumVersion: '12'
*   },
*   handleCodeInApp: true
* };
* await sendPasswordResetEmail(auth, 'user@example.com', actionCodeSettings);
* // Obtain code from user.
* await confirmPasswordReset('user@example.com', code);
* ```
*
* @param auth - The {@link Auth} instance.
* @param email - The user's email address.
* @param actionCodeSettings - The {@link ActionCodeSettings}.
*
* @public
*/
async function sendPasswordResetEmail(auth, email, actionCodeSettings) {
	const authInternal = _castAuth(auth);
	const request = {
		requestType: "PASSWORD_RESET",
		email,
		clientType: "CLIENT_TYPE_WEB"
	};
	if (actionCodeSettings) _setActionCodeSettingsOnRequest(authInternal, request, actionCodeSettings);
	await handleRecaptchaFlow(authInternal, request, "getOobCode", sendPasswordResetEmail$1, "EMAIL_PASSWORD_PROVIDER");
}
/**
* Creates a new user account associated with the specified email address and password.
*
* @remarks
* On successful creation of the user account, this user will also be signed in to your application.
*
* User account creation can fail if the account already exists or the password is invalid.
*
* This method is not supported on {@link Auth} instances created with a
* {@link @firebase/app#FirebaseServerApp}.
*
* Note: The email address acts as a unique identifier for the user and enables an email-based
* password reset. This function will create a new user account and set the initial user password.
*
* @param auth - The {@link Auth} instance.
* @param email - The user's email address.
* @param password - The user's chosen password.
*
* @public
*/
async function createUserWithEmailAndPassword(auth, email, password) {
	if (_isFirebaseServerApp(auth.app)) return Promise.reject(_serverAppCurrentUserOperationNotSupportedError(auth));
	const authInternal = _castAuth(auth);
	const response = await handleRecaptchaFlow(authInternal, {
		returnSecureToken: true,
		email,
		password,
		clientType: "CLIENT_TYPE_WEB"
	}, "signUpPassword", signUp, "EMAIL_PASSWORD_PROVIDER").catch((error) => {
		if (error.code === `auth/password-does-not-meet-requirements`) recachePasswordPolicy(auth);
		throw error;
	});
	const userCredential = await UserCredentialImpl._fromIdTokenResponse(authInternal, "signIn", response);
	await authInternal._updateCurrentUser(userCredential.user);
	return userCredential;
}
/**
* Asynchronously signs in using an email and password.
*
* @remarks
* Fails with an error if the email address and password do not match. When
* {@link https://cloud.google.com/identity-platform/docs/admin/email-enumeration-protection | Email Enumeration Protection}
* is enabled, this method fails with "auth/invalid-credential" in case of an invalid
* email/password.
*
* This method is not supported on {@link Auth} instances created with a
* {@link @firebase/app#FirebaseServerApp}.
*
* Note: The user's password is NOT the password used to access the user's email account. The
* email address serves as a unique identifier for the user, and the password is used to access
* the user's account in your Firebase project. See also: {@link createUserWithEmailAndPassword}.
*
*
* @param auth - The {@link Auth} instance.
* @param email - The users email address.
* @param password - The users password.
*
* @public
*/
function signInWithEmailAndPassword(auth, email, password) {
	if (_isFirebaseServerApp(auth.app)) return Promise.reject(_serverAppCurrentUserOperationNotSupportedError(auth));
	return signInWithCredential(getModularInstance(auth), EmailAuthProvider.credential(email, password)).catch(async (error) => {
		if (error.code === `auth/password-does-not-meet-requirements`) recachePasswordPolicy(auth);
		throw error;
	});
}
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
/**
* Updates the user's password.
*
* @remarks
* Important: this is a security sensitive operation that requires the user to have recently signed
* in. If this requirement isn't met, ask the user to authenticate again and then call
* {@link reauthenticateWithCredential}.
*
* @param user - The user.
* @param newPassword - The new password.
*
* @public
*/
function updatePassword(user, newPassword) {
	return updateEmailOrPassword(getModularInstance(user), null, newPassword);
}
async function updateEmailOrPassword(user, email, password) {
	const { auth } = user;
	const request = {
		idToken: await user.getIdToken(),
		returnSecureToken: true
	};
	if (email) request.email = email;
	if (password) request.password = password;
	const response = await _logoutIfInvalidated(user, updateEmailPassword(auth, request));
	await user._updateTokensIfNecessary(response, true);
}
/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
/**
* Parse the `AdditionalUserInfo` from the ID token response.
*
*/
function _fromIdTokenResponse(idTokenResponse) {
	var _a;
	var _b;
	if (!idTokenResponse) return null;
	const { providerId } = idTokenResponse;
	const profile = idTokenResponse.rawUserInfo ? JSON.parse(idTokenResponse.rawUserInfo) : {};
	const isNewUser = idTokenResponse.isNewUser || idTokenResponse.kind === "identitytoolkit#SignupNewUserResponse";
	if (!providerId && (idTokenResponse === null || idTokenResponse === void 0 ? void 0 : idTokenResponse.idToken)) {
		const signInProvider = (_b = (_a = _parseToken(idTokenResponse.idToken)) === null || _a === void 0 ? void 0 : _a.firebase) === null || _b === void 0 ? void 0 : _b["sign_in_provider"];
		if (signInProvider) return new GenericAdditionalUserInfo(isNewUser, signInProvider !== "anonymous" && signInProvider !== "custom" ? signInProvider : null);
	}
	if (!providerId) return null;
	switch (providerId) {
		case "facebook.com": return new FacebookAdditionalUserInfo(isNewUser, profile);
		case "github.com": return new GithubAdditionalUserInfo(isNewUser, profile);
		case "google.com": return new GoogleAdditionalUserInfo(isNewUser, profile);
		case "twitter.com": return new TwitterAdditionalUserInfo(isNewUser, profile, idTokenResponse.screenName || null);
		case "custom":
		case "anonymous": return new GenericAdditionalUserInfo(isNewUser, null);
		default: return new GenericAdditionalUserInfo(isNewUser, providerId, profile);
	}
}
var GenericAdditionalUserInfo = class {
	constructor(isNewUser, providerId, profile = {}) {
		this.isNewUser = isNewUser;
		this.providerId = providerId;
		this.profile = profile;
	}
};
var FederatedAdditionalUserInfoWithUsername = class extends GenericAdditionalUserInfo {
	constructor(isNewUser, providerId, profile, username) {
		super(isNewUser, providerId, profile);
		this.username = username;
	}
};
var FacebookAdditionalUserInfo = class extends GenericAdditionalUserInfo {
	constructor(isNewUser, profile) {
		super(isNewUser, "facebook.com", profile);
	}
};
var GithubAdditionalUserInfo = class extends FederatedAdditionalUserInfoWithUsername {
	constructor(isNewUser, profile) {
		super(isNewUser, "github.com", profile, typeof (profile === null || profile === void 0 ? void 0 : profile.login) === "string" ? profile === null || profile === void 0 ? void 0 : profile.login : null);
	}
};
var GoogleAdditionalUserInfo = class extends GenericAdditionalUserInfo {
	constructor(isNewUser, profile) {
		super(isNewUser, "google.com", profile);
	}
};
var TwitterAdditionalUserInfo = class extends FederatedAdditionalUserInfoWithUsername {
	constructor(isNewUser, profile, screenName) {
		super(isNewUser, "twitter.com", profile, screenName);
	}
};
/**
* Extracts provider specific {@link AdditionalUserInfo} for the given credential.
*
* @param userCredential - The user credential.
*
* @public
*/
function getAdditionalUserInfo(userCredential) {
	const { user, _tokenResponse } = userCredential;
	if (user.isAnonymous && !_tokenResponse) return {
		providerId: null,
		isNewUser: false,
		profile: null
	};
	return _fromIdTokenResponse(_tokenResponse);
}
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
/**
* Adds an observer for changes to the signed-in user's ID token.
*
* @remarks
* This includes sign-in, sign-out, and token refresh events.
* This will not be triggered automatically upon ID token expiration. Use {@link User.getIdToken} to refresh the ID token.
*
* @param auth - The {@link Auth} instance.
* @param nextOrObserver - callback triggered on change.
* @param error - Deprecated. This callback is never triggered. Errors
* on signing in/out can be caught in promises returned from
* sign-in/sign-out functions.
* @param completed - Deprecated. This callback is never triggered.
*
* @public
*/
function onIdTokenChanged(auth, nextOrObserver, error, completed) {
	return getModularInstance(auth).onIdTokenChanged(nextOrObserver, error, completed);
}
/**
* Adds a blocking callback that runs before an auth state change
* sets a new user.
*
* @param auth - The {@link Auth} instance.
* @param callback - callback triggered before new user value is set.
*   If this throws, it blocks the user from being set.
* @param onAbort - callback triggered if a later `beforeAuthStateChanged()`
*   callback throws, allowing you to undo any side effects.
*/
function beforeAuthStateChanged(auth, callback, onAbort) {
	return getModularInstance(auth).beforeAuthStateChanged(callback, onAbort);
}
/**
* Adds an observer for changes to the user's sign-in state.
*
* @remarks
* To keep the old behavior, see {@link onIdTokenChanged}.
*
* @param auth - The {@link Auth} instance.
* @param nextOrObserver - callback triggered on change.
* @param error - Deprecated. This callback is never triggered. Errors
* on signing in/out can be caught in promises returned from
* sign-in/sign-out functions.
* @param completed - Deprecated. This callback is never triggered.
*
* @public
*/
function onAuthStateChanged(auth, nextOrObserver, error, completed) {
	return getModularInstance(auth).onAuthStateChanged(nextOrObserver, error, completed);
}
/**
* Signs out the current user.
*
* @remarks
* This method is not supported by {@link Auth} instances created with a
* {@link @firebase/app#FirebaseServerApp}.
*
* @param auth - The {@link Auth} instance.
*
* @public
*/
function signOut(auth) {
	return getModularInstance(auth).signOut();
}
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
function startEnrollPhoneMfa(auth, request) {
	return _performApiRequest(auth, "POST", "/v2/accounts/mfaEnrollment:start", _addTidIfNecessary(auth, request));
}
function finalizeEnrollPhoneMfa(auth, request) {
	return _performApiRequest(auth, "POST", "/v2/accounts/mfaEnrollment:finalize", _addTidIfNecessary(auth, request));
}
function startEnrollTotpMfa(auth, request) {
	return _performApiRequest(auth, "POST", "/v2/accounts/mfaEnrollment:start", _addTidIfNecessary(auth, request));
}
function finalizeEnrollTotpMfa(auth, request) {
	return _performApiRequest(auth, "POST", "/v2/accounts/mfaEnrollment:finalize", _addTidIfNecessary(auth, request));
}
var STORAGE_AVAILABLE_KEY = "__sak";
/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var BrowserPersistenceClass = class {
	constructor(storageRetriever, type) {
		this.storageRetriever = storageRetriever;
		this.type = type;
	}
	_isAvailable() {
		try {
			if (!this.storage) return Promise.resolve(false);
			this.storage.setItem(STORAGE_AVAILABLE_KEY, "1");
			this.storage.removeItem(STORAGE_AVAILABLE_KEY);
			return Promise.resolve(true);
		} catch (_a) {
			return Promise.resolve(false);
		}
	}
	_set(key, value) {
		this.storage.setItem(key, JSON.stringify(value));
		return Promise.resolve();
	}
	_get(key) {
		const json = this.storage.getItem(key);
		return Promise.resolve(json ? JSON.parse(json) : null);
	}
	_remove(key) {
		this.storage.removeItem(key);
		return Promise.resolve();
	}
	get storage() {
		return this.storageRetriever();
	}
};
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var _POLLING_INTERVAL_MS$1 = 1e3;
var IE10_LOCAL_STORAGE_SYNC_DELAY = 10;
var BrowserLocalPersistence = class extends BrowserPersistenceClass {
	constructor() {
		super(() => window.localStorage, "LOCAL");
		this.boundEventHandler = (event, poll) => this.onStorageEvent(event, poll);
		this.listeners = {};
		this.localCache = {};
		this.pollTimer = null;
		this.fallbackToPolling = _isMobileBrowser();
		this._shouldAllowMigration = true;
	}
	forAllChangedKeys(cb) {
		for (const key of Object.keys(this.listeners)) {
			const newValue = this.storage.getItem(key);
			const oldValue = this.localCache[key];
			if (newValue !== oldValue) cb(key, oldValue, newValue);
		}
	}
	onStorageEvent(event, poll = false) {
		if (!event.key) {
			this.forAllChangedKeys((key, _oldValue, newValue) => {
				this.notifyListeners(key, newValue);
			});
			return;
		}
		const key = event.key;
		if (poll) this.detachListener();
		else this.stopPolling();
		const triggerListeners = () => {
			const storedValue = this.storage.getItem(key);
			if (!poll && this.localCache[key] === storedValue) return;
			this.notifyListeners(key, storedValue);
		};
		const storedValue = this.storage.getItem(key);
		if (_isIE10() && storedValue !== event.newValue && event.newValue !== event.oldValue) setTimeout(triggerListeners, IE10_LOCAL_STORAGE_SYNC_DELAY);
		else triggerListeners();
	}
	notifyListeners(key, value) {
		this.localCache[key] = value;
		const listeners = this.listeners[key];
		if (listeners) for (const listener of Array.from(listeners)) listener(value ? JSON.parse(value) : value);
	}
	startPolling() {
		this.stopPolling();
		this.pollTimer = setInterval(() => {
			this.forAllChangedKeys((key, oldValue, newValue) => {
				this.onStorageEvent(new StorageEvent("storage", {
					key,
					oldValue,
					newValue
				}), true);
			});
		}, _POLLING_INTERVAL_MS$1);
	}
	stopPolling() {
		if (this.pollTimer) {
			clearInterval(this.pollTimer);
			this.pollTimer = null;
		}
	}
	attachListener() {
		window.addEventListener("storage", this.boundEventHandler);
	}
	detachListener() {
		window.removeEventListener("storage", this.boundEventHandler);
	}
	_addListener(key, listener) {
		if (Object.keys(this.listeners).length === 0) {
			if (this.fallbackToPolling) this.startPolling();
			else this.attachListener();
		}
		if (!this.listeners[key]) {
			this.listeners[key] = /* @__PURE__ */ new Set();
			this.localCache[key] = this.storage.getItem(key);
		}
		this.listeners[key].add(listener);
	}
	_removeListener(key, listener) {
		if (this.listeners[key]) {
			this.listeners[key].delete(listener);
			if (this.listeners[key].size === 0) delete this.listeners[key];
		}
		if (Object.keys(this.listeners).length === 0) {
			this.detachListener();
			this.stopPolling();
		}
	}
	async _set(key, value) {
		await super._set(key, value);
		this.localCache[key] = JSON.stringify(value);
	}
	async _get(key) {
		const value = await super._get(key);
		this.localCache[key] = JSON.stringify(value);
		return value;
	}
	async _remove(key) {
		await super._remove(key);
		delete this.localCache[key];
	}
};
BrowserLocalPersistence.type = "LOCAL";
/**
* An implementation of {@link Persistence} of type `LOCAL` using `localStorage`
* for the underlying storage.
*
* @public
*/
var browserLocalPersistence = BrowserLocalPersistence;
/**
* @license
* Copyright 2025 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var POLLING_INTERVAL_MS = 1e3;
function getDocumentCookie(name) {
	var _a;
	var _b;
	const escapedName = name.replace(/[\\^$.*+?()[\]{}|]/g, "\\$&");
	const matcher = RegExp(`${escapedName}=([^;]+)`);
	return (_b = (_a = document.cookie.match(matcher)) === null || _a === void 0 ? void 0 : _a[1]) !== null && _b !== void 0 ? _b : null;
}
function getCookieName(key) {
	return `${window.location.protocol === "http:" ? "__dev_" : "__HOST-"}FIREBASE_${key.split(":")[3]}`;
}
var CookiePersistence = class {
	constructor() {
		this.type = "COOKIE";
		this.listenerUnsubscribes = /* @__PURE__ */ new Map();
	}
	_getFinalTarget(originalUrl) {
		const url = new URL(`${window.location.origin}/__cookies__`);
		url.searchParams.set("finalTarget", originalUrl);
		return url;
	}
	async _isAvailable() {
		var _a;
		if (typeof isSecureContext === "boolean" && !isSecureContext) return false;
		if (typeof navigator === "undefined" || typeof document === "undefined") return false;
		return (_a = navigator.cookieEnabled) !== null && _a !== void 0 ? _a : true;
	}
	async _set(_key, _value) {}
	async _get(key) {
		if (!this._isAvailable()) return null;
		const name = getCookieName(key);
		if (window.cookieStore) {
			const cookie = await window.cookieStore.get(name);
			return cookie === null || cookie === void 0 ? void 0 : cookie.value;
		}
		return getDocumentCookie(name);
	}
	async _remove(key) {
		if (!this._isAvailable()) return;
		if (!await this._get(key)) return;
		const name = getCookieName(key);
		document.cookie = `${name}=;Max-Age=34560000;Partitioned;Secure;SameSite=Strict;Path=/;Priority=High`;
		await fetch(`/__cookies__`, { method: "DELETE" }).catch(() => void 0);
	}
	_addListener(key, listener) {
		if (!this._isAvailable()) return;
		const name = getCookieName(key);
		if (window.cookieStore) {
			const cb = ((event) => {
				const changedCookie = event.changed.find((change) => change.name === name);
				if (changedCookie) listener(changedCookie.value);
				if (event.deleted.find((change) => change.name === name)) listener(null);
			});
			const unsubscribe = () => window.cookieStore.removeEventListener("change", cb);
			this.listenerUnsubscribes.set(listener, unsubscribe);
			return window.cookieStore.addEventListener("change", cb);
		}
		let lastValue = getDocumentCookie(name);
		const interval = setInterval(() => {
			const currentValue = getDocumentCookie(name);
			if (currentValue !== lastValue) {
				listener(currentValue);
				lastValue = currentValue;
			}
		}, POLLING_INTERVAL_MS);
		const unsubscribe = () => clearInterval(interval);
		this.listenerUnsubscribes.set(listener, unsubscribe);
	}
	_removeListener(_key, listener) {
		const unsubscribe = this.listenerUnsubscribes.get(listener);
		if (!unsubscribe) return;
		unsubscribe();
		this.listenerUnsubscribes.delete(listener);
	}
};
CookiePersistence.type = "COOKIE";
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var BrowserSessionPersistence = class extends BrowserPersistenceClass {
	constructor() {
		super(() => window.sessionStorage, "SESSION");
	}
	_addListener(_key, _listener) {}
	_removeListener(_key, _listener) {}
};
BrowserSessionPersistence.type = "SESSION";
/**
* An implementation of {@link Persistence} of `SESSION` using `sessionStorage`
* for the underlying storage.
*
* @public
*/
var browserSessionPersistence = BrowserSessionPersistence;
/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
/**
* Shim for Promise.allSettled, note the slightly different format of `fulfilled` vs `status`.
*
* @param promises - Array of promises to wait on.
*/
function _allSettled(promises) {
	return Promise.all(promises.map(async (promise) => {
		try {
			return {
				fulfilled: true,
				value: await promise
			};
		} catch (reason) {
			return {
				fulfilled: false,
				reason
			};
		}
	}));
}
/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
/**
* Interface class for receiving messages.
*
*/
var Receiver = class Receiver {
	constructor(eventTarget) {
		this.eventTarget = eventTarget;
		this.handlersMap = {};
		this.boundEventHandler = this.handleEvent.bind(this);
	}
	/**
	* Obtain an instance of a Receiver for a given event target, if none exists it will be created.
	*
	* @param eventTarget - An event target (such as window or self) through which the underlying
	* messages will be received.
	*/
	static _getInstance(eventTarget) {
		const existingInstance = this.receivers.find((receiver) => receiver.isListeningto(eventTarget));
		if (existingInstance) return existingInstance;
		const newInstance = new Receiver(eventTarget);
		this.receivers.push(newInstance);
		return newInstance;
	}
	isListeningto(eventTarget) {
		return this.eventTarget === eventTarget;
	}
	/**
	* Fans out a MessageEvent to the appropriate listeners.
	*
	* @remarks
	* Sends an {@link Status.ACK} upon receipt and a {@link Status.DONE} once all handlers have
	* finished processing.
	*
	* @param event - The MessageEvent.
	*
	*/
	async handleEvent(event) {
		const messageEvent = event;
		const { eventId, eventType, data } = messageEvent.data;
		const handlers = this.handlersMap[eventType];
		if (!(handlers === null || handlers === void 0 ? void 0 : handlers.size)) return;
		messageEvent.ports[0].postMessage({
			status: "ack",
			eventId,
			eventType
		});
		const response = await _allSettled(Array.from(handlers).map(async (handler) => handler(messageEvent.origin, data)));
		messageEvent.ports[0].postMessage({
			status: "done",
			eventId,
			eventType,
			response
		});
	}
	/**
	* Subscribe an event handler for a particular event.
	*
	* @param eventType - Event name to subscribe to.
	* @param eventHandler - The event handler which should receive the events.
	*
	*/
	_subscribe(eventType, eventHandler) {
		if (Object.keys(this.handlersMap).length === 0) this.eventTarget.addEventListener("message", this.boundEventHandler);
		if (!this.handlersMap[eventType]) this.handlersMap[eventType] = /* @__PURE__ */ new Set();
		this.handlersMap[eventType].add(eventHandler);
	}
	/**
	* Unsubscribe an event handler from a particular event.
	*
	* @param eventType - Event name to unsubscribe from.
	* @param eventHandler - Optional event handler, if none provided, unsubscribe all handlers on this event.
	*
	*/
	_unsubscribe(eventType, eventHandler) {
		if (this.handlersMap[eventType] && eventHandler) this.handlersMap[eventType].delete(eventHandler);
		if (!eventHandler || this.handlersMap[eventType].size === 0) delete this.handlersMap[eventType];
		if (Object.keys(this.handlersMap).length === 0) this.eventTarget.removeEventListener("message", this.boundEventHandler);
	}
};
Receiver.receivers = [];
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
function _generateEventId(prefix = "", digits = 10) {
	let random = "";
	for (let i = 0; i < digits; i++) random += Math.floor(Math.random() * 10);
	return prefix + random;
}
/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
/**
* Interface for sending messages and waiting for a completion response.
*
*/
var Sender = class {
	constructor(target) {
		this.target = target;
		this.handlers = /* @__PURE__ */ new Set();
	}
	/**
	* Unsubscribe the handler and remove it from our tracking Set.
	*
	* @param handler - The handler to unsubscribe.
	*/
	removeMessageHandler(handler) {
		if (handler.messageChannel) {
			handler.messageChannel.port1.removeEventListener("message", handler.onMessage);
			handler.messageChannel.port1.close();
		}
		this.handlers.delete(handler);
	}
	/**
	* Send a message to the Receiver located at {@link target}.
	*
	* @remarks
	* We'll first wait a bit for an ACK , if we get one we will wait significantly longer until the
	* receiver has had a chance to fully process the event.
	*
	* @param eventType - Type of event to send.
	* @param data - The payload of the event.
	* @param timeout - Timeout for waiting on an ACK from the receiver.
	*
	* @returns An array of settled promises from all the handlers that were listening on the receiver.
	*/
	async _send(eventType, data, timeout = 50) {
		const messageChannel = typeof MessageChannel !== "undefined" ? new MessageChannel() : null;
		if (!messageChannel) throw new Error("connection_unavailable");
		let completionTimer;
		let handler;
		return new Promise((resolve, reject) => {
			const eventId = _generateEventId("", 20);
			messageChannel.port1.start();
			const ackTimer = setTimeout(() => {
				reject(/* @__PURE__ */ new Error("unsupported_event"));
			}, timeout);
			handler = {
				messageChannel,
				onMessage(event) {
					const messageEvent = event;
					if (messageEvent.data.eventId !== eventId) return;
					switch (messageEvent.data.status) {
						case "ack":
							clearTimeout(ackTimer);
							completionTimer = setTimeout(() => {
								reject(/* @__PURE__ */ new Error("timeout"));
							}, 3e3);
							break;
						case "done":
							clearTimeout(completionTimer);
							resolve(messageEvent.data.response);
							break;
						default:
							clearTimeout(ackTimer);
							clearTimeout(completionTimer);
							reject(/* @__PURE__ */ new Error("invalid_response"));
					}
				}
			};
			this.handlers.add(handler);
			messageChannel.port1.addEventListener("message", handler.onMessage);
			this.target.postMessage({
				eventType,
				eventId,
				data
			}, [messageChannel.port2]);
		}).finally(() => {
			if (handler) this.removeMessageHandler(handler);
		});
	}
};
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
/**
* Lazy accessor for window, since the compat layer won't tree shake this out,
* we need to make sure not to mess with window unless we have to
*/
function _window() {
	return window;
}
function _setWindowLocation(url) {
	_window().location.href = url;
}
/**
* @license
* Copyright 2020 Google LLC.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
function _isWorker() {
	return typeof _window()["WorkerGlobalScope"] !== "undefined" && typeof _window()["importScripts"] === "function";
}
async function _getActiveServiceWorker() {
	if (!(navigator === null || navigator === void 0 ? void 0 : navigator.serviceWorker)) return null;
	try {
		return (await navigator.serviceWorker.ready).active;
	} catch (_a) {
		return null;
	}
}
function _getServiceWorkerController() {
	var _a;
	return ((_a = navigator === null || navigator === void 0 ? void 0 : navigator.serviceWorker) === null || _a === void 0 ? void 0 : _a.controller) || null;
}
function _getWorkerGlobalScope() {
	return _isWorker() ? self : null;
}
/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var DB_NAME = "firebaseLocalStorageDb";
var DB_VERSION = 1;
var DB_OBJECTSTORE_NAME = "firebaseLocalStorage";
var DB_DATA_KEYPATH = "fbase_key";
/**
* Promise wrapper for IDBRequest
*
* Unfortunately we can't cleanly extend Promise<T> since promises are not callable in ES6
*
*/
var DBPromise = class {
	constructor(request) {
		this.request = request;
	}
	toPromise() {
		return new Promise((resolve, reject) => {
			this.request.addEventListener("success", () => {
				resolve(this.request.result);
			});
			this.request.addEventListener("error", () => {
				reject(this.request.error);
			});
		});
	}
};
function getObjectStore(db, isReadWrite) {
	return db.transaction([DB_OBJECTSTORE_NAME], isReadWrite ? "readwrite" : "readonly").objectStore(DB_OBJECTSTORE_NAME);
}
function _deleteDatabase() {
	return new DBPromise(indexedDB.deleteDatabase(DB_NAME)).toPromise();
}
function _openDatabase() {
	const request = indexedDB.open(DB_NAME, DB_VERSION);
	return new Promise((resolve, reject) => {
		request.addEventListener("error", () => {
			reject(request.error);
		});
		request.addEventListener("upgradeneeded", () => {
			const db = request.result;
			try {
				db.createObjectStore(DB_OBJECTSTORE_NAME, { keyPath: DB_DATA_KEYPATH });
			} catch (e) {
				reject(e);
			}
		});
		request.addEventListener("success", async () => {
			const db = request.result;
			if (!db.objectStoreNames.contains(DB_OBJECTSTORE_NAME)) {
				db.close();
				await _deleteDatabase();
				resolve(await _openDatabase());
			} else resolve(db);
		});
	});
}
async function _putObject(db, key, value) {
	return new DBPromise(getObjectStore(db, true).put({
		[DB_DATA_KEYPATH]: key,
		value
	})).toPromise();
}
async function getObject(db, key) {
	const data = await new DBPromise(getObjectStore(db, false).get(key)).toPromise();
	return data === void 0 ? null : data.value;
}
function _deleteObject(db, key) {
	return new DBPromise(getObjectStore(db, true).delete(key)).toPromise();
}
var _POLLING_INTERVAL_MS = 800;
var _TRANSACTION_RETRY_COUNT = 3;
var IndexedDBLocalPersistence = class {
	constructor() {
		this.type = "LOCAL";
		this._shouldAllowMigration = true;
		this.listeners = {};
		this.localCache = {};
		this.pollTimer = null;
		this.pendingWrites = 0;
		this.receiver = null;
		this.sender = null;
		this.serviceWorkerReceiverAvailable = false;
		this.activeServiceWorker = null;
		this._workerInitializationPromise = this.initializeServiceWorkerMessaging().then(() => {}, () => {});
	}
	async _openDb() {
		if (this.db) return this.db;
		this.db = await _openDatabase();
		return this.db;
	}
	async _withRetries(op) {
		let numAttempts = 0;
		while (true) try {
			return await op(await this._openDb());
		} catch (e) {
			if (numAttempts++ > _TRANSACTION_RETRY_COUNT) throw e;
			if (this.db) {
				this.db.close();
				this.db = void 0;
			}
		}
	}
	/**
	* IndexedDB events do not propagate from the main window to the worker context.  We rely on a
	* postMessage interface to send these events to the worker ourselves.
	*/
	async initializeServiceWorkerMessaging() {
		return _isWorker() ? this.initializeReceiver() : this.initializeSender();
	}
	/**
	* As the worker we should listen to events from the main window.
	*/
	async initializeReceiver() {
		this.receiver = Receiver._getInstance(_getWorkerGlobalScope());
		this.receiver._subscribe("keyChanged", async (_origin, data) => {
			return { keyProcessed: (await this._poll()).includes(data.key) };
		});
		this.receiver._subscribe("ping", async (_origin, _data) => {
			return ["keyChanged"];
		});
	}
	/**
	* As the main window, we should let the worker know when keys change (set and remove).
	*
	* @remarks
	* {@link https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerContainer/ready | ServiceWorkerContainer.ready}
	* may not resolve.
	*/
	async initializeSender() {
		var _a;
		var _b;
		this.activeServiceWorker = await _getActiveServiceWorker();
		if (!this.activeServiceWorker) return;
		this.sender = new Sender(this.activeServiceWorker);
		const results = await this.sender._send("ping", {}, 800);
		if (!results) return;
		if (((_a = results[0]) === null || _a === void 0 ? void 0 : _a.fulfilled) && ((_b = results[0]) === null || _b === void 0 ? void 0 : _b.value.includes("keyChanged"))) this.serviceWorkerReceiverAvailable = true;
	}
	/**
	* Let the worker know about a changed key, the exact key doesn't technically matter since the
	* worker will just trigger a full sync anyway.
	*
	* @remarks
	* For now, we only support one service worker per page.
	*
	* @param key - Storage key which changed.
	*/
	async notifyServiceWorker(key) {
		if (!this.sender || !this.activeServiceWorker || _getServiceWorkerController() !== this.activeServiceWorker) return;
		try {
			await this.sender._send("keyChanged", { key }, this.serviceWorkerReceiverAvailable ? 800 : 50);
		} catch (_a) {}
	}
	async _isAvailable() {
		try {
			if (!indexedDB) return false;
			const db = await _openDatabase();
			await _putObject(db, STORAGE_AVAILABLE_KEY, "1");
			await _deleteObject(db, STORAGE_AVAILABLE_KEY);
			return true;
		} catch (_a) {}
		return false;
	}
	async _withPendingWrite(write) {
		this.pendingWrites++;
		try {
			await write();
		} finally {
			this.pendingWrites--;
		}
	}
	async _set(key, value) {
		return this._withPendingWrite(async () => {
			await this._withRetries((db) => _putObject(db, key, value));
			this.localCache[key] = value;
			return this.notifyServiceWorker(key);
		});
	}
	async _get(key) {
		const obj = await this._withRetries((db) => getObject(db, key));
		this.localCache[key] = obj;
		return obj;
	}
	async _remove(key) {
		return this._withPendingWrite(async () => {
			await this._withRetries((db) => _deleteObject(db, key));
			delete this.localCache[key];
			return this.notifyServiceWorker(key);
		});
	}
	async _poll() {
		const result = await this._withRetries((db) => {
			return new DBPromise(getObjectStore(db, false).getAll()).toPromise();
		});
		if (!result) return [];
		if (this.pendingWrites !== 0) return [];
		const keys = [];
		const keysInResult = /* @__PURE__ */ new Set();
		if (result.length !== 0) for (const { fbase_key: key, value } of result) {
			keysInResult.add(key);
			if (JSON.stringify(this.localCache[key]) !== JSON.stringify(value)) {
				this.notifyListeners(key, value);
				keys.push(key);
			}
		}
		for (const localKey of Object.keys(this.localCache)) if (this.localCache[localKey] && !keysInResult.has(localKey)) {
			this.notifyListeners(localKey, null);
			keys.push(localKey);
		}
		return keys;
	}
	notifyListeners(key, newValue) {
		this.localCache[key] = newValue;
		const listeners = this.listeners[key];
		if (listeners) for (const listener of Array.from(listeners)) listener(newValue);
	}
	startPolling() {
		this.stopPolling();
		this.pollTimer = setInterval(async () => this._poll(), _POLLING_INTERVAL_MS);
	}
	stopPolling() {
		if (this.pollTimer) {
			clearInterval(this.pollTimer);
			this.pollTimer = null;
		}
	}
	_addListener(key, listener) {
		if (Object.keys(this.listeners).length === 0) this.startPolling();
		if (!this.listeners[key]) {
			this.listeners[key] = /* @__PURE__ */ new Set();
			this._get(key);
		}
		this.listeners[key].add(listener);
	}
	_removeListener(key, listener) {
		if (this.listeners[key]) {
			this.listeners[key].delete(listener);
			if (this.listeners[key].size === 0) delete this.listeners[key];
		}
		if (Object.keys(this.listeners).length === 0) this.stopPolling();
	}
};
IndexedDBLocalPersistence.type = "LOCAL";
/**
* An implementation of {@link Persistence} of type `LOCAL` using `indexedDB`
* for the underlying storage.
*
* @public
*/
var indexedDBLocalPersistence = IndexedDBLocalPersistence;
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
function startSignInPhoneMfa(auth, request) {
	return _performApiRequest(auth, "POST", "/v2/accounts/mfaSignIn:start", _addTidIfNecessary(auth, request));
}
function finalizeSignInPhoneMfa(auth, request) {
	return _performApiRequest(auth, "POST", "/v2/accounts/mfaSignIn:finalize", _addTidIfNecessary(auth, request));
}
function finalizeSignInTotpMfa(auth, request) {
	return _performApiRequest(auth, "POST", "/v2/accounts/mfaSignIn:finalize", _addTidIfNecessary(auth, request));
}
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
_generateCallbackName("rcb");
new Delay(3e4, 6e4);
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var RECAPTCHA_VERIFIER_TYPE = "recaptcha";
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
/**
* Returns a verification ID to be used in conjunction with the SMS code that is sent.
*
*/
async function _verifyPhoneNumber(auth, options, verifier) {
	var _a;
	if (!auth._getRecaptchaConfig()) try {
		await _initializeRecaptchaConfig(auth);
	} catch (error) {}
	try {
		let phoneInfoOptions;
		if (typeof options === "string") phoneInfoOptions = { phoneNumber: options };
		else phoneInfoOptions = options;
		if ("session" in phoneInfoOptions) {
			const session = phoneInfoOptions.session;
			if ("phoneNumber" in phoneInfoOptions) {
				_assert(session.type === "enroll", auth, "internal-error");
				const startPhoneMfaEnrollmentRequest = {
					idToken: session.credential,
					phoneEnrollmentInfo: {
						phoneNumber: phoneInfoOptions.phoneNumber,
						clientType: "CLIENT_TYPE_WEB"
					}
				};
				const startEnrollPhoneMfaActionCallback = async (authInstance, request) => {
					if (request.phoneEnrollmentInfo.captchaResponse === FAKE_TOKEN) {
						_assert((verifier === null || verifier === void 0 ? void 0 : verifier.type) === RECAPTCHA_VERIFIER_TYPE, authInstance, "argument-error");
						return startEnrollPhoneMfa(authInstance, await injectRecaptchaV2Token(authInstance, request, verifier));
					}
					return startEnrollPhoneMfa(authInstance, request);
				};
				return (await handleRecaptchaFlow(auth, startPhoneMfaEnrollmentRequest, "mfaSmsEnrollment", startEnrollPhoneMfaActionCallback, "PHONE_PROVIDER").catch((error) => {
					return Promise.reject(error);
				})).phoneSessionInfo.sessionInfo;
			} else {
				_assert(session.type === "signin", auth, "internal-error");
				const mfaEnrollmentId = ((_a = phoneInfoOptions.multiFactorHint) === null || _a === void 0 ? void 0 : _a.uid) || phoneInfoOptions.multiFactorUid;
				_assert(mfaEnrollmentId, auth, "missing-multi-factor-info");
				const startPhoneMfaSignInRequest = {
					mfaPendingCredential: session.credential,
					mfaEnrollmentId,
					phoneSignInInfo: { clientType: "CLIENT_TYPE_WEB" }
				};
				const startSignInPhoneMfaActionCallback = async (authInstance, request) => {
					if (request.phoneSignInInfo.captchaResponse === FAKE_TOKEN) {
						_assert((verifier === null || verifier === void 0 ? void 0 : verifier.type) === RECAPTCHA_VERIFIER_TYPE, authInstance, "argument-error");
						return startSignInPhoneMfa(authInstance, await injectRecaptchaV2Token(authInstance, request, verifier));
					}
					return startSignInPhoneMfa(authInstance, request);
				};
				return (await handleRecaptchaFlow(auth, startPhoneMfaSignInRequest, "mfaSmsSignIn", startSignInPhoneMfaActionCallback, "PHONE_PROVIDER").catch((error) => {
					return Promise.reject(error);
				})).phoneResponseInfo.sessionInfo;
			}
		} else {
			const sendPhoneVerificationCodeRequest = {
				phoneNumber: phoneInfoOptions.phoneNumber,
				clientType: "CLIENT_TYPE_WEB"
			};
			const sendPhoneVerificationCodeActionCallback = async (authInstance, request) => {
				if (request.captchaResponse === FAKE_TOKEN) {
					_assert((verifier === null || verifier === void 0 ? void 0 : verifier.type) === RECAPTCHA_VERIFIER_TYPE, authInstance, "argument-error");
					return sendPhoneVerificationCode(authInstance, await injectRecaptchaV2Token(authInstance, request, verifier));
				}
				return sendPhoneVerificationCode(authInstance, request);
			};
			return (await handleRecaptchaFlow(auth, sendPhoneVerificationCodeRequest, "sendVerificationCode", sendPhoneVerificationCodeActionCallback, "PHONE_PROVIDER").catch((error) => {
				return Promise.reject(error);
			})).sessionInfo;
		}
	} finally {
		verifier === null || verifier === void 0 || verifier._reset();
	}
}
async function injectRecaptchaV2Token(auth, request, recaptchaV2Verifier) {
	_assert(recaptchaV2Verifier.type === RECAPTCHA_VERIFIER_TYPE, auth, "argument-error");
	const recaptchaV2Token = await recaptchaV2Verifier.verify();
	_assert(typeof recaptchaV2Token === "string", auth, "argument-error");
	const newRequest = Object.assign({}, request);
	if ("phoneEnrollmentInfo" in newRequest) {
		const phoneNumber = newRequest.phoneEnrollmentInfo.phoneNumber;
		const captchaResponse = newRequest.phoneEnrollmentInfo.captchaResponse;
		const clientType = newRequest.phoneEnrollmentInfo.clientType;
		const recaptchaVersion = newRequest.phoneEnrollmentInfo.recaptchaVersion;
		Object.assign(newRequest, { "phoneEnrollmentInfo": {
			phoneNumber,
			recaptchaToken: recaptchaV2Token,
			captchaResponse,
			clientType,
			recaptchaVersion
		} });
		return newRequest;
	} else if ("phoneSignInInfo" in newRequest) {
		const captchaResponse = newRequest.phoneSignInInfo.captchaResponse;
		const clientType = newRequest.phoneSignInInfo.clientType;
		const recaptchaVersion = newRequest.phoneSignInInfo.recaptchaVersion;
		Object.assign(newRequest, { "phoneSignInInfo": {
			recaptchaToken: recaptchaV2Token,
			captchaResponse,
			clientType,
			recaptchaVersion
		} });
		return newRequest;
	} else {
		Object.assign(newRequest, { "recaptchaToken": recaptchaV2Token });
		return newRequest;
	}
}
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
/**
* Provider for generating an {@link PhoneAuthCredential}.
*
* @remarks
* `PhoneAuthProvider` does not work in a Node.js environment.
*
* @example
* ```javascript
* // 'recaptcha-container' is the ID of an element in the DOM.
* const applicationVerifier = new RecaptchaVerifier('recaptcha-container');
* const provider = new PhoneAuthProvider(auth);
* const verificationId = await provider.verifyPhoneNumber('+16505550101', applicationVerifier);
* // Obtain the verificationCode from the user.
* const phoneCredential = PhoneAuthProvider.credential(verificationId, verificationCode);
* const userCredential = await signInWithCredential(auth, phoneCredential);
* ```
*
* @public
*/
var PhoneAuthProvider = class PhoneAuthProvider {
	/**
	* @param auth - The Firebase {@link Auth} instance in which sign-ins should occur.
	*
	*/
	constructor(auth) {
		/** Always set to {@link ProviderId}.PHONE. */
		this.providerId = PhoneAuthProvider.PROVIDER_ID;
		this.auth = _castAuth(auth);
	}
	/**
	*
	* Starts a phone number authentication flow by sending a verification code to the given phone
	* number.
	*
	* @example
	* ```javascript
	* const provider = new PhoneAuthProvider(auth);
	* const verificationId = await provider.verifyPhoneNumber(phoneNumber, applicationVerifier);
	* // Obtain verificationCode from the user.
	* const authCredential = PhoneAuthProvider.credential(verificationId, verificationCode);
	* const userCredential = await signInWithCredential(auth, authCredential);
	* ```
	*
	* @example
	* An alternative flow is provided using the `signInWithPhoneNumber` method.
	* ```javascript
	* const confirmationResult = signInWithPhoneNumber(auth, phoneNumber, applicationVerifier);
	* // Obtain verificationCode from the user.
	* const userCredential = confirmationResult.confirm(verificationCode);
	* ```
	*
	* @param phoneInfoOptions - The user's {@link PhoneInfoOptions}. The phone number should be in
	* E.164 format (e.g. +16505550101).
	* @param applicationVerifier - An {@link ApplicationVerifier}, which prevents
	* requests from unauthorized clients. This SDK includes an implementation
	* based on reCAPTCHA v2, {@link RecaptchaVerifier}. If you've enabled
	* reCAPTCHA Enterprise bot protection in Enforce mode, this parameter is
	* optional; in all other configurations, the parameter is required.
	*
	* @returns A Promise for a verification ID that can be passed to
	* {@link PhoneAuthProvider.credential} to identify this flow.
	*/
	verifyPhoneNumber(phoneOptions, applicationVerifier) {
		return _verifyPhoneNumber(this.auth, phoneOptions, getModularInstance(applicationVerifier));
	}
	/**
	* Creates a phone auth credential, given the verification ID from
	* {@link PhoneAuthProvider.verifyPhoneNumber} and the code that was sent to the user's
	* mobile device.
	*
	* @example
	* ```javascript
	* const provider = new PhoneAuthProvider(auth);
	* const verificationId = provider.verifyPhoneNumber(phoneNumber, applicationVerifier);
	* // Obtain verificationCode from the user.
	* const authCredential = PhoneAuthProvider.credential(verificationId, verificationCode);
	* const userCredential = signInWithCredential(auth, authCredential);
	* ```
	*
	* @example
	* An alternative flow is provided using the `signInWithPhoneNumber` method.
	* ```javascript
	* const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, applicationVerifier);
	* // Obtain verificationCode from the user.
	* const userCredential = await confirmationResult.confirm(verificationCode);
	* ```
	*
	* @param verificationId - The verification ID returned from {@link PhoneAuthProvider.verifyPhoneNumber}.
	* @param verificationCode - The verification code sent to the user's mobile device.
	*
	* @returns The auth provider credential.
	*/
	static credential(verificationId, verificationCode) {
		return PhoneAuthCredential._fromVerification(verificationId, verificationCode);
	}
	/**
	* Generates an {@link AuthCredential} from a {@link UserCredential}.
	* @param userCredential - The user credential.
	*/
	static credentialFromResult(userCredential) {
		const credential = userCredential;
		return PhoneAuthProvider.credentialFromTaggedObject(credential);
	}
	/**
	* Returns an {@link AuthCredential} when passed an error.
	*
	* @remarks
	*
	* This method works for errors like
	* `auth/account-exists-with-different-credentials`. This is useful for
	* recovering when attempting to set a user's phone number but the number
	* in question is already tied to another account. For example, the following
	* code tries to update the current user's phone number, and if that
	* fails, links the user with the account associated with that number:
	*
	* ```js
	* const provider = new PhoneAuthProvider(auth);
	* const verificationId = await provider.verifyPhoneNumber(number, verifier);
	* try {
	*   const code = ''; // Prompt the user for the verification code
	*   await updatePhoneNumber(
	*       auth.currentUser,
	*       PhoneAuthProvider.credential(verificationId, code));
	* } catch (e) {
	*   if ((e as FirebaseError)?.code === 'auth/account-exists-with-different-credential') {
	*     const cred = PhoneAuthProvider.credentialFromError(e);
	*     await linkWithCredential(auth.currentUser, cred);
	*   }
	* }
	*
	* // At this point, auth.currentUser.phoneNumber === number.
	* ```
	*
	* @param error - The error to generate a credential from.
	*/
	static credentialFromError(error) {
		return PhoneAuthProvider.credentialFromTaggedObject(error.customData || {});
	}
	static credentialFromTaggedObject({ _tokenResponse: tokenResponse }) {
		if (!tokenResponse) return null;
		const { phoneNumber, temporaryProof } = tokenResponse;
		if (phoneNumber && temporaryProof) return PhoneAuthCredential._fromTokenResponse(phoneNumber, temporaryProof);
		return null;
	}
};
/** Always set to {@link ProviderId}.PHONE. */
PhoneAuthProvider.PROVIDER_ID = "phone";
/** Always set to {@link SignInMethod}.PHONE. */
PhoneAuthProvider.PHONE_SIGN_IN_METHOD = "phone";
/**
* @license
* Copyright 2021 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
/**
* Chooses a popup/redirect resolver to use. This prefers the override (which
* is directly passed in), and falls back to the property set on the auth
* object. If neither are available, this function errors w/ an argument error.
*/
function _withDefaultResolver(auth, resolverOverride) {
	if (resolverOverride) return _getInstance(resolverOverride);
	_assert(auth._popupRedirectResolver, auth, "argument-error");
	return auth._popupRedirectResolver;
}
/**
* @license
* Copyright 2019 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var IdpCredential = class extends AuthCredential {
	constructor(params) {
		super("custom", "custom");
		this.params = params;
	}
	_getIdTokenResponse(auth) {
		return signInWithIdp(auth, this._buildIdpRequest());
	}
	_linkToIdToken(auth, idToken) {
		return signInWithIdp(auth, this._buildIdpRequest(idToken));
	}
	_getReauthenticationResolver(auth) {
		return signInWithIdp(auth, this._buildIdpRequest());
	}
	_buildIdpRequest(idToken) {
		const request = {
			requestUri: this.params.requestUri,
			sessionId: this.params.sessionId,
			postBody: this.params.postBody,
			tenantId: this.params.tenantId,
			pendingToken: this.params.pendingToken,
			returnSecureToken: true,
			returnIdpCredential: true
		};
		if (idToken) request.idToken = idToken;
		return request;
	}
};
function _signIn(params) {
	return _signInWithCredential(params.auth, new IdpCredential(params), params.bypassAuthState);
}
function _reauth(params) {
	const { auth, user } = params;
	_assert(user, auth, "internal-error");
	return _reauthenticate(user, new IdpCredential(params), params.bypassAuthState);
}
async function _link(params) {
	const { auth, user } = params;
	_assert(user, auth, "internal-error");
	return _link$1(user, new IdpCredential(params), params.bypassAuthState);
}
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
/**
* Popup event manager. Handles the popup's entire lifecycle; listens to auth
* events
*/
var AbstractPopupRedirectOperation = class {
	constructor(auth, filter, resolver, user, bypassAuthState = false) {
		this.auth = auth;
		this.resolver = resolver;
		this.user = user;
		this.bypassAuthState = bypassAuthState;
		this.pendingPromise = null;
		this.eventManager = null;
		this.filter = Array.isArray(filter) ? filter : [filter];
	}
	execute() {
		return new Promise(async (resolve, reject) => {
			this.pendingPromise = {
				resolve,
				reject
			};
			try {
				this.eventManager = await this.resolver._initialize(this.auth);
				await this.onExecution();
				this.eventManager.registerConsumer(this);
			} catch (e) {
				this.reject(e);
			}
		});
	}
	async onAuthEvent(event) {
		const { urlResponse, sessionId, postBody, tenantId, error, type } = event;
		if (error) {
			this.reject(error);
			return;
		}
		const params = {
			auth: this.auth,
			requestUri: urlResponse,
			sessionId,
			tenantId: tenantId || void 0,
			postBody: postBody || void 0,
			user: this.user,
			bypassAuthState: this.bypassAuthState
		};
		try {
			this.resolve(await this.getIdpTask(type)(params));
		} catch (e) {
			this.reject(e);
		}
	}
	onError(error) {
		this.reject(error);
	}
	getIdpTask(type) {
		switch (type) {
			case "signInViaPopup":
			case "signInViaRedirect": return _signIn;
			case "linkViaPopup":
			case "linkViaRedirect": return _link;
			case "reauthViaPopup":
			case "reauthViaRedirect": return _reauth;
			default: _fail(this.auth, "internal-error");
		}
	}
	resolve(cred) {
		debugAssert(this.pendingPromise, "Pending promise was never set");
		this.pendingPromise.resolve(cred);
		this.unregisterAndCleanUp();
	}
	reject(error) {
		debugAssert(this.pendingPromise, "Pending promise was never set");
		this.pendingPromise.reject(error);
		this.unregisterAndCleanUp();
	}
	unregisterAndCleanUp() {
		if (this.eventManager) this.eventManager.unregisterConsumer(this);
		this.pendingPromise = null;
		this.cleanUp();
	}
};
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var _POLL_WINDOW_CLOSE_TIMEOUT = new Delay(2e3, 1e4);
/**
* Authenticates a Firebase client using a popup-based OAuth authentication flow.
*
* @remarks
* If succeeds, returns the signed in user along with the provider's credential. If sign in was
* unsuccessful, returns an error object containing additional information about the error.
*
* This method does not work in a Node.js environment or with {@link Auth} instances created with a
* {@link @firebase/app#FirebaseServerApp}.
*
* @example
* ```javascript
* // Sign in using a popup.
* const provider = new FacebookAuthProvider();
* const result = await signInWithPopup(auth, provider);
*
* // The signed-in user info.
* const user = result.user;
* // This gives you a Facebook Access Token.
* const credential = provider.credentialFromResult(auth, result);
* const token = credential.accessToken;
* ```
*
* @param auth - The {@link Auth} instance.
* @param provider - The provider to authenticate. The provider has to be an {@link OAuthProvider}.
* Non-OAuth providers like {@link EmailAuthProvider} will throw an error.
* @param resolver - An instance of {@link PopupRedirectResolver}, optional
* if already supplied to {@link initializeAuth} or provided by {@link getAuth}.
*
* @public
*/
async function signInWithPopup(auth, provider, resolver) {
	if (_isFirebaseServerApp(auth.app)) return Promise.reject(_createError(auth, "operation-not-supported-in-this-environment"));
	const authInternal = _castAuth(auth);
	_assertInstanceOf(auth, provider, FederatedAuthProvider);
	return new PopupOperation(authInternal, "signInViaPopup", provider, _withDefaultResolver(authInternal, resolver)).executeNotNull();
}
/**
* Popup event manager. Handles the popup's entire lifecycle; listens to auth
* events
*
*/
var PopupOperation = class PopupOperation extends AbstractPopupRedirectOperation {
	constructor(auth, filter, provider, resolver, user) {
		super(auth, filter, resolver, user);
		this.provider = provider;
		this.authWindow = null;
		this.pollId = null;
		if (PopupOperation.currentPopupAction) PopupOperation.currentPopupAction.cancel();
		PopupOperation.currentPopupAction = this;
	}
	async executeNotNull() {
		const result = await this.execute();
		_assert(result, this.auth, "internal-error");
		return result;
	}
	async onExecution() {
		debugAssert(this.filter.length === 1, "Popup operations only handle one event");
		const eventId = _generateEventId();
		this.authWindow = await this.resolver._openPopup(this.auth, this.provider, this.filter[0], eventId);
		this.authWindow.associatedEvent = eventId;
		this.resolver._originValidation(this.auth).catch((e) => {
			this.reject(e);
		});
		this.resolver._isIframeWebStorageSupported(this.auth, (isSupported) => {
			if (!isSupported) this.reject(_createError(this.auth, "web-storage-unsupported"));
		});
		this.pollUserCancellation();
	}
	get eventId() {
		var _a;
		return ((_a = this.authWindow) === null || _a === void 0 ? void 0 : _a.associatedEvent) || null;
	}
	cancel() {
		this.reject(_createError(this.auth, "cancelled-popup-request"));
	}
	cleanUp() {
		if (this.authWindow) this.authWindow.close();
		if (this.pollId) window.clearTimeout(this.pollId);
		this.authWindow = null;
		this.pollId = null;
		PopupOperation.currentPopupAction = null;
	}
	pollUserCancellation() {
		const poll = () => {
			var _a;
			var _b;
			if ((_b = (_a = this.authWindow) === null || _a === void 0 ? void 0 : _a.window) === null || _b === void 0 ? void 0 : _b.closed) {
				this.pollId = window.setTimeout(() => {
					this.pollId = null;
					this.reject(_createError(this.auth, "popup-closed-by-user"));
				}, 8e3);
				return;
			}
			this.pollId = window.setTimeout(poll, _POLL_WINDOW_CLOSE_TIMEOUT.get());
		};
		poll();
	}
};
PopupOperation.currentPopupAction = null;
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var PENDING_REDIRECT_KEY = "pendingRedirect";
var redirectOutcomeMap = /* @__PURE__ */ new Map();
var RedirectAction = class extends AbstractPopupRedirectOperation {
	constructor(auth, resolver, bypassAuthState = false) {
		super(auth, [
			"signInViaRedirect",
			"linkViaRedirect",
			"reauthViaRedirect",
			"unknown"
		], resolver, void 0, bypassAuthState);
		this.eventId = null;
	}
	/**
	* Override the execute function; if we already have a redirect result, then
	* just return it.
	*/
	async execute() {
		let readyOutcome = redirectOutcomeMap.get(this.auth._key());
		if (!readyOutcome) {
			try {
				const result = await _getAndClearPendingRedirectStatus(this.resolver, this.auth) ? await super.execute() : null;
				readyOutcome = () => Promise.resolve(result);
			} catch (e) {
				readyOutcome = () => Promise.reject(e);
			}
			redirectOutcomeMap.set(this.auth._key(), readyOutcome);
		}
		if (!this.bypassAuthState) redirectOutcomeMap.set(this.auth._key(), () => Promise.resolve(null));
		return readyOutcome();
	}
	async onAuthEvent(event) {
		if (event.type === "signInViaRedirect") return super.onAuthEvent(event);
		else if (event.type === "unknown") {
			this.resolve(null);
			return;
		}
		if (event.eventId) {
			const user = await this.auth._redirectUserForId(event.eventId);
			if (user) {
				this.user = user;
				return super.onAuthEvent(event);
			} else this.resolve(null);
		}
	}
	async onExecution() {}
	cleanUp() {}
};
async function _getAndClearPendingRedirectStatus(resolver, auth) {
	const key = pendingRedirectKey(auth);
	const persistence = resolverPersistence(resolver);
	if (!await persistence._isAvailable()) return false;
	const hasPendingRedirect = await persistence._get(key) === "true";
	await persistence._remove(key);
	return hasPendingRedirect;
}
function _overrideRedirectResult(auth, result) {
	redirectOutcomeMap.set(auth._key(), result);
}
function resolverPersistence(resolver) {
	return _getInstance(resolver._redirectPersistence);
}
function pendingRedirectKey(auth) {
	return _persistenceKeyName(PENDING_REDIRECT_KEY, auth.config.apiKey, auth.name);
}
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
async function _getRedirectResult(auth, resolverExtern, bypassAuthState = false) {
	if (_isFirebaseServerApp(auth.app)) return Promise.reject(_serverAppCurrentUserOperationNotSupportedError(auth));
	const authInternal = _castAuth(auth);
	const result = await new RedirectAction(authInternal, _withDefaultResolver(authInternal, resolverExtern), bypassAuthState).execute();
	if (result && !bypassAuthState) {
		delete result.user._redirectEventId;
		await authInternal._persistUserIfCurrent(result.user);
		await authInternal._setRedirectUser(null, resolverExtern);
	}
	return result;
}
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var EVENT_DUPLICATION_CACHE_DURATION_MS = 6e5;
var AuthEventManager = class {
	constructor(auth) {
		this.auth = auth;
		this.cachedEventUids = /* @__PURE__ */ new Set();
		this.consumers = /* @__PURE__ */ new Set();
		this.queuedRedirectEvent = null;
		this.hasHandledPotentialRedirect = false;
		this.lastProcessedEventTime = Date.now();
	}
	registerConsumer(authEventConsumer) {
		this.consumers.add(authEventConsumer);
		if (this.queuedRedirectEvent && this.isEventForConsumer(this.queuedRedirectEvent, authEventConsumer)) {
			this.sendToConsumer(this.queuedRedirectEvent, authEventConsumer);
			this.saveEventToCache(this.queuedRedirectEvent);
			this.queuedRedirectEvent = null;
		}
	}
	unregisterConsumer(authEventConsumer) {
		this.consumers.delete(authEventConsumer);
	}
	onEvent(event) {
		if (this.hasEventBeenHandled(event)) return false;
		let handled = false;
		this.consumers.forEach((consumer) => {
			if (this.isEventForConsumer(event, consumer)) {
				handled = true;
				this.sendToConsumer(event, consumer);
				this.saveEventToCache(event);
			}
		});
		if (this.hasHandledPotentialRedirect || !isRedirectEvent(event)) return handled;
		this.hasHandledPotentialRedirect = true;
		if (!handled) {
			this.queuedRedirectEvent = event;
			handled = true;
		}
		return handled;
	}
	sendToConsumer(event, consumer) {
		var _a;
		if (event.error && !isNullRedirectEvent(event)) {
			const code = ((_a = event.error.code) === null || _a === void 0 ? void 0 : _a.split("auth/")[1]) || "internal-error";
			consumer.onError(_createError(this.auth, code));
		} else consumer.onAuthEvent(event);
	}
	isEventForConsumer(event, consumer) {
		const eventIdMatches = consumer.eventId === null || !!event.eventId && event.eventId === consumer.eventId;
		return consumer.filter.includes(event.type) && eventIdMatches;
	}
	hasEventBeenHandled(event) {
		if (Date.now() - this.lastProcessedEventTime >= EVENT_DUPLICATION_CACHE_DURATION_MS) this.cachedEventUids.clear();
		return this.cachedEventUids.has(eventUid(event));
	}
	saveEventToCache(event) {
		this.cachedEventUids.add(eventUid(event));
		this.lastProcessedEventTime = Date.now();
	}
};
function eventUid(e) {
	return [
		e.type,
		e.eventId,
		e.sessionId,
		e.tenantId
	].filter((v) => v).join("-");
}
function isNullRedirectEvent({ type, error }) {
	return type === "unknown" && (error === null || error === void 0 ? void 0 : error.code) === `auth/no-auth-event`;
}
function isRedirectEvent(event) {
	switch (event.type) {
		case "signInViaRedirect":
		case "linkViaRedirect":
		case "reauthViaRedirect": return true;
		case "unknown": return isNullRedirectEvent(event);
		default: return false;
	}
}
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
async function _getProjectConfig(auth, request = {}) {
	return _performApiRequest(auth, "GET", "/v1/projects", request);
}
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var IP_ADDRESS_REGEX = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/;
var HTTP_REGEX = /^https?/;
async function _validateOrigin(auth) {
	if (auth.config.emulator) return;
	const { authorizedDomains } = await _getProjectConfig(auth);
	for (const domain of authorizedDomains) try {
		if (matchDomain(domain)) return;
	} catch (_a) {}
	_fail(auth, "unauthorized-domain");
}
function matchDomain(expected) {
	const currentUrl = _getCurrentUrl();
	const { protocol, hostname } = new URL(currentUrl);
	if (expected.startsWith("chrome-extension://")) {
		const ceUrl = new URL(expected);
		if (ceUrl.hostname === "" && hostname === "") return protocol === "chrome-extension:" && expected.replace("chrome-extension://", "") === currentUrl.replace("chrome-extension://", "");
		return protocol === "chrome-extension:" && ceUrl.hostname === hostname;
	}
	if (!HTTP_REGEX.test(protocol)) return false;
	if (IP_ADDRESS_REGEX.test(expected)) return hostname === expected;
	const escapedDomainPattern = expected.replace(/\./g, "\\.");
	return new RegExp("^(.+\\." + escapedDomainPattern + "|" + escapedDomainPattern + ")$", "i").test(hostname);
}
/**
* @license
* Copyright 2020 Google LLC.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var NETWORK_TIMEOUT = new Delay(3e4, 6e4);
/**
* Reset unloaded GApi modules. If gapi.load fails due to a network error,
* it will stop working after a retrial. This is a hack to fix this issue.
*/
function resetUnloadedGapiModules() {
	const beacon = _window().___jsl;
	if (beacon === null || beacon === void 0 ? void 0 : beacon.H) for (const hint of Object.keys(beacon.H)) {
		beacon.H[hint].r = beacon.H[hint].r || [];
		beacon.H[hint].L = beacon.H[hint].L || [];
		beacon.H[hint].r = [...beacon.H[hint].L];
		if (beacon.CP) for (let i = 0; i < beacon.CP.length; i++) beacon.CP[i] = null;
	}
}
function loadGapi(auth) {
	return new Promise((resolve, reject) => {
		var _a;
		var _b;
		var _c;
		function loadGapiIframe() {
			resetUnloadedGapiModules();
			gapi.load("gapi.iframes", {
				callback: () => {
					resolve(gapi.iframes.getContext());
				},
				ontimeout: () => {
					resetUnloadedGapiModules();
					reject(_createError(auth, "network-request-failed"));
				},
				timeout: NETWORK_TIMEOUT.get()
			});
		}
		if ((_b = (_a = _window().gapi) === null || _a === void 0 ? void 0 : _a.iframes) === null || _b === void 0 ? void 0 : _b.Iframe) resolve(gapi.iframes.getContext());
		else if (!!((_c = _window().gapi) === null || _c === void 0 ? void 0 : _c.load)) loadGapiIframe();
		else {
			const cbName = _generateCallbackName("iframefcb");
			_window()[cbName] = () => {
				if (!!gapi.load) loadGapiIframe();
				else reject(_createError(auth, "network-request-failed"));
			};
			return _loadJS(`${_gapiScriptUrl()}?onload=${cbName}`).catch((e) => reject(e));
		}
	}).catch((error) => {
		cachedGApiLoader = null;
		throw error;
	});
}
var cachedGApiLoader = null;
function _loadGapi(auth) {
	cachedGApiLoader = cachedGApiLoader || loadGapi(auth);
	return cachedGApiLoader;
}
/**
* @license
* Copyright 2020 Google LLC.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var PING_TIMEOUT = new Delay(5e3, 15e3);
var IFRAME_PATH = "__/auth/iframe";
var EMULATED_IFRAME_PATH = "emulator/auth/iframe";
var IFRAME_ATTRIBUTES = {
	style: {
		position: "absolute",
		top: "-100px",
		width: "1px",
		height: "1px"
	},
	"aria-hidden": "true",
	tabindex: "-1"
};
var EID_FROM_APIHOST = /* @__PURE__ */ new Map([
	["identitytoolkit.googleapis.com", "p"],
	["staging-identitytoolkit.sandbox.googleapis.com", "s"],
	["test-identitytoolkit.sandbox.googleapis.com", "t"]
]);
function getIframeUrl(auth) {
	const config = auth.config;
	_assert(config.authDomain, auth, "auth-domain-config-required");
	const url = config.emulator ? _emulatorUrl(config, EMULATED_IFRAME_PATH) : `https://${auth.config.authDomain}/${IFRAME_PATH}`;
	const params = {
		apiKey: config.apiKey,
		appName: auth.name,
		v: SDK_VERSION
	};
	const eid = EID_FROM_APIHOST.get(auth.config.apiHost);
	if (eid) params.eid = eid;
	const frameworks = auth._getFrameworks();
	if (frameworks.length) params.fw = frameworks.join(",");
	return `${url}?${querystring(params).slice(1)}`;
}
async function _openIframe(auth) {
	const context = await _loadGapi(auth);
	const gapi = _window().gapi;
	_assert(gapi, auth, "internal-error");
	return context.open({
		where: document.body,
		url: getIframeUrl(auth),
		messageHandlersFilter: gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER,
		attributes: IFRAME_ATTRIBUTES,
		dontclear: true
	}, (iframe) => new Promise(async (resolve, reject) => {
		await iframe.restyle({ setHideOnLeave: false });
		const networkError = _createError(auth, "network-request-failed");
		const networkErrorTimer = _window().setTimeout(() => {
			reject(networkError);
		}, PING_TIMEOUT.get());
		function clearTimerAndResolve() {
			_window().clearTimeout(networkErrorTimer);
			resolve(iframe);
		}
		iframe.ping(clearTimerAndResolve).then(clearTimerAndResolve, () => {
			reject(networkError);
		});
	}));
}
/**
* @license
* Copyright 2020 Google LLC.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var BASE_POPUP_OPTIONS = {
	location: "yes",
	resizable: "yes",
	statusbar: "yes",
	toolbar: "no"
};
var DEFAULT_WIDTH = 500;
var DEFAULT_HEIGHT = 600;
var TARGET_BLANK = "_blank";
var FIREFOX_EMPTY_URL = "http://localhost";
var AuthPopup = class {
	constructor(window) {
		this.window = window;
		this.associatedEvent = null;
	}
	close() {
		if (this.window) try {
			this.window.close();
		} catch (e) {}
	}
};
function _open(auth, url, name, width = DEFAULT_WIDTH, height = DEFAULT_HEIGHT) {
	const top = Math.max((window.screen.availHeight - height) / 2, 0).toString();
	const left = Math.max((window.screen.availWidth - width) / 2, 0).toString();
	let target = "";
	const options = Object.assign(Object.assign({}, BASE_POPUP_OPTIONS), {
		width: width.toString(),
		height: height.toString(),
		top,
		left
	});
	const ua = getUA().toLowerCase();
	if (name) target = _isChromeIOS(ua) ? TARGET_BLANK : name;
	if (_isFirefox(ua)) {
		url = url || FIREFOX_EMPTY_URL;
		options.scrollbars = "yes";
	}
	const optionsString = Object.entries(options).reduce((accum, [key, value]) => `${accum}${key}=${value},`, "");
	if (_isIOSStandalone(ua) && target !== "_self") {
		openAsNewWindowIOS(url || "", target);
		return new AuthPopup(null);
	}
	const newWin = window.open(url || "", target, optionsString);
	_assert(newWin, auth, "popup-blocked");
	try {
		newWin.focus();
	} catch (e) {}
	return new AuthPopup(newWin);
}
function openAsNewWindowIOS(url, target) {
	const el = document.createElement("a");
	el.href = url;
	el.target = target;
	const click = document.createEvent("MouseEvent");
	click.initMouseEvent("click", true, true, window, 1, 0, 0, 0, 0, false, false, false, false, 1, null);
	el.dispatchEvent(click);
}
/**
* @license
* Copyright 2021 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
/**
* URL for Authentication widget which will initiate the OAuth handshake
*
* @internal
*/
var WIDGET_PATH = "__/auth/handler";
/**
* URL for emulated environment
*
* @internal
*/
var EMULATOR_WIDGET_PATH = "emulator/auth/handler";
/**
* Fragment name for the App Check token that gets passed to the widget
*
* @internal
*/
var FIREBASE_APP_CHECK_FRAGMENT_ID = encodeURIComponent("fac");
async function _getRedirectUrl(auth, provider, authType, redirectUrl, eventId, additionalParams) {
	_assert(auth.config.authDomain, auth, "auth-domain-config-required");
	_assert(auth.config.apiKey, auth, "invalid-api-key");
	const params = {
		apiKey: auth.config.apiKey,
		appName: auth.name,
		authType,
		redirectUrl,
		v: SDK_VERSION,
		eventId
	};
	if (provider instanceof FederatedAuthProvider) {
		provider.setDefaultLanguage(auth.languageCode);
		params.providerId = provider.providerId || "";
		if (!isEmpty(provider.getCustomParameters())) params.customParameters = JSON.stringify(provider.getCustomParameters());
		for (const [key, value] of Object.entries(additionalParams || {})) params[key] = value;
	}
	if (provider instanceof BaseOAuthProvider) {
		const scopes = provider.getScopes().filter((scope) => scope !== "");
		if (scopes.length > 0) params.scopes = scopes.join(",");
	}
	if (auth.tenantId) params.tid = auth.tenantId;
	const paramsDict = params;
	for (const key of Object.keys(paramsDict)) if (paramsDict[key] === void 0) delete paramsDict[key];
	const appCheckToken = await auth._getAppCheckToken();
	const appCheckTokenFragment = appCheckToken ? `#${FIREBASE_APP_CHECK_FRAGMENT_ID}=${encodeURIComponent(appCheckToken)}` : "";
	return `${getHandlerBase(auth)}?${querystring(paramsDict).slice(1)}${appCheckTokenFragment}`;
}
function getHandlerBase({ config }) {
	if (!config.emulator) return `https://${config.authDomain}/${WIDGET_PATH}`;
	return _emulatorUrl(config, EMULATOR_WIDGET_PATH);
}
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
/**
* The special web storage event
*
*/
var WEB_STORAGE_SUPPORT_KEY = "webStorageSupport";
var BrowserPopupRedirectResolver = class {
	constructor() {
		this.eventManagers = {};
		this.iframes = {};
		this.originValidationPromises = {};
		this._redirectPersistence = browserSessionPersistence;
		this._completeRedirectFn = _getRedirectResult;
		this._overrideRedirectResult = _overrideRedirectResult;
	}
	async _openPopup(auth, provider, authType, eventId) {
		var _a;
		debugAssert((_a = this.eventManagers[auth._key()]) === null || _a === void 0 ? void 0 : _a.manager, "_initialize() not called before _openPopup()");
		return _open(auth, await _getRedirectUrl(auth, provider, authType, _getCurrentUrl(), eventId), _generateEventId());
	}
	async _openRedirect(auth, provider, authType, eventId) {
		await this._originValidation(auth);
		_setWindowLocation(await _getRedirectUrl(auth, provider, authType, _getCurrentUrl(), eventId));
		return new Promise(() => {});
	}
	_initialize(auth) {
		const key = auth._key();
		if (this.eventManagers[key]) {
			const { manager, promise } = this.eventManagers[key];
			if (manager) return Promise.resolve(manager);
			else {
				debugAssert(promise, "If manager is not set, promise should be");
				return promise;
			}
		}
		const promise = this.initAndGetManager(auth);
		this.eventManagers[key] = { promise };
		promise.catch(() => {
			delete this.eventManagers[key];
		});
		return promise;
	}
	async initAndGetManager(auth) {
		const iframe = await _openIframe(auth);
		const manager = new AuthEventManager(auth);
		iframe.register("authEvent", (iframeEvent) => {
			_assert(iframeEvent === null || iframeEvent === void 0 ? void 0 : iframeEvent.authEvent, auth, "invalid-auth-event");
			return { status: manager.onEvent(iframeEvent.authEvent) ? "ACK" : "ERROR" };
		}, gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER);
		this.eventManagers[auth._key()] = { manager };
		this.iframes[auth._key()] = iframe;
		return manager;
	}
	_isIframeWebStorageSupported(auth, cb) {
		this.iframes[auth._key()].send(WEB_STORAGE_SUPPORT_KEY, { type: WEB_STORAGE_SUPPORT_KEY }, (result) => {
			var _a;
			const isSupported = (_a = result === null || result === void 0 ? void 0 : result[0]) === null || _a === void 0 ? void 0 : _a[WEB_STORAGE_SUPPORT_KEY];
			if (isSupported !== void 0) cb(!!isSupported);
			_fail(auth, "internal-error");
		}, gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER);
	}
	_originValidation(auth) {
		const key = auth._key();
		if (!this.originValidationPromises[key]) this.originValidationPromises[key] = _validateOrigin(auth);
		return this.originValidationPromises[key];
	}
	get _shouldInitProactively() {
		return _isMobileBrowser() || _isSafari() || _isIOS();
	}
};
/**
* An implementation of {@link PopupRedirectResolver} suitable for browser
* based applications.
*
* @remarks
* This method does not work in a Node.js environment.
*
* @public
*/
var browserPopupRedirectResolver = BrowserPopupRedirectResolver;
var MultiFactorAssertionImpl = class {
	constructor(factorId) {
		this.factorId = factorId;
	}
	_process(auth, session, displayName) {
		switch (session.type) {
			case "enroll": return this._finalizeEnroll(auth, session.credential, displayName);
			case "signin": return this._finalizeSignIn(auth, session.credential);
			default: return debugFail("unexpected MultiFactorSessionType");
		}
	}
};
/**
* {@inheritdoc PhoneMultiFactorAssertion}
*
* @public
*/
var PhoneMultiFactorAssertionImpl = class PhoneMultiFactorAssertionImpl extends MultiFactorAssertionImpl {
	constructor(credential) {
		super("phone");
		this.credential = credential;
	}
	/** @internal */
	static _fromCredential(credential) {
		return new PhoneMultiFactorAssertionImpl(credential);
	}
	/** @internal */
	_finalizeEnroll(auth, idToken, displayName) {
		return finalizeEnrollPhoneMfa(auth, {
			idToken,
			displayName,
			phoneVerificationInfo: this.credential._makeVerificationRequest()
		});
	}
	/** @internal */
	_finalizeSignIn(auth, mfaPendingCredential) {
		return finalizeSignInPhoneMfa(auth, {
			mfaPendingCredential,
			phoneVerificationInfo: this.credential._makeVerificationRequest()
		});
	}
};
/**
* Provider for generating a {@link PhoneMultiFactorAssertion}.
*
* @public
*/
var PhoneMultiFactorGenerator = class {
	constructor() {}
	/**
	* Provides a {@link PhoneMultiFactorAssertion} to confirm ownership of the phone second factor.
	*
	* @remarks
	* This method does not work in a Node.js environment.
	*
	* @param phoneAuthCredential - A credential provided by {@link PhoneAuthProvider.credential}.
	* @returns A {@link PhoneMultiFactorAssertion} which can be used with
	* {@link MultiFactorResolver.resolveSignIn}
	*/
	static assertion(credential) {
		return PhoneMultiFactorAssertionImpl._fromCredential(credential);
	}
};
/**
* The identifier of the phone second factor: `phone`.
*/
PhoneMultiFactorGenerator.FACTOR_ID = "phone";
/**
* Provider for generating a {@link TotpMultiFactorAssertion}.
*
* @public
*/
var TotpMultiFactorGenerator = class {
	/**
	* Provides a {@link TotpMultiFactorAssertion} to confirm ownership of
	* the TOTP (time-based one-time password) second factor.
	* This assertion is used to complete enrollment in TOTP second factor.
	*
	* @param secret A {@link TotpSecret} containing the shared secret key and other TOTP parameters.
	* @param oneTimePassword One-time password from TOTP App.
	* @returns A {@link TotpMultiFactorAssertion} which can be used with
	* {@link MultiFactorUser.enroll}.
	*/
	static assertionForEnrollment(secret, oneTimePassword) {
		return TotpMultiFactorAssertionImpl._fromSecret(secret, oneTimePassword);
	}
	/**
	* Provides a {@link TotpMultiFactorAssertion} to confirm ownership of the TOTP second factor.
	* This assertion is used to complete signIn with TOTP as the second factor.
	*
	* @param enrollmentId identifies the enrolled TOTP second factor.
	* @param oneTimePassword One-time password from TOTP App.
	* @returns A {@link TotpMultiFactorAssertion} which can be used with
	* {@link MultiFactorResolver.resolveSignIn}.
	*/
	static assertionForSignIn(enrollmentId, oneTimePassword) {
		return TotpMultiFactorAssertionImpl._fromEnrollmentId(enrollmentId, oneTimePassword);
	}
	/**
	* Returns a promise to {@link TotpSecret} which contains the TOTP shared secret key and other parameters.
	* Creates a TOTP secret as part of enrolling a TOTP second factor.
	* Used for generating a QR code URL or inputting into a TOTP app.
	* This method uses the auth instance corresponding to the user in the multiFactorSession.
	*
	* @param session The {@link MultiFactorSession} that the user is part of.
	* @returns A promise to {@link TotpSecret}.
	*/
	static async generateSecret(session) {
		var _a;
		const mfaSession = session;
		_assert(typeof ((_a = mfaSession.user) === null || _a === void 0 ? void 0 : _a.auth) !== "undefined", "internal-error");
		const response = await startEnrollTotpMfa(mfaSession.user.auth, {
			idToken: mfaSession.credential,
			totpEnrollmentInfo: {}
		});
		return TotpSecret._fromStartTotpMfaEnrollmentResponse(response, mfaSession.user.auth);
	}
};
/**
* The identifier of the TOTP second factor: `totp`.
*/
TotpMultiFactorGenerator.FACTOR_ID = "totp";
var TotpMultiFactorAssertionImpl = class TotpMultiFactorAssertionImpl extends MultiFactorAssertionImpl {
	constructor(otp, enrollmentId, secret) {
		super("totp");
		this.otp = otp;
		this.enrollmentId = enrollmentId;
		this.secret = secret;
	}
	/** @internal */
	static _fromSecret(secret, otp) {
		return new TotpMultiFactorAssertionImpl(otp, void 0, secret);
	}
	/** @internal */
	static _fromEnrollmentId(enrollmentId, otp) {
		return new TotpMultiFactorAssertionImpl(otp, enrollmentId);
	}
	/** @internal */
	async _finalizeEnroll(auth, idToken, displayName) {
		_assert(typeof this.secret !== "undefined", auth, "argument-error");
		return finalizeEnrollTotpMfa(auth, {
			idToken,
			displayName,
			totpVerificationInfo: this.secret._makeTotpVerificationInfo(this.otp)
		});
	}
	/** @internal */
	async _finalizeSignIn(auth, mfaPendingCredential) {
		_assert(this.enrollmentId !== void 0 && this.otp !== void 0, auth, "argument-error");
		const totpVerificationInfo = { verificationCode: this.otp };
		return finalizeSignInTotpMfa(auth, {
			mfaPendingCredential,
			mfaEnrollmentId: this.enrollmentId,
			totpVerificationInfo
		});
	}
};
/**
* Provider for generating a {@link TotpMultiFactorAssertion}.
*
* Stores the shared secret key and other parameters to generate time-based OTPs.
* Implements methods to retrieve the shared secret key and generate a QR code URL.
* @public
*/
var TotpSecret = class TotpSecret {
	constructor(secretKey, hashingAlgorithm, codeLength, codeIntervalSeconds, enrollmentCompletionDeadline, sessionInfo, auth) {
		this.sessionInfo = sessionInfo;
		this.auth = auth;
		this.secretKey = secretKey;
		this.hashingAlgorithm = hashingAlgorithm;
		this.codeLength = codeLength;
		this.codeIntervalSeconds = codeIntervalSeconds;
		this.enrollmentCompletionDeadline = enrollmentCompletionDeadline;
	}
	/** @internal */
	static _fromStartTotpMfaEnrollmentResponse(response, auth) {
		return new TotpSecret(response.totpSessionInfo.sharedSecretKey, response.totpSessionInfo.hashingAlgorithm, response.totpSessionInfo.verificationCodeLength, response.totpSessionInfo.periodSec, new Date(response.totpSessionInfo.finalizeEnrollmentTime).toUTCString(), response.totpSessionInfo.sessionInfo, auth);
	}
	/** @internal */
	_makeTotpVerificationInfo(otp) {
		return {
			sessionInfo: this.sessionInfo,
			verificationCode: otp
		};
	}
	/**
	* Returns a QR code URL as described in
	* https://github.com/google/google-authenticator/wiki/Key-Uri-Format
	* This can be displayed to the user as a QR code to be scanned into a TOTP app like Google Authenticator.
	* If the optional parameters are unspecified, an accountName of <userEmail> and issuer of <firebaseAppName> are used.
	*
	* @param accountName the name of the account/app along with a user identifier.
	* @param issuer issuer of the TOTP (likely the app name).
	* @returns A QR code URL string.
	*/
	generateQrCodeUrl(accountName, issuer) {
		var _a;
		let useDefaults = false;
		if (_isEmptyString(accountName) || _isEmptyString(issuer)) useDefaults = true;
		if (useDefaults) {
			if (_isEmptyString(accountName)) accountName = ((_a = this.auth.currentUser) === null || _a === void 0 ? void 0 : _a.email) || "unknownuser";
			if (_isEmptyString(issuer)) issuer = this.auth.name;
		}
		return `otpauth://totp/${issuer}:${accountName}?secret=${this.secretKey}&issuer=${issuer}&algorithm=${this.hashingAlgorithm}&digits=${this.codeLength}`;
	}
};
/** @internal */
function _isEmptyString(input) {
	return typeof input === "undefined" || (input === null || input === void 0 ? void 0 : input.length) === 0;
}
var name = "@firebase/auth";
var version = "1.10.8";
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var AuthInterop = class {
	constructor(auth) {
		this.auth = auth;
		this.internalListeners = /* @__PURE__ */ new Map();
	}
	getUid() {
		var _a;
		this.assertAuthConfigured();
		return ((_a = this.auth.currentUser) === null || _a === void 0 ? void 0 : _a.uid) || null;
	}
	async getToken(forceRefresh) {
		this.assertAuthConfigured();
		await this.auth._initializationPromise;
		if (!this.auth.currentUser) return null;
		return { accessToken: await this.auth.currentUser.getIdToken(forceRefresh) };
	}
	addAuthTokenListener(listener) {
		this.assertAuthConfigured();
		if (this.internalListeners.has(listener)) return;
		const unsubscribe = this.auth.onIdTokenChanged((user) => {
			listener((user === null || user === void 0 ? void 0 : user.stsTokenManager.accessToken) || null);
		});
		this.internalListeners.set(listener, unsubscribe);
		this.updateProactiveRefresh();
	}
	removeAuthTokenListener(listener) {
		this.assertAuthConfigured();
		const unsubscribe = this.internalListeners.get(listener);
		if (!unsubscribe) return;
		this.internalListeners.delete(listener);
		unsubscribe();
		this.updateProactiveRefresh();
	}
	assertAuthConfigured() {
		_assert(this.auth._initializationPromise, "dependent-sdk-initialized-before-auth");
	}
	updateProactiveRefresh() {
		if (this.internalListeners.size > 0) this.auth._startProactiveRefresh();
		else this.auth._stopProactiveRefresh();
	}
};
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
function getVersionForPlatform(clientPlatform) {
	switch (clientPlatform) {
		case "Node": return "node";
		case "ReactNative": return "rn";
		case "Worker": return "webworker";
		case "Cordova": return "cordova";
		case "WebExtension": return "web-extension";
		default: return;
	}
}
/** @internal */
function registerAuth(clientPlatform) {
	_registerComponent(new Component("auth", (container, { options: deps }) => {
		const app = container.getProvider("app").getImmediate();
		const heartbeatServiceProvider = container.getProvider("heartbeat");
		const appCheckServiceProvider = container.getProvider("app-check-internal");
		const { apiKey, authDomain } = app.options;
		_assert(apiKey && !apiKey.includes(":"), "invalid-api-key", { appName: app.name });
		const authInstance = new AuthImpl(app, heartbeatServiceProvider, appCheckServiceProvider, {
			apiKey,
			authDomain,
			clientPlatform,
			apiHost: "identitytoolkit.googleapis.com",
			tokenApiHost: "securetoken.googleapis.com",
			apiScheme: "https",
			sdkClientVersion: _getClientVersion(clientPlatform)
		});
		_initializeAuthInstance(authInstance, deps);
		return authInstance;
	}, "PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((container, _instanceIdentifier, _instance) => {
		container.getProvider("auth-internal").initialize();
	}));
	_registerComponent(new Component("auth-internal", (container) => {
		return ((auth) => new AuthInterop(auth))(_castAuth(container.getProvider("auth").getImmediate()));
	}, "PRIVATE").setInstantiationMode("EXPLICIT"));
	registerVersion(name, version, getVersionForPlatform(clientPlatform));
	registerVersion(name, version, "esm2017");
}
/**
* @license
* Copyright 2021 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var authIdTokenMaxAge = getExperimentalSetting("authIdTokenMaxAge") || 300;
var lastPostedIdToken = null;
var mintCookieFactory = (url) => async (user) => {
	const idTokenResult = user && await user.getIdTokenResult();
	const idTokenAge = idTokenResult && ((/* @__PURE__ */ new Date()).getTime() - Date.parse(idTokenResult.issuedAtTime)) / 1e3;
	if (idTokenAge && idTokenAge > authIdTokenMaxAge) return;
	const idToken = idTokenResult === null || idTokenResult === void 0 ? void 0 : idTokenResult.token;
	if (lastPostedIdToken === idToken) return;
	lastPostedIdToken = idToken;
	await fetch(url, {
		method: idToken ? "POST" : "DELETE",
		headers: idToken ? { "Authorization": `Bearer ${idToken}` } : {}
	});
};
/**
* Returns the Auth instance associated with the provided {@link @firebase/app#FirebaseApp}.
* If no instance exists, initializes an Auth instance with platform-specific default dependencies.
*
* @param app - The Firebase App.
*
* @public
*/
function getAuth(app = getApp()) {
	const provider = _getProvider(app, "auth");
	if (provider.isInitialized()) return provider.getImmediate();
	const auth = initializeAuth(app, {
		popupRedirectResolver: browserPopupRedirectResolver,
		persistence: [
			indexedDBLocalPersistence,
			browserLocalPersistence,
			browserSessionPersistence
		]
	});
	const authTokenSyncPath = getExperimentalSetting("authTokenSyncURL");
	if (authTokenSyncPath && typeof isSecureContext === "boolean" && isSecureContext) {
		const authTokenSyncUrl = new URL(authTokenSyncPath, location.origin);
		if (location.origin === authTokenSyncUrl.origin) {
			const mintCookie = mintCookieFactory(authTokenSyncUrl.toString());
			beforeAuthStateChanged(auth, mintCookie, () => mintCookie(auth.currentUser));
			onIdTokenChanged(auth, (user) => mintCookie(user));
		}
	}
	const authEmulatorHost = getDefaultEmulatorHost("auth");
	if (authEmulatorHost) connectAuthEmulator(auth, `http://${authEmulatorHost}`);
	return auth;
}
function getScriptParentElement() {
	var _a;
	var _b;
	return (_b = (_a = document.getElementsByTagName("head")) === null || _a === void 0 ? void 0 : _a[0]) !== null && _b !== void 0 ? _b : document;
}
_setExternalJSProvider({
	loadJS(url) {
		return new Promise((resolve, reject) => {
			const el = document.createElement("script");
			el.setAttribute("src", url);
			el.onload = resolve;
			el.onerror = (e) => {
				const error = _createError("internal-error");
				error.customData = e;
				reject(error);
			};
			el.type = "text/javascript";
			el.charset = "UTF-8";
			getScriptParentElement().appendChild(el);
		});
	},
	gapiScript: "https://apis.google.com/js/api.js",
	recaptchaV2Script: "https://www.google.com/recaptcha/api.js",
	recaptchaEnterpriseScript: "https://www.google.com/recaptcha/enterprise.js?render="
});
registerAuth("Browser");
//#endregion
//#region node_modules/.pnpm/firebase@11.10.0/node_modules/firebase/app/dist/esm/index.esm.js
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
registerVersion("firebase", "11.10.0", "app");
//#endregion
export { signOut as _, browserPopupRedirectResolver as a, initializeApp as b, getAdditionalUserInfo as c, initializeAuth as d, onAuthStateChanged as f, signInWithPopup as g, signInWithEmailAndPassword as h, browserLocalPersistence as i, getAuth as l, sendPasswordResetEmail as m, GithubAuthProvider as n, browserSessionPersistence as o, onIdTokenChanged as p, GoogleAuthProvider as r, createUserWithEmailAndPassword as s, AUTH_ERROR_CODES_MAP_DO_NOT_USE_INTERNALLY as t, indexedDBLocalPersistence as u, updatePassword as v, FirebaseError as x, getApps as y };
