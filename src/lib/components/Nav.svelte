<script lang="ts">
  import { page } from '$app/stores';
  import { navItems } from '$lib/content/site';

  let mobileMenuOpen = false;
</script>

<header class="sticky top-0 z-40 border-b border-slate-200/80 bg-white/85 backdrop-blur">
  <div class="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6">
    <a href="/" class="text-lg font-extrabold tracking-tight text-ink">ACT Prep Classes</a>
    <nav class="hidden gap-5 text-sm font-semibold text-slate-700 md:flex">
      {#each navItems as item}
        <a
          href={item.href}
          class={`transition-colors hover:text-sky ${$page.url.pathname === item.href ? 'text-sky' : ''}`}
        >
          {item.label}
        </a>
      {/each}
    </nav>
    <div class="flex items-center gap-2">
      <a
        href="/enroll"
        class="hidden rounded-full bg-sky px-4 py-2 text-sm font-bold text-white shadow-glow transition hover:bg-teal-500 md:inline-flex"
      >
        Enroll
      </a>
      <button
        type="button"
        class="inline-flex items-center justify-center rounded-xl border border-slate-300 p-2 text-slate-700 transition hover:border-sky hover:text-sky md:hidden"
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
            class={`rounded-xl px-3 py-2 text-sm font-semibold transition-colors hover:bg-slate-50 hover:text-sky ${$page.url.pathname === item.href ? 'bg-slate-50 text-sky' : 'text-slate-700'}`}
            on:click={() => {
              mobileMenuOpen = false;
            }}
          >
            {item.label}
          </a>
        {/each}
        <a
          href="/enroll"
          class="mt-2 inline-flex w-full items-center justify-center rounded-full bg-sky px-4 py-2 text-sm font-bold text-white shadow-glow transition hover:bg-teal-500"
          on:click={() => {
            mobileMenuOpen = false;
          }}
        >
          Enroll
        </a>
      </nav>
    </div>
  {/if}
</header>
