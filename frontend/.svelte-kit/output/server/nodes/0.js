

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.DMxsxNFW.js","_app/immutable/chunks/BRch2Ru9.js","_app/immutable/chunks/54ipv05L.js"];
export const stylesheets = [];
export const fonts = [];
