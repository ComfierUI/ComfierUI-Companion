"""Trusted LAN gateway for remote clients connecting to loopback-only ComfyUI."""

import asyncio
import logging

import aiohttp
from aiohttp import web
from yarl import URL

from server import PromptServer


LOG = logging.getLogger("ComfierUI-Companion")
GATEWAY_HOST = "0.0.0.0"
GATEWAY_PORT = 8147
BACKEND = "http://127.0.0.1:8188"
_registered = False
_runner = None

HOP_HEADERS = {
    "connection",
    "content-length",
    "host",
    "keep-alive",
    "proxy-authenticate",
    "proxy-authorization",
    "te",
    "trailer",
    "transfer-encoding",
    "upgrade",
}


def _forward_headers(headers) -> dict[str, str]:
    return {key: value for key, value in headers.items() if key.lower() not in HOP_HEADERS}


def _backend_request_headers(headers) -> dict[str, str]:
    """Make proxied browser requests same-origin from ComfyUI's perspective."""
    forwarded = _forward_headers(headers)
    if "Origin" in forwarded:
        forwarded["Origin"] = BACKEND
    if "Referer" in forwarded:
        forwarded["Referer"] = BACKEND + "/"
    return forwarded


def _backend_url(request: web.Request) -> URL:
    """Preserve encoded workflow paths such as workflows%2Fname.json."""
    raw_path = request.rel_url.raw_path
    raw_query = request.rel_url.raw_query_string
    target = BACKEND + raw_path + (f"?{raw_query}" if raw_query else "")
    return URL(target, encoded=True)


async def _relay_websocket(request: web.Request) -> web.WebSocketResponse:
    downstream = web.WebSocketResponse(heartbeat=25.0, max_msg_size=0)
    await downstream.prepare(request)
    target = _backend_url(request)

    async with aiohttp.ClientSession() as session:
        try:
            async with session.ws_connect(
                target,
                headers=_backend_request_headers(request.headers),
                heartbeat=25.0,
                max_msg_size=0,
            ) as upstream:
                async def client_to_comfy() -> None:
                    async for message in downstream:
                        if message.type == aiohttp.WSMsgType.TEXT:
                            await upstream.send_str(message.data)
                        elif message.type == aiohttp.WSMsgType.BINARY:
                            await upstream.send_bytes(message.data)
                        elif message.type in {aiohttp.WSMsgType.CLOSE, aiohttp.WSMsgType.ERROR}:
                            break

                async def comfy_to_client() -> None:
                    async for message in upstream:
                        if message.type == aiohttp.WSMsgType.TEXT:
                            await downstream.send_str(message.data)
                        elif message.type == aiohttp.WSMsgType.BINARY:
                            await downstream.send_bytes(message.data)
                        elif message.type in {aiohttp.WSMsgType.CLOSE, aiohttp.WSMsgType.ERROR}:
                            break

                tasks = [asyncio.create_task(client_to_comfy()), asyncio.create_task(comfy_to_client())]
                done, pending = await asyncio.wait(tasks, return_when=asyncio.FIRST_COMPLETED)
                for task in pending:
                    task.cancel()
                await asyncio.gather(*pending, return_exceptions=True)
                for task in done:
                    task.result()
        except (aiohttp.ClientError, OSError) as error:
            LOG.warning("LAN gateway WebSocket relay failed: %s", error)
        finally:
            await downstream.close()
    return downstream


async def _relay_http(request: web.Request) -> web.StreamResponse:
    if request.headers.get("Upgrade", "").lower() == "websocket":
        return await _relay_websocket(request)

    target = _backend_url(request)
    headers = _backend_request_headers(request.headers)
    # Do not attach a chunked request stream to bodyless requests.  In
    # particular, ComfyUI's workflow/user-data GET endpoints expect an ordinary
    # bodyless GET; forwarding an empty async iterator changes its wire shape
    # and can make those routes fail in WebView clients.
    body = await request.read() if request.can_read_body else None
    async with aiohttp.ClientSession(auto_decompress=False) as session:
        try:
            async with session.request(
                request.method,
                target,
                headers=headers,
                data=body,
                allow_redirects=False,
            ) as upstream:
                response = web.StreamResponse(
                    status=upstream.status,
                    reason=upstream.reason,
                    headers=_forward_headers(upstream.headers),
                )
                await response.prepare(request)
                async for chunk in upstream.content.iter_chunked(1024 * 1024):
                    await response.write(chunk)
                await response.write_eof()
                return response
        except (aiohttp.ClientError, OSError) as error:
            raise web.HTTPBadGateway(text="Loopback ComfyUI is unavailable") from error


async def _start_gateway() -> None:
    global _runner
    application = web.Application(client_max_size=MAX_REQUEST_BYTES)
    application.router.add_route("*", "/{path:.*}", _relay_http)
    runner = web.AppRunner(application, access_log=None)
    await runner.setup()
    try:
        await web.TCPSite(runner, GATEWAY_HOST, GATEWAY_PORT).start()
    except OSError as error:
        await runner.cleanup()
        LOG.error("LAN gateway could not bind %s:%d: %s", GATEWAY_HOST, GATEWAY_PORT, error)
        return
    _runner = runner
    LOG.warning(
        "Companion LAN gateway listening on http://%s:%d -> %s (trusted LAN/tailnet only)",
        GATEWAY_HOST,
        GATEWAY_PORT,
        BACKEND,
    )


MAX_REQUEST_BYTES = 64 * 1024 * 1024


def register_companion_gateway() -> None:
    global _registered
    if _registered:
        return
    _registered = True
    PromptServer.instance.loop.create_task(_start_gateway())
