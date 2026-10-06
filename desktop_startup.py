"""Replace ComfyUI's requested browser auto-launch with the Companion gateway.

Custom nodes load before main.py creates its auto-launch callback. We only
consume that existing request; headless runs and disable-auto-launch stay quiet.
"""
import asyncio
import logging
import os
import time
import webbrowser

import aiohttp

LOG = logging.getLogger("ComfierUI-Companion")


def arm_auto_launch(args=None):
    if os.environ.get("COMFIERUI_DESKTOP_AUTOLAUNCH", "1").strip().lower() in {"0", "false", "off"}:
        return False
    if args is None:
        try:
            from comfy.cli_args import args
        except ImportError:
            LOG.info("ComfyUI launch arguments unavailable; desktop auto-launch unchanged")
            return False
    if not getattr(args, "auto_launch", False) or getattr(args, "disable_auto_launch", False):
        return False
    args.auto_launch = False
    return True


async def ready(url):
    try:
        async with aiohttp.ClientSession(timeout=aiohttp.ClientTimeout(total=2)) as session:
            async with session.get(url + "/system_stats", allow_redirects=False) as response:
                return response.status == 200
    except (aiohttp.ClientError, OSError, asyncio.TimeoutError):
        return False


async def launch_when_ready(target, *, timeout=300, interval=0.5):
    """One startup launch; never run on gateway port changes or client connects."""
    deadline = time.monotonic() + timeout
    while time.monotonic() < deadline:
        url = target()
        if await ready(url):
            # Recheck after readiness in case the user changed the gateway port.
            if url != target():
                continue
            try:
                opened = await asyncio.to_thread(webbrowser.open, url + "/")
                if not opened:
                    LOG.warning("Desktop browser could not open %s/; open it manually", url)
                return opened
            except Exception:
                LOG.exception("Desktop browser launch failed; open %s/ manually", url)
                return False
        await asyncio.sleep(interval)
    LOG.warning("Desktop auto-launch timed out waiting for ComfyUI; open %s/ manually", target())
    return False
