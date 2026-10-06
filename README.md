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

Version **0.7.0**, paired with ComfierUI **0.93.0-Dev**.

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

When an Android repository browser opens a supported model download link, ComfierUI returns to the URL form for host folder selection. Companion 0.7.0 uses the temporary session for that download and its retries; cookies remain in memory and are never exposed in download listings or saved as a separate account credential. They are removed from cross-origin redirect requests and discarded after success or clearing the job. Keep host connections on a trusted network; the Companion LAN gateway uses HTTP.

Desktop browsing opens a separate repository window. Paste the model link into the URL form afterward; sharing a website's login session with the desktop Companion downloader is not supported by this build. Embedded sessions are an Android feature. Comfy Cloud still has no user host model filesystem.

Provider login and real gated downloads require on-device verification. Some social login, anti-bot, IP-bound cookie or expired-session flows may not accept an embedded browser session or a transfer from another machine. Unsupported resolved download links are not queued as arbitrary host URLs.

## Repository browser controls

Android repository browsing retains the page and history when a download is selected. Reopen the same repository button to resume browsing. Exit or system Back at the beginning ends that browsing session. Browser toolbar and download chooser controls match the other ComfierUI menus. The supplied generic theme names are retained. Desktop browsing still uses a separate window and manual link paste.
