// Standard menu creation owners notify this guard; no DOM discovery or monitoring.
export function createCanvasMenuGuard(win, doc, now = () => performance.now()) {
  let press = null;
  let opening = null;
  const options = { capture: true, passive: false };
  function reset() { press = null; opening = null; }
  function down(event) {
    if (event.isPrimary === false) { reset(); return; }
    // Every new deliberate press is allowed, including a tap immediately after opening.
    reset();
    if (event.pointerType !== "touch" && event.pointerType !== "pen") return;
    press = { id: event.pointerId, type: event.pointerType, target: event.target, released: false, at: now() };
  }
  function stop(event) {
    if (event.cancelable) event.preventDefault();
    event.stopImmediatePropagation();
  }
  function remainder(event) {
    if (!press) return;
    if (event.type.startsWith("pointer") && event.pointerId !== press.id) return;
    if (event.type === "pointerup") { press.released = true; press.at = now(); }
    if (!opening || opening !== press) return;
    // Compatibility mouse events belong to the released touch, never keyboard activation.
    if (event.type === "click" && event.detail === 0) return;
    if (!event.type.startsWith("pointer") && now() - press.at > 400) return;
    if (event.pointerType === "mouse") return;
    stop(event);
    if (event.type === "pointerup") {
      const current = press;
      const canvas = current.target?.closest?.("canvas");
      if (canvas) {
        try { if (canvas.hasPointerCapture?.(current.id)) canvas.releasePointerCapture(current.id); } catch {}
        // Finish the canvas's existing input owner without delivering a selecting release.
        queueMicrotask(() => canvas.dispatchEvent(new win.PointerEvent("pointercancel", {
          bubbles: true, pointerId: current.id, pointerType: current.type,
          clientX: event.clientX, clientY: event.clientY
        })));
      }
    }
  }
  function cancel(event) { if (press?.id === event.pointerId && !press.released) reset(); }
  function notify(event) {
    if (event?.pointerType === "mouse" || event?.type?.startsWith("key")) return;
    if (!press) return;
    if (event?.pointerId != null && event.pointerId !== press.id) return;
    if (press.released && (!event || now() - press.at > 400)) return;
    opening = press;
  }
  win.addEventListener("pointerdown", down, options);
  for (const type of ["pointermove", "pointerup", "mouseup", "click"]) win.addEventListener(type, remainder, options);
  win.addEventListener("pointercancel", cancel, options);
  win.addEventListener("blur", reset);
  win.addEventListener("keydown", reset);
  doc.addEventListener("visibilitychange", reset);
  return { notify, reset, remove() {
    reset();
    win.removeEventListener("pointerdown", down, options);
    for (const type of ["pointermove", "pointerup", "mouseup", "click"]) win.removeEventListener(type, remainder, options);
    win.removeEventListener("pointercancel", cancel, options);
    win.removeEventListener("blur", reset);
    win.removeEventListener("keydown", reset);
    doc.removeEventListener("visibilitychange", reset);
  }};
}
const guard = typeof window !== "undefined" && typeof document !== "undefined"
  ? createCanvasMenuGuard(window, document) : null;
export function notifyCanvasMenuOpened(event) {
  guard?.notify(event);
  // Preserve the Android guard's established capture/reset integration.
  if (typeof window !== "undefined") window.__comfierDropdownOpened?.(event);
}
