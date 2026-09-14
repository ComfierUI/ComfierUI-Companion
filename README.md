# ComfierUI Companion 0.2.7

## 0.2.7 — synchronized release metadata

* Synchronizes the package, runtime API, and frontend bridge version at `0.2.7`.
* Retains `companion_gateway.py` and the `register_companion_gateway` entry point.
* Retains the Companion gateway on `0.0.0.0:8147` and loopback ComfyUI on
  `127.0.0.1:8188`.

## 0.2.6 — Companion gateway naming hotfix

* Renames `vr_gateway.py` to `companion_gateway.py` to reflect that the gateway
  serves both ComfierUI and ComfyQuest.
* Renames the internal registration entry point to `register_companion_gateway`.
* Retains the Companion gateway on `0.0.0.0:8147` and the ComfyUI backend on
  `127.0.0.1:8188`.

## 0.2.5 — spatial layout lifecycle

* Serves the Companion gateway on `0.0.0.0:8147` for trusted LAN and tailnet
  clients, and proxies it to loopback ComfyUI at `127.0.0.1:8188`.
* Filters hidden metadata, `.index.json`, layout sidecars, and invalid JSON
  objects out of native workflow discovery.
* Adds `DELETE /comfierui/spatial/layout?path=...` so native clients can remove
  a spatial sidecar without deleting its source ComfyUI workflow.
* Retains atomic `PUT` saves and traversal-safe layout paths.

## 0.2.4 — native workflow queue bridge

* Adds `POST /comfierui/spatial/queue` for execution of a saved LiteGraph
  workflow selected by a native client.
* Workflow-to-prompt conversion runs on the host using the installed ComfyUI
  node definitions; the headset sends only the safe relative workflow path.
* The first bridge supports ordinary connected nodes, reroutes, primitive
  values, and standard/custom widgets. It reports an explicit error for
  bypassed/muted nodes and subgraphs until those transformations are added.
* The user-facing `vr-lan-gateway` capability is renamed `lan-gateway` because
  the same private-LAN/Tailscale bridge now serves Android and VR clients.

## 0.2.3 — Verified Companion gateway and host downloads

This release consolidates the verified VR configuration into one clean extension:

* ComfyUI remains loopback-only on `127.0.0.1:8188`; `--listen` is unnecessary.
* The development gateway listens on `0.0.0.0:8147` for LAN and Tailscale clients.
* Gateway `Origin` and `Referer` headers are rewritten to the loopback backend, avoiding
  ComfyUI's non-matching host/origin 403 response.
* The restricted Companion model downloader and frontend bridge are restored after the
  0.2.2 comparison proved that unmodified Manager downloads still send files to the client.
* Spatial workflow discovery, loading, and layout sidecars remain enabled.

The gateway currently assumes a trusted private LAN or tailnet. Device pairing and
authentication remain required before public distribution.

## 0.2.2.dev1 — Native Manager download experiment

This temporary comparison build removes the Companion host-download override while
retaining the Companion gateway, workflow APIs, spatial-layout sidecars, and version reporting.
It does not register `POST /comfierui/model-download` and does not install the
`window.__comfyDesktop2.downloadModel` browser bridge. ComfyUI and Manager therefore use
their unmodified download behavior through the loopback gateway.

The gateway rewrites browser `Origin` and `Referer` headers to its loopback target.
This satisfies ComfyUI's same-origin validation while preserving cookies and other
request headers required by the proxied client.

Use this only to determine whether running ComfyUI without `--listen` restores native
host-side model installation. Companion 0.2.1 remains the safe rollback because its
restricted downloader guarantees host placement and validates destinations.

## 0.2.1 — VR loopback gateway

* Automatically opens an HTTP gateway on `0.0.0.0:8147` and proxies it to the
  normal loopback-only ComfyUI server at `127.0.0.1:8188`.
* Relays both ordinary HTTP requests and ComfyUI WebSocket traffic, including
  streamed downloads, without requiring ComfyUI's `--listen` flag.
* Intended for the dedicated VR-only ComfyUI installation and trusted-LAN
  development. Authentication and pairing are required before public release.

ComfyQuest uses `http://deezpc:8147` as its automatic startup
address. The server binds to `0.0.0.0`; clients must use the PC hostname or LAN
address rather than `0.0.0.0`.

## 0.2.0 — Native spatial workflow bridge

* Adds a read-only workflow index at `GET /comfierui/spatial/workflows`.
* Adds validated workflow loading at `GET /comfierui/spatial/workflow?path=...`.
* Adds separate spatial-layout sidecars through `GET` and `PUT`
  `/comfierui/spatial/layout?path=...`; original ComfyUI workflow files are never
  modified.
* Uses traversal-safe paths, strict JSON and size validation, and atomic layout
  replacement. Workflow discovery is deliberately limited to the conventional
  default profile rather than exposing other local user profiles.
* Preserves the restricted host-side model downloader from 0.1.3 unchanged.

These endpoints are the first host-side plumbing for ComfyQuest's native Unreal
frontend. They let the headset discover saved workflows and persist room-specific
node positions without making it parse ComfyUI's filesystem or rewrite canonical
workflow JSON.

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

Choose any one of these installation methods, then restart ComfyUI.

### Option 1: Extension Manager

1. Open ComfyUI's **Extension Manager**.
2. Search for **ComfierUI Companion**.
3. Select **Install** and restart ComfyUI when prompted.

### Option 2: Git

Open a terminal in `ComfyUI/custom_nodes/` and run:

```bash
git clone https://github.com/ComfierUI/ComfierUI-Companion.git
```

To update an existing Git installation later, open the installed folder and run:

```bash
git pull
```

### Option 3: ZIP

1. Close ComfyUI.
2. Download and extract the release ZIP.
3. Place the extracted `ComfierUI-Companion` folder inside `ComfyUI/custom_nodes/`.
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
