<script lang="ts">
  import { enhance } from '$app/forms';
  import { fade } from 'svelte/transition';
  import { goto } from '$app/navigation';

  export let data: any;

  $: ({ properties, inquiries } = data);

  let activeTab = 'properties'; // 'properties' | 'inquiries'

  // Filtering states for properties
  let searchQuery = '';
  let filterStatus = 'all';
  let filterType = 'all';
  let filterDate = 'all';
  let sortBy = 'newest';

  // Reactively filter and sort properties
  $: filteredProperties = properties
    .filter((p: any) => {
      // Search
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const titleMatch = p.title?.toLowerCase().includes(query);
        const addressMatch = p.address?.toLowerCase().includes(query);
        const cityMatch = p.city?.toLowerCase().includes(query);
        if (!titleMatch && !addressMatch && !cityMatch) return false;
      }

      // Status
      if (filterStatus !== 'all' && p.status !== filterStatus) return false;

      // Listing Type
      if (filterType !== 'all' && p.listing_type !== filterType) return false;

      // Date added filter
      if (filterDate !== 'all') {
        const date = new Date(p.created_at);
        const now = new Date();
        const diffMs = now.getTime() - date.getTime();
        const diffDays = diffMs / (1000 * 60 * 60 * 24);

        if (filterDate === 'today' && diffDays > 1) return false;
        if (filterDate === 'week' && diffDays > 7) return false;
        if (filterDate === 'month' && diffDays > 30) return false;
      }

      return true;
    })
    .sort((a: any, b: any) => {
      if (sortBy === 'newest') {
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      }
      if (sortBy === 'oldest') {
        return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
      }
      if (sortBy === 'price-asc') {
        return a.price - b.price;
      }
      if (sortBy === 'price-desc') {
        return b.price - a.price;
      }
      return 0;
    });

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
      day: 'numeric'
    });
  }
</script>

<svelte:head>
  <title>Agent Dashboard | Terrestrial Property Consulting</title>
</svelte:head>

<!-- Tabs Nav -->
<div class="flex border-b border-background-200 mb-8 bg-background-50 p-2 rounded-2xl shadow-sm border">
  <button 
    type="button" 
    class="flex-1 px-6 py-3 text-xs font-bold uppercase tracking-widest transition-all rounded-xl
    {activeTab === 'properties' ? 'bg-primary-500 text-background-50' : 'text-foreground-500 hover:text-foreground-800'}"
    on:click={() => activeTab = 'properties'}
  >
    My Properties ({properties.length})
  </button>
  <button 
    type="button" 
    class="flex-1 px-6 py-3 text-xs font-bold uppercase tracking-widest transition-all rounded-xl
    {activeTab === 'inquiries' ? 'bg-primary-500 text-background-50' : 'text-foreground-500 hover:text-foreground-800'}"
    on:click={() => activeTab = 'inquiries'}
  >
    Leads & Inquiries ({inquiries.length})
  </button>
</div>

<!-- Tab Content: Properties -->
{#if activeTab === 'properties'}
  <div in:fade={{ duration: 150 }} class="space-y-6">
    
    <!-- Controls/Filters Toolbar -->
    <div class="bg-background-50 border border-background-200 rounded-2xl p-4 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div class="flex flex-wrap items-center gap-3 flex-grow">
        <!-- Search bar -->
        <div class="relative w-full md:w-64">
          <span class="absolute inset-y-0 left-0 pl-3.5 flex items-center text-foreground-400 pointer-events-none">
            <i class="ri-search-line"></i>
          </span>
          <input 
            type="text" 
            placeholder="Search properties..." 
            bind:value={searchQuery}
            class="w-full pl-10 pr-4 py-2 border border-background-300 rounded-xl bg-background-50 text-foreground-900 text-xs placeholder:text-foreground-400 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all"
          />
        </div>

        <!-- Status Filter -->
        <select 
          bind:value={filterStatus}
          class="border border-background-300 rounded-xl px-3 py-2 bg-background-50 text-foreground-800 text-xs focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all appearance-none pr-8 relative"
          style="background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23666%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E'); background-repeat: no-repeat; background-position: right 10px top 50%; background-size: 8px auto;"
        >
          <option value="all">All Statuses</option>
          <option value="approved">Approved</option>
          <option value="pending">Pending</option>
          <option value="rejected">Rejected</option>
        </select>

        <!-- Type Filter -->
        <select 
          bind:value={filterType}
          class="border border-background-300 rounded-xl px-3 py-2 bg-background-50 text-foreground-800 text-xs focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all appearance-none pr-8 relative"
          style="background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23666%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E'); background-repeat: no-repeat; background-position: right 10px top 50%; background-size: 8px auto;"
        >
          <option value="all">All Types</option>
          <option value="sale">For Sale</option>
          <option value="rent">For Rent</option>
        </select>

        <!-- Date added filter -->
        <select 
          bind:value={filterDate}
          class="border border-background-300 rounded-xl px-3 py-2 bg-background-50 text-foreground-800 text-xs focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all appearance-none pr-8 relative"
          style="background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23666%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E'); background-repeat: no-repeat; background-position: right 10px top 50%; background-size: 8px auto;"
        >
          <option value="all">Any Date Added</option>
          <option value="today">Added Today</option>
          <option value="week">Added This Week</option>
          <option value="month">Added This Month</option>
        </select>

        <!-- Sorting -->
        <select 
          bind:value={sortBy}
          class="border border-background-300 rounded-xl px-3 py-2 bg-background-50 text-foreground-800 text-xs focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all appearance-none pr-8 relative"
          style="background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23666%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E'); background-repeat: no-repeat; background-position: right 10px top 50%; background-size: 8px auto;"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </select>
      </div>

      <!-- Add Listing Action -->
      <a 
        href="/agent/new" 
        class="bg-primary-500 hover:bg-primary-600 text-white font-bold px-4 py-2.5 rounded-xl transition-all text-[10px] uppercase tracking-wider flex items-center gap-1.5 justify-center shadow-sm hover:shadow-md whitespace-nowrap"
      >
        <i class="ri-add-line text-sm"></i> Add Listing
      </a>
    </div>

    <!-- Properties Table List -->
    <div class="bg-background-50 border border-background-200 rounded-2xl overflow-hidden shadow-sm">
      {#if filteredProperties.length === 0}
        <div class="p-12 text-center">
          <div class="w-14 h-14 bg-background-100 text-foreground-450 rounded-full flex items-center justify-center mx-auto mb-6">
            <i class="ri-hotel-line text-2xl"></i>
          </div>
          <h3 class="text-base font-bold font-heading text-foreground-950 mb-2">No Properties Found</h3>
          <p class="text-xs text-foreground-550 max-w-sm mx-auto mb-6">
            {properties.length === 0 
              ? "You haven't added any listings yet." 
              : "Try adjusting your search query or filters."}
          </p>
          {#if properties.length === 0}
            <a 
              href="/agent/new" 
              class="bg-primary-500 hover:bg-primary-600 text-white font-bold px-5 py-2.5 rounded-xl transition-all text-xs inline-flex items-center gap-2"
            >
              <i class="ri-add-line"></i> Create First Listing
            </a>
          {/if}
        </div>
      {:else}
        <div class="overflow-x-auto">
          <table class="w-full text-left">
            <thead>
              <tr class="bg-background-100/50 text-[10px] uppercase tracking-widest text-foreground-550 border-b border-background-200 font-bold">
                <th class="px-6 py-4">Property</th>
                <th class="px-6 py-4">Location</th>
                <th class="px-6 py-4">Price & Details</th>
                <th class="px-6 py-4">Status</th>
                <th class="px-6 py-4">Date Added</th>
                <th class="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-background-200 text-xs">
              {#each filteredProperties as prop}
                <!-- Row behaves as click trigger to view details -->
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
                <tr 
                  class="hover:bg-background-100/30 transition-colors cursor-pointer"
                  on:click={() => goto(`/agent/properties/${prop.id}`)}
                  in:fade={{ duration: 150 }}
                >
                  <!-- Property Info -->
                  <td class="px-6 py-4">
                    <div class="flex items-center gap-3">
                      <div class="w-12 h-12 rounded-xl bg-background-200 overflow-hidden flex-shrink-0 border border-background-300">
                        {#if prop.primary_image}
                          <img src={prop.primary_image} alt={prop.title} class="w-full h-full object-cover" />
                        {:else}
                          <div class="w-full h-full flex items-center justify-center text-foreground-400 bg-background-150">
                            <i class="ri-image-line"></i>
                          </div>
                        {/if}
                      </div>
                      <div>
                        <div class="font-bold text-foreground-950 line-clamp-1 max-w-[200px]">{prop.title}</div>
                        <div class="text-[9px] text-foreground-450 uppercase font-semibold mt-0.5">{prop.property_type} • For {prop.listing_type}</div>
                      </div>
                    </div>
                  </td>

                  <!-- Location -->
                  <td class="px-6 py-4">
                    <div class="font-medium text-foreground-900">{prop.address}</div>
                    <div class="text-[10px] text-foreground-500">{prop.city}, {prop.state_region}</div>
                  </td>

                  <!-- Price & Specs -->
                  <td class="px-6 py-4">
                    <div class="font-bold text-accent-700">{formatPrice(prop.price, prop.listing_type)}</div>
                    <div class="text-[10px] text-foreground-500 mt-0.5">
                      {#if prop.property_type !== 'land'}
                        <span>{prop.bedrooms || 0} Beds • {prop.bathrooms || 0} Baths • </span>
                      {/if}
                      <span>{prop.square_meters ? `${prop.square_meters} m²` : 'N/A'}</span>
                    </div>
                  </td>

                  <!-- Status -->
                  <td class="px-6 py-4">
                    {#if prop.status === 'approved'}
                      <span class="inline-flex items-center gap-1 text-[9px] uppercase tracking-wider font-bold text-green-700 bg-green-50 border border-green-200/50 px-2 py-0.5 rounded-full">
                        Approved
                      </span>
                    {:else if prop.status === 'pending'}
                      <span class="inline-flex items-center gap-1 text-[9px] uppercase tracking-wider font-bold text-amber-700 bg-amber-50 border border-amber-200/50 px-2 py-0.5 rounded-full">
                        Pending
                      </span>
                    {:else}
                      <span class="inline-flex items-center gap-1 text-[9px] uppercase tracking-wider font-bold text-red-700 bg-red-50 border border-red-200/50 px-2 py-0.5 rounded-full">
                        Rejected
                      </span>
                    {/if}
                  </td>

                  <!-- Date Added -->
                  <td class="px-6 py-4">
                    <span class="text-foreground-500">{formatDate(prop.created_at)}</span>
                  </td>

                  <!-- Actions -->
                  <td class="px-6 py-4 text-right" on:click|stopPropagation>
                    <div class="flex items-center justify-end gap-2">
                      <button 
                        on:click={() => goto(`/agent/properties/${prop.id}`)}
                        class="bg-background-100 hover:bg-background-200 text-foreground-850 font-bold px-3 py-1.5 rounded-lg border border-background-200/60 transition-all text-[10px] uppercase tracking-wider"
                      >
                        View Details
                      </button>
                      <form 
                        method="POST" 
                        action="?/deleteProperty" 
                        use:enhance={() => {
                          return async ({ update }) => {
                            if (confirm('Are you sure you want to delete this property listing? This action is permanent.')) {
                              update();
                            }
                          };
                        }}
                      >
                        <input type="hidden" name="propertyId" value={prop.id} />
                        <button 
                          type="submit" 
                          class="bg-red-50 hover:bg-red-500 hover:text-white text-red-650 font-bold px-3 py-1.5 rounded-lg border border-red-200/55 transition-all text-[10px] uppercase tracking-wider"
                        >
                          Delete
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
      {/if}
    </div>
  </div>
{/if}

<!-- Tab Content: Inquiries -->
{#if activeTab === 'inquiries'}
  <div in:fade={{ duration: 150 }} class="bg-background-50 border border-background-200 rounded-3xl overflow-hidden shadow-sm">
    <div class="px-6 py-5 border-b border-background-200 bg-background-50/50">
      <h2 class="text-sm font-bold text-foreground-950 font-heading">Incoming Customer Leads</h2>
    </div>
    
    {#if inquiries.length === 0}
      <div class="p-12 text-center">
        <div class="w-14 h-14 bg-background-100 text-foreground-450 rounded-full flex items-center justify-center mx-auto mb-6">
          <i class="ri-chat-voice-line text-2xl"></i>
        </div>
        <h3 class="text-base font-bold font-heading text-foreground-950 mb-2">No Leads Yet</h3>
        <p class="text-xs text-foreground-550 max-w-sm mx-auto">
          Once visitors fill out inquiry forms on your approved property detail pages, they will instantly appear here.
        </p>
      </div>
    {:else}
      <div class="overflow-x-auto">
        <table class="w-full text-left">
          <thead>
            <tr class="bg-background-100/50 text-[10px] uppercase tracking-widest text-foreground-500 border-b border-background-200 font-bold">
              <th class="px-6 py-4">Property Inquiry</th>
              <th class="px-6 py-4">Visitor Details</th>
              <th class="px-6 py-4">Message</th>
              <th class="px-6 py-4">Received</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-background-200">
            {#each inquiries as inq}
              <tr class="hover:bg-background-100/30 transition-colors text-xs" in:fade>
                <!-- Property Link -->
                <td class="px-6 py-4">
                  <div class="font-bold text-foreground-900 line-clamp-2 max-w-xs">{inq.property_title}</div>
                </td>

                <!-- Visitor info -->
                <td class="px-6 py-4">
                  <div class="font-bold text-foreground-950">{inq.name}</div>
                  <div class="text-foreground-500 mt-0.5">{inq.email}</div>
                  {#if inq.phone}
                    <div class="text-foreground-450 mt-0.5">{inq.phone}</div>
                  {/if}
                </td>

                <!-- Message -->
                <td class="px-6 py-4">
                  <div class="text-foreground-600 max-w-sm whitespace-pre-line leading-relaxed italic bg-background-100/50 p-3.5 rounded-xl border border-background-200/55">
                    "{inq.message}"
                  </div>
                </td>

                <!-- Date -->
                <td class="px-6 py-4 text-foreground-550 whitespace-nowrap">
                  {formatDate(inq.created_at)}
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    {/if}
  </div>
{/if}
