<script lang="ts">
  import PageSection from '$lib/components/PageSection.svelte';
  import { salesFunnelSections } from '$lib/content/site';
</script>

<svelte:head>
  <title>Sales Funnel | ACT Prep Classes</title>
</svelte:head>

<section class="rounded-3xl border border-slate-200 bg-white p-8 shadow-lg shadow-slate-900/5">
  <p class="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">Enrollment flow</p>
  <h1 class="mt-2 text-4xl font-black text-ink">Simple funnel from interest to paid enrollment.</h1>
  <p class="mt-4 max-w-2xl text-lg text-slate-600">
    The full journey is designed for clarity, speed, and fewer drop-offs.
  </p>
</section>

<div class="mt-8 grid gap-4 md:grid-cols-3">
  {#each salesFunnelSections as section}
    <PageSection {section} />
  {/each}
</div>

<section class="mt-8 rounded-3xl border border-slate-200 bg-white p-8">
  <h2 class="text-2xl font-black text-ink">Ready to begin?</h2>
  <p class="mt-3 text-slate-600">Start enrollment now and secure your preferred class while seats remain.</p>
  <a href="/enroll" class="mt-5 inline-flex rounded-full bg-sky px-6 py-3 text-sm font-bold text-white">Go to enrollment</a>
</section>
