import * as server from '../entries/pages/(client)/login/_page.server.ts.js';

export const index = 10;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/(client)/login/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/(client)/login/+page.server.ts";
export const imports = ["_app/immutable/nodes/10.CSwywhag.js","_app/immutable/chunks/D3kkNw_i.js","_app/immutable/chunks/DjFVoDan.js","_app/immutable/chunks/DqePdmZc.js","_app/immutable/chunks/5oZoPnb5.js","_app/immutable/chunks/DGj3vMxp.js"];
export const stylesheets = [];
export const fonts = [];
