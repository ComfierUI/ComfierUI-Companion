const DATA_PATHS = [
  /^\/api\/(?:object_info(?:\/.*)?|models(?:\/.*)?|embeddings|features)(?:\?|$)/,
  /^\/(?:object_info(?:\/.*)?|models(?:\/.*)?|embeddings|features)(?:\?|$)/
];

function installParsedDataBroker(){
  if(window.__comfierParsedDataBroker) return window.__comfierParsedDataBroker;
  const nativeFetch = window.fetch.bind(window);
  const cache = new Map();
  const pending = new Map();
  const stats = {hits:0, misses:0, parses:0, coalesced:0};
  const keyFor = input => {
    try {
      const raw = typeof input === 'string' ? input : (input && input.url) || '';
      const u = new URL(raw, location.href);
      if(u.origin !== location.origin) return null;
      const path = u.pathname + u.search;
      return DATA_PATHS.some(re => re.test(path)) ? path : null;
    } catch (_) { return null; }
  };
  const wrapped = (entry) => {
    const response = new Response(entry.text, {status:entry.status, statusText:entry.statusText, headers:entry.headers});
    return new Proxy(response, {
      get(target, prop, recv){
        if(prop === 'json') return async()=>entry.json;
        if(prop === 'text') return async()=>entry.text;
        if(prop === 'clone') return ()=>wrapped(entry);
        const value = Reflect.get(target, prop, recv);
        return typeof value === 'function' ? value.bind(target) : value;
      }
    });
  };
  window.fetch = async function(input, init){
    const method = String((init && init.method) || (input && input.method) || 'GET').toUpperCase();
    const key = method === 'GET' ? keyFor(input) : null;
    if(!key) return nativeFetch(input, init);
    const cached = cache.get(key);
    if(cached){ stats.hits++; return wrapped(cached); }
    if(pending.has(key)){ stats.coalesced++; return wrapped(await pending.get(key)); }
    stats.misses++;
    const task = (async()=>{
      const response = await nativeFetch(input, init);
      if(!response.ok) return {text:await response.clone().text(), json:null, status:response.status, statusText:response.statusText, headers:new Headers(response.headers), passthrough:response};
      const text = await response.clone().text();
      let json;
      try { json = JSON.parse(text); stats.parses++; } catch (_) { return {text, json:null, status:response.status, statusText:response.statusText, headers:new Headers(response.headers)}; }
      const entry = {text, json, status:response.status, statusText:response.statusText, headers:new Headers(response.headers)};
      cache.set(key, entry);
      return entry;
    })();
    pending.set(key, task);
    try {
      const entry = await task;
      if(entry.passthrough) return entry.passthrough;
      return wrapped(entry);
    } finally { pending.delete(key); }
  };
  const api = Object.freeze({
    snapshot:()=>Object.freeze({...stats, entries:cache.size}),
    clear:()=>cache.clear()
  });
  window.__comfierParsedDataBroker = api;
  return api;
}

export async function prepare(){
  installParsedDataBroker();
  await import('./display/comfier_runtime.js');
  await import('./display/comfier_ui_adapters.js');
  window.__comfierCompanionDisplayRuntime=Object.freeze({ready:true,version:'0.4.4',parsedDataBroker:true});
  return window.__comfierCompanionDisplayRuntime;
}
