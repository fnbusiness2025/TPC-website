<script lang="ts">
  import { onMount } from 'svelte';
  import { fade, slide } from 'svelte/transition';
  import { page } from '$app/stores';
  import Logo from './Logo.svelte';

  let isScrolled = false;
  let isMobileMenuOpen = false;
  let activeDropdown: string | null = null;

  const buyMenu = {
    title: 'Buy',
    sections: [
      { name: 'Property for Sale', href: '/properties/sale' },
      { name: 'Land', href: '/properties/land' },
      { name: 'Residential', href: '/properties/residential' },
      { name: 'Commercial Property for Sale', href: '/properties/commercial-sale' }
    ]
  };

  const rentMenu = {
    title: 'Rent',
    sections: [
      { name: 'Looking to Rent?', href: '/properties/rent' },
      { name: 'House to Rent', href: '/properties/house-rent' },
      { name: 'Apartment / Flat to Rent', href: '/properties/apartment-rent' },
      { name: 'Commercial Property to Rent', href: '/properties/commercial-rent' },
      { name: 'Retirement Property to Rent', href: '/properties/retirement-rent' }
    ]
  };

  const commercialMenu = {
    title: 'Commercial',
    sections: [
      { name: 'Find Commercial Property', href: '/properties/commercial' },
      { name: 'Commercial Property for Sale', href: '/properties/commercial-sale' },
      { name: 'Commercial Property to Rent', href: '/properties/commercial-rent' },
      { name: 'Industrial Property for Sale', href: '/properties/industrial-sale' },
      { name: 'Industrial Property to Rent', href: '/properties/industrial-rent' }
    ]
  };

  const mainNav = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Contact', href: '/contact' },
    { name: 'List Property', href: '/sell' },
  ];

  const utilityNav = [
    { name: 'Login', icon: 'ri-user-line', href: '/account' }
  ];

  $: activePath = $page.url.pathname;

  onMount(() => {
    const handleScroll = () => {
      isScrolled = window.scrollY > 60;
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });

  function toggleDropdown(name: string | null) {
    if (activeDropdown === name) activeDropdown = null;
    else activeDropdown = name;
  }
</script>

<header 
  class="fixed top-0 left-0 right-0 z-50 h-[88px] transition-all duration-400 px-6 md:px-10 flex items-center justify-between
  {isScrolled ? 'bg-background-50/95 backdrop-blur-md shadow-md border-b border-background-200' : 'bg-transparent'}"
  on:mouseleave={() => activeDropdown = null}
>
  <div class="flex items-center gap-10">
    <a href="/" class="hover:opacity-90 transition-opacity">
      <Logo {isScrolled} />
    </a>

    <!-- Primary Nav Groups (Buy/Rent/Commercial) -->
    <nav class="hidden lg:flex items-center" aria-label="Main Navigation">
      <div class="flex items-center h-[88px]">
        {#each [buyMenu, rentMenu, commercialMenu] as menu}
          <div 
            class="relative h-full flex items-center px-4 group cursor-pointer"
            on:mouseenter={() => activeDropdown = menu.title}
            on:keydown={(e) => e.key === 'Enter' && toggleDropdown(menu.title)}
            role="button"
            tabindex="0"
            aria-expanded={activeDropdown === menu.title}
            aria-haspopup="true"
          >
            <span class="text-sm font-bold uppercase tracking-widest transition-colors
              {isScrolled ? 'text-foreground-800' : 'text-background-50'} group-hover:text-accent-600">
              {menu.title}
              <i class="ri-arrow-down-s-line ml-1 transition-transform {activeDropdown === menu.title ? 'rotate-180' : ''}"></i>
            </span>

            {#if activeDropdown === menu.title}
              <div 
                class="absolute top-[88px] left-0 w-[280px] bg-background-50 border border-background-200 shadow-2xl rounded-b-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200"
                transition:fade={{ duration: 150 }}
                role="menu"
              >
                <div class="p-2 flex flex-col">
                  {#each menu.sections as item}
                    <a 
                      href={item.href} 
                      class="px-5 py-3 text-sm font-medium text-foreground-700 hover:bg-accent-600/10 hover:text-accent-700 rounded-xl transition-all"
                      role="menuitem"
                    >
                      {item.name}
                    </a>
                  {/each}
                </div>
              </div>
            {/if}
          </div>
        {/each}
      </div>
    </nav>
  </div>

  <!-- Secondary & Utility Nav -->
  <div class="flex items-center gap-6">
    <nav class="hidden xl:flex items-center gap-8">
      {#each mainNav as item}
        <a 
          href={item.href} 
          class="text-xs font-bold uppercase tracking-widest transition-all
          {isScrolled ? 'text-foreground-600 hover:text-accent-600' : 'text-background-50/80 hover:text-background-50'}"
        >
          {item.name}
        </a>
      {/each}
    </nav>

    <div class="hidden lg:flex items-center gap-4 pl-6 border-l border-background-200/20">
      {#each utilityNav as item}
        <a 
          href={item.href} 
          class="flex items-center gap-2 text-xs font-bold uppercase tracking-widest transition-all
          {isScrolled ? 'text-foreground-800 hover:text-accent-600' : 'text-background-50 hover:text-accent-400'}"
        >
          <i class="{item.icon} text-lg"></i>
          <span class="hidden xl:inline">{item.name}</span>
        </a>
      {/each}
    </div>

    <!-- Mobile Toggle -->
    <button 
      class="lg:hidden w-10 h-10 rounded-lg flex items-center justify-center transition-colors {isScrolled ? 'hover:bg-background-100 text-foreground-950' : 'hover:bg-background-50/10 text-background-50'}"
      on:click={() => isMobileMenuOpen = !isMobileMenuOpen}
    >
      <i class={isMobileMenuOpen ? "ri-close-line text-2xl" : "ri-menu-line text-2xl"}></i>
    </button>
  </div>

  <!-- Mobile Menu Overhaul -->
  {#if isMobileMenuOpen}
    <div 
      class="fixed inset-0 top-[88px] bg-background-50 z-40 lg:hidden overflow-y-auto"
      transition:slide={{ axis: 'y', duration: 300 }}
    >
      <div class="p-6 flex flex-col gap-8">
        <!-- Main Groups -->
        <div class="flex flex-col gap-4">
          {#each [buyMenu, rentMenu, commercialMenu] as menu}
            <div class="border-b border-background-100 pb-4">
              <h3 class="text-xs font-bold text-foreground-400 uppercase tracking-[0.2em] mb-4">{menu.title}</h3>
              <div class="flex flex-col gap-3">
                {#each menu.sections as item}
                  <a href={item.href} class="text-lg font-bold text-foreground-950">{item.name}</a>
                {/each}
              </div>
            </div>
          {/each}
        </div>

        <!-- Other Links -->
        <div class="flex flex-col gap-6">
          {#each mainNav as item}
            <a href={item.href} class="text-sm font-bold uppercase tracking-widest text-foreground-700">{item.name}</a>
          {/each}
        </div>

        <!-- Utilities -->
        <div class="flex flex-col gap-4 p-6 bg-background-100 rounded-3xl">
          {#each utilityNav as item}
            <a href={item.href} class="flex items-center gap-4 text-foreground-950 font-bold">
              <i class="{item.icon} text-xl text-accent-600"></i>
              {item.name}
            </a>
          {/each}
        </div>
      </div>
    </div>
  {/if}
</header>
