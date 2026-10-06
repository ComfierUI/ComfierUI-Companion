// Gateway-only persistence adapter. The immutable app UI continues to use its
// existing profile operations; this maps that store to individual host files.
const KEY = 'comfier.theme.profiles.v1';
export async function installBrowserThemes() {
  const response = await fetch('/comfierui/themes?store=host', {cache: 'no-store'});
  if (!response.ok) throw Error('Host theme folder unavailable (HTTP ' + response.status + ')');
  const {profiles} = await response.json();
  const storage = window.localStorage, nativeSet = Storage.prototype.setItem;
  const remote = new Map(profiles.map(p => [p.id, p]));
  // Retain browser-only themes from older sessions until explicitly imported;
  // a backup prevents replacing the device store from losing those profiles.
  const previous = storage.getItem(KEY);
  if (previous && previous !== '[]' && !storage.getItem('comfier.theme.browser-backup.v1')) nativeSet.call(storage, 'comfier.theme.browser-backup.v1', previous);
  const active = storage.getItem('comfier.theme.active.v1');
  let oldActive;
  try {oldActive = JSON.parse(previous || '[]').find(p => p.id === active);} catch (_) {}
  const hostActive = profiles.find(p => p.id === active || (oldActive && p.name === oldActive.name));
  if (hostActive) nativeSet.call(storage, 'comfier.theme.active.v1', hostActive.id);
  nativeSet.call(storage, KEY, JSON.stringify(profiles));
  let queue = Promise.resolve(), failed = false;
  const status = document.createElement('div');
  status.setAttribute('role', 'status');
  status.style.cssText = 'position:fixed;bottom:8px;left:8px;z-index:2147483647;background:#000;color:#fff;padding:8px;border:1px solid #fff;max-width:360px';
  status.hidden = true;
  function message(text) {status.textContent = text;status.hidden = !text;if (!status.isConnected) document.body.appendChild(status);}
  async function operation(value) {
    const r = await fetch('/comfierui/themes', {method: 'POST', headers: {'Content-Type': 'application/json', 'X-Comfier-Theme-Store': '1'}, body: JSON.stringify(value)});
    if (!r.ok) throw Error((await r.text()) || 'HTTP ' + r.status);
    return (await r.json()).profile;
  }
  Storage.prototype.setItem = function(key, value) {
    if (this !== storage || key !== KEY) return nativeSet.call(this, key, value);
    if (failed) throw Error('Host theme save failed. Reload before making further changes.');
    const before = JSON.parse(storage.getItem(KEY) || '[]'), after = JSON.parse(value);
    nativeSet.call(this, key, value);
    message('Saving themes to host…');
    queue = queue.then(async () => {
      if (failed) return;
      const next = new Map(after.map(p => [p.id, p]));
      for (const old of before) if (!next.has(old.id)) {
        const expected = remote.get(old.id);
        await operation({id: expected.id, expected, delete: true});remote.delete(old.id);
      }
      for (const profile of after) {
        if (JSON.stringify(before.find(p => p.id === profile.id)) === JSON.stringify(profile)) continue;
        const expected = remote.get(profile.id) || null;
        const saved = await operation({id: expected?.id || profile.id, expected, profile});
        remote.set(profile.id, saved);
      }
      message('');
    }).catch(error => {failed = true;message('Theme save failed: ' + error.message + ' Your browser copy is retained. Reload to retry.');console.error(error);});
  };
  window.addEventListener('beforeunload', event => {
    if (!status.hidden) {event.preventDefault();event.returnValue = '';}
  });
  window.__comfierBrowserThemeStore = {flush: () => queue, get failed(){return failed}};
  window.__comfierBrowserThemesReady = () => {
    const studio = window.__comfierThemeStudio;
    // The host store is now the editable profile list; avoid a duplicate
    // read-only Companion list in this browser only.
    studio.setCompanionProvider({list: async () => []});
    const original = studio.showProfiles;
    studio.showProfiles = async (...args) => {
      await original(...args);
      const dialog = document.querySelector('.comfier-theme-profiles');
      if (!dialog) return;
      for (const heading of dialog.querySelectorAll('h3')) {
        if (heading.textContent === 'Device') heading.textContent = 'Host themes';
        else if (heading.textContent === 'Companion') {heading.nextElementSibling?.remove();heading.remove();}
      }
      const text = dialog.querySelector('.theme-profile-status');
      if (text) text.textContent = 'Saved in the Companion themes folder.';
    };
  };
}
