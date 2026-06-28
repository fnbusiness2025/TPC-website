<script lang="ts">
  import Header from '$lib/components/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import { enhance } from '$app/forms';
  import { fade, fly } from 'svelte/transition';

  export let data: any;
  export let form: any;

  $: ({ property, images, amenities, agent } = data);

  // Gallery state
  let activeImageIndex = 0;

  // Form states
  let visitorName = '';
  let visitorEmail = '';
  let visitorPhone = '';
  let visitorMessage = 'I would like to request more information or schedule a viewing for this property.';
  let isLoading = false;
  let successState = false;
  let successMessage = '';
  let errorState = false;
  let errorMessage = '';

  // Helper to format currency in Malawian Kwacha
  function formatPrice(price: number, listingType: string): string {
    const formatted = new Intl.NumberFormat('en-MW', {
      style: 'currency',
      currency: 'MWK',
      maximumFractionDigits: 0
    }).format(price).replace('MWK', 'MK');

    return listingType === 'rent' ? `${formatted} / month` : formatted;
  }
</script>

<svelte:head>
  <title>{property.title} | Terrestrial Property Consulting</title>
  <meta name="description" content={property.description} />
</svelte:head>

<div class="flex flex-col min-h-screen">
  <Header />

  <main class="flex-grow pt-[88px] bg-background-100">
    <!-- Breadcrumbs / Back Bar -->
    <div class="border-b border-background-200 bg-background-50 py-4 px-6 md:px-10">
      <div class="max-w-[1400px] mx-auto flex items-center justify-between">
        <a 
          href="/properties" 
          class="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-foreground-600 hover:text-accent-600 transition-colors group"
        >
          <i class="ri-arrow-left-line text-base transition-transform group-hover:-translate-x-0.5"></i>
          <span>Back to Listings</span>
        </a>
      </div>
    </div>

    <!-- Main Content Detail -->
    <section class="py-12 max-w-[1400px] mx-auto px-6 md:px-10">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        <!-- Left Column: Details & Images (lg:col-span-8) -->
        <div class="lg:col-span-8 flex flex-col gap-8">
          
          <!-- Title Block -->
          <div class="bg-background-50 p-8 rounded-3xl border border-background-200 shadow-sm">
            <div class="flex flex-wrap items-center gap-3 mb-4">
              <span class="px-3.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest bg-accent-600 text-background-50">
                For {property.listing_type}
              </span>
              {#if property.featured}
                <span class="px-3.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest bg-primary-500 text-foreground-950">
                  Featured
                </span>
              {/if}
              <span class="px-3.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest bg-background-200 text-foreground-700">
                {property.property_type}
              </span>
            </div>
            
            <h1 class="text-2xl md:text-4xl font-bold font-heading text-foreground-950 mb-3">{property.title}</h1>
            
            <div class="flex items-center gap-2 text-sm text-foreground-500">
              <i class="ri-map-pin-line text-accent-600 text-base"></i>
              <span>{property.address}, {property.city}, {property.state_region}, Malawi</span>
            </div>
          </div>

          <!-- Image Gallery -->
          <div class="bg-background-50 p-6 rounded-3xl border border-background-200 shadow-sm flex flex-col gap-4">
            <!-- Large Active Image -->
            <div class="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-background-150">
              {#if images.length > 0}
                <img 
                  src={images[activeImageIndex].image_url} 
                  alt={property.title} 
                  class="w-full h-full object-cover"
                />
              {:else}
                <div class="w-full h-full flex flex-col items-center justify-center text-foreground-300">
                  <i class="ri-image-line text-5xl mb-2"></i>
                  <span>No image available</span>
                </div>
              {/if}
            </div>

            <!-- Thumbnails List -->
            {#if images.length > 1}
              <div class="grid grid-cols-4 md:grid-cols-6 gap-3">
                {#each images as img, i}
                  <button 
                    type="button"
                    class="relative aspect-[4/3] rounded-xl overflow-hidden border-2 transition-all 
                    {activeImageIndex === i ? 'border-accent-600 ring-2 ring-accent-600/10' : 'border-transparent hover:border-background-300'}"
                    on:click={() => activeImageIndex = i}
                  >
                    <img 
                      src={img.image_url} 
                      alt="Thumbnail" 
                      class="w-full h-full object-cover"
                    />
                  </button>
                {/each}
              </div>
            {/if}
          </div>

          <!-- Specifications Summary -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div class="bg-background-50 p-6 rounded-2xl border border-background-200 text-center">
              <div class="text-foreground-400 text-lg mb-1"><i class="ri-price-tag-3-line"></i></div>
              <div class="text-[10px] uppercase font-bold tracking-widest text-foreground-400 mb-1">Price</div>
              <div class="text-sm font-bold text-accent-700 font-heading">{formatPrice(property.price, property.listing_type)}</div>
            </div>
            {#if property.property_type !== 'land'}
              <div class="bg-background-50 p-6 rounded-2xl border border-background-200 text-center">
                <div class="text-foreground-400 text-lg mb-1"><i class="ri-bed-line"></i></div>
                <div class="text-[10px] uppercase font-bold tracking-widest text-foreground-400 mb-1">Bedrooms</div>
                <div class="text-sm font-bold text-foreground-950">{property.bedrooms || 0} Rooms</div>
              </div>
              <div class="bg-background-50 p-6 rounded-2xl border border-background-200 text-center">
                <div class="text-foreground-400 text-lg mb-1"><i class="ri-shower-line"></i></div>
                <div class="text-[10px] uppercase font-bold tracking-widest text-foreground-400 mb-1">Bathrooms</div>
                <div class="text-sm font-bold text-foreground-950">{property.bathrooms || 0} Baths</div>
              </div>
            {/if}
            <div class="bg-background-50 p-6 rounded-2xl border border-background-200 text-center">
              <div class="text-foreground-400 text-lg mb-1"><i class="ri-ruler-2-line"></i></div>
              <div class="text-[10px] uppercase font-bold tracking-widest text-foreground-400 mb-1">Area Size</div>
              <div class="text-sm font-bold text-foreground-950">{property.square_meters ? `${property.square_meters} m²` : 'N/A'}</div>
            </div>
          </div>

          <!-- Description -->
          <div class="bg-background-50 p-8 rounded-3xl border border-background-200 shadow-sm">
            <h2 class="text-lg font-bold font-heading text-foreground-950 mb-4 pb-3 border-b border-background-200">About This Property</h2>
            <p class="text-sm text-foreground-600 leading-relaxed whitespace-pre-line">{property.description}</p>
          </div>

          <!-- Amenities List -->
          {#if amenities.length > 0}
            <div class="bg-background-50 p-8 rounded-3xl border border-background-200 shadow-sm">
              <h2 class="text-lg font-bold font-heading text-foreground-950 mb-6 pb-3 border-b border-background-200">Property Amenities</h2>
              
              <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
                {#each amenities as amenity}
                  <div class="flex items-center gap-3">
                    <div class="w-6 h-6 rounded-full bg-accent-600/10 text-accent-700 flex items-center justify-center text-sm flex-shrink-0">
                      <i class="ri-check-line"></i>
                    </div>
                    <span class="text-xs font-semibold text-foreground-850">{amenity}</span>
                  </div>
                {/each}
              </div>
            </div>
          {/if}

        </div>

        <!-- Right Column: Agent & Inquiry Form (lg:col-span-4) -->
        <div class="lg:col-span-4 flex flex-col gap-6 sticky top-[108px]">
          
          <!-- Agent Card -->
          <div class="bg-background-50 p-6 rounded-3xl border border-background-200 shadow-sm flex flex-col items-center text-center">
            <!-- Profile pic -->
            {#if agent.profile_image}
              <img 
                src={agent.profile_image} 
                alt={`${agent.first_name} ${agent.last_name}`} 
                class="w-16 h-16 rounded-full object-cover mb-4"
              />
            {:else}
              <div class="w-16 h-16 rounded-full bg-accent-600 text-background-50 flex items-center justify-center font-bold text-xl mb-4">
                {agent.first_name[0]}{agent.last_name[0]}
              </div>
            {/if}

            <h3 class="text-base font-bold text-foreground-950">{agent.first_name} {agent.last_name}</h3>
            <span class="text-[10px] font-bold uppercase tracking-wider text-foreground-450 mb-3">{agent.agency_name || 'TPC Consulting'}</span>
            
            <div class="w-full border-t border-background-200 my-4"></div>

            <p class="text-xs text-foreground-550 italic leading-relaxed mb-4">
              "{agent.bio || 'Professional real estate agent representing premium properties across Malawi.'}"
            </p>

            <div class="flex flex-col gap-2 w-full text-xs text-foreground-700 text-left font-medium">
              {#if agent.phone}
                <div class="flex items-center gap-2">
                  <i class="ri-phone-line text-accent-600 text-base"></i>
                  <span>{agent.phone}</span>
                </div>
              {/if}
              <div class="flex items-center gap-2">
                <i class="ri-mail-line text-accent-600 text-base"></i>
                <span class="truncate">{agent.email}</span>
              </div>
            </div>
          </div>

          <!-- Inquiry Form -->
          <div class="bg-background-50 p-6 rounded-3xl border border-background-200 shadow-sm">
            <h3 class="text-base font-bold font-heading text-foreground-950 mb-4 pb-2 border-b border-background-200">
              Inquire About Property
            </h3>

            {#if successState}
              <div 
                class="bg-accent-600/10 border border-accent-600/20 text-accent-800 rounded-2xl p-6 text-center"
                in:fade={{ duration: 200 }}
              >
                <div class="w-12 h-12 bg-accent-600 text-background-50 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                  <i class="ri-checkbox-circle-fill text-2xl"></i>
                </div>
                <h4 class="text-sm font-bold font-heading mb-1">Inquiry Sent</h4>
                <p class="text-xs leading-normal">{successMessage}</p>
              </div>
            {:else}
              {#if errorState}
                <div class="bg-red-50 border border-red-200 text-red-700 rounded-xl p-3 mb-4 text-xs font-semibold">
                  {errorMessage}
                </div>
              {/if}

              <form 
                method="POST" 
                action="?/inquiry"
                use:enhance={() => {
                  isLoading = true;
                  errorState = false;
                  successState = false;
                  return async ({ result }) => {
                    isLoading = false;
                    if (result.type === 'failure') {
                      errorState = true;
                      errorMessage = result.data?.message || 'Failed to send inquiry.';
                    } else if (result.type === 'success') {
                      successState = true;
                      successMessage = result.data?.message || 'Your inquiry was sent!';
                      visitorName = '';
                      visitorEmail = '';
                      visitorPhone = '';
                      visitorMessage = 'I would like to request more information or schedule a viewing for this property.';
                    }
                  };
                }}
                class="flex flex-col gap-4"
              >
                <div class="flex flex-col gap-1">
                  <label for="inqName" class="text-[9px] font-bold uppercase tracking-wider text-foreground-450 ml-1">Your Name</label>
                  <input 
                    type="text" 
                    id="inqName" 
                    name="name"
                    placeholder="Enter your name" 
                    bind:value={visitorName}
                    required
                    class="bg-background-100 border border-background-200 rounded-xl px-4 py-3 text-xs focus:outline-none focus:ring-2 focus:ring-accent-600/20 focus:border-accent-600 transition-all"
                  />
                </div>

                <div class="flex flex-col gap-1">
                  <label for="inqEmail" class="text-[9px] font-bold uppercase tracking-wider text-foreground-450 ml-1">Email Address</label>
                  <input 
                    type="email" 
                    id="inqEmail" 
                    name="email"
                    placeholder="your@email.com" 
                    bind:value={visitorEmail}
                    required
                    class="bg-background-100 border border-background-200 rounded-xl px-4 py-3 text-xs focus:outline-none focus:ring-2 focus:ring-accent-600/20 focus:border-accent-600 transition-all"
                  />
                </div>

                <div class="flex flex-col gap-1">
                  <label for="inqPhone" class="text-[9px] font-bold uppercase tracking-wider text-foreground-450 ml-1">Phone Number (Optional)</label>
                  <input 
                    type="tel" 
                    id="inqPhone" 
                    name="phone"
                    placeholder="+265..." 
                    bind:value={visitorPhone}
                    class="bg-background-100 border border-background-200 rounded-xl px-4 py-3 text-xs focus:outline-none focus:ring-2 focus:ring-accent-600/20 focus:border-accent-600 transition-all"
                  />
                </div>

                <div class="flex flex-col gap-1">
                  <label for="inqMessage" class="text-[9px] font-bold uppercase tracking-wider text-foreground-450 ml-1">Message</label>
                  <textarea 
                    id="inqMessage" 
                    name="message"
                    rows="4"
                    bind:value={visitorMessage}
                    required
                    class="bg-background-100 border border-background-200 rounded-xl px-4 py-3 text-xs focus:outline-none focus:ring-2 focus:ring-accent-600/20 focus:border-accent-600 transition-all resize-none"
                  ></textarea>
                </div>

                <button 
                  type="submit"
                  disabled={isLoading}
                  class="w-full bg-accent-600 hover:bg-accent-700 text-background-50 font-bold py-4 rounded-xl transition-all shadow-md shadow-accent-600/10 uppercase tracking-widest text-xs mt-2 flex items-center justify-center gap-2"
                >
                  {#if isLoading}
                    <i class="ri-loader-4-line animate-spin text-base"></i>
                    <span>Sending Inquiry...</span>
                  {:else}
                    <i class="ri-send-plane-line text-sm"></i>
                    <span>Contact Agent</span>
                  {/if}
                </button>
              </form>
            {/if}
          </div>

        </div>

      </div>
    </section>

  </main>

  <Footer />
</div>
