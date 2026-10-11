(()=>{
'use strict';
if(window.__comfierCloudBootstrapInstalled)return;
window.__comfierCloudBootstrapInstalled=true;
const key=String(window.__COMFIER_CLOUD_API_KEY||'');
function rewrite(input){
  try{
    const base=location.href;
    const u=new URL(input instanceof URL?input.href:typeof input==='string'?input:(input&&input.url)||'',base);
    if(u.host!==location.host)return u;
    if(u.pathname.startsWith('/__comfier_cloud__/api/'))u.pathname=u.pathname.slice('/__comfier_cloud__'.length);
    else if(u.pathname==='/__comfier_cloud__/api')u.pathname='/api';
    else if(u.pathname.startsWith('/__comfier_cloud__/view'))u.pathname=u.pathname.slice('/__comfier_cloud__'.length);
    else if(u.pathname==='/__comfier_cloud__/ws'||u.pathname.startsWith('/__comfier_cloud__/ws/'))u.pathname=u.pathname.slice('/__comfier_cloud__'.length);
    return u;
  }catch(_){return null}
}
const nativeFetch=window.fetch?.bind(window);
if(nativeFetch){
  window.fetch=async function(input,init){
    const u=rewrite(input);
    if(!u)return nativeFetch(input,init);
    const same=u.origin==='https://cloud.comfy.org';
    const headers=new Headers((init&&init.headers)||(input instanceof Request?input.headers:undefined)||{});
    if(same&&key)headers.set('X-API-Key',key);
    const next={...(init||{}),headers};
    const target=input instanceof Request?new Request(u.toString(),input):u.toString();
    return nativeFetch(target,next);
  };
}
const NativeXHR=window.XMLHttpRequest;
if(NativeXHR){
  const open=NativeXHR.prototype.open,send=NativeXHR.prototype.send;
  NativeXHR.prototype.open=function(method,url,...rest){
    const u=rewrite(url);this.__comfierCloudUrl=u;
    return open.call(this,method,u?u.toString():url,...rest);
  };
  NativeXHR.prototype.send=function(body){
    try{if(this.__comfierCloudUrl?.origin==='https://cloud.comfy.org'&&key)this.setRequestHeader('X-API-Key',key)}catch(_){}
    return send.call(this,body);
  };
}
const NativeWS=window.WebSocket;
if(NativeWS){
  function CloudWS(url,protocols){
    const u=rewrite(url)||new URL(url,location.href);
    if(u.host==='cloud.comfy.org'&&['https:','wss:'].includes(u.protocol)){
      u.protocol='wss:';
      if(key&&!u.searchParams.has('token'))u.searchParams.set('token',key);
    }
    return protocols===undefined?new NativeWS(u.toString()):new NativeWS(u.toString(),protocols);
  }
  CloudWS.prototype=NativeWS.prototype;
  Object.setPrototypeOf(CloudWS,NativeWS);
  for(const k of ['CONNECTING','OPEN','CLOSING','CLOSED'])try{CloudWS[k]=NativeWS[k]}catch(_){}
  window.WebSocket=CloudWS;
}
})();
