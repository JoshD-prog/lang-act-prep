<script lang="ts">
  import Seo from '$lib/components/Seo.svelte';

  const officialActPracticeTestUrl =
    'https://www.act.org/content/dam/act/secured/documents/Preparing-for-the-ACT.pdf';
  const officialActFreePrepUrl =
    'https://www.act.org/content/act/en/products-and-services/the-act/test-preparation/free-act-test-prep.html';

  const timingPlan = [
    {
      label: 'Before class',
      body: 'Take an entire timed practice test for the fullest picture. If you cannot do that, test one section at a time; if needed, start with just one timed section.'
    },
    {
      label: 'During review',
      body: 'Sort misses by cause: content gap, pacing decision, reading error, or avoidable trap.'
    },
    {
      label: 'Before test day',
      body: 'Take another practice test and write a short section plan for what to do when time gets tight.'
    }
  ];
</script>

<Seo
  title="ACT Prep Resources"
  description="Download a free official ACT practice test and learn how to use it for ACT pacing, review, and score improvement."
/>

<section class="page-hero p-8 md:p-10">
  <div class="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
    <div>
      <p class="text-xs font-bold uppercase tracking-[0.16em] text-sky-700">Free ACT resource</p>
      <h1 class="mt-2 max-w-3xl text-4xl font-black leading-tight text-ink md:text-5xl">
        Download a free official ACT practice test.
      </h1>
      <p class="mt-4 max-w-3xl text-lg leading-relaxed text-slate-600">
        Start your prep with a real practice test from ACT. Use it to find your baseline, spot patterns in missed
        questions, and make your next study session much more focused.
      </p>
      <div class="mt-6 flex flex-wrap gap-3">
        <a
          href={officialActPracticeTestUrl}
          target="_blank"
          rel="noreferrer"
          class="inline-flex min-h-11 w-full items-center justify-center rounded-full bg-sky px-6 py-3 text-sm font-bold text-white shadow-xl shadow-sky-900/20 transition hover:bg-teal-500 sm:w-auto"
        >
          Get the free practice test
        </a>
        <a
          href={officialActFreePrepUrl}
          target="_blank"
          rel="noreferrer"
          class="inline-flex min-h-11 w-full items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-bold text-slate-700 transition hover:border-sky hover:text-sky sm:w-auto"
        >
          See more free ACT prep
        </a>
      </div>
    </div>

    <aside class="rounded-2xl border border-sky-200 bg-white/80 p-6 shadow-sm">
      <p class="text-xs font-bold uppercase tracking-[0.16em] text-sky-700">Inside the guide</p>
      <div class="mt-4 grid gap-3">
        <div class="rounded-2xl bg-white p-4">
          <p class="text-sm font-extrabold text-ink">Full-length ACT practice test</p>
          <p class="mt-1 text-sm text-slate-600">Practice with the same test structure students see on test day.</p>
        </div>
        <div class="rounded-2xl bg-white p-4">
          <p class="text-sm font-extrabold text-ink">Answer key and scoring</p>
          <p class="mt-1 text-sm text-slate-600">Check your work and estimate where your score currently sits.</p>
        </div>
        <div class="rounded-2xl bg-white p-4">
          <p class="text-sm font-extrabold text-ink">Test-day information</p>
          <p class="mt-1 text-sm text-slate-600">Review timing, directions, and what to expect before the real exam.</p>
        </div>
      </div>
    </aside>
  </div>
</section>

<section class="mt-8 grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
  <article class="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-900/5 md:p-8">
    <div class="flex flex-wrap items-start justify-between gap-4">
      <div>
        <p class="text-xs font-bold uppercase tracking-[0.16em] text-clay">Featured resource</p>
        <h2 class="mt-2 text-3xl font-black text-ink">Free official ACT practice test</h2>
      </div>
      <span class="rounded-full bg-amber-100 px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-amber-800">
        Free
      </span>
    </div>

    <p class="mt-4 text-base leading-relaxed text-slate-600">
      The current ACT has three required sections: English, math, and reading. Science and writing are optional add-ons.
      The practice test is most useful when you treat the required sections like a real diagnostic, then review missed
      questions by category so your prep time goes toward the biggest score gains.
    </p>

    <div class="mt-6 grid gap-3 sm:grid-cols-3">
      <div class="rounded-2xl bg-slate-50 p-4">
        <p class="text-2xl font-black text-ink">3</p>
        <p class="mt-1 text-sm font-semibold text-slate-700">Required sections</p>
      </div>
      <div class="rounded-2xl bg-slate-50 p-4">
        <p class="text-2xl font-black text-ink">2</p>
        <p class="mt-1 text-sm font-semibold text-slate-700">Optional add-ons</p>
      </div>
      <div class="rounded-2xl bg-slate-50 p-4">
        <p class="text-2xl font-black text-ink">$0</p>
        <p class="mt-1 text-sm font-semibold text-slate-700">Cost to students</p>
      </div>
    </div>

    <div class="mt-6 flex flex-wrap gap-3">
      <a
        href={officialActPracticeTestUrl}
        target="_blank"
        rel="noreferrer"
        class="inline-flex min-h-11 w-full items-center justify-center rounded-full bg-sky px-5 py-2.5 text-sm font-bold text-white shadow-glow transition hover:bg-teal-500 sm:w-auto"
      >
        Download the practice test
      </a>
      <a
        href={officialActFreePrepUrl}
        target="_blank"
        rel="noreferrer"
        class="inline-flex min-h-11 w-full items-center justify-center rounded-full border border-slate-300 px-5 py-2.5 text-sm font-bold text-slate-700 transition hover:border-slate-900 hover:text-slate-900 sm:w-auto"
      >
        More official ACT prep
      </a>
    </div>
  </article>

  <article class="rounded-3xl border border-slate-800 bg-ink p-6 text-white shadow-xl shadow-slate-950/20 md:p-8">
    <p class="text-xs font-bold uppercase tracking-[0.16em] text-sky-200">How to use it</p>
    <h2 class="mt-2 text-2xl font-black">Turn the test into a score-improvement plan.</h2>
    <div class="mt-5 space-y-3">
      {#each timingPlan as step}
        <div class="rounded-2xl bg-white/10 p-4">
          <p class="text-sm font-extrabold text-white">{step.label}</p>
          <p class="mt-1 text-sm leading-relaxed text-slate-200">{step.body}</p>
        </div>
      {/each}
    </div>
  </article>
</section>

<section class="ink-band mt-8 rounded-3xl border p-6 md:p-8">
  <div class="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
    <div>
      <p class="text-xs font-bold uppercase tracking-[0.16em] text-sky-200">Next step</p>
      <h2 class="mt-2 text-2xl font-black text-white">Want help turning practice into points?</h2>
      <p class="mt-3 max-w-2xl text-base leading-relaxed text-sky-50/85">
        The KC Cram Course helps students turn missed questions into a test-day plan for pacing, strategy, and the most
        common ACT question types.
      </p>
    </div>
    <a
      href="/classes"
      class="inline-flex min-h-11 w-full items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-bold text-ink transition hover:bg-slate-100 sm:w-auto"
    >
      View upcoming classes
    </a>
  </div>
</section>
