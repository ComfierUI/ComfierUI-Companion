(function(){
  'use strict';
  if(window.__COMFIER_CLOUD_MODE)return;
  if(window.__comfierDownloads)return;
  const jobs=window.__comfierRuntime.scope('downloads'),requests=window.__comfierDocument.requests(),pollRequests=window.__comfierDocument.requests();
  let pollGeneration=0,endpointStatus='unknown';
  let clearBusy=false,modelActions=0;
  let stopped=false,restartBusy=false,restartGeneration=0,restartCancel=null;
  const PANEL_ID='comfier-downloads-bottom-panel',STYLE_ID='comfier-downloads-bottom-style',OPEN_CLASS='comfier-downloads-bottom-open';
  const NOTICE_SELECTOR='[role="alert"],.cn-manager-message,.comfy-modal-content,.p-toast-message';
  const OWNED_SELECTOR='#'+PANEL_ID+',#comfier-downloads-action-slot,#'+STYLE_ID;
  let timer=0,inFlight=false,queued=false,nativeVisible=true,active=false,failures=0,wakeUntil=0,lastPayload='',items=[];
  let panel=null,list=null,title=null,statusText=null,clearButton=null,restartButton=null,hardRefreshButton=null,launcherSlot=null,launcherButton=null,launcherObserver=null,panelWantedOpen=false;
  const rows=new Map();
  let managerStore=null,managerTimer=0,managerActive=false,managerStatus='',restartNeeded=false,hardRefreshNeeded=false,restartTimeout=0,reconnectHandler=null;
  const visible=()=>nativeVisible&&!document.hidden;
  function installStyle(){
    if(document.getElementById(STYLE_ID))return;
    const style=document.createElement('style');style.id=STYLE_ID;style.textContent=`
.comfier-manager-progress-suppressed,.comfier-manager-notice-suppressed{display:none!important;visibility:hidden!important;pointer-events:none!important}
#${PANEL_ID}{display:none;flex-direction:column;background:var(--comfy-menu-bg,#171718)!important;color:var(--comfier-ui-font,var(--fg-color,#fff))!important}
#${PANEL_ID}.open{display:flex!important}
#${PANEL_ID} .p-tablist{display:flex;align-items:center;gap:8px;flex:0 0 44px;height:44px;min-height:44px;padding:5px 8px;box-sizing:border-box;background:var(--comfy-menu-bg,#171718);color:var(--comfier-ui-font,var(--fg-color,#fff));border-bottom:3px solid var(--comfier-panel-frame,var(--interface-stroke,var(--border-color,#4e4e4e)));touch-action:none;user-select:none}
#${PANEL_ID} .comfier-downloads-title{font-size:14px;font-weight:600;white-space:nowrap}
#${PANEL_ID} .comfier-downloads-status{min-width:0;flex:1 1 auto;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:12px;opacity:.78}
#${PANEL_ID} button{min-height:30px;padding:4px 10px;border:1px solid var(--comfier-button-frame,var(--comfier-accent,#fff));border-radius:7px;background:transparent;color:var(--comfier-ui-font,var(--fg-color,#fff));font:inherit;font-size:12px;touch-action:manipulation}
#${PANEL_ID} button:disabled{opacity:.45}
#${PANEL_ID} .comfier-downloads-manager-action{display:none;white-space:nowrap}
#${PANEL_ID} .comfier-downloads-manager-action.visible{display:inline-flex;align-items:center;justify-content:center}
#${PANEL_ID} .comfier-downloads-list{flex:1 1 auto;min-height:0;overflow-x:hidden;overflow-y:auto;overscroll-behavior:contain;touch-action:pan-y;padding:4px 8px 8px;box-sizing:border-box;background:var(--comfy-menu-bg,#171718)}
#${PANEL_ID} .comfier-download-row{display:flex;flex-direction:column;justify-content:center;min-height:64px;padding:6px 8px;margin:2px 0;box-sizing:border-box;border:1px solid color-mix(in srgb,var(--comfier-panel-frame,var(--interface-stroke,var(--border-color,#4e4e4e))) 36%,transparent);border-radius:7px;background:var(--comfy-menu-bg,#171718);color:var(--comfier-ui-font,var(--fg-color,#fff))}
#${PANEL_ID} .comfier-download-top{display:flex;align-items:center;gap:8px;min-width:0;min-height:30px}
#${PANEL_ID} .comfier-download-name{min-width:0;flex:1 1 auto;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:13px}
#${PANEL_ID} .comfier-download-meta{font-size:11px;opacity:.75;white-space:nowrap}
#${PANEL_ID} progress{display:block;width:100%;height:10px;margin-top:6px;border:0;border-radius:5px;overflow:hidden;background:#262626;accent-color:var(--comfier-progress-fill,var(--color-interface-panel-job-progress-primary,#0b8ce9))}
#${PANEL_ID} progress::-webkit-progress-bar{background:#262626;border-radius:5px}
#${PANEL_ID} progress::-webkit-progress-value{background:var(--comfier-progress-fill,var(--color-interface-panel-job-progress-primary,#0b8ce9));border-radius:5px}
#${PANEL_ID} progress::-moz-progress-bar{background:var(--comfier-progress-fill,var(--color-interface-panel-job-progress-primary,#0b8ce9));border-radius:5px}
#comfier-downloads-action-slot{display:flex}
#comfier-downloads-action-slot{position:relative;display:flex;align-items:center;justify-content:center;flex:0 0 32px;width:32px;min-width:32px;max-width:32px;height:32px;overflow:visible;transition:none}
#comfier-downloads-action-toggle{display:inline-flex;align-items:center;justify-content:center;width:32px;min-width:32px;max-width:32px;height:32px;min-height:32px;max-height:32px;padding:0;margin:0;border:0;border-radius:7px;background:transparent!important;color:var(--comfier-icon-color,var(--comfier-accent,#fff))!important;touch-action:manipulation}
#comfier-downloads-action-slot.has-downloads #comfier-downloads-action-toggle{display:inline-flex}
#comfier-downloads-action-toggle{position:relative}
.comfier-download-icon{position:relative;display:block;width:16px;height:16px}
.comfier-active-counter{position:absolute;top:-4px;right:-4px;min-width:16px;padding:1px 0;border-radius:9999px;background:var(--color-primary-background,#168ed0);font:500 10px/14px sans-serif;text-align:center;pointer-events:none}
.comfier-active-counter[hidden]{display:none!important}
#comfier-downloads-action-toggle svg{display:block;width:16px;height:16px;color:var(--comfier-icon-color,var(--comfier-accent,#fff));stroke:currentColor;fill:none}
`;(document.head||document.documentElement).appendChild(style);
  }
  function actionbar(){
    if(window.__comfierActionbarOwner)return window.__comfierActionbarOwner.launcherHome;
    const extensions=document.getElementById('comfier-extensions-toggle');
    return (!extensions?.closest('[role="dialog"],.side-bar-panel')&&extensions?.closest('.actionbar-container'))||document.querySelector('[data-testid="action-bar-card"] .actionbar-container');
  }
  function ensureLauncher(){
    installStyle();const bar=actionbar();
    if(!launcherSlot){
      launcherSlot=document.createElement('span');launcherSlot.id='comfier-downloads-action-slot';
      launcherButton=document.createElement('button');launcherButton.id='comfier-downloads-action-toggle';launcherButton.type='button';launcherButton.title='Downloads';launcherButton.setAttribute('aria-label','Downloads');
      launcherButton.innerHTML='<span class="sidebar-icon-wrapper comfier-download-icon"><span class="sidebar-icon-badge comfier-active-counter" hidden></span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v12m0 0 4-4m-4 4-4-4M5 21h14" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></span>';
      launcherButton.addEventListener('click',event=>{event.preventDefault();event.stopPropagation();if(!hasContent())return;setOpen(!panelWantedOpen)});launcherSlot.appendChild(launcherButton);
    }
    const extensions=document.getElementById('comfier-extensions-toggle');
    const home=bar||document.body,anchor=extensions?.parentElement===home?extensions:null;
    if(launcherSlot.parentElement!==home||anchor&&launcherSlot.nextElementSibling!==anchor){home.insertBefore(launcherSlot,anchor);window.__comfierLayoutEditor?.refresh?.()}
    syncLauncher();return launcherSlot;
  }
  function syncLauncher(){
    if(!launcherSlot||!launcherButton)return;const present=hasContent();launcherSlot.classList.toggle('has-downloads',present);launcherButton.setAttribute('aria-pressed',String(present&&panelWantedOpen));launcherButton.setAttribute('aria-expanded',String(present&&panelWantedOpen));launcherButton.disabled=!present;
    const count=items.filter(taskActive).length+managerTasks().filter(task=>managerTaskState(task).running).length;
    const badge=launcherButton.querySelector('.comfier-active-counter');if(badge){setText(badge,String(count));badge.hidden=count===0}
  }
  function ensurePanelHome(){
    if(!panel)return;const nativePanel=document.querySelector('.bottom-panel.comfier-early-floating-bottom'),home=nativePanel?.parentElement||document.querySelector('.comfier-early-bottom-panel-splitter');
    if(home&&panel.parentElement!==home)home.appendChild(panel);
  }
  function installPanel(){
    if(panel?.isConnected){ensurePanelHome();return panel}installStyle();panel=document.createElement('section');panel.id=PANEL_ID;
    panel.className='comfier-early-floating-bottom comfier-downloads-bottom-panel';panel.dataset.comfierBottomMinHeight='112';panel.dataset.comfierBottomPreferredHeight='252';panel.setAttribute('aria-label','Downloads');
    const header=document.createElement('div');header.className='p-tablist';title=document.createElement('div');title.className='comfier-downloads-title';title.textContent='Downloads';statusText=document.createElement('div');statusText.className='comfier-downloads-status';
    restartButton=document.createElement('button');restartButton.type='button';restartButton.className='comfier-downloads-manager-action';restartButton.textContent='Restart';restartButton.addEventListener('click',restartBackend);
    hardRefreshButton=document.createElement('button');hardRefreshButton.type='button';hardRefreshButton.className='comfier-downloads-manager-action';hardRefreshButton.textContent='Hard Refresh';hardRefreshButton.addEventListener('click',hardRefresh);
    clearButton=document.createElement('button');clearButton.type='button';clearButton.textContent='Clear';clearButton.addEventListener('click',clearCompleted);header.append(title,statusText,restartButton,hardRefreshButton,clearButton);
    list=document.createElement('div');list.className='comfier-downloads-list';rows.clear();list.addEventListener('click',rowAction);panel.append(header,list);document.body.appendChild(panel);ensurePanelHome();return panel;
  }
  function refreshLayout(){if(stopped)return;window.__comfierEarlyFloatingPanels?.refresh?.()}
  function hasContent(){return items.length>0||managerTasks().length>0||managerActive||restartNeeded||hardRefreshNeeded}
  function setOpen(open){if(stopped)return;installPanel();ensurePanelHome();const next=!!open&&hasContent(),changed=panelWantedOpen!==next||panel.classList.contains('open')!==next;if(next&&!panelWantedOpen)window.__comfierBack?.closeLogs?.();panelWantedOpen=next;panel.classList.toggle('open',next);document.documentElement.classList.toggle(OPEN_CLASS,next);syncLauncher();if(changed)jobs.burst('layout',refreshLayout,[0,16,80,220])}
  function closeIfOpen(){if(stopped)return false;if(!panelWantedOpen&&!panel?.classList.contains('open'))return false;setOpen(false);return true}
  const clearableModels=()=>items.some(item=>item.status==='completed'||item.status==='canceled');
  const modelsBusy=()=>items.some(taskActive)||modelActions>0;
  const taskActive=item=>item.status==='active'||item.status==='pending';
  const actionLabel=item=>item.status==='canceled'?'Resume':item.status==='failed'?'Retry':'';
  function managerTasks(){return Array.isArray(managerStore?.taskLogs)?managerStore.taskLogs:[]}
  function managerTaskState(task){const id=String(task?.taskId||''),running=managerStore?.isTaskInProgress?.(id)??managerActive,failed=managerStore?.isTaskFailed?.(id)??false;return{running,failed,state:running?'Downloading':failed?'Failed':'Completed'}}
  function setText(el,value){if(el.textContent!==value)el.textContent=value}
  function setAttr(el,name,value){if(value==null){if(el.hasAttribute(name))el.removeAttribute(name)}else if(el.getAttribute(name)!==String(value))el.setAttribute(name,String(value))}
  function createRow(manager){
    const element=document.createElement('article'),top=document.createElement('div'),name=document.createElement('span'),meta=document.createElement('span'),button=document.createElement('button'),progress=document.createElement('progress');
    element.className='comfier-download-row'+(manager?' comfier-manager-download-row':'');top.className='comfier-download-top';name.className='comfier-download-name';meta.className='comfier-download-meta';button.type='button';progress.max=100;
    top.append(name,meta);if(!manager)top.appendChild(button);element.append(top,progress);return{element,name,meta,button,progress,busy:false,signature:''};
  }
  function renderRows(){
    if(!list)return;
    const seen=new Set(),occurrences=new Map();let cursor=list.firstElementChild;
    const paint=(item,index,manager)=>{
      // Keep the model and Manager namespaces separate; tolerate repeated/missing log IDs.
      const base=(manager?'manager:':'model:')+String((manager?item?.taskId:item.task_id)??index),occurrence=occurrences.get(base)||0;occurrences.set(base,occurrence+1);const key=JSON.stringify([base,occurrence]);seen.add(key);
      let row=rows.get(key);if(!row){row=createRow(manager);rows.set(key,row)}
      const running=manager?managerTaskState(item):{running:taskActive(item)},percent=manager||item.percent==null?null:Math.max(0,Math.min(100,Number(item.percent)||0));
      const name=String((manager?item?.taskName:item.filename)||(manager?'Node pack':'Model download'));
      const state=manager?running.state:running.running?(percent==null?'Downloading':Math.round(percent)+'%'):(item.status==='completed'?'Completed':item.status||'Pending');
      const label=manager?'':running.running?'Cancel':actionLabel(item),action=label?(running.running?'cancel':'retry'):null,value=manager?(running.running?null:running.failed?0:100):percent;
      const signature=JSON.stringify([name,state,label,action,value,running.running]);
      if(row.signature!==signature){
        row.signature=signature;setText(row.name,name);setText(row.meta,state);
        row.progress.style.display=manager||running.running?'':'none';setAttr(row.progress,'value',value);
        if(!manager){setText(row.button,label);row.button.style.display=label?'':'none';setAttr(row.button,'data-action',action);setAttr(row.button,'data-task',String(item.task_id));setAttr(row.button,'aria-label',label?label+' '+name:null)}
      }
      row.button.disabled=row.busy||restartBusy||clearBusy;
      if(row.element!==cursor)list.insertBefore(row.element,cursor);else cursor=cursor.nextElementSibling;
    };
    items.forEach((item,index)=>paint(item,index,false));managerTasks().forEach((item,index)=>paint(item,index,true));
    for(const [key,row] of rows)if(!seen.has(key)){row.element.remove();rows.delete(key)}
  }
  async function rowAction(event){
    if(stopped||restartBusy||clearBusy)return;
    const button=event.target.closest?.('button[data-action]');if(!button||!list.contains(button)||button.disabled)return;
    const row=Array.from(rows.values()).find(row=>row.button===button);if(!row||row.busy)return;
    event.stopPropagation();const task=button.dataset.task,action=button.dataset.action;row.busy=true;modelActions++;button.disabled=true;syncManagerUi();
    try{await request(action==='cancel'?'DELETE':'POST',`/comfierui/model-downloads/${encodeURIComponent(task)}${action==='retry'?'/retry':''}`);wake()}catch(error){showError(error)}finally{row.busy=false;modelActions--;button.disabled=restartBusy||clearBusy;syncManagerUi()}
  }
  function render(next){
    items=Array.isArray(next)?next:[];installPanel();ensureLauncher();if(!items.length&&!hasContent()){panelWantedOpen=false;renderRows();syncManagerUi();setOpen(false);return}
    const running=items.filter(taskActive).length;renderRows();setOpen(panelWantedOpen);
    syncManagerUi(running);
  }
  function showError(error){if(stopped)return;statusText.textContent=String(error?.message||error||'Download action failed')}
  async function fetchOwned(path,options){if(stopped)throw Error('Downloads removed');return requests.request(path,options,15000)}
  async function request(method,path){const response=await fetchOwned(path,{method,credentials:'same-origin'});if(!response.ok)throw new Error(await response.text()||`HTTP ${response.status}`);await response.text();return response}
  async function clearCompleted(){
    if(stopped||clearBusy||restartBusy||modelActions>0||!clearableModels())return;clearBusy=true;syncManagerUi();renderRows();
    try{if(!window.app||typeof window.app.reloadNodeDefs!=='function')throw new Error('Comfy model refresh is unavailable');await window.app.reloadNodeDefs();if(stopped)return;await request('DELETE','/comfierui/model-downloads/completed');wake()}catch(error){showError(error)}finally{clearBusy=false;syncManagerUi();renderRows()}
  }
  const managerBinding=window.__comfierUi.watchStore('comfyManager',store=>{managerStore=store;syncManager()});
  function managerProcessing(){return!!(managerStore?.isProcessingTasks||managerStore?.isProcessing||(managerStore?.taskQueue?.running_queue?.length||0)+(managerStore?.taskQueue?.pending_queue?.length||0)>0)}
  function successfulManagerTasks(){const ids=managerStore?.succeededTasksIds;return Array.isArray(ids)&&ids.length>0}
  function managerToast(){const names=Array.isArray(managerStore?.taskLogs)?managerStore.taskLogs.map(log=>String(log?.taskName||'').trim()).filter(Boolean):[];return Array.from(document.querySelectorAll('[role="status"][aria-live="polite"]')).find(el=>{if(!el.querySelector('button'))return false;const text=(el.textContent||'').replace(/\s+/g,' ').trim();return /apply changes|restart to apply changes|installing dependencies|restarting backend/i.test(text)||names.some(name=>text.includes(name))})||null}
  function inspectRefreshSignals(root){
    // A containing body/app node can aggregate the same text as a notice. Only
    // recognized notice surfaces may be hidden; never hide their arbitrary parent.
    const candidates=Array.from(root?.querySelectorAll?.(NOTICE_SELECTOR)||[]);if(root?.matches?.(NOTICE_SELECTOR))candidates.unshift(root);
    for(const el of candidates){
      if(el===document.body||el===document.documentElement||el.id==='vue-app'||el.closest?.(OWNED_SELECTOR))continue;
      const text=(el.textContent||'').replace(/\s+/g,' ').trim();
      if(/please.{0,120}refresh.{0,60}browser|restart comfyui.{0,120}refresh.{0,60}browser|refresh.{0,60}browser.{0,80}apply/i.test(text)){hardRefreshNeeded=true;el.classList?.add('comfier-manager-notice-suppressed')}
    }
  }
  function syncManager(){
    if(stopped)return;managerBinding.refresh();
    const toast=managerToast();if(toast)toast.classList.add('comfier-manager-progress-suppressed');
    const processing=managerProcessing(),success=successfulManagerTasks();managerActive=processing;if(!restartBusy)managerStatus='';if(success&&!processing)restartNeeded=true;
    inspectRefreshSignals(document.body);installPanel();renderRows();syncManagerUi();syncLauncher();setOpen(panelWantedOpen)
  }
  function syncManagerUi(running=items.filter(taskActive).length){
    if(stopped||!panel)return;const blocked=modelsBusy();restartButton.disabled=restartBusy||clearBusy||blocked;const titleCount=items.length+managerTasks().length;title.textContent=titleCount?`Downloads (${titleCount})`:'Downloads';statusText.textContent=managerStatus||(running?`${running} active`:'');
    restartButton?.classList.toggle('visible',restartNeeded&&!blocked);hardRefreshButton?.classList.toggle('visible',hardRefreshNeeded);if(clearButton){clearButton.style.display=clearableModels()?'':'none';clearButton.disabled=clearBusy||restartBusy||modelActions>0||!clearableModels();}syncLauncher();
  }
  async function restartBackend(){
    if(stopped||restartBusy||clearBusy||modelsBusy())return;const api=window.app?.api;if(!api?.addEventListener){showError('Comfy backend restart is unavailable');return}
    const generation=++restartGeneration,valid=()=>!stopped&&generation===restartGeneration;
    restartBusy=true;managerStatus='Restarting backend…';syncManagerUi();renderRows();
    const settings=window.app?.extensionManager?.setting,toastKey='Comfy.Toast.DisableReconnectingToast';let originalToast,restored=false,finishing=false;
    const setup=Promise.resolve().then(async()=>{try{originalToast=await settings?.get?.(toastKey);if(valid()&&originalToast!==undefined)await settings?.set?.(toastKey,true)}catch(_){}});
    const restoreToast=async()=>{if(restored)return;restored=true;try{if(originalToast!==undefined)await settings?.set?.(toastKey,originalToast)}catch(_){}};
    const cleanup=()=>{clearTimeout(restartTimeout);restartTimeout=0;if(reconnectHandler){api.removeEventListener?.('reconnected',reconnectHandler);reconnectHandler=null}};
    restartCancel=()=>{cleanup();setup.then(restoreToast,restoreToast)};
    const fail=async error=>{if(!valid())return;cleanup();await restoreToast();if(!valid())return;restartCancel=null;restartBusy=false;managerStatus='';syncManagerUi();renderRows();showError(error)};
    await setup;if(!valid()){await restoreToast();return}if(modelsBusy()){await fail('Wait for model downloads to finish before restarting');return}
    let graph;try{graph=window.app?.graph?.serialize?.()}catch(error){await fail(error);return}
    reconnectHandler=async()=>{
      if(!valid()||finishing)return;finishing=true;cleanup();
      try{managerStatus='Refreshing nodes…';syncManagerUi();await window.app.reloadNodeDefs();if(!valid())return;
        if(graph&&typeof window.app.loadGraphData==='function')await window.app.loadGraphData(graph);if(!valid())return;
        managerStore?.setStale?.();managerStore?.resetTaskState?.();restartNeeded=false;managerActive=false;managerStatus='';await restoreToast();if(!valid())return;
        restartCancel=null;restartBusy=false;syncManagerUi();renderRows();if(!hasContent())setOpen(false);
      }catch(error){await fail(error)}finally{if(!valid())await restoreToast()}
    };
    api.addEventListener('reconnected',reconnectHandler,{once:true});restartTimeout=setTimeout(()=>fail('Backend restart timed out'),120000);
    try{const url=typeof api.apiURL==='function'?api.apiURL('/v2/manager/reboot'):'/api/v2/manager/reboot',response=await fetchOwned(url,{method:'POST',credentials:'same-origin',headers:{'Content-Type':'application/json'}});const text=await response.text();if(!valid()||!restartTimeout)return;if(!response.ok)throw new Error(text||`Restart failed: HTTP ${response.status}`);managerStatus='Waiting for backend…';syncManagerUi()}catch(error){if(!valid()||!restartTimeout)return;const message=String(error?.message||error||'');if(/failed to fetch|network\s*error|load failed|connection|timed out/i.test(message)){managerStatus='Waiting for backend…';syncManagerUi();return}await fail(error)}
  }
  function hardRefresh(){if(stopped)return;hardRefreshNeeded=false;syncManagerUi();if(window.ComfierApp?.hardRefresh)window.ComfierApp.hardRefresh();else location.reload()}
  function schedule(delay){clearTimeout(timer);timer=0;if(!stopped&&visible())timer=setTimeout(()=>poll(false),delay)}
  async function poll(force){
    if(stopped||!visible())return;if(inFlight){if(force)queued=true;return}clearTimeout(timer);timer=0;inFlight=true;const generation=pollGeneration;let received=false;
    try{const response=await pollRequests.request('/comfierui/model-downloads',{cache:'no-store',credentials:'same-origin'});const payload=await response.text();if(stopped||generation!==pollGeneration)return;received=true;endpointStatus=response.status===404||response.status===405?'unsupported':response.ok?'available':'unavailable';if(!response.ok)throw new Error(`HTTP ${response.status}`);const data=JSON.parse(payload),next=Array.isArray(data.downloads)?data.downloads:[];active=next.some(taskActive);failures=0;if(payload!==lastPayload){lastPayload=payload;render(next)}}catch(_){if(!stopped&&generation===pollGeneration){if(!received||endpointStatus!=='unsupported')endpointStatus='unavailable';failures++}}
    finally{inFlight=false;if(stopped){queued=false;return}if(generation===pollGeneration)window.__comfierDocument.reportEndpoint('downloads',endpointStatus);if(queued&&visible()){queued=false;schedule(0)}else{queued=false;schedule(endpointStatus==='unsupported'?60000:failures?Math.min(60000,1000*Math.pow(2,Math.min(failures,6))):(active||Date.now()<wakeUntil?1000:15000))}}
  }
  function wake(){if(stopped)return;wakeUntil=Date.now()+5000;poll(true)}
  function pause(){nativeVisible=false;clearTimeout(timer);timer=0;pollGeneration++;pollRequests.abort();queued=false}
  function resume(){if(stopped)return;const was=nativeVisible;nativeVisible=true;refreshLayout();if(!was||!timer&&!inFlight)poll(true)}
  function remove(){
    if(stopped)return;stopped=true;restartGeneration++;jobs.dispose();restartCancel?.();clearTimeout(timer);timer=0;clearTimeout(managerTimer);clearTimeout(restartTimeout);
    if(reconnectHandler)window.app?.api?.removeEventListener?.('reconnected',reconnectHandler);managerBinding.remove();launcherObserver?.disconnect();requests.remove();pollGeneration++;pollRequests.remove();
    document.querySelectorAll('.comfier-manager-progress-suppressed,.comfier-manager-notice-suppressed').forEach(el=>el.classList.remove('comfier-manager-progress-suppressed','comfier-manager-notice-suppressed'));panel?.remove();launcherSlot?.remove();rows.clear();document.getElementById(STYLE_ID)?.remove();document.documentElement.classList.remove(OPEN_CLASS);
    if(window.__comfierDownloads?.remove===remove){delete window.__comfierDownloads;delete window.__comfierDownloadsMonitor}if(window.__comfierPollDownloads===wake)delete window.__comfierPollDownloads;
  }
  jobs.listen(document,'visibilitychange',()=>{if(document.hidden){clearTimeout(timer);timer=0;pollGeneration++;pollRequests.abort();queued=false}else{ensureLauncher();refreshLayout();syncManager();poll(true)}});
  jobs.listen(window,'comfierui-session-reconnected',wake);jobs.listen(window,'comfierui-download-accepted',wake);jobs.listen(window,'resize',refreshLayout,{passive:true});jobs.listen(window.visualViewport,'resize',refreshLayout,{passive:true});
  launcherObserver=new MutationObserver(records=>{
    if(stopped)return;let reconcile=false;if(!launcherSlot||!document.body.contains(launcherSlot))ensureLauncher();
    for(const record of records){
      if(record.target.closest?.(OWNED_SELECTOR))continue;
      if(record.target.closest?.(NOTICE_SELECTOR))reconcile=true;
      for(const node of Array.from(record.addedNodes||[]))if(node.nodeType===1&&!node.closest?.(OWNED_SELECTOR)){
        if(node.matches?.('#comfier-extensions-toggle,[data-testid="action-bar-card"],.actionbar-container')||node.querySelector?.('#comfier-extensions-toggle,[data-testid="action-bar-card"] .actionbar-container'))ensureLauncher();
        inspectRefreshSignals(node);reconcile=true;
      }
    }
    if(reconcile){clearTimeout(managerTimer);managerTimer=setTimeout(syncManager,0)}
  });launcherObserver.observe(document.body,{childList:true,subtree:true});ensureLauncher();syncManager();
  window.__comfierDownloads={pause,resume,refreshLayout,poll:()=>poll(true),isOpen:()=>panelWantedOpen&&!!panel?.classList.contains('open'),closeIfOpen,snapshot:()=>({endpointStatus,active,inFlight,failures,timer:!!timer,visible:visible(),items:items.length,managerActive,restartNeeded,hardRefreshNeeded,restartBusy}),remove};window.__comfierPollDownloads=wake;window.__comfierDownloadsMonitor=true;poll(true);
})();
