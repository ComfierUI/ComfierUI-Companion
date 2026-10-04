(function(){
  'use strict';
  window.__comfierTransientMenus?.remove?.();

  const logical=r=>window.__comfierLayoutSide?.rect(r)||r;
  const HELP='.help-center-popup.small-sidebar';
  const MENU_LIST='ul.p-tieredmenu-root-list';
  const MENU_BUTTON='div.comfy-menu-button-wrapper';
  let stopped=false;
  const jobs=window.__comfierRuntime.scope('menus');

  function visible(el){
    if(!el?.isConnected)return false;
    const css=getComputedStyle(el),r=logical(el.getBoundingClientRect());
    return css.display!=='none'&&css.visibility!=='hidden'&&Number(css.opacity||1)>.01&&r.width>1&&r.height>1;
  }
  
  function helpPopup(){const popup=document.querySelector(HELP);return visible(popup)?popup:null}
  function menuList(){return Array.from(document.querySelectorAll(MENU_LIST)).reverse().find(visible)||null}
  function menuSurface(list){return list?.closest?.('.p-tieredmenu,.p-menu,.p-popover')||list}
  function menuButton(){const button=document.querySelector('button.comfier-edge-menu')||document.querySelector(MENU_BUTTON);return visible(button)?button:null}
  
  
  
  function apply(){if(!stopped)window.__comfierOwnedOverlayLayers?.refresh();}
  function schedule(){if(!stopped)jobs.frame('layout',apply)}
  function fireEscape(target){
    try{
      target.dispatchEvent(new KeyboardEvent('keydown',{key:'Escape',code:'Escape',keyCode:27,which:27,bubbles:true,cancelable:true}));
      target.dispatchEvent(new KeyboardEvent('keyup',{key:'Escape',code:'Escape',keyCode:27,which:27,bubbles:true,cancelable:true}));
    }catch(_){}
  }
  function helpButton(){
    const button=document.querySelector('button.comfy-help-center-btn[aria-label="Help Center"]');
    return visible(button)?button:null;
  }
  function closeHelp(){
    const popup=helpPopup();if(!popup)return false;
    const button=helpButton();if(!button)return false;button.click();
    return true;
  }
  function closeMainMenu(){
    const list=menuList();if(!list)return false;
    const button=menuButton();if(button)button.click();else fireEscape(menuSurface(list));
    return true;
  }
  jobs.own(window.__comfierBack.register('help',100,closeHelp));
  jobs.own(window.__comfierBack.register('main-menu',110,closeMainMenu));

  window.__comfierTransientMenus={
    refresh:schedule,
    remove(){if(stopped)return;
      stopped=true;jobs.dispose();
      delete window.__comfierTransientMenus;
    }
  };
})();
