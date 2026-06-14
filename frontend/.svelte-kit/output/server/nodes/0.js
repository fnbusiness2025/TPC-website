

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.DE_TaRkJ.js","_app/immutable/chunks/D32AW7gs.js","_app/immutable/chunks/CvmaHwWb.js"];
export const stylesheets = [];
export const fonts = [];
