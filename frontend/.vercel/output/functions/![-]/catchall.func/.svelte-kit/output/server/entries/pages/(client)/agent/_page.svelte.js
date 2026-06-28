import { c as create_ssr_component, v as validate_component, e as escape, d as each, f as add_attribute } from "../../../../chunks/ssr.js";
import { H as Header, F as Footer } from "../../../../chunks/Footer.js";
import "@sveltejs/kit/internal";
import "../../../../chunks/exports.js";
import "../../../../chunks/utils2.js";
import "@sveltejs/kit/internal/server";
import "../../../../chunks/state.svelte.js";
function formatPrice(price, listingType) {
  const formatted = new Intl.NumberFormat(
    "en-MW",
    {
      style: "currency",
      currency: "MWK",
      maximumFractionDigits: 0
    }
  ).format(price).replace("MWK", "MK");
  return listingType === "rent" ? `${formatted} / month` : formatted;
}
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let properties;
  let inquiries;
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  ({ properties, inquiries } = data);
  return `${$$result.head += `<!-- HEAD_svelte-1bkippi_START -->${$$result.title = `<title>Agent Dashboard | Terrestrial Property Consulting</title>`, ""}<!-- HEAD_svelte-1bkippi_END -->`, ""} <div class="flex flex-col min-h-screen bg-background-100">${validate_component(Header, "Header").$$render($$result, {}, {}, {})} <main class="flex-grow pt-[88px] pb-16"> <section class="bg-accent-950 text-background-50 py-12 px-6 md:px-10" data-svelte-h="svelte-1f85lsp"><div class="max-w-[1400px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6"><div><div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-600/25 text-accent-300 border border-accent-500/20 text-[10px] font-bold uppercase tracking-widest mb-3">Broker Interface</div> <h1 class="text-3xl font-bold font-heading">Agent Dashboard</h1> <p class="text-background-300 text-xs mt-1">Manage listings and review property leads.</p></div> <div><a href="/agent/new" class="bg-accent-600 hover:bg-accent-700 text-background-50 font-bold px-6 py-4 rounded-xl text-xs uppercase tracking-widest transition-all shadow-lg shadow-accent-600/20 flex items-center gap-2"><i class="ri-add-line text-lg"></i> <span>List New Property</span></a></div></div></section>  <section class="py-12 max-w-[1400px] mx-auto px-6 md:px-10"> <div class="flex border-b border-background-200 mb-8"><button type="button" class="${"px-6 py-4 text-xs font-bold uppercase tracking-widest transition-all border-b-2 " + escape(
    "border-accent-600 text-accent-700 font-extrabold",
    true
  )}">My Properties (${escape(properties.length)})</button> <button type="button" class="${"px-6 py-4 text-xs font-bold uppercase tracking-widest transition-all border-b-2 " + escape(
    "border-transparent text-foreground-500 hover:text-foreground-800",
    true
  )}">Leads &amp; Inquiries (${escape(inquiries.length)})</button></div>  ${`<div>${properties.length === 0 ? `<div class="bg-background-50 border border-background-200 rounded-3xl p-12 text-center shadow-sm" data-svelte-h="svelte-jtnsv6"><div class="w-14 h-14 bg-background-100 text-foreground-450 rounded-full flex items-center justify-center mx-auto mb-6"><i class="ri-hotel-line text-2xl"></i></div> <h3 class="text-base font-bold font-heading text-foreground-950 mb-2">No Properties Listed</h3> <p class="text-xs text-foreground-500 max-w-sm mx-auto mb-6">You haven&#39;t listed any properties yet. Click the button below to add your first real estate listing.</p> <a href="/agent/new" class="inline-flex items-center gap-2 bg-accent-600 hover:bg-accent-700 text-background-50 font-bold px-6 py-3.5 rounded-xl text-xs uppercase tracking-widest transition-all">Create Listing</a></div>` : `<div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">${each(properties, (prop) => {
    return `<div class="group bg-background-50 border border-background-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"><div> <div class="relative aspect-[16/10] w-full bg-background-200 overflow-hidden">${prop.primary_image ? `<img${add_attribute("src", prop.primary_image, 0)}${add_attribute("alt", prop.title, 0)} class="w-full h-full object-cover">` : `<div class="w-full h-full flex flex-col items-center justify-center text-foreground-350 bg-background-150" data-svelte-h="svelte-47j68l"><i class="ri-image-line text-3xl mb-1"></i> <span class="text-[10px]">No image</span> </div>`}  <div class="absolute top-4 left-4 flex flex-col gap-2"><span class="px-2.5 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-wider text-background-50 bg-accent-600">For ${escape(prop.listing_type)}</span> ${prop.status === "approved" ? `<span class="px-2.5 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-wider text-green-700 bg-green-100 border border-green-200" data-svelte-h="svelte-d0e3i0">Approved
                          </span>` : `${prop.status === "pending" ? `<span class="px-2.5 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-wider text-amber-700 bg-amber-100 border border-amber-200" data-svelte-h="svelte-84pgid">Pending Approval
                          </span>` : `<span class="px-2.5 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-wider text-red-700 bg-red-100 border border-red-200" data-svelte-h="svelte-17aj6op">Rejected
                          </span>`}`} </div></div>  <div class="p-6"><div class="text-base font-bold text-accent-700 mb-1 font-heading">${escape(formatPrice(prop.price, prop.listing_type))}</div> <h3 class="text-sm font-bold text-foreground-950 line-clamp-1 mb-2">${escape(prop.title)}</h3> <div class="flex items-center gap-1.5 text-xs text-foreground-450 mb-4"><i class="ri-map-pin-line text-sm text-accent-600"></i> <span>${escape(prop.address)}, ${escape(prop.city)}</span></div>  <div class="flex items-center gap-3 text-[11px] text-foreground-500 font-semibold border-t border-background-150 pt-3">${prop.property_type !== "land" ? `<span>${escape(prop.bedrooms || 0)} Beds</span> <span class="text-background-300" data-svelte-h="svelte-3vst8t">•</span> <span>${escape(prop.bathrooms || 0)} Baths</span> <span class="text-background-300" data-svelte-h="svelte-3vst8t">•</span>` : ``} <span>${escape(prop.square_meters ? `${prop.square_meters} m²` : "N/A")}</span></div> </div></div>  <div class="px-6 pb-6 pt-2 flex items-center gap-3 border-t border-background-150 mt-auto">${prop.status === "approved" ? `<a href="${"/properties/" + escape(prop.id, true)}" class="flex-1 text-center bg-background-100 hover:bg-background-200 text-foreground-850 font-bold py-2.5 rounded-lg text-[10px] uppercase tracking-widest border border-background-200 transition-colors">View Publicly
                      </a>` : ``} <form method="POST" action="?/deleteProperty" class="flex-1"><input type="hidden" name="propertyId"${add_attribute("value", prop.id, 0)}> <button type="submit" class="w-full text-center bg-red-50 hover:bg-red-500 hover:text-white text-red-600 font-bold py-2.5 rounded-lg text-[10px] uppercase tracking-widest border border-red-200/55 transition-colors" data-svelte-h="svelte-o87xrq">Delete</button> </form></div> </div>`;
  })}</div>`}</div>`}  ${``}</section></main> ${validate_component(Footer, "Footer").$$render($$result, {}, {}, {})}</div>`;
});
export {
  Page as default
};
