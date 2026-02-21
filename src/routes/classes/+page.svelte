<script lang="ts">
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();

  const money = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  });
</script>

<svelte:head>
  <title>Classes | ACT Prep Classes</title>
</svelte:head>

<section class="rounded-3xl border border-slate-200 bg-white p-8 shadow-lg shadow-slate-900/5">
  <p class="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">Class offerings</p>
  <h1 class="mt-2 text-4xl font-black text-ink">Flexible tracks for different timelines.</h1>
  <p class="mt-4 max-w-3xl text-lg text-slate-600">
    Choose a format based on your calendar and target test date. Every class includes diagnostics,
    strategy modules, and score review checkpoints.
  </p>
</section>

<section class="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
  {#each data.classes as classOffering}
    <article class="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-900/5">
      {#if classOffering.featured}
        <p class="inline-flex rounded-full bg-teal-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-teal-800">Most popular</p>
      {/if}
      <h2 class="mt-3 text-2xl font-black text-ink">{classOffering.title}</h2>
      <p class="mt-1 text-sm text-slate-500">{classOffering.schedule}</p>
      <p class="mt-2 text-sm text-slate-600">Format: {classOffering.format}</p>
      <p class="mt-3 text-3xl font-black text-sky">{money.format(classOffering.priceCents / 100)}</p>
      <p class="mt-1 text-xs uppercase tracking-wide text-slate-500">{classOffering.seatsAvailable} seats remaining</p>
      <a href={`/enroll?class=${classOffering.slug}`} class="mt-5 inline-flex rounded-full bg-ink px-5 py-2 text-sm font-bold text-white transition hover:bg-slate-700">
        Enroll in this class
      </a>
    </article>
  {/each}
</section>
