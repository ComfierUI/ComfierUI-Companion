# ComfierUI Companion

## Install

Install Companion on the computer running ComfyUI. Choose ZIP or Git below, install the dependencies, then restart ComfyUI.

### From a ZIP

1. Close ComfyUI.
2. Create `ComfyUI/custom_nodes/ComfierUI-Companion/` if it does not exist.
3. Extract this release ZIP directly into that folder. Its files are at the archive root, with no enclosing folder. For GitHub's **Download ZIP**, copy the contents of the extracted repository folder into the same location.
4. Install the dependencies using the instructions below, then start ComfyUI.

The final path must be:

```text
ComfyUI/custom_nodes/ComfierUI-Companion/__init__.py
```

For an existing installation, replace the extension files in the same folder. Keep your `themes/`, `diagnostics/`, and `ui_updates/` data. Keep only one active Companion installation in `custom_nodes/`.

### From Git

Close ComfyUI, open a terminal in `ComfyUI/custom_nodes/`, and run:

```bash
git clone https://github.com/ComfierUI/ComfierUI-Companion.git
```

Then install the dependencies and restart ComfyUI.

### Install dependencies

Use the Python environment that runs ComfyUI. From your ComfyUI folder, run:

```bash
python -m pip install -r custom_nodes/ComfierUI-Companion/requirements.txt
```

For **Windows portable**, run this from the portable installation's root folder:

```powershell
.\python_embeded\python.exe -m pip install -r .\ComfyUI\custom_nodes\ComfierUI-Companion\requirements.txt
```

Companion starts automatically with ComfyUI and adds no workflow nodes.

## Connect

1. Start ComfyUI on its default port, `8188`.
2. In ComfierUI, connect to `http://YOUR_HOST_IP:8147` using your computer's LAN or private VPN address.
3. Enable **Companion Pre-Processor** in the app when you want the host to provide the shared interface.

The Companion gateway listens on port `8147` and forwards requests to ComfyUI at `127.0.0.1:8188`. Use a trusted LAN or private VPN, such as Tailscale. If the connection fails, check that ComfyUI is running and the host firewall allows the connection to port `8147`.

## About this release

**Companion 0.4.28** includes the same shared UI as **ComfierUI 0.89.20-Dev**. A fresh installation starts at parity without an app-supplied UI update.

Companion is an optional host extension for ComfierUI. It provides:

- The Companion Pre-Processor and shared interface assets.
- A gateway for HTTP and WebSocket connections, with caching for model and node inventories.
- Host-side model downloads and download progress/control services.
- Generation progress and queue status for client notifications.
- CPU, RAM, NVIDIA GPU, VRAM, and temperature readings where supported.
- Shared theme profiles and host diagnostic services.

## Model downloads

Load a workflow with missing models, open **Workflow Overview > Errors**, and use **Download** or **Download All**. Transfers run on the host and save into ComfyUI's model directories, so model files do not pass through the Android device.

Supported starting URLs are HTTPS links from Hugging Face, Civitai, or GitHub release assets. Existing model files are not overwritten.

## Resource monitors

CPU and RAM readings use `psutil`; NVIDIA GPU readings use `nvidia-ml-py`. Unsupported or unavailable readings display `—`. CPU temperature depends on sensors exposed by the host and is often unavailable on Windows. AMD and Intel GPU readings are not supported by this release.

In **Comfy Settings**, choose which meters to show and which GPU to monitor. These meters operate independently of Crystools.

## Shared themes

Place exported ComfierUI theme JSON files in `themes/`, then open **Theme Settings > Profiles** in the app. Reopen Profiles to refresh the list. Select a Companion theme and choose **Load**; use **Save** to keep a device copy. No host restart is needed.

Host theme files are read-only from the app. See [themes/README.md](themes/README.md) for file details.

## Updates

To update a Git installation, close ComfyUI and run `git pull` inside the installed Companion folder. For ZIP installations, replace the extension files in that same folder. Preserve `themes/`, `diagnostics/`, and `ui_updates/`, reinstall requirements if they changed, then restart ComfyUI and reconnect the app.

Compatible newer ComfierUI apps can update the shared UI through the app. Python services, dependencies, and backend API changes still require a normal Companion update and host restart.

## License

[MIT](LICENSE)
