"""Safe workflow discovery and layout sidecars for native spatial clients."""

import json
import logging
import os
import tempfile
import uuid
from pathlib import Path, PurePosixPath

from aiohttp import ClientSession, ClientTimeout, web

import folder_paths
import nodes as comfy_nodes
from server import PromptServer


LOG = logging.getLogger("ComfierUI-Companion")
BASE_ROUTE = "/comfierui/spatial"
MAX_WORKFLOW_BYTES = 32 * 1024 * 1024
MAX_LAYOUT_BYTES = 8 * 1024 * 1024
COMFY_LOOPBACK = "http://127.0.0.1:8188"
_registered = False


def _user_root() -> Path:
    getter = getattr(folder_paths, "get_user_directory", None)
    root = getter() if callable(getter) else getattr(folder_paths, "user_directory", None)
    if not root:
        raise web.HTTPServiceUnavailable(text="ComfyUI user directory is unavailable")
    return Path(root).resolve()


def _workflow_roots() -> list[Path]:
    root = _user_root()
    # Stay inside the conventional default profile. Enumerating every profile
    # from one unauthenticated request would cross ComfyUI user boundaries.
    candidates = [root / "default" / "workflows", root / "workflows"]
    result = []
    for candidate in candidates:
        resolved = candidate.resolve()
        if resolved.is_dir() and resolved not in result:
            result.append(resolved)
    return result


def _safe_relative(value: object) -> PurePosixPath:
    if not isinstance(value, str) or not value.strip():
        raise web.HTTPBadRequest(text="Missing workflow path")
    relative = PurePosixPath(value.strip().replace("\\", "/"))
    if relative.is_absolute() or ".." in relative.parts or relative.suffix.lower() != ".json":
        raise web.HTTPBadRequest(text="Unsafe workflow path")
    return relative


def _resolve_workflow(value: object) -> tuple[Path, str]:
    relative = _safe_relative(value)
    for root in _workflow_roots():
        candidate = (root / Path(*relative.parts)).resolve()
        if candidate.is_relative_to(root) and candidate.is_file():
            return candidate, relative.as_posix()
    raise web.HTTPNotFound(text="Workflow not found")


def _read_json(path: Path, byte_limit: int) -> object:
    try:
        if path.stat().st_size > byte_limit:
            raise web.HTTPRequestEntityTooLarge(max_size=byte_limit, actual_size=path.stat().st_size)
        with path.open("r", encoding="utf-8") as handle:
            return json.load(handle)
    except web.HTTPException:
        raise
    except (OSError, UnicodeError, json.JSONDecodeError) as error:
        raise web.HTTPUnprocessableEntity(text="Invalid JSON file") from error


async def _list_workflows(_request: web.Request) -> web.Response:
    items = {}
    for root in _workflow_roots():
        for path in root.rglob("*.json"):
            resolved = path.resolve()
            if not path.is_file() or not resolved.is_relative_to(root):
                continue
            relative = path.relative_to(root).as_posix()
            relative_path = PurePosixPath(relative)
            if any(part.startswith(".") for part in relative_path.parts) or \
                    path.name.lower() == ".index.json" or \
                    path.name.lower().endswith(".layout.json"):
                continue
            try:
                workflow = _read_json(path, MAX_WORKFLOW_BYTES)
            except web.HTTPException:
                continue
            if not isinstance(workflow, dict) or not isinstance(workflow.get("nodes"), list):
                continue
            stat = path.stat()
            items.setdefault(relative, {
                "path": relative,
                "name": path.stem,
                "size": stat.st_size,
                "modified": int(stat.st_mtime * 1000),
            })
    return web.json_response({"workflows": sorted(items.values(), key=lambda item: item["path"].lower())})


async def _get_workflow(request: web.Request) -> web.Response:
    path, relative = _resolve_workflow(request.query.get("path"))
    workflow = _read_json(path, MAX_WORKFLOW_BYTES)
    if not isinstance(workflow, dict):
        raise web.HTTPUnprocessableEntity(text="Workflow root must be an object")
    return web.json_response({"path": relative, "workflow": workflow})


def _is_widget_spec(spec: object) -> bool:
    if not isinstance(spec, (tuple, list)) or not spec:
        return False
    type_spec = spec[0]
    config = spec[1] if len(spec) > 1 and isinstance(spec[1], dict) else {}
    if config.get("forceInput") or config.get("defaultInput"):
        return False
    return isinstance(type_spec, (tuple, list)) or type_spec in {
        "INT", "FLOAT", "STRING", "BOOLEAN", "COMBO",
    }


def _widget_names(node: dict) -> list[str]:
    declared = [
        entry.get("name") for entry in node.get("inputs", [])
        if isinstance(entry, dict) and "widget" in entry and isinstance(entry.get("name"), str)
    ]
    values = node.get("widgets_values", [])
    if declared and len(declared) == len(values):
        return declared

    node_class = comfy_nodes.NODE_CLASS_MAPPINGS.get(node.get("type"))
    if node_class is None:
        raise web.HTTPUnprocessableEntity(text=f"Node type is not installed: {node.get('type')}")
    try:
        sections = node_class.INPUT_TYPES()
    except Exception as error:
        raise web.HTTPUnprocessableEntity(
            text=f"Unable to read inputs for node type {node.get('type')}") from error

    result = []
    for section_name in ("required", "optional"):
        section = sections.get(section_name, {}) if isinstance(sections, dict) else {}
        for name, spec in section.items():
            if _is_widget_spec(spec):
                result.append(name)
    return result


def _resolve_source(link: list, node_by_id: dict[object, dict], links: dict[object, list]) -> object:
    current = link
    for _ in range(64):
        source = node_by_id.get(current[1])
        if not source:
            raise web.HTTPUnprocessableEntity(text=f"Link source node is missing: {current[1]}")
        source_type = source.get("type")
        if source_type == "PrimitiveNode":
            values = source.get("widgets_values", [])
            return values[0] if values else None
        if source_type != "Reroute":
            return [str(current[1]), current[2]]
        inputs = source.get("inputs", [])
        upstream_id = inputs[0].get("link") if inputs and isinstance(inputs[0], dict) else None
        current = links.get(upstream_id)
        if current is None:
            raise web.HTTPUnprocessableEntity(text="Reroute node has no upstream connection")
    raise web.HTTPUnprocessableEntity(text="Reroute chain is too deep")


def _workflow_to_prompt(workflow: dict) -> dict:
    raw_nodes = workflow.get("nodes", [])
    raw_links = workflow.get("links", [])
    if not isinstance(raw_nodes, list) or not isinstance(raw_links, list):
        raise web.HTTPUnprocessableEntity(text="Workflow does not contain LiteGraph nodes and links")
    if isinstance(workflow.get("definitions"), dict) and workflow["definitions"].get("subgraphs"):
        raise web.HTTPUnprocessableEntity(text="Subgraph execution is not supported by this test bridge yet")

    node_by_id = {
        node.get("id"): node for node in raw_nodes
        if isinstance(node, dict) and node.get("id") is not None
    }
    links = {
        link[0]: link for link in raw_links
        if isinstance(link, list) and len(link) >= 6
    }
    prompt = {}
    frontend_only = {"Reroute", "PrimitiveNode", "Note", "MarkdownNote"}

    for node in raw_nodes:
        if not isinstance(node, dict) or node.get("type") in frontend_only:
            continue
        mode = int(node.get("mode", 0) or 0)
        if mode != 0:
            raise web.HTTPUnprocessableEntity(
                text=f"Muted or bypassed node is not supported by this test bridge: {node.get('type')}")

        values = node.get("widgets_values", [])
        if not isinstance(values, list):
            values = []
        names = _widget_names(node)
        inputs = {}
        value_index = 0
        for name in names:
            if value_index >= len(values):
                break
            inputs[name] = values[value_index]
            value_index += 1
            if name in {"seed", "noise_seed"} and value_index < len(values) and \
                    values[value_index] in {"fixed", "increment", "decrement", "randomize"}:
                value_index += 1

        for input_entry in node.get("inputs", []):
            if not isinstance(input_entry, dict) or input_entry.get("link") is None:
                continue
            link = links.get(input_entry.get("link"))
            if link is not None:
                inputs[input_entry.get("name")] = _resolve_source(link, node_by_id, links)

        prompt[str(node.get("id"))] = {
            "class_type": node.get("type"),
            "inputs": inputs,
        }
    if not prompt:
        raise web.HTTPUnprocessableEntity(text="Workflow has no executable nodes")
    return prompt


async def _queue_workflow(request: web.Request) -> web.Response:
    try:
        body = await request.json()
    except Exception as error:
        raise web.HTTPBadRequest(text="Expected a JSON request body") from error
    if not isinstance(body, dict):
        raise web.HTTPBadRequest(text="Expected a JSON object")

    path, relative = _resolve_workflow(body.get("path"))
    workflow = _read_json(path, MAX_WORKFLOW_BYTES)
    if not isinstance(workflow, dict):
        raise web.HTTPUnprocessableEntity(text="Workflow root must be an object")
    prompt = _workflow_to_prompt(workflow)
    queue_body = {
        "prompt": prompt,
        "client_id": f"comfierui-vr-{uuid.uuid4().hex}",
        "extra_data": {"extra_pnginfo": {"workflow": workflow}},
    }
    async with ClientSession(timeout=ClientTimeout(total=30)) as session:
        async with session.post(COMFY_LOOPBACK + "/prompt", json=queue_body) as response:
            result = await response.json(content_type=None)
            return web.json_response(result, status=response.status)


def _layout_path(relative: PurePosixPath) -> Path:
    root = (_user_root() / ".comfierui" / "spatial-layouts").resolve()
    target = (root / Path(*relative.parts)).with_suffix(".layout.json").resolve()
    if not target.is_relative_to(root):
        raise web.HTTPBadRequest(text="Unsafe layout path")
    return target


async def _get_layout(request: web.Request) -> web.Response:
    relative = _safe_relative(request.query.get("path"))
    path = _layout_path(relative)
    if not path.is_file():
        return web.json_response({"path": relative.as_posix(), "layout": None})
    return web.json_response({"path": relative.as_posix(), "layout": _read_json(path, MAX_LAYOUT_BYTES)})


async def _put_layout(request: web.Request) -> web.Response:
    relative = _safe_relative(request.query.get("path"))
    try:
        raw = await request.read()
    except Exception as error:
        raise web.HTTPBadRequest(text="Unable to read layout") from error
    if len(raw) > MAX_LAYOUT_BYTES:
        raise web.HTTPRequestEntityTooLarge(max_size=MAX_LAYOUT_BYTES, actual_size=len(raw))
    try:
        layout = json.loads(raw.decode("utf-8"))
    except (UnicodeError, json.JSONDecodeError) as error:
        raise web.HTTPBadRequest(text="Invalid layout JSON") from error
    if not isinstance(layout, dict) or not isinstance(layout.get("nodes", {}), dict):
        raise web.HTTPBadRequest(text="Layout must be an object with a nodes object")
    theme = layout.get("theme", "default")
    if not isinstance(theme, str) or not theme.strip() or len(theme) > 128 or \
            any(character in theme for character in ("/", "\\", "\0")):
        raise web.HTTPBadRequest(text="Layout theme must be a safe theme identifier")
    layout["theme"] = theme.strip()

    target = _layout_path(relative)
    target.parent.mkdir(parents=True, exist_ok=True)
    descriptor, temporary_name = tempfile.mkstemp(prefix=target.name + ".", suffix=".tmp", dir=target.parent)
    try:
        with os.fdopen(descriptor, "w", encoding="utf-8") as handle:
            json.dump(layout, handle, ensure_ascii=False, separators=(",", ":"))
            handle.flush()
            os.fsync(handle.fileno())
        os.replace(temporary_name, target)
    finally:
        if os.path.exists(temporary_name):
            os.unlink(temporary_name)
    return web.json_response({"saved": True, "path": relative.as_posix()})


async def _delete_layout(request: web.Request) -> web.Response:
    relative = _safe_relative(request.query.get("path"))
    target = _layout_path(relative)
    try:
        target.unlink(missing_ok=True)
    except OSError as error:
        raise web.HTTPInternalServerError(text="Unable to delete spatial layout") from error
    return web.json_response({"deleted": True, "path": relative.as_posix()})


def register_spatial_routes() -> None:
    global _registered
    if _registered:
        return
    routes = PromptServer.instance.routes
    routes.get(BASE_ROUTE + "/workflows")(_list_workflows)
    routes.get(BASE_ROUTE + "/workflow")(_get_workflow)
    routes.post(BASE_ROUTE + "/queue")(_queue_workflow)
    routes.get(BASE_ROUTE + "/layout")(_get_layout)
    routes.put(BASE_ROUTE + "/layout")(_put_layout)
    routes.delete(BASE_ROUTE + "/layout")(_delete_layout)
    _registered = True
    LOG.info("Spatial workflow endpoints enabled at %s", BASE_ROUTE)
