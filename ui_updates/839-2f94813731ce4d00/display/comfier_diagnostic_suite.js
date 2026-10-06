(function () {
  'use strict';
  if (window.__comfierDiagnosticSuiteInstalled) {
    if (window.__comfierDiagnosticSuite && typeof window.__comfierDiagnosticSuite.refreshSettingsToggles === 'function') window.__comfierDiagnosticSuite.refreshSettingsToggles();
    return;
  }
  window.__comfierDiagnosticSuiteInstalled = true;

  var state = {
    enabled: false,
    selected: null,
    previewChild: null,
    childHistory: [],
    pickMode: null,
    events: [],
    console: [],
    network: [],
    errors: [],
    mutations: 0,
    eventTrace: false,
    lastReport: '',
    reportKind: '',
    refreshReport: null,
    consoleInjection: false,
    scriptLoaded: false,
    editingScriptId: ''
  };
  var mutationObserver = null;

  function now() { return new Date().toISOString().slice(11, 23); }
  function safe(fn, fallback) { try { return fn(); } catch (_) { return fallback; } }
  function visible(el) {
    if (!el || el.nodeType !== 1) return false;
    var s = getComputedStyle(el), r = el.getBoundingClientRect();
    return s.display !== 'none' && s.visibility !== 'hidden' && Number(s.opacity || 1) > 0 && r.width > 0 && r.height > 0;
  }
  function name(el) {
    if (!el || el.nodeType !== 1) return '(none)';
    var out = el.tagName.toLowerCase();
    if (el.id) out += '#' + el.id;
    var cls = Array.from(el.classList || []).slice(0, 7);
    if (cls.length) out += '.' + cls.join('.');
    return out;
  }
  function path(el) {
    var out = [];
    while (el && el.nodeType === 1 && out.length < 14) {
      var part = name(el);
      if (!el.id && el.parentElement) {
        var same = Array.from(el.parentElement.children).filter(function (x) { return x.tagName === el.tagName; });
        if (same.length > 1) part += ':nth-of-type(' + (same.indexOf(el) + 1) + ')';
      }
      out.unshift(part);
      if (el.id) break;
      el = el.parentElement;
    }
    return out.join(' > ');
  }
  function own(el) { return !!(el && el.closest && el.closest('#comfier-diagnostics-root,#comfier-diagnostics-highlight')); }
  function rectLine(r) { return 'left=' + r.left.toFixed(1) + ' top=' + r.top.toFixed(1) + ' width=' + r.width.toFixed(1) + ' height=' + r.height.toFixed(1); }
  function clip(value, max) { value = String(value == null ? '' : value); return value.length > max ? value.slice(0, max) + '…' : value; }
  function section(title, body) { return '\n=== ' + title + ' ===\n' + body; }

  var style = document.createElement('style');
  style.id = 'comfier-diagnostics-style';
  style.textContent =
    '#comfier-diagnostics-root{--ds-bg:rgba(18,18,20,.98);--ds-card:#272a30;--ds-border:#596273;position:fixed;inset:0;z-index:var(--comfier-z-diagnostics,910);pointer-events:none;font-family:system-ui,sans-serif;color:#fff}' +
    '#comfier-diagnostics-launch{z-index:1;display:none;position:absolute;right:8px;top:38%;min-width:72px;min-height:46px;padding:8px 11px;border:2px solid var(--comfier-accent);border-radius:12px;background:#191919;color:#fff;font-weight:800;pointer-events:auto;touch-action:manipulation;box-shadow:0 3px 14px #000}' +
    '#comfier-diagnostics-root.enabled #comfier-diagnostics-launch{display:block}' +
    '#comfier-diagnostics-launch.armed{background:var(--comfier-accent);color:#111}' +
    '#comfier-diagnostics-menu,#comfier-diagnostics-report-panel{z-index:2;position:absolute;left:6px;right:6px;bottom:6px;display:none;max-height:74vh;padding:8px;border:1px solid #667085;border-radius:12px;background:var(--ds-bg);box-shadow:0 4px 18px #000;box-sizing:border-box;pointer-events:auto}' +
    '#comfier-diagnostics-menu.open{display:flex;flex-direction:column;gap:7px}' +
    '#comfier-diagnostics-report-panel.open{display:flex;flex-direction:column;gap:7px}' +
    '.comfier-diagnostics-title{font-weight:800;color:var(--comfier-accent)}' +
    '#comfier-diagnostics-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:6px;overflow:auto}' +
    '#comfier-diagnostics-grid button,#comfier-diagnostics-actions button,#comfier-diagnostics-disable{min-width:0;min-height:44px;padding:6px 3px;border:1px solid var(--ds-border);border-radius:8px;background:var(--ds-card);color:#fff;font-weight:700;touch-action:manipulation}' +
    '#comfier-diagnostics-grid button.active{border-color:var(--comfier-accent);color:var(--comfier-accent)}' +
    '#comfier-diagnostics-report{width:100%;height:42vh;min-height:120px;box-sizing:border-box;resize:none;overflow:auto;border:1px solid #555;border-radius:8px;padding:8px;background:#0b0b0c;color:#fff;font:11px/1.38 monospace;overscroll-behavior:contain;touch-action:pan-y}' +
    '#comfier-diagnostics-children{display:none;width:100%;height:23vh;min-height:80px;box-sizing:border-box;resize:none;overflow:auto;padding:8px;background:#0b0b0c;color:#fff;border:1px solid #555;border-radius:8px;font:11px/1.38 monospace;overscroll-behavior:contain;touch-action:pan-y}' +
    '#comfier-diagnostics-report-panel.element-mode #comfier-diagnostics-children{display:block}' +
    '#comfier-diagnostics-report-panel.element-mode #comfier-diagnostics-report{height:20vh;min-height:80px}' +
    '#comfier-diagnostics-report-panel.element-mode{overflow-y:auto}' +
    '#comfier-diagnostics-script{display:none;width:100%;height:22vh;min-height:110px;box-sizing:border-box;resize:vertical;overflow:auto;border:1px solid var(--comfier-accent);border-radius:8px;padding:8px;background:#111216;color:#fff;font:12px/1.4 monospace;overscroll-behavior:contain;touch-action:pan-y}' +
    '#comfier-diagnostics-report-panel.console-injection #comfier-diagnostics-script{display:block}' +
    '#comfier-diagnostics-report-panel.console-injection #comfier-diagnostics-report{height:20vh;min-height:90px}' +
    '#comfier-diagnostics-backups{display:none;flex:1;min-height:180px;overflow:auto;gap:6px}' +
    '#comfier-diagnostics-report-panel.backups-mode #comfier-diagnostics-report,#comfier-diagnostics-report-panel.backups-mode #comfier-diagnostics-script{display:none}' +
    '#comfier-diagnostics-report-panel.saves-mode #comfier-diagnostics-report,#comfier-diagnostics-report-panel.saves-mode #comfier-diagnostics-script{display:none}' +
    '#comfier-diagnostics-report-panel.backups-mode #comfier-diagnostics-backups,#comfier-diagnostics-report-panel.saves-mode #comfier-diagnostics-backups{display:flex;flex-direction:column}' +
    '.comfier-backup-row{display:grid;grid-template-columns:minmax(0,1fr) auto auto;align-items:center;gap:5px;padding:6px;border:1px solid #454b57;border-radius:8px;background:#15161a}' +
    '.comfier-save-row{display:grid;grid-template-columns:minmax(0,1fr) repeat(4,auto);align-items:center;gap:5px;padding:6px;border:1px solid #454b57;border-radius:8px;background:#15161a}' +
    '.comfier-save-order{color:var(--comfier-accent);font-weight:800}' +
    '.comfier-backup-label{min-width:0;font:11px/1.3 monospace;overflow-wrap:anywhere}' +
    '.comfier-backup-row button,.comfier-save-row button{min-height:38px;padding:5px 8px;border:1px solid var(--ds-border);border-radius:7px;background:var(--ds-card);color:#fff;font-weight:700}' +
    '#comfier-diagnostics-actions{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:5px}' +
    '#comfier-diagnostics-actions button[hidden]{display:none}' +
    '#comfier-diagnostics-disable{width:100%;border-color:var(--comfier-accent);color:var(--comfier-accent)}' +
    '#comfier-ui-zoom-test .ui-diagnostics-row{grid-column:1/4}' +
    '.ui-diagnostics-row{display:flex;align-items:center;gap:8px;min-height:30px;cursor:pointer;touch-action:manipulation}' +
    '.ui-diagnostics-toggle{width:22px!important;height:22px!important;min-width:22px;accent-color:var(--comfier-accent);touch-action:manipulation}' +
    '.ui-diagnostics-state{margin-left:auto;font-size:12px;font-weight:400;opacity:.78}' +
    '#comfier-diagnostics-highlight{position:fixed;z-index:var(--comfier-z-diagnostic-highlight,900);pointer-events:none;border:3px solid #ff3b30;background:rgba(255,59,48,.12);box-sizing:border-box}' +
    '#comfier-diagnostics-root.outer-landscape #comfier-diagnostics-menu,#comfier-diagnostics-root.outer-landscape #comfier-diagnostics-report-panel{top:4px;bottom:4px;max-height:none;overflow-y:auto;overscroll-behavior:contain;touch-action:pan-y}' +
    '#comfier-diagnostics-root.outer-landscape #comfier-diagnostics-grid{overflow:visible}' +
    '@media(max-width:520px){#comfier-diagnostics-grid{grid-template-columns:repeat(2,minmax(0,1fr))}#comfier-diagnostics-actions{grid-template-columns:repeat(2,minmax(0,1fr))}.comfier-save-row{grid-template-columns:minmax(0,1fr) repeat(2,auto)}.comfier-save-row .comfier-backup-label{grid-column:1/-1}}';
  document.head.appendChild(style);

  var root = document.createElement('div');
  root.id = 'comfier-diagnostics-root';
  root.innerHTML =
    "<button id='comfier-diagnostics-launch'>Diag</button>" +
    "<section id='comfier-diagnostics-menu'><div class='comfier-diagnostics-title'>Diagnostic Suite</div><div id='comfier-diagnostics-grid'>" +
    "<button data-tool='element'>Element</button><button data-tool='hit'>Hit Stack</button><button data-tool='events'>Event Trace</button>" +
    "<button data-tool='viewport'>Viewport</button><button data-tool='canvas'>Canvas</button><button data-tool='overlays'>Overlays</button>" +
    "<button data-tool='performance'>Performance</button><button data-tool='console'>Console</button><button data-tool='network'>Network</button>" +
    "<button data-tool='storage'>Storage</button><button data-tool='state'>App State</button><button data-tool='all'>Export All</button>" +
    "</div><button id='comfier-diagnostics-disable' data-tool='disable'>Close Diagnostic Mode</button></section>" +
    "<section id='comfier-diagnostics-report-panel'><div id='comfier-diagnostics-report-title' class='comfier-diagnostics-title'>Report</div><textarea id='comfier-diagnostics-script' spellcheck='false' autocapitalize='off' autocomplete='off' placeholder='Enter JavaScript. Use return to display a value; await is supported.'></textarea><textarea id='comfier-diagnostics-report' readonly></textarea><textarea id='comfier-diagnostics-children' aria-label='Direct children and highlighted child details' readonly></textarea><div id='comfier-diagnostics-backups'></div><div id='comfier-diagnostics-actions'>" +
    "<button data-act='parent'>Parent</button><button data-act='child'>Return Child</button><button data-act='prev-child'>Prev Child</button><button data-act='next-child'>Next Child</button><button data-act='select-child'>Select Child</button><button data-act='copy-child'>Copy Child</button><button data-act='pick'>Pick</button><button data-act='refresh'>Refresh</button><button data-act='mode'>Inject</button><button data-act='inject-return'>Inject</button><button data-act='run'>Run</button><button data-act='save'>Save</button><button data-act='backups'>Backups</button><button data-act='clear-script'>Clear Script</button><button data-act='clear-console'>Clear Console</button><button data-act='copy-script'>Copy Script</button><button data-act='copy'>Copy Console</button><button data-act='menu'>Menu</button><button data-act='close'>Close</button>" +
    "</div></section>";
  document.body.appendChild(root);
  var highlight = document.createElement('div');
  highlight.id = 'comfier-diagnostics-highlight';
  highlight.hidden = true;
  document.body.appendChild(highlight);

  var launch = root.querySelector('#comfier-diagnostics-launch');
  var menu = root.querySelector('#comfier-diagnostics-menu');
  var panel = root.querySelector('#comfier-diagnostics-report-panel');
  var scriptEditor = root.querySelector('#comfier-diagnostics-script');
  var backupsPanel = root.querySelector('#comfier-diagnostics-backups');
  var report = root.querySelector('#comfier-diagnostics-report');
  var childReport = root.querySelector('#comfier-diagnostics-children');
  var reportTitle = root.querySelector('#comfier-diagnostics-report-title');
  var actionButtons = Array.from(root.querySelectorAll('#comfier-diagnostics-actions [data-act]'));

  function syncViewportMode() { root.classList.toggle('outer-landscape', innerWidth > innerHeight && Math.min(screen.width, screen.height) <= 520); }
  syncViewportMode();

  function showMenu() { if (!state.enabled) return; state.pickMode = null; launch.classList.remove('armed'); launch.textContent = 'Diag'; highlight.hidden = true; panel.classList.remove('open'); menu.classList.add('open'); }
  function closeAll() { state.pickMode = null; launch.classList.remove('armed'); launch.textContent = 'Diag'; highlight.hidden = true; panel.classList.remove('open'); menu.classList.remove('open'); }
  function updateActions(kind) {
    panel.classList.toggle('element-mode', kind === 'element');
    if (kind !== 'element') { state.previewChild = null; highlight.hidden = true; }
    var allowed = kind === 'element' ? ['parent','child','prev-child','next-child','select-child','copy-child','pick','refresh','copy','menu','close'] :
      kind === 'hit' ? ['pick','copy','menu','close'] :
      kind === 'console' && state.consoleInjection ? ['mode','run','save','backups','clear-script','clear-console','copy-script','copy','menu','close'] :
      kind === 'backups' ? ['mode','menu','close'] :
      kind === 'saves' ? ['mode','inject-return','menu','close'] :
      kind === 'console' ? ['mode','refresh','clear-console','copy','menu','close'] : ['refresh','copy','menu','close'];
    actionButtons.forEach(function (button) { button.hidden = allowed.indexOf(button.dataset.act) < 0; });
    var modeButton = root.querySelector('[data-act="mode"]'); if (modeButton) modeButton.textContent = state.consoleInjection ? 'Saves' : 'Inject';
    if ((kind === 'backups' || kind === 'saves') && modeButton) modeButton.textContent = 'Editor';
    var runButton = root.querySelector('[data-act="run"]'); if (runButton) runButton.textContent = 'Paste / Run';
    var clearConsoleButton = root.querySelector('[data-act="clear-console"]'); if (clearConsoleButton) clearConsoleButton.textContent = 'Clear Console';
    var copyButton = root.querySelector('[data-act="copy"]'); if (copyButton) copyButton.textContent = kind === 'console' ? 'Copy Console' : 'Copy';
  }
  function setConsoleInjection(enabled) {
    state.consoleInjection = !!enabled;
    panel.classList.remove('backups-mode','saves-mode');
    panel.classList.toggle('console-injection', state.consoleInjection);
    if (state.consoleInjection && !state.scriptLoaded) {
      state.scriptLoaded = true;
      scriptEditor.value = safe(function () { return window.ComfierDiagnosticScripts.getActiveScript(); }, '') || '';
    }
    updateActions(state.reportKind);
    if (state.reportKind === 'console') { state.lastReport = consoleReport(); report.value = state.lastReport; }
  }

  function bridgeResult(raw) {
    return safe(function () { return JSON.parse(raw); }, { ok:false, message:'Storage bridge unavailable' });
  }
  function savePersistentScript(button) {
    var code = scriptEditor.value;
    if (!code.trim()) { scriptEditor.focus(); return; }
    var suggested = state.editingScriptId ? state.editingScriptId.replace(/\.js$/i,'') : 'script-' + new Date().toISOString().replace(/[:.]/g,'-');
    var filename = window.prompt('Saved script filename', suggested); if (filename == null) return;
    button.disabled = true;
    var result = bridgeResult(safe(function () { return window.ComfierDiagnosticScripts.saveNamedScript(filename, code); }, ''));
    button.textContent = result.ok ? 'Saved' : 'Failed';
    if (result.ok) state.editingScriptId = String(filename).replace(/\.js$/i,'').replace(/[^A-Za-z0-9._-]+/g,'-').replace(/^-+|-+$/g,'') + '.js';
    (result.ok ? state.console : state.errors).push(now() + ' PERSIST ' + result.message);
    state.lastReport = consoleReport(); report.value = state.lastReport; report.scrollTop = report.scrollHeight;
    setTimeout(function () { button.disabled = false; button.textContent = 'Save'; }, 1200);
  }
  function showSaves() {
    var items = safe(function () { return JSON.parse(window.ComfierDiagnosticScripts.listScripts()); }, []);
    backupsPanel.replaceChildren();
    if (!items.length) { var empty=document.createElement('div');empty.textContent='No saved scripts yet. Save from the editor to add one to launch order.';empty.className='comfier-backup-label';backupsPanel.appendChild(empty); }
    items.forEach(function(item,index){
      var row=document.createElement('div');row.className='comfier-save-row';row.dataset.scriptId=item.id;
      var label=document.createElement('div');label.className='comfier-backup-label';label.innerHTML='<span class="comfier-save-order">'+(index+1)+'.</span> '+item.id+'<br>'+new Date(Number(item.created)||0).toLocaleString()+' · '+item.size+' bytes';
      var up=document.createElement('button');up.dataset.scriptAct='up';up.textContent='↑';up.disabled=index===0;
      var down=document.createElement('button');down.dataset.scriptAct='down';down.textContent='↓';down.disabled=index===items.length-1;
      var edit=document.createElement('button');edit.dataset.scriptAct='edit';edit.textContent='Edit';
      var remove=document.createElement('button');remove.dataset.scriptAct='delete';remove.textContent='Delete';
      row.append(label,up,down,edit,remove);backupsPanel.appendChild(row);
    });
    state.reportKind='saves';state.consoleInjection=false;reportTitle.textContent='Saved Scripts · Launch Order';
    panel.classList.remove('console-injection','backups-mode');panel.classList.add('saves-mode');updateActions('saves');
  }
  function handleScriptAction(button) {
    var row=button.closest('[data-script-id]');if(!row)return;var id=row.dataset.scriptId,action=button.dataset.scriptAct;
    if(action==='edit') { state.scriptLoaded=true;state.editingScriptId=id;scriptEditor.value=safe(function(){return window.ComfierDiagnosticScripts.getScript(id);},'')||'';state.reportKind='console';setConsoleInjection(true);reportTitle.textContent='Console / Errors · '+id;return; }
    if(action==='delete'&&!window.confirm('Delete '+id+'?'))return;
    var raw=action==='delete'?window.ComfierDiagnosticScripts.deleteScript(id):window.ComfierDiagnosticScripts.moveScript(id,action==='up'?-1:1),result=bridgeResult(raw);
    (result.ok?state.console:state.errors).push(now()+' SAVES '+result.message);button.textContent=result.ok?'Done':'Failed';setTimeout(showSaves,450);
  }
  function showBackups() {
    var items = safe(function () { return JSON.parse(window.ComfierDiagnosticScripts.listBackups()); }, []);
    backupsPanel.replaceChildren();
    if (!items.length) {
      var empty = document.createElement('div'); empty.textContent = 'No backups yet. Saving creates one automatically.'; empty.className = 'comfier-backup-label'; backupsPanel.appendChild(empty);
    }
    items.forEach(function (item) {
      var row = document.createElement('div'); row.className = 'comfier-backup-row'; row.dataset.backupId = item.id;
      var label = document.createElement('div'); label.className = 'comfier-backup-label'; label.textContent = item.label + ' · ' + item.size + ' bytes';
      var restore = document.createElement('button'); restore.dataset.backupAct = 'restore'; restore.textContent = 'Restore';
      var remove = document.createElement('button'); remove.dataset.backupAct = 'delete'; remove.textContent = 'Delete';
      row.appendChild(label); row.appendChild(restore); row.appendChild(remove); backupsPanel.appendChild(row);
    });
    state.reportKind = 'backups'; state.consoleInjection = false;
    reportTitle.textContent = 'Persistent Injection Backups';
    panel.classList.remove('console-injection','saves-mode'); panel.classList.add('backups-mode');
    updateActions('backups');
  }
  function handleBackupAction(button) {
    var row = button.closest('[data-backup-id]'); if (!row) return;
    var id = row.dataset.backupId, action = button.dataset.backupAct;
    if (action === 'delete' && !window.confirm('Delete this injection backup?')) return;
    var raw = action === 'restore' ? window.ComfierDiagnosticScripts.restoreBackup(id) : window.ComfierDiagnosticScripts.deleteBackup(id);
    var result = bridgeResult(raw);
    if (result.ok && action === 'restore') {
      state.scriptLoaded = true; scriptEditor.value = safe(function () { return window.ComfierDiagnosticScripts.getActiveScript(); }, '') || '';
    }
    (result.ok ? state.console : state.errors).push(now() + ' BACKUP ' + result.message);
    button.textContent = result.ok ? (action === 'restore' ? 'Restored' : 'Deleted') : 'Failed';
    if (result.ok && action === 'restore') setTimeout(function () { location.reload(); }, 700);
    else setTimeout(showBackups, 700);
  }
  function showReport(title, text, kind, refreshReport) {
    state.lastReport = text; state.reportKind = kind || 'report'; state.refreshReport = refreshReport || null;
    panel.classList.remove('backups-mode','saves-mode');
    if (state.reportKind !== 'console') panel.classList.remove('console-injection');
    reportTitle.textContent = title; report.value = text; updateActions(state.reportKind);
    menu.classList.remove('open'); panel.classList.add('open');
    if (state.reportKind === 'element') refreshChildren(0);
  }
  function setEnabled(enabled) {
    state.enabled = !!enabled;
    root.classList.toggle('enabled', state.enabled);
    document.querySelectorAll('.ui-diagnostics-toggle').forEach(function (toggle) { toggle.checked = state.enabled; });
    document.querySelectorAll('.ui-diagnostics-state').forEach(function (label) { label.textContent = state.enabled ? 'On' : 'Off'; });
    if (state.enabled) {
      if (!mutationObserver) {
        mutationObserver = new MutationObserver(function (records) { if (state.enabled) state.mutations += records.length; });
        mutationObserver.observe(document.documentElement, { childList: true, subtree: true, attributes: true });
      }
    } else {
      state.eventTrace = false; closeAll();
      setConsoleInjection(false); scriptEditor.value = ''; state.scriptLoaded = false;
      if (mutationObserver) { mutationObserver.disconnect(); mutationObserver = null; }
      state.selected = null; state.previewChild = null; state.childHistory = []; state.events = []; state.console = []; state.network = []; state.errors = []; state.mutations = 0;
      root.querySelectorAll('[data-tool].active').forEach(function (button) { button.classList.remove('active'); });
    }
    return state.enabled;
  }
  function bindSettingsToggle(settingsRoot) {
    if (!settingsRoot) return false;
    var settingsPanel = settingsRoot.querySelector('.ui-zoom-panel');
    if (!settingsPanel) return false;
    var row = settingsPanel.querySelector('.ui-diagnostics-row');
    if (!row) {
      row = document.createElement('label'); row.className = 'ui-diagnostics-row';
      var toggle = document.createElement('input'); toggle.type = 'checkbox'; toggle.className = 'ui-diagnostics-toggle'; toggle.setAttribute('aria-label','Diagnostic Mode');
      var label = document.createElement('span'); label.textContent = 'Diagnostic Mode';
      var status = document.createElement('span'); status.className = 'ui-diagnostics-state';
      row.appendChild(toggle); row.appendChild(label); row.appendChild(status);
      var disconnect = settingsPanel.querySelector('.ui-disconnect'), refresh = settingsPanel.querySelector('.ui-hard-refresh');
      settingsPanel.insertBefore(row, disconnect || refresh || null);
      toggle.addEventListener('change', function () { setEnabled(toggle.checked); });
    }
    var currentToggle = row.querySelector('.ui-diagnostics-toggle'), currentStatus = row.querySelector('.ui-diagnostics-state');
    if (currentToggle) currentToggle.checked = state.enabled;
    if (currentStatus) currentStatus.textContent = state.enabled ? 'On' : 'Off';
    return true;
  }
  function refreshSettingsToggles(attempt) {
    var shared = bindSettingsToggle(document.getElementById('comfier-ui-zoom-test'));

  }
  window.__comfierSettingsRows.register('diagnostics',refreshSettingsToggles);
  refreshSettingsToggles(0);
  function directChildren() {
    return state.selected?.isConnected ? Array.from(state.selected.children || []).filter(function(el){return !own(el);}) : [];
  }
  function refreshChildren(step) {
    var kids = directChildren(), index = kids.indexOf(state.previewChild);
    if (index < 0) index = step < 0 ? kids.length - 1 : 0;
    else if (step) index = Math.max(0, Math.min(kids.length - 1, index + step));
    state.previewChild = kids[index] || null;
    var lines = ['PARENT (unchanged): ' + name(state.selected), 'DIRECT CHILDREN: ' + kids.length];
    kids.forEach(function(el,i){var cs=getComputedStyle(el),r=el.getBoundingClientRect();lines.push((i===index?'▶ ':'  ')+(i+1)+': '+name(el)+' | '+r.width.toFixed(1)+' × '+r.height.toFixed(1)+' | display='+cs.display);});
    if (state.previewChild) lines.push('\nHIGHLIGHTED CHILD '+(index+1)+' / '+kids.length+'\n'+elementReport(state.previewChild)+'\nHTML:\n'+clip(state.previewChild.outerHTML,8000));
    else lines.push(state.selected?.isConnected ? '(no direct element children)' : '(parent detached; pick a live element)');
    childReport.value = lines.join('\n');
    ['prev-child','next-child','select-child','copy-child'].forEach(function(action){
      var button=root.querySelector('[data-act="'+action+'"]');
      if(button)button.disabled=!kids.length||(action==='prev-child'&&index===0)||(action==='next-child'&&index===kids.length-1);
    });
    positionHighlight();
  }
  function positionHighlight() {
    if(state.previewChild && state.previewChild.parentElement !== state.selected){highlight.hidden=true;return;}
    var el = state.previewChild || state.selected;
    if (!state.enabled || state.reportKind !== 'element' || !panel.classList.contains('open') || !el?.isConnected) { highlight.hidden = true; return; }
    var cs=getComputedStyle(el),r=el.getBoundingClientRect();
    if(cs.display==='none'||cs.visibility==='hidden'||(!r.width&&!r.height)){highlight.hidden=true;return;}
    // A zero-width flex child still needs a visible marker at its actual edge.
    highlight.hidden = false; highlight.style.left = r.left + 'px'; highlight.style.top = r.top + 'px'; highlight.style.width = Math.max(3,r.width) + 'px'; highlight.style.height = Math.max(3,r.height) + 'px';
  }

  function elementReport(el) {
    if (!el) return 'No element selected.';
    var cs = getComputedStyle(el), r = el.getBoundingClientRect(), lines = [];
    lines.push('ELEMENT: ' + name(el)); lines.push('PATH: ' + path(el)); lines.push('RECT: ' + rectLine(r));
    lines.push('OFFSET: ' + el.offsetWidth + ' x ' + el.offsetHeight + ' | CLIENT: ' + el.clientWidth + ' x ' + el.clientHeight);
    lines.push('DISPLAY: ' + cs.display + ' | POSITION: ' + cs.position + ' | BOX: ' + cs.boxSizing);
    lines.push('PADDING: ' + [cs.paddingTop, cs.paddingRight, cs.paddingBottom, cs.paddingLeft].join(' '));
    lines.push('MARGIN: ' + [cs.marginTop, cs.marginRight, cs.marginBottom, cs.marginLeft].join(' '));
    lines.push('BORDER: ' + [cs.borderTopWidth, cs.borderRightWidth, cs.borderBottomWidth, cs.borderLeftWidth].join(' '));
    lines.push('WIDTH: ' + cs.width + ' | MIN/MAX: ' + cs.minWidth + ' / ' + cs.maxWidth);
    lines.push('HEIGHT: ' + cs.height + ' | MIN/MAX: ' + cs.minHeight + ' / ' + cs.maxHeight);
    lines.push('GAP: ' + cs.gap + ' | ROW/COLUMN: ' + cs.rowGap + ' / ' + cs.columnGap);
    lines.push('OVERFLOW: ' + cs.overflow + ' | X/Y: ' + cs.overflowX + ' / ' + cs.overflowY);
    lines.push('Z-INDEX: ' + cs.zIndex + ' | TRANSFORM: ' + cs.transform);
    lines.push('POINTER-EVENTS: ' + cs.pointerEvents + ' | TOUCH-ACTION: ' + cs.touchAction);
    lines.push('SCROLL: ' + el.scrollLeft + ',' + el.scrollTop + ' of ' + el.scrollWidth + 'x' + el.scrollHeight);
    lines.push('ATTRS: ' + Array.from(el.attributes || []).slice(0, 20).map(function (a) { return a.name + '=' + JSON.stringify(clip(a.value, 100)); }).join(' '));
    lines.push('\nPARENTS:'); var p = el.parentElement, i = 1; while (p && i <= 10) { lines.push(i + ': ' + name(p)); p = p.parentElement; i++; }
    lines.push('\nDIRECT CHILDREN:'); var kids = Array.from(el.children || []).slice(0, 16); lines.push(kids.length ? kids.map(function (k, n) { return (n + 1) + ': ' + name(k); }).join('\n') : '(none)');
    return lines.join('\n');
  }

  function viewportReport() {
    var vv = window.visualViewport, so = screen.orientation || {}, lines = [];
    lines.push('TIME: ' + new Date().toISOString());
    lines.push('INNER: ' + innerWidth + ' x ' + innerHeight + ' | OUTER: ' + outerWidth + ' x ' + outerHeight);
    lines.push('SCREEN: ' + screen.width + ' x ' + screen.height + ' | AVAILABLE: ' + screen.availWidth + ' x ' + screen.availHeight);
    lines.push('DPR: ' + devicePixelRatio + ' | ORIENTATION: ' + (so.type || window.orientation || 'unknown') + ' ' + (so.angle == null ? '' : so.angle));
    lines.push('VISUAL VIEWPORT: ' + (vv ? [vv.width.toFixed(1) + ' x ' + vv.height.toFixed(1), 'offset=' + vv.offsetLeft.toFixed(1) + ',' + vv.offsetTop.toFixed(1), 'page=' + vv.pageLeft.toFixed(1) + ',' + vv.pageTop.toFixed(1), 'scale=' + vv.scale].join(' | ') : 'unavailable'));
    lines.push('DOCUMENT: client=' + document.documentElement.clientWidth + 'x' + document.documentElement.clientHeight + ' scroll=' + document.documentElement.scrollWidth + 'x' + document.documentElement.scrollHeight);
    lines.push('WINDOW SCROLL: ' + scrollX + ',' + scrollY + ' | ACTIVE: ' + name(document.activeElement));
    lines.push('MEDIA: portrait=' + matchMedia('(orientation:portrait)').matches + ' coarse=' + matchMedia('(pointer:coarse)').matches + ' hover=' + matchMedia('(hover:hover)').matches);
    lines.push('USER AGENT: ' + navigator.userAgent);
    return lines.join('\n');
  }

  function canvasReport() {
    var items = Array.from(document.querySelectorAll('canvas'));
    var lines = ['CANVASES: ' + items.length];
    items.forEach(function (c, i) { var r = c.getBoundingClientRect(), cs = getComputedStyle(c); lines.push('\n' + (i + 1) + '. ' + name(c)); lines.push('  rect=' + rectLine(r)); lines.push('  bitmap=' + c.width + 'x' + c.height + ' ratio=' + (r.width ? (c.width / r.width).toFixed(2) : 'n/a')); lines.push('  transform=' + cs.transform + ' pointer=' + cs.pointerEvents + ' touch=' + cs.touchAction); });
    var app = window.app, gc = app && app.canvas;
    lines.push('\nAPP CANVAS: ' + (gc ? 'present' : 'not found'));
    if (gc) { lines.push('scale=' + safe(function () { return gc.ds.scale; }, 'n/a') + ' offset=' + safe(function () { return JSON.stringify(gc.ds.offset); }, 'n/a')); lines.push('selected_nodes=' + safe(function () { return Object.keys(gc.selected_nodes || {}).length; }, 'n/a') + ' graph_nodes=' + safe(function () { return app.graph._nodes.length; }, 'n/a')); lines.push('dirty=' + safe(function () { return gc.dirty_canvas + '/' + gc.dirty_bgcanvas; }, 'n/a')); }
    return lines.join('\n');
  }

  function overlaysReport() {
    var all = Array.from(document.querySelectorAll('body *')).filter(function (el) { if (own(el) || !visible(el)) return false; var s = getComputedStyle(el); return s.position === 'fixed' || s.position === 'sticky' || el.matches('[role=dialog],[aria-modal=true],.modal,.p-dialog,.p-popover,.p-menu'); });
    all.sort(function (a, b) { return window.__comfierLayers?.compare(b,a)||0; });
    var lines = ['VISIBLE OVERLAYS/FIXED ELEMENTS: ' + all.length];
    all.slice(0, 60).forEach(function (el, i) { var s = getComputedStyle(el), r = el.getBoundingClientRect(); lines.push((i + 1) + '. z=' + s.zIndex + ' contexts=' + (window.__comfierLayers?.context(el).map(name).join(' > ')||'(document)') + ' pos=' + s.position + ' ' + name(el) + ' [' + rectLine(r) + ']'); });
    return lines.join('\n');
  }

  function performanceReport() {
    var res = performance.getEntriesByType ? performance.getEntriesByType('resource') : [], nav = performance.getEntriesByType ? performance.getEntriesByType('navigation')[0] : null, mem = performance.memory;
    var lines = ['DOM ELEMENTS: ' + document.getElementsByTagName('*').length, 'MUTATIONS SINCE INSTALL: ' + state.mutations, 'RESOURCE ENTRIES: ' + res.length];
    if (nav) lines.push('NAVIGATION: domInteractive=' + nav.domInteractive.toFixed(1) + 'ms load=' + nav.loadEventEnd.toFixed(1) + 'ms transfer=' + nav.transferSize);
    if (mem) lines.push('JS HEAP: used=' + mem.usedJSHeapSize + ' total=' + mem.totalJSHeapSize + ' limit=' + mem.jsHeapSizeLimit);
    if(window.__comfierRuntime)lines.push('UI RUNTIME: '+safe(function(){return JSON.stringify(window.__comfierRuntime.snapshot());},'unavailable'));
    lines.push('LONGEST RESOURCES:'); res.slice().sort(function (a, b) { return b.duration - a.duration; }).slice(0, 15).forEach(function (x) { lines.push(x.duration.toFixed(1) + 'ms ' + clip(x.name, 160)); });
    return lines.join('\n');
  }

  function storageReport() {
    function keys(store) { var out = []; for (var i = 0; i < store.length; i++) out.push(store.key(i)); return out; }
    var lines = ['ORIGIN: ' + location.origin, 'LOCAL STORAGE (' + safe(function () { return localStorage.length; }, 0) + '): ' + safe(function () { return keys(localStorage).join(', '); }, 'unavailable'), 'SESSION STORAGE (' + safe(function () { return sessionStorage.length; }, 0) + '): ' + safe(function () { return keys(sessionStorage).join(', '); }, 'unavailable'), 'COOKIES: ' + (document.cookie ? document.cookie.split(';').map(function (x) { return x.split('=')[0].trim(); }).join(', ') : '(none/hidden)')];
    if (indexedDB && indexedDB.databases) lines.push('INDEXED DB: async inventory unavailable in instant report');
    return lines.join('\n');
  }

  function appStateReport() {
    var app = window.app, graph = app && app.graph, active = document.activeElement, sel = window.getSelection && window.getSelection();
    var lines = ['URL: ' + location.href, 'TITLE: ' + document.title, 'READY: ' + document.readyState, 'FOCUS: ' + document.hasFocus(), 'ACTIVE: ' + name(active), 'ACTIVE PATH: ' + path(active)];
    lines.push('SELECTION: ' + (sel ? clip(sel.toString(), 250) : '(none)'));
    lines.push('APP: ' + (app ? 'present' : 'missing') + ' | GRAPH: ' + (graph ? 'present' : 'missing'));
    if (graph) { lines.push('NODES: ' + safe(function () { return graph._nodes.length; }, 'n/a') + ' | LINKS: ' + safe(function () { return Object.keys(graph.links || {}).length; }, 'n/a')); lines.push('CHANGED: ' + safe(function () { return graph._version; }, 'n/a')); }
    lines.push('OPEN DIALOGS: ' + Array.from(document.querySelectorAll('[role=dialog],.p-dialog,.comfy-modal')).filter(visible).map(name).join(', '));
    lines.push('BODY CLASSES: ' + document.body.className);
    return lines.join('\n');
  }

  function logReport(label, list) { return label + ': ' + list.length + '\n' + (list.length ? list.slice(-120).join('\n') : '(none captured since suite installation)'); }
  function consoleReport() { return logReport('CONSOLE', state.console) + section('ERRORS', state.errors.join('\n') || '(none)'); }
  function formatInjectedValue(value) {
    if (value === undefined) return 'undefined'; if (value === null) return 'null'; if (typeof value === 'string') return value;
    return safe(function () { var json=JSON.stringify(value,null,2); return json===undefined?String(value):json; }, String(value));
  }
  function executeInjectedScript(button) {
    var code = scriptEditor.value;
    if (!code.trim()) {
      code = safe(function(){return window.ComfierDiagnosticScripts.getClipboardText();},'') || '';
      if (!code.trim()) { scriptEditor.focus(); button.textContent='Clipboard Empty'; setTimeout(function(){button.textContent='Paste / Run';},1000); return; }
      scriptEditor.value = code; state.editingScriptId = '';
    }
    button.disabled = true; button.textContent = 'Running';
    var AsyncFunction = Object.getPrototypeOf(async function () {}).constructor, started = performance.now();
    Promise.resolve().then(function () { return new AsyncFunction(code).call(window); }).then(function (value) {
      state.console.push(now() + ' [inject result ' + (performance.now()-started).toFixed(0) + 'ms] ' + clip(formatInjectedValue(value), 4000));
    }, function (error) {
      state.errors.push(now() + ' INJECT ' + clip(error && (error.stack || error.message) || error, 4000));
    }).then(function () {
      if (state.console.length > 300) state.console.splice(0,state.console.length-300); if (state.errors.length > 200) state.errors.splice(0,state.errors.length-200);
      state.lastReport = consoleReport(); report.value = state.lastReport; report.scrollTop = report.scrollHeight;
      button.disabled = false; button.textContent = 'Paste / Run';
    });
  }
  function allReport() { return 'COMFIERUI DIAGNOSTIC EXPORT\n' + viewportReport() + section('APP STATE', appStateReport()) + section('SELECTED ELEMENT', elementReport(state.selected)) + section('CANVAS', canvasReport()) + section('OVERLAYS', overlaysReport()) + section('PERFORMANCE', performanceReport()) + section('STORAGE', storageReport()) + section('INPUT EVENTS', logReport('EVENTS', state.events)) + section('CONSOLE', logReport('CONSOLE', state.console)) + section('ERRORS', logReport('ERRORS', state.errors)) + section('NETWORK', logReport('NETWORK', state.network)); }

  function arm(mode) { if (!state.enabled) return; state.pickMode = mode; launch.classList.add('armed'); launch.textContent = mode === 'hit' ? 'Tap point' : 'Tap target'; menu.classList.remove('open'); panel.classList.remove('open'); highlight.hidden = true; }
  function choose(el, push) { if (!el || own(el)) return; if (push && state.selected) state.childHistory.push(state.selected); state.selected = el; state.previewChild = null; showReport('Element: ' + name(el), elementReport(el), 'element', function () { return elementReport(state.selected); }); }

  launch.addEventListener('click', function (e) { if (!state.enabled) return; e.preventDefault(); e.stopPropagation(); if (menu.classList.contains('open') || panel.classList.contains('open')) closeAll(); else showMenu(); });
  root.addEventListener('click', function (e) {
    if (!state.enabled) return;
    var tool = e.target.closest('[data-tool]');
    if (tool) {
      var t = tool.dataset.tool;
      if (t === 'element' || t === 'hit') arm(t);
      else if (t === 'events') { state.eventTrace = !state.eventTrace; tool.classList.toggle('active', state.eventTrace); showReport('Event Trace ' + (state.eventTrace ? 'ON' : 'OFF'), logReport('EVENTS', state.events), 'events', function () { return logReport('EVENTS', state.events); }); }
      else if (t === 'viewport') showReport('Viewport / Keyboard', viewportReport(), 'viewport', viewportReport);
      else if (t === 'canvas') showReport('Canvas Inventory', canvasReport(), 'canvas', canvasReport);
      else if (t === 'overlays') showReport('Overlay Inventory', overlaysReport(), 'overlays', overlaysReport);
      else if (t === 'performance') showReport('Performance / DOM', performanceReport(), 'performance', performanceReport);
      else if (t === 'console') { setConsoleInjection(false); showReport('Console / Errors', consoleReport(), 'console', consoleReport); }
      else if (t === 'network') { var networkReport = function () { return logReport('NETWORK', state.network); }; showReport('Network Activity', networkReport(), 'network', networkReport); }
      else if (t === 'storage') showReport('Storage Inventory', storageReport(), 'storage', storageReport);
      else if (t === 'state') showReport('Application State', appStateReport(), 'state', appStateReport);
      else if (t === 'all') showReport('Full Diagnostic Export', allReport(), 'all', allReport);
      else if (t === 'disable') setEnabled(false);
      e.preventDefault(); e.stopPropagation(); return;
    }
    var act = e.target.closest('[data-act]');
    var backupAct = e.target.closest('[data-backup-act]');
    var scriptAct = e.target.closest('[data-script-act]');
    if (scriptAct) { handleScriptAction(scriptAct); e.preventDefault(); e.stopPropagation(); return; }
    if (backupAct) { handleBackupAction(backupAct); e.preventDefault(); e.stopPropagation(); return; }
    if (!act) return;
    var a = act.dataset.act;
    if (a === 'parent' && state.selected && state.selected.parentElement) choose(state.selected.parentElement, true);
    else if (a === 'child' && state.childHistory.length) choose(state.childHistory.pop(), false);
    else if (a === 'prev-child' || a === 'next-child') refreshChildren(a === 'prev-child' ? -1 : 1);
    else if (a === 'select-child') { if (state.previewChild?.parentElement === state.selected) { state.childHistory = []; choose(state.previewChild, false); } else refreshChildren(0); }
    else if (a === 'copy-child') { childReport.focus(); childReport.select(); safe(function(){return document.execCommand('copy');},false); }
    else if (a === 'pick') arm(state.reportKind === 'hit' ? 'hit' : 'element');
    else if (a === 'refresh' && state.refreshReport) showReport(reportTitle.textContent, state.refreshReport(), state.reportKind, state.refreshReport);
    else if (a === 'mode' && (state.reportKind === 'backups' || state.reportKind === 'saves')) { state.reportKind = 'console'; setConsoleInjection(true); reportTitle.textContent = 'Console / Errors' + (state.editingScriptId ? ' · '+state.editingScriptId : ''); }
    else if (a === 'inject-return' && state.reportKind === 'saves') { state.reportKind='console';setConsoleInjection(true);reportTitle.textContent='Console / Errors'; }
    else if (a === 'mode' && state.reportKind === 'console' && state.consoleInjection) showSaves();
    else if (a === 'mode' && state.reportKind === 'console') setConsoleInjection(true);
    else if (a === 'run' && state.reportKind === 'console' && state.consoleInjection) executeInjectedScript(act);
    else if (a === 'save' && state.reportKind === 'console' && state.consoleInjection) savePersistentScript(act);
    else if (a === 'backups' && state.reportKind === 'console' && state.consoleInjection) showBackups();
    else if (a === 'clear-script' && state.reportKind === 'console') { scriptEditor.value = ''; state.editingScriptId=''; scriptEditor.focus(); }
    else if (a === 'clear-console' && state.reportKind === 'console') { state.console = []; state.errors = []; state.lastReport = consoleReport(); report.value = state.lastReport; report.scrollTop = 0; }
    else if (a === 'copy-script' && state.reportKind === 'console' && state.consoleInjection) { scriptEditor.focus(); scriptEditor.select(); var scriptCopied = safe(function () { return document.execCommand('copy'); }, false); act.textContent = scriptCopied ? 'Copied' : 'Selected'; setTimeout(function () { act.textContent = 'Copy Script'; }, 1100); }
    else if (a === 'copy') { report.focus(); report.select(); var ok = safe(function () { return document.execCommand('copy'); }, false); act.textContent = ok ? 'Copied' : 'Selected'; setTimeout(function () { act.textContent = state.reportKind === 'console' ? 'Copy Console' : 'Copy'; }, 1100); }
    else if (a === 'menu') showMenu();
    else if (a === 'close') closeAll();
    e.preventDefault(); e.stopPropagation();
  });

  document.addEventListener('pointerdown', function (e) {
    if (!state.enabled || !state.pickMode || own(e.target)) return;
    var mode = state.pickMode; state.pickMode = null; launch.classList.remove('armed'); launch.textContent = 'Diag';
    e.preventDefault(); e.stopImmediatePropagation();
    var stack = document.elementsFromPoint(e.clientX, e.clientY).filter(function (x) { return !own(x); });
    if (mode === 'hit') showReport('Hit Stack @ ' + e.clientX.toFixed(1) + ',' + e.clientY.toFixed(1), stack.slice(0, 30).map(function (x, i) { var s = getComputedStyle(x); return (i + 1) + '. z=' + s.zIndex + ' pointer=' + s.pointerEvents + ' ' + name(x) + '\n   ' + path(x); }).join('\n') || '(none)', 'hit', null);
    else { state.childHistory = []; choose(stack[0] || e.target, false); }
  }, { capture: true, passive: false });

  ['pointerdown','pointermove','pointerup','touchstart','touchmove','touchend','click','dblclick','wheel','focusin','focusout','keydown','keyup'].forEach(function (type) {
    document.addEventListener(type, function (e) { if (!state.enabled || !state.eventTrace || own(e.target)) return; var p = e.touches && e.touches[0] || e.changedTouches && e.changedTouches[0] || e; state.events.push(now() + ' ' + type + ' target=' + name(e.target) + ' xy=' + (p.clientX == null ? '-' : p.clientX.toFixed(1) + ',' + p.clientY.toFixed(1)) + ' prevented=' + e.defaultPrevented + ' trusted=' + e.isTrusted); if (state.events.length > 300) state.events.shift(); }, true);
  });

  ['log','info','warn','error'].forEach(function (level) { var original = console[level]; console[level] = function () { if (state.enabled) { var args = Array.prototype.slice.call(arguments).map(function (x) { return safe(function () { return typeof x === 'string' ? x : JSON.stringify(x); }, String(x)); }); state.console.push(now() + ' [' + level + '] ' + clip(args.join(' '), 1000)); if (state.console.length > 300) state.console.shift(); } return original.apply(console, arguments); }; });
  window.addEventListener('error', function (e) { if (!state.enabled) return; state.errors.push(now() + ' ERROR ' + e.message + ' @ ' + e.filename + ':' + e.lineno + ':' + e.colno); if (state.errors.length > 200) state.errors.shift(); });
  window.addEventListener('unhandledrejection', function (e) { if (!state.enabled) return; state.errors.push(now() + ' REJECTION ' + clip(safe(function () { return e.reason && (e.reason.stack || e.reason.message) || e.reason; }, 'unknown'), 1200)); if (state.errors.length > 200) state.errors.shift(); });

  if (window.fetch) { var nativeFetch = window.fetch; window.fetch = function () { if (!state.enabled) return nativeFetch.apply(this, arguments); var start = performance.now(), url = clip(arguments[0] && (arguments[0].url || arguments[0]), 220); return nativeFetch.apply(this, arguments).then(function (res) { state.network.push(now() + ' FETCH ' + res.status + ' ' + (performance.now() - start).toFixed(0) + 'ms ' + url); if (state.network.length > 300) state.network.shift(); return res; }, function (err) { state.network.push(now() + ' FETCH ERROR ' + clip(err, 300) + ' ' + url); throw err; }); }; }
  var NativeXHR = window.XMLHttpRequest;
  if (NativeXHR) { var nativeOpen = NativeXHR.prototype.open, nativeSend = NativeXHR.prototype.send; NativeXHR.prototype.open = function (method, url) { if (state.enabled) this.__comfierDiag = { method: method, url: clip(url, 220) }; return nativeOpen.apply(this, arguments); }; NativeXHR.prototype.send = function () { if (!state.enabled) return nativeSend.apply(this, arguments); var x = this, start = performance.now(); x.addEventListener('loadend', function () { var d = x.__comfierDiag || {}; state.network.push(now() + ' XHR ' + (d.method || '') + ' ' + x.status + ' ' + (performance.now() - start).toFixed(0) + 'ms ' + (d.url || '')); if (state.network.length > 300) state.network.shift(); }, { once: true }); return nativeSend.apply(this, arguments); }; }
  window.addEventListener('resize', function(){syncViewportMode();positionHighlight();}, { passive: true });
  window.addEventListener('orientationchange', syncViewportMode, { passive: true });
  window.addEventListener('scroll', positionHighlight, { passive: true, capture: true });

  window.__comfierDiagnosticSuite = {
    isEnabled: function () { return state.enabled; },
    isOpen: function () { return state.enabled && (menu.classList.contains('open') || panel.classList.contains('open') || !!state.pickMode); },
    handleBack: function () { if (!this.isOpen()) return false; closeAll(); return true; },
    exportAll: allReport,
    open: showMenu,
    enable: function () { return setEnabled(true); },
    disable: function () { return setEnabled(false); },
    toggle: function () { return setEnabled(!state.enabled); },
    refreshSettingsToggles: function () { refreshSettingsToggles(0); }
  };
  window.__comfierBack?.register?.('diagnostics',10,function(){ return window.__comfierDiagnosticSuite?.handleBack?.() || false; });
})();
