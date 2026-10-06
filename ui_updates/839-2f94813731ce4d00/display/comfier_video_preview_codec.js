(function(){
  'use strict';
  if(window.__comfierVideoPreviewCodec)return;
  var proto=window.Element&&Element.prototype;
  if(!proto||typeof proto.setAttribute!=='function')return;
  var original=proto.setAttribute,forced=new WeakSet(),direct=new WeakSet(),directSources=new Map(),restorers=[];
  var videoFile=/\.(?:mp4|m4v|mov|mkv|webm|avi)(?:$|[?#])/i;
  function h264(value){
    try{
      var url=new URL(String(value||''),document.baseURI);
      var filename=url.searchParams.get('filename')||decodeURIComponent(url.pathname.split('/').pop()||'');
      var preview=url.searchParams.get('preview')||'';
      if(!videoFile.test(filename)||!/^webp(?:;|$)/i.test(preview))return null;
      url.searchParams.set('preview','h264');
      return url.href;
    }catch(ignore){return null;}
  }
  function mp4ViewVideo(value){
    try{
      var url=new URL(String(value||''),document.baseURI);
      var filename=url.searchParams.get('filename')||decodeURIComponent(url.pathname.split('/').pop()||'');
      return /\/(?:api\/)?viewvideo\/?$/i.test(url.pathname)&&/\.(?:mp4|m4v|mov)$/i.test(filename);
    }catch(ignore){return false;}
  }
  function sourceInfo(value){
    try{
      var url=new URL(String(value||''),document.baseURI);
      var filename=url.searchParams.get('filename')||decodeURIComponent(url.pathname.split('/').pop()||'');
      return {url:url,filename:filename,key:filename+'\n'+(url.searchParams.get('subfolder')||'')};
    }catch(ignore){return null;}
  }
  function rememberDirect(value){
    var info=sourceInfo(value);
    if(!info||!videoFile.test(info.filename)||!/\/(?:api\/)?view\/?$/i.test(info.url.pathname))return;
    var format=info.url.searchParams.get('format')||'';
    if(info.url.searchParams.get('type')==='temp'&&/^video\/h264-mp4$/i.test(format))directSources.set(info.key,String(value));
  }
  function directFor(value){
    var info=sourceInfo(value);
    return info&&/\/(?:api\/)?viewvideo\/?$/i.test(info.url.pathname)?directSources.get(info.key)||null:null;
  }
  if(document.querySelectorAll)Array.prototype.forEach.call(document.querySelectorAll('video source'),function(source){
    rememberDirect(source.getAttribute('src')||source.src);
  });
  function patched(name,value){
    var key=String(name||'').toLowerCase(),tag=this&&this.tagName;
    if(key==='src'&&(tag==='SOURCE'||tag==='VIDEO')){
      rememberDirect(value);
      var exact=directFor(value),replacement=exact||h264(value);
      if(exact){
        direct.add(this);forced.delete(this);
        if(tag==='SOURCE')this.removeAttribute('type');
        return original.call(this,name,exact);
      }
      direct.delete(this);
      if(replacement||mp4ViewVideo(value)){
        forced.add(this);
        if(tag==='SOURCE')original.call(this,'type','video/mp4');
        return original.call(this,name,replacement||value);
      }
      forced.delete(this);
    }
    if(key==='type'&&tag==='SOURCE'&&direct.has(this)){this.removeAttribute('type');return;}
    if(key==='type'&&tag==='SOURCE'&&forced.has(this))return original.call(this,name,'video/mp4');
    return original.call(this,name,value);
  }
  proto.setAttribute=patched;
  function descriptor(owner,key){
    return owner&&Object.getOwnPropertyDescriptor(owner,key);
  }
  var sourceProto=window.HTMLSourceElement&&HTMLSourceElement.prototype;
  var mediaProto=window.HTMLMediaElement&&HTMLMediaElement.prototype;
  var nativeSourceType=descriptor(sourceProto,'type');
  function patchSrc(owner){
    var nativeSrc=descriptor(owner,'src');
    if(!nativeSrc||typeof nativeSrc.set!=='function'||nativeSrc.configurable===false)return;
    Object.defineProperty(owner,'src',{
      configurable:true,
      enumerable:nativeSrc.enumerable,
      get:nativeSrc.get,
      set:function(value){
        rememberDirect(value);
        var exact=directFor(value),replacement=exact||h264(value);
        if(exact){
          direct.add(this);forced.delete(this);
          if(this.tagName==='SOURCE'){
            if(nativeSourceType&&typeof nativeSourceType.set==='function')nativeSourceType.set.call(this,'');
            else this.removeAttribute('type');
          }
          return nativeSrc.set.call(this,exact);
        }
        direct.delete(this);
        if(replacement||mp4ViewVideo(value)){
          forced.add(this);
          if(this.tagName==='SOURCE'){
            if(nativeSourceType&&typeof nativeSourceType.set==='function')nativeSourceType.set.call(this,'video/mp4');
            else original.call(this,'type','video/mp4');
          }
          return nativeSrc.set.call(this,replacement||value);
        }
        forced.delete(this);
        return nativeSrc.set.call(this,value);
      }
    });
    restorers.push(function(){Object.defineProperty(owner,'src',nativeSrc);});
  }
  if(nativeSourceType&&typeof nativeSourceType.set==='function'&&nativeSourceType.configurable!==false){
    Object.defineProperty(sourceProto,'type',{
      configurable:true,
      enumerable:nativeSourceType.enumerable,
      get:nativeSourceType.get,
      set:function(value){return nativeSourceType.set.call(this,direct.has(this)?'':forced.has(this)?'video/mp4':value);}
    });
    restorers.push(function(){Object.defineProperty(sourceProto,'type',nativeSourceType);});
  }
  patchSrc(sourceProto);
  patchSrc(mediaProto);
  window.__comfierVideoPreviewCodec={
    rewrite:h264,
    isMp4ViewVideo:mp4ViewVideo,
    directFor:directFor,
    remove:function(){if(proto.setAttribute===patched)proto.setAttribute=original;restorers.reverse().forEach(function(restore){restore();});delete window.__comfierVideoPreviewCodec;}
  };
})();
