(() => {
  'use strict';
  if(window.__comfierThemeStudio){window.__comfierThemeStudio.refresh();return}
  const manifest=window.__comfierThemeManifest;
  if(!manifest)return;
  const ROOT='comfier-ui-zoom-test',STORE='comfier.theme.test1.',RECENTS=STORE+'recents';
  const roles=manifest.roles,defaults=Object.fromEntries(roles.map(r=>[r.id,r.defaultColor]));
  const normalize=v=>{const x=String(v||'').trim().replace(/^#/,'');return /^[0-9a-f]{6}$/i.test(x)?'#'+x.toLowerCase():null};
  const profile=window.__comfierDefaultProfile||{},profileColorsDefault=profile.colors||{},profileTransparency=profile.transparency||{};
  const assigned=new Set(Object.keys(profileColorsDefault).filter(id=>roles.some(r=>r.id===id)));
  for(const id of assigned)defaults[id]=normalize(profileColorsDefault[id])||defaults[id];
  const state=Object.fromEntries(roles.map(({id,defaultColor})=>{let value=null;try{value=normalize(localStorage.getItem(STORE+id))}catch(_){}if(value)assigned.add(id);return[id,value||defaults[id]||defaultColor]}));
  const transparency=Object.fromEntries(roles.map(({id})=>{let v=profileTransparency[id]||0;try{const raw=localStorage.getItem(STORE+id+'.transparency');if(raw!==null)v=Number(raw)||0}catch(_){}return[id,Math.max(0,Math.min(100,v))]}));
  let selectedTransparency=0;
  const colorPaint=(id)=>transparency[id]?state[id]+Math.round(255*(1-transparency[id]/100)).toString(16).padStart(2,'0'):state[id];
  function selectTransparency(value){selectedTransparency=Math.max(0,Math.min(100,Number(value)||0));if(page){page.querySelector('.theme-transparency').value=String(selectedTransparency);page.querySelector('.theme-transparency-value').textContent=selectedTransparency+'%';page.querySelector('.theme-current').style.background=selected+Math.round(255*(1-selectedTransparency/100)).toString(16).padStart(2,'0')}return selectedTransparency}
  const optional=new Set(manifest.optionalRoles);
  let page=null,editorHost=null,selected=state.icons,previous=selected,hsv={h:0,s:0,v:1},backOff=null,wheelPointer=null,wheelCache=null,lastActive=undefined;
  const hexRgb=hex=>[1,3,5].map(i=>parseInt(hex.slice(i,i+2),16));
  const rgbHex=(r,g,b)=>'#'+[r,g,b].map(v=>Math.max(0,Math.min(255,Math.round(v))).toString(16).padStart(2,'0')).join('');
  function rgbHsv(hex){let[r,g,b]=hexRgb(hex).map(v=>v/255),max=Math.max(r,g,b),min=Math.min(r,g,b),d=max-min,h=0;if(d){if(max===r)h=((g-b)/d)%6;else if(max===g)h=(b-r)/d+2;else h=(r-g)/d+4;h=((h*60)+360)%360}return{h,s:max?d/max:0,v:max}}
  function hsvHex(h,s,v){let c=v*s,x=c*(1-Math.abs((h/60)%2-1)),m=v-c,r=0,g=0,b=0;if(h<60){r=c;g=x}else if(h<120){r=x;g=c}else if(h<180){g=c;b=x}else if(h<240){g=x;b=c}else if(h<300){r=x;b=c}else{r=c;b=x}return rgbHex((r+m)*255,(g+m)*255,(b+m)*255)}
  function contrast(hex){const c=hexRgb(hex).map(v=>{v/=255;return v<=.04045?v/12.92:((v+.055)/1.055)**2.4});return c[0]*.2126+c[1]*.7152+c[2]*.0722>.179?'#000000':'#ffffff'}
  function recents(){try{const values=JSON.parse(localStorage.getItem(RECENTS)||'[]');return Array.isArray(values)?values.map(normalize).filter(Boolean).slice(0,8):[]}catch(_){return[]}}
  function remember(value){try{localStorage.setItem(RECENTS,JSON.stringify([value,...recents().filter(v=>v!==value)].slice(0,8)))}catch(_){}renderRecents()}
  function paintRoles(){
    document.documentElement.style.setProperty("--comfier-icons-global",colorPaint("icons"));
    const style=document.documentElement.style;
    roles.forEach(({id,variable})=>{style.setProperty('--comfier-'+id+'-opacity',String(1-transparency[id]/100));if(optional.has(id)){document.documentElement.toggleAttribute('data-comfier-theme-'+id.toLowerCase(),assigned.has(id));if(!assigned.has(id)){style.removeProperty(variable);return}}style.setProperty(variable,colorPaint(id))});
    for(const [role,family,base] of [['panelBg','panel','var(--comfy-menu-bg,#171717)'],['containerBg','container','var(--color-interface-panel-surface,var(--comfy-menu-bg,#171717))']]){
      const rgb='--comfier-'+family+'-bg-rgb',paint='--comfier-'+family+'-paint';
      if(assigned.has(role)){style.setProperty(rgb,hexRgb(state[role]).join(' '));style.setProperty(paint,`rgb(from ${base} var(${rgb}) / calc(alpha * var(--comfier-${role}-opacity,1)))`)}else{style.removeProperty(rgb);style.removeProperty(paint)}
    }
    manifest.groups.filter(g=>g.paintVariable).forEach(g=>{const role=g.bindings[0].role;if(assigned.has(role))style.setProperty(g.paintVariable,g.paintExpression);else style.removeProperty(g.paintVariable)});
    for(const [role,name] of [['icons','icon'],['active','active'],['error','error']])style.setProperty('--comfier-'+name+'-text',contrast(state[role]));
    style.setProperty('--comfier-active-drag',rgbHex(...hexRgb(state.active).map(v=>v*.4)));
    const outline=assigned.has('icons')?colorPaint('icons'):null;if(lastActive!==outline){lastActive=outline;window.__comfierAccentTheme?.setActive?.(outline)}
    window.__comfierAccentTheme?.setCanvasText?.();
  }
  function setSelected(value,redraw=true){value=normalize(value);if(!value)return false;previous=selected;selected=value;hsv=rgbHsv(value);if(page){page.querySelector('.theme-hex').value=value.slice(1).toUpperCase();selectTransparency(selectedTransparency);page.querySelector('.theme-previous').style.background=previous;page.querySelector('.theme-value').value=String(Math.round(hsv.v*100));if(redraw)drawWheel()}return true}
  function edit(fn){return window.__comfierLayoutEditor?.changeGlobal?window.__comfierLayoutEditor.changeGlobal(fn):fn()}
  function applyRole(key){return edit(()=>doApplyRole(key))}
  function doApplyRole(key){if(!roles.some(r=>r.id===key))return false;state[key]=selected;transparency[key]=selectedTransparency;assigned.add(key);try{localStorage.setItem(STORE+key,selected);localStorage.setItem(STORE+key+'.transparency',String(selectedTransparency))}catch(_){}paintRoles();remember(selected);renderRoles();return true}
  function reset(){return edit(doReset)}
  function doReset(){
    roles.forEach(({id})=>{state[id]=defaults[id];transparency[id]=profileTransparency[id]||0;try{localStorage.removeItem(STORE+id);localStorage.removeItem(STORE+id+'.transparency')}catch(_){}});
    try{localStorage.removeItem(STORE+'accent')}catch(_){}
    assigned.clear();Object.keys(profileColorsDefault).forEach(id=>{if(roles.some(r=>r.id===id))assigned.add(id)});selectTransparency(0);paintRoles();setSelected(defaults.icons);renderRoles();return true;
  }
  const PROFILE_STORE='comfier.theme.profiles.v1';
  let profileDialog=null,profileSelection=null,companionProvider=null,profileRequest=0;
  function profileColors(value){
    if(!value||value.schemaVersion!==1||!value.colors||typeof value.colors!=='object'||Array.isArray(value.colors))throw Error('Unsupported theme profile.');
    if(value.transparency!==undefined&&(!value.transparency||typeof value.transparency!=='object'||Array.isArray(value.transparency)))throw Error('Invalid theme transparency.');
    if(value.transparency){for(const {id} of roles){const v=value.transparency[id];if(v!==undefined&&(typeof v!=='number'||!Number.isFinite(v)||v<0||v>100))throw Error('Invalid transparency for '+id)}}
    const colors={};for(const {id} of roles){if(Object.prototype.hasOwnProperty.call(value.colors,id)){const c=normalize(value.colors[id]);if(!c)throw Error('Invalid color for '+id);colors[id]=c}}return colors;
  }
  function localProfiles(){try{const list=JSON.parse(localStorage.getItem(PROFILE_STORE)||'[]');return Array.isArray(list)?list.filter(p=>{try{return typeof p.id==='string'&&typeof p.name==='string'&&!!profileColors(p)}catch(_){return false}}):[]}catch(_){return[]}}
  function writeProfiles(list){localStorage.setItem(PROFILE_STORE,JSON.stringify(list))}
  function exportProfile(name){return {schemaVersion:1,name,colors:Object.fromEntries([...assigned].map(id=>[id,state[id]])),transparency:Object.fromEntries([...assigned].map(id=>[id,transparency[id]])),...(window.__comfierLayoutEditor?{layout:window.__comfierLayoutEditor.exportLayout(),appearance:window.__comfierLayoutEditor.exportAppearance?.()}:{}),...(window.__comfierUiEditorModel?{dimensions:window.__comfierUiEditorModel.getGlobal()}:{})}}
  function loadProfile(profile,kind='colors'){return edit(()=>doLoadProfile(profile,kind))}
  function doLoadProfile(profile,kind='colors'){
    if(!['colors','layout','both'].includes(kind))throw Error('Invalid profile parts.');
    const colors=profileColors(profile);if(kind!=='colors'&&profile.layout)window.__comfierLayoutEditor?.validate(profile.layout);
    if(kind!=='layout'&&profile.appearance)window.__comfierLayoutEditor?.validateAppearance(profile.appearance);
    if(kind!=='layout'&&profile.dimensions)window.__comfierUiEditorModel?.dimensions(profile.dimensions);
    if(kind!=='colors'&&profile.layout)window.__comfierLayoutEditor?.importLayout(profile.layout);
    if(kind!=='layout'){
      if(profile.appearance)window.__comfierLayoutEditor?.importAppearance(profile.appearance);
      if(profile.dimensions)window.__comfierUiEditorModel?.setGlobal(profile.dimensions);
      roles.forEach(({id})=>{localStorage.setItem(STORE+id+'.transparency',String(colors[id]?(profile.transparency?.[id]||0):0));if(colors[id])localStorage.setItem(STORE+id,colors[id]);else localStorage.removeItem(STORE+id)});
      assigned.clear();roles.forEach(({id})=>{state[id]=colors[id]||defaults[id];transparency[id]=colors[id]?(profile.transparency?.[id]||0):0;if(colors[id])assigned.add(id)});paintRoles();renderRoles();
    }
    if(profile.id)localStorage.setItem('comfier.theme.active.v1',profile.id);else localStorage.removeItem('comfier.theme.active.v1');return true;
  }
  function dismissProfiles(){if(!profileDialog)return false;profileRequest++;profileDialog.close();profileDialog.remove();profileDialog=null;profileSelection=null;return true}
  function profileShell(title){dismissProfiles();const d=document.createElement('dialog');d.className='comfier-theme-profiles';d.innerHTML='<header><strong></strong><button type="button" aria-label="Close profiles">×</button></header><div class="theme-profile-body"></div><p class="theme-profile-status" role="status"></p><footer></footer>';d.querySelector('strong').textContent=title;d.querySelector('header button').onclick=dismissProfiles;d.addEventListener('cancel',e=>{e.preventDefault();dismissProfiles()});document.body.appendChild(d);profileDialog=d;d.showModal();return d}
  function action(host,label,fn){const b=document.createElement('button');b.type='button';b.textContent=label;b.onclick=fn;host.appendChild(b);return b}
  function saveAs(existing=null){const d=profileShell(existing?'Rename theme':'Save theme as');const body=d.querySelector('.theme-profile-body'),input=document.createElement('input');input.type='text';input.maxLength=80;input.placeholder='Theme name';input.setAttribute('aria-label','Theme name');input.value=existing?.name||'';body.appendChild(input);const save=()=>{try{const name=input.value.trim();if(!name)throw Error('Enter a theme name.');const list=localProfiles();if(list.some(p=>p.name.toLowerCase()===name.toLowerCase()&&p.id!==existing?.id))throw Error('That name is already saved.');if(existing){const p=list.find(p=>p.id===existing.id);if(!p)throw Error('Theme no longer exists.');p.name=name}else{list.push({...exportProfile(name),id:globalThis.crypto?.randomUUID?.()||Date.now()+'-'+Math.random().toString(36).slice(2),savedAt:new Date().toISOString()})}writeProfiles(list);if(!existing)localStorage.setItem('comfier.theme.active.v1',list[list.length-1].id);if(existing)showProfiles();else dismissProfiles()}catch(e){d.querySelector('.theme-profile-status').textContent=e.message}};action(d.querySelector('footer'),'Save',save);if(!existing)action(d.querySelector('footer'),'Share',()=>shareProfile(input.value,d));action(d.querySelector('footer'),'Cancel',()=>existing?showProfiles():dismissProfiles());input.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();save()}})}
  const MAX_THEME_BYTES=256*1024;
  function importProfile(text,fallback='Imported theme',kind='colors'){
    if(new Blob([text]).size>MAX_THEME_BYTES)throw Error('Theme file is too large (maximum 256 KB).');
    const value=JSON.parse(text),colors=profileColors(value);if(kind!=='colors'&&value.layout)window.__comfierLayoutEditor?.validate(value.layout);
    const name=(typeof value.name==='string'&&value.name.trim()?value.name.trim():fallback).slice(0,80);
    const profile={schemaVersion:1,name,colors,transparency:Object.fromEntries(Object.keys(colors).map(id=>[id,value.transparency?.[id]||0])),id:globalThis.crypto?.randomUUID?.()||Date.now()+'-'+Math.random().toString(36).slice(2),savedAt:new Date().toISOString()};
    const list=localProfiles();let suffix=2;while(list.some(p=>p.name.toLowerCase()===profile.name.toLowerCase()))profile.name=name.slice(0,70)+' ('+(suffix++)+')';
    if(value.appearance&&window.__comfierLayoutEditor){window.__comfierLayoutEditor.validateAppearance(value.appearance);profile.appearance=value.appearance}if(value.dimensions&&window.__comfierUiEditorModel){profile.dimensions=window.__comfierUiEditorModel.dimensions(value.dimensions)}
    if(value.layout&&window.__comfierLayoutEditor){window.__comfierLayoutEditor.validate(value.layout);profile.layout=value.layout}writeProfiles([...list,profile]);loadProfile(profile,kind);return profile;
  }
  function chooseProfileParts(profile,apply){
    if(!profile.layout||!window.__comfierLayoutEditor){apply('colors');return}
    const d=profileShell('Apply theme');d.querySelector('.theme-profile-body').textContent='Choose which parts to apply.';
    for(const [title,kind]of [['Colors only','colors'],['Layout only','layout'],['Both','both']])action(d.querySelector('footer'),title,()=>{try{apply(kind);dismissProfiles()}catch(e){d.querySelector('.theme-profile-status').textContent=e.message}});
  }
  function uploadProfile(d){
    const input=document.createElement('input');input.type='file';input.accept='.json,application/json';input.hidden=true;d.appendChild(input);
    input.addEventListener('cancel',()=>input.remove(),{once:true});
    input.addEventListener('change',async()=>{try{const file=input.files?.[0];if(!file)return;if(file.size>MAX_THEME_BYTES)throw Error('Theme file is too large (maximum 256 KB).');const text=await file.text();if(profileDialog!==d)return;const value=JSON.parse(text);profileColors(value);chooseProfileParts(value,kind=>{importProfile(text,file.name.replace(/\.json$/i,''),kind);dismissProfiles()})}catch(e){if(profileDialog===d)d.querySelector('.theme-profile-status').textContent=e.message}finally{input.remove()}},{once:true});input.click();
  }
  function shareProfile(name,d){
    try{const profile=exportProfile(name.trim()||'ComfierUI Theme'),json=JSON.stringify(profile,null,2),filename=profile.name.replace(/[\\/:*?"<>|\x00-\x1f]/g,'_').slice(0,80)+'.json';
      if(window.ComfyRemoteDownloads?.saveThemeJson){window.ComfyRemoteDownloads.saveThemeJson(json,filename);return}
      const url=URL.createObjectURL(new Blob([json],{type:'application/json'})),a=document.createElement('a');a.href=url;a.download=filename;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),60000);
    }catch(e){d.querySelector('.theme-profile-status').textContent=e.message}
  }
  async function showProfiles(){
    const d=profileShell('Theme profiles'),body=d.querySelector('.theme-profile-body'),foot=d.querySelector('footer'),status=d.querySelector('.theme-profile-status');const token=++profileRequest;
    const load=action(foot,'Load',()=>{try{if(profileSelection){const profile=profileSelection.profile;chooseProfileParts(profile,kind=>{loadProfile(profile,kind);dismissProfiles()})}}catch(e){status.textContent=e.message}});
    const rename=action(foot,'Rename',()=>{if(profileSelection?.source==='device')saveAs(profileSelection.profile)});
    const del=action(foot,'Delete',()=>{if(profileSelection?.source!=='device')return;const selectedProfile=profileSelection.profile;const confirm=profileShell('Delete theme?');confirm.querySelector('.theme-profile-body').textContent=selectedProfile.name;action(confirm.querySelector('footer'),'Delete',()=>{try{writeProfiles(localProfiles().filter(p=>p.id!==selectedProfile.id));showProfiles()}catch(e){confirm.querySelector('.theme-profile-status').textContent=e.message}});action(confirm.querySelector('footer'),'Cancel',showProfiles)});
    const extra=document.createElement('div');extra.className='theme-profile-extra';foot.after(extra);action(extra,'Upload',()=>uploadProfile(d));
    load.disabled=rename.disabled=del.disabled=true;
    function section(label,profiles,source){const h=document.createElement('h3');h.textContent=label;body.appendChild(h);if(!profiles.length){const p=document.createElement('p');p.textContent='No saved themes';body.appendChild(p)}profiles.forEach(profile=>{const b=action(body,profile.name,()=>{profileSelection={profile,source};body.querySelectorAll('button').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));load.disabled=false;rename.disabled=del.disabled=source!=='device'});b.setAttribute('aria-pressed','false')})}
    section('Device',localProfiles(),'device');
    const provider=companionProvider||(window.ComfierUICompanion?.listThemes?{list:()=>window.ComfierUICompanion.listThemes()}:null);
    if(!provider){status.textContent='Host themes require Companion 0.4.4 or newer. Upload is available on this device.';return}
    status.textContent='Loading Companion themes…';try{const profiles=await Promise.race([provider.list(),new Promise((_,reject)=>setTimeout(()=>reject(Error('Companion request timed out.')),5000))]);if(token!==profileRequest||profileDialog!==d)return;section('Companion',profiles.filter(p=>{try{return typeof p.name==='string'&&!!profileColors(p)}catch(_){return false}}),'companion');status.textContent='Companion themes can be loaded and saved to this device.'}catch(e){if(profileDialog===d)status.textContent=e.message}
  }

  function drawWheel(){
    const canvas=page?.querySelector('.theme-wheel');if(!canvas)return;
    const size=220,dpr=Math.max(1,Math.min(2,devicePixelRatio||1)),pixels=Math.round(size*dpr);
    if(canvas.width!==pixels||canvas.height!==pixels){canvas.width=pixels;canvas.height=pixels;wheelCache=null}
    const ctx=canvas.getContext('2d'),cx=pixels/2,r=cx-2*dpr;
    if(!wheelCache||wheelCache.v!==hsv.v){const img=ctx.createImageData(pixels,pixels);for(let y=0;y<pixels;y++)for(let x=0;x<pixels;x++){const dx=x-cx,dy=y-cx,dist=Math.hypot(dx,dy),i=(y*pixels+x)*4;if(dist>r)continue;const h=(Math.atan2(dy,dx)*180/Math.PI+360)%360,[rr,gg,bb]=hexRgb(hsvHex(h,dist/r,hsv.v));img.data[i]=rr;img.data[i+1]=gg;img.data[i+2]=bb;img.data[i+3]=255}wheelCache={v:hsv.v,img}}
    ctx.putImageData(wheelCache.img,0,0);const a=hsv.h*Math.PI/180,px=cx+Math.cos(a)*hsv.s*r,py=cx+Math.sin(a)*hsv.s*r;
    ctx.beginPath();ctx.arc(px,py,7*dpr,0,Math.PI*2);ctx.strokeStyle='#fff';ctx.lineWidth=3*dpr;ctx.stroke();ctx.beginPath();ctx.arc(px,py,9*dpr,0,Math.PI*2);ctx.strokeStyle='#000';ctx.lineWidth=dpr;ctx.stroke();
  }
  function wheelPick(event){const r=event.currentTarget.getBoundingClientRect(),x=event.clientX-r.left-r.width/2,y=event.clientY-r.top-r.height/2,rad=Math.min(r.width,r.height)/2-2;hsv.h=(Math.atan2(y,x)*180/Math.PI+360)%360;hsv.s=Math.min(1,Math.hypot(x,y)/rad);setSelected(hsvHex(hsv.h,hsv.s,hsv.v))}
  function renderRecents(){const host=page?.querySelector('.theme-recents');if(!host)return;host.replaceChildren();const list=recents();if(!list.length){host.innerHTML='<span class="theme-empty">Assigned colors appear here</span>';return}list.forEach(color=>{const b=document.createElement('button');b.type='button';b.className='theme-recent';b.style.background=color;b.setAttribute('aria-label','Select recent color '+color);b.addEventListener('click',()=>setSelected(color));host.appendChild(b)})}
  function renderRoles(){
    const host=page?.querySelector('.theme-roles');if(!host)return;
    if(!host.children.length){
      roles.forEach(({id,label})=>{const b=document.createElement('button');b.type='button';b.className='theme-role';b.dataset.themeRole=id;b.innerHTML='<span class="theme-role-swatch" aria-hidden="true"></span><span>'+label+'</span>';b.addEventListener('click',()=>applyRole(id));host.appendChild(b)});
      for(const [label,fn] of [['Save',()=>saveAs()],['Profiles',showProfiles]]){const b=document.createElement('button');b.type='button';b.className='theme-role';b.dataset.themeAction=label.toLowerCase();b.textContent=label;b.addEventListener('click',fn);host.appendChild(b)}
      const b=document.createElement('button');b.type='button';b.className='theme-role theme-reset';b.textContent='Reset';b.setAttribute('aria-label','Reset theme to stock settings');b.addEventListener('click',reset);host.appendChild(b);
    }
    host.querySelectorAll('[data-theme-role]').forEach(b=>{const id=b.dataset.themeRole;b.querySelector('.theme-role-swatch').style.background=assigned.has(id)?colorPaint(id):manifest.nativeSwatches[id];b.title=assigned.has(id)?state[id]:'ComfyUI default';b.setAttribute('aria-label',roles.find(r=>r.id===id).label+', current '+(assigned.has(id)?state[id]:'ComfyUI default'))});
  }
  function releaseWheel(){if(wheelPointer!==null){try{page?.querySelector('.theme-wheel')?.releasePointerCapture?.(wheelPointer)}catch(_){}wheelPointer=null}}
  // All editor surfaces use the same HSV conversion and root color wheel.
  function createPicker(initial='#ffffff',onChange=null){
    let color=normalize(String(initial).slice(0,7))||'#ffffff',value=rgbHsv(color),alpha=/^#[0-9a-f]{8}$/i.test(initial)?Math.round((1-parseInt(initial.slice(7),16)/255)*100):0,pointer=null,cache=null;
    const el=document.createElement('div');el.className='theme-picker';
    el.innerHTML='<canvas class="theme-wheel" aria-label="Color wheel"></canvas><label>Brightness <input class="picker-value" type="range" min="0" max="100"></label><label>Transparency <input class="picker-alpha" type="range" min="0" max="100" value="0"></label><label>Hex <input class="picker-hex" type="text" maxlength="6" aria-label="Selected color hex"></label>';
    const canvas=el.querySelector('canvas'),bright=el.querySelector('.picker-value'),hex=el.querySelector('.picker-hex');
    function draw(){const px=220,dpr=Math.min(2,devicePixelRatio||1),pixels=Math.round(px*dpr);canvas.width=canvas.height=pixels;const ctx=canvas.getContext('2d');if(!ctx)return;const center=pixels/2,r=center-2*dpr;if(!cache||cache.v!==value.v){const img=ctx.createImageData(pixels,pixels);for(let y=0;y<pixels;y++)for(let x=0;x<pixels;x++){const dx=x-center,dy=y-center,dist=Math.hypot(dx,dy);if(dist>r)continue;const rgb=hexRgb(hsvHex((Math.atan2(dy,dx)*180/Math.PI+360)%360,dist/r,value.v)),i=(y*pixels+x)*4;img.data[i]=rgb[0];img.data[i+1]=rgb[1];img.data[i+2]=rgb[2];img.data[i+3]=255}cache={v:value.v,img}}ctx.putImageData(cache.img,0,0);const a=value.h*Math.PI/180;ctx.beginPath();ctx.arc(center+Math.cos(a)*value.s*r,center+Math.sin(a)*value.s*r,7*dpr,0,Math.PI*2);ctx.strokeStyle='#fff';ctx.lineWidth=3*dpr;ctx.stroke();ctx.strokeStyle='#000';ctx.lineWidth=dpr;ctx.stroke()}
    function update(){color=hsvHex(value.h,value.s,value.v);hex.value=color.slice(1).toUpperCase();bright.value=Math.round(value.v*100);draw();onChange?.(paint())}
    function paint(){return color+(alpha?Math.round(255*(1-alpha/100)).toString(16).padStart(2,'0'):'')}
    function pick(e){const r=canvas.getBoundingClientRect(),x=e.clientX-r.left-r.width/2,y=e.clientY-r.top-r.height/2;value.h=(Math.atan2(y,x)*180/Math.PI+360)%360;value.s=Math.min(1,Math.hypot(x,y)/(Math.min(r.width,r.height)/2-2));update()}
    canvas.onpointerdown=e=>{e.preventDefault();pointer=e.pointerId;canvas.setPointerCapture(pointer);pick(e)};canvas.onpointermove=e=>{if(pointer===e.pointerId)pick(e)};const stop=()=>{pointer=null};canvas.onpointerup=canvas.onpointercancel=canvas.onlostpointercapture=stop;
    bright.oninput=()=>{value.v=Number(bright.value)/100;update()};el.querySelector('.picker-alpha').value=alpha;el.querySelector('.picker-alpha').oninput=e=>{alpha=Number(e.target.value);onChange?.(paint())};hex.oninput=()=>{const next=normalize(hex.value);hex.setCustomValidity(next?'':'Enter six hex digits.');if(next){color=next;value=rgbHsv(next);bright.value=Math.round(value.v*100);draw();onChange?.(paint())}};update();return{element:el,value:paint};
  }
  function renderDimensions(host){const model=window.__comfierUiEditorModel;if(!model)return;host.replaceChildren();for(const [kind,title]of [['container','Containers'],['button','Buttons']]){const h=document.createElement('h3');h.textContent=title;host.appendChild(h);for(const [key,label]of [['frame','Frame thickness (px)'],['curve','Corner curve (px)'],...(kind==='button'?[['height','Height (px)'],['width','Default width (px)'],['iconSize','Icon size (px)']]:[['length','Connected bar length (px)'],['thickness','Connected bar thickness (px)']])]){const row=document.createElement('label');row.textContent=label;const input=document.createElement('input');input.type='number';input.min=model.ranges[key][0];input.max=model.ranges[key][1];input.value=model.getGlobal()[kind][key]??'';input.placeholder='Auto';input.setAttribute('aria-label',title+' '+label);input.onchange=()=>{const next=model.getGlobal();if(input.value==='')delete next[kind][key];else{const n=Number(input.value);if(n<Number(input.min)||n>Number(input.max)){input.reportValidity();return}next[kind][key]=n}edit(()=>model.setGlobal(next))};row.appendChild(input);host.appendChild(row)}if(kind==='button'){const row=document.createElement('label');row.textContent='Circle / capsule edges';const input=document.createElement('input');input.type='checkbox';input.checked=model.getGlobal().button.round||false;input.onchange=()=>{const next=model.getGlobal();next.button.round=input.checked;edit(()=>model.setGlobal(next))};row.appendChild(input);host.appendChild(row)}}const note=document.createElement('p');note.textContent='Explicit container and button values keep their overrides.';host.appendChild(note);action(host,'Reset global dimensions',()=>{edit(()=>model.setGlobal(model.base));renderDimensions(host)})}
  function updateActiveProfile(){const id=localStorage.getItem('comfier.theme.active.v1');if(!id)return;const list=localProfiles(),p=list.find(v=>v.id===id);if(!p)return;Object.assign(p,exportProfile(p.name),{savedAt:new Date().toISOString()});writeProfiles(list)}

  function build(){
    const el=document.createElement('section');el.className='comfier-theme-studio';el.hidden=true;
    el.innerHTML=`<header><button type="button" class="theme-back" aria-label="Back to UI Editor">‹</button><strong>Appearance</strong></header><div class="theme-picker"><canvas class="theme-wheel" aria-label="Color wheel"></canvas><label>Brightness <input class="theme-value" type="range" min="0" max="100" value="100"></label><label>Transparency <input class="theme-transparency" aria-label="Transparency" type="range" min="0" max="100" value="0"><output class="theme-transparency-value">0%</output></label><div class="theme-exact"><span class="theme-previous" title="Previous color"></span><span class="theme-current" title="Current color"></span><label>#<input class="theme-hex" type="text" inputmode="text" maxlength="6" pattern="[0-9a-fA-F]{6}" aria-label="Selected color hex"></label></div></div><h3>Recent colors</h3><div class="theme-recents"></div><h3>Apply selected color</h3><p class="theme-note">Tap a group to assign the selected color.</p><div class="theme-roles"></div>`;
    const canvas=el.querySelector('.theme-wheel');canvas.addEventListener('pointerdown',e=>{wheelPointer=e.pointerId;canvas.setPointerCapture?.(e.pointerId);wheelPick(e)});canvas.addEventListener('pointermove',e=>{if(wheelPointer===e.pointerId&&canvas.hasPointerCapture?.(e.pointerId))wheelPick(e)});canvas.addEventListener('pointerup',releaseWheel);canvas.addEventListener('pointercancel',releaseWheel);canvas.addEventListener('lostpointercapture',()=>{wheelPointer=null});
    el.querySelector('.theme-value').addEventListener('input',e=>{hsv.v=Number(e.target.value)/100;setSelected(hsvHex(hsv.h,hsv.s,hsv.v))});
    el.querySelector('.theme-transparency').addEventListener('input',e=>selectTransparency(e.target.value));
    const input=el.querySelector('.theme-hex');input.addEventListener('input',()=>{input.value=input.value.replace(/[^0-9a-f]/gi,'').slice(0,6).toUpperCase();const v=normalize(input.value);input.setCustomValidity(v?'':'Enter six hex digits.');if(v)setSelected(v)});input.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();const v=normalize(input.value);if(v)setSelected(v);else input.reportValidity()}});
    el.querySelector('.theme-back').addEventListener('click',close);
    const colors=document.createElement('div');colors.className='theme-colors-tab';for(const child of [...el.children].slice(1))colors.appendChild(child);const dimensions=document.createElement('div');dimensions.className='theme-dimensions-tab';dimensions.hidden=true;const tabs=document.createElement('div');tabs.className='theme-tabs';const colorsButton=action(tabs,'Colors',()=>switchTab(false)),dimensionsButton=action(tabs,'Dimensions',()=>switchTab(true));function switchTab(value){colors.hidden=value;dimensions.hidden=!value;colorsButton.setAttribute('aria-pressed',String(!value));dimensionsButton.setAttribute('aria-pressed',String(value));if(value)renderDimensions(dimensions)}colorsButton.setAttribute('aria-pressed','true');el.append(tabs,colors,dimensions);page=el;setSelected(selected,false);renderRecents();renderRoles();return el;
  }
  function capture(){return{colors:Object.fromEntries(roles.filter(r=>assigned.has(r.id)).map(({id})=>[id,state[id]])),transparency:Object.fromEntries(roles.filter(r=>assigned.has(r.id)).map(({id})=>[id,transparency[id]])),dimensions:window.__comfierUiEditorModel?.getGlobal(),active:localStorage.getItem('comfier.theme.active.v1')}}
  function restore(value){assigned.clear();roles.forEach(({id})=>{state[id]=value.colors[id]||defaults[id];transparency[id]=value.colors[id]?(value.transparency[id]||0):profileTransparency[id]||0;if(value.colors[id]){assigned.add(id);localStorage.setItem(STORE+id,state[id]);localStorage.setItem(STORE+id+'.transparency',String(transparency[id]))}else{localStorage.removeItem(STORE+id);localStorage.removeItem(STORE+id+'.transparency')}});if(value.dimensions)window.__comfierUiEditorModel?.setGlobal(value.dimensions);if(value.active)localStorage.setItem('comfier.theme.active.v1',value.active);else localStorage.removeItem('comfier.theme.active.v1');paintRoles();renderRoles();const host=page?.querySelector('.theme-dimensions-tab');if(host&&!host.hidden)renderDimensions(host)}
  function open(){if(!window.__comfierLayoutEditor?.isEditing?.())return false;if(!page)build();if(!editorHost){editorHost=document.createElement('dialog');editorHost.className='comfier-theme-editor';editorHost.setAttribute('aria-label','Appearance');editorHost.addEventListener('cancel',e=>{e.preventDefault();close()});document.body.appendChild(editorHost)}if(page.parentElement!==editorHost)editorHost.appendChild(page);page.hidden=false;if(!editorHost.open)editorHost.showModal();setSelected(selected);return true}
  function close(){if(dismissProfiles())return true;if(!page||page.hidden)return false;releaseWheel();page.hidden=true;editorHost?.close();return true}
  function closeAll(){dismissProfiles();close();editorHost?.remove();editorHost=null}
  function mount(){const next=document.getElementById(ROOT)?.querySelector('.ui-zoom-panel');next?.querySelectorAll('.ui-theme-launch-row').forEach(el=>el.remove());next?.querySelectorAll('.ui-accent-row,.ui-font-row').forEach(row=>row.hidden=true);return !!next}
  const style=document.createElement('style');style.id='comfier-theme-studio-style';style.textContent=`
html:root body dialog:is(.comfier-theme-profiles,.comfier-theme-editor){--comfier-ui-font:#fff!important;--comfier-button-bg:#fff!important;--comfier-control-background:#fff!important;--comfier-icon-color:#000!important;--comfier-button-frame:#fff!important;opacity:1!important;-webkit-text-fill-color:#fff!important;width:min(440px,calc(100vw - 24px));max-height:calc(100dvh - 8px);box-sizing:border-box;border:1px solid white;border-radius:10px;padding:14px;background:#000!important;color:#fff!important}
.comfier-theme-profiles[open]{display:flex;flex-direction:column;gap:10px}
:is(.comfier-theme-profiles,.comfier-theme-editor)::backdrop{background:rgba(0,0,0,.45)}
.comfier-theme-profiles header{display:flex;align-items:center;justify-content:space-between;gap:10px;flex-shrink:0}
.comfier-theme-profiles .theme-profile-body{overflow:auto;min-height:0;overscroll-behavior:contain;display:flex;flex-direction:column;gap:8px}
.comfier-theme-profiles footer{display:flex;gap:8px;flex-shrink:0}
.comfier-theme-profiles footer button{flex:1}
.comfier-theme-profiles .theme-profile-extra{display:flex;justify-content:center;gap:8px;flex-shrink:0}
.comfier-theme-profiles .theme-profile-extra button{flex:0 1 calc((100% - 16px)/3)}
html:root body dialog:is(.comfier-theme-profiles,.comfier-theme-editor) :is(button:not(.theme-recent),input){background:#fff!important;color:#000!important;-webkit-text-fill-color:#000!important;border:1px solid #fff!important;border-radius:6px;padding:8px;min-width:0;font:inherit}
html:root body dialog:is(.comfier-theme-profiles,.comfier-theme-editor) :is(p,h3,strong,div,span,label,output):not(:where(button *)){color:#fff!important;-webkit-text-fill-color:#fff!important}
html:root body dialog.comfier-theme-profiles button:disabled{opacity:1!important;color:#555!important;-webkit-text-fill-color:#555!important}
html:root body dialog.comfier-theme-profiles input::placeholder{color:#555!important;-webkit-text-fill-color:#555!important;opacity:1!important}
.comfier-theme-profiles button[aria-pressed="true"]{outline:2px solid white;outline-offset:2px;margin:3px}
.theme-profile-status{font-size:12px;margin:0;flex-shrink:0}
.ui-accent-row[hidden],.ui-font-row[hidden]{display:none!important}
.ui-zoom-panel.comfier-theme-studio-open>:not(.comfier-theme-studio){display:none!important;visibility:hidden!important;pointer-events:none!important}
.comfier-theme-editor{overflow:auto;overscroll-behavior:contain;touch-action:pan-y}.comfier-theme-editor .theme-back{flex:none}.comfier-theme-editor .theme-tabs button{width:auto;height:auto;min-height:36px}
.comfier-theme-studio{grid-column:1/-1!important;width:100%;min-width:0;box-sizing:border-box;touch-action:pan-y}
.comfier-theme-studio[hidden]{display:none!important}
.comfier-theme-studio>header{display:flex;align-items:center;gap:10px;margin-bottom:8px;font-size:16px}
.theme-back{width:38px;height:38px;border:1px solid #fff;border-radius:8px;font-size:28px;line-height:1}
.theme-picker{display:flex;flex-direction:column;align-items:center;gap:9px}
.theme-tabs{display:flex;gap:8px;margin-bottom:12px}.theme-tabs button{flex:1}.theme-tabs [aria-pressed=true]{outline:2px solid #fff;outline-offset:2px}.theme-colors-tab[hidden],.theme-dimensions-tab[hidden]{display:none!important}.theme-dimensions-tab{display:flex;flex-direction:column;gap:10px}.theme-dimensions-tab button{width:auto;min-height:36px;padding:8px;background:#fff!important;color:#000!important;-webkit-text-fill-color:#000!important}.theme-dimensions-tab label{display:flex;justify-content:space-between;align-items:center;gap:8px}.theme-dimensions-tab input[type=number]{width:7ch;background:white;color:black!important;-webkit-text-fill-color:black!important;padding:6px;border:1px solid white;border-radius:4px}
.theme-wheel{display:block;width:min(220px,100%);height:auto;max-width:100%;touch-action:none}
.theme-picker>label{display:flex;align-items:center;gap:8px;width:min(260px,100%)}
.theme-picker input[type="range"]{flex:1;min-width:0}
.theme-transparency-value{min-width:3ch;text-align:right;font-size:11px;color:#fff!important;-webkit-text-fill-color:#fff!important}
.theme-exact{display:flex;align-items:center;justify-content:center;gap:8px}
.theme-current,.theme-previous{display:block;width:30px;height:30px;border:1px solid #888;border-radius:6px}
.theme-exact label{display:flex;align-items:center}
.theme-hex{width:6.5ch;min-width:6.5ch;max-width:6.5ch;box-sizing:content-box;padding:6px;border:1px solid #fff;border-radius:6px;font:14px monospace;text-transform:uppercase}
.comfier-theme-studio h3{margin:12px 0 6px;font-size:12px;text-transform:uppercase}
.theme-recents{display:flex;gap:8px;min-height:34px;align-items:center;overflow-x:auto}
.theme-recent{flex:0 0 32px;width:32px;height:32px;border:1px solid #888;border-radius:6px}
.theme-empty{font-size:12px}
.theme-roles{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:7px}
.theme-role{display:flex;width:auto!important;height:auto!important;white-space:normal!important;align-items:center;gap:4px;min-width:0;min-height:40px;padding:5px 5px;font-size:11px;overflow-wrap:normal;word-break:normal;border:1px solid #fff;border-radius:7px;text-align:left;touch-action:manipulation}
.theme-reset{grid-column:1/-1;justify-content:center}
.theme-role>span:not(.theme-role-swatch){min-width:0;flex:1 1 auto}.theme-role-swatch{flex:0 0 14px;width:14px;height:14px;border:1px solid #888;border-radius:4px}
.theme-note{font-size:11px;line-height:1.35;margin:6px 0 10px}
html:root body :is(#comfier-ui-zoom-test,.comfier-app-settings-native-panel){--comfier-ui-font:#fff!important;--comfier-accent:#fff!important;--comfier-accent-text:#000!important;--comfier-icon-color:#000!important;--comfier-button-bg:#fff!important;--comfier-button-frame:#fff!important;color:#fff!important}
html:root body .comfier-early-floating-panel:is(.comfier-app-settings-native-panel,:has(.comfier-app-settings-native-panel)){background:rgba(0,0,0,.75)!important;border-color:rgba(255,255,255,.3)!important}
html:root body .comfier-app-settings-native-panel,html:root body #comfier-ui-zoom-test .ui-zoom-panel{background:transparent!important}
html:root body #comfier-ui-zoom-test .ui-zoom-panel :is(label,span,div,strong,h3,p){color:#fff!important;-webkit-text-fill-color:#fff!important}
html:root body #comfier-ui-zoom-test .ui-zoom-panel button:not(.theme-recent){--comfier-ui-font:#000!important;background:#fff!important;color:#000!important;-webkit-text-fill-color:#000!important;border-color:#fff!important;box-shadow:none!important}
html:root body #comfier-ui-zoom-test .ui-zoom-panel button :is(span,i,svg){color:#000!important;-webkit-text-fill-color:#000!important}
html:root body #comfier-ui-zoom-test .ui-zoom-panel input[type="text"]{--comfier-ui-font:#000!important;background:#fff!important;color:#000!important;-webkit-text-fill-color:#000!important;border-color:#fff!important}
html:root body #comfier-ui-zoom-test .ui-zoom-panel :is(input[type="range"],input[type="checkbox"]){accent-color:#fff!important}
`;(document.head||document.documentElement).appendChild(style);
  const semanticStyle=document.createElement('style');semanticStyle.id='comfier-theme-semantic-style';semanticStyle.textContent=manifest.compile();(document.head||document.documentElement).appendChild(semanticStyle);
  function installBack(){if(backOff||!window.__comfierBack)return;backOff=window.__comfierBack.register('theme-settings',55,close)}
  function refresh(){paintRoles();mount();installBack()}
  window.__comfierThemeStudio={capture,restore,open,close,closeAll,mount,refresh,reset,applyRole,createPicker,updateActiveProfile,exportProfile,loadProfile,importProfile,localProfiles,showProfiles,saveAs,setCompanionProvider(provider){companionProvider=provider&&typeof provider.list==='function'?provider:null},selectTransparency,getTransparency:()=>({...transparency}),getAssignedColor:key=>assigned.has(key)?colorPaint(key):null,getState:()=>({...state}),isAssigned:key=>assigned.has(key),setSelected};
  window.__comfierSettingsRows?.register('theme-studio',mount);refresh();
})();
