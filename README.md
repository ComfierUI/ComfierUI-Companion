# ComfierUI Companion 0.3.4

This is the non-VR Companion build for ComfierUI. It retains the Android and
browser services from 0.3.4 while removing the paused ComfyQuest spatial
workflow, layout, queue, theme-state, and VR client-capability integrations.

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
