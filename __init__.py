"""Host-side companion services for the ComfierUI Android client."""

from .model_download import register_routes
from .spatial_workflows import register_spatial_routes
from .companion_gateway import register_companion_gateway


register_routes()
register_spatial_routes()
register_companion_gateway()

NODE_CLASS_MAPPINGS = {}
NODE_DISPLAY_NAME_MAPPINGS = {}
WEB_DIRECTORY = "./web"

__all__ = ["NODE_CLASS_MAPPINGS", "NODE_DISPLAY_NAME_MAPPINGS", "WEB_DIRECTORY"]
