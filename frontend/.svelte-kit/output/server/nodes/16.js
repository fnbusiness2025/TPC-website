import * as server from '../entries/pages/(client)/login/_page.server.ts.js';

export const index = 16;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/(client)/login/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/(client)/login/+page.server.ts";
export const imports = ["_app/immutable/nodes/16.BtNlkepd.js","_app/immutable/chunks/BRch2Ru9.js","_app/immutable/chunks/54ipv05L.js","_app/immutable/chunks/2xDGEPXP.js","_app/immutable/chunks/eQmpNlxz.js","_app/immutable/chunks/B3BJVwdH.js","_app/immutable/chunks/CG5tV2AU.js"];
export const stylesheets = [];
export const fonts = [];
