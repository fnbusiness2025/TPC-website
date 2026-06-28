import { c as create_ssr_component, s as subscribe, v as validate_component, e as escape, d as add_attribute } from "../../../../chunks/ssr.js";
import { L as Logo } from "../../../../chunks/Logo.js";
import { p as page } from "../../../../chunks/stores.js";
import "@sveltejs/kit/internal";
import "../../../../chunks/exports.js";
import "../../../../chunks/utils2.js";
import "@sveltejs/kit/internal/server";
import "../../../../chunks/state.svelte.js";
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let user;
  let activePath;
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  user = $page.data.user;
  activePath = $page.url.pathname;
  $$unsubscribe_page();
  return `<div class="flex min-h-screen bg-background-100 font-body"> <aside class="w-64 bg-accent-900 text-background-50 flex flex-col fixed inset-y-0 shadow-xl z-30"><div class="p-6 border-b border-background-400/10"><div class="brightness-0 invert opacity-90 scale-90 origin-left">${validate_component(Logo, "Logo").$$render($$result, {}, {}, {})}</div> <div class="mt-2 text-[10px] uppercase tracking-[0.2em] text-primary-400 font-bold" data-svelte-h="svelte-14jrwuf">Agent Portal</div></div> <nav class="flex-grow p-4 space-y-2 mt-4"><a href="/agent" class="${"flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all " + escape(
    activePath === "/agent" ? "bg-primary-500 text-background-50" : "hover:bg-background-400/10 text-background-200",
    true
  )}"><i class="ri-dashboard-line"></i> Overview &amp; Leads</a> <a href="/agent/new" class="${"flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all " + escape(
    activePath === "/agent/new" ? "bg-primary-500 text-background-50" : "hover:bg-background-400/10 text-background-200",
    true
  )}"><i class="ri-add-line"></i> Add Listing</a> <div class="pt-4 border-t border-background-400/10 mt-4"></div> <a href="/" class="flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-background-300 hover:text-background-50 hover:bg-background-400/10 transition-all" data-svelte-h="svelte-1fl1ukn"><i class="ri-home-line"></i> Visit Homepage</a></nav> <div class="p-4 border-t border-background-400/10"><form method="POST" action="/login?/logout" class="w-full" data-svelte-h="svelte-z6kxwg"><button type="submit" class="flex items-center gap-3 px-4 py-3 w-full rounded-xl hover:bg-red-500/10 text-red-400 transition-all text-left font-medium"><i class="ri-logout-box-r-line"></i> Sign Out</button></form></div></aside>  <main class="flex-grow ml-64 p-8 md:p-12"> <header class="flex justify-between items-center mb-10 pb-6 border-b border-background-200"><div><h1 class="text-2xl font-bold font-heading text-foreground-950">${activePath === "/agent" ? `Agent Overview` : `${activePath === "/agent/new" ? `Create Property Listing` : `Agent Portal`}`}</h1> <p class="text-sm text-foreground-500">Welcome back, ${escape(user ? `${user.first_name} ${user.last_name}` : "Agent")}</p></div> <div class="flex items-center gap-4">${user ? `<div class="w-10 h-10 rounded-full bg-primary-500 flex items-center justify-center text-background-50 font-bold uppercase"${add_attribute("title", `${user.first_name} ${user.last_name}`, 0)}>${escape(user.first_name[0])}${escape(user.last_name[0])}</div>` : ``}</div></header>  ${slots.default ? slots.default({}) : ``}</main></div>`;
});
export {
  Layout as default
};
