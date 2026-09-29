(function(){
  'use strict';
  window.__comfierTransientMenus?.remove?.();

  const STYLE_ID='comfier-transient-menus-style';
  const logical=r=>window.__comfierLayoutSide?.rect(r)||r;
  const HELP='.help-center-popup.small-sidebar';
  const MENU_LIST='ul.p-tieredmenu-root-list';
  const MENU_BUTTON='div.comfy-menu-button-wrapper';
  let stopped=false;
  const jobs=window.__comfierRuntime.scope('menus');

  document.getElementById(STYLE_ID)?.remove();
  const style=document.createElement('style');
  style.id=STYLE_ID;
  style.textContent=`
${HELP}.comfier-help-positioned{position:fixed!important;right:auto!important;bottom:auto!important;box-sizing:border-box!important;overflow:auto!important;overscroll-behavior:contain!important;z-index:var(--comfier-z-menu,600)!important}
.comfier-main-menu-positioned{position:fixed!important;right:auto!important;bottom:auto!important;margin:0!important;transform:none!important;box-sizing:border-box!important;overflow:auto!important;overscroll-behavior:contain!important;z-index:var(--comfier-z-menu,600)!important}
`;
  document.head.appendChild(style);

  function visible(el){
    if(!el?.isConnected)return false;
    const css=getComputedStyle(el),r=logical(el.getBoundingClientRect());
    return css.display!=='none'&&css.visibility!=='hidden'&&Number(css.opacity||1)>.01&&r.width>1&&r.height>1;
  }
  function railRect(){
    const rail=document.querySelector('.comfier-unified-floating-rail');
    return visible(rail)?logical(rail.getBoundingClientRect()):logical(window.__comfierUi.railBounds());
  }
  function helpPopup(){const popup=document.querySelector(HELP);return visible(popup)?popup:null}
  function menuList(){return Array.from(document.querySelectorAll(MENU_LIST)).reverse().find(visible)||null}
  function menuSurface(list){return list?.closest?.('.p-tieredmenu,.p-menu,.p-popover')||list}
  function menuButton(){const button=document.querySelector(MENU_BUTTON);return visible(button)?button:null}
  function setImportant(el,name,value){if(window.__comfierLayoutSide){[name,value]=window.__comfierLayoutSide.property(name,value)}if(!el)return;if(el.style.getPropertyValue(name)!==value||el.style.getPropertyPriority(name)!=='important')el.style.setProperty(name,value,'important')}
  function positionHelp(popup){
    const rail=railRect();if(!popup||!rail)return;
    const gap=4,left=Math.ceil(rail.right+gap),top=Math.max(4,Math.ceil(rail.top));
    popup.classList.add('comfier-help-positioned');
    setImportant(popup,'left',left+'px');setImportant(popup,'right','auto');setImportant(popup,'top',top+'px');setImportant(popup,'bottom','auto');
    setImportant(popup,'max-width',Math.max(160,Math.floor(innerWidth-left-4))+'px');
    setImportant(popup,'max-height',Math.max(120,Math.floor(innerHeight-top-4))+'px');
    setImportant(popup,'z-index','600');
  }
  function positionMenu(list){
    const button=menuButton(),surface=menuSurface(list);if(!button||!surface)return;
    const br=railRect()||logical(button.getBoundingClientRect()),left=Math.ceil(br.right+4),top=Math.max(4,Math.floor(br.top));
    surface.classList.add('comfier-main-menu-positioned');
    setImportant(surface,'left',left+'px');setImportant(surface,'right','auto');setImportant(surface,'top',top+'px');setImportant(surface,'bottom','auto');
    setImportant(surface,'max-width',Math.max(160,Math.floor(innerWidth-left-4))+'px');
    setImportant(surface,'max-height',Math.max(120,Math.floor(innerHeight-top-4))+'px');
    setImportant(surface,'z-index','600');
  }
  function apply(){if(stopped)return;positionHelp(helpPopup());positionMenu(menuList())}
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

  const observer=window.__comfierMutations.create(records=>{if(window.__comfierUi.affected(records,HELP+','+MENU_LIST+','+MENU_BUTTON+',.comfier-unified-floating-rail'))schedule()});
  observer.observe(document.body,{subtree:true,childList:true,attributes:true,attributeFilter:['class','style','aria-expanded','data-state']});
  window.addEventListener('resize',schedule,{passive:true});
  window.addEventListener('orientationchange',schedule,{passive:true});
  document.addEventListener('click',schedule,true);
  jobs.burst('startup',schedule,[0,40,120,260]);

  window.__comfierTransientMenus={
    refresh:schedule,
    remove(){if(stopped)return;
      stopped=true;jobs.dispose();observer.disconnect();
      window.removeEventListener('resize',schedule);window.removeEventListener('orientationchange',schedule);document.removeEventListener('click',schedule,true);
      document.querySelectorAll('.comfier-help-positioned').forEach(el=>el.classList.remove('comfier-help-positioned'));
      document.querySelectorAll('.comfier-main-menu-positioned').forEach(el=>el.classList.remove('comfier-main-menu-positioned'));
      style.remove();delete window.__comfierTransientMenus;
    }
  };
})();
