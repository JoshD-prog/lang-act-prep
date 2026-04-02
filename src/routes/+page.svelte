<script lang="ts">
  import Hero from '$lib/components/Hero.svelte';
  import PageSection from '$lib/components/PageSection.svelte';
  import { homepageSections } from '$lib/content/site';
</script>

<svelte:head>
  <title>KC Cram Course – The Week Before the Test</title>
  <meta
    name="description"
    content="Four focused 90-minute sessions designed to maximize your ACT score right before test day."
  />
</svelte:head>

<Hero
  eyebrow="ACT prep built for the week before your test"
  title="Raise your ACT score in the week before test day."
  body="Four focused sessions to sharpen pacing, strengthen strategy, and improve performance, designed for busy students who need results fast."
  primaryCtaLabel="Reserve your seat"
  primaryCtaHref="/classes"
  secondaryCtaLabel="How it works"
  secondaryCtaHref="/how-it-works"
/>

<div class="mt-10 grid gap-5 md:grid-cols-3">
  {#each homepageSections as section}
    <PageSection {section} />
  {/each}
</div>

<section class="mt-10">
  <h2 class="text-center text-2xl font-black text-ink">Real score improvements</h2>
  <p class="mt-2 text-center text-sm text-slate-600">
    Recent student gains from past ACT preparation courses taught by the instructor:
  </p>

  <div class="mt-5 flex flex-wrap justify-center gap-4">
    {#each ["22 → 31", "29 → 35", "30 → 34", "21 → 33", "27 → 32", "26 → 32", "24 → 34", "28 → 34", "25 → 30"] as score}
      <div class="rounded-full bg-slate-100 px-5 py-3 text-base font-black text-ink shadow-sm">
        {score}
      </div>
    {/each}
  </div>

  <div class="mt-6 grid gap-5 md:grid-cols-3">
    <blockquote class="rounded-2xl border border-slate-200 bg-white p-5 text-sm text-slate-700">
      “I saw a big improvement in my score and even got above my target.”
      <div class="mt-2 text-xs font-semibold text-slate-500">— Ariel S.</div>
    </blockquote>

    <blockquote class="rounded-2xl border border-slate-200 bg-white p-5 text-sm text-slate-700">
      “The strategies and pacing systems made a huge difference on test day.”
      <div class="mt-2 text-xs font-semibold text-slate-500">— Maddox H.</div>
    </blockquote>

    <blockquote class="rounded-2xl border border-slate-200 bg-white p-5 text-sm text-slate-700">
      “I walked into the ACT with a clear plan for every section.”
      <div class="mt-2 text-xs font-semibold text-slate-500">— Jack R.</div>
    </blockquote>
  </div>
</section>

<section class="mt-10 rounded-3xl border border-slate-200 bg-white p-8 shadow-lg shadow-slate-900/5">
  <div class="grid gap-6 md:grid-cols-[1.5fr,1fr] md:items-center">
    <div>
      <p class="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">Limited seats</p>
      <h2 class="mt-2 text-2xl font-black text-ink">Small class sizes. Enrollment closes as seats fill.</h2>
      <p class="mt-3 max-w-2xl text-slate-600">
        Each ACT Cram Course has limited seats so students can get focused instruction and a better classroom experience.
        Check current availability by test date and reserve your seat before your preferred class fills.
      </p>
    </div>

    <div class="flex md:justify-end">
      <a
        href="/classes"
        class="inline-flex rounded-full bg-ink px-6 py-3 text-sm font-bold text-white transition hover:bg-slate-700"
      >
        View class availability
      </a>
    </div>
  </div>
</section>