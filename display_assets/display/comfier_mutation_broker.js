(function(){
'use strict';
  const NativeMutationObserver=window.MutationObserver;
  // Companion Pre-Processor uses one document-wide native observer and fans
  // coalesced mutation batches out to the proven visual shapers.  This keeps
  // the existing behavior while avoiding dozens of independent whole-DOM
  // observers waking the WebView for the same change.
  if(!window.__comfierMutations&&NativeMutationObserver){
    const subscriptions=new Set(),pending=[];
    let frame=0,nativeCallbacks=0,flushes=0,deliveries=0,recordCount=0;
    function inside(target,node,subtree){
      if(!target||!node)return false;
      if(target===node)return true;
      return !!(subtree&&target.contains&&target.contains(node));
    }
    function acceptsTarget(target,o,record){
      if(!inside(target,record.target,!!o.subtree))return false;
      if(record.type==='childList')return !!o.childList;
      if(record.type==='attributes'){
        if(!o.attributes)return false;
        return !o.attributeFilter||o.attributeFilter.includes(record.attributeName);
      }
      if(record.type==='characterData')return !!o.characterData;
      return false;
    }
    function accepts(sub,record){
      for(const [target,options] of sub.targets)if(acceptsTarget(target,options,record))return true;
      return false;
    }
    function flush(){
      frame=0;if(!pending.length)return;flushes++;
      const records=pending.splice(0);recordCount+=records.length;
      for(const sub of Array.from(subscriptions)){
        if(!sub.active||!sub.targets.size||sub.delivery==='immediate')continue;
        const filtered=sub.records.splice(0);
        if(!filtered.length)continue;deliveries++;
        try{sub.callback(filtered,sub.api)}catch(error){console.warn('COMFIER shared mutation subscriber',error)}
      }
    }
    function schedule(){if(frame)return;frame=requestAnimationFrame(flush)}
    const native=new NativeMutationObserver(records=>{
      nativeCallbacks++;
      const immediate=[];
      // Match at arrival, before callbacks can replace registrations. Frame
      // queues belong to the subscription so disconnect/remount drops old work.
      for(const sub of Array.from(subscriptions)){
        if(!sub.active||!sub.targets.size)continue;
        const filtered=records.filter(record=>accepts(sub,record));
        if(!filtered.length)continue;
        if(sub.delivery==='immediate')immediate.push({sub,filtered,generation:sub.generation});
        else sub.records.push(...filtered);
      }
      // Critical ownership subscribers can reconcile in the observer microtask,
      // before the browser gets a chance to paint a transient stock/dual-rail state.
      for(const {sub,filtered,generation} of immediate){
        if(!sub.active||sub.generation!==generation)continue;deliveries++;
        try{sub.callback(filtered,sub.api)}catch(error){console.warn('COMFIER immediate mutation subscriber',error)}
      }
      pending.push(...records);schedule();
    });
    native.observe(document.documentElement,{subtree:true,childList:true,attributes:true,characterData:true});
    function create(callback,delivery='frame'){
      const sub={callback,targets:new Map(),records:[],generation:0,active:false,api:null,delivery:delivery==='immediate'?'immediate':'frame'};
      const api={
        observe(target,options){
          if(!target)throw new TypeError('Mutation target is required');
          const copy={...(options||{})};if(copy.attributeFilter)copy.attributeFilter=Array.from(copy.attributeFilter);
          sub.targets.set(target,copy);if(!sub.active){sub.active=true;subscriptions.add(sub)}
        },
        disconnect(){sub.active=false;sub.generation++;subscriptions.delete(sub);sub.targets.clear();sub.records.length=0},
        takeRecords(){return sub.records.splice(0)}
      };
      sub.api=api;return api;
    }
    window.__comfierMutations=Object.freeze({
      create,
      snapshot(){return{nativeObservers:1,subscriptions:subscriptions.size,targets:[...subscriptions].reduce((n,s)=>n+s.targets.size,0),nativeCallbacks,flushes,deliveries,records:recordCount,pending:pending.length}},
      flush
    });
  }

})();
