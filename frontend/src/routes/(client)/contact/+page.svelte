<script lang="ts">
  import Header from '$lib/components/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import Logo from '$lib/components/Logo.svelte';
  import { scrollAnimate } from '$lib/actions/scrollAnimate';

  const officeHours = [
    { day: 'Monday – Friday', status: 'Business Days', time: '8:00 AM – 5:00 PM' },
    { day: 'Saturday', status: 'Half Day', time: '8:00 AM – 12:00 PM' },
    { day: 'Sunday', status: 'Closed', time: 'Closed' }
  ];

  const contactInfo = [
    {
      icon: 'ri-map-pin-2-line',
      label: 'Office Address',
      lines: ['Behind Reunion Insurance Building', 'Maselema, P.O. Box 1883', 'Blantyre, Malawi']
    },
    {
      icon: 'ri-phone-line',
      label: 'Phone Numbers',
      lines: ['+265 884 997 346 (Office)', '+265 888 141 612', '+265 995 700 234']
    },
    {
      icon: 'ri-mail-line',
      label: 'Email Address',
      lines: ['info@tpcmalawi.com', 'tpcmalawi@gmail.com']
    },
    {
      icon: 'ri-global-line',
      label: 'Website',
      lines: ['www.tpcmalawi.com']
    }
  ];
</script>

<svelte:head>
  <title>Contact Us | Terrestrial Property Consulting Limited</title>
</svelte:head>

<div class="flex flex-col min-h-screen">
  <Header />

  <main class="flex-grow">
    <!-- Hero Section -->
    <section class="relative py-24 md:py-32 bg-accent-950 overflow-hidden">
      <div class="absolute inset-0 opacity-20">
        <img 
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80" 
          alt="Office Background" 
          class="w-full h-full object-cover"
        />
      </div>
      <div class="absolute inset-0 bg-gradient-to-r from-accent-950 via-accent-950/80 to-transparent"></div>
      
      <div class="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10">
        <div class="max-w-2xl" use:scrollAnimate={{ animation: 'fade-right' }}>
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-600/20 text-accent-300 border border-accent-500/30 text-[10px] font-bold uppercase tracking-widest mb-6">
            Get In Touch
          </div>
          <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-background-50 mb-6 leading-tight">
            Contact Us
          </h1>
          <p class="text-lg text-background-200 font-medium">
            Get in touch with Terrestrial Property Consulting Limited
          </p>
        </div>
      </div>
    </section>

    <!-- Content Section -->
    <section class="py-24 bg-background-50 px-6 md:px-10 overflow-hidden">
      <div class="max-w-[1400px] mx-auto">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          <!-- Left Column: Info -->
          <div class="lg:col-span-5 flex flex-col gap-12" use:scrollAnimate={{ animation: 'fade-right' }}>
            <div>
              <div class="mb-8">
                <Logo isScrolled={true} />
              </div>
              <h2 class="text-2xl font-bold text-foreground-950 mb-4">Terrestrial Property Consulting Limited</h2>
              <p class="text-foreground-600 italic">Your trusted property consulting partner in Malawi</p>
            </div>

            <!-- Contact Cards Grid -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {#each contactInfo as info, i}
                <div class="flex flex-col gap-4" use:scrollAnimate={{ animation: 'fade-up', delay: i * 50 }}>
                  <div class="w-10 h-10 rounded-xl bg-accent-600/10 flex items-center justify-center text-accent-600">
                    <i class="{info.icon} text-xl"></i>
                  </div>
                  <div>
                    <h3 class="text-xs font-bold uppercase tracking-widest text-foreground-400 mb-2">{info.label}</h3>
                    {#each info.lines as line}
                      <p class="text-sm text-foreground-800 font-medium">{line}</p>
                    {/each}
                  </div>
                </div>
              {/each}
            </div>

            <!-- Office Hours Card -->
            <div class="bg-background-100 rounded-2xl p-8 border border-background-200" use:scrollAnimate={{ animation: 'fade-up', delay: 200 }}>
              <div class="flex items-center gap-3 mb-8">
                <span class="text-2xl">🕐</span>
                <div>
                  <h3 class="text-lg font-bold text-foreground-950">Office Hours</h3>
                  <p class="text-xs text-foreground-500 uppercase tracking-wider font-semibold">We're here to serve you</p>
                </div>
              </div>

              <div class="flex flex-col gap-6">
                {#each officeHours as item}
                  <div class="flex justify-between items-center group">
                    <div>
                      <div class="text-sm font-bold text-foreground-900 group-hover:text-accent-600 transition-colors">{item.day}</div>
                      <div class="text-[10px] text-foreground-500 uppercase tracking-widest mt-0.5">{item.status}</div>
                    </div>
                    <div class="text-sm font-semibold text-foreground-700 bg-background-50 px-4 py-1.5 rounded-lg border border-background-200 shadow-sm">
                      {item.time}
                    </div>
                  </div>
                {/each}
              </div>
            </div>
          </div>

          <!-- Right Column: Form -->
          <div class="lg:col-span-7" use:scrollAnimate={{ animation: 'fade-left' }}>
            <div class="bg-white rounded-3xl p-8 md:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.05)] border border-background-200">
              <div class="mb-10">
                <h2 class="text-3xl font-bold font-heading text-foreground-950 mb-4">Send Us a Message</h2>
                <p class="text-foreground-600 text-sm">Have a question or interested in our services? Fill out the form below and our team will get back to you shortly.</p>
              </div>

              <form class="flex flex-col gap-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div class="flex flex-col gap-2">
                    <label for="name" class="text-[10px] font-bold uppercase tracking-widest text-foreground-500 ml-1">Full Name</label>
                    <input 
                      type="text" 
                      id="name"
                      placeholder="Enter your name"
                      class="bg-background-50 border border-background-200 rounded-xl px-5 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-accent-600/20 focus:border-accent-600 transition-all"
                    />
                  </div>
                  <div class="flex flex-col gap-2">
                    <label for="email" class="text-[10px] font-bold uppercase tracking-widest text-foreground-500 ml-1">Email Address</label>
                    <input 
                      type="email" 
                      id="email"
                      placeholder="your@email.com"
                      class="bg-background-50 border border-background-200 rounded-xl px-5 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-accent-600/20 focus:border-accent-600 transition-all"
                    />
                  </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div class="flex flex-col gap-2">
                    <label for="phone" class="text-[10px] font-bold uppercase tracking-widest text-foreground-500 ml-1">Phone Number</label>
                    <input 
                      type="tel" 
                      id="phone"
                      placeholder="+265..."
                      class="bg-background-50 border border-background-200 rounded-xl px-5 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-accent-600/20 focus:border-accent-600 transition-all"
                    />
                  </div>
                  <div class="flex flex-col gap-2">
                    <label for="subject" class="text-[10px] font-bold uppercase tracking-widest text-foreground-500 ml-1">Subject</label>
                    <select 
                      id="subject"
                      class="bg-background-50 border border-background-200 rounded-xl px-5 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-accent-600/20 focus:border-accent-600 transition-all appearance-none"
                    >
                      <option>Property Inquiry</option>
                      <option>Valuation Request</option>
                      <option>Property Management</option>
                      <option>Investment Consulting</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>

                <div class="flex flex-col gap-2">
                  <label for="message" class="text-[10px] font-bold uppercase tracking-widest text-foreground-500 ml-1">Your Message</label>
                  <textarea 
                    id="message" 
                    rows="6"
                    placeholder="How can we help you?"
                    class="bg-background-50 border border-background-200 rounded-xl px-5 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-accent-600/20 focus:border-accent-600 transition-all resize-none"
                  ></textarea>
                </div>

                <button class="bg-accent-600 hover:bg-accent-700 text-background-50 font-bold py-5 rounded-xl transition-all shadow-lg shadow-accent-600/20 uppercase tracking-[0.2em] text-xs mt-4">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>

  <Footer />
</div>
