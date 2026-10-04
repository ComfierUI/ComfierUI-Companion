"""Host-authoritative execution progress for ComfierUI Android notifications."""

from __future__ import annotations

import threading
import time
from typing import Any, Optional

from aiohttp import web

from server import PromptServer


BASE_ROUTE = "/comfierui/notifications"
_registered = False
_hook_installed = False
_lock = threading.RLock()
_states: dict[str, dict[str, Any]] = {}


def _queue_prompt_id(entry: Any) -> str:
    try:
        return str(entry[1])
    except (TypeError, IndexError):
        return ""


def _queue_prompt(entry: Any) -> dict[str, Any]:
    try:
        prompt = entry[2]
        return prompt if isinstance(prompt, dict) else {}
    except (TypeError, IndexError):
        return {}


def _node_title(prompt: dict[str, Any], node_id: Optional[str]) -> str:
    if not node_id:
        return ""
    node = prompt.get(str(node_id)) or {}
    meta = node.get("_meta") or {}
    title = meta.get("title")
    if title:
        return str(title)
    class_type = node.get("class_type")
    return str(class_type) if class_type else f"Node {node_id}"


def _state_for(prompt_id: str) -> dict[str, Any]:
    now = time.monotonic()
    terminal = sorted(((key, value) for key, value in _states.items() if value.get('terminal')), key=lambda item:item[1].get('terminal_at', now))
    excess = max(0, len(terminal) - 256)
    for index, (key, value) in enumerate(terminal):
        if key != prompt_id and (index < excess or now - value.get('terminal_at', now) > 3600):
            _states.pop(key, None)
    state = _states.get(prompt_id)
    if state is None:
        state = {
            "prompt_id": prompt_id,
            "current_node": None,
            "completed_nodes": set(),
            "step_value": 0,
            "step_max": 0,
            "terminal": False,
        }
        _states[prompt_id] = state
    return state


def _observe_event(event: str, data: Any) -> None:
    if not isinstance(data, dict):
        return
    prompt_id = str(data.get("prompt_id") or "")
    if not prompt_id:
        return

    with _lock:
        state = _state_for(prompt_id)
        if event == "execution_start":
            state.update(
                current_node=None,
                completed_nodes=set(),
                step_value=0,
                step_max=0,
                terminal=False,
            )
        elif event == "execution_cached":
            nodes = data.get("nodes") or []
            state["completed_nodes"].update(str(node) for node in nodes)
        elif event == "executing":
            previous = state.get("current_node")
            node = data.get("node")
            if previous is not None and node is not None and str(previous) != str(node):
                state["completed_nodes"].add(str(previous))
            state["current_node"] = None if node is None else str(node)
            state["step_value"] = 0
            state["step_max"] = 0
        elif event == "progress":
            node = data.get("node")
            if node is not None:
                state["current_node"] = str(node)
            try:
                state["step_value"] = max(0, int(data.get("value") or 0))
                state["step_max"] = max(0, int(data.get("max") or 0))
            except (TypeError, ValueError):
                state["step_value"] = 0
                state["step_max"] = 0
        elif event == "executed":
            node = data.get("node")
            if node is not None:
                state["completed_nodes"].add(str(node))
        elif event in {"execution_success", "execution_error", "execution_interrupted"}:
            current = state.get("current_node")
            if event == "execution_success" and current is not None:
                state["completed_nodes"].add(str(current))
            state["terminal"] = True
            state["terminal_at"] = time.monotonic()


def _install_event_hook() -> None:
    global _hook_installed
    if _hook_installed:
        return

    server = PromptServer.instance
    original = server.send_sync
    if getattr(original, "__comfierui_progress_hook__", False):
        _hook_installed = True
        return

    def send_sync_with_progress(event: str, data: Any = None, *args: Any, **kwargs: Any):
        try:
            _observe_event(str(event), data)
        except Exception:
            pass
        return original(event, data, *args, **kwargs)

    send_sync_with_progress.__comfierui_progress_hook__ = True
    server.send_sync = send_sync_with_progress
    _hook_installed = True


def _snapshot_for_running(entry: Any) -> dict[str, Any]:
    prompt_id = _queue_prompt_id(entry)
    prompt = _queue_prompt(entry)
    total_nodes = max(1, len(prompt))

    with _lock:
        state = _state_for(prompt_id)
        current_node = state.get("current_node")
        completed = {
            str(node)
            for node in state.get("completed_nodes", set())
            if str(node) in prompt
        }
        step_value = max(0, int(state.get("step_value") or 0))
        step_max = max(0, int(state.get("step_max") or 0))

    node_fraction = (
        min(1.0, step_value / step_max)
        if step_max > 0
        else 0.0
    )
    completed_count = min(total_nodes, len(completed))
    overall = min(100.0, ((completed_count + node_fraction) / total_nodes) * 100.0)

    return {
        "prompt_id": prompt_id,
        "node_id": current_node,
        "node_title": _node_title(prompt, current_node),
        "step_value": step_value,
        "step_max": step_max,
        "completed_nodes": completed_count,
        "total_nodes": total_nodes,
        "overall_percent": round(overall, 1),
    }


async def _progress_status(_request: web.Request) -> web.Response:
    queue = PromptServer.instance.prompt_queue
    running, pending = queue.get_current_queue()
    running = list(running or [])
    pending = list(pending or [])
    queue_total = len(running) + len(pending)

    payload: dict[str, Any] = {
        "active": queue_total > 0,
        "running_count": len(running),
        "pending_count": len(pending),
        "queue_total": queue_total,
    }

    if running:
        payload.update(_snapshot_for_running(running[0]))
        payload["state"] = "running"
    elif pending:
        payload.update(
            prompt_id=_queue_prompt_id(pending[0]),
            node_id=None,
            node_title="Queued",
            step_value=0,
            step_max=0,
            completed_nodes=0,
            total_nodes=max(1, len(_queue_prompt(pending[0]))),
            overall_percent=0.0,
            state="queued",
        )
    else:
        payload.update(
            prompt_id=None,
            node_id=None,
            node_title="",
            step_value=0,
            step_max=0,
            completed_nodes=0,
            total_nodes=0,
            overall_percent=0.0,
            state="idle",
        )

    active_ids = {_queue_prompt_id(entry) for entry in running + pending}
    with _lock:
        for prompt_id in list(_states):
            if prompt_id not in active_ids:
                _states.pop(prompt_id, None)

    return web.json_response(payload)


def register_notification_routes() -> None:
    global _registered
    if _registered:
        return
    _install_event_hook()
    _registered = True
    PromptServer.instance.routes.get(BASE_ROUTE + "/progress")(_progress_status)
