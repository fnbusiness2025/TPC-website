<script lang="ts">
  import { fade, fly, slide } from 'svelte/transition';
  import { enhance } from '$app/forms';
  import Logo from '$lib/components/Logo.svelte';

  // Form result data from load/actions
  export let form: any;

  // Toggle state between Sign In (true) and Sign Up (false)
  let isLogin = true;

  // Selected role for Sign Up
  let signUpRole = 'visitor';

  // Forgot password sub-view state
  let showForgotPassword = false;

  // Fields state
  let email = '';
  let password = '';
  let rememberMe = false;

  let firstName = '';
  let lastName = '';
  let signupEmail = '';
  let phone = '';
  let signupPassword = '';
  let confirmPassword = '';
  let agencyName = '';
  let officeAddress = '';
  let agreeTerms = false;

  let resetEmail = '';

  // UI state
  let isLoading = false;
  let successState = false;
  let successMessage = '';
  let errorState = false;
  let errorMessage = '';

  // Handle forgot password submit (mocked in backend, client-side simulation)
  function handleForgotPassword() {
    errorState = false;
    errorMessage = '';

    if (!resetEmail) {
      errorState = true;
      errorMessage = 'Please enter your email address to reset password.';
      return;
    }

    isLoading = true;
    setTimeout(() => {
      isLoading = false;
      successState = true;
      successMessage = 'Reset instructions have been sent to your email.';
      resetEmail = '';
      setTimeout(() => {
        showForgotPassword = false;
        successState = false;
      }, 2500);
    }, 1500);
  }

  function toggleView() {
    isLogin = !isLogin;
    showForgotPassword = false;
    errorState = false;
    errorMessage = '';
    successState = false;
  }
</script>

<svelte:head>
  <title>{isLogin ? 'Sign In' : 'Sign Up'} | Terrestrial Property Consulting</title>
  <meta name="description" content="Access your Terrestrial Property Consulting portal to manage valuations, property listings, and asset consultations." />
</svelte:head>

<div class="grid grid-cols-1 lg:grid-cols-12 min-h-screen bg-background-50 font-body">
  
  <!-- Left Side: Brand Panel (Desktop Only) -->
  <div class="hidden lg:flex lg:col-span-5 relative flex-col justify-between p-12 overflow-hidden bg-accent-950 text-background-50 select-none">
    
    <!-- Background image and overlay -->
    <div class="absolute inset-0 z-0">
      <img 
        src="/login_bg.png" 
        alt="Luxurious Modern Real Estate in Malawi" 
        class="w-full h-full object-cover scale-105"
      />
      <!-- Rich primary-accent oklch gradient overlay -->
      <div class="absolute inset-0 bg-gradient-to-br from-accent-950/90 via-accent-900/80 to-primary-950/90"></div>
    </div>

    <!-- Top: Logo / Header -->
    <div class="relative z-10">
      <a href="/" class="inline-block hover:opacity-95 transition-opacity">
        <Logo isScrolled={false} />
      </a>
    </div>

    <!-- Center: Marketing Content -->
    <div class="relative z-10 my-auto max-w-sm" in:fly={{ y: 20, duration: 800 }}>
      <span class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-600/30 text-accent-300 border border-accent-500/20 text-[9px] font-bold uppercase tracking-widest mb-6">
        TPC Client Portal
      </span>
      <h2 class="text-3xl md:text-4xl font-bold font-heading text-background-50 mb-6 leading-tight">
        Elevating Real Estate Standards
      </h2>
      <p class="text-background-200 leading-relaxed text-sm">
        Connect to your personalized property consulting interface. Value, list, manage, and view premium properties across Malawi.
      </p>
      
      <!-- Mini testimonials / stats -->
      <div class="mt-8 flex flex-col gap-4 border-t border-background-50/15 pt-8">
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 rounded-lg bg-accent-600/25 flex items-center justify-center text-accent-300">
            <i class="ri-shield-check-line text-lg"></i>
          </div>
          <span class="text-xs font-semibold text-background-100">SIM Licensed Surveyors</span>
        </div>
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 rounded-lg bg-accent-600/25 flex items-center justify-center text-accent-300">
            <i class="ri-funds-line text-lg"></i>
          </div>
          <span class="text-xs font-semibold text-background-100">Professional RICS Market Standards</span>
        </div>
      </div>
    </div>

    <!-- Bottom: Footer Meta -->
    <div class="relative z-10 flex justify-between text-[10px] text-background-400 font-semibold tracking-wider uppercase">
      <span>© {new Date().getFullYear()} TPC Malawi</span>
      <span>Valuation • Brokerage • Consulting</span>
    </div>

  </div>

  <!-- Right Side: Forms Panel -->
  <div class="col-span-1 lg:col-span-7 flex flex-col justify-between p-6 md:p-12 min-h-screen">
    
    <!-- Top Nav: Back to home -->
    <div class="flex items-center justify-between">
      <a 
        href="/" 
        class="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-foreground-600 hover:text-accent-600 transition-colors group"
      >
        <i class="ri-arrow-left-line text-lg transition-transform group-hover:-translate-x-1"></i>
        <span>Back to Home</span>
      </a>

      <!-- Small Brand Indicator for Mobile -->
      <div class="lg:hidden">
        <a href="/">
          <Logo isScrolled={true} />
        </a>
      </div>
    </div>

    <!-- Middle Form Container -->
    <div class="w-full max-w-md mx-auto my-auto py-10">
      
      {#if successState}
        <div 
          class="bg-accent-600/10 border border-accent-600/20 text-accent-800 rounded-2xl p-8 text-center"
          in:fly={{ y: 15, duration: 400 }}
        >
          <div class="w-16 h-16 bg-accent-600 text-background-50 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-accent-600/20">
            <i class="ri-checkbox-circle-fill text-3xl"></i>
          </div>
          <h3 class="text-xl font-bold font-heading mb-2">Success</h3>
          <p class="text-sm leading-relaxed">{successMessage}</p>
        </div>
      {:else}

        <!-- Mode Heading -->
        <div class="mb-8 text-center lg:text-left">
          {#if showForgotPassword}
            <h1 class="text-3xl font-bold font-heading text-foreground-950 mb-2">Reset Password</h1>
            <p class="text-sm text-foreground-500">Enter your email and we'll send you recovery link.</p>
          {:else if isLogin}
            <h1 class="text-3xl font-bold font-heading text-foreground-950 mb-2">Welcome Back</h1>
            <p class="text-sm text-foreground-500">Log in to manage your real estate queries.</p>
          {:else}
            <h1 class="text-3xl font-bold font-heading text-foreground-950 mb-2">Create Account</h1>
            <p class="text-sm text-foreground-500">Sign up to unlock professional property consulting.</p>
          {/if}
        </div>

        <!-- Tab switcher (only when not in Forgot Password view) -->
        {#if !showForgotPassword}
          <div class="flex border border-background-200 bg-background-100 p-1 rounded-2xl mb-8">
            <button 
              type="button"
              class="flex-1 py-3 text-center text-xs font-bold uppercase tracking-widest rounded-xl transition-all
              {isLogin ? 'bg-background-50 shadow-sm border border-background-200/50 text-accent-700' : 'text-foreground-500 hover:text-foreground-800'}"
              on:click={() => { isLogin = true; errorState = false; }}
            >
              Sign In
            </button>
            <button 
              type="button"
              class="flex-1 py-3 text-center text-xs font-bold uppercase tracking-widest rounded-xl transition-all
              {!isLogin ? 'bg-background-50 shadow-sm border border-background-200/50 text-accent-700' : 'text-foreground-500 hover:text-foreground-800'}"
              on:click={() => { isLogin = false; errorState = false; }}
            >
              Sign Up
            </button>
          </div>
        {/if}

        <!-- Alerts -->
        {#if errorState}
          <div 
            class="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 mb-6 flex items-start gap-3"
            in:fade={{ duration: 250 }}
          >
            <i class="ri-error-warning-line text-lg text-red-500 mt-0.5"></i>
            <span class="text-xs font-medium">{errorMessage}</span>
          </div>
        {/if}

        <!-- Interactive Forms -->
        {#if showForgotPassword}
          <form on:submit|preventDefault={handleForgotPassword} class="flex flex-col gap-5">
            <div class="flex flex-col gap-2">
              <label for="resetEmail" class="text-[10px] font-bold uppercase tracking-widest text-foreground-500 ml-1">Email Address</label>
              <input 
                type="email" 
                id="resetEmail"
                placeholder="your@email.com"
                bind:value={resetEmail}
                class="bg-background-50 border border-background-200 rounded-xl px-5 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-accent-600/20 focus:border-accent-600 transition-all"
              />
            </div>

            <button 
              type="submit"
              disabled={isLoading}
              class="bg-accent-600 hover:bg-accent-700 disabled:opacity-80 text-background-50 font-bold py-5 rounded-xl transition-all shadow-lg shadow-accent-600/20 uppercase tracking-[0.2em] text-xs mt-4 flex items-center justify-center gap-2"
            >
              {#if isLoading}
                <i class="ri-loader-4-line animate-spin text-lg"></i>
                <span>Sending...</span>
              {:else}
                <span>Send Reset Link</span>
              {/if}
            </button>

            <button 
              type="button" 
              class="text-xs font-bold text-accent-600 hover:text-accent-700 text-center uppercase tracking-widest mt-2"
              on:click={() => { showForgotPassword = false; errorState = false; }}
            >
              Back to Sign In
            </button>
          </form>
        {:else if isLogin}
          <!-- Sign In View -->
          <form 
            method="POST"
            action="?/login"
            use:enhance={() => {
              isLoading = true;
              errorState = false;
              successState = false;
              return async ({ result, update }) => {
                isLoading = false;
                if (result.type === 'redirect') {
                  update();
                } else if (result.type === 'failure') {
                  errorState = true;
                  errorMessage = result.data?.message || 'Invalid email or password.';
                } else if (result.type === 'success') {
                  successState = true;
                  successMessage = result.data?.message || 'Welcome back!';
                  setTimeout(() => {
                    window.location.href = email === 'admin@tpc.com' ? '/admin' : '/';
                  }, 1200);
                }
              };
            }}
            class="flex flex-col gap-5" 
            in:fade={{ duration: 200 }}
          >
            <div class="flex flex-col gap-2">
              <label for="signInEmail" class="text-[10px] font-bold uppercase tracking-widest text-foreground-500 ml-1">Email Address</label>
              <input 
                type="email" 
                name="email"
                id="signInEmail"
                placeholder="your@email.com"
                bind:value={email}
                required
                class="bg-background-50 border border-background-200 rounded-xl px-5 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-accent-600/20 focus:border-accent-600 transition-all"
              />
            </div>

            <div class="flex flex-col gap-2">
              <div class="flex justify-between items-center px-1">
                <label for="signInPassword" class="text-[10px] font-bold uppercase tracking-widest text-foreground-500">Password</label>
                <button 
                  type="button" 
                  class="text-[10px] font-bold text-accent-600 hover:underline uppercase tracking-widest"
                  on:click={() => { showForgotPassword = true; errorState = false; }}
                >
                  Forgot Password?
                </button>
              </div>
              <input 
                type="password" 
                name="password"
                id="signInPassword"
                placeholder="••••••••"
                bind:value={password}
                required
                class="bg-background-50 border border-background-200 rounded-xl px-5 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-accent-600/20 focus:border-accent-600 transition-all"
              />
            </div>

            <!-- Remember me checkbox -->
            <div class="flex items-center justify-between px-1">
              <label class="flex items-center gap-2 cursor-pointer select-none">
                <input 
                  type="checkbox" 
                  name="rememberMe"
                  bind:checked={rememberMe}
                  class="w-4 h-4 rounded text-accent-600 focus:ring-accent-600 border-background-300"
                />
                <span class="text-xs text-foreground-600 font-medium">Remember me</span>
              </label>
            </div>

            <!-- Submit Button -->
            <button 
              type="submit"
              disabled={isLoading}
              class="bg-accent-600 hover:bg-accent-700 disabled:opacity-80 text-background-50 font-bold py-5 rounded-xl transition-all shadow-lg shadow-accent-600/20 uppercase tracking-[0.2em] text-xs mt-4 flex items-center justify-center gap-2"
            >
              {#if isLoading}
                <i class="ri-loader-4-line animate-spin text-lg"></i>
                <span>Signing In...</span>
              {:else}
                <span>Sign In</span>
              {/if}
            </button>

            <!-- Social Logins Divider -->
            <div class="relative my-6 text-center">
              <hr class="border-background-200" />
              <span class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-background-50 px-4 text-[10px] font-bold uppercase tracking-wider text-foreground-400">
                Or Continue With
              </span>
            </div>

            <!-- Social Logins Row -->
            <div class="grid grid-cols-2 gap-4">
              <button 
                type="button" 
                class="flex items-center justify-center gap-3 border border-background-200 bg-background-50 hover:bg-background-100 transition-colors py-3.5 rounded-xl text-sm font-semibold text-foreground-800"
              >
                <i class="ri-google-fill text-lg text-[#DB4437]"></i>
                <span>Google</span>
              </button>
              <button 
                type="button" 
                class="flex items-center justify-center gap-3 border border-background-200 bg-background-50 hover:bg-background-100 transition-colors py-3.5 rounded-xl text-sm font-semibold text-foreground-800"
              >
                <i class="ri-apple-fill text-lg text-[#000000]"></i>
                <span>Apple</span>
              </button>
            </div>
          </form>
        {:else}
          <!-- Sign Up View -->
          <form 
            method="POST"
            action="?/register"
            use:enhance={() => {
              isLoading = true;
              errorState = false;
              successState = false;
              
              if (signupPassword !== confirmPassword) {
                isLoading = false;
                errorState = true;
                errorMessage = 'Passwords do not match.';
                return () => {};
              }

              return async ({ result }) => {
                isLoading = false;
                if (result.type === 'failure') {
                  errorState = true;
                  errorMessage = result.data?.message || 'An error occurred.';
                } else if (result.type === 'success') {
                  successState = true;
                  successMessage = result.data?.message || 'Account created successfully!';
                  firstName = '';
                  lastName = '';
                  signupEmail = '';
                  phone = '';
                  signupPassword = '';
                  confirmPassword = '';
                  agencyName = '';
                  officeAddress = '';
                  agreeTerms = false;
                  
                  setTimeout(() => {
                    isLogin = true;
                    successState = false;
                  }, 4000);
                }
              };
            }}
            class="flex flex-col gap-4" 
            in:fade={{ duration: 200 }}
          >
            <!-- Account Role Selection -->
            <div class="flex flex-col gap-2">
              <label class="text-[10px] font-bold uppercase tracking-widest text-foreground-500 ml-1">Register As</label>
              <div class="grid grid-cols-2 gap-3">
                <label 
                  class="flex items-center justify-center gap-2 border rounded-xl py-3 cursor-pointer transition-all text-xs font-bold uppercase tracking-wider
                  {signUpRole === 'visitor' ? 'border-accent-600 bg-accent-600/5 text-accent-700' : 'border-background-200 text-foreground-500 hover:text-foreground-800'}"
                >
                  <input 
                    type="radio" 
                    name="role" 
                    value="visitor" 
                    bind:group={signUpRole} 
                    class="sr-only" 
                  />
                  <i class="ri-user-line text-sm"></i>
                  Visitor
                </label>
                <label 
                  class="flex items-center justify-center gap-2 border rounded-xl py-3 cursor-pointer transition-all text-xs font-bold uppercase tracking-wider
                  {signUpRole === 'agent' ? 'border-accent-600 bg-accent-600/5 text-accent-700' : 'border-background-200 text-foreground-500 hover:text-foreground-800'}"
                >
                  <input 
                    type="radio" 
                    name="role" 
                    value="agent" 
                    bind:group={signUpRole} 
                    class="sr-only" 
                  />
                  <i class="ri-hotel-line text-sm"></i>
                  Agent
                </label>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div class="flex flex-col gap-1.5">
                <label for="signUpFirstName" class="text-[10px] font-bold uppercase tracking-widest text-foreground-500 ml-1">First Name</label>
                <input 
                  type="text" 
                  name="firstName"
                  id="signUpFirstName"
                  placeholder="First"
                  bind:value={firstName}
                  required
                  class="bg-background-50 border border-background-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent-600/20 focus:border-accent-600 transition-all"
                />
              </div>
              <div class="flex flex-col gap-1.5">
                <label for="signUpLastName" class="text-[10px] font-bold uppercase tracking-widest text-foreground-500 ml-1">Last Name</label>
                <input 
                  type="text" 
                  name="lastName"
                  id="signUpLastName"
                  placeholder="Last"
                  bind:value={lastName}
                  required
                  class="bg-background-50 border border-background-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent-600/20 focus:border-accent-600 transition-all"
                />
              </div>
            </div>

            <div class="flex flex-col gap-1.5">
              <label for="signUpEmail" class="text-[10px] font-bold uppercase tracking-widest text-foreground-500 ml-1">Email Address</label>
              <input 
                type="email" 
                name="email"
                id="signUpEmail"
                placeholder="your@email.com"
                bind:value={signupEmail}
                required
                class="bg-background-50 border border-background-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent-600/20 focus:border-accent-600 transition-all"
              />
            </div>

            <div class="flex flex-col gap-1.5">
              <label for="signUpPhone" class="text-[10px] font-bold uppercase tracking-widest text-foreground-500 ml-1">Phone Number</label>
              <input 
                type="tel" 
                name="phone"
                id="signUpPhone"
                placeholder="+265..."
                bind:value={phone}
                class="bg-background-50 border border-background-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent-600/20 focus:border-accent-600 transition-all"
              />
            </div>

            <!-- Agent specific fields (animated via slide) -->
            {#if signUpRole === 'agent'}
              <div class="flex flex-col gap-4 border-t border-background-200 pt-4" transition:slide={{ duration: 300 }}>
                <div class="flex flex-col gap-1.5">
                  <label for="agencyName" class="text-[10px] font-bold uppercase tracking-widest text-foreground-500 ml-1">Agency Name</label>
                  <input 
                    type="text" 
                    name="agencyName"
                    id="agencyName"
                    placeholder="e.g. TPC Brokerage"
                    bind:value={agencyName}
                    required
                    class="bg-background-50 border border-background-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent-600/20 focus:border-accent-600 transition-all"
                  />
                </div>
                <div class="flex flex-col gap-1.5">
                  <label for="officeAddress" class="text-[10px] font-bold uppercase tracking-widest text-foreground-500 ml-1">Office Address</label>
                  <input 
                    type="text" 
                    name="officeAddress"
                    id="officeAddress"
                    placeholder="e.g. Blantyre, Area 3"
                    bind:value={officeAddress}
                    required
                    class="bg-background-50 border border-background-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent-600/20 focus:border-accent-600 transition-all"
                  />
                </div>
              </div>
            {/if}

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-background-200/50 pt-3">
              <div class="flex flex-col gap-1.5">
                <label for="signUpPassword" class="text-[10px] font-bold uppercase tracking-widest text-foreground-500 ml-1">Password</label>
                <input 
                  type="password" 
                  name="password"
                  id="signUpPassword"
                  placeholder="••••••••"
                  bind:value={signupPassword}
                  required
                  class="bg-background-50 border border-background-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent-600/20 focus:border-accent-600 transition-all"
                />
              </div>

              <div class="flex flex-col gap-1.5">
                <label for="confirmPassword" class="text-[10px] font-bold uppercase tracking-widest text-foreground-500 ml-1">Confirm Password</label>
                <input 
                  type="password" 
                  id="confirmPassword"
                  placeholder="••••••••"
                  bind:value={confirmPassword}
                  required
                  class="bg-background-50 border border-background-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent-600/20 focus:border-accent-600 transition-all"
                />
              </div>
            </div>

            <!-- Terms checkbox -->
            <div class="flex items-start px-1 mt-1">
              <label class="flex items-start gap-2.5 cursor-pointer select-none">
                <input 
                  type="checkbox" 
                  name="agreeTerms"
                  bind:checked={agreeTerms}
                  required
                  class="w-4 h-4 rounded text-accent-600 focus:ring-accent-600 border-background-300 mt-0.5"
                />
                <span class="text-xs text-foreground-600 leading-normal font-medium">
                  I agree to the 
                  <a href="/terms" class="text-accent-600 hover:underline">Terms of Service</a> 
                  and 
                  <a href="/privacy" class="text-accent-600 hover:underline">Privacy Policy</a>.
                </span>
              </label>
            </div>

            <!-- Submit Button -->
            <button 
              type="submit"
              disabled={isLoading}
              class="bg-accent-600 hover:bg-accent-700 disabled:opacity-80 text-background-50 font-bold py-4 rounded-xl transition-all shadow-lg shadow-accent-600/20 uppercase tracking-[0.2em] text-xs mt-3 flex items-center justify-center gap-2"
            >
              {#if isLoading}
                <i class="ri-loader-4-line animate-spin text-lg"></i>
                <span>Creating Account...</span>
              {:else}
                <span>Sign Up</span>
              {/if}
            </button>
          </form>
        {/if}

        <!-- Toggle footer links -->
        {#if !showForgotPassword}
          <div class="mt-8 text-center text-xs font-semibold text-foreground-500">
            {#if isLogin}
              <span>Don't have an account?</span>
              <button type="button" class="text-accent-600 hover:text-accent-700 ml-1 uppercase tracking-wider font-bold" on:click={toggleView}>
                Create Account
              </button>
            {:else}
              <span>Already have an account?</span>
              <button type="button" class="text-accent-600 hover:text-accent-700 ml-1 uppercase tracking-wider font-bold" on:click={toggleView}>
                Sign In
              </button>
            {/if}
          </div>
        {/if}

      {/if}

    </div>

    <!-- Bottom Meta (Mobile Only) -->
    <div class="lg:hidden text-center text-[10px] text-foreground-400 font-bold uppercase tracking-wider pt-6 border-t border-background-200">
      <span>© {new Date().getFullYear()} TPC Malawi</span>
    </div>

  </div>

</div>
