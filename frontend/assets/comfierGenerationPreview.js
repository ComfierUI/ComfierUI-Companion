/* Pure preview state; frames/status come from existing workflow Apps events. */
export function createGenerationPreview({readPreference, writePreference, isAppsOpen, onChange}) {
  let enabled = true;
  try { enabled = readPreference() !== 'false'; } catch {}
  let state = {enabled, visible:false, url:'', kind:'image', status:'Ready', jobId:null};
  let dismissed = false;
  const publish = () => onChange({...state});
  return {
    snapshot: () => ({...state}),
    setEnabled(value) {
      state.enabled = !!value;
      if (state.enabled) dismissed = false; // An explicit On choice may reopen this run.
      try { writePreference(String(state.enabled)); } catch {}
      state.visible = state.enabled && !dismissed && !!state.url && isAppsOpen();
      publish();
    },
    dismiss() { dismissed = true; state.visible = false; publish(); },
    event(type, data = {}) {
      if (type === 'start') {
        dismissed = false;
        state = {...state, visible:false, url:'', kind:'image', status:'Generating…', jobId:data.jobId || null};
      } else if (type === 'clear') {
        state = {...state, visible:false, url:'', status:'Ready', jobId:null};
      } else if (type === 'status') {
        state.status = data.status || '';
      } else if (type === 'frame') {
        if (state.jobId && data.jobId && state.jobId !== data.jobId) return;
        if (!data.url) return;
        state.url = data.url;
        state.kind = data.kind === 'video' ? 'video' : 'image';
        state.visible = state.enabled && !dismissed && isAppsOpen();
      } else return;
      publish();
    }
  };
}
