# ComfierUI Companion 0.10.8

Full Companion update correcting only two displayed UI Editor Help instructions. Select the container before its button; long press includes holding the left mouse button on PC. Preserve settings/themes and restart ComfyUI.

Full Companion baseline for ComfierUI 0.95.8-Dev. Consolidates the accepted app-delivered frontend upgrades: restored panel headers, download completion model refresh, model dropdown guards and spacing, Apps field theming, centered single-line editors, progressive Cloud template filtering and the optional generation-preview popup. Compatible template additions preserve the card grid and loaded pages during sync.

The top bar uses 4px end padding and touch/mouse scrolling for overflowing workflow tabs. Overflow arrows and the workflow overflow menu are removed. Direct Cloud keeps Agent and account controls visible, with Share Feedback in the account dropdown; these account actions remain placeholders pending OAuth whitelisting.

Install into the existing Companion custom_nodes directory and restart ComfyUI. Preserve user themes/settings, diagnostics/scripts/backups, gateway_port.json and browser_start.json. Remove obsolete packaged files when updating. Connect the app or a desktop browser to http://HOST-IP:8147 (or your configured gateway port); ComfyUI normally remains on8188. Self-hosted connections require Companion; direct Comfy Cloud does not require a local host.

The app no longer bundles upgrade payload ZIPs because this package includes the changes directly. The module upgrade system remains available. Built-in core/frontend42 supersede earlier installed upgrades without deleting user configuration. The Companion diagnostic suite and its performance monitor remain included.

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

## Delivery and licensing

The gateway validates its packaged frontend before serving it. Stock UI fallback and stock feed remain blocked. Android device implementations remain in the app; the hosted frontend retains Companion diagnostics and desktop behavior.

See LICENSE.md for the original Companion MIT terms, the modified ComfyUI frontend's GPLv3 terms, attribution, and corresponding-source requirements.
