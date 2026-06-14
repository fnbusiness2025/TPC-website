

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/(admin)/_layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.CI0_d5GF.js","_app/immutable/chunks/D32AW7gs.js","_app/immutable/chunks/CvmaHwWb.js","_app/immutable/chunks/B_7w2zGl.js"];
export const stylesheets = ["_app/immutable/assets/app.BEWtGnlG.css"];
export const fonts = [];
