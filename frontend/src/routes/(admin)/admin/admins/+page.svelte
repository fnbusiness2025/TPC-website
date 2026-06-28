<script lang="ts">
  import { enhance } from '$app/forms';
  import { fade, fly, scale } from 'svelte/transition';

  export let data: any;
  export let form: any;

  $: ({ admins, currentUserId } = data);

  let showModal = false;

  // Close modal on successful creation
  $: if (form?.success) {
    showModal = false;
  }

  function openModal() {
    showModal = true;
  }

  function closeModal() {
    showModal = false;
  }

  function handleBackdropClick(e: MouseEvent) {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      closeModal();
    }
  }
</script>

<svelte:head>
  <title>Administrators | Admin Portal</title>
</svelte:head>

<svelte:window on:keydown={handleKeydown} />

<!-- Flash messages -->
{#if form?.success}
  <div class="mb-4 px-5 py-3.5 rounded-xl bg-green-50 border border-green-200 text-green-700 text-xs font-semibold flex items-center gap-2" in:fade>
    <i class="ri-checkbox-circle-fill text-base"></i> {form.message}
  </div>
{/if}
{#if form?.error}
  <div class="mb-4 px-5 py-3.5 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs font-semibold flex items-center gap-2" in:fade>
    <i class="ri-error-warning-fill text-base"></i> {form.message}
  </div>
{/if}

<!-- Admin Table Card -->
<div class="bg-background-50 rounded-2xl border border-background-200 overflow-hidden shadow-sm">
  <div class="px-6 py-5 border-b border-background-200 flex justify-between items-center bg-background-50/50">
    <h3 class="font-bold font-heading text-foreground-950">System Administrators</h3>
    <div class="flex items-center gap-3">
      <span class="text-xs text-foreground-500 font-semibold">{admins.length} Admin{admins.length !== 1 ? 's' : ''}</span>
      <button 
        on:click={openModal}
        class="bg-primary-500 hover:bg-primary-600 text-white font-bold px-4 py-2 rounded-lg transition-all text-[10px] uppercase tracking-wider flex items-center gap-1.5 shadow-sm hover:shadow-md"
      >
        <i class="ri-user-add-line text-sm"></i> Add Admin
      </button>
    </div>
  </div>

  {#if admins.length === 0}
    <div class="p-12 text-center">
      <div class="w-14 h-14 bg-background-100 text-foreground-450 rounded-full flex items-center justify-center mx-auto mb-6">
        <i class="ri-shield-user-line text-2xl"></i>
      </div>
      <h3 class="text-base font-bold font-heading text-foreground-950 mb-2">No Administrators Found</h3>
      <p class="text-xs text-foreground-550 max-w-sm mx-auto mb-6">
        No administrator accounts exist yet. Create one using the button above.
      </p>
      <button 
        on:click={openModal}
        class="bg-primary-500 hover:bg-primary-600 text-white font-bold px-5 py-2.5 rounded-lg transition-all text-xs inline-flex items-center gap-2"
      >
        <i class="ri-user-add-line"></i> Add Your First Admin
      </button>
    </div>
  {:else}
    <div class="overflow-x-auto">
      <table class="w-full text-left">
        <thead>
          <tr class="bg-background-100/50 text-[10px] uppercase tracking-widest text-foreground-550 border-b border-background-200 font-bold">
            <th class="px-6 py-4">Name</th>
            <th class="px-6 py-4">Email</th>
            <th class="px-6 py-4">Phone</th>
            <th class="px-6 py-4">Status</th>
            <th class="px-6 py-4">Joined</th>
            <th class="px-6 py-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-background-200 text-xs">
          {#each admins as admin}
            <tr class="hover:bg-background-100/20 transition-colors" in:fade={{ duration: 150 }}>
              <!-- Name & Initials -->
              <td class="px-6 py-4">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-full bg-primary-500/10 text-primary-600 flex items-center justify-center font-bold text-sm">
                    {admin.first_name[0]}{admin.last_name[0]}
                  </div>
                  <div>
                    <div class="font-bold text-foreground-950">
                      {admin.first_name} {admin.last_name}
                      {#if admin.id === currentUserId}
                        <span class="ml-1.5 text-[9px] uppercase tracking-wider bg-primary-500/10 text-primary-600 px-2 py-0.5 rounded-full font-bold">You</span>
                      {/if}
                    </div>
                    <div class="text-[9px] text-foreground-450 uppercase font-semibold mt-0.5">ID: {admin.id.slice(0,8)}...</div>
                  </div>
                </div>
              </td>

              <!-- Email -->
              <td class="px-6 py-4">
                <span class="font-semibold text-foreground-850">{admin.email}</span>
              </td>

              <!-- Phone -->
              <td class="px-6 py-4">
                <span class="text-foreground-600">{admin.phone || '—'}</span>
              </td>

              <!-- Status -->
              <td class="px-6 py-4">
                {#if admin.status === 'active'}
                  <span class="inline-flex items-center gap-1 text-[10px] uppercase tracking-wider font-bold text-green-600 bg-green-50 border border-green-200/50 px-2.5 py-1 rounded-full">
                    <span class="w-1.5 h-1.5 rounded-full bg-green-500"></span> Active
                  </span>
                {:else}
                  <span class="inline-flex items-center gap-1 text-[10px] uppercase tracking-wider font-bold text-red-600 bg-red-50 border border-red-200/50 px-2.5 py-1 rounded-full">
                    <span class="w-1.5 h-1.5 rounded-full bg-red-500"></span> Suspended
                  </span>
                {/if}
              </td>

              <!-- Joined -->
              <td class="px-6 py-4">
                <span class="text-foreground-500">{new Date(admin.created_at).toLocaleDateString('en-ZA', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
              </td>

              <!-- Actions -->
              <td class="px-6 py-4 text-right">
                {#if admin.id === currentUserId}
                  <span class="text-[10px] text-foreground-400 italic">Current session</span>
                {:else if admin.status === 'active'}
                  <form 
                    method="POST" 
                    action="?/deactivateAdmin"
                    use:enhance={() => {
                      return async ({ update }) => {
                        if (confirm(`Are you sure you want to suspend ${admin.first_name} ${admin.last_name}?`)) {
                          update();
                        }
                      };
                    }}
                  >
                    <input type="hidden" name="adminId" value={admin.id} />
                    <button 
                      type="submit"
                      class="bg-red-50 hover:bg-red-500 hover:text-white text-red-650 font-bold px-4 py-2 rounded-lg border border-red-200/55 transition-all text-[10px] uppercase tracking-wider"
                    >
                      Suspend
                    </button>
                  </form>
                {:else}
                  <form 
                    method="POST" 
                    action="?/reactivateAdmin"
                    use:enhance
                  >
                    <input type="hidden" name="adminId" value={admin.id} />
                    <button 
                      type="submit"
                      class="bg-green-50 hover:bg-green-500 hover:text-white text-green-700 font-bold px-4 py-2 rounded-lg border border-green-200/55 transition-all text-[10px] uppercase tracking-wider"
                    >
                      Reactivate
                    </button>
                  </form>
                {/if}
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  {/if}
</div>

<!-- Add Admin Modal -->
{#if showModal}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div 
    class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    on:click={handleBackdropClick}
    transition:fade={{ duration: 200 }}
  >
    <div 
      class="bg-background-50 rounded-2xl border border-background-200 shadow-2xl w-full max-w-lg overflow-hidden"
      in:scale={{ duration: 250, start: 0.95 }}
      out:fly={{ duration: 200, y: 10 }}
    >
      <!-- Modal Header -->
      <div class="px-6 py-5 border-b border-background-200 flex justify-between items-center">
        <div>
          <h3 class="font-bold font-heading text-foreground-950 text-lg">Add Administrator</h3>
          <p class="text-xs text-foreground-500 mt-0.5">Create a new admin account with full portal access.</p>
        </div>
        <button 
          on:click={closeModal}
          class="w-8 h-8 rounded-lg bg-background-100 hover:bg-background-200 flex items-center justify-center text-foreground-500 hover:text-foreground-800 transition-all"
        >
          <i class="ri-close-line text-lg"></i>
        </button>
      </div>

      <!-- Modal Form -->
      <form method="POST" action="?/createAdmin" use:enhance class="p-6 space-y-4">
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label for="modal-firstName" class="block text-[10px] uppercase tracking-widest text-foreground-600 font-bold mb-1.5">First Name <span class="text-red-500">*</span></label>
            <input 
              id="modal-firstName"
              type="text" 
              name="firstName" 
              required
              placeholder="e.g. John"
              class="w-full px-4 py-2.5 rounded-xl border border-background-300 bg-background-50 text-foreground-900 text-sm placeholder:text-foreground-400 focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500 transition-all"
            />
          </div>
          <div>
            <label for="modal-lastName" class="block text-[10px] uppercase tracking-widest text-foreground-600 font-bold mb-1.5">Last Name <span class="text-red-500">*</span></label>
            <input 
              id="modal-lastName"
              type="text" 
              name="lastName" 
              required
              placeholder="e.g. Doe"
              class="w-full px-4 py-2.5 rounded-xl border border-background-300 bg-background-50 text-foreground-900 text-sm placeholder:text-foreground-400 focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500 transition-all"
            />
          </div>
        </div>

        <div>
          <label for="modal-email" class="block text-[10px] uppercase tracking-widest text-foreground-600 font-bold mb-1.5">Email Address <span class="text-red-500">*</span></label>
          <input 
            id="modal-email"
            type="email" 
            name="email" 
            required
            placeholder="admin@company.com"
            class="w-full px-4 py-2.5 rounded-xl border border-background-300 bg-background-50 text-foreground-900 text-sm placeholder:text-foreground-400 focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500 transition-all"
          />
        </div>

        <div>
          <label for="modal-phone" class="block text-[10px] uppercase tracking-widest text-foreground-600 font-bold mb-1.5">Phone Number</label>
          <input 
            id="modal-phone"
            type="tel" 
            name="phone" 
            placeholder="+27 12 345 6789"
            class="w-full px-4 py-2.5 rounded-xl border border-background-300 bg-background-50 text-foreground-900 text-sm placeholder:text-foreground-400 focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500 transition-all"
          />
        </div>

        <div>
          <label for="modal-password" class="block text-[10px] uppercase tracking-widest text-foreground-600 font-bold mb-1.5">Password <span class="text-red-500">*</span></label>
          <input 
            id="modal-password"
            type="password" 
            name="password" 
            required
            minlength="6"
            placeholder="Minimum 6 characters"
            class="w-full px-4 py-2.5 rounded-xl border border-background-300 bg-background-50 text-foreground-900 text-sm placeholder:text-foreground-400 focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500 transition-all"
          />
        </div>

        <!-- Modal Actions -->
        <div class="flex justify-end gap-3 pt-3 border-t border-background-200 mt-2">
          <button 
            type="button"
            on:click={closeModal}
            class="px-5 py-2.5 rounded-xl border border-background-300 text-foreground-600 font-semibold text-xs hover:bg-background-100 transition-all"
          >
            Cancel
          </button>
          <button 
            type="submit"
            class="bg-primary-500 hover:bg-primary-600 text-white font-bold px-5 py-2.5 rounded-xl transition-all text-xs flex items-center gap-2 shadow-sm hover:shadow-md"
          >
            <i class="ri-user-add-line"></i> Create Admin
          </button>
        </div>
      </form>
    </div>
  </div>
{/if}
