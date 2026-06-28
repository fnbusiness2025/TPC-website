<script lang="ts">
  import { enhance } from '$app/forms';
  import { fade, fly } from 'svelte/transition';

  export let form: any;

  let firstName = '';
  let lastName = '';
  let email = '';
  let phone = '';
  let password = '';
  let confirmPassword = '';

  let isLoading = false;
  let successState = false;
  let successMessage = '';
  let errorState = false;
  let errorMessage = '';

  $: if (form) {
    if (form.error) {
      errorState = true;
      errorMessage = form.message;
      successState = false;
    } else if (form.success) {
      successState = true;
      successMessage = form.message;
      errorState = false;
      
      // Clear forms
      firstName = '';
      lastName = '';
      email = '';
      phone = '';
      password = '';
      confirmPassword = '';
    }
  }
</script>

<svelte:head>
  <title>Add Administrator | Admin Portal</title>
</svelte:head>

<div class="max-w-[700px] bg-background-50 border border-background-200 rounded-3xl p-8 md:p-12 shadow-sm">
  <div class="mb-8 pb-6 border-b border-background-200">
    <h3 class="text-lg font-bold font-heading text-foreground-950">Register New Administrator</h3>
    <p class="text-xs text-foreground-500 mt-1">Provide credentials to grant administrative panel access.</p>
  </div>

  {#if successState}
    <div 
      class="bg-accent-600/10 border border-accent-600/20 text-accent-800 rounded-2xl p-6 text-center mb-6"
      in:fly={{ y: 15, duration: 450 }}
    >
      <div class="w-12 h-12 bg-accent-600 text-background-50 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
        <i class="ri-checkbox-circle-fill text-2xl"></i>
      </div>
      <h4 class="text-sm font-bold font-heading mb-1">Account Created</h4>
      <p class="text-xs leading-normal">{successMessage}</p>
      <button 
        type="button" 
        on:click={() => successState = false} 
        class="text-xs font-bold text-accent-600 hover:text-accent-700 uppercase tracking-widest mt-4 underline"
      >
        Add Another Admin
      </button>
    </div>
  {:else}
    {#if errorState}
      <div class="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 mb-6 text-xs font-semibold" in:fade>
        {errorMessage}
      </div>
    {/if}

    <form 
      method="POST" 
      action="?/createAdmin"
      use:enhance={() => {
        isLoading = true;
        errorState = false;
        successState = false;

        if (password !== confirmPassword) {
          isLoading = false;
          errorState = true;
          errorMessage = 'Passwords do not match.';
          return () => {};
        }

        return async ({ result, update }) => {
          isLoading = false;
          update();
        };
      }}
      class="flex flex-col gap-5 text-xs"
    >
      <div class="grid grid-cols-2 gap-4">
        <div class="flex flex-col gap-1.5">
          <label for="firstName" class="text-[10px] font-bold uppercase tracking-widest text-foreground-500 ml-1">First Name *</label>
          <input 
            type="text" 
            name="firstName"
            id="firstName"
            placeholder="First"
            bind:value={firstName}
            required
            class="bg-background-100 border border-background-200 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-accent-600/20 focus:border-accent-600 transition-all text-xs"
          />
        </div>

        <div class="flex flex-col gap-1.5">
          <label for="lastName" class="text-[10px] font-bold uppercase tracking-widest text-foreground-500 ml-1">Last Name *</label>
          <input 
            type="text" 
            name="lastName"
            id="lastName"
            placeholder="Last"
            bind:value={lastName}
            required
            class="bg-background-100 border border-background-200 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-accent-600/20 focus:border-accent-600 transition-all text-xs"
          />
        </div>
      </div>

      <div class="flex flex-col gap-1.5">
        <label for="email" class="text-[10px] font-bold uppercase tracking-widest text-foreground-500 ml-1">Email Address *</label>
        <input 
          type="email" 
          name="email"
          id="email"
          placeholder="admin@tpcmalawi.com"
          bind:value={email}
          required
          class="bg-background-100 border border-background-200 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-accent-600/20 focus:border-accent-600 transition-all text-xs"
        />
      </div>

      <div class="flex flex-col gap-1.5">
        <label for="phone" class="text-[10px] font-bold uppercase tracking-widest text-foreground-500 ml-1">Phone Number (Optional)</label>
        <input 
          type="tel" 
          name="phone"
          id="phone"
          placeholder="+265..."
          bind:value={phone}
          class="bg-background-100 border border-background-200 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-accent-600/20 focus:border-accent-600 transition-all text-xs"
        />
      </div>

      <div class="grid grid-cols-2 gap-4">
        <div class="flex flex-col gap-1.5">
          <label for="password" class="text-[10px] font-bold uppercase tracking-widest text-foreground-500 ml-1">Password *</label>
          <input 
            type="password" 
            name="password"
            id="password"
            placeholder="••••••••"
            bind:value={password}
            required
            class="bg-background-100 border border-background-200 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-accent-600/20 focus:border-accent-600 transition-all text-xs"
          />
        </div>

        <div class="flex flex-col gap-1.5">
          <label for="confirmPassword" class="text-[10px] font-bold uppercase tracking-widest text-foreground-500 ml-1">Confirm Password *</label>
          <input 
            type="password" 
            id="confirmPassword"
            placeholder="••••••••"
            bind:value={confirmPassword}
            required
            class="bg-background-100 border border-background-200 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-accent-600/20 focus:border-accent-600 transition-all text-xs"
          />
        </div>
      </div>

      <button 
        type="submit" 
        disabled={isLoading}
        class="bg-accent-600 hover:bg-accent-700 disabled:opacity-85 text-background-50 font-bold py-4 rounded-xl transition-all shadow-md shadow-accent-600/10 uppercase tracking-widest text-xs mt-4 flex items-center justify-center gap-2"
      >
        {#if isLoading}
          <i class="ri-loader-4-line animate-spin text-lg"></i>
          <span>Creating Administrator...</span>
        {:else}
          <i class="ri-user-add-line text-lg"></i>
          <span>Create Admin User</span>
        {/if}
      </button>
    </form>
  {/if}
</div>
