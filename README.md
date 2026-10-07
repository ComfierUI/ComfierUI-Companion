# ComfierUI Companion

## Install

Companion is a ComfyUI custom-node extension. Install one copy only and restart ComfyUI after installation or updates.

### Git

From `ComfyUI/custom_nodes/`:

```sh
git clone https://github.com/ComfierUI/ComfierUI-Companion.git
```

For updates, run `git pull` inside the installed extension folder.

### Release ZIP

Extract the ZIP contents into `ComfyUI/custom_nodes/ComfierUI-Companion/`. The resulting path must be:

```text
ComfyUI/custom_nodes/ComfierUI-Companion/__init__.py
```

Install `requirements.txt` using the same Python that runs ComfyUI. For Windows portable, run from the portable root:

```bat
python_embeded\python.exe -m pip install -r ComfyUI\custom_nodes\ComfierUI-Companion\requirements.txt
```

For other installations:

```sh
python -m pip install -r requirements.txt
```

Start ComfyUI normally. Companion starts automatically; it adds no workflow nodes.

## Connect

Version **0.7.13**, paired with ComfierUI **0.92.12-Dev**.

Connect the Android app to the host address and Companion port (default **8147**). Open `http://127.0.0.1:8147/` on the host to use the browser interface. ComfyUI continues running on its own port, normally **8188**. Companion's port can be changed in App Settings; 8188 is reserved for ComfyUI.

## App Mode

Generate stays in the panel footer while fields, preview and output scroll above it. Prompt boxes grow and shrink with text, starting at five lines for positive prompts and one for empty negative prompts. Manual resizing remains available. Full Canvas retains complete workflow controls.

## ComfierUI Settings

Host browser settings contain Browser start page, Companion Port, Diagnostic Mode and UI Editor. Choose ComfierUI or Default ComfyUI for the next automatic browser launch. The host remembers this setting. It does not change an open page or enable browser launches for headless runs. Open the Companion port directly anytime to change it. Android and Cloud retain their own controls.

## Features

- Host browser interface with UI Editor, custom layouts and themes.
- Themes compatible with Android, Cloud and host browser modes.
- App Mode for templates and workflows: resolution, prompts, applicable image/video/audio inputs, generation, live preview and outputs. Full Canvas retains the complete graph and seed controls.
- Host workflow preprocessing with client fallback when unavailable.
- Model downloads with progress, pause, resume and cancellation.
- Generation status and notifications for supported clients.
- Themeable CPU, memory and GPU resource monitors where supported.
- Compatible UI updates delivered through the Android app.

App Mode preserves the workflow's wiring and settings. It does not create extra saved workflows. Missing custom nodes/models still need to be installed, and live preview requires backend preview events.

## Updating

Replace the extension files in place, then restart ComfyUI and reconnect or hard-refresh clients. Preserve your existing themes, `gateway_port.json`, `browser_start.json`, `ui_updates`, diagnostics and backups. Do not install a second copy of Companion alongside the first.

## Development

Run the Python tests from the extension folder:

```sh
python -m unittest discover -s tests
```

## License

See [LICENSE](LICENSE).

Live Preview appears only after the workflow sends a preview; workflows without previews leave this section hidden.

UI Editor reset buttons use the text Reset instead of a glyph.

App Mode recognizes editable text inputs feeding LLM prompt enhancement inside subgraphs. Positive prompts appear before negatives. Finished results appear at the top without a heading; live previews remain at the bottom and are hidden when unavailable.

App Mode and LoRA Manager keep their automatic viewport sizing. For other side panels in tablet views and phone landscape, drag the dual-chevron handle outside a side panel’s free edge to change its width. Panels on the same side share the saved width for that view mode. Phone portrait keeps its automatic width. Job History stays docked and has a right-aligned Clear button that opens the standard confirmation dialog.

Job History’s Clear button follows the shared theme background, frame and text colors with the standard rounded shape.

## Download from URL

The Downloads button opens a compact URL form. Paste a model URL, choose a registered host model folder or one of its existing subfolders, and press Download. Accepted downloads open the bottom monitor; its rightmost Add button opens another URL form.

Supported links include Hugging Face file links (resolve or blob), Civitai download links or pages specifying modelVersionId, and GitHub release file links. Provider access requirements still apply. This feature uses Companion’s host download queue; Comfy Cloud has no host folder destination.

## Repository browsing and authenticated downloads

Hugging Face and Civitai browsing buttons are available in Download from URL. Android opens a dedicated embedded browser with Exit and Reload controls. Log in through the site itself; its cookies and site storage stay in Android's WebView storage across panel closes. Provider expiration, account policies and logout still apply. Remote repository pages have no ComfierUI native Javascript interfaces.

Civitai offers Red (`civitai.red`) or Blue (`civitai.com`) with Remember my choice. ComfierUI Settings includes Civitai start page: Ask every time, Red or Blue. This choice is local to the client.

When an Android repository browser opens a supported model download link, ComfierUI returns to the URL form for host folder selection. Companion 0.7.13 uses the temporary session for that download and its retries; cookies remain in memory and are never exposed in download listings or saved as a separate account credential. They are removed from cross-origin redirect requests and discarded after success or clearing the job. Keep host connections on a trusted network; the Companion LAN gateway uses HTTP.

Desktop browsing opens a separate repository window. Paste the model link into the URL form afterward; sharing a website's login session with the desktop Companion downloader is not supported by this build. Embedded sessions are an Android feature. Comfy Cloud still has no user host model filesystem.

Provider login and real gated downloads require on-device verification. Some social login, anti-bot, IP-bound cookie or expired-session flows may not accept an embedded browser session or a transfer from another machine. Unsupported resolved download links are not queued as arbitrary host URLs.

## Repository browser controls

Android repository browsing retains the page and history when a download is selected. Reopen the same repository button to resume browsing. Exit or system Back at the beginning ends that browsing session. Browser toolbar and download chooser controls match the other ComfierUI menus. The supplied generic theme names are retained. Desktop browsing still uses a separate window and manual link paste.

### Download filenames

The URL download form resolves a model filename and lets you edit it before downloading into a registered model folder or subfolder. Downloads opens the URL form and monitoring panel together. Existing files are protected from overwriting. Browser session forwarding remains available in Android.

### Install an extension from a repository URL
Choose custom_nodes in Download from URL, paste a public repository URL, and press Download. Companion clones the repository into the active custom_nodes folder, installs requirements.txt if present using ComfyUI's running Python environment, and exposes Restart after successful completion. Git must be installed on the host. Dependency errors appear in the host console; failed requirements can be retried without cloning again. Existing repository folders are protected.
The Android GitHub browser's Copy URL button copies and selects the repository while preserving the minimized browsing session. Desktop repository buttons open an external browser, matching the existing Civitai/Hugging Face behavior.

### Workflow imports
Choose workflows in Download from URL and select the active user's workflow root or an existing subfolder. JSON files and ZIP archives are supported. Nested ZIP folders are scanned for workflow graphs; media and unrelated JSON metadata are discarded, and the input directory is never populated. Duplicate names receive numbered suffixes instead of overwriting existing files. Use Load on the completed import; multiple workflows open a chooser, then follow the existing App Mode / Full Canvas load preference.
Workflow downloads are limited to 256 MiB, JSON members to 16 MiB each and 64 MiB total; unsafe paths and symlinks are rejected. Supported provider downloads retain the same host URL restrictions and temporary Android session handoff as model downloads.

### Shared theme library

Profiles now shows one editable list. Hosted clients reconcile saved themes with the Companion themes folder at connection, when Profiles opens, and after profile changes. Android stores its library in one private app themes folder shared by hosted and Cloud modes. Old address-specific profiles migrate when revisited. Simultaneous edits are preserved as named copies; offline edits retry on refresh. Keep the themes folder when updating.

Theme files now use readable theme names. Renames retain the sync identity stored inside each JSON file. Existing generated filenames migrate automatically on theme refresh. Unsafe filename characters are replaced; collisions use numbered suffixes. New features are frozen while documentation and existing behavior are refined.

### App Mode field management

Manage Selected Nodes adds/hides editable fields from workflow nodes, including nested subgraphs. Displayed fields and groups can be dragged by their handles; the arrangement is stored with the workflow. Multiline inputs are selected automatically. Connected/read-only inputs remain protected. App Mode and its manager follow panel and UI Font colors. Color theme presets originate in the app and sync to Companion; no preset JSON files ship in this host package. Existing saved themes remain yours.

Bundled themes originate in the Android shared device library. Companion ships an empty theme folder and receives presets through sync. App Mode buttons use transparent rounded frames, themed text/frame colors and centered 20px labels (Generate/Full Canvas remain 25px).

## 0.7.13 desktop correction

Desktop browsers suppress Chrome’s native context menu everywhere using a window capture listener. ComfyUI’s own context menus and event propagation remain available. Native text-field context menus are suppressed too. Android/mobile detection and shared app display assets are unchanged. Compatible with ComfierUI 0.92.12-Dev; no app rebuild needed.
