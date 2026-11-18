// Keyboard provider v1: send resolved Android ARGB, never CSS RGBA or image data.
export function cssColorToArgb(color, opacity = 1) {
    if (!Number.isFinite(opacity) || opacity < 0 || opacity > 1) throw Error("Invalid opacity");
    let value = String(color).trim(), channels;
    if (/^#[0-9a-f]{3,4}$/i.test(value)) value = "#" + [...value.slice(1)].map(c => c+c).join("");
    if (/^#[0-9a-f]{6}([0-9a-f]{2})?$/i.test(value)) {
        channels = [1,3,5].map(i => parseInt(value.slice(i,i+2),16));
        channels.push(value.length===9 ? parseInt(value.slice(7,9),16) : 255);
    } else {
        if (!CSS.supports("color",value)) throw Error("Invalid theme color");
        const probe=document.createElement("span");probe.style.backgroundColor=value;probe.style.display="none";document.body.appendChild(probe);
        try {
            const resolved=getComputedStyle(probe).backgroundColor;
            if (!resolved || !CSS.supports("color",resolved)) throw Error("Unresolved theme color");
            const canvas=document.createElement("canvas");canvas.width=canvas.height=1;
            const ctx=canvas.getContext("2d",{willReadFrequently:true});ctx.clearRect(0,0,1,1);ctx.fillStyle=resolved;ctx.fillRect(0,0,1,1);
            channels=[...ctx.getImageData(0,0,1,1).data];
        } finally {probe.remove();}
    }
    const hex=n=>Math.round(n).toString(16).padStart(2,"0").toUpperCase();
    return "#"+hex(channels[3]*opacity)+channels.slice(0,3).map(hex).join("");
}
export function createKeyboardThemeBridge(studio) {
    if (!window.ComfierApp?.applyKeyboardTheme) return null;
    let timer=0,last="",status={state:"waiting",message:"Waiting for theme"};
    const controls=new Set();
    const render=()=>{for(const output of controls){if(!output.isConnected){controls.delete(output);continue;}output.textContent=status.message;}};
    const update=value=>{try{status=typeof value==="string"?JSON.parse(value):value;render();}catch{}};
    window.addEventListener("comfier-keyboard-theme-status",event=>update(event.detail));
    update(window.ComfierApp.getKeyboardThemeStatus?.() || JSON.stringify(status));
    // Theme Studio already returns #RRGGBB[AA] with role transparency applied.
    // Reading its relative-color CSS paint through `color` can inherit UI text
    // when that expression is invalid at computed-value time.
    const background=()=>studio.getAssignedColor("containerBg") || "var(--color-interface-panel-surface,var(--comfy-menu-bg,#171718))";
    const snapshot=()=>JSON.stringify({schema_version:1,
        container_background:cssColorToArgb(background()),
        container_frame:cssColorToArgb(studio.getAssignedColor("containerFrame") || "var(--interface-stroke,var(--border-color,#4e4e4e))"),
        ui_font:cssColorToArgb(studio.getAssignedColor("uiText") || "var(--color-base-foreground,var(--fg-color,#fff))")});
    const send=force=>{
        clearTimeout(timer);timer=0;
        try{const value=snapshot();if(force||value!==last||status.state!=="synced"){last=value;status={state:"pending",message:"Syncing keyboard theme…"};render();window.ComfierApp.applyKeyboardTheme(value);}}
        catch(error){update({state:"error",message:String(error?.message||error)});}
    };
    return {
        changed(){clearTimeout(timer);timer=setTimeout(()=>send(false),180);},
        sync(){send(true);},
        installControl(parent){
            const output=document.createElement("output");output.style.cssText="display:block;max-width:260px;font-size:12px;white-space:normal";
            parent.append(output);controls.add(output);render();
        }
    };
}
