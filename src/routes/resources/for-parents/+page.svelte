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
    Begin with a timed practice test and a list of colleges your student is considering. Those two pieces of information
    will help you choose a score goal and decide how your student should spend the weeks before the test.
  </p>
</section>

<section class="mt-8 grid gap-4 md:grid-cols-3">
  <article class="warm-card rounded-3xl border p-6">
    <p class="text-xs font-bold uppercase tracking-[0.16em] text-amber-700">60-90 days out</p>
    <h2 class="mt-2 text-xl font-black text-ink">Choose a test date and take a practice test.</h2>
    <p class="mt-3 text-sm leading-6 text-slate-700">Use the score to identify the sections and question types that need the most work.</p>
  </article>

  <article class="color-card rounded-3xl border p-6">
    <p class="text-xs font-bold uppercase tracking-[0.16em] text-sky-700">45 days out</p>
    <h2 class="mt-2 text-xl font-black text-ink">Practice under timed conditions.</h2>
    <p class="mt-3 text-sm leading-6 text-slate-700">Take a full practice test when possible. Review every missed question before taking another one.</p>
  </article>

  <article class="rounded-3xl border border-teal-200 bg-white p-6 shadow-lg shadow-teal-900/10">
    <p class="text-xs font-bold uppercase tracking-[0.16em] text-teal-700">15 days out</p>
    <h2 class="mt-2 text-xl font-black text-ink">Review recurring mistakes.</h2>
    <p class="mt-3 text-sm leading-6 text-slate-700">Look for questions the student misreads, spends too long on, or answers incorrectly for the same reason more than once.</p>
  </article>
</section>

<section class="ink-band mt-8 rounded-3xl border p-6 md:p-8">
  <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
    <div class="max-w-2xl">
      <p class="text-xs font-bold uppercase tracking-[0.16em] text-sky-200">Scholarship planning</p>
      <h2 class="mt-2 text-2xl font-black text-white">Check whether the next ACT point changes a scholarship tier.</h2>
    </div>
    <a href="/scholarship-calculator" class="inline-flex min-h-11 w-full items-center justify-center rounded-full bg-white px-5 py-2 text-sm font-bold text-ink transition hover:bg-slate-100 sm:w-auto">Open scholarship calculator</a>
  </div>
</section>
