<script lang="ts">
  import Seo from '$lib/components/Seo.svelte';
</script>

<Seo
  title="For Parents"
  description="Use a parent-friendly ACT prep timeline with monthly priorities, scholarship planning, and guidance on what to focus on before test day."
/>

<section class="page-hero p-8 md:p-10">
  <p class="text-xs font-bold uppercase tracking-[0.16em] text-amber-700">For parents</p>
  <h1 class="mt-2 max-w-4xl text-4xl font-black leading-tight text-ink md:text-5xl">What families should focus on each month.</h1>
  <p class="mt-4 max-w-3xl text-lg leading-relaxed text-slate-600">
    Keep the ACT plan simple: pick target schools, learn which score jumps matter, and focus practice on the highest-value decisions before test day.
  </p>
</section>

<section class="mt-8 grid gap-4 md:grid-cols-3">
  <article class="warm-card rounded-3xl border p-6">
    <p class="text-xs font-bold uppercase tracking-[0.16em] text-amber-700">60-90 days out</p>
    <h2 class="mt-2 text-xl font-black text-ink">Set targets.</h2>
    <p class="mt-3 text-sm leading-6 text-slate-700">Set target schools and baseline scholarship thresholds.</p>
  </article>

  <article class="color-card rounded-3xl border p-6">
    <p class="text-xs font-bold uppercase tracking-[0.16em] text-sky-700">45 days out</p>
    <h2 class="mt-2 text-xl font-black text-ink">Practice fully.</h2>
    <p class="mt-3 text-sm leading-6 text-slate-700">Run one full timed practice each week.</p>
  </article>

  <article class="rounded-3xl border border-teal-200 bg-white p-6 shadow-lg shadow-teal-900/10">
    <p class="text-xs font-bold uppercase tracking-[0.16em] text-teal-700">15 days out</p>
    <h2 class="mt-2 text-xl font-black text-ink">Tighten decisions.</h2>
    <p class="mt-3 text-sm leading-6 text-slate-700">Focus on pacing and error categories, not new content volume.</p>
  </article>
</section>

<section class="ink-band mt-8 rounded-3xl border p-6 md:p-8">
  <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
    <div class="max-w-2xl">
      <p class="text-xs font-bold uppercase tracking-[0.16em] text-sky-200">Scholarship planning</p>
      <h2 class="mt-2 text-2xl font-black text-white">Find the next score target worth caring about.</h2>
    </div>
    <a href="/scholarship-calculator" class="inline-flex min-h-11 w-full items-center justify-center rounded-full bg-white px-5 py-2 text-sm font-bold text-ink transition hover:bg-slate-100 sm:w-auto">Open scholarship calculator</a>
  </div>
</section>
