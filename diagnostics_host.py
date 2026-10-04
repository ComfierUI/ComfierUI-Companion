"""Host-owned persistence/API for the Companion-served diagnostic suite."""

from __future__ import annotations

import asyncio
import threading
import json
import re
import time
from datetime import datetime
from pathlib import Path

from aiohttp import web
from server import PromptServer

ROOT = Path(__file__).resolve().parent / "diagnostics"
SCRIPTS = ROOT / "scripts"
BACKUPS = ROOT / "backups"
MANIFEST = ROOT / "scripts.json"
ACTIVE = ROOT / "active.js"
STATE_ROUTE = "/comfierui/diagnostics/state"
ACTION_ROUTE = "/comfierui/diagnostics/action"
_registered = False
_SCRIPT_RE = re.compile(r"^[A-Za-z0-9][A-Za-z0-9._-]{0,63}\.js$")
_BACKUP_RE = re.compile(r"^backup-[0-9]{8}-[0-9]{6}-[0-9]{3}\.js$")


def _ensure() -> None:
    SCRIPTS.mkdir(parents=True, exist_ok=True)
    BACKUPS.mkdir(parents=True, exist_ok=True)


def _read(path: Path) -> str:
    try:
        return path.read_text(encoding="utf-8") if path.is_file() else ""
    except OSError:
        return ""


def _write(path: Path, value: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    temp = path.with_name(path.name + ".tmp")
    temp.write_text(value or "", encoding="utf-8")
    temp.replace(path)


def _manifest() -> list[dict]:
    _ensure()
    try:
        raw = json.loads(_read(MANIFEST) or "[]")
    except Exception:
        raw = []
    output = []
    for item in raw if isinstance(raw, list) else []:
        if not isinstance(item, dict):
            continue
        script_id = str(item.get("id") or "")
        file = SCRIPTS / script_id
        if not _SCRIPT_RE.fullmatch(script_id) or not file.is_file():
            continue
        output.append({
            "id": script_id,
            "name": str(item.get("name") or script_id[:-3]),
            "created": int(item.get("created") or int(file.stat().st_mtime * 1000)),
            "size": file.stat().st_size,
            "code": _read(file),
        })
    return output


def _write_manifest(items: list[dict]) -> None:
    compact = [{"id": x["id"], "name": x.get("name", x["id"][:-3]), "created": int(x.get("created") or int(time.time() * 1000))} for x in items]
    _write(MANIFEST, json.dumps(compact, separators=(",", ":")))


def _normalize_name(name: str) -> str:
    value = (name or "").strip()
    if value.lower().endswith(".js"):
        value = value[:-3]
    value = re.sub(r"[^A-Za-z0-9._-]+", "-", value).strip("-")
    if not value:
        raise ValueError("Enter a script filename")
    return value[:61] + ".js"


def _backup_current() -> None:
    _ensure()
    stamp = datetime.now().strftime("%Y%m%d-%H%M%S-%f")[:19]
    _write(BACKUPS / f"backup-{stamp}.js", _read(ACTIVE))


def _backups() -> list[dict]:
    _ensure()
    output = []
    for file in sorted(BACKUPS.glob("backup-*.js"), key=lambda p: p.stat().st_mtime, reverse=True):
        if not _BACKUP_RE.fullmatch(file.name):
            continue
        code = _read(file)
        try:
            raw = file.stem[len("backup-"):]
            parsed = datetime.strptime(raw, "%Y%m%d-%H%M%S-%f")
            label = parsed.strftime("%b %d, %Y  %I:%M:%S %p").replace(" 0", " ")
        except Exception:
            label = file.name
        if not code:
            label += " · Clean state"
        output.append({"id": file.name, "label": label, "size": file.stat().st_size, "code": code})
    return output


def _state_payload() -> dict:
    return {
        "ready": True,
        "active": _read(ACTIVE),
        "scripts": _manifest(),
        "backups": _backups(),
    }


_disk_lock = threading.RLock()

def _locked_state():
    with _disk_lock:
        return _state_payload()

async def _state(_: web.Request) -> web.Response:
    return web.json_response(await asyncio.to_thread(_locked_state), headers={"Cache-Control": "no-store"})


async def _action(request: web.Request) -> web.Response:
    try:
        data = await request.json()
    except Exception:
        data = {}
    task = asyncio.create_task(asyncio.to_thread(_locked_action, data))
    try:
        return await asyncio.shield(task)
    except asyncio.CancelledError:
        await task
        raise

def _locked_action(data):
    with _disk_lock:
        return _action_sync(data)

def _action_sync(data):
    action = str(data.get("action") or "")
    try:
        scripts = _manifest()
        if action == "save_named":
            script_id = _normalize_name(str(data.get("name") or ""))
            code = str(data.get("code") or "")
            existing = next((x for x in scripts if x["id"] == script_id), None)
            if existing is None:
                existing = {"id": script_id, "name": script_id[:-3], "created": int(time.time() * 1000), "size": 0, "code": ""}
                scripts.append(existing)
            existing["code"] = code
            existing["size"] = len(code.encode("utf-8"))
            _write(SCRIPTS / script_id, code)
            _write_manifest(scripts)
            return web.json_response({"ok": True, "message": f"Saved {script_id}", "state": _state_payload()})
        if action == "delete_script":
            script_id = str(data.get("id") or "")
            if not _SCRIPT_RE.fullmatch(script_id):
                raise ValueError("Invalid script id")
            (SCRIPTS / script_id).unlink(missing_ok=True)
            scripts = [x for x in scripts if x["id"] != script_id]
            _write_manifest(scripts)
            return web.json_response({"ok": True, "message": f"Deleted {script_id}", "state": _state_payload()})
        if action == "move_script":
            script_id = str(data.get("id") or "")
            direction = -1 if int(data.get("direction") or 1) < 0 else 1
            index = next((i for i, x in enumerate(scripts) if x["id"] == script_id), -1)
            if index < 0:
                raise ValueError("Script not found")
            target = max(0, min(len(scripts) - 1, index + direction))
            if target != index:
                item = scripts.pop(index)
                scripts.insert(target, item)
                _write_manifest(scripts)
            return web.json_response({"ok": True, "message": "Launch order updated", "state": _state_payload()})
        if action == "save_active":
            _backup_current()
            _write(ACTIVE, str(data.get("code") or ""))
            return web.json_response({"ok": True, "message": "Saved persistent injection", "state": _state_payload()})
        if action == "restore_backup":
            backup_id = str(data.get("id") or "")
            if not _BACKUP_RE.fullmatch(backup_id):
                raise ValueError("Invalid backup id")
            source = BACKUPS / backup_id
            if not source.is_file():
                raise ValueError("Backup not found")
            _backup_current()
            code = _read(source)
            if code:
                _write(ACTIVE, code)
            else:
                ACTIVE.unlink(missing_ok=True)
            return web.json_response({"ok": True, "message": "Backup restored" if code else "Restored clean state", "state": _state_payload()})
        if action == "delete_backup":
            backup_id = str(data.get("id") or "")
            if not _BACKUP_RE.fullmatch(backup_id):
                raise ValueError("Invalid backup id")
            (BACKUPS / backup_id).unlink(missing_ok=True)
            return web.json_response({"ok": True, "message": "Backup deleted", "state": _state_payload()})
        raise ValueError("Unknown diagnostic action")
    except Exception as error:
        return web.json_response({"ok": False, "message": str(error), "state": _state_payload()}, status=400)


def register_diagnostic_routes() -> None:
    global _registered
    if _registered:
        return
    _ensure()
    PromptServer.instance.routes.get(STATE_ROUTE)(_state)
    PromptServer.instance.routes.post(ACTION_ROUTE)(_action)
    _registered = True
