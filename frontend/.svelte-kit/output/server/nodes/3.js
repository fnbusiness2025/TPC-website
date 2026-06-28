import * as server from '../entries/pages/(client)/_layout.server.ts.js';

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/(client)/_layout.svelte.js')).default;
export { server };
export const server_id = "src/routes/(client)/+layout.server.ts";
export const imports = ["_app/immutable/nodes/3.bsZ2ENwz.js","_app/immutable/chunks/BRch2Ru9.js","_app/immutable/chunks/54ipv05L.js"];
export const stylesheets = ["_app/immutable/assets/app.DaqRVeS6.css"];
export const fonts = [];
