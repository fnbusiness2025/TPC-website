import * as server from '../entries/pages/(admin)/admin/admins/_page.server.ts.js';

export const index = 6;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/(admin)/admin/admins/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/(admin)/admin/admins/+page.server.ts";
export const imports = ["_app/immutable/nodes/6.BWieglCB.js","_app/immutable/chunks/BRch2Ru9.js","_app/immutable/chunks/54ipv05L.js","_app/immutable/chunks/D6YF6ztN.js","_app/immutable/chunks/eQmpNlxz.js","_app/immutable/chunks/B3BJVwdH.js","_app/immutable/chunks/2xDGEPXP.js"];
export const stylesheets = [];
export const fonts = [];
