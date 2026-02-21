<script lang="ts">
  import { page } from '$app/stores';
  import { navItems } from '$lib/content/site';
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
    <a
      href="/enroll"
      class="rounded-full bg-sky px-4 py-2 text-sm font-bold text-white shadow-glow transition hover:bg-teal-500"
    >
      Enroll
    </a>
  </div>
</header>
