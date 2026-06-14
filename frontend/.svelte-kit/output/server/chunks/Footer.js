import { c as create_ssr_component, s as subscribe, e as escape, v as validate_component, d as each, f as add_attribute } from "./ssr.js";
import { p as page } from "./stores.js";
import { L as Logo } from "./Logo.js";
const Header = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let isScrolled = false;
  let activeDropdown = null;
  const buyMenu = {
    title: "Buy",
    sections: [
      {
        name: "Property for Sale",
        href: "/properties/sale"
      },
      { name: "Land", href: "/properties/land" },
      {
        name: "Residential",
        href: "/properties/residential"
      },
      {
        name: "Commercial Property for Sale",
        href: "/properties/commercial-sale"
      }
    ]
  };
  const rentMenu = {
    title: "Rent",
    sections: [
      {
        name: "Looking to Rent?",
        href: "/properties/rent"
      },
      {
        name: "House to Rent",
        href: "/properties/house-rent"
      },
      {
        name: "Apartment / Flat to Rent",
        href: "/properties/apartment-rent"
      },
      {
        name: "Commercial Property to Rent",
        href: "/properties/commercial-rent"
      },
      {
        name: "Retirement Property to Rent",
        href: "/properties/retirement-rent"
      }
    ]
  };
  const commercialMenu = {
    title: "Commercial",
    sections: [
      {
        name: "Find Commercial Property",
        href: "/properties/commercial"
      },
      {
        name: "Commercial Property for Sale",
        href: "/properties/commercial-sale"
      },
      {
        name: "Commercial Property to Rent",
        href: "/properties/commercial-rent"
      },
      {
        name: "Industrial Property for Sale",
        href: "/properties/industrial-sale"
      },
      {
        name: "Industrial Property to Rent",
        href: "/properties/industrial-rent"
      }
    ]
  };
  const mainNav = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Contact", href: "/contact" },
    { name: "List Property", href: "/sell" }
  ];
  const utilityNav = [
    {
      name: "Login",
      icon: "ri-user-line",
      href: "/account"
    }
  ];
  $page.url.pathname;
  $$unsubscribe_page();
  return `<header class="${"fixed top-0 left-0 right-0 z-50 h-[88px] transition-all duration-400 px-6 md:px-10 flex items-center justify-between " + escape(
    "bg-transparent",
    true
  )}"><div class="flex items-center gap-10"><a href="/" class="hover:opacity-90 transition-opacity">${validate_component(Logo, "Logo").$$render($$result, { isScrolled }, {}, {})}</a>  <nav class="hidden lg:flex items-center" aria-label="Main Navigation"><div class="flex items-center h-[88px]">${each([buyMenu, rentMenu, commercialMenu], (menu) => {
    return `<div class="relative h-full flex items-center px-4 group cursor-pointer" role="button" tabindex="0"${add_attribute("aria-expanded", activeDropdown === menu.title, 0)} aria-haspopup="true"><span class="${"text-sm font-bold uppercase tracking-widest transition-colors " + escape(
      "text-background-50",
      true
    ) + " group-hover:text-accent-600"}">${escape(menu.title)} <i class="${"ri-arrow-down-s-line ml-1 transition-transform " + escape(activeDropdown === menu.title ? "rotate-180" : "", true)}"></i></span> ${activeDropdown === menu.title ? `<div class="absolute top-[88px] left-0 w-[280px] bg-background-50 border border-background-200 shadow-2xl rounded-b-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200" role="menu"><div class="p-2 flex flex-col">${each(menu.sections, (item) => {
      return `<a${add_attribute("href", item.href, 0)} class="px-5 py-3 text-sm font-medium text-foreground-700 hover:bg-accent-600/10 hover:text-accent-700 rounded-xl transition-all" role="menuitem">${escape(item.name)} </a>`;
    })}</div> </div>` : ``} </div>`;
  })}</div></nav></div>  <div class="flex items-center gap-6"><nav class="hidden xl:flex items-center gap-8">${each(mainNav, (item) => {
    return `<a${add_attribute("href", item.href, 0)} class="${"text-xs font-bold uppercase tracking-widest transition-all " + escape(
      "text-background-50/80 hover:text-background-50",
      true
    )}">${escape(item.name)} </a>`;
  })}</nav> <div class="hidden lg:flex items-center gap-4 pl-6 border-l border-background-200/20">${each(utilityNav, (item) => {
    return `<a${add_attribute("href", item.href, 0)} class="${"flex items-center gap-2 text-xs font-bold uppercase tracking-widest transition-all " + escape(
      "text-background-50 hover:text-accent-400",
      true
    )}"><i class="${escape(item.icon, true) + " text-lg"}"></i> <span class="hidden xl:inline">${escape(item.name)}</span> </a>`;
  })}</div>  <button class="${"lg:hidden w-10 h-10 rounded-lg flex items-center justify-center transition-colors " + escape(
    "hover:bg-background-50/10 text-background-50",
    true
  )}"><i${add_attribute(
    "class",
    "ri-menu-line text-2xl",
    0
  )}></i></button></div>  ${``}</header>`;
});
const Footer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const quickLinks = [
    { name: "Home", href: "/" },
    {
      name: "Properties",
      href: "/properties/sale"
    },
    {
      name: "Market Insights",
      href: "/services"
    },
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" }
  ];
  const services = [
    {
      name: "Property Valuation",
      href: "/services"
    },
    { name: "Estate Agency", href: "/services" },
    {
      name: "Property Management",
      href: "/services"
    },
    {
      name: "Investment Consulting",
      href: "/services"
    },
    {
      name: "Market Research",
      href: "/services"
    }
  ];
  const socials = [
    {
      icon: "ri-facebook-fill",
      href: "https://facebook.com"
    },
    {
      icon: "ri-twitter-x-fill",
      href: "https://twitter.com"
    },
    {
      icon: "ri-instagram-line",
      href: "https://instagram.com"
    },
    {
      icon: "ri-linkedin-box-fill",
      href: "https://linkedin.com"
    }
  ];
  return `<footer class="bg-accent-950 text-background-50"><div class="max-w-[1400px] mx-auto px-6 md:px-10 py-16 md:py-24"><div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16"> <div class="flex flex-col gap-6"><div class="brightness-0 invert opacity-90">${validate_component(Logo, "Logo").$$render($$result, { isScrolled: false }, {}, {})}</div> <p class="text-sm text-background-300 leading-relaxed max-w-xs" data-svelte-h="svelte-hn1sxq">Malawi&#39;s premier property consulting firm, dedicated to bringing international standards to the local real estate market with integrity and excellence.</p> <div class="flex gap-3">${each(socials, (social) => {
    return `<a${add_attribute("href", social.href, 0)} class="w-9 h-9 rounded-lg bg-background-400/15 hover:bg-accent-600 flex items-center justify-center transition-all group"><i class="${escape(social.icon, true) + " text-lg text-background-200 group-hover:text-background-50"}"></i> </a>`;
  })}</div></div>  <div class="flex flex-col gap-6"><h4 class="text-xs font-semibold tracking-[0.15em] uppercase text-background-400" data-svelte-h="svelte-oly7ss">Quick Links</h4> <nav class="flex flex-col gap-3">${each(quickLinks, (link) => {
    return `<a${add_attribute("href", link.href, 0)} class="text-sm text-background-200 hover:text-accent-400 transition-colors">${escape(link.name)} </a>`;
  })}</nav></div>  <div class="flex flex-col gap-6"><h4 class="text-xs font-semibold tracking-[0.15em] uppercase text-background-400" data-svelte-h="svelte-qklgkw">Our Services</h4> <nav class="flex flex-col gap-3">${each(services, (service) => {
    return `<a${add_attribute("href", service.href, 0)} class="text-sm text-background-200 hover:text-accent-400 transition-colors">${escape(service.name)} </a>`;
  })}</nav></div>  <div class="flex flex-col gap-6" data-svelte-h="svelte-tnkhqx"><h4 class="text-xs font-semibold tracking-[0.15em] uppercase text-background-400">Contact Us</h4> <div class="flex flex-col gap-4"><div class="flex gap-4"><i class="ri-map-pin-line text-accent-400 text-lg mt-0.5"></i> <div class="text-sm text-background-200"><p>Behind Reunion Insurance Building</p> <p>Maselema, Blantyre, Malawi</p></div></div> <div class="flex gap-4"><i class="ri-phone-line text-accent-400 text-lg mt-0.5"></i> <div class="text-sm text-background-200"><p>+265 884 997 346</p> <p>+265 888 141 612</p></div></div> <div class="flex gap-4"><i class="ri-mail-line text-accent-400 text-lg mt-0.5"></i> <div class="text-sm text-background-200"><p>info@tpcmalawi.com</p></div></div> <div class="flex gap-4"><i class="ri-time-line text-accent-400 text-lg mt-0.5"></i> <div class="text-sm text-background-200"><p>Mon - Fri: 8:00 - 17:00</p> <p>Sat: 8:00 - 12:00</p></div></div></div></div></div>  <div class="mt-16 md:mt-24 pt-8 border-t border-background-400/20 flex flex-col md:flex-row justify-between items-center gap-6"><p class="text-xs text-background-400 uppercase tracking-widest">© ${escape((/* @__PURE__ */ new Date()).getFullYear())} Terrestrial Property Consulting. All rights reserved.</p> <div class="flex gap-8" data-svelte-h="svelte-nv8sbb"><a href="/privacy" class="text-[10px] text-background-400 hover:text-accent-400 uppercase tracking-widest transition-colors">Privacy Policy</a> <a href="/terms" class="text-[10px] text-background-400 hover:text-accent-400 uppercase tracking-widest transition-colors">Terms of Service</a></div></div></div></footer>`;
});
export {
  Footer as F,
  Header as H
};
