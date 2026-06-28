<script lang="ts">
  import Header from '$lib/components/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import { page } from '$app/stores';

  export let data: any;

  $: ({ properties, filters } = data);

  // Helper to format currency in Malawian Kwacha
  function formatPrice(price: number, listingType: string): string {
    const formatted = new Intl.NumberFormat('en-MW', {
      style: 'currency',
      currency: 'MWK',
      maximumFractionDigits: 0
    }).format(price).replace('MWK', 'MK');

    return listingType === 'rent' ? `${formatted} / month` : formatted;
  }

  // Reactive variables for form bindings
  let searchVal = filters.search || '';
  let typeVal = filters.type || '';
  let listingVal = filters.listing || '';
  let minPriceVal = filters.minPrice || '';
  let maxPriceVal = filters.maxPrice || '';
  let bedroomsVal = filters.bedrooms || '';
</script>

<svelte:head>
  <title>Properties for Sale and Rent in Malawi | TPC</title>
  <meta name="description" content="Browse premium real estate in Malawi. Find houses, apartments, lands, and commercial buildings for sale or rent with Terrestrial Property Consulting." />
</svelte:head>

<div class="flex flex-col min-h-screen">
  <Header />

  <main class="flex-grow pt-[88px] bg-background-100">
    
    <!-- Hero Header -->
    <section class="bg-accent-950 text-background-50 py-16 px-6 md:px-10 relative overflow-hidden">
      <div class="absolute inset-0 opacity-5 pointer-events-none">
        <div class="absolute top-0 right-0 w-1/3 h-full bg-accent-600 blur-[100px] rounded-full"></div>
      </div>
      <div class="max-w-[1400px] mx-auto relative z-10">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-600/25 text-accent-300 border border-accent-500/20 text-[10px] font-bold uppercase tracking-widest mb-4">
          Real Estate Marketplace
        </div>
        <h1 class="text-3xl md:text-5xl font-bold font-heading mb-4">Properties in Malawi</h1>
        <p class="text-background-300 text-sm max-w-xl">
          Discover verified listings from certified agents. Filter by location, price, and type to find your perfect property.
        </p>
      </div>
    </section>

    <!-- Main Content Area -->
    <section class="py-12 max-w-[1400px] mx-auto px-6 md:px-10">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        <!-- Filters Sidebar (lg:col-span-3) -->
        <aside class="lg:col-span-3 bg-background-50 p-6 rounded-3xl border border-background-200 shadow-sm sticky top-[108px]">
          <div class="flex justify-between items-center mb-6 pb-4 border-b border-background-200">
            <h2 class="text-base font-bold text-foreground-950 font-heading">Filter Properties</h2>
            <a 
              href="/properties" 
              class="text-xs font-bold uppercase tracking-wider text-accent-600 hover:text-accent-700 transition-colors"
            >
              Reset
            </a>
          </div>

          <form method="GET" action="/properties" class="flex flex-col gap-5">
            <!-- Search Keyword -->
            <div class="flex flex-col gap-1.5">
              <label for="search" class="text-[10px] font-bold uppercase tracking-widest text-foreground-400 ml-1">Search Keywords</label>
              <div class="relative">
                <input 
                  type="text" 
                  id="search" 
                  name="search"
                  placeholder="e.g. Nyambadwe, Blantyre" 
                  bind:value={searchVal}
                  class="w-full bg-background-100 border border-background-200 rounded-xl pl-10 pr-4 py-3 text-xs focus:outline-none focus:ring-2 focus:ring-accent-600/20 focus:border-accent-600 transition-all"
                />
                <i class="ri-search-line absolute left-3.5 top-1/2 -translate-y-1/2 text-foreground-400"></i>
              </div>
            </div>

            <!-- Listing Type -->
            <div class="flex flex-col gap-1.5">
              <label for="listing" class="text-[10px] font-bold uppercase tracking-widest text-foreground-400 ml-1">Listing Type</label>
              <select 
                id="listing" 
                name="listing"
                bind:value={listingVal}
                class="w-full bg-background-100 border border-background-200 rounded-xl px-4 py-3 text-xs focus:outline-none focus:ring-2 focus:ring-accent-600/20 focus:border-accent-600 transition-all appearance-none"
              >
                <option value="">All Statuses</option>
                <option value="sale">For Sale</option>
                <option value="rent">For Rent</option>
              </select>
            </div>

            <!-- Property Type -->
            <div class="flex flex-col gap-1.5">
              <label for="type" class="text-[10px] font-bold uppercase tracking-widest text-foreground-400 ml-1">Property Type</label>
              <select 
                id="type" 
                name="type"
                bind:value={typeVal}
                class="w-full bg-background-100 border border-background-200 rounded-xl px-4 py-3 text-xs focus:outline-none focus:ring-2 focus:ring-accent-600/20 focus:border-accent-600 transition-all appearance-none"
              >
                <option value="">All Types</option>
                <option value="house">House</option>
                <option value="apartment">Apartment</option>
                <option value="land">Land</option>
                <option value="commercial">Commercial</option>
              </select>
            </div>

            <!-- Bedrooms -->
            <div class="flex flex-col gap-1.5">
              <label for="bedrooms" class="text-[10px] font-bold uppercase tracking-widest text-foreground-400 ml-1">Bedrooms</label>
              <select 
                id="bedrooms" 
                name="bedrooms"
                bind:value={bedroomsVal}
                class="w-full bg-background-100 border border-background-200 rounded-xl px-4 py-3 text-xs focus:outline-none focus:ring-2 focus:ring-accent-600/20 focus:border-accent-600 transition-all appearance-none"
              >
                <option value="">Any Bedrooms</option>
                <option value="1">1+ Bedrooms</option>
                <option value="2">2+ Bedrooms</option>
                <option value="3">3+ Bedrooms</option>
                <option value="4">4+ Bedrooms</option>
              </select>
            </div>

            <!-- Price Range -->
            <div class="grid grid-cols-2 gap-3">
              <div class="flex flex-col gap-1.5">
                <label for="minPrice" class="text-[10px] font-bold uppercase tracking-widest text-foreground-400 ml-1">Min Price</label>
                <input 
                  type="number" 
                  id="minPrice" 
                  name="minPrice"
                  placeholder="Min" 
                  bind:value={minPriceVal}
                  class="w-full bg-background-100 border border-background-200 rounded-xl px-4 py-3 text-xs focus:outline-none focus:ring-2 focus:ring-accent-600/20 focus:border-accent-600 transition-all"
                />
              </div>
              <div class="flex flex-col gap-1.5">
                <label for="maxPrice" class="text-[10px] font-bold uppercase tracking-widest text-foreground-400 ml-1">Max Price</label>
                <input 
                  type="number" 
                  id="maxPrice" 
                  name="maxPrice"
                  placeholder="Max" 
                  bind:value={maxPriceVal}
                  class="w-full bg-background-100 border border-background-200 rounded-xl px-4 py-3 text-xs focus:outline-none focus:ring-2 focus:ring-accent-600/20 focus:border-accent-600 transition-all"
                />
              </div>
            </div>

            <button 
              type="submit"
              class="w-full bg-accent-600 hover:bg-accent-700 text-background-50 font-bold py-4 rounded-xl transition-all shadow-md shadow-accent-600/10 uppercase tracking-widest text-xs mt-3 flex items-center justify-center gap-2"
            >
              <i class="ri-filter-3-line"></i>
              <span>Apply Filters</span>
            </button>
          </form>
        </aside>

        <!-- Properties Grid List (lg:col-span-9) -->
        <div class="lg:col-span-9 flex flex-col gap-8">
          
          <div class="flex justify-between items-center">
            <p class="text-sm font-semibold text-foreground-500">
              Showing <span class="text-foreground-950 font-bold">{properties.length}</span> {properties.length === 1 ? 'property' : 'properties'} found
            </p>
          </div>

          {#if properties.length === 0}
            <div class="bg-background-50 border border-background-200 rounded-3xl p-12 text-center shadow-sm">
              <div class="w-16 h-16 bg-background-100 text-foreground-400 rounded-full flex items-center justify-center mx-auto mb-6">
                <i class="ri-hotel-line text-3xl"></i>
              </div>
              <h3 class="text-lg font-bold font-heading text-foreground-950 mb-2">No Properties Found</h3>
              <p class="text-sm text-foreground-500 max-w-sm mx-auto mb-6">
                We couldn't find any properties matching your current filter selections. Try clearing your filters or broadening your search.
              </p>
              <a 
                href="/properties" 
                class="inline-flex items-center gap-2 bg-accent-600 hover:bg-accent-700 text-background-50 font-bold px-6 py-3 rounded-xl text-xs uppercase tracking-widest transition-all"
              >
                Clear All Filters
              </a>
            </div>
          {:else}
            <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {#each properties as prop}
                <div class="group bg-background-50 border border-background-200 hover:border-accent-600/20 hover:shadow-xl rounded-3xl overflow-hidden transition-all duration-300 flex flex-col h-full">
                  
                  <!-- Property Image & Badges -->
                  <div class="relative aspect-[4/3] w-full overflow-hidden bg-background-200">
                    {#if prop.primary_image}
                      <img 
                        src={prop.primary_image} 
                        alt={prop.title} 
                        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    {:else}
                      <div class="w-full h-full flex flex-col items-center justify-center text-foreground-300">
                        <i class="ri-image-line text-4xl mb-2"></i>
                        <span class="text-xs">No image available</span>
                      </div>
                    {/if}
                    
                    <!-- Badges -->
                    <div class="absolute top-4 left-4 flex flex-col gap-2">
                      <span class="px-3 py-1 rounded-lg text-[9px] font-bold uppercase tracking-widest shadow-sm bg-accent-600 text-background-50">
                        For {prop.listing_type}
                      </span>
                      {#if prop.featured}
                        <span class="px-3 py-1 rounded-lg text-[9px] font-bold uppercase tracking-widest shadow-sm bg-primary-500 text-foreground-950">
                          Featured
                        </span>
                      {/if}
                    </div>

                    <div class="absolute bottom-4 right-4">
                      <span class="px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-background-50/90 backdrop-blur-sm text-foreground-900 border border-background-200/50">
                        {prop.property_type}
                      </span>
                    </div>
                  </div>

                  <!-- Property Info -->
                  <div class="p-6 flex flex-col justify-between flex-grow">
                    <div>
                      <!-- Price -->
                      <div class="text-lg font-bold text-accent-700 mb-2 font-heading">
                        {formatPrice(prop.price, prop.listing_type)}
                      </div>
                      
                      <!-- Title -->
                      <h3 class="text-base font-bold text-foreground-950 mb-2 line-clamp-1 group-hover:text-accent-700 transition-colors">
                        {prop.title}
                      </h3>

                      <!-- Location -->
                      <div class="flex items-center gap-1.5 text-xs text-foreground-500 mb-5">
                        <i class="ri-map-pin-line text-accent-600 text-sm"></i>
                        <span>{prop.address}, {prop.city}</span>
                      </div>
                    </div>

                    <!-- Amenities Bar -->
                    <div class="border-t border-background-200 pt-4 flex items-center justify-between text-xs text-foreground-500 font-semibold">
                      {#if prop.property_type !== 'land'}
                        <div class="flex items-center gap-1">
                          <i class="ri-bed-line text-lg text-foreground-400"></i>
                          <span>{prop.bedrooms || 0} Beds</span>
                        </div>
                        <div class="flex items-center gap-1">
                          <i class="ri-shower-line text-lg text-foreground-400"></i>
                          <span>{prop.bathrooms || 0} Baths</span>
                        </div>
                      {/if}
                      <div class="flex items-center gap-1">
                        <i class="ri-ruler-2-line text-lg text-foreground-400"></i>
                        <span>{prop.square_meters ? `${prop.square_meters} m²` : 'N/A'}</span>
                      </div>
                    </div>

                    <a 
                      href="/properties/{prop.id}"
                      class="mt-6 w-full text-center bg-background-100 hover:bg-accent-600 hover:text-background-50 text-foreground-850 font-bold py-3.5 rounded-xl transition-all text-xs uppercase tracking-widest border border-background-200/60"
                    >
                      View Details
                    </a>
                  </div>

                </div>
              {/each}
            </div>
          {/if}

        </div>

      </div>
    </section>

  </main>

  <Footer />
</div>
