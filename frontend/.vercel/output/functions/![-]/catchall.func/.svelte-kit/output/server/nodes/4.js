import * as server from '../entries/pages/(admin)/admin/_page.server.ts.js';

export const index = 4;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/(admin)/admin/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/(admin)/admin/+page.server.ts";
export const imports = ["_app/immutable/nodes/4.D_4tShku.js","_app/immutable/chunks/D3kkNw_i.js","_app/immutable/chunks/DjFVoDan.js","_app/immutable/chunks/D6YF6ztN.js","_app/immutable/chunks/DqePdmZc.js","_app/immutable/chunks/5oZoPnb5.js"];
export const stylesheets = [];
export const fonts = [];
