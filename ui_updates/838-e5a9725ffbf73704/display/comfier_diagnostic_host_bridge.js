const STATE_URL='/comfierui/diagnostics/state';
const ACTION_URL='/comfierui/diagnostics/action';
let hostState={ready:false,active:'',scripts:[],backups:[]};
const result=(ok,message)=>JSON.stringify({ok:!!ok,message:String(message||'')});
const cloneMeta=list=>list.map(x=>({id:x.id,name:x.name,created:x.created,size:x.size,label:x.label}));
const applyState=next=>{if(next&&typeof next==='object'){hostState={ready:!!next.ready,active:String(next.active||''),scripts:Array.isArray(next.scripts)?next.scripts:[],backups:Array.isArray(next.backups)?next.backups:[]};}};
async function refresh(){try{const r=await fetch(STATE_URL,{cache:'no-store'});if(r.ok)applyState(await r.json());}catch(e){console.error('[ComfierUI Diagnostics host state]',e);}}
async function post(action,payload={}){try{const r=await fetch(ACTION_URL,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({action,...payload}),cache:'no-store'});const data=await r.json();if(data?.state)applyState(data.state);if(!r.ok||data?.ok===false)console.error('[ComfierUI Diagnostics host action]',data?.message||r.status);}catch(e){console.error('[ComfierUI Diagnostics host action]',e);}}
function normalize(name){let v=String(name||'').trim().replace(/\.js$/i,'').replace(/[^A-Za-z0-9._-]+/g,'-').replace(/^-+|-+$/g,'');if(!v)throw Error('Enter a script filename');return v.slice(0,61)+'.js';}
await refresh();
window.ComfierDiagnosticScripts={
  getActiveScript(){return hostState.active||'';},
  saveScript(code){hostState.active=String(code||'');post('save_active',{code:hostState.active});return result(true,'Saved persistent injection');},
  getClipboardText(){return '';},
  listScripts(){return JSON.stringify(cloneMeta(hostState.scripts));},
  getScript(id){return String(hostState.scripts.find(x=>x.id===id)?.code||'');},
  saveNamedScript(name,code){let id;try{id=normalize(name);}catch(e){return result(false,e.message);}const text=String(code||''),existing=hostState.scripts.find(x=>x.id===id);if(existing){existing.code=text;existing.size=new TextEncoder().encode(text).length;}else hostState.scripts.push({id,name:id.slice(0,-3),created:Date.now(),size:new TextEncoder().encode(text).length,code:text});post('save_named',{name:id,code:text});return result(true,'Saved '+id);},
  deleteScript(id){hostState.scripts=hostState.scripts.filter(x=>x.id!==id);post('delete_script',{id});return result(true,'Deleted '+id);},
  moveScript(id,direction){const i=hostState.scripts.findIndex(x=>x.id===id);if(i<0)return result(false,'Script not found');const to=Math.max(0,Math.min(hostState.scripts.length-1,i+(direction<0?-1:1)));if(to!==i){const [x]=hostState.scripts.splice(i,1);hostState.scripts.splice(to,0,x);}post('move_script',{id,direction});return result(true,'Launch order updated');},
  listBackups(){return JSON.stringify(cloneMeta(hostState.backups));},
  restoreBackup(id){const b=hostState.backups.find(x=>x.id===id);if(!b)return result(false,'Backup not found');hostState.active=String(b.code||'');post('restore_backup',{id});return result(true,hostState.active?'Backup restored':'Restored clean state');},
  deleteBackup(id){hostState.backups=hostState.backups.filter(x=>x.id!==id);post('delete_backup',{id});return result(true,'Backup deleted');}
};
if(!window.__comfierPersistentInjectionRan&&hostState.scripts.length){window.__comfierPersistentInjectionRan=true;const A=Object.getPrototypeOf(async function(){}).constructor;for(const item of hostState.scripts){try{const value=await new A(item.code||'').call(window);console.info('[Persistent Injection '+item.id+']',value===undefined?'completed':value);}catch(e){console.error('[Persistent Injection '+item.id+']',e?.stack||e);}}}
window.__comfierDiagnosticHostBridge={ready:true,refresh,snapshot:()=>({ready:hostState.ready,scripts:hostState.scripts.length,backups:hostState.backups.length})};
