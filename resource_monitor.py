"""On-demand, shared host telemetry. No polling when clients stop requesting."""
import asyncio
import time
from aiohttp import web
from server import PromptServer

try:
    import psutil
except ImportError:
    psutil = None
try:
    import pynvml
except ImportError:
    pynvml = None

_lock = asyncio.Lock()
_cached = None
_cached_at = 0
_nvml_ready = False
_registered = False


def _read():
    global _nvml_ready
    data = {"sampled_at": int(time.time() * 1000), "cpu_utilization": None,
            "ram_used_percent": None, "cpu_temperature": None, "gpus": [], "providers": {"cpu_ram": False, "nvidia": False}}
    if psutil:
        try:
            data["cpu_utilization"] = psutil.cpu_percent(interval=0.1)
            ram = psutil.virtual_memory()
            data.update(ram_used_percent=ram.percent, ram_used_bytes=ram.total-ram.available, ram_total_bytes=ram.total)
            data["providers"]["cpu_ram"] = True
        except Exception:
            pass
    if psutil:
        try:
            sensors = psutil.sensors_temperatures()
            # CPU-specific providers only; never label motherboard/ACPI as CPU.
            readings = [entry.current for name, entries in sensors.items()
                        if name.lower() in {"coretemp", "k10temp", "cpu_thermal", "zenpower"}
                        for entry in entries if entry.current is not None]
            if readings:
                data["cpu_temperature"] = max(readings)
        except Exception:
            pass
    if pynvml:
        try:
            if not _nvml_ready:
                pynvml.nvmlInit()
                _nvml_ready = True
            for index in range(pynvml.nvmlDeviceGetCount()):
                try:
                    handle = pynvml.nvmlDeviceGetHandleByIndex(index)
                    name = pynvml.nvmlDeviceGetName(handle)
                    gpu = {"index": index, "name": name.decode() if isinstance(name, bytes) else name}
                    for key, getter in [
                        ("gpu_utilization", lambda: pynvml.nvmlDeviceGetUtilizationRates(handle).gpu),
                        ("gpu_temperature", lambda: pynvml.nvmlDeviceGetTemperature(handle, pynvml.NVML_TEMPERATURE_GPU))]:
                        try:
                            gpu[key] = getter()
                        except Exception:
                            gpu[key] = None
                    try:
                        memory = pynvml.nvmlDeviceGetMemoryInfo(handle)
                        gpu.update(vram_used_bytes=memory.used, vram_total_bytes=memory.total,
                                   vram_used_percent=memory.used/memory.total*100 if memory.total else None)
                    except Exception:
                        gpu["vram_used_percent"] = None
                    data["gpus"].append(gpu)
                except Exception:
                    continue
            data["providers"]["nvidia"] = True
        except Exception:
            _nvml_ready = False
    return data


async def sample(request):
    global _cached, _cached_at
    async with _lock:
        if _cached is None or time.monotonic() - _cached_at >= 1.5:
            _cached = await asyncio.to_thread(_read)
            _cached_at = time.monotonic()
    return web.json_response(_cached, headers={"Cache-Control": "no-store"})


def register_resource_routes():
    global _registered
    if not _registered:
        PromptServer.instance.routes.get('/comfierui/resources')(sample)
        _registered = True
