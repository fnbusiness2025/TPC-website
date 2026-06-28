import { c as create_ssr_component, e as escape, f as each, d as add_attribute } from "../../../../../../chunks/ssr.js";
import "@sveltejs/kit/internal";
import "../../../../../../chunks/exports.js";
import "../../../../../../chunks/utils2.js";
import "@sveltejs/kit/internal/server";
import "../../../../../../chunks/state.svelte.js";
function formatDate(isoString) {
  return new Date(isoString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
}
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let pendingAgents;
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  ({ pendingAgents } = data);
  return `${$$result.head += `<!-- HEAD_svelte-1k95713_START -->${$$result.title = `<title>Agent Verification Queue | Admin Portal</title>`, ""}<!-- HEAD_svelte-1k95713_END -->`, ""} <div class="bg-background-50 rounded-2xl border border-background-200 overflow-hidden shadow-sm"><div class="px-6 py-5 border-b border-background-200 flex justify-between items-center bg-background-50/50"><h3 class="font-bold font-heading text-foreground-950" data-svelte-h="svelte-pty972">Pending Agent Verification Queue</h3> <span class="text-xs text-amber-700 bg-amber-50 border border-amber-200/60 px-3 py-1 rounded-xl font-bold">${escape(pendingAgents.length)} Applications</span></div> ${pendingAgents.length === 0 ? `<div class="p-12 text-center" data-svelte-h="svelte-19lec6g"><div class="w-14 h-14 bg-background-100 text-foreground-450 rounded-full flex items-center justify-center mx-auto mb-6"><i class="ri-checkbox-circle-line text-2xl"></i></div> <h3 class="text-base font-bold font-heading text-foreground-950 mb-2">Queue is Empty</h3> <p class="text-xs text-foreground-550 max-w-sm mx-auto">All agent registration applications have been processed. Great job!</p></div>` : `<div class="overflow-x-auto"><table class="w-full text-left"><thead data-svelte-h="svelte-1oznxj8"><tr class="bg-background-100/50 text-[10px] uppercase tracking-widest text-foreground-550 border-b border-background-200 font-bold"><th class="px-6 py-4">Agent Name</th> <th class="px-6 py-4">Proposed Agency</th> <th class="px-6 py-4">Contact Info</th> <th class="px-6 py-4">Applied Date</th> <th class="px-6 py-4 text-right">Verification Decisions</th></tr></thead> <tbody class="divide-y divide-background-200 text-xs">${each(pendingAgents, (agent) => {
    return `<tr class="hover:bg-background-100/20 transition-colors"> <td class="px-6 py-4"><div class="flex items-center gap-3"><div class="w-10 h-10 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-sm">${escape(agent.first_name[0])}${escape(agent.last_name[0])}</div> <div><div class="font-bold text-foreground-950">${escape(agent.first_name)} ${escape(agent.last_name)}</div> <span class="text-[9px] font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-100 mt-1 inline-block" data-svelte-h="svelte-122v53y">Pending Review</span></div> </div></td>  <td class="px-6 py-4"><div class="font-bold text-foreground-900">${escape(agent.agency_name)}</div> ${agent.office_address ? `<div class="text-[10px] text-foreground-450 mt-1 italic">${escape(agent.office_address)}</div>` : ``}</td>  <td class="px-6 py-4"><div class="font-semibold text-foreground-850">${escape(agent.email)}</div> ${agent.phone ? `<div class="text-foreground-500 mt-0.5">${escape(agent.phone)}</div>` : ``}</td>  <td class="px-6 py-4 text-foreground-500 font-medium">${escape(formatDate(agent.created_at))}</td>  <td class="px-6 py-4 text-right"><div class="flex items-center justify-end gap-3"><form method="POST" action="?/approveAgent"><input type="hidden" name="agentId"${add_attribute("value", agent.id, 0)}> <button type="submit" class="bg-green-600 hover:bg-green-700 text-white font-bold px-4 py-2.5 rounded-lg transition-colors text-[10px] uppercase tracking-wider" data-svelte-h="svelte-1wpbkqj">Approve
                    </button></form> <form method="POST" action="?/rejectAgent"><input type="hidden" name="agentId"${add_attribute("value", agent.id, 0)}> <button type="submit" class="bg-red-50 hover:bg-red-100 text-red-750 font-bold px-4 py-2.5 rounded-lg border border-red-200 transition-colors text-[10px] uppercase tracking-wider" data-svelte-h="svelte-fnfffm">Reject
                    </button></form> </div></td> </tr>`;
  })}</tbody></table></div>`}</div>`;
});
export {
  Page as default
};
