import { c as create_ssr_component, e as escape } from "./ssr.js";
const Logo = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { isScrolled = false } = $$props;
  if ($$props.isScrolled === void 0 && $$bindings.isScrolled && isScrolled !== void 0) $$bindings.isScrolled(isScrolled);
  return `<div class="flex items-center gap-3"><img src="/Lg4.png" alt="Terrestrial Logo" class="w-14 h-14 rounded-lg object-cover"> <div class="flex flex-col"><span class="${"text-sm font-bold uppercase tracking-wider leading-none transition-colors " + escape(
    isScrolled ? "text-foreground-950" : "text-background-50",
    true
  )}">Terrestrial</span> <span class="${"text-[10px] uppercase tracking-[0.2em] leading-none mt-1 transition-colors " + escape(isScrolled ? "text-accent-600" : "text-accent-400", true)}">Property Consulting</span></div></div>`;
});
export {
  Logo as L
};
