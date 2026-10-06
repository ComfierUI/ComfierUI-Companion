"""Host-side companion services for the ComfierUI Android client."""

from .model_download import register_routes
from .companion_gateway import register_companion_gateway
from .notification_status import register_notification_routes
from .display_bundle import register_display_bundle
from .diagnostics_host import register_diagnostic_routes
from .theme_profiles import register_theme_routes
from .resource_monitor import register_resource_routes
from .workflow_apps import register_workflow_app_routes


register_routes()
register_companion_gateway()
register_notification_routes()
register_display_bundle()
register_diagnostic_routes()
register_theme_routes()
register_resource_routes()
register_workflow_app_routes()

NODE_CLASS_MAPPINGS = {}
NODE_DISPLAY_NAME_MAPPINGS = {}
WEB_DIRECTORY = "./web"

__all__ = ["NODE_CLASS_MAPPINGS", "NODE_DISPLAY_NAME_MAPPINGS", "WEB_DIRECTORY"]
