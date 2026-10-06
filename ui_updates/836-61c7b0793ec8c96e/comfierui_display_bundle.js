const VERSION='0.4.27';
const loaded=[];
let installation;
async function load(path){await import(path);loaded.push(path);}
export function install(){return installation ||= installOnce();}
async function installOnce(){
  // Fetch in parallel; evaluation retains the dependency-sensitive order below.
  if(document.createElement&&document.head)for(const path of ['./display/comfier_editor_guard.js', './display/comfier_default_profile.js', './display/comfier_theme_manifest.js', './display/comfier_accent_theme.js', './display/comfier_back_dispatcher.js', './display/comfier_ui_editor_model.js', './display/comfier_theme_studio.js', './display/comfier_layout_side.js', './display/comfier_companion_back_handlers.js', './display/comfier_diagnostic_host_bridge.js', './display/comfier_diagnostic_suite.js', './display/comfier_gutter_grips.js', './display/comfier_video_preview_codec.js', './display/comfier_gallery_video_repair.js', './display/comfier_media_session.js', './display/comfier_media_grid.js', './display/comfier_responsive_ui.js', './display/inline_autoReconnectControl.js', './display/inline_generationNotificationsControl.js', './display/inline_companionVersionControl.js', './display/comfier_client_settings.js', './display/comfier_node_search_shell.js', './display/comfier_ui_cleanup.js', './display/comfier_media_assets_back.js', './display/comfier_edge_bar.js', './display/comfier_connected_sidebar.js', './display/comfier_unified_sidebar.js', './display/comfier_sidebar_bootstrap.js', './display/comfier_sidebar_proxy_tabs.js', './display/comfier_side_panels.js', './display/comfier_early_floating_panels.js', './display/comfier_templates_sidebar.js', './display/comfier_native_settings_sidebar.js', './display/comfier_extensions_panel.js', './display/comfier_lora_panel.js', './display/comfier_ltx_precision_panel.js', './display/comfier_ltx_precision.js', './display/comfier_workspace_topbar.js', './display/comfier_mini_panels.js', './display/comfier_transient_menus.js', './display/comfier_owned_overlay_layers.js', './display/comfier_detail_popovers.js', './display/comfier_actionbar_owner.js', './display/comfier_workflow_owner.js', './display/comfier_canvas_owner.js', './display/comfier_layout_editor.js', './display/comfier_display_mode_status.js']){
    const link=document.createElement('link');link.rel='modulepreload';link.href=new URL(path,import.meta.url).href;document.head.appendChild(link);
  }

  await load('./display/comfier_editor_guard.js');
  await load('./display/comfier_default_profile.js');
  await load('./display/comfier_theme_manifest.js');
  await load('./display/comfier_accent_theme.js');
  await load('./display/comfier_back_dispatcher.js');
  await load('./display/comfier_ui_editor_model.js');
  await load('./display/comfier_theme_studio.js');
  await load('./display/comfier_layout_side.js');
  await load('./display/comfier_companion_back_handlers.js');
  await load('./display/comfier_diagnostic_host_bridge.js');
  await load('./display/comfier_diagnostic_suite.js');
  await load('./display/comfier_gutter_grips.js');
  await load('./display/comfier_video_preview_codec.js');
  await load('./display/comfier_gallery_video_repair.js');
  await load('./display/comfier_media_session.js');
  await load('./display/comfier_media_grid.js');
  await load('./display/comfier_responsive_ui.js');
  await load('./display/inline_autoReconnectControl.js');
  await load('./display/inline_generationNotificationsControl.js');
  await load('./display/inline_companionVersionControl.js');
  await load('./display/comfier_client_settings.js');
  await load('./display/comfier_node_search_shell.js');
  await load('./display/comfier_ui_cleanup.js');
  await load('./display/comfier_media_assets_back.js');
  await load('./display/comfier_edge_bar.js');
  await load('./display/comfier_connected_sidebar.js');
  await load('./display/comfier_unified_sidebar.js');
  await load('./display/comfier_sidebar_bootstrap.js');
  await load('./display/comfier_sidebar_proxy_tabs.js');
  await load('./display/comfier_side_panels.js');
  await load('./display/comfier_early_floating_panels.js');
  await load('./display/comfier_detail_popovers.js');
  await load('./display/comfier_templates_sidebar.js');
  await load('./display/comfier_native_settings_sidebar.js');
  await load('./display/comfier_extensions_panel.js');
  await load('./display/comfier_lora_panel.js');
  await load('./display/comfier_ltx_precision_panel.js');
  await load('./display/comfier_ltx_precision.js');
  await load('./display/comfier_workspace_topbar.js');
  await load('./display/comfier_mini_panels.js');
  await load('./display/comfier_transient_menus.js');
  await load('./display/comfier_owned_overlay_layers.js');
  await load('./display/comfier_actionbar_owner.js');
  await load('./display/comfier_download_monitor.js');
  await load('./display/comfier_workflow_owner.js');
  await load('./display/comfier_workflow_apps.js');
  await load('./display/comfier_panel_polish.js');
  await load('./display/comfier_canvas_owner.js');
  await load('./display/comfier_layout_editor.js');
  await load('./display/comfier_display_mode_status.js');
  window.__comfierOwnedChromePending=false;
  window.__comfierRequestLayout?.();
  window.__comfierLayoutEditor?.refresh();
  window.__comfierCompanionDisplayMode=Object.freeze({ready:true,version:VERSION,visualSource:'0.92.2-Dev',modules:Object.freeze(loaded.slice())});
  window.dispatchEvent(new CustomEvent('comfierui-companion-display-ready',{detail:window.__comfierCompanionDisplayMode}));
  return window.__comfierCompanionDisplayMode;
}
