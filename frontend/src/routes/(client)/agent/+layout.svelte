<script>
  import Logo from '$lib/components/Logo.svelte';
  import { page } from '$app/stores';
  import { enhance } from '$app/forms';

  $: user = $page.data.user;
  $: activePath = $page.url.pathname;
</script>

<div class="flex min-h-screen bg-background-100 font-body">
  <!-- Agent Sidebar -->
  <aside class="w-64 bg-accent-900 text-background-50 flex flex-col fixed inset-y-0 shadow-xl z-30">
    <div class="p-6 border-b border-background-400/10">
      <div class="brightness-0 invert opacity-90 scale-90 origin-left">
        <Logo />
      </div>
      <div class="mt-2 text-[10px] uppercase tracking-[0.2em] text-primary-400 font-bold">Agent Portal</div>
    </div>
    
    <nav class="flex-grow p-4 space-y-2 mt-4">
      <a 
        href="/agent" 
        class="flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all
        {activePath === '/agent' ? 'bg-primary-500 text-background-50' : 'hover:bg-background-400/10 text-background-200'}"
      >
        <i class="ri-dashboard-line"></i> Overview & Leads
      </a>
      
      <a 
        href="/agent/new" 
        class="flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all
        {activePath === '/agent/new' ? 'bg-primary-500 text-background-50' : 'hover:bg-background-400/10 text-background-200'}"
      >
        <i class="ri-add-line"></i> Add Listing
      </a>

      <div class="pt-4 border-t border-background-400/10 mt-4"></div>

      <a 
        href="/" 
        class="flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-background-300 hover:text-background-50 hover:bg-background-400/10 transition-all"
      >
        <i class="ri-home-line"></i> Visit Homepage
      </a>
    </nav>

    <div class="p-4 border-t border-background-400/10">
      <form method="POST" action="/login?/logout" use:enhance class="w-full">
        <button type="submit" class="flex items-center gap-3 px-4 py-3 w-full rounded-xl hover:bg-red-500/10 text-red-400 transition-all text-left font-medium">
          <i class="ri-logout-box-r-line"></i> Sign Out
        </button>
      </form>
    </div>
  </aside>

  <!-- Main Content panel -->
  <main class="flex-grow ml-64 p-8 md:p-12">
    <!-- Top toolbar header -->
    <header class="flex justify-between items-center mb-10 pb-6 border-b border-background-200">
      <div>
        <h1 class="text-2xl font-bold font-heading text-foreground-950">
          {#if activePath === '/agent'}
            Agent Overview
          {:else if activePath === '/agent/new'}
            Create Property Listing
          {:else}
            Agent Portal
          {/if}
        </h1>
        <p class="text-sm text-foreground-500">Welcome back, {user ? `${user.first_name} ${user.last_name}` : 'Agent'}</p>
      </div>

      <div class="flex items-center gap-4">
        {#if user}
          <div class="w-10 h-10 rounded-full bg-primary-500 flex items-center justify-center text-background-50 font-bold uppercase" title={`${user.first_name} ${user.last_name}`}>
            {user.first_name[0]}{user.last_name[0]}
          </div>
        {/if}
      </div>
    </header>

    <!-- Pages slot -->
    <slot />
  </main>
</div>
