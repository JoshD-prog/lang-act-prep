<script lang="ts">
  import Seo from '$lib/components/Seo.svelte';
  import SchoolGrid from '$lib/components/SchoolGrid.svelte';
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();
</script>

<Seo
  title="School-Specific ACT Prep Pages"
  description="Find your Kansas City-area school page and see ACT cram course options for local families."
/>

<section class="rounded-3xl border border-slate-200 bg-white p-8 shadow-lg shadow-slate-900/5">
  <p class="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">Kansas City school pages</p>
  <h1 class="mt-2 text-4xl font-black text-ink">Choose your school to see ACT prep options for your family.</h1>
  <p class="mt-4 max-w-3xl text-lg text-slate-600">
    Find the page for your student's school, then see upcoming ACT cram course options, pricing, and next steps.
  </p>
</section>

<div class="mt-8">
  <SchoolGrid schools={data.schools} />
</div>
