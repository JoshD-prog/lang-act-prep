<script lang="ts">
  import SchoolGrid from '$lib/components/SchoolGrid.svelte';
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();
</script>

<svelte:head>
  <title>Schools | ACT Prep Classes</title>
</svelte:head>

<section class="rounded-3xl border border-slate-200 bg-white p-8 shadow-lg shadow-slate-900/5">
  <p class="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">School-specific enrollment</p>
  <h1 class="mt-2 text-4xl font-black text-ink">Choose your school and continue through a tailored page.</h1>
  <p class="mt-4 max-w-3xl text-lg text-slate-600">
    All students enter the same core class program, but each school page can carry custom imagery and messaging.
  </p>
</section>

<div class="mt-8">
  <SchoolGrid schools={data.schools} />
</div>
