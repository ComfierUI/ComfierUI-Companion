# Companion 0.4.4 — host theme folder and native sidebar shortcut

Pair with ComfierUI 0.87.5-Dev (version code 692).

Drop exported theme `.json` files directly into `themes/`. Opening Theme Settings → Profiles fetches the latest list once; close/reopen Profiles after adding or changing files. There is no background poll and no dedicated Refresh button. Host files are read-only from the client. Load applies a host theme; Save stores a device copy. Upload imports a downloaded JSON file into the device and applies it immediately; Share in the Save dialog exports JSON to Downloads.

App Settings adds Right-side Sidebar below Notifications. It changes the native Comfy.Sidebar.Location setting through its API and follows native changes. The existing native setting remains accessible and authoritative; no separate layout preference is stored.

Replace extension files, preserve `diagnostics/` and `themes/`, restart ComfyUI once for this update and reconnect the app. Subsequent theme additions need no restart. See themes/README.md for JSON format and limits. Invalid files are skipped with a host log message.

Validation: host folder refresh/validation test, 154 Companion layout checks and shared client theme/native-setting browser checks passed. Actual Android picker/Downloads and live ComfyUI validation remain required.

## Previous release (historical)

# ComfierUI Companion 0.4.3 — native sidebar location

Pairs with **ComfierUI 0.87.3-Dev**. Use Comfy's native **Sidebar Location** setting. Saved right-side preferences work on startup; reactive settings hydration and live native setting changes update the layout. The private App Settings toggle is removed; its stored value is ignored.

Fixes actionbar surface discovery and places it at the former upper-left menu anchor in right-side mode. Run retains native button order; Run and canvas-toolbar anchors exchange outside outer portrait, including their vertically stacked outer-landscape positions. Outer portrait retains its existing stack.

Replace the existing extension files, preserve `diagnostics/`, restart ComfyUI and reconnect/Hard Refresh. Do not install a duplicate extension. 154 native-setting/layout browser checks and 30 popup regression checks pass; live-device verification is still required. Keep 0.4.1 as the last confirmed clean rollback.

## Previous release (historical; private toggle superseded above)

# ComfierUI Companion 0.4.2 — right-side layout field test

Pair with **ComfierUI 0.87.2-Dev**. Enable **App Settings → Right-side Layout**, below Notifications. Default remains left; the local preference does not change other clients' server settings.

Mirrors sidebar and panel placement, horizontal control ordering, workflow/action controls, canvas and Run controls, search, menus, logs/downloads and custom tool panels. Preserves the existing shared mutation broker, fixed view families, rail behavior and the confirmed 0.4.1 popup fixes.

Replace the existing Companion extension files, preserve `diagnostics/`, restart ComfyUI, then reconnect or Hard Refresh. Do not install a second copy alongside the existing extension.

Validation: 161 rendered layout checks in Companion mode, including live side switching, rotation, UI scales, LoRA panel geometry, connected touch scrolling and node search; 30 popup regression checks. This is a field-test release, not yet device-confirmed. Keep 0.4.1 as the clean rollback base.

## Previous release (historical)

# ComfierUI Companion 0.4.1

- Keeps native Job Details cards fully within the visible viewport at different UI scales, with scrolling for long content.
- Gives Settings circle-i tooltips bounded placement and tap-to-open/tap-to-close behavior, plus outside-tap, Back and Escape dismissal.
- Pairs with **ComfierUI 0.87.1-Dev**. Install the updated client for multiline editor synchronization with host autocomplete changes in both connection modes.
- Retains the locked white Companion Display Mode checkbox and the clean 0.4.0 sidebar/layout base.

Replace the existing extension files, preserve its `diagnostics/` folder, and restart ComfyUI. Reconnect or Hard Refresh the app. Do not install a second extension copy alongside the existing one.

Validation: 30 rendered Chromium checks in Companion mode, syntax and paired-module consistency checks passed. Live ComfyUI/LoRA Manager and Android device verification remain required.

## Previous release (historical)

# ComfierUI Companion 0.4.0

- Moves Companion Display Mode to the first toggle row, below UI Scale and above Node Move Button.
- Uses the same native 22px white checked checkbox and default spacing as the adjacent toggles, replacing the green status square.
- The checkbox stays checked. Mouse/touch/label and keyboard activation are blocked without disabled-control dimming. This remains a status indicator, not a user setting.
- Node Move Button is not renamed in this release.
- Compatible with ComfierUI 0.87.0-Dev; no Android rebuild is required.
- No layout algorithms, notification/download services, Diagnostics, or data-cache behavior changed.

Replace the existing Companion extension files, preserve its diagnostics/ folder, and restart ComfyUI. Reconnect or Hard Refresh the app to load the new module.

Validation: JavaScript/Python syntax, version consistency, row ordering, and checkbox event behavior checked locally. Visual Android verification remains on device.

## Previous release

# ComfierUI Companion 0.3.20-display-mode

Pairs with ComfierUI 0.87.0-Dev. Retains the device-confirmed sidebar and view-map behavior from 0.3.19-stage3-railrevert1.

- Adds **Companion Display Mode — Active** to host-delivered App Settings after the display bundle finishes loading. A static green 22px box with a thin white frame matches the adjacent toggle dimensions; it is not interactive.
- The status module and setting are delivered only by Companion. Nothing for this entry is bundled in the Android app.
- Diagnostics, saved scripts, and backups remain exclusively Companion-owned. The main app no longer contains the native diagnostic bridge or suite.
- No sidebar/layout algorithms, data-cache behavior, download services, or progress services changed in this release.
- Connect through the 8147 gateway for display mode. Direct 8188 connections retain the main app's standalone UI without Diagnostics or the display-mode row.

Install by replacing the existing Companion extension files and restarting ComfyUI. Keep the existing `diagnostics/` folder to preserve host scripts/backups. Do not install a second copy alongside the existing extension.

Validation: focused source/behavior checks passed. Android build/device testing and browser rendering remain unverified. See the app release’s `VALIDATION.md`.

## Previous release and installation reference

# ComfierUI Companion 0.3.19-stage3-railrevert1

This is the non-VR Companion build for ComfierUI. It retains the Android and
browser services from 0.3.4 while removing the paused ComfyQuest spatial
workflow, layout, queue, theme-state, and VR client-capability integrations.

## 0.3.19-stage3-railrevert1

- Persist native sidebar shell ownership directly on `nav.side-tool-bar-container` so Comfy connected-state flips cannot flatten the rail for a paint.
- Fixed view-map now owns Canvas Toolbar visibility idempotently as well as geometry, preventing tablet-portrait left-panel opens from hiding it.

- Freeze the unified floating rail's native floating shell (radius/background/border/shadow) so Comfy's connected-panel state cannot visually flatten it on first panel open.
- Add a fixed view-family map for the five main UI anchors: unified rail, workflow menu, actionbar surface, Graph Canvas Toolbar, and Run/Execution dock.
- Inner portrait, inner landscape, and tablet views share geometry rules while retaining their own UI scale.
- Outer landscape uses its connected-rail/topbar/bottom-nav anchors; Outer portrait centers Canvas Toolbar 4 CSS px above Run.
- Anchor writes are idempotent and wake only for anchor replacement/drift or a real viewport/view-family change.

- Corrected post-swap side-panel anchors: non-phone-portrait left panels stop above the Graph Canvas Toolbar; right panels/Workflow Overview stop above the Run/Execution cluster.
- Preserved the established phone/outer-portrait shared Run/Queue anchor behavior.
- Added immediate-delivery subscriptions inside the existing single shared MutationObserver for unified-sidebar ownership, eliminating the one-frame first-open dual-rail/sidebar flash without adding another native observer.
- No app-side visual/layout changes required; intended for CUI Companion Test 13 HardStrip.

## Included services

* Host-authoritative generation progress at
  `/comfierui/notifications/progress`, including the current node, sampler
  step, workflow percentage, and running/pending queue counts.
* Restricted host-side model downloads with pause, cancel, resume, retry,
  progress reporting, and completed-entry cleanup.
* Android/browser client capability reporting.
* The shared LAN/Tailscale gateway on port `8147`, including HTTP and WebSocket
  proxying to loopback ComfyUI at `127.0.0.1:8188`.
* The frontend bridge used by ComfierUI's Missing Models controls.

## Install

Choose one installation method, then restart ComfyUI.

### Extension Manager

1. Open ComfyUI's **Extension Manager**.
2. Search for **ComfierUI Companion**.
3. Select **Install** and restart ComfyUI when prompted.

### Git

Open a terminal in `ComfyUI/custom_nodes/` and run:

```bash
git clone https://github.com/ComfierUI/ComfierUI-Companion.git
```

To update an existing Git installation later, open the installed folder and
run `git pull`.

### ZIP

1. Close ComfyUI.
2. Extract the release ZIP.
3. Put the extracted `ComfierUI-Companion` folder in
   `ComfyUI/custom_nodes/`.
4. Start ComfyUI normally.

The final path should be:

```text
ComfyUI/custom_nodes/ComfierUI-Companion/__init__.py
```

No workflow nodes are added. Companion starts automatically with ComfyUI.

## Use

Load a workflow with missing models, open **Workflow Overview > Errors**, and
use Download or Download All. Downloads run on the host so large model files do
not pass through or remain on the Android device.

## Safety limits

* Initial URLs are restricted to HTTPS downloads from Hugging Face, Civitai,
  or GitHub release assets.
* Redirects to private, loopback, link-local, or otherwise non-public network
  addresses are rejected.
* Filenames cannot contain paths and are limited to supported model formats.
* Destinations are restricted to known ComfyUI model directories.
* Existing files are never overwritten.
* Individual downloads are limited to 128 GiB.

ComfyUI does not provide authentication by default. Do not expose its ports to
the public internet; use a trusted LAN or private VPN.


## 0.3.9-stage1 Companion Display transport test

This test build exposes a `ui-display-bundle` capability and serves the current ComfierUI structural/visual JavaScript from the Companion `web/display` bundle. The paired Android side-install test client intentionally does not install those structural overrides from its APK. This is an ownership/transport proof only; it preserves the existing UI behavior rather than redesigning it.


## 8147 root display test
The Companion display proof now treats port 8147 itself as the frontend origin. The WebView loads the normal root URL on 8147; the gateway proxies stock Comfy from 8188 and stamps the HTML before delivery. Detection uses the injected meta marker rather than an inline script, avoiding CSP false negatives.


## 0.3.9-stage1 data accelerator
The 8147 gateway prewarms and memory-caches large/stable Comfy JSON inventory endpoints with single-flight request coalescing. Status is available at `/comfierui/data-cache/status`.

## 0.3.11-stage3 test
Adds a browser-bound parsed-response broker for the large stable Comfy inventory JSON routes already accelerated by Stage 1. The first response is parsed once and retained; repeated same-origin GETs reuse the prepared object and duplicate in-flight requests are coalesced. This does not alter Back, Tap-to-Link, Multi-Node Select, theme, or other device-owned interaction systems.


## 0.3.11-stage3 test
Stage 3 adds host-computed metadata catalogs at `/comfierui/metadata/catalog` and swaps the Graph Canvas Toolbar with the Run/Execution dock in all non-outer-portrait layouts. Both bottom controls use a fixed 4 CSS px external inset. Outer portrait remains unchanged.


## 0.3.19-stage3-railrevert1
- Companion Mode hard-ownership test.
- Diagnostic Suite is delivered entirely by Companion.
- Diagnostic saved scripts/backups live under the Companion custom-node `diagnostics/` folder.
- Companion-owned panels register their own Back callbacks; the Android client no longer names those features.
- Display/version reporting aligned to 0.3.19-stage3-railrevert1.