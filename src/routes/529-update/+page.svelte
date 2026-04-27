<script lang="ts">
  import { preserveMarketingParams, trackEnrollCta } from '$lib/analytics';
  import Seo from '$lib/components/Seo.svelte';

  const questionsToAsk = [
    'Does your 529 plan allow expanded K-12 educational expenses such as tutoring or educational classes outside the home?',
    'What documentation is required for reimbursement or direct payment?',
    'Are there annual usage limits or state-specific rules that affect your strategy?',
    'Does your tax professional view ACT or SAT prep as qualifying under the current rules for your situation?'
  ];

  const recordSupport = [
    'Detailed payment receipt',
    'Program schedule confirmation',
    'Named student enrollment verification',
    'Course description showing structured academic instruction'
  ];
</script>

<Seo
  title="Can ACT Prep Help Lower Your College Bill?"
  description="See how ACT prep may reduce college costs through merit scholarships, how 529 funds may apply to prep, and how to estimate the ROI of a higher ACT score."
/>

<section class="rounded-3xl border border-slate-200 bg-white p-8 shadow-lg shadow-slate-900/5 md:p-10">
  <p class="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">ACT prep ROI and 529 strategy</p>
  <h1 class="mt-2 max-w-4xl text-4xl font-black leading-tight text-ink md:text-5xl">
    Can ACT prep help lower your college bill?
  </h1>
  <p class="mt-5 max-w-3xl text-base leading-7 text-slate-600 md:text-lg">
    A 529 plan can help families pay for college. A stronger ACT score may help reduce the price first through
    merit scholarships, and some families may be able to use 529 funds for prep itself.
  </p>

  <div class="mt-8 flex flex-col gap-3 sm:flex-row">
    <a
      href="/classes"
      class="inline-flex items-center justify-center rounded-full bg-ink px-6 py-3 text-sm font-bold text-white transition hover:opacity-90"
    >
      View ACT course dates
    </a>
    <a
      href="/scholarship-calculator"
      class="inline-flex items-center justify-center rounded-full border border-slate-300 px-6 py-3 text-sm font-bold text-ink transition hover:bg-slate-50"
    >
      Estimate scholarship upside
    </a>
  </div>
</section>

<section class="mt-10 grid gap-6 lg:grid-cols-[1.5fr_0.9fr]">
  <article class="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm shadow-slate-900/5">
    <h2 class="text-2xl font-extrabold text-ink">What a $300 ACT prep course can realistically return</h2>
    <div class="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-6">
      <div class="grid gap-6 md:grid-cols-2">
        <div>
          <p class="text-sm font-bold uppercase tracking-[0.12em] text-slate-500">Investment</p>
          <p class="mt-2 text-3xl font-black text-ink">$300 ACT prep course</p>
          <p class="mt-4 text-sm leading-6 text-slate-600">
            In some situations, families may also be able to use 529 funds for this type of course, which can further
            improve the effective return.
          </p>
        </div>
        <div>
          <p class="text-sm font-bold uppercase tracking-[0.12em] text-slate-500">Potential outcome</p>
          <ul class="mt-3 space-y-2 text-slate-700">
            <li>+2 ACT points</li>
            <li>+$2,000-$6,000 per year in scholarships</li>
            <li>
              Four-year value:
              <span class="font-bold text-ink">$8,000-$24,000</span>
            </li>
          </ul>
        </div>
      </div>

      <div class="mt-6 rounded-2xl bg-white p-5 text-center shadow-sm shadow-slate-900/5">
        <p class="text-sm font-semibold uppercase tracking-[0.12em] text-slate-500">Estimated four-year scholarship value</p>
        <p class="mt-2 text-4xl font-black text-ink md:text-5xl">$8,000-$24,000</p>
        <p class="mt-4 text-sm font-semibold uppercase tracking-[0.12em] text-slate-500">
          Estimated return on a $300 investment
        </p>
        <p class="mt-1 text-3xl font-black text-ink md:text-4xl">26x-80x</p>
      </div>

      <p class="mt-4 text-xs leading-5 text-slate-500">
        Estimates are illustrative and based on common merit scholarship step-ups. Actual results vary by school,
        residency, GPA, current score band, and final score improvement.
      </p>
    </div>

    <p class="mt-5 text-base leading-7 text-slate-700">
      That is the key difference: a 529 helps families pay costs that already exist. A stronger ACT score may help
      reduce the cost first through merit scholarships tied to GPA and score bands.
    </p>

    <h2 class="mt-10 text-2xl font-extrabold text-ink">A simple student example</h2>
    <div class="mt-5 rounded-2xl border border-slate-200 bg-white p-6">
      <div class="grid gap-6 md:grid-cols-2">
        <div>
          <p class="text-sm font-bold uppercase tracking-[0.12em] text-slate-500">Student profile</p>
          <ul class="mt-3 space-y-2 text-slate-700">
            <li>GPA: 3.7</li>
            <li>ACT: 27</li>
            <li>Current award: $6,000/year</li>
          </ul>
        </div>
        <div>
          <p class="text-sm font-bold uppercase tracking-[0.12em] text-slate-500">After a score increase</p>
          <ul class="mt-3 space-y-2 text-slate-700">
            <li>ACT: 30</li>
            <li>Updated award: $10,000/year</li>
            <li>Difference: $4,000/year</li>
            <li>Four-year value: <span class="font-bold text-ink">$16,000</span></li>
          </ul>
        </div>
      </div>
    </div>

    <h2 class="mt-10 text-2xl font-extrabold text-ink">Where the 529 plan fits</h2>
    <p class="mt-4 text-base leading-7 text-slate-700">
      The strongest approach is usually using both in sequence: first, try to reduce the college price through a
      score-based scholarship strategy; then use your 529 to help cover what remains.
    </p>

    <h2 class="mt-10 text-2xl font-extrabold text-ink">Can a 529 plan cover ACT or SAT prep?</h2>
    <p class="mt-4 text-base leading-7 text-slate-700">
      Under recent federal changes, 529 plans may now cover certain tutoring and educational classes outside the
      home. Because ACT and SAT prep are structured academic courses, many families and advisors now view prep as
      potentially eligible under that expanded language.
    </p>
    <div class="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-5">
      <p class="text-sm font-semibold uppercase tracking-[0.14em] text-amber-800">Important note</p>
      <p class="mt-2 text-sm leading-6 text-amber-900">
        ACT and SAT prep are not explicitly named in the current federal language. Families should confirm eligibility
        with their tax professional and plan administrator before using 529 funds this way.
      </p>
    </div>

    <div class="mt-8 rounded-3xl bg-ink px-6 py-7 text-white md:px-8">
      <h2 class="text-2xl font-extrabold">See what one more ACT point could be worth</h2>
      <p class="mt-3 max-w-2xl text-sm leading-6 text-slate-200">
        Most families do not know what scholarship tier they already qualify for, how close they are to the next
        level, or what a 1-3 point increase might mean over four years.
      </p>
      <div class="mt-5 flex flex-col gap-3 sm:flex-row">
        <a
          href="/scholarship-calculator"
          class="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-bold text-ink transition hover:bg-slate-100"
        >
          See scholarship tiers
        </a>
        <a
          href="/enroll"
          use:preserveMarketingParams
          use:trackEnrollCta={{ cta_location: '529_footer', cta_label: 'View course dates' }}
          class="inline-flex items-center justify-center rounded-full border border-white/30 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/10"
        >
          View course dates
        </a>
      </div>
    </div>
  </article>

  <aside class="space-y-6">
    <article class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-900/5">
      <h2 class="text-xl font-extrabold text-ink">What to confirm before using 529 funds</h2>
      <ul class="mt-4 space-y-3 text-sm leading-6 text-slate-700">
        {#each questionsToAsk as question}
          <li class="flex gap-3">
            <span class="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-ink"></span>
            <span>{question}</span>
          </li>
        {/each}
      </ul>
    </article>

    <article class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-900/5">
      <h2 class="text-xl font-extrabold text-ink">How we support your records</h2>
      <ul class="mt-4 space-y-3 text-sm leading-6 text-slate-700">
        {#each recordSupport as item}
          <li class="flex gap-3">
            <span class="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-ink"></span>
            <span>{item}</span>
          </li>
        {/each}
      </ul>
    </article>

    <article class="rounded-3xl border border-slate-200 bg-slate-50 p-6">
      <h2 class="text-xl font-extrabold text-ink">Best next step</h2>
      <p class="mt-3 text-sm leading-6 text-slate-700">
        Start with the scholarship calculator. It gives families a clearer picture of whether a score increase could
        create meaningful tuition savings before they decide how to pay for prep.
      </p>
      <a
        href="/scholarship-calculator"
        class="mt-5 inline-flex items-center justify-center rounded-full bg-ink px-5 py-3 text-sm font-bold text-white transition hover:opacity-90"
      >
        Open calculator
      </a>
    </article>
  </aside>
</section>
