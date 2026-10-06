// Desktop gateway additions; shared Android display assets remain immutable.
export function prepareDesktop() {
  if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent) ||
      (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)) return false;
  window.__comfierDesktopBrowser = true;
  function snapshot() {
    const width = window.innerWidth, height = window.innerHeight;
    const portrait = height >= width;
    return {width, height, outer: false, portrait, mode: portrait ? 'innerPortrait' : 'innerLandscape'};
  }
  // Install before runtime preparation so every layout and panel owner uses
  // the same tablet profile, even on a small monitor or narrow browser window.
  window.__comfierViewport = Object.freeze({snapshot, mode: () => snapshot().mode, scale: () => 1});
  return true;
}

export function installDesktopClose() {
  const scope = window.__comfierRuntime.scope('desktop-settings-close');
  function mount() {
    for (const menu of document.querySelectorAll?.('.ufu-editor-status [data-toolbar-menu],.ufu-editor-status button[aria-controls="comfier-editor-menu"]') || []) {
      if (menu.textContent !== 'Menu') menu.textContent = 'Menu';
    }
    for (const entry of document.querySelectorAll?.('.ufu-toolbar-menu [data-copy-layout],.ufu-toolbar-menu .ufu-copy-options') || []) entry.remove();
    const panel = document.querySelector('#comfier-ui-zoom-test .ui-zoom-panel');
    const heading = panel?.querySelector('.comfier-app-settings-heading');
    if (!heading || heading.querySelector('.comfier-desktop-settings-close')) return;
    heading.style.position = 'relative';
    const button = document.createElement('button');
    button.type = 'button';button.className = 'comfier-desktop-settings-close';
    button.textContent = '×';button.setAttribute('aria-label', 'Close App Settings');
    button.style.cssText = 'position:absolute!important;right:0!important;top:0!important;width:28px!important;height:28px!important;min-width:28px!important;padding:0!important;font-size:24px!important;line-height:1!important;';
    scope.listen(button, 'click', event => {
      event.preventDefault();event.stopPropagation();
      if (!window.__comfierSidePanels?.close('sidebar:comfier-app-settings'))
        window.__comfierSidebarBootstrap?.closeIfOpen();
    });
    heading.appendChild(button);
  }
  mount();
  scope.observe(document.body, {childList:true, subtree:true}, () => scope.frame('mount', mount));
}
