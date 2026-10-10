"""Serve an immutable packaged frontend without consulting stock Comfy assets."""

import hashlib
import json
import mimetypes
from dataclasses import dataclass
from pathlib import Path
from urllib.parse import unquote


class FrontendBundleError(ValueError):
    pass


@dataclass(frozen=True)
class FrontendAsset:
    body: bytes
    content_type: str
    checksum: str


class CustomFrontend:
    def __init__(self, root: Path, expected_version: str):
        self.root = root.resolve()
        self.expected_version = expected_version
        self._files = {}
        self._manifest = None

    def load(self):
        self._files = {}
        self._manifest = None
        try:
            manifest = json.loads((self.root / 'comfier-build.json').read_text())
        except (OSError, ValueError) as error:
            raise FrontendBundleError('Custom frontend bundle is missing or invalid') from error
        if not isinstance(manifest, dict):
            raise FrontendBundleError('Custom frontend manifest must be an object')
        if manifest.get('frontendVersion') != self.expected_version:
            raise FrontendBundleError('Custom frontend version does not match Companion')
        build_id = manifest.get('buildId')
        if not isinstance(build_id, str) or len(build_id) != 64:
            raise FrontendBundleError('Invalid frontend build identity')
        files = manifest.get('files')
        if not isinstance(files, dict) or 'index.html' not in files:
            raise FrontendBundleError('Custom frontend index is missing')
        if len(files) > 20000:
            raise FrontendBundleError('Custom frontend inventory exceeds the asset limit')
        canonical = json.dumps(files, sort_keys=True, separators=(',', ':')).encode()
        if hashlib.sha256(canonical).hexdigest() != build_id:
            raise FrontendBundleError('Frontend build identity does not match file inventory')
        verified = {}
        size = 0
        for name, checksum in files.items():
            if not self._valid_name(name):
                raise FrontendBundleError('Invalid frontend asset path')
            path = self.root / name
            if path.is_symlink() or not path.resolve().is_relative_to(self.root):
                raise FrontendBundleError('Frontend asset escapes the bundle')
            try:
                size += path.stat().st_size
                if size > 256 * 1024 * 1024:
                    raise FrontendBundleError('Custom frontend exceeds the bundle size limit')
                body = path.read_bytes()
            except OSError as error:
                raise FrontendBundleError('Packaged frontend asset is missing') from error
            digest = hashlib.sha256(body).hexdigest()
            if digest != checksum:
                raise FrontendBundleError('Packaged frontend asset checksum mismatch')
            content_type = mimetypes.guess_type(name)[0] or 'application/octet-stream'
            if name.endswith(('.js', '.mjs')):
                content_type = 'application/javascript'
            verified[name] = FrontendAsset(body, content_type, digest)
        self._files = verified
        self._manifest = manifest

    @staticmethod
    def _valid_name(name):
        return (
            isinstance(name, str)
            and bool(name)
            and not name.startswith('/')
            and '\\' not in name
            and '\x00' not in name
            and all(part not in {'', '.', '..'} for part in name.split('/'))
        )

    @property
    def build_id(self):
        if self._manifest is None:
            raise FrontendBundleError('Custom frontend is not loaded')
        return self._manifest['buildId']

    def asset(self, request_path):
        if self._manifest is None:
            raise FrontendBundleError('Custom frontend is not loaded')
        if not isinstance(request_path, str) or not request_path.startswith('/'):
            return None
        path = unquote(request_path)
        if path in {'/', '/index.html'}:
            return self._files['index.html']
        name = path[1:]
        if not self._valid_name(name):
            return None
        return self._files.get(name)

    def snapshot(self):
        return {
            'source': 'packaged-custom-frontend',
            'frontendVersion': self.expected_version,
            'loaded': self._manifest is not None,
            'buildId': self._manifest['buildId'] if self._manifest else None,
            'assets': len(self._files),
            'stockFallback': False,
        }
