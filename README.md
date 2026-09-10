# ComfierUI Companion 0.1.3

## 0.1.3 — Version discovery

* Adds a read-only capability endpoint so ComfierUI can detect the installed
  Companion version and supported features.
* Exposes the same version to trusted frontend integrations after the official
  ComfyUI extension lifecycle loads.

This optional ComfyUI host extension makes the existing **Missing Models**
Download and Download All buttons download supported models directly on the host
computer into the correct ComfyUI model folders. Large model files do not pass
through or get stored on the Android device.

## Install

1. Close ComfyUI.
2. Extract the downloaded ZIP.
3. Drag the enclosed `ComfierUI-Companion` folder into `ComfyUI/custom_nodes/`.
4. Start ComfyUI normally.

The final path should be:

```text
ComfyUI/custom_nodes/ComfierUI-Companion/__init__.py
```

No workflow nodes are added. The companion starts automatically with ComfyUI.

## Use

Load a workflow with missing models, open **Workflow Overview > Errors**, and use
the existing Download or Download All controls. The host begins each download in
the background. For a single active download, its console progress bar updates in
place instead of adding a new log row every two seconds. It includes percentage,
downloaded/total size, and byte-based transfer speed such as `94.7 MiB/s`.
Concurrent downloads retain separate timestamped progress rows so each file can be
followed safely. Use the Missing Models refresh control after a download finishes.

## Safety limits

* Initial URLs are restricted to HTTPS downloads from Hugging Face, Civitai, or
  GitHub release assets.
* Redirects are rejected if they resolve to a private, loopback, link-local, or
  otherwise non-public network address.
* Filenames cannot contain paths and are restricted to supported model formats.
* Destinations are restricted to known ComfyUI model directories.
* Existing files are never overwritten.
* Individual downloads are limited to 128 GiB.

ComfyUI itself does not provide authentication by default. Do not expose your
ComfyUI port directly to the public internet; use a trusted LAN or private VPN.
