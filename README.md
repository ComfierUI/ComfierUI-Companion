# ComfierUI Companion 0.8.2

Based on Companion 0.8.1. Restores only Diag → Performance, its collector, profiling hooks, menu/export entry, translation and matching source maps from 0.8.0. No standalone app monitor is added. Android and its guide are unchanged. Main diagnostics, host services, desktop editor and other behavior are preserved.

Companion version 0.8.2; paired module identities 24 with updated payload hashes. Verified that frontend differences from 0.8.1 are confined to three monitor-related chunks, their restored maps and the integrity manifest. Python compilation, Companion frontend integrity loader and root ZIP checks pass. No live server/browser test performed.

Install into the existing Companion directory, preserve settings/themes/diagnostic scripts and backups, and restart ComfyUI.

# ComfierUI Companion 0.8.0

Companion gateway and host services for ComfierUI 0.93.0-Dev, including the custom frontend built from ComfyUI frontend 1.57.0 source. Connect the app or a desktop browser to http://HOST-IP:8147. The ComfyUI backend normally remains on 8188. App self-hosted connections require Companion; Comfy Cloud runs directly without a local host.

Install into your existing Companion custom_nodes directory. Preserve user themes/settings, diagnostics/scripts/backups, gateway_port.json and browser_start.json, replace obsolete packaged code, and restart ComfyUI. Older Companion versions without the stable module loader require this complete package once.

## Python requirements

Install requirements using the Python interpreter actually running ComfyUI, then restart ComfyUI:

```sh
python -m pip install -r requirements.txt
```

For Windows portable, from its root, substitute your Companion directory name:

```bat
python_embeded\python.exe -s -m pip install -r ComfyUI\custom_nodes\YOUR_COMPANION_DIRECTORY\requirements.txt
```

This includes psutil and nvidia-ml-py for host CPU/RAM and NVIDIA telemetry.

## Desktop UI Editor

Open ComfierUI settings, then UI Editor. Click a container to select it; click a button in the selected container to select that button. Mouse dragging moves selected buttons between containers and moves containers between edge lanes without a hold delay. Touch keeps the existing long-press behavior. Colors and Dimensions are separate tabs. Save keeps edits; Cancel restores them. Undo/redo use Ctrl+Z/Ctrl+Y. The top bar stays fixed but its appearance is editable. Desktop windows use tablet layouts; the desktop Menu omits cross-view layout copying.

Themes are cross-compatible across app, Cloud and desktop. Fresh installs use the supplied Default profile. Saved themes and layouts retain precedence on restart. Settings/editor panels use fixed readable colors. Native LiteGraph fonts, nodes, sockets and spline colors remain native.

The unified Downloads panel includes the URL/website form and its monitor, with pause/resume/cancel. Companion provides model/extension/workflow download services, host resources, theme sync, workflow apps, notifications and the full diagnostic suite. Enable Diagnostic Mode in ComfierUI settings and open Diag for reports, script editing, launch order and backups.

## Delivery boundary

The gateway validates the complete packaged frontend before serving it and fails closed when assets are missing or corrupt. Stock UI fallbacks and the stock feed are blocked. Backend APIs, websocket events, media and approved extension scripts retain their routes. Android device implementations stay in the app and are absent from the public frontend.

Protocol1 ships paired companion-core/hosted-frontend module version22. Only newer compatible modules are offered; dependencies commit together and activate on restart. User files stay at the extension root.

Production build, automated tests and compiled desktop/Hosted/Cloud browser checks pass. Physical Android and live inference/provider downloads are not certified here. Full source overlay and validation evidence are in the separate Build Notes archive.
