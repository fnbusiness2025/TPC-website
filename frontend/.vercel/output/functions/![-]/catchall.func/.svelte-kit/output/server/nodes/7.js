import * as server from '../entries/pages/(client)/agent/_page.server.ts.js';

export const index = 7;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/(client)/agent/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/(client)/agent/+page.server.ts";
export const imports = ["_app/immutable/nodes/7.p-SWwAGp.js","_app/immutable/chunks/D3kkNw_i.js","_app/immutable/chunks/DjFVoDan.js","_app/immutable/chunks/D6YF6ztN.js","_app/immutable/chunks/Jvv7sg1w.js","_app/immutable/chunks/DqePdmZc.js","_app/immutable/chunks/5oZoPnb5.js","_app/immutable/chunks/DvkRVZuM.js","_app/immutable/chunks/DGj3vMxp.js"];
export const stylesheets = [];
export const fonts = [];
