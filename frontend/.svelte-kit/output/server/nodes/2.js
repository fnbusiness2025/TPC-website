import * as server from '../entries/pages/(admin)/_layout.server.ts.js';

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/(admin)/_layout.svelte.js')).default;
export { server };
export const server_id = "src/routes/(admin)/+layout.server.ts";
export const imports = ["_app/immutable/nodes/2.COxj_FXj.js","_app/immutable/chunks/BRch2Ru9.js","_app/immutable/chunks/54ipv05L.js","_app/immutable/chunks/CG5tV2AU.js","_app/immutable/chunks/B3IKCHKp.js","_app/immutable/chunks/B3BJVwdH.js","_app/immutable/chunks/eQmpNlxz.js"];
export const stylesheets = ["_app/immutable/assets/app.DaqRVeS6.css"];
export const fonts = [];
