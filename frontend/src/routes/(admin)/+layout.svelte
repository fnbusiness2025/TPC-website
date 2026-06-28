<script>
  import '../../app.css';
  import Logo from '$lib/components/Logo.svelte';
  import { page } from '$app/stores';
  import { enhance } from '$app/forms';

  $: user = $page.data.user;

  $: activePath = $page.url.pathname;
</script>

<div class="flex min-h-screen bg-background-100">
  <!-- Admin Sidebar -->
  <aside class="w-64 bg-accent-900 text-background-50 flex flex-col fixed inset-y-0 shadow-xl z-30">
    <div class="p-6 border-b border-background-400/10">
      <div class="brightness-0 invert opacity-90 scale-90 origin-left">
        <Logo />
      </div>
      <div class="mt-2 text-[10px] uppercase tracking-[0.2em] text-primary-400 font-bold">Admin Portal</div>
    </div>
    
    <nav class="flex-grow p-4 space-y-2 mt-4 overflow-y-auto">
      <a 
        href="/admin" 
        class="flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all
        {activePath === '/admin' ? 'bg-primary-500 text-background-50' : 'hover:bg-background-400/10 text-background-200'}"
      >
        <i class="ri-dashboard-line"></i> Dashboard
      </a>

      <!-- Agents Section -->
      <div class="pt-4 pb-2 px-4 text-[9px] uppercase tracking-widest text-background-400 font-bold border-t border-background-400/10 mt-2">
        Agents Management
      </div>
      
      <a 
        href="/admin/agents" 
        class="flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all
        {activePath === '/admin/agents' ? 'bg-primary-500 text-background-50' : 'hover:bg-background-400/10 text-background-200'}"
      >
        <i class="ri-group-line"></i> Active Agents
      </a>
      
      <a 
        href="/admin/agents/pending" 
        class="flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all
        {activePath === '/admin/agents/pending' ? 'bg-primary-500 text-background-50' : 'hover:bg-background-400/10 text-background-200'}"
      >
        <i class="ri-user-follow-line"></i> Pending Approvals
      </a>

      <!-- Users Section -->
      <div class="pt-4 pb-2 px-4 text-[9px] uppercase tracking-widest text-background-400 font-bold border-t border-background-400/10 mt-2">
        Configuration
      </div>

      <a 
        href="/admin/admins" 
        class="flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all
        {activePath === '/admin/admins' || activePath.startsWith('/admin/admins') ? 'bg-primary-500 text-background-50' : 'hover:bg-background-400/10 text-background-200'}"
      >
        <i class="ri-shield-user-line"></i> Admins
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

  <!-- Main Content -->
  <main class="flex-grow ml-64 p-8 md:p-12">
    <header class="flex justify-between items-center mb-10">
      <div>
        <h1 class="text-2xl font-bold font-heading text-foreground-950">
          {#if activePath === '/admin'}
            Overview
          {:else if activePath === '/admin/agents'}
            Active Agents Directory
          {:else if activePath === '/admin/agents/pending'}
            Agent Verification Queue
          {:else if activePath.startsWith('/admin/admins')}
            Administrators
          {:else}
            Admin Portal
          {/if}
        </h1>
        <p class="text-sm text-foreground-500">Welcome back, {user ? `${user.first_name} ${user.last_name}` : 'Admin'}</p>
      </div>
      
      <div class="flex items-center gap-4">
        <button class="w-10 h-10 rounded-full bg-background-200 flex items-center justify-center text-foreground-600 hover:bg-background-300 transition-all">
          <i class="ri-notification-3-line"></i>
        </button>
        {#if user}
          <div class="w-10 h-10 rounded-full bg-primary-500 flex items-center justify-center text-background-50 font-bold uppercase" title={`${user.first_name} ${user.last_name}`}>
            {user.first_name[0]}{user.last_name[0]}
          </div>
        {/if}
      </div>
    </header>

    <slot />
  </main>
</div>
