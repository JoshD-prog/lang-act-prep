<script lang="ts">
  import Seo from '$lib/components/Seo.svelte';
  import PageSection from '$lib/components/PageSection.svelte';
  import { enrollmentJourneySections } from '$lib/content/site';
</script>

<Seo
  title="How It Works"
  description="See how the KC Cram Course enrollment process works, from choosing a class date to arriving on test day with a clear plan."
/>

<section class="page-hero p-8 md:p-10">
  <p class="text-xs font-bold uppercase tracking-[0.16em] text-sky-700">How it works</p>
  <h1 class="mt-2 max-w-4xl text-4xl font-black leading-tight text-ink md:text-5xl">From enrollment to test day in three clear steps.</h1>
  <p class="mt-4 max-w-2xl text-lg text-slate-600">
    This course is designed to be simple: choose your test date, attend four focused sessions,
    and walk into the ACT with a clear plan.
  </p>
</section>

<div class="mt-8 grid gap-4 md:grid-cols-3">
  {#each enrollmentJourneySections as section}
    <PageSection {section} />
  {/each}
</div>

<section class="ink-band mt-8 rounded-3xl border p-8">
  <h2 class="text-2xl font-black text-white">Reserve your seat for your test date</h2>
  <p class="mt-3 text-sky-50/85">
    Seats are limited. Choose your ACT date and enroll in the course scheduled for the week before your exam.
  </p>
  <a href="/classes" class="mt-5 inline-flex rounded-full bg-white px-6 py-3 text-sm font-bold text-ink transition hover:bg-slate-100">
    View upcoming classes
  </a>
</section>
