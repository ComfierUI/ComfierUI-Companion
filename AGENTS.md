# Project instructions

## Source ownership and exact scope — mandatory

ComfierUI is the frontend implementation. Trace each requested change through its current source, state, event/lifecycle and render path before editing. Identify the existing owner and all existing writers. Make the change at that owner and remove any superseded correction for that same behavior. Never add a downstream DOM repair, stylesheet override, prototype wrapper, delayed retry/burst, observer or polling workaround to counteract behavior we control at its source. Do not infer a current owner from an obsolete path or an older release. Establish it from the current code and evidence.

The UI Editor is our shared authority for on-screen layout and appearance. Its deliberate control registration, layout rendering, resizing, movement, per-view settings and theme integration are source-owned behavior, not patches to distribute among individual components. Preserve that ownership. Components create their structure and publish controls/state through the established interfaces; do not create competing layout/appearance owners. Runtime calculations and user-configurable settings remain runtime calculations and settings; “at source” does not mean replacing them with fixed user values.

Change only the requested behavior and the code necessary to implement it. Existing anchors, dimensions, padding, order, dropdown style, scrolling, Back hierarchy, events, storage keys and defaults exist for established reasons. A request to change padding authorizes changing that padding, not its anchor. Preserve surrounding behavior and all four independent view keys. Do not reorganize or simplify unrelated code while fixing a local issue. For App Settings specifically, keep its source warning and change only what was requested; inline dropdowns must remain inline.

Before declaring completion, verify the actual changed owner and its affected interactions, compare the diff for unrelated changes, and distinguish source/callback tests from rendered-browser or physical-device acceptance. Keep evidence outside release roots. If a check fails, correct the established source path; do not broaden the scope to make the check pass. Continue while evidence shows progress. A two-attempt rule concerns attempts without progress, not two arbitrary tool calls.

Known third-party integrations are LTX Director precision and LoRA Manager; Memory Tools has a small icon/theme mapping. Preserve these explicit adapters. The resource monitor, including its Crystools-derived appearance, is our own code (`ResourceFills.vue`, `resource_monitor.py`) and requires no Crystools installation. Its layout/appearance remains under the shared UI Editor. Third-party status must be established from an actual integration boundary, never inferred from an old class name or copied origin.

## Release delivery — mandatory

Ship app and Companion ZIPs with project CONTENTS at archive root, never inside an extra containing directory. Put Build Notes, reports, validation logs and audit evidence only in a separate Build Notes ZIP. Preserve historical notes without reading them as an investigation shortcut. Never overwrite a delivered archive; use immutable, unique filenames. Synchronize app/Companion versions, frontend copies, inventory hashes and builtin module identities. Keep the app upgrade catalog empty unless the user explicitly requests otherwise.

For every app release, include the exact copyable launch command using that release’s extracted folder, in this form:

```sh
cd /storage/emulated/0/Download/ComfierUI_<VERSION>-Dev && studio run
```

Substitute the actual version before delivery; never send a stale folder or a command requiring the user to assemble it. Do not claim APK compilation or device acceptance unless performed.

Preserve existing UI behavior and four-view geometry. No new observers or polling.

## Observer policy — ABSOLUTE, NO EXCEPTIONS

Never introduce new `MutationObserver`, `ResizeObserver`, `IntersectionObserver`, or any other observer beyond the 15 already supplied by default ComfyUI. There is no last-resort exception. If a feature cannot be implemented through existing owners, lifecycle callbacks, stores, or events without adding observers, that feature cannot be implemented. No substitute polling loops or recurring timers. Preserve the default observer set unchanged.

## Character field sizing

Use this as an internal implementation rule, not a runtime sizing helper or user-facing system. Use a bundled fixed-width font at an explicit font size with a verified pixel advance for every allowed character. Content width = that character advance × character count. Add exactly 4px padding on each side; add border widths separately to the total border-box width. Hex inputs have six characters with # outside; Companion Port displays four characters. Set width/min-width/max-width/flex-basis consistently so other layout rules cannot shrink them. Do not estimate using generic monospace, ch units, inherited font metrics or subtract-after-render width helpers. Keep other field behavior and geometry outside the requested scope unchanged.

Current font: bundled Comfier Field Mono (DejaVu Sans Mono subset), normal 400 at 14px. All hexadecimal glyphs and decimal digits have advance 1233/2048 × 14 = 8.4287109375px. With 8px total horizontal padding and two 1px borders: hex border-box width 60.572265625px; port border-box width 43.71484375px. Font asset and its license ship in both frontends.

## Phase-based synchronized versioning
Starting next version 0.98.10, ComfierUI and Companion share numeric versions (the app adds -Dev). Small fixes/stages advance the final component; completed phases advance the middle component and reset final to 0. Never carry 0.99.x automatically to 1.0.0: use 0.100.0. Version 1.0.0 requires explicit approval. Compile/launch-only corrections may keep the version but must use unique archive filenames; never overwrite an archive.

## Retired primary dock close controls (0.98.12)
All panel Close buttons were deliberately removed in 0.98.12, including shared dock, LoRA and Jobs History controls. Do not restore any of them. Settings Help and Clear Job History must retain their pre-0.98.11 sizes and positions. Panels close through their launcher toggle and applicable Back/Escape owners. LoRA manager retains the normal side-panel resizing behavior. Preserve phone-landscape top-to-bottom geometry and stacking; never add observers, polling, or recurring timers.

Release notes and validation reports belong only in the separate Build Notes archive, not app/Companion release roots. Never reintroduce panel Close buttons unless explicitly requested; panel dismissal uses its launcher toggle or Back/Escape.

## Topbar 0.98.14 safeguards
Top bar is a separate nonmergeable layout group. It participates in normal lane movement, sizing, and multiselection; the Merge Containers action must disappear whenever this group is selected. Each view remains an independent layout contract. The workspace’s current canvas-region upper edge anchors top lanes with 4px padding. The canvas region already reflects the document’s actual upper content; never anchor to a movable top bar, assume an optional rgthree height, or use the screen origin. Ordinary outerLandscape PHONE panel geometry and stacking are untouchable. Preserve upstream workflow tab state, order, scroll semantics, and optional rgthree positioning. The editor toolbar is the established 92px hub with two 80×40px buttons and a separate menu and hides only while actual button/container movement occurs. Never add observers, polling, or recurring timers.

## Floating editor and tab bounds 0.98.17
The editor toolbar has no bottom divider. Editor inspectors respect occupied lanes and layer above the toolbar; ordinary outerLandscape panel geometry and stacking must never be modified. Vertical workflow tabs retain a 150px maximum length matching horizontal tab label maximum.

The UI Editor inspector is an explicit exception to normal phone-landscape full-height panel rules. It must leave the established clearance from every selected container, including top/bottom lanes and inner tracks, and keep its own scrollable body. Do not let a full-height or minimum-height fallback cover the selected container. Phone-landscape numeric fields commit valid input through their source setters without relying on a later IME blur/change event, retaining one undo checkpoint per focus/edit session. Other views retain their established commit behavior.

## 0.98.17 portrait and landscape top bar correction
Vertical lanes rotate the intact stock horizontal workflow bar (right +90°, left +270°), preserving native horizontal workflow scrolling and tab sizing. Phone landscape editor bounds derive from the canvas region, never from a movable top bar; phone-landscape normal floating panels and their geometry are untouched. Do not add observers, polling, or recurring timers.
