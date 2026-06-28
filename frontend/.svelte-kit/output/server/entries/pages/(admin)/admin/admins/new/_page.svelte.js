import { c as create_ssr_component, e as escape, d as add_attribute } from "../../../../../../chunks/ssr.js";
import "@sveltejs/kit/internal";
import "../../../../../../chunks/exports.js";
import "../../../../../../chunks/utils2.js";
import "@sveltejs/kit/internal/server";
import "../../../../../../chunks/state.svelte.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { form } = $$props;
  let firstName = "";
  let lastName = "";
  let email = "";
  let phone = "";
  let password = "";
  let confirmPassword = "";
  let successState = false;
  let successMessage = "";
  let errorState = false;
  let errorMessage = "";
  if ($$props.form === void 0 && $$bindings.form && form !== void 0) $$bindings.form(form);
  {
    if (form) {
      if (form.error) {
        errorState = true;
        errorMessage = form.message;
        successState = false;
      } else if (form.success) {
        successState = true;
        successMessage = form.message;
        errorState = false;
        firstName = "";
        lastName = "";
        email = "";
        phone = "";
        password = "";
        confirmPassword = "";
      }
    }
  }
  return `${$$result.head += `<!-- HEAD_svelte-1kbd3g2_START -->${$$result.title = `<title>Add Administrator | Admin Portal</title>`, ""}<!-- HEAD_svelte-1kbd3g2_END -->`, ""} <div class="max-w-[700px] bg-background-50 border border-background-200 rounded-3xl p-8 md:p-12 shadow-sm"><div class="mb-8 pb-6 border-b border-background-200" data-svelte-h="svelte-17ja71i"><h3 class="text-lg font-bold font-heading text-foreground-950">Register New Administrator</h3> <p class="text-xs text-foreground-500 mt-1">Provide credentials to grant administrative panel access.</p></div> ${successState ? `<div class="bg-accent-600/10 border border-accent-600/20 text-accent-800 rounded-2xl p-6 text-center mb-6"><div class="w-12 h-12 bg-accent-600 text-background-50 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm" data-svelte-h="svelte-51geyr"><i class="ri-checkbox-circle-fill text-2xl"></i></div> <h4 class="text-sm font-bold font-heading mb-1" data-svelte-h="svelte-1ikii1i">Account Created</h4> <p class="text-xs leading-normal">${escape(successMessage)}</p> <button type="button" class="text-xs font-bold text-accent-600 hover:text-accent-700 uppercase tracking-widest mt-4 underline" data-svelte-h="svelte-1fu9dfs">Add Another Admin</button></div>` : `${errorState ? `<div class="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 mb-6 text-xs font-semibold">${escape(errorMessage)}</div>` : ``} <form method="POST" action="?/createAdmin" class="flex flex-col gap-5 text-xs"><div class="grid grid-cols-2 gap-4"><div class="flex flex-col gap-1.5"><label for="firstName" class="text-[10px] font-bold uppercase tracking-widest text-foreground-500 ml-1" data-svelte-h="svelte-1g568sh">First Name *</label> <input type="text" name="firstName" id="firstName" placeholder="First" required class="bg-background-100 border border-background-200 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-accent-600/20 focus:border-accent-600 transition-all text-xs"${add_attribute("value", firstName, 0)}></div> <div class="flex flex-col gap-1.5"><label for="lastName" class="text-[10px] font-bold uppercase tracking-widest text-foreground-500 ml-1" data-svelte-h="svelte-i6maex">Last Name *</label> <input type="text" name="lastName" id="lastName" placeholder="Last" required class="bg-background-100 border border-background-200 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-accent-600/20 focus:border-accent-600 transition-all text-xs"${add_attribute("value", lastName, 0)}></div></div> <div class="flex flex-col gap-1.5"><label for="email" class="text-[10px] font-bold uppercase tracking-widest text-foreground-500 ml-1" data-svelte-h="svelte-1tbmsuv">Email Address *</label> <input type="email" name="email" id="email" placeholder="admin@tpcmalawi.com" required class="bg-background-100 border border-background-200 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-accent-600/20 focus:border-accent-600 transition-all text-xs"${add_attribute("value", email, 0)}></div> <div class="flex flex-col gap-1.5"><label for="phone" class="text-[10px] font-bold uppercase tracking-widest text-foreground-500 ml-1" data-svelte-h="svelte-d92m69">Phone Number (Optional)</label> <input type="tel" name="phone" id="phone" placeholder="+265..." class="bg-background-100 border border-background-200 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-accent-600/20 focus:border-accent-600 transition-all text-xs"${add_attribute("value", phone, 0)}></div> <div class="grid grid-cols-2 gap-4"><div class="flex flex-col gap-1.5"><label for="password" class="text-[10px] font-bold uppercase tracking-widest text-foreground-500 ml-1" data-svelte-h="svelte-zop03f">Password *</label> <input type="password" name="password" id="password" placeholder="••••••••" required class="bg-background-100 border border-background-200 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-accent-600/20 focus:border-accent-600 transition-all text-xs"${add_attribute("value", password, 0)}></div> <div class="flex flex-col gap-1.5"><label for="confirmPassword" class="text-[10px] font-bold uppercase tracking-widest text-foreground-500 ml-1" data-svelte-h="svelte-pa22it">Confirm Password *</label> <input type="password" id="confirmPassword" placeholder="••••••••" required class="bg-background-100 border border-background-200 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-accent-600/20 focus:border-accent-600 transition-all text-xs"${add_attribute("value", confirmPassword, 0)}></div></div> <button type="submit" ${""} class="bg-accent-600 hover:bg-accent-700 disabled:opacity-85 text-background-50 font-bold py-4 rounded-xl transition-all shadow-md shadow-accent-600/10 uppercase tracking-widest text-xs mt-4 flex items-center justify-center gap-2">${`<i class="ri-user-add-line text-lg"></i> <span data-svelte-h="svelte-1apomew">Create Admin User</span>`}</button></form>`}</div>`;
});
export {
  Page as default
};
