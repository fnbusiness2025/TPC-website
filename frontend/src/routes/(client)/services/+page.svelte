
<script lang="ts">
  import Header from '$lib/components/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import { scrollAnimate } from '$lib/actions/scrollAnimate';
  import { services } from '$lib/data/services';
</script>

<svelte:head>
  <title>Our Services | Terrestrial Property Consulting Limited</title>
  <meta name="description" content="Expert property solutions including valuations, management, surveying, and consultancy in Malawi." />
</svelte:head>

<div class="flex flex-col min-h-screen bg-background-50">
  <Header />

  <main class="flex-grow">
    <!-- Hero Section -->
    <section class="relative py-28 md:py-36 bg-accent-950 overflow-hidden">
      <div class="absolute inset-0 opacity-25">
        <img 
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80" 
          alt="Modern Architecture" 
          class="w-full h-full object-cover"
        />
      </div>
      <div class="absolute inset-0 bg-gradient-to-r from-accent-950 via-accent-950/80 to-transparent"></div>
      
      <div class="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10">
        <div class="max-w-2xl" use:scrollAnimate={{ animation: 'fade-right' }}>
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-600/20 text-accent-300 border border-accent-500/30 text-[10px] font-bold uppercase tracking-widest mb-6">
            Our Expertise
          </div>
          <h1 class="text-4xl md:text-5xl lg:text-7xl font-bold text-background-50 mb-6 font-heading leading-tight">
            Our Core Services
          </h1>
          <p class="text-lg md:text-xl text-background-200 font-medium">
            Expert solutions for all your property and asset management needs
          </p>
        </div>
      </div>
    </section>

    <!-- Services Grid -->
    <section class="py-24 bg-background-50 px-6 md:px-10 overflow-hidden">
      <div class="max-w-[1400px] mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {#each services as service, i}
            <div 
              class="group bg-white rounded-3xl p-8 md:p-10 shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-background-200 hover:border-accent-600/30 hover:shadow-[0_20px_60px_rgba(53,102,32,0.08)] transition-all duration-500 flex flex-col h-full"
              use:scrollAnimate={{ animation: 'fade-up', delay: (i % 3) * 100 }}
            >
              <!-- Top Row: Icon & Category -->
              <div class="flex justify-between items-start mb-10">
                <div class="w-16 h-16 rounded-2xl bg-accent-600/10 flex items-center justify-center text-accent-600 group-hover:bg-accent-600 group-hover:text-background-50 transition-all duration-500 shadow-sm">
                  <i class="{service.riIcon} text-2xl"></i>
                </div>
                <span class="text-[10px] font-bold uppercase tracking-[0.2em] text-accent-600 bg-accent-600/5 px-4 py-2 rounded-full border border-accent-600/10">
                  {service.category}
                </span>
              </div>

              <!-- Content -->
              <h3 class="text-2xl font-bold text-foreground-950 mb-4 font-heading group-hover:text-accent-700 transition-colors">
                {service.title}
              </h3>
              <p class="text-foreground-600 text-sm leading-relaxed mb-10 flex-grow">
                {service.description}
              </p>

              <!-- Footer -->
              <div class="pt-8 border-t border-background-100">
                <a 
                  href="/services/{service.slug}"
                  class="inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-accent-600 hover:text-accent-700 transition-all group/link"
                >
                  Explore Details
                  <span class="w-8 h-px bg-accent-600/30 group-hover/link:w-12 group-hover/link:bg-accent-600 transition-all"></span>
                  <i class="ri-arrow-right-line text-lg transform group-hover/link:translate-x-1 transition-transform"></i>
                </a>
              </div>
            </div>
          {/each}
        </div>
      </div>
    </section>

    <!-- Call to Action -->
    <section class="py-24 bg-accent-950 relative overflow-hidden">
      <div class="max-w-[1400px] mx-auto px-6 md:px-10 text-center relative z-10" use:scrollAnimate={{ animation: 'fade-up' }}>
        <h2 class="text-3xl md:text-5xl font-bold text-background-50 mb-8 font-heading">Ready to discuss your project?</h2>
        <p class="text-background-300 max-w-xl mx-auto mb-12">
          Our team of certified professionals is ready to provide the expertise your assets deserve.
        </p>
        <div class="flex flex-wrap justify-center gap-6">
          <a href="/contact" class="bg-accent-600 hover:bg-accent-700 text-background-50 px-10 py-5 rounded-2xl font-bold text-xs uppercase tracking-[0.2em] transition-all shadow-xl shadow-accent-600/20">
            Get in Touch
          </a>
          <a href="/valuation" class="bg-transparent border-2 border-background-50/30 hover:border-background-50 text-background-50 px-10 py-5 rounded-2xl font-bold text-xs uppercase tracking-[0.2em] transition-all backdrop-blur-sm">
            Request Valuation
          </a>
        </div>
      </div>
      <!-- Abstract shapes -->
      <div class="absolute -top-24 -left-24 w-96 h-96 bg-accent-600/10 rounded-full blur-3xl"></div>
      <div class="absolute -bottom-24 -right-24 w-96 h-96 bg-accent-600/10 rounded-full blur-3xl"></div>
    </section>
  </main>

  <Footer />
</div>
