/* UFU66: shared, per-property appearance and dimension model. */
(()=>{'use strict';if(window.__comfierUiEditorModel)return;
const ranges={length:[26,4096],thickness:[42,4096],frame:[1,6],curve:[0,8],iconSize:[8,64],height:[26,96],width:[26,640]},colors=['frameColor','background','iconColor'];
const monitorKeys=['cpu','ram','gpu','vram','temp'],monitorColors=['#238f25','#238f25','#126cb5','#126cb5','#53a900'];
const monitorDefaults=Object.fromEntries(monitorKeys.map((k,i)=>[k,Array(3).fill(monitorColors[i])]));
function monitorPalette(settings,key){return settings?.monitorPalettes?.[key]||monitorDefaults[key]}
function monitorLevel(value){return value<50?0:value<80?1:2}
const base={container:{frame:1,curve:6},button:{frame:1,curve:6,round:false,height:32,iconSize:18}};
const clone=v=>JSON.parse(JSON.stringify(v));
function migrateMonitors(v){
 if(!v||typeof v!=='object'||Array.isArray(v))return v;
 const next={...v};
 if(next.monitors&&typeof next.monitors==='object'&&!Array.isArray(next.monitors)&&Object.hasOwn(next.monitors,'cpuTemp')){
   if(typeof next.monitors.cpuTemp!=='boolean')throw Error('Invalid legacy CPU temperature visibility.');
   next.monitors={...next.monitors};delete next.monitors.cpuTemp;
   if(monitorKeys.every(k=>next.monitors[k]===false))next.monitors.cpu=true;
 }
 if(Array.isArray(next.monitorOrder)&&next.monitorOrder.includes('cpuTemp')){
   if(next.monitorOrder.length!==6||new Set(next.monitorOrder).size!==6)throw Error('Invalid legacy monitor order.');
   next.monitorOrder=next.monitorOrder.filter(k=>k!=='cpuTemp');
 }
 if(next.monitorPalettes&&typeof next.monitorPalettes==='object'&&!Array.isArray(next.monitorPalettes)&&Object.hasOwn(next.monitorPalettes,'cpuTemp')){
   const p=next.monitorPalettes.cpuTemp;if(!Array.isArray(p)||p.length!==3||p.some(c=>typeof c!=='string'||!/^#[0-9a-f]{6}([0-9a-f]{2})?$/i.test(c)))throw Error('Invalid legacy CPU temperature palette.');
   next.monitorPalettes={...next.monitorPalettes};delete next.monitorPalettes.cpuTemp;
 }
 return next;
}
function style(v={}){v=migrateMonitors(v);if(!v||typeof v!=='object'||Array.isArray(v))throw Error('Invalid appearance overrides.');const out={};for(const k of Object.keys(v)){const x=v[k];if(colors.includes(k)){if(typeof x!=='string'||!/^#[0-9a-f]{6}([0-9a-f]{2})?$/i.test(x))throw Error('Invalid '+k);out[k]=x.toLowerCase()}else if(ranges[k]){if(!Number.isFinite(x)||x<ranges[k][0]||x>ranges[k][1])throw Error('Invalid '+k);out[k]=x}else if(k==='monitors'){const keys=monitorKeys;if(!x||typeof x!=='object'||Array.isArray(x)||Object.keys(x).some(k=>!keys.includes(k)||typeof x[k]!=='boolean')||!keys.some(k=>x[k]!==false))throw Error('Enable at least one resource monitor.');out[k]=Object.fromEntries(keys.map(k=>[k,x[k]!==false]))}else if(k==='monitorOrder'){if(!Array.isArray(x)||x.length!==monitorKeys.length||new Set(x).size!==monitorKeys.length||x.some(key=>!monitorKeys.includes(key)))throw Error('Invalid monitor order.');out[k]=[...x]}else if(k==='monitorFlow'){if(!['horizontal','vertical'].includes(x))throw Error('Invalid monitor display.');out[k]=x}else if(k==='monitorPalettes'){if(!x||typeof x!=='object'||Array.isArray(x)||Object.keys(x).some(key=>!monitorKeys.includes(key)))throw Error('Invalid monitor palettes.');out[k]={};for(const[key,palette]of Object.entries(x)){if(!Array.isArray(palette)||palette.length!==3||palette.some(color=>typeof color!=='string'||!/^#[0-9a-f]{6}([0-9a-f]{2})?$/i.test(color)))throw Error('Each monitor needs three colors.');out[k][key]=palette.map(color=>color.toLowerCase())}}else if(k==='round'){if(typeof x!=='boolean')throw Error('Invalid button shape.');out[k]=x}else throw Error('Unknown appearance property: '+k)}return out}
function dimensions(v){if(!v||typeof v!=='object'||Array.isArray(v))throw Error('Invalid global dimensions.');return{container:style(v.container||{}),button:style(v.button||{})}}
let global=clone(base);try{const raw=localStorage.getItem('comfier.ui.dimensions.v1');if(raw)global=dimensions(JSON.parse(raw))}catch(_){}
function setGlobal(v){const next=dimensions(v);localStorage.setItem('comfier.ui.dimensions.v1',JSON.stringify(next));global=next;window.__comfierLayoutEditor?.refresh();return clone(global)}
function resolve(kind,container={},button={}){const legacy=container.appearance||{},fallback=kind==='container'?{frame:legacy.containerFrame||1,curve:legacy.containerCorners==='square'?0:6}:{frame:legacy.buttonFrame||1,curve:legacy.buttonCorners==='square'?0:6};return{...base[kind],...fallback,...global[kind],...(kind==='container'?container.containerStyle:container.buttonDefaults),...(kind==='button'?button:{})}}
function boundary(box,x,y,inset=0){return x>=box.left+inset&&x<=box.right-inset&&y>=box.top+inset&&y<=box.bottom-inset}
function destination(boxes,current,x,y){const held=boxes.find(b=>b.id===current);if(held&&boundary(held,x,y,-12))return held.id;return boxes.find(b=>boundary(b,x,y,Math.min(8,b.width/4,b.height/4)))?.id||null}
function order(entries){return [...entries].sort((a,b)=>a.left-b.left||a.top-b.top||a.id.localeCompare(b.id)).map(x=>x.id)}
window.__comfierUiEditorModel={monitorKeys,monitorDefaults,monitorPalette,monitorLevel,style,dimensions,resolve,setGlobal,getGlobal:()=>clone(global),base:clone(base),ranges,clone,boundary,destination,order};})();
