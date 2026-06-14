import { c as create_ssr_component, d as each, e as escape, f as add_attribute } from "../../../../chunks/ssr.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const stats = [
    {
      label: "Total Properties",
      value: "124",
      icon: "ri-hotel-line",
      trend: "+12%",
      color: "text-blue-600",
      bg: "bg-blue-50"
    },
    {
      label: "Active Valuations",
      value: "18",
      icon: "ri-scales-3-line",
      trend: "+3",
      color: "text-amber-600",
      bg: "bg-amber-50"
    },
    {
      label: "New Inquiries",
      value: "42",
      icon: "ri-chat-voice-line",
      trend: "+24%",
      color: "text-green-600",
      bg: "bg-green-50"
    },
    {
      label: "Total Revenue (Est)",
      value: "MK 145M",
      icon: "ri-money-dollar-box-line",
      trend: "+8%",
      color: "text-purple-600",
      bg: "bg-purple-50"
    }
  ];
  return `${$$result.head += `<!-- HEAD_svelte-b05vh0_START -->${$$result.title = `<title>Admin Dashboard | Terrestrial Property Consulting</title>`, ""}<!-- HEAD_svelte-b05vh0_END -->`, ""} <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">${each(stats, (stat) => {
    return `<div class="bg-background-50 p-6 rounded-2xl shadow-sm border border-background-200"><div class="flex justify-between items-start mb-4"><div class="${"w-12 h-12 " + escape(stat.bg, true) + " " + escape(stat.color, true) + " rounded-xl flex items-center justify-center text-2xl"}"><i${add_attribute("class", stat.icon, 0)}></i></div> <span class="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-lg">${escape(stat.trend)}</span></div> <div class="text-sm text-foreground-500 font-medium mb-1">${escape(stat.label)}</div> <div class="text-2xl font-bold font-heading text-foreground-950">${escape(stat.value)}</div> </div>`;
  })}</div> <div class="grid grid-cols-1 lg:grid-cols-3 gap-8"> <div class="lg:col-span-2 bg-background-50 rounded-2xl shadow-sm border border-background-200 overflow-hidden"><div class="px-6 py-5 border-b border-background-200 flex justify-between items-center" data-svelte-h="svelte-mhmb70"><h3 class="font-bold font-heading text-foreground-950">Recent Property Listings</h3> <button class="text-sm text-primary-600 font-semibold hover:underline">View All</button></div> <div class="overflow-x-auto"><table class="w-full text-left"><thead data-svelte-h="svelte-i305o4"><tr class="bg-background-100/50 text-xs uppercase tracking-wider text-foreground-500"><th class="px-6 py-4 font-semibold">Property</th> <th class="px-6 py-4 font-semibold">Location</th> <th class="px-6 py-4 font-semibold">Price</th> <th class="px-6 py-4 font-semibold">Status</th></tr></thead> <tbody class="divide-y divide-background-200">${each([1, 2, 3, 4], (i) => {
    return `<tr class="hover:bg-background-100/30 transition-colors"><td class="px-6 py-4"><div class="flex items-center gap-3"><div class="w-10 h-10 rounded-lg bg-background-200"></div> <div class="text-sm font-semibold text-foreground-900">Modern Villa ${escape(i)}</div> </div></td> <td class="px-6 py-4 text-sm text-foreground-600" data-svelte-h="svelte-140i85z">Nyambadwe, Blantyre</td> <td class="px-6 py-4 text-sm font-bold text-foreground-900" data-svelte-h="svelte-pf91cf">MK 85,000,000</td> <td class="px-6 py-4" data-svelte-h="svelte-1hvnmk6"><span class="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full bg-green-100 text-green-700">Published</span></td> </tr>`;
  })}</tbody></table></div></div>  <div class="bg-background-50 rounded-2xl shadow-sm border border-background-200 p-6"><h3 class="font-bold font-heading text-foreground-950 mb-6" data-svelte-h="svelte-1a94lac">Recent Inquiries</h3> <div class="space-y-6">${each([1, 2, 3], (i) => {
    return `<div class="flex gap-4"><div class="w-10 h-10 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center font-bold text-sm flex-shrink-0">${escape(i === 1 ? "MK" : i === 2 ? "SL" : "AW")}</div> <div><div class="text-sm font-bold text-foreground-900">${escape(i === 1 ? "Mphatso Kapeni" : i === 2 ? "Sarah Lungu" : "Andrew White")}</div> <div class="text-xs text-foreground-500 mb-2">Interested in Property ${escape(i)}</div> <div class="text-[10px] text-foreground-400 bg-background-100 inline-block px-2 py-0.5 rounded" data-svelte-h="svelte-7migmy">2 hours ago</div></div> </div>`;
  })}</div> <button class="w-full mt-8 py-3 rounded-xl border-2 border-background-200 text-sm font-bold text-foreground-600 hover:bg-background-100 transition-all" data-svelte-h="svelte-u7wo15">View All Inquiries</button></div></div>`;
});
export {
  Page as default
};
