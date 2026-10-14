# ComfierUI Companion 0.14.0

Paired with ComfierUI 0.98.0-Dev. Canvas framing accepted across all four views. Includes PNG themes, Canvas Live Gallery and UI Editor container merging/group movement. Install over the existing extension, preserve settings/themes and restart ComfyUI.

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

For this full ZIP, extract into the existing ComfierUI Companion custom_nodes directory. Preserve user themes/settings, diagnostics/scripts/backups, gateway_port.json and browser_start.json, then restart ComfyUI. Builtin core/frontend83 supersede earlier installed modules while retaining user configuration. The app upgrade catalog remains empty because this full package supplies the hosted update.

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
