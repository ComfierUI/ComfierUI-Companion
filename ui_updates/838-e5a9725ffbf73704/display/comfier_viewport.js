(function(){
'use strict';if(window.__comfierViewport)return;
function snapshot(){const width=window.innerWidth,height=window.innerHeight,s=window.screen;const outer=Math.min(s?.width||width,s?.height||height)<=520;return{width,height,outer,portrait:height>=width,mode:(outer?'outer':'inner')+(height>=width?'Portrait':'Landscape')}}
window.__comfierViewport=Object.freeze({snapshot,mode:()=>snapshot().mode,scale(){if(window.__comfierLayoutLab)return 1;return Math.max(.3,Math.min(2,parseFloat(window.__comfierUiZoomValue)||1))}});
})();
