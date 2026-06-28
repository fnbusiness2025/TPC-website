import * as server from '../entries/pages/(client)/_layout.server.ts.js';

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/(client)/_layout.svelte.js')).default;
export { server };
export const server_id = "src/routes/(client)/+layout.server.ts";
export const imports = ["_app/immutable/nodes/3.DntTUXfH.js","_app/immutable/chunks/D3kkNw_i.js","_app/immutable/chunks/DjFVoDan.js"];
export const stylesheets = ["_app/immutable/assets/app.duD6TQjF.css"];
export const fonts = [];
