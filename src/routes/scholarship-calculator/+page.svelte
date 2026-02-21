<script lang="ts">
  import ScholarshipCalculator from '$lib/components/ScholarshipCalculator.svelte';
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();
</script>

<svelte:head>
  <title>Scholarship Calculator | ACT Prep Classes</title>
</svelte:head>

<section class="rounded-3xl border border-slate-200 bg-white p-8 shadow-lg shadow-slate-900/5">
  <p class="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">Scholarship calculator</p>
  <h1 class="mt-2 text-4xl font-black text-ink">Estimate likely offers and next target tiers.</h1>
  <p class="mt-4 max-w-3xl text-lg text-slate-600">
    Enter student GPA and ACT score to estimate current scholarship levels and the next 1-2 tiers for each school.
  </p>
</section>

<form class="mt-8 grid gap-4 rounded-3xl border border-slate-200 bg-white p-6 md:grid-cols-3" method="GET" action="/scholarship-calculator">
  <label class="block">
    <span class="text-sm font-semibold text-slate-700">GPA</span>
    <input
      name="gpa"
      type="number"
      min="0"
      max="4"
      step="0.01"
      value={data.gpa || ''}
      class="mt-1 w-full rounded-xl border-slate-300"
      required
    />
  </label>
  <label class="block">
    <span class="text-sm font-semibold text-slate-700">ACT score</span>
    <input
      name="act"
      type="number"
      min="1"
      max="36"
      value={data.act || ''}
      class="mt-1 w-full rounded-xl border-slate-300"
      required
    />
  </label>
  <div class="flex items-end">
    <button class="w-full rounded-full bg-sky px-5 py-3 text-sm font-bold text-white">Calculate</button>
  </div>
</form>

<div class="mt-8">
  <ScholarshipCalculator projections={data.projections} gpa={data.gpa} act={data.act} />
</div>
