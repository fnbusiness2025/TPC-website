<script lang="ts">
  import { enhance } from '$app/forms';
  import { fade } from 'svelte/transition';

  export let data: any;

  $: ({ stats, pendingProperties, pendingAgents } = data);

  // Helper to format currency
  function formatPrice(price: number, listingType: string): string {
    const formatted = new Intl.NumberFormat('en-MW', {
      style: 'currency',
      currency: 'MWK',
      maximumFractionDigits: 0
    }).format(price).replace('MWK', 'MK');

    return listingType === 'rent' ? `${formatted} / month` : formatted;
  }

  // Tracking active rejection prompt ids
  let rejectPropertyId: string | null = null;
  let rejectReason = '';
</script>

<svelte:head>
  <title>Admin Dashboard | Terrestrial Property Consulting</title>
</svelte:head>

<!-- Statistics Row -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
  <div class="bg-background-50 p-6 rounded-2xl shadow-sm border border-background-200">
    <div class="flex justify-between items-start mb-4">
      <div class="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center text-2xl">
        <i class="ri-hotel-line"></i>
      </div>
    </div>
    <div class="text-xs text-foreground-500 font-bold uppercase tracking-wider mb-1">Total Properties</div>
    <div class="text-2xl font-bold font-heading text-foreground-950">{stats.totalProperties}</div>
  </div>

  <div class="bg-background-50 p-6 rounded-2xl shadow-sm border border-background-200">
    <div class="flex justify-between items-start mb-4">
      <div class="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center text-2xl">
        <i class="ri-history-line"></i>
      </div>
      {#if stats.pendingProperties > 0}
        <span class="text-[10px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-lg animate-pulse">Needs Review</span>
      {/if}
    </div>
    <div class="text-xs text-foreground-500 font-bold uppercase tracking-wider mb-1">Pending Properties</div>
    <div class="text-2xl font-bold font-heading text-foreground-950">{stats.pendingProperties}</div>
  </div>

  <div class="bg-background-50 p-6 rounded-2xl shadow-sm border border-background-200">
    <div class="flex justify-between items-start mb-4">
      <div class="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center text-2xl">
        <i class="ri-user-settings-line"></i>
      </div>
      {#if stats.pendingAgents > 0}
        <span class="text-[10px] font-bold text-purple-700 bg-purple-100 px-2 py-0.5 rounded-lg animate-pulse">Pending Agents</span>
      {/if}
    </div>
    <div class="text-xs text-foreground-500 font-bold uppercase tracking-wider mb-1">Agent Approvals Queue</div>
    <div class="text-2xl font-bold font-heading text-foreground-950">{stats.pendingAgents}</div>
  </div>

  <div class="bg-background-50 p-6 rounded-2xl shadow-sm border border-background-200">
    <div class="flex justify-between items-start mb-4">
      <div class="w-12 h-12 bg-green-50 text-green-600 rounded-xl flex items-center justify-center text-2xl">
        <i class="ri-chat-voice-line"></i>
      </div>
    </div>
    <div class="text-xs text-foreground-500 font-bold uppercase tracking-wider mb-1">Total Leads Inquiries</div>
    <div class="text-2xl font-bold font-heading text-foreground-950">{stats.totalInquiries}</div>
  </div>
</div>

<div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
  
  <!-- Left Side: Pending Properties (lg:col-span-7) -->
  <div class="lg:col-span-7 bg-background-50 rounded-2xl shadow-sm border border-background-200 overflow-hidden flex flex-col justify-between">
    <div>
      <div class="px-6 py-5 border-b border-background-200 bg-background-50/50">
        <h3 class="font-bold font-heading text-foreground-950">Pending Property Listing Submissions</h3>
      </div>
      
      {#if pendingProperties.length === 0}
        <div class="p-12 text-center">
          <div class="w-12 h-12 bg-background-100 text-foreground-450 rounded-full flex items-center justify-center mx-auto mb-4">
            <i class="ri-checkbox-circle-line text-xl"></i>
          </div>
          <p class="text-xs text-foreground-500 font-semibold">All property submissions have been reviewed!</p>
        </div>
      {:else}
        <div class="divide-y divide-background-200">
          {#each pendingProperties as prop}
            <div class="p-6 flex flex-col gap-4 hover:bg-background-100/20 transition-colors">
              <div class="flex justify-between items-start gap-4">
                <div>
                  <h4 class="font-bold text-foreground-950 text-sm">{prop.title}</h4>
                  <p class="text-xs text-foreground-500 mt-1">{prop.address}, {prop.city}</p>
                  <p class="text-xs text-foreground-400 mt-1">Submitted by: <span class="font-semibold text-foreground-750">{prop.first_name} {prop.last_name}</span> ({prop.agent_email})</p>
                </div>
                <div class="text-right flex-shrink-0">
                  <span class="text-sm font-bold text-accent-700 block font-heading">{formatPrice(prop.price, prop.listing_type)}</span>
                  <span class="text-[9px] uppercase tracking-wider font-bold text-foreground-400 px-2 py-0.5 bg-background-100 rounded inline-block mt-1">
                    For {prop.listing_type} • {prop.property_type}
                  </span>
                </div>
              </div>

              <!-- Collapsed Description Toggle -->
              <details class="text-xs text-foreground-600 bg-background-100/50 rounded-xl border border-background-200/55 p-3">
                <summary class="font-semibold cursor-pointer select-none text-[10px] uppercase tracking-wider text-foreground-500">View Description & Details</summary>
                <div class="mt-2 whitespace-pre-line leading-relaxed border-t border-background-200 pt-2">
                  <p>{prop.description}</p>
                  <div class="grid grid-cols-3 gap-2 mt-3 font-semibold text-[10px] text-foreground-500">
                    <span>Beds: {prop.bedrooms || 'N/A'}</span>
                    <span>Baths: {prop.bathrooms || 'N/A'}</span>
                    <span>Size: {prop.square_meters ? `${prop.square_meters} m²` : 'N/A'}</span>
                  </div>
                </div>
              </details>

              <!-- Actions row -->
              <div class="flex items-center gap-3 mt-1">
                {#if rejectPropertyId !== prop.id}
                  <form 
                    method="POST" 
                    action="?/approveProperty" 
                    use:enhance={() => {
                      return async ({ update }) => {
                        if (confirm('Approve this listing? It will go live immediately.')) {
                          update();
                        }
                      };
                    }}
                  >
                    <input type="hidden" name="propertyId" value={prop.id} />
                    <button type="submit" class="bg-green-600 hover:bg-green-700 text-white text-[10px] font-bold uppercase tracking-widest px-4 py-2.5 rounded-lg transition-colors">
                      Approve Listing
                    </button>
                  </form>

                  <button 
                    type="button" 
                    on:click={() => { rejectPropertyId = prop.id; rejectReason = ''; }}
                    class="bg-red-50 hover:bg-red-100 text-red-700 text-[10px] font-bold uppercase tracking-widest px-4 py-2.5 rounded-lg border border-red-200 transition-colors"
                  >
                    Reject...
                  </button>
                {:else}
                  <!-- Rejection Form -->
                  <form 
                    method="POST" 
                    action="?/rejectProperty"
                    use:enhance={() => {
                      return async ({ update }) => {
                        update();
                        rejectPropertyId = null;
                      };
                    }}
                    class="w-full bg-red-50/50 p-4 rounded-xl border border-red-200/50 flex flex-col gap-3"
                    in:fade={{ duration: 150 }}
                  >
                    <input type="hidden" name="propertyId" value={prop.id} />
                    <div class="flex flex-col gap-1">
                      <label for="rejReason" class="text-[9px] font-bold uppercase tracking-wider text-red-700">Specify Rejection Reason</label>
                      <input 
                        type="text" 
                        id="rejReason" 
                        name="reason" 
                        placeholder="e.g. Incomplete description or invalid price value"
                        bind:value={rejectReason}
                        required
                        class="bg-white border border-red-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-transparent"
                      />
                    </div>
                    <div class="flex items-center gap-2">
                      <button type="submit" class="bg-red-600 hover:bg-red-700 text-white text-[9px] font-bold uppercase tracking-widest px-3 py-2 rounded-lg transition-colors">
                        Confirm Rejection
                      </button>
                      <button type="button" on:click={() => rejectPropertyId = null} class="text-foreground-500 hover:text-foreground-800 text-[9px] font-bold uppercase tracking-widest px-3 py-2">
                        Cancel
                      </button>
                    </div>
                  </form>
                {/if}
              </div>
            </div>
          {/each}
        </div>
      {/if}
    </div>
  </div>

  <!-- Right Side: Pending Agent Verification (lg:col-span-5) -->
  <div class="lg:col-span-5 bg-background-50 rounded-2xl shadow-sm border border-background-200 p-6">
    <h3 class="font-bold font-heading text-foreground-950 mb-6 pb-2 border-b border-background-200">Pending Agent Registrations</h3>
    
    {#if pendingAgents.length === 0}
      <div class="text-center py-12">
        <div class="w-12 h-12 bg-background-100 text-foreground-450 rounded-full flex items-center justify-center mx-auto mb-4">
          <i class="ri-shield-user-line text-xl"></i>
        </div>
        <p class="text-xs text-foreground-500 font-semibold">No pending agents to verify.</p>
      </div>
    {:else}
      <div class="flex flex-col gap-6">
        {#each pendingAgents as agent}
          <div class="p-5 bg-background-100/50 rounded-2xl border border-background-200 flex flex-col gap-4">
            <div>
              <h4 class="font-bold text-foreground-950 text-sm">{agent.first_name} {agent.last_name}</h4>
              <p class="text-xs text-foreground-500 mt-1 font-semibold">{agent.agency_name}</p>
              <p class="text-xs text-foreground-450 mt-1">{agent.office_address}</p>
              
              <div class="flex flex-col gap-0.5 mt-3 text-[10px] text-foreground-500 font-medium border-t border-background-200/50 pt-2.5">
                <span>Email: {agent.email}</span>
                {#if agent.phone}
                  <span>Phone: {agent.phone}</span>
                {/if}
              </div>
            </div>

            <!-- Approve/Reject buttons -->
            <div class="flex items-center gap-3 border-t border-background-200/30 pt-3">
              <form 
                method="POST" 
                action="?/approveAgent"
                use:enhance={() => {
                  return async ({ update }) => {
                    if (confirm('Approve this agent? They will be granted full portal listing access.')) {
                      update();
                    }
                  };
                }}
                class="flex-1"
              >
                <input type="hidden" name="agentId" value={agent.id} />
                <button type="submit" class="w-full text-center bg-green-600 hover:bg-green-700 text-white text-[9px] font-bold uppercase tracking-widest py-2 rounded-lg transition-colors">
                  Verify & Approve
                </button>
              </form>

              <form 
                method="POST" 
                action="?/rejectAgent"
                use:enhance={() => {
                  return async ({ update }) => {
                    if (confirm('Reject this agent? They will not be able to log in.')) {
                      update();
                    }
                  };
                }}
                class="flex-1"
              >
                <input type="hidden" name="agentId" value={agent.id} />
                <button type="submit" class="w-full text-center bg-red-50 hover:bg-red-100 text-red-750 text-[9px] font-bold uppercase tracking-widest py-2 rounded-lg border border-red-200 transition-colors">
                  Reject Profile
                </button>
              </form>
            </div>
          </div>
        {/each}
      </div>
    {/if}
  </div>

</div>
