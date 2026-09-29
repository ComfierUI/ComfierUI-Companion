(function(){
  'use strict';
  if(window.__comfierGalleryVideoRepair)return;
  var attempted=new WeakMap(),timers=[],observer=null,stopped=false;var failures=new Set();
  var failureEvents=['error','stalled','abort'];
  var readinessEvents=['loadedmetadata','loadeddata','canplay'];
  function sourceOf(video){if(!video)return'';var source=video.querySelector('source');return video.currentSrc||video.src||(source&&(source.src||source.getAttribute('src')))||'';}
  function urlInfo(value){try{if(!value)return null;var url=new URL(value,document.baseURI),filename=url.searchParams.get('filename')||'';if(!filename&&url.pathname.indexOf('/api/')<0)filename=decodeURIComponent(url.pathname.split('/').pop()||'');return{url:url.href,origin:url.origin,filename:filename,subfolder:url.searchParams.get('subfolder')||''};}catch(ignore){return null;}}
  function dialogOf(video){return video&&video.closest?video.closest('[role="dialog"],.p-dialog'):null;}
  function failed(video){return!!(video&&(video.error||(video.readyState===0&&video.networkState===3)));}
  function eventVideo(event){var target=event&&event.target;if(target&&target.tagName==='VIDEO')return target;if(target&&target.tagName==='SOURCE')return target.closest('video');return null;}
  function repair(video){
    if(stopped||!video||!video.isConnected||!dialogOf(video)||!failed(video))return false;
    var broken=urlInfo(sourceOf(video));if(!broken||broken.origin!==location.origin||!broken.filename)return false;
    var matches=new Map();
    document.querySelectorAll('video').forEach(function(preview){if(preview===video||dialogOf(preview)||preview.readyState<2)return;var info=urlInfo(sourceOf(preview));if(info&&info.origin===broken.origin&&info.url!==broken.url&&info.filename===broken.filename&&info.subfolder===broken.subfolder)matches.set(info.url,info);});
    if(matches.size!==1)return false;
    var candidate=matches.values().next().value,key=broken.url+' -> '+candidate.url;if(attempted.get(video)===key)return false;attempted.set(video,key);
    var wasPlaying=!video.paused;video.removeAttribute('src');video.removeAttribute('type');
    var sources=Array.from(video.querySelectorAll('source')),source=sources.shift();sources.forEach(function(item){item.remove();});
    if(!source){source=document.createElement('source');video.appendChild(source);}source.removeAttribute('type');source.setAttribute('src',candidate.url);
    try{video.load();if(wasPlaying){var play=video.play();if(play&&play.catch)play.catch(function(){});}}catch(ignore){}
    return true;
  }
  function scan(){var repaired=0;document.querySelectorAll('[role="dialog"] video,.p-dialog video').forEach(function(video){if(failed(video)&&repair(video))repaired++;});return repaired;}
  function schedule(){if(stopped)return;timers.forEach(clearTimeout);timers=[0,80,400,1200].map(function(delay){return setTimeout(scan,delay);});}
  function onFailure(event){var video=eventVideo(event);if(video){var id=setTimeout(function(){failures.delete(id);if(!stopped)repair(video);},0);failures.add(id);}}
  function onReady(event){var video=eventVideo(event);if(!video||dialogOf(video)||video.readyState<2)return;scan();}
  function revalidate(){if(stopped)return false;attempted=new WeakMap();schedule();return true;}
  function remove(){stopped=true;failures.forEach(clearTimeout);failures.clear();timers.forEach(clearTimeout);timers=[];observer&&observer.disconnect();failureEvents.forEach(function(type){document.removeEventListener(type,onFailure,true);});readinessEvents.forEach(function(type){document.removeEventListener(type,onReady,true);});delete window.__comfierGalleryVideoRepair;delete window.__comfierGalleryVideoSourceRepair;}
  failureEvents.forEach(function(type){document.addEventListener(type,onFailure,true);});
  readinessEvents.forEach(function(type){document.addEventListener(type,onReady,true);});
  observer=window.__comfierMutations.create(function(records){if(records.some(function(record){if(record.type==='attributes')return record.target?.matches?.('video,source');return Array.from(record.addedNodes||[]).concat(Array.from(record.removedNodes||[])).some(function(node){return node.nodeType===1&&(node.matches?.('video,source')||node.querySelector?.('video,source'));});}))schedule();});observer.observe(document.body,{childList:true,subtree:true,attributes:true,attributeFilter:['src','type']});
  window.__comfierGalleryVideoRepair={repair:repair,scan:scan,revalidate:revalidate,remove:remove};
  window.__comfierGalleryVideoSourceRepair=true;
  schedule();
})();
