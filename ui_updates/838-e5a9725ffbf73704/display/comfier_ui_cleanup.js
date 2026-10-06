(()=>{
const old=document.getElementById('comfier-ui-cleanup-style');
if(old)return;
const style=document.createElement('style');
style.id='comfier-ui-cleanup-style';
style.textContent=`
.side-bar-panel{z-index:var(--comfier-z-side,500)!important}
@media (max-width:520px) and (orientation:portrait){
#node-panel.litegraph.dialog.settings{position:fixed!important;left:var(--comfier-node-panel-left,8px)!important;right:auto!important;top:var(--comfier-node-panel-top,8px)!important;bottom:auto!important;width:var(--comfier-node-panel-width,calc(100vw - 16px))!important;min-width:0!important;max-width:var(--comfier-node-panel-width,calc(100vw - 16px))!important;height:auto!important;max-height:var(--comfier-node-panel-height,calc(100dvh - 16px))!important;box-sizing:border-box!important;overflow:auto!important;overscroll-behavior:contain;touch-action:pan-x pan-y;z-index:var(--comfier-z-side,500)!important}
#node-panel.litegraph.dialog.settings .dialog-content{min-width:0!important;overflow:auto!important;max-height:calc(var(--comfier-node-panel-height,100dvh) - 94px)!important;overscroll-behavior:contain;touch-action:pan-x pan-y}
#node-panel.litegraph.dialog.settings .dialog-content>.property{display:grid!important;grid-template-columns:minmax(0,1fr)!important;gap:3px!important;width:100%!important;min-width:0!important;box-sizing:border-box!important}
#node-panel.litegraph.dialog.settings .dialog-content>.property>.property_name{display:block!important;width:auto!important;max-width:100%!important;min-width:0!important;margin-right:0!important;white-space:normal!important;overflow-wrap:anywhere!important}
#node-panel.litegraph.dialog.settings .dialog-content>.property>.property_value{display:block!important;width:100%!important;max-width:100%!important;min-width:0!important;box-sizing:border-box!important;white-space:nowrap!important;overflow-x:auto!important;overflow-y:hidden!important;overflow-wrap:normal!important;touch-action:pan-x!important}
#node-panel.litegraph.dialog.settings .dialog-footer{margin-top:0!important}
body:has(#node-panel.litegraph.dialog.settings) #comfier-node-resize-handles,
body:has(#node-panel.litegraph.dialog.settings) #cm-move{display:none!important;pointer-events:none!important}
}
`;
document.head.appendChild(style);
return'ComfierUI accent and layering cleanup active.';
})();
