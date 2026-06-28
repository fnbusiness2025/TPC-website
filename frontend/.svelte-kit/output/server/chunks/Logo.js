import { c as create_ssr_component } from "./ssr.js";
const Logo = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { isScrolled = false } = $$props;
  if ($$props.isScrolled === void 0 && $$bindings.isScrolled && isScrolled !== void 0) $$bindings.isScrolled(isScrolled);
  return `<div class="flex items-center gap-2" data-svelte-h="svelte-1hm9akj"> <img src="/Lg5.png" alt="Terrestrial Logo" class="h-40 w-40 object-contain rounded-lg"></div>`;
});
export {
  Logo as L
};
