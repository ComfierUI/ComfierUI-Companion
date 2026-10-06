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

Version **0.5.1**, paired with ComfierUI **0.91.12-Dev**.

Connect the Android app to the host address and Companion port (default **8147**). Open `http://127.0.0.1:8147/` on the host to use the browser interface. ComfyUI continues running on its own port, normally **8188**. Companion's port can be changed in App Settings; 8188 is reserved for ComfyUI.

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

Replace the extension files in place, then restart ComfyUI and reconnect or hard-refresh clients. Preserve your existing themes, `gateway_port.json`, `ui_updates`, diagnostics and backups. Do not install a second copy of Companion alongside the first.

## Development

Run the Python tests from the extension folder:

```sh
python -m unittest discover -s tests
```

## License

See [LICENSE](LICENSE).
