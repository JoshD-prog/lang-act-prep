<script lang="ts">
  import Seo from '$lib/components/Seo.svelte';
  import PageSection from '$lib/components/PageSection.svelte';
  import { enrollmentJourneySections } from '$lib/content/site';
</script>

<Seo
  title="How It Works"
  description="Choose an ACT date, attend four classes during test week, and practice what to do when timing or a difficult question causes trouble."
/>

<section class="page-hero p-8 md:p-10">
  <p class="text-xs font-bold uppercase tracking-[0.16em] text-sky-700">How it works</p>
  <h1 class="mt-2 max-w-4xl text-4xl font-black leading-tight text-ink md:text-5xl">Choose your ACT date. Come to class Monday through Thursday. Take the test Saturday.</h1>
  <p class="mt-4 max-w-2xl text-lg text-slate-600">
    Each class lasts 90 minutes. We work through ACT questions, practice timing, and talk about what students should do
    when they get stuck or begin to fall behind.
  </p>
</section>

<div class="mt-8 grid gap-4 md:grid-cols-3">
  {#each enrollmentJourneySections as section}
    <PageSection {section} />
  {/each}
</div>

<section class="mt-8 grid overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-900/10 lg:grid-cols-[0.95fr_1.05fr]">
  <div class="p-6 md:p-8">
    <p class="text-xs font-bold uppercase tracking-[0.16em] text-sky-700">Class materials</p>
    <h2 class="mt-2 text-2xl font-black text-ink">Students leave each class with notes and practice to review.</h2>
    <p class="mt-3 text-sm leading-6 text-slate-700">
      Students receive a binder with practice questions, timing guidelines, and reminders for each section. They can use
      these materials between classes and review their notes before Saturday's test.
    </p>
    <div class="mt-5 grid gap-3 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3">
      <img
        src="/images/course/prep-binder.jpg"
        alt="KC Cram Course ACT prep binder"
        class="aspect-[4/3] w-full rounded-2xl object-cover shadow-sm"
        loading="lazy"
        decoding="async"
      />
      <img
        src="/images/course/notes-practice.jpg"
        alt="Student ACT prep notes and practice materials"
        class="aspect-[4/3] w-full rounded-2xl object-cover shadow-sm"
        loading="lazy"
        decoding="async"
      />
      <img
        src="/images/course/instructor-teaching-2026.webp"
        alt="Adam Lang teaching an ACT prep lesson"
        class="aspect-[4/3] w-full rounded-2xl object-cover object-[center_30%] shadow-sm sm:col-span-1 lg:col-span-2 xl:col-span-1"
        loading="lazy"
        decoding="async"
      />
    </div>
  </div>
  <img
    src="/images/course/students-listening.jpg"
    alt="Students listening during an ACT prep class"
    class="h-full min-h-80 w-full object-cover object-center"
    loading="lazy"
    decoding="async"
  />
</section>

<section class="ink-band mt-8 rounded-3xl border p-8">
  <h2 class="text-2xl font-black text-white">Reserve your seat for your test date</h2>
  <p class="mt-3 text-sky-50/85">
    Class size is limited so I have time to answer questions and help individual students. Choose the course that matches
    your ACT date.
  </p>
  <a href="/classes" class="mt-5 inline-flex min-h-11 items-center rounded-full bg-white px-6 py-3 text-sm font-bold text-ink transition hover:bg-slate-100">
    View upcoming classes
  </a>
</section>
