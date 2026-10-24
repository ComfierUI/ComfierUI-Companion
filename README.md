# Current 0.100.15

UI Editor corner overlaps retain drag orientation across all three tracks and inherit a new orientation outside overlaps. Container hover pushes neighbors live into the next track. Successful group-lock, tap-to-link and Gradle fixes retained. See the separate build notes for changes and validation. Previous documentation follows.

# Current 0.100.14

Group boxes respect canvas body lock and retain move-handle movement. Successful tap-to-link and Gradle configuration-cache fixes retained. See the separate build notes for changes and validation. Previous documentation follows.

# Current 0.100.13

Tap-to-link occupied-input source replacement and multi-select routing fixes. See the separate build notes for changes and validation. Previous documentation follows.

# Current 0.100.12

Import all three FLUX 3 component ZIPs created automatically by toolkit1.3.26. Select the imported diffusion, CLIP and VAE in the supplied stock workflow. EmptyFlux2LatentImage uses 128 channels and multiples16; ReferenceMultiLatent retains image references/ZeroOut. QNN uses recorded shapes with complete dynamic ONNX CPU fallback. See HANDOFF.md for current runtime contracts and unverified hardware boundaries.

# Current 0.100.11

Create a new Model Pipeline · Generate / Edit node for the revised widgets.
Connect Load Diffusion Model MODEL → model, Load CLIP CLIP → clip, Load VAE VAE → vae, and its IMAGE output → Save Image.
Connect the subject image to image; use image_a for the optional scene/outfit/object. Each has an enabled toggle and weight0–10 in0.1 steps (default10, preserving the prior attention boost). Both toggles off gives text-to-image. Weights follow the exported attention log-weight semantics rather than a linear image blend. Enter the normal prompt and optional plain-text system prompt. Standard negative conditioning nodes remain elsewhere; this edit interface has no negative field.

After Hub finishes, toolkit1.3.11 Package-Components.ps1 packages the original source components and completed cloud artifacts into three independently reusable ZIPs. It performs no export/calibration/quantization and does not restart the running conversion. Default source ONNX fallback permits other complete input shapes on CPU, with large storage/memory costs. Explicit -CompiledOnly produces smaller packages; unmatched compiled shapes/controls then have no CPU fallback. Import the ZIPs in the existing manager. Separate component packages appear in Diffusion Models, CLIP and VAE and retain the existing deletion confirmation/dependency protection.

Local Lab has its own connection section beneath Comfy Cloud. Android0.100.11-Dev and Companion0.100.11 stay paired; modules159. The Android native binaries and shared layout/gesture owners are unchanged. Host fixture/source checks are separate from phone/QNN/full-model image acceptance. Arbitrary Python custom-node execution remains unavailable in Local Lab.

Historical documentation follows. Current instructions above supersede older pipeline wiring.

0.100.10: prompt editing now requires release physically inside the same multiline field before the long-hold threshold. Search for Conditioning (Zero Out), zero out or ConditioningZeroOut. Native model management has diffusion/checkpoint/LoRA/CLIP/VAE/extension sections. Extension ZIP files are importable into custom_nodes, but Python execution and dependency installation remain unavailable in Local Lab; imported sources explicitly report this and are not marked installed. This release does not make comfyui-krea2edit Python nodes executable. Complete generation packages remain under Checkpoints. The conversion toolkit is unchanged.

# ComfierUI Companion 0.100.10

Qwen Image 2.1 MNN testing support is included in the Android local backend. The specialized ARM64 MNN/OpenCL runtime is bundled. Import an upstream model ZIP, open model Help → Open Qwen Image Edit Workflow, select/upload a reference, and run. Disconnect references for text-to-image. Additional reference inputs can be chained with Qwen Reference Images. FaceID-specific nodes, analysis and setup UI are removed for this round. Existing model files are not automatically deleted.

INT4 Turbo + Tiny VAE is the initial setup. Steps, CPU/OpenCL stage backends, reference scale, batch size and dimensions are user controlled. No RAM-estimate refusal, 100-step cap, forced six steps or prompt truncation. At six steps Turbo retains the published schedule; other requested counts explicitly resample that curve and are experimental. The model needs actual multiples of32 and uint32 seeds; these two checks remain.

This is native Android execution; no ComfyUI Python extension is required. The model ZIP importer handles graph/weight/config dependencies in their upstream paths. This does not add a Python/PyTorch custom-node runtime.

Paired with Android0.100.10-Dev; builtin modules154. The Qwen engine is Android-native; Companion remains the host connection/frontend package.

Earlier release documentation follows.
# ComfierUI Companion 0.100.5

FaceID component loaders enumerate installed assets and executable graphs. Vision/projection resolve independently of the selected diffusion package, fixing JSONException: No value for vision. Matching graphs in an installed FaceID package can be reused with another selected diffusion model. Actual backend tensor/input failures remain visible; raw weights are not silently treated as compiled graphs.

Seed clamping and actual compiled resolution checks remain. Paired app/Companion0.100.5; Android versionCode999, builtin modules153.

Earlier release documentation follows.
# ComfierUI Companion 0.100.4

Local component testing update: selected raw-QNN VAEs can decode ORT-denoised latents through the new metadata-driven JNI loader. Independent MNN CLIP loading is available for mixed component jobs. The importer no longer gates on pinned model/SDK/chipset release identities. Batch jobs and multiple sampling/output chains execute in sequence without a batch-one or single-chain policy cap. LoRA strength widgets accept finite negative and above-one values. Unknown compiled adapter/conditioning inputs fail at the actual component interface rather than being silently ignored.

Dan's accepted exceptions are retained: existing seed ranges/clamping and actual compiled diffusion resolution checks. File integrity, path isolation, real tensor extents/types and resource cleanup remain enforced. This does not make an already compiled graph contain additional adapters or change its tensor contract. Raw safetensors assets can be stored, but require a matching compiled execution graph when used.

ARM64 JNI has been rebuilt with NDK r28c, with MNN 3.6.1 CPU and libc++ shared dependencies included and hash-pinned. Full Android APK compilation, physical-device execution and image quality are not claimed by the host tests. No model recompilation is required to try the VAE swap.

Paired with ComfierUI 0.100.4-Dev; builtin modules 152. Existing host behavior and saved settings are preserved.

Earlier release documentation follows.

Paired with ComfierUI 0.100.3-Dev. This Companion package updates release/module metadata and the unrestricted-development instructions. Prompt execution changes are in the Android Local Lab runners. Existing host behavior and saved settings are preserved.

Earlier release documentation follows.

Paired with ComfierUI 0.98.9-Dev / Companion 0.14.9; Android versionCode 936; builtin core/frontend 92. Surgical changes: MULTI label/indicator 1px spacing; responsive centered resource fill meters and value labels; remove container-name input from Dimensions; align Companion Port and Apply heights; Templates sidebar second tap closes its panel via its existing owner. Existing settings, layout and templates data unchanged. No new observers, polling or timers. Device validation pending.

# ComfierUI Companion 0.14.8

Paired with 0.98.8-Dev; builtin core/frontend91. Exact finalized settings order, inline dropdowns and desktop Silent launch; all-container Autofill Lane, wider Canvas warning OK and actual Extensions launcher toggle. Install over the existing extension and restart ComfyUI. Desktop close buttons, broader Escape parity and mixed-side movement default deferred to next thread.

Desktop Settings → Help now uses the updated desktop guide. Android-only Tap to Link and Node Handles and Canvas Locking topics are excluded from the desktop guide. Hosted Android Help retains its existing content. Builtin core/frontend149 keep full-install version precedence; preserve user configuration and restart ComfyUI after replacing the extension files.

## Installation

In ComfyUI, open Extensions and search for ComfierUI-Companion from developer ComfierUI. Choose a compatible release, install it and restart ComfyUI.

For a manual installation, open a terminal in ComfyUI/custom_nodes and run:

```sh
git clone https://github.com/ComfierUI/ComfierUI-Companion.git
python -m pip install -r ComfierUI-Companion/requirements.txt
```

Use the Python interpreter or activated environment that runs ComfyUI. For Windows portable, install requirements from the portable root instead:

```bat
python_embeded\python.exe -s -m pip install -r ComfyUI\custom_nodes\ComfierUI-Companion\requirements.txt
```

Requirements include psutil and nvidia-ml-py for CPU/RAM and NVIDIA telemetry. Restart ComfyUI after installation. Use one installation method; do not create a duplicate extension installation.

For this full ZIP, extract into the existing ComfierUI Companion custom_nodes directory. Preserve user themes/settings, diagnostics/scripts/backups, gateway_port.json and browser_start.json, then restart ComfyUI. Builtin core/frontend91 supersede earlier installed modules while retaining user configuration. The app upgrade catalog remains empty because this full package supplies the hosted update.

## UI Editor

Open ComfierUI Settings → UI Editor. The Properties button edits the selected container or buttons; with nothing selected it opens Canvas Image.

### Select and reorder buttons

Select its container first, then tap a button to select it. Drag the selected button to the insertion line, or use Dimensions → Move Earlier / Move Later for one-position changes. Select additional buttons lets you move or style several together.

### Move and resize containers

Long press (or hold left mouse button on PC) a container to move it. Select additional containers to select several; holding a selected container moves them together. Properties replaces that selection button with Merge containers when several are selected. Yes merges their buttons into the first selected container; No keeps them separate. Undo restores the merge. Use corner or edge handles to resize, or enter precise dimensions. Lane chooses its edge, middle or inner lane.

### Connected bars

Enable Connected scrollable bar for a single row or column. Visible buttons sets how many fit at once; additional buttons scroll. Autofill lane uses the available lane space.

### Themes and dimensions

Themes controls fills, frames and icon colors. Choose a color, then tap the role you want to change. Dimensions controls widths, icon size, frame thickness and corners. Reset returns that value to its default.

### Global appearance and four views

Global Theme edits the overall theme. Phone portrait, phone landscape, tablet portrait and tablet landscape have separate layouts and canvas image framing. Apply appearance across all views copies styling, not button order or positions. Desktop uses tablet layouts.

### PNG themes and canvas images

In Global Theme → Themes → Profiles, upload a theme PNG or JSON. Choose Colors Only, Layout Only, Canvas Only, Co & L, Co & Ca, L & Ca or Load All. PNG imports that include Canvas open a crop preview before applying. Save a profile to reuse it; sharing a PNG preserves the full image and carries the theme metadata.

### Frame the current canvas

With nothing selected, open Properties → Canvas Image. Drag to position, pinch or scroll to zoom, or use the sliders. Apply to this view saves framing for the current view; Cancel restores the previous image. UI Editor Save retains changes and Discard restores the baseline.

### Canvas Live Gallery

Enable Canvas Live Gallery under Generation preview popup in ComfierUI Settings to show the newest successfully generated image as the canvas. It works on desktop and with automatic downloads disabled. Turn it off to keep and edit the last image using Properties → Canvas Image.

### Resource monitor

Select the monitor to choose visible meters, direction, meter order and fill palettes. Its arrow controls change meter order independently of button order.

### Save, undo and exit

Menu offers Undo and Redo. Use Global Theme to save and load themes. Back first closes a dialog or selection, then offers the editor exit choices. Save your theme to reuse or share its colors and layouts. Hidden controls lets you restore buttons you hid.

## General usage

Settings → Help opens the usage guide. Tap to Link arms an input or output socket; tap a compatible socket to connect and tap the armed socket again to cancel. Multi-Select selects several nodes while allowing entry into subgraphs. Node Handles and Canvas Locking makes move handles the way to move locked nodes; standard resize handles change their size.

Workflows can open in Full Canvas or App Mode. App Mode exposes workflow controls and keeps completed output visible; Full Canvas returns to the graph. Generation preview popup is optional. Canvas Live Gallery is independent of automatic downloads and also works on desktop.

Downloads combines its URL/website form and transfer monitor. Completed model downloads refresh model definitions. Companion provides extension/workflow downloads, host resources, workflow apps and notifications. ComfierUI Settings controls automatic completed-generation downloads, reconnect, notifications, diagnostics and the companion port.

LTX Director Precision is a frame accurate timeline editor for the LTX Director node. Open it with the Precision button on that node in the canvas; select a timeline item and adjust its Start or End with frame controls or exact frame fields.

Phone portrait, phone landscape, tablet portrait and tablet landscape have independent layouts and canvas framing; desktop uses tablet layouts. Hosted and Cloud preferences/theme libraries are separate. Hosted saved themes synchronize with the Companion themes folder, which must be preserved during updates. PNG exports carry theme metadata while preserving the full image and its workflow metadata; portable canvas images retain the existing 4 MiB PNG limit.

## Connecting

Start ComfyUI normally; --listen is not required. In the app, use Self hosted > profile dropdown > Add profile. Enter a nickname, the host name or IP address, and the gateway port in its separate field (8147 by default). Save, select the profile and choose Connect. Manage profiles edits, sets the default or deletes profiles. The app supports up to five self hosted profiles. Comfy Cloud uses its independent API-key connection and does not require a local host.

On the host, open http://127.0.0.1:8147/ for the desktop frontend, using the configured gateway port if changed. ComfierUI Settings controls the gateway port and browser startup page. ComfyUI normally remains on port 8188.

**Never forward port 8188 or the ComfierUI Companion gateway port through your router or expose them directly to the public internet. Use a private VPN such as Tailscale for access away from home.**

See LICENSE.md for original ComfierUI Companion MIT terms, modified ComfyUI frontend GPLv3 terms, attribution and corresponding-source requirements. Retain those notices when redistributing.


## 0.98.10 — Port height and version alignment
The Companion Port input now matches the established 40px Apply button height by correcting the source-owned, high-priority CSS rule; measured width, validation, and other settings are unchanged. App and Companion versions are now synchronized at 0.98.10.

**One-time version alignment (0.98.10):** Companion advances from 0.14.9 to 0.98.10 to align with ComfierUI 0.98.10-Dev. From this release forward, both products share matching version numbers: small/staged changes increment the final component, completed phases increment the middle component and reset the final to zero, and 1.0.0 requires an explicit release-readiness decision.
