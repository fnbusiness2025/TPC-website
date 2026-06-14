<script lang="ts">
  import Header from '$lib/components/Header.svelte';
  import Hero from '$lib/components/Hero.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import { scrollAnimate } from '$lib/actions/scrollAnimate';
  import { services } from '$lib/data/services';

  // Select top 6 services for the homepage display
  const featuredServices = services.slice(0, 6);

  const accreditations = [
    { name: 'Surveyors Institute of Malawi', icon: 'ri-medal-line' },
    { name: 'Board of Registration', icon: 'ri-government-line' },
    { name: 'RICS Standards', icon: 'ri-global-line' },
    { name: 'Licensed Practitioners', icon: 'ri-shield-check-line' }
  ];

  const valueProps = [
    {
      title: 'Expert Valuation',
      desc: 'Registered Valuation Surveyors with deep knowledge of the Malawian market.',
      icon: 'ri-funds-line'
    },
    {
      title: 'Integrity First',
      desc: 'Transparent and ethical practices in every transaction and consultation.',
      icon: 'ri-scales-3-line'
    },
    {
      title: 'Nationwide Reach',
      desc: 'Providing professional property services across all regions of Malawi.',
      icon: 'ri-map-pin-line'
    },
    {
      title: 'Innovative Solutions',
      desc: 'Modern approaches to asset management and property consulting.',
      icon: 'ri-lightbulb-flash-line'
    }
  ];
</script>

<svelte:head>
  <title>Terrestrial Property Consulting | Premium Real Estate in Malawi</title>
  <meta name="description" content="Malawi's premier property consulting firm specializing in valuation, brokerage, and management." />
</svelte:head>

<div class="flex flex-col min-h-screen">
  <Header />
  
  <main class="flex-grow">
    <Hero />

    <!-- About Introduction Section -->
    <section class="py-24 bg-background-50 px-6 md:px-10 overflow-hidden">
      <div class="max-w-[1400px] mx-auto">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div use:scrollAnimate={{ animation: 'fade-right' }}>
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-600/10 text-accent-700 border border-accent-600/20 text-[10px] font-bold uppercase tracking-widest mb-6">
              Welcome to TPC Malawi
            </div>
            <h2 class="text-3xl md:text-5xl font-bold font-heading text-foreground-950 mb-8 leading-tight">
              Malawi's Trusted Name in <span class="text-accent-600">Property Consulting</span>
            </h2>
            <div class="flex flex-col gap-6 text-foreground-600 leading-relaxed text-lg">
              <p>
                Terrestrial Property Consulting Limited (TPC Malawi) is a premier Malawian-owned firm dedicated to elevating real estate standards through professional expertise and unwavering integrity.
              </p>
              <p>
                Based in Blantyre and operating nationwide, we provide comprehensive solutions spanning property valuation, asset management, and strategic land consultancy to help our clients make informed decisions in a dynamic market.
              </p>
            </div>
            
            <div class="flex flex-wrap gap-4 mt-10">
              <a href="/about" class="bg-accent-600 hover:bg-accent-700 text-background-50 px-8 py-4 rounded-xl font-bold text-xs uppercase tracking-widest transition-all shadow-lg shadow-accent-600/20">
                Learn Our Story
              </a>
              <div class="flex items-center gap-4 px-6 border-l border-background-200">
                <div class="text-2xl font-bold text-foreground-950">10+</div>
                <div class="text-[10px] font-bold uppercase tracking-widest text-foreground-400 leading-tight">Years of<br/>Excellence</div>
              </div>
            </div>
          </div>
          
          <div class="relative" use:scrollAnimate={{ animation: 'fade-left' }}>
            <div class="absolute -inset-4 bg-accent-600/5 rounded-[2rem] -rotate-2"></div>
            <img 
              src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80" 
              alt="Professional Real Estate Services" 
              class="relative rounded-3xl w-full h-[500px] object-cover shadow-2xl"
            />
            <!-- Floating Stats Card -->
            <div class="absolute bottom-8 -left-8 bg-background-50 p-6 rounded-2xl shadow-xl border border-background-100 hidden md:block animate-bounce-slow">
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 bg-accent-600 rounded-xl flex items-center justify-center text-background-50">
                  <i class="ri-checkbox-circle-line text-2xl"></i>
                </div>
                <div>
                  <div class="text-sm font-bold text-foreground-950">500+ Properties</div>
                  <div class="text-[10px] text-foreground-400 uppercase tracking-widest">Successfully Valued</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Services Section -->
    <section class="py-24 bg-background-100 px-6 md:px-10">
      <div class="max-w-[1400px] mx-auto">
        <div class="text-center mb-16">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-600/10 text-accent-700 border border-accent-600/20 text-[10px] font-bold uppercase tracking-widest mb-6" use:scrollAnimate={{ animation: 'fade-up' }}>
            Our Expertise
          </div>
          <h2 class="text-3xl md:text-5xl font-bold font-heading text-foreground-950 mb-6" use:scrollAnimate={{ animation: 'fade-up', delay: 100 }}>Core Professional Services</h2>
          <p class="text-foreground-600 max-w-2xl mx-auto text-lg" use:scrollAnimate={{ animation: 'fade-up', delay: 200 }}>
            We provide specialized property solutions tailored to the unique requirements of the Malawian real estate and industrial sectors.
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {#each featuredServices as service, i}
            <div 
              class="group p-10 bg-background-50 rounded-3xl border border-background-200 hover:border-accent-600/20 hover:shadow-2xl hover:shadow-accent-950/5 transition-all duration-500 relative overflow-hidden"
              use:scrollAnimate={{ animation: 'fade-up', delay: 100 + (i * 50) }}
            >
              <!-- Hover Gradient -->
              <div class="absolute inset-0 bg-gradient-to-br from-accent-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              <div class="relative z-10">
                <div class="w-14 h-14 bg-background-100 rounded-2xl flex items-center justify-center text-accent-600 mb-8 group-hover:bg-accent-600 group-hover:text-background-50 transition-all duration-300 shadow-sm">
                  <i class="{service.riIcon} text-2xl"></i>
                </div>
                <h3 class="text-xl font-bold text-foreground-950 mb-4 group-hover:text-accent-700 transition-colors">{service.title}</h3>
                <p class="text-foreground-500 leading-relaxed mb-8 text-sm">
                  {service.description}
                </p>
                <a href="/services/{service.slug}" class="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-accent-600 group/link">
                  View Details 
                  <i class="ri-arrow-right-up-line transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1"></i>
                </a>
              </div>
            </div>
          {/each}
        </div>

        <div class="mt-16 text-center">
          <a href="/services" class="inline-flex items-center gap-3 text-sm font-bold text-foreground-950 hover:text-accent-600 transition-colors group">
            Explore All Services
            <div class="w-8 h-8 rounded-full border border-background-300 flex items-center justify-center group-hover:border-accent-600 group-hover:bg-accent-600 group-hover:text-background-50 transition-all">
              <i class="ri-arrow-right-line"></i>
            </div>
          </a>
        </div>
      </div>
    </section>

    <!-- Why Choose Us / Advantage Section -->
    <section class="py-24 px-6 md:px-10 bg-accent-950 text-background-50 relative overflow-hidden">
      <!-- Background Patterns -->
      <div class="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
        <div class="absolute top-0 right-0 w-1/2 h-full bg-accent-600 blur-[120px] rounded-full"></div>
      </div>

      <div class="max-w-[1400px] mx-auto relative z-10">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div class="lg:col-span-5" use:scrollAnimate={{ animation: 'fade-right' }}>
            <h2 class="text-3xl md:text-5xl font-bold font-heading mb-8 leading-tight">
              The TPC <span class="text-accent-400">Advantage</span>
            </h2>
            <p class="text-background-300 text-lg mb-12 leading-relaxed">
              Our firm is built on the foundation of professional excellence and deep local market insight, ensuring our clients receive world-class property advisory.
            </p>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {#each valueProps as prop}
                <div class="flex flex-col gap-4">
                  <div class="w-10 h-10 rounded-lg bg-accent-600/20 flex items-center justify-center text-accent-400">
                    <i class="{prop.icon} text-xl"></i>
                  </div>
                  <div>
                    <h4 class="font-bold text-background-50 mb-2">{prop.title}</h4>
                    <p class="text-xs text-background-400 leading-relaxed">{prop.desc}</p>
                  </div>
                </div>
              {/each}
            </div>
          </div>

          <div class="lg:col-span-7" use:scrollAnimate={{ animation: 'fade-left' }}>
            <div class="grid grid-cols-2 gap-4 md:gap-8">
              <div class="space-y-4 md:space-y-8">
                <div class="bg-white/5 backdrop-blur-md p-8 rounded-3xl border border-white/10 mt-12">
                  <div class="text-4xl font-bold text-accent-400 mb-2 font-heading">SIM</div>
                  <div class="text-xs font-bold uppercase tracking-widest text-background-300">Member of Surveyors Institute of Malawi</div>
                </div>
                <div class="relative rounded-3xl overflow-hidden aspect-[4/5]">
                  <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80" alt="Office Building" class="w-full h-full object-cover" />
                </div>
              </div>
              <div class="space-y-4 md:space-y-8">
                <div class="relative rounded-3xl overflow-hidden aspect-[4/5]">
                  <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80" alt="Business Meeting" class="w-full h-full object-cover" />
                </div>
                <div class="bg-accent-600 p-8 rounded-3xl shadow-xl shadow-accent-600/20">
                  <i class="ri-double-quotes-l text-4xl text-accent-300/50 mb-4 block"></i>
                  <p class="text-sm font-medium text-background-50 leading-relaxed">
                    "Our mission is to provide first-class real estate services by applying exceptional property skills."
                  </p>
                  <div class="mt-6 pt-6 border-t border-background-50/20">
                    <div class="font-bold text-xs uppercase tracking-widest">Bonface Galeta</div>
                    <div class="text-[10px] text-accent-200 mt-1">Managing Director</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Accreditations Row -->
    <section class="py-16 bg-background-50 border-b border-background-200">
      <div class="max-w-[1400px] mx-auto px-6 md:px-10">
        <div class="flex flex-wrap justify-between items-center gap-10 opacity-50 grayscale hover:grayscale-0 transition-all duration-700">
          {#each accreditations as item}
            <div class="flex items-center gap-3">
              <i class="{item.icon} text-2xl text-foreground-950"></i>
              <span class="text-xs font-bold uppercase tracking-[0.2em] text-foreground-950">{item.name}</span>
            </div>
          {/each}
        </div>
      </div>
    </section>

    <!-- Service Process Section -->
    <section class="py-24 bg-background-50 px-6 md:px-10 overflow-hidden">
      <div class="max-w-[1400px] mx-auto">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div class="relative order-2 lg:order-1" use:scrollAnimate={{ animation: 'fade-right' }}>
            <img 
              src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80" 
              alt="Professional Consultation" 
              class="rounded-[2.5rem] w-full h-[550px] object-cover shadow-2xl"
            />
            <div class="absolute -bottom-10 -right-10 w-48 h-48 bg-accent-600 rounded-full flex items-center justify-center p-8 text-center text-background-50 shadow-2xl animate-pulse-slow">
              <div class="text-xs font-bold uppercase tracking-widest">Excellence in Every Step</div>
            </div>
          </div>

          <div class="order-1 lg:order-2" use:scrollAnimate={{ animation: 'fade-left' }}>
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-600/10 text-accent-700 border border-accent-600/20 text-[10px] font-bold uppercase tracking-widest mb-6">
              How We Work
            </div>
            <h2 class="text-3xl md:text-5xl font-bold font-heading text-foreground-950 mb-8 leading-tight">
              Our Professional <span class="text-accent-600">Approach</span>
            </h2>
            
            <div class="flex flex-col gap-10">
              <div class="flex gap-6 group">
                <div class="flex-shrink-0 w-12 h-12 rounded-full border-2 border-accent-600 flex items-center justify-center font-bold text-accent-600 group-hover:bg-accent-600 group-hover:text-background-50 transition-all">01</div>
                <div>
                  <h4 class="text-xl font-bold text-foreground-950 mb-2">Detailed Consultation</h4>
                  <p class="text-foreground-500 text-sm leading-relaxed">We begin by understanding your specific property needs, whether it's a valuation for financing or asset management for growth.</p>
                </div>
              </div>
              <div class="flex gap-6 group">
                <div class="flex-shrink-0 w-12 h-12 rounded-full border-2 border-accent-600 flex items-center justify-center font-bold text-accent-600 group-hover:bg-accent-600 group-hover:text-background-50 transition-all">02</div>
                <div>
                  <h4 class="text-xl font-bold text-foreground-950 mb-2">Rigorous Assessment</h4>
                  <p class="text-foreground-500 text-sm leading-relaxed">Our registered surveyors conduct thorough physical inspections and market analysis following international RICS and local SIM standards.</p>
                </div>
              </div>
              <div class="flex gap-6 group">
                <div class="flex-shrink-0 w-12 h-12 rounded-full border-2 border-accent-600 flex items-center justify-center font-bold text-accent-600 group-hover:bg-accent-600 group-hover:text-background-50 transition-all">03</div>
                <div>
                  <h4 class="text-xl font-bold text-foreground-950 mb-2">Expert Reporting</h4>
                  <p class="text-foreground-500 text-sm leading-relaxed">We deliver comprehensive, legally sound reports and strategic advice that provide clear value and actionable insights for your property assets.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Trusted By / Clients Row -->
    <section class="py-24 bg-background-100 border-t border-background-200 px-6 md:px-10">
      <div class="max-w-[1400px] mx-auto text-center">
        <h4 class="text-xs font-bold uppercase tracking-[0.3em] text-foreground-400 mb-12">Trusted by Malawi's Leading Institutions</h4>
        <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 items-center justify-center opacity-60">
          <div class="flex flex-col items-center gap-2">
            <i class="ri-bank-line text-4xl"></i>
            <span class="text-[10px] font-bold uppercase tracking-widest">Financial Institutions</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <i class="ri-building-2-line text-4xl"></i>
            <span class="text-[10px] font-bold uppercase tracking-widest">Corporate Entities</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <i class="ri-government-line text-4xl"></i>
            <span class="text-[10px] font-bold uppercase tracking-widest">Public Sector</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <i class="ri-community-line text-4xl"></i>
            <span class="text-[10px] font-bold uppercase tracking-widest">Real Estate Developers</span>
          </div>
          <div class="flex flex-col items-center gap-2 hidden lg:flex">
            <i class="ri-scales-line text-4xl"></i>
            <span class="text-[10px] font-bold uppercase tracking-widest">Legal Practitioners</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Call to Action Section -->
    <section class="py-24 px-6 md:px-10">
      <div class="max-w-[1400px] mx-auto">
        <div class="relative rounded-[3rem] bg-accent-600 overflow-hidden py-20 px-10 md:px-20 text-center">
          <!-- Abstract Background -->
          <div class="absolute inset-0 opacity-10">
            <div class="absolute top-0 left-0 w-64 h-64 bg-background-50 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
            <div class="absolute bottom-0 right-0 w-96 h-96 bg-background-50 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
          </div>
          
          <div class="relative z-10 max-w-3xl mx-auto" use:scrollAnimate={{ animation: 'fade-up' }}>
            <h2 class="text-3xl md:text-5xl font-bold font-heading text-background-50 mb-8 leading-tight">
              Ready to Secure Your Property's Future?
            </h2>
            <p class="text-accent-50 text-lg mb-12 opacity-90">
              Whether you need a professional valuation, property management, or strategic investment advice, our team is ready to assist you.
            </p>
            <div class="flex flex-wrap justify-center gap-6">
              <a href="/contact" class="bg-background-50 text-accent-600 hover:bg-background-100 px-10 py-5 rounded-2xl font-bold text-xs uppercase tracking-[0.2em] transition-all shadow-xl">
                Get in Touch Now
              </a>
              <a href="tel:+265888141612" class="bg-transparent border-2 border-background-50/30 hover:border-background-50 text-background-50 px-10 py-5 rounded-2xl font-bold text-xs uppercase tracking-[0.2em] transition-all">
                Call Us Directly
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>

  <Footer />
</div>
