<script lang="ts">
  import Seo from '$lib/components/Seo.svelte';
  import Hero from '$lib/components/Hero.svelte';
  import PageSection from '$lib/components/PageSection.svelte';
  import { homepageSections } from '$lib/content/site';
  import { getSiteUrl, toAbsoluteUrl } from '$lib/seo';

  const siteUrl = getSiteUrl();
  const money = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  });
  const scholarshipExamples = [
    {
      schoolName: 'Kansas State University',
      detailLabel: 'Kansas students - 3.70 GPA',
      fromAct: 22,
      toAct: 25,
      fromAwardUsd: 2500,
      toAwardUsd: 4000,
      deltaTotalUsd: 6000,
      sourceUrl: 'https://www.k-state.edu/sfa/scholarships/'
    },
    {
      schoolName: 'University of Missouri-Kansas City',
      detailLabel: 'Kansas and Missouri students',
      fromAct: 25,
      toAct: 30,
      fromAwardUsd: 3500,
      toAwardUsd: 7500,
      deltaTotalUsd: 16000,
      sourceUrl: 'https://finaid.umkc.edu/financial-aid/scholarships/first-time-college-student.html'
    },
    {
      schoolName: 'University of Missouri',
      detailLabel: 'Out-of-state students',
      fromAct: 23,
      toAct: 30,
      fromAwardUsd: 8500,
      toAwardUsd: 21500,
      deltaTotalUsd: 52000,
      sourceUrl: 'https://financialaid.missouri.edu/scholarships/freshmen-ftc/'
    }
  ];
  const structuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'KC Cram Course',
      url: siteUrl,
      description:
        'Focused ACT prep classes, scholarship planning tools, and enrollment support designed for the week before test day.'
    },
    {
      '@context': 'https://schema.org',
      '@type': 'EducationalOrganization',
      name: 'KC Cram Course',
      url: siteUrl,
      logo: toAbsoluteUrl('/branding/logo.png', siteUrl),
      image: toAbsoluteUrl('/branding/logo.jpg', siteUrl),
      description:
        'Focused ACT prep classes, scholarship planning tools, and enrollment support designed for the week before test day.',
      areaServed: 'Kansas City'
    }
  ];
</script>

<Seo
  title="ACT Prep The Week Before the Test"
  description="Four focused 90-minute ACT prep sessions designed to maximize your score right before test day."
  structuredData={structuredData}
/>

<Hero
  eyebrow="ACT prep built for the week before your test"
  title="Make the week before your ACT count."
  body="Four focused sessions to sharpen pacing, strengthen strategy, and improve performance, designed for busy students who need results fast."
  primaryCtaLabel="Reserve your seat"
  primaryCtaHref="/classes"
  secondaryCtaLabel="How it works"
  secondaryCtaHref="/how-it-works"
  imageSrc="/images/homepage-hero.jpg"
  imageAlt="Students in a classroom discussion with an instructor"
  stats={[
    { value: '4', label: 'focused sessions' },
    { value: '90 min', label: 'per class' },
    { value: '1 week', label: 'before test day' }
  ]}
/>

<div class="mt-8 grid gap-5 md:grid-cols-3">
  {#each homepageSections as section}
    <PageSection {section} />
  {/each}
</div>

<section class="relative mt-10 overflow-hidden rounded-[2rem] bg-[linear-gradient(145deg,#0f172a_0%,#172554_42%,#0f766e_100%)] px-6 py-8 text-white shadow-[0_28px_80px_-40px_rgba(15,23,42,0.7)] md:px-8 md:py-10">
  <div class="pointer-events-none absolute inset-0 overflow-hidden">
    <div class="absolute -left-10 top-12 h-40 w-40 rounded-full bg-sky-300/15 blur-3xl"></div>
    <div class="absolute right-10 top-0 h-56 w-56 rounded-full bg-amber-300/10 blur-3xl"></div>
  </div>

  <div class="relative grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
    <div>
      <p class="text-xs font-bold uppercase tracking-[0.18em] text-sky-200">Proof, not promises</p>
      <h2 class="mt-2 max-w-2xl text-3xl font-black text-white md:text-4xl">
        Students come out with a clearer plan and, often, dramatic score jumps.
      </h2>
      <p class="mt-4 max-w-2xl text-base leading-relaxed text-sky-50/90">
        These are real score increases from past students taught by the instructor. They show what can happen when
        students tighten pacing, sharpen section strategy, and practice the right skills in the final stretch.
      </p>

      <div class="mt-6 grid gap-3 sm:grid-cols-3">
        {#each ['22 -> 31', '29 -> 35', '30 -> 34', '21 -> 33', '27 -> 32', '26 -> 32', '24 -> 34', '28 -> 34', '25 -> 30'] as score}
          <div class="rounded-2xl border border-white/10 bg-white/10 px-4 py-4 text-center backdrop-blur">
            <div class="text-2xl font-black text-white">{score}</div>
            <div class="mt-1 text-xs font-semibold uppercase tracking-[0.16em] text-sky-100/80">
              real past score increase
            </div>
          </div>
        {/each}
      </div>

      <div class="mt-6 rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur">
        <p class="text-xs font-bold uppercase tracking-[0.16em] text-sky-100/80">What that can mean in dollars</p>
        <p class="mt-2 max-w-2xl text-sm leading-relaxed text-sky-50/85">
          These examples are based on published scholarship pages and can be updated manually as schools change their
          award tables. Most clean 1 to 3 point ACT jumps are worth about {money.format(4000)} to {money.format(6000)}
          over four years, while larger jumps can lead to much larger returns.
        </p>

        <div class="mt-4 grid gap-3 md:grid-cols-3">
          {#each scholarshipExamples as example}
            <article class="rounded-2xl bg-white/10 p-4">
              <p class="text-2xl font-black text-white">+{money.format(example.deltaTotalUsd)}</p>
              <p class="mt-2 text-sm font-semibold text-sky-50">
                <a href={example.sourceUrl} class="hover:underline" target="_blank" rel="noreferrer">
                  {example.schoolName}
                </a>
              </p>
              <p class="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-sky-100/80">
                {example.detailLabel}
              </p>
              <p class="mt-2 text-sm text-sky-100/80">
                ACT {example.fromAct} to {example.toAct} moves from {money.format(example.fromAwardUsd)}/year to
                {money.format(example.toAwardUsd)}/year.
              </p>
            </article>
          {/each}
        </div>

        <div class="mt-4 flex flex-wrap gap-3">
          <a
            href="/scholarship-calculator"
            class="inline-flex rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm font-bold text-white transition hover:bg-white hover:text-slate-900"
          >
            Explore scholarship examples
          </a>
          <a
            href="/classes"
            class="inline-flex rounded-full bg-white px-5 py-3 text-sm font-bold text-slate-900 transition hover:bg-slate-100"
          >
            View classes
          </a>
        </div>
      </div>
    </div>

    <div class="flex h-full flex-col justify-center gap-5 lg:min-h-[34rem]">
      <blockquote class="rounded-3xl bg-white p-6 text-base leading-relaxed text-slate-700 shadow-xl shadow-slate-950/20">
        "I saw a big improvement in my score and even got above my target."
        <div class="mt-3 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Ariel S.</div>
      </blockquote>

      <blockquote class="rounded-3xl bg-white p-6 text-base leading-relaxed text-slate-700 shadow-xl shadow-slate-950/20">
        "The strategies and pacing systems made a huge difference on test day."
        <div class="mt-3 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Maddox H.</div>
      </blockquote>

      <blockquote class="rounded-3xl bg-white p-6 text-base leading-relaxed text-slate-700 shadow-xl shadow-slate-950/20">
        "I walked into the ACT with a clear plan for every section."
        <div class="mt-3 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Jack R.</div>
      </blockquote>
    </div>
  </div>
</section>

<section class="mt-10 rounded-[2rem] border border-amber-200/80 bg-[linear-gradient(145deg,rgba(255,247,237,0.96),rgba(255,255,255,0.94))] p-8 shadow-xl shadow-amber-900/10">
  <div class="grid gap-6 md:grid-cols-[1.5fr,1fr] md:items-center">
    <div>
      <p class="text-xs font-bold uppercase tracking-[0.16em] text-amber-700">Limited seats</p>
      <h2 class="mt-2 text-2xl font-black text-ink">Small class sizes. Enrollment closes as seats fill.</h2>
      <p class="mt-3 max-w-2xl text-slate-700">
        Each ACT Cram Course has limited seats so students can get focused instruction and a better classroom experience.
        Check current availability by test date and reserve your seat before your preferred class fills.
      </p>
    </div>

    <div class="flex md:justify-end">
      <a
        href="/classes"
        class="inline-flex rounded-full bg-amber-500 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-amber-900/20 transition hover:bg-amber-600"
      >
        View class availability
      </a>
    </div>
  </div>
</section>
