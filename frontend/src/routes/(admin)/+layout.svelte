<script>
	import '../../app.css';
  import Logo from '$lib/components/Logo.svelte';
</script>

<div class="flex min-h-screen bg-background-100">
  <!-- Admin Sidebar -->
  <aside class="w-64 bg-accent-900 text-background-50 flex flex-col fixed inset-y-0 shadow-xl">
    <div class="p-6 border-b border-background-400/10">
      <div class="brightness-0 invert opacity-90 scale-90 origin-left">
        <Logo />
      </div>
      <div class="mt-2 text-[10px] uppercase tracking-[0.2em] text-primary-400 font-bold">Admin Portal</div>
    </div>
    
    <nav class="flex-grow p-4 space-y-2 mt-4">
      <a href="/admin" class="flex items-center gap-3 px-4 py-3 rounded-xl bg-primary-500 text-background-50 font-medium transition-all">
        <i class="ri-dashboard-line"></i> Dashboard
      </a>
      <a href="#" class="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-background-400/10 text-background-200 transition-all">
        <i class="ri-hotel-line"></i> Properties
      </a>
      <a href="#" class="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-background-400/10 text-background-200 transition-all">
        <i class="ri-user-settings-line"></i> Valuations
      </a>
      <a href="#" class="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-background-400/10 text-background-200 transition-all">
        <i class="ri-chat-3-line"></i> Inquiries
      </a>
    </nav>

    <div class="p-4 border-t border-background-400/10">
      <button class="flex items-center gap-3 px-4 py-3 w-full rounded-xl hover:bg-red-500/10 text-red-400 transition-all">
        <i class="ri-logout-box-r-line"></i> Sign Out
      </button>
    </div>
  </aside>

  <!-- Main Content -->
  <main class="flex-grow ml-64 p-8 md:p-12">
    <header class="flex justify-between items-center mb-10">
      <div>
        <h1 class="text-2xl font-bold font-heading text-foreground-950">Overview</h1>
        <p class="text-sm text-foreground-500">Welcome back, Admin</p>
      </div>
      <div class="flex items-center gap-4">
        <button class="w-10 h-10 rounded-full bg-background-200 flex items-center justify-center text-foreground-600 hover:bg-background-300 transition-all">
          <i class="ri-notification-3-line"></i>
        </button>
        <div class="w-10 h-10 rounded-full bg-primary-500 flex items-center justify-center text-background-50 font-bold">
          JD
        </div>
      </div>
    </header>

    <slot />
  </main>
</div>
