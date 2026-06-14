<script lang="ts">
  export let isScrolled = false;
</script>

<div class="flex items-center gap-3">
  <img src="/Lg4.png" alt="Terrestrial Logo" class="w-14 h-14 rounded-lg object-cover" />
  <div class="flex flex-col">
    <span class="text-sm font-bold uppercase tracking-wider leading-none transition-colors {isScrolled ? 'text-foreground-950' : 'text-background-50'}">Terrestrial</span>
    <span class="text-[10px] uppercase tracking-[0.2em] leading-none mt-1 transition-colors {isScrolled ? 'text-accent-600' : 'text-accent-400'}">Property Consulting</span>
  </div>
</div>
