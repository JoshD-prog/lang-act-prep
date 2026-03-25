<script lang="ts">
  import PageSection from '$lib/components/PageSection.svelte';
  import { enrollmentJourneySections } from '$lib/content/site';
</script>

<svelte:head>
  <title>How It Works | KC Cram Course</title>
</svelte:head>

<section class="rounded-3xl border border-slate-200 bg-white p-8 shadow-lg shadow-slate-900/5">
  <p class="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">How it works</p>
  <h1 class="mt-2 text-4xl font-black text-ink">From enrollment to test day in three clear steps.</h1>
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

<section class="mt-8 rounded-3xl border border-slate-200 bg-white p-8">
  <h2 class="text-2xl font-black text-ink">Reserve your seat for your test date</h2>
  <p class="mt-3 text-slate-600">
    Seats are limited. Choose your ACT date and enroll in the course scheduled for the week before your exam.
  </p>
  <a href="/classes" class="mt-5 inline-flex rounded-full bg-sky px-6 py-3 text-sm font-bold text-white">
    View upcoming classes
  </a>
</section>
