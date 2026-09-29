(() => {
  'use strict';
  if (window.__comfierMediaAssetsBack) return 'Media Assets Back already available.';

  const visible = element => {
    if (!element?.isConnected) return false;
    for (let current=element; current && current.nodeType===1; current=current.parentElement) {
      const style=getComputedStyle(current);
      if (style.display==='none' || style.visibility==='hidden' || style.visibility==='collapse' ||
          parseFloat(style.opacity || '1')<0.01 || current.hidden || current.hasAttribute('inert') ||
          current.getAttribute('aria-hidden')==='true' || current.getAttribute('data-state')==='closed') return false;
    }
    const rect=element.getBoundingClientRect();
    return rect.width>0 && rect.height>0 && rect.right>0 && rect.bottom>0 && rect.left<innerWidth && rect.top<innerHeight;
  };
  const firstVisible = selector => [...document.querySelectorAll(selector)].find(visible) || null;

  function handleBack() {
    const lightbox=firstVisible('[role="dialog"][aria-modal="true"][data-mask]');
    const close=lightbox && [...lightbox.querySelectorAll('button[aria-label="Close"]')].find(visible);
    if (close) {
      close.click();
      console.log('MEDIA-BACK: closed fullscreen preview');
      return true;
    }
    const batchBack=firstVisible('button[aria-label="Back to all assets"]');
    if (batchBack) {
      batchBack.click();
      window.__comfierRequestLayout?.();
      console.log('MEDIA-BACK: returned from batch view');
      return true;
    }
    return false;
  }

  window.__comfierMediaAssetsBack={
    handleBack,
    snapshot:()=>({
      lightbox:!!firstVisible('[role="dialog"][aria-modal="true"][data-mask]'),
      batchBack:!!firstVisible('button[aria-label="Back to all assets"]')
    }),
    remove(){delete window.__comfierMediaAssetsBack;}
  };
  return 'Media Assets cooperative Back enabled.';
})();
