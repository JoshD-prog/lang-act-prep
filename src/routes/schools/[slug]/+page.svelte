<script lang="ts">
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();
</script>

<svelte:head>
  <title>{data.school.name} | ACT Prep Classes</title>
</svelte:head>

<section class="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg shadow-slate-900/5">
  <img src={data.school.heroImageUrl} alt={data.school.name} class="h-64 w-full object-cover" />
  <div class="p-8">
    <p class="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">{data.school.district ?? 'School partner'}</p>
    <h1 class="mt-2 text-4xl font-black text-ink">{data.school.name} enrollment page</h1>
    <p class="mt-4 text-lg text-slate-600">{data.school.shortPitch}</p>
    <div class="mt-6 flex flex-wrap gap-3">
      <a href={`/enroll?school=${data.school.slug}`} class="rounded-full bg-sky px-6 py-3 text-sm font-bold text-white">Start enrollment</a>
      <a href="/classes" class="rounded-full border border-slate-300 px-6 py-3 text-sm font-bold text-slate-700">View class options</a>
    </div>
  </div>
</section>
