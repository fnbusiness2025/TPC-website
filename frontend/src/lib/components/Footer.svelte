<script lang="ts">
  import Logo from './Logo.svelte';

  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'Properties', href: '#' },
    { name: 'Market Insights', href: '#' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' }
  ];

  const services = [
    { name: 'Property Valuation', href: '/services' },
    { name: 'Estate Agency', href: '/services' },
    { name: 'Property Management', href: '/services' },
    { name: 'Investment Consulting', href: '/services' },
    { name: 'Market Research', href: '/services' }
  ];

  const socials = [
    { icon: 'ri-facebook-fill', href: '#' },
    { icon: 'ri-twitter-x-fill', href: '#' },
    { icon: 'ri-instagram-line', href: '#' },
    { icon: 'ri-linkedin-box-fill', href: '#' }
  ];
</script>

<footer class="bg-accent-950 text-background-50">
  <div class="max-w-[1400px] mx-auto px-6 md:px-10 py-16 md:py-24">
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
      <!-- Column 1: Logo & Info -->
      <div class="flex flex-col gap-6">
        <div class="brightness-0 invert opacity-90">
          <Logo isScrolled={false} />
        </div>
        <p class="text-sm text-background-300 leading-relaxed max-w-xs">
          Malawi's premier property consulting firm, dedicated to bringing international standards to the local real estate market with integrity and excellence.
        </p>
        <div class="flex gap-3">
          {#each socials as social}
            <a 
              href={social.href} 
              class="w-9 h-9 rounded-lg bg-background-400/15 hover:bg-accent-600 flex items-center justify-center transition-all group"
            >
              <i class="{social.icon} text-lg text-background-200 group-hover:text-background-50"></i>
            </a>
          {/each}
        </div>
      </div>

      <!-- Column 2: Quick Links -->
      <div class="flex flex-col gap-6">
        <h4 class="text-xs font-semibold tracking-[0.15em] uppercase text-background-400">Quick Links</h4>
        <nav class="flex flex-col gap-3">
          {#each quickLinks as link}
            <a href={link.href} class="text-sm text-background-200 hover:text-accent-400 transition-colors">
              {link.name}
            </a>
          {/each}
        </nav>
      </div>

      <!-- Column 3: Services -->
      <div class="flex flex-col gap-6">
        <h4 class="text-xs font-semibold tracking-[0.15em] uppercase text-background-400">Our Services</h4>
        <nav class="flex flex-col gap-3">
          {#each services as service}
            <a href={service.href} class="text-sm text-background-200 hover:text-accent-400 transition-colors">
              {service.name}
            </a>
          {/each}
        </nav>
      </div>

      <!-- Column 4: Contact -->
      <div class="flex flex-col gap-6">
        <h4 class="text-xs font-semibold tracking-[0.15em] uppercase text-background-400">Contact Us</h4>
        <div class="flex flex-col gap-4">
          <div class="flex gap-4">
            <i class="ri-map-pin-line text-accent-400 text-lg mt-0.5"></i>
            <div class="text-sm text-background-200">
              <p>Behind Reunion Insurance Building</p>
              <p>Maselema, Blantyre, Malawi</p>
            </div>
          </div>
          <div class="flex gap-4">
            <i class="ri-phone-line text-accent-400 text-lg mt-0.5"></i>
            <div class="text-sm text-background-200">
              <p>+265 884 997 346</p>
              <p>+265 888 141 612</p>
            </div>
          </div>
          <div class="flex gap-4">
            <i class="ri-mail-line text-accent-400 text-lg mt-0.5"></i>
            <div class="text-sm text-background-200">
              <p>info@tpcmalawi.com</p>
            </div>
          </div>
          <div class="flex gap-4">
            <i class="ri-time-line text-accent-400 text-lg mt-0.5"></i>
            <div class="text-sm text-background-200">
              <p>Mon - Fri: 8:00 - 17:00</p>
              <p>Sat: 8:00 - 12:00</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Bar -->
    <div class="mt-16 md:mt-24 pt-8 border-t border-background-400/20 flex flex-col md:flex-row justify-between items-center gap-6">
      <p class="text-xs text-background-400 uppercase tracking-widest">
        &copy; {new Date().getFullYear()} Terrestrial Property Consulting. All rights reserved.
      </p>
      <div class="flex gap-8">
        <a href="#" class="text-[10px] text-background-400 hover:text-accent-400 uppercase tracking-widest transition-colors">Privacy Policy</a>
        <a href="#" class="text-[10px] text-background-400 hover:text-accent-400 uppercase tracking-widest transition-colors">Terms of Service</a>
      </div>
    </div>
  </div>
</footer>
