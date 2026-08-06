<script lang="ts">
  import { page } from '$app/stores';
  import { preserveMarketingParams, trackEnrollCta } from '$lib/analytics';
  import { navItems } from '$lib/content/site';

  let mobileMenuOpen = false;
</script>

<header class="sticky top-0 z-40 border-b border-slate-200/80 bg-white/85 backdrop-blur">
  <div class="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6">
    <a href="/" class="inline-flex min-h-11 items-center" aria-label="KC Cram Course home">
      <img
        src="/branding/logo-nav.png"
        alt="KC Cram Course"
        class="h-14 w-14 object-contain md:h-20 md:w-20"
        width="256"
        height="256"
        decoding="async"
      />
    </a>
    <nav class="hidden items-center gap-1 rounded-full border border-slate-200 bg-slate-50/80 p-1 text-xs font-semibold text-slate-700 shadow-sm lg:text-sm xl:gap-1.5 md:flex">
      {#each navItems as item}
        <a
          href={item.href}
          class={`rounded-full px-2.5 py-2 transition hover:bg-white hover:text-sky hover:shadow-sm xl:px-3 ${$page.url.pathname === item.href ? 'bg-white text-sky shadow-sm' : ''}`}
        >
          {item.label}
        </a>
      {/each}
    </nav>
    <div class="flex items-center gap-2">
      <a
        href="/classes"
        use:preserveMarketingParams
        use:trackEnrollCta={{ cta_location: 'desktop_nav', cta_label: 'Reserve Your Seat' }}
        class="hidden min-h-11 items-center rounded-full bg-sky px-5 py-2.5 text-sm font-bold text-white shadow-glow transition hover:bg-teal-500 md:inline-flex"
      >
        Reserve Your Seat
      </a>
      <button
        type="button"
        class="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-300 text-slate-700 transition hover:border-sky hover:text-sky md:hidden"
        aria-expanded={mobileMenuOpen}
        aria-label="Toggle navigation menu"
        on:click={() => {
          mobileMenuOpen = !mobileMenuOpen;
        }}
      >
        <span class="sr-only">Menu</span>
        {#if mobileMenuOpen}
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
            />
          </svg>
        {:else}
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path
              fill-rule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm1 4a1 1 0 100 2h12a1 1 0 100-2H4z"
              clip-rule="evenodd"
            />
          </svg>
        {/if}
      </button>
    </div>
  </div>

  {#if mobileMenuOpen}
    <div class="border-t border-slate-200 bg-white md:hidden">
      <nav class="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-3">
        {#each navItems as item}
          <a
            href={item.href}
            class={`flex min-h-11 items-center rounded-xl px-3 py-2 text-sm font-semibold transition-colors hover:bg-slate-50 hover:text-sky ${$page.url.pathname === item.href ? 'bg-slate-50 text-sky' : 'text-slate-700'}`}
            on:click={() => {
              mobileMenuOpen = false;
            }}
          >
            {item.label}
          </a>
        {/each}
        <a
          href="/classes"
          use:preserveMarketingParams
          use:trackEnrollCta={{ cta_location: 'mobile_nav', cta_label: 'Reserve Your Seat' }}
          class="mt-2 inline-flex min-h-11 w-full items-center justify-center rounded-full bg-sky px-4 py-2 text-sm font-bold text-white shadow-glow transition hover:bg-teal-500"
          on:click={() => {
            mobileMenuOpen = false;
          }}
        >
          Reserve Your Seat
        </a>
      </nav>
    </div>
  {/if}
</header>
