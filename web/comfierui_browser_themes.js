// Theme operations and refresh are owned by the shared client theme library.
export async function installBrowserThemes() {
  window.__comfierBrowserThemeStore = {flush: () => window.__comfierThemeStudio?.syncProfiles()};
  window.__comfierBrowserThemesReady = () => {
    window.__comfierThemeStudio?.syncProfiles().catch(console.error);
  };
}
