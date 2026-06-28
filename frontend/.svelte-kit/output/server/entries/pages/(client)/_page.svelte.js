import { c as create_ssr_component, o as onDestroy, f as each, e as escape, d as add_attribute, v as validate_component } from "../../../chunks/ssr.js";
import { H as Header, F as Footer } from "../../../chunks/Footer.js";
import { s as services } from "../../../chunks/services.js";
const Hero = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let showFilters = false;
  let activeListingType = "buy";
  const carouselProperties = [
    {
      id: 1,
      title: "Luxury Villa in Sunnyside",
      location: "Sunnyside, Blantyre",
      price: "MK 450,000,000",
      type: "Premium Listing",
      image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80",
      beds: 4,
      baths: 3,
      area: "350m²"
    },
    {
      id: 2,
      title: "Modern City Apartment",
      location: "City Centre, Lilongwe",
      price: "MK 120,000,000",
      type: "For Sale",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80",
      beds: 2,
      baths: 2,
      area: "110m²"
    },
    {
      id: 3,
      title: "Executive Office Suite",
      location: "Victoria Avenue, Blantyre",
      price: "MK 2,500,000/mo",
      type: "Commercial",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80",
      beds: 0,
      baths: 2,
      area: "200m²"
    },
    {
      id: 4,
      title: "Family Home in Area 47",
      location: "Area 47, Lilongwe",
      price: "MK 280,000,000",
      type: "For Sale",
      image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&q=80",
      beds: 3,
      baths: 2,
      area: "220m²"
    },
    {
      id: 5,
      title: "Nyambadwe Heights",
      location: "Nyambadwe, Blantyre",
      price: "MK 350,000,000",
      type: "New Development",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80",
      beds: 4,
      baths: 4,
      area: "400m²"
    }
  ];
  let currentSlide = 0;
  carouselProperties.length;
  let interval;
  onDestroy(() => {
    clearInterval(interval);
  });
  const stats = [
    {
      number: "1,200+",
      label: "PROPERTIES LISTED"
    },
    { number: "850+", label: "HAPPY CLIENTS" },
    { number: "15+", label: "YEARS EXPERIENCE" }
  ];
  const propertyTypes = [
    "House",
    "Apartment / Flat",
    "Townhouse",
    "Vacant Land / Plot",
    "Farm",
    "Commercial Property",
    "Industrial Property"
  ];
  const locations = ["Blantyre", "Lilongwe", "Mzuzu", "Zomba"];
  return `<section class="relative w-full min-h-[600px] md:min-h-[700px] lg:min-h-[850px] flex items-center justify-center overflow-hidden pt-32 pb-20" aria-label="Property Showcase Carousel"> ${each(carouselProperties, (prop, i) => {
    return `${i === currentSlide ? `<div class="absolute inset-0 bg-cover bg-center transition-all duration-1000 scale-105" style="${"background-image: url('" + escape(prop.image, true) + "');"}"></div>` : ``}`;
  })} <div class="absolute inset-0 bg-gradient-to-b from-accent-950/90 via-accent-950/60 to-accent-950/90"></div>  <button class="absolute left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full border border-background-50/10 bg-background-50/5 hover:bg-background-50/10 text-background-50 flex items-center justify-center transition-all hidden md:flex" aria-label="Previous Slide" data-svelte-h="svelte-muqreb"><i class="ri-arrow-left-s-line text-2xl"></i></button> <button class="absolute right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full border border-background-50/10 bg-background-50/5 hover:bg-background-50/10 text-background-50 flex items-center justify-center transition-all hidden md:flex" aria-label="Next Slide" data-svelte-h="svelte-vrvfp5"><i class="ri-arrow-right-s-line text-2xl"></i></button>  <div class="absolute left-10 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-4 z-20">${each(carouselProperties, (_, i) => {
    return `<button class="group flex items-center gap-4 text-left" aria-label="${"Go to slide " + escape(i + 1, true)}"><div class="${"w-1.5 h-1.5 rounded-full transition-all duration-300 " + escape(
      i === currentSlide ? "bg-accent-600 scale-150" : "bg-background-50/30 group-hover:bg-background-50/60",
      true
    )}"></div> <span class="${"text-[9px] font-bold uppercase tracking-widest transition-all duration-300 " + escape(
      i === currentSlide ? "text-accent-400 opacity-100" : "text-background-50 opacity-0 group-hover:opacity-50",
      true
    )}">0${escape(i + 1)}</span> </button>`;
  })}</div>  <div class="relative z-10 w-full max-w-[1400px] px-6 md:px-10 flex flex-col items-center text-center"> ${each(carouselProperties, (prop, i) => {
    return `${i === currentSlide ? `<div class="mb-6 flex flex-col items-center animate-in fade-in slide-in-from-top-4 duration-700"><div class="px-4 py-1.5 rounded-full bg-accent-600/20 text-accent-400 border border-accent-600/30 text-[10px] font-bold uppercase tracking-[0.2em] mb-4 backdrop-blur-sm">${escape(prop.type)}</div> <div class="text-background-50 text-xs font-bold uppercase tracking-[0.2em] flex items-center gap-3"><i class="ri-map-pin-2-fill text-accent-600"></i> ${escape(prop.location)} <span class="w-1.5 h-1.5 bg-background-50/20 rounded-full"></span> <span class="text-accent-400">${escape(prop.price)}</span></div> </div>` : ``}`;
  })}  <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-background-50/10 text-background-50 border border-background-50/20 text-[10px] md:text-xs font-bold uppercase tracking-widest mb-6 animate-in fade-in slide-in-from-bottom-4 duration-500 backdrop-blur-sm" data-svelte-h="svelte-1c3iinr"><span class="relative flex h-2 w-2"><span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-background-50/50 opacity-75"></span> <span class="relative inline-flex rounded-full h-2 w-2 bg-background-50"></span></span> <span class="tracking-widest">Malawi&#39;s Leading Real Estate Portal</span></div>  <h1 class="text-3xl md:text-5xl lg:text-7xl font-bold text-background-50 mb-12 font-heading leading-tight max-w-4xl animate-in fade-in slide-in-from-bottom-6 duration-700" data-svelte-h="svelte-1iasort">Find Your Perfect <span class="text-accent-400">Property</span> in Malawi</h1>  <div class="w-full max-w-5xl bg-background-50 rounded-3xl p-3 md:p-6 shadow-[0_40px_100px_rgba(0,0,0,0.4)] animate-in fade-in zoom-in duration-700"><div class="flex flex-col gap-6 text-left"> <div class="flex gap-4 p-1 border-b border-background-200 pb-4">${each(["Buy", "Rent", "Commercial"], (type) => {
    return `<button class="${"px-8 py-3 rounded-2xl text-xs font-bold transition-all uppercase tracking-widest relative " + escape(
      activeListingType.toLowerCase() === type.toLowerCase() ? "text-accent-600" : "text-foreground-500 hover:text-foreground-950",
      true
    )}">${escape(type)} ${activeListingType.toLowerCase() === type.toLowerCase() ? `<span class="absolute bottom-[-17px] left-0 w-full h-1 bg-accent-600 rounded-t-full"></span>` : ``} </button>`;
  })}</div>  <div class="flex flex-col lg:flex-row gap-4"><div class="flex-grow grid grid-cols-1 md:grid-cols-3 gap-4"> <div class="relative"><label for="location-select" class="absolute left-4 top-3 text-[10px] font-bold uppercase tracking-widest text-foreground-400" data-svelte-h="svelte-lqk3xw">Location</label> <select id="location-select" class="w-full bg-background-100 rounded-2xl pt-8 pb-3 px-4 text-sm font-bold text-foreground-950 border border-transparent focus:border-accent-600/30 focus:bg-white transition-all appearance-none cursor-pointer"><option value="Select Location" data-svelte-h="svelte-anhqej">Select Location</option>${each(locations, (loc) => {
    return `<option${add_attribute("value", loc, 0)}>${escape(loc)}</option>`;
  })}</select> <i class="ri-map-pin-2-line absolute right-4 top-1/2 -translate-y-1/2 text-accent-600"></i></div>  <div class="relative"><label for="property-type-select" class="absolute left-4 top-3 text-[10px] font-bold uppercase tracking-widest text-foreground-400" data-svelte-h="svelte-p445zn">Property Type</label> <select id="property-type-select" class="w-full bg-background-100 rounded-2xl pt-8 pb-3 px-4 text-sm font-bold text-foreground-950 border border-transparent focus:border-accent-600/30 focus:bg-white transition-all appearance-none cursor-pointer"><option value="All Types" data-svelte-h="svelte-15fusxs">All Types</option>${each(propertyTypes, (type) => {
    return `<option${add_attribute("value", type, 0)}>${escape(type)}</option>`;
  })}</select> <i class="ri-home-4-line absolute right-4 top-1/2 -translate-y-1/2 text-accent-600"></i></div>  <div class="relative"><label for="price-range-select" class="absolute left-4 top-3 text-[10px] font-bold uppercase tracking-widest text-foreground-400" data-svelte-h="svelte-10j53rh">Price Range</label> <select id="price-range-select" class="w-full bg-background-100 rounded-2xl pt-8 pb-3 px-4 text-sm font-bold text-foreground-950 border border-transparent focus:border-accent-600/30 focus:bg-white transition-all appearance-none cursor-pointer"><option value="Any Price" data-svelte-h="svelte-1vtzl5f">Any Price</option><option value="MK 0 - 50M" data-svelte-h="svelte-856fln">MK 0 - 50M</option><option value="MK 50M - 150M" data-svelte-h="svelte-xn74i2">MK 50M - 150M</option><option value="MK 150M - 500M" data-svelte-h="svelte-uh2g7s">MK 150M - 500M</option><option value="MK 500M+" data-svelte-h="svelte-z45adv">MK 500M+</option></select> <i class="ri-money-dollar-circle-line absolute right-4 top-1/2 -translate-y-1/2 text-accent-600"></i></div></div> <button class="px-12 py-5 bg-accent-600 hover:bg-accent-700 text-background-50 font-bold text-sm rounded-2xl transition-all shadow-xl shadow-accent-600/30 uppercase tracking-[0.2em] flex items-center justify-center gap-3" data-svelte-h="svelte-rsf4qg"><i class="ri-search-2-line text-lg"></i>
            Search</button></div>  <button class="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-foreground-500 hover:text-accent-600 transition-colors w-fit"${add_attribute("aria-expanded", showFilters, 0)}><i class="ri-equalizer-line text-sm"></i> ${escape("Show Advanced Filters")} <i class="${"ri-arrow-down-s-line transition-transform " + escape("", true)}"></i></button>  ${``}</div></div>  <div class="flex flex-wrap justify-center gap-8 md:gap-16 mb-12">${each(stats, (stat, i) => {
    return `<div class="flex items-center gap-8"><div class="text-center"><div class="text-xl md:text-3xl font-bold text-background-50 font-heading tracking-tight">${escape(stat.number)}</div> <div class="text-[9px] md:text-[10px] text-background-300 font-semibold tracking-[0.2em] uppercase mt-1">${escape(stat.label)}</div></div> ${i < stats.length - 1 ? `<div class="hidden md:block w-px h-10 bg-background-50/20"></div>` : ``} </div>`;
  })}</div>  <div class="flex flex-wrap justify-center gap-6" data-svelte-h="svelte-1ljp57u"><button class="bg-accent-600 hover:bg-accent-700 text-background-50 px-8 py-4 rounded-xl font-bold text-[10px] md:text-xs transition-all shadow-lg shadow-accent-600/20 uppercase tracking-[0.2em]">Browse Properties</button> <button class="bg-transparent border-2 border-background-50/30 hover:border-background-50 text-background-50 px-8 py-4 rounded-xl font-bold text-[10px] md:text-xs transition-all uppercase tracking-[0.2em] backdrop-blur-sm">Request Valuation</button> <a href="/services" class="flex items-center gap-2 text-background-50 font-semibold text-[10px] md:text-xs hover:text-accent-400 transition-colors uppercase tracking-[0.2em] px-4">Our Services
        <i class="ri-arrow-right-line"></i></a></div></div>  <div class="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background-50 to-transparent"></div></section>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const featuredServices = services.slice(0, 6);
  const accreditations = [
    {
      name: "Surveyors Institute of Malawi",
      icon: "ri-medal-line"
    },
    {
      name: "Board of Registration",
      icon: "ri-government-line"
    },
    {
      name: "RICS Standards",
      icon: "ri-global-line"
    },
    {
      name: "Licensed Practitioners",
      icon: "ri-shield-check-line"
    }
  ];
  const valueProps = [
    {
      title: "Expert Valuation",
      desc: "Registered Valuation Surveyors with deep knowledge of the Malawian market.",
      icon: "ri-funds-line"
    },
    {
      title: "Integrity First",
      desc: "Transparent and ethical practices in every transaction and consultation.",
      icon: "ri-scales-3-line"
    },
    {
      title: "Nationwide Reach",
      desc: "Providing professional property services across all regions of Malawi.",
      icon: "ri-map-pin-line"
    },
    {
      title: "Innovative Solutions",
      desc: "Modern approaches to asset management and property consulting.",
      icon: "ri-lightbulb-flash-line"
    }
  ];
  return `${$$result.head += `<!-- HEAD_svelte-150mjeq_START -->${$$result.title = `<title>Terrestrial Property Consulting | Premium Real Estate in Malawi</title>`, ""}<meta name="description" content="Malawi's premier property consulting firm specializing in valuation, brokerage, and management."><!-- HEAD_svelte-150mjeq_END -->`, ""} <div class="flex flex-col min-h-screen">${validate_component(Header, "Header").$$render($$result, {}, {}, {})} <main class="flex-grow">${validate_component(Hero, "Hero").$$render($$result, {}, {}, {})}  <section class="py-24 bg-background-50 px-6 md:px-10 overflow-hidden"><div class="max-w-[1400px] mx-auto"><div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"><div data-svelte-h="svelte-1f7jopo"><div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-600/10 text-accent-700 border border-accent-600/20 text-[10px] font-bold uppercase tracking-widest mb-6">Welcome to TPC Malawi</div> <h2 class="text-3xl md:text-5xl font-bold font-heading text-foreground-950 mb-8 leading-tight">Malawi&#39;s Trusted Name in <span class="text-accent-600">Property Consulting</span></h2> <div class="flex flex-col gap-6 text-foreground-600 leading-relaxed text-lg"><p>Terrestrial Property Consulting Limited (TPC Malawi) is a premier Malawian-owned firm dedicated to elevating real estate standards through professional expertise and unwavering integrity.</p> <p>Based in Blantyre and operating nationwide, we provide comprehensive solutions spanning property valuation, asset management, and strategic land consultancy to help our clients make informed decisions in a dynamic market.</p></div> <div class="flex flex-wrap gap-4 mt-10"><a href="/about" class="bg-accent-600 hover:bg-accent-700 text-background-50 px-8 py-4 rounded-xl font-bold text-xs uppercase tracking-widest transition-all shadow-lg shadow-accent-600/20">Learn Our Story</a> <div class="flex items-center gap-4 px-6 border-l border-background-200"><div class="text-2xl font-bold text-foreground-950">10+</div> <div class="text-[10px] font-bold uppercase tracking-widest text-foreground-400 leading-tight">Years of<br>Excellence</div></div></div></div> <div class="relative" data-svelte-h="svelte-1qf8l0b"><div class="absolute -inset-4 bg-accent-600/5 rounded-[2rem] -rotate-2"></div> <img src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&amp;fit=crop&amp;q=80" alt="Professional Real Estate Services" class="relative rounded-3xl w-full h-[500px] object-cover shadow-2xl">  <div class="absolute bottom-8 -left-8 bg-background-50 p-6 rounded-2xl shadow-xl border border-background-100 hidden md:block animate-bounce-slow"><div class="flex items-center gap-4"><div class="w-12 h-12 bg-accent-600 rounded-xl flex items-center justify-center text-background-50"><i class="ri-checkbox-circle-line text-2xl"></i></div> <div><div class="text-sm font-bold text-foreground-950">500+ Properties</div> <div class="text-[10px] text-foreground-400 uppercase tracking-widest">Successfully Valued</div></div></div></div></div></div></div></section>  <section class="py-24 bg-background-100 px-6 md:px-10"><div class="max-w-[1400px] mx-auto"><div class="text-center mb-16"><div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-600/10 text-accent-700 border border-accent-600/20 text-[10px] font-bold uppercase tracking-widest mb-6" data-svelte-h="svelte-n38e9s">Our Expertise</div> <h2 class="text-3xl md:text-5xl font-bold font-heading text-foreground-950 mb-6" data-svelte-h="svelte-1qiriyx">Core Professional Services</h2> <p class="text-foreground-600 max-w-2xl mx-auto text-lg" data-svelte-h="svelte-19tw0a8">We provide specialized property solutions tailored to the unique requirements of the Malawian real estate and industrial sectors.</p></div> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">${each(featuredServices, (service, i) => {
    return `<div class="group p-10 bg-background-50 rounded-3xl border border-background-200 hover:border-accent-600/20 hover:shadow-2xl hover:shadow-accent-950/5 transition-all duration-500 relative overflow-hidden"> <div class="absolute inset-0 bg-gradient-to-br from-accent-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div> <div class="relative z-10"><div class="w-14 h-14 bg-background-100 rounded-2xl flex items-center justify-center text-accent-600 mb-8 group-hover:bg-accent-600 group-hover:text-background-50 transition-all duration-300 shadow-sm"><i class="${escape(service.riIcon, true) + " text-2xl"}"></i></div> <h3 class="text-xl font-bold text-foreground-950 mb-4 group-hover:text-accent-700 transition-colors">${escape(service.title)}</h3> <p class="text-foreground-500 leading-relaxed mb-8 text-sm">${escape(service.description)}</p> <a href="${"/services/" + escape(service.slug, true)}" class="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-accent-600 group/link">View Details 
                  <i class="ri-arrow-right-up-line transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1"></i> </a></div> </div>`;
  })}</div> <div class="mt-16 text-center" data-svelte-h="svelte-10ss9n9"><a href="/services" class="inline-flex items-center gap-3 text-sm font-bold text-foreground-950 hover:text-accent-600 transition-colors group">Explore All Services
            <div class="w-8 h-8 rounded-full border border-background-300 flex items-center justify-center group-hover:border-accent-600 group-hover:bg-accent-600 group-hover:text-background-50 transition-all"><i class="ri-arrow-right-line"></i></div></a></div></div></section>  <section class="py-24 px-6 md:px-10 bg-accent-950 text-background-50 relative overflow-hidden"> <div class="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none" data-svelte-h="svelte-4k534h"><div class="absolute top-0 right-0 w-1/2 h-full bg-accent-600 blur-[120px] rounded-full"></div></div> <div class="max-w-[1400px] mx-auto relative z-10"><div class="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center"><div class="lg:col-span-5"><h2 class="text-3xl md:text-5xl font-bold font-heading mb-8 leading-tight" data-svelte-h="svelte-povvps">The TPC <span class="text-accent-400">Advantage</span></h2> <p class="text-background-300 text-lg mb-12 leading-relaxed" data-svelte-h="svelte-1xc76dv">Our firm is built on the foundation of professional excellence and deep local market insight, ensuring our clients receive world-class property advisory.</p> <div class="grid grid-cols-1 sm:grid-cols-2 gap-8">${each(valueProps, (prop) => {
    return `<div class="flex flex-col gap-4"><div class="w-10 h-10 rounded-lg bg-accent-600/20 flex items-center justify-center text-accent-400"><i class="${escape(prop.icon, true) + " text-xl"}"></i></div> <div><h4 class="font-bold text-background-50 mb-2">${escape(prop.title)}</h4> <p class="text-xs text-background-400 leading-relaxed">${escape(prop.desc)}</p></div> </div>`;
  })}</div></div> <div class="lg:col-span-7" data-svelte-h="svelte-1w9ewgv"><div class="grid grid-cols-2 gap-4 md:gap-8"><div class="space-y-4 md:space-y-8"><div class="bg-white/5 backdrop-blur-md p-8 rounded-3xl border border-white/10 mt-12"><div class="text-4xl font-bold text-accent-400 mb-2 font-heading">SIM</div> <div class="text-xs font-bold uppercase tracking-widest text-background-300">Member of Surveyors Institute of Malawi</div></div> <div class="relative rounded-3xl overflow-hidden aspect-[4/5]"><img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&amp;fit=crop&amp;q=80" alt="Office Building" class="w-full h-full object-cover"></div></div> <div class="space-y-4 md:space-y-8"><div class="relative rounded-3xl overflow-hidden aspect-[4/5]"><img src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&amp;fit=crop&amp;q=80" alt="Business Meeting" class="w-full h-full object-cover"></div> <div class="bg-accent-600 p-8 rounded-3xl shadow-xl shadow-accent-600/20"><i class="ri-double-quotes-l text-4xl text-accent-300/50 mb-4 block"></i> <p class="text-sm font-medium text-background-50 leading-relaxed">&quot;Our mission is to provide first-class real estate services by applying exceptional property skills.&quot;</p> <div class="mt-6 pt-6 border-t border-background-50/20"><div class="font-bold text-xs uppercase tracking-widest">Bonface Galeta</div> <div class="text-[10px] text-accent-200 mt-1">Managing Director</div></div></div></div></div></div></div></div></section>  <section class="py-16 bg-background-50 border-b border-background-200"><div class="max-w-[1400px] mx-auto px-6 md:px-10"><div class="flex flex-wrap justify-between items-center gap-10 opacity-50 grayscale hover:grayscale-0 transition-all duration-700">${each(accreditations, (item) => {
    return `<div class="flex items-center gap-3"><i class="${escape(item.icon, true) + " text-2xl text-foreground-950"}"></i> <span class="text-xs font-bold uppercase tracking-[0.2em] text-foreground-950">${escape(item.name)}</span> </div>`;
  })}</div></div></section>  <section class="py-24 bg-background-50 px-6 md:px-10 overflow-hidden"><div class="max-w-[1400px] mx-auto"><div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"><div class="relative order-2 lg:order-1" data-svelte-h="svelte-nmtlcx"><img src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&amp;fit=crop&amp;q=80" alt="Professional Consultation" class="rounded-[2.5rem] w-full h-[550px] object-cover shadow-2xl"> <div class="absolute -bottom-10 -right-10 w-48 h-48 bg-accent-600 rounded-full flex items-center justify-center p-8 text-center text-background-50 shadow-2xl animate-pulse-slow"><div class="text-xs font-bold uppercase tracking-widest">Excellence in Every Step</div></div></div> <div class="order-1 lg:order-2" data-svelte-h="svelte-1qj8d0e"><div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-600/10 text-accent-700 border border-accent-600/20 text-[10px] font-bold uppercase tracking-widest mb-6">How We Work</div> <h2 class="text-3xl md:text-5xl font-bold font-heading text-foreground-950 mb-8 leading-tight">Our Professional <span class="text-accent-600">Approach</span></h2> <div class="flex flex-col gap-10"><div class="flex gap-6 group"><div class="flex-shrink-0 w-12 h-12 rounded-full border-2 border-accent-600 flex items-center justify-center font-bold text-accent-600 group-hover:bg-accent-600 group-hover:text-background-50 transition-all">01</div> <div><h4 class="text-xl font-bold text-foreground-950 mb-2">Detailed Consultation</h4> <p class="text-foreground-500 text-sm leading-relaxed">We begin by understanding your specific property needs, whether it&#39;s a valuation for financing or asset management for growth.</p></div></div> <div class="flex gap-6 group"><div class="flex-shrink-0 w-12 h-12 rounded-full border-2 border-accent-600 flex items-center justify-center font-bold text-accent-600 group-hover:bg-accent-600 group-hover:text-background-50 transition-all">02</div> <div><h4 class="text-xl font-bold text-foreground-950 mb-2">Rigorous Assessment</h4> <p class="text-foreground-500 text-sm leading-relaxed">Our registered surveyors conduct thorough physical inspections and market analysis following international RICS and local SIM standards.</p></div></div> <div class="flex gap-6 group"><div class="flex-shrink-0 w-12 h-12 rounded-full border-2 border-accent-600 flex items-center justify-center font-bold text-accent-600 group-hover:bg-accent-600 group-hover:text-background-50 transition-all">03</div> <div><h4 class="text-xl font-bold text-foreground-950 mb-2">Expert Reporting</h4> <p class="text-foreground-500 text-sm leading-relaxed">We deliver comprehensive, legally sound reports and strategic advice that provide clear value and actionable insights for your property assets.</p></div></div></div></div></div></div></section>  <section class="py-24 bg-background-100 border-t border-background-200 px-6 md:px-10" data-svelte-h="svelte-bshrax"><div class="max-w-[1400px] mx-auto text-center"><h4 class="text-xs font-bold uppercase tracking-[0.3em] text-foreground-400 mb-12">Trusted by Malawi&#39;s Leading Institutions</h4> <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 items-center justify-center opacity-60"><div class="flex flex-col items-center gap-2"><i class="ri-bank-line text-4xl"></i> <span class="text-[10px] font-bold uppercase tracking-widest">Financial Institutions</span></div> <div class="flex flex-col items-center gap-2"><i class="ri-building-2-line text-4xl"></i> <span class="text-[10px] font-bold uppercase tracking-widest">Corporate Entities</span></div> <div class="flex flex-col items-center gap-2"><i class="ri-government-line text-4xl"></i> <span class="text-[10px] font-bold uppercase tracking-widest">Public Sector</span></div> <div class="flex flex-col items-center gap-2"><i class="ri-community-line text-4xl"></i> <span class="text-[10px] font-bold uppercase tracking-widest">Real Estate Developers</span></div> <div class="flex flex-col items-center gap-2 hidden lg:flex"><i class="ri-scales-line text-4xl"></i> <span class="text-[10px] font-bold uppercase tracking-widest">Legal Practitioners</span></div></div></div></section>  <section class="py-24 px-6 md:px-10"><div class="max-w-[1400px] mx-auto"><div class="relative rounded-[3rem] bg-accent-600 overflow-hidden py-20 px-10 md:px-20 text-center"> <div class="absolute inset-0 opacity-10" data-svelte-h="svelte-69nmui"><div class="absolute top-0 left-0 w-64 h-64 bg-background-50 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div> <div class="absolute bottom-0 right-0 w-96 h-96 bg-background-50 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div></div> <div class="relative z-10 max-w-3xl mx-auto" data-svelte-h="svelte-j39857"><h2 class="text-3xl md:text-5xl font-bold font-heading text-background-50 mb-8 leading-tight">Ready to Secure Your Property&#39;s Future?</h2> <p class="text-accent-50 text-lg mb-12 opacity-90">Whether you need a professional valuation, property management, or strategic investment advice, our team is ready to assist you.</p> <div class="flex flex-wrap justify-center gap-6"><a href="/contact" class="bg-background-50 text-accent-600 hover:bg-background-100 px-10 py-5 rounded-2xl font-bold text-xs uppercase tracking-[0.2em] transition-all shadow-xl">Get in Touch Now</a> <a href="tel:+265888141612" class="bg-transparent border-2 border-background-50/30 hover:border-background-50 text-background-50 px-10 py-5 rounded-2xl font-bold text-xs uppercase tracking-[0.2em] transition-all">Call Us Directly</a></div></div></div></div></section></main> ${validate_component(Footer, "Footer").$$render($$result, {}, {}, {})}</div>`;
});
export {
  Page as default
};
