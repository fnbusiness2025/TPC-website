<script lang="ts">
  import { enhance } from '$app/forms';
  import { fade } from 'svelte/transition';

  export let data: any;

  $: ({ agents } = data);
</script>

<svelte:head>
  <title>Active Agents Directory | Admin Portal</title>
</svelte:head>

<div class="bg-background-50 rounded-2xl border border-background-200 overflow-hidden shadow-sm">
  <div class="px-6 py-5 border-b border-background-200 flex justify-between items-center bg-background-50/50">
    <h3 class="font-bold font-heading text-foreground-950">Approved Real Estate Agents</h3>
    <span class="text-xs text-foreground-500 font-semibold">{agents.length} Verified Agents</span>
  </div>

  {#if agents.length === 0}
    <div class="p-12 text-center">
      <div class="w-14 h-14 bg-background-100 text-foreground-450 rounded-full flex items-center justify-center mx-auto mb-6">
        <i class="ri-group-line text-2xl"></i>
      </div>
      <h3 class="text-base font-bold font-heading text-foreground-950 mb-2">No Active Agents</h3>
      <p class="text-xs text-foreground-550 max-w-sm mx-auto">
        There are currently no active/approved agents registered. Approved agent applications will appear here.
      </p>
    </div>
  {:else}
    <div class="overflow-x-auto">
      <table class="w-full text-left">
        <thead>
          <tr class="bg-background-100/50 text-[10px] uppercase tracking-widest text-foreground-550 border-b border-background-200 font-bold">
            <th class="px-6 py-4">Agent Name</th>
            <th class="px-6 py-4">Agency Details</th>
            <th class="px-6 py-4">Contact Info</th>
            <th class="px-6 py-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-background-200 text-xs">
          {#each agents as agent}
            <tr class="hover:bg-background-100/20 transition-colors" in:fade={{ duration: 150 }}>
              <!-- Name & Initials -->
              <td class="px-6 py-4">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-full bg-accent-600/10 text-accent-700 flex items-center justify-center font-bold text-sm">
                    {agent.first_name[0]}{agent.last_name[0]}
                  </div>
                  <div>
                    <div class="font-bold text-foreground-950">{agent.first_name} {agent.last_name}</div>
                    <div class="text-[9px] text-foreground-450 uppercase font-semibold mt-0.5">ID: {agent.id.slice(0,8)}...</div>
                  </div>
                </div>
              </td>

              <!-- Agency & Business Registration -->
              <td class="px-6 py-4">
                <div class="font-bold text-foreground-900">{agent.agency_name}</div>
                {#if agent.business_registration}
                  <div class="text-[10px] text-foreground-500 mt-0.5">Reg: {agent.business_registration}</div>
                {/if}
                {#if agent.office_address}
                  <div class="text-[10px] text-foreground-450 mt-1 italic line-clamp-1">{agent.office_address}</div>
                {/if}
              </td>

              <!-- Email / Phone -->
              <td class="px-6 py-4">
                <div class="font-semibold text-foreground-850">{agent.email}</div>
                {#if agent.phone}
                  <div class="text-foreground-500 mt-0.5">{agent.phone}</div>
                {/if}
              </td>

              <!-- Actions -->
              <td class="px-6 py-4 text-right">
                <form 
                  method="POST" 
                  action="?/deactivateAgent"
                  use:enhance={() => {
                    return async ({ update }) => {
                      if (confirm(`Are you sure you want to suspend agent ${agent.first_name} ${agent.last_name}? Their property listings will also be suspended.`)) {
                        update();
                      }
                    };
                  }}
                >
                  <input type="hidden" name="agentId" value={agent.id} />
                  <button 
                    type="submit"
                    class="bg-red-50 hover:bg-red-500 hover:text-white text-red-650 font-bold px-4 py-2 rounded-lg border border-red-200/55 transition-all text-[10px] uppercase tracking-wider"
                  >
                    Suspend Agent
                  </button>
                </form>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  {/if}
</div>
