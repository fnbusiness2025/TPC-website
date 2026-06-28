import { c as create_ssr_component, s as subscribe, v as validate_component, e as escape, d as add_attribute } from "../../../chunks/ssr.js";
/* empty css                  */
import { L as Logo } from "../../../chunks/Logo.js";
import { p as page } from "../../../chunks/stores.js";
import "@sveltejs/kit/internal";
import "../../../chunks/exports.js";
import "../../../chunks/utils2.js";
import "@sveltejs/kit/internal/server";
import "../../../chunks/state.svelte.js";
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let user;
  let activePath;
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  user = $page.data.user;
  activePath = $page.url.pathname;
  $$unsubscribe_page();
  return `<div class="flex min-h-screen bg-background-100"> <aside class="w-64 bg-accent-900 text-background-50 flex flex-col fixed inset-y-0 shadow-xl z-30"><div class="p-6 border-b border-background-400/10"><div class="brightness-0 invert opacity-90 scale-90 origin-left">${validate_component(Logo, "Logo").$$render($$result, {}, {}, {})}</div> <div class="mt-2 text-[10px] uppercase tracking-[0.2em] text-primary-400 font-bold" data-svelte-h="svelte-87dfex">Admin Portal</div></div> <nav class="flex-grow p-4 space-y-2 mt-4 overflow-y-auto"><a href="/admin" class="${"flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all " + escape(
    activePath === "/admin" ? "bg-primary-500 text-background-50" : "hover:bg-background-400/10 text-background-200",
    true
  )}"><i class="ri-dashboard-line"></i> Dashboard</a>  <div class="pt-4 pb-2 px-4 text-[9px] uppercase tracking-widest text-background-400 font-bold border-t border-background-400/10 mt-2" data-svelte-h="svelte-n71n3d">Agents Management</div> <a href="/admin/agents" class="${"flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all " + escape(
    activePath === "/admin/agents" ? "bg-primary-500 text-background-50" : "hover:bg-background-400/10 text-background-200",
    true
  )}"><i class="ri-group-line"></i> Active Agents</a> <a href="/admin/agents/pending" class="${"flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all " + escape(
    activePath === "/admin/agents/pending" ? "bg-primary-500 text-background-50" : "hover:bg-background-400/10 text-background-200",
    true
  )}"><i class="ri-user-follow-line"></i> Pending Approvals</a>  <div class="pt-4 pb-2 px-4 text-[9px] uppercase tracking-widest text-background-400 font-bold border-t border-background-400/10 mt-2" data-svelte-h="svelte-1vgkhce">Configuration</div> <a href="/admin/admins" class="${"flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all " + escape(
    activePath === "/admin/admins" || activePath.startsWith("/admin/admins") ? "bg-primary-500 text-background-50" : "hover:bg-background-400/10 text-background-200",
    true
  )}"><i class="ri-shield-user-line"></i> Admins</a></nav> <div class="p-4 border-t border-background-400/10"><form method="POST" action="/login?/logout" class="w-full" data-svelte-h="svelte-z6kxwg"><button type="submit" class="flex items-center gap-3 px-4 py-3 w-full rounded-xl hover:bg-red-500/10 text-red-400 transition-all text-left font-medium"><i class="ri-logout-box-r-line"></i> Sign Out</button></form></div></aside>  <main class="flex-grow ml-64 p-8 md:p-12"><header class="flex justify-between items-center mb-10"><div><h1 class="text-2xl font-bold font-heading text-foreground-950">${activePath === "/admin" ? `Overview` : `${activePath === "/admin/agents" ? `Active Agents Directory` : `${activePath === "/admin/agents/pending" ? `Agent Verification Queue` : `${activePath.startsWith("/admin/admins") ? `Administrators` : `Admin Portal`}`}`}`}</h1> <p class="text-sm text-foreground-500">Welcome back, ${escape(user ? `${user.first_name} ${user.last_name}` : "Admin")}</p></div> <div class="flex items-center gap-4"><button class="w-10 h-10 rounded-full bg-background-200 flex items-center justify-center text-foreground-600 hover:bg-background-300 transition-all" data-svelte-h="svelte-1d4ur4o"><i class="ri-notification-3-line"></i></button> ${user ? `<div class="w-10 h-10 rounded-full bg-primary-500 flex items-center justify-center text-background-50 font-bold uppercase"${add_attribute("title", `${user.first_name} ${user.last_name}`, 0)}>${escape(user.first_name[0])}${escape(user.last_name[0])}</div>` : ``}</div></header> ${slots.default ? slots.default({}) : ``}</main></div>`;
});
export {
  Layout as default
};
