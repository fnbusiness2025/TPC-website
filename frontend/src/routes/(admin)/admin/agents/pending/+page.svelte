<script lang="ts">
  import { enhance } from '$app/forms';
  import { fade } from 'svelte/transition';

  export let data: any;

  $: ({ pendingAgents } = data);

  // Helper to format date
  function formatDate(isoString: string): string {
    return new Date(isoString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }
</script>

<svelte:head>
  <title>Agent Verification Queue | Admin Portal</title>
</svelte:head>

<div class="bg-background-50 rounded-2xl border border-background-200 overflow-hidden shadow-sm">
  <div class="px-6 py-5 border-b border-background-200 flex justify-between items-center bg-background-50/50">
    <h3 class="font-bold font-heading text-foreground-950">Pending Agent Verification Queue</h3>
    <span class="text-xs text-amber-700 bg-amber-50 border border-amber-200/60 px-3 py-1 rounded-xl font-bold">{pendingAgents.length} Applications</span>
  </div>

  {#if pendingAgents.length === 0}
    <div class="p-12 text-center">
      <div class="w-14 h-14 bg-background-100 text-foreground-450 rounded-full flex items-center justify-center mx-auto mb-6">
        <i class="ri-checkbox-circle-line text-2xl"></i>
      </div>
      <h3 class="text-base font-bold font-heading text-foreground-950 mb-2">Queue is Empty</h3>
      <p class="text-xs text-foreground-550 max-w-sm mx-auto">
        All agent registration applications have been processed. Great job!
      </p>
    </div>
  {:else}
    <div class="overflow-x-auto">
      <table class="w-full text-left">
        <thead>
          <tr class="bg-background-100/50 text-[10px] uppercase tracking-widest text-foreground-550 border-b border-background-200 font-bold">
            <th class="px-6 py-4">Agent Name</th>
            <th class="px-6 py-4">Proposed Agency</th>
            <th class="px-6 py-4">Contact Info</th>
            <th class="px-6 py-4">Applied Date</th>
            <th class="px-6 py-4 text-right">Verification Decisions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-background-200 text-xs">
          {#each pendingAgents as agent}
            <tr class="hover:bg-background-100/20 transition-colors" in:fade={{ duration: 150 }}>
              <!-- Name -->
              <td class="px-6 py-4">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-sm">
                    {agent.first_name[0]}{agent.last_name[0]}
                  </div>
                  <div>
                    <div class="font-bold text-foreground-950">{agent.first_name} {agent.last_name}</div>
                    <span class="text-[9px] font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-100 mt-1 inline-block">Pending Review</span>
                  </div>
                </div>
              </td>

              <!-- Agency details -->
              <td class="px-6 py-4">
                <div class="font-bold text-foreground-900">{agent.agency_name}</div>
                {#if agent.office_address}
                  <div class="text-[10px] text-foreground-450 mt-1 italic">{agent.office_address}</div>
                {/if}
              </td>

              <!-- Contact -->
              <td class="px-6 py-4">
                <div class="font-semibold text-foreground-850">{agent.email}</div>
                {#if agent.phone}
                  <div class="text-foreground-500 mt-0.5">{agent.phone}</div>
                {/if}
              </td>

              <!-- Applied Date -->
              <td class="px-6 py-4 text-foreground-500 font-medium">
                {formatDate(agent.created_at)}
              </td>

              <!-- Actions -->
              <td class="px-6 py-4 text-right">
                <div class="flex items-center justify-end gap-3">
                  <form 
                    method="POST" 
                    action="?/approveAgent"
                    use:enhance={() => {
                      return async ({ update }) => {
                        if (confirm(`Verify and approve agent ${agent.first_name} ${agent.last_name}?`)) {
                          update();
                        }
                      };
                    }}
                  >
                    <input type="hidden" name="agentId" value={agent.id} />
                    <button 
                      type="submit"
                      class="bg-green-600 hover:bg-green-700 text-white font-bold px-4 py-2.5 rounded-lg transition-colors text-[10px] uppercase tracking-wider"
                    >
                      Approve
                    </button>
                  </form>

                  <form 
                    method="POST" 
                    action="?/rejectAgent"
                    use:enhance={() => {
                      return async ({ update }) => {
                        if (confirm(`Reject agent profile for ${agent.first_name} ${agent.last_name}?`)) {
                          update();
                        }
                      };
                    }}
                  >
                    <input type="hidden" name="agentId" value={agent.id} />
                    <button 
                      type="submit"
                      class="bg-red-50 hover:bg-red-100 text-red-750 font-bold px-4 py-2.5 rounded-lg border border-red-200 transition-colors text-[10px] uppercase tracking-wider"
                    >
                      Reject
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
