

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/(client)/_layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/3.rFYMnmwG.js","_app/immutable/chunks/D32AW7gs.js","_app/immutable/chunks/CvmaHwWb.js"];
export const stylesheets = ["_app/immutable/assets/app.BEWtGnlG.css"];
export const fonts = [];
