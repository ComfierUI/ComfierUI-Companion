/* Cloud template compatibility, evaluated from serialized workflows, never the live graph. */
const modelFile = /\.(?:safetensors|ckpt|pt|pth|bin|sft|onnx|gguf)$/i;
const modelInput = /(?:ckpt|checkpoint|lora|unet|vae|clip|control_net|controlnet|diffusion|model)(?:_?(?:name|file))?\d*$/i;
const normalize = value => String(value).replace(/\\/g, '/').replace(/^\.\//, '');
const widgetTypes = new Set(['INT', 'FLOAT', 'STRING', 'BOOLEAN', 'COMBO']);

export function cloudWorkflowSupported(workflow, definitions, namedRestore = false) {
  if (!workflow || !Array.isArray(workflow.nodes)) return false;
  const available = new Set();
  for (const definition of Object.values(definitions)) {
    for (const spec of Object.values({...definition.input?.required, ...definition.input?.optional})) {
      const choices = Array.isArray(spec?.[0]) ? spec[0] : spec?.[1]?.options;
      if (Array.isArray(choices)) for (const value of choices) {
        if (typeof value === 'string' && modelFile.test(value)) available.add(normalize(value));
      }
    }
  }
  const subgraphs = new Map();
  function index(graph) {
    for (const child of graph.definitions?.subgraphs || []) {
      subgraphs.set(child.id, child);
      index(child);
    }
  }
  index(workflow);
  const visited = new Set();
  function check(graph) {
    if (visited.has(graph)) return true;
    visited.add(graph);
    for (const node of graph.nodes || []) {
      if (node.mode === 2 || node.mode === 4) continue; // Never / bypassed.
      const child = subgraphs.get(node.type);
      if (child && !check(child)) return false;
      const definition = definitions[node.type];
      const inputs = {...definition?.input?.required, ...definition?.input?.optional};
      const order = [...(definition?.input_order?.required || Object.keys(definition?.input?.required || {})),
        ...(definition?.input_order?.optional || Object.keys(definition?.input?.optional || {}))];
      let position = 0;
      const assigned = new Set();
      for (const name of order) {
        const spec = inputs[name];
        if (!Array.isArray(spec)) continue;
        const options = spec[1] || {};
        const choices = Array.isArray(spec[0]) ? spec[0] : Array.isArray(options.options) ? options.options : null;
        if (options.forceInput || (!choices && !widgetTypes.has(spec[0]))) continue;
        const values = node.widgets_values;
        const value = namedRestore && node.widgets_values_named && name in node.widgets_values_named
          ? node.widgets_values_named[name]
          : Array.isArray(values) ? values[position] : values?.[name];
        assigned.add(position++);
        if (options.control_after_generate) assigned.add(position++);
        const slot = node.inputs?.find(input => (input.widget?.name || input.name) === name);
        if (slot?.link != null) continue; // Selected value is supplied by the linked node.
        if (typeof value !== 'string' || !value.trim()) continue;
        const isModel = (choices && modelInput.test(name)) || ((choices || modelInput.test(name)) && modelFile.test(value));
        if (!isModel) continue;
        if (choices) {
          if (!choices.some(v => typeof v === 'string' && normalize(v) === normalize(value))) return false;
        } else if (!available.has(normalize(value))) return false;
      }
      // Promoted/custom widgets may not have a standard positional definition.
      const values = namedRestore && node.widgets_values_named ? Object.values(node.widgets_values_named)
        : Array.isArray(node.widgets_values) ? node.widgets_values.filter((_, i) => !assigned.has(i))
        : Object.values(node.widgets_values || {});
      if (!definition || child) for (const value of values) {
        if (typeof value === 'string' && modelFile.test(value) && !available.has(normalize(value))) return false;
      }
    }
    return true;
  }
  return check(workflow);
}

export function createCloudTemplateFilter() {
  let inventoryKey = '';
  let decisions = new Map();
  return async function filter(categories, custom, api, namedRestore = false, loadRemoteOptions, onProgress) {
    let definitions = await api.getNodeDefs();
    if (!definitions || Array.isArray(definitions) || definitions.error || !Object.values(definitions).some(definition => definition && typeof definition.input === 'object')) {
      throw new Error('Cloud model availability could not be loaded.');
    }
    // Reuse the frontend's authenticated remote-widget loader, not a new auth path.
    definitions = structuredClone(definitions);
    const remoteInputs = [];
    for (const definition of Object.values(definitions)) {
      for (const [name, spec] of Object.entries({...definition.input?.required, ...definition.input?.optional})) {
        if (!spec?.[1]?.remote || (!modelInput.test(name) && !spec[0]?.some?.(value => typeof value === 'string' && modelFile.test(value)))) continue;
        remoteInputs.push(spec);
      }
    }
    const remoteRequests = new Map();
    let remoteCursor = 0;
    await Promise.all(Array.from({length: Math.min(4, remoteInputs.length)}, async () => {
      while (remoteCursor < remoteInputs.length) {
        const spec = remoteInputs[remoteCursor++];
        const config = spec[1].remote, key = JSON.stringify(config);
        if (!loadRemoteOptions) throw new Error('Cloud remote model availability could not be checked.');
        if (!remoteRequests.has(key)) remoteRequests.set(key, Promise.resolve().then(() => loadRemoteOptions(config)));
        const options = await remoteRequests.get(key);
        if (!Array.isArray(options)) throw new Error('Cloud remote model availability was invalid.');
        spec[0] = options;
      }
    }));
    const nextKey = JSON.stringify([definitions, namedRestore]);
    if (nextKey !== inventoryKey) { decisions = new Map(); inventoryKey = nextKey; }
    const cache = decisions; // Keep older in-flight checks out of a newer inventory cache.
    const entries = categories.flatMap(category => category.templates.map(template => ({module: category.moduleName, name: template.name})));
    for (const [module, names] of Object.entries(custom)) for (const name of names) entries.push({module, name});
    let cursor = 0, unchecked = 0, checked = 0, scheduled = false;
    const accepted = new Set();
    const result = () => ({
      categories: categories.map(category => ({...category, templates: category.templates.filter(template => accepted.has(JSON.stringify([category.moduleName, template.name])))})).filter(category => category.templates.length),
      custom: Object.fromEntries(Object.entries(custom).map(([module, names]) => [module, names.filter(name => accepted.has(JSON.stringify([module, name]))) ]).filter(([,names]) => names.length)),
      unchecked, checked, total:entries.length
    });
    function report() {
      if (!onProgress || scheduled) return;
      scheduled = true;
      queueMicrotask(() => { scheduled = false; onProgress(result()); });
    }
    report();
    await Promise.all(Array.from({length: Math.min(4, entries.length)}, async () => {
      while (cursor < entries.length) {
        const {module, name} = entries[cursor++];
        const key = JSON.stringify([module, name]);
        try {
          if (!cache.has(key)) {
            const url = module === 'default' ? api.fileURL(`/templates/${encodeURIComponent(name)}.json`)
              : api.apiURL(`/workflow_templates/${encodeURIComponent(module)}/${encodeURIComponent(name)}.json`);
            const response = await fetch(url, {signal: AbortSignal.timeout(15000)});
            if (!response.ok) throw new Error('Template unavailable');
            cache.set(key, cloudWorkflowSupported(await response.json(), definitions, namedRestore));
          }
          if (cache.get(key)) accepted.add(key);
        } catch { unchecked++; } // Not advertised as supported; retry on a subsequent load.
        checked++; report();
      }
    }));
    return result();
  };
}
