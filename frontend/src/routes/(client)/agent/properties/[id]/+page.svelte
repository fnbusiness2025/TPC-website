<script lang="ts">
  import { enhance } from '$app/forms';
  import { fade } from 'svelte/transition';

  export let data: any;
  export let form: any;

  $: ({ property, images, amenities, reviews } = data);

  // Active image for simple gallery
  let activeImageIndex = 0;
  $: activeImage = images[activeImageIndex] || null;

  // Helper to format currency in Malawian Kwacha
  function formatPrice(price: number, listingType: string): string {
    const formatted = new Intl.NumberFormat('en-MW', {
      style: 'currency',
      currency: 'MWK',
      maximumFractionDigits: 0
    }).format(price).replace('MWK', 'MK');

    return listingType === 'rent' ? `${formatted} / month` : formatted;
  }

  // Format timestamp to readable date
  function formatDate(isoString: string): string {
    return new Date(isoString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
</script>

<svelte:head>
  <title>Property Details: {property.title} | Agent Portal</title>
</svelte:head>

{#if form?.error}
  <div class="mb-6 px-5 py-3.5 rounded-xl bg-red-50 border border-red-200 text-red-650 text-xs font-semibold flex items-center gap-2" in:fade>
    <i class="ri-error-warning-fill text-base"></i> {form.message}
  </div>
{/if}

<!-- Back navigation -->
<div class="mb-6">
  <a 
    href="/agent" 
    class="inline-flex items-center gap-2 text-xs font-semibold text-foreground-550 hover:text-foreground-850 transition-colors"
  >
    <i class="ri-arrow-left-line text-sm"></i> Back to Dashboard
  </a>
</div>

<!-- Main Details Layout -->
<div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
  
  <!-- Left Side: Property Content (2/3 width on desktop) -->
  <div class="lg:col-span-2 space-y-8">
    
    <!-- Image Gallery -->
    <div class="bg-background-50 border border-background-200 rounded-3xl overflow-hidden shadow-sm p-4">
      <div class="relative aspect-[16/9] w-full bg-background-200 rounded-2xl overflow-hidden mb-4 border border-background-200">
        {#if activeImage}
          <img src={activeImage.image_url} alt={property.title} class="w-full h-full object-cover" />
        {:else}
          <div class="w-full h-full flex flex-col items-center justify-center text-foreground-350 bg-background-150">
            <i class="ri-image-line text-5xl mb-2"></i>
            <span class="text-xs">No images uploaded for this listing</span>
          </div>
        {/if}
        
        <!-- Hover Badge on Image -->
        <div class="absolute bottom-4 left-4 flex gap-2">
          <span class="px-2.5 py-1 rounded-lg text-[9px] font-bold uppercase tracking-wider text-background-50 bg-accent-600 shadow">
            For {property.listing_type}
          </span>
        </div>
      </div>

      <!-- Thumbnails selection -->
      {#if images.length > 1}
        <div class="flex gap-3 overflow-x-auto pb-1">
          {#each images as img, index}
            <button 
              type="button"
              on:click={() => activeImageIndex = index}
              class="w-20 h-14 rounded-lg overflow-hidden border-2 flex-shrink-0 transition-all
              {activeImageIndex === index ? 'border-primary-500 scale-95 shadow-sm' : 'border-background-200 opacity-70 hover:opacity-100'}"
            >
              <img src={img.image_url} alt="" class="w-full h-full object-cover" />
            </button>
          {/each}
        </div>
      {/if}
    </div>

    <!-- General Info Card -->
    <div class="bg-background-50 border border-background-200 rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
      <div>
        <span class="text-xs uppercase tracking-widest text-primary-500 font-bold">{property.property_type}</span>
        <h1 class="text-xl md:text-2xl font-bold font-heading text-foreground-950 mt-1">{property.title}</h1>
        
        <div class="flex items-center gap-1.5 text-xs text-foreground-550 mt-3">
          <i class="ri-map-pin-line text-sm text-accent-600"></i>
          <span>{property.address}, {property.city}, {property.state_region}</span>
        </div>
      </div>

      <div class="border-y border-background-200 py-5 flex items-center justify-between">
        <div>
          <span class="text-[10px] uppercase tracking-wider text-foreground-450 block">Listing Price</span>
          <span class="text-2xl font-bold text-accent-700 font-heading mt-0.5">{formatPrice(property.price, property.listing_type)}</span>
        </div>
        <div class="text-right">
          <span class="text-[10px] uppercase tracking-wider text-foreground-450 block">Status</span>
          <span class="mt-1 inline-block">
            {#if property.status === 'approved'}
              <span class="px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider text-green-700 bg-green-50 border border-green-200/50">
                Approved & Active
              </span>
            {:else if property.status === 'pending'}
              <span class="px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider text-amber-700 bg-amber-50 border border-amber-200/50">
                Pending Verification
              </span>
            {:else}
              <span class="px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider text-red-700 bg-red-50 border border-red-200/50">
                Rejected
              </span>
            {/if}
          </span>
        </div>
      </div>

      <!-- Description -->
      <div class="space-y-3">
        <h3 class="text-xs font-bold uppercase tracking-widest text-foreground-900">Description</h3>
        <p class="text-xs text-foreground-650 leading-relaxed whitespace-pre-line bg-background-100/30 p-5 rounded-2xl border border-background-200/50">
          {property.description || 'No description provided.'}
        </p>
      </div>

      <!-- Specifications Grid -->
      <div class="space-y-4">
        <h3 class="text-xs font-bold uppercase tracking-widest text-foreground-900">Specifications</h3>
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div class="bg-background-100 p-4 rounded-xl border border-background-200/50">
            <span class="block text-[9px] uppercase tracking-wider text-foreground-450 font-bold">Property Type</span>
            <span class="block font-bold text-foreground-900 mt-1 capitalize text-xs">{property.property_type}</span>
          </div>
          <div class="bg-background-100 p-4 rounded-xl border border-background-200/50">
            <span class="block text-[9px] uppercase tracking-wider text-foreground-450 font-bold">Bedrooms</span>
            <span class="block font-bold text-foreground-900 mt-1 text-xs">{property.bedrooms || '—'}</span>
          </div>
          <div class="bg-background-100 p-4 rounded-xl border border-background-200/50">
            <span class="block text-[9px] uppercase tracking-wider text-foreground-450 font-bold">Bathrooms</span>
            <span class="block font-bold text-foreground-900 mt-1 text-xs">{property.bathrooms || '—'}</span>
          </div>
          <div class="bg-background-100 p-4 rounded-xl border border-background-200/50">
            <span class="block text-[9px] uppercase tracking-wider text-foreground-450 font-bold">Area Size</span>
            <span class="block font-bold text-foreground-900 mt-1 text-xs">{property.square_meters ? `${property.square_meters} m²` : '—'}</span>
          </div>
        </div>
      </div>

      <!-- Amenities Tag List -->
      {#if amenities.length > 0}
        <div class="space-y-3">
          <h3 class="text-xs font-bold uppercase tracking-widest text-foreground-900">Amenities</h3>
          <div class="flex flex-wrap gap-2.5">
            {#each amenities as amenity}
              <span class="bg-background-100 text-foreground-750 border border-background-200/70 px-3.5 py-2 rounded-xl font-semibold text-xs transition-colors hover:bg-background-200/50">
                {amenity}
              </span>
            {/each}
          </div>
        </div>
      {/if}

    </div>

  </div>

  <!-- Right Side: Sticky Review & Actions Sidebar (1/3 width on desktop) -->
  <div class="space-y-6">
    
    <!-- Admin Review Panel -->
    <div class="bg-background-50 border border-background-200 rounded-3xl p-6 shadow-sm space-y-4">
      <h3 class="text-xs font-bold uppercase tracking-widest text-foreground-900">Verification Status</h3>
      
      {#if property.status === 'pending'}
        <div class="bg-amber-50/65 border border-amber-200 text-amber-800 rounded-2xl p-4 text-xs space-y-2">
          <div class="font-bold flex items-center gap-1.5">
            <i class="ri-time-line text-sm"></i> Pending Approval
          </div>
          <p class="text-foreground-550 leading-relaxed">
            Your listing is currently under review by TPC administration. It will be published to the directory once verified.
          </p>
        </div>
      {:else if property.status === 'approved'}
        <div class="bg-green-50/65 border border-green-200 text-green-800 rounded-2xl p-4 text-xs space-y-2">
          <div class="font-bold flex items-center gap-1.5">
            <i class="ri-checkbox-circle-line text-sm"></i> Published & Verified
          </div>
          <p class="text-foreground-550 leading-relaxed">
            This listing is approved and visible to the public. Prospective visitors can now view it and contact you.
          </p>
        </div>
      {:else}
        <div class="bg-red-50/65 border border-red-200 text-red-800 rounded-2xl p-4 text-xs space-y-2">
          <div class="font-bold flex items-center gap-1.5">
            <i class="ri-error-warning-line text-sm"></i> Listing Rejected
          </div>
          <p class="text-foreground-550 leading-relaxed">
            This listing was rejected and is not public. Please review the admin feedback below.
          </p>
        </div>
      {/if}

      <!-- Admin Comments / Feedback Log -->
      {#if reviews.length > 0}
        <div class="pt-4 border-t border-background-200 space-y-3">
          <h4 class="text-[10px] uppercase tracking-wider text-foreground-450 font-bold">Admin Feedback History</h4>
          <div class="space-y-3.5 max-h-60 overflow-y-auto pr-1">
            {#each reviews as review}
              <div class="bg-background-100/60 border border-background-200 rounded-xl p-3.5 space-y-1.5 text-xs">
                <div class="flex justify-between items-center text-[10px]">
                  <span class="font-bold text-foreground-800">{review.first_name} {review.last_name}</span>
                  <span class="text-foreground-450">{formatDate(review.created_at)}</span>
                </div>
                <div class="flex items-center gap-1">
                  <span class="text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded
                    {review.action === 'approved' ? 'bg-green-500/10 text-green-600' : 'bg-red-500/10 text-red-500'}">
                    {review.action}
                  </span>
                </div>
                {#if review.reason}
                  <p class="text-[11px] text-foreground-600 leading-relaxed italic">
                    "{review.reason}"
                  </p>
                {/if}
              </div>
            {/each}
          </div>
        </div>
      {/if}
    </div>

    <!-- Actions Panel -->
    <div class="bg-background-50 border border-background-200 rounded-3xl p-6 shadow-sm space-y-4">
      <h3 class="text-xs font-bold uppercase tracking-widest text-foreground-900">Manage Listing</h3>
      
      <div class="flex flex-col gap-3">
        {#if property.status === 'approved'}
          <a 
            href="/properties/{property.id}" 
            target="_blank"
            class="w-full text-center bg-primary-500 hover:bg-primary-600 text-background-50 font-bold py-3.5 rounded-xl text-xs uppercase tracking-widest transition-all shadow-sm hover:shadow flex items-center justify-center gap-1.5"
          >
            <i class="ri-external-link-line"></i> View Public Page
          </a>
        {/if}

        <form 
          method="POST" 
          action="?/deleteProperty"
          use:enhance={() => {
            return async ({ update }) => {
              if (confirm('Are you sure you want to permanently delete this listing? This action cannot be undone.')) {
                update();
              }
            };
          }}
        >
          <button 
            type="submit"
            class="w-full text-center bg-red-50 hover:bg-red-500 hover:text-white text-red-650 font-bold py-3.5 rounded-xl text-xs uppercase tracking-widest border border-red-200/55 transition-all flex items-center justify-center gap-1.5"
          >
            <i class="ri-delete-bin-line"></i> Delete Listing
          </button>
        </form>
      </div>

      <div class="text-[10px] text-foreground-450 pt-2 border-t border-background-200 text-center">
        Listed on {new Date(property.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
      </div>
    </div>

  </div>

</div>
