<script lang="ts">
  import { enhance } from '$app/forms';
  import { slide } from 'svelte/transition';

  export let data: any;
  export let form: any;

  $: ({ amenities } = data);

  let propertyType = 'house';
  let isLoading = false;
  let errorState = false;
  let errorMessage = '';

  $: if (form?.error) {
    errorState = true;
    errorMessage = form.message;
  }
</script>

<svelte:head>
  <title>List New Property | Terrestrial Property Consulting</title>
</svelte:head>

<div class="bg-background-50 border border-background-200 rounded-3xl p-8 md:p-12 shadow-sm max-w-[1000px]">
  
  <div class="mb-10 pb-6 border-b border-background-200">
    <h3 class="text-lg font-bold font-heading text-foreground-950">Property Listing Details</h3>
    <p class="text-xs text-foreground-500 mt-1">
      Submit your property details. Listings will go live on the public directory once approved by an administrator.
    </p>
  </div>

  {#if errorState}
    <div class="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 mb-8 text-xs font-semibold">
      {errorMessage}
    </div>
  {/if}

  <form 
    method="POST" 
    action="?/createProperty"
    use:enhance={() => {
      isLoading = true;
      errorState = false;
      return async ({ result, update }) => {
        isLoading = false;
        if (result.type === 'failure') {
          errorState = true;
          errorMessage = result.data?.message || 'Failed to create listing.';
        } else {
          update();
        }
      };
    }}
    class="flex flex-col gap-8 text-xs"
  >
    <!-- Section 1: Basic Information -->
    <div>
      <h4 class="text-xs font-bold uppercase tracking-widest text-accent-700 mb-6">1. General Information</h4>
      
      <div class="grid grid-cols-1 gap-6">
        <div class="flex flex-col gap-1.5">
          <label for="title" class="text-[10px] font-bold uppercase tracking-widest text-foreground-500 ml-1">Property Title *</label>
          <input 
            type="text" 
            name="title"
            id="title"
            placeholder="e.g. Modern 3 Bedroom House in Nyambadwe" 
            required
            class="bg-background-100 border border-background-200 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-accent-600/20 focus:border-accent-600 transition-all text-xs"
          />
        </div>

        <div class="flex flex-col gap-1.5">
          <label for="description" class="text-[10px] font-bold uppercase tracking-widest text-foreground-500 ml-1">Property Description</label>
          <textarea 
            name="description"
            id="description"
            rows="6"
            placeholder="Describe your property in detail. Mention unique selling points, proximity to services, security, etc."
            class="bg-background-100 border border-background-200 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-accent-600/20 focus:border-accent-600 transition-all resize-none text-xs"
          ></textarea>
        </div>
      </div>
    </div>

    <!-- Section 2: Property Specifications -->
    <div class="border-t border-background-200 pt-8">
      <h4 class="text-xs font-bold uppercase tracking-widest text-accent-700 mb-6">2. Specifications</h4>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="flex flex-col gap-1.5">
          <label for="propertyType" class="text-[10px] font-bold uppercase tracking-widest text-foreground-500 ml-1">Property Type *</label>
          <select 
            name="propertyType"
            id="propertyType"
            bind:value={propertyType}
            required
            class="bg-background-100 border border-background-200 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-accent-600/20 focus:border-accent-600 transition-all appearance-none text-xs"
          >
            <option value="house">House</option>
            <option value="apartment">Apartment</option>
            <option value="land">Land</option>
            <option value="commercial">Commercial</option>
          </select>
        </div>

        <div class="flex flex-col gap-1.5">
          <label for="listingType" class="text-[10px] font-bold uppercase tracking-widest text-foreground-500 ml-1">Listing Type *</label>
          <select 
            name="listingType"
            id="listingType"
            required
            class="bg-background-100 border border-background-200 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-accent-600/20 focus:border-accent-600 transition-all appearance-none text-xs"
          >
            <option value="sale">For Sale</option>
            <option value="rent">For Rent</option>
          </select>
        </div>

        <div class="flex flex-col gap-1.5">
          <label for="price" class="text-[10px] font-bold uppercase tracking-widest text-foreground-500 ml-1">Price (MK) *</label>
          <input 
            type="number" 
            name="price"
            id="price"
            placeholder="e.g. 45000000" 
            required
            min="1"
            class="bg-background-100 border border-background-200 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-accent-600/20 focus:border-accent-600 transition-all text-xs"
          />
        </div>
      </div>

      <!-- Conditional Rooms Inputs based on Property Type (e.g. not Land) -->
      {#if propertyType !== 'land'}
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6" transition:slide={{ duration: 250 }}>
          <div class="flex flex-col gap-1.5">
            <label for="bedrooms" class="text-[10px] font-bold uppercase tracking-widest text-foreground-500 ml-1">Bedrooms</label>
            <input 
              type="number" 
              name="bedrooms"
              id="bedrooms"
              placeholder="e.g. 3" 
              min="0"
              class="bg-background-100 border border-background-200 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-accent-600/20 focus:border-accent-600 transition-all text-xs"
            />
          </div>
          <div class="flex flex-col gap-1.5">
            <label for="bathrooms" class="text-[10px] font-bold uppercase tracking-widest text-foreground-500 ml-1">Bathrooms</label>
            <input 
              type="number" 
              name="bathrooms"
              id="bathrooms"
              placeholder="e.g. 2" 
              min="0"
              class="bg-background-100 border border-background-200 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-accent-600/20 focus:border-accent-600 transition-all text-xs"
            />
          </div>
          <div class="flex flex-col gap-1.5">
            <label for="parkingSpaces" class="text-[10px] font-bold uppercase tracking-widest text-foreground-500 ml-1">Parking Spaces</label>
            <input 
              type="number" 
              name="parkingSpaces"
              id="parkingSpaces"
              placeholder="e.g. 1" 
              min="0"
              class="bg-background-100 border border-background-200 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-accent-600/20 focus:border-accent-600 transition-all text-xs"
            />
          </div>
        </div>
      {/if}

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div class="flex flex-col gap-1.5">
          <label for="squareMeters" class="text-[10px] font-bold uppercase tracking-widest text-foreground-500 ml-1">Square Meters (Size)</label>
          <input 
            type="number" 
            name="squareMeters"
            id="squareMeters"
            placeholder="e.g. 250" 
            min="0"
            class="bg-background-100 border border-background-200 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-accent-600/20 focus:border-accent-600 transition-all text-xs"
          />
        </div>

        <div class="flex flex-col gap-1.5">
          <label for="imageUrl" class="text-[10px] font-bold uppercase tracking-widest text-foreground-500 ml-1">Primary Image URL *</label>
          <input 
            type="url" 
            name="imageUrl"
            id="imageUrl"
            placeholder="https://images.unsplash.com/photo-..." 
            required
            class="bg-background-100 border border-background-200 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-accent-600/20 focus:border-accent-600 transition-all text-xs"
          />
        </div>
      </div>
    </div>

    <!-- Section 3: Location Details -->
    <div class="border-t border-background-200 pt-8">
      <h4 class="text-xs font-bold uppercase tracking-widest text-accent-700 mb-6">3. Location Details</h4>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="flex flex-col gap-1.5 md:col-span-1">
          <label for="address" class="text-[10px] font-bold uppercase tracking-widest text-foreground-500 ml-1">Street Address *</label>
          <input 
            type="text" 
            name="address"
            id="address"
            placeholder="e.g. Soche Crescent" 
            required
            class="bg-background-100 border border-background-200 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-accent-600/20 focus:border-accent-600 transition-all text-xs"
          />
        </div>

        <div class="flex flex-col gap-1.5">
          <label for="city" class="text-[10px] font-bold uppercase tracking-widest text-foreground-500 ml-1">City *</label>
          <input 
            type="text" 
            name="city"
            id="city"
            placeholder="e.g. Blantyre" 
            required
            class="bg-background-100 border border-background-200 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-accent-600/20 focus:border-accent-600 transition-all text-xs"
          />
        </div>

        <div class="flex flex-col gap-1.5">
          <label for="stateRegion" class="text-[10px] font-bold uppercase tracking-widest text-foreground-500 ml-1">State / Region *</label>
          <input 
            type="text" 
            name="stateRegion"
            id="stateRegion"
            placeholder="e.g. Southern Region" 
            required
            class="bg-background-100 border border-background-200 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-accent-600/20 focus:border-accent-600 transition-all text-xs"
          />
        </div>
      </div>
    </div>

    <!-- Section 4: Amenities Checkboxes -->
    <div class="border-t border-background-200 pt-8">
      <h4 class="text-xs font-bold uppercase tracking-widest text-accent-700 mb-6">4. Property Amenities</h4>

      <div class="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {#each amenities as amenity}
          <label class="flex items-center gap-3 cursor-pointer p-4 bg-background-100 rounded-2xl hover:bg-background-200 transition-all select-none border border-background-200/50">
            <input 
              type="checkbox" 
              name="amenities"
              value={amenity.id}
              class="w-4 h-4 rounded text-accent-600 focus:ring-accent-600 border-background-300"
            />
            <span class="text-xs font-semibold text-foreground-750">{amenity.name}</span>
          </label>
        {/each}
      </div>
    </div>

    <!-- Submission Button -->
    <button 
      type="submit"
      disabled={isLoading}
      class="w-full bg-accent-600 hover:bg-accent-700 disabled:opacity-85 text-background-50 font-bold py-5 rounded-2xl transition-all shadow-lg shadow-accent-600/20 uppercase tracking-widest text-xs mt-4 flex items-center justify-center gap-2"
    >
      {#if isLoading}
        <i class="ri-loader-4-line animate-spin text-lg"></i>
        <span>Submitting listing...</span>
      {:else}
        <i class="ri-checkbox-circle-line text-lg"></i>
        <span>Submit for Verification</span>
      {/if}
    </button>
  </form>

</div>
