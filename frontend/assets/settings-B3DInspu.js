//#region src/locales/en/settings.json
var Comfy_Appearance_DisableAnimations = {
	"name": "Disable animations",
	"tooltip": "Turns off most CSS animations and transitions. Speeds up inference when the display GPU is also used for generation."
};
var Comfy_Canvas_BackgroundImage = {
	"name": "Canvas background image",
	"tooltip": "Image URL for the canvas background. You can right-click an image in the outputs panel and select \"Set as Background\" to use it, or upload your own image using the upload button."
};
var Comfy_Canvas_LeftMouseClickBehavior = {
	"name": "Left Mouse Click Behavior",
	"options": {
		"Panning": "Panning",
		"Select": "Select"
	}
};
var Comfy_Canvas_MouseWheelScroll = {
	"name": "Mouse Wheel Scroll",
	"options": {
		"Panning": "Panning",
		"Zoom in/out": "Zoom in/out"
	}
};
var Comfy_Canvas_NavigationMode = {
	"name": "Navigation Mode",
	"options": {
		"Standard (New)": "Standard (New)",
		"Drag Navigation": "Drag Navigation",
		"Custom": "Custom"
	}
};
var Comfy_Canvas_SelectionToolbox = {
	"name": "Show selection toolbox",
	"tooltip": "Display a floating toolbar when nodes are selected, providing quick access to common actions."
};
var Comfy_ConfirmClear = { "name": "Require confirmation when clearing workflow" };
var Comfy_DevMode = { "name": "Enable dev mode options (API save, etc.)" };
var Comfy_DisableFloatRounding = {
	"name": "Disable default float widget rounding.",
	"tooltip": "(requires page reload) Cannot disable round when round is set by the node in the backend."
};
var Comfy_DisableSliders = { "name": "Disable node widget sliders" };
var Comfy_DOMClippingEnabled = { "name": "Enable DOM element clipping (enabling may reduce performance)" };
var Comfy_EditAttention_Delta = { "name": "Ctrl+up/down precision" };
var Comfy_EnableTooltips = { "name": "Enable Tooltips" };
var Comfy_EnableWorkflowViewRestore = { "name": "Save and restore canvas position and zoom level in workflows" };
var Comfy_ErrorSystem_ShowMissingModels = {
	"name": "Show missing models in the issues tab",
	"tooltip": "When disabled, model files that are not found are not listed in the issues tab and their nodes are not highlighted."
};
var Comfy_Execution_PreviewMethod = {
	"name": "Live preview method",
	"tooltip": "Live preview method during image generation. \"default\" uses the server CLI setting.",
	"options": {
		"default": "default",
		"none": "none",
		"auto": "auto",
		"latent2rgb": "latent2rgb",
		"taesd": "taesd"
	}
};
var Comfy_FloatRoundingPrecision = {
	"name": "Float widget rounding decimal places [0 = auto].",
	"tooltip": "(requires page reload)"
};
var Comfy_Graph_AutoPanSpeed = {
	"name": "Auto-pan speed",
	"tooltip": "Maximum speed when auto-panning by dragging to the canvas edge. Set to 0 to disable auto-panning."
};
var Comfy_Graph_CanvasInfo = { "name": "Show canvas info on bottom left corner (fps, etc.)" };
var Comfy_Graph_CanvasMenu = { "name": "Show graph canvas menu" };
var Comfy_Graph_CtrlShiftZoom = { "name": "Enable fast-zoom shortcut (Ctrl + Shift + Drag)" };
var Comfy_Graph_DeduplicateSubgraphNodeIds = {
	"name": "Deduplicate subgraph node IDs",
	"tooltip": "Automatically reassign duplicate node IDs in subgraphs when loading a workflow."
};
var Comfy_Graph_LinkMarkers = {
	"name": "Link midpoint markers",
	"options": {
		"None": "None",
		"Circle": "Circle",
		"Arrow": "Arrow"
	}
};
var Comfy_Graph_LiveSelection = {
	"name": "Live selection",
	"tooltip": "When enabled, nodes are selected/deselected in real-time as you drag the selection rectangle, similar to other design tools."
};
var Comfy_Graph_ZoomSpeed = { "name": "Canvas zoom speed" };
var Comfy_Group_DoubleClickTitleToEdit = { "name": "Double click group title to edit" };
var Comfy_GroupSelectedNodes_Padding = { "name": "Group selected nodes padding" };
var Comfy_LinkRelease_Action = {
	"name": "Action on link release (No modifier)",
	"options": {
		"context menu": "context menu",
		"search box": "search box",
		"no action": "no action"
	}
};
var Comfy_LinkRelease_ActionShift = {
	"name": "Action on link release (Shift)",
	"options": {
		"context menu": "context menu",
		"search box": "search box",
		"no action": "no action"
	}
};
var Comfy_LinkRenderMode = {
	"name": "Link Render Mode",
	"tooltip": "Controls the appearance and visibility of connection links between nodes on the canvas.",
	"options": {
		"Straight": "Straight",
		"Linear": "Linear",
		"Spline": "Spline",
		"Hidden": "Hidden"
	}
};
var Comfy_Load3D_3DViewerEnable = {
	"name": "Enable 3D Viewer (Beta)",
	"tooltip": "Enables the 3D Viewer (Beta) for selected nodes. This feature allows you to visualize and interact with 3D models directly within the full size 3d viewer."
};
var Comfy_Load3D_BackgroundColor = {
	"name": "Initial Background Color",
	"tooltip": "Controls the default background color of the 3D scene. This setting determines the background appearance when a new 3D widget is created, but can be adjusted individually for each widget after creation."
};
var Comfy_Load3D_CameraType = {
	"name": "Initial Camera Type",
	"tooltip": "Controls whether the camera is perspective or orthographic by default when a new 3D widget is created. This default can still be toggled individually for each widget after creation.",
	"options": {
		"perspective": "perspective",
		"orthographic": "orthographic"
	}
};
var Comfy_Load3D_LightAdjustmentIncrement = {
	"name": "Light Adjustment Increment",
	"tooltip": "Controls the increment size when adjusting light intensity in 3D scenes. A smaller step value allows for finer control over lighting adjustments, while a larger value results in more noticeable changes per adjustment."
};
var Comfy_Load3D_LightIntensity = {
	"name": "Initial Light Intensity",
	"tooltip": "Sets the default brightness level of lighting in the 3D scene. This value determines how intensely lights illuminate objects when a new 3D widget is created, but can be adjusted individually for each widget after creation."
};
var Comfy_Load3D_LightIntensityMaximum = {
	"name": "Light Intensity Maximum",
	"tooltip": "Sets the maximum allowable light intensity value for 3D scenes. This defines the upper brightness limit that can be set when adjusting lighting in any 3D widget."
};
var Comfy_Load3D_LightIntensityMinimum = {
	"name": "Light Intensity Minimum",
	"tooltip": "Sets the minimum allowable light intensity value for 3D scenes. This defines the lower brightness limit that can be set when adjusting lighting in any 3D widget."
};
var Comfy_Load3D_PLYEngine = {
	"name": "Point Cloud Engine",
	"tooltip": "Select the engine for loading point cloud PLY files. \"threejs\" uses the native Three.js PLYLoader (handles binary + ASCII, mesh-capable). \"fastply\" uses an optimized parser for ASCII PLY files. 3D Gaussian Splat PLYs are detected automatically and always rendered via sparkjs regardless of this setting.",
	"options": {
		"threejs": "threejs",
		"fastply": "fastply"
	}
};
var Comfy_Load3D_ShowGrid = {
	"name": "Initial Grid Visibility",
	"tooltip": "Controls whether the grid is visible by default when a new 3D widget is created. This default can still be toggled individually for each widget after creation."
};
var Comfy_Locale = { "name": "Language" };
var Comfy_MaskEditor_BrushAdjustmentSpeed = {
	"name": "Brush adjustment speed multiplier",
	"tooltip": "Controls how quickly the brush size and hardness change when adjusting. Higher values mean faster changes."
};
var Comfy_MaskEditor_UseDominantAxis = {
	"name": "Lock brush adjustment to dominant axis",
	"tooltip": "When enabled, brush adjustments will only affect size OR hardness based on which direction you move more"
};
var Comfy_ModelLibrary_AutoLoadAll = {
	"name": "Automatically load all model folders",
	"tooltip": "If true, all folders will load as soon as you open the model library (this may cause delays while it loads). If false, root level model folders will only load once you click on them."
};
var Comfy_ModelLibrary_NameFormat = {
	"name": "What name to display in the model library tree view",
	"tooltip": "Select \"filename\" to render a simplified view of the raw filename (without directory or \".safetensors\" extension) in the model list. Select \"title\" to display the configurable model metadata title.",
	"options": {
		"filename": "filename",
		"title": "title"
	}
};
var Comfy_Node_AllowImageSizeDraw = { "name": "Show width × height below the image preview" };
var Comfy_Node_AlwaysShowAdvancedWidgets = {
	"name": "Always show advanced widgets on all nodes",
	"tooltip": "When enabled, advanced widgets are always visible on all nodes without needing to expand them individually."
};
var Comfy_Node_AutoSnapLinkToSlot = {
	"name": "Auto snap link to node slot",
	"tooltip": "When dragging a link over a node, the link automatically snap to a viable input slot on the node"
};
var Comfy_Node_BypassAllLinksOnDelete = {
	"name": "Keep all links when deleting nodes",
	"tooltip": "When deleting a node, attempt to reconnect all of its input and output links (bypassing the deleted node)"
};
var Comfy_Node_DoubleClickTitleToEdit = { "name": "Double click node title to edit" };
var Comfy_Node_MiddleClickRerouteNode = { "name": "Middle-click creates a new Reroute node" };
var Comfy_Node_Opacity = { "name": "Node opacity" };
var Comfy_Node_ShowDeprecated = {
	"name": "Show deprecated nodes in search",
	"tooltip": "Deprecated nodes are hidden by default in the UI, but remain functional in existing workflows that use them."
};
var Comfy_Node_ShowExperimental = {
	"name": "Show experimental nodes in search",
	"tooltip": "Experimental nodes are marked as such in the UI and may be subject to significant changes or removal in future versions. Use with caution in production workflows"
};
var Comfy_Node_SnapHighlightsNode = {
	"name": "Snap highlights node",
	"tooltip": "When dragging a link over a node with viable input slot, highlight the node"
};
var Comfy_NodeBadge_NodeIdBadgeMode = {
	"name": "Node ID badge mode",
	"options": {
		"None": "None",
		"Show all": "Show all"
	}
};
var Comfy_NodeBadge_NodeLifeCycleBadgeMode = {
	"name": "Node life cycle badge mode",
	"options": {
		"None": "None",
		"Show all": "Show all"
	}
};
var Comfy_NodeBadge_NodeSourceBadgeMode = {
	"name": "Node source badge mode",
	"options": {
		"None": "None",
		"Show all": "Show all",
		"Hide built-in": "Hide built-in"
	}
};
var Comfy_NodeBadge_ShowApiPricing = { "name": "Show API node pricing badge" };
var Comfy_NodeLibrary_NewDesign = {
	"name": "New Node Library Design",
	"tooltip": "Enable the redesigned node library sidebar with tabs (Essential, All, Custom), improved search, and hover previews."
};
var Comfy_NodeReplacement_Enabled = {
	"name": "Enable node replacement suggestions",
	"tooltip": "When enabled, missing nodes with known replacements will be shown as replaceable in the missing nodes dialog, allowing you to review and apply replacements."
};
var Comfy_NodeSearchBoxImpl = {
	"name": "Node search box implementation",
	"options": {
		"default": "default",
		"v1 (legacy)": "v1 (legacy)",
		"litegraph (legacy)": "litegraph (legacy)"
	}
};
var Comfy_NodeSearchBoxImpl_FollowCursor = {
	"name": "Added nodes follow the cursor",
	"tooltip": "When enabled, nodes added from the search box follow the cursor until clicked to place. Only applies to the default implementation."
};
var Comfy_NodeSearchBoxImpl_NodePreview = {
	"name": "Node preview",
	"tooltip": "Only applies to the default implementation"
};
var Comfy_NodeSearchBoxImpl_ShowCategory = {
	"name": "Show node category in search results",
	"tooltip": "Only applies to v1 (legacy)"
};
var Comfy_NodeSearchBoxImpl_ShowIdName = {
	"name": "Show node id name in search results",
	"tooltip": "Does not apply to litegraph (legacy)"
};
var Comfy_NodeSearchBoxImpl_ShowNodeFrequency = {
	"name": "Show node frequency in search results",
	"tooltip": "Only applies to v1 (legacy)"
};
var Comfy_NodeSuggestions_number = {
	"name": "Number of nodes suggestions",
	"tooltip": "Only for litegraph searchbox/context menu"
};
var Comfy_Notification_ShowVersionUpdates = {
	"name": "Show version updates",
	"tooltip": "Show updates for new models, and major new features."
};
var Comfy_Pointer_ClickDrift = {
	"name": "Pointer click drift (maximum distance)",
	"tooltip": "If the pointer moves more than this distance while holding a button down, it is considered dragging (rather than clicking).\n\nHelps prevent objects from being unintentionally nudged if the pointer is moved whilst clicking."
};
var Comfy_Pointer_DoubleClickTime = {
	"name": "Double click interval (maximum)",
	"tooltip": "The maximum time in milliseconds between the two clicks of a double-click.  Increasing this value may assist if double-clicks are sometimes not registered."
};
var Comfy_PreviewFormat = {
	"name": "Preview image format",
	"tooltip": "When displaying a preview in the image widget, convert it to a lightweight image, e.g. webp, jpeg, webp;50, etc."
};
var Comfy_PromptFilename = { "name": "Prompt for filename when saving workflow" };
var Comfy_Queue_MaxHistoryItems = {
	"name": "Queue history size",
	"tooltip": "The maximum number of tasks that show in the queue history."
};
var Comfy_Queue_QPOV2 = {
	"name": "Docked job history/queue panel",
	"tooltip": "Replaces the floating job queue panel with an equivalent job queue embedded in the job history side panel. You can disable this to return to the floating panel layout."
};
var Comfy_QueueButton_BatchCountLimit = {
	"name": "Batch count limit",
	"tooltip": "The maximum number of tasks added to the queue at one button click"
};
var Comfy_RightSidePanel_ShowErrorsTab = {
	"name": "Show issues tab in side panel",
	"tooltip": "When enabled, the Issues tab is displayed in the right side panel to show blocking errors and missing resources that need setup."
};
var Comfy_Sidebar_Location = {
	"name": "Sidebar location",
	"options": {
		"left": "left",
		"right": "right"
	}
};
var Comfy_Sidebar_Size = {
	"name": "Sidebar size",
	"options": {
		"normal": "normal",
		"small": "small"
	}
};
var Comfy_Sidebar_Style = {
	"name": "Sidebar style",
	"options": {
		"floating": "floating",
		"connected": "connected"
	}
};
var Comfy_Sidebar_UnifiedWidth = { "name": "Unified sidebar width" };
var Comfy_SnapToGrid_GridSize = {
	"name": "Snap to grid size",
	"tooltip": "When dragging and resizing nodes while holding shift they will be aligned to the grid, this controls the size of that grid."
};
var Comfy_TextareaWidget_FontSize = { "name": "Textarea widget font size" };
var Comfy_TextareaWidget_Spellcheck = { "name": "Textarea widget spellcheck" };
var Comfy_TreeExplorer_ItemPadding = { "name": "Tree explorer item padding" };
var Comfy_UI_TabBarLayout = {
	"name": "Tab Bar Layout",
	"tooltip": "Controls the elements contained in the integrated tab bar.",
	"options": {
		"Default": "Default",
		"Legacy": "Legacy"
	}
};
var Comfy_UseNewMenu = {
	"name": "Use new menu",
	"tooltip": "Enable the redesigned top menu bar.",
	"options": {
		"Disabled": "Disabled",
		"Top": "Top"
	}
};
var Comfy_Validation_Workflows = { "name": "Validate workflows" };
var Comfy_VueNodes_Enabled = {
	"name": "Modern Node Design (Nodes 2.0)",
	"tooltip": "Modern: DOM-based rendering with enhanced interactivity, native browser features, and updated visual design. Classic: Traditional canvas rendering."
};
var Comfy_WidgetControlMode = {
	"name": "Widget control mode",
	"tooltip": "Controls when widget values are updated (randomize/increment/decrement), either before the prompt is queued or after.",
	"options": {
		"before": "before",
		"after": "after"
	}
};
var Comfy_Window_UnloadConfirmation = { "name": "Show confirmation when closing window" };
var Comfy_Workflow_AutoSave = {
	"name": "Auto Save",
	"options": {
		"off": "off",
		"after delay": "after delay"
	}
};
var Comfy_Workflow_AutoSaveDelay = {
	"name": "Auto Save Delay (ms)",
	"tooltip": "Only applies if Auto Save is set to \"after delay\"."
};
var Comfy_Workflow_ConfirmDelete = { "name": "Show confirmation when deleting workflows" };
var Comfy_Workflow_NamedValuesRestore = { "name": "Restore widget values by name" };
var Comfy_Workflow_Persist = { "name": "Persist workflow state and restore on page (re)load" };
var Comfy_Workflow_ShowMissingMediaWarning = {
	"name": "Show missing media in the issues tab",
	"tooltip": "When disabled, input images, videos and audio that are not found are not listed in the issues tab and their nodes are not highlighted."
};
var Comfy_Workflow_ShowMissingNodesWarning = {
	"name": "Show missing nodes in the issues tab",
	"tooltip": "When disabled, missing node packs are not listed in the issues tab and their nodes are not highlighted. The workflow still cannot run until they are installed."
};
var Comfy_Workflow_SortNodeIdOnSave = { "name": "Sort node IDs when saving workflow" };
var Comfy_Workflow_WarnBlueprintOverwrite = { "name": "Require confirmation to overwrite an existing subgraph blueprint" };
var Comfy_Workflow_WorkflowTabsPosition = {
	"name": "Opened workflows position",
	"options": {
		"Sidebar": "Sidebar",
		"Topbar": "Topbar"
	}
};
var LiteGraph_Canvas_MaximumFps = {
	"name": "Maximum FPS",
	"tooltip": "The maximum frames per second that the canvas is allowed to render. Caps GPU usage at the cost of smoothness. If 0, the screen refresh rate is used. Default: 0"
};
var LiteGraph_Canvas_MinFontSizeForLOD = {
	"name": "Zoom Node Level of Detail - font size threshold",
	"tooltip": "Controls when the nodes switch to low quality LOD rendering. Uses font size in pixels to determine when to switch. Set to 0 to disable. Values 1-24 set the minimum font size threshold for LOD - higher values (24px) = switch nodes to simplified rendering sooner when zooming out, lower values (1px) = maintain full node quality longer."
};
var LiteGraph_ContextMenu_Scaling = { "name": "Scale node combo widget menus (lists) when zoomed in" };
var LiteGraph_Group_SelectChildrenOnClick = {
	"name": "Select group children on click",
	"tooltip": "When enabled, clicking a group selects all nodes and items inside it"
};
var LiteGraph_Node_DefaultPadding = {
	"name": "Always shrink new nodes",
	"tooltip": "Resize nodes to the smallest possible size when created. When disabled, a newly added node will be widened slightly to show widget values."
};
var LiteGraph_Node_TooltipDelay = { "name": "Tooltip Delay" };
var LiteGraph_Reroute_SplineOffset = {
	"name": "Reroute spline offset",
	"tooltip": "The bezier control point offset from the reroute centre point"
};
var pysssss_SnapToGrid = {
	"name": "Always snap to grid",
	"tooltip": "When enabled, nodes will automatically align to the grid when moved or resized."
};
var settings_default = {
	"Comfy-Desktop_AutoUpdate": { "name": "Automatically check for updates" },
	"Comfy-Desktop_SendStatistics": { "name": "Send anonymous usage metrics" },
	"Comfy-Desktop_UV_PypiInstallMirror": {
		"name": "Pypi Install Mirror",
		"tooltip": "Default pip install mirror"
	},
	"Comfy-Desktop_UV_PythonInstallMirror": {
		"name": "Python Install Mirror",
		"tooltip": "Managed Python installations are downloaded from the Astral python-build-standalone project. This variable can be set to a mirror URL to use a different source for Python installations. The provided URL will replace https://github.com/astral-sh/python-build-standalone/releases/download in, e.g., https://github.com/astral-sh/python-build-standalone/releases/download/20240713/cpython-3.12.4%2B20240713-aarch64-apple-darwin-install_only.tar.gz. Distributions can be read from a local directory by using the file:// URL scheme."
	},
	"Comfy-Desktop_UV_TorchInstallMirror": {
		"name": "Torch Install Mirror",
		"tooltip": "Pip install mirror for pytorch"
	},
	"Comfy-Desktop_WindowStyle": {
		"name": "Window Style",
		"tooltip": "Custom: Replace the system title bar with ComfyUI's Top menu",
		"options": {
			"default": "default",
			"custom": "custom"
		}
	},
	Comfy_Appearance_DisableAnimations,
	Comfy_Canvas_BackgroundImage,
	Comfy_Canvas_LeftMouseClickBehavior,
	Comfy_Canvas_MouseWheelScroll,
	Comfy_Canvas_NavigationMode,
	Comfy_Canvas_SelectionToolbox,
	Comfy_ConfirmClear,
	Comfy_DevMode,
	Comfy_DisableFloatRounding,
	Comfy_DisableSliders,
	Comfy_DOMClippingEnabled,
	Comfy_EditAttention_Delta,
	Comfy_EnableTooltips,
	Comfy_EnableWorkflowViewRestore,
	Comfy_ErrorSystem_ShowMissingModels,
	Comfy_Execution_PreviewMethod,
	Comfy_FloatRoundingPrecision,
	Comfy_Graph_AutoPanSpeed,
	Comfy_Graph_CanvasInfo,
	Comfy_Graph_CanvasMenu,
	Comfy_Graph_CtrlShiftZoom,
	Comfy_Graph_DeduplicateSubgraphNodeIds,
	Comfy_Graph_LinkMarkers,
	Comfy_Graph_LiveSelection,
	Comfy_Graph_ZoomSpeed,
	Comfy_Group_DoubleClickTitleToEdit,
	Comfy_GroupSelectedNodes_Padding,
	Comfy_LinkRelease_Action,
	Comfy_LinkRelease_ActionShift,
	Comfy_LinkRenderMode,
	Comfy_Load3D_3DViewerEnable,
	Comfy_Load3D_BackgroundColor,
	Comfy_Load3D_CameraType,
	Comfy_Load3D_LightAdjustmentIncrement,
	Comfy_Load3D_LightIntensity,
	Comfy_Load3D_LightIntensityMaximum,
	Comfy_Load3D_LightIntensityMinimum,
	Comfy_Load3D_PLYEngine,
	Comfy_Load3D_ShowGrid,
	Comfy_Locale,
	Comfy_MaskEditor_BrushAdjustmentSpeed,
	Comfy_MaskEditor_UseDominantAxis,
	Comfy_ModelLibrary_AutoLoadAll,
	Comfy_ModelLibrary_NameFormat,
	Comfy_Node_AllowImageSizeDraw,
	Comfy_Node_AlwaysShowAdvancedWidgets,
	Comfy_Node_AutoSnapLinkToSlot,
	Comfy_Node_BypassAllLinksOnDelete,
	Comfy_Node_DoubleClickTitleToEdit,
	Comfy_Node_MiddleClickRerouteNode,
	Comfy_Node_Opacity,
	Comfy_Node_ShowDeprecated,
	Comfy_Node_ShowExperimental,
	Comfy_Node_SnapHighlightsNode,
	Comfy_NodeBadge_NodeIdBadgeMode,
	Comfy_NodeBadge_NodeLifeCycleBadgeMode,
	Comfy_NodeBadge_NodeSourceBadgeMode,
	Comfy_NodeBadge_ShowApiPricing,
	Comfy_NodeLibrary_NewDesign,
	Comfy_NodeReplacement_Enabled,
	Comfy_NodeSearchBoxImpl,
	Comfy_NodeSearchBoxImpl_FollowCursor,
	Comfy_NodeSearchBoxImpl_NodePreview,
	Comfy_NodeSearchBoxImpl_ShowCategory,
	Comfy_NodeSearchBoxImpl_ShowIdName,
	Comfy_NodeSearchBoxImpl_ShowNodeFrequency,
	Comfy_NodeSuggestions_number,
	Comfy_Notification_ShowVersionUpdates,
	Comfy_Pointer_ClickDrift,
	Comfy_Pointer_DoubleClickTime,
	Comfy_PreviewFormat,
	Comfy_PromptFilename,
	Comfy_Queue_MaxHistoryItems,
	Comfy_Queue_QPOV2,
	Comfy_QueueButton_BatchCountLimit,
	Comfy_RightSidePanel_ShowErrorsTab,
	Comfy_Sidebar_Location,
	Comfy_Sidebar_Size,
	Comfy_Sidebar_Style,
	Comfy_Sidebar_UnifiedWidth,
	Comfy_SnapToGrid_GridSize,
	Comfy_TextareaWidget_FontSize,
	Comfy_TextareaWidget_Spellcheck,
	Comfy_TreeExplorer_ItemPadding,
	Comfy_UI_TabBarLayout,
	Comfy_UseNewMenu,
	Comfy_Validation_Workflows,
	Comfy_VueNodes_Enabled,
	Comfy_WidgetControlMode,
	Comfy_Window_UnloadConfirmation,
	Comfy_Workflow_AutoSave,
	Comfy_Workflow_AutoSaveDelay,
	Comfy_Workflow_ConfirmDelete,
	Comfy_Workflow_NamedValuesRestore,
	Comfy_Workflow_Persist,
	Comfy_Workflow_ShowMissingMediaWarning,
	Comfy_Workflow_ShowMissingNodesWarning,
	Comfy_Workflow_SortNodeIdOnSave,
	Comfy_Workflow_WarnBlueprintOverwrite,
	Comfy_Workflow_WorkflowTabsPosition,
	LiteGraph_Canvas_MaximumFps,
	LiteGraph_Canvas_MinFontSizeForLOD,
	LiteGraph_ContextMenu_Scaling,
	LiteGraph_Group_SelectChildrenOnClick,
	LiteGraph_Node_DefaultPadding,
	LiteGraph_Node_TooltipDelay,
	LiteGraph_Reroute_SplineOffset,
	pysssss_SnapToGrid
};
//#endregion
export { Comfy_NodeSearchBoxImpl_NodePreview as $, LiteGraph_Reroute_SplineOffset as $t, Comfy_LinkRenderMode as A, Comfy_TreeExplorer_ItemPadding as At, Comfy_Locale as B, Comfy_Workflow_NamedValuesRestore as Bt, Comfy_Graph_LinkMarkers as C, Comfy_Sidebar_Location as Ct, Comfy_Group_DoubleClickTitleToEdit as D, Comfy_SnapToGrid_GridSize as Dt, Comfy_GroupSelectedNodes_Padding as E, Comfy_Sidebar_UnifiedWidth as Et, Comfy_Load3D_LightIntensity as F, Comfy_WidgetControlMode as Ft, Comfy_NodeBadge_NodeIdBadgeMode as G, Comfy_Workflow_WarnBlueprintOverwrite as Gt, Comfy_MaskEditor_UseDominantAxis as H, Comfy_Workflow_ShowMissingMediaWarning as Ht, Comfy_Load3D_LightIntensityMaximum as I, Comfy_Window_UnloadConfirmation as It, Comfy_NodeBadge_ShowApiPricing as J, LiteGraph_Canvas_MinFontSizeForLOD as Jt, Comfy_NodeBadge_NodeLifeCycleBadgeMode as K, Comfy_Workflow_WorkflowTabsPosition as Kt, Comfy_Load3D_LightIntensityMinimum as L, Comfy_Workflow_AutoSave as Lt, Comfy_Load3D_BackgroundColor as M, Comfy_UseNewMenu as Mt, Comfy_Load3D_CameraType as N, Comfy_Validation_Workflows as Nt, Comfy_LinkRelease_Action as O, Comfy_TextareaWidget_FontSize as Ot, Comfy_Load3D_LightAdjustmentIncrement as P, Comfy_VueNodes_Enabled as Pt, Comfy_NodeSearchBoxImpl_FollowCursor as Q, LiteGraph_Node_TooltipDelay as Qt, Comfy_Load3D_PLYEngine as R, Comfy_Workflow_AutoSaveDelay as Rt, Comfy_Graph_DeduplicateSubgraphNodeIds as S, Comfy_RightSidePanel_ShowErrorsTab as St, Comfy_Graph_ZoomSpeed as T, Comfy_Sidebar_Style as Tt, Comfy_ModelLibrary_AutoLoadAll as U, Comfy_Workflow_ShowMissingNodesWarning as Ut, Comfy_MaskEditor_BrushAdjustmentSpeed as V, Comfy_Workflow_Persist as Vt, Comfy_ModelLibrary_NameFormat as W, Comfy_Workflow_SortNodeIdOnSave as Wt, Comfy_NodeReplacement_Enabled as X, LiteGraph_Group_SelectChildrenOnClick as Xt, Comfy_NodeLibrary_NewDesign as Y, LiteGraph_ContextMenu_Scaling as Yt, Comfy_NodeSearchBoxImpl as Z, LiteGraph_Node_DefaultPadding as Zt, Comfy_FloatRoundingPrecision as _, Comfy_PreviewFormat as _t, Comfy_Canvas_NavigationMode as a, Comfy_Node_AlwaysShowAdvancedWidgets as at, Comfy_Graph_CanvasMenu as b, Comfy_Queue_MaxHistoryItems as bt, Comfy_DOMClippingEnabled as c, Comfy_Node_DoubleClickTitleToEdit as ct, Comfy_DisableSliders as d, Comfy_Node_ShowDeprecated as dt, pysssss_SnapToGrid as en, Comfy_NodeSearchBoxImpl_ShowCategory as et, Comfy_EditAttention_Delta as f, Comfy_Node_ShowExperimental as ft, Comfy_Execution_PreviewMethod as g, Comfy_Pointer_DoubleClickTime as gt, Comfy_ErrorSystem_ShowMissingModels as h, Comfy_Pointer_ClickDrift as ht, Comfy_Canvas_MouseWheelScroll as i, Comfy_Node_AllowImageSizeDraw as it, Comfy_Load3D_3DViewerEnable as j, Comfy_UI_TabBarLayout as jt, Comfy_LinkRelease_ActionShift as k, Comfy_TextareaWidget_Spellcheck as kt, Comfy_DevMode as l, Comfy_Node_MiddleClickRerouteNode as lt, Comfy_EnableWorkflowViewRestore as m, Comfy_Notification_ShowVersionUpdates as mt, Comfy_Canvas_BackgroundImage as n, Comfy_NodeSearchBoxImpl_ShowNodeFrequency as nt, Comfy_Canvas_SelectionToolbox as o, Comfy_Node_AutoSnapLinkToSlot as ot, Comfy_EnableTooltips as p, Comfy_Node_SnapHighlightsNode as pt, Comfy_NodeBadge_NodeSourceBadgeMode as q, LiteGraph_Canvas_MaximumFps as qt, Comfy_Canvas_LeftMouseClickBehavior as r, Comfy_NodeSuggestions_number as rt, Comfy_ConfirmClear as s, Comfy_Node_BypassAllLinksOnDelete as st, Comfy_Appearance_DisableAnimations as t, settings_default as tn, Comfy_NodeSearchBoxImpl_ShowIdName as tt, Comfy_DisableFloatRounding as u, Comfy_Node_Opacity as ut, Comfy_Graph_AutoPanSpeed as v, Comfy_PromptFilename as vt, Comfy_Graph_LiveSelection as w, Comfy_Sidebar_Size as wt, Comfy_Graph_CtrlShiftZoom as x, Comfy_Queue_QPOV2 as xt, Comfy_Graph_CanvasInfo as y, Comfy_QueueButton_BatchCountLimit as yt, Comfy_Load3D_ShowGrid as z, Comfy_Workflow_ConfirmDelete as zt };
