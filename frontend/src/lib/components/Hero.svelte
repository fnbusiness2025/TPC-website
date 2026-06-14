<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { slide, fade } from 'svelte/transition';

  let showFilters = false;
  let activeListingType = 'buy';

  // Carousel State
  const carouselProperties = [
    {
      id: 1,
      title: 'Luxury Villa in Sunnyside',
      location: 'Sunnyside, Blantyre',
      price: 'MK 450,000,000',
      type: 'Premium Listing',
      image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80',
      beds: 4,
      baths: 3,
      area: '350m²'
    },
    {
      id: 2,
      title: 'Modern City Apartment',
      location: 'City Centre, Lilongwe',
      price: 'MK 120,000,000',
      type: 'For Sale',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80',
      beds: 2,
      baths: 2,
      area: '110m²'
    },
    {
      id: 3,
      title: 'Executive Office Suite',
      location: 'Victoria Avenue, Blantyre',
      price: 'MK 2,500,000/mo',
      type: 'Commercial',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80',
      beds: 0,
      baths: 2,
      area: '200m²'
    },
    {
      id: 4,
      title: 'Family Home in Area 47',
      location: 'Area 47, Lilongwe',
      price: 'MK 280,000,000',
      type: 'For Sale',
      image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&q=80',
      beds: 3,
      baths: 2,
      area: '220m²'
    },
    {
      id: 5,
      title: 'Nyambadwe Heights',
      location: 'Nyambadwe, Blantyre',
      price: 'MK 350,000,000',
      type: 'New Development',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80',
      beds: 4,
      baths: 4,
      area: '400m²'
    }
  ];

  let currentSlide = 0;
  let isPaused = false;
  const totalSlides = carouselProperties.length;
  let interval: ReturnType<typeof setInterval>;

  const nextSlide = () => {
    currentSlide = (currentSlide + 1) % totalSlides;
  };

  const prevSlide = () => {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
  };

  const goToSlide = (index: number) => {
    currentSlide = index;
  };

  onMount(() => {
    interval = setInterval(() => {
      if (!isPaused) nextSlide();
    }, 4500);
  });

  onDestroy(() => {
    clearInterval(interval);
  });

  const stats = [
    { number: '1,200+', label: 'PROPERTIES LISTED' },
    { number: '850+', label: 'HAPPY CLIENTS' },
    { number: '15+', label: 'YEARS EXPERIENCE' }
  ];

  const propertyTypes = [
    'House', 
    'Apartment / Flat', 
    'Townhouse', 
    'Vacant Land / Plot', 
    'Farm', 
    'Commercial Property', 
    'Industrial Property'
  ];
  const locations = ['Blantyre', 'Lilongwe', 'Mzuzu', 'Zomba'];
</script>

<section 
  class="relative w-full min-h-[600px] md:min-h-[700px] lg:min-h-[850px] flex items-center justify-center overflow-hidden pt-32 pb-20"
  on:mouseenter={() => (isPaused = true)}
  on:mouseleave={() => (isPaused = false)}
  aria-label="Property Showcase Carousel"
>
  <!-- Background Image Carousel -->
  {#each carouselProperties as prop, i}
    {#if i === currentSlide}
      <div 
        class="absolute inset-0 bg-cover bg-center transition-all duration-1000 scale-105"
        style="background-image: url('{prop.image}');"
        transition:fade={{ duration: 1000 }}
      ></div>
    {/if}
  {/each}
  <div class="absolute inset-0 bg-gradient-to-b from-accent-950/90 via-accent-950/60 to-accent-950/90"></div>

  <!-- Navigation Arrows -->
  <button 
    class="absolute left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full border border-background-50/10 bg-background-50/5 hover:bg-background-50/10 text-background-50 flex items-center justify-center transition-all hidden md:flex"
    on:click={prevSlide}
    aria-label="Previous Slide"
  >
    <i class="ri-arrow-left-s-line text-2xl"></i>
  </button>
  <button 
    class="absolute right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full border border-background-50/10 bg-background-50/5 hover:bg-background-50/10 text-background-50 flex items-center justify-center transition-all hidden md:flex"
    on:click={nextSlide}
    aria-label="Next Slide"
  >
    <i class="ri-arrow-right-s-line text-2xl"></i>
  </button>

  <!-- Carousel Indicators (Side) -->
  <div class="absolute left-10 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-4 z-20">
    {#each carouselProperties as _, i}
      <button 
        class="group flex items-center gap-4 text-left"
        on:click={() => goToSlide(i)}
        aria-label="Go to slide {i + 1}"
      >
        <div class="w-1.5 h-1.5 rounded-full transition-all duration-300 {i === currentSlide ? 'bg-accent-600 scale-150' : 'bg-background-50/30 group-hover:bg-background-50/60'}"></div>
        <span class="text-[9px] font-bold uppercase tracking-widest transition-all duration-300 {i === currentSlide ? 'text-accent-400 opacity-100' : 'text-background-50 opacity-0 group-hover:opacity-50'}">0{i + 1}</span>
      </button>
    {/each}
  </div>

  <!-- Content -->
  <div class="relative z-10 w-full max-w-[1400px] px-6 md:px-10 flex flex-col items-center text-center">
    <!-- Carousel Property Info -->
    {#each carouselProperties as prop, i}
      {#if i === currentSlide}
        <div 
          class="mb-6 flex flex-col items-center animate-in fade-in slide-in-from-top-4 duration-700"
          transition:fade={{ duration: 400 }}
        >
          <div class="px-4 py-1.5 rounded-full bg-accent-600/20 text-accent-400 border border-accent-600/30 text-[10px] font-bold uppercase tracking-[0.2em] mb-4 backdrop-blur-sm">
            {prop.type}
          </div>
          <div class="text-background-50 text-xs font-bold uppercase tracking-[0.2em] flex items-center gap-3">
             <i class="ri-map-pin-2-fill text-accent-600"></i>
             {prop.location}
             <span class="w-1.5 h-1.5 bg-background-50/20 rounded-full"></span>
             <span class="text-accent-400">{prop.price}</span>
          </div>
        </div>
      {/if}
    {/each}

    <!-- Badge -->
    <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-background-50/10 text-background-50 border border-background-50/20 text-[10px] md:text-xs font-bold uppercase tracking-widest mb-6 animate-in fade-in slide-in-from-bottom-4 duration-500 backdrop-blur-sm">
      <span class="relative flex h-2 w-2">
        <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-background-50/50 opacity-75"></span>
        <span class="relative inline-flex rounded-full h-2 w-2 bg-background-50"></span>
      </span>
      <span class="tracking-widest">Malawi's Leading Real Estate Portal</span>
    </div>

    <!-- Main Heading -->
    <h1 class="text-3xl md:text-5xl lg:text-7xl font-bold text-background-50 mb-12 font-heading leading-tight max-w-4xl animate-in fade-in slide-in-from-bottom-6 duration-700">
      Find Your Perfect <span class="text-accent-400">Property</span> in Malawi
    </h1>

    <!-- Big Centered Search Form Card -->
    <div class="w-full max-w-5xl bg-background-50 rounded-3xl p-3 md:p-6 shadow-[0_40px_100px_rgba(0,0,0,0.4)] animate-in fade-in zoom-in duration-700">
      <div class="flex flex-col gap-6 text-left">
        <!-- Listing Pills (Tabs) -->
        <div class="flex gap-4 p-1 border-b border-background-200 pb-4">
          {#each ['Buy', 'Rent', 'Commercial'] as type}
            <button 
              class="px-8 py-3 rounded-2xl text-xs font-bold transition-all uppercase tracking-widest relative
              {activeListingType.toLowerCase() === type.toLowerCase() ? 'text-accent-600' : 'text-foreground-500 hover:text-foreground-950'}"
              on:click={() => activeListingType = type.toLowerCase()}
            >
              {type}
              {#if activeListingType.toLowerCase() === type.toLowerCase()}
                <span 
                  class="absolute bottom-[-17px] left-0 w-full h-1 bg-accent-600 rounded-t-full"
                  transition:fade
                ></span>
              {/if}
            </button>
          {/each}
        </div>

        <!-- Search Bar & Primary Filters Row -->
        <div class="flex flex-col lg:flex-row gap-4">
          <div class="flex-grow grid grid-cols-1 md:grid-cols-3 gap-4">
            <!-- Location Filter -->
            <div class="relative">
              <label for="location-select" class="absolute left-4 top-3 text-[10px] font-bold uppercase tracking-widest text-foreground-400">Location</label>
              <select id="location-select" class="w-full bg-background-100 rounded-2xl pt-8 pb-3 px-4 text-sm font-bold text-foreground-950 border border-transparent focus:border-accent-600/30 focus:bg-white transition-all appearance-none cursor-pointer">
                <option>Select Location</option>
                {#each locations as loc}
                  <option>{loc}</option>
                {/each}
              </select>
              <i class="ri-map-pin-2-line absolute right-4 top-1/2 -translate-y-1/2 text-accent-600"></i>
            </div>

            <!-- Property Type Filter -->
            <div class="relative">
              <label for="property-type-select" class="absolute left-4 top-3 text-[10px] font-bold uppercase tracking-widest text-foreground-400">Property Type</label>
              <select id="property-type-select" class="w-full bg-background-100 rounded-2xl pt-8 pb-3 px-4 text-sm font-bold text-foreground-950 border border-transparent focus:border-accent-600/30 focus:bg-white transition-all appearance-none cursor-pointer">
                <option>All Types</option>
                {#each propertyTypes as type}
                  <option>{type}</option>
                {/each}
              </select>
              <i class="ri-home-4-line absolute right-4 top-1/2 -translate-y-1/2 text-accent-600"></i>
            </div>

            <!-- Price Filter -->
            <div class="relative">
              <label for="price-range-select" class="absolute left-4 top-3 text-[10px] font-bold uppercase tracking-widest text-foreground-400">Price Range</label>
              <select id="price-range-select" class="w-full bg-background-100 rounded-2xl pt-8 pb-3 px-4 text-sm font-bold text-foreground-950 border border-transparent focus:border-accent-600/30 focus:bg-white transition-all appearance-none cursor-pointer">
                <option>Any Price</option>
                <option>MK 0 - 50M</option>
                <option>MK 50M - 150M</option>
                <option>MK 150M - 500M</option>
                <option>MK 500M+</option>
              </select>
              <i class="ri-money-dollar-circle-line absolute right-4 top-1/2 -translate-y-1/2 text-accent-600"></i>
            </div>
          </div>

          <button class="px-12 py-5 bg-accent-600 hover:bg-accent-700 text-background-50 font-bold text-sm rounded-2xl transition-all shadow-xl shadow-accent-600/30 uppercase tracking-[0.2em] flex items-center justify-center gap-3">
            <i class="ri-search-2-line text-lg"></i>
            Search
          </button>
        </div>

        <!-- Secondary Filter Toggle -->
        <button 
          class="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-foreground-500 hover:text-accent-600 transition-colors w-fit"
          on:click={() => (showFilters = !showFilters)}
          aria-expanded={showFilters}
        >
          <i class="ri-equalizer-line text-sm"></i>
          {showFilters ? 'Hide Advanced Filters' : 'Show Advanced Filters'}
          <i class="ri-arrow-down-s-line transition-transform {showFilters ? 'rotate-180' : ''}"></i>
        </button>

        <!-- Advanced Filters -->
        {#if showFilters}
          <div transition:slide class="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2 border-t border-background-100 mt-2">
            <div class="flex flex-col gap-2">
              <label for="bedrooms-select" class="text-[10px] font-bold uppercase tracking-widest text-foreground-400 ml-1">Bedrooms</label>
              <select id="bedrooms-select" class="bg-background-100 rounded-xl px-4 py-3 text-xs font-bold border border-transparent focus:border-accent-600">
                <option>Any</option>
                <option>1+</option>
                <option>2+</option>
                <option>3+</option>
                <option>4+</option>
              </select>
            </div>
            <div class="flex flex-col gap-2">
              <label for="bathrooms-select" class="text-[10px] font-bold uppercase tracking-widest text-foreground-400 ml-1">Bathrooms</label>
              <select id="bathrooms-select" class="bg-background-100 rounded-xl px-4 py-3 text-xs font-bold border border-transparent focus:border-accent-600">
                <option>Any</option>
                <option>1+</option>
                <option>2+</option>
                <option>3+</option>
              </select>
            </div>
            <div class="flex flex-col gap-2">
              <label for="area-input" class="text-[10px] font-bold uppercase tracking-widest text-foreground-400 ml-1">Area (m²)</label>
              <input id="area-input" type="text" placeholder="Min Area" class="bg-background-100 rounded-xl px-4 py-3 text-xs font-bold border border-transparent focus:border-accent-600" />
            </div>
            <div class="flex flex-col gap-2">
              <label for="keywords-input" class="text-[10px] font-bold uppercase tracking-widest text-foreground-400 ml-1">Keywords</label>
              <input id="keywords-input" type="text" placeholder="Pool, Garage, etc." class="bg-background-100 rounded-xl px-4 py-3 text-xs font-bold border border-transparent focus:border-accent-600" />
            </div>
          </div>
        {/if}
      </div>
    </div>

    <!-- Stats Row -->
    <div class="flex flex-wrap justify-center gap-8 md:gap-16 mb-12">
      {#each stats as stat, i}
        <div class="flex items-center gap-8">
          <div class="text-center">
            <div class="text-xl md:text-3xl font-bold text-background-50 font-heading tracking-tight">{stat.number}</div>
            <div class="text-[9px] md:text-[10px] text-background-300 font-semibold tracking-[0.2em] uppercase mt-1">{stat.label}</div>
          </div>
          {#if i < stats.length - 1}
            <div class="hidden md:block w-px h-10 bg-background-50/20"></div>
          {/if}
        </div>
      {/each}
    </div>

    <!-- CTA Row -->
    <div class="flex flex-wrap justify-center gap-6">
      <button class="bg-accent-600 hover:bg-accent-700 text-background-50 px-8 py-4 rounded-xl font-bold text-[10px] md:text-xs transition-all shadow-lg shadow-accent-600/20 uppercase tracking-[0.2em]">
        Browse Properties
      </button>
      <button class="bg-transparent border-2 border-background-50/30 hover:border-background-50 text-background-50 px-8 py-4 rounded-xl font-bold text-[10px] md:text-xs transition-all uppercase tracking-[0.2em] backdrop-blur-sm">
        Get Free Valuation
      </button>
      <a href="/services" class="flex items-center gap-2 text-background-50 font-semibold text-[10px] md:text-xs hover:text-accent-400 transition-colors uppercase tracking-[0.2em] px-4">
        Our Services
        <i class="ri-arrow-right-line"></i>
      </a>
    </div>
  </div>

  <!-- Bottom Fade -->
  <div class="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background-50 to-transparent"></div>
</section>
