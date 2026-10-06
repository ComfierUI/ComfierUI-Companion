const DATA_PATHS = [
  /^\/api\/(?:object_info(?:\/.*)?|models(?:\/.*)?|embeddings|features)(?:\?|$)/,
  /^\/(?:object_info(?:\/.*)?|models(?:\/.*)?|embeddings|features)(?:\?|$)/
];

function installParsedDataBroker(){
  if(window.__comfierParsedDataBroker)return window.__comfierParsedDataBroker;
  const nativeFetch=window.fetch.bind(window),cache=new Map();
  const stats={hits:0,misses:0,parses:0,coalesced:0};
  const MAX_BYTES=32*1024*1024,MAX_ENTRIES=64;let bytes=0,epoch=0;
  function replay(entry){
    const response=new Response(entry.text,entry.options);
    function decorate(value){
      for(const prop of ['url','redirected','type'])Object.defineProperty(value,prop,{value:entry[prop]});
      const clone=value.clone.bind(value);Object.defineProperty(value,'clone',{value:()=>decorate(clone())});return value;
    }
    return decorate(response);
  }
  const remove=key=>{const entry=cache.get(key);if(entry){bytes-=entry.bytes;cache.delete(key)}};
  window.fetch=async function(input,init){
    const request=new Request(input,init),u=new URL(request.url),path=u.pathname.replace(/^\/api\//,'/');
    const eligible=request.method==='GET'&&u.origin===location.origin&&DATA_PATHS.some(re=>re.test(u.pathname+u.search))&&!request.signal.aborted&& !['no-store','reload','no-cache'].includes(request.cache)&&!request.headers.has('authorization')&&!request.headers.has('range')&&!request.headers.has('cache-control');
    if(!eligible)return nativeFetch(input,init);
    // Signals bypass sharing so cancellation remains local to the caller.
    if(init?.signal||(input instanceof Request))return nativeFetch(input,init);
    const key=request.url+'|'+request.credentials+'|'+[...request.headers].map(v=>v.join(':')).sort().join('|'),now=Date.now();
    const cached=cache.get(key);
    if(cached&&cached.expires>now){stats.hits++;cache.delete(key);cache.set(key,cached);return replay(cached)}
    remove(key);stats.misses++;const generation=epoch,response=await nativeFetch(input,init);
    if(!response.ok||/no-store|no-cache|private/i.test(response.headers.get('cache-control')||''))return response;
    const declared=Number(response.headers.get('content-length'));if(declared>MAX_BYTES)return response;
    const text=await response.clone().text(),size=new TextEncoder().encode(text).length;
    if(size>MAX_BYTES||generation!==epoch)return response;
    // Store bytes and return real Responses: native status/bodyUsed/clone/error behavior is preserved.
    const ttl=path==='/features'?300000:path.startsWith('/object_info')?120000:path.startsWith('/models')?45000:60000;
    for(const[k,v]of cache)if(v.expires<=now)remove(k);
    while(cache.size>=MAX_ENTRIES||bytes+size>MAX_BYTES)remove(cache.keys().next().value);
    remove(key);cache.set(key,{text,url:response.url,redirected:response.redirected,type:response.type,bytes:size,expires:now+ttl,options:{status:response.status,statusText:response.statusText,headers:[...response.headers]}});bytes+=size;
    return response;
  };
  const api=Object.freeze({snapshot:()=>Object.freeze({...stats,entries:cache.size,bytes,maxBytes:MAX_BYTES}),clear:()=>{epoch++;cache.clear();bytes=0}});
  window.__comfierParsedDataBroker=api;return api;
}

let preparation;
export function prepare(){return preparation ||= prepareOnce();}
async function prepareOnce(){
  installParsedDataBroker();
  window.__comfierLayoutLab=true;
  window.__comfierOwnedChromePending=true;
  await import('./display/comfier_mutation_broker.js');
  await import('./display/comfier_runtime.js');
  await import('./display/comfier_ui_authority.js');
  await import('./display/comfier_viewport.js');
  await import('./display/comfier_ui_adapters.js');
  window.__comfierCompanionDisplayRuntime=Object.freeze({ready:true,version:'0.4.27',parsedDataBroker:true});
  return window.__comfierCompanionDisplayRuntime;
}
